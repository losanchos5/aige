// policy-card-core.js: the generators of the Policy Card builder
// (/toolkit/policy-card). Pure functions with no DOM access and no side effects
// at import, so tests/policy-card.spec.ts and scripts/policy-card-samples.mjs
// run them in Node exactly as the page runs them in the browser.
//
// From one rule template (src/data/policy-card.ts, passed in as data) and the
// reader's values it builds:
//   - the Policy Card as a record for machines (JSON and YAML) that validates
//     against /schemas/policy-card.v1.json, and as Markdown for people;
//   - an OPA/Rego module (Rego v1 syntax) with a verdict rule, and its unit
//     tests for `opa test`;
//   - a Cedar stub and its tests for `cedar run-tests`;
//   - an example input document and the CI hook (a GitHub Actions workflow)
//     that checks, tests and evaluates the rule.
// Everything is illustrative and must be reviewed before use. Nothing here
// sends data anywhere.

export const SCHEMA_ID = 'https://aigovernanceengineer.com/schemas/policy-card.v1.json';
export const TOOL_URL = 'https://aigovernanceengineer.com/toolkit/policy-card';
export const SITE_URL = 'https://aigovernanceengineer.com';
export const REVIEW_NOTE = 'Illustrative, review before use.';
export const LEGAL_NOTE = 'Indicative, not legal advice and not a conformity claim.';
/** Version of the link-state format (the `v` key of the fragment). */
export const STATE_VERSION = 1;

// ---- What the reader may type -------------------------------------------------
// Values that end up inside generated code are restricted to characters that
// need no escaping in Rego, Cedar, YAML or a file name; free text only ever
// lands in comments and quoted strings, with line breaks removed.

const TOKEN_RE = /^[A-Za-z0-9][A-Za-z0-9._:/@+-]{0,79}$/;
const CARD_ID_RE = /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/;
const RULE_ID_RE = /^[a-z0-9](?:[a-z0-9._-]{0,78}[a-z0-9])?$/;
const VERSION_RE = /^[0-9A-Za-z][0-9A-Za-z.+-]{0,31}$/;
const LABEL_RE = /^[A-Za-z0-9*][A-Za-z0-9 ._:/@*=+-]{0,79}$/;
const PATH_RE = /^[a-z_][a-z0-9_]*(?:\.[a-z_][a-z0-9_]*){0,5}$/;
const INT_RE = /^-?\d{1,9}$/;
const DECIMAL_RE = /^-?\d{1,9}(?:\.\d{1,4})?$/;
const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

// Words that cannot be a path segment or a package name in Rego or Cedar.
const RESERVED = new Set([
  'as', 'contains', 'default', 'else', 'every', 'false', 'if', 'import', 'in', 'not', 'null',
  'package', 'some', 'true', 'with', 'data', 'input', 'has', 'is', 'like', 'then', 'permit',
  'forbid', 'when', 'unless', 'principal', 'action', 'resource', 'context', '__cedar',
]);

const OPERATORS = {
  missing: 'is missing',
  equals: 'equals',
  not_equals: 'does not equal',
  lt: 'is below',
  gt: 'is above',
  one_of: 'is one of',
  not_one_of: 'is not one of',
};

const EFFECTS = ['deny', 'require_approval', 'alert', 'allow'];
const POINTS = ['pre_merge', 'deploy', 'runtime', 'periodic'];

/** Collapse whitespace, drop control characters, trim and cut to `max`.
 *  @param {unknown} value @param {number} [max] @returns {string} */
export function cleanText(value, max = 300) {
  return String(value ?? '')
    .replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .trim();
}

/** 'a, b,,c' -> ['a', 'b', 'c'] (trimmed, empty items dropped, duplicates removed).
 *  @param {unknown} text @returns {string[]} */
export function splitList(text) {
  const out = [];
  for (const item of String(text ?? '').split(/[,\n]/)) {
    const value = item.trim();
    if (value && !out.includes(value)) out.push(value);
  }
  return out;
}

function parseDate(text) {
  const m = DATE_RE.exec(String(text ?? ''));
  if (!m) return null;
  const [, y, mo, d] = m.map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== mo - 1 || date.getUTCDate() !== d) {
    return null;
  }
  return date;
}

/** 'YYYY-MM-DD' plus `days` (may be negative). @returns {string} */
export function addDays(iso, days) {
  const date = parseDate(iso);
  if (!date) throw new Error(`addDays: "${iso}" is not a date`);
  return new Date(date.getTime() + days * 86_400_000).toISOString().slice(0, 10);
}

/** 'YYYY-MM-DD' plus `months`, clamped to the last day of the target month. */
export function addMonths(iso, months) {
  const date = parseDate(iso);
  if (!date) throw new Error(`addMonths: "${iso}" is not a date`);
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + months;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  const out = new Date(Date.UTC(y, m, Math.min(date.getUTCDate(), last)));
  return out.toISOString().slice(0, 10);
}

/** Card id -> file base name and Rego package segment. */
export function namesFor(cardId) {
  const base = String(cardId).replace(/_/g, '-');
  return { base, pkg: base.replace(/-/g, '_') };
}

// ---- Values: defaults, reading, checking ------------------------------------------

/**
 * The raw (string) values of a template's form, from its defaults.
 * @param {any} template
 * @param {{ today: string }} options
 */
export function defaultValues(template, { today }) {
  const params = {};
  for (const param of template.params) params[param.key] = param.default;
  const effectiveFrom = parseDate(today) ? today : '2026-10-01';
  return {
    template: template.id,
    params,
    cardId: template.cardId,
    version: '1.0.0',
    title: template.cardTitle,
    owner: 'ai-governance-engineering',
    approver: 'ai-governance-committee',
    appliesTo: template.appliesTo.join(', '),
    sourcePolicy: template.sourcePolicy,
    effectiveFrom,
    reviewBy: addMonths(effectiveFrom, 6),
    exceptions:
      'Requested by the system owner, approved by the AI governance committee for at most 90 days, and recorded as a signed verdict override with an expiry.',
    ruleId: template.ruleId,
    statement: template.statement,
    failureMode: template.failureMode,
    effect: template.effect,
    enforcement: [...template.enforcementPoints],
    obligations: [...template.obligations],
    otherRefs: '',
  };
}

function parseParam(param, raw, errors, field) {
  const text = cleanText(raw, 400);
  const fail = (message) => {
    errors.push({ field, message: `${param.label}: ${message}` });
    return undefined;
  };
  switch (param.kind) {
    case 'token':
      if (!TOKEN_RE.test(text) || RESERVED.has(text)) {
        return fail('use letters, digits and . _ : / @ + - only, no spaces.');
      }
      return text;
    case 'tokens': {
      const list = splitList(text);
      if (!list.length && !param.optional) return fail('give at least one value.');
      if (list.some((item) => !TOKEN_RE.test(item))) {
        return fail('separate values with commas; each uses letters, digits and . _ : / @ + - only.');
      }
      if (list.length > 20) return fail('keep it to 20 values or fewer.');
      return list;
    }
    case 'int': {
      if (!INT_RE.test(text)) return fail('enter a whole number.');
      const n = Number(text);
      if (n < (param.min ?? -Infinity) || n > (param.max ?? Infinity)) {
        return fail(`enter a number from ${param.min} to ${param.max}.`);
      }
      return n;
    }
    case 'decimal': {
      if (!DECIMAL_RE.test(text)) return fail('enter a number with at most four decimal places.');
      const n = Number(text);
      if (n < (param.min ?? -Infinity) || n > (param.max ?? Infinity)) {
        return fail(`enter a number above zero, at most ${param.max}.`);
      }
      return { text: decimalText(text), value: n };
    }
    case 'path':
      if (!PATH_RE.test(text) || text.split('.').some((seg) => RESERVED.has(seg))) {
        return fail('use a dot path of snake_case names, for example system.risk_tier.');
      }
      return text;
    case 'operator':
      if (!Object.hasOwn(OPERATORS, text)) return fail('choose an operator.');
      return text;
    case 'value':
      return text;
    default:
      return fail('unknown parameter kind.');
  }
}

/** '0.90' -> '0.90', '1' -> '1.0', '007.5' -> '7.5' (Cedar decimals need one to four places). */
function decimalText(text) {
  const frac = String(text).split('.')[1] ?? '';
  return Number(text).toFixed(Math.min(Math.max(frac.length, 1), 4));
}

/** Read the custom rule's value for its operator: a string, a number, a boolean or a list. */
function parseCustomValue(operator, raw, errors) {
  const text = cleanText(raw, 400);
  const fail = (message) => {
    errors.push({ field: 'param-value', message: `Value: ${message}` });
    return undefined;
  };
  const scalar = (item) => {
    if (DECIMAL_RE.test(item)) {
      return INT_RE.test(item)
        ? { type: 'int', value: Number(item), text: String(Number(item)) }
        : { type: 'decimal', value: Number(item), text: decimalText(item) };
    }
    if (item === 'true' || item === 'false') return { type: 'bool', value: item === 'true' };
    if (TOKEN_RE.test(item)) return { type: 'string', value: item };
    return null;
  };
  if (operator === 'missing') return null;
  if (operator === 'one_of' || operator === 'not_one_of') {
    const list = splitList(text).map(scalar);
    if (!list.length) return fail('give at least one value, comma-separated.');
    if (list.some((item) => item === null)) {
      return fail('each value is a word (letters, digits and . _ : / @ + -), a number or true/false.');
    }
    return list;
  }
  if (!text) return fail('enter a value.');
  const value = scalar(text);
  if (!value) return fail('enter a word (letters, digits and . _ : / @ + -), a number or true/false.');
  if ((operator === 'lt' || operator === 'gt') && value.type !== 'int' && value.type !== 'decimal') {
    return fail('"is below" and "is above" compare numbers; enter a number.');
  }
  return value;
}

