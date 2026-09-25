/* ObligationMatrix behaviour, loaded from a same-origin file so the CSP
   script-src 'self' holds (no inline JS). Enriches the obligation table rows
   with the matrix's framework/layer index, wires the heat cells, row and column
   headers to filter that table, keeps a mono status line, and reveals the grid
   with a short staggered fade. No-JS leaves the grid static and table unfiltered. */
(function () {
  'use strict';

  var grid = document.querySelector('[data-mx-grid]');
  if (!grid) return;

  var pad = function (n) {
    return n < 10 ? '0' + n : String(n);
  };
  var norm = function (s) {
    return (s || '').replace(/\s+/g, ' ').trim();
  };

  // The framework/layer index, keyed by obligation text, from the JSON payload.
  var byText = {};
  try {
    var raw = document.querySelector('[data-mx-index]');
    var list = raw ? JSON.parse(raw.textContent || '[]') : [];
    for (var i = 0; i < list.length; i++) {
      byText[norm(list[i].t)] = { f: list[i].f, l: list[i].l };
    }
  } catch (e) {
    return;
  }

  // Enrich each obligation table row with its framework id and layer list.
  var tableRows = [];
  var domRows = document.querySelectorAll('[data-obligation-row]');
  for (var r = 0; r < domRows.length; r++) {
    var el = domRows[r];
    // The obligation's name is the link in the cell; the id printed under it
    // is not part of the key.
    var cell = el.querySelector('.c-oblig .ob-name') || el.querySelector('.c-oblig');
    var hit = cell ? byText[norm(cell.textContent)] : null;
    if (hit) {
      el._mfw = hit.f;
      el._ml = hit.l;
      tableRows.push(el);
    }
  }
  var groups = document.querySelectorAll('.ob-group');

  // Short display names for the status line, from the row-header buttons.
  var fwName = {};
  var rowHeads = grid.querySelectorAll('.mx-rowh');
  for (var h = 0; h < rowHeads.length; h++) {
    fwName[rowHeads[h].getAttribute('data-mx-fw')] = norm(rowHeads[h].textContent);
  }

  var statusEl = document.querySelector('[data-mx-status]');
  var statusText = statusEl ? statusEl.querySelector('.mx-status-text') : null;
  var buttons = grid.querySelectorAll('.mx-cell, .mx-colh, .mx-rowh');

  var active = null; // the currently pressed button, or null.

  function clearPressed() {
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute('aria-pressed', 'false');
    }
  }

  function showAll() {
    for (var t = 0; t < tableRows.length; t++) {
      tableRows[t].classList.remove('mx-hidden');
    }
    for (var g = 0; g < groups.length; g++) {
      groups[g].classList.remove('mx-hidden');
    }
  }

  function reset() {
    active = null;
    clearPressed();
    showAll();
    if (statusEl) statusEl.hidden = true;
    if (statusText) statusText.textContent = '';
  }

  // Apply a filter. `fw` and/or `layer` may be null to filter by only one axis.
  function apply(fw, layer, label) {
    var shown = 0;
    for (var t = 0; t < tableRows.length; t++) {
      var el = tableRows[t];
      var ok = true;
      if (fw && el._mfw !== fw) ok = false;
      if (ok && layer && el._ml.indexOf(layer) === -1) ok = false;
      el.classList.toggle('mx-hidden', !ok);
      if (ok) shown += 1;
    }
    for (var g = 0; g < groups.length; g++) {
      var rows = groups[g].querySelectorAll('[data-obligation-row]');
      var any = false;
      for (var k = 0; k < rows.length; k++) {
        if (!rows[k].classList.contains('mx-hidden')) {
          any = true;
          break;
        }
      }
      groups[g].classList.toggle('mx-hidden', !any);
    }
    if (statusEl && statusText) {
      var noun = shown === 1 ? 'obligation' : 'obligations';
      statusText.textContent = 'Showing ' + shown + ' ' + noun + ' · ' + label;
      statusEl.hidden = false;
    }
  }

  function onActivate(btn) {
    if (active === btn) {
      reset();
      return;
    }
    var fw = btn.getAttribute('data-mx-fw');
    var layerAttr = btn.getAttribute('data-mx-layer');
    var layer = layerAttr ? parseInt(layerAttr, 10) : null;
    var label;
    if (fw && layer) label = (fwName[fw] || fw) + ' × Layer ' + pad(layer);
    else if (fw) label = fwName[fw] || fw;
    else label = 'Layer ' + pad(layer);

    clearPressed();
    btn.setAttribute('aria-pressed', 'true');
    active = btn;
    apply(fw, layer, label);
  }

  for (var b = 0; b < buttons.length; b++) {
    (function (btn) {
      btn.addEventListener('click', function () {
        onActivate(btn);
      });
    })(buttons[b]);
  }

  var clearBtn = document.querySelector('[data-mx-clear]');
  if (clearBtn) {
    clearBtn.addEventListener('click', reset);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && active) reset();
  });

  // Staggered reveal, opt-in only when motion is allowed and IO is available.
  var reduce = false;
  try {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e2) {}
  if (!reduce && 'IntersectionObserver' in window) {
    grid.classList.add('mx-anim');
    var cells = grid.querySelectorAll('.mx-cell, .mx-colh');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          for (var c = 0; c < cells.length; c++) {
            cells[c].style.transitionDelay = Math.min(c * 2, 100) + 'ms';
          }
          requestAnimationFrame(function () {
            for (var c2 = 0; c2 < cells.length; c2++) {
              cells[c2].classList.add('mx-in');
            }
          });
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    io.observe(grid);
  }
})();
