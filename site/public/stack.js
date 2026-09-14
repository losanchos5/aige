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
