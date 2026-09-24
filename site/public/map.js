/* map.js: progressive enhancement for /map, loaded from a same-origin file
   (CSP script-src 'self'). The page works with no JS: every <details> opens
   with its native control and every node is a link. This only reveals the
   expand/collapse-all toolbar, opens the branch named in the URL hash and
   focuses it, and opens every cluster before printing so the whole index prints. */
(function () {
  'use strict';

  var tools = document.querySelector('.cluster-tools');
  var clusters = document.querySelectorAll('details.cluster');
  if (!clusters.length) return;

  function setAll(open) {
    for (var i = 0; i < clusters.length; i++) clusters[i].open = open;
  }

  if (tools) {
    tools.hidden = false;
    var expand = tools.querySelector('[data-cluster-expand]');
    var collapse = tools.querySelector('[data-cluster-collapse]');
    if (expand) expand.addEventListener('click', function () { setAll(true); });
    if (collapse) collapse.addEventListener('click', function () { setAll(false); });
  }

  function openFromHash() {
    var hash = location.hash;
    if (!hash || hash.indexOf('#cluster-') !== 0) return;
    var target = document.getElementById(hash.slice(1));
    if (!target || target.tagName !== 'DETAILS') return;
    target.open = true;
    var summary = target.querySelector('summary');
    if (!summary) return;
    summary.focus();
    // Chromium's own fragment navigation then clears focus (the <details>
    // target is not focusable), which can land after this runs. Focus again on
    // the next frame unless the reader has already moved focus elsewhere.
    requestAnimationFrame(function () {
      var active = document.activeElement;
      if (!active || active === document.body) summary.focus();
    });
  }

  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  window.addEventListener('beforeprint', function () { setAll(true); });
})();
