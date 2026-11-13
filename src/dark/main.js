import '../shared/base.css';
import './dark.css';
import { contact, products, whatsappLink } from '../shared/config.js';
import { jewelrySVG, icons } from '../shared/jewelry.js';
import { createI18n, splitWords } from '../shared/i18n.js';
import { initSmoothScroll, countUp, gsap, ScrollTrigger, reducedMotion } from '../shared/motion.js';
import { copy } from './copy.js';

const app = document.getElementById('app');
const ico = (n) => `<span class="ico">${icons[n]}</span>`;
const t = (k) => `data-i18n="${k}"`;

app.innerHTML = `
<div class="grain"></div>
<div class="loader" id="loader">
  <svg viewBox="0 0 100 100" class="loader-gem"><polygon points="50,86 14,40 30,18 70,18 86,40" fill="none" stroke="currentColor" stroke-width="1.4" pathLength="1"/><path d="M14 40H86M30 18L50 40L70 18M50 40V86" fill="none" stroke="currentColor" stroke-width="1" pathLength="1"/></svg>
  <span class="loader-name" ${t('brand')}></span>
</div>

<header class="bar" id="bar">
  <a href="#top" class="logo"><b ${t('brand')}></b><small ${t('brand_sub')}></small></a>
  <nav class="menu">
    <a href="#collections" ${t('nav_collections')}></a>
    <a href="#story" ${t('nav_story')}></a>
    <a href="#karats" ${t('nav_karats')}></a>
    <a href="#visit" ${t('nav_visit')}></a>
  </nav>
  <button class="lang" id="lang" ${t('lang_btn')}></button>
</header>

<main>
  <section class="hero" id="top">
    <div class="hero-bg"></div>
    <div class="hero-copy" id="heroCopy">
      <p class="eyebrow" ${t('hero_eyebrow')}></p>
      <h1 ${t('hero_title')}></h1>
      <p class="hero-sub" ${t('hero_sub')}></p>
      <div class="cta-row">
        <a href="#collections" class="btn btn-gold"><span ${t('cta_explore')}></span>${ico('arrow')}</a>
        <a class="btn btn-ghost" data-wa href="#" target="_blank" rel="noopener">${ico('whatsapp')}<span ${t('cta_wa')}></span></a>
      </div>
    </div>
    <canvas id="gl" aria-hidden="true"></canvas>
    <div class="scroll-cue"><span ${t('scroll')}></span><i></i></div>
  </section>

  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span ${t('marquee')}></span><span ${t('marquee')}></span><span ${t('marquee')}></span><span ${t('marquee')}></span>
    </div>
  </div>

  <section class="story" id="story">
    <p class="eyebrow" ${t('story_eyebrow')}></p>
    <p class="story-text" id="storyText"></p>
  </section>

  <section class="collections" id="collections">
    <div class="col-pin" id="colPin">
      <div class="col-head">
        <p class="eyebrow" ${t('col_eyebrow')}></p>
        <h2 ${t('col_title')}></h2>
      </div>
      <div class="col-track" id="colTrack">
        ${products
          .map(
            (p, i) => `
        <article class="card" data-id="${p.id}">
          <div class="card-art">
            <span class="card-num">0${i + 1}</span>
            <div class="art">${jewelrySVG(p.type)}</div>
          </div>
          <div class="card-info">
            <div>
              <h3 data-ar="${p.name.ar}" data-en="${p.name.en}"></h3>
              <span class="chip">${p.karat}</span>
            </div>
            <a class="ask" data-wa-product="${p.id}" href="#" target="_blank" rel="noopener" aria-label="WhatsApp">${ico('whatsapp')}</a>
          </div>
        </article>`
          )
          .join('')}
      </div>
      <div class="col-progress"><i id="colBar"></i></div>
    </div>
  </section>

  <section class="stats">
    <div><b data-count="25" data-suffix="+">0</b><span ${t('stat_years')}></span></div>
    <div><b data-count="300" data-suffix="+">0</b><span ${t('stat_designs')}></span></div>
    <div><b data-count="5000" data-suffix="+">0</b><span ${t('stat_clients')}></span></div>
  </section>

  <section class="karats" id="karats">
    <p class="eyebrow" ${t('kar_eyebrow')}></p>
    <h2 ${t('kar_title')}></h2>
    <div class="kar-grid">
      <div class="kar"><b>24</b><p ${t('k24')}></p></div>
      <div class="kar kar-main"><b>21</b><p ${t('k21')}></p></div>
      <div class="kar"><b>18</b><p ${t('k18')}></p></div>
    </div>
  </section>

  <section class="visit" id="visit">
    <div class="visit-ring">${jewelrySVG('ring')}</div>
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
<a class="fab" data-wa href="#" target="_blank" rel="noopener" ${'data-i18n-label="aria_wa"'}>${ico('whatsapp')}</a>
`;

/* ---------- i18n ---------- */
const i18n = createI18n(copy, () => {
  refreshLinks();
  buildStory();
  buildScroll();
});

