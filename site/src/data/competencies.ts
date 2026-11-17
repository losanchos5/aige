// competencies.ts: the competency matrix of the AI governance engineer, seven
// workflows (role.ts) by the first four rungs of the career ladder in chapter
// 06 ("The career ladder"), plus a function-level band for rung five.
//
// Editorial rules, enforced where a rule can be checked (competencyProblems):
//  - It is the author's model, derived from the Body of Knowledge. It is not an
//    industry standard, it is not validated by a survey, and it has no score.
//  - A cell says what a person can own end to end and which artefact visible in
//    the systems shows it. Evidence is never a title, a certificate, years of
//    experience or a self-rating.
//  - Every cell links to what the site already teaches. Nothing the site cannot
//    back, and no claim about third-party competency frameworks.
//  - Rung names are the chapter's numbered list; tests/data.spec.ts compares them.

import { workflows, skills, type SkillArea } from './role';
import { resolveAigpLink } from '../lib/aigp-coverage';
import { controls, controlPath } from './controls/index';
import { nodes } from './path';

/** Page route, shared by the page, the API dataset and the wiring. */
export const COMPETENCIES_PATH = '/role/competencies';

export const competenciesDisclaimer =
  "This matrix is the author's model, derived from the Body of Knowledge. It is not an industry standard, it has not been validated by a survey, and it does not score anyone.";

export interface Rung {
  n: 1 | 2 | 3 | 4 | 5;
  name: string;
  /** One sentence, as chapter 06 scopes the rung. */
  scope: string;
}

export interface CompetencyLink {
  label: string;
  href: string;
}

export interface CompetencyCell {
  /** Id of a workflow in role.ts. */
  workflow: string;
  rung: 1 | 2 | 3 | 4;
  /** What the person can own end to end (40 words at most). */
  can: string;
  /** The artefact visible in the systems that shows it (30 words at most). */
  evidence: string;
  /** One to four places on the site where it is taught. */
  links: CompetencyLink[];
}

export interface FunctionStatement {
  can: string;
  evidence: string;
}

export const rungs: readonly Rung[] = [
  { n: 1, name: 'Associate', scope: 'Runs existing controls that someone else built.' },
  {
    n: 2,
    name: 'AI governance engineer',
    scope: 'Builds one control end to end, wired into CI/CD, and owns a workflow for one product area.',
  },
  {
    n: 3,
    name: 'Senior',
    scope: 'Owns a full workflow across the organisation and designs the paved path others adopt.',
  },
  {
    n: 4,
    name: 'Staff / principal',
    scope:
      'Owns the reference architecture and the cross-cutting decisions: identity model, evidence format, incident path.',
  },
  {
    n: 5,
    name: 'Head of AI governance engineering',
    scope: 'Owns the function and its shared ownership with engineering, measured by realised risk reduction.',
  },
];

/**
 * Each workflow id to the `area` of its skills in role.ts. Explicit on purpose:
 * the area names differ from the workflow names and role.ts has one extra
 * cross-cutting area that belongs to no single workflow.
 */
export const workflowSkillArea: Readonly<Record<string, string>> = {
  'intake-and-classification': 'Intake & classification',
  'inventory-and-registry': 'Inventory & registry',
  'evals-and-red-teaming': 'Evals & red teaming',
  'policy-as-code-and-gates': 'Policy-as-code & gates',
  'runtime-monitoring-and-incidents': 'Runtime monitoring & incidents',
  'assurance-and-audit-evidence': 'Assurance & audit evidence',
  'regulatory-translation': 'Regulatory translation',
};

/** The skills of one workflow, from role.ts (never copied here). */
export function skillsFor(workflowId: string): SkillArea {
  const area = workflowSkillArea[workflowId];
  const found = skills.find((s) => s.area === area);
  if (!found) throw new Error(`competencies: no skills area for workflow ${workflowId}`);
  return found;
}

