# 00. Preface

> Why this book exists, who it is for, and how to use it.

## Why this exists

There is a manifesto for GRC engineering. There is a manifesto for agile software. There is a pattern
catalogue for responsible AI and a twelve-factor guide for cloud applications. There is nothing that
tells you how to *engineer* the governance of AI systems — how to turn an AI Act obligation or an ISO
42001 control into policy-as-code, an eval gate, an agent registry and machine-readable evidence that
an auditor can read. This book is the first attempt to write that down.

It exists because the gap is now expensive. The thing being governed — models that retrain, prompts
that change, agents that act on their own — moves faster than any document can follow. Governance
written as PDFs and spreadsheets is stale before it is signed. The discipline that closes the gap is
engineering, applied to governance. This book is its founding text and its working reference.

## Who wrote it, and from what

Version 0.1 was written by Jorge García Aibar, an AI Governance & Privacy Engineer, drawing on two and
a half years designing and operating an AI governance framework inside a large telco — sitting between
Legal, Security and Engineering, and covering the governance, security, compliance, business and
model-performance dimensions of AI risk. Nothing in this book discloses any employer's internal
detail; where practice is described it is generic ("in a large telco").

It is built from three things. First, that operating experience: what actually held up when a model
changed on a Friday and an agent gained a new tool over the weekend. Second, the **GRC Engineering**
precedent — the community, manifesto and body of practice that, over roughly the last two years,
turned governance, risk and compliance into a product built with code [1][2]. Third, the public
record: the EU AI Act and its Digital Omnibus reform, ISO/IEC 42001, the NIST AI RMF, OWASP's GenAI
and Agentic work, CSA, CSIRO's Responsible AI Pattern Catalogue, and the frontier labs' own safety
frameworks. Every factual claim in the book carries a sourced, verified citation.

## Who should read this

- **AI governance leads** who want to stop shipping documents and start shipping controls.
- **Security engineers and AI security engineers** extending their threat models to models and agents.
- **Privacy engineers and DPOs** who want FRIA and DPIA to live as code, not as one-off PDFs.
- **MLOps and platform engineers** who are being asked to make governance a property of the pipeline.
- **Lawyers and compliance professionals who want to build** — to see the obligation turned into an
  executable control and readable evidence, and to help specify it.

You do not need to write production code to use this book, but you should be comfortable near a
pipeline. The discipline is a capability anyone close to the build can develop.

## What this is not

This is not a compliance checklist, and it is not legal advice. It does not tell you whether your
system is compliant; it tells you how to build the controls and the evidence that let someone qualified
make that call. It is not an AI safety research agenda, an MLOps handbook, or a vendor buyer's guide —
tools are named only as illustrative examples of a category, never as endorsements. And it is not
finished. Version 0.1 is a first public draft with deliberate gaps for co-authors to fill.

## How to cite

> García Aibar, J. and contributors. *AI Governance Engineering: A Manifesto & Body of Knowledge*,
> v0.1. 2026. https://aigovernanceengineer.com. Licensed CC BY 4.0.

Cite a specific chapter by its number and title (for example, "chapter 01, The definition"). The
canonical home of the manifesto is https://aigovernanceengineer.com/manifesto and of the Body of
Knowledge https://aigovernanceengineer.com/bok. Each chapter carries its own numbered source list;
the consolidated table lives in `sources/SOURCES.md`.

## Versioning

This is **v0.1** — the first public draft. Versioning is semantic in spirit: patch releases fix facts
and typos, minor releases add chapters or patterns, and a 1.0 will mark the point at which the core
chapters (00–10) are complete and reviewed. Every change is recorded in `bok/CHANGELOG.md`. Because
the regulatory and standards landscape moves — the Digital Omnibus reform, harmonised standards under
JTC 21, the OWASP and CSA releases — chapters carry a "current as of" date and are expected to be
revised.

## How to contribute

This book is meant to be co-authored. To contribute:

1. Read `STYLEGUIDE.md` and follow the chapter or pattern template exactly.
2. Source every factual claim. Use the `[n]` citation format, tag each source `primary`, `secondary`
   or `reported`, and add the row to `sources/SOURCES.md` under your chapter's section.
3. Open a pull request. To sign the manifesto, add your name to `bok/CONTRIBUTORS.md`.

The rules exist so that many hands produce one coherent book. Everything else — the arguments, the
patterns, the mappings — is open for you to improve.

**Maps to:** this preface makes no normative claim; the standards it names are treated in full in
chapters 04, 05 and 08.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
