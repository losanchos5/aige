// stack.ts: the five-layer AI governance engineering stack, faithful to
// bok/04-the-stack.md. Layer names, taglines, artefacts and "Maps to" lines are
// taken verbatim (Markdown stripped) from the chapter. Tool categories seed from
// the chapter (and SOURCES.md); Block E (2026-09-19) added further illustrative
// examples per category, each an open-source or official project verified alive
// on that date. Brands are examples of a category, never an endorsement.
//
// `chapterAnchor` is the `#slug` rehype-slug produces for each layer's H2 (see
// src/lib/md-parse.ts `slugify`); em dashes and ampersands are dropped, which
// is why some anchors carry a doubled hyphen.

export type LayerNumber = 1 | 2 | 3 | 4 | 5;
export type LayerId =
  | 'govern-as-code'
  | 'inventory'
  | 'evals'
  | 'runtime'
  | 'assurance';
export type ColorVar = '--l1' | '--l2' | '--l3' | '--l4' | '--l5';

export interface ToolCategory {
  /** Category of tool (the substance; brands are illustrative). */
  category: string;
  /** Example tools named in ch.04 or SOURCES.md — illustrative, not endorsed. */
  examples: readonly string[];
}

export interface Layer {
  /** Layer number, 1-5, in build order. */
  n: LayerNumber;
  /** Short, stable id. */
  id: LayerId;
  /** Exact layer name from the chapter. */
  name: string;
  /** ≤8-word tagline drawn from the chapter's one-line spine. */
  tagline: string;
  /** The question this layer answers, as chapter 04 states it: 02 answers
   *  "What AI is running?", 01 and 04 "What is it allowed to do?" (01 writes
   *  the bound, 04 enforces it on the live call), 03 and 05 "What evidence
   *  proves it?". The same model drives the three-questions figure and the
   *  home cards. */
  question?: string;
  /** What evidence the layer produces (the chapter's "The proof is …"). */
  proves: string;
  /** The artefacts an engineer ships in this layer. */
  artefacts: readonly string[];
  /** Reference tool categories with illustrative examples. */
  toolCategories: readonly ToolCategory[];
  /** Frameworks and articles the chapter maps this layer to. */
  mapsTo: readonly string[];
  /** True for the three layers inherited from GRC engineering (01, 02, 05),
   *  as the Thesis and chapter 04 state them. */
  inherited: boolean;
  /** The `#slug` of the layer's H2 heading, as rehype-slug produces it. */
  chapterAnchor: string;
  /** CSS custom property carrying the layer's colour. */
  colorVar: ColorVar;
}

