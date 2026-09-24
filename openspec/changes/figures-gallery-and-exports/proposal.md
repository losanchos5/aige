# Proposal

## Why

Las figuras del Body of Knowledge solo existen dentro de los capítulos: no tienen una URL propia,
no se pueden descargar en un formato reutilizable y quien las copia no recibe una atribución CC BY
lista para pegar. Para que el sitio sea la referencia de AI governance, cada figura tiene que poder
citarse (permalink, referencia, BibTeX, JSON-LD) y reutilizarse (SVG y PNG con la atribución dentro
de la imagen) sin que nadie tenga que hacer capturas de pantalla. Además, una figura con contenido
fechado (plazos, estados) tiene que decir "as of" en la propia imagen, porque una exportación viaja
sin el capítulo que la fecha.

## What Changes

- **`FigureDef` (`site/src/data/figures.ts`)**: campos opcionales `asOf`, `reviewBy` (fechas ISO),
  `license`, `kind` (`infographic`, `data-viz`, `poster`, con presupuestos de 12, 12 y 48 KB),
  `pages` (rutas del sitio que muestran la figura fuera de los capítulos) y `data` (la tabla HTML
  alternativa de una data-viz). Helpers puros para los nombres de fichero versionados de las
  exportaciones, la licencia por defecto y los capítulos de una figura. `art73-clock` pasa a estar
  fechada (`asOf: 2026-09-24`) e imprime "As of 2026-09-24" dentro del SVG; `discipline-map` pasa a
  `kind: 'poster'` con `pages: ['/map']`.
- **Exportaciones en la build (`site/scripts/figures-build.mjs` + `site/scripts/lib/`)**: para cada
  figura, un SVG autónomo (claro y oscuro por `prefers-color-scheme`, fuentes declaradas, enlaces
  absolutos, metadatos CC en RDF), un SVG claro y uno oscuro fijos, y PNG claro y oscuro a 1600 y
  3200 px renderizados con `@resvg/resvg-js` (ya instalado) sobre las fuentes del propio sitio,
  decodificadas de WOFF/WOFF2 a TTF en memoria. Todas llevan la banda "aigovernanceengineer.com ·
  CC BY 4.0 · v<bokVersion>" y los PNG llevan metadatos `tEXt`. Salida en
  `site/public/downloads/figures/<id>-v<version>[-tema][-ancho].<ext>`, ignorada por git; una caché
  por hash evita re-renderizar lo que no ha cambiado. La build valida presupuestos, fechas y el
  "as of" dentro de la imagen, y avisa cuando una figura pasa su `reviewBy`.
- **Galería `/figures` y permalinks `/figures/<id>`**: la galería agrupa por parte y capítulo las
  infografías (con miniatura clara u oscura según el tema) y los diagramas archify de
  `diagrams.ts` (con enlace a su visor `/diagrams/<id>`). Cada permalink muestra la figura, su
  leyenda, la alternativa textual, dónde aparece, las descargas, fragmentos para incrustar (HTML
  `img` + `figcaption` con atribución CC BY completa, y Markdown), un bloque `FigureCite` propio y
  JSON-LD `ImageObject` (`license`, `acquireLicensePage`, `creditText`, `creator`,
  `dateModified`). Copia al portapapeles con `/figure-cite.js` (CSP `script-src 'self'`).
- **`site/VISUAL-GUIDE.md`**: secciones nuevas de data-viz (ejes, escalas, línea de fuente,
  "as of", tabla HTML alternativa), pósteres y exportaciones (tamaños serie A, banda de atribución,
  exportaciones claras y oscuras) y widgets interactivos (sin JS, aviso de no asesoramiento legal,
  movimiento, presupuestos de 12 KB por infografía, 48 KB por póster y 15 KB gzip por script).
- **`site/scripts/content-lint.mjs`**: la regla de la raya y las frases prohibidas se extienden a
  `dist/**/*.svg`, `*.json`, `*.csv`, `*.txt` y a las descargas generadas.
- **Registros compartidos**: rutas en `SOURCE_BY_PATH`, fila en `bok/CHANGELOG.md`, sección en
  `sources/SOURCES.md` para las fuentes de la guía visual y de la página de reutilización.
- Fuera de alcance (van al handoff): entrada de navegación y pie, tarjeta en `/resources`, enlaces
  desde los capítulos, un `id` por figura en `rehype-diagrams`, cabeceras en `_headers`, y las
  actualizaciones de `nav.spec.ts`, `seo-infra.spec.ts` y `seo-basics.spec.ts`.

## Capabilities

### New Capabilities
- `figure-exports`: metadatos de figura, exportaciones SVG/PNG versionadas con atribución, fuentes
  y presupuestos, y la guía visual que las rige.
- `figures-gallery`: la galería `/figures`, los permalinks `/figures/<id>`, los fragmentos de
  incrustación, `FigureCite` y el JSON-LD `ImageObject`.

### Modified Capabilities
- `no-em-dash`: el lint de contenido cubre también SVG, JSON, CSV y TXT publicados.

## Impact

- **Nuevos**: `site/scripts/lib/woff.mjs`, `site/scripts/lib/figure-export.mjs`,
  `site/src/lib/figure-downloads.ts`, `site/src/components/FigureCite.astro`,
  `site/src/pages/figures/index.astro`, `site/src/pages/figures/[id].astro`,
  `site/public/figure-cite.js`, `site/tests/figures-gallery.spec.ts`.
- **Modificados**: `site/src/data/figures.ts`, `site/src/figures/art73-clock.svg` (línea "As of"),
  `site/scripts/figures-build.mjs`, `site/scripts/content-lint.mjs`, `site/VISUAL-GUIDE.md`,
  `site/astro.config.ts` (un bloque en `SOURCE_BY_PATH`), `.gitignore`, `bok/CHANGELOG.md`,
  `sources/SOURCES.md`.
- Sin dependencias nuevas; `node_modules` no cambia. Sin cambios en `bok/*.md` ni en los encabezados
  de ningún capítulo.
- Las correspondencias con obligaciones de las figuras siguen siendo ilustrativas, no una
  declaración de conformidad ni asesoramiento jurídico.
