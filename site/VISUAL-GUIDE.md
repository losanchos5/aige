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
   "— generated from the Body of Knowledge"; infographic captions end with "— drawn from chapter NN".
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
12. **Weight.** Archify SVGs are inlined: keep node counts down. Infographic SVGs ≤ 12 KB each.
    If a chapter page passes 450 KB of HTML, flag it: the orchestrator decides on external SVGs.
13. **Dates and numbers** appear only if the chapter states them; any timeline carries
    "as of <date>" in its caption and points to the chapter's currency marker.

## 2. Briefs per figure

Each brief: *Message* (the sentence the reader takes away) · *Elements* (in reading order) ·
*So what* (the second sentence of the caption) · *Avoid*.

### 2.1 Pattern diagrams (archify, `at: 'head'` of the pattern's section in chapter 05)

**policy-card** (workflow, Layer 01) — Message: a policy is a versioned card that a policy
engine evaluates at the gate, and its verdict is recorded against the change. Elements: policy
card (in repo) → policy engine → gate (diamond: allow / deny) → change proceeds or is blocked →
verdict record (evidence). Owner glyph on the card. So what: start by writing one card for one
obligation and wiring it to one gate. Avoid: naming an engine brand; more than one gate.

**aibom-at-build** (dataflow, Layer 02) — Message: the build step emits the AI bill of materials,
which feeds the registry and the vulnerability and documentation consumers. Elements: sources
(model, datasets, prompts, dependencies) → build → AIBOM artefact → registry entry (store) →
consumers: vulnerability matching, regulator-facing documentation. So what: if your build does not
emit it, you cannot answer "what is running". Avoid: format names as the hero (CycloneDX/SPDX are
labels on the artefact at most); vendors.

**model-card-evidence** (workflow, Layer 02) — Message: the model card is generated from real
training and eval outputs, validated against a schema, and attached to the release as evidence.
Elements: training/eval outputs → card generator → schema check (gate) → card attached to release →
cited by the evidence record. So what: a card that is written by hand is documentation; one that is
generated and validated is a control. Avoid: hand-written card as a node; any lab or vendor name.

**continuous-assurance-telemetry** (dataflow, Layer 05) — Message: runtime signals are checked
against controls continuously and every check leaves an evidence record an auditor can read.
Elements: runtime signals (traces, guardrail events, registry state) → control checks → evidence
records (store) → dashboards / auditor. Layer 04 group on the left (signals), Layer 05 group on the
right (checks and store). So what: continuous means the evidence is produced by the data path, not
by a quarterly exercise. Avoid: more than three signal sources; monitoring-tool names.

**fria-as-code** (workflow, Layers 01/02) — Message: the fundamental-rights impact assessment is
data captured at intake, assessed, mitigated, approved at a gate and stored machine-readable next to
the DPIA. Elements: intake questionnaire (data) → risk assessment → mitigations → approval gate
(diamond, human reviewer glyph) → FRIA record (evidence) linked to DPIA. So what: run it before
deployment of a high-risk system, and keep the record where the auditor looks. Avoid: legal prose
in labels; "form" as a node (it is data).

**framework-crosswalk** (architecture, Layers 01/05) — Message: one internal control set is the
hub; external frameworks map to it, and evidence is attached once and reused for all of them.
Elements: internal control set (centre) with spokes to EU AI Act, ISO/IEC 42001, NIST AI RMF, CSA
AICM, OWASP (labels only); evidence store attached to the hub, not to the spokes. So what: the
crosswalk is an index, not the end state; the hub is what you maintain. Avoid: a matrix look;
more than six spokes; implying conformity.

**machine-readable-evidence** (dataflow, Layer 05) — Message: controls, assessments and evidence
become OSCAL documents that validators check and assurance consumers read without a human
re-typing anything. Elements: control catalogue, assessment results, evidence records → OSCAL
documents (component/assessment) → validator (gate) → consumers: auditor, continuous-compliance
tooling category, regulator submission. So what: choose the format your assessor can ingest and
generate it from the same data you already hold. Avoid: OSCAL schema names beyond two; product
names.

