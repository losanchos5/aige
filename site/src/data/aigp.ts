// aigp.ts: the AIGP coverage map. It lays the public AIGP Body of Knowledge and
// Exam Blueprint (IAPP, version 2.1, effective 2026-02-02) over this site: the
// four domains, the 13 competencies with the question ranges the blueprint
// publishes, and the 58 performance indicators under positional ids (I.A.1 is
// the first indicator of competency I.A, in the blueprint's own order).
//
// What is ours and what is theirs:
// - `paraphrase` is this site's own wording, at most 12 words. It is never the
//   IAPP text; read the blueprint itself for the wording that is examined.
// - domain and competency `title`s are short labels of our own that identify
//   the blueprint's headings; codes and question ranges are the blueprint's.
// - `links` and `status` are our mapping. The first link of an indicator is the
//   section a reader studies first (the per-domain study path is built from it);
//   the rest lead to the artefact: a pattern, a template, a glossary term, a
//   tool or a resource page.
//
// Status follows the house criterion:
// - 'taught': a section lets a reader learn the indicator and leads to an
//   artefact they can reuse;
// - 'partly-taught': the site covers the topic, but thinly or without an
//   artefact of its own; `note` says what is missing.
// There is deliberately no overall score: coverage of a blueprint is not
// competence, and a tally would read as one.
//
// Links policy: every href is an internal path. src/lib/aigp-coverage.ts
// resolves each one at build time (a chapter heading slug, a pattern, a
// glossary term, a live toolkit tool, a template or schema row, or a known
// route) and the build fails on any that does not resolve; tests/aigp.spec.ts
// runs the same check.
//
// This module has no runtime imports, so a build script can load it with
// scripts/lib/load-ts.mjs if the heatmap ever joins the figures pipeline.
//
// AIGP is a registered trademark of the IAPP. This site is not affiliated with
// or endorsed by the IAPP.

export type AigpStatus = 'taught' | 'partly-taught';
export type AigpDomainCode = 'I' | 'II' | 'III' | 'IV';

/** Minimum and maximum number of exam questions, as the blueprint states. */
export interface QuestionRange {
  min: number;
  max: number;
}

export interface AigpIndicator {
  /** Positional id: domain, competency letter, 1-based position (e.g. `II.C.5`). */
  id: string;
  /** This site's own paraphrase, at most 12 words; never the IAPP text. */
  paraphrase: string;
  /** House criterion: taught, or partly taught. */
  status: AigpStatus;
  /** Internal hrefs; the first is the section to study first. */
  links: readonly string[];
  /** What is missing, for a partly-taught indicator. */
  note?: string;
}

export interface AigpCompetency {
  /** Blueprint code, e.g. `I.A`. */
  code: string;
  /** Short label of our own for the competency. */
  title: string;
  questions: QuestionRange;
  indicators: readonly AigpIndicator[];
}

export interface AigpDomain {
  code: AigpDomainCode;
  /** Short label of our own for the domain. */
  title: string;
  questions: QuestionRange;
  /** Chapters that carry most of the domain, for the page lede. */
  chapters: readonly string[];
  competencies: readonly AigpCompetency[];
}

/** The document this map is laid over. */
export const aigpBok = {
  name: 'AIGP Body of Knowledge and Exam Blueprint',
  owner: 'IAPP',
  version: '2.1',
  approved: '2025-09-09',
  effective: '2026-02-02',
  supersedes: '2.0.1',
  url: 'https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf',
} as const;

/** The mapping was last checked against the site and the blueprint on this date. */
export const aigpAsOf = '2026-09-24';
/** Re-check by this date: the blueprint is reviewed every year. */
export const aigpReviewBy = '2027-01-31';

/** The fixed notice the map carries wherever it appears. */
export const aigpNotice =
  'AIGP is a registered trademark of the IAPP; this site is not affiliated with or endorsed by the IAPP; this is a coverage map of an open body of knowledge, not exam preparation.';

export const statusLabel: Readonly<Record<AigpStatus, string>> = {
  taught: 'Taught',
  'partly-taught': 'Partly taught',
};

