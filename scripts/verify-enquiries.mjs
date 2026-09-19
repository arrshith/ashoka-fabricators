import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const base=process.argv[2]||'http://localhost:5173';
if(!['localhost','127.0.0.1'].includes(new URL(base).hostname))throw Error('This synthetic-data test is local-only.');
const address=`test-${crypto.randomUUID()}`;
const data={requestId:crypto.randomUUID(),product:'manual-rolling-shutters',projectType:'Commercial',width:'3000',height:'2400',unit:'mm',location:'Local QA test',requirements:'Synthetic integration test — not a business enquiry.',name:'QA Test',phone:'+15555550100',whatsapp:'',email:'qa@example.test',consent:true,website:''};
async function submit(value,file,ip=address,origin=base){const form=new FormData();form.set('enquiry',JSON.stringify(value));if(file)form.append('files',file);const r=await fetch(`${base}/api/enquiries`,{method:'POST',headers:{Origin:origin,'cf-connecting-ip':ip},body:form});return {status:r.status,body:await r.text().then(t=>{try{return JSON.parse(t)}catch{return {error:t}}})};}
assert.equal((await submit(data,null,address,'https://untrusted.example')).status,403,'Cross-origin rejected');
assert.equal((await submit({...data,phone:'invalid'},null,`${address}-invalid`)).status,400,'Invalid contact rejected');
assert.equal((await submit({...data,website:'spam.example'},null,`${address}-spam`)).status,400,'Honeypot rejected');
assert.equal((await submit(data,new File(['fake image'],'fake.jpg',{type:'image/jpeg'}),`${address}-file`)).status,400,'Invalid file signature rejected');
const file=new File([await readFile(new URL('../public/images/logo.jpg',import.meta.url))],'qa-logo.jpg',{type:'image/jpeg'});
const saved=await submit(data,file);assert.equal(saved.status,201,JSON.stringify(saved));assert.equal(saved.body.id,data.requestId);assert.equal(saved.body.notification,'unconfigured');
const again=await submit(data,file);assert.equal(again.status,200);assert.equal(again.body.id,data.requestId,'Idempotent retry');
assert.equal((await submit({...data,name:'Changed'},null)).status,409,'Reference collision rejected');
const limitIp=`${address}-limit`;for(let i=0;i<5;i++)await submit({...data,phone:'invalid'},null,limitIp);assert.equal((await submit(data,null,limitIp)).status,429,'Durable rate limit');
console.log('PASS: origin, contact validation, honeypot, file signature, persistence, notification status, idempotency, collision and rate limit.');
console.log(`Synthetic local enquiry reference: ${data.requestId}`);
