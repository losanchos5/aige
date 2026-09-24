# Outline (AI Governance Engineering: The Thesis & Body of Knowledge)

Version 0.4.0 · 2026-09-19. This is the full table of contents. Each chapter has a short brief so that
parallel writers stay consistent. Follow `STYLEGUIDE.md` for voice, templates and citations. All
chapters are marked **[drafted]**; contributors may propose extensions, corrections and new ones.

The Body of Knowledge has 24 chapters (00–23) in five parts, listed below by part. The parts group
the index and the navigation (`site/src/data/chapters.ts`, field `part`); the reading order stays the
chapter number, so chapter 23 sits in the lifecycle part but reads last. Most chapters open with an
"At a glance" block; every chapter except the glossary lists its key terms under it (`keyTerms` in
`chapters.ts`, glossary slugs); most chapters that describe a practice end with "What you can do this
week". Links between chapters point at the section
that treats the topic (`/bok/<slug>#<anchor>`), and links to a pattern point at its own page
(`/patterns/<slug>`).

The book has two front-matter pieces outside the numbered chapters:

- **`THESIS.md`**: the founding statement (definition, five problems, eight values, six
  principles, what we build, authors, licence). The single quotable page. **[drafted]**
- **`STYLEGUIDE.md`**: voice, formatting, chapter and pattern templates, citation format,
  terminology, words to avoid. **[drafted]**

## Chapters

**Part 1 · The discipline (00–07).** What AI governance engineering is, why it is forming now, and
how it is built, staffed and measured.

### 00. Preface **[drafted]**
Provenance and framing. Why the book exists; who wrote it and from what (2.5 years operating an AI
governance framework in a large telco, between Legal, Security and Engineering; the GRC Engineering
precedent; the public record). Who should read it, with a route into the book per audience; how to
use the book, part by part; what it is not; how to cite; versioning and the CHANGELOG; how to
contribute. ~1,100 words. No normative claims.

### 01. The definition **[drafted]**
The one-sentence definition and its three clarifiers (covers governance, risk and assurance including
agents; a capability not a title; measured by realised risk reduction and audit-ready evidence). The
disambiguation cluster (table plus prose) against AI safety research, MLOps/LLMOps, model risk
management (SR 11-7 style), AI compliance/legal, Responsible AI/ethics, GRC engineering (parent), AI
security engineering (sibling), and Visure's opposite meaning. The object of governance (models,
systems, agents, data, organisation) and the three questions (what is running, what may it do, what
evidence proves it). ~1,800 words.

### 02. Why now **[drafted]**
The evidence that the discipline is needed and forming *now*. The market and profession data (IAPP
Profession Report 2025 and Salary Report 2025-26; Gartner AI-governance-platform market growth and the
first Magic Quadrant, June 2026; the securing-AI market forecast; agentic-project cancellation
prediction). The regulatory wave (EU AI Act Digital Omnibus, GPAI enforcement live 2 Aug 2026,
California SB 53, standards gap). The agent shift (OWASP Agentic Top 10, HiddenLayer's agent-breach
figure, reported). Keep every figure sourced; respect the BRIEF blocklist. 3–6 line brief per claim;
target ~1,500 words.

### 03. Values and principles **[drafted]**
The eight values and six principles from the Thesis, each expanded with 2–3 paragraphs, an "In
practice" example and an anti-pattern. The values are trade-offs; the principles are commitments.
~2,500 words.

### 04. The stack (five layers) **[drafted]**
The reference architecture. One section per layer, each with: what it answers, the artefacts it holds,
the tools that exemplify them (illustrative, not endorsed), and the obligations it maps to. Layers, in
order: **01 Govern-as-Code · 02 Inventory & Transparency · 03 Evals & Red Teaming as Evidence · 04
Runtime Controls & Observability · 05 Assurance & Continuous Compliance.** Beyond the five layers the
chapter also covers data governance across the stack, designing human oversight (Article 14),
third-party and procured AI, the cost of the stack (FinOps), and the minimum viable stack for a team of
one. Each layer ends with a "Maps to" line feeding chapter 08. ~5,000 words.

