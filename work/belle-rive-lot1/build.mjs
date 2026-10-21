import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
import {rmSync,readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('.',import.meta.url));process.chdir(root);
// Only these generated files are invalidated. A failed strict compilation or
// assembly cannot leave an older executable bundle available to the launcher.
for(const entry of ['server','runtime','cli'])for(const suffix of ['.js','.js.map','.js.LEGAL.txt'])rmSync(root+'dist/'+entry+'.bundle'+suffix,{force:true});
rmSync(root+'dist/build-manifest.json',{force:true});
const compiled=spawnSync(process.execPath,['node_modules/typescript/bin/tsc','--project','tsconfig.build.json'],{stdio:'inherit'});
if(compiled.status!==0)process.exit(compiled.status??1);
const assembled=await build({entryPoints:['dist/server.js','dist/runtime.js','dist/cli.js'],outdir:'dist',entryNames:'[name].bundle',bundle:true,platform:'node',format:'esm',target:'node24',external:['better-sqlite3'],sourcemap:true,legalComments:'external',metafile:true,
 banner:{js:"import {createRequire as __createRequire} from 'node:module'; import {fileURLToPath as __fileURLToPath} from 'node:url'; import {dirname as __dirnameOf} from 'node:path'; const require=__createRequire(import.meta.url); const __filename=__fileURLToPath(import.meta.url); const __dirname=__dirnameOf(__filename);"}});
const paths=['package.json','package-lock.json','tsconfig.build.json','build.mjs',...readdirSync('src').filter(x=>x.endsWith('.ts')).map(x=>'src/'+x),...readdirSync('views').map(x=>'views/'+x),...readdirSync('public').map(x=>'public/'+x),...Object.keys(assembled.metafile.outputs)].sort();
const hashes=paths.map(path=>({path,sha256:createHash('sha256').update(readFileSync(path)).digest('hex')}));
writeFileSync('dist/build-manifest.json',JSON.stringify({version:JSON.parse(readFileSync('package.json')).version,node:process.version,esbuild:JSON.parse(readFileSync('node_modules/esbuild/package.json')).version,external:'better-sqlite3 with unchanged Windows native prebuild; no external service',hashes,inputs:assembled.metafile.inputs},null,2));
console.log('Compilation stricte et assemblage local terminés.');
