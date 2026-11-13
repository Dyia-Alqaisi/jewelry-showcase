import '../shared/base.css';
import './light.css';
import { contact, products, whatsappLink } from '../shared/config.js';
import { jewelrySVG, icons } from '../shared/jewelry.js';
import { createI18n } from '../shared/i18n.js';
import { initSmoothScroll, gsap, ScrollTrigger, reducedMotion } from '../shared/motion.js';
import { copy } from './copy.js';

const app = document.getElementById('app');
const ico = (n) => `<span class="ico">${icons[n]}</span>`;
const t = (k) => `data-i18n="${k}"`;

/* ---------- generated Arabic geometric pattern ---------- */
function starPoly(R, r, n = 8, rot = -Math.PI / 2) {
  let p = '';
  for (let i = 0; i < n * 2; i++) {
    const a = (Math.PI / n) * i + rot;
    const rad = i % 2 === 0 ? R : r;
    p += `${(Math.cos(a) * rad).toFixed(1)},${(Math.sin(a) * rad).toFixed(1)} `;
  }
  return p.trim();
}
const pattern = `
<svg viewBox="-250 -250 500 500" class="pattern" aria-hidden="true" fill="none" stroke="currentColor" stroke-width=".7">
  <circle r="244"/><circle r="206" stroke-dasharray="2 6"/>
  <polygon points="${starPoly(236, 150, 8)}"/>
  <polygon points="${starPoly(236, 150, 8, -Math.PI / 2 + Math.PI / 8)}"/>
  <polygon points="${starPoly(170, 100, 8)}"/>
  <polygon points="${starPoly(120, 70, 16)}"/>
  <circle r="64"/><circle r="40"/>
</svg>`;

const whyIcons = {
  hand: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 28c0-4 2-6 5-6h3V12a3 3 0 0 1 6 0v8h2v-6a3 3 0 0 1 6 0v8h2v-4a3 3 0 0 1 6 0v12c0 8-6 14-14 14s-18-6-18-14z" transform="translate(-2 -2)"/></svg>',
  seal: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="22" r="13"/><path d="M17 33l-3 11 10-5 10 5-3-11"/><path d="M18 22l4 4 8-8"/></svg>',
  gift: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="19" width="34" height="23" rx="2"/><path d="M5 13h38v6H5zM24 13v29M24 13c-4-8-12-6-10 0M24 13c4-8 12-6 10 0"/></svg>',
};

