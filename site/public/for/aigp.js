// aigp.js: the study paths of /for/aigp. Progressive enhancement only: without
// JavaScript each path is a plain reading list. With it, the reader ticks
// sections off and the ticks are kept in this browser's localStorage through
// the toolkit's safe store (key `aige.toolkit.aigp-study.v1`). Nothing is sent
// anywhere: no fetch, no beacon, no form submission. Loaded as an external
// same-origin module, as the CSP (`script-src 'self'`) requires.
import { store, mountTool, announce } from '/toolkit/lib.js';

const KEY = 'aigp-study.v1';

/** The stored ticks: a set of section hrefs. Anything malformed reads as none. */
function load() {
  const saved = store.get(KEY, null);
  if (!saved || saved.v !== 1 || !Array.isArray(saved.done)) return new Set();
  return new Set(saved.done.filter((href) => typeof href === 'string'));
}

function save(done) {
  return store.set(KEY, { v: 1, done: [...done].sort() });
}

function init(root) {
  mountTool(root);
  const checks = [...root.querySelectorAll('input[data-ag-check]')];
  const status = root.querySelector('[data-ag-status]');
  const reset = root.querySelector('[data-ag-reset]');
  const noStore = root.querySelector('[data-ag-nostore]');
  if (noStore && !store.available()) noStore.hidden = false;

  // Keep only ticks that are still steps of a path (the map may have changed).
  const valid = new Set(checks.map((input) => input.value));
  const done = new Set([...load()].filter((href) => valid.has(href)));

  const progressOf = (section) => {
    const inputs = [...section.querySelectorAll('input[data-ag-check]')];
    const read = inputs.filter((input) => input.checked).length;
    return { read, total: inputs.length };
  };

  const render = () => {
    for (const input of checks) {
      input.checked = done.has(input.value);
      input.closest('.ag-step')?.classList.toggle('is-done', input.checked);
    }
    for (const section of root.querySelectorAll('[data-ag-domain]')) {
      const { read, total } = progressOf(section);
      const text = section.querySelector('[data-ag-progress-text]');
      const bar = section.querySelector('progress[data-ag-progress]');
      if (text) text.textContent = `${read} of ${total} sections read`;
      if (bar) bar.value = read;
    }
  };

  root.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.matches('[data-ag-check]')) return;
    if (input.checked) done.add(input.value);
    else done.delete(input.value);
    const kept = save(done);
    render();
    const section = input.closest('[data-ag-domain]');
    const { read, total } = section ? progressOf(section) : { read: 0, total: 0 };
    const where = section ? `Domain ${section.getAttribute('data-ag-domain')}: ` : '';
    announce(
      status,
      `${where}${read} of ${total} sections read.${kept ? '' : ' Not kept: this browser is not saving storage for this page.'}`,
    );
  });

  reset?.addEventListener('click', () => {
    done.clear();
    store.remove(KEY);
    render();
    announce(status, 'Your ticks are cleared.');
  });

  render();
}

const root = document.querySelector('[data-ag-study]');
if (root) init(root);