/**
 * Check the raw values and return typed ones.
 * @param {any} template
 * @param {any} raw
 * @param {{ obligationIds: Iterable<string> }} options
 * @returns {{ ok: boolean, errors: Array<{ field: string, message: string }>, values: any }}
 */
export function checkValues(template, raw, { obligationIds }) {
  const errors = [];
  const known = new Set(obligationIds);
  const params = {};
  for (const param of template.params) {
    if (param.kind === 'value') continue;
    params[param.key] = parseParam(param, raw.params?.[param.key], errors, `param-${param.key}`);
  }
  const custom = template.id === 'custom';
  if (custom && params.operator) {
    params.value = parseCustomValue(params.operator, raw.params?.value, errors);
  }

  const need = (field, label, value, re, hint) => {
    if (!value) errors.push({ field, message: `${label}: this is required.` });
    else if (re && !re.test(value)) errors.push({ field, message: `${label}: ${hint}` });
    return value;
  };

  const cardId = need(
    'cardId',
    'Card id',
    cleanText(raw.cardId, 60),
    CARD_ID_RE,
    'lower-case letters and digits, joined by - or _, starting with a letter (for example pc-eval-score-gate).',
  );
  if (cardId && RESERVED.has(namesFor(cardId).pkg)) {
    errors.push({ field: 'cardId', message: 'Card id: that word is reserved in Rego or Cedar.' });
  }
  const version = need('version', 'Version', cleanText(raw.version, 32), VERSION_RE, 'letters, digits and . + - only (for example 1.0.0).');
  const title = need('title', 'Title', cleanText(raw.title, 120));
  const owner = need('owner', 'Owner', cleanText(raw.owner, 80), LABEL_RE, 'a role or team, not a personal name; letters, digits, spaces and . _ : / @ = + -.');
  const approverText = cleanText(raw.approver, 80);
  if (approverText && !LABEL_RE.test(approverText)) {
    errors.push({ field: 'approver', message: 'Approving role: letters, digits, spaces and . _ : / @ = + - only.' });
  }
  const appliesTo = splitList(raw.appliesTo).map((item) => cleanText(item, 80));
  if (!appliesTo.length) errors.push({ field: 'appliesTo', message: 'Applies to: name at least one registry id or selector.' });
  else if (appliesTo.some((item) => !LABEL_RE.test(item))) {
    errors.push({ field: 'appliesTo', message: 'Applies to: separate entries with commas; letters, digits, spaces and . _ : / @ * = + - only.' });
  }
  const sourcePolicy = cleanText(raw.sourcePolicy, 160);
  const ruleId = need('ruleId', 'Rule id', cleanText(raw.ruleId, 80), RULE_ID_RE, 'lower-case letters, digits and . _ -, ending in a version (for example evals.min-score.v1).');

  const effectiveFrom = cleanText(raw.effectiveFrom, 10);
  const reviewBy = cleanText(raw.reviewBy, 10);
  if (!parseDate(effectiveFrom)) errors.push({ field: 'effectiveFrom', message: 'Effective from: enter a date as YYYY-MM-DD.' });
  if (!parseDate(reviewBy)) errors.push({ field: 'reviewBy', message: 'Review by: enter a date as YYYY-MM-DD.' });
  else if (parseDate(effectiveFrom) && reviewBy <= effectiveFrom) {
    errors.push({ field: 'reviewBy', message: 'Review by: pick a date after the effective date.' });
  }
  const exceptions = cleanText(raw.exceptions, 400);

  let statement = template.statement;
  let failureMode = template.failureMode;
  let effect = template.effect;
  let enforcement = [...template.enforcementPoints];
  if (custom) {
    statement = need('statement', 'Rule statement', cleanText(raw.statement, 300));
    failureMode = need('failureMode', 'Failure mode', cleanText(raw.failureMode, 300));
    effect = EFFECTS.includes(raw.effect) ? raw.effect : '';
    if (!effect) errors.push({ field: 'effect', message: 'Effect: choose one.' });
    enforcement = POINTS.filter((point) => (raw.enforcement ?? []).includes(point));
    if (!enforcement.length) errors.push({ field: 'enforcement', message: 'Enforced at: choose at least one point.' });
  }

  const obligations = [];
  for (const id of raw.obligations ?? []) {
    const clean = String(id).toUpperCase();
    if (known.has(clean) && !obligations.includes(clean)) obligations.push(clean);
  }
  const otherRefs = splitList(raw.otherRefs).map((item) => cleanText(item, 100)).filter(Boolean);
  if (otherRefs.length > 8) errors.push({ field: 'otherRefs', message: 'Other references: keep it to eight or fewer.' });
  if (!obligations.length && !otherRefs.length) {
    errors.push({ field: 'obligations', message: 'Obligations answered: tick at least one obligation, or name another reference.' });
  }

  const values = {
    template: template.id,
    params,
    cardId,
    version,
    title,
    owner,
    approver: approverText,
    appliesTo,
    sourcePolicy,
    effectiveFrom,
    reviewBy,
    exceptions,
    ruleId,
    statement,
    failureMode,
    effect,
    enforcement,
    obligations,
    otherRefs: otherRefs.slice(0, 8),
  };
  return { ok: errors.length === 0, errors, values };
}

// ---- Text helpers -----------------------------------------------------------------

/** Replace `{key}` with the parameter's display text. */
export function fill(text, params) {
  return String(text ?? '').replace(/\{([a-z_]+)\}/g, (match, key) => {
    if (!Object.hasOwn(params, key)) return match;
    return displayParam(key, params[key]);
  });
}

function displayParam(key, value) {
  if (key === 'operator') return OPERATORS[value] ?? String(value);
  if (key === 'operations' && Array.isArray(value) && !value.length) return 'every operation';
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return value.map((item) => displayScalar(item)).join(', ');
  return displayScalar(value);
}

function displayScalar(value) {
  if (value && typeof value === 'object') return value.text ?? String(value.value);
  return String(value);
}

const lit = (value) => JSON.stringify(value);

/** A JSON value as Rego or JSON text, indented with tabs from `depth`. */
function jsonBlock(value, depth) {
  const pad = '\t'.repeat(depth);
  return JSON.stringify(value, null, '\t')
    .split('\n')
    .map((line, i) => (i === 0 ? line : pad + line))
    .join('\n');
}

const comment = (prefix, value) =>
  JSON.stringify(value, null, 2)
    .split('\n')
    .map((line) => `${prefix}   ${line}`)
    .join('\n');

const regoSet = (items) => (items.length ? `{${items.map(lit).join(', ')}}` : 'set()');
const cedarSet = (items) => `[${items.map(lit).join(', ')}]`;
const dt = (iso) => ({ __extn: { fn: 'datetime', arg: iso } });
const dec = (text) => ({ __extn: { fn: 'decimal', arg: text } });
const entity = (type, id) => `${type}::${lit(id)}`;

function otherToken(value, avoid = []) {
  let candidate = `${value}-other`;
  while (avoid.includes(candidate)) candidate += '-x';
  return candidate;
}

/** Scaled decimal arithmetic (four places): `text` plus `steps` of its own last place. */
function stepDecimal(text, steps) {
  const frac = text.split('.')[1] ?? '';
  const places = Math.max(frac.length, 2);
  const scale = 10 ** places;
  const scaled = Math.round(Number(text) * scale) + steps;
  const sign = scaled < 0 ? '-' : '';
  const abs = Math.abs(scaled);
  const whole = Math.floor(abs / scale);
  const rest = String(abs % scale).padStart(places, '0');
  return `${sign}${whole}.${rest}`;
}

// ---- The rule templates, executable side ------------------------------------------
// Each engine returns the Rego parameters and rules, the test cases (the first
// one is the compliant example input), the Cedar policy and the Cedar cases.
// A case's `expect` is the decision the module must return for its input.

