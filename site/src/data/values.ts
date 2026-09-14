// values.ts: the manifesto's definition, five problems, eight values, six
// principles and the "what AI governance engineers build" list, faithful to
// MANIFESTO.md. The eight "X over Y" pairs use the manifesto's exact wording;
// notes flag which values are inherited from GRC engineering and which are new.

export interface Value {
  /** The item we value more (the left-hand side). */
  over: string;
  /** The item we still use but build away from (the right-hand side). */
  under: string;
  /** Whether the value is inherited from GRC engineering or new to AI. */
  note?: string;
}

export interface Principle {
  /** Principle number, 1-6. */
  n: number;
  /** The principle, stated as a rule of action. */
  title: string;
  /** One-to-two-sentence gloss, faithful to the manifesto. */
  summary: string;
}

export interface Problem {
  /** Problem number, 1-5. */
  n: number;
  /** The failure of legacy AI governance. */
  title: string;
  /** One-to-two-sentence summary, faithful to the manifesto. */
  summary: string;
}

const INHERITED = 'Inherited from GRC engineering.';
const NEW = 'New: what AI forces us to add.';

/** The manifesto's one-sentence definition of the discipline. */
export const definition =
  'AI governance engineering is the application of engineering practice — systems thinking, product thinking and code — to the governance of AI systems.';

/** The five fundamental problems with legacy AI governance. */
export const problems: readonly Problem[] = [
  {
    n: 1,
    title: 'Governance written for systems that no longer exist',
    summary:
      'Legacy AI governance runs on PDF policies and spreadsheet inventories that describe an AI system as it was on the day it was reviewed, while models are retrained, prompts rewritten and agents given new tools by the day. The artefact is stale before it is signed — and the function still sits mostly with privacy, legal and IT, only 5% with security.',
  },
  {
    n: 2,
    title: 'Point-in-time review of a continuously changing thing',
    summary:
      'Annual assessments and committee sign-offs assume a system that holds still long enough to be judged; frontier models and autonomous agents do not. Gartner expects more than 40% of agentic AI projects to be cancelled by the end of 2027, citing inadequate risk controls — a runtime failure mode a once-a-year review is structurally blind to.',
  },
  {
    n: 3,
    title: 'Governance as a gate at the end, not a property of the build',
    summary:
      'Governance arrives after the model is trained, as a checkpoint to clear before launch, and engineers experience it as a tax collected at the door. A policy that can only recommend cannot stop a bad release; an eval that can fail the build can.',
  },
  {
    n: 4,
    title: 'Framework theatre',
    summary:
      'Mapping to NIST AI RMF or ISO/IEC 42001 becomes the end state instead of the starting point, and a green mapping matrix is mistaken for a working control. Coverage is not assurance: a crosswalk proves you have read the framework, not that the control it points to actually fires.',
  },
  {
    n: 5,
    title: 'No runtime data path',
    summary:
      'The registry does not know what is running; most of the AI governance platform category manages the program without any runtime data path. So the three questions that define the discipline go unanswered, because nothing is connected to production.',
  },
] as const;

/** The eight values: the items on the left, valued over the items on the right. */
export const values: readonly Value[] = [
  { over: 'Governance-as-code', under: 'policy documents', note: INHERITED },
  {
    over: 'Evals that can fail the build',
    under: 'reviews that can only recommend',
    note: NEW,
  },
  { over: 'Runtime evidence', under: 'point-in-time attestations' },
  { over: 'Agent identity and scope', under: 'shared credentials', note: NEW },
  { over: 'Machine-readable evidence', under: 'screenshots', note: INHERITED },
  { over: 'Inspectable, composable tooling', under: 'black boxes' },
  { over: 'Measured risk reduction', under: 'framework coverage', note: INHERITED },
  { over: 'Shared ownership with engineering', under: 'gatekeeping' },
] as const;

/** The six principles: rules of action, not restatements of the values. */
export const principles: readonly Principle[] = [
  {
    n: 1,
    title: 'Build the control at the earliest point it can block',
    summary:
      'Put every control where it can still stop the thing going wrong, and no later — in the repository, the build and the runtime, not in a review after the fact. The earliest enforceable point is the cheapest and the strongest.',
  },
  {
    n: 2,
    title: 'Give every control teeth, or call it a signal',
    summary:
      'A control has to be able to change what happens next — block a merge, fail a deploy, revoke access. Anything that can only inform a committee is a signal, and we label it honestly as one rather than dress it up as a control.',
  },
  {
    n: 3,
    title: 'Register and bound every actor before it acts',
    summary:
      'Nothing — human or non-human — gets to act until it has an owner, a declared scope and a way to be stopped. Autonomy is granted only where it can be attributed, contained and withdrawn, never by default.',
  },
  {
    n: 4,
    title: 'Instrument the build to produce its own proof',
    summary:
      'Wire each control to emit its own record as it runs, so assurance falls out of the system instead of being assembled by hand. If demonstrating a control needs a screenshot, we have not finished building it.',
  },
  {
    n: 5,
    title: 'Start from a named failure mode or a named harm',
    summary:
      "Design each control against a specific way the system fails — prompt injection, tool misuse, agent identity abuse, data exfiltration — or a specific harm to a person's rights. If we cannot name the risk it answers, we do not build it.",
  },
  {
    n: 6,
    title: 'Make the governed path the easiest path',
    summary:
      'Ship governance as tooling, templates and paved paths engineers adopt without asking permission, and measure adoption. If routing around the governance is easier than using it, we fix the product, not the people.',
  },
] as const;

/** What AI governance engineers build — working artefacts, not decks. */
export const builds: readonly string[] = [
  'Policy-as-code — governance rules as executable policy (OPA/Rego, Cedar, Policy Cards) that evaluate in CI/CD and at runtime.',
  'An agent registry — the runtime-aware inventory of every model, service and agent, each with an owner, a scope and a status.',
  'AIBOM and model/data cards — the bill of materials for an AI system (CycloneDX ML-BOM, SPDX 3.0 AI profile) and structured transparency documentation.',
  'Eval gates in CI — adversarial and capability evals (Inspect, promptfoo, Garak, Giskard) wired into the pipeline so a failing eval blocks the release.',
  'Runtime guardrails and kill switches — input/output controls, tool-call mediation and a tested way to stop an agent, at the point of action.',
  'Continuous assurance telemetry — tracing and monitoring (OpenTelemetry, agent observability) that turns production behaviour into a live control signal.',
  'Machine-readable evidence — OSCAL and signed, structured artefacts that make the audit a query instead of a scramble.',
  "Incident pipelines — the plumbing to detect, triage and report serious incidents on the clock, including the EU AI Act's Article 73 reporting for high-risk systems.",
  'FRIA and DPIA templates as code — fundamental-rights and data-protection impact assessments maintained as versioned, reviewable artefacts, not one-off documents.',
] as const;
