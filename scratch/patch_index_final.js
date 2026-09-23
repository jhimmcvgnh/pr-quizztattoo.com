const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'index.html');
let content = fs.readFileSync(file, 'utf8');

// 1. Ensure INICIAR_PROJETO_URL is declared
if (!content.includes('const INICIAR_PROJETO_URL =')) {
  content = content.replace(
    "const TARGET_REDIRECT_URL = 'https://sitetestetattoo-com.vercel.app';",
    "const TARGET_REDIRECT_URL = 'https://sitetestetattoo-com.vercel.app';\n  const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';"
  );
}

// 2. Remove card buttons from handleScrollButtonRedirect so it only intercepts scroll buttons
content = content.replaceAll(
  "const btn = e.target.closest('.page__button__scroll, .home__to__contact__scroll, .home__scroll__divider__link, .home__expertises__card__top__button, .home__expertises__card__middle a.page__button');",
  "const btn = e.target.closest('.page__button__scroll, .home__to__contact__scroll, .home__scroll__divider__link');"
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully patched index.html');
