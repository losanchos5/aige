// crosswalk.ts: map_clause, from one framework clause to the crosswalk topics
// it sits in and the clauses of the other frameworks on the same topics, over
// /api/v1/crosswalk.json (with frameworks.json and obligations.json for names
// and for clauses the crosswalk does not list).

import * as z from 'zod';

import { CANONICAL_SITE } from '../data.js';
import type { CrosswalkDoc, CrosswalkReference } from '../types.js';
import { READ_ONLY, fail, footer, guarded, layerLabel, ok, provenanceOf, provenanceShape, type Register } from './common.js';
import { frameworkNames, resolveFrameworks } from './resolve.js';

/** Comparable form of a clause reference: "Article 9(2)" and "Art. 9(2)" → "art9(2)"; "6.1.2" stays "6.1.2". */
export function refKey(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\b(articles?|arts?)\b\.?/g, 'art')
    .replace(/\bsection\b|§/g, '')
    .replace(/[\s ]+/g, '')
    .replace(/\.$/, '');
}

type Match = 'exact' | 'narrower' | 'broader';

function matchOf(wanted: string, ref: CrosswalkReference): Match | null {
  const keys = [refKey(ref.reference), refKey(ref.label)];
  if (keys.includes(wanted)) return 'exact';
  const boundary = (s: string, prefix: string): boolean => {
    if (!s.startsWith(prefix) || s.length === prefix.length) return false;
    const next = s[prefix.length] ?? '';
    const last = prefix[prefix.length - 1] ?? '';
    // "art9" → "art9(2)" yes, "art90" no; "6.1" → "6.1.2" yes, "6.1" → "6.12" no.
    return !(/\d/.test(last) && /\d/.test(next));
  };
  if (keys.some((key) => boundary(key, wanted))) return 'narrower';
  if (keys.some((key) => key.length >= 2 && boundary(wanted, key))) return 'broader';
  return null;
}

const refShape = z.object({
  column: z.string().describe('Crosswalk column (framework family).'),
  framework: z.string(),
  reference: z.string(),
  title: z.string(),
  strength: z.string().describe('core or related.'),
  verified: z.boolean(),
  url: z.string().nullable(),
  obligationId: z.string().nullable(),
});

function columnLabel(crosswalk: CrosswalkDoc, framework: string): string {
  return crosswalk.columns.find((c) => c.frameworks.includes(framework))?.label ?? framework;
}

function refOut(crosswalk: CrosswalkDoc, ref: CrosswalkReference): z.infer<typeof refShape> {
  return {
    column: columnLabel(crosswalk, ref.framework),
    framework: ref.framework,
    reference: ref.label,
    title: ref.title,
    strength: ref.strength,
    verified: ref.verified,
    url: ref.url,
    obligationId: ref.obligationId,
  };
}

