# Changelog

All notable changes to *AI Governance Engineering: The Thesis & Body of Knowledge* are recorded here.
Versioning is semantic in spirit: patch = fact/typo fixes, minor = new chapters or patterns, major =
a completed, reviewed core (1.0).

## Unreleased (v0.5.0)

- Chapters 11 to 22 are written in full, replacing the stubs, in three parts: foundations (11 AI
  defined for governance; 12 running the AI governance program; 13 where risk management sits),
  the lifecycle (14 governing development; 15 governing deployment and use; 16 fairness and
  explainability; 17 incidents, issues and root causes) and law and standards (18 the EU AI Act in
  one pass; 19 privacy and data protection; 20 other law that already applies to AI, covering
  intellectual property, non-discrimination, consumer protection, product liability and deepfakes,
  with a dated case table and a defect-to-evidence table; 21 AI-specific laws around the world; 22
  principles, soft law and standards). Chapter 23 (governing AI agents) is still a stub.
- Book integration pass (block b-bok-maintenance): chapters 11 to 22 are woven into the rest of the
  book. `site/src/data/chapters.ts` carries a one-sentence summary and an "at a glance" block for
  chapter 02 and each of chapters 11 to 22; chapters 01 to 04, 06 to 08 and 11 to 22 gain deep
  links to the sections that develop each topic (route-level links between chapters 11 to 22 now
  point at the relevant section, except whole-chapter orientation references), plus links to the
  harms atlas, the cases and the templates page.
- `bok/08-regulatory-map.md`: the Article 73 clock table now counts the 15-, 2- and 10-day outer
  deadlines from awareness, with the immediate duty on a causal link, and names the deployer when
  it cannot reach the provider (`Art. 26(5)`); `Art. 75(1a)` and the scope of `Arts. 75a` to
  `75d` are stated precisely; the South Korea row cites the Act and Enforcement Decree on
  law.go.kr (primary) and the MSIT guidance period; the China paragraph points to chapter 21 for
  the anthropomorphic interaction measures; the US section points to chapter 21; "What is NOT
  harmonised yet" gives the JTC 21 stages as of 2026-09-24; the NIST AI RMF section notes that
  1.0 "is being revised"; a pointer to chapter 18 opens the EU section; Omnibus precisions for
  `Art. 6` and `Art. 25` are added in prose. Sources `[57]` to `[63]` added; `[34]` now cites
  law.go.kr. No H2 or H3 renamed and no obligation-table row changed.
- SR 11-7 superseded: chapters 01 and 02 and `STYLEGUIDE.md` section 10 now say that SR 26-2
  (Federal Reserve, OCC and FDIC, 17 Apr 2026) replaced SR 11-7 and leaves generative and agentic
  AI models out of its scope (new sources, verified primary). `STYLEGUIDE.md` gains a
  "Superseded references" rule (SR 26-2, ISO 31073:2022, ISO 9001:2026, ISO/IEC 27701:2025).
- `sources/SOURCES.md`: sections for chapters 12, 13 and 15 to 22, and a new "Site data pages"
  part for the harms atlas, the eleven cases and the templates page; rows added for the new
  sources of chapters 01, 02 and 08.

## [Unreleased] - 2026-09-20

Pending patch, folded into the next tagged release (version 0.4.0 stays as is): China added to the
regulatory map, and authorship and attribution clarified across the project. The Thesis wording,
definition, values and principles are unchanged; only its CC BY attribution notice is clarified.

### Changed
- Typography: no em dashes anywhere in the published text. Every one in the Thesis (EN and ES),
  the chapters, this changelog, the site copy, the diagrams and the figures became a comma pair, a
  colon, a semicolon, a full stop or parentheses; the wording and meaning are unchanged. Anchors
  that changed with a heading: the five `#layer-0N-…` sections of chapter 04 (links updated) and
  these changelog headings. `site/scripts/content-lint.mjs` now fails the build on any em dash, and
  `STYLEGUIDE.md` states the rule.
