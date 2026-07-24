/* The Maple Leaf — site behaviour */

(() => {
  const lang = document.body?.dataset?.lang === "fr" ? "fr" : "en";

  /* —— Year in footer —— */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* —— Mobile nav (hamburger) —— */
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  const backdrop = document.getElementById("navBackdrop");

  function setNavOpen(open) {
    if (!header || !toggle || !nav) return;
    header.classList.toggle("is-nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      open
        ? lang === "fr"
          ? "Fermer le menu"
          : "Close menu"
        : lang === "fr"
          ? "Ouvrir le menu"
          : "Open menu"
    );
    if (backdrop) {
      backdrop.hidden = !open;
    }
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      setNavOpen(!header.classList.contains("is-nav-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    if (backdrop) {
      backdrop.addEventListener("click", () => setNavOpen(false));
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setNavOpen(false);
    });

    window.addEventListener("resize", () => {
      /* Desktop / tablet: full nav — never leave hamburger open */
      if (window.matchMedia("(min-width: 769px)").matches) {
        setNavOpen(false);
      }
    });
  }

  /* —— Federal / province / both scope toggle —— */
  const buttons = document.querySelectorAll(".scope-btn");
  const panels = document.querySelectorAll(".scope-panel");
  const hint = document.getElementById("scopeHint");

  const hints = {
    en: {
      federal:
        "<strong>Federal:</strong> tax design, transfers, immigration, Criminal Code, federal ledger &amp; contracts, dollar &amp; food/drug statutes.",
      province:
        "<strong>Provincial:</strong> health delivery, schools, provincial tax &amp; contracts, local enforcement — where Maple holds the legislature.",
      both:
        "<strong>Both levels:</strong> the whole picture in that province — tax cuts that add up, merit health, open contracts, schools, and vice laws enforced on the ground.",
    },
    fr: {
      federal:
        "<strong>Fédéral :</strong> impôts, transferts, immigration, Code criminel, grand livre et contrats fédéraux, dollar et lois alimentaires/drogues.",
      province:
        "<strong>Provincial :</strong> soins, écoles, impôts et contrats provinciaux, application locale — là où la Feuille d’érable détient la législature.",
      both:
        "<strong>Les deux niveaux :</strong> la pile complète — baisses empilées, santé au mérite, contrats ouverts, écoles, application des lois sur les vices.",
    },
  };

  let hintEl = hint;
  if (!hintEl) {
    const bar = document.querySelector(".scope-bar");
    if (bar) {
      hintEl = document.createElement("p");
      hintEl.className = "scope-hint";
      hintEl.id = "scopeHint";
      bar.insertAdjacentElement("afterend", hintEl);
    }
  }

  function setScope(scope) {
    buttons.forEach((b) => {
      b.classList.toggle("is-active", b.dataset.scope === scope);
      b.setAttribute("aria-pressed", b.dataset.scope === scope ? "true" : "false");
    });
    panels.forEach((p) => {
      const show = (p.dataset.show || "").split(/\s+/);
      p.hidden = !show.includes(scope);
    });
    const pack = hints[lang] || hints.en;
    if (hintEl && pack[scope]) {
      hintEl.innerHTML = pack[scope];
    }
    document.body.dataset.scope = scope;
  }

  buttons.forEach((b) => {
    b.setAttribute("aria-pressed", b.classList.contains("is-active") ? "true" : "false");
    b.addEventListener("click", () => setScope(b.dataset.scope));
  });

  if (buttons.length) setScope("federal");

  /*
   * Join / volunteer forms — honest path only.
   * This site has no backend. Submit opens the visitor's mail app to
   * contact@mapleleafparty.ca with a prefilled body. Nothing is stored
   * or claimed "received" on this page.
   */
  const form = document.getElementById("joinForm");
  const note = document.getElementById("joinNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("#join-name");
      const email = form.querySelector("#join-email");
      if (!name?.value?.trim() || !email?.validity?.valid) {
        if (note) {
          note.textContent =
            lang === "fr"
              ? "Veuillez laisser un vrai nom et une adresse qui fonctionne."
              : "Please leave a true name and a working address.";
        }
        return;
      }

      const kind = form.dataset.kind || "join";
      const postal = form.querySelector("#join-postal");
      const skills = form.querySelector("#vol-skills");
      const region = form.querySelector("#vol-region");
      const updates = form.querySelector("#join-updates");

      const subject =
        lang === "fr"
          ? kind === "volunteer"
            ? "Feuille d’érable — offre de bénévolat"
            : "Feuille d’érable — intérêt à joindre"
          : kind === "volunteer"
            ? "Maple Leaf — volunteer offer"
            : "Maple Leaf — join interest";

      const lines =
        lang === "fr"
          ? [
              `Nom: ${name.value.trim()}`,
              `Courriel: ${email.value.trim()}`,
              postal?.value?.trim() ? `Code postal: ${postal.value.trim()}` : null,
              skills?.value?.trim() ? `Compétences: ${skills.value.trim()}` : null,
              region?.value?.trim() ? `Région: ${region.value.trim()}` : null,
              updates
                ? `Mises à jour: ${updates.checked ? "oui" : "non"}`
                : null,
              "",
              "(Envoyé depuis le site. Rien n’est stocké sur le site — seul ce courriel compte.)",
            ]
          : [
              `Name: ${name.value.trim()}`,
              `Email: ${email.value.trim()}`,
              postal?.value?.trim() ? `Postal code: ${postal.value.trim()}` : null,
              skills?.value?.trim() ? `Skills: ${skills.value.trim()}` : null,
              region?.value?.trim() ? `Region: ${region.value.trim()}` : null,
              updates
                ? `Updates: ${updates.checked ? "yes" : "no"}`
                : null,
              "",
              "(Sent from the website. Nothing is stored on the site — only this email counts.)",
            ];

      const body = lines.filter((line) => line != null).join("\n");
      const href = `mailto:contact@mapleleafparty.ca?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      if (note) {
        note.textContent =
          lang === "fr"
            ? "Votre application de courriel devrait s’ouvrir. Envoyez le message pour qu’il nous parvienne. Rien n’est enregistré sur ce site."
            : "Your email app should open. Send the message so it reaches us. Nothing is stored on this site.";
      }

      window.location.href = href;
    });
  }
})();
