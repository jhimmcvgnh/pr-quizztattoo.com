const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const OLD_TARGET_URL = 'https://sitetestetattoo-com.vercel.app';
const NEW_TARGET_URL = 'https://quizz-page-fist.vercel.app/';

// 1. Replace TARGET_REDIRECT_URL in hero-fix-script
if (html.includes(OLD_TARGET_URL)) {
  console.log('Replacing OLD_TARGET_URL with NEW_TARGET_URL globally in HTML...');
  html = html.replaceAll(OLD_TARGET_URL, NEW_TARGET_URL);
}

// 2. Replace href="/pt/about" on the "Sobre nós" button to NEW_TARGET_URL
console.log('Replacing href="/pt/about" on Sobre nós button...');
html = html.replace('href="/pt/about" class="page__button arrow"', `href="${NEW_TARGET_URL}" class="page__button arrow"`);

// 3. Replace "Sobre nós" text with "Planejar Projeto"
console.log('Replacing "Sobre nós" button text...');
html = html.replace('<p data-v-421e7666="">Sobre nós</p>', '<p data-v-421e7666="">Planejar Projeto</p>');

// Also update in __NUXT_DATA__ if present
html = html.replace('"Sobre nós"', '"Planejar Projeto"');

// 4. Replace "Explore" button texts in cards
console.log('Replacing "Explore" card button texts...');
html = html.replaceAll('<p data-v-421e7666="">Explore</p>', '<p data-v-421e7666="">Planejar Projeto</p>');

// 5. Replace Hero Bottom-Left language button
console.log('Updating Hero language button...');
const oldHeroLang = '<div class="page__hero__bottom__left" data-v-f61586af=""><div class="page__button__language" data-v-f61586af="" data-v-98d4d7d3=""><div class="page__button__language__button" data-v-98d4d7d3=""><div class="page__button__language__button__icon" data-v-98d4d7d3=""></div><div class="page__button__language__button__text" data-v-98d4d7d3=""><p data-v-98d4d7d3=""><span>P</span><span>t</span></p></div><div class="page__button__language__button__arrow" data-v-98d4d7d3=""></div></div><div class="page__button__language__nav" data-v-98d4d7d3=""><a href="/" class="page__button__language__nav__button" data-v-98d4d7d3=""><div class="page__button__language__nav__button__icon" data-v-98d4d7d3=""></div><p data-v-98d4d7d3=""> English </p></a><a aria-current="page" href="/pt" class="router-link-active router-link-exact-active page__button__language__nav__button" data-v-98d4d7d3=""><div class="page__button__language__nav__button__icon" data-v-98d4d7d3=""></div><p data-v-98d4d7d3=""> Português </p></a></div></div></div>';

const newHeroLang = `<div class="page__hero__bottom__left" data-v-f61586af=""><a href="${NEW_TARGET_URL}" class="page__button__language" data-v-f61586af="" data-v-98d4d7d3="" role="link" aria-label="Planejar Projeto" title="Planejar Projeto" style="text-decoration: none; cursor: pointer;"><div class="page__button__language__button" data-v-98d4d7d3=""><div class="page__button__language__button__icon" data-v-98d4d7d3=""></div><div class="page__button__language__button__text" data-v-98d4d7d3=""><p data-v-98d4d7d3="">Planejar Projeto</p></div><div class="page__button__language__button__arrow" data-v-98d4d7d3=""></div></div></a></div>`;

if (html.includes(oldHeroLang)) {
  html = html.replace(oldHeroLang, newHeroLang);
  console.log('Hero language button replaced successfully.');
} else {
  console.warn('Exact match for oldHeroLang not found, using regex...');
  html = html.replace(/<div class="page__hero__bottom__left"[^>]*>[\s\S]*?<span>P<\/span><span>t<\/span>[\s\S]*?<\/div><\/div><\/div>/, newHeroLang);
}

// 6. Replace Menu drawer language buttons (desktop and mobile)
console.log('Updating Menu drawer language buttons...');
const oldMenuLangPattern = /<div class="page__button__language menu"[^>]*>[\s\S]*?<span>P<\/span><span>o<\/span>[\s\S]*?<span>s<\/span><\/p><\/div><div class="page__button__language__button__arrow"[^>]*><\/div><\/div><div class="page__button__language__nav"[\s\S]*?<\/div><\/div>/g;

const newMenuLang = `<a href="${NEW_TARGET_URL}" class="page__button__language menu" data-v-3d548da1="" data-v-98d4d7d3="" role="link" aria-label="Planejar Projeto" title="Planejar Projeto" style="text-decoration: none; cursor: pointer;"><div class="page__button__language__button" data-v-98d4d7d3=""><div class="page__button__language__button__icon" data-v-98d4d7d3=""></div><div class="page__button__language__button__text" data-v-98d4d7d3=""><p data-v-98d4d7d3="">Planejar Projeto</p></div><div class="page__button__language__button__arrow" data-v-98d4d7d3=""></div></div></a>`;

html = html.replaceAll(oldMenuLangPattern, newMenuLang);

