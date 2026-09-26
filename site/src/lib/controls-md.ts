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
  type ObservationExample,
  controlsIn,
  controlAnchorPath,
  controlApiPath,
  controlPagePath,
  observationExamples,
  profileBySlug,
  profileCitation,
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
import { getPatternBySlug, patternPath, type PatternDef } from '../data/patterns';
import { agentControls, agentAnchors, agentChapter } from '../data/tool-agent-controls';
import { obligationById, obligationPath, type Obligation } from '../data/frameworks';
import { iso42001Controls, threatById, threatAnchor, obligationLabel, taxonomyOf, type Threat } from '../data/threats';
import { getChapterBySlug } from '../data/chapters';
import type { IncidentCase } from '../data/cases';
import { site } from '../data/site';
import { personById } from '../data/people';
import { sourceText, type Source } from './sources';
import { datasetByName } from './api';
import { casesForControl } from './cross-links';
import { casePath } from './llms';
import { readSource } from './md-parse';
import { profilePageMeta, type ProfilePageMeta } from '../data/controls/page-meta';
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

// The <title> and meta description of each profile page live in
// ../data/controls/page-meta.ts (no JSON import, so tests can import it);
// re-exported here so the callers keep their import.
export { profilePageMeta, type ProfilePageMeta };

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

// ---- Derived controls ----------------------------------------------------------
//
// A derived control restates site material and adds nothing it does not say:
// an agent control of chapter 23 (its `seeds`) or the patterns, record schemas
// and chapters it names in `derivedFrom`. The pages and the twins name that
// material, per control and per profile, rather than assume chapter 23.

/** One piece of site material a derived control restates, as a link. */
export interface DerivedSource {
  label: string;
  href: string;
}

/** The chapter title without its number: "Privacy and data protection law applied to AI". */
const chapterName = (title: string): string => title.replace(/^\d+\.\s*/, '');

/** The material a control restates, in the order seeds, then `derivedFrom`; empty for a control with none. */
export function derivedSources(c: Pick<Control, 'seeds' | 'derivedFrom'>): DerivedSource[] {
  const out: DerivedSource[] = [];
  if (c.seeds.length > 0) out.push({ label: 'the agent controls of chapter 23', href: agentChapter });
  for (const src of c.derivedFrom ?? []) {
    if (src.kind === 'pattern') {
      const p = getPatternBySlug(src.ref);
      out.push({ label: `the ${p?.title ?? src.ref} pattern`, href: p ? patternPath(p) : `/patterns/${src.ref}` });
    } else if (src.kind === 'schema') {
      out.push({ label: `the ${src.ref}.v1 record schema`, href: `/resources/templates#schema-${src.ref}` });
    } else {
      const ch = getChapterBySlug(src.ref);
      out.push({
        label: ch ? `chapter ${ch.order}, ${chapterName(ch.title)}` : `the chapter ${src.ref}`,
        href: `/bok/${src.ref}`,
      });
    }
  }
  return out;
}

