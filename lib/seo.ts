import type {Metadata} from 'next';
import {env} from 'cloudflare:workers';
export const siteUrl=(env as unknown as {SITE_URL?:string}).SITE_URL||process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:5173';
export function pageMeta(title:string,description:string,path:string):Metadata{return {title,description,alternates:{canonical:new URL(path,siteUrl).toString()},openGraph:{title:`${title} | Ashoka Fabricators`,description,url:new URL(path,siteUrl).toString(),type:'website',locale:'en_IN',siteName:'Ashoka Fabricators'},twitter:{card:'summary',title,description}}}
