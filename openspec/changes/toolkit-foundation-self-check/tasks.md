# Tasks

Worktree `D:/Documents/aige-wt/b-toolkit-foundation`, rama `wt/b-toolkit-foundation`. La build
solo se lanza con `bash D:/Documents/aige-wt/build.sh`.

## 1. Datos

- [x] 1.1 Añadir a `site/src/data/maturity.ts` la tabla de criterios observables por capa y nivel, las métricas por salto de nivel y la lista de autoevaluación, con el texto del capítulo 07 y el patrón de cada paso.
- [x] 1.2 Crear `site/src/data/toolkit.ts` con el tipo de entrada, el aviso fijo y la entrada de `maturity-self-check`.

## 2. Base común

- [x] 2.1 Escribir `site/public/toolkit/lib.js`: fragmento de URL, `localStorage` seguro, descargas (JSON, CSV RFC 4180, Markdown, `.ics` RFC 5545), portapapeles, SVG a PNG vía `data:` y `canvas`, ayudas de foco y estado.
- [x] 2.2 Escribir `site/src/components/toolkit/ToolShell.astro` con el aviso fijo, el aviso sin JavaScript, las ranuras, la carga del módulo y los estilos de impresión.
- [x] 2.3 Crear `/toolkit` a partir del registro, con las convenciones compartidas y sus fuentes.

## 3. Autoevaluación de madurez

- [x] 3.1 Crear `/toolkit/maturity-self-check` con el formulario por capa, el perfil sin JavaScript, la guía (métricas, lista, cómo leer el suelo) y las fuentes.
- [x] 3.2 Escribir `site/public/toolkit/maturity-self-check.js`: validación y resumen de errores, perfil SVG, suelo, siguiente paso, estado en la URL.
- [x] 3.3 Exportaciones: JSON reimportable (con `maturity-profile.v1.schema.json`), informe Markdown, SVG y PNG, copiar el enlace, imprimir.
- [x] 3.4 Guardar perfiles en el navegador, importar un JSON y comparar dos perfiles.

## 4. Registros, pruebas y build

- [x] 4.1 Añadir el bloque de rutas a `SOURCE_BY_PATH`, la sección de `sources/SOURCES.md` y las viñetas de `bok/CHANGELOG.md`.
- [x] 4.2 Escribir `site/tests/toolkit.spec.ts` (flujo, exportaciones, comparación, sin red, sin JavaScript, datos contra el capítulo 07, unidades de `lib.js`).
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate toolkit-foundation-self-check --strict`.
- [x] 4.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/b-toolkit-foundation.json`.

## 5. Notas de verificación

- La build compartida sale con 0 (astro check sin errores, content-lint, check-links y schemas-check en verde).
- Las pruebas Playwright de `site/tests/toolkit.spec.ts` no se ejecutan en este bloque (se lanzan de forma central). El flujo se comprobó con un Chrome sin interfaz contra `dist` y la CSP de producción: validación y foco, resultado desde el enlace, exportaciones JSON/Markdown/SVG/PNG, reimportación, comparación, casos 0 y 5, sin desbordamiento horizontal a 390 px.
