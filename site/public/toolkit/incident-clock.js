// incident-clock.js: the client side of /toolkit/incident-clock. From the
// awareness time, the reader's roles, the system tier and the incident facts it
// derives the incident class and severity of chapter 17's scale, and one clock
// per regime of the chapter's table (EU AI Act Arts. 73, 26(5) and 55(1)(c),
// GDPR Arts. 33 and 34, NIS2 Art. 23, DORA Art. 19): who reports to whom and
// by when, as calendar dates. Exports: calendar reminders (.ics), an incident
// record skeleton that validates against incident-record.v1, a Markdown
// summary, the link. Everything runs in this page; nothing is sent.
//
// `computeClocks` and `buildRecord` are pure and exported, so the tests can
// check them in Node against the chapter's numbers.
import {
  readToolData,
  mountTool,
  readFragment,
  writeFragment,
  shareUrl,
  downloadJson,
  downloadMarkdown,
  downloadIcs,
  copyText,
  readJsonFile,
  mdCell,
  slug,
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
  addHours,
  addDays,
  addMonths,
  isoUtc,
  parseIso,
  parseLocalDateTime,
  toLocalDateTime,
  localDate,
  formatLocal,
  cleanText,
  isUri,
} from './form-kit.js';

export const KIND = 'aige.incident-clock';
export const VERSION = 1;
const SCHEMA = 'https://aigovernanceengineer.com/schemas/incident-record.v1.json';

/** Fragment keys: v, the triage inputs, then the optional record fields. */
export const PARAM_KEYS = [
  'v',
  'at',
  'ct',
  'cl',
  'r',
  't',
  'f',
  'd',
  'c',
  'rid',
  'rti',
  'rsy',
  'rsv',
  'ror',
  'rev',
  'row',
  'rco',
  'rre',
  'rds',
];
/** Fields that hold a date-time: local wall time in the form, UTC ISO in the link. */
const DATETIME_KEYS = ['at', 'ct', 'cl'];

const SEVERITY_ORDER = ['SEV-1', 'SEV-2', 'SEV-3', 'SEV-4', 'ISSUE'];
const ART73_PARA = { 'two-day': '3', death: '4', other: '2' };

/**
 * The clocks for one event.
 * `data` is the page's island (incidentClockData()); `input` holds awareMs,
 * classifiedMs and causalMs (epoch ms or null), and the roles, tier, facts,
 * determinations and conditions the reader chose.
 */
