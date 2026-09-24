// impact-assessment-core.js: the pure logic of /toolkit/impact-assessment (no
// DOM, no side effects at import; tests/doc-builders.spec.ts runs it in Node).
// One record, three instruments, told apart by `type` as the published schema
// does (impact-assessment.v1.json): a FRIA (EU AI Act Art. 27), an AI system
// impact assessment (ISO/IEC 42005) and an AI addendum to a DPIA (GDPR Art. 35).
// It exports the record for a type (only the fields that type shows), reads the
// element coverage, links each risk to the measures that address it, and
// writes the Markdown report.
import { prune, orderBySchema, validate, getPath, splitPath } from './builders.js';
import { mdCell } from './lib.js';

export const SCHEMA_ID = 'https://aigovernanceengineer.com/schemas/impact-assessment.v1.json';
export const TYPES = ['fria', 'aiia', 'dpia_addendum'];

const shows = (spec, type) => !spec.showFor || spec.showFor.includes(type);

/** Top-level record keys the form shows for `type`. */
export function visibleKeys(sections, type) {
  const keys = new Set();
  for (const section of sections) {
    if (!shows(section, type)) continue;
    for (const field of section.fields) {
      if (shows(field, type)) keys.add(String(splitPath(field.path)[0]));
    }
  }
  return keys;
}

/** Drop the nested fields a type hides (authority_notification outside a FRIA). */
function hiddenPaths(sections, type) {
  const paths = [];
  for (const section of sections) {
    for (const field of section.fields) {
      if (shows(section, type) && !shows(field, type)) paths.push(field.path);
    }
  }
  return paths;
}

/** The record as exported for `type`: `$schema` and `type` set, hidden fields
 *  dropped, empty values pruned, keys in schema order. */
export function exportAssessment(doc, type, sections, schema) {
  const keys = visibleKeys(sections, type);
  const hidden = hiddenPaths(sections, type);
  const picked = {};
  for (const [key, value] of Object.entries(doc ?? {})) {
    if (keys.has(key)) picked[key] = value;
  }
  let record = prune(picked) ?? {};
  for (const path of hidden) {
    const parts = splitPath(path);
    if (parts.length === 1) delete record[parts[0]];
  }
  // A notification block only belongs to a FRIA.
  if (type !== 'fria') delete record.authority_notification;
  record = { $schema: SCHEMA_ID, ...record, type };
  return orderBySchema(record, schema);
}

export function checkAssessment(doc, type, sections, schema) {
  const record = exportAssessment(doc, type, sections, schema);
  return { record, errors: validate(schema, record) };
}

const filled = (record, path) => {
  const value = getPath(record, path);
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim() !== '';
  return true;
};

/** The instrument's elements and whether the record fills each. */
export function elementCoverage(record, type, { art27Elements, dpiaElements, iso42005Clauses }) {
  if (type === 'fria') {
    return art27Elements.map((e) => ({
      ref: `Art. 27(1)${e.point}`,
      text: e.text,
      filled: e.paths.every((p) => filled(record, p)),
    }));
  }
  if (type === 'dpia_addendum') {
    return dpiaElements.map((e) => ({
      ref: `Art. 35(7)${e.point}`,
      text: e.text,
      filled: e.paths.every((p) => filled(record, p)),
    }));
  }
  const sections = Array.isArray(record.iso42005_sections) ? record.iso42005_sections : [];
  return iso42005Clauses.map((c) => ({
    ref: c.clause,
    text: c.heading,
    filled: sections.some((s) => s && s.clause === c.clause && String(s.text ?? '').trim() !== ''),
  }));
}

/** Each risk with the measures that address it (by risk id, or by the right
 *  it names, as older records do), plus the loose ends. */
export function riskMatrix(record) {
  const risks = Array.isArray(record.risks) ? record.risks : [];
  const measures = Array.isArray(record.mitigations) ? record.mitigations : [];
  const keyOf = (risk, i) => risk.id || `#${i + 1}`;
  const hits = (measure, risk) =>
    (measure.addresses ?? []).some((a) => (risk.id && a === risk.id) || a === risk.right_or_interest);
  const rows = risks.map((risk, i) => {
    const l = Number(risk.likelihood);
    const s = Number(risk.severity);
    return {
      key: keyOf(risk, i),
      risk,
      score: Number.isFinite(l) && Number.isFinite(s) ? l * s : undefined,
      measures: measures.filter((m) => hits(m, risk)),
    };
  });
  const unaddressed = rows.filter((row) => !row.measures.length).map((row) => row.key);
  const unlinked = measures.filter((m) => !risks.some((r) => hits(m, r)));
  const known = new Set(risks.flatMap((r) => [r.id, r.right_or_interest].filter(Boolean)));
  const dangling = [...new Set(measures.flatMap((m) => (m.addresses ?? []).filter((a) => !known.has(a))))];
  const ids = risks.map((r) => r.id).filter(Boolean);
  const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
  return { rows, unaddressed, unlinked, dangling, duplicates };
}

