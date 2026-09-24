// ai-register-entry.js: the client side of /toolkit/ai-register-entry. Builds
// the form for an AI system or an agent entry from the page's JSON island,
// checks the entry against its published schema, keeps a register in this
// browser (localStorage), imports and exports it (JSON, CSV), and writes the
// public summary and the field crosswalk. Nothing is sent anywhere.
import {
  readToolData,
  mountTool,
  store,
  isoDate,
  slug,
  downloadJson,
  downloadMarkdown,
  downloadCsv,
  h,
  announce,
  focusOn,
} from './lib.js';
import { createForm, renderErrorSummary } from './schema-form.js';
import {
  KIND_LABELS,
  exportEntry,
  checkEntry,
  entriesFromJson,
  entriesFromCsv,
  registerCsvRows,
  publicSummaryMarkdown,
  crosswalkFor,
  crosswalkCsvRows,
  crosswalkMarkdown,
} from './ai-register-entry-core.js';
import { describeError } from './builders.js';

const DRAFT_KEY = 'ai-register-entry.draft';
const REGISTER_KEY = 'ai-register-entry.register';
const MAX_BYTES = 2 * 1024 * 1024;

const root = document.querySelector('[data-bld="register"]');
const data = readToolData();
if (root && data) init(root, data);

function init(app, model) {
  mountTool(app);
  const { schemas, sections, crosswalk, columns, notice, page } = model;
  const $ = (sel) => app.querySelector(sel);
  const status = $('[data-bld-status]');
  const resultStatus = $('[data-bld-result-status]');
  const registerStatus = $('[data-bld-register-status]');
  const errorsBox = document.getElementById('reg-errors');

  /** Current kind, the draft of each kind, and which register row is being edited. */
  const saved = store.get(DRAFT_KEY, null);
  let kind = saved && (saved.kind === 'agent' || saved.kind === 'system') ? saved.kind : 'system';
  const drafts = {
    system: (saved && saved.docs && saved.docs.system) || {},
    agent: (saved && saved.docs && saved.docs.agent) || {},
  };
  let editing = saved && Number.isInteger(saved.editing) ? saved.editing : null;
  let register = normaliseRegister(store.get(REGISTER_KEY, []));
  if (editing !== null && !register[editing]) editing = null;

  // The form is rebuilt (on a fresh host, so no listener is doubled) when the kind changes.
  /** @type {ReturnType<typeof createForm>} */
  let current;
  function buildForm() {
    const host = $('[data-bld-form]');
    const fresh = host.cloneNode(false);
    host.replaceWith(fresh);
    current = createForm({
      root: fresh,
      sections: sections[kind],
      schema: schemas[kind],
      prefix: 'reg',
      onChange: () => {
        drafts[kind] = current.doc;
        saveDraft();
        refreshResult();
      },
    });
    current.render(drafts[kind]);
  }

  function normaliseRegister(raw) {
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((entry) => entry && typeof entry === 'object' && entry.doc && typeof entry.doc === 'object')
      .map((entry) => ({ kind: entry.kind === 'agent' ? 'agent' : 'system', doc: entry.doc }));
  }

  function saveDraft() {
    store.set(DRAFT_KEY, { kind, docs: drafts, editing, savedAt: new Date().toISOString() });
  }
  function saveRegister() {
    store.set(REGISTER_KEY, register);
  }

  // ---- kind switch -----------------------------------------------------------
  for (const radio of app.querySelectorAll('[data-reg-kind]')) {
    radio.checked = radio.value === kind;
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      kind = radio.value === 'agent' ? 'agent' : 'system';
      editing = null;
      renderErrorSummary(errorsBox, []);
      buildForm();
      saveDraft();
      refreshResult();
      refreshAddLabel();
      announce(status, `${KIND_LABELS[kind]} form ready.`);
    });
  }

  // ---- the current entry -------------------------------------------------------
  function currentEntry() {
    return checkEntry(current.doc, kind, schemas);
  }

  function refreshResult() {
    const { record, errors } = currentEntry();
    const validity = $('[data-bld-validity]');
    const schemaName = kind === 'agent' ? 'agent-register-entry.v1' : 'ai-system-register-entry.v1';
    validity.textContent = errors.length
      ? `Not valid yet against ${schemaName}: ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}. Choose "Check the entry" to see ${errors.length === 1 ? 'it' : 'them'}.`
      : `Valid against ${schemaName}.`;
    validity.setAttribute('data-valid', errors.length ? 'false' : 'true');
    const rows = crosswalkFor({ kind, doc: record }, crosswalk);
    $('[data-bld-xwalk-rows]').replaceChildren(
      ...rows.map((row) =>
        h(
          'tr',
          {},
          h('th', { scope: 'row', text: row.label }),
          h('td', { 'data-label': 'This entry', class: row.value ? '' : 'bld-empty', text: row.value || '(empty)' }),
          ...columns.map((column) => h('td', { 'data-label': column.label, text: row[column.key] || 'No direct field' })),
        ),
      ),
    );
  }

  function refreshAddLabel() {
    const button = $('[data-action="add"]');
    if (button) button.textContent = editing === null ? 'Add to the register' : `Save changes to entry ${editing + 1}`;
  }

  function checkNow() {
    const { errors } = currentEntry();
    const items = current.showErrors(errors);
    if (errors.length) {
      renderErrorSummary(errorsBox, items, `Fix ${errors.length} ${errors.length === 1 ? 'field' : 'fields'} before the entry validates`);
      focusOn(errorsBox);
      return false;
    }
    renderErrorSummary(errorsBox, []);
    announce(status, 'The entry is valid against its schema.');
    focusOn(document.getElementById('reg-result-title'));
    return true;
  }

  $('[data-bld-form-el]').addEventListener('submit', (event) => {
    event.preventDefault();
    checkNow();
  });

  // ---- register --------------------------------------------------------------------
  function renderRegister() {
    const body = $('[data-bld-register-rows]');
    body.replaceChildren(
      ...register.map((entry, i) => {
        const errors = checkEntry(entry.doc, entry.kind, schemas).errors;
        return h(
          'tr',
          { 'data-row': String(i) },
          h('td', { 'data-label': 'Id', class: 'num', text: entry.doc.id || '(no id)' }),
          h('td', { 'data-label': 'Name', text: entry.doc.name || '' }),
          h('td', { 'data-label': 'Kind', text: KIND_LABELS[entry.kind] }),
          h('td', {
            'data-label': 'Checks',
            text: errors.length ? `${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}` : 'Valid',
          }),
          h(
            'td',
            { 'data-label': 'Actions', class: 'bld-row-actions' },
            h('button', { type: 'button', class: 'btn btn-secondary', 'data-edit': String(i), text: `Edit entry ${i + 1}` }),
            h('button', { type: 'button', class: 'btn btn-secondary', 'data-drop': String(i), text: `Remove entry ${i + 1}` }),
          ),
        );
      }),
    );
    $('[data-bld-register-empty]').hidden = register.length > 0;
  }

  $('[data-bld-register-rows]').addEventListener('click', (event) => {
    const target = /** @type {HTMLElement} */ (event.target);
    const edit = target.closest('[data-edit]');
    const drop = target.closest('[data-drop]');
    if (edit) {
      const i = Number(edit.getAttribute('data-edit'));
      const entry = register[i];
      if (!entry) return;
      kind = entry.kind;
      editing = i;
      drafts[kind] = JSON.parse(JSON.stringify(entry.doc));
      for (const radio of app.querySelectorAll('[data-reg-kind]')) radio.checked = radio.value === kind;
      buildForm();
      saveDraft();
      refreshResult();
      refreshAddLabel();
      announce(status, `Editing entry ${i + 1} (${entry.doc.id || 'no id'}).`);
      focusOn(app.querySelector('.bld-kind legend') ?? $('[data-bld-form]'));
    } else if (drop) {
      const i = Number(drop.getAttribute('data-drop'));
      const [gone] = register.splice(i, 1);
      if (editing === i) editing = null;
      else if (editing !== null && editing > i) editing -= 1;
      saveRegister();
      saveDraft();
      renderRegister();
      refreshAddLabel();
      announce(registerStatus, `Removed ${gone?.doc?.id || 'the entry'}. ${register.length} left.`);
    }
  });

  function addCurrent() {
    const { record, errors } = currentEntry();
    if (!Object.keys(record).some((key) => key !== '$schema')) {
      announce(status, 'The form is empty: fill the entry first.');
      return;
    }
    const entry = { kind, doc: record };
    let message;
    if (editing !== null && register[editing]) {
      register[editing] = entry;
      message = `Saved changes to entry ${editing + 1}.`;
    } else {
      register.push(entry);
      message = `Added ${record.id || 'the entry'} to the register (${register.length} ${register.length === 1 ? 'entry' : 'entries'}).`;
      editing = register.length - 1;
    }
    if (errors.length) message += ` It does not validate yet: ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}.`;
    saveRegister();
    saveDraft();
    renderRegister();
    refreshAddLabel();
    announce(status, message);
  }

  function newEntry() {
    editing = null;
    drafts[kind] = {};
    renderErrorSummary(errorsBox, []);
    current.render({});
    saveDraft();
    refreshResult();
    refreshAddLabel();
    announce(status, `New ${KIND_LABELS[kind].toLowerCase()} entry. The register is unchanged.`);
    const first = $('[data-bld-form] input, [data-bld-form] select, [data-bld-form] textarea');
    if (first instanceof HTMLElement) first.focus();
  }

  // ---- import -------------------------------------------------------------------------
  const importInput = $('[data-bld-import]');
  const importError = $('[data-bld-import-error]');
  const report = $('[data-bld-import-report]');

  function setImportError(message) {
    importError.textContent = message;
    importError.hidden = !message;
    if (message) {
      importInput.setAttribute('aria-invalid', 'true');
      importInput.setAttribute('aria-describedby', 'reg-import-hint reg-import-error');
    } else {
      importInput.removeAttribute('aria-invalid');
      importInput.setAttribute('aria-describedby', 'reg-import-hint');
    }
  }

  importInput.addEventListener('change', () => {
    const file = importInput.files && importInput.files[0];
    setImportError('');
    report.hidden = true;
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setImportError(`That file is ${Math.ceil(file.size / 1024)} KB; the limit is ${MAX_BYTES / 1024} KB.`);
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setImportError('The file could not be read.');
    reader.onload = () => {
      const text = String(reader.result ?? '');
      const isCsv = /\.csv$/i.test(file.name) || !/^\s*[[{]/.test(text);
      let result;
      if (isCsv) result = entriesFromCsv(text, schemas);
      else {
        try {
          result = entriesFromJson(JSON.parse(text), schemas);
        } catch {
          setImportError('That file is not valid JSON.');
          return;
        }
      }
      if (!result.entries.length) {
        setImportError(result.problems.join(' ') || 'No entries found in the file.');
        return;
      }
      const start = register.length;
      register.push(...result.entries.map((entry) => ({ kind: entry.kind, doc: entry.doc })));
      saveRegister();
      renderRegister();
      const valid = result.entries.filter((entry) => !entry.errors.length).length;
      const lines = [
        `Imported ${result.entries.length} ${result.entries.length === 1 ? 'entry' : 'entries'} from ${file.name}: ${valid} valid, ${result.entries.length - valid} with problems.`,
        ...result.problems,
        ...result.entries.flatMap((entry, i) =>
          entry.errors.length
            ? [
                `Entry ${start + i + 1} (${entry.doc.id || 'no id'}): ${entry.errors
                  .slice(0, 3)
                  .map((error) => describeError(error, error.path.join('.')))
                  .join(' ')}${entry.errors.length > 3 ? ` And ${entry.errors.length - 3} more.` : ''}`,
              ]
            : [],
        ),
      ];
      $('[data-bld-import-list]').replaceChildren(...lines.map((line) => h('li', { text: line })));
      report.hidden = false;
      announce(registerStatus, lines[0]);
      importInput.value = '';
    };
    reader.readAsText(file);
  });

  // ---- exports --------------------------------------------------------------------------
  const today = () => isoDate();
  const entryName = (record) => slug(record.id || record.name || 'entry') || 'entry';

  app.addEventListener('click', (event) => {
    const button = /** @type {HTMLElement} */ (event.target).closest('[data-action]');
    if (!button) return;
    const action = button.getAttribute('data-action');
    const { record, errors } = currentEntry();
    const entry = { kind, doc: record };
    const warn = errors.length
      ? ` It does not validate yet (${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}).`
      : '';
    switch (action) {
      case 'add':
        addCurrent();
        break;
      case 'new':
        newEntry();
        break;
      case 'entry-json':
        downloadJson(`register-entry-${entryName(record)}.json`, record);
        announce(resultStatus, `Entry downloaded as JSON.${warn}`);
        break;
      case 'entry-md':
        downloadMarkdown(
          `register-entry-${entryName(record)}-public-summary.md`,
          publicSummaryMarkdown([entry], { notice, page, date: today(), title: `Public summary: ${record.name || record.id || 'register entry'}` }),
        );
        announce(resultStatus, 'Public summary downloaded.');
        break;
      case 'xwalk-csv':
        downloadCsv(`register-entry-${entryName(record)}-crosswalk.csv`, crosswalkCsvRows(entry, crosswalk, columns));
        announce(resultStatus, 'Crosswalk downloaded as CSV.');
        break;
      case 'xwalk-md':
        downloadMarkdown(
          `register-entry-${entryName(record)}-crosswalk.md`,
          crosswalkMarkdown(entry, crosswalk, columns, { notice, page, date: today() }),
        );
        announce(resultStatus, 'Crosswalk downloaded as Markdown.');
        break;
      case 'print':
        window.print();
        break;
      case 'reg-json':
        if (!register.length) return announce(registerStatus, 'The register is empty.');
        downloadJson(
          `ai-register-${today()}.json`,
          register.map((item) => exportEntry(item.doc, item.kind, schemas[item.kind])),
        );
        announce(registerStatus, `Register downloaded as JSON (${register.length} entries).`);
        break;
      case 'reg-csv':
        if (!register.length) return announce(registerStatus, 'The register is empty.');
        downloadCsv(`ai-register-${today()}.csv`, registerCsvRows(register));
        announce(registerStatus, `Register downloaded as CSV (${register.length} entries).`);
        break;
      case 'reg-md':
        if (!register.length) return announce(registerStatus, 'The register is empty.');
        downloadMarkdown(`ai-register-public-summary-${today()}.md`, publicSummaryMarkdown(register, { notice, page, date: today() }));
        announce(registerStatus, 'Public summary of the register downloaded.');
        break;
      case 'reg-clear':
        if (!register.length) return announce(registerStatus, 'The register is already empty.');
        if (!window.confirm(`Remove all ${register.length} entries from this browser? Download the register first if you need it.`)) return;
        register = [];
        editing = null;
        saveRegister();
        saveDraft();
        renderRegister();
        refreshAddLabel();
        announce(registerStatus, 'The register is empty.');
        break;
      default:
        break;
    }
  });

  // ---- start ------------------------------------------------------------------------------
  buildForm();
  refreshResult();
  renderRegister();
  refreshAddLabel();
  if (saved && (Object.keys(drafts.system).length || Object.keys(drafts.agent).length)) {
    announce(status, 'Restored your draft from this browser.');
  }
  // A record passed in by kind (for tests and deep links): #kind=agent
  const hashKind = new URLSearchParams(window.location.hash.replace(/^#/, '')).get('kind');
  if (hashKind === 'agent' || hashKind === 'system') {
    const radio = app.querySelector(`[data-reg-kind][value="${hashKind}"]`);
    if (radio && !radio.checked) radio.click();
  }
}
