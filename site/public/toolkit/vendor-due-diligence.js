// vendor-due-diligence.js: the client side of /toolkit/vendor-due-diligence.
// From the supply type, the use tier, the data the supplier will see, the
// autonomy and tool access it gets, the jurisdictions and the sector, it sets a
// risk tier (the tool's stated rule), selects the artefact requests that tier
// and those facts call for, each cross-referenced to crosswalk topics and CSA
// AICM control ids, and the contract clauses to check. The reader can then
// record what came back and export a vendor-due-diligence-response.v1 record.
// Exports: Markdown request, CSV, JSON response record, the link. Nothing is
// sent anywhere.
//
// `computeRequest` and `buildResponse` are pure and exported for the tests.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  downloadJson,
  downloadMarkdown,
  downloadCsv,
  copyText,
  readJsonFile,
  mdCell,
  slug,
  isoDate,
  h,
  announce,
  focusOn,
} from './lib.js';
import {
  list,
  readForm,
  applyForm,
  pickParams,
  setFieldError,
  clearFieldErrors,
  showErrorSummary,
  cleanText,
  isDate,
  joinList,
} from './form-kit.js';

export const KIND = 'aige.vendor-due-diligence';
export const VERSION = 1;
const SCHEMA = 'https://aigovernanceengineer.com/schemas/vendor-due-diligence-response.v1.json';

const REQUEST_KEYS = ['vn', 'pn', 'pv', 'rq', 's', 'u', 'dc', 'a', 'j', 'sc'];
const RESPONSE_KEYS = ['xr', 'xd', 'xp', 'xc', 'xt', 'xo', 'xh', 'xn', 'xa', 'xe', 'xk', 'xv', 'xw', 'xb'];
export const PARAM_KEYS = ['v', ...REQUEST_KEYS, ...RESPONSE_KEYS];
const TIERS = ['low', 'medium', 'high', 'critical'];

/** The inputs the rules read, from the flat parameters. */
export function contextFromParams(params) {
  return {
    supply: params.s ?? '',
    use: params.u ?? '',
    data: params.dc ?? '',
    autonomy: params.a ?? '',
    jurisdiction: list(params.j),
    sector: list(params.sc),
  };
}

/** Tier and reasons, by the rule the page states. */
export function computeTier(model, ctx) {
  const find = (options, id) => options.find((option) => option.id === id);
  const reasons = [];
  const read = (dimension, options, id) => {
    const option = find(options, id);
    if (!option) return;
    reasons.push({ dimension, reading: option.label, score: option.score ?? 1 });
  };
  read('Use', model.useTiers, ctx.use);
  read('Data', model.dataClasses, ctx.data);
  read('Autonomy and tool access', model.autonomyLevels, ctx.autonomy);
  const regulated = ctx.sector.filter((id) => id === 'dora' || id === 'nis2');
  reasons.push({
    dimension: 'Regulatory context',
    reading: regulated.length
      ? joinList(regulated.map((id) => find(model.sectors, id)?.label ?? id))
      : 'No sector regime selected',
    score: regulated.length ? 2 : 1,
  });
  const top = Math.max(...reasons.map((reason) => reason.score));
  const highs = reasons.filter((reason) => reason.score >= 3).length;
  const score = highs >= 2 ? 4 : top;
  return { tier: TIERS[score - 1], reasons, twoHigh: highs >= 2 };
}

/** Does a question's or clause's condition hold for this context and tier? */
export function holds(cond, ctx, tier) {
  if (!cond || cond === 'always') return true;
  const checks = Object.entries(cond).filter(([key]) => key !== 'or');
  const ok =
    checks.length > 0 &&
    checks.every(([key, value]) => {
      if (key === 'minTier') return TIERS.indexOf(tier) >= TIERS.indexOf(value);
      if (key === 'jurisdiction' || key === 'sector') return value.some((v) => ctx[key].includes(v));
      return value.includes(ctx[key]);
    });
  return ok || (cond.or ?? []).some((alt) => holds(alt, ctx, tier));
}

/** The request: tier, questions and clauses for these inputs. */
export function computeRequest(model, params) {
  const ctx = contextFromParams(params);
  const tier = computeTier(model, ctx);
  const questions = model.questions.filter((q) => holds(q.when, ctx, tier.tier));
  const clauses = model.clauses.filter((clause) => holds(model.clauseRules[clause.id], ctx, tier.tier));
  const licences = ctx.supply === 'open-weights' ? model.licences : [];
  return { ctx, tier, questions, clauses, licences };
}

