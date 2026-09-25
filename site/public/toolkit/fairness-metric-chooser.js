// fairness-metric-chooser.js: the client side of /toolkit/fairness-metric-chooser.
// It walks the questions chapter 16 says decide the fairness metric (the harm
// type, whether a trustworthy ground-truth label exists, which error costs
// more, the legal frame and access to the protected attribute) and returns the
// metric families to use now and later, the secondary checks, and the chapter's
// warnings and legal notes, each linked to its section. Exports: Markdown, a
// JSON record of the choice, the link. Nothing is sent anywhere.
//
// `choose` is pure and exported for the tests.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  downloadJson,
  downloadMarkdown,
  copyText,
  readJsonFile,
  slug,
  isoDate,
  h,
  announce,
  focusOn,
} from './lib.js';
import {
  readForm,
  applyForm,
  pickParams,
  setFieldError,
  clearFieldErrors,
  showErrorSummary,
  cleanText,
} from './form-kit.js';

export const KIND = 'aige.fairness-metric-choice';
export const VERSION = 1;
export const PARAM_KEYS = ['v', 'uc', 'harm', 'truth', 'error', 'frame', 'attribute'];

const ERROR_PRIMARY = {
  miss: { ids: ['equal-opportunity'], why: 'Missing a qualified or eligible person is the costliest error' },
  wrongful: { ids: ['fpr-parity'], why: 'A wrongful selection, flag, cut or reclaim is the costliest error' },
  both: { ids: ['equalised-odds'], why: 'Both errors are costly' },
  action: { ids: ['predictive-parity'], why: 'A positive decision triggers an action whose value depends on being right' },
  score: { ids: ['calibration'], why: 'The score is consumed as a probability' },
};
const ERROR_SECONDARY = {
  miss: ['intersectional-air', 'proxy-scan'],
  wrongful: ['appeal-outcomes'],
  both: ['error-rate-gaps'],
  action: ['error-rate-gaps'],
  score: ['error-rate-gaps'],
};
const FRAME_ROW = { 'us-employment': 'cv', credit: 'credit', benefits: 'benefits', clinical: 'clinical' };
/** Families computed against a ground-truth label. */
const NEEDS_LABEL = new Set([
  'equal-opportunity',
  'equalised-odds',
  'fpr-parity',
  'predictive-parity',
  'calibration',
  'worst-group-error',
]);

