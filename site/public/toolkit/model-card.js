// model-card.js: the client side of /toolkit/model-card. Builds the form from
// the page's JSON island, checks the record against model-card.v1.json, reads
// it against the coverage checklist, and exports the record (JSON), a Hugging
// Face style card (Markdown with YAML front matter), a CycloneDX 1.7 ML-BOM
// and the checklist (CSV). The draft stays in this browser. Nothing is sent.
import {
  readToolData,
  mountTool,
  store,
  isoDate,
  slug,
  downloadJson,
  downloadMarkdown,
  downloadText,
  downloadCsv,
  readJsonFile,
  h,
  announce,
  focusOn,
} from './lib.js';
import { createForm, renderErrorSummary } from './schema-form.js';
import {
  SCHEMA_ID,
  checkCard,
  evaluateChecklist,
  checklistSummary,
  checklistCsvRows,
  hfModelCard,
  cycloneDx,
  STATE_LABELS,
} from './model-card-core.js';

const DRAFT_KEY = 'model-card.draft';

const root = document.querySelector('[data-bld="model-card"]');
const data = readToolData();
if (root && data) init(root, data);

function init(app, model) {
  mountTool(app);
  const { schema, sections, checklist, groups, notice, page, site } = model;
  const $ = (sel) => app.querySelector(sel);
  const status = $('[data-bld-status]');
  const resultStatus = $('[data-bld-result-status]');
  const errorsBox = document.getElementById('mc-errors');

  const saved = store.get(DRAFT_KEY, null);
  const form = createForm({
    root: $('[data-bld-form]'),
    sections,
    schema,
    prefix: 'mc',
    onChange: () => {
      save();
      refresh();
    },
  });

  function save() {
    store.set(DRAFT_KEY, { doc: form.doc, savedAt: new Date().toISOString() });
  }

  const current = () => checkCard(form.doc, schema);

  function refresh() {
    const { record, errors } = current();
    const validity = $('[data-bld-validity]');
    validity.textContent = errors.length
      ? `Not valid yet against model-card.v1: ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}. Choose "Check the card" to see ${errors.length === 1 ? 'it' : 'them'}.`
      : 'Valid against model-card.v1.';
    validity.setAttribute('data-valid', errors.length ? 'false' : 'true');

    const results = evaluateChecklist(record, checklist);
    const counts = checklistSummary(results);
    $('[data-mc-summary]').replaceChildren(
      h('li', {}, h('strong', { text: String(counts.applicable) }), 'requirements read'),
      h('li', {}, h('strong', { text: String(counts.covered) }), 'covered or linked'),
      h('li', {}, h('strong', { text: String(counts.partial) }), 'partly covered'),
      h('li', {}, h('strong', { text: String(counts.missing) }), 'not covered or not linked'),
    );
    const rows = [];
    for (const group of groups) {
      const items = results.filter((item) => item.group === group.id);
      if (!items.length) continue;
      const applicable = items.some((item) => item.state !== 'not-applicable');
      rows.push(
        h(
          'tr',
          { class: 'bld-group-row' },
          h('th', {
            scope: 'colgroup',
            colspan: '4',
            text: applicable ? group.label : `${group.label}: not applicable to this card`,
          }),
        ),
      );
      if (!applicable) continue;
      for (const item of items) {
        rows.push(
          h(
            'tr',
            { 'data-item': item.id },
            h('th', { scope: 'row', class: 'num' }, h('a', { href: `/obligations/${item.obligation.toLowerCase()}`, text: item.ref })),
            h('td', { 'data-label': 'Requirement', text: item.text }),
            h(
              'td',
              { 'data-label': 'State' },
              h('span', { class: 'bld-state', 'data-state': item.state, text: STATE_LABELS[item.state] }),
            ),
            h('td', {
              'data-label': 'Card fields',
              text: item.fields.map((field) => (item.filled.includes(field) ? `${field} (filled)` : field)).join(item.any ? ' or ' : ', '),
            }),
          ),
        );
      }
    }
    $('[data-mc-checklist]').replaceChildren(...rows);
  }

  $('[data-bld-form-el]').addEventListener('submit', (event) => {
    event.preventDefault();
    const { errors } = current();
    const items = form.showErrors(errors);
    if (errors.length) {
      renderErrorSummary(errorsBox, items, `Fix ${errors.length} ${errors.length === 1 ? 'field' : 'fields'} before the card validates`);
      focusOn(errorsBox);
      return;
    }
    renderErrorSummary(errorsBox, []);
    announce(status, 'The card is valid against the model-card schema.');
    focusOn(document.getElementById('mc-result-title'));
  });

  // ---- import --------------------------------------------------------------------------
  const importInput = $('[data-bld-import]');
  const importError = $('[data-bld-import-error]');
  function setImportError(message) {
    importError.textContent = message;
    importError.hidden = !message;
    if (message) {
      importInput.setAttribute('aria-invalid', 'true');
      importInput.setAttribute('aria-describedby', 'mc-import-hint mc-import-error');
    } else {
      importInput.removeAttribute('aria-invalid');
      importInput.setAttribute('aria-describedby', 'mc-import-hint');
    }
  }
  importInput.addEventListener('change', async () => {
    setImportError('');
    try {
      const record = await readJsonFile(importInput.files && importInput.files[0], { maxBytes: 1024 * 1024 });
      if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('That file is not a model card record.');
      if (record.$schema && record.$schema !== SCHEMA_ID) throw new Error(`That record claims another schema (${record.$schema}).`);
      if (!record.name && !record.version) throw new Error('That record has neither a name nor a version.');
      const { $schema: _s, ...doc } = record;
      form.render(doc);
      renderErrorSummary(errorsBox, []);
      save();
      refresh();
      const { errors } = current();
      announce(resultStatus, `Opened ${record.name || 'the card'}. ${errors.length ? `${errors.length} problems to fix.` : 'It is valid.'}`);
      importInput.value = '';
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'The file could not be read.');
    }
  });

  // ---- exports ---------------------------------------------------------------------------
  app.addEventListener('click', (event) => {
    const button = /** @type {HTMLElement} */ (event.target).closest('[data-action]');
    if (!button) return;
    const action = button.getAttribute('data-action');
    const { record, errors } = current();
    const base = `model-card-${slug(record.name || 'model') || 'model'}${record.version ? `-${slug(record.version)}` : ''}`;
    const warn = errors.length ? ` The record does not validate yet (${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}).` : '';
    const results = evaluateChecklist(record, checklist);
    switch (action) {
      case 'json':
        downloadJson(`${base}.json`, record);
        announce(resultStatus, `Record downloaded as JSON.${warn}`);
        break;
      case 'hf':
        downloadMarkdown(`${base}.README.md`, hfModelCard(record, results, { notice, page, date: isoDate(), groups, site }));
        announce(resultStatus, `Hugging Face style card downloaded.${warn}`);
        break;
      case 'cdx':
        downloadText(`${base}.cdx.json`, `${JSON.stringify(cycloneDx(record, { page }), null, 2)}\n`, 'application/vnd.cyclonedx+json;charset=utf-8');
        announce(resultStatus, `CycloneDX 1.7 ML-BOM downloaded.${warn}`);
        break;
      case 'csv':
        downloadCsv(`${base}-checklist.csv`, checklistCsvRows(results, groups, site));
        announce(resultStatus, 'Checklist downloaded as CSV.');
        break;
      case 'print':
        window.print();
        break;
      case 'clear':
        if (!window.confirm('Clear the whole card? Download the record first if you need it.')) return;
        form.render({});
        renderErrorSummary(errorsBox, []);
        save();
        refresh();
        announce(status, 'The form is empty.');
        break;
      default:
        break;
    }
  });

  // ---- start ------------------------------------------------------------------------------
  form.render(saved && saved.doc && typeof saved.doc === 'object' ? saved.doc : {});
  refresh();
  if (saved && saved.doc && Object.keys(saved.doc).length) announce(status, 'Restored your draft from this browser.');
}
