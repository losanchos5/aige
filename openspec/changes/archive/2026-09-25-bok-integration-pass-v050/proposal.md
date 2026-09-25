# Proposal

## Why

Los capítulos 11 a 22 se escribieron en paralelo, cada uno en su worktree, y cada bloque dejó un
handoff con lo que tocaba a ficheros compartidos: resúmenes para `chapters.ts`, secciones para
`sources/SOURCES.md`, correcciones al capítulo 08 y enlaces cruzados hacia y desde los demás
capítulos. Sin una pasada de integración el libro queda cosido a medias: los capítulos nuevos
enlazan entre sí solo a nivel de ruta, el capítulo 08 conserva errores que los capítulos 17, 18, 21
y 22 detectaron (el reloj del art. 73, Corea con fuente secundaria, China «no mapeada», el estado de
JTC 21), y varios capítulos antiguos siguen presentando SR 11-7 como guía vigente aunque SR 26-2 la
sustituyó el 17 de abril de 2026.

## What Changes

- **`site/src/data/chapters.ts`**: resumen de una frase (≤160 caracteres, fiel a la entradilla) y
  bloque «at a glance» de cuatro puntos para el capítulo 02 y los capítulos 11 a 22, tomados de los
  handoffs; comentarios de cabecera actualizados. Sin cambios en `part` ni en `order`.
- **`sources/SOURCES.md`**: secciones de los capítulos 12, 13 y 15 a 22 (la del 15 generada desde
  su lista `## Sources`), una parte nueva «Site data pages» con el atlas de daños, los once casos y
  la página de plantillas, y filas nuevas para las fuentes añadidas a los capítulos 01, 02 y 08.
  Se corrigen celdas de «Claim» vacías o truncadas en las filas entregadas.
- **Capítulo 08 (prosa, no las tablas espejo de `frameworks.ts`)**: puntero al capítulo 18 al abrir
  la sección de la UE; lista de dónde se desarrolla cada fila; reloj del art. 73 contado desde el
  conocimiento del incidente, con el deber inmediato al establecer el nexo causal y el deployer
  cuando no localiza al proveedor (art. 26(5)); art. 75(1a) y alcance de los arts. 75a a 75d
  verificados en el texto del Ómnibus; precisiones del Ómnibus sobre los arts. 6 y 25 en prosa;
  Corea con la ley y el decreto en law.go.kr (primarias) y el periodo de orientación; China
  apuntando al capítulo 21 para las medidas de interacción antropomórfica; EE. UU. apuntando al
  capítulo 21; «What is NOT harmonised yet» con los estados de JTC 21 a 2026-09-24; nota de NIST
  AI RMF «being revised». Ningún H2 o H3 renombrado.
- **SR 11-7 → SR 26-2**: capítulos 01 y 02 y `STYLEGUIDE.md` §10 (fuente primaria de la Reserva
  Federal y su anexo, que excluye los modelos generativos y agénticos). La etiqueta de la tabla de
  desambiguación y `map.ts` se mantienen («SR 11-7 style» nombra una tradición). `STYLEGUIDE.md`
  añade la regla «Superseded references».
- **Enlaces cruzados**: se aplican los `cross_links` de los handoffs cuyo `from_file` es de este
  bloque (capítulos 01 a 04, 06 a 08 y 11 a 22) y los enlaces de ruta entre los capítulos 11 a 22
  pasan a anclas de sección, salvo las referencias de orientación a un capítulo entero.
- **Capítulo 04**: «about one in six» pasa a «nearly one in five (18.5%)», como dice su fuente.
- **`bok/CHANGELOG.md`**: viñetas bajo «Unreleased (v0.5.0)».
- **Handoff** `D:/Documents/aige-wt/handoffs/b-bok-maintenance.json`: glosario, obligaciones,
  crosswalk y cambios de filas del capítulo 08 agrupados para los bloques de datos y glosario;
  enlaces cuyo `from_file` pertenece a otros bloques.

## Non-goals

- No se tocan `bok/05`, `bok/09`, `bok/10` ni `bok/23`, ni las tablas del capítulo 08 que espeja
  `frameworks.ts`: sus cambios van al handoff.
- No se re-apuntan en bloque las fuentes de los capítulos 11 a 22 que citan el explorador del AI
  Act con etiqueta `primary`; queda como seguimiento.

## Capabilities

### New Capabilities
- `bok-integration`: coherencia del libro tras añadir capítulos (resúmenes, enlaces profundos,
  tabla consolidada de fuentes y el capítulo 08 como índice inverso al día).

### Modified Capabilities
- `source-integrity`: se añade el requisito de referencias sustituidas.

## Impact

- Ficheros: `site/src/data/chapters.ts`, `sources/SOURCES.md`, `STYLEGUIDE.md`, `bok/01` a `bok/04`,
  `bok/06` a `bok/08`, `bok/11` a `bok/22`, `bok/CHANGELOG.md`.
- Sin rutas nuevas, sin cambios en `astro.config.ts` ni en `_redirects`.
- Tests: ninguno cambia; `data.spec`, `map.spec` y `bok.spec` siguen siendo coherentes (anclas y
  etiquetas intactas; el recuento de «at a glance» sale de `chapters.ts`).
