// /resources/threats.csv: the threat bridge (src/data/threats.ts) as CSV, one
// row per external threat id, built from the same records the API serves
// (/api/v1/threats.json), so the two cannot disagree. The first row carries
// the notice as a single field, so it cannot be stripped in transit; a header
// row follows. Multi-valued cells are separated by " | ". RFC 4180 escaping.
import type { APIRoute } from 'astro';
import { csvRow } from '../../lib/csv';
import { NOTICE, datasetByName } from '../../lib/api';

type Named = { id?: string; slug?: string; title?: string; name?: string; tool?: string; check?: string };

const join = (items: readonly Named[], pick: (item: Named) => string) => items.map(pick).join(' | ');

export const GET: APIRoute = () => {
  const dataset = datasetByName('threats');
  if (!dataset) throw new Error('threats.csv: the threats dataset is missing from src/lib/api.ts');
  const { threats, asOf } = dataset.build() as {
    asOf: string;
    threats: Array<Record<string, unknown> & {
      patterns: Named[];
      evals: Named[];
      obligations: Named[];
      iso42001: Named[];
      aicmDomains: Named[];
      ssdfTasks: Named[];
      cosaisUseCases: Named[];
      atlasMitigations: Named[];
      related: string[];
      layers: number[];
    }>;
  };

  const header = [
    'Catalogue',
    'External id',
    'Name',
    'Formerly',
    'Summary',
    'Control',
    'Patterns',
    'Example evals',
    'Obligation ids',
    'ISO/IEC 42001 Annex A',
    'CSA AICM domains',
    'NIST SP 800-218A tasks',
    'NIST COSAiS use cases',
    'ATLAS mitigations',
    'Related rows',
    'Layers',
    'Source entry',
    'Page',
    'Checked',
  ];

  const lines = [
    csvRow([NOTICE]),
    csvRow(header),
    ...threats.map((row) =>
      csvRow([
        String(row.taxonomy),
        String(row.externalId),
        String(row.name),
        row.formerly ? String(row.formerly) : '',
        String(row.summary),
        String(row.control),
        join(row.patterns, (p) => p.slug ?? ''),
        join(row.evals, (e) => `${e.tool}: ${e.check}`),
        join(row.obligations, (o) => o.id ?? ''),
        join(row.iso42001, (c) => c.id ?? ''),
        join(row.aicmDomains, (c) => c.id ?? ''),
        join(row.ssdfTasks, (c) => c.id ?? ''),
        join(row.cosaisUseCases, (c) => c.id ?? ''),
        join(row.atlasMitigations, (c) => c.id ?? ''),
        row.related.join(' | '),
        row.layers.join(' '),
        String(row.url),
        String(row.page),
        asOf,
      ]),
    ),
  ];

  return new Response(`${lines.join('\r\n')}\r\n`, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="aige-threats.csv"',
    },
  });
};
