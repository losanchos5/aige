// controls/deployment-and-monitoring.ts: the Deployment and Monitoring Control
// Profile, v0.1 (draft). Fifteen reference controls, AIGE-CTL-DEPLOY-001 to
// 015, for AI systems from the decision to use them to the day they are
// retired: the deployment decision, the go-live review, staged rollout,
// oversight, monitoring, incidents, discovery, the sanctioned gateway,
// deactivation and retirement. Each control is `derived`: it restates material
// the site already publishes and adds nothing that material does not say.
//
//   derivedFrom -> the patterns (bok/patterns/<slug>.md) and record schemas
//                  (public/schemas/<id>.v1.json) a control restates, plus the
//                  chapter it comes from (15 governing-deployment, 16
//                  fairness-and-explainability, 17 incidents)
//   objective   -> the pattern's solution, the schema's required fields or the
//                  chapter's rule, restated as an outcome
//   evidence    -> the record schema the source names (schemaId), where it
//                  names one
//   mappings    -> only ids the source material already cites: obligations
//                  from ../frameworks.ts, ISO/IEC 42001 Annex A ids from
//                  ../threats.ts, NIST AI RMF subcategories whose official text
//                  plainly matches (../nist-ai-rmf.ts), OWASP rows the pattern
//                  maps to
//   references  -> rows the site already cites: chapter and pattern pages,
//                  EUR-Lex article rows of chapters 15 to 17, the threat bridge
//                  rows (OWASP, ISO/IEC 42001) and the NIST AI RMF
//
// AIUC-1 ids (mappings.aiuc1) are a cross-reference, not a derivation: an id is
// set only where the requirement text, read on its public page on 2026-09-26,
// plainly covers the control's objective (E010 acceptable use policy, E015 log
// AI system activity); no affiliation with AIUC.
//
// Layer (../stack.ts): 2 inventory for the decision record, the instructions
// for use, change re-assessment and discovery; 5 assurance for the go-live
// record, log retention and incident reporting; 4 runtime for the rest.
// No verification procedure: the source material states what each control
// produces, not how a third party checks it, so every control is a draft that
// needs technical review and says so in its open questions. Controls that the
// Agent Runtime profile already covers for agents (checkpoints, kill switch,
// prompt change control) are not repeated; where a control here also applies
// to agents, its scope says so.
//
// Draft control specifications, open for technical review; illustrative, not a
// claim of conformity, not legal advice. Types and rules: ./index.ts.
import type { Control, ControlProfile, ObservationExample } from './index';
import type { Source } from '../../lib/sources';
import { threatSources, SRC } from '../threats';
import { getPatternBySlug } from '../patterns';
import { site } from '../site';
import { AIUC1_REQUIREMENTS } from './evaluation-environment';
import { AI_ACT_ART4A } from './data-admission-and-privacy';

const PROFILE = 'deployment-and-monitoring';

export const deploymentAndMonitoringProfile: ControlProfile = {
  slug: PROFILE,
  title: 'Deployment and Monitoring Control Profile',
  shortTitle: 'Deployment and monitoring',
  version: '0.1',
  status: 'draft',
  reviewerStatus: 'open',
  summary:
    'Reference controls for AI systems in use, from the deployment decision and the go-live review to staged rollout, monitoring, incident reporting, deactivation and retirement. Every control is a draft derived from the site\'s patterns, record schemas and chapters 15 to 17, open for technical review.',
  scope:
    'AI systems an organisation puts to use, built or procured, from the decision to use them to the day they are retired, including staff use of AI tools and AI running outside the registry. How the system is built and evaluated before release, and the runtime controls specific to agents, are covered by other profiles.',
  published: '2026-09-26',
  updated: '2026-09-26',
  authors: ['jorge-garcia-aibar'],
  reviewers: [],
  changelog: [
    {
      version: '0.1',
      date: '2026-09-26',
      note: 'First draft: 15 controls derived from the patterns Staged Rollout with Rollback Criteria, Human-in-the-loop Gate, Shadow-AI Discovery, Sanctioned AI Gateway, Drift & Fairness Monitor, Incident Pipeline and the Deactivation, Localisation & Retirement Runbook, the deployment, monitoring, incident and retirement record schemas, and chapters 15 to 17; open for technical review.',
    },
  ],
  issueTemplate: 'control-review.yml',
};

/** No control of this profile is specified yet, so it has no example observations. */
export const observationExamples: readonly ObservationExample[] = [];

// ---------------------------------------------------------------------------
// References. The Body of Knowledge first (chapter sections, pattern pages),
// then rows already verified elsewhere on the site (sources/SOURCES.md
// chapters 15 to 17, ../threats.ts threatSources), reused with the same URL;
// the Art. 4a row is the data profile's own Source object.

/** A section of a Body of Knowledge chapter, as a numbered reference. */
function chapter(slug: string, number: string, title: string, anchor: string, heading: string): Source {
  return {
    title,
    gloss: `AI Governance Engineering Body of Knowledge v${site.bokVersion}, chapter ${number}, section "${heading}"`,
    publisher: `${site.name} (${site.author})`,
    date: '2026-09',
    url: `${site.url}/bok/${slug}#${anchor}`,
    verified: 'primary',
  };
}

const ch15 = (anchor: string, heading: string) =>
  chapter('governing-deployment', '15', 'Governing deployment and use', anchor, heading);
const ch16 = (anchor: string, heading: string) =>
  chapter('fairness-and-explainability', '16', 'Fairness and explainability for practitioners', anchor, heading);
const ch17 = (anchor: string, heading: string) =>
  chapter('incidents', '17', 'Incidents, issues and root causes', anchor, heading);

