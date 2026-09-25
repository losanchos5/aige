# Translations

> Machine translations of the book into Spanish, French, German and Portuguese, produced by
> [`tools/i18n`](../tools/i18n/README.md) from the English, which stays the reference.

This directory is written by the translation pipeline, not by hand. The language folders are empty
until the first full pass runs (the English content was still changing when the pipeline landed);
the pipeline creates them.

```
i18n/
  glossary-lock.json          terms kept in English and locked equivalents (es, fr, de, pt)
  .tm/<lang>.jsonl            translation memory: one validated segment per line
  .tm/pending-batches.json    only while a Message Batches job is still processing
  <lang>/bok/<chapter-id>.md  chapters 00-23, same file names as bok/
  <lang>/patterns/<slug>.md   one per pattern, same slugs as bok/patterns/
  <lang>/THESIS.md            fr, de and pt only
```

`<lang>` is `es`, `fr`, `de` or `pt`. The UI strings go to `site/src/i18n/ui.<lang>.json`, generated
from `site/src/i18n/ui.en.json`.

- **Frontmatter.** Every translated file opens with `lang`, `source` (the English file),
  `sourceHash` (sha256 of the English file with LF line endings), `translatedBy`
  (`machine: <model id>`) and `translatedAt`, then the source's own fields.
- **Same structure as the English.** Same headings in the same order at every level, same lists and
  tables, same `[n]` citation markers, same links and URLs (link text translated), code untouched,
  and the `## Sources` section kept in English, verbatim. No em dash.
- **The Spanish Thesis** is the hand translation [`THESIS.es.md`](../THESIS.es.md), served at
  `/es/thesis`. There is no `es/THESIS.md` and the pipeline never writes one.
- **Stale files.** A translation whose `sourceHash` no longer matches its English file is out of
  date; the next run of the pipeline re-renders it and pays only for the segments that changed.
- **Corrections.** A hand edit to a file here lasts until its English file changes. Terminology
  goes in `glossary-lock.json`; a lasting fix to one segment goes in its line in `.tm/<lang>.jsonl`.

How to run the pipeline, what it costs and how the terminology was chosen:
[`tools/i18n/README.md`](../tools/i18n/README.md).

This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
