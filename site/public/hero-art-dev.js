/* DEV ONLY: remove before shipping. Reads the painting hero's settings from the URL (?wash=0&halo=0.2&blur=24&haloW=44&haloH=28&haloX=56&ink=dark&shadow=1)
   into custom properties: layers on .hero--art, text ones on <body> (the header sits outside the hero). Missing params keep the CSS defaults.
   wash, fade*, halo, band, shadow: 0..1; x, y, haloW, haloH, haloX, haloY: %; blur: px; nav: weight; ink=dark: near-black headline (light theme). */
(function () {
  'use strict';
  var hero = document.querySelector('.hero--art');
  if (!hero) return;
  var params = new URLSearchParams(location.search);
  var map = { wash: 'wash', fade: 'fade', fadeTop: 'fade-top', fadeMid: 'fade-mid', fadeBot: 'fade-bot', halo: 'halo', haloW: 'halo-w', haloH: 'halo-h', haloX: 'halo-x', haloY: 'halo-y', band: 'band', blur: 'halo-blur', scale: 'art-scale', x: 'art-x', y: 'art-y', shadow: 'text-shadow', nav: 'nav-weight' };
  var unit = { x: '%', y: '%', haloW: '%', haloH: '%', haloX: '%', haloY: '%', blur: 'px' };
  if (params.get('ink') === 'dark') hero.setAttribute('data-ink', 'dark');
  Object.keys(map).forEach(function (key) {
    var n = parseFloat(params.get(key));
    if (!isFinite(n)) return;
    var el = key === 'shadow' || key === 'nav' ? document.body : hero;
    el.style.setProperty('--hero-' + map[key], n + (unit[key] || ''));
    if (key === 'blur') hero.toggleAttribute('data-halo-blur', n > 0);
  });
})();
