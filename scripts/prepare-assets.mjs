// Derives the served images in public/images from the untouched originals in
// assets/source-images (which are kept for provenance and never published).
//
// Nothing here upscales, retouches or invents detail: it only removes catalogue
// furniture (white backing, baked-in insets, border frames) so the remaining
// pixels can be shown at or below their native size. The originals stay out of
// public/ so the build does not ship ~300KB of files nothing references.
import sharp from 'sharp';

const src = 'assets/source-images';
const out = 'public/images';

// Logo: a 120x120 JPEG of a red badge floating on white. Cropping tight to the
// badge removes the white box without altering the mark.
await sharp(`${src}/logo.jpg`)
  .extract({ left: 4, top: 40, width: 108, height: 37 })
  .webp({ quality: 92 })
  .toFile(`${out}/logo-mark.webp`);

for (const [from, to, opts] of [
  ['board.jpg', 'board.webp', { quality: 82 }],
  ['location.jpg', 'premises.webp', { quality: 82 }],
]) {
  await sharp(`${src}/${from}`).webp(opts).toFile(`${out}/${to}`);
}

// Everything below is resized DOWN to a display width, never up: `withoutEnlargement`
// leaves any file already narrower than the target at its native size.
// Client photographs (industrial-*, archive-*) and free-licence photographs
// from Wikimedia Commons; credits and licences are listed in docs/ASSETS.md.
const derived = [
  ['residential-garage-motorised.webp', 'residential.webp', 1000],
  ['residential-polycarbonate.webp', 'residential-polycarbonate.webp', 900],
  ['residential-grille.webp', 'residential-grille.webp', 736],
  ['industrial-warehouse.webp', 'industrial.webp', 900],
  ['industrial-shed.webp', 'industrial-shed.webp', 900],
  ['mat-mild-steel.jpg', 'mat-mild-steel.webp', 720],
  ['mat-galvanised.jpg', 'mat-galvanised.webp', 720],
  ['mat-galvalume.jpg', 'mat-galvalume.webp', 720],
  ['mat-aluminium.jpg', 'mat-aluminium.webp', 720],
  ['mat-polycarbonate.jpg', 'mat-polycarbonate.webp', 720],
  ['archive-ashok-2.jpg', 'archive-team.webp', 1280],
];
for (const [from, to, width] of derived) {
  await sharp(`${src}/${from}`).resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${out}/${to}`);
}

// Commercial reference photographs supplied by the client. Each is cropped
// clear of the store's own brand sign, so no brand reads as a client claim.
const cropped = [
  ['commercial-polycarbonate.png', 'commercial.webp', { left: 0, top: 100, width: 590, height: 310 }],
  ['commercial-perforated.webp', 'commercial-perforated.webp', { left: 128, top: 70, width: 330, height: 400 }],
];
for (const [from, to, box] of cropped) {
  await sharp(`${src}/${from}`).extract(box).webp({ quality: 84 }).toFile(`${out}/${to}`);
}

// Client logos, cut tile by tile from the client-list sheet the client
// supplied. [slug, name, x, y, width]; every tile is 68 px tall.
export const clients = [
  ['rs-brothers', 'R.S. Brothers', 55, 104], ['jc-brothers', 'J.C. Brothers', 212, 104],
  ['chandana-bros', 'Chandana Bros', 369, 104], ['south-india', 'South India Shopping Mall', 526, 104],
  ['grt', 'GRT Jewellers', 683, 104], ['kalanjali', 'Kalanjali', 55, 200],
  ['kala-niketan', 'Kala Niketan', 212, 200], ['chennai-shopping-mall', 'The Chennai Shopping Mall', 369, 200],
  ['vijay-textiles', 'Vijay Textiles', 526, 200], ['nilkamal', 'Nilkamal', 683, 200],
  ['gayatri', 'Gayatri Projects', 55, 296], ['viceroy', 'Viceroy Hotels and Resorts', 212, 296],
  ['mtar', 'MTAR Technologies', 55, 429], ['vem', 'VEM Technologies', 212, 429],
  ['esennar', 'Esennar Transformers', 369, 429], ['bhel', 'BHEL', 526, 429],
  ['client-being-there', 'Industrial client', 683, 429, 98], ['client-chevron', 'Industrial client', 800, 429],
  ['mruga', 'Mruga Group', 55, 525], ['powergrid', 'Power Grid', 212, 525],
  ['natco', 'NATCO', 369, 525], ['solar-semiconductor', 'Solar Semiconductor', 526, 525],
  ['ashoka-developers', 'Ashoka Developers & Builders', 55, 656], ['kcp', 'KCP Projects', 212, 656],
  ['kaandu', 'Kaandu Infrastructure', 369, 656], ['sspdl', 'SSPDL Group', 683, 656, 98],
];
await import('node:fs').then((fs) => fs.mkdirSync(`${out}/clients`, { recursive: true }));
for (const [slug, , x, y, w = 138] of clients) {
  await sharp(`${src}/clients-sheet.png`).extract({ left: x + 2, top: y + 2, width: w, height: 68 })
    .webp({ quality: 90 }).toFile(`${out}/clients/${slug}.webp`);
}

// The original unit, Ashok Rolling Shutters: one scanned page holding three
// prints. Each print is cut out of the page; nothing inside a print is touched.
const archive = [
  ['archive-staff.webp', { left: 160, top: 390, width: 605, height: 445 }],
  ['archive-opening.webp', { left: 20, top: 860, width: 450, height: 655 }],
  ['archive-street.webp', { left: 498, top: 852, width: 378, height: 665 }],
];
for (const [to, box] of archive) {
  await sharp(`${src}/archive-ashok-1.jpg`).extract(box).webp({ quality: 82 }).toFile(`${out}/${to}`);
}

const report = await Promise.all(
  ['logo-mark.webp', 'board.webp', 'premises.webp', ...derived.map((d) => d[1]), ...cropped.map((c) => c[1]), ...archive.map((a) => a[0])]
    .map(async (f) => {
      const m = await sharp(`${out}/${f}`).metadata();
      return `${f.padEnd(20)} ${m.width}x${m.height}`;
    }),
);
console.log(report.join('\n'));
