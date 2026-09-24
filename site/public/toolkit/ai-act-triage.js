// ai-act-triage.js: the client side of /toolkit/ai-act-triage. Reads the
// versioned question graph (built from chapter 18) from the page's JSON island,
// shows only the questions the graph asks, and hands the answers to the pure
// engine (ai-act-triage-engine.js) for the indicative outcome. It renders the
// scope, roles, classes, open points and the reason behind each answer; keeps
// the state in the link; exports the classification decision record as JSON,
// YAML and a Markdown report; re-opens a record; and links the obligations
// planner. All of it runs in this page; nothing is sent.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  isoDate,
  slug,
  downloadJson,
  downloadText,
  downloadMarkdown,
  copyText,
  readJsonFile,
  encodeFragment,
  h,
  announce,
  focusOn,
} from './lib.js';
import {
  evaluate,
  resolveAnswers,
  cleanMeta,
  buildRecord,
  toYaml,
  recordMarkdown,
  stateToParams,
  paramsToState,
  plannerParams,
  recordToState,
  summarise,
  scopeWords,
} from './ai-act-triage-engine.js';

const root = document.querySelector('[data-tool-app="ai-act-triage"]');
const data = readToolData();

if (root && data) init(root, data);

function init(app, model) {
  mountTool(app);

  const form = app.querySelector('[data-tri-form]');
  const errors = form.querySelector('[data-tri-errors]');
  const errorsList = form.querySelector('[data-tri-errors-list]');
  const result = app.querySelector('[data-tri-result]');
  const status = app.querySelector('[data-tri-status]');
  const importBox = app.querySelector('[data-tri-import-box]');
  const field = (name) => form.querySelector(`[data-tri-field="${name}"]`);
  const questionById = new Map(model.questions.map((q) => [q.id, q]));

  let shown = false; // a result has been rendered at least once
  let triggersTouched = false; // the reader changed the re-review triggers
  let versionWarning = ''; // a link or record made with another question set

  // ---- Reading and writing the form ---------------------------------------------------

  function readRaw() {
    const raw = {};
    for (const question of model.questions) {
      const checked = [...form.querySelectorAll(`input[name="q-${question.id}"]:checked`)];
      if (checked.length) raw[question.id] = checked.map((input) => input.value);
    }
    return raw;
  }

  function readMeta() {
    return cleanMeta(model, {
      name: field('name').value,
      registryId: field('registry-id').value,
      purpose: field('purpose').value,
      reviewer: field('reviewer').value,
      decidedAt: field('decided-at').value,
      legalReview: field('legal-review').value,
      triggers: [...form.querySelectorAll('input[name="trigger"]:checked')].map((i) => i.value),
      reviewBy: field('review-by').value,
      note: field('note').value,
    });
  }

  function setAnswers(answers) {
    for (const question of model.questions) {
      const values = answers[question.id] ?? [];
      for (const input of form.querySelectorAll(`input[name="q-${question.id}"]`)) {
        input.checked = values.includes(input.value);
      }
    }
  }

  function setMeta(meta) {
    field('name').value = meta.name ?? '';
    field('registry-id').value = meta.registryId ?? '';
    field('purpose').value = meta.purpose ?? '';
    field('reviewer').value = meta.reviewer ?? '';
    field('decided-at').value = meta.decidedAt || isoDate();
    field('legal-review').value = meta.legalReview || 'pending';
    field('review-by').value = meta.reviewBy ?? '';
    field('note').value = meta.note ?? '';
    if (meta.triggersGiven) {
      setTriggers(meta.triggers ?? []);
      triggersTouched = true;
    }
  }

  function setTriggers(ids) {
    for (const input of form.querySelectorAll('input[name="trigger"]')) {
      input.checked = ids.includes(input.value);
    }
  }

  // ---- The graph: which questions are asked ------------------------------------------------

  function applyVisibility() {
    const { visible } = resolveAnswers(model, readRaw());
    const shownIds = new Set(visible);
    for (const question of model.questions) {
      const fieldset = form.querySelector(`[data-tri-q="${question.id}"]`);
      const on = shownIds.has(question.id);
      fieldset.hidden = !on;
      for (const input of fieldset.querySelectorAll('input')) input.disabled = !on;
      if (!on) setQuestionError(question.id, false);
    }
    for (const step of form.querySelectorAll('[data-tri-step]')) {
      const any = [...step.querySelectorAll('[data-tri-q]')].some((fs) => !fs.hidden);
      step.hidden = !any;
    }
  }

  // "None of these" clears the other options of its question, and the reverse.
  form.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.name === 'trigger') triggersTouched = true;
    if (input.type === 'checkbox' && input.name.startsWith('q-') && input.checked) {
      const question = questionById.get(input.name.slice(2));
      const option = question?.options.find((o) => o.value === input.value);
      if (question && option) {
        for (const other of form.querySelectorAll(`input[name="${input.name}"]`)) {
          if (other === input) continue;
          const otherOption = question.options.find((o) => o.value === other.value);
          if (option.exclusive || otherOption?.exclusive) other.checked = false;
        }
      }
    }
    if (input.name.startsWith('q-')) {
      applyVisibility();
      const id = input.name.slice(2);
      if (form.querySelector(`[data-tri-q="${id}"]`)?.hasAttribute('data-invalid')) {
        setQuestionError(id, false);
      }
    }
    refresh();
  });

  form.addEventListener('input', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.matches('[data-tri-field]')) {
      const name = target.getAttribute('data-tri-field');
      if ((name === 'name' || name === 'purpose') && target.value.trim()) setFieldError(name, false);
      if (name === 'reviewer' && target.value.trim()) setFieldError('reviewer', false);
      refresh();
    }
  });

  /** After the first result, every change updates it and the link live. */
  function refresh() {
    if (!shown) return;
    const evaluation = currentEvaluation();
    if (evaluation.complete && haveSystem()) {
      renderResult(evaluation);
      syncFragment();
    }
  }

  // ---- Validation --------------------------------------------------------------------------

  const haveSystem = () => field('name').value.trim() && field('purpose').value.trim();

  function setQuestionError(id, invalid) {
    const fieldset = form.querySelector(`[data-tri-q="${id}"]`);
    if (!fieldset) return;
    const error = fieldset.querySelector('.tool-error');
    error.hidden = !invalid;
    const hint = `tri-q-${id}-hint`;
    fieldset.setAttribute('aria-describedby', invalid ? `${error.id} ${hint}` : hint);
    if (invalid) fieldset.setAttribute('data-invalid', '');
    else fieldset.removeAttribute('data-invalid');
  }

  function setFieldError(name, invalid) {
    const input = field(name);
    const error = form.querySelector(`#tri-${name}-error`);
    if (!input || !error) return;
    error.hidden = !invalid;
    const hint = input.getAttribute('data-hint-id');
    const described = [invalid ? error.id : '', hint ?? ''].filter(Boolean).join(' ');
    if (described) input.setAttribute('aria-describedby', described);
    else input.removeAttribute('aria-describedby');
    if (invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  /** Show every problem in one summary that takes the focus; true if any. */
  function showErrors(evaluation) {
    const items = [];
    for (const name of ['name', 'purpose']) {
      const empty = !field(name).value.trim();
      setFieldError(name, empty);
      if (empty) {
        items.push({
          text: name === 'name' ? 'Name the system' : 'State its intended purpose',
          focus: () => field(name).focus(),
          href: `#tri-${name}`,
        });
      }
    }
    for (const question of model.questions) {
      const missing = evaluation.missing.includes(question.id);
      setQuestionError(question.id, missing);
      if (missing) {
        items.push({
          text: question.prompt,
          focus: () =>
            form.querySelector(`input[name="q-${question.id}"]:not(:disabled)`)?.focus(),
          href: `#tri-q-${question.id}`,
        });
      }
    }
    if (!items.length) {
      errors.hidden = true;
      return false;
    }
    errorsList.replaceChildren(
      ...items.map((item) => {
        const link = h('a', { href: item.href }, item.text);
        link.addEventListener('click', (event) => {
          event.preventDefault();
          item.focus();
        });
        return h('li', {}, link);
      }),
    );
    errors.querySelector('[data-tri-errors-count]').textContent =
      items.length === 1 ? '1 answer is missing' : `${items.length} answers are missing`;
    errors.hidden = false;
    focusOn(errors);
    return true;
  }

  // ---- Evaluation and rendering ----------------------------------------------------------------

  function currentEvaluation() {
    return evaluate(model, readRaw(), { decidedAt: field('decided-at').value || isoDate() });
  }

  const reasonItem = (r) =>
    h(
      'li',
      {},
      `${r.reason} `,
      h('span', { class: 'tri-art' }, '('),
      h('a', { href: r.sectionHref }, r.article),
      h('span', { class: 'tri-art' }, ')'),
    );

  function renderResult(evaluation) {
    const meta = readMeta();
    if (!triggersTouched) setTriggers(evaluation.suggestedTriggers);

    result.querySelector('[data-tri-summary]').textContent =
      `${meta.name}${meta.registryId ? ` (${meta.registryId})` : ''}. Question set ${model.questionSet.version}, as of ${model.questionSet.asOf}. ${summarise(evaluation)}`;

    // Scope.
    const scopeBox = result.querySelector('[data-tri-scope]');
    scopeBox.setAttribute('data-state', evaluation.scope.status);
    scopeBox.querySelector('[data-tri-scope-status]').textContent =
      `${scopeWords(evaluation.scope.status)} (indicative)`;
    const scopeList = scopeBox.querySelector('[data-tri-scope-reasons]');
    scopeList.replaceChildren(
      ...(evaluation.scope.reasons.length
        ? evaluation.scope.reasons.map(reasonItem)
        : [
            h(
              'li',
              {},
              'The Act reaches it on these answers, and no exclusion was claimed. Scope is a recorded decision, not an assumption: the record keeps the answers behind it.',
            ),
          ]),
    );

    // Roles.
    const rolesList = result.querySelector('[data-tri-roles]');
    rolesList.replaceChildren(
      ...(evaluation.roles.length
        ? evaluation.roles.map((role) =>
            h(
              'li',
              { 'data-role': role.id },
              h('strong', {}, role.label),
              h('span', { class: 'tri-art' }, ` ${role.article}`),
              h('ul', {}, role.reasons.map(reasonItem)),
            ),
          )
        : [h('li', {}, 'None on these answers.')]),
    );

    // Classes: every rung and the GPAI track, the ones that apply first.
    const classList = result.querySelector('[data-tri-classes]');
    const given = new Map(evaluation.classes.map((c) => [c.id, c]));
    classList.replaceChildren(
      ...model.classOrder.map((id) => {
        const cls = given.get(id);
        const label = model.classLabels[id];
        if (!cls) {
          return h(
            'li',
            { 'data-class': id, 'data-state': 'not' },
            h('span', { class: 'tri-rung' }, label.label),
            h('span', { class: 'tri-art' }, ` ${label.article}`),
            h('span', { class: 'tri-not' }, ' Not on these answers.'),
          );
        }
        const when =
          cls.timing === 'applies'
            ? `Applies from ${cls.appliesFrom}: already applies on the decision date.`
            : cls.timing === 'applies-later'
              ? `Applies from ${cls.appliesFrom}: after the decision date.`
              : cls.appliesFrom
                ? `Applies from ${cls.appliesFrom}.`
                : 'No date yet: see the reason.';
        return h(
          'li',
          { 'data-class': id, 'data-state': 'given' },
          h('strong', { class: 'tri-rung' }, label.label),
          h('span', { class: 'tri-art' }, ` ${label.article}`),
          h('p', { class: 'tri-when' }, when),
          h('ul', {}, cls.reasons.map(reasonItem)),
        );
      }),
    );

    // What the other answers would give, when the scope screen took it out.
    const ifBox = result.querySelector('[data-tri-if]');
    const would = evaluation.ifInScope
      ? [
          ...evaluation.ifInScope.roles.map((r) => `${r.label} (${r.article})`),
          ...evaluation.ifInScope.classes.map((c) => `${c.label} (${c.article})`),
        ]
      : [];
    ifBox.hidden = !would.length;
    ifBox.querySelector('p').textContent = would.length
      ? `Nothing is assigned out of scope. If it were in scope, for example once it is placed on the market, the other answers would give: ${would.join('; ')}. Re-run the triage then.`
      : '';

    // Open points and what follows.
    for (const [kind, selector] of [
      ['open', '[data-tri-open]'],
      ['info', '[data-tri-notes]'],
    ]) {
      const box = result.querySelector(selector);
      const items = evaluation.notes.filter((n) => n.kind === kind);
      box.hidden = !items.length;
      box.querySelector('ul').replaceChildren(...items.map(reasonItem));
    }

    renderHandoff(evaluation);

    // The reason behind each answer.
    result.querySelector('[data-tri-answers]').replaceChildren(
      ...evaluation.answerRows.map((row) =>
        h(
          'tr',
          {},
          h('th', { scope: 'row' }, row.prompt),
          h('td', { 'data-label': 'Answer' }, row.labels.join('; ')),
          h(
            'td',
            { 'data-label': 'Article' },
            h('a', { href: row.eurLexHref, rel: 'noopener' }, row.article),
          ),
          h('td', { 'data-label': 'What it means' }, row.means.join(' ')),
        ),
      ),
    );

    const warn = result.querySelector('[data-tri-version-warning]');
    warn.textContent = versionWarning;
    warn.hidden = !versionWarning;

    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
  }

  function renderHandoff(evaluation) {
    const box = result.querySelector('[data-tri-handoff]');
    const params = plannerParams(model, evaluation, field('decided-at').value || isoDate());
    if (!params) {
      box.replaceChildren(
        h(
          'p',
          {},
          evaluation.scope.status === 'out-of-scope'
            ? 'Out of scope on these answers, so there is no obligation set to plan. Keep the record: it is the evidence of the decision.'
            : 'No role or class follows yet, so there is nothing to plan.',
        ),
      );
      return;
    }
    const names = [
      ...evaluation.roles.map((r) => r.label),
      ...evaluation.classes.map((c) => c.label),
    ].join('; ');
    if (model.planner.live) {
      box.replaceChildren(
        h(
          'p',
          {},
          h(
            'a',
            { href: `${model.planner.href}#${encodeFragment(params)}`, 'data-tri-planner': '' },
            'Open the obligations planner with these roles and classes',
          ),
          ` (${names}).`,
        ),
      );
    } else {
      box.replaceChildren(
        h(
          'p',
          {},
          `The obligations planner is not published yet. Until it is, the `,
          h('a', { href: model.registerHref }, 'obligation register'),
          ` lists every EU AI Act duty with its holder and the classes it applies to; read it for: ${names}.`,
        ),
      );
    }
  }

  // ---- Link state ------------------------------------------------------------------------------

  const stateParams = () => stateToParams(model, resolveAnswers(model, readRaw()).answers, readMeta());
  const syncFragment = () => writeFragment(stateParams());

  function applyState(state, { focus, source }) {
    setAnswers(state.answers);
    setMeta(state.meta);
    applyVisibility();
    const evaluation = currentEvaluation();
    if (evaluation.complete && haveSystem()) {
      renderResult(evaluation);
      if (focus) focusOn(result.querySelector('h2'));
      announce(status, `Triage loaded from the ${source}. ${summarise(evaluation)}`);
      return true;
    }
    return false;
  }

  function applyFragment({ focus }) {
    const state = paramsToState(model, readFragment());
    if (!state) return;
    versionWarning =
      state.questionSetVersion && state.questionSetVersion !== model.questionSet.version
        ? `This link was made with question set ${state.questionSetVersion}; this page runs ${model.questionSet.version}. Answers were kept where the questions still exist: check them before you file the record.`
        : '';
    applyState(state, { focus, source: 'link' });
  }

  // ---- Exports ---------------------------------------------------------------------------------

  function currentRecord(evaluation) {
    const meta = readMeta();
    return buildRecord(model, evaluation, meta, {
      page: model.page,
      notice: model.notice,
      link: shareUrl(stateParams()),
    });
  }

  const fileBase = (record) => `classification-decision-${slug(record.system.registry_id || record.system.name) || 'system'}-${record.decided_at || isoDate()}`;

  async function runAction(action) {
    const evaluation = currentEvaluation();
    if (!evaluation.complete || !haveSystem()) {
      showErrors(evaluation);
      return;
    }
    if (['json', 'yaml', 'md'].includes(action) && !field('reviewer').value.trim()) {
      setFieldError('reviewer', true);
      field('reviewer').focus();
      announce(status, 'Name the reviewing role first: the record says who decided.');
      return;
    }
    if (!field('decided-at').value) field('decided-at').value = isoDate();
    try {
      switch (action) {
        case 'copy': {
          syncFragment();
          const ok = await copyText(shareUrl(stateParams()));
          announce(
            status,
            ok
              ? 'Link copied. The answers travel in the part after #, which the browser does not send when it loads the page.'
              : 'Copy failed: copy the address bar instead.',
          );
          break;
        }
        case 'json': {
          const record = currentRecord(evaluation);
          downloadJson(`${fileBase(record)}.json`, record);
          announce(status, 'Decision record downloaded as JSON. Import it below to re-open it.');
          break;
        }
        case 'yaml': {
          const record = currentRecord(evaluation);
          downloadText(
            `${fileBase(record)}.yaml`,
            `# Classification decision record (${record.$schema})\n${toYaml(record)}`,
            'application/yaml;charset=utf-8',
          );
          announce(status, 'Decision record downloaded as YAML.');
          break;
        }
        case 'md': {
          const record = currentRecord(evaluation);
          downloadMarkdown(
            `${fileBase(record)}.md`,
            recordMarkdown(model, record, evaluation, { chapterUrl: model.chapter }),
          );
          announce(status, 'Report downloaded as Markdown.');
          break;
        }
        case 'print':
          window.print();
          break;
        default:
          break;
      }
    } catch (error) {
      announce(status, `That did not work: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  result.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button) runAction(button.getAttribute('data-action'));
  });

  // ---- Re-opening a record -------------------------------------------------------------------------

  const importInput = importBox.querySelector('[data-tri-import]');
  const importError = importBox.querySelector('[data-tri-import-error]');
  const importStatus = importBox.querySelector('[data-tri-import-status]');

  importInput.addEventListener('change', async () => {
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      const json = await readJsonFile(file);
      const state = recordToState(model, json);
      importError.hidden = true;
      importInput.removeAttribute('aria-invalid');
      importInput.setAttribute('aria-describedby', 'tri-import-hint');
      versionWarning = state.warnings.join(' ');
      triggersTouched = false;
      const done = applyState(state, { focus: true, source: 'record' });
      if (done) syncFragment();
      announce(
        importStatus,
        done
          ? `Record re-opened: the outcome was recomputed from its answers.${state.warnings.length ? ` ${state.warnings.join(' ')}` : ''}`
          : 'Record read, but some answers are missing for this question set: complete the form.',
      );
    } catch (error) {
      importError.textContent =
        error instanceof Error ? error.message : 'That file could not be read.';
      importError.hidden = false;
      importInput.setAttribute('aria-invalid', 'true');
      importInput.setAttribute('aria-describedby', 'tri-import-error tri-import-hint');
    } finally {
      importInput.value = '';
    }
  });

  // ---- Submit and reset -----------------------------------------------------------------------------

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const evaluation = currentEvaluation();
    if (showErrors(evaluation)) return;
    if (!field('decided-at').value) field('decided-at').value = isoDate();
    renderResult(evaluation);
    syncFragment();
    focusOn(result.querySelector('h2'));
    announce(status, summarise(evaluation));
  });

  form.querySelector('[data-tri-reset]').addEventListener('click', () => {
    setAnswers({});
    setMeta({ decidedAt: isoDate() });
    setTriggers([]);
    triggersTouched = false;
    versionWarning = '';
    for (const question of model.questions) setQuestionError(question.id, false);
    for (const name of ['name', 'purpose', 'reviewer']) setFieldError(name, false);
    errors.hidden = true;
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    writeFragment({});
    applyVisibility();
    field('name').focus();
  });

  window.addEventListener('hashchange', () => applyFragment({ focus: true }));

  if (!field('decided-at').value) field('decided-at').value = isoDate();
  applyVisibility();
  applyFragment({ focus: false });
}
