// Tiny bilingual helper. Arabic (RTL) is the default.
// Use data-i18n="key" for copy dictionaries, data-ar / data-en for inline text.

const KEY = 'jewelry-lang';

export function createI18n(dict, onChange) {
  let lang = 'ar';
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'ar' || saved === 'en') lang = saved;
  } catch {}

  function apply(root = document) {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === 'ar' ? 'rtl' : 'ltr';
    root.querySelectorAll('[data-i18n]').forEach((n) => {
      const v = dict[lang][n.dataset.i18n];
      if (v != null) n.innerHTML = v;
    });
    root.querySelectorAll('[data-ar]').forEach((n) => {
      n.textContent = n.dataset[lang];
    });
    root.querySelectorAll('[data-i18n-label]').forEach((n) => {
      const v = dict[lang][n.dataset.i18nLabel];
      if (v != null) n.setAttribute('aria-label', v);
    });
    if (dict[lang].title) document.title = dict[lang].title;
  }

  function set(next) {
    lang = next;
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
    apply();
    if (onChange) onChange(lang);
  }

  return {
    get lang() {
      return lang;
    },
    apply,
    set,
    toggle: () => set(lang === 'ar' ? 'en' : 'ar'),
  };
}

// Wrap each word in a span (for scroll-scrubbed text reveals).
export function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(' ');
  return el.querySelectorAll('.w');
}
