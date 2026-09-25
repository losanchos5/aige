# Tasks

Worktree `D:/Documents/aige-wt/w2-builders-a`, rama `wt/w2-builders-a`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`.

## 1. Esquemas y datos

- [x] 1.1 Ampliar `ai-system-register-entry.v1.json` y `agent-register-entry.v1.json` con el bloque opcional `public_record`, y sus plantillas humanas.
- [x] 1.2 Ampliar `impact-assessment.v1.json` con `iso42005_sections`, `risks[].id`, `mitigations[].pattern` y `mitigations[].controls`, todos opcionales, y su plantilla humana.
- [x] 1.3 Crear `model-card.v1.json` con su ejemplo y su plantilla humana; `schemas-check` lo valida.
- [x] 1.4 Escribir `site/src/data/doc-builders.ts`: secciones de los tres formularios, crosswalk de campos (ATRS, AIA, Anexo VIII, ficha, SoA), elementos del art. 27(1) y del art. 35(7), cláusulas de ISO/IEC 42005, disparadores de reapertura, lista de cobertura de la ficha y fuentes.

## 2. Base común

- [x] 2.1 Escribir `site/public/toolkit/builders.js`: validador del subconjunto draft 2020-12, rutas, poda, orden por esquema, YAML, CSV RFC 4180 con aplanado y reconstrucción.
- [x] 2.2 Escribir `site/public/toolkit/schema-form.js`: formulario accesible desde las especificaciones, grupos repetibles, referencias entre grupos y resumen de errores enlazado.
- [x] 2.3 Escribir `site/src/lib/doc-builders-schemas.ts` y `site/src/components/toolkit/builders.css`.

## 3. Constructores

- [x] 3.1 `/toolkit/ai-register-entry`: sistema o agente, validación, registro en el navegador, importación y exportación JSON y CSV, resumen público en Markdown, crosswalk en CSV y Markdown.
- [x] 3.2 `/toolkit/impact-assessment`: FRIA, AIIA y adenda DPIA; cobertura de elementos, matriz riesgo-medida, disparadores; exportación JSON, YAML y Markdown.
- [x] 3.3 `/toolkit/model-card`: lista de cobertura por obligación; exportación JSON, Markdown estilo Hugging Face y CycloneDX 1.7 ML-BOM validado contra el esquema oficial.
- [x] 3.4 Añadir las tres entradas a `site/src/data/toolkit.ts` con estado `live`.

## 4. Registros, pruebas y build

- [x] 4.1 Añadir el bloque de rutas a `SOURCE_BY_PATH`, la sección de `sources/SOURCES.md` y las viñetas de `bok/CHANGELOG.md`.
- [x] 4.2 Escribir `site/tests/doc-builders.spec.ts` (datos contra esquemas, módulos puros, páginas con y sin JavaScript, exportaciones, sin red, impresión, 390 px).
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate toolkit-builders-register-ia-card --strict`.
- [x] 4.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-builders-a.json`.
