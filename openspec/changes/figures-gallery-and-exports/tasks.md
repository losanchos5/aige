# Tasks

Worktree `D:/Documents/aige-wt/b-figures-system`, rama `wt/b-figures-system`. La build solo se
lanza con `bash D:/Documents/aige-wt/build.sh`.

## 1. Metadatos de figura

- [x] 1.1 Añadir a `FigureDef` los campos opcionales `asOf`, `reviewBy`, `license`, `kind`, `pages` y `data`, con los helpers puros de nombres de exportación, licencia y capítulos.
- [x] 1.2 Fechar `art73-clock` (`asOf`, `reviewBy`) e imprimir "As of" dentro de su SVG; marcar `discipline-map` como póster con `pages: ['/map']`.

## 2. Exportaciones

- [x] 2.1 Decodificar WOFF/WOFF2 a TTF sin dependencias (`site/scripts/lib/woff.mjs`) y comprobar que resvg dibuja el texto con las fuentes del sitio.
- [x] 2.2 Resolver los tokens de `tokens.css` y las reglas `.figc` de `figures.css` a hex claro y oscuro y construir el SVG autónomo (banda de atribución, enlaces absolutos, fuentes declaradas, metadatos CC).
- [x] 2.3 Renderizar PNG claro y oscuro a 1600 y 3200 px con fragmentos `iTXt` de licencia, con caché por hash, desde `figures-build.mjs`.
- [x] 2.4 Validar en la build presupuestos por tipo, formato de fechas, "as of" dentro de la imagen y aviso de `reviewBy` vencido.
- [x] 2.5 Ignorar `site/public/downloads/figures/` y la caché en `.gitignore`.

## 3. Galería y permalinks

- [x] 3.1 Crear `site/src/lib/figure-reuse.ts` (descargas existentes, tamaños, dimensiones, lugares y créditos) y `site/src/components/FigureCite.astro`.
- [x] 3.2 Crear `/figures` agrupada por parte y capítulo, con infografías y diagramas archify.
- [x] 3.3 Crear `/figures/<id>` con figura, leyenda, alternativa textual, dónde aparece, descargas, fragmentos de incrustación, cita y JSON-LD `ImageObject`.
- [x] 3.4 Añadir `site/public/figure-cite.js` para copiar al portapapeles sin JS en línea.
- [x] 3.5 Añadir las rutas a `SOURCE_BY_PATH` en `site/astro.config.ts` como un bloque propio.

## 4. Guía visual y lint

- [x] 4.1 Añadir a `site/VISUAL-GUIDE.md` las secciones de data-viz, pósteres y exportaciones, y widgets interactivos.
- [x] 4.2 Extender `content-lint.mjs` a SVG, JSON, CSV y TXT publicados y a las descargas generadas.

## 5. Registros, pruebas y cierre

- [x] 5.1 Añadir `site/tests/figures-gallery.spec.ts` (se ejecuta centralmente).
- [x] 5.2 Añadir la entrada en `bok/CHANGELOG.md` y la sección de fuentes en `sources/SOURCES.md`.
- [x] 5.3 Ejecutar `bash D:/Documents/aige-wt/build.sh` con salida 0 y `openspec validate figures-gallery-and-exports --strict`.
- [x] 5.4 Escribir el handoff `D:/Documents/aige-wt/handoffs/b-figures-system.json`.
