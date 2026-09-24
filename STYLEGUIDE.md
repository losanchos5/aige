# Style guide (AI Governance Engineering: The Thesis & Body of Knowledge)

This guide governs every file in this repository. It exists so that chapters written by different
people, at different times, read as one book. Read it before you write. If a rule here conflicts with
your instinct, follow the rule or open a pull request to change the rule. Do not quietly diverge.

Version 0.4.0 · 2026-09-19. Maintainer: Jorge García Aibar.

---

## 1. Voice

We write as practitioners, for practitioners. The reader is building something on Monday.

- **Direct.** Short sentences. One idea per sentence. Prefer the active voice.
- **No hype.** No "revolutionary", "game-changing", "cutting-edge", "unlock", "supercharge". If a
  sentence still means the same thing with the adjective removed, remove the adjective.
- **No vendor pitch.** We name tools as examples of a category, never as a recommendation. Every tool
  list is illustrative, not exhaustive, and not an endorsement. Categories matter more than brands.
- **Every number carries a source.** No statistic, date, version or quote appears without a `[n]`
  citation. If you cannot source it, cut it or mark it `reported` (see §7).
- **Earned first person, sparingly.** The book may say "in a large telco" or "in practice we find";
  it never names Jorge's employer, never discloses internal details, and never says or implies that
  Jorge is looking for work. This is a founding text, not a résumé.
- **Plain English, but not dumbed down.** The audience is technical. Use the precise term (idempotent,
  attestation, non-human identity) and define it once, in the glossary.
- **Show the mechanism.** When you claim a control works, say what it does at runtime and what
  evidence it leaves behind. "A policy is not a control; an eval that can fail the build is."

## 2. Formatting

- **GitHub-flavoured Markdown only.** No raw HTML. No inline styling tricks.
- **Headings.** One `#` H1 per file (the chapter title). Sections are `##` (H2), subsections `###`
  (H3). Do not skip levels. Do not go below H3 except inside a pattern.
- **Line length.** Wrap prose at ~100 characters. This keeps diffs readable and reviewable.
- **Lists.** Use `-` for unordered lists and `1.` for ordered lists. Keep list items parallel in
  grammar.
- **Emphasis.** `**bold**` for defined terms on first use and for the left-hand side of value pairs.
  `_italics_` sparingly, for a word used as a word. No ALL CAPS for emphasis.
- **Code and artefact names.** Wrap file names, commands, article numbers used as labels, and
  machine-readable formats in backticks: `OSCAL`, `OPA/Rego`, `Art. 55(1)(a)`, `agent-registry.yaml`.
- **Tables.** Use them for disambiguation clusters, obligation maps and comparison matrices. Keep
  cells short; put prose in the paragraphs around the table, not inside it.
- **Callout boxes** are plain blockquotes with a bold label (see §4 and §5).
- **Dates.** Write `2 Aug 2026` in prose, `2026-08-02` in tables and front matter. Today's reference
  date for v0.4.0 is 2026-09-19.
- **Numbers.** Spell out one to nine in prose unless paired with a unit or a percentage; use figures
  for 10 and above and for all money, versions and article numbers.
- **Dashes.** No em dashes (—). Use a comma pair, a colon, a semicolon, a full stop or parentheses
  instead. En dashes (–) stay for ranges (2024–2026, v0.1–v0.3). The site build fails on any em dash
  (`site/scripts/content-lint.mjs`).

## 3. Chapter template

Every Body-of-Knowledge chapter (`bok/NN-title.md`) follows this skeleton:

```
# NN. Chapter title

> One-line summary of what this chapter settles, in a single sentence.

## Section (H2)
Prose. ### subsections as needed.

> **In practice**
> A concrete, grounded example of the idea applied inside a real governance function
> (generic: "in a large telco", never a named employer). What was built, what evidence
> it produced, what failed. 3–8 lines.

**Maps to:** the standards, frameworks and legal articles this chapter touches, as a single line
(e.g. `EU AI Act Art. 9, 15 · ISO/IEC 42001 · NIST AI RMF (Measure) · OWASP Agentic ASI03`).
Mappings are illustrative, not a claim of conformity.

## Sources
[1] Title. Publisher. Date. URL (verified: primary | secondary | reported)
[2] ...
```

