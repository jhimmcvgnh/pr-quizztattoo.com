const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';
const TARGET_REDIRECT_URL = 'https://quizz-page-fist.vercel.app/';

// Replace handleScrollButtonRedirect block
const oldHandlerStart = '  // Redirection handler for INICIAR PROJETO buttons';
const oldHandlerEnd = '  function ensureCardsDivider()';

const startIdx = html.indexOf(oldHandlerStart);
const endIdx = html.indexOf(oldHandlerEnd);

if (startIdx !== -1 && endIdx !== -1) {
  const newHandlerCode = `  // Redirection handler for INICIAR PROJETO buttons
  function handleIniciarProjetoRedirect(e) {
    const iniciarBtn = e.target.closest('.page__button__scroll, .home__to__contact__scroll, .home__scroll__divider__link, .home__hero__scroll__link');
    if (iniciarBtn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (e.button === 1 || e.ctrlKey || e.metaKey) {
        window.open(INICIAR_PROJETO_URL, '_blank');
      } else {
        window.location.href = INICIAR_PROJETO_URL;
      }
      return;
    }

    const planejarBtn = e.target.closest('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__about__right a.page__button, .page__button__language');
    if (planejarBtn) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (e.button === 1 || e.ctrlKey || e.metaKey) {
        window.open(TARGET_REDIRECT_URL, '_blank');
      } else {
        window.location.href = TARGET_REDIRECT_URL;
      }
      return;
    }
  }

  document.addEventListener('click', handleIniciarProjetoRedirect, true);
  document.addEventListener('auxclick', handleIniciarProjetoRedirect, true);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const iniciarBtn = e.target.closest('.page__button__scroll, .home__to__contact__scroll, .home__scroll__divider__link, .home__hero__scroll__link');
      if (iniciarBtn) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.location.href = INICIAR_PROJETO_URL;
        return;
      }
      const planejarBtn = e.target.closest('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__about__right a.page__button, .page__button__language');
      if (planejarBtn) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.location.href = TARGET_REDIRECT_URL;
        return;
      }
    }
  }, true);\n\n`;

  html = html.slice(0, startIdx) + newHandlerCode + html.slice(endIdx);
  console.log('handleIniciarProjetoRedirect installed successfully!');
} else {
  console.error('Could not find boundaries for handleScrollButtonRedirect');
}

// Make sure href on divider links is INICIAR_PROJETO_URL
html = html.replace(
  'href="https://quizz-page-fist.vercel.app/" class="home__scroll__divider__link"',
  `href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link"`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html saved with updated handler!');
