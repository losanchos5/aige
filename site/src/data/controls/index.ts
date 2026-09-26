// controls/index.ts: the open control profiles. A profile is a versioned set of
// reference controls for one kind of system (an evaluation environment, an
// agent at runtime); each control states an objective, the failures it exists
// to catch, where it is enforced, how a third party would verify it and the
// evidence it leaves. This module holds the types, the validator and the
// lookups; each profile lives in its own file (./evaluation-environment.ts,
// ./agent-runtime.ts) and `controls` concatenates them in profile order.
//
// Everything here is a draft control specification, open for technical review:
// illustrative, not a claim of conformity, not legal advice, and binding on no
// one. Nothing is marked reviewed until a named reviewer has reviewed it
// (`reviewers` in ./people.ts terms; an empty list reads "Open for technical
// review").
//
// STABLE IDS. Every control carries an id other sites, datasets and citations
// may rely on:
//
//   AIGE-CTL-<PROFILE>-<NNN>        e.g. AIGE-CTL-EVAL-002
//
// - Upper-case ASCII letters and digits for <PROFILE>, three digits for <NNN>
//   (CONTROL_ID_PATTERN), in the family of the AIGE-OBL-... obligation ids.
// - Within a profile the numbers run 001, 002, ... in data order, one prefix per
//   profile, with no gap (controlIdSequenceProblems).
// - An id is assigned once and never changes: new wording keeps the id, and an
//   id is never reused. Retiring a control keeps its row with `status:
//   'retired'`, so the sequence stays whole. A row deleted outright has its id
//   moved to `retiredControlIds`; the validator counts it as an occupied slot of
//   its prefix when it checks the sequence.
// - The public anchor of a control is its id in lower case on the profile page
//   (/controls/<profile>#aige-ctl-eval-002) and its JSON is
//   /api/v1/controls/<id in lower case>.json.
//
// DEPTH. `specified` controls carry a verification procedure, evidence, notes
// and an observation example; `derived` controls restate one seed from
// ./tool-agent-controls.ts (chapter 23) and add nothing the chapter does not
// say; `stub` controls are skeletons with open questions.
//
// Every reference resolves: pattern slugs (./patterns.ts), seeds
// (./tool-agent-controls.ts), obligation ids (./frameworks.ts), ISO/IEC 42001
// Annex A ids and OWASP / ATLAS rows (./threats.ts), NIST AI RMF subcategories
// (the map below), schema ids (./templates.ts), people (./people.ts).
// `controlProblems()` returns every broken reference; the profile pages fail the
// build on any, and tests/orp-core.spec.ts checks the same. This module never
// imports ./cases.ts (cases link to controls, not the other way round).
import type { EnforcementPoint, PolicyEffect } from '../policy-card';
import type { LayerNumber } from '../stack';
import type { Source } from '../../lib/sources';
import { iso42001Controls, threats } from '../threats';
import { patterns } from '../patterns';
import { obligations, OBLIGATION_ID_PATTERN } from '../frameworks';
import { agentControls } from '../tool-agent-controls';
import { schemaOrder } from '../templates';
import { personById } from '../people';
import { evaluationEnvironmentProfile, evaluationEnvironmentControls } from './evaluation-environment';
import { agentRuntimeProfile, agentRuntimeControls } from './agent-runtime';
import { CONTROL_ID_PATTERN } from './ids';

export const CONTROLS_AS_OF = '2026-09-26';

/** The shape every control id must match (./ids.ts). */
export { CONTROL_ID_PATTERN };

/**
 * Ids of controls whose rows were deleted outright (a retired control that keeps
 * its row carries `status: 'retired'` instead). They stay here so they are never
 * reused and so the id sequence of their profile keeps no gap; an id in this
 * list must not appear in `controls`.
 */
export const retiredControlIds: readonly string[] = [];

// U+2014, built from its code point so this file itself stays free of it.
const EM_DASH = String.fromCharCode(0x2014);

export type ControlStatus = 'draft' | 'in-review' | 'stable' | 'retired';
export type ReviewerStatus = 'open' | 'in-progress' | 'reviewed';
/** specified: written in full; derived: promoted from a chapter-23 seed; stub: skeleton. */
export type ControlDepth = 'specified' | 'derived' | 'stub';
export type VerificationKind = 'inspect' | 'test' | 'observe' | 'attest';
export type SubjectKind = 'eval-environment' | 'eval-run' | 'agent' | 'tool-server' | 'harness' | 'model-artefact';

