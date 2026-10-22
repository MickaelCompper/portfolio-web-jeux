import {validate, relevant} from './model.js';
import type {Content} from './model.js';
export function compare(before:Content|undefined,after:Content){return relevant(after.id).filter(f=>before?.[f]!==after[f]).map(field=>({field,before:before?.[field]??'',after:after[field]}));}
export function quality(c:Content,published:Content[],clock:string){
 const findings:{level:string;field:string;text:string}[]=[];
 for(const [field,text] of Object.entries(validate(c,published)))findings.push({level:'Bloquant',field,text});
 if(c.id==='EV-01'&&Date.parse(c.end)<=Date.parse(clock))findings.push({level:'À revoir',field:'end',text:'Événement terminé : vérifier son archivage. Ce n’est pas une erreur de publication.'});
 if(c.exceptionDate&&c.exceptionDate<clock.slice(0,10))findings.push({level:'À revoir',field:'exceptionDate',text:'Exception passée : vérifier si elle doit être retirée par une nouvelle révision.'});
 if(c.id==='EQ-01'&&/non document|inconnu|non renseign/i.test(c.access))findings.push({level:'Information inconnue',field:'access',text:'Accès physique explicitement non documenté. Ne conclure ni à l’accessibilité ni à l’inaccessibilité.'});
 return findings;
}
