import {randomBytes,timingSafeEqual} from 'node:crypto';
export const random=()=>randomBytes(32).toString('hex');
export function equal(a:string,b:string):boolean {return /^[a-f0-9]{64}$/.test(a)&&/^[a-f0-9]{64}$/.test(b)&&timingSafeEqual(Buffer.from(a),Buffer.from(b));}
export interface Session {id:string;csrf:string;idle:number;duration:number;}
export class Sessions {
 private sessions=new Map<string,Session>();
 constructor(private now:()=>number=Date.now){}
 create():Session {const s={id:random(),csrf:random(),idle:this.now()+1800000,duration:this.now()+14400000};this.sessions.set(s.id,s);return s;}
 get(id:string,touch=false):Session|undefined {const s=this.sessions.get(id);if(!s)return;if(this.now()>=Math.min(s.idle,s.duration)){this.sessions.delete(id);return;}if(touch)s.idle=this.now()+1800000;return s;}
 extend(s:Session){s.idle=this.now()+1800000;s.duration=this.now()+14400000;}
 state(s:Session){const expiry=Math.min(s.idle,s.duration);return {idle:s.idle,duration:s.duration,expiry,now:this.now(),warning:expiry-this.now()<=120000};}
 remove(id:string){this.sessions.delete(id);}
 clear(){this.sessions.clear();}
}
