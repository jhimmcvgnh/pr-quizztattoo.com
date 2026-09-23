const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const s2 = html.match(/<script id="hero-fix-script">[\s\S]*?<\/script>/i);
if (s2) {
  console.log('=== HERO FIX SCRIPT ===');
  console.log(s2[0]);
}

// Let's also search for 'Sobre' and 'Explore' and 'Português' and 'Pt' in index.html
console.log('=== MATCHES IN INDEX.HTML ===');
['Sobre', 'Explore', 'Português', 'Pt', 'sitetestetattoo', 'quizz'].forEach(term => {
  let count = 0;
  let idx = 0;
  while ((idx = html.indexOf(term, idx)) !== -1) {
    count++;
    idx += term.length;
  }
  console.log(`${term}: ${count} occurrences`);
});