function refreshLinks() {
  document.querySelectorAll('[data-wa]').forEach((a) => (a.href = whatsappLink(i18n.lang)));
  document.querySelectorAll('[data-wa-product]').forEach((a) => {
    const p = products.find((x) => x.id === a.dataset.waProduct);
    a.href = whatsappLink(i18n.lang, p.name[i18n.lang]);
  });
}

function buildStory() {
  const el = document.getElementById('storyText');
  el.textContent = copy[i18n.lang].story;
  splitWords(el);
}

i18n.apply();
refreshLinks();
buildStory();
document.getElementById('lang').addEventListener('click', () => i18n.toggle());

document.querySelectorAll('[data-count]').forEach((el) =>
  countUp(el, +el.dataset.count, { suffix: el.dataset.suffix || '' })
);

/* ---------- smooth scroll ---------- */
const lenis = initSmoothScroll();
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      lenis.scrollTo(id, { offset: -10 });
    } else if (id === '#top') {
      e.preventDefault();
      lenis.scrollTo(0);
    }
  })
);

/* ---------- hero 3D ---------- */
let scene = null;
(async () => {
  try {
    const { createScene } = await import('./scene.js');
    scene = createScene(document.getElementById('gl'));
  } catch (err) {
    console.warn('WebGL unavailable, using illustration fallback', err);
    const fb = document.createElement('div');
    fb.className = 'hero-fallback';
    fb.innerHTML = jewelrySVG('ring');
    document.querySelector('.hero').appendChild(fb);
    document.getElementById('gl').remove();
  }
})();

/* ---------- scroll choreography ---------- */
let ctx;
function buildScroll() {
  ctx && ctx.revert();
  ctx = gsap.context(() => {
    // hero: ring spins/lifts as you scroll, copy fades
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => scene && scene.setProgress(self.progress),
    });
    gsap.to('#heroCopy', {
      yPercent: -18, opacity: 0.0, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '20% top', end: 'bottom top', scrub: true },
    });

    // nav background
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (s) => document.getElementById('bar').classList.toggle('solid', s.scroll() > 60),
    });

    // story words
    gsap.fromTo(
      '.story-text .w',
      { opacity: 0.12 },
      {
        opacity: 1, ease: 'none', stagger: 0.12,
        scrollTrigger: { trigger: '.story-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
      }
    );

    // collections: pinned horizontal run
    const track = document.getElementById('colTrack');
    const rtl = document.documentElement.dir === 'rtl';
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 48);
    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: () => (rtl ? 1 : -1) * dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: '#colPin',
          pin: true,
          scrub: 0.6,
          start: 'top top',
          end: () => '+=' + dist(),
          invalidateOnRefresh: true,
          onUpdate: (self) => (document.getElementById('colBar').style.transform = `scaleX(${self.progress})`),
        },
      }
    );
    gsap.utils.toArray('.card').forEach((c, i) => {
      gsap.from(c.querySelector('.art'), {
        yPercent: 12, rotate: i % 2 ? 6 : -6, scale: 0.86, ease: 'none',
        scrollTrigger: { trigger: '#colPin', start: 'top 90%', end: 'top 10%', scrub: true },
      });
    });

    // generic reveals
    gsap.utils.toArray('.stats > div, .kar, .soc, .visit h2, .visit-text, .karats h2, .info').forEach((el) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });
    gsap.to('.visit-ring', {
      rotate: 360, ease: 'none',
      scrollTrigger: { trigger: '.visit', start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  ScrollTrigger.refresh();
}
buildScroll();

/* ---------- card tilt (desktop) ---------- */
if (window.matchMedia('(hover:hover)').matches && !reducedMotion) {
  document.querySelectorAll('.card-art').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(c, { rotateY: x * 10, rotateX: -y * 10, duration: 0.5, transformPerspective: 800 });
      c.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      c.style.setProperty('--my', `${(y + 0.5) * 100}%`);
    });
    c.addEventListener('pointerleave', () => gsap.to(c, { rotateX: 0, rotateY: 0, duration: 0.7 }));
  });
}

/* ---------- intro ---------- */
lenis.stop();
const intro = gsap.timeline({ delay: 0.15 });
intro
  .from('.loader-gem *', { strokeDasharray: 1, strokeDashoffset: 1, duration: 1.3, ease: 'power2.inOut', stagger: 0.15 })
  .from('.loader-name', { opacity: 0, y: 14, duration: 0.7 }, '-=0.6')
  .to('#loader', { yPercent: -100, duration: 1, ease: 'power4.inOut', delay: 0.25 })
  .from('.hero-copy > *', { y: 46, opacity: 0, filter: 'blur(8px)', duration: 1.2, ease: 'power3.out', stagger: 0.12 }, '-=0.45')
  .from('.bar', { yPercent: -100, opacity: 0, duration: 0.9, ease: 'power3.out' }, '<')
  .from('#gl, .hero-fallback', { opacity: 0, scale: 0.9, duration: 1.6, ease: 'power2.out' }, '<')
  .add(() => {
    lenis.start();
    document.getElementById('loader').remove();
  });
