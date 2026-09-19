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

// Perforated shutter: the original has a picture-in-picture inset baked into
// the bottom-right and a grey frame on all four edges. This keeps only the
// clean curtain face above the inset.
await sharp(`${src}/shutter.jpg`)
  .extract({ left: 8, top: 6, width: 484, height: 269 })
  .webp({ quality: 88 })
  .toFile(`${out}/shutter-face.webp`);

// Centro storefront: square original, trimmed of its grey catalogue frame.
await sharp(`${src}/electric.jpg`)
  .extract({ left: 6, top: 6, width: 238, height: 238 })
  .webp({ quality: 88 })
  .toFile(`${out}/centro.webp`);

for (const [from, to, opts] of [
  ['board.jpg', 'board.webp', { quality: 82 }],
  ['location.jpg', 'premises.webp', { quality: 82 }],
  ['motor.png', 'motor.webp', { quality: 90 }],
]) {
  await sharp(`${src}/${from}`).webp(opts).toFile(`${out}/${to}`);
}

const report = await Promise.all(
  ['logo-mark.webp', 'shutter-face.webp', 'centro.webp', 'board.webp', 'premises.webp', 'motor.webp']
    .map(async (f) => {
      const m = await sharp(`${out}/${f}`).metadata();
      return `${f.padEnd(20)} ${m.width}x${m.height}`;
    }),
);
console.log(report.join('\n'));
