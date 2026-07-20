# Vragenlijst Odoo-meeting

_Te overlopen met Odoo · vervanging voor Carfac_

Zes thema's. Per thema: wat we willen weten + de concrete vragen.

---

## 1. Werkplaats-flow (inventaris · projecten · onderhoudsgeschiedenis)

_Dit is de kern: kan Odoo onze dagelijkse werkplaats draaien?_

- Welke module(s) dekken de volledige flow: **werkorder → onderdelen verbruiken → tijd loggen → factuur**?
- Is dit standaard Odoo of een **externe app**? Wie onderhoudt die en wat als die stopt?
- **Inventaris/onderdelen**: realtime stock, automatisch afboeken bij verbruik, bestelvoorstel bij lage stock, barcodescanning?
- **Projecten**: kunnen we grotere klussen (bv. machine-revisie, oldtimer-restauratie) als project met fases en uren opvolgen?
- **Onderhoudsgeschiedenis**: is er een fiche per machine/voertuig met **volledige historiek** van alle interventies, onderdelen en kosten?
- Kan een technieker mobiel (tablet/gsm) in de werkplaats werken?
- Demo-vraag: toon één **live scenario van begin tot eind** met onze data.

## 2. Car-Pass & garageregister (België)

_Sinds 1 jan 2024 wettelijk verplicht voor wie aan voertuigen werkt._

- Heeft Odoo een **Car-Pass-koppeling** (kilometerstand + omschrijving van het werk elektronisch doorsturen, met bevestiging terug)?
- Zo niet standaard: bestaat er een **integratie/app** voor, of is dit maatwerk? Wat kost dat?
- Ondersteunt het de verplichte **gedetailleerde werkomschrijving** naar Car-Pass?
- Is er ondersteuning voor het **garageregister** / verplichte registraties?
- _Belangrijk:_ dit deed Carfac waarschijnlijk ingebouwd — als Odoo dit niet kan, is dat een serieus aandachtspunt.

## 3. Prijs

- Concrete prijs voor **ons aantal gebruikers** (eerst bepalen: hoeveel licenties echt nodig?).
- **Standard (€24,90)** vs **Custom (€37,40)** /gebruiker/maand — welke hebben wíj nodig en waarom?
- **Eenmalige kosten**: implementatie, datamigratie uit Carfac, opleiding, maatwerk → graag een ruwe range **nu**, niet "later".
- **Totale kost over 3 jaar** vs wat we nu aan Carfac betalen?
- Extra kosten voor verplichte externe apps (bv. werkplaats- of Car-Pass-app)?

## 4. All-in-one?

_Carfac was alles in één — doet Odoo dat ook, of plakken we apps aan elkaar?_

- Zit alles in **één systeem**: werkorders, voorraad, aankoop, verkoop/CRM, facturatie én **boekhouding**?
- Is de boekhouding **Belgisch conform** (btw-aangifte, Intervat, e-facturatie Peppol/UBL)?
- Hoeveel draait op **standaard Odoo** vs externe apps van derden? (hoe meer extern, hoe meer afhankelijkheidsrisico)
- Werkt onze **boekhouder** mee in het systeem?

## 5. Data later exporteren?

_Niet vast komen te zitten — exit-strategie._

- Kunnen we **op elk moment al onze data exporteren** (klanten, onderdelen, historiek, facturen) in een bruikbaar formaat?
- Is er een **open API** om Odoo te koppelen aan andere tools? (Standard of pas in Custom?)
- Wat gebeurt met onze data als we **stoppen** met het abonnement?
- Hoe verloopt de **migratie ván Carfac náár Odoo** — hebben jullie dat al gedaan, en lukt dat met de historiek?

## 6. Hoe runnen? (hosting)

- **Online (Odoo Cloud / SaaS)**, op eigen server, of Odoo.sh — wat raden jullie aan en waarom?
- Wie doet **updates, back-ups en beveiliging**?
- Werkt het **offline** of bij internetuitval in de werkplaats?
- Wie is ons **aanspreekpunt**: Odoo zelf of een Belgische **Odoo-partner**? Support in het Nederlands?
- Hoe lang duurt een **typische implementatie** tot we live zijn?

---

### Rode vlaggen tijdens de meeting
- "Ja, dat kan allemaal" zonder demo → vraag de **live demo met ons scenario**.
- Implementatiekost die "later bekeken wordt" → vraag een **ruwe range nu**.
- Te veel functies via één **externe app** van één ontwikkelaar → afhankelijkheidsrisico.
- Geen duidelijk antwoord op **Car-Pass** → mogelijk dealbreaker.

_Bronnen: car-pass.be · economie.fgov.be · odoo.com/pricing_
