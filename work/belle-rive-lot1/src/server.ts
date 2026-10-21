import {createApp} from './app.js';
import {Store} from './store.js';
import {random} from './session.js';
import {openSync,closeSync,unlinkSync,appendFileSync} from 'node:fs';
const path=process.argv[2];if(!path)throw new Error('Indiquez une base existante. Aucun fichier créé implicitement.');
const sentinel=path+'.running';const lock=openSync(sentinel,'wx');
let cleanup=()=>{closeSync(lock);unlinkSync(sentinel);};
try {
 const store=new Store(path);const secret=random();const {app}=createApp(store,secret,{audit:event=>{try{appendFileSync(path+'.events.jsonl',JSON.stringify(event)+'\n');}catch{/* A failed diagnostic log cannot turn a committed publication into a false failure. */}}});
 let stopping=false;
 const stop=async()=>{if(stopping)return;stopping=true;await app.close();cleanup();cleanup=()=>{};console.log('Arrêt propre confirmé ; connexions fermées, sessions invalidées.');if(process.connected)process.disconnect();};
 process.on('SIGINT',()=>{void stop();});process.on('SIGTERM',()=>{void stop();});
 if(process.send){process.on('message',msg=>{if(msg==='stop')void stop();});}
 try{await app.listen({host:'127.0.0.1',port:4317});}catch(err){await app.close();throw err;}
 // Secret deliberately printed only in the launcher's local terminal. Do not capture this output as evidence.
 console.log('Belle-Rive prêt : http://127.0.0.1:4317\nÉdition : /edition/connexion\nSecret local de lancement : '+secret+'\nCtrl+C : arrêt propre.');
 if(process.send)process.send({ready:true,secret});
}catch(err){cleanup();throw err;}