**kill-switch-circuit-breaker** (architecture, Layer 04; batch 2) — Message: a breaker revokes one
agent's scope on a signal without stopping the fleet, and the trip is itself an evidence event.
Elements: signal sources (guardrail, telemetry) → breaker → per-agent scope revoked (one hexagon
greyed) while other agents continue → incident record. So what: design the breaker per agent
scope before you need it; test the trip in staging. Avoid: duplicating the incident pipeline
figure (that one exists); more than three agents.

**agent-identity-scoped-credentials** (sequence, Layer 04; batch 2) — Message: an agent gets a
short-lived, scoped credential from its registry entry at deploy time, and every call is
attributable. Elements (lanes): deploy pipeline · registry · identity issuer · agent · downstream
tool/API · audit log. Sequence: register → issue scoped credential → call with credential →
verify scope → log attribution. So what: no registry entry, no credential, no access. Avoid:
protocol acronyms beyond one (e.g. one "token exchange" label); vendor identity products.

**hitl-gate** (sequence, Layer 04; batch 2) — Message: for the actions the policy marks as
needing a human, the agent pauses, a named reviewer decides within a time box, and the decision
is recorded. Elements (lanes): agent · policy check · reviewer (person glyph) · action target ·
evidence log. Sequence: propose action → policy says "human required" → reviewer approves or
rejects (or times out) → action executes or is dropped → decision logged. So what: define which
actions need a human by policy, not by habit. Avoid: chat-UI framing; more than one reviewer.

**shadow-ai-discovery** (workflow, Layer 02; batch 2) — Message: discovery scans the places AI
hides (keys, traffic, repos, spend), matches findings against the registry, and turns unknowns
into registry entries or blocks. Elements: sources (API keys, network traffic, repos, invoices) →
discovery scan → match against registry (gate: known / unknown) → unknown → triage → registered
or blocked; evidence: discovery report. So what: run it before you claim your inventory is
complete. Avoid: security-tool brands; more than four sources.

**vendor-due-diligence-gate** (workflow, Layers 02/05; batch 2) — Message: a procured model or
tool enters the inventory only after a due-diligence gate that checks documentation, evals and
contract terms, and the outcome is recorded. Elements: vendor package (docs, model card, terms) →
checks (documentation present, evals run, contract clauses) → gate (approve / reject / conditions)
→ registry entry with conditions → evidence record. So what: the gate is where deployer duties
start; keep the checklist versioned. Avoid: naming any vendor; legal clause text.

