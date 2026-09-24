// stack.ts: the five-layer AI governance engineering stack, faithful to
// bok/04-the-stack.md. Layer names, taglines, artefacts and "Maps to" lines are
// taken verbatim (Markdown stripped) from the chapter.
//
// The tool catalogue (`toolCatalogue`) is the single source for every tool the
// site names: the per-layer `toolCategories` below, the /stack table, the map
// and /resources/tools are all derived from it. Categories seed from chapter 04
// and, since v0.5.0, from the chapters that cite them (14 governing
// development, 15 governing deployment, 16 fairness and explainability) and the
// learning path. Every tool carries its URL, licence, access model, layers and
// the date it was last checked (2026-09-24: URL answered, licence read from the
// repository or the vendor, OECD.AI Catalogue of Tools & Metrics entry linked
// where one exists). Brands are examples of a category, never an endorsement.
//
// `chapterAnchor` is the `#slug` rehype-slug produces for each layer's H2 (see
// src/lib/md-parse.ts `slugify`); em dashes and ampersands are dropped, which
// is why some anchors carry a doubled hyphen.
//
// This module is PURE (no runtime imports): scripts/figures-build.mjs and
// scripts/map-build.mjs transpile and load it directly.

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
  /** Example tool names, derived from `toolCatalogue`: illustrative, not endorsed. */
  examples: readonly string[];
}

/**
 * How a tool is licensed or offered, the key of the licence filter:
 * - `open-source`: code under an OSI-approved licence;
 * - `open-standard`: an open specification, format or framework text;
 * - `source-available`: source or weights published under a non-OSI licence
 *   (Business Source, Elastic, Llama community licences);
 * - `commercial`: a proprietary product;
 * - `free-service`: a hosted service offered at no cost, source not published.
 */
export type ToolAccess =
  | 'open-source'
  | 'open-standard'
  | 'source-available'
  | 'commercial'
  | 'free-service';

/** Display labels for the access models, in filter order. */
export const toolAccessLabels: Readonly<Record<ToolAccess, string>> = {
  'open-source': 'Open source',
  'open-standard': 'Open standard',
  'source-available': 'Source-available',
  commercial: 'Commercial',
  'free-service': 'Free service',
};

/** The date every tool below was last checked. */
export const TOOLS_LAST_CHECKED = '2026-09-24';

export interface Tool {
  /** The tool's name as the site shows it. */
  name: string;
  /** Home page, repository or official documentation (https, checked). */
  url: string;
  /** SPDX identifier where one exists; "Proprietary" for commercial products. */
  licence: string;
  /** Licence or offering model; the key of the licence filter. */
  access: ToolAccess;
  /** Stack layers the tool serves; defaults to its category's layers. */
  layers?: readonly LayerNumber[];
  /** OECD.AI Catalogue of Tools & Metrics entry, where one exists. */
  oecd?: string;
  /** One short clarification (a rename, a split licence). */
  note?: string;
  /** Last check of the URL and licence (YYYY-MM-DD). */
  lastChecked: string;
}

export interface ToolCategoryDef {
  /** Stable id, used for the category's anchor on /resources/tools. */
  id: string;
  /** Category name (the substance). */
  category: string;
  /** Layers whose panel lists this category; empty for cross-layer indexes. */
  layers: readonly LayerNumber[];
  /** One line: what the category does for governance. */
  summary: string;
  /** The Body of Knowledge section that treats the category. */
  chapter: { href: string; label: string };
  /** Illustrative tools, in display order. */
  tools: readonly Tool[];
}

const C = TOOLS_LAST_CHECKED;
const OECD = (slug: string) => `https://oecd.ai/en/catalogue/tools/${slug}`;
const STACK = (anchor: string) => `/bok/the-stack#${anchor}`;

/**
 * The tool catalogue: every category, in stack order, each with its
 * illustrative tools. Tools are examples of a category, not endorsements, and
 * the list is neither exhaustive nor a shortlist.
 */
