# Tasks

## 1. Cálculo

- [x] 1.1 Crear `site/src/lib/coverage.ts` con `computeCoverage` (estados, niveles core, consenso, totales de columna, divergencia labs/no-labs) según design.md §1-3; verificar con `npx astro check` sin errores y un volcado puntual (tsx) que dé 4 celdas `gap` en `security×iso`, `external-review×iso`, `regulatory×pf`, `regulatory×iso`

## 2. Componente y estilos

- [x] 2.1 Crear `site/src/components/CoverageMap.astro` (rejilla de enlaces con `data-cw-open`/`data-cw-col` y `aria-label`, columna de consenso, totales, leyenda, `<fieldset hidden>` de lentes) y verificar en el HTML construido 65 celdas enlace a `#topic-<id>` existentes
- [x] 2.2 Crear `site/src/styles/coverage-map.css` con tokens claro/oscuro (un tono, tres niveles core, related discontinuo, gap punteado), cruceta de fila por `:has()`, lentes por `data-lens`, responsive < 640 px y `prefers-reduced-motion`, sin `opacity` en texto; verificar contraste con el validador de la skill `dataviz` y visualmente a 1440/390 en ambos temas

## 3. Interacción

- [x] 3.1 Crear `site/public/coverage-map.js` (muestra el fieldset, aplica `data-lens`, lee/escribe `#coverage?lens=`, `data-hover-col` en pointerover/focusin) y verificar a mano que las tres lentes y el fragmento funcionan y que el drawer abre desde el mapa

## 4. Página

- [x] 4.1 Insertar la sección "Coverage at a glance" (id `coverage`, h2 `fs-coverage-heading`, subtítulo sobre qué significa el número) entre "How to read this" y "Dimension × framework" en `site/src/pages/resources/frontier-safety-crosswalk.astro` y cargar `/coverage-map.js`; verificar con `bash D:/Documents/aige-wt/build.sh` en verde (incluye content-lint sin rayas largas y `frontierProblems`)

## 5. Tests (skill test-audit primero)

- [x] 5.1 Añadir a `site/tests/frontier-crosswalk.spec.ts`: drawer desde una celda del mapa (título, columna activa, Esc devuelve foco); lente "Gaps only" destaca exactamente los pares de `frontierGaps` y escribe el fragmento; abrir con `#coverage?lens=gaps` restaura la lente; sin JS el fieldset está oculto y los `href` apuntan a `#topic-<id>` existentes; axe claro/oscuro con lente activa; 390 px sin scroll lateral. Verificar `npx playwright test frontier-crosswalk` en verde
- [x] 5.2 Ejecutar `npx playwright test a11y visual` y regenerar solo las capturas de esta página que cambien por el mapa; verificar en verde

## 6. Cierre

- [x] 6.1 Commit por rutas, push de `feat/frontier-coverage-map` y PR con resumen y test plan; verificar CI verde (el merge lo hace Jordi)
