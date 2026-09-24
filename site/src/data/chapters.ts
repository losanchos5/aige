// Typed manifest of the eleven Body of Knowledge chapters.
// `id` is the collection entry id Astro's glob loader produces from each
// file name (github-slugger over the path segment, e.g. `00-preface.md`
// -> `00-preface`). Titles are the file H1; summaries are the opening
// blockquote, shortened to one complete sentence of <=160 chars (never cut
// mid-sentence with an ellipsis), faithful to the source.

export interface Chapter {
  /** Collection entry id (matches the glob loader id). */
  id: string;
  /** Zero-based reading order. */
  order: number;
  /** URL slug under /bok/. */
  slug: string;
  /** Full title, from the file H1. */
  title: string;
  /** Short label for navigation and cards. */
  shortTitle: string;
  /** One-line summary, <=160 chars, from the opening blockquote. */
  summary: string;
  /**
   * "At a glance": three or four one-sentence takeaways rendered as an opening
   * block under the chapter header, before the prose. Editorial, written for the
   * site from the chapter's own claims; omitted for the preface, glossary and
   * reading list.
   */
  glance?: readonly string[];
  /**
   * The stack layer (1–5) this chapter is about, when it is about exactly one.
   * Only then does the chapter header take that layer's colour; any other
   * chapter reads neutral, because a layer colour means that layer and nothing
   * else (audit SL-06). None of the eleven chapters is about a single layer —
   * The stack and Patterns span all five — so none sets it today.
   */
  layer?: 1 | 2 | 3 | 4 | 5;
  /**
   * The part of the book the chapter belongs to. It groups the index and the
   * navigation; the reading order stays the numeric `order`.
   */
  part: ChapterPart;
}

/** The five parts of the Body of Knowledge, in reading order. */
export const chapterParts = [
  { id: 'discipline', title: 'The discipline' },
  { id: 'reference', title: 'Reference' },
  { id: 'foundations', title: 'Foundations' },
  { id: 'lifecycle', title: 'The lifecycle' },
  { id: 'law', title: 'Law and standards' },
] as const;

export type ChapterPart = (typeof chapterParts)[number]['id'];

