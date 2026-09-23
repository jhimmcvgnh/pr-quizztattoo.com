const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Check card buttons in HTML
const regex = /class="home__expertises__card"[\s\S]*?(<div class="home__expertises__card"|<\/div><\/div><\/div><div class="home__scroll__divider")/g;
let match;
let i = 0;
while ((match = regex.exec(html)) !== null) {
  console.log(`\n=== CARD ${i} ===`);
  const chunk = match[0];
  const btns = chunk.match(/<a[\s\S]*?<\/a>/g);
  if (btns) {
    btns.forEach(b => {
      console.log('BTN:', b.replace(/\s+/g, ' ').slice(0, 180));
    });
  }
  i++;
}
