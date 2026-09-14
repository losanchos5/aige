/* Doc-page behaviour: the chapter drawer, TOC scroll-spy and the "copy citation"
   button. No framework, no inline handlers (CSP-safe). Loaded with `defer`. */
(function () {
  'use strict';

  /* ---- Chapter drawer (mobile off-canvas rail) ---- */
  var sidebar = document.getElementById('doc-sidebar');
  var scrim = document.querySelector('.doc-scrim');
  var openBtn = document.querySelector('[data-drawer-open]');
  var lastFocused = null;

  // Visible, tabbable elements inside the open drawer, for the focus trap.
  function focusables() {
    if (!sidebar) return [];
    var nodes = sidebar.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    return Array.prototype.filter.call(nodes, function (el) {
      return el.getClientRects().length > 0;
    });
  }

  // Esc closes; Tab / Shift+Tab wrap so focus stays within the drawer.
  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key !== 'Tab' || !sidebar) return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    var active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !sidebar.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !sidebar.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }

  function openDrawer() {
    if (!sidebar) return;
    lastFocused = document.activeElement;
    sidebar.classList.add('is-open');
    if (scrim) scrim.hidden = false;
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    var first = sidebar.querySelector('a, button');
    if (first) first.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeDrawer() {
    if (!sidebar || !sidebar.classList.contains('is-open')) return;
    sidebar.classList.remove('is-open');
    if (scrim) scrim.hidden = true;
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    // Restore focus to whatever opened the drawer (normally the toggle button).
    var restore = lastFocused && lastFocused.focus ? lastFocused : openBtn;
    if (restore) restore.focus();
    lastFocused = null;
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);
  Array.prototype.forEach.call(document.querySelectorAll('[data-drawer-close]'), function (el) {
    el.addEventListener('click', closeDrawer);
  });
  if (sidebar) {
    Array.prototype.forEach.call(sidebar.querySelectorAll('a'), function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  /* ---- TOC scroll-spy ---- */
  var links = new Map();
  Array.prototype.forEach.call(document.querySelectorAll('[data-toc-link]'), function (a) {
    links.set(a.getAttribute('data-toc-link'), a);
  });
  var headings = Array.prototype.slice.call(
    document.querySelectorAll('.prose h2[id], .prose h3[id]'),
  );

  if (links.size && headings.length && 'IntersectionObserver' in window) {
    var visible = new Set();

    function setActive() {
      var activeId = null;
      for (var i = 0; i < headings.length; i++) {
        if (visible.has(headings[i].id)) {
          activeId = headings[i].id;
          break;
        }
      }
      if (!activeId) {
        for (var j = 0; j < headings.length; j++) {
          if (headings[j].getBoundingClientRect().top < 120) activeId = headings[j].id;
        }
      }
      links.forEach(function (a, slug) {
        if (slug === activeId) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActive();
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    headings.forEach(function (h) {
      io.observe(h);
    });
    setActive();
  }

  /* ---- Copy citation ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy-cite]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy-cite') || '';
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(
        function () {
          var original = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(function () {
            btn.textContent = original;
          }, 1500);
        },
        function () {
          /* clipboard blocked; ignore */
        },
      );
    });
  });
})();
