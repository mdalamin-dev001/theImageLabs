const $=id=>document.getElementById(id);
const cv=$('cv'),ctx=cv.getContext('2d');
const T={
en:{about_t:'Free photo resizer for university admission and official forms',about_p:'theImageLabs is an advanced photo and signature resizer. Set the exact width and height in pixels, choose JPG, PNG or WebP, and keep the file under your KB limit while keeping the quality as high as possible. It works in your browser, so your photo never leaves your device.',use_t:'Made for',u1:'University admission test application photos',u2:'Job, scholarship and exam application forms',u3:'Government and official portals (ID, passport, board, bank)',u4:'Signature and thumb images (for example 300×80)',tip_t:'Tips for high quality',tip_p:'Start from the original photo, not a screenshot. Use JPG for forms. Set a realistic KB limit (for example 50–100 KB for 300×400). Do not enlarge a small photo. Use Fit or Manual so the face is never cropped.',q5:'What size do admission applications ask for?',a5:'It differs by university and form. Photos are commonly around 300×300 or 300×400 pixels and signatures around 300×80 pixels, often with a 20–100 KB limit. Always follow the notice of your university or portal.',f_tg:'Message on Telegram',fabout:'Free photo resizer for forms and applications.',f_tos:'Terms of Service',f_priv:'Privacy',f_guide:'Guidelines',f_contact:'Contact',fcontact:'Suggestion, complaint or advice? Message us on Telegram.',close:'Close',tos_t:'Terms of Service',tos_b:'<ul><li>theImageLabs is free to use and provided as is, without any warranty.</li><li>You are responsible for the photos you use and must have the right to use them.</li><li>Always check that the result meets the rules of the form or site you submit to. We are not responsible if it is rejected.</li><li>Do not use the tool for anything illegal or harmful.</li><li>These terms may change from time to time.</li></ul>',priv_t:'Privacy',priv_b:'<ul><li>Your photos are processed only in your browser. We never upload, store or share them.</li><li>There are no accounts and no tracking by us.</li><li>Your language and theme choice is saved in your browser only.</li><li>Fonts load from Google Fonts, and the website host may keep standard server logs, like any website.</li><li>If you message us on Telegram, we see what you send there.</li></ul>',more:'User guide',g_t:'How to use',g1t:'Size',g1d:'Pick a preset (300×300, 300×400, or 300×80 for a signature) or type your own width and height.',g2t:'Fit',g2d:'Fit keeps the whole photo. Auto fill crops it to fill the frame. Manual lets you drag and zoom. The arrow buttons nudge 1 pixel at a time.',g3t:'Format and KB',g3d:'Choose JPG, PNG or WebP and the largest file size in KB. Quality lowers by itself to stay under it.',g4t:'Download',g4d:'The file is saved with its name, size and time, like photo-300x300px-1043am-261126.jpg.',q_t:'Common questions',q1:'Why does the quality look lower?',a1:'Resizing and compressing always lowers quality a little, in every tool. Official sites and apps accept it, and nobody zooms into your photo on the web.',q2:'It will not go under my KB limit',a2:'Use JPG or WebP (PNG quality cannot be lowered), or make the width and height smaller.',q3:'Which format for forms?',a3:'JPG is accepted almost everywhere. Use PNG only when you need a transparent background.',q4:'Are my photos uploaded?',a4:'No. Everything happens in your browser, on your device.',nudge:'Nudge',align:'Align',fname:'File name',kbnote:'KB means 1024 bytes. The size shown is the exact size of the downloaded file.',sumB:'Exact size',h4x:'Downloaded',p4x:'Your photo is saved. Details are below.',dlnow:'Download',dlagain:'Download again',qnote:'Quality may drop a little after resizing. That is normal in every resize tool. It does not cause problems on official sites or apps, since nobody zooms into your photo on the web.',foot:'Your photos stay on your device. Nothing is uploaded.',undo:'Undo',redo:'Redo',s1:'Size',s2:'Fit',s3:'Format',s4:'Download',h1:'Choose the size',p1:'Pick a preset or type your own width and height in pixels.',h2:'Fit the photo',p2:'Decide how the photo sits inside the frame.',h3:'Format and file size',p3:'Pick a format and the largest file size allowed. Quality adjusts by itself.',h4:'Ready to download',p4:'Check the details, then save your photo.',back:'Back',n1:'Next: Fit',n2:'Next: Format',n3:'Next: Download',needPhoto:'Add a photo first',again:'Resize another photo',sumSize:'Pixel size',sumFmt:'Format',sumKb:'File size',sumQ:'Quality',sumLim:'limit',title:'Photo Resize',other:'Change photo',drop1:'Drop a photo here',drop2:'or tap to pick one. Ctrl+V works too. Nothing is uploaded.',tip:'Drag to move. Pinch or scroll to zoom.',empty:'Add a photo to see the size',dl:'Download',size:'Size in pixels',sig:'signature',place:'How the photo sits',fill:'Auto fill',fillD:'Fills the frame, extra edges are cropped from the center',fitm:'Fit inside',fitD:'Whole photo stays visible, empty space gets the background color',man:'Manual',manD:'Drag to move, slider or pinch to zoom',zoom:'Zoom',bg:'Background',tr:'Transparent',format:'Format and file size',maxkb:'Max KB',lim:'Keep the file under this limit',t1:'Size',t2:'Fit',t3:'Format',
  orig:'Original',q:'quality',nopng:'PNG could not get under the limit. Pick JPG or WebP, or make the size smaller.',nolim:'Even the lowest quality is over the limit. Reduce width and height.',nofmt:'This browser cannot save that format, so it saved',bad:'Could not open that image. Try another file.'},
bn:{about_t:'বিশ্ববিদ্যালয় ভর্তি ও অফিসিয়াল ফর্মের জন্য ফ্রি ছবি রিসাইজার',about_p:'theImageLabs একটি অ্যাডভান্সড ছবি ও সিগনেচার রিসাইজার। Width আর Height পিক্সেলে ঠিক করুন, JPG, PNG বা WebP বেছে নিন, আর কোয়ালিটি যতটা সম্ভব ভালো রেখে ফাইল আপনার KB লিমিটের নিচে রাখুন। সবকিছু আপনার ব্রাউজারে হয়, তাই ছবি ডিভাইসের বাইরে যায় না।',use_t:'যাদের জন্য',u1:'বিশ্ববিদ্যালয় ভর্তি পরীক্ষার আবেদনের ছবি',u2:'চাকরি, বৃত্তি ও পরীক্ষার আবেদন ফর্ম',u3:'সরকারি ও অফিসিয়াল পোর্টাল (আইডি, পাসপোর্ট, বোর্ড, ব্যাংক)',u4:'সিগনেচার ও টিপসই ছবি (যেমন 300×80)',tip_t:'ভালো কোয়ালিটির টিপস',tip_p:'স্ক্রিনশট নয়, মূল ছবি থেকে শুরু করুন। ফর্মের জন্য JPG নিন। KB লিমিট বাস্তবসম্মত রাখুন (যেমন 300×400-এর জন্য ৫০–১০০ KB)। ছোট ছবি বড় করবেন না। মুখ যাতে না কাটে, তাই ফিট বা ম্যানুয়াল মোড নিন।',q5:'ভর্তির আবেদনে কত সাইজের ছবি লাগে?',a5:'বিশ্ববিদ্যালয় আর ফর্ম ভেদে আলাদা। ছবি সাধারণত 300×300 বা 300×400 পিক্সেল, সিগনেচার প্রায় 300×80 পিক্সেল, আর লিমিট প্রায়ই ২০–১০০ KB হয়। সবসময় আপনার বিশ্ববিদ্যালয় বা পোর্টালের বিজ্ঞপ্তি মেনে চলুন।',f_tg:'টেলিগ্রামে মেসেজ করুন',fabout:'ফর্ম ও আবেদনের জন্য ফ্রি ছবি রিসাইজার।',f_tos:'ব্যবহারের শর্ত',f_priv:'গোপনীয়তা',f_guide:'নির্দেশিকা',f_contact:'যোগাযোগ',fcontact:'পরামর্শ, অভিযোগ বা মতামত? টেলিগ্রামে মেসেজ করুন।',close:'বন্ধ করুন',tos_t:'ব্যবহারের শর্ত',tos_b:'<ul><li>theImageLabs বিনামূল্যে ব্যবহার করা যায় এবং যেমন আছে তেমন অবস্থায় দেওয়া, কোনো গ্যারান্টি ছাড়া।</li><li>যে ছবি ব্যবহার করছেন, তার দায়িত্ব আপনার এবং সেটা ব্যবহারের অধিকার আপনার থাকতে হবে।</li><li>যে ফর্ম বা সাইটে জমা দিচ্ছেন, ফলাফল তাদের নিয়মে মেলে কি না নিজে দেখে নিন। বাতিল হলে আমরা দায়ী নই।</li><li>অবৈধ বা ক্ষতিকর কাজে টুলটা ব্যবহার করবেন না।</li><li>এই শর্ত সময়ে সময়ে বদলাতে পারে।</li></ul>',priv_t:'গোপনীয়তা',priv_b:'<ul><li>আপনার ছবি শুধু আপনার ব্রাউজারেই প্রসেস হয়। আমরা কখনো আপলোড, জমা বা শেয়ার করি না।</li><li>কোনো অ্যাকাউন্ট নেই, আমরা কোনো ট্র্যাকিংও করি না।</li><li>ভাষা আর থিমের পছন্দ শুধু আপনার ব্রাউজারে সেভ থাকে।</li><li>ফন্ট Google Fonts থেকে আসে, আর যেকোনো ওয়েবসাইটের মতো হোস্টিং সার্ভার সাধারণ লগ রাখতে পারে।</li><li>টেলিগ্রামে মেসেজ দিলে সেখানে যা লিখবেন, আমরা তা দেখতে পাব।</li></ul>',more:'নির্দেশিকা',g_t:'ব্যবহারের নির্দেশিকা',g1t:'মাপ',g1d:'প্রিসেট বেছে নিন (300×300, 300×400, সিগনেচারের জন্য 300×80), অথবা নিজের Width আর Height লিখুন।',g2t:'ফিট',g2d:'ফিটে পুরো ছবি থাকে। অটো ফিল ফ্রেম ভরতে কেটে দেয়। ম্যানুয়ালে টেনে সরানো আর জুম করা যায়। তীর বাটনে ১ পিক্সেল করে সরে।',g3t:'ফরম্যাট ও KB',g3d:'JPG, PNG বা WebP বেছে সর্বোচ্চ কত KB হবে লিখুন। কোয়ালিটি নিজে নিজে কমে ওই সাইজের নিচে নামে।',g4t:'ডাউনলোড',g4d:'ফাইল নাম, মাপ আর সময়সহ সেভ হয়, যেমন photo-300x300px-1043am-261126.jpg।',q_t:'সাধারণ প্রশ্ন',q1:'কোয়ালিটি কম দেখায় কেন?',a1:'রিসাইজ আর কম্প্রেস করলে কোয়ালিটি একটু কমেই। সব টুলেই এমন হয়। অফিসিয়াল সাইট বা অ্যাপে সমস্যা হয় না, ওয়েবে কেউ ছবি জুম করে না।',q2:'KB লিমিটের নিচে নামছে না',a2:'JPG বা WebP নিন (PNG-তে কোয়ালিটি কমে না), অথবা Width আর Height ছোট করুন।',q3:'ফর্মের জন্য কোন ফরম্যাট?',a3:'JPG প্রায় সব জায়গায় চলে। ট্রানসপারেন্ট ব্যাকগ্রাউন্ড লাগলে তবেই PNG নিন।',q4:'আমার ছবি কি আপলোড হয়?',a4:'না। সবকিছু আপনার ব্রাউজারে, আপনার ডিভাইসেই হয়।',nudge:'সূক্ষ্ম সরান',align:'অবস্থান',fname:'ফাইলের নাম',kbnote:'KB মানে ১০২৪ বাইট। যে সাইজ দেখাচ্ছে, ফাইল ঠিক ততটুকুই হবে।',sumB:'হুবহু সাইজ',h4x:'ডাউনলোড হয়ে গেছে',p4x:'আপনার ছবি সেভ হয়েছে। তথ্য নিচে দেখুন।',dlnow:'ডাউনলোড',dlagain:'আবার ডাউনলোড',qnote:'রিসাইজের পর কোয়ালিটি একটু কমতে পারে, এটা স্বাভাবিক। সব রিসাইজ টুলেই হয়। অফিসিয়াল ফর্ম বা অ্যাপে এতে সমস্যা হয় না, ওয়েবে কেউ ছবি জুম করে না।',foot:'আপনার ছবি আপনার ডিভাইসেই থাকে, কিছুই আপলোড হয় না।',undo:'আগের অবস্থা (Undo)',redo:'সামনে (Redo)',s1:'মাপ',s2:'ফিট',s3:'ফরম্যাট',s4:'ডাউনলোড',h1:'মাপ ঠিক করুন',p1:'প্রিসেট বেছে নিন, অথবা নিজের Width আর Height পিক্সেলে লিখুন।',h2:'ছবি ফিট করুন',p2:'ফ্রেমের ভেতরে ছবি কীভাবে বসবে ঠিক করুন।',h3:'ফরম্যাট ও ফাইল সাইজ',p3:'ফরম্যাট বেছে নিন আর কত KB-র নিচে রাখবেন লিখুন। কোয়ালিটি নিজে নিজে ঠিক হবে।',h4:'ডাউনলোডের জন্য তৈরি',p4:'তথ্য দেখে নিন, তারপর ছবি সেভ করুন।',back:'পেছনে',n1:'পরের ধাপ: ফিট',n2:'পরের ধাপ: ফরম্যাট',n3:'পরের ধাপ: ডাউনলোড',needPhoto:'আগে একটা ছবি দিন',again:'আরেকটা ছবি রিসাইজ করুন',sumSize:'মাপ',sumFmt:'ফরম্যাট',sumKb:'ফাইল সাইজ',sumQ:'কোয়ালিটি',sumLim:'লিমিট',title:'ছবির মাপ',other:'অন্য ছবি',drop1:'ছবি এখানে ফেলুন',drop2:'অথবা ট্যাপ করে বেছে নিন। Ctrl+V-ও চলে। কিছুই আপলোড হয় না।',tip:'টেনে সরান। পিঞ্চ বা স্ক্রলে জুম করুন।',empty:'ছবি দিলে সাইজ দেখাবে',dl:'ডাউনলোড',size:'মাপ (পিক্সেল)',sig:'সিগনেচার',place:'ছবি কীভাবে বসবে',fill:'অটো ফিল',fillD:'ফ্রেম ভরে যাবে, বাড়তি অংশ মাঝখান থেকে কাটা পড়বে',fitm:'ফিট',fitD:'পুরো ছবি থাকবে, ফাঁকা জায়গায় ব্যাকগ্রাউন্ড রং',man:'ম্যানুয়াল',manD:'টেনে সরান, স্লাইডার বা পিঞ্চে জুম',zoom:'জুম',bg:'ব্যাকগ্রাউন্ড',tr:'ট্রান্সপারেন্ট',format:'ফরম্যাট ও ফাইল সাইজ',maxkb:'সর্বোচ্চ KB',lim:'এই লিমিটের নিচে রাখো',t1:'মাপ',t2:'ফিট',t3:'ফরম্যাট',
  orig:'মূল ছবি',q:'কোয়ালিটি',nopng:'PNG লিমিটে নামেনি। JPG বা WebP নিন, নয়তো মাপ ছোট করুন।',nolim:'সবচেয়ে কম কোয়ালিটিতেও লিমিটের ওপরে। Width/height ছোট করুন।',nofmt:'এই ব্রাউজার ওই ফরম্যাটে সেভ করতে পারে না, তাই সেভ হয়েছে',bad:'ছবিটা খোলা যায়নি। অন্য ফাইল দিন।'}};
