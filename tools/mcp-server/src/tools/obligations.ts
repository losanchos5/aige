// obligations.ts: get_obligations (filtered register) and get_obligation (one
// row with its framework, patterns and crosswalk references), over
// /api/v1/obligations.json, frameworks.json, patterns.json and crosswalk.json.

import * as z from 'zod';

import { CANONICAL_SITE } from '../data.js';
import type { Obligation } from '../types.js';
import { normalise, suggest } from '../text.js';
import {
  READ_ONLY,
  fail,
  footer,
  guarded,
  layerLabel,
  ok,
  patternSlug,
  provenanceOf,
  provenanceShape,
  type Register,
} from './common.js';
import { frameworkNames, resolveFrameworks } from './resolve.js';

const milestoneShape = z.object({ date: z.string(), systemClass: z.array(z.string()), note: z.string() });

const obligationSummary = z.object({
  id: z.string(),
  framework: z.string(),
  frameworkId: z.string(),
  clause: z.string(),
  obligation: z.string(),
  requirement: z.string(),
  artefact: z.string().describe('The engineering artefact that evidences the obligation.'),
  layers: z.array(z.number().int()),
  dutyHolder: z.string().nullable(),
  scope: z.string().nullable().describe('Who the row binds, for laws outside the EU AI Act.'),
  appliesFrom: z.string().nullable().describe('First application date (ISO), null when voluntary or undated.'),
  appliesStatus: z.string(),
  appliesNote: z.string().nullable(),
  milestones: z.array(milestoneShape),
  systemClass: z.array(z.string()),
  patterns: z
    .array(z.object({ id: z.string(), title: z.string(), url: z.string() }))
    .describe('Patterns that implement the obligation, with their pattern pages.'),
  reviewed: z.string(),
  url: z.string().describe('Canonical page of the obligation.'),
  json: z.string(),
});

function summary(row: Obligation): z.infer<typeof obligationSummary> {
  return {
    id: row.id,
    framework: row.framework,
    frameworkId: row.frameworkId,
    clause: row.clause,
    obligation: row.obligation,
    requirement: row.requirement,
    artefact: row.artefact,
    layers: row.layers,
    dutyHolder: row.dutyHolder,
    scope: row.scope,
    appliesFrom: row.appliesFrom,
    appliesStatus: row.appliesStatus,
    appliesNote: row.appliesNote,
    milestones: row.milestones,
    systemClass: row.systemClass,
    patterns: row.patterns.map((pt) => ({
      id: pt.id,
      title: pt.title,
      url: `${CANONICAL_SITE}/patterns/${patternSlug(pt.id)}`,
    })),
    reviewed: row.reviewed,
    url: row.url,
    json: row.json,
  };
}

function oneLine(row: Obligation): string {
  const when = row.appliesFrom ? `${row.appliesStatus} from ${row.appliesFrom}` : row.appliesStatus;
  const who = row.dutyHolder ? `; ${row.dutyHolder}` : row.scope ? `; ${row.scope}` : '';
  return `- ${row.id}: ${row.obligation} (${when}${who})\n  Artefact: ${row.artefact}\n  ${row.url}`;
}

