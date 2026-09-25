// cases.ts: publicly documented AI incidents written as engineering
// post-mortems, rendered at /cases (index) and /cases/<id> (one static page per
// case). Each case answers the same five questions: what happened, the failure
// mode, which control would have caught it, the evidence that control would
// have left behind, and the obligations the case touches today.
//
// Provenance rules for this file:
// - Every `[n]` marker in a prose field points at that case's own `sources`
//   list (1-based, local to the case, like a chapter's "## Sources").
// - Facts come from the primary source wherever one could be opened on
//   2026-09-24 (court decision, regulator release, official report, the paper,
//   the company's SEC filing). A case carried only by the press is
//   `evidence: 'reported'` and says so in its prose.
// - The "failure mode", "control" and "evidence" fields are our engineering
//   analysis, not findings of the courts or regulators cited. The pages say so.
// - AI Act application dates are as of 2026-09-24 and reuse the rows already
//   verified for chapter 08 (the AI Omnibus, Reg. (EU) 2026/1744).
import type { LayerNumber } from './stack';
import type { Source } from '../lib/sources';
import { incidents, type ControlRef, type IncidentRef } from './harms';

/** How well the case's facts are sourced: STYLEGUIDE.md §6 tags, case-wide. */
export type CaseEvidence = 'primary' | 'secondary' | 'reported';

export interface CaseObligation {
  instrument: string;
  /** The article, annex point or section, as a label. */
  ref: string;
  /** Stable id of the obligation-register row the ref names (AIGE-OBL-...),
   *  where the register has one; the case page links /obligations/<id>. */
  obligationId?: string;
  /** How the case touches it; carries `[n]` markers. */
  why: string;
}

export interface EvidenceArtefact {
  /** The artefact an auditor would read, stated concretely. */
  artefact: string;
  /** The stack layer that produces it. */
  layerN: LayerNumber;
}

export interface IncidentCase {
  /** URL slug: /cases/<id>. */
  id: string;
  title: string;
  /** Short label for breadcrumbs and cards. */
  short: string;
  year: string;
  jurisdiction: string;
  sector: string;
  evidence: CaseEvidence;
  /** One plain sentence (no markers), used on the index card and as the meta description. */
  summary: string;
  happened: readonly string[];
  failureMode: readonly string[];
  control: { text: readonly string[]; controls: readonly ControlRef[] };
  evidenceArtefacts: readonly EvidenceArtefact[];
  obligations: readonly CaseObligation[];
  /** Ids of rows in the harms atlas (./harms.ts). */
  harms: readonly string[];
  incidents: readonly IncidentRef[];
  sources: readonly Source[];
}

export const caseEvidenceLabel: Record<CaseEvidence, string> = {
  primary: 'Primary sources',
  secondary: 'Secondary sources',
  reported: 'Reported',
};

export const casesDisclaimer =
  'Each case is an illustrative engineering analysis of public records, not a legal determination, not a finding of fact beyond what the cited sources state, and not a claim of conformity. Mappings to obligations are illustrative.';

// ---- Reusable source rows ------------------------------------------------------

const src = {
  gdpr: {
    title: 'Regulation (EU) 2016/679 (General Data Protection Regulation)',
    gloss:
      "Art. 5 principles, Art. 6 lawfulness, Art. 8 child's consent, Art. 9 special categories, Arts. 12-15 transparency and access, Art. 22 automated individual decision-making, Art. 33 breach notification, Art. 35 DPIA",
    publisher: 'Official Journal of the European Union (EUR-Lex)',
    date: '2016-04-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng',
    verified: 'primary',
  },
  aiActArt5: {
    title: 'EU AI Act Art. 5',
    gloss:
      'prohibited AI practices; 5(1)(c) social scoring leading to unjustified or disproportionate detrimental treatment; 5(1)(e) facial recognition databases built by untargeted scraping',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5',
    verified: 'primary',
  },
  aiActArt113: {
    title: 'EU AI Act Art. 113',
    gloss:
      'entry into force and application; Chapters I and II apply from 2 Feb 2025, except the Art. 5 bans added by Reg. (EU) 2026/1744 (from 2 Dec 2026)',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_113',
    verified: 'primary',
  },
  aiActAnnex3: {
    title: 'EU AI Act Annex III',
    gloss:
      'high-risk uses; point 3(b) evaluating learning outcomes, 4(a) recruitment and selection, 5(a) eligibility for essential public assistance benefits and services',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III',
    verified: 'primary',
  },
  omnibus: {
    title: 'AI Omnibus enters into force',
    gloss: 'Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk obligations move to 2 Dec 2027',
    publisher: 'European Commission',
    date: '2026-07-27',
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force',
    verified: 'primary',
  },
  aiActArt10: {
    title: 'EU AI Act Art. 10',
    gloss: 'data and data governance; examination of training data for possible biases',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10',
    verified: 'primary',
  },
  aiActArt27: {
    title: 'EU AI Act Art. 27',
    gloss:
      'FRIA before first use by deployers that are bodies governed by public law or private entities providing public services, and by deployers of Annex III point 5(b) and (c) systems; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27',
    verified: 'primary',
  },
  aiActArt50: {
    title: 'EU AI Act Art. 50',
    gloss:
      'transparency; systems that interact directly with natural persons must be designed so that those persons are informed they are interacting with an AI system',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50',
    verified: 'primary',
  },
  art50Date: {
    title: 'Safer and more transparent AI',
    gloss: 'Art. 50 transparency obligations apply from 2 Aug 2026',
    publisher: 'European Commission',
    date: '2026-08-02',
    url: 'https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en',
    verified: 'primary',
  },
  aiActArt53: {
    title: 'EU AI Act Art. 53',
    gloss:
      'obligations for providers of general-purpose AI models, including a sufficiently detailed public summary of the content used for training',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53',
    verified: 'primary',
  },
  gpaiEnforcement: {
    title: "Commission's enforcement powers related to AI Act obligations for providers of the most advanced models",
    gloss: 'GPAI obligations apply since 2 Aug 2025; Commission enforcement powers from 2 Aug 2026',
    publisher: 'European Commission, AI Act Service Desk',
    date: '2026-08-02',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models',
    verified: 'primary',
  },
  aiActArt86: {
    title: 'EU AI Act Art. 86',
    gloss: 'right to explanation of individual decision-making based on the output of a high-risk AI system',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86',
    verified: 'primary',
  },
  art4Literacy: {
    title: 'AI literacy, the Digital Omnibus and Article 4 of the AI Act',
    gloss: 'Art. 4 reworded to "support the development of" AI literacy; applies from 27 Jul 2026',
    publisher: 'Law & Technology',
    date: '2026',
    url: 'https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/',
    verified: 'secondary',
  },
  nistRmf: {
    title: 'AI Risk Management Framework 1.0',
    gloss: 'functions: Govern, Map, Measure, Manage',
    publisher: 'NIST',
    date: '2023-01-26',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    verified: 'primary',
  },
  nist600: {
    title: 'Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile',
    gloss: 'NIST AI 600-1; confabulation listed among twelve generative-AI risks',
    publisher: 'NIST',
    date: '2024-07-26',
    url: 'https://doi.org/10.6028/NIST.AI.600-1',
    verified: 'primary',
  },
  duaa: {
    title: 'Data (Use and Access) Act 2025, s. 80',
    gloss: 'replaces UK GDPR Art. 22 with Arts. 22A-22D; in force 5 Feb 2026',
    publisher: 'legislation.gov.uk',
    date: '2025',
    url: 'https://www.legislation.gov.uk/ukpga/2025/18/section/80',
    verified: 'primary',
  },
  aiid: (id: string, title: string): Source => ({
    title: `AI Incident Database, Incident ${id}: ${title}`,
    publisher: 'Responsible AI Collaborative',
    date: '2026',
    url: `https://incidentdatabase.ai/cite/${id}/`,
    verified: 'primary',
  }),
} satisfies Record<string, Source | ((id: string, title: string) => Source)>;

