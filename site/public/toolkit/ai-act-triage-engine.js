// ai-act-triage-engine.js: the pure core of /toolkit/ai-act-triage. It reads
// the versioned question graph of src/data/triage.ts (the model the page puts
// in its JSON island) and turns answers into an indicative outcome, a
// classification decision record, its YAML form, the link state and the
// hand-off to the obligations planner. It holds no legal logic of its own:
// every rule, reason and date comes from the model, which is built from
// chapter 18. No DOM, no network, no side effects on import, so
// tests/ai-act-triage.spec.ts runs it in Node.
import { slug, mdCell } from './lib.js';

export const RECORD_KIND = 'aige.classification-decision-record';
export const RECORD_VERSION = 1;
export const RECORD_SCHEMA =
  'https://aigovernanceengineer.com/schemas/classification-decision-record.v1.json';
/** Version of the link format (the `v` key of the fragment). */
export const FRAGMENT_VERSION = 1;
/** Separator of several values in one fragment key. */
const SEP = ',';
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const TEXT_LIMITS = { name: 120, registryId: 80, purpose: 600, reviewer: 120, note: 1200 };

// ---- Conditions -----------------------------------------------------------------

/**
 * Evaluate one condition of the model against a context:
 * { answers: Map<questionId, string[]>, classes: Set, roles: Set, scope?: string }.
 */
export function holds(condition, ctx) {
  if (!condition || typeof condition !== 'object') return false;
  if ('all' in condition) return condition.all.every((c) => holds(c, ctx));
  if ('any' in condition) return condition.any.some((c) => holds(c, ctx));
  if ('not' in condition) return !holds(condition.not, ctx);
  if ('q' in condition) {
    const values = ctx.answers.get(condition.q);
    return Boolean(values && values.some((value) => condition.in.includes(value)));
  }
  if ('cls' in condition) return condition.cls.some((c) => ctx.classes.has(c));
  if ('role' in condition) return condition.role.some((r) => ctx.roles.has(r));
  if ('noRole' in condition) return ctx.roles.size === 0;
  if ('scope' in condition) return Boolean(ctx.scope) && condition.scope.includes(ctx.scope);
  return false;
}

// ---- Answers --------------------------------------------------------------------

/** Clean one raw answer against the question: known option values only, one
 *  value for a single-choice question, and an exclusive option ("None of
 *  these") dropped when real options sit beside it. */
function cleanValues(question, raw) {
  const list = Array.isArray(raw) ? raw : raw === undefined || raw === null ? [] : [raw];
  const known = new Set(question.options.map((option) => option.value));
  const values = [...new Set(list.map(String).filter((value) => known.has(value)))];
  if (question.kind === 'single') return values.slice(0, 1);
  const exclusive = new Set(
    question.options.filter((option) => option.exclusive).map((option) => option.value),
  );
  const real = values.filter((value) => !exclusive.has(value));
  return real.length ? real : values.slice(0, 1);
}

/**
 * Walk the graph in order. A question is visible when its `showIf` holds on
 * the answers to the visible questions before it; answers to hidden questions
 * are dropped. Returns the visible ids and the clean answers, as a plain object
 * `{ questionId: string[] }`.
 */
export function resolveAnswers(model, raw = {}) {
  const ctx = { answers: new Map(), classes: new Set(), roles: new Set() };
  /** @type {string[]} */
  const visible = [];
  /** @type {Record<string, string[]>} */
  const answers = {};
  for (const question of model.questions) {
    if (question.showIf && !holds(question.showIf, ctx)) continue;
    visible.push(question.id);
    const values = cleanValues(question, raw[question.id]);
    if (values.length) {
      ctx.answers.set(question.id, values);
      answers[question.id] = values;
    }
  }
  return { visible, answers, missing: visible.filter((id) => !answers[id]) };
}

// ---- Evaluation ---------------------------------------------------------------------

const reasonOf = (rule) => ({
  rule: rule.id,
  reason: rule.reason,
  article: rule.article,
  section: rule.section,
  sectionHref: rule.sectionHref,
});

/**
 * The indicative outcome of a set of answers, phase by phase: classes, then
 * roles, then scope, then notes and suggested re-review triggers. When the
 * scope phase ends out of scope, no class or role is given; what they would
 * be is kept apart in `ifInScope`, so the reader sees what the other answers
 * imply without reading it as a result.
 */
