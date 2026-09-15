/* hero.js — drive the homepage "governance loop". Loaded same-origin so the CSP
   script-src 'self' holds (no inline JS). Progressive enhancement: the diagram
   is fully legible without this file, and the verdict stamp is server-rendered.

   When motion is allowed this walks a pulse around the loop: every ~900ms it
   lights the next node in data-hero-sequence and the edge arriving at it, keeps
   a short trail of two lit steps, and pops the PASS stamp as the loop closes on
   the auditor. It drives whichever of the two diagrams (wide / tall) is visible
   at the current breakpoint, re-picks on resize, and pauses while the tab is
   hidden or while the user is hovering/focusing a node (diagram.js adds
   `has-active` to the figure), resuming from a clean state afterwards. It never
   adds `is-dim` or `has-active` itself — those belong to the hover interaction.

   Timers are cancelled to pause (no busy loops); a MutationObserver on the
   figure's class watches the hover state so nothing polls. */
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
  if (!sequence.length) return;

  var stamp = host.querySelector('.hero-stamp');
  if (stamp) {
    stamp.addEventListener('animationend', function () {
      stamp.classList.remove('is-pop');
    });
  }

  var START_DELAY = 1400; // let diagram.js's draw-on finish first.
  var STEP_MS = 900;
  var HOLD_MS = 2500;
  var TRAIL = 2;
  var RESIZE_DEBOUNCE = 200;

  var figure = null; // the currently visible figure being driven.
  var timer = null; // the single pending step/hold timer.
  var trail = []; // recent lit steps, each an array of elements.
  var started = false; // the initial start delay has elapsed.

  // The visible figure is the one with layout (offsetParent is null for the
  // display:none variant at this breakpoint).
  function visibleFigure() {
    var figs = host.querySelectorAll('.hero-art-wide figure, .hero-art-tall figure');
    for (var i = 0; i < figs.length; i++) {
      if (figs[i].offsetParent !== null) return figs[i];
    }
    return null;
  }

  // The node for `id` plus the edge arriving at it (data-edge-to === id).
  function stepEls(fig, id) {
    var els = [];
    var node = fig.querySelector('[data-node-id="' + id + '"]');
    if (node) els.push(node);
    var edges = fig.querySelectorAll('[data-edge-to="' + id + '"]');
    for (var i = 0; i < edges.length; i++) els.push(edges[i]);
    return els;
  }

  function clearAll(fig) {
    trail = [];
    if (!fig) return;
    var lit = fig.querySelectorAll('.is-lit, .is-dim');
    for (var i = 0; i < lit.length; i++) {
      lit[i].classList.remove('is-lit', 'is-dim');
    }
  }

  function cancelTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  // Pause while hidden or while the user is interacting with a node.
  function shouldPause() {
    if (document.hidden) return true;
    if (figure && figure.classList.contains('has-active')) return true;
    return false;
  }

  function lightStep(index) {
    if (!figure) return;
    var id = sequence[index];
    var els = stepEls(figure, id);
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
    if (id === 'auditor' && stamp) {
      // Restart the pop cleanly if it is somehow mid-flight.
      stamp.classList.remove('is-pop');
      void stamp.offsetWidth;
      stamp.classList.add('is-pop');
    }
  }

  function tick(index) {
    timer = null;
    lightStep(index);
    var last = index >= sequence.length - 1;
    timer = setTimeout(
      function () {
        if (last) {
          clearAll(figure);
          timer = setTimeout(function () {
            tick(0);
          }, STEP_MS);
        } else {
          tick(index + 1);
        }
      },
      last ? HOLD_MS : STEP_MS,
    );
  }

  // Start (or restart) the loop from a clean state.
  function startLoop() {
    cancelTimer();
    clearAll(figure);
    timer = setTimeout(function () {
      tick(0);
    }, STEP_MS);
  }

  // Single reconcile point: cancel when we should pause, (re)start when we may
  // run and nothing is pending. Called from every state-change event.
  function reconcile() {
    if (!started || !figure) return;
    if (shouldPause()) {
      cancelTimer();
    } else if (!timer) {
      startLoop();
    }
  }

  // Watch the figure's class for the hover state (has-active) toggling.
  var observer = new MutationObserver(reconcile);

  function watch(fig) {
    if (fig) observer.observe(fig, { attributes: true, attributeFilter: ['class'] });
  }

  figure = visibleFigure();
  watch(figure);

  document.addEventListener('visibilitychange', reconcile);

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var next = visibleFigure();
      if (next === figure) return;
      cancelTimer();
      clearAll(figure);
      observer.disconnect();
      figure = next;
      watch(figure);
      reconcile(); // start the loop on the newly visible figure.
    }, RESIZE_DEBOUNCE);
  });

  // Kick off after the draw-on has had time to play.
  setTimeout(function () {
    started = true;
    reconcile();
  }, START_DELAY);
})();
