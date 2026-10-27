const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'app/alumni/page.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.split('https://seedlingschools.com/assets/img/').join('/assets/alumni/');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated app/alumni/page.tsx`);
} else {
  console.error(`File not found: app/alumni/page.tsx`);
}
