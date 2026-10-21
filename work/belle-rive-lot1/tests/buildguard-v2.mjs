import {cpSync,mkdirSync,mkdtempSync,writeFileSync,appendFileSync,existsSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const dir=mkdtempSync('evidence/measures/buildguard-v2-'),clean=resolve(dir,'clean');mkdirSync(clean);
for(const item of ['src','views','public','node_modules'])cpSync(item,clean+'/'+item,{recursive:true});for(const file of ['package.json','package-lock.json','tsconfig.build.json','build.mjs'])cpSync(file,clean+'/'+file);mkdirSync(clean+'/dist');
for(const name of ['server','runtime','cli'])writeFileSync(clean+'/dist/'+name+'.bundle.js','old output must not be launched');writeFileSync(clean+'/dist/build-manifest.json','old manifest');
appendFileSync(clean+'/src/runtime.ts','\nconst intentionalBuildError: string = 42;\n');
const r=spawnSync(process.execPath,['build.mjs'],{cwd:clean,encoding:'utf8'});const report={date:new Date().toISOString(),scope:'isolated copy only; deliberate TypeScript error; no server launched',exit:r.status,stdout:r.stdout,stderr:r.stderr,staleBundlesRemoved:['server','runtime','cli'].every(name=>!existsSync(clean+'/dist/'+name+'.bundle.js')),staleManifestRemoved:!existsSync(clean+'/dist/build-manifest.json')};writeFileSync(dir+'/report.json',JSON.stringify(report,null,2));assert.notEqual(r.status,0);assert.ok(report.staleBundlesRemoved);assert.ok(report.staleManifestRemoved);console.log(JSON.stringify({dir,...report},null,2));
