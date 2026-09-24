# Proposal

## Why

El sitio explica la disciplina, pero el lector que quiere aplicarla el lunes todavía tiene que
llevarse el capítulo a una hoja de cálculo para usarlo. El modelo de madurez del capítulo 07 es el
caso más claro: define criterios observables por capa y nivel, métricas por salto de nivel y una
lista de autoevaluación, y pide leer el resultado como un perfil irregular por capa con un suelo,
no como una puntuación. Una herramienta que haga esa lectura en el navegador, sin enviar nada a
ningún servidor, convierte el capítulo en algo que se usa.

Además, vendrán más herramientas (otros bloques las están preparando en paralelo). Sin un contrato
común, cada una resolvería de nuevo el aviso legal, el estado en la URL, las descargas, la
impresión, la accesibilidad y la CSP, y el sitio acabaría con seis maneras de hacer lo mismo.

## What Changes

- **Registro** `site/src/data/toolkit.ts`: una entrada por herramienta con `id`, `title`,
  `summary`, `audience`, `inputs`, `outputs`, `status` (`live` o `planned`), `href` y, si procede,
  el capítulo del que sale. Exporta también el aviso fijo `toolNotice`.
- **Índice** `/toolkit` (`site/src/pages/toolkit/index.astro`): lista el registro, enlaza solo las
  herramientas `live` y explica las convenciones compartidas (todo en el navegador, estado en el
  enlace, exportaciones en formatos abiertos con sus RFC citadas, impresión).
- **Componente** `site/src/components/toolkit/ToolShell.astro`: título y entradilla (PageHero de
  referencia con migas), el aviso fijo "Indicative, not legal advice and not a conformity claim.
  Nothing you enter leaves your browser.", un aviso sin JavaScript que remite al contenido
  didáctico (que se renderiza siempre en el servidor), ranuras para la guía y las fuentes, estilos
  de impresión y la carga del módulo de la herramienta como script externo.
- **Utilidades de cliente** `site/public/toolkit/lib.js` (módulo ES sin dependencias ni código de
  terceros, compatible con la CSP `script-src 'self'`): estado en el fragmento de la URL
  (codificar, decodificar, escribir sin saltos), `localStorage` seguro, descargas con `Blob` y
  `<a download>` (JSON, CSV según RFC 4180, Markdown y un generador `.ics` según RFC 5545 con `UID`,
  `DTSTAMP`, eventos de día completo, escapado y plegado a 75 octetos), copiar al portapapeles y
  exportar a PNG un SVG en línea pasando por un `data:` URL y un `canvas` (la CSP permite `img-src
  data:`, no `blob:`), más ayudas de accesibilidad (región de estado, foco, movimiento reducido).
- **Primera herramienta** `/toolkit/maturity-self-check`: por cada una de las cinco capas, el
  criterio observable más alto que se cumple hoy (o ninguno); el resultado es el perfil irregular
  dibujado en SVG en línea, el suelo (la capa más débil) y un único siguiente paso con su criterio,
  sus métricas, sus preguntas de la lista y el enlace al patrón `/bok/patterns#pattern-*`.
  Exporta un perfil JSON reimportable, un informe Markdown y la imagen en SVG y PNG; guarda
  perfiles en el navegador y compara dos (antes y después); el estado vive en el fragmento de la
  URL. Sin insignias, sellos ni lenguaje de certificado.
- **Datos** `site/src/data/maturity.ts` (solo añadidos): la tabla "Observable criteria, by layer
  and level", las métricas por salto de nivel y la lista de autoevaluación del capítulo 07, con el
  texto del capítulo, más el patrón que lleva cada paso (el que enlaza la celda del capítulo o, si
  la celda no enlaza ninguno, un patrón de la misma capa).
- **Registros compartidos**: dos rutas en `SOURCE_BY_PATH` de `site/astro.config.ts` (un bloque
  contiguo), una sección en `sources/SOURCES.md`, viñetas en `bok/CHANGELOG.md` bajo "Unreleased
  (v0.5.0)".
