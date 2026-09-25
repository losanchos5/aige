/* figure-cite.js: copy-to-clipboard for the /figures pages (the reference,
   the BibTeX entry, the credit line and the embed snippets). Each button
   carries the exact text in data-figure-copy; without this script, or without
   the Clipboard API, the same text stays visible and selectable on the page.
   Loaded with defer from the page, so the CSP keeps script-src 'self'. */
(function () {
  'use strict';
  var buttons = document.querySelectorAll('[data-figure-copy]');
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-figure-copy') || '';
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
          /* clipboard blocked: the text is still on the page */
        },
      );
    });
  });
})();
