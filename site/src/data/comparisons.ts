// comparisons.ts: the editorial half of the "<A> vs <B>" comparison pages
// (/resources/crosswalk/<a>-vs-<b>, SXO-04 of the 2026-09-25 audit). The
// search results for "ISO 42001 vs EU AI Act", "NIST AI RMF vs ISO 42001" and
// "NIST AI RMF vs EU AI Act" are won by comparison pages; these pages answer
// them from the data the crosswalk already carries.
//
// Two kinds of content live here, and only these two:
//
// - `glance`: one fact sheet per instrument (type, issuer, legal force, scope,
//   certifiability, key artefacts, dates), shared by every page that compares
//   it. Each line restates the instrument's summary in frameworks.ts and the
//   chapters that treat it: bok/18-eu-ai-act.md (scope, conformity assessment,
//   penalties, the post-Omnibus timeline), bok/22-principles-and-standards.md
//   (the instruments at a glance, NIST AI RMF 1.0 in depth, the ISO/IEC
//   management-system trio, presumption of conformity) and
//   bok/13-risk-management.md (the NIST AI RMF and ISO/IEC 42001 risk clauses),
//   with the pillar's comparison table (guides/ai-governance.md) for the audience
//   and artefact columns.
//   Every cell names its primary source (`sources`), a URL the chapters or
//   crosswalk.ts already cite: the EUR-Lex article, the ISO or NIST page.
// - `comparisons`: per pair, the answer box and the two question answers (40 to
//   60 words each, tests/seo-compare.spec.ts counts them), the "In short"
//   passage (130 to 170 words) and the FAQ, grounded in the same chapters. No
//   fact here is new to the repository.
//
// Everything else on the page (the per-topic overlap table, its counts, the
// obligation and pattern links, the sources) is derived from crosswalk.ts and
// frameworks.ts by src/lib/comparisons.ts, so it cannot drift from the matrix.
// The pages' <title> and meta description are literals in each page file
// (src/pages/resources/crosswalk/<slug>.astro), where llms.txt reads them.
// Mappings are illustrative, not a claim of conformity.

/** A primary source a cell or an answer rests on. */
export interface SourceRef {
  /** Short citation as the page prints it ("Art. 99", "NIST AI 100-1"). */
  label: string;
  /** Canonical https URL, one the Body of Knowledge or crosswalk.ts already cites. */
  url: string;
  /** The whole document, when `url` points into one (an article anchor): the
   *  Sources list names the document, not the article. */
  doc?: string;
}

/** The attributes of the "At a glance" table, in row order. */
export type GlanceKey =
  | 'type'
  | 'issuer'
  | 'legalForce'
  | 'scope'
  | 'certifiable'
  | 'artefacts'
  | 'dates';

/** The rows of the "At a glance" table, label and attribute, in order (the
 *  page and its Markdown twin both print them). */
export const glanceRows: readonly { label: string; key: GlanceKey }[] = [
  { label: 'Type', key: 'type' },
  { label: 'Issuer', key: 'issuer' },
  { label: 'Legal force', key: 'legalForce' },
  { label: 'Scope and reach', key: 'scope' },
  { label: 'Certifiable', key: 'certifiable' },
  { label: 'Key artefacts', key: 'artefacts' },
  { label: 'Dates', key: 'dates' },
];

/** The facts of one instrument, as the "At a glance" table prints them. */
export interface GlanceFacts {
  /** Kind of instrument and its formal reference. */
  type: string;
  /** Who issues or maintains it. */
  issuer: string;
  /** Binding or voluntary, and what follows from that. */
  legalForce: string;
  /** What it covers and whom it reaches. */
  scope: string;
  /** Whether a third party can certify against it, and what that proves. */
  certifiable: string;
  /** The artefacts it asks for. */
  artefacts: string;
  /** The dates that matter. */
  dates: string;
  /** Where the Body of Knowledge treats it (internal hrefs). */
  read: readonly { label: string; href: string }[];
  /** The primary sources of each attribute's cell (at least one per cell). */
  sources: Readonly<Record<GlanceKey, readonly SourceRef[]>>;
}

