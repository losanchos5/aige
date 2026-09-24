// triage.ts: the versioned question graph of the EU AI Act role and risk-class
// triage (/toolkit/ai-act-triage). Faithful to bok/18-eu-ai-act.md, which reads
// Regulation (EU) 2024/1689 as amended by Regulation (EU) 2026/1744 (the
// Digital Omnibus on AI) as of 2026-09-24.
//
// The house rule for tools: a tool never asserts what the chapters do not. So
// every question and every derived rule carries `basis`, verbatim fragments of
// chapter 18 that support what it says; the tool page fails the build if one
// of them is no longer in the chapter (see `plainChapterText`), and
// tests/ai-act-triage.spec.ts checks the same. `section` names the chapter 18
// heading the item rests on (its anchor is computed at build time).
//
// The graph is data: `showIf` decides which questions are asked, and the rules
// (`classRules`, `roleRules`, `scopeRules`, `noteRules`, `triggerRules`) decide
// what the answers give. public/toolkit/ai-act-triage-engine.js interprets it
// in the browser and in the tests; it holds no legal logic of its own.
//
// VERSIONING. `questionSet.version` is semver. A change to a rule, a question's
// meaning or an option value is MAJOR; a new question or option is MINOR; a
// wording fix is PATCH. Option values and question ids are stable within a
// major version, because saved records and copied links carry them.
//
// Mappings are illustrative, not a claim of conformity, and not legal advice.
// This file has no runtime imports on purpose: Node can load it with
// --experimental-strip-types to generate the schema example.
import type { SystemClass } from './frameworks';

export const questionSet = {
  id: 'aige.eu-ai-act-triage',
  version: '1.0.0',
  asOf: '2026-09-24',
  basis:
    'Regulation (EU) 2024/1689 as amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI)',
  chapterPath: '/bok/eu-ai-act',
  chapterFile: 'bok/18-eu-ai-act.md',
  /** Consolidated text of 27 Jul 2026 on EUR-Lex; article anchors are `#art_N`. */
  consolidatedText: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
} as const;

/** The EU operator roles, as ids of `roles` in src/data/roles.ts. */
export type TriageRole =
  | 'eu-provider'
  | 'eu-downstream-provider'
  | 'eu-deployer'
  | 'eu-importer'
  | 'eu-distributor'
  | 'eu-authorised-representative'
  | 'eu-product-manufacturer'
  | 'eu-gpai-provider';

/** The rungs and the GPAI track: `SystemClass` ids of src/data/frameworks.ts
 *  plus `minimal`, which the obligation register does not carry as a class. */
export type TriageClass = Exclude<SystemClass, 'all-ai-systems'> | 'minimal';

/** Labels; tests check them against roles.ts and frameworks.ts. */
export const roleLabels: Readonly<Record<TriageRole, { label: string; article: string }>> = {
  'eu-provider': { label: 'Provider', article: 'Art. 3(3)' },
  'eu-downstream-provider': { label: 'Downstream provider', article: 'Art. 3(68)' },
  'eu-deployer': { label: 'Deployer', article: 'Art. 3(4)' },
  'eu-importer': { label: 'Importer', article: 'Art. 3(6)' },
  'eu-distributor': { label: 'Distributor', article: 'Art. 3(7)' },
  'eu-authorised-representative': { label: 'Authorised representative', article: 'Art. 3(5)' },
  'eu-product-manufacturer': { label: 'Product manufacturer', article: 'Art. 25(3)' },
  'eu-gpai-provider': { label: 'General-purpose AI model provider', article: 'Art. 53' },
};

/** Display order of the rungs and the GPAI track, with the dates chapter 18's
 *  risk-ladder table gives. */
export const classLabels: Readonly<
  Record<TriageClass, { label: string; article: string; appliesNote: string }>
> = {
  prohibited: {
    label: 'Prohibited practice',
    article: 'Art. 5',
    appliesNote: '2025-02-02; new points 2026-12-02',
  },
  'high-risk-annex-i': {
    label: 'High-risk (Annex I)',
    article: 'Art. 6(1)',
    appliesNote: '2028-08-02',
  },
  'high-risk-annex-iii': {
    label: 'High-risk (Annex III)',
    article: 'Art. 6(2)',
    appliesNote: '2027-12-02',
  },
  'transparency-art50': {
    label: 'Transparency (Art. 50)',
    article: 'Art. 50',
    appliesNote: '2026-08-02',
  },
  minimal: { label: 'Minimal risk', article: 'Arts. 4, 95', appliesNote: '2025-02-02' },
  gpai: {
    label: 'GPAI model',
    article: 'Arts. 51 to 56',
    appliesNote: '2025-08-02; Commission enforcement 2026-08-02',
  },
  'gpai-systemic': {
    label: 'GPAI model with systemic risk',
    article: 'Arts. 51, 52, 55',
    appliesNote: '2025-08-02; Commission enforcement 2026-08-02',
  },
};

export const classOrder: readonly TriageClass[] = [
  'prohibited',
  'high-risk-annex-i',
  'high-risk-annex-iii',
  'transparency-art50',
  'minimal',
  'gpai',
  'gpai-systemic',
];

// ---- Conditions ---------------------------------------------------------------

/** Where the triage leaves the Act's reach: the outcome of the scope phase. */
export type ScopeStatus = 'in-scope' | 'out-of-scope' | 'undetermined';

/**
 * A condition over the answers (and, in later phases, over what earlier rules
 * derived). `{ q, in }` holds when the answer to question `q` (one value or
 * several) includes any of the listed values; an unanswered or hidden
 * question never matches. `{ cls }` and `{ role }` hold when an earlier rule
 * derived any of the listed classes or roles; `{ noRole: true }` when none.
 * `{ scope }` holds when the scope phase ended in one of the listed states; it
 * is only meaningful in the note and trigger rules, which run after it.
 * `{ all: [] }` always holds.
 */
export type Condition =
  | { q: string; in: readonly string[] }
  | { cls: readonly TriageClass[] }
  | { role: readonly TriageRole[] }
  | { noRole: true }
  | { scope: readonly ScopeStatus[] }
  | { all: readonly Condition[] }
  | { any: readonly Condition[] }
  | { not: Condition };

// ---- Questions ------------------------------------------------------------------

export type StepId =
  | 'object'
  | 'reach'
  | 'role'
  | 'prohibited'
  | 'high-risk'
  | 'transparency'
  | 'gpai';

export interface TriageStep {
  id: StepId;
  title: string;
  lede: string;
}

export const steps: readonly TriageStep[] = [
  {
    id: 'object',
    title: 'What you are triaging',
    lede: 'The Act regulates two objects: AI systems, ranked by intended purpose, and general-purpose AI models, on a separate track.',
  },
  {
    id: 'reach',
    title: 'Reach and exclusions',
    lede: 'Whether the Act reaches it at all: by placement, by use in the Union or by output used in the Union, less the narrow exclusions.',
  },
  {
    id: 'role',
    title: 'Your role',
    lede: 'Roles name tasks, not organisations: one organisation can be provider and deployer of the same system.',
  },
  {
    id: 'prohibited',
    title: 'Prohibited practices',
    lede: 'Article 5 is a list of banned uses, not a risk assessment.',
  },
  {
    id: 'high-risk',
    title: 'High-risk',
    lede: 'Two routes: a safety component of an Annex I product, or an Annex III use not filtered out by Art. 6(3).',
  },
  {
    id: 'transparency',
    title: 'Transparency',
    lede: 'Article 50 applies to any AI system that fits one of its cases, whatever else the system is.',
  },
  {
    id: 'gpai',
    title: 'General-purpose AI models',
    lede: 'The model track: generality, the systemic-risk presumption and the open-source carve-out.',
  },
];

export interface TriageOption {
  /** Kebab-case, stable within a major version of the question set. */
  value: string;
  /** What the reader ticks. */
  label: string;
  /** What this answer means, in the chapter's terms: the reason the result
   *  shows next to the answer. */
  means: string;
  /** "None of these": ticking it clears the other options, and the reverse. */
  exclusive?: boolean;
}

export interface TriageQuestion {
  /** Kebab-case, stable within a major version; also the key in the link. */
  id: string;
  step: StepId;
  kind: 'single' | 'multi';
  prompt: string;
  hint: string;
  /** The article the question rests on, as a label. */
  article: string;
  /** Anchor in the consolidated EUR-Lex text (`art_6`, `anx_III`). */
  eurLex: string;
  /** Chapter 18 heading the question rests on (exact heading text). */
  section: string;
  /** Verbatim fragments of chapter 18 supporting the question and its options. */
  basis: readonly string[];
  /** When to ask it; omitted means always. */
  showIf?: Condition;
  /** The same condition in words, for the worksheet without JavaScript. */
  askWhen?: string;
  options: readonly TriageOption[];
}

const SYSTEM: Condition = { q: 'object', in: ['system', 'both'] };
const MODEL: Condition = { q: 'object', in: ['model', 'both'] };
const ANNEX_III_AREAS = [
  'biometrics',
  'critical-infrastructure',
  'education',
  'employment',
  'essential-services',
  'law-enforcement',
  'migration',
  'justice-democracy',
] as const;
const IN_ANNEX_III: Condition = { q: 'annex3', in: ANNEX_III_AREAS };
const IS_GPAI: Condition = { q: 'gpai', in: ['yes', 'indicative'] };
const HIGH_RISK: Condition = { cls: ['high-risk-annex-i', 'high-risk-annex-iii'] };
const NONE = (means: string): TriageOption => ({
  value: 'none',
  label: 'None of these',
  means,
  exclusive: true,
});