/** Plain-language warnings about the linkage (not schema errors). */
export function linkageWarnings(matrix) {
  const out = [];
  if (matrix.unaddressed.length) {
    out.push(`No measure addresses ${matrix.unaddressed.length === 1 ? 'risk' : 'risks'} ${matrix.unaddressed.join(', ')}.`);
  }
  if (matrix.unlinked.length) {
    out.push(`${matrix.unlinked.length} ${matrix.unlinked.length === 1 ? 'measure is' : 'measures are'} not linked to any risk.`);
  }
  if (matrix.dangling.length) {
    out.push(`Measures point at risks that do not exist: ${matrix.dangling.join(', ')}.`);
  }
  if (matrix.duplicates.length) {
    out.push(`Risk ids are repeated: ${matrix.duplicates.join(', ')}. Give each risk its own id.`);
  }
  return out;
}

const LABELS = {
  outcome: {
    proceed: 'Proceed',
    proceed_with_mitigations: 'Proceed with the measures',
    do_not_proceed: 'Do not proceed',
    prior_consultation_required: 'Prior consultation required (GDPR Art. 36)',
  },
  status: { planned: 'Planned', in_place: 'In place', verified: 'Verified' },
  decision: {
    approve: 'Approve',
    approve_with_conditions: 'Approve with conditions',
    reject: 'Reject',
    abstain: 'Abstain',
  },
};

const para = (text) => String(text ?? '').trim();