app.innerHTML = `
<header class="bar" id="bar">
  <a href="#top" class="logo"><b ${t('brand')}></b><small ${t('brand_sub')}></small></a>
  <nav class="menu">
    <a href="#collections" ${t('nav_collections')}></a>
    <a href="#why" ${t('nav_why')}></a>
    <a href="#craft" ${t('nav_craft')}></a>
    <a href="#visit" ${t('nav_visit')}></a>
  </nav>
  <button class="lang" id="lang" ${t('lang_btn')}></button>
</header>

<main>
  <section class="hero" id="top">
    <div class="hero-pattern">${pattern}</div>
    <div class="hero-copy">
      <p class="eyebrow" ${t('hero_eyebrow')}></p>
      <h1 ${t('hero_title')}></h1>
      <p class="hero-sub" ${t('hero_sub')}></p>
      <div class="cta-row">
        <a href="#collections" class="btn btn-dark"><span ${t('cta_explore')}></span>${ico('arrow')}</a>
        <a class="btn btn-line" data-wa href="#" target="_blank" rel="noopener">${ico('whatsapp')}<span ${t('cta_wa')}></span></a>
      </div>
    </div>
    <div class="hero-visual" id="heroVisual">
      <div class="arch">
        <div class="arch-in">
          <svg class="draw" viewBox="0 0 200 200" aria-hidden="true">
            <g fill="none" stroke="#b08a3e" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="100" cy="130" r="47" pathLength="1"/><circle cx="100" cy="130" r="53" pathLength="1"/>
              <polygon points="78,60 88,48 112,48 122,60 100,92" pathLength="1"/>
              <path d="M78 60H122M88 48L100 60L112 48" pathLength="1"/>
            </g>
          </svg>
          <div class="hero-art" id="heroArt">${jewelrySVG('ring')}</div>
        </div>
      </div>
      <i class="float f1">${jewelrySVG('ring')}</i>
      <i class="float f2">${jewelrySVG('pendant')}</i>
    </div>
  </section>

  <div class="marquee" aria-hidden="true"><div class="marquee-track">
    <span ${t('marquee')}></span><span ${t('marquee')}></span><span ${t('marquee')}></span><span ${t('marquee')}></span>
  </div></div>

  <section class="why" id="why">
    <p class="eyebrow" ${t('why_eyebrow')}></p>
    <h2 class="split" ${t('why_title')}></h2>
    <div class="why-grid">
      <div class="why-item"><span class="why-ico">${whyIcons.hand}</span><h3 ${t('w1_t')}></h3><p ${t('w1_d')}></p></div>
      <div class="why-item"><span class="why-ico">${whyIcons.seal}</span><h3 ${t('w2_t')}></h3><p ${t('w2_d')}></p></div>
      <div class="why-item"><span class="why-ico">${whyIcons.gift}</span><h3 ${t('w3_t')}></h3><p ${t('w3_d')}></p></div>
    </div>
  </section>

  <section class="collections" id="collections">
    <p class="eyebrow" ${t('col_eyebrow')}></p>
    <h2 ${t('col_title')}></h2>
    <div class="grid">
      ${products
        .map(
          (p) => `
      <button class="tile" data-id="${p.id}">
        <span class="tile-arch"><span class="tile-art">${jewelrySVG(p.type)}</span></span>
        <span class="tile-meta">
          <span class="tile-name" data-ar="${p.name.ar}" data-en="${p.name.en}"></span>
          <span class="tile-k">${p.karat}</span>
        </span>
      </button>`
        )
        .join('')}
    </div>
  </section>

  <section class="bridal">
    <div class="bridal-art"><div class="b-arch"><div class="b-art">${jewelrySVG('set')}</div></div></div>
    <div class="bridal-copy">
      <p class="eyebrow" ${t('bridal_eyebrow')}></p>
      <h2 ${t('bridal_title')}></h2>
      <p ${t('bridal_text')}></p>
      <a class="btn btn-gold" data-wa-product="set" href="#" target="_blank" rel="noopener">${ico('whatsapp')}<span ${t('bridal_cta')}></span></a>
    </div>
  </section>

  <section class="craft" id="craft">
    <p class="eyebrow" ${t('proc_eyebrow')}></p>
    <h2 ${t('proc_title')}></h2>
    <div class="steps">
      <i class="steps-line"><b id="stepsFill"></b></i>
      <div class="step"><span class="step-n">01</span><div><h3 ${t('p1')}></h3><p ${t('p1d')}></p></div></div>
      <div class="step"><span class="step-n">02</span><div><h3 ${t('p2')}></h3><p ${t('p2d')}></p></div></div>
      <div class="step"><span class="step-n">03</span><div><h3 ${t('p3')}></h3><p ${t('p3d')}></p></div></div>
    </div>
  </section>

  <section class="reviews">
    <h2 ${t('rev_title')}></h2>
    <div class="rev-track">
      <figure class="rev"><blockquote ${t('r1')}></blockquote><figcaption ${t('r1n')}></figcaption></figure>
      <figure class="rev"><blockquote ${t('r2')}></blockquote><figcaption ${t('r2n')}></figcaption></figure>
      <figure class="rev"><blockquote ${t('r3')}></blockquote><figcaption ${t('r3n')}></figcaption></figure>
    </div>
  </section>

  <section class="visit" id="visit">
    <p class="eyebrow" ${t('visit_eyebrow')}></p>
    <h2 ${t('visit_title')}></h2>
    <p class="visit-text" ${t('visit_text')}></p>
    <div class="social">
      <a class="soc soc-wa" data-wa href="#" target="_blank" rel="noopener">${ico('whatsapp')}<span ${t('social_wa')}></span></a>
      <a class="soc" href="${contact.instagram}" target="_blank" rel="noopener">${ico('instagram')}<span ${t('social_ig')}></span></a>
      <a class="soc" href="${contact.facebook}" target="_blank" rel="noopener">${ico('facebook')}<span ${t('social_fb')}></span></a>
    </div>
    <div class="info">
      <a href="${contact.mapsUrl}" target="_blank" rel="noopener">${ico('pin')}<span data-ar="${contact.address.ar}" data-en="${contact.address.en}"></span></a>
      <span>${ico('clock')}<span data-ar="${contact.hours.ar}" data-en="${contact.hours.en}"></span></span>
    </div>
  </section>
</main>

<footer class="foot"><span ${t('footer')}></span></footer>
<a class="fab" data-wa href="#" target="_blank" rel="noopener" data-i18n-label="aria_wa">${ico('whatsapp')}</a>

<div class="modal" id="modal" hidden>
  <div class="modal-back" data-close></div>
  <div class="sheet" role="dialog" aria-modal="true">
    <button class="x" data-close data-i18n-label="close" aria-label="close">×</button>
    <div class="sheet-art" id="sheetArt"></div>
    <div class="sheet-body">
      <span class="tile-k" id="sheetK"></span>
      <h3 id="sheetName"></h3>
      <p id="sheetDesc"></p>
      <a class="btn btn-dark" id="sheetWa" href="#" target="_blank" rel="noopener">${ico('whatsapp')}<span ${t('ask_wa')}></span></a>
    </div>
  </div>
</div>
`;

