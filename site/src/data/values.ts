// values.ts: the Thesis's definition, five problems, eight values, six
// principles and the "what AI governance engineers build" list, faithful to
// THESIS.md. Each value is stated as an affirmation using the Thesis's exact
// wording; notes flag which values are established engineering practice and which
// are new to AI.

export interface Value {
  /** 1-8. */
  n: number;
  /** The value, stated as an affirmation (exact wording of THESIS.md). */
  title: string;
  /** One sentence: what we build away from and why. */
  summary: string;
  /** Established engineering practice / new to AI. */
  note?: string;
}

export interface Principle {
  /** Principle number, 1-6. */
  n: number;
  /** The principle, stated as a rule of action. */
  title: string;
  /** One-to-two-sentence gloss, faithful to the Thesis. */
  summary: string;
}

export interface Problem {
  /** Problem number, 1-5. */
  n: number;
  /** The failure of legacy AI governance. */
  title: string;
  /** One-to-two-sentence summary, faithful to the Thesis. */
  summary: string;
}

const ESTABLISHED = 'Established engineering practice, applied to AI governance.';
const NEW = 'New: what AI forces us to add.';

/** The Thesis's one-sentence definition of the discipline. */
export const definition =
  'AI governance engineering is the application of engineering practice (systems thinking, product thinking and code) to the governance of AI systems.';

/** The five fundamental problems with legacy AI governance. */
export const problems: readonly Problem[] = [
  {
    n: 1,
    title: 'Governance written for systems that no longer exist',
    summary:
      'Legacy AI governance runs on PDF policies and spreadsheet inventories that describe an AI system as it was on the day it was reviewed, while models are retrained, prompts rewritten and agents given new tools by the day. The artefact is stale before it is signed, and the function still sits mostly with privacy, legal and IT, only 5% with security.',
  },
  {
    n: 2,
    title: 'Point-in-time review of a continuously changing thing',
    summary:
      'Annual assessments and committee sign-offs assume a system that holds still long enough to be judged; frontier models and autonomous agents do not. Gartner expects more than 40% of agentic AI projects to be cancelled by the end of 2027, citing inadequate risk controls, a runtime failure mode a once-a-year review is structurally blind to.',
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

/** The eight values, each stated as an affirmation (see THESIS.md / chapter 03). */
export const values: readonly Value[] = [
  {
    n: 1,
    title: 'Governance is code, not a document',
    summary:
      'Policy documents describe a control; code runs it, versioned and enforced without anyone remembering to, and only what runs can be measured.',
    note: ESTABLISHED,
  },
  {
    n: 2,
    title: 'Evals fail builds; reviews only recommend',
    summary:
      'A review can only recommend; an eval returns a verdict with consequences, and a failure blocks the release the system did not pass.',
    note: NEW,
  },
  {
    n: 3,
    title: 'Evidence comes from runtime, not from a point-in-time attestation',
    summary:
      'A point-in-time attestation says a control was in place when someone looked; runtime evidence shows it working continuously, emitted by the system as it runs.',
  },
  {
    n: 4,
    title: 'Every agent carries its own identity and scope',
    summary:
      'Shared credentials make an actor ungovernable; a distinct identity and a declared scope are what make its actions attributable and its access revocable.',
    note: NEW,
  },
  {
    n: 5,
    title: 'Evidence is machine-readable or it is not evidence',
    summary:
      'Screenshots and exported spreadsheets cannot be queried or verified at speed; only machine-readable artefacts turn the audit into a query.',
    note: ESTABLISHED,
  },
  {
    n: 6,
    title: 'Tooling must be inspectable and composable',
    summary:
      'A black box asks you to trust a verdict you cannot trace; inspectable, composable tooling lets you follow the decision and wire it into your own pipeline.',
  },
  {
    n: 7,
    title: 'Success is measured in realised risk reduction, not framework coverage',
    summary:
      'Framework coverage proves you have read the framework, not that any risk fell; success is the failure mode dropping, the blast radius shrinking, the incident caught earlier.',
    note: ESTABLISHED,
  },
  {
    n: 8,
    title: 'Governance is owned with engineering, not enforced from outside',
    summary:
      'Gatekeeping from outside is a bottleneck engineers route around; governance owned jointly with engineering becomes the paved path, part of how things are made.',
  },
] as const;

/** The six principles: rules of action, not restatements of the values. */
export const principles: readonly Principle[] = [
  {
    n: 1,
    title: 'Build the control at the earliest point it can block',
    summary:
      'Put every control where it can still stop the thing going wrong, and no later: in the repository, the build and the runtime, not in a review after the fact. The earliest enforceable point is the cheapest and the strongest.',
  },
  {
    n: 2,
    title: 'Give every control teeth, or call it a signal',
    summary:
      'A control has to be able to change what happens next: block a merge, fail a deploy, revoke access. Anything that can only inform a committee is a signal, and we label it honestly as one rather than dress it up as a control.',
  },
  {
    n: 3,
    title: 'Register and bound every actor before it acts',
    summary:
      'Nothing, human or non-human, gets to act until it has an owner, a declared scope and a way to be stopped. Autonomy is granted only where it can be attributed, contained and withdrawn, never by default.',
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
      "Design each control against a specific way the system fails (prompt injection, tool misuse, agent identity abuse, data exfiltration) or a specific harm to a person's rights. If we cannot name the risk it answers, we do not build it.",
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
  'Policy-as-code: governance rules as executable policy (OPA/Rego, Cedar, Policy Cards) that evaluate in CI/CD and at runtime.',
  'An agent registry: the runtime-aware inventory of every model, service and agent, each with an owner, a scope and a status.',
  'AIBOM and model/data cards: the bill of materials for an AI system (CycloneDX ML-BOM, SPDX 3.0 AI profile) and structured transparency documentation.',
  'Eval gates in CI: adversarial and capability evals (Inspect, promptfoo, Garak, Giskard) wired into the pipeline so a failing eval blocks the release.',
  'Runtime guardrails and kill switches: input/output controls, tool-call mediation and a tested way to stop an agent, at the point of action.',
  'Continuous assurance telemetry: tracing and monitoring (OpenTelemetry, agent observability) that turns production behaviour into a live control signal.',
  'Machine-readable evidence: OSCAL and signed, structured artefacts that make the audit a query instead of a scramble.',
  "Incident pipelines: the plumbing to detect, triage and report serious incidents on the clock, including the EU AI Act's Article 73 reporting for high-risk systems.",
  'FRIA and DPIA templates as code: fundamental-rights and data-protection impact assessments maintained as versioned, reviewable artefacts, not one-off documents.',
] as const;
