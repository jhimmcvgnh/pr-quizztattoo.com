const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function findDetailed(str) {
  console.log(`\n================ SEARCH: ${str} ================`);
  let idx = 0;
  while ((idx = html.indexOf(str, idx)) !== -1) {
    const start = Math.max(0, idx - 150);
    const end = Math.min(html.length, idx + str.length + 150);
    console.log(`[Pos ${idx}]:`);
    console.log(html.slice(start, end));
    console.log('--------------------------------------------------');
    idx += str.length;
  }
}

findDetailed('Sobre nós');
findDetailed('Explore');
findDetailed('Português');
findDetailed('<span>P</span><span>t</span>');
