const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';
const TARGET_REDIRECT_URL = 'https://quizz-page-fist.vercel.app/';

const INICIAR_PROJETO_HTML = '<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>';

// 1. Update hero section scroll button HTML
console.log('1. Updating hero scroll button in static HTML...');
html = html.replace(
  /<div class="page__button__scroll__text" data-v-d4ca9408=""><p data-v-d4ca9408=""><span>E<\/span><span>x<\/span><span>p<\/span><span>l<\/span><span>o<\/span><span>r<\/span><span>e<\/span><\/p><\/div>/,
  `<div class="page__button__scroll__text" data-v-d4ca9408="">${INICIAR_PROJETO_HTML}</div>`
);

// 2. Update divider section scroll button HTML
console.log('2. Updating divider scroll button in static HTML...');
html = html.replace(
  /<div class="home__scroll__divider"[\s\S]*?<div class="page__button__scroll__text" data-v-d4ca9408="">[\s\S]*?<\/div>\s*<\/div>\s*<\/a>\s*<\/div>/,
  `<div class="home__scroll__divider" style="display: flex; justify-content: center; align-items: center; padding: 70px 0 30px 0; width: 100%; position: relative; z-index: 5;">
  <a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;"><div class="page__button__scroll home__to__contact__scroll" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0">
    <div class="page__button__scroll__circles" data-v-d4ca9408="">
      <div class="page__button__scroll__circle" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
    </div>
    <div class="page__button__scroll__text" data-v-d4ca9408="">
      <p data-v-d4ca9408="">
        <span class="btn-line">INICIAR</span>
        <span class="btn-line">PROJETO</span>
      </p>
    </div>
  </div>
</a>
</div>`
);

// 3. Update ensureCardsDivider function in script
console.log('3. Updating ensureCardsDivider in hero-fix-script...');
html = html.replace(
  /divWrapper\.innerHTML = `<a href="\${INICIAR_PROJETO_URL}" class="home__scroll__divider__link"[\s\S]*?<\/a>`;/,
  `divWrapper.innerHTML = \`<a href="\${INICIAR_PROJETO_URL}" class="home__scroll__divider__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;">
        <div class="page__button__scroll home__to__contact__scroll" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0">
          <div class="page__button__scroll__circles" data-v-d4ca9408="">
            <div class="page__button__scroll__circle" data-v-d4ca9408=""></div>
            <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
            <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
            <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
          </div>
          <div class="page__button__scroll__text" data-v-d4ca9408="">
            <p data-v-d4ca9408="">
              <span class="btn-line">INICIAR</span>
              <span class="btn-line">PROJETO</span>
            </p>
          </div>
        </div>
      </a>\`;`
);

// 4. Update aria-label and title on scroll buttons
console.log('4. Updating aria-label and title on scroll buttons...');
html = html.replaceAll('aria-label="Explore" title="Explore"', 'aria-label="Iniciar Projeto" title="Iniciar Projeto"');

// 5. Update applyHeroText scroll check
console.log('5. Updating applyHeroText scroll check...');
const oldScrollTextRegex = /const scrollTexts = document\.querySelectorAll\('\.page__button__scroll__text'\);[\s\S]*?st\.innerHTML = '<p data-v-d4ca9408=""><span>E<\/span><span>x<\/span><span>p<\/span><span>l<\/span><span>o<\/span><span>r<\/span><span>e<\/span><\/p>';\s*\}\s*\}\);/;

const newScrollTextCode = `const scrollTexts = document.querySelectorAll('.page__button__scroll__text');
    scrollTexts.forEach(st => {
      const txt = (st.textContent || '').trim().replace(/\\s+/g, ' ');
      if (!txt.includes('INICIAR') || !txt.includes('PROJETO') || st.innerHTML.includes('<span>E</span>') || txt.includes('Explore') || txt.includes('EXPLORE')) {
        st.innerHTML = '<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>';
      }
    });`;

if (oldScrollTextRegex.test(html)) {
  html = html.replace(oldScrollTextRegex, newScrollTextCode);
  console.log('applyHeroText scroll check updated successfully.');
} else {
  console.warn('oldScrollTextRegex did not match directly, checking alternative...');
}

// 6. Ensure .home__scroll__divider__link is NOT overwritten with TARGET_REDIRECT_URL
html = html.replace(
  `document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__scroll__divider__link').forEach(btn => {\n      btn.setAttribute('href', TARGET_REDIRECT_URL);\n    });`,
  `document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button').forEach(btn => {\n      btn.setAttribute('href', TARGET_REDIRECT_URL);\n    });\n    document.querySelectorAll('.home__scroll__divider__link').forEach(btn => {\n      btn.setAttribute('href', INICIAR_PROJETO_URL);\n    });`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully with INICIAR PROJETO!');
