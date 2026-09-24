# Tasks

Worktree `D:/Documents/aige-wt/w2-tool-planner`, rama `wt/w2-tool-planner`. La build solo se lanza
con `bash D:/Documents/aige-wt/build.sh`.

## 1. Datos

- [x] 1.1 Crear `site/src/data/obligations-planner.ts`: siete roles y tres clases con códigos estables, correspondencia fila → roles con las condiciones del Act, fechas por clase (`rowTimeline`) y los deberes de los Arts. 22, 23, 24 y 54 con fechas tomadas del registro; error en build ante una fila sin correspondencia.
- [x] 1.2 Verificar en el texto consolidado de EUR-Lex (2026-07-27) los Arts. 3(3) a 3(8), 22, 23, 24, 27(1), 49(1) a 49(3), 54, 55(1), 60(1) y 113(b) y (c).
- [x] 1.3 Añadir la entrada `obligations-planner` al final de `site/src/data/toolkit.ts`.

## 2. Herramienta

- [x] 2.1 Escribir `site/public/toolkit/obligations-planner-core.js` (sin DOM): emparejamiento, fechas y estado en la fecha de referencia, códec del fragmento, línea de tiempo SVG, Markdown, CSV, JSON e iCalendar.
- [x] 2.2 Escribir `site/public/toolkit/obligations-planner.js`: validación con resumen de errores, resultado, tablas, deberes fuera del registro, estado en el enlace, descargas, impresión.
- [x] 2.3 Crear `/toolkit/obligations-planner` con `ToolShell`: formulario, resultado, aviso de lectura, hoja de trabajo sin JavaScript (las 27 filas, fechas, deberes fuera del registro, cómo hacerlo a mano) y fuentes.
- [x] 2.4 Publicar `/toolkit/obligations-plan.v1.schema.json` generado desde `src/lib/api.ts`.

## 3. Páginas de obligación

- [x] 3.1 Escribir `site/src/lib/evidence-chain.ts` y `site/src/components/obligations/EvidenceChain.astro` (cadena de seis nodos, hermanos del crosswalk, dos disposiciones, alternativa textual).
- [x] 3.2 Poner la figura como cabecera de `site/src/pages/obligations/[id].astro` y compartir el título corto con la tarjeta (`site/src/lib/obligation-title.ts`).
- [x] 3.3 Tarjetas Open Graph `/og/obligations/<id>.png` y `/og/toolkit/<id>.png` con la plantilla existente.

## 4. Pruebas, registros y build

- [x] 4.1 Escribir `site/tests/obligation-status-dates.spec.ts` (estado caducado frente a la fecha de ejecución).
- [x] 4.2 Escribir `site/tests/obligations-planner.spec.ts` (datos, núcleo en Node sobre el modelo publicado, exportaciones contra el esquema, flujo, sin JavaScript, sin red, impresión, 390 px, figura, tarjetas).
- [x] 4.3 Añadir el bloque de `SOURCE_BY_PATH`, la sección de `sources/SOURCES.md` y las viñetas de `bok/CHANGELOG.md`.
- [x] 4.4 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate tool-obligations-planner --strict`.
- [x] 4.5 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-tool-planner.json`.
