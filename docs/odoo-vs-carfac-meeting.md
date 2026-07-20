# Meeting Odoo — alternatief voor Carfac?

_Voorbereiding voor Iebe & Elias · 2 juni 2026_

## Context in één alinea

Elias Nijs (Leuven) verkoopt en onderhoudt **bosbouwmachines** en doet
**oldtimer-restauratie**. Bij Esprit werd **Carfac** gebruikt: een Belgisch
Dealer Management System (DMS, ±35 jaar oud) dat CRM, voorraad, werkorders,
facturatie en boekhouding in één pakket combineert. Carfac is **duur en
verouderd**. Vraag voor deze meeting: **kan Odoo dit vervangen?**

## Wat Carfac vandaag dekt (= de lat die Odoo moet halen)

Carfac C (automotive) en Carfac M (landbouw/constructie/industrie — relevant
voor bosbouwmachines) bieden in één geïntegreerd systeem:

- Offertes en werkorders (werkplaatsbeheer, in-/uitklokken, barcodescanners)
- Onderdelen- en stockbeheer
- Machine-/voertuigfiches (historiek per machine)
- Klanten- en leveranciersbeheer (CRM)
- Facturatie + boekhouding (Belgisch conform)

→ Dit is je **checklist**: voor elk punt moet je in de meeting horen *hoe* Odoo
het doet en *wat het kost*.

## Hoe Odoo dit in principe afdekt

Odoo is modulair — je betaalt en activeert per app:

| Carfac-functie | Odoo-module |
|---|---|
| Werkorders / werkplaats | **Repair** of **Field Service**, evt. third-party "Garage/Workshop" app |
| Voorraad / onderdelen | **Inventory** (+ barcodescanning) |
| Machine-/voertuigfiches | **Fleet** of custom machinefiche |
| Offertes & verkoop | **Sales / CRM** |
| Facturatie & boekhouding | **Accounting** (BE-conform: btw-aangiftes, rapporten) |
| Aankoop bij leveranciers | **Purchase** |

> Let op: een kant-en-klare "garage" workflow (reparatieticket → diagnose →
> technieker → onderdelen → factuur) bestaat vooral via **third-party apps** uit
> de Odoo App Store, niet als standaard Odoo-module. Vraag expliciet of Odoo dit
> zelf bouwt of doorverwijst naar een externe app/partner.

## Indicatieve prijs (officieel Odoo, BE, 2026)

- **Standard**: €24,90 /gebruiker/maand (jaarlijks) — *alle* apps inbegrepen, maar
  geen Odoo Studio / multi-company / externe API
- **Custom (Enterprise)**: €37,40 /gebruiker/maand (jaarlijks) — incl. Studio,
  maatwerk, externe API
- **Maandelijks** betalen ligt ±25% hoger
- **Eénmalig erbij**: implementatie/setup, datamigratie vanuit Carfac, opleiding,
  maatwerkmodules → vaak de grootste kost. Vraag hier een aparte inschatting voor.

Reken voor de basis op grofweg €25–40 /gebruiker/maand, plus implementatie.

## Vragen om in de meeting te stellen

**Functioneel**
1. Welke modules dekken werkorders + onderdelenverbruik + tijdsregistratie per job?
2. Is er een nette **machinefiche met historiek** (alle interventies per machine/voertuig)?
3. Hoe werkt **barcode-scanning** in de werkplaats en magazijn?
4. Kan een technieker mobiel (tablet/gsm) tijd en onderdelen loggen?
5. Bestaat er een standaard **garage/werkplaats-flow**, of is dat maatwerk / een externe app? Wie onderhoudt die?

**Boekhouding & België**
6. Is de boekhouding volledig **Belgisch conform** (btw-aangifte, Intervat, UBL/Peppol e-facturatie)?
7. Werkt het samen met onze boekhouder / kan die mee in het systeem?

**Migratie & data**
8. Kunnen jullie data **uit Carfac migreren** (klanten, onderdelen, historiek)? Hebben jullie dat al gedaan?
9. Hoe loopt de overgangsperiode — kunnen we gefaseerd starten?

**Kost & contract**
10. Concrete prijs voor **ons aantal gebruikers** (hoeveel licenties hebben we echt nodig?).
11. Wat kost **implementatie + opleiding** eenmalig? Vast bedrag of dagprijs?
12. Standard vs Custom: welke hebben wíj nodig, en waarom?
13. Wat als we willen stoppen — zitten we vast aan onze data? (export mogelijk?)

**Support**
14. Wie is ons aanspreekpunt — Odoo zelf of een Belgische **Odoo-partner**? Lokale support in NL?

## Beslissingscriteria (waarop wij Odoo afwegen tegen Carfac)

- Dekt het **alle** dagelijkse werkplaats-flows zonder gedoe?
- **Totale kost** over 3 jaar (licentie + implementatie + maatwerk) vs Carfac
- **Toekomstbestendig**: moderne UI, mobiel, regelmatige updates, API om mee te koppelen
- **Migratierisico**: hoe pijnlijk is de overstap?
- **Lock-in**: kunnen we onze eigen data altijd buiten halen?

## Rode vlaggen om op te letten

- "Ja dat kan allemaal" zonder demo → vraag een **live demo met óns scenario**
  (bosbouwmachine binnen → werkorder → onderdelen → factuur).
- Implementatiekost die "later bekeken wordt" → vraag een **ruwe range nu**.
- Garage-flow die volledig op een **externe app** van één ontwikkelaar steunt →
  afhankelijkheidsrisico.

---

_Bronnen: carfac.be · odoo.com/pricing · apps.odoo.com_