/** "a, b and c". */
function listText(items: readonly string[]): string {
  return items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

/**
 * What the derived controls of a profile restate, as the phrase after
 * "derived from": "chapter 23" for the agent runtime profile, "site patterns
 * and record schemas" for a profile built on them. '' for a profile with no
 * derived control.
 */
export function derivedPhrase(slug: string): string {
  const rows = controlsIn(slug).filter((c) => c.depth === 'derived');
  const kinds = new Set<string>();
  for (const c of rows) {
    if (c.seeds.length > 0) kinds.add('seed');
    for (const src of c.derivedFrom ?? []) kinds.add(src.kind);
  }
  const words: Record<string, string> = {
    seed: 'chapter 23',
    pattern: 'site patterns',
    schema: 'record schemas',
    chapter: 'chapters of the Body of Knowledge',
  };
  return listText(['seed', 'pattern', 'schema', 'chapter'].filter((k) => kinds.has(k)).map((k) => words[k]));
}

/** A profile's depth counts as prose: "9 specified", "31 derived from chapter 23", "2 draft outlines". */
export function depthLine(slug: string): string {
  const counts = depthCounts(slug);
  const phrase = derivedPhrase(slug);
  return [
    counts.specified > 0 ? `${counts.specified} ${depthLabels.specified.toLowerCase()}` : '',
    counts.derived > 0 ? `${counts.derived} derived${phrase ? ` from ${phrase}` : ''}` : '',
    counts.stub > 0 ? `${counts.stub} draft outline${counts.stub === 1 ? '' : 's'}` : '',
  ]
    .filter(Boolean)
    .join(', ');
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

/**
 * The record of one control as Markdown bullets, rows in the page's order.
 * `sources` is the numbered list its references cite: the profile's on the
 * profile twin, the control's own on its page twin.
 */
function controlBullets(c: Control, sources: readonly Source[]): string {
  const m = c.mappings;
  const bullets: string[] = [];
  const nested = (items: readonly string[]) => items.map((item) => `  - ${item}`);

  bullets.push(`- Id: \`${c.id}\` · v${c.version} · ${statusLabels[c.status]} · ${reviewerStatusLabels[c.reviewerStatus]}`);
  const restates = c.depth === 'derived' ? derivedSources(c) : [];
  bullets.push(
    `- Depth: ${depthLabels[c.depth]}${restates.length > 0 ? ` (${restates.map((s) => link(s.label, s.href)).join('; ')})` : ''}`,
  );
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
  return bullets.join('\n');
}

/** One control's section of a profile twin: its heading, its anchor, its page when it has one, and its record. */
function controlBlock(c: Control, profile: ControlProfile): string {
  const page = controlPagePath(c);
  return [
    `## ${c.id} ${c.title}`,
    `Anchor: ${abs(controlAnchorPath(c))}${page ? `\nPage: ${abs(page)}` : ''}`,
    controlBullets(c, profileSources(profile.slug)),
  ].join('\n\n');
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
      `Depth: ${depthLabels.specified} controls carry a verification procedure, evidence, notes and an observation example, and have a page of their own; "${depthLabels.derived}" controls restate existing site material (an agent control of chapter 23, a pattern, a record schema or a chapter, named on each control) and add nothing it does not say; "${depthLabels.stub}" controls are skeletons with open questions. This profile: ${depthLine(profile.slug)}.`,
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

// ---- Control pages ---------------------------------------------------------------
//
// A specified control has a page of its own (/controls/<profile>/<id>) and a
// Markdown twin at the same URL plus `.md`. Both read the pieces below, so the
// page and the twin cannot drift: the <title> and description, the control's
// own numbered sources, what it connects to on the site and its two example
// observations (public/controls/examples/).

/** The <title> (bare, without the site suffix) and meta description of a control page. */
export function controlPageMeta(c: Control): ProfilePageMeta {
  if (!c.pageTitle || !c.pageDescription) throw new Error(`controls-md: ${c.id} has no pageTitle or pageDescription`);
  return { seoTitle: c.pageTitle, description: c.pageDescription };
}

/** The profile a control belongs to; throws on an unknown slug. */
export function profileOf(c: Pick<Control, 'id' | 'profile'>): ControlProfile {
  const profile = profileBySlug(c.profile);
  if (!profile) throw new Error(`controls-md: ${c.id} names unknown profile ${c.profile}`);
  return profile;
}

/** A control's own references, deduplicated by URL, numbered in first-use order on its page. */
export function controlSources(c: Pick<Control, 'references'>): Source[] {
  const seen = new Set<string>();
  return c.references.filter((src) => (seen.has(src.url) ? false : (seen.add(src.url), true)));
}

/** What a control connects to on the site: the cases that name it, its patterns, obligations and threats. */
export interface ControlRelations {
  cases: IncidentCase[];
  patterns: PatternDef[];
  obligations: Obligation[];
  threats: Threat[];
}

export function controlRelations(c: Control): ControlRelations {
  const m = c.mappings;
  return {
    cases: casesForControl(c.id),
    patterns: c.patterns.map((slug) => getPatternBySlug(slug)).filter((p): p is PatternDef => p !== undefined),
    obligations: m.obligations.map((id) => obligationById(id)).filter((o): o is Obligation => o !== undefined),
    threats: [...m.owasp, ...(m.atlas ?? [])].map((id) => threatById(id)).filter((t): t is Threat => t !== undefined),
  };
}

/** The fields of a control-observation record the page shows (public/schemas/control-observation.v1.json). */
export interface ObservationRecord {
  control_id: string;
  control_version?: string;
  subject: string;
  subject_kind: keyof typeof subjectKindLabels;
  expected: string;
  observed: string;
  status: string;
  timestamp: string;
  observer?: string;
  evidence?: { artefact: string; url?: string; hash?: string }[];
  notes?: string;
}

/** One example observation of a control: where it is served, its record and its text as served. */
export interface ControlExample {
  example: ObservationExample;
  record: ObservationRecord;
  json: string;
}

/** The example observations of a control, pass first, read from site/public. */
export function controlExamples(c: Pick<Control, 'id'>): ControlExample[] {
  return observationExamples
    .filter((e) => e.controlId === c.id)
    .sort((a, b) => (a.status === b.status ? 0 : a.status === 'pass' ? -1 : 1))
    .map((example) => {
      const json = readSource(`site/public${example.path}`);
      const record = JSON.parse(json) as ObservationRecord;
      if (record.control_id !== c.id || record.status !== example.status) {
        throw new Error(`controls-md: ${example.path} does not hold the ${example.status} example of ${c.id}`);
      }
      return { example, record, json: json.trim() };
    });
}

/** The label of an example's status: "Pass", "Fail". */
export const exampleStatusLabel = (status: string): string => status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');

/** The body of a control page's Markdown twin (everything under the H1). */
export function controlMarkdown(c: Control): string {
  const profile = profileOf(c);
  const page = controlPagePath(c);
  if (!page) throw new Error(`controls-md: ${c.id} has no page of its own`);
  const sources = controlSources(c);
  const related = controlRelations(c);
  const citation = profileCitation(profile);
  const reviewers = profileReviewers(profile);

  const relatedBlocks: string[] = [];
  if (related.cases.length > 0) {
    relatedBlocks.push(
      '## Related cases',
      related.cases.map((k) => `- ${link(k.title, casePath(k))}: ${k.summary}`).join('\n'),
    );
  }
  if (related.patterns.length > 0) {
    relatedBlocks.push(
      '## Patterns',
      related.patterns.map((p) => `- ${link(p.title, patternPath(p))} (${layerText(p.layer)})`).join('\n'),
    );
  }
  if (related.obligations.length > 0) {
    relatedBlocks.push(
      '## Obligations',
      related.obligations.map((o) => `- ${link(obligationLabel(o.id), obligationPath(o))} (\`${o.id}\`): ${o.requirement}`).join('\n'),
    );
  }
  if (related.threats.length > 0) {
    relatedBlocks.push(
      '## Threats',
      related.threats
        .map((t) => `- ${link(`${t.externalId} ${t.name}`, `/resources/threats#${threatAnchor(t)}`)} (${taxonomyOf(t).name})`)
        .join('\n'),
    );
  }

  return [
    `> ${c.objective}`,
    [
      `- Id: ${c.id}`,
      `- Profile: ${link(`${profile.title} v${profile.version}`, profilePath(profile))}`,
      `- Status: ${statusLabels[c.status]}`,
      `- Review: ${reviewers.length > 0 ? `Reviewed by ${reviewers.map((r) => r.name).join(', ')}` : 'Open for technical review'}`,
      `- Published: ${profile.published}`,
      `- Updated: ${profile.updated}`,
      `- Anchor on the profile page: ${abs(controlAnchorPath(c))}`,
    ].join('\n'),
    'Draft for review, not a claim of conformity. A draft control specification, open for technical review: illustrative, not legal advice and binding on no one.',
    '## The control record',
    controlBullets(c, sources),
    '## Example observations',
    'Two illustrative records of a check of this control, one that passes and one that fails. They validate against the control observation schema; they are not results of any real evaluation.',
    ...controlExamples(c).flatMap(({ example, record }) => [
      `### ${exampleStatusLabel(record.status)}: ${record.subject}`,
      [
        `- Status: ${record.status}`,
        `- Subject: ${record.subject} (${subjectKindLabels[record.subject_kind] ?? record.subject_kind})`,
        `- Expected: ${record.expected}`,
        `- Observed: ${record.observed}`,
        `- Timestamp: ${record.timestamp}`,
        `- JSON: ${abs(example.path)}`,
      ].join('\n'),
    ]),
    ...relatedBlocks,
    '## Sources',
    sources.length > 0
      ? sources.map((s, i) => `[${i + 1}] ${sourceText(s)} ${s.url} (verified: ${s.verified})`).join('\n')
      : 'No sources are cited yet.',
    '## Machine-readable',
    [
      `- This control as JSON: ${abs(controlApiPath(c))}`,
      ...controlExamples(c).map(({ example }) => `- The ${example.status} example: ${abs(example.path)}`),
      `- The whole profile as Markdown: ${abs(`${profilePath(profile)}.md`)}`,
      `- The open data API: ${abs('/resources/data')}`,
    ].join('\n'),
    '## Review',
    `Review this control through the issue form: ${site.github}/issues/new?template=${profile.issueTemplate}. How review works: ${abs('/contribute')}. Page: ${abs(page)}`,
    '## Cite',
    `${c.id} ${c.title}. In ${citation.text}`,
  ].join('\n\n');
}
