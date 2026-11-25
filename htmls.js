const $=id=>document.getElementById(id);
const cv=$('cv'),ctx=cv.getContext('2d');
const T={
en:{align:'Align',fname:'File name',kbnote:'KB means 1024 bytes. The size shown is the exact size of the downloaded file.',sumB:'Exact size',h4x:'Downloaded',p4x:'Your photo is saved. Details are below.',dlnow:'Download',dlagain:'Download again',qnote:'Quality may drop a little after resizing. That is normal in every resize tool. It does not cause problems on official sites or apps, since nobody zooms into your photo on the web.',foot:'Your photos stay on your device. Nothing is uploaded.',undo:'Undo',redo:'Redo',s1:'Size',s2:'Fit',s3:'Format',s4:'Download',h1:'Choose the size',p1:'Pick a preset or type your own width and height in pixels.',h2:'Fit the photo',p2:'Decide how the photo sits inside the frame.',h3:'Format and file size',p3:'Pick a format and the largest file size allowed. Quality adjusts by itself.',h4:'Ready to download',p4:'Check the details, then save your photo.',back:'Back',n1:'Next: Fit',n2:'Next: Format',n3:'Next: Download',needPhoto:'Add a photo first',again:'Resize another photo',sumSize:'Pixel size',sumFmt:'Format',sumKb:'File size',sumQ:'Quality',sumLim:'limit',title:'Photo Resize',other:'Change photo',drop1:'Drop a photo here',drop2:'or tap to pick one. Ctrl+V works too. Nothing is uploaded.',tip:'Drag to move. Pinch or scroll to zoom.',empty:'Add a photo to see the size',dl:'Download',size:'Size in pixels',sig:'signature',place:'How the photo sits',fill:'Auto fill',fillD:'Fills the frame, extra edges are cropped from the center',fitm:'Fit inside',fitD:'Whole photo stays visible, empty space gets the background color',man:'Manual',manD:'Drag to move, slider or pinch to zoom',zoom:'Zoom',bg:'Background',tr:'Transparent',format:'Format and file size',maxkb:'Max KB',lim:'Keep the file under this limit',t1:'Size',t2:'Fit',t3:'Format',
  orig:'Original',q:'quality',nopng:'PNG could not get under the limit. Pick JPG or WebP, or make the size smaller.',nolim:'Even the lowest quality is over the limit. Reduce width and height.',nofmt:'This browser cannot save that format, so it saved',bad:'Could not open that image. Try another file.'},
bn:{align:'অবস্থান',fname:'ফাইলের নাম',kbnote:'KB মানে ১০২৪ বাইট। যে সাইজ দেখাচ্ছে, ফাইল ঠিক ততটুকুই হবে।',sumB:'হুবহু সাইজ',h4x:'ডাউনলোড হয়ে গেছে',p4x:'আপনার ছবি সেভ হয়েছে। তথ্য নিচে দেখুন।',dlnow:'ডাউনলোড',dlagain:'আবার ডাউনলোড',qnote:'রিসাইজের পর কোয়ালিটি একটু কমতে পারে, এটা স্বাভাবিক। সব রিসাইজ টুলেই হয়। অফিসিয়াল ফর্ম বা অ্যাপে এতে সমস্যা হয় না, ওয়েবে কেউ ছবি জুম করে না।',foot:'আপনার ছবি আপনার ডিভাইসেই থাকে, কিছুই আপলোড হয় না।',undo:'আগের অবস্থা (Undo)',redo:'সামনে (Redo)',s1:'মাপ',s2:'ফিট',s3:'ফরম্যাট',s4:'ডাউনলোড',h1:'মাপ ঠিক করুন',p1:'প্রিসেট বেছে নিন, অথবা নিজের Width আর Height পিক্সেলে লিখুন।',h2:'ছবি ফিট করুন',p2:'ফ্রেমের ভেতরে ছবি কীভাবে বসবে ঠিক করুন।',h3:'ফরম্যাট ও ফাইল সাইজ',p3:'ফরম্যাট বেছে নিন আর কত KB-র নিচে রাখবেন লিখুন। কোয়ালিটি নিজে নিজে ঠিক হবে।',h4:'ডাউনলোডের জন্য তৈরি',p4:'তথ্য দেখে নিন, তারপর ছবি সেভ করুন।',back:'পেছনে',n1:'পরের ধাপ: ফিট',n2:'পরের ধাপ: ফরম্যাট',n3:'পরের ধাপ: ডাউনলোড',needPhoto:'আগে একটা ছবি দিন',again:'আরেকটা ছবি রিসাইজ করুন',sumSize:'মাপ',sumFmt:'ফরম্যাট',sumKb:'ফাইল সাইজ',sumQ:'কোয়ালিটি',sumLim:'লিমিট',title:'ছবির মাপ',other:'অন্য ছবি',drop1:'ছবি এখানে ফেলুন',drop2:'অথবা ট্যাপ করে বেছে নিন। Ctrl+V-ও চলে। কিছুই আপলোড হয় না।',tip:'টেনে সরান। পিঞ্চ বা স্ক্রলে জুম করুন।',empty:'ছবি দিলে সাইজ দেখাবে',dl:'ডাউনলোড',size:'মাপ (পিক্সেল)',sig:'সিগনেচার',place:'ছবি কীভাবে বসবে',fill:'অটো ফিল',fillD:'ফ্রেম ভরে যাবে, বাড়তি অংশ মাঝখান থেকে কাটা পড়বে',fitm:'ফিট',fitD:'পুরো ছবি থাকবে, ফাঁকা জায়গায় ব্যাকগ্রাউন্ড রং',man:'ম্যানুয়াল',manD:'টেনে সরান, স্লাইডার বা পিঞ্চে জুম',zoom:'জুম',bg:'ব্যাকগ্রাউন্ড',tr:'ট্রান্সপারেন্ট',format:'ফরম্যাট ও ফাইল সাইজ',maxkb:'সর্বোচ্চ KB',lim:'এই লিমিটের নিচে রাখো',t1:'মাপ',t2:'ফিট',t3:'ফরম্যাট',
  orig:'মূল ছবি',q:'কোয়ালিটি',nopng:'PNG লিমিটে নামেনি। JPG বা WebP নিন, নয়তো মাপ ছোট করুন।',nolim:'সবচেয়ে কম কোয়ালিটিতেও লিমিটের ওপরে। Width/height ছোট করুন।',nofmt:'এই ব্রাউজার ওই ফরম্যাটে সেভ করতে পারে না, তাই সেভ হয়েছে',bad:'ছবিটা খোলা যায়নি। অন্য ফাইল দিন।'}};
