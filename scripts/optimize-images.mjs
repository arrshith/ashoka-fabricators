import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
for(const file of await readdir('public/images')){
 if(!/\.(jpg|png)$/.test(file)||file==='logo.jpg')continue;
 await sharp(`public/images/${file}`).webp({quality:85}).toFile(`public/images/${file.replace(/\.(jpg|png)$/,'.webp')}`);
}
console.log('Catalogue images converted to WebP without upscaling or changing their content.');