**adversarial-red-team-suite** (workflow, Layer 03; batch 2, after the pattern is written) —
Message: a versioned adversarial suite runs on every relevant change and its findings are
evidence, triaged into fixes or accepted risk. Elements: threat taxonomy (categories, not
frameworks' names beyond one) → suite (versioned) → run in CI / scheduled → findings → triage
(gate: fix / accept) → evidence record; feedback edge from fixes to the suite. So what: treat
red-team findings like test failures with an owner and a deadline. Avoid: jailbreak jargon;
tool names.

**runtime-guardrail** (architecture, Layer 04; batch 2, after the pattern is written) —
Message: guardrails sit on the input and output paths of the model or agent, enforce the policy
at runtime, and emit events that feed telemetry and the breaker. Elements: request → input
guardrail → model/agent (hexagon) → output guardrail → response; both guardrails read the policy
card and emit guardrail events → telemetry → (dotted) breaker. So what: a guardrail without
events is a filter, not a control. Avoid: listing guardrail products; more than two guardrails.

### 2.2 Chapter openers (archify; batch 2)

**the-stack-layers** (architecture, `at: 'lead'` in `the-stack`) — Message: five layers, in this
order, each holding named artefacts, with evidence flowing up to assurance. Elements: five
horizontal bands bottom→top or left→right in canonical order, two or three artefacts per band
taken from the chapter's layer sections, one arrow "evidence" up into Layer 05. So what: read the
chapter layer by layer; build in the order chapter 04 gives for a team of one. Avoid: repeating the
`/stack` page's StackDiagram verbatim (this one is about artefacts, that one about flow); tools.

**regulatory-wave** (lifecycle, `at: 'lead'` in `why-now`) — Message: obligations arrive in
stages over a short window, so the stack has to exist before the dates. Elements: stages in the
order the chapter states them, each labelled with the obligation family and its date exactly as
chapter 02 or 08 gives it (nothing else); a marker "you are here" is NOT included (it would date
the figure). So what: pick the next stage and map its obligations to artefacts in chapter 08.
Caption carries "as of <the chapter's currency date>". Avoid: any date not in the chapters.

### 2.3 Infographics (hand-made SVG, `figures.ts`)

**three-questions** (`definition`, head of "The three questions") — Message: everything in the
book serves three questions. Elements: three equal panels, each with the exact question from the
chapter, a glyph (registry cylinder / policy card + gate / evidence document) and the layers that
answer it as small layer chips using the chapter's own attribution. So what: if you cannot answer
one of the three for a system today, that is your first task. Avoid: paraphrasing the questions.

**values-principles** (`values-principles`, head of "The eight values") — Message: eight values
are trade-offs, six principles are commitments. Elements: two columns; left "Values" with the
eight affirmations verbatim from `values.ts`, right "Principles" with the six; a one-line header
per column stating trade-off vs commitment in the chapter's words. So what: quote them, do not
reword them, when you write your own policy. Avoid: icons per value (noise); shortening the
affirmations.

**minimum-viable-stack** (`the-stack`, head of "The minimum viable stack for a team of one") —
Message: one person can stand up the stack in five ordered steps. Elements: numbered steps
exactly as the section lists them, each with its layer chip (colour token) and the artefact it
yields; a thin arrow chaining them. So what: do step one this week. Avoid: adding steps or
effort estimates the chapter does not state.

**maturity-grid** (`maturity-model`, head of the section that states the weakest-layer rule,
likely "The five levels" or "Observable criteria, by layer and level": read to choose) — Message:
your level is the weakest layer's level. Elements: 5×5 grid, layers as rows in canonical order,
levels Documented → Inventoried → Tested → Enforced → Continuous as columns; one illustrative
fill showing a system at mixed levels with the resulting level called out; a legend. Illustrative
fill must be labelled "illustrative". So what: assess each layer separately, then read the floor.
Avoid: scores or percentages.

**art73-clock** (`regulatory-map`, at the closest heading holding Art. 73, probably inside "EU AI
Act, post-Omnibus") — Message: the reporting window depends on the incident class, and the clock
starts at awareness. Elements: horizontal clock/timeline from "aware" with the windows exactly as
the chapter states them (class → deadline), the artefact that must exist to hit them (incident
pipeline) as a chip. So what: your pipeline must classify before it can report. Avoid: any
deadline not in the chapter; legal citations beyond "Art. 73".

**reading-paths** (`/bok` index, below the chapter grid) — Message: three readers, three routes
through the book. Elements: three columns with persona heading in the preface's words, ordered
chapter nodes as real links (titles from `chapters.ts`), the newcomer route ending in the learning
path link. So what: pick your column and start at its first node. Avoid: a fourth persona; job
framing.

**pattern-map** (`patterns`, `at: 'lead'`, generated from `patterns.ts`) — Message: the catalogue
covers all five layers and this is where each pattern lives. Elements: five bands in canonical
order, coloured by layer token, each holding its patterns as linked chips; dual-layer patterns
appear once, in their first layer, with a small secondary-layer mark. So what: start from the
layer you are weakest in (chapter 07) and open its patterns. Avoid: obligations on this map (that
is chapter 08's job); more than one line of text per chip.

### 2.4 The discipline map (generated SVG, `map.ts` + `map-build.mjs`)

**discipline-map** (`/map`, no chapter placement, generated from `src/data/map.ts` by
`scripts/map-build.mjs`) — the one figure that is an *index of the whole book*, not a diagram of a
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
