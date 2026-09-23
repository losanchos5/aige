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

  // A toggle button keeps one fixed name ("Dark theme", set in
  // ThemeToggle.astro) and carries its state in aria-pressed alone; flipping
  // the label as well made it announce a double state.
  function syncToggle(btn) {
    var dark = resolvedTheme() === 'dark';
    btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  function initTheme() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    syncToggle(btn);
    btn.addEventListener('click', function () {
      var next = resolvedTheme() === 'dark' ? 'light' : 'dark';
      if (typeof window.__setTheme === 'function') window.__setTheme(next);
      syncToggle(btn);
      // The bundled motion-ui module animates the incoming icon; the flip
      // itself (data-theme + CSS icon swap) has already happened above.
      if (resolvedTheme() === next) {
        document.dispatchEvent(new CustomEvent('theme:changed', { detail: { theme: next } }));
      }
    });
  }

  function initReveal() {
    // Modern browsers drive the reveal off the scroll position in CSS
    // (animation-timeline: view()); leave those alone.
    try {
      if (window.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) return;
    } catch (e) {}
    var reduce = false;
    try {
      reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {}
    var items = document.querySelectorAll('.reveal, .reveal-stagger > *');
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

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var scrolled = false;
    var ticking = false;
    function apply() {
      ticking = false;
      var next = window.scrollY > 8;
      if (next === scrolled) return;
      scrolled = next;
      header.classList.toggle('is-scrolled', scrolled);
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    }
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function init() {
    initTheme();
    initReveal();
    initHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
