#!/usr/bin/env python3
"""
Naamkaartje Elias Nijs — print-klare PDF
85 x 55 mm + 3 mm bleed = 91 x 61 mm, 2 pagina's (voor/achter).
Huisstijl uit data/config.js: #1a1a1a / #e87722 / Oswald / Source Sans 3.
Fonts: /tmp/fonts/*.ttf (via @fontsource npm packages).
"""
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ---- brand ----
DARK   = HexColor("#1a1a1a")
ORANGE = HexColor("#e87722")
MUTED  = HexColor("#5a5a5a")
BORDER = HexColor("#e0ddd4")
WHITE  = HexColor("#ffffff")

FONTS = "/tmp/fonts"
pdfmetrics.registerFont(TTFont("Oswald-Medium",   f"{FONTS}/Oswald-Medium.ttf"))
pdfmetrics.registerFont(TTFont("Oswald-SemiBold", f"{FONTS}/Oswald-SemiBold.ttf"))
pdfmetrics.registerFont(TTFont("SS3",             f"{FONTS}/SourceSans3-Regular.ttf"))
pdfmetrics.registerFont(TTFont("SS3-SemiBold",    f"{FONTS}/SourceSans3-SemiBold.ttf"))

# ---- page geometry ----
BLEED = 3 * mm
W, H = 85 * mm + 2 * BLEED, 55 * mm + 2 * BLEED   # 91 x 61 mm
SAFE = 8 * mm                                      # 3 bleed + 5 safe margin

def tracked_width(text, font, size, track):
    return pdfmetrics.stringWidth(text, font, size) + track * (len(text) - 1)

def draw_tracked(c, x, y, text, font, size, track, color, center_at=None):
    c.setFont(font, size)
    c.setFillColor(color)
    if center_at is not None:
        x = center_at - tracked_width(text, font, size, track) / 2
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setCharSpace(track)
    t.textOut(text)
    c.drawText(t)

def e_mark(c, x, y, s):
    """Logo-E uit favicon.svg (64-grid), (x,y) = linksonder, s = zijde."""
    u = s / 64.0
    c.setFillColor(ORANGE)
    c.roundRect(x, y, s, s, 12 * u, stroke=0, fill=1)
    c.setFillColor(WHITE)
    for bx, by, bw, bh in [(20,16,8,32), (20,16,24,8), (20,28,18,8), (20,40,24,8)]:
        c.rect(x + bx * u, y + (64 - by - bh) * u, bw * u, bh * u, stroke=0, fill=1)

def bottom_strip(c):
    c.setFillColor(ORANGE)
    c.rect(0, 0, W, BLEED + 2.5 * mm, stroke=0, fill=1)   # 2.5 mm zichtbaar na snit

# =====================  VOORKANT  =====================
c = canvas.Canvas(
    "naamkaartje-elias-nijs.pdf", pagesize=(W, H),
    initialFontName="SS3", initialFontSize=8,
    trimBox=(BLEED, BLEED, W - BLEED, H - BLEED),   # 85 x 55 mm snijkader
    bleedBox=(0, 0, W, H),
)
c.setTitle("Naamkaartje Elias Nijs")
c.setFillColor(WHITE); c.rect(0, 0, W, H, stroke=0, fill=1)
bottom_strip(c)

cx = W / 2
mark = 12 * mm
e_mark(c, cx - mark / 2, 37.5 * mm, mark)
draw_tracked(c, 0, 27.5 * mm, "ELIAS NIJS", "Oswald-SemiBold", 19.5, 1.6, DARK, center_at=cx)

# fijn oranje lijntje
c.setStrokeColor(ORANGE); c.setLineWidth(0.8)
c.line(cx - 6 * mm, 24.2 * mm, cx + 6 * mm, 24.2 * mm)

draw_tracked(c, 0, 19.2 * mm, "VAKMANSCHAP DAT U KUNT VERTROUWEN",
             "SS3-SemiBold", 6.2, 0.9, MUTED, center_at=cx)
c.showPage()

# =====================  ACHTERKANT  =====================
c.setFillColor(WHITE); c.rect(0, 0, W, H, stroke=0, fill=1)
bottom_strip(c)

x0 = SAFE + 1 * mm
# header: klein merk + naam
hm = 7 * mm
e_mark(c, x0, 44.5 * mm, hm)
draw_tracked(c, x0 + hm + 3.2 * mm, 46.6 * mm, "ELIAS NIJS", "Oswald-Medium", 13, 1.1, DARK)
draw_tracked(c, x0 + hm + 3.2 * mm, 42.6 * mm, "BOSBOUWMACHINES  ·  SERVICE  ·  OLDTIMERS",
             "SS3-SemiBold", 5.4, 0.7, ORANGE)

# scheidingslijn
c.setStrokeColor(BORDER); c.setLineWidth(0.6)
c.line(x0, 38 * mm, W - SAFE - 1 * mm, 38 * mm)

# contactblok: typografische labels + gegevens
rows = [
    ("TEL",   "+32 473 43 87 29"),
    ("MAIL",  "info@eliasnijs.be"),
    ("WEB",   "eliasnijs.be"),
    ("ADRES", "Diestsesteenweg 712 D, 3010 Leuven"),
]
label_x = x0
text_x  = x0 + 13 * mm
y = 32.2 * mm
for label, value in rows:
    draw_tracked(c, label_x, y, label, "Oswald-Medium", 6.4, 0.9, ORANGE)
    c.setFont("SS3", 8.2); c.setFillColor(DARK)
    c.drawString(text_x, y, value)
    y -= 5.6 * mm

# openingsuren rechts uitgelijnd op de TEL-regel
c.setFont("SS3", 6.4); c.setFillColor(MUTED)
c.drawRightString(W - SAFE - 1 * mm, 32.2 * mm, "Ma–Vr: 09u–17u")

c.showPage()
c.save()
print("naamkaartje-elias-nijs.pdf klaar:", W / mm, "x", H / mm, "mm")