export interface ControlProfile {
  /** Kebab slug: the page is /controls/<slug>. */
  slug: string;
  title: string;
  /** Short name for breadcrumbs and compact lists. */
  shortTitle: string;
  /** The profile's own version (not the BoK's). */
  version: string;
  status: ControlStatus;
  reviewerStatus: ReviewerStatus;
  /** One or two sentences: what the profile is and how far it goes. */
  summary: string;
  /** The systems it covers, and what it leaves out. */
  scope: string;
  /** YYYY-MM-DD. */
  published: string;
  /** YYYY-MM-DD. */
  updated: string;
  /** Ids from ./people.ts. */
  authors: readonly string[];
  /** Ids from ./people.ts; empty means "Open for technical review". */
  reviewers: readonly string[];
  changelog: readonly { version: string; date: string; note: string }[];
  /** The GitHub issue form a review of this profile uses. */
  issueTemplate: 'control-review.yml';
}

export interface ControlVerification {
  kind: VerificationKind;
  text: string;
}

export interface ControlEvidence {
  /** The artefact the control leaves, in words. */
  artefact: string;
  /** A schema id from ./templates.ts schemaOrder, or 'control-observation'. */
  schemaId?: string;
  layer: LayerNumber;
}

export interface ControlMappings {
  /** Obligation ids from ./frameworks.ts. */
  obligations: readonly string[];
  /** ISO/IEC 42001:2023 Annex A ids (./threats.ts iso42001Controls). */
  iso42001: readonly string[];
  /** NIST AI RMF 1.0 subcategories (nistAiRmfSubcategories below). */
  nistAiRmf: readonly string[];
  /** OWASP LLM 2026 and Agentic 2026 row ids from ./threats.ts (lower case). */
  owasp: readonly string[];
  /** MITRE ATLAS technique row ids from ./threats.ts (lower case). */
  atlas?: readonly string[];
  /** AIUC-1 requirement ids (A001 ... F002), only when read on the public page. */
  aiuc1?: readonly string[];
  /** CSA AICM control ids, only when verified. */
  csaAicm?: readonly string[];
  /** Anything else (NIST SP 800-53, RFC 8693, ATLAS mitigations...). */
  other?: readonly { framework: string; ref: string; note?: string }[];
}

export interface ControlObservation {
  subjectKind: SubjectKind;
  /** What a conforming observation shows. */
  expected: string;
  /** One illustrative observation, with its result. */
  observedExample: string;
}

export interface Control {
  id: string;
  /** Slug of the profile it belongs to. */
  profile: string;
  title: string;
  version: string;
  status: ControlStatus;
  reviewerStatus: ReviewerStatus;
  depth: ControlDepth;
  /** One sentence: the outcome the control secures. */
  objective: string;
  /** Observable events that mean the control failed. */
  failureModes: readonly string[];
  /** The subject it applies to, and what is out of scope. */
  scope: string;
  enforcementPoints: readonly EnforcementPoint[];
  verification: readonly ControlVerification[];
  evidence: readonly ControlEvidence[];
  failureResponse: { effect: PolicyEffect; text: string };
  layer: LayerNumber;
  secondaryLayers?: readonly LayerNumber[];
  /** Pattern slugs from ./patterns.ts. */
  patterns: readonly string[];
  /** Ids from ./tool-agent-controls.ts agentControls the control builds on. */
  seeds: readonly string[];
  mappings: ControlMappings;
  references: readonly Source[];
  implementationNotes: readonly string[];
  openQuestions: readonly string[];
  observation?: ControlObservation;
}

/** Alias kept for callers that name the definition rather than the record. */
export type ControlDef = Control;

// ---------------------------------------------------------------------------
// Local label maps

/** NIST AI RMF 1.0 subcategories the profiles may cite: id -> short title.
 *  Only ids the site already uses elsewhere. */
export const nistAiRmfSubcategories: Readonly<Record<string, string>> = {
  'GOVERN 1.7': 'Decommissioning and phasing out AI systems safely',
  'MEASURE 2.3': 'Performance or assurance criteria measured for deployment-like conditions',
  'MEASURE 2.5': 'The system is demonstrated to be valid and reliable',
  'MEASURE 2.6': 'The system is evaluated regularly for safety risks',
  'MEASURE 2.7': 'Security and resilience are evaluated and documented',
  'MEASURE 3.1': 'Existing, unanticipated and emergent risks are tracked',
  'MANAGE 2.4': 'Mechanisms to supersede, disengage or deactivate AI systems',
  'MANAGE 4.1': 'Post-deployment monitoring plans are implemented',
};

