// glossary.ts: search_glossary and get_term over /api/v1/glossary.json.
// A term's canonical page is /glossary/<slug>, where the slug is its id
// without the `t-` prefix.

import * as z from 'zod';

import { CANONICAL_SITE } from '../data.js';
import type { GlossaryTerm } from '../types.js';
import { normalise, score, slugKey, suggest } from '../text.js';
import { READ_ONLY, fail, footer, guarded, ok, provenanceOf, provenanceShape, type Register } from './common.js';

export function termSlug(term: GlossaryTerm): string {
  return term.id.replace(/^t-/, '');
}

export function termPage(term: GlossaryTerm): string {
  return `${CANONICAL_SITE}/glossary/${termSlug(term)}`;
}

const chapterRef = z.object({ number: z.string(), url: z.string().nullable() });

const termShape = z.object({
  slug: z.string(),
  term: z.string(),
  definition: z.string(),
  url: z.string().describe('Canonical page of the term.'),
  glossaryUrl: z.string().describe('The term in the glossary chapter.'),
  chapters: z.array(chapterRef).describe('Chapters that use the term.'),
});

function termOut(term: GlossaryTerm) {
  return {
    slug: termSlug(term),
    term: term.term,
    definition: term.definition,
    url: termPage(term),
    glossaryUrl: term.anchor ?? term.url,
    chapters: term.chapters.map((c) => ({ number: c.number, url: c.url })),
  };
}

/** Find a term by slug, id, URL or name (case and punctuation ignored). */
export function findTerm(terms: GlossaryTerm[], wanted: string): GlossaryTerm | undefined {
  const raw = wanted.trim();
  const last = raw.split(/[/#?]/).filter((part) => part !== '').pop() ?? raw;
  const key = slugKey(last.replace(/^t-/, ''));
  const name = normalise(raw);
  return (
    terms.find((t) => normalise(t.term) === name) ??
    terms.find((t) => termSlug(t) === last.toLowerCase()) ??
    terms.find((t) => termSlug(t) === key) ??
    terms.find((t) => normalise(t.term) === name) ??
    // "AUP" or "Acceptable use policy" for "Acceptable use policy (AUP)"
    terms.find((t) => {
      const base = normalise(t.term.replace(/\([^)]*\)/g, ''));
      const inner = /\(([^)]*)\)/.exec(t.term)?.[1];
      return base === name || (inner !== undefined && normalise(inner) === name);
    })
  );
}

export const registerGlossary: Register = (server, deps) => {
  server.registerTool(
    'search_glossary',
    {
      title: 'Search the glossary',
      description:
        'Search the canonical terms of AI governance engineering (definitions from the Body of Knowledge glossary, chapter 09). Matches term names, acronyms and definition text; every query word must match. Returns term slugs for get_term, definitions, the canonical page URL of each term and the chapters that use it.',
      inputSchema: z.object({
        query: z.string().min(2).max(200).describe('Words to look for, e.g. "abstention band", "FRIA", "model card".'),
        limit: z.number().int().min(1).max(50).default(10).describe('Maximum number of terms to return.'),
      }),
      outputSchema: z.object({
        query: z.string(),
        total: z.number().int().describe('Number of matching terms (before the limit).'),
        results: z.array(termShape.extend({ score: z.number() })),
        ...provenanceShape,
      }),
      annotations: { title: 'Search the glossary', ...READ_ONLY },
    },
    async ({ query, limit }) =>
      guarded(deps, 'search_glossary', async () => {
        const doc = await deps.data.glossary();
        const ranked = doc.terms
          .map((term) => ({ term, s: score(query, term.term, [{ text: term.definition, weight: 2 }]) }))
          .filter((item) => item.s > 0)
          .sort((a, b) => b.s - a.s || a.term.term.localeCompare(b.term.term));
        const results = ranked.slice(0, limit).map((item) => ({ ...termOut(item.term), score: item.s }));
        const p = provenanceOf(`${CANONICAL_SITE}/resources/glossary`, doc.self, doc.version);
        const lines =
          results.length === 0
            ? [`No glossary term matches "${query}". Try fewer or broader words, or search_bok for the chapters.`]
            : [
                `${ranked.length} glossary term(s) match "${query}"${ranked.length > results.length ? `; the first ${results.length}` : ''}:`,
                '',
                ...results.map((r) => `- ${r.term} (slug: ${r.slug}): ${r.definition}\n  ${r.url}`),
              ];
        return ok([...lines, footer(p)].join('\n'), { query, total: ranked.length, results, ...p });
      }),
  );

  server.registerTool(
    'get_term',
    {
      title: 'Get a glossary term',
      description:
        'Get one glossary term by slug (e.g. "abstention-band"), by its id ("t-abstention-band"), by its page URL or by its name ("Abstention band", or an acronym in brackets such as "AUP"). Returns the definition, the canonical page, the chapters that use it and the other terms whose definitions mention it.',
      inputSchema: z.object({
        slug: z.string().min(1).max(200).describe('Term slug, id, URL or name.'),
      }),
      outputSchema: termShape.extend({
        mentionedIn: z
          .array(z.object({ slug: z.string(), term: z.string(), url: z.string() }))
          .describe('Other terms whose definitions mention this one (up to 10).'),
        ...provenanceShape,
      }),
      annotations: { title: 'Get a glossary term', ...READ_ONLY },
    },
    async ({ slug }) =>
      guarded(deps, 'get_term', async () => {
        const doc = await deps.data.glossary();
        const term = findTerm(doc.terms, slug);
        if (!term) {
          const close = suggest(slug, doc.terms.map((t) => termSlug(t)));
          return fail(
            `No glossary term "${slug}".${close.length > 0 ? ` Closest slugs: ${close.join(', ')}.` : ''} Use search_glossary to look terms up by words.`,
          );
        }
        const name = normalise(term.term.replace(/\([^)]*\)/g, ''));
        const mentionedIn = doc.terms
          .filter((other) => other.id !== term.id && name.length > 3 && ` ${normalise(other.definition)} `.includes(` ${name} `))
          .slice(0, 10)
          .map((other) => ({ slug: termSlug(other), term: other.term, url: termPage(other) }));
        const out = termOut(term);
        const p = provenanceOf(out.url, doc.self, doc.version);
        const text = [
          `${term.term}`,
          '',
          term.definition,
          '',
          `Page: ${out.url}`,
          out.chapters.length > 0 ? `Used in: ${out.chapters.map((c) => `ch. ${c.number}${c.url ? ` ${c.url}` : ''}`).join('; ')}` : '',
          mentionedIn.length > 0 ? `Mentioned in: ${mentionedIn.map((m) => m.term).join('; ')}` : '',
          footer(p),
        ]
          .filter((line, i, all) => line !== '' || all[i - 1] !== '')
          .join('\n');
        return ok(text, { ...out, mentionedIn, ...p });
      }),
  );
};
