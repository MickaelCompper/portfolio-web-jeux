import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdirSync,mkdtempSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {Store,Fault} from '../dist/store.js';
import {createApp,origin} from '../dist/app.js';
import {corpus,search,status,validate} from '../dist/model.js';
import {Sessions,random} from '../dist/session.js';
mkdirSync('evidence/core-data',{recursive:true});
const run=mkdtempSync('evidence/core-data/run-');
let sequence=0;
function store(scenario='S0'){return new Store(join(run,`${++sequence}-${scenario}.sqlite`),true,scenario);}
const hdr={host:'127.0.0.1:4317',origin,'content-type':'application/x-www-form-urlencoded'};
const token=html=>/name="csrf" value="([a-f0-9]+)"/.exec(html)?.[1];
async function login(app,secret){const r=await app.inject({url:'/edition/connexion',headers:hdr});const r2=await app.inject({method:'POST',url:'/edition/connexion',headers:hdr,payload:new URLSearchParams({csrf:token(r.body),secret}).toString()});assert.equal(r2.statusCode,302);const cookie=r2.headers['set-cookie'].split(';')[0];const dashboard=await app.inject({url:'/edition',headers:{...hdr,cookie}});return {cookie,csrf:token(dashboard.body)};}
test('M-01/02/03 : S0–S9 isolés, annulation et frontières exactes',()=>{
 for(let i=0;i<10;i++){const s=store('S'+i),list=s.public();assert.equal(list.length,i===6?3:4);assert.equal(s.db.pragma('integrity_check')[0].integrity_check,'ok');assert.deepEqual(s.db.pragma('foreign_key_check'),[]);if(i===1)assert.equal(list.find(c=>c.id==='IP-01').exceptionDate,'');if(i===2)assert.equal(s.version('IP-01'),2);if(i===3)assert.equal(s.history('IP-01').length,3);if(i===4)assert.equal(list.find(c=>c.id==='EV-01').organization,'annulé');if(i===7)assert.equal(list.find(c=>c.id==='IP-01').hours,'');if(i===8)assert.throws(()=>s.prepare('EV-01',1,1),e=>e instanceof Fault&&!!e.errors.place);if(i===9)assert.throws(()=>s.prepare('IP-01',1,1),e=>e instanceof Fault&&!!e.errors.exceptionPeriod);s.close();}
 const c=corpus()[3];for(const [time,label]of [['14:59:59','À venir'],['15:00:00','En cours'],['15:59:59','En cours'],['16:00:00','Passé']]){assert.equal(status(c,`2026-11-21T${time}+01:00`),label);assert.equal(status({...c,organization:'annulé'},`2026-11-21T${time}+01:00`),'Annulé');}
});
test('M-04 : mots entiers, accents, tous mots, surfaces publiques',()=>{const list=corpus();assert.deepEqual(search(list,'HORAIRES mairie').map(c=>c.id),['IP-01']);assert.equal(search(list,'mediatheque').length,2);assert.equal(search(list,'médiathè').length,0);assert.equal(search(list,'piscine').length,0);assert.equal(search(list,'de l’eau').length,1);assert.equal(search(list,'   ').length,0);});
test('M-05/06 : sauvegarde, conflit, échec transactionnel, idempotence, reprise',()=>{
 const s=store(),c=s.public().find(c=>c.id==='IP-01');c.title='Brouillon secret';const d=s.save(c,0,1);assert.equal(s.public().find(c=>c.id==='IP-01').title,corpus()[0].title);assert.throws(()=>s.save({...c,title:'Écrasement'},0,1),e=>e.status===409);assert.throws(()=>s.publish('op-test','IP-01',d.generation,1,true),e=>e.status===503);assert.equal(s.version('IP-01'),1);assert.equal(s.history('IP-01').length,1);assert.ok(s.draft('IP-01'));const op=s.publish('op-test','IP-01',1,1);assert.equal(s.publish('op-test','IP-01',1,1).rev,op.rev);assert.equal(s.history('IP-01').length,2);assert.throws(()=>s.publish('op-test','IP-02',1,1),e=>e.status===409);assert.throws(()=>s.db.prepare('UPDATE revision SET json=?').run('{}'),/immuable/);assert.throws(()=>s.db.prepare('DELETE FROM operation').run(),/immuable/);const path=s.db.name;s.close();const reopened=new Store(path);assert.equal(reopened.operation('op-test').rev,2);assert.equal(reopened.public().find(c=>c.id==='IP-01').title,'Brouillon secret');reopened.close();
});
test('M-07/A-07 : échéances, frontières, dix prolongations pour chaque limite',()=>{
 let now=0;const sessions=new Sessions(()=>now);let s=sessions.create();const id=s.id;now=28*60000-1;assert.equal(sessions.state(s).warning,false);now++;assert.equal(sessions.state(s).warning,true);
 for(let i=0;i<10;i++){assert.ok(sessions.get(id));sessions.extend(s);now+=28*60000;assert.equal(sessions.state(s).warning,true);}
 sessions.extend(s);const duration=s.duration;now+=60000;sessions.get(id,true);assert.equal(s.duration,duration);
 // Keep idle alive through ordinary navigation, without extending duration.
 while(now+20*60000<duration-120000){now+=20*60000;assert.ok(sessions.get(id,true));}now=duration-120000;assert.ok(sessions.get(id,true));assert.equal(sessions.state(s).warning,true);
 for(let cycle=0;cycle<10;cycle++){sessions.extend(s);const end=s.duration;while(now+20*60000<end-120000){now+=20*60000;assert.ok(sessions.get(id,true));}now=end-120000;assert.ok(sessions.get(id,true));assert.equal(sessions.state(s).warning,true);}
 const expiry=sessions.state(s).expiry;now=expiry-1;assert.ok(sessions.get(id));now++;assert.equal(sessions.get(id),undefined);s=sessions.create();sessions.remove(s.id);assert.equal(sessions.get(s.id),undefined);s=sessions.create();sessions.clear();assert.equal(sessions.get(s.id),undefined);
});
test('M-07 : Host/Origin/session/CSRF, corps stricts et absence de fuite',async()=>{
 const s=store('S1'),secret=random(),{app}=createApp(s,secret);try{
 const r=await app.inject({url:'/',headers:{host:'localhost:4317'}});assert.equal(r.statusCode,403);
 for(const url of ['/edition','/edition/contenu/IP-01','/edition/operation/x'])assert.equal((await app.inject({url,headers:hdr})).statusCode,403);
 const a=await login(app,secret);const headers={...hdr,cookie:a.cookie};
 const payload=new URLSearchParams({csrf:a.csrf,generation:'1',base:'1',...Object.fromEntries(Object.entries(corpus()[0]).filter(([k])=>k!=='id'))}).toString();
 for(const originValue of ['', 'http://localhost:4317','https://evil.invalid'])assert.equal((await app.inject({url:'/edition/prolonger',method:'POST',headers:{...headers,origin:originValue},payload:'csrf='+a.csrf})).statusCode,403);
 assert.equal((await app.inject({url:'/edition/prolonger',method:'POST',headers,payload:'csrf=wrong'})).statusCode,403);
 assert.equal((await app.inject({url:'/edition/prolonger',method:'POST',headers,payload:'csrf='+a.csrf+'&csrf='+a.csrf})).statusCode,400);
 assert.equal((await app.inject({url:'/edition/prolonger',method:'POST',headers,payload:'csrf='+a.csrf+'&extra=x'})).statusCode,400);
 assert.equal((await app.inject({url:'/edition/prolonger',method:'POST',headers,payload:'csrf='+a.csrf+'&x='+'x'.repeat(65536)})).statusCode,413);
 const publicPage=await app.inject({url:'/contenu/IP-01',headers:hdr});assert.ok(!publicPage.body.includes('Accueil fermé mercredi'));assert.ok(publicPage.headers['content-security-policy'].includes("frame-ancestors 'none'"));assert.equal(publicPage.headers['cache-control'],'no-store');
 const xss=await app.inject({url:'/recherche?q='+encodeURIComponent('<script>alert(1)</script>'),headers:hdr});assert.ok(!xss.body.includes('<script>alert'));assert.ok(xss.body.includes('&lt;script&gt;'));
 const long=await app.inject({url:'/recherche?q='+encodeURIComponent('é'.repeat(121)),headers:hdr});assert.equal(long.statusCode,400);assert.ok(long.body.includes('é'.repeat(121)));
 assert.equal((await app.inject({url:'/data/a.sqlite',headers:hdr})).statusCode,404);assert.equal((await app.inject({url:'/dist/server.js.map',headers:hdr})).statusCode,404);
 const logout=await app.inject({url:'/edition/deconnexion',method:'POST',headers,payload:'csrf='+a.csrf});assert.equal(logout.statusCode,200);assert.equal((await app.inject({url:'/edition',headers})).statusCode,403);
 }finally{await app.close();}
});
test('M-04/06 : indisponibilité recherche et saisie conservée en échec',async()=>{const s=store();const {app}=createApp(s,random(),{faults:{search:true}});try{const r=await app.inject({url:'/recherche?q=mairie',headers:hdr});assert.equal(r.statusCode,503);assert.ok(r.body.includes('momentanément indisponible'));assert.ok(!r.body.includes('Aucun résultat'));}finally{await app.close();}});
test('M-07 : cinq échecs de connexion puis temporisation',async()=>{const s=store(),secret=random(),{app}=createApp(s,secret);try{for(let i=0;i<6;i++){const get=await app.inject({url:'/edition/connexion',headers:hdr});const r=await app.inject({method:'POST',url:'/edition/connexion',headers:hdr,payload:new URLSearchParams({csrf:token(get.body),secret:random()}).toString()});assert.equal(r.statusCode,i===5?429:403);}}finally{await app.close();}});
test('M-07/A-07 : dix renouvellements HTTP protégés par limite, expiration sans publication',async()=>{
 let now=0;const s=store('S1'),secret=random(),{app}=createApp(s,secret,{now:()=>now});try{
  const a=await login(app,secret),headers={...hdr,cookie:a.cookie};
  const state=async()=>{const r=await app.inject({url:'/edition/session',headers});assert.equal(r.statusCode,200);return r.json();};
  const extend=async()=>{const r=await app.inject({method:'POST',url:'/edition/prolonger',headers,payload:new URLSearchParams({csrf:a.csrf}).toString()});assert.equal(r.statusCode,200);const st=await state();assert.equal(st.duration,now+14400000);assert.equal(st.idle,now+1800000);assert.equal(s.version('IP-01'),1);assert.equal(s.draft('IP-01').generation,1);};
  for(let i=0;i<10;i++){now+=28*60000;assert.equal((await state()).warning,true);await extend();}
  for(let i=0;i<10;i++){const deadline=(await state()).duration;while(now+20*60000<deadline-120000){now+=20*60000;assert.equal((await app.inject({url:'/edition',headers})).statusCode,200);}now=deadline-120000;assert.equal((await app.inject({url:'/edition',headers})).statusCode,200);assert.equal((await state()).warning,true);assert.equal((await state()).duration,deadline);await extend();}
  const expiry=(await state()).expiry;now=expiry;assert.equal((await app.inject({url:'/edition/session',headers})).statusCode,403);assert.equal((await app.inject({method:'POST',url:'/edition/prolonger',headers,payload:'csrf='+a.csrf})).statusCode,403);assert.equal(s.version('IP-01'),1);assert.equal(s.operations().length,0);
 }finally{await app.close();}
});

