# Design system — THE WORKSHOP + THE ENTRANCE

Second-stage direction, 25 September 2026. Supersedes the palette, type and
motion sections of `DIRECTION.md`. The research in `RESEARCH.md` and the
photography-policy reasoning in `DIRECTION.md` §2 still stand.

---

## 0. What changed and why

"The Drawing" solved the asset crisis but became the subject of the site. It is
now demoted from *the identity* to *one register inside it* — the specification
voice, used on product cards, product pages and technical sections only.

The identity is now derived from the two real artifacts the company owns: the
hand-painted signboard and the logo mark. Nothing below is invented; every
value is sampled, and every sample is recorded with its evidence.

---

## 0.1 Attempt 2 — what the rejection taught (26 September 2026)

The first build of this system was reviewed and rejected: "not at all
impressive, especially the hero". The palette and type survived review; the
execution did not. Three causes, in order of weight:

1. **Empty frames dominated the review.** Sections 02, 04 and 06 were built
   around photographs that do not exist, so in development — which is where
   the review happened — three of ten sections were large striped
   placeholder boxes. A page that is 30% empty frame cannot look finished.
2. **The hero stretched a weak asset.** `board.webp` is a 1000px phone shot
   taken steeply from below. Full-bleed at 1440px+, under duotone and grain,
   it read as murky rather than editorial.
3. **Dark-heavy rhythm.** Five of ten sections were warm black. The signboard
   is cream board with red lettering; the page should be too.

Rules added in response — binding for every page built on this system:

- **No placeholder may be the largest element in its section.** A section
  whose content has not been supplied is composed from what *does* exist —
  a real photograph, a fact, or a drawing — and carries the missing item as
  a small dev-only note, never as an empty frame the size of the photo it
  is waiting for.
- **No raster is shown above its native width, including the hero.** The
  hero exception in §5 is withdrawn. The signboard is framed as a
  photograph, at or below 1000px, and the hero is carried by type.
- **Bone leads.** Light surfaces are the default; warm black is used for at
  most three sections per page, and enamel for one.
- **Use every real asset before reaching for a drawing.** `premises.webp`
  (750×1000, the actual workshop frontage) was never used on the first
  homepage. It is the most human image the company has.

The first attempt's code is kept in `.parked/`; the new homepage is built at
`/v2` so the live site is untouched until it is approved.

---

## 1. Brand DNA, derived

Both assets were sampled programmatically (5-bit histogram over the full frame,
plus saturation-ranked pigment extraction). Raw results:

**`board.webp`, 1000×750 — the signboard**

| Rank | Value | Share | What it is |
|---|---|---|---|
| 1 | `#221B19` | 11.1% | corrugated awning, in shadow |
| 2 | `#1D1715` | 9.5% | awning, deepest shadow |
| 3 | `#C6D8E8` | 6.0% | sky |
| 4 | `#B8C8D9` | 5.5% | sky |
| 5 | `#A9B9C8` | 4.4% | sky |
| 6 | `#473727` | 3.7% | weathered wall |
| 8 | `#6A5435` | 3.1% | rusted metal, ochre |

Saturated pixels run **warm to cool 10:1** (358,531 vs 36,922). Peak warm
saturation is only **0.59** — nothing in the photograph is vivid.

**`logo-mark.webp`, 108×37 — the logo**

Dominant pigment `#D6382A` (6.9%), `#CA382A` (4.8%). Reddest strong pixel
`#D0351B` at 0.87 saturation.

### Three findings that set the direction

1. **The dominant value is a warm near-black, not a cool graphite.** `#1D1715`
   is brown-black. The outgoing `#14181A` is blue-black. This single swap is
   the difference between a design studio and a workshop.
2. **There is a real cool blue in the brand already** — the Hyderabad sky
   against the metal, 18.6% of the frame. Warm black against cool zinc is the
   natural contrast pair, and nobody in this category uses it.
3. **The logo red is a warm vermilion, not a crimson.** `DIRECTION.md` recorded
   `#B9202E`; the mark is actually `#D6382A`. The earlier value was wrong.
   Enamel red was the right instinct; the old token was not it.

---

## 2. Palette

