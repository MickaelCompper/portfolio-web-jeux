// Diagnostic only: records loader timings, never form bodies, cookies or secrets.
import {registerHooks} from 'node:module';
const began=performance.now(),loads=[],resolves=[];
registerHooks({
 resolve(specifier,context,next){const t=performance.now();try{return next(specifier,context);}finally{resolves.push({specifier,ms:performance.now()-t});}},
 load(url,context,next){const t=performance.now();try{return next(url,context);}finally{loads.push({url,ms:performance.now()-t});}}
});
process.on('message',message=>{if(message==='stop'&&process.connected)process.send({profile:true,elapsedSincePreload:performance.now()-began,loads,resolves,nodeTiming:performance.nodeTiming.toJSON()});});
