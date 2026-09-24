# Proposal

## Why

El Body of Knowledge pasa de 11 a 24 capítulos organizados en cinco partes (`chapterParts` en
`site/src/data/chapters.ts`: la disciplina, referencia, fundamentos, ciclo de vida, derecho y
normas). La navegación, la portada y el índice `/bok` siguen pensados para once capítulos: el panel
de escritorio y el sitemap del footer muestran una lista plana de 24 filas, la portada dice
"Eleven chapters" y pinta 24 tarjetas seguidas, el índice no dice a qué parte pertenece cada
capítulo y las rutas de lectura no tocan los capítulos nuevos. El grupo Reference no enlaza los
recursos nuevos (contratos, atlas de daños, casos, plantillas y esquemas), y el test del footer
falla porque hay rutas publicadas sin enlace.

Para ser la referencia del campo, el sitio además tiene que explicar cómo trabaja: cómo elige y
etiqueta sus fuentes, cómo mantiene las fechas, cómo se corrige y cómo se versiona. Hoy eso está
repartido entre `STYLEGUIDE.md`, `CONTRIBUTING.md`, el prefacio y `sources/SOURCES.md`, fuera del
sitio. Tampoco hay formularios para reportar un error o proponer filas, términos o casos, ni una
política de roles de autoría y revisión.

## What Changes

- **Navegación por partes** (`site/src/data/parts.ts` nuevo, `site/src/data/nav.ts`): el grupo Body
  of Knowledge agrupa sus capítulos por parte (título, rango de capítulos, capítulos); el panel de
  escritorio los muestra en columnas por parte, el drawer móvil dentro de un único desplegable con
  subtítulos por parte, el footer en un bloque de partes a todo lo ancho y el carril lateral de los
  capítulos con un rótulo por parte. La descripción del grupo sale de los datos.
- **Reference** gana Contracts, Harms atlas, Cases y Templates & schemas; **About** gana
  Methodology.
- **Portada**: la sección de capítulos presenta las cinco partes (título y conteo desde los datos,
  sin "Eleven chapters"), destaca Foundations, The lifecycle y Law and standards; las tarjetas de
  recursos incluyen el Topic Crosswalk y el mapa; el formulario de newsletter entra en una sección
  propia antes de la banda final. Hero, bucle y bandas no cambian.
- **Índice `/bok`**: capítulos agrupados por parte con una línea de introducción por parte, saltos
  a cada parte y rutas de lectura que incluyen los capítulos nuevos (siguen siendo tres lectores).
- **Hub `/resources`**: tarjetas nuevas para contratos, atlas de daños, casos y plantillas.
- **`/about/methodology`** (nuevo): selección y etiquetado de fuentes, fechas "as of", cadencia de
  revisión, qué comprueba la build, correcciones y contribuciones (con los formularios), versionado
  y DOI. Solo hechos comprobables en el repositorio. Enlazada desde `/about` y en `SOURCE_BY_PATH`.
- **`bok/CONTRIBUTORS.md`**: sección de política con los roles de autor, revisor y colaborador y
  cómo se acredita a los revisores, sin nombres nuevos.
- **Formularios de issue** (`.github/ISSUE_TEMPLATE/`): reportar un error en una página (con URL),
  proponer una fila de obligación, proponer un término de glosario, proponer un caso. Se conservan
  los dos existentes.
- **Newsletter**: el formulario existente también en la portada y al final de cada capítulo.
- **Eventos de Umami**: atributos `data-umami-event` (sin scripts nuevos) en descargas del footer y
  del PDF, envío de la newsletter, apertura de la búsqueda y botones de citar/copiar.
- **Tests**: `nav.spec`, `home.spec`, `loop.spec`, `resources.spec` y `seo-infra.spec`
  alineados con lo anterior y un `shell-parts.spec` nuevo; conteos derivados de los datos o del
  `dist`.
- Fuera de alcance (van al handoff): enlaces a rutas que otros bloques crean en paralelo
  (`/obligations`, `/patterns`, `/figures`, `/toolkit`, `/glossary/<term>`, `/agents`, `/api/v1`,
  `/resources/data`), atributos de Umami en páginas de otros bloques y en `Doc.astro`, y la
  declaración de independencia de la página de metodología.

## Capabilities

### New Capabilities
- `book-parts`: presentación de los capítulos por partes en la portada y en el índice `/bok`, con
  conteos derivados de los datos y rutas de lectura.
- `editorial-methodology`: la página `/about/methodology`, la política de roles de
  `bok/CONTRIBUTORS.md` y los formularios de issue.
- `reader-engagement`: ubicación del formulario de newsletter y eventos declarativos de Umami.

### Modified Capabilities
- `site-navigation`: modelo agrupado por partes, grupos Reference y About ampliados, cobertura del
  footer con páginas de detalle enlazadas desde su índice.
- `section-backdrop`: la sección de capítulos de la portada cambia de título y se añade la sección
  de newsletter, con su mesh.

## Impact

- Código: `site/src/data/parts.ts` (nuevo), `site/src/data/nav.ts`,
  `site/src/components/{Header,Footer,SidebarNav,NewsletterForm,Citation,BookParts}.astro`,
  `site/src/pages/{index,role,stack}.astro`, `site/src/pages/bok/{index,[slug]}.astro`,
  `site/src/pages/resources/index.astro`, `site/src/pages/about/{index,methodology}.astro`.
- Registros compartidos: `site/astro.config.ts` (`SOURCE_BY_PATH`), `sources/SOURCES.md`,
  `bok/CHANGELOG.md`.
- Repositorio: `bok/CONTRIBUTORS.md`, `.github/ISSUE_TEMPLATE/*.yml`.
- Tests: `site/tests/{nav,home,loop,resources,seo-infra,shell-parts}.spec.ts`.
- Sin dependencias nuevas ni scripts nuevos en el cliente; la CSP no cambia.
