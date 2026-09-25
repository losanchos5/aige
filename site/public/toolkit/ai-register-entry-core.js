// ai-register-entry-core.js: the pure logic of /toolkit/ai-register-entry
// (no DOM, no side effects at import; tests/doc-builders.spec.ts runs it in
// Node). One register holds AI system entries and agent entries, each checked
// against its published schema:
//   - ai-system-register-entry.v1.json (kind "system")
//   - agent-register-entry.v1.json     (kind "agent")
// It turns entries into the exported record, reads a register back from JSON
// or CSV (one row per entry, dotted column names, lists joined with "; ",
// nested lists as JSON in the cell), writes the register CSV, the Markdown
// public summary and the field crosswalk for one entry.
import {
  prune,
  orderBySchema,
  validate,
  flattenRecord,
  unflattenRow,
  parseCsv,
  getPath,
  isUnsafePath,
} from './builders.js';
import { mdCell } from './lib.js';

export const SCHEMA_IDS = {
  system: 'https://aigovernanceengineer.com/schemas/ai-system-register-entry.v1.json',
  agent: 'https://aigovernanceengineer.com/schemas/agent-register-entry.v1.json',
};

export const KIND_LABELS = { system: 'AI system', agent: 'Agent' };

const AGENT_ONLY = [
  'workload_identity',
  'tools',
  'data_access',
  'delegation',
  'autonomy_level',
  'spend_limit',
  'kill_switch',
  'runtime_policies',
  'eval_suites',
  'parent_system',
  'base_models',
  'registered_at',
];

/** Which kind a record claims to be: its `$schema`, else its fields. */
export function detectKind(record, fallback = 'system') {
  if (!record || typeof record !== 'object') return fallback;
  if (record.$schema === SCHEMA_IDS.agent || record.kind === 'agent') return 'agent';
  if (record.$schema === SCHEMA_IDS.system || record.kind === 'system') return 'system';
  if (AGENT_ONLY.some((key) => key in record)) return 'agent';
  return fallback;
}

/** The record as it is exported: `$schema` first, fields in schema order,
 *  empty values dropped. */
export function exportEntry(doc, kind, schema) {
  const { $schema: _ignored, kind: _kind, ...rest } = doc ?? {};
  const body = prune(rest) ?? {};
  return orderBySchema({ $schema: SCHEMA_IDS[kind], ...body }, schema);
}

/** Validate an entry of `kind` against its schema. */
export function checkEntry(doc, kind, schemas) {
  const record = exportEntry(doc, kind, schemas[kind]);
  return { record, errors: validate(schemas[kind], record) };
}

// ---- Import ---------------------------------------------------------------------

/** A parsed JSON value (one record, a list, or { entries: [...] }) -> entries. */
export function entriesFromJson(data, schemas) {
  const list = Array.isArray(data)
    ? data
    : data && Array.isArray(data.entries)
      ? data.entries
      : data && typeof data === 'object'
        ? [data]
        : [];
  if (!list.length) return { entries: [], problems: ['The file holds no register entry.'] };
  const entries = list.map((raw, i) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return { kind: 'system', doc: {}, errors: [{ path: [], code: 'type', message: `item ${i + 1} is not a record` }] };
    }
    const kind = detectKind(raw);
    const { record, errors } = checkEntry(raw, kind, schemas);
    return { kind, doc: record, errors };
  });
  return { entries, problems: [] };
}

/** CSV text (header of dotted field names, optional `kind` column) -> entries. */
export function entriesFromCsv(text, schemas) {
  const { rows, error } = parseCsv(text);
  const problems = error ? [error] : [];
  if (rows.length < 2) return { entries: [], problems: [...problems, 'The CSV needs a header row and at least one entry.'] };
  const header = rows[0].map((cell) => cell.trim());
  // A column such as "__proto__.x" names no field and would reach
  // Object.prototype: unflattenRow skips it, and the reader is told.
  const unsafe = header.filter((name) => name && isUnsafePath(name));
  if (unsafe.length) {
    problems.push(
      `Ignored ${unsafe.length === 1 ? 'a column' : `${unsafe.length} columns`} that no register field can have: ${unsafe.map((name) => `"${name}"`).join(', ')}.`,
    );
  }
  const kindAt = header.indexOf('kind');
  const entries = rows.slice(1).map((cells) => {
    const declared = kindAt >= 0 ? String(cells[kindAt] ?? '').trim().toLowerCase() : '';
    const guess = unflattenRow(header, cells, undefined);
    const kind =
      declared === 'agent' || declared === 'system' ? declared : detectKind(guess);
    const record = unflattenRow(header, cells, schemas[kind]);
    const checked = checkEntry(record, kind, schemas);
    return { kind, doc: checked.record, errors: checked.errors };
  });
  return { entries, problems };
}

