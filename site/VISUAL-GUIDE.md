# Visual guide for figures on aigovernanceengineer.com

Written by the site's orchestrating session (Fable) as the binding brief for every figure:
archify diagrams under `site/diagrams/` and hand-made infographics under `site/src/figures/`.
A figure that does not meet the rules below is sent back. The chapters are the only source of
content; a figure never adds facts, numbers, dates or vendors that the chapter does not state.

## 1. Rules that apply to every figure

1. **One message.** Each figure answers one question a reader has at that point in the chapter.
   Write that message as a sentence first; if you cannot, the figure is not needed.
2. **Caption formula.** Title ≤ 6 words. Caption = two sentences: *what it shows* and *what the
   reader does with it* (a decision, a first step, a check). Archify captions end with
   "… Generated from the Body of Knowledge."; infographic captions end with
   "… Drawn from chapter NN."
3. **Reading order is explicit.** Left→right or top→bottom, never both. Workflows with more than
   five steps flow top→bottom so they stay legible at 390 px. The gate or decision is the only
   diamond/hexagon in the figure; everything else is a box, store or actor.
4. **Budget.** ≤ 9 nodes and ≤ 12 edges per figure; node labels ≤ 4 words (nouns); edge labels
   ≤ 3 words (verbs) and only when the edge is not obvious. Long explanations go to the notes
   sidecar (archify) or the text alternative (infographic), one sentence per node, in the
   chapter's own words, answering "what is this and who owns it".
5. **Evidence is the hero.** Every mechanism diagram ends in the evidence artefact the pattern
   produces (a record, a signed document, a store entry). Make it the terminal node, visually
   distinct (document-with-check glyph or a store), because the Thesis measures work by evidence.
6. **Layers are named exactly and coloured consistently.** Always "Layer 01 Govern-as-Code",
   "Layer 02 Inventory & Transparency", "Layer 03 Evals & Red Teaming as Evidence", "Layer 04
   Runtime Controls & Observability", "Layer 05 Assurance & Continuous Compliance", in that order.
   Infographics colour by layer with the site tokens `--l1`…`--l5` (fill) and `--l1-ink`…`--l5-ink`
   (text/stroke); archify diagrams mark layers with labelled groups/zones when a mechanism crosses
   layers, and name the layer in the group label.
7. **Same glyph, same concept, in every figure.** Registry/store = cylinder; gate = diamond;
   policy = card; evidence record = document with a check; agent or model = hexagon; human role =
   person glyph; external regulator/auditor = building glyph. In archify, reuse the same node kind
   for the same concept across IR files.
8. **Actors only when the text has them.** Owner, reviewer, auditor, deployer, provider are fine
   when the pattern names them. Never a vendor, product name, logo or trademark. Tools appear as
   categories ("policy engine", "eval harness"), never as brands.
9. **Tokens, not colours.** No hard-coded hex in infographics: `currentColor`, `var(--fg)`,
   `var(--muted)`, `var(--l1)`…; fonts `var(--font-body)` and `var(--font-mono)` for identifiers.
   Never dim text with opacity (the contrast gate fails). Both themes must read well.
   Figures stay flat: shadows and gradients on the site come only through the
   `effects.css` tokens (page chrome), never baked into a figure.
10. **Accessibility.** `role="img"` with `aria-labelledby` pointing at an SVG `<title>` and
    `<desc>`; a visible or `<details>` text alternative that lets a screen-reader user answer the
    same question the figure answers. Minimum rendered text size 12 px at 390 px width.
11. **Mobile.** Every figure is checked at 390, 834 and 1440 px. Infographics wrap to one column;
    workflows go vertical; nothing scrolls horizontally.
12. **Weight.** Archify SVGs are inlined: keep node counts down. Budgets by `kind` in
    `figures.ts` (`figureBudgetKb`, enforced by `scripts/figures-build.mjs`): infographic and
    data-viz SVGs ≤ 12 KB each, posters ≤ 48 KB; widget scripts ≤ 15 KB gzip (§6). If a chapter
    page passes 450 KB of HTML, flag it: the orchestrator decides on external SVGs.
