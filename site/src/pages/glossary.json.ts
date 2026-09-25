// /glossary.json: a static endpoint the in-chapter hover cards fetch once to
// look up a term's definition and its page, and an open dataset of the book's
// terms. Shape, one object per term:
//   { term, slug, definition, url, anchor, chapters }
// `slug` is the term's `t-…` id (the hover cards' `data-term` key); `url` is the
// term's canonical page, /glossary/<page-slug>; `anchor` is its entry in the
// book index, /bok/glossary#<slug>; `definition` is clipped to <=240 chars on a
// sentence boundary where it can be.
import type { APIRoute } from 'astro';
import { getGlossary } from '../lib/glossary';

const MAX_DEF = 240;

/** Trim a definition to <=240 chars, ending on a sentence boundary where it can. */
function clip(definition: string, max = MAX_DEF): string {
  if (definition.length <= max) return definition;
  const window = definition.slice(0, max);
  const stop = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('! '),
    window.lastIndexOf('? '),
  );
  if (stop >= 80) return window.slice(0, stop + 1);
  const space = window.lastIndexOf(' ');
  return `${(space > 0 ? window.slice(0, space) : window).replace(/[\s,;:]+$/, '')}…`;
}

export const GET: APIRoute = () => {
  const entries = getGlossary().map((entry) => ({
    term: entry.term,
    slug: entry.id,
    definition: clip(entry.definition),
    url: entry.url,
    anchor: `/bok/glossary#${entry.id}`,
    chapters: entry.chapterRefs,
  }));

  return new Response(JSON.stringify(entries), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
