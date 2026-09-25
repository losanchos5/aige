/* Copy buttons of the Citation component on pages outside the chapter layout
   (chapters get the same behaviour from ui-doc.js; a page loads one or the
   other, never both). No framework, no inline handlers (CSP-safe). Loaded with
   `defer`. */
(function () {
  'use strict';

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy-cite]'), function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy-cite') || '';
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(text).then(
        function () {
          var original = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(function () {
            btn.textContent = original;
          }, 1500);
        },
        function () {
          /* clipboard blocked; ignore */
        },
      );
    });
  });
})();
