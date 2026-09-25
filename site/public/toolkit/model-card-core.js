// model-card-core.js: the pure logic of /toolkit/model-card (no DOM, no side
// effects at import; tests/doc-builders.spec.ts runs it in Node). One record
// (model-card.v1.json) renders three ways:
//   - the record itself (JSON), checked against the published schema;
//   - a Hugging Face style model card: YAML front matter with the Hub's
//     metadata keys, then the Hub template's headings;
//   - a CycloneDX 1.7 BOM holding one component of type
//     "machine-learning-model" with its modelCard (the ML-BOM fragment).
// It also reads the card against the coverage checklist (EU AI Act Art. 11 and
// Annex IV, Art. 13(3), Art. 53(1); ISO/IEC 42001 Annex A; NIST AI RMF).
import { prune, orderBySchema, validate, getPath, toYaml, uuidV4, nowUtc, mdText } from './builders.js';
import { mdCell, slug } from './lib.js';

export const SCHEMA_ID = 'https://aigovernanceengineer.com/schemas/model-card.v1.json';
export const CDX_SPEC = '1.7';
export const CDX_SCHEMA = 'http://cyclonedx.org/schema/bom-1.7.schema.json';

export function exportCard(doc, schema) {
  const { $schema: _s, ...rest } = doc ?? {};
  return orderBySchema({ $schema: SCHEMA_ID, ...(prune(rest) ?? {}) }, schema);
}

export function checkCard(doc, schema) {
  const record = exportCard(doc, schema);
  return { record, errors: validate(schema, record) };
}

// ---- Coverage checklist ------------------------------------------------------------

/** Whether `path` is filled; "a[].b" means any item of list `a` has `b`. */
export function isFilled(record, path) {
  const [head, tail] = String(path).split('[].');
  if (tail !== undefined) {
    const list = getPath(record, head);
    return Array.isArray(list) && list.some((item) => isFilled(item ?? {}, tail));
  }
  const value = getPath(record, path);
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  if (typeof value === 'string') return value.trim() !== '';
  return true;
}

/** Read the record against the checklist. Each item gets a `state`:
 *  covered | partial | missing (fields the card holds), linked | not-linked
 *  (items that live in another artefact the card links), or not-applicable. */
export function evaluateChecklist(record, checklist) {
  const applies = {
    always: true,
    high_risk: record.applicability?.high_risk === true,
    gpai: record.applicability?.gpai === true,
  };
  return checklist.map((item) => {
    if (!applies[item.applies]) return { ...item, state: 'not-applicable', filled: [] };
    const filled = item.fields.filter((path) => isFilled(record, path));
    let state;
    if (item.elsewhere) state = filled.length ? 'linked' : 'not-linked';
    else if (item.any) state = filled.length ? 'covered' : 'missing';
    else state = filled.length === item.fields.length ? 'covered' : filled.length ? 'partial' : 'missing';
    return { ...item, state, filled };
  });
}

export const STATE_LABELS = {
  covered: 'Covered',
  partial: 'Partly covered',
  missing: 'Not covered',
  linked: 'Linked',
  'not-linked': 'Not linked',
  'not-applicable': 'Not applicable',
};

/** Counts per state over the applicable items. */
export function checklistSummary(results) {
  const counts = { applicable: 0, covered: 0, partial: 0, missing: 0 };
  for (const item of results) {
    if (item.state === 'not-applicable') continue;
    counts.applicable++;
    if (item.state === 'covered' || item.state === 'linked') counts.covered++;
    else if (item.state === 'partial') counts.partial++;
    else counts.missing++;
  }
  return counts;
}

export function checklistCsvRows(results, groups, site) {
  const groupLabel = Object.fromEntries(groups.map((g) => [g.id, g.label]));
  return [
    ['Group', 'Reference', 'Requirement', 'State', 'Card fields', 'Filled', 'Obligation'],
    ...results.map((item) => [
      groupLabel[item.group] ?? item.group,
      item.ref,
      item.text,
      STATE_LABELS[item.state],
      item.fields.join('; '),
      item.filled.join('; '),
      `${site}/obligations/${item.obligation.toLowerCase()}`,
    ]),
  ];
}