// ---- CSV export ------------------------------------------------------------------

const LEAD = ['kind', 'id', 'version', 'name', 'owner', 'expiry', 'scope'];

/** Entries -> CSV rows (header first). Columns: the lead fields, then every
 *  other dotted field any entry uses, in first-seen order. */
export function registerCsvRows(entries) {
  const flat = entries.map((entry) => {
    const { $schema: _s, ...record } = entry.doc ?? {};
    return { kind: entry.kind, ...flattenRecord(record) };
  });
  const columns = [...LEAD];
  for (const row of flat) for (const key of Object.keys(row)) if (!columns.includes(key)) columns.push(key);
  return [columns, ...flat.map((row) => columns.map((key) => row[key] ?? ''))];
}

// ---- Public summary ----------------------------------------------------------------

const LABELS = {
  system_type: {
    ml_model: 'Machine learning model',
    llm_application: 'LLM application',
    agent: 'Agent',
    gpai_model: 'General-purpose AI model',
    rules_plus_ml: 'Rules plus machine learning',
    other: 'Other',
  },
  role: {
    provider: 'Provider',
    deployer: 'Deployer',
    provider_and_deployer: 'Provider and deployer',
    importer: 'Importer',
    distributor: 'Distributor',
  },
  eu_ai_act_category: {
    not_assessed: 'Not assessed yet',
    out_of_scope: 'Out of scope',
    minimal: 'Minimal risk',
    transparency: 'Transparency obligations',
    high_risk_annex_i: 'High-risk (Annex I)',
    high_risk_annex_iii: 'High-risk (Annex III)',
    gpai: 'General-purpose AI model',
    gpai_systemic_risk: 'GPAI model with systemic risk',
    prohibited: 'Prohibited practice',
  },
  lifecycle_stage: {
    proposed: 'Proposed',
    in_development: 'In development',
    in_validation: 'In validation',
    in_production: 'In production',
    suspended: 'Suspended',
    retired: 'Retired',
  },
  oversight: {
    human_in_the_loop: 'Human in the loop',
    human_on_the_loop: 'Human on the loop',
    human_in_command: 'Human in command',
    none: 'None',
  },
  autonomy_level: {
    suggest_only: 'Suggest only',
    act_with_approval: 'Act with approval',
    act_and_report: 'Act and report',
    act_autonomously: 'Act autonomously',
  },
  market_status: {
    not_yet_placed: 'Not yet placed on the market or in service',
    on_the_market: 'On the market',
    in_service: 'In service',
    withdrawn: 'No longer on the market or in service',
    recalled: 'Recalled',
  },
  status: { active: 'Active', suspended: 'Suspended', expired: 'Expired', retired: 'Retired' },
};

const label = (group, value) => (value === undefined ? undefined : LABELS[group]?.[value] ?? String(value));
const list = (value) => (Array.isArray(value) && value.length ? value.join(', ') : undefined);

/** The public fields of one entry, as [label, value] pairs (empty ones left out).
 *  Internal fields (scope, components, internal tier, credentials, tools'
 *  limits) never appear. */
