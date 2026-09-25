/* Applies the persisted theme before paint and exposes a setter.
   Base.astro inlines this file in <head>, comments stripped and lines trimmed
   (src/lib/theme-script.ts); no framework, no bundling. The CSP in
   public/_headers allows that inline copy by its sha256, so any change to the
   code here needs the new hash there: the build fails and prints it until
   then. Comments are free to change. The file itself stays served for pages
   cached before the inline copy shipped. */
(function () {
  'use strict';
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (err) {
    /* storage unavailable; fall back to system preference */
  }

  window.__setTheme = function (theme) {
    try {
      if (theme === 'dark' || theme === 'light') {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
      }
    } catch (err) {
      if (theme === 'dark' || theme === 'light') {
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  };
})();
