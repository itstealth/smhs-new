/**
 * Apply visually-verified rotation fixes for images with no recoverable
 * pre-conversion original (git history has no earlier version of these).
 * Each entry's rotation direction was confirmed by reading the full-resolution
 * image and checking which edge the subjects' "up" pointed to.
 */
import sharp from 'sharp';
import { rename, unlink } from 'fs/promises';

const CCW = [
  'public/alumni/alumni_eight.webp',
  'public/alumni/alumni_eleven.webp',
  'public/alumni/alumni_five.webp',
  'public/alumni/alumni_four.webp',
  'public/alumni/alumni_nine.webp',
  'public/alumni/alumni_seven.webp',
  'public/alumni/alumni_six.webp',
  'public/alumni/alumni_ten.webp',
  'public/alumni/alumni_thirteen.webp',
  'public/alumni/alumni_three.webp',
  'public/alumni/alumni_tweleve.webp',
  'public/alumni/alumni_two.webp',
  'public/smhs_images/seedling_images/library_home.webp',
  'public/smhs_images/seedling_images/reflective.webp',
  'public/smhs_images/seedling_images/safety.webp',
  'public/smhs_images/seedling_images/sia-student.webp',
];

const CW = [
  'public/smhs_images/seedling_images/confidence.webp',
  'public/smhs_images/seedling_images/farewell_cermony.webp',
];

async function rotateFile(rel, angle) {
  const tmp = rel + '.tmp';
  await sharp(rel).rotate(angle).webp({ quality: 85 }).toFile(tmp);
  await unlink(rel);
  await rename(tmp, rel);
  console.log(`OK  ${rel} (rotate ${angle})`);
}

for (const rel of CCW) await rotateFile(rel, 270); // 270 CW == 90 CCW
for (const rel of CW) await rotateFile(rel, 90);

console.log(`\nDone: ${CCW.length + CW.length} images rotated.`);
