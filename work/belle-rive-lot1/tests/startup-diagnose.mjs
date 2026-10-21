import {fork} from 'node:child_process';
import {cpSync,mkdirSync,mkdtempSync,writeFileSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {Store} from '../dist/store.js';
const dir=mkdtempSync('evidence/measures/diagnostic-v2-'),report={date:new Date().toISOString(),budgetMs:5000,scope:'same Windows machine; first invocation after a full dependency-tree copy, no warmup',samples:[]};
writeFileSync(dir+'/protocol.json',JSON.stringify({beforeMeasure:true,version:'baseline 0.1.0 / commit 054cde4',cases:['original entry + loader hooks','stage entry + loader hooks'],observationTimeoutMs:60000,budgetMs:5000,dependencies:'unchanged package-lock',copies:'fresh directories; full node_modules; no baseline excluded'},null,2));
try{for(const mode of ['original','stages']){
 const clean=resolve(dir,mode);mkdirSync(clean);for(const name of ['dist','views','public','node_modules'])cpSync(name,clean+'/'+name,{recursive:true});cpSync('package.json',clean+'/package.json');cpSync('tests/startup-stages.mjs',clean+'/startup-stages.mjs');const s=new Store(clean+'/base.sqlite',true);s.close();
 const t=performance.now();const child=fork(clean+'/'+(mode==='original'?'dist/server.js':'startup-stages.mjs'),[clean+'/base.sqlite'],{cwd:clean,execPath:process.execPath,execArgv:['--import',pathToFileURL(resolve('tests/startup-profile-preload.mjs')).href],stdio:['ignore','pipe','pipe','ipc']});child.stdout.resume();let stderr='';child.stderr.on('data',d=>stderr+=d);const sample={mode};child.on('message',msg=>{if(msg.profile)sample.profile=msg;});
 const exited=new Promise(resolve=>child.once('exit',resolve));
 try{const ready=await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('observation timeout')),60000);child.on('message',msg=>{if(msg.ready){clearTimeout(timer);resolve(msg);}});child.once('exit',code=>{clearTimeout(timer);reject(new Error('exit '+code+' '+stderr));});});sample.startupMs=performance.now()-t;sample.withinBudget=sample.startupMs<=5000;sample.stages=ready.stages;sample.response=(await fetch('http://127.0.0.1:4317/',{headers:{Connection:'close'}})).status;}
 catch(e){sample.error=String(e);}
 finally{if(child.connected)child.send('stop');sample.exit=await exited;report.samples.push(sample);writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));}
}}
finally{writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,samples:report.samples.map(s=>({mode:s.mode,startupMs:s.startupMs,withinBudget:s.withinBudget,stages:s.stages,error:s.error,loads:s.profile?.loads.length,loadSum:s.profile?.loads.reduce((a,l)=>a+l.ms,0),slowLoads:s.profile?.loads.toSorted((a,b)=>b.ms-a.ms).slice(0,6),resolveSum:s.profile?.resolves.reduce((a,l)=>a+l.ms,0)}))},null,2));}

