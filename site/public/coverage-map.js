/* Coverage map lenses (CoverageMap.astro), loaded from a same-origin file so
   the CSP script-src 'self' holds (no inline JS). The map works without this
   file: cells are in-page links and public/crosswalk.js opens the drawer for
   them. Here we reveal the lens radios, mirror the chosen lens on the root's
   data-lens (coverage-map.css does the styling) and in the URL fragment
   (#coverage?lens=gaps, as the crosswalk explorer's #explore?...) so a view can
   be shared, and light the hovered or focused cell's column. Unknown lens
   values fall back to "all". */
(function () {
  'use strict';

  var root = document.querySelector('[data-coverage-map]');
  if (!root) return;

  var LENSES = ['all', 'labs-vs-standards', 'gaps'];
  var PREFIX = '#coverage';
  var fieldset = root.querySelector('[data-cov-lenses]');
  var radios = root.querySelectorAll('input[name="cov-lens"]');

  function lensFromHash() {
    var hash = window.location.hash || '';
    // "#coverage" or "#coverage?...", not "#coverage-map".
    if (hash !== PREFIX && hash.indexOf(PREFIX + '?') !== 0) return null;
    var match = /[?&]lens=([a-z-]+)/.exec(hash);
    var lens = match ? match[1] : 'all';
    return LENSES.indexOf(lens) === -1 ? 'all' : lens;
  }

  function apply(lens, writeHash) {
    root.setAttribute('data-lens', lens);
    for (var i = 0; i < radios.length; i++) radios[i].checked = radios[i].value === lens;
    if (writeHash && window.history && window.history.replaceState) {
      var hash = lens === 'all' ? PREFIX : PREFIX + '?lens=' + lens;
      window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
    }
  }

  if (fieldset) fieldset.hidden = false;

  var initial = lensFromHash();
  if (initial) {
    apply(initial, false);
    // "#coverage?lens=..." matches no id, so the browser did not scroll.
    var section = document.getElementById('coverage');
    if (section) section.scrollIntoView();
  }

  root.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.name === 'cov-lens') apply(t.value, true);
  });

  // Column crosshair; the row half is pure CSS (:has()).
  var hot = [];
  function clearHot() {
    for (var i = 0; i < hot.length; i++) hot[i].classList.remove('is-col-hot');
    hot = [];
  }
  function lightColumn(e) {
    var cell = e.target && e.target.closest ? e.target.closest('.cov-cell') : null;
    clearHot();
    if (!cell) return;
    var col = cell.getAttribute('data-cw-col');
    var sel = '[data-cw-col="' + col + '"].cov-cell, .cov-colhead[data-col="' + col + '"], .cov-total[data-col="' + col + '"]';
    hot = Array.prototype.slice.call(root.querySelectorAll(sel));
    for (var i = 0; i < hot.length; i++) hot[i].classList.add('is-col-hot');
  }
  root.addEventListener('pointerover', lightColumn);
  root.addEventListener('focusin', lightColumn);
  root.addEventListener('pointerleave', clearHot);
  root.addEventListener('focusout', function (e) {
    if (!root.contains(e.relatedTarget)) clearHot();
  });
})();
