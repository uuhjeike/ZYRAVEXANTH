(()=>{'use strict';
/* ZYRAVEXANTH: every profile is a pure function of its numeric ID (BigInt), so the universe is infinite,
   stable and needs no storage. Feed IDs start at BASE and count up forever. */
const BASE=10n**32n+1n,PER=40n,PPG=12n;
const H=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rng=s=>{let a=H(s+'a'),b=H(s+'b'),c=H(s+'c'),d=H(s+'d');
  const f=()=>{a>>>=0;b>>>=0;c>>>=0;d>>>=0;let t=(a+b)|0;a=b^(b>>>9);b=(c+(c<<3))|0;c=(c<<21)|(c>>>11);d=(d+1)|0;t=(t+d)|0;c=(c+t)|0;return(t>>>0)/4294967296};
  for(let i=0;i<12;i++)f();f.i=n=>Math.floor(f()*n);f.p=x=>x[Math.floor(f()*x.length)];return f};
const ON=['k','v','z','th','l','m','n','r','s','x','d','el','or','ar','sy','qu'],MI=['a','e','i','o','u','ae','ia','eo'],EN=['n','r','s','th','x','m','l','k','ra','na','dor','',''];
const GT=['Spiral','Reach','Expanse','Cluster','Veil','Drift','Arm','Halo'],CV=['Concord','Dominion','Federation','Republic','Commonwealth','Union','Assembly'];
const cap=s=>s[0].toUpperCase()+s.slice(1),syl=r=>r.p(ON)+r.p(MI)+r.p(EN),sfx=n=>(n%46656n).toString(36).toUpperCase().padStart(3,'0');
const M='Arjun Daniel Mateo Kofi Hiro Leon Omar Tobias Ivan Rafael Noah Samir Felix Anton Jonas Marcus Idris Nikolai Ezra Caleb Tariq Lucas Dmitri Mikael'.split(' ');
const F='Amara Sofia Mei Lena Priya Nadia Elena Yuki Zara Camila Ines Freya Leila Anya Thea Mira Ayasha Clara Selene Noor Talia Ingrid Rosa Hana'.split(' ');
const CUL=[[['ver','hal','ash','mor','kes','dal','rin','tal'],['mont','wick','sen','vale','dorn','ley','ford','ra']],[['ko','sa','mi','ta','na','ha','yo','ri'],['moto','gawa','shi','mura','da','naka','zumi','be']],[['al','ben','el','har','ka','zah','mus','ras'],['dari','houn','mani','sim','tab','reza','nur','ali']],[['stan','ber','vol','kras','gor','lund','sig','hol'],['ovic','sson','berg','ek','man','ov','ski','dal']]];
const PROF=[['Apprentice Mechanic',18],['Hydroponics Farmer',18],['Courier',18],['Cook',18],['Chef',20],['Mechanic',20],['Electrician',20],['Photographer',20],['Composer',21],['Archivist',22],['Pilot',23],['Journalist',23],['Data Analyst',23],['Nurse',23],['Translator',23],['Teacher',24],['Navigator',24],['Cartographer',24],['Librarian',24],['Astronomer',24],['Orbital Engineer',25],['Botanist',25],['Geologist',25],['Robotics Engineer',25],['Marine Biologist',26],['Historian',26],['Xenobiologist',27],['Architect',27],['Physician',28],['Diplomat',30],['Terraforming Architect',30],['Surgeon',32],['Judge',38]];
const INT=['chess','long-range hiking','vinyl restoration','star mapping','pottery','night swimming','tea blending','amateur radio','mountaineering','calligraphy','urban gardening','jazz piano','woodworking','sailing'],TR=['patient','curious','meticulous','warm','stubborn','unflappable','quietly funny','generous','sharp-eyed'];
const BL=['O+','O+','A+','A+','B+','AB+','O-','A-','B-','AB-'];
const memo=(fn,max)=>{const m=new Map;return k=>{let v=m.get(k);if(!v){v=fn(k);if(m.size>=max)m.clear();m.set(k,v)}return v}};
const planetInfo=memo(P=>{const r=rng('P'+P);return{name:cap(syl(r)+syl(r))+'-'+sfx(P),civ:cap(syl(r))+' '+r.p(CV),cul:r.i(4)}},400);
const galaxyInfo=memo(G=>{const r=rng('G'+G);return{name:cap(syl(r)+syl(r))+' '+r.p(GT)+' '+sfx(G)}},400);
const mk=(n,idStr)=>{const s=n.toString(),r=rng('u'+s),P=n/PER,G=P/PPG,pl=planetInfo(P),ga=galaxyInfo(G);
  const g=r()<.48?'Male':r()<.92?'Female':'Non-binary',age=18+Math.floor(r()**1.3*62);
  const pr=r.p(PROF.filter(p=>p[1]<=age)),y=age-pr[1],ret=age>68,prof=(ret?'Retired ':'')+pr[0];
  const first=r.p(g==='Male'?M:g==='Female'?F:r()<.5?M:F),cu=CUL[pl.cul];
  const name=first+' '+String.fromCharCode(65+r.i(26))+'. '+cap(r.p(cu[0])+r.p(cu[1]));
  const it=r.p(INT),tr=r.p(TR),role=prof.toLowerCase();
  const b1=[`${first} is a ${age}-year-old ${role} from ${pl.civ}, living on ${pl.name} in the ${ga.name} galaxy.`,`Based on ${pl.name} in the ${ga.name} galaxy, ${first} (${age}) works as a ${role} within ${pl.civ}.`][r.i(2)];
  const b2=ret?`After ${y} years in the field, ${first} is a respected, ${tr} elder voice in the community.`:y>0?`${y} year${y>1?'s':''} into the career, ${first} is known as a ${tr} colleague.`:`${first} is just starting out and already seen as ${tr}.`;
  const b3=[`Away from work, ${first} spends time on ${it}.`,`${first} is happiest when absorbed in ${it}.`][r.i(2)];
  const k=g==='Male'?'men':g==='Female'?'women':r.p(['men','women']);
  return{id:idStr||s,name,age,gender:g,profession:prof,civilization:pl.civ,planet:pl.name,galaxy:ga.name,planetIndex:P.toString(),galaxyIndex:G.toString(),
    biography:b1+' '+b2+' '+b3,image:`https://randomuser.me/api/portraits/${k}/${r.i(100)}.jpg`,blood:r.p(BL),height:150+r.i(50),interest:it};};
if(typeof document==='undefined'){module.exports={mk,BASE,planetInfo,galaxyInfo,PER,PPG};return}

/* ---------- UI ---------- */
const $=id=>document.getElementById(id);
const feed=$('feed'),dr=$('dr'),db=$('db'),st=$('st'),dt=$('dt'),si=$('si'),sm=$('sm'),sx=$('sx');
const cardHTML=p=>`<img class="av" src="${p.image}" alt="" loading="lazy" decoding="async" data-n="${p.name}" onerror="zFb(this)"><div class="bd"><h3>${p.name}</h3><div class="pid" tabindex="0" aria-label="Profile ID">${p.id}</div><p class="rl">${p.age} &middot; ${p.profession} &middot; ${p.gender}</p><p class="lc">${p.civilization} &middot; <button type="button" data-p="${p.planetIndex}">${p.planet}</button> &middot; <button type="button" data-g="${p.galaxyIndex}">${p.galaxy}</button></p><p class="bio">${p.biography}</p><p class="dt">Blood ${p.blood} &middot; ${p.height} cm &middot; ${p.interest}</p></div>`;
window.zFb=img=>{img.onerror=null;const t=img.dataset.n.split(' ');const ini=t[0][0]+t[t.length-1][0];
  img.src='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 116"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7d0f26"/><stop offset="1" stop-color="#2a1245"/></linearGradient></defs><rect width="92" height="116" fill="url(#g)"/><text x="46" y="68" font-family="sans-serif" font-size="30" fill="#fff" text-anchor="middle">${ini}</text></svg>`)};
const cardEl=p=>{const a=document.createElement('article');a.className='card';a.innerHTML=cardHTML(p);return a};
const planetRow=P=>{const i=planetInfo(P);return`<button class="row" data-p="${P}"><b>${i.name}</b><span>${i.civ}</span></button>`};
const galaxyRow=G=>`<button class="row" data-g="${G}"><b>${galaxyInfo(G).name}</b><span>12 planets</span></button>`;

/* feed: windowed rendering, absolute rows of fixed height, page scroll never touched */
const cache=new Map;
const get=i=>{let p=cache.get(i);if(!p){p=mk(BASE+BigInt(i));if(cache.size>2500)cache.delete(cache.keys().next().value);cache.set(i,p)}return p};
const readRow=()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--row'))||228;
let row=readRow(),count=600,nodes=new Map,tick=false,warmAt=300;
const sent=document.createElement('div');sent.style.cssText='position:absolute;left:0;width:1px;height:1px;pointer-events:none';feed.appendChild(sent);
const idle=window.requestIdleCallback||(f=>setTimeout(f,16));
const warm=()=>{if(warmAt>=count)return;const e=Math.min(count,warmAt+60);for(;warmAt<e;warmAt++)get(warmAt);idle(warm)};
for(let i=0;i<300;i++)get(i);          /* first 300 profiles ready immediately */
const size=()=>{feed.style.height=count*row+'px';sent.style.top=(count-250)*row+'px'};
const ensure=last=>{if(last+300>count){while(last+300>count)count+=300;size();idle(warm)}};
const update=()=>{tick=false;const top=feed.getBoundingClientRect().top,vh=innerHeight;
  const f=Math.max(0,Math.floor(-top/row)-3),l=Math.max(0,Math.floor((vh-top)/row))+4;ensure(l);
  for(const[i,el]of nodes)if(i<f||i>l){el.remove();nodes.delete(i)}
  for(let i=f;i<=l;i++)if(!nodes.has(i)){const el=cardEl(get(i));el.style.transform=`translateY(${i*row}px)`;feed.appendChild(el);nodes.set(i,el)}};
const queue=()=>{if(!tick){tick=true;requestAnimationFrame(update)}};
addEventListener('scroll',queue,{passive:true});
addEventListener('resize',()=>{const r=readRow();if(r!==row){row=r;for(const el of nodes.values())el.remove();nodes.clear();size()}queue()});
if('IntersectionObserver'in window)new IntersectionObserver(e=>{if(e[0].isIntersecting)ensure(count);queue()}).observe(sent);
size();update();idle(warm);

/* drawer: universe browser + search results (separate from feed) */
const V=[];let tok=0,gN=0;const G0=BASE/PER/PPG;
const moreG=()=>{let h='';for(let k=0;k<24;k++,gN++)h+=galaxyRow(G0+BigInt(gN));db.insertAdjacentHTML('beforeend',h)};
db.addEventListener('scroll',()=>{if(db.dataset.m==='gal'&&db.scrollTop+db.clientHeight>db.scrollHeight-600)moreG()},{passive:true});
const scan=(tk,max,found,make,test,html)=>{let k=0,n=0;const step=()=>{if(tk!==tok)return;const e=k+300;
  for(;k<e;k++){const it=make(k);if(test(it)){db.insertAdjacentHTML('beforeend',html(it));if(++n>=30)return st.textContent='Showing the first 30 matches.'}}
  if(k>=max)return st.textContent=n?'End of nearby matches.':found;st.textContent='Searching\u2026 '+n+' found';setTimeout(step,0)};step()};
const render=v=>{const tk=++tok;db.replaceChildren();db.dataset.m=v.t;db.scrollTop=0;st.textContent='';$('bk').hidden=V.length<2;
  if(v.t==='gal'){dt.textContent='Galaxies';gN=0;moreG()}
  else if(v.t==='planets'){const G=BigInt(v.g);dt.textContent=galaxyInfo(G).name;st.textContent='Planets in this galaxy';let h='';for(let k=0n;k<PPG;k++)h+=planetRow(G*PPG+k);db.innerHTML=h}
  else if(v.t==='planet'){const P=BigInt(v.p),i=planetInfo(P);dt.textContent=i.name;st.textContent=i.civ+' \u2013 profiles on this planet';let h='';for(let k=0n;k<PER;k++)h+=`<article class="card">${cardHTML(mk(P*PER+k))}</article>`;db.innerHTML=h}
  else{const q=v.q,l=q.toLowerCase();dt.textContent='Search results';const none='No match found. Try another term or a profile ID.';
    if(v.m==='id'){if(!/^\d+$/.test(q))return st.textContent='Profile IDs contain digits only.';db.innerHTML=`<article class="card">${cardHTML(mk(BigInt(q),q))}</article>`}
    else if(v.m==='planet')scan(tk,20000,none,k=>G0*PPG+BigInt(k),P=>planetInfo(P).name.toLowerCase().includes(l)||planetInfo(P).civ.toLowerCase().includes(l),planetRow);
    else if(v.m==='galaxy')scan(tk,20000,none,k=>G0+BigInt(k),G=>galaxyInfo(G).name.toLowerCase().includes(l),galaxyRow);
    else{const f=v.m==='name'?'name':'profession';scan(tk,60000,none,k=>mk(BASE+BigInt(k)),p=>p[f].toLowerCase().includes(l),p=>`<article class="card">${cardHTML(p)}</article>`)}}};
const show=(v,reset)=>{if(reset)V.length=0;V.push(v);dr.classList.add('on');render(v)};
const closeDr=()=>{V.length=0;tok++;dr.classList.remove('on')};
$('cl').onclick=closeDr;$('bk').onclick=()=>{V.pop();render(V[V.length-1])};
$('un').onclick=()=>show({t:'gal'},true);
document.addEventListener('click',e=>{const b=e.target.closest('[data-p],[data-g]');if(!b)return;show(b.dataset.p!==undefined?{t:'planet',p:b.dataset.p}:{t:'planets',g:b.dataset.g})});

/* search */
const PH={id:'Profile ID',name:'Full name',prof:'Profession',planet:'Planet',galaxy:'Galaxy'};
sm.onchange=()=>{si.placeholder=PH[sm.value];si.inputMode=sm.value==='id'?'numeric':'text';si.focus()};
si.addEventListener('input',()=>{sx.hidden=!si.value});
const clear=()=>{si.value='';sx.hidden=true;if(V.length&&V[V.length-1].t==='res')closeDr()};
sx.onclick=()=>{clear();si.focus()};
si.addEventListener('keydown',e=>{if(e.key==='Escape')clear()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dr.classList.contains('on')&&e.target!==si)closeDr()});
$('sf').addEventListener('submit',e=>{e.preventDefault();const q=si.value.trim();if(!q)return;show({t:'res',m:sm.value,q},true)});
})();
