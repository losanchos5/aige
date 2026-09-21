// /resources/obligations.json — a static endpoint that exports the obligation
// index (the same `obligations` array the frameworks page renders) as JSON. The
// disclaimer travels in a top-level `notice` field, alongside the BoK version,
// licence and source URL, so it cannot be stripped in transit. Pagefind indexes
// HTML only, so this endpoint is not searched; check-links only verifies the
// file exists behind the download link.
import type { APIRoute } from 'astro';
import { obligations } from '../../data/frameworks';
import { site } from '../../data/site';

export const GET: APIRoute = () => {
  const notice = `Illustrative mapping from the AI Governance Engineer Body of Knowledge v${site.bokVersion} — not a claim of conformity`;

  const payload = {
    notice,
    version: site.bokVersion,
    license: site.license,
    source: `${site.url}/resources/frameworks`,
    // Identifies the parent archived work, not a separate dataset deposit.
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    obligations: obligations.map((row) => ({
      framework: row.framework,
      obligation: row.obligation,
      artefact: row.artefact,
      layers: row.layerN,
      dutyHolder: row.dutyHolder ?? null,
      appliesFrom: row.applies ?? null,
      chapter: `${site.url}/bok/regulatory-map#${row.anchor}`,
    })),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
