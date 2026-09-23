const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const s = html.match(/<script id="hero-fix-script">[\s\S]*?<\/script>/i);
if (s) {
  console.log(s[0]);
}
