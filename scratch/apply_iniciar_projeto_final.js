const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// 1. Update js/D3FPSiq_.js
const d3File = path.join(ROOT, 'js', 'D3FPSiq_.js');
if (fs.existsSync(d3File)) {
  let d3Content = fs.readFileSync(d3File, 'utf8');
  if (d3Content.includes('const o=r,s=F(()=>ee(o.text))')) {
    d3Content = d3Content.replace(
      'const o=r,s=F(()=>ee(o.text))',
      'const o=r,s=F(()=>\'<span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span>\')'
    );
    fs.writeFileSync(d3File, d3Content, 'utf8');
    console.log('✅ js/D3FPSiq_.js updated successfully.');
  } else {
    console.log('ℹ️ js/D3FPSiq_.js already updated or pattern not found.');
  }
}

// 2. Update js/DY2EvO8O.js
const dyFile = path.join(ROOT, 'js', 'DY2EvO8O.js');
if (fs.existsSync(dyFile)) {
  let dyContent = fs.readFileSync(dyFile, 'utf8');
  if (dyContent.includes('"scroll-button-label":"Explore"')) {
    dyContent = dyContent.replace(
      '"scroll-button-label":"Explore"',
      '"scroll-button-label":"Iniciar Projeto"'
    );
    fs.writeFileSync(dyFile, dyContent, 'utf8');
    console.log('✅ js/DY2EvO8O.js updated successfully.');
  } else {
    console.log('ℹ️ js/DY2EvO8O.js already updated or pattern not found.');
  }
}

// 3. Update index.html
const indexFile = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexFile, 'utf8');

const INICIAR_PROJETO_URL = 'https://sitetestetattoo-com.vercel.app';
const TARGET_REDIRECT_URL = 'https://quizz-page-fist.vercel.app/';

const DUAL_P_MARKUP = `<p data-v-d4ca9408=""><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p><p data-v-d4ca9408="" aria-hidden="true"><span class="btn-line">INICIAR</span><span class="btn-line">PROJETO</span></p>`;

// Update static hero button
html = html.replace(
  /<div class="page__button__scroll__text" data-v-d4ca9408="">[\s\S]*?<\/div><\/div><\/a><\/div><div class="page__hero__bottom__right"/,
  `<div class="page__button__scroll__text" data-v-d4ca9408="">${DUAL_P_MARKUP}</div></div></a></div><div class="page__hero__bottom__right"`
);

// Update divider button in HTML
html = html.replace(
  /<div class="home__scroll__divider"[\s\S]*?<div class="page__button__scroll__text" data-v-d4ca9408="">[\s\S]*?<\/div>\s*<\/div>\s*<\/a>\s*<\/div>\s*<div class="home__contact"/,
  `<div class="home__scroll__divider" style="display: flex; justify-content: center; align-items: center; padding: 70px 0 30px 0; width: 100%; position: relative; z-index: 5;">
  <a href="${INICIAR_PROJETO_URL}" class="home__scroll__divider__link" style="text-decoration: none; display: flex; justify-content: center; align-items: center; cursor: pointer;"><div class="page__button__scroll home__to__contact__scroll" data-v-d4ca9408="" style="cursor: pointer;" role="link" aria-label="Iniciar Projeto" title="Iniciar Projeto" tabindex="0">
    <div class="page__button__scroll__circles" data-v-d4ca9408="">
      <div class="page__button__scroll__circle" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
      <div class="page__button__scroll__circle clone" data-v-d4ca9408=""></div>
    </div>
    <div class="page__button__scroll__text" data-v-d4ca9408="">
      ${DUAL_P_MARKUP}
    </div>
  </div>
</a>
</div>
<div class="home__contact"`
);

// Update ensureCardsDivider
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
            ${DUAL_P_MARKUP}
          </div>
        </div>
      </a>\`;`
);

// Update accessibility labels on scroll buttons in applyHeroText
html = html.replace(
  /btn\.setAttribute\('aria-label',\s*'Explore'\);\s*btn\.setAttribute\('title',\s*'Explore'\);/g,
  `btn.setAttribute('aria-label', 'Iniciar Projeto');\n      btn.setAttribute('title', 'Iniciar Projeto');`
);

