let s1=null,s2=null;
const M1=['😍','🙂','😕'],M2=['🔄','🔍','➡️','📐'],X=['rotate(360deg)','scale(1.6)','translateX(30px)','skew(-25deg)'];
$('#r1').innerHTML=L1.map((l,i)=>`<button class="mood" data-i="${i}"><span>${M1[i]}</span>${l}</button>`).join('');
$('#r2').innerHTML=L2.map((l,i)=>`<button class="fn" data-i="${i}"><div class="fb"></div>${M2[i]} ${l}</button>`).join('');
$$('#r1 .mood').forEach(b=>b.onclick=()=>{$$('#r1 .mood').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');s1=+b.dataset.i;b.animate([{transform:'scale(1)'},{transform:'scale(1.15) rotate(-4deg)'},{transform:'scale(1)'}],400)});
$$('#r2 .fn').forEach(b=>b.onclick=()=>{$$('#r2 .fn').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');s2=+b.dataset.i;b.querySelector('.fb').animate([{transform:'none'},{transform:X[s2]},{transform:'none'}],{duration:800})});
function confetti(){for(let i=0;i<50;i++){const e=document.createElement('i');e.className='cf';e.style.left=Math.random()*100+'vw';e.style.background=['#6c5ce7','#00b8d9','#f59e0b','#ec4899','#16a34a'][i%5];document.body.appendChild(e);e.animate([{transform:'translateY(0) rotate(0)'},{transform:`translateY(105vh) rotate(${Math.random()*720}deg)`}],{duration:1500+Math.random()*1500}).onfinish=()=>e.remove()}}
$('#sub').onclick=()=>{if(s1===null||s2===null){$('#ok').textContent='Екі сұраққа да жауап беріңіз';return}if(noApi()){$('#ok').textContent='Apps Script URL көрсетілмеген';return}post('Рефлексия',[L1[s1],L2[s2],$('#cm').value]).then(()=>{$('#ok').textContent='Рахмет! 🎉';confetti()})};
