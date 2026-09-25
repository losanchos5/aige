// jurisdictions.ts: the AI-specific legal landscape outside (and beside) the
// EU AI Act, one entry per jurisdiction, faithful to bok/21-ai-laws-worldwide.md.
//
// It feeds a future tile map: each jurisdiction carries a status that says how
// binding its AI-specific regime is, the instruments behind that status (each
// with a date, a status, a URL and the verification tag of the chapter's source)
// and a one-to-two-sentence summary in our own words. Every entry is stamped
// `asOf`; nothing here is legal advice, and the status is a reading aid, not a
// claim of conformity or a legal opinion.
//
// Codes are ISO 3166-1 alpha-2 for countries, ISO 3166-2 for US states
// (`US-CA`), `US-NYC` for New York City and `EU` for the Union.

/** How binding a jurisdiction's AI-specific regime is. */
export type JurisdictionStatus =
  | 'binding-horizontal'
  | 'binding-targeted'
  | 'voluntary'
  | 'bill';

/** Where one instrument stands on the `asOf` date. */
export type InstrumentStatus =
  | 'in-force'
  | 'adopted'
  | 'bill'
  | 'voluntary'
  | 'draft'
  | 'lapsed';

/** Verification tag, as in the chapter's Sources list (STYLEGUIDE §6). */
export type Verification = 'primary' | 'secondary' | 'reported';

export interface Instrument {
  /** Name of the law, rule, directive or framework. */
  name: string;
  /**
   * Key date (entry into force, effective date or publication), ISO 8601:
   * `YYYY-MM-DD`, or `YYYY-MM` when the source gives only the month.
   */
  date: string;
  /** Status of the instrument on the `asOf` date. */
  status: InstrumentStatus;
  /** Official or best available URL (the one the chapter cites). */
  url: string;
  /** Verification tag carried over from the chapter's source. */
  verified: Verification;
  /** Caveat on the date or status, e.g. a fact still to verify. */
  note?: string;
}

export interface Jurisdiction {
  /** Stable code: ISO 3166-1/3166-2, `US-NYC` or `EU`. */
  code: string;
  /** Display name. */
  name: string;
  /** Overall status of the AI-specific regime. */
  status: JurisdictionStatus;
  /** Instruments behind the status, most important first. */
  instruments: readonly Instrument[];
  /** One or two sentences in our own words, faithful to the chapter. */
  summary: string;
  /** Date the entry was last checked, ISO 8601. */
  asOf: string;
  /** Route and anchor of the chapter section that treats it. */
  anchor: string;
}

/** Date every entry below was checked against its sources. */
export const JURISDICTIONS_AS_OF = '2026-09-24';

/** Human labels for the four statuses, for legends and filters. */
export const statusLabels: Readonly<Record<JurisdictionStatus, string>> = {
  'binding-horizontal': 'Binding, horizontal',
  'binding-targeted': 'Binding, targeted',
  voluntary: 'Voluntary',
  bill: 'Bill',
};

/** The chapter's caveat, in its own words. */
export const jurisdictionsDisclaimer =
  'Status as of 2026-09-24. Not legal advice; mappings are illustrative, not a claim of conformity.';

const CH = '/bok/ai-laws-worldwide';
const AS_OF = JURISDICTIONS_AS_OF;

