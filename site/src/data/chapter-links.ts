// chapter-links.ts: the links from a Body of Knowledge chapter to the open
// reference project (the control profiles, the frontier route and the incident
// method on /cases). They are page furniture, not chapter prose: the chapter
// template (src/pages/bok/[slug].astro) renders them after the chapter, in a
// "Related in the open reference" section (id `related-open-reference`, out of
// the Pagefind index, added to the on-this-page TOC), so no bok/*.md file is
// edited and no chapter's sitemap date moves. Keys are chapter slugs
// (src/data/chapters.ts); a key that is not a chapter, or a href that is not a
// site path, fails the build through chapterLinkProblems(). check-links then
// resolves every path and fragment in the built site.
//
// The module is deliberately not listed for the chapters in astro.config.ts
// SOURCE_BY_PATH: chapters are dated by their Markdown alone.
import { chaptersOrdered } from './chapters';

export interface ChapterLink {
  /** Link text: names the page or section it opens. */
  label: string;
  /** Site path, with a fragment where it opens a section. */
  href: string;
  /** One clause on what the reader finds there. */
  note: string;
}

export const chapterLinks: Readonly<Record<string, readonly ChapterLink[]>> = {
  'the-stack': [
    {
      label: 'Open control profiles',
      href: '/controls',
      note: 'draft reference controls anchored to these five layers, each with the evidence it must leave',
    },
  ],
  'maturity-model': [
    {
      label: 'Adopting a control profile',
      href: '/controls#adoption',
      note: 'how a team adopts a profile step by step, starting from the layer it already runs',
    },
  ],
  'governing-development': [
    {
      label: 'Evaluation environment control profile',
      href: '/controls/evaluation-environment',
      note: 'draft controls for the environment an evaluation runs in, so its result can count as evidence',
    },
  ],
  incidents: [
    {
      label: 'From incident to control',
      href: '/cases#from-incident-to-control',
      note: 'the method that turns an incident into a control requirement and the evidence it asks for',
    },
  ],
  'governing-agents': [
    {
      label: 'Frontier labs and evaluators',
      href: '/frontier',
      note: 'evaluation environments, runtime safeguards and assurance evidence for frontier AI teams',
    },
    {
      label: 'Agent runtime control profile',
      href: '/controls/agent-runtime',
      note: 'the agent controls of this chapter as draft reference controls, open for technical review',
    },
  ],
};

/** The open-reference links of a chapter, empty when it has none. */
export function chapterLinksFor(slug: string): readonly ChapterLink[] {
  return chapterLinks[slug] ?? [];
}

const EM_DASH = String.fromCharCode(0x2014);

/** Every key that is not a chapter and every link that is malformed; empty when all hold. */
export function chapterLinkProblems(): string[] {
  const problems: string[] = [];
  const slugs = new Set(chaptersOrdered.map((c) => c.slug));
  for (const [slug, links] of Object.entries(chapterLinks)) {
    if (!slugs.has(slug)) problems.push(`chapter-links: "${slug}" is not a chapter slug`);
    if (links.length === 0) problems.push(`chapter-links: "${slug}" has no links`);
    const seen = new Set<string>();
    for (const link of links) {
      const at = `chapter-links: ${slug} -> ${link.href}`;
      if (!/^\/[a-z0-9/-]*(?:#[a-z0-9-]+)?$/.test(link.href)) problems.push(`${at}: not a site path`);
      // A chapter is linked by section, never by its bare path (spec bok-cross-links).
      if (/^\/bok\/[a-z0-9-]+$/.test(link.href)) problems.push(`${at}: bare chapter link, add a section anchor`);
      if (seen.has(link.href)) problems.push(`${at}: listed twice`);
      seen.add(link.href);
      if (!link.label.trim() || !link.note.trim()) problems.push(`${at}: empty label or note`);
      if (`${link.label}${link.note}`.includes(EM_DASH)) problems.push(`${at}: em dash`);
    }
  }
  return problems;
}
