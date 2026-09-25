// /patterns/<slug>.md: the Markdown alternate of a pattern page, its source
// file (bok/patterns/<slug>.md, frontmatter dropped) under the header of
// lib/llms.ts. Seo.astro links it from the pattern page.
import type { APIRoute, GetStaticPaths } from 'astro';
import { patterns, patternPath } from '../../data/patterns';
import { patternDocs } from '../../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  patterns.map((pattern) => ({ params: { id: pattern.slug } }));

export const GET: APIRoute = async ({ params }) => {
  const doc = (await patternDocs()).find((d) => d.path === patternPath({ slug: params.id ?? '' }));
  if (!doc) throw new Error(`no pattern for /patterns/${params.id}.md`);
  return markdownResponse(markdownDocument(doc, doc.body));
};