export const verificationLabels: Readonly<Record<VerificationKind, string>> = {
  inspect: 'Inspect',
  test: 'Test',
  observe: 'Observe',
  attest: 'Attest',
};

export const subjectKindLabels: Readonly<Record<SubjectKind, string>> = {
  'eval-environment': 'Evaluation environment',
  'eval-run': 'Evaluation run',
  agent: 'Agent',
  'tool-server': 'Tool or MCP server',
  harness: 'Harness',
  'model-artefact': 'Model artefact',
};

export const statusLabels: Readonly<Record<ControlStatus, string>> = {
  draft: 'Draft',
  'in-review': 'In review',
  stable: 'Stable',
  retired: 'Retired',
};

export const reviewerStatusLabels: Readonly<Record<ReviewerStatus, string>> = {
  open: 'Open for technical review',
  'in-progress': 'Technical review in progress',
  reviewed: 'Reviewed',
};

export const depthLabels: Readonly<Record<ControlDepth, string>> = {
  specified: 'Specified',
  derived: 'Derived from chapter 23',
  stub: 'Draft outline',
};

// ---------------------------------------------------------------------------
// The registry

export const profiles: readonly ControlProfile[] = [evaluationEnvironmentProfile, agentRuntimeProfile];

export const controls: readonly Control[] = [...evaluationEnvironmentControls, ...agentRuntimeControls];

// ---------------------------------------------------------------------------
// Lookups and paths

export function profileBySlug(slug: string): ControlProfile | undefined {
  return profiles.find((p) => p.slug === slug);
}

/** The control with this id, if any (ids are case-insensitive in URLs). */
export function controlById(id: string): Control | undefined {
  const wanted = id.toUpperCase();
  return controls.find((c) => c.id === wanted);
}

/** Controls of one profile, in id order. */
export function controlsIn(slug: string): Control[] {
  return controls.filter((c) => c.profile === slug);
}

/** URL slug of a control: its id in lower case. */
export function controlSlug(row: Pick<Control, 'id'>): string {
  return row.id.toLowerCase();
}

/** Anchor of a control's section on its profile page. */
export const controlAnchor = controlSlug;

/** Site path of a profile page. */
export function profilePath(profile: string | Pick<ControlProfile, 'slug'>): string {
  return `/controls/${typeof profile === 'string' ? profile : profile.slug}`;
}

/** Site path of a control: its profile page and its anchor. */
export function controlPath(row: Pick<Control, 'id' | 'profile'>): string {
  return `${profilePath(row.profile)}#${controlAnchor(row)}`;
}

/** Site path of a control by id; throws on an unknown id, so a typo fails the build. */
export function controlHref(id: string): string {
  const row = controlById(id);
  if (!row) throw new Error(`controls: unknown control id ${id}`);
  return controlPath(row);
}

/** Path of a control's JSON document. */
export function controlApiPath(row: Pick<Control, 'id'>): string {
  return `/api/v1/controls/${controlSlug(row)}.json`;
}

/** Controls whose home layer is `n` (and, when asked, those that also touch it). */
export function controlsForLayer(n: LayerNumber, includeSecondary = false): Control[] {
  return controls.filter(
    (c) => c.layer === n || (includeSecondary && (c.secondaryLayers ?? []).includes(n)),
  );
}

/** The references of a profile's controls, deduplicated by URL, in first-use order. */
export function profileSources(slug: string): Source[] {
  const seen = new Set<string>();
  const out: Source[] = [];
  for (const c of controlsIn(slug)) {
    for (const src of c.references) {
      if (seen.has(src.url)) continue;
      seen.add(src.url);
      out.push(src);
    }
  }
  return out;
}

/** The `[n]` number of `src` in `sources` (1-based, matched by URL); throws when absent. */
export function sourceNumber(sources: readonly Source[], src: Pick<Source, 'url'>): number {
  const at = sources.findIndex((s) => s.url === src.url);
  if (at === -1) throw new Error(`controls: source not in the list: ${src.url}`);
  return at + 1;
}

