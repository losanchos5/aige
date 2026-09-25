# Tasks

Worktree `D:/Documents/aige-wt/w2-patterns-b`, rama `wt/w2-patterns-b`. La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Handoff en `D:/Documents/aige-wt/handoffs/w2-patterns-b.json`.

## 1. Contenido

- [x] 1.1 Escribir los ocho patrones en `bok/patterns/<slug>.md` con el contrato de frontmatter (`order` 18 a 25), la plantilla de STYLEGUIDE §4, `### Forces` bajo `## Problem`, un artefacto JSON ilustrativo, el ejemplo `(illustrative)`, **Maps to** con capas y el aviso de no conformidad.
- [x] 1.2 Verificar en línea las afirmaciones fechadas y jurídicas o reutilizar filas ya verificadas de los capítulos 15, 16, 18, 19 y 21 y del crosswalk; Derecho de la UE citado en EUR-Lex; el BoK público de AIGP v2.1 solo por código de competencia, parafraseado y con la nota de no afiliación.
- [x] 1.3 Hacer que los artefactos de la pasarela, el monitor y la retirada sean instancias válidas de `evidence-record`, `post-market-monitoring-plan` y `decommissioning-runbook`.
- [x] 1.4 Añadir las ocho secciones `## Pattern:` con resumen y enlace al catálogo `bok/05-patterns.md`.

## 2. Datos y diagramas

- [x] 2.1 Añadir las ocho entradas al final de `site/src/data/patterns.ts` (`id` de github-slugger, `slug`, capas, `mapsTo`).
- [x] 2.2 Escribir los ocho IR archify y sus `<slug>.notes.json`; validar cada uno con `archify validate --quality showcase`.
- [x] 2.3 Añadir las ocho entradas al final de `site/src/data/diagrams.ts`, cada una colocada en su página de patrón con `at: 'lead'`.
- [x] 2.4 Añadir cortos en `site/src/data/map.ts` para los nombres que no caben en la columna del mapa y regenerar `pattern-map.svg` y `discipline-map.svg`.

## 3. Enlaces desde los capítulos

- [x] 3.1 Enlazar cada patrón desde las frases de los capítulos 11 a 23 que describen la práctica, sin cambiar las palabras ni los encabezados.

## 4. Tests, registros y cierre

- [x] 4.1 `site/tests/patterns-deployment-side.spec.ts`: ficheros, índice, catálogo, diagramas y notas, artefactos contra sus esquemas y enlaces desde los capítulos (comprobado en seco con Node; Playwright no se ejecuta en este bloque).
- [x] 4.2 Sección añadida en `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)".
- [x] 4.3 `openspec validate patterns-deployment-side --strict`.
- [x] 4.4 `bash D:/Documents/aige-wt/build.sh` con salida 0.
- [x] 4.5 Handoff con navegación, rutas, enlaces cruzados, glosario, obligaciones, crosswalk, figuras, tests y notas.
