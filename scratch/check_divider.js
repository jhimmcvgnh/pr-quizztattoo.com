const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const m = html.match(/function ensureCardsDivider[\s\S]*?function applyHeroText/);
if (m) console.log(m[0]);