let lang='en',theme='auto';
const store=(k,v)=>{try{v===undefined?0:localStorage.setItem(k,v);return localStorage.getItem(k)}catch(e){return null}};
const t=k=>T[lang][k];
function applyLang(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i]').forEach(e=>{if(e.id==='meta'&&S.img)return;e.textContent=t(e.dataset.i)});
  $('lang').textContent=lang==='en'?'বাং':'EN';
  document.title=document.title;$('undo').title=t('undo');$('redo').title=t('redo');
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
let nt=0,ni=0;
const stopNudge=()=>{clearTimeout(nt);clearInterval(ni)};
function nudge(a,d){
  if(!S.img)return;
  if(S.mode!=='manual')setMode('manual');
  if(a==='c'){S.fx=S.fy=0}
  else if(a==='l')S.fx-=d/S.W;else if(a==='r')S.fx+=d/S.W;else if(a==='t')S.fy-=d/S.H;else S.fy+=d/S.H;
  draw();
}
document.querySelectorAll('.al button').forEach(b=>{
  b.onpointerdown=e=>{
    e.preventDefault();stopNudge();
    const a=b.dataset.a;nudge(a,1);
    if(a==='c')return;
    let c=0;
    nt=setTimeout(()=>{ni=setInterval(()=>{c++;nudge(a,c<15?1:c<40?2:4)},45)},380);
  };
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,stopNudge));
  b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();nudge(b.dataset.a,1)}};
  b.oncontextmenu=e=>e.preventDefault();
});
$('fname').oninput=()=>{S.fedit=!!$('fname').value.trim()};$('fname').onblur=syncName;
$('more').onclick=()=>$('guide').scrollIntoView({behavior:'smooth'});
document.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{const k=b.dataset.d;$('dt').textContent=t(k+'_t');$('db').innerHTML=t(k+'_b');$('dlg').showModal()});
$('dx').onclick=()=>$('dlg').close();
$('dlg').onclick=e=>{if(e.target===$('dlg'))$('dlg').close()};
$('fguide').onclick=()=>$('guide').scrollIntoView({behavior:'smooth'});
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
const redraw=()=>{if(S.img&&!document.hidden)draw()};
document.addEventListener('visibilitychange',redraw);
window.addEventListener('pageshow',redraw);window.addEventListener('focus',redraw);
