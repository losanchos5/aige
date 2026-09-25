// /bok/<slug>.md: the Markdown alternate of a Body of Knowledge chapter, its
// source with the frontmatter header of lib/llms.ts (title, canonical URL,
// author, licence, DOI, last updated). Seo.astro links it from the chapter page.
import type { APIRoute, GetStaticPaths } from 'astro';
import { chaptersOrdered } from '../../data/chapters';
import { chapterDocs } from '../../lib/llms-corpus';
import { chapterPath, markdownDocument, markdownResponse } from '../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  chaptersOrdered.map((chapter) => ({ params: { slug: chapter.slug } }));

export const GET: APIRoute = async ({ params }) => {
  const doc = (await chapterDocs()).find((d) => d.path === chapterPath({ slug: params.slug ?? '' }));
  if (!doc) throw new Error(`no chapter for /bok/${params.slug}.md`);
  return markdownResponse(markdownDocument(doc, doc.body));
};
