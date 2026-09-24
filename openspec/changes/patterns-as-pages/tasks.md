# Tasks

Worktree `D:/Documents/aige-wt/b-patterns-split`, rama `wt/b-patterns-split`. La build solo se lanza
con `bash D:/Documents/aige-wt/build.sh`. Handoff en `D:/Documents/aige-wt/handoffs/b-patterns-split.json`.

## 1. Contenido

- [x] 1.1 Mover los 17 patrones de `bok/05-patterns.md` a `bok/patterns/<slug>.md` con frontmatter (`id`, `title`, `layer`, `secondaryLayer`, `order`, `summary`), H1 `Pattern: <nombre>`, secciones `##` y citas renumeradas por página.
- [x] 1.2 Enlazar "Related patterns" y las referencias "(see …)" a `/patterns/<slug>`; añadir bajo **Maps to** la línea de fuentes OWASP Agentic / NIST AI RMF con el aviso de no conformidad.
- [x] 1.3 Reescribir el capítulo 05 como catálogo: introducción, plantilla, mapa, los 17 encabezados `## Pattern:` intactos con resumen y enlace, fuentes 1-5 (nueva: normas armonizadas a 2026-09-24, verificada en la Comisión).

## 2. Plumbing del sitio

- [x] 2.1 Colección `patterns` con esquema Zod estricto en `site/src/content.config.ts`.
- [x] 2.2 `slug`, `getPatternBySlug`, `patternPath` y `patternCatalogueHref` en `site/src/data/patterns.ts`.
- [x] 2.3 `DiagramPlacement.pattern`, colocaciones de los 17 diagramas en su página y `diagramsForPattern` en `site/src/data/diagrams.ts`; soporte en `site/src/lib/rehype-diagrams.ts`.
- [x] 2.4 `site/src/lib/pattern-pages.ts`: carga ordenada y comprobaciones de sincronía y de citas.
- [x] 2.5 `schemas-check.mjs` lee las formas JSON de `bok/patterns/*.md`.

## 3. Páginas

- [x] 3.1 `/patterns/[id].astro` con `Doc`, chip de capa, enlace al catálogo, diagrama, `PatternFoot` (editar, citar, paginación).
- [x] 3.2 `/patterns/index.astro` agrupado por capa, sin JavaScript, indexado por Pagefind.
- [x] 3.3 Bloque `/patterns` y `/patterns/<slug>` en `SOURCE_BY_PATH` de `site/astro.config.ts`.

## 4. Superficies legibles por máquina y PDF

- [x] 4.1 `/llms.txt`: sección Patterns y líneas de harms, cases, templates y contracts.
- [x] 4.2 `/llms-full.txt`: cada patrón completo tras el capítulo 05.
- [x] 4.3 `build/build_pdf.py`: todos los capítulos y el capítulo 05 montado con los patrones; generar el PDF en local.

## 5. Tests, registros y cierre

- [x] 5.1 `site/tests/patterns.spec.ts` nuevo y `site/tests/diagrams.spec.ts` apuntando a las páginas de patrón.
- [x] 5.2 Sección añadida en `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)".
- [x] 5.3 `openspec validate patterns-as-pages --strict`.
- [x] 5.4 `bash D:/Documents/aige-wt/build.sh` con salida 0.
- [x] 5.5 Handoff con navegación, enlaces a redirigir, OG, recuento de rutas y notas.
