// controls/page-meta.ts: the <title> (bare, without the site suffix) and meta
// description of each open control profile page. Kept apart from
// ../../lib/controls-md.ts, which re-exports it, because this module imports no
// JSON: Playwright specs import it directly (tests/controls-pages.spec.ts).
// A new profile needs its entry here; profilePageMeta throws until it has one.

/** The <title> (bare, without the site suffix) and meta description of each profile page. */
export interface ProfilePageMeta {
  seoTitle: string;
  description: string;
}

// The titles are the ones tests/seo-titles.spec.ts HUBS and /llms.txt expect;
// the descriptions stay inside the 110-158 character window of the SEO gates.
export const PAGE_META: Readonly<Record<string, ProfilePageMeta>> = {
  'evaluation-environment': {
    seoTitle: 'AI evaluation environment controls',
    description:
      'An open control profile for AI evaluation environments: isolation, tool access, telemetry and evidence requirements. Draft v0.2.',
  },
  'agent-runtime': {
    seoTitle: 'AI agent runtime controls',
    description:
      'An open control profile for AI agents at runtime: identity, tool mediation, execution limits, stop conditions and telemetry. Draft v0.1, from chapter 23.',
  },
  'data-admission-and-privacy': {
    seoTitle: 'AI data governance controls',
    description:
      'An open control profile for AI training data: dataset admission, rights ledger, lawful basis, purpose limits, special categories and lineage. Draft v0.1.',
  },
  'assurance-and-evidence': {
    seoTitle: 'AI assurance and evidence controls',
    description:
      'An open control profile for AI assurance: eval gates, test plans and reports, signed evidence records, OSCAL, model integrity and AIBOM. Draft v0.1.',
  },
  'deployment-and-monitoring': {
    seoTitle: 'AI deployment monitoring controls',
    description:
      'An open control profile for AI systems in use: deployment decision, staged rollout, monitoring, incident clocks, deactivation and retirement. Draft v0.1.',
  },
};

/** The page metadata of a profile; throws for a profile with none, so a new profile fails the build until it has its own. */
export function profilePageMeta(slug: string): ProfilePageMeta {
  const meta = PAGE_META[slug];
  if (!meta) throw new Error(`controls-md: no page title and description for profile ${slug}`);
  if (meta.description.length < 110 || meta.description.length > 158) {
    throw new Error(`controls-md: description of ${slug} is ${meta.description.length} characters (110-158)`);
  }
  return meta;
}
