# Brand logos

Drop brand logo files here, then reference them from `data/brands.js`:

```js
{ name: "Forst", logo: "assets/logos/forst.svg", url: "https://..." }
```

Tips:
- **SVG** is best (sharp at any size). PNG with a **transparent background**
  also works.
- Keep filenames lowercase, no spaces (e.g. `husqvarna.svg`).
- If a brand has no logo file yet, leave `logo: ""` — the wall shows the
  brand name as text instead, so the page never breaks.

Note: brand logos are trademarks. Use official logos in line with each
brand's brand-guidelines / dealer agreement.
