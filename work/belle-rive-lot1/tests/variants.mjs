import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {Store} from '../dist/store.js';
import {createApp,origin} from '../dist/app.js';
import {random} from '../dist/session.js';
import {mkdirSync,mkdtempSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
mkdirSync('evidence/variants',{recursive:true});const dir=mkdtempSync('evidence/variants/run-');const report={date:new Date().toISOString(),scenarios:[],weights:[],links:[],failures:[]};const browser=await chromium.launch({headless:true});report.browser=browser.version();
const cases={S2:[['/contenu/IP-01','ouverture maintenue de 9 h à 12 h.']],S4:[['/','Annulé'],['/rubrique/agenda','Annulé'],['/contenu/EV-01','aucune nouvelle date annoncée'],['/contenu/EQ-01','Annulé'],['/recherche?q=mediatheque','Annulé']],S5:[['/','Aucun événement'],['/rubrique/agenda','Aucun événement'],['/rubrique/agenda?passes=1','Passé']],S6:[['/contenu/EQ-01','Aucun événement associé']],S7:[['/contenu/IP-01','Horaires non renseignés']]};
try{
 for(const scenario of ['S0',...Object.keys(cases),'search-fault']){
  const store=new Store(dir+'/'+scenario+'.sqlite',true,scenario==='search-fault'?'S0':scenario),{app}=createApp(store,random(),{faults:{search:scenario==='search-fault'}});await app.listen({host:'127.0.0.1',port:4317});
  try{
   const urls=scenario==='S0'?['/','/rubrique/informations-pratiques','/contenu/IP-01','/contenu/IP-02','/rubrique/agenda','/contenu/EV-01','/rubrique/equipements','/contenu/EQ-01','/recherche?q=mediatheque','/recherche?q=piscine','/recherche','/edition/connexion']:scenario==='search-fault'?['/recherche?q=mairie']:(cases[scenario].map(c=>c[0]));
   for(const path of urls){const context=await browser.newContext({viewport:{width:390,height:900}}),page=await context.newPage();const responses=[];page.on('response',r=>responses.push(r));const response=await page.goto(origin+path);assert.equal(response.status(),scenario==='search-fault'?503:200);await page.waitForLoadState('networkidle');const text=await page.locator('main').textContent();if(cases[scenario])assert.ok(text.includes(cases[scenario].find(c=>c[0]===path)[1]));if(scenario==='search-fault')assert.ok(text.includes('momentanément indisponible'));
    const axe=await new AxeBuilder({page}).analyze();report.scenarios.push({scenario,path,status:response.status(),violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:axe.incomplete.map(v=>v.id)});
    let bytes=0;const resources=[];for(const r of responses){const size=await r.request().sizes();const transferred=size.responseBodySize+size.responseHeadersSize;bytes+=transferred;resources.push({path:new URL(r.url()).pathname,bytes:transferred,remote:!r.url().startsWith(origin)});}report.weights.push({scenario,path,bytes,budget:750*1024,within:bytes<=750*1024,resources});
    const targets=await page.locator('a[href]').evaluateAll(els=>[...new Set(els.map(a=>a.getAttribute('href')))].filter(h=>h.startsWith('/')&&!h.startsWith('/edition')));for(const link of targets){const r=await context.request.get(origin+link);report.links.push({scenario,source:path,target:link,status:r.status()});assert.equal(r.status(),200);}
    // Fixed text-spacing parameters; this is not browser zoom or an AT evaluation.
    await page.evaluate(()=>{document.styleSheets[0].insertRule('*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}');document.styleSheets[0].insertRule('p{margin-bottom:2em!important}');});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.screenshot({path:dir+'/'+scenario+'-'+path.replaceAll(/[^a-zA-Z0-9]/g,'_')+'.png',fullPage:true});await context.close();
   }
  }finally{await app.close();}
 }
}catch(e){report.failures.push({error:String(e),stack:e.stack});process.exitCode=1;}finally{await browser.close();writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,browser:report.browser,scenarios:report.scenarios.length,failures:report.failures,violations:report.scenarios.filter(c=>c.violations.length),maxPage:Math.max(...report.weights.map(w=>w.bytes)),links:report.links.length},null,2));}
if(report.scenarios.some(c=>c.violations.length)||report.weights.some(c=>!c.within))process.exitCode=1;

