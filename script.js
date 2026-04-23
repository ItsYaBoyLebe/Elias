/* ========================================================================
   Elias Nijs — shared client script
   Renders the entire site from data/config.js, data/translations.js,
   data/products.js and data/services.js.
   ======================================================================== */

(function () {
  "use strict";

  const LS_LANG_KEY = "elias-nijs-lang";

  // -------------------- SVG ICON LIBRARY --------------------
  const ICONS = {
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-7-7 8-8 .7 1.3Z"/><path d="m7 17-3 3"/></svg>',
    person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    star:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9 12 2"/></svg>',
    heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    tree:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 6 10h3l-4 6h4l-3 5h12l-3-5h4l-4-6h3Z"/><path d="M12 16v6"/></svg>',
    car:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13 5 7h14l2 6v5h-3v-2H6v2H3Z"/><circle cx="7" cy="16" r="1.5"/><circle cx="17" cy="16" r="1.5"/></svg>',
    gear:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
    truck:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 17V5h15v12"/><path d="M16 9h4l3 4v4h-7"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    excavator:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M4 20v-4h10v4M6 16v-3h8v3M14 13l5-5 2 2-2 4"/><circle cx="7" cy="20" r="1"/><circle cx="12" cy="20" r="1"/></svg>',
    lift:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16M8 20v-6h8v6M9 14 5 4M15 14l4-10M9 4h6"/></svg>',
    shears: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="m9 8 12 12M9 16 21 4"/></svg>',
    paint:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 3H5a2 2 0 0 0-2 2v4h18V5a2 2 0 0 0-2-2Z"/><path d="M8 9v4h8V9M12 13v4a2 2 0 0 0 2 2v2"/></svg>',
    chat:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/></svg>',
    phone:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"/></svg>',
    mail:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    pin:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.4A4 4 0 1 1 12.6 8a4 4 0 0 1 3.4 3.4Z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>',
    menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>'
  };
  const icon = (name) => ICONS[name] || ICONS.star;

  // -------------------- STATE --------------------
  const state = {
    lang: "nl",
    page: document.body.dataset.page || "home"
  };

  // -------------------- INIT --------------------
  document.addEventListener("DOMContentLoaded", () => {
    injectColors();
    injectFonts();
    applyMeta();
    state.lang = localStorage.getItem(LS_LANG_KEY) || (window.CONFIG?.brand?.defaultLang || "nl");
    document.documentElement.lang = state.lang;

    renderNav();
    renderFooter();

    // Page-specific renders
    if (state.page === "products") renderProducts();
    if (state.page === "service")  renderServices();
    if (state.page === "home")     renderHome();
    if (state.page === "contact")  renderContact();

    applyTranslations();
    bindNavScroll();
    bindContactForm();
  });

  // -------------------- CONFIG INJECTION --------------------
  function injectColors() {
    const c = window.CONFIG?.colors || {};
    const root = document.documentElement.style;
    if (c.primary)     root.setProperty("--color-primary", c.primary);
    if (c.accent)      root.setProperty("--color-accent", c.accent);
    if (c.accentDark)  root.setProperty("--color-accent-dark", c.accentDark);
    if (c.background)  root.setProperty("--color-background", c.background);
    if (c.surface)     root.setProperty("--color-surface", c.surface);
    if (c.text)        root.setProperty("--color-text", c.text);
    if (c.textMuted)   root.setProperty("--color-text-muted", c.textMuted);
    if (c.border)      root.setProperty("--color-border", c.border);
  }

  function injectFonts() {
    const f = window.CONFIG?.fonts;
    if (!f) return;
    const heading = (f.heading || "Oswald").replace(/\s+/g, "+");
    const body    = (f.body || "Source Sans 3").replace(/\s+/g, "+");
    const href = `https://fonts.googleapis.com/css2?family=${heading}:wght@400;500;600;700&family=${body}:wght@300;400;500;600;700&display=swap`;

    const pre1 = document.createElement("link");
    pre1.rel = "preconnect"; pre1.href = "https://fonts.googleapis.com";
    document.head.appendChild(pre1);
    const pre2 = document.createElement("link");
    pre2.rel = "preconnect"; pre2.href = "https://fonts.gstatic.com"; pre2.crossOrigin = "anonymous";
    document.head.appendChild(pre2);

    const link = document.createElement("link");
    link.rel = "stylesheet"; link.href = href;
    document.head.appendChild(link);

    document.documentElement.style.setProperty("--font-heading", `"${f.heading}"`);
    document.documentElement.style.setProperty("--font-body",    `"${f.body}"`);
  }

  function applyMeta() {
    const m = window.CONFIG?.meta?.pages?.[state.page];
    if (!m) return;
    document.title = m.title[state.lang] || m.title.nl;
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.name = "description";
      document.head.appendChild(desc);
    }
    desc.content = m.description[state.lang] || m.description.nl;
  }

  // -------------------- TRANSLATION HELPERS --------------------
  function t(path) {
    const parts = path.split(".");
    let cur = window.TRANSLATIONS?.[state.lang];
    for (const p of parts) {
      if (cur == null) return "";
      cur = cur[p];
    }
    return cur == null ? "" : cur;
  }
  function pick(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] ?? obj.nl ?? "";
  }

  // -------------------- NAV --------------------
  function renderNav() {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const brand = window.CONFIG?.brand?.name || "Elias Nijs";
    const [first, ...rest] = brand.split(" ");
    const brandHtml = `<span>${first}</span> <span class="accent">${rest.join(" ")}</span>`;

    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-brand">${brandHtml}</a>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false">${icon("menu")}</button>
        <ul class="nav-links">
          <li><a href="index.html"    data-page="home"     data-i18n="nav.home"></a></li>
          <li><a href="products.html" data-page="products" data-i18n="nav.products"></a></li>
          <li><a href="service.html"  data-page="service"  data-i18n="nav.service"></a></li>
          <li><a href="contact.html"  data-page="contact"  data-i18n="nav.contact"></a></li>
          <li>
            <span class="lang-toggle">
              <button type="button" data-lang="nl">NL</button>
              <button type="button" data-lang="en">EN</button>
            </span>
          </li>
        </ul>
      </div>
    `;

    // Active link
    nav.querySelectorAll(".nav-links a[data-page]").forEach(a => {
      if (a.dataset.page === state.page) a.classList.add("active");
    });

    // Lang toggle
    nav.querySelectorAll(".lang-toggle button").forEach(btn => {
      if (btn.dataset.lang === state.lang) btn.classList.add("active");
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });

    // Mobile toggle
    const toggle = nav.querySelector(".nav-toggle");
    const links = nav.querySelector(".nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close on link click (mobile)
    links.querySelectorAll("a[data-page]").forEach(a =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }

  function bindNavScroll() {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const update = () => nav.classList.toggle("scrolled", window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  // -------------------- LANGUAGE --------------------
  function setLanguage(lang) {
    if (!lang || lang === state.lang) return;
    state.lang = lang;
    localStorage.setItem(LS_LANG_KEY, lang);
    document.documentElement.lang = lang;

    // Update lang toggle active state
    document.querySelectorAll(".lang-toggle button").forEach(btn =>
      btn.classList.toggle("active", btn.dataset.lang === lang)
    );

    // Re-render dynamic content
    applyMeta();
    if (state.page === "products") renderProducts();
    if (state.page === "service")  renderServices();
    if (state.page === "home")     renderHome();
    if (state.page === "contact")  renderContact();
    renderFooter();
    applyTranslations();
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const val = t(el.dataset.i18n);
      if (val) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const val = t(el.dataset.i18nPlaceholder);
      if (val) el.placeholder = val;
    });
  }

  // -------------------- HOME --------------------
  function renderHome() {
    renderPillars();
    renderValues();
    renderAbout();
  }

  function renderPillars() {
    const host = document.getElementById("pillar-grid");
    if (!host) return;
    const items = t("pillars.items") || [];
    host.innerHTML = items.map(p => `
      <article class="pillar">
        <div class="icon-wrap">${icon(p.icon)}</div>
        <h3>${p.title}</h3>
        <p>${p.body}</p>
        <a class="link" href="${p.link}">${p.cta} →</a>
      </article>
    `).join("");
  }

  function renderValues() {
    const host = document.getElementById("values-grid");
    if (!host) return;
    const items = t("values.items") || [];
    host.innerHTML = items.map(v => `
      <div class="value-item">
        <div class="icon-wrap">${icon(v.icon)}</div>
        <h3>${v.title}</h3>
        <p>${v.body}</p>
      </div>
    `).join("");
  }

  function renderAbout() {
    const host = document.getElementById("about-block");
    if (!host) return;
    host.innerHTML = `
      <div class="about-split">
        <div class="img-placeholder">${icon("person")}</div>
        <div>
          <span class="eyebrow">${t("about.eyebrow")}</span>
          <h2>${t("about.title")}</h2>
          <p>${t("about.body")}</p>
          <a class="btn btn-outline" href="contact.html">${t("about.cta")}</a>
        </div>
      </div>
    `;
  }

  // -------------------- PRODUCTS --------------------
  function renderProducts() {
    const host = document.getElementById("product-grid");
    if (!host) return;
    const products = window.PRODUCTS || [];
    host.innerHTML = products.map(p => {
      const img = p.image
        ? `<img src="${p.image}" alt="${pick(p.name)}" />`
        : `<div class="img-placeholder">${icon(p.icon)}</div>`;
      return `
        <article class="card">
          ${img}
          <div class="card-body">
            <span class="brand-tag">${p.brand || ""}</span>
            <h3>${pick(p.name)}</h3>
            <p>${pick(p.description)}</p>
            <div class="spec">${pick(p.shortSpec)}</div>
            <a class="btn btn-outline" href="${p.ctaLink}">${pick(p.ctaLabel)}</a>
          </div>
        </article>
      `;
    }).join("");
  }

  // -------------------- SERVICES --------------------
  function renderServices() {
    renderServiceList("machinery-grid", (window.SERVICES?.machinery) || []);
    renderServiceList("oldtimer-grid",  (window.SERVICES?.oldtimer)  || []);
  }
  function renderServiceList(hostId, items) {
    const host = document.getElementById(hostId);
    if (!host) return;
    host.innerHTML = items.map(s => `
      <article class="pillar">
        <div class="icon-wrap">${icon(s.icon)}</div>
        <h3>${pick(s.title)}</h3>
        <p>${pick(s.body)}</p>
      </article>
    `).join("");
  }

  // -------------------- CONTACT --------------------
  function renderContact() {
    renderContactDetails();
    renderMap();
  }

  function renderContactDetails() {
    const host = document.getElementById("contact-details");
    if (!host) return;
    const c = window.CONFIG?.contact || {};
    const hours = pick(c.hours);
    host.innerHTML = `
      <h3 data-i18n="contact.detailsTitle">${t("contact.detailsTitle")}</h3>
      <div class="contact-item">
        <div class="icon-wrap">${icon("phone")}</div>
        <div>
          <span class="label">${t("contact.phoneLabel")}</span>
          <a class="value" href="tel:${c.phoneHref || c.phone}">${c.phone}</a>
        </div>
      </div>
      <div class="contact-item">
        <div class="icon-wrap">${icon("mail")}</div>
        <div>
          <span class="label">${t("contact.emailLabel")}</span>
          <a class="value" href="mailto:${c.email}">${c.email}</a>
        </div>
      </div>
      <div class="contact-item">
        <div class="icon-wrap">${icon("pin")}</div>
        <div>
          <span class="label">${t("contact.addressLabel")}</span>
          <span class="value">${c.address || ""}</span>
        </div>
      </div>
      <div class="contact-item">
        <div class="icon-wrap">${icon("clock")}</div>
        <div>
          <span class="label">${t("contact.hoursLabel")}</span>
          <span class="value">${hours}</span>
        </div>
      </div>
    `;
  }

  function renderMap() {
    const host = document.getElementById("map-block");
    if (!host) return;
    const url = window.CONFIG?.maps?.embedUrl;
    if (url) {
      host.innerHTML = `<iframe src="${url}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
    } else {
      host.textContent = t("contact.mapPlaceholder");
    }
  }

  function bindContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.querySelector(".form-success");
      if (success) {
        success.textContent = t("contact.formSuccess");
        success.classList.add("show");
      }
      form.reset();
    });
  }

  // -------------------- FOOTER --------------------
  function renderFooter() {
    const host = document.getElementById("site-footer");
    if (!host) return;
    const brand = window.CONFIG?.brand?.name || "Elias Nijs";
    const [first, ...rest] = brand.split(" ");
    const brandHtml = `<span>${first}</span> <span class="accent">${rest.join(" ")}</span>`;
    const c = window.CONFIG?.contact || {};
    const s = window.CONFIG?.social || {};
    const year = new Date().getFullYear();

    host.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div>
            <div class="brand">${brandHtml}</div>
            <p>${t("footer.tagline")}</p>
            <p style="margin-top:1rem; font-size:0.95rem;">${pick(window.CONFIG?.brand?.tagline)}</p>
          </div>
          <div>
            <h4>${t("footer.quickLinksTitle")}</h4>
            <ul>
              <li><a href="index.html">${t("nav.home")}</a></li>
              <li><a href="products.html">${t("nav.products")}</a></li>
              <li><a href="service.html">${t("nav.service")}</a></li>
              <li><a href="contact.html">${t("nav.contact")}</a></li>
            </ul>
          </div>
          <div>
            <h4>${t("footer.contactTitle")}</h4>
            <ul>
              <li><a href="tel:${c.phoneHref || c.phone}">${c.phone}</a></li>
              <li><a href="mailto:${c.email}">${c.email}</a></li>
              <li>${c.address || ""}</li>
              <li>${pick(c.hours)}</li>
            </ul>
          </div>
          <div>
            <h4>${t("footer.followTitle")}</h4>
            <div class="social-links">
              ${s.facebook  ? `<a href="${s.facebook}"  aria-label="Facebook" target="_blank" rel="noopener">${icon("facebook")}</a>`  : ""}
              ${s.instagram ? `<a href="${s.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${icon("instagram")}</a>` : ""}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div>© ${year} ${brand}. ${t("footer.rights")}.</div>
          <div>${t("footer.builtWith")}</div>
        </div>
      </div>
    `;
  }
})();
