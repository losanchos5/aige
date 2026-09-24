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
    alt: 'AI governance demand in numbers: 77% of organisations work on it, only 1.5% expect no new staff, and postings ask for observability, Python and NIST skills.',
    description:
      "Demand, from IAPP's 2025 report: some 77% of organisations report working on AI governance, rising to roughly nine in ten among those already using AI, and of 671 respondents only 10 (1.5%) said they will not need additional AI governance staff in the next 12 months. Skills, from an analysis of 1,997 United States AI-governance postings updated in August 2026: observability platforms in 41% of postings, Python in 28% and NIST frameworks in 27%. These are build-and-run skills, not review skills.",
    placements: [{ chapter: 'why-now', section: 'The evidence', at: 'head' }],
  },
  {
    id: 'human-oversight',
    title: 'Human oversight, designed',
    caption:
      'Human oversight as an engineered control: classify each action by consequence, put a designed checkpoint only where the stakes justify the latency, and keep the decision and the oversight metrics as evidence. Decide which actions need a person by consequence, then watch approval rate, time-to-decide and override rate. Drawn from chapter 04.',
    alt: 'Actions classified by consequence, a designed checkpoint only where the stakes justify it, and oversight that leaves evidence which is itself monitored.',
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
    alt: 'Three enforcement tracks (AI Office for GPAI, national authorities for high-risk AI, the California Attorney General under SB 53) and their penalty ceilings.',
    description:
      "Three enforcement tracks, as of 2026-09-24. GPAI providers answer to the AI Office: Commission enforcement powers have been live since 2 August 2026; under Art. 101 the Commission may fine GPAI providers up to 3% of worldwide annual turnover or EUR 15 million, whichever is higher; and the Omnibus's new Art. 75a to 75d give the AI Office investigation powers backed by periodic penalty payments of up to 5% of average daily turnover per day for a continuing breach, in force since 27 July 2026. High-risk systems answer to national market-surveillance authorities, which each Member State chooses (Spain, for example, set up AESIA); their administrative fines run under Art. 99, with ceilings of 7%, 3% and 1% of turnover depending on the breach. Large frontier developers under California's SB 53 answer to the Attorney General, with penalties of up to USD 1 million per violation.",
    placements: [{ chapter: 'regulatory-map', section: 'EU AI Act, post-Omnibus', at: 'foot' }],
  },
  {
    id: 'committee-gates',
    title: 'The committee decides, the gates enforce',
    caption:
      'How the decisions that cannot be automated reach the committee and come back as data: triggers route a use case to the committee, its exceptions go into a register the policy gate reads, and the verdict shows the release passed under an exception until it expires. File exceptions as data with an expiry, not as minutes. Drawn from chapter 12.',
    alt: 'Most use cases go straight to the gates; triggers route the rest to the committee, whose exceptions become data the policy gate reads until they expire.',
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
    alt: 'The four-step risk loop inside GOVERN, each step with its NIST AI RMF function and stack layers, all writing to one risk register.',
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
    alt: 'A five-by-five likelihood by severity matrix in four bands, with catastrophic severity Critical at any likelihood and a gate and acceptor per band.',
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
    alt: 'Five mitigation rungs worked top down, from eliminate to accept and monitor, each with its stack control and evidence; transfer sits beside the ladder.',
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
    alt: 'Provenance records where a dataset came from and on what terms; lineage traces it backward from a model to its sources and forward to every model using it.',
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
  // Block w2-fig-concepts (v0.5.0): concept figures for chapters 12, 13, 16,
  // 21, 22 and 23, drawn only from what those chapters and their data modules
  // (harms.ts, jurisdictions.ts) state.
  {
    id: 'agent-control-plane',
    title: 'The agent control plane',
    caption:
      'One tool call through the agent control plane: a registry entry gates the credential, the gateway and the guardrail check the call, a checkpoint fires where the stakes demand it and a per-agent breaker can stop it, while every step leaves telemetry kept as evidence. Check that each agent in your registry has all of them and that its stop has been drilled. Illustrative, not a claim of conformity. Drawn from chapter 23.',
    alt: 'One tool call through the agent control plane: registry, identity, gateway, guardrail, checkpoint and breaker, with telemetry kept as evidence.',
    description:
      'The control plane in the order a tool call meets it. The agent registry (Layer 02 Inventory & Transparency) holds every agent with an owner, a purpose, an autonomy level, its tools, pinned versions, stop handles and an expiry: no registry entry, no credential. The identity issuer (Layer 04 Runtime Controls & Observability) gives the agent a short-lived, attested workload credential, with delegation that names the agent, never impersonation of the user. The agent proposes a tool call. The tool gateway denies by default, with pinned tool definitions, scopes, rates and egress per tool, and admitted MCP servers only. The runtime guardrail checks every call before it runs (identity against a live registry entry, the allow-list and definition hash, parameters within policy, instruction provenance, the output and egress filter, execution budgets) and fails closed for pay, delete, send and execute, open with an alert only for reads. A human checkpoint approves where the stakes or irreversibility demand it, showing the raw call. The per-agent circuit breaker has six stop levels: pause a task, narrow the scope, trip the breaker, revoke the identity, stop a class and degrade; exhausted budgets trip it, and a tripped breaker makes the gateway reject every call from the agent. Past your boundary sit the tool, the MCP server or a remote agent: you cannot stop someone else\'s agent, only stop calling it and revoke what you issued to it. Every step leaves telemetry that carries identity, tool calls, verdicts and approvals, kept as evidence (Layer 05 Assurance & Continuous Compliance). Memory controls, delegation across hops and prompt change control complete the plane in chapter 23.',
    placements: [{ chapter: 'governing-agents', at: 'lead' }],
    pages: ['/agents'],
  },
  {
    id: 'governance-operating-model',
    title: 'The governance operating model',
    caption:
      'The board sets appetite, the committee decides what the gates cannot, the second line builds the gates the first line runs through, and the third line re-performs gate decisions from the same evidence the board reads as KPIs and KRIs. Name who holds each role for your AI systems, and check that internal audit stays independent of what it assures. Drawn from chapter 12.',
    alt: 'Board, committee and the three lines around one set of gates, with the AI governance engineer in the second line and evidence flowing to audit and the board.',
    description:
      'The board, the governing body, sets AI risk appetite and the AI policy, and reads a few indicators computed from live systems rather than self-reported: KPIs that say whether the program is doing its job and KRIs that say whether risk is moving towards the edge of appetite. The AI governance committee decides what the gates cannot (risk acceptance, exceptions, value trade-offs and policy), and its exceptions reach the gates as data. The second line (risk, compliance, privacy, security and AI governance) sets method and policy, builds the paved path and challenges first-line ratings; the AI governance engineer usually sits here, building the gates, the registry and the evidence path the first line runs. The first line (product owners, engineering and operators) builds and runs systems inside the gates and owns their risks. The gates (Layer 01 Govern-as-Code) enforce, and the evidence they leave (registry entries, eval results, runtime logs and verdicts) lands in the evidence store (Layer 05 Assurance & Continuous Compliance). The third line, internal audit, gives independent assurance by testing the gates, not the documents about them: it re-performs policy decisions for a sample of releases from the stored inputs, hunts bypasses and checks exception hygiene. The model describes roles, not boxes on an org chart; the committee decides, the gates enforce.',
    placements: [
      {
        chapter: 'governance-program',
        section: 'Enterprise risk, the three lines and internal audit',
        sub: 'The three lines, applied to AI',
        at: 'head',
      },
    ],
  },
  {
    id: 'harm-levels',
    title: 'Harm at five levels',
    caption:
      'Where AI harm lands, from one person to the physical environment, with one example harm per level from the harms atlas and the control that catches it, coloured by its stack layer. Calibrate your severity scale against every level, not only against harm to one person. Drawn from chapter 13.',
    alt: 'Five harm levels from one person to the environment, each with an example harm from the atlas and the control, by stack layer, that catches it.',
    description:
      'Five levels at which harm lands, with one example per level from the harms atlas. Individual: harm to one person, their rights, money, liberty, autonomy or body; for example discrimination in consequential decisions, caught by the Eval Gate in CI (Layer 03 Evals & Red Teaming as Evidence). Group: harm that falls on a group or community as such, not only on its members one by one; for example exclusion through under-representation in data, caught by Model Card as Control Evidence (Layer 02 Inventory & Transparency). Organisation: risk to the organisation that builds, buys or deploys the system; for example security compromise through prompt injection, caught by the Runtime Guardrail (Layer 04 Runtime Controls & Observability). Society: harm to shared systems such as information, elections, work, equality and essential services; for example job displacement and task transformation, caught by a workforce impact assessment (Layer 01 Govern-as-Code). Environment: harm to the physical environment from building and running AI systems; for example energy demand and emissions of training and inference, caught by energy and emissions telemetry (Layer 05 Assurance & Continuous Compliance). The harms atlas holds every harm with real incident records, the failure mode an engineer can test for, the control that catches it and the evidence that control leaves.',
    placements: [
      {
        chapter: 'risk-management',
        section: 'Assessing risk: the likelihood-by-severity matrix',
        sub: 'Defined scales',
        at: 'foot',
      },
    ],
  },
  {
    id: 'explanation-techniques',
    title: 'The explanation technique map',
    caption:
      'Explanation techniques on two axes, scope (global or local) and access (model-agnostic or model-specific), and the tests an explanation passes before its record is kept as evidence. Pick the quadrant your decision needs, then test the method for fidelity and stability before you rely on it. Drawn from chapter 16.',
    alt: 'Explanation techniques on two axes, global or local and model-agnostic or model-specific, each tested before its explanation record is kept.',
    description:
      'Explanations vary along two axes: scope (a global explanation describes the model\'s overall behaviour; a local one explains a single output) and access (a model-agnostic method needs only inputs and outputs; a model-specific one uses the model\'s internals). Model-agnostic and global: global surrogate models, permutation feature importance and partial dependence. Model-agnostic and local: LIME, KernelSHAP, counterfactual explanations and nearest-example explanations. Model-specific and global: the coefficients of an interpretable model, tree structure and probing of internal representations. Model-specific and local: TreeSHAP, integrated gradients and other gradient attributions, and attention or circuit analysis (research). An explanation is an output, so it gets evals like any other output (Layer 03 Evals & Red Teaming as Evidence): fidelity, stability and sanity tests without people, and comprehension tests with them. The unit of evidence is the explanation record, one structured object per explained decision, written at decision time by the runtime (Layer 04 Runtime Controls & Observability) with the method, its version, the baseline and the reason codes pinned.',
    placements: [{ chapter: 'fairness-and-explainability', section: 'Explanation techniques', at: 'head' }],
  },
  {
    id: 'instrument-lineage',
    title: 'How the instruments relate',
    caption:
      'AI governance instruments in rising order of force, from principles and soft law through voluntary and harmonised standards to the treaty and the law, with the links the chapter traces between them, as of 2026-09-24. Build each control once and tag it with every instrument it serves, because standards support and do not confer. Drawn from chapter 22.',
    alt: 'AI governance instruments in rising order of force, from principles to binding law, with the definition, lifecycle and presumption links between them.',
    description:
      'In rough order of force, weakest first, as of 2026-09-24. Principles and soft law (the OECD AI Principles, the UNESCO Recommendation, the G7 Hiroshima Code of Conduct and the EU High-Level Expert Group guidelines) set the target and the shared vocabulary. Standards and frameworks (the NIST AI RMF, the ISO/IEC 42001 family and the IEEE 7000 series) are voluntary; ISO/IEC 42001 is certifiable, evidences a management system and confers no AI Act presumption of conformity. The NIST AI RMF adapts the OECD lifecycle and dimensions. Harmonised standards, written by CEN-CENELEC JTC 21 on a Commission request, give a presumption of conformity under Article 40 only once their reference is cited in the Official Journal; the chapter found none cited. The Council of Europe Framework Convention (CETS No. 225) binds the Parties that ratify it and is not in force; the EU AI Act is binding law and recalls the HLEG principles in recital 27. The OECD definition of an AI system, the Convention\'s Article 2 and the AI Act\'s Article 3(1) use near-identical wording. The engineering rule: build each control once, tag it with every instrument it serves and generate each instrument\'s view from the tags.',
    placements: [{ chapter: 'principles-and-standards', section: 'A short lineage of AI soft law', at: 'head' }],
    pages: ['/resources/frameworks'],
    // Statuses (Convention not in force, no OJ citation): re-check with chapter 22.
  // Block w2-fig-posters (v0.5.0): the reference posters, generated at build
  // from frameworks.ts, roles.ts and deployment-options.ts by
  // scripts/lib/posters.mjs (A-series portrait, 1000 × 1414 units, ≤ 48 KB).
  // The Spanish editions (ids ending in -es) carry lang="es" in their art and
  // are listed on /figures only, never placed in the English chapters.
  {
    id: 'eu-ai-act-timeline',
    title: 'EU AI Act timeline, post-Omnibus',
    caption:
      'When each family of EU AI Act obligations applies, from the entry into force in 2024 to the legacy public-authority deadline in 2030, one lane per family, as of 2026-09-24. Find the lanes your systems sit in and plan the evidence for the next date on each. Drawn from chapters 18 and 08.',
    alt: 'Seven lanes of EU AI Act obligation families on one time axis, 2024 to 2030, with the Omnibus in force from 2026-07-27 and the deferred high-risk dates.',
    description:
      'Seven lanes on one time axis, as of 2026-09-24. The Act entered into force on 2024-08-01 and the Digital Omnibus (Regulation (EU) 2026/1744) on 2026-07-27. Prohibited practices (Art. 5): the original prohibitions from 2025-02-02, and new bans on AI-generated non-consensual intimate imagery (NCII) and child sexual abuse material (CSAM) from 2026-12-02. AI literacy and bias-detection data (Arts. 4 and 4a): AI literacy from 2025-02-02; Art. 4 reworded and the new Art. 4a from 2026-07-27. General-purpose AI models (Arts. 53 and 55): obligations from 2025-08-02, Commission enforcement powers from 2026-08-02, and models placed before 2025-08-02 must comply by 2027-08-02. Transparency for certain AI systems (Art. 50): from 2026-08-02, with the marking grace for existing systems ending on 2026-12-02. High-risk through use (Annex III): the rules for testing in real-world conditions (Art. 60) from 2026-08-02, and the Annex III duties from 2027-12-02, deferred by the Omnibus from 2026-08-02. High-risk through products (Annex I): from 2028-08-02, deferred from 2027-08-02. Legacy high-risk systems intended for use by public authorities must comply by 2030-08-02 (Art. 111(2)). A filled dot marks the date a family starts to apply and a ring another dated step. Chapter 18 also lists Commission, notified-body and Annex X dates that the poster does not draw.',
    placements: [
      { chapter: 'eu-ai-act', section: 'The post-Omnibus timeline', at: 'head' },
      { chapter: 'regulatory-map', section: 'EU AI Act, post-Omnibus', at: 'head' },
    ],
    kind: 'poster',
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
    data: {
      caption: 'EU AI Act dates by obligation family, post-Omnibus, as of 2026-09-24',
      columns: ['Date', 'Obligation family', 'What applies', 'Articles'],
      rows: [
        ['2024-08-01', 'The Act', 'The Act enters into force', 'Art. 113'],
        ['2025-02-02', 'Prohibited practices', 'Original prohibitions apply', 'Art. 5'],
        ['2025-02-02', 'AI literacy and bias-detection data', 'AI literacy applies', 'Art. 4'],
        ['2025-08-02', 'General-purpose AI models', 'GPAI provider obligations apply', 'Arts. 53, 55'],
        ['2026-07-27', 'The Act', 'The Digital Omnibus enters into force', 'Regulation (EU) 2026/1744'],
        ['2026-07-27', 'AI literacy and bias-detection data', 'Art. 4 reworded; new Art. 4a', 'Arts. 4, 4a'],
        ['2026-08-02', 'General-purpose AI models', 'Commission enforcement powers apply', 'Arts. 53, 55'],
        ['2026-08-02', 'Transparency for certain AI systems', 'Disclosure and marking apply', 'Art. 50'],
        ['2026-08-02', 'High-risk through use (Annex III)', 'Rules for testing in real-world conditions', 'Art. 60'],
        ['2026-12-02', 'Prohibited practices', 'New bans on NCII and CSAM', 'Art. 5'],
        ['2026-12-02', 'Transparency for certain AI systems', 'Marking grace ends for existing systems', 'Art. 50'],
        ['2027-08-02', 'General-purpose AI models', 'Models placed before 2025-08-02 must comply', 'Art. 111(3)'],
        [
          '2027-12-02',
          'High-risk through use (Annex III)',
          'Annex III duties apply; deferred from 2026-08-02',
          'Arts. 6, 9 to 15, 17, 25 to 27, 43, 47, 49, 71 to 73',
        ],
        [
          '2028-08-02',
          'High-risk through products (Annex I)',
          'Annex I duties apply; deferred from 2027-08-02',
          'Arts. 6, 9 to 15, 17, 25, 26, 43, 47, 72, 73',
        ],
        [
          '2030-08-02',
          'Legacy high-risk systems for public authorities',
          'Systems already on the market must comply',
          'Art. 111(2)',
        ],
      ],
      source:
        'Chapter 18, The post-Omnibus timeline, sources [1] and [2]; chapter 08, EU AI Act, post-Omnibus (the obligation rows of src/data/frameworks.ts)',
    },
  },
  {
    id: 'eu-ai-act-operator-roles',
    title: 'EU AI Act operator roles',
    caption:
      'The questions that tell which EU AI Act operator roles an organisation holds for one system, each role with its core duties and the evidence it produces, and the Article 25 loop that turns a distributor, importer or deployer into the provider. Record the roles per system in the registry and ask the questions again whenever an Article 25 trigger fires. Drawn from chapter 18.',
    alt: 'Seven questions down a spine, each leading to an EU AI Act operator role with its duties and evidence, an Article 25 loop to provider and a registry entry.',
    description:
      'Ask every question for one system: roles name tasks, not organisations, so one organisation can hold several. Provider (Art. 3(3)): develops an AI system, or has it developed, and places it on the market or into service under its own name; Arts. 8 to 17, 43 to 49, 72 and 73, and 50(1) and 50(2); produces technical documentation, QMS records, eval results and the declaration. GPAI provider (Art. 53): places a general-purpose AI model on the market; Arts. 53 to 55; produces model documentation, the training summary and the copyright policy. Product manufacturer (Art. 25(3)): places a high-risk AI safety component on the market with its Annex I, Section A product under its own name, and carries the provider duties of Art. 16. Importer (Art. 3(6)): established in the EU, places on the market a system bearing the name of a provider established outside it; Art. 23; keeps an import verification record. Distributor (Art. 3(7)): makes a system available on the EU market without being its provider or importer; Art. 24; keeps a distribution check record. Authorised representative (Art. 3(5)): established in the EU under a written mandate from a provider outside it; Arts. 22 and 54; keeps the mandate and document copies. Deployer (Art. 3(4)): uses a system under its own authority, other than for a purely personal, non-professional activity; Arts. 26, 27, 50(3), 50(4) and 86; keeps use logs, the oversight roster, the FRIA and notices. The Article 25 loop: a distributor, importer, deployer or other third party becomes the provider of a high-risk system, with all Art. 16 duties, when it puts its name or trademark on a high-risk system already on the market, makes a substantial modification to a high-risk system that stays high-risk, or changes the intended purpose of a system, including a general-purpose AI system, so that it becomes high-risk. The initial provider must cooperate (Art. 25(2)), and a written agreement fixes the information and access (Art. 25(4)). The answers end in a registry entry that records the roles per system as a list, such as ["provider", "deployer"]. If no role applies, the organisation is not an operator for that system; an affected person holds protections, not duties (Art. 2(1)(g)). A reading aid, not legal advice; illustrative, not a claim of conformity.',
    placements: [{ chapter: 'eu-ai-act', section: 'Who you are in the value chain', at: 'head' }],
    kind: 'poster',
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
  },
  {
    id: 'jurisdiction-tiles',
    title: 'AI laws by jurisdiction',
    caption:
      'Twenty jurisdictions as equal tiles in rough geographic order, shaded by how binding their AI-specific regime is, with the US states and New York City in an inset, as of 2026-09-24. Find each jurisdiction you operate in, then read its section for the trigger, the clock and the enforcer. Drawn from chapter 21.',
    alt: 'Twenty jurisdictions as equal tiles in rough geographic layout, shaded by how binding their AI-specific regime is, as of 2026-09-24.',
    description:
      'Twenty jurisdictions, one equal tile each, in rough geographic order, as of 2026-09-24. Binding, horizontal (a statute in force that applies across sectors): the European Union, South Korea, Japan (a promotional act with no penalties) and Italy. Binding, targeted (rules limited to a use, a sector, a class of developer or the public sector): the United States federal agencies, Canada\'s directive, China\'s departmental rules and, in the United States inset, California, Colorado, Illinois, New York, Texas, Utah and New York City. Voluntary (frameworks and guidance with no penalty attached): the United Kingdom, India, Singapore and Australia. Bill (not law yet): Brazil and Spain\'s national AI bill. The status is a reading aid, not legal advice; the table lists each jurisdiction\'s main instrument and its key date.',
    placements: [{ chapter: 'ai-laws-worldwide', section: 'The landscape at a glance', at: 'head' }],
    kind: 'data-viz',
    // Statuses move monthly: re-check against chapter 21 and jurisdictions.ts.
    asOf: '2026-09-24',
    reviewBy: '2026-12-24',
    data: {
      caption: 'AI-specific regime by jurisdiction, as of 2026-09-24',
      columns: ['Jurisdiction', 'Tile', 'Status', 'Main instrument', 'Key date'],
      rows: [
        ['South Korea', 'KOR', 'Binding, horizontal', 'Basic Act on the Development of AI and the Establishment of a Foundation for Trust (Act No. 20676)', '2026-01-22'],
        ['United States (federal)', 'USA', 'Binding, targeted', 'OMB Memorandum M-25-21 (federal agency use of AI)', '2025-04-03'],
        ['Colorado', 'CO', 'Binding, targeted', 'SB 26-189, Automated Decision-Making Technology (replaces SB 24-205)', '2027-01-01'],
        ['Texas', 'TX', 'Binding, targeted', 'Texas Responsible Artificial Intelligence Governance Act (HB 149)', '2026-01-01'],
        ['California', 'CA', 'Binding, targeted', 'SB 53, Transparency in Frontier Artificial Intelligence Act', '2026-01-01'],
        ['New York', 'NY', 'Binding, targeted', 'RAISE Act (S6953B, as amended)', '2027-01-01'],
        ['Utah', 'UT', 'Binding, targeted', 'Artificial Intelligence Policy Act as amended by SB 226 and SB 332', '2025-05-07'],
        ['Illinois', 'IL', 'Binding, targeted', 'HB 3773, Human Rights Act amendment on AI in employment', '2026-01-01'],
        ['New York City', 'NYC', 'Binding, targeted', 'Local Law 144 of 2021, automated employment decision tools', '2023-07-05'],
        ['Japan', 'JPN', 'Binding, horizontal', 'Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (Act No. 53 of 2025)', '2025-09-01'],
        ['China', 'CHN', 'Binding, targeted', 'Interim Measures for the Administration of Anthropomorphic Interaction Services', '2026-07-15'],
        ['Brazil', 'BRA', 'Bill', 'PL 2338/2023 (AI bill; passed the Senate, in the Chamber of Deputies)', '2024-12-10'],
        ['Canada', 'CAN', 'Binding, targeted', 'Directive on Automated Decision-Making', '2025-06-24'],
        ['India', 'IND', 'Voluntary', 'India AI Governance Guidelines', '2025-11-05'],
        ['United Kingdom', 'GBR', 'Voluntary', 'A pro-innovation approach to AI regulation: government response', '2024-02-06'],
        ['Italy', 'ITA', 'Binding, horizontal', 'Law No. 132 of 23 September 2025 on artificial intelligence', '2025-10-10'],
        ['Spain', 'ESP', 'Bill', 'Draft bill for the good use and governance of AI (first reading 11 March 2025)', '2025-03-11'],
        ['Singapore', 'SGP', 'Voluntary', 'Model AI Governance Framework for Agentic AI (v1.5)', '2026-05-20'],
        ['Australia', 'AUS', 'Voluntary', 'National AI Plan', '2025-12'],
        ['European Union', 'EU', 'Binding, horizontal', 'Regulation (EU) 2024/1689 (AI Act), as amended by Regulation (EU) 2026/1744', '2024-08-01'],
      ],
      source: 'Chapter 21 and site/src/data/jurisdictions.ts, as of 2026-09-24',
    },
  },
    id: 'eu-ai-act-risk-ladder',
    title: 'EU AI Act risk ladder',
    caption:
      'The four rungs the EU AI Act puts AI systems on by intended purpose, with the two high-risk routes and the Article 6(3) filter, the separate track for GPAI models, and side notes on what Korea, Texas, California and Colorado do instead, as of 2026-09-24. Place each system on every rung it meets, then read off its duties and dates. Drawn from chapters 18 and 21.',
    alt: 'Four EU AI Act rungs (prohibited, high-risk via Annex I or III with the Art. 6(3) filter, transparency, minimal), a GPAI track and notes on other regimes.',
    description:
      'The EU AI Act sorts AI systems by intended purpose onto four rungs and puts GPAI models on a separate track; one system can sit on two rungs at once, as an Annex III chatbot carries the high-risk duties and the Art. 50 disclosure. Prohibited (Art. 5), from 2025-02-02 with new points from 2026-12-02: the practice is on the Art. 5 list, now ten points, and may not be placed on the market, put into service or used. High-risk (Arts. 6 to 49): requirements of Arts. 8 to 15, provider and deployer duties and conformity assessment. It is reached through products (Art. 6(1)), from 2028-08-02, where a safety component of an Annex I product, or the product itself, needs a third-party conformity assessment, a notion the Omnibus narrowed; or through use (Art. 6(2)), from 2027-12-02, where the intended purpose falls in one of the eight Annex III areas. The Art. 6(3) filter takes an Annex III system out when it poses no significant risk of harm and performs a narrow procedural task, improves a completed human activity, detects patterns without replacing human review, or performs a preparatory task; the provider documents the assessment and registers it (Arts. 6(4) and 49(2)). An Annex III system that profiles natural persons is always high-risk. Transparency (Art. 50), from 2026-08-02: a system that interacts with people, generates synthetic content, recognises emotions, categorises biometrically or produces deep fakes must disclose, mark or label, whatever else it is. Minimal (Arts. 4 and 95), from 2025-02-02 with Art. 4 reworded on 2026-07-27: everything else, with no specific duties beyond AI literacy and voluntary codes; a legal category, not a risk verdict. The GPAI track (Arts. 51 to 56), from 2025-08-02 with Commission enforcement from 2026-08-02: model generality, and systemic risk by capability, compute or designation, carry model-level duties; a system built on the model is an AI system (Art. 3(66)) and sits on the ladder. Side notes from chapter 21, not equivalents: Texas TRAIGA (HB 149), in force 2026-01-01, has intent-based prohibitions (behaviour manipulation, government social scoring, unlawful discrimination, certain sexual content); the Korea AI Basic Act defines high-impact AI as a listed Art. 2(4) area, such as hiring and loan screening, that may significantly affect, or pose a risk to, life, physical safety or fundamental rights, which the operator reviews in advance and MSIT may confirm (Art. 33); Colorado SB 26-189, from 2027-01-01, a transparency note, has deployers of automated decision-making technology (ADMT) in consequential decisions give notice of its use and a plain-language explanation within 30 days of an adverse outcome; California SB 53, in force 2026-01-01, covers frontier developers of models trained above 10^26 operations and large frontier developers above USD 500M revenue. A reading aid, not legal advice; illustrative, not a claim of conformity.',
    placements: [{ chapter: 'eu-ai-act', section: 'The risk ladder', at: 'head' }],
    kind: 'poster',
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
  },
  {
    id: 'deployment-option-matrix',
    title: 'Model type by deployment option',
    caption:
      'The one control each combination of model type and deployment option adds on top of its row and its column, from classic predictive to open-weight models and from cloud hosting to an agentic wrapper. Find your combination and check that its control is in place before the go-live review. Drawn from chapter 15.',
    alt: 'A grid of five model types across and six deployment options down, each cell naming the one control that combination adds on top of its row and column.',
    description:
      'Illustrative, not a claim of conformity: the controls a real deployment needs follow from its risk tier, its obligations and its failure modes. Five model types run across (classic predictive; generative, language; generative, multimodal; proprietary API; open-weight) and six options run down in two groups: where it runs (cloud, on-premise, edge) and how it is adapted (fine-tune, RAG, agentic wrapper). Each cell is the one control the combination adds on top of its row and its column: for example, a classic predictive model behind an agentic wrapper needs a human gate on adverse outcomes, because a score now triggers an action; a generative language model with RAG needs a groundedness eval, corpus permissions and poisoning checks; an open-weight model fine-tuned in house needs a compute log against the GPAI one-third criterion. Chapter 15 prints the same matrix with model types as rows; hybrid hosting, prompting only and distillation have their own rows in its tables but no cell here. The full grid is in the data table.',
    placements: [
      {
        chapter: 'governing-deployment',
        section: 'Model types and deployment options',
        sub: 'The model-type by deployment-option matrix',
        at: 'head',
      },
    ],
    kind: 'poster',
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
    data: {
      caption: 'The control each combination adds on top of its row and its column (illustrative)',
      columns: [
        'Deployment option',
        'Classic predictive',
        'Generative, language',
        'Generative, multimodal',
        'Proprietary (API)',
        'Open-weight',
      ],
      rows: [
        [
          'Cloud',
          'Residency check on features; input drift monitor',
          'No-training and retention terms; output guardrail',
          'Provenance marks on output; biometric-use block',
          'Pin the version; boundary evals on every change',
          'Licence gate; hash-verified weights on rented compute',
        ],
        [
          'On-premise',
          'Own the retraining pipeline and its approval',
          'Own guardrails, patching and energy metering',
          'Own content signing; media retention rules',
          'Vendor appliance: attest version and update path',
          'You own patching: AIBOM, file scans, red team',
        ],
        [
          'Edge',
          'Signed model; field-version telemetry; remote rollback',
          'Small model; offline guardrails; signed updates',
          'Camera and microphone notices; on-device minimisation',
          'Vendor SDK: licence limits; offline revocation',
          'Weights are extractable: licence terms and threat model',
        ],
        [
          'Fine-tune',
          'Retrain is a release: re-run per-group floors',
          'Full red team; safety-erosion eval',
          'Likeness and consent checks on tuning media',
          'Vendor tuning service: data terms; your own re-eval',
          'Compute log against the GPAI one-third criterion',
        ],
        [
          'RAG',
          'Not typical; govern feature-store lineage instead',
          'Groundedness eval; corpus permissions; poisoning checks',
          'Cross-modal injection tests on retrieved media',
          'Your corpus, their model: retention and no-training terms',
          'Every layer of evidence is yours to produce',
        ],
        [
          'Agentic wrapper',
          'Score triggers an action: human gate on adverse outcomes',
          'Agent identity, tool mediation, kill switch',
          'Screen and voice actions behind a human gate',
          'Grant scoped tools; the vendor agent gets its own identity',
          'Own guardrails end to end; no vendor safety layer',
        ],
      ],
      source:
        'Chapter 15, The model-type by deployment-option matrix (src/data/deployment-options.ts)',
    },
  },
  {
    id: 'eu-ai-act-timeline-es',
    title: 'EU AI Act timeline, in Spanish',
    caption:
      'The Spanish edition of the EU AI Act timeline poster: the same seven lanes and dates, as of 2026-09-24, with its text in Spanish and the official Spanish terms of the Act. Share it with Spanish-speaking teams; the English poster sits in chapters 18 and 08. Drawn from chapters 18 and 08.',
    alt: 'Spanish edition: seven lanes of EU AI Act obligation families on one time axis, 2024 to 2030, with the Omnibus in force from 2026-07-27.',
    description:
      'The Spanish-language edition of the EU AI Act timeline, post-Omnibus poster, titled "Cuándo se aplica cada obligación". It draws the same seven lanes and dates as the English poster, whose permalink carries the data table, as of 2026-09-24: Prácticas de IA prohibidas (prohibited practices), Alfabetización en materia de IA y datos para detectar sesgos (AI literacy and bias-detection data), Modelos de IA de uso general (general-purpose AI models), Transparencia de determinados sistemas de IA (transparency), Alto riesgo por su uso, anexo III (high-risk through use), Alto riesgo por producto, anexo I (high-risk through products) and Alto riesgo ya en el mercado, autoridades públicas (legacy high-risk systems for public authorities). The terms follow the Spanish text of Regulation (EU) 2024/1689; the stamp reads "A fecha de 2026-09-24". A reading aid, not legal advice.',
    placements: [],
    kind: 'poster',
    pages: ['/figures'],
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
  },
  {
    id: 'eu-ai-act-operator-roles-es',
    title: 'EU AI Act roles, in Spanish',
    caption:
      'The Spanish edition of the EU AI Act operator roles poster: the same questions, roles, duties, evidence and Article 25 loop, with its text in Spanish and the official Spanish role names of the Act. Share it with Spanish-speaking teams; the English poster sits in chapter 18. Drawn from chapter 18.',
    alt: 'Spanish edition: seven questions leading to EU AI Act operator roles, from proveedor to responsable del despliegue, with the Article 25 loop and a registry.',
    description:
      'The Spanish-language edition of the EU AI Act operator roles poster, titled "¿Qué rol tiene en este sistema?". It asks the same seven questions as the English poster and names the roles with the terms of the Spanish text of Regulation (EU) 2024/1689: proveedor (provider), proveedor de modelos de uso general (GPAI provider), fabricante del producto (product manufacturer), importador (importer), distribuidor (distributor), representante autorizado (authorised representative) and responsable del despliegue (deployer). Each role carries its duties and the evidence it produces; the Article 25 loop and its three triggers, the registry entry per system and the note on the affected person are as in the English poster. The stamp reads "A fecha de 2026-09-24". A reading aid, not legal advice; illustrative, not a claim of conformity.',
    placements: [],
    kind: 'poster',
    pages: ['/figures'],
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
  },
  {
    id: 'eu-ai-act-risk-ladder-es',
    title: 'EU AI Act ladder, in Spanish',
    caption:
      'The Spanish edition of the EU AI Act risk ladder poster: the same rungs, high-risk routes, Article 6(3) filter, GPAI track and side notes, as of 2026-09-24, with its text in Spanish. Share it with Spanish-speaking teams; the English poster sits in chapter 18. Drawn from chapters 18 and 21.',
    alt: 'Spanish edition: the four EU AI Act rungs with the Art. 6(3) filter, the track for general-purpose AI models and notes on other regimes.',
    description:
      'The Spanish-language edition of the EU AI Act risk ladder poster, titled "¿En qué peldaño está el sistema?". It draws the same four rungs as the English poster, Prohibido (prohibited), Alto riesgo (high-risk, por producto and por su uso, with the Art. 6(3) filter and the profiling override), Transparencia (transparency) and Mínimo (minimal), the separate track for modelos de uso general (GPAI models), and the same side notes on Texas, Korea, Colorado and California from chapter 21, with the dates of chapter 08. The terms follow the Spanish text of Regulation (EU) 2024/1689, such as ultrasuplantación for deep fake. The stamp reads "A fecha de 2026-09-24". A reading aid, not legal advice; illustrative, not a claim of conformity.',
    placements: [],
    kind: 'poster',
    pages: ['/figures'],
    asOf: '2026-09-24',
    reviewBy: '2027-03-24',
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
