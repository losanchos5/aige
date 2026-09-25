// /resources/crosswalk/<pair>.md: the Markdown alternate of a framework
// comparison ("ISO 42001 vs EU AI Act"), with the same tables, answers and
// sources as the page, under the header of lib/llms.ts. Seo.astro links it from
// the page (lib/llms.ts markdownAlternateFor).
import type { APIRoute, GetStaticPaths } from 'astro';
import { comparisons, type ComparisonDef } from '../../../data/comparisons';
import { comparisonDoc } from '../../../lib/llms-corpus';
import { markdownDocument, markdownResponse } from '../../../lib/llms';

export const getStaticPaths: GetStaticPaths = () =>
  comparisons.map((def) => ({ params: { slug: def.slug }, props: { def } }));

export const GET: APIRoute = ({ props }) => {
  const doc = comparisonDoc((props as { def: ComparisonDef }).def);
  return markdownResponse(markdownDocument(doc, doc.body));
};