13. **Dates and numbers** appear only if the chapter states them; any timeline carries
    "as of <date>" in its caption and points to the chapter's currency marker. A figure whose
    content can go stale (deadlines, statuses, counts) sets `asOf` and `reviewBy` in `figures.ts`
    and prints "As of YYYY-MM-DD" inside the SVG itself, so every download keeps its date; the
    build fails when the stamp is missing and warns once `reviewBy` has passed.
14. **Every figure is citable.** Each `figures.ts` entry gets a permalink at `/figures/<id>` and
    versioned downloads (§5). Its `title`, `caption`, `alt` and `description` are reused there
    and in the JSON-LD, so write them to stand alone, outside the chapter.

## 2. Briefs per figure

Each brief: *Message* (the sentence the reader takes away) · *Elements* (in reading order) ·
*So what* (the second sentence of the caption) · *Avoid*.

### 2.1 Pattern diagrams (archify, `at: 'head'` of the pattern's section in chapter 05)

**policy-card** (workflow, Layer 01). Message: a policy is a versioned card that a policy
engine evaluates at the gate, and its verdict is recorded against the change. Elements: policy
card (in repo) → policy engine → gate (diamond: allow / deny) → change proceeds or is blocked →
verdict record (evidence). Owner glyph on the card. So what: start by writing one card for one
obligation and wiring it to one gate. Avoid: naming an engine brand; more than one gate.

**aibom-at-build** (dataflow, Layer 02). Message: the build step emits the AI bill of materials,
which feeds the registry and the vulnerability and documentation consumers. Elements: sources
(model, datasets, prompts, dependencies) → build → AIBOM artefact → registry entry (store) →
consumers: vulnerability matching, regulator-facing documentation. So what: if your build does not
emit it, you cannot answer "what is running". Avoid: format names as the hero (CycloneDX/SPDX are
labels on the artefact at most); vendors.

**model-card-evidence** (workflow, Layer 02). Message: the model card is generated from real
training and eval outputs, validated against a schema, and attached to the release as evidence.
Elements: training/eval outputs → card generator → schema check (gate) → card attached to release →
cited by the evidence record. So what: a card that is written by hand is documentation; one that is
generated and validated is a control. Avoid: hand-written card as a node; any lab or vendor name.

**continuous-assurance-telemetry** (dataflow, Layer 05). Message: runtime signals are checked
against controls continuously and every check leaves an evidence record an auditor can read.
Elements: runtime signals (traces, guardrail events, registry state) → control checks → evidence
records (store) → dashboards / auditor. Layer 04 group on the left (signals), Layer 05 group on the
right (checks and store). So what: continuous means the evidence is produced by the data path, not
by a quarterly exercise. Avoid: more than three signal sources; monitoring-tool names.

**fria-as-code** (workflow, Layers 01/02). Message: the fundamental-rights impact assessment is
data captured at intake, assessed, mitigated, approved at a gate and stored machine-readable next to
the DPIA. Elements: intake questionnaire (data) → risk assessment → mitigations → approval gate
(diamond, human reviewer glyph) → FRIA record (evidence) linked to DPIA. So what: run it before
deployment of a high-risk system, and keep the record where the auditor looks. Avoid: legal prose
in labels; "form" as a node (it is data).

**framework-crosswalk** (architecture, Layers 01/05). Message: one internal control set is the
hub; external frameworks map to it, and evidence is attached once and reused for all of them.
Elements: internal control set (centre) with spokes to EU AI Act, ISO/IEC 42001, NIST AI RMF, CSA
AICM, OWASP (labels only); evidence store attached to the hub, not to the spokes. So what: the
crosswalk is an index, not the end state; the hub is what you maintain. Avoid: a matrix look;
more than six spokes; implying conformity.

**machine-readable-evidence** (dataflow, Layer 05). Message: controls, assessments and evidence
become OSCAL documents that validators check and assurance consumers read without a human
re-typing anything. Elements: control catalogue, assessment results, evidence records → OSCAL
documents (component/assessment) → validator (gate) → consumers: auditor, continuous-compliance
tooling category, regulator submission. So what: choose the format your assessor can ingest and
generate it from the same data you already hold. Avoid: OSCAL schema names beyond two; product
names.

**kill-switch-circuit-breaker** (architecture, Layer 04; batch 2). Message: a breaker revokes one
agent's scope on a signal without stopping the fleet, and the trip is itself an evidence event.
Elements: signal sources (guardrail, telemetry) → breaker → per-agent scope revoked (one hexagon
greyed) while other agents continue → incident record. So what: design the breaker per agent
scope before you need it; test the trip in staging. Avoid: duplicating the incident pipeline
figure (that one exists); more than three agents.

