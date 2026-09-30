# Tasks

Tanda 3. Fichas por visual: `D:/Documents/aige-wt/handoffs/page-visuals-t3-extract.md`. Todo test
nuevo o cambiado pasa la puerta de `~/.claude/skills/test-audit/SKILL.md` y deriva lo esperado de los
módulos de datos, no del componente.

## 1. Preparación

- [x] 1.1 Fusionar origin/main en `feat/page-visuals-t3` cuando entren #72 y #73, y verificar que `openspec/specs/chart-primitives` y `page-visuals` existen y que `venn3` tiene el layout `euler`
- [x] 1.2 Crear los worktrees `pv3-k1` y `pv3-k2` desde `feat/page-visuals-t3` con junction de `node_modules` y `.archify`, y verificar que `build.sh` arranca en cada uno

## 2. Kit K1: primitivas nuevas (implementador, PW_PORT 4462)

- [x] 2.1 `sankey.ts` (Flow de 2 o 3 columnas, D1) con variante estrecha en lista; verificar en `chart-primitives.spec.ts` que las sumas por nodo igualan la tabla y que una columna de 10 nodos falla
- [x] 2.2 `rings.ts` (concentricRings, lifecycleRing, progressRing, D2); verificar que cada marca cae en su anillo y sector y que la tabla lista todas
- [x] 2.3 `treemap.ts` (squarified agrupado, D3); verificar áreas proporcionales con margen de 1 px, sin solapes y teselas menores de 24 px agrupadas
- [x] 2.4 `spine.ts` (BookSpine y variante mini, D4); verificar orden por capítulo, grupos por parte y que no usa clases de capa
- [x] 2.5 Exportar todo en `index.ts` con su JSDoc y las clases en `chart.css` y `figures.css`; verificar build y `chart-primitives.spec.ts` en verde

## 3. Kit K2: legibilidad y deudas (implementador, PW_PORT 4463)

- [x] 3.1 `NARROW_WIDTH = 280`, texto mínimo 12,5 en estrecho y la comprobación de Chart.astro (D5); verificar que la build falla con un gráfico de prueba a 340 con texto de 12
- [x] 3.2 Migrar los ~20 sitios que dibujan el estrecho a 340 y ajustar etiquetas hasta que la build pase; verificar sin scroll horizontal a 320 en las páginas afectadas
- [x] 3.3 Helper `asOfMark` en core usado por timeStrip, beeswarm, timeLanes y dumbbell (D6); verificar con un test que las cuatro dibujan la misma marca
- [x] 3.4 Mariposa: la trama solo para «related» (D6); verificar en `page-visuals-crosswalk.spec.ts`
- [x] 3.5 `jurisdiction-tiles` y `governance-operating-model` sin texto de 11 px a 390; verificar con `figures*.spec.ts`
- [x] 3.6 Fusionar K1 y K2 en `feat/page-visuals-t3`, build y `chart-primitives.spec.ts`; quitar los worktrees con `rm-worktree.sh`

## 4. Páginas (cinco implementadores en paralelo, un worktree por bloque)

- [x] 4.1 Bloque A, controles (`pv3-a`, 4464): `/controls` evidencia por el stack (sustituye `#by-layer`, anclas `layer-N` en `<details>`); `/controls/crosswalk` flujo perfiles a marcos, índice como mapa de calor (sustituye `ul.cw-index`), 15 cláusulas más cubiertas; test de sincronía con `controls` y `buildControlsCrosswalk()`
- [x] 4.2 Bloque B, riesgos (`pv3-b`, 4465): `/resources/threats` flujo catálogo, capa y herramienta y mapa de calor AICM; `/resources/harms` diana de niveles por dominio MIT y flujo mecanismo, nivel y capa; test de sincronía con `threats.ts` y `harms.ts`
- [x] 4.3 Bloque C, agentes y frontera (`pv3-c`, 4466): AutonomyLadder en `/agents` y `/toolkit/agent-control-profile` (D7); flujo ASI a patrón en `/agents`; EvalBoundary en `/frontier` y en la nota de `/research` (D8); casos x control EVAL; waffle AIUC-1; test de sincronía con `tool-agent-controls.ts`, `evaluation-environment.ts`, `cases.ts` y `aiuc1.ts`
- [x] 4.4 Bloque D, catálogos (`pv3-d`, 4467): treemap de instrumentos en `/resources/frameworks`; anillo de registros y matriz registro x instrumento (desde `getSchemas()` con prefijos normalizados) en `/resources/templates`; treemap del examen y flujo dominios a capítulos en `/for/aigp`; test de sincronía con `frameworks.ts`, `schemas-library.ts` y `aigp.ts`
- [x] 4.5 Bloque E, libro y stack (`pv3-e`, 4468): LayerMatrix en `/stack`; etapa x capa y anillos de progreso (ampliando `public/path.js`, ≤15 KB gzip) en `/path`; espina del libro en `/bok`; atlas en `/figures`; espina mini en `/figures/[id]`; regenerar las capturas de `/stack` y `/role`; tests de sincronía y de `/path` con y sin JavaScript
- [x] 4.6 Fusionar los cinco bloques por rutas en `feat/page-visuals-t3` y quitar sus worktrees

## 5. Integración y revisión

- [ ] 5.1 Una build y la suite completa (`npm test`) una sola vez en `pv3`; verificar verde
- [ ] 5.2 Axe con `A11Y_FULL=1` en las 16 rutas tocadas; verificar sin violaciones serious ni critical
- [ ] 5.3 Revisión de fidelidad de datos (cada cifra dibujada frente a su módulo) y revisión a11y y visual adversarial con capturas a 390 y 1440 en claro, oscuro, print y forced-colors; en paralelo
- [ ] 5.4 Arreglar lo que salga de 5.3 y repetir los tests afectados
- [ ] 5.5 `PW_PORT=4461 npm run lhci` en local; verificar aserciones en verde
- [ ] 5.6 Abrir la PR de la tanda 3 con las capturas regeneradas listadas; tras la fusión de Jordi, esperar a `deploy.yml` y hacer curl a producción de cada ruta tocada