// Update scrollTexts check in applyHeroText
const oldScrollRegex = /const scrollTexts = document\.querySelectorAll\('\.page__button__scroll__text'\);[\s\S]*?st\.innerHTML = '<p data-v-d4ca9408="">[\s\S]*?<\/p>';\s*\}\s*\}\);/;
const newScrollCode = `const scrollTexts = document.querySelectorAll('.page__button__scroll__text');
    scrollTexts.forEach(st => {
      const txt = (st.textContent || '').trim().replace(/\\s+/g, ' ');
      const pElements = st.querySelectorAll('p');
      if (!txt.includes('INICIAR') || !txt.includes('PROJETO') || st.innerHTML.includes('<span>E</span>') || txt.includes('Explore') || txt.includes('EXPLORE') || pElements.length < 2) {
        st.innerHTML = \`${DUAL_P_MARKUP}\`;
      }
    });`;

if (oldScrollRegex.test(html)) {
  html = html.replace(oldScrollRegex, newScrollCode);
  console.log('✅ applyHeroText scroll logic updated.');
} else {
  console.warn('⚠️ oldScrollRegex not matched directly.');
}

// Update the CSS inside <style id="custom-explore-scroll-styles">
const newCSS = `<style id="custom-explore-scroll-styles">
.home__scroll__divider {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  padding: 80px 0 40px 0 !important;
  width: 100% !important;
  position: relative !important;
  z-index: 10 !important;
}

.page__button__scroll {
  align-items: center !important;
  display: flex !important;
  justify-content: center !important;
  aspect-ratio: 1 / 1 !important;
  position: relative !important;
  width: clamp(76px, 67.3333333333px + 0.0222222222 * 100vw, 110px) !important;
  height: clamp(76px, 67.3333333333px + 0.0222222222 * 100vw, 110px) !important;
  cursor: pointer !important;
  user-select: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  z-index: 10 !important;
  pointer-events: auto !important;
}

.page__button__scroll .page__button__scroll__circles {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  pointer-events: none !important;
}

.page__button__scroll .page__button__scroll__circle {
  height: 100% !important;
  left: 0 !important;
  position: absolute !important;
  top: 0 !important;
  width: 100% !important;
}

.page__button__scroll .page__button__scroll__circle:before {
  background-color: #b9ff47 !important;
  border-radius: 50% !important;
  content: "" !important;
  height: 100% !important;
  overflow: hidden !important;
  position: absolute !important;
  transition: background-color 0.4s !important;
  width: 100% !important;
  box-shadow: none !important;
}

@keyframes blink-d4ca9408 {
  0% {
    opacity: 0.5;
    transform: translateY(0);
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 0;
    transform: translateY(calc(clamp(9px, 7.9803921569px + 0.0026143791 * 100vw, 13px) * -3));
  }
}

.page__button__scroll .page__button__scroll__circle.clone {
  pointer-events: none !important;
  transition: opacity 1.5s !important;
}

.page__button__scroll .page__button__scroll__circle.clone:nth-child(2):before {
  animation: blink-d4ca9408 1.5s linear infinite !important;
}

.page__button__scroll .page__button__scroll__circle.clone:nth-child(3):before {
  animation: blink-d4ca9408 1.5s linear 0.5s infinite !important;
}

.page__button__scroll .page__button__scroll__circle.clone:nth-child(4):before {
  animation: blink-d4ca9408 1.5s linear 1s infinite !important;
}

@media (min-width: 769px) {
  html.device-mouse .page__button__scroll:hover .clone {
    opacity: 0 !important;
    transition: opacity 1s !important;
  }
}

.page__button__scroll .page__button__scroll__text {
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
}
</style>`;

html = html.replace(/<style id="custom-explore-scroll-styles">[\s\S]*?<\/style>/, newCSS);

fs.writeFileSync(indexFile, html, 'utf8');
console.log('✅ index.html updated successfully with complete INICIAR PROJETO design & animation.');