- The **one-line summary** blockquote sits directly under the H1 and is a sentence, not a fragment.
- The **"In practice" box** is mandatory for chapters that describe a capability or artefact. It is a
  blockquote led by `> **In practice**`.
- The **"Maps to" line** is mandatory. It is a single bolded-lead paragraph, not a heading. It lists
  the obligations and standards the chapter's artefacts satisfy or support. Always add the sentence
  "Mappings are illustrative, not a claim of conformity" the first time a chapter maps to the EU AI
  Act.
- The **"Sources" list** is per chapter, numbered, matching the `[n]` markers used in the text.

## 4. Pattern template (CSIRO style)

Patterns live in the single catalogue file `bok/05-patterns.md` (one `##` section per pattern) and follow the CSIRO Responsible AI
Pattern Catalogue structure [see 04 sources]. Use these headings, in this order:

```
# Pattern: <name>

**Summary:** one paragraph (what the pattern is and when it applies).

## Objectives
What governance outcome the pattern achieves.

## Target users
Who implements it (AI governance engineer, platform team, security engineer, DPO…).

## Impacted stakeholders
Who is affected (data subjects, deployers, auditors, model owners, regulators…).

## Relevant principles
Which of the six principles (see 03) the pattern realises.

## Context
The situation in which the problem arises.

## Problem
The forces and the failure mode if the pattern is not applied.

## Solution
How to build it. Concrete artefacts, where it sits in the pipeline, what runs when.

## Consequences
Benefits and trade-offs (cost, latency, false positives, maintenance).

## Related patterns
Links to other patterns in the catalogue.

**Maps to:** standards / articles / layer (1–5) this pattern serves.
```

Target 12–15 patterns. Each pattern names the **layer** (1 Govern-as-Code … 5 Assurance) it belongs
to so the catalogue and the stack (chapter 04) stay consistent.

## 5. The "In practice" box and the "Maps to" line

- **In practice** is where the book earns trust: a grounded, de-identified account of the artefact in
  operation. Keep it factual. No company names, no confidential figures, no war stories that could
  identify a system. If you have no real example, write a plausible one and label it `> **In practice
  (illustrative)**`.
- **Maps to** is the traceability spine of the book. It connects each capability to (a) EU AI Act
  articles, (b) ISO/IEC 42001 / 42005, (c) NIST AI RMF functions, (d) OWASP GenAI / Agentic IDs, and
  (e) the five-layer stack. Chapter 08 (regulatory map) is the reverse index of every "Maps to" line.

## 6. Citation format

- In text, cite with a bracketed number: `… only 1.5% of respondents [1] …`. Numbers are local to
  the file and restart at `[1]` in every chapter.
- At the foot of the chapter, under `## Sources`, list each reference once:

  `[n] Title. Publisher. Date (YYYY-MM-DD or month/year). URL (verified: <tag>)`

- The **verification tag** is one of:
  - `primary`: you (or a cited sibling `sources.md`) opened the official primary source: the
    regulation text, the standards body, the vendor's own release, the report itself.
  - `secondary`: a reputable outlet reporting a primary fact you could not open directly.
  - `reported`: a claim carried only by secondary sources, or a figure the primary does not state
    verbatim. Copy that uses a `reported` fact must say "reported" in the sentence.
- Every `[n]` in a chapter must also exist as a row in `sources/SOURCES.md`, under that chapter's
  section, so the consolidated table stays complete. Add the row when you add the citation.
- Reuse an already-verified row rather than re-verifying: cite the existing `sources/SOURCES.md` row
  and carry its verification tag.

## 7. Handling unverified figures

- If a figure is real but only secondary, use it and write "reported": *"reported at +150% year over
  year [n]"*, tagged `reported`.