let lang='en',theme='auto';
const store=(k,v)=>{try{v===undefined?0:localStorage.setItem(k,v);return localStorage.getItem(k)}catch(e){return null}};
const t=k=>T[lang][k];
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i]').forEach(e=>{if(e.id==='meta'&&S.img)return;e.textContent=t(e.dataset.i)});
  $('lang').textContent=lang==='en'?'বাং':'EN';
  document.title='theImageLabs';$('undo').title=t('undo');$('redo').title=t('redo');
  updateNav();if(S.img)encode();
}
function applyTheme(){
  const r=document.documentElement;
  theme==='auto'?r.removeAttribute('data-theme'):r.setAttribute('data-theme',theme);
  $('theme').textContent={auto:'◐',light:'☀',dark:'☾'}[theme];
}

const S={img:null,name:'photo',mode:'fit',z:1,fx:0,fy:0,W:300,H:300,k:1,blob:null,tok:0,timer:0,src:''};
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'};
function readDims(){S.W=clamp(parseInt($('w').value)||300,1,8000);S.H=clamp(parseInt($('h').value)||300,1,8000)}
function scales(){const iw=S.img.naturalWidth,ih=S.img.naturalHeight;return{fit:Math.min(S.W/iw,S.H/ih),cover:Math.max(S.W/iw,S.H/ih)}}
function applyMode(){
  if(!S.img)return;const sc=scales();
  if(S.mode==='fit'){S.z=sc.fit/sc.cover;S.fx=S.fy=0}else if(S.mode==='fill'){S.z=1;S.fx=S.fy=0}
  syncZoom();
}
function syncZoom(){const p=Math.round(S.z*100);$('zoom').value=clamp(p,20,500);$('zv').textContent=p+'%'}
function layoutCanvas(){
  const st=$('stage'),pad=26;
  S.k=Math.min((st.clientWidth-pad)/S.W,(st.clientHeight-66)/S.H,4);
  cv.style.width=S.W*S.k+'px';cv.style.height=S.H*S.k+'px';
}
function draw(){
  if(!S.img)return;
  if(cv.width!==S.W||cv.height!==S.H){cv.width=S.W;cv.height=S.H}
  layoutCanvas();
  ctx.clearRect(0,0,S.W,S.H);
  const trans=$('tr').checked&&$('fmt').value!=='image/jpeg';
  if(!trans){ctx.fillStyle=$('bg').value;ctx.fillRect(0,0,S.W,S.H)}
  const s=scales().cover*S.z,dw=S.img.naturalWidth*s,dh=S.img.naturalHeight*s;
  ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';
  ctx.drawImage(S.img,(S.W-dw)/2+S.fx*S.W,(S.H-dh)/2+S.fy*S.H,dw,dh);
  S.pending=true;$('sz').style.opacity=.45;clearTimeout(S.timer);S.timer=setTimeout(encode,140);
  clearTimeout(H.t);H.t=setTimeout(commit,450);
}
const toBlob=q=>new Promise(r=>cv.toBlob(r,$('fmt').value,q));
async function encode(){
  if(!S.img)return;
  const tok=++S.tok,type=$('fmt').value,limit=$('lim').checked?Math.max(1,+$('kb').value||1)*1024:Infinity;
  let b,q=null,fail=false;
  if(type==='image/png'){b=await toBlob();fail=b.size>limit}
  else{
    q=.95;b=await toBlob(q);
    if(b.size>limit){
      let lo=.02,hi=.95,best=null,bq=0;
      for(let i=0;i<11;i++){const m=(lo+hi)/2,x=await toBlob(m);if(x.size<=limit){best=x;bq=m;lo=m}else hi=m}
      if(best){b=best;q=bq}else{b=await toBlob(.02);q=.02;fail=true}
    }
  }
  if(tok!==S.tok)return;
  S.blob=b;
  const kb=b.size/1024,sz=$('sz'),fn=(ext[b.type]||'?').toUpperCase();
  sz.innerHTML=kb.toFixed(2)+'<small>KB</small>';sz.style.opacity=1;S.pending=false;syncName();
  sz.className='size '+(limit===Infinity?'':fail?'bad':'ok');
  $('meta').textContent=S.W+'×'+S.H+' px · '+fn+(q?' · '+t('q')+' '+Math.round(q*100)+'%':'')+' · '+b.size.toLocaleString('en-US')+' bytes';
  const n=$('note');n.hidden=true;
  if(fail){n.hidden=false;n.textContent=type==='image/png'?t('nopng'):t('nolim')}
  else if(b.type!==type){n.hidden=false;n.textContent=t('nofmt')+' '+fn+'.'}
  $('dl').disabled=false;renderSum(b,q,fn,limit);updateNav();
}
function load(file){
  if(!file||!file.type.startsWith('image/'))return;
  const im=new Image();
  im.onload=()=>{
    S.img=im;S.iid=++IID;S.fedit=false;S.name=(file.name||'photo').replace(/\.[^.]+$/,'')||'photo';
    $('stage').classList.add('on-img');$('change').hidden=false;
    readDims();applyMode();cv.width=0;draw();updateNav();
  };
  im.onerror=()=>alert(t('bad'));
  im.src=URL.createObjectURL(file);
}
function setMode(m){S.mode=m;document.querySelector('input[name=mode][value='+m+']').checked=true;applyMode();draw()}
function markChips(){
  document.querySelectorAll('#chips .chip').forEach(c=>c.classList.toggle('on',+c.dataset.w===S.W&&+c.dataset.h===S.H));
  document.querySelectorAll('#kbchips .chip').forEach(c=>c.classList.toggle('on',+c.dataset.kb===+$('kb').value));
}
function dimsChanged(){readDims();markChips();if(S.img){applyMode();draw()}}

