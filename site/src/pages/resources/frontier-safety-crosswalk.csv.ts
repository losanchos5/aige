// /resources/frontier-safety-crosswalk.csv: one row per reference of the
// frontier safety frameworks crosswalk, after a first row carrying the notice
// (coverage, not conformity; schema and as-of date). Same rows as the JSON.
import type { APIRoute } from 'astro';
import { frontierExportRows, frontierNotice } from '../../data/frontier-crosswalk';
import { site } from '../../data/site';
import { csvRow } from '../../lib/csv';

export const GET: APIRoute = () => {
  const header = [
    'Dimension',
    'Framework',
    'Reference',
    'Title',
    'Strength',
    'Verified',
    'Quote',
    'Note',
    'Source URL',
    'Dimension ID',
    'Framework ID',
    'Column',
  ];
  const lines = [
    csvRow([frontierNotice(site.bokVersion)]),
    csvRow(header),
    ...frontierExportRows().map((r) =>
      csvRow([
        r.dimensionName,
        r.frameworkName,
        r.reference,
        r.title,
        r.strength,
        r.verified ? 'yes' : 'no',
        r.quote ?? '',
        r.note ?? '',
        r.url ?? '',
        r.dimension,
        r.framework,
        r.column,
      ]),
    ),
  ];
  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="aige-frontier-safety-crosswalk.csv"',
    },
  });
};
