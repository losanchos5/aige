# Proposal

## Why

El capítulo 03 pide "empezar por un modo de fallo o un daño con nombre", pero el sitio no tiene un
catálogo de daños: solo nombra amenazas de seguridad y de agentes, y enlaza las bases de incidentes
(AIID, AIAAIC, OECD AIM) sin resumirlas. Para ser una referencia de gobernanza de IA, el sitio
necesita un vocabulario de daños por nivel (individuo, grupo, organización, sociedad, medio
ambiente) con incidentes reales verificados, y casos documentados contados como post-mortems de
ingeniería: qué pasó, qué modo de fallo, qué control o patrón lo habría detectado, qué evidencia
habría existido y qué obligaciones toca hoy.

## What Changes

- **Atlas de daños** (`/resources/harms`): nuevo dataset tipado `site/src/data/harms.ts` con filas
  por nivel, tipo de daño, mecanismo, descripción propia, incidentes de ejemplo verificados (AIID,
  AIAAIC, OECD AIM), modo de fallo, patrón que lo controla (ancla existente de `/bok/patterns`
  cuando la hay, nombre en otro caso), capas del stack y dominio/subdominio de la taxonomía del MIT
  AI Risk Repository (CC BY 4.0, con atribución). Página accesible con filtro por nivel en CSS puro
  (radio + `:has()`, sin JavaScript en línea) y exportación JSON en `/resources/harms.json`.
- **Casos** (`/cases` y `/cases/<id>`): nuevo dataset tipado `site/src/data/cases.ts` con 11 casos
  públicamente documentados, cada uno verificado contra fuentes primarias (sentencias, reguladores,
  informes oficiales, el artículo original) o marcado como `reported` cuando solo hay prensa, y
  enlazado a su registro en AIID (o AIAAIC / OECD AIM). Índice y páginas estáticas por caso con
  fuentes numeradas.
- **Sitemap**: las rutas nuevas (y una por caso) entran en `SOURCE_BY_PATH` de
  `site/astro.config.ts` para su `lastmod`.
- **JSON-LD**: `Dataset` para el atlas y `Article` para cada caso, con el helper existente
  `site/src/lib/jsonld.ts` y migas de pan.
- Fuera de alcance: entradas de navegación, tarjeta en el hub de Resources, enlaces cruzados desde
  otros capítulos y términos de glosario; se entregan en el handoff para que los aplique el
  orquestador.

## Capabilities

### New Capabilities
- `harms-atlas`: el dataset de daños, la página `/resources/harms` con su filtro y la exportación JSON.
- `incident-cases`: el dataset de casos y las páginas `/cases` y `/cases/<id>`.

### Modified Capabilities
- (ninguna)

## Impact

- **Sitio** (`site/`): nuevos `src/data/harms.ts`, `src/data/cases.ts`, `src/lib/sources.ts`,
  `src/pages/resources/harms.astro`, `src/pages/resources/harms.json.ts`,
  `src/pages/cases/index.astro`, `src/pages/cases/[id].astro`, `src/styles/harms.css`,
  `src/components/CitedText.astro` y `src/components/SourceList.astro`. Modificado:
  `astro.config.ts` (`SOURCE_BY_PATH`).
- **Ficheros compartidos no tocados**: `nav.ts`, `chapters.ts`, `frameworks.ts`, `crosswalk.ts`,
  capítulos y glosario; sus cambios van en `D:/Documents/aige-wt/handoffs/x-harms-cases.json`.
- **Verificación**: `bash D:/Documents/aige-wt/build.sh` (astro check, build, content-lint,
  check-links, pagefind) en verde.
