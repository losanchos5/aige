// /glossary.json — a static endpoint the in-chapter hover cards fetch once to
// look up a term's definition and its glossary link. Shape:
//   [{ term, slug, definition, url: '/resources/glossary#<slug>' }]
// `slug` matches GlossaryIndex's `termId`, so `url` resolves to the term's <dt>.
import type { APIRoute } from 'astro';
import { getGlossary } from '../lib/glossary';
import { glossarySlug } from '../lib/rehype-glossary';

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
  const entries = getGlossary().map((entry) => {
    const slug = glossarySlug(entry.term);
    return {
      term: entry.term,
      slug,
      definition: clip(entry.definition),
      url: `/resources/glossary#${slug}`,
    };
  });

  return new Response(JSON.stringify(entries), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
