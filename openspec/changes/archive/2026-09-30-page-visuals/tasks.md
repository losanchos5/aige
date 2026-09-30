# Tasks

## 1. Tanda 0: primitivas y contrato (PR A)

- [x] 1.1 `site/src/lib/charts/core.ts`: escalas lineal y de banda (≤6 marcas redondas), medición de texto portada de `scripts/lib/svg-text.mjs` con fallo duro si desborda, `open()` con role/title/desc, sello As of y línea Source, salida `{ svg, table }`; sin imports de runtime
- [x] 1.2 `site/src/components/Chart.astro`: figcaption, `<details>` con la tabla, par ancho/estrecho, modos `.figc` y `.chart`; hoja `.chart` propia sin enlazar `figures.css`
- [x] 1.3 Primitivas DotMatrix, HeatGrid y Bars (ordenadas, apiladas, 100 %, mariposa, dumbbell, piruleta)
- [x] 1.4 Primitivas TimeAxis (tira, beeswarm con marca de hoy, carriles; reutilizando `timelineModel/measure/wrapTo` de `scripts/lib/posters.mjs`), Lanes, Venn3 con UpSet estrecho y Ladder
- [x] 1.5 Clases de gráfico en `site/src/styles/figures.css` para el exportador; tokens claro/oscuro
- [x] 1.6 Tests de las primitivas bajo test-audit (salida determinista, tabla igual a los datos, fallo por desborde, contrato a11y); verificar con `npm run build` y el spec nuevo
- [x] 1.7 code-reviewer, arreglo de CRITICAL/HIGH, commit por ruta, PR A, CI verde (PR #68, fusionado d2a17aa)

## 2. Tanda 1: victorias rápidas (PR B)

- [x] 2.1 Bloque catálogos: `/controls` (mosaico con estado «por especificar»), `/resources/contracts` (cláusula x norma), `/resources/dpia-lists` (país x Anexo III, tira de adopción, barras por método)
- [x] 2.2 Bloque crosswalk: `/resources/crosswalk` (Venn3 `.chart`, UpSet a 390 px) y las tres comparativas `resources/crosswalk/*` (mariposa por tema + barra 100 %)
- [x] 2.3 Bloque resources y plazos: `/resources` (corpus en puntos, `.chart`), `/resources/ai-act-deadlines` y `/es/...` (dumbbell del Omnibus), `/cases` (cronología beeswarm, `.chart`), `/resources/harms` (incrustar harm-levels)
- [x] 2.4 Bloque toolkit: `/toolkit/policy-card` (Lanes), `/toolkit/ai-act-triage` (Ladder con isla cliente + incrustar eu-ai-act-operator-roles), `/toolkit/vendor-due-diligence` e `/toolkit/incident-clock` (incrustar figuras y diagramas existentes)
- [x] 2.5 Bloque narrativa: `/mcp` (arquitectura FlowDiagram), `/stack` (minimum-viable-stack y three-questions), `/ai-governance` (jurisdiction-tiles, governance-operating-model, MaturityLadder), `/for/certifications` (dos carriles); ampliar `pages` en `figures.ts`
- [x] 2.6 Tests de sincronía por visual bajo test-audit; build, `npm test`, a11y completo de las páginas tocadas, perf.spec
- [x] 2.7 Revisión (code-reviewer + a11y/CSP/perf adversarial), capturas 390/1440 claro/oscuro, commit por ruta, PR B, CI verde (PR #70, fusionado e143e26; lighthouse de /controls arreglado en e77b974)
  - [x] Revisión hecha y hallazgos corregidos (CRITICAL/HIGH/MEDIUM y los LOW baratos): estado "por especificar" del mosaico, totales del grid DPIA, carril de certificación, marco de matriz compartido, impresión y forced-colors de los visuales HTML, línea de fecha del dumbbell estrecho, `.mono` sin tocar el texto SVG; build, `npm test` y axe de las rutas tocadas en verde
  - [x] PR B y CI verde

## 3. Tanda 2: tiempo y plantillas por ítem (PR C)

- [x] 3.1 Primitivas RelationRadial (egocéntrica, se omite con menos de 3 relaciones) y BowTie/cadena sobre `lib/evidence-chain.ts`
- [x] 3.2 Bloque obligaciones: `/obligations` (reloj de aplicación + isotipo de estados) y `/obligations/[id]` (tira + constelación)
- [x] 3.3 Bloque patrones y audiencias: `/patterns/[id]` (reloj normativo + vecindario), `/for/[slug]` (calendario), `/resources/ai-act-deadlines` + `/es` (eje con hoy)
- [x] 3.4 Bloque casos y glosario: `/cases/[id]` (pajarita), `/glossary/[slug]` (huella + vecindario)
- [x] 3.5 Bloque controles: `/controls` (carriles de aplicación), `/controls/[profile]` (tabla periódica + heatmap de cobertura), `/controls/[profile]/[control]` (anatomía + pass/fail + constelación)
- [x] 3.6 Tests de sincronía, build, `npm test`, a11y completo (A11Y_FULL=1), perf.spec
- [x] 3.7 Revisión, capturas, commit por ruta, PR C, CI verde (PR #71)
  - [x] Revisión de la tanda 2 hecha y sus hallazgos corregidos: relaciones `other` de los controles en la constelación y la rejilla, una sola codificación de estado (`appliesStatusMark`), una sola fecha de corte (`registerAsOf`), cuadrado de paso relleno solo si ya se alcanzó, solapes del eje del AI Act, etiqueta "Earlier" del reloj estrecho, hueco "Earlier" en la tira, un solo acortador de etiquetas (`labels.ts`) y tests que leen los datos, no la lógica del componente
  - [x] Capturas, PR C, CI verde. La descripción del PR C lista los cambios del kit de la tanda 2: `lib/charts/radial.ts`, `flow.ts`, `glyphs.ts`, `index.ts`, `chart.css`, `figures.css` y `lib/evidence-chain.ts` (3.1), más `radialLabelWidth` y la leyenda de aristas dibujadas en `radial.ts` (revisión), con sus casos en `tests/chart-primitives.spec.ts`

## 4. Cierre

- [x] 4.1 Tras cada fusión de Jordi: deploy, curl a producción de las páginas tocadas (tanda 1: 18 URLs en 200 con su visual tras e143e26; tanda 2: 12 comprobaciones tras 720eb63)
- [x] 4.2 Revisión con Jordi antes de abrir las tandas 3 a 5 (backlog en `catalogue.md`): las tandas 3 a 5 quedan como backlog en `catalogue.md` para un cambio nuevo cuando Jordi lo apruebe
- [x] 4.3 Archivo OpenSpec, borrado de worktree y ramas, memoria
