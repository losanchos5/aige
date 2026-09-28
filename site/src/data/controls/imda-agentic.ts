// controls/imda-agentic.ts: cross-references from the reference controls to
// Singapore's Model AI Governance Framework for Agentic AI, v1.5 (IMDA,
// published 2026-05-20, updated 2026-06-05). A cross-reference, not a
// derivation: like the AIUC-1 ids, an entry is set only where the IMDA text,
// read on 2026-09-28 with every quote checked against the page it cites, covers
// the control's objective, and it adds nothing to the control itself.
//
// - `fit: 'direct'`: IMDA recommends the same mechanism in its own text.
// - `fit: 'partial'`: IMDA covers part of it, only in a case study, or only
//   names the risk; `note` says which part is missing.
// - `ref` is IMDA's section and printed page (which equals the PDF page).
// - `obligations` (direct fits only) joins the two register rows for the
//   framework, AIGE-OBL-SG-AGENTIC-IDENTITY and -CHECKPOINTS.
//
// IMDA never uses the words "kill switch", "circuit breaker" or "registry":
// notes quote its own wording ("take agents offline", "stop agent workflow and
// escalate", "catalogued and centrally managed"). `withImdaAgentic` (applied by
// ./index.ts to every control) adds the source to `references`, one entry to
// `mappings.other` and the obligations, without duplicating any of them.
import type { Control } from './index';
import { IMDA_AGENTIC } from '../../lib/sources';

/** The name the controls crosswalk shows for the framework (one spelling). */
export const IMDA_AGENTIC_FRAMEWORK = 'IMDA MGF for Agentic AI v1.5';

export interface ImdaXref {
  fit: 'direct' | 'partial';
  /** Section and page, e.g. '2.1.2 Agent identity, p.23'. */
  ref: string;
  note: string;
  obligations?: readonly string[];
}

