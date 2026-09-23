const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all occurrences of page__button__language in index.html
const matches = [...html.matchAll(/class="[^"]*page__button__language[^"]*"/g)];
console.log('Total page__button__language classes found:', matches.length);
matches.forEach((m, idx) => {
  const start = Math.max(0, m.index - 50);
  const end = Math.min(html.length, m.index + 350);
  console.log(`--- Match ${idx + 1} at index ${m.index} ---`);
  console.log(html.substring(start, end));
});