// 7. Inject dedicated styling in <head> for perfect fit across all devices
const customStyle = `
<style id="custom-planejar-projeto-style">
/* Estilização para garantir que 'Planejar Projeto' caiba perfeitamente em todos os elementos */
.page__button__language {
  text-decoration: none !important;
  cursor: pointer !important;
  display: inline-flex !important;
  max-width: 100% !important;
}
.page__button__language__button {
  padding: 0 22px !important;
  column-gap: 10px !important;
  width: fit-content !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  align-items: center !important;
  display: flex !important;
}
.page__button__language p,
.page__button__language__button__text p {
  white-space: nowrap !important;
  font-size: clamp(14px, 13px + .0022 * 100vw, 17px) !important;
  letter-spacing: 0.02em !important;
  font-weight: 500 !important;
  margin: 0 !important;
}
.page__button__language.menu .page__button__language__button {
  height: 56px !important;
  padding: 0 20px 0 16px !important;
  column-gap: 9px !important;
}
.page__button__language__nav {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
.page__button__text p {
  white-space: nowrap !important;
}
.home__about .page__button,
.home__expertises__card .page__button {
  padding-left: clamp(20px, 17px + .003 * 100vw, 28px) !important;
  column-gap: 14px !important;
  max-width: 100% !important;
  width: fit-content !important;
  box-sizing: border-box !important;
}
.home__about .page__button .page__button__text p,
.home__expertises__card .page__button .page__button__text p {
  font-size: clamp(14px, 13px + .0025 * 100vw, 18px) !important;
  white-space: nowrap !important;
  letter-spacing: 0.02em !important;
}

@media (max-width: 768px) {
  .page__hero__bottom {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 8px !important;
    padding: var(--page-pd) 0 !important;
  }
  .page__hero__bottom__left,
  .page__hero__bottom__right {
    flex: initial !important;
  }
  .page__hero__bottom__left .page__button__language__button {
    height: 48px !important;
    padding: 0 13px !important;
    column-gap: 6px !important;
  }
  .page__hero__bottom__left .page__button__language p,
  .page__hero__bottom__left .page__button__language__button__text p {
    font-size: 12px !important;
    white-space: nowrap !important;
  }
  .page__hero__bottom__left .page__button__language__button__icon {
    width: 14px !important;
    height: 14px !important;
    border-width: 1.5px !important;
  }
  .page__hero__bottom__left .page__button__language__button__arrow {
    width: 7px !important;
    height: 7px !important;
    border-width: 1.5px !important;
    margin-left: 2px !important;
  }
  .page__hero__bottom__right .page__button {
    height: 48px !important;
    padding-left: 14px !important;
    padding-right: 4px !important;
    column-gap: 8px !important;
  }
  .page__hero__bottom__right .page__button__text p {
    font-size: 12px !important;
    white-space: nowrap !important;
  }
  .page__hero__bottom__right .page__button__arrow {
    width: 40px !important;
    height: 40px !important;
  }
  .page__button__language.menu .page__button__language__button {
    height: 46px !important;
    padding: 0 15px !important;
    column-gap: 7px !important;
  }
  .page__button__language.menu p {
    font-size: 12px !important;
  }
  .home__about .page__button,
  .home__expertises__card .page__button {
    height: 50px !important;
    padding-left: 16px !important;
    padding-right: 4px !important;
    column-gap: 10px !important;
  }
  .home__about .page__button .page__button__text p,
  .home__expertises__card .page__button .page__button__text p {
    font-size: 13px !important;
  }
  .home__about .page__button .page__button__arrow,
  .home__expertises__card .page__button .page__button__arrow {
    width: 42px !important;
    height: 42px !important;
  }
}
</style>
`;

if (!html.includes('id="custom-planejar-projeto-style"')) {
  html = html.replace('</head>', customStyle + '\n</head>');
  console.log('Custom style injected.');
}

// 8. Update hero-fix-script to enforce "Planejar Projeto" text and redirection on all target buttons
const fixSnippetToFind = "document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__scroll__divider__link').forEach(btn => {\n      btn.setAttribute('href', TARGET_REDIRECT_URL);\n    });";

const fixSnippetReplacement = `// Atualiza links e textos de todos os elementos para Planejar Projeto e TARGET_REDIRECT_URL
    document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__scroll__divider__link').forEach(btn => {
      btn.setAttribute('href', TARGET_REDIRECT_URL);
    });

    // Atualiza os botões dos cards
    document.querySelectorAll('.home__expertises__card .page__button.arrow').forEach(btn => {
      btn.setAttribute('href', TARGET_REDIRECT_URL);
      const txt = btn.querySelector('.page__button__text p');
      if (txt && txt.textContent.trim() !== 'Planejar Projeto') {
        txt.textContent = 'Planejar Projeto';
      }
    });

    // Atualiza o botão da seção Sobre
    document.querySelectorAll('.home__about__right a.page__button').forEach(btn => {
      btn.setAttribute('href', TARGET_REDIRECT_URL);
      const txt = btn.querySelector('.page__button__text p');
      if (txt && txt.textContent.trim() !== 'Planejar Projeto') {
        txt.textContent = 'Planejar Projeto';
      }
    });

    // Atualiza os botões de idioma (Hero e Menu) para Planejar Projeto e redirecionamento
    document.querySelectorAll('.page__button__language').forEach(el => {
      el.setAttribute('href', TARGET_REDIRECT_URL);
      el.style.textDecoration = 'none';
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'link');
      el.setAttribute('aria-label', 'Planejar Projeto');
      el.setAttribute('title', 'Planejar Projeto');

      if (!el.__quizRedirectAttached) {
        el.__quizRedirectAttached = true;
        el.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = TARGET_REDIRECT_URL;
        }, true);
      }

      const textEl = el.querySelector('.page__button__language__button__text p');
      if (textEl && textEl.textContent.trim() !== 'Planejar Projeto') {
        textEl.innerHTML = 'Planejar Projeto';
      }
    });`;

if (html.includes(fixSnippetToFind)) {
  html = html.replace(fixSnippetToFind, fixSnippetReplacement);
  console.log('hero-fix-script updated successfully.');
} else {
  console.warn('fixSnippetToFind not matched exactly, checking alternative injection point...');
  // Find applyHeroText function end
  html = html.replace('ensureCardsDivider();', `ensureCardsDivider();\n    ${fixSnippetReplacement}`);
  console.log('Alternative injection performed in applyHeroText().');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated and saved!');
