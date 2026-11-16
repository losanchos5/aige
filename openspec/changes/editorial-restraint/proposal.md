## Why

La hero de la portada (cuadro de Monet, titular Newsreader en azul marino, etiquetas mono, líneas finas) es la parte del sitio que mejor funciona, pero todo lo que hay debajo cambia de sistema: títulos en Bricolage Grotesque, doce secciones sobre mesh o tintes de cinco familias de color, y diagramas en tarjetas tintadas con sombra y doble marco. El resultado es que la portada parece dos sitios y que los diagramas se leen como un elemento ajeno. Jordi aprobó el 2026-11-15 una maqueta (`D:/Documents/aige-media/mockups/editorial-restraint/`) que extiende la voz de la hero a todo el sitio.

## What Changes

- **BREAKING (visual)**: desaparece el mesh de halos y los tintes de banda en todo el sitio. Fondo único de papel con grano tenue; todo panel (callouts, tablas, marcos de figura) usa una superficie lisa y opaca.
- Un solo acento (el azul marino de la hero). Los cinco colores de capa quedan solo donde significan capa del stack, y solo como muestra pequeña.
- Newsreader en todos los títulos h1 y h2. Bricolage Grotesque se retira. Etiquetas, números y controles pequeños en JetBrains Mono a 12px.
- El color pasa a venir de cuadros de Monet de dominio público: paneles de papel flotando sobre un cuadro, tarjetas con cuadro arriba, una franja sobre el índice del Body of Knowledge y el cuadro velado en la banda de cierre. Créditos visibles.
- Portada condensada: de trece secciones a siete más el cierre, alternando secciones con imagen y secciones de filas. Values y Role salen de la portada (siguen en sus páginas). La hero no cambia.
- Lectura a tres columnas restilizada (índice lateral con partes numeradas y línea de árbol, cabecera con píldora de capítulo, índice de página numerado) y extendida a la Thesis y a las páginas de documento que hoy no tienen índice lateral.
- Firma de autor y tarjeta de cita con marco de cuadro.
- Un marco y un pie únicos para diagramas archify, infografías, gráficos y el bucle. Los 41 diagramas archify se regeneran con carriles en filas y etiquetas de 12px como mínimo, y dejan de usar colores de capa para el tipo de nodo.
- Entrega en dos PR: (1) cimientos, páginas de contenido y diagramas; (2) portada con cuadros.

## Capabilities

### New Capabilities
- `editorial-system`: fondo, grano, superficies de panel, acento único, uso de los colores de capa, tipografía por rol y numeración mono, comunes a todo el sitio.
- `painting-mats`: uso de cuadros de dominio público como única fuente de color decorativo: dónde aparecen, créditos, contraste del texto, peso y modo oscuro.
- `reading-layout`: maqueta de lectura a tres columnas, su índice lateral, cabecera, firma con marco, índice de página y a qué páginas se aplica.
- `figure-frame`: marco, pie, tamaño mínimo de texto y uso del color comunes a todas las familias de figuras.

### Modified Capabilities
- `section-backdrop`: las secciones de la portada dejan de pintar mesh; pasan a papel con una sola banda oscura.
- `home-positioning`: la banda "Where it operates" deja de ser una banda mesh con tarjetas y pasa a filas dentro de la sección del stack; los recursos de la portada pasan a cuatro tarjetas con cuadro más filas.
- `book-parts`: los capítulos por partes de la portada pasan de una tarjeta por parte a un índice de filas numeradas.
- `page-hero`: las cabeceras de página dejan de llevar capa mesh.

## Impact

- Estilos: `site/src/styles/{tokens,fonts,effects,prose,reading,diagrams,figures,chart}.css`.
- Componentes y maquetas: `Section.astro`, `layouts/{Base,Marketing,Doc}.astro`, `SidebarNav`, `Toc`, `ChapterHeader`, `PageHero`, `Byline`/`AuthorBadge` (solo estilo), `Citation`, `PrevNext`, `GovernanceLoop`, `StackDiagram`, `BookParts`, `WhatAppliesNow`, `ResourceTiles`, `SurfaceCards`, `DefinitionCards`, `CtaBand`, `pages/index.astro`, `pages/thesis.astro` y variantes de idioma.
- Diagramas: `site/scripts/diagrams-build.mjs`, los 41 `site/diagrams/*.json` y los SVG generados.
- Recursos nuevos: nueve cuadros en `site/public/` con variantes responsivas, y sus créditos.
- Documentación: `site/DESIGN.md`, `site/VISUAL-GUIDE.md`.
- Pruebas: `home.spec.ts`, `loop.spec.ts`, `layout.spec.ts`, `bok.spec.ts`, `shell-parts.spec.ts`, `page-hero.spec.ts`, `diagrams.spec.ts`, `perf.spec.ts`, `seo-font-cls.spec.ts`, a11y y Lighthouse.
- Cambios abiertos que este sustituye en parte: `visual-rhythm` (tonos de banda y fondo de sección) y `ui-refinement-impeccable` (tareas pendientes sobre el mesh).
- Sin cambios en contenido del Body of Knowledge, rutas, datos estructurados ni analítica.