export const chapters: readonly Chapter[] = [
  {
    id: '00-preface',
    order: 0,
    part: 'discipline',
    slug: 'preface',
    title: '00. Preface',
    shortTitle: 'Preface',
    // The blockquote alone ("Why this book exists, who it is for, and how to use
    // it.") is too thin for a search snippet, so it is extended with the
    // chapter's own framing of what the book is. The visible lede is unaffected:
    // it still comes from the blockquote via remark-lead.
    summary:
      'Why this book exists, who it is for and how to use it: the first attempt to write down how to engineer the governance of AI systems.',
  },
  {
    id: '01-definition',
    order: 1,
    part: 'discipline',
    slug: 'definition',
    title: '01. The definition',
    shortTitle: 'Definition',
    summary:
      'AI governance engineering is the application of engineering practice (systems thinking, product thinking and code) to the governance of AI systems.',
    glance: [
      'Engineering practice (systems thinking, product thinking and code) applied to the governance of AI systems, agents included.',
      'A capability, not a job title: measured by realised risk reduction and audit-ready evidence.',
      'Three questions any function must answer from live systems: what AI is running, what it is allowed to do, what evidence proves it.',
      'The eval gate is necessary but not sufficient: it is point-in-time and sampling-bound.',
    ],
  },
  {
    id: '02-why-now',
    order: 2,
    part: 'discipline',
    slug: 'why-now',
    title: '02. Why now',
    shortTitle: 'Why Now',
    summary:
      'AI governance engineering is forming now: the thing being governed changed shape, the market renamed the role and the law began asking for engineered evidence.',
    glance: [
      'Five problems share one root: governance that describes instead of runs.',
      'The object changed shape: agents that browse, execute code and act under delegated authority are what legacy governance can least see.',
      'The market renamed the role before the profession named itself, and the law began asking for engineered evidence.',
      'Engineered governance turns the quarterly guess into a live query and the end-of-line gate into a control that fires where the system changes.',
    ],
  },
  {
    id: '03-values-principles',
    order: 3,
    part: 'discipline',
    slug: 'values-and-principles',
    title: '03. Values and principles',
    shortTitle: 'Values & Principles',
    summary:
      'The eight values and six principles of the Thesis, each expanded with what it means in practice and the anti-pattern it rejects.',
    glance: [
      'Eight values say which way to lean; six principles say what to do on Monday.',
      'A value is a preference stated as an affirmation; a principle is a commitment to act, with no vocabulary borrowed from the values.',
      'Evals that fail builds and agents that carry their own identity and scope are what AI forces us to add to established practice.',
      'Every value names the artefact it builds toward and the anti-pattern it rejects.',
    ],
  },
  {
    id: '04-the-stack',
    order: 4,
    part: 'discipline',
    slug: 'the-stack',
    title: '04. The stack (five layers)',
    shortTitle: 'The Stack',
    summary:
      'The reference architecture: five layers that answer the three questions, where evidence is produced at the bottom and proven at the top.',
    glance: [
      'Five layers in build order along one spine: Policy → Inventory → Evals → Runtime → Assurance.',
      'Each layer produces an artefact the layer above consumes; evidence flows up into audit-ready proof.',
      'The stack is not an org chart and not a maturity ladder.',
      'A team of one builds the spine thinly, end to end: one vertical slice beats one layer built out and four left on paper.',
    ],
  },
  {
    id: '05-patterns',
    order: 5,
    part: 'discipline',
    slug: 'patterns',
    title: '05. Patterns',
    shortTitle: 'Patterns',
    summary:
      'A catalogue of reusable AI governance engineering patterns, each named to a layer of the stack, in the CSIRO Responsible AI Pattern Catalogue structure.',
    glance: [
      'Seventeen reusable patterns, each named to one of the five stack layers.',
      'The CSIRO Responsible AI Pattern Catalogue structure (context, problem, solution, consequences) plus a Maps to line naming standards and articles.',
      'Every pattern realises one or more of the six principles and cites the OWASP agentic threats and NIST AI RMF functions it serves.',
      'Examples are illustrative sketches; EU AI Act mappings are not claims of conformity.',
    ],
  },
  {
    id: '06-the-role',
    order: 6,
    part: 'discipline',
    slug: 'the-role',
    title: '06. The role',
    shortTitle: 'The Role',
    summary:
      'The AI governance engineer as a concrete role, defined by the workflows it owns and the evidence it produces, not by the certifications on its holder.',
    glance: [
      'The person, on whatever org chart, accountable for the three questions in production.',
      'Defined by the workflows it owns (intake, registry, evals, gates, runtime, assurance, regulatory translation) and the evidence each produces.',
      'Analyst and engineer are both needed; the engineer does different work and is measured differently.',
      'A career ladder, three ways in, and what employers get wrong in the job description.',
    ],
  },
  {
    id: '07-maturity-model',
    order: 7,
    part: 'discipline',
    slug: 'maturity-model',
    title: '07. Maturity model (five levels)',
    shortTitle: 'Maturity Model',
    summary:
      'A ladder from paper to production (Documented, Inventoried, Tested, Enforced, Continuous), where each level is proven by what the running systems show.',
    glance: [
      'Five levels: Documented, Inventoried, Tested, Enforced, Continuous.',
      'A level is a state you demonstrate by querying the registry, running the gate and reading the evidence store, not a score you award yourself.',
      'Assessed across all five layers; you are at a level only when every layer has reached it.',
      'Observable criteria, metrics per level and a self-assessment checklist.',
    ],
  },
  {
    id: '08-regulatory-map',
    order: 8,
    part: 'reference',
    slug: 'regulatory-map',
    title: '08. Regulatory map (obligation → artefact → layer)',
    shortTitle: 'Regulatory Map',
    summary:
      'The reverse index of every "Maps to" line in the book: for each obligation, the engineering artefact that satisfies or supports it and its stack layer.',
    glance: [
      'The reverse index of every Maps to line: obligation → artefact → stack layer.',
      'Mappings are illustrative, not a claim of conformity; every EU AI Act date is the post-Omnibus date.',
      'The authority differs by regime: the AI Office for general-purpose AI, national market-surveillance authorities for high-risk systems.',
      "No harmonised standard is yet cited in the Official Journal, so Article 40's presumption of conformity is available to no one.",
    ],
  },
  {
    id: '09-glossary',
    order: 9,
    part: 'reference',
    slug: 'glossary',
    title: '09. Glossary',
    shortTitle: 'Glossary',
    summary:
      'The canonical definitions for the book: every term defined once, alphabetically, and cross-referenced to the chapter that treats it in full.',
  },
  {
    id: '10-reading-list',
    order: 10,
    part: 'reference',
    slug: 'reading-list',
    title: '10. Reading list',
    shortTitle: 'Reading List',
    summary:
      'The sources that formed the discipline, curated and annotated, each with a verified URL and a one-line note on why it matters.',
  },
  {
    id: '11-ai-defined',
    order: 11,
    part: 'foundations',
    slug: 'ai-defined',
    title: '11. AI, defined for governance',
    shortTitle: 'AI Defined',
    summary:
      'What an AI system is for governance purposes: the definitions that set scope, the kinds of AI and the traits that break classic governance.',
  },
  {
    id: '12-governance-program',
    order: 12,
    part: 'foundations',
    slug: 'governance-program',
    title: '12. Running the AI governance program',
    shortTitle: 'Governance Program',
    summary:
      'The organisation as an object of governance: roles, committee, policies across the lifecycle, literacy and reporting.',
  },
  {
    id: '13-risk-management',
    order: 13,
    part: 'foundations',
    slug: 'risk-management',
    title: '13. Where risk management sits',
    shortTitle: 'Risk Management',
    summary:
      'Risk management as an engineering loop: identify, assess, treat and monitor, projected on the five layers and seven workflows.',
  },
  {
    id: '14-governing-development',
    order: 14,
    part: 'lifecycle',
    slug: 'governing-development',
    title: '14. Governing AI development',
    shortTitle: 'Development',
    summary:
      'Governing the build: use case, design review, training and test data, testing and validation, release and the technical file.',
  },
  {
    id: '15-governing-deployment',
    order: 15,
    part: 'lifecycle',
    slug: 'governing-deployment',
    title: '15. Governing deployment and use',
    shortTitle: 'Deployment',
    summary:
      'Governing the run: choosing and deploying a system, contracts, go-live, operation, communication and retirement.',
  },
  {
    id: '16-fairness-explainability',
    order: 16,
    part: 'lifecycle',
    slug: 'fairness-and-explainability',
    title: '16. Fairness and explainability for practitioners',
    shortTitle: 'Fairness & XAI',
    summary:
      'How to measure fairness and produce explanations as evidence, and which legal hooks each technique answers.',
  },
  {
    id: '17-incidents',
    order: 17,
    part: 'lifecycle',
    slug: 'incidents',
    title: '17. Incidents, issues and root causes',
    shortTitle: 'Incidents',
    summary:
      'AI incidents from detection to root cause, with the reporting clocks that overlap across regimes.',
  },
  {
    id: '18-eu-ai-act',
    order: 18,
    part: 'law',
    slug: 'eu-ai-act',
    title: '18. The EU AI Act in one pass',
    shortTitle: 'EU AI Act',
    summary:
      'The EU AI Act explained end to end after the Digital Omnibus: scope, risk classes, roles, duties, enforcement.',
  },
  {
    id: '19-privacy-and-ai',
    order: 19,
    part: 'law',
    slug: 'privacy-and-ai',
    title: '19. Privacy and data protection law applied to AI',
    shortTitle: 'Privacy & AI',
    summary:
      'How data protection law binds AI training and inference, and the artefacts that evidence compliance.',
  },
  {
    id: '20-existing-law',
    order: 20,
    part: 'law',
    slug: 'existing-law',
    title: '20. Other law that already applies to AI',
    shortTitle: 'Existing Law',
    summary:
      'Intellectual property, non-discrimination, consumer protection and product liability applied to AI systems.',
  },
  {
    id: '21-ai-laws-worldwide',
    order: 21,
    part: 'law',
    slug: 'ai-laws-worldwide',
    title: '21. AI-specific laws around the world',
    shortTitle: 'AI Laws Worldwide',
    summary:
      'AI-specific laws and sector rules outside the EU, jurisdiction by jurisdiction, each dated and sourced.',
  },
  {
    id: '22-principles-and-standards',
    order: 22,
    part: 'law',
    slug: 'principles-and-standards',
    title: '22. Principles, soft law and standards',
    shortTitle: 'Principles & Standards',
    summary:
      'The principle sets, international instruments and standards that shape AI governance, and what each changes in the stack.',
  },
  {
    id: '23-governing-agents',
    order: 23,
    part: 'lifecycle',
    slug: 'governing-agents',
    title: '23. Governing AI agents',
    shortTitle: 'AI Agents',
    summary:
      'Governing autonomous agents: registry, identity, tool permissions, human checkpoints, kill switches and prompt change control.',
  },
];

/** Chapters in reading order. */
export const chaptersOrdered: readonly Chapter[] = [...chapters].sort(
  (a, b) => a.order - b.order,
);

/** Look up a chapter by its collection entry id. */
export function getChapter(id: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

/** Look up a chapter by its URL slug. */
export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}
