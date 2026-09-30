/* Macrolarge Eco Consult — vanilla JavaScript. No libraries or build step. */

const stages = [
  {
    name: "Measure",
    subtitle: "Understand your starting point.",
    description:
      "Get an honest baseline: carbon footprint, environmental impact, ESG data, before you commit to a target you can’t back up.",
    intro:
      "Understand your starting point before you set a target you can’t back up.",
    services: [
      ["Sustainability Gap Assessment", "£1,500–£2,500"],
      ["Sustainability Baseline", "£2,000–£4,000"],
      ["Corporate Carbon Footprint (Scope 1 & 2)", "£1,500–£3,500"],
      ["Scope 1–3 Screening", "£3,000–£6,000"],
      ["Full Scope 1–3 Inventory", "£5,000–£15,000"],
      ["Scope 3 Assessment", "£4,000–£12,000"],
      ["Materiality Assessment", "£3,000–£7,500"],
      ["ESG KPI Framework", "£2,000–£5,000"],
      ["LCA Screening", "£1,500–£3,000"],
    ],
  },
  {
    name: "Manage",
    subtitle: "Build a system that works.",
    description:
      "Turn that data into a strategy and a management system your team will actually use, including ISO 14001 preparation.",
    intro:
      "Turn your data into a strategy and a management system your team will actually use.",
    services: [
      ["Sustainability Strategy & Roadmap", "£5,000–£12,000"],
      ["Sustainability Policy", "£750–£1,500"],
      ["Environmental Management Plan", "£1,500–£3,500"],
      ["Environmental Aspects & Impacts Register", "£750–£1,500"],
      ["Environmental Legal Compliance Review", "£1,500–£4,000"],
      ["ISO 14001 Gap Assessment", "£1,500–£3,000"],
      ["EMS Documentation", "£4,000–£8,000"],
      ["EMS Implementation Support", "£7,500–£15,000"],
      ["Carbon Data System", "£2,500–£6,000"],
    ],
  },
  {
    name: "Reduce",
    subtitle: "Turn ambition into action.",
    description:
      "Convert priorities into a funded, quantified reduction plan, from carbon to waste to your supply chain.",
    intro: "Convert priorities into a funded, quantified reduction plan.",
    services: [
      ["Carbon Reduction Plan", "£3,000–£7,500"],
      ["Net Zero Roadmap", "£7,500–£15,000+"],
      ["Waste Assessment", "£1,000–£2,500"],
      ["Waste Reduction Assessment", "£1,500–£3,000"],
      ["Resource Efficiency Review", "£2,000–£5,000"],
      ["Sustainable Procurement Assessment", "£2,500–£6,000"],
      ["Supplier Sustainability Programme", "£5,000–£12,000"],
    ],
  },
  {
    name: "Improve",
    subtitle: "Go beyond the baseline.",
    description:
      "Go beyond compliance with product-level Life Cycle Assessment, eco-design, and circular economy strategy.",
    intro:
      "For organisations ready to go beyond compliance into product-level and structural change.",
    services: [
      ["Cradle-to-Gate / Cradle-to-Grave LCA", "£4,000–£12,000"],
      ["Comparative LCA", "£6,000–£12,000"],
      ["Product Carbon Footprint", "£3,000–£8,000 per product"],
      ["Multi-impact LCA", "£8,000–£15,000+"],
      ["Circularity Assessment", "£3,000–£7,500"],
      ["Circular Economy Strategy", "£5,000–£12,000"],
      ["Eco-design Assessment / Programme", "£2,000–£15,000+"],
    ],
  },
];

// UI helpers. All dynamic content is escaped before being inserted as HTML.
const arrowIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
const query = new URLSearchParams(window.location.search);

// Responsive navigation, including keyboard Escape and an outside-click close.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("header nav");
if (menuButton && navigation) {
  navigation.id = "main-navigation";
  menuButton.setAttribute("aria-controls", navigation.id);
  function toggleMenu(open) {
    navigation.classList.toggle("nav-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
      (open
        ? '<path d="m6 6 12 12M6 18 18 6"/>'
        : '<path d="M4 6h16M4 12h16M4 18h16"/>') +
      "</svg>";
  }
  menuButton.addEventListener("click", () =>
    toggleMenu(menuButton.getAttribute("aria-expanded") !== "true"),
  );
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      toggleMenu(false);
      menuButton.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.composedPath().includes(document.querySelector("header"))) toggleMenu(false);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) toggleMenu(false);
  });
}

