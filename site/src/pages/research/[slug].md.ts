// /research/<slug>.md: the Markdown alternate of a research note, its source
// file (research/<slug>.md, frontmatter dropped) under the header of
// lib/llms.ts, with the note's own version in the header and a status line
// (version, state, review) before the text. Seo.astro links it from the page.
import type { APIRoute, GetStaticPaths } from 'astro';
import { researchPath, writtenThemes } from '../../data/research';
import { researchDocs } from '../../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  writtenThemes().map((theme) => ({ params: { slug: theme.slug } }));

export const GET: APIRoute = async ({ params }) => {
  const doc = (await researchDocs()).find((d) => d.path === researchPath(params.slug ?? ''));
  if (!doc) throw new Error(`no research note for /research/${params.slug}.md`);
  return markdownResponse(markdownDocument(doc, doc.body));
};