const CH15 = {
  useCase: ch15('start-from-the-use-case-not-the-model', 'Start from the use case, not the model'),
  requirements: ch15('set-performance-and-explainability-requirements-first', 'Set performance and explainability requirements first'),
  people: ch15('check-the-data-and-the-people', 'Check the data and the people'),
  ddr: ch15('the-deployment-decision-record', 'The Deployment Decision Record'),
  modifier: ch15('when-a-deployer-becomes-a-provider', 'When a deployer becomes a provider'),
  review: ch15('what-the-review-reads', 'What the review reads'),
  outcomes: ch15('three-outcomes', 'Three outcomes'),
  dissent: ch15('recorded-dissent', 'Recorded dissent'),
  progressive: ch15('progressive-delivery-as-a-control', 'Progressive delivery as a control'),
  policies: ch15('policies-at-go-live', 'Policies at go-live'),
  calendar: ch15('maintenance-calendar-and-retraining-governance', 'Maintenance calendar and retraining governance'),
  drift: ch15('drift-what-moves-and-how-to-see-it', 'Drift: what moves and how to see it'),
  fairness: ch15('fairness-and-quality-in-production', 'Fairness and quality in production'),
  signal: ch15('who-owns-the-signal', 'Who owns the signal'),
  thirdParties: ch15('monitoring-third-parties-while-you-run', 'Monitoring third parties while you run'),
  retention: ch15('records-retention', 'Records retention'),
  deactivation: ch15('a-deactivation-policy-someone-can-execute', 'A deactivation policy someone can execute'),
  degradation: ch15('graduated-degradation', 'Graduated degradation'),
  retirement: ch15('retirement-and-decommissioning', 'Retirement and decommissioning'),
} as const;

const CH16 = {
  monitoring: ch16('monitoring-fairness-in-production', 'Monitoring fairness in production'),
} as const;

const CH17 = {
  severity: ch17('a-severity-scale-mapped-to-the-clocks', 'A severity scale mapped to the clocks'),
  deployer: ch17('deployer-duties-inform-the-provider-suspend-use', 'Deployer duties: inform the provider, suspend use'),
  clocks: ch17('the-overlapping-clocks', 'The overlapping clocks'),
  record: ch17('the-incident-record', 'The incident record'),
} as const;

/** A pattern's own page, as a numbered reference; throws on an unknown slug. */
function patternSource(slug: string): Source {
  const pattern = getPatternBySlug(slug);
  if (!pattern) throw new Error(`deployment-and-monitoring.ts: unknown pattern ${slug}`);
  return {
    title: `Pattern: ${pattern.title}`,
    gloss: `AI Governance Engineering Body of Knowledge v${site.bokVersion}, pattern catalogue (chapter 05)`,
    publisher: `${site.name} (${site.author})`,
    date: '2026-09',
    url: `${site.url}/patterns/${slug}`,
    verified: 'primary',
  };
}

const PATTERN = {
  rollout: patternSource('staged-rollout-rollback-criteria'),
  hitl: patternSource('human-in-the-loop-gate'),
  discovery: patternSource('shadow-ai-discovery'),
  gateway: patternSource('sanctioned-ai-gateway'),
  monitor: patternSource('drift-fairness-monitor'),
  incident: patternSource('incident-pipeline'),
  runbook: patternSource('deactivation-localisation-retirement-runbook'),
} as const;

