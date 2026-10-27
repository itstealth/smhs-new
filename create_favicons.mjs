import sharp from 'sharp';
import { writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// SMHS favicon — try webp first (post-conversion), fallback to png
async function findLogo(candidates) {
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  return null;
}

// Create SMHS favicon
const smhsLogo = await findLogo([
  path.join(__dirname, 'public/logo.webp'),
  path.join(__dirname, 'public/logo.png'),
  path.join(__dirname, 'public/smhs_images/seedling_images/SMHS.webp'),
  path.join(__dirname, 'public/smhs_images/seedling_images/SMHS.png'),
]);

if (smhsLogo) {
  // Create 512x512 PNG for app/icon.png
  await sharp(smhsLogo, { failOn: 'none' })
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'app/icon.png'));
  console.log('SMHS: app/icon.png created from', path.basename(smhsLogo));

  // Also delete old favicon.ico (Next.js will use icon.png)
  // Keep favicon.ico but overwrite with logo
  await sharp(smhsLogo, { failOn: 'none' })
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, 'app/favicon.png'));
  console.log('SMHS: app/favicon.png created (32x32)');
} else {
  console.log('SMHS logo not found');
}

// Create SPS favicon
const spsDir = path.join(__dirname, '../sps');
const spsLogo = await findLogo([
  path.join(spsDir, 'public/SPS_Logo.png'),
  path.join(spsDir, 'public/logo.webp'),
  path.join(spsDir, 'public/logo.png'),
]);

if (spsLogo && existsSync(spsDir)) {
  await sharp(spsLogo, { failOn: 'none' })
    .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(spsDir, 'app/icon.png'));
  console.log('SPS: app/icon.png created from', path.basename(spsLogo));

  await sharp(spsLogo, { failOn: 'none' })
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(spsDir, 'app/favicon.png'));
  console.log('SPS: app/favicon.png created (32x32)');
} else {
  console.log('SPS project or logo not found');
}

console.log('\nFavicon creation done.');
console.log('Note: In Next.js App Router, app/icon.png is auto-used as the site icon.');
