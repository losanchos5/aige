// /resources/frontier-framework-changes.csv: one row per recorded change, after
// a first row carrying the notice (published documents, not any lab's conduct;
// schema, as-of date, licence and citation). Same records as the JSON.
import type { APIRoute } from 'astro';
import { frontierChangeExportRows, frontierChangesNotice } from '../../data/frontier-changes';
import { site } from '../../data/site';
import { csvRow } from '../../lib/csv';

export const GET: APIRoute = () => {
  const header = [
    'Change ID',
    'Framework',
    'Transition ID',
    'From',
    'To',
    'Kind',
    'Section',
    'Summary',
    'Before quote',
    'Before URL',
    'After quote',
    'After URL',
    'Moved to',
    'Dimensions',
    'Disclosure',
    'Verified',
    'Framework ID',
  ];
  const lines = [
    csvRow([
      `${frontierChangesNotice(site.bokVersion)}; licence ${site.license}; cite ${site.authors.join(', ')}, AI Governance Engineering: The Thesis & Body of Knowledge, https://doi.org/${site.conceptDoi}`,
    ]),
    csvRow(header),
    ...frontierChangeExportRows().map((r) =>
      csvRow([
        r.id,
        r.frameworkName,
        r.transition,
        r.from,
        r.to,
        r.kind,
        r.section,
        r.summary,
        r.beforeQuote ?? '',
        r.beforeUrl ?? '',
        r.afterQuote ?? '',
        r.afterUrl ?? '',
        r.movedTo ?? '',
        r.dimensions.join(' '),
        r.disclosure,
        r.verified,
        r.framework,
      ]),
    ),
  ];
  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="aige-frontier-framework-changes.csv"',
    },
  });
};