// ---- Hugging Face style card ----------------------------------------------------------

const MORE = '[More Information Needed]';
const text = (value) => (value === undefined || value === null || String(value).trim() === '' ? MORE : mdText(value));
const bullets = (list) => (Array.isArray(list) && list.length ? list.map((item) => `- ${mdText(item)}`).join('\n') : MORE);

/** The Hub metadata block (keys from the Hub's model card metadata spec). */
export function hfMetadata(record) {
  const meta = {};
  if (record.license) meta.license = record.license;
  if (record.languages?.length) meta.language = record.languages;
  if (record.library) meta.library_name = record.library;
  const tags = [...(record.tags ?? [])];
  if (tags.length) meta.tags = tags;
  const datasets = (record.datasets ?? []).map((d) => d.name).filter(Boolean);
  if (datasets.length) meta.datasets = datasets;
  const metrics = [...new Set((record.metrics ?? []).map((m) => m.type).filter(Boolean))];
  if (metrics.length) meta.metrics = metrics;
  if (record.base_model) meta.base_model = record.base_model;
  return meta;
}

/** The whole card: YAML front matter, the Hub template's sections, and the
 *  coverage checklist as an appendix. */
export function hfModelCard(record, results, { notice, page, date, groups, site }) {
  const meta = hfMetadata(record);
  const front = Object.keys(meta).length ? toYaml(meta).trimEnd() : '{}';
  const env = record.environmental ?? {};
  const metrics = record.metrics ?? [];
  const lines = [
    '---',
    front,
    '---',
    '',
    `# Model Card for ${mdCell(record.name || 'Model ID')}`,
    '',
    record.summary ? mdText(record.summary) : '',
    '',
    `> ${notice} Illustrative, not a claim of conformity. Version ${mdCell(record.version || 'not stated')}${record.last_updated ? `, card updated ${record.last_updated}` : ''}.`,
    '',
    '## Model Details',
    '',
    '### Model Description',
    '',
    text(record.description),
    '',
    `- **Developed by:** ${text(record.developer)}`,
    `- **Model type:** ${text([record.model_type, record.task].filter(Boolean).join(', '))}`,
    `- **Language(s) (NLP):** ${record.languages?.length ? record.languages.join(', ') : MORE}`,
    `- **License:** ${text(record.license)}`,
    `- **Finetuned from model:** ${text(record.base_model)}`,
    '',
    '### Model Sources',
    '',
    `- **Repository:** ${text(record.repository)}`,
    `- **Paper:** ${text(record.paper)}`,
    '',
    '## Uses',
    '',
    '### Direct Use',
    '',
    bullets(record.intended_uses),
    '',
    record.users?.length ? `Intended users: ${record.users.map(mdCell).join(', ')}.\n` : '',
    '### Downstream Use',
    '',
    text(record.downstream_use),
    '',
    '### Out-of-Scope Use',
    '',
    bullets(record.out_of_scope_uses),
    '',
    '## Bias, Risks, and Limitations',
    '',
    bullets(record.limitations),
    '',
    ...(record.ethical_considerations?.length
      ? [
          '| Risk | Mitigation |',
          '|---|---|',
          ...record.ethical_considerations.map((c) => `| ${mdCell(c.name)} | ${mdCell(c.mitigation ?? '')} |`),
          '',
        ]
      : []),
    ...(record.tradeoffs?.length ? ['Performance trade-offs:', '', bullets(record.tradeoffs), ''] : []),
    '### Recommendations',
    '',
    text(record.recommendations),
    '',
    '## Training Details',
    '',
    '### Training Data',
    '',
    text(record.training_data),
    '',
    ...(record.datasets?.length
      ? [
          '| Dataset | Used for | Description |',
          '|---|---|---|',
          ...record.datasets.map((d) => `| ${d.url ? `[${mdCell(d.name)}](${d.url})` : mdCell(d.name)} | ${mdCell(d.role ?? '')} | ${mdCell(d.description ?? '')} |`),
          '',
        ]
      : []),
    '### Training Procedure',
    '',
    text(record.training_procedure),
    '',
    '#### Preprocessing',
    '',
    text(record.preprocessing),
    '',
    '## Evaluation',
    '',
    '### Testing Data, Factors & Metrics',
    '',
    '#### Testing Data',
    '',
    text(record.evaluation_data),
    '',
    '#### Factors',
    '',
    (record.fairness_assessments ?? []).length
      ? record.fairness_assessments
          .map((f) => `- **${mdCell(f.group_at_risk)}.** Benefits: ${mdCell(f.benefits ?? 'not stated')}. Harms: ${mdCell(f.harms ?? 'not stated')}. Mitigation: ${mdCell(f.mitigation ?? 'not stated')}.`)
          .join('\n')
      : MORE,
    '',
    '#### Metrics',
    '',
    text(record.metrics_rationale),
    '',
    '### Results',
    '',
    metrics.length
      ? [
          '| Metric | Value | Interval | Slice | Dataset |',
          '|---|---|---|---|---|',
          ...metrics.map(
            (m) =>
              `| ${mdCell(m.type)} | ${mdCell(m.value)} | ${m.lower_bound || m.upper_bound ? `${mdCell(m.lower_bound ?? '')} to ${mdCell(m.upper_bound ?? '')}` : ''} | ${mdCell(m.slice ?? 'overall')} | ${mdCell(m.dataset ?? '')} |`,
          ),
        ].join('\n')
      : MORE,
    '',
    '## Environmental Impact',
    '',
    `- **Hardware Type:** ${text(env.hardware)}`,
    `- **Hours used:** ${text(env.hours)}`,
    `- **Cloud Provider:** ${text(env.cloud_provider)}`,
    `- **Compute Region:** ${text(env.region)}`,
    `- **Carbon Emitted:** ${text(env.co2_emitted)}`,
    ...(env.energy_kwh !== undefined ? [`- **Energy used in training:** ${env.energy_kwh} kWh`] : []),
    '',
    '## Technical Specifications',
    '',
    '### Model Architecture and Objective',
    '',
    text([record.architecture_family, record.architecture, record.learning_approach].filter(Boolean).join('; ')),
    '',
    '### Compute Infrastructure',
    '',
    text(record.compute_and_lifetime),
    '',
    '## Oversight and Operation',
    '',
    `- **Human oversight:** ${text(record.human_oversight)}`,
    `- **Explaining outputs:** ${text(record.explainability)}`,
    `- **Interpreting outputs:** ${text(record.output_interpretation)}`,
    `- **Pre-determined changes:** ${text(record.predetermined_changes)}`,
    `- **Logging:** ${text(record.logging)}`,
    `- **Robustness and cybersecurity:** ${text(record.cybersecurity)}`,
    '',
    '## More Information',
    '',
    ...linkLines(record),
    '',
    '## Model Card Contact',
    '',
    text(record.contact),
    '',
    '## Governance Coverage (indicative)',
    '',
    `Read against ${groups
      .filter((g) => results.some((r) => r.group === g.id && r.state !== 'not-applicable'))
      .map((g) => g.label)
      .join('; ')}. Mappings are illustrative, not a claim of conformity.`,
    '',
    '| Reference | Requirement | State |',
    '|---|---|---|',
    ...results
      .filter((r) => r.state !== 'not-applicable')
      .map((r) => `| [${mdCell(r.ref)}](${site}/obligations/${r.obligation.toLowerCase()}) | ${mdCell(r.text)} | ${STATE_LABELS[r.state]} |`),
    '',
    '---',
    '',
    `Generated on ${date} with the model card builder: ${page}`,
  ];
  return `${lines.join('\n').replace(/\n{3,}/g, '\n\n')}\n`;
}

