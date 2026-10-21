import {fork,execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,cpSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import os from 'node:os';
import {Store} from '../dist/store.js';
import {createApp,origin} from '../dist/app.js';
import {random} from '../dist/session.js';
import assert from 'node:assert/strict';
mkdirSync('evidence/measures',{recursive:true});const dir=mkdtempSync('evidence/measures/run-');
function files(path){return readdirSync(path,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(path+'/'+x.name):[path+'/'+x.name]);}
const fixed=['package.json','package-lock.json','tsconfig.build.json',...files('src'),...files('dist'),...files('views'),...files('public')].map(path=>({path,sha256:createHash('sha256').update(readFileSync(path)).digest('hex')}));writeFileSync(dir+'/build-before-measure.json',JSON.stringify(fixed,null,2));
const report={date:new Date().toISOString(),environment:{os:os.version(),release:os.release(),arch:os.arch(),cpu:os.cpus()[0].model,memory:os.totalmem(),node:process.version,backgroundLoad:'No additional voluntary load; normal background processes not controlled',power:'Not measured'},protocol:'evidence/protocol-v1.md',startup:[],read:[],save:[],publish:[],reprise:{}};
const headers={host:'127.0.0.1:4317',origin,'content-type':'application/x-www-form-urlencoded'};
const token=html=>/name="csrf" value="([a-f0-9]+)"/.exec(html)?.[1];
const call=async(path,init)=>{const t=performance.now();const r=await fetch(origin+path,{...init,headers:{...init?.headers,Connection:'close'}});const text=await r.text();return {code:r.status,text,headers:r.headers,ms:performance.now()-t};};
async function login(secret){const get=await call('/edition/connexion');const r=await call('/edition/connexion',{method:'POST',headers,redirect:'manual',body:new URLSearchParams({csrf:token(get.text),secret})});assert.equal(r.code,302);const cookie=r.headers.get('set-cookie').split(';')[0];const d=await call('/edition',{headers:{cookie}});return {csrf:token(d.text),headers:{...headers,cookie}};}
function summary(values,medianBudget,maxBudget){const sorted=[...values].sort((a,b)=>a-b);return {raw:values,median:(sorted[4]+sorted[5])/2,max:sorted.at(-1),budget:{median:medianBudget,max:maxBudget},within:(sorted[4]+sorted[5])/2<=medianBudget&&sorted.at(-1)<=maxBudget};}
async function start(path,cwd=process.cwd()){const t=performance.now();const child=fork(cwd+'/dist/server.js',[path],{cwd,execPath:process.execPath,stdio:['ignore','pipe','pipe','ipc']});let stderr='';child.stderr.on('data',d=>{stderr+=d;});child.stdout.resume();const msg=await new Promise((resolve,reject)=>{child.once('message',resolve);child.once('exit',code=>reject(new Error('Start failed '+code+' '+stderr)));setTimeout(()=>reject(new Error('startup timeout')),10000).unref();});return {child,secret:msg.secret,ms:performance.now()-t};}
async function stop(child){const exited=new Promise((resolve,reject)=>{child.once('exit',code=>code===0?resolve():reject(new Error('stop '+code)));setTimeout(()=>reject(new Error('stop timeout')),5000).unref();});child.send('stop');await exited;}
try{
 const path=dir+'/startup.sqlite';const initial=new Store(path,true);initial.close();let oldCookie='';
 for(let i=0;i<3;i++){const instance=await start(path);report.startup.push(instance.ms);const a=await login(instance.secret);if(oldCookie)assert.equal((await call('/edition',{headers:{cookie:oldCookie}})).code,403);oldCookie=a.headers.cookie;await stop(instance.child);}
 const s=new Store(dir+'/read.sqlite',true),{app}=createApp(s,random());await app.listen({host:'127.0.0.1',port:4317});try{for(const path of ['/','/rubrique/informations-pratiques','/contenu/IP-01','/contenu/IP-02','/rubrique/agenda','/contenu/EV-01','/rubrique/equipements','/contenu/EQ-01','/recherche?q=mediatheque','/recherche?q=piscine','/recherche']){await call(path);const values=[];for(let n=0;n<10;n++){const r=await call(path);assert.equal(r.code,200);values.push(r.ms);}report.read.push({path,...summary(values,200,500)});}}finally{await app.close();}
 const save=[],publish=[];
 for(let n=0;n<10;n++){const s=new Store(dir+'/write-'+n+'.sqlite',true),secret=random(),{app}=createApp(s,secret);await app.listen({host:'127.0.0.1',port:4317});try{const a=await login(secret);const c=s.public().find(c=>c.id==='IP-01');const data=Object.fromEntries(Object.entries(c).filter(([k,v])=>k!=='id'&&v!==''));const saveResult=await call('/edition/contenu/IP-01/enregistrer',{method:'POST',headers:a.headers,body:new URLSearchParams({...data,title:'Titre de recette',csrf:a.csrf,generation:'0',base:'1'})});assert.equal(saveResult.code,200);save.push(saveResult.ms);const prep=await call('/edition/contenu/IP-01/preparer',{method:'POST',headers:a.headers,body:new URLSearchParams({csrf:a.csrf,generation:'1',base:'1'})});assert.equal(prep.code,200);const op=/name="op" value="([a-f0-9-]+)"/.exec(prep.text)[1];const r=await call('/edition/contenu/IP-01/publier',{method:'POST',headers:a.headers,body:new URLSearchParams({csrf:a.csrf,generation:'1',base:'1',op})});assert.equal(r.code,200);publish.push(r.ms);}finally{await app.close();}}
 report.save=summary(save,500,1000);report.publish=summary(publish,500,1000);
 // Clean local directory: built resources, dependencies and selected runtime copied; no initial DB.
 const clean=dir+'/clean-folder';mkdirSync(clean);for(const name of ['dist','views','public','node_modules'])cpSync(name,clean+'/'+name,{recursive:true});cpSync('package.json',clean+'/package.json');mkdirSync(clean+'/data');
 const source=dir+'/write-9.sqlite',destination=clean+'/data/restored.sqlite';execFileSync(process.execPath,['dist/cli.js','copy',source,destination]);
 const verified=JSON.parse(execFileSync(process.execPath,['dist/cli.js','verify',destination],{encoding:'utf8'}));assert.equal(verified.public.find(c=>c.id==='IP-01').rev,2);assert.equal(verified.operations.length,1);
 const instance=await start(process.cwd()+'/'+destination,process.cwd()+'/'+clean);const r=await call('/contenu/IP-01');assert.ok(r.text.includes('Titre de recette'));await stop(instance.child);report.reprise={status:'executed same machine',directory:clean,revision:2,operations:1,integrity:verified.integrity,runtime:'Same portable executable; dependencies copied, no independent clean OS/install'};
}catch(e){report.failure={message:String(e),cause:String(e.cause),stack:e.stack};process.exitCode=1;}
writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,...report},null,2));

