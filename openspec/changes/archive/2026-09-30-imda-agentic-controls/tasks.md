# Tasks

## 1. Capítulo 23

- [x] 1.1 Añadir a las secciones existentes del cap. 23 los huecos 1, 2, 3, 4, 5, 6, 7, 8, 11, 14 y 15
  con cita [3] y página, según D1. Incluye reescribir la regla 2 de «What a good approval looks like»
  y el caso «In practice». Verificación: cada página citada existe en `imda-tmp/pages.txt` con el texto
  parafraseado.
- [x] 1.2 Añadir el H2 «Putting agents in front of people», con sus cinco H3, antes de «What you can
  do this week» (huecos 9, 10, 12, 13 y 16). Verificación: los encabezados generan las anclas que usan
  las semillas y las fuentes DEPLOY.
- [x] 1.3 Escribir el párrafo de la tensión de prompts en «Prompts as configuration», ampliar la glosa
  de la fuente [3] y añadir IMDA a los H2 que lo citan. Verificación: `npm run lint:content` sin rayas.

## 2. Controles Agent Runtime

- [x] 2.1 Añadir las 11 semillas de D2 al final de `agentControls`, el anchor `people` y la ampliación
  de la regla `traces`. Verificación: `toolkit-builders-b` («every agent control links to a real
  pattern and section»).
- [x] 2.2 Añadir en `agent-runtime.ts` los objetivos, las derivaciones, `anchorHeadings`, la versión
  0.2 de AGENT-004 y el perfil v0.2 con su changelog. Actualizar la cabecera (42 controles) y
  `controls-runtime.spec.ts` (31 → 42). Verificación: `controlProblems()` vacío y
  `controls-runtime.spec.ts` en verde.

## 3. Controles Deployment and Monitoring

- [x] 3.1 Añadir DEPLOY-016, 017 y 018 (D3) y ampliar DEPLOY-005; perfil v0.2 con changelog, cabecera
  y MAX = 18 en `controls-deployment-and-monitoring.spec.ts`. Verificación: ese spec en verde tras el
  build.

## 4. Xrefs IMDA y textos

- [x] 4.1 Añadir en `imda-agentic.ts` las 14 entradas nuevas y actualizar AGENT-004, 009, 028 y
  DEPLOY-005 (D4). Verificación: `/controls/crosswalk` muestra los nuevos y la nota de AGENT-028
  empieza por «Stricter than IMDA by design».
- [x] 4.2 Actualizar los recuentos en prosa: `bok/CHANGELOG.md` (Unreleased: 93 controles, cobertura
  IMDA, perfiles v0.2) y `site/src/data/work.ts`. Verificación: `grep` sin «Thirty-one» ni «79
  reference» en la prosa viva.

## 5. Toolkit

- [x] 5.1 Añadir en `public/toolkit/agent-control-profile.js` las reglas de selección de D5 y ajustar
  las expectativas de `toolkit-builders-b.spec.ts` si cambian. Verificación: ese spec en verde.

## 6. Verificación e integración

- [x] 6.1 `npm run build` en el worktree, y después los specs de controles, crosswalk, toolkit, llms,
  agents y api. Verificación: todos en verde.
- [x] 6.2 Revisión (`code-reviewer`) y verificación de citas IMDA contra `pages.txt`; aplicar los
  arreglos. Verificación: sin hallazgos CRITICAL ni HIGH abiertos.
- [x] 6.3 `openspec validate imda-agentic-controls --strict`, commit y PR con CI en verde.
  Verificación: el PR enlazado y los checks en verde.
