/* Page-behind-inert for the modal drawers (TC-15), shared by public/ui-doc.js,
   public/path.js and public/crosswalk.js. Loaded from a same-origin file so the
   CSP script-src 'self' holds, with `defer` and before the scripts that use it.
   aria-modal alone does not keep a screen reader's virtual cursor inside the
   dialog, so while a drawer is open every sibling along its ancestor chain up
   to <body> (header, footer, the rest of <main>) is marked inert. The scrim
   stays live (a click on it closes), <dialog>s are skipped (the search dialog
   can still open over the drawer), and anything already inert is left as it
   was. */
(function () {
  'use strict';

  // aigeInert(panel, scrim) returns a setter bound to that panel: set(true)
  // makes the page behind it inert, set(false) lifts exactly what it marked.
  window.aigeInert = function (panel, scrim) {
    var marked = [];
    return function setBackgroundInert(on) {
      var i;
      for (i = 0; i < marked.length; i++) marked[i].removeAttribute('inert');
      marked = [];
      if (!on || !panel) return;
      for (var node = panel; node !== document.body && node.parentElement; node = node.parentElement) {
        var parent = node.parentElement;
        for (var el = parent.firstElementChild; el; el = el.nextElementSibling) {
          if (el === node || el === scrim || el.hasAttribute('inert')) continue;
          if (/^(SCRIPT|STYLE|TEMPLATE|DIALOG)$/.test(el.tagName)) continue;
          el.setAttribute('inert', '');
          marked.push(el);
        }
      }
    };
  };
})();
