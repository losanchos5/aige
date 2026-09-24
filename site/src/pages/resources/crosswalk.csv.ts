// /resources/crosswalk.csv: a static endpoint that exports the topic ×
// framework crosswalk as CSV. The first row carries the disclaimer (with the BoK
// version from site.ts) as a single field, so it cannot be stripped in transit;
// a header row and one row per reference follow. Fields are RFC 4180-escaped
// (via the shared csv helper). Pagefind indexes HTML only, so this endpoint is
// not searched; check-links only verifies the file exists behind the download link.
//
// Schema version 2 (BoK v0.5.0) keeps the nine v1 columns in their order and
// appends the machine ids (topic, framework, column, clause) and the BoK section,
// so a v1 reader that addresses columns by position keeps working.
import type { APIRoute } from 'astro';
import {
  topics,
  refs,
  chipLabel,
  clauseId,
  columnOf,
  frameworkById,
  crosswalkAsOf,
  crosswalkSchemaVersion,
} from '../../data/crosswalk';
import { site } from '../../data/site';
import { csvRow } from '../../lib/csv';

export const GET: APIRoute = () => {
  const notice = `Illustrative mapping from the AI Governance Engineer Body of Knowledge v${site.bokVersion} (not a claim of conformity); crosswalk schema ${crosswalkSchemaVersion}, references checked as of ${crosswalkAsOf}`;

  const topicName = new Map(topics.map((t) => [t.id, t.name] as const));

  const header = [
    'Topic',
    'Framework',
    'Reference',
    'Title',
    'Strength',
    'Verified',
    'Note',
    'Source URL',
    'Obligation',
    'Topic ID',
    'Framework ID',
    'Column',
    'Clause ID',
    'BoK section',
  ];

  const lines = [
    csvRow([notice]),
    csvRow(header),
    ...refs.map((r) =>
      csvRow([
        topicName.get(r.topic) ?? r.topic,
        frameworkById(r.framework)?.name ?? r.framework,
        chipLabel(r),
        r.title,
        r.strength,
        r.verified === false ? 'no' : 'yes',
        r.note ?? '',
        r.url ?? '',
        r.obligation ?? '',
        r.topic,
        r.framework,
        columnOf(r.framework)?.id ?? '',
        clauseId(r),
        r.see ? new URL(r.see, site.url).href : '',
      ]),
    ),
  ];

  const csv = `${lines.join('\r\n')}\r\n`;

  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="aige-crosswalk.csv"',
    },
  });
};
