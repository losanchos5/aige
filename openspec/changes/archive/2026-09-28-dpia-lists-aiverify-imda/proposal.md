# Proposal

## Why

Aurélie Pols (coautora de la Tesis) propuso tres fuentes que el sitio no aprovechaba. Primero, las
listas nacionales del art. 35(4) RGPD: cada autoridad de control publica qué tratamientos exigen
siempre una evaluación de impacto (DPIA), y algunas nombran la IA de forma expresa. El sitio ya
enlaza la plantilla de DPIA del CEPD y el modelo de FRIA de la APDCAT, pero no dice qué listas
nacionales hacen obligatoria una DPIA para un sistema de IA ni cómo se solapan con las áreas del
anexo III de la Ley de IA. Segundo, el AI Verify Testing Framework de Singapur (11 principios), que
publica cuatro crosswalks oficiales (NIST AI RMF, perfil de IA generativa del NIST, Código de
Conducta del Proceso de Hiroshima, ISO/IEC 42001) y encaja como columna del crosswalk de temas.
Tercero, el Model AI Governance Framework for Agentic AI v1.5 del IMDA, con pasajes paginados sobre
identidad y catálogo de agentes y sobre puntos de aprobación humana, que respaldan patrones y
controles ya publicados.

## What Changes

- **Listas nacionales de DPIA** (`/resources/dpia-lists`): nuevo dataset tipado
  `site/src/data/dpia-lists.ts` con las 18 listas del art. 35(4) del registro del CEPD (país,
  autoridad, fecha, enlace, idioma, si nombran IA, decisiones automatizadas, perfilado, biometría,
  vigilancia de empleados o puntuación), los ítems relevantes con su número y un resumen propio, y la
  correspondencia de cada ítem con las áreas del anexo III cuando el solapamiento es claro. Página
  con introducción (art. 35(1), (3) y (4) RGPD, los nueve criterios del WP248 rev.01, arts. 26(9) y
  27(4) de la Ley de IA con el texto consolidado verificado en EUR-Lex), tabla, hallazgos factuales
  con recuentos calculados de los datos, fuentes numeradas y la línea de crédito "Idea: Aurélie Pols
  · Research and data: Jorge García Aibar".
- **API abierta**: dataset `dpia-lists` en el registro de `site/src/lib/api.ts`, con su esquema,
  entrada en `index.json`, `openapi.json` y la tabla de `/resources/data`; licencia CC BY 4.0 del
  sobre común y un campo `contributors` con roles (idea, investigación y datos) y un campo
  `reviewers`, vacío hasta que haya una revisión real.
- **Columna AI Verify** en `/resources/crosswalk`: nuevo instrumento `sg-ai-verify` en
  `frameworks.ts` (y su familia en `map.ts`, como la columna GAO) y columna `aiverify`, con celdas
  solo donde un crosswalk oficial de 2025 cita la comprobación; los cuatro crosswalks oficiales se
  citan como fuentes.
- **IMDA Agentic AI como fuente**: citas paginadas en los 21 patrones con encaje directo o parcial
  (entre ellos Agent Registry, Agent Identity & Scoped Credentials y Human-in-the-loop Gate) y
  referencia cruzada en los 55 controles abiertos que el mapeo respalda
  (`site/src/data/controls/imda-agentic.ts`); fecha normalizada (publicado el 20 de mayo de 2026,
  citado por la actualización del 5 de junio de 2026). El
  término "kill switch" nunca se atribuye al IMDA.
- **Enlaces**: desde `/toolkit/impact-assessment` (sección DPIA) y desde la línea de referencias
  cruzadas de `/resources/crosswalk`; entrada en `llms.txt`; `SOURCE_BY_PATH` para el `lastmod` del sitemap.
- **Registro de fuentes y changelog**: filas nuevas en `sources/SOURCES.md` y entrada en
  `bok/CHANGELOG.md` (que alimenta `/about/changelog` y el RSS).

## Capabilities

### New Capabilities
- `dpia-lists`: el dataset de listas nacionales de DPIA, su página y su exportación por la API.

### Modified Capabilities
- `topic-crosswalk`: nueva columna AI Verify Testing Framework.
- `open-data-api`: nuevo conjunto `dpia-lists` con metadatos de contribución.
- `pattern-pages`: el IMDA Agentic AI v1.5 como fuente paginada de tres patrones.

## Impact

- **Sitio** (`site/`): nuevos `src/data/dpia-lists.ts`, `src/pages/resources/dpia-lists.astro`,
  `src/styles/dpia-lists.css`, `tests/dpia-lists.spec.ts`. Modificados: `src/lib/api.ts`,
  `src/data/crosswalk.ts`, `src/components/CrosswalkMatrix.astro` (comentario de recuento),
  `src/data/controls/*.ts` (referencias IMDA), `src/pages/toolkit/impact-assessment.astro`,
  `src/pages/llms.txt.ts`, `astro.config.ts`.
- **Libro**: `bok/patterns/agent-registry.md`, `bok/patterns/agent-identity-scoped-credentials.md`,
  `bok/patterns/human-in-the-loop-gate.md`, `bok/CHANGELOG.md`, `sources/SOURCES.md`.
- **Fuera de alcance**: navegación principal y tarjetas del hub de Resources (se pueden añadir
  después sin tocar los datos); extracción de las listas del art. 35(5) (listas blancas), de las que
  solo consta el título de la de Francia.