/** What the response record still needs, as { field, focus, message }. */
export function responseGaps(params) {
  const gaps = [];
  const need = (key, id, message, ok = Boolean(cleanText(params[key]))) => {
    if (!ok) gaps.push({ field: `${id}-field`, focus: id, message });
  };
  need('xd', 'vdd-xd', 'Enter the date the answers arrived.', isDate(params.xd));
  need('xp', 'vdd-xp', "Record the supplier's role under the EU AI Act.");
  need('xt', 'vdd-xt', 'Record whether our data trains their models (yes or no).', params.xt === 'yes' || params.xt === 'no');
  need('xh', 'vdd-xh', 'Record the incident-notice window in hours.', /^\d{1,5}$/.test(String(params.xh ?? '')));
  need('xe', 'vdd-xe', 'Record the decision.');
  need('xv', 'vdd-xv', 'Name the reviewing role.');
  need('xw', 'vdd-xw', 'Enter the review date.', isDate(params.xw));
  need('xb', 'vdd-xb', 'Enter the reassessment date.', isDate(params.xb));
  if (isDate(params.xw) && isDate(params.xb) && params.xb < params.xw) {
    gaps.push({ field: 'vdd-xb-field', focus: 'vdd-xb', message: 'The reassessment date cannot come before the review.' });
  }
  if (params.xn !== undefined && params.xn !== '' && !/^\d{1,5}$/.test(String(params.xn))) {
    gaps.push({ field: 'vdd-xn-field', focus: 'vdd-xn', message: 'Change notice is a whole number of days.' });
  }
  return gaps;
}

/** The vendor-due-diligence-response.v1 record. */
export function buildResponse(model, params, request, { now = new Date() } = {}) {
  const received = new Set(list(params.xr));
  const vendor = cleanText(params.vn, 120);
  const product = cleanText(params.pn, 120);
  const answers = {
    provider_role: params.xp,
    training_on_customer_data: {
      used: params.xt === 'yes',
      ...(params.xo === 'yes' || params.xo === 'no' ? { opt_out: params.xo === 'yes' } : {}),
    },
    incident_notification: { window_hours: Number(params.xh) },
  };
  if (params.xc) answers.eu_ai_act_category = params.xc;
  if (/^\d{1,5}$/.test(String(params.xn ?? ''))) {
    answers.change_notification = { notice_days: Number(params.xn) };
  }
  if (params.xa === 'yes' || params.xa === 'no') answers.audit_rights = params.xa === 'yes';
  const conditions = String(params.xk ?? '')
    .split(/\r?\n|;/)
    .map((line) => cleanText(line, 300))
    .filter(Boolean);
  const record = {
    $schema: SCHEMA,
    response_id: `VDD-${slug(vendor) || 'vendor'}-${slug(product) || 'product'}-${params.xd}`,
    questionnaire_version: `aige-vendor-due-diligence ${model.version} (${request.tier.tier} tier, ${request.questions.length} requests)`,
    vendor: { name: vendor },
    product: {
      name: product,
      ...(cleanText(params.pv) ? { version: cleanText(params.pv, 60) } : {}),
    },
    ...(cleanText(params.rq) ? { requested_by: cleanText(params.rq, 120) } : {}),
    received_at: params.xd,
    answers,
    open_questions: request.questions
      .filter((q) => !received.has(q.id))
      .map((q) => `${q.id} (${q.artefact}): ${q.ask}`),
    assessment: {
      risk_tier: request.tier.tier,
      decision: params.xe,
      ...(conditions.length ? { conditions } : {}),
      reviewer: cleanText(params.xv, 120),
      reviewed_at: params.xw,
      reassess_by: params.xb,
    },
    extensions: {
      [KIND]: {
        kind: KIND,
        version: VERSION,
        generated_on: now.toISOString().slice(0, 10),
        tool: model.page,
        notice: model.notice,
        tier_rule: model.tierRule,
        tier_reasons: request.tier.reasons.map((r) => `${r.dimension}: ${r.reading} (${TIERS[r.score - 1]})`),
        requests: request.questions.map((q) => ({
          id: q.id,
          area: q.area,
          request: q.ask,
          artefact: q.artefact,
          crosswalk_topics: q.topics.map((t) => t.id),
          csa_aicm: q.aicm.map((c) => c.id),
          response_field: q.field ?? null,
          received_with_evidence: received.has(q.id),
        })),
        contract_clauses: request.clauses.map((c) => c.id),
        inputs: pickParams(params, PARAM_KEYS),
      },
    },
  };
  if (!record.open_questions.length) delete record.open_questions;
  return record;
}