function linkLines(record) {
  const links = record.links ?? {};
  const gpai = record.gpai ?? {};
  const rows = [
    ['Instructions for use', links.instructions_for_use],
    ['Risk management', links.risk_management],
    ['Impact assessment', links.impact_assessment],
    ['Post-market monitoring', links.post_market_monitoring],
    ['EU declaration of conformity', links.declaration_of_conformity],
    ['AIBOM', links.aibom],
    ['GPAI technical documentation', gpai.technical_documentation],
    ['Information for downstream providers', gpai.downstream_information],
    ['Copyright policy', gpai.copyright_policy],
    ['Training content summary', gpai.training_content_summary],
  ].filter(([, url]) => url);
  const out = rows.map(([label, url]) => `- **${label}:** ${url}`);
  if (record.standards_applied?.length) out.push(`- **Standards applied:** ${record.standards_applied.map(mdCell).join('; ')}`);
  if (record.change_log) out.push(`- **Changes since the previous version:** ${mdCell(record.change_log)}`);
  return out.length ? out : [MORE];
}

// ---- CycloneDX 1.7 -----------------------------------------------------------------------

const nonEmpty = (list) => (Array.isArray(list) && list.length ? list : undefined);
const clean = (value) => prune(value);

/**
 * The card as a CycloneDX 1.7 BOM with one component of type
 * "machine-learning-model". Every key used exists in bom-1.7.schema.json;
 * licences go in as a name (any text is valid there, unlike `id`, which must
 * be an SPDX identifier).
 * @param {Record<string, any>} record
 * @param {{ serial?: string, timestamp?: string, page: string, toolVersion?: string }} options
 */