/* ---------- i18n ---------- */
let openId = null;
const i18n = createI18n(copy, () => {
  refreshLinks();
  if (openId) fillSheet(openId);
  buildScroll();
});

function refreshLinks() {
  document.querySelectorAll('[data-wa]').forEach((a) => (a.href = whatsappLink(i18n.lang)));
  document.querySelectorAll('[data-wa-product]').forEach((a) => {
    const p = products.find((x) => x.id === a.dataset.waProduct);
    a.href = whatsappLink(i18n.lang, p.name[i18n.lang]);
  });
}
i18n.apply();
refreshLinks();
document.getElementById('lang').addEventListener('click', () => i18n.toggle());

/* ---------- smooth scroll ---------- */
const lenis = initSmoothScroll();
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    e.preventDefault();
    id === '#top' ? lenis.scrollTo(0) : lenis.scrollTo(id, { offset: -60 });
  })
);

/* ---------- product quick view ---------- */
const modal = document.getElementById('modal');
function fillSheet(id) {
  const p = products.find((x) => x.id === id);
  const L = i18n.lang;
  document.getElementById('sheetArt').innerHTML = jewelrySVG(p.type);
  document.getElementById('sheetK').textContent = p.karat;
  document.getElementById('sheetName').textContent = p.name[L];
  document.getElementById('sheetDesc').textContent = copy[L]['desc_' + id];
  document.getElementById('sheetWa').href = whatsappLink(L, p.name[L]);
}
function openSheet(id) {
  openId = id;
  fillSheet(id);
  modal.hidden = false;
  lenis.stop();
  gsap.fromTo('.sheet', { yPercent: 8, opacity: 0, scale: 0.97 }, { yPercent: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
  gsap.fromTo('.modal-back', { opacity: 0 }, { opacity: 1, duration: 0.4 });
  gsap.fromTo('#sheetArt .jewel', { scale: 0.8, rotate: -8 }, { scale: 1, rotate: 0, duration: 1, ease: 'elastic.out(1,.6)' });
}
function closeSheet() {
  gsap.to('.sheet', { yPercent: 6, opacity: 0, duration: 0.3, onComplete: () => { modal.hidden = true; openId = null; lenis.start(); } });
  gsap.to('.modal-back', { opacity: 0, duration: 0.3 });
}
document.querySelectorAll('.tile').forEach((b) => b.addEventListener('click', () => openSheet(b.dataset.id)));
modal.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', closeSheet));
window.addEventListener('keydown', (e) => e.key === 'Escape' && !modal.hidden && closeSheet());

/* ---------- scroll choreography ---------- */
let ctx;
function buildScroll() {
  ctx && ctx.revert();
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => document.getElementById('bar').classList.toggle('solid', s.scroll() > 40),
    });

    // hero pattern turns with scroll
    gsap.to('.hero-pattern', {
      rotate: 90, scale: 1.15, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.hero-visual', {
      yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // headings: mask rise
    gsap.utils.toArray('.light h2, .eyebrow').forEach((el) => {
      if (el.closest('.hero')) return;
      gsap.from(el, {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
    });

    gsap.utils.toArray('.why-item').forEach((el, i) =>
      gsap.from(el, {
        y: 60, opacity: 0, duration: 1, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    );

    // collection tiles: arch grows open + art parallax
    gsap.utils.toArray('.tile').forEach((el, i) => {
      gsap.from(el.querySelector('.tile-arch'), {
        clipPath: 'inset(35% 20% 0% 20% round 200px 200px 0 0)', opacity: 0.2, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
      gsap.fromTo(
        el.querySelector('.tile-art'),
        { yPercent: 10 },
        { yPercent: -10, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    });

    // bridal
    gsap.from('.b-art', {
      rotate: -14, scale: 0.8, ease: 'none',
      scrollTrigger: { trigger: '.bridal', start: 'top 85%', end: 'center 50%', scrub: true },
    });
    gsap.to('.bridal-art .b-arch', {
      yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: '.bridal', start: 'top bottom', end: 'bottom top', scrub: true },
    });

    // process line fills with scroll
    gsap.fromTo('#stepsFill', { scaleY: 0 }, {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 60%', scrub: true },
    });
    gsap.utils.toArray('.step').forEach((el) =>
      gsap.from(el, {
        x: document.documentElement.dir === 'rtl' ? 40 : -40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    );

    gsap.utils.toArray('.rev, .soc, .visit-text, .info').forEach((el, i) =>
      gsap.from(el, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 94%', once: true },
      })
    );
  });
  ScrollTrigger.refresh();
}
buildScroll();

/* ---------- hero intro + pointer parallax ---------- */
const intro = gsap.timeline({ delay: 0.2 });
intro
  .from('.hero-pattern', { opacity: 0, scale: 0.7, rotate: -40, duration: 2, ease: 'power3.out' })
  .from('.arch', { clipPath: 'inset(100% 0 0 0 round 400px 400px 0 0)', duration: 1.4, ease: 'power4.inOut' }, 0.1)
  .from('.draw *', { strokeDasharray: 1, strokeDashoffset: 1, duration: 1.6, ease: 'power2.inOut', stagger: 0.12 }, 0.6)
  .from('.hero-art', { opacity: 0, scale: 0.85, duration: 1.2, ease: 'power3.out' }, 1.8)
  .to('.draw', { opacity: 0, duration: 0.8 }, 2.4)
  .from('.hero-copy > *', { y: 36, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, 0.5)
  .from('.bar', { yPercent: -100, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.4)
  .from('.float', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.7)', stagger: 0.15 }, 2);

if (!reducedMotion) {
  const v = document.getElementById('heroVisual');
  const move = (x, y) => {
    gsap.to('.arch', { x: x * 14, y: y * 10, duration: 0.8, ease: 'power2.out' });
    gsap.to('.f1', { x: x * -30, y: y * -20, duration: 1, ease: 'power2.out' });
    gsap.to('.f2', { x: x * 36, y: y * 26, duration: 1, ease: 'power2.out' });
    gsap.to('.hero-pattern', { x: x * -10, y: y * -8, duration: 1.2, ease: 'power2.out' });
  };
  window.addEventListener('pointermove', (e) => move(e.clientX / innerWidth - 0.5, e.clientY / innerHeight - 0.5));
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma != null) move(Math.max(-0.5, Math.min(0.5, e.gamma / 40)), Math.max(-0.5, Math.min(0.5, ((e.beta || 45) - 45) / 40)));
  });
}
