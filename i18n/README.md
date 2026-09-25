# Translations

> Machine translations of the book into Spanish, French, German and Portuguese, produced by
> [`tools/i18n`](../tools/i18n/README.md) from the English, which stays the reference.

This directory is written by the translation pipeline, not by hand. The language folders are empty
until the first full pass runs (the English content was still changing when the pipeline landed);
the pipeline creates them. While they are empty the site builds exactly as before: no translated
route, no language switcher.

## Layout

```
i18n/
  glossary-lock.json          terms kept in English and locked equivalents (es, fr, de, pt)
  .tm/<lang>.jsonl            translation memory: one validated segment per line
  .tm/pending-batches.json    only while a Message Batches job is still processing
  <lang>/bok/<chapter-id>.md  chapters 00-23, same file names as bok/
  <lang>/patterns/<slug>.md   one per pattern, same slugs as bok/patterns/
  <lang>/THESIS.md            fr, de and pt only
```

`<lang>` is `es`, `fr`, `de` or `pt`: 57 files for `es` (no Thesis) and 58 for each of the others.

**UI strings.** The site chrome is translated from `site/src/i18n/ui.en.json` into `ui.<lang>.json`.
The pipeline, the site and its content lint find those files by one rule:

1. `I18N_UI_DIR` when it is set;
2. else `<I18N_DIR>/ui` when `I18N_DIR` is set (a scratch run keeps them beside its Markdown and
   never writes into `site/`);
3. else `site/src/i18n/ui.<lang>.json`, the committed location. The workflow sets neither
   variable, so its pull requests add the Markdown here and the UI strings there.

- **Frontmatter.** Every translated file opens with `lang`, `source` (the English file),
  `sourceHash` (sha256 of the English file with LF line endings), `translatedBy`
  (`machine: <model id>`) and `translatedAt`, then the source's own fields.
- **Same structure as the English.** Same headings in the same order at every level, same lists and
  tables, same callouts and "Maps to" lines (their labels in the language, from
  `site/src/i18n/callouts.json`), same `[n]` citation markers, same links and URLs (link text
  translated), code untouched, and the `## Sources` section kept in English, verbatim. No em dash.
  The pipeline parses every file it renders back and refuses to write one whose structure differs.
- **The Spanish Thesis** is the hand translation [`THESIS.es.md`](../THESIS.es.md), served at
  `/es/thesis`. There is no `es/THESIS.md` and the pipeline never writes one.
- **Stale files.** A translation whose `sourceHash` no longer matches its English file is out of
  date; the next run of the pipeline re-renders it and pays only for the segments that changed.
- **Corrections.** A hand edit to a file here lasts until its English file changes. Terminology
  goes in `glossary-lock.json`; a lasting fix to one segment goes in its line in `.tm/<lang>.jsonl`.

## Modes

`node tools/i18n/translate.mjs <mode>` from the repository root (Node 22):

| Mode | API key | Writes | What it does |
|---|---|---|---|
| `--estimate` | no | nothing | Token counts and estimated USD per language, for the Messages API and the Message Batches API, with and without prompt caching, and the worst case the cap is checked against. |
| `--mock` | no | only into `I18N_DIR` | A deterministic pseudo-translation (accented vowels, locked terms applied) with the exact structure of a real one. It refuses to run without `I18N_DIR`, so it never touches this directory. |
| `--sync` | yes | files, memory | Messages API, four requests at a time: small incremental runs. |
| `--batch` | yes | files, memory | Message Batches API at half price: the full pass. The batch id is saved before waiting, so an interrupted run resumes it and never pays twice. |

`--dry-run` prints the plan and the estimate of any mode without calling the API or writing.
`--max-usd` is a hard cap (default 1): before a request is sent its worst case (every `max_tokens`
produced, the prompt billed as a cache write, the input estimate plus 15%) is reserved against it,
and a request that would pass it waits for a later run. The command exits 1 when the run reports an
error (a file kept out because its structure changed, an API error), after writing the files that
passed and the summary.