export function cycloneDx(record, { serial = uuidV4(), timestamp = nowUtc(), page, toolVersion = '1' }) {
  const ref = `model-${slug(record.registry_id || record.name || 'model') || 'model'}-${slug(record.version || '') || 'unversioned'}`;
  const approach = record.learning_approach ? { type: record.learning_approach } : undefined;
  // componentData has no role or description field: both travel as properties
  // of its contents (`classification` is for sensitivity, not for use).
  const datasets = (record.datasets ?? []).map((d) =>
    clean({
      type: 'dataset',
      name: d.name,
      contents: clean({
        url: d.url,
        properties: nonEmpty(
          [
            ['aige:dataset:role', d.role],
            ['aige:dataset:description', d.description],
          ]
            .filter(([, v]) => v)
            .map(([name, value]) => ({ name, value })),
        ),
      }),
    }),
  );
  const env = record.environmental ?? {};
  const envProps = [
    ['aige:environmental:hardware', env.hardware],
    ['aige:environmental:hours', env.hours],
    ['aige:environmental:cloud-provider', env.cloud_provider],
    ['aige:environmental:region', env.region],
    ['aige:environmental:energy-kwh', env.energy_kwh === undefined ? undefined : String(env.energy_kwh)],
    ['aige:environmental:co2-emitted', env.co2_emitted],
  ]
    .filter(([, v]) => v !== undefined && String(v).trim() !== '')
    .map(([name, value]) => ({ name, value: String(value) }));

  const modelCard = clean({
    modelParameters: {
      approach,
      task: record.task,
      architectureFamily: record.architecture_family,
      modelArchitecture: record.architecture,
      datasets: nonEmpty(datasets),
      inputs: nonEmpty((record.inputs ?? []).map((format) => ({ format }))),
      outputs: nonEmpty((record.outputs ?? []).map((format) => ({ format }))),
    },
    quantitativeAnalysis: {
      performanceMetrics: nonEmpty(
        (record.metrics ?? []).map((m) =>
          clean({
            type: m.type,
            value: m.value,
            slice: m.slice,
            confidenceInterval:
              m.lower_bound || m.upper_bound ? clean({ lowerBound: m.lower_bound, upperBound: m.upper_bound }) : undefined,
          }),
        ),
      ),
    },
    considerations: {
      users: nonEmpty(record.users),
      useCases: nonEmpty(record.intended_uses),
      technicalLimitations: nonEmpty([...(record.limitations ?? []), ...(record.out_of_scope_uses ?? []).map((u) => `Out of scope: ${u}`)]),
      performanceTradeoffs: nonEmpty(record.tradeoffs),
      ethicalConsiderations: nonEmpty(
        (record.ethical_considerations ?? []).map((c) => clean({ name: c.name, mitigationStrategy: c.mitigation })),
      ),
      environmentalConsiderations: envProps.length ? { properties: envProps } : undefined,
      fairnessAssessments: nonEmpty(
        (record.fairness_assessments ?? []).map((f) =>
          clean({ groupAtRisk: f.group_at_risk, benefits: f.benefits, harms: f.harms, mitigationStrategy: f.mitigation }),
        ),
      ),
    },
  });

  const references = [
    ['vcs', record.repository],
    ['documentation', record.paper],
    ['documentation', record.links?.instructions_for_use, 'Instructions for use'],
    ['risk-assessment', record.links?.risk_management, 'Risk management record'],
    ['risk-assessment', record.links?.impact_assessment, 'Impact assessment'],
    ['documentation', record.links?.post_market_monitoring, 'Post-market monitoring plan'],
    ['attestation', record.links?.declaration_of_conformity, 'EU declaration of conformity'],
    ['bom', record.links?.aibom, 'AIBOM'],
    ['documentation', record.gpai?.technical_documentation, 'GPAI technical documentation (Annex XI)'],
    ['documentation', record.gpai?.downstream_information, 'Information for downstream providers (Annex XII)'],
    ['documentation', record.gpai?.copyright_policy, 'Copyright policy'],
    ['documentation', record.gpai?.training_content_summary, 'Public summary of training content'],
  ]
    .filter(([, url]) => url)
    .map(([type, url, comment]) => clean({ type, url, comment }));

  const component = clean({
    type: 'machine-learning-model',
    'bom-ref': ref,
    supplier: record.developer ? { name: record.developer } : undefined,
    name: record.name || 'unnamed model',
    version: record.version,
    description: record.description || record.summary,
    licenses: record.license ? [{ license: { name: record.license } }] : undefined,
    externalReferences: nonEmpty(references),
    modelCard,
    tags: nonEmpty(record.tags),
  });

  return {
    $schema: CDX_SCHEMA,
    bomFormat: 'CycloneDX',
    specVersion: CDX_SPEC,
    serialNumber: `urn:uuid:${serial}`,
    version: 1,
    metadata: {
      timestamp,
      tools: {
        components: [
          {
            type: 'application',
            name: 'AI Governance Engineer model card builder',
            version: toolVersion,
            externalReferences: [{ type: 'website', url: page }],
          },
        ],
      },
    },
    components: [component],
  };
}

