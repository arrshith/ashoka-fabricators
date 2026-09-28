# Homepage storyboard — attempt 2

Built at **`/v2`** so the live homepage is untouched until this is approved.
Revised after attempt 1 was rejected — see `DESIGN-SYSTEM.md` §0.1. Three
changes run through every frame below: the hero is carried by type, not a
stretched photograph; bone leads; and no section is built around an empty
frame.

**Surface rhythm** — □ bone · ▤ deeper bone · ■ warm black · ▣ enamel

```
01 □  02 ▤  03 □  04 ■  05 □  06 ▤  07 ■  08 □  09 ▣  10 ■
```

Three dark, one enamel, six light. Attempt 1 was five dark.

---

## 00 · Navigation

Bone bar, hairline beneath. Vector logo · Products · Solutions · Projects ·
About · **phone number** (when configured) · GET A QUOTE in enamel.
Mobile: logo + menu, and a fixed CALL | WHATSAPP bar. IndiaMART appears on no
primary surface.

## 01 □ THE SIGNBOARD — type-led, photograph framed

```
HYDERABAD · SINCE 1972 · 17.3850°N 78.4867°E              FIG. 01
                                                  ┌──────────────────┐
Ashoka                                            │                  │
Fabricators                                       │  the painted     │
                                                  │  board, framed   │
Rolling shutters · Gates · Automation             │                  │
                                                  └──────────────────┘
[ CALL ]  [ WHATSAPP ]  [ GET A QUOTE ]           The workshop signboard,
                                                  hand-painted. Hyderabad.
──────────────────────────────────────────────────────────────────────
EST. 1972   │   54 YEARS   │   ONE WORKSHOP   │   MADE TO THE OPENING
```

The name is the hero, set as large as the column allows — the cream field
with dark lettering *is* the signboard, without imitating it. The photograph
sits in a frame at or below its native 1000px, in natural colour, as a real
object with a caption. The coordinates are the city's, not the workshop's.

Motion, once, on load: the two name lines rise into place; the photograph is
uncovered bottom-up, the way a shutter opens. Nothing moves after that.
Reduced motion: no animation.

**Source:** `board.webp`, `company`. **Blocked:** nothing.

## 02 ▤ THE PEOPLE

`premises.webp` — the actual frontage: the board overhead, the open bay, the
trestle with a steel bar on it, the chair, the neighbour's shutter, the
street. Straightened a few degrees; never past native size.

Beside it: the owner's story in the first person when supplied. Until then, a
factual line in its place — *a proprietorship, one workshop, making shutters
and gates in Hyderabad since 1972* — with `[CLIENT INPUT REQUIRED — OWNER
STORY]` as a small dev-only note, not as the section's centrepiece. Below it,
the verified ledger: established, legal status, team, premises.

**Blocked:** owner name, words and portrait. The section stands without them.

## 03 □ WHAT WE MAKE

A 2×2 of four large cards — Rolling shutters · Gates · Automation ·
Fabrication. Each: a technical drawing on a deeper-bone panel, number and
code in mono, name, one-line description, published variants, and a
contextual **CALL ABOUT THIS** (falls back to the quote form until a number
exists). Drawings here are the product language, which is where the brief
allows them.

## 04 ■ IN DETAIL — automatic rolling shutter

Left: `shutter-face.webp` at native size, captioned. Under it, the part list
as buttons. Right: the annotated assembly drawing — BARREL · MOTOR · SLAT ·
GUIDE · LOCK. Selecting a part isolates it in the drawing; keyboard and touch
operable. Only parts of the object are named; nothing about capacity.

## 05 □ MADE IN HYDERABAD — WORKING ACROSS INDIA

Service area confirmed by the client (26 September 2026): based in
Hyderabad, primarily serving it, taking on work anywhere in India. Recorded
as `company.serviceArea`; schema.org `areaServed` lists Hyderabad, then India.

Typographic, confident, no map. MADE IN HYDERABAD at monument scale with the
city in enamel; WORKING ACROSS INDIA beneath it in the editorial register, so
where the workshop is reads first and where it works reads second. The copy
points customers outside the city to the same start as everyone else — four
measurements and a photograph (§09). No installation outside Hyderabad is
named, because none has been supplied.

## 06 ▤ THE WORKSHOP — how an entrance is made

STEEL → FABRICATION → ASSEMBLY → INSTALLATION as four large technical
vignettes joined by one continuous dimension line: sheet stock; the slat
profile in section; the curtain, barrel and guides exploded; the installed
elevation with W and H. Informative, and it needs no photograph to look
finished. A dev-only note records that the frames accept real or stock
photography later — stock always captioned as atmosphere.

## 07 ■ SIGNATURE — the shutter, in three dimensions

The only WebGL on the site. Individual slats extruded from a real
roll-formed profile, not boxes, lit by a room environment so the curve of each
slat catches light like painted steel. On scroll the curtain rolls onto the
barrel, the coil thickening; the camera eases back; the key light rakes
across. Behind it: ASHOKA FABRICATORS / 1972.

Three fallbacks render the finished state with no canvas: reduced motion,
viewport under 820px, low-capability devices. three is imported only when the
section approaches the viewport.

## 08 □ WHERE THE WORK IS

The eight businesses the company names as customers, as a large typographic
roll, with the Centro storefront at native size, captioned precisely. No case
studies, no invented details, no headline about their absence. Structured to
become the projects archive by adding rows.

## 09 ▣ BEFORE YOU CALL

Enamel panel, white type only (the only ink that clears 4.5:1 on enamel).
01 WIDTH · 02 HEIGHT · 03 HEADROOM · 04 USAGE, each with a small measuring
diagram and one line of guidance. Then: *Take a photo of the opening. Send it
to us on WhatsApp.* — SEND PHOTO → WHATSAPP, pre-filled with the four blanks.

## 10 ■ HAVE AN OPENING?

One closing block: CALL · WHATSAPP · GET A QUOTE, then phone, WhatsApp,
email, address, hours — each shown only once verified. Footer beneath:
GST, established, legal status; IndiaMART as one plain text link, here only.

---

## CTA budget

Header (1) · hero (1 block) · per-category CALL ABOUT THIS (4, contextual) ·
09 WhatsApp (1) · 10 (1 block) · mobile bar. Nothing else.
