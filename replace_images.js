const fs = require('fs');
const path = require('path');

const fileReplacements = [
  {
    file: 'app/blog/page.tsx',
    replacements: [
      { from: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80&auto=format&fit=crop', to: '/assets/Home/classroom.jpg' },
      { from: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80&auto=format&fit=crop', to: '/assets/Home/smart-classroom.jpg' },
      { from: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80&auto=format&fit=crop', to: '/assets/Home/library.jpg' },
      { from: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&q=80&auto=format&fit=crop', to: '/assets/ANNUAL FUNCTION/1.webp' },
      { from: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=80&auto=format&fit=crop', to: '/assets/BOOT CAMP/1.webp' },
      { from: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80&auto=format&fit=crop', to: '/assets/CRICKET FEVER/1.webp' },
      { from: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&q=80&auto=format&fit=crop', to: '/assets/DIWALI DANCE BEATS/1.webp' },
      { from: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80&auto=format&fit=crop', to: '/assets/FRENCH CUISINE/1.webp' },
      { from: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=80&auto=format&fit=crop', to: '/assets/JAISELMER TRIP/1.webp' },
      { from: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=900&q=80&auto=format&fit=crop', to: '/assets/MOTHER CHILD COOK OFF/1.webp' },
      { from: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=900&q=80&auto=format&fit=crop', to: '/assets/MOTHER_S DAY/1.webp' },
      { from: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80&auto=format&fit=crop', to: '/assets/PRIMARY OUTING/1.webp' },
      { from: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=900&q=80&auto=format&fit=crop', to: '/assets/RANGOLI MAKING/1.webp' },
      { from: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format&fit=crop', to: '/assets/SARASWATI INSTALLATION/1.webp' },
      { from: 'https://images.unsplash.com/photo-1434030216411-0b793f4b6f96?w=900&q=80&auto=format&fit=crop', to: '/assets/SPARKLE FEST/1.webp' },
      { from: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop', to: '/assets/SPORTS DAY/1.webp' },
      { from: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop', to: '/assets/STELLAR SATURDAYS/1.webp' },
      { from: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=80&auto=format&fit=crop', to: '/assets/SUSTAINABLE FASHION SHOW/1.webp' },
      { from: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=900&q=80&auto=format&fit=crop', to: '/assets/WHISPERS OF WELLNESS/1.webp' },
      { from: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=900&q=80&auto=format&fit=crop', to: '/assets/XMAS CARNIVAL/1.webp' }
    ]
  },
  {
    file: 'app/admissions/transport/page.tsx',
    replacements: [
      { from: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80', to: '/assets/PRIMARY OUTING/1.webp' },
      { from: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80', to: '/assets/PRIMARY OUTING/2.webp' }
    ]
  },
  {
    file: 'app/admissions/process/page.tsx',
    replacements: [
      { from: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80', to: '/assets/Home/classroom.jpg' }
    ]
  },
  {
    file: 'app/admissions/page.tsx',
    replacements: [
      { from: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800&q=80', to: '/assets/Home/smart-classroom.jpg' },
      { from: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1800&q=80', to: '/assets/Home/library.jpg' }
    ]
  },
  {
    file: 'app/admissions/fee-structure/page.tsx',
    replacements: [
      { from: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80', to: '/assets/Home/classroom.jpg' }
    ]
  },
  {
    file: 'app/career/page.tsx',
    replacements: [
      { from: 'https://images.unsplash.com/photo-1573497019930-1c28c88b4f3e?w=200&q=80', to: '/assets/testimonial/aditi-sharma.jpg' },
      { from: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80', to: '/assets/testimonial/Bhanupriya-Singh.jpg' }
    ]
  }
];

for (const replacement of fileReplacements) {
  const filePath = path.join(__dirname, replacement.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const r of replacement.replacements) {
      content = content.split(r.from).join(r.to);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${replacement.file}`);
  } else {
    console.error(`File not found: ${replacement.file}`);
  }
}