**agent-identity-scoped-credentials** (sequence, Layer 04; batch 2). Message: an agent gets a
short-lived, scoped credential from its registry entry at deploy time, and every call is
attributable. Elements (lanes): deploy pipeline · registry · identity issuer · agent · downstream
tool/API · audit log. Sequence: register → issue scoped credential → call with credential →
verify scope → log attribution. So what: no registry entry, no credential, no access. Avoid:
protocol acronyms beyond one (e.g. one "token exchange" label); vendor identity products.

**hitl-gate** (sequence, Layer 04; batch 2). Message: for the actions the policy marks as
needing a human, the agent pauses, a named reviewer decides within a time box, and the decision
is recorded. Elements (lanes): agent · policy check · reviewer (person glyph) · action target ·
evidence log. Sequence: propose action → policy says "human required" → reviewer approves or
rejects (or times out) → action executes or is dropped → decision logged. So what: define which
actions need a human by policy, not by habit. Avoid: chat-UI framing; more than one reviewer.

**shadow-ai-discovery** (workflow, Layer 02; batch 2). Message: discovery scans the places AI
hides (keys, traffic, repos, spend), matches findings against the registry, and turns unknowns
into registry entries or blocks. Elements: sources (API keys, network traffic, repos, invoices) →
discovery scan → match against registry (gate: known / unknown) → unknown → triage → registered
or blocked; evidence: discovery report. So what: run it before you claim your inventory is
complete. Avoid: security-tool brands; more than four sources.

**vendor-due-diligence-gate** (workflow, Layers 02/05; batch 2). Message: a procured model or
tool enters the inventory only after a due-diligence gate that checks documentation, evals and
contract terms, and the outcome is recorded. Elements: vendor package (docs, model card, terms) →
checks (documentation present, evals run, contract clauses) → gate (approve / reject / conditions)
→ registry entry with conditions → evidence record. So what: the gate is where deployer duties
start; keep the checklist versioned. Avoid: naming any vendor; legal clause text.

