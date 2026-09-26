// controls-md.ts: the pieces the open control profile pages share with their
// Markdown twins (/controls/<profile>.md). The page metadata (the <title> and
// meta description each profile page carries), the aggregated open questions
// and the mappings rows are computed here once, so the HTML page and the
// Markdown twin cannot drift; `controlsMarkdown(profile)` builds the twin's
// body: an H2 per section and per control, the record's rows as bullets and
// the numbered sources in the house line of STYLEGUIDE.md §6.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity.
import {
  type Control,
  type ControlProfile,
  controlsIn,
  controlPath,
  controlApiPath,
  profilePath,
  profileSources,
  sourceNumber,
  nistAiRmfSubcategories,
  verificationLabels,
  subjectKindLabels,
  statusLabels,
  reviewerStatusLabels,
  depthLabels,
} from '../data/controls';
import { enforcementLabels, effectLabels } from '../data/policy-card';
import { layers } from '../data/stack';
import { getPatternBySlug, patternPath } from '../data/patterns';
import { agentControls, agentAnchors, agentChapter } from '../data/tool-agent-controls';
import { obligationPath } from '../data/frameworks';
import { iso42001Controls, threatById, threatAnchor, obligationLabel } from '../data/threats';
import { site } from '../data/site';
import { personById } from '../data/people';
import { sourceText } from './sources';
import { datasetByName } from './api';
import observationSchema from '../../public/schemas/control-observation.v1.json';

// ---- Machine-readable links ---------------------------------------------------
//
// The controls dataset (/api/v1/controls.json and its generated schema) and the
// control-observation record (public/schemas/control-observation.v1.json, its
// example and its template). The dataset is linked only when lib/api.ts
// registers it; the observation files ship in site/public.

/** Whether the `controls` dataset is registered in lib/api.ts. */
export const hasControlsDataset = (): boolean => datasetByName('controls') !== undefined;

export const CONTROLS_DATASET_PATH = '/api/v1/controls.json';
export const CONTROLS_SCHEMA_PATH = '/api/v1/schemas/controls.json';
export const OBSERVATION_SCHEMA_PATH = '/schemas/control-observation.v1.json';
export const OBSERVATION_EXAMPLE_PATH = '/schemas/examples/control-observation.example.json';
export const OBSERVATION_TEMPLATE_PATH = '/templates/control-observation.md';

/** One machine-readable artefact a page may link. */
export interface MachineLink {
  label: string;
  href: string;
  note: string;
  /** Umami event name for the link, when it is a download. */
  event?: string;
}

/** The dataset and observation-record links that exist in this build, in page order. */
export function machineLinks(): MachineLink[] {
  const out: MachineLink[] = [];
  if (hasControlsDataset()) {
    out.push({
      label: 'All controls as JSON',
      href: CONTROLS_DATASET_PATH,
      note: 'every control of every profile, in the envelope of the open data API',
      event: 'control-download',
    });
    out.push({
      label: 'JSON Schema of the controls dataset',
      href: CONTROLS_SCHEMA_PATH,
      note: 'generated from the same registry',
      event: 'schema-download',
    });
  }
  out.push({
    label: 'Control observation schema',
    href: OBSERVATION_SCHEMA_PATH,
    note: 'the record a check of a control emits: control_id, subject, expected, observed, status, timestamp, evidence',
    event: 'schema-download',
  });
  out.push({
    label: 'Observation example',
    href: OBSERVATION_EXAMPLE_PATH,
    note: 'a filled record that validates against the schema',
    event: 'schema-download',
  });
  out.push({
    label: 'Observation template',
    href: OBSERVATION_TEMPLATE_PATH,
    note: 'the same fields in Markdown, with short guidance',
    event: 'schema-download',
  });
  return out;
}

/**
 * The declarative Umami attributes of a machine-readable link (no script),
 * from its `event`: the controls dataset is a control-download, the schemas and
 * the observation's example and template a schema-download naming the schema
 * and the file.
 */
export function machineEvent(link: MachineLink): Record<string, string> {
  if (link.event === 'control-download') {
    return { 'data-umami-event': 'control-download', 'data-umami-event-id': 'all', 'data-umami-event-format': 'json' };
  }
  if (link.event === 'schema-download') {
    const schema = link.href.includes('control-observation') ? 'control-observation' : 'controls';
    return { 'data-umami-event': 'schema-download', 'data-umami-event-schema': schema, 'data-umami-event-file': link.href };
  }
  return {};
}

/** The statuses an observation may carry, read from the schema's enum. */
export const OBSERVATION_STATUSES: readonly string[] = observationSchema.properties.status.enum;

/** The statuses as prose: "pass, fail or not_applicable". */
export const observationStatusText = (): string =>
  `${OBSERVATION_STATUSES.slice(0, -1).join(', ')} or ${OBSERVATION_STATUSES[OBSERVATION_STATUSES.length - 1]}`;

