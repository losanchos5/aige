// impact-assessment.js: the client side of /toolkit/impact-assessment. Builds
// the form for the chosen instrument (FRIA, AIIA or DPIA addendum) from the
// page's JSON island, checks the record against impact-assessment.v1.json,
// shows the element coverage and the risk-to-measure matrix, and exports JSON,
// YAML and Markdown. The draft stays in this browser; only the instrument goes
// in the link. Nothing is sent anywhere.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  store,
  isoDate,
  slug,
  downloadJson,
  downloadText,
  downloadMarkdown,
  readJsonFile,
  h,
  announce,
  focusOn,
} from './lib.js';
import { toYaml } from './builders.js';
import { createForm, renderErrorSummary } from './schema-form.js';
import {
  SCHEMA_ID,
  TYPES,
  checkAssessment,
  elementCoverage,
  riskMatrix,
  linkageWarnings,
  assessmentMarkdown,
} from './impact-assessment-core.js';

const DRAFT_KEY = 'impact-assessment.draft';

const root = document.querySelector('[data-bld="impact"]');
const data = readToolData();
if (root && data) init(root, data);

function init(app, model) {
  mountTool(app);
  const { schema, sections, types, notice, page, patternTitles, reopenTriggers } = model;
  const $ = (sel) => app.querySelector(sel);
  const status = $('[data-bld-status]');
  const resultStatus = $('[data-bld-result-status]');
  const errorsBox = document.getElementById('ia-errors');
  const typeName = (id) => types.find((t) => t.id === id)?.label ?? id;

  const saved = store.get(DRAFT_KEY, null);
  const fromLink = readFragment().type;
  let type = TYPES.includes(fromLink) ? fromLink : saved && TYPES.includes(saved.type) ? saved.type : 'fria';

  const form = createForm({
    root: $('[data-bld-form]'),
    sections,
    schema,
    prefix: 'ia',
    presets: (_field, t) => reopenTriggers.filter((p) => p.for.includes(t)).map((p) => p.text),
    onChange: () => {
      save();
      refresh();
    },
  });

  function save() {
    store.set(DRAFT_KEY, { type, doc: form.doc, savedAt: new Date().toISOString() });
  }

  function current() {
    return checkAssessment(form.doc, type, sections, schema);
  }

  function refresh() {
    const { record, errors } = current();
    const validity = $('[data-bld-validity]');
    validity.textContent = errors.length
      ? `${typeName(type)}: not valid yet against impact-assessment.v1, ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}. Choose "Check the record" to see ${errors.length === 1 ? 'it' : 'them'}.`
      : `${typeName(type)}: valid against impact-assessment.v1.`;
    validity.setAttribute('data-valid', errors.length ? 'false' : 'true');

    const caption = $('[data-ia-elements-caption]');
    caption.textContent =
      type === 'fria'
        ? 'Art. 27(1) elements'
        : type === 'aiia'
          ? 'ISO/IEC 42005 elements (clause 6)'
          : 'Art. 35(7) minimum content';
    const coverage = elementCoverage(record, type, model);
    $('[data-ia-elements]').replaceChildren(
      ...coverage.map((row) =>
        h(
          'tr',
          {},
          h('th', { scope: 'row', class: 'num', text: row.ref }),
          h('td', { 'data-label': 'What it asks for', text: row.text }),
          h(
            'td',
            { 'data-label': 'In the record' },
            h('span', { class: 'bld-state', 'data-state': row.filled ? 'covered' : 'missing', text: row.filled ? 'Filled' : 'Not yet' }),
          ),
        ),
      ),
    );

    const matrix = riskMatrix(record);
    $('[data-ia-matrix]').replaceChildren(
      ...(matrix.rows.length
        ? matrix.rows.map((row) =>
            h(
              'tr',
              {},
              h('th', { scope: 'row', class: 'num', text: row.key }),
              h('td', { 'data-label': 'Right or interest', text: row.risk.right_or_interest ?? '' }),
              h('td', { 'data-label': 'Score', class: 'num', text: row.score === undefined ? '' : `${row.score} (${row.risk.likelihood} x ${row.risk.severity})` }),
              h(
                'td',
                { 'data-label': 'Measures' },
                row.measures.length
                  ? h(
                      'ul',
                      { class: 'bld-measures' },
                      ...row.measures.map((m) =>
                        h(
                          'li',
                          {},
                          m.measure,
                          m.pattern ? ' (' : '',
                          m.pattern ? h('a', { href: m.pattern, text: patternTitles[m.pattern] ?? 'pattern' }) : '',
                          m.pattern ? ')' : '',
                        ),
                      ),
                    )
                  : h('span', { class: 'bld-state', 'data-state': 'missing', text: 'No measure yet' }),
              ),
            ),
          )
        : [h('tr', {}, h('td', { colspan: '4', class: 'bld-empty', text: 'No risks recorded yet.' }))]),
    );
    const warnings = linkageWarnings(matrix);
    const warnBox = $('[data-ia-warnings]');
    warnBox.replaceChildren(...warnings.map((w) => h('li', { text: w })));
    warnBox.hidden = !warnings.length;

    const triggers = record.review_triggers ?? [];
    $('[data-ia-triggers]').replaceChildren(
      ...(triggers.length
        ? triggers.map((t) => h('li', { text: t }))
        : [h('li', { class: 'bld-empty', text: 'None yet: without a trigger the assessment is a snapshot.' })]),
      ...(record.next_review ? [h('li', { text: `Next scheduled review: ${record.next_review}.` })] : []),
    );
  }

  function setType(next, { announceIt = true } = {}) {
    type = TYPES.includes(next) ? next : 'fria';
    for (const radio of app.querySelectorAll('[data-ia-type]')) radio.checked = radio.value === type;
    writeFragment({ type });
    form.setType(type);
    renderErrorSummary(errorsBox, []);
    save();
    refresh();
    if (announceIt) announce(status, `${typeName(type)} form ready. Shared fields are kept.`);
  }

  for (const radio of app.querySelectorAll('[data-ia-type]')) {
    radio.addEventListener('change', () => {
      if (radio.checked) setType(radio.value);
    });
  }

  $('[data-bld-form-el]').addEventListener('submit', (event) => {
    event.preventDefault();
    const { errors } = current();
    const items = form.showErrors(errors);
    if (errors.length) {
      renderErrorSummary(errorsBox, items, `Fix ${errors.length} ${errors.length === 1 ? 'field' : 'fields'} before the record validates`);
      focusOn(errorsBox);
      return;
    }
    renderErrorSummary(errorsBox, []);
    announce(status, 'The record is valid against the impact-assessment schema.');
    focusOn(document.getElementById('ia-result-title'));
  });

  // ---- import ------------------------------------------------------------------------
  const importInput = $('[data-bld-import]');
  const importError = $('[data-bld-import-error]');
  function setImportError(message) {
    importError.textContent = message;
    importError.hidden = !message;
    if (message) {
      importInput.setAttribute('aria-invalid', 'true');
      importInput.setAttribute('aria-describedby', 'ia-import-hint ia-import-error');
    } else {
      importInput.removeAttribute('aria-invalid');
      importInput.setAttribute('aria-describedby', 'ia-import-hint');
    }
  }
  importInput.addEventListener('change', async () => {
    setImportError('');
    try {
      const record = await readJsonFile(importInput.files && importInput.files[0], { maxBytes: 1024 * 1024 });
      if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error('That file is not an assessment record.');
      if (record.$schema && record.$schema !== SCHEMA_ID) {
        throw new Error(`That record claims another schema (${record.$schema}).`);
      }
      if (!TYPES.includes(record.type)) throw new Error('That record has no known "type" (fria, aiia or dpia_addendum).');
      const { $schema: _s, type: t, ...doc } = record;
      form.render(doc, t);
      setType(t, { announceIt: false });
      const { errors } = current();
      announce(
        resultStatus,
        `Opened ${record.assessment_id || 'the assessment'} (${typeName(t)}). ${errors.length ? `${errors.length} problems to fix.` : 'It is valid.'}`,
      );
      importInput.value = '';
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'The file could not be read.');
    }
  });

  // ---- exports --------------------------------------------------------------------------
  app.addEventListener('click', (event) => {
    const button = /** @type {HTMLElement} */ (event.target).closest('[data-action]');
    if (!button) return;
    const action = button.getAttribute('data-action');
    const { record, errors } = current();
    const base = `impact-assessment-${slug(record.assessment_id || `${type}-${isoDate()}`) || type}`;
    const warn = errors.length ? ` It does not validate yet (${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}).` : '';
    switch (action) {
      case 'json':
        downloadJson(`${base}.json`, record);
        announce(resultStatus, `Downloaded as JSON.${warn}`);
        break;
      case 'yaml':
        downloadText(
          `${base}.yaml`,
          toYaml(record, {
            header: [
              `${typeName(type)}. ${notice}`,
              `Schema: ${SCHEMA_ID}`,
              `Generated on ${isoDate()} with ${page}`,
            ],
          }),
          'application/yaml;charset=utf-8',
        );
        announce(resultStatus, `Downloaded as YAML.${warn}`);
        break;
      case 'md':
        downloadMarkdown(
          `${base}.md`,
          assessmentMarkdown(record, type, model, { notice, page, date: isoDate(), errors, typeLabel: typeName(type), patternTitles }),
        );
        announce(resultStatus, 'Report downloaded as Markdown.');
        break;
      case 'print':
        window.print();
        break;
      case 'clear':
        if (!window.confirm('Clear the whole form? Download the record first if you need it.')) return;
        form.render({}, type);
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
  form.render(saved && saved.doc && typeof saved.doc === 'object' ? saved.doc : {}, type);
  setType(type, { announceIt: false });
  if (saved && saved.doc && Object.keys(saved.doc).length) announce(status, 'Restored your draft from this browser.');
}
