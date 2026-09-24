// policy-card.js: the client side of /toolkit/policy-card. Reads the rule
// templates, the obligation register and the policy card schema from the page's
// JSON island, turns the form into the reader's values, checks them, and renders
// the generated files (policy-card-core.js builds them): the Policy Card as
// Markdown, YAML and JSON, the Rego module and its tests, the Cedar stub and its
// tests, the example input and the CI hook. It also keeps the state in the link
// and handles copying, downloads and printing. All of it runs in this page;
// nothing is sent anywhere.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  isoDate,
  slug,
  downloadText,
  downloadMarkdown,
  copyText,
  h,
  announce,
  focusOn,
} from './lib.js';
import {
  defaultValues,
  checkValues,
  buildArtefacts,
  validateSchema,
  valuesToState,
  stateToValues,
  REVIEW_NOTE,
  LEGAL_NOTE,
  SCHEMA_ID,
} from './policy-card-core.js';

const GROUPS = [
  { id: 'people', title: 'For people' },
  { id: 'machines', title: 'For machines' },
  { id: 'engine', title: 'For the policy engine' },
  { id: 'pipeline', title: 'For the pipeline' },
];

// The card fields that follow the chosen rule; switching rules resets them.
const RULE_FIELDS = ['cardId', 'title', 'ruleId', 'appliesTo', 'sourcePolicy'];
const TEXT_FIELDS = [
  'cardId',
  'version',
  'title',
  'owner',
  'approver',
  'appliesTo',
  'sourcePolicy',
  'effectiveFrom',
  'reviewBy',
  'exceptions',
  'ruleId',
  'otherRefs',
];
// Fields of the custom rule only; the curated rules fix them.
const CUSTOM_FIELDS = ['statement', 'failureMode'];

