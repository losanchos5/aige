// control-visuals.ts: the data side of the wave-2 control visuals (OpenSpec
// page-visuals, block controls), shared by the components under
// src/components/controls/:
//
//   ControlLanes           /controls: where the controls act, profile x
//                          enforcement point, one mark per control
//   ControlPeriodicTable   /controls/<profile>: one tile per control
//   ControlCoverage        /controls/<profile>: control x framework counts
//   ControlAnatomy         /controls/<profile>/<id>: failure to evidence chain
//   ControlConstellation   /controls/<profile>/<id>: traceability radial
//
// Everything here is read from the registry (src/data/controls) and the
// registers it points at; nothing adds a fact. A failure response the source
// material does not state is its own state ('tbs', decided by the shared
// predicate isResponseToSpecify), never counted as the placeholder alert.
//
// Labels drawn in an SVG must fit their box (the kit throws otherwise), so the
// long registry wording (failure modes of 60 to 190 characters, artefacts,
// case titles) is cut at a word boundary with an ellipsis by the shared
// shortener (labels.ts shortenToFit); the full wording stays in the chart's
// table, the node's accessible name and the record on the page.
import {
  controlAnchor,
  isResponseToSpecify,
  verificationLabels,
  type Control,
  type VerificationKind,
} from '../../data/controls';
import { imdaAgenticXrefs, IMDA_AGENTIC_FRAMEWORK } from '../../data/controls/imda-agentic';
import type { EnforcementPoint, PolicyEffect } from '../../data/policy-card';
import { iso42001Controls, obligationLabel, threatAnchor, threatById } from '../../data/threats';
import { nistAiRmfSubcategories } from '../../data/nist-ai-rmf';
import { obligationPath } from '../../data/frameworks';
import { getPatternBySlug, patternPath } from '../../data/patterns';
import { casesForControl } from '../cross-links';
import { casePath } from '../llms';
import { getSchemas } from '../schemas-library';
import { type MarkState, type Tone } from '../charts';
import { shortenToFit } from './labels';
import type { ControlChainInput, EvidenceItem, FlowItem, PipelineStage, RelationFamily } from '../charts';

// ---- enforcement points and failure responses ------------------------------

/** The four enforcement points in pipeline order, with the short names the
 *  visuals print (the long ones are enforcementLabels in data/policy-card). */
export const STAGES: readonly { key: EnforcementPoint; label: string }[] = [
  { key: 'pre_merge', label: 'Pull request' },
  { key: 'deploy', label: 'Deploy' },
  { key: 'runtime', label: 'Runtime' },
  { key: 'periodic', label: 'Periodic' },
];

export const stageLabel = (key: EnforcementPoint): string => STAGES.find((s) => s.key === key)?.label ?? key;

/** How a control responds when it fails: its effect, or 'tbs' when the
 *  response is still to be specified (the placeholder alert of a profile). */
export type Response = PolicyEffect | 'tbs';

export function responseOf(c: Pick<Control, 'failureResponse'>): Response {
  return isResponseToSpecify(c.failureResponse) ? 'tbs' : c.failureResponse.effect;
}

/** Legend and table order: the strongest response first. */
export const RESPONSES: readonly Response[] = ['deny', 'require_approval', 'alert', 'allow', 'tbs'];

export const responseWords: Readonly<Record<Response, string>> = {
  deny: 'Deny',
  require_approval: 'Hold for approval',
  alert: 'Alert',
  allow: 'Allow listed only',
  tbs: 'To be specified',
};

/** The HTML mark class of each response (styles/control-marks.css). */
export const responseClass: Readonly<Record<Response, string>> = {
  deny: 'cvm-deny',
  require_approval: 'cvm-hold',
  alert: 'cvm-alert',
  allow: 'cvm-allow',
  tbs: 'cvm-tbs',
};

/** The gate diamond's drawing in the anatomy chain. */
export const responseState: Readonly<Record<Response, MarkState>> = {
  deny: 'filled',
  require_approval: 'filled',
  alert: 'outline',
  allow: 'outline',
  tbs: 'hatched',
};

// ---- the anatomy chain (controlChain) ---------------------------------------

/** Text width of an item in a controlChain panel (flow.ts: 12 px margins,
 *  26 px gaps in a row, 22 in a column; insets 10 / 44 and 10 on the right;
 *  a 14 px layer chip before an evidence item). If flow.ts changes, its own
 *  wrapText throws at build rather than cut. */