const aiidSource = (ref: IncidentRef): Source => src.aiid(ref.id, ref.title);

// ---- The cases -------------------------------------------------------------------

export const cases: readonly IncidentCase[] = [
  {
    id: 'dutch-childcare-benefits',
    title: 'Dutch childcare benefits: nationality as a risk indicator',
    short: 'Dutch childcare benefits',
    year: '2021',
    jurisdiction: 'Netherlands',
    sector: 'Public sector: social benefits',
    evidence: 'primary',
    summary:
      "The Dutch tax administration used applicants' nationality as a risk indicator for childcare benefits; the data protection authority fined it EUR 2.75 million.",
    happened: [
      'The Dutch Tax and Customs Administration processed the nationality, and the dual nationality, of childcare-benefit applicants for years. It used Dutch or non-Dutch nationality as an indicator in a system that automatically designated certain applications as risky, and processed nationality to combat organised fraud although that data was not necessary for the purpose [1].',
      'On 7 Dec 2021 the Dutch data protection authority (AP) fined the administration EUR 2.75 million, finding the processing unlawful and discriminatory, and therefore improper under the GDPR. It said the dual-nationality data should have been deleted in January 2014, and that nationality had not been used to determine risk since October 2018 [1].',
      "Amnesty International's analysis describes an algorithmic system that built risk profiles of applicants to detect inaccurate and potentially fraudulent applications early, with nationality among the risk factors [2]. The AI Incident Database records the case as families wrongfully accused of tax fraud by a discriminatory algorithm [3].",
    ],
    failureMode: [
      'A protected characteristic was a model input. Nothing between the data and the decision checked whether a feature was lawful to use for this purpose, so a risk flag could rest on nationality.',
      'Retention failed as well: data that should have been deleted in 2014 was still within reach years later [1]. A risk model can use every attribute it can reach, so deletion is a control on the model too.',
    ],
    control: {
      text: [
        'A feature policy enforced in the pipeline catches this before the first score: a policy card listing the inputs permitted for the purpose, and an eval gate that fails the build when a prohibited attribute, or a close proxy for one, enters the feature set, or when flag rates diverge across groups. The fundamental-rights impact assessment is where the purpose, the affected groups and the permitted features are decided and signed.',
      ],
      controls: [
        { name: 'Policy Card', patternId: 'pattern-policy-card' },
        { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
        { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact:
          'Policy card for the risk model listing the permitted input features, with nationality marked prohibited for this purpose',
        layerN: 1,
      },
      {
        artefact:
          'Signed FRIA naming the affected groups, the purpose limitation and the outcome metric to monitor',
        layerN: 1,
      },
      {
        artefact:
          'Eval-gate run log in which the feature-policy check and the disaggregated flag-rate test pass or block the release',
        layerN: 3,
      },
      {
        artefact: 'Retention-job log showing the dual-nationality data deleted on schedule',
        layerN: 5,
      },
    ],
    obligations: [
      {
        instrument: 'GDPR',
        ref: 'Art. 5(1)(a), Art. 35',
        why: "The AP's finding rests on lawfulness and fairness [1]; a data protection impact assessment is the GDPR artefact that should have surfaced the nationality feature [4].",
      },
      {
        instrument: 'EU AI Act',
        ref: 'Annex III, point 5(a)',
        why: 'Systems used by or for public authorities to evaluate eligibility for essential public assistance benefits are high-risk [5]; after the AI Omnibus, Annex III obligations apply from 2 Dec 2027 (as of 2026-09-24) [6].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 27',
        obligationId: 'AIGE-OBL-EUAIA-ART27',
        why: 'A public body deploying such a system carries out a fundamental-rights impact assessment before first use [7].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 5(1)(c)',
        obligationId: 'AIGE-OBL-EUAIA-ART5',
        why: 'Social scoring that leads to unjustified or disproportionate detrimental treatment is prohibited [8]. Whether a given risk model meets those conditions is a legal judgement, not an engineering one.',
      },
    ],
    harms: ['group-risk-profiling', 'discriminatory-decisions', 'regulatory-enforcement'],
    incidents: [incidents.aiid101],
    sources: [
      {
        title: 'Tax Administration fined for discriminatory and unlawful data processing',
        gloss: 'EUR 2.75 million fine; nationality used as a risk indicator',
        publisher: 'Autoriteit Persoonsgegevens (Dutch Data Protection Authority)',
        date: '2021-12-07',
        url: 'https://www.autoriteitpersoonsgegevens.nl/en/current/tax-administration-fined-for-discriminatory-and-unlawful-data-processing',
        verified: 'primary',
      },
      {
        title:
          'Xenophobic machines: discrimination through unregulated use of algorithms in the Dutch childcare benefits scandal',
        gloss: 'EUR 35/4686/2021',
        publisher: 'Amnesty International',
        date: '2021-10-25',
        url: 'https://www.amnesty.org/en/documents/eur35/4686/2021/en/',
        verified: 'primary',
      },
      aiidSource(incidents.aiid101),
      src.gdpr,
      src.aiActAnnex3,
      src.omnibus,
      src.aiActArt27,
      src.aiActArt5,
    ],
  },
  {
    id: 'syri-judgment',
    title: 'SyRI: a fraud risk model no court could verify',
    short: 'SyRI judgment',
    year: '2020',
    jurisdiction: 'Netherlands',
    sector: 'Public sector: welfare and fraud detection',
    evidence: 'primary',
    summary:
      'A Dutch court struck down the SyRI fraud-detection legislation in 2020 because the system was insufficiently transparent and verifiable.',
    happened: [
      'SyRI (System Risk Indication) was a legal instrument the Dutch government used to detect fraud with social benefits, allowances and taxes. Data from participating public bodies were linked, pseudonymised and checked against a risk model, and matches produced risk reports on individuals [1].',
      'On 5 Feb 2020 The Hague District Court held that the SyRI legislation did not comply with Article 8(2) of the European Convention on Human Rights: it did not strike the fair balance the Convention requires, and the application of SyRI was insufficiently transparent and verifiable. The court declared the legislation to have no binding effect [1].',
      'The court noted that the State had not given it objectively verifiable information on the nature of SyRI, and that SyRI was used to investigate neighbourhoods known as problem areas [1]. The AIAAIC Repository records the case [2].',
    ],
    failureMode: [
      'Opacity was the design, not a side effect. The indicators and the risk model were not open to inspection, so neither the people flagged nor the court could check why a record matched. A control that cannot be inspected cannot be shown to be proportionate.',
      'Deployment by neighbourhood meant the population scanned was chosen before any individual suspicion existed.',
    ],
    control: {
      text: [
        'The missing artefact is an inspectable description of the model: its purpose, indicators, validation and limits, kept as control evidence rather than as a brochure. Paired with a fundamental-rights impact assessment that states the necessity and proportionality reasoning, and with evidence emitted in a machine-readable form, it gives a court or an auditor something to verify without publishing the model for gaming.',
      ],
      controls: [
        {
          name: 'Model Card as Control Evidence',
          patternId: 'pattern-model-card-as-control-evidence',
        },
        { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
        {
          name: 'Machine-Readable Evidence (OSCAL)',
          patternId: 'pattern-machine-readable-evidence-oscal',
        },
      ],
    },
    evidenceArtefacts: [
      {
        artefact:
          'Model card stating purpose, indicators, validation results and known limits, versioned with each risk model',
        layerN: 2,
      },
      {
        artefact:
          'FRIA recording the interference with private life, the necessity and proportionality reasoning, and how target areas were chosen',
        layerN: 1,
      },
      {
        artefact:
          'Per-run record of which data sources were linked, how many records were flagged and on which indicators',
        layerN: 5,
      },
      {
        artefact:
          'Machine-readable evidence package an oversight body can query without access to the raw data',
        layerN: 5,
      },
    ],
    obligations: [
      {
        instrument: 'ECHR',
        ref: 'Art. 8',
        why: "The judgment's legal basis: an interference with private life must be transparent and verifiable enough to be weighed [1].",
      },
      {
        instrument: 'GDPR',
        ref: 'Art. 22',
        why: 'Automated individual decision-making, including profiling, is restricted and carries safeguards [7].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Annex III, point 5(a); Art. 27',
        obligationId: 'AIGE-OBL-EUAIA-ART27',
        why: 'Fraud-risk scoring of benefit recipients by public authorities falls in the benefits use case [4]; Annex III obligations apply from 2 Dec 2027 (as of 2026-09-24) [5], and public deployers carry out a FRIA before first use [6].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 86',
        why: 'People affected by a decision based on a high-risk system have a right to an explanation of individual decision-making [3].',
      },
    ],
    harms: ['group-risk-profiling'],
    incidents: [incidents.aiaaicSyri],
    sources: [
      {
        title: 'NJCM et al. v. The State of the Netherlands (SyRI), C/09/550982 / HA ZA 18-388',
        gloss: 'ECLI:NL:RBDHA:2020:1878, English translation of ECLI:NL:RBDHA:2020:865',
        publisher: 'Rechtbank Den Haag (The Hague District Court)',
        date: '2020-02-05',
        url: 'https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878',
        verified: 'primary',
      },
      {
        title: 'SyRI welfare fraud detection automation',
        publisher: 'AIAAIC Repository',
        date: '2026',
        url: incidents.aiaaicSyri.url,
        verified: 'primary',
      },
      src.aiActArt86,
      src.aiActAnnex3,
      src.omnibus,
      src.aiActArt27,
      src.gdpr,
    ],
  },
  {
    id: 'a-level-grading-2020',
    title: "England's 2020 A levels: a centre model applied to individual students",
    short: '2020 A-level grades',
    year: '2020',
    jurisdiction: 'England, United Kingdom',
    sector: 'Education: assessment',
    evidence: 'primary',
    summary:
      "With exams cancelled in 2020, England's grading model assigned A-level grades from each school's history; four days after results, Ofqual reverted to teacher grades.",
    happened: [
      'With exams cancelled in 2020, schools and colleges submitted a centre assessment grade (CAG) for each student and a rank order of students in each subject [1].',
      "Ofqual's Direct Centre Performance model predicted the distribution of grades for each school or college from its historical results in the subject, taking account of the prior attainment of this year's students, then used the submitted rank order to assign grades to individual students. Where a subject cohort was small (fewer than 15 students across the current and historical entries), the model put more weight on the CAGs [1].",
      'The interim report, published on results day (13 Aug 2020), stated that 96.4% of calculated grades were the same as, or within one grade of, the CAG, and that its equalities analysis showed no evidence the process had introduced bias [1]. On 17 Aug 2020 Ofqual announced that AS and A level results, and the GCSE results due later that week, would switch to centre assessment grades [2]. The AIAAIC Repository records the case [3].',
    ],
    failureMode: [
      "The model was checked at the level it was designed for and failed at the level it was used. The headline checks in the interim report are aggregate: prediction accuracy within one grade on historical data, and an equalities analysis by group [1]. A student's grade, though, came from their school's past and their place in a rank order, so a strong student in a historically weaker centre could be held down by results they had no part in.",
      'The small-cohort rule made treatment depend on class size: small groups kept more of their teachers\' grades than large ones [1]. That is a design choice with distributional consequences, and it needed testing as one.',
    ],
    control: {
      text: [
        'An eval gate with individual-level acceptance criteria forces the question the aggregate tests skip: for which students does the model move the grade furthest from the evidence about them, and can each move be justified? A human-in-the-loop gate on large adjustments, with a contestation route before results day, turns those outliers into reviewed decisions instead of published ones. The fundamental-rights impact assessment is where the treatment of small and large cohorts would have been argued in the open.',
      ],
      controls: [
        { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
        { name: 'Human-in-the-loop Gate', patternId: 'pattern-human-in-the-loop-gate' },
        { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact:
          'Eval report slicing adjustments by cohort size, centre type and prior-attainment band, with pass criteria fixed before the run',
        layerN: 3,
      },
      {
        artefact: "Review-queue log for every adjustment beyond a set threshold, with the reviewer's decision",
        layerN: 4,
      },
      {
        artefact: 'FRIA recording the small-cohort rule, whom it favours and why it was accepted',
        layerN: 1,
      },
      {
        artefact: 'Contestation log: requests, outcomes and time to resolution',
        layerN: 5,
      },
    ],
    obligations: [
      {
        instrument: 'EU AI Act',
        ref: 'Annex III, point 3(b)',
        why: 'An equivalent system in the EU would be high-risk: systems intended to evaluate learning outcomes are listed [4], with Annex III obligations applying from 2 Dec 2027 (as of 2026-09-24) [5].',
      },
      {
        instrument: 'UK data protection',
        ref: 'Data (Use and Access) Act 2025, s. 80',
        obligationId: 'AIGE-OBL-UK-ADM',
        why: 'Replaces UK GDPR Art. 22 on automated decision-making with Arts. 22A-22D, in force since 5 Feb 2026 (as of 2026-09-24) [6].',
      },
    ],
    harms: ['cohort-penalty'],
    incidents: [incidents.aiaaicOfqual],
    sources: [
      {
        title:
          'Awarding GCSE, AS, A level, advanced extension awards and extended project qualifications in summer 2020: interim report',
        gloss: 'Direct Centre Performance model; small-cohort rule; 96.4% within one grade of the CAG',
        publisher: 'Ofqual',
        date: '2020-08-13',
        url: 'https://www.gov.uk/government/publications/awarding-gcse-as-a-levels-in-summer-2020-interim-report',
        verified: 'primary',
      },
      {
        title: 'Statement from Roger Taylor, Chair, Ofqual',
        gloss: 'switch to centre assessment grades for AS, A level and GCSE',
        publisher: 'Ofqual (GOV.UK)',
        date: '2020-08-17',
        url: 'https://www.gov.uk/government/news/statement-from-roger-taylor-chair-ofqual',
        verified: 'primary',
      },
      {
        title: 'Ofqal algorithm skews student grade predictions',
        publisher: 'AIAAIC Repository',
        date: '2026',
        url: incidents.aiaaicOfqual.url,
        verified: 'primary',
      },
      src.aiActAnnex3,
      src.omnibus,
      src.duaa,
    ],
  },
  {
    id: 'health-risk-score-proxy',
    title: 'A health-risk score that predicted cost, not need',
    short: 'Health-risk score',
    year: '2019',
    jurisdiction: 'United States',
    sector: 'Healthcare: care management',
    evidence: 'primary',
    summary:
      'A widely used care-management algorithm predicted health costs as a proxy for illness, so Black patients were sicker than White patients at the same score.',
    happened: [
      'Health systems use commercial prediction algorithms to pick patients with complex needs for extra care. Obermeyer and colleagues studied one widely used algorithm of this kind and found that, at a given risk score, Black patients were considerably sicker than White patients, as shown by signs of uncontrolled illness [1].',
      'The bias arose because the algorithm predicts health-care costs rather than illness, and unequal access to care means less is spent on Black patients than on White patients. Remedying the disparity would raise the share of Black patients receiving additional help from 17.7% to 46.5% [1]. The AI Incident Database records the case against the vendor, as reported [2].',
    ],
    failureMode: [
      'Label choice. The target the model learned (future cost) stood in for the construct the programme cared about (future need), and the proxy was itself shaped by unequal access. Measured against its own label, the model could look accurate and still be wrong about who needed care [1].',
    ],
    control: {
      text: [
        'The model card is where the gap between label and construct is written down and owned: what the programme wants to predict, what the model actually predicts, and why the difference is acceptable. An eval gate that checks calibration by group against a measure closer to the construct (for example, active chronic conditions) shows whether equal scores mean equal need.',
      ],
      controls: [
        {
          name: 'Model Card as Control Evidence',
          patternId: 'pattern-model-card-as-control-evidence',
        },
        { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact:
          'Model card section on label validity: construct, proxy label and known gaps, signed by the clinical owner',
        layerN: 2,
      },
      {
        artefact: "Eval report of calibration by group against a health measure, with the gate's verdict",
        layerN: 3,
      },
      {
        artefact: 'Change record whenever the label or the programme-entry threshold changes',
        layerN: 5,
      },
    ],
    obligations: [
      {
        instrument: 'EU AI Act',
        ref: 'Art. 10',
        obligationId: 'AIGE-OBL-EUAIA-ART10',
        why: 'For high-risk systems, training data must be examined for possible biases likely to affect health and safety or fundamental rights [3].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Annex III, point 5(a)',
        why: 'Evaluating eligibility for essential public assistance benefits and services, including healthcare services, is high-risk when done by or for public authorities [4]. Whether a care-management score used by a private provider falls there, or under a medical-device route, is a legal classification question.',
      },
    ],
    harms: ['discriminatory-decisions'],
    incidents: [incidents.aiid124],
    sources: [
      {
        title: 'Dissecting racial bias in an algorithm used to manage the health of populations',
        gloss: 'Science 366(6464):447-453',
        publisher: 'Obermeyer, Z., Powers, B., Vogeli, C., Mullainathan, S.',
        date: '2019-10-25',
        url: 'https://doi.org/10.1126/science.aax2342',
        verified: 'primary',
      },
      aiidSource(incidents.aiid124),
      src.aiActArt10,
      src.aiActAnnex3,
    ],
  },
  {
    id: 'moffatt-v-air-canada',
    title: "Moffatt v. Air Canada: the chatbot's answer is the company's answer",
    short: 'Moffatt v. Air Canada',
    year: '2024',
    jurisdiction: 'British Columbia, Canada',
    sector: 'Aviation: customer service',
    evidence: 'secondary',
    summary:
      'A tribunal held Air Canada liable after its website chatbot misstated the bereavement-fare policy, rejecting the argument that the chatbot answered for itself.',
    happened: [
      "A passenger asked Air Canada's website chatbot how bereavement fares worked. The chatbot told him that if he had already travelled he could submit his ticket for a reduced bereavement rate within 90 days of issue, while the airline's policy stated that it would not provide refunds for bereavement travel after the flight was booked [2].",
      "Before the Civil Resolution Tribunal of British Columbia, the airline argued that it could not be held liable for information provided by one of its agents, servants or representatives, including a chatbot. Tribunal member Christopher Rivers found that Air Canada did not take reasonable care to ensure its chatbot was accurate, wrote that it should be obvious to Air Canada that it is responsible for all the information on its website, and awarded a partial refund [2]. The decision is Moffatt v. Air Canada, 2024 BCCRT 149 [1]; the AI Incident Database reports a total of CAD 812.02 in damages and fees, and records the finding as negligent misrepresentation [3].",
    ],
    failureMode: [
      'The chatbot generated an answer about a policy without checking it against the policy. Two parts of the same website disagreed, and nothing detected the disagreement before a customer relied on it.',
      "The airline's defence treated the chatbot as outside its own accountability. The tribunal did not accept that [2], and an engineering function should not build on it either.",
    ],
    control: {
      text: [
        'A runtime guardrail that grounds every policy answer in the current policy document, cites it, and refuses when no passage supports the answer stops the wrong promise at the point of output. An eval gate with a regression set of policy questions (fares, refunds, eligibility) catches the same failure before release, and the incident pipeline routes complaints about bot answers back into that set.',
      ],
      controls: [
        { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
        { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
        { name: 'Incident Pipeline', patternId: 'pattern-incident-pipeline' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact: 'Guardrail log per answer: the policy passage retrieved and cited, or the refusal',
        layerN: 4,
      },
      {
        artefact: 'Eval report on the policy-question regression set, with the release threshold',
        layerN: 3,
      },
      {
        artefact: 'Incident records linking each complaint to the bot answer and the fix',
        layerN: 5,
      },
    ],
    obligations: [
      {
        instrument: 'Canadian common law',
        ref: 'Negligent misrepresentation',
        why: 'The tribunal applied ordinary duties of care to the chatbot\'s statements: the airline answers for them as for any page of its site [2][3].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 50(1)',
        obligationId: 'AIGE-OBL-EUAIA-ART50',
        why: 'In the EU, systems that interact directly with people must be designed so that people know they are dealing with an AI system [4]; Art. 50 applies from 2 Aug 2026 (as of 2026-09-24) [5]. Disclosure does not shift liability for what the system says.',
      },
    ],
    harms: ['liability-for-outputs', 'reputational-harm'],
    incidents: [incidents.aiid639],
    sources: [
      {
        title: 'Moffatt v. Air Canada, 2024 BCCRT 149',
        gloss: 'decision not opened directly; citation and holdings confirmed through sources 2 and 3',
        publisher: 'Civil Resolution Tribunal of British Columbia (CanLII)',
        date: '2024-02-14',
        url: 'https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html',
        verified: 'secondary',
      },
      {
        title: "Air Canada must honor refund policy invented by airline's chatbot",
        gloss: 'quotes the chatbot, the policy page and the tribunal member',
        publisher: 'Ars Technica',
        date: '2024-02-16',
        url: 'https://arstechnica.com/tech-policy/2024/02/air-canada-must-honor-refund-policy-invented-by-airlines-chatbot/',
        verified: 'secondary',
      },
      aiidSource(incidents.aiid639),
      src.aiActArt50,
      src.art50Date,
    ],
  },
  {
    id: 'recruiting-model-reported',
    title: 'A recruiting model that learned the past (reported)',
    short: 'Recruiting model (reported)',
    year: '2018',
    jurisdiction: 'Not stated in the reports',
    sector: 'Employment: recruitment',
    evidence: 'reported',
    summary:
      'Reuters reported in 2018 that an experimental recruiting model trained on a decade of mostly male CVs learned to downgrade women; the project was dropped.',
    happened: [
      'Reuters reported on 10 Oct 2018 that Amazon had built an experimental tool, from 2014, to score job applicants; that it was trained on about ten years of CVs drawn largely from men; that it learned to penalise CVs containing the word "women\'s" and graduates of certain all-women colleges; and that the project was abandoned [1][2]. These are reported facts: no primary company document is public.',
      "The company is reported to have said that recruiters never relied solely on the tool's rankings [2].",
    ],
    failureMode: [
      'Historical label bias. The model learned what past hiring looked like, past hiring skewed male, and the skew became a scoring rule. Removing explicit gendered terms does not remove proxies for them, which is why reports say the fixes did not guarantee fairness [2].',
    ],
    control: {
      text: [
        'An eval gate that computes selection rates by sex (and other protected characteristics) on a held-out set, and fails the build when an impact ratio falls below a set threshold, catches this in the first release candidate rather than after years of development. A data card that states the composition of the training population makes the risk visible before training starts. The fundamental-rights impact assessment is where the decision to automate screening at all is argued.',
      ],
      controls: [
        { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
        {
          name: 'Model Card as Control Evidence',
          patternId: 'pattern-model-card-as-control-evidence',
        },
        { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact: 'Data card stating the composition of the training population by sex and period',
        layerN: 2,
      },
      {
        artefact: 'Bias-audit report per release with selection rates and impact ratios by group',
        layerN: 3,
      },
      {
        artefact: 'Eval-gate log showing the release blocked or passed on those ratios',
        layerN: 3,
      },
      {
        artefact: 'FRIA recording the decision to automate screening and its safeguards',
        layerN: 1,
      },
    ],
    obligations: [
      {
        instrument: 'EU AI Act',
        ref: 'Annex III, point 4(a)',
        why: 'Recruitment and selection, including filtering applications and evaluating candidates, is high-risk [3]; Annex III obligations apply from 2 Dec 2027 (as of 2026-09-24) [4].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 10',
        obligationId: 'AIGE-OBL-EUAIA-ART10',
        why: 'Training data for high-risk systems must be examined for possible biases [5].',
      },
      {
        instrument: 'New York City',
        ref: 'Local Law 144 of 2021',
        why: 'Employers may not use an automated employment decision tool unless it has had a bias audit within one year, the audit information is public and notices have been given; enforcement began on 5 Jul 2023 [6].',
      },
    ],
    harms: ['discriminatory-decisions'],
    incidents: [incidents.aiid37],
    sources: [
      {
        title: 'Amazon scraps secret AI recruiting tool that showed bias against women',
        publisher: 'Reuters',
        date: '2018-10-10',
        url: 'https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G',
        verified: 'reported',
      },
      aiidSource(incidents.aiid37),
      src.aiActAnnex3,
      src.omnibus,
      src.aiActArt10,
      {
        title: 'Automated Employment Decision Tools (AEDT)',
        gloss: 'Local Law 144 of 2021; bias audit within one year of use; enforcement from 5 Jul 2023',
        publisher: 'NYC Department of Consumer and Worker Protection',
        date: '2023',
        url: 'https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page',
        verified: 'primary',
      },
    ],
  },
  {
    id: 'zillow-offers',
    title: 'Zillow Offers: a pricing model committing capital into a turning market',
    short: 'Zillow Offers',
    year: '2021',
    jurisdiction: 'United States',
    sector: 'Real estate: automated home buying',
    evidence: 'primary',
    summary:
      'Zillow wound down its home-buying business in 2021 after buying homes above what it expected to sell them for, taking a USD 304 million write-down.',
    happened: [
      'On 2 Nov 2021 Zillow Group announced its plan to wind down Zillow Offers, the business in which it bought and sold homes directly [1].',
      'Its third-quarter results included an inventory write-down of approximately USD 304 million, the result of buying homes at prices higher than its current estimates of future selling prices. The wind-down was expected to take several quarters and to reduce the workforce by approximately 25% [1].',
      'The chief executive said the unpredictability in forecasting home prices far exceeded what the company had anticipated, and that continuing to scale would bring too much earnings and balance-sheet volatility [1]. The AI Incident Database records the case as a pricing tool with insufficient accuracy [2].',
    ],
    failureMode: [
      "A forecasting model was used to commit capital at volume in a market whose behaviour was shifting. Public filings do not describe the company's internal model controls, so this is an illustrative analysis, not a finding: the loss pattern is the one a model produces when its error is not tied to a limit on what it may commit.",
    ],
    control: {
      text: [
        'Continuous assurance telemetry that compares each purchase forecast with the realised resale price, by market and cohort, gives the early signal. A circuit breaker that throttles purchase volume automatically when realised error crosses a set threshold turns the signal into a control instead of a quarterly surprise.',
      ],
      controls: [
        {
          name: 'Continuous Assurance Telemetry',
          patternId: 'pattern-continuous-assurance-telemetry',
        },
        {
          name: 'Kill Switch / Circuit Breaker',
          patternId: 'pattern-kill-switch--circuit-breaker',
        },
      ],
    },
    evidenceArtefacts: [
      {
        artefact: 'Drift dashboard of forecast against realised price by market, with thresholds',
        layerN: 5,
      },
      {
        artefact: 'Circuit-breaker configuration and activation log: what was throttled, by what rule, when',
        layerN: 4,
      },
      {
        artefact: 'Model validation record stating the conditions under which the model must not be used',
        layerN: 2,
      },
    ],
    obligations: [
      {
        instrument: 'NIST AI RMF',
        ref: 'Measure, Manage',
        why: 'The voluntary home for this monitoring and response: the framework organises AI risk work into Govern, Map, Measure and Manage [3].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Annex III',
        why: 'No AI-specific duty applies: a pricing model for a company\'s own purchases is not among the Annex III uses [4]. The loss is a governance failure, not a compliance one.',
      },
    ],
    harms: ['forecast-drift-loss'],
    incidents: [incidents.aiid149],
    sources: [
      {
        title:
          'Zillow Group Reports Third-Quarter 2021 Financial Results; Shares Plan to Wind Down Zillow Offers Operations',
        gloss: 'Form 8-K, Exhibit 99.1',
        publisher: 'Zillow Group, Inc. (SEC EDGAR)',
        date: '2021-11-02',
        url: 'https://www.sec.gov/Archives/edgar/data/1617640/000161764021000085/q32021991.htm',
        verified: 'primary',
      },
      aiidSource(incidents.aiid149),
      src.nistRmf,
      src.aiActAnnex3,
    ],
  },
  {
    id: 'clearview-ai',
    title: 'Clearview AI: a face database built by scraping',
    short: 'Clearview AI',
    year: '2024',
    jurisdiction: 'Netherlands (EU)',
    sector: 'Biometrics: facial recognition',
    evidence: 'primary',
    summary:
      'The Dutch data protection authority fined Clearview AI EUR 30.5 million in 2024 for building a facial-recognition database from scraped photos.',
    happened: [
      'Clearview AI collects photos of faces from the internet and converts each into a unique biometric code, without the people concerned knowing or consenting [1].',
      'On 3 Sep 2024 the Dutch data protection authority (AP) announced a fine of EUR 30.5 million and orders subject to penalties of up to more than EUR 5 million. It found that Clearview should never have built the database and informs the people in it insufficiently; Clearview did not object to the decision and so cannot appeal the fine [1].',
      "The European Data Protection Board's summary of the decision lists, among other violations, processing of biometric data contrary to Art. 9(1) GDPR, processing without a lawful basis under Art. 6(1), and failure to answer access requests under Art. 12 and 15 [2]. The AI Incident Database records both the scraping and the fine [3][4].",
    ],
    failureMode: [
      'For the provider, the failure is at the source: personal and biometric data gathered at scale without a lawful basis. For every organisation that buys such a service, the failure is procurement: integrating a capability without asking how its data was obtained.',
    ],
    control: {
      text: [
        "A vendor due-diligence gate that asks for the provider's lawful basis for its reference data, and treats biometric processing as a stop condition pending a DPIA, keeps a buyer out of the harm. An AIBOM that records the provenance of each dataset gives the provider the same check at build time.",
      ],
      controls: [
        {
          name: 'Vendor / Model Due-Diligence Gate',
          patternId: 'pattern-vendor--model-due-diligence-gate',
        },
        { name: 'AIBOM', patternId: 'pattern-aibom' },
        { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact:
          "Due-diligence record with the provider's lawful-basis and provenance answers and the reject decision",
        layerN: 2,
      },
      {
        artefact: 'AIBOM dataset entries with source, collection method, licence and lawful basis',
        layerN: 2,
      },
      {
        artefact: 'DPIA for any biometric use, signed before integration',
        layerN: 1,
      },
    ],
    obligations: [
      {
        instrument: 'GDPR',
        ref: 'Art. 6, 9, 12, 15',
        why: 'Lawful basis, special-category biometric data, and the right of access: the provisions the AP decision applies [1][2][5].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 5(1)(e)',
        obligationId: 'AIGE-OBL-EUAIA-ART5',
        why: 'Placing on the market, putting into service or using AI systems that create or expand facial recognition databases through untargeted scraping of facial images from the internet or CCTV footage is prohibited [6]; the prohibitions apply from 2 Feb 2025 [7].',
      },
    ],
    harms: ['privacy-intrusion', 'regulatory-enforcement'],
    incidents: [incidents.aiid267, incidents.aiid781],
    sources: [
      {
        title: 'Dutch DPA imposes a fine on Clearview because of illegal data collection for facial recognition',
        gloss: 'EUR 30.5 million fine; orders subject to penalties',
        publisher: 'Autoriteit Persoonsgegevens (Dutch Data Protection Authority)',
        date: '2024-09-03',
        url: 'https://www.autoriteitpersoonsgegevens.nl/en/current/dutch-dpa-imposes-a-fine-on-clearview-because-of-illegal-data-collection-for-facial-recognition',
        verified: 'primary',
      },
      {
        title: 'Dutch Supervisory Authority imposes a fine on Clearview because of illegal data collection for facial recognition',
        gloss: 'national news summary listing the GDPR articles found infringed',
        publisher: 'European Data Protection Board',
        date: '2024-09-03',
        url: 'https://www.edpb.europa.eu/news/national-news/2024/dutch-supervisory-authority-imposes-fine-clearview-because-illegal-data_en',
        verified: 'primary',
      },
      aiidSource(incidents.aiid267),
      aiidSource(incidents.aiid781),
      src.gdpr,
      src.aiActArt5,
      src.aiActArt113,
    ],
  },
  {
    id: 'garante-chatgpt-order',
    title: "The Garante's ChatGPT order: launch before a lawful basis",
    short: 'Garante ChatGPT order',
    year: '2023',
    jurisdiction: 'Italy (EU)',
    sector: 'Generative AI: consumer chatbot',
    evidence: 'primary',
    summary:
      "Italy's data protection authority temporarily limited ChatGPT in 2023 over lawful basis, transparency and age checks, then fined its provider EUR 15 million in 2024.",
    happened: [
      "On 30 Mar 2023 the Italian data protection authority (Garante) ordered an immediate temporary limitation of the processing of Italian users' data by OpenAI [1]. Its press release of 31 Mar noted that a data breach affecting users' conversations and subscribers' payment information had been reported on 20 Mar, and cited the absence of a legal basis for the mass collection and storage of personal data to train the algorithms [2].",
      "On 20 Dec 2024 the Garante announced a EUR 15 million fine and a six-month information campaign on radio, television, newspapers and the internet. It found that the company had not notified the authority of the data breach of March 2023, had processed users' personal data to train ChatGPT without first identifying an adequate legal basis, had breached the transparency principle and the related information duties, and had provided no age-verification mechanism, exposing children under 13 to unsuitable answers [3]. The AI Incident Database records the 2023 order [4].",
    ],
    failureMode: [
      'The lawful basis, the transparency notice and the age check were not release preconditions. A service reached the public, and personal data reached training, before the first questions a regulator asks had documented answers.',
      'The breach path failed separately: a personal-data breach must be notified to the authority on a deadline, and the Garante found that this notification had not been made [3].',
    ],
    control: {
      text: [
        'A policy card that makes three things release blockers (a recorded lawful basis for each training-data source, a published notice, and age assurance at entry) moves the regulator\'s checklist into the pipeline. The DPIA and fundamental-rights assessment, kept as code, carry the reasoning; an AIBOM ties each training dataset to its basis; a runtime guardrail enforces the age gate. The incident pipeline puts breach notification on the clock.',
      ],
      controls: [
        { name: 'Policy Card', patternId: 'pattern-policy-card' },
        { name: 'FRIA-as-Code', patternId: 'pattern-fria-as-code' },
        { name: 'AIBOM', patternId: 'pattern-aibom' },
        { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
        { name: 'Incident Pipeline', patternId: 'pattern-incident-pipeline' },
      ],
    },
    evidenceArtefacts: [
      {
        artefact: 'Policy card with the three release blockers and the CI check that enforced them',
        layerN: 1,
      },
      {
        artefact: 'DPIA recording the lawful basis for each processing purpose, training included',
        layerN: 1,
      },
      {
        artefact: 'AIBOM listing training-data sources with their lawful basis',
        layerN: 2,
      },
      {
        artefact: 'Age-assurance logs at sign-up',
        layerN: 4,
      },
      {
        artefact:
          'Incident record for the breach: detection time, notification decision and the timestamp of the notice sent',
        layerN: 5,
      },
    ],
    obligations: [
      {
        instrument: 'GDPR',
        ref: 'Art. 5(1)(a), 6, 8, 12-13, 33',
        why: 'Lawfulness and transparency, the legal basis for training, the conditions for a child\'s consent, the information duties and breach notification: the provisions behind both Garante decisions [3][5].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 53(1)(d)',
        obligationId: 'AIGE-OBL-EUAIA-ART53',
        why: 'Providers of general-purpose AI models publish a sufficiently detailed summary of the content used for training [6]; these obligations apply since 2 Aug 2025, with Commission enforcement powers from 2 Aug 2026 (as of 2026-09-24) [7].',
      },
    ],
    harms: ['regulatory-enforcement', 'privacy-intrusion'],
    incidents: [incidents.aiid513],
    sources: [
      {
        title: 'Provvedimento del 30 marzo 2023 [doc. web n. 9870832]',
        gloss: 'urgent temporary limitation of processing of data of users in Italy',
        publisher: 'Garante per la protezione dei dati personali',
        date: '2023-03-30',
        url: 'https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9870832',
        verified: 'primary',
      },
      {
        title: 'Artificial intelligence: stop to ChatGPT by the Italian SA [doc. web n. 9870847]',
        gloss: 'press release; data breach reported on 20 Mar; no legal basis for training data',
        publisher: 'Garante per la protezione dei dati personali',
        date: '2023-03-31',
        url: 'https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9870847',
        verified: 'primary',
      },
      {
        title:
          'ChatGPT, il Garante privacy chiude l\'istruttoria. OpenAI dovrà realizzare una campagna informativa di sei mesi e pagare una sanzione di 15 milioni di euro [doc. web n. 10085432]',
        gloss: 'press release on the EUR 15 million fine',
        publisher: 'Garante per la protezione dei dati personali',
        date: '2024-12-20',
        url: 'https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/10085432',
        verified: 'primary',
      },
      aiidSource(incidents.aiid513),
      src.gdpr,
      src.aiActArt53,
      src.gpaiEnforcement,
    ],
  },
  {
    id: 'nyc-mycity-chatbot',
    title: 'NYC MyCity: a government chatbot that advised breaking the law',
    short: 'NYC MyCity chatbot',
    year: '2024',
    jurisdiction: 'New York City, United States',
    sector: 'Public sector: business guidance',
    evidence: 'secondary',
    summary:
      "The Markup found in 2024 that New York City's AI chatbot for business owners gave answers contrary to city law, including on tenants with housing vouchers.",
    happened: [
      "In October 2023 New York City announced an AI-powered chatbot to help business owners navigate government; it runs on Microsoft's Azure AI services [1].",
      "The Markup reported on 29 Mar 2024 that in its testing the bot said landlords did not have to accept tenants with housing vouchers, although source-of-income discrimination is illegal in the city, and told a user they could take a cut of workers' tips. On the voucher question the bot once told a reporter that landlords did have to accept vouchers, then told ten separate staffers that they did not [1].",
      'A city spokesperson said the chatbot was a pilot that would improve, had already given thousands of people accurate answers, and disclosed its risks to users [1]. The OECD AI Incidents Monitor and the AI Incident Database both record the case [2][3].',
    ],
    failureMode: [
      'A generative system answered legal questions in a domain where a wrong answer invites unlawful conduct, with no check that answers matched the law, and with answers that changed from one asking to the next. A disclaimer told users about the risk; nothing reduced it.',
    ],
    control: {
      text: [
        'An eval gate built on a legal-question set written with the agencies that enforce each rule (tips, housing, cash acceptance) measures the error rate before launch and sets a bar to clear. A runtime guardrail that grounds answers in official sources and refuses when it cannot cite one, and a red-team pass over the questions the public will ask, close the gap between a pilot label and a public service.',
      ],
      controls: [
        { name: 'Eval Gate in CI', patternId: 'pattern-eval-gate-in-ci' },
        { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
        {
          name: 'Adversarial Red-Team Suite',
          patternId: 'pattern-adversarial-red-team-suite',
        },
      ],
    },
    evidenceArtefacts: [
      {
        artefact: 'Eval report on the legal-question set with the launch threshold and error rate per topic',
        layerN: 3,
      },
      {
        artefact: 'Consistency results: the same question asked many times, with the spread of answers',
        layerN: 3,
      },
      {
        artefact: 'Guardrail logs with the official source cited for each answer, or the refusal',
        layerN: 4,
      },
      {
        artefact: 'Red-team findings, each closed or formally accepted before launch',
        layerN: 3,
      },
    ],
    obligations: [
      {
        instrument: 'NIST AI 600-1',
        ref: 'Confabulation',
        why: 'The generative-AI profile lists confabulation, confidently stated but false content, among its twelve risks [4].',
      },
      {
        instrument: 'EU AI Act',
        ref: 'Art. 50(1)',
        obligationId: 'AIGE-OBL-EUAIA-ART50',
        why: 'For an EU deployment, people must be told they are dealing with an AI system [5]. The duty is about disclosure, not accuracy, which is why the eval gate matters more than the banner.',
      },
    ],
    harms: ['reputational-harm', 'liability-for-outputs'],
    incidents: [incidents.oecdMyCity, incidents.aiid714],
    sources: [
      {
        title: "NYC's AI Chatbot Tells Businesses to Break the Law",
        gloss: 'investigative testing of the MyCity chatbot',
        publisher: 'The Markup',
        date: '2024-03-29',
        url: 'https://themarkup.org/news/2024/03/29/nycs-ai-chatbot-tells-businesses-to-break-the-law',
        verified: 'secondary',
      },
      {
        title: `OECD AI Incidents Monitor: ${incidents.oecdMyCity.title}`,
        publisher: 'OECD.AI',
        date: '2024-03-29',
        url: incidents.oecdMyCity.url,
        verified: 'primary',
      },
      aiidSource(incidents.aiid714),
      src.nist600,
      src.aiActArt50,
    ],
  },
  {
    id: 'chatbot-code-leak-reported',
    title: 'Source code pasted into a public chatbot (reported)',
    short: 'Chatbot data leak (reported)',
    year: '2023',
    jurisdiction: 'South Korea',
    sector: 'Semiconductors: engineering',
    evidence: 'reported',
    summary:
      'Samsung engineers reportedly pasted source code and meeting notes into ChatGPT within weeks of being allowed to use it.',
    happened: [
      'TechRadar reported on 4 Apr 2023 that after Samsung allowed engineers in its semiconductor business to use ChatGPT to help fix source code, there were three recorded cases in just under a month of employees entering confidential data, including the source code of a new program and internal meeting notes [1]. The AI Incident Database notes that the first report came from The Economist Korea on 30 Mar 2023 [2].',
      'Samsung reportedly responded by limiting prompts to 1024 bytes and developing an in-house AI tool [1]. None of this comes from a primary company document.',
    ],
    failureMode: [
      'Permission without mediation. Use of an external AI service was allowed before there was a gateway, a data-loss check on what left the network, or a reviewed position on how the provider retains and uses inputs.',
    ],
    control: {
      text: [
        'Shadow-AI discovery finds every AI service in use and puts it in the registry; routing that use through a gateway with a runtime guardrail that scans prompts for source code and confidentiality markings stops the leak at the boundary. A vendor due-diligence review of retention and training terms decides which services are allowed at all.',
      ],
      controls: [
        { name: 'Shadow-AI Discovery', patternId: 'pattern-shadow-ai-discovery' },
        { name: 'Runtime Guardrail', patternId: 'pattern-runtime-guardrail' },
        {
          name: 'Vendor / Model Due-Diligence Gate',
          patternId: 'pattern-vendor--model-due-diligence-gate',
        },
      ],
    },
    evidenceArtefacts: [
      {
        artefact: 'Discovered-AI inventory reconciled with the model and agent registry',
        layerN: 2,
      },
      {
        artefact: 'Gateway logs with a data-loss verdict for each prompt, and the blocks',
        layerN: 4,
      },
      {
        artefact: 'Vendor record of retention and training terms, with the approved scope of use',
        layerN: 2,
      },
    ],
    obligations: [
      {
        instrument: 'EU AI Act',
        ref: 'Art. 4',
        obligationId: 'AIGE-OBL-EUAIA-ART4',
        why: 'AI literacy: after the Digital Omnibus the article was reworded to support the development of AI literacy, applying from 27 Jul 2026 (as of 2026-09-24), as reported [3].',
      },
      {
        instrument: 'General law',
        ref: 'Confidentiality',
        why: 'No AI-specific rule governs the leak itself; it is a confidentiality and trade-secret failure that an AI service made easy.',
      },
    ],
    harms: ['confidential-data-leak'],
    incidents: [incidents.aiid768],
    sources: [
      {
        title: 'Samsung workers made a major error by using ChatGPT',
        gloss: 'three recorded leaks in under a month; 1024-byte prompt limit',
        publisher: 'TechRadar',
        date: '2023-04-04',
        url: 'https://www.techradar.com/news/samsung-workers-leaked-company-secrets-by-using-chatgpt',
        verified: 'reported',
      },
      aiidSource(incidents.aiid768),
      src.art4Literacy,
    ],
  },
];

export function caseById(id: string): IncidentCase | undefined {
  return cases.find((c) => c.id === id);
}

/** Cases that illustrate a given harm-atlas row. */
export function casesForHarm(harmId: string): IncidentCase[] {
  return cases.filter((c) => c.harms.includes(harmId));
}
