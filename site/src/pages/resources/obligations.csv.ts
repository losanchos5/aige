// /resources/obligations.csv — a static endpoint that exports the obligation
// index (the same `obligations` array the frameworks page renders) as CSV. The
// first row carries the disclaimer (with the BoK version from site.ts) as a
// single field, so it cannot be stripped in transit; a header row and one row
// per obligation follow. Fields are RFC 4180-escaped. Pagefind indexes HTML
// only, so this endpoint is not searched; check-links only verifies the file
// exists behind the download link.
import type { APIRoute } from 'astro';
import { obligations } from '../../data/frameworks';
import { site } from '../../data/site';
import { csvRow } from '../../lib/csv';

export const GET: APIRoute = () => {
  const notice = `Illustrative mapping from the AI Governance Engineer Body of Knowledge v${site.bokVersion} (not a claim of conformity)`;

  const header = [
    'Framework',
    'Obligation',
    'Artefact',
    'Layers',
    'Duty holder',
    'Applies from',
    'Chapter',
  ];

  const lines = [
    csvRow([notice]),
    csvRow(header),
    ...obligations.map((row) =>
      csvRow([
        row.framework,
        row.obligation,
        row.artefact,
        row.layerN.join(' '),
        row.dutyHolder ?? '',
        row.applies ?? '',
        `${site.url}/bok/regulatory-map#${row.anchor}`,
      ]),
    ),
  ];

  const csv = `${lines.join('\r\n')}\r\n`;

  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="aige-obligations.csv"',
    },
  });
};
