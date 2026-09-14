# Changelog

All notable changes to *AI Governance Engineering: A Manifesto & Body of Knowledge* are recorded here.
Versioning is semantic in spirit: patch = fact/typo fixes, minor = new chapters or patterns, major =
a completed, reviewed core (1.0).

## [0.2] — 2026-09-10

Peer-review revision. Applies the HIGH and MEDIUM findings of **peer review round 1** (a senior-
practitioner review and an adversarial fact-check), plus the cheap LOW findings.

### Changed
- `bok/03-values-principles.md`, `MANIFESTO.md` — reworked the six principles into strict commitments
  to action with no lexical overlap with the eight values (principles renamed accordingly); reframed
  value 6 from "Practitioner-built open tooling over closed platforms" to "**Inspectable, composable
  tooling** over black boxes"; noted which values are inherited from GRC engineering.
- `bok/01-definition.md` — added "the limits of the eval gate" (evals necessary, not sufficient;
  point-in-time, Goodhartable, blind to novelty); strengthened the AI-security-engineering boundary
  (the deliverable is a governed, evidenced system; overlap is a feature).
- `MANIFESTO.md`, `bok/01-definition.md`, `bok/04-the-stack.md` — conceded that three of the five
  layers are inherited from GRC engineering and two (evals-as-controls, agent identity/runtime) are
  what AI forces us to add.
- `bok/04-the-stack.md` — distinguished MCP channel authentication from agent workload identity;
  presented Policy Cards / the OSCAL-extension preprint / TAIP / AAGATE as "one proposed approach" and
  named OSCAL's native model as the stable substrate; added Cedar-vs-Rego nuance; added sections on
  data governance, designing human oversight (Art. 14), third-party and procured AI, and the cost of
  the stack (FinOps).
- `bok/05-patterns.md` — added the pattern **Vendor / Model Due-Diligence Gate** (CSIRO template);
  sharpened Agent Identity (channel vs workload identity); tightened Continuous Assurance Telemetry to
  a concrete evidence schema; hedged the OSCAL-extension and TAIP/AAGATE proposals (now 14 patterns).
- `bok/06-the-role.md` — softened the analyst-vs-engineer table (cadence and artefact, not competence
  or access); moved named job postings to a footnote, keeping the IAPP bands and skills-demand data.
- `bok/07-maturity-model.md` — added a Level 4 eval-quality criterion (suite coverage / adversarial
  quality assessed, not just the gate's existence) and a "partial maturity is normal" reading.
- `bok/08-regulatory-map.md` — added a **Duty holder** column (provider / deployer / both); aligned
  the FRIA layer placement with chapter 05.

### Fixed (fact-check round 1)
- `bok/09-glossary.md` — RAISE Act date softened to "reported to take effect 1 Jan 2027 (verify
  enactment)"; guardian-agent figure decoupled from the June 2025 project-cancellation release (now a
  separate Gartner prediction, reported).
- `bok/08-regulatory-map.md` — Regulation (EU) 2026/1744 verified on EUR-Lex and cited as primary.
- `bok/04-the-stack.md` — GPAI Code of Practice source date corrected to 10 Jul 2025.
- `bok/05-patterns.md` — TAIP arXiv date corrected to 2026-02 (submitted 15 Feb 2026).
- OWASP Agentic ASI titles left as drafted; could not be re-confirmed verbatim from the resource page
  (the enumerated list is in the downloadable PDF, and the web-search budget was exhausted).

### Added
- `MANIFESTO.md` — a second, independent source (IBM/Gartner Magic Quadrant, 2026) hedging the Kosmoy
  "no runtime data path" thesis.

## [0.1] — 2026-09

First public draft. Founding release.

### Added
- `MANIFESTO.md` — the founding statement: definition and "more than X" clarifier; five fundamental
  problems with legacy AI governance; eight values (Agile grammar); six principles; what AI governance
  engineers build; authors and "co-authors wanted"; sign / get involved; CC BY 4.0 licence.
- `STYLEGUIDE.md` — voice and formatting rules; chapter template; CSIRO pattern template; citation
  format with `primary`/`secondary`/`reported` tags; canonical terminology; words to avoid; handling
  of unverified figures.
- `OUTLINE.md` — full table of contents (chapters 00–10) with a per-chapter brief.
- `bok/00-preface.md` — provenance, audience, what it is not, how to cite, versioning, contributing.
- `bok/01-definition.md` — the definition, three clarifiers, the eight-neighbour disambiguation cluster
  (table + prose), the object of governance, the three questions.
- `bok/02-why-now.md` — the five problems with the evidence; profession, market, standards-gap,
  regulatory-wave and agent-shift signals; what changes when governance is engineered.
- `bok/03-values-principles.md` — the eight values and six principles, each expanded with an "In
  practice" example and an anti-pattern.
- `bok/04-the-stack.md` — the five-layer reference architecture, per layer (what it proves, artefacts,
  illustrative tools, definition of done, anti-patterns, evidence flow), plus the minimum viable stack.
- `bok/05-patterns.md` — the pattern catalogue: 13 CSIRO-template patterns, each named to a layer.
- `bok/06-the-role.md` — the role by workflow; skills; analyst-vs-engineer; career ladder; entry
  paths; the market; common JD mistakes.
- `bok/07-maturity-model.md` — the five levels (Documented → Continuous), observable criteria by
  layer, metrics, self-assessment checklist, relation to ISO 42001 / AIMA / STAR for AI.
- `bok/08-regulatory-map.md` — the reverse index: EU AI Act (post-Omnibus), GPAI Code of Practice,
  ISO/IEC 42001 and 42005, NIST AI RMF, CSA AICM, OWASP GenAI, US frontier laws, and what is not
  harmonised yet.
- `bok/09-glossary.md` — canonical definitions, alphabetical, cross-referenced to chapters.
- `bok/10-reading-list.md` — annotated bibliography grouped by theme, each with a verified URL.
- `README.md`, `bok/CONTRIBUTORS.md` (authors + signatories), `bok/CHANGELOG.md`.
- `sources/SOURCES.md` — consolidated verified source table, one section per chapter.
- `build/build_pdf.py` — assembles the Markdown into `dist/site-preview.html` (PDF export available but not shipped).

### Notes
- This is a first public draft: chapters 00–10 are drafted, and the catalogue, mappings and arguments
  remain open for co-authors to extend and sharpen.
- All facts are current as of 2026-09-10 and carry verified citations. The regulatory and standards
  landscape (EU AI Act Digital Omnibus, CEN-CENELEC JTC 21 harmonised standards, OWASP and CSA
  releases) is expected to move; chapters will be revised.
