// templates.ts: the typed index of the templates-and-schemas library served
// from /schemas/ and /templates/ and listed on /resources/templates.
//
// The JSON Schemas are their own source of truth: the page reads each schema's
// title, description, x-evidences, x-layer, x-pattern and x-lifecycle-stage
// from public/schemas at build time (src/lib/schemas-library.ts), so nothing
// about a schema is repeated here. This module holds only what a schema file
// cannot: the lifecycle-stage labels, and the policy-kit files that are not
// JSON Schemas (YAML, Markdown, Rego, CSV). scripts/schemas-check.mjs checks the
// schemas, examples and templates on every build.

export type LifecycleStage =
  | 'intake'
  | 'build'
  | 'test'
  | 'release'
  | 'operate'
  | 'retire'
  | 'organisation';

/** Stage order and labels for grouping the schemas on the page. */
export const stages: readonly { id: LifecycleStage; label: string; lede: string }[] = [
  {
    id: 'intake',
    label: 'Intake and inventory',
    lede: 'Admit a use, register what runs, assess its impact, check the supplier.',
  },
  {
    id: 'build',
    label: 'Design and data',
    lede: 'Record the design decisions and let only documented data into the pipeline.',
  },
  {
    id: 'test',
    label: 'Test and evaluate',
    lede: 'Fix thresholds before testing, then file every result against the version tested.',
  },
  {
    id: 'release',
    label: 'Release and deploy',
    lede: 'Decide on evidence, tell deployers how to use it, check deployer duties.',
  },
  {
    id: 'operate',
    label: 'Operate and monitor',
    lede: 'Watch the system, keep the risk scores honest, handle incidents.',
  },
  {
    id: 'retire',
    label: 'Retire',
    lede: 'Take the system out of service without losing its history.',
  },
  {
    id: 'organisation',
    label: 'Organisation-wide',
    lede: 'The rules, the people and the evidence every system shares.',
  },
];

/** Reading order of the schemas inside each stage (a record before the ones that cite it). */
export const schemaOrder: readonly string[] = [
  'use-case-record',
  'classification-decision-record',
  'ai-system-register-entry',
  'agent-register-entry',
  'impact-assessment',
  'vendor-due-diligence-response',
  'design-record',
  'dataset-card',
  'model-card',
  'dataset-admission-record',
  'test-plan',
  'eval-result',
  'test-report',
  'go-no-go',
  'instructions-for-use',
  'deployment-decision-record',
  'post-market-monitoring-plan',
  'risk-register-entry',
  'incident-record',
  'decommissioning-runbook',
  'policy-card',
  'training-record',
  'evidence-record',
];

export interface KitFile {
  label: string;
  href: string;
}

export interface KitItem {
  /** Row anchor on the page (`kit-<id>`). */
  id: string;
  title: string;
  purpose: string;
  files: readonly KitFile[];
  evidences: readonly string[];
  /** Anchor ids of existing chapter-05 patterns (`pattern-*`). */
  patterns: readonly string[];
  layers: readonly (1 | 2 | 3 | 4 | 5)[];
}

/** The policy kit: organisation-level templates that are not JSON Schemas. */
export const kit: readonly KitItem[] = [
  {
    id: 'ai-policy',
    title: 'AI policy (YAML, prose and Rego)',
    purpose:
      'One YAML source for the AI policy, with the prose policy people approve and the Rego skeleton an engine evaluates, keyed to the same rule ids.',
    files: [
      { label: 'YAML', href: '/templates/ai-policy.yaml' },
      { label: 'Prose', href: '/templates/ai-policy.md' },
      { label: 'Rego', href: '/templates/ai-policy.rego' },
    ],
    evidences: [
      'ISO/IEC 42001 5.2',
      'ISO/IEC 42001 A.2',
      'NIST AI RMF GOVERN 1.2',
      'NIST AI RMF GOVERN 1.4',
      'EU AI Act Art. 17',
    ],
    patterns: ['pattern-policy-card', 'pattern-framework-crosswalk'],
    layers: [1],
  },
  {
    id: 'committee-charter',
    title: 'AI governance committee charter',
    purpose:
      'Authority, membership, quorum, inputs and outputs of the forum that takes the decisions the policy reserves, each decision written as a signed record.',
    files: [{ label: 'Markdown', href: '/templates/committee-charter.md' }],
    evidences: [
      'ISO/IEC 42001 5.3',
      'ISO/IEC 42001 A.3',
      'NIST AI RMF GOVERN 2.1',
      'NIST AI RMF GOVERN 2.3',
      'EU AI Act Art. 17',
    ],
    patterns: ['pattern-policy-card'],
    layers: [1],
  },
  {
    id: 'raci',
    title: 'Lifecycle RACI',
    purpose:
      'Who is responsible, accountable, consulted and informed for each lifecycle activity, with the record each activity produces.',
    files: [{ label: 'CSV', href: '/templates/raci.csv' }],
    evidences: ['ISO/IEC 42001 A.3', 'NIST AI RMF GOVERN 2.1'],
    patterns: ['pattern-policy-card'],
    layers: [1],
  },
  {
    id: 'policy-gap-assessment',
    title: 'Policy gap assessment',
    purpose:
      'A worksheet to test existing policies (privacy, security, data, IP, acceptable use, procurement, HR) against AI, with the evidence each answer needs.',
    files: [{ label: 'CSV', href: '/templates/policy-gap-assessment.csv' }],
    evidences: ['ISO/IEC 42001 A.2', 'NIST AI RMF GOVERN 1.1'],
    patterns: ['pattern-framework-crosswalk'],
    layers: [1, 5],
  },
  {
    id: 'literacy-curriculum',
    title: 'AI literacy curriculum',
    purpose:
      'Role-based modules with objectives, format, assessment, refresh cycle and the access each unlocks; completions are training records.',
    files: [{ label: 'CSV', href: '/templates/literacy-curriculum.csv' }],
    evidences: [
      'EU AI Act Art. 4',
      'ISO/IEC 42001 7.2',
      'ISO/IEC 42001 7.3',
      'NIST AI RMF GOVERN 2.2',
    ],
    patterns: ['pattern-human-in-the-loop-gate'],
    layers: [1],
  },
  {
    id: 'contract-clause-checklist',
    title: 'AI contract clause checklist',
    purpose:
      'The terms an AI supply contract should settle, each tied to its obligation and to the due-diligence field it closes. What to secure, not clause wording.',
    files: [{ label: 'Markdown', href: '/templates/contract-clause-checklist.md' }],
    evidences: [
      'EU AI Act Art. 25',
      'GDPR Art. 28',
      'ISO/IEC 42001 A.10',
      'NIST AI RMF GOVERN 6.1',
    ],
    patterns: ['pattern-vendor--model-due-diligence-gate'],
    layers: [2, 5],
  },
];