export function evaluate(model, raw = {}, { decidedAt } = {}) {
  const { visible, answers, missing } = resolveAnswers(model, raw);
  const ctx = {
    answers: new Map(Object.entries(answers)),
    classes: new Set(),
    roles: new Set(),
    scope: undefined,
  };

  const classReasons = new Map();
  for (const rule of model.classRules) {
    if (!holds(rule.when, ctx)) continue;
    ctx.classes.add(rule.cls);
    const entry = classReasons.get(rule.cls) ?? { appliesFrom: undefined, reasons: [] };
    entry.reasons.push(reasonOf(rule));
    // The earliest date among the rules that hold is the rung's first date.
    if (rule.appliesFrom && (!entry.appliesFrom || rule.appliesFrom < entry.appliesFrom)) {
      entry.appliesFrom = rule.appliesFrom;
    }
    classReasons.set(rule.cls, entry);
  }

  const roleReasons = new Map();
  for (const rule of model.roleRules) {
    if (!holds(rule.when, ctx)) continue;
    ctx.roles.add(rule.role);
    const list = roleReasons.get(rule.role) ?? [];
    list.push(reasonOf(rule));
    roleReasons.set(rule.role, list);
  }

  let scope = 'in-scope';
  const scopeReasons = [];
  for (const rule of model.scopeRules) {
    if (!holds(rule.when, ctx)) continue;
    scopeReasons.push({ ...reasonOf(rule), scope: rule.scope });
    if (rule.scope === 'out-of-scope') scope = 'out-of-scope';
    else if (scope === 'in-scope') scope = 'undetermined';
  }
  ctx.scope = scope;
  // Out of scope, nothing is assigned: notes and triggers must not follow from
  // classes or roles the result does not give.
  if (scope === 'out-of-scope') {
    ctx.classes = new Set();
    ctx.roles = new Set();
  }

  const notes = model.noteRules
    .filter((rule) => holds(rule.when, ctx))
    .map((rule) => ({ id: rule.id, kind: rule.kind, ...reasonOf(rule) }));

  const suggestedTriggers = model.reReviewTriggers
    .filter((trigger) => trigger.suggestWhen && holds(trigger.suggestWhen, ctx))
    .map((trigger) => trigger.id);

  const classes = model.classOrder
    .filter((id) => classReasons.has(id))
    .map((id) => {
      const entry = classReasons.get(id);
      const label = model.classLabels[id];
      return {
        id,
        label: label.label,
        article: label.article,
        appliesFrom: entry.appliesFrom ?? null,
        timing: timing(entry.appliesFrom, decidedAt),
        reasons: entry.reasons,
      };
    });
  const roles = Object.keys(model.roleLabels)
    .filter((id) => roleReasons.has(id))
    .map((id) => ({
      id,
      label: model.roleLabels[id].label,
      article: model.roleLabels[id].article,
      reasons: roleReasons.get(id),
    }));

  const out = scope === 'out-of-scope';
  return {
    complete: missing.length === 0,
    visible,
    missing,
    answers,
    scope: { status: scope, reasons: scopeReasons },
    classes: out ? [] : classes,
    roles: out ? [] : roles,
    ifInScope: out ? { classes, roles } : null,
    notes,
    suggestedTriggers,
    answerRows: answerRows(model, visible, answers),
  };
}

/** Whether a rung's first date is already past on the decision date. */
function timing(appliesFrom, decidedAt) {
  if (!appliesFrom) return 'no-date';
  if (!decidedAt || !DATE_RE.test(decidedAt)) return 'dated';
  return decidedAt >= appliesFrom ? 'applies' : 'applies-later';
}

/** One row per answered, visible question: the reason behind each answer. */
function answerRows(model, visible, answers) {
  return visible
    .filter((id) => answers[id])
    .map((id) => {
      const question = model.questions.find((q) => q.id === id);
      const chosen = question.options.filter((option) => answers[id].includes(option.value));
      return {
        question: id,
        prompt: question.prompt,
        article: question.article,
        eurLexHref: question.eurLexHref,
        sectionHref: question.sectionHref,
        values: chosen.map((option) => option.value),
        labels: chosen.map((option) => option.label),
        means: chosen.map((option) => option.means),
      };
    });
}

