(()=>{'use strict';
 const d=document, body=d.body;
 const menuButton=d.querySelector('[data-menu-toggle]');
 const mobileNav=d.querySelector('#mobile-nav');
 const drawer=d.querySelector('#contact-drawer');
 const overlay=d.querySelector('[data-drawer-overlay]');
 const toast=d.querySelector('[data-toast]');
 let priorFocus=null, toastTimer=null;
 function toggleMenu(open){if(!menuButton||!mobileNav)return;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobileNav.hidden=!open;}
 menuButton?.addEventListener('click',()=>toggleMenu(menuButton.getAttribute('aria-expanded')!=='true'));
 d.addEventListener('click',e=>{if(mobileNav&&!mobileNav.hidden&&!e.target.closest('.mobile-nav')&&!e.target.closest('.menu-toggle'))toggleMenu(false);});
 mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
 function openDrawer(){if(!drawer||!overlay)return;priorFocus=d.activeElement;toggleMenu(false);overlay.hidden=false;drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');body.classList.add('drawer-open');requestAnimationFrame(()=>overlay.classList.add('is-visible'));drawer.querySelector('[data-close-contact]')?.focus();}
 function closeDrawer(){if(!drawer||!overlay)return;drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true');body.classList.remove('drawer-open');overlay.classList.remove('is-visible');setTimeout(()=>{if(!drawer.classList.contains('is-open'))overlay.hidden=true;},320);if(priorFocus instanceof HTMLElement)priorFocus.focus();}
 d.querySelectorAll('[data-open-contact]').forEach(el=>el.addEventListener('click',openDrawer));
 d.querySelectorAll('[data-close-contact]').forEach(el=>el.addEventListener('click',closeDrawer));
 overlay?.addEventListener('click',closeDrawer);
 d.addEventListener('keydown',e=>{if(e.key==='Escape'){if(drawer?.classList.contains('is-open'))closeDrawer();else toggleMenu(false);}if(e.key==='Tab'&&drawer?.classList.contains('is-open')){const nodes=[...drawer.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(x=>x.getClientRects().length>0);if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&d.activeElement===first){last.focus();e.preventDefault();}else if(!e.shiftKey&&d.activeElement===last){first.focus();e.preventDefault();}}});
 function notify(message){if(!toast)return;toast.textContent=message;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600);}
 d.querySelectorAll('[data-copy-email]').forEach(el=>el.addEventListener('click',async()=>{const email='stepphaniegaspar14@gmail.com';try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(email);}else{const input=d.createElement('textarea');input.value=email;input.style.position='fixed';input.style.opacity='0';d.body.appendChild(input);input.select();if(!d.execCommand('copy'))throw new Error('Copy unsuccessful');input.remove();}notify('Email address copied!');}catch(e){notify('Select the email address to copy it.');}}));
 d.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();