/** One question and its answer, with the primary sources the answer rests on. */
export interface Qa {
  q: string;
  a: string;
  sources?: readonly SourceRef[];
}

export interface ComparisonDef {
  /** Route slug: /resources/crosswalk/<slug>. */
  slug: string;
  /** Framework ids (frameworks.ts), A first as in the slug and the H1. */
  a: string;
  b: string;
  /** Short names used in the H1 and the questions ("ISO 42001"). */
  aName: string;
  bName: string;
  /** Answer box under the H1: the core difference, 40 to 60 words. */
  answer: string;
  /** The answer to the pair's "can you use" question (canUseQuestion() in
   *  lib/comparisons.ts words it by the type of B: comply with a law, certify to
   *  a standard), 40 to 60 words. */
  canUse: string;
  /** "Which should you start with?", 40 to 60 words. */
  startWith: string;
  /** "In short": the self-contained passage an answer engine can quote, 130 to
   *  170 words once filled. {topics}, {both} and {strong} are replaced with the
   *  crosswalk counts (lib/comparisons.ts fillCounts), so the numbers cannot
   *  drift from the overlap table. */
  inShort: string;
  /** Hand-written FAQ items; the page adds one generated from the crosswalk. */
  faq: readonly Qa[];
  /** A sentence (and its sources) appended to the generated coverage-gap
   *  answer, where what this mapping leaves out needs saying. */
  gapNote?: { text: string; sources: readonly SourceRef[] };
}

// The primary sources the cells and answers cite. Every URL below is already
// cited in the repository: the EUR-Lex consolidated text of 2026-07-27 and the
// Omnibus in bok/18-eu-ai-act.md and crosswalk.ts (which anchors articles as
// #art_<n>), NIST AI 100-1, AI 600-1, the framework page and the crosswalks
// page in bok/22-principles-and-standards.md [9][23][24][30], ISO/IEC 42006 in
// the same chapter [42], ISO/IEC 42001 and 23894 and the EN 18286 notice in
// crosswalk.ts.
const AI_ACT = 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng';
const AI_ACT_TEXT: SourceRef = { label: 'Regulation (EU) 2024/1689, consolidated text', url: AI_ACT };
const art = (n: string): SourceRef => ({
  label: `Art. ${n}`,
  url: `${AI_ACT}#art_${n}`,
  doc: AI_ACT_TEXT.label,
});
const OMNIBUS: SourceRef = {
  label: 'Regulation (EU) 2026/1744 (Digital Omnibus)',
  url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
};
const EN_18286: SourceRef = {
  label: 'CEN-CENELEC: EN 18286 in the spotlight',
  url: 'https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/',
};
const ISO_42001: SourceRef = { label: 'ISO/IEC 42001:2023', url: 'https://www.iso.org/standard/42001' };
const ISO_42006: SourceRef = { label: 'ISO/IEC 42006:2025', url: 'https://www.iso.org/standard/44546.html' };
const ISO_23894: SourceRef = { label: 'ISO/IEC 23894:2023', url: 'https://www.iso.org/standard/77304.html' };
const NIST_100_1: SourceRef = { label: 'NIST AI 100-1', url: 'https://doi.org/10.6028/NIST.AI.100-1' };
const NIST_600_1: SourceRef = { label: 'NIST AI 600-1', url: 'https://doi.org/10.6028/NIST.AI.600-1' };
const NIST_PAGE: SourceRef = {
  label: 'NIST: AI Risk Management Framework',
  url: 'https://www.nist.gov/itl/ai-risk-management-framework',
};
const NIST_CROSSWALKS: SourceRef = {
  label: 'NIST AIRC: crosswalks',
  url: 'https://airc.nist.gov/airmf-resources/crosswalks/',
};