// ---- Summary sentences -----------------------------------------------------------------

const SCOPE_WORDS = {
  'in-scope': 'In scope',
  'out-of-scope': 'Out of scope',
  undetermined: 'Scope not settled',
};

export function scopeWords(status) {
  return SCOPE_WORDS[status] ?? status;
}

const joinList = (items) =>
  items.length <= 1
    ? items.join('')
    : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** One paragraph a reviewer can read aloud: scope, roles, classes, open points. */
export function summarise(evaluation) {
  const parts = [`${scopeWords(evaluation.scope.status)} (indicative).`];
  if (evaluation.scope.status === 'out-of-scope') {
    parts.push(evaluation.scope.reasons.find((r) => r.scope === 'out-of-scope')?.reason ?? '');
  } else {
    parts.push(
      evaluation.roles.length
        ? `Roles: ${joinList(evaluation.roles.map((r) => `${r.label} (${r.article})`))}.`
        : 'No EU operator role on these answers.',
    );
    parts.push(
      evaluation.classes.length
        ? `Classes: ${joinList(
            evaluation.classes.map(
              (c) => `${c.label}${c.appliesFrom ? `, from ${c.appliesFrom}` : ''}`,
            ),
          )}.`
        : 'No class on these answers.',
    );
  }
  const open = evaluation.notes.filter((n) => n.kind === 'open').length;
  if (open) parts.push(`${open} open point${open > 1 ? 's' : ''} to settle.`);
  return parts.filter(Boolean).join(' ');
}

// ---- The decision record ------------------------------------------------------------------

