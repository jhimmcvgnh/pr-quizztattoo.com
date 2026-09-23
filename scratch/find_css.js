const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

function findCss(selector) {
  const regex = new RegExp(selector.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + '\\s*\\{[^\\}]*\\}', 'g');
  console.log(`=== CSS FOR ${selector} ===`);
  let m;
  while ((m = regex.exec(html)) !== null) {
    console.log(m[0]);
  }
}

findCss('.page__button');
findCss('.page__button__text');
findCss('.page__button__language');
findCss('.page__button__language__button');
findCss('.page__button__language__button__text');
