import {fork} from 'node:child_process';
import {mkdirSync,mkdtempSync,cpSync,copyFileSync,writeFileSync,readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import os from 'node:os';
import assert from 'node:assert/strict';
import {Store} from '../dist/runtime.bundle.js';
const dir=mkdtempSync('evidence/measures/reprise-v2-'),source=resolve(dir,'source.sqlite');
const original=new Store(source,true,'S2');const expected={public:original.public(),operations:original.operations(),history:original.history('IP-01')};original.close();
const report={date:new Date().toISOString(),budgetMs:5000,scope:'Same Windows machine, first invocation of each new full copy; no warmup, cache flush or second-machine claim',environment:{node:process.version,os:os.version(),release:os.release(),cpu:os.cpus()[0]?.model,memory:os.totalmem(),power:'not measured',backgroundLoad:'not controlled; no voluntary load'},samples:[]};
const hash=path=>createHash('sha256').update(readFileSync(path)).digest('hex');
const protocol={fixedBeforeMeasure:true,cases:'3 paired trials, original/bundle in separate new directories; full node_modules in both',budgetMs:5000,observationTimeoutMs:60000,measuredFrom:'immediately before fork',measuredTo:'IPC ready emitted after listen succeeds',excluded:'copy/build/fixture generation; exactly as V1',checks:['public revision/history/operation restored','loopback binding','origin/session/CSRF refusal','new publication and immutable history','old session rejected after restart','clean stop and no sentinel'],build:JSON.parse(readFileSync('dist/build-manifest.json')),fixtureSha256:hash(source)};
writeFileSync(dir+'/protocol-before-measure.json',JSON.stringify(protocol,null,2));
let previousCookie='';
async function request(path,options={}){const r=await fetch('http://127.0.0.1:4317'+path,{...options,headers:{...options.headers,Connection:'close'}});const text=await r.text();return {code:r.status,text,headers:r.headers};}
const csrf=text=>/name="csrf" value="([a-f0-9]+)"/.exec(text)?.[1];
const authHeaders={origin:'http://127.0.0.1:4317','content-type':'application/x-www-form-urlencoded'};
for(let trial=1;trial<=3;trial++)for(const mode of ['original','bundle']){
 const folder=resolve(dir,`trial-${trial}-${mode}`,'clean');mkdirSync(folder,{recursive:true});for(const item of ['dist','views','public','node_modules'])cpSync(item,folder+'/'+item,{recursive:true});cpSync('package.json',folder+'/package.json');const db=folder+'/restored.sqlite';copyFileSync(source,db);assert.equal(hash(db),protocol.fixtureSha256);
 const sample={trial,mode,folder,fixtureSha256:hash(db)};let child,exited,stderr='';
 try{
  const t=performance.now();child=fork(folder+'/dist/'+(mode==='bundle'?'server.bundle.js':'server.js'),[db],{cwd:folder,execPath:process.execPath,execArgv:[],stdio:['ignore','pipe','pipe','ipc']});child.stdout.resume();child.stderr.on('data',d=>stderr+=d);exited=new Promise(resolve=>child.once('exit',resolve));
  const ready=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Observation exceeded 60s; budget still 5s')),60000);child.on('message',m=>{if(m.ready){clearTimeout(timer);resolve(m);}});child.once('exit',code=>{clearTimeout(timer);reject(new Error('Exit before ready '+code+' '+stderr));});});sample.startupMs=performance.now()-t;sample.withinBudget=sample.startupMs<=5000;
  let r=await request('/contenu/IP-01');assert.equal(r.code,200);assert.ok(r.text.includes('ouverture maintenue de 9 h à 12 h'));
  if(previousCookie)assert.equal((await request('/edition',{headers:{cookie:previousCookie}})).code,403);
  r=await request('/edition/connexion');r=await request('/edition/connexion',{method:'POST',headers:authHeaders,redirect:'manual',body:new URLSearchParams({csrf:csrf(r.text),secret:ready.secret})});assert.equal(r.code,302);const cookie=r.headers.get('set-cookie').split(';')[0],headers={...authHeaders,cookie};previousCookie=cookie;r=await request('/edition',{headers});const token=csrf(r.text);
  const post=(path,body,override={})=>request(path,{method:'POST',headers:{...headers,...override},body:new URLSearchParams(body)});
  assert.equal((await post('/edition/prolonger',{csrf:token},{origin:'http://localhost:4317'})).code,403);assert.equal((await post('/edition/prolonger',{csrf:'bad'})).code,403);assert.equal((await request('/edition/operation/fixture-S2',{headers})).code,200);
  const content=expected.public.find(c=>c.id==='IP-01');const fields=Object.fromEntries(Object.entries(content).filter(([k,v])=>k!=='id'&&v!==''));r=await post('/edition/contenu/IP-01/enregistrer',{...fields,csrf:token,generation:'0',base:'2',title:'Reprise V2 vérifiée'});assert.equal(r.code,200);r=await post('/edition/contenu/IP-01/preparer',{csrf:token,generation:'1',base:'2'});assert.equal(r.code,200);const op=/name="op" value="([a-f0-9-]+)"/.exec(r.text)[1];r=await post('/edition/contenu/IP-01/publier',{csrf:token,generation:'1',base:'2',op});assert.equal(r.code,200);r=await post('/edition/contenu/IP-01/publier',{csrf:token,generation:'1',base:'2',op});assert.equal(r.code,200);sample.httpChecks='public r2 restored; previous cookie denied; auth; origin/CSRF denied; save/confirm/publish/replay';
 }catch(e){sample.error=String(e);sample.stderr=stderr;}
 finally{
  if(child?.connected)child.send('stop');if(exited){const stopTime=performance.now();const timer=setTimeout(()=>child?.kill(),5000);sample.exit=await exited;clearTimeout(timer);sample.shutdownMs=performance.now()-stopTime;sample.cleanStop=sample.exit===0&&!existsSync(db+'.running');}
  if(sample.cleanStop){const reopened=new Store(db);sample.integrity=reopened.db.pragma('integrity_check');assert.deepEqual(reopened.db.pragma('foreign_key_check'),[]);assert.equal(reopened.history('IP-01').length,3);assert.equal(reopened.operations().length,2);assert.deepEqual(reopened.history('IP-01').slice(0,2),expected.history);assert.deepEqual(reopened.operation('fixture-S2'),expected.operations[0]);sample.finalRevision=reopened.version('IP-01');reopened.close();}
  report.samples.push(sample);writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));
 }
}
report.correctedWithinBudget=report.samples.filter(s=>s.mode==='bundle').every(s=>s.withinBudget&&!s.error&&s.cleanStop&&s.finalRevision===3);writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,correctedWithinBudget:report.correctedWithinBudget,samples:report.samples.map(({folder,fixtureSha256,...s})=>s)},null,2));if(!report.correctedWithinBudget)process.exitCode=1;
