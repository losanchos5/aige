# Tasks

Worktree `D:/Documents/aige-wt/w2-builders-b`, rama `wt/w2-builders-b`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`.

## 1. Piezas comunes

- [x] 1.1 Escribir `site/public/toolkit/form-kit.js` (formulario a parámetros y vuelta, resumen de errores, fechas en UTC, ayudas de texto) sobre `lib.js`.
- [x] 1.2 Crear `ToolTerms.astro`, `ToolSourceList.astro`, `tool-docs.css` y `site/src/lib/tool-anchors.ts` (anclas de capítulo que rompen la build si desaparecen).
- [x] 1.3 Añadir las cuatro entradas `live` al final de `site/src/data/toolkit.ts`.

## 2. Due diligence de proveedor

- [x] 2.1 Datos `site/src/data/tool-vendor-dd.ts`: opciones, regla de niveles, banco de preguntas con temas del crosswalk e ids CSA AICM verificados contra el crosswalk, reglas de cláusulas de `contracts.ts`.
- [x] 2.2 Página `/toolkit/vendor-due-diligence` con la guía sin JavaScript (banco completo) y fuentes.
- [x] 2.3 Cliente `vendor-due-diligence.js`: nivel y razones, petición, cláusulas, Markdown, CSV y registro de respuesta `vendor-due-diligence-response.v1`.

## 3. Reloj de incidentes

- [x] 3.1 Datos `site/src/data/tool-incident-clock.ts`: escala de severidad, hechos, roles, niveles, condiciones y regímenes con el texto de la tabla del capítulo 17.
- [x] 3.2 Página `/toolkit/incident-clock` con el aviso destacado de verificación, la tabla completa sin JavaScript y fuentes EUR-Lex.
- [x] 3.3 Cliente `incident-clock.js`: clase, relojes con fechas, `.ics`, Markdown y esqueleto `incident-record.v1` con carencias nombradas.

## 4. Perfil de controles de agente

- [x] 4.1 Datos `site/src/data/tool-agent-controls.ts`: niveles de autonomía, controles mínimos y condicionales, taxonomía de incidentes de agente, con sección y patrón por control.
- [x] 4.2 Página `/toolkit/agent-control-profile` con guía sin JavaScript y fuentes.
- [x] 4.3 Cliente `agent-control-profile.js`: controles, carencias, entrada `agent-register-entry.v1`, lista en Markdown y CSV.

## 5. Selector de métrica de equidad

- [x] 5.1 Datos `site/src/data/tool-fairness-chooser.ts`: preguntas del árbol, familias de métricas, comprobaciones, advertencias, notas legales y filas de la tabla del capítulo 16.
- [x] 5.2 Página `/toolkit/fairness-metric-chooser` con guía sin JavaScript y fuentes.
- [x] 5.3 Cliente `fairness-metric-chooser.js`: árbol, resultado enlazado al capítulo 16, Markdown y JSON.

## 6. Registros, pruebas y build

- [x] 6.1 Añadir el bloque de rutas a `SOURCE_BY_PATH`, la sección de `sources/SOURCES.md` y las viñetas de `bok/CHANGELOG.md`.
- [x] 6.2 Escribir `site/tests/toolkit-builders-b.spec.ts` y `site/tests/helpers/schema-library.ts` (datos contra los capítulos, lógica, esquemas, páginas sin JavaScript, flujo, exportaciones, sin red, impresión).
- [x] 6.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate toolkit-builders-dd-incident-agent-fairness --strict`.
- [x] 6.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-builders-b.json`.
