// controls/data-admission-and-privacy.ts: the Data Admission and Privacy
// Control Profile, v0.1 (draft). Twelve reference controls, AIGE-CTL-DATA-001
// to 012, for the data a model is trained, fine-tuned, validated, tested or
// evaluated on, or that a retrieval index is built from: whether it may be used,
// on what basis and for which purpose, whether it is fit for that purpose, and
// what happens to the models it reached when the answer changes.
//
// Every control is derived (`depth: 'derived'`): it restates material the site
// already publishes and adds nothing that material does not say. `derivedFrom`
// names it:
//
//   patterns  -> dataset-admission-gate, training-data-rights-ledger,
//                downstream-use-register (bok/patterns/<slug>.md), and
//                rights-requests-against-models where chapter 19 hands the
//                erasure path to it
//   schemas   -> dataset-admission-record, dataset-card (their required fields
//                are the evidence), impact-assessment (the AI DPIA addendum
//                chapter 19 points to), policy-card, model-card
//   chapters  -> 14 governing-development ("Data for training and testing" and
//                "Reproducibility and linked versioning") and 19 privacy-and-ai
//                (lawful basis, purpose limitation, minimisation, DPIA,
//                special categories, data subject rights)
//
// The published `training-record` schema is NOT used: it records a person's AI
// literacy training, not a model training run. The model training record of
// chapter 14 has no published schema, so the lineage control (010) names the
// model card's `datasets` field and the dataset card's lineage link instead.
// There is no data lineage or provenance pattern on the site: lineage is covered
// only as far as the three patterns and chapter 14 state it.
//
// Mappings carry only ids the site already holds (../frameworks.ts obligations,
// ../threats.ts ISO/IEC 42001 Annex A and OWASP rows, ../nist-ai-rmf.ts), and
// prefer those the source pattern or chapter already cites. No AIUC-1 id is
// mapped: the data-and-privacy requirements read on their public pages on
// 2026-09-26 (A001, A002, A004, A007) govern policies communicated to customers
// and output leakage, not the admission of training data. Verification steps
// state only checks the source material itself states; the rest is left to
// technical review, as each control's open questions say.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile, ObservationExample } from './index';
import type { Source } from '../../lib/sources';
import { threatSources, SRC } from '../threats';
import { site } from '../site';

const PROFILE = 'data-admission-and-privacy';

export const dataAdmissionAndPrivacyProfile: ControlProfile = {
  slug: PROFILE,
  title: 'Data Admission and Privacy Control Profile',
  shortTitle: 'Data admission and privacy',
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  summary:
    'Reference controls for the data AI systems learn from: admission before a job reads a dataset, the right to use each source, lawful basis and purpose, fitness for purpose, integrity, lineage and downstream use. Every control is a draft derived from site patterns, record schemas and chapters 14 and 19, open for technical review.',
  scope:
    'Datasets that training, fine-tuning, validation, testing, evaluation and retrieval-index jobs read, the sources they are built from and the consumers of the outputs of the models built on them. Data handling at inference time, transfers and automated decision-making are left to chapter 19; evaluation environments are covered by the evaluation environment profile.',
  published: '2026-09-26',
  updated: '2026-09-26',
  authors: ['jorge-garcia-aibar'],
  reviewers: [],
  changelog: [
    {
      version: '0.1',
      date: '2026-09-26',
      note: 'First draft: 12 controls derived from the Dataset Admission Gate, Training-Data Rights Ledger and Downstream Use Register patterns, the dataset admission record and dataset card schemas, and chapters 14 and 19; open for technical review.',
    },
  ],
  issueTemplate: 'control-review.yml',
};

/** No control of this profile is specified yet, so there are no example observations. */
export const observationExamples: readonly ObservationExample[] = [];

// ---------------------------------------------------------------------------
// References. The site material each control restates first (pattern pages and
// chapter sections), then the primary texts those pages already cite, reused
// with the same title and URL.

const BOK = `AI Governance Engineering Body of Knowledge v${site.bokVersion}`;

function patternPage(slug: string, title: string, gloss: string): Source {
  return {
    title,
    gloss: `${BOK}, pattern catalogue (chapter 05): ${gloss}`,
    publisher: `${site.name} (${site.author})`,
    date: '2026-09',
    url: `${site.url}/patterns/${slug}`,
    verified: 'primary',
  };
}

function chapter(slug: string, number: string, title: string, anchor: string, heading: string): Source {
  return {
    title,
    gloss: `${BOK}, chapter ${number}, section "${heading}"`,
    publisher: `${site.name} (${site.author})`,
    date: '2026-09',
    url: `${site.url}/bok/${slug}#${anchor}`,
    verified: 'primary',
  };
}

const ch14 = (anchor: string, heading: string) =>
  chapter('governing-development', '14', 'Governing AI development', anchor, heading);
const ch19 = (anchor: string, heading: string) =>
  chapter('privacy-and-ai', '19', 'Privacy and data protection law applied to AI', anchor, heading);

const PATTERN = {
  gate: patternPage(
    'dataset-admission-gate',
    'Dataset Admission Gate',
    'a job may read a dataset version only if a complete, signed admission record admits it for that use',
  ),
  ledger: patternPage(
    'training-data-rights-ledger',
    'Training-Data Rights Ledger',
    'one ledger row per training source, joined to lineage so each model knows its sources',
  ),
  downstream: patternPage(
    'downstream-use-register',
    'Downstream Use Register',
    'intended and prohibited uses as a Policy Card and every consumer of the outputs recorded against the registry entry',
  ),
  rights: patternPage(
    'rights-requests-against-models',
    'Rights Requests Against Models',
    'each data-subject request routed to every place the data sits and closed with a fulfilment record',
  ),
} as const;