### 05. Patterns (12–17, CSIRO template) **[drafted]**
The catalogue. 12–17 reusable patterns, each in the CSIRO structure (Summary, Objectives, Target
users, Impacted stakeholders, Relevant principles, Context, Problem, Solution, Consequences, Related
patterns, Maps to). Each pattern names its layer (1–5). Candidate patterns: Policy-as-Code Gate ·
Agent Registry · AIBOM at Build · Model/Data Card as Code · Eval Gate in CI · Adversarial Red-Team
Suite · Runtime Guardrail · Agent Kill Switch · Non-Human Identity & Scoped Access · Continuous
Assurance Telemetry · Machine-Readable Evidence (OSCAL) · Serious-Incident Pipeline (Art. 73) · FRIA/
DPIA as Code · Human-in-the-Loop Checkpoint · Framework Crosswalk (as index, not end state) · Vendor /
Model Due-Diligence Gate. Each pattern lives in its own file, `bok/patterns/<slug>.md`, and has its
own page at `/patterns/<slug>`; the frontmatter contract is in
`openspec/changes/patterns-as-pages/`. `bok/05-patterns.md` keeps the template, the pattern map and
one `## Pattern: <name>` section per pattern with its summary and a link to the page, so every
`#pattern-*` anchor stays valid. Cite CSIRO as the template source.

### 06. The role **[drafted]**
The capability made concrete as a role (without ever implying a job search). What an AI governance
engineer does day to day; the analyst-vs-engineer contrast (after the GRC Engineer precedent); the
skills (policy-as-code, evals, identity, observability, a little Python, threat modelling, the law
enough to read it); where the role sits and who it partners with; how it differs from adjacent titles.
Ground skill claims in the postings evidence (Axial, live postings) marked appropriately. ~1,500 words.

### 07. Maturity model (five levels) **[drafted]**
A ladder from paper to production. **Documented → Inventoried → Tested → Enforced → Continuous.** For
each level: what exists, what is missing, the smallest step to the next level, and how you would prove
you are there. Level 5 (Continuous) is the runtime-data-path, continuous-assurance end state. Tie each
level to the three questions and the five layers. ~1,500 words.

**Part 2 · Reference (08–10).** The indexes the rest of the book points into.

### 08. Regulatory map (obligation → artefact → layer) **[drafted]**
The reverse index of every "Maps to" line in the book. A table mapping each obligation to the artefact
that satisfies or supports it and the layer it lives in: EU AI Act (Arts. 9, 11, 12, 15, 17, 27, 49,
50, 55, 71, 72, 73; Digital Omnibus dates and what applies when), ISO/IEC 42001 and 42005, NIST AI
RMF, OWASP GenAI/Agentic, CSA AICM. State clearly that mappings are illustrative, not conformity, and
that no harmonised standard is yet OJ-cited. ~2,000 words.

### 09. Glossary **[drafted]**
Canonical definitions of every term in the terminology list (`STYLEGUIDE.md` §8) plus the acronyms
used across the book (AIBOM, NHI, OSCAL, FRIA, DPIA, RSP, GPAI, RMF, AIMS, CCL, ASL, MCP, etc.). One
line each, cross-referenced to the chapter that treats the term in full. Alphabetical.

### 10. Reading list **[drafted]**
The sources that formed the discipline, curated and annotated: GRC Engineering (manifesto, grcengineer.
com); agilemanifesto.org and 12factor.net as form models; CSIRO Responsible AI Pattern Catalogue; EU
AI Act + Digital Omnibus; ISO/IEC 42001/42005; NIST AI RMF; OWASP GenAI/Agentic; CSA AICM; the frontier
labs' safety frameworks; the machine-readable-evidence research (OSCAL extensions, audit-as-code). One
annotated line per item, grouped by theme, each with a verified URL.

**Part 3 · Foundations (11–13).** What counts as an AI system, how an organisation runs its
governance program and where risk management sits.

### 11. AI, defined for governance **[drafted]**
What an AI system is for governance purposes. The definitions compared element by element (OECD, EU
AI Act Art. 3(1), ISO/IEC 22989, NIST AI 100-1) and each element turned into a registry field; AI
versus conventional software; the kinds of AI that change the governance problem; the eight
characteristics that break classic IT governance, each paired with a control; governing
probabilistic outputs; responsible-AI principle sets engineered into artefacts.

### 12. Running the AI governance program **[drafted]**
The organisation as an object of governance: the stakeholder map, a lifecycle RACI, the committee
that decides what gates cannot, the three lines and internal audit, AI literacy as code, governance
culture and a channel for raising concerns, KPIs and KRIs for the board, management review, strategy
and whether to use AI at all, and the policies across the lifecycle (data acquisition, third-party
AI, acceptable use) compiled into gates.

### 13. Where risk management sits **[drafted]**
The risk loop (identify, assess, treat, monitor) run on the five layers and the seven workflows:
risk sources and stakeholders, the likelihood-by-severity matrix with its catastrophic-severity
override, appetite and tolerance compiled into gates, the mitigation hierarchy, inherent and
residual risk and who accepts it, the register as an evidence record, proportionate tailoring, and
the link from incidents back to risks.