const clip = (text, max) =>
  String(text ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim()
    .slice(0, max);

/** Normalise the record details the reader types. */
export function cleanMeta(model, meta = {}) {
  const states = new Set(model.legalReviewStates.map((s) => s.value));
  const triggerIds = new Set(model.reReviewTriggers.map((t) => t.id));
  const oneLine = (text, max) => clip(String(text ?? '').replace(/\s+/g, ' '), max);
  return {
    name: oneLine(meta.name, TEXT_LIMITS.name),
    registryId: oneLine(meta.registryId, TEXT_LIMITS.registryId),
    purpose: clip(meta.purpose, TEXT_LIMITS.purpose),
    reviewer: oneLine(meta.reviewer, TEXT_LIMITS.reviewer),
    decidedAt: DATE_RE.test(String(meta.decidedAt ?? '')) ? String(meta.decidedAt) : '',
    legalReview: states.has(meta.legalReview) ? meta.legalReview : 'pending',
    triggers: [...new Set((meta.triggers ?? []).filter((id) => triggerIds.has(id)))],
    reviewBy: DATE_RE.test(String(meta.reviewBy ?? '')) ? String(meta.reviewBy) : '',
    note: clip(meta.note, TEXT_LIMITS.note),
  };
}

/** The record id: stable for the same system and date, so a re-export of the
 *  same decision keeps its id. */
export function recordId(meta) {
  const base = slug(meta.registryId || meta.name) || 'system';
  return `cdr-${meta.decidedAt || 'undated'}-${base}`;
}

/**
 * Build the classification decision record (schema
 * classification-decision-record.v1.json) from the model, the evaluation and
 * the cleaned record details. `context` carries the page URL, the notice and
 * the link that reproduces the triage.
 */
export function buildRecord(model, evaluation, meta, context) {
  const high = evaluation.classes.map((c) => c.id);
  const answers = evaluation.answers;
  const profiling = answers.profiling?.[0];
  const rationale = [summarise(evaluation), meta.note ? `Reviewer note: ${meta.note}` : '']
    .filter(Boolean)
    .join('\n\n');

  const record = {
    $schema: RECORD_SCHEMA,
    kind: RECORD_KIND,
    version: RECORD_VERSION,
    record_id: recordId(meta),
    system: {
      name: meta.name,
      ...(meta.registryId ? { registry_id: meta.registryId } : {}),
      intended_purpose: meta.purpose,
    },
    question_set: {
      id: model.questionSet.id,
      version: model.questionSet.version,
      as_of: model.questionSet.asOf,
      basis: model.questionSet.basis,
      url: context.page,
    },
    answers: evaluation.answerRows.map((row) => ({
      question: row.question,
      article: row.article,
      values: row.values,
      labels: row.labels,
      means: row.means,
    })),
    outcome: {
      scope: evaluation.scope.status,
      scope_reasons: evaluation.scope.reasons.map((r) => `${r.reason} (${r.article})`),
      roles: evaluation.roles.map((role) => ({
        role: role.id,
        label: role.label,
        article: role.article,
        reasons: role.reasons.map((r) => `${r.reason} (${r.article})`),
      })),
      classes: evaluation.classes.map((cls) => ({
        class: cls.id,
        label: cls.label,
        article: cls.article,
        ...(cls.appliesFrom ? { applies_from: cls.appliesFrom } : {}),
        reasons: cls.reasons.map((r) => `${r.reason} (${r.article})`),
      })),
      high_risk_screen: {
        annex_i: answers.annex1?.[0] ?? 'not-asked',
        annex_iii_areas: (answers.annex3 ?? []).filter((v) => v !== 'none'),
        art_6_3_conditions: (answers['art6-3'] ?? []).filter((v) => v !== 'none'),
        profiling: profiling === 'yes' ? true : profiling === 'no' ? false : null,
        high_risk: high.includes('high-risk-annex-i') || high.includes('high-risk-annex-iii'),
      },
      open_points: evaluation.notes.filter((n) => n.kind === 'open').map((n) => n.reason),
      notes: evaluation.notes.filter((n) => n.kind === 'info').map((n) => n.reason),
    },
    rationale,
    reviewer: meta.reviewer,
    decided_at: meta.decidedAt,
    legal_review: meta.legalReview,
    re_review: {
      triggers: meta.triggers,
      ...(meta.reviewBy ? { review_by: meta.reviewBy } : {}),
    },
    notice: context.notice,
    link: context.link,
  };
  return record;
}

// ---- YAML ----------------------------------------------------------------------------------

const PLAIN_KEY = /^[A-Za-z_$][A-Za-z0-9_$-]*$/;
/** A JSON string is a valid YAML 1.2 double-quoted scalar; keep every string
 *  quoted, so no value is ever read as a number, a boolean or a null. */
const scalar = (value) => {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean' || typeof value === 'number') return String(value);
  return JSON.stringify(String(value));
};
const yamlKey = (key) => (PLAIN_KEY.test(key) ? key : JSON.stringify(key));

/** Block-style YAML 1.2 for a JSON-shaped value (objects, arrays, scalars). */
export function toYaml(value, indent = 0) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return `${pad}[]\n`;
    return value
      .map((item) => {
        if (item !== null && typeof item === 'object' && Object.keys(item).length) {
          const body = toYaml(item, indent + 2);
          return `${pad}- ${body.slice(indent + 2)}`;
        }
        return `${pad}- ${inline(item)}\n`;
      })
      .join('');
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return `${pad}{}\n`;
    return entries
      .map(([key, v]) => {
        if (v !== null && typeof v === 'object' && (Array.isArray(v) ? v.length : Object.keys(v).length)) {
          return `${pad}${yamlKey(key)}:\n${toYaml(v, indent + 2)}`;
        }
        return `${pad}${yamlKey(key)}: ${inline(v)}\n`;
      })
      .join('');
  }
  return `${pad}${scalar(value)}\n`;
}

function inline(value) {
  if (Array.isArray(value)) return '[]';
  if (value !== null && typeof value === 'object') return '{}';
  return scalar(value);
}

// ---- Markdown report --------------------------------------------------------------------------