export const glance: Readonly<Record<string, GlanceFacts>> = {
  'eu-ai-act': {
    type: 'Law: Regulation (EU) 2024/1689, as amended by the Digital Omnibus, Regulation (EU) 2026/1744',
    issuer: 'European Union',
    legalForce:
      'Binding and directly applicable in every Member State. Fines reach EUR 35 million or 7% of worldwide annual turnover, whichever is higher, for prohibited practices, and EUR 15 million or 3% for operator obligations.',
    scope:
      'Risk-tiered: prohibited practices, high-risk systems (Annex I products, Annex III uses), transparency cases and GPAI models. It reaches providers placing AI systems or GPAI models on the EU market wherever they are established, deployers in the Union, third-country providers and deployers whose output is used in the Union, importers and distributors.',
    certifiable:
      'No certificate of the Act as a whole. A high-risk system passes a conformity assessment (internal control, or a notified body where required), then the provider draws up an EU declaration of conformity, affixes the CE marking and registers the system in the EU database.',
    artefacts:
      'Risk classification, risk management system, technical documentation, quality management system, logs, human oversight, fundamental rights impact assessment, serious-incident reports.',
    dates:
      'In force 2024-08-01. Prohibitions and AI literacy from 2025-02-02; GPAI obligations from 2025-08-02; Omnibus in force 2026-07-27; high-risk Annex III from 2027-12-02 and Annex I from 2028-08-02.',
    read: [
      { label: '18. The EU AI Act in one pass', href: '/bok/eu-ai-act' },
      { label: '08. The regulatory map: EU AI Act', href: '/bok/regulatory-map#eu-ai-act-post-omnibus' },
    ],
    sources: {
      type: [AI_ACT_TEXT, OMNIBUS],
      issuer: [AI_ACT_TEXT],
      legalForce: [art('99'), art('113')],
      scope: [art('2'), art('5'), art('6'), art('50'), art('51')],
      certifiable: [art('43'), art('47'), art('48'), art('49')],
      artefacts: [art('6'), art('9'), art('11'), art('12'), art('14'), art('17'), art('27'), art('73')],
      dates: [art('113'), OMNIBUS],
    },
  },
  'iso-42001': {
    type: 'Standard: ISO/IEC 42001:2023, the AI management-system (AIMS) standard',
    issuer: 'ISO/IEC (JTC 1/SC 42)',
    legalForce:
      'Voluntary. It is a management-system standard, not the Article 17 QMS, and its European adoption confers no presumption of conformity with the AI Act.',
    scope:
      'Any organisation that develops, provides or uses AI. It specifies requirements for establishing, implementing, maintaining and continually improving an AI management system.',
    certifiable:
      'Yes. Certification bodies audit organisations against it; ISO/IEC 42006:2025 sets their additional requirements on top of ISO/IEC 17021-1. The certificate evidences a management system; it does not make a system compliant.',
    artefacts:
      'Clauses 4 to 10 in the Harmonized Structure: AI policy, roles, AI risk assessment (6.1.2), risk treatment (6.1.3) and system impact assessment (6.1.4), internal audit, management review. Annex A control objectives in nine areas (A.2 to A.10), justified in a Statement of Applicability.',
    dates:
      'Published 2023. No application date: it applies to an organisation from the day it adopts the standard.',
    read: [
      {
        label: '22. The ISO/IEC management-system trio',
        href: '/bok/principles-and-standards#the-management-system-trio',
      },
      {
        label: '13. ISO 31000, ISO/IEC 23894 and ISO/IEC 42001',
        href: '/bok/risk-management#iso-31000-isoiec-23894-and-isoiec-42001',
      },
    ],
    sources: {
      type: [ISO_42001],
      issuer: [ISO_42001],
      legalForce: [
        ISO_42001,
        { ...art('17'), label: 'AI Act Art. 17' },
        { ...art('40'), label: 'AI Act Art. 40' },
      ],
      scope: [ISO_42001],
      certifiable: [ISO_42006],
      artefacts: [ISO_42001],
      dates: [ISO_42001],
    },
  },
  'nist-ai-rmf': {
    type: 'Framework: NIST AI Risk Management Framework 1.0 (NIST AI 100-1). Its companion Generative AI Profile (NIST AI 600-1, 2024) is not mapped on these pages.',
    issuer: 'NIST (United States)',
    legalForce:
      'Voluntary and US-origin. It describes itself as voluntary, rights-preserving, non-sector-specific and use-case agnostic.',
    scope:
      'Any organisation, in any sector and for any use case. GOVERN applies across the whole process; MAP, MEASURE and MANAGE apply per system and per lifecycle stage.',
    certifiable:
      'No. There is no certification scheme for it: NIST AI 100-1 presents the RMF as voluntary guidance.',
    artefacts:
      'Four functions (Govern, Map, Measure, Manage) in 19 categories and their subcategories, used as control metadata; a current and a target profile, with the gap between them as the action plan.',
    dates:
      '1.0 published 2023-01-26; there is no 2.0. A formal review was foreseen by 2028, and as of 2026-09-24 NIST states that 1.0 is being revised, with no revised version published.',
    read: [
      {
        label: '22. NIST AI RMF 1.0 in depth',
        href: '/bok/principles-and-standards#nist-ai-rmf-10-in-depth',
      },
      {
        label: '13. NIST AI RMF and ISO/IEC 23894 on the stack',
        href: '/bok/risk-management#nist-ai-rmf-and-isoiec-23894-on-the-stack',
      },
    ],
    sources: {
      type: [NIST_100_1, NIST_600_1],
      issuer: [NIST_100_1],
      legalForce: [NIST_100_1],
      scope: [NIST_100_1],
      certifiable: [NIST_100_1],
      artefacts: [NIST_100_1],
      dates: [NIST_100_1, NIST_PAGE],
    },
  },
};