/** CSV rows: the requests, then the clause checklist. */
export function requestRows(request, params) {
  const received = new Set(list(params.xr));
  const rows = [
    ['type', 'id', 'area', 'request', 'artefact', 'crosswalk_topics', 'csa_aicm', 'response_field', 'contract_clauses', 'received_with_evidence'],
  ];
  for (const q of request.questions) {
    rows.push([
      'request',
      q.id,
      q.area,
      q.ask,
      q.artefact,
      q.topics.map((t) => t.name).join('; '),
      q.aicm.map((c) => c.id).join('; '),
      q.field ?? '',
      (q.clauses ?? []).join('; '),
      received.has(q.id) ? 'yes' : 'no',
    ]);
  }
  for (const c of request.clauses) {
    rows.push(['clause', c.id, 'Contract', c.clause, c.evidence, '', '', '', c.redFlag, '']);
  }
  return rows;
}

// ---- The page ----------------------------------------------------------------------

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-tool-app="vendor-due-diligence"]');
  const data = readToolData();
  if (root && data) init(root, data);
}

function init(app, model) {
  mountTool(app);
  const form = app.querySelector('[data-vdd-form]');
  const responseForm = app.querySelector('[data-vdd-response]');
  const summary = app.querySelector('[data-vdd-errors]');
  const responseSummary = app.querySelector('[data-vdd-response-errors]');
  const result = app.querySelector('[data-vdd-result]');
  const status = app.querySelector('[data-vdd-status]');
  const importInput = app.querySelector('[data-vdd-import]');
  let shown = false;

  const params = () => ({
    v: String(VERSION),
    ...readForm(form),
    ...readForm(responseForm),
    ...(receivedIds().length ? { xr: receivedIds().join(',') } : {}),
  });

  function receivedIds() {
    return [...result.querySelectorAll('input[data-vdd-received]:checked')].map((el) => el.value);
  }

  function setParams(p) {
    applyForm(form, p);
    applyForm(responseForm, p);
  }

  function validate(p) {
    clearFieldErrors(form);
    const errors = [];
    if (!cleanText(p.vn)) errors.push({ field: 'vdd-vn-field', focus: 'vdd-vn', message: 'Name the supplier.' });
    if (!cleanText(p.pn)) errors.push({ field: 'vdd-pn-field', focus: 'vdd-pn', message: 'Name the product or model.' });
    for (const [key, id, message] of [
      ['s', 'vdd-supply', 'Choose what you are buying.'],
      ['u', 'vdd-use', 'Choose what the use decides.'],
      ['dc', 'vdd-data', 'Choose the most sensitive data the supplier will see.'],
      ['a', 'vdd-autonomy', 'Choose the autonomy and tool access.'],
    ]) {
      if (!p[key]) errors.push({ field: id, message });
    }
    if (!list(p.j).length) errors.push({ field: 'vdd-juris', message: 'Choose at least one jurisdiction where it will be used.' });
    for (const error of errors) setFieldError(form.querySelector(`#${error.field}`), error.message);
    showErrorSummary(summary, errors, { focusOn });
    return errors.length === 0;
  }

  const complete = (p) =>
    cleanText(p.vn) && cleanText(p.pn) && p.s && p.u && p.dc && p.a && list(p.j).length;

  function render(p) {
    const request = computeRequest(model, p);
    const { tier } = request;
    const received = new Set(list(p.xr));
    result.querySelector('[data-vdd-tier]').replaceChildren(
      h('p', { class: 'tk-lede' }, 'Risk tier: ', h('strong', {}, tier.tier), `. ${request.questions.length} artefact requests and ${request.clauses.length} contract clauses.`),
      h(
        'ul',
        { class: 'tk-list' },
        tier.reasons.map((r) => h('li', {}, `${r.dimension}: ${r.reading} (${TIERS[r.score - 1]}).`)),
        tier.twoHigh ? h('li', {}, 'Two or more high readings: critical.') : null,
      ),
      h('p', { class: 'tool-hint' }, model.tierRule),
    );

    const container = result.querySelector('[data-vdd-questions]');
    const areas = [...new Set(request.questions.map((q) => q.area))];
    container.replaceChildren(
      ...areas.map((area) =>
        h(
          'div',
          { class: 'vdd-area' },
          h('h4', {}, area),
          h(
            'ul',
            { class: 'tk-cards' },
            request.questions
              .filter((q) => q.area === area)
              .map((q) =>
                h(
                  'li',
                  { class: 'tk-card', 'data-question': q.id },
                  h('p', {}, h('strong', {}, `${q.id}. `), q.ask),
                  h('p', { class: 'tool-hint' }, `Artefact: ${q.artefact}.`),
                  h(
                    'p',
                    { class: 'tk-refs' },
                    'Crosswalk: ',
                    ...q.topics.flatMap((t, i) => [
                      i ? '; ' : '',
                      h('a', { href: `/resources/crosswalk#topic-${t.id}` }, t.name),
                    ]),
                    q.aicm.length ? ` · CSA AICM: ${q.aicm.map((c) => `${c.id} ${c.title}`).join('; ')}` : '',
                  ),
                  h(
                    'p',
                    { class: 'vdd-received' },
                    h('input', {
                      type: 'checkbox',
                      id: `vdd-rx-${q.id}`,
                      value: q.id,
                      'data-vdd-received': true,
                      ...(received.has(q.id) ? { checked: true } : {}),
                    }),
                    ' ',
                    h('label', { for: `vdd-rx-${q.id}` }, 'Received, with the artefact'),
                  ),
                ),
              ),
          ),
        ),
      ),
    );

    result.querySelector('[data-vdd-clauses]').replaceChildren(
      ...request.clauses.map((c) =>
        h(
          'tr',
          {},
          h('th', { scope: 'row' }, h('a', { href: `/resources/contracts#clause-${c.id}` }, c.clause)),
          h('td', { 'data-label': 'Red flag' }, c.redFlag),
          h('td', { 'data-label': 'Fallback' }, c.fallback),
          h('td', { 'data-label': 'Evidence to keep' }, c.evidence),
        ),
      ),
    );
    const lic = result.querySelector('[data-vdd-licences]');
    lic.hidden = request.licences.length === 0;
    lic.querySelector('ul').replaceChildren(
      ...request.licences.map((l) =>
        h('li', {}, h('a', { href: `/resources/contracts#licence-${l.id}` }, l.family), `: ${l.watch} AIBOM fields: ${l.aibomFields}`),
      ),
    );
    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
    return request;
  }

  const sync = () => writeFragment(params());

  function markdown(p, request) {
    const vendor = cleanText(p.vn, 120);
    const product = cleanText(p.pn, 120);
    const lines = [
      `# AI due-diligence request: ${product}${p.pv ? ` ${cleanText(p.pv, 60)}` : ''} (${vendor})`,
      '',
      `> ${model.notice}`,
      '',
      `Requested${p.rq ? ` by ${cleanText(p.rq, 120)}` : ''} on ${isoDate()}. Risk tier: **${request.tier.tier}** (${request.tier.reasons.map((r) => `${r.dimension.toLowerCase()}: ${TIERS[r.score - 1]}`).join('; ')}).`,
      '',
      '## How to answer',
      '',
      '- Send the artefact itself, or a link to it, not a description of it. Where none exists, say so: an honest "none" is an answer.',
      '- We record what we can verify and what we cannot. Unanswered requests stay open and bound the integration until they close.',
      '- Each request names the crosswalk topics and CSA AICM control ids it relates to, so you can answer from your existing control evidence.',
      '',
    ];
    const areas = [...new Set(request.questions.map((q) => q.area))];
    for (const area of areas) {
      lines.push(`## ${area}`, '');
      for (const q of request.questions.filter((x) => x.area === area)) {
        lines.push(
          `- **${q.id}.** ${q.ask}`,
          `  - Artefact: ${q.artefact}. Crosswalk: ${q.topics.map((t) => t.name).join('; ')}.${q.aicm.length ? ` CSA AICM: ${q.aicm.map((c) => c.id).join(', ')}.` : ''}`,
        );
      }
      lines.push('');
    }
    lines.push(
      '## Contract clauses we will check',
      '',
      '| Clause | Red flag | Fallback | Evidence we keep |',
      '|---|---|---|---|',
      ...request.clauses.map((c) => `| ${mdCell(c.clause)} | ${mdCell(c.redFlag)} | ${mdCell(c.fallback)} | ${mdCell(c.evidence)} |`),
      '',
    );
    if (request.licences.length) {
      lines.push('## Licence checks for open weights', '', ...request.licences.map((l) => `- **${l.family}**: ${l.watch}`), '');
    }
    lines.push(
      '---',
      '',
      `Built with the vendor due-diligence request at ${model.page} (${shareUrl(p)}). The contract checklist is an engineering checklist, not legal advice; mappings are illustrative, not a claim of conformity. ${model.license}, attribution: Jorge García Aibar.`,
    );
    return `${lines.join('\n')}\n`;
  }

  const fileBase = (p) => `ai-due-diligence-${slug(p.vn) || 'vendor'}-${slug(p.pn) || 'product'}`;

  async function run(action) {
    const p = params();
    if (!validate(p)) return;
    const request = render(p);
    sync();
    try {
      if (action === 'copy') {
        const ok = await copyText(shareUrl(p));
        announce(status, ok ? 'Link copied. The inputs travel after the #, which the browser does not send.' : 'Copy failed: copy the address bar instead.');
      } else if (action === 'md') {
        downloadMarkdown(`${fileBase(p)}.md`, markdown(p, request));
        announce(status, 'Request downloaded as Markdown.');
      } else if (action === 'csv') {
        downloadCsv(`${fileBase(p)}.csv`, requestRows(request, p));
        announce(status, 'Requests and clauses downloaded as CSV.');
      } else if (action === 'json') {
        const gaps = responseGaps(p);
        clearFieldErrors(responseForm);
        for (const gap of gaps) setFieldError(responseForm.querySelector(`#${gap.field}`), gap.message);
        if (showErrorSummary(responseSummary, gaps, { focusOn })) return;
        downloadJson(`${fileBase(p)}-response.json`, buildResponse(model, p, request));
        announce(status, 'Response record downloaded (vendor-due-diligence-response.v1).');
      } else if (action === 'print') {
        window.print();
      }
    } catch (error) {
      announce(status, `That did not work: ${error instanceof Error ? error.message : 'unknown error'}`);
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const p = params();
    if (!validate(p)) return;
    const request = render(p);
    sync();
    focusOn(result.querySelector('h2'));
    announce(status, `Tier ${request.tier.tier}: ${request.questions.length} requests and ${request.clauses.length} clauses.`);
  });

  form.addEventListener('change', () => {
    const p = params();
    if (shown && complete(p)) {
      render(p);
      sync();
    }
  });
  responseForm.addEventListener('change', () => shown && sync());
  responseForm.addEventListener('submit', (event) => {
    event.preventDefault();
    run('json');
  });
  result.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement && event.target.hasAttribute('data-vdd-received')) sync();
  });

  form.querySelector('[data-vdd-reset]')?.addEventListener('click', () => {
    applyForm(form, {});
    applyForm(responseForm, {});
    clearFieldErrors(form);
    clearFieldErrors(responseForm);
    showErrorSummary(summary, []);
    showErrorSummary(responseSummary, []);
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    writeFragment({});
    form.querySelector('#vdd-vn')?.focus();
  });

  app.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button && app.contains(button)) run(button.getAttribute('data-action'));
  });

  importInput?.addEventListener('change', async () => {
    const error = app.querySelector('[data-vdd-import-error]');
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      const json = await readJsonFile(file);
      const ext = json?.extensions?.[KIND];
      if (!ext || ext.kind !== KIND) throw new Error('That file is not a response record made by this tool.');
      if (ext.version !== VERSION) throw new Error(`That record is version ${ext.version}; this tool reads version ${VERSION}.`);
      const p = pickParams(ext.inputs, PARAM_KEYS);
      setParams(p);
      if (!complete(p)) throw new Error('The inputs in that file are incomplete.');
      render(p);
      sync();
      error.hidden = true;
      announce(status, 'Inputs and answers restored from the file; the request is recomputed.');
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
    if (!state.vn && !state.s) return;
    setParams(state);
    if (!complete(state)) return;
    const request = render(state);
    if (focus) focusOn(result.querySelector('h2'));
    announce(status, `Loaded from the link: tier ${request.tier.tier}, ${request.questions.length} requests.`);
  }

  window.addEventListener('hashchange', () => applyFragment(true));
  applyFragment(false);
}
