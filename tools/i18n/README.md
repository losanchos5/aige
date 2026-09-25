# Translation pipeline (es, fr, de, pt)

> Machine translation of the Body of Knowledge, the patterns, the Thesis and the site UI strings
> with Claude Haiku 4.5, under a hard spend cap, with every segment checked before it is kept.

English is the source and the reference. The pipeline reads the English files, cuts them into
segments (one heading, paragraph, list item or table cell each), protects everything that must not
change, sends only the segments it has never translated, validates every answer, keeps the good ones
in a translation memory and writes one translated file per English file. A second run after an
English edit pays only for the segments that changed. The Spanish Thesis is the hand translation
`THESIS.es.md`: the pipeline never produces or overwrites a Spanish Thesis.

## What goes where

| English source | Translation |
|---|---|
| `bok/00-*.md` .. `bok/23-*.md` | `i18n/<lang>/bok/<chapter-id>.md` (same file names) |
| `bok/patterns/<slug>.md` | `i18n/<lang>/patterns/<slug>.md` |
| `THESIS.md` | `i18n/<lang>/THESIS.md` for `fr`, `de`, `pt` only |
| `site/src/i18n/ui.en.json` (when it exists) | `site/src/i18n/ui.<lang>.json` |

`<lang>` is `es`, `fr`, `de` or `pt`. Every translated Markdown file opens with this frontmatter,
followed by the source's own fields (patterns keep `id`, `layer`, `order`; only `title` and
`summary` are prose, and pattern titles are locked names that stay in English):

```yaml
---
lang: es
source: bok/04-the-stack.md
sourceHash: "<sha256 hex of the English file, line endings normalised to LF>"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
```