export const jurisdictions: readonly Jurisdiction[] = [
  {
    code: 'KR',
    name: 'South Korea',
    status: 'binding-horizontal',
    instruments: [
      {
        name: 'Basic Act on the Development of AI and the Establishment of a Foundation for Trust (Act No. 20676)',
        date: '2026-01-22',
        status: 'in-force',
        url: 'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543',
        verified: 'primary',
      },
      {
        name: 'Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053)',
        date: '2026-01-22',
        status: 'in-force',
        url: 'https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879',
        verified: 'primary',
      },
    ],
    summary:
      'A horizontal act with duties for high-impact and generative AI: prior notice, output labels, risk management with five-year records, a best-effort impact assessment, safety duties above 10^26 FLOP and a domestic representative for large foreign operators; fines up to KRW 30 million, held back during a guidance period of at least one year.',
    asOf: AS_OF,
    anchor: `${CH}#south-korea-the-ai-basic-act`,
  },
  {
    code: 'US',
    name: 'United States (federal)',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'OMB Memorandum M-25-21 (federal agency use of AI)',
        date: '2025-04-03',
        status: 'in-force',
        url: 'https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf',
        verified: 'primary',
      },
      {
        name: 'OMB Memorandum M-26-04 (Unbiased AI Principles in LLM procurement)',
        date: '2025-12-11',
        status: 'in-force',
        url: 'https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf',
        verified: 'primary',
      },
      {
        name: 'Executive Order 14365, Ensuring a National Policy Framework for AI',
        date: '2025-12-11',
        status: 'in-force',
        url: 'https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm',
        verified: 'primary',
      },
      {
        name: 'Executive Order 14179, Removing Barriers to American Leadership in AI',
        date: '2025-01-23',
        status: 'in-force',
        url: 'https://www.govinfo.gov/content/pkg/FR-2025-01-31/html/2025-02172.htm',
        verified: 'primary',
      },
    ],
    summary:
      'No federal AI statute binds private actors; executive orders and OMB memoranda bind federal agencies and, through procurement, their vendors, while EO 14365 drives litigation and preemption efforts against state AI laws.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-the-federal-layer`,
  },
  {
    code: 'US-CO',
    name: 'Colorado',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'SB 26-189, Automated Decision-Making Technology (replaces SB 24-205)',
        date: '2027-01-01',
        status: 'adopted',
        url: 'https://leg.colorado.gov/bills/sb26-189',
        verified: 'primary',
      },
    ],
    summary:
      'Automated decision-making technology in consequential decisions: developer documentation, deployer notice, an explanation within 30 days of an adverse outcome, human review and three-year records, enforced by the Attorney General from 1 January 2027.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'US-TX',
    name: 'Texas',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'Texas Responsible Artificial Intelligence Governance Act (HB 149)',
        date: '2026-01-01',
        status: 'in-force',
        url: 'https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf',
        verified: 'primary',
      },
    ],
    summary:
      'Intent-based prohibitions, disclosure duties for government and health care, a 36-month sandbox and Attorney General enforcement with a 60-day cure period and tiered civil penalties; no private right of action.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'US-CA',
    name: 'California',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'SB 53, Transparency in Frontier Artificial Intelligence Act',
        date: '2026-01-01',
        status: 'in-force',
        url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53',
        verified: 'primary',
      },
      {
        name: 'California AI Transparency Act (SB 942 as amended by AB 853)',
        date: '2026-08-02',
        status: 'in-force',
        url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853',
        verified: 'primary',
      },
      {
        name: 'AB 2013, Generative AI training data transparency',
        date: '2026-01-01',
        status: 'in-force',
        url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013',
        verified: 'primary',
      },
      {
        name: 'SB 243, Companion chatbots',
        date: '2025-10-13',
        status: 'adopted',
        url: 'https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243',
        verified: 'primary',
        note: 'Chaptered date; annual reporting starts on 2027-07-01.',
      },
      {
        name: 'CPPA regulations on ADMT, risk assessments and cybersecurity audits',
        date: '2026-01-01',
        status: 'in-force',
        url: 'https://cppa.ca.gov/announcements/2025/20250923.html',
        verified: 'primary',
      },
    ],
    summary:
      'Targeted statutes on frontier developers, content provenance, training-data transparency and companion chatbots, plus privacy-agency rules on automated decision-making whose duties start on 1 January 2027.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'US-NY',
    name: 'New York',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'RAISE Act (S6953B, as amended)',
        date: '2027-01-01',
        status: 'adopted',
        url: 'https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B',
        verified: 'primary',
      },
      {
        name: 'General Business Law Article 47, AI companion models',
        date: '2025-11-05',
        status: 'in-force',
        url: 'https://www.nysenate.gov/legislation/laws/GBS/A47',
        verified: 'primary',
        note: 'Text verified; commencement date still to verify against the session law.',
      },
    ],
    summary:
      'From 1 January 2027, large frontier developers publish a safety framework and every frontier developer discloses safety incidents within 72 hours; AI companion operators must run a self-harm protocol and remind users every three hours that they are not talking to a human.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'US-UT',
    name: 'Utah',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'Artificial Intelligence Policy Act as amended by SB 226 and SB 332',
        date: '2025-05-07',
        status: 'in-force',
        url: 'https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf',
        verified: 'primary',
      },
    ],
    summary:
      'Generative AI must be disclosed when a consumer clearly asks, and prominently in high-risk interactions within regulated occupations; the Act is set to repeal on 1 July 2027.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'US-IL',
    name: 'Illinois',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'HB 3773, Human Rights Act amendment on AI in employment',
        date: '2026-01-01',
        status: 'in-force',
        url: 'https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804',
        verified: 'primary',
        note: 'Public Act 103-0804; text read from a Web Archive capture, as ilga.gov refused connections on 2026-09-25.',
      },
    ],
    summary:
      'Employers may not use AI with a discriminatory effect in employment decisions and must give notice of its use; implementing rules were reported in draft.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'US-NYC',
    name: 'New York City',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'Local Law 144 of 2021, automated employment decision tools',
        date: '2023-07-05',
        status: 'in-force',
        url: 'https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page',
        verified: 'primary',
      },
    ],
    summary:
      'Automated employment decision tools need an independent bias audit less than a year old, a public summary of its results and notices to candidates and employees.',
    asOf: AS_OF,
    anchor: `${CH}#united-states-state-laws-that-bind-private-organisations`,
  },
  {
    code: 'JP',
    name: 'Japan',
    status: 'binding-horizontal',
    instruments: [
      {
        name: 'Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (Act No. 53 of 2025)',
        date: '2025-09-01',
        status: 'in-force',
        url: 'https://laws.e-gov.go.jp/law/507AC0000000053',
        verified: 'primary',
      },
      {
        name: 'AI Basic Plan (revised)',
        date: '2026-07-14',
        status: 'adopted',
        url: 'https://www8.cao.go.jp/cstp/ai/ai_plan/ai_plan.html',
        verified: 'primary',
      },
    ],
    summary:
      'A promotion law with no penalties: businesses must cooperate with government measures, and the state issues guidelines and investigates cases where AI infringed people’s rights.',
    asOf: AS_OF,
    anchor: `${CH}#japan-the-ai-promotion-act`,
  },
  {
    code: 'CN',
    name: 'China',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'Interim Measures for the Administration of Anthropomorphic Interaction Services',
        date: '2026-07-15',
        status: 'in-force',
        url: 'https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm',
        verified: 'primary',
      },
      {
        name: 'Interim Measures for the Administration of Generative AI Services',
        date: '2023-08-15',
        status: 'in-force',
        url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm',
        verified: 'primary',
      },
    ],
    summary:
      'Departmental rules by use case (recommendation, deep synthesis, generative AI, labelling and, since July 2026, emotional companion services) with filing, security assessment and labelling duties; chapter 08 maps the full set.',
    asOf: AS_OF,
    anchor: `${CH}#china-what-chapter-08-does-not-already-cover`,
  },
  {
    code: 'BR',
    name: 'Brazil',
    status: 'bill',
    instruments: [
      {
        name: 'PL 2338/2023 (AI bill; passed the Senate, in the Chamber of Deputies)',
        date: '2024-12-10',
        status: 'bill',
        url: 'https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262',
        verified: 'primary',
      },
    ],
    summary:
      'The Senate passed the AI bill in December 2024; in the Chamber a special committee was still awaiting the rapporteur’s report in September 2026.',
    asOf: AS_OF,
    anchor: `${CH}#brazil-pl-23382023-bill`,
  },
  {
    code: 'CA',
    name: 'Canada',
    status: 'binding-targeted',
    instruments: [
      {
        name: 'Directive on Automated Decision-Making',
        date: '2025-06-24',
        status: 'in-force',
        url: 'https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592',
        verified: 'primary',
      },
      {
        name: 'Artificial Intelligence and Data Act (Bill C-27)',
        date: '2025-01-06',
        status: 'lapsed',
        url: 'https://www.parl.ca/legisinfo/en/bill/44-1/c-27',
        verified: 'primary',
      },
    ],
    summary:
      'AIDA lapsed with Bill C-27; federal institutions remain bound by the Directive on Automated Decision-Making, with a published Algorithmic Impact Assessment and requirements scaled by impact level.',
    asOf: AS_OF,
    anchor: `${CH}#canada-after-aida-the-directive-on-automated-decision-making`,
  },
  {
    code: 'IN',
    name: 'India',
    status: 'voluntary',
    instruments: [
      {
        name: 'India AI Governance Guidelines',
        date: '2025-11-05',
        status: 'voluntary',
        url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639',
        verified: 'primary',
      },
    ],
    summary:
      'No AI act: government guidelines set seven principles and six pillars and rely on existing legislation wherever possible.',
    asOf: AS_OF,
    anchor: `${CH}#india-governance-guidelines-no-ai-act`,
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    status: 'voluntary',
    instruments: [
      {
        name: 'A pro-innovation approach to AI regulation: government response',
        date: '2024-02-06',
        status: 'voluntary',
        url: 'https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response',
        verified: 'primary',
      },
      {
        name: 'Algorithmic Transparency Recording Standard (mandatory for government departments)',
        date: '2025-05-08',
        status: 'in-force',
        url: 'https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub',
        verified: 'primary',
        note: 'Date is the last update of the ATRS hub, not the start of the mandate.',
      },
      {
        name: 'AI Cyber Security Code of Practice',
        date: '2025-01-31',
        status: 'voluntary',
        url: 'https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice',
        verified: 'primary',
      },
    ],
    summary:
      'No horizontal AI statute: five principles applied by existing regulators, a mandatory transparency standard for central government and a voluntary security code; automated decisions fall under the data-protection Articles 22A to 22D.',
    asOf: AS_OF,
    anchor: `${CH}#united-kingdom-principles-regulators-and-public-sector-records`,
  },
  {
    code: 'IT',
    name: 'Italy',
    status: 'binding-horizontal',
    instruments: [
      {
        name: 'Law No. 132 of 23 September 2025 on artificial intelligence',
        date: '2025-10-10',
        status: 'in-force',
        url: 'https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg',
        verified: 'primary',
      },
    ],
    summary:
      'A national law applied consistently with the EU AI Act: parental consent under 14, worker and client information, AgID and ACN as national authorities and a criminal offence for harmful deepfakes.',
    asOf: AS_OF,
    anchor: `${CH}#italy-law-1322025`,
  },
  {
    code: 'ES',
    name: 'Spain',
    status: 'bill',
    instruments: [
      {
        name: 'Draft bill for the good use and governance of AI (first reading 11 March 2025)',
        date: '2025-03-11',
        status: 'bill',
        url: 'https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx',
        verified: 'primary',
      },
      {
        name: 'Royal Decree 817/2023, AI regulatory sandbox',
        date: '2023-11-09',
        status: 'in-force',
        url: 'https://www.boe.es/eli/es/rd/2023/11/08/817',
        verified: 'primary',
      },
      {
        name: 'AESIA guides from the sandbox pilot',
        date: '2026-09-24',
        status: 'voluntary',
        url: 'https://aesia.digital.gob.es/es/guias',
        verified: 'primary',
        note: 'Living page; the date is the check date, not the publication date.',
      },
    ],
    summary:
      'The EU AI Act applies; the national bill that sets sanctions and allocates supervisors to AESIA and sector authorities was not adopted as of the check date, while the sandbox and 16 non-binding guides are live.',
    asOf: AS_OF,
    anchor: `${CH}#spain-aesia-the-sandbox-and-a-bill`,
  },
  {
    code: 'SG',
    name: 'Singapore',
    status: 'voluntary',
    instruments: [
      {
        name: 'Model AI Governance Framework for Agentic AI (v1.5)',
        date: '2026-05-20',
        status: 'voluntary',
        url: 'https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf',
        verified: 'primary',
      },
      {
        name: 'Model AI Governance Framework for Generative AI',
        date: '2024-05',
        status: 'voluntary',
        url: 'https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf',
        verified: 'primary',
      },
      {
        name: 'AI Verify Testing Framework',
        date: '2026-09-24',
        status: 'voluntary',
        url: 'https://aiverifyfoundation.sg/what-is-ai-verify/',
        verified: 'primary',
        note: 'Living page; the date is the check date, not the publication date.',
      },
    ],
    summary:
      'Voluntary model frameworks, now including one for agentic AI with four dimensions, and the AI Verify testing framework against 11 governance principles.',
    asOf: AS_OF,
    anchor: `${CH}#singapore-model-frameworks-and-ai-verify`,
  },
  {
    code: 'AU',
    name: 'Australia',
    status: 'voluntary',
    instruments: [
      {
        name: 'National AI Plan',
        date: '2025-12',
        status: 'adopted',
        url: 'https://www.industry.gov.au/publications/national-ai-plan/keep-australians-safe',
        verified: 'primary',
      },
    ],
    summary:
      'No AI act: the government relies on existing, largely technology-neutral law, an AI Safety Institute that advises regulators and the six practices of its Guidance for AI Adoption.',
    asOf: AS_OF,
    anchor: `${CH}#australia-existing-law-and-voluntary-guidance`,
  },
  {
    code: 'EU',
    name: 'European Union',
    status: 'binding-horizontal',
    instruments: [
      {
        name: 'Regulation (EU) 2024/1689 (AI Act), as amended by Regulation (EU) 2026/1744',
        date: '2024-08-01',
        status: 'in-force',
        url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
        verified: 'primary',
      },
    ],
    summary:
      'The reference horizontal regime, treated in chapter 18 and mapped in chapter 08; the rest of this dataset is read against it.',
    asOf: AS_OF,
    anchor: '/bok/eu-ai-act',
  },
];

/** Look up one jurisdiction by code. */
export function jurisdictionByCode(code: string): Jurisdiction | undefined {
  return jurisdictions.find((j) => j.code === code);
}

/** Jurisdictions grouped by status, in legend order. */
export function jurisdictionsByStatus(): Readonly<Record<JurisdictionStatus, readonly Jurisdiction[]>> {
  const pick = (status: JurisdictionStatus): readonly Jurisdiction[] =>
    jurisdictions.filter((j) => j.status === status);
  return {
    'binding-horizontal': pick('binding-horizontal'),
    'binding-targeted': pick('binding-targeted'),
    voluntary: pick('voluntary'),
    bill: pick('bill'),
  };
}
