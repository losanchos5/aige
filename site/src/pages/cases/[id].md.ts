// /cases/<id>.md: the Markdown alternate of an incident case, with the same
// sections and numbered sources as the page, under the header of lib/llms.ts.
import type { APIRoute, GetStaticPaths } from 'astro';
import { cases, type IncidentCase } from '../../data/cases';
import { caseDoc } from '../../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  cases.map((entry) => ({ params: { id: entry.id }, props: { entry } }));

export const GET: APIRoute = ({ props }) => {
  const doc = caseDoc((props as { entry: IncidentCase }).entry);
  return markdownResponse(markdownDocument(doc, doc.body));
};
