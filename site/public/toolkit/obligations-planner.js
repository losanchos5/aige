// obligations-planner.js: the client side of /toolkit/obligations-planner.
// Reads the register rows from the page's JSON island, turns the ticked roles,
// classes and reference date into a plan (obligations-planner-core.js), draws
// the timeline, fills the tables and handles the link state and the exports:
// Markdown checklist, CSV, JSON and an .ics calendar. All of it runs in this
// page; nothing is sent.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  isoDate,
  toCsv,
  downloadText,
  downloadJson,
  downloadMarkdown,
  downloadIcs,
  copyText,
  h,
  announce,
  focusOn,
} from './lib.js';
import {
  isIsoDate,
  encodeState,
  decodeState,
  planFor,
  planDates,
  planSummary,
  dateDetail,
  planMarkdown,
  planCsvRows,
  planJson,
  planIcsEvents,
  timelineSvg,
  roleNames,
  layerNames,
  classLabel,
} from './obligations-planner-core.js';

const root = document.querySelector('[data-tool-app="obligations-planner"]');
const data = readToolData();

if (root && data) init(root, data);

function init(app, model) {
  mountTool(app);
  const form = app.querySelector('[data-opl-form]');
  const errors = form.querySelector('[data-opl-errors]');
  const errorsList = form.querySelector('[data-opl-errors-list]');
  const dateInput = form.querySelector('#opl-date');
  const result = app.querySelector('[data-opl-result]');
  const status = app.querySelector('[data-opl-status]');
  const narrowQuery =
    typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 819px)') : null;
  let shown = false;

  // ---- Answers ----------------------------------------------------------------

  const checked = (name) =>
    [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((input) => input.value);

  function readAnswers() {
    const raw = dateInput.value.trim();
    return {
      roles: checked('role'),
      classes: checked('class'),
      ref: raw && isIsoDate(raw) ? raw : isoDate(),
      refSet: Boolean(raw),
      refValid: !raw || isIsoDate(raw),
    };
  }

  function setAnswers({ roles, classes, ref }) {
    for (const input of form.querySelectorAll('input[name="role"]')) input.checked = roles.includes(input.value);
    for (const input of form.querySelectorAll('input[name="class"]')) input.checked = classes.includes(input.value);
    dateInput.value = ref ?? '';
  }

  // ---- Validation ---------------------------------------------------------------

  function setError(field, message) {
    const error = form.querySelector(`#${field}-error`);
    const hint = `${field}-hint`;
    const target = form.querySelector(`#${field}`);
    error.textContent = message ?? '';
    error.hidden = !message;
    target.setAttribute('aria-describedby', message ? `${error.id} ${hint}` : hint);
    if (message) target.setAttribute('data-invalid', '');
    else target.removeAttribute('data-invalid');
  }

  /** Shows the error summary and returns true when the answers are incomplete. */
  function showErrors(answers) {
    const problems = [];
    if (!answers.roles.length) problems.push(['opl-roles', 'Tick at least one role.']);
    if (!answers.refValid) problems.push(['opl-date', 'Write the date as YYYY-MM-DD, or leave it empty for today.']);
    setError('opl-roles', problems.find(([f]) => f === 'opl-roles')?.[1]);
    setError('opl-date', problems.find(([f]) => f === 'opl-date')?.[1]);
    if (!problems.length) {
      errors.hidden = true;
      return false;
    }
    errorsList.replaceChildren(
      ...problems.map(([field, message]) => {
        const link = h('a', { href: `#${field}` }, message);
        link.addEventListener('click', (event) => {
          event.preventDefault();
          const target = form.querySelector(`#${field}`);
          (target?.matches('input') ? target : target?.querySelector('input'))?.focus();
        });
        return h('li', {}, link);
      }),
    );
    errors.hidden = false;
    focusOn(errors);
    return true;
  }

  // ---- Rendering ------------------------------------------------------------------

  const statusCell = (s) =>
    s.key === 'later' ? `${s.label} (in ${s.days} days)` : s.label;

  function render(answers) {
    const plan = planFor(model, answers);
    const entries = planDates(plan);
    result.querySelector('[data-opl-summary]').textContent = planSummary(model, plan);
    result.querySelector('[data-opl-ref]').textContent = plan.ref;

    const chart = result.querySelector('[data-opl-chart]');
    chart.hidden = entries.length === 0;
    result.querySelector('[data-opl-chart-svg]').innerHTML = entries.length
      ? timelineSvg(entries, {
          narrow: Boolean(narrowQuery && narrowQuery.matches),
          ref: plan.ref,
          asOf: model.asOf,
          title: `Dates in your plan, reference date ${plan.ref}`,
        })
      : '';

    const datesBlock = result.querySelector('[data-opl-dates-block]');
    datesBlock.hidden = entries.length === 0;
    result.querySelector('[data-opl-dates]').replaceChildren(
      ...entries.map((e) =>
        h(
          'tr',
          {},
          h('th', { scope: 'row', class: 'num' }, e.date),
          h('td', { 'data-label': 'What happens' }, h('ul', { class: 'opl-cell-list' }, dateDetail(e).map((line) => h('li', {}, line)))),
        ),
      ),
    );

    const rowsBlock = result.querySelector('[data-opl-rows-block]');
    rowsBlock.hidden = plan.items.length === 0;
    result.querySelector('[data-opl-rows]').replaceChildren(
      ...plan.items.map((item) => {
        const r = item.row;
        const later = item.dates.filter((d) => d.kind === 'step');
        return h(
          'tr',
          { 'data-opl-row': r.id },
          h(
            'th',
            { scope: 'row' },
            h('a', { href: r.path }, r.title),
            h('span', { class: 'opl-id' }, r.id),
          ),
          h(
            'td',
            { 'data-label': 'Why it binds you' },
            `${roleNames(model, item.roles).join(', ')}; ${item.classes.map((c) => classLabel(model, c)).join(', ')}`,
            item.notes.map((note) => h('span', { class: 'opl-note' }, note)),
          ),
          h(
            'td',
            { 'data-label': 'Artefact and layer' },
            r.artefact,
            h('span', { class: 'opl-layers' }, layerNames(model, r.layers).join(' · ')),
          ),
          h(
            'td',
            { 'data-label': 'Applies from' },
            h('span', { class: 'opl-when' }, item.start ?? 'No date'),
            later.map((d) => h('span', { class: 'opl-later' }, `Then ${d.date}: ${d.note}`)),
          ),
          h('td', { 'data-label': `Status on ${answers.ref}`, 'data-opl-status': item.status.key }, statusCell(item.status)),
          h(
            'td',
            { 'data-label': 'Patterns' },
            r.patterns.length
              ? h('ul', { class: 'opl-cell-list' }, r.patterns.map((p) => h('li', {}, h('a', { href: p.href }, p.title))))
              : 'None named yet',
          ),
        );
      }),
    );

    const outside = result.querySelector('[data-opl-outside]');
    outside.hidden = plan.outside.length === 0;
    outside.querySelector('ul').replaceChildren(
      ...plan.outside.map((o) =>
        h(
          'li',
          { 'data-opl-outside-duty': o.duty.id },
          h('strong', {}, `${o.duty.article} ${o.duty.title}. `),
          `${statusCell(o.status)}; ${o.dates.map((d) => `${d.date}: ${d.note}`).join('; ')}. ${o.duty.duty} Record: ${o.duty.artefact}.`,
          o.duty.condition ? ` ${o.duty.condition}` : '',
          ' ',
          h('a', { href: o.duty.url, rel: 'noopener' }, `${o.duty.article} on EUR-Lex`),
        ),
      ),
    );

    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
    return plan;
  }

  // ---- Link state -------------------------------------------------------------------

  const stateOf = (answers) =>
    encodeState(model, { roles: answers.roles, classes: answers.classes, ref: answers.refSet ? answers.ref : '' });
  const linkOf = (answers) => shareUrl(stateOf(answers));

  function applyFragment({ focus }) {
    const state = decodeState(model, readFragment());
    if (!state) return;
    setAnswers(state);
    const answers = readAnswers();
    const plan = render(answers);
    if (focus) focusOn(result.querySelector('h2'));
    announce(status, `Plan loaded from the link. ${planSummary(model, plan)}`);
  }

  // ---- Exports ------------------------------------------------------------------------

  const fileBase = (answers) => `obligations-plan-${answers.ref}`;

  async function runAction(action) {
    const answers = readAnswers();
    if (showErrors(answers)) return;
    const plan = planFor(model, answers);
    const link = linkOf(answers);
    const today = isoDate();
    try {
      switch (action) {
        case 'copy': {
          writeFragment(stateOf(answers));
          const ok = await copyText(link);
          announce(
            status,
            ok
              ? 'Link copied. Your answers travel in the part after #, which the browser does not send when it loads the page.'
              : 'Copy failed: copy the address bar instead.',
          );
          break;
        }
        case 'md':
          downloadMarkdown(`${fileBase(answers)}.md`, planMarkdown(model, plan, { link, today }));
          announce(status, 'Markdown checklist downloaded.');
          break;
        case 'csv':
          downloadText(`${fileBase(answers)}.csv`, toCsv(planCsvRows(model, plan)), 'text/csv;charset=utf-8;header=present');
          announce(status, 'CSV downloaded.');
          break;
        case 'json':
          downloadJson(`${fileBase(answers)}.json`, planJson(model, plan, { link, today }));
          announce(status, 'JSON downloaded.');
          break;
        case 'ics': {
          const events = planIcsEvents(model, plan, { link });
          if (!events.length) {
            announce(status, 'This plan has no dated duty, so there is no calendar to download.');
            break;
          }
          downloadIcs(`${fileBase(answers)}.ics`, {
            name: 'EU AI Act obligations plan',
            events,
          });
          announce(status, `Calendar downloaded: ${events.length} all-day ${events.length === 1 ? 'event' : 'events'}, one per date.`);
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

  // ---- Events -------------------------------------------------------------------------

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const answers = readAnswers();
    if (showErrors(answers)) return;
    const plan = render(answers);
    writeFragment(stateOf(answers));
    focusOn(result.querySelector('h2'));
    announce(status, planSummary(model, plan));
  });

  form.addEventListener('change', () => {
    const answers = readAnswers();
    if (!errors.hidden && answers.roles.length && answers.refValid) {
      errors.hidden = true;
      setError('opl-roles');
      setError('opl-date');
    }
    if (shown && answers.roles.length && answers.refValid) {
      render(answers);
      writeFragment(stateOf(answers));
    }
  });

  form.querySelector('[data-opl-reset]').addEventListener('click', () => {
    setAnswers({ roles: [], classes: [], ref: '' });
    setError('opl-roles');
    setError('opl-date');
    errors.hidden = true;
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    writeFragment({});
    form.querySelector('input[name="role"]')?.focus();
  });

  result.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button) runAction(button.getAttribute('data-action'));
  });

  window.addEventListener('hashchange', () => applyFragment({ focus: true }));
  narrowQuery?.addEventListener?.('change', () => {
    const answers = readAnswers();
    if (shown && answers.roles.length && answers.refValid) render(answers);
  });

  applyFragment({ focus: false });
}