/** The <title> (bare, without the site suffix) and meta description of each profile page. */
export interface ProfilePageMeta {
  seoTitle: string;
  description: string;
}

// The titles are the ones tests/seo-titles.spec.ts HUBS and /llms.txt expect;
// the descriptions stay inside the 110-158 character window of the SEO gates.
const PAGE_META: Readonly<Record<string, ProfilePageMeta>> = {
  'evaluation-environment': {
    seoTitle: 'AI evaluation environment controls',
    description:
      'An open control profile for AI evaluation environments: isolation, tool access, telemetry and evidence requirements. Draft v0.1.',
  },
  'agent-runtime': {
    seoTitle: 'AI agent runtime controls',
    description:
      'An open control profile for AI agents at runtime: identity, tool mediation, execution limits, stop conditions and telemetry. Draft v0.1, from chapter 23.',
  },
};

/** The page metadata of a profile; throws for a profile with none, so a new profile fails the build until it has its own. */
export function profilePageMeta(slug: string): ProfilePageMeta {
  const meta = PAGE_META[slug];
  if (!meta) throw new Error(`controls-md: no page title and description for profile ${slug}`);
  if (meta.description.length < 110 || meta.description.length > 158) {
    throw new Error(`controls-md: description of ${slug} is ${meta.description.length} characters (110-158)`);
  }
  return meta;
}

/** The three-digit number of a control, as its heading shows it. */
export const controlNumber = (c: Pick<Control, 'id'>): string => c.id.slice(-3);

/** A control's heading text: "001 Authorization Boundary". */
export const controlHeading = (c: Pick<Control, 'id' | 'title'>): string => `${controlNumber(c)} ${c.title}`;

/** Two-digit layer label: "Layer 04 Runtime". */
export function layerText(n: number): string {
  const layer = layers.find((l) => l.n === n);
  return `Layer ${String(n).padStart(2, '0')}${layer ? ` ${layer.name}` : ''}`;
}

/** An open question and the controls of the profile that raise it, in first-use order. */
export interface AggregatedQuestion {
  question: string;
  controls: Control[];
}

/** Every open question of a profile, deduplicated by text, with the controls that raise it. */
export function aggregatedQuestions(slug: string): AggregatedQuestion[] {
  const byText = new Map<string, AggregatedQuestion>();
  for (const c of controlsIn(slug)) {
    for (const q of c.openQuestions) {
      const entry = byText.get(q) ?? { question: q, controls: [] };
      entry.controls.push(c);
      byText.set(q, entry);
    }
  }
  return [...byText.values()];
}

/** How many controls of a profile sit at each depth. */
export function depthCounts(slug: string): Record<Control['depth'], number> {
  const counts: Record<Control['depth'], number> = { specified: 0, derived: 0, stub: 0 };
  for (const c of controlsIn(slug)) counts[c.depth] += 1;
  return counts;
}

/** Profile reviewers as StatusLine takes them. */
export function profileReviewers(profile: ControlProfile): { name: string; href?: string }[] {
  return profile.reviewers
    .map((id) => personById(id))
    .filter((p) => p !== undefined)
    .map((p) => ({ name: p.name, href: p.href }));
}

/** One row of a profile's mappings table (display strings, no markup). */
export interface MappingRow {
  control: Control;
  obligations: string[];
  iso42001: string[];
  nistAiRmf: string[];
  owasp: string[];
  aiuc1: string[];
  layer: string;
}

export function mappingRows(slug: string): MappingRow[] {
  return controlsIn(slug).map((c) => ({
    control: c,
    obligations: [...c.mappings.obligations],
    iso42001: [...c.mappings.iso42001],
    nistAiRmf: [...c.mappings.nistAiRmf],
    owasp: c.mappings.owasp.map((id) => threatById(id)?.externalId ?? id),
    aiuc1: [...(c.mappings.aiuc1 ?? [])],
    layer: [c.layer, ...(c.secondaryLayers ?? [])].map((n) => `L${n}`).join(', '),
  }));
}

// ---- Markdown ----------------------------------------------------------------

const abs = (path: string): string => `${site.url}${path}`;
const TBD = 'To be specified.';

/** A Markdown link to a page of this site. */
const link = (text: string, path: string): string => `[${text}](${abs(path)})`;

/** Escape the pipes of a table cell. */
const cell = (text: string): string => (text === '' ? ' ' : text.replace(/\|/g, '\\|'));

