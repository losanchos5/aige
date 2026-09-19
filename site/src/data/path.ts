// path.ts: the AIGE learning path — a roadmap.sh-style itinerary for the AI
// governance engineer. Stages follow the spine of chapter 04 ("see it, rule
// it, test it, contain it, prove it"); nodes are grounded in bok/*.md and the
// /role and /stack pages, and never introduce a claim the chapters do not make.
//
// Links policy: every `PathLink.href` is an internal, absolute path. A
// `/bok/<slug>#frag` fragment is the `#slug` github-slugger produces for that
// chapter heading (see src/lib/md-parse.ts); a `/resources/glossary#t-…`
// fragment is `termId(term)` from src/lib/glossary.ts. tests/data.spec.ts
// resolves both against the source Markdown, so a broken anchor fails the build.
//
// Resources policy: external URLs are curated, illustrative and not
// endorsements. A URL drawn from bok/10-reading-list.md is trusted as verified;
// every other external URL was checked by hand on 2026-09-15, and the Block E
// additions and replacements were verified on 2026-09-19 (status, redirects,
// relevance). No tool is named that the Body of Knowledge does not treat.

import type { LayerNumber } from './stack';

/** roadmap.sh-style track for a node: load-bearing, an alternative, or optional. */
export type PathKind = 'core' | 'alternative' | 'optional';
/** The medium of an external resource. */
export type ResourceType =
  | 'article'
  | 'video'
  | 'course'
  | 'official'
  | 'tool'
  | 'template';
/** Whether the external resource is free or paid. */
export type ResourceCost = 'free' | 'paid';
/** The four stages of the path, in build order. */
export type PathStageId =
  | 'foundations'
  | 'see-and-rule'
  | 'test-and-contain'
  | 'prove-and-specialise';
/** The three ways in, mirroring `role.waysIn`. */
export type PathEntryId = 'legal' | 'security' | 'mlops';

export interface PathResource {
  /** Title of the resource, as a reader would recognise it. */
  title: string;
  /** Canonical URL; always https. */
  url: string;
  /** The medium. */
  type: ResourceType;
  /** Free or paid. */
  cost: ResourceCost;
  /** Optional one-line note on why it matters. */
  note?: string;
}

/** An internal link: absolute path, optionally with a `#fragment`. */
export interface PathLink {
  /** Human-readable label. */
  label: string;
  /** Absolute internal path (may carry a `#frag`). */
  href: string;
}

export interface PathNode {
  /** Stable, unique id (kebab-case). */
  id: string;
  /** Node title. */
  title: string;
  /** The stage this node sits in. */
  stage: PathStageId;
  /** core / alternative / optional. */
  kind: PathKind;
  /** Stack layer 1-5 the node colours with; absent = cross-cutting (neutral). */
  layerN?: LayerNumber;
  /** One-to-two-sentence summary, in the site's voice. */
  summary: string;
  /** Internal links into the Body of Knowledge and section pages (>= 1). */
  links: readonly PathLink[];
  /** External resources (2-4; the two capstones may carry 0-1). */
  resources: readonly PathResource[];
  /** Ids of prerequisite nodes; only cross-stage prereqs are drawn as edges. */
  prereqs?: readonly string[];
}

export interface PathStage {
  /** Stage id. */
  id: PathStageId;
  /** Stage number, 1-4. */
  n: 1 | 2 | 3 | 4;
  /** Stage title. */
  title: string;
  /** Short tagline. */
  tagline: string;
  /** One-to-two-sentence summary of what the stage covers. */
  summary: string;
}

export interface PathEntry {
  /** Entry id, mirroring `role.waysIn`. */
  id: PathEntryId;
  /** The adjacent discipline someone converts from. */
  title: string;
  /** Node ids to start at (each must exist in `nodes`). */
  startAt: readonly string[];
}

/** The four stages, in build order (see it, rule it, test it, contain it, prove it). */
export const stages: readonly PathStage[] = [
  {
    id: 'foundations',
    n: 1,
    title: 'Foundations',
    tagline: 'Learn the discipline and its tools',
    summary:
      'The vocabulary, the values and the baseline engineering skills. Before you build a control, learn what the discipline is, the three questions it answers, and the Python, Git and law-reading the workflows rest on.',
  },
  {
    id: 'see-and-rule',
    n: 2,
    title: 'See it and rule it',
    tagline: 'Inventory what runs, rule what it may do',
    summary:
      'Layers 02 and 01. See every model and agent in a runtime-aware registry, then express what each is allowed to do as executable policy with a gate that can block the build.',
  },
  {
    id: 'test-and-contain',
    n: 3,
    title: 'Test it and contain it',
    tagline: 'Test with evals, contain at runtime',
    summary:
      'Layers 03 and 04. Prove behaviour with evals and red teaming wired into the pipeline, then hold the line at runtime with guardrails, identity, observability and a tested kill switch.',
  },
  {
    id: 'prove-and-specialise',
    n: 4,
    title: 'Prove it and specialise',
    tagline: 'Prove it with evidence, then specialise',
    summary:
      'Layer 05 and beyond. Close the loop with machine-readable evidence and continuous assurance, then specialise — systemic-risk models, vendor due diligence — and pressure-test the whole stack.',
  },
] as const;

