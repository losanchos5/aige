// /thesis.md: the Markdown alternate of the Thesis (THESIS.md) under the
// header of lib/llms.ts. Seo.astro links it from /thesis.
import type { APIRoute } from 'astro';
import { thesisDoc } from '../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../lib/llms';

export const GET: APIRoute = async () => {
  const doc = await thesisDoc();
  return markdownResponse(markdownDocument(doc, doc.body));
};
