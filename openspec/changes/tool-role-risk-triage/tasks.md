# Tasks

Worktree `D:/Documents/aige-wt/w2-tool-triage`, rama `wt/w2-tool-triage`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Handoff en `D:/Documents/aige-wt/handoffs/w2-tool-triage.json`.

## 1. Datos y verificación

- [x] 1.1 Leer el capítulo 18 entero y contrastar con el texto oficial los artículos en que se apoya el grafo (`Arts. 2`, `3`, `5`, `6`, `25`, `50`, `51`, `52`, `111`, `113`, Anexos I y III) en las copias de la Oficina de Publicaciones del Reglamento (UE) 2024/1689, del texto consolidado de 27.07.2026 y del Reglamento (UE) 2026/1744.
- [x] 1.2 Crear `site/src/data/triage.ts`: conjunto de preguntas versionado, 20 preguntas en siete pasos con artículo, ancla de EUR-Lex, sección y fragmentos literales del capítulo; condiciones `showIf`; reglas de clase, papel, alcance, notas y disparadores; etiquetas; tabla de códigos del planificador; `plainChapterText`, `basisItems` y `triageModel`.

## 2. Motor y cliente

- [x] 2.1 Escribir `site/public/toolkit/ai-act-triage-engine.js` (puro, sin DOM): visibilidad, evaluación por fases, resumen, registro, YAML, Markdown, estado en el fragmento, reimportación y enlace al planificador.
- [x] 2.2 Escribir `site/public/toolkit/ai-act-triage.js`: preguntas condicionales, "ninguna de estas" exclusiva, validación con resumen de errores y foco, resultado, disparadores sugeridos, exportaciones, reimportación, estado en el enlace.

## 3. Página

- [x] 3.1 Crear `/toolkit/ai-act-triage` con ToolShell: formulario por pasos, qué significa cada respuesta (sin JavaScript), resultado, importación, guía (cómo funciona, cómo leer el resultado, las reglas escritas, el registro, el enlace al planificador, qué no es, versionado) y fuentes.
- [x] 3.2 Comprobaciones en build: fragmentos del capítulo 18, secciones existentes, etiquetas contra `roles.ts` y `frameworks.ts`.

## 4. Registro de decisión

- [x] 4.1 `site/public/schemas/classification-decision-record.v1.json`, su ejemplo generado con el motor y su plantilla humana; `schemas-check` en verde.

## 5. Registros compartidos, pruebas y build

- [x] 5.1 Entrada al final de `site/src/data/toolkit.ts`, bloque en `SOURCE_BY_PATH`, sección en `sources/SOURCES.md`, viñeta en `bok/CHANGELOG.md`.
- [x] 5.2 Escribir `site/tests/ai-act-triage.spec.ts` (datos, motor, esquema, página con y sin JavaScript, exportaciones, reimportación, sin red, impresión, 390 px). Se ejecutan de forma central más tarde.
- [x] 5.3 `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate tool-role-risk-triage --strict`.
- [x] 5.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/w2-tool-triage.json`.

## 6. Notas de verificación

- EUR-Lex rechazó el acceso automatizado el 2026-09-24 (respuesta 202 vacía); los textos se leyeron en `publications.europa.eu/resource/celex/` (mismo documento, mismas anclas `art_N` y `anx_N`).
- El formato del fragmento del planificador se tomó de su worktree (`w2-tool-planner`, en curso); una prueba compara los códigos cuando ambos bloques estén en la misma rama.
