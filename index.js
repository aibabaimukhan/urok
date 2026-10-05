// beep
function beep(ok){try{const a=new(window.AudioContext||webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.frequency.value=ok?740:200;o.type=ok?'sine':'sawtooth';g.gain.value=.1;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.2)}catch(e){}}
// quiz
const Q=[
{c:'p{color:red}',q:'Бұл код не істейді?',o:['Мәтіннің түсін қызыл етеді','Фонды қызыл етеді','Жиекті қызыл етеді'],a:0},
{c:'div{background:blue}',q:'Бұл код не істейді?',o:['Мәтінді көк етеді','Фон түсін көк етеді','Қаріпті үлкейтеді'],a:1},
{c:'h1{font-size:40px}',q:'font-size нені өзгертеді?',o:['Қаріптің түсін','Қаріптің қалыңдығын','Қаріптің өлшемін'],a:2},
{c:'.box{padding:20px}',q:'padding — бұл...',o:['Элемент ішіндегі бос орын','Элементтен тыс бос орын','Жиек түсі'],a:0},
{c:'.box{margin:20px}',q:'margin — бұл...',o:['Элемент ішіндегі бос орын','Элементтен тыс бос орын','Қаріп өлшемі'],a:1},
{c:'.box{display:none}',q:'Элементке не болады?',o:['Көрінеді','Үлкейеді','Жасырылады'],a:2},
{c:'.row{display:flex}',q:'display:flex элементтерді қалай орналастырады?',o:['Бір қатарға','Жасырады','Айналдырады'],a:0},
{c:'.row{display:flex; flex-direction:column}',q:'Элементтер қалай тұрады?',o:['Көлденең','Тік бағанда','Көрінбейді'],a:1},
{c:'.row{display:flex; justify-content:center}',q:'justify-content:center не істейді?',o:['Төмен түсіреді','Оңға ығыстырады','Көлденең ортаға қояды'],a:2},
{c:'.box{width:100px; height:100px; border-radius:50%}',q:'Нәтиже қандай фигура?',o:['Шеңбер','Шаршы','Үшбұрыш'],a:0}];
let pts=0,done={};
$('#qs').innerHTML=Q.map((_,i)=>`<button data-i="${i}">${i+1}</button>`).join('');
$$('#qs button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i,q=Q[i];
$('#qbox').innerHTML=`<pre>${q.c}</pre><b>${q.q}</b>`+q.o.map((n,k)=>`<button class="opt" data-k="${k}">${typeof n=='number'?n+' баған<div class="mini">'+'<i></i>'.repeat(n)+'</div>':n}</button>`).join('');
$$('.opt').forEach(o=>o.onclick=()=>{if(done[i]!==undefined)return;const ok=+o.dataset.k===q.a;done[i]=ok;o.classList.add(ok?'ok':'no');if(!ok)$$('.opt')[q.a].classList.add('ok');
if(ok){pts+=10;$('#pts').textContent=pts}beep(ok);o.insertAdjacentHTML('beforeend',`<b>${ok?' ✅ Дұрыс! +10':' ❌ Бұрыс'}</b>`);b.classList.add('d')})});
const base=location.origin+location.pathname.replace(/[^/]*$/,''),U={m:base+'lecture.pdf',t:base+'tasks.html',r:base+'reflect.html'};
const QI={m:'qr-lecture.png',t:'qr-task.png',r:'qr-reflect.png'};
function putQR(el,k,z){const im=new Image();im.onload=()=>{el.innerHTML='';im.style.cssText=`width:${z}px;height:${z}px;object-fit:contain;display:block`;el.appendChild(im)};im.onerror=()=>{el.innerHTML='';try{new QRCode(el,{text:U[k],width:z,height:z})}catch(x){el.textContent='QR жүктелмеді'}};im.src=QI[k]}
for(const k in U){const e=$('#qr'+k);putQR(e,k,240);const l=$('#lk'+k);l.href=U[k];l.textContent=U[k]}
// live results
const E1=['😍','🙂','😕'],E2=['🔄','🔍','➡️','📐'],CL=['#6c5ce7','#00b8d9','#f59e0b','#ec4899'];
const chart=(id,L,A,E)=>{const m=Math.max(1,...A);$(id).innerHTML=L.map((l,i)=>`<div class="bar"><b>${A[i]}</b><div style="height:${A[i]/m*140}px;background:${CL[i]}"></div>${E[i]} ${l}</div>`).join('')};
chart('#ch1',L1,[0,0,0],E1);chart('#ch2',L2,[0,0,0,0],E2);
async function live(){if(noApi()){$('#sol').innerHTML='<tr><td>Apps Script URL көрсетілмеген (файлдағы API айнымалысы)</td></tr>';return}
try{const d=await(await fetch(API+'?t='+Date.now())).json(),S2=d.solutions||[],R=d.reflection||[];
$('#sol').innerHTML='<tr><th>Уақыты</th><th>ФИО</th><th>Нұсқа</th><th>Шешім</th></tr>'+S2.slice(-30).reverse().map(r=>`<tr><td>${new Date(r[0]).toLocaleTimeString()}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td><code>${esc(String(r[3]).slice(0,90))}</code></td></tr>`).join('');
chart('#ch1',L1,L1.map(l=>R.filter(r=>r[1]===l).length),E1);chart('#ch2',L2,L2.map(l=>R.filter(r=>r[2]===l).length),E2);$('#tot').textContent=R.length}catch(e){}}
setInterval(live,5000);live();

const QT={m:'📄 Лекцияны оқу үшін сканерлеңіз',t:'📝 Тапсырмаға өту үшін сканерлеңіз',r:'🌟 Рефлексияға өту үшін сканерлеңіз'};
function bigQR(k){const o=document.createElement('div');o.className='qo';const z=Math.floor(Math.min(innerWidth,innerHeight)*.62);o.innerHTML=`<h1>${QT[k]}</h1><div class="qq"></div><a>${U[k]}</a><button class="btn">✕ Жабу (Esc)</button>`;document.body.appendChild(o);putQR(o.querySelector('.qq'),k,z);o.onclick=()=>o.remove()}
$$('[data-q]').forEach(b=>b.onclick=()=>bigQR(b.dataset.q));
['m','t','r'].forEach(k=>$('#qr'+k).onclick=()=>bigQR(k));
addEventListener('keydown',e=>{if(e.key==='Escape')$$('.qo').forEach(o=>o.remove())});
