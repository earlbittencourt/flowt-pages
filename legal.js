(() => {
  const copy = {
    pt: {
      "aria.home": "Flowt — início",
      "aria.language": "Idioma",
      "aria.footerLinks": "Links do rodapé",
      "aria.social": "Redes sociais",
      "aria.instagramSoon": "Instagram — em breve",
      "aria.x": "Flowt no X",
      "aria.reddit": "Flowt no Reddit",
      skip: "Pular para o conteúdo",
      "store.soon": "Em breve na",
      "footer.signature": "Feito por gente. Para quem sente histórias.",
      "footer.terms": "Termos de Uso",
      "footer.privacy": "Política de Privacidade",
      "footer.top": "Voltar ao topo ↑"
    },
    en: {
      "aria.home": "Flowt — home",
      "aria.language": "Language",
      "aria.footerLinks": "Footer links",
      "aria.social": "Social media",
      "aria.instagramSoon": "Instagram — coming soon",
      "aria.x": "Flowt on X",
      "aria.reddit": "Flowt on Reddit",
      skip: "Skip to content",
      "store.soon": "Coming soon on",
      "footer.signature": "Made by people. For people who feel stories.",
      "footer.terms": "Terms of Use",
      "footer.privacy": "Privacy Policy",
      "footer.top": "Back to top ↑"
    }
  };

  const pageMeta = {
    privacy: {
      pt: { title: "Política de Privacidade — Flowt", description: "Política de Privacidade do aplicativo Flowt." },
      en: { title: "Privacy Policy — Flowt", description: "Privacy Policy for the Flowt app." }
    },
    terms: {
      pt: { title: "Termos de Uso — Flowt", description: "Termos de Uso do aplicativo Flowt." },
      en: { title: "Terms of Use — Flowt", description: "Terms of Use for the Flowt app." }
    }
  };

  const header = document.querySelector("#site-header");
  const page = document.body.dataset.legalPage;

  function setLanguage(language) {
    const lang = copy[language] ? language : "pt";
    const dictionary = copy[lang];
    const meta = pageMeta[page]?.[lang];

    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    if (meta) {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    }

    document.querySelectorAll("[data-content-language]").forEach((section) => {
      section.hidden = section.dataset.contentLanguage !== lang;
    });
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const value = dictionary[element.dataset.i18nAria];
      if (value) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll("[data-language]").forEach((button) => {
      const active = button.dataset.language === lang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    try { localStorage.setItem("flowt-language", lang); } catch (_) { /* storage can be unavailable */ }
  }

  function updateHeader() {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  }

  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  window.addEventListener("scroll", updateHeader, { passive: true });

  let savedLanguage;
  try { savedLanguage = localStorage.getItem("flowt-language"); } catch (_) { savedLanguage = null; }
  const preferredLanguage = navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  setLanguage(savedLanguage === "pt" || savedLanguage === "en" ? savedLanguage : preferredLanguage);
  updateHeader();
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
