/* Doc-page behaviour: the chapter drawer, TOC scroll-spy and the "copy citation"
   button. No framework, no inline handlers (CSP-safe). Loaded with `defer`. */
(function () {
  'use strict';

  /* ---- Chapter drawer (mobile off-canvas rail) ---- */
  var sidebar = document.getElementById('doc-sidebar');
  var scrim = document.querySelector('.doc-scrim');
  var openBtn = document.querySelector('[data-drawer-open]');
  var lastFocused = null;
  // The page behind the open drawer goes inert (TC-15), through the helper
  // shared with the other drawers (public/inert.js, loaded first): header,
  // footer and the rest of <main>, never the scrim or a <dialog>.
  var setBackgroundInert = window.aigeInert ? window.aigeInert(sidebar, scrim) : function () {};

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
    // A <dialog> over the drawer (the search, opened from the rail's own button
    // or Ctrl+K) owns the keyboard: no trap, and its Esc closes only it. Its own
    // Esc handler may already have closed it by the time the key bubbles here,
    // so a key from inside a dialog counts too.
    var t = e.target;
    if (document.querySelector('dialog[open]') || (t && t.closest && t.closest('dialog'))) return;
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

  // Open, the drawer is a named modal dialog with the page behind it inert;
  // closed (and on the desktop rail) it is a plain <div> whose inner
  // <nav aria-label="Chapters"> is the landmark (an <aside> may not take
  // role="dialog"). The CSS hides the closed drawer with visibility, which
  // also takes its links out of the tab order.
  function openDrawer() {
    if (!sidebar) return;
    lastFocused = document.activeElement;
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-modal', 'true');
    sidebar.setAttribute('aria-label', 'Chapters');
    sidebar.classList.add('is-open');
    if (scrim) scrim.hidden = false;
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    setBackgroundInert(true);
    var first = sidebar.querySelector('a, button');
    if (first) first.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeDrawer() {
    if (!sidebar || !sidebar.classList.contains('is-open')) return;
    sidebar.classList.remove('is-open');
    sidebar.removeAttribute('role');
    sidebar.removeAttribute('aria-modal');
    sidebar.removeAttribute('aria-label');
    if (scrim) scrim.hidden = true;
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    // Lift inert before handing focus back: an inert trigger cannot take it.
    setBackgroundInert(false);
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
    // Widening past the drawer breakpoint turns the drawer back into the
    // static rail: drop the dialog state and the focus trap with it.
    if (window.matchMedia) {
      var wide = window.matchMedia('(min-width: 840px)');
      var onWide = function (e) {
        if (e.matches) closeDrawer();
      };
      if (wide.addEventListener) wide.addEventListener('change', onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
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
  var tocBox = document.querySelector('.doc-toc');

  // Index of a heading id within the document-order headings list (-1 if none).
  function headingIndex(id) {
    for (var k = 0; k < headings.length; k++) {
      if (headings[k].id === id) return k;
    }
    return -1;
  }

  // First measurements wait for the first frame: read during script
  // evaluation, a getBoundingClientRect forces the whole chapter's layout inside
  // this task (a long task on the longest chapters). After the frame the layout
  // is already done and the reads are free.
  function afterFirstFrame(fn) {
    if (!window.requestAnimationFrame) return fn();
    requestAnimationFrame(function () {
      setTimeout(fn, 0);
    });
  }

  // The TOC marker and the sidebar rail used to be placed before their CSS
  // transition could apply; placed after the first frame they would slide in
  // from the top. Their transition is held off until the first placement has
  // been painted, so they still simply appear in place.
  function holdTransition(el) {
    if (el) el.style.transition = 'none';
  }

  function releaseTransition(el) {
    if (!el || !window.requestAnimationFrame) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.transition = '';
      });
    });
  }

  if (links.size && headings.length && 'IntersectionObserver' in window) {
    var visible = new Set();

    // Slide the 2px marker to the active entry and size it to that entry, with
    // transform only: scaleY stretches the marker's CSS height to the entry's.
    function moveMarker(activeId) {
      if (!tocMarker || !tocList || !activeId) return;
      var link = links.get(activeId);
      if (!link) return;
      var lr = link.getBoundingClientRect();
      var cr = tocList.getBoundingClientRect();
      var base = tocMarker.offsetHeight || 1;
      tocMarker.style.transform =
        'translateY(' + (lr.top - cr.top) + 'px) scaleY(' + (lr.height / base).toFixed(4) + ')';
    }

    // A TOC taller than the viewport scrolls inside its sticky column: keep the
    // current entry in view there. Only the column scrolls, never the page.
    function revealActive(activeId) {
      if (!tocBox || !activeId || tocBox.scrollHeight <= tocBox.clientHeight) return;
      var link = links.get(activeId);
      if (!link) return;
      var br = tocBox.getBoundingClientRect();
      var lr = link.getBoundingClientRect();
      var margin = 48;
      if (lr.top < br.top + margin) tocBox.scrollTop -= br.top + margin - lr.top;
      else if (lr.bottom > br.bottom - margin) tocBox.scrollTop += lr.bottom - (br.bottom - margin);
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
      revealActive(activeId);
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
    holdTransition(tocMarker);
    afterFirstFrame(function () {
      setActive();
      releaseTransition(tocMarker);
    });
  }

  /* ---- Copy citation ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy-cite]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy-cite') || '';
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(
        function () {
          var original = btn.textContent;
          btn.textContent = btn.getAttribute('data-copied') || 'Copied';
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

  /* ---- Sidebar rail: slide an accent onto the current chapter row ---- */
  (function () {
    var nav = document.querySelector('.sidebar-nav');
    var rail = nav && nav.querySelector('[data-nav-rail]');
    var currentRow = nav && nav.querySelector('.nav-item[aria-current="page"]');
    if (!nav || !rail || !currentRow) return;

    function placeRail() {
      var nr = nav.getBoundingClientRect();
      var cr = currentRow.getBoundingClientRect();
      var base = rail.offsetHeight || 1;
      rail.style.transform =
        'translateY(' + (cr.top - nr.top) + 'px) scaleY(' + (cr.height / base).toFixed(4) + ')';
      var ink = getComputedStyle(currentRow).getPropertyValue('--layer-ink').trim();
      if (ink) rail.style.background = ink;
    }

    holdTransition(rail);
    afterFirstFrame(function () {
      placeRail();
      releaseTransition(rail);
    });
    window.addEventListener('resize', placeRail, { passive: true });
  })();

  /* ---- Reading progress: top hairline, sidebar register, read state ---- */
  (function () {
    var article = document.querySelector('.prose');
    var bar = document.querySelector('[data-doc-progress]');
    var header = document.querySelector('.site-header');
    var current = document.querySelector('.nav-item[aria-current="page"]');
    var slug = current && current.getAttribute('data-chapter-slug');
    var READ_KEY = 'aige.read';

    // On browsers with a scroll-progress timeline the CSS animation drives the
    // hairline, so leave style.transform untouched (they must not fight).
    var cssScroll = false;
    try {
      cssScroll = !!(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()'));
    } catch (e) {}

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
      if (bar && !cssScroll) bar.style.transform = 'scaleX(' + docFrac.toFixed(4) + ')';

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
      afterFirstFrame(function () {
        place();
        update();
      });
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
