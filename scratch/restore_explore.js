const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';
const EXPLORE_HTML = '<p data-v-d4ca9408=""><span>E</span><span>x</span><span>p</span><span>l</span><span>o</span><span>r</span><span>e</span></p>';

// 1. Update hero section scroll button HTML
console.log('Updating hero scroll button HTML to Explore...');
html = html.replace(
  /<div class="page__button__scroll__text" data-v-d4ca9408=""><p data-v-d4ca9408=""><span class="btn-line">INICIAR<\/span><span class="btn-line">PROJETO<\/span><\/p><\/div>/,
  `<div class="page__button__scroll__text" data-v-d4ca9408="">${EXPLORE_HTML}</div>`
);

// 2. Update divider section scroll button HTML
console.log('Updating divider scroll button HTML to Explore...');
html = html.replace(
  /<div class="page__button__scroll__text" data-v-d4ca9408="">\s*<p data-v-d4ca9408="">\s*<span class="btn-line">INICIAR<\/span>\s*<span class="btn-line">PROJETO<\/span>\s*<\/p>\s*<\/div>/,
  `<div class="page__button__scroll__text" data-v-d4ca9408="">${EXPLORE_HTML}</div>`
);

// 3. Update ensureCardsDivider in hero-fix-script
console.log('Updating ensureCardsDivider in hero-fix-script...');
html = html.replace(
  /<div class="page__button__scroll__text" data-v-d4ca9408="">\s*<p data-v-d4ca9408="">\s*<span class="btn-line">INICIAR<\/span>\s*<span class="btn-line">PROJETO<\/span>\s*<\/p>\s*<\/div>/g,
  `<div class="page__button__scroll__text" data-v-d4ca9408="">${EXPLORE_HTML}</div>`
);

// Also replace aria-label and title to Explore on the scroll buttons
html = html.replaceAll('aria-label="Iniciar Projeto" title="Iniciar Projeto"', 'aria-label="Explore" title="Explore"');

// 4. Update applyHeroText in hero-fix-script
console.log('Updating applyHeroText in hero-fix-script...');
const oldHeroScrollCheck = `    const heroScrollText = document.querySelector('.page__hero__bottom__middle .page__button__scroll__text');
    if (heroScrollText && (!heroScrollText.textContent.includes('INICIAR') || heroScrollText.textContent.includes('E\\nx'))) {
      heroScrollText.innerHTML = '<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>';
    }`;

const newHeroScrollCheck = `    const scrollTexts = document.querySelectorAll('.page__button__scroll__text');
    scrollTexts.forEach(st => {
      if (st && (!st.innerHTML.includes('<span>E</span>') || st.textContent.includes('INICIAR'))) {
        st.innerHTML = '<p data-v-d4ca9408=""><span>E</span><span>x</span><span>p</span><span>l</span><span>o</span><span>r</span><span>e</span></p>';
      }
    });`;

if (html.includes(oldHeroScrollCheck)) {
  html = html.replace(oldHeroScrollCheck, newHeroScrollCheck);
  console.log('heroScrollText logic replaced in applyHeroText.');
} else {
  // If slightly different, search for heroScrollText block
  html = html.replace(
    /const heroScrollText = document\.querySelector\('\.page__hero__bottom__middle \.page__button__scroll__text'\);[\s\S]*?heroScrollText\.innerHTML = '<p data-v-d4ca9408=""><span class="btn-line">INICIAR<\/span><span class="btn-line">PROJETO<\/span><\/p>';\s*\}/,
    newHeroScrollCheck
  );
  console.log('heroScrollText logic replaced via regex.');
}

// 5. Update accessibility attributes in applyHeroText
html = html.replace(
  /btn\.setAttribute\('aria-label',\s*'Iniciar Projeto'\);\s*btn\.setAttribute\('title',\s*'Iniciar Projeto'\);/g,
  `btn.setAttribute('aria-label', 'Explore');\n      btn.setAttribute('title', 'Explore');`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with EXPLORE on scroll buttons!');