/** The choice for one set of answers. */
export function choose(model, params) {
  const primary = [];
  const secondary = [];
  const notes = [];
  const family = (id) => model.families.find((f) => f.id === id);
  // A label-based family waits for a trustworthy label; the others run now.
  const labelStage =
    params.truth === 'labels'
      ? 'now'
      : params.truth === 'proxy'
        ? 'after-label-review'
        : params.harm === 'allocation'
          ? 'once-outcomes-arrive'
          : 'after-eval-set';
  const addPrimary = (id, why) => {
    const stage = NEEDS_LABEL.has(id) ? labelStage : 'now';
    const existing = primary.find((p) => p.id === id);
    if (existing) {
      if (!existing.why.includes(why)) existing.why.push(why);
      return;
    }
    const f = family(id);
    if (!f) throw new Error(`fairness-metric-chooser: unknown metric family ${id}`);
    const index = secondary.findIndex((s) => s.id === id);
    if (index >= 0) secondary.splice(index, 1);
    primary.push({ ...f, why: [why], stage });
  };
  const addSecondary = (id) => {
    if (primary.some((p) => p.id === id) || secondary.some((s) => s.id === id)) return;
    const check = model.secondary[id];
    if (check) secondary.push({ id, ...check });
    else if (family(id)) secondary.push({ id, name: family(id).name, anchor: family(id).anchor });
    else throw new Error(`fairness-metric-chooser: unknown check ${id}`);
  };
  const note = (id) => {
    if (!model.notes[id]) throw new Error(`fairness-metric-chooser: unknown note ${id}`);
    if (!notes.includes(id)) notes.push(id);
  };

  const { harm, truth, error, frame, attribute } = params;

  if (harm === 'allocation') {
    const byError = ERROR_PRIMARY[error];
    if (truth === 'labels') {
      byError.ids.forEach((id) => addPrimary(id, byError.why));
      ERROR_SECONDARY[error].forEach(addSecondary);
      addSecondary('demographic-parity');
    } else if (truth === 'proxy') {
      note('label-first');
      addPrimary('demographic-parity', 'It needs no outcome label, so it holds while the label is reviewed');
      byError.ids.forEach((id) => addPrimary(id, `${byError.why}; compute it once the label review confirms the label measures the construct`));
      addSecondary('label-validity');
      ERROR_SECONDARY[error].forEach(addSecondary);
    } else {
      note('no-labels');
      addPrimary('demographic-parity', 'It needs no outcome label');
      addSecondary('counterfactual-flip');
      addSecondary('selection-rates-monitor');
      byError.ids.forEach((id) => addPrimary(id, `${byError.why}; add it once outcomes arrive, with the label delay stated`));
    }
    note('impossibility');
  } else if (harm === 'quality') {
    addPrimary('worst-group-error', 'The harm is that the system works less well for some people');
    addSecondary('intersectional-error');
    if (truth === 'none') note('eval-set');
    if (truth === 'proxy') note('label-first');
  } else if (harm === 'generative') {
    addPrimary('counterfactual-flip', 'Group labels for generated outputs rarely exist, while paired prompts are easy to generate');
    addPrimary('quality-floor', 'Degraded or demeaning output for a group is the costliest error');
    addSecondary('stereotype-probes');
    addSecondary('refusal-gaps');
  }

  // The legal frame's own requirements, as the chapter's use-case table names them.
  if (frame === 'us-employment') {
    addPrimary('demographic-parity', 'US employment: the selection-rate AIR is the number the Uniform Guidelines and NYC Local Law 144 audits use');
    addSecondary('intersectional-air');
    note('four-fifths');
    note('us-employment');
  } else if (frame === 'credit') {
    addPrimary('calibration', 'Credit: the chapter pairs calibration within groups with the approval-rate AIR');
    addPrimary('demographic-parity', 'Credit: approval-rate AIR');
    addSecondary('error-rate-gaps');
    addSecondary('reason-codes');
    note('credit');
  } else if (frame === 'benefits') {
    addPrimary('fpr-parity', 'Benefits: wrongly cutting or reclaiming a benefit is the costliest error');
    addSecondary('predictive-parity');
    addSecondary('appeal-outcomes');
    note('benefits');
  } else if (frame === 'clinical') {
    addPrimary('equal-opportunity', 'Clinical triage: missing a person in need is the costliest error');
    addPrimary('calibration', 'Clinical triage: risk scores are read as probabilities');
    addSecondary('label-validity');
    note('clinical');
  } else if (frame === 'eu-high-risk') {
    note('eu');
  } else if (frame === 'unsure') {
    note('unsure');
  }
  if (primary.some((p) => p.id === 'demographic-parity') || secondary.some((s) => s.id === 'demographic-parity')) {
    note('four-fifths');
  }

  if (attribute === 'restricted') note('attribute-restricted');
  if (attribute === 'unavailable') note('attribute-unavailable');
  note('small-groups');
  note('report-both');
  note('record-first');
  note('mitigation-order');

  const rowId = FRAME_ROW[frame] ?? (harm === 'quality' ? 'quality' : harm === 'generative' ? 'generative' : null);
  const row = model.rows.find((r) => r.id === rowId) ?? null;
  return { primary, secondary, notes: notes.map((id) => ({ id, ...model.notes[id] })), row };
}

/** What is missing, as { field, message }. */
export function missing(params) {
  const out = [];
  if (!params.harm) out.push({ field: 'fmc-harm', message: 'Say what the system does to people.' });
  if (!params.truth) out.push({ field: 'fmc-truth', message: 'Say whether a trustworthy label exists.' });
  if (params.harm === 'allocation' && !params.error) out.push({ field: 'fmc-error', message: 'Say which error costs more.' });
  if (!params.frame) out.push({ field: 'fmc-frame', message: 'Choose the legal frame, or "Not sure yet".' });
  if (!params.attribute) out.push({ field: 'fmc-attribute', message: 'Say whether you can use the protected attribute.' });
  return out;
}

const STAGE = {
  now: 'Now',
  'after-label-review': 'After the label review',
  'once-outcomes-arrive': 'Once outcomes arrive',
  'after-eval-set': 'Once a labelled evaluation set exists',
};

/** The JSON record of the choice. */
export function buildChoice(model, params, result, { now = new Date() } = {}) {
  const label = (question, value) =>
    model.questions.find((q) => q.id === question)?.options.find((o) => o.id === value)?.label ?? null;
  const url = (anchor) => `${model.chapter}#${model.anchors[anchor]}`;
  return {
    kind: KIND,
    version: VERSION,
    generated_on: now.toISOString().slice(0, 10),
    tool: model.page,
    chapter: model.chapter,
    notice: model.notice,
    use_case: cleanText(params.uc, 120) || null,
    answers: Object.fromEntries(
      ['harm', 'truth', 'error', 'frame', 'attribute'].map((q) => [q, params[q] ? { id: params[q], label: label(q, params[q]) } : null]),
    ),
    primary: result.primary.map((p) => ({
      metric: p.id,
      name: p.name,
      stage: p.stage,
      why: p.why,
      holds_when: p.holds,
      watch_for: p.watch,
      section: url(p.anchor),
    })),
    secondary: result.secondary.map((s) => ({ check: s.id, name: s.name, section: url(s.anchor) })),
    notes: result.notes.map((n) => ({ note: n.id, title: n.title, text: n.text, section: url(n.anchor) })),
    nearest_use_case_row: result.row,
    policy_card_fields: {
      chosen_metric: result.primary[0]?.id ?? null,
      reason: '',
      threshold: '',
      minimum_cell_size: '',
      approver: '',
      decided_on: '',
    },
    inputs: pickParams(params, PARAM_KEYS),
  };
}

