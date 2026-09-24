// figures.ts: the typed manifest of the hand-made conceptual infographics under
// src/figures/<id>.svg. Each entry names a figure, its two-sentence caption and
// its text alternative, and where in the Body of Knowledge it is placed:
// reusing the placement type and text-matching rules of the interactive archify
// diagrams (src/data/diagrams.ts). The figures are inlined into the chapters at
// Markdown-compile time by src/lib/rehype-diagrams.ts, wrapped in
// <figure class="figure figure--infographic">; the same figures can be dropped
// onto an editorial page with <Figure> (src/components/Figure.astro).
//
// Content comes only from the chapters and the typed data modules (values.ts,
// stack.ts, maturity.ts, patterns.ts) and from the binding visual brief in
// site/VISUAL-GUIDE.md; a figure never adds a fact, number, date or vendor the
// chapter does not state. `alt` is the SVG's one-sentence accessible name/desc;
// `description` is the fuller text alternative rendered in a <details> under the
// figure, in the chapter's own words.
//
// Three figures (values-principles, pattern-map, discipline-map) are generated
// from data by scripts/figures-build.mjs; the rest are hand-authored.
// discipline-map is the whole "map of the discipline" (scripts/map-build.mjs):
// it carries no chapter placement (placements: []) because it lives on /map, and
// it is exempt from the usual figure budget: see VISUAL-GUIDE.md §2.4.
// reading-paths lives on the /bok index page (src/pages/bok/index.astro), not
// here, because it has no chapter placement and is rendered as accessible HTML.
//
// Every entry is also citable and reusable: it gets a permalink page at
// /figures/<id> and, at build, standalone SVG and PNG exports with an
// attribution band under /downloads/figures/ (file names from figureExports).
// Dated content carries `asOf` (printed inside the image) and `reviewBy`. New
// figures are appended at the END of the array.

import type { DiagramPlacement } from './diagrams';

/** What kind of figure it is; sets its size budget (VISUAL-GUIDE.md §1.12, §5). */
export type FigureKind = 'infographic' | 'data-viz' | 'poster';

/** Size budget in KB of the inline SVG, per kind (enforced by figures-build.mjs). */
export const figureBudgetKb: Readonly<Record<FigureKind, number>> = {
  infographic: 12,
  'data-viz': 12,
  poster: 48,
};

/** Licence of every figure unless an entry says otherwise (matches site.ts). */
export const DEFAULT_FIGURE_LICENSE = 'CC BY 4.0';

/**
 * The HTML table that stands in for a data-viz figure (VISUAL-GUIDE.md §4): the
 * same numbers the chart draws, a caption and the source line. Rendered on the
 * figure's permalink page; every value must already be in the chapter.
 */
export interface FigureTable {
  /** Table caption: what the rows are. */
  caption: string;
  /** Column headers, left to right. */
  columns: readonly string[];
  /** One array of cell strings per row, in column order. */
  rows: readonly (readonly string[])[];
  /** Source line, e.g. "Chapter 17, sources [3] and [4]". */
  source: string;
}

export interface FigureDef {
  /** Figure id: matches src/figures/<id>.svg. */
  id: string;
  /** Short title (≤ 6 words) shown in the figcaption. */
  title: string;
  /** Two-sentence caption: what it shows, then what the reader does with it;
   *  ends "Drawn from chapter NN." (see VISUAL-GUIDE.md §1.2). */
  caption: string;
  /** One-sentence accessible name/description (the SVG <desc>). */
  alt: string;
  /** Fuller text alternative rendered in a <details>, in the chapter's words. */
  description: string;
  /** Where in the BoK the figure is inserted (matched by heading text). */
  placements: readonly DiagramPlacement[];
  /** Kind of figure (default 'infographic'); sets the size budget. */
  kind?: FigureKind;
  /** Site paths outside the chapters that show the figure (e.g. '/map'). */
  pages?: readonly string[];
  /**
   * YYYY-MM-DD on which the dated content (deadlines, statuses, counts) was
   * last checked against its chapter. Set it on every figure whose content can
   * go stale: the SVG itself must then print "As of <asOf>" (the build fails
   * otherwise), so a download never travels without its date.
   */
  asOf?: string;
  /** YYYY-MM-DD by which a dated figure must be re-checked; the build warns
   *  once it has passed. */
  reviewBy?: string;
  /** Licence label when it is not DEFAULT_FIGURE_LICENSE. */
  license?: string;
  /** Table fallback for a data-viz figure (required when kind is 'data-viz'). */
  data?: FigureTable;
}

