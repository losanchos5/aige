/* hero-strip.js: the pause control of the home hero's moving strip
   (src/components/HeroStrip.astro). Loaded same-origin so the CSP script-src
   'self' holds (no inline JS). The marquee itself is CSS: this file only
   gives it a pause (WCAG 2.2.2). Without it the strip still moves under
   prefers-reduced-motion: no-preference and hover still holds it.

   The "Pause motion" toggle (off screen until keyboard focus, like the skip
   link) and a click or tap on the strip both flip the state; it is mirrored
   as aria-pressed on the toggle and as data-paused on the strip, which the
   CSS reads. Under reduced motion nothing moves, so the toggle stays hidden
   and a tap does nothing; a change of the preference mid-session is
   followed. */
(function () {
  'use strict';

  var strips = document.querySelectorAll('[data-hero-strip]');
  if (!strips.length) return;

  var reduceQuery = null;
  try {
    reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  } catch (e) {}
  function reduced() {
    return !!(reduceQuery && reduceQuery.matches);
  }

  Array.prototype.forEach.call(strips, function (strip) {
    var toggle = strip.querySelector('[data-motion-toggle]');
    var view = strip.querySelector('.facts-window');
    if (!toggle || !view) return;
    var paused = false;

    function reconcile() {
      var still = reduced();
      toggle.hidden = still;
      toggle.setAttribute('aria-pressed', paused && !still ? 'true' : 'false');
      if (paused && !still) strip.setAttribute('data-paused', '');
      else strip.removeAttribute('data-paused');
    }

    function togglePause() {
      if (reduced()) return;
      paused = !paused;
      reconcile();
    }

    toggle.addEventListener('click', togglePause);
    // Pointer and touch users have no toggle in sight: a click or tap on the
    // strip pauses and resumes the same way (the keyboard has the toggle).
    view.addEventListener('click', togglePause);
    if (reduceQuery && reduceQuery.addEventListener) {
      reduceQuery.addEventListener('change', reconcile);
    }
    reconcile();
  });
})();
