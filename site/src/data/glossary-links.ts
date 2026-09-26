// glossary-links.ts: what a glossary term page carries beyond its paragraph in
// bok/09-glossary.md, for the few terms that need it. The chapter's one-paragraph
// format has no room for these, and they are page furniture, not definition:
//
//   sameAs         the same concept in an open knowledge base (schema.org
//                  `sameAs` on the DefinedTerm), each identifier checked by hand;
//   alternateName  other names the term goes by (DefinedTerm `alternateName`);
//   tools          the toolkit pages and templates that put the term to work,
//                  shown as a "Put it to work" line on the term page.
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
}

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
};
