// tasks (student): only 2D transforms
const T={
'1':['1-нұсқа','Бұру + қисайту','Блокты <b>30°</b> бұрыңыз және X осі бойынша <b>20°</b> қисайтыңыз.','Мәндер: rotate(30deg), skewX(20deg)','rotate(30deg) skewX(20deg)'],
'2':['2-нұсқа','Бұру + үлкейту','Блокты қарсы бағытта <b>45°</b> бұрыңыз және <b>1.5 есе</b> үлкейтіңіз.','Мәндер: rotate(-45deg), scale(1.5)','rotate(-45deg) scale(1.5)'],
'3':['3-нұсқа','Қисайту + жылжыту','Блокты X осі бойынша <b>15°</b>, Y осі бойынша <b>10°</b> қисайтыңыз және оңға <b>40px</b>, төмен <b>20px</b> жылжытыңыз.','Мәндер: skew(15deg, 10deg), translate(40px, 20px)','skew(15deg,10deg) translate(40px,20px)'],
'4':['4-нұсқа','Бұру + айналы бейне','Блокты <b>90°</b> бұрыңыз және көлденең айналы бейнесін жасаңыз (scaleX(-1)).','Мәндер: rotate(90deg), scaleX(-1)','rotate(90deg) scaleX(-1)'],
'5':['5-нұсқа','Бұру + қисайту + кішірейту','Блокты <b>15°</b> бұрыңыз, Y осі бойынша <b>25°</b> қисайтыңыз және <b>0.7</b> есе кішірейтіңіз.','Мәндер: rotate(15deg), skewY(25deg), scale(0.7)','rotate(15deg) skewY(25deg) scale(.7)']};
let pick=null;try{pick=localStorage.getItem('var')}catch(e){}
function showT(){$('#tc').innerHTML=Object.keys(T).map(k=>`<div class="c cardc ${pick&&pick!==k?'lock':''} ${pick===k?'sel':''}" data-k="${k}"><h3>${T[k][0]}</h3><p>${T[k][1]}</p></div>`).join('');
$('#tf').style.display=pick?'block':'none';
if(pick){const t=T[pick];$('#tt').innerHTML=`<h3>${t[0]}</h3><p>Бастапқы блок: <code class="i">.box{width:100px; height:100px}</code></p><p>${t[2]}</p><p>Нәтиже осылай болуы керек:</p><div class="dmw"><div class="dm" style="transform:${t[4]}">box</div></div>`}
$$('.cardc').forEach(c=>c.onclick=()=>{if(pick)return;pick=c.dataset.k;try{localStorage.setItem('var',pick)}catch(e){}showT()})}
showT();
$('#ss').onclick=()=>{const n=$('#fio').value.trim(),c=$('#sol_t').value.trim();if(!n||!c){$('#sm').textContent='ФИО мен шешімді толтырыңыз';return}if(noApi()){$('#sm').textContent='Apps Script URL көрсетілмеген';return}post('Решения',[n,T[pick][0],c]).then(()=>{$('#sm').textContent='Жіберілді ✅';$('#sol_t').value=''})};
