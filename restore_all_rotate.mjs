/**
 * Restore every pre-webp original recoverable from git history (commit f9f75a2~1),
 * re-encode with sharp().rotate() to bake in correct EXIF orientation,
 * and overwrite the current (wrongly-oriented) webp.
 */
import { execFile } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const COMMIT = 'f9f75a2~1';

const files = [
  'public/SPS_Logo.png',
  'public/banner-poster.jpg',
  'public/leadership/SMHS_Principal_Nidhi.png',
  'public/leadership/aishwarya.png',
  'public/leadership/akansha.jpeg',
  'public/leadership/mohini.png',
  'public/leadership/preeti.png',
  'public/leadership/sandeep.png',
  'public/logo.png',
  'public/sports_and_other_images/0N9A0271.JPG',
  'public/sports_and_other_images/0N9A0278.JPG',
  'public/sports_and_other_images/0N9A0280.JPG',
  'public/sports_and_other_images/P1500642.JPG',
  'public/sports_and_other_images/P1500643.JPG',
  'public/sports_and_other_images/P1500644.JPG',
  'public/sports_and_other_images/P1500645.JPG',
  'public/sports_and_other_images/P1500648.JPG',
  'public/sports_and_other_images/P1500653.JPG',
  'public/sports_and_other_images/P1500656.JPG',
  'public/sports_and_other_images/P1500667.JPG',
  'public/sports_and_other_images/P1500670.JPG',
  'public/sports_and_other_images/P1500675.JPG',
  'public/sports_and_other_images/P1500680.JPG',
  'public/sports_and_other_images/P1500685.JPG',
  'public/sports_and_other_images/P1500695.JPG',
  'public/sports_and_other_images/P1500700.JPG',
  'public/sports_and_other_images/P1500703.JPG',
  'public/sports_and_other_images/P1500819.JPG',
  'public/sports_and_other_images/P1500820.JPG',
  'public/sports_and_other_images/P1500982.JPG',
];

async function main() {
  const tmp = await mkdtemp(path.join(tmpdir(), 'restore-'));
  let ok = 0, fail = 0;

  for (const rel of files) {
    const ext = path.extname(rel);
    const destWebp = rel.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    const tmpSrc = path.join(tmp, path.basename(rel));

    try {
      const { stdout } = await execFileAsync('git', ['show', `${COMMIT}:${rel}`], {
        encoding: 'buffer', maxBuffer: 1024 * 1024 * 100,
      });
      await writeFile(tmpSrc, stdout);

      await sharp(tmpSrc, { failOn: 'none' })
        .rotate()
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .webp({ quality: 85 })
        .toFile(destWebp + '.tmp');

      await unlink(destWebp).catch(() => {});
      await execFileAsync('mv', [destWebp + '.tmp', destWebp]);
      console.log(`OK  ${rel} -> ${destWebp}`);
      ok++;
    } catch (e) {
      console.error(`FAIL ${rel}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} restored+rotated, ${fail} failed`);
}

main();
