# Tasks

Worktree `D:/Documents/aige-wt/tips` (rama `wt/tips`, desde origin/main 4ac949c). Bloques A y B en
paralelo con subagentes `implementador` en worktrees propios (`tips-a`, PW_PORT 4462; `tips-b`,
PW_PORT 4463); integración en `tips` con PW_PORT 4461. La tarea 1.1 va antes porque fija el contrato
que usan los dos bloques.

## 1. Contrato común

- [x] 1.1 Crear `site/src/components/ChartTipScript.astro` (carga única por página con
  `Astro.locals.chartTipScript`, `<script is:inline defer src="/chart-tip.js">`) y un `public/chart-tip.js`
  vacío con su bandera global; `Chart.astro` pone `data-ctip` en su `figure` y usa el componente.
  Verificar: build verde y `dist/controls/index.html` contiene un único `src="/chart-tip.js"`.

## 2. Bloque A: isla, estilos y kit

- [x] 2.1 Implementar `public/chart-tip.js` según design D1 a D6 (fuentes del nombre, apartar y
  restaurar `<title>`/`title`, hover con gracia, focus, Esc, toque con retención solo en enlaces que
  navegan, marca más cercana a 12 px, posición con vuelta y sujeción, recolocación en scroll).
  Verificar: `gzip -c public/chart-tip.js | wc -c` ≤ 4096 (techo 15 KB) y los tests de 2.4.
- [x] 2.2 Estilos `.ctip` y `.ctip-on` en `src/styles/chart.css` con tokens claro/oscuro,
  `forced-colors` (Canvas, CanvasText, borde), `print` oculto y `prefers-reduced-motion`; sin rayas
  U+2014 ni opacidad en texto. Verificar: `perf.spec.ts` y `content-lint` verdes.
- [x] 2.3 Kit, nombres que faltan (design D8): `progressRing`, conjuntos del Venn/Euler, bandas de
  `concentricRings`, fila «+N» del radial, `detail` en pasos de `ladder`, `linkText()` con el nombre
  completo de la marca en barras, heatgrid, lanes, sankey y spine. Verificar: casos nuevos en
  `tests/chart-primitives.spec.ts` (puerta test-audit; lo esperado sale de la entrada del caso) en verde.
- [ ] 2.4 `tests/chart-tip.spec.ts` con los contratos 1 a 7 de design D9 sobre la muestra de rutas
  (puerta test-audit; lo esperado sale del HTML de dist previo a la isla o de `src/data`). Verificar:
  verde a 320, 390 y 1440 con `hasTouch`/`isMobile` en la variante táctil.

## 3. Bloque B: rejillas HTML y nombres de páginas

- [x] 3.1 Raíces `data-ctip` y `<ChartTipScript />` en ControlMosaic, ControlLanes,
  ControlsCrosswalkIndex, CoverageMap, CrosswalkMatrix, LayerMatrix, ObligationMatrix,
  ObligationIsotype, ControlCoverage y ComparisonButterfly; importar `chart.css` en CoverageMap,
  CrosswalkMatrix y ObligationMatrix. Verificar: build verde, `perf.spec.ts` verde y cada ruta de
  esas rejillas carga la isla una vez.
- [x] 3.2 Nombres en rejillas: LayerMatrix (celda con fila, columna y recuento), ComparisonButterfly
  (cada cuadro con su cláusula, desde los datos de la comparativa), ControlsCrosswalkIndex (celda con
  perfil, marco y recuento). Verificar: axe A11Y_FULL de `/stack`, `/path`, `/controls/crosswalk` y una
  comparativa sin violaciones nuevas.
- [x] 3.3 Mapa de calor AIGP (`src/lib/aigp-heatmap.ts`): `<title>` por celda (dominio, capítulo,
  valor) y raíz `data-ctip`; su página carga la isla. Verificar: SVG ≤ 12 KB y test de `/for/aigp`
  existente en verde.
- [x] 3.4 Nombres pobres en páginas (design D8), siempre desde los módulos de datos: `threatGrid` de
  `risk-visuals.ts`, Sankeys de `risk-visuals.ts` (capas y taxonomías), `EvalBoundary.astro`,
  `/frontier` casos x control, `/agents` (capa en el nombre), `toolkit/policy-card` (`effectName`),
  `PathRings.astro`, y revisión de `src/lib/page-charts/*` y `term-visuals.ts`, que no se auditaron.
  Verificar: los specs `page-visuals-*` afectados en verde y ningún SVG pasa de 12 KB en build.
  (`threatGrid` y `EvalBoundary.astro` quedan en el bloque A.)

## 4. Integración y revisión

- [ ] 4.1 Fusionar `wt/tips-a` y `wt/tips-b` en `wt/tips`; build; `npx playwright test
  --project=default --workers=3`; axe `A11Y_FULL=1` en las rutas tocadas; `PW_PORT=4461 npm run lhci`,
  cada uno por separado y con el puerto comprobado libre con netstat. Verificar: los tres verdes.
- [ ] 4.2 Dos revisiones en paralelo: fidelidad de los textos de tooltip frente a los datos, y
  a11y/móvil adversarial con capturas e interacción real a 320, 390 y 1440, claro, oscuro y
  forced-colors, ratón, teclado y táctil emulado. Verificar: informe de cada revisión con hallazgos.
- [ ] 4.3 Pase de arreglos de los hallazgos CRITICAL y HIGH y repetición de 4.1. Verificar: verde.
- [ ] 4.4 PR a main (la fusiona Jordi con `! gh pr merge <n> --merge`); tras la fusión, esperar
  `deploy.yml` y comprobar con curl en producción cada ruta tocada (200 y un único `chart-tip.js`).