// Stage pricing tabs. Each service links to a pre-filled contact enquiry.
const serviceTabs = Array.from(
  document.querySelectorAll('.service-tabs [role="tab"]'),
);
const servicePanel = document.getElementById("service-panel");
if (serviceTabs.length && servicePanel) {
  function selectStage(index, updateAddress = true) {
    const stage = stages[index];
    serviceTabs.forEach((tab, tabIndex) => {
      tab.classList.toggle("active", index === tabIndex);
      tab.setAttribute("aria-selected", String(index === tabIndex));
      tab.tabIndex = index === tabIndex ? 0 : -1;
    });
    servicePanel.setAttribute("aria-labelledby", "tab-" + index);
    servicePanel.innerHTML = `
      <div class="service-panel-intro">
        <span class="large-step">0${index + 1}</span>
        <h3>${escapeHTML(stage.name)}<span>.</span></h3>
        <p>${escapeHTML(stage.intro)}</p>
        <a class="text-link" href="contact.html?service=${encodeURIComponent(stage.name + " services")}">Let’s discuss your project ${arrowIcon}</a>
      </div>
      <div class="price-list">
        ${stage.services
          .map(
            ([name, price]) => `
          <a title="Enquire about ${escapeHTML(name)}" href="contact.html?service=${encodeURIComponent(name)}">
            <span>${escapeHTML(name)}</span><strong>${escapeHTML(price)}</strong>${arrowIcon}
          </a>`,
          )
          .join("")}
      </div>`;
    if (updateAddress) {
      const url = new URL(window.location.href);
      url.searchParams.set("stage", stage.name.toLowerCase());
      // Some browsers restrict history updates for local file:// pages.
      try {
        window.history.replaceState(null, "", url);
      } catch (_) {
        /* Tabs still work. */
      }
    }
  }
  serviceTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectStage(index));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % serviceTabs.length;
      if (event.key === "ArrowLeft")
        next = (index + serviceTabs.length - 1) % serviceTabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = serviceTabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectStage(next);
        serviceTabs[next].focus();
      }
    });
  });
  selectStage(
    Math.max(
      0,
      stages.findIndex(
        (stage) => stage.name.toLowerCase() === query.get("stage"),
      ),
    ),
    false,
  );
  window.addEventListener("popstate", () => {
    const current = new URLSearchParams(window.location.search).get("stage");
    selectStage(
      Math.max(
        0,
        stages.findIndex((stage) => stage.name.toLowerCase() === current),
      ),
      false,
    );
  });
}

// Live FAQ search. Native details/summary elements handle expansion without JS.
const faqSearch = document.querySelector(".search-field input");
if (faqSearch) {
  const answers = Array.from(document.querySelectorAll(".faq-page details"));
  const count = document.querySelector(".search-count");
  const clear = document.createElement("button");
  clear.type = "button";
  clear.setAttribute("aria-label", "Clear search");
  clear.textContent = "×";
  clear.hidden = true;
  faqSearch.parentElement.append(clear);
  const empty = document.createElement("div");
  empty.className = "empty-results";
  empty.hidden = true;
  empty.innerHTML =
    '<h3>No matching questions yet.</h3><p>Try “carbon”, “ISO” or “health check”, or ask us directly.</p><button type="button" class="text-link">Show all questions →</button>';
  document.querySelector(".faq-page .faq-list").after(empty);
  function filterFAQs() {
    const term = faqSearch.value.trim().toLowerCase();
    let visible = 0;
    answers.forEach((answer) => {
      answer.hidden = !answer.textContent.toLowerCase().includes(term);
      if (!answer.hidden) visible++;
    });
    count.textContent = visible + (visible === 1 ? " answer" : " answers");
    empty.hidden = visible > 0;
    clear.hidden = !faqSearch.value;
  }
  function resetSearch() {
    faqSearch.value = "";
    filterFAQs();
    faqSearch.focus();
  }
  faqSearch.addEventListener("input", filterFAQs);
  clear.addEventListener("click", resetSearch);
  empty.querySelector("button").addEventListener("click", resetSearch);
}

