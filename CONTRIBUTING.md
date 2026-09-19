# Contributing

This is a living Thesis and Body of Knowledge for **AI governance engineering**, meant to be
co-authored by practitioners. Corrections, sources and chapters are all welcome. Start small.

## Three ways to contribute

- **Sign the Thesis.** If you endorse the definition, values and principles, add one line to the
  signatories list in `bok/CONTRIBUTORS.md` (format shown there). Signing does not require writing
  anything else.
- **Suggest a source.** Found a stronger primary source, or a claim that needs one? Add a row to
  `sources/SOURCES.md` under the relevant chapter section and reference it from the copy.
- **Co-author a chapter or pattern.** Extend or sharpen a chapter, add a pattern to
  `bok/05-patterns.md`, or propose a new chapter from `OUTLINE.md`. Follow `STYLEGUIDE.md` and add
  yourself to the co-authors list in the same PR.

## Rules every PR must follow

- **Cite every factual claim.** Each factual statement carries a `[n]` marker with a matching row in
  `sources/SOURCES.md`, tagged `primary`, `secondary` or `reported`. No row, no claim.
- **Keep the voice.** Practitioner-direct, per `STYLEGUIDE.md` — its templates and section shapes are
  the house style. Read it before writing.
- **Do not rename the discipline.** The canonical term is **"AI governance engineering"**. Do not
  coin synonyms or retitle it.
- **Name categories, not vendors.** Describe the class of tool or control, not a specific product.
- **Never invent a statistic.** If you cannot source a number, do not use one. Respect the BRIEF
  blocklist in `STYLEGUIDE.md` §7.

## Run the checks locally

```
cd site && npm ci && npm run build && npm test
```

`npm run build` runs the Astro type check, the content lint, the internal link check and the search
index. `npm test` runs the Playwright default project. Green locally means green in CI.

## First pull request

If this is your first PR from a fork, a maintainer has to approve the workflow run before CI starts,
so the checks will show **"action required"** until someone clicks approve. That is expected — it is
not a failure on your side. After the first approval, later pushes run automatically.

## Licence

This work is licensed under **CC BY 4.0**. By contributing you agree that your contribution is
licensed the same way, and that you are adding your own work with nothing confidential in it.