export const toolCatalogue: readonly ToolCategoryDef[] = [
  // ── Layer 01: Govern-as-Code ────────────────────────────────────────────
  {
    id: 'policy-engines',
    category: 'Policy engines',
    layers: [1],
    summary:
      'Evaluate a rule written as code against an input and return a structured allow or deny verdict.',
    chapter: { href: STACK('layer-01-govern-as-code'), label: 'Chapter 04, layer 01' },
    tools: [
      {
        name: 'OPA/Rego',
        url: 'https://www.openpolicyagent.org/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Cedar',
        url: 'https://cedarpolicy.com/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'OPAL',
        url: 'https://opal.ac/',
        licence: 'Apache-2.0',
        access: 'open-source',
        note: 'Keeps policy engines in sync with policy and data sources.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'policy-testing',
    category: 'Policy testing and authoring',
    layers: [1],
    summary:
      'Write and test policies before they gate anything: unit tests for rules, run in CI against configuration files.',
    chapter: { href: STACK('layer-01-govern-as-code'), label: 'Chapter 04, layer 01' },
    tools: [
      {
        name: 'Conftest',
        url: 'https://www.conftest.dev/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'The Rego Playground',
        url: 'https://play.openpolicyagent.org/',
        licence: 'Free hosted service',
        access: 'free-service',
        note: 'Hosted at openpolicyagent.org.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'admission-control',
    category: 'Admission control',
    layers: [1],
    summary:
      'Enforce policy at the moment a workload is admitted to a cluster, so an unregistered or unsigned deployment never starts.',
    chapter: { href: STACK('layer-01-govern-as-code'), label: 'Chapter 04, layer 01' },
    tools: [
      {
        name: 'OPA Gatekeeper',
        url: 'https://open-policy-agent.github.io/gatekeeper/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Kyverno',
        url: 'https://kyverno.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'policy-artefacts',
    category: 'Machine-readable policy artefacts (proposed)',
    layers: [1],
    summary:
      "Proposed formats that state an agent's rules as data an enforcement point and an auditor can both read.",
    chapter: { href: STACK('layer-01-govern-as-code'), label: 'Chapter 04, layer 01' },
    tools: [
      {
        name: 'Policy Cards',
        url: 'https://arxiv.org/abs/2510.24383',
        licence: 'CC-BY-4.0',
        access: 'open-standard',
        note: 'A research proposal (arXiv 2510.24383).',
        lastChecked: C,
      },
      {
        name: 'OWASP Agent Control Standard',
        url: 'https://genai.owasp.org/resource/agent-control-standard-acs/',
        licence: 'CC-BY-SA-4.0',
        access: 'open-standard',
        lastChecked: C,
      },
    ],
  },

  // ── Layer 02: Inventory & Transparency ──────────────────────────────────
  {
    id: 'registries',
    category: 'Registries and governance suites',
    layers: [2],
    summary: 'Hold the inventory of AI systems with an owner, a scope and a status per entry.',
    chapter: { href: STACK('layer-02-inventory--transparency'), label: 'Chapter 04, layer 02' },
    tools: [
      {
        name: 'ServiceNow',
        url: 'https://www.servicenow.com/products/ai-control-tower.html',
        licence: 'Proprietary',
        access: 'commercial',
        note: 'AI Control Tower product page.',
        lastChecked: C,
      },
      {
        name: 'Credo AI',
        url: 'https://www.credo.ai/',
        licence: 'Proprietary',
        access: 'commercial',
        oecd: OECD('credo-ai-responsible-ai-governance-platform'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'agent-discovery',
    category: 'Agent-discovery tools',
    layers: [2],
    summary:
      'Find the agents and AI features already running, including the ones nobody registered.',
    chapter: { href: STACK('layer-02-inventory--transparency'), label: 'Chapter 04, layer 02' },
    tools: [
      {
        name: 'Zenity',
        url: 'https://zenity.io/',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'aibom',
    category: 'AIBOM formats and generators',
    layers: [2],
    summary:
      'Record the models, datasets, weights and dependencies of an AI system as a machine-readable bill of materials.',
    chapter: { href: STACK('layer-02-inventory--transparency'), label: 'Chapter 04, layer 02' },
    tools: [
      {
        name: 'CycloneDX ML-BOM',
        url: 'https://cyclonedx.org/capabilities/mlbom/',
        licence: 'Apache-2.0',
        access: 'open-standard',
        lastChecked: C,
      },
      {
        name: 'SPDX 3.0 AI profile',
        url: 'https://spdx.github.io/spdx-spec/v3.0.1/model/AI/AI/',
        licence: 'Community-Spec-1.0',
        access: 'open-standard',
        lastChecked: C,
      },
      {
        name: 'OWASP AIBOM generator',
        url: 'https://github.com/GenAI-Security-Project/aibom-generator',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'AIsbom',
        url: 'https://aisbom.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'cards',
    category: 'Model and data card tooling',
    layers: [2],
    summary:
      'Write the transparency documents (model cards, dataset cards) as structured metadata beside the artefact.',
    chapter: {
      href: '/bok/governing-development#model-cards-system-cards-and-datasheets',
      label: 'Chapter 14, model cards and datasheets',
    },
    tools: [
      {
        name: 'Hugging Face model cards',
        url: 'https://huggingface.co/docs/hub/model-cards',
        licence: 'Apache-2.0',
        access: 'open-source',
        oecd: OECD('model-cards'),
        note: 'Card tooling ships in the huggingface_hub library.',
        lastChecked: C,
      },
      {
        name: 'Croissant (ML dataset metadata)',
        url: 'https://mlcommons.org/working-groups/data/croissant/',
        licence: 'Apache-2.0',
        access: 'open-standard',
        oecd: OECD('croissant'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'impact-assessment',
    category: 'FRIA/DPIA tooling',
    layers: [2],
    summary:
      'Run a structured impact assessment and keep its result linked to the registry entry it concerns.',
    chapter: {
      href: '/bok/governing-development#impact-assessments-compared',
      label: 'Chapter 14, impact assessments',
    },
    tools: [
      {
        name: 'CNIL PIA',
        url: 'https://www.cnil.fr/en/open-source-pia-software-helps-carry-out-data-protection-impact-assessment',
        licence: 'GPL-3.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Canada Algorithmic Impact Assessment',
        url: 'https://canada-ca.github.io/aia-eia-js/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('algorithmic-impact-assessment-tool'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'pii',
    category: 'PII detection and redaction',
    layers: [2],
    summary:
      'Find and mask personal data in text, images and tables before it enters a prompt, a log or a training set.',
    chapter: { href: '/bok/privacy-and-ai', label: 'Chapter 19, privacy and AI' },
    tools: [
      {
        name: 'Presidio',
        url: 'https://github.com/data-privacy-stack/presidio',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('presidio'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'versioning',
    category: 'Data and experiment versioning',
    layers: [2],
    summary:
      'Version the data, code, parameters and lineage behind each model so a result can be reproduced and traced back.',
    chapter: {
      href: '/bok/governing-development#reproducibility-and-linked-versioning',
      label: 'Chapter 14, linked versioning',
    },
    tools: [
      {
        name: 'DVC',
        url: 'https://dvc.org/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'MLflow',
        url: 'https://mlflow.org/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'lakeFS',
        url: 'https://lakefs.io/',
        licence: 'BUSL-1.1',
        access: 'source-available',
        lastChecked: C,
      },
      {
        name: 'OpenLineage',
        url: 'https://openlineage.io/',
        licence: 'Apache-2.0',
        access: 'open-standard',
        note: 'An open standard for lineage events.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'signing',
    category: 'Model signing and artefact scanning',
    layers: [2],
    summary:
      'Sign model artefacts, attest how they were built and scan them for unsafe serialisation before they load.',
    chapter: {
      href: '/bok/governing-development#reproducibility-and-linked-versioning',
      label: 'Chapter 14, linked versioning',
    },
    tools: [
      {
        name: 'Sigstore (cosign)',
        url: 'https://www.sigstore.dev/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'OpenSSF model signing (model-transparency)',
        url: 'https://github.com/sigstore/model-transparency',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'in-toto',
        url: 'https://in-toto.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'SLSA',
        url: 'https://slsa.dev/',
        licence: 'Community-Spec-1.0',
        access: 'open-standard',
        note: 'A framework of supply-chain provenance levels.',
        lastChecked: C,
      },
      {
        name: 'ModelScan',
        url: 'https://github.com/protectai/modelscan',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'picklescan',
        url: 'https://github.com/mmaitre314/picklescan',
        licence: 'MIT',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },

  // ── Layer 03: Evals & Red Teaming as Evidence ───────────────────────────
  {
    id: 'eval-frameworks',
    category: 'Evaluation frameworks',
    layers: [3],
    summary: 'Run evals as code, versioned with the model, so a regression can fail the build.',
    chapter: {
      href: STACK('layer-03-evals--red-teaming-as-evidence'),
      label: 'Chapter 04, layer 03',
    },
    tools: [
      {
        name: 'Inspect',
        url: 'https://inspect.aisi.org.uk/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('inspect'),
        lastChecked: C,
      },
      {
        name: 'promptfoo',
        url: 'https://www.promptfoo.dev/',
        licence: 'MIT',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'DeepEval',
        url: 'https://deepeval.com/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'HELM',
        url: 'https://crfm.stanford.edu/helm/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'probes',
    category: 'Adversarial and vulnerability probes',
    layers: [3],
    summary:
      'Probe a model or an agent for jailbreaks, prompt injection and tool misuse as repeatable tests.',
    chapter: {
      href: STACK('layer-03-evals--red-teaming-as-evidence'),
      label: 'Chapter 04, layer 03',
    },
    tools: [
      {
        name: 'Garak',
        url: 'https://github.com/NVIDIA/garak',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Mindgard',
        url: 'https://mindgard.ai/',
        licence: 'Proprietary',
        access: 'commercial',
        oecd: OECD('mindgard'),
        lastChecked: C,
      },
      {
        name: 'Giskard',
        url: 'https://github.com/Giskard-AI/giskard-oss',
        licence: 'Apache-2.0',
        access: 'open-source',
        oecd: OECD('giskard'),
        lastChecked: C,
      },
      {
        name: 'PyRIT',
        url: 'https://github.com/microsoft/PyRIT',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('pyrit'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'benchmarks',
    category: 'Safety and red-team benchmarks',
    layers: [3],
    summary:
      "Shared test sets and harnesses that make one model's safety result comparable with another's.",
    chapter: {
      href: STACK('layer-03-evals--red-teaming-as-evidence'),
      label: 'Chapter 04, layer 03',
    },
    tools: [
      {
        name: 'MLCommons AILuminate',
        url: 'https://mlcommons.org/ailuminate/',
        licence: 'Apache-2.0',
        access: 'open-source',
        note: 'The public repository is published under Apache-2.0.',
        lastChecked: C,
      },
      {
        name: 'HarmBench',
        url: 'https://www.harmbench.org/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('harmbench'),
        lastChecked: C,
      },
      {
        name: 'JailbreakBench',
        url: 'https://jailbreakbench.github.io/',
        licence: 'MIT',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'rag-quality',
    category: 'Retrieval-augmented quality',
    layers: [3],
    summary:
      'Score a retrieval-augmented system on grounding and relevance, not only on fluent answers.',
    chapter: {
      href: STACK('layer-03-evals--red-teaming-as-evidence'),
      label: 'Chapter 04, layer 03',
    },
    tools: [
      {
        name: 'Ragas',
        url: 'https://docs.ragas.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'data-validation',
    category: 'Data validation and quality',
    layers: [3],
    summary:
      'Test a dataset against declared expectations (schema, ranges, completeness, distributions) and fail the pipeline when it breaks them.',
    chapter: {
      href: '/bok/governing-development#quality-quantity-representativeness-and-fitness-for-purpose',
      label: 'Chapter 14, data quality',
    },
    tools: [
      {
        name: 'Great Expectations',
        url: 'https://greatexpectations.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Deequ',
        url: 'https://github.com/awslabs/deequ',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'pandera',
        url: 'https://pandera.readthedocs.io/',
        licence: 'MIT',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'TensorFlow Data Validation',
        url: 'https://www.tensorflow.org/tfx/guide/tfdv',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Deepchecks',
        url: 'https://github.com/deepchecks/deepchecks',
        licence: 'AGPL-3.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'fairness',
    category: 'Fairness toolkits',
    layers: [3],
    summary:
      'Compute disparity metrics across groups and apply mitigation before, during or after training.',
    chapter: {
      href: '/bok/fairness-and-explainability#group-fairness-metrics',
      label: 'Chapter 16, group fairness metrics',
    },
    tools: [
      {
        name: 'Fairlearn',
        url: 'https://fairlearn.org/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('fairlearn'),
        lastChecked: C,
      },
      {
        name: 'AI Fairness 360',
        url: 'https://github.com/Trusted-AI/AIF360',
        licence: 'Apache-2.0',
        access: 'open-source',
        oecd: OECD('ai-fairness-360-aif360'),
        lastChecked: C,
      },
      {
        name: 'Aequitas',
        url: 'https://github.com/dssg/aequitas',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('aequitasbias-and-fairness-audit-toolkit'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'explainability',
    category: 'Explainability libraries',
    layers: [3],
    summary:
      'Produce feature attributions, surrogate models and counterfactuals, then test that the explanation is faithful.',
    chapter: {
      href: '/bok/fairness-and-explainability#explanation-techniques',
      label: 'Chapter 16, explanation techniques',
    },
    tools: [
      {
        name: 'SHAP',
        url: 'https://shap.readthedocs.io/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('shap'),
        lastChecked: C,
      },
      {
        name: 'LIME',
        url: 'https://github.com/marcotcr/lime',
        licence: 'BSD-2-Clause',
        access: 'open-source',
        oecd: OECD('lime'),
        lastChecked: C,
      },
      {
        name: 'Captum',
        url: 'https://captum.ai/',
        licence: 'BSD-3-Clause',
        access: 'open-source',
        oecd: OECD('captum'),
        lastChecked: C,
      },
      {
        name: 'InterpretML',
        url: 'https://interpret.ml/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('interpretml'),
        lastChecked: C,
      },
      {
        name: 'DiCE',
        url: 'https://interpret.ml/DiCE/',
        licence: 'MIT',
        access: 'open-source',
        note: 'Counterfactual explanations.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'practice',
    category: 'Practice grounds',
    layers: [3],
    summary:
      'Hands-on challenges for learning how prompt injection works before testing your own system.',
    chapter: {
      href: STACK('layer-03-evals--red-teaming-as-evidence'),
      label: 'Chapter 04, layer 03',
    },
    tools: [
      {
        name: 'Gandalf (Lakera)',
        url: 'https://gandalf.lakera.ai/',
        licence: 'Proprietary',
        access: 'free-service',
        note: "Redirects to Lakera's challenge hub (as of 2026-09-24).",
        lastChecked: C,
      },
    ],
  },

  // ── Layer 04: Runtime Controls & Observability ──────────────────────────
  {
    id: 'guardrails',
    category: 'Guardrail frameworks',
    layers: [4],
    summary:
      'Filter inputs and outputs and mediate tool calls at the enforcement point, on the live call.',
    chapter: {
      href: STACK('layer-04-runtime-controls--observability'),
      label: 'Chapter 04, layer 04',
    },
    tools: [
      {
        name: 'NVIDIA NeMo Guardrails',
        url: 'https://github.com/NVIDIA-NeMo/Guardrails',
        licence: 'Apache-2.0',
        access: 'open-source',
        oecd: OECD('nvidia-nemoguardrails'),
        lastChecked: C,
      },
      {
        name: 'Meta LlamaFirewall',
        url: 'https://meta-llama.github.io/PurpleLlama/LlamaFirewall/',
        licence: 'MIT',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Lakera',
        url: 'https://www.lakera.ai/',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
      {
        name: 'Guardrails AI',
        url: 'https://www.guardrailsai.com/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Llama Guard',
        url: 'https://huggingface.co/meta-llama/Llama-Guard-4-12B',
        licence: 'Llama 4 Community License',
        access: 'source-available',
        note: 'Open weights under a custom licence.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'observability',
    category: 'Observability',
    layers: [4],
    summary:
      'Trace every model and tool call so agent behaviour becomes a control signal and a record.',
    chapter: {
      href: STACK('layer-04-runtime-controls--observability'),
      label: 'Chapter 04, layer 04',
    },
    tools: [
      {
        name: 'Langfuse',
        url: 'https://langfuse.com/',
        licence: 'MIT',
        access: 'open-source',
        oecd: OECD('langfuse'),
        note: 'Core under MIT; enterprise directories under a commercial licence.',
        lastChecked: C,
      },
      {
        name: 'Arize Phoenix',
        url: 'https://arize.com/phoenix/',
        licence: 'Elastic-2.0',
        access: 'source-available',
        lastChecked: C,
      },
      {
        name: 'OpenTelemetry (GenAI semantic conventions)',
        url: 'https://opentelemetry.io/docs/specs/semconv/gen-ai/',
        licence: 'Apache-2.0',
        access: 'open-standard',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'monitoring',
    category: 'ML and LLM monitoring and drift',
    layers: [4],
    summary:
      'Watch inputs, outputs and performance in production and raise a signal when they drift from what was approved.',
    chapter: {
      href: '/bok/governing-deployment#drift-what-moves-and-how-to-see-it',
      label: 'Chapter 15, drift',
    },
    tools: [
      {
        name: 'Evidently',
        url: 'https://www.evidentlyai.com/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'NannyML',
        url: 'https://www.nannyml.com/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Alibi Detect',
        url: 'https://github.com/SeldonIO/alibi-detect',
        licence: 'BUSL-1.1',
        access: 'source-available',
        oecd: OECD('alibi-detect'),
        lastChecked: C,
      },
    ],
  },
  {
    id: 'mcp-security',
    category: 'MCP / tool-call security',
    layers: [4],
    summary:
      'Inspect and scan the servers and tools an agent connects to, and guard what flows back into its context.',
    chapter: {
      href: STACK('layer-04-runtime-controls--observability'),
      label: 'Chapter 04, layer 04',
    },
    tools: [
      {
        name: 'MCP Inspector',
        url: 'https://github.com/modelcontextprotocol/inspector',
        licence: 'MIT / Apache-2.0',
        access: 'open-source',
        note: 'The MCP project is moving its code from MIT to Apache-2.0.',
        lastChecked: C,
      },
      {
        name: 'Snyk Agent Scan',
        url: 'https://github.com/snyk/agent-scan',
        licence: 'Apache-2.0',
        access: 'open-source',
        note: 'Formerly mcp-scan (Invariant Labs); the old repository redirects here.',
        lastChecked: C,
      },
      {
        name: 'mcp-context-protector',
        url: 'https://github.com/trailofbits/mcp-context-protector',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'progressive-delivery',
    category: 'Progressive delivery and feature flags',
    layers: [4],
    summary:
      'Expose a change to a small share of traffic first and roll it back automatically when a guard metric fails.',
    chapter: {
      href: '/bok/governing-deployment#progressive-delivery-as-a-control',
      label: 'Chapter 15, progressive delivery',
    },
    tools: [
      {
        name: 'Argo Rollouts',
        url: 'https://argoproj.github.io/rollouts/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Flagger',
        url: 'https://flagger.app/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'OpenFeature',
        url: 'https://openfeature.dev/',
        licence: 'Apache-2.0',
        access: 'open-standard',
        note: 'A vendor-neutral feature-flag API.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'kill-switch',
    category: 'Kill switch / circuit breaker',
    layers: [4],
    summary:
      'Stop one agent or one feature quickly and safely, without taking the rest of the system down.',
    chapter: {
      href: STACK('layer-04-runtime-controls--observability'),
      label: 'Chapter 04, layer 04',
    },
    tools: [
      {
        name: 'Unleash',
        url: 'https://www.getunleash.io/',
        licence: 'AGPL-3.0',
        access: 'open-source',
        note: 'Feature flags, including kill-switch flags.',
        lastChecked: C,
      },
      {
        name: 'Envoy',
        url: 'https://www.envoyproxy.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        note: 'Gateway-level circuit breaking.',
        lastChecked: C,
      },
      {
        name: 'Resilience4j',
        url: 'https://resilience4j.readme.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        note: 'In-process circuit breakers.',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'agent-identity',
    category: 'Agent workload identity',
    layers: [4],
    summary:
      'Give each agent its own workload identity and scope, so its access can be bounded, logged and revoked.',
    chapter: {
      href: STACK('layer-04-runtime-controls--observability'),
      label: 'Chapter 04, layer 04',
    },
    tools: [
      {
        name: 'SPIFFE/SPIRE',
        url: 'https://spiffe.io/',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Microsoft Entra Agent ID',
        url: 'https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
      {
        name: 'Okta Agent SSO',
        url: 'https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/',
        licence: 'Proprietary',
        access: 'commercial',
        note: 'Launch announcement.',
        lastChecked: C,
      },
    ],
  },

  // ── Layer 05: Assurance & Continuous Compliance ─────────────────────────
  {
    id: 'evidence-format',
    category: 'Evidence format',
    layers: [5],
    summary:
      'State controls, implementations and assessment results in one machine-readable format an auditor can query.',
    chapter: {
      href: STACK('layer-05-assurance--continuous-compliance'),
      label: 'Chapter 04, layer 05',
    },
    tools: [
      {
        name: 'OSCAL',
        url: 'https://pages.nist.gov/OSCAL/',
        licence: 'Public domain (NIST)',
        access: 'open-standard',
        lastChecked: C,
      },
      {
        name: 'CSA AICM OSCAL bundle',
        url: 'https://cloudsecurityalliance.org/artifacts/aicm-machine-readable-bundle-json-yaml-oscal',
        licence: 'CSA licence terms',
        access: 'open-standard',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'oscal-tooling',
    category: 'OSCAL tooling (open source)',
    layers: [5],
    summary:
      'Author, validate, convert and resolve OSCAL content in a pipeline instead of by hand.',
    chapter: {
      href: STACK('layer-05-assurance--continuous-compliance'),
      label: 'Chapter 04, layer 05',
    },
    tools: [
      {
        name: 'compliance-trestle',
        url: 'https://github.com/oscal-compass/compliance-trestle',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'NIST oscal-cli',
        url: 'https://github.com/usnistgov/oscal-cli',
        licence: 'Public domain (NIST)',
        access: 'open-source',
        lastChecked: C,
      },
      {
        name: 'Lula',
        url: 'https://github.com/defenseunicorns/lula',
        licence: 'Apache-2.0',
        access: 'open-source',
        lastChecked: C,
      },
    ],
  },
  {
    id: 'grc-suites',
    category: 'GRC and AI-governance suites',
    layers: [5],
    summary:
      'Aggregate evidence from the lower layers and present it against frameworks for review.',
    chapter: {
      href: STACK('layer-05-assurance--continuous-compliance'),
      label: 'Chapter 04, layer 05',
    },
    tools: [
      {
        name: 'Vanta',
        url: 'https://www.vanta.com/',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
      {
        name: 'Drata',
        url: 'https://drata.com/',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
      {
        name: 'OneTrust',
        url: 'https://www.onetrust.com/',
        licence: 'Proprietary',
        access: 'commercial',
        oecd: OECD('onetrust-ai-governance'),
        lastChecked: C,
      },
      {
        name: 'watsonx.governance',
        url: 'https://www.ibm.com/products/watsonx-governance',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
      {
        name: 'Holistic AI',
        url: 'https://www.holisticai.com/',
        licence: 'Proprietary',
        access: 'commercial',
        lastChecked: C,
      },
      {
        name: 'Saidot',
        url: 'https://www.saidot.ai/',
        licence: 'Proprietary',
        access: 'commercial',
        oecd: OECD('saidot'),
        lastChecked: C,
      },
    ],
  },

  // ── Across the layers ───────────────────────────────────────────────────
  {
    id: 'indexes',
    category: 'Curated indexes',
    layers: [],
    summary:
      'Maintained lists that go wider than this catalogue; start here when a category needs more options.',
    chapter: { href: '/bok/reading-list', label: 'Chapter 10, reading list' },
    tools: [
      {
        name: 'Awesome Responsible AI',
        url: 'https://github.com/AthenaCore/AwesomeResponsibleAI',
        licence: 'MIT',
        access: 'open-source',
        layers: [1, 2, 3, 4, 5],
        lastChecked: C,
      },
      {
        name: 'Awesome Production Machine Learning',
        url: 'https://github.com/EthicalML/awesome-production-machine-learning',
        licence: 'MIT',
        access: 'open-source',
        layers: [2, 4],
        lastChecked: C,
      },
      {
        name: 'awesome-opa',
        url: 'https://github.com/open-policy-agent/awesome-opa',
        licence: 'CC0-1.0',
        access: 'open-source',
        layers: [1],
        lastChecked: C,
      },
      {
        name: 'awesome-ml-security',
        url: 'https://github.com/trailofbits/awesome-ml-security',
        licence: 'CC-BY-4.0',
        access: 'open-source',
        layers: [3, 4],
        lastChecked: C,
      },
      {
        name: 'Awesome OSCAL',
        url: 'https://github.com/oscal-club/awesome-oscal',
        licence: 'CC0-1.0',
        access: 'open-source',
        layers: [5],
        lastChecked: C,
      },
    ],
  },
];

/** A tool's effective layers: its own, or its category's. */
export function toolLayers(tool: Tool, category: ToolCategoryDef): readonly LayerNumber[] {
  return tool.layers ?? category.layers;
}

/** The categories a layer's panel lists, with their tool names, in catalogue order. */
function categoriesForLayer(n: LayerNumber): ToolCategory[] {
  return toolCatalogue
    .filter((def) => def.layers.includes(n))
    .map((def) => ({ category: def.category, examples: def.tools.map((tool) => tool.name) }));
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
    toolCategories: categoriesForLayer(1),
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
    toolCategories: categoriesForLayer(2),
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
    toolCategories: categoriesForLayer(3),
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
    toolCategories: categoriesForLayer(4),
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
    toolCategories: categoriesForLayer(5),
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

/** The chapter's "minimum viable stack for a team of one": a thin vertical
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

/** Look a tool up by its display name (the first match in catalogue order). */
export function findTool(name: string): Tool | undefined {
  for (const def of toolCatalogue) {
    const tool = def.tools.find((entry) => entry.name === name);
    if (tool) return tool;
  }
  return undefined;
}

/** Every tool in the catalogue, flattened, with its category and effective layers. */
export function allTools(): { tool: Tool; category: ToolCategoryDef; layers: readonly LayerNumber[] }[] {
  return toolCatalogue.flatMap((category) =>
    category.tools.map((tool) => ({ tool, category, layers: toolLayers(tool, category) })),
  );
}