/** An article of the AI Act, consolidated text of 2026-07-27 (rows of sources/SOURCES.md, chapters 15 to 17). */
function aiActArticle(article: string, gloss: string): Source {
  return {
    title: `Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. ${article}`,
    gloss,
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_${article.toLowerCase()}`,
    verified: 'primary',
  };
}

const ART = {
  4: aiActArticle('4', 'providers and deployers take measures to support the AI literacy of their staff'),
  5: aiActArticle('5', 'prohibited practices, binding on deployers as well as providers'),
  9: aiActArticle('9', 'risk management system across the lifecycle of a high-risk system'),
  13: aiActArticle('13', 'instructions for use: capabilities and limitations of performance; pre-determined changes; human oversight measures; expected lifetime and maintenance; log collection'),
  14: aiActArticle('14', 'human oversight of high-risk systems'),
  15: aiActArticle('15', '15(4): systems that continue to learn reduce the risk of biased outputs feeding future input, "feedback loops"'),
  20: aiActArticle('20', 'providers take corrective action: bring into conformity, withdraw, disable or recall; inform distributors and deployers'),
  25: aiActArticle('25', 'value chain: name or trademark, substantial modification or changed intended purpose makes a deployer the provider'),
  26: aiActArticle('26', 'deployer obligations: 26(1) use per the instructions; 26(2) oversight by competent persons with authority; 26(5) monitor, suspend and inform, serious incidents to the provider first; 26(6) logs kept at least six months'),
  72: aiActArticle('72', 'post-market monitoring system and plan'),
  73: aiActArticle('73', 'reporting of serious incidents: no later than 2, 10 or 15 days from awareness'),
} as const;

/** The Official Journal text, as the patterns cite it (Art. 49/71 registration; Art. 60 real-world testing). */
const AI_ACT_OJ: Source = {
  title: 'Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)',
  gloss: 'Art. 49 and 71 registration in the EU database; Art. 60 testing of high-risk AI systems in real-world conditions outside sandboxes',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2024-07-12',
  url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
  verified: 'primary',
};

const GDPR_ART_33: Source = {
  title: 'Regulation (EU) 2016/679 (GDPR), Art. 33',
  gloss: 'notification of a personal data breach to the supervisory authority without undue delay and, where feasible, within 72 hours',
  publisher: 'Publications Office of the EU (EUR-Lex)',
  date: '2016-04-27',
  url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_33',
  verified: 'primary',
};

const NIST_RMF: Source = {
  title: 'Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1',
  gloss:
    'subcategories cited by id: GOVERN 1.6, 1.7, 2.2, 6.1; MAP 1.1, 3.5; MEASURE 2.3, 2.4, 2.11, 3.1; MANAGE 1.1, 2.4, 3.1, 4.1, 4.3',
  publisher: 'NIST',
  date: '2023-01-26',
  url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
  verified: 'primary',
};

const SRE_CANARY: Source = {
  title: 'The Site Reliability Workbook, ch. 16 "Canarying Releases"',
  gloss: '"a partial and time-limited deployment of a change in a service and its evaluation"',
  publisher: "Google (O'Reilly)",
  date: '2018',
  url: 'https://sre.google/workbook/canarying-releases/',
  verified: 'primary',
};

const BLUE_GREEN: Source = {
  title: '"BlueGreenDeployment"',
  gloss: 'two identical production environments; switch back on failure',
  publisher: 'Martin Fowler',
  date: '2010-03-01',
  url: 'https://martinfowler.com/bliki/BlueGreenDeployment.html',
  verified: 'primary',
};

const FEATURE_TOGGLES: Source = {
  title: '"Feature Toggles (aka Feature Flags)"',
  gloss: 'release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation',
  publisher: 'Pete Hodgson, martinfowler.com',
  date: '2017-10-09',
  url: 'https://martinfowler.com/articles/feature-toggles.html',
  verified: 'primary',
};

/** Rows shared with the threat bridge (../threats.ts). */
const ISO_SOURCE: Source = threatSources[SRC.iso42001 - 1];
const OWASP_LLM: Source = threatSources[SRC.llm2026 - 1];
const OWASP_AGENTIC: Source = threatSources[SRC.asi - 1];

// ---------------------------------------------------------------------------
// Controls

const VERIFICATION_TODO =
  'Verification procedure to be specified: the source material states what the control produces, not how a third party checks it; requires technical review.';

type DerivedFields = Omit<Control, 'id' | 'profile' | 'version' | 'status' | 'reviewerStatus' | 'depth' | 'seeds' | 'verification'>;

function derived(n: number, fields: DerivedFields): Control {
  return {
    id: `AIGE-CTL-DEPLOY-${String(n).padStart(3, '0')}`,
    profile: PROFILE,
    version: '0.1',
    status: 'draft',
    reviewerStatus: 'open',
    depth: 'derived',
    seeds: [],
    verification: [],
    ...fields,
    openQuestions: [VERIFICATION_TODO, ...fields.openQuestions],
  };
}

export const deploymentAndMonitoringControls: readonly Control[] = [
  derived(1, {
    title: 'Deployment decision record before use',
    objective:
      'Before an AI system is put to use in a context, a Deployment Decision Record states the objective, what the system is not for (its negative space), the risk tier and obligations, the performance floors including per group, the retirement conditions and the owner, checks the deployer duties one by one, records the decision and who took it, and is referenced from the registry entry.',
    failureModes: [
      'A system serves in production with no decision record, or with one that no registry entry references.',
      "The record names no negative space, so a new use (the chapter's example: HR queries routed to a customer-service assistant) arrives as a quiet configuration change instead of a new intake.",
      'Performance floors are set after a vendor demonstration, or only as an average, so a good overall figure hides a group the system fails.',
    ],
    scope:
      'Every AI system an organisation puts to use in a given context, built or procured. A new use of an existing system is a new decision.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: 'Signed Deployment Decision Record, committed next to the system and linked from its registry entry',
        schemaId: 'deployment-decision-record',
        layer: 2,
      },
    ],
    failureResponse: {
      effect: 'require_approval',
      text: 'A proposed use that the record does not cover, or that falls in its negative space, goes back through intake and classification before it proceeds.',
    },
    layer: 2,
    secondaryLayers: [1],
    patterns: [],
    derivedFrom: [
      { kind: 'schema', ref: 'deployment-decision-record' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART26'],
      iso42001: ['A.6.2.5', 'A.9.4'],
      nistAiRmf: ['MAP 1.1', 'MANAGE 1.1'],
      owasp: [],
    },
    references: [CH15.ddr, CH15.useCase, CH15.requirements, ART[26], ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      "The record's floors become the thresholds of the eval gate (layer 03) and its negative space becomes the scope the runtime watches (layer 04).",
      'Set the requirements before looking at candidates: metrics that match the harm, a floor per population the system acts on, go/no-go thresholds each traced to the failure mode it stands for, and the explanation the use needs.',
    ],
    openQuestions: [
      'The deployment decision record schema has no dedicated field for the negative space or the retirement conditions the chapter puts in the record; whether they belong in the deployment context, the conditions or extensions awaits review.',
    ],
  }),

  derived(2, {
    title: 'Instructions for use held and followed',
    objective:
      "The deployer holds the provider's instructions for use for the version it runs, records the gaps it finds in them and what it could not verify, and uses the system in line with them: its monitoring hooks, oversight measures, input data and log collection follow what the instructions state, and its maintenance calendar starts from the lifetime and maintenance they declare.",
    failureModes: [
      'The system runs with no instructions for use on record for the version in production.',
      "The go-live review accepts the provider's own evidence without recording what the deployer could not verify.",
      'A metric the instructions name has no monitoring hook, or the system receives input data the instructions say it must not receive.',
    ],
    scope:
      'Deployers of AI systems supplied with instructions for use, in particular high-risk systems, whose providers must supply them. Writing the instructions is the provider\'s side and out of scope, except where the deployer is also the provider.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: 'Instructions for use on record for the running version, referenced from the deployment decision record with the gaps found in them',
        schemaId: 'instructions-for-use',
        layer: 2,
      },
    ],
    failureResponse: {
      effect: 'require_approval',
      text: 'Gaps in the instructions, and what the deployer could not verify, are recorded and go to the go-live review, which decides on them explicitly.',
    },
    layer: 2,
    patterns: [],
    derivedFrom: [
      { kind: 'schema', ref: 'instructions-for-use' },
      { kind: 'schema', ref: 'deployment-decision-record' },
      { kind: 'chapter', ref: 'governing-deployment' },
      { kind: 'chapter', ref: 'incidents' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART26', 'AIGE-OBL-EUAIA-ART13'],
      iso42001: ['A.8.2'],
      nistAiRmf: [],
      owasp: [],
    },
    references: [CH15.review, CH15.calendar, CH17.deployer, ART[26], ART[13], ISO_SOURCE],
    implementationNotes: [
      "When the evidence is the provider's own, run the go-live review in review mode: assess the supplier's assessment and record, explicitly, what the deployer could not verify.",
      "Build a monitoring hook, with its threshold as code, for each metric the provider's instructions name (layer 04).",
    ],
    openQuestions: [
      'Whether a revised version of the instructions re-opens the go-live review, or only the gaps it changes, is not settled by the source material.',
    ],
  }),

  derived(3, {
    title: 'Oversight by trained people with authority to stop',
    objective:
      'Oversight of the deployed system is assigned to named people with the competence, training and authority it needs, and the support to use it: role-based training (what the system is for, the limitations its instructions declare, when to override it, how to report a problem) is a condition of access, and an operator who sees the system misbehave may stop it without first asking permission.',
    failureModes: [
      'The decision record names no oversight roles, or names roles with no training record behind them.',
      'A person gets or keeps access to the system with no current training record for the role.',
      'An operator who sees the system misbehave has to ask for permission before pausing it.',
      'Oversight is undifferentiated: every output waits for review, which destroys the value of the system, or none does, which removes the oversight the risk requires.',
    ],
    scope:
      'Deployed AI systems whose outputs inform or take decisions that people oversee, in particular high-risk systems. For AI agents, the checkpoint and approval controls of the Agent Runtime profile apply as well, and for an agent with an Annex III purpose AIGE-CTL-AGENT-030 restates the same oversight duty.',
    enforcementPoints: ['deploy', 'runtime'],
    evidence: [
      {
        artefact: "Role-based training records whose grants field the access check reads",
        schemaId: 'training-record',
        layer: 4,
      },
      {
        artefact: 'Oversight roles and the ids of their training records in the deployment decision record',
        schemaId: 'deployment-decision-record',
        layer: 2,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'Access to the system is refused while the person holds no current training record for the role.',
    },
    layer: 4,
    patterns: ['human-in-the-loop-gate'],
    derivedFrom: [
      { kind: 'pattern', ref: 'human-in-the-loop-gate' },
      { kind: 'schema', ref: 'training-record' },
      { kind: 'schema', ref: 'deployment-decision-record' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART26-2', 'AIGE-OBL-EUAIA-ART14', 'AIGE-OBL-EUAIA-ART4'],
      iso42001: ['A.9.2'],
      nistAiRmf: ['MAP 3.5'],
      owasp: [],
    },
    references: [CH15.people, CH15.policies, PATTERN.hitl, ART[26], ART[14], ART[4], ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Classify outputs or actions by consequence: gate the high-consequence class behind a person with enough context to decide, keep the routine class autonomous under guardrails, and log the approver, the context and the decision as evidence.',
      'Pair the training with interface aids that support judgement rather than replace it: sources shown, confidence where it is meaningful, and a visible way to reach a person.',
    ],
    openQuestions: [
      'The training record carries an expiry, but the source material sets no refresher interval per oversight role.',
    ],
  }),

  derived(4, {
    title: 'Go-live decision with conditions as code',
    objective:
      'A go-live review reads an evidence pack and records one of three outcomes (approve, approve with conditions, reject) with the approver and the residual risk, accepted by an authority that matches the risk tier; each condition is a check with an owner and a deadline, the approval lapses when a check has not passed in time, and any member of the review can attach named dissent to the decision record.',
    failureModes: [
      'A condition is granted and forgotten: its deadline passes with no check, and the approval keeps running.',
      'Residual risk is accepted by the team that wants to ship rather than by an authority that matches the risk tier.',
      'A checklist item is marked met with no link to the record that answers it, or a management override is not recorded.',
      'Dissent raised in the review is not attached to the decision, so the incident review cannot tell whether anyone saw the problem coming.',
    ],
    scope:
      'Every release that takes an AI system, or a new version of it, into use: a new system, a major or minor change, a retrain or a rollback, the change types the go/no-go record distinguishes.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: "Go/no-go record: checklist items linked to the records that answer them, reviewers' decisions by role, overrides, conditions, residual risk and the rollout plan",
        schemaId: 'go-no-go',
        layer: 5,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: "A rejected release is blocked and its registry status reads rejected; when a condition's check has not passed by its deadline, the approval lapses and the feature flag closes.",
    },
    layer: 5,
    secondaryLayers: [1],
    patterns: [],
    derivedFrom: [
      { kind: 'schema', ref: 'go-no-go' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: [],
      iso42001: ['A.6.2.5'],
      nistAiRmf: ['MANAGE 1.1'],
      owasp: [],
    },
    references: [CH15.review, CH15.outcomes, CH15.dissent, ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Make each condition code: a feature flag caps exposure while the condition holds, and the approval carries an expiry.',
      'Review recorded dissent at the first monitoring review after go-live, and close it with the evidence that answered it.',
    ],
    openQuestions: [
      'The go/no-go schema has no field of its own for dissent; whether it belongs in the reviewers list, the overrides or extensions awaits review.',
      'No EU AI Act obligation is mapped: the go-live review is chapter 15 practice rather than a single article, and the mapping awaits review.',
    ],
  }),

  derived(5, {
    title: 'Staged rollout with pre-registered rollback criteria',
    objective:
      'Every change to a deployed AI system (a new model, a retrain, a prompt or corpus change, a new vendor model version) reaches production through shadow, pilot, canary and general availability stages, each with rollback criteria signed before it starts and evaluated by the pipeline, which writes a promote, hold or roll-back verdict per stage to the assurance store.',
    failureModes: [
      'A change goes from the eval harness to all traffic at once, so the first evidence about live behaviour is the harm itself.',
      'A rollback criterion is written or loosened after the metric moved, or a threshold is edited on a dashboard rather than through a reviewed diff with an approver.',
      'A criterion trips and the rollback waits for a meeting instead of the pipeline acting on it.',
      "Criteria are checked only in aggregate, so a regression for one group (the pattern's example: one language) passes the canary.",
    ],
    scope:
      "Changes to deployed AI systems that can move quality, safety or fairness, including changes that touch no line of the deployer's code. At general availability the criteria stay on as live monitors.",
    enforcementPoints: ['deploy', 'runtime'],
    evidence: [
      {
        artefact: 'Rollout plan registered before the first stage, stage verdicts and rollback events in the assurance store, summarised in the rollout field of the go/no-go record',
        schemaId: 'go-no-go',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A tripped criterion stops promotion and returns the exposed cohort to the baseline; the stage verdict and the rollback event are recorded before anyone meets.',
    },
    layer: 4,
    patterns: ['staged-rollout-rollback-criteria'],
    derivedFrom: [
      { kind: 'pattern', ref: 'staged-rollout-rollback-criteria' },
      { kind: 'schema', ref: 'go-no-go' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART26-5'],
      iso42001: ['A.6.2.5', 'A.6.2.6'],
      nistAiRmf: ['MANAGE 1.1', 'MEASURE 2.3', 'MANAGE 2.4'],
      owasp: [],
    },
    references: [PATTERN.rollout, CH15.progressive, SRE_CANARY, ART[26], AI_ACT_OJ, ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Give each stage a purpose: shadow proves behaviour on real traffic, a pilot with trained users proves oversight works, and a canary against a control group proves no regression at scale.',
      'Each stage lists metric, comparison, threshold, window and the group breakdowns that matter; where outcome labels arrive after the stage ends, lean on proxies such as disagreement, overrides, complaints and groundedness.',
      'Review the criteria with their owners on the maintenance calendar: criteria that are too tight produce rollback fatigue.',
      'A provider or prospective provider that pilots an Annex III system with real users before placing it on the market is testing in real-world conditions, which Art. 60 governs; that pre-market pilot is outside this control, which covers changes to systems already in use.',
    ],
    openQuestions: [
      'How long each stage runs and how much exposure it takes are left to the plan; the source material gives illustrative values only and no method to size a stage for a per-group regression.',
    ],
  }),

  derived(6, {
    title: 'Pinned versions and a tested path back',
    objective:
      'The registry pins the model, prompt, retrieval corpus and guardrail versions of the baseline and the candidate; an unpinned change detected at runtime is a rollback trigger; a new provider model version runs in shadow and canary against the pinned version before it takes traffic; and the path back, a blue-green switch or a feature flag, is exercised in the shadow stage before anyone depends on it.',
    failureModes: [
      'A vendor model update that nobody treated as a release reaches users without passing any stage.',
      'The model, prompt, corpus or guardrail version that served a request cannot be told, because the registry did not pin it.',
      'The path back is used for the first time during an incident, untested.',
    ],
    scope:
      "Deployed AI systems with versioned components, including models reached through a provider's API, whose versions change on the provider's schedule. Verifying a model artefact's signature and provenance before load is AIGE-CTL-ASSURE-010.",
    enforcementPoints: ['deploy', 'runtime'],
    evidence: [
      {
        artefact: 'Registry diff of the pinned versions of baseline and candidate, and switch events from the exercised path back',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'An unpinned change detected at runtime triggers a rollback to the pinned baseline; a new vendor version takes no traffic until it has passed shadow and canary.',
    },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['staged-rollout-rollback-criteria'],
    derivedFrom: [
      { kind: 'pattern', ref: 'staged-rollout-rollback-criteria' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: [],
      iso42001: ['A.6.2.5'],
      nistAiRmf: ['MANAGE 2.4', 'MANAGE 3.1'],
      owasp: [],
    },
    references: [PATTERN.rollout, CH15.progressive, CH15.thirdParties, BLUE_GREEN, FEATURE_TOGGLES, ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'File every provider change and deprecation notice against the registry entry, and keep an alternative model warm in the eval harness so a forced migration starts from evidence rather than from a standing start.',
      'A retrain, a fine-tune, a prompt change, a corpus refresh and a vendor model update are all releases: each bumps the version in the registry.',
    ],
    openQuestions: [
      'Where a provider changes the model behind a stable name and exposes no version, the pin cannot be checked directly; how to detect such a change beyond the canary awaits review.',
    ],
  }),

  derived(7, {
    title: 'Re-assessment when a change goes beyond what was foreseen',
    objective:
      "Each change is classified in CI against the pre-determined changes in the provider's instructions for use; a change beyond them, a changed intended purpose, or a new population, jurisdiction, autonomy level or vendor version triggers a re-assessment, an amended deployment decision record and a role decision in the registry entry on whether the deployer has become the provider.",
    failureModes: [
      "A retrain, a new data source or a threshold moved beyond the provider's pre-determined changes ships as routine, and the deployer takes on provider duties without knowing it.",
      'A general-purpose assistant is put to work on hiring or credit through a configuration change, with no re-classification.',
      'A system reaches a new population, jurisdiction or autonomy level with no re-assessment trigger record.',
    ],
    scope:
      'Changes to a deployed AI system, its intended purpose or its context of use, whether the deployer built the system or procured it.',
    enforcementPoints: ['pre_merge', 'deploy'],
    evidence: [
      {
        artefact: 'Change record classified against the pre-determined changes, and the amended deployment decision record with its role assessment',
        schemaId: 'deployment-decision-record',
        layer: 2,
      },
    ],
    failureResponse: {
      effect: 'require_approval',
      text: 'A change classified as beyond the pre-determined changes, or as a new purpose, goes back through classification and a new decision before it ships.',
    },
    layer: 2,
    secondaryLayers: [1],
    patterns: [],
    derivedFrom: [
      { kind: 'schema', ref: 'instructions-for-use' },
      { kind: 'schema', ref: 'deployment-decision-record' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART25'],
      iso42001: [],
      nistAiRmf: [],
      owasp: [],
    },
    references: [CH15.modifier, CH15.calendar, ART[25], ART[13]],
    implementationNotes: [
      'Detect each trigger where it happens: a brand check in the release checklist for a name or trademark, change classification in CI for a substantial modification, and intake and the downstream use register for a changed purpose.',
      'Log the compute of every fine-tune of a general-purpose model as an artefact filed with the AIBOM: whether the modifier becomes a provider turns on an indicative criterion of one third of the original training compute.',
    ],
    openQuestions: [
      'Whether a given change is a substantial modification is a legal call the source material leaves to counsel; who signs off the classification in CI awaits review.',
    ],
  }),

  derived(8, {
    title: 'Monitoring plan with thresholds, owners and consequences',
    objective:
      'A monitoring plan kept as data names the drift classes that apply to the system and a statistic for each, and gives every metric a threshold, a window, a named owner who can be paged and the action a breach fires; each check writes an evidence record, pass or fail, and the plan and its findings are reviewed on a stated cadence.',
    failureModes: [
      'A dashboard has no thresholds, or a breach pages no one, so drift is watched by nobody.',
      'A signal has no owner who can be paged for it.',
      'A generative system degrades (more ungrounded answers, more refusals in one language) while every infrastructure metric stays green.',
      'Checks that pass leave no record, so the absence of breaches cannot be shown.',
    ],
    scope:
      'Every AI system in production, built or procured: providers of high-risk systems keep a post-market monitoring plan, and deployers monitor operation on the basis of the instructions for use. Whether each check is still firing is the live control status of AIGE-CTL-ASSURE-005.',
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      {
        artefact: 'Monitoring plan with data sources, metrics, thresholds, triggers, owner and review cadence',
        schemaId: 'post-market-monitoring-plan',
        layer: 4,
      },
      {
        artefact: 'Evidence record per check, pass or fail, in the assurance store',
        schemaId: 'evidence-record',
        layer: 5,
      },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'A breach fires the action the plan sets for it (an issue, a retrain, a degraded mode, an incident or a tripped breaker) and pages the named owner.',
    },
    layer: 4,
    secondaryLayers: [5],
    patterns: ['drift-fairness-monitor'],
    derivedFrom: [
      { kind: 'pattern', ref: 'drift-fairness-monitor' },
      { kind: 'schema', ref: 'post-market-monitoring-plan' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART72', 'AIGE-OBL-EUAIA-ART26-5', 'AIGE-OBL-EUAIA-ART9'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: ['MEASURE 2.4', 'MEASURE 3.1', 'MANAGE 4.1'],
      owasp: [],
    },
    references: [PATTERN.monitor, CH15.drift, CH15.signal, ART[72], ART[26], ART[9], ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Name what can move (data, label, concept, pipeline, vendor model and usage drift) and pick a statistic per class: a stability index or two-sample test against a reference window, predicted against observed positive rate, performance on fresh labels, data contracts, version-pin checks, topic classification of traffic against the negative space.',
      'Labels often arrive late or never: pair input-drift statistics with a delayed performance check, and for generative systems sample outputs for groundedness scoring and human review.',
      'A threshold change is a change to a control: a reviewed diff with an approver, not an edit on a dashboard.',
    ],
    openQuestions: [
      "Provider and deployer each monitor part of the system and see different data; how the deployer's findings reach the provider's post-market monitoring is not settled here.",
    ],
  }),

  derived(9, {
    title: 'Fairness monitored by group in production',
    objective:
      'Fairness keeps being measured after go-live: selection or approval rates by group against the eval baseline, error and calibration rates by group once outcomes arrive, override, complaint and appeal rates by group, groundedness and refusal rates by topic and language for generative systems, and feedback-loop checks where outputs shape future training data; a breach opens a ticket with an owner.',
    failureModes: [
      'A system that passed its fairness evals at go-live drifts into unfairness without any code change, and nothing measures it.',
      'The group attribute is absent at runtime and no consented sample, periodic audit or secured join replaces it, so no per-group rate exists.',
      'Reviewers override one group more often than others and the signal is never read.',
      'Outputs shape the data the next version learns from, and no feedback-loop check runs.',
    ],
    scope:
      'AI systems in production that make or inform decisions about people, or serve groups that can be served unequally, such as speakers of different languages. A disparity that caused harm is an incident and follows the incident controls.',
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      {
        artefact: 'Per-group metrics in the monitoring plan, with the label delay stated, thresholds and owners, and an evidence record per check',
        schemaId: 'post-market-monitoring-plan',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'A per-group breach opens a ticket with an owner, not a chart nobody reads; a disparity that caused harm is opened as an incident.',
    },
    layer: 4,
    secondaryLayers: [5],
    patterns: ['drift-fairness-monitor'],
    derivedFrom: [
      { kind: 'pattern', ref: 'drift-fairness-monitor' },
      { kind: 'chapter', ref: 'fairness-and-explainability' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART15-4', 'AIGE-OBL-EUAIA-ART4A'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: ['MEASURE 2.11'],
      owasp: [],
    },
    references: [CH16.monitoring, CH15.fairness, PATTERN.monitor, ART[15], AI_ACT_ART4A, ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Where the group attribute is not held at runtime, choose between a consented sample or panel, periodic audits under the Art. 4a conditions, or outcome-free rates with the attribute joined in a secured environment.',
      'The contest channel is a sensor: complaints, appeals and explanation requests by group, with their outcomes, feed the same threshold and issue path as every other signal.',
      "Where law requires a periodic bias audit, as New York City's Local Law 144 does for automated employment decision tools, the production telemetry is what makes the audit cheap.",
    ],
    openQuestions: [
      'Per-group metrics on small groups are noisy; the source material names the problem but sets no minimum group size or window.',
    ],
  }),

  derived(10, {
    title: 'Deployer log retention',
    objective:
      "Logs a high-risk system generates automatically, to the extent they are under the deployer's control, are kept for at least six months unless other law says otherwise, and longer while an incident is open; retention is code: a schedule per record type, tamper-evident storage, a legal hold that overrides deletion, and the ceiling data protection law sets for the personal data inside them.",
    failureModes: [
      "Logs under the deployer's control are deleted before six months, or while an incident they bear on is still open.",
      'Logs are overwritten while the decision to stop the system is still being taken.',
      'Everything is kept indefinitely, so the personal data in the logs outlives the storage-limitation ceiling.',
    ],
    scope:
      "Deployers of high-risk AI systems, for the logs under their control; the same schedule covers the deployer's decision records (decision record, go-live decision, conditions and dissent), kept for the life of the system plus the limitation period counsel sets. For an agent with an Annex III purpose AIGE-CTL-AGENT-030 carries the same six-month floor, and the provider's retention of documentation and logs is AIGE-CTL-ASSURE-008.",
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      {
        artefact: 'Retention schedule per record type, and the log retention period in days in the deployment decision record',
        schemaId: 'deployment-decision-record',
        layer: 5,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A legal hold overrides deletion: logs under hold, or tied to an open incident, cannot be deleted.',
    },
    layer: 5,
    secondaryLayers: [4],
    patterns: ['incident-pipeline'],
    derivedFrom: [
      { kind: 'pattern', ref: 'incident-pipeline' },
      { kind: 'schema', ref: 'deployment-decision-record' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART26-6'],
      iso42001: ['A.6.2.8'],
      nistAiRmf: [],
      owasp: [],
      aiuc1: ['E015'],
    },
    references: [CH15.retention, CH17.deployer, PATTERN.incident, ART[26], ISO_SOURCE, AIUC1_REQUIREMENTS],
    implementationNotes: [
      'Reconcile the six-month floor for logs with the data protection ceiling per data type, not by keeping everything; keep archive formats someone can still read in ten years.',
      'Where the provider holds the logs, its own six-month floor applies (Art. 19(1)); record who holds which logs.',
    ],
    openQuestions: [
      'How long past the six-month floor logs should be kept for a given intended purpose is left to the deployer; the source material gives no default.',
    ],
  }),

  derived(11, {
    title: 'Serious incident reporting clocks',
    objective:
      'Each incident record keeps severity and reportability in separate fields set by named people with timestamps, and records when the organisation became aware and one entry per regime assessed; a deployer that identifies a serious incident informs the provider first, then the importer or distributor and the authority, and starts the Art. 73 timers on its own record when the provider cannot be reached.',
    failureModes: [
      'A single priority field is read one way by engineering and another by legal, so the reportability decision is never taken.',
      'A deadline is missed because detection, triage and reporting are disconnected manual steps.',
      'A "not applicable" decision leaves no rationale or owner, so the organisation cannot show later why it did not report.',
      "The provider does not answer and no clock starts on the deployer's own record.",
    ],
    scope:
      'Incidents in deployed AI systems, whoever built them. The AI Act clocks bind providers of high-risk systems and, when the provider cannot be reached, their deployers; a personal data breach inside an AI incident adds the GDPR clock.',
    enforcementPoints: ['runtime'],
    evidence: [
      {
        artefact: 'Incident record with its reporting block (awareness time, one entry per regime with rationale, deadline and submission) and the timestamp of each notification',
        schemaId: 'incident-record',
        layer: 5,
      },
    ],
    failureResponse: {
      effect: 'alert',
      text: 'The pipeline alerts on the nearest reporting deadline and pages the system owner and legal; a person can override the first classification, and the override is logged with a reason.',
    },
    layer: 5,
    patterns: ['incident-pipeline'],
    derivedFrom: [
      { kind: 'pattern', ref: 'incident-pipeline' },
      { kind: 'schema', ref: 'incident-record' },
      { kind: 'chapter', ref: 'incidents' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART73', 'AIGE-OBL-EUAIA-ART26-5', 'AIGE-OBL-GDPR-ART33-34'],
      iso42001: ['A.8.4'],
      nistAiRmf: ['MANAGE 4.3'],
      owasp: [],
    },
    references: [CH17.clocks, CH17.deployer, CH17.severity, CH17.record, PATTERN.incident, ART[73], ART[26], GDPR_ART_33, ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Classify up and downgrade with evidence: the deadlines run from awareness, and a reasonable likelihood of a causal link is enough to start them.',
      "Hold the facts once and render each regime's report from the record, never retyped; keep the provider's incident contact and channel on the registry entry and test the notification terms in drills.",
    ],
    openQuestions: [
      'Which regimes count as equivalent for a given system, which narrows Art. 73 reporting to fundamental-rights infringements, is a legal call the source material says to record per system; who records it awaits review.',
    ],
  }),

  derived(12, {
    title: 'Deactivation triggers, degraded modes and suspension',
    objective:
      'A runbook kept with the registry entry names the threshold and legal triggers for stopping the system, each with the role that decides and the time allowed; every path first freezes the logs, applies a legal hold and snapshots the pinned versions; degraded modes short of shutdown, and a suspension path for systems the deployer does not own, are built as tested toggles and drilled at least yearly.',
    failureModes: [
      'A trigger fires and nobody knows who may decide, so the system keeps serving while a meeting runs.',
      'Logs are overwritten before the evidence is frozen.',
      'The only available action is to turn everything off, everywhere, which is often worse than the fault.',
      'A classifier embedded in a vendor product has no switch, so a deployer with reason to consider that it presents a risk cannot suspend its use.',
      'A degraded mode or the suspension path fails the first time it is used, because it was never drilled.',
    ],
    scope:
      "Every deployed AI system that a breached floor, an incident or a legal duty could force to stop, including systems embedded in a supplier's product. For agents, the kill switch and circuit breaker controls of the Agent Runtime profile (AIGE-CTL-AGENT-011 and AIGE-CTL-AGENT-010) are the instant form.",
    enforcementPoints: ['runtime', 'periodic'],
    evidence: [
      {
        artefact: 'Runbook with triggers, deciding roles and times allowed; toggle change log; drill records with the time to decide, to the degraded mode and to off',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'On a trigger the decision owner switches the system to a degraded mode or off within the time allowed, after the evidence is frozen; under Art. 26(5) the deployer suspends use and informs the provider or distributor and the authority.',
    },
    layer: 4,
    patterns: ['deactivation-localisation-retirement-runbook', 'incident-pipeline'],
    derivedFrom: [
      { kind: 'pattern', ref: 'deactivation-localisation-retirement-runbook' },
      { kind: 'pattern', ref: 'incident-pipeline' },
      { kind: 'chapter', ref: 'governing-deployment' },
      { kind: 'chapter', ref: 'incidents' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART26-5', 'AIGE-OBL-EUAIA-ART20', 'AIGE-OBL-EUAIA-ART5'],
      iso42001: ['A.6.2.6'],
      nistAiRmf: ['MANAGE 2.4'],
      owasp: [],
    },
    references: [PATTERN.runbook, CH15.deactivation, CH15.degradation, CH17.deployer, FEATURE_TOGGLES, ART[26], ART[20], ART[5], ISO_SOURCE, NIST_RMF],
    implementationNotes: [
      'Build the intermediate modes in advance: advice-only, raised thresholds with abstention to a person, grounded-only answers, scoped off for one group, language, region or function, back to the pilot cohort, and off with the fallback process.',
      "Suspension is a kill switch for a system you do not own: you cannot revoke a vendor's weights, but you can stop sending it traffic; test that you can, and how long it takes.",
      'Keep the jurisdiction as a policy input, with flags by region, so one market can be switched off without touching the others.',
    ],
    openQuestions: [
      "Where the model sits inside a supplier's product the switch depends on the contract; which terms give the deployer a switch is not settled here.",
    ],
  }),

  derived(13, {
    title: 'Shadow AI discovery and registry reconciliation',
    objective:
      'Discovery runs continuously against the places AI appears (identity providers, cloud accounts, network egress, code repositories and SaaS integrations); each finding is reconciled against the registry, an unknown system gets an entry and an owner asked to claim it, the unclaimed are escalated, and the result feeds the registry drift check.',
    failureModes: [
      'The registry is fed only by voluntary declaration and lags production: models, agents and AI-enabled tools run with no entry.',
      'A finding is logged but never registered, claimed or escalated.',
      'A retired system keeps a copy serving because no sweep checks for it.',
    ],
    scope:
      'The environments where staff and systems can run or reach AI: identity, cloud, network, code and SaaS. Local models and personal devices stay a discovery problem that the sanctioned gateway does not cover.',
    enforcementPoints: ['periodic'],
    evidence: [
      {
        artefact: 'Discovery findings reconciled against the registry, with the entries opened, claimed and escalated',
        layer: 2,
      },
    ],
    failureResponse: {
      effect: 'alert',
      text: "An unknown system is registered as unclaimed, its owner is asked to claim it and the unclaimed are escalated; in the pattern's example its scope is frozen until claimed.",
    },
    layer: 2,
    patterns: ['shadow-ai-discovery'],
    derivedFrom: [
      { kind: 'pattern', ref: 'shadow-ai-discovery' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART49-71'],
      iso42001: [],
      nistAiRmf: ['GOVERN 1.6'],
      owasp: ['asi10'],
    },
    references: [PATTERN.discovery, CH15.retirement, OWASP_AGENTIC, AI_ACT_OJ, NIST_RMF],
    implementationNotes: [
      'Turn each find into an intake request (register, tier, approve or replace) before it becomes a sanction; identity, network and expense data show the tools used outside the sanctioned gateway.',
    ],
    openQuestions: [
      "The source material sets no cadence for discovery sweeps beyond the pattern's illustrative weekly sweep, and no deadline for an owner to claim a finding.",
    ],
  }),

  derived(14, {
    title: 'Sanctioned AI gateway for staff use',
    objective:
      "Staff reach approved AI tools and model APIs through single sign-on and one gateway that applies the acceptable-use policy as code: a catalogue names each tool, its contract terms and allowed data classes; each request is tagged by data class and allowed, redacted or blocked; access needs a current acceptable-use attestation; and each call writes a signed evidence record with the input's hash, not the input.",
    failureModes: [
      'Someone pastes a customer file into a public tool, and the acceptable-use policy, read once in a handbook, is never evaluated at that moment.',
      'An approved tool is used on terms that changed after its approval, such as training on customer inputs.',
      'Every public tool is blocked, and use moves onto personal devices where nothing is seen.',
      'The gateway keeps full staff prompts, beyond what the control needs.',
    ],
    scope:
      "Staff use of AI tools and model APIs, in the browser or through an API. Local models and personal devices are outside the gateway and left to discovery.",
    enforcementPoints: ['runtime'],
    evidence: [
      {
        artefact: 'Signed gateway decision event per call: decision, data class, tool, redactions and a hash of the input',
        schemaId: 'evidence-record',
        layer: 4,
      },
      {
        artefact: 'Current acceptable-use attestation and training module on record for each user',
        schemaId: 'training-record',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'deny',
      text: 'A request carrying a data class the tool is not approved for is redacted or blocked with a reason and a route to the right tool; without a current attestation the gateway role is not granted.',
    },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['sanctioned-ai-gateway'],
    derivedFrom: [
      { kind: 'pattern', ref: 'sanctioned-ai-gateway' },
      { kind: 'schema', ref: 'evidence-record' },
      { kind: 'schema', ref: 'training-record' },
    ],
    mappings: {
      obligations: ['AIGE-OBL-EUAIA-ART4'],
      iso42001: ['A.9.2', 'A.10.3'],
      nistAiRmf: ['GOVERN 2.2', 'GOVERN 6.1', 'MANAGE 3.1'],
      owasp: ['llm02-2026'],
      aiuc1: ['E010'],
    },
    references: [PATTERN.gateway, ART[4], OWASP_LLM, ISO_SOURCE, NIST_RMF, AIUC1_REQUIREMENTS],
    implementationNotes: [
      'Make the gateway the fastest route: every extra step on the approved path sends people back to the unapproved one; replace personal accounts on approved tools with enterprise tenancies.',
      'Feed the catalogue from the Vendor / Model Due-Diligence Gate and review each entry on its review date, because supplier terms change.',
    ],
    openQuestions: [
      "Logging staff prompts is itself processing of employees' personal data; how much the gateway keeps, and for how long, awaits review with the DPO and employee representatives.",
    ],
  }),

  derived(15, {
    title: 'Retirement runbook with access and data removal',
    objective:
      'An AI system is retired through a runbook, not a deletion: dependencies are analysed, users move to the fallback, sunset notices go out before the date, a final evidence snapshot is archived, weights, corpora and logs are kept or destroyed as licence, lawful basis and retention decide, every identity and credential is revoked, the registry entry is set to retired rather than deleted, and discovery confirms no copy still runs.',
    failureModes: [
      'The registry entry is deleted while a copy keeps serving.',
      'A service account or API key of the retired system stays live.',
      'The evidence that the system was ever governed is lost with it.',
      'Consumers of the outputs learn of the retirement after the date, because nobody analysed dependencies or sent sunset notices.',
    ],
    scope:
      'Every AI system or agent retired, replaced or withdrawn: at end of life, on replacement, for unacceptable risk, for a regulatory reason, on a vendor exit or after an incident.',
    enforcementPoints: ['deploy'],
    evidence: [
      {
        artefact: 'Decommissioning runbook: reason, decision reference, dependencies, notifications, steps with owners and evidence, data disposition, evidence archive and sign-off',
        schemaId: 'decommissioning-runbook',
        layer: 4,
      },
    ],
    failureResponse: {
      effect: 'require_approval',
      text: 'The runbook closes only with a final sign-off, once every step is done or skipped with a reason.',
    },
    layer: 4,
    secondaryLayers: [2],
    patterns: ['deactivation-localisation-retirement-runbook', 'shadow-ai-discovery'],
    derivedFrom: [
      { kind: 'pattern', ref: 'deactivation-localisation-retirement-runbook' },
      { kind: 'schema', ref: 'decommissioning-runbook' },
      { kind: 'chapter', ref: 'governing-deployment' },
    ],
    mappings: {
      obligations: [],
      iso42001: [],
      nistAiRmf: ['GOVERN 1.7'],
      owasp: [],
    },
    references: [CH15.retirement, PATTERN.runbook, NIST_RMF],
    implementationNotes: [
      'Design retirement in from the start: the deployment decision record already names the conditions under which the system is retired.',
      'Irregular or indiscriminate termination can itself increase risk, so retirement moves users to a fallback before traffic stops; the downstream use register lists the consumers to warn.',
    ],
    openQuestions: [
      'The source material leaves the length of the evidence archive to the retention schedule and maps retirement to several record-keeping articles; the obligation mapping of this control awaits review.',
    ],
  }),
];
