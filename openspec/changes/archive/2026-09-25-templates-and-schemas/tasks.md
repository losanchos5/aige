# Tasks

Worktree `D:/Documents/aige-wt/x-templates-schemas`, rama `wt/x-templates-schemas`. La build solo se
lanza con `bash D:/Documents/aige-wt/build.sh`.

## 1. Esquemas, ejemplos y plantillas

- [x] 1.1 Escribir los 21 esquemas `site/public/schemas/*.v1.json` (draft 2020-12, `$id` estable, `x-evidences`, `x-layer`, `x-pattern`, `x-lifecycle-stage`), compatibles con las formas del capítulo 05.
- [x] 1.2 Escribir un ejemplo relleno por esquema en `site/public/schemas/examples/`, desidentificado y siguiendo dos sistemas de ejemplo (agente de atención al cliente y modelo de asequibilidad de crédito).
- [x] 1.3 Escribir una plantilla Markdown por esquema en `site/public/templates/` con los mismos campos, guía breve, aviso de no conformidad y licencia.
- [x] 1.4 Alinear `incident-record` campo a campo con la plantilla de la Comisión (diez puntos) y el marco de la OCDE (29 criterios, siete obligatorios), verificados en las fuentes primarias.

## 2. Kit de políticas

- [x] 2.1 Escribir `ai-policy.yaml` y sus vistas `ai-policy.md` y `ai-policy.rego` con los mismos identificadores de regla.
- [x] 2.2 Escribir `committee-charter.md`, `raci.csv`, `policy-gap-assessment.csv`, `literacy-curriculum.csv` y `contract-clause-checklist.md`.

## 3. Validación en la build

- [x] 3.1 Crear `site/scripts/schemas-check.mjs` sin dependencias (lint de palabras clave, `$id`, ejemplos, plantillas, CSV, raya U+2014, compatibilidad con el capítulo 05) y comprobar que falla con ejemplos rotos.
- [x] 3.2 Añadir `&& node scripts/schemas-check.mjs` al script `build` de `site/package.json`, sin tocar nada más.

## 4. Página y publicación

- [x] 4.1 Crear `site/src/data/templates.ts`, `site/src/lib/schemas-library.ts` y `site/src/pages/resources/templates.astro` con fuentes numeradas.
- [x] 4.2 Añadir `/resources/templates` a `SOURCE_BY_PATH` en `site/astro.config.ts` y el bloque `/schemas/*` a `site/public/_headers`.
- [x] 4.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0.

## 5. Cierre

- [x] 5.1 `openspec validate templates-and-schemas --strict` en verde.
- [x] 5.2 Escribir el handoff `D:/Documents/aige-wt/handoffs/x-templates-schemas.json` (navegación, hub de Resources, glosario, enlaces cruzados, patrones pendientes, fuentes de la ruta).
- [x] 5.3 Commits por ruta explícita, en español, sin atribución.
