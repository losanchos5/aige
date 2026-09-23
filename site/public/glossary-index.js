/* Glossary jump bar: marks the letter the reader is in with aria-current="true"
   as the page scrolls. Loaded from a same-origin file so the CSP script-src
   'self' holds. An IntersectionObserver watches the letter sections through a
   1px band just below the sticky jump bar; whenever a section crosses it, the
   current letter is the last section whose top has passed the band. Above the
   first section no letter is current. The links stay plain in-page anchors
   (keyboard and no-JS behaviour unchanged); the style lives in resources.css. */
(function () {
  'use strict';

  var bar = document.querySelector('.gl-jumpbar');
  if (!bar || !('IntersectionObserver' in window)) return;

  var links = Array.prototype.slice.call(bar.querySelectorAll('a[data-jump]'));
  var sections = [];
  var linkFor = {};
  for (var i = 0; i < links.length; i++) {
    var id = (links[i].getAttribute('href') || '').slice(1);
    var section = id ? document.getElementById(id) : null;
    if (!section) continue;
    sections.push(section);
    linkFor[id] = links[i];
  }
  if (!sections.length) return;

  var current = null;
  var observer = null;
  var bandY = 0;

  // The bar's bottom edge in its stuck position (its sticky top plus its own
  // height). Published as --gl-bar-h on the bar's parent, so the letter
  // sections' scroll-margin-top (resources.css) clears the bar however many rows
  // it wraps to, and a jump never lands a heading under it.
  var scope = bar.parentElement || document.documentElement;
  function barBottom() {
    var top = parseFloat(getComputedStyle(bar).top) || 0;
    var bottom = Math.round(top + bar.getBoundingClientRect().height);
    scope.style.setProperty('--gl-bar-h', bottom + 'px');
    return bottom;
  }

  // The band is a 1px line just under the jump bar, so a letter turns current as
  // its heading slides out from under the bar. Clamped inside the viewport so a
  // short window (or a bar wrapped to many rows) still leaves the observer a
  // band to watch.
  function line() {
    return Math.min(barBottom() + 8, window.innerHeight - 2);
  }

  function setCurrent(section) {
    if (section === current) return;
    if (current && linkFor[current.id]) linkFor[current.id].removeAttribute('aria-current');
    current = section;
    if (current && linkFor[current.id]) linkFor[current.id].setAttribute('aria-current', 'true');
  }

  // A section counts as reached once its top touches the band: the same test
  // the observer applies (edge contact included), so a section that has just
  // entered the band is never read as not yet reached.
  function update() {
    var found = null;
    for (var s = 0; s < sections.length; s++) {
      if (sections[s].getBoundingClientRect().top <= bandY + 1) found = sections[s];
      else break;
    }
    setCurrent(found);
  }

  function observe() {
    if (observer) observer.disconnect();
    bandY = line();
    var below = Math.max(0, window.innerHeight - bandY - 1);
    observer = new IntersectionObserver(update, {
      rootMargin: '-' + bandY + 'px 0px -' + below + 'px 0px',
    });
    for (var s = 0; s < sections.length; s++) observer.observe(sections[s]);
  }

  // The band depends on the viewport height and on how many rows the bar wraps
  // to (width, font load), so rebuild it, once per frame at most, when either
  // changes.
  var rafId = null;
  function schedule() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = null;
      observe();
      update();
    });
  }
  window.addEventListener('resize', schedule, { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(bar);

  observe();
})();
