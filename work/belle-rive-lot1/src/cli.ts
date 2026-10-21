import {Store} from './store.js';
import {copyFileSync,existsSync,writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const [command,path,extra]=process.argv.slice(2);
if(!path)throw new Error('Usage : cli.js init destination.sqlite [S0–S9] | verify base.sqlite | copy source.sqlite destination.sqlite (après arrêt)');
if(command==='init'){const s=new Store(path,true,extra??'S0');s.close();console.log('Base initialisée explicitement : '+path);}
else if(command==='verify'){const s=new Store(path);console.log(JSON.stringify({integrity:s.db.pragma('integrity_check'),foreignKeys:s.db.pragma('foreign_key_check'),scenario:s.meta('scenario'),public:s.public().map(c=>({id:c.id,rev:s.version(c.id)})),operations:s.operations()},null,2));s.close();}
else if(command==='copy'){
 if(!extra||existsSync(extra))throw new Error('Destination neuve requise');
 // The launcher holds an exclusive sentinel while running. Copies are permitted only after confirmed shutdown.
 if(existsSync(path+'.running')||existsSync(path+'-journal')||existsSync(path+'-wal'))throw new Error('Base active ou auxiliaires présents : copie simple refusée.');
 const s=new Store(path);if(JSON.stringify(s.db.pragma('integrity_check'))!==JSON.stringify([{integrity_check:'ok'}]))throw new Error('Intégrité non confirmée');s.close();
 copyFileSync(path,extra);writeFileSync(extra+'.manifest.json',JSON.stringify({source:path,destination:extra,sha256:createHash('sha256').update(readFileSync(extra)).digest('hex'),date:new Date().toISOString()},null,2));console.log('Copie effectuée après vérification.');
}else throw new Error('Commande inconnue');