// Static contact form: prepares an email, without claiming to send it.
// No API calls, cookies, localStorage, or client-side personal-data persistence.
const contactForm = document.querySelector(".contact-form-wrap form");
if (contactForm) {
  const service = contactForm.querySelector('[name="service"]');
  const requestedService = query.get("service");
  if (requestedService) {
    if (
      !Array.from(service.options).some(
        (option) => option.value === requestedService,
      )
    ) {
      service.add(new Option(requestedService, requestedService));
    }
    service.value = requestedService;
  }
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const values = Object.fromEntries(new FormData(contactForm));
    if (values.website) return;
    const subject = "Sustainability enquiry: " + values.service;
    const body = [
      "Hello Macrolarge Eco Consult,",
      "",
      "I would like to discuss " + values.service + ".",
      "",
      "Name: " + values.name,
      "Work email: " + values.email,
      "Company: " + values.company,
      "Service: " + values.service,
      "",
      "Enquiry:",
      values.message,
      "",
      "I agree that the details in this email may be used to respond to my enquiry.",
    ].join("\n");
    const mailto =
      "mailto:info@ecoconsult.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    const result = document.createElement("div");
    result.className = "success-state";
    result.tabIndex = -1;
    result.setAttribute("role", "status");
    result.innerHTML = `<div class="eyebrow"><span></span>EMAIL DRAFT READY</div>
      <h2>One more step: send your email.</h2>
      <p>Your email app should open with your enquiry filled in. Review the details and press Send there. This website has not sent or saved your enquiry.</p>
      <a class="btn" href="${escapeHTML(mailto)}">Open email draft ${arrowIcon}</a>
      <p>If an email app doesn’t open, copy your enquiry below and email it to <a href="mailto:info@ecoconsult.com">info@ecoconsult.com</a>, or call <a href="tel:+447518610480">+44 7518 610480</a>.</p>
      <label class="draft-label">Your prepared enquiry<textarea class="email-draft" readonly rows="10" aria-label="Your prepared email enquiry">${escapeHTML(body)}</textarea></label>
      <button type="button" class="text-link edit-enquiry">Edit your enquiry →</button>`;
    contactForm.hidden = true;
    contactForm.after(result);
    result.querySelector(".edit-enquiry").addEventListener("click", () => {
      result.remove();
      contactForm.hidden = false;
      contactForm.querySelector('[name="name"]').focus();
    });
    result.focus();
    window.location.href = mailto;
  });
}

// Keep the footer copyright current without depending on a server.
const copyright = document.querySelector(".footer-bottom > span:first-child");
if (copyright)
  copyright.textContent =
    "© " +
    new Date().getFullYear() +
    " Macrolarge Eco Consult Ltd. All rights reserved.";

/* Eco Consult motion system — vanilla JS, no external libraries.
   Progressive enhancement: content stays usable without JavaScript or animations. */
