# AI Governance Engineering: The Thesis & Body of Knowledge

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.22857084.svg)](https://doi.org/10.5281/zenodo.22857084)

<img width="1128" height="191" alt="cover-headline-1128x191" src="https://github.com/user-attachments/assets/52123838-69ef-4bc1-9814-39ac0354dd6a" />

**AI governance engineering is the application of engineering practice (systems thinking, product
thinking and code) to the governance of AI systems.**

This repository is the founding text of that discipline: a short **Thesis** and a growing **body of
knowledge**. It is written for practitioners who build governance for AI systems (policy-as-
code, agent registries, eval gates, runtime guardrails, machine-readable evidence) and who measure
their work by realised risk reduction and audit-ready evidence, not by framework coverage.

It is **version 0.5.0**: 24 chapters, 13 of them new (11 to 23, from AI defined for governance through
the programme, the lifecycle and the law to governing agents), 33 patterns with their own pages, an
open-data API, a browser toolkit, and open control profiles and research notes (draft), still
deliberately incomplete and open to contributions. The Body of Knowledge, website, datasets and
project materials are authored by **Jorge García Aibar**.
The Thesis is the sole exception: it is co-authored by **Jorge García Aibar and Aurélie Pols** and
is open for signatures.

**Home:** https://aigovernanceengineer.com (the Thesis at `/thesis`, Body of Knowledge at `/bok`).
Source repository: `github.com/losanchos5/aige`.

## Start here

- **[THESIS.md](THESIS.md)**: the founding statement (definition, the five problems with legacy
  AI governance, eight values, six principles, what AI governance engineers build).
- **[bok/01-definition.md](bok/01-definition.md)**: what the discipline is, and the eight neighbours
  it is not.
- **[OUTLINE.md](OUTLINE.md)**: the full table of contents with a brief for each chapter.

## Structure

```
aige/
├── THESIS.md              The founding statement (one page)
├── STYLEGUIDE.md          Voice, formatting, templates, citation format, terminology
├── OUTLINE.md             Full table of contents with per-chapter briefs
├── README.md              This file
├── bok/                   The Body of Knowledge
│   ├── 00-preface.md          Provenance, audience, how to cite, versioning
│   ├── 01-definition.md       Definition, disambiguation, object of governance, three questions
│   ├── 02-why-now.md          The five problems with the evidence; market, regulatory and agent signals
│   ├── 03-values-principles.md  The eight values and six principles, expanded
│   ├── 04-the-stack.md        The five-layer reference architecture
│   ├── 05-patterns.md         Pattern catalogue (CSIRO template): one summary per pattern
│   ├── patterns/              One file per pattern (bok/patterns/<slug>.md, /patterns/<slug>)
│   ├── 06-the-role.md         The AI governance engineer, by workflow, skills and market
│   ├── 07-maturity-model.md   Five levels from Documented to Continuous
│   ├── 08-regulatory-map.md   Obligation → artefact → layer reverse index
│   ├── 09-glossary.md         Canonical definitions, alphabetical
│   ├── 10-reading-list.md     Annotated bibliography
│   ├── 11-…23-*.md            AI defined, the programme, the lifecycle, the law, governing agents
│   ├── CONTRIBUTORS.md        Authorship, contributors, SIGNATORIES
│   └── CHANGELOG.md           Version history
├── research/              Technical notes (research/<slug>.md, served at /research/<slug>)
├── sources/
│   └── SOURCES.md         Consolidated, verified source table (one section per chapter)
└── build/
    └── build_pdf.py       Assembles the Markdown into dist/site-preview.html (PDF export optional)
```

Chapters 00–23 are drafted; contributions that extend the catalogue, mappings and arguments are
welcome and credited.

## The five-layer stack

The artefacts an AI governance engineer ships map onto five layers, always named in this order:

1. **Govern-as-Code**: policy-as-code, framework crosswalks, gates in CI/CD.
2. **Inventory & Transparency**: agent registry, AIBOM, model and data cards, FRIA/DPIA.
3. **Evals & Red Teaming as Evidence**: adversarial and capability evals wired into the pipeline.
4. **Runtime Controls & Observability**: guardrails, agent identity, tracing, kill switches.
5. **Assurance & Continuous Compliance**: machine-readable evidence (OSCAL), continuous assurance,
   serious-incident reporting.

## Open datasets

The site publishes two reusable datasets, generated from the same source as its reference pages:

| Dataset | JSON | CSV | Versioned source |
|---|---|---|---|
| Framework crosswalk | [JSON](https://aigovernanceengineer.com/resources/crosswalk.json) | [CSV](https://aigovernanceengineer.com/resources/crosswalk.csv) | [crosswalk.ts](site/src/data/crosswalk.ts) |
| Obligation → artefact → layer mappings | [JSON](https://aigovernanceengineer.com/resources/obligations.json) | [CSV](https://aigovernanceengineer.com/resources/obligations.csv) | [frameworks.ts](site/src/data/frameworks.ts) |

These are curated reference mappings. They are illustrative, not a claim of conformity or a
substitute for reading the underlying instruments. The live exports can change as the site evolves;
record the retrieval date and source commit when using them in research.

### How to cite the datasets

Cite the parent work, name the dataset you used, and include its URL and retrieval date:

> García Aibar, J. *AI Governance Engineering: The Thesis & Body of Knowledge*
> (v0.5.0). https://doi.org/10.5281/zenodo.22956197. Dataset: Framework crosswalk / Obligation
> mappings. [Dataset URL; retrieval date; source commit].

The DOI identifies the archived parent release, not a separately deposited dataset. The DOI above
is the v0.5.0 version DOI; the [concept DOI](https://doi.org/10.5281/zenodo.22857084) resolves to the
latest archived release. See
[CITATION.cff](CITATION.cff) for citation metadata.
Reuse is covered by this repository’s [licence](LICENSE).

## How to contribute

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full contribution guide. In short:

1. Read **[STYLEGUIDE.md](STYLEGUIDE.md)** and follow the chapter or pattern template exactly.
2. Source every factual claim with a `[n]` citation, tag it `primary` / `secondary` / `reported`, and
   add the row to `sources/SOURCES.md` under your chapter's section.
3. Open a pull request. Keep the voice practitioner-direct; name categories, not vendors; never invent
   a statistic.

To review a control profile or a research note, propose a failure mode, share an implementation
example or map a control to a clause, use the GitHub issue forms listed at
https://aigovernanceengineer.com/contribute.

## How to sign

Sign the Thesis by opening a pull request that adds your name (and optionally a LinkedIn or GitHub
link) to the **SIGNATORIES** section of **[bok/CONTRIBUTORS.md](bok/CONTRIBUTORS.md)**.

## Licence

Except where otherwise noted, this work is licensed under
**[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**. You may share and adapt it provided
you give appropriate credit, link to the licence and indicate changes. Attribute the Body of
Knowledge, website, datasets and project materials to **Jorge García Aibar**. Attribute the Thesis to
**Jorge García Aibar and Aurélie Pols**.