/** Find a row by id (any case), page URL or JSON URL. */
export function findObligation(rows: Obligation[], wanted: string): Obligation | undefined {
  const raw = wanted.trim();
  const last = (raw.split(/[/#?]/).filter((part) => part !== '').pop() ?? raw).replace(/\.json$/i, '');
  const key = last.toUpperCase();
  return rows.find((row) => row.id === key);
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export const registerObligations: Register = (server, deps) => {
  server.registerTool(
    'get_obligations',
    {
      title: 'List obligations',
      description:
        'Filter the obligation register (obligation → artefact → stack layer, with stable ids such as AIGE-OBL-EUAIA-ART9). All filters are optional and combine with AND. framework: an id, short name or name ("eu-ai-act", "EU AI Act", "ISO 42001", "nist"); role: a duty holder such as "provider", "deployer", "developer" or "GPAI provider" (matched in the duty holder, or in the scope of laws that name who they bind; rows with neither, such as voluntary standards, drop out); systemClass: an EU AI Act class (all-ai-systems, prohibited, high-risk-annex-iii, high-risk-annex-i, transparency-art50, gpai, gpai-systemic); appliesBefore: an ISO date, keeping rows whose first application date (appliesFrom) is on or before it (later milestones are listed with each row); status: in-force, applies-later, deferred, grace, voluntary or pending; layer: a stack layer 1-5.',
      inputSchema: z.object({
        framework: z.string().max(120).optional().describe('Framework id or name.'),
        role: z.string().max(80).optional().describe('Duty holder, e.g. "provider", "deployer".'),
        systemClass: z.string().max(40).optional().describe('EU AI Act system class id.'),
        appliesBefore: z
          .string()
          .regex(ISO_DATE, 'Use an ISO date, YYYY-MM-DD.')
          .optional()
          .describe('ISO date (YYYY-MM-DD).'),
        status: z.string().max(40).optional().describe('Application status.'),
        layer: z.number().int().min(1).max(5).optional().describe('Stack layer, 1 to 5.'),
        limit: z.number().int().min(1).max(100).default(25).describe('Maximum number of rows to return.'),
      }),
      outputSchema: z.object({
        filters: z.record(z.string(), z.unknown()),
        frameworkIds: z.array(z.string()).describe('Framework ids the framework filter resolved to.'),
        total: z.number().int(),
        returned: z.number().int(),
        obligations: z.array(obligationSummary),
        ...provenanceShape,
      }),
      annotations: { title: 'List obligations', ...READ_ONLY },
    },
    async ({ framework, role, systemClass, appliesBefore, status, layer, limit }) =>
      guarded(deps, 'get_obligations', async () => {
        const [doc, frameworks, crosswalk] = await Promise.all([
          deps.data.obligations(),
          deps.data.frameworks(),
          deps.data.crosswalk(),
        ]);
        let rows = doc.obligations;
        let frameworkIds: string[] = [];
        if (framework) {
          frameworkIds = resolveFrameworks(framework, frameworkNames(frameworks, crosswalk), crosswalk).filter((id) =>
            doc.obligations.some((row) => row.frameworkId === id),
          );
          if (frameworkIds.length === 0) {
            const known = [...new Set(doc.obligations.map((row) => row.frameworkId))];
            return fail(
              `No framework in the obligation register matches "${framework}". Register frameworks: ${known.join(', ')}.`,
            );
          }
          rows = rows.filter((row) => frameworkIds.includes(row.frameworkId));
        }
        if (role) {
          // EU rows name the duty holder; other laws name who they bind in `scope`.
          const wanted = normalise(role);
          rows = rows.filter((row) =>
            [row.dutyHolder, row.scope].some((field) => field !== null && ` ${normalise(field)} `.includes(` ${wanted}`)),
          );
        }
        if (systemClass) {
          const classes = [...new Set(doc.obligations.flatMap((row) => row.systemClass))];
          const wanted = systemClass.trim().toLowerCase();
          if (!classes.includes(wanted)) {
            return fail(`Unknown system class "${systemClass}". Classes in the register: ${classes.join(', ')}.`);
          }
          rows = rows.filter((row) => row.systemClass.includes(wanted));
        }
        if (appliesBefore) {
          rows = rows.filter((row) => row.appliesFrom !== null && row.appliesFrom <= appliesBefore);
        }
        if (status) {
          const statuses = [...new Set(doc.obligations.map((row) => row.appliesStatus))];
          const wanted = status.trim().toLowerCase();
          if (!statuses.includes(wanted)) {
            return fail(`Unknown status "${status}". Statuses in the register: ${statuses.join(', ')}.`);
          }
          rows = rows.filter((row) => row.appliesStatus === wanted);
        }
        if (layer) rows = rows.filter((row) => row.layers.includes(layer));

        const filters = Object.fromEntries(
          Object.entries({ framework, role, systemClass, appliesBefore, status, layer }).filter(([, v]) => v !== undefined),
        );
        const shown = rows.slice(0, limit);
        const p = provenanceOf(`${CANONICAL_SITE}/obligations`, doc.self, doc.version);
        const described = Object.entries(filters)
          .map(([k, v]) => `${k}=${String(v)}`)
          .join(', ');
        const text =
          rows.length === 0
            ? [`No obligation row matches ${described || 'the filters'}.`, footer(p)].join('\n')
            : [
                `${rows.length} obligation row(s)${described ? ` for ${described}` : ''}${rows.length > shown.length ? `; the first ${shown.length}` : ''}:`,
                '',
                ...shown.map(oneLine),
                footer(p),
              ].join('\n');
        return ok(text, {
          filters,
          frameworkIds,
          total: rows.length,
          returned: shown.length,
          obligations: shown.map(summary),
          ...p,
        });
      }),
  );

  server.registerTool(
    'get_obligation',
    {
      title: 'Get an obligation',
      description:
        'Get one row of the obligation register by its stable id (e.g. "AIGE-OBL-EUAIA-ART9", any case) or its page URL: the requirement, the artefact that evidences it, the stack layers, duty holder, application date and later milestones, the patterns that implement it, the crosswalk references joined to it, and the chapter 08 section it comes from.',
      inputSchema: z.object({
        id: z.string().min(3).max(200).describe('Obligation id or URL.'),
      }),
      outputSchema: obligationSummary.extend({
        authority: z.string().nullable(),
        chapter: z.string().describe('Chapter 08 section the row comes from.'),
        crosswalkTopics: z.array(z.string()),
        frameworkInfo: z
          .object({ id: z.string(), name: z.string(), type: z.string(), issuer: z.string(), url: z.string().nullable(), page: z.string() })
          .nullable(),
        crosswalk: z.array(
          z.object({
            topic: z.string(),
            topicName: z.string(),
            reference: z.string(),
            title: z.string(),
            strength: z.string(),
            url: z.string().nullable(),
          }),
        ),
        ...provenanceShape,
      }),
      annotations: { title: 'Get an obligation', ...READ_ONLY },
    },
    async ({ id }) =>
      guarded(deps, 'get_obligation', async () => {
        const [doc, frameworks, crosswalk] = await Promise.all([
          deps.data.obligations(),
          deps.data.frameworks(),
          deps.data.crosswalk(),
        ]);
        const row = findObligation(doc.obligations, id);
        if (!row) {
          const close = suggest(id.toUpperCase(), doc.obligations.map((r) => r.id));
          return fail(
            `No obligation "${id}".${close.length > 0 ? ` Closest ids: ${close.join(', ')}.` : ''} Use get_obligations to list rows by framework.`,
          );
        }
        const fw = frameworks.frameworks.find((f) => f.id === row.frameworkId) ?? null;
        const out = summary(row);
        const topicName = new Map(crosswalk.topics.map((t) => [t.id, t.name]));
        const refs = crosswalk.references
          .filter((ref) => ref.obligationId === row.id)
          .map((ref) => ({
            topic: ref.topic,
            topicName: topicName.get(ref.topic) ?? ref.topic,
            reference: ref.label,
            title: ref.title,
            strength: ref.strength,
            url: ref.url,
          }));
        const p = provenanceOf(row.url, row.json, doc.version);
        const text = [
          `${row.id}: ${row.obligation}`,
          '',
          `Framework: ${row.framework}${fw ? ` (${fw.type}, ${fw.issuer})` : ''}; clause ${row.clause}`,
          `Requirement: ${row.requirement}`,
          `Artefact: ${row.artefact}`,
          `Layers: ${row.layers.map(layerLabel).join('; ')}`,
          row.dutyHolder ? `Duty holder: ${row.dutyHolder}` : '',
          row.scope ? `Scope: ${row.scope}` : '',
          row.authority ? `Authority: ${row.authority}` : '',
          `Applies: ${row.appliesStatus}${row.appliesFrom ? ` from ${row.appliesFrom}` : ''}${row.appliesNote ? ` (${row.appliesNote})` : ''}`,
          ...row.milestones.map(
            (m) => `Milestone ${m.date}${m.systemClass.length > 0 ? ` [${m.systemClass.join(', ')}]` : ''}: ${m.note}`,
          ),
          row.systemClass.length > 0 ? `System classes: ${row.systemClass.join(', ')}` : '',
          out.patterns.length > 0 ? `Patterns: ${out.patterns.map((pt) => `${pt.title} ${pt.url}`).join('; ')}` : '',
          refs.length > 0 ? `Crosswalk: ${refs.map((r) => `${r.topicName} (${r.reference}, ${r.strength})`).join('; ')}` : '',
          `Chapter 08 section: ${row.chapter}`,
          `Reviewed: ${row.reviewed}`,
          footer(p),
        ]
          .filter((line) => line !== '')
          .join('\n');
        return ok(text, {
          ...out,
          authority: row.authority,
          chapter: row.chapter,
          crosswalkTopics: row.crosswalkTopics,
          frameworkInfo: fw
            ? { id: fw.id, name: fw.name, type: fw.type, issuer: fw.issuer, url: fw.url, page: fw.page }
            : null,
          crosswalk: refs,
          ...p,
        });
      }),
  );
};
