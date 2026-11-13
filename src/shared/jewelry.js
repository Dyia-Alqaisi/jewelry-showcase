// Placeholder jewellery illustrations generated in code (no photos needed).
// Swap for real <img> product shots when the client supplies them.

let uid = 0;

const defs = (id) => `
<defs>
  <linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff3c9"/><stop offset=".22" stop-color="#ecc864"/>
    <stop offset=".5" stop-color="#b98a2a"/><stop offset=".74" stop-color="#f6dd8f"/>
    <stop offset="1" stop-color="#8a5f17"/>
  </linearGradient>
  <linearGradient id="d${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#d9a93d"/><stop offset="1" stop-color="#6e4a10"/>
  </linearGradient>
  <linearGradient id="m${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#cfe9ff"/><stop offset="1" stop-color="#86bbe8"/>
  </linearGradient>
</defs>`;

const gem = (x, y, s, id) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <polygon points="-22,-6 -12,-18 12,-18 22,-6 0,26" fill="url(#m${id})"/>
  <polygon points="-22,-6 22,-6 0,26" fill="#8fc6f2" opacity=".5"/>
  <polygon points="-12,-18 0,-6 -22,-6" fill="#fff" opacity=".75"/>
  <polygon points="12,-18 0,-6 22,-6" fill="#dff1ff" opacity=".65"/>
  <polygon points="-12,-18 12,-18 0,-6" fill="#fff" opacity=".95"/>
  <path d="M-22 -6L0 26L22 -6M-12 -18L0 -6L12 -18M-22 -6H22" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width=".8"/>
</g>`;

const spark = (x, y, s = 1, delay = 0) => `
<path class="spark" style="animation-delay:${delay}s" transform="translate(${x} ${y}) scale(${s})"
  d="M0 -9 Q1 -1 9 0 Q1 1 0 9 Q-1 1 -9 0 Q-1 -1 0 -9Z" fill="#fff"/>`;

const star8 = (cx, cy, R, r) => {
  let p = '';
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i - Math.PI / 2;
    const rad = i % 2 === 0 ? R : r;
    p += `${(cx + Math.cos(a) * rad).toFixed(2)},${(cy + Math.sin(a) * rad).toFixed(2)} `;
  }
  return p.trim();
};

const dotted = (d, id, w = 3.2) =>
  `<path d="${d}" fill="none" stroke="url(#g${id})" stroke-width="${w}" stroke-linecap="round" stroke-dasharray="0.1 5.6"/>`;

const drop = (x, y, s, id) => `
<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M0 -22 L0 -2" stroke="url(#g${id})" stroke-width="3" stroke-linecap="round"/>
  <path d="M0 -4 C-17 6 -17 34 0 46 C17 34 17 6 0 -4Z" fill="url(#g${id})"/>
  <g transform="translate(0 20) scale(.55)">
    <polygon points="-22,-6 -12,-18 12,-18 22,-6 0,26" fill="url(#m${id})"/>
    <polygon points="-12,-18 12,-18 0,-6" fill="#fff"/>
  </g>
</g>`;

const parts = {
  ring: (id) => `
    <circle cx="100" cy="130" r="47" fill="none" stroke="url(#g${id})" stroke-width="13"/>
    <circle cx="100" cy="130" r="53.5" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.4"/>
    <path d="M80 84 L91 94 M120 84 L109 94" stroke="url(#g${id})" stroke-width="4" stroke-linecap="round"/>
    ${gem(100, 66, 1.15, id)}${spark(128, 52, 1, 0)}${spark(74, 60, 0.6, 1.1)}`,

  necklace: (id) => `
    ${dotted('M26 26 Q100 196 174 26', id, 3.6)}
    ${dotted('M38 22 Q100 168 162 22', id, 2.2)}
    <circle cx="100" cy="112" r="4.2" fill="none" stroke="url(#g${id})" stroke-width="2.4"/>
    ${gem(100, 132, 0.85, id)}${spark(118, 124, 0.8, 0.3)}`,

  earrings: (id) => `
    <path d="M62 14 q-12 0 -12 14" fill="none" stroke="url(#g${id})" stroke-width="3" stroke-linecap="round"/>
    <path d="M138 14 q12 0 12 14" fill="none" stroke="url(#g${id})" stroke-width="3" stroke-linecap="round"/>
    <circle cx="62" cy="34" r="7.5" fill="url(#g${id})"/><circle cx="138" cy="34" r="7.5" fill="url(#g${id})"/>
    ${drop(62, 62, 1.15, id)}${drop(138, 62, 1.15, id)}${spark(158, 70, 0.8, 0.5)}`,

  bracelet: (id) => {
    let g = '';
    [32, 52, 72, 90, 108, 128, 148].forEach((deg, i) => {
      const a = (deg * Math.PI) / 180;
      const x = 100 + Math.cos(a) * 72;
      const y = 108 + Math.sin(a) * 34;
      g += gem(x.toFixed(1), (y - 4).toFixed(1), i === 3 ? 0.5 : 0.32, id);
    });
    return `
      <ellipse cx="100" cy="106" rx="74" ry="36" fill="none" stroke="url(#d${id})" stroke-width="16" opacity=".55"/>
      <ellipse cx="100" cy="108" rx="72" ry="34" fill="none" stroke="url(#g${id})" stroke-width="14"/>
      <ellipse cx="100" cy="108" rx="79" ry="40" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.3"/>
      ${g}${spark(52, 84, 0.8, 0.2)}${spark(150, 128, 0.7, 1.4)}`;
  },

  pendant: (id) => `
    ${dotted('M34 14 L100 74', id, 3)}${dotted('M166 14 L100 74', id, 3)}
    <circle cx="100" cy="76" r="5" fill="none" stroke="url(#g${id})" stroke-width="3"/>
    <circle cx="100" cy="122" r="40" fill="url(#g${id})"/>
    <circle cx="100" cy="122" r="33" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1"/>
    <polygon points="${star8(100, 122, 28, 13)}" fill="url(#d${id})"/>
    <circle cx="100" cy="122" r="7" fill="#fff" opacity=".9"/>
    ${spark(132, 96, 1, 0.6)}`,

  set: (id) => `
    ${dotted('M30 16 Q100 120 170 16', id, 3)}
    ${gem(100, 70, 0.6, id)}
    ${drop(46, 132, 0.62, id)}${drop(154, 132, 0.62, id)}
    <circle cx="100" cy="168" r="17" fill="none" stroke="url(#g${id})" stroke-width="6"/>
    ${gem(100, 146, 0.5, id)}${spark(150, 60, 0.8, 0.4)}`,
};

export function jewelrySVG(type, { className = '' } = {}) {
  const id = ++uid;
  const body = (parts[type] || parts.ring)(id);
  return `<svg class="jewel ${className}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${defs(id)}${body}</svg>`;
}

export const icons = {
  whatsapp:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z"/><path d="M9 9.2c0 3 2.8 5.8 5.8 5.8l1.4-1.5-2-1-1 .7c-1-.4-2-1.4-2.4-2.4l.7-1-1-2L9 9.2z" fill="currentColor" stroke="none"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8s-1.4-.3-2.8-.3c-2.8 0-4.5 1.7-4.5 4.7v2.3H6.8v3.3h2.8V22h3.9z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
