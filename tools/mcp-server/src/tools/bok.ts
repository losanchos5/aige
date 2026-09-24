// bok.ts: search_bok over the Body of Knowledge: chapter titles, summaries and
// "at a glance" lines from /api/v1/chapters.json, and section headings (with
// their anchors) and section text from /llms-full.txt, pattern pages included.
// Headings weigh most, then chapter titles and summaries, then body text, so a
// query lands on the section that treats a subject before the ones that
// mention it.

import * as z from 'zod';

import type { CorpusDocument } from '../corpus.js';
import { CANONICAL_SITE } from '../data.js';
import type { ChaptersDoc } from '../types.js';
import { normalise, prepareQuery, scoreNormalised, snippet, type Field } from '../text.js';
import { READ_ONLY, flatten, footer, guarded, ok, provenanceOf, provenanceShape, type Register } from './common.js';

type Kind = 'chapter' | 'section' | 'pattern';

interface Entry {
  kind: Kind;
  title: string;
  chapter: string;
  part: string | null;
  url: string;
  text: string;
  t: string;
  fields: Field[];
}

const indexes = new WeakMap<ChaptersDoc, WeakMap<CorpusDocument[], Entry[]>>();

function buildIndex(chapters: ChaptersDoc, corpus: CorpusDocument[]): Entry[] {
  const partTitle = new Map(chapters.parts.map((p) => [p.id, p.title]));
  const chapterByUrl = new Map(chapters.chapters.map((c) => [c.url, c]));
  const entries: Entry[] = [];
  for (const c of chapters.chapters) {
    const glance = c.glance.join(' ');
    entries.push({
      kind: 'chapter',
      title: c.title,
      chapter: c.title,
      part: partTitle.get(c.part) ?? c.part,
      url: c.url,
      text: [c.summary, glance].filter((s) => s !== '').join(' '),
      t: normalise(`${c.title} ${c.shortTitle}`),
      fields: [
        { text: normalise(c.summary), weight: 5 },
        { text: normalise(glance), weight: 3 },
      ],
    });
  }
  for (const doc of corpus) {
    if (doc.kind !== 'chapter' && doc.kind !== 'pattern') continue;
    const chapter = chapterByUrl.get(doc.url);
    const docTitle = chapter?.title ?? doc.title;
    const part = chapter ? (partTitle.get(chapter.part) ?? chapter.part) : doc.kind === 'pattern' ? 'Patterns' : null;
    if (doc.kind === 'pattern') {
      entries.push({
        kind: 'pattern',
        title: doc.title,
        chapter: '05. Patterns',
        part,
        url: doc.url,
        text: flatten(doc.summary),
        t: normalise(doc.title.replace(/^Pattern:\s*/, '')),
        fields: [{ text: normalise(doc.summary), weight: 5 }],
      });
    }
    for (const section of doc.sections) {
      if (/^sources$/i.test(section.heading.text)) continue;
      const body = flatten(section.body);
      entries.push({
        kind: 'section',
        title: section.heading.text,
        chapter: docTitle,
        part,
        url: section.heading.url,
        text: body,
        t: normalise(section.heading.text),
        fields: [
          { text: normalise(docTitle), weight: 3 },
          { text: normalise(body), weight: 1 },
        ],
      });
    }
  }
  return entries;
}

function indexFor(chapters: ChaptersDoc, corpus: CorpusDocument[]): Entry[] {
  let byCorpus = indexes.get(chapters);
  if (!byCorpus) {
    byCorpus = new WeakMap();
    indexes.set(chapters, byCorpus);
  }
  let entries = byCorpus.get(corpus);
  if (!entries) {
    entries = buildIndex(chapters, corpus);
    byCorpus.set(corpus, entries);
  }
  return entries;
}

export const registerBok: Register = (server, deps) => {
  server.registerTool(
    'search_bok',
    {
      title: 'Search the Body of Knowledge',
      description:
        'Search the 24 chapters of the AI Governance Engineer Body of Knowledge and its 17 pattern pages: chapter titles, summaries and key points, section headings and section text. Every query word must match. Returns chapters, sections (with the URL of the heading anchor) and patterns, best first, each with a snippet. Use it to find where the book treats a subject ("human oversight", "post-market monitoring", "agent identity", "conformity assessment").',
      inputSchema: z.object({
        query: z.string().min(2).max(200).describe('Words to look for.'),
        kind: z.enum(['any', 'chapter', 'section', 'pattern']).default('any').describe('Restrict the result type.'),
        limit: z.number().int().min(1).max(30).default(10).describe('Maximum number of results.'),
      }),
      outputSchema: z.object({
        query: z.string(),
        total: z.number().int(),
        headingsSearched: z.boolean().describe('False when the chapter text was unavailable and only chapters.json was searched.'),
        results: z.array(
          z.object({
            kind: z.enum(['chapter', 'section', 'pattern']),
            title: z.string(),
            chapter: z.string(),
            part: z.string().nullable(),
            url: z.string(),
            snippet: z.string(),
            score: z.number(),
          }),
        ),
        ...provenanceShape,
      }),
      annotations: { title: 'Search the Body of Knowledge', ...READ_ONLY },
    },
    async ({ query, kind, limit }) =>
      guarded(deps, 'search_bok', async () => {
        const [chapters, corpus] = await Promise.all([deps.data.chapters(), deps.data.corpusOrEmpty()]);
        const prepared = prepareQuery(query);
        const ranked = indexFor(chapters, corpus)
          .filter((e) => kind === 'any' || e.kind === kind)
          .map((e) => ({ e, s: scoreNormalised(prepared, e.t, e.fields) }))
          .filter((x) => x.s > 0)
          .sort((a, b) => b.s - a.s || a.e.url.localeCompare(b.e.url));
        const results = ranked.slice(0, limit).map(({ e, s }) => ({
          kind: e.kind,
          title: e.title,
          chapter: e.chapter,
          part: e.part,
          url: e.url,
          snippet: snippet(e.text, query),
          score: s,
        }));
        const p = provenanceOf(`${CANONICAL_SITE}/bok`, chapters.self, chapters.version);
        const text =
          results.length === 0
            ? [`Nothing in the Body of Knowledge matches "${query}". Try fewer or broader words.`, footer(p)].join('\n')
            : [
                `${ranked.length} match(es) for "${query}"${ranked.length > results.length ? `; the first ${results.length}` : ''}:`,
                '',
                ...results.map(
                  (r) =>
                    `- [${r.kind}] ${r.kind === 'section' ? `${r.chapter} > ${r.title}` : r.title}\n  ${r.url}${r.snippet ? `\n  ${r.snippet}` : ''}`,
                ),
                footer(p),
              ].join('\n');
        return ok(text, { query, total: ranked.length, headingsSearched: corpus.length > 0, results, ...p });
      }),
  );
};
