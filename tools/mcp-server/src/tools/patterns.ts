// patterns.ts: list_patterns and get_pattern over /api/v1/patterns.json, with
// each pattern page's text (summary and sections) from /llms-full.txt. The
// canonical page of a pattern is /patterns/<slug>; chapter 05 keeps the
// #pattern-<id> anchors as the catalogue.

import * as z from 'zod';

import { CANONICAL_SITE } from '../data.js';
import type { CorpusDocument } from '../corpus.js';
import type { PatternRow } from '../types.js';
import { slugKey, suggest } from '../text.js';
import {
  READ_ONLY,
  absoluteLinks,
  fail,
  flatten,
  footer,
  guarded,
  layerLabel,
  layerName,
  ok,
  patternSlug,
  provenanceOf,
  provenanceShape,
  type Register,
} from './common.js';

export function patternPage(row: PatternRow): string {
  return `${CANONICAL_SITE}/patterns/${patternSlug(row.id)}`;
}

/** Find a pattern by slug, id, page URL or title ("kill-switch-circuit-breaker", "pattern-aibom", "Runtime Guardrail"). */
export function findPattern(rows: PatternRow[], wanted: string): PatternRow | undefined {
  const raw = wanted.trim().toLowerCase();
  const last = raw.split(/[/#?]/).filter((part) => part !== '').pop() ?? raw;
  const key = slugKey(last.replace(/^pattern-/, ''));
  const whole = slugKey(raw);
  return (
    rows.find((row) => row.id === raw || slugKey(row.title) === whole) ??
    rows.find((row) => row.id === last || row.id === `pattern-${last}`) ??
    rows.find((row) => patternSlug(row.id) === key) ??
    rows.find((row) => slugKey(row.title) === key)
  );
}

function pageOf(corpus: CorpusDocument[], row: PatternRow): CorpusDocument | undefined {
  const slug = patternSlug(row.id);
  return corpus.find((doc) => doc.kind === 'pattern' && doc.slug === slug);
}

const listItem = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  layer: z.number().int(),
  layerName: z.string().nullable(),
  secondaryLayer: z.number().int().nullable(),
  summary: z.string(),
  mapsTo: z.array(z.string()),
  obligations: z.array(z.string()),
  url: z.string().describe('Canonical page of the pattern.'),
});

function item(row: PatternRow, page: CorpusDocument | undefined): z.infer<typeof listItem> {
  return {
    id: row.id,
    slug: patternSlug(row.id),
    title: row.title,
    layer: row.layer,
    layerName: layerName(row.layer),
    secondaryLayer: row.secondaryLayer,
    summary: page ? flatten(page.summary) : '',
    mapsTo: row.mapsTo,
    obligations: row.obligations,
    url: patternPage(row),
  };
}

