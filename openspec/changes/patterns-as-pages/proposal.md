# Proposal

## Why

El catálogo de patrones vivía entero en `bok/05-patterns.md`: 17 patrones con sus 17 diagramas
archify incrustados, unos 470 KB de página. Un patrón no se podía enlazar, citar ni compartir como
unidad, el buscador devolvía el capítulo entero, y cada patrón nuevo engordaba la misma página. Para
que el sitio sea la referencia de la disciplina, cada patrón necesita su propia URL estable, con su
diagrama, sus fuentes y su cita, sin romper ninguno de los enlaces publicados a
`/bok/patterns#pattern-*`, que usan capítulos, datos, esquemas y figuras.

## What Changes

- **Un fichero por patrón** en `bok/patterns/<slug>.md` (colección de contenido `patterns` con
  frontmatter tipado). El texto de cada patrón se mueve tal cual; las secciones suben un nivel
  (`###` → `##`), las citas se renumeran por página, "Related patterns" enlaza a las páginas y bajo
  cada línea **Maps to** se añade una línea con las fuentes OWASP Agentic y NIST AI RMF y el aviso
  "Mappings are illustrative, not a claim of conformity".
- **Capítulo 05 como catálogo**: introducción, la plantilla de patrón, el mapa de patrones y, bajo
  cada encabezado `## Pattern: <nombre>` idéntico al anterior (mismas anclas), un resumen de dos o
  tres frases con enlace a `/patterns/<slug>`. Fuentes propias renumeradas (1 a 5), una nueva que
  fecha la ausencia de normas armonizadas en el DOUE (a 2026-09-24).
- **Páginas nuevas**: `/patterns` (índice por capa del stack, sin JavaScript) y `/patterns/<slug>`
  (layout `Doc`: migas, raíl con el capítulo 05 activo, TOC, diagrama movido desde el capítulo,
  tarjetas de glosario, fuentes numeradas, bloque "Cite this pattern" y paginación en el orden del
  catálogo). `PatternFoot.astro` replica el pie de capítulo porque `Citation` y `PrevNext` solo
  construyen URL `/bok/<slug>`.
- **Diagramas**: `DiagramPlacement` gana `pattern?: string`; los 17 diagramas de patrón pasan a
  `{ chapter: 'patterns', pattern: '<slug>', at: 'lead' }` y `rehype-diagrams` los inserta en el
  fichero del patrón (tras el Summary, antes de "Objectives").
- **Integridad en la build**: `src/lib/pattern-pages.ts` falla si fichero, `data/patterns.ts` (que
  gana `slug`) y la sección del catálogo divergen, si una cita no resuelve o si una fuente no se cita.
  `schemas-check.mjs` lee las formas JSON de las páginas de patrón.
- **Superficies legibles por máquina**: `/llms.txt` gana la sección Patterns y las líneas de
  `/resources/harms`, `/cases`, `/resources/templates` y `/resources/contracts`; `/llms-full.txt`
  incluye cada patrón completo justo después del capítulo 05. `SOURCE_BY_PATH` fecha las 18 rutas.
- **PDF**: `build/build_pdf.py` imprime todos los capítulos `bok/NN-*.md` y monta el capítulo 05 con
  el texto completo de cada patrón en lugar de los resúmenes.
- Fuera de alcance (handoff al orquestador): navegación, OG por patrón, `Citation`/`PrevNext` con
  URL propia, redirigir enlaces existentes a `/patterns/<slug>`, recuento `INDEXABLE_ROUTES`,
  STYLEGUIDE §4, patrones nuevos.

### Contrato de frontmatter para ficheros de patrón nuevos

Cada patrón nuevo es `bok/patterns/<slug>.md` y MUST llevar exactamente estos campos (el esquema
Zod de `site/src/content.config.ts` es `strict`, así que cualquier otro campo rompe la build):

```yaml
---
id: <slug>              # igual al nombre del fichero; minúsculas, cifras y guiones
title: <Nombre>         # sin el prefijo "Pattern: "; entre comillas si lleva : / & ( )
layer: <1-5>            # capa principal: la primera "Layer NN" de su línea Maps to
secondaryLayer: <1-5>   # opcional, solo si la línea Maps to nombra una segunda capa
order: <n>              # posición en el catálogo, 1..N sin huecos, igual a su índice en patterns.ts
summary: "<una frase de 50 a 160 caracteres: entradilla y meta description>"
---
```

El cuerpo sigue la plantilla de STYLEGUIDE §4 con un `#` y `##`: `# Pattern: <Nombre>`,
`**Summary:**`, `## Objectives`, `## Target users`, `## Impacted stakeholders`,
`## Relevant principles`, `## Context`, `## Problem`, `## Solution`, `## Consequences`,
`## Related patterns` (enlaces `/patterns/<slug>`), la línea `**Maps to:**` terminada en
`Layer NN <nombre>` (y `/ Layer MM <nombre>` si hay segunda capa), la línea de fuentes de los
identificadores con el aviso de no conformidad, y `## Sources` numerada desde `[1]` sin huecos, cada
fuente citada al menos una vez. Además, en el mismo cambio: una entrada en `site/src/data/patterns.ts`
(con `id` = `pattern-<slug de github-slugger del título>`, `slug`, `layer`, `mapsTo`), una sección
`## Pattern: <Nombre>` en `bok/05-patterns.md` con resumen y enlace a `/patterns/<slug>`, filas en
`sources/SOURCES.md` y, si tiene diagrama, una colocación `{ chapter: 'patterns', pattern: '<slug>' }`
en `site/src/data/diagrams.ts`.

## Capabilities

### New Capabilities
- `pattern-pages`: un patrón por página, el catálogo del capítulo 05 que conserva las anclas, el
  índice por capa, la integridad de citas y datos en la build, y su presencia en llms.txt,
  llms-full.txt, el sitemap y el PDF.

### Modified Capabilities
- (ninguna en `openspec/specs/`). Ajusta la comprobación de compatibilidad del cambio abierto
  `templates-and-schemas` (capacidad `governance-templates`, aún sin archivar): las formas JSON del
  capítulo 05 se leen ahora del catálogo y de `bok/patterns/*.md`.

## Impact

- **Nuevos**: `bok/patterns/*.md` (17), `site/src/pages/patterns/index.astro`,
  `site/src/pages/patterns/[id].astro`, `site/src/components/PatternFoot.astro`,
  `site/src/lib/pattern-pages.ts`, `site/src/styles/patterns.css`, `site/tests/patterns.spec.ts`.
- **Modificados**: `bok/05-patterns.md`, `site/src/content.config.ts`, `site/src/data/patterns.ts`,
  `site/src/data/diagrams.ts`, `site/src/lib/rehype-diagrams.ts`, `site/src/lib/llms.ts`,
  `site/src/pages/llms.txt.ts`, `site/src/pages/llms-full.txt.ts`, `site/scripts/schemas-check.mjs`,
  `site/astro.config.ts` (bloque en `SOURCE_BY_PATH`), `build/build_pdf.py`,
  `site/tests/diagrams.spec.ts`, `sources/SOURCES.md` (sección añadida), `bok/CHANGELOG.md`.
- Sin dependencias nuevas; `node_modules` no cambia. Todos los enlaces `/bok/patterns#pattern-*`
  siguen resolviendo. Las correspondencias siguen siendo ilustrativas, no una declaración de
  conformidad.
