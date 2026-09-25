// /resources/obligations.csv: a static endpoint that exports the obligation
// register (the same `obligations` array the frameworks page renders) as CSV.
// The first row carries the disclaimer (with the BoK version from site.ts) as a
// single field, so it cannot be stripped in transit; a header row and one row
// per obligation follow. Fields are RFC 4180-escaped.
//
// Schema version 2 (v0.5.0): the first seven columns keep their names and
// positions, so positional readers keep working, but "Applies from" is now an
// ISO date (empty for voluntary instruments without one) and the former free
// text moved to "Applies note". The new columns are appended after "Chapter".
// Multi-valued cells (layers, system classes, patterns) are space-separated;
// milestones are "date: note" pairs separated by " | ". Pagefind indexes HTML
// only, so this endpoint is not searched; check-links only verifies the file
// exists behind the download link.
import type { APIRoute } from 'astro';
import { obligations } from '../../data/frameworks';
import { csvRow } from '../../lib/csv';
import { NOTICE, obligationRecord } from '../../lib/api';

export const GET: APIRoute = () => {
  const header = [
    'Framework',
    'Obligation',
    'Artefact',
    'Layers',
    'Duty holder',
    'Applies from',
    'Chapter',
    'ID',
    'Clause',
    'Requirement',
    'Applies status',
    'Applies note',
    'Milestones',
    'System class',
    'Patterns',
    'Authority',
    'Scope',
    'Reviewed',
    'URL',
    'Schema version',
  ];

  const lines = [
    csvRow([NOTICE]),
    csvRow(header),
    ...obligations.map((row) => {
      const record = obligationRecord(row);
      return csvRow([
        record.framework,
        record.obligation,
        record.artefact,
        record.layers.join(' '),
        record.dutyHolder ?? '',
        record.appliesFrom ?? '',
        record.chapter,
        record.id,
        record.clause,
        record.requirement,
        record.appliesStatus,
        record.appliesNote ?? '',
        record.milestones.map((m) => `${m.date}: ${m.note}`).join(' | '),
        record.systemClass.join(' '),
        record.patterns.map((p) => p.id).join(' '),
        record.authority ?? '',
        record.scope ?? '',
        record.reviewed,
        record.url,
        '2',
      ]);
    }),
  ];

  const csv = `${lines.join('\r\n')}\r\n`;

  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="aige-obligations.csv"',
    },
  });
};
