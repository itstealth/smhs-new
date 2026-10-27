import sharp from 'sharp';
import { readFile, mkdir } from 'fs/promises';
import path from 'path';

const listFile = process.argv[2];
const outDir = process.argv[3] || 'contact_sheets';
const PER_SHEET = 20;
const COLS = 5;
const THUMB = 260;
const LABEL_H = 24;
const CELL_W = THUMB;
const CELL_H = THUMB + LABEL_H;
const PAD = 6;

const rels = (await readFile(listFile, 'utf8')).trim().split('\n').filter(Boolean);
await mkdir(outDir, { recursive: true });

function labelSvg(text, w) {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  return Buffer.from(
    `<svg width="${w}" height="${LABEL_H}"><rect width="100%" height="100%" fill="black"/><text x="2" y="17" font-size="13" fill="white" font-family="monospace">${esc}</text></svg>`
  );
}

for (let s = 0; s * PER_SHEET < rels.length; s++) {
  const chunk = rels.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
  const rows = Math.ceil(chunk.length / COLS);
  const sheetW = COLS * (CELL_W + PAD) + PAD;
  const sheetH = rows * (CELL_H + PAD) + PAD;

  const composites = [];
  for (let i = 0; i < chunk.length; i++) {
    const idx = s * PER_SHEET + i;
    const rel = chunk[i];
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const x = PAD + col * (CELL_W + PAD);
    const y = PAD + row * (CELL_H + PAD);

    let thumbBuf;
    try {
      // letterbox onto a mid-grey square, preserving true aspect ratio
      thumbBuf = await sharp('public' + rel)
        .resize(THUMB, THUMB, { fit: 'contain', background: { r: 120, g: 120, b: 120 } })
        .png()
        .toBuffer();
    } catch {
      thumbBuf = await sharp({ create: { width: THUMB, height: THUMB, channels: 3, background: { r: 255, g: 0, b: 0 } } }).png().toBuffer();
    }
    composites.push({ input: thumbBuf, left: x, top: y });
    composites.push({ input: labelSvg(`#${idx} ${path.basename(rel)}`, THUMB), left: x, top: y + THUMB });
  }

  await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: { r: 20, g: 20, b: 20 } } })
    .composite(composites)
    .jpeg({ quality: 82 })
    .toFile(path.join(outDir, `sheet_${String(s).padStart(2, '0')}.jpg`));
  console.log(`sheet_${String(s).padStart(2, '0')}.jpg (${chunk.length} images)`);
}
console.log(`\nTotal sheets: ${Math.ceil(rels.length / PER_SHEET)}, total images: ${rels.length}`);