// ---------------------------------------------------------------------------
// Validation

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const VERSION = /^\d+\.\d+(?:\.\d+)?$/;
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LAYERS: readonly number[] = [1, 2, 3, 4, 5];
const ENFORCEMENT: readonly string[] = ['pre_merge', 'deploy', 'runtime', 'periodic'];
const EFFECTS: readonly string[] = ['deny', 'allow', 'require_approval', 'alert'];
const VERIFICATIONS: readonly string[] = ['inspect', 'test', 'observe', 'attest'];
const VERIFIED: readonly string[] = ['primary', 'secondary', 'reported'];

function tooLong(text: string, max: number): boolean {
  return text.length > max;
}

/**
 * The id rule of one profile: its live ids, in data order, and the deleted ids
 * of the same prefix (`retired`) together fill 001, 002, ... with no gap, and
 * the live ids rise in data order. A deleted id is an occupied slot, never a
 * gap. Pure, so tests can feed it a simulated retirement.
 */
export function controlIdSequenceProblems(
  at: string,
  prefix: string,
  liveIds: readonly string[],
  retired: readonly string[],
): string[] {
  const problems: string[] = [];
  const idOf = (n: number) => `AIGE-CTL-${prefix}-${String(n).padStart(3, '0')}`;
  const ofPrefix = new RegExp(`^AIGE-CTL-${prefix}-\\d{3}$`);
  const deleted = new Set(retired.filter((id) => ofPrefix.test(id) && !liveIds.includes(id)));
  const total = liveIds.length + deleted.size;
  const expected: string[] = [];
  for (let n = 1; n <= total; n++) if (!deleted.has(idOf(n))) expected.push(idOf(n));
  liveIds.forEach((id, i) => {
    if (id !== expected[i]) problems.push(`${at}: control ${i + 1} is ${id}, expected ${expected[i] ?? 'no further control'}`);
  });
  for (const id of deleted) {
    if (Number(id.slice(-3)) > total) problems.push(`${at}: retired id ${id} leaves a gap in the sequence`);
  }
  return problems;
}

