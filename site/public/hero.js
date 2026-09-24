/* hero.js — demonstrate the homepage "governance loop" once. Loaded same-origin
   so the CSP script-src 'self' holds (no inline JS). Progressive enhancement: the
   diagram is fully legible without this file.

   When motion is allowed a small "packet" (an ink dot with a soft halo, appended
   into the visible SVG) travels each edge of the sequence in turn with rAF,
   easing in and out (~700ms per edge). As it reaches a node that node lights up;
   a short trail of two lit steps (node + the edge just travelled) follows the
   packet, and nothing else is dimmed. One pass, obligation to auditor: after a
   short hold on the auditor the packet and the trail clear and the figure rests
   as the static diagram — it is a demonstration, not a live feed. The dot drives
   whichever of the two diagrams (wide/tall) is visible at the current
   breakpoint, re-picks on resize, and pauses (dot hidden, rAF cancelled) while
   the tab is hidden or while the user is hovering/focusing a node (diagram.js
   adds `has-active`); an interrupted pass replays from a clean state afterwards.
   It never adds `is-dim` or `has-active` itself — those belong to the hover
   interaction — and under reduced motion it does nothing at all. */
(function () {
  'use strict';

  var motionOk = false;
  try {
    motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  } catch (e) {}
  if (!motionOk) return; // leave the static, fully-legible diagram in place.

  var host = document.querySelector('[data-hero-loop]');
  if (!host) return;

  var sequence = (host.getAttribute('data-hero-sequence') || '')
    .split(',')
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  if (sequence.length < 2) return;

  var START_DELAY = 1400; // let diagram.js's draw-on finish first.
  var EDGE_MS = 700; // one edge traversal.
  var HOLD_MS = 1200; // rest on the auditor before the trail clears.
  var TRAIL = 2; // lit steps kept behind the packet.
  var RESIZE_DEBOUNCE = 200;
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var figure = null; // the currently visible figure being driven.
  var svg = null; // its <svg> root (where the packet lives).
  var edges = []; // { path, id, to } in packet-travel order.
  var packet = null; // the travelling dot, moved between the wide/tall svgs.

  var raf = null; // the pending animation frame.
  var holdTimer = null; // the pending clear at the end of the pass.
  var trail = []; // recent lit steps, each an array of elements.
  var started = false; // the initial start delay has elapsed.
  var done = false; // the one pass has run to the end.
  var ei = 0; // index of the edge currently being travelled.
  var edgeLen = 0; // cached length of that edge.
  var t0 = 0; // timestamp the current edge started (0 = not yet).

  // The visible figure is the one with layout (offsetParent is null for the
  // display:none variant at this breakpoint).
  function visibleFigure() {
    var figs = host.querySelectorAll('.hero-art-wide figure, .hero-art-tall figure');
    for (var i = 0; i < figs.length; i++) {
      if (figs[i].offsetParent !== null) return figs[i];
    }
    return null;
  }

  function svgOf(fig) {
    return fig ? fig.querySelector('svg') : null;
  }

  // Every element carrying this edge id: the route <path> and the label <g>.
  function edgeElsById(fig, id) {
    return Array.prototype.slice.call(fig.querySelectorAll('[data-edge-id="' + id + '"]'));
  }

  // The route <path> from node a to node b (it carries the from/to endpoints).
  function routePath(fig, a, b) {
    return fig.querySelector('path[data-edge-from="' + a + '"][data-edge-to="' + b + '"]');
  }

  // Ordered, measurable edges connecting consecutive nodes in the sequence.
  function buildEdges(fig) {
    var arr = [];
    if (!fig) return arr;
    for (var i = 0; i < sequence.length - 1; i++) {
      var p = routePath(fig, sequence[i], sequence[i + 1]);
      if (p && typeof p.getTotalLength === 'function') {
        arr.push({ path: p, id: p.getAttribute('data-edge-id'), to: sequence[i + 1] });
      }
    }
    return arr;
  }

  function nodeEl(fig, id) {
    return fig ? fig.querySelector('[data-node-id="' + id + '"]') : null;
  }

  function makePacket() {
    var c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('r', '5');
    c.setAttribute('class', 'hero-packet is-hidden');
    c.setAttribute('aria-hidden', 'true');
    return c;
  }

  function attachPacket(sv) {
    if (!sv || !packet) return;
    if (packet.parentNode !== sv) sv.appendChild(packet); // last child paints on top.
  }

  function showPacket() {
    if (packet) packet.classList.remove('is-hidden');
  }

  function hidePacket() {
    if (packet) packet.classList.add('is-hidden');
  }

  function movePacket(len) {
    if (!packet || !edges[ei]) return;
    var pt = edges[ei].path.getPointAtLength(len);
    packet.setAttribute('cx', String(pt.x));
    packet.setAttribute('cy', String(pt.y));
  }

  // Light an edge (route + label) as the packet begins to travel it; the arrival
  // step below folds it into the trail so it is unlit when the trail passes.
  function litEdge(id) {
    edgeElsById(figure, id).forEach(function (el) {
      el.classList.remove('is-dim');
      el.classList.add('is-lit');
    });
  }

  // Push one lit step (a set of elements) and trim the trail to TRAIL steps.
  function litStep(els) {
    els.forEach(function (el) {
      el.classList.remove('is-dim');
      el.classList.add('is-lit');
    });
    trail.push(els);
    while (trail.length > TRAIL) {
      var old = trail.shift();
      old.forEach(function (el) {
        el.classList.remove('is-lit');
      });
    }
  }

  function clearAll(fig) {
    trail = [];
    if (!fig) return;
    var lit = fig.querySelectorAll('.is-lit, .is-dim');
    for (var i = 0; i < lit.length; i++) {
      lit[i].classList.remove('is-lit', 'is-dim');
    }
  }

  function cancelAll() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  // Pause while hidden or while the user is interacting with a node.
  function shouldPause() {
    if (document.hidden) return true;
    if (figure && figure.classList.contains('has-active')) return true;
    return false;
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // Begin travelling edge `ei` (already selected): light it, snap the packet to
  // its start, reset the clock and run frames.
  function beginEdge() {
    if (!edges[ei]) return;
    edgeLen = edges[ei].path.getTotalLength();
    litEdge(edges[ei].id);
    movePacket(0);
    t0 = 0;
    raf = requestAnimationFrame(frame);
  }

  function frame(ts) {
    raf = null;
    if (!edges[ei] || shouldPause()) return; // reconcile() handles the resume.
    if (!t0) t0 = ts;
    var p = (ts - t0) / EDGE_MS;
    if (p > 1) p = 1;
    movePacket(easeInOut(p) * edgeLen);
    if (p < 1) {
      raf = requestAnimationFrame(frame);
      return;
    }
    arrive();
  }

  // The packet reached the end of edge `ei`: light the destination node (folding
  // in the edge just travelled), then advance.
  function arrive() {
    var e = edges[ei];
    var els = edgeElsById(figure, e.id);
    var node = nodeEl(figure, e.to);
    if (node) els = [node].concat(els);
    litStep(els);

    ei += 1;
    if (ei < edges.length) {
      beginEdge();
    } else {
      // The pass ended on the auditor: rest briefly, then clear the trail and
      // leave the static diagram for good. (A pause during the hold cancels this
      // timer, and the pass replays when it resumes.)
      hidePacket();
      holdTimer = setTimeout(function () {
        holdTimer = null;
        done = true;
        observer.disconnect();
        clearAll(figure);
      }, HOLD_MS);
    }
  }

  // Start (or replay) the pass from a clean state, packet at the first node.
  function startLoop() {
    cancelAll();
    clearAll(figure);
    if (!figure || !edges.length) return;
    attachPacket(svg);
    litStep(nodeAsStep(sequence[0]));
    showPacket();
    ei = 0;
    beginEdge();
  }

  function nodeAsStep(id) {
    var n = nodeEl(figure, id);
    return n ? [n] : [];
  }

  // Single reconcile point: cancel when we should pause, (re)start when we may
  // run and nothing is pending. Called from every state-change event; a no-op
  // once the pass has finished.
  function reconcile() {
    if (!started || done || !figure) return;
    if (shouldPause()) {
      cancelAll();
      hidePacket();
      // Leave the classes alone: while hovering, diagram.js owns is-lit/is-dim.
    } else if (!raf && !holdTimer) {
      startLoop();
    }
  }

  // Watch the figure's class for the hover state (has-active) toggling.
  var observer = new MutationObserver(reconcile);

  function watch(fig) {
    if (fig) observer.observe(fig, { attributes: true, attributeFilter: ['class'] });
  }

  figure = visibleFigure();
  svg = svgOf(figure);
  edges = buildEdges(figure);
  packet = makePacket();
  attachPacket(svg);
  watch(figure);

  document.addEventListener('visibilitychange', reconcile);

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var next = visibleFigure();
      if (done || next === figure) return;
      cancelAll();
      clearAll(figure);
      observer.disconnect();
      figure = next;
      svg = svgOf(figure);
      edges = buildEdges(figure);
      attachPacket(svg); // move the packet into the newly visible SVG.
      hidePacket();
      watch(figure);
      reconcile(); // replay the pass on the newly visible figure.
    }, RESIZE_DEBOUNCE);
  });

  // Kick off after the draw-on has had time to play.
  setTimeout(function () {
    started = true;
    reconcile();
  }, START_DELAY);
})();