export const registerCrosswalk: Register = (server, deps) => {
  server.registerTool(
    'map_clause',
    {
      title: 'Map a clause across frameworks',
      description:
        'Map one clause of a framework to the others through the topic crosswalk (25 governance topics against the EU AI Act, GPAI Code, GDPR, ISO/IEC 42001 and related standards, NIST AI RMF, CSA AICM, OWASP, Korea, UK, Singapore, Council of Europe, OECD, G7, CEN-CENELEC and the Chinese instruments). Give the framework ("EU AI Act", "iso-42001", "NIST AI RMF", "GDPR") and the clause as the framework writes it ("Art. 9", "Article 10(2)", "6.1.2", "GOVERN 1", "A.6", "LLM01"). Returns each topic the clause sits in, with the clauses of the other frameworks on that topic, their strength (core or related) and the obligation-register ids joined to them.',
      inputSchema: z.object({
        framework: z.string().min(2).max(120).describe('Framework id or name.'),
        ref: z.string().min(1).max(80).describe('Clause reference, e.g. "Art. 9", "6.1.2", "GOVERN 1".'),
      }),
      outputSchema: z.object({
        framework: z.string(),
        frameworkIds: z.array(z.string()),
        ref: z.string(),
        via: z.enum(['crosswalk', 'obligation-register']).describe('Where the clause was found.'),
        matches: z.array(
          refShape.extend({
            match: z.enum(['exact', 'narrower', 'broader']).describe('How the crosswalk clause relates to the one asked for.'),
            note: z.string().nullable(),
            topic: z.object({ id: z.string(), name: z.string(), summary: z.string(), layers: z.array(z.number().int()) }),
            equivalents: z.array(refShape).describe('Clauses of other frameworks on the same topic.'),
          }),
        ),
        ...provenanceShape,
      }),
      annotations: { title: 'Map a clause across frameworks', ...READ_ONLY },
    },
    async ({ framework, ref }) =>
      guarded(deps, 'map_clause', async () => {
        const [crosswalk, frameworks, obligations] = await Promise.all([
          deps.data.crosswalk(),
          deps.data.frameworks(),
          deps.data.obligations(),
        ]);
        const names = frameworkNames(frameworks, crosswalk);
        const ids = resolveFrameworks(framework, names, crosswalk);
        if (ids.length === 0) {
          const known = [...new Set(crosswalk.references.map((r) => r.framework))];
          return fail(`No framework matches "${framework}". Frameworks in the crosswalk: ${known.join(', ')}.`);
        }
        const wanted = refKey(ref);
        const candidates = crosswalk.references.filter((r) => ids.includes(r.framework));
        const rank: Record<Match, number> = { exact: 0, narrower: 1, broader: 2 };
        let found = candidates
          .map((r) => ({ r, m: matchOf(wanted, r) }))
          .filter((x): x is { r: CrosswalkReference; m: Match } => x.m !== null);
        const best = Math.min(...found.map((x) => rank[x.m]));
        found = found.filter((x) => rank[x.m] === best);

        let via: 'crosswalk' | 'obligation-register' = 'crosswalk';
        const topicById = new Map(crosswalk.topics.map((t) => [t.id, t]));
        let pairs: { r: CrosswalkReference; m: Match }[] = found;
        if (pairs.length === 0) {
          // Not in the crosswalk: an obligation row with that clause still names its topics.
          const row = obligations.obligations.find((o) => ids.includes(o.frameworkId) && refKey(o.clause) === wanted);
          if (row && row.crosswalkTopics.length > 0) {
            via = 'obligation-register';
            pairs = row.crosswalkTopics.map((topic) => ({
              r: {
                topic,
                framework: row.frameworkId,
                reference: row.clause,
                label: row.clause,
                title: row.requirement,
                strength: 'related',
                verified: true,
                note: `From the obligation register row ${row.id}.`,
                url: row.url,
                obligationId: row.id,
              },
              m: 'exact' as const,
            }));
          }
        }
        if (pairs.length === 0) {
          const available = [...new Set(candidates.map((r) => r.label))].slice(0, 60);
          return fail(
            `"${ref}" is not in the crosswalk for ${ids.join(', ')}.${available.length > 0 ? ` Clauses listed: ${available.join(', ')}.` : ''}`,
          );
        }
        const matches = pairs.map(({ r, m }) => {
          const topic = topicById.get(r.topic);
          const equivalents = crosswalk.references
            .filter((other) => other.topic === r.topic && !ids.includes(other.framework))
            .map((other) => refOut(crosswalk, other));
          return {
            ...refOut(crosswalk, r),
            match: m,
            note: r.note,
            topic: {
              id: r.topic,
              name: topic?.name ?? r.topic,
              summary: topic?.summary ?? '',
              layers: topic?.layers ?? [],
            },
            equivalents,
          };
        });
        const p = provenanceOf(`${CANONICAL_SITE}/resources/crosswalk`, crosswalk.self, crosswalk.version);
        const lines: string[] = [];
        for (const match of matches) {
          lines.push(
            `${match.column} ${match.reference} (${match.title}; ${match.match} match) sits in the topic "${match.topic.name}" (${match.topic.layers.map(layerLabel).join('; ')}).`,
          );
          if (match.topic.summary) lines.push(`  ${match.topic.summary}`);
          const byColumn = new Map<string, string[]>();
          for (const eq of match.equivalents) {
            const list = byColumn.get(eq.column) ?? [];
            list.push(`${eq.reference} ${eq.title} [${eq.strength}${eq.verified ? '' : ', unverified'}]${eq.obligationId ? ` (${eq.obligationId})` : ''}`);
            byColumn.set(eq.column, list);
          }
          for (const [column, list] of byColumn) lines.push(`  - ${column}: ${list.join('; ')}`);
          lines.push('');
        }
        if (via === 'obligation-register') {
          lines.unshift('Not listed in the crosswalk itself; mapped through the topics of its obligation-register row.', '');
        }
        return ok([...lines, footer(p).trimStart()].join('\n'), {
          framework,
          frameworkIds: ids,
          ref,
          via,
          matches,
          ...p,
        });
      }),
  );
};
