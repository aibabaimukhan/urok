
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$('#nav button').forEach(b=>b.onclick=()=>{$$('#nav button,section').forEach(e=>e.classList.remove('on'));b.classList.add('on');$('#'+b.dataset.t).classList.add('on');scrollTo({top:0,behavior:'smooth'})});

const L1=['Өте жақсы','Орташа','Түсінбедім'],L2=['rotate','scale','translate','skew'];
const API='https://script.google.com/macros/s/AKfycbzlZ9tb1TbZwFlbRy4bTHiO2ro8ouNKovnvOskZy8lYYPKVrdeNYP6R1qXKa9JdUGbS7A/exec';
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const post=(type,row)=>fetch(API,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain'},body:JSON.stringify({type,row})});
const noApi=()=>API.startsWith('PASTE');
