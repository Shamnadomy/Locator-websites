(function(){
  var wrapper = document.querySelector('.fleet-scroll-wrapper');
  if(!wrapper) return;
  var mobileLayer = wrapper.querySelector('.fs-mobile');
  var webLayer = wrapper.querySelector('.fs-web');
  var phones = [].slice.call(wrapper.querySelectorAll('.fs-phone'));
  var browsers = [].slice.call(wrapper.querySelectorAll('.fs-browser'));
  var notifStack = wrapper.querySelector('.fs-notif-stack');
  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Phone final positions ── */
  var phoneTargets = {
    '0': {tx:-300, rot:-12, sc:0.72, op:0.65},
    '1': {tx:-155, rot:-6,  sc:0.85, op:0.88},
    '2': {tx:0,    rot:0,   sc:1,    op:1},
    '3': {tx:155,  rot:6,   sc:0.85, op:0.88},
    '4': {tx:300,  rot:12,  sc:0.72, op:0.65}
  };

  /* ── Browser final positions ── */
  var browserTargets = {
    '0': {tx:-340, ty:25},
    '1': {tx:0,    ty:0},
    '2': {tx:340,  ty:25}
  };

  /* ── Initial web layer state ── */
  if(webLayer){
    webLayer.style.opacity = '0';
    webLayer.style.transform = 'scale(0.75)';
  }

  /* ── Phase 1: Phone entrance via inline styles + CSS transitions ── */
  var enterOrder = [2,1,3,0,4];
  function animatePhones(){
    /* force the browser to commit the initial CSS state before transitioning */
    phones.forEach(function(p){ p.offsetHeight; });

    enterOrder.forEach(function(idx, i){
      var p = phones[idx];
      if(!p) return;
      var t = phoneTargets[p.dataset.pos];
      var finalTransform = 'translate(-50%,-50%) translateX('+t.tx+'px) rotate('+t.rot+'deg) scale('+t.sc+')';
      var delay = noMotion ? 0 : i * 150 + 400;

      setTimeout(function(){
        if(noMotion) p.style.transition = 'none';
        p.style.opacity = String(t.op);
        p.style.transform = finalTransform;
      }, delay);
    });
  }
  /* kick off after a frame so CSS initial state is committed */
  requestAnimationFrame(function(){ requestAnimationFrame(animatePhones); });

  /* ── Phase 2: Notification cards ── */
  var notifs = [
    {t:'Harshad Tech 49357',a:'Exited Geozone',z:'Harshad Home',tm:'08:17'},
    {t:'Deepak Sales 30265',a:'Entered Geozone',z:'Abu Dhabi Emirates',tm:'09:02'},
    {t:'Musthafa tech 54016',a:'Exited Geozone',z:'Locator Dubai Office',tm:'09:10'},
    {t:'Ajmal Sales 49357',a:'Exited Geozone',z:'Dubai Zone',tm:'10:43'},
    {t:'Umer Sales 15833',a:'Entered Geozone',z:'Abu Dhabi Emirates',tm:'09:02'},
    {t:'Shamnad Support 84357',a:'Exited Geozone',z:'Locator Dubai Office',tm:'12:07'}
  ];
  var ni=0, notifTimer=null;
  function addNotif(){
    if(!notifStack) return;
    var d=notifs[ni%notifs.length];
    var c=document.createElement('div');
    c.className='fs-notif-card';
    c.innerHTML='<span class="fs-notif-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></span>'
      +'<div class="fs-notif-body"><b>'+d.t+' '+d.a+'</b><span>['+d.z+']</span><small>'+d.tm+'</small></div>';
    notifStack.appendChild(c);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ c.classList.add('visible'); }); });
    var all=notifStack.querySelectorAll('.fs-notif-card');
    if(all.length>3){ var old=all[0]; old.classList.add('out'); setTimeout(function(){ if(old.parentNode) old.remove(); },500); }
    ni++;
  }
  if(!noMotion){
    setTimeout(function(){ addNotif(); notifTimer=setInterval(addNotif,2800); },2200);
  }

  /* ── Phase 3: Scroll-driven crossfade ── */
  var ticking=false;
  function onScroll(){
    if(ticking) return; ticking=true;
    requestAnimationFrame(function(){
      ticking=false;
      var rect=wrapper.getBoundingClientRect();
      var wh=wrapper.offsetHeight, vh=window.innerHeight;
      var scrolled=-rect.top, total=wh-vh;
      if(total<=0) return;
      var p=Math.max(0,Math.min(1,scrolled/total));

      var mo=p<0.25?0: p>0.55?1: (p-0.25)/0.3;
      var wo=p<0.35?0: p>0.65?1: (p-0.35)/0.3;

      if(mobileLayer){
        mobileLayer.style.opacity = String(1-mo);
        mobileLayer.style.transform = 'scale('+(1-mo*0.25)+') translateY('+(-mo*50)+'px)';
        mobileLayer.style.pointerEvents = mo>0.5?'none':'auto';
      }
      if(webLayer){
        webLayer.style.opacity = String(wo);
        webLayer.style.transform = 'scale('+(0.75+wo*0.25)+')';
        webLayer.style.pointerEvents = wo<0.5?'none':'auto';
      }
    });
  }
  if(!noMotion){
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  } else {
    if(mobileLayer){ mobileLayer.style.opacity='1'; mobileLayer.style.transform='none'; }
  }

  /* ── Phase 4: Browser entrance ── */
  var browserAnimated = false;
  function animateBrowsers(){
    if(browserAnimated) return;
    browserAnimated = true;
    var delays = {'0':150, '1':0, '2':250};
    browsers.forEach(function(b){
      var t = browserTargets[b.dataset.pos] || {tx:0,ty:0};
      var finalTransform = 'translate(calc(-50% + '+t.tx+'px), calc(-50% + '+t.ty+'px))';
      var d = noMotion ? 0 : (delays[b.dataset.pos] || 0);

      setTimeout(function(){
        b.style.transition = noMotion ? 'none' : 'transform 0.8s cubic-bezier(0.22,0.61,0.36,1), opacity 0.8s cubic-bezier(0.22,0.61,0.36,1)';
        b.style.opacity = '1';
        b.style.transform = finalTransform;
      }, d);
    });
  }

  /* Trigger browser animation when web layer becomes visible via scroll */
  if(!noMotion){
    setInterval(function(){
      if(!webLayer || browserAnimated) return;
      var op = parseFloat(webLayer.style.opacity);
      if(!isNaN(op) && op > 0.3) animateBrowsers();
    }, 200);
  } else {
    animateBrowsers();
  }

  /* pause notif loop when mobile layer is invisible */
  if(!noMotion){
    setInterval(function(){
      if(!mobileLayer) return;
      var op=parseFloat(mobileLayer.style.opacity);
      if(isNaN(op)) op=1;
      if(op<0.15 && notifTimer){ clearInterval(notifTimer); notifTimer=null; }
    },1000);
  }

  /* ── Web Notification Stack ── */
  var webNotifStack = wrapper.querySelector('.fs-web-notif-stack');
  var webNotifs = [
    {a:'Speeding Detected',z:'Vehicle #30265 — 142 km/h in 80 zone',tm:'09:14'},
    {a:'Engine Idle > 15 min',z:'Vehicle #49357 — Al Quoz Industrial',tm:'09:38'},
    {a:'Unauthorized Zone Exit',z:'Vehicle #54016 — Left depot area',tm:'10:02'},
    {a:'Oil Change Overdue',z:'Vehicle #15833 — 2,400 km past',tm:'10:15'},
    {a:'Harsh Braking Event',z:'Vehicle #84357 — Sheikh Zayed Rd',tm:'10:41'},
    {a:'Abnormal Fuel Drop',z:'Vehicle #49357 — 12L drop detected',tm:'11:05'}
  ];
  var wni=0, webNotifTimer=null, webNotifsStarted=false;
  function addWebNotif(){
    if(!webNotifStack) return;
    var d=webNotifs[wni%webNotifs.length];
    var c=document.createElement('div');
    c.className='fs-notif-card';
    c.innerHTML='<span class="fs-notif-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a84ff" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>'
      +'<div class="fs-notif-body"><b>'+d.a+'</b><span>'+d.z+'</span><small>'+d.tm+'</small></div>';
    webNotifStack.appendChild(c);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ c.classList.add('visible'); }); });
    var all=webNotifStack.querySelectorAll('.fs-notif-card');
    if(all.length>3){ var old=all[0]; old.classList.add('out'); setTimeout(function(){ if(old.parentNode) old.remove(); },400); }
    wni++;
  }
  if(!noMotion){
    setInterval(function(){
      if(!webLayer || webNotifsStarted) return;
      var op=parseFloat(webLayer.style.opacity);
      if(!isNaN(op) && op>0.85){
        webNotifsStarted=true;
        setTimeout(function(){ addWebNotif(); webNotifTimer=setInterval(addWebNotif,3200); },1200);
      }
    },300);
  }
})();
