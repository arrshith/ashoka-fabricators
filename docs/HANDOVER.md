# Handover

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run start    # built worker, http://localhost:8787
npm run lint
npm run assets   # regenerate public/images from assets/source-images
node scripts/verify-enquiries.mjs http://localhost:5173
```

## Shape of the project

```
app/                    routes; one file per page, server components throughout
  globals.css           the entire design system, ~1000 lines, sectioned
  api/enquiries/        the enquiry endpoint (unchanged from the previous build)
components/
  drawings.tsx          every technical drawing, as inline SVG
  shutter-hero.tsx      the scroll-driven shutter (the only scroll listener)
  quote-form.tsx        the enquiry funnel
  shared.tsx            Chapter, SectionHead, Breadcrumbs, PageHead, JsonLd
lib/
  company.ts            verified company facts + the `unconfirmed` list
  content.ts            products and editorial, data-driven
  projects.ts           the project archive — empty by design
assets/source-images/   untouched originals, not served
docs/DIRECTION.md       why the site looks like this. Read this first.
```

There is no component library and no CSS framework. The design system is one
stylesheet of plain CSS with custom properties; the six runtime dependencies
are React, Next, drizzle, zod and lucide.

## The three rules that keep this site honest

1. **Nothing is invented.** No specification, dimension, certification,
   capacity, warranty, testimonial or project detail appears unless the company
   published it. Missing facts are rendered as visible `TODO` items, not filled
   with plausible placeholders. The list lives in `lib/company.ts` → `unconfirmed`
   and per product in `content.ts` → `unconfirmed`.
2. **No raster asset is displayed above its native size.** See `docs/ASSETS.md`.
3. **Red is only ever a measurement.** Dimension lines, annotation, section
   numbers, the active state, and the primary CTA. Nothing else.

## Adding content

**A product** — add an entry to `products` in `lib/content.ts`. It needs a
`drawing` key; if it needs a new drawing, add a case to `Drawing()` in
`components/drawings.tsx`. The page, the nav, the footer, the sitemap and the
quote form's product list all follow automatically.

**A project** — add an entry to `projects` in `lib/projects.ts`. It requires
`imageWidth`/`imageHeight` so the archive can honour rule 2. The projects page
switches from the honest empty state to the archive as soon as the array is
non-empty. **Do not add one until the client has supplied a photograph they
own, the installation details, and the customer's permission to be named.**

**A note** — add an entry to `articles` in `lib/content.ts`.

**Turning on a contact channel** — set `phone`, `whatsapp` or `email` in
`lib/company.ts`. The contact page, the mobile action bar and the WhatsApp
dock all appear or change on their own; nothing renders a channel that is
empty, so there is never a dead number on the page.

## Things worth knowing

- **The hero.** `components/shutter-hero.tsx`. The section is a scroll runway;
  the stage inside it is `position: sticky` for the duration, and one scroll
  listener drives a transform per slat. It is 2 KB gzipped. Closed is the
  server-rendered default, so it is correct with no JavaScript, and
  `prefers-reduced-motion` gets a static open state with no listener at all.
  If you change the header height, change `--hdr` — the hero's geometry is
  derived from it.
- **`overflow-x: clip` on `body`, not `hidden`.** `hidden` would make the body
  a scroll container and break the sticky hero.
- **Streaming SSR.** vinext wraps each route in a Suspense boundary, so the
  served HTML has `<main>` empty, then the footer, then the page content in a
  hidden div that an inline script relocates. This resolves instantly on the
  client and is framework behaviour, not something `loading.tsx` controls —
  removing that file changes nothing. Worth knowing if you ever diff raw HTML.
- **The enquiry API is untouched** and still passes its integration suite:
  origin check, contact validation, honeypot, magic-byte file validation,
  R2 + D1 persistence, idempotent retries, reference-collision rejection and
  HMAC-keyed rate limiting.
- **The quote funnel is submittable at step 3 of 4.** Step 4 (detail and
  photographs) is deliberately optional and offered after the point of no
  return. Don't make it required — the previous seven-step form put five
  screens in front of taking someone's name.

## Before launch

Blocking, and all sourced from the client:

1. Direct phone, WhatsApp, enquiry email, final domain.
2. Exact street address and opening hours. Public directories list a Fathe
   Nagar, Hyderabad 500018 address but with a conflicting GST number and
   founding year, so it is **not** published. Confirm before adding.
3. Logo master artwork, and written reuse rights for the company-listed photos.
4. Approved project photographs, details, and client-reference permissions.
5. Product dimensions, materials, finishes, motor datasheets, safety devices,
   warranty terms, installation and service scope — these are the `TODO` items
   on each product page.
6. Enquiry notification destination (`ENQUIRY_WEBHOOK_URL`), retention policy
   and a named privacy contact.

Also worth commissioning, in rough order of impact on how the site looks:

- **A photo shoot.** Half a day in the workshop and at two or three
  installations would let real photography sit alongside the drawings. The
  drawings are not a stopgap — they should stay — but a few honest, large,
  well-lit photographs of actual work would lift the site considerably.
- **Vector logo artwork.** The mark is currently a 108 px crop of a JPEG.
