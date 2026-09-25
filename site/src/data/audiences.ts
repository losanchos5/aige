// audiences.ts: the audience hubs under /for. One entry per audience; the
// /for index and every /for/<slug> page render from this list alone
// (src/pages/for/index.astro, src/pages/for/[slug].astro, through
// src/components/AudienceHub.astro and src/lib/audiences.ts).
//
// Each hub carries: who it is for, the three questions that audience brings
// (each answered in two or three sentences and linked to the section of the
// Body of Knowledge that answers it in full), a curated route through the site
// in reading order (chapters with anchors, patterns, tools, templates, datasets,
// figures, cases and reference pages), "start this week" actions and the
// obligations of the register (src/data/frameworks.ts) that matter most to it.
//
// Rules the build enforces (src/lib/audiences.ts, validateAudiences):
// - every chapter anchor is a heading of that chapter, every pattern, figure,
//   case and path node exists, every obligation id is in the register;
// - a tool step names a tool of src/data/toolkit.ts or one of
//   PARALLEL_TOOL_IDS; a hub renders a tool step only when the registry lists
//   it as `live`, so a tool still being built never becomes a dead link and
//   appears on its own once it ships;
// - every [n] marker in an answer has a source and every source is cited;
// - dates are never typed: `{date:<obligation id>}` renders the row's
//   `appliesFrom`, `{date:<obligation id>|<text>}` the date of the row's
//   milestone whose note contains <text>, so the hubs cannot drift from the
//   register.
//
// Claims of law carry numbered sources in the house format (STYLEGUIDE §6),
// verified on 2026-09-24 against EUR-Lex (the consolidated text of Regulation
// (EU) 2024/1689 of 27 July 2026 and Regulation (EU) 2026/1744), with the
// article wording read on the Commission's AI Act Service Desk. The obligation
// lists are illustrative, not a claim of conformity, and nothing here is legal
// advice.

import type { Source } from '../lib/sources';

export type AudienceId =
  | 'engineers'
  | 'ciso-risk'
  | 'legal-dpo'
  | 'executives-board'
  | 'public-sector'
  | 'smes';

/** A step of a route. The resolver (src/lib/audiences.ts) turns each into a titled link. */
export type RouteStep =
  /** A chapter of the Body of Knowledge, at a heading anchor. */
  | { kind: 'chapter'; slug: string; anchor: string; title: string; why: string }
  /** A pattern page, /patterns/<slug>; the title comes from patterns.ts. */
  | { kind: 'pattern'; slug: string; why: string }
  /** A figure permalink, /figures/<id>; the title comes from figures.ts. */
  | { kind: 'figure'; id: string; why: string }
  /** A browser tool, /toolkit/<id>; rendered only while it is live in toolkit.ts. */
  | { kind: 'tool'; id: string; why: string }
  /** A row of /resources/templates (`schema-<name>` or `kit-<id>`). */
  | { kind: 'template'; anchor: string; title: string; why: string }
  /** A machine-readable dataset or download. */
  | { kind: 'dataset'; href: string; title: string; why: string }
  /** An incident case, /cases/<id>; the title comes from cases.ts. */
  | { kind: 'case'; id: string; why: string }
  /** Any other page of the site (a hub, a reference page, the register). */
  | { kind: 'reference'; href: string; title: string; why: string };

export interface RoutePhase {
  /** Short phase title (an H3 on the hub). */
  title: string;
  steps: readonly RouteStep[];
}

export interface AudienceLink {
  label: string;
  /** Internal absolute path, optionally with a #fragment. */
  href: string;
}

export interface AudienceQuestion {
  question: string;
  /** Two or three sentences; may carry [n] markers and {date:…} tokens. */
  answer: string;
  link: AudienceLink;
}

export interface WeekAction {
  action: string;
  link: AudienceLink;
}

export interface Audience {
  id: AudienceId;
  /** Route segment: /for/<slug>. Equals `id`. */
  slug: AudienceId;
  /** Short label (breadcrumb, cards, nav). */
  label: string;
  /** Nav and card label, e.g. "For engineers". */
  navLabel: string;
  /** <title> without the site suffix (at most 45 characters). */
  metaTitle: string;
  /** Meta description, 50 to 160 characters. */
  description: string;
  /** The hub's H1. */
  title: string;
  /** The hero lede: one sentence. */
  lede: string;
  /** One line for the /for index card. */
  summary: string;
  /** Who this is for, one paragraph. */
  who: string;
  /** The job families this hub is written for. */
  roles: readonly string[];
  questions: readonly [AudienceQuestion, AudienceQuestion, AudienceQuestion];
  route: readonly RoutePhase[];
  thisWeek: readonly WeekAction[];
  /** Why these obligations, one sentence above the table. */
  obligationsWhy: string;
  /** Obligation ids of the register, most relevant first. */
  obligations: readonly string[];
  /** Learning-path node ids (src/data/path.ts) this audience starts at. */
  pathStartAt: readonly string[];
  /** Numbered sources for the [n] markers in the answers. */
  sources: readonly Source[];
}

/**
 * Tool ids being built in parallel (v0.5.0). A route may name them before
 * they ship; the hub shows each only once toolkit.ts lists it as live.
 */
export const PARALLEL_TOOL_IDS: readonly string[] = [
  'policy-card',
  'ai-act-triage',
  'obligations-planner',
  'ai-register-entry',
  'impact-assessment',
  'model-card',
  'vendor-due-diligence',
  'incident-clock',
  'agent-control-profile',
  'fairness-metric-chooser',
];

/**
 * Hubs under /for that other blocks own. The /for index lists one only when
 * its page exists in src/pages/for/, so it never links a missing route.
 */
export const siblingHubs: readonly { slug: string; label: string; summary: string }[] = [
  {
    slug: 'aigp',
    label: 'AIGP candidates',
    summary:
      'The public AIGP body of knowledge read against this site. Not affiliated with or endorsed by IAPP.',
  },
  {
    slug: 'certifications',
    label: 'Certifications',
    summary: 'Certifications and assessments in AI governance, and what each one evidences.',
  },
];

// ---------------------------------------------------------------------------
// Sources (house format; reused across hubs, numbered per hub).

const AI_ACT_URL = 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng';

const aiAct = (articles: string): Source => ({
  title: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act), consolidated text of 27 July 2026',
  gloss: articles,
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-27',
  url: AI_ACT_URL,
  verified: 'primary',
});

const omnibus = (points: string): Source => ({
  title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI)',
  gloss: points,
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2026-07-24',
  url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
  verified: 'primary',
});

const gdpr = (articles: string): Source => ({
  title: 'Regulation (EU) 2016/679 (General Data Protection Regulation)',
  gloss: articles,
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2016-04-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng',
  verified: 'primary',
});

const NIS2: Source = {
  title: 'Directive (EU) 2022/2555 (NIS2)',
  gloss: 'Art. 23 reporting obligations for significant incidents',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2022-12-14',
  url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng',
  verified: 'primary',
};

