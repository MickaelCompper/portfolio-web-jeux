// Alternative diagnostic entry, deliberately outside the shipped launch path.
const t=performance.now(),stages=[];
const stamp=name=>stages.push({name,ms:performance.now()-t});
const {createApp}=await import('./dist/app.js');stamp('app imports');
const {Store}=await import('./dist/store.js');stamp('store import (cached by app)');
const {random}=await import('./dist/session.js');
const store=new Store(process.argv[2]);stamp('SQLite open and pragmas');
const {app}=createApp(store,random());stamp('app construction');
await app.listen({host:'127.0.0.1',port:4317});stamp('listen confirmed');
process.send?.({ready:true,stages});
process.on('message',async message=>{if(message==='stop'){await app.close();process.disconnect();}});