export const comparisons: readonly ComparisonDef[] = [
  {
    slug: 'iso-42001-vs-eu-ai-act',
    a: 'iso-42001',
    b: 'eu-ai-act',
    aName: 'ISO 42001',
    bName: 'EU AI Act',
    answer:
      'The EU AI Act is binding law, directly applicable in every Member State; it reaches providers, deployers, importers and distributors whose AI systems are placed on the EU market or whose output is used there. ISO/IEC 42001 is a voluntary, certifiable AI management-system standard for any organisation; its certificate confers no presumption of conformity with the Act.',
    canUse:
      "Not on its own. A 42001 certificate evidences a management system; it is not a harmonised standard and confers no presumption of conformity with the Act. As of 2026-09-24 no harmonised standard is cited in the Official Journal. The AIMS still helps: its risk, impact-assessment and documentation processes produce evidence the Act's duties ask for.",
    startWith:
      'If your AI systems reach the EU market or their output is used there, start with the Act: its duties apply in stages, prohibitions and AI literacy since 2 February 2025 and Annex III high-risk duties from 2 December 2027. Add ISO/IEC 42001 for a certifiable management system around that work; it shares its clause structure with ISO/IEC 27001.',
    inShort:
      "ISO/IEC 42001 and the EU AI Act work on many of the same topics but are different kinds of instrument. The EU AI Act is binding law: prohibitions and AI literacy apply since 2 February 2025, GPAI obligations since 2 August 2025 and Annex III high-risk duties from 2 December 2027, and fines for prohibited practices reach EUR 35 million or 7% of worldwide annual turnover. ISO/IEC 42001 is a voluntary AI management-system standard; certification bodies audit organisations against it, under ISO/IEC 42006. A 42001 certificate evidences a management system and confers no presumption of conformity with the Act: only harmonised standards cited in the Official Journal and the Commission's common specifications do. In the crosswalk, both file clauses under {both} of {topics} topics, {strong} of them strongly. The AIMS still earns its place: its risk assessment, impact assessment and documentation processes produce evidence the Act's duties ask for.",
    faq: [
      {
        q: 'Does ISO 42001 certification give a presumption of conformity with the EU AI Act?',
        a: 'No. Only harmonised European standards whose references are published in the Official Journal (Article 40) and common specifications the Commission adopts by implementing act (Article 41) give a presumption of conformity, to the extent they cover the requirements. ISO/IEC 42001 is neither. As of 2026-09-24 no harmonised standard had been cited at all.',
        sources: [art('40'), art('41')],
      },
      {
        q: 'Is ISO 42001 the quality management system of Article 17?',
        a: 'No. ISO/IEC 42001 is an AI management-system standard, not the Article 17 quality management system the Act asks of high-risk providers. The standard written for Article 17 is EN 18286:2026, published in July 2026 but not cited in the Official Journal, so it carries no presumption of conformity yet.',
        sources: [art('17'), EN_18286],
      },
      {
        q: 'When do the EU AI Act high-risk duties apply?',
        a: 'Since the Digital Omnibus (Regulation (EU) 2026/1744, in force 27 July 2026), the Annex III high-risk duties apply from 2 December 2027 and the Annex I duties from 2 August 2028. ISO/IEC 42001 has no application date: an organisation adopts it when it chooses.',
        sources: [OMNIBUS, art('113')],
      },
    ],
  },
  {
    slug: 'nist-ai-rmf-vs-iso-42001',
    a: 'nist-ai-rmf',
    b: 'iso-42001',
    aName: 'NIST AI RMF',
    bName: 'ISO 42001',
    answer:
      'Both are voluntary, and only ISO/IEC 42001 is certifiable. The NIST AI RMF 1.0 is a US-origin risk framework, non-sector-specific and use-case agnostic, organised in four functions: Govern, Map, Measure and Manage. ISO/IEC 42001 is the international AI management-system standard; certification bodies audit organisations against it, with their own competence set by ISO/IEC 42006.',
    canUse:
      'Partly. NIST itself hosts a crosswalk from the AI RMF to ISO/IEC 42001. But certification needs the management system itself, clauses 4 to 10 and a Statement of Applicability over the Annex A controls, which the RMF does not ask for. Its category and subcategory identifiers still serve as control metadata inside the AIMS.',
    startWith:
      'Start with the NIST AI RMF to organise risk work: it is voluntary, non-sector-specific, and its four functions and 19 categories give you identifiers to tag controls with. Move to ISO/IEC 42001 when you need a certificate as proof of a working management system; the same identifiers then feed its Statement of Applicability.',
    inShort:
      'The NIST AI RMF and ISO/IEC 42001 are both voluntary, and only ISO/IEC 42001 is certifiable. The NIST AI RMF 1.0 (NIST AI 100-1, 26 January 2023) is a US-origin risk framework, non-sector-specific and use-case agnostic, organised in four functions (Govern, Map, Measure and Manage) and 19 categories. There is no 2.0; NIST states that 1.0 is being revised. ISO/IEC 42001 is the international AI management-system standard: certification bodies audit organisations against clauses 4 to 10 and a Statement of Applicability over the Annex A controls, under ISO/IEC 42006. NIST hosts a crosswalk from the RMF to ISO/IEC 42001, and in this crosswalk both file clauses under {both} of {topics} topics, {strong} of them strongly. A common route is to organise risk work with the RMF, tag controls with its category and subcategory identifiers, and move to ISO/IEC 42001 when a certificate is needed as proof of a working management system.',
    faq: [
      {
        q: 'Is there an official crosswalk between the NIST AI RMF and ISO 42001?',
        a: "NIST's AI Resource Center hosts crosswalks from the RMF to other frameworks, including ISO/IEC 42001, and dated 14 August 2025 a revised ISO/IEC 23894 crosswalk and a new ISO/IEC 42005 one. They are a sound starting point for a crosswalk file, not a substitute for mapping your own controls.",
        sources: [NIST_CROSSWALKS],
      },
      {
        q: 'Is there a NIST AI RMF 2.0?',
        a: "No. AI RMF 1.0 (NIST AI 100-1, 26 January 2023) remains the citable text. As of 2026-09-24 NIST's framework page states that 1.0 is being revised as part of the White House AI Action Plan, but no revised version is published. Pin the version in control metadata.",
        sources: [NIST_100_1, NIST_PAGE],
      },
      {
        q: 'How do ISO/IEC 23894 and ISO 42001 relate to the NIST AI RMF?',
        a: "ISO/IEC 23894 applies ISO 31000 risk management to AI; ISO/IEC 42001 is the certifiable management-system standard whose risk clauses (6.1.2 to 6.1.4, operated in 8.2 to 8.4) require the risk loop to exist and run. NIST's crosswalk shows that its functions and the 23894 clauses describe one process.",
        sources: [ISO_23894, ISO_42001, NIST_CROSSWALKS],
      },
    ],
  },
  {
    slug: 'nist-ai-rmf-vs-eu-ai-act',
    a: 'nist-ai-rmf',
    b: 'eu-ai-act',
    aName: 'NIST AI RMF',
    bName: 'EU AI Act',
    answer:
      'The EU AI Act is binding law, directly applicable in every Member State; it reaches providers, deployers, importers and distributors whose AI systems are placed on the EU market or whose output is used there. The NIST AI RMF 1.0 is a voluntary, US-origin framework that any organisation may adopt; it has no legal force and no certification scheme.',
    canUse:
      "Not by itself. Only harmonised standards cited in the Official Journal (Article 40) and the Commission's common specifications (Article 41) give a presumption of conformity, and the RMF, voluntary US guidance, is neither. It is still scaffolding: its four functions organise the risk management, testing and monitoring the Act's high-risk articles require, and one set of evidence can serve both.",
    startWith:
      "If your AI systems reach the EU market or their output is used there, start with the Act: its scope and risk tiers decide which duties apply and from when. Use the NIST AI RMF alongside it as the working method for risk management; it is use-case agnostic, and its functions map onto the Act's risk, testing and monitoring duties.",
    inShort:
      "The EU AI Act is binding law and the NIST AI RMF is voluntary guidance. The Act reaches providers placing AI systems or GPAI models on the EU market wherever they are established, and providers and deployers in third countries whose output is used in the Union, so it can apply to US companies. It fines prohibited practices up to EUR 35 million or 7% of worldwide annual turnover, and its Annex III high-risk duties apply from 2 December 2027. The NIST AI RMF 1.0 (NIST AI 100-1) is US-origin and use-case agnostic, with no penalties and no certification scheme. It gives no presumption of conformity with the Act, but its four functions, Govern, Map, Measure and Manage, organise the risk management, testing and monitoring the Act's high-risk articles require. In this crosswalk both file clauses under {both} of {topics} topics, {strong} of them strongly, so one set of evidence can serve both.",
    faq: [
      {
        q: 'Does the EU AI Act apply to US companies?',
        a: "Yes, when they are in its scope. Article 2(1) reaches providers placing AI systems or GPAI models on the EU market wherever they are established, and providers and deployers in third countries whose system's output is used in the Union. The scope question is where the output is used, not where the system is hosted.",
        sources: [art('2')],
      },
      {
        q: 'What are the penalties under each?',
        a: 'The Act fines prohibited practices up to EUR 35 million or 7% of worldwide annual turnover, and breaches of operator obligations up to EUR 15 million or 3%, whichever is higher; SMEs pay the lower of the two. The NIST AI RMF carries no penalties: it is voluntary.',
        sources: [art('99'), NIST_100_1],
      },
      {
        q: 'Is there a NIST AI RMF 2.0?',
        a: "No. AI RMF 1.0 (NIST AI 100-1, 26 January 2023) remains the citable text. As of 2026-09-24 NIST's framework page states that 1.0 is being revised as part of the White House AI Action Plan, but no revised version is published. Pin the version in control metadata.",
        sources: [NIST_100_1, NIST_PAGE],
      },
    ],
    gapNote: {
      text: 'The NIST column maps AI RMF 1.0 (NIST AI 100-1) only: its companion Generative AI Profile (NIST AI 600-1) adds suggested actions for 12 risks that generative AI creates or exacerbates, among them information integrity and intellectual property, and is not mapped here.',
      sources: [NIST_600_1],
    },
  },
];

/** The comparison with this slug. */
export function comparisonBySlug(slug: string): ComparisonDef | undefined {
  return comparisons.find((c) => c.slug === slug);
}

/** Site path of a comparison page. */
export function comparisonPath(c: Pick<ComparisonDef, 'slug'>): string {
  return `/resources/crosswalk/${c.slug}`;
}

/**
 * The files a comparison page is built from, relative to site/, page file
 * first: its byline and `dateModified` take the newest commit across them, and
 * astro.config.ts SOURCE_BY_PATH lists the same files for the sitemap lastmod.
 */
export function comparisonSourceFiles(slug: string): string[] {
  return [
    `src/pages/resources/crosswalk/${slug}.astro`,
    'src/components/ComparisonPage.astro',
    'src/data/comparisons.ts',
    'src/lib/comparisons.ts',
    'src/data/crosswalk.ts',
    'src/data/frameworks.ts',
  ];
}