/** The record of one control as Markdown bullets, rows in the page's order. */
function controlBlock(c: Control, profile: ControlProfile): string {
  const sources = profileSources(profile.slug);
  const m = c.mappings;
  const bullets: string[] = [];
  const nested = (items: readonly string[]) => items.map((item) => `  - ${item}`);

  bullets.push(`- Id: \`${c.id}\` · v${c.version} · ${statusLabels[c.status]} · ${reviewerStatusLabels[c.reviewerStatus]}`);
  bullets.push(`- Depth: ${depthLabels[c.depth]}`);
  bullets.push(`- Objective: ${c.objective}`);
  bullets.push(c.failureModes.length > 0 ? '- Failure modes:' : `- Failure modes: ${TBD}`, ...nested(c.failureModes));
  bullets.push(`- Scope: ${c.scope}`);
  bullets.push('- Enforcement points:', ...nested(c.enforcementPoints.map((e) => enforcementLabels[e])));
  bullets.push(
    c.verification.length > 0 ? '- Verification:' : `- Verification: ${TBD}`,
    ...nested(c.verification.map((v) => `${verificationLabels[v.kind]}: ${v.text}`)),
  );
  bullets.push(
    c.evidence.length > 0 ? '- Evidence:' : `- Evidence: ${TBD}`,
    ...nested(
      c.evidence.map(
        (ev) =>
          `${ev.artefact} · ${layerText(ev.layer)}${ev.schemaId ? ` · ${link(`${ev.schemaId}.v1`, `/resources/templates#schema-${ev.schemaId}`)}` : ''}`,
      ),
    ),
  );
  bullets.push(`- Failure response: ${effectLabels[c.failureResponse.effect]}. ${c.failureResponse.text}`);
  const layerLinks = [c.layer, ...(c.secondaryLayers ?? [])].map((n) => {
    const layer = layers.find((l) => l.n === n);
    return layer ? link(layerText(n), `/bok/the-stack#${layer.chapterAnchor}`) : layerText(n);
  });
  bullets.push(`- ${layerLinks.length > 1 ? 'Layers' : 'Layer'}: ${layerLinks.join(', ')}`);

  const patternLinks = c.patterns
    .map((slug) => getPatternBySlug(slug))
    .filter((p) => p !== undefined)
    .map((p) => link(p.title, patternPath(p)));
  if (patternLinks.length > 0) bullets.push(`- Patterns: ${patternLinks.join(', ')}`);

  const seedLinks = c.seeds
    .map((id) => agentControls.find((a) => a.id === id))
    .filter((s) => s !== undefined)
    .map((s) => link(s.title, `${agentChapter}#${agentAnchors[s.anchor]}`));
  if (seedLinks.length > 0) bullets.push(`- Seeded from: ${seedLinks.join(', ')}`);

  const maps: string[] = [];
  if (m.obligations.length > 0) {
    maps.push(`Obligations: ${m.obligations.map((id) => link(obligationLabel(id), obligationPath({ id }))).join('; ')}`);
  }
  if (m.iso42001.length > 0) maps.push(`ISO/IEC 42001: ${m.iso42001.map((id) => `${id} ${iso42001Controls[id]}`).join('; ')}`);
  if (m.nistAiRmf.length > 0) maps.push(`NIST AI RMF: ${m.nistAiRmf.map((id) => `${id} ${nistAiRmfSubcategories[id]}`).join('; ')}`);
  const threatLinks = (ids: readonly string[]) =>
    ids
      .map((id) => threatById(id))
      .filter((t) => t !== undefined)
      .map((t) => link(`${t.externalId} ${t.name}`, `/resources/threats#${threatAnchor(t)}`))
      .join('; ');
  if (m.owasp.length > 0) maps.push(`OWASP: ${threatLinks(m.owasp)}`);
  if ((m.atlas ?? []).length > 0) maps.push(`MITRE ATLAS: ${threatLinks(m.atlas ?? [])}`);
  if ((m.aiuc1 ?? []).length > 0) maps.push(`AIUC-1: ${(m.aiuc1 ?? []).join(', ')}`);
  if ((m.csaAicm ?? []).length > 0) maps.push(`CSA AICM: ${(m.csaAicm ?? []).join(', ')}`);
  for (const o of m.other ?? []) maps.push(`${o.framework}: ${o.ref}${o.note ? ` (${o.note})` : ''}`);
  if (maps.length > 0) bullets.push('- Mappings:', ...nested(maps));

  if (c.references.length > 0) {
    bullets.push(
      '- References:',
      ...nested(c.references.map((src) => `[${sourceNumber(sources, src)}] ${src.title}${src.gloss ? ` (${src.gloss})` : ''}`)),
    );
  }
  if (c.implementationNotes.length > 0) bullets.push('- Implementation notes:', ...nested(c.implementationNotes));
  if (c.openQuestions.length > 0) bullets.push('- Open questions:', ...nested(c.openQuestions));
  if (c.observation) {
    bullets.push(
      '- Observation:',
      ...nested([
        `Subject: ${subjectKindLabels[c.observation.subjectKind]}`,
        `Expected: ${c.observation.expected}`,
        `Example: ${c.observation.observedExample}`,
      ]),
    );
  }
  bullets.push(`- JSON: ${abs(controlApiPath(c))}`);

  return [`## ${c.id} ${c.title}`, `Anchor: ${abs(controlPath(c))}`, bullets.join('\n')].join('\n\n');
}

