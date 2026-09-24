/* Search dialog wiring. Opens on Ctrl/Cmd+K or any [data-search-open], loads
   Pagefind lazily on first open, and renders keyboard-navigable results as an
   ARIA combobox (input) controlling a listbox (results). ES module (CSP-safe,
   no inline handlers). */

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

/** Reflect combobox state onto the input: expanded when options are showing,
    and the active option via aria-activedescendant. */
function setExpanded(expanded) {
  if (input) input.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

function setActiveDescendant(id) {
  if (!input) return;
  if (id) input.setAttribute('aria-activedescendant', id);
  else input.removeAttribute('aria-activedescendant');
}

/** Decode the handful of HTML entities Pagefind emits in excerpts. Pure string
    work (no innerHTML), mirroring scripts/content-lint.mjs. */
function decodeEntities(str) {
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8364;|&euro;/gi, '€')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
}

/** Build an excerpt safely: split Pagefind's markup on <mark>/</mark> and emit
    text nodes and <mark> elements via textContent, never innerHTML. */
function buildExcerpt(target, excerpt) {
  target.replaceChildren();
  const parts = String(excerpt || '').split(/<\/?mark>/);
  parts.forEach((part, i) => {
    if (!part) return;
    const value = decodeEntities(part);
    if (i % 2 === 1) {
      const mark = document.createElement('mark');
      mark.textContent = value;
      target.append(mark);
    } else {
      target.append(document.createTextNode(value));
    }
  });
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
  setActiveDescendant(null);
  if (!results) return;
  results.replaceChildren();
  if (!items.length) {
    setExpanded(false);
    setStatus('No results.');
    return;
  }
  setStatus(null);
  items.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'search-result';
    li.setAttribute('role', 'option');
    li.id = `sr-${i}`;
    li.setAttribute('aria-selected', 'false');

    const anchor = document.createElement('a');
    anchor.href = item.url;

    const title = document.createElement('div');
    title.className = 'search-result-title';
    title.textContent = item.title;

    const excerpt = document.createElement('div');
    excerpt.className = 'search-result-excerpt';
    buildExcerpt(excerpt, item.excerpt);

    anchor.append(title, excerpt);
    li.append(anchor);
    results.append(li);
  });
  setExpanded(true);
}

function clearResults() {
  selected = -1;
  setActiveDescendant(null);
  setExpanded(false);
  if (results) results.replaceChildren();
}

let debounce;
function onInput() {
  if (!input) return;
  const query = input.value.trim();
  clearTimeout(debounce);
  debounce = setTimeout(async () => {
    if (query.length < 2) {
      setStatus(null);
      clearResults();
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
      li.setAttribute('aria-selected', 'false');
    }
  });
  setActiveDescendant(selected >= 0 ? items[selected].id : null);
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

/** Esc always closes. A type="search" field spends the first Esc clearing its
    own value and swallows the key, so the dialog needed a second Esc; close
    straight away instead (the close handler below empties the field, and the
    field's own clear button still clears it without closing). */
function onEscape(event) {
  if (event.key !== 'Escape' || !dialog || !dialog.open) return;
  event.preventDefault();
  dialog.close();
}

if (input) {
  input.addEventListener('input', onInput);
  input.addEventListener('keydown', onResultsKey);
  input.addEventListener('keydown', onEscape);
}

// Reset combobox state whenever the dialog closes (Esc or the Esc button).
if (dialog) {
  dialog.addEventListener('close', () => {
    setStatus(null);
    clearResults();
    if (input) input.value = '';
  });
}