export function computeClocks(data, input) {
  const roles = new Set(input.roles ?? []);
  const facts = data.facts.filter((fact) => (input.facts ?? []).includes(fact.id));
  const dets = new Set(input.determinations ?? []);
  const conds = new Set(input.conditions ?? []);
  const tier = data.tiers.find((entry) => entry.id === input.tier) ?? null;
  const aware = input.awareMs;
  const n = data.numbers;
  const regimeById = new Map(data.regimes.map((regime) => [regime.id, regime]));

  const severity =
    facts.length === 0
      ? null
      : data.severity.find(
          (level) =>
            level.id ===
            SEVERITY_ORDER.find((id) => facts.some((fact) => fact.severity === id)),
        );

  const highRisk = tier?.id === 'annex-iii' || tier?.id === 'annex-i';
  const notYet = Boolean(
    highRisk && tier.appliesFrom && localDateOf(aware) < tier.appliesFrom,
  );
  const serious = facts.filter((fact) => fact.art73);
  const step = (id, label, dueMs, basis, text) => ({ id, label, dueMs, basis, text: text ?? null });
  const clocks = [];
  const push = (id, status, rationale, steps = [], extra = {}) => {
    const def = regimeById.get(id);
    clocks.push({
      regime: id,
      label: def.label,
      who: def.who,
      trigger: def.trigger,
      to: extra.to ?? def.to,
      first: def.first,
      followUp: def.followUp,
      recordRegime: def.recordRegime,
      source: def.source,
      status,
      rationale,
      notes: extra.notes ?? [],
      steps,
    });
  };
  const pendingNote = () =>
    `Not yet in application on the awareness date: after the Digital Omnibus, high-risk classification and the Chapter III duties apply to ${tier.id === 'annex-iii' ? 'Annex III systems' : 'Annex I systems'} from ${tier.appliesFrom}, and this duty reaches a system only from then. The dates are shown for planning and drills.`;

  // ---- EU AI Act Art. 73 ---------------------------------------------------------
  {
    const id = 'ai_act_art73';
    const reporter = roles.has('provider')
      ? 'provider'
      : roles.has('deployer') && conds.has('provider-unreachable')
        ? 'deployer'
        : null;
    let counted = serious;
    const notes = [];
    if (conds.has('equivalent-reporting')) {
      counted = serious.filter((fact) => fact.art349 === 'c');
      notes.push(
        'For Annex III systems whose providers are already under equivalent Union reporting obligations, and for AI in medical devices, Art. 73 reporting is limited to fundamental-rights infringements (Art. 3(49)(c)). Which regimes count as equivalent is a legal call (verify).',
      );
    }
    const to = conds.has('ai-office')
      ? "The AI Office (Art. 75(1a): systems under the AI Office's exclusive competence)"
      : undefined;
    if (!highRisk && tier?.id !== 'not-assessed') {
      push(id, 'not-applicable', 'Not a high-risk system: Art. 73 applies to providers of high-risk systems. Record the registry class as the rationale.');
    } else if (!reporter && roles.has('deployer')) {
      push(id, 'not-applicable', "Art. 73 reporting is the provider's duty. As deployer you inform the provider first (Art. 26(5)); if you cannot reach the provider, Art. 73 applies to you.");
    } else if (!reporter) {
      push(id, 'not-applicable', 'Neither the provider nor the deployer role is selected.');
    } else if (counted.length === 0) {
      push(
        id,
        'not-triggered',
        conds.has('equivalent-reporting') && serious.length
          ? 'The facts include serious-incident outcomes, but none under Art. 3(49)(c), to which reporting is limited here. Record the rationale.'
          : 'No serious-incident outcome (Art. 3(49)) on these facts. Record the rationale, and classify up again if the evidence changes.',
        [],
        { notes },
      );
    } else {
      const cls = counted
        .map((fact) => fact.art73)
        .reduce((best, c) => (n.art73Days[c] < n.art73Days[best] ? c : best));
      const days = n.art73Days[cls];
      const steps = [];
      if (input.causalMs) {
        steps.push(
          step('immediate', 'Report immediately once the causal link, or its reasonable likelihood, is established', input.causalMs, 'Art. 73: immediately after the causal link is established', 'Immediately'),
        );
      }
      steps.push(
        step(
          'initial',
          'Initial report, at the latest (an incomplete initial report is allowed)',
          addDays(aware, days),
          `${days} days from awareness (Art. 73(${ART73_PARA[cls]}))`,
        ),
      );
      if (reporter === 'deployer') {
        notes.push('The provider cannot be reached, so Art. 73 applies to the deployer mutatis mutandis: the deployer inherits the clock.');
      }
      notes.push(
        'Freeze before you fix: after reporting, do not alter the system in a way that may affect the later evaluation of the causes before informing the competent authorities.',
      );
      if (counted.length > 1) {
        notes.push('Several outcomes apply; the shortest limit is shown.');
      }
      const status = notYet ? 'pending' : tier?.id === 'not-assessed' ? 'assess' : 'due';
      const rationale = notYet
        ? pendingNote()
        : tier?.id === 'not-assessed'
          ? 'The system is not classified yet. If it is high-risk, this clock runs; classify it now and plan against the clock until then.'
          : dets.has('causal-link')
            ? 'Serious incident of a high-risk system, with a causal link established or reasonably likely.'
            : 'Serious-incident outcome of a high-risk system. Report immediately once a causal link, or its reasonable likelihood, is established; the outer limit runs from awareness.';
      push(id, status, rationale, steps, { notes, to });
    }
  }

  // ---- EU AI Act Art. 26(5) ------------------------------------------------------
  {
    const id = 'ai_act_art26_5';
    const risk = dets.has('risk-79');
    if (!roles.has('deployer')) {
      push(id, 'not-applicable', 'A deployer duty; the deployer role is not selected.');
    } else if (!highRisk && tier?.id !== 'not-assessed') {
      push(id, 'not-applicable', 'Not a high-risk system: Art. 26(5) applies to deployers of high-risk systems.');
    } else if (serious.length === 0 && !risk) {
      push(id, 'not-triggered', 'No serious-incident outcome and no reason to consider the system presents a risk, on these facts. Record the rationale.');
    } else {
      const steps = [];
      if (serious.length) {
        steps.push(
          step('inform', 'Inform the provider first, then the importer or distributor and the market-surveillance authority', aware, 'Immediately on identifying a serious incident', 'Immediately'),
        );
      }
      if (risk) {
        steps.push(
          step('suspend', 'Inform the provider or distributor and the market-surveillance authority, and suspend use', aware, 'Without undue delay (risk within the meaning of Art. 79(1))', 'Without undue delay'),
        );
      }
      const notes = [];
      if (conds.has('provider-unreachable')) {
        notes.push('The provider cannot be reached: the Art. 73 clock applies to you as well (see the Art. 73 row).');
      }
      notes.push('Keep the logs under your control at least six months, longer while an incident is open.');
      push(
        id,
        notYet ? 'pending' : tier?.id === 'not-assessed' ? 'assess' : 'due',
        notYet
          ? pendingNote()
          : tier?.id === 'not-assessed'
            ? 'The system is not classified yet: if it is high-risk, these duties apply.'
            : 'Deployer of a high-risk system with a serious incident or a risk to act on.',
        steps,
        { notes },
      );
    }
  }

  // ---- EU AI Act Art. 55(1)(c) with the GPAI Code of Practice --------------------
  {
    const id = 'ai_act_art55';
    const classes = facts.map((fact) => fact.gpai).filter(Boolean);
    if (!roles.has('gpai-provider')) {
      push(id, 'not-applicable', 'A duty of providers of general-purpose AI models with systemic risk; that role is not selected.');
    } else if (classes.length === 0) {
      push(id, 'not-triggered', 'No serious-incident class of the Code on these facts. Record the rationale; near misses still feed the reports.');
    } else {
      const cls = classes.reduce((best, c) => (n.gpaiDays[c] < n.gpaiDays[best] ? c : best));
      const days = n.gpaiDays[cls];
      const initial = addDays(aware, days);
      push(
        id,
        'due',
        'Serious incident involving a GPAI model with systemic risk; the Art. 55 duties already apply.',
        [
          step('initial', 'Initial report, at the latest under the Code (the Act: without undue delay)', initial, `${days} days from awareness (Code of Practice, Commitment 9)`),
          step('intermediate', 'First intermediate report while unresolved, if the initial report goes on its deadline', addDays(initial, n.gpaiIntermediateWeeks * 7), `At least every ${n.gpaiIntermediateWeeks} weeks while unresolved`),
          step('final', 'Final report', null, `Within ${n.gpaiFinalDaysAfterResolution} days of resolution`, `Within ${n.gpaiFinalDaysAfterResolution} days of resolution`),
        ],
        {
          notes: [
            'The day counts come from the General-Purpose AI Code of Practice, a voluntary tool; Art. 55(1)(c) itself asks for reports without undue delay.',
          ],
        },
      );
    }
  }

  // ---- GDPR Arts. 33 and 34 --------------------------------------------------------
  const breach = facts.some((fact) => fact.gdpr);
  const highRiskBreach = facts.some((fact) => fact.gdpr === 'high-risk-breach');
  {
    const id = 'gdpr_art33';
    if (!roles.has('controller') && !roles.has('processor')) {
      push(id, 'not-applicable', 'Neither the controller nor the processor role is selected.');
    } else if (!breach) {
      push(id, 'not-triggered', 'No personal data breach on these facts. Record the rationale.');
    } else if (roles.has('controller')) {
      push(
        id,
        'due',
        'Personal data breach with you as controller. If you assess it as unlikely to result in a risk, record that decision and its rationale: every breach is documented.',
        [
          step('notify', 'Notify the supervisory authority', addHours(aware, n.gdprHours), `Without undue delay and, where feasible, within ${n.gdprHours} hours of awareness; reasons required if later`),
        ],
        { notes: ['Information may be provided in phases.'] },
      );
    } else {
      push(
        id,
        'due',
        'Personal data breach with you as processor.',
        [step('notify-controller', 'Notify the controller', aware, 'Without undue delay', 'Without undue delay')],
        { to: 'The controller' },
      );
    }
  }
  {
    const id = 'gdpr_art34';
    if (!roles.has('controller')) {
      push(id, 'not-applicable', "The controller's duty; the controller role is not selected.");
    } else if (!highRiskBreach) {
      push(id, 'not-triggered', 'Not assessed as likely to result in a high risk to the people concerned. Record the decision.');
    } else {
      push(id, 'due', 'Breach likely to result in a high risk to the people concerned.', [
        step('communicate', 'Communicate the breach to the affected data subjects', aware, 'Without undue delay', 'Without undue delay'),
      ]);
    }
  }

  // ---- NIS2 Art. 23 -------------------------------------------------------------------
  {
    const id = 'nis2_art23';
    if (!roles.has('nis2')) {
      push(id, 'not-applicable', 'Not an essential or important entity under NIS2 (role not selected).');
    } else {
      const notification = addHours(aware, n.nis2NotificationHours);
      const notes = [];
      if (roles.has('dora')) {
        notes.push('NIS2 steps aside where a sector-specific Union act imposes at least equivalent incident notification, which is how DORA displaces NIS2 reporting for financial entities. Confirm which applies (verify).');
      }
      push(
        id,
        dets.has('nis2-significant') ? 'due' : 'assess',
        dets.has('nis2-significant')
          ? 'Significant incident of an essential or important entity.'
          : 'Significance not determined yet. If the incident is significant, these clocks run from awareness; record the determination either way.',
        [
          step('early-warning', 'Early warning', addHours(aware, n.nis2EarlyWarningHours), `Within ${n.nis2EarlyWarningHours} hours of awareness`),
          step('notification', 'Incident notification', notification, `Within ${n.nis2NotificationHours} hours of awareness`),
          step('intermediate', 'Intermediate report', null, 'On request of the CSIRT or competent authority', 'On request'),
          step('final', 'Final report, if the notification goes on its deadline', addMonths(notification, n.nis2FinalMonths), 'Within one month of the incident notification'),
        ],
        { notes },
      );
    }
  }

  // ---- DORA Art. 19 -------------------------------------------------------------------
  {
    const id = 'dora_art19';
    if (!roles.has('dora')) {
      push(id, 'not-applicable', 'Not a financial entity under DORA (role not selected).');
    } else {
      const outer = addHours(aware, n.doraAfterAwarenessHours);
      const fromClass = input.classifiedMs ? addHours(input.classifiedMs, n.doraAfterClassificationHours) : null;
      // RTS 2025/301 Art. 5(2): a classification made after the 24 hours from
      // awareness starts its own four-hour clock, so the 24-hour limit no longer caps it.
      const lateClass = input.classifiedMs ? input.classifiedMs > outer : false;
      const initial = fromClass !== null && (lateClass || fromClass < outer) ? fromClass : outer;
      const intermediate = addHours(initial, n.doraIntermediateHours);
      push(
        id,
        dets.has('dora-major') ? 'due' : 'assess',
        dets.has('dora-major')
          ? 'Major ICT-related incident of a financial entity.'
          : `Not classified as major yet. If it is, the initial notification is due within ${n.doraAfterClassificationHours} hours of classification and no later than ${n.doraAfterAwarenessHours} hours from awareness; a classification made after those ${n.doraAfterAwarenessHours} hours starts its own ${n.doraAfterClassificationHours}-hour clock.`,
        [
          step(
            'initial',
            'Initial notification',
            initial,
            fromClass === null
              ? `No later than ${n.doraAfterAwarenessHours} hours from awareness; within ${n.doraAfterClassificationHours} hours of classification as major if that is earlier`
              : lateClass
                ? `Within ${n.doraAfterClassificationHours} hours of classification as major (classified after the first ${n.doraAfterAwarenessHours} hours from awareness, RTS 2025/301 Art. 5(2))`
                : `Within ${n.doraAfterClassificationHours} hours of classification as major, and no later than ${n.doraAfterAwarenessHours} hours from awareness (the earlier applies)`,
          ),
          step('intermediate', 'Intermediate report, if the initial one goes on its deadline', intermediate, `Within ${n.doraIntermediateHours} hours of the initial notification`),
          step('final', 'Final report, if the intermediate one goes on its deadline', addMonths(intermediate, n.doraFinalMonths), 'Within one month of the latest intermediate report'),
        ],
      );
    }
  }

  // Order: open clocks by their nearest dated step, then the rest.
  const nearest = (clock) =>
    Math.min(...clock.steps.map((s) => (s.dueMs === null ? Infinity : s.dueMs)), Infinity);
  const open = clocks.filter((clock) => ['due', 'assess', 'pending'].includes(clock.status));
  const closed = clocks.filter((clock) => !open.includes(clock));
  open.sort((a, b) => nearest(a) - nearest(b));
  return { severity, facts, tier, clocks: [...open, ...closed], open, closed };
}