/** The mappings table of a profile, as a Markdown table. */
function mappingsTable(slug: string): string {
  const head = '| Control | Obligations | ISO/IEC 42001 | NIST AI RMF | OWASP | AIUC-1 | Layer |';
  const rule = '| --- | --- | --- | --- | --- | --- | --- |';
  const rows = mappingRows(slug).map((r) =>
    [
      `\`${r.control.id}\` ${r.control.title}`,
      r.obligations.join(', '),
      r.iso42001.join(', '),
      r.nistAiRmf.join(', '),
      r.owasp.join(', '),
      r.aiuc1.join(', '),
      r.layer,
    ]
      .map(cell)
      .join(' | '),
  );
  return [head, rule, ...rows.map((row) => `| ${row} |`)].join('\n');
}

/** The body of a profile's Markdown twin (everything under the H1). */
export function controlsMarkdown(profile: ControlProfile): string {
  const rows = controlsIn(profile.slug);
  const sources = profileSources(profile.slug);
  const questions = aggregatedQuestions(profile.slug);
  const reviewers = profileReviewers(profile);
  const authors = profile.authors
    .map((id) => personById(id)?.name)
    .filter((name) => name !== undefined);

  return [
    `> ${profile.summary}`,
    [
      `- Version: ${profile.version}`,
      `- Status: ${statusLabels[profile.status]}`,
      `- Review: ${reviewers.length > 0 ? `Reviewed by ${reviewers.map((r) => r.name).join(', ')}` : 'Open for technical review'}`,
      `- Published: ${profile.published}`,
      `- Updated: ${profile.updated}`,
      `- Authors: ${authors.join(', ')}`,
      `- Controls: ${rows.length}`,
    ].join('\n'),
    'Draft for review, not a claim of conformity. These are draft control specifications, open for technical review: illustrative, not legal advice and binding on no one.',
    '## Scope',
    profile.scope,
    '## How to read a control',
    [
      'Each control has a stable id (`AIGE-CTL-<PROFILE>-<NNN>`) that never changes and is never reused, and records:',
      '',
      '- Objective: the outcome the control secures, in one sentence.',
      '- Failure modes: observable events that mean the control failed.',
      '- Scope, enforcement points (pre_merge, deploy, runtime, periodic) and the failure response (deny, require_approval, alert).',
      '- Verification: how a third party would check it (inspect, test, observe, attest).',
      '- Evidence: the artefact it leaves and the stack layer that keeps it.',
      '- Mappings: obligations, ISO/IEC 42001 Annex A, NIST AI RMF, OWASP and other references, each id checked against the site registers.',
      '',
      `Depth: ${depthLabels.specified} controls carry a verification procedure, evidence, notes and an observation example; "${depthLabels.derived}" controls restate one agent control of chapter 23 and add nothing it does not say; "${depthLabels.stub}" controls are skeletons with open questions.`,
      '',
      `An observation is what a check of a control would emit: control_id, subject, expected, observed, status (${observationStatusText()}), timestamp and evidence[].`,
    ].join('\n'),
    ...rows.map((c) => controlBlock(c, profile)),
    '## Mappings',
    'Mappings are illustrative, not a claim of conformity.',
    mappingsTable(profile.slug),
    '## Open questions',
    questions.length > 0
      ? questions
          .map((q) => `- ${q.question} (${q.controls.map((c) => `\`${c.id}\``).join(', ')})`)
          .join('\n')
      : 'No open questions are recorded yet.',
    '## Changelog',
    profile.changelog.map((e) => `- v${e.version} (${e.date}): ${e.note}`).join('\n'),
    '## Sources',
    sources.length > 0
      ? sources.map((s, i) => `[${i + 1}] ${sourceText(s)} ${s.url} (verified: ${s.verified})`).join('\n')
      : 'No sources are cited yet: the controls of this draft cite theirs as they are specified.',
    '## Machine-readable',
    [
      `- Each control as JSON: ${abs('/api/v1/controls')}/<id in lower case>.json (for example ${abs(controlApiPath(rows[0]))})`,
      ...machineLinks().map((l) => `- ${l.label}: ${abs(l.href)} (${l.note})`),
      `- The open data API: ${abs('/resources/data')}`,
    ].join('\n'),
    '## Review',
    `Review a control through the issue form: ${site.github}/issues/new?template=${profile.issueTemplate}. How review works: ${abs('/contribute')}. Page: ${abs(profilePath(profile))}`,
  ].join('\n\n');
}
