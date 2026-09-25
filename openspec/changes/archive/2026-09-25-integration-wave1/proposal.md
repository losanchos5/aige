# Proposal

## Why

La ola 1 de la ampliación v0.5.0 se integró en `feat/expansion-w1` bloque a bloque: registro de
obligaciones y API abierta, patrones como páginas, navegación por partes, galería de figuras,
toolkit, glosario con una página por término, crosswalk v2, capítulo 23 y monitor regulatorio.
Cada bloque trabajó en su worktree y dejó en su handoff lo que tocaba a ficheros compartidos del
armazón del sitio. Sin esa pasada, la rama queda incoherente: la navegación no llega a `/obligations`,
`/patterns`, `/figures`, `/toolkit`, `/agents` ni `/resources/data`; el test del footer falla con
cientos de páginas de detalle; el glosario se enlaza en una ruta que el host redirige; el crosswalk
une filas de obligación por su texto literal, que se rompe al reformular una fila; los enlaces de
descarga pierden el evento de analítica; y el estado de las herramientas del toolkit, que vive en el
fragmento de la URL, podría salir del navegador por la analítica.

## What Changes

- **Navegación** (`site/src/data/nav.ts`): Practice gana Patterns (`/patterns`), Toolkit y Agents;
  Reference gana Obligations, Figures y Open data & API, y Glossary apunta a `/bok/glossary`, que
  además ilumina las páginas `/glossary/<slug>` (campo `owns`). El footer enlaza el catálogo de la
  API. `nav.spec` cuenta las colecciones de detalle (`/obligations/`, `/patterns/`, `/figures/`,
  `/glossary/`, `/toolkit/`) por su índice y excluye las rutas que el host redirige.
- **Sitemap y canonical**: `Base.astro` acepta `canonical`; `/resources/reading-list` declara
  `/bok/reading-list` y `/resources/glossary` declara `/bok/glossary`. `src/lib/sitemap-policy.ts`
  deja ambas fuera del sitemap y `seo-infra.spec` cuenta con la misma función.
- **Hub `/resources` y portada**: tarjetas nuevas (registro de obligaciones, figuras, toolkit, datos
  abiertos y API) con conteos calculados; la portada enlaza el registro y el glosario del libro.
- **llms.txt**: sección Practice (toolkit, agentes), recursos nuevos, metodología, y una sección
  `Optional` con cada página de obligación, figura y término.
- **Analítica**: Umami con `data-exclude-hash` y `data-exclude-search`; evento `search-open` en los
  botones de búsqueda de `Doc.astro` y `404.astro`; los enlaces `download` llevan `target="_blank"`,
  `rel="noopener"` y el evento `download`.
- **Figuras**: variante de dos columnas de values-principles (`values-principles-wide.svg`), pie de
  regulatory-wave actualizado, once briefs en `VISUAL-GUIDE.md` §2.3, `id="figure-<id>"` y enlace de
  permalink en cada pie de infografía, "Where it appears" enlaza la figura, `/map` enlaza
  `/figures/discipline-map#downloads`, caché de `/downloads/figures/*` y CORS de `/fonts/*`.
- **Obligaciones**: `ObligationTable` enlaza cada fila a `/obligations/<id>` con su id y cada patrón a
  `/patterns/<slug>`; `frameworks.astro` enlaza el registro, la API y `/resources/data`; el crosswalk
  une por `obligationId` (el texto queda como unión heredada) y enlaza la página de la obligación;
  los casos llevan `obligationId` opcional; la API publica `slug`/`section` de los patrones y la
  página propia de cada término.
- **Datos y textos**: resumen y "At a glance" del capítulo 23; Open Graph de toolkit, obligaciones,
  figuras y datos; bloque propio en `SOURCE_BY_PATH` (explorer del crosswalk, hub, portada, `/bok`).
- **Documentación**: STYLEGUIDE §4 con el contrato de frontmatter de los patrones, CONTRIBUTING,
  README, OUTLINE, CONTRIBUTORS (paso 1) y DESIGN.md (banda de newsletter, BookParts); se borra
  `ChapterGrid.astro`.
- **Metodología y CI**: `/about/methodology` enlaza el monitor regulatorio y los datos abiertos;
  `ci.yml` ejecuta los tests del monitor.
- **Tests**: se reponen los lados descartados de `resources.spec.ts` (b-catalogues y
  b-data-crosswalk), se activa el test de canonical y se alinean `block-c`, `shell`, `nav`,
  `data`, `llms`, `map-page`, `layout` y `lighthouserc` con lo anterior.

## Capabilities

### New Capabilities
- `site-integration`: destinos v0.5.0 en la navegación, cobertura del footer por colecciones,
  política de sitemap y canonical, hub y llms.txt, y privacidad de la analítica.
- `figure-permalinks`: anclas `figure-<id>`, enlace al permalink desde cada pie y variante ancha.
- `obligation-links`: unión por id estable entre crosswalk, casos, tabla de obligaciones y registro.

### Modified Capabilities
- Ninguna.

## Impact

- Código: `site/src/data/{nav,crosswalk,cases,chapters,path,diagrams}.ts`, `site/src/lib/{api,obligations,figure-reuse,rehype-diagrams,sitemap-policy}.ts`,
  `site/src/layouts/{Base,Doc}.astro`, `site/src/components/{Figure,ObligationTable}.astro`, páginas
  del hub, crosswalk, frameworks, casos, figuras, mapa, metodología, llms.txt y OG,
  `site/scripts/figures-build.mjs`, `site/public/_headers`, `site/astro.config.ts`,
  `.github/workflows/ci.yml`.
- Datos publicados: `crosswalk.json` añade `obligationId` y `obligationUrl`; `crosswalk.csv` añade la
  columna `Obligation ID`; `/api/v1/patterns.json` añade `slug` y `section`; `/api/v1/glossary.json`
  añade `anchor` y su `url` pasa a la página del término. Solo se añaden campos (misma
  `schemaVersion`).
- Fuera de alcance: `frameworks.ts` y las tablas del capítulo 08, el capítulo 05 y
  `bok/patterns/*`, `obligations/[id].astro` y la prosa de los capítulos 01 a 23 (otros bloques).