- **Pruebas**: `site/tests/toolkit.spec.ts` (flujo completo, exportaciones, reimportación,
  comparación, estado en la URL, sin peticiones de red al usar la herramienta, sin JavaScript,
  datos contra el capítulo 07 y unidades de `lib.js`). Se ejecutan de forma central más tarde.
- Fuera de alcance (van al handoff): entrada de navegación, tarjeta en `/resources`, tarjeta Open
  Graph propia, enlaces desde el capítulo 07 y `/role`, recuento de rutas en `seo-infra.spec.ts`,
  entradas en `llms.txt`.

## Contrato para las herramientas siguientes

Toda herramienta nueva de `/toolkit` sigue estas cinco reglas:

1. **Entrada en el registro.** Añade un objeto a `tools` en `site/src/data/toolkit.ts` con `id`
   igual al segmento de la ruta (`/toolkit/<id>`), `status: 'planned'` mientras la página no exista
   (el índice no la enlaza) y `status: 'live'` cuando exista. `inputs` y `outputs` son frases cortas
   que el índice lista tal cual; `chapter` apunta al capítulo del que sale el contenido.
2. **ToolShell.** La página es `site/src/pages/toolkit/<id>.astro` y se envuelve en
   `<ToolShell tool={entry} ...>`: recibe la entrada del registro, pinta migas, título, entradilla y
   el aviso fijo, y carga `/toolkit/<id>.js` como módulo. El formulario va en la ranura por defecto;
   el contenido didáctico, que MUST funcionar sin JavaScript, en la ranura `guide`; las fuentes en
   `sources`. Los datos que necesita el cliente viajan en una isla
   `<script type="application/json" data-tool-data>` (no ejecutable, compatible con la CSP).
3. **lib.js.** El script de la herramienta importa de `/toolkit/lib.js` y no reimplementa estado en
   la URL, almacenamiento, descargas, portapapeles ni exportación de imágenes. Ningún script hace
   peticiones de red con lo que escribe el usuario; no hay scripts en línea ni código de terceros.
4. **Formularios accesibles.** `fieldset` y `legend` por grupo, cada control con su `label`, textos
   de error enlazados con `aria-describedby`, un resumen de errores que recibe el foco, el
   resultado anunciado en una región `role="status"` y el foco llevado a su encabezado; toda
   animación dentro de `prefers-reduced-motion: no-preference`; tokens de `site/DESIGN.md` y ningún
   color fuera de las cinco capas.
5. **Exportaciones con tipo y versión.** Un JSON exportado lleva `kind` (`aige.<tool>`) y
   `version`; al reimportarlo la herramienta valida esos dos campos y recalcula todo lo derivado. Un
   informe Markdown o una imagen repiten el aviso fijo y enlazan la página y el capítulo.

## Capabilities

### New Capabilities
- `governance-toolkit`: el registro de herramientas, el índice `/toolkit`, el contrato común
  (ToolShell, `lib.js`, accesibilidad, exportaciones) y la herramienta de autoevaluación de madurez.

### Modified Capabilities
- (ninguna)

## Impact

- **Nuevos**: `site/src/data/toolkit.ts`, `site/src/components/toolkit/ToolShell.astro`,
  `site/src/components/toolkit/toolkit.css` (estilos comunes y de impresión),
  `site/src/pages/toolkit/index.astro`, `site/src/pages/toolkit/maturity-self-check.astro`,
  `site/public/toolkit/lib.js`, `site/public/toolkit/maturity-self-check.js`,
  `site/public/toolkit/maturity-profile.v1.schema.json`, `site/tests/toolkit.spec.ts`.
- **Modificados**: `site/src/data/maturity.ts` (solo exportaciones nuevas), `site/astro.config.ts`
  (un bloque en `SOURCE_BY_PATH`), `sources/SOURCES.md`, `bok/CHANGELOG.md`.
- Sin dependencias nuevas; `node_modules` no cambia. Sin cambios en `bok/*.md` salvo el changelog
  ni en los encabezados de ningún capítulo. `site/public/_headers` no cambia: la CSP actual ya
  admite todo lo anterior.
- El resultado es orientativo: no es asesoramiento jurídico ni una declaración de conformidad, y
  el modelo de madurez no es una certificación.