$('file').onchange=e=>load(e.target.files[0]);
$('change').onclick=()=>{$('file').value='';$('file').click()};
$('drop').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('file').click()}};
['dragenter','dragover'].forEach(n=>document.addEventListener(n,e=>{e.preventDefault();$('drop').classList.add('over')}));
['dragleave','drop'].forEach(n=>document.addEventListener(n,e=>{e.preventDefault();$('drop').classList.remove('over')}));
document.addEventListener('drop',e=>load(e.dataTransfer.files[0]));
document.addEventListener('paste',e=>{const f=[...e.clipboardData.files][0];if(f)load(f)});
document.querySelectorAll('#chips .chip').forEach(c=>c.onclick=()=>{$('w').value=c.dataset.w;$('h').value=c.dataset.h;dimsChanged()});
document.querySelectorAll('#kbchips .chip').forEach(c=>c.onclick=()=>{$('kb').value=c.dataset.kb;$('lim').checked=true;markChips();encode()});
$('w').oninput=$('h').oninput=dimsChanged;
$('swap').onclick=()=>{const x=$('w').value;$('w').value=$('h').value;$('h').value=x;dimsChanged()};
document.querySelectorAll('input[name=mode]').forEach(r=>r.onchange=()=>setMode(r.value));
$('zoom').oninput=e=>{if(S.mode!=='manual')setMode('manual');S.z=e.target.value/100;syncZoom();draw()};
$('bg').oninput=draw;$('tr').onchange=draw;
$('fmt').onchange=()=>{const j=$('fmt').value==='image/jpeg';$('tr').disabled=j;$('trw').style.opacity=j?.45:1;draw()};
$('kb').oninput=()=>{markChips();encode()};$('lim').onchange=encode;
const pad2=n=>String(n).padStart(2,'0');
function stamp(){
  const d=new Date(),h=d.getHours();
  return pad2(h%12||12)+pad2(d.getMinutes())+(h<12?'am':'pm')+'-'+pad2(d.getDate())+pad2(d.getMonth()+1)+String(d.getFullYear()).slice(-2);
}
const safeName=s=>(s.replace(/[^\p{L}\p{N} ._()-]+/gu,'').trim())||'photo';
const autoName=()=>safeName(S.name)+'-'+S.W+'x'+S.H+'px-'+stamp();
function fileBase(){const v=$('fname').value.trim();return S.fedit&&v?safeName(v):autoName()}
function syncName(){if(!S.fedit)$('fname').value=autoName();$('fext').textContent='.'+(ext[S.blob?S.blob.type:$('fmt').value]||'jpg')}
async function doDownload(){
  if(S.pending){clearTimeout(S.timer);await encode()}
  if(!S.blob)return;
  const a=document.createElement('a');a.href=URL.createObjectURL(S.blob);
  a.download=fileBase()+'.'+(ext[S.blob.type]||'jpg');
  document.body.appendChild(a);a.click();a.remove();syncName();
}
$('dl').onclick=doDownload;
document.querySelectorAll('.al button').forEach(b=>b.onclick=()=>{
  if(!S.img)return;
  if(S.mode!=='manual')setMode('manual');
  const s=scales().cover*S.z,dw=S.img.naturalWidth*s,dh=S.img.naturalHeight*s,a=b.dataset.a;
  if(a==='l')S.fx=(dw-S.W)/(2*S.W);
  else if(a==='r')S.fx=(S.W-dw)/(2*S.W);
  else if(a==='t')S.fy=(dh-S.H)/(2*S.H);
  else if(a==='b')S.fy=(S.H-dh)/(2*S.H);
  else{S.fx=0;S.fy=0}
  draw();
});
$('fname').oninput=()=>{S.fedit=!!$('fname').value.trim()};$('fname').onblur=syncName;
let step=1;
const canGo=n=>n===1||!!(S.img&&(n<4||S.blob));
function showStep(n){
  step=n;
  document.querySelectorAll('.sec').forEach(s=>s.classList.toggle('on',+s.dataset.step===n));
  document.querySelector('.panel').scrollTop=0;updateNav();
}
function updateNav(){
  document.querySelectorAll('#steps li').forEach((li,i)=>{
    const n=i+1;
    li.classList.toggle('cur',n===step);li.classList.toggle('done',n<step);
    li.querySelector('b').textContent=n<step?'✓':n;li.querySelector('button').disabled=!canGo(n);
  });
  const nx=$('next');
  $('back').style.visibility=step>1?'visible':'hidden';
  nx.hidden=step===4;nx.disabled=!canGo(step+1);
  nx.innerHTML=!S.img?t('needPhoto'):step===3?'<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:6px;vertical-align:-2px"><path d="M8 2v8M4.5 7 8 10.5 11.5 7M3 13.5h10"/></svg>'+t('dlnow'):t('n'+Math.min(step,3));
}
function renderSum(b,q,fn,limit){
  const rows=[[t('sumSize'),S.W+'×'+S.H+' px'],[t('sumFmt'),fn],[t('sumKb'),(b.size/1024).toFixed(2)+' KB'+(limit<Infinity?' ('+t('sumLim')+' '+(limit/1024)+' KB)':'')],[t('sumB'),b.size.toLocaleString('en-US')+' bytes']];
  if(q)rows.push([t('sumQ'),Math.round(q*100)+'%']);
  $('sum').innerHTML=rows.map(r=>'<div><dt>'+r[0]+'</dt><dd>'+r[1]+'</dd></div>').join('');
}
$('back').onclick=()=>showStep(step-1);
$('next').onclick=async()=>{if(step===3)await doDownload();showStep(step+1)};
document.querySelectorAll('#steps button').forEach(b=>b.onclick=()=>{const n=+b.dataset.s;if(canGo(n))showStep(n)});
$('again').onclick=()=>{showStep(1);$('change').click()};
$('lang').onclick=()=>{lang=lang==='en'?'bn':'en';store('pr-lang',lang);applyLang()};
$('theme').onclick=()=>{theme={light:'dark',dark:'auto',auto:'light'}[theme];store('pr-theme',theme);applyTheme()};

