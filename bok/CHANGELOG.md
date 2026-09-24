# Changelog

All notable changes to *AI Governance Engineering: The Thesis & Body of Knowledge* are recorded here.
Versioning is semantic in spirit: patch = fact/typo fixes, minor = new chapters or patterns, major =
a completed, reviewed core (1.0).

## Unreleased (v0.5.0)

### Added
- Stable obligation ids and one page per obligation (`site/src/data/frameworks.ts`, `/obligations`,
  `/obligations/<id>`): every row of the regulatory map carries an id of the form
  `AIGE-OBL-<INSTRUMENT>-<CLAUSE>` (for example `AIGE-OBL-EUAIA-ART9`), assigned once and never
  reused; a removed row's id stays reserved. Each page shows the clause, the duty holder, the
  application date with its status and later dates, the artefact, the layers, the patterns, the
  crosswalk siblings, the cases that cite the same EU AI Act article, the chapter 08 section it
  comes from, its review date, its JSON and a citation block. The sitemap dates these pages by the
  row's review date.
- The rows now carry the dates chapter 08 states in prose but no row held: Annex I embedded
  systems from 2028-08-02 and legacy high-risk systems intended for public authorities by
  2030-08-02 (`Art. 111(2)`), as later milestones on the high-risk rows.
- A static open-data API under `/api/v1/`: a catalogue (`index.json`), one file per dataset
  (obligations, frameworks, crosswalk, glossary, patterns, maturity, path, chapters,
  jurisdictions, harms, cases, contracts, roles), one file per obligation, an OpenAPI 3.1
  description and a JSON Schema (draft 2020-12) per document, all with the same notice, licence
  and DOI envelope; `/resources/data` documents the endpoints, the id rule, the versioning and
  stability promise and how to cite. `_headers` opens CORS and sets a one-hour cache on the API and
  the existing downloads; the Content-Security-Policy is unchanged.
- The citation block now serves any page (`kind`: chapter, obligation, figure, dataset or page);
  chapters keep their existing reference and BibTeX.

### Changed
- `/resources/obligations.json` and `/resources/obligations.csv` move to `schemaVersion` 2 at the
  same URLs. `appliesFrom` is now an ISO date (or `null` for voluntary instruments without one) and
  the former free text moved to `appliesNote`; each row gains `id`, `url`, `json`, `frameworkId`,
  `clause`, `requirement`, `appliesStatus`, `milestones`, `systemClass`, `patterns`,
  `crosswalkTopics`, `authority`, `scope` and `reviewed`. The CSV keeps its first seven columns in
  place and appends the new ones.
- The EU AI Act `Art. 4` row: applies since 2025-02-02 (Chapter I, `Art. 113(a)`), reworded by the
  Digital Omnibus on 2026-07-27, in line with chapter 12.
- Patterns get their own pages. Each of the 17 patterns of chapter 05 moved to
  `bok/patterns/<slug>.md` (prose unchanged; sections one heading level up, citations renumbered
  per page) and renders at `/patterns/<slug>` with the chapter layout: breadcrumb,
  its archify diagram (moved from the chapter), glossary hover cards, its own numbered sources, a
  "Cite this pattern" block and a pager in catalogue order. Each page adds one line under its
  **Maps to** line naming the OWASP Agentic and NIST AI RMF sources and the "illustrative, not a
  claim of conformity" notice; the "Related patterns" names now link to the pages.
- `/patterns`: a new index of the catalogue grouped by the five stack layers.
- Chapter 05 is now the catalogue: introduction, the pattern template, the pattern map and, under
  each unchanged `## Pattern: <name>` heading, a short summary linking to the page, so every
  published `/bok/patterns#pattern-*` link still lands on its pattern. Its sources are renumbered
  (1-5) and a new one dates the harmonised-standards remark (none referenced in the Official
  Journal as of 2026-09-24). The page no longer inlines 17 diagrams.
- `/llms.txt` lists `/patterns`, every pattern page, the harms atlas, the cases, the templates and
  the contract clauses; `/llms-full.txt` carries every pattern in full right after chapter 05.
