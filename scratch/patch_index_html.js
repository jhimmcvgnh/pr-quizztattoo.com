const fs = require('fs');
const path = require('path');

const indexFile = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';
const TARGET_REDIRECT_URL = 'https://quizz-page-fist.vercel.app/';

const DUAL_P = `<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p><p data-v-d4ca9408="" aria-hidden="true"><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>`;

// 1. Update ensureCardsDivider innerHTML in script
console.log('1. Updating ensureCardsDivider...');
const oldEnsureDivider = `          <div class="page__button__scroll__text" data-v-d4ca9408="">
            <p data-v-d4ca9408="">
              <span class="btn-line">INICIAR</span>
              <span class="btn-line">PROJETO</span>
            </p>
          </div>`;
const newEnsureDivider = `          <div class="page__button__scroll__text" data-v-d4ca9408="">
            ${DUAL_P}
          </div>`;

if (html.includes(oldEnsureDivider)) {
  html = html.replace(oldEnsureDivider, newEnsureDivider);
  console.log('✅ ensureCardsDivider updated.');
} else {
  console.warn('⚠️ oldEnsureDivider not found directly.');
}

// 2. Update applyHeroText redirect links and scroll button logic
console.log('2. Updating applyHeroText...');
const oldHeroLogic = `    // Atualiza links de redirecionamento para o novo link
    document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button, .home__scroll__divider__link').forEach(btn => {
      btn.setAttribute('href', TARGET_REDIRECT_URL);
    });

    // Ensure all INICIAR PROJETO buttons have link accessibility attributes
    document.querySelectorAll('.page__button__scroll').forEach(btn => {
      btn.setAttribute('role', 'link');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-label', 'Iniciar Projeto');
      btn.setAttribute('title', 'Iniciar Projeto');
      btn.style.cursor = 'pointer';
    });

    const heroScrollText = document.querySelector('.page__hero__bottom__middle .page__button__scroll__text');
    if (heroScrollText && (!heroScrollText.textContent.includes('INICIAR') || heroScrollText.textContent.includes('E\\nx'))) {
      heroScrollText.innerHTML = '<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>';
    }`;

const newHeroLogic = `    // Atualiza links de redirecionamento para o novo link
    document.querySelectorAll('.home__expertises__card__top__button, .home__expertises__card__middle a.page__button').forEach(btn => {
      btn.setAttribute('href', TARGET_REDIRECT_URL);
    });
    document.querySelectorAll('.home__scroll__divider__link').forEach(btn => {
      btn.setAttribute('href', INICIAR_PROJETO_URL);
    });

    // Ensure all INICIAR PROJETO buttons have link accessibility attributes
    document.querySelectorAll('.page__button__scroll').forEach(btn => {
      btn.setAttribute('role', 'link');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-label', 'Iniciar Projeto');
      btn.setAttribute('title', 'Iniciar Projeto');
      btn.style.cursor = 'pointer';
    });

    const dualPContent = \`${DUAL_P}\`;
    document.querySelectorAll('.page__button__scroll__text').forEach(st => {
      const txt = (st.textContent || '').trim().replace(/\\s+/g, ' ');
      const pElements = st.querySelectorAll('p');
      if (!txt.includes('INICIAR') || !txt.includes('PROJETO') || st.innerHTML.includes('<span>E</span>') || txt.includes('Explore') || txt.includes('EXPLORE') || pElements.length < 2) {
        st.innerHTML = dualPContent;
      }
    });`;

if (html.includes(oldHeroLogic)) {
  html = html.replace(oldHeroLogic, newHeroLogic);
  console.log('✅ applyHeroText updated.');
} else {
  console.warn('⚠️ oldHeroLogic not found directly.');
}

// 3. Update CSS rules for .page__button__scroll__text
console.log('3. Updating CSS...');
const oldCSSBlock = `.page__button__scroll .page__button__scroll__text {
  position: relative !important;
  z-index: 5 !important;
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
  overflow: visible !important;
  padding: 4px !important;
  box-sizing: border-box !important;
}

.page__button__scroll .page__button__scroll__text p {
  color: #2b3014 !important;
  font-family: ibm-plex-mono, monospace, sans-serif !important;
  font-weight: 700 !important;
  font-style: italic !important;
  letter-spacing: 0.04em !important;
  line-height: 1.15 !important;
  margin: 0 !important;
  padding: 0 !important;
  text-transform: uppercase !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 2px !important;
  width: 100% !important;
}

.page__button__scroll .page__button__scroll__text p:nth-child(2) {
  display: none !important;
}

.page__button__scroll .page__button__scroll__text .btn-line,
.page__button__scroll .page__button__scroll__text span {
  display: block !important;
  font-family: ibm-plex-mono, monospace, sans-serif !important;
  font-size: clamp(11px, 9.5px + 0.002 * 100vw, 12.5px) !important;
  font-weight: 700 !important;
  font-style: italic !important;
  letter-spacing: 0.04em !important;
  line-height: 1.15 !important;
  text-transform: uppercase !important;
  color: #2b3014 !important;
  white-space: nowrap !important;
  text-align: center !important;
}`;

