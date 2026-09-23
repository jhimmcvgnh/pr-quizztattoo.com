const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';
const QUIZZ_URL = 'https://quizz-page-fist.vercel.app/';

// 1. Ensure the divider link in HTML points to INICIAR_PROJETO_URL
html = html.replace(
  /<div class="home__scroll__divider"[^>]*>[\s\S]*?<a href="[^"]*" class="home__scroll__divider__link"/,
  `<div class="home__scroll__divider" style="display: flex; justify-content: center; align-items: center; padding: 70px 0 30px 0; width: 100%; position: relative; z-index: 5;">\n  <a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link"`
);

// 2. Ensure the hero scroll button in HTML is wrapped or points to INICIAR_PROJETO_URL
const oldHeroScroll = `<div class="page__hero__bottom__middle" data-v-f61586af=""><div class="page__button__scroll" data-v-f61586af="" data-v-d4ca9408=""><div class="page__button__scroll__circles" data-v-d4ca9408=""><div class="page__button__scroll__circle" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div></div><div class="page__button__scroll__text" data-v-d4ca9408=""><p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p></div></div></div>`;

const newHeroScroll = `<div class="page__hero__bottom__middle" data-v-f61586af=""><a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link home__hero__scroll__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;"><div class="page__button__scroll" data-v-f61586af="" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0"><div class="page__button__scroll__circles" data-v-d4ca9408=""><div class="page__button__scroll__circle" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div></div><div class="page__button__scroll__text" data-v-d4ca9408=""><p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p></div></div></a></div>`;

if (html.includes(oldHeroScroll)) {
  html = html.replace(oldHeroScroll, newHeroScroll);
  console.log('Hero scroll button wrapped in link to INICIAR_PROJETO_URL');
} else {
  // If already wrapped or slightly different
  html = html.replace(/<div class="page__hero__bottom__middle"[^>]*>[\s\S]*?<div class="page__button__scroll"[\s\S]*?PROJETO<\/span><\/p><\/div><\/div>(?:<\/a>)?<\/div>/, newHeroScroll);
  console.log('Hero scroll button replaced via regex');
}

// 3. Update hero-fix-script
// Add constants at top of hero-fix-script if not already present
if (!html.includes('const INICIAR_PROJETO_URL')) {
  html = html.replace(
    'const TARGET_REDIRECT_URL = \'https://quizz-page-fist.vercel.app/\';',
    `const TARGET_REDIRECT_URL = 'https://quizz-page-fist.vercel.app/';\n  const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';`
  );
}

// Update ensureCardsDivider to use INICIAR_PROJETO_URL
html = html.replace(
  'divWrapper.innerHTML = `<a href="${TARGET_REDIRECT_URL}" class="home__scroll__divider__link"',
  'divWrapper.innerHTML = `<a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link"'
);

// Update applyHeroText to set INICIAR_PROJETO_URL on all .home__scroll__divider__link and .page__button__scroll
const oldScrollLogic = `document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__scroll__divider__link').forEach(btn => {\n      btn.setAttribute('href', TARGET_REDIRECT_URL);\n    });`;

const newScrollLogic = `document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button').forEach(btn => {
      btn.setAttribute('href', TARGET_REDIRECT_URL);
    });

    document.querySelectorAll('.home__scroll__divider__link, a.home__hero__scroll__link').forEach(btn => {
      btn.setAttribute('href', INICIAR_PROJETO_URL);
    });`;

if (html.includes(oldScrollLogic)) {
  html = html.replace(oldScrollLogic, newScrollLogic);
} else {
  // Replace any existing .home__scroll__divider__link attribution in applyHeroText
  html = html.replace(
    /btn\.setAttribute\('href',\s*TARGET_REDIRECT_URL\);\s*\}\);\s*document\.querySelectorAll\('\.home__scroll__divider__link'\)/g,
    `btn.setAttribute('href', TARGET_REDIRECT_URL);\n    });\n    document.querySelectorAll('.home__scroll__divider__link')`
  );
}

// Update the page__button__scroll event listener in applyHeroText to navigate to INICIAR_PROJETO_URL
const oldPageButtonScroll = `document.querySelectorAll('.page__button__scroll').forEach(btn => {\n      btn.setAttribute('role', 'link');\n      btn.setAttribute('tabindex', '0');\n      btn.setAttribute('aria-label', 'Iniciar Projeto');\n      btn.setAttribute('title', 'Iniciar Projeto');\n      btn.style.cursor = 'pointer';\n    });`;

const newPageButtonScroll = `document.querySelectorAll('.page__button__scroll').forEach(btn => {
      btn.setAttribute('role', 'link');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-label', 'Iniciar Projeto');
      btn.setAttribute('title', 'Iniciar Projeto');
      btn.style.cursor = 'pointer';

      if (!btn.__iniciarRedirectAttached) {
        btn.__iniciarRedirectAttached = true;
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = INICIAR_PROJETO_URL;
        }, true);
      }
    });`;

if (html.includes(oldPageButtonScroll)) {
  html = html.replace(oldPageButtonScroll, newPageButtonScroll);
  console.log('page__button__scroll click redirection updated');
} else {
  // If already modified, make sure it redirects to INICIAR_PROJETO_URL
  html = html.replace(
    /window\.location\.href\s*=\s*(?:TARGET_REDIRECT_URL|'https:[^']*');/g,
    (match, offset) => {
      // Check if this is within __iniciarRedirectAttached
      const before = html.slice(Math.max(0, offset - 200), offset);
      if (before.includes('iniciar') || before.includes('__iniciarRedirectAttached')) {
        return 'window.location.href = INICIAR_PROJETO_URL;';
      }
      return match;
    }
  );
  // Also check if __iniciarRedirectAttached is missing
  if (!html.includes('__iniciarRedirectAttached')) {
    html = html.replace(
      'btn.style.cursor = \'pointer\';\n    });',
      `btn.style.cursor = 'pointer';\n\n      if (!btn.__iniciarRedirectAttached) {\n        btn.__iniciarRedirectAttached = true;\n        btn.addEventListener('click', function(e) {\n          e.preventDefault();\n          e.stopPropagation();\n          window.location.href = INICIAR_PROJETO_URL;\n        }, true);\n      }\n    });`
    );
  }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated with INICIAR PROJETO redirect to ' + INICIAR_PROJETO_URL);
