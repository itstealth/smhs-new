/**
 * Restore original JPEGs from git history,
 * process them with sharp().rotate() to bake in the correct orientation,
 * and overwrite the existing WebP files.
 */
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// List of files to restore and reconvert, grouped by their commit base
const filesToRestore = [
  // From f9f75a2
  {
    commit: 'f9f75a2~1',
    src: 'public/SPS_Logo.png',
    dest: 'public/SPS_Logo.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/banner-poster.jpg',
    dest: 'public/banner-poster.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/leadership/SMHS_Principal_Nidhi.png',
    dest: 'public/leadership/SMHS_Principal_Nidhi.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/leadership/aishwarya.png',
    dest: 'public/leadership/aishwarya.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/leadership/akansha.jpeg',
    dest: 'public/leadership/akansha.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/leadership/mohini.png',
    dest: 'public/leadership/mohini.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/leadership/preeti.png',
    dest: 'public/leadership/preeti.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/leadership/sandeep.png',
    dest: 'public/leadership/sandeep.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/logo.png',
    dest: 'public/logo.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/0N9A0271.JPG',
    dest: 'public/sports_and_other_images/0N9A0271.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/0N9A0278.JPG',
    dest: 'public/sports_and_other_images/0N9A0278.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/0N9A0280.JPG',
    dest: 'public/sports_and_other_images/0N9A0280.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500642.JPG',
    dest: 'public/sports_and_other_images/P1500642.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500643.JPG',
    dest: 'public/sports_and_other_images/P1500643.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500644.JPG',
    dest: 'public/sports_and_other_images/P1500644.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500645.JPG',
    dest: 'public/sports_and_other_images/P1500645.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500648.JPG',
    dest: 'public/sports_and_other_images/P1500648.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500653.JPG',
    dest: 'public/sports_and_other_images/P1500653.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500656.JPG',
    dest: 'public/sports_and_other_images/P1500656.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500667.JPG',
    dest: 'public/sports_and_other_images/P1500667.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500670.JPG',
    dest: 'public/sports_and_other_images/P1500670.webp',
  },
  {
    commit: 'f9f75a2~1',
    src: 'public/sports_and_other_images/P1500675.JPG',
    dest: 'public/sports_and_other_images/P1500675.webp',
  },
  // From 55d8922
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500680.JPG',
    dest: 'public/sports_and_other_images/P1500680.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500685.JPG',
    dest: 'public/sports_and_other_images/P1500685.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500695.JPG',
    dest: 'public/sports_and_other_images/P1500695.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500700.JPG',
    dest: 'public/sports_and_other_images/P1500700.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500703.JPG',
    dest: 'public/sports_and_other_images/P1500703.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500819.JPG',
    dest: 'public/sports_and_other_images/P1500819.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500820.JPG',
    dest: 'public/sports_and_other_images/P1500820.webp',
  },
  {
    commit: '55d8922~1',
    src: 'public/sports_and_other_images/P1500982.JPG',
    dest: 'public/sports_and_other_images/P1500982.webp',
  },
];

async function main() {
  console.log('='.repeat(60));
  console.log('  Restoring and Auto-Rotating Original Images');
  console.log('='.repeat(60));

  let successCount = 0;
  let failCount = 0;

  for (const file of filesToRestore) {
    const tempSrcPath = path.join(__dirname, file.src);
    const destPath = path.join(__dirname, file.dest);

    console.log(`\nProcessing: ${file.src}`);

    try {
      // 1. Fetch file content from Git as buffer
      // Using stdout maxBuffer extension just in case (some JPEGs are 8MB+)
      const cmd = `git show "${file.commit}:${file.src}"`;
      const { stdout } = await execPromise(cmd, { encoding: 'buffer', maxBuffer: 15 * 1024 * 1024 });

      // 2. Write buffer to temp source file path
      await writeFile(tempSrcPath, stdout);
      console.log(`  ✓ Restored original file to disk`);

      // 3. Re-convert with Sharp auto-rotation enabled
      // .rotate() reads EXIF orientation and rotates pixels accordingly, stripping the EXIF tag
      await sharp(tempSrcPath, { failOn: 'none' })
        .rotate()
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`  ✓ WebP regenerated with auto-rotation: ${file.dest}`);

      // 4. Delete the temporary restored file
      await unlink(tempSrcPath);
      console.log(`  ✓ Temporary source file cleaned up`);

      successCount++;
    } catch (e) {
      console.error(`  ✗ FAILED: ${e.message}`);
      failCount++;
      // Cleanup temp file if it was written
      try { await unlink(tempSrcPath); } catch {}
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('  SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Total files processed : ${filesToRestore.length}`);
  console.log(`  Success               : ${successCount}`);
  console.log(`  Failed                : ${failCount}`);
  console.log('='.repeat(60) + '\n');
}

main().catch(console.error);