const newCSSBlock = `.page__button__scroll .page__button__scroll__text {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 5 !important;
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  pointer-events: none !important;
  overflow: hidden !important;
  border-radius: 50% !important;
  box-sizing: border-box !important;
  padding: 6px !important;
}

.page__button__scroll .page__button__scroll__text p {
  color: #2b3014 !important;
  font-family: ibm-plex-mono, monospace, sans-serif !important;
  font-weight: 700 !important;
  font-style: italic !important;
  letter-spacing: 0.03em !important;
  line-height: 1.15 !important;
  margin: 0 !important;
  padding: 0 !important;
  text-transform: uppercase !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 2px !important;
  width: 100% !important;
  height: 100% !important;
  box-sizing: border-box !important;
  transition: transform 0.4s cubic-bezier(.215,.61,.355,1) !important;
  will-change: transform !important;
}

.page__button__scroll .page__button__scroll__text p:nth-child(2) {
  position: absolute !important;
  top: 100% !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
}

html.device-mouse .page__button__scroll:hover .page__button__scroll__text p,
.page__button__scroll:hover .page__button__scroll__text p {
  transform: translateY(-100%) !important;
}

.page__button__scroll .page__button__scroll__text p span {
  transform: none !important;
  transition: none !important;
}

.page__button__scroll .page__button__scroll__text .btn-line,
.page__button__scroll .page__button__scroll__text span {
  display: block !important;
  font-family: ibm-plex-mono, monospace, sans-serif !important;
  font-size: clamp(9.5px, 8.5px + 0.0025 * 100vw, 11.5px) !important;
  font-weight: 700 !important;
  font-style: italic !important;
  letter-spacing: 0.03em !important;
  line-height: 1.15 !important;
  text-transform: uppercase !important;
  color: #2b3014 !important;
  white-space: nowrap !important;
  text-align: center !important;
  pointer-events: none !important;
}`;

if (html.includes(oldCSSBlock)) {
  html = html.replace(oldCSSBlock, newCSSBlock);
  console.log('✅ CSS updated.');
} else {
  console.warn('⚠️ oldCSSBlock not found directly.');
}

// 4. Update hero scroll button in body
console.log('4. Updating static HTML buttons in body...');
const oldHeroHtml = `<div class="page__hero__bottom__middle" data-v-f61586af=""><div class="page__button__scroll" data-v-f61586af="" data-v-d4ca9408=""><div class="page__button__scroll__circles" data-v-d4ca9408=""><div class="page__button__scroll__circle" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div></div><div class="page__button__scroll__text" data-v-d4ca9408=""><p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p></div></div></div>`;

const newHeroHtml = `<div class="page__hero__bottom__middle" data-v-f61586af=""><a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link home__hero__scroll__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;"><div class="page__button__scroll" data-v-f61586af="" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0"><div class="page__button__scroll__circles" data-v-d4ca9408=""><div class="page__button__scroll__circle" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div><div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div></div><div class="page__button__scroll__text" data-v-d4ca9408="">${DUAL_P}</div></div></a></div>`;

if (html.includes(oldHeroHtml)) {
  html = html.replace(oldHeroHtml, newHeroHtml);
  console.log('✅ Hero static button updated.');
} else {
  console.warn('⚠️ oldHeroHtml not found directly.');
}

// 5. Update divider scroll button in body
const oldDividerHtml = `<div class="home__scroll__divider" style="display: flex; justify-content: center; align-items: center; padding: 70px 0 30px 0; width: 100%; position: relative; z-index: 5;">
  <a href="https://sitetestetattoo-com.vercel.app" class="home__scroll__divider__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;"><div class="page__button__scroll home__to__contact__scroll" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0">
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
</div>`;

const newDividerHtml = `<div class="home__scroll__divider" style="display: flex; justify-content: center; align-items: center; padding: 70px 0 30px 0; width: 100%; position: relative; z-index: 5;">
  <a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;"><div class="page__button__scroll home__to__contact__scroll" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0">
    <div class="page__button__scroll__circles" data-v-d4ca9408="">
      <div class="page__button__scroll__circle" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
    </div>
    <div class="page__button__scroll__text" data-v-d4ca9408="">
      ${DUAL_P}
    </div>
  </div>
</a>
</div>`;

if (html.includes(oldDividerHtml)) {
  html = html.replace(oldDividerHtml, newDividerHtml);
  console.log('✅ Divider static button updated.');
} else {
  console.warn('⚠️ oldDividerHtml not found directly.');
}

fs.writeFileSync(indexFile, html, 'utf8');
console.log('🎉 index.html patch completed!');
