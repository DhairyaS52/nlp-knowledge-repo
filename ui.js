/* ============================================================
   ui.js
   Advanced UI: dark mode, search, scroll, expandable cards,
   mobile nav, print, animations. Content untouched.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileNav();
  initSmoothScroll();
  initScrollProgress();
  initBackToTop();
  initConceptSearch();
  initExpandableCards();
  initPrint();
  initScrollAnimations();
  initActiveNavLink();
});

function initTheme() {
  const toggle = document.getElementById("theme-toggle");

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("nlp-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("nlp-theme", "dark");
    }
  });
}

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const navbar = document.getElementById("navbar");

  const closeNav = () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    links.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    links.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  links.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target) && links.classList.contains("open")) closeNav();
  });

  // Close mobile nav with Escape for better accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && links.classList.contains("open")) closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeNav();
  });
}


function initSmoothScroll() {
  const navHeight = () => document.getElementById("navbar").offsetHeight + 8;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight();
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", id);
    });
  });
}











function initScrollProgress() {

  const bar = document.getElementById("scroll-progress");
  let ticking = false;

  const update = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0}%`;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
}

function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  let ticking = false;

  const update = () => {
    btn.classList.toggle("visible", window.scrollY > 400);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

function initConceptSearch() {
  const input = document.getElementById("concept-search");
  const clearBtn = document.getElementById("concept-search-clear");
  const status = document.getElementById("concept-search-status");
  const cards = () => document.querySelectorAll(".concept-card");

  const filter = () => {
    const query = input.value.trim().toLowerCase();
    clearBtn.hidden = !query;
    let visible = 0;

    cards().forEach((card) => {
      const match = !query || card.dataset.search.includes(query);
      card.classList.toggle("search-hidden", !match);
      if (match) visible++;
    });

    if (query && visible) {
      cards().forEach((card) => {
        if (!card.classList.contains("search-hidden")) expandCard(card);
      });
    }

    status.textContent = query
      ? visible
        ? `Showing ${visible} of ${cards().length} concept cards`
        : "No concept cards match your search"
      : "";
  };

  input.addEventListener("input", filter);
  clearBtn.addEventListener("click", () => {
    input.value = "";
    filter();
    input.focus();
  });
}

function expandCard(card) {
  card.classList.add("expanded");
  const btn = card.querySelector(".expand-btn");
  const label = card.querySelector(".expand-btn-text");
  if (btn) btn.setAttribute("aria-expanded", "true");
  if (label) label.textContent = "Collapse";
}

function initExpandableCards() {
  document.querySelectorAll(".expandable-card").forEach((card) => {
    const btn = card.querySelector(".expand-btn");
    const label = btn.querySelector(".expand-btn-text");

    const setExpanded = (expanded) => {
      card.classList.toggle("expanded", expanded);
      btn.setAttribute("aria-expanded", String(expanded));
      label.textContent = expanded ? "Collapse" : "Expand";
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      setExpanded(!card.classList.contains("expanded"));
    });

    card.querySelector(".card-expand-header").addEventListener("click", (e) => {
      if (e.target.closest(".expand-btn")) return;
      setExpanded(!card.classList.contains("expanded"));
    });
  });
}

function initPrint() {
  document.getElementById("print-btn").addEventListener("click", () => {
    document.querySelectorAll(".expandable-card").forEach((card) => expandCard(card));
    window.print();
  });
}

function initScrollAnimations() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const targets = document.querySelectorAll(
    ".section, .card, .comparison-block, .workflow-block, .sustainability-text"
  );
  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

function initActiveNavLink() {
  const sections = document.querySelectorAll("main .section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  let ticking = false;

  const setActive = () => {
    const scrollPos = window.scrollY + 120;
    let current = "home";
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(setActive);
      ticking = true;
    }
  }, { passive: true });
  setActive();
}
