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

  /* Count-up. The tween comes from the shared motion runtime
     (window.aigeMotion, bundled by Base.astro). Its `animate` is the WAAPI
     build (motion/mini), which only animates element styles, so the number is
     tweened as a registered <number> custom property on the figure itself —
     motion owns the duration and the --ease curve — and each frame copies the
     live value into the text. The server HTML already carries the final
     figure: reduced motion, no IntersectionObserver, no @property or a motion
     module that never loads all keep (or restore) that exact text. */
  var PROP = '--countup';

  function canTween() {
    if (!window.CSS || typeof CSS.registerProperty !== 'function') return false;
    try {
      CSS.registerProperty({ name: PROP, syntax: '<number>', inherits: false, initialValue: '0' });
    } catch (e) {
      // Already registered (a second copy of this file) is fine; anything
      // else means the property would not interpolate.
      return e && e.name === 'InvalidModificationError';
    }
    return true;
  }

  // Resolve with window.aigeMotion once the bundled module has announced it,
  // or with null if it never does. Module scripts run before DOMContentLoaded,
  // so by then (or by load, as a backstop) it has either arrived or failed.
  function withMotion(cb) {
    var settled = false;
    function settle() {
      if (settled) return;
      settled = true;
      cb(window.aigeMotion || null);
    }
    if (window.aigeMotion || document.readyState === 'complete') {
      settle();
      return;
    }
    document.addEventListener('aige:motion-ready', settle);
    document.addEventListener('DOMContentLoaded', settle);
    window.addEventListener('load', settle);
  }

  function format(el, v) {
    return el._prefix + v.toFixed(el._decimals) + el._suffix;
  }

  function setFinal(el) {
    el.style.removeProperty(PROP);
    if (!el.getAttribute('style')) el.removeAttribute('style');
    el.textContent = el._final;
  }

  function initCountUp() {
    var els = document.querySelectorAll('[data-countup]');
    var tiles = [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var raw = el.getAttribute('data-countup') || '';
      var target = parseFloat(raw);
      if (isNaN(target)) continue;
      var dot = raw.indexOf('.');
      el._decimals = dot === -1 ? 0 : raw.length - dot - 1;
      el._prefix = el.getAttribute('data-cu-prefix') || '';
      el._suffix = el.getAttribute('data-cu-suffix') || '';
      el._target = target;
      // The exact server-rendered figure, restored verbatim at the end.
      el._final = el.textContent;
      tiles.push(el);
    }
    if (!tiles.length) return;
    if (reduce || !hasIO || !canTween()) {
      tiles.forEach(setFinal);
      return;
    }

    withMotion(function (motion) {
      if (!motion) {
        tiles.forEach(setFinal);
        return;
      }
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            var el = entry.target;
            motion.run(
              function () {
                // Zero only now, right before the count starts: a tile that
                // never scrolls into view keeps its server-rendered figure.
                el.textContent = format(el, 0);
                count(motion, el);
              },
              function () {
                setFinal(el);
              }
            );
          });
        },
        { rootMargin: '0px 0px 64px 0px', threshold: 0 }
      );
      // A tile already on screen (or scrolled past) has been painted with its
      // final figure: keep it, no full-to-zero jump. A tile below the fold
      // starts 64px before it scrolls in, so its zero is painted before the
      // figure is ever seen.
      tiles.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) setFinal(el);
        else io.observe(el);
      });
    });
  }

  function count(motion, el) {
    var live = true;
    var anim;
    try {
      anim = motion.animate(
        el,
        { '--countup': [0, el._target] },
        { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }
      );
    } catch (e) {
      setFinal(el);
      return;
    }
    function frame() {
      if (!live) return;
      var v = parseFloat(getComputedStyle(el).getPropertyValue(PROP));
      if (!isNaN(v)) el.textContent = format(el, v);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    function done() {
      live = false;
      setFinal(el);
    }
    anim.then(done, done);
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
