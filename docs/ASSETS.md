# Assets and licensing

## The rule

> **No raster asset is ever displayed larger than its native pixel dimensions.**

Every source photograph came from the company's IndiaMART listing and most are
catalogue thumbnails between 250 and 500 pixels wide. The previous build
stretched a 500 px thumbnail across a 1440 px hero, which is the single biggest
reason it looked cheap. This rule is enforced by capping each figure's
`max-width` at the file's real width, and it is why the site is carried by
drawings rather than photographs. See `docs/DIRECTION.md`.

## Where the files live

- `assets/source-images/` — the untouched originals. **Not served.** Kept for
  provenance so any future crop can be re-derived from the real source.
- `public/images/` — the derived, served files. Regenerate with `npm run assets`
  (`scripts/prepare-assets.mjs`).

The script only crops and converts. It never upscales, sharpens, denoises or
retouches, and it must not be changed to do so — inventing detail in a
customer's photograph is inventing evidence.

## Served images

| File | Native size | Derived from | Used for |
|---|---|---|---|
| `logo-mark.webp` | 108 × 37 | `logo.jpg`, cropped to the badge | Header and footer wordmark. The crop removes the white JPEG backing; the mark itself is unaltered. |
| `board.webp` | 1000 × 750 | `board.jpg` | The heritage panel on the home page. The weathered hand-painted signboard — the strongest asset the company has. |
| `premises.webp` | 750 × 1000 | `location.jpg` | The workshop frontage, on the About page. |
| `shutter-face.webp` | 484 × 269 | `shutter.jpg`, cropped | Manual shutters, catalogue reference. The crop removes a picture-in-picture inset and a grey frame that were baked into the original. |
| `centro.webp` | 238 × 238 | `electric.jpg`, cropped | Automatic shutters and the projects page. A Centro storefront; Centro is one of the customers the company names. |
| `motor.webp` | 250 × 101 | `motor.png` | Automation, catalogue reference. |

## Retired

- `gate.jpg` (250 × 188) — a blue gate on grass under a grey northern-European
  sky. Foreign to both the palette and to Hyderabad, and too small to use well.
- `fabrication.jpg` (400 × 400) — generic stock "sparks" imagery. Not Ashoka's
  work, and stock photography of someone else's workshop weakens the brand more
  than a drawing does.

Both are still in `assets/source-images/` if the client wants them back.

## Source URLs

All from <https://www.indiamart.com/ashokafabricators/profile.html>:

| Original | Source |
|---|---|
| `logo.jpg` | `3.imimg.com/data3/GM/KO/MY-2750019/ashoka-fabricators-logo-120x120.jpg` |
| `shutter.jpg` | `3.imimg.com/data3/TV/OE/MY-2750019/perforated-rolling-shutter-500x500.jpg` |
| `electric.jpg` | `3.imimg.com/data3/GC/TY/MY-2750019/electric-rolling-shutters-250x250.jpg` |
| `gate.jpg` | `3.imimg.com/data3/YO/MF/MY-2750019/sliding-gates-250x250.jpg` |
| `motor.png` | `3.imimg.com/data3/OH/SN/MY-2750019/rolling-shutter-motor-250x250.png` |
| `fabrication.jpg` | `3.imimg.com/data3/AO/IQ/MY-2750019/heavy-metal-fabrication-service-500x500.jpg` |
| `location.jpg` | `5.imimg.com/data5/NSDMERP/Location/2024/4/409101398/.../2750019-location-1712744828406-1000x1000.jpg` |
| `board.jpg` | `5.imimg.com/data5/NSDMERP/Board/2024/4/409101337/.../2750019-board-1712744824899-1000x1000.jpg` |

These are company-listed, not independently proven company-owned. **Confirm
reuse rights before public launch.**

## Drawings

Every technical drawing is inline SVG in `components/drawings.tsx` and
`components/shutter-hero.tsx`. Original work, no third-party artwork, no
tracing of any competitor's material. They carry no dimensions or
specifications because none have been supplied — `W` and `H` are deliberately
symbolic.

## Type

IBM Plex, self-hosted from `public/fonts/`, Latin subset only:

| File | Family | Weight |
|---|---|---|
| `plex-cond-600.woff2` | IBM Plex Sans Condensed | 600 |
| `plex-cond-700.woff2` | IBM Plex Sans Condensed | 700 |
| `plex-sans-var.woff2` | IBM Plex Sans (variable) | 400–500 |
| `plex-mono-400.woff2` | IBM Plex Mono | 400 |
| `plex-mono-500.woff2` | IBM Plex Mono | 500 |

IBM Plex is licensed under the SIL Open Font License 1.1
(<https://github.com/IBM/plex>). The OFL text is at `public/fonts/OFL.txt`.
Files fetched from Google Fonts' `fonts.gstatic.com` CDN. Total 115 KB; the
display and mono faces are preloaded.

Icons: `lucide-react` (ISC).

Manrope, used by the previous build, has been removed.