const ENGINES = {
  'registered-agents-only': {
    regoParams: (p) => [`environment := ${lit(p.environment)}`],
    regoRules: () => `in_scope if input.environment == environment

entries contains e if {
	some e in input.registry
	e.id == input.agent.id
}

active(e) if e.status == "active"

deny contains msg if {
	in_scope
	not input.agent.id
	msg := sprintf("%s: the request names no agent", [rule_id])
}

deny contains msg if {
	in_scope
	not input.now
	msg := sprintf("%s: the request carries no evaluation date", [rule_id])
}

deny contains msg if {
	in_scope
	input.agent.id
	count(entries) == 0
	msg := sprintf("%s: agent %s has no entry in the agent registry", [rule_id, input.agent.id])
}

deny contains msg if {
	in_scope
	some e in entries
	not active(e)
	msg := sprintf("%s: registry entry %s is not active", [rule_id, e.id])
}

deny contains msg if {
	in_scope
	some e in entries
	not e.owner
	msg := sprintf("%s: registry entry %s names no owner", [rule_id, e.id])
}

deny contains msg if {
	in_scope
	some e in entries
	not e.expiry
	msg := sprintf("%s: registry entry %s has no expiry", [rule_id, e.id])
}

deny contains msg if {
	in_scope
	some e in entries
	e.expiry < input.now
	msg := sprintf("%s: registry entry %s expired on %s", [rule_id, e.id, e.expiry])
}`,
    cases: (p) => {
      const entry = {
        id: 'csa-01',
        version: '2026-09-22',
        owner: 'customer-service',
        scope: ['refunds'],
        expiry: '2027-03-31',
        status: 'active',
      };
      const base = (over = {}) => ({
        action: 'deploy',
        environment: p.environment,
        now: '2026-10-02',
        agent: { id: 'csa-01', version: '2026-09-22' },
        registry: [entry],
        ...over,
      });
      const other = p.environment === 'staging' ? 'development' : 'staging';
      return [
        { name: 'registered_active_agent_is_allowed', input: base(), expect: 'allow' },
        { name: 'unregistered_agent_is_denied', input: base({ agent: { id: 'shadow-07', version: '0.1.0' } }), expect: 'deny' },
        { name: 'expired_entry_is_denied', input: base({ registry: [{ ...entry, expiry: '2026-09-30' }] }), expect: 'deny' },
        { name: 'suspended_entry_is_denied', input: base({ registry: [{ ...entry, status: 'suspended' }] }), expect: 'deny' },
        { name: 'missing_date_is_denied', input: (() => { const x = base(); delete x.now; return x; })(), expect: 'deny' },
        { name: 'other_environment_is_out_of_scope', input: base({ environment: other, agent: { id: 'shadow-07', version: '0.1.0' } }), expect: 'allow' },
      ];
    },
    cedarRequest: 'principal Agent::"<agent id>", any action, resource Environment::"<environment>"',
    cedar: (p) => `forbid (
	principal,
	action,
	resource == ${entity('Environment', p.environment)}
)
unless {
	context has now &&
	context has registry_entry &&
	context.registry_entry has status &&
	context.registry_entry.status == "active" &&
	context.registry_entry has owner &&
	context.registry_entry has expiry &&
	context.registry_entry.expiry >= context.now
}`,
    cedarCases: (p) => {
      const other = p.environment === 'staging' ? 'development' : 'staging';
      const req = (context, env = p.environment) => ({
        principal: entity('Agent', 'csa-01'),
        action: entity('Action', 'deploy'),
        resource: entity('Environment', env),
        context,
      });
      const entry = { status: 'active', owner: 'customer-service', expiry: dt('2027-03-31') };
      return [
        { name: 'registered active agent is allowed', request: req({ now: dt('2026-10-02'), registry_entry: entry }), rule: false },
        { name: 'unregistered agent is denied', request: req({ now: dt('2026-10-02') }), rule: true },
        { name: 'expired entry is denied', request: req({ now: dt('2026-10-02'), registry_entry: { ...entry, expiry: dt('2026-09-30') } }), rule: true },
        { name: 'other environment is out of scope', request: req({ now: dt('2026-10-02') }, other), rule: false },
      ];
    },
  },

  'eval-score-gate': {
    regoParams: (p) => [
      `suite_id := ${lit(p.suite_id)}`,
      '',
      `min_score := ${p.min_score.text}`,
      '',
      'gated_actions := {"merge", "deploy"}',
    ],
    regoRules: () => `subject := sprintf("%s@%s", [input.system.id, input.system.version])

results contains r if {
	some r in input.eval_results
	r.suite_id == suite_id
	r.model_version == subject
}

deny contains msg if {
	input.action in gated_actions
	not subject
	msg := sprintf("%s: the request names no system id and version", [rule_id])
}

deny contains msg if {
	input.action in gated_actions
	count(results) == 0
	msg := sprintf("%s: no %s result for %s", [rule_id, suite_id, subject])
}

deny contains msg if {
	input.action in gated_actions
	some r in results
	not is_number(r.score)
	msg := sprintf("%s: the %s result for %s has no numeric score", [rule_id, suite_id, subject])
}

deny contains msg if {
	input.action in gated_actions
	some r in results
	r.score < min_score
	msg := sprintf("%s: %s scored %v on %s, below the minimum %v", [rule_id, subject, r.score, suite_id, min_score])
}`,
    cases: (p) => {
      const result = (score, version = 'credit-afford@3.2.0') => ({
        suite_id: p.suite_id,
        model_version: version,
        score,
        threshold: p.min_score.value,
        result: score >= p.min_score.value ? 'pass' : 'fail',
        timestamp: '2026-09-30T10:00:00Z',
      });
      const below = Number(stepDecimal(p.min_score.text, -1));
      const base = (results, action = 'deploy') => ({
        action,
        system: { id: 'credit-afford', version: '3.2.0' },
        eval_results: results,
      });
      return [
        { name: 'score_at_the_minimum_is_allowed', input: base([result(p.min_score.value)]), expect: 'allow' },
        { name: 'score_below_the_minimum_is_denied', input: base([result(below)]), expect: 'deny' },
        { name: 'missing_result_is_denied', input: base([]), expect: 'deny' },
        { name: 'result_for_another_version_is_denied', input: base([result(p.min_score.value, 'credit-afford@3.1.0')]), expect: 'deny' },
        { name: 'merge_is_gated_too', input: base([result(below)], 'merge'), expect: 'deny' },
      ];
    },
    cedarRequest: 'principal Pipeline::"<pipeline>", action Action::"merge" or Action::"deploy", resource System::"<system id>"',
    cedar: (p) => `forbid (
	principal,
	action in [Action::"merge", Action::"deploy"],
	resource
)
unless {
	context has subject &&
	context has eval &&
	context.eval has suite_id &&
	context.eval.suite_id == ${lit(p.suite_id)} &&
	context.eval has model_version &&
	context.eval.model_version == context.subject &&
	context.eval has score &&
	context.eval.score.greaterThanOrEqual(decimal(${lit(p.min_score.text)}))
}`,
    cedarCases: (p) => {
      const req = (context) => ({
        principal: entity('Pipeline', 'ci'),
        action: entity('Action', 'deploy'),
        resource: entity('System', 'credit-afford'),
        context: { subject: 'credit-afford@3.2.0', ...context },
      });
      const evalOf = (score, version = 'credit-afford@3.2.0') => ({
        suite_id: p.suite_id,
        model_version: version,
        score: dec(score),
      });
      return [
        { name: 'score at the minimum is allowed', request: req({ eval: evalOf(p.min_score.text) }), rule: false },
        { name: 'score below the minimum is denied', request: req({ eval: evalOf(stepDecimal(p.min_score.text, -1)) }), rule: true },
        { name: 'missing result is denied', request: req({}), rule: true },
        { name: 'result for another version is denied', request: req({ eval: evalOf(p.min_score.text, 'credit-afford@3.1.0') }), rule: true },
      ];
    },
  },

  'no-personal-data-external': {
    regoParams: (p) => [`blocked_classes := ${regoSet(p.blocked_classes)}`],
    regoRules: () => `internal_model if input.model.hosting == "internal"

deny contains msg if {
	input.action == "model_call"
	not internal_model
	some class in input.data_classes
	class in blocked_classes
	msg := sprintf("%s: %s data may not be sent to a model hosted outside the organisation", [rule_id, class])
}

deny contains msg if {
	input.action == "model_call"
	not internal_model
	not input.data_classes
	msg := sprintf("%s: the request carries no data classification, so it may not leave the organisation", [rule_id])
}`,
    cases: (p) => {
      const safe = ['public', 'internal'].filter((c) => !p.blocked_classes.includes(c));
      const classes = safe.length ? safe : [otherToken('public', p.blocked_classes)];
      const base = (over = {}) => ({
        action: 'model_call',
        caller: { id: 'support-assistant' },
        model: { id: 'vendor-llm', hosting: 'external' },
        data_classes: classes,
        ...over,
      });
      return [
        { name: 'unblocked_classes_may_go_external', input: base(), expect: 'allow' },
        { name: 'blocked_class_to_external_model_is_denied', input: base({ data_classes: [...classes, p.blocked_classes[0]] }), expect: 'deny' },
        { name: 'unclassified_request_is_denied', input: (() => { const x = base(); delete x.data_classes; return x; })(), expect: 'deny' },
        { name: 'blocked_class_to_internal_model_is_allowed', input: base({ model: { id: 'internal-llm', hosting: 'internal' }, data_classes: [p.blocked_classes[0]] }), expect: 'allow' },
      ];
    },
    cedarRequest: 'principal Service::"<caller>", action Action::"model_call", resource Model::"<model id>"',
    cedar: (p) => `forbid (
	principal,
	action == Action::"model_call",
	resource
)
unless { context has model_hosting && context.model_hosting == "internal" }
when {
	!(context has data_classes) ||
	context.data_classes.containsAny(${cedarSet(p.blocked_classes)})
}`,
    cedarCases: (p) => {
      const safe = ['public', 'internal'].filter((c) => !p.blocked_classes.includes(c));
      const classes = safe.length ? safe : [otherToken('public', p.blocked_classes)];
      const req = (context, model = 'vendor-llm') => ({
        principal: entity('Service', 'support-assistant'),
        action: entity('Action', 'model_call'),
        resource: entity('Model', model),
        context,
      });
      return [
        { name: 'unblocked classes may go external', request: req({ model_hosting: 'external', data_classes: classes }), rule: false },
        { name: 'blocked class to external model is denied', request: req({ model_hosting: 'external', data_classes: [...classes, p.blocked_classes[0]] }), rule: true },
        { name: 'unclassified request is denied', request: req({ model_hosting: 'external' }), rule: true },
        { name: 'blocked class to internal model is allowed', request: req({ model_hosting: 'internal', data_classes: [p.blocked_classes[0]] }, 'internal-llm'), rule: false },
      ];
    },
  },

  'approval-for-tool': {
    regoParams: (p) => [
      `tool := ${lit(p.tool)}`,
      '',
      '# An empty set holds every operation of the tool.',
      `operations := ${regoSet(p.operations)}`,
    ],
    regoRules: () => `governed if {
	input.action == "tool_call"
	input.call.tool == tool
	count(operations) == 0
}

governed if {
	input.action == "tool_call"
	input.call.tool == tool
	input.call.operation in operations
}

# Approved by a person other than the agent that makes the call.
approved if {
	input.approval.status == "approved"
	input.approval.approved_by != input.agent.id
}

require_approval contains msg if {
	governed
	not approved
	msg := sprintf("%s: this call to %s needs a recorded approval by a person other than the agent", [rule_id, tool])
}`,
    cases: (p) => {
      const operation = p.operations[0] ?? 'any_operation';
      const base = (over = {}) => ({
        action: 'tool_call',
        agent: { id: 'csa-01' },
        call: { tool: p.tool, operation },
        approval: { status: 'approved', approved_by: 'team-lead-07', ticket: 'APR-1042' },
        ...over,
      });
      const cases = [
        { name: 'approved_call_is_allowed', input: base(), expect: 'allow' },
        { name: 'call_without_approval_is_held', input: (() => { const x = base(); delete x.approval; return x; })(), expect: 'require_approval' },
        { name: 'self_approved_call_is_held', input: base({ approval: { status: 'approved', approved_by: 'csa-01', ticket: 'APR-1043' } }), expect: 'require_approval' },
        { name: 'other_tool_is_out_of_scope', input: (() => { const x = base({ call: { tool: otherToken(p.tool), operation } }); delete x.approval; return x; })(), expect: 'allow' },
      ];
      if (p.operations.length) {
        cases.push({
          name: 'other_operation_is_out_of_scope',
          input: (() => { const x = base({ call: { tool: p.tool, operation: otherToken(operation, p.operations) } }); delete x.approval; return x; })(),
          expect: 'allow',
        });
      }
      return cases;
    },
    cedarRequest: 'principal Agent::"<agent id>", action Action::"tool_call", resource Tool::"<tool>"',
    cedar: (p) => {
      const when = p.operations.length
        ? `\nwhen {\n\t!(context has operation) ||\n\t${cedarSet(p.operations)}.contains(context.operation)\n}`
        : '';
      return `forbid (
	principal,
	action == Action::"tool_call",
	resource == ${entity('Tool', p.tool)}
)${when}
unless {
	context has agent_id &&
	context has approval &&
	context.approval has status &&
	context.approval.status == "approved" &&
	context.approval has approved_by &&
	context.approval.approved_by != context.agent_id
}`;
    },
    cedarCases: (p) => {
      const operation = p.operations[0] ?? 'any_operation';
      const req = (context, tool = p.tool) => ({
        principal: entity('Agent', 'csa-01'),
        action: entity('Action', 'tool_call'),
        resource: entity('Tool', tool),
        context: { agent_id: 'csa-01', operation, ...context },
      });
      return [
        { name: 'approved call is allowed', request: req({ approval: { status: 'approved', approved_by: 'team-lead-07' } }), rule: false },
        { name: 'call without approval is held', request: req({}), rule: true },
        { name: 'self-approved call is held', request: req({ approval: { status: 'approved', approved_by: 'csa-01' } }), rule: true },
        { name: 'other tool is out of scope', request: req({}, otherToken(p.tool)), rule: false },
      ];
    },
  },

  'model-card-before-release': {
    regoParams: (p) => [
      `required_sections := ${regoSet(p.required_sections)}`,
      '',
      'gated_actions := {"merge", "release"}',
    ],
    regoRules: () => `subject := sprintf("%s@%s", [input.system.id, input.system.version])

card_for_subject if input.model_card.model_version == subject

deny contains msg if {
	input.action in gated_actions
	not subject
	msg := sprintf("%s: the request names no system id and version", [rule_id])
}

deny contains msg if {
	input.action in gated_actions
	not input.model_card
	msg := sprintf("%s: %s has no model card", [rule_id, subject])
}

deny contains msg if {
	input.action in gated_actions
	input.model_card
	not card_for_subject
	msg := sprintf("%s: the model card does not describe %s", [rule_id, subject])
}

deny contains msg if {
	input.action in gated_actions
	input.model_card
	some section in required_sections
	not section in object.get(input.model_card, "sections", [])
	msg := sprintf("%s: the model card for %s has no %s section", [rule_id, subject, section])
}`,
    cases: (p) => {
      const sections = [...p.required_sections, otherToken('training_data', p.required_sections)];
      const base = (over = {}, action = 'release') => ({
        action,
        system: { id: 'credit-afford', version: '3.2.0' },
        model_card: { model_version: 'credit-afford@3.2.0', sections },
        ...over,
      });
      const lacking = sections.filter((s) => s !== p.required_sections[p.required_sections.length - 1]);
      return [
        { name: 'complete_card_for_the_version_is_allowed', input: base(), expect: 'allow' },
        { name: 'missing_card_is_denied', input: (() => { const x = base(); delete x.model_card; return x; })(), expect: 'deny' },
        { name: 'missing_section_is_denied', input: base({ model_card: { model_version: 'credit-afford@3.2.0', sections: lacking } }), expect: 'deny' },
        { name: 'card_for_another_version_is_denied', input: base({ model_card: { model_version: 'credit-afford@3.1.0', sections } }), expect: 'deny' },
        { name: 'merge_is_gated_too', input: (() => { const x = base({}, 'merge'); delete x.model_card; return x; })(), expect: 'deny' },
      ];
    },
    cedarRequest: 'principal Pipeline::"<pipeline>", action Action::"merge" or Action::"release", resource System::"<system id>"',
    cedar: (p) => `forbid (
	principal,
	action in [Action::"merge", Action::"release"],
	resource
)
unless {
	context has subject &&
	context has model_card &&
	context.model_card has model_version &&
	context.model_card.model_version == context.subject &&
	context.model_card has sections &&
	context.model_card.sections.containsAll(${cedarSet(p.required_sections)})
}`,
    cedarCases: (p) => {
      const sections = [...p.required_sections, otherToken('training_data', p.required_sections)];
      const lacking = sections.filter((s) => s !== p.required_sections[p.required_sections.length - 1]);
      const req = (context) => ({
        principal: entity('Pipeline', 'release'),
        action: entity('Action', 'release'),
        resource: entity('System', 'credit-afford'),
        context: { subject: 'credit-afford@3.2.0', ...context },
      });
      return [
        { name: 'complete card for the version is allowed', request: req({ model_card: { model_version: 'credit-afford@3.2.0', sections } }), rule: false },
        { name: 'missing card is denied', request: req({}), rule: true },
        { name: 'missing section is denied', request: req({ model_card: { model_version: 'credit-afford@3.2.0', sections: lacking } }), rule: true },
        { name: 'card for another version is denied', request: req({ model_card: { model_version: 'credit-afford@3.1.0', sections } }), rule: true },
      ];
    },
  },

  'expired-exception-blocks-build': {
    regoParams: (p) => [
      `max_days := ${p.max_days}`,
      '',
      'gated_actions := {"merge", "build"}',
      '',
      'ns_per_day := 86400000000000',
    ],
    regoRules: () => `deny contains msg if {
	input.action in gated_actions
	not input.now
	msg := sprintf("%s: the request carries no evaluation date", [rule_id])
}

deny contains msg if {
	input.action in gated_actions
	some exc in input.exceptions
	not exc.expires
	msg := sprintf("%s: exception %s has no expiry", [rule_id, object.get(exc, "id", "(no id)")])
}

deny contains msg if {
	input.action in gated_actions
	some exc in input.exceptions
	not exc.granted
	msg := sprintf("%s: exception %s has no grant date", [rule_id, object.get(exc, "id", "(no id)")])
}

deny contains msg if {
	input.action in gated_actions
	some exc in input.exceptions
	exc.expires < input.now
	msg := sprintf("%s: exception %s expired on %s", [rule_id, object.get(exc, "id", "(no id)"), exc.expires])
}

deny contains msg if {
	input.action in gated_actions
	some exc in input.exceptions
	days := (time.parse_ns("2006-01-02", exc.expires) - time.parse_ns("2006-01-02", exc.granted)) / ns_per_day
	days > max_days
	msg := sprintf("%s: exception %s runs %v days, above the %v-day maximum", [rule_id, object.get(exc, "id", "(no id)"), days, max_days])
}`,
    cases: (p) => {
      const granted = '2026-10-01';
      const exc = (over = {}) => ({
        id: 'EXC-0042',
        rule_id: 'evals.min-score.v1',
        granted,
        expires: addDays(granted, p.max_days),
        approved_by_role: 'ai-governance-committee',
        ...over,
      });
      const base = (exceptions, action = 'build') => ({ action, now: '2026-10-02', exceptions });
      const noExpiry = exc();
      delete noExpiry.expires;
      return [
        { name: 'exception_in_date_is_allowed', input: base([exc()]), expect: 'allow' },
        { name: 'expired_exception_is_denied', input: base([exc({ granted: '2026-09-01', expires: '2026-09-30' })]), expect: 'deny' },
        { name: 'exception_without_expiry_is_denied', input: base([noExpiry]), expect: 'deny' },
        { name: 'exception_too_long_is_denied', input: base([exc({ expires: addDays(granted, p.max_days + 1) })]), expect: 'deny' },
        { name: 'no_exceptions_is_allowed', input: base([], 'merge'), expect: 'allow' },
      ];
    },
    cedarRequest: 'one request per exception: principal Pipeline::"<pipeline>", action Action::"merge" or Action::"build", resource Exception::"<exception id>"',
    cedar: (p) => `forbid (
	principal,
	action in [Action::"merge", Action::"build"],
	resource
)
unless {
	context has now &&
	context has granted &&
	context has expires &&
	context.expires >= context.now &&
	context.expires.durationSince(context.granted) <= duration(${lit(`${p.max_days}d`)})
}`,
    cedarCases: (p) => {
      const granted = '2026-10-01';
      const req = (context) => ({
        principal: entity('Pipeline', 'ci'),
        action: entity('Action', 'build'),
        resource: entity('Exception', 'EXC-0042'),
        context: { now: dt('2026-10-02'), ...context },
      });
      return [
        { name: 'exception in date is allowed', request: req({ granted: dt(granted), expires: dt(addDays(granted, p.max_days)) }), rule: false },
        { name: 'expired exception is denied', request: req({ granted: dt('2026-09-01'), expires: dt('2026-09-30') }), rule: true },
        { name: 'exception without expiry is denied', request: req({ granted: dt(granted) }), rule: true },
        { name: 'exception too long is denied', request: req({ granted: dt(granted), expires: dt(addDays(granted, p.max_days + 1)) }), rule: true },
      ];
    },
  },

  custom: {
    regoParams: (p) => [`guarded_action := ${lit(p.action)}`],
    regoRules: (p, v) => {
      const cond = customRegoCondition(p);
      const text = lit(conditionWords(p));
      if (v.effect === 'allow') {
        return `default allow := false

allow if {
	input.action == guarded_action
${cond.map((line) => `\t${line}`).join('\n')}
}`;
      }
      return `${v.effect} contains msg if {
	input.action == guarded_action
${cond.map((line) => `\t${line}`).join('\n')}
	msg := sprintf("%s: %s", [rule_id, ${text}])
}`;
    },
    cases: (p, v) => {
      const { match, miss } = customSamples(p);
      const hit = v.effect === 'allow' ? 'allow' : v.effect;
      const pass = v.effect === 'allow' ? 'deny' : 'allow';
      const input = (value, action = p.action) => {
        const doc = { action };
        if (value !== ABSENT) setPath(doc, p.field, plainValue(value));
        return doc;
      };
      return [
        { name: 'input_that_does_not_match_gets_the_default', input: input(miss), expect: pass },
        { name: 'input_that_matches_gets_the_effect', input: input(match), expect: hit },
        { name: 'other_action_is_out_of_scope', input: input(match, otherToken(p.action)), expect: pass },
      ];
    },
    cedarRequest: 'principal Caller::"<caller>", action Action::"<action>", resource Resource::"<resource>"',
    cedar: (p, v) => {
      const effect = v.effect === 'allow' ? 'permit' : 'forbid';
      return `${effect} (
	principal,
	action == ${entity('Action', p.action)},
	resource
)
when {
	${customCedarCondition(p)}
}`;
    },
    cedarCases: (p) => {
      const { match, miss } = customSamples(p);
      const req = (value, action = p.action) => {
        const context = {};
        if (value !== ABSENT) setPath(context, p.field, cedarValue(value));
        return {
          principal: entity('Caller', 'example'),
          action: entity('Action', action),
          resource: entity('Resource', 'example'),
          context,
        };
      };
      return [
        { name: 'input that does not match gets the default', request: req(miss), rule: false },
        { name: 'input that matches gets the effect', request: req(match), rule: true },
        { name: 'other action is out of scope', request: req(match, otherToken(p.action)), rule: false },
      ];
    },
  },
};