export const layers: readonly Layer[] = [
  {
    n: 1,
    id: 'govern-as-code',
    name: 'Govern-as-Code',
    tagline: 'Write the rule as code',
    question: 'What is it allowed to do?',
    proves:
      'A policy verdict tied to a commit, a pull request or a deploy, machine-readable and reproducible.',
    artefacts: [
      'Policy-as-code library under version control',
      'Crosswalks that map each policy to the frameworks it serves',
      'CI/CD wiring that runs the policy at the right gate',
      'A structured policy verdict (allow/deny, rule id, input hash, timestamp) per evaluation',
    ],
    toolCategories: [
      { category: 'Policy engines', examples: ['OPA/Rego', 'Cedar', 'OPAL'] },
      {
        category: 'Machine-readable policy artefacts (proposed)',
        examples: ['Policy Cards', 'OWASP Agent Control Standard'],
      },
    ],
    mapsTo: [
      'EU AI Act Art. 9 (risk management)',
      'ISO/IEC 42001',
      'NIST AI RMF (Govern)',
      'CSA AICM',
      'OWASP Agentic ASI02/ASI03',
    ],
    inherited: true,
    chapterAnchor: 'layer-01-govern-as-code',
    colorVar: '--l1',
  },
  {
    n: 2,
    id: 'inventory',
    name: 'Inventory & Transparency',
    tagline: 'Inventory what is running',
    question: 'What AI is running?',
    proves:
      'A registry entry and its attached documents, ideally written by a deployment pipeline rather than typed by hand.',
    artefacts: [
      'Agent registry: the runtime-aware inventory of every model, service and agent, each with an owner, a scope and a status',
      'Transparency documents: model cards and data cards',
      'AIBOM, the bill of materials for an AI system',
      'FRIA and DPIA references linked to the registry entry',
    ],
    toolCategories: [
      {
        category: 'Registries and governance suites',
        examples: ['ServiceNow', 'Credo AI'],
      },
      { category: 'Agent-discovery tools', examples: ['Zenity'] },
      {
        category: 'AIBOM formats and generators',
        examples: [
          'CycloneDX ML-BOM',
          'SPDX 3.0 AI profile',
          'OWASP AIBOM generator',
          'AIsbom',
        ],
      },
      {
        category: 'Model and data card tooling',
        examples: ['Hugging Face model cards', 'Croissant (ML dataset metadata)'],
      },
      {
        category: 'FRIA/DPIA tooling',
        examples: ['CNIL PIA', 'Canada Algorithmic Impact Assessment'],
      },
      {
        category: 'PII detection and redaction',
        examples: ['Presidio'],
      },
    ],
    mapsTo: [
      'EU AI Act Art. 11 (technical documentation)',
      'EU AI Act Art. 49/71 (registration and the EU database)',
      'EU AI Act Art. 50 (transparency)',
      'ISO/IEC 42001',
      'NIST AI RMF (Map)',
      'CSA AICM',
      'OWASP Agentic ASI10',
    ],
    inherited: true,
    chapterAnchor: 'layer-02-inventory--transparency',
    colorVar: '--l2',
  },
  {
    n: 3,
    id: 'evals',
    name: 'Evals & Red Teaming as Evidence',
    tagline: 'Run evals as evidence',
    question: 'What evidence proves it?',
    proves:
      'A structured eval result: pass or fail against a threshold, versioned alongside the model it tested.',
    artefacts: [
      'Eval suites and the eval gate that runs them',
      'Capability and quality evals (groundedness, regression against a golden set)',
      'Adversarial and red-team evals (jailbreaks, prompt injection, tool misuse)',
      'Safety-threshold evals tied to a policy from layer 01',
    ],
    toolCategories: [
      {
        category: 'Evaluation frameworks',
        examples: ['Inspect', 'promptfoo', 'DeepEval', 'HELM'],
      },
      {
        category: 'Adversarial and vulnerability probes',
        examples: ['Garak', 'Mindgard', 'Giskard', 'PyRIT'],
      },
      {
        category: 'Safety and red-team benchmarks',
        examples: ['MLCommons AILuminate', 'HarmBench', 'JailbreakBench'],
      },
      { category: 'Retrieval-augmented quality', examples: ['Ragas'] },
    ],
    mapsTo: [
      'EU AI Act Art. 15 (accuracy, robustness, cybersecurity)',
      'EU AI Act Art. 55 (GPAI systemic-risk evaluation)',
      'ISO/IEC 42001',
      'NIST AI RMF (Measure)',
      'CSA AICM',
      'OWASP Agentic ASI01/ASI02',
    ],
    inherited: false,
    chapterAnchor: 'layer-03-evals--red-teaming-as-evidence',
    colorVar: '--l3',
  },
  {
    n: 4,
    id: 'runtime',
    name: 'Runtime Controls & Observability',
    tagline: 'Hold the line at runtime',
    question: 'What is it allowed to do?',
    proves: 'A stream of runtime decisions and traces.',
    artefacts: [
      'Guardrails: input/output filters and tool-call mediation at the enforcement point',
      'Observability: tracing and monitoring that turn agent behaviour into a control signal',
      'Agent runtime identity: a workload identity, a bounded scope and a tested kill switch per actor',
    ],
    toolCategories: [
      {
        category: 'Guardrail frameworks',
        examples: [
          'NVIDIA NeMo Guardrails',
          'Meta LlamaFirewall',
          'Lakera',
          'Guardrails AI',
          'Llama Guard',
        ],
      },
      {
        category: 'Observability',
        examples: [
          'Langfuse',
          'Arize Phoenix',
          'OpenTelemetry (GenAI semantic conventions)',
        ],
      },
      {
        category: 'MCP / tool-call security',
        examples: ['MCP Inspector', 'mcp-scan', 'mcp-context-protector'],
      },
      {
        category: 'Kill switch / circuit breaker',
        examples: [
          'Feature-flag kill switches',
          'Workload-identity revocation',
          'API-gateway circuit breakers',
        ],
      },
      {
        category: 'Agent workload identity',
        examples: ['SPIFFE/SPIRE', 'Microsoft Entra Agent ID', 'Okta Agent SSO'],
      },
    ],
    mapsTo: [
      'EU AI Act Art. 14 (human oversight)',
      'EU AI Act Art. 15 (robustness, cybersecurity)',
      'EU AI Act Art. 12 (logging)',
      'ISO/IEC 42001',
      'NIST AI RMF (Manage)',
      'CSA AICM',
      'OWASP Agentic ASI02/ASI03/ASI10',
    ],
    inherited: false,
    chapterAnchor: 'layer-04-runtime-controls--observability',
    colorVar: '--l4',
  },
  {
    n: 5,
    id: 'assurance',
    name: 'Assurance & Continuous Compliance',
    tagline: 'Close with continuous assurance',
    question: 'What evidence proves it?',
    proves:
      'A live assurance store that any of the lower layers writes into and an auditor can read from.',
    artefacts: [
      'Machine-readable evidence in a standard format (OSCAL)',
      'Framework mappings generated from the evidence, not maintained beside it',
      'Incident and reporting plumbing that meets obligations on the clock',
    ],
    toolCategories: [
      {
        category: 'Evidence format',
        examples: ['OSCAL', 'CSA AICM OSCAL bundle'],
      },
      {
        category: 'OSCAL tooling (open source)',
        examples: ['compliance-trestle', 'NIST oscal-cli', 'Lula'],
      },
      {
        category: 'GRC and AI-governance suites',
        examples: [
          'Vanta',
          'Drata',
          'OneTrust',
          'watsonx.governance',
          'Holistic AI',
          'Saidot',
        ],
      },
    ],
    mapsTo: [
      'EU AI Act Art. 17 (quality management)',
      'EU AI Act Art. 72 (post-market monitoring)',
      'EU AI Act Art. 73 (serious incident reporting)',
      'ISO/IEC 42001, ISO/IEC 42005',
      'NIST AI RMF (Govern, Manage)',
      'CSA AICM',
    ],
    inherited: true,
    chapterAnchor: 'layer-05-assurance--continuous-compliance',
    colorVar: '--l5',
  },
] as const;

