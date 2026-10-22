import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {chromium} from '@playwright/test';
import {Store,createApp,random} from '../dist/runtime.bundle.js';
const d='evidence/human-session-20261021-O44Zh8/';
if(JSON.parse(fs.readFileSync(d+'state.json')).status!=='STOPPED')throw new Error('Arrêt non confirmé');
const dir=fs.mkdtempSync(d+'publication-repro-v1-');
fs.copyFileSync(d+'edition.sqlite',dir+'/frozen-participant.sqlite');
const inputs=['views/page.ejs','public/session.js','src/app.ts','dist/server.bundle.js','dist/runtime.bundle.js','dist/build-manifest.json'];
for(const path of inputs)fs.copyFileSync(path,dir+'/'+path.replaceAll('/','__'));
const report={at:new Date().toISOString(),version:'0.1.2',scope:'Agent isolated reproductions, not participant results; original copy not mutated',snapshotSha256:createHash('sha256').update(fs.readFileSync(dir+'/frozen-participant.sqlite')).digest('hex'),cases:[]};
const browser=await chromium.launch({headless:true});report.browser=browser.version();
try{for(const mode of ['verification-link-before-publication','actual-final-publish']){
 fs.copyFileSync(dir+'/frozen-participant.sqlite',dir+'/'+mode+'.sqlite');const store=new Store(dir+'/'+mode+'.sqlite'),secret=random(),{app}=createApp(store,secret);await app.listen({host:'127.0.0.1',port:4317});const context=await browser.newContext(),page=await context.newPage();const result={mode};
 try{await page.goto('http://127.0.0.1:4317/edition/connexion');await page.locator('#secret').fill(secret);await page.getByRole('button',{name:'Ouvrir l’édition',exact:true}).click();await page.waitForURL('**/edition');await page.goto('http://127.0.0.1:4317/edition/contenu/IP-01');await page.getByRole('button',{name:'Préparer la publication du brouillon enregistré',exact:true}).click();await page.getByRole('heading',{name:'Confirmer la publication',exact:true}).waitFor();result.preparationTitle=await page.title();result.operationsBefore=store.operations().length;await page.screenshot({path:dir+'/'+mode+'-confirmation.png',fullPage:true});
  if(mode==='verification-link-before-publication'){await page.getByRole('link',{name:'Vérifier le résultat de cette opération',exact:true}).click();await page.getByRole('heading',{name:'Publication à vérifier',exact:true}).waitFor();result.message=(await page.locator('main').innerText()).match(/Opération non trouvée[^\n]*/)?.[0];}
  else{await page.getByRole('button',{name:'Publier cette révision',exact:true}).click();await page.getByRole('heading',{name:'Révision publiée',exact:true}).waitFor();result.message='Révision publiée';}
  result.finalTitle=await page.title();result.publicRevision=store.version('IP-01');result.operationsAfter=store.operations().length;result.draftRetained=!!store.draft('IP-01');await page.screenshot({path:dir+'/'+mode+'-result.png',fullPage:true});
 }catch(e){result.error=String(e);}finally{await context.close();await app.close();report.cases.push(result);}
}}finally{await browser.close();fs.writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,...report},null,2));}