// ---- Custom rule helpers -----------------------------------------------------------

const ABSENT = Symbol('absent');

function setPath(target, path, value) {
  const keys = path.split('.');
  let node = target;
  keys.slice(0, -1).forEach((key) => {
    node[key] = node[key] ?? {};
    node = node[key];
  });
  node[keys[keys.length - 1]] = value;
}

function plainValue(value) {
  return value && typeof value === 'object' && 'type' in value ? value.value : value;
}

function cedarValue(value) {
  if (value && typeof value === 'object' && value.type === 'decimal') return dec(value.text);
  return plainValue(value);
}

function scalarLiteral(value) {
  if (value.type === 'string') return lit(value.value);
  if (value.type === 'bool') return String(value.value);
  return value.text;
}

function cedarLiteral(value) {
  if (value.type === 'decimal') return `decimal(${lit(value.text)})`;
  return scalarLiteral(value);
}

function customRegoCondition(p) {
  const ref = `input.${p.field}`;
  switch (p.operator) {
    case 'missing':
      return [`object.get(input, ${lit(p.field.split('.'))}, null) == null`];
    case 'equals':
      return [`${ref} == ${scalarLiteral(p.value)}`];
    case 'not_equals':
      return [`${ref} != ${scalarLiteral(p.value)}`];
    case 'lt':
      return [`${ref} < ${p.value.text}`];
    case 'gt':
      return [`${ref} > ${p.value.text}`];
    case 'one_of':
      return [`${ref} in {${p.value.map(scalarLiteral).join(', ')}}`];
    case 'not_one_of':
      return [`value := ${ref}`, `not value in {${p.value.map(scalarLiteral).join(', ')}}`];
    default:
      throw new Error(`unknown operator ${p.operator}`);
  }
}

