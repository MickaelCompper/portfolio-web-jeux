export const ids = ['IP-01','IP-02','EQ-01','EV-01'] as const;
export type Id = typeof ids[number];
export interface Content {
  id: Id; title: string; summary: string; body: string; terms: string; date: string;
  address: string; entrance: string; hours: string; exceptionDate: string; exceptionPeriod: string; exceptionText: string;
  start: string; end: string; organization: string; cancellation: string; audience: string; conditions: string; place: string; access: string;
}
export const fields = ['title','summary','body','terms','date','address','entrance','hours','exceptionDate','exceptionPeriod','exceptionText','start','end','organization','cancellation','audience','conditions','place','access'] as const;
export const labels: Record<typeof fields[number],string> = {
  title:'Titre',summary:'Résumé',body:'Corps du contenu',terms:'Termes éditoriaux',date:'Date éditoriale fictive (AAAA-MM-JJ)',
  address:'Adresse fictive',entrance:'Entrée',hours:'Horaires ordinaires (un jour par ligne : Jour | plage ; plage)',exceptionDate:'Date de l’exception (AAAA-MM-JJ)',exceptionPeriod:'Période affectée (HH:MM-HH:MM)',exceptionText:'Effet et texte utile de l’exception',
  start:'Début (AAAA-MM-JJT HH:MM avec décalage, sans espace)',end:'Fin (même format)',organization:'Organisation (annoncé ou annulé)',cancellation:'Message d’annulation',audience:'Public',conditions:'Conditions',place:'Identifiant du lieu publié',access:'Accès physique (information ou inconnu explicite)'
};
export function isId(x: string): x is Id { return (ids as readonly string[]).includes(x); }
export function relevant(id:Id) { return fields.filter(f=> ['title','summary','body','terms','date'].includes(f) || (id==='IP-01' && ['address','entrance','hours','exceptionDate','exceptionPeriod','exceptionText'].includes(f)) || (id==='EQ-01' && ['address','entrance','hours','access'].includes(f)) || (id==='EV-01' && ['start','end','organization','cancellation','audience','conditions','place'].includes(f))); }
export function decode(value:unknown):Content {
  if(!value || typeof value!=='object') throw new Error('Format contenu invalide');
  const o=value as Record<string,unknown>;
  if(typeof o.id!=='string'||!isId(o.id)||fields.some(f=>typeof o[f]!=='string')||Object.keys(o).some(k=>k!=='id'&&!(fields as readonly string[]).includes(k))) throw new Error('Format contenu invalide');
  return o as unknown as Content;
}
export function words(s:string):string[] { return s.normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase('fr').split(/[^\p{L}\p{N}]+/u).filter(Boolean); }
export function search(list:Content[],q:string):Content[] {const w=words(q); return w.length?list.filter(c=>{const hay=new Set(words(c.title+' '+c.summary+' '+c.terms));return w.every(x=>hay.has(x));}).sort((a,b)=>a.title.localeCompare(b.title,'fr')||a.id.localeCompare(b.id)):[];}
export function status(c:Content,clock:string):string {return c.organization==='annulé'?'Annulé':Date.parse(clock)>=Date.parse(c.end)?'Passé':Date.parse(clock)>=Date.parse(c.start)?'En cours':'À venir';}
function validDate(s:string):boolean {const t=Date.parse(s);return /^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(t)&&new Date(t).toISOString().slice(0,10)===s;}
function parisInstant(s:string):boolean {if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+0[12]:00$/.test(s)||!validDate(s.slice(0,10))||!Number.isFinite(Date.parse(s)))return false;const p=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).format(new Date(s)).replace(' ','T');return p===s.slice(0,19);}
export function validate(c:Content,published:Content[]):Record<string,string> {
 const errors:Record<string,string>={};
 for(const f of ['title','summary','body','date'] as const) if(!c[f].trim()) errors[f]='Renseignez ce champ obligatoire.';
 if(!validDate(c.date)) errors.date='Indiquez une date AAAA-MM-JJ valide.';
 if(c.id==='IP-01'||c.id==='EQ-01') {
  for(const f of ['address','entrance','hours'] as const) if(!c[f].trim()) errors[f]='Renseignez ce champ obligatoire.';
  const days=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche']; const lines=c.hours.split('\n');
  if(lines.length!==7||lines.some((line,i)=>{const [day,ranges]=line.split('|').map(x=>x.trim()); if(day!==days[i]||!ranges)return true;if(ranges==='Fermé')return false;let previous=-1;return ranges.split(';').some(r=>{const m=/^(\d{2}):(\d{2})-(\d{2}):(\d{2})$/.exec(r.trim());if(!m)return true;const nums=m.slice(1).map(Number);const a=nums[0]! *60+nums[1]!,b=nums[2]! *60+nums[3]!;const bad=nums[0]!>23||nums[2]!>23||nums[1]!>59||nums[3]!>59||b<=a||a<previous;previous=b;return bad;});}))errors.hours='Sept jours ordonnés, plages HH:MM-HH:MM séparées par ; ou Fermé. Sans chevauchement.';
 }
 if(c.id==='IP-01'&&(c.exceptionDate||c.exceptionPeriod||c.exceptionText)) {
  if(!validDate(c.exceptionDate)) errors.exceptionDate='Renseignez la date de l’exception.';
  const m=/^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/.exec(c.exceptionPeriod);
  if(!m||m[1]!+m[2]!>=m[3]!+m[4]!) errors.exceptionPeriod='Renseignez une période HH:MM-HH:MM avec fin après début.';
  if(!c.exceptionText.trim()) errors.exceptionText='Décrivez l’effet, avec les plages maintenues si nécessaire.';
 }
 if(c.id==='EQ-01'&&!c.access.trim()) errors.access='Renseignez l’information ou son absence explicite.';
 if(c.id==='EV-01') {
  for(const f of ['start','end'] as const) if(!parisInstant(c[f])) errors[f]='Indiquez un instant valide du scénario Europe/Paris avec le bon décalage (+01:00 en novembre).';
  if(Date.parse(c.end)<=Date.parse(c.start)) errors.end='La fin doit suivre strictement le début.';
  if(!['annoncé','annulé'].includes(c.organization)) errors.organization='Choisissez annoncé ou annulé.';
  for(const f of ['audience','conditions'] as const)if(!c[f].trim())errors[f]='Renseignez ce champ obligatoire.';
  if(c.organization==='annulé'&&!c.cancellation.trim())errors.cancellation='Expliquez l’annulation, sans inventer de report.';
  if(!published.some(p=>p.id===c.place&&p.id==='EQ-01'))errors.place='Le lieu doit désigner EQ-01 publié.';
 }
 return errors;
}
const empty={address:'',entrance:'',hours:'',exceptionDate:'',exceptionPeriod:'',exceptionText:'',start:'',end:'',organization:'',cancellation:'',audience:'',conditions:'',place:'',access:''};
export function corpus():Content[] {return [
 {...empty,id:'IP-01',title:'Venir à l’accueil de la mairie',summary:'Retrouvez les horaires et les indications d’accès à l’accueil de la mairie fictive de Belle-Rive.',body:'Préparer un déplacement pour demander une orientation à l’accueil.',terms:'horaires, mairie, accueil, visite',date:'2026-11-09',address:'Place de la Mairie — Belle-Rive, adresse fictive.',entrance:'Entrée côté place.',hours:'Lundi | 09:00-12:00\nMardi | 09:00-12:00\nMercredi | 09:00-12:00 ; 14:00-17:00\nJeudi | 09:00-12:00\nVendredi | 09:00-12:00\nSamedi | Fermé\nDimanche | Fermé'},
 {...empty,id:'IP-02',title:'Préparer une visite à l’accueil',summary:'Quelques repères pour préparer votre question avant une visite à l’accueil fictif de Belle-Rive.',body:'1. Notez votre question et ce que vous souhaitez comprendre.\n2. Consultez la fiche « Venir à l’accueil de la mairie » avant de vous déplacer.\n3. Sur place, expliquez votre besoin pour demander une orientation dans le scénario.\n\nCette fiche de démonstration ne décrit aucune procédure administrative réelle et ne fournit aucune liste réglementaire de documents. Elle ne permet ni dépôt de demande ni prise de rendez-vous.',terms:'préparation, question, orientation, visite',date:'2026-11-09'},
 {...empty,id:'EQ-01',title:'Médiathèque des Rives',summary:'Un lieu fictif consacré à la lecture et à la consultation sur place.',body:'La médiathèque des Rives accueille des temps de lecture dans le scénario de Belle-Rive. Les conditions d’un éventuel emprunt ne sont pas décrites dans cette démonstration.',terms:'médiathèque, lecture, équipement, horaires',date:'2026-11-09',address:'4, promenade des Rives — Belle-Rive, adresse fictive.',entrance:'Entrée côté promenade.',hours:'Lundi | Fermé\nMardi | 14:00-18:00\nMercredi | 10:00-12:00 ; 14:00-18:00\nJeudi | Fermé\nVendredi | 14:00-18:00\nSamedi | 10:00-12:00 ; 14:00-18:00\nDimanche | Fermé',access:'Information non documentée dans ce scénario. Cette absence ne permet de conclure ni à l’accessibilité ni à l’inaccessibilité du bâtiment fictif.'},
 {...empty,id:'EV-01',title:'Histoires au bord de l’eau',summary:'Une séance de lecture fictive à partager à la médiathèque des Rives.',body:'Un temps de lecture proposé dans le cadre de la démonstration Belle-Rive. Aucun événement réel n’est organisé.',terms:'lecture, histoires, enfant, médiathèque',date:'2026-11-09',start:'2026-11-21T15:00:00+01:00',end:'2026-11-21T16:00:00+01:00',organization:'annoncé',audience:'Dès 6 ans ; enfant accompagné.',conditions:'Gratuit, entrée libre sans réservation, dans la limite des places du scénario. Aucune disponibilité en temps réel ni participation garantie.',place:'EQ-01'}];}
