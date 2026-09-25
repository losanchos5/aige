# Site languages and UI strings

The site renders machine translations of the Body of Knowledge, the pattern pages and the Thesis
(openspec/changes/i18n-site-rendering). English is the reference and keeps its unprefixed URLs;
every other language lives under `/<lang>/` and only where a translation exists.

| File | What it is | Who writes it |
| --- | --- | --- |
| `locales.ts` | The locales (`en` default, `es`, `fr`, `de`, `pt`), their own names, Open Graph and Intl tags | developers |
| `ui.en.json` | Every string of the site chrome, as a flat `key -> string` map | developers |
| `ui.<lang>.json` | The same keys, translated | the translation pipeline |
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

The translated Markdown lives in `I18N_DIR` (default `<repo>/i18n`): `<lang>/bok/<chapter-id>.md`,
`<lang>/patterns/<slug>.md` and `<lang>/THESIS.md` (fr, de, pt; `/es/thesis` is the hand translation
`THESIS.es.md`). The frontmatter contract is in `src/content.config.ts`; the routes, anchors and
links are built by `src/lib/i18n-content.ts`, `src/lib/i18n-pages.ts` and `src/lib/rehype-i18n.ts`.

To try it without any API call:

```sh
node tests/fixtures/i18n/generate.mjs ../../aige-i18n-fixture
I18N_DIR=../../aige-i18n-fixture I18N_UI_DIR=../../aige-i18n-fixture/ui npm run build
I18N_DIR=../../aige-i18n-fixture I18N_UI_DIR=../../aige-i18n-fixture/ui npx playwright test tests/i18n.spec.ts
```
