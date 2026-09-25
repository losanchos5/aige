# Tasks

Worktree `D:/Documents/aige-wt/int`, rama `feat/expansion-w1` (rama de integración, un único
escritor). La build solo se lanza con `bash D:/Documents/aige-wt/build.sh`. Handoff en
`D:/Documents/aige-wt/handoffs/w2-integrator.json`.

## 1. Armazón del sitio

- [x] 1.1 `nav.ts`: Practice gana Patterns (`/patterns`, que ilumina `/patterns/*`), Toolkit y Agents; Reference gana Obligations, Figures y Open data & API; Glossary apunta a `/bok/glossary` y posee `/glossary/` (`owns`).
- [x] 1.2 Footer: sitemap coherente con la navegación y enlace al catálogo `/api/v1/index.json`.
- [x] 1.3 `Base.astro` acepta `canonical`; `/resources/reading-list` y `/resources/glossary` declaran la página del libro; `src/lib/sitemap-policy.ts` las deja fuera del sitemap.
- [x] 1.4 Umami con `data-exclude-hash` y `data-exclude-search`; `data-umami-event="search-open"` en los botones de búsqueda de `Doc.astro` y `404.astro`; enlaces `download` con `target`, `rel` y evento `download`.
- [x] 1.5 `Citation.astro` recupera los atributos de evento del bloque de navegación (`kind`, `type`, `chapter`).

## 2. Hub, portada, llms.txt y Open Graph

- [x] 2.1 Tarjetas del hub `/resources`: registro de obligaciones, datos abiertos y API, figuras y toolkit, con conteos calculados de los datos.
- [x] 2.2 `llms.txt`: `/about/methodology`, `/figures`, `/toolkit`, `/obligations`, `/resources/data`, `/agents`, `/patterns` y las páginas de término, obligación y figura.
- [x] 2.3 Tarjetas OG de `/toolkit`, `/obligations`, `/figures` y `/resources/data`.
- [x] 2.4 Resumen y "At a glance" del capítulo 23 en `chapters.ts` desde el handoff `b-c23-agents`.

## 3. Figuras

- [x] 3.1 Parche de dos columnas de values-principles (`figures-build.mjs`, `rehype-diagrams.ts`, `figures.css`) y `values-principles-wide.svg`.
- [x] 3.2 Pie de regulatory-wave con las fechas del Omnibus.
- [x] 3.3 Los once briefs de figura en `VISUAL-GUIDE.md` §2.3.
- [x] 3.4 `id="figure-<id>"` y enlace a `/figures/<id>` en cada pie; `placementPlace()` apunta a `#figure-<id>`.
- [x] 3.5 `_headers`: caché de `/downloads/figures/*` y CORS de `/fonts/*`; `/map` enlaza `/figures/discipline-map#downloads`.

## 4. Obligaciones y crosswalk

- [x] 4.1 `ObligationTable` enlaza cada fila a `/obligations/<id>` con su id; `frameworks.astro` enlaza `/obligations`, la API y `/resources/data`.
- [x] 4.2 `crosswalk.ts` y `crosswalk.astro` unen por `obligationId` y enlazan `/obligations/<id>`; JSON y CSV publican el id.
- [x] 4.3 `cases.ts` con `obligationId` opcional enlazado.
- [x] 4.4 `SOURCE_BY_PATH` con `public/crosswalk-explorer.js` para `/resources/crosswalk` (bloque propio).

## 5. Documentación y CI

- [x] 5.1 STYLEGUIDE §4, CONTRIBUTING, README y OUTLINE describen los patrones como un fichero cada uno.
- [x] 5.2 CONTRIBUTORS paso 1; DESIGN.md con la banda de newsletter y BookParts; se borra `ChapterGrid.astro`.
- [x] 5.3 `/about/methodology` enlaza `tools/reg-monitor` en GitHub; `ci.yml` ejecuta sus tests (`node --test` con glob, Node 22); `normalise.mjs` pasa `node --check`.

## 6. Tests y suites

- [x] 6.1 Reponer los lados descartados de `resources.spec.ts` (b-catalogues y b-data-crosswalk) y activar el test de canonical.
- [x] 6.2 Alinear `nav.spec` (colecciones de detalle y redirecciones), `block-c`, `shell`, `seo-infra`, `data`, `llms`, `map-page`, `layout` y `lighthouserc`.
- [x] 6.3 Suite `default` completa en verde (puerto 4410).
- [x] 6.4 Suite `a11y` completa en verde.
- [x] 6.5 Suite `visual` ejecutada y capturas de las páginas nuevas revisadas a 390 y 1440.
- [x] 6.6 `lhci autorun` al final.
- [x] 6.7 `openspec validate integration-wave1 --strict` en verde.