export const questions: readonly TriageQuestion[] = [
  // ---- 1. What you are triaging ----
  {
    id: 'object',
    step: 'object',
    kind: 'single',
    prompt: 'What are you triaging?',
    hint: 'A model is not an AI system on its own: it needs further components, such as a user interface, to become one.',
    article: 'Art. 3(1), Art. 3(63)',
    eurLex: 'art_3',
    section: 'What counts as an AI system',
    basis: [
      'A GPAI model is a separate object with its own definition',
      'a model is not an AI system on its own and needs further components, such as a user interface, to become one',
      'The Act sorts AI systems by intended purpose onto four rungs, and puts GPAI models on a separate track.',
    ],
    options: [
      {
        value: 'system',
        label: 'An AI system: software with an intended purpose that people or other systems use',
        means: 'The system track: the definition screen, then the risk ladder by intended purpose.',
      },
      {
        value: 'model',
        label: 'A model on its own, offered for integration into other systems',
        means: 'The model track: a model is not an AI system on its own, so only the GPAI questions apply.',
      },
      {
        value: 'both',
        label: 'Both: a model, and a system built on it',
        means: 'Both tracks: the system goes up the risk ladder and the model through the GPAI questions.',
      },
    ],
  },
  {
    id: 'inference',
    step: 'object',
    kind: 'single',
    prompt:
      'Does it infer, from the input it receives, how to generate outputs such as predictions, content, recommendations or decisions?',
    hint: 'The Art. 3(1) definition has seven elements; the decisive one is inference. The Commission guidelines that read it are not binding.',
    article: 'Art. 3(1)',
    eurLex: 'art_3',
    section: 'What counts as an AI system',
    basis: [
      'The decisive element is inference.',
      'The guidelines exclude systems based on rules defined solely by natural persons',
      'systems for improving mathematical optimisation, basic data processing, systems based on classical heuristics, and simple prediction systems',
      'The guidelines are not binding',
      'For the engineer, scope is a recorded decision, not an assumption.',
      'when false, the element that fails and the reasoning',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system (alone or with its model).',
    options: [
      {
        value: 'yes',
        label: 'Yes: its outputs are inferred, for example by a trained model',
        means: 'It meets the decisive element of the Art. 3(1) definition: an AI system.',
      },
      {
        value: 'rules-only',
        label: 'No: it only applies rules defined solely by natural persons',
        means: 'The Commission guidelines exclude systems based on rules defined solely by natural persons. Record ai_system: false, the element that fails and the reasoning.',
      },
      {
        value: 'family',
        label:
          'It computes, but only as one of the four families the guidelines name: improving mathematical optimisation, basic data processing, classical heuristics or simple prediction',
        means: 'The guidelines name these families as ones that may still fall outside the definition. They are not binding, so the call is a recorded decision with its reasoning.',
      },
      {
        value: 'unsure',
        label: 'Not sure yet',
        means: 'Scope is a recorded decision, not an assumption. The triage carries on as if it were an AI system and lists the definition as an open point.',
      },
    ],
  },

  // ---- 2. Reach and exclusions ----
  {
    id: 'reach',
    step: 'reach',
    kind: 'multi',
    prompt: 'Where does it meet the EU?',
    hint: 'Tick every link that holds. Where it is hosted is not the scope question; where its output is used is.',
    article: 'Art. 2(1)',
    eurLex: 'art_2',
    section: 'Who is in scope',
    basis: [
      "Article 2(1) reaches providers placing AI systems or GPAI models on the EU market, wherever they are established; deployers in the Union; providers and deployers in third countries whose system's output is used in the Union",
      'The reach is extraterritorial twice over: by placement and by output',
      '"Where is it hosted?" is not the scope question; "where is its output used?" is.',
    ],
    options: [
      {
        value: 'eu-market',
        label: 'It is placed on the EU market or put into service in the EU, by us or by its provider',
        means: 'Art. 2(1) reaches providers placing AI systems or GPAI models on the EU market, wherever they are established.',
      },
      {
        value: 'eu-established',
        label: 'We are established or located in the EU and use it',
        means: 'Art. 2(1) reaches deployers in the Union.',
      },
      {
        value: 'eu-output',
        label: 'It runs outside the EU, but its output is used in the EU',
        means: "Art. 2(1) reaches providers and deployers in third countries whose system's output is used in the Union: the reach is extraterritorial by output as well as by placement.",
      },
      NONE(
        'No placement on the EU market, no deployer in the Union and no output used in the Union: Art. 2(1) does not reach it on these answers.',
      ),
    ],
  },
  {
    id: 'exclusions',
    step: 'reach',
    kind: 'multi',
    prompt: 'Does one of the Act’s exclusions apply?',
    hint: 'Each exclusion is narrow; the note on each option says how. Union data protection law applies alongside the Act in every case.',
    article: 'Art. 2(3) to 2(12)',
    eurLex: 'art_2',
    section: 'What the Act excludes',
    basis: [
      'The exclusion covers systems used exclusively for those purposes; a dual-use system is in scope for its other uses',
      'Third-country public authorities and international organisations in law-enforcement or judicial cooperation',
      'Only with adequate safeguards for fundamental rights',
      'The system or model must be specifically developed and put into service for that purpose alone',
      'Testing in real-world conditions is not covered by the exclusion',
      'Free and open-source AI systems',
      'Not if placed on the market as high-risk, or caught by Art. 5 or Art. 50',
      'Union data protection law applies alongside the Act in every case',
    ],
    options: [
      {
        value: 'military',
        label: 'Used exclusively for military, defence or national security purposes',
        means: 'Excluded (Art. 2(3)) only for those exclusive purposes: a dual-use system is in scope for its other uses.',
      },
      {
        value: 'third-country-authority',
        label:
          'Used by a third-country public authority or an international organisation in law-enforcement or judicial cooperation with the Union',
        means: 'Excluded (Art. 2(4)) only with adequate safeguards for fundamental rights.',
      },
      {
        value: 'research',
        label: 'Specifically developed and put into service for the sole purpose of scientific research and development',
        means: 'Excluded (Art. 2(6)): the system or model must be specifically developed and put into service for that purpose alone.',
      },
      {
        value: 'pre-market',
        label: 'Still in research, testing or development, not yet placed on the market or put into service, and not tested in real-world conditions',
        means: 'Excluded for now (Art. 2(8)); testing in real-world conditions is not covered by the exclusion.',
      },
      {
        value: 'open-source',
        label: 'An AI system released under a free and open-source licence',
        means: 'Excluded (Art. 2(12)), but not if placed on the market as high-risk, or caught by Art. 5 or Art. 50: the triage checks those rungs before it applies the exclusion.',
      },
      NONE('No exclusion claimed.'),
    ],
  },

  // ---- 3. Your role ----
  {
    id: 'activity',
    step: 'role',
    kind: 'multi',
    prompt: 'What does your organisation do with it?',
    hint: 'A role attaches to an activity on this system, not to your company. Tick every activity that holds.',
    article: 'Art. 3(3) to 3(8), Art. 3(68)',
    eurLex: 'art_3',
    section: 'The EU operator roles',
    basis: [
      'A role attaches to an activity on a specific system, not to a company.',
      'Develops an AI system or GPAI model, or has one developed, and places it on the market or into service under its own name',
      'includes own use',
      "Integrates an AI model, its own or a third party's, into an AI system",
      'Uses an AI system under its authority, other than for personal, non-professional use',
      "EU-based; places on the market a system bearing a non-EU provider's name",
      'Makes a system available without being its provider or importer',
      'EU-based, with a written mandate from a non-EU provider',
      'Places a high-risk safety component with its Annex I, Section A product under its own name',
      'Removes deployer obligations for natural persons only',
    ],
    options: [
      {
        value: 'develop',
        label: 'We develop it, or have it developed, and place it on the market or put it into service under our own name (own use counts)',
        means: 'Provider (Art. 3(3)): develops an AI system or GPAI model, or has one developed, and places it on the market or into service under its own name. Putting into service includes own use.',
      },
      {
        value: 'integrate',
        label: 'We integrate an AI model, our own or a third party’s, into the system',
        means: 'Downstream provider (Art. 3(68)): integrates an AI model into an AI system and carries the provider duties for the system.',
      },
      {
        value: 'use',
        label: 'We use it under our authority, in a professional activity',
        means: 'Deployer (Art. 3(4)): uses an AI system under its authority, other than for personal, non-professional use.',
      },
      {
        value: 'import',
        label: 'We are EU-based and place on the market a system bearing the name of a non-EU provider',
        means: 'Importer (Art. 3(6)).',
      },
      {
        value: 'distribute',
        label: 'We make it available on the market without being its provider or importer',
        means: 'Distributor (Art. 3(7)).',
      },
      {
        value: 'represent',
        label: 'We are EU-based and act under a written mandate from a non-EU provider',
        means: 'Authorised representative (Art. 3(5)).',
      },
      {
        value: 'product',
        label: 'We place it on the market, or put it into service, with our own product under our own name',
        means: 'Product manufacturer (Art. 25(3)): carries the provider duties when the system is a high-risk safety component of an Annex I, Section A product.',
      },
      {
        value: 'personal',
        label: 'Only a natural person’s purely personal, non-professional use',
        means: 'Art. 2(10) removes deployer obligations for natural persons in purely personal, non-professional use: no operator role follows.',
        exclusive: true,
      },
    ],
  },
  {
    id: 'art25',
    step: 'role',
    kind: 'multi',
    prompt:
      'Have you done any of these to a system that someone else first placed on the market or put into service?',
    hint: 'Each one makes a distributor, importer, deployer or other third party the provider of a high-risk system. A substantial modification is an unplanned change after placing on the market that affects compliance or changes the assessed intended purpose.',
    article: 'Art. 25(1)',
    eurLex: 'art_25',
    section: 'Article 25: when someone else becomes the provider',
    basis: [
      'becomes the provider of a high-risk system, with all of the Art. 16 duties, in three cases',
      'it puts its name or trademark on a high-risk system already on the market, subject to contracts allocating the obligations otherwise',
      'it makes a substantial modification to a high-risk system that stays high-risk',
      'it changes the intended purpose of a system that was not high-risk, including a general-purpose AI system, so that it becomes high-risk',
      'A substantial modification is an unplanned change after placing on the market that affects compliance or changes the assessed intended purpose',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system.',
    options: [
      {
        value: 'name',
        label: 'Put our name or trademark on a high-risk system already on the market',
        means: 'Art. 25(1)(a): you become its provider, subject to contracts allocating the obligations otherwise.',
      },
      {
        value: 'substantial',
        label: 'Made a substantial modification to a high-risk system, which stays high-risk',
        means: 'Art. 25(1)(b): you become its provider.',
      },
      {
        value: 'purpose',
        label: 'Changed the intended purpose of a system that was not high-risk, including a general-purpose AI system, so that it becomes high-risk',
        means: 'Art. 25(1)(c): you become the provider of a high-risk system. The high-risk questions must place it on that rung.',
      },
      NONE('No Art. 25(1) trigger.'),
    ],
  },

  // ---- 4. Prohibited practices ----
  {
    id: 'art5',
    step: 'prohibited',
    kind: 'multi',
    prompt: 'Is the system intended or used for one of these practices?',
    hint: 'If a practice is on the list, no mitigation makes it lawful. Four points have a narrow carve-out, named under each; the two practices the Omnibus added are asked next.',
    article: 'Art. 5(1)',
    eurLex: 'art_5',
    section: 'Prohibited practices (Article 5)',
    basis: [
      'Article 5 is a list of banned uses, not a risk assessment. If a practice is on the list, no mitigation makes it lawful.',
      'Subliminal, manipulative or deceptive techniques that materially distort behaviour, causing or likely to cause significant harm',
      'Exploiting vulnerabilities of age, disability or social or economic situation, to the same effect',
      'Social scoring leading to unjustified or out-of-context detrimental treatment',
      'Predicting crime risk based solely on profiling or personality traits',
      'Support to a human assessment based on objective, verifiable facts',
      'Untargeted scraping of facial images to build recognition databases',
      'Inferring emotions at work or in education',
      'Medical or safety reasons',
      'Biometric categorisation to infer sensitive traits such as race, beliefs or sexual orientation',
      'Lawfully acquired datasets; law-enforcement categorisation',
      'Real-time remote biometric identification in public spaces for law enforcement',
      'Three objectives, with prior authorisation',
      '| 2025-02-02 |',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system.',
    options: [
      {
        value: 'a',
        label: 'Subliminal, manipulative or deceptive techniques that materially distort behaviour, causing or likely to cause significant harm',
        means: 'Art. 5(1)(a): prohibited since 2025-02-02, no carve-out.',
      },
      {
        value: 'b',
        label: 'Exploiting vulnerabilities of age, disability or social or economic situation, to the same effect',
        means: 'Art. 5(1)(b): prohibited since 2025-02-02, no carve-out.',
      },
      {
        value: 'c',
        label: 'Social scoring leading to unjustified or out-of-context detrimental treatment',
        means: 'Art. 5(1)(c): prohibited since 2025-02-02, no carve-out.',
      },
      {
        value: 'd',
        label: 'Predicting crime risk based solely on profiling or personality traits',
        means: 'Art. 5(1)(d): prohibited since 2025-02-02. Narrow carve-out: support to a human assessment based on objective, verifiable facts.',
      },
      {
        value: 'e',
        label: 'Untargeted scraping of facial images to build recognition databases',
        means: 'Art. 5(1)(e): prohibited since 2025-02-02, no carve-out.',
      },
      {
        value: 'f',
        label: 'Inferring emotions at work or in education',
        means: 'Art. 5(1)(f): prohibited since 2025-02-02. Narrow carve-out: medical or safety reasons.',
      },
      {
        value: 'g',
        label: 'Biometric categorisation to infer sensitive traits such as race, beliefs or sexual orientation',
        means: 'Art. 5(1)(g): prohibited since 2025-02-02. Narrow carve-out: lawfully acquired datasets; law-enforcement categorisation.',
      },
      {
        value: 'h',
        label: 'Real-time remote biometric identification in public spaces for law enforcement',
        means: 'Art. 5(1)(h): prohibited since 2025-02-02. Narrow carve-out: three objectives, with prior authorisation (Art. 5(2) to 5(7)).',
      },
      NONE('No practice on the original Art. 5 list.'),
    ],
  },
  {
    id: 'art5-carveout',
    step: 'prohibited',
    kind: 'single',
    prompt: 'For each practice you ticked that has a narrow carve-out, does that carve-out apply?',
    hint: 'Points (d), (f), (g) and (h) each have one narrow carve-out, named under the option. The other points have none.',
    article: 'Art. 5(1)(d), (f), (g), (h)',
    eurLex: 'art_5',
    section: 'Prohibited practices (Article 5)',
    basis: [
      'If a practice is on the list, no mitigation makes it lawful.',
      'Narrow carve-out',
      'counsel confirms that the obligation was read correctly',
    ],
    showIf: { q: 'art5', in: ['d', 'f', 'g', 'h'] },
    askWhen: 'Ask when you ticked point (d), (f), (g) or (h).',
    options: [
      {
        value: 'applies',
        label: 'Yes, the carve-out applies to each such practice ticked',
        means: 'The carve-out is relied on: the record keeps it and the facts behind it, for counsel to confirm.',
      },
      {
        value: 'does-not-apply',
        label: 'No',
        means: 'Outside the carve-out, no mitigation makes the practice lawful.',
      },
      {
        value: 'unsure',
        label: 'Not sure',
        means: 'Until the carve-out is confirmed, the triage treats the practice as prohibited.',
      },
    ],
  },
  {
    id: 'generation',
    step: 'prohibited',
    kind: 'single',
    prompt: 'Can the system generate or manipulate realistic images, video or audio?',
    hint: 'From 2026-12-02, Art. 5 also bans generating or manipulating realistic intimate imagery of an identifiable person without explicit consent, and child sexual abuse material. The test turns on the intended purpose, foreseeability and the safeguards.',
    article: 'Art. 5(1)(ba), (bb), Art. 5(1a)',
    eurLex: 'art_5',
    section: 'Prohibited practices (Article 5)',
    basis: [
      'Generating or manipulating realistic intimate imagery of an identifiable person without explicit consent',
      'Generating or manipulating child sexual abuse material (Directive 2011/93/EU)',
      'Placing such a generator on the market is prohibited only where that output is its intended purpose, or where the output is "a reasonably foreseeable and reproducible outcome" and the system lacks "reasonable and adequate technical safety measures" to prevent it and correct observed misuse; use is prohibited only where the deployer uses it for that purpose',
      'The evidence that the safeguard holds is therefore part of the legal test.',
      '| 2026-12-02 |',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system.',
    options: [
      {
        value: 'no',
        label: 'No',
        means: 'Points (ba) and (bb) do not arise.',
      },
      {
        value: 'purpose',
        label: 'Yes, and producing such imagery or material is its intended purpose, or the deployer uses it for that',
        means: 'Prohibited from 2026-12-02 (Art. 5(1)(ba) or (bb)).',
      },
      {
        value: 'unsafe',
        label: 'Yes; such output is a reasonably foreseeable and reproducible outcome, and the system lacks reasonable and adequate technical safety measures to prevent it and correct observed misuse',
        means: 'Placing it on the market is prohibited from 2026-12-02 (Art. 5(1a)).',
      },
      {
        value: 'safeguarded',
        label: 'Yes; such output is foreseeable, but reasonable and adequate technical safety measures prevent it and correct observed misuse',
        means: 'Not prohibited on these answers, as long as the safeguard holds: the evidence that it holds is part of the legal test.',
      },
      {
        value: 'not-foreseeable',
        label: 'Yes, but such output is not a reasonably foreseeable and reproducible outcome',
        means: 'Not prohibited on these answers; keep the evaluation that shows it.',
      },
    ],
  },

  // ---- 5. High-risk ----
  {
    id: 'annex1',
    step: 'high-risk',
    kind: 'single',
    prompt: 'Is the system a product, or a component of a product, covered by the Union harmonisation legislation in Annex I?',
    hint: 'Section A covers products such as toys, lifts, radio equipment, medical devices and in vitro diagnostics; Section B covers sectoral regimes such as civil aviation and vehicles. Machinery moved to Section B with the Omnibus.',
    article: 'Art. 6(1), Annex I',
    eurLex: 'anx_I',
    section: 'High-risk through products (Annex I)',
    basis: [
      'Section A of Annex I covers products such as toys, lifts, radio equipment, medical devices and in vitro diagnostics; Section B covers sectoral regimes such as civil aviation and vehicles',
      'Machinery moved to Section B',
      'Post-Omnibus, only Art. 6(1), Art. 60a and Arts. 102 to 112 apply',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system.',
    options: [
      { value: 'no', label: 'No', means: 'The Annex I route does not arise.' },
      {
        value: 'section-a',
        label: 'Yes, under Annex I, Section A',
        means: 'The Art. 6(1) route: two conditions follow.',
      },
      {
        value: 'section-b',
        label: 'Yes, under Annex I, Section B',
        means: 'The Art. 6(1) route; for Section B products, only Art. 6(1), Art. 60a and Arts. 102 to 112 of the Act apply.',
      },
      {
        value: 'unsure',
        label: 'Not sure',
        means: 'Left open: check the product’s legislation against Annex I.',
      },
    ],
  },
  {
    id: 'annex1-safety',
    step: 'high-risk',
    kind: 'single',
    prompt: 'Is it the product itself, or a safety component in the Act’s narrowed sense?',
    hint: 'After the Omnibus, a safety component must have the intended purpose of preventing or mitigating risks to health and safety, or be one whose failure endangers them.',
    article: 'Art. 3(14), Art. 6(1a), 6(1b)',
    eurLex: 'art_6',
    section: 'High-risk through products (Annex I)',
    basis: [
      'it is a safety component of a product, or is itself a product, covered by the Union harmonisation legislation in Annex I',
      'A safety component must now have the intended purpose of preventing or mitigating risks to health and safety, or be one whose failure endangers them',
      'AI used solely for user assistance, performance optimisation, efficiency, automation, convenience or quality control is not a safety component unless its failure would endanger health and safety',
    ],
    showIf: { q: 'annex1', in: ['section-a', 'section-b'] },
    askWhen: 'Ask when the product is covered by Annex I.',
    options: [
      {
        value: 'product',
        label: 'The AI system is itself the product',
        means: 'First Art. 6(1) condition met: the system is itself a product covered by Annex I.',
      },
      {
        value: 'safety-purpose',
        label: 'Its intended purpose is to prevent or mitigate risks to health and safety',
        means: 'A safety component (Art. 3(14) as amended): first Art. 6(1) condition met.',
      },
      {
        value: 'failure-endangers',
        label: 'Its failure or malfunction would endanger health and safety',
        means: 'A safety component whatever its stated function (Art. 6(1b)): first Art. 6(1) condition met.',
      },
      {
        value: 'non-safety',
        label: 'It is used solely for user assistance, performance optimisation, efficiency, automation, convenience or quality control, and its failure would not endanger health and safety',
        means: 'Not a safety component (Art. 6(1a)): the Annex I route does not apply.',
      },
    ],
  },
  {
    id: 'annex1-tpa',
    step: 'high-risk',
    kind: 'single',
    prompt: 'Must that product undergo a third-party conformity assessment under that legislation?',
    hint: 'Only an assessment required for health and safety counts. One required only for other reasons, such as radio spectrum, does not.',
    article: 'Art. 6(1)(b), Art. 6(1c)',
    eurLex: 'art_6',
    section: 'High-risk through products (Annex I)',
    basis: [
      'that product must undergo a third-party conformity assessment under that legislation',
      'A third-party assessment required only for non-safety reasons, such as radio spectrum, does not count',
      'The Annex I route applies from 2 Aug 2028',
    ],
    showIf: { q: 'annex1-safety', in: ['product', 'safety-purpose', 'failure-endangers'] },
    askWhen: 'Ask when it is the product itself or a safety component.',
    options: [
      {
        value: 'yes',
        label: 'Yes, for health and safety reasons',
        means: 'Both Art. 6(1) conditions hold: high-risk through Annex I, from 2028-08-02.',
      },
      {
        value: 'non-safety-only',
        label: 'Yes, but only for reasons other than health and safety, such as radio spectrum',
        means: 'Does not count (Art. 6(1c)): the Annex I route does not apply.',
      },
      {
        value: 'no',
        label: 'No',
        means: 'The second Art. 6(1) condition fails: the Annex I route does not apply.',
      },
      {
        value: 'unsure',
        label: 'Not sure',
        means: 'Left open: the Annex I route turns on this answer.',
      },
    ],
  },
  {
    id: 'annex3',
    step: 'high-risk',
    kind: 'multi',
    prompt: 'Does its intended purpose fall in one of the eight Annex III areas?',
    hint: 'Tick an area only if the use it lists matches the intended purpose. The Commission can add use cases to Annex III by delegated act (Art. 7), so the list here carries the question set’s version.',
    article: 'Art. 6(2), Annex III',
    eurLex: 'anx_III',
    section: 'High-risk through use (Annex III)',
    basis: [
      'Under Art. 6(2), Annex III lists eight areas. A system whose intended purpose falls in one of them is high-risk unless the Art. 6(3) filter takes it out',
      'Remote biometric identification (not one-to-one verification), biometric categorisation by sensitive attributes, emotion recognition',
      'Safety components in critical digital infrastructure, road traffic, and the supply of water, gas, heating or electricity',
      'Admission, evaluating learning outcomes, assessing the level of education, detecting prohibited behaviour in tests',
      'Recruitment and selection, decisions on terms, promotion or termination, task allocation, monitoring and evaluating performance',
      'Eligibility for public benefits, creditworthiness and credit scoring (not fraud detection), life and health insurance pricing, emergency call triage and dispatch',
      'Victim risk, polygraphs, evidence reliability, offending risk not based solely on profiling, profiling in investigations',
      'Polygraphs, risk assessment of persons, examining applications, detecting or identifying persons (not travel-document checks)',
      'Assisting judicial authorities with facts and law (and ADR), influencing elections or voting behaviour',
      'The Commission can add use cases to Annex III by delegated act (Art. 7)',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system.',
    options: [
      {
        value: 'biometrics',
        label: '1. Biometrics: remote biometric identification (not one-to-one verification), biometric categorisation by sensitive attributes, emotion recognition',
        means: 'Annex III, point 1: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'critical-infrastructure',
        label: '2. Critical infrastructure: safety components in critical digital infrastructure, road traffic, and the supply of water, gas, heating or electricity',
        means: 'Annex III, point 2: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'education',
        label: '3. Education and vocational training: admission, evaluating learning outcomes, assessing the level of education, detecting prohibited behaviour in tests',
        means: 'Annex III, point 3: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'employment',
        label: '4. Employment and workers’ management: recruitment and selection, decisions on terms, promotion or termination, task allocation, monitoring and evaluating performance',
        means: 'Annex III, point 4: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'essential-services',
        label: '5. Essential private and public services: eligibility for public benefits, creditworthiness and credit scoring (not fraud detection), life and health insurance pricing, emergency call triage and dispatch',
        means: 'Annex III, point 5: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'law-enforcement',
        label: '6. Law enforcement: victim risk, polygraphs, evidence reliability, offending risk not based solely on profiling, profiling in investigations',
        means: 'Annex III, point 6: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'migration',
        label: '7. Migration, asylum and border control: polygraphs, risk assessment of persons, examining applications, detecting or identifying persons (not travel-document checks)',
        means: 'Annex III, point 7: high-risk unless the Art. 6(3) filter takes it out.',
      },
      {
        value: 'justice-democracy',
        label: '8. Administration of justice and democratic processes: assisting judicial authorities with facts and law (and ADR), influencing elections or voting behaviour',
        means: 'Annex III, point 8: high-risk unless the Art. 6(3) filter takes it out.',
      },
      NONE('The Annex III route does not arise.'),
    ],
  },
  {
    id: 'art6-3',
    step: 'high-risk',
    kind: 'multi',
    prompt: 'Does one of the four Art. 6(3) conditions hold, so that it does not materially influence the outcome of decision-making?',
    hint: 'The filter takes an Annex III system out only where it does not pose a significant risk of harm to health, safety or fundamental rights. Tick the condition you rely on.',
    article: 'Art. 6(3)',
    eurLex: 'art_6',
    section: 'The Annex III filter and the profiling override',
    basis: [
      'an Annex III system is not high-risk where it does not pose a significant risk of harm to health, safety or fundamental rights, including by not materially influencing the outcome of decision-making',
      'the system performs a narrow procedural task',
      'it improves the result of a previously completed human activity',
      'it detects decision-making patterns or deviations without replacing or influencing the completed human assessment without proper human review',
      'it performs a preparatory task to an assessment relevant to an Annex III use case',
    ],
    showIf: IN_ANNEX_III,
    askWhen: 'Ask when you ticked an Annex III area.',
    options: [
      {
        value: 'narrow-procedural-task',
        label: 'It performs a narrow procedural task',
        means: 'First Art. 6(3) condition claimed.',
      },
      {
        value: 'improves-human-activity',
        label: 'It improves the result of a previously completed human activity',
        means: 'Second Art. 6(3) condition claimed.',
      },
      {
        value: 'detects-patterns',
        label: 'It detects decision-making patterns or deviations without replacing or influencing the completed human assessment without proper human review',
        means: 'Third Art. 6(3) condition claimed.',
      },
      {
        value: 'preparatory-task',
        label: 'It performs a preparatory task to an assessment relevant to an Annex III use case',
        means: 'Fourth Art. 6(3) condition claimed.',
      },
      NONE('No condition claimed: the filter cannot take it out.'),
    ],
  },
  {
    id: 'profiling',
    step: 'high-risk',
    kind: 'single',
    prompt: 'Does the system profile natural persons?',
    hint: 'One override beats all four conditions. State the answer explicitly: the record keeps it as a flag.',
    article: 'Art. 6(3), third subparagraph',
    eurLex: 'art_6',
    section: 'The Annex III filter and the profiling override',
    basis: [
      'One override beats all four: an Annex III system that profiles natural persons is always high-risk',
      'The explicit profiling flag is the point: the filter was claimed, and the override defeated it.',
    ],
    showIf: IN_ANNEX_III,
    askWhen: 'Ask when you ticked an Annex III area.',
    options: [
      {
        value: 'yes',
        label: 'Yes',
        means: 'Always high-risk, whatever condition is claimed: the override beats all four.',
      },
      {
        value: 'no',
        label: 'No',
        means: 'The override does not apply: a condition, if one holds, can take the system out.',
      },
      {
        value: 'unsure',
        label: 'Not sure',
        means: 'Until the profiling flag is settled, the triage does not apply the filter.',
      },
    ],
  },

  // ---- 6. Transparency ----
  {
    id: 'art50',
    step: 'transparency',
    kind: 'multi',
    prompt: 'Does the system fit one of the Article 50 cases?',
    hint: 'One system can sit on two rungs at once: an Annex III chatbot carries both the high-risk duties and the Art. 50 disclosure duty.',
    article: 'Art. 50',
    eurLex: 'art_50',
    section: 'Transparency cases (Article 50)',
    basis: [
      'It applies to any AI system that fits one of its cases, whatever else the system is',
      'interacts directly with people',
      'People must know it is AI, unless obvious',
      'generates synthetic audio, image, video or text',
      'Machine-readable, detectable marking',
      'emotion recognition or biometric categorisation',
      'Inform the people exposed',
      'deep fakes',
      'Disclose the manipulation (lighter for evident art or satire)',
      'AI text informing the public',
      'Disclose, unless human editorial responsibility',
      'One system can sit on two rungs at once: an Annex III chatbot carries both the high-risk duties and the Art. 50 disclosure duty.',
    ],
    showIf: SYSTEM,
    askWhen: 'Ask when you triage an AI system.',
    options: [
      {
        value: 'interacts',
        label: 'It interacts directly with people',
        means: 'Art. 50(1), a provider duty: people must know it is AI, unless obvious.',
      },
      {
        value: 'synthetic',
        label: 'It generates synthetic audio, image, video or text',
        means: 'Art. 50(2), a provider duty: machine-readable, detectable marking.',
      },
      {
        value: 'emotion-biometric',
        label: 'It performs emotion recognition or biometric categorisation',
        means: 'Art. 50(3), a deployer duty: inform the people exposed.',
      },
      {
        value: 'deepfake',
        label: 'It generates or manipulates deep fakes',
        means: 'Art. 50(4), a deployer duty: disclose the manipulation (lighter for evident art or satire).',
      },
      {
        value: 'public-text',
        label: 'It generates text published to inform the public',
        means: 'Art. 50(4), a deployer duty: disclose, unless a human holds editorial responsibility.',
      },
      NONE('No Article 50 case.'),
    ],
  },

  // ---- 7. General-purpose AI models ----
  {
    id: 'gpai',
    step: 'gpai',
    kind: 'single',
    prompt: 'Is it a general-purpose AI model?',
    hint: 'A GPAI model displays significant generality, competently performs a wide range of distinct tasks and can be integrated into a variety of downstream systems.',
    article: 'Art. 3(63)',
    eurLex: 'art_3',
    section: 'Model, system and the indicative criterion',
    basis: [
      'displays significant generality and is capable of competently performing a wide range of distinct tasks" and can be integrated into a variety of downstream systems, excluding models used for research, development or prototyping before they are placed on the market',
      "The Commission's guidelines give an indicative criterion: training compute above 10^23 FLOP and the ability to generate language (text or audio), text-to-image or text-to-video",
      'Model-level duties',
      'Arts. 51 to 56',
    ],
    showIf: MODEL,
    askWhen: 'Ask when you triage a model (alone or with a system).',
    options: [
      {
        value: 'yes',
        label: 'Yes: it displays significant generality and competently performs a wide range of distinct tasks',
        means: 'A GPAI model (Art. 3(63)): the model-level duties apply to its provider.',
      },
      {
        value: 'indicative',
        label: 'It meets the guidelines’ indicative criterion: training compute above 10^23 FLOP, and it generates language (text or audio), text-to-image or text-to-video',
        means: 'The Commission guidelines give this as an indicative criterion; the triage treats it as a GPAI model.',
      },
      {
        value: 'research',
        label: 'It is used only for research, development or prototyping before being placed on the market',
        means: 'Outside the Art. 3(63) definition while it stays there.',
      },
      {
        value: 'no',
        label: 'No',
        means: 'Not a GPAI model: the model-level duties of Arts. 51 to 56 do not apply to it.',
      },
    ],
  },
  {
    id: 'gpai-compute',
    step: 'gpai',
    kind: 'single',
    prompt: 'What is its cumulative training compute, and has the Commission designated it?',
    hint: 'High-impact capabilities are presumed above 10^25 FLOP of cumulative training compute, a threshold the Commission can amend.',
    article: 'Art. 51, Art. 52',
    eurLex: 'art_51',
    section: 'Systemic risk: threshold, notification, designation',
    basis: [
      'A GPAI model has systemic risk if it has high-impact capabilities, or if the Commission designates it on the Annex XIII criteria',
      'High-impact capabilities are presumed above 10^25 FLOP of cumulative training compute, a threshold the Commission can amend',
      'The provider must notify the Commission within two weeks of meeting the threshold or knowing it will, and may argue that the model exceptionally presents no systemic risk',
      'an alert when planned compute will cross the threshold, because the two-week clock can start before training ends',
      'cumulative training FLOP per model lineage, with the estimation method',
    ],
    showIf: IS_GPAI,
    askWhen: 'Ask when it is a GPAI model.',
    options: [
      {
        value: 'above',
        label: 'Above 10^25 FLOP',
        means: 'Presumed to have high-impact capabilities: systemic risk (Art. 51(2)). Notify the Commission within two weeks; the provider may argue that the model exceptionally presents no systemic risk (Art. 52).',
      },
      {
        value: 'planned-above',
        label: 'Below today, but planned training will cross 10^25 FLOP',
        means: 'The two-week notification clock can start before training ends: plan for the systemic-risk duties now.',
      },
      {
        value: 'designated',
        label: 'The Commission designated it on the Annex XIII criteria',
        means: 'Systemic risk by designation (Art. 51(1)).',
      },
      {
        value: 'below',
        label: 'Below 10^25 FLOP, not planned to cross it, and not designated',
        means: 'No systemic risk on these answers: the duties of every GPAI provider apply.',
      },
      {
        value: 'unknown',
        label: 'Not known',
        means: 'Left open: keep a compute ledger, cumulative training FLOP per model lineage with the estimation method.',
      },
    ],
  },
  {
    id: 'gpai-origin',
    step: 'gpai',
    kind: 'single',
    prompt: 'Did you train the model, or modify (for example fine-tune) someone else’s?',
    hint: 'A modifier becomes the provider of a new GPAI model only if the change is significant for generality, capabilities or systemic risk. This is a different test from Art. 25, on a different object.',
    article: 'Art. 3(63), Art. 53',
    eurLex: 'art_53',
    section: 'When a fine-tuner becomes a GPAI provider',
    basis: [
      'A modifier becomes the provider of a new GPAI model only if the change is significant for generality, capabilities or systemic risk.',
      'modification compute above one third of the original training compute (or, if unknown, a third of 10^25 FLOP for a systemic-risk original and of 10^23 FLOP otherwise)',
      "the modifier's duties are then limited to the modification and its data",
      'Two tests, two objects, two registry fields.',
    ],
    showIf: { all: [IS_GPAI, { q: 'activity', in: ['develop'] }] },
    askWhen: 'Ask when it is a GPAI model that you develop or have developed.',
    options: [
      {
        value: 'trained',
        label: 'We trained it',
        means: 'You are the provider of the GPAI model.',
      },
      {
        value: 'modified-above',
        label: 'We modified it with more than one third of the original training compute (if unknown: a third of 10^25 FLOP for a systemic-risk original, of 10^23 FLOP otherwise)',
        means: 'Provider of a new GPAI model on the guidelines’ indicative criterion; your duties are limited to the modification and its data.',
      },
      {
        value: 'modified-below',
        label: 'We modified it with less compute than that',
        means: 'Not a new GPAI model on the guidelines’ indicative criterion: the model duties stay with the original provider.',
      },
    ],
  },
  {
    id: 'gpai-open',
    step: 'gpai',
    kind: 'single',
    prompt: 'Is the model released under a free and open-source licence, with its weights, architecture and usage information public?',
    hint: 'The carve-out never covers a systemic-risk model, and monetisation defeats it.',
    article: 'Art. 53(2), Art. 54(6)',
    eurLex: 'art_53',
    section: 'Open-source carve-outs and their limits',
    basis: [
      'is exempt from Art. 53(1)(a) and (b) and from the authorised-representative duty',
      'The exemption never covers a systemic-risk model, and the copyright policy and training summary still apply',
      'Monetisation defeats it: the guidelines treat dual licensing, paid support without which the model cannot be used, and exclusive paid hosting as monetisation',
    ],
    showIf: IS_GPAI,
    askWhen: 'Ask when it is a GPAI model.',
    options: [
      {
        value: 'yes',
        label: 'Yes, and it is not monetised',
        means: 'Exempt from Art. 53(1)(a) and (b) and from the authorised-representative duty, unless it has systemic risk; the copyright policy and training summary still apply.',
      },
      {
        value: 'monetised',
        label: 'Yes, but it is monetised: dual licensing, paid support without which it cannot be used, or exclusive paid hosting',
        means: 'Monetisation defeats the carve-out.',
      },
      { value: 'no', label: 'No', means: 'No open-source carve-out.' },
    ],
  },
];

// ---- Rules ------------------------------------------------------------------------

interface RuleBase {
  id: string;
  when: Condition;
  /** Why, in the chapter's terms: shown with the outcome and kept in the record. */
  reason: string;
  /** The article the outcome rests on. */
  article: string;
  section: string;
  basis: readonly string[];
  /** The condition in words, for the worksheet without JavaScript. */
  explain: string;
}

export interface ClassRule extends RuleBase {
  cls: TriageClass;
  /** ISO date the rung's duties apply from, where the chapter gives one. */
  appliesFrom?: string;
}

export interface RoleRule extends RuleBase {
  role: TriageRole;
}

export interface ScopeRule extends RuleBase {
  scope: Exclude<ScopeStatus, 'in-scope'>;
}

export interface NoteRule extends RuleBase {
  /** `open`: a decision or check is still missing. `info`: a consequence to act on. */
  kind: 'open' | 'info';
}

const LISTED_NO_CARVEOUT = ['a', 'b', 'c', 'e'];
const LISTED_WITH_CARVEOUT = ['d', 'f', 'g', 'h'];
const NOT_SYSTEM_RUNG: Condition = {
  not: { cls: ['prohibited', 'high-risk-annex-i', 'high-risk-annex-iii', 'transparency-art50'] },
};

/** Evaluated in order; a rule may test classes derived by earlier rules. */
export const classRules: readonly ClassRule[] = [
  {
    id: 'prohibited-listed',
    cls: 'prohibited',
    when: { q: 'art5', in: LISTED_NO_CARVEOUT },
    appliesFrom: '2025-02-02',
    reason: 'A practice on the Art. 5 list with no carve-out. It may not be placed on the market, put into service or used, and no mitigation makes it lawful.',
    article: 'Art. 5(1)',
    section: 'Prohibited practices (Article 5)',
    basis: [
      'May not be placed on the market, put into service or used',
      'If a practice is on the list, no mitigation makes it lawful.',
    ],
    explain: 'You ticked point (a), (b), (c) or (e) of Art. 5.',
  },
  {
    id: 'prohibited-carveout-not-confirmed',
    cls: 'prohibited',
    when: {
      all: [{ q: 'art5', in: LISTED_WITH_CARVEOUT }, { not: { q: 'art5-carveout', in: ['applies'] } }],
    },
    appliesFrom: '2025-02-02',
    reason: 'A practice on the Art. 5 list whose narrow carve-out is not confirmed. Outside the carve-out, no mitigation makes it lawful.',
    article: 'Art. 5(1)',
    section: 'Prohibited practices (Article 5)',
    basis: ['If a practice is on the list, no mitigation makes it lawful.', 'Narrow carve-out'],
    explain: 'You ticked point (d), (f), (g) or (h) of Art. 5 and did not confirm its carve-out.',
  },
  {
    id: 'prohibited-generation',
    cls: 'prohibited',
    when: { q: 'generation', in: ['purpose', 'unsafe'] },
    appliesFrom: '2026-12-02',
    reason: 'One of the two practices the Omnibus added (intimate imagery without consent, child sexual abuse material): prohibited from 2026-12-02.',
    article: 'Art. 5(1)(ba), (bb)',
    section: 'Prohibited practices (Article 5)',
    basis: [
      'Intimate imagery without consent and child sexual abuse material, from 2026-12-02',
      'Placing such a generator on the market is prohibited only where that output is its intended purpose',
    ],
    explain: 'Such output is the generator’s intended purpose or use, or a foreseeable outcome without reasonable and adequate safeguards.',
  },
  {
    id: 'high-risk-annex-i',
    cls: 'high-risk-annex-i',
    when: {
      all: [
        { q: 'annex1', in: ['section-a', 'section-b'] },
        { q: 'annex1-safety', in: ['product', 'safety-purpose', 'failure-endangers'] },
        { q: 'annex1-tpa', in: ['yes'] },
      ],
    },
    appliesFrom: '2028-08-02',
    reason: 'Both Art. 6(1) conditions hold: a safety component of an Annex I product, or the product itself, that must undergo a third-party conformity assessment. The Annex I route applies from 2028-08-02.',
    article: 'Art. 6(1)',
    section: 'High-risk through products (Annex I)',
    basis: [
      'A system is high-risk under Art. 6(1) when both conditions hold',
      'The Annex I route applies from 2 Aug 2028',
    ],
    explain: 'Annex I product, the system is the product or a safety component, and a third-party assessment is required for health and safety.',
  },
  {
    id: 'high-risk-annex-iii-profiling',
    cls: 'high-risk-annex-iii',
    when: { all: [IN_ANNEX_III, { q: 'profiling', in: ['yes'] }] },
    appliesFrom: '2027-12-02',
    reason: 'An Annex III system that profiles natural persons is always high-risk: the override beats all four Art. 6(3) conditions.',
    article: 'Art. 6(2), Art. 6(3), third subparagraph',
    section: 'The Annex III filter and the profiling override',
    basis: [
      'One override beats all four: an Annex III system that profiles natural persons is always high-risk',
      '2027-12-02 (Annex III)',
    ],
    explain: 'An Annex III area is ticked and the system profiles natural persons.',
  },
  {
    id: 'high-risk-annex-iii-no-condition',
    cls: 'high-risk-annex-iii',
    when: { all: [IN_ANNEX_III, { q: 'art6-3', in: ['none'] }] },
    appliesFrom: '2027-12-02',
    reason: 'An Annex III use with no Art. 6(3) condition claimed: high-risk.',
    article: 'Art. 6(2)',
    section: 'High-risk through use (Annex III)',
    basis: [
      'A system whose intended purpose falls in one of them is high-risk unless the Art. 6(3) filter takes it out',
      '2027-12-02 (Annex III)',
    ],
    explain: 'An Annex III area is ticked and no Art. 6(3) condition is claimed.',
  },
  {
    id: 'high-risk-annex-iii-profiling-open',
    cls: 'high-risk-annex-iii',
    when: { all: [IN_ANNEX_III, { q: 'profiling', in: ['unsure'] }] },
    appliesFrom: '2027-12-02',
    reason: 'An Annex III use whose profiling flag is not settled: the filter is not applied until it is.',
    article: 'Art. 6(2), Art. 6(3)',
    section: 'The Annex III filter and the profiling override',
    basis: [
      'A system whose intended purpose falls in one of them is high-risk unless the Art. 6(3) filter takes it out',
      'The explicit profiling flag is the point',
    ],
    explain: 'An Annex III area is ticked and the profiling answer is "not sure".',
  },
  {
    id: 'transparency',
    cls: 'transparency-art50',
    when: {
      q: 'art50',
      in: ['interacts', 'synthetic', 'emotion-biometric', 'deepfake', 'public-text'],
    },
    appliesFrom: '2026-08-02',
    reason: 'Fits an Article 50 case, whatever else the system is. The information must reach people at the latest at first interaction or exposure; the article has applied since 2026-08-02.',
    article: 'Art. 50',
    section: 'Transparency cases (Article 50)',
    basis: [
      'It applies to any AI system that fits one of its cases, whatever else the system is',
      'The information must reach people at the latest at first interaction or exposure',
      'The article has applied since 2 Aug 2026',
    ],
    explain: 'You ticked at least one Article 50 case.',
  },
  {
    id: 'minimal',
    cls: 'minimal',
    when: { all: [SYSTEM, NOT_SYSTEM_RUNG] },
    appliesFrom: '2025-02-02',
    reason: 'Everything else is minimal risk: nothing specific beyond AI literacy (Art. 4), and voluntary codes of conduct (Art. 95). Minimal is a legal category, not a risk verdict: data protection, consumer, product-liability and anti-discrimination law still apply.',
    article: 'Arts. 4, 95',
    section: 'Minimal risk',
    basis: [
      'Everything else is minimal risk. The Act asks nothing specific of it beyond AI literacy (Art. 4) and invites voluntary codes of conduct (Art. 95)',
      '"Minimal" is a legal category, not a risk verdict: data protection, consumer, product-liability and anti-discrimination law still apply',
    ],
    explain: 'An AI system on no other rung.',
  },
  {
    id: 'gpai',
    cls: 'gpai',
    when: { all: [MODEL, IS_GPAI] },
    appliesFrom: '2025-08-02',
    reason: 'A general-purpose AI model. GPAI obligations have applied since 2025-08-02 and Commission fines under Art. 101 since 2026-08-02; models placed on the market before 2025-08-02 must comply by 2027-08-02.',
    article: 'Art. 3(63), Arts. 53, 54',
    section: 'The Code of Practice and enforcement',
    basis: [
      'GPAI obligations have applied since 2 Aug 2025, Commission fines under Art. 101 since 2 Aug 2026, and models placed on the market before 2 Aug 2025 must comply by 2 Aug 2027',
    ],
    explain: 'The model is a GPAI model, or meets the guidelines’ indicative criterion.',
  },
  {
    id: 'gpai-systemic-presumed',
    cls: 'gpai-systemic',
    when: { all: [MODEL, { q: 'gpai-compute', in: ['above'] }] },
    appliesFrom: '2025-08-02',
    reason: 'Presumed to have high-impact capabilities above 10^25 FLOP of cumulative training compute. Notify the Commission within two weeks; the provider may argue that the model exceptionally presents no systemic risk.',
    article: 'Art. 51(2), Art. 52',
    section: 'Systemic risk: threshold, notification, designation',
    basis: [
      'High-impact capabilities are presumed above 10^25 FLOP of cumulative training compute',
      'The provider must notify the Commission within two weeks of meeting the threshold or knowing it will',
    ],
    explain: 'Cumulative training compute above 10^25 FLOP.',
  },
  {
    id: 'gpai-systemic-designated',
    cls: 'gpai-systemic',
    when: { all: [MODEL, { q: 'gpai-compute', in: ['designated'] }] },
    appliesFrom: '2025-08-02',
    reason: 'Designated by the Commission on the Annex XIII criteria.',
    article: 'Art. 51(1)',
    section: 'Systemic risk: threshold, notification, designation',
    basis: ['or if the Commission designates it on the Annex XIII criteria'],
    explain: 'The Commission designated the model.',
  },
  {
    id: 'gpai-systemic-planned',
    cls: 'gpai-systemic',
    when: { all: [MODEL, { q: 'gpai-compute', in: ['planned-above'] }] },
    reason: 'Planned training will cross 10^25 FLOP: the presumption applies once it does, and the two-week notification clock can start before training ends.',
    article: 'Art. 51(2), Art. 52',
    section: 'Systemic risk: threshold, notification, designation',
    basis: [
      'The provider must notify the Commission within two weeks of meeting the threshold or knowing it will',
      'because the two-week clock can start before training ends',
    ],
    explain: 'Planned training will cross 10^25 FLOP.',
  },
];

/** Evaluated after the classes, in order. */
export const roleRules: readonly RoleRule[] = [
  {
    id: 'provider-develops',
    role: 'eu-provider',
    when: { all: [SYSTEM, { q: 'activity', in: ['develop'] }] },
    reason: 'You develop the system, or have it developed, and place it on the market or put it into service under your own name. Putting into service includes own use.',
    article: 'Art. 3(3)',
    section: 'The EU operator roles',
    basis: [
      'Develops an AI system or GPAI model, or has one developed, and places it on the market or into service under its own name',
      'includes own use',
    ],
    explain: 'You develop the AI system, or have it developed, under your own name.',
  },
  {
    id: 'provider-downstream',
    role: 'eu-provider',
    when: { all: [SYSTEM, { q: 'activity', in: ['integrate'] }] },
    reason: 'A downstream provider carries the provider duties for the system it builds.',
    article: 'Art. 3(68)',
    section: 'The EU operator roles',
    basis: ['Provider duties for the system'],
    explain: 'You integrate an AI model into the system.',
  },
  {
    id: 'provider-article-25',
    role: 'eu-provider',
    when: { all: [{ q: 'art25', in: ['name', 'substantial', 'purpose'] }, HIGH_RISK] },
    reason: 'An Art. 25(1) trigger on a high-risk system makes you its provider, with all of the Art. 16 duties.',
    article: 'Art. 25(1)',
    section: 'Article 25: when someone else becomes the provider',
    basis: ['becomes the provider of a high-risk system, with all of the Art. 16 duties, in three cases'],
    explain: 'You ticked an Art. 25(1) trigger and the system is high-risk.',
  },
  {
    id: 'downstream-provider',
    role: 'eu-downstream-provider',
    when: { all: [SYSTEM, { q: 'activity', in: ['integrate'] }] },
    reason: 'You integrate an AI model, your own or a third party’s, into the AI system.',
    article: 'Art. 3(68)',
    section: 'The EU operator roles',
    basis: ["Integrates an AI model, its own or a third party's, into an AI system"],
    explain: 'You integrate an AI model into the system.',
  },
  {
    id: 'deployer',
    role: 'eu-deployer',
    when: { all: [SYSTEM, { q: 'activity', in: ['use'] }] },
    reason: 'You use the AI system under your authority, other than for personal, non-professional use.',
    article: 'Art. 3(4)',
    section: 'The EU operator roles',
    basis: ['Uses an AI system under its authority, other than for personal, non-professional use'],
    explain: 'You use the AI system in a professional activity.',
  },
  {
    id: 'importer',
    role: 'eu-importer',
    when: { all: [SYSTEM, { q: 'activity', in: ['import'] }] },
    reason: 'EU-based, you place on the market a system bearing a non-EU provider’s name.',
    article: 'Art. 3(6)',
    section: 'The EU operator roles',
    basis: ["EU-based; places on the market a system bearing a non-EU provider's name"],
    explain: 'You import the system.',
  },
  {
    id: 'distributor',
    role: 'eu-distributor',
    when: { all: [SYSTEM, { q: 'activity', in: ['distribute'] }] },
    reason: 'You make the system available without being its provider or importer.',
    article: 'Art. 3(7)',
    section: 'The EU operator roles',
    basis: ['Makes a system available without being its provider or importer'],
    explain: 'You distribute the system.',
  },
  {
    id: 'authorised-representative',
    role: 'eu-authorised-representative',
    when: { q: 'activity', in: ['represent'] },
    reason: 'EU-based, you act under a written mandate from a non-EU provider.',
    article: 'Art. 3(5)',
    section: 'The EU operator roles',
    basis: ['EU-based, with a written mandate from a non-EU provider'],
    explain: 'You act as authorised representative.',
  },
  {
    id: 'product-manufacturer',
    role: 'eu-product-manufacturer',
    when: {
      all: [
        { q: 'activity', in: ['product'] },
        { q: 'annex1', in: ['section-a'] },
        { cls: ['high-risk-annex-i'] },
      ],
    },
    reason: 'You place a high-risk safety component with your Annex I, Section A product under your own name: the provider duties of Art. 16 are yours.',
    article: 'Art. 25(3)',
    section: 'The EU operator roles',
    basis: ['Places a high-risk safety component with its Annex I, Section A product under its own name'],
    explain: 'You place it with your own Annex I, Section A product, and it is high-risk through Annex I.',
  },
  {
    id: 'gpai-provider',
    role: 'eu-gpai-provider',
    when: {
      all: [
        MODEL,
        { q: 'activity', in: ['develop'] },
        { cls: ['gpai'] },
        { not: { q: 'gpai-origin', in: ['modified-below'] } },
      ],
    },
    reason: 'You are the provider of a general-purpose AI model: Arts. 53 to 55 apply to you.',
    article: 'Art. 53',
    section: 'Duties of every GPAI provider',
    basis: ['The provider of a GPAI model'],
    explain: 'You develop a GPAI model, or modified one above the indicative criterion.',
  },
];

/** Evaluated after classes and roles; the first `out-of-scope` rule that holds
 *  decides the scope, and every holding rule adds its reason. */
export const scopeRules: readonly ScopeRule[] = [
  {
    id: 'not-an-ai-system',
    scope: 'out-of-scope',
    when: { q: 'inference', in: ['rules-only'] },
    reason: 'Not an AI system on the definition screen: the Commission guidelines exclude systems based on rules defined solely by natural persons. The guidelines are not binding, so record the element that fails and the reasoning.',
    article: 'Art. 3(1)',
    section: 'What counts as an AI system',
    basis: [
      'The guidelines exclude systems based on rules defined solely by natural persons',
      'The guidelines are not binding',
    ],
    explain: 'The system only applies rules defined solely by natural persons.',
  },
  {
    id: 'model-not-gpai',
    scope: 'out-of-scope',
    when: { all: [{ q: 'object', in: ['model'] }, { q: 'gpai', in: ['no'] }] },
    reason: 'A model that is not a GPAI model carries no model-level duties, and a model is not an AI system on its own.',
    article: 'Art. 3(63)',
    section: 'Model, system and the indicative criterion',
    basis: [
      'a model is not an AI system on its own and needs further components, such as a user interface, to become one',
    ],
    explain: 'You triage a model alone and it is not a GPAI model.',
  },
  {
    id: 'model-research',
    scope: 'out-of-scope',
    when: { all: [{ q: 'object', in: ['model'] }, { q: 'gpai', in: ['research'] }] },
    reason: 'A model used for research, development or prototyping before it is placed on the market is outside the GPAI model definition.',
    article: 'Art. 3(63)',
    section: 'Model, system and the indicative criterion',
    basis: [
      'excluding models used for research, development or prototyping before they are placed on the market',
    ],
    explain: 'You triage a model alone and it is still in research, development or prototyping.',
  },
  {
    id: 'no-eu-link',
    scope: 'out-of-scope',
    when: { q: 'reach', in: ['none'] },
    reason: 'No placement on the EU market, no deployer in the Union and no output used in the Union: Art. 2(1) does not reach it on these answers.',
    article: 'Art. 2(1)',
    section: 'Who is in scope',
    basis: [
      "Article 2(1) reaches providers placing AI systems or GPAI models on the EU market, wherever they are established; deployers in the Union; providers and deployers in third countries whose system's output is used in the Union",
    ],
    explain: 'None of the Art. 2(1) links holds.',
  },
  {
    id: 'excluded-military',
    scope: 'out-of-scope',
    when: { q: 'exclusions', in: ['military'] },
    reason: 'Used exclusively for military, defence or national security purposes. A dual-use system is in scope for its other uses.',
    article: 'Art. 2(3)',
    section: 'What the Act excludes',
    basis: [
      'The exclusion covers systems used exclusively for those purposes; a dual-use system is in scope for its other uses',
    ],
    explain: 'The military, defence or national security exclusion is claimed.',
  },
  {
    id: 'excluded-third-country-authority',
    scope: 'out-of-scope',
    when: { q: 'exclusions', in: ['third-country-authority'] },
    reason: 'A third-country public authority or international organisation in law-enforcement or judicial cooperation, with adequate safeguards for fundamental rights.',
    article: 'Art. 2(4)',
    section: 'What the Act excludes',
    basis: ['Only with adequate safeguards for fundamental rights'],
    explain: 'The third-country authority exclusion is claimed.',
  },
  {
    id: 'excluded-research',
    scope: 'out-of-scope',
    when: { q: 'exclusions', in: ['research'] },
    reason: 'Specifically developed and put into service for the sole purpose of scientific research and development.',
    article: 'Art. 2(6)',
    section: 'What the Act excludes',
    basis: [
      'The system or model must be specifically developed and put into service for that purpose alone',
    ],
    explain: 'The scientific research exclusion is claimed.',
  },
  {
    id: 'excluded-pre-market',
    scope: 'out-of-scope',
    when: { q: 'exclusions', in: ['pre-market'] },
    reason: 'Research, testing or development before placing on the market or putting into service. Testing in real-world conditions is not covered by the exclusion.',
    article: 'Art. 2(8)',
    section: 'What the Act excludes',
    basis: ['Testing in real-world conditions is not covered by the exclusion'],
    explain: 'The pre-market research and testing exclusion is claimed.',
  },
  {
    id: 'excluded-open-source',
    scope: 'out-of-scope',
    when: {
      all: [{ q: 'object', in: ['system'] }, { q: 'exclusions', in: ['open-source'] }, NOT_SYSTEM_RUNG],
    },
    reason: 'An AI system released under a free and open-source licence that is not high-risk and not caught by Art. 5 or Art. 50.',
    article: 'Art. 2(12)',
    section: 'What the Act excludes',
    basis: ['Not if placed on the market as high-risk, or caught by Art. 5 or Art. 50'],
    explain: 'The open-source exclusion is claimed and no system rung other than minimal applies.',
  },
  {
    id: 'personal-use',
    scope: 'out-of-scope',
    when: { q: 'activity', in: ['personal'] },
    reason: 'A natural person’s purely personal, non-professional use: Art. 2(10) removes the deployer obligations.',
    article: 'Art. 2(10)',
    section: 'What the Act excludes',
    basis: ['Removes deployer obligations for natural persons only'],
    explain: 'Only purely personal, non-professional use by a natural person.',
  },
  {
    id: 'definition-open',
    scope: 'undetermined',
    when: { q: 'inference', in: ['family', 'unsure'] },
    reason: 'The Art. 3(1) definition is not settled. Scope is a recorded decision, not an assumption: the triage carries on as if it were an AI system.',
    article: 'Art. 3(1)',
    section: 'What counts as an AI system',
    basis: ['For the engineer, scope is a recorded decision, not an assumption.'],
    explain: 'The inference answer is "one of the four families" or "not sure".',
  },
];

/** Consequences and open points, evaluated last. */
export const noteRules: readonly NoteRule[] = [
  {
    id: 'record-definition',
    kind: 'open',
    when: { q: 'inference', in: ['family', 'unsure'] },
    reason: 'Record the Art. 3(1) call with the element in doubt and the reasoning. A "not an AI system" call with no reasoning attached is the first thing an authority will ask about.',
    article: 'Art. 3(1)',
    section: 'What counts as an AI system',
    basis: [
      'A "not an AI system" call with no reasoning attached is the first thing an authority will ask about.',
    ],
    explain: 'The definition is not settled.',
  },
  {
    id: 'reach-by-output',
    kind: 'info',
    when: {
      all: [
        { q: 'reach', in: ['eu-output'] },
        { not: { q: 'reach', in: ['eu-market', 'eu-established'] } },
      ],
    },
    reason: 'The Act reaches it by output alone. Record where the output is used, not only where it is hosted: an agent registry that records only the hosting region cannot answer the scope question.',
    article: 'Art. 2(1)(c)',
    section: 'Who is in scope',
    basis: ['An agent registry that records only the hosting region cannot answer it.'],
    explain: 'The only EU link is output used in the Union.',
  },
  {
    id: 'pre-market-rerun',
    kind: 'info',
    when: { q: 'exclusions', in: ['pre-market'] },
    reason: 'Out of scope only for now: re-run the triage before placing on the market, putting into service or testing in real-world conditions, which the exclusion does not cover.',
    article: 'Art. 2(8)',
    section: 'What the Act excludes',
    basis: ['Testing in real-world conditions is not covered by the exclusion'],
    explain: 'The pre-market exclusion is claimed.',
  },
  {
    id: 'open-source-not-excluded',
    kind: 'info',
    when: {
      all: [
        { q: 'exclusions', in: ['open-source'] },
        { cls: ['prohibited', 'high-risk-annex-i', 'high-risk-annex-iii', 'transparency-art50'] },
      ],
    },
    reason: 'The free and open-source exclusion does not apply: not if placed on the market as high-risk, or caught by Art. 5 or Art. 50.',
    article: 'Art. 2(12)',
    section: 'What the Act excludes',
    basis: ['Not if placed on the market as high-risk, or caught by Art. 5 or Art. 50'],
    explain: 'The open-source exclusion is claimed but the system is on a rung it does not cover.',
  },
  {
    id: 'no-role',
    kind: 'open',
    when: { all: [{ noRole: true }, { scope: ['in-scope', 'undetermined'] }] },
    reason: 'No EU operator role follows from your answers. A role attaches to an activity on a specific system: re-check what your organisation does with it.',
    article: 'Art. 3(8)',
    section: 'Roles name tasks, not organisations',
    basis: ['A role attaches to an activity on a specific system, not to a company.'],
    explain: 'No role rule holds.',
  },
  {
    id: 'article-25-not-high-risk',
    kind: 'open',
    when: {
      all: [
        { q: 'art25', in: ['name', 'substantial', 'purpose'] },
        { not: HIGH_RISK },
      ],
    },
    reason: 'Art. 25(1) makes you the provider of a high-risk system only, and your high-risk answers do not put this system on that rung. Re-check the trigger or the high-risk answers.',
    article: 'Art. 25(1)',
    section: 'Article 25: when someone else becomes the provider',
    basis: ['becomes the provider of a high-risk system, with all of the Art. 16 duties, in three cases'],
    explain: 'An Art. 25(1) trigger is ticked but no high-risk class follows.',
  },
  {
    id: 'article-25-cooperation',
    kind: 'info',
    when: { all: [{ q: 'art25', in: ['name', 'substantial', 'purpose'] }, HIGH_RISK] },
    reason: 'The initial provider stops being the provider of this system but must cooperate: documentation sufficient to assess compliance, known limitations and failure modes, and targeted technical access for testing, unless it had clearly excluded any change into a high-risk system. Each trigger should fire a role re-assessment and a due-diligence ticket.',
    article: 'Art. 25(2)',
    section: 'Article 25: when someone else becomes the provider',
    basis: [
      'When a trigger fires, the initial provider stops being the provider of that system but must cooperate with the new one',
      'documentation sufficient to assess compliance, known limitations and failure modes, and targeted technical access for testing, unless the initial provider had clearly excluded any change into a high-risk system',
      'Each should fire a role re-assessment',
    ],
    explain: 'An Art. 25(1) trigger is ticked and the system is high-risk.',
  },
  {
    id: 'carve-out-relied-on',
    kind: 'info',
    when: { q: 'art5-carveout', in: ['applies'] },
    reason: 'You rely on a narrow Art. 5 carve-out: record it and the facts it rests on. The engineer builds the evidence; counsel confirms the reading.',
    article: 'Art. 5(1)',
    section: 'Prohibited practices (Article 5)',
    basis: ['The engineer builds the control and the evidence; counsel confirms that the obligation was read correctly'],
    explain: 'A carve-out is claimed.',
  },
  {
    id: 'carve-out-open',
    kind: 'open',
    when: { q: 'art5-carveout', in: ['unsure'] },
    reason: 'Confirm the Art. 5 carve-out with counsel before relying on it; until then the practice is treated as prohibited.',
    article: 'Art. 5(1)',
    section: 'Prohibited practices (Article 5)',
    basis: ['The engineer builds the control and the evidence; counsel confirms that the obligation was read correctly'],
    explain: 'The carve-out answer is "not sure".',
  },
  {
    id: 'generation-safeguard',
    kind: 'info',
    when: { q: 'generation', in: ['safeguarded', 'not-foreseeable'] },
    reason: 'For a generator, the evidence that the safeguard holds is part of the legal test: an adversarial suite of intimate-imagery and minor-safety prompts in the eval gate, with the passing runs filed as evidence before 2026-12-02.',
    article: 'Art. 5(1)(ba), (bb), Art. 5(1a)',
    section: 'Prohibited practices (Article 5)',
    basis: [
      'The evidence that the safeguard holds is therefore part of the legal test.',
      'It added an adversarial suite of intimate-imagery and minor-safety prompts to the eval gate',
    ],
    explain: 'The system can generate realistic images, video or audio and is not prohibited on these answers.',
  },
  {
    id: 'annex-i-open',
    kind: 'open',
    when: { any: [{ q: 'annex1', in: ['unsure'] }, { q: 'annex1-tpa', in: ['unsure'] }] },
    reason: 'Settle the Annex I answers: the Art. 6(1) route turns on them.',
    article: 'Art. 6(1)',
    section: 'High-risk through products (Annex I)',
    basis: ['A system is high-risk under Art. 6(1) when both conditions hold'],
    explain: 'An Annex I answer is "not sure".',
  },
  {
    id: 'annex-i-section-b',
    kind: 'info',
    when: { all: [{ q: 'annex1', in: ['section-b'] }, { cls: ['high-risk-annex-i'] }] },
    reason: 'An Annex I, Section B product: only Art. 6(1), Art. 60a and Arts. 102 to 112 of the Act apply.',
    article: 'Art. 2(2)',
    section: 'What the Act excludes',
    basis: ['Post-Omnibus, only Art. 6(1), Art. 60a and Arts. 102 to 112 apply'],
    explain: 'High-risk through an Annex I, Section B product.',
  },
  {
    id: 'annex-iii-filtered',
    kind: 'info',
    when: {
      all: [
        IN_ANNEX_III,
        {
          q: 'art6-3',
          in: [
            'narrow-procedural-task',
            'improves-human-activity',
            'detects-patterns',
            'preparatory-task',
          ],
        },
        { q: 'profiling', in: ['no'] },
      ],
    },
    reason: 'Filtered out of the high-risk rung by Art. 6(3). A provider relying on the filter must document its assessment before placing the system on the market, register it (Art. 6(4), Art. 49(2)) and hand the documentation to authorities on request. Until the Commission’s classification guidelines are final, the engineer’s defence is a good record, not a good argument.',
    article: 'Art. 6(3), Art. 6(4), Art. 49(2)',
    section: 'The Annex III filter and the profiling override',
    basis: [
      'A provider relying on the filter must document its assessment before placing the system on the market, register it (Art. 6(4), Art. 49(2)), and hand the documentation to authorities on request',
      "Until they are final, the engineer's defence is a good record, not a good argument.",
    ],
    explain: 'An Annex III area, an Art. 6(3) condition claimed and no profiling.',
  },
  {
    id: 'profiling-open',
    kind: 'open',
    when: { q: 'profiling', in: ['unsure'] },
    reason: 'State the profiling flag explicitly: it decides whether the Art. 6(3) filter can apply at all.',
    article: 'Art. 6(3)',
    section: 'The Annex III filter and the profiling override',
    basis: ['The explicit profiling flag is the point'],
    explain: 'The profiling answer is "not sure".',
  },
  {
    id: 'fria',
    kind: 'info',
    when: {
      all: [
        { role: ['eu-deployer'] },
        { cls: ['high-risk-annex-iii'] },
        { q: 'annex3', in: ANNEX_III_AREAS.filter((area) => area !== 'critical-infrastructure') },
      ],
    },
    reason: 'Before deploying an Annex III system (except point 2, critical infrastructure), a FRIA is required from deployers that are bodies governed by public law or private entities providing public services, and from deployers of credit scoring (point 5(b)) and life and health insurance pricing (point 5(c)). The duty applies from 2027-12-02.',
    article: 'Art. 27',
    section: 'Fundamental rights impact assessment (Article 27)',
    basis: [
      'Before deploying an Annex III system (except point 2, critical infrastructure), a FRIA is required from deployers that are bodies governed by public law or private entities providing public services, and from deployers of credit scoring (point 5(b)) and life and health insurance pricing (point 5(c))',
      'The duty applies from 2 Dec 2027 with the Annex III regime',
    ],
    explain: 'You deploy a high-risk Annex III system outside point 2.',
  },
  {
    id: 'two-rungs',
    kind: 'info',
    when: { all: [HIGH_RISK, { cls: ['transparency-art50'] }] },
    reason: 'One system on two rungs: the high-risk duties and the Art. 50 disclosure duty both apply.',
    article: 'Art. 6, Art. 50',
    section: 'The risk ladder',
    basis: ['One system can sit on two rungs at once'],
    explain: 'High-risk and an Article 50 case at once.',
  },
  {
    id: 'marking-grace',
    kind: 'info',
    when: { q: 'art50', in: ['synthetic'] },
    reason: 'Generative systems already on the market before 2026-08-02 have until 2026-12-02 to mark their outputs.',
    article: 'Art. 111(4)',
    section: 'Transparency cases (Article 50)',
    basis: [
      'generative systems already on the market before that date have until 2 Dec 2026 to mark outputs',
    ],
    explain: 'The system generates synthetic content.',
  },
  {
    id: 'legacy-high-risk',
    kind: 'info',
    when: HIGH_RISK,
    reason: 'A high-risk system already on the market before its Chapter III date falls under the Act only if its design changes significantly after that date; those intended for use by public authorities must comply by 2030-08-02. Log every significant change in design, with the reasoning.',
    article: 'Art. 111(2)',
    section: 'The post-Omnibus timeline',
    basis: [
      'Other high-risk systems already on the market before the Chapter III date fall under the Act only if their design changes significantly after that date',
      'Legacy high-risk systems intended for use by public authorities must comply',
      'is therefore an event the pipeline should log, with the reasoning',
    ],
    explain: 'The system is high-risk.',
  },
  {
    id: 'gpai-open-source-exempt',
    kind: 'info',
    when: { all: [{ q: 'gpai-open', in: ['yes'] }, { not: { cls: ['gpai-systemic'] } }] },
    reason: 'Open-source carve-out: exempt from Art. 53(1)(a) and (b) and from the authorised-representative duty; the copyright policy and training summary still apply.',
    article: 'Art. 53(2), Art. 54(6)',
    section: 'Open-source carve-outs and their limits',
    basis: [
      'is exempt from Art. 53(1)(a) and (b) and from the authorised-representative duty',
      'the copyright policy and training summary still apply',
    ],
    explain: 'An open-source, non-monetised GPAI model without systemic risk.',
  },
  {
    id: 'gpai-open-source-systemic',
    kind: 'info',
    when: { all: [{ q: 'gpai-open', in: ['yes'] }, { cls: ['gpai-systemic'] }] },
    reason: 'The open-source exemption never covers a systemic-risk model.',
    article: 'Art. 53(2)',
    section: 'Open-source carve-outs and their limits',
    basis: ['The exemption never covers a systemic-risk model'],
    explain: 'An open-source GPAI model with systemic risk.',
  },
  {
    id: 'gpai-compute-open',
    kind: 'open',
    when: { q: 'gpai-compute', in: ['unknown'] },
    reason: 'Keep a compute ledger: cumulative training FLOP per model lineage, with the estimation method, and an alert when planned compute will cross the threshold.',
    article: 'Art. 51(2), Art. 52',
    section: 'Systemic risk: threshold, notification, designation',
    basis: [
      'cumulative training FLOP per model lineage, with the estimation method, and an alert when planned compute will cross the threshold',
    ],
    explain: 'The training compute is not known.',
  },
  {
    id: 'gpai-modifier',
    kind: 'info',
    when: { q: 'gpai-origin', in: ['modified-above', 'modified-below'] },
    reason: 'Keep this test apart from Art. 25: fine-tuning a model changes GPAI-provider status; changing a system’s intended purpose into Annex III changes high-risk provider status. Two tests, two objects, two registry fields.',
    article: 'Art. 3(63), Art. 25',
    section: 'When a fine-tuner becomes a GPAI provider',
    basis: [
      'fine-tuning a model changes GPAI-provider status; changing a system\'s intended purpose into Annex III changes high-risk provider status. Two tests, two objects, two registry fields.',
    ],
    explain: 'You modified someone else’s GPAI model.',
  },
  {
    id: 'ai-office',
    kind: 'info',
    when: {
      all: [{ q: 'object', in: ['both'] }, { q: 'activity', in: ['develop'] }, { cls: ['gpai'] }],
    },
    reason: 'Systems built on a GPAI model by the same provider or undertaking fall under the AI Office’s exclusive competence, with exceptions (Art. 75(1)): the evidence store must answer Brussels as fast as a national authority.',
    article: 'Art. 75(1)',
    section: "The AI Office's direct powers (Articles 75 and 75a to 75d)",
    basis: [
      'systems built on a GPAI model by the same provider or undertaking',
      'If you build systems on your own GPAI model, your evidence store must answer Brussels as fast as a national authority.',
    ],
    explain: 'You develop both a GPAI model and a system on it.',
  },
];

// ---- Re-review triggers -----------------------------------------------------------

export interface ReReviewTrigger {
  id: string;
  label: string;
  article: string;
  section: string;
  basis: readonly string[];
  /** When the tool pre-selects it; omitted means never (the reader opts in). */
  suggestWhen?: Condition;
}

export const reReviewTriggers: readonly ReReviewTrigger[] = [
  {
    id: 'intended-purpose-change',
    label: 'The intended purpose changes',
    article: 'Art. 6',
    section: 'The Annex III filter and the profiling override',
    basis: ['re-evaluated whenever the intended purpose changes'],
    suggestWhen: { all: [] },
  },
  {
    id: 'brand-change',
    label: 'A white-label or brand change puts a new name on the system',
    article: 'Art. 25(1)(a)',
    section: 'Article 25: when someone else becomes the provider',
    basis: ['a white-label or brand change'],
    suggestWhen: { all: [SYSTEM, { q: 'activity', in: ['use', 'import', 'distribute'] }] },
  },
  {
    id: 'substantial-modification',
    label: 'A retrain or other change touches conformity (a possible substantial modification)',
    article: 'Art. 25(1)(b), Art. 3(23)',
    section: 'Article 25: when someone else becomes the provider',
    basis: ['a retrain that touches conformity'],
    suggestWhen: SYSTEM,
  },
  {
    id: 'annex-iii-configuration',
    label: 'A configuration change moves the intended purpose into an Annex III area',
    article: 'Art. 25(1)(c)',
    section: 'Article 25: when someone else becomes the provider',
    basis: ['a configuration change that moves intended_purpose into an Annex III value'],
    suggestWhen: { all: [SYSTEM, { not: { cls: ['high-risk-annex-iii'] } }] },
  },
  {
    id: 'eu-reach-change',
    label: 'It starts to be placed on the EU market, used in the Union, or its output used in the Union',
    article: 'Art. 2(1)',
    section: 'Who is in scope',
    basis: ['The reach is extraterritorial twice over: by placement and by output'],
    suggestWhen: { q: 'reach', in: ['none'] },
  },
  {
    id: 'annex-iii-amended',
    label: 'The Commission adds or modifies Annex III use cases by delegated act',
    article: 'Art. 7',
    section: 'High-risk through use (Annex III)',
    basis: ['The Commission can add use cases to Annex III by delegated act (Art. 7)'],
    suggestWhen: SYSTEM,
  },
  {
    id: 'classification-guidelines-final',
    label: 'The Commission’s classification guidelines under Art. 6(5) become final',
    article: 'Art. 6(5)',
    section: 'The Annex III filter and the profiling override',
    basis: ["as of 2026-09-24 the Commission's page still presents them as a draft"],
    suggestWhen: IN_ANNEX_III,
  },
  {
    id: 'compute-threshold',
    label: 'Planned or cumulative training compute approaches 10^25 FLOP',
    article: 'Art. 51(2), Art. 52',
    section: 'Systemic risk: threshold, notification, designation',
    basis: ['an alert when planned compute will cross the threshold'],
    suggestWhen: { q: 'gpai-compute', in: ['below', 'unknown', 'planned-above'] },
  },
  {
    id: 'safeguard-failure',
    label: 'An eval or red-team run shows intimate imagery or child sexual abuse material getting through',
    article: 'Art. 5(1)(ba), (bb)',
    section: 'Prohibited practices (Article 5)',
    basis: ['The first run failed on edits that increased exposure in existing photos.'],
    suggestWhen: { q: 'generation', in: ['safeguarded', 'not-foreseeable'] },
  },
  {
    id: 'significant-design-change',
    label: 'A significant change in design of a high-risk system already on the market',
    article: 'Art. 111(2)',
    section: 'The post-Omnibus timeline',
    basis: ['"Significant change in design" is therefore an event the pipeline should log'],
    suggestWhen: HIGH_RISK,
  },
  {
    id: 'leaves-research',
    label: 'It leaves research and development: placing on the market, putting into service or testing in real-world conditions',
    article: 'Art. 2(6), Art. 2(8)',
    section: 'What the Act excludes',
    basis: ['Testing in real-world conditions is not covered by the exclusion'],
    suggestWhen: { q: 'exclusions', in: ['pre-market', 'research'] },
  },
];

/** The reviewer's own reading of the record, never a claim of the tool. */
export const legalReviewStates = [
  { value: 'pending', label: 'Pending: counsel has not confirmed the reading yet' },
  { value: 'confirmed', label: 'Confirmed by counsel' },
  { value: 'not-sought', label: 'Not sought' },
] as const;

// ---- Helpers the page and the tests share ---------------------------------------------

/** Chapter text as the basis check reads it: link syntax, blockquote markers,
 *  code ticks and emphasis stars dropped, typographic quotes straightened,
 *  whitespace collapsed, lower case. */
export function plainChapterText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/[`*]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** Every item that carries `basis` fragments, for the build-time and test checks. */
export function basisItems(): { where: string; section: string; basis: readonly string[] }[] {
  return [
    ...questions.map((q) => ({ where: `question ${q.id}`, section: q.section, basis: q.basis })),
    ...classRules.map((r) => ({ where: `class rule ${r.id}`, section: r.section, basis: r.basis })),
    ...roleRules.map((r) => ({ where: `role rule ${r.id}`, section: r.section, basis: r.basis })),
    ...scopeRules.map((r) => ({ where: `scope rule ${r.id}`, section: r.section, basis: r.basis })),
    ...noteRules.map((r) => ({ where: `note rule ${r.id}`, section: r.section, basis: r.basis })),
    ...reReviewTriggers.map((t) => ({ where: `trigger ${t.id}`, section: t.section, basis: t.basis })),
  ];
}

/**
 * The hand-off to /toolkit/obligations-planner (block w2-tool-planner). The
 * planner reads `#v=1&r=<role codes>&c=<class codes>&d=<reference date>`, codes
 * joined by "."; it adds the baseline classes (all AI systems, the Art. 5
 * screen) itself and derives the GPAI classes from the GPAI roles. The codes
 * below are the planner's own (src/data/obligations-planner.ts there); the
 * spec checks them against that file once both are merged. `from` and `qs`
 * travel along as provenance and are ignored by the planner.
 */
export const plannerHandoff = {
  toolId: 'obligations-planner',
  path: '/toolkit/obligations-planner',
  version: 1,
  roleCodes: {
    'eu-provider': 'pr',
    'eu-downstream-provider': 'pr',
    'eu-product-manufacturer': 'pr',
    'eu-deployer': 'de',
    'eu-importer': 'im',
    'eu-distributor': 'di',
    'eu-authorised-representative': 'ar',
    'eu-gpai-provider': 'gp',
  } as Readonly<Record<TriageRole, string>>,
  /** A GPAI provider whose model has systemic risk hands off this role code. */
  systemicGpaiRoleCode: 'gs',
  classCodes: {
    'high-risk-annex-iii': 'h3',
    'high-risk-annex-i': 'h1',
    'transparency-art50': 'tr',
  } as Readonly<Partial<Record<TriageClass, string>>>,
} as const;

/** Keys of the link fragment that are not question ids. */
export const reservedFragmentKeys = [
  'v',
  'qs',
  'n',
  'rid',
  'p',
  'r',
  'd',
  'lr',
  't',
  'rb',
  'note',
] as const;

/**
 * The serialisable model the client module and the engine read: the question
 * graph and rules above plus the anchors the page resolves. `sectionHref`
 * maps a chapter 18 heading to its anchor (the page passes the site's slugger).
 */
export function triageModel(sectionHref: (heading: string) => string) {
  const eurLex = (anchor: string) => `${questionSet.consolidatedText}#${anchor}`;
  const withHref = <T extends { section: string }>(item: T) => ({
    ...item,
    sectionHref: sectionHref(item.section),
  });
  return {
    questionSet,
    steps,
    questions: questions.map((q) => ({ ...withHref(q), eurLexHref: eurLex(q.eurLex) })),
    classRules: classRules.map(withHref),
    roleRules: roleRules.map(withHref),
    scopeRules: scopeRules.map(withHref),
    noteRules: noteRules.map(withHref),
    reReviewTriggers: reReviewTriggers.map(withHref),
    roleLabels,
    classLabels,
    classOrder,
    legalReviewStates,
    reservedFragmentKeys,
    plannerHandoff,
  };
}

export type TriageModel = ReturnType<typeof triageModel>;
