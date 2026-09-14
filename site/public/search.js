/* Search dialog wiring. Opens on Ctrl/Cmd+K or any [data-search-open], loads
   Pagefind lazily on first open, and renders keyboard-navigable results.
   ES module (CSP-safe, no inline handlers). */

const dialog = document.getElementById('search-dialog');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
const statusEl = document.getElementById('search-status');

let pagefind = null;
let loading = null;
let selected = -1;

function setStatus(message) {
  if (!statusEl) return;
  if (message) {
    statusEl.hidden = false;
    statusEl.textContent = message;
  } else {
    statusEl.hidden = true;
    statusEl.textContent = '';
  }
}

async function loadPagefind() {
  if (pagefind) return pagefind;
  if (!loading) {
    loading = import(/* @vite-ignore */ '/pagefind/pagefind.js')
      .then(async (module) => {
        if (typeof module.options === 'function') await module.options({});
        pagefind = module;
        return module;
      })
      .catch(() => null);
  }
  return loading;
}

function openDialog() {
  if (!dialog) return;
  if (!dialog.open) dialog.showModal();
  if (input) input.focus();
  loadPagefind();
}

function render(items) {
  selected = -1;
  if (!results) return;
  results.replaceChildren();
  if (!items.length) {
    setStatus('No results.');
    return;
  }
  setStatus(null);
  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'search-result';
    li.setAttribute('role', 'option');

    const anchor = document.createElement('a');
    anchor.href = item.url;

    const title = document.createElement('div');
    title.className = 'search-result-title';
    title.textContent = item.title;

    const excerpt = document.createElement('div');
    excerpt.className = 'search-result-excerpt';
    excerpt.innerHTML = item.excerpt || '';

    anchor.append(title, excerpt);
    li.append(anchor);
    results.append(li);
  }
}

let debounce;
function onInput() {
  if (!input) return;
  const query = input.value.trim();
  clearTimeout(debounce);
  debounce = setTimeout(async () => {
    if (query.length < 2) {
      render([]);
      setStatus(null);
      if (results) results.replaceChildren();
      return;
    }
    const pf = await loadPagefind();
    if (!pf) {
      setStatus('Search is unavailable.');
      return;
    }
    setStatus('Searching…');
    const search = await pf.search(query);
    const data = await Promise.all(search.results.slice(0, 8).map((r) => r.data()));
    render(
      data.map((d) => ({
        url: d.url,
        title: (d.meta && d.meta.title) || d.url,
        excerpt: d.excerpt,
      })),
    );
  }, 160);
}

function onResultsKey(event) {
  if (!results) return;
  const items = Array.from(results.querySelectorAll('.search-result'));
  if (!items.length) return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    selected = Math.min(selected + 1, items.length - 1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    selected = Math.max(selected - 1, 0);
  } else if (event.key === 'Enter') {
    if (selected >= 0) {
      event.preventDefault();
      const anchor = items[selected].querySelector('a');
      if (anchor) window.location.href = anchor.href;
    }
    return;
  } else {
    return;
  }

  items.forEach((li, i) => {
    if (i === selected) {
      li.setAttribute('aria-selected', 'true');
      li.scrollIntoView({ block: 'nearest' });
    } else {
      li.removeAttribute('aria-selected');
    }
  });
}

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && (event.key === 'k' || event.key === 'K')) {
    event.preventDefault();
    openDialog();
  }
});

for (const trigger of document.querySelectorAll('[data-search-open]')) {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openDialog();
  });
}

if (input) {
  input.addEventListener('input', onInput);
  input.addEventListener('keydown', onResultsKey);
}
