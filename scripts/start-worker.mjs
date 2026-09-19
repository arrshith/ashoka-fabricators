import {spawn} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {parseEnv} from 'node:util';
import './sites-env.mjs';
const local=existsSync('.dev.vars')?parseEnv(readFileSync('.dev.vars','utf8')):{};
const args=['--import','./scripts/sites-env.mjs','./node_modules/wrangler/bin/wrangler.js','dev','--config','dist/server/wrangler.json','--local','--persist-to','.wrangler/state','--ip','127.0.0.1','--inspector-port','0','--log-level','warn'];
for(const key of ['RATE_LIMIT_SECRET','SITE_URL','ENQUIRY_WEBHOOK_URL','ENQUIRY_WEBHOOK_TOKEN']){
 const value=local[key]||process.env[key];if(value)args.push('--var',`${key}:${value}`);
}
args.push(...process.argv.slice(2));
console.log('Starting the built Worker locally. Default address: http://127.0.0.1:8787');
const child=spawn(process.execPath,args,{stdio:'inherit'});
child.on('exit',code=>{process.exitCode=code??1});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