function chainItemWidth(width: number, orientation: 'row' | 'column', chip: boolean): number {
  const panels = 5;
  const panelW = orientation === 'row' ? (width - 24 - (panels - 1) * 26) / panels : width - 24;
  const inset = orientation === 'row' ? 10 : 44;
  return panelW - inset - 10 - (chip ? 14 : 0) - 1;
}

const schemaTitle = (id: string): string | undefined => getSchemas().find((s) => s.name === id)?.title;

/** The href of an evidence artefact's record schema, as ControlRecord links it. */
export const schemaHref = (id: string): string => `/resources/templates#schema-${id}`;

/** Verification procedures grouped by kind, in first-seen order. */
export function verificationKinds(c: Pick<Control, 'verification'>): { kind: VerificationKind; steps: string[] }[] {
  const kinds: { kind: VerificationKind; steps: string[] }[] = [];
  for (const v of c.verification) {
    const hit = kinds.find((k) => k.kind === v.kind);
    if (hit) hit.steps.push(v.text);
    else kinds.push({ kind: v.kind, steps: [v.text] });
  }
  return kinds;
}

/** The controlChain input of a control, for one orientation (the table is the
 *  same for both: it prints `name` and `detail`, never the cut label). */
export function anatomyInput(
  c: Control,
  orientation: 'row' | 'column',
  width: number,
): Omit<ControlChainInput, 'id' | 'title' | 'desc' | 'source' | 'asOf' | 'mode'> {
  const itemW = chainItemWidth(width, orientation, false);
  const chipW = chainItemWidth(width, orientation, true);
  const cut = (text: string, w = itemW) => shortenToFit(text, w, 13, 2);
  const failureModes: FlowItem[] = c.failureModes.map((f) => ({ label: cut(f), name: f }));
  const verification: FlowItem[] = verificationKinds(c).map(({ kind, steps }) => ({
    label: steps.length > 1 ? `${verificationLabels[kind]} (${steps.length} steps)` : verificationLabels[kind],
    name: `${verificationLabels[kind]}${steps.length > 1 ? ` (${steps.length} steps)` : ''}`,
    detail: steps.join(' '),
  }));
  const r = responseOf(c);
  // An artefact is drawn by its own words up to the first ":" (several share a
  // schema, so the schema title would not tell them apart); the schema, when
  // there is one, is the link and the table detail.
  const evidence: EvidenceItem[] = c.evidence.map((e) => {
    const title = e.schemaId ? (schemaTitle(e.schemaId) ?? e.schemaId) : undefined;
    return {
      label: cut(e.artefact.split(/:\s/)[0], chipW),
      name: e.artefact,
      layer: e.layer,
      ...(e.schemaId ? { href: schemaHref(e.schemaId), detail: `Layer ${String(e.layer).padStart(2, '0')}, ${title} schema` } : {}),
    };
  });
  return {
    orientation,
    width,
    maxItems: 4,
    failureModes,
    enforcement: STAGES.map((s) => s.key).filter((k) => c.enforcementPoints.includes(k)) as PipelineStage[],
    stageLabels: Object.fromEntries(STAGES.map((s) => [s.key, s.label])),
    verification,
    decision: { label: responseWords[r], name: responseWords[r], detail: c.failureResponse.text, state: responseState[r] },
    evidence,
  };
}

// ---- the traceability constellation (relationRadial) ------------------------

/**
 * The relations of a control, as relationRadial families (at most six): the
 * incident cases that name it, its patterns (layer colour), the obligations
 * it maps to, the threat rows (OWASP and ATLAS), the standards (ISO/IEC 42001
 * Annex A, NIST AI RMF, AIUC-1, CSA AICM and every `other` mapping: NIST SP
 * 800-53, ATLAS mitigations, RFCs...) and its IMDA Agentic AI cross-reference,
 * whose fit is the edge: direct solid, partial dashed. The IMDA entry that
 * withImdaAgentic adds to `other` is drawn by its own family, not twice.
 * Labels are cut to `labelW`.
 */
