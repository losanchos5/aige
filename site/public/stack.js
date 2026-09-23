/* /stack layer-flow interaction, loaded same-origin so CSP script-src 'self'
   holds (no inline JS). Progressive enhancement: without this file every band
   and path is static and layer 01's panel is shown. Here, activating a band
   (click or Enter/Space) highlights it, dims the rest, redraws its outgoing and
   incoming paths, and reveals that layer's detail panel. Both the wide SVG
   bands and the narrow button list carry data-band/data-layer, so one handler
   keeps them in sync. */
(function () {
  'use strict';

  var root = document.querySelector('[data-flow]');
  if (!root) return;

  var bands = Array.prototype.slice.call(root.querySelectorAll('[data-band]'));
  var flows = Array.prototype.slice.call(root.querySelectorAll('.flow-path, .flow-label'));
  var panels = Array.prototype.slice.call(root.querySelectorAll('[data-panel]'));
  if (!bands.length) return;

  function reduceMotion() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function activate(layer) {
    var n = String(layer);

    bands.forEach(function (band) {
      var on = band.getAttribute('data-layer') === n;
      band.setAttribute('aria-pressed', on ? 'true' : 'false');
      band.classList.toggle('is-active', on);
    });

    flows.forEach(function (flow) {
      var related =
        flow.getAttribute('data-from') === n || flow.getAttribute('data-to') === n;
      flow.classList.toggle('is-lit', related);

      // Re-trigger the draw-on animation for the paths now lit.
      flow.classList.remove('draw');
      if (related && !reduceMotion() && flow.classList.contains('flow-path')) {
        // Force reflow so the animation restarts on each activation.
        void flow.getBoundingClientRect();
        flow.classList.add('draw');
      }
    });

    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-panel') !== n;
    });

    root.classList.add('has-active');
  }

  bands.forEach(function (band) {
    band.addEventListener('click', function () {
      activate(band.getAttribute('data-layer'));
    });
    band.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        activate(band.getAttribute('data-layer'));
      }
    });
  });

  root.classList.add('flow-js');

  // Start on the layer marked active in the markup (layer 01).
  var initial = root.querySelector('[data-band].is-active');
  activate(initial ? initial.getAttribute('data-layer') : '1');
})();

/* /stack layer diagram: the five bars of the static StackDiagram (the pinned
   column of the story) lift in, staggered, when the diagram scrolls into view.
   Drives window.aigeMotion (the bundled motion-ui module), waiting for its
   aige:motion-ready event when this file runs first. Progressive enhancement:
   the 16px offset comes from a class added only once motion is ready, so no-JS
   readers, reduced-motion readers and a motion runtime that never loads all keep
   the finished diagram. A diagram already on screen is left at rest (motion only
   below the fold). Only the bars move; the pin and its ancestors never get a
   transform, so position: sticky holds. */
(function () {
  'use strict';

  var marks = Array.prototype.slice.call(document.querySelectorAll('[data-layer-bars]'));
  if (!marks.length) return;

  function arm(m) {
    if (!m || m.reduce) return;

    marks.forEach(function (mark) {
      var bars = mark.querySelectorAll('.bar');
      if (!bars.length) return;

      var box = mark.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) return;

      // Settle on the resting state: drop the offset class and the inline
      // transform motion commits when it finishes (or never starts).
      function settle() {
        mark.classList.remove('is-parked');
        Array.prototype.forEach.call(bars, function (bar) {
          bar.style.removeProperty('transform');
        });
      }

      mark.classList.add('is-staggered', 'is-parked');
      m.inView(
        mark,
        function () {
          // If the animation cannot start, settle at once so the bars never
          // stay parked 16px low.
          try {
            m.animate(
              bars,
              { transform: ['translateY(16px)', 'translateY(0)'] },
              { delay: m.stagger(0.07), duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }
            ).then(settle, settle);
          } catch (e) {
            settle();
          }
        },
        { amount: 0.3 }
      );
    });
  }

  if (window.aigeMotion) {
    arm(window.aigeMotion);
  } else {
    document.addEventListener(
      'aige:motion-ready',
      function () {
        arm(window.aigeMotion);
      },
      { once: true }
    );
  }
})();