- Authorship and CC BY attribution are now explicit by scope: Jorge García Aibar is the sole author
  of the Body of Knowledge, website, datasets and project materials; the Thesis remains co-authored
  by Jorge García Aibar and Aurélie Pols. Chapter citations, BibTeX, JSON-LD, dataset metadata,
  `CITATION.cff`, contribution guidance and the downloadable PDF now follow that distinction.

### Added
- `bok/08-regulatory-map.md`, `sources/SOURCES.md`: a **China** subsection under "Other
  jurisdictions": the two-tier picture (four binding CAC rules on algorithmic recommendation, deep
  synthesis, generative AI services and AI-content labelling, plus the mandatory standard GB
  45438-2025; the voluntary GB/T 45654-2025 and the TC260 **AI Safety Governance Framework 3.0**), a
  seven-row obligation-to-artefact table stamped "as of 2026-09-20", and a crosswalk of the
  framework's **Appendix 2** (agentic AI risk management) against the OWASP Top 10 for Agentic
  Applications 2026 and the NIST AI Agent Standards Initiative. A new "What is NOT harmonised yet"
  bullet notes that the TC260 framework cross-references neither the Western instruments nor China's
  own binding rules. Sources `[41]`–`[51]` (ten `primary`, one `reported`).

## [0.4.0] - 2026-09-19

Minor release: two new patterns, a fuller regulatory map, curated resources, and a visual layer for
the whole book. No change to the definition, values or principles.

### Added
- `bok/05-patterns.md`: two patterns the outline had promised: **Adversarial Red-Team Suite**
  (Layer 03) and **Runtime Guardrail** (Layer 04, distinct from Kill Switch / Circuit Breaker). The
  catalogue now has 17 patterns; `OUTLINE.md` updated. Four illustrative JSON schemas (Policy Card
  verdict, Eval Gate result, Continuous Assurance evidence record, Agent Registry entry) placed where
  the prose already specified their fields.
- `bok/04-the-stack.md`: one named, anonymised system carried through the five "In practice" boxes
  and a short "One system through the five layers" section after the minimum viable stack; bold
  pattern names now link to the catalogue.
- `bok/08-regulatory-map.md`, `site/src/data/frameworks.ts`: EU AI Act rows for Arts. 6, 43, 47 and
  60; the Commission's Art. 55(1)(c) serious-incident template as the named artefact on the Art. 55
  row; the Art. 73 windows as a standalone decision table; ISO/IEC 42006:2025 and ISO/IEC 23894;
  NIST AI Agent Standards Initiative, NIST IR 8596 and NIST AI 800-1 (drafts flagged); CSA AICM
  supplements; South Korea AI Basic Act, Texas TRAIGA, Colorado, a UK subsection and Singapore's
  IMDA framework, each dated "as of 2026-09-19" and hedged where rules are still in draft.
- `bok/10-reading-list.md`, `sources/SOURCES.md`: incident and risk repositories (AIID, AIAAIC,
  OECD.AI, AVID, MIT AI Risk Repository), NIST AI 800-1 and ARIA, UK AISI, US CAISI, and the three
  frontier-lab safety frameworks; the tools index rebuilt on five verified curated lists.
- `site/src/data/stack.ts`, `site/src/data/path.ts`: illustrative tool names per layer (incl. new
  categories for MCP / tool-call security, kill switches, model and data cards, FRIA/DPIA tooling
  and open-source OSCAL tooling) and learning-path resources (IAPP AIGP, Stanford CS120, hands-on
  labs, a first `template` resource), every URL fetched on 2026-09-19.
- Figures: an archify figure at the head of every pattern (17), openers for chapters 02 and 04, and
  seven hand-drawn infographics (the three questions, values and principles, the minimum viable
  stack, the maturity grid, the Art. 73 clock, the pattern map, reading paths by persona), all
  governed by `site/VISUAL-GUIDE.md`.