```
--black      #1A1513   warm near-black. Default dark surface.
--black-2    #241D1A   raised dark surface, corrugation shadow
--bone       #EDE7DA   board cream. Default light surface.
--bone-2     #E2DACA   recessed light surface
--enamel     #D6382A   the logo pigment. Surfaces + large display only.
--oxide      #8C3A2A   aged lettering. Red TEXT on light surfaces.
--enamel-hi  #F0603F   lifted pigment. Red TEXT on dark surfaces.
--zinc       #B8C8D9   sky. Secondary text on dark, cool accent.
--ochre      #B08A4E   rust. Sparingly: metadata on dark, rules.
--ink-2      #5A524A   secondary text on light
--rule       #CFC6B4   hairline on light
--rule-dk    #38302B   hairline on dark
```

### Verified contrast (WCAG 2.1, computed not estimated)

| Pair | Ratio | Verdict |
|---|---|---|
| bone on black | **14.69** | AAA |
| black on bone | **14.69** | AAA |
| zinc on black | **10.60** | AAA — the workhorse for dark body copy |
| ink-2 on bone | **6.22** | AA |
| oxide on bone | **6.19** | AA — red text on light |
| muted `#9A938A` on black | **5.96** | AA |
| ochre on black | **5.68** | AA |
| enamel-hi on black | **5.56** | AA — red text on dark |
| **white on enamel** | **4.71** | AA — button label |
| bone on enamel | 3.82 | **fails** — never do this |
| enamel on bone | 3.82 | large display only |
| enamel on black | 3.84 | large display only |

### Two rules that fall out

- **On enamel, only pure white passes.** Not bone (3.82), and not any tinted
  white — `#FFD9D3` measured 3.62 and `#FFE6E2` measured 3.96 against the
  panel. Hierarchy on a red surface therefore comes from size, weight and the
  mono face, never from tinting the ink down. Opacity is not a way round this:
  it composites toward the red and fails identically.
- **`--enamel` is a surface and a display colour. It is never small text.**
  Small red text is `--oxide` on light and `--enamel-hi` on dark.

### Red discipline

Carried over from `DIRECTION.md`, tightened. Red means one of exactly two
things: **a dimension**, or **the primary action**. It is not a highlight, not a
hover state, not a bullet. Section numbers move to `--ochre`.

---

## 3. Typography

Three voices with genuinely different jobs. The failure of the outgoing system
was that every heading was the same face, weight, case and colour; hierarchy
here comes from **width and case**, not size alone.

### Faces

| Role | Face | File |
|---|---|---|
| Display | **Archivo** variable, wght 300–900 · wdth 62–125 | `archivo-var.woff2`, 88 KB, latin |
| Spec | **IBM Plex Mono** 400/500 | already self-hosted |
| Body | **IBM Plex Sans** variable | already self-hosted |

Archivo is a grotesque drawn for print and signage. Its heavy wide weights
carry the painted-signboard energy; its narrow weights give dense industrial
labels. One variable file covers a range that would otherwise need five static
cuts, which is why it is one font and not three.

Plex Cond is retired from the new system. Plex Sans and Plex Mono are kept —
Mono because the brief requires it and it is the right voice for spec, Sans
because it is already subsetted and there is no reason to pay for another body
face.

### The four display registers

Crucially, these differ in **case and width**, so two headings at the same size
still read as different things.

```
.t-monument   wdth 78  wght 800  UPPERCASE  clamp(52px, 9vw, 148px)  lh .86
              The signboard voice. Hero and section 07 only. Twice per page max.

.t-editorial  wdth 100 wght 600  Sentence   clamp(30px, 4vw, 62px)   lh 1.02
              The reading voice. Section heads, the person, the story.
              Mixed case on purpose — this is what breaks the all-caps monotony.

.t-industrial wdth 68  wght 700  UPPERCASE  clamp(20px, 2.2vw, 34px) lh 1.05
              Product names, category labels. Condensed = stock and signage.

.t-spec       Plex Mono 400/500  UPPERCASE  11–13px  tracking .1em
              Dimensions, part codes, captions, TODO markers, figure numbers.
```

Body is Plex Sans 16–19px, `line-height: 1.65`, max 66ch.

---

## 4. Layout

- **Gutter**: `clamp(20px, 5vw, 88px)`. Content max 1560px.
- **Column**: 12-col at ≥1100px, 6-col 720–1099, 4-col below.
- **Vertical rhythm**: sections are `clamp(72px, 10vw, 160px)`, except
  full-bleed image sections which are viewport-driven.
- **No chapter-number chips straddling section seams.** That defect came from a
  chip with an opaque background sitting on a boundary it didn't know the colour
  of. Section numbers now sit *inside* the section, top-left, with no backing.

