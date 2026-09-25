# 00. Preface

> Why this book exists, who it is for, and how to use it.

> **In short**
> The Body of Knowledge is the founding text and working reference of AI governance engineering: it
> tells you how to turn an AI Act obligation or an ISO 42001 control into policy-as-code, an eval
> gate, an agent registry and machine-readable evidence that an auditor can read. It was written by
> Jorge García Aibar, drawing on two and a half years designing and operating an AI governance
> framework inside a large telco; the Thesis, the sole co-authored part of the project, is by Jorge
> García Aibar and Aurélie Pols. It is built from that operating experience, the GRC Engineering
> precedent and the public record: the EU AI Act and its Digital Omnibus reform, ISO/IEC 42001, the
> NIST AI RMF, OWASP, CSA, CSIRO's Responsible AI Pattern Catalogue and the frontier labs' safety
> frameworks. The book has 24 chapters in five parts: the discipline, reference, foundations, the
> lifecycle, and law and standards. Version 0.5.0 is a public draft, licensed CC BY 4.0.

## Why this exists

There is a manifesto for GRC engineering. There is a manifesto for agile software. There is a pattern
catalogue for responsible AI and a twelve-factor guide for cloud applications. There is nothing that
tells you how to *engineer* the governance of AI systems: how to turn an AI Act obligation or an ISO
42001 control into policy-as-code, an eval gate, an agent registry and machine-readable evidence that
an auditor can read. This book is the first attempt to write that down.

It exists because the gap is now expensive. The thing being governed (models that retrain, prompts
that change, agents that act on their own) moves faster than any document can follow. Governance
written as PDFs and spreadsheets is stale before it is signed. The discipline that closes the gap is
engineering, applied to governance. This book is its founding text and its working reference.

## Who wrote it, and from what

The Body of Knowledge was written by Jorge García Aibar, an AI Governance & Privacy Engineer,
drawing on two and a half years designing and operating an AI governance framework inside a large
telco, sitting between Legal, Security and Engineering, and covering the governance, security,
compliance, business and model-performance dimensions of AI risk. The Thesis is the sole co-authored
part of the project, written by Jorge García Aibar and Aurélie Pols, who works in Responsible AI,
Privacy and Data Governance. Nothing in this book discloses any employer's internal detail; where
practice is described it is generic ("in a large telco").

It is built from three things. First, that operating experience: what actually held up when a model
changed on a Friday and an agent gained a new tool over the weekend. Second, the **GRC Engineering**
precedent: the community, manifesto and body of practice that, since about 2024, has turned
governance, risk and compliance into a product built with code [1][2]. Third, the public
record: the EU AI Act and its Digital Omnibus reform, ISO/IEC 42001, the NIST AI RMF, OWASP's GenAI
and Agentic work, CSA, CSIRO's Responsible AI Pattern Catalogue, and the frontier labs' own safety
frameworks. Every factual claim in the book carries a sourced, verified citation.

## Who should read this