(function () {
  'use strict';
  window.EcoMotion = {
    init() {
      const root = document.documentElement;
      const main = document.querySelector('main');
      if (!main) return () => {};
      const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
      const desktop = window.matchMedia('(min-width: 901px)');
      const cleanups = [];
      const animations = new Set();
      const revealed = new Set();
      let frame = 0;
      let observer;
      let disposed = false;
      const hero = document.querySelector('.hero-image');
      const header = document.querySelector('header');

      function play(element, frames, options) {
        if (preference.matches || !element.animate) return null;
        const animation = element.animate(frames, options);
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        animation.oncancel = () => animations.delete(animation);
        return animation;
      }
      function reveal(element) {
        element.classList.add('is-visible');
        observer?.unobserve(element);
      }
      const revealSelector = [
        '.section-heading > *', '.stage-card', '.about-photo', '.about-copy > *',
        '.benefit-grid article', '.health-banner > div:not(.health-art)',
        '.home-faq > div:first-child', '.home-faq details', '.expertise-grid > a',
        '.mission .container > *', '.team-section .about-split > div',
        '.certification-note', '.service-tabs', '.service-panel', '.retainer-card',
        '.training-row', '.faq-page > aside', '.faq-page > div',
        '.contact-layout > aside', '.contact-form-wrap', '.legal > h2',
        '.legal > p', '.footer-main > div'
      ].join(',');
      function prepareReveals() {
        if (preference.matches || !('IntersectionObserver' in window)) return;
        observer = new IntersectionObserver(entries => {
          for (const entry of entries) if (entry.isIntersecting) reveal(entry.target);
        }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
        document.querySelectorAll(revealSelector).forEach(element => {
          // Never nest hidden reveal targets: a visible parent should reveal all its text.
          if (element.parentElement.closest('.motion-reveal')) return;
          const group = element.parentElement;
          const index = Array.from(group.children).indexOf(element);
          const stagger = group.matches('.stage-grid,.benefit-grid,.expertise-grid,.retainer-grid,.footer-main,.training-table');
          element.style.setProperty('--reveal-delay', stagger ? Math.min(index % 5, 3) * 65 + 'ms' : '0ms');
          element.classList.add('motion-reveal');
          revealed.add(element);
          const rect = element.getBoundingClientRect();
          // Already above the viewport (e.g. restored history/hash scroll) stays visible.
          if (rect.bottom < 0) reveal(element);
          else observer.observe(element);
        });
      }

      function animateEntrance() {
        const items = document.querySelectorAll('.hero-copy > *, .page-hero .container > *, .not-found > *');
        items.forEach((element, index) => play(element,
          [{ opacity: 0, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 650, delay: Math.min(index, 5) * 85, easing: 'cubic-bezier(.2,.65,.3,1)', fill: 'backwards' }
        ));
      }

      // Native details remain the semantic/keyboard-accessible control.
      const detailsCleanups = new WeakMap();
      function enhanceDetails() {
        document.querySelectorAll('.faq-list details').forEach(details => {
          if (detailsCleanups.has(details)) return;
          const summary = details.querySelector('summary');
          let current = null;
          let targetOpen = details.open;
          function onClick(event) {
            if (preference.matches || !details.animate) return;
            event.preventDefault();
            const start = details.getBoundingClientRect().height;
            if (current) { current.onfinish = null; animations.delete(current); current.cancel(); }
            targetOpen = !targetOpen;
            details.style.height = '';
            details.open = true;
            const end = targetOpen ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height;
            details.style.overflow = 'hidden';
            current = details.animate([{ height: start + 'px' }, { height: end + 'px' }], {
              duration: 260, easing: 'cubic-bezier(.25,.7,.25,1)'
            });
            animations.add(current);
            const thisAnimation = current;
            current.onfinish = () => {
              details.open = targetOpen;
              details.style.height = '';
              details.style.overflow = '';
              animations.delete(thisAnimation);
              current = null;
            };
          }
          summary.addEventListener('click', onClick);
          const cleanup = () => {
            summary.removeEventListener('click', onClick);
            if (current) { current.onfinish = null; current.cancel(); details.open = targetOpen; }
            details.style.height = '';
            details.style.overflow = '';
          };
          detailsCleanups.set(details, cleanup);
          cleanups.push(cleanup);
        });
      }

      // Scroll state uses at most one animation-frame callback, with passive listeners.
      function updateScroll() {
        frame = 0;
        if (disposed) return;
        header?.classList.toggle('is-scrolled', window.scrollY > 24);
        if (hero) {
          const offset = !preference.matches && desktop.matches ? Math.min(window.scrollY * 0.065, 32) : 0;
          hero.style.setProperty('--hero-drift', offset + 'px');
        }
      }
      function requestScroll() { if (!frame) frame = requestAnimationFrame(updateScroll); }
      window.addEventListener('scroll', requestScroll, { passive: true });
      window.addEventListener('resize', requestScroll, { passive: true });
      cleanups.push(() => {
        window.removeEventListener('scroll', requestScroll);
        window.removeEventListener('resize', requestScroll);
      });
      // Keyboard focus must never land on visually hidden content.
      function onFocus(event) {
        const target = event.target.closest('.motion-reveal');
        if (target) reveal(target);
      }
      document.addEventListener('focusin', onFocus);
      cleanups.push(() => document.removeEventListener('focusin', onFocus));

      const panel = document.querySelector('.service-panel');
      const formWrap = document.querySelector('.contact-form-wrap');
      const dynamicObserver = new MutationObserver(records => {
        if (preference.matches) return;
        if (panel && records.some(record => panel.contains(record.target))) {
          const content = panel.querySelectorAll('.service-panel-intro, .price-list > a');
          content.forEach((element, index) => play(element,
            [{ opacity: 0, transform: 'translateY(9px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 280, delay: Math.min(index, 6) * 25, easing: 'ease-out', fill: 'backwards' }
          ));
        }
        const success = formWrap?.querySelector('.success-state');
        if (success) play(success, [{opacity:0, transform:'translateY(12px)'},{opacity:1, transform:'translateY(0)'}], {duration:320,easing:'ease-out'});
      });
      if (panel) dynamicObserver.observe(panel, {childList:true,subtree:true});
      if (formWrap) dynamicObserver.observe(formWrap, {childList:true});

      function onPreferenceChange() {
        root.classList.toggle('motion-ready', !preference.matches);
        if (preference.matches) {
          observer?.disconnect();
          revealed.forEach(reveal);
          for (const animation of animations) {
            // Finishing preserves the target open/closed state for FAQ interactions.
            try { animation.finish(); } catch (_) { animation.cancel(); }
          }
        }
        updateScroll();
      }
      preference.addEventListener('change', onPreferenceChange);
      cleanups.push(() => preference.removeEventListener('change', onPreferenceChange));
      root.classList.toggle('motion-ready', !preference.matches);
      prepareReveals();
      animateEntrance();
      enhanceDetails();
      updateScroll();

      // Restore visibility before printing (including never-scrolled sections).
      function beforePrint() { revealed.forEach(reveal); }
      window.addEventListener('beforeprint', beforePrint);
      cleanups.push(() => window.removeEventListener('beforeprint', beforePrint));
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer?.disconnect();
        dynamicObserver.disconnect();
        cleanups.forEach(cleanup => cleanup());
        animations.forEach(animation => animation.cancel());
        revealed.forEach(element => {
          element.classList.remove('motion-reveal', 'is-visible');
          element.style.removeProperty('--reveal-delay');
        });
        hero?.style.removeProperty('--hero-drift');
        root.classList.remove('motion-ready');
      };
    }
  };
  // Static HTML pages initialise immediately; the React version initialises on route change.
  if (!document.getElementById('root')) window.EcoMotion.init();
})();
