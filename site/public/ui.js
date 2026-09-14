/* UI behaviour, loaded from a same-origin file so the CSP script-src 'self'
   holds (no inline JS). Theme toggle, reveal-on-scroll, and menu niceties.
   theme.js has already applied the persisted theme and exposed __setTheme. */
(function () {
  'use strict';

  function resolvedTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  }

  function syncToggle(btn) {
    var dark = resolvedTheme() === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  function initTheme() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    syncToggle(btn);
    btn.addEventListener('click', function () {
      var next = resolvedTheme() === 'dark' ? 'light' : 'dark';
      if (typeof window.__setTheme === 'function') window.__setTheme(next);
      syncToggle(btn);
    });
  }

  function initReveal() {
    var reduce = false;
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    var items = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window) || !items.length) return;
    document.documentElement.classList.add('js-reveal');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  function initMenu() {
    var disc = document.querySelector('.nav-disc');
    if (!disc) return;
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && disc.open) {
        disc.open = false;
        var s = disc.querySelector('summary');
        if (s) s.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (disc.open && !disc.contains(e.target)) disc.open = false;
    });
  }

  function init() {
    initTheme();
    initReveal();
    initMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
