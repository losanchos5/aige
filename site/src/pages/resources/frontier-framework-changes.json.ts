// /resources/frontier-framework-changes.json: the version history of the
// frontier safety frameworks and the changes between versions, as JSON
// (schema 1). The notice travels in the file, with the BoK version, licence and
// as-of date, so a copy still says it describes published documents and not any
// lab's conduct. Same records as the page and the CSV.
import type { APIRoute } from 'astro';
import {
  FRONTIER_CHANGES_AS_OF,
  FRONTIER_CHANGES_PATH,
  frontierChangesNotice,
  frontierChangesPayload,
  frontierChangesSchemaVersion,
} from '../../data/frontier-changes';
import { site } from '../../data/site';

export const GET: APIRoute = () => {
  const payload = {
    schemaVersion: frontierChangesSchemaVersion,
    notice: frontierChangesNotice(site.bokVersion),
    version: site.bokVersion,
    asOf: FRONTIER_CHANGES_AS_OF,
    license: site.license,
    source: `${site.url}${FRONTIER_CHANGES_PATH}`,
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    ...frontierChangesPayload(),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