The translation memory is `i18n/.tm/<lang>.jsonl`, one JSON object per line:
`{"h": "<sha256 of the English segment>", "t": "<translation>", "model": "...", "at": "YYYY-MM-DD"}`.
A batch still processing is recorded in `i18n/.tm/pending-batches.json`. The glossary lock is
`i18n/glossary-lock.json` (see [Terminology](#terminology)). `I18N_DIR` moves all of `i18n/` to
another directory (tests and fixtures do this); `I18N_UI_DIR` moves the UI files (by default
`site/src/i18n`, or `<I18N_DIR>/ui` when `I18N_DIR` is set, so a scratch run never writes into the
site).

## Running it

Node 22. Plan, estimate and mock need no dependency and no API key; `--sync` and `--batch` need
`npm ci` in this directory and `ANTHROPIC_API_KEY` in the environment.

```sh
node tools/i18n/translate.mjs --estimate                          # tokens and USD per language
node tools/i18n/translate.mjs --sync --dry-run --only 'bok/04-*'  # the plan; no API, no writes
I18N_DIR=/tmp/i18n node tools/i18n/translate.mjs --mock           # pseudo-translation, no network
node tools/i18n/translate.mjs --sync --langs es --only 'bok/patterns/aibom.md' --max-usd 0.05
node tools/i18n/translate.mjs --batch --max-usd 12                # the full pass
```

| Mode | What it does |
|---|---|
| `--estimate` | Counts tokens and prints the estimated USD per language: Messages API and Message Batches API, each with and without prompt caching, and the worst case the cap is checked against. Writes nothing. |
| `--mock` | A deterministic pseudo-translation with no network: locked terms become their target equivalent, locked names stay, every other lower-case vowel gets an accent. The output has the exact structure of a real translation and passes the same checks; the site builds its fixtures from it. Refuses to run without `I18N_DIR`, so it never writes into the repository `i18n/`. |
| `--sync` | Messages API, four requests at a time. For small incremental runs. |
| `--batch` | Message Batches API at half price. Creates the batch, saves its id in `i18n/.tm/pending-batches.json` before waiting, polls every minute, applies the results and removes the id. A run that stops waiting (or is interrupted) leaves the id; the next `--batch` run resumes that batch first and never resubmits its segments. |

Options: `--langs es,fr,de,pt` (default all four), `--only <glob>` (repo-relative, repeatable:
`'bok/0*.md'`, `'bok/patterns/**'`, `'THESIS.md'`), `--max-usd <n>` (default 1), `--dry-run`,
`--model <id>` (default `claude-haiku-4-5-20251001`; `--price-in`/`--price-out` for a model without
a known price), `--force` (re-render files whose `sourceHash` matches), `--full` (with `--estimate`:
ignore the memory and the hashes), `--cache-ttl 5m|1h|off`, `--concurrency`, `--poll-seconds`,
`--max-wait-minutes`, `--no-wait`, `--date`, `--report <json>`, `--summary <md>`.

## How a run works

1. **Plan.** Every English source is parsed. A file whose translation already carries the same
   `sourceHash` is skipped. Of the rest, segments with nothing to translate (only code, numbers,
   acronyms, locked names or placeholders) are copied; segments already in the memory are reused;
   the others, deduplicated, are grouped into requests of about 3,000 source tokens.
2. **Protect.** Inline code, URLs and link targets, `[n]` citation markers, HTML, autolinks, entities
   and backslash escapes become numbered placeholders `{1}`, `{2}`, ... The model sees Markdown with
   placeholders and translates link text but never a link target. The whole `## Sources` section, code
   blocks and tables' delimiter rows are never sent: they are copied verbatim. Callout labels
   (`**In practice**`, `**Anti-pattern**`, ...) and the `**Maps to:**` lead stay in English unless
   `site/src/i18n/callouts.json` maps them (`{"In practice": {"es": "En la práctica", ...}}`).
3. **Translate.** One fixed system prompt (the rules and the whole glossary lock, about 5,600 tokens,
   identical for every request and language, so prompt caching serves it) and one user message per
   request with the target language and the segments as JSON. Structured outputs guarantee the answer
   is `{"segments":[{"id","t"}]}`.
4. **Validate.** Every segment: every placeholder exactly once and nothing extra, link targets still
   inside `](...)`, the same number of `[n]` markers and of `**` bold markers, no em dash (the
   post-processor turns any em dash into a comma first), not empty, not identical to the English
   unless there is nothing to translate. A failing segment is retried once, in a smaller request; if
   it fails again the English segment is kept and listed in the run report. Locked terms that do not
   appear are logged as warnings.
5. **Write.** Each file is rendered from the memory with its prose re-wrapped at about 100
   characters (never inside bold, a link or code, never starting a line with something that would
   open another block), then parsed again: if its structure (every heading level, list, item, table
   shape, quote and code block) differs from the English, the file is not written and the run reports
   it. A file with a segment still untranslated (the cap, an API error, a batch in progress) is not
   written either, so a `sourceHash` is only ever stamped on a complete file.

Hand edits to a translated file survive until the English file changes; then the file is rendered
again from the memory. Lasting corrections belong in the glossary lock (terminology) or in the
memory line of that segment.

## Cost and the cap

Prices are the Claude API list prices for Claude Haiku 4.5: USD 1 per million input tokens and
USD 5 per million output tokens; the Message Batches API halves both; a cache write costs 1.25x the
input price (5-minute TTL) and a cache read 0.1x. Haiku 4.5 caches a prefix only from 4,096 tokens,
which the system prompt passes. Token counts are an approximation, so no key is needed to plan:
3.5 characters per token for the English (ordinary English prose runs nearer 4, so this over-counts),
3 tokens per placeholder, and output tokens = source tokens x 1.4 (es, pt), 1.45 (fr) or 1.5 (de)
plus the JSON framing. The first real run prints the real spend from the API's usage figures.

`--estimate` on the content of v0.5.0 (2026-09-25, empty memory): 57 files for `es` (no Thesis) and
58 for `fr`, `de`, `pt`; about 10,800 segments per language, of which 1,300 have nothing to translate
and about 8,300 unique ones are sent; 491 requests; about 1.44 million source tokens in total.

| Language | Requests | Segments | Input tokens | Output tokens | Sync | Sync + cache | Batch | Batch + cache |
|---|---|---|---|---|---|---|---|---|
| es | 122 | 8,292 | 1,109,538 | 604,549 | 4.13 | 3.53 | 2.07 | 1.76 |
| fr | 123 | 8,347 | 1,119,682 | 629,592 | 4.27 | 3.66 | 2.13 | 1.83 |
| de | 123 | 8,347 | 1,119,718 | 645,606 | 4.35 | 3.74 | 2.17 | 1.87 |
| pt | 123 | 8,347 | 1,121,125 | 610,977 | 4.18 | 3.57 | 2.09 | 1.78 |
| Total | 491 | 33,333 | 4,470,063 | 2,490,724 | 16.92 | 14.49 | 8.46 | 7.25 |

USD. "+ cache" is the best case, every request after the first reading the cached system prompt;
in a batch, cache hits are best effort, so the real figure lies between the two batch columns.

**The cap (`--max-usd`) is hard.** Before a request is sent, its worst case (every token of its
`max_tokens` produced, the whole prompt billed as a cache write, the input approximation plus 15%)
is added to the spend so far and to the worst case of the requests still in flight; if the sum would
pass the cap, the request is not sent and its segments wait for a later run. After each answer the
reservation is replaced by the real cost from the usage the API returns, and the final spend is
printed. In batch mode every request of the batch is reserved at once, so a batch is trimmed to what
fits under the cap before it is created. For the full pass above that worst case is USD 11.43 in a
batch (USD 22.85 through the Messages API), so a cap of 12 covers the whole batch.

## The first full pass

1. Add the repository secret `ANTHROPIC_API_KEY` (Settings, Secrets and variables, Actions), and
   allow GitHub Actions to create pull requests (Settings, Actions, General, Workflow permissions,
   "Allow GitHub Actions to create and approve pull requests").
2. Actions, **Translations**, Run workflow on `main` with `mode` = `batch`, `langs` =
   `es,fr,de,pt`, `max_usd` = `12`.
3. Expected spend: about USD 7 to 8.5 by the estimate above (the approximation errs high), never
   more than 12. Most batches end within an hour; the job waits up to five hours.
4. The workflow opens a pull request from `i18n/auto-<run id>` with the files, the memory and a
   summary (languages, files, segments, English kept, real spend). Review and merge it. Pull requests
   opened with the workflow's token do not start `ci.yml` on their own: close and reopen the pull
   request (or push a commit to it) to run the checks.
5. If the job stops waiting while the batch is still processing, the batch id is committed in
   `i18n/.tm/pending-batches.json` on that branch. Run the workflow again **on that branch** ("Use
   workflow from", `mode` = `batch`): it resumes the batch, applies the results, pushes to the same
   branch and comments on the same pull request, without paying twice.

After that, a push to `main` that edits `bok/**`, `THESIS.md` or `site/src/i18n/ui.en.json` runs a
sync pass capped at USD 0.50 for the changed segments only. Merge each translation pull request
before the next one starts: the memory is append-only and two open pull requests would translate
the same new segments twice.

## The workflow

[`.github/workflows/i18n.yml`](../../.github/workflows/i18n.yml): `workflow_dispatch` (inputs
`langs`, `mode` batch or sync, `max_usd` default `1.00`) and `push` to `main` on the English sources
(sync, `0.50`). No default permissions; the job gets `contents: write` (to push the `i18n/auto-*`
branch) and `pull-requests: write` (to open the pull request), nothing else. Actions are pinned to
commit SHAs, one run at a time (`concurrency: i18n`), only in `losanchos5/aige`. The checkout leaves
no token in `.git/config`; the API key reaches only the translate step; the unit tests run before any
spend. It never pushes to `main`, and `deploy.yml` does not depend on it: a failure here changes
nothing that deploys.

## Terminology

`i18n/glossary-lock.json` = `{ "doNotTranslate": [...], "terms": { "<English>": { "es", "fr", "de",
"pt" } } }`. The whole lock goes into the system prompt; the validator warns when a multi-word term
or an acronym is not rendered as locked.

- **Kept in English**: the 33 pattern names and the five layer names of the stack (proper names of
  the book), organisations, standards, products and tools, and identifiers.
- **EU law** follows the official language versions on EUR-Lex. Regulation (EU) 2024/1689 (AI Act,
  Article 3 definitions and article headings) and Regulation (EU) 2016/679 (GDPR, Article 4
  definitions and article headings) were read in the English, Spanish, French, German and Portuguese
  manifestations from the Publications Office Cellar on 2026-09-25
  (`http://publications.europa.eu/resource/celex/32024R1689` and `.../32016R0679`, content
  negotiation by language). Examples: provider = proveedor / fournisseur / Anbieter / prestador;
  deployer = responsable del despliegue / déployeur / Betreiber / responsável pela implantação;
  high-risk AI system = sistema de IA de alto riesgo / système d'IA à haut risque /
  Hochrisiko-KI-System / sistema de IA de risco elevado. The official short titles of the Data Act,
  the Digital Services Act, the Cyber Resilience Act and the NIS 2 Directive (whose official
  language versions say "SRI 2" in es, fr and pt) and the full titles of DORA and the Product
  Liability Directive come from the same source; "Digital Omnibus on AI" follows the language
  versions of the proposal COM(2025) 836.
- **"AI Act"**: the official short title is "Reglamento de Inteligencia Artificial" /
  "règlement sur l'intelligence artificielle" / "Verordnung über künstliche Intelligenz" /
  "Regulamento da Inteligência Artificial"; the book's short form "AI Act" becomes "Reglamento de IA"
  (the form of the hand-translated Spanish Thesis), "règlement sur l'IA", "KI-Verordnung" and
  "Regulamento da IA".
- **GDPR** becomes RGPD / RGPD / DSGVO / RGPD, and **DPIA** and **DPO** the acronyms of the national
  data protection authorities (EIPD, AIPD, DSFA, AIPD; DPD, DPO, DSB, EPD); the expanded terms are
  the Regulation's.
- **Variants and register**: es-ES (the reader is "tú", as in the Spanish Thesis), fr-FR ("vous"),
  de-DE ("Sie"), and **pt-PT, not pt-BR**: the EU legal vocabulary the book leans on exists only in
  the European Portuguese version of EU law ("prestador", "registo", "risco sistémico"), and it keeps
  the four targets European. Brazilian readers read pt-PT without difficulty; the reverse would put
  non-official terms on every EU obligation.

## Tests

`npm test` (Node's test runner, offline, about ten seconds): the parser renders every real source
back byte for byte; a mock translation of every real source keeps the same blocks, link targets and
code under the site's own Markdown parser (mdast with GFM, when `site/node_modules` is installed;
skipped otherwise); placeholders round-trip on every real segment; validation, the em dash rule,
the glossary lock and the system prompt; mock mode end to end on the real content into a scratch
`I18N_DIR`, sourceHash skipping and an English edit that re-translates one segment; the hard cap and
the retry-then-fallback rule with a fake client; batch creation, interruption and resume with a fake
client; the official SDK itself against a fake `fetch` that answers like the API (request shape,
cached system prompt, structured output, batch JSONL results, an authentication error stopping the
run); the workflow file; the CLI; no em dash in any of these files.

## Known limits

- Headings are translated, so their slugs change; the structure is one to one (same number and order
  of headings at every level), which is what the site uses to map anchors.
- The pattern H1 keeps its locked name and translates its "Pattern:" prefix.
- `bok/patterns/continuous-assurance-telemetry.md` line 41 starts with "+ version", which Markdown
  reads as a list item (the site renders it so too); the pipeline keeps that structure as it is.

This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
