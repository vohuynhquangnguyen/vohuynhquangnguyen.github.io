/* ==========================================================================
   Neoclassical theme — interactivity
   - Hero stagger entry (word-level)
   - Scroll-triggered reveals via IntersectionObserver
   - Hero parallax (subtle)
   - Sticky-nav shrink on scroll
   - Mobile nav toggle
   - Reading-progress bar
   - Smooth scroll for in-page anchors
   Respects prefers-reduced-motion at every step.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- Hero: split title into spans for staggered fade-in ------------------
  function splitTitle() {
    var el = document.querySelector("[data-stagger]");
    if (!el || el.dataset.split === "1") return;
    var words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (w, i) {
      var span = document.createElement("span");
      span.className = "nc-word";
      span.textContent = w;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
    el.dataset.split = "1";
  }

  // ---- Reveal-on-scroll ---------------------------------------------------
  function setupReveals() {
    var targets = document.querySelectorAll(".nc-reveal, .nc-stop");
    if (!("IntersectionObserver" in window) || prefersReduced) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  // ---- Hero parallax (transform-only, rAF-throttled) ----------------------
  function setupParallax() {
    if (prefersReduced) return;
    var bg = document.querySelector(".nc-hero__bg[data-parallax]");
    if (!bg) return;
    var ticking = false;
    function update() {
      var y = window.scrollY || 0;
      // soft parallax: bg moves at 0.35x scroll, scaled to keep edges covered
      var translate = Math.min(y * 0.35, 240);
      bg.style.transform = "translate3d(0," + translate + "px, 0) scale(1.08)";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  // ---- Reading-progress bar -----------------------------------------------
  function setupProgress() {
    var bar = document.querySelector(".nc-progress");
    if (!bar) return;
    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100));
      bar.style.width = pct + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  // ---- Sticky-nav shrink + mobile toggle ----------------------------------
  function setupNav() {
    var nav = document.querySelector(".nc-nav");
    if (!nav) return;

    var ticking = false;
    function onScroll() {
      var y = window.scrollY || 0;
      nav.classList.toggle("is-condensed", y > 24);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    var toggle = nav.querySelector(".nc-nav__toggle");
    var menu   = nav.querySelector(".nc-nav__links");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      menu.addEventListener("click", function (e) {
        if (e.target.tagName === "A") nav.classList.remove("is-open");
      });
    }
  }

  // ---- Smooth-scroll for in-page anchors (respects reduced motion) --------
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start"
        });
        // Move focus for keyboard / SR users
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  // ---- Boot ----------------------------------------------------------------
  function boot() {
    splitTitle();
    setupReveals();
    setupParallax();
    setupProgress();
    setupNav();
    setupSmoothScroll();
    requestAnimationFrame(function () {
      document.body.classList.add("is-loaded");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
