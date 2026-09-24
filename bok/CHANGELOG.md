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
- **Obligations and deadlines planner** (`/toolkit/obligations-planner`): tick your roles in the
  EU AI Act value chain (provider, deployer, importer, distributor, authorised representative, GPAI
  model provider, with or without systemic risk), the system classes (Annex III, Annex I, Article
  50) and an optional reference date; get the rows of the obligation register that bind you, each
  with its artefact, layer, patterns, the date it applies for your classes and its status read on
  your date, plus a timeline and, apart, the importer, distributor and authorised-representative
  duties the register does not hold as rows (Arts. 22, 23, 24 and 54, from the consolidated text).
  Exports a Markdown checklist, a CSV, a JSON in the open-data envelope
  (`/toolkit/obligations-plan.v1.schema.json`) and an `.ics` calendar with one all-day event per
  date. The role mapping lives in `site/src/data/obligations-planner.ts`; no register date is
  restated.
- Every `/obligations/<id>` page opens with the obligation-to-evidence chain, generated from its
  row: clause, duty holder, date, artefact, layer and the record schema its evidence is filed as,
  with the crosswalk siblings and "As of" in the image; and carries its own Open Graph card
  (`/og/obligations/<id>.png`). Each live tool gets one too (`/og/toolkit/<id>.png`).
- A test fails when a register row still says "applies later" or "deferred" after its date has
  passed (`site/tests/obligation-status-dates.spec.ts`).
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
- Eleven new figures drawn only from what the chapters already state: the five objects of
  governance (chapter 01), the profession in numbers (02), human oversight designed and where
  control moves when you buy AI (04), who enforces and the penalty ceilings (08), the committee
  decides and the gates enforce (12), the risk loop on the stack, the likelihood-by-severity
  matrix with the S5 override and the mitigation ladder (13), provenance and lineage (14) and
  the overlapping incident clocks (17). Each has a text description under it.

### Changed
- Diagrams: the Framework Crosswalk is drawn as one hub with five spokes and evidence on the hub;
  the Vendor / Model Due-Diligence Gate puts the registry entry straight under the gate and the
  rejection path last; the Runtime Guardrail keeps its assurance store outside the runtime layer;
  the Kill Switch greys the revoked agent while the rest of the fleet runs on. The regulatory
  wave in chapter 02 gains the 2 Dec 2026 stage (new Article 5 bans and Article 50(2) marking)
  and the 2 Aug 2030 stage (legacy high-risk systems of public authorities).
- `site/src/data/stack.ts`, `/resources/tools` (block b-catalogues): the tool catalogue is now one typed
  registry. Every tool carries a checked URL, its licence (SPDX identifier where one exists), an
  access model (open source, open standard, source-available, commercial, free service), its layers,
  `lastChecked` 2026-09-24 and, for 22 tools, its OECD.AI Catalogue of Tools & Metrics entry. Seven
  categories the new chapters cite (data validation and quality; data and experiment versioning;
  fairness toolkits; explainability libraries; ML and LLM monitoring and drift; progressive delivery
  and feature flags; model signing and artefact scanning), two policy-as-code categories that cover
  the learning-path tools (Conftest, OPA Gatekeeper, Kyverno, the Rego Playground) and a curated
  indexes group: 96 tools in 31 categories. The page is titled "Tool categories" and filters by
  layer and licence (`public/catalogue-filter.js`, CSP-safe, progressive enhancement). The
  per-layer categories on `/stack` and `/map` are derived from the same registry.
- `bok/10-reading-list.md`, `/resources/reading-list` (block b-catalogues): 98 new entries (books,
  courses, canonical papers, regulator guidance and every reading-list entry the chapter handoffs
  proposed, without duplicates), for 162 in 16 themes. Every entry carries audience and jurisdiction
  tags; the resources view filters on both. The eight existing section headings are unchanged.
  `sources/SOURCES.md` gains rows 62-159 for chapter 10 and a short tool-catalogue section.

### Changed
- Kill switch / circuit breaker: the three generic examples (feature-flag kill switches,
  workload-identity revocation, API-gateway circuit breakers) became named tools (Unleash, Envoy,
  Resilience4j); workload identity stays under Agent workload identity (SPIFFE/SPIRE). mcp-scan is
  listed under its current name, Snyk Agent Scan.
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
- `bok/09-glossary.md`: the glossary grows from 63 to 279 terms, covering every term the new
  chapters 11 to 22 define plus the core vocabulary of the EU AI Act, risk, privacy, fairness,
  incidents and generative AI. Every entry is at most 60 words, cites its source when it comes from
  a law, a standard or a paper, names the terms it is most often confused with ("Contrast with")
  and links the exact section that develops it ("See"). Letter headings and a "Commonly confused
  pairs" table (ten pairs, from transparency versus explainability to provider versus deployer) are
  new. "Serious incident" now carries the four limbs of AI Act `Art. 3(49)` and points to chapter
  17; "Model risk management" records that SR 26-2 superseded SR 11-7 on 17 Apr 2026. Sources grow
  from 19 to 120; `sources/SOURCES.md` carries the rows.
