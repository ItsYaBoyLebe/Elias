# Elias Nijs — website

The website for Elias Nijs: forestry machinery sales, service, and
oldtimer/classic-car work. Static site (plain HTML/CSS/JS, no build step),
bilingual NL/EN, deployed via GitHub Pages to **eliasnijs.be**.

## Files

```
index.html      Home
products.html   Aanbod — brand logo wall
service.html    Service (machines + oldtimers)
contact.html    Contact + map
script.js       Renders every page from the data files below
style.css       All styling
data/
  config.js       Brand, colors, contact details, map, page meta
  translations.js All NL + EN text
  services.js     Service items (machines + oldtimers)
  brands.js       Brands shown on the Aanbod page
assets/
  img/elias.jpg   Photo used in the About section
  logos/          Brand logos
CNAME           Custom domain for GitHub Pages (eliasnijs.be)
```

## Run locally

No build step:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Edit common things

- **Text** (NL/EN): `data/translations.js`
- **Contact details / opening hours / map**: `data/config.js`
- **Brands on the Aanbod page**: `data/brands.js` (add a logo file to
  `assets/logos/` and point to it)
- **Elias's photo**: replace `assets/img/elias.jpg`

## Deploy

Push to `main` — GitHub Pages serves the repo root automatically.