const DORA: Source = {
  title: 'Regulation (EU) 2022/2554 (DORA)',
  gloss: 'Art. 19 reporting of major ICT-related incidents',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2022-12-14',
  url: 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng',
  verified: 'primary',
};

const OWASP_AGENTIC: Source = {
  title: 'OWASP Top 10 for Agentic Applications 2026',
  gloss: 'ASI01 to ASI10, from agent goal hijack to rogue agents',
  publisher: 'OWASP GenAI Security Project',
  date: '2025-12-09',
  url: 'https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/',
  verified: 'primary',
};

const ATRS: Source = {
  title: 'Algorithmic Transparency Recording Standard hub',
  gloss:
    "mandatory for government departments and for arm's-length bodies that deliver public or frontline services or deal directly with the public",
  publisher: 'Government Digital Service (GOV.UK)',
  date: '2025-05-08',
  url: 'https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub',
  verified: 'primary',
};

// ---------------------------------------------------------------------------
// The hubs.

export const audiences: readonly Audience[] = [
  {
    id: 'engineers',
    slug: 'engineers',
    label: 'Engineers',
    navLabel: 'For engineers',
    metaTitle: 'AI governance for engineers',
    description:
      'A route for ML, platform and security engineers: the five-layer stack, eval gates, runtime controls, evidence schemas and the obligations a pipeline evidences.',
    title: 'Build the controls that leave the evidence.',
    lede: 'For the people who write the pipeline, the service or the agent: where a governance rule becomes code, what each stage should record, and which obligation that record answers.',
    summary:
      'ML, platform, MLOps, application and security engineers who build and run AI systems.',
    who: 'You own the build, the deploy and the pager. Governance tends to reach you as tickets and questionnaires. This route turns it into things you already know how to ship: a policy file the pipeline reads, an eval that can fail the build, a registry the deploy writes to, a guardrail at the enforcement point and a record each of them emits. Read it in order; each step says what it gives you.',
    roles: [
      'ML and data engineers',
      'Platform and MLOps engineers',
      'Application and agent developers',
      'Security engineers',
      'Site reliability engineers',
    ],
    questions: [
      {
        question: 'What do I actually have to build?',
        answer:
          'Five layers, in build order: see it, rule it, test it, contain it, prove it. A team of one builds a thin slice through all five: a registry the deploy writes to, one policy that blocks, one eval gate, an identity and a kill switch per agent, and a structured record from each.',
        link: {
          label: 'The minimum viable stack',
          href: '/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one',
        },
      },
      {
        question: 'Which tests count as evidence?',
        answer:
          'A test whose metrics and thresholds were fixed before the run, whose result is filed against the version it tested, and whose failure blocks the release. For high-risk systems the EU AI Act asks for testing against prior defined metrics and probabilistic thresholds (Art. 9(8)) [1].',
        link: {
          label: 'A test plan before the first run',
          href: '/bok/governing-development#a-test-plan-before-the-first-run',
        },
      },
      {
        question: 'What must the running system record?',
        answer:
          'Enough to reconstruct any decision: inputs, outputs, model and prompt versions, tool calls and approvals, as structured, timestamped events. A high-risk system must allow the automatic recording of events over its lifetime (Art. 12(1)), and its deployer keeps the logs it controls for at least six months (Art. 26(6)) [1].',
        link: {
          label: 'Layer 04: Runtime Controls & Observability',
          href: '/bok/the-stack#layer-04-runtime-controls--observability',
        },
      },
    ],
    route: [
      {
        title: 'Orient',
        steps: [
          {
            kind: 'reference',
            href: '/stack',
            title: 'The stack, layer by layer',
            why: 'The five layers, the evidence each one produces and the tool categories that fill it.',
          },
          {
            kind: 'chapter',
            slug: 'the-stack',
            anchor: 'how-to-read-the-stack',
            title: 'How to read the stack',
            why: 'Why the build order runs see it, rule it, test it, contain it, prove it.',
          },
          {
            kind: 'figure',
            id: 'minimum-viable-stack',
            why: 'The smallest version one engineer can run end to end.',
          },
        ],
      },
      {
        title: 'Build',
        steps: [
          {
            kind: 'chapter',
            slug: 'governing-development',
            anchor: 'the-build-as-a-chain-of-gates',
            title: 'The build as a chain of gates',
            why: 'Every gate from use case to release, and the record each one leaves.',
          },
          {
            kind: 'template',
            anchor: 'schema-ai-system-register-entry',
            title: 'AI system register entry',
            why: 'The registry row the deploy writes: owner, scope, tier and status.',
          },
          {
            kind: 'tool',
            id: 'ai-register-entry',
            why: 'Fill a register entry in the browser and export it as JSON.',
          },
          {
            kind: 'pattern',
            slug: 'policy-card',
            why: 'Policy as data the pipeline reads, not a document it ignores.',
          },
          {
            kind: 'tool',
            id: 'policy-card',
            why: 'Turn one rule into a Policy Card, a Rego module with tests and the CI hook.',
          },
          {
            kind: 'pattern',
            slug: 'eval-gate-in-ci',
            why: 'The pipeline stage that fails the build when an eval fails.',
          },
          {
            kind: 'tool',
            id: 'fairness-metric-chooser',
            why: 'Choose the fairness metric before the eval suite runs, with its caveats.',
          },
          {
            kind: 'template',
            anchor: 'schema-test-plan',
            title: 'Test plan schema',
            why: 'Metrics, thresholds and datasets frozen before the first run.',
          },
          {
            kind: 'template',
            anchor: 'schema-eval-result',
            title: 'Eval result schema',
            why: 'One record per run, filed against the version it tested.',
          },
          {
            kind: 'pattern',
            slug: 'aibom',
            why: 'What the system is made of, as a bill of materials a scanner can read.',
          },
          {
            kind: 'tool',
            id: 'model-card',
            why: 'Draft a model card that points at its evidence, as a document you keep.',
          },
          {
            kind: 'pattern',
            slug: 'runtime-guardrail',
            why: 'Input, output and tool-call checks at the enforcement point.',
          },
          {
            kind: 'reference',
            href: '/agents',
            title: 'Governing AI agents',
            why: 'If you ship agents: registry, identity, tool gateway, checkpoints and a kill switch.',
          },
          {
            kind: 'tool',
            id: 'agent-control-profile',
            why: 'Write down the control profile of one agent, as a document you keep.',
          },
        ],
      },
      {
        title: 'Prove',
        steps: [
          {
            kind: 'pattern',
            slug: 'continuous-assurance-telemetry',
            why: 'Assurance produced from telemetry as the system runs, not from screenshots.',
          },
          {
            kind: 'template',
            anchor: 'schema-evidence-record',
            title: 'Evidence record schema',
            why: 'The envelope every control writes its result into.',
          },
          {
            kind: 'pattern',
            slug: 'machine-readable-evidence-oscal',
            why: 'Evidence an auditor can query, in OSCAL.',
          },
          {
            kind: 'dataset',
            href: '/api/v1/obligations.json',
            title: 'Obligations API (JSON)',
            why: 'Every obligation with a stable id, to key your evidence records to.',
          },
          {
            kind: 'tool',
            id: 'maturity-self-check',
            why: 'Read your function layer by layer and find the one move that raises the floor.',
          },
        ],
      },
    ],
    thisWeek: [
      {
        action: 'Put one eval in CI that can fail the build, with its threshold in version control.',
        link: { label: 'Eval Gate in CI', href: '/patterns/eval-gate-in-ci' },
      },
      {
        action:
          'Have the deploy write a registry entry with an owner and a scope, and block deploys without one.',
        link: {
          label: 'AI system register entry',
          href: '/resources/templates#schema-ai-system-register-entry',
        },
      },
      {
        action:
          'Emit one structured evidence record per release: version, eval results, approver and date.',
        link: { label: 'Evidence record schema', href: '/resources/templates#schema-evidence-record' },
      },
      {
        action: 'Key each record to an obligation id, so an auditor can query it.',
        link: { label: 'The obligation register', href: '/obligations' },
      },
      {
        action: 'Score your five layers with the self-check and pick one move.',
        link: { label: 'Maturity self-check', href: '/toolkit/maturity-self-check' },
      },
    ],
    obligationsWhy:
      'The duties a pipeline evidences directly: logging, testing, robustness, documentation, oversight by design, transparency, and the threat lists the evals run against.',
    obligations: [
      'AIGE-OBL-EUAIA-ART12',
      'AIGE-OBL-EUAIA-ART15',
      'AIGE-OBL-EUAIA-ART9',
      'AIGE-OBL-EUAIA-ART11',
      'AIGE-OBL-EUAIA-ART14',
      'AIGE-OBL-EUAIA-ART50',
      'AIGE-OBL-OWASP-LLM',
      'AIGE-OBL-OWASP-AGENTIC',
      'AIGE-OBL-NISTRMF-MEASURE',
    ],
    pathStartAt: ['eval-gate-ci', 'observability-otel', 'policy-as-code-opa'],
    sources: [aiAct('Arts. 9(8), 12(1) and 26(6)')],
  },

  {
    id: 'ciso-risk',
    slug: 'ciso-risk',
    label: 'CISOs and risk leads',
    navLabel: 'For CISOs and risk leads',
    metaTitle: 'AI governance for CISOs and risk leads',
    description:
      'A route for CISOs, risk managers and internal audit: AI risk in the register you already run, agentic threats and their controls, incident clocks and assurance.',
    title: 'Run AI risk as controls you can test.',
    lede: 'For the people who own security, operational risk and the second and third lines: where AI risk sits in the framework you already run, what is new about it, and how to show the controls work.',
    summary:
      'CISOs, heads of risk, model risk managers, internal audit and third-party risk managers.',
    who: 'You already run a risk register, a control library, supplier reviews and incident response. AI replaces none of them. It adds sources of risk they were not built for (prompt injection, agents acting beyond their mandate, drift, poisoned data or memory) and reporting clocks that run in parallel. This route places AI risk in the loop you know, then walks the controls, the threats and the incident path.',
    roles: [
      'CISOs and security leads',
      'Heads of risk and ERM',
      'Model risk managers',
      'Internal audit',
      'Third-party risk managers',
    ],
    questions: [
      {
        question: 'Where does AI risk sit in the framework we already have?',
        answer:
          'In the same register and the same loop (identify, assess, treat, monitor), with AI-specific risk sources, a likelihood-by-severity matrix whose bands trigger gates, and residual risk accepted by a named person with an expiry.',
        link: {
          label: 'The loop: identify, assess, treat, monitor',
          href: '/bok/risk-management#the-loop-identify-assess-treat-monitor',
        },
      },
      {
        question: 'Which threats are new, and what contains them?',
        answer:
          'Agents bring goal hijack, tool misuse, identity and privilege abuse, memory poisoning, cascading failures and rogue agents; the OWASP agentic list names ten [1]. Each maps to a control that holds at runtime and a pattern that builds it.',
        link: { label: 'Ten agentic threats and their controls', href: '/agents#threats' },
      },
      {
        question: 'When it fails, who do we tell, and by when?',
        answer:
          'One event can start several clocks at once: a serious incident under the EU AI Act (Art. 73) [2], a personal data breach under the GDPR (Art. 33) [3], and a significant incident under NIS2 [4] or a major ICT-related incident under DORA [5]. Each has its own trigger, recipient and deadline, so the incident record needs a timestamp per regime.',
        link: { label: 'The overlapping clocks', href: '/bok/incidents#the-overlapping-clocks' },
      },
    ],
    route: [
      {
        title: 'Place the risk',
        steps: [
          {
            kind: 'chapter',
            slug: 'risk-management',
            anchor: 'risk-defined-for-engineers',
            title: 'Risk, defined for engineers',
            why: 'Hazard, harm, likelihood and severity, in terms a gate can read.',
          },
          {
            kind: 'figure',
            id: 'risk-loop-stack',
            why: 'The identify, assess, treat, monitor loop, drawn on the five layers.',
          },
          {
            kind: 'figure',
            id: 'risk-matrix',
            why: 'The likelihood-by-severity matrix and the catastrophic-severity override.',
          },
          {
            kind: 'chapter',
            slug: 'risk-management',
            anchor: 'risk-appetite-and-tolerance-compiled-into-gates',
            title: 'Risk appetite, compiled into gates',
            why: 'From an appetite statement to data a pipeline enforces.',
          },
          {
            kind: 'template',
            anchor: 'schema-risk-register-entry',
            title: 'Risk register entry schema',
            why: 'The register row as an evidence record, with an acceptor and an expiry.',
          },
        ],
      },
      {
        title: 'Control it',
        steps: [
          {
            kind: 'reference',
            href: '/agents#threats',
            title: 'Agentic threats mapped to controls',
            why: 'ASI01 to ASI10, each with the control that contains it and the pattern that builds it.',
          },
          {
            kind: 'pattern',
            slug: 'adversarial-red-team-suite',
            why: 'Red teaming as a repeatable suite whose findings become eval cases.',
          },
          {
            kind: 'pattern',
            slug: 'kill-switch-circuit-breaker',
            why: 'A tested way to stop one agent or endpoint without stopping the fleet.',
          },
          {
            kind: 'tool',
            id: 'agent-control-profile',
            why: 'The control profile of one agent, written down and kept.',
          },
          {
            kind: 'pattern',
            slug: 'vendor-model-due-diligence-gate',
            why: 'No third-party model in production without answered questions on file.',
          },
          {
            kind: 'tool',
            id: 'vendor-due-diligence',
            why: 'Build the due-diligence request for one supplier and export it.',
          },
          {
            kind: 'reference',
            href: '/resources/harms',
            title: 'Harms atlas',
            why: 'Each harm with its failure mode, the control that catches it and real incidents.',
          },
        ],
      },
      {
        title: 'Respond and assure',
        steps: [
          {
            kind: 'chapter',
            slug: 'incidents',
            anchor: 'the-overlapping-clocks',
            title: 'The overlapping incident clocks',
            why: 'The AI Act, GDPR, NIS2, DORA and others, side by side.',
          },
          {
            kind: 'figure',
            id: 'incident-clocks',
            why: 'The same clocks on one timeline.',
          },
          {
            kind: 'tool',
            id: 'incident-clock',
            why: 'Work out which clocks one incident starts, and their deadlines.',
          },
          {
            kind: 'pattern',
            slug: 'incident-pipeline',
            why: 'From detection to report to a new eval case.',
          },
          {
            kind: 'template',
            anchor: 'schema-incident-record',
            title: 'Incident record schema',
            why: 'One record, many reports.',
          },
          {
            kind: 'chapter',
            slug: 'governance-program',
            anchor: 'enterprise-risk-the-three-lines-and-internal-audit',
            title: 'The three lines and internal audit',
            why: 'What each line owns for AI, and what internal audit tests.',
          },
          {
            kind: 'reference',
            href: '/cases',
            title: 'Incident cases',
            why: 'Public failures read as post-mortems: which control would have caught them.',
          },
          {
            kind: 'tool',
            id: 'maturity-self-check',
            why: 'Score the five layers and find the floor before an auditor does.',
          },
        ],
      },
    ],
    thisWeek: [
      {
        action:
          'Enter your AI systems in the enterprise risk register as rows of their own, each with an owner and a residual rating.',
        link: {
          label: 'Risk register entry schema',
          href: '/resources/templates#schema-risk-register-entry',
        },
      },
      {
        action:
          'Write the severity scale down and map each band to a gate and to the reporting clocks it starts.',
        link: {
          label: 'A severity scale mapped to the clocks',
          href: '/bok/incidents#a-severity-scale-mapped-to-the-clocks',
        },
      },
      {
        action:
          'Run one red-team session against your most exposed system and file every finding as an eval case.',
        link: { label: 'Adversarial Red-Team Suite', href: '/patterns/adversarial-red-team-suite' },
      },
      {
        action: 'Send your main AI suppliers the due-diligence questions and file the answers.',
        link: {
          label: 'Vendor due-diligence response',
          href: '/resources/templates#schema-vendor-due-diligence-response',
        },
      },
      {
        action:
          'Drill the kill switch on one agent or model endpoint and record how long the stop took.',
        link: { label: 'Kill Switch / Circuit Breaker', href: '/patterns/kill-switch-circuit-breaker' },
      },
    ],
    obligationsWhy:
      'The duties a risk and security function owns or tests: the risk management system, robustness and cybersecurity, post-market monitoring, incident reporting, and the risk and control frameworks that audit reads.',
    obligations: [
      'AIGE-OBL-EUAIA-ART9',
      'AIGE-OBL-EUAIA-ART15',
      'AIGE-OBL-EUAIA-ART72',
      'AIGE-OBL-EUAIA-ART73',
      'AIGE-OBL-ISO23894-RISK',
      'AIGE-OBL-NISTRMF-MANAGE',
      'AIGE-OBL-CSA-AICM',
      'AIGE-OBL-OWASP-AGENTIC',
      'AIGE-OBL-ETSI-304223',
    ],
    pathStartAt: ['eval-harness', 'agent-registry', 'threat-modelling'],
    sources: [
      OWASP_AGENTIC,
      aiAct('Art. 73 reporting of serious incidents'),
      gdpr('Art. 33 notification of a personal data breach'),
      NIS2,
      DORA,
    ],
  },

  {
    id: 'legal-dpo',
    slug: 'legal-dpo',
    label: 'Legal counsel and DPOs',
    navLabel: 'For legal counsel and DPOs',
    metaTitle: 'AI governance for legal counsel and DPOs',
    description:
      'A route for counsel, DPOs and compliance: the EU AI Act, data protection and existing law, read as obligations with the artefact each one expects and its date.',
    title: 'Turn each obligation into a record someone can check.',
    lede: 'For the people who advise on the law, write the assessments and answer the regulator: the AI-specific law next to the law that already applies, each duty with the artefact that evidences it.',
    summary:
      'In-house counsel, data protection officers, privacy and compliance leads, and contract managers.',
    who: "You read the law, settle the organisation's role and sign off the assessments. The risk is that the advice stays in a memo the pipeline never reads. This route reads the EU AI Act, data protection and the law that already applies to AI (consumer, equality, intellectual property, product liability) as a list of obligations, and shows the record each one expects, so the advice ends up where a gate can check it.",
    roles: [
      'In-house counsel',
      'Data protection officers',
      'Privacy and compliance leads',
      'Contract and procurement managers',
    ],
    questions: [
      {
        question: 'Which role do we hold, and for which system?',
        answer:
          'Provider, deployer, importer or distributor is settled per system, and it can move: putting your name or trademark on a high-risk system, modifying it substantially, or changing the intended purpose of a system so that it becomes high-risk makes you its provider (Art. 25(1)) [1].',
        link: {
          label: 'Who you are in the value chain',
          href: '/bok/eu-ai-act#who-you-are-in-the-value-chain',
        },
      },
      {
        question: 'How do the FRIA and the DPIA fit together?',
        answer:
          'Where a DPIA already meets an obligation of Article 27, the fundamental rights impact assessment complements that DPIA (Art. 27(4)) [1]. One assessment record, cross-referenced, can serve both, instead of two documents that drift apart.',
        link: {
          label: 'Fundamental rights impact assessment',
          href: '/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27',
        },
      },
      {
        question: 'What must we tell the people affected?',
        answer:
          'People are told when they interact with an AI system, and synthetic content is marked (Art. 50) [1]. Deployers of Annex III systems that decide or help decide about people inform them (Art. 26(11)), and explain the system’s role when a person subject to a decision with legal or similarly significant effects asks (Art. 86) [1]. GDPR Articles 13 to 15 and 22 apply alongside [2].',
        link: {
          label: 'Explanation and notice to affected people',
          href: '/bok/eu-ai-act#explanation-and-notice-to-affected-people',
        },
      },
    ],
    route: [
      {
        title: 'Read the law',
        steps: [
          {
            kind: 'chapter',
            slug: 'eu-ai-act',
            anchor: 'how-to-read-this-chapter',
            title: 'The EU AI Act in one pass',
            why: 'Scope, the risk ladder, roles, duties and the post-Omnibus dates.',
          },
          {
            kind: 'chapter',
            slug: 'eu-ai-act',
            anchor: 'the-risk-ladder',
            title: 'The risk ladder',
            why: 'Prohibited, high-risk through products or use, transparency cases, minimal risk.',
          },
          {
            kind: 'chapter',
            slug: 'privacy-and-ai',
            anchor: 'how-to-read-this-chapter',
            title: 'Data protection law applied to AI',
            why: 'Lawful basis, DPIAs, automated decisions and rights against trained models.',
          },
          {
            kind: 'chapter',
            slug: 'existing-law',
            anchor: 'how-to-read-this-chapter',
            title: 'Other law that already applies',
            why: 'Intellectual property, non-discrimination, consumer protection and product liability.',
          },
          {
            kind: 'chapter',
            slug: 'ai-laws-worldwide',
            anchor: 'the-landscape-at-a-glance',
            title: 'AI laws around the world',
            why: 'Korea, the US federal and state layers, Japan, China, the UK and more.',
          },
          {
            kind: 'reference',
            href: '/resources/crosswalk',
            title: 'Topic crosswalk',
            why: 'One topic per row, read across the instruments down to the article.',
          },
        ],
      },
      {
        title: 'Assess and contract',
        steps: [
          {
            kind: 'tool',
            id: 'ai-act-triage',
            why: 'A first reading of role and risk class for one system, as a document you keep.',
          },
          {
            kind: 'pattern',
            slug: 'fria-as-code',
            why: 'The impact assessment as versioned data, with the triggers that reopen it.',
          },
          {
            kind: 'template',
            anchor: 'schema-impact-assessment',
            title: 'Impact assessment schema',
            why: 'One record for the FRIA and the DPIA, cross-referenced.',
          },
          {
            kind: 'tool',
            id: 'impact-assessment',
            why: 'Draft the assessment in the browser and export it.',
          },
          {
            kind: 'figure',
            id: 'procured-ai-control',
            why: 'Where control moves when you buy instead of build.',
          },
          {
            kind: 'reference',
            href: '/resources/contracts',
            title: 'Contract clauses',
            why: 'AI contract and licence clauses: red flags, fallbacks and the evidence to keep.',
          },
          {
            kind: 'template',
            anchor: 'kit-contract-clause-checklist',
            title: 'AI contract clause checklist',
            why: 'What to secure from a supplier, each term tied to the obligation it answers.',
          },
        ],
      },
      {
        title: 'Keep the evidence',
        steps: [
          {
            kind: 'reference',
            href: '/obligations',
            title: 'The obligation register',
            why: 'Every obligation with a stable id, its date, its status and its artefact.',
          },
          {
            kind: 'tool',
            id: 'obligations-planner',
            why: 'Turn the dates that apply to you into a plan and a calendar file.',
          },
          {
            kind: 'pattern',
            slug: 'framework-crosswalk',
            why: 'Map once and reuse the same evidence across instruments.',
          },
          {
            kind: 'dataset',
            href: '/resources/obligations.csv',
            title: 'Obligations (CSV)',
            why: 'The register as a spreadsheet for your own tracker.',
          },
          {
            kind: 'figure',
            id: 'enforcement-map',
            why: 'Who enforces what, and the fine ceilings.',
          },
        ],
      },
    ],
    thisWeek: [
      {
        action: 'Record your role (provider, deployer or both) for each AI system, with the reason.',
        link: { label: 'The EU operator roles', href: '/bok/eu-ai-act#the-eu-operator-roles' },
      },
      {
        action:
          'Check each AI use against the Article 5 list and file the result, even when it is "none".',
        link: { label: 'Art. 5 prohibited practices', href: '/obligations/aige-obl-euaia-art5' },
      },
      {
        action: 'Merge the DPIA and the FRIA into one assessment record with cross-references.',
        link: { label: 'Impact assessment schema', href: '/resources/templates#schema-impact-assessment' },
      },
      {
        action: 'Take the AI clause checklist into your next supplier negotiation.',
        link: {
          label: 'AI contract clause checklist',
          href: '/resources/templates#kit-contract-clause-checklist',
        },
      },
      {
        action: 'Put the next three EU AI Act dates in the legal calendar.',
        link: { label: 'What applies now', href: '/#what-applies-now' },
      },
    ],
    obligationsWhy:
      'The duties where legal judgement decides the rest: prohibitions, classification, roles along the value chain, deployer duties, the FRIA, transparency, bias-detection data, and two automated-decision regimes outside the EU.',
    obligations: [
      'AIGE-OBL-EUAIA-ART5',
      'AIGE-OBL-EUAIA-ART6',
      'AIGE-OBL-EUAIA-ART25',
      'AIGE-OBL-EUAIA-ART26',
      'AIGE-OBL-EUAIA-ART27',
      'AIGE-OBL-EUAIA-ART50',
      'AIGE-OBL-EUAIA-ART4A',
      'AIGE-OBL-UK-ADM',
      'AIGE-OBL-USCO-AIACT',
    ],
    pathStartAt: ['law-reading', 'risk-tiers-intake', 'policy-as-code-opa'],
    sources: [
      aiAct('Arts. 25(1), 26(11), 27(4), 50 and 86'),
      gdpr('Arts. 13 to 15 and 22'),
    ],
  },

  {
    id: 'executives-board',
    slug: 'executives-board',
    label: 'Executives and boards',
    navLabel: 'For executives and boards',
    metaTitle: 'AI governance for executives and boards',
    description:
      'A short route for boards and executives: the decisions that are yours, the indicators to ask for, and what the EU AI Act dates mean for the organisation.',
    title: 'Ask for evidence, not assurances.',
    lede: 'For the people who set strategy, approve risk appetite and answer for outcomes: the decisions that are yours, the few numbers to ask for, and what a working governance function can show you.',
    summary:
      'Board members, executive committees, and chief AI, data and technology officers.',
    who: 'You do not need the mechanics. You need to know which decisions only you can take, what to ask for in the board pack, and how to tell a governance function that runs from one that only reports. This route is short on purpose: the argument, the decisions, the oversight.',
    roles: [
      'Board members',
      'Chief executives and executive committees',
      'Chief AI, data and technology officers',
      'Audit and risk committees',
    ],
    questions: [
      {
        question: 'Which decisions are ours to take?',
        answer:
          'Whether to use AI for a purpose at all, how much risk the organisation will accept, and what it will not do. A committee takes the exceptions and the risk acceptances against that appetite; the gates in the pipeline enforce everything else.',
        link: {
          label: 'The committee decides, the gates enforce',
          href: '/bok/governance-program#the-committee-decides-the-gates-enforce',
        },
      },
      {
        question: 'What should we see in the board pack?',
        answer:
          'One page generated by a query, not assembled by hand: registry coverage, gate coverage, open exceptions by age, incidents and time to contain, and realised risk reduction, with anything outside appetite flagged for a decision.',
        link: {
          label: 'KPIs and KRIs for leadership and the board',
          href: '/bok/governance-program#kpis-and-kris-for-leadership-and-the-board',
        },
      },
      {
        question: 'What does the law already expect of us?',
        answer:
          'In the EU, the AI literacy provision (Art. 4) and the prohibited practices (Art. 5) already apply, with two new prohibitions from {date:AIGE-OBL-EUAIA-ART5|NCII}; the Annex III high-risk obligations apply from {date:AIGE-OBL-EUAIA-ART9} [1][2]. Data protection, consumer, equality and product-liability law apply to AI today.',
        link: { label: 'The post-Omnibus timeline', href: '/bok/eu-ai-act#the-post-omnibus-timeline' },
      },
    ],
    route: [
      {
        title: 'Understand',
        steps: [
          {
            kind: 'reference',
            href: '/thesis',
            title: 'The Thesis',
            why: 'The argument in one read: governance you can run, not only read.',
          },
          {
            kind: 'figure',
            id: 'three-questions',
            why: 'What AI is running, what it may do, and what evidence proves it.',
          },
          {
            kind: 'figure',
            id: 'committee-gates',
            why: 'Who decides, and what enforces the decision.',
          },
        ],
      },
      {
        title: 'Decide',
        steps: [
          {
            kind: 'chapter',
            slug: 'governance-program',
            anchor: 'strategy-value-and-whether-to-use-ai-at-all',
            title: 'Strategy, value and whether to use AI at all',
            why: 'The use-case decision, taken before any model is chosen.',
          },
          {
            kind: 'chapter',
            slug: 'governance-program',
            anchor: 'the-committee-decides-the-gates-enforce',
            title: 'The committee and its charter',
            why: 'Authority, membership, escalation, and what stays out of the committee.',
          },
          {
            kind: 'template',
            anchor: 'kit-committee-charter',
            title: 'Committee charter template',
            why: 'Authority, quorum, inputs and outputs, each decision a signed record.',
          },
          {
            kind: 'template',
            anchor: 'kit-ai-policy',
            title: 'AI policy template',
            why: 'One source for the policy people approve and the rules a pipeline runs.',
          },
          {
            kind: 'chapter',
            slug: 'risk-management',
            anchor: 'risk-appetite-and-tolerance-compiled-into-gates',
            title: 'Risk appetite, compiled into gates',
            why: 'An appetite statement the pipeline can enforce.',
          },
        ],
      },
      {
        title: 'Oversee',
        steps: [
          {
            kind: 'chapter',
            slug: 'governance-program',
            anchor: 'kpis-and-kris-for-leadership-and-the-board',
            title: 'KPIs and KRIs for the board',
            why: 'The indicators to ask for, and the one that matters most.',
          },
          {
            kind: 'figure',
            id: 'maturity-grid',
            why: 'Where a governance function stands, layer by layer.',
          },
          {
            kind: 'tool',
            id: 'maturity-self-check',
            why: 'Ask the team to score the layers and show you the floor.',
          },
          {
            kind: 'figure',
            id: 'enforcement-map',
            why: 'Who enforces, and the fine ceilings.',
          },
          {
            kind: 'reference',
            href: '/cases',
            title: 'Incident cases',
            why: 'What failed elsewhere, and which control would have caught it.',
          },
        ],
      },
    ],
    thisWeek: [
      {
        action:
          'Ask for the inventory: every AI system in use, with an owner. If it cannot be produced, that is the first finding.',
        link: {
          label: 'AI system register entry',
          href: '/resources/templates#schema-ai-system-register-entry',
        },
      },
      {
        action: 'Name one accountable executive and charter the committee that takes exceptions.',
        link: {
          label: 'Committee charter template',
          href: '/resources/templates#kit-committee-charter',
        },
      },
      {
        action: 'Approve a risk-appetite statement that can be compiled into gate thresholds.',
        link: {
          label: 'Risk appetite, compiled into gates',
          href: '/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates',
        },
      },
      {
        action:
          'Put six to eight indicators, generated from live systems, on the next board agenda.',
        link: {
          label: 'KPIs and KRIs for the board',
          href: '/bok/governance-program#kpis-and-kris-for-leadership-and-the-board',
        },
      },
      {
        action: 'Ask which of the next three EU AI Act dates touch your products and services.',
        link: { label: 'What applies now', href: '/#what-applies-now' },
      },
    ],
    obligationsWhy:
      'The duties that land on the organisation as a whole: literacy, prohibitions, classification, the quality management system, deployer duties, and the policy and accountability controls of the management-system standards.',
    obligations: [
      'AIGE-OBL-EUAIA-ART4',
      'AIGE-OBL-EUAIA-ART5',
      'AIGE-OBL-EUAIA-ART6',
      'AIGE-OBL-EUAIA-ART17',
      'AIGE-OBL-EUAIA-ART26',
      'AIGE-OBL-ISO42001-A2',
      'AIGE-OBL-ISO42001-A3',
      'AIGE-OBL-NISTRMF-GOVERN',
    ],
    pathStartAt: ['the-discipline', 'maturity-self-assessment'],
    sources: [
      aiAct('Art. 4 AI literacy, Art. 5 prohibited practices, Art. 113 application dates'),
      omnibus(
        'Art. 5(1)(ba) and (bb) prohibitions from 2 December 2026; Annex III high-risk obligations from 2 December 2027',
      ),
    ],
  },

  {
    id: 'public-sector',
    slug: 'public-sector',
    label: 'Public sector',
    navLabel: 'For the public sector',
    metaTitle: 'AI governance for the public sector',
    description:
      'A route for public bodies: the impact assessment before first use, registration, notice and explanation to citizens, procurement clauses and the 2030 deadline.',
    title: 'Govern the AI that decides about citizens.',
    lede: 'For ministries, agencies, municipalities and operators of public services that buy, build or run AI: the duties you meet before buying, before first use and while it runs, in that order.',
    summary:
      'Public bodies and operators of public services: CIOs, service owners, procurement and oversight.',
    who: 'Your systems often decide about people who cannot choose another provider, so the law asks more of you than of most deployers: an impact assessment before first use, registration, notice to the people affected and an explanation when they ask. Much of your AI arrives through procurement, so the contract is where evidence is won or lost. This route puts the duties in the order you meet them.',
    roles: [
      'Public-sector CIOs and CDOs',
      'Service and policy owners',
      'Procurement officers',
      'Public-sector DPOs',
      'Audit and oversight bodies',
    ],
    questions: [
      {
        question: 'Do we need a fundamental rights impact assessment?',
        answer:
          'Yes, before first use of an Annex III high-risk system, if you are a body governed by public law or a private entity providing public services; systems for critical infrastructure (Annex III point 2) are excepted. Where your DPIA already meets part of it, the FRIA complements the DPIA (Art. 27(1), 27(4)) [1].',
        link: {
          label: 'Fundamental rights impact assessment',
          href: '/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27',
        },
      },
      {
        question: 'What has to be public, and to whom?',
        answer:
          "Public authorities that deploy high-risk systems register them in the EU database (Arts. 26(8), 49) [1]. People subject to decisions an Annex III system makes or helps make are told so (Art. 26(11)) and can ask for an explanation of its role (Art. 86) [1]. In the UK, the Algorithmic Transparency Recording Standard is mandatory for government departments and for arm's-length bodies that deliver public or frontline services [2].",
        link: { label: 'Deployer duties (Article 26)', href: '/bok/eu-ai-act#deployer-duties-article-26' },
      },
      {
        question: 'What about the systems we already run?',
        answer:
          'Providers and deployers of high-risk systems intended for use by public authorities must comply by {date:AIGE-OBL-EUAIA-ART9|public authorities} (Art. 111(2)) [1]. The first step is an inventory that shows which of your systems are in scope.',
        link: { label: 'The post-Omnibus timeline', href: '/bok/eu-ai-act#the-post-omnibus-timeline' },
      },
    ],
    route: [
      {
        title: 'Before you buy or build',
        steps: [
          {
            kind: 'chapter',
            slug: 'eu-ai-act',
            anchor: 'high-risk-through-use-annex-iii',
            title: 'High-risk through use (Annex III)',
            why: 'The Annex III areas, public services and benefits among them.',
          },
          {
            kind: 'tool',
            id: 'ai-act-triage',
            why: 'A first reading of role and risk class for one system, as a document you keep.',
          },
          {
            kind: 'chapter',
            slug: 'governing-deployment',
            anchor: 'the-deployment-decision',
            title: 'The deployment decision',
            why: 'Start from the use case, not the model, and record the decision.',
          },
          {
            kind: 'figure',
            id: 'procured-ai-control',
            why: 'Where control moves when you buy instead of build.',
          },
          {
            kind: 'pattern',
            slug: 'vendor-model-due-diligence-gate',
            why: 'No supplier model in service without answered questions on file.',
          },
          {
            kind: 'tool',
            id: 'vendor-due-diligence',
            why: 'Build the due-diligence request for one supplier and export it.',
          },
          {
            kind: 'template',
            anchor: 'kit-contract-clause-checklist',
            title: 'AI contract clause checklist',
            why: 'The terms a procurement should secure, each tied to its obligation.',
          },
        ],
      },
      {
        title: 'Before first use',
        steps: [
          {
            kind: 'chapter',
            slug: 'eu-ai-act',
            anchor: 'fundamental-rights-impact-assessment-article-27',
            title: 'Fundamental rights impact assessment',
            why: 'Who must do it, what it contains and when to redo it.',
          },
          {
            kind: 'pattern',
            slug: 'fria-as-code',
            why: 'The FRIA as versioned data, with the triggers that reopen it.',
          },
          {
            kind: 'template',
            anchor: 'schema-impact-assessment',
            title: 'Impact assessment schema',
            why: 'One record for the FRIA and the DPIA, cross-referenced.',
          },
          {
            kind: 'tool',
            id: 'impact-assessment',
            why: 'Draft the assessment in the browser and export it.',
          },
          {
            kind: 'chapter',
            slug: 'the-stack',
            anchor: 'designing-human-oversight-article-14',
            title: 'Designing human oversight',
            why: 'Oversight by people with the competence and the authority to overrule.',
          },
          {
            kind: 'figure',
            id: 'human-oversight',
            why: 'Where the checkpoint sits, and what the overseer sees.',
          },
          {
            kind: 'template',
            anchor: 'schema-deployment-decision-record',
            title: 'Deployment decision record schema',
            why: 'The go-live decision with its evidence and any dissent.',
          },
        ],
      },
      {
        title: 'While it runs',
        steps: [
          {
            kind: 'chapter',
            slug: 'eu-ai-act',
            anchor: 'deployer-duties-article-26',
            title: 'Deployer duties (Article 26)',
            why: 'Oversight, monitoring, logs, suspension, notice and registration.',
          },
          {
            kind: 'chapter',
            slug: 'ai-laws-worldwide',
            anchor: 'united-kingdom-principles-regulators-and-public-sector-records',
            title: 'Public-sector records in the UK',
            why: 'The recording standard as a model for a public inventory entry.',
          },
          {
            kind: 'chapter',
            slug: 'fairness-and-explainability',
            anchor: 'monitoring-fairness-in-production',
            title: 'Monitoring fairness in production',
            why: 'The subgroup metrics to keep watching after go-live.',
          },
          {
            kind: 'case',
            id: 'syri-judgment',
            why: 'A fraud risk model struck down because nobody could verify it.',
          },
          {
            kind: 'case',
            id: 'dutch-childcare-benefits',
            why: 'Nationality as a risk indicator in a benefits system.',
          },
          {
            kind: 'case',
            id: 'nyc-mycity-chatbot',
            why: 'A city chatbot whose answers ran contrary to city law.',
          },
        ],
      },
    ],
    thisWeek: [
      {
        action:
          'Inventory every algorithmic system that decides or helps decide about people, including those bought as a service.',
        link: {
          label: 'AI system register entry',
          href: '/resources/templates#schema-ai-system-register-entry',
        },
      },
      {
        action: 'Flag which of them fall in an Annex III area.',
        link: {
          label: 'High-risk through use (Annex III)',
          href: '/bok/eu-ai-act#high-risk-through-use-annex-iii',
        },
      },
      {
        action: 'Start a FRIA for the highest-stakes one, building on its DPIA.',
        link: { label: 'FRIA-as-Code', href: '/patterns/fria-as-code' },
      },
      {
        action: 'Read two public-sector cases with the service owners.',
        link: { label: 'SyRI judgment', href: '/cases/syri-judgment' },
      },
      {
        action: 'Add the AI clause checklist to the next procurement.',
        link: {
          label: 'AI contract clause checklist',
          href: '/resources/templates#kit-contract-clause-checklist',
        },
      },
    ],
    obligationsWhy:
      'The duties that weigh most on a public deployer: the FRIA, deployer duties, registration, human oversight, the prohibitions (social scoring among them), transparency, literacy, and the UK safeguards for automated decisions.',
    obligations: [
      'AIGE-OBL-EUAIA-ART27',
      'AIGE-OBL-EUAIA-ART26',
      'AIGE-OBL-EUAIA-ART49-71',
      'AIGE-OBL-EUAIA-ART14',
      'AIGE-OBL-EUAIA-ART5',
      'AIGE-OBL-EUAIA-ART50',
      'AIGE-OBL-EUAIA-ART4',
      'AIGE-OBL-UK-ADM',
    ],
    pathStartAt: ['risk-tiers-intake', 'fria-dpia-as-code'],
    sources: [
      aiAct('Arts. 26(8), 26(11), 27(1), 27(4), 49, 86 and 111(2); Annex III'),
      ATRS,
    ],
  },

  {
    id: 'smes',
    slug: 'smes',
    label: 'SMEs and start-ups',
    navLabel: 'For SMEs and start-ups',
    metaTitle: 'AI governance for SMEs and start-ups',
    description:
      'A route for small teams: the floor that applies at any size, what the EU AI Act eases for SMEs, buying AI with care and a first week one person can run.',
    title: 'Proportionate governance for a small team.',
    lede: 'For companies without a governance function: the controls that apply at any size, what the law scales down for you, and a first week one person can run.',
    summary:
      'Small and medium-sized companies and start-ups, most of them buying more AI than they build.',
    who: 'You have a small team, little time and nobody whose job title says governance. You probably buy more AI than you build, and some of it was signed up for by staff with a company card. The floor still applies, but the law and the standards scale the rest to your size. This route starts with what one person can set up in a week and grows from there.',
    roles: [
      'Founders and managing directors',
      'CTOs and lead engineers',
      'Operations and IT leads',
      'Whoever holds compliance part-time',
    ],
    questions: [
      {
        question: 'What is the least we must do?',
        answer:
          'Some controls do not scale down: every AI system in production registered with an owner and a tier, prohibited practices eliminated, every accepted risk with a named acceptor and an expiry, and every agent that acts with its own identity and a tested kill switch.',
        link: {
          label: 'The floor that does not tailor away',
          href: '/bok/risk-management#the-floor-that-does-not-tailor-away',
        },
      },
      {
        question: 'Does the EU AI Act ease anything for small companies?',
        answer:
          'In form, not in substance. SMEs and start-ups get priority access to regulatory sandboxes (Art. 62(1)(a)) and fines capped at the lower of the amount and the percentage (Art. 99(6)) [1]. SMEs and small mid-caps may draw up the technical documentation in a simplified form, and the quality management system is proportionate to their size (Arts. 11(1), 17) [2].',
        link: { label: 'The Act and the Omnibus', href: '/bok/eu-ai-act#the-act-and-the-omnibus' },
      },
      {
        question: 'We only use third-party AI. What is ours to do?',
        answer:
          'As a deployer you own the use: the decision to deploy, the monitoring, disclosing deep fakes you publish (Art. 50(4)) and, for a high-risk system, oversight by people with the competence, training and authority to act (Art. 26(2)) [1]. The contract is where you get the evidence you need from the supplier.',
        link: { label: 'Build, buy or adapt', href: '/bok/governing-deployment#build-buy-or-adapt' },
      },
    ],
    route: [
      {
        title: 'Week one',
        steps: [
          {
            kind: 'figure',
            id: 'minimum-viable-stack',
            why: 'The smallest set of controls one person can run.',
          },
          {
            kind: 'chapter',
            slug: 'the-stack',
            anchor: 'the-minimum-viable-stack-for-a-team-of-one',
            title: 'The minimum viable stack for a team of one',
            why: 'A thin slice through all five layers, in the order that pays off first.',
          },
          {
            kind: 'chapter',
            slug: 'governance-program',
            anchor: 'standing-up-a-program-without-engineering-capacity',
            title: 'A program without engineering capacity',
            why: 'What to do when nobody can write the code yet.',
          },
          {
            kind: 'chapter',
            slug: 'governance-program',
            anchor: 'acceptable-use-of-ai-by-staff',
            title: 'Acceptable use of AI by staff',
            why: 'The first policy any company that uses AI needs.',
          },
          {
            kind: 'template',
            anchor: 'kit-ai-policy',
            title: 'AI policy template',
            why: 'One source for the policy people approve and the rules a pipeline can run later.',
          },
          {
            kind: 'template',
            anchor: 'kit-literacy-curriculum',
            title: 'AI literacy curriculum',
            why: 'Role-based modules whose completions become training records.',
          },
          {
            kind: 'pattern',
            slug: 'shadow-ai-discovery',
            why: 'Find the AI already in use, including the free sign-ups.',
          },
        ],
      },
      {
        title: 'Before you buy',
        steps: [
          {
            kind: 'chapter',
            slug: 'governing-deployment',
            anchor: 'build-buy-or-adapt',
            title: 'Build, buy or adapt',
            why: 'Three routes, and the evidence burden each one carries.',
          },
          {
            kind: 'tool',
            id: 'ai-act-triage',
            why: 'A first reading of role and risk class for one system, as a document you keep.',
          },
          {
            kind: 'pattern',
            slug: 'vendor-model-due-diligence-gate',
            why: 'Ask the supplier the right questions before the contract, not after.',
          },
          {
            kind: 'tool',
            id: 'vendor-due-diligence',
            why: 'Build the due-diligence request for one supplier and export it.',
          },
          {
            kind: 'template',
            anchor: 'kit-contract-clause-checklist',
            title: 'AI contract clause checklist',
            why: 'The terms to secure, each tied to the obligation it answers.',
          },
          {
            kind: 'reference',
            href: '/resources/contracts',
            title: 'Contract clauses',
            why: 'Red flags and fallbacks in AI contracts and model licences.',
          },
        ],
      },
      {
        title: 'Grow it',
        steps: [
          {
            kind: 'chapter',
            slug: 'risk-management',
            anchor: 'proportionate-governance-tailoring-the-loop',
            title: 'Proportionate governance',
            why: 'The tailoring matrix, by size, sector and appetite.',
          },
          {
            kind: 'chapter',
            slug: 'eu-ai-act',
            anchor: 'sandboxes-and-real-world-testing',
            title: 'Sandboxes and real-world testing',
            why: 'Where a small provider can test with a regulator in the room.',
          },
          {
            kind: 'tool',
            id: 'maturity-self-check',
            why: 'Score the five layers and pick the one move that raises the floor.',
          },
          {
            kind: 'tool',
            id: 'obligations-planner',
            why: 'Turn the dates that apply to you into a plan and a calendar file.',
          },
          {
            kind: 'reference',
            href: '/path',
            title: 'The learning path',
            why: 'Four stages from foundations to proof, if you are the one who will build it.',
          },
        ],
      },
    ],
    thisWeek: [
      {
        action: 'List every AI tool the company uses, including the free ones staff signed up for.',
        link: { label: 'Shadow-AI Discovery', href: '/patterns/shadow-ai-discovery' },
      },
      {
        action: 'Adopt a one-page acceptable-use policy and tell everyone where it is.',
        link: {
          label: 'Acceptable use of AI by staff',
          href: '/bok/governance-program#acceptable-use-of-ai-by-staff',
        },
      },
      {
        action: 'Check each use against the Article 5 list and file the result.',
        link: { label: 'Art. 5 prohibited practices', href: '/obligations/aige-obl-euaia-art5' },
      },
      {
        action:
          'Find where Article 50 asks for a notice of AI interaction or a label on AI-generated content.',
        link: { label: 'Art. 50 transparency', href: '/obligations/aige-obl-euaia-art50' },
      },
      {
        action: 'Run the maturity self-check and pick one move.',
        link: { label: 'Maturity self-check', href: '/toolkit/maturity-self-check' },
      },
    ],
    obligationsWhy:
      'The duties that reach a small company first, as a user and as a builder: literacy, prohibitions, transparency, the value chain, deployer duties, the documentation and QMS the Act scales to size, and real-world testing.',
    obligations: [
      'AIGE-OBL-EUAIA-ART4',
      'AIGE-OBL-EUAIA-ART5',
      'AIGE-OBL-EUAIA-ART50',
      'AIGE-OBL-EUAIA-ART25',
      'AIGE-OBL-EUAIA-ART26',
      'AIGE-OBL-EUAIA-ART11',
      'AIGE-OBL-EUAIA-ART17',
      'AIGE-OBL-EUAIA-ART60',
    ],
    pathStartAt: ['minimum-viable-stack', 'shadow-ai-discovery'],
    sources: [
      aiAct('Arts. 26(2), 50(4), 62(1)(a) and 99(6)'),
      omnibus(
        'amended Arts. 11(1) and 17: simplified technical documentation and a proportionate QMS for SMEs and small mid-caps',
      ),
    ],
  },
] as const;

/** The hub for `slug`, if any. */
export function audienceBySlug(slug: string): Audience | undefined {
  return audiences.find((audience) => audience.slug === slug);
}

/** The hub's page. */
export function audiencePath(audience: Pick<Audience, 'slug'>): string {
  return `/for/${audience.slug}`;
}