export const statusCriterion: Readonly<Record<AigpStatus, string>> = {
  taught: 'A section lets a reader learn the indicator and leads to an artefact they can reuse.',
  'partly-taught':
    'The site covers the topic, but thinly or without an artefact of its own; the row says what is missing.',
};

export const aigpDomains: readonly AigpDomain[] = [
  {
    code: 'I',
    title: 'Foundations of AI governance',
    questions: { min: 16, max: 20 },
    chapters: ['03', '11', '12', '13', '18'],
    competencies: [
      {
        code: 'I.A',
        title: 'What AI is and why it needs governing',
        questions: { min: 4, max: 6 },
        indicators: [
          {
            id: 'I.A.1',
            paraphrase: 'Tell the main definitions of AI apart and classify kinds of AI.',
            status: 'taught',
            links: [
              '/bok/ai-defined#four-definitions-compared',
              '/bok/ai-defined#kinds-of-ai-that-change-the-governance-problem',
              '/bok/ai-defined#from-definition-element-to-registry-field',
              '/glossary/ai-system',
              '/resources/templates#schema-ai-system-register-entry',
            ],
          },
          {
            id: 'I.A.2',
            paraphrase: 'Name the harms AI can do to people, groups, organisations, society.',
            status: 'taught',
            links: [
              '/bok/risk-management#internal-and-external-risk-sources',
              '/resources/harms',
              '/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm',
              '/glossary/ai-harm',
              '/cases',
            ],
          },
          {
            id: 'I.A.3',
            paraphrase: 'Explain which traits of AI defeat classic IT governance.',
            status: 'taught',
            links: [
              '/bok/ai-defined#eight-characteristics-that-break-classic-it-governance',
              '/bok/ai-defined#ai-versus-conventional-software',
              '/bok/ai-defined#governing-probabilistic-outputs',
              '/glossary/opacity',
              '/patterns/aibom',
            ],
          },
          {
            id: 'I.A.4',
            paraphrase: 'Turn widely shared responsible-AI principles into working controls.',
            status: 'taught',
            links: [
              '/bok/ai-defined#responsible-ai-principle-sets-engineered',
              '/bok/ai-defined#from-principle-to-artefact',
              '/bok/values-and-principles#the-six-principles',
              '/glossary/responsible-ai-principle-set',
              '/patterns/policy-card',
            ],
          },
        ],
      },
      {
        code: 'I.B',
        title: 'Organisational expectations for AI governance',
        questions: { min: 5, max: 7 },
        indicators: [
          {
            id: 'I.B.1',
            paraphrase: 'Assign governance roles and responsibilities to every stakeholder.',
            status: 'taught',
            links: [
              '/bok/governance-program#the-stakeholder-map',
              '/bok/governance-program#a-lifecycle-raci',
              '/resources/templates#kit-raci',
              '/bok/the-role#what-the-role-owns-by-workflow',
            ],
          },
          {
            id: 'I.B.2',
            paraphrase: 'Make the governance programme cross-functional by design.',
            status: 'taught',
            links: [
              '/bok/governance-program#the-committee-decides-the-gates-enforce',
              '/bok/governance-program#charter-and-membership',
              '/bok/governance-program#enterprise-risk-the-three-lines-and-internal-audit',
              '/resources/templates#kit-committee-charter',
              '/glossary/ai-governance-committee',
            ],
          },
          {
            id: 'I.B.3',
            paraphrase: 'Give each audience role-based AI literacy training, with records.',
            status: 'taught',
            links: [
              '/bok/governance-program#ai-literacy-as-code',
              '/bok/governance-program#role-based-curricula',
              '/resources/templates#kit-literacy-curriculum',
              '/resources/templates#schema-training-record',
              '/glossary/ai-literacy',
            ],
          },
          {
            id: 'I.B.4',
            paraphrase: 'Fit the programme to size, maturity, sector and risk appetite.',
            status: 'taught',
            links: [
              '/bok/risk-management#proportionate-governance-tailoring-the-loop',
              '/bok/risk-management#sector-overlays',
              '/bok/governance-program#standing-up-a-program-without-engineering-capacity',
              '/toolkit/maturity-self-check',
              '/glossary/proportionate-governance',
            ],
          },
          {
            id: 'I.B.5',
            paraphrase: 'Separate developer, provider, deployer and user duties.',
            status: 'taught',
            links: [
              '/bok/eu-ai-act#who-you-are-in-the-value-chain',
              '/bok/eu-ai-act#roles-name-tasks-not-organisations',
              '/bok/eu-ai-act#the-same-roles-across-regimes',
              '/glossary/provider',
              '/glossary/deployer',
              '/resources/templates#schema-ai-system-register-entry',
            ],
          },
        ],
      },
      {
        code: 'I.C',
        title: 'Policies across the AI lifecycle',
        questions: { min: 6, max: 8 },
        indicators: [
          {
            id: 'I.C.1',
            paraphrase: 'Set policies that assign oversight at each lifecycle stage.',
            status: 'taught',
            links: [
              '/bok/governance-program#policies-across-the-lifecycle',
              '/bok/governance-program#what-policy-requires-at-each-stage',
              '/resources/templates#kit-ai-policy',
              '/patterns/policy-card',
            ],
          },
          {
            id: 'I.C.2',
            paraphrase: 'Revisit privacy, security, data and IP policies for AI.',
            status: 'taught',
            links: [
              '/bok/governance-program#updating-the-policies-you-already-have',
              '/bok/governance-program#a-data-acquisition-policy',
              '/resources/templates#kit-policy-gap-assessment',
            ],
          },
          {
            id: 'I.C.3',
            paraphrase: 'Control third-party AI through policy, due diligence and contracts.',
            status: 'taught',
            links: [
              '/bok/governance-program#third-party-ai-policy',
              '/bok/governance-program#acceptable-use-of-ai-by-staff',
              '/patterns/vendor-model-due-diligence-gate',
              '/resources/contracts',
              '/resources/templates#kit-contract-clause-checklist',
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'II',
    title: 'Laws, standards and frameworks',
    questions: { min: 19, max: 23 },
    chapters: ['08', '18', '19', '20', '21', '22'],
    competencies: [
      {
        code: 'II.A',
        title: 'Privacy and data-protection law applied to AI',
        questions: { min: 4, max: 6 },
        indicators: [
          {
            id: 'II.A.1',
            paraphrase: 'Ground AI processing in a lawful basis, notice, choice and purpose.',
            status: 'taught',
            links: [
              '/bok/privacy-and-ai#principles-applied-to-ai',
              '/bok/privacy-and-ai#lawful-basis-for-training-versus-inference',
              '/bok/privacy-and-ai#purpose-limitation-and-function-creep',
              '/bok/privacy-and-ai#obligation-to-artefact-map',
              '/glossary/lawful-basis',
            ],
          },
          {
            id: 'II.A.2',
            paraphrase: 'Minimise data and build privacy into AI by design.',
            status: 'taught',
            links: [
              '/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets',
              '/bok/the-stack#data-governance-across-the-stack',
              '/glossary/privacy-by-design-and-by-default',
              '/resources/templates#schema-dataset-admission-record',
            ],
          },
          {
            id: 'II.A.3',
            paraphrase: 'Carry controller duties, from DPIAs to rights and breaches, into AI.',
            status: 'taught',
            links: [
              '/bok/privacy-and-ai#controller-duties-across-the-ai-supply-chain',
              '/bok/privacy-and-ai#the-dpia-for-ai-systems',
              '/bok/privacy-and-ai#automated-decision-making',
              '/bok/privacy-and-ai#data-subject-rights-against-trained-models',
              '/bok/privacy-and-ai#ai-specific-privacy-breaches',
              '/resources/templates#schema-impact-assessment',
            ],
          },
          {
            id: 'II.A.4',
            paraphrase: 'Handle special-category data, biometrics included, in AI systems.',
            status: 'taught',
            links: [
              '/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics',
              '/bok/privacy-and-ai#biometrics',
              '/glossary/special-category-data',
              '/resources/templates#schema-dataset-card',
            ],
          },
        ],
      },
      {
        code: 'II.B',
        title: 'Other existing law applied to AI',
        questions: { min: 4, max: 6 },
        indicators: [
          {
            id: 'II.B.1',
            paraphrase: 'See where copyright and other IP law limit AI training.',
            status: 'taught',
            links: [
              '/bok/existing-law#intellectual-property',
              '/bok/existing-law#copyright-and-training-data',
              '/bok/existing-law#artefacts-that-evidence-ip-compliance',
              '/glossary/tdm-exception',
              '/resources/contracts',
            ],
          },
          {
            id: 'II.B.2',
            paraphrase: 'Test AI decisions against non-discrimination law in regulated sectors.',
            status: 'taught',
            links: [
              '/bok/existing-law#non-discrimination',
              '/bok/existing-law#fairness-measures-the-law-recognises',
              '/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio',
              '/bok/fairness-and-explainability#gate-conditions',
              '/glossary/disparate-impact',
            ],
          },
          {
            id: 'II.B.3',
            paraphrase: 'Keep AI claims and practices within consumer-protection law.',
            status: 'partly-taught',
            links: [
              '/bok/existing-law#consumer-protection',
              '/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement',
              '/glossary/udap',
              '/glossary/ai-washing',
              '/cases/moffatt-v-air-canada',
            ],
            note: 'The claims register is specified in prose; the gate that would enforce it is proposed in chapter 20, not yet a catalogued pattern or template.',
          },
          {
            id: 'II.B.4',
            paraphrase: 'Read AI failures through product-liability defect theories.',
            status: 'taught',
            links: [
              '/bok/existing-law#product-liability',
              '/bok/existing-law#defect-types-mapped-to-ai-failure-modes',
              '/bok/existing-law#the-defence-file',
              '/glossary/product-liability-directive-pld',
            ],
          },
        ],
      },
      {
        code: 'II.C',
        title: 'AI-specific law',
        questions: { min: 6, max: 8 },
        indicators: [
          {
            id: 'II.C.1',
            paraphrase: 'Place an AI system on a risk ladder and justify it.',
            status: 'taught',
            links: [
              '/bok/eu-ai-act#the-risk-ladder',
              '/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override',
              '/bok/ai-laws-worldwide#high-impact-ai-and-how-it-is-confirmed',
              '/glossary/classification-decision-record',
              '/resources/templates#schema-ai-system-register-entry',
            ],
          },
          {
            id: 'II.C.2',
            paraphrase: 'Know the core high-risk duties, from risk management to records.',
            status: 'taught',
            links: [
              '/bok/eu-ai-act#high-risk-requirements-articles-8-to-15',
              '/bok/governing-development#annex-iv-element-by-element',
              '/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27',
              '/patterns/fria-as-code',
              '/obligations',
            ],
          },
          {
            id: 'II.C.3',
            paraphrase: 'Know the oversight, transparency, notice and quality-management duties.',
            status: 'taught',
            links: [
              '/bok/the-stack#designing-human-oversight-article-14',
              '/bok/eu-ai-act#transparency-cases-article-50',
              '/bok/eu-ai-act#explanation-and-notice-to-affected-people',
              '/bok/eu-ai-act#article-16-and-the-quality-management-system-article-17',
              '/patterns/human-in-the-loop-gate',
            ],
          },
          {
            id: 'II.C.4',
            paraphrase: 'Know the separate duties that apply to general-purpose AI models.',
            status: 'taught',
            links: [
              '/bok/eu-ai-act#general-purpose-ai-models',
              '/bok/governing-development#the-gpai-provider-side',
              '/bok/regulatory-map#gpai-code-of-practice',
              '/glossary/gpai',
              '/glossary/training-content-summary',
            ],
          },
          {
            id: 'II.C.5',
            paraphrase: 'Know who enforces AI law and what penalties apply.',
            status: 'partly-taught',
            links: [
              '/bok/eu-ai-act#governance-and-enforcement',
              '/bok/eu-ai-act#penalties',
              '/bok/ai-laws-worldwide#enforcement-and-the-grace-period',
              '/bok/ai-laws-worldwide#comparing-the-regimes',
              '/glossary/market-surveillance-authority',
            ],
            note: 'Taught as knowledge in chapters 18 and 21; no artefact records a system\'s enforcement exposure beyond the dated obligation register.',
          },
          {
            id: 'II.C.6',
            paraphrase: 'Tell apart provider, deployer, importer and distributor duties.',
            status: 'taught',
            links: [
              '/bok/eu-ai-act#the-eu-operator-roles',
              '/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider',
              '/bok/governing-deployment#when-a-deployer-becomes-a-provider',
              '/bok/eu-ai-act#deployer-duties-article-26',
              '/glossary/importer',
              '/resources/templates#schema-deployment-decision-record',
            ],
          },
        ],
      },
      {
        code: 'II.D',
        title: 'Standards and frameworks',
        questions: { min: 3, max: 5 },
        indicators: [
          {
            id: 'II.D.1',
            paraphrase: 'Use the OECD AI principles and classification framework.',
            status: 'taught',
            links: [
              '/bok/principles-and-standards#oecd-ai-principles',
              '/bok/principles-and-standards#the-framework-for-the-classification-of-ai-systems',
              '/glossary/oecd-ai-principles',
              '/resources/crosswalk',
            ],
          },
          {
            id: 'II.D.2',
            paraphrase: 'Work with the NIST AI RMF core and its Playbook.',
            status: 'taught',
            links: [
              '/bok/principles-and-standards#nist-ai-rmf-10-in-depth',
              '/bok/principles-and-standards#the-core-19-categories',
              '/bok/principles-and-standards#how-a-playbook-entry-is-structured',
              '/bok/risk-management#nist-ai-rmf-and-isoiec-23894-on-the-stack',
              '/glossary/ai-rmf-playbook',
              '/resources/crosswalk',
            ],
          },
          {
            id: 'II.D.3',
            paraphrase: 'Know what ISO/IEC 22989, 42001 and 42005 each cover.',
            status: 'taught',
            links: [
              '/bok/principles-and-standards#the-isoiec-family',
              '/bok/principles-and-standards#the-management-system-trio',
              '/bok/regulatory-map#isoiec-42001-42005-and-42006',
              '/glossary/iso-iec-22989',
              '/glossary/iso-iec-42001',
              '/resources/templates#schema-impact-assessment',
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'III',
    title: 'Governing AI development',
    questions: { min: 21, max: 25 },
    chapters: ['13', '14', '16', '17'],
    competencies: [
      {
        code: 'III.A',
        title: 'Design and build',
        questions: { min: 6, max: 8 },
        indicators: [
          {
            id: 'III.A.1',
            paraphrase: 'Record the business problem and use case before building.',
            status: 'taught',
            links: [
              '/bok/governing-development#the-use-case-record',
              '/bok/governing-development#is-ai-the-right-tool',
              '/resources/templates#schema-use-case-record',
              '/glossary/use-case-record',
            ],
          },
          {
            id: 'III.A.2',
            paraphrase: "Carry out, or check another team's, assessment of the system's impacts.",
            status: 'taught',
            links: [
              '/bok/governing-development#impact-assessments-compared',
              '/bok/governing-development#performing-versus-reviewing',
              '/patterns/fria-as-code',
              '/resources/templates#schema-impact-assessment',
              '/glossary/ai-system-impact-assessment',
            ],
          },
          {
            id: 'III.A.3',
            paraphrase: 'Apply policy and ethics in design review, oversight included.',
            status: 'taught',
            links: [
              '/bok/governing-development#design-review',
              '/bok/governing-development#architecture-and-model-selection-trade-offs',
              '/bok/governing-development#oversight-and-controls-designed-in',
              '/resources/templates#schema-design-record',
              '/patterns/policy-card',
            ],
          },
          {
            id: 'III.A.4',
            paraphrase: 'Find and treat design-stage risks with matrix, hierarchy, pilots.',
            status: 'taught',
            links: [
              '/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix',
              '/bok/risk-management#treating-risk-the-mitigation-hierarchy',
              '/bok/risk-management#stakeholder-mapping',
              '/bok/governing-development#reasonably-foreseeable-misuse',
              '/resources/templates#schema-risk-register-entry',
            ],
          },
          {
            id: 'III.A.5',
            paraphrase: 'Keep a traceable record of design and build decisions.',
            status: 'taught',
            links: [
              '/bok/governing-development#the-technical-file',
              '/bok/governing-development#requirements-with-traceability',
              '/resources/templates#schema-design-record',
              '/patterns/model-card-as-control-evidence',
            ],
          },
        ],
      },
      {
        code: 'III.B',
        title: 'Data for training and testing',
        questions: { min: 6, max: 8 },
        indicators: [
          {
            id: 'III.B.1',
            paraphrase: 'Check the right to use data and its fitness for purpose.',
            status: 'taught',
            links: [
              '/bok/governing-development#data-for-training-and-testing',
              '/bok/governing-development#the-right-to-use-the-data',
              '/bok/governing-development#quality-quantity-representativeness-and-fitness-for-purpose',
              '/resources/templates#schema-dataset-admission-record',
              '/glossary/dataset-admission-gate',
            ],
          },
          {
            id: 'III.B.2',
            paraphrase: 'Record where data came from and how it moved.',
            status: 'taught',
            links: [
              '/bok/governing-development#provenance-versus-lineage',
              '/patterns/aibom',
              '/glossary/data-provenance',
              '/glossary/data-lineage',
              '/resources/templates#schema-dataset-card',
            ],
          },
          {
            id: 'III.B.3',
            paraphrase: 'Plan and run the full range of tests before release.',
            status: 'taught',
            links: [
              '/bok/governing-development#testing-and-validation',
              '/bok/governing-development#the-test-type-matrix',
              '/bok/fairness-and-explainability#intersectional-and-subgroup-testing',
              '/patterns/eval-gate-in-ci',
              '/resources/templates#schema-test-plan',
            ],
          },
          {
            id: 'III.B.4',
            paraphrase: 'Catch and handle problems that surface in training and testing.',
            status: 'taught',
            links: [
              '/bok/governing-development#what-goes-wrong-in-training-and-testing',
              '/bok/governing-development#statistical-validity-of-evals',
              '/glossary/test-set-contamination',
              '/resources/templates#schema-risk-register-entry',
            ],
          },
          {
            id: 'III.B.5',
            paraphrase: 'Document training and testing so results can be reproduced.',
            status: 'taught',
            links: [
              '/bok/governing-development#reproducibility-and-linked-versioning',
              '/bok/governing-development#model-cards-system-cards-and-datasheets',
              '/resources/templates#schema-test-report',
              '/resources/templates#schema-eval-result',
            ],
          },
        ],
      },
      {
        code: 'III.C',
        title: 'Release, monitoring and maintenance',
        questions: { min: 8, max: 10 },
        indicators: [
          {
            id: 'III.C.1',
            paraphrase: 'Decide release readiness with cards and conformity steps done.',
            status: 'taught',
            links: [
              '/bok/governing-development#release-readiness-and-conformity',
              '/bok/governing-development#the-gono-go-gate',
              '/bok/governing-development#eu-ai-act-conformity-in-order',
              '/resources/templates#schema-go-no-go',
              '/patterns/model-card-as-control-evidence',
            ],
          },
          {
            id: 'III.C.2',
            paraphrase: 'Monitor the system and schedule maintenance and retraining.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#maintenance-calendar-and-retraining-governance',
              '/bok/governing-deployment#drift-what-moves-and-how-to-see-it',
              '/patterns/continuous-assurance-telemetry',
              '/resources/templates#schema-post-market-monitoring-plan',
              '/glossary/drift',
            ],
          },
          {
            id: 'III.C.3',
            paraphrase: 'Audit, red-team and threat-model the system on a schedule.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#periodic-assurance',
              '/bok/governing-deployment#threat-modelling-the-deployed-system',
              '/bok/governance-program#what-internal-audit-tests',
              '/patterns/adversarial-red-team-suite',
            ],
          },
          {
            id: 'III.C.4',
            paraphrase: 'After release, log and resolve incidents, open issues and risks.',
            status: 'taught',
            links: [
              '/bok/incidents#incident-hazard-issue-and-serious-incident',
              '/bok/incidents#the-response-lifecycle',
              '/bok/incidents#the-incident-record',
              '/patterns/incident-pipeline',
              '/resources/templates#schema-incident-record',
            ],
          },
          {
            id: 'III.C.5',
            paraphrase: 'Work across teams to find why AI incidents happen.',
            status: 'taught',
            links: [
              '/bok/incidents#root-cause-analysis',
              '/bok/incidents#a-cause-taxonomy-that-points-at-controls',
              '/bok/incidents#ai-specific-failure-modes',
              '/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite',
              '/glossary/root-cause-analysis-rca',
            ],
          },
          {
            id: 'III.C.6',
            paraphrase: 'Publish the documentation transparency duties require, instructions included.',
            status: 'taught',
            links: [
              '/bok/governing-development#public-disclosures',
              '/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73',
              '/resources/templates#schema-instructions-for-use',
              '/resources/templates#schema-post-market-monitoring-plan',
            ],
          },
        ],
      },
    ],
  },
  {
    code: 'IV',
    title: 'Governing AI deployment and use',
    questions: { min: 21, max: 25 },
    chapters: ['15', '17', '18', '23'],
    competencies: [
      {
        code: 'IV.A',
        title: 'The decision to deploy',
        questions: { min: 6, max: 8 },
        indicators: [
          {
            id: 'IV.A.1',
            paraphrase: 'Frame the deployment by purpose, performance, data, ethics, readiness.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#the-deployment-decision',
              '/bok/governing-deployment#start-from-the-use-case-not-the-model',
              '/bok/governing-deployment#check-the-data-and-the-people',
              '/resources/templates#schema-deployment-decision-record',
              '/glossary/deployment-decision-record-ddr',
            ],
          },
          {
            id: 'IV.A.2',
            paraphrase: 'Compare model types: predictive or generative, open or closed, size, modality.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#model-type-changes-the-control-set',
              '/bok/ai-defined#kinds-of-ai-that-change-the-governance-problem',
              '/bok/governing-deployment#the-model-type-by-deployment-option-matrix',
              '/glossary/open-weight-model',
              '/glossary/small-language-model-slm',
            ],
          },
          {
            id: 'IV.A.3',
            paraphrase: 'Compare where a model runs and how it is adapted.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#model-types-and-deployment-options',
              '/bok/governing-deployment#where-it-runs',
              '/bok/governing-deployment#how-it-is-adapted',
              '/bok/governing-agents#what-makes-an-agent-a-governance-object',
              '/glossary/retrieval-augmented-generation-rag',
              '/agents',
            ],
          },
        ],
      },
      {
        code: 'IV.B',
        title: 'Assessing the selected system',
        questions: { min: 5, max: 7 },
        indicators: [
          {
            id: 'IV.B.1',
            paraphrase: 'Assess the impact of the chosen system before go-live.',
            status: 'taught',
            links: [
              '/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27',
              '/bok/governing-deployment#the-go-live-review',
              '/bok/governing-development#performing-versus-reviewing',
              '/patterns/fria-as-code',
              '/resources/templates#schema-impact-assessment',
            ],
          },
          {
            id: 'IV.B.2',
            paraphrase: 'Review vendor and licence terms for AI-specific risk.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#vendor-contracts-and-licence-terms',
              '/bok/governing-deployment#open-weight-licences',
              '/resources/contracts',
              '/resources/templates#kit-contract-clause-checklist',
              '/patterns/vendor-model-due-diligence-gate',
            ],
          },
          {
            id: 'IV.B.3',
            paraphrase: 'Weigh the burdens and gains of running your own model.',
            status: 'partly-taught',
            links: [
              '/bok/governing-deployment#build-buy-or-adapt',
              '/bok/governing-deployment#owning-the-model-the-upside-and-the-burden',
              '/bok/governing-deployment#liability-insurance-and-risk-transfer',
              '/bok/governing-deployment#when-a-deployer-becomes-a-provider',
              '/resources/templates#schema-deployment-decision-record',
            ],
            note: 'A short subsection in chapter 15; no record captures the build, buy or adapt choice beyond the role assessment in the deployment decision record.',
          },
        ],
      },
      {
        code: 'IV.C',
        title: 'Deployment and use',
        questions: { min: 9, max: 11 },
        indicators: [
          {
            id: 'IV.C.1',
            paraphrase: 'Apply policy at go-live: data, risk, issues, user training.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#policies-at-go-live',
              '/bok/governing-deployment#inference-time-data-governance',
              '/bok/governance-program#role-based-curricula',
              '/resources/templates#kit-ai-policy',
              '/patterns/runtime-guardrail',
            ],
          },
          {
            id: 'IV.C.2',
            paraphrase: 'Monitor the deployed model and system; plan maintenance.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#operating-the-system',
              '/bok/governing-deployment#drift-what-moves-and-how-to-see-it',
              '/bok/governing-deployment#monitoring-third-parties-while-you-run',
              '/patterns/continuous-assurance-telemetry',
              '/resources/templates#schema-post-market-monitoring-plan',
            ],
          },
          {
            id: 'IV.C.3',
            paraphrase: 'Assure the deployed system periodically: audits, red teams, threat models.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#an-audit-programme-not-an-audit',
              '/bok/governing-deployment#red-teaming-on-a-schedule',
              '/bok/governing-agents#threats-mapped-to-controls',
              '/patterns/adversarial-red-team-suite',
              '/resources/templates#schema-eval-result',
            ],
          },
          {
            id: 'IV.C.4',
            paraphrase: 'Keep incident and issue records, the risk log and monitoring plan.',
            status: 'taught',
            links: [
              '/bok/incidents#deployer-duties-inform-the-provider-suspend-use',
              '/bok/incidents#the-overlapping-clocks',
              '/patterns/incident-pipeline',
              '/resources/templates#schema-incident-record',
              '/resources/templates#schema-post-market-monitoring-plan',
            ],
          },
          {
            id: 'IV.C.5',
            paraphrase: 'Anticipate secondary uses and downstream harm, then contain them.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#secondary-use-and-downstream-harm',
              '/bok/governing-development#function-creep',
              '/bok/governing-development#reasonably-foreseeable-misuse',
              '/patterns/policy-card',
              '/glossary/function-creep',
            ],
          },
          {
            id: 'IV.C.6',
            paraphrase: 'Plan how and when to communicate outside the organisation.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#external-communications',
              '/bok/incidents#playbooks-raci-and-drills',
              '/glossary/holding-statement',
            ],
          },
          {
            id: 'IV.C.7',
            paraphrase: 'Be able to deactivate, degrade or localise a system on a trigger.',
            status: 'taught',
            links: [
              '/bok/governing-deployment#deactivation-degradation-localisation-and-retirement',
              '/bok/governing-deployment#a-deactivation-policy-someone-can-execute',
              '/patterns/kill-switch-circuit-breaker',
              '/resources/templates#schema-decommissioning-runbook',
              '/glossary/graduated-degradation',
            ],
          },
        ],
      },
    ],
  },
];

