import sharp from 'sharp';
import { readdir, unlink, rename } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

async function getAllImages(dir) {
  const results = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        results.push(...await getAllImages(full));
      } else if (/\.(jpg|jpeg|png)$/i.test(e.name)) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

const files = await getAllImages(publicDir);
console.log(`Found ${files.length} non-webp images to convert`);

let ok = 0, fail = 0;
for (const file of files) {
  const webpPath = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    await sharp(file, { failOn: 'none' })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .webp({ quality: 85 })
      .toFile(webpPath);
    await unlink(file);
    ok++;
    if (ok % 20 === 0) console.log(`  ${ok} done...`);
  } catch (e) {
    console.error(`  FAIL: ${path.relative(publicDir, file)} — ${e.message}`);
    fail++;
  }
}

console.log(`\nDone: ${ok} converted, ${fail} failed`);
