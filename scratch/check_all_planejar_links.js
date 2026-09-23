const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find about button
const aboutMatch = html.match(/class="home__about__right"[\s\S]*?<a[^>]*class="page__button arrow"[^>]*>[\s\S]*?<\/a>/);
console.log('About button in HTML:');
console.log(aboutMatch ? aboutMatch[0].substring(0, 300) : 'not found');

// Find card buttons
const cardBtnMatches = [...html.matchAll(/class="home__expertises__card"[\s\S]*?<a[^>]*class="page__button arrow"[^>]*>[\s\S]*?<\/a>/g)];
console.log('Card buttons count:', cardBtnMatches.length);
if (cardBtnMatches[0]) {
  console.log('Card button 1:');
  console.log(cardBtnMatches[0][0].substring(cardBtnMatches[0][0].indexOf('<a'), cardBtnMatches[0][0].indexOf('<a') + 200));
}

// Find applyHeroText code in index.html
const heroFixScript = html.match(/<script id="hero-fix-script">[\s\S]*?<\/script>/);
console.log('Found heroFixScript, length:', heroFixScript ? heroFixScript[0].length : 0);
