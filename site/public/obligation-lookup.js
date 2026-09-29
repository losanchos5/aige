/* "Look up an article" box (src/components/ObligationLookup.astro). Fetches
   /obligations/lookup.json on first focus, ranks it with the build's own code
   (/obligation-lookup-core.js) and renders the matches as an ARIA combobox
   controlling a listbox, like /search.js. Enter opens the active result or the
   first one; Esc closes the list, then clears. ?q= prefills the box (shareable links); #lookup is the
   input's own id, so the browser focuses it without help. ES module, no inline handlers (CSP-safe). */

import { rank } from '/obligation-lookup-core.js';

const form = document.querySelector('[data-olk]');
if (form) init(form);

function init(root) {
  const input = root.querySelector('.olk-input');
  const list = root.querySelector('.olk-results');
  const status = root.querySelector('.olk-status');
  const empty = root.querySelector('.olk-empty');
  if (!input || !list || !status || !empty) return;

  let index = null;
  let loading = null;
  let failed = false;
  let results = [];
  let active = -1;
  let debounce;

  function load() {
    if (index) return Promise.resolve(index);
    if (failed) return Promise.resolve(null);
    if (!loading) {
      loading = fetch(root.getAttribute('data-index'))
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => {
          index = json;
          // One try per page view: a failing fetch is not repeated per keystroke.
          if (!json) failed = true;
          return json;
        })
        .catch(() => {
          failed = true;
          return null;
        });
    }
    return loading;
  }

  /** A single character only searches when it is a digit ("5"); "a" is noise. */
  function searchable(query) {
    return query.length >= 2 || /\d/.test(query);
  }

  function setActive(i) {
    active = i;
    const rows = list.querySelectorAll('.olk-opt');
    rows.forEach((row, n) => row.setAttribute('aria-selected', n === i ? 'true' : 'false'));
    if (i >= 0 && rows[i]) {
      input.setAttribute('aria-activedescendant', rows[i].id);
      rows[i].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  function render(query, entries) {
    results = entries;
    list.replaceChildren();
    setActive(-1);
    entries.forEach((entry, i) => {
      // The link itself is the option (an interactive control may not sit
      // inside role="option"); the list item is presentational.
      const li = document.createElement('li');
      li.className = 'olk-row';
      li.setAttribute('role', 'none');
      const a = document.createElement('a');
      a.className = 'olk-opt';
      a.id = `olk-opt-${i}`;
      a.href = entry.p;
      a.tabIndex = -1;
      a.setAttribute('role', 'option');
      a.setAttribute('aria-selected', 'false');
      a.setAttribute('data-umami-event', 'obligation-lookup');
      a.setAttribute('data-umami-event-target', entry.p);
      const ref = document.createElement('span');
      ref.className = 'olk-ref';
      ref.textContent = `${entry.s} ${entry.c}`;
      const title = document.createElement('span');
      title.className = 'olk-title';
      title.textContent = entry.t;
      if (entry.k === 't') {
        const kind = document.createElement('span');
        kind.className = 'olk-kind';
        kind.textContent = 'crosswalk topic';
        title.append(kind);
      }
      a.append(ref, title);
      li.append(a);
      list.append(li);
    });
    const shown = entries.length > 0;
    input.setAttribute('aria-expanded', shown ? 'true' : 'false');
    const none = !shown && searchable(query.trim());
    status.textContent = shown
      ? `${entries.length} ${entries.length === 1 ? 'match' : 'matches'}`
      : none
        ? 'No matches'
        : '';
    empty.hidden = !none;
  }

  function clear() {
    render('', []);
  }

  async function search(query) {
    const q = query.trim();
    if (!searchable(q)) {
      clear();
      return [];
    }
    const idx = await load();
    if (!idx) {
      render('', []);
      status.textContent = 'The article index could not be loaded; use the list below.';
      return [];
    }
    // A newer keystroke may have changed the box while the index loaded.
    if (input.value.trim() !== q) return results;
    const entries = rank(idx, q);
    render(q, entries);
    return entries;
  }

  /** On /obligations the address carries the query, so the result is shareable. */
  function syncUrl(query) {
    if (window.location.pathname !== root.getAttribute('action')) return;
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set('q', query.trim());
    else url.searchParams.delete('q');
    history.replaceState(history.state, '', url);
  }

  /** Opens the row picked with the arrows or, failing that, the best match for
      what the box says now (the list may still show an older keystroke). */
  async function go() {
    const target = active >= 0 ? results[active] : (await search(input.value))[0];
    if (target) window.location.href = target.p;
  }

  input.addEventListener('focus', load, { once: true });
  root.addEventListener('pointerenter', load, { once: true });

  input.addEventListener('input', () => {
    // A row picked for the previous text must not be what Enter opens now.
    setActive(-1);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      search(input.value);
      syncUrl(input.value);
    }, 120);
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!results.length) return;
      event.preventDefault();
      const step = event.key === 'ArrowDown' ? 1 : -1;
      const next = active < 0 && step < 0 ? results.length - 1 : active + step;
      setActive(Math.max(0, Math.min(results.length - 1, next)));
    } else if (event.key === 'Escape') {
      if (!input.value) return;
      event.preventDefault();
      // First Esc closes an open list, the next one clears the box.
      if (results.length) {
        list.replaceChildren();
        results = [];
        setActive(-1);
        input.setAttribute('aria-expanded', 'false');
        status.textContent = '';
        return;
      }
      input.value = '';
      clear();
      syncUrl('');
    }
  });

  root.addEventListener('submit', (event) => {
    event.preventDefault();
    clearTimeout(debounce);
    go();
  });

  const initial = new URLSearchParams(window.location.search).get('q');
  if (initial) {
    input.value = initial;
    search(initial);
  }
}