function customCedarCondition(p) {
  const keys = p.field.split('.');
  const guards = keys.map((key, i) => `${['context', ...keys.slice(0, i)].join('.')} has ${key}`);
  const present = guards.join(' &&\n\t');
  const ref = `context.${p.field}`;
  switch (p.operator) {
    case 'missing':
      return `!(\n\t\t${guards.join(' &&\n\t\t')}\n\t)`;
    case 'equals':
      return `${present} &&\n\t${ref} == ${cedarLiteral(p.value)}`;
    case 'not_equals':
      return `${present} &&\n\t${ref} != ${cedarLiteral(p.value)}`;
    case 'lt':
      return p.value.type === 'decimal'
        ? `${present} &&\n\t${ref}.lessThan(${cedarLiteral(p.value)})`
        : `${present} &&\n\t${ref} < ${p.value.text}`;
    case 'gt':
      return p.value.type === 'decimal'
        ? `${present} &&\n\t${ref}.greaterThan(${cedarLiteral(p.value)})`
        : `${present} &&\n\t${ref} > ${p.value.text}`;
    case 'one_of':
      return `${present} &&\n\t[${p.value.map(cedarLiteral).join(', ')}].contains(${ref})`;
    case 'not_one_of':
      return `${present} &&\n\t!([${p.value.map(cedarLiteral).join(', ')}].contains(${ref}))`;
    default:
      throw new Error(`unknown operator ${p.operator}`);
  }
}

/** A value that differs from `value` (and from everything in `avoid`), same type. */
function otherValue(value, avoid = []) {
  const taken = avoid.map((item) => String(item.value));
  if (value.type === 'bool') return { type: 'bool', value: !value.value };
  if (value.type === 'string') return { type: 'string', value: otherToken(value.value, taken) };
  let text = value.type === 'int' ? String(value.value + 1) : stepDecimal(value.text, 1);
  while (taken.includes(String(Number(text)))) {
    text = value.type === 'int' ? String(Number(text) + 1) : stepDecimal(text, 1);
  }
  return { type: value.type, value: Number(text), text };
}

