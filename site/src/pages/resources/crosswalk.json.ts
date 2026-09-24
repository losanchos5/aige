// /resources/crosswalk.json: a static endpoint that exports the topic ×
// framework crosswalk as JSON. The disclaimer travels in a top-level `notice`
// field, alongside the BoK version, licence and source URL, so it cannot be
// stripped in transit. Pagefind indexes HTML only, so this endpoint is not
// searched; check-links only verifies the file exists behind the download link.
//
// Schema version 2 (BoK v0.5.0) keeps every v1 field and adds `schemaVersion`,
// `asOf`, the `columns` and `frameworks` the references point into, each
// topic's Body-of-Knowledge sections, and per reference its `clauseId` (the
// OSCAL id-ref the explorer exports), its `column`, the framework's short name
// and the BoK section that uses it (`see`). public/crosswalk-explorer.js reads
// this file at run time, so its shape is also the explorer's contract.
import type { APIRoute } from 'astro';
import {
  topics,
  columns,
  refs,
  chipLabel,
  chipPrefix,
  clauseId,
  columnOf,
  crosswalkFrameworks,
  frameworkById,
  crosswalkAsOf,
  crosswalkSchemaVersion,
} from '../../data/crosswalk';
import { site } from '../../data/site';
import { slugify } from '../../lib/md-parse';

export const GET: APIRoute = () => {
  const notice = `Illustrative mapping from the AI Governance Engineer Body of Knowledge v${site.bokVersion} (not a claim of conformity)`;
  const abs = (href: string): string => new URL(href, site.url).href;

  // `reference` is the clause id within its framework; `label` is the display chip.
  const payload = {
    schemaVersion: crosswalkSchemaVersion,
    notice,
    version: site.bokVersion,
    asOf: crosswalkAsOf,
    license: site.license,
    source: `${site.url}/resources/crosswalk`,
    // Identifies the parent archived work, not a separate dataset deposit.
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    columns: columns.map((c) => ({
      id: c.id,
      label: c.label,
      group: c.group,
      defaultVisible: c.defaultVisible === true,
      frameworks: c.frameworks,
    })),
    frameworks: crosswalkFrameworks().map((f) => ({
      id: f.id,
      name: f.name,
      short: f.short,
      type: f.type,
      issuer: f.issuer,
      url: f.url ?? null,
      column: columnOf(f.id)?.id ?? null,
      chipPrefix: chipPrefix[f.id] ?? '',
    })),
    topics: topics.map((t) => ({
      id: t.id,
      name: t.name,
      summary: t.summary,
      layers: t.layerN ?? null,
      read: (t.read ?? []).map((r) => ({ label: r.label, url: abs(r.href) })),
    })),
    references: refs.map((r) => ({
      topic: r.topic,
      framework: r.framework,
      frameworkShort: frameworkById(r.framework)?.short ?? r.framework,
      column: columnOf(r.framework)?.id ?? null,
      reference: r.ref,
      clauseId: clauseId(r),
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
      see: r.see ? abs(r.see) : null,
    })),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
