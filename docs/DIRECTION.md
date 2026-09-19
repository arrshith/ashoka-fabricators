# Creative direction — Ashoka Fabricators

Written 20 September 2026, after auditing the previous build and re-verifying the company sources.

---

## 1. What was wrong with the previous build

The previous site was not badly *engineered*. Its markup is semantic, its enquiry API is genuinely well built (HMAC rate limiting, idempotency, magic-byte upload validation, R2 + D1), its research was careful and its content was honest. None of that is the problem, and none of it was thrown away.

The problem is strategic:

> **It was built as a photography-led architectural product publication by a company that has no photography.**

Every reference in that class — Hörmann, architectural product brands, the awwwards industrial sites — is carried by enormous commissioned art direction. Ashoka's entire image library is eight IndiaMART thumbnails:

| Asset | Native size | Reality |
|---|---|---|
| `shutter.jpg` | 500 × 448 | Catalogue thumbnail **with a picture-in-picture inset and a black border baked in** |
| `fabrication.jpg` | 400 × 400 | Generic stock "sparks" photo |
| `gate.jpg` | 250 × 188 | Blue gate on grass under a grey northern-European sky |
| `electric.jpg` | 250 × 250 | A real Centro storefront — genuinely valuable |
| `motor.png` | 250 × 101 | Two motors on white |
| `location.jpg` | 750 × 1000 | Phone snapshot of the premises |
| `board.jpg` | 1000 × 750 | The weathered hand-painted ASHOKA sign |
| `logo.jpg` | 120 × 120 | Logo, as a JPEG, with a white box around it |

The previous build put the 500px catalogue thumbnail — inset artifact and all — full-bleed behind a 1440px hero, and stretched the 400px stock sparks into a 665px-tall feature panel. The result is not a premium site. It is an IndiaMART profile with better margins, which is precisely the outcome the brief forbids.

Three further consequences followed from the same root cause:

- **The site apologises for itself.** "Catalogue imagery." "For illustration." "Not a verified workshop pin." "Product illustration, not a case study." The honesty is right; needing it on every image is the symptom. A site that keeps disclaiming its own pictures cannot look confident.
- **No photographic coherence.** Three product cards, three unrelated photographic worlds — a UK gate, an Indian mall shutter, a white-background motor — with `mix-blend-mode: multiply` over them, which dirties any image that has a real background.
- **The typography and palette are soft.** Manrope is a friendly geometric grotesk that reads consumer-fintech. The `#303b37` "heritage" green is invented, and reads agricultural rather than industrial. Hero tracking of `-0.07em` collides letters — "BUILT TO" renders as "BUILTTO".

The motion audit is short: there is essentially one interaction, a button labelled "Open a new perspective" that scales the background image. It is decorative, it is not mechanical, and it does not describe the product. There is no WebGL, which was the correct call, made for the wrong reason.

**Improving this design within the same strategy cannot work.** Enlarging the images makes them worse. Better cropping does not remove a baked-in picture-in-picture artifact. The strategy has to change.

---

## 2. What the research actually says (and why it changes the target)

Re-verified from the IndiaMART profile and seller page:

- Established **1972**. Hyderabad, Telangana. **Proprietorship.** GST `36DVXPS6316E2ZX`, registered 2024.
- **Up to 10 employees** (1–5 skilled, 1–5 semi-skilled).
- **1,000 sq ft** premises. Permanent structure, semi-urban, front porch.
- Departments: manufacturing, quality testing, designing, warehousing, packaging, sales & marketing.
- 39 products across 8 categories — including **Boom Barriers** and **Shutter Locks**, which the previous site omitted entirely.
- Clients listed by the company: R.S. Brothers, J.C. Brothers, Centro, Chandana Bros, South India, GRT, Kalanjali, Kala Niketan.

This is the single most important finding, and it overrides part of the original brief.

The brief asks: *"Does the site communicate scale?"* For this company, **it must not.** Ashoka is a ten-person, thousand-square-foot workshop that has been making shutters to measure for fifty-four years. A website that performs the scale of a multinational door manufacturer would be a lie, and — more practically — it would ring false to anyone who has ever visited Fathe Nagar.

So the premium being targeted is deliberately **not a premium of scale. It is a premium of precision and longevity.** A master fabricator's shop, not a factory. Fifty-four years, one workshop, made to your dimensions. That is both true and, properly told, far more distinctive than manufactured corporate bigness.

---

## 3. The direction: **THE DRAWING**

Between a customer's opening and a finished shutter there is exactly one object: **the measured drawing.** It is what Ashoka's own content already asks for — *"bring a drawing, reference or project requirement."* It is what a small precision shop actually works from.

So the site is built in the language of the measured drawing: orthographic elevation, dimension lines, leader arrows, section marks, scale rules, part callouts.

