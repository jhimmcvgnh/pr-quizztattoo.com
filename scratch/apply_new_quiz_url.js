const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const NEW_QUIZZ_URL = 'https://jimdevtattooquizz-com.vercel.app/';

// 1. Replace all occurrences of old quizz url
html = html.replaceAll('https://quizz-page-fist.vercel.app/', NEW_QUIZZ_URL);

// 2. In static HTML: update About button if it has Sobre nós or /about
const oldAboutRegex = /<a href=\"[^\"]*about[^\"]*\" class=\"page__button arrow\"[^>]*>[\s\S]*?<p data-v-421e7666=\"\">Sobre nós<\/p>[\s\S]*?<\/a>/;
const newAboutBtn = `<a href="${NEW_QUIZZ_URL}" class="page__button arrow" data-v-e184c758="" data-v-421e7666=""><div class="page__button__text" data-v-421e7666=""><p data-v-421e7666="">Planejar Projeto</p></div><div class="page__button__arrow" data-v-421e7666=""><div class="page__button__arrow__inner page__button__arrow1" data-v-421e7666=""></div><div class="page__button__arrow__inner page__button__arrow2" data-v-421e7666=""></div></div></a>`;

if (oldAboutRegex.test(html)) {
  html = html.replace(oldAboutRegex, newAboutBtn);
  console.log('About button in static HTML updated to Planejar Projeto and NEW_QUIZZ_URL');
} else {
  console.log('About button did not match old pattern, checking direct replacement...');
  html = html.replace(
    '<a href="/pt/about" class="page__button arrow" data-v-e184c758="" data-v-421e7666=""><div class="page__button__text" data-v-421e7666=""><p data-v-421e7666="">Sobre nós</p></div>',
    `<a href="${NEW_QUIZZ_URL}" class="page__button arrow" data-v-e184c758="" data-v-421e7666=""><div class="page__button__text" data-v-421e7666=""><p data-v-421e7666="">Planejar Projeto</p></div>`
  );
}

// 3. In static HTML: update Card buttons from "Explore" or old link to Planejar Projeto and NEW_QUIZZ_URL
// Note: Card buttons in middle:
html = html.replaceAll(
  /<a href=\"[^\"]*\" class=\"page__button arrow\" data-v-e1fc8da8=\"\" data-v-421e7666=\"\"><div class=\"page__button__text\" data-v-421e7666=\"\"><p data-v-421e7666=\"\">Explore<\/p><\/div>/g,
  `<a href="${NEW_QUIZZ_URL}" class="page__button arrow" data-v-e1fc8da8="" data-v-421e7666=""><div class="page__button__text" data-v-421e7666=""><p data-v-421e7666="">Planejar Projeto</p></div>`
);

// Card top buttons:
html = html.replaceAll(
  /<a href=\"[^\"]*\" class=\"home__expertises__card__top__button\" data-v-e1fc8da8=\"\">/g,
  `<a href="${NEW_QUIZZ_URL}" class="home__expertises__card__top__button" data-v-e1fc8da8="">`
);

// 4. In script: ensure handleQuizRedirect covers all Planejar Projeto buttons
const oldQuizRedirectHandlerRegex = /\/\/ Redirection for Planejar Projeto language buttons[\s\S]*?document\.addEventListener\('keydown', function\(e\) \{[\s\S]*?\}, true\);/;

