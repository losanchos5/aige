/* Crosswalk drawer behaviour, loaded from a same-origin file so the CSP
   script-src 'self' holds (no inline JS). Every topic row header and grid cell
   is a link to that topic's section (#topic-<id>); with JS off they jump there
   natively. Here we intercept the click, clone the section into a modal drawer,
   highlight the references that belong to the framework column the reader came
   from, trap focus (Esc/scrim/Close close it), make the page behind inert while
   it is open and restore focus on close. No opacity animation; the panel
   slides on transform only. Ported from public/path.js. */
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
    // A <dialog> over the drawer (the search) owns the keyboard: no trap, and
    // its Esc closes only it. Its own Esc handler may already have closed it by
    // the time the key bubbles here, so a key from inside a dialog counts too.
    var t = e.target;
    if (document.querySelector('dialog[open]') || (t && t.closest && t.closest('dialog'))) return;
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

  // The page behind the open drawer goes inert (TC-15), through the helper
  // shared with the other drawers (public/inert.js, loaded first): header,
  // footer and the rest of <main>, never the scrim or a <dialog>.
  var setBackgroundInert = window.aigeInert ? window.aigeInert(drawer, scrim) : function () {};

  // Open motion, as in public/path.js. With the bundled runtime
  // (window.aigeMotion, from src/scripts/motion-ui.ts) aigeMotion.openPanel()
  // springs the panel in from its off-canvas position, then the body's direct
  // children follow with a short translateY stagger: transform only, never
  // opacity. Under reduced motion the final state stands at once. If the runtime
  // has not loaded (or never does), the CSS transition on .is-open is the
  // baseline.
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
    m.openPanel(drawer, bodyEl ? bodyEl.children : []);
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
    setBackgroundInert(true);
    // Esc and the focus trap are wired before the entrance runs, and a failed
    // entrance falls back to the CSS slide: the inert page behind is never left
    // without a way out. (Focus still moves after it: focusing first would
    // flush styles and let the CSS transition fight the spring.)
    document.addEventListener('keydown', onKeydown);
    try {
      showDrawer();
    } catch (err) {
      drawer.classList.add('is-open');
    }
    var closeBtn = drawer.querySelector('[data-cw-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    if (scrim) scrim.hidden = true;
    document.body.classList.remove('cw-lock');
    document.removeEventListener('keydown', onKeydown);
    // Lift inert before handing focus back: an inert trigger cannot take it.
    setBackgroundInert(false);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
  }

  // One delegated listener for every trigger (the grid carries about 250), so
  // wiring costs nothing on load and a click works from the first frame.
  document.addEventListener('click', function (e) {
    var trigger = e.target && e.target.closest ? e.target.closest('[data-cw-open]') : null;
    if (!trigger) return;
    e.preventDefault();
    openDrawer(trigger.getAttribute('data-cw-open'), trigger.getAttribute('data-cw-col'));
  });

  // Run a non-urgent task once the page is idle (after load work), or soon.
  function whenIdle(fn) {
    if (window.requestIdleCallback) window.requestIdleCallback(fn, { timeout: 1500 });
    else setTimeout(fn, 200);
  }

  // aria-haspopup is set only when JS runs; with JS off these are plain in-page
  // links, not dialog triggers. It is announced, never painted, so it waits
  // for an idle moment instead of touching every trigger during load.
  whenIdle(function () {
    var triggers = document.querySelectorAll('[data-cw-open]');
    for (var t = 0; t < triggers.length; t++) triggers[t].setAttribute('aria-haspopup', 'dialog');
  });

  Array.prototype.forEach.call(
    document.querySelectorAll('[data-cw-close]'),
    function (el) {
      el.addEventListener('click', closeDrawer);
    },
  );

  // On load we deliberately do NOT open the drawer from location.hash: a
  // #topic-<id> link should land on the section natively (matching no-JS).

  // Column chooser (crosswalk v2). The optional columns ship hidden by CSS
  // (.cw-col-opt); here each column's header and cells take .is-on or .is-off
  // from the chooser, and the choice is remembered in this browser only
  // (localStorage, every access guarded: private windows and blocked storage
  // fall back to the default columns).
  var chooser = document.querySelector('[data-cw-cols]');
  if (grid && chooser) {
    var STORE = 'aige.crosswalk.columns.v2';
    var picks = chooser.querySelectorAll('input[data-cw-colpick]');
    var countEl = chooser.querySelector('[data-cw-cols-count]');

    var readStore = function () {
      try {
        var raw = window.localStorage.getItem(STORE);
        var list = raw ? JSON.parse(raw) : null;
        return Array.isArray(list) ? list : null;
      } catch (e) {
        return null;
      }
    };
    var writeStore = function (list) {
      try {
        window.localStorage.setItem(STORE, JSON.stringify(list));
      } catch (e) {
        /* storage blocked: the choice lasts for this page view only */
      }
    };

    // skipCells: the markup already shows exactly these columns (the defaults,
    // on load), so only the chooser's own state is written and the grid's few
    // hundred cells are left alone: no style recalculation of the table while
    // the page is still loading.
    var applyColumns = function (list, skipCells) {
      var on = {};
      for (var i = 0; i < list.length; i++) on[list[i]] = true;
      // Cell links carry data-cw-col too (for the drawer); only th/td toggle.
      var cells = skipCells ? [] : grid.querySelectorAll('th[data-cw-col], td[data-cw-col]');
      for (var c = 0; c < cells.length; c++) {
        var shown = !!on[cells[c].getAttribute('data-cw-col')];
        cells[c].classList.toggle('is-on', shown);
        cells[c].classList.toggle('is-off', !shown);
      }
      var n = 0;
      for (var p = 0; p < picks.length; p++) {
        picks[p].checked = !!on[picks[p].value];
        if (picks[p].checked) n++;
      }
      if (countEl) countEl.textContent = n + ' of ' + picks.length;
    };

    var chosen = function () {
      var list = [];
      for (var i = 0; i < picks.length; i++) if (picks[i].checked) list.push(picks[i].value);
      return list;
    };
    var defaults = function () {
      var list = [];
      for (var i = 0; i < picks.length; i++) {
        if (picks[i].getAttribute('data-default') === 'true') list.push(picks[i].value);
      }
      return list;
    };

    var known = {};
    for (var k = 0; k < picks.length; k++) known[picks[k].value] = true;
    var stored = readStore();
    var initial = stored
      ? stored.filter(function (id) {
          return known[id];
        })
      : [];
    var base = defaults();
    var start = initial.length ? initial : base;
    var sameAsMarkup =
      start.length === base.length &&
      start.every(function (id) {
        return base.indexOf(id) !== -1;
      });
    applyColumns(start, sameAsMarkup);
    chooser.hidden = false;

    chooser.addEventListener('change', function (e) {
      var t = e.target;
      if (!t || !t.hasAttribute || !t.hasAttribute('data-cw-colpick')) return;
      var list = chosen();
      // Keep at least one column: unticking the last one is undone.
      if (!list.length) {
        t.checked = true;
        list = chosen();
      }
      applyColumns(list);
      writeStore(list);
    });
    var allBtn = chooser.querySelector('[data-cw-cols-all]');
    if (allBtn) {
      allBtn.addEventListener('click', function () {
        var list = [];
        for (var i = 0; i < picks.length; i++) list.push(picks[i].value);
        applyColumns(list);
        writeStore(list);
      });
    }
    var resetBtn = chooser.querySelector('[data-cw-cols-reset]');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var list = defaults();
        applyColumns(list);
        writeStore(list);
      });
    }
  }
})();