/** Allowed keys of the CycloneDX 1.7 objects this builder writes, copied from
 *  bom-1.7.schema.json, so a test can prove no key outside the spec is used. */
export const CDX_KEYS = {
  bom: ['$schema', 'bomFormat', 'specVersion', 'serialNumber', 'version', 'metadata', 'components'],
  component: ['type', 'bom-ref', 'supplier', 'name', 'version', 'description', 'licenses', 'externalReferences', 'modelCard', 'tags'],
  modelCard: ['bom-ref', 'modelParameters', 'quantitativeAnalysis', 'considerations', 'properties'],
  modelParameters: ['approach', 'task', 'architectureFamily', 'modelArchitecture', 'datasets', 'inputs', 'outputs'],
  considerations: ['users', 'useCases', 'technicalLimitations', 'performanceTradeoffs', 'ethicalConsiderations', 'environmentalConsiderations', 'fairnessAssessments'],
  performanceMetric: ['type', 'value', 'slice', 'confidenceInterval'],
  approachTypes: ['supervised', 'unsupervised', 'reinforcement-learning', 'semi-supervised', 'self-supervised'],
  componentTypes: ['application', 'framework', 'library', 'container', 'platform', 'operating-system', 'device', 'device-driver', 'firmware', 'file', 'machine-learning-model', 'data', 'cryptographic-asset'],
  dataTypes: ['source-code', 'configuration', 'dataset', 'definition', 'other'],
};