export function recordMarkdown(model, record, evaluation, { chapterUrl }) {
  const lines = [
    `# Classification decision: ${record.system.name}`,
    '',
    `> ${record.notice.split('. ')[0]}.`,
    '',
    `Record \`${record.record_id}\`, decided on ${record.decided_at || 'an unstated date'} by ${record.reviewer || 'an unstated reviewer'}. Question set ${record.question_set.id} ${record.question_set.version} (as of ${record.question_set.as_of}), read against ${record.question_set.basis}. Legal review: ${record.legal_review}.`,
    '',
    `**Intended purpose.** ${record.system.intended_purpose}`,
    '',
    '## Indicative outcome',
    '',
    `**Scope:** ${scopeWords(record.outcome.scope)}.`,
    ...record.outcome.scope_reasons.map((reason) => `- ${reason}`),
    '',
    '**Roles**',
    '',
  ];
  if (record.outcome.roles.length) {
    for (const role of record.outcome.roles) {
      lines.push(`- ${role.label} (${role.article}): ${role.reasons.join(' ')}`);
    }
  } else lines.push('- None on these answers.');
  lines.push('', '**Classes**', '');
  if (record.outcome.classes.length) {
    for (const cls of record.outcome.classes) {
      lines.push(
        `- ${cls.label} (${cls.article})${cls.applies_from ? `, applies from ${cls.applies_from}` : ''}: ${cls.reasons.join(' ')}`,
      );
    }
  } else lines.push('- None on these answers.');
  if (evaluation.ifInScope) {
    const would = [
      ...evaluation.ifInScope.roles.map((r) => r.label),
      ...evaluation.ifInScope.classes.map((c) => c.label),
    ];
    if (would.length) {
      lines.push('', `If it were in scope, the other answers would give: ${would.join('; ')}.`);
    }
  }
  if (record.outcome.open_points.length) {
    lines.push('', '**Open points**', '', ...record.outcome.open_points.map((p) => `- ${p}`));
  }
  if (record.outcome.notes.length) {
    lines.push('', '**What follows**', '', ...record.outcome.notes.map((p) => `- ${p}`));
  }
  lines.push(
    '',
    '## Answers and what each one means',
    '',
    '| Question | Answer | Article | What it means |',
    '|---|---|---|---|',
    ...evaluation.answerRows.map(
      (row) =>
        `| ${mdCell(row.prompt)} | ${mdCell(row.labels.join('; '))} | ${mdCell(row.article)} | ${mdCell(row.means.join(' '))} |`,
    ),
    '',
    '## Re-review',
    '',
  );
  const triggerLabel = new Map(model.reReviewTriggers.map((t) => [t.id, t.label]));
  if (record.re_review.triggers.length) {
    lines.push(...record.re_review.triggers.map((id) => `- ${triggerLabel.get(id) ?? id}`));
  } else lines.push('- No trigger chosen.');
  if (record.re_review.review_by) lines.push(`- Review by ${record.re_review.review_by} at the latest.`);
  lines.push(
    '',
    '---',
    '',
    `Triage link: ${record.link}`,
    '',
    `Made with the EU AI Act role and risk-class triage at ${record.question_set.url}, built from chapter 18 of the AI Governance Engineering Body of Knowledge (${chapterUrl}). An engineer's reading, not legal advice: counsel confirms the reading. Mappings are illustrative, not a claim of conformity.`,
  );
  return `${lines.join('\n')}\n`;
}

// ---- Link state -----------------------------------------------------------------------------

/** Answers and record details -> fragment params (encoded by lib.js). */
export function stateToParams(model, answers, meta) {
  const params = { v: FRAGMENT_VERSION, qs: model.questionSet.version };
  for (const question of model.questions) {
    const values = answers[question.id];
    if (values?.length) params[question.id] = values.join(SEP);
  }
  const m = meta ?? {};
  Object.assign(params, {
    n: m.name || undefined,
    rid: m.registryId || undefined,
    p: m.purpose || undefined,
    r: m.reviewer || undefined,
    d: m.decidedAt || undefined,
    lr: m.legalReview && m.legalReview !== 'pending' ? m.legalReview : undefined,
    t: m.triggers?.length ? m.triggers.join(SEP) : undefined,
    rb: m.reviewBy || undefined,
    note: m.note || undefined,
  });
  return params;
}

/** Fragment params -> { answers, meta, questionSetVersion, known } or null
 *  when the fragment carries no triage state (a plain `#anchor`). */
export function paramsToState(model, params) {
  if (!params || String(params.v) !== String(FRAGMENT_VERSION)) return null;
  /** @type {Record<string, string[]>} */
  const answers = {};
  for (const question of model.questions) {
    if (params[question.id]) answers[question.id] = String(params[question.id]).split(SEP);
  }
  const meta = {
    name: params.n,
    registryId: params.rid,
    purpose: params.p,
    reviewer: params.r,
    decidedAt: params.d,
    legalReview: params.lr,
    triggers: params.t ? String(params.t).split(SEP) : [],
    reviewBy: params.rb,
    note: params.note,
    triggersGiven: Boolean(params.t),
  };
  return { answers, meta, questionSetVersion: params.qs ? String(params.qs) : null };
}

