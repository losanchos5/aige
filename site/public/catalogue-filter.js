/* Catalogue filter: the layer/licence filter on /resources/tools and the
   audience/jurisdiction filter on /resources/reading-list. Loaded from a
   same-origin file so the CSP script-src 'self' holds; no inline script.

   Progressive enhancement. The page ships every item visible and the filter
   controls hidden ([data-filter-controls][hidden]); this script shows the
   controls and wires them. Without JavaScript the reader sees the full list.

   Markup contract, per [data-filter-root]:
   - radios with data-filter-key="<key>" (value "" means "all");
   - items [data-filter-item] carrying data-<key>="space-separated values";
   - groups [data-filter-group] hidden when none of their items is visible;
   - [data-filter-count] (aria-live) receives "Showing N of M <noun>", the noun
     read from the root's data-filter-noun;
   - optional [data-filter-empty], shown when nothing matches.
   The selection is mirrored in the query string (?layers=3&access=commercial)
   so a filtered view can be linked; unknown values are ignored. */
(function () {
  'use strict';

  var roots = document.querySelectorAll('[data-filter-root]');
  if (!roots.length) return;

  function toArray(list) {
    return Array.prototype.slice.call(list);
  }

  function readQuery() {
    var out = {};
    if (!('URLSearchParams' in window)) return out;
    var params = new URLSearchParams(window.location.search);
    params.forEach(function (value, key) {
      out[key] = value;
    });
    return out;
  }

  function writeQuery(selection, keys) {
    if (!('URLSearchParams' in window) || !window.history || !window.history.replaceState) return;
    var params = new URLSearchParams(window.location.search);
    keys.forEach(function (key) {
      if (selection[key]) params.set(key, selection[key]);
      else params.delete(key);
    });
    var query = params.toString();
    var url = window.location.pathname + (query ? '?' + query : '') + window.location.hash;
    window.history.replaceState(null, '', url);
  }

  toArray(roots).forEach(function (root) {
    var radios = toArray(root.querySelectorAll('input[type="radio"][data-filter-key]'));
    var items = toArray(root.querySelectorAll('[data-filter-item]'));
    var groups = toArray(root.querySelectorAll('[data-filter-group]'));
    var count = root.querySelector('[data-filter-count]');
    var empty = root.querySelector('[data-filter-empty]');
    var noun = root.getAttribute('data-filter-noun') || 'items';
    if (!radios.length || !items.length) return;

    var keys = [];
    radios.forEach(function (radio) {
      var key = radio.getAttribute('data-filter-key');
      if (keys.indexOf(key) === -1) keys.push(key);
    });

    // Apply a linked selection before the first pass, when its value exists.
    var query = readQuery();
    keys.forEach(function (key) {
      if (!query[key]) return;
      radios.forEach(function (radio) {
        if (radio.getAttribute('data-filter-key') === key && radio.value === query[key]) {
          radio.checked = true;
        }
      });
    });

    function selection() {
      var out = {};
      radios.forEach(function (radio) {
        if (radio.checked) out[radio.getAttribute('data-filter-key')] = radio.value;
      });
      return out;
    }

    function matches(item, chosen) {
      for (var i = 0; i < keys.length; i++) {
        var want = chosen[keys[i]];
        if (!want) continue;
        var have = (item.getAttribute('data-' + keys[i]) || '').split(/\s+/);
        if (have.indexOf(want) === -1) return false;
      }
      return true;
    }

    function apply(sync) {
      var chosen = selection();
      var shown = 0;
      items.forEach(function (item) {
        var ok = matches(item, chosen);
        item.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach(function (group) {
        group.hidden = !group.querySelector('[data-filter-item]:not([hidden])');
      });
      if (count) {
        count.textContent =
          shown === items.length
            ? 'Showing all ' + items.length + ' ' + noun
            : 'Showing ' + shown + ' of ' + items.length + ' ' + noun;
      }
      if (empty) empty.hidden = shown !== 0;
      if (sync) writeQuery(chosen, keys);
    }

    radios.forEach(function (radio) {
      radio.addEventListener('change', function () {
        apply(true);
      });
    });

    toArray(root.querySelectorAll('[data-filter-controls]')).forEach(function (controls) {
      controls.hidden = false;
    });
    apply(false);
  });
})();
