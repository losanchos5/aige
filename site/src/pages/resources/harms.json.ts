// /resources/harms.json: a static endpoint that exports the AI harms atlas as
// JSON. The notice, the licence and the MIT AI Risk Repository attribution
// travel in top-level fields so they cannot be stripped in transit (the MIT
// taxonomy is CC BY 4.0 and requires attribution). Pagefind indexes HTML only,
// so this endpoint is not searched.
import type { APIRoute } from 'astro';
import {
  harms,
  harmSources,
  mitAttribution,
  mitDomainOf,
  mitSubdomains,
} from '../../data/harms';
import { casesForHarm } from '../../data/cases';
import { site } from '../../data/site';
import { sourceText } from '../../lib/sources';

export const GET: APIRoute = () => {
  const payload = {
    notice: `AI harms atlas from the AI Governance Engineer Body of Knowledge v${site.bokVersion}. Illustrative mapping, not a claim of conformity; incident records are the databases' own accounts.`,
    version: site.bokVersion,
    license: site.license,
    source: `${site.url}/resources/harms`,
    attribution: mitAttribution,
    citation: {
      title: 'AI Governance Engineering: The Thesis & Body of Knowledge',
      authors: site.authors,
      parentDoi: `https://doi.org/${site.doi}`,
      conceptDoi: `https://doi.org/${site.conceptDoi}`,
    },
    harms: harms.map((harm) => ({
      id: harm.id,
      url: `${site.url}/resources/harms#harm-${harm.id}`,
      level: harm.level,
      harmType: harm.harmType,
      mechanism: harm.mechanism,
      description: harm.description,
      failureMode: harm.failureMode,
      controllingPattern: {
        name: harm.controllingPattern.name,
        url: harm.controllingPattern.patternId
          ? `${site.url}/bok/patterns#${harm.controllingPattern.patternId}`
          : null,
      },
      evidence: harm.evidence,
      layerN: harm.layerN,
      mitTaxonomy: harm.mitTaxonomy.map((code) => ({
        code,
        subdomain: mitSubdomains[code],
        domain: mitDomainOf(code),
      })),
      exampleIncidents: harm.exampleIncidents,
      cases: casesForHarm(harm.id).map((c) => `${site.url}/cases/${c.id}`),
      sources: harm.sources,
    })),
    sources: harmSources.map((source, i) => ({
      n: i + 1,
      text: sourceText(source),
      url: source.url,
      verified: source.verified,
    })),
  };

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
