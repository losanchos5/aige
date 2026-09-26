// glossary-links.ts: what a glossary term page carries beyond its paragraph in
// bok/09-glossary.md, for the few terms that need it. The chapter's one-paragraph
// format has no room for these, and they are page furniture, not definition:
//
//   sameAs         the same concept in an open knowledge base (schema.org
//                  `sameAs` on the DefinedTerm), each identifier checked by hand;
//   alternateName  other names the term goes by (DefinedTerm `alternateName`);
//   tools          the toolkit pages and templates that put the term to work,
//                  shown as a "Put it to work" line on the term page;
//   open           where the term is at work in the open reference project (the
//                  control profiles and the frontier route), shown as an "In
//                  the open reference" line after "Put it to work".
//
// Read by src/pages/glossary/[slug].astro and, for the head term, by
// src/pages/ai-governance.astro, so the one DefinedTerm node both pages state
// says the same thing. A slug that is not a glossary term fails the build.

export interface TermLink {
  label: string;
  href: string;
}

export interface TermExtras {
  sameAs?: readonly string[];
  alternateName?: readonly string[];
  tools?: readonly TermLink[];
  open?: readonly TermLink[];
}

// The open-reference links shared by several terms (block orp-crosslinks).
const EVAL_PROFILE: TermLink = {
  label: 'Evaluation environment control profile',
  href: '/controls/evaluation-environment',
};
const RUNTIME_PROFILE: TermLink = {
  label: 'Agent runtime control profile',
  href: '/controls/agent-runtime',
};
const FRONTIER_RUNTIME: TermLink = {
  label: 'Runtime safeguards for frontier AI',
  href: '/frontier#runtime-safeguards',
};

export const glossaryLinks: Readonly<Record<string, TermExtras>> = {
  // Wikidata Q130610796, "governance of artificial intelligence" (alias "AI
  // governance"), whose English Wikipedia sitelink is "AI governance"; checked
  // 2026-09-26 (audit 2026-09-26 GEO S1).
  'ai-governance': {
    sameAs: [
      'https://www.wikidata.org/wiki/Q130610796',
      'https://en.wikipedia.org/wiki/AI_governance',
    ],
  },
  // "AI impact assessment (AIIA)" is how ISO/IEC 42005 assessments are named in
  // bok/patterns/fria-as-code.md and sources/SOURCES.md (audit 2026-09-26 SXO-N-03).
  'ai-system-impact-assessment': {
    alternateName: ['AI impact assessment', 'AIIA'],
    tools: [
      { label: 'AI impact assessment builder', href: '/toolkit/impact-assessment' },
      {
        label: 'Impact assessment template and schema',
        href: '/resources/templates#schema-impact-assessment',
      },
    ],
  },
  // Open reference project (block orp-crosslinks, 2026-09-26): the control
  // profiles and the frontier route where the term is put to work.
  'eval-gate': { open: [EVAL_PROFILE] },
  'evals-as-evidence': { open: [EVAL_PROFILE] },
  'kill-switch': { open: [FRONTIER_RUNTIME, RUNTIME_PROFILE] },
  'workload-identity': { open: [FRONTIER_RUNTIME, RUNTIME_PROFILE] },
  'machine-readable-evidence': {
    open: [{ label: 'Assurance evidence for frontier AI', href: '/frontier#assurance' }],
  },
  'policy-card': { open: [{ label: 'Open control profiles', href: '/controls' }] },
  'agent-registry': {
    open: [
      { label: 'Frontier labs and evaluators', href: '/frontier#who' },
      { label: 'The agent registry in chapter 23', href: '/bok/governing-agents#the-agent-registry' },
    ],
  },
};
