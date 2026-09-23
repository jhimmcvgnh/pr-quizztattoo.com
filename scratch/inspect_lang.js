const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all script tags
const scripts = html.match(/<script[^>]*src="[^"]*"[^>]*>/g);
console.log('Script tags:', scripts);

// Check if ChpCeyZw.js is loaded anywhere
console.log('ChpCeyZw mentioned in index.html:', html.includes('ChpCeyZw'));

// Find occurrences of Pt and Português in HTML
const ptMatches = [...html.matchAll(/<span>P<\/span><span>t<\/span>/g)];
console.log('<span>P</span><span>t</span> matches:', ptMatches.length);

const portMatches = [...html.matchAll(/<span>P<\/span><span>o<\/span><span>r<\/span><span>t<\/span><span>u<\/span><span>g<\/span><span>u<\/span><span>ê<\/span><span>s<\/span>/g)];
console.log('Português spans matches:', portMatches.length);
