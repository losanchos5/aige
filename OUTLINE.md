# Outline (AI Governance Engineering: The Thesis & Body of Knowledge)

Version 0.4.0 · 2026-09-19. This is the full table of contents. Each chapter has a short brief so that
parallel writers stay consistent. Follow `STYLEGUIDE.md` for voice, templates and citations. All
chapters are marked **[drafted]**; contributors may propose extensions, corrections and new ones.

The book has two front-matter pieces outside the numbered chapters:

- **`THESIS.md`**: the founding statement (definition, five problems, eight values, six
  principles, what we build, authors, licence). The single quotable page. **[drafted]**
- **`STYLEGUIDE.md`**: voice, formatting, chapter and pattern templates, citation format,
  terminology, words to avoid. **[drafted]**

## Chapters

### 00. Preface **[drafted]**
Provenance and framing. Why the book exists; who wrote it and from what (2.5 years operating an AI
governance framework in a large telco, between Legal, Security and Engineering; the GRC Engineering
precedent; the public record). Who should read it; what it is not; how to cite; versioning and the
CHANGELOG; how to contribute. ~800 words. No normative claims.

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
Model Due-Diligence Gate. Since v0.5.0 each pattern is one file, `bok/patterns/<slug>.md`, published
at `/patterns/<slug>`; `bok/05-patterns.md` is the catalogue, with one `## Pattern:` section per pattern
holding its summary and a link to its page. Cite CSIRO as the template source.

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

## Consistency rules for parallel writers

- The **five layers** are named exactly as in §8 of the style guide, always in the same order.
- The **eight values and six principles** are quoted verbatim from the Thesis; do not reword them.
- The **three questions** (what AI is running · what is it allowed to do · what evidence proves it)
  recur; keep the wording identical.
- Every factual claim is cited `[n]` and added to `sources/SOURCES.md` under the chapter's section.
- Respect the BRIEF blocklist (see `STYLEGUIDE.md` §7). The IAPP Profession Report is the **2025**
  edition. Spain's Organic Law on AI is **not** adopted. No harmonised standard is OJ-cited.
- Never imply Jorge is job hunting; never name his employer; keep practice examples generic.
