'use client';
export function track(event:string,properties:Record<string,string|number|boolean>={}){if(typeof window==='undefined')return;window.dispatchEvent(new CustomEvent('ashoka:analytics',{detail:{event,properties}}));}
