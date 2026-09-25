// /ai-governance.md: the Markdown alternate of the pillar page, "What is AI
// governance?" (guides/ai-governance.md), under the header of lib/llms.ts.
// Seo.astro links it from /ai-governance.
import type { APIRoute } from 'astro';
import { pillarDoc } from '../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../lib/llms';

export const GET: APIRoute = () => {
  const doc = pillarDoc();
  return markdownResponse(markdownDocument(doc, doc.body));
};
