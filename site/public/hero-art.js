/* hero-art.js: reveals the home hero's painting once it has loaded (the CSS
   fades it in over the placeholder painted on .hero-art). A same-origin file,
   not an inline onload, so the CSP script-src 'self' holds. A cached image
   is complete before this runs, so it is revealed at once. Without scripting
   the CSS never hides the image. */
(function () {
  'use strict';
  var img = document.querySelector('.hero-art-img');
  if (!img) return;
  function reveal() {
    img.setAttribute('data-loaded', '');
  }
  if (img.complete && img.naturalWidth) reveal();
  else img.addEventListener('load', reveal);
})();