## Cost

`--estimate` on 2026-09-25 (empty memory, Claude Haiku 4.5 at USD 1 / 5 per million input / output
tokens): 494 requests, 33,633 segments sent (about 8,400 unique per language), 1.44 million source
tokens.

| | Sync | Sync + cache | Batch | Batch + cache |
|---|---|---|---|---|
| es | 4.14 | 3.54 | 2.07 | 1.77 |
| fr | 4.28 | 3.67 | 2.14 | 1.83 |
| de | 4.36 | 3.75 | 2.18 | 1.87 |
| pt | 4.19 | 3.58 | 2.10 | 1.79 |
| Total | 16.98 | 14.53 | 8.49 | 7.26 |

USD. "+ cache" is the best case (every request after the first reads the cached system prompt); in
a batch, cache hits are best effort, so the real figure lies between the two batch columns. The
worst case the cap reserves is USD 11.46 for the whole batch (USD 22.93 through the Messages API).
Later runs pay only for the segments whose English changed.

## The first full pass

1. Add the repository secret `ANTHROPIC_API_KEY` (Settings, Secrets and variables, Actions). To let
   the workflow open its own pull request, also tick "Allow GitHub Actions to create and approve
   pull requests" (Settings, Actions, General, Workflow permissions).
2. Actions, **Translations**, Run workflow (`workflow_dispatch`) on `main` with `mode` = `batch`,
   `langs` = `es,fr,de,pt` and `max_usd` = `10`.
3. The cap is hard and reserves the worst case, which for the whole pass is USD 11.46, so at 10 the
   batch is trimmed before it is created: 430 of the 494 requests go in (all of `es`, `fr` and `de`,
   about half of `pt`). The real spend is about USD 6.3 to 7.4. The Portuguese files that still miss
   a segment are not written (a `sourceHash` is only stamped on a complete file), but every segment
   that came back is kept in the memory. Most batches end within an hour; the job waits up to five.
4. The workflow commits `i18n/` and the UI strings to a new branch `i18n/auto-<run id>` and pushes
   it (never `main`). It then opens a pull request from that branch if the repository allows GitHub
   Actions to create pull requests; otherwise the run logs a notice and a maintainer opens the pull
   request from the pushed branch by hand. The body is the run summary: languages, files, segments,
   English kept, real spend and any error. Pull requests opened with the workflow's token do not
   start `ci.yml`: close and reopen the pull request (or push a commit to it) to run the checks.
5. Review and merge it, then run the workflow once more on `main` with `mode` = `batch`,
   `langs` = `pt` and `max_usd` = `2` for the rest of Portuguese (about USD 1; the memory means
   nothing is paid twice). A cap of `12` in step 2 would have covered the whole pass in one run.
6. If a job stops waiting while its batch is still processing, the batch id is committed in
   `.tm/pending-batches.json` on that branch. Run the workflow again **on that branch** ("Use
   workflow from", `mode` = `batch`): it resumes the batch, applies the results, pushes to the same
   branch and comments on the same pull request.

After that, a push to `main` that edits `bok/**`, `THESIS.md` or `site/src/i18n/ui.en.json` runs a
sync pass capped at USD 0.50 for the changed segments only. Merge each translation pull request
before the next one starts: the memory is append-only and two open pull requests would translate
the same new segments twice.

## Trying it without an API key

```sh
I18N_DIR=/tmp/i18n-mock node tools/i18n/translate.mjs --mock
cd site && I18N_DIR=/tmp/i18n-mock npm run build
```

The site then renders every chapter, pattern and Thesis in the four languages from the
pseudo-translations and reads the UI strings from `/tmp/i18n-mock/ui`.

How the pipeline works, its options and how the terminology was chosen:
[`tools/i18n/README.md`](../tools/i18n/README.md).

This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
