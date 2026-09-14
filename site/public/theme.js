/* Applies the persisted theme before paint and exposes a setter.
   Runs inline from <head>; no framework, no bundling. */
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
