const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldHtml = '<p data-v-d4ca9408=""><span>E</span><span>x</span><span>p</span><span>l</span><span>o</span><span>r</span><span>e</span></p>';
const newHtml = '<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>';

const count = html.split(oldHtml).length - 1;
console.log('Occurrences found of old Explore markup:', count);

html = html.split(oldHtml).join(newHtml);
fs.writeFileSync('index.html', html, 'utf8');

console.log('Remaining occurrences of Explore in index.html:', html.split(oldHtml).length - 1);