**Part 4 · The lifecycle (14–17, 23).** Governing a system from use case to retirement:
development, deployment, fairness, incidents and agents.

### 14. Governing AI development **[drafted]**
The build as a chain of gates, each reading a record: the use-case record, design review, data for
training and testing (the right to use it, quality, the admission gate, provenance and lineage),
testing and validation (the test plan, statistical validity of evals, independent validation),
release readiness and conformity, the technical file compiled by the pipeline, and impact
assessments compared.

### 15. Governing deployment and use **[drafted]**
The deployer's lifecycle: the deployment decision and its record, choosing the model, model types
and deployment options, build, buy or adapt, vendor contracts and licences, the go-live review,
progressive delivery as a control, operating the system (drift, fairness and quality in
production), periodic assurance, secondary use and downstream harm, external communications, and
deactivation, localisation and retirement.

### 16. Fairness and explainability for practitioners **[drafted]**
Fairness and explainability as controls: where bias enters, protected characteristics and proxies,
disparate treatment and impact, group metrics and the impossibility results, intersectional
testing, choosing a metric by use case, mitigation, monitoring in production; interpretable models
versus explanations after the fact, explanation techniques and their tests, the legal hooks, and
explanation artefacts as evidence records, placed on the five layers.

### 17. Incidents, issues and root causes **[drafted]**
Incident, hazard, issue and serious incident told apart; a severity scale mapped to the reporting
clocks; the response lifecycle, playbooks and drills; AI-specific failure modes; root-cause analysis
and CAPA back into the risk register and the eval suite; deployer duties; the overlapping clocks;
the incident record; learning from public incident databases.

### 23. Governing AI agents **[drafted]**
What makes an agent a governance object (delegated authority, tools, memory, autonomy): the agent
registry, identity and short-lived credentials, tool and MCP server permissions, human checkpoints,
runtime guardrails for tool calls, kill switches and per-agent circuit breakers, memory governance,
multi-agent delegation, prompts under change control, agent incidents and telemetry, threats mapped
to controls, the frameworks written for agents and the EU AI Act hooks. It is numbered 23 and belongs
to the lifecycle part.

**Part 5 · Law and standards (18–22).** The EU AI Act, data protection, the law that already
applies, AI laws around the world, and the principles and standards.

### 18. The EU AI Act in one pass **[drafted]**
The Act as amended by the Digital Omnibus, end to end: scope and reach, the risk ladder, GPAI
models, the high-risk requirements, provider and deployer duties, who you are in the value chain,
the FRIA, explanation and notice, AI literacy, sandboxes and real-world testing, governance and
enforcement, and the post-Omnibus timeline, each duty tied to an artefact.

### 19. Privacy and data protection law applied to AI **[drafted]**
Data protection duties for training and inference turned into artefacts: principles applied to AI,
minimisation and PETs, controller duties across the supply chain, automated decision-making, data
subject rights against trained models, whether a model contains personal data, special categories
and biometrics, AI-specific breaches, the GDPR side of the Digital Omnibus, the regimes beyond the
EU, and an obligation-to-artefact map.

### 20. Other law that already applies to AI **[drafted]**
Intellectual property, non-discrimination, consumer protection, product liability and deepfakes,
each duty mapped to its evidence artefact and stack layer, closed by one hiring model read through
all five bodies of law.

### 21. AI-specific laws around the world **[drafted]**
A dated field guide to the AI-specific regimes beside the EU AI Act (South Korea, the United States
at federal and state level, Japan, China beyond chapter 08, Brazil, Canada, India, the United
Kingdom, Italy, Spain, Singapore, Australia), compared, with the sector rules that already reach AI.

### 22. Principles, soft law and standards **[drafted]**
The instruments in order of force (OECD, UNESCO, the Council of Europe Convention, the G7 Hiroshima
Process, the EU HLEG guidelines, the NIST AI RMF in depth, the ISO/IEC family, harmonised standards
under the AI Act, IEEE 7000), each mapped to the stack layer and evidence record that answer it, and
one control traced across many instruments.

## Consistency rules for parallel writers

- The **five layers** are named exactly as in §8 of the style guide, always in the same order.
- The **eight values and six principles** are quoted verbatim from the Thesis; do not reword them.
- The **three questions** (what AI is running · what is it allowed to do · what evidence proves it)
  recur; keep the wording identical.
- Every factual claim is cited `[n]` and added to `sources/SOURCES.md` under the chapter's section.
- Respect the BRIEF blocklist (see `STYLEGUIDE.md` §7). The IAPP Profession Report is the **2025**
  edition. Spain's Organic Law on AI is **not** adopted. No harmonised standard is OJ-cited.
- Never imply Jorge is job hunting; never name his employer; keep practice examples generic.