export const registerPatterns: Register = (server, deps) => {
  server.registerTool(
    'list_patterns',
    {
      title: 'List patterns',
      description:
        'List the reusable governance patterns of the Body of Knowledge (chapter 05), optionally only those of one stack layer (1 Govern-as-Code, 2 Inventory & Transparency, 3 Evals & Red Teaming as Evidence, 4 Runtime Controls & Observability, 5 Assurance & Continuous Compliance; a pattern with a secondary layer is listed under both). Returns slugs for get_pattern, summaries, the frameworks each pattern maps to and the obligation ids that list it.',
      inputSchema: z.object({
        layer: z.number().int().min(1).max(5).optional().describe('Stack layer, 1 to 5.'),
      }),
      outputSchema: z.object({
        layer: z.number().int().nullable(),
        layerName: z.string().nullable(),
        total: z.number().int(),
        patterns: z.array(listItem),
        ...provenanceShape,
      }),
      annotations: { title: 'List patterns', ...READ_ONLY },
    },
    async ({ layer }) =>
      guarded(deps, 'list_patterns', async () => {
        const [doc, corpus] = await Promise.all([deps.data.patterns(), deps.data.corpusOrEmpty()]);
        const rows = layer ? doc.patterns.filter((row) => row.layer === layer || row.secondaryLayer === layer) : doc.patterns;
        const patterns = rows.map((row) => item(row, pageOf(corpus, row)));
        const p = provenanceOf(`${CANONICAL_SITE}/patterns`, doc.self, doc.version);
        const text = [
          `${patterns.length} pattern(s)${layer ? ` in ${layerLabel(layer)}` : ''}:`,
          '',
          ...patterns.map(
            (pt) =>
              `- ${pt.title} (slug: ${pt.slug}; ${layerLabel(pt.layer)}${pt.secondaryLayer ? `, also layer 0${pt.secondaryLayer}` : ''})${pt.summary ? `\n  ${pt.summary}` : ''}\n  ${pt.url}`,
          ),
          footer(p),
        ].join('\n');
        return ok(text, { layer: layer ?? null, layerName: layerName(layer), total: patterns.length, patterns, ...p });
      }),
  );

  server.registerTool(
    'get_pattern',
    {
      title: 'Get a pattern',
      description:
        'Get one governance pattern by slug ("policy-card", "kill-switch-circuit-breaker"), chapter 05 id ("pattern-aibom"), page URL or title: its layer, summary, the frameworks it maps to, the obligation ids that list it and the full text of its page (objectives, context, problem, solution, consequences, related patterns, sources).',
      inputSchema: z.object({
        slug: z.string().min(2).max(200).describe('Pattern slug, id, URL or title.'),
      }),
      outputSchema: listItem.extend({
        secondaryLayerName: z.string().nullable(),
        catalogueUrl: z.string().describe('The pattern in the chapter 05 catalogue.'),
        obligationDetails: z.array(z.object({ id: z.string(), obligation: z.string(), url: z.string() })),
        sections: z
          .array(z.object({ heading: z.string(), url: z.string(), text: z.string() }))
          .describe('Sections of the pattern page, in order (empty when the page text is unavailable).'),
        ...provenanceShape,
      }),
      annotations: { title: 'Get a pattern', ...READ_ONLY },
    },
    async ({ slug }) =>
      guarded(deps, 'get_pattern', async () => {
        const [doc, corpus, obligations] = await Promise.all([
          deps.data.patterns(),
          deps.data.corpusOrEmpty(),
          deps.data.obligations(),
        ]);
        const row = findPattern(doc.patterns, slug);
        if (!row) {
          const close = suggest(slug, doc.patterns.map((r) => patternSlug(r.id)));
          return fail(
            `No pattern "${slug}".${close.length > 0 ? ` Closest slugs: ${close.join(', ')}.` : ''} Use list_patterns to see them all.`,
          );
        }
        const page = pageOf(corpus, row);
        const base = item(row, page);
        const obligationDetails = row.obligations.map((id) => {
          const o = obligations.obligations.find((r) => r.id === id);
          return { id, obligation: o?.obligation ?? id, url: o?.url ?? `${CANONICAL_SITE}/obligations/${id.toLowerCase()}` };
        });
        const sections = (page?.sections ?? []).map((s) => ({
          heading: s.heading.text,
          url: s.heading.url,
          text: absoluteLinks(s.body, CANONICAL_SITE),
        }));
        const p = provenanceOf(base.url, doc.self, doc.version);
        const text = [
          `${row.title} (${layerLabel(row.layer)}${row.secondaryLayer ? `; also ${layerLabel(row.secondaryLayer)}` : ''})`,
          '',
          base.summary ? `Summary: ${base.summary}` : '',
          `Maps to: ${row.mapsTo.join(' · ')}`,
          obligationDetails.length > 0 ? `Obligations: ${obligationDetails.map((o) => o.id).join(', ')}` : '',
          `Page: ${base.url}`,
          '',
          ...sections.map((s) => `## ${s.heading}\n${s.text}\n`),
          page ? '' : 'The page text is not available right now; the metadata above comes from the pattern index.',
          footer(p),
        ]
          .join('\n')
          .replace(/\n{3,}/g, '\n\n');
        return ok(text, {
          ...base,
          secondaryLayerName: layerName(row.secondaryLayer),
          catalogueUrl: row.url,
          obligationDetails,
          sections,
          ...p,
        });
      }),
  );
};