// ---- Hand-off to the obligations planner ------------------------------------------------------

/**
 * The fragment params that open /toolkit/obligations-planner prefiltered, in the
 * planner's own format: `v`, `r` (role codes), `c` (class codes), `d` (the
 * reference date: the decision date), joined by "."; plus `from` and `qs` as
 * provenance. The codes come from `model.plannerHandoff`. Null when out of
 * scope or when no role maps to the planner (it needs at least one).
 */
export function plannerParams(model, evaluation, decidedAt) {
  if (evaluation.scope.status === 'out-of-scope') return null;
  const handoff = model.plannerHandoff;
  const systemic = evaluation.classes.some((c) => c.id === 'gpai-systemic');
  const roles = [];
  for (const role of evaluation.roles) {
    let code = handoff.roleCodes[role.id];
    if (role.id === 'eu-gpai-provider' && systemic) code = handoff.systemicGpaiRoleCode;
    if (code && !roles.includes(code)) roles.push(code);
  }
  if (!roles.length) return null;
  const classes = [];
  for (const cls of evaluation.classes) {
    const code = handoff.classCodes[cls.id];
    if (code && !classes.includes(code)) classes.push(code);
  }
  return {
    v: handoff.version,
    r: roles.join('.'),
    c: classes.join('.'),
    d: decidedAt && DATE_RE.test(decidedAt) ? decidedAt : undefined,
    from: 'ai-act-triage',
    qs: model.questionSet.version,
  };
}

// ---- Re-opening a record ------------------------------------------------------------------------

const major = (version) => String(version ?? '').split('.')[0];

/**
 * Read a classification decision record back into answers and details. The
 * outcome in the file is ignored: the triage recomputes it from the answers.
 * Throws an Error with a message for the reader when the file is not a record
 * of this kind. `warnings` lists what could not be carried over.
 */
export function recordToState(model, json) {
  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    throw new Error('That file is not a classification decision record.');
  }
  if (json.kind !== RECORD_KIND) {
    throw new Error(`That file is not a classification decision record ("kind" must be "${RECORD_KIND}").`);
  }
  if (json.version !== RECORD_VERSION) {
    throw new Error(`That record is version ${json.version}; this tool reads version ${RECORD_VERSION}.`);
  }
  if (json.question_set?.id !== model.questionSet.id) {
    throw new Error('That record was made with a different question set.');
  }
  if (!Array.isArray(json.answers)) throw new Error('That record has no answers to re-open.');
  /** @type {string[]} */
  const warnings = [];
  const fileVersion = String(json.question_set.version ?? '');
  if (fileVersion !== model.questionSet.version) {
    warnings.push(
      `The record was made with question set ${fileVersion || 'of unknown version'}; this page runs ${model.questionSet.version}${major(fileVersion) !== major(model.questionSet.version) ? ', a different major version' : ''}. Check every answer before you file it again.`,
    );
  }
  /** @type {Record<string, string[]>} */
  const answers = {};
  for (const row of json.answers) {
    const question = model.questions.find((q) => q.id === row?.question);
    if (!question) {
      warnings.push(`Question "${String(row?.question)}" no longer exists; its answer was dropped.`);
      continue;
    }
    const values = Array.isArray(row.values) ? row.values.map(String) : [];
    const kept = values.filter((v) => question.options.some((o) => o.value === v));
    if (kept.length !== values.length) {
      warnings.push(`Some answers to "${question.prompt}" are no longer options and were dropped.`);
    }
    if (kept.length) answers[question.id] = kept;
  }
  const meta = {
    name: json.system?.name,
    registryId: json.system?.registry_id,
    purpose: json.system?.intended_purpose,
    reviewer: json.reviewer,
    decidedAt: json.decided_at,
    legalReview: json.legal_review,
    triggers: Array.isArray(json.re_review?.triggers) ? json.re_review.triggers : [],
    reviewBy: json.re_review?.review_by,
    note: noteFromRationale(json.rationale),
    triggersGiven: true,
  };
  return { answers, meta, warnings };
}

function noteFromRationale(text) {
  const match = /Reviewer note: ([\s\S]*)$/.exec(String(text ?? ''));
  return match ? match[1].trim() : '';
}

