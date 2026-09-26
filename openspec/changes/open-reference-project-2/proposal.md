# Proposal

## Why

La primera iteración (PR #39, main 970a4a0) publicó dos perfiles de control en borrador: Evaluation
Environment v0.1 (3 controles `specified`, 6 `stub`) y Agent Runtime v0.1 (31 `derived`). El
catálogo todavía no es un modelo de control usable ni citable: cubre solo dos superficies, dos
tercios del perfil de entorno de evaluación son esbozos, no hay forma de navegar los controles desde
un marco (EU AI Act, ISO/IEC 42001, NIST AI RMF, OWASP, ATLAS, AIUC-1), ningún control tiene URL
propia y ninguna versión de perfil tiene DOI. Las fuentes ya reunidas en la iteración 1 (informes de
OpenAI, Anthropic, METR, AIUC-1) permiten profundizar el perfil de evaluación sin investigación
nueva, y el material existente del sitio (patrones, esquemas de registro, capítulos, registro de
obligaciones) permite derivar tres perfiles más sin inventar requisitos.

## What Changes

- **Perfil Evaluation Environment v0.2**: se promueven a `specified` los controles 001, 004, 005,
  007, 008 y 009 que las fuentes ya reunidas sostengan (2 a 4 pasos de verificación repetibles por un
  tercero, evidencia con esquema existente, notas de implementación a nivel de configuración,
  `observation` y dos observaciones de ejemplo pass/fail). Lo que no se pueda sostener sigue `stub`
  y se dice. Changelog v0.2; revisores vacíos salvo revisión acreditada en `bok/CONTRIBUTORS.md`.
- **Tres perfiles derivados v0.1**: `data-admission-and-privacy` (`AIGE-CTL-DATA-NNN`, 8-12),
  `deployment-and-monitoring` (`AIGE-CTL-DEPLOY-NNN`, 10-15) y `assurance-and-evidence`
  (`AIGE-CTL-ASSURE-NNN`, 8-12), cada control trazado a los patrones o esquemas del sitio que
  reformula (campo `derivedFrom` validado), con capa, mapeos solo a ids existentes y referencias
  reutilizadas de `SOURCES.md`. El registro pasa a cinco perfiles y 70 o más controles.
- **`/controls/crosswalk`**: página estática generada desde los `mappings` (una tabla por marco,
  cláusula → controles, más la vista inversa por perfil), con export JSON en `/api/v1/` y twin
  Markdown; cada celda ilustrativa, nunca "compliant" ni "certified".
- **Páginas por control** `/controls/<perfil>/<id-en-minúsculas>` solo para controles `specified`:
  registro completo, casos, patrones, obligaciones, amenazas, dos observaciones de ejemplo
  descargables, cita con la versión del perfil, JSON, twin `.md` y `TechArticle` con `isPartOf`.
  **BREAKING (spec)**: se levanta la prohibición de páginas HTML por control de la v0.1; las anclas
  del perfil se mantienen y enlazan a la página.
- **DOI por versión de perfil**: `doi?` y `conceptDoi?` en `ControlProfile`, mostrados en cita,
  procedencia, sobre JSON y front matter del twin; script `site/scripts/profile-release.mjs` que
  arma el paquete de publicación y los metadatos de Zenodo (API REST con token por variable de
  entorno, sandbox o dry-run). Ningún DOI real se acuña sin el visto bueno explícito de Jordi.
- **Mantenimiento** de la revisión de la iteración 1: `dateModified` y `lastmod` de perfiles desde
  `profile.updated`; recuentos de tests, slugs de `llms.txt.ts` y `astro.config.ts` y el rango
  "001 to 009" de `frontier.ts` derivados del registro; `personSlug` exportado desde `lib/jsonld.ts`
  y usado en `people.ts`.

Fuera de alcance: grupo nuevo en el nav, afirmaciones de certificación, nombres de revisores sin
revisión acreditada, observaciones presentadas como salida de un adaptador real, traducciones, hero,
menú móvil, Thesis, markdown de capítulos, URLs existentes, locales ocultos, mapeos a terceros no
leídos en su página pública.

## Capabilities

### New Capabilities
- `controls-crosswalk`: página `/controls/crosswalk`, su JSON y su twin, generados desde los mapeos
  del registro de controles.
- `control-pages`: una página por control `specified` con su twin, metadatos y enlaces desde el
  perfil.
- `profile-releases`: DOI opcional por versión de perfil y script de publicación en Zenodo.

### Modified Capabilities
- `control-profiles`: cinco perfiles; recuentos derivados del registro; campo `derivedFrom`;
  perfil de evaluación v0.2 con más controles `specified`; se permiten páginas por control
  `specified`; fechas de modificación desde el contenido.

## Impact

- Datos: `site/src/data/controls/*.ts` (3 ficheros nuevos, 2 modificados), `frontier.ts`,
  `people.ts`, `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Páginas: `site/src/pages/controls/` (crosswalk, rutas por control y sus twins), componentes
  `ControlRecord`, `Provenance`, cita.
- API: dataset `controls` en `site/src/lib/api.ts` (campos `doi`, `derivedFrom`, crosswalk),
  nuevas rutas por ítem; `public/controls/examples/` (observaciones nuevas).
- Registros compartidos: `astro.config.ts`, `lib/og-cards.ts`, `pages/llms.txt.ts`,
  `public/_headers`, `tests/nav.spec.ts`, `tests/seo-titles.spec.ts`, `lighthouserc.cjs`.
- Scripts: `site/scripts/profile-release.mjs` (nuevo; sin dependencias nuevas).
- MCP: sin cambios de código previstos (lee `/api/v1/controls.json`); el contenedor no se
  redespliega salvo que cambie el servidor.
- Externo: Zenodo (solo con token y autorización explícita en la sesión).
