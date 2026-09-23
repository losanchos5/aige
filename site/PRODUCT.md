# AI Governance Engineer
<!-- impeccable:product-schema 1 -->

## Platform

web

**Positioning:** the reference site for AI Governance Engineering — the discipline that turns AI
governance into policy-as-code, eval gates and machine-readable evidence you can run, not just read.

## Audience

- AI governance practitioners who need a shared vocabulary, patterns and a career map.
- Software/ML engineers moving into governance who want the discipline framed in engineering terms
  (registries, pipelines, gates, evidence) rather than policy prose.
- Compliance and risk leads who need to translate legal obligations (EU AI Act, ISO/IEC 42001, NIST
  AI RMF, CSA AICM, OWASP) into controls their engineering teams can actually implement and prove.

## What it contains

- **Thesis** — the founding argument, written and published in Spanish (DOI-registered), co-authored
  by Jorge García Aibar and Aurélie Pols.
- **Body of Knowledge** — numbered chapters (`bok/NN-title.md`) plus a single patterns catalogue
  (`05-patterns.md`, CSIRO-style) covering the five-layer governance stack: Govern-as-Code, Inventory
  & Transparency, Evals & Red Teaming as Evidence, Runtime Controls & Observability, and Assurance &
  Continuous Compliance.
- **Role** — the AI Governance Engineer capability statement, workflows and market framing (`/role`).
- **Stack** — the five-layer architecture as an interactive diagram (`/stack`).
- **Path** — a self-tracked career/learning path with per-node progress (`/path`).
- **Map** — the discipline map: how the layers, workflows and roles connect (`/map`).
- **Resources** — frameworks, a topic crosswalk (frameworks × topics), a glossary, a tools directory
  and a reading list (`/resources/*`).
- **About** — authorship, attribution rules and a changelog/contributors record.

## Tone of voice (from `STYLEGUIDE.md`)

- **Editorial and direct.** Short sentences, one idea each, active voice. We write as practitioners,
  for practitioners, for a reader building something on Monday.
- **No hype.** No "revolutionary", "game-changing", "unlock", "supercharge" — if the sentence still
  works without the adjective, the adjective goes.
- **No vendor pitch.** Tools appear as categories, never as endorsed brands; every tool list is
  illustrative, not exhaustive.
- **Sourced.** Every number, date, version or quote carries a `[n]` citation or is marked
  `reported`; nothing is asserted without evidence.
- **Precise, not dumbed down.** Technical terms (idempotent, attestation, non-human identity) are
  used and defined once, in the glossary, rather than avoided.
- **Show the mechanism.** Claims say what a control does at runtime and what evidence it leaves —
  "a policy is not a control; an eval that can fail the build is."
- **English site, Spanish thesis.** The Body of Knowledge, role, stack, path, map and resources are
  in English; the Thesis is published in Spanish as the founding academic text.

## Author / attribution

Jorge García Aibar is the sole author of the Body of Knowledge, the website, the datasets and the
project materials. The Thesis is the one exception, co-authored by Jorge García Aibar and Aurélie
Pols. The site is explicitly a public draft, not a finished product pitch.

## What "good" looks like for the UI

- A **calm editorial register**: pastel five-layer accents on a warm off-white (light) or near-black
  (dark) surface, one display font for headings, one body font, one mono font for labels/code —
  never a marketing-agency look.
- **Dense but scannable reference tables** for the crosswalk, obligations and glossary — the content
  is a working reference, not a brochure; tables carry the disambiguation, prose stays light.
- **Figures as first-class content.** Diagrams (archify) and infographics are generated from the
  same typed data and chapter text — never decoration bolted on afterward — and follow the rules in
  `VISUAL-GUIDE.md` (one message per figure, sourced numbers only, layer colors from the site
  tokens, accessible text alternatives).
- **Evidence-first framing** throughout: every mechanism the site describes ends in a concrete
  artifact (a record, a signed document, a store entry), matching how the Thesis measures work.
- Motion and depth (the "Editorial+" layer: gradient mesh, glow, card lift) are subtle, transform-led
  accents that never compromise contrast, reduced-motion users, or load performance.

## Non-goals

- No marketing gradients, hero video loops, or agency-template visual flourishes beyond the
  documented Editorial+ primitives.
- No dark patterns: no fake urgency, no forced newsletter modals, no disguised ads, no manipulative
  copy.
- No newsletter popups or interstitials — email capture (Buttondown) is an inline, opt-in surface on
  `/about`, never a modal or scroll-triggered popup.
- No vendor endorsements or named-product recommendations inside governance content.
- No unsourced statistics, dates or claims — everything traces to a citation or is marked
  `reported`.
