# Proposal

## Why

La página `/resources/frontier-safety-crosswalk` solo ofrece la matriz de chips: para ver dónde un
lab trata una dimensión a fondo y dónde apenas la roza hay que abrir celda por celda. El dataset ya
gradúa cada referencia (`core` / `related`) y documenta los huecos, así que un mapa de cobertura
visual e interactivo puede dar esa lectura de un vistazo sin redactar ni verificar contenido nuevo.

## What Changes

- Sección nueva "Coverage at a glance" entre "How to read this" y la matriz: rejilla 13 dimensiones ×
  5 fuentes donde cada celda se sombrea por profundidad de cobertura (solo `related`, 1, 2 o 3+
  referencias `core`, hueco documentado), con patrón además de color, leyenda, columna de consenso
  (cuántas fuentes tratan la fila como tema principal) y totales por columna.
- Cada celda es un enlace a `#topic-<id>`: sin JavaScript salta al artículo; con JavaScript abre el
  drawer existente con la columna resaltada.
- Lentes (JavaScript, mejora progresiva): "All", "Labs vs standards" (marca filas donde los tres labs
  tienen cobertura principal y un estándar no, y al revés) y "Gaps only". La lente vive en el
  fragmento de la URL para poder compartir la vista.
- Resaltado de fila y columna al pasar el ratón o enfocar una celda.
- Sin cambios en el dataset, los exports ni la matriz.

## Capabilities

### New Capabilities

### Modified Capabilities
- `frontier-safety-crosswalk`: la página añade la sección del mapa de cobertura (cambia el orden de
  secciones del requisito "Página del crosswalk de frontera") y un requisito nuevo "Mapa de
  cobertura" con su comportamiento sin JS, lentes, drawer, accesibilidad y 390 px.

## Impact

- `site/src/pages/resources/frontier-safety-crosswalk.astro` (sección nueva y script).
- Nuevos: `site/src/lib/coverage.ts` (cálculo puro), `site/src/components/CoverageMap.astro`,
  `site/src/styles/coverage-map.css`, `site/public/coverage-map.js` (same-origin, CSP intacta).
- Reutiliza `public/crosswalk.js` (drawer vía `data-cw-open` / `data-cw-col`) sin modificarlo.
- Tests: `site/tests/frontier-crosswalk.spec.ts`. Las capturas visuales existentes de la página, si
  las hay, pueden cambiar.
- Sin dependencias nuevas.
