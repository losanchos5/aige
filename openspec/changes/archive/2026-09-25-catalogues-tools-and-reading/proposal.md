# Proposal

## Why

Los capítulos 11-22 de la v0.5.0 citan categorías de herramientas que el catálogo de
`/resources/tools` no tiene (validación de datos, versionado de datos y experimentos, fairness,
explicabilidad, monitorización y deriva, entrega progresiva, firma de modelos y escaneo de
artefactos), y `/path` enlaza herramientas (Conftest, OPA Gatekeeper, Kyverno, Rego Playground) que
el catálogo no lista. Cada ejemplo es hoy una cadena sin URL, licencia ni fecha de revisión, así que
el lector no puede saber si es código abierto, si sigue vivo o dónde está. La lista de lectura, por
su parte, no tiene libros, cursos ni los artículos canónicos (Datasheets for Datasets, Model Cards,
Raji et al. 2020, el AI Index), y los bloques de capítulos dejaron en sus handoffs lecturas que
todavía no están en ella. Para ser la referencia de gobernanza de IA, ambos catálogos tienen que
ser completos, verificados y filtrables.

## What Changes

- **Catálogo de herramientas** (`site/src/data/stack.ts`): cada herramienta de ejemplo pasa a ser
  un registro con URL verificada, licencia (identificador SPDX cuando existe), tipo de acceso
  (código abierto, estándar abierto, código disponible, comercial, servicio gratuito), capas,
  `lastChecked` 2026-09-24 y enlace al OECD.AI Catalogue of Tools & Metrics cuando hay entrada.
  Siete categorías nuevas que citan los capítulos 14-16, tres categorías de política como código
  que cubren las herramientas de `/path`, y una sección de índices curados. Las categorías de cada
  capa se derivan de los registros, de modo que `/stack`, el mapa y `/resources/tools` leen una
  sola fuente. Los ejemplos genéricos de la categoría "Kill switch / circuit breaker" pasan a ser
  herramientas reales.
- **Página `/resources/tools`**: título "Tool categories", filtros por capa y por licencia con un
  script CSP-safe en `public/catalogue-filter.js` (mejora progresiva: sin JavaScript se ve todo),
  enlace a cada herramienta y al capítulo que cita la categoría. Se mantiene "examples, not
  endorsements".
- **Lista de lectura** (`bok/10-reading-list.md`): libros, cursos, artículos canónicos, guía de
  reguladores y todas las entradas `reading_list` de los handoffs (sin duplicados), cada una con
  URL verificada y etiquetas de audiencia y jurisdicción en el propio texto del capítulo. Los
  encabezados H2 existentes no cambian; se añaden secciones nuevas.
- **Página `/resources/reading-list`**: filtros por audiencia y jurisdicción con el mismo script.
- **Canonical**: `/bok/reading-list` es el texto canónico. `/resources/reading-list` sigue siendo
  una página propia (mismo contenido, más el filtro) y declara `rel=canonical` hacia
  `/bok/reading-list`; se descarta el 301 porque perdería el filtro y porque `content-lint` exige
  que `/resources/reading-list` se construya. El prop `canonical` de `Base.astro` es de otro
  bloque: el cambio de una línea va al handoff y la página lo pasa en cuanto exista.
- Fuera de alcance: navegación, hub de Resources, `/path`, `llms.txt`, el filtro del sitemap y
  `Base.astro`; van al handoff.

## Capabilities

### New Capabilities
- `tool-catalogue`: el registro tipado de herramientas con metadatos verificados, su derivación a
  las capas del stack y la página `/resources/tools` con filtros.
- `reading-list`: la lista de lectura canónica en `bok/10-reading-list.md` con etiquetas de
  audiencia y jurisdicción, y su vista filtrable en `/resources/reading-list`.

### Modified Capabilities
- (ninguna)

## Impact

- **Sitio** (`site/`): modificados `src/data/stack.ts`, `src/pages/resources/tools.astro`,
  `src/components/ToolsTable.astro`, `src/pages/resources/reading-list.astro`,
  `src/lib/reading-list.ts`, `src/components/ReadingList.astro`, `tests/data.spec.ts` y
  `tests/resources.spec.ts`; nuevo `public/catalogue-filter.js`.
- **Libro**: `bok/10-reading-list.md`, `bok/CHANGELOG.md` y `sources/SOURCES.md` (sección añadida).
- **Ficheros compartidos no tocados**: `Base.astro`, `nav.ts`, `path.ts`, `map.ts`,
  `resources/index.astro`, `resources.css`, `llms.txt`; sus cambios van al handoff
  `D:/Documents/aige-wt/handoffs/b-catalogues.json`.
