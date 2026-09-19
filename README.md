# Ashoka Fabricators

A working multi-page website for the Hyderabad rolling shutter, gate, automation and fabrication business. React 19, TypeScript, Vinext (Next.js App Router APIs on Vite/Cloudflare Workers), Tailwind 4, Radix/Shadcn controls, Zod, D1 and R2. Use supplied Worker scripts rather than ordinary `next dev`.

Private review: https://ashoka-fabricators.supriya-naroju05.chatgpt.site (owner sign-in required).

- [Research and client confirmation checklist](docs/RESEARCH.md)
- [Asset sources and licenses](docs/ASSETS.md)
- [Features and launch requirements](docs/HANDOVER.md)
- [QA record](docs/QA.md)

## Local setup

Node 22.13+ required. In this directory:

```sh
npm run install:ci
```

Copy `.env.example` to `.env` (`Copy-Item .env.example .env` in PowerShell). Set `NEXT_PUBLIC_SITE_URL=http://localhost:5173`. Create ignored `.dev.vars` containing `RATE_LIMIT_SECRET=<random-32-byte-secret>`.

```sh
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_violet_lizard.sql
npm run dev
```

Open the printed URL, normally http://localhost:5173. Apply the migration only once per local database. Local D1/R2 data under `.wrangler/state` is separate from hosted data. Restart after changing `.dev.vars`.

On this Windows machine an npm shim issue occurred. Workarounds: `node C:/nvm4w/nodejs/node_modules/npm/bin/npm-cli.js run install:ci`, `node scripts/run-framework.mjs dev`, and `node scripts/run-framework.mjs build`.

## Configuration

| Setting | Purpose |
|---|---|
| NEXT_PUBLIC_SITE_URL | Exact canonical origin, set before build |
| SITE_URL | Trusted runtime canonical origin, overrides build-time origin |
| RATE_LIMIT_SECRET | Required runtime secret for abuse-prevention digests |
| ENQUIRY_WEBHOOK_URL | Optional trusted HTTPS business notification endpoint |
| ENQUIRY_WEBHOOK_TOKEN | Optional secret bearer token |
| D1 DB | Lead records and rate-limit counters |
| R2 BUCKET | Private enquiry attachments |

Production secrets belong in Sites environment settings, not Git. Logical bindings and the existing site ID are in `.openai/hosting.json`. Verified phone/WhatsApp/email belong in `lib/content.ts`; they remain blank until confirmed.

## Production and validation

```sh
npm run build
npm start
node node_modules/typescript/bin/tsc --noEmit
node scripts/verify-enquiries.mjs
```

Build output is `dist/server/index.js` plus client assets, hosting metadata and migrations. `npm start` previews the built Worker, without deploying. Publish through Sites using the existing site ID. Keep owner-private until content and operations are approved. The integration test requires the migrated running local server, refuses non-local hosts and creates a labelled synthetic enquiry. Never copy test data to production.

`lib/content.ts` holds business, product and resource content. `components/` holds reusable UI and forms; `app/` holds pages/API; `db/schema.ts` and `drizzle/` own data. Regenerate schema migrations with `npm run db:generate`; do not edit applied migrations. `node scripts/optimize-images.mjs` creates WebP derivatives. Photos and the self-hosted Manrope font/license live in `public/`.

No fabricated testimonials, projects, prices or specifications. A stored enquiry is never falsely described as a sent email or WhatsApp message.
