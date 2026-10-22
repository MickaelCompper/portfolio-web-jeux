import {compare,quality} from './quality.js';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import type {FastifyRequest,FastifyReply} from 'fastify';
import ejs from 'ejs';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {randomUUID} from 'node:crypto';
import {Store,Fault} from './store.js';
import {Sessions,equal,random} from './session.js';
import type {Session} from './session.js';
import {isId,relevant,fields,labels,decode,search,status,words} from './model.js';
import type {Content,Id} from './model.js';
export const origin='http://127.0.0.1:4317';
const root=fileURLToPath(new URL('../',import.meta.url));
const template=readFileSync(root+'views/page.ejs','utf8');
export interface Options {now?:()=>number; audit?:(event:{at:string;request:string;status:number;category:string})=>void; faults?:{save?:boolean;publish?:boolean;lost?:boolean;search?:boolean};}
export function createApp(store:Store,secret:string,options:Options={}) {
 const app=Fastify({logger:false,bodyLimit:65536,trustProxy:false,requestTimeout:10000});
 const sessions=new Sessions(options.now);const challenges=new Map<string,number>();let failures:number[]=[];
 const now=options.now??Date.now;
 app.register(cookie);
 app.addContentTypeParser('application/x-www-form-urlencoded',{parseAs:'string'},(_req,body,done)=>{
  try {const out:Record<string,string>=Object.create(null);for(const [key,v] of new URLSearchParams(String(body))){if(Object.hasOwn(out,key))throw new Fault(400,'Champ dupliqué refusé.');out[key]=v;}done(null,out);}catch(err){done(err as Error);}
 });
 function page(reply:FastifyReply,title:string,model:Record<string,unknown>={},code=200){return reply.code(code).type('text/html; charset=utf-8').send(ejs.render(template,{title,kind:'message',message:'',list:[],content:null,clock:store.meta('clock'),q:'',errors:{},form:null,generation:0,base:0,saved:'',session:null,csrf:'',op:'',operation:null,history:[],operations:[],changes:[],qualityRows:[],previewList:[],labels,relevant,fields,status,body:'',...model},{filename:root+'views/page.ejs'}));}
 function auth(req:FastifyRequest,touch=false):Session {const s=sessions.get(req.cookies.br??'',touch);if(!s)throw new Fault(403,'Session absente ou expirée. Reconnectez-vous ; le brouillon déjà enregistré est conservé.');return s;}
 function form(req:FastifyRequest,allowed:string[]):Record<string,string> {const b=req.body;if(!b||typeof b!=='object'||Array.isArray(b))throw new Fault(400,'Formulaire plat requis.');const obj=b as Record<string,unknown>;if(Object.keys(obj).some(k=>!allowed.includes(k))||Object.values(obj).some(v=>typeof v!=='string'))throw new Fault(400,'Champs inattendus ou format invalide.');return obj as Record<string,string>;}
 function protectedForm(req:FastifyRequest,allowed:string[]){const s=auth(req);const b=form(req,['csrf',...allowed]);if(!equal(b.csrf??'',s.csrf))throw new Fault(403,'Jeton de formulaire refusé.');sessions.get(s.id,true);return {s,b};}
 function numbers(b:Record<string,string>){if(!/^\d+$/.test(b.generation??'')||!/^\d+$/.test(b.base??''))throw new Fault(400,'Version de formulaire invalide.');return {generation:Number(b.generation),base:Number(b.base)};}
 function idOf(req:FastifyRequest):Id {const id=(req.params as {id:string}).id;if(!isId(id))throw new Fault(404,'Contenu indisponible.');return id;}
 function edit(reply:FastifyReply,id:Id,s:Session,extra:Record<string,unknown>={},code=200){const d=store.draft(id);const c=d?decode(JSON.parse(d.json)):store.public().find(c=>c.id===id);if(!c)throw new Fault(404,'Contenu indisponible.');return page(reply,'Préparer le brouillon',{kind:'edit',form:c,generation:d?.generation??0,base:d?.base??store.version(id),saved:d?.saved??'',session:sessions.state(s),csrf:s.csrf,history:store.history(id),...extra},code);}
 app.addHook('onRequest',async(req,reply)=>{
  reply.header('Cache-Control','no-store').header('X-Content-Type-Options','nosniff').header('Content-Security-Policy',"default-src 'none'; style-src 'self'; img-src 'self'; script-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'").header('Referrer-Policy','same-origin');
  if(req.headers.host!=='127.0.0.1:4317')throw new Fault(403,'Hôte refusé. Utilisez l’origine locale prévue.');
  if(!['GET','HEAD','POST'].includes(req.method))throw new Fault(405,'Méthode non permise.');
  if(req.method==='POST'&&req.headers.origin!==origin)throw new Fault(403,'Origine absente ou refusée.');
 });
 app.addHook('onResponse',async(req,reply)=>{options.audit?.({at:new Date().toISOString(),request:req.id,status:reply.statusCode,category:reply.statusCode>=400?'refus-ou-indisponibilite':'reponse'});});
 app.setErrorHandler((err,_req,reply)=>{const transport=err&&typeof err==='object'&&'statusCode' in err?err.statusCode:0;const code=err instanceof Fault?err.status:transport===413?413:transport===415?400:503;return page(reply,code===403?'Accès refusé':code===404?'Contenu indisponible':'Action interrompue',{message:err instanceof Fault?err.message:code===413?'Formulaire trop volumineux (64 Kio maximum).':'Le service est momentanément indisponible. Réessayez ; aucun succès n’est confirmé.'},code);});
 app.setNotFoundHandler((_req,reply)=>page(reply,'Contenu indisponible',{message:'Cette page n’est pas disponible. Retrouvez les informations par les rubriques ou la recherche.'},404));
 for(const [url,file,type] of [['/style.css','style.css','text/css'],['/edition/session.js','session.js','application/javascript'],['/rive.svg','rive.svg','image/svg+xml']]){app.get(url!,async(_req,reply)=>reply.type(type!).send(readFileSync(root+'public/'+file)));}
 app.get('/',async(_req,reply)=>{const list=store.public().filter(c=>c.id==='EV-01'&&Date.parse(c.end)>Date.parse(store.meta('clock')));return page(reply,'Les informations utiles à Belle-Rive',{kind:'home',list});});
 const sections:Record<string,{title:string;prefix:string}>={'informations-pratiques':{title:'Informations pratiques',prefix:'IP'},agenda:{title:'Agenda',prefix:'EV'},equipements:{title:'Lieux publics',prefix:'EQ'}};
 app.get('/rubrique/:section',async(req,reply)=>{const name=(req.params as {section:string}).section,section=sections[name];if(!section)throw new Fault(404,'Rubrique indisponible.');const past=(req.query as {passes?:string}).passes==='1';const list=store.public().filter(c=>c.id.startsWith(section.prefix)&&(name!=='agenda'||(Date.parse(c.end)<=Date.parse(store.meta('clock')))===past));return page(reply,section.title+(past?' — événements passés':''),{kind:'list',list,body:name==='agenda'?'agenda':'',past});});
 app.get('/contenu/:id',async(req,reply)=>{const id=idOf(req);const list=store.public();const content=list.find(c=>c.id===id);if(!content)throw new Fault(404,'Contenu indisponible. Aucun brouillon n’est proposé ici.');return page(reply,content.title,{kind:'detail',content,list});});
 app.get('/recherche',async(req,reply)=>{const q=new URL(req.url,origin).searchParams.get('q')??'';let message='',code=200,list:Content[]=[];if([...q].length>120){message='Limite de 120 caractères dépassée. Corrigez votre saisie.';code=400;}else if(!words(q).length)message='Saisissez un ou plusieurs mots';else if(options.faults?.search){message='La recherche est momentanément indisponible';code=503;}else{list=search(store.public(),q);message=list.length?`${list.length} résultat(s)`:`Aucun résultat pour “${q}”`;}return page(reply,'Rechercher une information',{kind:'search',q,list,message},code);});
 app.get('/edition/connexion',async(_req,reply)=>{for(const [t,expiry]of challenges)if(expiry<=now())challenges.delete(t);if(challenges.size>=100)challenges.delete(challenges.keys().next().value!);const token=random();challenges.set(token,now()+600000);return page(reply,'Ouvrir l’édition',{kind:'login',csrf:token});});
 app.post('/edition/connexion',async(req,reply)=>{const b=form(req,['csrf','secret']);const expiry=challenges.get(b.csrf??'');challenges.delete(b.csrf??'');if(!expiry||expiry<=now())throw new Fault(403,'Formulaire expiré : rechargez la connexion.');failures=failures.filter(t=>t>now()-60000);if(failures.length>=5)throw new Fault(429,'Trop d’essais. Attendez une minute avant de réessayer.');if(!equal(b.secret??'',secret)){failures.push(now());const token=random();challenges.set(token,now()+600000);return page(reply,'Ouvrir l’édition',{kind:'login',csrf:token,errors:{secret:'Secret incorrect. Réessayez avec le secret de lancement.'}},403);}sessions.remove(req.cookies.br??'');const s=sessions.create();reply.setCookie('br',s.id,{httpOnly:true,sameSite:'strict',path:'/edition',secure:false});return reply.redirect('/edition');});
 app.get('/edition',async(req,reply)=>{const s=auth(req,true);return page(reply,'Édition locale',{kind:'dashboard',list:store.public(),operations:store.operations(),csrf:s.csrf,session:sessions.state(s)});});
 app.get('/edition/qualite',async(req,reply)=>{const s=auth(req,true);const published=store.public();const qualityRows=published.map(c=>({content:c,source:'Version publique r'+store.version(c.id),findings:quality(c,published,store.meta('clock'))}));for(const c of published){const d=store.draft(c.id);if(d){const content=decode(JSON.parse(d.json));qualityRows.push({content,source:'Brouillon enregistré — génération '+d.generation,findings:quality(content,published,store.meta('clock'))});}}return page(reply,'Qualité des informations',{kind:'quality',qualityRows,csrf:s.csrf,session:sessions.state(s)});});
 app.get('/edition/session',async(req,reply)=>{const s=auth(req);return reply.send(sessions.state(s));});
 app.post('/edition/prolonger',async(req,reply)=>{const {s}=protectedForm(req,[]);sessions.extend(s);return page(reply,'Session prolongée',{message:'Les deux échéances sont renouvelées depuis la confirmation serveur. Cette action ne publie pas vos modifications.',csrf:s.csrf,session:sessions.state(s)});});
 app.post('/edition/deconnexion',async(req,reply)=>{const {s}=protectedForm(req,[]);sessions.remove(s.id);reply.clearCookie('br',{path:'/edition'});return page(reply,'Session déconnectée',{message:'Session invalidée. Brouillons et historique persistent ; aucune publication automatique.'});});
 app.get('/edition/contenu/:id',async(req,reply)=>edit(reply,idOf(req),auth(req,true)));
 app.post('/edition/contenu/:id/enregistrer',async(req,reply)=>{
  const id=idOf(req);const {s,b}=protectedForm(req,['generation','base',...relevant(id)]);const {generation,base}=numbers(b);const raw:Record<string,string>={id};for(const f of fields)raw[f]=b[f]??'';const c=decode(raw);
  try{store.save(c,generation,base,options.faults?.save);return edit(reply,id,s,{message:'Brouillon enregistré. La version publique est inchangée.'});}catch(err){const fault=err instanceof Fault?err:new Fault(503,'Le brouillon n’a pas été enregistré. Stockage indisponible ; conservez la saisie avant de réessayer.');return edit(reply,id,s,{form:c,generation,base,saved:'',message:fault.message,errors:fault.errors},fault.status);}
 });
 app.post('/edition/contenu/:id/preparer',async(req,reply)=>{
  const id=idOf(req);const {s,b}=protectedForm(req,['generation','base']);const {generation,base}=numbers(b);
  try{const c=store.prepare(id,generation,base);return page(reply,'Confirmer la publication',{kind:'confirm',form:c,changes:compare(store.public().find(p=>p.id===id),c),previewList:store.public().map(p=>p.id===id?c:p),generation,base,csrf:s.csrf,session:sessions.state(s),op:randomUUID()});}catch(err){if(!(err instanceof Fault))throw err;return edit(reply,id,s,{message:err.message,errors:err.errors},err.status);}
 });
 app.post('/edition/contenu/:id/publier',async(req,reply)=>{const id=idOf(req);const {s,b}=protectedForm(req,['generation','base','op']);const {generation,base}=numbers(b);if(!/^[a-f0-9-]{36}$/.test(b.op??''))throw new Fault(400,'Opération invalide.');const op=b.op!;
  store.publish(op,id,generation,base,options.faults?.publish);
  if(options.faults?.lost){req.raw.socket.destroy();return reply;}
  reply.header('X-Belle-Rive-Operation',op);
  return page(reply,'Révision publiée',{kind:'result',operation:store.operation(op),csrf:s.csrf,session:sessions.state(s)});
 });
 app.get('/edition/operation/:op',async(req,reply)=>{const s=auth(req,true);const op=(req.params as {op:string}).op;const operation=store.operation(op);return page(reply,operation?'Révision publiée':'Publication à vérifier',{kind:operation?'result':'message',operation,csrf:s.csrf,session:sessions.state(s),message:operation?'':'Opération non trouvée. Aucun succès confirmé. Revenez à la confirmation conservée pour un réessai avec le même identifiant et la même demande, après vérification du brouillon.'});});
 app.addHook('onClose',async()=>{sessions.clear();challenges.clear();store.close();});
 return {app,sessions};
}

