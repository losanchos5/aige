/* Sticky-scroll story: marks the active row as the reader scrolls a [data-story]
   region so CSS can highlight the matching diagram mark. This is state, not
   motion, so it runs regardless of prefers-reduced-motion. Same-origin file (no
   inline JS, CSP holds); plain script, no modules. */
(function () {
  'use strict';

  function init() {
    if (!('IntersectionObserver' in window)) return;
    var stories = document.querySelectorAll('[data-story]');
    stories.forEach(function (host) {
      var rows = host.querySelectorAll('[data-story-row]');
      if (!rows.length) return;
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var n = entry.target.getAttribute('data-n');
              if (n) host.dataset.active = n;
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      rows.forEach(function (row) {
        io.observe(row);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
