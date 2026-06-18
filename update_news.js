const fs = require('fs');
const path = 'app/news-and-events/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Find the start of newsItems
const startIndex = content.indexOf('const newsItems = [');
if (startIndex !== -1) {
    // Find the end of newsItems (the array ends with '];')
    // A quick way is to find the next section, e.g. 'function NewsCard'
    const endIndex = content.indexOf('function NewsCard', startIndex);
    
    if (endIndex !== -1) {
        let newsItemsStr = content.slice(startIndex, endIndex);
        // Replace excerpt in this block only
        newsItemsStr = newsItemsStr.replace(/    excerpt:.*\n/g, '');
        // For multiline excerpts
        newsItemsStr = newsItemsStr.replace(/    excerpt:\s*"[^"]*",\n/g, '');
        
        content = content.slice(0, startIndex) + newsItemsStr + content.slice(endIndex);
        fs.writeFileSync(path, content);
        console.log("Updated newsItems successfully.");
    }
}