/** Local calendar date of an instant (YYYY-MM-DD), for the application dates. */
function localDateOf(ms) {
  return typeof window === 'undefined' ? new Date(ms).toISOString().slice(0, 10) : localDate(ms);
}

/** Inputs for computeClocks from the flat fragment parameters. */
export function inputFromParams(params) {
  return {
    awareMs: parseIso(params.at),
    classifiedMs: parseIso(params.ct),
    causalMs: parseIso(params.cl),
    roles: list(params.r),
    tier: params.t ?? '',
    facts: list(params.f),
    determinations: list(params.d),
    conditions: list(params.c),
  };
}

const SUBMITTER = { provider: 'provider', deployer: 'deployer' };

/** The incident-record.v1 skeleton for these inputs and clocks. */
export function buildRecord(data, params, result, { now = new Date() } = {}) {
  const input = inputFromParams(params);
  const system = cleanText(params.rsy, 80).replace(/\s+/g, '-').replace(/@/g, '-');
  const version = cleanText(params.rsv, 40).replace(/\s+/g, '-').replace(/@/g, '-') || 'unversioned';
  const org = cleanText(params.ror, 120);
  const severity = result.severity;
  const harmTypes = [...new Set(result.facts.flatMap((fact) => fact.harmTypes))];
  const roles = list(params.r);
  const submitterType =
    SUBMITTER[roles.find((role) => SUBMITTER[role]) ?? ''] ?? 'other';
  const recordId =
    cleanText(params.rid, 80) ||
    `INC-${isoUtc(input.awareMs).slice(0, 10).replace(/-/g, '')}-${slug(system) || 'system'}`;
  const facts = result.facts.map((fact) => fact.label.replace(/\s*\(.*\)$/, '')).join('; ');
  const record = {
    $schema: SCHEMA,
    record_id: recordId,
    title:
      cleanText(params.rti, 160) ||
      `${severity.id} ${severity.name}: ${severity.eventClass} on ${system}`,
    description:
      cleanText(params.rds, 2000) ||
      `Triage from the incident clock. Facts as classified at triage (classify up): ${facts}.`,
    ai_systems: [`${system}@${version}`],
    organisations: [org],
    ai_system_relation: [params.rre || 'other'],
    submitter: { submitter_type: submitterType, organisation: org },
    supporting_materials: list(params.rev).filter(isUri),
    severity: severity.oecd,
    harm_types: harmTypes.length ? harmTypes : ['other'],
    critical_infrastructure: {
      affected: result.facts.some((fact) => fact.id === 'critical-infrastructure'),
    },
    reporting: {
      became_aware_at: isoUtc(input.awareMs),
      ...(input.causalMs ? { causal_link_established_at: isoUtc(input.causalMs) } : {}),
      obligations: result.clocks.map((clock) => {
        const dated = clock.steps.find((s) => s.dueMs !== null);
        return {
          regime: clock.recordRegime,
          required: clock.status === 'due' || clock.status === 'assess',
          rationale: `${clock.label}: ${statusLabel(clock.status)}. ${clock.rationale}`,
          ...(dated && clock.status !== 'not-applicable' && clock.status !== 'not-triggered'
            ? { deadline_at: isoUtc(dated.dueMs), report_type: 'initial' }
            : {}),
          authority: clock.to,
        };
      }),
    },
    status: 'open',
    extensions: {
      [KIND]: {
        kind: KIND,
        version: VERSION,
        generated_at: isoUtc(now.getTime()),
        tool: data.page,
        chapter: data.chapter,
        notice: data.notice,
        caveat: data.caveat,
        severity_level: severity.id,
        event_class: severity.eventClass,
        inputs: pickParams(params, PARAM_KEYS),
        clocks: result.clocks.map((clock) => ({
          regime: clock.regime,
          label: clock.label,
          status: clock.status,
          rationale: clock.rationale,
          to: clock.to,
          steps: clock.steps.map((s) => ({
            step: s.id,
            label: s.label,
            due_at: s.dueMs === null ? null : isoUtc(s.dueMs),
            basis: s.basis,
          })),
        })),
      },
    },
  };
  const countries = list(params.rco).map((c) => cleanText(c, 60)).filter(Boolean);
  if (countries.length) record.countries = countries;
  const owner = cleanText(params.row, 120);
  if (owner) record.owner = owner;
  return record;
}

