// /glossary/<slug>.md: the Markdown alternate of a glossary term page: the
// definition with its numbered sources, the chapters that develop it and the
// terms it is contrasted with, under the header of lib/llms.ts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getGlossary, type GlossaryEntry } from '../../lib/glossary';
import { glossaryDoc } from '../../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  getGlossary().map((entry) => ({ params: { slug: entry.slug }, props: { entry } }));

export const GET: APIRoute = ({ props }) => {
  const doc = glossaryDoc((props as { entry: GlossaryEntry }).entry);
  return markdownResponse(markdownDocument(doc, doc.body));
};
