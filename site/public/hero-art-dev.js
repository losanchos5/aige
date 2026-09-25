/* DEV ONLY: remove before shipping. hero-art-dev.js reads the painting hero's settings from the
   URL (?wash=0.3&halo=0.35&band=0.55&fade=1&blur=14&y=30&shadow=1&nav=500) into custom properties:
   the layers on .hero--art, the text ones on <body> (the floating header sits outside the hero).
   Missing params keep the CSS defaults. wash, fade*, halo, band, shadow: 0..1; x, y, haloW: %; blur: px. */
(function () {
  'use strict';
  var hero = document.querySelector('.hero--art');
  if (!hero) return;
  var params = new URLSearchParams(location.search);
  var map = { wash: 'wash', fade: 'fade', fadeTop: 'fade-top', fadeMid: 'fade-mid', fadeBot: 'fade-bot', halo: 'halo', haloW: 'halo-w', band: 'band', blur: 'halo-blur', scale: 'art-scale', x: 'art-x', y: 'art-y', shadow: 'text-shadow', nav: 'nav-weight' };
  var unit = { x: '%', y: '%', haloW: '%', blur: 'px' };
  Object.keys(map).forEach(function (key) {
    var n = parseFloat(params.get(key));
    if (!isFinite(n)) return;
    var el = key === 'shadow' || key === 'nav' ? document.body : hero;
    el.style.setProperty('--hero-' + map[key], n + (unit[key] || ''));
    if (key === 'blur') hero.toggleAttribute('data-halo-blur', n > 0);
  });
})();