function customSamples(p) {
  switch (p.operator) {
    case 'missing':
      return { match: ABSENT, miss: { type: 'string', value: 'present' } };
    case 'equals':
      return { match: p.value, miss: otherValue(p.value) };
    case 'not_equals':
      return { match: otherValue(p.value), miss: p.value };
    case 'lt': {
      const text = p.value.type === 'int' ? String(p.value.value - 1) : stepDecimal(p.value.text, -1);
      return { match: { type: p.value.type, value: Number(text), text }, miss: p.value };
    }
    case 'gt': {
      const text = p.value.type === 'int' ? String(p.value.value + 1) : stepDecimal(p.value.text, 1);
      return { match: { type: p.value.type, value: Number(text), text }, miss: p.value };
    }
    case 'one_of':
      return { match: p.value[0], miss: otherValue(p.value[0], p.value) };
    case 'not_one_of':
      return { match: otherValue(p.value[0], p.value), miss: p.value[0] };
    default:
      throw new Error(`unknown operator ${p.operator}`);
  }
}

/** The custom rule's condition in words, for messages and the card. */
export function conditionWords(p) {
  const value = p.operator === 'missing' ? '' : ` ${displayParam('value', p.value)}`;
  return `${p.field} ${OPERATORS[p.operator]}${value}`;
}

// ---- Building the artefacts ----------------------------------------------------------

/**
 * Build every artefact of one card.
 * @param {any} template  one entry of policyCardTemplates
 * @param {any} values    `values` from checkValues (must be ok)
 * @param {{ obligations: Record<string, { obligation: string, status?: string }>, patternTitle?: string }} ctx
 */
export function buildArtefacts(template, values, ctx) {
  const engine = ENGINES[template.id];
  if (!engine) throw new Error(`policy-card-core: no engine for template "${template.id}"`);
  const { base, pkg } = namesFor(values.cardId);
  const p = values.params;
  const setName = values.effect === 'allow' ? 'allow' : values.effect;
  const statement = template.id === 'custom' ? values.statement : fill(template.statement, p);
  const condition = template.id === 'custom'
    ? `for ${p.action}, ${conditionWords(p)}`
    : fill(template.condition, p);
  const paths = {
    card: `policies/${base}.policy-card`,
    rego: `policies/${base}.rego`,
    regoTest: `policies/${base}_test.rego`,
    cedar: `policies/${base}.cedar`,
    cedarTests: `policies/${base}.cedartests.json`,
    input: `policies/${base}.input.json`,
    ci: `.github/workflows/policy-card-${base}.yml`,
  };
  const meta = { ...values, base, pkg, statement, condition, setName, paths };
  const cases = engine.cases(p, values);
  // The example input is a compliant one: the first case the rule lets through.
  const example = cases.find((c) => c.expect === 'allow') ?? cases[0];

  const card = cardRecord(template, meta);
  const files = [
    { id: 'md', group: 'people', name: `${base}.policy-card.md`, path: `${paths.card}.md`, label: 'Policy Card (Markdown)', lang: 'markdown', mime: 'text/markdown', text: cardMarkdown(template, meta, ctx) },
    { id: 'yaml', group: 'machines', name: `${base}.policy-card.yaml`, path: `${paths.card}.yaml`, label: 'Policy Card (YAML)', lang: 'yaml', mime: 'application/yaml', text: `${yamlHeader(meta)}${toYaml(card)}` },
    { id: 'json', group: 'machines', name: `${base}.policy-card.json`, path: `${paths.card}.json`, label: 'Policy Card (JSON)', lang: 'json', mime: 'application/json', text: `${JSON.stringify(card, null, 2)}\n` },
    { id: 'rego', group: 'engine', name: `${base}.rego`, path: paths.rego, label: 'OPA/Rego module', lang: 'rego', mime: 'text/plain', text: regoModule(engine, meta, example.input) },
    { id: 'rego-test', group: 'engine', name: `${base}_test.rego`, path: paths.regoTest, label: 'Rego unit tests (opa test)', lang: 'rego', mime: 'text/plain', text: regoTests(meta, cases) },
    { id: 'cedar', group: 'engine', name: `${base}.cedar`, path: paths.cedar, label: 'Cedar stub', lang: 'cedar', mime: 'text/plain', text: cedarModule(engine, meta) },
    { id: 'cedar-tests', group: 'engine', name: `${base}.cedartests.json`, path: paths.cedarTests, label: 'Cedar tests (cedar run-tests)', lang: 'json', mime: 'application/json', text: cedarTests(engine, meta) },
    { id: 'input', group: 'engine', name: `${base}.input.json`, path: paths.input, label: 'Example input (compliant)', lang: 'json', mime: 'application/json', text: `${JSON.stringify(example.input, null, 2)}\n` },
    { id: 'ci', group: 'pipeline', name: `policy-card-${base}.yml`, path: paths.ci, label: 'CI hook (GitHub Actions)', lang: 'yaml', mime: 'application/yaml', text: ciWorkflow(meta) },
  ];
  return { card, files, base, pkg, cases };
}

function cardRecord(template, m) {
  const card = {
    $schema: SCHEMA_ID,
    card_id: m.cardId,
    version: m.version,
    title: m.title,
    owner: m.owner,
    applies_to: [...m.appliesTo],
  };
  if (m.sourcePolicy) card.source_policy = m.sourcePolicy;
  const rule = {
    rule_id: m.ruleId,
    description: m.statement,
    effect: m.effect,
    condition: m.condition,
    failure_mode: m.failureMode,
    enforcement_points: [...m.enforcement],
    implementation: {
      engine: 'opa_rego',
      module: m.paths.rego,
      entrypoint: `data.aige.cards.${m.pkg}.verdict`,
    },
  };
  const mapsTo = [...m.obligations, ...m.otherRefs];
  if (mapsTo.length) rule.maps_to = mapsTo;
  card.rules = [rule];
  if (m.exceptions) card.exceptions = m.exceptions;
  card.effective_from = m.effectiveFrom;
  card.review_by = m.reviewBy;
  const extensions = {
    generated_by: TOOL_URL,
    template: template.id,
    notice: `${REVIEW_NOTE} ${LEGAL_NOTE}`,
    cedar_module: m.paths.cedar,
    ci_hook: m.paths.ci,
  };
  if (m.approver) extensions.approval_pending_from = m.approver;
  card.extensions = extensions;
  return card;
}

const EFFECT_WORDS = {
  deny: 'the action is blocked',
  require_approval: 'the action waits for a human decision',
  alert: 'the action goes ahead and an alert is raised',
  allow: 'only matching actions are permitted; everything else is denied',
};

function cardMarkdown(template, m, ctx) {
  const obligationRows = m.obligations.map((id) => {
    const row = ctx.obligations?.[id];
    const url = `${SITE_URL}/obligations/${id.toLowerCase()}`;
    return `| [${id}](${url}) | ${mdCell(row?.obligation ?? '')} | ${mdCell(row?.status ?? '')} |`;
  });
  const patternUrl = `${SITE_URL}/patterns/${template.pattern}`;
  const lines = [
    `# Policy Card: ${m.title}`,
    '',
    `> ${REVIEW_NOTE} ${LEGAL_NOTE}`,
    `> Generated with the Policy Card builder (${TOOL_URL});`,
    '> the executable modules are authoritative over this text.',
    '',
    '| Field | Value |',
    '|---|---|',
    `| Card | \`${m.cardId}\` version ${mdCell(m.version)} |`,
    `| Owner | ${mdCell(m.owner)} |`,
    `| Applies to | ${m.appliesTo.map((item) => `\`${mdCell(item)}\``).join(', ')} |`,
  ];
  if (m.sourcePolicy) lines.push(`| Source policy | \`${mdCell(m.sourcePolicy)}\` |`);
  lines.push(
    `| Effective from | ${m.effectiveFrom} |`,
    `| Review by | ${m.reviewBy} |`,
    `| Approval | ${m.approver ? `Pending: to be approved by ${mdCell(m.approver)}` : 'Pending'} |`,
    '',
    `## Rule \`${m.ruleId}\``,
    '',
    `- **Statement:** ${m.statement}`,
    `- **Effect:** \`${m.effect}\`: when the condition holds, ${EFFECT_WORDS[m.effect]}.`,
    `- **Condition:** ${m.condition}.`,
    `- **Failure mode addressed:** ${m.failureMode}`,
    `- **Enforced at:** ${m.enforcement.map((point) => `\`${point}\``).join(', ')}`,
    '- **Implementation:**',
    `  - OPA/Rego module \`${m.paths.rego}\`, entrypoint \`data.aige.cards.${m.pkg}.verdict\``,
    `  - Rego tests \`${m.paths.regoTest}\``,
    `  - Cedar stub \`${m.paths.cedar}\`, tests \`${m.paths.cedarTests}\``,
    `  - CI hook \`${m.paths.ci}\``,
    '',
    '## Obligations this rule helps evidence',
    '',
  );
  if (obligationRows.length) {
    lines.push('| Id | Obligation | Status |', '|---|---|---|', ...obligationRows, '');
  }
  if (m.otherRefs.length) {
    lines.push(`Other references: ${m.otherRefs.map((ref) => mdCell(ref)).join('; ')}.`, '');
  }
  lines.push(
    'Mappings are illustrative, not a claim of conformity: a rule helps evidence an obligation, it',
    'does not discharge it.',
    '',
    '## Exceptions',
    '',
    m.exceptions || 'None defined. Any exception must be time-limited and recorded as a signed verdict override.',
    '',
    '## Verdict',
    '',
    'Every evaluation emits a verdict (`rule_id`, `decision`, `input_hash`, `timestamp`) that the',
    'caller signs and writes to the evidence store, in the shape of',
    `\`policy-card.v1.json#/$defs/verdict\`: the \`verdict\` rule of \`${m.paths.rego}\`.`,
    '',
    '---',
    '',
    `Pattern: [Policy Card](${SITE_URL}/patterns/policy-card)` +
      (template.pattern !== 'policy-card'
        ? ` · Builds on: [${ctx.patternTitle ?? template.pattern}](${patternUrl})`
        : '') +
      ` · Schema: ${SCHEMA_ID}`,
    '',
  );
  return lines.join('\n');
}

