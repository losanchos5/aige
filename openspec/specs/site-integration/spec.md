# site-integration Specification

## Purpose
La navegación, el hub de recursos, la home y `llms.txt` llegan a todos los destinos de v0.5.0 con
recuentos tomados de los datos, y la analítica ignora el fragmento y la query para que las respuestas
del toolkit no salgan del navegador.

## Requirements

### Requirement: Destinos v0.5.0 en la navegación
El modelo de navegación SHALL enlazar en Practice `/patterns`, `/toolkit` y `/agents`, y en Reference
`/obligations`, `/figures`, `/resources/data` y el glosario del libro (`/bok/glossary`). Un destino
cuyas páginas viven fuera de su `href` MAY declarar prefijos propios (`owns`) para el estado actual,
de modo que `/glossary/<slug>` ilumine Reference y su enlace Glossary. Ninguna descripción MUST
pasar de 90 caracteres.

#### Scenario: Página de patrón
- **WHEN** el lector abre `/patterns/eval-gate-in-ci`
- **THEN** el grupo Practice está marcado como actual y su enlace `/patterns` lleva `aria-current`

#### Scenario: Página de término
- **WHEN** el lector abre `/glossary/serious-incident`
- **THEN** el grupo Reference está marcado como actual y su enlace `/bok/glossary` lleva
  `aria-current`

### Requirement: Cobertura del footer por colecciones y redirecciones
El footer SHALL enlazar cada ruta HTML pública salvo las páginas de detalle de una colección
(`/cases/`, `/obligations/`, `/patterns/`, `/figures/`, `/glossary/`, `/toolkit/`), que MUST estar
enlazadas desde su índice, y salvo las rutas que el host redirige según `public/_redirects`, que
MUST NOT estar enlazadas desde el footer.

#### Scenario: Ruta redirigida
- **WHEN** `/resources/glossary` se construye y `_redirects` la envía a `/bok/glossary` con 301
- **THEN** el test del footer no la exige y falla si el footer la enlaza

### Requirement: Sitemap solo con URLs canónicas
`Base.astro` SHALL aceptar una URL canónica explícita. Una página que no es su propia URL canónica
MUST declararlo con `rel=canonical` o estar redirigida por el host, y MUST quedar fuera del sitemap
mediante `src/lib/sitemap-policy.ts`, que usan tanto la configuración de Astro como el test de
conteo del sitemap.

#### Scenario: Vista filtrada de la lista de lecturas
- **WHEN** se abre `/resources/reading-list`
- **THEN** su canonical es `https://aigovernanceengineer.com/bok/reading-list` y el sitemap no
  contiene `/resources/reading-list`

### Requirement: Hub, portada y llms.txt al día
El hub `/resources` SHALL tener una tarjeta por referencia publicada, incluidas el registro de
obligaciones, las figuras, el toolkit y los datos abiertos, cada una con un conteo calculado desde
los datos. `/llms.txt` SHALL enlazar `/obligations`, `/resources/data`, `/api/v1/index.json`,
`/figures`, `/toolkit`, `/agents`, `/patterns`, `/about/methodology` y `/bok/glossary`, y listar en
una sección `Optional` cada página de obligación, de figura y de término.

#### Scenario: Conteos del hub
- **WHEN** se añade una obligación al registro
- **THEN** la tarjeta del registro muestra el nuevo número sin editar el hub

### Requirement: Analítica sin fragmento ni consulta
Cuando la analítica esté activa, el script de Umami MUST llevar `data-exclude-hash` y
`data-exclude-search`, porque las herramientas del toolkit guardan las respuestas en el fragmento y
prometen que nada sale del navegador. Los enlaces con atributo `download` que lleven evento de
analítica MUST abrirse con `target="_blank"` y `rel="noopener"` para que el rastreador no cancele la
descarga, y los botones de búsqueda SHALL llevar el evento `search-open`.

#### Scenario: Descarga del CSV de obligaciones
- **WHEN** el lector pulsa "Download CSV" en `/resources/frameworks`
- **THEN** el enlace lleva `download`, `target="_blank"`, `data-umami-event="download"` y el fichero
  en `data-umami-event-file`
