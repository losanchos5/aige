// /resources/crosswalk.json — a static endpoint that exports the topic ×
// framework crosswalk as JSON. The disclaimer travels in a top-level `notice`
// field, alongside the BoK version, licence and source URL, so it cannot be
// stripped in transit. Pagefind indexes HTML only, so this endpoint is not
// searched; check-links only verifies the file exists behind the download link.
import type { APIRoute } from 'astro';
import { topics, refs, chipLabel } from '../../data/crosswalk';
import { site } from '../../data/site';
import { slugify } from '../../lib/md-parse';

export const GET: APIRoute = () => {
  const notice = `Illustrative mapping from the AI Governance Engineer Body of Knowledge v${site.bokVersion} — not a claim of conformity`;

  // `reference` is the clause id within its framework; `label` is the display chip.
  const payload = {
    notice,
    version: site.bokVersion,
    license: site.license,
    source: `${site.url}/resources/crosswalk`,
    // Identifies the parent archived work, not a separate dataset deposit.
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    topics: topics.map((t) => ({
      id: t.id,
      name: t.name,
      summary: t.summary,
      layers: t.layerN ?? null,
    })),
    references: refs.map((r) => ({
      topic: r.topic,
      framework: r.framework,
      reference: r.ref,
      label: chipLabel(r),
      title: r.title,
      strength: r.strength,
      verified: r.verified !== false,
      note: r.note ?? null,
      url: r.url ?? null,
      obligation: r.obligation ?? null,
      chapter: r.obligation
        ? `${site.url}/resources/frameworks#ob-${slugify(r.obligation)}`
        : null,
    })),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