export const figures: readonly FigureDef[] = [
  {
    id: 'three-questions',
    title: 'The three questions',
    caption:
      'The three questions every AI governance function must answer from live systems, and the stack layers that answer each. If you cannot answer one of them for a system today, that is your first task. Drawn from chapter 01.',
    alt: 'Three panels (what AI is running, what it is allowed to do, and what evidence proves it), each with the stack layers that answer it.',
    description:
      'Three panels, one per question. What AI is running? Answered by Layer 02 Inventory & Transparency: the inventory and the agent registry, fed by a runtime data path. What is it allowed to do? Answered by Layer 01 Govern-as-Code and Layer 04 Runtime Controls & Observability: identity before autonomy, scope before action. What evidence proves it? Answered by Layer 03 Evals & Red Teaming as Evidence and Layer 05 Assurance & Continuous Compliance: evidence as a by-product of the build.',
    placements: [{ chapter: 'definition', section: 'The three questions', at: 'head' }],
  },
  {
    id: 'values-principles',
    title: 'Values and principles',
    caption:
      'The eight values, stated as affirmations, and the six principles, stated as commitments, verbatim from the Thesis. Quote them, do not reword them, when you write your own policy. Drawn from chapter 03.',
    alt: 'Two groups: the eight values as affirmations of which way to lean, and the six principles as commitments to act.',
    description:
      'Two groups. Eight values, each stated as an affirmation of which way to lean, from "Governance is code, not a document" to "Governance is owned with engineering, not enforced from outside". Six principles, each a commitment to act, from "Build the control at the earliest point it can block" to "Make the governed path the easiest path". Both are set out verbatim in the sections that follow.',
    placements: [
      { chapter: 'values-and-principles', section: 'The eight values', at: 'head' },
    ],
  },
  {
    id: 'minimum-viable-stack',
    title: 'The minimum viable stack',
    caption:
      'The five ordered steps that stand the whole stack up thinly, one per layer, for a team of one. Do step one this week. Drawn from chapter 04.',
    alt: 'Five ordered steps (see it, rule it, test it, contain it, prove it), one per stack layer, chained top to bottom.',
    description:
      'Five ordered steps for a team of one, in the order see it, rule it, test it, contain it, prove it. Step 1, Layer 02: a registry a deploy writes to, with an owner and a scope per entry. Step 2, Layer 01: one policy with teeth, as code, in the pipeline, blocking on failure. Step 3, Layer 03: one adversarial eval against your highest-risk agent, wired so a regression fails the build. Step 4, Layer 04: every agent under its own identity with a scope, and a tested way to stop it. Step 5, Layer 05: each of the above emits a structured, timestamped record into one store.',
    placements: [
      {
        chapter: 'the-stack',
        section: 'The minimum viable stack for a team of one',
        at: 'head',
      },
    ],
  },
  {
    id: 'maturity-grid',
    title: 'The maturity grid',
    caption:
      'The five levels across the five stack layers, with an illustrative profile whose weakest layer sets the overall level. Assess each layer separately, then read the floor. Drawn from chapter 07.',
    alt: 'A five-by-five grid of stack layers against maturity levels, with an illustrative profile whose weakest layer sets the overall level.',
    description:
      'A five-by-five grid: the five stack layers as rows, in canonical order, and the five levels (Documented, Inventoried, Tested, Enforced, Continuous) as columns. The fill is illustrative: a function with inventory at Level 4, evals at Level 2 and assurance at Level 3, where the weakest layer, evals at Level 2, sets the overall level at Level 2, Inventoried. Assess each layer separately, then read the floor.',
    placements: [
      {
        chapter: 'maturity-model',
        section: 'Observable criteria, by layer and level',
        at: 'head',
      },
    ],
  },
  {
    id: 'art73-clock',
    title: 'The Article 73 clock',
    caption:
      'The serious-incident reporting windows for high-risk systems, by incident class, and the pipeline that meets them. Your pipeline must classify the incident before it can report. Drawn from chapter 08, as of 2026-09-24.',
    alt: 'The Article 73 serious-incident reporting windows by incident class (2, 10 and no later than 15 days), with the incident pipeline that meets them.',
    description:
      'The serious-incident reporting windows for high-risk systems under Article 73, by incident class. A widespread infringement: 2 days. On the death of a person: 10 days. Otherwise: no later than 15 days. The engineering artefact that meets them is the incident detection and triage pipeline with reporting-clock automation and evidence capture, which must classify the incident before it can report.',
    placements: [
      { chapter: 'regulatory-map', section: 'EU AI Act, post-Omnibus', at: 'foot' },
    ],
    // Statutory deadlines: dated, and re-checked with chapter 08's next date pass.
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
  },
  {
    id: 'pattern-map',
    title: 'The pattern map',
    caption:
      'Every pattern in the catalogue, placed on the five stack layers it lives in, as links. Start from the layer you are weakest in and open its patterns. Drawn from chapter 05.',
    alt: 'Five bands, one per stack layer in canonical order, each holding the patterns whose home layer it is, as links.',
    description:
      'Five bands, one per stack layer in canonical order (Govern-as-Code, Inventory & Transparency, Evals & Red Teaming as Evidence, Runtime Controls & Observability, Assurance & Continuous Compliance), each holding the patterns whose home layer it is, as links to the pattern in this chapter. A pattern that maps to two layers appears once, in its first layer, marked with its second.',
    placements: [{ chapter: 'patterns', at: 'lead' }],
  },
  {
    id: 'discipline-map',
    title: 'The map of the discipline',
    caption:
      'The whole discipline on one canvas: a central node and eight branches (foundations, values, the stack, patterns, the role, obligations, maturity and the learning path), every node a link. Follow the branch you are weakest in, or read the same map as a list below. Drawn from chapters 01–08.',
    alt: 'A two-sided mind map with a central AI Governance Engineer node and eight branches, each with its second-level topics as links.',
    description:
      'A two-sided mind map. The centre is the AI Governance Engineer. Four branches sit on the left: Foundations (the definition, the three questions, the disambiguation cluster, the five problems), Values and principles, The Stack (five layers and the minimum viable stack) and Patterns (the catalogue by layer); and four on the right: The Role (seven workflows, the career ladder, three ways in), Obligations (the topic crosswalk, the frameworks and the reverse index), Maturity (the five levels, metrics and the self-assessment) and the Learning path (four stages of nodes). Every node links to the page or on-page anchor that develops it; the list under the map is the same content as text.',
    placements: [],
    kind: 'poster',
    pages: ['/map'],
  },
  // Block b-figures-existing (v0.5.0): hand-authored infographics for content
  // the chapters already state (01, 02, 04, 08, 12, 13, 14, 17).
  {
    id: 'five-objects',
    title: 'The five objects of governance',
    caption:
      'The five nested objects the discipline governs, from the model out to the organisation, with the controls the chapter names for each. Check that every object in your estate has its control, because governing one object leaves the others open. Drawn from chapter 01.',
    alt: 'Five nested objects: models inside systems inside agents, with data beside them, all inside the organisation, each with the controls that govern it.',
    description:
      'Five nested objects, each needing different controls. Models: the trained artefacts (foundation models, fine-tunes, classifiers), governed with model cards, evals and AIBOM. Systems: the application around the model (prompts, retrieval, tools, orchestration, the human and machine users); most risk is here, not in the raw model. Agents: systems that act, governed with identity, bounded scope, tool mediation, runtime guardrails and kill switches; the hardest and newest object. Data: training data, retrieval corpora, prompts and outputs, governed with data cards, DPIAs and lineage. The organisation: the roles, decision rights, escalation paths and accountability around all of the above, governed with an operating model, RACI and an incident pipeline. The discipline is coherent only when it addresses all five.',
    placements: [{ chapter: 'definition', section: 'The object of governance', at: 'head' }],
  },
  {
    id: 'profession-in-numbers',
    title: 'The profession in numbers',
    caption:
      'The demand for AI governance and the skills employers ask for, using only the figures chapter 02 cites: the IAPP 2025 report and an analysis of 1,997 US postings updated in August 2026. Read the skills as the brief for a hiring or learning plan: build-and-run skills, not review skills. Drawn from chapter 02.',
    alt: 'Demand for AI governance is near-universal (77% of organisations, roughly nine in ten of those using AI, and only 1.5% expecting no new staff), and the postings ask for observability, Python and NIST frameworks.',
    description:
      "Demand, from IAPP's 2025 report: some 77% of organisations report working on AI governance, rising to roughly nine in ten among those already using AI, and of 671 respondents only 10 (1.5%) said they will not need additional AI governance staff in the next 12 months. Skills, from an analysis of 1,997 United States AI-governance postings updated in August 2026: observability platforms in 41% of postings, Python in 28% and NIST frameworks in 27%. These are build-and-run skills, not review skills.",
    placements: [{ chapter: 'why-now', section: 'The evidence', at: 'head' }],
  },
  {
    id: 'human-oversight',
    title: 'Human oversight, designed',
    caption:
      'Human oversight as an engineered control: classify each action by consequence, put a designed checkpoint only where the stakes justify the latency, and keep the decision and the oversight metrics as evidence. Decide which actions need a person by consequence, then watch approval rate, time-to-decide and override rate. Drawn from chapter 04.',
    alt: 'Between reviewing every action and rubber-stamping all of them, actions are classified by consequence, a designed checkpoint with context sits only where the stakes justify it, and the oversight leaves evidence that is itself monitored.',
    description:
      'Article 14 requires that a person can effectively oversee a high-risk system: understand the output, decide against it and stop the system. Undifferentiated oversight fails both ways: human review of every action destroys the value of automation, and nominal oversight of a firehose of actions is a rubber stamp. The engineered answer classifies each proposed action by consequence and places a designed checkpoint only where the stakes justify the latency, in Layer 04 Runtime Controls & Observability (the Human-in-the-loop Gate pattern); other actions proceed without one. The reviewer gets enough context to disagree, which designs against automation bias. The approver and the decision are logged as evidence, and the oversight itself (approval rate, time-to-decide, override rate) is monitored as a signal that can degrade. Oversight you do not measure is oversight you cannot claim.',
    placements: [
      { chapter: 'the-stack', section: 'Designing human oversight (Article 14)', at: 'head' },
    ],
  },
  {
    id: 'procured-ai-control',
    title: 'Where control moves when you buy',
    caption:
      'What happens to the stack when you buy the model instead of training it: boundary evals and the controllable perimeter shrink, while inventory and collected supplier evidence grow behind a due-diligence gate. Budget your controls for bounding the system and evidencing the supplier, not only for testing it. Drawn from chapter 04.',
    alt: 'A procured system passes a due-diligence gate; then boundary evals and the controllable perimeter shrink, while inventory and collected supplier evidence grow.',
    description:
      "A procured system (SaaS with an embedded LLM, an API-only foundation model, or an agent inside a vendor's product) first passes a due-diligence gate, the Vendor / Model Due-Diligence Gate pattern. Layer 02 Inventory & Transparency grows: the vendor's system still needs a registry entry, an owner and a scope. Layer 03 Evals & Red Teaming as Evidence shrinks to boundary evals of the vendor's system as a black box and reliance on the vendor's own evidence. Layer 04 Runtime Controls & Observability shrinks to the perimeter you control: the tool scopes you grant, the identity you issue the vendor's agent and the traffic you can observe. Layer 05 Assurance & Continuous Compliance grows: supplier documentation, model card and any AIBOM become evidence you collect rather than produce. The less of the model you own, the more of your control budget moves from testing it to bounding it and evidencing the supplier.",
    placements: [{ chapter: 'the-stack', section: 'Third-party and procured AI', at: 'head' }],
  },
  {
    id: 'enforcement-map',
    title: 'Who enforces, and the ceilings',
    caption:
      "Who enforces each regime and how high its penalties can go: the AI Office for GPAI providers, national market-surveillance authorities for high-risk systems and the state Attorney General under California's SB 53, as of 2026-09-24. Record for each system which authority asks, so its evidence is ready for that authority. Drawn from chapter 08.",
    alt: 'Three enforcement tracks: GPAI providers and the AI Office, high-risk systems and national market-surveillance authorities, and US frontier developers under SB 53 and the state Attorney General, each with its penalty ceiling.',
    description:
      "Three enforcement tracks, as of 2026-09-24. GPAI providers answer to the AI Office: Commission enforcement powers have been live since 2 August 2026; under Art. 101 the Commission may fine GPAI providers up to 3% of worldwide annual turnover or EUR 15 million, whichever is higher; and the Omnibus's new Art. 75a to 75d give the AI Office investigation powers backed by periodic penalty payments of up to 5% of average daily turnover per day for a continuing breach, in force since 27 July 2026. High-risk systems answer to national market-surveillance authorities, which each Member State chooses (Spain, for example, set up AESIA); their administrative fines run under Art. 99, with ceilings of 7%, 3% and 1% of turnover depending on the breach. Large frontier developers under California's SB 53 answer to the Attorney General, with penalties of up to USD 1 million per violation.",
    placements: [{ chapter: 'regulatory-map', section: 'EU AI Act, post-Omnibus', at: 'foot' }],
  },
  {
    id: 'committee-gates',
    title: 'The committee decides, the gates enforce',
    caption:
      'How the decisions that cannot be automated reach the committee and come back as data: triggers route a use case to the committee, its exceptions go into a register the policy gate reads, and the verdict shows the release passed under an exception until it expires. File exceptions as data with an expiry, not as minutes. Drawn from chapter 12.',
    alt: 'Most use cases pass intake and go straight to the gates; review triggers route the rest to the committee, which records exceptions as data in a register that the policy gate reads, so the verdict shows a release passed under an exception and the build fails again once it expires.',
    description:
      'Most use cases never reach the committee: they pass intake, get a tier and go through the gates. Review triggers, with the escalation for each hop written in the charter, route the rest: for example a decision with legal or similarly significant effect on a person, special-category data, or an agent with write access to money, customer records or production infrastructure. The AI governance committee takes four kinds of decision (risk acceptance, exceptions, value trade-offs and policy) and records each exception as data in the policy repository, not in minutes: the rule, the system, the compensating controls, the residual risk, the decision record and an expiry. The policy gate reads the register. While the exception is live, the rule returns allow with the exception id in its verdict, so the evidence shows the release passed under an exception; when it expires, the same rule fails the build again without anyone having to remember.',
    placements: [
      {
        chapter: 'governance-program',
        section: 'The committee decides, the gates enforce',
        at: 'head',
      },
    ],
  },
  {
    id: 'risk-loop-stack',
    title: 'The risk loop on the stack',
    caption:
      'The four steps of the risk loop with the NIST AI RMF functions each covers and the stack layers that do its work, all under GOVERN and all writing to one risk register. Find the step your function skips, then build the layer that does its work. Drawn from chapter 13.',
    alt: 'The four steps of the risk loop, each with its NIST AI RMF functions and the stack layers that do the work, inside GOVERN, looping back from monitor to identify and writing to one risk register.',
    description:
      'Identify (MAP 1 to 5, GOVERN 5): Layer 02 Inventory & Transparency gives every risk an object, with a registry id, owner, tier and affected stakeholders. Assess (MAP 5.1, MEASURE 1 to 2): Layer 03 Evals & Red Teaming as Evidence measures likelihood and finds risks nobody listed. Treat (MANAGE 1 to 3): Layer 01 Govern-as-Code holds appetite, tolerance, scales and tier rules as data and blocks what exceeds them, and Layer 04 Runtime Controls & Observability treats at runtime. Monitor (MEASURE 3 to 4, MANAGE 4): Layer 04 detects a risk becoming real, and Layer 05 Assurance & Continuous Compliance records, re-rates and reports. GOVERN applies across the whole process. The loop returns from monitor to identify, and every step writes to the risk register, whose history, signed acceptances and review log are the evidence.',
    placements: [
      {
        chapter: 'risk-management',
        section: 'The loop: identify, assess, treat, monitor',
        sub: 'The loop on the five layers',
        at: 'head',
      },
    ],
  },
  {
    id: 'risk-matrix',
    title: 'The matrix and the S5 override',
    caption:
      'The illustrative five-by-five likelihood-by-severity matrix, with catastrophic severity on its own track as Critical at any likelihood, and the gate and acceptor each band triggers. Rate each risk on the defined scales, then wire each band to its gate. Drawn from chapter 13.',
    alt: 'A five-by-five likelihood-by-severity matrix with Low, Medium, High and Critical bands, the catastrophic severity row on its own track as Critical at any likelihood, and the gate and acceptor for each band.',
    description:
      'Likelihood: L1 Rare, L2 Unlikely, L3 Possible, L4 Likely, L5 Almost certain. Severity: S1 Negligible, S2 Minor, S3 Moderate, S4 Major, S5 Catastrophic. S5 runs on its own track: any S5 scenario is Critical whatever its likelihood. From L1 to L5, S4 is Medium, High, High, Critical, Critical; S3 is Low, Medium, High, High, Critical; S2 is Low, Low, Medium, Medium, High; S1 is Low, Low, Low, Medium, Medium. Low: a registry entry and owner, accepted by the system owner. Medium: an eval gate on the linked risk, accepted by the product owner. High: an eval gate and runtime guardrail, deploy denied without a current acceptance, accepted by the risk committee with the second line consulted. Critical: deploy denied, accepted by the governing body, or no one. The thresholds are illustrative; calibrate them to your volumes.',
    placements: [
      {
        chapter: 'risk-management',
        section: 'Assessing risk: the likelihood-by-severity matrix',
        sub: 'The matrix and what each band triggers',
        at: 'foot',
      },
    ],
  },
  {
    id: 'mitigation-ladder',
    title: 'The mitigation ladder',
    caption:
      'The five rungs of the mitigation hierarchy, worked top down, each with the stack control that implements it and the evidence it leaves; transfer sits beside the ladder, not on it. Start at the top and record why each higher rung was infeasible before you settle on a lower one. Drawn from chapter 13.',
    alt: 'Five rungs worked top down (eliminate, substitute, engineer, administrative, accept and monitor), each with its stack control and its evidence; transfer sits beside the ladder, and the ladder ends in acceptance.',
    description:
      "1 Eliminate: do not build it, remove the capability or refuse the use, with a policy deny, a prohibited-use blocklist or a tool never granted; evidence: the deny verdict. Elimination has a legal floor: practices the AI Act prohibits are eliminated, never treated or accepted. 2 Substitute: the same goal at lower risk, with a design record and a narrower registry scope; evidence: the design decision linked to the risk id. 3 Engineer: controls that act without relying on anyone remembering (eval gate, runtime guardrail, approval gate, kill switch); evidence: eval results, guardrail events and approval logs. 4 Administrative: rules for people, such as instructions for use and training; evidence: training attestations and versioned instructions. 5 Accept and monitor: carry what is left, knowingly, with a signed acceptance, telemetry and a review date; evidence: the acceptance record and a monitoring signal. Transfer (insurance, contractual indemnities) sits beside the ladder: it moves the financial consequence, not the harm to the person on the other end of the decision. Every rung leaves a residual; the ladder ends in acceptance, never in 'resolved'.",
    placements: [
      { chapter: 'risk-management', section: 'Treating risk: the mitigation hierarchy', at: 'head' },
    ],
  },
  {
    id: 'provenance-lineage',
    title: 'Provenance and lineage',
    caption:
      'Provenance says where a dataset came from and on what terms; lineage traces how it moved through pipeline jobs and runs, backward from a model and forward from a dataset. Record lineage forward as well as back, because an erasure request or a licence withdrawal asks which models used the data. Drawn from chapter 14.',
    alt: 'Provenance records where a dataset came from and on what terms; lineage traces it through pipeline jobs and runs, backward from a model to its sources and forward from a dataset to every model that used it.',
    description:
      'Provenance is where a dataset came from and on what terms. Lineage is how the data moved and changed through pipelines, recorded as lineage events about datasets, jobs and runs. Lineage runs both ways: backward lineage answers "what fed this model?", forward lineage answers "which models used this dataset?", and the second question is the one an erasure request or a licence withdrawal asks. Granularity follows where rights attach: dataset-level provenance is the default, record-level provenance is needed where rights attach to records (personal data, per-source licences, opt-outs), and feature-level lineage is needed for sensitive derived features that can act as proxies. The human-readable companion is a datasheet.',
    placements: [
      {
        chapter: 'governing-development',
        section: 'Data for training and testing',
        sub: 'Provenance versus lineage',
        at: 'head',
      },
    ],
  },
  {
    id: 'incident-clocks',
    title: 'The overlapping incident clocks',
    caption:
      'The first-report deadlines that one event can start at once under eight regimes, on one axis from awareness, as of 2026-09-24. Hold every clock in one incident record and alert on the nearest deadline. Drawn from chapter 17.',
    alt: 'First-report deadlines of eight regimes on one axis from awareness, from DORA at 4 hours after classification to the AI Act and SB 53 at 15 days, all held in one incident record.',
    description:
      "One event can start several clocks. First reports, counted from awareness unless noted, as of 2026-09-24: DORA Art. 19, within 4 hours of classification as major and no later than 24 hours from awareness; NIS2 Art. 23, an early warning within 24 hours and a notification within 72 hours; the Cyber Resilience Act Art. 14, an early warning within 24 hours and a notification within 72 hours; California SB 53, within 15 days of discovery, or within 24 hours on an imminent risk of death or serious physical injury; EU AI Act Art. 73, no later than 2 days (widespread infringement or critical infrastructure), 10 days (death) or 15 days (other); the GPAI Code of Practice under Art. 55, 2, 5, 10 or 15 days depending on the harm; GDPR Art. 33, where feasible within 72 hours; the New York RAISE Act, within 72 hours of a determination, effective 1 Jan 2027. Follow-up and final reports, the deployer's duty under Art. 26(5), GDPR Art. 34 and the voluntary OECD framework are in the table. The engineering answer is one incident record that holds the facts once, with a timer per regime, and a pipeline that alerts on the nearest deadline.",
    placements: [{ chapter: 'incidents', section: 'The overlapping clocks', at: 'head' }],
  },
] as const;

