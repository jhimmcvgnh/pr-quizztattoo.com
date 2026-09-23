const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function showContext(regex, name) {
  console.log(`=== ${name} ===`);
  let match;
  while ((match = regex.exec(html)) !== null) {
    const start = Math.max(0, match.index - 100);
    const end = Math.min(html.length, match.index + match[0].length + 100);
    console.log('--- MATCH at ' + match.index + ' ---');
    console.log(html.slice(start, end));
  }
}

showContext(/page__button__language/g, 'page__button__language');
showContext(/Sobre nós/g, 'Sobre nós');
showContext(/Explore/g, 'Explore');