export interface MinimumStackStep {
  /** The layer this step builds first, thinly. */
  layerN: LayerNumber;
  /** The step's short title. */
  title: string;
  /** What to build, in one line. */
  summary: string;
}

export interface MinimumViableStack {
  /** `#slug` of the "minimum viable stack" H2. */
  anchor: string;
  /** The chapter's framing of the thin vertical slice. */
  intro: string;
  /** The five steps, in build order (see it, rule it, test it, contain it, prove it). */
  steps: readonly MinimumStackStep[];
}

/** The chapter's "minimum viable stack for a team of one" — a thin vertical
 * slice that touches every layer, in the order: see it, rule it, test it,
 * contain it, prove it. */
export const minimumViableStack: MinimumViableStack = {
  anchor: 'the-minimum-viable-stack-for-a-team-of-one',
  intro:
    'A team of one cannot build all five layers at depth, but it can build the spine thinly, end to end: one vertical slice that touches every layer beats one layer built out and four left on paper.',
  steps: [
    {
      layerN: 2,
      title: 'Layer 02 first, minimally',
      summary:
        'A registry that a deploy writes to, with an owner and a scope per entry, so you can answer "what is running and who owns it?" from a live source.',
    },
    {
      layerN: 1,
      title: 'One policy in layer 01 with teeth',
      summary:
        'A single rule that matters (no deploy without a registered owner, or a data-residency check) as code, in the pipeline, blocking on failure.',
    },
    {
      layerN: 3,
      title: 'One eval gate in layer 03',
      summary:
        'One adversarial eval against your highest-risk agent, wired so a regression fails the build; reuse an open framework rather than writing your own harness.',
    },
    {
      layerN: 4,
      title: 'Identity and a kill switch in layer 04',
      summary:
        'Every agent under its own identity with a scope, and a tested way to stop it: the cheapest control with the largest blast-radius reduction.',
    },
    {
      layerN: 5,
      title: 'Evidence as a by-product in layer 05',
      summary:
        'Have each of the above emit a structured, timestamped record into one store; not an OSCAL pipeline yet, just a refusal to rely on screenshots.',
    },
  ],
} as const;

export interface FlattenedToolCategory {
  /** Tool category name. */
  category: string;
  /** Deduplicated example tools across every layer that uses the category. */
  examples: string[];
  /** Layer numbers in which the category appears. */
  layers: LayerNumber[];
}

/**
 * Flatten every layer's tool categories into one deduplicated list, each with
 * the layer numbers it appears in. Categories are merged by name and their
 * example tools deduplicated.
 */
export function toolsByCategory(): FlattenedToolCategory[] {
  const byCategory = new Map<string, FlattenedToolCategory>();
  for (const layer of layers) {
    for (const tool of layer.toolCategories) {
      const existing = byCategory.get(tool.category);
      if (existing) {
        for (const example of tool.examples) {
          if (!existing.examples.includes(example)) existing.examples.push(example);
        }
        if (!existing.layers.includes(layer.n)) existing.layers.push(layer.n);
      } else {
        byCategory.set(tool.category, {
          category: tool.category,
          examples: [...tool.examples],
          layers: [layer.n],
        });
      }
    }
  }
  return [...byCategory.values()];
}
