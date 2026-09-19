# Ashoka Fabricators

Website for a rolling shutter, gate, entrance automation and steel fabrication
workshop in Hyderabad, trading since 1972.

```bash
npm install
npm run dev     # http://localhost:5173
```

## Start here

| | |
|---|---|
| **[docs/DIRECTION.md](docs/DIRECTION.md)** | Why the site looks like this. Read first. |
| [docs/HANDOVER.md](docs/HANDOVER.md) | How to run it, change it, and what is still needed from the client. |
| [docs/RESEARCH.md](docs/RESEARCH.md) | Every company fact and where it came from. |
| [docs/ASSETS.md](docs/ASSETS.md) | Image provenance, licensing and the no-upscaling rule. |
| [docs/QA.md](docs/QA.md) | Test record: contrast, accessibility, responsive, performance. |

## The short version

The design language is **the measured drawing** — orthographic elevations,
dimension lines, section marks — because that is what a small precision
fabrication shop actually works from, because vector stays sharp at any size
when the only available photographs are 250 px catalogue thumbnails, and
because a schematic makes no claim about a specific installation, so the site
can be honest without apologising in every caption.

The hero is a rolling shutter that rolls: 30 slats, one scroll listener, CSS
transforms. Not WebGL — a shutter is a flat profile moving on one axis, so a
GL scene would cost 150 KB to render something 2 KB of transforms renders
better. It works with no JavaScript (closed) and under `prefers-reduced-motion`
(open, static).

Three rules hold the whole thing together:

1. **Nothing is invented.** Unverified facts render as visible `TODO` items.
2. **No image is displayed above its native resolution.**
3. **Red is only ever a measurement.**

## Stack

Next.js 16 · React 19 · TypeScript · Cloudflare Workers (vinext + Vite) ·
D1 + R2 for enquiries · Drizzle · Zod.

Six runtime dependencies. No CSS framework and no component library — the
design system is one plain stylesheet, `app/globals.css`.

## Status

Not launched. Six items are outstanding from the client and are listed in
[docs/HANDOVER.md](docs/HANDOVER.md#before-launch); the most important are a
direct contact number, a confirmed address, and permission to publish project
photographs.
