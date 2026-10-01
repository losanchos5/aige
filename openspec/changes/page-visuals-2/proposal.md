# Proposal

## Why

Las tandas 0 a 2 de `page-visuals` (PR #68, #70, #71) dieron al sitio el kit de gráficos y visuales en
unas 270 páginas, pero las páginas cuya lectura es un flujo (de una capa a otra, de una amenaza a un
patrón), una contención (anillos) o un peso relativo (teselas) siguen siendo listas y tablas. El
catálogo archivado (`openspec/changes/archive/2026-09-30-page-visuals/catalogue.md`, sección «T3»)
las agrupa en la tanda 3, que necesita primitivas nuevas. Además quedan deudas de legibilidad del kit
que conviene cerrar antes de sumar más gráficos estrechos.

Este cambio cubre la tanda 3 (una PR). Las tandas 4 y 5 se proponen después como ampliación de este
mismo cambio, una PR por tanda, tras la aprobación de Jordi.

## What Changes

- **Kit, primitivas nuevas** en `site/src/lib/charts/`: Flow (Sankey y aluvial deterministas de 2 o 3
  columnas, como mucho 9 nodos por columna), Rings (anillos concéntricos con sectores y marcas
  clavadas, anillo de ciclo de vida y anillo de progreso), Treemap (squarified en build, agrupado y
  enlazable) y BookSpine (tira de capítulos agrupada por parte, con variante mini resaltada).
- **Kit, deudas de legibilidad**: la variante estrecha pasa a 280 unidades con texto mínimo de 12,5, y
  Chart.astro rechaza en build cualquier gráfico cuyo texto baje de 12 px a 320 px de pantalla. Una
  sola marca «As of» compartida por las cuatro gráficas temporales. La trama de la mariposa deja de
  significar dos cosas. `jurisdiction-tiles` y `governance-operating-model` sin texto de 11 px a 390.
- **Páginas** (ver `specs/page-visuals/spec.md`): `/controls` (la evidencia sube por el stack),
  `/controls/crosswalk` (perfiles a marcos, índice como mapa de calor, cláusulas más cubiertas),
  `/resources/threats` (catálogo, capa y herramienta; mapa de calor AICM), `/resources/harms` (diana de
  niveles; mecanismo, nivel y capa), `/agents` (AutonomyLadder; amenaza a patrón), `/frontier`
  (EvalBoundary; casos x control; AIUC-1), la nota `/research/the-evaluation-environment-is-part-of-the-system`
  (EvalBoundary), `/toolkit/agent-control-profile` (nivel resaltado en la escalera),
  `/resources/frameworks` (mosaico de instrumentos), `/resources/templates` (anillo de registros; matriz
  registro x instrumento), `/for/aigp` (dónde pesa el examen; dominios a capítulos), `/stack` (qué llena
  cada capa), `/path` (etapa x capa; anillos de progreso), `/bok` (espina del libro), `/figures` (atlas)
  y `/figures/[id]` (dónde aparece, en la espina).
- AutonomyLadder y EvalBoundary van como componentes de página. Su registro en `figures.ts` (con el
  capítulo 23, el permalink y los exportes) queda para la tanda 4.
- Capturas de referencia desfasadas de `/stack` y `/role` regeneradas.

## Capabilities

### New Capabilities
<!-- Ninguna: la tanda amplía las capacidades del cambio page-visuals. -->

### Modified Capabilities
- `chart-primitives`: añade Flow, Rings, Treemap y BookSpine, la regla de legibilidad estrecha a 320 px
  y la marca «As of» compartida.
- `page-visuals`: añade los visuales de la tanda 3 por página, con sus datos de origen y variantes.

## Impact

- Código: `site/src/lib/charts/` (módulos nuevos `sankey.ts`, `rings.ts`, `treemap.ts`, `spine.ts`;
  cambios en `core.ts`, `timeaxis.ts`, `bars.ts`, `index.ts`), `site/src/components/Chart.astro`,
  unos 20 sitios que dibujan la variante estrecha a 340, componentes y páginas de las rutas listadas,
  `public/path.js`, los generadores de `jurisdiction-tiles` y `governance-operating-model`.
- Tests: `tests/chart-primitives.spec.ts` y un spec por familia de páginas (`tests/page-visuals-*.spec.ts`)
  que derivan lo esperado de los módulos de datos; puerta `test-audit`.
- Sin dependencias npm nuevas, sin `<script>` inline, sin cambios de CSP. Ninguna de las rutas está
  vetada por `perf.spec.ts`, así que todo va en modo `figc`.
- Fuera de alcance: `/resources/frontier-safety-crosswalk`, el mapa de cobertura frontera y
  `CrosswalkMatrix` (otro agente); los bloques RECHAZADOS del catálogo.
