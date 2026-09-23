const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const QUIZZ_URL = 'https://quizz-page-fist.vercel.app/';

// 1. Replace Hero language button in static HTML
const oldHeroLangPattern = /<div class="page__hero__bottom__left"[^>]*>[\s\S]*?<span>P<\/span><span>t<\/span>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newHeroLang = `<div class="page__hero__bottom__left" data-v-f61586af=""><a href="${QUIZZ_URL}" class="page__button__language" data-v-f61586af="" data-v-98d4d7d3="" role="link" aria-label="Planejar Projeto" title="Planejar Projeto" style="text-decoration: none; cursor: pointer;"><div class="page__button__language__button" data-v-98d4d7d3=""><div class="page__button__language__button__icon" data-v-98d4d7d3=""></div><div class="page__button__language__button__text" data-v-98d4d7d3=""><p data-v-98d4d7d3="">Planejar Projeto</p></div><div class="page__button__language__button__arrow" data-v-98d4d7d3=""></div></div></a></div>`;

if (oldHeroLangPattern.test(html)) {
  html = html.replace(oldHeroLangPattern, newHeroLang);
  console.log('Hero language button replaced in static HTML');
} else {
  console.warn('Hero language button pattern not found');
}

// 2. Replace Menu drawer language buttons (desktop and mobile)
const oldMenuLangPattern = /<div class="page__button__language menu"[^>]*>[\s\S]*?<span>P<\/span><span>o<\/span>[\s\S]*?<span>s<\/span><\/p><\/div><div class="page__button__language__button__arrow"[^>]*><\/div><\/div><div class="page__button__language__nav"[\s\S]*?<\/div><\/div>/g;
const newMenuLang = `<a href="${QUIZZ_URL}" class="page__button__language menu" data-v-3d548da1="" data-v-98d4d7d3="" role="link" aria-label="Planejar Projeto" title="Planejar Projeto" style="text-decoration: none; cursor: pointer;"><div class="page__button__language__button" data-v-98d4d7d3=""><div class="page__button__language__button__icon" data-v-98d4d7d3=""></div><div class="page__button__language__button__text" data-v-98d4d7d3=""><p data-v-98d4d7d3="">Planejar Projeto</p></div><div class="page__button__language__button__arrow" data-v-98d4d7d3=""></div></div></a>`;

const countMenuMatches = (html.match(oldMenuLangPattern) || []).length;
console.log('Found menu language button matches:', countMenuMatches);
html = html.replaceAll(oldMenuLangPattern, newMenuLang);

// 3. Update isContactElement exclusion to include page__button__language
html = html.replace(
  "if (cls.includes('page__button__scroll')",
  "if (cls.includes('page__button__language') || cls.includes('page__button__scroll')"
);

// 4. Update click handler in hero-fix-script
const clickHandlerAnchor = "function handleContactRedirect(e) {";
const langRedirectCode = `  // Redirection for Planejar Projeto language buttons
  const QUIZZ_URL = 'https://quizz-page-fist.vercel.app/';
  document.addEventListener('click', function(e) {
    const langBtn = e.target.closest('.page__button__language');
    if (langBtn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (e.button === 1 || e.ctrlKey || e.metaKey) {
        window.open(QUIZZ_URL, '_blank');
      } else {
        window.location.href = QUIZZ_URL;
      }
      return false;
    }
  }, true);
  document.addEventListener('auxclick', function(e) {
    const langBtn = e.target.closest('.page__button__language');
    if (langBtn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.open(QUIZZ_URL, '_blank');
      return false;
    }
  }, true);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const langBtn = e.target.closest('.page__button__language');
      if (langBtn) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.location.href = QUIZZ_URL;
      }
    }
  }, true);

`;

if (!html.includes('Redirection for Planejar Projeto language buttons')) {
  html = html.replace(clickHandlerAnchor, langRedirectCode + clickHandlerAnchor);
  console.log('Language button click redirection added to hero-fix-script');
}

// 5. Update applyHeroText to enforce Planejar Projeto on all .page__button__language
const applyHeroTextAnchor = "    ensureCardsDivider();";
const applyHeroTextLangUpdate = `    // Ensure all language buttons display Planejar Projeto and link to QUIZZ_URL
    document.querySelectorAll('.page__button__language').forEach(el => {
      el.setAttribute('href', QUIZZ_URL);
      el.style.textDecoration = 'none';
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'link');
      el.setAttribute('aria-label', 'Planejar Projeto');
      el.setAttribute('title', 'Planejar Projeto');

      const textEl = el.querySelector('.page__button__language__button__text p');
      if (textEl && textEl.textContent.trim() !== 'Planejar Projeto') {
        textEl.innerHTML = 'Planejar Projeto';
      }
      const navEl = el.querySelector('.page__button__language__nav');
      if (navEl) {
        navEl.style.display = 'none';
      }
    });

`;

if (!html.includes('Ensure all language buttons display Planejar Projeto')) {
  html = html.replace(applyHeroTextAnchor, applyHeroTextLangUpdate + applyHeroTextAnchor);
  console.log('Language button updater added to applyHeroText');
}

// 6. Inject CSS styles for Planejar Projeto buttons
const customStyleTag = `
<style id="custom-planejar-projeto-styles">
.page__button__language__nav {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
.page__button__language {
  text-decoration: none !important;
  cursor: pointer !important;
  display: inline-flex !important;
  max-width: 100% !important;
}
.page__button__language__button {
  padding: 0 22px !important;
  column-gap: 10px !important;
  width: auto !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  align-items: center !important;
  display: flex !important;
}
.page__button__language p,
.page__button__language__button__text p {
  white-space: nowrap !important;
  font-size: clamp(14px, 13px + .0022 * 100vw, 16px) !important;
  letter-spacing: 0.02em !important;
  font-weight: 500 !important;
  margin: 0 !important;
}
.page__button__language.menu .page__button__language__button {
  height: 56px !important;
  padding: 0 20px !important;
}
@media (max-width: 768px) {
  .page__hero__bottom__left .page__button__language__button {
    height: 48px !important;
    padding: 0 13px !important;
    column-gap: 6px !important;
  }
  .page__hero__bottom__left .page__button__language p,
  .page__hero__bottom__left .page__button__language__button__text p {
    font-size: 11.5px !important;
    white-space: nowrap !important;
  }
  .page__hero__bottom__left .page__button__language__button__icon {
    width: 14px !important;
    height: 14px !important;
  }
  .page__hero__bottom__left .page__button__language__button__arrow {
    width: 7px !important;
    height: 7px !important;
    margin-left: 2px !important;
  }
  .page__button__language.menu .page__button__language__button {
    height: 46px !important;
    padding: 0 15px !important;
    column-gap: 7px !important;
  }
  .page__button__language.menu p {
    font-size: 12px !important;
  }
}
</style>
`;

if (!html.includes('id="custom-planejar-projeto-styles"')) {
  html = html.replace('</head>', customStyleTag + '\n</head>');
  console.log('CSS styles injected for Planejar Projeto buttons');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated!');