- If a figure is on the BRIEF blocklist, do not use it at all. The blocklist (see
  `build/BRIEF.md`) forbids, among others: "€47M first AI Act fines", "prompt injection +340%", the
  "LiteLLM backdoor" headline, "~4,000 AIGP holders", "14,000 open roles", any ISO 42001 certificate
  count except "industry estimates (~350 by mid-2026)", calling the IAPP Profession Report "2026"
  (it is the **2025** edition), and calling Spain's Organic Law on AI adopted (it is still in
  Congress).
- Never invent a statistic, a date, a version or a quote. If you need one and cannot source it,
  restructure the sentence so it does not need one.
- Prefer the complement honestly stated: IAPP says "only 1.5% will not need more staff"; if you write
  "98.5%", show the derivation ("100 − 1.5%") so the reader sees it is arithmetic, not a survey line.

## 8. Terminology: canonical terms

Use these spellings and capitalisations exactly. Define each once in the glossary (chapter 09).

| Term | Canonical form | Notes |
|---|---|---|
| The discipline | **AI governance engineering** | Lower case in running prose; Title Case only in titles. Never "AI Governance Engineering" mid-sentence except as a proper title. |
| The capability holder | **AI governance engineer** | A capability and a role, not necessarily a job title. |
| Policy as executable code | **governance-as-code** | Hyphenated. Umbrella term; "policy-as-code" is the narrower CI/CD subset. |
| Evals as the control | **evals as evidence** | The eval run is the evidence; a failing eval blocks the build. |
| AI bill of materials | **AIBOM** | All caps. Formats: CycloneDX ML-BOM, SPDX 3.0 AI profile. |
| Inventory of agents | **agent registry** | The runtime-aware inventory of non-human actors and their scope. |
| CI gate on evals | **eval gate** | A pipeline stage that fails the build when an eval fails. |
| Ongoing assurance | **continuous assurance** | Assurance produced continuously from telemetry, not point-in-time. |
| Non-human identity | **non-human identity (NHI)** | Agents, service accounts, machine identities. |

The five layers of the stack (chapter 04), named exactly, always in this order:

1. **Govern-as-Code**
2. **Inventory & Transparency**
3. **Evals & Red Teaming as Evidence**
4. **Runtime Controls & Observability**
5. **Assurance & Continuous Compliance**

Other fixed terms: **realised risk reduction**, **audit-ready evidence**, **eval gate**, **kill
switch**, **FRIA** (Fundamental Rights Impact Assessment), **DPIA**, **model card**, **data card**,
**OSCAL**, **guardian agent**.

## 9. Words to avoid

- Hype: revolutionary, game-changer, cutting-edge, next-generation, world-class, seamless, robustly,
  leverage (as a verb), unlock, supercharge, empower, holistic (unless quoting).
- Vague authority: "studies show", "experts agree", "it is well known". Cite instead.
- False certainty: "guarantees compliance", "makes you compliant", "ensures the model is safe". No
  artefact guarantees compliance; standards support, they do not confer. Say "supports", "evidences",
  "reduces the risk that".
- "Trustworthy AI" / "responsible AI" as our own banner: we cite them as other people's frameworks,
  we do not adopt them as the name of what we do (that is chapter 01's disambiguation job).
- "Just", "simply", "obviously": they hide the hard part.

## 10. Disambiguation discipline

The single most important editorial job of this book is to say what AI governance engineering is
**not**. Whenever a chapter risks blurring into a neighbour, add a one-line contrast. The canonical
neighbours (full treatment in chapter 01): AI safety research, MLOps/LLMOps, model risk management
(SR 11-7 style), AI compliance/legal, Responsible AI / AI ethics, GRC engineering (the parent), AI
security engineering (the sibling), and Visure's "AI governance for engineering" (governing AI used
_inside_ engineering workflows, the opposite direction). Never let the reader confuse the discipline
with any of these.

## 11. Licence and copy notice (put at the foot of every standalone document)

For every standalone document other than the Thesis:

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
> credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.

For the Thesis only, replace the final sentence with: "Attribution: Jorge García Aibar and Aurélie
Pols."