---

## 5. Photography language

The rule from `DIRECTION.md` stands, now **without exception**: no raster is
displayed above its native pixel dimensions. (Attempt 1 made an exception for
the hero; see §0.1 for why it is withdrawn.)

| Asset | Native | Use |
|---|---|---|
| `board.webp` | 1000×750 | **01 hero**, framed as a photograph beside the type, ≤ 1000px. Natural colour, lightly graded — not duotoned. |
| `premises.webp` | 750×1000 | **02 the people** — the actual workshop frontage. Straightened a few degrees in CSS; the crop never pushes it past native size. |
| `shutter-face.webp` | 484×269 | **04 detail**, at native size, captioned as a company-listed photograph |
| `centro.webp` | 238×238 | **08 where the work is**, native size, captioned as a Centro storefront |
| `motor.webp` | 250×101 | Automation product page only |
| `logo-hires.webp` | 2000×2000 | Source for the vector mark only. It is a render (it carries an AI-image watermark), so it is never shown as a photograph. |
| `gate.jpg`, `fabrication.jpg` | — | **Not used.** Foreign sky; generic stock. |

### Placeholder frames

Sections 02, 04 and 06 need photography that does not exist. They render as
**designed frames**, not empty divs and not apologies:

- correct aspect ratio, so the layout is final and the drop-in is a file copy
- a corrugated-profile fill derived from the awning — brand texture, not grey
- a `--spec` label: `PORTRAIT — CLIENT INPUT REQUIRED`
- **dev-only.** In production the frame and its label are suppressed and the
  section reflows without them. No visitor ever sees the word "required".

Stock photography for section 06 is authorised but none is bundled; the frames
accept stock or real imagery identically.

---

## 6. Motion

Physical, mechanical, precise, subtle. Things travel on one axis at constant
speed and stop.

- Easing `cubic-bezier(.2,0,.1,1)` and `linear`. No springs, no overshoot,
  no fade-up-with-blur, no floating, no parallax on text.
- Transform and opacity only.
- Every scroll-linked effect is `prefers-reduced-motion` gated and renders
  its finished state when motion is reduced.
- **No GSAP.** The outgoing `shutter-hero` already proves the pattern in ~40
  lines with one rAF-throttled listener; GSAP would be ~70 KB to replace
  working code. Three.js is added for section 07 only, lazily.

---

## 7. Product / drawing language

The drawings survive, with a job description:

- They appear on product cards, product detail, and technical sections.
- They **must differentiate**. The outgoing automatic and manual shutter
  drawings were the same drawing plus a motor box; at card size they were
  identical. A drawing that does not show a difference is decoration.
- Annotations are only ever verified facts. `MOTOR`, `SLAT`, `GUIDE`, `LOCK`,
  `BARREL` describe parts of the object, not claims about the company.
- Dimension text is never below 11px rendered. The outgoing hero rendered
  labels at ~6 effective px inside a scaled viewBox.

---

## 8. Conversion language

The whole point. Driven entirely by `lib/company.ts`, so filling in two strings
switches the site on with no markup change.

```
company.phone === ''   → the action renders GET A QUOTE → /quote
company.phone !== ''   → the same action renders CALL <number> → tel:
```

Same for WhatsApp and email. Rules:

- **Every major page offers CALL / WHATSAPP / QUOTE once, in one block.**
  Plus the pinned header action and the mobile bar. Never a CTA after every
  section — the outgoing homepage had four in one screen.
- **IndiaMART is removed from every primary surface.** It survives as one
  text link in the footer. Handing a lead you earned to a marketplace where
  eight competitors bid on it is not a fallback.
- Section 09's WhatsApp hand-off carries a pre-filled message with the
  measurement checklist, so the enquiry arrives usable.

---

## 9. Content rules

- **Never make missing assets the subject.** No "there are no case studies
  here". Present what exists, confidently. Anything genuinely absent is a dev
  TODO in the content layer, invisible in production.
- **Never invent.** Unchanged and non-negotiable.
- **Break the single-voice tic.** The outgoing site used one construction —
  short declarative fragment, full stop, faint wryness — about fourteen times.
  Headline voice now varies by register: monument headings are nouns
  (`ASHOKA FABRICATORS`, `MADE FOR HYDERABAD`), editorial headings are real
  sentences, industrial headings are plain product names.