function yamlHeader(m) {
  return [
    `# ${m.base}.policy-card.yaml: Policy Card ${m.cardId} version ${m.version}.`,
    `# Validates against ${SCHEMA_ID}`,
    `# Generated by the Policy Card builder, ${TOOL_URL}`,
    `# ${REVIEW_NOTE} ${LEGAL_NOTE}`,
    '',
  ].join('\n');
}

/** Split a long line at spaces so no line passes `width` characters. */
function wrap(line, width) {
  const out = [];
  let current = '';
  for (const word of line.split(' ')) {
    if (current && current.length + 1 + word.length > width) {
      out.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  out.push(current);
  return out;
}

function codeHeader(prefix, lines) {
  return lines
    .flatMap((line) => (line ? wrap(line, 98 - prefix.length) : ['']))
    .map((line) => (line ? `${prefix} ${line}` : prefix))
    .join('\n');
}

function regoModule(engine, m, example) {
  const params = engine.regoParams(m.params, m);
  const rules = engine.regoRules(m.params, m);
  const decision =
    m.effect === 'allow'
      ? `decision := "allow" if {
	allow
} else := "deny"`
      : `decision := ${lit(m.effect)} if {
	count(${m.setName}) > 0
} else := "allow"`;
  const header = codeHeader('#', [
    `${m.base}.rego: the executable rule of Policy Card ${m.cardId} version ${m.version}.`,
    `Rule ${m.ruleId} (effect: ${m.effect}): ${m.statement}`,
    `Failure mode: ${m.failureMode}`,
    `Generated by the Policy Card builder, ${TOOL_URL}`,
    `${REVIEW_NOTE} ${LEGAL_NOTE}`,
    'Rego v1 syntax (OPA 1.x). Test it with `opa test`; the `verdict` rule is the record every',
    'evaluation emits (policy-card.v1.json#/$defs/verdict).',
    '',
    'Input: the pipeline or the gateway builds it before it asks OPA. A compliant example:',
  ]);
  return `${header}
${comment('#', example)}
package aige.cards.${m.pkg}

import rego.v1

rule_id := ${lit(m.ruleId)}

# ---- Parameters (set in the builder) ---------------------------------------------------------

${params.join('\n')}

# ---- Rule ${m.ruleId} ${'-'.repeat(Math.max(4, 84 - m.ruleId.length))}

${rules}

# ---- Decision and verdict --------------------------------------------------------------------

${decision}

# The CI hook fails the job when this is defined (opa eval --fail-defined).
blocks if decision == "deny"

# Sign the verdict where it is written to the evidence store.
verdict := {
	"rule_id": rule_id,
	"decision": decision,
	"input_hash": sprintf("sha256:%s", [crypto.sha256(json.marshal(input))]),
	"timestamp": time.format(time.now_ns()),
}
`;
}

function regoTests(m, cases) {
  const header = codeHeader('#', [
    `${m.base}_test.rego: unit tests of ${m.base}.rego.`,
    `Run: opa test ${m.paths.rego} ${m.paths.regoTest} -v`,
    `Generated by the Policy Card builder, ${TOOL_URL}`,
    `${REVIEW_NOTE} Add the cases your own inputs need.`,
  ]);
  const tests = cases.map(
    (c) => `test_${c.name} if {
	${m.pkg}.decision == ${lit(c.expect)} with input as ${jsonBlock(c.input, 1)}
}`,
  );
  const example = cases.find((c) => c.expect === 'allow') ?? cases[0];
  tests.push(`test_verdict_carries_the_rule_id if {
	v := ${m.pkg}.verdict with input as ${jsonBlock(example.input, 1)}
	v.rule_id == ${lit(m.ruleId)}
	v.decision == ${lit(example.expect)}
	startswith(v.input_hash, "sha256:")
}`);
  tests.push(`test_compliant_input_does_not_block_ci if {
	not ${m.pkg}.blocks with input as ${jsonBlock(example.input, 1)}
}`);
  const denied = cases.find((c) => c.expect === 'deny');
  if (denied) {
    tests.push(`test_denied_input_blocks_ci if {
	${m.pkg}.blocks with input as ${jsonBlock(denied.input, 1)}
}`);
  }
  return `${header}
package aige.cards.${m.pkg}_test

import rego.v1

import data.aige.cards.${m.pkg}

${tests.join('\n\n')}
`;
}

function cedarModule(engine, m) {
  const allow = m.effect === 'allow';
  const header = codeHeader('//', [
    `${m.base}.cedar: a Cedar stub of Policy Card ${m.cardId} version ${m.version}, rule ${m.ruleId}.`,
    `Generated by the Policy Card builder, ${TOOL_URL}`,
    `${REVIEW_NOTE} ${LEGAL_NOTE}`,
    'Cedar decides permit or deny. The @effect annotation tells the caller how to act on a deny',
    'from this policy: deny blocks; require_approval routes the action to a person; alert logs it',
    'and lets it through. Cedar skips a policy whose condition errors (for example on a wrong',
    'type), so validate requests against a Cedar schema before relying on it.',
    `Test: cedar run-tests --policies ${m.paths.cedar} --tests ${m.paths.cedarTests}`,
    '',
    `Request: ${engine.cedarRequest}; the context carries the fields the tests show.`,
  ]);
  const baseline = allow
    ? ''
    : `// Baseline for testing this card on its own: permit what the card does not forbid. In a real
// policy set, drop it and keep the system's own permits.
@id(${lit(`${m.cardId}.baseline`)})
permit (principal, action, resource);

`;
  return `${header}

${baseline}@id(${lit(m.ruleId)})
@effect(${lit(m.effect)})
${engine.cedar(m.params, m)};
`;
}

function cedarTests(engine, m) {
  const baselineId = `${m.cardId}.baseline`;
  const tests = engine.cedarCases(m.params, m).map((c) => {
    let decision;
    let reason;
    if (m.effect === 'allow') {
      decision = c.rule ? 'allow' : 'deny';
      reason = c.rule ? [m.ruleId] : [];
    } else {
      decision = c.rule ? 'deny' : 'allow';
      reason = c.rule ? [m.ruleId] : [baselineId];
    }
    return { name: c.name, request: c.request, entities: [], decision, reason, num_errors: 0 };
  });
  return `${JSON.stringify(tests, null, 2)}\n`;
}

function ciWorkflow(m) {
  const gated = m.enforcement.some((point) => point !== 'runtime');
  const periodic = m.enforcement.includes('periodic');
  const blocking = m.effect === 'deny' || m.effect === 'allow';
  const query = (rule) => `'data.aige.cards.${m.pkg}.${rule}'`;
  const opaEval = (flags, rule, tail = '') => [
    `          opa eval ${flags} \\`,
    `            --data ${m.paths.rego} --input policy-input.json \\`,
    `            ${query(rule)}${tail}`,
  ];
  const notes = [
    `${m.paths.ci}: the CI hook of Policy Card ${m.cardId} version ${m.version}, rule ${m.ruleId} (effect: ${m.effect}; enforced at: ${m.enforcement.join(', ')}).`,
    `Generated by the Policy Card builder, ${TOOL_URL}`,
    `${REVIEW_NOTE} ${LEGAL_NOTE}`,
    'Pin the action and OPA versions you have tested; the majors below were current on 2026-09-24.',
  ];
  if (!gated) {
    notes.push(
      '',
      'This rule is enforced at runtime: the gateway or guardrail asks OPA for the verdict on every call, for example with the REST API',
    );
  } else if (!blocking) {
    notes.push(
      '',
      `The effect is ${m.effect}: the job records the verdict and never fails on it; route a ${m.effect} decision to your own approval or alerting step.`,
    );
  }
  const lines = [codeHeader('#', notes)];
  if (!gated) {
    lines.push(
      `#   POST /v1/data/aige/cards/${m.pkg}/verdict   {"input": <the request>}`,
      codeHeader('#', [
        'and acts on its decision. CI checks and tests the module, so a rule change ships as a reviewed, tested diff.',
      ]),
    );
  }
  lines.push(
    `name: policy-card-${m.base}`,
    '',
    'on:',
    '  pull_request:',
    '  push:',
    '    branches: [main]',
  );
  if (periodic) lines.push('  schedule:', '    - cron: "17 6 * * 1"');
  lines.push(
    '  workflow_dispatch:',
    '',
    'permissions:',
    '  contents: read',
    '',
    'jobs:',
    '  policy-card:',
    '    runs-on: ubuntu-latest',
    '    steps:',
    '      - uses: actions/checkout@v7',
    '      - uses: open-policy-agent/setup-opa@v2',
    '        with:',
    '          version: latest',
    '      - name: Check and test the rule',
    '        run: |',
    `          opa check --strict ${m.paths.rego} ${m.paths.regoTest}`,
    `          opa test -v ${m.paths.rego} ${m.paths.regoTest}`,
  );
  if (gated) {
    lines.push(
      '      - name: Build the input',
      '        # Yours: write the input document the module header describes, from the registry,',
      '        # the eval store or the change itself. A compliant example:',
      `        # ${m.paths.input}`,
      `        run: ./scripts/policy-input.sh ${m.base} > policy-input.json`,
      '      - name: Record the verdict',
      '        run: |',
      ...opaEval('--format raw', 'verdict', ` | tee verdict-${m.base}.json`),
      '      - name: Keep the verdict as evidence',
      '        uses: actions/upload-artifact@v7',
      '        with:',
      `          name: verdict-${m.base}`,
      `          path: verdict-${m.base}.json`,
      `      - name: ${blocking ? 'Fail the job on deny' : 'Show the decision'}`,
      '        run: |',
      ...opaEval('--format pretty', m.effect === 'deny' ? 'deny' : 'decision'),
    );
    if (blocking) lines.push(...opaEval('--fail-defined --format pretty', 'blocks'));
  }
  return `${lines.join('\n')}\n`;
}

// ---- Markdown and YAML ------------------------------------------------------------

/** Make text safe inside a Markdown table cell. */
export function mdCell(text) {
  return String(text ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ');
}

const YAML_PLAIN = /^[A-Za-z_][A-Za-z0-9_./-]*$/;
const YAML_WORDS = /^(?:y|n|yes|no|on|off|true|false|null|~)$/i;

function yamlScalar(value) {
  if (value === null) return 'null';
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  const text = String(value);
  return YAML_PLAIN.test(text) && !YAML_WORDS.test(text) ? text : JSON.stringify(text);
}

/** A JSON-shaped value as block-style YAML (strings that could be misread are
 *  double-quoted, so the YAML reads back as the same JSON). */
export function toYaml(value, indent = 0) {
  const pad = ' '.repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return `${pad}[]\n`;
    return value
      .map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length) {
          const body = toYaml(item, indent + 2);
          return `${pad}- ${body.slice(indent + 2)}`;
        }
        if (Array.isArray(item) && item.length) return `${pad}-\n${toYaml(item, indent + 2)}`;
        return `${pad}- ${yamlInline(item)}\n`;
      })
      .join('');
  }
  if (value && typeof value === 'object') {
    const keys = Object.keys(value);
    if (!keys.length) return `${pad}{}\n`;
    return keys
      .map((key) => {
        const item = value[key];
        const name = yamlScalar(key);
        if (Array.isArray(item) && item.length) return `${pad}${name}:\n${toYaml(item, indent + 2)}`;
        if (item && typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length) {
          return `${pad}${name}:\n${toYaml(item, indent + 2)}`;
        }
        return `${pad}${name}: ${yamlInline(item)}\n`;
      })
      .join('');
  }
  return `${pad}${yamlInline(value)}\n`;
}

