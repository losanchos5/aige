# Proposal

## Why

El sitio tiene ya 24 capítulos, un catálogo de patrones con páginas propias, un registro de
obligaciones con ids estables, una API de datos abiertos, plantillas y esquemas, figuras, casos y un
toolkit. Para quien llega por primera vez es demasiado: un ingeniero, un CISO, una DPO, un consejo de
administración, un organismo público o una pyme buscan cosas distintas y en otro orden, y hoy nada
les dice por dónde empezar. La ruta de aprendizaje (`/path`) sirve a quien quiere convertirse en
ingeniero de gobernanza, no a quien necesita resolver su trabajo con el sitio.

La portada tampoco dice qué aplica ya del Reglamento europeo de IA ni qué viene después, aunque el
registro de obligaciones (`site/src/data/frameworks.ts`) tiene esas fechas fila a fila.

## What Changes

- **Datos** (`site/src/data/audiences.ts`, nuevo): seis audiencias (engineers, ciso-risk,
  legal-dpo, executives-board, public-sector, smes). Cada una con a quién va dirigida, las tres
  preguntas que trae (respuesta breve con fuentes numeradas y enlace a la sección del BoK que la
  responde entera), una ruta curada por fases (capítulos con ancla, patrones, herramientas del
  toolkit, plantillas, datasets, figuras, casos y páginas de referencia), acciones "start this
  week" y las obligaciones del registro que más le importan. Las fechas nunca se teclean: un token
  `{date:<id>}` o `{date:<id>|<texto>}` las lee del registro.
- **Resolución y validación** (`site/src/lib/audiences.ts`, nuevo): títulos de patrones, figuras,
  casos y herramientas desde sus propios registros; la build falla si un ancla de capítulo no es un
  encabezado, si un patrón, figura, caso, nodo de `/path` u obligación no existe, si un marcador
  `[n]` no tiene fuente o una fuente no se cita, o si aparece una raya (em dash). Una herramienta
  del toolkit se muestra solo cuando `toolkit.ts` la marca `live`, así las herramientas que se
  construyen en paralelo aparecen solas al publicarse y nunca dejan un enlace roto.
- **Páginas**: `/for` (índice con una tarjeta por ruta, las preguntas de cada audiencia lado a lado
  y otras entradas) y `/for/<slug>` para las seis audiencias, renderizadas por
  `site/src/components/AudienceHub.astro`. `/for/aigp` y `/for/certifications` son de otro bloque:
  el índice y las páginas las enlazan solo cuando su fichero existe.
- **Portada**: banda compacta "What applies now" (`site/src/components/WhatAppliesNow.astro`,
  cálculo en `site/src/lib/applies-now.ts`): qué artículos del Reglamento de IA aplican ya y las
  tres próximas fechas con lo que activa cada una, todo leído del registro y enlazado a
  `/obligations/<id>`. Un único componente insertado en un solo punto de `index.astro`, sin script,
  con el mesh `a` que no usan sus vecinos.
- **Registros compartidos**: bloque propio en `SOURCE_BY_PATH` (`site/astro.config.ts`), sección en
  `sources/SOURCES.md` y viñetas en `bok/CHANGELOG.md`.
- **Tests**: `site/tests/audiences.spec.ts` (datos, validación y cálculo de fechas con una fecha
  fija).
- Fuera de alcance (handoff): el grupo "For you" de la navegación, las entradas por audiencia en
  `/path` (el bloque "Three ways in" de `path.ts` refleja `role.waysIn` y su H2 no se puede
  renombrar), las herramientas del toolkit que se construyen en paralelo y la fecha de la portada
  en `SOURCE_BY_PATH`.

## Capabilities

### New Capabilities
- `audience-hubs`: el índice `/for` y una página por audiencia con preguntas, ruta, acciones y
  obligaciones, validadas en build contra los registros del sitio.
- `home-applies-now`: la banda "What applies now" de la portada, calculada desde el registro de
  obligaciones.

### Modified Capabilities
- Ninguna.

## Impact

- Código nuevo: `site/src/data/audiences.ts`, `site/src/lib/audiences.ts`,
  `site/src/lib/applies-now.ts`, `site/src/components/AudienceHub.astro`,
  `site/src/components/WhatAppliesNow.astro`, `site/src/pages/for/index.astro`,
  `site/src/pages/for/[slug].astro`.
- Código modificado: `site/src/pages/index.astro` (un import y una línea).
- Registros compartidos: `site/astro.config.ts` (`SOURCE_BY_PATH`), `sources/SOURCES.md`,
  `bok/CHANGELOG.md`.
- Tests: `site/tests/audiences.spec.ts`.
- Sin dependencias nuevas ni scripts en el cliente; la CSP no cambia.
