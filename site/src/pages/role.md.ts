// /role.md: the Markdown alternate of the role landing, "What an AI Governance
// Engineer does" (pages/role.astro, data/role.ts), under the header of
// lib/llms.ts. Seo.astro links it from /role.
import type { APIRoute } from 'astro';
import { roleDoc } from '../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../lib/llms';

export const GET: APIRoute = () => {
  const doc = roleDoc();
  return markdownResponse(markdownDocument(doc, doc.body));
};
