// /resources/frontier-safety-crosswalk.json: the frontier safety frameworks
// crosswalk as JSON (schema 1). The disclaimer travels in a top-level `notice`,
// with the BoK version, licence, as-of date and the version of each document,
// so a copy of the file still says what was mapped and that it is coverage,
// not conformity. Same references as the page and the CSV (frontierExportRows).
import type { APIRoute } from 'astro';
import {
  FRONTIER_CROSSWALK_AS_OF,
  FRONTIER_CROSSWALK_PATH,
  frontierCrosswalkPayload,
  frontierCrosswalkSchemaVersion,
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
    ...frontierCrosswalkPayload(),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
