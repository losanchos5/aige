# Tasks

Worktree `D:/Documents/aige-wt/dpia` (rama `feat/dpia-lists-aiverify-imda`, desde `origin/main`).
Los datos de investigación llegan en `D:/Documents/aige-wt/handoffs/` (`dpia-lists.json`,
`dpia-ai-act-text.md`, `dpia-findings.md`, `aiverify-crosswalk-cells.json`,
`imda-agentic-mapping.json`).

## 1. Listas nacionales de DPIA

- [x] 1.1 Crear `site/src/data/dpia-lists.ts` (tipos, 18 listas, ítems, áreas del anexo III, fuentes, recuentos derivados).
- [x] 1.2 Crear `site/src/pages/resources/dpia-lists.astro` y `site/src/styles/dpia-lists.css` (introducción, tabla, hallazgos, fuentes, crédito, JSON-LD `Dataset`).
- [x] 1.3 Añadir el conjunto `dpia-lists` al registro de `site/src/lib/api.ts` con `contributors` y `reviewers`.
- [x] 1.4 Añadir `/resources/dpia-lists` a `SOURCE_BY_PATH` (`site/astro.config.ts`) y a `site/src/pages/llms.txt.ts`.
- [x] 1.5 Enlazar desde `/toolkit/impact-assessment` y desde la línea de referencias cruzadas de `/resources/crosswalk`.

## 2. Columna AI Verify

- [x] 2.1 Añadir el instrumento `sg-ai-verify` y la columna `aiverify` en `site/src/data/crosswalk.ts`.
- [x] 2.2 Cargar las celdas respaldadas por los crosswalks oficiales, con URL y nota.

## 3. IMDA Agentic AI como fuente

- [x] 3.1 Citar el IMDA v1.5 con página en los patrones Agent Registry, Agent Identity & Scoped Credentials y Human-in-the-loop Gate.
- [x] 3.2 Añadir el IMDA a las referencias y `mappings.other` de los controles que el mapeo respalda.

## 4. Fuentes, changelog y pruebas

- [x] 4.1 Añadir las fuentes nuevas a `sources/SOURCES.md`.
- [x] 4.2 Entrada en `bok/CHANGELOG.md` (alimenta `/about/changelog` y el RSS).
- [x] 4.3 Crear `site/tests/dpia-lists.spec.ts` (datos, página construida, API).
- [x] 4.4 `npm run build` y `npm test` en verde (fallos previos documentados contra `origin/main`).
- [x] 4.5 `openspec validate dpia-lists-aiverify-imda --strict`.
- [x] 4.6 Commit por ruta, push, PR contra `main` y CI en verde.
