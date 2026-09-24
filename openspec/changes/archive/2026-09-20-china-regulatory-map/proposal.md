# Proposal

## Why

El mapa regulatorio del Body of Knowledge (`bok/08-regulatory-map.md`) y el catálogo de marcos del
sitio (`site/src/data/frameworks.ts`) cubren UE, EE. UU., Corea, Singapur y Reino Unido, pero China
no aparece en ninguna parte del repo, pese a ser el hueco que registran los borradores de issue 01 y
03 y `PENDIENTE.md` (línea 67). El TC260 publicó el 2026-09-14 el «AI Safety Governance Framework
3.0», cuyo Apéndice 2 es un marco de gestión de riesgos de agentes que encaja directamente con las
capas 2–5 de la tesis; es el momento de cerrar el hueco con fuentes oficiales verificadas.

## What Changes

- Nueva subsección `### China` en `## Other jurisdictions` de `bok/08-regulatory-map.md`: prosa que
  separa las normas vinculantes (CAC y co-emisores, 2022–2025; GB 45438-2025 obligatoria) de la guía
  voluntaria (GB/T 45654-2025; TC260 Framework 3.0), tabla de 7 filas obligación → artefacto → capa
  con estado fechado (as of 2026-09-20), tabla de cruce agéntico TC260 Apéndice 2 × OWASP Agentic
  Top 10 × NIST AI Agent Standards, y cierre «Mappings are illustrative, not a claim of conformity».
- Nuevo bullet en `## What is NOT harmonised yet`: el marco chino no referencia ISO/IEC 42001,
  ISO/IEC 23894, NIST AI RMF ni el AI Act (confirmado en el PDF).
- Citas nuevas [41]–[51] en el cap. 08 y filas espejo en `sources/SOURCES.md` (10 `primary`, 1
  `reported`).
- Siete entradas nuevas en `bok/10-reading-list.md` («Regulation and standards»): cinco chinas, Corea
  y Singapur (estas dos reutilizan las filas [34] y [39] ya verificadas).
- Dos términos nuevos en `bok/09-glossary.md`: CAC y TC260, con cita y fila en SOURCES.md.
- `site/src/data/frameworks.ts`: seis entradas en `frameworks[]` (ids `cn-algo-recommendation`,
  `cn-deep-synthesis`, `cn-genai-measures`, `cn-content-labelling`, `cn-gbt-45654`,
  `cn-tc260-framework`) y siete filas en `obligations[]` bajo el grupo `China` con anchor `china`.
- `site/src/components/ObligationMatrix.astro`: ramas nuevas en `resolveFwId` y `bandOf` (banda
  Asia-Pacific); `site/tests/v3.spec.ts` replica la rama de `resolveFwId` (es el oráculo del test).
- Baselines visuales regeneradas solo para `frameworks`, `reading-list` y `glossary`.
- `bok/CHANGELOG.md` con entrada; issue drafts 01 y 03 retirados; `PENDIENTE.md` sin la nota de
  China.
- Fuera de alcance (documentado en `brief.md` §2): GB/T 45958-2025, TC260-TR-005-2026, «AI Plus»,
  borrador sobre menores, linaje TC260-003, THESIS.md (sin cambios de versión).

## Capabilities

### New Capabilities
- `regulatory-map-china`: China en el mapa regulatorio, filas vinculantes y voluntarias con estado
  fechado y cita verificada, catálogo del sitio con grupo China resuelto en la matriz de obligaciones,
  cruce del Apéndice 2 con las fuentes agénticas existentes, lecturas y glosario.

### Modified Capabilities
<!-- Ninguna: el repo no tenía specs OpenSpec previas. -->

## Impact

- Contenido: `bok/08-regulatory-map.md`, `bok/09-glossary.md`, `bok/10-reading-list.md`,
  `bok/CHANGELOG.md`, `sources/SOURCES.md`, `.github/ISSUE_DRAFTS/01…`, `03…`, `PENDIENTE.md`.
- Sitio: `site/src/data/frameworks.ts`, `site/src/components/ObligationMatrix.astro`,
  `site/tests/v3.spec.ts`, baselines en `site/tests/__screenshots__/{E,G}/`.
- Sin cambios en THESIS, esquemas de datos, dependencias ni CSP. Los exports `obligations.csv/json`
  y la página `/resources/frameworks` reflejan las filas nuevas automáticamente.
- Coordinación: otra sesión (`governance-theme-crosswalk`) consume los seis ids y el anchor `china`;
  no toca los ficheros de esta change (ver `brief.md` §5bis).
