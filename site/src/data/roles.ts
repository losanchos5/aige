// roles.ts: the cross-regime role table, faithful to bok/18-eu-ai-act.md
// ("Who you are in the value chain"). One row per role per regime: the EU AI Act
// operator roles (Regulation (EU) 2024/1689 as amended by Regulation (EU)
// 2026/1744), the developer/deployer split in Colorado SB 26-189 and Texas
// HB 149, the Korean AI Basic Act's business-operator roles, and the ISO/IEC
// 22989 stakeholder vocabulary.
//
// Rules for this file:
// - `definition` and `duties` are paraphrases in our own words, never quoted
//   statutory or standard text. ISO/IEC material is referenced by identifier
//   and short title only.
// - `nearestEuRole` is the chapter's own mapping, not a legal equivalence.
// - `verify: true` marks a row whose detail could not be confirmed against the
//   primary text as of 2026-09-24 (the chapter tags the same claim "(verify)").
// - Roles name tasks, not organisations: one organisation can hold several
//   roles for one system, and different roles for different systems.
// Mappings are illustrative, not a claim of conformity.

/** The regimes the role table covers. */
export type RoleRegime =
  | 'eu-ai-act'
  | 'colorado-sb26-189'
  | 'texas-hb149'
  | 'korea-ai-basic-act'
  | 'iso-iec-22989';

export interface Regime {
  /** Short id. */
  id: RoleRegime;
  /** Display name. */
  name: string;
  /** Legal status in one line, stamped as of the chapter's date. */
  status: string;
  /** Primary source for the regime's role definitions. */
  sourceUrl: string;
}

export interface Role {
  /** Short, unique id (`regime-role`). */
  id: string;
  /** The regime the role belongs to. */
  regime: RoleRegime;
  /** The role's name as the regime spells it (in English). */
  role: string;
  /** What the role covers, in our own words. */
  definition: string;
  /** Where the regime defines the role (article, section or clause). */
  sourceRef: string;
  /** Summary of the duties the role carries, in our own words. */
  duties: string;
  /** The nearest EU AI Act role, as this book maps it (illustrative). */
  nearestEuRole?: string;
  /**
   * Events that make an actor in this role the provider of a high-risk AI
   * system (EU AI Act Art. 25(1) and (3)), where the regime has such a rule.
   */
  becomesProviderWhen?: readonly string[];
  /** `#slug` (without the hash) of the chapter section that explains the row. */
  anchor: string;
  /** True when a detail of the row is still marked "(verify)" in the chapter. */
  verify?: boolean;
}

/** Where the role table lives. */
export const rolesChapterPath = '/bok/eu-ai-act';

/** The chapter's caveat, in its own words. */
export const rolesDisclaimer =
  'Roles name tasks, not organisations. Mappings are illustrative, not a claim of conformity.';

const EU_ROLES_ANCHOR = 'the-eu-operator-roles';
const ART_25_ANCHOR = 'article-25-when-someone-else-becomes-the-provider';
const CROSS_REGIME_ANCHOR = 'the-same-roles-across-regimes';

const EU_URL = 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng';

/** The Art. 25(1) triggers that turn a distributor, importer, deployer or other third party into a provider. */
const ART_25_1_TRIGGERS: readonly string[] = [
  'It puts its name or trademark on a high-risk AI system already on the market (Art. 25(1)(a)).',
  'It makes a substantial modification to a high-risk AI system that remains high-risk (Art. 25(1)(b)).',
  'It changes the intended purpose of a non-high-risk AI system, including a general-purpose AI system, so that it becomes high-risk (Art. 25(1)(c)).',
];

export const regimes: readonly Regime[] = [
  {
    id: 'eu-ai-act',
    name: 'EU AI Act (post-Omnibus)',
    status:
      'Regulation (EU) 2024/1689 as amended by Regulation (EU) 2026/1744; high-risk Annex III duties from 2027-12-02, Annex I from 2028-08-02.',
    sourceUrl: EU_URL,
  },
  {
    id: 'colorado-sb26-189',
    name: 'Colorado SB 26-189',
    status:
      'Signed 2026-05-14; duties for covered automated decision-making technology from 2027-01-01.',
    sourceUrl: 'https://leg.colorado.gov/bills/sb26-189',
  },
  {
    id: 'texas-hb149',
    name: 'Texas HB 149 (TRAIGA)',
    status: 'In force 2026-01-01.',
    sourceUrl: 'https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf',
  },
  {
    id: 'korea-ai-basic-act',
    name: 'Korea AI Basic Act',
    status:
      'Act No. 21311 as amended 2026-01-20, in force since 2026-07-21; first in force 2026-01-22.',
    sourceUrl: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791',
  },
  {
    id: 'iso-iec-22989',
    name: 'ISO/IEC 22989:2022',
    status: 'International standard (vocabulary); no legal force.',
    sourceUrl: 'https://www.iso.org/standard/74296.html',
  },
];