const newQuizRedirectHandler = `// Redirection for all Planejar Projeto elements (Hero, Menu, About, Cards)
  const QUIZZ_URL = '${NEW_QUIZZ_URL}';
  function isPlanejarProjetoBtn(el) {
    if (!el) return false;
    const btn = el.closest('a, button, [role=\"link\"], [role=\"button\"]') || el;
    const txt = (btn.textContent || '').trim().toLowerCase();
    const cls = (btn.className || '') + ' ' + ((btn.parentElement && btn.parentElement.className) || '');
    return (
      cls.includes('page__button__language') ||
      cls.includes('home__about__right') ||
      cls.includes('home__expertises__card') ||
      txt === 'planejar projeto' ||
      txt.includes('planejar projeto')
    );
  }

  function handlePlanejarProjetoRedirect(e) {
    const btn = e.target.closest('.page__button__language, .home__about__right a.page__button, .home__expertises__card__middle a.page__button, .home__expertises__card__top__button, .home__expertises__card a.page__button');
    if (btn || isPlanejarProjetoBtn(e.target)) {
      // Make sure scroll divider button is not intercepted
      if (e.target.closest('.page__button__scroll, .home__scroll__divider')) return;
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
  }

  document.addEventListener('click', handlePlanejarProjetoRedirect, true);
  document.addEventListener('auxclick', handlePlanejarProjetoRedirect, true);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const btn = e.target.closest('.page__button__language, .home__about__right a.page__button, .home__expertises__card__middle a.page__button, .home__expertises__card__top__button, .home__expertises__card a.page__button');
      if (btn || isPlanejarProjetoBtn(e.target)) {
        if (e.target.closest('.page__button__scroll, .home__scroll__divider')) return;
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        window.location.href = QUIZZ_URL;
      }
    }
  }, true);`;

if (oldQuizRedirectHandlerRegex.test(html)) {
  html = html.replace(oldQuizRedirectHandlerRegex, newQuizRedirectHandler);
  console.log('Updated click redirection handler');
} else {
  console.log('oldQuizRedirectHandlerRegex not matched, looking for QUIZZ_URL definition...');
  html = html.replace(/const QUIZZ_URL = '[^']*';/, `const QUIZZ_URL = '${NEW_QUIZZ_URL}';`);
}

// 5. In applyHeroText: ensure all 4 elements are updated dynamically
// Replace the block that updates language buttons, about buttons, card buttons
const oldUpdaterPattern = /\/\/ Ensure all language buttons display Planejar Projeto and link to QUIZZ_URL[\s\S]*?document\.querySelectorAll\('\.home__scroll__divider__link'\)/;

const newUpdaterSnippet = `// Ensure all Planejar Projeto elements display correctly and point to QUIZZ_URL
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

    // Update About section button to Planejar Projeto
    document.querySelectorAll('.home__about__right a.page__button').forEach(btn => {
      btn.setAttribute('href', QUIZZ_URL);
      btn.setAttribute('aria-label', 'Planejar Projeto');
      btn.setAttribute('title', 'Planejar Projeto');
      const txt = btn.querySelector('.page__button__text p');
      if (txt && txt.textContent.trim() !== 'Planejar Projeto') {
        txt.textContent = 'Planejar Projeto';
      }
    });

    // Update Cards buttons to Planejar Projeto
    document.querySelectorAll('.home__expertises__card .page__button.arrow, .home__expertises__card__middle a.page__button').forEach(btn => {
      btn.setAttribute('href', QUIZZ_URL);
      btn.setAttribute('aria-label', 'Planejar Projeto');
      btn.setAttribute('title', 'Planejar Projeto');
      const txt = btn.querySelector('.page__button__text p');
      if (txt && txt.textContent.trim() !== 'Planejar Projeto') {
        txt.textContent = 'Planejar Projeto';
      }
    });
    document.querySelectorAll('.home__expertises__card__top__button').forEach(btn => {
      btn.setAttribute('href', QUIZZ_URL);
      btn.setAttribute('aria-label', 'Planejar Projeto');
      btn.setAttribute('title', 'Planejar Projeto');
    });

    ensureCardsDivider();
    updateAllContactLinksDOM();
    applyMenuVideos();
    updateCardVideosPlayback();
    handleCardVideoErrors();

    // Scroll divider link points to INICIAR_PROJETO_URL
    document.querySelectorAll('.home__scroll__divider__link')`;

if (oldUpdaterPattern.test(html)) {
  html = html.replace(oldUpdaterPattern, newUpdaterSnippet);
  console.log('Updated applyHeroText dynamic updater');
} else {
  console.warn('oldUpdaterPattern not matched exactly, checking alternative...');
}

// 6. Double check any remaining references to quizz-page-fist
const remaining = (html.match(/quizz-page-fist/g) || []).length;
console.log('Remaining quizz-page-fist in index.html:', remaining);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html saved successfully');
