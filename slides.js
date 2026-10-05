// slides
const S=[
['transform','Элементті жылжытады, бұрады, масштабтайды және қисайтады. Бастапқы мәні — none (өзгеріс жоқ).','transform: none;','none'],
['translate(x, y)','translateX(n), translateY(n) — X/Y осі бойынша жылжыту. Оң X — оңға, оң Y — төмен. Жылжу басқа элементтердің орнын өзгертпейді.','transform: translate(40px, 20px);','translate(40px,20px)'],
['scale(x, y)','1-ден кіші мән — кішірейту, үлкен мән — үлкейту. Теріс мән айналы бейне береді: scaleX(-1). scaleX(), scaleY() жеке қолданылады.','transform: scale(1.5, 0.8);','scale(1.5,.8)'],
['rotate(бұрыш)','Бірліктер: deg, rad, grad. Оң мән — сағат тілімен, теріс — қарсы. rotate(720deg) — екі толық айналым.','transform: rotate(45deg);','rotate(45deg)'],
['skew(x, y)','Элементті қисайту: skewX(), skewY(). Бұрыштар градуспен беріледі.','transform: skew(20deg, 10deg);','skew(20deg,10deg)'],
['matrix(a, b, c, d, x, y)','Барлық 2D түрлендіруді біріктіреді: a — scaleX, d — scaleY, b — skewY, c — skewX, x,y — жылжыту. Бірліксіз сандар.','transform: matrix(1, 0.3, -0.3, 1, 20, 0);','matrix(1,.3,-.3,1,20,0)'],
['transform-origin','Түрлендіру орталығы. Әдепкі — center (50% 50%). Мәндер: left top, right bottom, 20px 30px. Rotate нәтижесі соған байланысты.','transform-origin: left top;\ntransform: rotate(30deg);','rotate(30deg)','left top'],
['Бірнеше функция','Бос орынмен жазылады және оңнан солға қолданылады — реті маңызды!','transform: translate(40px,0) rotate(45deg) scale(1.2);','translate(40px,0) rotate(45deg) scale(1.2)'],
['3D: perspective','Тереңдік сезімін береді. Мән кішірейген сайын 3D күштірек. Ата-анаға perspective: 600px немесе transform ішіне perspective(400px).','transform: perspective(400px) rotateX(50deg);','perspective(400px) rotateX(50deg)'],
['3D: rotateX / Y / Z','rotateX — көлденең ось, rotateY — тік ось, rotateZ — 2D rotate-пен бірдей. translateZ(n) — көрерменге жақындату.','transform: perspective(400px) rotateY(50deg);','perspective(400px) rotateY(50deg)'],
['3D: preserve-3d','transform-style: preserve-3d — ішкі элементтер 3D кеңістікте қалады (куб жасау үшін). backface-visibility: hidden — артқы жағын жасырады.','transform-style: preserve-3d;\nbackface-visibility: hidden;','perspective(400px) rotateX(-25deg) rotateY(35deg) translateZ(20px)']];
let si=0;function sl(){const s=S[si];$('#sl').innerHTML=`<h3>${s[0]}</h3><p>${s[1]}</p><pre>${s[2]}</pre><div class="dmw"><div class="dm" style="transform:${s[3]};transform-origin:${s[4]||'center'}">CSS</div></div>`;$('#cnt').textContent=(si+1)+' / '+S.length}
$('#pv').onclick=()=>{si=(si+S.length-1)%S.length;sl()};$('#nx').onclick=()=>{si=(si+1)%S.length;sl()};sl();
// sandbox
const P=[['rotate','Rotate','deg',0,-360,360],['sx','Scale X','',1,-2,3,.1],['sy','Scale Y','',1,-2,3,.1],['tx','Translate X','px',0,-80,80],['ty','Translate Y','px',0,-80,80],['kx','Skew X','deg',0,-60,60],['ky','Skew Y','deg',0,-60,60]];
const v={};$('#ctl').innerHTML=P.map(p=>{v[p[0]]=p[3];return`<label>${p[1]}<b id="v_${p[0]}">${p[3]}${p[2]}</b></label><input type="range" id="${p[0]}" min="${p[4]}" max="${p[5]}" step="${p[6]||1}" value="${p[3]}">`}).join('')+`<label>Transform-origin</label><select id="org">${['center','left top','right top','left bottom','right bottom'].map(x=>`<option>${x}</option>`).join('')}</select>`;
function up(){const b=$('#box'),o=$('#org').value;const t=`translate(${v.tx}px, ${v.ty}px) rotate(${v.rotate}deg) scale(${v.sx}, ${v.sy}) skew(${v.kx}deg, ${v.ky}deg)`;b.style.transform=t;b.style.transformOrigin=o;$('#code').textContent=`.box {\n  transform: ${t};\n  transform-origin: ${o};\n}`}
P.forEach(p=>$('#'+p[0]).oninput=e=>{v[p[0]]=+e.target.value;$('#v_'+p[0]).textContent=e.target.value+p[2];up()});$('#org').onchange=up;up();
$('#cp').onclick=()=>{navigator.clipboard?.writeText($('#code').textContent).catch(()=>{});$('#cp').textContent='✔ Көшірілді!';setTimeout(()=>$('#cp').textContent='📋 Кодты көшіру',1500)};