const CH14 = {
  data: ch14('data-for-training-and-testing', 'Data for training and testing'),
  rights: ch14('the-right-to-use-the-data', 'The right to use the data'),
  quality: ch14(
    'quality-quantity-representativeness-and-fitness-for-purpose',
    'Quality, quantity, representativeness and fitness for purpose',
  ),
  owners: ch14('owners-stewards-and-the-admission-gate', 'Owners, stewards and the admission gate'),
  lineage: ch14('provenance-versus-lineage', 'Provenance versus lineage'),
  reproducibility: ch14('reproducibility-and-linked-versioning', 'Reproducibility and linked versioning'),
  cards: ch14('model-cards-system-cards-and-datasheets', 'Model cards, system cards and datasheets'),
  creep: ch14('function-creep', 'Function creep'),
} as const;

const CH19 = {
  basis: ch19('lawful-basis-for-training-versus-inference', 'Lawful basis for training versus inference'),
  consent: ch19('the-limits-of-consent', 'The limits of consent'),
  purpose: ch19('purpose-limitation-and-function-creep', 'Purpose limitation and function creep'),
  minimisation: ch19('minimisation-privacy-by-design-and-pets', 'Minimisation, privacy by design and PETs'),
  dpia: ch19('the-dpia-for-ai-systems', 'The DPIA for AI systems'),
  ropa: ch19('records-of-processing', 'Records of processing'),
  requests: ch19('where-a-request-has-to-reach', 'Where a request has to reach'),
  special: ch19('special-categories-inferred-data-and-biometrics', 'Special categories, inferred data and biometrics'),
  map: ch19('obligation-to-artefact-map', 'Obligation to artefact map'),
} as const;

// Primary texts, as the patterns and chapters 14 and 19 already cite them.
const AI_ACT_ART10: Source = {
  title: 'Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10',
  gloss:
    'data and data governance: 10(2) practices, including origin, preparation, bias examination and mitigation, and data gaps; 10(3) relevant, sufficiently representative, free of errors and complete; 10(4) specific setting of use',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10',
  verified: 'primary',
};

const AI_ACT_ART4A: Source = {
  title: 'Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 4a and 10',
  gloss: 'as amended by Reg. (EU) 2026/1744: Art. 10(5) deleted; Art. 4a inserted for special-category data in bias detection and correction',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a',
  verified: 'primary',
};

const AI_ACT_ART53: Source = {
  title: 'Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53',
  gloss:
    'GPAI provider obligations: (c) copyright policy including reservations of rights; (d) public summary of training content on the AI Office template',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53',
  verified: 'primary',
};

const AI_ACT_DOWNSTREAM: Source = {
  title:
    'Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024',
  gloss:
    'Art. 3(13) reasonably foreseeable misuse; Art. 9(2)(b) risks under reasonably foreseeable misuse; Art. 25(1)(c) changed intended purpose; Art. 50(2) machine-readable marking of synthetic outputs',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2024-07-12',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
  verified: 'primary',
};

const GDPR: Source = {
  title: 'Regulation (EU) 2016/679 (GDPR)',
  gloss:
    'Art. 5 principles, incl. 5(1)(b) purpose limitation and 5(1)(c) minimisation; Art. 6 lawful basis and 6(4) compatibility; Art. 7 consent; Art. 9 special categories; Arts. 15 to 17 and 21 rights; Art. 25 data protection by design and by default; Art. 30 records of processing; Arts. 35 and 36 DPIA and prior consultation',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2016-04-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng',
  verified: 'primary',
};

const EDPB_OPINION_28: Source = {
  title:
    'Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models',
  gloss: 'anonymity of models; legitimate interest; consequences of unlawful processing in development',
  publisher: 'European Data Protection Board',
  date: '2024-12',
  url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en',
  verified: 'primary',
};

const DSM_DIRECTIVE: Source = {
  title: 'Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4',
  gloss:
    'text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2019-05-17',
  url: 'https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng',
  verified: 'primary',
};

const FTC_EVERALBUM: Source = {
  title: 'In the Matter of Everalbum, Inc., Decision and Order',
  gloss:
    '"Affected Work Product": models or algorithms developed using users\' biometric information, to be deleted within 90 days with a sworn statement',
  publisher: 'Federal Trade Commission',
  date: '2021-05-07',
  url: 'https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf',
  verified: 'primary',
};

const NIST_AI_RMF: Source = {
  title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
  gloss:
    'GOVERN 6.1 third-party risks incl. infringement of intellectual property or other rights; MAP 1.1 intended purposes documented; MAP 2.3 data collection and selection considerations identified and documented; MAP 3.3 targeted application scope; MAP 4.1 legal risks of components incl. third-party data; MEASURE 2.10 privacy risk examined and documented; MANAGE 1.4 negative residual risks to downstream acquirers and end users documented',
  publisher: 'NIST',
  date: '2023-01-26',
  url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
  verified: 'primary',
};

const ISO_5259: Source = {
  title: 'ISO/IEC 5259 series, Data quality for analytics and machine learning (ML)',
  gloss:
    'Part 1 overview, terminology and examples; Part 2 data quality measures; Part 3 data quality management requirements and guidelines; Part 4 data quality process framework; Part 5 data quality governance framework',
  publisher: 'ISO/IEC',
  date: '2024-2025',
  url: 'https://www.iso.org/standard/81088.html',
  verified: 'primary',
};

const W3C_PROV: Source = {
  title: 'PROV Overview',
  gloss:
    'PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data',
  publisher: 'W3C',
  date: '2013-04-30',
  url: 'https://www.w3.org/TR/prov-overview/',
  verified: 'primary',
};

const OPENLINEAGE: Source = {
  title: 'OpenLineage: an open platform for collection and analysis of data lineage',
  gloss: 'standard API for lineage events over datasets, jobs and runs, with facets',
  publisher: 'OpenLineage project (The Linux Foundation)',
  date: '2026',
  url: 'https://openlineage.io/',
  verified: 'primary',
};

const DATASHEETS: Source = {
  title: 'Datasheets for Datasets (Gebru et al.; arXiv 1803.09010)',
  gloss: 'motivation, composition, collection, preprocessing, uses, distribution and maintenance',
  publisher: 'arXiv',
  date: '2018-03-23',
  url: 'https://arxiv.org/abs/1803.09010',
  verified: 'primary',
};

