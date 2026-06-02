/* ========================================================================
   Brands Elias sells — shown as a logo wall on the Aanbod page.

   HOW TO EDIT:
   - Add one entry per brand.
   - `name`  : brand name (shown as text if the logo can't be loaded).
   - `logo`  : path to the logo image. Drop the file in
               assets/logos/ using the filename below.
               SVG or PNG with a transparent background works best.
   - `url`   : link to the brand's website ("" for no link).

   If a logo file is missing, the wall automatically shows the brand name
   as text instead — so the page never looks broken.

   To add a logo: save it as the filename shown in `logo` (e.g. forst.svg)
   into assets/logos/ and you're done.
   ======================================================================== */
window.BRANDS = [
  {
    name: "Forst",          // official dealer
    logo: "assets/logos/forst-logo.svg",
    url:  "https://forstglobal.com/"
  },
  {
    name: "Rayco",          // stump grinders / stronkenfrezen
    logo: "assets/logos/raycologo.png",
    url:  "https://www.raycomfg.com/equipment-overview/"
  },
  {
    name: "Rajo",           // wood chippers / houtversnipperaars
    logo: "assets/logos/Logo-Rajo.webp",
    url:  "https://rajo.be/"
  }
];