**adversarial-red-team-suite** (workflow, Layer 03; batch 2, after the pattern is written):
Message: a versioned adversarial suite runs on every relevant change and its findings are
evidence, triaged into fixes or accepted risk. Elements: threat taxonomy (categories, not
frameworks' names beyond one) → suite (versioned) → run in CI / scheduled → findings → triage
(gate: fix / accept) → evidence record; feedback edge from fixes to the suite. So what: treat
red-team findings like test failures with an owner and a deadline. Avoid: jailbreak jargon;
tool names.

**runtime-guardrail** (architecture, Layer 04; batch 2, after the pattern is written):
Message: guardrails sit on the input and output paths of the model or agent, enforce the policy
at runtime, and emit events that feed telemetry and the breaker. Elements: request → input
guardrail → model/agent (hexagon) → output guardrail → response; both guardrails read the policy
card and emit guardrail events → telemetry → (dotted) breaker. So what: a guardrail without
events is a filter, not a control. Avoid: listing guardrail products; more than two guardrails.

### 2.2 Chapter openers (archify; batch 2)

**the-stack-layers** (architecture, `at: 'lead'` in `the-stack`). Message: five layers, in this
order, each holding named artefacts, with evidence flowing up to assurance. Elements: five
horizontal bands bottom→top or left→right in canonical order, two or three artefacts per band
taken from the chapter's layer sections, one arrow "evidence" up into Layer 05. So what: read the
chapter layer by layer; build in the order chapter 04 gives for a team of one. Avoid: repeating the
`/stack` page's StackDiagram verbatim (this one is about artefacts, that one about flow); tools.

**regulatory-wave** (lifecycle, `at: 'lead'` in `why-now`). Message: obligations arrive in
stages over a short window, so the stack has to exist before the dates. Elements: stages in the
order the chapter states them, each labelled with the obligation family and its date exactly as
chapter 02 or 08 gives it (nothing else); a marker "you are here" is NOT included (it would date
the figure). So what: pick the next stage and map its obligations to artefacts in chapter 08.
Caption carries "as of <the chapter's currency date>". Avoid: any date not in the chapters.

### 2.3 Infographics (hand-made SVG, `figures.ts`)

**three-questions** (`definition`, head of "The three questions"). Message: everything in the
book serves three questions. Elements: three equal panels, each with the exact question from the
chapter, a glyph (registry cylinder / policy card + gate / evidence document) and the layers that
answer it as small layer chips using the chapter's own attribution. So what: if you cannot answer
one of the three for a system today, that is your first task. Avoid: paraphrasing the questions.

**values-principles** (`values-principles`, head of "The eight values"). Message: eight values
are trade-offs, six principles are commitments. Elements: two columns; left "Values" with the
eight affirmations verbatim from `values.ts`, right "Principles" with the six; a one-line header
per column stating trade-off vs commitment in the chapter's words. So what: quote them, do not
reword them, when you write your own policy. Avoid: icons per value (noise); shortening the
affirmations.

**minimum-viable-stack** (`the-stack`, head of "The minimum viable stack for a team of one"):
Message: one person can stand up the stack in five ordered steps. Elements: numbered steps
exactly as the section lists them, each with its layer chip (colour token) and the artefact it
yields; a thin arrow chaining them. So what: do step one this week. Avoid: adding steps or
effort estimates the chapter does not state.

**maturity-grid** (`maturity-model`, head of the section that states the weakest-layer rule,
likely "The five levels" or "Observable criteria, by layer and level": read to choose). Message:
your level is the weakest layer's level. Elements: 5×5 grid, layers as rows in canonical order,
levels Documented → Inventoried → Tested → Enforced → Continuous as columns; one illustrative
fill showing a system at mixed levels with the resulting level called out; a legend. Illustrative
fill must be labelled "illustrative". So what: assess each layer separately, then read the floor.
Avoid: scores or percentages.

**art73-clock** (`regulatory-map`, at the closest heading holding Art. 73, probably inside "EU AI
Act, post-Omnibus"). Message: the reporting window depends on the incident class, and the clock
starts at awareness. Elements: horizontal clock/timeline from "aware" with the windows exactly as
the chapter states them (class → deadline), the artefact that must exist to hit them (incident
pipeline) as a chip. So what: your pipeline must classify before it can report. Avoid: any
deadline not in the chapter; legal citations beyond "Art. 73".

**reading-paths** (`/bok` index, below the chapter grid). Message: three readers, three routes
through the book. Elements: three columns with persona heading in the preface's words, ordered
chapter nodes as real links (titles from `chapters.ts`), the newcomer route ending in the learning
path link. So what: pick your column and start at its first node. Avoid: a fourth persona; job
framing.

**pattern-map** (`patterns`, `at: 'lead'`, generated from `patterns.ts`). Message: the catalogue
covers all five layers and this is where each pattern lives. Elements: five bands in canonical
order, coloured by layer token, each holding its patterns as linked chips; dual-layer patterns
appear once, in their first layer, with a small secondary-layer mark. So what: start from the
layer you are weakest in (chapter 07) and open its patterns. Avoid: obligations on this map (that
is chapter 08's job); more than one line of text per chip.

Batch v0.5.0 (existing chapters): eleven infographics for the sections that carried no figure,
drawn from the chapters as they stand and declared at the end of `figures.ts`. Every dated one
prints its "As of" date inside the image as well as in its caption (section 4).

**five-objects** (`definition`, head of "The object of governance"). Message: the discipline
governs five nested objects, each with its own controls; governing one leaves the others open.
Elements: organisation (person glyph) around agents (hexagon) around systems around models
(hexagon); data (store glyph) beside them inside the organisation; each with the controls chapter
01 names. So what: check that every object in your estate has its control. Avoid: nesting data
inside models; adding controls for systems (the chapter names none).

**profession-in-numbers** (`why-now`, head of "The evidence"). Message: demand for AI governance
is near-universal and the skills asked for are build-and-run skills. Elements: demand panel (IAPP
2025: 77%, roughly 9 in 10, 1.5% = 10 of 671); skills panel (1,997 US postings, Aug 2026:
observability 41%, Python 28%, NIST frameworks 27%) as zero-based bars. Dated: "As of 2026-09-24"
in the art and the caption. So what: read the skills as the brief for a hiring or learning plan.
Avoid: any number the chapter does not state; the blocklisted certificate-holder or open-role
counts.

**human-oversight** (`the-stack`, head of "Designing human oversight (Article 14)"). Message:
oversight works only where it is designed: classify by consequence, put a checkpoint where the
stakes justify it, and measure the oversight itself. Elements: two failure modes (review every
action, nominal review); proposed action (hexagon) to the consequence gate (the one diamond); low:
proceeds; high: designed checkpoint (person glyph, Layer 04 chip); oversight evidence (document
with check) as the terminal node. So what: decide which actions need a person by consequence, then
watch approval rate, time-to-decide and override rate. Avoid: chat-UI framing; more than one
reviewer.

**procured-ai-control** (`the-stack`, head of "Third-party and procured AI"). Message: the less of
the model you own, the more of the control budget moves from testing it to bounding it and
evidencing the supplier. Elements: the vendor's system to the due-diligence gate (diamond), then
four layer bands in canonical order: 02 grows, 03 shrinks, 04 shrinks, 05 grows (evidence glyph).
So what: budget controls for bounding and evidencing, not only for testing. Avoid: layer 01 (the
section does not discuss it); vendor names.

**enforcement-map** (`regulatory-map`, foot of "EU AI Act, post-Omnibus", after art73-clock).
Message: who enforces, and how high the ceiling, depends on the regime. Elements: three tracks
with the regulator glyph (building): GPAI providers and the AI Office (Art. 101: 3% or EUR 15M;
Art. 75a–75d: up to 5% of average daily turnover per day); high-risk systems and national
market-surveillance authorities (for example AESIA; Art. 99 ceilings 7%, 3%, 1%); US frontier
developers under SB 53 and the Attorney General (USD 1M per violation). Dated: "As of 2026-09-24"
in the art and the caption. So what: record for each system which authority asks. Avoid: EUR
amounts for Art. 99 (chapter 08 states only the percentages); an application date for Art. 99.

**committee-gates** (`governance-program`, head of "The committee decides, the gates enforce").
Message: the committee decides only what the triggers route to it, and its exceptions come back as
data the gate enforces until they expire. Elements: use case, review triggers (no trigger:
straight to the gate), committee (person glyph), exception register (store), policy gate (the one
diamond), verdict record (evidence, terminal: live allow with the exception id; expired fails the
build). So what: file exceptions as data with an expiry, not as minutes. Avoid: showing the
committee reviewing every release.

**risk-loop-stack** (`risk-management`, head of "The loop on the five layers"). Message: each step
of the risk loop runs on a stack layer and a NIST AI RMF function, and every step writes to one
risk register. Elements: GOVERN frame; identify (MAP 1–5, GOVERN 5; L02), assess (MAP 5.1, MEASURE
1–2; L03), treat (MANAGE 1–3; L01, L04), monitor (MEASURE 3–4, MANAGE 4; L04, L05); loop rail back
to identify; risk register (store) as the terminal node. So what: find the step your function
skips, then build the layer that does its work. Avoid: ISO/IEC 23894 clause numbers (chapter 13
marks them verify).

**risk-matrix** (`risk-management`, foot of "The matrix and what each band triggers"). Message:
likelihood by severity gives the band that decides the gate, but S5 is Critical at any likelihood.
Elements: S5 as one override bar; S4 to S1 by L1 to L5 cells named by band on a neutral ink ramp
(fill-opacity on currentColor; Critical in solid ink with --bg text); the scales; band to gate and
acceptor. So what: rate on the defined scales, then wire each band to its gate. Avoid: scores or
products of likelihood and severity; layer colours for bands.

**mitigation-ladder** (`risk-management`, head of "Treating risk: the mitigation hierarchy").
Message: work the ladder top down; transfer sits beside it, and every rung leaves a residual.
Elements: five rungs (eliminate, substitute, engineer, administrative, accept and monitor), each
with its stack control and evidence (document with check); legal-floor note on rung 1; transfer in
a dashed box beside the ladder. So what: record why each higher rung was infeasible before
settling lower. Avoid: putting transfer on the ladder.

**provenance-lineage** (`governing-development`, head of "Provenance versus lineage"). Message:
provenance says where data came from and on what terms; lineage runs backward from a model and
forward from a dataset. Elements: source, dataset (store glyph), pipeline, two models (hexagons);
backward rail (what fed this model?) and forward rail (which models used this dataset?);
granularity list; lineage events (evidence) as the terminal node. So what: record lineage forward
as well as back. Avoid: standard or product names in the art (PROV and OpenLineage stay in the
chapter text).

**incident-clocks** (`incidents`, head of "The overlapping clocks"). Message: one event can start
several reporting clocks at once, and the nearest deadline bites first. Elements: ordinal axis
from awareness (4h to 15d, not to scale); eight lanes (DORA, NIS2, CRA, SB 53, AI Act Art. 73,
GPAI Code, GDPR Art. 33, RAISE) with their first-report marks; trigger footnote; one incident
record (evidence) as the terminal node. Dated: "As of 2026-09-24" in the art and the caption. So
what: hold every clock in one incident record and alert on the nearest deadline. Avoid: follow-up
and final reports (the table has them); regimes without a numeric clock.

### 2.4 The discipline map (generated SVG, `map.ts` + `map-build.mjs`)

**discipline-map** (`/map`, no chapter placement, generated from `src/data/map.ts` by
`scripts/map-build.mjs`): the one figure that is an *index of the whole book*, not a diagram of a
single mechanism, so it is exempt from the two limits in §1: it carries far more than nine nodes,
and its own budget is **≤ 48 KB** (`emit(name, svg, 48)` in `figures-build.mjs`) rather than 12 KB.
Everything else in §1 still holds: colour comes only from the layer tokens (no hex in the web
variant), the SVG carries `role`, `<title>` and `<desc>`, and every label is verbatim from a data
module or a `bok/*.md` heading (checked in `tests/map.spec.ts`).

- **Shape.** A deterministic two-sided tree: a central node (`AI Governance Engineer` → `/thesis`)
  with four branches on each side. Left: Foundations, Values & principles, The Stack, Patterns.
  Right: The Role, Obligations, Maturity, Learning path. Each branch has second-level leaves and,
  where the design calls for it, third-level chips (disambiguation neighbours, the five problems,
  patterns per layer, the three ways in, the twelve crosswalk topics, the eight framework families).
- **Palette.** The eight branches borrow the five layer tokens (no repeat within a side): left
  `--l1/--l2/--l3/--l4`, right `--l3/--l5/--l4/--l2`. Stack and Patterns leaves override with their
  *real* layer colour, so the layer palette stays legible across the map.
- **Two variants, one layout.** The **web** variant colours by class (light/dark from the tokens)
  and is inlined on `/map`; the **portrait** variant (for the LinkedIn infographic) is a standalone
  SVG with light-theme hex inline, a 1200-wide `viewBox`, the three font families in a `<style>`
  block, no background rect and no title/footer (the kit's frame supplies those), and absolute links.
  In the portrait, the Patterns branch renders its 17 pattern names as layer-coloured chips
  (`portrait: 'chips-only'` on the layer nodes) instead of repeating the five layer headers that
  The Stack branch already shows; its chips stay ≥ 14px so they survive the frame's scale-to-fit.
- **Responsive.** On phones the web canvas scrolls sideways inside a focusable, labelled region;
  the collapsible **index by cluster** below the map is the same content as a text list, so nothing
  is lost without the scroll.
- **Overflow is fatal.** Text is measured with a per-character width table (`svg-text.mjs`); a label
  that needs more than two lines, or a chip wider than its column, throws
  `map-build: label too long for column: <id>` at build time. The fix is a `short` on the node
  (a verbatim substring), never a smaller font or a clipped label.

## 3. Review checklist (run by the orchestrator before merge)

- [ ] Message stated in one sentence; caption follows the formula.
- [ ] Reading order unambiguous; one gate glyph; evidence node terminal.
- [ ] Node/edge budget respected; labels ≤ 4 words; notes/text alternative in chapter words.
- [ ] Layer names exact and in order; layer colours via tokens; glyph vocabulary consistent.
- [ ] No vendors, products, invented numbers or dates.
- [ ] Both themes and 390/834/1440 checked; a11y and contrast gates green; size within budget.
- [ ] Dated content: `asOf` and `reviewBy` set, "As of" printed inside the image (§1.13).
- [ ] Data-viz: axes, scale, source line and the `data` table fallback in place (§4).
- [ ] Exports: `/figures/<id>` renders; the light and dark PNGs read well; the attribution band
      is legible and uncropped (§5).
- [ ] Widgets: works without JS, carries the notice where it classifies, respects reduced motion,
      within its script budget (§6).

## 4. Data visualisation

A data-viz figure (`kind: 'data-viz'`) encodes quantities the chapter states: counts, durations,
deadlines, shares. It is held to everything in §1, plus these rules.

1. **Every number is the chapter's, with its citation.** The chart never computes a figure the
   chapter does not show; derived values (a difference, a share) show the arithmetic in the text
   alternative, as STYLEGUIDE §7 asks for prose.
2. **Axes.** Label each axis with the quantity and its unit ("days after awareness", "share of
   respondents, %"). Bars and areas start at zero; a truncated axis is a different chart. Ticks at
   round values, at most six per axis; gridlines hairline (`.rule`), never heavier than the data.
   Time runs left to right. No dual axes, no 3D, no pie with more than four slices.
3. **Scales.** Linear unless the axis label says "log scale". Colour encodes a category only when
   the category is a stack layer (`--l1`…`--l5`); otherwise ink for the data and one accent for
   the value the caption is about. Never colour alone: label series directly on the chart, and
   use a legend only when direct labels would collide.
4. **Source line.** Inside the image, bottom left, mono, muted, at least 12 px at 390 px:
   "Source: chapter NN [n]" (the chapter's own reference numbers). A reader who crops the chart
   keeps the provenance.
5. **As of.** Any value that can change carries "As of YYYY-MM-DD" inside the image next to the
   source line, and `asOf`/`reviewBy` in `figures.ts` (§1.13).
6. **HTML table fallback.** Required: the entry's `data` field holds the same numbers as a table
   (`caption`, `columns`, `rows`, `source`); the permalink renders it as a `<table>` with a
   caption and column headers, and the build fails without it. The table is the accessible and
   copyable form of the chart, not a summary of it.
7. **Numbers in text** use the mono face with tabular figures; percentages carry the % sign on
   every label, not only in the axis title.

## 5. Posters and exports

**Posters.** A poster (`kind: 'poster'`) is a figure that indexes a whole area of the book, like
the discipline map (§2.4): it may pass the node budget of §1.4, its budget is 48 KB, and `pages`
lists the site pages that show it. Lay posters out portrait at the A-series ratio of 1 : √2, so
one layout prints at any A size [1][2]: A4 is 210 × 297 mm, A3 297 × 420 mm, A2 420 × 594 mm, A1
594 × 841 mm and A0 841 × 1189 mm [2]. The 3200 px PNG holds about 387 px per inch across an A4
width (210 mm is 8.27 in; 3200 / 8.27) and about 274 across A3 (297 mm is 11.69 in); for A2 and
larger, print the SVG.

**What the build exports.** `scripts/figures-build.mjs` writes, for every entry in `figures.ts`,
seven files under `/downloads/figures/`, named by `figureExports()` so the pages link exactly what
exists:

| File | What it is |
|---|---|
| `<id>-v<version>.svg` | Standalone SVG that follows the viewer's `prefers-color-scheme` |
| `<id>-v<version>-light.svg`, `-dark.svg` | The same, fixed to one theme (slides, print) |
| `<id>-v<version>-light-1600.png`, `-3200.png` | Light PNG, 1600 and 3200 px wide |
| `<id>-v<version>-dark-1600.png`, `-3200.png` | Dark PNG, 1600 and 3200 px wide |

- **Generated, never committed.** The folder is git-ignored like `public/diagrams`; every build
  rewrites it, and a render cache (`site/.figures-cache`) skips PNGs whose input did not change.
  `<version>` is `bokVersion` in `src/data/site.ts`; older versions live in the archived releases,
  not on the site.
- **Colour.** The exporter reads `tokens.css` and the `.figc` rules of `figures.css` and resolves
  every `var()` and `color-mix()` to a value per theme, so an export matches the site and a token
  change reaches it on the next build. Each export carries its own ground (`--bg`), so it reads
  on any slide background. Never hard-code a colour in a figure to "fix" an export.
- **Attribution band.** Under a hairline at the foot of every export, in mono and `--muted`:
  "aigovernanceengineer.com · CC BY 4.0 · v<version>". It is part of the image, not a caption:
  do not crop it, cover it or shrink it below its computed size. The build fails if the band
  would be wider than the figure.
- **Type.** The SVGs declare the three site faces (`@font-face` with `local()` first, then the
  site's WOFF2 by absolute URL) with system fallbacks and keep the text live. The PNGs are drawn
  with the same faces, decoded at build from the installed `@fontsource` packages, so they match
  the site on any machine; a glyph outside those Latin subsets (such as "→") falls back to a system
  face, and the build warns when none has it. Keep figure text within Latin, "·" and "→".
- **Links and metadata.** Every link in an export is absolute. The SVG carries `role="img"`, its
  `<title>` and `<desc>` (with the credit) and Creative Commons RDF metadata; each PNG carries
  `iTXt` chunks for title, author, description, licence and source URL.
- **Credit when reused.** CC BY 4.0 lets anyone share and adapt a figure, commercially too, if
  they give appropriate credit, link to the licence and indicate changes [3]. The permalink page
  gives a credit line with title, author, source and licence, the four elements Creative Commons
  recommends [4], and HTML and Markdown embed snippets built from it.

## 6. Interactive widgets

A widget is any figure or tool that runs client-side script: an explorer, a filter, a
calculator, a drawer. It is progressive enhancement over content that is already on the page.

1. **No-JS fallback.** Without JavaScript the page shows the full content as HTML (a list, a
   table, the static figure) and every link works; the script only filters, reveals or animates.
   Check every widget with JavaScript disabled before merge.
2. **CSP.** Scripts are same-origin files (`public/*.js` or Astro-bundled modules), loaded with
   `defer`; no inline script, no `eval`, no third-party library without review. Data comes from
   the same typed module or JSON dataset the static page renders; no fact lives only in the
   script.
3. **Not-legal-advice notice.** A widget that classifies, scores or tells a reader which
   obligations apply shows, next to the result: "A reading aid, not legal advice. Mappings are
   illustrative, not a claim of conformity." It links the chapter sources behind the result and
   prints the `asOf` date of its data.
4. **Motion.** Under `prefers-reduced-motion: reduce` nothing animates: state changes are
   instant. Otherwise animate `transform` only, with the `--dur`/`--ease` tokens; never dim text
   with opacity. Nothing that starts on its own moves for more than five seconds without a way
   to pause it, which WCAG 2.2 criterion 2.2.2 requires [5].
5. **Input.** Every control is reachable and operable by keyboard with a visible focus ring;
   pointer targets are at least 24 × 24 CSS px (WCAG 2.2 criterion 2.5.8, level AA) [6]; results
   are announced through one polite `aria-live` region. Shareable state goes in the URL; no
   cookies, and `localStorage` only for a preference.
6. **Budgets.** At most 15 KB gzip per widget script, measured on the built file; the SVGs it
   drives stay within §1.12 (12 KB per infographic, 48 KB per poster). A widget that needs more
   is split, or its data moves to a JSON file loaded on demand.

### Sources

[1] ISO 216:2007, Writing paper and certain classes of printed matter: trimmed sizes, A and B
series (cited by identifier; the A series keeps a 1 : √2 ratio). ISO. 2007.
https://www.iso.org/standard/36631.html (verified: reported)
[2] ISO 216 (A-series dimensions in millimetres, A0 to A4, and the √2 ratio). Wikipedia.
2026-09-24. https://en.wikipedia.org/wiki/ISO_216 (verified: secondary)
[3] Attribution 4.0 International, deed ("You must give appropriate credit, provide a link to
the license, and indicate if changes were made"). Creative Commons. 2026-09-24.
https://creativecommons.org/licenses/by/4.0/ (verified: primary)
[4] Recommended practices for attribution (TASL: title, author, source, licence). Creative
Commons. 2026-09-24. https://wiki.creativecommons.org/wiki/Recommended_practices_for_attribution
(verified: primary)
[5] Web Content Accessibility Guidelines (WCAG) 2.2, success criterion 2.2.2 Pause, Stop, Hide.
W3C Recommendation. 2024-12-12. https://www.w3.org/TR/WCAG22/ (verified: primary)
[6] Understanding success criterion 2.5.8 Target Size (Minimum), level AA. W3C. 2024-12-12.
https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html (verified: primary)
