// /resources/frontier-safety-crosswalk.json: the frontier safety frameworks
// crosswalk as JSON (schema 1). The disclaimer travels in a top-level `notice`,
// with the BoK version, licence, as-of date and the version of each document,
// so a copy of the file still says what was mapped and that it is coverage,
// not conformity. Same references as the page and the CSV (frontierExportRows).
import type { APIRoute } from 'astro';
import {
  FRONTIER_CROSSWALK_AS_OF,
  FRONTIER_CROSSWALK_PATH,
  dimensions,
  frontierColumns,
  frontierCrosswalkSchemaVersion,
  frontierCrosswalkSources,
  frontierDocs,
  frontierExportRows,
  frontierGaps,
  frontierNotice,
} from '../../data/frontier-crosswalk';
import { site } from '../../data/site';

export const GET: APIRoute = () => {
  const payload = {
    schemaVersion: frontierCrosswalkSchemaVersion,
    notice: frontierNotice(site.bokVersion),
    version: site.bokVersion,
    asOf: FRONTIER_CROSSWALK_AS_OF,
    license: site.license,
    source: `${site.url}${FRONTIER_CROSSWALK_PATH}`,
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    documents: frontierDocs.map((d) => ({
      framework: d.frameworkId,
      name: d.name,
      short: d.short,
      issuer: d.issuer,
      version: d.version,
      effective: d.effective,
      url: d.url,
      pdfUrl: d.pdfUrl ?? null,
      companion: d.companion
        ? { name: d.companion.name, date: d.companion.date, url: d.companion.url, note: d.companion.note }
        : null,
    })),
    columns: frontierColumns.map((c) => ({ id: c.id, label: c.label, group: c.group, frameworks: c.frameworks })),
    dimensions: dimensions.map((d) => ({ id: d.id, name: d.name, question: d.question, summary: d.summary })),
    references: frontierExportRows(),
    gaps: frontierGaps.map((g) => ({ dimension: g.topic, framework: g.framework, note: g.note })),
    sources: frontierCrosswalkSources.map((s, i) => ({ n: i + 1, ...s })),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