const bok = (slug: string, anchor: string, label: string): CompetencyLink => ({
  label,
  href: `/bok/${slug}#${anchor}`,
});
const pattern = (slug: string, label: string): CompetencyLink => ({ label, href: `/patterns/${slug}` });
const tool = (id: string, label: string): CompetencyLink => ({ label, href: `/toolkit/${id}` });
const node = (id: string, label: string): CompetencyLink => ({ label, href: `/path#node-${id}` });
const page = (href: string, label: string): CompetencyLink => ({ label, href });
// A control that does not exist keeps an unresolvable href, so competencyProblems
// names the cell and the id instead of the module failing to load.
const control = (id: string, label: string): CompetencyLink => {
  const row = controls.find((c) => c.id === id);
  return { label, href: row ? controlPath(row) : `/controls/unknown#${id}` };
};

export const competencyCells: readonly CompetencyCell[] = [
  // Intake and classification
  {
    workflow: 'intake-and-classification',
    rung: 1,
    can: 'Runs the intake for new systems: fills in the form, applies the existing risk tiers, and opens the registry entry and the impact assessment the tier requires.',
    evidence: 'Intake records with a tier, a linked registry entry and an impact assessment opened for each new system.',
    links: [
      pattern('use-case-intake-risk-tiering', 'Use-case intake and risk tiering'),
      tool('ai-act-triage', 'AI Act triage'),
      node('risk-tiers-intake', 'Path: risk tiers and intake'),
    ],
  },
  {
    workflow: 'intake-and-classification',
    rung: 2,
    can: 'Builds the intake path for one product area as code: a form that classifies, scaffolds the registry entry and routes the system to the controls its tier needs.',
    evidence: 'A versioned intake definition in the repository that creates a registry entry and the tier tasks on submit.',
    links: [
      bok('governing-development', 'the-use-case-record', 'Ch. 14: the use-case record'),
      tool('ai-register-entry', 'AI register entry'),
      tool('impact-assessment', 'Impact assessment'),
    ],
  },
  {
    workflow: 'intake-and-classification',
    rung: 3,
    can: 'Owns intake for every team: one risk taxonomy and one intake path that every team adopts as the standard template.',
    evidence: 'Every registry entry traced to an intake record, and median days from intake to go or no-go, by tier, computed from the intake workflow.',
    links: [
      pattern('use-case-intake-risk-tiering', 'Use-case intake and risk tiering'),
      bok('governance-program', 'kpis-and-kris-for-leadership-and-the-board', 'Ch. 12: KPIs and KRIs for the board'),
      node('risk-tiers-intake', 'Path: risk tiers and intake'),
    ],
  },
  {
    workflow: 'intake-and-classification',
    rung: 4,
    can: 'Decides how risk tiers map to required controls and who may change the mapping, so every workflow routes by the same rule.',
    evidence: 'A versioned tier-to-controls mapping with its change history, read by intake, gates and registry.',
    links: [
      pattern('use-case-intake-risk-tiering', 'Use-case intake and risk tiering'),
      bok('governance-program', 'policy-as-code-one-source-two-outputs', 'Ch. 12: policy as code, one source, two outputs'),
      node('stack-overview', 'Path: the five-layer stack'),
    ],
  },

  // Inventory and registry
  {
    workflow: 'inventory-and-registry',
    rung: 1,
    can: 'Registers models and agents correctly, with owner, scope, status and kill switch, and fixes the entries that discovery flags.',
    evidence: 'Registry entries with owner, scope, status and kill switch, and no open discovery mismatch assigned to them.',
    links: [
      pattern('agent-registry', 'Agent registry'),
      control('AIGE-CTL-AGENT-001', 'Control: registry entry'),
    ],
  },
  {
    workflow: 'inventory-and-registry',
    rung: 2,
    can: "Wires the registry to one product area's deploy pipeline so a deploy registers the system, and reconciles the registry against production.",
    evidence: 'A pipeline step that writes the registry entry on deploy, and a reconciliation job that reports unregistered systems.',
    links: [
      pattern('shadow-ai-discovery', 'Shadow AI discovery'),
      control('AIGE-CTL-DEPLOY-013', 'Control: shadow AI discovery and reconciliation'),
      node('agent-registry', 'Path: agent registry'),
    ],
  },
  {
    workflow: 'inventory-and-registry',
    rung: 3,
    can: 'Owns the inventory for the whole organisation: the registry is the path every team deploys through, and discovery covers the estate.',
    evidence: 'A deploy gate that refuses any system with no registry entry, and registry coverage and unregistered AI found computed from discovery across the estate.',
    links: [
      pattern('agent-registry', 'Agent registry'),
      pattern('shadow-ai-discovery', 'Shadow AI discovery'),
      bok('governance-program', 'kpis-and-kris-for-leadership-and-the-board', 'Ch. 12: registry coverage'),
    ],
  },
  {
    workflow: 'inventory-and-registry',
    rung: 4,
    can: 'Decides the identity model for non-human actors: what counts as an agent, what an owner and a scope are, and how credentials are issued.',
    evidence: 'A published identity model and registry schema that the controls of every workflow reference.',
    links: [
      control('AIGE-CTL-AGENT-002', 'Control: an agent has its own identity'),
      pattern('agent-identity-scoped-credentials', 'Agent identity and scoped credentials'),
      node('agent-identity', 'Path: agent identity'),
    ],
  },

  // Evals and red teaming as evidence
  {
    workflow: 'evals-and-red-teaming',
    rung: 1,
    can: 'Adds an eval to an existing suite, runs it in the existing harness and files the result.',
    evidence: 'A merged eval in the suite and a stored, timestamped result for it in the evidence store.',
    links: [
      node('eval-harness', 'Path: eval harness'),
      pattern('fairness-eval-suite', 'Fairness eval suite'),
    ],
  },
  {
    workflow: 'evals-and-red-teaming',
    rung: 2,
    can: 'Builds an eval suite for one system class and wires it into CI/CD as a gate that blocks a failing release, with the plan frozen before the first run.',
    evidence: 'A pipeline gate that has failed a build, with its frozen test plan and the failing run.',
    links: [
      pattern('eval-gate-in-ci', 'Eval gate in CI'),
      control('AIGE-CTL-ASSURE-001', 'Control: test plan frozen before evaluation'),
      control('AIGE-CTL-ASSURE-002', 'Control: release blocked below threshold'),
      pattern('adversarial-red-team-suite', 'Adversarial red-team suite'),
    ],
  },
  {
    workflow: 'evals-and-red-teaming',
    rung: 3,
    can: 'Owns evals across the organisation: the shared harness, the gate template other teams adopt, and the review of suite quality.',
    evidence: 'A standard gate template in use by several teams, and a quality measure tracked for every gating suite.',
    links: [
      bok('maturity-model', 'the-five-levels', 'Ch. 07: the five levels'),
      node('red-teaming', 'Path: red teaming'),
    ],
  },
  {
    workflow: 'evals-and-red-teaming',
    rung: 4,
    can: 'Decides what counts as a valid eval: the validity standard, how thresholds trace to failure modes, and who may change a threshold.',
    evidence: 'A written eval validity standard that every gate reads, the checks a run must pass before its result counts, and the rule for changing a threshold.',
    links: [
      control('AIGE-CTL-EVAL-009', 'Control: evaluation validity checks'),
      bok('governing-development', 'statistical-validity-of-evals', 'Ch. 14: statistical validity of evals'),
      node('threat-modelling', 'Path: threat modelling'),
    ],
  },

  // Policy-as-code and gates
  {
    workflow: 'policy-as-code-and-gates',
    rung: 1,
    can: 'Runs existing policies: updates a policy input, reads a gate decision and reports a block with its logged reason.',
    evidence: 'Gate decision logs with a reason for each block, and the policy input change in the repository.',
    links: [
      tool('policy-card', 'Policy card'),
      node('gates-admission', 'Path: gates and admission'),
    ],
  },
  {
    workflow: 'policy-as-code-and-gates',
    rung: 2,
    can: 'Turns one obligation into an executable policy in the pipeline of one product area, blocking the merge or the deploy when it fails.',
    evidence: 'A policy file with tests, evaluated in CI, and a blocked merge or deploy log that cites the rule.',
    links: [
      node('policy-as-code-opa', 'Path: policy-as-code with OPA'),
      pattern('policy-card', 'Policy card'),
      control('AIGE-CTL-DEPLOY-004', 'Control: go-live conditions as code'),
    ],
  },
  {
    workflow: 'policy-as-code-and-gates',
    rung: 3,
    can: 'Owns the policy library and the gates across the organisation: one policy repository, admission control, and the exception process teams follow.',
    evidence: 'A shared policy repository with owners and versioned releases, and each exception recorded with an expiry date.',
    links: [
      node('policy-cards', 'Path: policy cards'),
      bok('governance-program', 'risk-acceptance-and-exceptions', 'Ch. 12: risk acceptance and exceptions'),
      bok('governance-program', 'policy-as-code-one-source-two-outputs', 'Ch. 12: policy as code, one source, two outputs'),
    ],
  },
  {
    workflow: 'policy-as-code-and-gates',
    rung: 4,
    can: 'Decides where each rule is enforced (CI, admission or runtime) and how policy, gate and exception fit together across the five layers.',
    evidence: 'A reference enforcement map that gives each control class its enforcement point and its exception path.',
    links: [
      bok('maturity-model', 'observable-criteria-by-layer-and-level', 'Ch. 07: observable criteria by layer'),
      bok('the-stack', 'layer-01-govern-as-code', 'Ch. 04: layer 01, govern as code'),
    ],
  },

  // Runtime monitoring and incidents
  {
    workflow: 'runtime-monitoring-and-incidents',
    rung: 1,
    can: 'Runs existing monitors: triages guardrail and drift alerts, files incidents in the pipeline and takes part in kill-switch drills.',
    evidence: 'Triaged alerts, each closed with a reason or linked to the incident record it opened, and kill-switch drill records that name them as a participant.',
    links: [
      pattern('kill-switch-circuit-breaker', 'Kill switch and circuit breaker'),
      pattern('incident-pipeline', 'Incident pipeline'),
      control('AIGE-CTL-AGENT-011', 'Control: drilled kill switch'),
    ],
  },
  {
    workflow: 'runtime-monitoring-and-incidents',
    rung: 2,
    can: 'Instruments one product area: guardrail decisions and tool calls stream to observability, and alerts trigger the incident pipeline.',
    evidence: 'A dashboard fed by OpenTelemetry traces and an alert rule that opens an incident record.',
    links: [
      node('observability-otel', 'Path: observability with OpenTelemetry'),
      pattern('runtime-guardrail', 'Runtime guardrail'),
      control('AIGE-CTL-AGENT-007', 'Control: guardrail on every tool call'),
      pattern('drift-fairness-monitor', 'Drift and fairness monitor'),
    ],
  },
  {
    workflow: 'runtime-monitoring-and-incidents',
    rung: 3,
    can: 'Owns runtime monitoring and the incident process for the organisation: one detection-to-report path, one severity scale and tested reporting clocks.',
    evidence: 'A runbook with named owners, an incident clock exercised in a drill, and drill records for each high-risk system.',
    links: [
      tool('incident-clock', 'Incident clock'),
      control('AIGE-CTL-DEPLOY-011', 'Control: serious incident reporting clocks'),
      bok('incidents', 'playbooks-raci-and-drills', 'Ch. 17: playbooks, RACI and drills'),
    ],
  },
  {
    workflow: 'runtime-monitoring-and-incidents',
    rung: 4,
    can: 'Decides the incident path: how a signal becomes a record, which reports that record feeds, and who can suspend a system.',
    evidence: 'A reference incident record format and escalation path that detection, response and reporting all use.',
    links: [
      bok('incidents', 'one-record-many-reports', 'Ch. 17: one record, many reports'),
      control('AIGE-CTL-DEPLOY-012', 'Control: deactivation triggers and suspension'),
      pattern('deactivation-localisation-retirement-runbook', 'Deactivation and retirement runbook'),
    ],
  },

  // Assurance and audit evidence
  {
    workflow: 'assurance-and-audit-evidence',
    rung: 1,
    can: 'Produces evidence from controls others built: exports eval results, logs and registry state into the evidence store in the agreed format.',
    evidence: 'Evidence records in the store for each run, carrying a timestamp, a control id and a signature.',
    links: [
      control('AIGE-CTL-ASSURE-006', 'Control: observations filed against control ids'),
      node('logging-signing', 'Path: logging and signing'),
    ],
  },
  {
    workflow: 'assurance-and-audit-evidence',
    rung: 2,
    can: 'Builds the evidence step for one control in CI/CD, so the pipeline emits a signed, machine-readable artefact as a by-product of the build.',
    evidence: 'A pipeline step that emits a signed OSCAL or structured record on every run, stored under the control id.',
    links: [
      pattern('machine-readable-evidence-oscal', 'Machine-readable evidence in OSCAL'),
      control('AIGE-CTL-ASSURE-007', 'Control: machine-readable evidence in OSCAL'),
      node('oscal-evidence', 'Path: OSCAL evidence'),
    ],
  },
  {
    workflow: 'assurance-and-audit-evidence',
    rung: 3,
    can: 'Owns assurance across the organisation: the evidence store, live control status, and an internal audit answered by a query.',
    evidence: 'A live control-status view and an audit question answered from the store, with evidence freshness shown for each control.',
    links: [
      pattern('continuous-assurance-telemetry', 'Continuous assurance from telemetry'),
      control('AIGE-CTL-ASSURE-005', 'Control: live control status'),
      control('AIGE-CTL-ASSURE-009', 'Control: audit answered from the store'),
    ],
  },
  {
    workflow: 'assurance-and-audit-evidence',
    rung: 4,
    can: 'Decides the common evidence format and the retention rules that every workflow emits into.',
    evidence: 'A published evidence record schema and retention code that all pipelines validate against.',
    links: [
      control('AIGE-CTL-ASSURE-004', 'Control: common signed evidence record'),
      control('AIGE-CTL-ASSURE-008', 'Control: evidence retention code'),
    ],
  },

  // Regulatory translation
  {
    workflow: 'regulatory-translation',
    rung: 1,
    can: 'Traces one obligation to a control that already exists: finds the article in the register, then links the control and its evidence.',
    evidence: 'A mapping row from an obligation to an existing control and its evidence artefact, ready for a lawyer to review.',
    links: [
      page('/obligations', 'Obligation register'),
      tool('obligations-planner', 'Obligations planner'),
      node('law-reading', 'Path: law-reading'),
    ],
  },
  {
    workflow: 'regulatory-translation',
    rung: 2,
    can: 'Translates one article into a build, such as a gate, a registry field or an evidence artefact, agreed with a lawyer, and traces it back for the auditor.',
    evidence: 'A merged control whose description cites the article, and the trace from the article to its artefact.',
    links: [
      pattern('fria-as-code', 'FRIA as code'),
      node('fria-dpia-as-code', 'Path: FRIA and DPIA as code'),
    ],
  },
  {
    workflow: 'regulatory-translation',
    rung: 3,
    can: 'Owns translation across the organisation: the obligation register and the crosswalk stay current as law and frameworks change, and teams build from them.',
    evidence: 'A versioned crosswalk with a dated review for each framework, and controls built by other teams that cite obligation register entries.',
    links: [
      page('/resources/crosswalk', 'Crosswalk'),
      pattern('framework-crosswalk', 'Framework crosswalk'),
      node('framework-crosswalk', 'Path: framework crosswalk'),
    ],
  },
  {
    workflow: 'regulatory-translation',
    rung: 4,
    can: 'Decides the mapping model: how obligations, controls and evidence connect, so one control can serve several frameworks and a change shows what it touches.',
    evidence: 'A control-to-obligation schema where each control carries obligation ids, and a change lists the controls it affects.',
    links: [
      bok('regulatory-map', 'how-to-read-this-map', 'Ch. 08: how to read the map'),
      page('/resources/frameworks', 'Frameworks'),
    ],
  },
];