This is chosen for five reasons, in order of importance:

1. **It is authentic.** It is literally how the work is done.
2. **It resolves the asset crisis.** Vector is infinitely sharp at any viewport, and weighs almost nothing.
3. **It lets the site stop apologising.** A schematic is understood as a schematic. It makes no claim about a specific installation, so it needs no disclaimer. Honesty stops being a caption and becomes a property of the medium.
4. **It reframes small as precise.** Drawings are the visual language of exactness, not of size.
5. **Nobody in this category does it.** Every competitor is photographs-of-shutters-on-white.

### Photography policy

One rule fixes most of what was wrong:

> **No raster asset is ever displayed larger than its native pixel dimensions.**

Applied:

- `shutter.jpg` — **retired from the hero.** Cropped to remove the inset artifact and the black border; used only as a small catalogue reference.
- `fabrication.jpg` — **removed.** It is generic stock. The brief is explicit: if stock photography weakens the brand, replace it. Replaced by drawing.
- `gate.jpg` — **removed from prominent use.** Visually foreign to both the palette and to Hyderabad.
- `motor.png` — small technical inset on the automation page only.
- `electric.jpg` — kept. It is a real Centro storefront and Centro is a company-listed client. Used small, once, labelled precisely for what it is.
- `board.jpg` — **promoted to the emotional centre of the site.** The weathered, hand-painted ASHOKA sign is the only asset with genuine power, and it is 1972 made visible. Treated as an artifact, not as a facility shot.
- `location.jpg` — the premises, shown honestly and small, on About.
- `logo.jpg` — **redrawn as SVG.** The mark is a red rounded-rectangle wordmark; vectorising it faithfully is not inventing branding, and it removes the white JPEG box.

### Colour

Restrained, and derived from the real logo rather than invented.

| Token | Value | Role |
|---|---|---|
| Paper | `#F1F0EC` | Drafting paper. Default surface. |
| Graphite | `#14181A` | Near-black. Inverted panels, display type. |
| Steel | `#6E7679` | Mid grey. Structure, rules, secondary text. |
| Steel light | `#C9CCCA` | Hairlines, grid. |
| **Annotation red** | `#B9202E` | **The logo red — used only as annotation ink.** |

The discipline that makes this work: **red is only ever a measurement.** Dimension lines, leader arrows, section markers, the active state, and the primary CTA. Nothing else. Red comes to mean *"this is the dimension"* — which is exactly the company's value. The invented green is gone.

### Type

The **IBM Plex** superfamily — one family, three voices, and real engineering provenance rather than SaaS provenance.

- **IBM Plex Sans Condensed** 600/700 — display. Condensed reads as steel signage and stencilled stock.
- **IBM Plex Sans** 400/500 — body.
- **IBM Plex Mono** 400/500 — **all technical metadata**: dimensions, section numbers, product codes, captions, callouts. Mono is the engineering voice, and it does most of the work of making the site feel measured.

Self-hosted, latin subset, `font-display: swap`.

### Motion

Mechanical, not organic. Things travel on one axis, at constant speed, and stop. Linear and `cubic-bezier(.2,0,.1,1)` easing; no springs, no overshoot, no fade-up-with-blur. Transform and opacity only.

### The hero

A rolling shutter, **drawn**, full-bleed. Closed on load. As the user scrolls it rolls up — the slats compressing into the barrel with the pitch tightening as they coil, the way a real curtain accumulates — revealing the dimensioned elevation behind it: guides, barrel, bottom rail, annotated in red with W and H.

**On not using Three.js.** A rolling shutter is an extruded 2D profile moving along a single axis. There is no geometry in it that a camera would reveal. Adding React Three Fiber would cost ~150 KB of JavaScript and a GPU context to simulate something that is, by its own nature, flat — and it would look *worse*, because a real-time GL material will not match a crisp vector line. This is the brief's own test applied honestly: WebGL here would be a gimmick, so it is not used. The shutter is CSS transforms driven by one scroll listener — sharp at every resolution, near-zero bytes, trivially reduced-motion-safe, and cheap enough that mobile gets the real thing rather than a fallback.

---

## 4. Still required from the client

Unchanged from the previous audit, and still blocking a public launch:

- Direct phone, WhatsApp, enquiry email, final domain.
- Exact current address and opening hours. (Public directories list Fathe Nagar, Hyderabad 500018, but with a conflicting GST and founding year — **unverified, not published.**)
- Logo master artwork and reuse rights for the company-listed images.
- Approved project photographs and client-reference permissions.
- Product dimensions, materials, finishes, motor datasheets, safety features, warranties, installation and service scope.
- Notification destination, retention policy and privacy contact.

Nothing in the above is invented on the site. Where a fact is missing it is marked `TODO — client confirmation required` in the content layer, not filled with a plausible-sounding placeholder.