export const roles: readonly Role[] = [
  // EU AI Act operator roles.
  {
    id: 'eu-provider',
    regime: 'eu-ai-act',
    role: 'Provider',
    definition:
      'Develops an AI system or general-purpose AI model, or has one developed, and places it on the EU market or puts it into service under its own name or trademark, paid or free.',
    sourceRef: 'EU AI Act Art. 3(3)',
    duties:
      'For high-risk systems: the requirements of Arts. 8 to 15, a quality management system, documentation and logs, conformity assessment, declaration, CE marking, registration, post-market monitoring and serious-incident reporting (Arts. 16 to 21, 43 to 49, 72, 73); transparency by design under Art. 50(1) and (2).',
    nearestEuRole: 'Provider',
    anchor: EU_ROLES_ANCHOR,
  },
  {
    id: 'eu-deployer',
    regime: 'eu-ai-act',
    role: 'Deployer',
    definition:
      'Uses an AI system under its own authority, other than for a purely personal, non-professional activity.',
    sourceRef: 'EU AI Act Art. 3(4)',
    duties:
      'For high-risk systems: use per the instructions, competent human oversight, input-data relevance, monitoring, log retention of at least six months, worker and affected-person notices, registration by public bodies (Art. 26); a FRIA for public bodies, public-service providers, credit scoring and life or health insurance pricing (Art. 27); explanations on request (Art. 86); deep-fake and emotion-recognition notices (Art. 50(3), (4)).',
    nearestEuRole: 'Deployer',
    becomesProviderWhen: ART_25_1_TRIGGERS,
    anchor: EU_ROLES_ANCHOR,
  },
  {
    id: 'eu-importer',
    regime: 'eu-ai-act',
    role: 'Importer',
    definition:
      'Established in the Union and places on the market an AI system bearing the name or trademark of a provider established outside the Union.',
    sourceRef: 'EU AI Act Art. 3(6)',
    duties:
      'Before placing a high-risk system on the market, verify the conformity assessment, technical documentation, CE marking, declaration, instructions and authorised representative; add its own contact details; keep certificates and the declaration for 10 years; cooperate with authorities (Art. 23).',
    nearestEuRole: 'Importer',
    becomesProviderWhen: ART_25_1_TRIGGERS,
    anchor: EU_ROLES_ANCHOR,
  },
  {
    id: 'eu-distributor',
    regime: 'eu-ai-act',
    role: 'Distributor',
    definition:
      'Makes an AI system available on the Union market without being its provider or importer.',
    sourceRef: 'EU AI Act Art. 3(7)',
    duties:
      'Verify CE marking, declaration and instructions before making a high-risk system available; hold back or correct non-conforming systems; keep storage and transport from compromising compliance; cooperate with authorities (Art. 24).',
    nearestEuRole: 'Distributor',
    becomesProviderWhen: ART_25_1_TRIGGERS,
    anchor: EU_ROLES_ANCHOR,
  },
  {
    id: 'eu-authorised-representative',
    regime: 'eu-ai-act',
    role: 'Authorised representative',
    definition:
      'A person established in the Union acting under a written mandate from a provider established outside it.',
    sourceRef: 'EU AI Act Art. 3(5)',
    duties:
      'Verify the declaration, documentation and conformity assessment; keep documents for 10 years; answer and cooperate with authorities; terminate the mandate and inform the authority if the provider breaches (Art. 22 for high-risk systems; Art. 54 for general-purpose AI models).',
    nearestEuRole: 'Authorised representative',
    anchor: EU_ROLES_ANCHOR,
  },
  {
    id: 'eu-product-manufacturer',
    regime: 'eu-ai-act',
    role: 'Product manufacturer',
    definition:
      'Places on the market or puts into service an AI system together with its product, under its own name or trademark.',
    sourceRef: 'EU AI Act Art. 2(1)(e), Art. 25(3)',
    duties:
      'Carries the provider duties of Art. 16 for a high-risk AI safety component of an Annex I, Section A product placed or put into service under its name.',
    nearestEuRole: 'Provider',
    becomesProviderWhen: [
      "The high-risk AI system is placed on the market with the product under the product manufacturer's name or trademark (Art. 25(3)(a)).",
      "The high-risk AI system is put into service under the product manufacturer's name or trademark after the product is on the market (Art. 25(3)(b)).",
    ],
    anchor: ART_25_ANCHOR,
  },
  {
    id: 'eu-gpai-provider',
    regime: 'eu-ai-act',
    role: 'General-purpose AI model provider',
    definition:
      'The provider of a model that shows significant generality and can competently perform a wide range of distinct tasks.',
    sourceRef: 'EU AI Act Art. 3(3), Art. 3(63), Art. 53',
    duties:
      'Technical documentation, information for downstream providers, a copyright policy and a public training-content summary (Art. 53); an EU authorised representative if established outside the Union (Art. 54); for systemic-risk models, notification, evaluation with adversarial testing, systemic-risk mitigation, serious-incident reporting and cybersecurity (Arts. 52, 55).',
    nearestEuRole: 'Provider (of a model)',
    anchor: EU_ROLES_ANCHOR,
  },
  {
    id: 'eu-downstream-provider',
    regime: 'eu-ai-act',
    role: 'Downstream provider',
    definition:
      'The provider of an AI system that integrates an AI model, whether its own or one supplied by another entity.',
    sourceRef: 'EU AI Act Art. 3(68)',
    duties:
      'Provider duties for the system it places on the market; relies on the model information the general-purpose AI model provider must supply (Art. 53(1)(b), Annex XII).',
    nearestEuRole: 'Provider (of a system)',
    anchor: EU_ROLES_ANCHOR,
  },

  // Colorado SB 26-189.
  {
    id: 'co-developer',
    regime: 'colorado-sb26-189',
    role: 'Developer',
    definition:
      'Creates automated decision-making technology used to materially influence consequential decisions about individuals.',
    sourceRef: 'Colorado SB 26-189',
    duties: 'Give deployers technical documentation and notify them of material updates.',
    nearestEuRole: 'Provider',
    anchor: CROSS_REGIME_ANCHOR,
  },
  {
    id: 'co-deployer',
    regime: 'colorado-sb26-189',
    role: 'Deployer',
    definition:
      'Uses covered automated decision-making technology in consequential decisions: access to, eligibility for or compensation in education, employment, housing, financial or lending services, insurance, health care, or essential government services and benefits.',
    sourceRef: 'Colorado SB 26-189',
    duties: 'Give consumer notices and keep compliance records for at least three years.',
    nearestEuRole: 'Deployer',
    anchor: CROSS_REGIME_ANCHOR,
  },

  // Texas HB 149 (TRAIGA).
  {
    id: 'tx-developer',
    regime: 'texas-hb149',
    role: 'Developer',
    definition:
      'Develops an AI system that is offered, sold, leased, given or otherwise provided in Texas.',
    sourceRef: 'Texas HB 149, Sec. 552.001',
    duties:
      "Subject to the Act's intent-based prohibitions on developing or deploying AI (for example to manipulate people toward self-harm, harm or crime, or to discriminate unlawfully), enforced by the Attorney General; the social-scoring ban binds only governmental entities (Sec. 552.053).",
    nearestEuRole: 'Provider',
    anchor: CROSS_REGIME_ANCHOR,
  },
  {
    id: 'tx-deployer',
    regime: 'texas-hb149',
    role: 'Deployer',
    definition: 'Deploys an AI system for use in Texas.',
    sourceRef: 'Texas HB 149, Sec. 552.001',
    duties:
      "Subject to the Act's intent-based prohibitions, enforced by the Attorney General; the AI-use disclosure duty falls only on governmental agencies and on providers of health care services or treatment (Sec. 552.051).",
    nearestEuRole: 'Deployer',
    anchor: CROSS_REGIME_ANCHOR,
  },

  // Korea AI Basic Act.
  {
    id: 'kr-development-operator',
    regime: 'korea-ai-basic-act',
    role: 'AI development business operator',
    definition: 'An AI business operator that develops and provides AI.',
    sourceRef: 'Korea AI Basic Act Art. 2(7)(a)',
    duties:
      'Prior notice to users of high-impact or generative AI, labelling of generated output, safety measures for systems above a compute threshold set by decree, a high-impact check, risk management, explanation, user protection and human oversight measures for high-impact AI, and a domestic representative for qualifying foreign operators (Arts. 31 to 36).',
    nearestEuRole: 'Provider',
    anchor: CROSS_REGIME_ANCHOR,
  },
  {
    id: 'kr-utilisation-operator',
    regime: 'korea-ai-basic-act',
    role: 'AI utilisation business operator',
    definition:
      'An AI business operator that offers AI products or services built on AI provided by a development business operator.',
    sourceRef: 'Korea AI Basic Act Art. 2(7)(b)',
    duties:
      'The same operator duties as a development business operator where they apply to the product or service it offers (Arts. 31 to 36).',
    nearestEuRole: 'Downstream provider or deployer, depending on who it serves',
    anchor: CROSS_REGIME_ANCHOR,
  },
  {
    id: 'kr-user',
    regime: 'korea-ai-basic-act',
    role: 'User',
    definition: 'A person who receives an AI product or AI service.',
    sourceRef: 'Korea AI Basic Act Art. 2(8)',
    duties: "None under the Act; the recipient of the operators' notices.",
    nearestEuRole: 'No EU duty holder',
    anchor: CROSS_REGIME_ANCHOR,
  },
  {
    id: 'kr-affected-person',
    regime: 'korea-ai-basic-act',
    role: 'Affected person',
    definition:
      'A person whose life, physical safety or fundamental rights are significantly affected by an AI product or service.',
    sourceRef: 'Korea AI Basic Act Art. 2(9)',
    duties:
      "None; the Act's basic principles say an affected person should be able to obtain a clear, meaningful explanation as far as technically and reasonably possible (Art. 3(2)).",
    nearestEuRole: 'Affected person (protected)',
    anchor: CROSS_REGIME_ANCHOR,
  },

  // ISO/IEC 22989 stakeholder roles (vocabulary; no legal duties).
  {
    id: 'iso-ai-provider',
    regime: 'iso-iec-22989',
    role: 'AI provider',
    definition: 'An organisation that provides AI products or services.',
    sourceRef: 'ISO/IEC 22989:2022, AI stakeholder roles (clause 5.19, verify)',
    duties: 'No legal duties; a vocabulary role useful in contracts and management systems.',
    nearestEuRole: 'Provider',
    anchor: CROSS_REGIME_ANCHOR,
    verify: true,
  },
  {
    id: 'iso-ai-producer',
    regime: 'iso-iec-22989',
    role: 'AI producer',
    definition: 'An organisation that designs, develops, tests and deploys AI products or services.',
    sourceRef: 'ISO/IEC 22989:2022, AI stakeholder roles (clause 5.19, verify)',
    duties: 'No legal duties; a vocabulary role useful in contracts and management systems.',
    nearestEuRole: 'Provider (developer side)',
    anchor: CROSS_REGIME_ANCHOR,
    verify: true,
  },
  {
    id: 'iso-ai-customer',
    regime: 'iso-iec-22989',
    role: 'AI customer',
    definition: 'An organisation or person that uses an AI product or service.',
    sourceRef: 'ISO/IEC 22989:2022, AI stakeholder roles (clause 5.19, verify)',
    duties: 'No legal duties; a vocabulary role useful in contracts and management systems.',
    nearestEuRole: 'Deployer',
    anchor: CROSS_REGIME_ANCHOR,
    verify: true,
  },
  {
    id: 'iso-ai-partner',
    regime: 'iso-iec-22989',
    role: 'AI partner',
    definition:
      'An organisation that contributes services around AI, such as system integration, data supply, evaluation or audit.',
    sourceRef: 'ISO/IEC 22989:2022, AI stakeholder roles (clause 5.19, verify)',
    duties: 'No legal duties; a vocabulary role useful in contracts and management systems.',
    nearestEuRole: 'No single EU role (often a supplier under Art. 25(4))',
    anchor: CROSS_REGIME_ANCHOR,
    verify: true,
  },
  {
    id: 'iso-ai-subject',
    regime: 'iso-iec-22989',
    role: 'AI subject',
    definition: 'A person or organisation affected by an AI system, including data subjects.',
    sourceRef: 'ISO/IEC 22989:2022, AI stakeholder roles (clause 5.19, verify)',
    duties: 'No legal duties; a vocabulary role useful in contracts and management systems.',
    nearestEuRole: 'Affected person (protected)',
    anchor: CROSS_REGIME_ANCHOR,
    verify: true,
  },
  {
    id: 'iso-relevant-authorities',
    regime: 'iso-iec-22989',
    role: 'Relevant authorities',
    definition: 'Policy makers and regulators with authority over AI.',
    sourceRef: 'ISO/IEC 22989:2022, AI stakeholder roles (clause 5.19, verify)',
    duties: 'No legal duties under the standard.',
    nearestEuRole: 'Market surveillance and other competent authorities',
    anchor: CROSS_REGIME_ANCHOR,
    verify: true,
  },
];

/** Roles for one regime, in table order. */
export function rolesForRegime(regime: RoleRegime): readonly Role[] {
  return roles.filter((r) => r.regime === regime);
}
