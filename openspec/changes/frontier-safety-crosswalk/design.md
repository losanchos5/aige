# Design

## Context

El crosswalk general (`site/src/data/crosswalk.ts`, `/resources/crosswalk`) ya resuelve la matriz tema ×
columna con `CrosswalkMatrix.astro` (acepta `matrix` como prop), `CrosswalkDrawer.astro` y
`public/crosswalk.js`, que clona el `<article id="topic-<id>">` en el drawer. Sus columnas resuelven
marcos con `frameworkById` sobre `frameworks.ts`. Los tests del registro (`data.spec.ts`,
`map.spec.ts`) exigen que cada marco de `frameworks.ts` tenga columna en el crosswalk general, filas de
obligación (salvo excepciones fijadas) y familia en el mapa.

## Goals / Non-Goals

**Goals:** reutilizar matriz, drawer y script sin forks; dataset tipado con invariantes que rompan el
build o los tests; exports con la misma forma de sobre que el crosswalk general.

**Non-Goals:** entrada en `frameworks.ts`, API `/api/v1/`, MCP, OSCAL, system cards, comparación
valorativa entre labs, traducción ES.

## Decisions

- **Documentos de labs locales al dataset.** `frontier-crosswalk.ts` define objetos con forma
  `Framework` (`type: 'framework'`) para RSP, PF y FSF, y resuelve NIST e ISO con `frameworkById`.
  Alternativa descartada: añadirlos a `frameworks.ts`, que obligaría a inventar filas de obligación y
  familias del mapa.
- **Forma de matriz idéntica a `topicMatrix()`** (`{columns: (CrosswalkColumn & {fws})[], rows:
  {topic, cells}[]}`), con las dimensiones como `Topic`. Así `CrosswalkMatrix` se reutiliza sin
  cambios de forma.
- **`CrosswalkMatrix` gana dos props opcionales**: `chooser` (por defecto `true`; `false` no
  renderiza el selector, y `crosswalk.js` ya omite el bloque cuando no hay `[data-cw-cols]`, así que
  no se hereda `aige.crosswalk.columns.v2`) y `caption` (texto de la figcaption y etiqueta de la
  región). `ColumnGroup` suma `labs` y el array `groups` del componente su etiqueta.
- **Refs de lab con `ref` = numeración propia o `p. N`**, `title` literal, `url` con `#page=N`,
  `quote` ≤25 palabras opcional y `note`. Los huecos (`gaps[]`) son datos, no celdas vacías sin
  explicación: el artículo de la dimensión los muestra.
- **Invariantes** en `frontierProblems()` (fuentes citadas y usadas, marcos resueltos, cobertura o
  hueco por dimensión y columna de lab, urls https, citas ≤25 palabras, `verified:false` con nota,
  ids NIST en `nist-ai-rmf.ts`, ids ISO ⊆ los del crosswalk general); la página lanza en build si no
  está vacía y el spec lo comprueba.
- **Contenido redactado en el sitio a partir de la investigación** de `handoffs/labs-refs-*.json`,
  revisado por un fact-check independiente (re-descarga).

## Risks / Trade-offs

- [Deriva de versiones de las políticas] → `FRONTIER_CROSSWALK_AS_OF`, versión y fecha efectiva en la
  franja, "Limits and method" explica cómo se actualiza.
- [Lectura valorativa entre labs] → notas neutrales, sin superlativos; el mapeo es de cobertura.
- [Conflictos con el hito paralelo] → entradas insertadas tras "Crosswalk" en los arrays compartidos;
  rebase con unión.
- [Citas no literales] → fact-check re-descarga y compara cada `quote`; si no casa, se quita.

## Migration Plan

Página y ficheros nuevos; sin migración. Rollback: revertir el merge.
