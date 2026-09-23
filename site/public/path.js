/* Learning-path behaviour, loaded from a same-origin file so the CSP
   script-src 'self' holds. Tracks per-node progress in localStorage, drives the
   stage/overall meters, opens a focus-trapped modal drawer per node (Esc/scrim
   close, focus restored), and precomputes the cross-stage prerequisite edges
   >=840px — kept hidden and revealed only for the node under the pointer/focus
   or open in the drawer. No-JS falls back to the native <details> bodies and
   the CSS spine. */
(function () {
  'use strict';

  var root = document.querySelector('[data-path]');
  if (!root) return;
  root.classList.add('path-js');

  var KEY = 'aige.path';
  var STATES = { done: 'Done', learning: 'Learning', skipped: 'Skipped' };

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};
      var clean = {};
      for (var k in raw) {
        if (
          Object.prototype.hasOwnProperty.call(raw, k) &&
          (raw[k] === 'done' || raw[k] === 'learning' || raw[k] === 'skipped')
        ) {
          clean[k] = raw[k];
        }
      }
      return clean;
    } catch (e) {
      return {};
    }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {} // storage blocked; progress is a per-visit convenience
  }
  function esc(s) {
    return window.CSS && CSS.escape ? CSS.escape(s) : s;
  }
  function nodeById(id) {
    // CSS.escape is guarded in esc(), but building/querying the selector is
    // wrapped too: a missing/throwing CSS.escape must never break the page.
    try {
      return root.querySelector('.path-node[data-node="' + esc(id) + '"]');
    } catch (e) {
      return null;
    }
  }

  var state = load();
  var nodes = Array.prototype.slice.call(root.querySelectorAll('.path-node'));
  var stages = Array.prototype.slice.call(root.querySelectorAll('.path-stage'));

  /* ---- progress ---- */
  function setMeter(el, frac) {
    if (!el) return;
    el.style.setProperty('--pct', String(frac));
    el.setAttribute('aria-valuenow', String(Math.round(frac * 100)));
  }

  function applyState() {
    for (var i = 0; i < nodes.length; i++) {
      var li = nodes[i];
      var s = state[li.getAttribute('data-node')] || '';
      li.setAttribute('data-state', s);
      var status = li.querySelector('[data-node-status]');
      if (status) status.textContent = s ? STATES[s] : 'Not started';
    }
    var tDone = 0, tCount = 0, tSkip = 0;
    for (var g = 0; g < stages.length; g++) {
      var stage = stages[g];
      var sid = stage.getAttribute('data-stage');
      var sNodes = stage.querySelectorAll('.path-node');
      var done = 0, skip = 0;
      for (var n = 0; n < sNodes.length; n++) {
        var v = state[sNodes[n].getAttribute('data-node')];
        if (v === 'done') done++;
        else if (v === 'skipped') skip++;
      }
      tDone += done;
      tCount += sNodes.length;
      tSkip += skip;
      var denom = sNodes.length - skip;
      var pct = denom > 0 ? done / denom : 0;
      setMeter(stage.querySelector('[data-stage-meter="' + esc(sid) + '"]'), pct);
      var txt = stage.querySelector('[data-stage-progress="' + esc(sid) + '"]');
      if (txt) txt.textContent = Math.round(pct * 100) + '%';
    }
    var tDenom = tCount - tSkip;
    var tPct = tDenom > 0 ? tDone / tDenom : 0;
    setMeter(root.querySelector('[data-path-total]'), tPct);
    var tTxt = root.querySelector('[data-path-total-text]');
    if (tTxt) tTxt.textContent = Math.round(tPct * 100) + '%';
  }

  /* ---- drawer (focus trap ported from public/ui-doc.js) ---- */
  var drawer = document.getElementById('path-drawer');
  var scrim = document.querySelector('.path-scrim');
  var titleEl = document.getElementById('path-drawer-title');
  var bodyEl = drawer && drawer.querySelector('[data-drawer-body]');
  var kindEl = drawer && drawer.querySelector('[data-drawer-kind]');
  var layerEl = drawer && drawer.querySelector('[data-drawer-layer]');
  var stateBtns = drawer
    ? Array.prototype.slice.call(drawer.querySelectorAll('[data-path-state]'))
    : [];
  var lastFocused = null;
  var currentId = null;

  function focusables() {
    if (!drawer) return [];
    var sel = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.filter.call(drawer.querySelectorAll(sel), function (el) {
      return el.getClientRects().length > 0;
    });
  }
  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeDrawer();
      return;
    }
    if (e.key !== 'Tab' || !drawer) return;
    var items = focusables();
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1], active = document.activeElement;
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
  // Open motion. With the bundled runtime (window.aigeMotion, from
  // src/scripts/motion-ui.ts) aigeMotion.openPanel() springs the panel in from
  // its off-canvas position, then the body's blocks follow with a short
  // translateY stagger: transform only, never opacity. The body holds one cloned
  // .pn-body, so its blocks (the summary and each section) are the staggered
  // items. Under reduced motion the final state stands at once. If the runtime
  // has not loaded (or never does), the CSS transition on .is-open is the
  // baseline.
  function staggerItems() {
    if (!bodyEl) return [];
    var items = bodyEl.children;
    if (items.length === 1 && items[0].children.length > 1) items = items[0].children;
    return Array.prototype.slice.call(items);
  }
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
    m.openPanel(drawer, staggerItems());
  }

  function syncStateButtons() {
    var s = currentId ? state[currentId] : '';
    for (var i = 0; i < stateBtns.length; i++) {
      stateBtns[i].setAttribute(
        'aria-pressed',
        stateBtns[i].getAttribute('data-path-state') === s ? 'true' : 'false',
      );
    }
  }

  function openDrawer(id) {
    var li = nodeById(id);
    if (!drawer || !li) return;
    currentId = id;
    lastFocused = document.activeElement;
    var titleSrc = li.querySelector('.pn-title');
    if (titleEl) titleEl.textContent = titleSrc ? titleSrc.textContent : '';
    if (kindEl) kindEl.textContent = li.getAttribute('data-kind') || '';
    var layer = li.getAttribute('data-layer');
    if (layerEl) {
      if (layer) {
        layerEl.textContent = 'Layer ' + (layer.length < 2 ? '0' + layer : layer);
        layerEl.hidden = false;
      } else {
        layerEl.textContent = '';
        layerEl.hidden = true;
      }
    }
    drawer.style.setProperty('--c', li.style.getPropertyValue('--c') || 'var(--line)');
    drawer.style.setProperty('--c-ink', li.style.getPropertyValue('--c-ink') || 'var(--bg)');
    if (bodyEl) {
      bodyEl.innerHTML = '';
      var src = li.querySelector('.pn-body');
      if (src) bodyEl.appendChild(src.cloneNode(true));
    }
    syncStateButtons();
    drawer.hidden = false;
    if (scrim) scrim.hidden = false;
    document.body.classList.add('path-lock');
    var opener = li.querySelector('[data-node-open]');
    if (opener) opener.setAttribute('aria-expanded', 'true');
    showDrawer();
    var closeBtn = drawer.querySelector('[data-path-close]');
    if (closeBtn) closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
    refreshEdges();
  }

  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    if (scrim) scrim.hidden = true;
    document.body.classList.remove('path-lock');
    document.removeEventListener('keydown', onKeydown);
    if (currentId) {
      var li = nodeById(currentId);
      var opener = li && li.querySelector('[data-node-open]');
      if (opener) opener.setAttribute('aria-expanded', 'false');
    }
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    lastFocused = null;
    currentId = null;
    refreshEdges();
  }

  Array.prototype.forEach.call(root.querySelectorAll('[data-node-open]'), function (btn) {
    btn.addEventListener('click', function () {
      openDrawer(btn.getAttribute('data-node-open'));
    });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-path-close]'), function (el) {
    el.addEventListener('click', closeDrawer);
  });
  for (var b = 0; b < stateBtns.length; b++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        if (!currentId) return;
        var v = btn.getAttribute('data-path-state');
        if (state[currentId] === v) delete state[currentId];
        else state[currentId] = v;
        save();
        syncStateButtons();
        applyState();
      });
    })(stateBtns[b]);
  }

  /* ---- two-step reset (no window.confirm; reverts after 4s) ---- */
  var resetBtn = root.querySelector('[data-path-reset]');
  if (resetBtn) {
    var label = resetBtn.textContent;
    var armed = false;
    var timer = null;
    var disarm = function () {
      armed = false;
      resetBtn.textContent = label;
      resetBtn.classList.remove('is-armed');
    };
    resetBtn.addEventListener('click', function () {
      if (!armed) {
        armed = true;
        resetBtn.textContent = 'Confirm reset';
        resetBtn.classList.add('is-armed');
        timer = setTimeout(disarm, 4000);
        return;
      }
      if (timer) clearTimeout(timer);
      disarm();
      state = {};
      save();
      syncStateButtons();
      applyState();
    });
  }

  /* ---- cross-stage edges (>=840px only) ---- */
  var svg = root.querySelector('[data-path-edges]');
  var wrap = root.querySelector('.path-stages');
  var SVGNS = 'http://www.w3.org/2000/svg';
  var edges = [];
  try {
    var idxEl = root.querySelector('[data-path-edges-index]');
    edges = idxEl ? JSON.parse(idxEl.textContent || '[]') : [];
  } catch (e) {
    edges = [];
  }
  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}
  var wideMq = null;
  try {
    wideMq = window.matchMedia('(min-width: 840px)');
  } catch (e) {}
  var r2 = function (v) {
    return Math.round(v * 100) / 100;
  };

  // Orthogonal polyline with r-radius rounded corners (ported from StackFlow).
  function roundedPath(pts, r) {
    var d = 'M ' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = pts[i - 1], p = pts[i], c = pts[i + 1];
      var d1 = Math.hypot(p[0] - a[0], p[1] - a[1]) || 1;
      var d2 = Math.hypot(c[0] - p[0], c[1] - p[1]) || 1;
      var rr = Math.min(r, d1 / 2, d2 / 2);
      var ax = r2(p[0] - ((p[0] - a[0]) / d1) * rr);
      var ay = r2(p[1] - ((p[1] - a[1]) / d1) * rr);
      var bx = r2(p[0] + ((c[0] - p[0]) / d2) * rr);
      var by = r2(p[1] + ((c[1] - p[1]) / d2) * rr);
      d += ' L ' + ax + ' ' + ay + ' Q ' + p[0] + ' ' + p[1] + ' ' + bx + ' ' + by;
    }
    d += ' L ' + pts[pts.length - 1][0] + ' ' + pts[pts.length - 1][1];
    return d;
  }

  // All edge <path>s are precomputed on (re)draw and kept hidden; only the
  // edges touching the active node (hovered, focused or open in the drawer) are
  // revealed, so the map is quiet by default and the connectors never litter the
  // stage headers permanently. { el, from, to } per edge.
  var edgeEls = [];

  function drawEdges() {
    if (!svg || !wrap) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    edgeEls = [];
    if (!(wideMq ? wideMq.matches : false) || !edges.length) return;
    var wr = wrap.getBoundingClientRect();
    svg.setAttribute('viewBox', '0 0 ' + r2(wr.width) + ' ' + r2(wr.height));
    for (var i = 0; i < edges.length; i++) {
      var from = nodeById(edges[i].from);
      var to = nodeById(edges[i].to);
      if (!from || !to) continue;
      var fb = from.getBoundingClientRect(), tb = to.getBoundingClientRect();
      var x1 = r2(fb.left + fb.width / 2 - wr.left);
      var y1 = r2(fb.bottom - wr.top);
      var x2 = r2(tb.left + tb.width / 2 - wr.left);
      var y2 = r2(tb.top - wr.top);
      // Run the horizontal leg through the gap just below the origin stage's
      // grid (before the next stage header), not at the vertical midpoint, so
      // the line does not cross the intervening headers and taglines.
      var runY;
      var fromStage = from.closest ? from.closest('.path-stage') : null;
      var grid = fromStage ? fromStage.querySelector('.path-grid') : null;
      if (grid) {
        var gb = grid.getBoundingClientRect();
        runY = r2(gb.bottom - wr.top + 12);
      } else {
        runY = r2((y1 + y2) / 2);
      }
      if (runY < y1) runY = y1;
      if (runY > y2) runY = y2;
      var pth = document.createElementNS(SVGNS, 'path');
      pth.setAttribute('class', 'path-edge');
      pth.setAttribute('d', roundedPath([[x1, y1], [x1, runY], [x2, runY], [x2, y2]], 8));
      pth.setAttribute('data-from', edges[i].from);
      pth.setAttribute('data-to', edges[i].to);
      // Styled inline: runtime-created nodes carry no Astro scope attribute, so
      // scoped CSS would not reach them. Inline var() stays theme-aware. Painted
      // behind the cards (svg z-index 0, pointer-events none) and hidden until
      // its node is active.
      pth.setAttribute('fill', 'none');
      pth.style.stroke = 'var(--muted)';
      pth.style.strokeWidth = '1.25';
      pth.style.strokeLinecap = 'round';
      pth.style.strokeLinejoin = 'round';
      pth.style.strokeDasharray = '4 4';
      pth.style.opacity = '0';
      pth.style.visibility = 'hidden';
      svg.appendChild(pth);
      edgeEls.push({ el: pth, from: edges[i].from, to: edges[i].to });
    }
    refreshEdges();
  }

  // Hide every edge and drop the related-node marks.
  function clearActiveEdges() {
    for (var i = 0; i < edgeEls.length; i++) {
      edgeEls[i].el.style.visibility = 'hidden';
      edgeEls[i].el.style.opacity = '0';
    }
    var marked = root.querySelectorAll('.path-node[data-related]');
    for (var j = 0; j < marked.length; j++) marked[j].removeAttribute('data-related');
  }

  // Reveal only the edges touching `id` and mark the nodes at their other end:
  // the prereq an edge points *to* `id` from (data-related="prereq"), and the
  // dependent an edge runs *from* `id` to (data-related="dependent").
  function showEdgesFor(id) {
    clearActiveEdges();
    if (!id) return;
    for (var i = 0; i < edgeEls.length; i++) {
      var e = edgeEls[i];
      if (e.from !== id && e.to !== id) continue;
      e.el.style.visibility = 'visible';
      e.el.style.opacity = '0.7';
      if (!reduce && e.el.animate) {
        e.el.animate([{ opacity: 0 }, { opacity: 0.7 }], {
          duration: 220,
          easing: 'ease-out',
          fill: 'both',
        });
      }
      var otherId = e.from === id ? e.to : e.from;
      var otherLi = nodeById(otherId);
      if (otherLi) otherLi.setAttribute('data-related', e.to === id ? 'prereq' : 'dependent');
    }
  }

  // The active node: a hover or focus wins, otherwise the drawer's open node.
  var hoverId = null;
  var focusId = null;
  function activeEdgeId() {
    if (hoverId) return hoverId;
    if (focusId) return focusId;
    if (drawer && !drawer.hidden && currentId) return currentId;
    return null;
  }
  function refreshEdges() {
    showEdgesFor(activeEdgeId());
  }

  // Per-node hover/focus wiring: reveal on enter/focus, revert on leave/blur.
  for (var ni = 0; ni < nodes.length; ni++) {
    (function (li) {
      var id = li.getAttribute('data-node');
      var btn = li.querySelector('.pn-btn');
      li.addEventListener('mouseenter', function () {
        hoverId = id;
        refreshEdges();
      });
      li.addEventListener('mouseleave', function () {
        if (hoverId === id) hoverId = null;
        refreshEdges();
      });
      if (btn) {
        btn.addEventListener('focusin', function () {
          focusId = id;
          refreshEdges();
        });
        btn.addEventListener('focusout', function () {
          if (focusId === id) focusId = null;
          refreshEdges();
        });
      }
    })(nodes[ni]);
  }

  var rafId = null;
  function scheduleDraw() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = null;
      drawEdges();
    });
  }
  if ('ResizeObserver' in window && wrap) {
    new ResizeObserver(scheduleDraw).observe(wrap);
  } else {
    window.addEventListener('resize', scheduleDraw, { passive: true });
  }
  if (wideMq) {
    if (wideMq.addEventListener) wideMq.addEventListener('change', scheduleDraw);
    else if (wideMq.addListener) wideMq.addListener(scheduleDraw);
  }

  /* ---- open a node from the URL fragment (#node-<id>) ---- */
  function openFromHash() {
    var h = location.hash;
    if (h.indexOf('#node-') !== 0) return;
    var id = h.slice(6);
    if (!nodeById(id)) return;
    // If a node is already open (e.g. a "Builds on"/"Leads to" link clicked
    // inside the drawer), close it first so the previous opener's
    // aria-expanded is reset and focus is restored to the right element.
    if (drawer && !drawer.hidden) closeDrawer();
    openDrawer(id);
  }
  window.addEventListener('hashchange', openFromHash);

  function init() {
    applyState();
    drawEdges();
    openFromHash();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