let IID=0;const H={list:[],i:-1,t:0};
function snap(){
  const o={w:$('w').value,h:$('h').value,mode:S.mode,z:S.z,fx:S.fx,fy:S.fy,bg:$('bg').value,tr:$('tr').checked,fmt:$('fmt').value,kb:$('kb').value,lim:$('lim').checked,iid:S.iid};
  return{key:JSON.stringify(o),o,img:S.img,name:S.name};
}
function commit(){
  clearTimeout(H.t);
  if(!S.img)return;
  const s=snap(),cur=H.list[H.i];
  if(cur&&cur.key===s.key)return;
  H.list=H.list.slice(0,H.i+1);H.list.push(s);
  if(H.list.length>60)H.list.shift();
  H.i=H.list.length-1;histUI();
}
function restore(s){
  const o=s.o;
  S.img=s.img;S.name=s.name;S.iid=o.iid;S.mode=o.mode;S.z=o.z;S.fx=o.fx;S.fy=o.fy;
  $('w').value=o.w;$('h').value=o.h;$('bg').value=o.bg;$('tr').checked=o.tr;$('fmt').value=o.fmt;$('kb').value=o.kb;$('lim').checked=o.lim;
  document.querySelector('input[name=mode][value='+o.mode+']').checked=true;
  const j=o.fmt==='image/jpeg';$('tr').disabled=j;$('trw').style.opacity=j?.45:1;
  readDims();markChips();syncZoom();draw();histUI();
}
function undo(){commit();if(H.i>0){H.i--;restore(H.list[H.i])}}
function redo(){commit();if(H.i<H.list.length-1){H.i++;restore(H.list[H.i])}}
function histUI(){$('undo').disabled=H.i<1;$('redo').disabled=H.i>=H.list.length-1}
$('undo').onclick=undo;$('redo').onclick=redo;
document.addEventListener('keydown',e=>{
  if(!(e.ctrlKey||e.metaKey)||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;
  const k=e.key.toLowerCase();
  if(k==='z'){e.preventDefault();e.shiftKey?redo():undo()}else if(k==='y'){e.preventDefault();redo()}
});
const ptr=new Map();let pd=0;
const dist=()=>{const [a,b]=[...ptr.values()];return Math.hypot(a.x-b.x,a.y-b.y)};
cv.onpointerdown=e=>{ptr.set(e.pointerId,{x:e.clientX,y:e.clientY});cv.setPointerCapture(e.pointerId);cv.classList.add('grab');if(ptr.size===2)pd=dist()};
cv.onpointermove=e=>{
  const p=ptr.get(e.pointerId);if(!p)return;
  if(S.mode!=='manual')setMode('manual');
  const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
  if(ptr.size===2){const d=dist();if(pd)S.z=clamp(S.z*d/pd,.2,5);pd=d;syncZoom()}
  else{S.fx+=dx/S.k/S.W;S.fy+=dy/S.k/S.H}
  draw();
};
cv.onpointerup=cv.onpointercancel=e=>{ptr.delete(e.pointerId);pd=0;if(!ptr.size)cv.classList.remove('grab')};
cv.addEventListener('wheel',e=>{e.preventDefault();if(S.mode!=='manual')setMode('manual');S.z=clamp(S.z*(e.deltaY<0?1.06:.94),.2,5);syncZoom();draw()},{passive:false});
new ResizeObserver(()=>{if(S.img)layoutCanvas()}).observe($('stage'));

lang=store('pr-lang')==='bn'?'bn':'en';
theme=['light','dark','auto'].includes(store('pr-theme'))?store('pr-theme'):'light';
applyTheme();applyLang();$('fmt').onchange();markChips();