/** Look up a figure definition by id. */
export function getFigure(id: string): FigureDef | undefined {
  return figures.find((figure) => figure.id === id);
}

/** Figures with at least one placement in the given chapter slug. */
export function figuresForChapter(slug: string): FigureDef[] {
  return figures.filter((figure) =>
    figure.placements.some((placement) => placement.chapter === slug),
  );
}

/** The figure's kind, defaulting to 'infographic'. */
export function figureKind(figure: FigureDef): FigureKind {
  return figure.kind ?? 'infographic';
}

/** The figure's licence label, defaulting to DEFAULT_FIGURE_LICENSE. */
export function figureLicense(figure: FigureDef): string {
  return figure.license ?? DEFAULT_FIGURE_LICENSE;
}

/** Chapter slugs the figure is placed in, first placement first, no repeats. */
export function figureChapters(figure: FigureDef): string[] {
  return [...new Set(figure.placements.map((placement) => placement.chapter))];
}

/** One downloadable export of a figure (see scripts/figures-build.mjs). */
export interface FigureExport {
  /** 'svg' adapts to the viewer's colour scheme unless `theme` pins it. */
  format: 'svg' | 'png';
  /** 'auto' follows prefers-color-scheme (SVG only). */
  theme: 'auto' | 'light' | 'dark';
  /** Rendered pixel width (PNG only). */
  width?: number;
  /** File name under /downloads/figures/. */
  file: string;
}

/** Directory (site path) that holds every figure export. */
export const FIGURE_EXPORT_DIR = '/downloads/figures';

/** Rendered PNG widths, in px. */
export const FIGURE_PNG_WIDTHS: readonly number[] = [1600, 3200];

/**
 * Every export of one figure for one book version, in download order. The
 * single source for file names: the exporter writes exactly these and the
 * pages link exactly these. `<id>-v<version>[-<theme>][-<width>].<ext>`.
 */
export function figureExports(id: string, version: string): FigureExport[] {
  const base = `${id}-v${version}`;
  const out: FigureExport[] = [
    { format: 'svg', theme: 'auto', file: `${base}.svg` },
    { format: 'svg', theme: 'light', file: `${base}-light.svg` },
    { format: 'svg', theme: 'dark', file: `${base}-dark.svg` },
  ];
  for (const theme of ['light', 'dark'] as const) {
    for (const width of FIGURE_PNG_WIDTHS) {
      out.push({ format: 'png', theme, width, file: `${base}-${theme}-${width}.png` });
    }
  }
  return out;
}
