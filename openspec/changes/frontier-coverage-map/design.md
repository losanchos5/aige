# Design

## Context

Ver proposal.md (Why). Lo que condiciona el enfoque:

- El dataset (`site/src/data/frontier-crosswalk.ts`) tiene 13 dimensiones, 5 columnas (`rsp`, `pf`,
  `fsf` con `group: 'labs'`; `nist` con `group: 'codes'`; `iso` con `group: 'standards'`), 143
  referencias `core`/`related` y 4 huecos (`security×iso`, `external-review×iso`, `regulatory×pf`,
  `regulatory×iso`). Solo los huecos de labs son obligatorios: una celda NIST/ISO podría quedar vacía
  sin hueco (hoy no ocurre).
- Con solo 4 huecos de 65 celdas, un mapa "cubierto / hueco" sería casi uniforme. Lo que varía es la
  profundidad: celdas solo `related` (10) frente a 1, 2 o 3 referencias `core`.
- `public/crosswalk.js` delega en `document` los clics sobre `[data-cw-open]` y resalta en el drawer
  las referencias de la columna `data-cw-col`: cualquier enlace con esos atributos abre el drawer.
- CSP `script-src 'self'`: nada de JS inline. Regla del sitio: nunca atenuar texto con `opacity`
  (axe mezcla opacidades fraccionarias); prohibidas las rayas largas en todo el texto.
- "How to read this" ya fija el vocabulario: chip sólido = sección principalmente sobre la fila; chip
  discontinuo = la toca.

## Goals / Non-Goals

**Goals:**
- Lectura de profundidad de un vistazo, coherente con el vocabulario sólido/discontinuo de la matriz.
- Funciona completo sin JS; el JS solo añade lentes, fragmento y cruceta de columna.
- Cálculo reutilizable para el crosswalk general más adelante.

**Non-Goals:**
- No se toca el dataset, los exports, `CrosswalkMatrix` ni `crosswalk.js`.
- No se añade el mapa a `/resources/crosswalk` en este cambio.
- No se interpreta qué documento "va más lejos": las lentes describen cobertura, no calidad.

## Decisions

1. **Estados y codificación.** Por celda: `gap` (hay `FrontierGap`), `related` (refs, ninguna core),
   `core` con nivel 1, 2 o 3+ (número de refs core), `none` (sin refs ni hueco). Visual: `core` =
   relleno sólido de un solo tono (`--l1-ink` mezclado con `--bg` en tres intensidades) con el número
   core visible; `related` = relleno muy claro con borde discontinuo (eco del chip discontinuo);
   `gap` = borde punteado y "Gap"; `none` = celda vacía con "None". El texto de cada celda cambia a
   `--bg` sobre los niveles oscuros para mantener AA. Alternativa descartada: intensidad por total de
   refs (mezcla core y related y contradice la leyenda de la matriz).
2. **Consenso = columnas con al menos una ref core** (0-5), pintado como 5 marcas llenas/vacías más
   texto "3 of 5". Los totales de columna cuentan dimensiones con alguna ref (core o related), p. ej.
   "12/13", y aparte las core.
3. **Cálculo puro en `site/src/lib/coverage.ts`**: `computeCoverage({ topics, columns, refs, gaps })`
   devuelve filas con celdas `{ col, state, core, related, gapNote }`, `consensus`, y columnas con
   totales; además `divergence` por fila: `labs-over-standards` (las columnas `labs` tienen core y
   alguna columna no-labs no) y `standards-over-labs` (alguna no-labs tiene core y alguna labs no).
   Se ejecuta en build desde el componente; tipos genéricos sobre `Topic`/`CrosswalkColumn`/
   `CrosswalkRef` de `crosswalk.ts`.
4. **Markup: rejilla CSS de enlaces**, no `<table>`: cada celda es
   `<a href="#topic-<id>" data-cw-open="<id>" data-cw-col="<col>" aria-label="...">`. Sin
   `role="grid"` (es navegación por enlaces con Tab, no un widget de flechas): una lista por fila con
   encabezados de columna visibles y `aria-label` completos ("Thresholds, OpenAI Preparedness: 2 core, 0 related").
   Alternativa descartada: `<table>` con celdas enlace (duplicaría la semántica de la matriz y a 390
   px obliga a scroll).
5. **Lentes con radios nativos** dentro de un `<fieldset hidden>` que el JS muestra. El JS pone
   `data-lens` en el contenedor; el CSS resalta (contorno y fondo) las celdas o filas afectadas y
   pasa el resto a un tono neutro con color, nunca con opacidad. Fragmento `#coverage?lens=gaps`
   (misma idea que `#explore?...` del explorer); valores desconocidos caen en `all`.
6. **Cruceta**: fila con `:has(:hover, :focus-visible)` en CSS; columna con `data-hover-col` en el
   contenedor puesto por el JS en `pointerover`/`focusin`.
7. **Responsive**: rejilla `minmax(7rem, 1.4fr) repeat(5, minmax(2.5rem, 1fr))`; a < 640 px las
   etiquetas de columna pasan a las abreviaturas `RSP`, `PF`, `FSF`, `NIST`, `ISO` y el consenso baja
   bajo la etiqueta de fila.

## Risks / Trade-offs

- [El número core se lee como puntuación] → subtítulo y leyenda: "Number = sections mainly about the
  row. More sections is not better coverage."
- [La lente "Labs vs standards" sugiere juicio] → etiquetas neutras: "Main coverage in all three labs,
  not in a standard" / "Main coverage in a standard, not in every lab".
- [Contraste en oscuro de los niveles intermedios] → validar con axe en ambos temas y con la
  herramienta de la skill `dataviz`.
- [Capturas visuales existentes de la página cambian] → regenerarlas en la worktree y decirlo en el
  PR; no baselines nuevos.

## Migration Plan

Sin migración: cambio aditivo en una página estática. Rollback = revertir el PR.
