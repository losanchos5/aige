/* Crosswalk drawer behaviour, loaded from a same-origin file so the CSP
   script-src 'self' holds (no inline JS). Every topic row header and grid cell
   is a link to that topic's section (#topic-<id>); with JS off they jump there
   natively. Here we intercept the click, clone the section into a modal drawer,
   highlight the references that belong to the framework column the reader came
   from, trap focus (Esc/scrim/Close close it) and restore focus on close. No
   opacity animation; the panel slides on transform only. Ported from
   public/path.js. */
(function () {
  'use strict';

  var drawer = document.getElementById('cw-drawer');
  if (!drawer) return;

  var grid = document.querySelector('[data-cw-grid]');
  var scrim = document.querySelector('.cw-scrim');
  var titleEl = document.getElementById('cw-drawer-title');
  var bodyEl = drawer.querySelector('[data-drawer-body]');
  var lastFocused = null;

  function esc(s) {
    return window.CSS && CSS.escape ? CSS.escape(s) : s;
  }

  // The topic's server-rendered section, found by its id (the <article> and the
  // grid rows share a data-cw-topic attribute, so key on the id to avoid it).
  function topicById(id) {
    return document.getElementById('topic-' + id);
  }

  function focusables() {
    var sel =
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.filter.call(drawer.querySelectorAll(sel), function (el) {
      return el.getClientRects().length > 0;
    });
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key !== 'Tab') return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0],
      last = items[items.length - 1],
      active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !drawer.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !drawer.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  }

  // Open motion, as in public/path.js. With the bundled runtime
  // (window.aigeMotion, from src/scripts/motion-ui.ts) the panel springs in from
  // its off-canvas position, then the body's direct children follow with a short
  // translateY stagger: transform only, never opacity. Under reduced motion
  // aigeMotion.run() skips the animation and the final state stands at once. If
  // the runtime has not loaded (or never does), the CSS transition on .is-open
  // is the baseline.
  function showDrawer() {
    var m = window.aigeMotion;
    if (!m) {
      requestAnimationFrame(function () {
        drawer.classList.add('is-open');
      });
      return;
    }
    // Opened straight from display:none, so .is-open lands without a CSS
    // transition; the spring owns the entrance.
    drawer.classList.add('is-open');
    m.run(function () {
      try {
        m.animate(
          drawer,
          { transform: ['translateX(100%)', 'none'] },
          { type: m.spring, stiffness: 320, damping: 30 },
        ).then(function () {
          drawer.style.removeProperty('transform');
        });
        var items = bodyEl ? Array.prototype.slice.call(bodyEl.children) : [];
        if (items.length) {
          m.animate(
            items,
            { transform: ['translateY(10px)', 'none'] },
            {
              duration: 0.32,
              ease: [0.2, 0.7, 0.2, 1],
              delay: m.stagger(0.04, { startDelay: 0.12 }),
            },
          );
        }
      } catch (e) {
        drawer.style.removeProperty('transform');
      }
    });
  }

  // The framework ids a column groups, read from that column header's data-fws.
  function colFws(col) {
    if (!grid || !col) return null;
    var th;
    try {
      th = grid.querySelector('th[data-cw-col="' + esc(col) + '"]');
    } catch (e) {
      th = null;
    }
    if (!th) return null;
    var raw = (th.getAttribute('data-fws') || '').split(/\s+/);
    var set = {};
    for (var i = 0; i < raw.length; i++) if (raw[i]) set[raw[i]] = true;
    return set;
  }

  function openDrawer(id, col) {
    if (!drawer.hidden) return;
    var article = topicById(id);
    if (!article) return;
    lastFocused = document.activeElement;

    var heading = article.querySelector('h3');
    if (titleEl) titleEl.textContent = heading ? heading.textContent : '';

    if (bodyEl) {
      bodyEl.innerHTML = '';
      var clone = article.cloneNode(true);
      // Drop the cloned heading (the title carries it) and the section id, so
      // the page keeps exactly one #topic-<id> for the native jump.
      var cloneHeading = clone.querySelector('h3');
      if (cloneHeading && cloneHeading.parentNode) {
        cloneHeading.parentNode.removeChild(cloneHeading);
      }
      clone.removeAttribute('id');
      while (clone.firstChild) bodyEl.appendChild(clone.firstChild);

      // Highlight the references belonging to the column the reader came from.
      var fws = colFws(col);
      if (fws) {
        var items = bodyEl.querySelectorAll('[data-fw]');
        for (var i = 0; i < items.length; i++) {
          if (fws[items[i].getAttribute('data-fw')]) {
            items[i].setAttribute('data-active', '');
          }
        }
      }
    }

    drawer.hidden = false;
    if (scrim) scrim.hidden = false;
    document.body.classList.add('cw-lock');
    showDrawer();
    var closeBtn = drawer.querySelector('[data-cw-close]');
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    if (scrim) scrim.hidden = true;
    document.body.classList.remove('cw-lock');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }

  var triggers = document.querySelectorAll('[data-cw-open]');
  for (var t = 0; t < triggers.length; t++) {
    (function (trigger) {
      // aria-haspopup is set only when JS runs; with JS off these are plain
      // in-page links, not dialog triggers.
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        openDrawer(
          trigger.getAttribute('data-cw-open'),
          trigger.getAttribute('data-cw-col'),
        );
      });
    })(triggers[t]);
  }

  Array.prototype.forEach.call(
    document.querySelectorAll('[data-cw-close]'),
    function (el) {
      el.addEventListener('click', closeDrawer);
    },
  );

  // On load we deliberately do NOT open the drawer from location.hash: a
  // #topic-<id> link should land on the section natively (matching no-JS).
})();
