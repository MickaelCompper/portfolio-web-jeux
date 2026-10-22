'use strict';
const sessionBox=document.querySelector('[data-session]');
const warning=document.getElementById('warning');
let expiry=Number(sessionBox?.dataset.expiry),offset=Number(sessionBox?.dataset.now)-Date.now(),announced=false;
let warningTimer,expiryTimer;
function armWarning(){clearTimeout(warningTimer);clearTimeout(expiryTimer);const remaining=expiry-(Date.now()+offset);warningTimer=setTimeout(showWarning,Math.max(0,remaining-120000));expiryTimer=setTimeout(showWarning,Math.max(0,remaining));}
const csrf=()=>document.querySelector('[data-extend] input[name=csrf]')?.value||'';
async function checkSession(){
 try{const response=await fetch('/edition/session',{cache:'no-store'});if(!response.ok)throw new Error('expired');const state=await response.json();expiry=state.expiry;offset=state.now-Date.now();showWarning();armWarning();}
 catch{if(warning)warning.textContent='Session absente, expirée ou état indisponible. Vérifiez la connexion avant toute action. La saisie reste dans cette page.';return false;}return true;
}
function showWarning(){if(!warning)return;const remaining=expiry-(Date.now()+offset);if(remaining<=0){warning.textContent='Session arrivée à échéance. Reconnectez-vous ; aucune publication automatique.';return;}if(remaining<=120000&&!announced){announced=true;warning.textContent='Votre session va expirer dans deux minutes. Prolongez-la pour continuer l’édition. Cette action ne publie pas vos modifications.';}}
if(sessionBox){setInterval(showWarning,15000);showWarning();armWarning();document.addEventListener('visibilitychange',()=>{if(!document.hidden)void checkSession();});window.addEventListener('focus',()=>void checkSession());}
document.querySelector('[data-extend]')?.addEventListener('submit',async event=>{
 event.preventDefault();try{const response=await fetch('/edition/prolonger',{method:'POST',body:new URLSearchParams({csrf:csrf()})});if(!response.ok)throw new Error('unconfirmed');if(!await checkSession())return;announced=false;warning.textContent='Session prolongée, échéances confirmées par le serveur. Aucune publication effectuée.';document.getElementById('expiry').textContent='Échéance serveur : '+new Date(expiry).toLocaleString('fr-FR')+'.';}
 catch{warning.textContent='Prolongation à vérifier. Relisez l’état de session avant de conclure.';await checkSession();}
});
let dirty=false;const draft=document.querySelector('[data-draft]');
draft?.addEventListener('input',()=>{dirty=true;document.getElementById('dirty').textContent='Modifications non enregistrées';});
draft?.addEventListener('submit',async event=>{event.preventDefault();try{const response=await fetch(draft.action,{method:'POST',body:new URLSearchParams(new FormData(draft))});if(!response.ok){const html=new DOMParser().parseFromString(await response.text(),'text/html');document.getElementById('dirty').textContent=html.querySelector('.notice')?.textContent||'Le brouillon n’a pas été enregistré. Conservez la saisie.';dirty=true;return;}dirty=false;window.location.assign(draft.action.replace(/\/enregistrer$/,''));}catch{dirty=true;document.getElementById('dirty').textContent='Enregistrement à vérifier : réponse non reçue. Saisie conservée ici ; copiez-la avant de recharger le brouillon.';}});
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue='';}});
document.querySelector('[data-prepare]')?.addEventListener('submit',event=>{if(dirty){event.preventDefault();document.getElementById('dirty').textContent='Enregistrez les modifications avant de préparer la publication.';document.getElementById('dirty').focus();}});
document.querySelector('[data-focus]')?.focus();
document.querySelector('[data-publish]')?.addEventListener('submit',async event=>{
 event.preventDefault();const form=event.currentTarget;const button=form.querySelector('button');button.disabled=true;
 try{const response=await fetch(form.action,{method:'POST',body:new URLSearchParams(new FormData(form)),redirect:'follow'});if(!response.ok){const html=await response.text();document.open();document.write(html);document.close();return;}if(response.headers.get('X-Belle-Rive-Operation')!==form.dataset.operation){document.getElementById('uncertain').hidden=false;return;}window.location.assign('/edition/operation/'+encodeURIComponent(form.dataset.operation));}
 catch{document.getElementById('uncertain').hidden=false;}
});