/**
 * The path's nodes, in reading order within each stage. `layerN` colours a node
 * by stack layer; nodes without one are cross-cutting. Every external resource
 * not drawn from bok/10-reading-list.md was reviewed by hand on 2026-09-15;
 * Block E additions and replacements were verified on 2026-09-19.
 */
export const nodes: readonly PathNode[] = [
  // ── 1 Foundations ────────────────────────────────────────────────────────
  {
    id: 'the-discipline',
    title: 'What the discipline is',
    stage: 'foundations',
    kind: 'core',
    summary:
      'AI governance engineering applies engineering practice — systems thinking, product thinking and code — to the governance of AI. Start here, and learn what separates it from AI safety, MLOps and compliance.',
    links: [
      { label: 'The definition', href: '/bok/definition#the-definition' },
      { label: 'The Thesis', href: '/thesis' },
    ],
    resources: [
      {
        title: 'GRC Engineering Manifesto',
        url: 'https://grc.engineering/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'What is GRC Engineering (Ayoub Fandi)',
        url: 'https://grcengineer.com/what-is-grc-engineering/',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'three-questions',
    title: 'The three questions',
    stage: 'foundations',
    kind: 'core',
    summary:
      'Every control in the stack answers one of three questions: what AI is running, what it is allowed to do, and what evidence proves it. Learn to hold all three in production.',
    links: [
      { label: 'The three questions', href: '/bok/definition#the-three-questions' },
      { label: 'The stack', href: '/stack' },
    ],
    resources: [
      {
        title: 'NIST AI Risk Management Framework',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'NIST AI RMF Playbook',
        url: 'https://airc.nist.gov/airmf-resources/playbook/',
        type: 'official',
        cost: 'free',
      },
    ],
  },
  {
    id: 'why-now',
    title: 'Why now',
    stage: 'foundations',
    kind: 'optional',
    summary:
      'The thing being governed changed shape — from models you call to agents that act — and the market named the role before the profession named itself. Read why the discipline is forming now.',
    links: [
      {
        label: 'The five problems with the evidence',
        href: '/bok/why-now#the-five-problems-with-the-evidence',
      },
      { label: 'The agent shift', href: '/bok/why-now#the-agent-shift' },
    ],
    resources: [
      {
        title: 'IAPP AI Governance Profession Report',
        url: 'https://iapp.org/resources/article/ai-governance-profession-report',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'HiddenLayer Threat Report',
        url: 'https://www.hiddenlayer.com/report-and-guide/threatreport2026',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'values-principles',
    title: 'Values and principles',
    stage: 'foundations',
    kind: 'core',
    summary:
      'The eight values and six principles the thesis commits to, each paired with the anti-pattern it rejects. This is the value grammar the rest of the path builds on.',
    links: [
      {
        label: 'The eight values',
        href: '/bok/values-and-principles#the-eight-values',
      },
      {
        label: 'The six principles',
        href: '/bok/values-and-principles#the-six-principles',
      },
    ],
    resources: [
      {
        title: 'The Agile Manifesto',
        url: 'https://agilemanifesto.org/',
        type: 'article',
        cost: 'free',
      },
      {
        title: 'The Twelve-Factor App',
        url: 'https://12factor.net/',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'stack-overview',
    title: 'Read the stack',
    stage: 'foundations',
    kind: 'core',
    summary:
      'The reference architecture: five layers that answer the three questions, with evidence produced at the bottom and assurance closing at the top. Learn to read the stack before you build in it.',
    links: [
      { label: 'The stack', href: '/stack' },
      {
        label: 'How to read the stack',
        href: '/bok/the-stack#how-to-read-the-stack',
      },
    ],
    resources: [
      {
        title: 'CSIRO Responsible AI Pattern Catalogue',
        url: 'https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Awesome Responsible AI (curated list)',
        url: 'https://github.com/AthenaCore/AwesomeResponsibleAI',
        type: 'tool',
        cost: 'free',
      },
    ],
  },
  {
    id: 'analyst-vs-engineer',
    title: 'Analyst versus engineer',
    stage: 'foundations',
    kind: 'core',
    summary:
      'The analyst describes the system from the outside and files the description; the engineer reads the running system and ships the control that changes what it does. Know which side of the line each task sits on.',
    links: [
      { label: 'The role', href: '/role' },
      {
        label: 'Analyst versus engineer',
        href: '/bok/the-role#analyst-versus-engineer',
      },
    ],
    resources: [
      {
        title: 'GRC Engineer',
        url: 'https://grcengineer.com/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'GRC Engineering in 2026 (Justin Pagano)',
        url: 'https://blog.grc.engineering/p/grc-engineering-in-2026',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'python-glue',
    title: 'Python as glue',
    stage: 'foundations',
    kind: 'core',
    summary:
      'Python is the cross-cutting skill under every workflow — enough to glue systems together, script an intake, or run an eval harness. You do not need to be a software engineer, but you do need to read and write it.',
    links: [
      { label: 'Skills by workflow', href: '/bok/the-role#skills-by-workflow' },
    ],
    resources: [
      {
        title: 'The Python Tutorial',
        url: 'https://docs.python.org/3/tutorial/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Automate the Boring Stuff with Python',
        url: 'https://automatetheboringstuff.com/',
        type: 'course',
        cost: 'free',
      },
    ],
  },
  {
    id: 'git-cicd',
    title: 'Git and CI/CD',
    stage: 'foundations',
    kind: 'core',
    layerN: 1,
    summary:
      'Version control and CI/CD are where governance rules become gates: a merge blocked or allowed, with a logged reason. Learn the pipeline the controls fire in.',
    links: [
      {
        label: 'Policy-as-code and gates',
        href: '/bok/the-role#policy-as-code-and-gates',
      },
    ],
    resources: [
      {
        title: 'Pro Git (book)',
        url: 'https://git-scm.com/book',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'GitHub Actions documentation',
        url: 'https://docs.github.com/en/actions',
        type: 'official',
        cost: 'free',
      },
    ],
  },
  {
    id: 'law-reading',
    title: 'Law-reading',
    stage: 'foundations',
    kind: 'core',
    summary:
      'Reading regulation and standards well enough to build the control that meets them — parsing an AI Act article or an ISO/IEC 42001 control without mistaking it for legal advice. This is translation, not law.',
    links: [
      { label: 'Skills by workflow', href: '/bok/the-role#skills-by-workflow' },
      { label: 'Frameworks', href: '/resources/frameworks' },
    ],
    resources: [
      {
        title: 'EU AI Act + Digital Omnibus explorer',
        url: 'https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'NIST AI Risk Management Framework',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'IAPP AIGP certification',
        url: 'https://iapp.org/certify/aigp/',
        type: 'course',
        cost: 'paid',
      },
    ],
  },
  {
    id: 'llm-agent-internals',
    title: 'LLM and agent internals',
    stage: 'foundations',
    kind: 'optional',
    summary:
      'Enough of how models and agents work — context, tools, autonomy — to see where a control has to fire. The agent shift is what makes runtime identity and scope non-optional.',
    links: [
      { label: 'The agent shift', href: '/bok/why-now#the-agent-shift' },
      {
        label: 'Agent (agentic AI)',
        href: '/resources/glossary#t-agent-agentic-ai',
      },
    ],
    resources: [
      {
        title: 'Building effective agents',
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
        type: 'article',
        cost: 'free',
      },
      {
        title: 'Model Context Protocol',
        url: 'https://modelcontextprotocol.io/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Stanford CS120: Introduction to AI Safety',
        url: 'https://web.stanford.edu/class/cs120/',
        type: 'course',
        cost: 'free',
      },
    ],
  },

  // ── 2 See it and rule it ─────────────────────────────────────────────────
  {
    id: 'risk-tiers-intake',
    title: 'Risk tiers and intake',
    stage: 'see-and-rule',
    kind: 'core',
    layerN: 2,
    summary:
      'Every system enters through an intake that classifies it by risk tier, regulatory exposure and autonomy, then routes it to the controls its class requires. Build intake as form-plus-code, not a questionnaire.',
    links: [
      {
        label: 'Intake and classification',
        href: '/bok/the-role#intake-and-classification',
      },
      {
        label: 'EU AI Act (post-Omnibus)',
        href: '/bok/regulatory-map#eu-ai-act-post-omnibus',
      },
    ],
    resources: [
      {
        title: 'EU AI Act Annex III (high-risk use cases)',
        url: 'https://artificialintelligenceact.eu/annex/3/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'ISO/IEC 42005 (AI system impact assessment)',
        url: 'https://www.iso.org/standard/44545.html',
        type: 'official',
        cost: 'paid',
      },
    ],
    prereqs: ['law-reading'],
  },
  {
    id: 'agent-registry',
    title: 'Agent registry',
    stage: 'see-and-rule',
    kind: 'core',
    layerN: 2,
    summary:
      'The runtime-aware inventory of every model, service and agent — each with an owner, a declared scope, a status and a kill switch — fed by the deployment pipeline, not typed into a spreadsheet.',
    links: [
      {
        label: 'Inventory and registry',
        href: '/bok/the-role#inventory-and-registry',
      },
      { label: 'Pattern: agent registry', href: '/bok/patterns#pattern-agent-registry' },
      { label: 'Agent registry', href: '/resources/glossary#t-agent-registry' },
    ],
    resources: [
      {
        title: 'NIST NCCoE: software and AI agent identity',
        url: 'https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'OWASP Top 10 for Agentic Applications',
        url: 'https://genai.owasp.org/',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['three-questions'],
  },
  {
    id: 'aibom-model-cards',
    title: 'AIBOM and model cards',
    stage: 'see-and-rule',
    kind: 'core',
    layerN: 2,
    summary:
      'Transparency artefacts as build outputs: an AIBOM for what an AI system is made of, and model and data cards as control evidence. Generate them, do not hand-write them.',
    links: [
      { label: 'Pattern: AIBOM', href: '/bok/patterns#pattern-aibom' },
      {
        label: 'Pattern: model card as control evidence',
        href: '/bok/patterns#pattern-model-card-as-control-evidence',
      },
      {
        label: 'Layer 02 — Inventory & Transparency',
        href: '/bok/the-stack#layer-02--inventory--transparency',
      },
    ],
    resources: [
      {
        title: 'CycloneDX ML-BOM',
        url: 'https://cyclonedx.org/capabilities/mlbom/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'SPDX 3.0 specification',
        url: 'https://spdx.github.io/spdx-spec/v3.0.1/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Model Cards for Model Reporting',
        url: 'https://arxiv.org/abs/1810.03993',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'shadow-ai-discovery',
    title: 'Shadow AI discovery',
    stage: 'see-and-rule',
    kind: 'optional',
    layerN: 2,
    summary:
      'The AI you do not know about is the AI you cannot govern. Discovery finds unregistered models and agents in production and feeds them back into the registry.',
    links: [
      {
        label: 'Pattern: shadow AI discovery',
        href: '/bok/patterns#pattern-shadow-ai-discovery',
      },
      { label: 'Shadow AI', href: '/resources/glossary#t-shadow-ai' },
    ],
    resources: [
      {
        title: 'OWASP Top 10 for Agentic Applications',
        url: 'https://genai.owasp.org/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Awesome Production Machine Learning',
        url: 'https://github.com/EthicalML/awesome-production-machine-learning',
        type: 'tool',
        cost: 'free',
      },
    ],
  },
  {
    id: 'policy-as-code-opa',
    title: 'Policy-as-code with OPA',
    stage: 'see-and-rule',
    kind: 'core',
    layerN: 1,
    summary:
      'Express governance rules as executable policy that evaluates in CI/CD and at admission. OPA/Rego is the most common engine; the output is a structured allow/deny verdict tied to a commit.',
    links: [
      {
        label: 'Policy-as-code and gates',
        href: '/bok/the-role#policy-as-code-and-gates',
      },
      {
        label: 'Layer 01 — Govern-as-Code',
        href: '/bok/the-stack#layer-01--govern-as-code',
      },
      { label: 'Policy-as-code', href: '/resources/glossary#t-policy-as-code' },
    ],
    resources: [
      {
        title: 'Open Policy Agent documentation',
        url: 'https://www.openpolicyagent.org/docs',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'The Rego Playground',
        url: 'https://play.openpolicyagent.org/',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'OPA policy language (Rego) guide',
        url: 'https://www.openpolicyagent.org/docs/policy-language',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['git-cicd'],
  },
  {
    id: 'policy-as-code-cedar',
    title: 'Policy-as-code with Cedar',
    stage: 'see-and-rule',
    kind: 'alternative',
    layerN: 1,
    summary:
      'Cedar is an alternative policy language for the same job — authored rules, evaluated against structured input, with a machine-readable verdict. Choose it where its authorization model fits better than Rego.',
    links: [
      {
        label: 'Policy-as-code and gates',
        href: '/bok/the-role#policy-as-code-and-gates',
      },
      {
        label: 'Layer 01 — Govern-as-Code',
        href: '/bok/the-stack#layer-01--govern-as-code',
      },
      { label: 'Policy-as-code', href: '/resources/glossary#t-policy-as-code' },
    ],
    resources: [
      {
        title: 'Cedar policy language',
        url: 'https://cedarpolicy.com/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Cedar documentation',
        url: 'https://docs.cedarpolicy.com/',
        type: 'official',
        cost: 'free',
      },
    ],
  },
  {
    id: 'policy-cards',
    title: 'Policy Cards',
    stage: 'see-and-rule',
    kind: 'optional',
    layerN: 1,
    summary:
      "Machine-readable governance artefacts that describe a policy's intent and scope in a schema an agent runtime can consume directly. An emerging way to make policy portable across the stack.",
    links: [
      { label: 'Pattern: policy card', href: '/bok/patterns#pattern-policy-card' },
      { label: 'Policy Card', href: '/resources/glossary#t-policy-card' },
    ],
    resources: [
      {
        title: 'Policy Cards (arXiv 2510.24383)',
        url: 'https://arxiv.org/abs/2510.24383',
        type: 'article',
        cost: 'free',
      },
      {
        title: 'OWASP Agent Control Standard',
        url: 'https://genai.owasp.org/',
        type: 'official',
        cost: 'free',
      },
    ],
  },
  {
    id: 'gates-admission',
    title: 'Gates and admission control',
    stage: 'see-and-rule',
    kind: 'core',
    layerN: 1,
    summary:
      'A policy is not a control; a gate that can block the build is. Wire policy-as-code into CI and admission control so a failing rule stops the deploy with a logged reason.',
    links: [
      {
        label: 'Give every control teeth',
        href: '/bok/values-and-principles#give-every-control-teeth',
      },
      {
        label: 'Layer 01 — Govern-as-Code',
        href: '/bok/the-stack#layer-01--govern-as-code',
      },
    ],
    resources: [
      {
        title: 'Conftest',
        url: 'https://www.conftest.dev/',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'OPA Gatekeeper',
        url: 'https://open-policy-agent.github.io/gatekeeper/website/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Kyverno',
        url: 'https://kyverno.io/',
        type: 'tool',
        cost: 'free',
      },
    ],
    prereqs: ['policy-as-code-opa'],
  },
  {
    id: 'fria-dpia-as-code',
    title: 'FRIA and DPIA as code',
    stage: 'see-and-rule',
    kind: 'alternative',
    layerN: 1,
    summary:
      'Turn a fundamental-rights or data-protection impact assessment into a versioned, executable artefact generated from a template — cross-referenced to the registry entry, not filed as a one-off document.',
    links: [
      { label: 'Pattern: FRIA as code', href: '/bok/patterns#pattern-fria-as-code' },
      { label: 'FRIA', href: '/resources/glossary#t-fria' },
    ],
    resources: [
      {
        title: 'EU AI Act Article 27 (FRIA)',
        url: 'https://artificialintelligenceact.eu/article/27/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'ISO/IEC 42005 (AI system impact assessment)',
        url: 'https://www.iso.org/standard/44545.html',
        type: 'official',
        cost: 'paid',
      },
      {
        title: 'CNIL PIA template and open-source software',
        url: 'https://www.cnil.fr/en/privacy-impact-assessment-pia',
        type: 'template',
        cost: 'free',
      },
    ],
    prereqs: ['risk-tiers-intake'],
  },

  // ── 3 Test it and contain it ─────────────────────────────────────────────
  {
    id: 'eval-harness',
    title: 'Eval harness',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 3,
    summary:
      'Build and maintain the eval suites — capability, safety and adversarial — and the harness that runs them. This is the workflow that most sharply separates the engineer from the analyst.',
    links: [
      {
        label: 'Evals and red teaming as evidence',
        href: '/bok/the-role#evals-and-red-teaming-as-evidence',
      },
      {
        label: 'Layer 03 — Evals & Red Teaming as Evidence',
        href: '/bok/the-stack#layer-03--evals--red-teaming-as-evidence',
      },
    ],
    resources: [
      {
        title: 'Inspect AI (UK AI Security Institute)',
        url: 'https://github.com/UKGovernmentBEIS/inspect_ai',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'Inspect AI documentation',
        url: 'https://inspect.aisi.org.uk/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'promptfoo documentation',
        url: 'https://www.promptfoo.dev/docs/intro/',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'DeepEval',
        url: 'https://deepeval.com/',
        type: 'tool',
        cost: 'free',
      },
    ],
    prereqs: ['python-glue'],
  },
  {
    id: 'eval-gate-ci',
    title: 'Eval gate in CI',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 3,
    summary:
      'Wire the eval suite into CI so a failing eval blocks the release, versioned alongside the model it tested. Know the limits too: an eval gate proves what it measures, not everything.',
    links: [
      { label: 'Pattern: eval gate in CI', href: '/bok/patterns#pattern-eval-gate-in-ci' },
      {
        label: 'The limits of the eval gate',
        href: '/bok/definition#the-limits-of-the-eval-gate',
      },
      { label: 'Eval gate', href: '/resources/glossary#t-eval-gate' },
    ],
    resources: [
      {
        title: 'Inspect AI (UK AI Security Institute)',
        url: 'https://github.com/UKGovernmentBEIS/inspect_ai',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'promptfoo in CI/CD',
        url: 'https://www.promptfoo.dev/docs/integrations/ci-cd/',
        type: 'tool',
        cost: 'free',
      },
    ],
    prereqs: ['eval-harness', 'gates-admission'],
  },
  {
    id: 'red-teaming',
    title: 'Red teaming',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 3,
    summary:
      'Adversarial testing as evidence: jailbreaks, prompt injection and tool misuse, run as repeatable probes rather than one-off exercises. The findings feed the guardrails and the threat model.',
    links: [
      {
        label: 'Evals and red teaming as evidence',
        href: '/bok/the-role#evals-and-red-teaming-as-evidence',
      },
      { label: 'Red teaming', href: '/resources/glossary#t-red-teaming' },
    ],
    resources: [
      {
        title: 'OWASP Top 10 for LLM Applications',
        url: 'https://genai.owasp.org/llm-top-10/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'garak (LLM vulnerability scanner)',
        url: 'https://github.com/NVIDIA/garak',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'MITRE ATLAS',
        url: 'https://atlas.mitre.org/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'PyRIT (Python Risk Identification Tool)',
        url: 'https://github.com/microsoft/PyRIT',
        type: 'tool',
        cost: 'free',
      },
    ],
  },
  {
    id: 'threat-modelling',
    title: 'Threat modelling',
    stage: 'test-and-contain',
    kind: 'optional',
    layerN: 3,
    summary:
      'Start from a named failure mode or a named harm, then work back to the control. Threat models for AI draw on catalogues of agent and model techniques rather than generic checklists.',
    links: [
      {
        label: 'Start from a named failure mode or a named harm',
        href: '/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm',
      },
    ],
    resources: [
      {
        title: 'MITRE ATLAS',
        url: 'https://atlas.mitre.org/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'OWASP Top 10 for Agentic Applications',
        url: 'https://genai.owasp.org/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Gandalf by Lakera (prompt-injection game)',
        url: 'https://gandalf.lakera.ai/',
        type: 'tool',
        cost: 'free',
      },
      {
        title: 'Trail of Bits: machine learning / AI security writing',
        url: 'https://blog.trailofbits.com/categories/machine-learning/',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'guardrails',
    title: 'Guardrails',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 4,
    summary:
      'Input and output filters and tool-call mediation at the enforcement point — the runtime line that holds when an eval or a policy is not enough. Configure them against the failure modes red teaming found.',
    links: [
      {
        label: 'Runtime monitoring and incidents',
        href: '/bok/the-role#runtime-monitoring-and-incidents',
      },
      {
        label: 'Layer 04 — Runtime Controls & Observability',
        href: '/bok/the-stack#layer-04--runtime-controls--observability',
      },
    ],
    resources: [
      {
        title: 'NVIDIA NeMo Guardrails',
        url: 'https://docs.nvidia.com/nemo/guardrails/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Meta LlamaFirewall',
        url: 'https://meta-llama.github.io/PurpleLlama/LlamaFirewall/',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['red-teaming'],
  },
  {
    id: 'observability-otel',
    title: 'Observability with OpenTelemetry',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 4,
    summary:
      'Turn agent behaviour into a control signal: traces, guardrail decisions and drift, streamed through OpenTelemetry into observability. The runtime data path is what makes the registry and the evidence live.',
    links: [
      {
        label: 'Pattern: continuous assurance telemetry',
        href: '/bok/patterns#pattern-continuous-assurance-telemetry',
      },
      {
        label: 'Runtime data path',
        href: '/resources/glossary#t-runtime-data-path',
      },
    ],
    resources: [
      {
        title: 'OpenTelemetry documentation',
        url: 'https://opentelemetry.io/docs/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'OpenTelemetry GenAI semantic conventions',
        url: 'https://github.com/open-telemetry/semantic-conventions-genai',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Langfuse documentation',
        url: 'https://langfuse.com/docs',
        type: 'tool',
        cost: 'free',
      },
    ],
  },
  {
    id: 'agent-identity',
    title: 'Agent identity and scope',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 4,
    summary:
      'Every agent under its own workload identity with a bounded scope, not a shared human credential. Paired with a tested kill switch, this is among the cheapest controls with the largest blast-radius reduction — non-human identity is the precondition of agent governance.',
    links: [
      {
        label: 'Pattern: agent identity & scoped credentials',
        href: '/bok/patterns#pattern-agent-identity--scoped-credentials',
      },
      {
        label: 'Every agent carries its own identity and scope',
        href: '/bok/values-and-principles#4-every-agent-carries-its-own-identity-and-scope',
      },
      { label: 'NHI', href: '/resources/glossary#t-nhi' },
    ],
    resources: [
      {
        title: 'SPIFFE documentation',
        url: 'https://spiffe.io/docs/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'NIST NCCoE: software and AI agent identity',
        url: 'https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['agent-registry'],
  },
  {
    id: 'kill-switch-hitl',
    title: 'Kill switch and human oversight',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 4,
    summary:
      'A tested way to stop an agent, and a human-in-the-loop checkpoint where the stakes require one. Article 14 oversight is a design problem, not a paragraph.',
    links: [
      {
        label: 'Pattern: kill switch & circuit breaker',
        href: '/bok/patterns#pattern-kill-switch--circuit-breaker',
      },
      {
        label: 'Pattern: human-in-the-loop gate',
        href: '/bok/patterns#pattern-human-in-the-loop-gate',
      },
      {
        label: 'Designing human oversight (Article 14)',
        href: '/bok/the-stack#designing-human-oversight-article-14',
      },
    ],
    resources: [
      {
        title: 'EU AI Act Article 14 (human oversight)',
        url: 'https://artificialintelligenceact.eu/article/14/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'OWASP Top 10 for Agentic Applications',
        url: 'https://genai.owasp.org/',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['agent-identity'],
  },
  {
    id: 'mcp-security',
    title: 'MCP and agent-protocol security',
    stage: 'test-and-contain',
    kind: 'optional',
    layerN: 4,
    summary:
      'The Model Context Protocol connects agents to tools, and every connection is attack surface. Learn to secure the protocol before you let an agent act through it.',
    links: [
      { label: 'The agent shift', href: '/bok/why-now#the-agent-shift' },
      { label: 'MCP', href: '/resources/glossary#t-mcp' },
    ],
    resources: [
      {
        title: 'Model Context Protocol specification',
        url: 'https://modelcontextprotocol.io/specification',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'NSA CSI: MCP security design considerations',
        url: 'https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4496698/',
        type: 'official',
        cost: 'free',
      },
    ],
  },
  {
    id: 'incident-pipeline',
    title: 'Incident pipeline',
    stage: 'test-and-contain',
    kind: 'core',
    layerN: 4,
    summary:
      'Detection-to-report plumbing for serious incidents, including the reporting clock for high-risk systems. The evidence is captured as the incident runs, not reconstructed afterwards.',
    links: [
      {
        label: 'Pattern: incident pipeline',
        href: '/bok/patterns#pattern-incident-pipeline',
      },
      {
        label: 'Runtime monitoring and incidents',
        href: '/bok/the-role#runtime-monitoring-and-incidents',
      },
      { label: 'Serious incident', href: '/resources/glossary#t-serious-incident' },
    ],
    resources: [
      {
        title: 'EU AI Act Article 73 (serious-incident reporting)',
        url: 'https://artificialintelligenceact.eu/article/73/',
        type: 'official',
        cost: 'free',
      },
      {
        title: "California's SB 53 explained (FPF)",
        url: 'https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/',
        type: 'article',
        cost: 'free',
      },
    ],
    prereqs: ['observability-otel'],
  },

  // ── 4 Prove it and specialise ────────────────────────────────────────────
  {
    id: 'oscal-evidence',
    title: 'Machine-readable evidence (OSCAL)',
    stage: 'prove-and-specialise',
    kind: 'core',
    layerN: 5,
    summary:
      'Emit audit-ready evidence as a by-product of the build — machine-readable OSCAL component and assessment artefacts — so the audit is a query, not a project.',
    links: [
      {
        label: 'Pattern: machine-readable evidence (OSCAL)',
        href: '/bok/patterns#pattern-machine-readable-evidence-oscal',
      },
      {
        label: 'Assurance and audit evidence',
        href: '/bok/the-role#assurance-and-audit-evidence',
      },
      { label: 'OSCAL', href: '/resources/glossary#t-oscal' },
    ],
    resources: [
      {
        title: 'OSCAL (NIST)',
        url: 'https://pages.nist.gov/OSCAL/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Making AI Compliance Evidence Machine-Readable (arXiv 2604.13767)',
        url: 'https://arxiv.org/html/2604.13767v1',
        type: 'article',
        cost: 'free',
      },
      {
        title: 'NIST OSCAL learning resources',
        url: 'https://pages.nist.gov/OSCAL/learn/',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['eval-gate-ci', 'gates-admission'],
  },
  {
    id: 'logging-signing',
    title: 'Logging and signing',
    stage: 'prove-and-specialise',
    kind: 'core',
    layerN: 5,
    summary:
      'Structured, signed and tamper-evident logs are what make evidence hold up later. Signing and attestation turn a log line into something an auditor can trust.',
    links: [
      {
        label: 'Layer 05 — Assurance & Continuous Compliance',
        href: '/bok/the-stack#layer-05--assurance--continuous-compliance',
      },
      {
        label: 'EU AI Act (post-Omnibus)',
        href: '/bok/regulatory-map#eu-ai-act-post-omnibus',
      },
    ],
    resources: [
      {
        title: 'Sigstore documentation',
        url: 'https://docs.sigstore.dev/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'in-toto',
        url: 'https://in-toto.io/',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['observability-otel'],
  },
  {
    id: 'framework-crosswalk',
    title: 'Framework crosswalk',
    stage: 'prove-and-specialise',
    kind: 'core',
    summary:
      'Map one control to the many obligations it serves — an AI Act article, an ISO/IEC 42001 control, a NIST AI RMF subcategory — so an auditor can trace the control back to the obligation. Generate the crosswalk from the evidence, do not maintain it beside it.',
    links: [
      {
        label: 'Regulatory translation',
        href: '/bok/the-role#regulatory-translation',
      },
      {
        label: 'Pattern: framework crosswalk',
        href: '/bok/patterns#pattern-framework-crosswalk',
      },
      { label: 'Frameworks', href: '/resources/frameworks' },
    ],
    resources: [
      {
        title: 'ISO/IEC 42001',
        url: 'https://www.iso.org/standard/81230.html',
        type: 'official',
        cost: 'paid',
      },
      {
        title: 'NIST AI RMF Playbook',
        url: 'https://airc.nist.gov/airmf-resources/playbook/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'CSA AI Controls Matrix (AICM)',
        url: 'https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1',
        type: 'official',
        cost: 'free',
      },
    ],
    prereqs: ['law-reading'],
  },
  {
    id: 'continuous-assurance',
    title: 'Continuous assurance',
    stage: 'prove-and-specialise',
    kind: 'core',
    layerN: 5,
    summary:
      'Assurance produced continuously from telemetry, not a point-in-time attestation: control status as a live signal any lower layer writes into and an auditor reads from. This is the top of the maturity ladder.',
    links: [
      {
        label: 'Pattern: continuous assurance telemetry',
        href: '/bok/patterns#pattern-continuous-assurance-telemetry',
      },
      { label: 'The five levels', href: '/bok/maturity-model#the-five-levels' },
      {
        label: 'Continuous assurance',
        href: '/resources/glossary#t-continuous-assurance',
      },
    ],
    resources: [
      {
        title: 'CSA STAR for AI',
        url: 'https://cloudsecurityalliance.org/star/ai',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'Audit-as-code (Frontiers in AI)',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41837238/',
        type: 'article',
        cost: 'free',
      },
    ],
    prereqs: ['oscal-evidence', 'incident-pipeline'],
  },
  {
    id: 'gpai-systemic-risk',
    title: 'GPAI and systemic risk',
    stage: 'prove-and-specialise',
    kind: 'optional',
    layerN: 3,
    summary:
      'General-purpose models with systemic risk carry their own evaluation, red-teaming and incident obligations. A specialisation for anyone governing frontier or foundation models.',
    links: [
      {
        label: 'GPAI Code of Practice',
        href: '/bok/regulatory-map#gpai-code-of-practice',
      },
    ],
    resources: [
      {
        title: 'GPAI Code of Practice',
        url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'EU AI Act Article 55 (GPAI systemic risk)',
        url: 'https://artificialintelligenceact.eu/article/55/',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'MLCommons AILuminate benchmark',
        url: 'https://mlcommons.org/ailuminate/',
        type: 'tool',
        cost: 'free',
      },
    ],
  },
  {
    id: 'vendor-due-diligence',
    title: 'Vendor due diligence',
    stage: 'prove-and-specialise',
    kind: 'optional',
    layerN: 2,
    summary:
      'Most AI is procured, not built. A due-diligence gate asks a supplier for the same evidence you would produce yourself — an AIBOM, evals, a control mapping — before the system enters.',
    links: [
      {
        label: 'Pattern: vendor & model due-diligence gate',
        href: '/bok/patterns#pattern-vendor--model-due-diligence-gate',
      },
      {
        label: 'Third-party and procured AI',
        href: '/bok/the-stack#third-party-and-procured-ai',
      },
    ],
    resources: [
      {
        title: 'CSA STAR for AI',
        url: 'https://cloudsecurityalliance.org/star/ai',
        type: 'official',
        cost: 'free',
      },
      {
        title: 'IAPP AI Governance Vendor Report',
        url: 'https://iapp.org/resources/article/ai-governance-vendor-report',
        type: 'article',
        cost: 'free',
      },
    ],
  },
  {
    id: 'maturity-self-assessment',
    title: 'Maturity self-assessment',
    stage: 'prove-and-specialise',
    kind: 'core',
    summary:
      'Score where your programme sits on the ladder from paper to production, and read the next rung as concrete engineering work. A capstone that turns the path into a plan.',
    links: [
      {
        label: 'Self-assessment checklist',
        href: '/bok/maturity-model#self-assessment-checklist',
      },
      { label: 'The role', href: '/role' },
    ],
    resources: [
      {
        title: 'OWASP AI Maturity Assessment',
        url: 'https://genai.owasp.org/',
        type: 'official',
        cost: 'free',
      },
    ],
  },
  {
    id: 'minimum-viable-stack',
    title: 'The minimum viable stack',
    stage: 'prove-and-specialise',
    kind: 'core',
    summary:
      'A team of one cannot build all five layers at depth, but it can build the spine thinly, end to end. One vertical slice that touches every layer beats one layer built out and four left on paper.',
    links: [
      {
        label: 'The minimum viable stack for a team of one',
        href: '/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one',
      },
      { label: 'The stack', href: '/stack' },
    ],
    resources: [
      {
        title: 'Awesome OSCAL',
        url: 'https://github.com/oscal-club/awesome-oscal',
        type: 'tool',
        cost: 'free',
      },
    ],
    prereqs: [
      'agent-registry',
      'policy-as-code-opa',
      'eval-gate-ci',
      'kill-switch-hitl',
      'oscal-evidence',
    ],
  },
] as const;

/** The three ways in, mirroring `role.waysIn`, each pointing at where to start. */
export const entries: readonly PathEntry[] = [
  {
    id: 'legal',
    title: 'From Legal or privacy',
    startAt: ['policy-as-code-opa', 'risk-tiers-intake'],
  },
  {
    id: 'security',
    title: 'From Security or GRC',
    startAt: ['eval-harness', 'agent-registry'],
  },
  {
    id: 'mlops',
    title: 'From MLOps or ML engineering',
    startAt: ['eval-gate-ci', 'observability-otel'],
  },
] as const;

/** The nodes in a stage, in declaration order. */
export function nodesByStage(id: PathStageId): PathNode[] {
  return nodes.filter((node) => node.stage === id);
}

/** Look up the stage number (1-4) of a node id, or 0 if unknown. */
function stageOrderOf(nodeId: string): number {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return 0;
  const stage = stages.find((s) => s.id === node.stage);
  return stage ? stage.n : 0;
}

/**
 * Prerequisite edges that cross a stage boundary. Same-stage prereqs are read
 * from the grid order and never drawn, so only these ~cross-stage pairs need an
 * SVG connector. Each pair is `{ from: prereqId, to: nodeId }`.
 */
export function crossStageEdges(): { from: string; to: string }[] {
  const edges: { from: string; to: string }[] = [];
  for (const node of nodes) {
    for (const prereq of node.prereqs ?? []) {
      if (stageOrderOf(prereq) !== stageOrderOf(node.id)) {
        edges.push({ from: prereq, to: node.id });
      }
    }
  }
  return edges;
}

/** The in-page anchor for a node. */
export function nodeHref(id: string): string {
  return `/path#node-${id}`;
}
