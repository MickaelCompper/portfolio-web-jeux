import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium,firefox} from '@playwright/test';
import {Store,createApp,random,quality,compare,corpus} from '../dist/runtime.bundle.js';
const dir=fs.mkdtempSync('evidence/editorial-v4-');
const report={version:'0.2.0',at:new Date().toISOString(),cases:[],scope:'Automated isolated copies; no human acceptance'};
fs.copyFileSync('dist/build-manifest.json',dir+'/build.json');
try{
 const list=corpus();assert.equal(quality(list[2],list,'2026-11-10T10:00:00+01:00')[0].level,'Information inconnue');
 assert.ok(quality(list[3],list,'2026-11-22T10:00:00+01:00').some(f=>f.field==='end'));
 assert.ok(quality({...list[0],exceptionDate:'2026-11-18',exceptionPeriod:'14:00-17:00',exceptionText:''},list,'2026-11-19T10:00:00+01:00').some(f=>f.level==='Bloquant'));
 assert.equal(compare(list[0],list[0]).length,0);assert.equal(compare({...list[0],exceptionText:'old'},{...list[0],exceptionText:''})[0].after,'');
 report.cases.push({name:'rules: unknown, past event, invalid exception, unchanged, removed field',pass:true});
 for(const [engine,type] of [['chromium',chromium],['firefox',firefox]]){
 const store=new Store(dir+'/'+engine+'.sqlite',true,'S1');const draft=JSON.parse(store.draft('IP-01').json);draft.summary='<script>private draft</script>';store.save(draft,1,1);
 const secret=random(),{app}=createApp(store,secret);const browser=await type.launch();
 try{
 await app.listen({host:'127.0.0.1',port:4317});const page=await browser.newPage({viewport:{width:390,height:900}});
 await page.goto('http://127.0.0.1:4317/edition/qualite');assert.equal(await page.getByRole('heading',{name:'Accès refusé',exact:true}).count(),1);
 await page.goto('http://127.0.0.1:4317/');assert.equal(await page.getByRole('link',{name:'Lieux publics',exact:true}).count(),1);assert.ok(!(await page.content()).includes('Équipements'));
 await page.goto('http://127.0.0.1:4317/edition/connexion');await page.locator('#secret').fill(secret);await page.getByRole('button',{name:'Ouvrir l’édition',exact:true}).click();await page.waitForURL('**/edition');
 await page.getByRole('link',{name:'Vérifier la qualité des informations',exact:true}).click();await page.getByRole('heading',{name:'Qualité des informations',exact:true}).waitFor();assert.ok((await page.locator('main').innerText()).includes('Information inconnue'));assert.equal(store.version('IP-01'),1);assert.equal(store.operations().length,0);await page.screenshot({path:dir+'/'+engine+'-quality.png',fullPage:true});
 await page.goto('http://127.0.0.1:4317/edition/contenu/IP-01');await page.getByRole('button',{name:'Préparer la publication du brouillon enregistré',exact:true}).click();await page.locator('.comparison').waitFor();assert.equal(await page.locator('.comparison tbody tr').count(),5);assert.ok((await page.locator('.draft-preview').innerText()).includes('<script>private draft</script>'));assert.equal(await page.locator('.draft-preview script').count(),0);assert.equal(store.version('IP-01'),1);assert.equal(store.operations().length,0);assert.ok(await page.locator('[data-publication-pending]').isVisible());await page.screenshot({path:dir+'/'+engine+'-comparison.png',fullPage:true});
 const publicPage=await page.request.get('http://127.0.0.1:4317/contenu/IP-01');assert.ok(!(await publicPage.text()).includes('private draft'));
 await page.getByRole('button',{name:'Publier cette révision',exact:true}).click();await page.getByRole('heading',{name:'Révision publiée',exact:true}).waitFor();assert.equal(store.operations().length,1);assert.equal(store.history('IP-01').length,2);
 // Stale prepared form cannot overwrite a newer draft.
 const current=store.public().find(c=>c.id==='IP-01');store.save(current,0,2);store.prepare('IP-01',1,2);store.save({...current,title:'New draft'},1,2);assert.throws(()=>store.publish('stale-v4','IP-01',1,2),e=>e.status===409);
 report.cases.push({name:engine,version:browser.version(),pass:true,checks:['auth','labels','quality read-only','comparison','shared preview escaped','no public leak','one publication','history','stale refusal']});
 }finally{await browser.close();await app.close();}
 }
}catch(e){report.cases.push({pass:false,error:String(e)});process.exitCode=1;}
fs.writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,...report},null,2));
