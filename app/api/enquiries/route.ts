import {enquirySchema} from '@/lib/enquiry-schema';import {getBusinessEnv} from '@/lib/server-env';import {validateUpload} from '@/lib/upload-validation';
const MAX_BODY=13*1024*1024;const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function boundedBody(request:Request){const reader=request.body?.getReader();if(!reader)throw Error('empty');let size=0;const chunks:Uint8Array[]=[];try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>MAX_BODY){await reader.cancel();throw Error('large')}chunks.push(value)}}finally{reader.releaseLock()}const combined=new Uint8Array(size);let at=0;for(const c of chunks){combined.set(c,at);at+=c.length}return combined}
export async function POST(request:Request){
 const origin=request.headers.get('origin');if(!origin||origin!==new URL(request.url).origin)return json({error:'This request must be sent from the enquiry form on this site.'},403);
 if(!request.headers.get('content-type')?.startsWith('multipart/form-data'))return json({error:'Invalid enquiry format.'},415);
 if(Number(request.headers.get('content-length')||0)>MAX_BODY)return json({error:'The attachment total is too large. Use up to 3 files of 4 MB each.'},413);
 const {DB,BUCKET,RATE_LIMIT_SECRET,ENQUIRY_WEBHOOK_URL,ENQUIRY_WEBHOOK_TOKEN}=getBusinessEnv();
 if(!DB||!BUCKET||!RATE_LIMIT_SECRET)return json({error:'Online enquiries are temporarily unavailable. Your entries are still here. Please call or WhatsApp Ashoka on the number on the contact page.'},503);
 try{
  const ip=request.headers.get('cf-connecting-ip')||'local';const now=Date.now();const windowId=Math.floor(now/900000);const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(RATE_LIMIT_SECRET),{name:'HMAC',hash:'SHA-256'},false,['sign']);const signed=await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(`${windowId}:${ip}`));const digest=Array.from(new Uint8Array(signed),b=>b.toString(16).padStart(2,'0')).join('');
  await DB.prepare('DELETE FROM submission_limits WHERE expires_at < ?').bind(now).run();
  const rate=await DB.prepare('INSERT INTO submission_limits (key,count,expires_at) VALUES (?,1,?) ON CONFLICT(key) DO UPDATE SET count = count + 1 RETURNING count').bind(digest,(windowId+1)*900000).first<{count:number}>();
  if((rate?.count||0)>5)return json({error:'Too many attempts. Please wait 15 minutes before trying again.'},429);
  let form:FormData;try{const bytes=await boundedBody(request);form=await new Response(bytes,{headers:{'Content-Type':request.headers.get('content-type')!}}).formData()}catch(e){return json({error:e instanceof Error&&e.message==='large'?'The attachment total is too large.':'The enquiry could not be read. Please check the attachments and try again.'},400)}
  let raw:unknown;try{raw=JSON.parse(String(form.get('enquiry')||''))}catch{return json({error:'The enquiry details are invalid.'},400)}
  const parsed=enquirySchema.safeParse(raw);if(!parsed.success)return json({error:parsed.error.issues.map(i=>i.message).join(' ')},400);const data=parsed.data;
  const previous=await DB.prepare('SELECT id, notification, payload FROM enquiries WHERE id = ?').bind(data.requestId).first<{id:string;notification:string;payload:string}>();
  if(previous){if(previous.payload!==JSON.stringify(data))return json({error:'This enquiry reference has already been used. Reload the form to begin a new enquiry.'},409);return json({id:previous.id,notification:previous.notification})}
  const entries=form.getAll('files');if(entries.length>3)return json({error:'You can attach up to 3 files.'},400);
  const files:File[]=[];for(const entry of entries){if(typeof entry==='string'||!await validateUpload(entry))return json({error:'Use valid JPG, PNG, WebP or PDF files up to 4 MB each.'},400);files.push(entry)}
  const attachments:{key:string;name:string;type:string;size:number}[]=[];
  try{
   for(const file of files){const objectKey=`enquiries/${data.requestId}/${crypto.randomUUID()}`;await BUCKET.put(objectKey,await file.arrayBuffer(),{httpMetadata:{contentType:'application/octet-stream',contentDisposition:'attachment'},customMetadata:{originalType:file.type}});attachments.push({key:objectKey,name:file.name.replace(/[\x00-\x1f\x7f]/g,'').slice(0,200),type:file.type,size:file.size})}
   await DB.prepare('INSERT INTO enquiries (id,created_at,payload,attachments,notification) VALUES (?,?,?,?,?)').bind(data.requestId,now,JSON.stringify(data),JSON.stringify(attachments),'unconfigured').run();
  }catch{await Promise.allSettled(attachments.map(a=>BUCKET.delete(a.key)));return json({error:'Your enquiry could not be saved. Your entries are still here; please try again.'},503)}
  let notification='unconfigured';
  if(ENQUIRY_WEBHOOK_URL){notification='failed';try{const endpoint=new URL(ENQUIRY_WEBHOOK_URL);if(endpoint.protocol!=='https:')throw Error('HTTPS required');const result=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json',...(ENQUIRY_WEBHOOK_TOKEN?{Authorization:`Bearer ${ENQUIRY_WEBHOOK_TOKEN}`}:{})},body:JSON.stringify({reference:data.requestId,createdAt:now,enquiry:data,attachments:attachments.map(({name,type,size})=>({name,type,size}))}),signal:AbortSignal.timeout(8000),redirect:'error'});if(result.ok)notification='sent'}catch{notification='failed'}
   try{await DB.prepare('UPDATE enquiries SET notification = ? WHERE id = ?').bind(notification,data.requestId).run()}catch{/* A saved enquiry remains a success even if notification status fails. */}
  }
  return json({id:data.requestId,notification},201);
 }catch{return json({error:'The enquiry service is temporarily unavailable. Your entries are still here; please try again.'},503)}
}
