/**
 * SMHS Image Orientation Fixer
 *
 * Problem: convert_remaining.mjs used sharp without .rotate() so EXIF orientation
 * was stripped but NOT applied — resulting in sideways/upside-down images.
 *
 * Fix: Re-process every image using sharp with .rotate() which auto-rotates
 * based on EXIF data and strips the tag — baking the correct orientation in.
 *
 * Run: node fix_orientation.mjs
 */

import sharp from 'sharp';
import { readdir, rename, unlink, writeFile } from 'fs/promises';
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
      } else if (/\.(jpg|jpeg|png|webp)$/i.test(e.name)) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

async function fixOrientation(file) {
  const ext = path.extname(file).toLowerCase();
  const tmpFile = file + '.tmp';

  try {
    const image = sharp(file, { failOn: 'none' });
    const metadata = await image.metadata();

    // Only process if orientation is set (non-1 = needs rotation) OR it's a webp
    // (webp could have been converted without rotation)
    const needsCheck = metadata.orientation && metadata.orientation !== 1;
    const isWebp = ext === '.webp';

    if (!needsCheck && !isWebp) {
      return { status: 'skip', reason: 'no orientation issue' };
    }

    // .rotate() with no args: auto-rotate based on EXIF, strips EXIF orientation tag
    if (ext === '.webp') {
      await sharp(file, { failOn: 'none' })
        .rotate()  // ← This is the key fix!
        .webp({ quality: 85 })
        .toFile(tmpFile);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(file, { failOn: 'none' })
        .rotate()
        .jpeg({ quality: 90 })
        .toFile(tmpFile);
    } else if (ext === '.png') {
      await sharp(file, { failOn: 'none' })
        .rotate()
        .png({ compressionLevel: 8 })
        .toFile(tmpFile);
    }

    // Verify the temp file is valid
    const tmpMeta = await sharp(tmpFile).metadata();
    if (!tmpMeta.width || !tmpMeta.height) {
      throw new Error('Output file invalid');
    }

    // Replace original with fixed version
    await unlink(file);
    await rename(tmpFile, file);

    const wasRotated = needsCheck;
    return {
      status: wasRotated ? 'fixed' : 'reprocessed',
      orientation: metadata.orientation,
      size: `${tmpMeta.width}x${tmpMeta.height}`
    };
  } catch (e) {
    // Clean up temp file if exists
    try { if (existsSync(tmpFile)) await unlink(tmpFile); } catch {}
    return { status: 'error', reason: e.message };
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('  SMHS Image Orientation Fixer');
  console.log('='.repeat(60));
  console.log(`  Scanning: ${publicDir}\n`);

  const files = await getAllImages(publicDir);
  console.log(`  Found ${files.length} images to process...\n`);

  let fixed = 0, reprocessed = 0, skipped = 0, errors = 0;
  const fixedList = [];
  const errorList = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const rel = path.relative(publicDir, file);
    const result = await fixOrientation(file);

    if (result.status === 'fixed') {
      fixed++;
      fixedList.push({ file: rel, orientation: result.orientation, size: result.size });
      console.log(`  ✅ FIXED     [${i+1}/${files.length}] ${rel} (was orientation=${result.orientation}, now ${result.size})`);
    } else if (result.status === 'reprocessed') {
      reprocessed++;
      // Quiet for reprocessed (normal webp re-encode)
    } else if (result.status === 'error') {
      errors++;
      errorList.push({ file: rel, reason: result.reason });
      console.log(`  ❌ ERROR     [${i+1}/${files.length}] ${rel}: ${result.reason}`);
    } else {
      skipped++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('  SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Total processed  : ${files.length}`);
  console.log(`  Orientation fixed: ${fixed}`);
  console.log(`  Reprocessed (OK) : ${reprocessed}`);
  console.log(`  Skipped (no EXIF): ${skipped}`);
  console.log(`  Errors           : ${errors}`);

  if (fixedList.length > 0) {
    console.log('\n  ✅ Fixed images:');
    for (const { file, orientation, size } of fixedList) {
      console.log(`     → ${file} (orientation ${orientation} → ${size})`);
    }
  }

  if (errorList.length > 0) {
    console.log('\n  ❌ Errors:');
    for (const { file, reason } of errorList) {
      console.log(`     ✗ ${file}: ${reason}`);
    }
  }

  // Write report
  const report = {
    timestamp: new Date().toISOString(),
    total: files.length,
    fixed,
    reprocessed,
    skipped,
    errors,
    fixedList,
    errorList
  };
  await writeFile('orientation_fix_report.json', JSON.stringify(report, null, 2));
  console.log('\n  Report saved to: orientation_fix_report.json');
  console.log('='.repeat(60) + '\n');
}

main().catch(console.error);