export function constellationFamilies(c: Control, labelW: number): RelationFamily[] {
  const cut = (text: string) => shortenToFit(text, labelW, 13, 1);
  const m = c.mappings;
  const threats = [...m.owasp, ...(m.atlas ?? [])].flatMap((id) => {
    const t = threatById(id);
    return t ? [t] : [];
  });
  const patterns = c.patterns.flatMap((slug) => {
    const p = getPatternBySlug(slug);
    return p ? [p] : [];
  });
  const imda = imdaAgenticXrefs[c.id];
  return [
    {
      label: 'Cases',
      items: casesForControl(c.id).map((k) => ({ label: cut(k.title), name: k.title, href: casePath(k) })),
    },
    {
      label: 'Patterns',
      layered: true,
      items: patterns.map((p) => ({ label: cut(p.title), name: p.title, href: patternPath(p), tone: p.layer as Tone })),
    },
    {
      label: 'Obligations',
      items: m.obligations.map((id) => ({ label: cut(obligationLabel(id)), name: `${obligationLabel(id)} (${id})`, href: obligationPath({ id }) })),
    },
    {
      label: 'Threats',
      items: threats.map((t) => ({ label: cut(`${t.externalId} ${t.name}`), name: `${t.externalId} ${t.name}`, href: `/resources/threats#${threatAnchor(t)}` })),
    },
    {
      label: 'Standards',
      items: [
        ...m.iso42001.map((id) => ({ label: cut(`ISO 42001 ${id}`), name: `ISO/IEC 42001 ${id} ${iso42001Controls[id] ?? ''}`.trim() })),
        ...m.nistAiRmf.map((id) => ({ label: cut(`NIST AI RMF ${id}`), name: `NIST AI RMF ${id} ${nistAiRmfSubcategories[id] ?? ''}`.trim() })),
        ...(m.aiuc1 ?? []).map((id) => ({ label: cut(`AIUC-1 ${id}`), name: `AIUC-1 ${id}` })),
        ...(m.csaAicm ?? []).map((id) => ({ label: cut(`CSA AICM ${id}`), name: `CSA AICM ${id}` })),
        ...otherMappings(c).map((o) => ({ label: cut(`${o.framework} ${o.ref}`), name: `${o.framework} ${o.ref}` })),
      ],
    },
    {
      label: 'IMDA agentic',
      relationLabels: { core: 'Direct fit', related: 'Partial fit' },
      items: imda
        ? [{ label: cut(`IMDA ${imda.ref}`), name: `${IMDA_AGENTIC_FRAMEWORK}, ${imda.ref}`, strength: imda.fit === 'direct' ? ('core' as const) : ('related' as const) }]
        : [],
    },
  ];
}

// ---- framework coverage (ControlCoverage) -----------------------------------

/** The control's `other` mappings, less the IMDA Agentic AI entry that
 *  withImdaAgentic appends (the visuals draw that fit on its own). */
export const otherMappings = (c: Pick<Control, 'mappings'>): NonNullable<Control['mappings']['other']> =>
  (c.mappings.other ?? []).filter((o) => o.framework !== IMDA_AGENTIC_FRAMEWORK);

export type CoverageKey = 'obligations' | 'iso42001' | 'nistAiRmf' | 'owasp' | 'atlas' | 'aiuc1' | 'other';

/** The counted framework columns of the coverage grid; IMDA is its own
 *  column, drawn by fit rather than counted. */
export const COVERAGE_COLUMNS: readonly { key: CoverageKey; label: string; short: string }[] = [
  { key: 'obligations', label: 'Obligations', short: 'Obligations' },
  { key: 'iso42001', label: 'ISO/IEC 42001 Annex A', short: 'ISO 42001' },
  { key: 'nistAiRmf', label: 'NIST AI RMF', short: 'NIST AI RMF' },
  { key: 'owasp', label: 'OWASP', short: 'OWASP' },
  { key: 'atlas', label: 'MITRE ATLAS', short: 'ATLAS' },
  { key: 'aiuc1', label: 'AIUC-1', short: 'AIUC-1' },
  { key: 'other', label: 'Other frameworks (CSA AICM, NIST SP 800-53, ATLAS mitigations, RFCs...)', short: 'Other' },
];

/** Ids a control maps to in one framework column; 'other' gathers the CSA
 *  AICM ids and the `other` mappings (less IMDA, which has its own column). */
export const coverageCount = (c: Pick<Control, 'mappings'>, key: CoverageKey): number =>
  key === 'other' ? (c.mappings.csaAicm ?? []).length + otherMappings(c).length : (c.mappings[key] ?? []).length;

/** The control's IMDA Agentic AI fit, if it has a cross-reference. */
export const imdaFit = (c: Pick<Control, 'id'>): 'direct' | 'partial' | undefined => imdaAgenticXrefs[c.id]?.fit;

/** Anchor of a control on its profile page (#aige-ctl-...). */
export const tileHref = (c: Pick<Control, 'id'>): string => `#${controlAnchor(c)}`;