- Site: duty-holder and applies-from columns with a duty-holder filter on the obligation table;
  "Patterns" in the navigation with cross-links between tools, obligations and patterns; CSV/JSON
  export of the obligation index; a mobile table of contents; pattern links from the maturity
  model; accessibility and Lighthouse gates in CI; a weekly external link-rot check; opt-in
  cookieless analytics; `CONTRIBUTING.md`.

### Removed
- `github.com/systempromptio/awesome-ai-agent-governance`: cited five times as a curated index; on
  inspection it is a promotional fork-farm list (64 forks for 41 stars, one-commit contributors each
  adding their own tool). Replaced by AthenaCore/AwesomeResponsibleAI, EthicalML/awesome-production-
  machine-learning, open-policy-agent/awesome-opa, oscal-club/awesome-oscal and
  trailofbits/awesome-ml-security.

## [0.3.1] - 2026-09-19

Patch release: a credibility pass. Facts corrected and re-sourced, co-authorship recorded, and the
version single-sourced. No change to the definition, values or principles.

### Changed
- `THESIS.md`, `bok/00-preface.md`, `bok/CONTRIBUTORS.md`, `site/src/data/site.ts`,
  `site/src/components/Citation.astro`, `site/src/pages/about/index.astro`: Aurélie Pols added as
  co-author (matching the Thesis Authors section and LinkedIn); the suggested citation now lists both
  authors. "written by one practitioner" reworded to "started by one practitioner".
- `site/src/data/site.ts` and everywhere the current version is stated: bumped to **v0.3.1**; the
  version is now single-sourced from `bokVersion`, with prose pointing at this changelog.
- `OUTLINE.md`, `STYLEGUIDE.md`, `sources/SOURCES.md`: all chapters 00–10 marked `**[drafted]**`;
  dead `posts/…` and `RESEARCH-DIGEST.md` pointers removed; the chapter-04 brief lists its five extra
  sections and its word target updated to ~5,000.
- `THESIS.md`, `bok/CONTRIBUTORS.md`, `README.md`: the placeholder repository URL replaced with the
  live `github.com/losanchos5/aige`; `README.md` links `CONTRIBUTING.md`.
- `build/build_pdf.py`: PDF output filenames now read the version from `site/src/data/site.ts`, so
  they carry v0.3.1.
- `site/scripts/content-lint.mjs`: new rule: fail the build when a current-version statement in
  `THESIS.md`, `README.md`, `bok/00-preface.md` or `OUTLINE.md` disagrees with `bokVersion`.

### Fixed (fact-check)
- `bok/08-regulatory-map.md`, `bok/09-glossary.md`, `bok/10-reading-list.md`,
  `site/src/data/frameworks.ts`, `sources/SOURCES.md`: the New York RAISE Act status corrected: it is
  enacted (S6953B, signed 19 Dec 2025), effective 1 Jan 2027 after a March 2026 chapter amendment,
  with oversight in an office within the NY Department of Financial Services. The earlier
  provisional-status hedge is gone; retagged to primary/secondary and cited to the Governor's release,
  the NY Senate bill and a law-firm alert.
- `bok/02-why-now.md`, `sources/SOURCES.md`: citation `[9]`, which attributed three job postings to
  one URL, split into three per-posting citations; downstream markers renumbered.
- `bok/06-the-role.md`, `site/src/data/role.ts`, `sources/SOURCES.md`: the unsourced LinkedIn
  "+150% YoY" figure removed (it is not in the cited article, nor stated per-skill in a LinkedIn
  primary); the qualitative demand signal kept.
- `bok/02-why-now.md`, `bok/08-regulatory-map.md`: "as of 2026-09-10" currency markers re-verified
  and moved to "as of 2026-09-19" (no harmonised standard is yet OJ-cited).

### Added
- `bok/09-glossary.md`: seven glossary terms: OPA/Rego, Cedar, GPAI Code of Practice, ISO/IEC 42005,
  Annex I (EU AI Act), Duty holder, EN 18286.
