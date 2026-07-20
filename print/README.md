# Naamkaartje

Print-klare PDF: `naamkaartje-elias-nijs.pdf`

- Formaat: 85 × 55 mm, 3 mm bleed rondom (document 91 × 61 mm, TrimBox ingesteld)
- Pagina 1 = voorkant, pagina 2 = achterkant
- Fonts (Oswald, Source Sans 3) volledig ingebed
- Kleuren: huisstijl uit `data/config.js` (#1a1a1a / #e87722)

Aanpassen en opnieuw genereren:

```bash
# fonts eenmalig ophalen en omzetten naar TTF (in /tmp/fonts)
cd /tmp/fonts && npm install @fontsource/oswald @fontsource/source-sans-3
python3 - <<'EOF'
from fontTools.ttLib import TTFont
for src, dst in [
    ("node_modules/@fontsource/oswald/files/oswald-latin-500-normal.woff", "Oswald-Medium.ttf"),
    ("node_modules/@fontsource/oswald/files/oswald-latin-600-normal.woff", "Oswald-SemiBold.ttf"),
    ("node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff", "SourceSans3-Regular.ttf"),
    ("node_modules/@fontsource/source-sans-3/files/source-sans-3-latin-600-normal.woff", "SourceSans3-SemiBold.ttf"),
]:
    f = TTFont(src); f.flavor = None; f.save(dst)
EOF

python3 generate_naamkaartje.py   # vereist: pip install reportlab fonttools
```
