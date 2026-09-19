import {env} from 'cloudflare:workers';
type BusinessEnv={DB?:D1Database;BUCKET?:R2Bucket;RATE_LIMIT_SECRET?:string;ENQUIRY_WEBHOOK_URL?:string;ENQUIRY_WEBHOOK_TOKEN?:string};
export function getBusinessEnv(){return env as unknown as BusinessEnv}
