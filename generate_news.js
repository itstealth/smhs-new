const fs = require('fs');

const images = [
  "WhatsApp Image 2025-05-15 at 7.03.21 AM.jpeg",
  "WhatsApp Image 2025-07-06 at 8.40.48 AM.jpeg",
  "WhatsApp Image 2025-07-06 at 8.40.49 AM.jpeg",
  "WhatsApp Image 2025-07-11 at 7.43.40 AM (1).jpeg",
  "WhatsApp Image 2025-07-11 at 7.43.40 AM.jpeg",
  "WhatsApp Image 2025-11-05 at 8.13.09 AM (1).jpeg",
  "WhatsApp Image 2025-11-05 at 8.13.09 AM.jpeg",
  "WhatsApp Image 2025-11-23 at 7.59.29 AM.jpeg",
  "WhatsApp Image 2025-11-26 at 6.51.09 AM (1).jpeg",
  "WhatsApp Image 2025-11-26 at 6.51.09 AM.jpeg",
  "WhatsApp Image 2025-12-20 at 7.16.18 AM.jpeg",
  "WhatsApp Image 2025-12-22 at 7.14.13 AM.jpeg",
  "WhatsApp Image 2025-12-22 at 7.14.14 AM.jpeg",
  "WhatsApp Image 2026-01-07 at 6.51.26 AM.jpeg",
  "WhatsApp Image 2026-01-11 at 10.14.16 AM.jpeg",
  "WhatsApp Image 2026-01-13 at 2.45.47 PM.jpeg"
];

const colors = ["bg-navy", "bg-crimson", "bg-navy-dark", "bg-crimson-dark", "bg-sand"];

let itemsStr = "";

images.reverse().forEach((img, index) => {
  const match = img.match(/WhatsApp Image (\d{4}-\d{2}-\d{2})/);
  let dateStr = "Unknown Date";
  if (match) {
    const d = new Date(match[1]);
    dateStr = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  itemsStr += `  {
    id: ${index + 6},
    category: "Media Spotlight",
    title: "Seedling Excellence Featured in News",
    excerpt: "Catch the latest coverage of Seedling Group of Schools as we continue our journey of educational excellence.",
    date: "${dateStr}",
    image: "/assets/Media/${img}",
    color: "${colors[index % colors.length]}",
  },\n`;
});

console.log(itemsStr);
