const fs = require('fs');

const TARGET_URL = 'https://quizz-page-fist.vercel.app/';

// 1. Patch js/DY2EvO8O.js
let dy = fs.readFileSync('js/DY2EvO8O.js', 'utf8');

// Patch card button text & to link
// Original: i(f,{to:`${o(v)("/expertise")}/${p.expertise.uid}`,type:"arrow",text:"Explore"},null,8,["to"])
const oldCardBtn = 'i(f,{to:`${o(v)("/expertise")}/${p.expertise.uid}`,type:"arrow",text:"Explore"},null,8,["to"])';
const newCardBtn = `i(f,{to:"${TARGET_URL}",type:"arrow",text:"Planejar Projeto"},null,8,["to"])`;

if (dy.includes(oldCardBtn)) {
  dy = dy.replace(oldCardBtn, newCardBtn);
  console.log('DY2EvO8O.js: card button patched');
} else {
  console.warn('DY2EvO8O.js: exact oldCardBtn not found, using regex');
  dy = dy.replace(/i\(f,\{to:`\$\{o\(v\)\("\/expertise"\)\}\/\$\{p\.expertise\.uid\}`,\s*type:"arrow",\s*text:"Explore"\},null,8,\["to"\]\)/g, newCardBtn);
}

// Patch card top button to link
// Original: i(y,{to:`${o(v)("/expertise")}/${p.expertise.uid}`,class:"home__expertises__card__top__button"}
const oldTopBtn = 'i(y,{to:`${o(v)("/expertise")}/${p.expertise.uid}`,class:"home__expertises__card__top__button"}';
const newTopBtn = `i(y,{to:"${TARGET_URL}",class:"home__expertises__card__top__button"}`;
if (dy.includes(oldTopBtn)) {
  dy = dy.replace(oldTopBtn, newTopBtn);
  console.log('DY2EvO8O.js: card top button patched');
} else {
  dy = dy.replace(/i\(y,\{to:`\$\{o\(v\)\("\/expertise"\)\}\/\$\{p\.expertise\.uid\}`,\s*class:"home__expertises__card__top__button"\}/g, newTopBtn);
}

// Patch about section button
// Original: i(m,{to:o(g)("/about"),type:"arrow",text:(j=o(_))==null?void 0:j.data.about_us_button_label},null,8,["to","text"])
const oldAboutBtn = 'i(m,{to:o(g)("/about"),type:"arrow",text:(j=o(_))==null?void 0:j.data.about_us_button_label},null,8,["to","text"])';
const newAboutBtn = `i(m,{to:"${TARGET_URL}",type:"arrow",text:"Planejar Projeto"},null,8,["to"])`;
if (dy.includes(oldAboutBtn)) {
  dy = dy.replace(oldAboutBtn, newAboutBtn);
  console.log('DY2EvO8O.js: about button patched');
} else {
  dy = dy.replace(/i\(m,\{to:o\(g\)\("\/about"\),\s*type:"arrow",\s*text:[^}]*\},null,8,\["to"(?:,"text")?\]\)/g, newAboutBtn);
}

fs.writeFileSync('js/DY2EvO8O.js', dy, 'utf8');

// 2. Patch js/ChpCeyZw.js (PageButtonLanguage)
let chp = fs.readFileSync('js/ChpCeyZw.js', 'utf8');

// Original:
// k=b(()=>_.type==="menu"?s("English"):s("En")),y=b(()=>_.type==="menu"?s("Português"):s("Pt")),i=()=>{e?(a.value.classList.remove("open"),e=!1):(a.value.classList.add("open"),e=!0)}
const oldChpPattern = 'k=b(()=>_.type==="menu"?s("English"):s("En")),y=b(()=>_.type==="menu"?s("Português"):s("Pt")),i=()=>{e?(a.value.classList.remove("open"),e=!1):(a.value.classList.add("open"),e=!0)}';
const newChpPattern = `k=b(()=>"Planejar Projeto"),y=b(()=>"Planejar Projeto"),i=()=>{window.location.href="${TARGET_URL}"}`;

if (chp.includes(oldChpPattern)) {
  chp = chp.replace(oldChpPattern, newChpPattern);
  console.log('ChpCeyZw.js: language labels and click handler patched');
} else {
  console.warn('ChpCeyZw.js: old pattern not found, trying regex');
  chp = chp.replace(/k=b\(\(\)=>_\.type==="menu"\?s\("English"\):s\("En"\)\),\s*y=b\(\(\)=>_\.type==="menu"\?s\("Português"\):s\("Pt"\)\),\s*i=\(\)=>\{[^}]*\}/, newChpPattern);
}

fs.writeFileSync('js/ChpCeyZw.js', chp, 'utf8');
console.log('All JS patches applied!');
