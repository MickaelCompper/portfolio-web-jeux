import Database from 'better-sqlite3';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { corpus, decode, validate } from './model.js';
import type {Content, Id} from './model.js';
export class Fault extends Error {constructor(public status:number,message:string,public errors:Record<string,string>={}){super(message);}}
interface Row {id:Id; rev:number; json:string;}
export interface Draft {id:Id; generation:number; base:number; json:string; saved:string;}
export interface Operation {id:string; hash:string; content:Id; rev:number; published:string;}
export class Store {
 readonly db:Database.Database;
 constructor(path:string,init=false,scenario='S0') {
  if(!init&&!existsSync(path)) throw new Error('Base absente : initialisation explicite requise.');
  if(init&&existsSync(path))throw new Error('Destination existante : refus d’écraser.');
  this.db=new Database(path,{fileMustExist:!init,timeout:1000});
  this.db.pragma('foreign_keys = ON');this.db.pragma('journal_mode = DELETE');this.db.pragma('synchronous = FULL');
  if(this.db.pragma('foreign_keys',{simple:true})!==1)throw new Error('Clés étrangères inactives');
  if(init) this.initialize(scenario);
  if(this.db.pragma('user_version',{simple:true})!==1){this.db.close();throw new Error('Version de stockage inconnue');}
 }
 private initialize(scenario:string) {
  if(!/^S[0-9]$/.test(scenario))throw new Error('Scénario inconnu');
  this.db.exec(`CREATE TABLE meta(key TEXT PRIMARY KEY,value TEXT NOT NULL);
   CREATE TABLE content(id TEXT PRIMARY KEY,public INTEGER,FOREIGN KEY(id,public) REFERENCES revision(content,rev) DEFERRABLE INITIALLY DEFERRED);
   CREATE TABLE revision(content TEXT NOT NULL REFERENCES content(id),rev INTEGER NOT NULL,json TEXT NOT NULL CHECK(json_valid(json)),published TEXT NOT NULL,PRIMARY KEY(content,rev));
   CREATE TABLE draft(id TEXT PRIMARY KEY REFERENCES content(id),generation INTEGER NOT NULL,base INTEGER NOT NULL,json TEXT NOT NULL CHECK(json_valid(json)),saved TEXT NOT NULL);
   CREATE TABLE operation(id TEXT PRIMARY KEY,hash TEXT NOT NULL,content TEXT NOT NULL,rev INTEGER NOT NULL,published TEXT NOT NULL,FOREIGN KEY(content,rev) REFERENCES revision(content,rev));
   CREATE TRIGGER revision_no_update BEFORE UPDATE ON revision BEGIN SELECT RAISE(ABORT,'Révision immuable'); END;
   CREATE TRIGGER revision_no_delete BEFORE DELETE ON revision BEGIN SELECT RAISE(ABORT,'Révision immuable'); END;
   CREATE TRIGGER operation_no_update BEFORE UPDATE ON operation BEGIN SELECT RAISE(ABORT,'Opération immuable'); END;
   CREATE TRIGGER operation_no_delete BEFORE DELETE ON operation BEGIN SELECT RAISE(ABORT,'Opération immuable'); END;
   PRAGMA user_version=1;`);
  this.db.transaction(()=>{
   this.db.prepare('INSERT INTO meta VALUES (?,?)').run('scenario',scenario);
   this.db.prepare('INSERT INTO meta VALUES (?,?)').run('clock',scenario==='S5'?'2026-11-22T10:00:00+01:00':scenario==='S3'?'2026-11-19T10:00:00+01:00':'2026-11-10T10:00:00+01:00');
   this.db.prepare('INSERT INTO meta VALUES (?,?)').run('corpus','BR-C2-V1 / format 1 / assistance Codex');
   for(const c of corpus()) {this.db.prepare('INSERT INTO content VALUES (?,NULL)').run(c.id); const body={...c};if(scenario==='S7'&&c.id==='IP-01') body.hours='';this.db.prepare('INSERT INTO revision VALUES (?,1,?,?)').run(c.id,JSON.stringify(body),'Initialisation fictive');if(!(scenario==='S6'&&c.id==='EV-01'))this.db.prepare('UPDATE content SET public=1 WHERE id=?').run(c.id);}
  })();
  if(['S1','S2','S3','S9'].includes(scenario)) {
   const c=this.public().find(x=>x.id==='IP-01')!;
   c.exceptionDate='2026-11-18';c.exceptionPeriod=scenario==='S9'?'':'14:00-17:00';c.exceptionText='Accueil fermé mercredi 18 novembre 2026 de 14 h à 17 h ; ouverture maintenue de 9 h à 12 h.';c.date='2026-11-10';
   this.save(c,0,1);
   if(scenario==='S2'||scenario==='S3') this.publish('fixture-S2','IP-01',1,1);
   if(scenario==='S3'){c.exceptionDate='';c.exceptionPeriod='';c.exceptionText='';c.date='2026-11-19';this.save(c,0,2);this.publish('fixture-S3','IP-01',1,2);}
  }
  if(scenario==='S4'){const c=this.public().find(x=>x.id==='EV-01')!;c.organization='annulé';c.cancellation='La séance du 21 novembre 2026 est annulée. Motif non renseigné ; aucune nouvelle date annoncée.';this.save(c,0,1);this.publish('fixture-S4','EV-01',1,1);}
  if(scenario==='S8'){const c=this.public().find(x=>x.id==='EV-01')!;c.place='EQ-99';this.save(c,0,1);}
 }
 meta(key:string):string {return (this.db.prepare('SELECT value FROM meta WHERE key=?').get(key) as {value:string}).value;}
 public():Content[] {return this.db.transaction(()=> (this.db.prepare('SELECT r.json FROM content c JOIN revision r ON r.content=c.id AND r.rev=c.public ORDER BY c.id').all() as {json:string}[]).map(r=>decode(JSON.parse(r.json))))();}
 version(id:Id):number {return (this.db.prepare('SELECT public FROM content WHERE id=?').get(id) as {public:number|null}).public??0;}
 draft(id:Id):Draft|undefined {return this.db.prepare('SELECT * FROM draft WHERE id=?').get(id) as Draft|undefined;}
 history(id:Id):Row[] {return this.db.prepare('SELECT content as id,rev,json FROM revision WHERE content=? ORDER BY rev').all(id) as Row[];}
 operations():Operation[] {return this.db.prepare('SELECT * FROM operation ORDER BY published DESC,id DESC').all() as Operation[];}
 operation(id:string):Operation|undefined {return this.db.prepare('SELECT * FROM operation WHERE id=?').get(id) as Operation|undefined;}
 save(c:Content,generation:number,base:number,fail=false):Draft {
  return this.db.transaction(()=>{
   const old=this.draft(c.id);
   if(this.version(c.id)!==base||(old?.generation??0)!==generation)throw new Fault(409,'Ce formulaire est ancien : copiez la saisie avant de recharger.');
   if(fail) throw new Fault(503,'Le brouillon n’a pas été enregistré. La saisie reste dans cette page.');
   const saved=new Date().toISOString();
   this.db.prepare('INSERT INTO draft VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET generation=excluded.generation,base=excluded.base,json=excluded.json,saved=excluded.saved').run(c.id,generation+1,base,JSON.stringify(c),saved);
   return this.draft(c.id)!;
  }).immediate();
 }
 prepare(id:Id,generation:number,base:number):Content {
  const d=this.draft(id); if(!d||d.generation!==generation||d.base!==base||this.version(id)!==base)throw new Fault(409,'Brouillon ou version publique modifié : rechargez après copie de la saisie.');
  const c=decode(JSON.parse(d.json));const e=validate(c,this.public());if(Object.keys(e).length)throw new Fault(422,'La publication est bloquée : corrigez les champs indiqués.',e);return c;
 }
 publish(op:string,id:Id,generation:number,base:number,fail=false):Operation {
  return this.db.transaction(()=>{
   const fingerprint=(json:string)=>createHash('sha256').update(JSON.stringify([id,generation,base,json])).digest('hex');
   const existing=this.operation(op); if(existing){const prior=this.db.prepare('SELECT json FROM revision WHERE content=? AND rev=?').get(existing.content,existing.rev) as {json:string};if(existing.hash!==fingerprint(prior.json))throw new Fault(409,'Identifiant d’opération déjà utilisé pour une autre demande.');return existing;}
   const c=this.prepare(id,generation,base);
   const hash=fingerprint(JSON.stringify(c));
   const rev=(this.db.prepare('SELECT MAX(rev) as n FROM revision WHERE content=?').get(id) as {n:number}).n+1;
   const published=new Date().toISOString();
   this.db.prepare('INSERT INTO revision VALUES (?,?,?,?)').run(id,rev,JSON.stringify(c),published);
   this.db.prepare('UPDATE content SET public=? WHERE id=?').run(rev,id);
   if(fail)throw new Fault(503,'Publication non validée : transaction annulée, brouillon conservé.');
   this.db.prepare('INSERT INTO operation VALUES (?,?,?,?,?)').run(op,hash,id,rev,published);
   this.db.prepare('DELETE FROM draft WHERE id=?').run(id);
   return this.operation(op)!;
  }).immediate();
 }
 close(){this.db.close();}
}