- `bok/08-regulatory-map.md`, `site/src/data/frameworks.ts`: an EU AI Act **Art. 25** (value-chain
  responsibilities) row, mirroring the pattern in chapter 05.

## [0.3] - 2026-09-15

Editorial pass. The founding document is retitled and its values restated; the substance of the
discipline is unchanged.

### Changed
- `THESIS.md`: the founding document is now **The AI Governance Engineering Thesis** ("the Thesis"),
  and the work is *AI Governance Engineering: The Thesis & Body of Knowledge*. Its file is `THESIS.md`
  and its canonical route is `/thesis`. Bumped to v0.3.
- `THESIS.md`, `bok/03-values-principles.md`: the eight values drop the Agile "X over Y" grammar and
  are stated as affirmations (e.g. "Governance is code, not a document"); their bodies, anti-patterns
  and citations are unchanged. The GRC engineering precedent is folded into a short list of influences
  (SRE, DevSecOps, policy-as-code, software supply-chain security) and no longer leads the document.
- `bok/00-preface.md`, `bok/02-why-now.md`, `bok/04-the-stack.md`, `bok/06-the-role.md`,
  `bok/10-reading-list.md`, `bok/CONTRIBUTORS.md`, `README.md`, `OUTLINE.md`, `STYLEGUIDE.md`,
  `sources/SOURCES.md`, `build/build_pdf.py`: refer to the document as "the Thesis" throughout;
  external work titles (GRC Engineering Manifesto, The Agile Manifesto) are left intact.

## [0.2] - 2026-09-10

Peer-review revision. Applies the HIGH and MEDIUM findings of **peer review round 1** (a senior-
practitioner review and an adversarial fact-check), plus the cheap LOW findings.

### Changed
- `bok/03-values-principles.md`, `THESIS.md`: reworked the six principles into strict commitments
  to action with no lexical overlap with the eight values (principles renamed accordingly); reframed
  value 6 from "Practitioner-built open tooling over closed platforms" to "**Inspectable, composable
  tooling** over black boxes"; noted which values are inherited from GRC engineering.
- `bok/01-definition.md`: added "the limits of the eval gate" (evals necessary, not sufficient;
  point-in-time, Goodhartable, blind to novelty); strengthened the AI-security-engineering boundary
  (the deliverable is a governed, evidenced system; overlap is a feature).
- `THESIS.md`, `bok/01-definition.md`, `bok/04-the-stack.md`: conceded that three of the five
  layers are inherited from GRC engineering and two (evals-as-controls, agent identity/runtime) are
  what AI forces us to add.
- `bok/04-the-stack.md`: distinguished MCP channel authentication from agent workload identity;
  presented Policy Cards / the OSCAL-extension preprint / TAIP / AAGATE as "one proposed approach" and
  named OSCAL's native model as the stable substrate; added Cedar-vs-Rego nuance; added sections on
  data governance, designing human oversight (Art. 14), third-party and procured AI, and the cost of
  the stack (FinOps).
- `bok/05-patterns.md`: added the pattern **Vendor / Model Due-Diligence Gate** (CSIRO template);
  sharpened Agent Identity (channel vs workload identity); tightened Continuous Assurance Telemetry to
  a concrete evidence schema; hedged the OSCAL-extension and TAIP/AAGATE proposals (now 14 patterns).
- `bok/06-the-role.md`: softened the analyst-vs-engineer table (cadence and artefact, not competence
  or access); moved named job postings to a footnote, keeping the IAPP bands and skills-demand data.