- The PDF build (`build/build_pdf.py`) prints every chapter file (00 to the last) and assembles
  chapter 05 with the full text of every pattern in place of the catalogue summaries.
- **Navigation by part.** The Body of Knowledge menu, the mobile drawer, the footer site map and the
  chapter rail now group the chapters by the five parts of the book (the discipline, reference,
  foundations, the lifecycle, law and standards), each with its chapter range; counts come from the
  chapter manifest (`site/src/data/parts.ts`). Reference gains Harms atlas, Cases, Contracts and
  Templates & schemas; About gains Methodology.
- **Home and index by part.** The home presents the five parts (title and counts computed, no more
  "Eleven chapters"), its resource tiles add the topic crosswalk, the map, the templates and the
  harms atlas, and a newsletter section sits before the closing band. The `/bok` index groups the
  chapter cards by part, with a one-line introduction and a jump list; the three reading paths now
  run through chapters 11 to 18.
- **Resources hub.** `/resources` lists ten references, adding the harms atlas, cases, contract
  clauses and the templates and schemas library, each with a count computed from its data.
- **Methodology.** New `/about/methodology`: how sources are chosen and tagged, how "as of" dates
  are kept, the review cadence, what the build checks, how corrections and contributions work, and
  versioning with DOIs. `bok/CONTRIBUTORS.md` defines the author, reviewer and contributor roles and
  how reviewers are credited.
- **Issue forms.** Report an error on a page, propose an obligation row, propose a glossary term and
  propose a case study join the existing forms.
- **Newsletter and analytics.** The sign-up form also closes every chapter and the home. Downloads
  in the footer and on `/about`, newsletter sign-ups, search opening and citation copying carry
  declarative Umami event attributes; no new script, and the newsletter note now says the address
  goes straight to Buttondown.
- **Toolkit** (`/toolkit`): a registry of browser tools built from the Body of Knowledge
  (`site/src/data/toolkit.ts`), a shared `ToolShell` component with the fixed notice "Indicative,
  not legal advice and not a conformity claim. Nothing you enter leaves your browser.", a no-JS
  worksheet mode and print styles, and dependency-free client helpers (`site/public/toolkit/lib.js`:
  state in the URL fragment, safe storage, JSON, CSV per RFC 4180, Markdown and iCalendar per RFC
  5545 downloads, clipboard, SVG to PNG through a `data:` URL). No change to the content security
  policy.
- **Maturity self-check** (`/toolkit/maturity-self-check`): pick, per stack layer, the highest
  observable criterion of chapter 07 met today; get the ragged per-layer profile drawn in SVG, the
  floor and the single next move with its metrics, checklist questions and pattern link. Exports a
  re-importable JSON profile (`/toolkit/maturity-profile.v1.schema.json`), a Markdown report and an
  SVG or PNG image; saves profiles in the browser and compares two. `site/src/data/maturity.ts` gains
  the chapter's criteria table, metrics per level, checklist and typical failures as data (additive;
  no heading changed).
- Figures are citable and reusable: a `/figures` gallery grouped by part and chapter (the
  infographics and the interactive diagrams) and a `/figures/<id>` permalink per infographic with
  its text alternative, where it appears, downloads, HTML and Markdown embed snippets with the
  full CC BY credit, a citation with BibTeX and `ImageObject` structured data.
- Every figure is exported at build as a standalone SVG (light and dark by colour scheme, plus
  fixed light and dark) and as light and dark PNGs at 1600 and 3200 px, drawn with the site's
  typefaces, each with the band "aigovernanceengineer.com · CC BY 4.0 · v<version>" and a
  versioned file name under `/downloads/figures/`.
- Figure entries gain `asOf`, `reviewBy`, `license`, `kind`, `pages` and a `data` table
  fallback; a dated figure prints "As of" inside the image (the Article 73 clock now reads
  "As of 2026-09-24"), and the build checks budgets, dates and the stamp.
- `site/VISUAL-GUIDE.md` adds rules for data visualisation, posters and exports, and
  interactive widgets; the content lint now also scans the published SVG, JSON, CSV, TXT, XML and
  Markdown files and the text of the PNG downloads.

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
