import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSmoothScroll() {
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function countUp(el, to, { duration = 2, suffix = '' } = {}) {
  const o = { v: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () =>
      gsap.to(o, {
        v: to,
        duration,
        ease: 'power2.out',
        onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('en') + suffix),
      }),
  });
}

export { gsap, ScrollTrigger };