/** The Markdown report of an assessment. */
export function assessmentMarkdown(record, type, data, { notice, page, date, errors = [], typeLabel, patternTitles = {} }) {
  const lines = [];
  const subject = record.subject || 'unnamed system';
  lines.push(`# ${typeLabel}: ${mdCell(subject)}`, '');
  lines.push(`> ${notice} Illustrative, not a claim of conformity.`, '');
  lines.push('| Field | Value |', '|---|---|');
  for (const [label, value] of [
    ['Assessment id', record.assessment_id],
    ['Type', `${typeLabel} (\`${type}\`)`],
    ['System assessed', record.subject],
    ['Assessor', record.assessor],
    ['Consulted', (record.consulted ?? []).join(', ')],
    ['Related assessments', (record.related_assessments ?? []).join(', ')],
  ]) {
    if (value) lines.push(`| ${label} | ${mdCell(value)} |`);
  }
  lines.push(
    '',
    errors.length
      ? `**Draft.** The record does not validate against the impact-assessment schema yet: ${errors.length} ${errors.length === 1 ? 'problem' : 'problems'}.`
      : 'The record validates against the impact-assessment schema (v1).',
  );

  // Elements of the instrument.
  if (type === 'fria') {
    lines.push('', '## Art. 27(1) elements', '');
    const texts = {
      '(a)': record.processes,
      '(b)': record.period_and_frequency,
      '(c)': (record.affected_categories ?? []).map((c) => `- ${mdCell(c)}`).join('\n'),
      '(d)': record.risks?.length ? `${record.risks.length} specific ${record.risks.length === 1 ? 'risk' : 'risks'}, below.` : '',
      '(e)': record.human_oversight_measures,
      '(f)': [record.governance_and_complaints, record.mitigations?.length ? `${record.mitigations.length} measures, below.` : '']
        .filter(Boolean)
        .join('\n\n'),
    };
    for (const e of data.art27Elements) {
      lines.push(`### ${e.point} ${e.text}`, '', para(texts[e.point]) || '_Not recorded._', '');
    }
  } else if (type === 'aiia') {
    lines.push('', '## ISO/IEC 42005 elements', '');
    const sections = record.iso42005_sections ?? [];
    for (const c of data.iso42005Clauses) {
      const entry = sections.find((s) => s.clause === c.clause);
      lines.push(`### ${c.clause} ${c.heading}`, '', para(entry?.text) || '_Not recorded._', '');
    }
    if (record.affected_categories?.length) {
      lines.push('### Groups affected', '', ...record.affected_categories.map((c) => `- ${mdCell(c)}`), '');
    }
  } else {
    lines.push('', '## Art. 35(7) content and AI-specific fields', '');
    const ai = record.ai_specific ?? {};
    for (const [heading, value] of [
      ['(a) The processing and its purposes', record.processing_description],
      ['(b) Necessity and proportionality', record.necessity_and_proportionality],
      ['Training data versus operational data', ai.training_vs_operational_data],
      [
        'Solely automated decisions with legal or similar effect (GDPR Art. 22)',
        ai.automated_decision_making === undefined ? '' : ai.automated_decision_making ? 'Yes.' : 'No.',
      ],
      ['Inferences about people', ai.inferences],
      ['Memorisation and extraction of personal data', ai.memorisation_and_extraction],
      ['Advice of the data protection officer', record.dpo_advice],
    ]) {
      lines.push(`### ${heading}`, '', para(value) || '_Not recorded._', '');
    }
  }

  // Risks and measures.
  const matrix = riskMatrix(record);
  lines.push('## Risks', '');
  if (matrix.rows.length) {
    lines.push('| Id | Right or interest | How harm could occur | Who | Likelihood | Severity | Score | Measures |', '|---|---|---|---|---|---|---|---|');
    for (const row of matrix.rows) {
      const r = row.risk;
      lines.push(
        `| ${mdCell(row.key)} | ${mdCell(r.right_or_interest)} | ${mdCell(r.description)} | ${mdCell(r.affected_group ?? '')} | ${r.likelihood ?? ''} | ${r.severity ?? ''} | ${row.score ?? ''} | ${mdCell(row.measures.map((m) => m.measure).join('; ') || 'None yet')} |`,
      );
    }
  } else lines.push('_No risks recorded._');
  const warnings = linkageWarnings(matrix);
  if (warnings.length) lines.push('', ...warnings.map((w) => `> ${w}`));

  lines.push('', '## Measures', '');
  if (record.mitigations?.length) {
    lines.push('| Measure | Addresses | Pattern | Controls | Owner | Status | Evidence |', '|---|---|---|---|---|---|---|');
    for (const m of record.mitigations) {
      const pattern = m.pattern ? `[${patternTitles[m.pattern] ?? 'pattern'}](${m.pattern})` : '';
      lines.push(
        `| ${mdCell(m.measure)} | ${mdCell((m.addresses ?? []).join(', '))} | ${pattern} | ${mdCell((m.controls ?? []).join(', '))} | ${mdCell(m.owner ?? '')} | ${LABELS.status[m.status] ?? mdCell(m.status ?? '')} | ${m.evidence ? mdCell(m.evidence) : ''} |`,
      );
    }
  } else lines.push('_No measures recorded._');

  lines.push('', '## Outcome', '');
  lines.push(`- **Outcome:** ${LABELS.outcome[record.outcome] ?? 'not decided'}`);
  if (record.residual_risk) lines.push(`- **Residual risk:** ${mdCell(record.residual_risk)}`);
  if (type === 'fria' && record.authority_notification) {
    const n = record.authority_notification;
    lines.push(
      `- **Notification to the market surveillance authority (Art. 27(3)):** ${n.required ? 'required' : 'not required'}${n.authority ? `, ${mdCell(n.authority)}` : ''}${n.notified_at ? `, notified on ${n.notified_at}` : ''}`,
    );
  }

  lines.push('', '## Approvals', '');
  if (record.approvals?.length) {
    lines.push('| Role | Decision | Conditions | Time |', '|---|---|---|---|');
    for (const a of record.approvals) {
      lines.push(`| ${mdCell(a.role)} | ${LABELS.decision[a.decision] ?? mdCell(a.decision ?? '')} | ${mdCell(a.conditions ?? '')} | ${mdCell(a.timestamp ?? '')} |`);
    }
  } else lines.push('_No approvals recorded._');

  lines.push('', '## Re-open triggers', '');
  if (record.review_triggers?.length) lines.push(...record.review_triggers.map((t) => `- ${mdCell(t)}`));
  else lines.push('_No triggers recorded: the assessment is a snapshot until one is added._');
  if (record.next_review) lines.push('', `Next scheduled review: ${record.next_review}.`);

  lines.push(
    '',
    '---',
    '',
    `Generated on ${date} with the impact assessment builder: ${page}`,
    `Record schema: ${SCHEMA_ID}`,
  );
  return `${lines.join('\n')}\n`;
}
