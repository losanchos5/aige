# Proposal

## Why

Los capítulos 11 a 23 de la v0.5.0 enseñan decenas de obligaciones que el registro de obligaciones
(`site/src/data/frameworks.ts`, espejo del capítulo 08) no tenía: artículos del RGPD, NIS2, DORA, la
CRA, la Directiva de responsabilidad por productos, la Directiva DSM, la DSA, la UCPD, la Directiva
de trabajo en plataformas, la Directiva de crédito al consumo, los artículos de la Ley básica de IA
de Corea, las leyes estatales de EE. UU. para el sector privado, el derecho federal que ya alcanza a
la IA, los instrumentos internacionales y varios artículos de la Ley de IA de la UE (entre ellos el
86 y el 26(11)). Los handoffs de esos capítulos proponían 139 filas, muchas duplicadas y ancladas
fuera del capítulo 08, lo que rompía la prueba de anclas y la página de cada obligación, que lee su
sección de origen en el capítulo 08. Además, varias filas del capítulo 08 arrastraban correcciones
pendientes (fechas del art. 4, Corea, Colorado, la fila CSA "Agentic Control Supplement" sin fuente
primaria y los nombres oficiales de OWASP ASI).

## What Changes

- **110 filas nuevas** en `frameworks.ts` (de 68 a 178), deduplicadas y verificadas en línea a
  2026-09-24, con id estable, cláusula, requisito, artefacto, capas, sujeto obligado (`dutyHolder` en
  las filas de la Ley de IA, `scope` en las demás), autoridad, `appliesFrom`/`appliesStatus`/
  `appliesNote`, hitos, `systemClass` en las filas de la Ley de IA y `patterns` solo donde la línea
  "Maps to" de un patrón nombra la cláusula.
- **45 instrumentos nuevos** en `frameworks` (de 31 a 76), incluidos los ocho que solo existían en
  `crosswalkInstruments` (mismos ids, `frameworks.ts` gana).
- **Capítulo 08**: las filas viven en sus tablas, así que el esquema v2 no cambia y cada ancla sigue
  siendo un encabezado del capítulo 08. Se añaden la sección H2 "Data protection and other EU law"
  (H3 "The GDPR", "Cyber-security and incident-reporting law", "Liability, copyright, consumer and
  sector law") y las H3 "State privacy and sector laws", "Federal law that already reaches AI",
  "South Korea, article by article" y "Treaty and international soft law", más tablas bajo "United
  Kingdom" y "What is NOT harmonised yet". Ningún encabezado existente se renombra. Fuentes [63] a
  [116] en formato de la casa; [16], [22] y [32] corregidas.
- **Correcciones**: art. 4 aplica desde 2025-02-02 (reformulado el 2026-07-27); Corea con fuente
  primaria en law.go.kr y redacción de periodo de orientación; Colorado descrito por SB 26-189; la
  fila CSA pasa a "Agent controls (AICM v1.1, ATF, AARM)" con la advertencia de que el suplemento no
  tiene fuente primaria; STAR for AI con sus tres niveles; nombres oficiales ASI02, ASI03 y ASI05; la
  URL de `eu-ai-act` sigue siendo el texto consolidado de EUR-Lex (cumple la regla de la casa); las
  filas GPAI (arts. 52 a 55) ganan el hito del 2 de agosto de 2027 del art. 111(3) para los modelos
  comercializados antes del 2 de agosto de 2025.
- **Consumidores**: `ObligationMatrix.astro` une por `frameworkId`; `map.ts` añade la familia "Data
  protection and other EU law" y reparte los ids nuevos; `data.spec.ts`, `v3.spec.ts` y
  `map.spec.ts` se actualizan.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `obligation-register`: cobertura v0.5.0 del registro y espejo con el capítulo 08 (requisitos
  añadidos, sin cambiar el esquema v2).

## Impact

- Código y datos: `site/src/data/frameworks.ts`, `site/src/data/map.ts`,
  `site/src/components/ObligationMatrix.astro`.
- Contenido: `bok/08-regulatory-map.md`, `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Pruebas: `site/tests/data.spec.ts`, `site/tests/v3.spec.ts`, `site/tests/map.spec.ts`.
- Se regeneran en la build el SVG del mapa de la disciplina (una familia más) y las capturas de
  `/resources/frameworks`, `/obligations` y `/map`.
- Fuera de alcance: `crosswalk.ts` (sus `crosswalkInstruments` duplicados pueden borrarse), páginas y
  navegación; van al handoff.
