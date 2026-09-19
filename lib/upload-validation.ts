import {allowedMime,maxFileSize} from './enquiry-schema';
export async function validateUpload(file:File){
 if(file.size===0||file.size>maxFileSize||!allowedMime.includes(file.type))return false;
 const b=new Uint8Array(await file.slice(0,16).arrayBuffer());
 const signatures:Record<string,boolean>={
 'image/jpeg':b[0]===0xff&&b[1]===0xd8&&b[2]===0xff,
 'image/png':[137,80,78,71,13,10,26,10].every((v,i)=>b[i]===v),
 'application/pdf':String.fromCharCode(...b.slice(0,5))==='%PDF-',
 'image/webp':String.fromCharCode(...b.slice(0,4))==='RIFF'&&String.fromCharCode(...b.slice(8,12))==='WEBP',
 };return signatures[file.type]===true;
}