/** Every broken reference or rule in the registry; empty when all hold. */
export function controlProblems(): string[] {
  const problems: string[] = [];
  const patternSlugs = new Set(patterns.map((p) => p.slug));
  const seedIds = new Set(agentControls.map((a) => a.id));
  const obligationIds = new Set(obligations.map((o) => o.id));
  const threatTaxonomy = new Map(threats.map((t) => [t.id, t.taxonomy]));
  const schemaIds = new Set([...schemaOrder, 'control-observation']);
  const profileSlugs = new Set<string>();

  // Profiles
  const prefixes = new Map<string, string>();
  for (const p of profiles) {
    const at = `controls ${p.slug}`;
    if (!KEBAB.test(p.slug)) problems.push(`${at}: slug must be lower-case kebab`);
    if (profileSlugs.has(p.slug)) problems.push(`${at}: duplicate profile slug`);
    profileSlugs.add(p.slug);
    if (!p.title.trim() || !p.shortTitle.trim()) problems.push(`${at}: empty title`);
    if (!p.summary.trim() || !p.scope.trim()) problems.push(`${at}: empty summary or scope`);
    if (!VERSION.test(p.version)) problems.push(`${at}: bad version ${p.version}`);
    if (!ISO_DATE.test(p.published) || !ISO_DATE.test(p.updated)) problems.push(`${at}: dates must be YYYY-MM-DD`);
    if (p.updated < p.published) problems.push(`${at}: updated before published`);
    if (p.authors.length === 0) problems.push(`${at}: names no author`);
    for (const id of [...p.authors, ...p.reviewers]) {
      if (!personById(id)) problems.push(`${at}: unknown person ${id}`);
    }
    if (p.reviewers.length === 0 && p.reviewerStatus === 'reviewed') {
      problems.push(`${at}: marked reviewed with no reviewer`);
    }
    if (p.changelog.length === 0) problems.push(`${at}: empty changelog`);
    for (const entry of p.changelog) {
      if (!VERSION.test(entry.version) || !ISO_DATE.test(entry.date) || !entry.note.trim()) {
        problems.push(`${at}: malformed changelog entry ${entry.version}`);
      }
    }
    if (!p.changelog.some((e) => e.version === p.version)) problems.push(`${at}: no changelog entry for v${p.version}`);

    const rows = controlsIn(p.slug);
    if (rows.length === 0) problems.push(`${at}: has no controls`);
    const prefix = rows[0]?.id.split('-')[2] ?? '';
    const owner = prefixes.get(prefix);
    if (owner && owner !== p.slug) problems.push(`${at}: id prefix ${prefix} already used by ${owner}`);
    prefixes.set(prefix, p.slug);
    problems.push(...controlIdSequenceProblems(at, prefix, rows.map((r) => r.id), retiredControlIds));
    if (JSON.stringify(p).includes(EM_DASH)) problems.push(`${at}: em dash`);
  }

  // Controls
  const ids = new Set<string>();
  const titles = new Set<string>();
  const profileOrder = profiles.map((p) => p.slug);
  let lastProfile = -1;
  for (const c of controls) {
    const at = `controls ${c.id}`;
    if (!CONTROL_ID_PATTERN.test(c.id)) problems.push(`${at}: id does not match ${CONTROL_ID_PATTERN}`);
    if (ids.has(c.id)) problems.push(`${at}: duplicate id`);
    ids.add(c.id);
    if (retiredControlIds.includes(c.id)) problems.push(`${at}: id is retired`);
    const pIndex = profileOrder.indexOf(c.profile);
    if (pIndex === -1) problems.push(`${at}: unknown profile ${c.profile}`);
    if (pIndex < lastProfile) problems.push(`${at}: out of profile order`);
    lastProfile = Math.max(lastProfile, pIndex);

    if (!c.title.trim()) problems.push(`${at}: empty title`);
    if (tooLong(c.title, 90)) problems.push(`${at}: title longer than 90 characters`);
    if (titles.has(c.title.toLowerCase())) problems.push(`${at}: duplicate title ${c.title}`);
    titles.add(c.title.toLowerCase());
    if (!VERSION.test(c.version)) problems.push(`${at}: bad version ${c.version}`);
    if (!c.objective.trim()) problems.push(`${at}: empty objective`);
    if (tooLong(c.objective, 500)) problems.push(`${at}: objective longer than 500 characters`);
    if (!c.scope.trim()) problems.push(`${at}: empty scope`);
    if (tooLong(c.scope, 500)) problems.push(`${at}: scope longer than 500 characters`);

    // A derived control whose seed maps to no threat may leave its failure
    // modes to an explicit TODO in openQuestions (B-CONTROLS-RUNTIME rule).
    const failureTodo = c.depth === 'derived' && c.openQuestions.some((q) => q.startsWith('TODO: failure mode'));
    if (c.failureModes.length === 0 && !failureTodo) problems.push(`${at}: names no failure mode`);
    for (const f of c.failureModes) {
      if (!f.trim() || tooLong(f, 400)) problems.push(`${at}: failure mode empty or longer than 400 characters`);
    }
    if (c.enforcementPoints.length === 0) problems.push(`${at}: names no enforcement point`);
    for (const e of c.enforcementPoints) if (!ENFORCEMENT.includes(e)) problems.push(`${at}: unknown enforcement point ${e}`);
    if (new Set(c.enforcementPoints).size !== c.enforcementPoints.length) problems.push(`${at}: repeated enforcement point`);
    for (const v of c.verification) {
      if (!VERIFICATIONS.includes(v.kind)) problems.push(`${at}: unknown verification kind ${v.kind}`);
      if (!v.text.trim()) problems.push(`${at}: empty verification step`);
    }
    for (const ev of c.evidence) {
      if (!ev.artefact.trim()) problems.push(`${at}: evidence with no artefact`);
      if (!LAYERS.includes(ev.layer)) problems.push(`${at}: evidence layer ${ev.layer} out of range`);
      if (ev.schemaId !== undefined && !schemaIds.has(ev.schemaId)) problems.push(`${at}: unknown schema ${ev.schemaId}`);
    }
    if (!EFFECTS.includes(c.failureResponse.effect)) problems.push(`${at}: unknown failure effect ${c.failureResponse.effect}`);
    if (!c.failureResponse.text.trim()) problems.push(`${at}: empty failure response`);
    if (!LAYERS.includes(c.layer)) problems.push(`${at}: layer ${c.layer} out of range`);
    for (const n of c.secondaryLayers ?? []) {
      if (!LAYERS.includes(n)) problems.push(`${at}: secondary layer ${n} out of range`);
      if (n === c.layer) problems.push(`${at}: secondary layer repeats the home layer`);
    }
    for (const slug of c.patterns) if (!patternSlugs.has(slug)) problems.push(`${at}: unknown pattern ${slug}`);
    for (const id of c.seeds) if (!seedIds.has(id)) problems.push(`${at}: unknown seed ${id}`);

    const m = c.mappings;
    for (const id of m.obligations) {
      if (!OBLIGATION_ID_PATTERN.test(id)) problems.push(`${at}: malformed obligation id ${id}`);
      else if (!obligationIds.has(id)) problems.push(`${at}: unknown obligation ${id}`);
    }
    for (const id of m.iso42001) if (!Object.hasOwn(iso42001Controls, id)) problems.push(`${at}: unknown ISO/IEC 42001 control ${id}`);
    for (const id of m.nistAiRmf) if (!Object.hasOwn(nistAiRmfSubcategories, id)) problems.push(`${at}: unknown NIST AI RMF subcategory ${id}`);
    for (const id of m.owasp) {
      const tax = threatTaxonomy.get(id);
      if (!tax) problems.push(`${at}: unknown OWASP row ${id}`);
      else if (tax !== 'owasp-llm' && tax !== 'owasp-asi') problems.push(`${at}: ${id} is not an OWASP row`);
    }
    for (const id of m.atlas ?? []) {
      const tax = threatTaxonomy.get(id);
      if (!tax) problems.push(`${at}: unknown ATLAS row ${id}`);
      else if (tax !== 'mitre-atlas') problems.push(`${at}: ${id} is not an ATLAS row`);
    }
    for (const id of m.aiuc1 ?? []) if (!/^[A-F]\d{3}$/.test(id)) problems.push(`${at}: malformed AIUC-1 id ${id}`);
    for (const id of m.csaAicm ?? []) if (!/^[A-Z&]{2,4}-\d{2}$/.test(id)) problems.push(`${at}: malformed CSA AICM id ${id}`);
    for (const o of m.other ?? []) {
      if (!o.framework.trim() || !o.ref.trim()) problems.push(`${at}: incomplete "other" mapping`);
    }
    for (const src of c.references) {
      if (!/^https?:\/\//.test(src.url)) problems.push(`${at}: reference without an absolute url (${src.title})`);
      if (!VERIFIED.includes(src.verified)) problems.push(`${at}: reference without a verification tag (${src.title})`);
      if (!src.title.trim() || !src.publisher.trim() || !src.date.trim()) problems.push(`${at}: incomplete reference`);
    }
    for (const note of c.implementationNotes) if (!note.trim()) problems.push(`${at}: empty implementation note`);
    for (const q of c.openQuestions) if (!q.trim() || tooLong(q, 400)) problems.push(`${at}: open question empty or too long`);

    // Profile agreement
    const profile = profileBySlug(c.profile);
    if (profile && c.version !== profile.version) problems.push(`${at}: version differs from its profile`);

    // Depth rules
    if (c.depth === 'specified') {
      if (c.verification.length === 0) problems.push(`${at}: specified control with no verification`);
      if (c.evidence.length === 0) problems.push(`${at}: specified control with no evidence`);
      if (c.implementationNotes.length === 0) problems.push(`${at}: specified control with no implementation note`);
      if (!c.observation) problems.push(`${at}: specified control with no observation`);
    } else if (c.depth === 'derived') {
      if (c.seeds.length === 0) problems.push(`${at}: derived control with no seed`);
      if (c.evidence.length === 0) problems.push(`${at}: derived control with no evidence`);
      if (c.openQuestions.length === 0) problems.push(`${at}: derived control with no open question`);
    } else if (c.depth === 'stub') {
      if (c.openQuestions.length === 0) problems.push(`${at}: stub with no open question`);
      if (c.reviewerStatus !== 'open') problems.push(`${at}: stub must stay open for review`);
    } else {
      problems.push(`${at}: unknown depth ${String(c.depth)}`);
    }
    if (c.observation) {
      const o = c.observation;
      if (!Object.hasOwn(subjectKindLabels, o.subjectKind)) problems.push(`${at}: unknown subject kind ${o.subjectKind}`);
      if (!o.expected.trim() || !o.observedExample.trim()) problems.push(`${at}: incomplete observation`);
    }
    if (JSON.stringify(c).includes(EM_DASH)) problems.push(`${at}: em dash`);
  }
  for (const id of retiredControlIds) {
    if (!CONTROL_ID_PATTERN.test(id)) problems.push(`controls: malformed retired id ${id}`);
  }
  return problems;
}
