# Site languages and UI strings

The site renders machine translations of the Body of Knowledge, the pattern pages and the Thesis
(openspec/changes/i18n-site-rendering). English is the reference and keeps its unprefixed URLs;
every other language lives under `/<lang>/` and only where a translation exists.

Switched off since 2026-09-25: `PUBLISHED_TRANSLATED_LOCALES` in `locales.ts` is empty, so no
machine translation is built (no `/<lang>/` route, hreflang, sitemap entry or language switcher) and
`public/_redirects` sends their old URLs to the English pages with a 302. The files, the pipeline and
this code stay; list the languages there (and drop the 302 rules) to publish them again. The hand
translation `/es/thesis` is always published. A fixture build (below) needs the switch on too.

| File | What it is | Who writes it |
| --- | --- | --- |
| `locales.ts` | The locales (`en` default, `es`, `fr`, `de`, `pt`), their own names, Open Graph and Intl tags | developers |
| `ui.en.json` | Every string of the site chrome, as a flat `key -> string` map | developers |
| `ui.<lang>.json` | The same keys, translated (committed here; see "Where the UI strings live") | the translation pipeline |
| `ui.ts` | `t(key, lang, vars)`: hand strings, then `ui.<lang>.json`, then English | developers |
| `callouts.json` | English callout label -> the label each language uses | developers |
| `callouts.ts` | Recognises a translated label in a file of that language | developers |

Rules for a `ui.<lang>.json` (the build fails otherwise, `ui.ts` `uiProblems`):

- only keys that exist in `ui.en.json`, every value a string;
- exactly the `{name}` placeholders of the English value (`{model}`, `{language}`, `{count}`...);
- no em dash (U+2014).

A missing file or key renders English. `bok.thisWeek` is the recurring closing heading of the
chapters ("What you can do this week"): a translation should use the same wording in every chapter.

Callout labels: the pipeline replaces `**<English label>**` with the label `callouts.json` gives for
the language (`> **In practice**` becomes `> **En la práctica**`); `Maps to` and `Maps to:` lead the
mapping line. A label with no entry stays English, which the site always recognises.

## Where the UI strings live

One rule, shared by the pipeline (`tools/i18n/lib/config.mjs`), this site (`ui.ts` `uiDir()`) and
the content lint (`scripts/content-lint.mjs`), so a build always reads the files a run with the same
variables wrote:

1. `I18N_UI_DIR` when it is set;
2. else `<I18N_DIR>/ui` when `I18N_DIR` is set (a scratch or fixture run keeps its UI strings
   beside its Markdown and never writes into `site/`);
3. else `site/src/i18n/ui.<lang>.json`, the committed location: the Translations workflow runs with
   neither variable, so its pull requests add the files here.

## Translated Markdown

The translated Markdown lives in `I18N_DIR` (default `<repo>/i18n`): `<lang>/bok/<chapter-id>.md`,
`<lang>/patterns/<slug>.md` and `<lang>/THESIS.md` (fr, de, pt; `/es/thesis` is the hand translation
`THESIS.es.md`). The frontmatter contract is in `src/content.config.ts`; the routes, anchors and
links are built by `src/lib/i18n-content.ts`, `src/lib/i18n-pages.ts` and `src/lib/rehype-i18n.ts`.

To try it without any API call, with the small fixture or with a mock run of the whole pipeline
(pseudo-translations of every chapter, pattern and Thesis, and the UI strings in `<I18N_DIR>/ui`):

```sh
node tests/fixtures/i18n/generate.mjs ../../aige-i18n-fixture
I18N_DIR=../../aige-i18n-fixture npm run build
I18N_DIR=../../aige-i18n-fixture npx playwright test tests/i18n.spec.ts

# or, from the repository root: the full mock pass, then the same build and tests
I18N_DIR=/tmp/i18n-mock node tools/i18n/translate.mjs --mock
```