- **AI governance leads** who want to stop shipping documents and start shipping controls. Chapter 12
  sets up [the governance program](/bok/governance-program#the-organisation-as-an-object-of-governance)
  that gives every control an owner.
- **Security engineers and AI security engineers** extending their threat models to models and agents.
  Start with [layer 04 of the stack](/bok/the-stack#layer-04-runtime-controls--observability) and
  [governing AI agents](/bok/governing-agents#what-makes-an-agent-a-governance-object).
- **Privacy engineers and DPOs** who want FRIA and DPIA to live as code, not as one-off PDFs. Chapter
  19 applies [data protection law to AI](/bok/privacy-and-ai#principles-applied-to-ai), and chapter 18
  covers the [FRIA](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27).
- **MLOps and platform engineers** who are being asked to make governance a property of the pipeline.
  Chapters 14 and 15 run
  [the build as a chain of gates](/bok/governing-development#the-build-as-a-chain-of-gates) and
  [the deployment lifecycle](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance).
- **Risk leads and CISOs** who own the enterprise view of AI risk. Chapter 13 compiles
  [risk appetite and tolerance into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates),
  and chapter 17 runs [the incident response lifecycle](/bok/incidents#the-response-lifecycle).
- **Executives and board members** who need to know whether governance works. Chapter 12 names
  [the KPIs and KRIs that reach the board](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
- **Lawyers and compliance professionals who want to build**, to see the obligation turned into an
  executable control and readable evidence, and to help specify it. The last part reads
  [the EU AI Act](/bok/eu-ai-act#how-to-read-this-chapter),
  [the law that already applies](/bok/existing-law#how-to-read-this-chapter) and
  [AI laws around the world](/bok/ai-laws-worldwide#the-landscape-at-a-glance) as artefacts to build.
- **Public-sector teams**, for whom several jurisdictions already publish dedicated instruments.
  Chapter 21 covers
  [the UK's public-sector records](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records)
  and [Canada's Directive on Automated Decision-Making](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making).
- **Small organisations and start-ups**, which carry the same duties with fewer people. Chapter 04
  builds [the minimum viable stack for a team of one](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one).

You do not need to write production code to use this book, but you should be comfortable near a
pipeline. The discipline is a capability anyone close to the build can develop, whatever the title:
an AI governance engineer is defined by the workflows they own, not by the name of the role.

The website adds [one landing page per audience](/for) ([engineers](/for/engineers),
[CISOs and risk leads](/for/ciso-risk), [legal counsel and DPOs](/for/legal-dpo),
[executives and boards](/for/executives-board), [the public sector](/for/public-sector) and
[SMEs](/for/smes)) that puts the chapters, patterns, templates and tools in the order that job
needs them.

## How to use this book

The Body of Knowledge has 24 chapters in five parts. Read the first part in order: it sets the
vocabulary every other chapter uses. After that, read by part, or follow the question in front of
you.

1. **[The discipline](/bok#part-discipline)** (chapters 00–07): the definition, why the discipline is
   forming now, its values and principles, the five-layer stack, the pattern catalogue, the role and
   the maturity model.
2. **[Reference](/bok#part-reference)** (08–10): the regulatory map that turns each obligation into an
   artefact and a layer, the glossary and the reading list. Most chapters point into these.
3. **[Foundations](/bok#part-foundations)** (11–13): what counts as an AI system, the governance
   program that gives every control an owner, and the risk loop that tells every control how hard to
   bite.
4. **[The lifecycle](/bok#part-lifecycle)** (14–17 and 23): development, deployment, fairness and
   explainability, incidents and agents, each stage leaving a record that a gate reads.
5. **[Law and standards](/bok#part-law)** (18–22): the EU AI Act, data protection, the other law that
   already applies, AI laws around the world, and the principles and standards.

Most chapters open with an "At a glance" summary and a list of key terms, each linked to its glossary
page, and end with "What you can do this week". Chapters link to each other by section, so one topic
can be followed across parts. On the website, the patterns, templates, obligation register and
toolkit carry the same material in a form you can copy into a pipeline.

## What this is not

This is not a compliance checklist, and it is not legal advice. It does not tell you whether your
system is compliant; it tells you how to build the controls and the evidence that let someone qualified
make that call. It is not an AI safety research agenda, an MLOps handbook, or a vendor buyer's guide;
tools are named only as illustrative examples of a category, never as endorsements. And it is not
finished. Version 0.5.0 is a public draft with deliberate gaps open to contributions.

## How to cite

> García Aibar, J. *AI Governance Engineering: The Body of Knowledge*, v0.5.0. 2026.
> https://aigovernanceengineer.com/bok. Licensed CC BY 4.0.

For the Thesis, cite both co-authors:

> García Aibar, J., & Pols, A. *The AI Governance Engineering Thesis*, v0.5.0. 2026.
> https://aigovernanceengineer.com/thesis. Licensed CC BY 4.0.

Cite a specific chapter by its number and title (for example, "chapter 01, The definition"). The
canonical home of the Thesis is https://aigovernanceengineer.com/thesis and of the Body of
Knowledge https://aigovernanceengineer.com/bok. Each chapter carries its own numbered source list;
the consolidated table lives in `sources/SOURCES.md`.

## Versioning

This is **v0.5.0**, a public draft. Versioning is semantic in spirit: patch releases fix facts
and typos, minor releases add chapters or patterns, and a 1.0 will mark the point at which the core
chapters (00–10) are complete and reviewed. Every change is recorded in `bok/CHANGELOG.md`. Because
the regulatory and standards landscape moves (the Digital Omnibus reform, harmonised standards under
JTC 21, the OWASP and CSA releases), chapters carry a "current as of" date and are expected to be
revised.

## How to contribute

This book welcomes credited contributions. To contribute:

1. Read `STYLEGUIDE.md` and follow the chapter or pattern template exactly.
2. Source every factual claim. Use the `[n]` citation format, tag each source `primary`, `secondary`
   or `reported`, and add the row to `sources/SOURCES.md` under your chapter's section.
3. Open a pull request. To sign the Thesis, add your name to `bok/CONTRIBUTORS.md`.

The rules exist so that many hands produce one coherent book. Everything else (the arguments, the
patterns, the mappings) is open for you to improve.

**Maps to:** this preface makes no normative claim; the standards it names are treated in full in
chapters 04, 05, 08, 18 and 22.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