// ---- The page ----------------------------------------------------------------------

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-tool-app="fairness-metric-chooser"]');
  const data = readToolData();
  if (root && data) init(root, data);
}

function init(app, model) {
  mountTool(app);
  const form = app.querySelector('[data-fmc-form]');
  const summary = app.querySelector('[data-fmc-errors]');
  const result = app.querySelector('[data-fmc-result]');
  const status = app.querySelector('[data-fmc-status]');
  const errorGroup = form.querySelector('#fmc-error');
  const importInput = app.querySelector('[data-fmc-import]');
  let shown = false;

  const params = () => ({ v: String(VERSION), ...readForm(form) });
  const link = (anchor, text) => h('a', { href: `${model.chapterPath}#${model.anchors[anchor]}` }, text);

  /** The costlier-error question only applies to allocation harms. */
  function syncErrorGroup() {
    const allocation = form.querySelector('input[name="harm"]:checked')?.value === 'allocation';
    errorGroup.hidden = !allocation;
    errorGroup.disabled = !allocation;
  }

  function validate(p) {
    clearFieldErrors(form);
    const errors = missing(p);
    for (const error of errors) setFieldError(form.querySelector(`#${error.field}`), error.message);
    showErrorSummary(summary, errors, { focusOn });
    return errors.length === 0;
  }

  function render(p) {
    const res = choose(model, p);
    const title = cleanText(p.uc, 120);
    result.querySelector('[data-fmc-summary]').replaceChildren(
      h(
        'p',
        { class: 'tk-lede' },
        title ? `${title}: ` : '',
        'measure ',
        h('strong', {}, res.primary.filter((m) => m.stage === 'now').map((m) => m.name).join(' and ') || 'the metrics below'),
        res.primary.some((m) => m.stage !== 'now') ? ', and plan the later metrics below.' : '.',
      ),
      res.row
        ? h(
            'p',
            { class: 'tool-hint' },
            `Nearest row of the chapter's use-case table: ${res.row.useCase} (primary: ${res.row.primary}; secondary: ${res.row.secondary}; legal frame: ${res.row.legal}). The table is a starting point, not a rule.`,
          )
        : null,
    );
    result.querySelector('[data-fmc-primary]').replaceChildren(
      ...res.primary.map((m) =>
        h(
          'li',
          { class: 'tk-card', 'data-metric': m.id },
          h('h4', {}, `${m.name} (${STAGE[m.stage].toLowerCase()})`),
          h('p', {}, `Holds when: ${m.holds}`),
          h('p', { class: 'tool-hint' }, `Why here: ${m.why.join('; ')}.`),
          h('p', { class: 'tool-hint' }, `Watch for: ${m.watch}`),
          h('p', { class: 'tk-refs' }, 'Chapter 16: ', link(m.anchor, model.anchorTitles[m.anchor] ?? m.anchor)),
        ),
      ),
    );
    result.querySelector('[data-fmc-secondary]').replaceChildren(
      ...res.secondary.map((s) => h('li', { 'data-check': s.id }, link(s.anchor, s.name))),
    );
    result.querySelector('[data-fmc-notes]').replaceChildren(
      ...res.notes.map((n) =>
        h('li', { class: 'tk-card', 'data-note': n.id }, h('h4', {}, n.title), h('p', {}, n.text), h('p', { class: 'tk-refs' }, 'Chapter 16: ', link(n.anchor, model.anchorTitles[n.anchor] ?? n.anchor))),
      ),
    );
    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
    return res;
  }

  const sync = () => writeFragment(params());

  function markdown(p, res) {
    const url = (anchor) => `${model.chapter}#${model.anchors[anchor]}`;
    const title = cleanText(p.uc, 120);
    const lines = [
      `# Fairness metric choice${title ? `: ${title}` : ''}`,
      '',
      `> ${model.notice}`,
      '',
      `Chosen on ${isoDate()} with the fairness metric chooser (${model.page}), from chapter 16 (${model.chapter}). Record this choice in the Policy Card before the eval runs.`,
      '',
      '## Answers',
      '',
      ...model.questions
        .filter((q) => p[q.id])
        .map((q) => `- ${q.legend} ${q.options.find((o) => o.id === p[q.id])?.label ?? p[q.id]}.`),
      '',
      '## Primary metrics',
      '',
      ...res.primary.flatMap((m) => [
        `- **${m.name}** (${STAGE[m.stage].toLowerCase()}). Holds when: ${m.holds}`,
        `  - Why here: ${m.why.join('; ')}. Watch for: ${m.watch} (${url(m.anchor)})`,
      ]),
      '',
      '## Secondary checks',
      '',
      ...res.secondary.map((s) => `- ${s.name} (${url(s.anchor)})`),
      '',
      '## Notes from the chapter',
      '',
      ...res.notes.flatMap((n) => [`- **${n.title}.** ${n.text} (${url(n.anchor)})`]),
      '',
    ];
    if (res.row) {
      lines.push(
        `Nearest use-case row: ${res.row.useCase}. Primary: ${res.row.primary}. Secondary: ${res.row.secondary}. Legal frame: ${res.row.legal}.`,
        '',
      );
    }
    lines.push(
      '## For the Policy Card',
      '',
      '- Chosen metric and reason:',
      '- Threshold (on the confidence interval, not the point):',
      '- Minimum cell size:',
      '- Approver, and who represented the affected people:',
      '- Decided on (before the results):',
      '',
      '---',
      '',
      `Link: ${shareUrl(p)}`,
      '',
      `Not legal advice: the law decides which disparity is unlawful. ${model.license}, attribution: Jorge García Aibar.`,
    );
    return `${lines.join('\n')}\n`;
  }

  const fileBase = (p) => `fairness-metric-choice-${slug(p.uc) || isoDate()}`;

  async function run(action) {
    const p = params();
    if (!validate(p)) return;
    const res = render(p);
    sync();
    try {
      if (action === 'copy') {
        const ok = await copyText(shareUrl(p));
        announce(status, ok ? 'Link copied. The answers travel after the #, which the browser does not send.' : 'Copy failed: copy the address bar instead.');
      } else if (action === 'md') {
        downloadMarkdown(`${fileBase(p)}.md`, markdown(p, res));
        announce(status, 'Choice downloaded as Markdown.');
      } else if (action === 'json') {
        downloadJson(`${fileBase(p)}.json`, buildChoice(model, p, res));
        announce(status, 'Choice downloaded as JSON.');
      } else if (action === 'print') {
        window.print();
      }
    } catch (error) {
      announce(status, `That did not work: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    syncErrorGroup();
    const p = params();
    if (!validate(p)) return;
    const res = render(p);
    sync();
    focusOn(result.querySelector('h2'));
    announce(status, `${res.primary.length} primary metric${res.primary.length === 1 ? '' : 's'}, ${res.secondary.length} checks, ${res.notes.length} notes.`);
  });

  form.addEventListener('change', () => {
    syncErrorGroup();
    const p = params();
    if (shown && missing(p).length === 0) {
      render(p);
      sync();
    }
  });

  form.querySelector('[data-fmc-reset]')?.addEventListener('click', () => {
    applyForm(form, {});
    syncErrorGroup();
    clearFieldErrors(form);
    showErrorSummary(summary, []);
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    writeFragment({});
    form.querySelector('input[name="harm"]')?.focus();
  });

  app.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button && app.contains(button)) run(button.getAttribute('data-action'));
  });

  importInput?.addEventListener('change', async () => {
    const error = app.querySelector('[data-fmc-import-error]');
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      const json = await readJsonFile(file);
      if (json?.kind !== KIND) throw new Error(`That file is not a fairness metric choice (its "kind" should be "${KIND}").`);
      if (json.version !== VERSION) throw new Error(`That choice is version ${json.version}; this tool reads version ${VERSION}.`);
      const p = pickParams(json.inputs, PARAM_KEYS);
      applyForm(form, p);
      syncErrorGroup();
      if (missing(params()).length) throw new Error('The answers in that file are incomplete.');
      render(params());
      sync();
      error.hidden = true;
      announce(status, 'Answers restored from the file; the choice is recomputed.');
      focusOn(result.querySelector('h2'));
    } catch (problem) {
      error.textContent = problem instanceof Error ? problem.message : 'That file could not be read.';
      error.hidden = false;
      importInput.focus();
    } finally {
      importInput.value = '';
    }
  });

  function applyFragment(focus) {
    const state = pickParams(readFragment(), PARAM_KEYS);
    if (!state.harm) return;
    applyForm(form, state);
    syncErrorGroup();
    const p = params();
    if (missing(p).length) return;
    const res = render(p);
    if (focus) focusOn(result.querySelector('h2'));
    announce(status, `Loaded from the link: ${res.primary.map((m) => m.name).join(', ')}.`);
  }

  window.addEventListener('hashchange', () => applyFragment(true));
  syncErrorGroup();
  applyFragment(false);
}
