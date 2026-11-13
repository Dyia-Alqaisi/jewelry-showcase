# Jewelry Showcase

Bilingual (Arabic RTL / English) pitch prototype for jewelry shops. Two themes, one codebase:

| Theme | Page | Feel |
|---|---|---|
| **Layali — dark & gold, cinematic** | `/dark.html` | 3D gold ring + gem, gold dust, pinned scroll storytelling |
| **Noor — light & minimal** | `/light.html` | Ivory/champagne, Arabic geometric motifs, line-art that draws itself |

All jewelry visuals are **placeholders generated in code** (no photos). All shop details live in
[`src/shared/config.js`](src/shared/config.js) — swap name, colours, products, WhatsApp/Facebook/Instagram and the site is customised for a client.

## Run
```bash
npm install
npm run dev      # open the printed LAN URL on your phone too
npm run build
```

## Git workflow
- `main` is always deployable; every push to `main` deploys to GitHub Pages.
- Every change: branch from `main` → commit → merge back with `--no-ff` → push.

```bash
git checkout main && git pull
git checkout -b feature/my-change
# ...work, commit...
git checkout main && git merge --no-ff feature/my-change && git push
```

## Customise for a client
1. Edit `src/shared/config.js` (names, contacts, products, copy).
2. Replace generated SVG pieces in `src/shared/jewelry.js` with real photos (`<img>`) when available.
3. Colours are CSS variables at the top of `src/dark/dark.css` and `src/light/light.css`.