export const imdaAgenticXrefs: Readonly<Record<string, ImdaXref>> = {
  'AIGE-CTL-EVAL-001': { fit: 'partial', ref: '2.3.2 Before deploying, test agents, p.38', note: 'IMDA addresses deployed agents; for test environments it only asks to calibrate realism against real-world tool access' },
  'AIGE-CTL-EVAL-002': { fit: 'partial', ref: '2.1.2 Agent limits, p.19', note: 'Limited network access for high-risk tasks; no egress allow-list' },
  'AIGE-CTL-EVAL-003': { fit: 'direct', ref: '2.1.2 Agent identity, p.24', note: 'Short-lived, own-identity credentials match "time- or session-bound, non-transferable"', obligations: ['AIGE-OBL-SG-AGENTIC-IDENTITY'] },
  'AIGE-CTL-EVAL-004': { fit: 'direct', ref: '2.3.1 During design and development, use technical controls, p.33', note: 'A mediation point outside the model is the "tool layer" access control IMDA prefers to prompt-layer rules', obligations: ['AIGE-OBL-SG-AGENTIC-CHECKPOINTS'] },
  'AIGE-CTL-EVAL-005': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Log immutability and step-level tracing; IMDA does not address the agent itself disabling or altering its monitors' },
  'AIGE-CTL-EVAL-006': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Halting execution on high-priority alerts; stop conditions defined before a run appear only in the Cyber Sierra case (three iterations, then terminate)' },
  'AIGE-CTL-EVAL-007': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Failed trajectories preserved for analysis; freezing before remediation is not stated' },
  'AIGE-CTL-EVAL-008': { fit: 'partial', ref: '2.3 Implement technical controls and processes (introduction), p.33', note: 'Version control across the lifecycle; hashing harness and configuration to tie a result to what was run is not stated' },
  'AIGE-CTL-EVAL-009': { fit: 'partial', ref: '2.3.2 Before deploying, test agents, p.38', note: 'Evaluating the path as well as the answer, and the difficulty of evaluating at scale; checks that scoring worked are not stated' },
  'AIGE-CTL-AGENT-001': { fit: 'direct', ref: '2.1.2 Agent identity, p.23', note: 'The control\'s registry entry plays the part of the centralised system IMDA asks to issue and track agent identities and their permissions', obligations: ['AIGE-OBL-SG-AGENTIC-IDENTITY'] },
  'AIGE-CTL-AGENT-002': { fit: 'direct', ref: '2.1.2 Agent identity, p.23', note: 'Unique, verifiable, attributable identity per agent', obligations: ['AIGE-OBL-SG-AGENTIC-IDENTITY'] },
  'AIGE-CTL-AGENT-003': { fit: 'partial', ref: '1.1.3 How agent design affects the limits and capabilities of each agent, p.9', note: 'IMDA\'s "Agent proposes, human operates" level matches the control\'s Operator level; IMDA does not itself tie that level to read-only tools' },
  'AIGE-CTL-AGENT-004': { fit: 'direct', ref: '2.3.3 Continuous testing and monitoring, p.43', note: 'Tracing each step and agent-to-agent interaction; logging the plan and reasoning' },
  'AIGE-CTL-AGENT-005': { fit: 'direct', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Least-privilege tool sets enforced by access control; "Denying action by default" for actions without an approval policy (p.30)' },
  'AIGE-CTL-AGENT-006': { fit: 'direct', ref: '1.1.3 How agent design affects the limits and capabilities of each agent, p.9', note: 'IMDA\'s "Agent and human collaborate" level uses the same example: approval before writing to a database', obligations: ['AIGE-OBL-SG-AGENTIC-CHECKPOINTS'] },
  'AIGE-CTL-AGENT-007': { fit: 'direct', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Runtime controls that intervene during execution' },
  'AIGE-CTL-AGENT-008': { fit: 'partial', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Rate limits and alerts on too many repeated tool calls; step, token, spend and time budgets that trip a breaker are not stated' },
  'AIGE-CTL-AGENT-009': { fit: 'direct', ref: '2.2.2 Design for meaningful human oversight, p.30', note: 'Override rate and response time as oversight metrics; deny by default when approvers are unreachable. IMDA also asks that approval requests avoid "long logs or raw data" (p.29), so p.29 does not support showing the approver the raw call', obligations: ['AIGE-OBL-SG-AGENTIC-CHECKPOINTS'] },
  'AIGE-CTL-AGENT-010': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Halting one agent\'s execution on an alert; the per-agent breaker at the gateway is not described' },
  'AIGE-CTL-AGENT-011': { fit: 'partial', ref: '2.1.2 Agent limits, p.19', note: 'Mechanisms to take agents offline; IMDA never says "kill switch" and does not mention drills or time-to-stop' },
  'AIGE-CTL-AGENT-012': { fit: 'direct', ref: '2.2.2 Design for meaningful human oversight, p.30', note: 'Anomalous trajectories flagged, then stop and escalate' },
  'AIGE-CTL-AGENT-013': { fit: 'direct', ref: '2.3.2 Before deploying, test agents, p.38', note: 'Path and answer evaluated, including tool calling and policy compliance' },
  'AIGE-CTL-AGENT-014': { fit: 'partial', ref: '1.1.3 How agent design affects the limits and capabilities of each agent, p.10', note: 'IMDA\'s "Agent operates, human observes" level matches the Observer level; restricting it to reversible actions appears only in the Dayos case (p.18)' },
  'AIGE-CTL-AGENT-015': { fit: 'direct', ref: '2.2.2 Design for meaningful human oversight, p.29', note: 'Same four checkpoint kinds as IMDA (high-stakes, irreversible, outlier, user-defined) and the same fail-closed rule', obligations: ['AIGE-OBL-SG-AGENTIC-CHECKPOINTS'] },
  'AIGE-CTL-AGENT-016': { fit: 'direct', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Listed under MCP servers in the 2.3.1 table; self-contained environments for code execution in 2.1.2' },
  'AIGE-CTL-AGENT-017': { fit: 'partial', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Filtering sensitive data at the MCP layer; no egress bound per tool' },
  'AIGE-CTL-AGENT-018': { fit: 'direct', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Admission by whitelist; first-use trust verification in the Tencent case' },
  'AIGE-CTL-AGENT-019': { fit: 'partial', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Whitelisted servers and sandboxing; the GovTech case connects to whitelisted MCP servers from a containerised sandbox' },
  'AIGE-CTL-AGENT-020': { fit: 'partial', ref: '2.1.2 Agent identity, p.23', note: 'Mentioned as a solution being developed, not as a recommendation' },
  'AIGE-CTL-AGENT-021': { fit: 'direct', ref: '2.1.2 Agent identity, p.24', note: '"time- or session-bound, non-transferable" authorisations', obligations: ['AIGE-OBL-SG-AGENTIC-IDENTITY'] },
  'AIGE-CTL-AGENT-022': { fit: 'direct', ref: '2.1.2 Agent identity, p.24', note: 'Permissions never above the authorising human, delegations recorded, capacity (own or on behalf of a user) recorded', obligations: ['AIGE-OBL-SG-AGENTIC-IDENTITY'] },
  'AIGE-CTL-AGENT-023': { fit: 'partial', ref: '2.3.1 During design and development, use technical controls, p.34', note: 'Memory poisoning as a threat and limits on shared memory; no write gate or rollback' },
  'AIGE-CTL-AGENT-024': { fit: 'partial', ref: '2.1.1 Determine suitable use cases for agent deployment, p.15', note: 'Persistent memory of sensitive data raises risk; no retention windows or erasure path' },
  'AIGE-CTL-AGENT-025': { fit: 'partial', ref: '2.1.2 Agent identity, p.23', note: 'IMDA names recursive delegation as a gap in current identity systems and asks for structured inter-agent messages and agent-to-agent tracing; scope narrowing per hop is not stated' },
  'AIGE-CTL-AGENT-026': { fit: 'partial', ref: '2.2.1 Clear allocation of responsibilities within and outside the organisation, p.28', note: 'Third-party agents contained or scoped down, obligations in contracts; the MSD case restricts vendor agents to their own ecosystems' },
  'AIGE-CTL-AGENT-027': { fit: 'partial', ref: '2.2.1 Clear allocation of responsibilities within and outside the organisation, p.26', note: 'Limits on data access defined by leaders; no data classes on the registry entry and no DPIA link' },
  'AIGE-CTL-AGENT-028': { fit: 'partial', ref: '2.3.3 Robust change management, p.45', note: 'Tension: IMDA lets "prompt refinements" follow "lighter review processes"; the control puts every prompt change through the regression suite and a canary' },
  'AIGE-CTL-AGENT-029': { fit: 'direct', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'IMDA names OpenTelemetry for tracing tool calls' },
  'AIGE-CTL-AGENT-031': { fit: 'direct', ref: '2.4.2 Users who interact with agents, p.47', note: 'Tell users at the point of interaction that they are dealing with an agent' },
  'AIGE-CTL-ASSURE-001': { fit: 'partial', ref: '2.3.2 Before deploying, test agents, p.38', note: 'Repeated runs and varied datasets; freezing the plan before evaluation is not stated' },
  'AIGE-CTL-ASSURE-002': { fit: 'partial', ref: '2.3.2 Before deploying, test agents, p.38', note: 'Test before deployment; no threshold that blocks the release' },
  'AIGE-CTL-ASSURE-008': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Audit trails kept "for analysis and compliance purposes"; no retention periods' },
  'AIGE-CTL-DEPLOY-001': { fit: 'partial', ref: '2.1.1 Determine suitable use cases for agent deployment, p.15', note: 'Use-case suitability against benefits and the deterministic alternative; no deployment decision record' },
  'AIGE-CTL-DEPLOY-002': { fit: 'partial', ref: '2.2.1 Clear allocation of responsibilities within and outside the organisation, p.28', note: 'Disclosures from external parties on capabilities and data handling; not instructions for use in the EU AI Act sense' },
  'AIGE-CTL-DEPLOY-003': { fit: 'direct', ref: '2.2.2 Design for meaningful human oversight, p.30', note: 'Trained overseers with domain expertise', obligations: ['AIGE-OBL-SG-AGENTIC-CHECKPOINTS'] },
  'AIGE-CTL-DEPLOY-004': { fit: 'partial', ref: '2.1.2 Evaluating the residual risks, p.24', note: 'Residual risk evaluated and accepted; no go-live record with conditions' },
  'AIGE-CTL-DEPLOY-005': { fit: 'partial', ref: '2.3.3 Gradual deployment of agents, p.42', note: 'IMDA stages by users, tools and systems rather than by traffic (shadow, pilot, canary), and says nothing about rollback criteria' },
  'AIGE-CTL-DEPLOY-006': { fit: 'partial', ref: '2.3 Implement technical controls and processes (introduction), p.33', note: 'Version control and monitoring for model changes; no pinning or tested path back' },
  'AIGE-CTL-DEPLOY-007': { fit: 'direct', ref: '2.3.3 Robust change management, p.45', note: 'Change-review triggers, including autonomy adjustments, and immediate re-risk assessment for critical changes' },
  'AIGE-CTL-DEPLOY-008': { fit: 'direct', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Alert thresholds with a defined intervention per alert type' },
  'AIGE-CTL-DEPLOY-010': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Logs must not be deletable; IMDA sets no retention period' },
  'AIGE-CTL-DEPLOY-012': { fit: 'partial', ref: '2.3.3 Continuous testing and monitoring, p.44', note: 'Termination, fallback and halting; no runbook, no named deciding role, no log freeze' },
  'AIGE-CTL-DEPLOY-013': { fit: 'partial', ref: '1.2.3 Systemic and multi-agent risks, p.12', note: 'Sprawl named as a risk; discovery of uncatalogued agents is not described' },
  'AIGE-CTL-DEPLOY-014': { fit: 'partial', ref: '2.4.3 Users who integrate agents into their work processes, p.47', note: 'Usage restrictions taught to users; no staff-facing gateway' },
  'AIGE-CTL-DEPLOY-015': { fit: 'partial', ref: '2.1.2 Agent identity, p.23', note: 'Removing identities no longer required, and manual continuity if agents become unavailable; no retirement runbook' },
};

const fitLabel = { direct: 'Direct fit', partial: 'Partial fit' } as const;

/** The control with its IMDA cross-reference, if it has one. */
export function withImdaAgentic(control: Control): Control {
  const x = imdaAgenticXrefs[control.id];
  if (!x) return control;
  const references = control.references.some((r) => r.url === IMDA_AGENTIC.url)
    ? control.references
    : [...control.references, IMDA_AGENTIC];
  const obligations = [
    ...control.mappings.obligations,
    ...(x.obligations ?? []).filter((id) => !control.mappings.obligations.includes(id)),
  ];
  return {
    ...control,
    references,
    mappings: {
      ...control.mappings,
      obligations,
      other: [
        ...(control.mappings.other ?? []),
        { framework: IMDA_AGENTIC_FRAMEWORK, ref: x.ref, note: `${fitLabel[x.fit]}: ${x.note}` },
      ],
    },
  };
}