- `bok/07-maturity-model.md`: added a Level 4 eval-quality criterion (suite coverage / adversarial
  quality assessed, not just the gate's existence) and a "partial maturity is normal" reading.
- `bok/08-regulatory-map.md`: added a **Duty holder** column (provider / deployer / both); aligned
  the FRIA layer placement with chapter 05.

### Fixed (fact-check round 1)
- `bok/09-glossary.md`: RAISE Act date softened to a reported 1 Jan 2027, pending confirmation of
  enactment; guardian-agent figure decoupled from the June 2025 project-cancellation release (now a
  separate Gartner prediction, reported).
- `bok/08-regulatory-map.md`: Regulation (EU) 2026/1744 verified on EUR-Lex and cited as primary.
- `bok/04-the-stack.md`: GPAI Code of Practice source date corrected to 10 Jul 2025.
- `bok/05-patterns.md`: TAIP arXiv date corrected to 2026-02 (submitted 15 Feb 2026).
- OWASP Agentic ASI titles left as drafted; could not be re-confirmed verbatim from the resource page
  (the enumerated list is in the downloadable PDF, and the web-search budget was exhausted).

### Added
- `THESIS.md`: a second, independent source (IBM/Gartner Magic Quadrant, 2026) hedging the Kosmoy
  "no runtime data path" thesis.

## [0.1] - 2026-09

First public draft. Founding release.

### Added
- `THESIS.md`: the founding statement: definition and "more than X" clarifier; five fundamental
  problems with legacy AI governance; eight values (Agile grammar); six principles; what AI governance
  engineers build; authors and "co-authors wanted"; sign / get involved; CC BY 4.0 licence.
- `STYLEGUIDE.md`: voice and formatting rules; chapter template; CSIRO pattern template; citation
  format with `primary`/`secondary`/`reported` tags; canonical terminology; words to avoid; handling
  of unverified figures.
- `OUTLINE.md`: full table of contents (chapters 00–10) with a per-chapter brief.
- `bok/00-preface.md`: provenance, audience, what it is not, how to cite, versioning, contributing.
- `bok/01-definition.md`: the definition, three clarifiers, the eight-neighbour disambiguation cluster
  (table + prose), the object of governance, the three questions.
- `bok/02-why-now.md`: the five problems with the evidence; profession, market, standards-gap,
  regulatory-wave and agent-shift signals; what changes when governance is engineered.
- `bok/03-values-principles.md`: the eight values and six principles, each expanded with an "In
  practice" example and an anti-pattern.
- `bok/04-the-stack.md`: the five-layer reference architecture, per layer (what it proves, artefacts,
  illustrative tools, definition of done, anti-patterns, evidence flow), plus the minimum viable stack.
- `bok/05-patterns.md`: the pattern catalogue: 13 CSIRO-template patterns, each named to a layer.
- `bok/06-the-role.md`: the role by workflow; skills; analyst-vs-engineer; career ladder; entry
  paths; the market; common JD mistakes.
- `bok/07-maturity-model.md`: the five levels (Documented → Continuous), observable criteria by
  layer, metrics, self-assessment checklist, relation to ISO 42001 / AIMA / STAR for AI.
- `bok/08-regulatory-map.md`: the reverse index: EU AI Act (post-Omnibus), GPAI Code of Practice,
  ISO/IEC 42001 and 42005, NIST AI RMF, CSA AICM, OWASP GenAI, US frontier laws, and what is not
  harmonised yet.
- `bok/09-glossary.md`: canonical definitions, alphabetical, cross-referenced to chapters.
- `bok/10-reading-list.md`: annotated bibliography grouped by theme, each with a verified URL.
- `README.md`, `bok/CONTRIBUTORS.md` (authors + signatories), `bok/CHANGELOG.md`.
- `sources/SOURCES.md`: consolidated verified source table, one section per chapter.
- `build/build_pdf.py`: assembles the Markdown into `dist/site-preview.html` (PDF export available but not shipped).

### Notes
- This is a first public draft: chapters 00–10 are drafted, and the catalogue, mappings and arguments
  remain open for co-authors to extend and sharpen.
- All facts are current as of 2026-09-10 and carry verified citations. The regulatory and standards
  landscape (EU AI Act Digital Omnibus, CEN-CENELEC JTC 21 harmonised standards, OWASP and CSA
  releases) is expected to move; chapters will be revised.