/** Every indicator with its domain and competency, in blueprint order. */
export function aigpIndicators(): {
  domain: AigpDomain;
  competency: AigpCompetency;
  indicator: AigpIndicator;
}[] {
  return aigpDomains.flatMap((domain) =>
    domain.competencies.flatMap((competency) =>
      competency.indicators.map((indicator) => ({ domain, competency, indicator })),
    ),
  );
}

/** The DOM id of an indicator's row on /for/aigp: `ind-II-C-5`. */
export function indicatorAnchor(id: string): string {
  return `ind-${id.replace(/\./g, '-')}`;
}

/** Midpoint of a question range (the heatmap's bar width): (min + max) / 2. */
export function rangeMidpoint(range: QuestionRange): number {
  return (range.min + range.max) / 2;
}

/** A question range as text: `4–6` (en dash, as the style guide sets for ranges). */
export function rangeText(range: QuestionRange): string {
  return `${range.min}–${range.max}`;
}

/** One step of a domain's study path: a section to read and the indicators it serves. */
export interface StudyStep {
  href: string;
  indicators: string[];
}

/**
 * The study path of a domain: the first link of each indicator, in blueprint
 * order, with repeats merged so a section shared by two indicators is one step.
 */
export function studyPath(domain: AigpDomain): StudyStep[] {
  const steps: StudyStep[] = [];
  const byHref = new Map<string, StudyStep>();
  for (const competency of domain.competencies) {
    for (const indicator of competency.indicators) {
      const href = indicator.links[0];
      const existing = byHref.get(href);
      if (existing) {
        existing.indicators.push(indicator.id);
        continue;
      }
      const step = { href, indicators: [indicator.id] };
      byHref.set(href, step);
      steps.push(step);
    }
  }
  return steps;
}