const ATLAS_DATA: Source = {
  title: 'MITRE ATLAS data, release 2026.09',
  gloss:
    'modified 2026-09-15; AML.T0020 Training Data Poisoning; mitigations AML.M0007 Sanitize Training Data and AML.M0025 Maintain AI Dataset Provenance',
  publisher: 'MITRE (atlas-data repository)',
  date: '2026-09-15',
  url: 'https://github.com/mitre-atlas/atlas-data',
  verified: 'primary',
};

/** Rows shared with the threat bridge (../threats.ts). */
const OWASP_LLM: Source = threatSources[SRC.llm2026 - 1];
const OWASP_AGENTIC: Source = threatSources[SRC.asi - 1];
const ISO_42001: Source = threatSources[SRC.iso42001 - 1];

// ---------------------------------------------------------------------------
// Controls

/** Fields every control of this version shares. */
const base = {
  profile: PROFILE,
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  depth: 'derived',
  seeds: [],
} as const;

export const dataAdmissionAndPrivacyControls: readonly Control[] = [
  {
    ...base,
    id: 'AIGE-CTL-DATA-001',
    title: 'Dataset Admission Gate at Read Time',
    objective:
      'A training, fine-tuning, validation, testing, evaluation or retrieval-index job reads a dataset version only if a signed admission record for that version admits the job\'s pipeline for its use case and target system, and the rights, quality, representativeness, bias and integrity checks passed or were waived by someone entitled to waive them.',
    failureModes: [
      'A job reads a dataset version that has no admission record for its pipeline, for example a training job pointed at a whole warehouse admitted for nothing.',
      'A model trains on data outside its consent scope, on a sample that misses the population it will serve, on labels nobody audited or on a snapshot someone altered, and the problem surfaces in production or in an audit, when the fix is a retrain.',
      'The person who wants the dataset used is the only person who decides it may be: the requester signs the admission, or a check is waived by someone not entitled to waive it.',
      'A missing admission field produces a reminder in a wiki instead of a failed run.',
    ],
    scope:
      'Every job that reads data to train, fine-tune, validate, test, evaluate or build a retrieval index, and the dataset versions it reads. The checks the gate runs are specified in AIGE-CTL-DATA-002 to 009; a sandbox pipeline with its own lighter admission is out of scope.',
    enforcementPoints: ['runtime'],
    verification: [
      {
        kind: 'inspect',
        text: 'Each admission record validates against dataset-admission-record.v1: subject, pipeline, target system, linked data card, decision, the checks with the obligation each enforces, the content hash of the admitted snapshot, the actor and a signature.',
      },
      {
        kind: 'test',
        text: 'A job that presents a use-case id or a pipeline the record does not admit is denied the read.',
      },
    ],
    evidence: [
      {
        artefact: 'Admission record per dataset version and permitted pipeline, signed by the data owner',
        schemaId: 'dataset-admission-record',
        layer: 1,
      },
      { artefact: 'Read-time verdicts of the gate: the use-case id presented and the admit or deny decision', layer: 1 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'The policy denies the read unless the record admits that pipeline for that use; a job with no admitted dataset does not start. A new version, a new source, quality drift, a licence change, an erasure request or a new use case reopens admission.',
    },
    layer: 1,
    secondaryLayers: [2],
    patterns: ['dataset-admission-gate', 'policy-card'],
    derivedFrom: [
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'schema', ref: 'dataset-admission-record' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-GDPR-ART5-1B', 'AIGE-OBL-ISO42001-A7'],
      iso42001: ['A.7.2', 'A.7.4', 'A.7.5'],
      nistAiRmf: ['MAP 2.3', 'MAP 4.1'],
      owasp: ['llm05-2026'],
    },
    references: [PATTERN.gate, CH14.data, CH14.owners, AI_ACT_ART10, EDPB_OPINION_28, OWASP_LLM, ISO_42001, NIST_AI_RMF],
    implementationNotes: [
      'Write one admission record per dataset version and per permitted pipeline on the published dataset-admission-record schema, and make every data-reading job present its use-case id and target system at read time; the check is policy-as-code in the pipeline, not a reminder in a wiki.',
      'Separate the duties: the data owner is accountable and signs, the data steward operates the checks, and a small review board settles contested admissions. The minimum checklist lives as code, so adding a check is a reviewed change.',
      'Give waivers an owner and an expiry, or they become the norm; record conditions on the admission record (for example "collect islands-region claims before the next retrain") so the next retrain cannot start until they are closed.',
    ],
    openQuestions: [
      'What lighter admission should a sandbox pipeline for exploratory work carry, and how is data kept from leaving the sandbox into a training job?',
      'Which enforcement point fits a gate that decides at read time inside a data pipeline: the platform\'s access layer, the job scheduler or the storage policy engine?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-002',
    title: 'Dataset Card for Every Admitted Version',
    objective:
      'Every dataset version that is admitted carries a dataset card that states its owner, purpose, provenance, lawful basis, licence and retention rule, and the admission gate checks the card is complete before it admits the version.',
    failureModes: [
      'A dataset is admitted with a card that lacks a lawful basis, a provenance, a retention limit or a licence, so the rights and the deletion date cannot be read from it.',
      'The card describes a previous version: its composition, representativeness or quality checks no longer match the snapshot that was admitted.',
      'The card is written from memory after training instead of filled from the admission record and lineage.',
    ],
    scope:
      'Datasets admitted to training, fine-tuning, validation, testing, evaluation or retrieval-index pipelines, one card per version. The model card and the system card, which describe what was built from the data, are out of scope.',
    enforcementPoints: ['deploy'],
    verification: [
      {
        kind: 'inspect',
        text: 'The card of each admitted version validates against dataset-card.v1 (dataset id, version, name, owner, description, provenance, lawful basis, licence and retention rule), and the admission record links to it.',
      },
    ],
    evidence: [
      { artefact: 'Dataset card per admitted version', schemaId: 'dataset-card', layer: 2 },
      { artefact: 'Card-completeness check on the admission record', schemaId: 'dataset-admission-record', layer: 1 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A version whose card is missing or incomplete is not admitted; the admission record names the card that was checked.',
    },
    layer: 2,
    patterns: ['dataset-admission-gate', 'model-card-as-control-evidence'],
    derivedFrom: [
      { kind: 'schema', ref: 'dataset-card' },
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-ISO42001-A7'],
      iso42001: ['A.7.2', 'A.7.5'],
      nistAiRmf: ['MAP 2.3'],
      owasp: [],
    },
    references: [CH14.data, CH14.cards, PATTERN.gate, DATASHEETS, AI_ACT_ART10, ISO_42001, NIST_AI_RMF],
    implementationNotes: [
      'Fill the card from the same records the gate reads (the admission record and lineage), so the datasheet travels with the admission record and covers motivation, composition, collection, preprocessing, uses, distribution and maintenance.',
      'Record in the card who the data does and does not represent (populations and known gaps) and the quality and bias checks run against this version, with their results.',
    ],
    openQuestions: [
      'Which optional card fields (composition, representativeness, quality checks, splits) should become mandatory for data admitted to a high-risk system?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-003',
    title: 'Training-Data Rights Ledger Row per Source',
    objective:
      'Every training source has a ledger row, per source and not per merged dataset, that records its acquisition channel, licensor, licence terms for training, commercial use and distribution of derived models, the legal basis where the data is personal, the permitted uses and, for crawled content, the rights-reservation check with its method, result and date.',
    failureModes: [
      'Nobody can say which sources trained which model version, or on what terms.',
      'A single unlicensed or unlawfully obtained source contaminates every model trained on it, and without per-source lineage the only safe response is to delete everything.',
      'Crawled content is used although the rightholder reserved its rights by machine-readable means, because the reservation check was not run, was not recorded or is stale.',
    ],
    scope:
      'Every source a provider trains or fine-tunes on: internal data, licensed corpora, open datasets, crawled web content and user data. The ledger records the organisation\'s position; it does not settle open legal questions.',
    enforcementPoints: ['deploy'],
    verification: [
      {
        kind: 'test',
        text: 'The corpus build and the dataset admission gate fail on a source with no ledger row, on a source whose terms do not permit the declared use and on a source whose reservation check is missing or stale.',
      },
    ],
    evidence: [
      { artefact: 'Ledger row per source and version, with the reservation-check method, result and date for crawled content', layer: 2 },
      { artefact: 'Licence on the dataset card: name, whether training is allowed, whether text-and-data-mining reservations were checked', schemaId: 'dataset-card', layer: 2 },
      { artefact: 'Ledger check (rows present) on the admission record', schemaId: 'dataset-admission-record', layer: 1 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A source with no row, with terms that do not permit the declared use or with a missing or stale reservation check fails the corpus build and admission.',
    },
    layer: 2,
    patterns: ['training-data-rights-ledger', 'dataset-admission-gate', 'aibom'],
    derivedFrom: [
      { kind: 'pattern', ref: 'training-data-rights-ledger' },
      { kind: 'schema', ref: 'dataset-card' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART10',
        'AIGE-OBL-EUAIA-ART53-1C',
        'AIGE-OBL-DSM-ART4-3',
        'AIGE-OBL-GDPR-ART5-1B',
      ],
      iso42001: ['A.7.5'],
      nistAiRmf: ['GOVERN 6.1', 'MAP 4.1'],
      owasp: [],
    },
    references: [PATTERN.ledger, CH14.rights, DSM_DIRECTIVE, AI_ACT_ART53, AI_ACT_ART10, FTC_EVERALBUM, ISO_42001, NIST_AI_RMF],
    implementationNotes: [
      'For crawled content, record the crawler identity, the window and the reservation check: the method (for example robots.txt and page metadata read at fetch time), the result and the date. The crawl pipeline should write rows itself, since a row per source is real work for large crawls.',
      'Put the licence in the AIBOM as well, so a licence change surfaces in the next build.',
      'Generate the disclosures (the GPAI training-content summary under Art. 53(1)(d) and similar training-data documentation) as queries over the ledger, not as documents written from memory.',
    ],
    openQuestions: [
      'How fresh must a reservation check be before the gate treats it as stale, and should it be re-run at every corpus build?',
      'At what granularity should rows be kept when rights attach per record (opt-outs, per-record licences) rather than per source?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-004',
    title: 'Lawful Basis and Assessment per Processing Stage',
    objective:
      'Each dataset carries, for each processing stage (training, fine-tuning, retrieval, inference, log monitoring), its lawful basis, its purpose and a pointer to the assessment behind it, and processing likely to result in a high risk has a versioned DPIA or a recorded decision that none was needed.',
    failureModes: [
      'One basis is picked for "the model", although training, indexing and answering a live customer are different activities that each need their own basis.',
      'A training job runs on a dataset whose recorded basis does not cover training, or on data whose basis was never recorded.',
      'A legitimate-interest assessment points at mitigations that have been switched off, and the registry does not show that it went stale.',
      'No DPIA exists and no decision that one was not needed was recorded.',
    ],
    scope:
      'Personal data in datasets used for training, fine-tuning and retrieval, and the stages that process it. Transfers, automated decision-making and the rights path are outside this control; the fundamental rights impact assessment is covered only where it builds on the DPIA.',
    enforcementPoints: ['runtime', 'periodic'],
    verification: [
      {
        kind: 'test',
        text: 'The training job reads the basis registry before it runs and refuses to run on a dataset whose basis does not cover training.',
      },
    ],
    evidence: [
      { artefact: 'Lawful basis for this purpose on the dataset card', schemaId: 'dataset-card', layer: 2 },
      { artefact: 'Basis registry entry per dataset and stage, with the reference of its assessment (for example a versioned LIA)', layer: 2 },
      { artefact: 'Versioned AI DPIA addendum, or the recorded decision that no DPIA was needed', schemaId: 'impact-assessment', layer: 2 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'The job refuses to run on a dataset whose basis does not cover the stage. Where the DPIA shows high residual risk, the controller consults the supervisory authority before the processing.',
    },
    layer: 2,
    patterns: ['dataset-admission-gate', 'training-data-rights-ledger', 'fria-as-code'],
    derivedFrom: [
      { kind: 'schema', ref: 'dataset-card' },
      { kind: 'schema', ref: 'impact-assessment' },
      { kind: 'chapter', ref: 'privacy-and-ai' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-GDPR-ART6', 'AIGE-OBL-GDPR-ART35-36'],
      iso42001: [],
      nistAiRmf: ['MEASURE 2.10'],
      owasp: [],
    },
    references: [CH19.basis, CH19.dpia, CH14.rights, GDPR, EDPB_OPINION_28, NIST_AI_RMF],
    implementationNotes: [
      'Keep the basis registry attached to the system\'s registry entry: each dataset and stage carries its basis, purpose and a pointer to the assessment behind it, and the training job reads it.',
      'Make the legitimate-interest assessment a versioned artefact that points each mitigation at the control implementing it (the opt-out endpoint, the filter rule id, the scraping allow-list); switch a mitigation off and the LIA goes stale.',
      'Generate most of the AI DPIA from the registry: processing moments from the registry, bases from the basis registry, with the DPO still writing and signing the risk judgement. The impact-assessment schema carries a dpia_addendum type for the AI-specific fields.',
    ],
    openQuestions: [
      'Should the admission gate itself refuse a dataset whose stage has no DPIA and no recorded "no DPIA" decision, or is that a periodic check over the registry?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-005',
    title: 'Purpose Match Before Reuse of Data',
    objective:
      'A run that reads a dataset is denied when the purpose on the dataset\'s card differs from the purpose declared by the consuming system and no compatibility assessment is recorded.',
    failureModes: [
      'Data is reused for a purpose incompatible with the one it was collected for: support transcripts reused to profile customers for sales, security footage reused for attendance, fraud features reused for credit limits.',
      'Consent to a service is treated as consent to train a model on the service\'s data.',
      'A purpose mismatch is caught by nobody because the purpose travels in a document, not as a tag on the data a rule can read.',
    ],
    scope:
      'Personal data further processed for training, fine-tuning or indexing by a system other than, or for a purpose other than, the one it was collected for.',
    enforcementPoints: ['runtime'],
    verification: [
      {
        kind: 'test',
        text: 'A run whose declared purpose differs from the purpose on the dataset\'s card, with no compatibility assessment recorded, is denied, and the denial is filed against the dataset\'s registry entry.',
      },
    ],
    evidence: [
      { artefact: 'Purpose-match verdict per run', layer: 1 },
      { artefact: 'Compatibility and use-case checks on the admission record', schemaId: 'dataset-admission-record', layer: 1 },
      { artefact: 'Art. 6(4) compatibility assessment filed against the dataset', layer: 2 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'The run is denied; the request becomes an Art. 6(4) compatibility assessment, and the denied run and the assessment are both filed against the dataset\'s registry entry.',
    },
    layer: 1,
    secondaryLayers: [2],
    patterns: ['dataset-admission-gate', 'training-data-rights-ledger', 'policy-card'],
    derivedFrom: [
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'schema', ref: 'dataset-admission-record' },
      { kind: 'chapter', ref: 'privacy-and-ai' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-GDPR-ART5-1B'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
    },
    references: [CH19.purpose, CH14.rights, PATTERN.gate, GDPR],
    implementationNotes: [
      'Use a purpose tag that travels with the data and a layer 01 rule that compares it with the purpose declared by the consuming system; a denied join is proof the purpose limit bit.',
      'The Art. 6(4) test weighs the link between purposes, the context, the nature of the data, the consequences and the safeguards, such as encryption or pseudonymisation; record the outcome, including a partial one (for example "aggregated topic counts only").',
    ],
    openQuestions: [
      'How should purposes be named so that a rule can compare them: a controlled vocabulary per organisation, or the use-case ids of the registry?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-006',
    title: 'Personal Data Screening and Minimisation',
    objective:
      'Personal and special-category data are screened on each snapshot before training, the filter log is kept with the snapshot, each input feature carries a reason and a measured contribution, and retention follows a rule enforced in code.',
    failureModes: [
      'A snapshot enters training without a PII or special-category scan, or the scan ran and its log was not kept.',
      'Features with no reason and no measured contribution stay in the data, so minimisation is asserted once instead of argued feature by feature.',
      'Special-category fields are used with no documented condition.',
      'Retention follows the storage default rather than the obligation, and data is kept past its deletion date.',
    ],
    scope:
      'Snapshots and features admitted to training, fine-tuning, evaluation and retrieval pipelines, and their retention. Retrieval indexes and logs are covered for minimisation only; anonymity claims about trained models are outside this control.',
    enforcementPoints: ['deploy', 'periodic'],
    verification: [
      {
        kind: 'inspect',
        text: 'Each admitted snapshot has the log of the PII and special-category scan run on it, and its card records a retention rule as enforced in code.',
      },
    ],
    evidence: [
      { artefact: 'PII and special-category filter log kept with each snapshot', layer: 1 },
      { artefact: 'Personal-data flag and retention rule on the dataset card', schemaId: 'dataset-card', layer: 2 },
      { artefact: 'Screening and retention-set checks on the admission record', schemaId: 'dataset-admission-record', layer: 1 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A snapshot with no scan log, or a special-category field with no documented condition, is not admitted; a feature with neither a reason nor a measured contribution is removed.',
    },
    layer: 1,
    secondaryLayers: [3],
    patterns: ['dataset-admission-gate'],
    derivedFrom: [
      { kind: 'schema', ref: 'dataset-card' },
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'chapter', ref: 'privacy-and-ai' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-GDPR-ART25'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
    },
    references: [CH19.minimisation, CH19.map, GDPR, EDPB_OPINION_28],
    implementationNotes: [
      'Argue minimisation feature by feature in the data card; the EDPB lists source selection, preparation and filtering among the areas an authority examines.',
      'Hold only the fields answers need in retrieval indexes, and use synthetic or masked eval sets wherever a test does not depend on real identities.',
      'Treat a synthetic set as a dataset with its own admission record naming the generator, the seed data and the privacy method: synthetic data inherits the biases, gaps and, where the generator memorised, the source records of its generator.',
    ],
    openQuestions: [
      'What detection rate should a PII or special-category scan reach before its "pass" is accepted as evidence, and how is that rate measured?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-007',
    title: 'Special-Category Data Conditions',
    objective:
      'Special-category data in a dataset is recorded with the Art. 9(2) condition relied on, and when it is processed for bias detection and correction under Art. 4a it is used only where other data would not do, pseudonymised, access-controlled, not transmitted onwards and deleted once the bias is corrected, with the records of processing stating why it was strictly necessary.',
    failureModes: [
      'Special-category data is present in a dataset whose card says it is not, or with no condition recorded.',
      'Data admitted for bias detection is kept after the bias was corrected, used for another purpose or passed on.',
      'The records of processing do not say why special-category data was strictly necessary and why other data, including synthetic or anonymised data, would not do.',
    ],
    scope:
      'Datasets that contain special-category personal data, including data processed only to detect and correct bias. Sensitive data a model infers at runtime is covered by the proxy test and inference policy of chapter 19, not here.',
    enforcementPoints: ['deploy', 'periodic'],
    verification: [
      {
        kind: 'inspect',
        text: 'For each dataset processed under Art. 4a, the records of processing hold the strictly-necessary reason and a deletion log shows the data deleted once the bias was corrected.',
      },
    ],
    evidence: [
      {
        artefact: 'Special-category block on the dataset card: presence, condition relied on, and whether it is processed only for bias detection',
        schemaId: 'dataset-card',
        layer: 2,
      },
      { artefact: 'Records-of-processing entry with the Art. 4a reason', layer: 2 },
      { artefact: 'Deletion log of the pseudonymised bias set', layer: 1 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A dataset with special-category data and no recorded condition is not admitted; an Art. 4a bias set without pseudonymisation or a deletion rule is not admitted for bias detection.',
    },
    layer: 1,
    secondaryLayers: [2],
    patterns: ['dataset-admission-gate', 'fairness-eval-suite'],
    derivedFrom: [
      { kind: 'schema', ref: 'dataset-card' },
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'chapter', ref: 'privacy-and-ai' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-GDPR-ART9', 'AIGE-OBL-EUAIA-ART4A', 'AIGE-OBL-GDPR-ART30'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
    },
    references: [CH19.special, CH19.ropa, CH14.rights, PATTERN.gate, AI_ACT_ART4A, GDPR],
    implementationNotes: [
      'After the Digital Omnibus, the narrow basis to process special-category data for bias detection sits in Art. 4a rather than the deleted Art. 10(5); record which one a legacy card relies on and re-check it.',
      'Generate the records-of-processing entries from the registry, the data cards and the basis registry, so the Art. 4a reason does not go stale with the next pipeline change.',
    ],
    openQuestions: [
      'What evidence shows that other data, including synthetic or anonymised data, would not have done for a given bias examination?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-008',
    title: 'Fitness-for-Purpose Checks Before Admission',
    objective:
      'Before a dataset version is admitted, its quality (label accuracy, completeness, consistency, timeliness), its quantity per class and per group, its representativeness against the deployment population and a proxy and bias examination are checked and recorded, each passing or waived in writing by someone entitled to waive it.',
    failureModes: [
      'A dataset large enough but drawn from the wrong population is admitted: quantity is taken for representativeness.',
      'A group falls below the minimum cell size in the test plan and nobody records it.',
      'No bias examination is recorded, or a failed check is waived with no signer, no condition and no expiry.',
      'The data measures a proxy rather than what the use case needs, and the assumption is never written down.',
    ],
    scope:
      'Training, validation and testing datasets for high-risk systems, where Art. 10 applies, and any dataset admitted under the organisation\'s own policy. Fairness testing of the trained model is covered by the Fairness Eval Suite pattern, not here.',
    enforcementPoints: ['deploy'],
    verification: [
      {
        kind: 'inspect',
        text: 'The admission record holds a result for each quality, quantity, representativeness and bias check, with the obligation it enforces; every waived check names a waiver signed by the data owner and every condition is listed.',
      },
    ],
    evidence: [
      { artefact: 'Quality, representativeness and bias check results on the admission record, with waivers and conditions', schemaId: 'dataset-admission-record', layer: 1 },
      { artefact: 'Quality checks, populations covered and known gaps on the dataset card', schemaId: 'dataset-card', layer: 2 },
    ],
    failureResponse: {
      effect: 'require_approval',
      text: 'A failed check blocks admission unless someone entitled to waive it signs a waiver; the waiver and its conditions appear in the model card, and the next retrain cannot start until the conditions are closed.',
    },
    layer: 2,
    secondaryLayers: [3],
    patterns: ['dataset-admission-gate', 'fairness-eval-suite'],
    derivedFrom: [
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'schema', ref: 'dataset-admission-record' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-ISO42001-A7'],
      iso42001: ['A.7.4'],
      nistAiRmf: ['MAP 2.3'],
      owasp: [],
    },
    references: [CH14.quality, PATTERN.gate, AI_ACT_ART10, ISO_5259, ISO_42001, NIST_AI_RMF],
    implementationNotes: [
      'Use the vocabulary of the ISO/IEC 5259 series for the quality measures, and evidence each dimension with the test chapter 14 names: an audit of a labelled sample and inter-annotator agreement for labels, null rates per field and segment for completeness, cell counts against the minimum in the test plan for quantity, a distribution comparison against a reference for representativeness.',
      'Keep an assumption register for what the data is meant to measure (Art. 10(2)(d)) and a proxy analysis for fitness for purpose.',
    ],
    openQuestions: [
      'Who sets the thresholds each check is held to, and how are they reviewed when the deployment population changes?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-009',
    title: 'Signed Snapshot Integrity',
    objective:
      'Only a content-addressed, signed snapshot is admitted, its hash is re-verified when a job reads it, and new or appended data is checked for anomalies before it is admitted.',
    failureModes: [
      'A model trains on a snapshot someone altered after admission.',
      'Poisoned data enters through an appended batch that was never checked, so the model still looks functional while carrying a bias, a weakness or a backdoor.',
      'The admission record names a hash that no job ever compares with the data it reads.',
    ],
    scope:
      'Snapshots admitted to training, fine-tuning, validation, testing, evaluation and retrieval-index pipelines, and data appended to them. The integrity of the trained model artefact is covered by the Model Artefact Integrity pattern.',
    enforcementPoints: ['deploy', 'runtime'],
    verification: [
      {
        kind: 'test',
        text: 'When a job reads an admitted snapshot, the hash of what it reads is compared with the content hash on the admission record, and a mismatch stops the read.',
      },
    ],
    evidence: [
      { artefact: 'Content hash of the admitted snapshot and the signature over the admission record', schemaId: 'dataset-admission-record', layer: 1 },
      { artefact: 'Read-time hash verification and anomaly-check results', layer: 1 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A snapshot whose hash does not match its admission record is not read; new or appended data that fails the anomaly checks is not admitted.',
    },
    layer: 2,
    secondaryLayers: [1],
    patterns: ['dataset-admission-gate', 'aibom'],
    derivedFrom: [
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'schema', ref: 'dataset-admission-record' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-OWASP-LLM'],
      iso42001: ['A.7.5'],
      nistAiRmf: [],
      owasp: ['llm05-2026'],
      other: [
        { framework: 'MITRE ATLAS', ref: 'AML.M0007', note: 'Sanitize Training Data (mitigation)' },
        { framework: 'MITRE ATLAS', ref: 'AML.M0025', note: 'Maintain AI Dataset Provenance (mitigation)' },
      ],
    },
    references: [PATTERN.gate, CH14.quality, OWASP_LLM, ATLAS_DATA, ISO_42001],
    implementationNotes: [
      'Sign the admission record (for example "ed25519:<base64>") so it is tamper-evident in the evidence store, and record the digest of the snapshot that was checked in its input_hash.',
      'Training data is an attack surface: ATLAS catalogues training data poisoning (AML.T0020) and lists "Sanitize Training Data" (AML.M0007) and "Maintain AI Dataset Provenance" (AML.M0025) among its mitigations.',
    ],
    openQuestions: [
      'Which anomaly checks on appended data are strong enough to catch planted triggers, and which belong instead in the regression evals of the trained model?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-010',
    title: 'Lineage from Training Runs to Admitted Sources',
    objective:
      'Each training run records the admission records and ledger rows (id and version) it read and the hashes of the admitted snapshots, so backward lineage answers "what trained this model?" and forward lineage answers "which models used this source?".',
    failureModes: [
      'A licence withdrawal, an erasure request or an order names a source, and nobody can list the models trained on it.',
      'The model card lists datasets by name but not by version or snapshot hash, so the training cannot be reproduced.',
      'Lineage is kept at dataset level only where rights attach to records, so an opt-out cannot be traced to the runs it affects.',
    ],
    scope:
      'Training and fine-tuning runs and the datasets, snapshots and ledger rows they read. Evaluation runs are covered for the data they read, not for their results.',
    enforcementPoints: ['deploy'],
    verification: [
      {
        kind: 'inspect',
        text: 'For a released model version, the run record names the admission records and ledger rows it read, and a forward-lineage query from one of those sources returns the model version.',
      },
    ],
    evidence: [
      { artefact: 'Datasets used to train, validate, test or fine-tune the model, by version, on the model card', schemaId: 'model-card', layer: 2 },
      { artefact: 'Link to the lineage record (for example an OpenLineage or W3C PROV graph) on the dataset card', schemaId: 'dataset-card', layer: 2 },
      { artefact: 'Training run record with the code commit, the hashes of the admitted snapshots and the admission records and ledger rows read', layer: 2 },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'A training run that does not record the admission records and ledger rows it read is flagged to the model owner: until its lineage is restored, a withdrawal or an order cannot be traced to that model version.',
    },
    layer: 2,
    patterns: ['training-data-rights-ledger', 'dataset-admission-gate', 'aibom'],
    derivedFrom: [
      { kind: 'pattern', ref: 'training-data-rights-ledger' },
      { kind: 'pattern', ref: 'dataset-admission-gate' },
      { kind: 'schema', ref: 'model-card' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART10', 'AIGE-OBL-ISO42001-A7'],
      iso42001: ['A.7.5'],
      nistAiRmf: [],
      owasp: [],
    },
    references: [CH14.lineage, CH14.reproducibility, PATTERN.ledger, PATTERN.gate, W3C_PROV, OPENLINEAGE, ISO_42001],
    implementationNotes: [
      'Record provenance in W3C PROV terms (entities, activities and agents) and emit lineage events over datasets, jobs and runs, so each training run names the admission records it read.',
      'Choose granularity by where rights attach: dataset-level provenance by default, record-level where rights attach to records (personal data, per-source licences, opt-outs), feature-level lineage for sensitive derived features that can act as proxies.',
      'List the datasets by version in the AIBOM as well.',
    ],
    openQuestions: [
      'The site publishes no schema for a model training run (the published training-record schema covers AI literacy training): should one be published, or should the model card and AIBOM carry the run fields?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-011',
    title: 'Rights Changes Propagated to Affected Models',
    objective:
      'A licence expiry or withdrawal, a new rights reservation, a consent withdrawal, an erasure request or an order marks the affected ledger rows and snapshots, forward lineage lists the affected models, and the remediation (retrain without the source, retire the model, or a documented decision to rely on another basis) is recorded against the same rows with a date and an approver.',
    failureModes: [
      'An erasure request closes on time at the source system but the training snapshot, retrieval index, logs and models trained on the data are never reached.',
      'A consent withdrawal cannot be traced to the runs and model versions that inherited the consent.',
      'Remedies reach the model itself (an order to delete models developed using unlawfully used data) and, without per-source lineage, the only safe response is to delete everything.',
      'A change in rights does not reopen admission, and the next retrain reads the source again.',
    ],
    scope:
      'Changes in the right to use a training source or a person\'s data after admission, and the datasets, indexes and model versions they reach. The per-location response to a data-subject request is the Rights Requests Against Models pattern; this control covers the propagation from the data to the models.',
    enforcementPoints: ['periodic'],
    verification: [
      {
        kind: 'test',
        text: 'Run a mock erasure request through the corpus, the snapshots, the retrieval index, the logs and the weights, write the fulfilment record, and time it against the one-month deadline.',
      },
    ],
    evidence: [
      { artefact: 'Re-admission record for the affected dataset versions', schemaId: 'dataset-admission-record', layer: 1 },
      { artefact: 'Remediation recorded against the affected ledger rows, with the models forward lineage listed, a date and an approver', layer: 2 },
      { artefact: 'Fulfilment record: every location, the action in each, the model versions affected and when the gap closes', layer: 5 },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'The change marks the affected rows and reopens admission; the owners of every affected model are told, and each model is retrained without the source, retired or kept on a documented decision to rely on another basis.',
    },
    layer: 2,
    patterns: ['training-data-rights-ledger', 'dataset-admission-gate', 'rights-requests-against-models'],
    derivedFrom: [
      { kind: 'pattern', ref: 'training-data-rights-ledger' },
      { kind: 'pattern', ref: 'rights-requests-against-models' },
      { kind: 'schema', ref: 'dataset-admission-record' },
      { kind: 'chapter', ref: 'privacy-and-ai' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-GDPR-ART15-17-21', 'AIGE-OBL-GDPR-ART7', 'AIGE-OBL-DSM-ART4-3'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
    },
    references: [PATTERN.ledger, CH19.requests, CH19.consent, PATTERN.rights, CH14.lineage, GDPR, FTC_EVERALBUM],
    implementationNotes: [
      'Keep a consent-purpose log joining each consent to the datasets and model versions that inherited it; without that join a withdrawal cannot be traced to the runs it affects.',
      'For data inside the weights, choose on the ladder chapter 19 sets out (output suppression, retraining without the data, machine unlearning) and record the choice and its reason per request, with the date the next retrain closes the gap.',
    ],
    openQuestions: [
      'How long may a model stay in production on output suppression before retraining without the data is due, and who decides?',
    ],
  },
  {
    ...base,
    id: 'AIGE-CTL-DATA-012',
    title: 'Registered Downstream Consumers of Outputs',
    objective:
      'Every consumer of a system\'s outputs (a system, a team, a partner or a training pipeline) is registered against the producing system with its purpose, its approval and the re-test that cleared the outputs for that context; access to the outputs is granted per registered consumer, and the intended and prohibited uses are rules on a Policy Card.',
    failureModes: [
      'A risk score approved to prioritise manual review becomes an automatic decline in another team\'s pipeline, and nobody assessed that use.',
      'A model\'s outputs are harvested as training data for another model, and the feedback loop is invisible.',
      'A partner receives outputs under a contract nobody connected to the registry, and is not told when the model changes or retires.',
    ],
    scope:
      'Consumers of the outputs of AI systems, internal and external, including training pipelines that read those outputs. Registration binds internal consumers; external ones depend on contract terms and audit rights.',
    enforcementPoints: ['deploy', 'runtime'],
    verification: [
      {
        kind: 'test',
        text: 'A consumer with no registration has no credential to the output API or table, and a registration whose declared use meets a prohibited-use rule on the card is refused.',
      },
    ],
    evidence: [
      { artefact: 'Intended and prohibited uses as rules on the system\'s Policy Card', schemaId: 'policy-card', layer: 1 },
      { artefact: 'Downstream use register entry: each consumer with its use, approval, re-test, credential or contract, and the feedback-loop check', layer: 2 },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'An unregistered consumer gets no credential; a declared use outside the card fails registration and reopens classification and the impact assessments as a new purpose. A model change, an incident or a retirement notifies every registered consumer.',
    },
    layer: 2,
    secondaryLayers: [1],
    patterns: ['downstream-use-register', 'policy-card', 'agent-registry', 'disclosure-notification-pipeline'],
    derivedFrom: [
      { kind: 'pattern', ref: 'downstream-use-register' },
      { kind: 'schema', ref: 'policy-card' },
      { kind: 'chapter', ref: 'governing-development' },
    ],
    mappings: {
      obligations: [
        'AIGE-OBL-EUAIA-ART9',
        'AIGE-OBL-EUAIA-ART25',
        'AIGE-OBL-EUAIA-ART50',
        'AIGE-OBL-ISO42001-A8',
        'AIGE-OBL-ISO42001-A9',
      ],
      iso42001: ['A.8.2', 'A.9.4'],
      nistAiRmf: ['MAP 1.1', 'MAP 3.3', 'MANAGE 1.4'],
      owasp: ['llm10-2026', 'asi08'],
    },
    references: [PATTERN.downstream, CH14.creep, AI_ACT_DOWNSTREAM, OWASP_LLM, OWASP_AGENTIC, ISO_42001, NIST_AI_RMF],
    implementationNotes: [
      'Forecast misuse before go-live with a premortem, abuse cases written next to the user stories and a stakeholder impact map that includes people who never touch the interface; each plausible misuse becomes a prohibited-use rule or a monitor.',
      'Stamp outputs with the producing system and version, the intended use and a caveat, as metadata a consumer can read; for generative content, this is the machine-readable marking Art. 50(2) requires of providers.',
      'Classify consumer requests against the negative space of the card, alert on what falls outside it, and watch for outputs that return as training data.',
    ],
    openQuestions: [
      'How is a registered external consumer held to its declared use when the outputs leave the organisation\'s access controls?',
    ],
  },
];