function yamlInline(value) {
  if (Array.isArray(value)) return '[]';
  if (value && typeof value === 'object') return '{}';
  return yamlScalar(value);
}

// ---- Minimal JSON Schema validator ------------------------------------------------
// The draft 2020-12 subset the site's schemas use (the same subset
// scripts/schemas-check.mjs enforces): type, required, properties,
// additionalProperties, enum, const, items, minItems, maxItems, minLength,
// maxLength, pattern, minimum, maximum, format (date, date-time) and local $ref.

function typeOk(type, value) {
  switch (type) {
    case 'object': return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'array': return Array.isArray(value);
    case 'string': return typeof value === 'string';
    case 'integer': return Number.isInteger(value);
    case 'number': return typeof value === 'number' && Number.isFinite(value);
    case 'boolean': return typeof value === 'boolean';
    case 'null': return value === null;
    default: return false;
  }
}

function formatOk(format, value) {
  if (typeof value !== 'string') return true;
  if (format === 'date') return parseDate(value) !== null;
  if (format === 'date-time') {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) &&
      parseDate(value.slice(0, 10)) !== null;
  }
  return true;
}

/**
 * Validate `value` against `schema`; returns a list of messages (empty = valid).
 * @param {any} schema @param {any} value @returns {string[]}
 */
export function validateSchema(schema, value) {
  const out = [];
  walk(schema, value, '', schema, out);
  return out;
}

function walk(schema, value, path, root, out) {
  if (schema.$ref) {
    const target = schema.$ref
      .replace(/^#\//, '')
      .split('/')
      .reduce((node, key) => node?.[key], root);
    if (!target) out.push(`${path || '/'}: unresolved $ref ${schema.$ref}`);
    else walk(target, value, path, root, out);
    return;
  }
  const at = path || '/';
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((type) => typeOk(type, value))) {
      out.push(`${at}: expected ${types.join(' or ')}`);
      return;
    }
  }
  if (schema.enum && !schema.enum.includes(value)) out.push(`${at}: not one of ${schema.enum.join(', ')}`);
  if ('const' in schema && value !== schema.const) out.push(`${at}: must be ${JSON.stringify(schema.const)}`);
  if (typeof value === 'string') {
    if (schema.minLength !== undefined && value.length < schema.minLength) out.push(`${at}: too short`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) out.push(`${at}: too long`);
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) out.push(`${at}: does not match ${schema.pattern}`);
    if (schema.format && !formatOk(schema.format, value)) out.push(`${at}: not a valid ${schema.format}`);
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) out.push(`${at}: below ${schema.minimum}`);
    if (schema.maximum !== undefined && value > schema.maximum) out.push(`${at}: above ${schema.maximum}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) out.push(`${at}: needs at least ${schema.minItems} item(s)`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) out.push(`${at}: at most ${schema.maxItems} item(s)`);
    if (schema.items) value.forEach((item, i) => walk(schema.items, item, `${path}/${i}`, root, out));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of schema.required ?? []) {
      if (!(key in value)) out.push(`${at}: missing required "${key}"`);
    }
    const props = schema.properties ?? {};
    for (const [key, item] of Object.entries(value)) {
      if (props[key]) walk(props[key], item, `${path}/${key}`, root, out);
      else if (schema.additionalProperties === false) out.push(`${at}: unexpected "${key}"`);
    }
  }
}

// ---- Link state ------------------------------------------------------------------

/** Values -> fragment params (short keys). */
export function valuesToState(raw) {
  const state = { v: STATE_VERSION, t: raw.template };
  for (const [key, value] of Object.entries(raw.params ?? {})) state[`p.${key}`] = value;
  Object.assign(state, {
    id: raw.cardId,
    ver: raw.version,
    ti: raw.title,
    ow: raw.owner,
    ap: raw.approver,
    at: raw.appliesTo,
    sp: raw.sourcePolicy,
    ef: raw.effectiveFrom,
    rb: raw.reviewBy,
    ex: raw.exceptions,
    ri: raw.ruleId,
    ob: (raw.obligations ?? []).join(','),
    or: raw.otherRefs,
  });
  if (raw.template === 'custom') {
    Object.assign(state, {
      st: raw.statement,
      fm: raw.failureMode,
      fx: raw.effect,
      en: (raw.enforcement ?? []).join(','),
    });
  }
  return state;
}

/** Fragment params -> raw values over the template's defaults, or null if the
 *  fragment is not a builder state. */
export function stateToValues(state, templates, { today }) {
  if (!state || String(state.v) !== String(STATE_VERSION)) return null;
  const template = templates.find((entry) => entry.id === state.t);
  if (!template) return null;
  const raw = defaultValues(template, { today });
  for (const param of template.params) {
    const value = state[`p.${param.key}`];
    if (typeof value === 'string') raw.params[param.key] = value;
    else if (param.optional) raw.params[param.key] = '';
  }
  const map = {
    id: 'cardId', ver: 'version', ti: 'title', ow: 'owner', ap: 'approver', at: 'appliesTo',
    sp: 'sourcePolicy', ef: 'effectiveFrom', rb: 'reviewBy', ex: 'exceptions', ri: 'ruleId',
    or: 'otherRefs', st: 'statement', fm: 'failureMode', fx: 'effect',
  };
  for (const [key, field] of Object.entries(map)) {
    if (typeof state[key] === 'string') raw[field] = state[key];
  }
  // The link drops empty values, so an absent optional key means "left empty".
  raw.obligations = typeof state.ob === 'string' ? splitList(state.ob) : [];
  if (template.id === 'custom') {
    raw.enforcement = typeof state.en === 'string' ? splitList(state.en) : [];
  }
  for (const [key, field] of [['ap', 'approver'], ['ex', 'exceptions'], ['sp', 'sourcePolicy'], ['or', 'otherRefs']]) {
    if (!(key in state)) raw[field] = '';
  }
  return raw;
}

/** Every template id that has an engine (the spec checks it against the data). */
export const engineIds = Object.keys(ENGINES);
