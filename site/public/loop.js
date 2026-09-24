/* loop.js: the home page's governance loop (GovernanceLoop.astro).
   One state, the active step, kept as data-active on the figure: its list item
   takes .is-active, the edges and edge labels that touch it light, and the
   detail strip under the canvas shows its panel. A pinned step also takes
   .is-pinned and its button reports aria-expanded (the list layout opens its
   note in line).

   Canvas layout: a mouse over a step, or keyboard focus on it, shows it; a
   click pins it. The step stays shown until the mouse leaves the whole canvas
   (after a short grace), not the step, so crossing the gaps between steps never
   flickers the detail, and nothing the figure draws can cover a step (the
   decorative layers take no pointer events).
   List layout: only a tap, click or Enter/Space opens or closes a step. Hover,
   focus and touch-down do nothing there, because opening a note in line moves
   the steps below it (under a finger that is about to lift, or a scroll).
   Escape, or a press anywhere outside the figure, releases a pin.

   Motion: the beam walks the loop once (under 5 s) each time the figure comes
   into view; data-play starts the CSS animations and is cleared when the figure
   leaves the view, so the next visit replays it. Under reduced motion the CSS
   defines no animation at all. External file: the CSP allows no inline script. */
(function () {
  var figure = document.querySelector('[data-loop]');
  if (!figure) return;

  var canvas = figure.querySelector('[data-loop-canvas]');
  var wires = figure.querySelector('.loop-wires');
  var buttons = Array.prototype.slice.call(figure.querySelectorAll('.loop-node'));
  var lit = Array.prototype.slice.call(figure.querySelectorAll('.loop-edge, .loop-pill'));
  var panels = Array.prototype.slice.call(figure.querySelectorAll('.loop-detail-panel'));
  var pinned = null;
  var leaveTimer = 0;
  var LEAVE_GRACE_MS = 120;

  function isCanvas() {
    return getComputedStyle(wires).display !== 'none';
  }

  function isMouse(event) {
    return event.pointerType === 'mouse' || event.pointerType === 'pen';
  }

  function show(id) {
    if (id) figure.setAttribute('data-active', id);
    else figure.removeAttribute('data-active');

    buttons.forEach(function (button) {
      var step = button.getAttribute('data-step');
      button.setAttribute('aria-expanded', pinned === step ? 'true' : 'false');
      button.parentNode.classList.toggle('is-active', step === id);
      button.parentNode.classList.toggle('is-pinned', step === pinned);
    });

    lit.forEach(function (el) {
      var on = !!id && (el.getAttribute('data-from') === id || el.getAttribute('data-to') === id);
      el.classList.toggle('is-lit', on);
    });

    panels.forEach(function (panel) {
      panel.classList.toggle('is-shown', panel.getAttribute('data-for') === (id || ''));
    });
  }

  // The step a keyboard user is on, if any (not one a mouse click focused).
  function focusedStep() {
    var el = document.activeElement;
    if (!el || !figure.contains(el) || !el.classList.contains('loop-node')) return null;
    if (!isCanvas() || !el.matches(':focus-visible')) return null;
    return el.getAttribute('data-step');
  }

  function settle() {
    show(pinned || focusedStep());
  }

  buttons.forEach(function (button) {
    var id = button.getAttribute('data-step');

    button.addEventListener('pointerenter', function (event) {
      if (!isMouse(event) || !isCanvas()) return;
      clearTimeout(leaveTimer);
      show(id);
    });

    button.addEventListener('focus', function () {
      if (!isCanvas()) return;
      clearTimeout(leaveTimer);
      show(id);
    });

    button.addEventListener('click', function (event) {
      clearTimeout(leaveTimer);
      if (pinned === id) {
        pinned = null;
        // A mouse still over the step keeps it shown; a tap or a key closes it.
        show(isCanvas() && isMouse(event) ? id : null);
      } else {
        pinned = id;
        show(id);
      }
    });
  });

  canvas.addEventListener('pointerleave', function (event) {
    if (!isMouse(event)) return;
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(settle, LEAVE_GRACE_MS);
  });

  figure.addEventListener('focusout', function (event) {
    if (!figure.contains(event.relatedTarget)) settle();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || !figure.hasAttribute('data-active')) return;
    pinned = null;
    show(null);
  });

  document.addEventListener('pointerdown', function (event) {
    if (!pinned || figure.contains(event.target)) return;
    pinned = null;
    settle();
  });

  function play() {
    figure.removeAttribute('data-play');
    void figure.offsetWidth; // restart the CSS animations
    figure.setAttribute('data-play', '');
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio < 0.25) figure.removeAttribute('data-play');
          else if (!figure.hasAttribute('data-play')) play();
        });
      },
      { threshold: [0, 0.25] },
    ).observe(figure);
  }
})();
