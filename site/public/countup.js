/* Count-up for StatTile figures and draw-on for the MaturityLadder, loaded from
   a same-origin file (CSP script-src 'self'). Both are opt-in enhancements: the
   server HTML already carries the final numbers and the full ladder, so no-JS
   and reduced-motion users see the finished state with no layout shift. */
(function () {
  'use strict';

  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) {}
  var hasIO = 'IntersectionObserver' in window;

  // easeOutCubic — a close, cheap stand-in for the site's --ease curve.
  function ease(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function initCountUp() {
    var els = document.querySelectorAll('[data-countup]');
    if (!els.length || reduce || !hasIO) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          run(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.2 }
    );

    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var target = parseFloat(el.getAttribute('data-countup'));
      if (isNaN(target)) continue;
      var raw = el.getAttribute('data-countup') || '';
      var dot = raw.indexOf('.');
      el._decimals = dot === -1 ? 0 : raw.length - dot - 1;
      el._prefix = el.getAttribute('data-cu-prefix') || '';
      el._suffix = el.getAttribute('data-cu-suffix') || '';
      el._target = target;
      el.textContent = el._prefix + (0).toFixed(el._decimals) + el._suffix;
      io.observe(el);
    }
  }

  function run(el) {
    var start = null;
    var dur = 900;
    function frame(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / dur, 1);
      var v = el._target * ease(p);
      el.textContent = el._prefix + v.toFixed(el._decimals) + el._suffix;
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = el._prefix + el._target.toFixed(el._decimals) + el._suffix;
    }
    requestAnimationFrame(frame);
  }

  function initLadder() {
    var ladder = document.querySelector('[data-ladder]');
    if (!ladder || reduce || !hasIO) return;
    ladder.classList.add('anim');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          requestAnimationFrame(function () {
            ladder.classList.add('drawn');
          });
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    io.observe(ladder);
  }

  function init() {
    initCountUp();
    initLadder();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
