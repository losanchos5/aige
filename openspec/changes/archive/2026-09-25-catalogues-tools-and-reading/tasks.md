# Tasks

Worktree `D:/Documents/aige-wt/b-catalogues` (rama `wt/b-catalogues`). La build solo se lanza con
`bash D:/Documents/aige-wt/build.sh`. Los ficheros compartidos que no son de este bloque
(`Base.astro`, `nav.ts`, `path.ts`, `resources/index.astro`, `resources.css`, `llms.txt`) no se
tocan: sus cambios van al handoff.

## 1. Verificación

- [x] 1.1 Verificar URL, licencia y actividad de cada herramienta (API de GitHub, estado HTTP) y buscar su entrada en el OECD.AI Catalogue of Tools & Metrics.
- [x] 1.2 Verificar cada URL nueva de la lista de lectura (estado HTTP, API de arXiv, Crossref para los DOI) y deduplicar las entradas de los handoffs.

## 2. Catálogo de herramientas

- [x] 2.1 Reestructurar `site/src/data/stack.ts`: registro de categorías con herramientas tipadas y derivación de `toolCategories` por capa.
- [x] 2.2 Añadir las siete categorías nuevas, las de política como código con las herramientas de `/path` y los índices curados.
- [x] 2.3 Rehacer `site/src/pages/resources/tools.astro` (título "Tool categories", metadatos, filtros) y enlazar las herramientas en `ToolsTable.astro`.
- [x] 2.4 Crear `site/public/catalogue-filter.js` (filtros CSP-safe, mejora progresiva, contador `aria-live`).

## 3. Lista de lectura

- [x] 3.1 Ampliar `bok/10-reading-list.md` con libros, cursos, artículos canónicos, guía de reguladores y las entradas de los handoffs, con etiquetas de audiencia y jurisdicción en todas.
- [x] 3.2 Extraer las etiquetas en `site/src/lib/reading-list.ts` y mostrarlas en `ReadingList.astro`.
- [x] 3.3 Añadir los filtros a `site/src/pages/resources/reading-list.astro` y documentar la decisión de canonical.

## 4. Registros compartidos

- [x] 4.1 Añadir las filas nuevas a `sources/SOURCES.md` (sección propia).
- [x] 4.2 Añadir las viñetas a `bok/CHANGELOG.md` bajo "Unreleased (v0.5.0)".

## 5. Pruebas, build y entrega

- [x] 5.1 Actualizar `site/tests/data.spec.ts` y `site/tests/resources.spec.ts`.
- [x] 5.2 Ejecutar `bash D:/Documents/aige-wt/build.sh` hasta que salga con código 0.
- [x] 5.3 Ejecutar `openspec validate catalogues-tools-and-reading --strict` hasta que pase.
- [x] 5.4 Escribir `D:/Documents/aige-wt/handoffs/b-catalogues.json`.