- Site: every term has its own canonical page at `/glossary/<term>` with its definition and
  numbered sources, the sections that develop it, the chapters that use it, contrast cards,
  related terms and a "Cite this term" block. `/bok/glossary` stays the book index (each term is
  anchored and links to its page); `/resources/glossary` and `/glossary` redirect to it. Hover
  cards and `/glossary.json` now point at the term pages.
- `bok/23-governing-agents.md`: chapter 23, **Governing AI agents**, replaces the stub. It covers
  what makes an agent a governance object and autonomy as a design decision (Knight Institute,
  IMDA and CSA scales aligned to `Art. 14(3)`), the agent registry, workload identity and
  short-lived credentials (SPIFFE/SPIRE, RFC 8693 delegation, the MCP authorization specification
  of 2026-07-28), tool allow-lists and MCP server admission, human checkpoints, runtime guardrails
  for tool calls with an explicit failure posture, kill-switch stop levels, memory and context
  governance, A2A v1.0 delegation chains and accountability across hops, prompts as configuration
  under change control, an agent incident taxonomy with OpenTelemetry GenAI telemetry, a
  threat-to-control table (OWASP Agentic 2026, OWASP GenAI LLM Top 10 2026, MITRE ATLAS v2026.09),
  the frameworks written for agents and the EU AI Act hooks. Sources `[1]`–`[29]`, all `primary`,
  as of 2026-09-24; one item marked "(verify)".
- `site/src/pages/agents.astro`: the **/agents** hub, a practitioner landing for agent governance
  with the control plane, the six agent patterns, the ten agentic threats with their controls, the
  chapter 08 cross-references and the runtime tool categories.
- `tools/reg-monitor/`, `.github/workflows/reg-monitor.yml`: a **regulatory change monitor**. A
  daily GitHub Actions job (06:17 UTC) reads 34 official pages the site already cites (EUR-Lex and
  the Digital Omnibus, the AI Act Service Desk, the Commission's AI Act pages, CEN-CENELEC JTC 21,
  NIST, OWASP GenAI, law.go.kr, the California, New York, Colorado and Texas legislatures, the
  EDPB, ICO and CNIL, the IAPP AIGP page and the International AI Safety Report), reduces each to
  stable text, compares a SHA-256 with the previous run and, on a change, opens or comments on an
  issue labelled `regulatory-change` with a diff excerpt and the files that cite the URL. It never
  edits or publishes the site; its state lives on the orphan branch `reg-monitor-state`, not on
  `main`, because every push to `main` deploys. Manual runs default to a dry run. Unit tests run
  with `node --test`; `tools/reg-monitor/README.md` explains operation and how to add a source.
- Crosswalk v2 (`site/src/data/crosswalk.ts`, `/resources/crosswalk`): 25 topics (the twelve v0.4
  topics keep their ids and `#topic-<id>` anchors; new: prohibited practices, fairness and
  non-discrimination, privacy and data protection, explainability and right to explanation, AI
  literacy and competence, conformity assessment and certification, GPAI and foundation models, IP
  and copyright, agent identity and autonomy, content provenance and deepfakes, sandboxes and
  real-world testing, environmental impact, deployment, change and decommissioning) and 14 columns
  (new: GPAI Code of Practice, GDPR, ISO/IEC 42005 · 23894 · 42006, CSA AICM by control id, OWASP LLM
  2026 and Agentic 2026 ids, Korea AI Basic Act, United Kingdom (UK GDPR Arts. 22A to 22D and ATRS
  v4.0), Singapore (generative and agentic frameworks), treaty and soft law (CoE CETS No. 225, OECD,
  G7 Code), CEN-CENELEC). 493 references, every `crosswalk` entry of the chapter 11 to 22 and
  harms-atlas handoffs included; each keeps `strength`, an honest `verified` flag (28 stay unverified
  with a note: ISO/IEC clauses whose text could not be opened, the prEN drafts and two GDPR articles
  read only secondarily) and a URL; references checked as of 2026-09-24.
- Column chooser on the crosswalk grid: the four v0.4 columns show by default, any other column on
  demand, remembered per browser; every column shows without JavaScript.
- Clause-to-clause explorer (`/resources/crosswalk#explore`, `public/crosswalk-explorer.js`): source
  frameworks and a target side by side per topic, a gap view (target clauses no chosen source
  reaches), topic and verified-only filters, a shareable URL fragment, and downloads of the selection
  as CSV, JSON and an OSCAL 1.2.3 mapping collection (NIST Control Mapping model; relationship
  `intersects-with`, gap summaries). Every export says "illustrative, not a claim of conformity"
  inside the file.

### Changed
- `/resources/crosswalk.json` and `/resources/crosswalk.csv` move to schema version 2 at the same
  URLs: the JSON adds `schemaVersion`, `asOf`, `columns`, `frameworks`, topic `read` links and, per
  reference, `clauseId`, `column`, `frameworkShort` and `see`; the CSV keeps its nine columns in
  order and appends topic, framework, column and clause ids and the BoK section.

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