function init(app, model) {
  mountTool(app);
  const form = app.querySelector('[data-pc-form]');
  form.setAttribute('data-pc-js', '');
  const errors = form.querySelector('[data-pc-errors]');
  const errorsList = form.querySelector('[data-pc-errors-list]');
  const result = app.querySelector('[data-pc-result]');
  const status = app.querySelector('[data-pc-status]');
  const filesBox = app.querySelector('[data-pc-files]');
  const templates = model.templates;
  const obligationIds = model.obligations.map((row) => row.id);
  const obligationCtx = Object.fromEntries(
    model.obligations.map((row) => [row.id, { obligation: row.obligation, status: row.status }]),
  );
  const byId = (id) => form.querySelector(`#${CSS.escape(id)}`);
  const today = () => isoDate();

  let last = null; // { raw, template, built }

  // ---- Reading and writing the form ---------------------------------------------------

  function selectedTemplate() {
    const checked = form.querySelector('input[name="template"]:checked');
    return templates.find((t) => t.id === checked?.value) ?? templates[0];
  }

  function readRaw() {
    const template = selectedTemplate();
    const params = {};
    for (const param of template.params) {
      params[param.key] = byId(`pc-${template.id}-${param.key}`)?.value ?? '';
    }
    const raw = { template: template.id, params };
    for (const field of [...TEXT_FIELDS, ...CUSTOM_FIELDS]) raw[field] = byId(`pc-${field}`)?.value ?? '';
    raw.effect = form.querySelector('input[name="effect"]:checked')?.value ?? '';
    raw.enforcement = [...form.querySelectorAll('input[name="enforcement"]:checked')].map(
      (el) => el.value,
    );
    raw.obligations = [...form.querySelectorAll('input[name="obligation"]:checked')].map(
      (el) => el.value,
    );
    return raw;
  }

  function writeRaw(raw, { only } = {}) {
    const template = templates.find((t) => t.id === raw.template) ?? templates[0];
    const radio = byId(`pc-template-${template.id}`);
    if (radio) radio.checked = true;
    showParams(template.id);
    const fields = only ?? TEXT_FIELDS;
    for (const field of fields) {
      const el = byId(`pc-${field}`);
      if (el && typeof raw[field] === 'string') el.value = raw[field];
    }
    if (!only) {
      for (const [key, value] of Object.entries(raw.params ?? {})) {
        const el = byId(`pc-${template.id}-${key}`);
        if (el) el.value = value;
      }
      if (template.id === 'custom') {
        for (const field of CUSTOM_FIELDS) {
          const el = byId(`pc-${field}`);
          if (el && typeof raw[field] === 'string') el.value = raw[field];
        }
        for (const el of form.querySelectorAll('input[name="effect"]')) {
          el.checked = el.value === raw.effect;
        }
        for (const el of form.querySelectorAll('input[name="enforcement"]')) {
          el.checked = (raw.enforcement ?? []).includes(el.value);
        }
      }
    }
    for (const el of form.querySelectorAll('input[name="obligation"]')) {
      el.checked = (raw.obligations ?? []).includes(el.value);
    }
    updateGroups({ openTicked: true });
  }

  function showParams(templateId) {
    for (const group of form.querySelectorAll('[data-pc-params]')) {
      group.hidden = group.getAttribute('data-pc-params') !== templateId;
    }
  }

  function updateGroups({ openTicked }) {
    for (const group of form.querySelectorAll('[data-pc-group]')) {
      const ticked = group.querySelectorAll('input[name="obligation"]:checked').length;
      const count = group.querySelector('[data-pc-count]');
      if (count) count.textContent = ticked ? `(${ticked} ticked)` : '';
      if (openTicked && ticked) group.open = true;
    }
  }

  function applyTemplateDefaults(template, { full }) {
    const raw = defaultValues(template, { today: today() });
    if (full) {
      writeRaw(raw);
    } else {
      writeRaw(raw, { only: RULE_FIELDS });
    }
  }

  // ---- Errors ---------------------------------------------------------------------------

  function controlFor(field) {
    const template = selectedTemplate();
    if (field.startsWith('param-')) return byId(`pc-${template.id}-${field.slice(6)}`);
    if (field === 'effect') return form.querySelector('input[name="effect"]');
    if (field === 'enforcement') return form.querySelector('input[name="enforcement"]');
    if (field === 'obligations') return form.querySelector('input[name="obligation"]');
    return byId(`pc-${field}`);
  }

  function clearErrors() {
    for (const el of form.querySelectorAll('[data-pc-error]')) el.remove();
    for (const el of form.querySelectorAll('[aria-invalid]')) {
      el.removeAttribute('aria-invalid');
      const hint = el.getAttribute('data-pc-hint');
      if (hint !== null) {
        if (hint) el.setAttribute('aria-describedby', hint);
        else el.removeAttribute('aria-describedby');
        el.removeAttribute('data-pc-hint');
      }
    }
    for (const el of form.querySelectorAll('fieldset[data-invalid]')) el.removeAttribute('data-invalid');
    errors.hidden = true;
  }

  function showErrors(list) {
    clearErrors();
    const items = list.map((error, i) => {
      const control = controlFor(error.field);
      if (control) {
        const errorId = `pc-err-${i}`;
        const message = h('p', { class: 'tool-error', id: errorId, 'data-pc-error': '', text: error.message });
        const group = control.closest('.tool-field') ?? control.closest('fieldset');
        if (control.closest('details')) control.closest('details').open = true;
        if (group) {
          const anchor = group.matches('fieldset') ? group.querySelector('legend')?.nextSibling : control;
          if (group.matches('fieldset')) group.setAttribute('data-invalid', '');
          if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(message, anchor);
          else group.prepend(message);
        }
        control.setAttribute('aria-invalid', 'true');
        if (!control.hasAttribute('data-pc-hint')) {
          control.setAttribute('data-pc-hint', control.getAttribute('aria-describedby') ?? '');
        }
        const hint = control.getAttribute('data-pc-hint');
        control.setAttribute('aria-describedby', hint ? `${errorId} ${hint}` : errorId);
      }
      const link = h('a', { href: control?.id ? `#${control.id}` : '#pc-form' }, error.message);
      link.addEventListener('click', (event) => {
        event.preventDefault();
        control?.focus();
      });
      return h('li', {}, link);
    });
    errorsList.replaceChildren(...items);
    errors.hidden = false;
    focusOn(errors);
  }

  // ---- Result -----------------------------------------------------------------------------

  function build(raw, { focus, announceText }) {
    const template = templates.find((t) => t.id === raw.template) ?? templates[0];
    const checked = checkValues(template, raw, { obligationIds });
    if (!checked.ok) {
      result.hidden = true;
      showErrors(checked.errors);
      return false;
    }
    clearErrors();
    const built = buildArtefacts(template, checked.values, {
      obligations: obligationCtx,
      patternTitle: model.patterns?.[template.pattern],
    });
    last = { raw, template, built, values: checked.values };
    renderResult(built, checked.values, template);
    writeFragment(valuesToState(raw));
    result.hidden = false;
    if (focus) focusOn(result.querySelector('h2'));
    announce(status, announceText ?? `Policy Card built: ${built.files.length} files below.`);
    return true;
  }

  function renderResult(built, values, template) {
    const summary = result.querySelector('[data-pc-summary]');
    summary.textContent = `${values.title}: rule ${values.ruleId} (effect ${values.effect}), enforced at ${values.enforcement.join(', ')}. From the template "${template.title}". ${built.files.length} files, in the paths they name.`;
    const valid = result.querySelector('[data-pc-valid]');
    const problems = model.schema ? validateSchema(model.schema, built.card) : ['schema not loaded'];
    if (problems.length) {
      valid.setAttribute('data-invalid', '');
      valid.textContent = `The card does not validate against policy-card.v1.json: ${problems.join('; ')}.`;
    } else {
      valid.removeAttribute('data-invalid');
      valid.textContent = `The card validates against ${SCHEMA_ID.replace(/^https:\/\//, '')} (checked in this browser).`;
    }
    const sections = GROUPS.map((group) => {
      const files = built.files.filter((file) => file.group === group.id);
      if (!files.length) return null;
      return h(
        'section',
        { class: 'pc-file-group', 'aria-labelledby': `pc-fg-${group.id}` },
        h('h3', { id: `pc-fg-${group.id}`, text: group.title }),
        ...files.map((file) => fileBlock(file)),
      );
    }).filter(Boolean);
    filesBox.replaceChildren(...sections);
  }

  function fileBlock(file) {
    const code = h('pre', {
      class: 'pc-code',
      tabindex: '0',
      role: 'region',
      'aria-label': `${file.label}, ${file.path}`,
      'data-pc-code': file.id,
    });
    code.append(h('code', { text: file.text }));
    return h(
      'div',
      { class: 'pc-file', 'data-pc-file': file.id },
      h(
        'div',
        { class: 'pc-file-head' },
        h(
          'div',
          { class: 'pc-file-name' },
          h('span', { class: 'pc-file-label', text: file.label }),
          h('span', { class: 'pc-file-path', text: file.path }),
        ),
        h(
          'div',
          { class: 'pc-file-actions', 'data-print-hide': '' },
          h('button', { type: 'button', class: 'btn btn-secondary', 'data-action': 'copy-file', 'data-file': file.id, 'aria-label': `Copy ${file.label}` }, 'Copy'),
          h('button', { type: 'button', class: 'btn btn-secondary', 'data-action': 'download-file', 'data-file': file.id, 'aria-label': `Download ${file.name}` }, 'Download'),
        ),
      ),
      code,
    );
  }

  function fence(text) {
    const runs = text.match(/`+/g) ?? [];
    const longest = runs.reduce((max, run) => Math.max(max, run.length), 0);
    return '`'.repeat(Math.max(3, longest + 1));
  }

  function bundleMarkdown(built, values) {
    const lines = [
      `# Policy Card bundle: ${values.title}`,
      '',
      `> ${REVIEW_NOTE} ${LEGAL_NOTE}`,
      `> Generated with the Policy Card builder, ${model.page}. Each file below goes at the path in`,
      '> its heading.',
      '',
    ];
    for (const file of built.files) {
      const mark = fence(file.text);
      lines.push(`## ${file.path}`, '', `${mark}${file.lang}`, file.text.replace(/\n$/, ''), mark, '');
    }
    return lines.join('\n');
  }

  async function runAction(button) {
    if (!last) return;
    const action = button.getAttribute('data-action');
    const { built, values } = last;
    if (action === 'copy-link') {
      const ok = await copyText(shareUrl(valuesToState(last.raw)));
      announce(status, ok ? 'Link copied. It holds your values; nothing is stored anywhere else.' : 'Copy failed: copy the address bar instead.');
    } else if (action === 'bundle') {
      downloadMarkdown(`${slug(values.cardId) || 'policy-card'}.bundle.md`, bundleMarkdown(built, values));
      announce(status, 'All files downloaded as one Markdown file.');
    } else if (action === 'print') {
      window.print();
    } else if (action === 'copy-file' || action === 'download-file') {
      const file = built.files.find((entry) => entry.id === button.getAttribute('data-file'));
      if (!file) return;
      if (action === 'copy-file') {
        const ok = await copyText(file.text);
        announce(status, ok ? `${file.label} copied.` : 'Copy failed: select the text and copy it instead.');
      } else {
        downloadText(file.name, file.text, `${file.mime};charset=utf-8`);
        announce(status, `${file.name} downloaded.`);
      }
    }
  }

  // ---- Link state -----------------------------------------------------------------------------

  function applyFragment({ focus }) {
    const raw = stateToValues(readFragment(), templates, { today: today() });
    if (!raw) return false;
    writeRaw(raw);
    build(raw, { focus, announceText: 'Policy Card rebuilt from the link.' });
    return true;
  }

  // ---- Events ---------------------------------------------------------------------------------

  form.addEventListener('change', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.name === 'template') {
      const template = selectedTemplate();
      showParams(template.id);
      applyTemplateDefaults(template, { full: false });
      clearErrors();
      announce(status, `Rule "${template.title}" chosen; its card defaults are filled in.`);
    } else if (target.name === 'obligation') {
      updateGroups({ openTicked: false });
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    build(readRaw(), { focus: true });
  });

  form.querySelector('[data-pc-reset]')?.addEventListener('click', () => {
    const template = selectedTemplate();
    applyTemplateDefaults(template, { full: true });
    clearErrors();
    announce(status, `Every field is back to the defaults of "${template.title}".`);
  });

  result.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button) runAction(button);
  });

  window.addEventListener('hashchange', () => applyFragment({ focus: true }));

  // First paint: the link's state if it carries one, else the first rule's defaults
  // with today's date.
  if (!applyFragment({ focus: false })) {
    applyTemplateDefaults(selectedTemplate(), { full: true });
  }
}

// Started last, so every module-level constant above is initialised first.
const root = document.querySelector('[data-tool-app="policy-card"]');
const data = readToolData();

if (root && data) init(root, data);
