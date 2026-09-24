// Typed manifest of the Body of Knowledge chapters (00 to 23).
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
   * else (audit SL-06). No chapter sets it today:
   * The stack and Patterns span all five, and the others cut across layers.
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
      'AI governance engineering is forming now: the object changed shape, the market began hiring for engineering and the law began asking for engineered evidence.',
    glance: [
      'Five problems share one root: governance that describes instead of runs.',
      'The object changed shape: agents that browse, execute code and act under delegated authority are what legacy governance can least see.',
      'The market is hiring for engineering skills before the profession has named itself, and the law now asks for engineered evidence on dated deadlines.',
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
      'What an AI system is for governance: the definitions that set scope, the kinds of AI and the traits that break classic governance, each tied to a control.',
    glance: [
      'Whether a system counts as AI is the first control: a recorded intake decision, kept apart from the risk tier, that decides what enters the registry.',
      'The OECD, EU AI Act, ISO/IEC 22989 and NIST definitions converge on inference, outputs and autonomy, and each element becomes a registry field that drives a decision.',
      'A kind of AI matters when it changes a control: predictive, generative, RAG, on-device and agentic systems each need a different control set.',
      'A score is not a decision: thresholds are owned policy, calibrated and set by risk tier, and a published responsible-AI principle counts only when an artefact evidences it.',
    ],
  },
  {
    id: '12-governance-program',
    order: 12,
    part: 'foundations',
    slug: 'governance-program',
    title: '12. Running the AI governance program',
    shortTitle: 'Governance Program',
    summary:
      'An AI governance program is the organisation governed as a system: people hold duties, a committee decides what gates cannot, and policies compile into gates.',
    glance: [
      'The committee decides what code cannot (residual risk, exceptions, value trade-offs), and gates enforce each decision on every change and leave the evidence.',
      'Exceptions live in a register the gate reads, each with an approver and an expiry, so a lapsed exception fails the build again without anyone having to remember.',
      'AI literacy is a role-based system: structured training records that expire, with attestation as the condition for access to AI tools and override consoles.',
      'Each policy rule is written once as data and compiled into both the prose people read and the policy-engine check the pipeline runs.',
    ],
  },
  {
    id: '13-risk-management',
    order: 13,
    part: 'foundations',
    slug: 'risk-management',
    title: '13. Where risk management sits',
    shortTitle: 'Risk Management',
    summary:
      'Risk management is the loop that tells every other control how hard to bite: identify, assess, treat, monitor, with the risk register as its evidence.',
    glance: [
      'Risk management is not a sixth layer: it is the identify, assess, treat and monitor loop that sets the gates, thresholds and approvals of every other layer.',
      'Likelihood and severity sit on defined five-level scales, and any catastrophic (S5) scenario is Critical whatever its likelihood.',
      'Risk appetite is compiled into tier tolerances and a deploy gate, and every residual risk needs a named, expiring acceptance.',
      'The risk register is versioned data keyed to the registry, and its intensity is tailored by size, sector, maturity, products, objectives and tolerance.',
    ],
  },
  {
    id: '14-governing-development',
    order: 14,
    part: 'lifecycle',
    slug: 'governing-development',
    title: '14. Governing AI development',
    shortTitle: 'Development',
    summary:
      'Development is governed when every build decision, from use case to release, leaves a record a gate reads, so the pipeline compiles the technical file.',
    glance: [
      'Write the use-case record first: intended purpose, out-of-scope uses, decision authority and error appetite are registry fields every later gate reads.',
      "A dataset reaches training only through an admission gate that records the right to use it, licence and opt-out checks, quality, provenance and an owner's signature.",
      'Freeze the test plan before testing and report intervals: a 0.96 pass rate on 200 cases cannot be told apart from a 0.95 threshold.',
      'Most of Annex IV can be generated from pipeline records; people still write the rationale, the residual-risk judgements and the signatures.',
    ],
  },
  {
    id: '15-governing-deployment',
    order: 15,
    part: 'lifecycle',
    slug: 'governing-deployment',
    title: '15. Governing deployment and use',
    shortTitle: 'Deployment',
    summary:
      'Governing the run: deciding to use an AI system, choosing, contracting, going live, operating and retiring it, each step leaving evidence a control fired.',
    glance: [
      'Every step from the decision to deploy to retirement leaves an artefact: a decision record, a task eval, a contract check, a rollback event, a retired registry entry.',
      'Choose models on task-specific evals on your own data: public benchmarks and leaderboards build a shortlist, they do not make the decision.',
      'A deployer becomes a provider by rebranding, substantially modifying or repurposing a high-risk system, and the contract decides what it may test and how it leaves.',
      'Operate with pre-registered rollback criteria, owned drift and fairness signals, tested degraded modes and a retirement runbook.',
    ],
  },
  {
    id: '16-fairness-explainability',
    order: 16,
    part: 'lifecycle',
    slug: 'fairness-and-explainability',
    title: '16. Fairness and explainability for practitioners',
    shortTitle: 'Fairness & XAI',
    summary:
      'Fairness and explainability become controls only when measured, gated and filed as evidence; this chapter maps each technique to its stack layer and legal hook.',
    glance: [
      'Fairness metrics conflict (Kleinberg 2016, Chouldechova 2017), so the metric, threshold and minimum cell size are a governance decision recorded as policy before the eval runs.',
      'The four-fifths rule and the adverse-impact ratio are a trigger for investigation, reported with counts and confidence intervals, not a pass mark.',
      'An explanation is an output that needs evals: fidelity, stability, sanity, reason-code consistency and comprehension testing with the people who receive it.',
      'One explanation record per decision, pinned to model version, method and baseline, serves Regulation B notices, GDPR Art. 15(1)(h) requests and AI Act Art. 86 requests.',
    ],
  },
  {
    id: '17-incidents',
    order: 17,
    part: 'lifecycle',
    slug: 'incidents',
    title: '17. Incidents, issues and root causes',
    shortTitle: 'Incidents',
    summary:
      'AI incident management turns a runtime signal into a classified, contained, reported and explained event, with its cause fed back into the controls.',
    glance: [
      'Severity and reportability are separate decisions: one internal harm scale, plus a test per regime, each with an owner and a timestamp.',
      'Contain first, then freeze the evidence before fixing: the AI Act bars altering a high-risk system in ways that affect the evaluation of causes before authorities are informed.',
      "One event can start several clocks (AI Act, GPAI Code, GDPR, NIS2, DORA, CRA), so keep one incident record and generate each regime's report from it.",
      'Every closed incident leaves a regression eval, a risk-register change and a verified CAPA, coded against a cause taxonomy that names the control that should have caught it.',
    ],
  },
  {
    id: '18-eu-ai-act',
    order: 18,
    part: 'law',
    slug: 'eu-ai-act',
    title: '18. The EU AI Act in one pass',
    shortTitle: 'EU AI Act',
    summary:
      'The EU AI Act as amended by the Digital Omnibus, read end to end: scope, risk ladder, roles, duties and the date each duty applies.',
    glance: [
      'The Digital Omnibus (Regulation (EU) 2026/1744, in force 27 Jul 2026) moved Annex III high-risk duties to 2 Dec 2027 and Annex I duties to 2 Aug 2028.',
      'Article 5 now lists ten prohibited practices; the two Omnibus bans on non-consensual intimate imagery and child sexual abuse material apply from 2 Dec 2026.',
      'Roles name tasks, not organisations: one organisation can be provider and deployer at once, and Article 25 turns rebranding, substantial modification or a new high-risk purpose into provider duties.',
      'Every duty maps to an artefact: a classification decision record for Article 6(3), registry fields for Article 26, FRIA-as-code for Article 27 and an explanation record for Article 86.',
    ],
  },
  {
    id: '19-privacy-and-ai',
    order: 19,
    part: 'law',
    slug: 'privacy-and-ai',
    title: '19. Privacy and data protection law applied to AI',
    shortTitle: 'Privacy & AI',
    summary:
      'Data protection law already binds every AI system that touches personal data; this chapter turns its duties into artefacts, stack layers and evidence.',
    glance: [
      'Each processing moment of an AI system (collection, training, retrieval, inference, logging, evaluation) needs its own purpose, lawful basis and retention, recorded in a basis registry the pipeline reads.',
      'The EDPB treats a trained model as anonymous only when extraction and query-based disclosure of training data are insignificant, so privacy attacks belong in the eval gate as evidence.',
      'Rights requests must reach corpus, snapshots, RAG index, logs and weights, answered by suppression, retraining or unlearning and proven by a fulfilment record.',
      'The GDPR part of the Digital Omnibus is still a proposal as of 2026-09-24, so build the controls both versions want and keep breach clocks and thresholds configurable.',
    ],
  },
  {
    id: '20-existing-law',
    order: 20,
    part: 'law',
    slug: 'existing-law',
    title: '20. Other law that already applies to AI',
    shortTitle: 'Existing Law',
    summary:
      'Copyright, anti-discrimination, consumer-protection and product-liability law already bind AI systems; each duty maps to an evidence artefact and a stack layer.',
    glance: [
      'There is no AI exemption: copyright, equality, consumer-protection and product-liability law already apply to AI systems and are enforced today.',
      'Training-data rights depend on where copying happens: EU opt-outs must be machine-readable, US fair use turns on each record, and the UK has no commercial exception.',
      'Anti-discrimination law reads fairness through tests such as the four-fifths rule, adverse-action reasons and objective justification, so evals must report in those terms.',
      'The EU Product Liability Directive treats software as a product from 9 Dec 2026 and lets courts order disclosure, so every AI release needs a complete defence file.',
    ],
  },
  {
    id: '21-ai-laws-worldwide',
    order: 21,
    part: 'law',
    slug: 'ai-laws-worldwide',
    title: '21. AI-specific laws around the world',
    shortTitle: 'AI Laws Worldwide',
    summary:
      "AI-specific law outside the EU, from Korea's Basic Act to US state statutes and voluntary frameworks, dated and mapped to the artefacts that evidence it.",
    glance: [
      "South Korea's AI Basic Act has applied since 22 January 2026, with notice, labelling, high-impact and domestic-representative duties, while fines wait out a guidance period of at least one year.",
      'The US has no federal AI statute for private actors: OMB memoranda bind agencies and their vendors, state laws bind everyone else, and the federal push to preempt those laws was unresolved on 24 September 2026.',
      'Most regimes ask for the same artefacts (inventory, classification record, notice, label, risk assessment, incident report, retained evidence), so build them once and parameterise trigger, clock and recipient per jurisdiction.',
      "Sector rules already reach AI: the Cyber Resilience Act's reporting duties began on 11 September 2026, and SR 26-2 replaced SR 11-7 as US bank model-risk guidance in April 2026.",
    ],
  },
  {
    id: '22-principles-and-standards',
    order: 22,
    part: 'law',
    slug: 'principles-and-standards',
    title: '22. Principles, soft law and standards',
    shortTitle: 'Principles & Standards',
    summary:
      'Principles say what good looks like and standards say how to show it; this chapter maps each instrument to the stack layer and evidence that answer it.',
    glance: [
      'A principle counts only once a control in the stack evidences it; standards support conformity, they do not confer it.',
      'The OECD AI-system definition, lifecycle and five classification dimensions reappear in the AI Act and the Council of Europe Convention, so they make good registry fields.',
      'NIST AI RMF category and subcategory ids and ISO/IEC clause ids work best as control metadata from which profiles and crosswalks are generated.',
      'As of 2026-09-24 we found no AI Act harmonised standard cited in the Official Journal: EN 18286 is published and the other JTC 21 drafts are at or before Enquiry.',
    ],
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
