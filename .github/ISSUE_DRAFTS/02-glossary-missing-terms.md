# Help wanted: define missing glossary terms

Labels: help wanted, chapter-09, glossary

## The gap

Several precise terms are used in the Body of Knowledge chapters but never defined in the glossary
(`bok/09-glossary.md`). `STYLEGUIDE.md` §1 asks that each precise term be defined once, in the
glossary, and §8 lists the canonical spellings. These terms are used in chapters 04–08 with no entry:

- **Attestation**: used in three chapters (04–08); named in `STYLEGUIDE.md` §1 as an example of a
  precise term to define once, but it has no glossary entry.
- **Prompt injection**: used across chapters; the glossary defines `jailbreak` and `red teaming`
  but not prompt injection, which is a distinct failure class (and an OWASP LLM Top 10 category).
- **Human-in-the-loop**: used in three chapters as a control, with no definition.

## What to add

Add one `**Term.**`-led entry per term to `bok/09-glossary.md`, in alphabetical position, matching
the existing entry style (a bold term, a full-stop, then a one-to-three-sentence definition). Keep
the disambiguation discipline of `STYLEGUIDE.md` §10 where a term borders a neighbour (e.g. prompt
injection vs jailbreak). Where a definition asserts a fact (a standard, an article, a category ID),
add the `[n]` citation and the matching `sources/SOURCES.md` row.

## Acceptance criteria

- Each new term is defined once, alphabetically placed, in the existing style.
- Canonical spellings from `STYLEGUIDE.md` §8 are respected.
- Any factual claim carries a citation per `STYLEGUIDE.md` §6.
- A quick grep confirms the terms are actually used in chapters 04–08 (they are today).
