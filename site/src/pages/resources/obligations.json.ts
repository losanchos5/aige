// /resources/obligations.json: a static endpoint that exports the obligation
// register (the same `obligations` array the frameworks page renders) as JSON.
// The disclaimer travels in a top-level `notice` field, alongside the BoK
// version, licence and source URL, so it cannot be stripped in transit.
//
// Schema version 2 (v0.5.0): every row gains a stable `id`, its page `url`,
// `clause`, `requirement`, `appliesStatus`, `milestones`, `systemClass`,
// `patterns`, `reviewed` and more; `appliesFrom` is now an ISO date (or null)
// and the former free text moved to `appliesNote`. The record is the one the
// API publishes at /api/v1/obligations.json (src/lib/api.ts), and it validates
// against /api/v1/schemas/obligations.json. Pagefind indexes HTML only, so this
// endpoint is not searched; check-links only verifies the file exists behind
// the download link.
import type { APIRoute } from 'astro';
import { obligations } from '../../data/frameworks';
import { site } from '../../data/site';
import { NOTICE, obligationRecord, schemaUrl, jsonResponse } from '../../lib/api';

export const GET: APIRoute = () =>
  jsonResponse({
    notice: NOTICE,
    version: site.bokVersion,
    license: site.license,
    licenseUrl: site.licenseUrl,
    schemaVersion: 2,
    schema: schemaUrl('obligations'),
    self: `${site.url}/resources/obligations.json`,
    source: `${site.url}/resources/frameworks`,
    // Identifies the parent archived work, not a separate dataset deposit.
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    obligations: obligations.map(obligationRecord),
  });
