import {chromium,firefox} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {mkdirSync,mkdtempSync,writeFileSync} from 'node:fs';
import {Store} from '../dist/runtime.bundle.js';
import {createApp,origin} from '../dist/runtime.bundle.js';
import {random} from '../dist/runtime.bundle.js';
mkdirSync('evidence/browser-data',{recursive:true});const directory=mkdtempSync('evidence/browser-data/run-');const report={date:new Date().toISOString(),engines:[],checks:[],failures:[],axe:[],network:[],sizes:[]};
const secret=random(),store=new Store(directory+'/S0.sqlite',true),faults={},clock={value:Date.now()};const {app}=createApp(store,secret,{faults,now:()=>clock.value});
await app.listen({host:'127.0.0.1',port:4317});
let browser;
try {
 for(const engine of ['edge','chromium','firefox']) {
  try{browser=await (engine==='firefox'?firefox:chromium).launch(engine==='edge'?{channel:'msedge',headless:true}:{headless:true});}catch(e){report.engines.push({engine,status:'unavailable',error:String(e).slice(0,800)});continue;}
  report.engines.push({engine,version:browser.version()});
  const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage();const remote=[];const errors=[];
  page.on('request',r=>{if(!r.url().startsWith(origin))remote.push(r.url());});page.on('pageerror',e=>errors.push(String(e)));
  async function visit(path,name,axe=true){const response=await page.goto(origin+path);assert.equal(response.status(),200);if(axe){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();report.axe.push({engine,name,violations:result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:result.incomplete.map(v=>v.id),passes:result.passes.length});}return response;}
  try {
   for(const [path,name]of [['/','accueil'],['/rubrique/informations-pratiques','informations'],['/contenu/IP-01','mairie'],['/contenu/IP-02','preparer-visite'],['/rubrique/agenda','agenda'],['/contenu/EV-01','evenement'],['/rubrique/equipements','equipements'],['/contenu/EQ-01','mediatheque'],['/recherche?q=mediatheque','recherche-resultats'],['/recherche?q=piscine','recherche-zero'],['/recherche','recherche-vide']])await visit(path,name);
   for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:1000});for(const path of ['/','/contenu/IP-01','/contenu/EQ-01','/contenu/EV-01']){await visit(path,'reflow-'+width,false);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path+' overflow '+width);await page.screenshot({path:directory+`/${engine}-${width}-${path==='/'?'accueil':path.split('/').at(-1)}.png`,fullPage:true});}}
   await page.setViewportSize({width:1440,height:1000});await visit('/','keyboard',false);await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Aller au contenu');await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement.id),'principal');
   await visit('/edition/connexion','connexion');await page.getByLabel('Secret de lancement — obligatoire',{exact:true}).fill(secret);await page.getByRole('button',{name:'Ouvrir l’édition',exact:true}).click();await page.waitForURL('**/edition');
   await visit('/edition/contenu/IP-01','brouillon');const expectedRevision=store.version('IP-01')+1;await page.locator('#exceptionPeriod').fill('');await page.locator('#exceptionDate').fill('2026-11-18');await page.locator('#exceptionText').fill('Accueil fermé de 14 h à 17 h ; ouverture maintenue de 9 h à 12 h.');await page.getByRole('button',{name:'Enregistrer le brouillon',exact:true}).click();await page.waitForFunction(()=>document.getElementById('dirty')?.textContent.includes('Dernier enregistrement réel'));await page.getByRole('button',{name:'Préparer la publication du brouillon enregistré',exact:true}).click();await page.waitForSelector('#errors');assert.equal(await page.evaluate(()=>document.activeElement.id),'errors');assert.equal(await page.locator('#exceptionDate').inputValue(),'2026-11-18');
   report.axe.push({engine,name:'erreur-S9',violations:(await new AxeBuilder({page}).analyze()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});await page.screenshot({path:directory+'/'+engine+'-erreur-S9.png',fullPage:true});
   await page.locator('#exceptionPeriod').fill('14:00-17:00');await page.getByRole('button',{name:'Enregistrer le brouillon',exact:true}).click();await page.waitForFunction(()=>document.getElementById('dirty')?.textContent.includes('Dernier enregistrement réel'));await page.getByRole('button',{name:'Préparer la publication du brouillon enregistré',exact:true}).click();await page.getByRole('button',{name:'Publier cette révision',exact:true}).waitFor();
   report.axe.push({engine,name:'confirmation',violations:(await new AxeBuilder({page}).analyze()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});await page.screenshot({path:directory+'/'+engine+'-confirmation.png',fullPage:true});
   faults.lost=true;await page.getByRole('button',{name:'Publier cette révision',exact:true}).click();await page.locator('#uncertain:not([hidden])').waitFor();assert.equal(store.version('IP-01'),expectedRevision);await page.screenshot({path:directory+'/'+engine+'-publication-a-verifier.png',fullPage:true});faults.lost=false;
   await page.locator('#uncertain a').click();await page.getByRole('heading',{name:'Révision publiée',exact:true}).waitFor();assert.ok((await page.locator('main').textContent()).includes('Horodatage réel'));
   await visit('/contenu/IP-01','exception-S2');assert.ok((await page.locator('main').textContent()).includes('ouverture maintenue'));
   await visit('/edition/contenu/IP-01','session',false);clock.value+=28*60000;await page.evaluate(()=>window.dispatchEvent(new Event('focus')));await page.waitForFunction(()=>document.querySelector('#warning').textContent.includes('va expirer'));const before=await page.locator('#title').inputValue();await page.getByRole('button',{name:'Prolonger la session',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#warning').textContent.includes('Session prolongée'));assert.equal(await page.locator('#title').inputValue(),before);
   await page.setViewportSize({width:320,height:1000});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:directory+'/'+engine+'-edition-320.png',fullPage:true});
   await page.getByRole('button',{name:'Déconnexion',exact:true}).click();await page.getByRole('heading',{name:'Session déconnectée',exact:true}).waitFor();
   report.checks.push({engine,publicRoutes:true,widths:[320,390,768,1440],keyboardSkip:true,save:true,validation:true,lostSocket:true,resultRecovery:true,sessionWarning:true,extendPreservesInput:true,logout:true,pageErrors:errors});
  }catch(e){report.failures.push({engine,error:String(e),stack:e.stack,url:page.url(),text:(await page.locator('main').textContent()).slice(0,2000)});await page.screenshot({path:directory+'/'+engine+'-failure.png',fullPage:true});}
  report.network.push({engine,remote});await context.close();await browser.close();browser=null;
 }
}finally{if(browser)await browser.close();await app.close();writeFileSync(directory+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({directory,engines:report.engines,checks:report.checks,failures:report.failures,axeViolations:report.axe.filter(a=>a.violations.length)},null,2));}
if(report.failures.length||report.axe.some(a=>a.violations.length))process.exitCode=1;