export function publicFields(entry) {
  const d = entry.doc ?? {};
  const p = d.public_record ?? {};
  const rows = [
    ['Organisation', p.organisation],
    ['What it is', p.description],
    ['Purpose', d.purpose],
  ];
  if (entry.kind === 'agent') {
    rows.push(
      ['Kind', 'Agent'],
      ['Part of', d.parent_system],
      ['Highest autonomy allowed', label('autonomy_level', d.autonomy_level)],
      ['Human oversight', label('oversight', d.human_oversight?.mode)],
      ['Tools it may call', list((d.tools ?? []).map((tool) => tool.name).filter(Boolean))],
      ['Status', label('status', d.status)],
    );
  } else {
    const rc = d.risk_classification ?? {};
    const category = label('eu_ai_act_category', rc.eu_ai_act_category);
    rows.push(
      ['Kind', label('system_type', d.system_type)],
      ['Role under the EU AI Act', label('role', d.role)],
      ['EU AI Act classification', category && rc.annex_iii_point ? `${category}, point ${rc.annex_iii_point}` : category],
      ['Lifecycle stage', label('lifecycle_stage', d.lifecycle_stage)],
      ['Human oversight', label('oversight', d.human_oversight)],
      ['People affected', list(d.affected_persons)],
      ['Where it is used', list(d.jurisdictions)],
      ['EU database registration', d.eu_database_registration?.registration_id],
    );
  }
  rows.push(
    ['Information used and operating logic', p.data_and_logic],
    ['Market status', label('market_status', p.market_status)],
    ['Region', p.region],
    ['Contact', p.contact_email],
    ['More information', p.website_url],
    ['Last reviewed', d.last_reviewed],
  );
  return rows.filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== '');
}

/** The Markdown public summary of a register (one section per entry). */
export function publicSummaryMarkdown(entries, { notice, page, date, title = 'AI register: public summary' }) {
  const lines = [
    `# ${title}`,
    '',
    `> ${notice} Illustrative, not a claim of conformity.`,
    '',
    `Generated on ${date} with the AI register entry builder: ${page}`,
    '',
    `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}. Internal fields (scope, components, credentials, internal risk tier) are left out.`,
  ];
  for (const entry of entries) {
    const d = entry.doc ?? {};
    const name = d.name || d.id || 'Unnamed entry';
    lines.push('', `## ${mdCell(name)}`, '');
    lines.push(`\`${mdCell(d.id ?? '')}\`, version ${mdCell(d.version ?? 'not stated')}. ${KIND_LABELS[entry.kind]}.`);
    const sentence = d.public_record?.one_sentence_description;
    if (sentence) lines.push('', mdCell(sentence));
    const rows = publicFields(entry);
    if (rows.length) {
      lines.push('', '| Field | Value |', '|---|---|');
      for (const [key, value] of rows) lines.push(`| ${key} | ${mdCell(value)} |`);
    }
  }
  lines.push(
    '',
    '---',
    '',
    'Built with the AI Governance Engineer toolkit (CC BY 4.0). The content of each entry is its owner\'s.',
  );
  return `${lines.join('\n')}\n`;
}

// ---- Crosswalk ---------------------------------------------------------------------

function display(value) {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) {
    return value
      .map((item) => (item && typeof item === 'object' ? [item.type, item.ref ?? item.name].filter(Boolean).join(' ') : String(item)))
      .join('; ');
  }
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

/** The crosswalk for one entry: each row with the entry's own value. */
export function crosswalkFor(entry, rows) {
  const d = entry.doc ?? {};
  return rows.map((row) => ({
    ...row,
    value: row.paths
      .map((path) => display(getPath(d, path)))
      .filter(Boolean)
      .join('; '),
  }));
}

/** The crosswalk as CSV rows (header first). */
export function crosswalkCsvRows(entry, rows, columns) {
  return [
    ['Register field', 'Path', 'This entry', ...columns.map((c) => c.label)],
    ...crosswalkFor(entry, rows).map((row) => [
      row.label,
      row.paths.join(' + '),
      row.value,
      ...columns.map((c) => row[c.key] || 'No direct field'),
    ]),
  ];
}

/** The crosswalk as a Markdown table. */
export function crosswalkMarkdown(entry, rows, columns, { notice, page, date }) {
  const d = entry.doc ?? {};
  const lines = [
    `# Field crosswalk: ${mdCell(d.name || d.id || 'register entry')}`,
    '',
    `> ${notice} The mapping is illustrative, not a claim of conformity; the ISO/IEC 42001 SoA column names are to be verified against the standard.`,
    '',
    `Generated on ${date} from ${page}`,
    '',
    `| Register field | This entry | ${columns.map((c) => c.label).join(' | ')} |`,
    `|---|---|${columns.map(() => '---').join('|')}|`,
  ];
  for (const row of crosswalkFor(entry, rows)) {
    lines.push(
      `| ${mdCell(row.label)} | ${mdCell(row.value || '(empty)')} | ${columns.map((c) => mdCell(row[c.key] || 'No direct field')).join(' | ')} |`,
    );
  }
  return `${lines.join('\n')}\n`;
}
