# Proposal

## Why

Los tres labs frontier publican su propia política de seguridad (Anthropic RSP, OpenAI Preparedness
Framework, Google DeepMind Frontier Safety Framework), pero no existe un mapa neutral y citado que
diga, dimensión por dimensión, qué sección de cada una trata lo mismo y dónde encaja eso en NIST AI
RMF e ISO/IEC 42001. Es el artefacto insignia del roadmap de crecimiento (30-120 días, KPI "publicado
web + dataset; 1 cita externa") y la reading list del sitio ya tiene las tres versiones verificadas
como punto de partida.

## What Changes

- Página nueva `/resources/frontier-safety-crosswalk` (EN): hero con franja de versiones vigentes,
  "How to read this", matriz de dimensiones × 5 columnas (RSP, PF, FSF, NIST AI RMF, ISO/IEC 42001)
  reutilizando `CrosswalkMatrix` y el drawer, un artículo por dimensión `#topic-<id>`, "Three
  readings", "Limits and method", fuentes `[n]`, descargas y "How to cite".
- Dataset tipado `site/src/data/frontier-crosswalk.ts` (as-of 2026-09-30, schema 1) con documentos,
  dimensiones (13 en v1), columnas, referencias de sección con URL y cita literal opcional ≤25
  palabras, huecos documentados, invariantes (`frontierProblems()`) y fuentes.
- Exports `/resources/frontier-safety-crosswalk.json` y `.csv` con `notice` y `schemaVersion` 1;
  JSON-LD `Dataset` con `DataDownload` y `BreadcrumbList`; OG card propia.
- `CrosswalkMatrix` acepta un grupo de columnas `labs` y puede omitir el selector de columnas (en la
  página nueva todas las columnas se ven siempre y no heredan la elección guardada del crosswalk
  general).
- Cableado: nav (reference), índice de recursos, tile en la portada, enlace desde `/frontier` sin
  nombrar labs, una frase en los capítulos 08 y 10, cinco entradas de glosario, `llms.txt`,
  `SOURCE_BY_PATH`, lhci y los specs de SEO y smoke.
- Los tres marcos de labs NO entran en `frameworks.ts`: los tests del registro exigen filas de
  obligación y familia en el mapa para cada instrumento, y no se inventan obligaciones. Quedan locales
  al dataset nuevo (fleco para una iteración futura). La API `/api/v1/` tampoco se toca en v1 (requiere
  esquema, índice y OpenAPI, no es una línea).

## Capabilities

### New Capabilities
- `frontier-safety-crosswalk`: página, dataset, exports, invariantes y cableado del crosswalk de marcos
  de seguridad de frontera.

### Modified Capabilities
- `home-positioning`: un tile más en la portada hacia el crosswalk de frontera, tras el del Crosswalk.

## Impact

- Nuevo: `site/src/data/frontier-crosswalk.ts`,
  `site/src/pages/resources/frontier-safety-crosswalk.astro`, `.json.ts`, `.csv.ts`,
  `site/tests/frontier-crosswalk.spec.ts`.
- Modificado: `site/src/components/CrosswalkMatrix.astro`, `site/src/data/crosswalk.ts` (tipo
  `ColumnGroup`), `site/src/data/nav.ts`, `site/src/pages/resources/index.astro`,
  `site/src/pages/index.astro`, `site/src/data/frontier.ts`, `site/src/lib/og-cards.ts`,
  `site/src/pages/llms.txt.ts`, `site/astro.config.ts`, `site/lighthouserc.cjs`,
  `site/tests/seo-schema.spec.ts`, `site/tests/smoke.spec.ts`, `bok/08-regulatory-map.md`,
  `bok/10-reading-list.md`, `bok/09-glossary.md` (y `sources/SOURCES.md` si cambia una versión).
- Sin dependencias nuevas. Conflictos previsibles con el hito paralelo `ai-act-deadlines` solo en
  arrays de registro compartidos (unión en el rebase).