export const functionStatements: readonly FunctionStatement[] = [
  {
    can: 'Owns the AI governance engineering function and shares ownership of the controls with engineering.',
    evidence: 'Every gate and control in the repository names an engineering team as owner, and no gate is maintained by governance alone.',
  },
  {
    can: 'Sets the priorities of the function by realised risk reduction, not by the number of controls that stopped something.',
    evidence: 'A realised risk reduction indicator, the change in the rate of named failure modes in production, computed from live data and used to rank the work.',
  },
  {
    can: 'Decides which of the seven workflows the function builds itself and which engineering teams own, so the paved path of each has an owner.',
    evidence: 'A published ownership map of the seven workflows with a named owner for each.',
  },
  {
    can: 'Reports the state of AI governance to the board and the AI governance committee from the running systems, not from documents.',
    evidence: 'A one-page board pack generated by a query from live systems, with every figure traceable to its source data.',
  },
];

// --- invariants -----------------------------------------------------------

const MAX_CAN_WORDS = 40;
const MAX_EVIDENCE_WORDS = 30;
const EM_DASH = String.fromCharCode(0x2014);
const FORBIDDEN_EVIDENCE = /\b(certificate|certification|certified|years|self-assessment)\b/i;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** Every problem with the matrix, as readable lines. An empty list means it is sound. */
export function competencyProblems(): string[] {
  const problems: string[] = [];
  const workflowIds = new Set(workflows.map((w) => w.id));
  const nodeIds = new Set(nodes.map((n) => n.id));
  const controlPaths = new Set(controls.map((c) => controlPath(c)));

  if (rungs.map((r) => r.n).join() !== '1,2,3,4,5') problems.push('rungs must be numbered 1 to 5 in order');

  if (competencyCells.length !== 28) {
    problems.push(`expected 28 cells (7 workflows x 4 rungs), found ${competencyCells.length}`);
  }
  for (const w of workflows) {
    if (!skills.some((s) => s.area === workflowSkillArea[w.id])) {
      problems.push(`${w.id}: no skills area in role.ts for workflowSkillArea["${w.id}"]`);
    }
    for (const rung of [1, 2, 3, 4]) {
      const n = competencyCells.filter((c) => c.workflow === w.id && c.rung === rung).length;
      if (n === 0) problems.push(`${w.id}/r${rung}: cell is missing`);
      if (n > 1) problems.push(`${w.id}/r${rung}: ${n} cells for one pair`);
    }
  }

  const checkText = (at: string, c: { can: string; evidence: string }) => {
    if (!c.can.trim()) problems.push(`${at}: can is empty`);
    else if (words(c.can) > MAX_CAN_WORDS) problems.push(`${at}: can has ${words(c.can)} words, the limit is ${MAX_CAN_WORDS}`);
    if (!c.evidence.trim()) problems.push(`${at}: evidence is empty`);
    else if (words(c.evidence) > MAX_EVIDENCE_WORDS) {
      problems.push(`${at}: evidence has ${words(c.evidence)} words, the limit is ${MAX_EVIDENCE_WORDS}`);
    }
    const bad = c.evidence.match(FORBIDDEN_EVIDENCE);
    if (bad) problems.push(`${at}: evidence must be an artefact, not "${bad[0]}"`);
    if (c.can.includes(EM_DASH) || c.evidence.includes(EM_DASH)) problems.push(`${at}: contains an em dash`);
  };

  for (const cell of competencyCells) {
    const at = `${cell.workflow}/r${cell.rung}`;
    if (!workflowIds.has(cell.workflow)) problems.push(`${at}: workflow "${cell.workflow}" is not in role.ts`);
    checkText(at, cell);
    if (cell.links.length < 1 || cell.links.length > 4) {
      problems.push(`${at}: ${cell.links.length} links, expected 1 to 4`);
    }
    for (const link of cell.links) {
      const bad = (why: string) => problems.push(`${at}: link ${link.href} ${why}`);
      if (!link.label.trim()) bad('has no label');
      if (link.href.startsWith('/path#node-')) {
        if (!nodeIds.has(link.href.slice('/path#node-'.length))) bad('is not a node of /path');
      } else if (link.href.startsWith('/controls/')) {
        if (!controlPaths.has(link.href)) bad('is not a control of the profiles');
      } else {
        try {
          resolveAigpLink(link.href);
        } catch (e) {
          bad(`does not resolve: ${e instanceof Error ? e.message : String(e)}`);
        }
      }
    }
  }

  if (functionStatements.length < 3 || functionStatements.length > 6) {
    problems.push(`function band has ${functionStatements.length} statements, expected 3 to 6`);
  }
  functionStatements.forEach((s, i) => checkText(`function/${i + 1}`, s));

  return problems;
}
