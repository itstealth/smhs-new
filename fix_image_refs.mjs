/**
 * Fix all broken image extension references in SMHS source files
 * Changes .JPG, .JPEG, .jpeg → .webp in all path strings
 */
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filesToFix = [
  'app/sports/page.jsx',
  'app/news-and-events/page.tsx',
  'app/news-and-events/events/page.tsx',
  'app/curriculum/page.tsx',
  'app/admissions/page.tsx',
  'app/school-life/page.tsx',
  'components/Home/TrendingUpdates.tsx',
];

let totalFixed = 0;

for (const relPath of filesToFix) {
  const fullPath = path.join(__dirname, relPath);
  try {
    const original = await readFile(fullPath, 'utf8');

    // Replace .JPG, .JPEG, .jpeg in image paths with .webp
    // Match these extensions only when followed by quote, backtick, space, ), or %
    let fixed = original
      .replace(/\.JPG(?=["'`\s)%])/g, '.webp')
      .replace(/\.JPEG(?=["'`\s)%])/g, '.webp')
      .replace(/\.jpeg(?=["'`\s)%])/g, '.webp');

    if (fixed !== original) {
      // Count occurrences changed
      const before = (original.match(/\.(JPG|JPEG|jpeg)/g) || []).length;
      await writeFile(fullPath, fixed, 'utf8');
      totalFixed += before;
      console.log(`✅ Fixed ${before} references in: ${relPath}`);
    } else {
      console.log(`✓  No changes needed: ${relPath}`);
    }
  } catch (e) {
    console.error(`❌ Error processing ${relPath}: ${e.message}`);
  }
}

console.log(`\n✅ Total references fixed: ${totalFixed}`);

// Verify no .JPG/.jpeg remain
console.log('\nVerification scan:');
for (const relPath of filesToFix) {
  const fullPath = path.join(__dirname, relPath);
  try {
    const content = await readFile(fullPath, 'utf8');
    const remaining = content.match(/\.(JPG|JPEG|jpeg)/g) || [];
    if (remaining.length > 0) {
      console.log(`  ⚠️  Still has ${remaining.length} occurrences: ${relPath}`);
    } else {
      console.log(`  ✓  Clean: ${relPath}`);
    }
  } catch {}
}
