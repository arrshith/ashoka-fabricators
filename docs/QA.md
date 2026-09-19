# QA record

Last run: 20 September 2026, against the rebuild.

## Automated

| Check | Command | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | clean |
| Lint | `npm run lint` | clean |
| Build | `npm run build` | clean, all 13 routes |
| Enquiry API | `node scripts/verify-enquiries.mjs http://localhost:5173` | pass — origin, contact validation, honeypot, file-signature, persistence, notification status, idempotency, reference collision, rate limit |

## Routes

All return 200 (`/nope` correctly 404s): `/`, `/products`,
`/products/{automatic-rolling-shutters, manual-rolling-shutters,
security-gates, entrance-automation, custom-fabrication}`, `/about`,
`/projects`, `/contact`, `/quote`, `/resources`,
`/resources/{manual-or-automatic, prepare-your-enquiry,
planning-gate-automation}`, `/privacy`, `/terms`.

`/solutions` was removed along with the five-step solution finder; its useful
questions were folded into the quote form. Add a redirect if the old URL was
ever published.

## Enquiry funnel

Driven end to end in the browser. Step 1 → 2 → 3, submitted, `201` with a
reference returned, receipt rendered with the honest "notification not
configured" message. Validation blocks correctly on a missing location and on
un-ticked consent, and the error clears when a step is passed.

## Colour contrast

Every text pairing in the palette checked against WCAG 2.1 AA (4.5:1 for body
text). Computed with the relative-luminance formula, not eyeballed:

| Pairing | Ratio |
|---|---|
| ink `#14181a` on paper `#f1f0ec` | 15.67 |
| secondary `#4e5658` on paper | 6.59 |
| steel `#61686a` on paper | 4.98 |
| steel on paper-2 `#e7e6e0` (worst case) | 4.54 |
| steel on white | 5.68 |
| annotation red `#b9202e` on paper | 5.57 |
| annotation red on paper-2 | 5.08 |
| white on annotation red (buttons) | 6.35 |
| inverted ink on graphite `#14181a` | 15.67 |
| inverted secondary `#a8aeae` on graphite | 7.94 |
| inverted red `#e75f6a` on graphite | 5.31 |

Two tokens were changed to reach this: `--steel` from `#6e7679` (3.71 at worst
case) and `--annot-hi` from `#d93f4c` (4.05 on graphite). Re-run the check if
either is edited — `--steel` carries every piece of metadata on the site.

## Accessibility

- One `<h1>` per page; no heading levels skipped.
- Landmarks: `header`, `nav[Main]`, `main`, `footer`, `nav[Legal]`,
  `nav[Contact Ashoka]`. Skip link to `#main`.
- All images carry `alt`; decorative drawings are `aria-hidden`, informative
  ones have `role="img"` and a descriptive label.
- Form controls are native `<input type="radio">`, `<input type="checkbox">`
  and `<select>` — real labels, real keyboard behaviour, real mobile pickers.
- Visible focus ring: 2px annotation red at 3px offset, 5.57:1 against paper.
- Step headings receive focus on advance so the funnel is followable by screen
  reader.
- `prefers-reduced-motion`: the scroll runway collapses, the curtain is not
  rendered and no scroll listener is attached — the shutter simply shows open.

## Responsive

No horizontal overflow at 320, 375, 768, 1024, 1400 or 1680 px
(`scrollWidth === clientWidth`, and no element extending past the client box).

Mobile is designed, not derived: hamburger sheet with scroll lock and Escape
to close, a fixed three-up action bar, the hero drawing-title strip dropped so
it cannot collide with that bar, and 82px of clearance under the hero CTA.

Verified no image is rendered above its native resolution at any width.

## Performance

Measured on the production build.

| | Before | After |
|---|---|---|
| CSS | 161 KB raw / 25.9 KB gzip | 27.5 KB raw / **6.5 KB gzip** |
| All client chunks | 203.7 KB gzip | **161.3 KB gzip** |
| Quote route chunk | 60 KB gzip | **17 KB gzip** |
| Images shipped | 496 KB | **200 KB** |
| Runtime dependencies | 28 | **6** |

The hero — the site's signature interaction — is **2 KB gzipped** and ships no
images. Tailwind, the shadcn component kit and 22 unused packages were removed;
the three form controls still in use were rewritten as native elements, which
is where most of the quote-route saving came from.

Images are `loading="lazy"` except none above the fold (the hero is vector).
The display and mono faces are preloaded; all five faces are Latin-subset
woff2, 115 KB total. Animation is transform and opacity only.

## Known, accepted

- **Streaming SSR heading order.** The served HTML places page content in a
  hidden div after the footer, which an inline script relocates. This is vinext
  wrapping every route in Suspense; it is not affected by `loading.tsx`
  (verified by removing it). It resolves before paint and has no effect on
  users or on JS-executing crawlers.
- **Photography is thin by design.** Three catalogue references and two
  premises photographs, all small, all shown at native size. This is a content
  gap, not a layout one — see the handover.

## Not tested

Lighthouse/field Core Web Vitals on real hardware, and cross-browser rendering
beyond the Chromium engine in the review pane. Both need a deployed URL.
