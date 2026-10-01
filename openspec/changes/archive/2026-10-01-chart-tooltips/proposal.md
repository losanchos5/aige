# Proposal

## Why

Hoy el nombre de cada marca de un gráfico (un control, un daño, una amenaza, una tesela, un punto) solo
se lee con el `<title>` nativo del SVG o el atributo `title` de HTML: aparece con retraso, hay que
dejar el ratón quieto, con teclado no sale y en móvil no sale nunca. Además varias marcas no tienen
nombre (anillos de progreso, círculos del Venn, cuadros de la mariposa de comparativas, celdas del
mapa de calor AIGP) o lo tienen pobre (solo un código, un estado o un número). Sin eso el lector no
sabe qué es cada cosa.

## What Changes

- **Isla cliente compartida** `site/public/chart-tip.js` (sin dependencias, ≤4 KB gzip como objetivo,
  15 KB como techo): un único tooltip que enseña al instante el nombre de la marca al pasar el ratón,
  al enfocarla con teclado y al tocarla en móvil (primer toque enseña, segundo toque sigue el enlace).
  Cumple WCAG 1.4.13 (Esc lo cierra, se puede pasar el ratón por encima, persiste mientras dura el
  hover o el foco), nunca sale del viewport (también a 320 px), respeta claro/oscuro, forced-colors,
  print y `prefers-reduced-motion`. Se carga una sola vez por página, solo en páginas con gráficos.
- **El texto del tooltip es el nombre accesible de la marca**, sin texto nuevo: sale de `data-tip`,
  `aria-label`, el `<title>` hijo o el atributo `title`, en ese orden. Así no hay que duplicar
  `data-tip` en cada marca SVG (presupuesto de 12 KB) y el lector de pantalla no lo oye dos veces.
- **Nombres útiles en todas las marcas**: el kit nombra las marcas que hoy no tienen nombre
  (`progressRing`, conjuntos del Venn, bandas de anillos, fila «+N» del radial, pasos de la escalera con
  su detalle) y los enlaces de fila (`linkText`) pasan a llevar el mismo nombre rico que la marca. Las
  páginas con nombres pobres los completan desde sus módulos de datos (lista concreta en tasks.md:
  mapa de amenazas, EvalBoundary, `/frontier`, Sankeys de riesgo y de `/agents`, policy-card,
  PathRings, LayerMatrix, ComparisonButterfly, mapa de calor AIGP).
- **Rejillas HTML de gráficos** (ControlMosaic, ControlLanes, ControlsCrosswalkIndex, CoverageMap,
  CrosswalkMatrix, LayerMatrix, ObligationMatrix, ObligationIsotype, ControlCoverage,
  ComparisonButterfly) quedan cubiertas por la misma isla.
- **Toques en marcas pequeñas**: en táctil, un toque que cae entre marcas selecciona la más cercana
  dentro de 12 px; los contratos de 24 px del kit no cambian.
- Sin JavaScript todo queda como hoy: `<title>` nativo y tabla alternativa.

## Capabilities

### New Capabilities
- `chart-tooltips`: el tooltip instantáneo de los gráficos (qué elementos cubre, de dónde sale su
  texto, cómo se abre y se cierra con ratón, teclado y toque, posición y accesibilidad).

### Modified Capabilities
- `chart-primitives`: toda marca de datos del kit lleva un nombre que dice qué es (no solo un estado o
  un número), los enlaces de fila llevan el mismo nombre que su marca, y `Chart.astro` carga la isla
  del tooltip una vez por página.

## Impact

- Código: `site/public/chart-tip.js` (nuevo), `site/src/components/ChartTipScript.astro` (nuevo, carga
  única por página), `site/src/styles/chart.css` (estilos del tooltip), `site/src/components/Chart.astro`,
  `site/src/lib/charts/{core,rings,venn,ladder,radial,bars,heatgrid,lanes,sankey,spine}.ts`, las diez
  rejillas HTML listadas, `site/src/lib/aigp-heatmap.ts`, y las páginas y módulos con nombres pobres.
  Las islas con clic propio (`crosswalk.js`, `matrix.js`, `coverage-map.js`) no cambian: la isla no
  retiene su primer toque (ver design.md).
- Tests: un spec de navegador por contrato (`tests/chart-tip.spec.ts`) sobre una muestra de rutas y
  gráficos, y casos de kit en `tests/chart-primitives.spec.ts` para las marcas que hoy no tienen nombre.
  Puerta `test-audit`.
- Sin dependencias npm nuevas, sin `<script>` inline, sin cambios de CSP. `perf.spec.ts` no limita
  scripts; los estilos van en `chart.css`, que no abre reglas `.figc`, `.prose` ni `.diagram`.
- Fuera de alcance: los diagramas archify (ya tienen su panel de nota al pasar y enfocar), las figuras
  dibujadas a mano de `src/figures/*.svg` y los diagramas interactivos con panel propio
  (GovernanceLoop, StackFlow, StackDiagram, PathMap), cuyos elementos ya imprimen su nombre visible.