export function statusLabel(status) {
  return (
    {
      due: 'Runs now',
      assess: 'To assess',
      pending: 'Not yet in application',
      'not-applicable': 'Not applicable',
      'not-triggered': 'Not triggered',
    }[status] ?? status
  );
}

/** What the record export still needs, as { field, message } pairs. */
export function recordGaps(params) {
  const gaps = [];
  if (!cleanText(params.rsy)) gaps.push({ field: 'ic-rsy-field', focus: 'ic-rsy', message: 'Name the AI system (its registry id).' });
  if (!cleanText(params.ror)) gaps.push({ field: 'ic-ror-field', focus: 'ic-ror', message: 'Name the organisation submitting the record.' });
  if (!list(params.rev).some(isUri)) {
    gaps.push({ field: 'ic-rev-field', focus: 'ic-rev', message: 'Add at least one evidence link (a trace, ticket or log URL).' });
  }
  return gaps;
}

// ---- The page ----------------------------------------------------------------------

if (typeof document !== 'undefined') {
  const root = document.querySelector('[data-tool-app="incident-clock"]');
  const data = readToolData();
  if (root && data) init(root, data);
}

function init(app, model) {
  mountTool(app);
  const form = app.querySelector('[data-ic-form]');
  const summary = app.querySelector('[data-ic-errors]');
  const result = app.querySelector('[data-ic-result]');
  const status = app.querySelector('[data-ic-status]');
  const recordBox = app.querySelector('[data-ic-record]');
  const importInput = app.querySelector('[data-ic-import]');
  let shown = false;

  /** Form -> fragment parameters (date-times as UTC ISO). */
  function params() {
    const raw = readForm(form);
    for (const key of DATETIME_KEYS) {
      if (raw[key]) {
        const ms = parseLocalDateTime(raw[key]);
        if (ms === null) delete raw[key];
        else raw[key] = isoUtc(ms);
      }
    }
    return { v: String(VERSION), ...raw };
  }

  function setParams(p) {
    const local = { ...p };
    for (const key of DATETIME_KEYS) {
      const ms = parseIso(p[key]);
      local[key] = ms === null ? '' : toLocalDateTime(ms);
    }
    applyForm(form, local);
  }

  function validate(p) {
    clearFieldErrors(form);
    const errors = [];
    const input = inputFromParams(p);
    const field = (id) => form.querySelector(`#${id}`);
    if (input.awareMs === null) {
      errors.push({ field: 'ic-at-field', focus: 'ic-at', message: 'Enter when you became aware of the event (date and time).' });
    }
    if (input.classifiedMs !== null && input.awareMs !== null && input.classifiedMs < input.awareMs) {
      errors.push({ field: 'ic-ct-field', focus: 'ic-ct', message: 'The classification as major cannot come before awareness.' });
    }
    if (input.causalMs !== null && input.awareMs !== null && input.causalMs < input.awareMs) {
      errors.push({ field: 'ic-cl-field', focus: 'ic-cl', message: 'The causal link cannot be established before awareness.' });
    }
    if (!input.roles.length) errors.push({ field: 'ic-roles', message: 'Choose at least one role you hold for this event.' });
    if (!input.tier) errors.push({ field: 'ic-tier', message: 'Choose the tier of the AI system.' });
    if (!input.facts.length) errors.push({ field: 'ic-facts', message: 'Tick at least one reading of what happened.' });
    for (const error of errors) setFieldError(field(error.field), error.message);
    showErrorSummary(summary, errors, { focusOn });
    return errors.length === 0;
  }

  const fmt = (ms) => formatLocal(ms);

  function renderResult(p) {
    const input = inputFromParams(p);
    const res = computeClocks(model, input);
    const sev = res.severity;
    const classEl = result.querySelector('[data-ic-class]');
    classEl.replaceChildren(
      h('p', { class: 'tk-lede' }, h('strong', {}, `${sev.id} ${sev.name}`), `: ${sev.eventClass}.`),
      h('p', {}, `Harm test: ${sev.harmTest}. Default response: ${sev.response}.`),
      h(
        'p',
        { class: 'tool-hint' },
        'Classified up: the most severe reading you ticked sets the level. Downgrade with evidence, not with hope. Severity and reportability are separate decisions: the clocks below run per regime.',
      ),
    );
    result.querySelector('[data-ic-aware]').textContent =
      `Awareness: ${fmt(input.awareMs)} (${isoUtc(input.awareMs)}).`;

    const rows = result.querySelector('[data-ic-rows]');
    rows.replaceChildren();
    for (const clock of res.open) {
      for (const s of clock.steps) {
        rows.append(
          h(
            'tr',
            { 'data-regime': clock.regime, 'data-step': s.id },
            h('th', { scope: 'row' }, clock.label),
            h('td', { 'data-label': 'Status' }, statusLabel(clock.status)),
            h('td', { 'data-label': 'Report' }, s.label),
            h(
              'td',
              { 'data-label': 'Due', class: 'ic-due' },
              s.dueMs === null ? s.text : s.text ? `${s.text} (${fmt(s.dueMs)})` : fmt(s.dueMs),
            ),
            h('td', { 'data-label': 'Basis' }, s.basis),
            h('td', { 'data-label': 'To whom' }, clock.to),
          ),
        );
      }
    }
    const noOpen = result.querySelector('[data-ic-none]');
    noOpen.hidden = res.open.length > 0;
    result.querySelector('[data-ic-table]').hidden = res.open.length === 0;

    const notes = result.querySelector('[data-ic-notes]');
    notes.replaceChildren(
      ...res.open.map((clock) =>
        h(
          'li',
          {},
          h('strong', {}, `${clock.label} (${statusLabel(clock.status).toLowerCase()}). `),
          `Who reports: ${clock.who}. ${clock.rationale}`,
          clock.notes.length ? ` ${clock.notes.join(' ')}` : '',
        ),
      ),
    );
    result.querySelector('[data-ic-closed]').replaceChildren(
      ...res.closed.map((clock) =>
        h('li', {}, h('strong', {}, `${clock.label}: ${statusLabel(clock.status).toLowerCase()}. `), clock.rationale),
      ),
    );
    result.hidden = false;
    form.setAttribute('data-print-hide', '');
    shown = true;
    return res;
  }

  function syncFragment() {
    writeFragment(params());
  }

  function icsEvents(p, res) {
    const recordId = cleanText(p.rid, 80) || `incident-${isoUtc(inputFromParams(p).awareMs).slice(0, 16)}`;
    const events = [];
    for (const clock of res.open) {
      for (const s of clock.steps) {
        if (s.dueMs === null) continue;
        events.push({
          id: `${recordId}-${clock.regime}-${s.id}`,
          date: localDate(s.dueMs),
          summary: `${clock.label}: ${s.label} (${statusLabel(clock.status).toLowerCase()}), due ${fmt(s.dueMs)}`,
          description: `${s.basis}. To: ${clock.to}. ${model.caveat} ${model.notice}`,
          url: shareUrl(p),
        });
      }
    }
    return events;
  }

  function markdown(p, res) {
    const input = inputFromParams(p);
    const sev = res.severity;
    const lines = [
      `# Incident clock${p.rsy ? `: ${cleanText(p.rsy, 80)}` : ''}`,
      '',
      `> ${model.notice}`,
      '>',
      `> **Verify with counsel or the authority.** ${model.caveat}`,
      '',
      `Awareness: ${fmt(input.awareMs)} (${isoUtc(input.awareMs)}). Clocks as chapter 17 states them, as of ${model.asOf} (${model.chapter}#${model.anchors.clocks}).`,
      '',
      '## Class and severity',
      '',
      `**${sev.id} ${sev.name}**: ${sev.eventClass}. Harm test: ${sev.harmTest}. Default response: ${sev.response}.`,
      '',
      `Facts as triaged (classified up): ${res.facts.map((f) => f.label).join('; ')}.`,
      '',
      '## Clocks that run or need a decision',
      '',
    ];
    if (res.open.length) {
      lines.push('| Regime | Status | Report | Due | Basis | To whom |', '|---|---|---|---|---|---|');
      for (const clock of res.open) {
        for (const s of clock.steps) {
          const due = s.dueMs === null ? s.text : `${s.text ? `${s.text}: ` : ''}${fmt(s.dueMs)} (${isoUtc(s.dueMs)})`;
          lines.push(
            `| ${mdCell(clock.label)} | ${statusLabel(clock.status)} | ${mdCell(s.label)} | ${mdCell(due)} | ${mdCell(s.basis)} | ${mdCell(clock.to)} |`,
          );
        }
      }
      lines.push('', ...res.open.map((clock) => `- **${clock.label}.** ${clock.rationale}${clock.notes.length ? ` ${clock.notes.join(' ')}` : ''}`));
    } else {
      lines.push('No clock runs on these inputs. Record why, per regime, below.');
    }
    lines.push(
      '',
      '## Not applicable or not triggered (record the rationale)',
      '',
      ...res.closed.map((clock) => `- **${clock.label}**: ${statusLabel(clock.status).toLowerCase()}. ${clock.rationale}`),
      '',
      '## Next',
      '',
      '- Contain first; then preserve the evidence before any change that could affect the evaluation of causes (freeze before you fix).',
      '- Keep one incident record and render each report from it; write down every "not applicable" decision with its owner.',
      `- Regimes this tool does not compute: ${model.notComputed.join('; ')}. See the chapter's table.`,
      '',
      '---',
      '',
      `Link: ${shareUrl(p)}`,
      '',
      `Made with the incident clock at ${model.page}. ${model.license}, attribution: Jorge García Aibar.`,
    );
    return `${lines.join('\n')}\n`;
  }

  const fileBase = (p) =>
    `incident-clock-${slug(p.rsy) || 'event'}-${isoUtc(inputFromParams(p).awareMs).slice(0, 10)}`;

  async function run(action) {
    const p = params();
    if (!validate(p)) return;
    const res = renderResult(p);
    syncFragment();
    try {
      if (action === 'copy') {
        const ok = await copyText(shareUrl(p));
        announce(status, ok ? 'Link copied. The inputs travel after the #, which the browser does not send.' : 'Copy failed: copy the address bar instead.');
      } else if (action === 'ics') {
        const events = icsEvents(p, res);
        if (!events.length) {
          announce(status, 'No dated deadline to put in a calendar on these inputs.');
          return;
        }
        downloadIcs(`${fileBase(p)}.ics`, { events, name: `Incident clock ${cleanText(p.rsy, 40)}`.trim() });
        announce(status, `Calendar file downloaded with ${events.length} reminder${events.length === 1 ? '' : 's'}.`);
      } else if (action === 'md') {
        downloadMarkdown(`${fileBase(p)}.md`, markdown(p, res));
        announce(status, 'Summary downloaded as Markdown.');
      } else if (action === 'json') {
        const gaps = recordGaps(p);
        clearFieldErrors(recordBox);
        if (res.severity.id === 'ISSUE') {
          announce(status, 'An issue goes to the issue log with an owner and a due date, not to an incident record.');
          return;
        }
        if (gaps.length) {
          for (const gap of gaps) setFieldError(recordBox.querySelector(`#${gap.field}`), gap.message);
          showErrorSummary(summary, gaps, { focusOn });
          return;
        }
        showErrorSummary(summary, []);
        downloadJson(`${fileBase(p)}.json`, buildRecord(model, p, res));
        announce(status, 'Incident record skeleton downloaded (incident-record.v1).');
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
    const res = renderResult(p);
    syncFragment();
    focusOn(result.querySelector('h2'));
    announce(
      status,
      `${res.severity.id} ${res.severity.name}. ${res.open.length} clock${res.open.length === 1 ? '' : 's'} to act on.`,
    );
  });

  form.addEventListener('change', () => {
    if (!shown) return;
    const p = params();
    const input = inputFromParams(p);
    if (input.awareMs === null || !input.roles.length || !input.tier || !input.facts.length) return;
    renderResult(p);
    syncFragment();
  });

  form.querySelector('[data-ic-reset]')?.addEventListener('click', () => {
    applyForm(form, {});
    clearFieldErrors(form);
    showErrorSummary(summary, []);
    result.hidden = true;
    form.removeAttribute('data-print-hide');
    shown = false;
    writeFragment({});
    form.querySelector('#ic-at')?.focus();
  });

  form.querySelector('[data-ic-now]')?.addEventListener('click', () => {
    const now = new Date();
    now.setSeconds(0, 0);
    form.querySelector('#ic-at').value = toLocalDateTime(now.getTime());
  });

  app.addEventListener('click', (event) => {
    const button = event.target instanceof Element ? event.target.closest('[data-action]') : null;
    if (button && app.contains(button)) run(button.getAttribute('data-action'));
  });

  importInput?.addEventListener('change', async () => {
    const error = app.querySelector('[data-ic-import-error]');
    const file = importInput.files?.[0];
    if (!file) return;
    try {
      const json = await readJsonFile(file);
      const ext = json?.extensions?.[KIND];
      if (!ext || ext.kind !== KIND) throw new Error('That file is not an incident record made by this tool.');
      if (ext.version !== VERSION) throw new Error(`That record is version ${ext.version}; this tool reads version ${VERSION}.`);
      const p = pickParams(ext.inputs, PARAM_KEYS);
      setParams(p);
      if (!validate(params())) throw new Error('The inputs in that file are incomplete.');
      renderResult(params());
      syncFragment();
      error.hidden = true;
      announce(status, 'Inputs restored from the file; the clocks are recomputed.');
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
    if (!state.at) return;
    setParams(state);
    const p = params();
    const input = inputFromParams(p);
    if (input.awareMs === null || !input.roles.length || !input.tier || !input.facts.length) return;
    const res = renderResult(p);
    if (focus) focusOn(result.querySelector('h2'));
    announce(status, `Loaded from the link: ${res.severity.id} ${res.severity.name}, ${res.open.length} clock${res.open.length === 1 ? '' : 's'} to act on.`);
  }

  window.addEventListener('hashchange', () => applyFragment(true));
  applyFragment(false);
}
