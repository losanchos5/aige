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
  var tocMarker = document.querySelector('[data-toc-marker]');
  var tocList = document.querySelector('.toc-list');

  // Index of a heading id within the document-order headings list (-1 if none).
  function headingIndex(id) {
    for (var k = 0; k < headings.length; k++) {
      if (headings[k].id === id) return k;
    }
    return -1;
  }

  if (links.size && headings.length && 'IntersectionObserver' in window) {
    var visible = new Set();

    // Slide the 2px marker to the active entry and size it to that entry.
    function moveMarker(activeId) {
      if (!tocMarker || !tocList || !activeId) return;
      var link = links.get(activeId);
      if (!link) return;
      var lr = link.getBoundingClientRect();
      var cr = tocList.getBoundingClientRect();
      tocMarker.style.height = lr.height + 'px';
      tocMarker.style.transform = 'translateY(' + (lr.top - cr.top) + 'px)';
    }

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
      var activeIdx = headingIndex(activeId);
      links.forEach(function (a, slug) {
        if (slug === activeId) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
        var idx = headingIndex(slug);
        if (activeIdx !== -1 && idx !== -1 && idx < activeIdx) a.classList.add('is-past');
        else a.classList.remove('is-past');
      });
      moveMarker(activeId);
    }

    window.addEventListener('resize', setActive, { passive: true });

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

  /* ---- Reading progress: top hairline, sidebar register, read state ---- */
  (function () {
    var article = document.querySelector('.prose');
    var bar = document.querySelector('[data-doc-progress]');
    var header = document.querySelector('.site-header');
    var current = document.querySelector('.nav-item[aria-current="page"]');
    var slug = current && current.getAttribute('data-chapter-slug');
    var READ_KEY = 'aige.read';

    function readList() {
      try {
        var raw = JSON.parse(localStorage.getItem(READ_KEY) || '[]');
        return Array.isArray(raw) ? raw : [];
      } catch (e) {
        return [];
      }
    }

    // Cosmetic "read" state for other chapters, from localStorage.
    var read = readList();
    Array.prototype.forEach.call(
      document.querySelectorAll('.nav-item[data-chapter-slug]'),
      function (el) {
        var s = el.getAttribute('data-chapter-slug');
        if (s !== slug && read.indexOf(s) !== -1) el.classList.add('is-read');
      },
    );

    function place() {
      if (bar && header) bar.style.top = header.getBoundingClientRect().height + 'px';
    }

    var marked = false;
    var ticking = false;

    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var docFrac = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar) bar.style.transform = 'scaleX(' + docFrac.toFixed(4) + ')';

      if (article && current) {
        var top = article.getBoundingClientRect().top + window.scrollY;
        var h = article.offsetHeight || 1;
        var artFrac = Math.min(1, Math.max(0, (window.scrollY + window.innerHeight - top) / h));
        current.style.setProperty('--np', artFrac.toFixed(3));
        if (!marked && slug && artFrac >= 0.9) {
          marked = true;
          try {
            var list = readList();
            if (list.indexOf(slug) === -1) {
              list.push(slug);
              localStorage.setItem(READ_KEY, JSON.stringify(list));
            }
          } catch (e) {
            /* storage blocked; the register is purely cosmetic */
          }
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    if (bar || (article && current)) {
      place();
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener(
        'resize',
        function () {
          place();
          update();
        },
        { passive: true },
      );
    }
  })();
})();
