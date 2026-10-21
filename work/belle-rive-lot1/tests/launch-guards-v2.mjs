import {fork} from 'node:child_process';
import {createServer} from 'node:net';
import {mkdirSync,mkdtempSync,writeFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {Store} from '../dist/runtime.bundle.js';
import assert from 'node:assert/strict';
const dir=mkdtempSync('evidence/measures/launch-guards-v2-'),report={date:new Date().toISOString(),checks:[]};
async function refused(name,db,keepMarker=false){const child=fork(resolve('dist/server.bundle.js'),[db],{execPath:process.execPath,execArgv:[],stdio:['ignore','pipe','pipe','ipc']});let ready=false,stderr='';child.stdout.resume();child.stderr.on('data',d=>stderr+=d);child.on('message',m=>{if(m.ready)ready=true;});const code=await new Promise(resolve=>child.once('exit',resolve));assert.notEqual(code,0);assert.equal(ready,false);if(!keepMarker)assert.equal(existsSync(db+'.running'),false);report.checks.push({name,code,ready,sentinelRetained:existsSync(db+'.running'),stderr});}
await refused('missing database',resolve(dir,'missing.sqlite'));
const unknown=resolve(dir,'unknown.sqlite'),s=new Store(unknown,true);s.db.pragma('user_version=999');s.close();await refused('unknown storage version',unknown);
const busy=resolve(dir,'busy.sqlite'),b=new Store(busy,true);b.close();writeFileSync(busy+'.running','original marker must be preserved');await refused('preexisting launch marker',busy,true);
const port=resolve(dir,'port.sqlite'),p=new Store(port,true);p.close();const blocker=createServer();await new Promise((resolve,reject)=>{blocker.once('error',reject);blocker.listen(4317,'127.0.0.1',resolve);});try{await refused('port occupied; no fallback',port);}finally{await new Promise(resolve=>blocker.close(resolve));}
// Actual shipped entry, closed after checking that assembled artifacts stay private.
const child=fork(resolve('dist/server.bundle.js'),[port],{execPath:process.execPath,execArgv:[],stdio:['ignore','pipe','pipe','ipc']});child.stdout.resume();child.stderr.resume();const ended=new Promise(resolve=>child.once('exit',resolve));await new Promise(resolve=>child.on('message',m=>{if(m.ready)resolve();}));
try{for(const path of ['/dist/server.bundle.js','/dist/runtime.bundle.js','/dist/server.bundle.js.map','/build.mjs','/package-lock.json']){const response=await fetch('http://127.0.0.1:4317'+path,{headers:{Connection:'close'}});await response.text();assert.equal(response.status,404);report.checks.push({name:'private artifact '+path,status:response.status});}}finally{child.send('stop');assert.equal(await ended,0);assert.equal(existsSync(port+'.running'),false);}
writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify({dir,checks:report.checks.map(({stderr,...c})=>c)},null,2));
