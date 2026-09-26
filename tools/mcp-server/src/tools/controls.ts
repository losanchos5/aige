// controls.ts: list_controls and get_control over /api/v1/controls.json, the
// open control profiles: draft control specifications with stable ids
// (AIGE-CTL-<PROFILE>-<NNN>), each anchored to a stack layer, the patterns that
// implement it and the obligations its evidence helps satisfy. Nothing here is
// reviewed or certified: every record carries its publication status, depth
// and technical review status, and the answers repeat them.

import * as z from 'zod';

import { CANONICAL_SITE } from '../data.js';
import type { ControlProfile, ControlRecord } from '../types.js';
import { normalise, slugKey, suggest, tokens } from '../text.js';
import {
  READ_ONLY,
  fail,
  footer,
  guarded,
  layerLabel,
  layerName,
  ok,
  provenanceOf,
  provenanceShape,
  type Register,
} from './common.js';

/** The page that introduces the open control profiles. */
export const CONTROLS_PAGE = `${CANONICAL_SITE}/controls`;

const STATUSES = ['draft', 'in-review', 'stable', 'retired'] as const;
const DEPTHS = ['specified', 'derived', 'stub'] as const;

/** Find a control by id (any case, with or without the AIGE- prefix), page or JSON URL, or title. */
export function findControl(rows: ControlRecord[], wanted: string): ControlRecord | undefined {
  const raw = wanted.trim();
  const last = (raw.split(/[/#?]/).filter((part) => part !== '').pop() ?? raw).replace(/\.json$/i, '');
  const key = last.toUpperCase();
  const title = slugKey(raw);
  return (
    rows.find((row) => row.id === key || row.id === `AIGE-${key}` || row.id === `AIGE-CTL-${key}`) ??
    rows.find((row) => slugKey(row.title) === title)
  );
}

/** Find a profile by slug, title, short title or page URL. */
export function findProfile(profiles: ControlProfile[], wanted: string): ControlProfile | undefined {
  const raw = wanted.trim().toLowerCase();
  const last = raw.split(/[/#?]/).filter((part) => part !== '').pop() ?? raw;
  const key = slugKey(last);
  return profiles.find(
    (p) => p.slug === last || p.slug === key || slugKey(p.title) === slugKey(raw) || slugKey(p.shortTitle) === slugKey(raw),
  );
}

function matchesQuery(row: ControlRecord, words: string[]): boolean {
  const haystack = ` ${normalise(`${row.id} ${row.title} ${row.objective}`)}`;
  return words.every((word) => haystack.includes(` ${word}`));
}

const listItem = z.object({
  id: z.string(),
  title: z.string(),
  profile: z.string(),
  depth: z.string().describe('specified: written in full; derived: restates a chapter 23 seed; stub: outline with open questions.'),
  status: z.string().describe('Publication status (draft, in-review, stable, retired).'),
  reviewerStatus: z.string().describe('Technical review status; open means no one has reviewed it yet.'),
  layer: z.number().int(),
  layerName: z.string().nullable(),
  secondaryLayers: z.array(z.number().int()),
  objective: z.string(),
  url: z.string().describe('The control on its profile page.'),
  json: z.string().describe('The control record on its own, in the API.'),
});

function item(row: ControlRecord): z.infer<typeof listItem> {
  return {
    id: row.id,
    title: row.title,
    profile: row.profile,
    depth: row.depth,
    status: row.status,
    reviewerStatus: row.reviewerStatus,
    layer: row.layer,
    layerName: layerName(row.layer),
    secondaryLayers: row.secondaryLayers,
    objective: row.objective,
    url: row.url,
    json: row.json,
  };
}

const profileItem = z.object({
  slug: z.string(),
  title: z.string(),
  url: z.string(),
  version: z.string(),
  status: z.string(),
  reviewerStatus: z.string(),
  reviewers: z.array(z.string()).describe('Named technical reviewers; empty means open for technical review.'),
  reviewForm: z.string().describe('GitHub issue form for a review of the profile.'),
  controls: z.number().int().describe('Number of controls in the profile.'),
});

function profileOf(p: ControlProfile): z.infer<typeof profileItem> {
  return {
    slug: p.slug,
    title: p.title,
    url: p.url,
    version: p.version,
    status: p.status,
    reviewerStatus: p.reviewerStatus,
    reviewers: p.reviewers,
    reviewForm: p.reviewForm,
    controls: p.controls.length,
  };
}

const threatRef = z.object({ id: z.string(), externalId: z.string(), name: z.string(), url: z.string() });

const recordShape = {
  version: z.string(),
  failureModes: z.array(z.string()),
  scope: z.string(),
  enforcementPoints: z.array(z.string()),
  verification: z.array(z.object({ kind: z.string(), text: z.string() })),
  evidence: z.array(
    z.object({ artefact: z.string(), schemaId: z.string().nullable(), schema: z.string().nullable(), layer: z.number().int() }),
  ),
  failureResponse: z.object({ effect: z.string(), text: z.string() }),
  patterns: z.array(z.object({ slug: z.string(), title: z.string(), url: z.string() })),
  seeds: z.array(z.object({ id: z.string(), title: z.string(), url: z.string() })),
  mappings: z
    .object({
      obligations: z.array(z.object({ id: z.string(), name: z.string(), url: z.string() })),
      iso42001: z.array(z.object({ id: z.string(), title: z.string() })),
      nistAiRmf: z.array(z.object({ id: z.string(), title: z.string() })),
      owasp: z.array(threatRef),
      atlas: z.array(threatRef),
      aiuc1: z.array(z.string()),
      csaAicm: z.array(z.string()),
      other: z.array(z.object({ framework: z.string(), ref: z.string(), note: z.string().nullable() })),
    })
    .describe('Illustrative mappings, not a claim of conformity.'),
  references: z.array(
    z.object({ n: z.number().int(), title: z.string(), text: z.string(), url: z.string(), verified: z.string() }),
  ),
  implementationNotes: z.array(z.string()),
  openQuestions: z.array(z.string()).describe('Questions a technical reviewer should settle.'),
  observation: z
    .object({ subjectKind: z.string(), expected: z.string(), observedExample: z.string() })
    .nullable()
    .describe('What an observation of the control records; null until the control is specified.'),
  observationSchema: z.string().describe('Schema of a control observation record.'),
  examples: z
    .array(z.object({ status: z.string(), url: z.string() }))
    .describe('Illustrative example observations, valid against the observation schema.'),
};

/** The full record, field by field (the output schema is closed). */
function record(row: ControlRecord) {
  const m = row.mappings;
  return {
    version: row.version,
    failureModes: row.failureModes,
    scope: row.scope,
    enforcementPoints: row.enforcementPoints,
    verification: row.verification.map((v) => ({ kind: v.kind, text: v.text })),
    evidence: row.evidence.map((e) => ({ artefact: e.artefact, schemaId: e.schemaId, schema: e.schema, layer: e.layer })),
    failureResponse: { effect: row.failureResponse.effect, text: row.failureResponse.text },
    patterns: row.patterns.map((p) => ({ slug: p.slug, title: p.title, url: p.url })),
    seeds: row.seeds.map((s) => ({ id: s.id, title: s.title, url: s.url })),
    mappings: {
      obligations: m.obligations.map((o) => ({ id: o.id, name: o.name, url: o.url })),
      iso42001: m.iso42001.map((c) => ({ id: c.id, title: c.title })),
      nistAiRmf: m.nistAiRmf.map((c) => ({ id: c.id, title: c.title })),
      owasp: m.owasp.map((t) => ({ id: t.id, externalId: t.externalId, name: t.name, url: t.url })),
      atlas: m.atlas.map((t) => ({ id: t.id, externalId: t.externalId, name: t.name, url: t.url })),
      aiuc1: m.aiuc1,
      csaAicm: m.csaAicm,
      other: m.other.map((o) => ({ framework: o.framework, ref: o.ref, note: o.note })),
    },
    references: row.references.map((r) => ({ n: r.n, title: r.title, text: r.text, url: r.url, verified: r.verified })),
    implementationNotes: row.implementationNotes,
    openQuestions: row.openQuestions,
    observation: row.observation
      ? { subjectKind: row.observation.subjectKind, expected: row.observation.expected, observedExample: row.observation.observedExample }
      : null,
    observationSchema: row.observationSchema,
    examples: row.examples.map((e) => ({ status: e.status, url: e.url })),
  };
}

function reviewLine(status: string, reviewerStatus: string, depth?: string): string {
  const review = reviewerStatus === 'open' ? 'open for technical review' : `technical review ${reviewerStatus}`;
  return `${depth ? `${depth}, ` : ''}${status}, ${review}`;
}

function bullets(heading: string, lines: string[]): string {
  return lines.length > 0 ? `${heading}:\n${lines.map((line) => `- ${line}`).join('\n')}\n` : '';
}

export const registerControls: Register = (server, deps) => {
  server.registerTool(
    'list_controls',
    {
      title: 'List controls',
      description:
        'List the reference controls of the open control profiles (draft control specifications with stable ids such as AIGE-CTL-EVAL-002, open for technical review). All filters are optional and combine with AND: profile (a profile slug such as "evaluation-environment", or its title), layer (stack layer 1-5, primary or secondary), status (draft, in-review, stable, retired), depth (specified: written in full; derived: restates a chapter 23 seed; stub: outline with open questions) and query (words that must all appear in the id, title or objective). Returns ids for get_control, each control\'s profile, depth, status, layer, objective and URLs.',
      inputSchema: z.object({
        profile: z.string().min(2).max(200).optional().describe('Profile slug or title.'),
        layer: z.number().int().min(1).max(5).optional().describe('Stack layer, 1 to 5.'),
        status: z.enum(STATUSES).optional().describe('Publication status.'),
        depth: z.enum(DEPTHS).optional().describe('How far the control is written.'),
        query: z.string().min(2).max(200).optional().describe('Free text over id, title and objective.'),
      }),
      outputSchema: z.object({
        filters: z.record(z.string(), z.union([z.string(), z.number()])),
        asOf: z.string().describe('Date the profiles were last checked against their sources.'),
        total: z.number().int(),
        profiles: z.array(profileItem).describe('The profiles the listed controls belong to.'),
        controls: z.array(listItem),
        ...provenanceShape,
      }),
      annotations: { title: 'List controls', ...READ_ONLY },
    },
    async ({ profile, layer, status, depth, query }) =>
      guarded(deps, 'list_controls', async () => {
        const doc = await deps.data.controls();
        let rows = doc.controls;
        let chosen: ControlProfile | undefined;
        if (profile) {
          chosen = findProfile(doc.profiles, profile);
          if (!chosen) {
            return fail(`Unknown profile "${profile}". Profiles: ${doc.profiles.map((p) => p.slug).join(', ')}.`);
          }
          const slug = chosen.slug;
          rows = rows.filter((row) => row.profile === slug);
        }
        if (layer) rows = rows.filter((row) => row.layer === layer || row.secondaryLayers.includes(layer));
        if (status) rows = rows.filter((row) => row.status === status);
        if (depth) rows = rows.filter((row) => row.depth === depth);
        if (query) {
          const words = tokens(query);
          rows = rows.filter((row) => matchesQuery(row, words));
        }
        const controls = rows.map(item);
        const used = new Set(rows.map((row) => row.profile));
        const profiles = doc.profiles.filter((p) => used.has(p.slug)).map(profileOf);
        const filters = Object.fromEntries(
          Object.entries({ profile: chosen?.slug, layer, status, depth, query }).filter(([, v]) => v !== undefined),
        ) as Record<string, string | number>;
        const p = provenanceOf(chosen?.url ?? CONTROLS_PAGE, doc.self, doc.version);
        const described = Object.entries(filters)
          .map(([k, v]) => `${k} ${v}`)
          .join(', ');
        const text = [
          `${controls.length} control(s)${described ? ` (${described})` : ''}. Draft control specifications, checked against their sources on ${doc.asOf}; nothing here is reviewed or certified.`,
          ...profiles.map((pr) => `Profile: ${pr.title} v${pr.version} (${reviewLine(pr.status, pr.reviewerStatus)}) ${pr.url}`),
          '',
          ...controls.map(
            (c) =>
              `- ${c.id}: ${c.title} (${reviewLine(c.status, c.reviewerStatus, c.depth)}; ${layerLabel(c.layer)})\n  ${c.objective}\n  ${c.url}`,
          ),
          controls.length === 0 ? 'No control matches. Drop a filter, or call list_controls without filters.' : '',
          footer(p),
        ].join('\n');
        return ok(text, { filters, asOf: doc.asOf, total: controls.length, profiles, controls, ...p });
      }),
  );

  server.registerTool(
    'get_control',
    {
      title: 'Get a control',
      description:
        'Get one reference control of the open control profiles by its stable id (e.g. "AIGE-CTL-EVAL-002", any case, or "EVAL-002"), its page or JSON URL, or its title: objective, failure modes, scope, enforcement points, verification steps, the evidence it leaves (with schema ids), the failure response, stack layers, patterns, the illustrative mappings (obligation ids, ISO/IEC 42001 Annex A, NIST AI RMF, OWASP, MITRE ATLAS, others), numbered references, implementation notes, open questions, the observation it records and example observations. A draft control specification, open for technical review.',
      inputSchema: z.object({
        id: z.string().min(3).max(300).describe('Control id, URL or title.'),
      }),
      outputSchema: listItem.extend({
        ...recordShape,
        profileInfo: profileItem.nullable(),
        ...provenanceShape,
      }),
      annotations: { title: 'Get a control', ...READ_ONLY },
    },
    async ({ id }) =>
      guarded(deps, 'get_control', async () => {
        const doc = await deps.data.controls();
        const row = findControl(doc.controls, id);
        if (!row) {
          const close = suggest(id.toUpperCase(), doc.controls.map((r) => r.id));
          return fail(
            `No control "${id}".${close.length > 0 ? ` Closest ids: ${close.join(', ')}.` : ''} Use list_controls to see them all.`,
          );
        }
        const profile = doc.profiles.find((pr) => pr.slug === row.profile);
        const full = record(row);
        const m = full.mappings;
        const p = provenanceOf(row.url, row.json, doc.version);
        const text = [
          `${row.id}: ${row.title}`,
          `${profile ? `${profile.title} v${profile.version}; ` : ''}${reviewLine(row.status, row.reviewerStatus, row.depth)}`,
          '',
          `Objective: ${row.objective}`,
          `Scope: ${row.scope}`,
          `Layers: ${[row.layer, ...row.secondaryLayers].map(layerLabel).join('; ')}`,
          `Enforcement points: ${row.enforcementPoints.join(', ')}`,
          '',
          bullets('Failure modes', full.failureModes),
          bullets('Verification', full.verification.map((v) => `${v.kind}: ${v.text}`)),
          bullets(
            'Evidence',
            full.evidence.map((e) => `${e.artefact}${e.schema ? ` (${e.schema})` : ''}`),
          ),
          `Failure response (${full.failureResponse.effect}): ${full.failureResponse.text}`,
          '',
          full.patterns.length > 0 ? `Patterns: ${full.patterns.map((pt) => `${pt.title} ${pt.url}`).join('; ')}` : '',
          full.seeds.length > 0 ? `Builds on (chapter 23): ${full.seeds.map((s) => `${s.title} ${s.url}`).join('; ')}` : '',
          bullets(
            'Mappings (illustrative, not a claim of conformity)',
            [
              m.obligations.length > 0 ? `Obligations: ${m.obligations.map((o) => o.id).join(', ')}` : '',
              m.iso42001.length > 0 ? `ISO/IEC 42001 Annex A: ${m.iso42001.map((c) => `${c.id} ${c.title}`).join('; ')}` : '',
              m.nistAiRmf.length > 0 ? `NIST AI RMF: ${m.nistAiRmf.map((c) => `${c.id} ${c.title}`).join('; ')}` : '',
              m.owasp.length > 0 ? `OWASP: ${m.owasp.map((t) => `${t.externalId} ${t.name}`).join('; ')}` : '',
              m.atlas.length > 0 ? `MITRE ATLAS: ${m.atlas.map((t) => `${t.externalId} ${t.name}`).join('; ')}` : '',
              m.aiuc1.length > 0 ? `AIUC-1: ${m.aiuc1.join(', ')}` : '',
              m.csaAicm.length > 0 ? `CSA AICM: ${m.csaAicm.join(', ')}` : '',
              m.other.length > 0 ? `Other: ${m.other.map((o) => `${o.framework} ${o.ref}`).join('; ')}` : '',
            ].filter((line) => line !== ''),
          ),
          '',
          bullets('Implementation notes', full.implementationNotes),
          bullets('Open questions', full.openQuestions),
          full.observation
            ? `Observation (${full.observation.subjectKind}). Expected: ${full.observation.expected}\nExample: ${full.observation.observedExample}\nSchema: ${full.observationSchema}`
            : '',
          full.examples.length > 0 ? `Example observations: ${full.examples.map((e) => `${e.status} ${e.url}`).join('; ')}` : '',
          '',
          bullets('References', full.references.map((r) => `[${r.n}] ${r.text}${r.text.includes(r.url) ? '' : ` ${r.url}`}`)),
          `Page: ${row.url}`,
          profile ? `Review this profile: ${profile.reviewForm}` : '',
          footer(p),
        ]
          .join('\n')
          .replace(/\n{3,}/g, '\n\n');
        return ok(text, {
          ...item(row),
          ...full,
          profileInfo: profile ? profileOf(profile) : null,
          ...p,
        });
      }),
  );
};
