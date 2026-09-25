# site-navigation Specification

## Purpose

La navegación del sitio expone todas las páginas públicas desde un único modelo de datos, con
grupos que describen cada destino en una línea, un drawer móvil accesible, un sitemap completo en
el footer y migas de pan en las subpáginas.

## Requirements

### Requirement: Modelo único de navegación
La barra de navegación, el drawer móvil, el sitemap del footer y el carril lateral de capítulos
SHALL construirse desde un único modelo de datos. Toda ruta pública HTML del sitio (excluidas las
imágenes OG, los visores de diagramas y la página 404) MUST estar enlazada desde el footer, salvo
las páginas de detalle de una colección (por ejemplo `/cases/<id>`), que MUST estar enlazadas desde
la página índice de su colección, y esa página índice MUST estar enlazada desde el footer. Todos los
hrefs del modelo MUST ser únicos y resolver con 200.

#### Scenario: Ruta nueva sin enlace
- **WHEN** se construye el sitio con una ruta HTML que el modelo no enlaza
- **THEN** el test de navegación falla nombrando la ruta ausente

#### Scenario: Página de detalle de una colección
- **WHEN** se construye `/cases/<id>` para un caso nuevo
- **THEN** el test no exige su enlace en el footer, pero falla si `/cases` no lo enlaza

### Requirement: Barra de escritorio con grupos desplegables
A partir de 840 px la barra SHALL mostrar seis entradas: The Thesis (enlace), Body of Knowledge
(grupo), Practice (grupo), Reference (grupo), The map (enlace) y About (grupo). Cada grupo SHALL
abrirse en un panel anclado al header con sus destinos como etiqueta más descripción de una línea
(≤ 90 caracteres); el panel MUST NOT ensanchar la página. Solo un panel puede estar abierto a la
vez. El botón del grupo MUST exponer `aria-expanded` y `aria-controls`; el nombre accesible de cada
enlace MUST ser solo su etiqueta.

#### Scenario: Apertura y cierre con teclado
- **WHEN** el usuario enfoca "Practice" y pulsa Enter, Espacio o Flecha abajo
- **THEN** el panel se abre, `aria-expanded` pasa a `true` y el foco va al primer enlace; al pulsar
  Escape el panel se cierra y el foco vuelve al botón

#### Scenario: Cierre por clic fuera o pérdida de foco
- **WHEN** hay un panel abierto y el usuario hace clic fuera de la barra o tabula fuera de ella
- **THEN** el panel se cierra

#### Scenario: Sin scroll horizontal
- **WHEN** un panel está abierto a cualquier ancho entre 900 y 1517 px
- **THEN** el ancho de scroll del documento es igual al ancho del viewport

### Requirement: Estado actual en la navegación
El enlace cuyo href coincide con la ruta actual, o es el prefijo más largo de ella, SHALL llevar
`aria-current="page"`; el grupo que lo contiene SHALL marcarse visualmente como actual. Los botones
de grupo MUST NOT llevar `aria-current`.

#### Scenario: Subpágina de referencia
- **WHEN** el usuario está en `/resources/tools`
- **THEN** "Reference" aparece como grupo actual y "Tools" lleva `aria-current="page"`

#### Scenario: Capítulo enlazado desde Practice
- **WHEN** el usuario está en `/bok/patterns`
- **THEN** "Practice" es el grupo actual (no Body of Knowledge) y "Patterns" lleva `aria-current`

### Requirement: Drawer móvil accesible
Por debajo de 840 px la barra SHALL conservar búsqueda, cambio de tema y un botón de menú con
`aria-expanded`. El menú SHALL abrirse como diálogo modal lateral con los mismos grupos y
descripciones, una fila de búsqueda y los capítulos plegados en un único desplegable cuyo resumen
da el rango de capítulos calculado desde los datos, con un subtítulo por parte; mientras está
abierto el foco MUST quedar dentro del diálogo, el scroll del documento MUST estar bloqueado, y
Escape, el botón de cerrar o un clic en el fondo MUST cerrarlo devolviendo el foco al botón de menú.

#### Scenario: Abrir y cerrar el drawer
- **WHEN** a 390 px el usuario pulsa el botón de menú
- **THEN** el diálogo se muestra con los enlaces de los grupos visibles y `aria-expanded` es `true`;
  al pulsar Escape el diálogo se cierra, el scroll se desbloquea y el foco vuelve al botón

#### Scenario: Un solo control de tema y búsqueda en el header
- **WHEN** se inspecciona el DOM en cualquier ancho
- **THEN** existe un único control de tema y un único botón de búsqueda dentro del header

#### Scenario: Capítulos por parte en el drawer
- **WHEN** a 390 px el usuario abre el desplegable de capítulos
- **THEN** ve un subtítulo por cada parte del libro, cada uno seguido de sus capítulos numerados

### Requirement: Sitemap en el footer
El footer SHALL contener un mapa del sitio con columnas por grupo, un bloque con todos los
capítulos agrupados por parte (título de la parte y capítulos con su número), los feeds y datos
descargables (RSS, glosario JSON, crosswalk y obligaciones CSV/JSON) y los enlaces del proyecto
(GitHub, LinkedIn, DOI), más la versión de la Tesis en español.

#### Scenario: Cobertura del sitemap
- **WHEN** se abre la portada
- **THEN** el footer enlaza cada href del modelo de navegación y cada ruta HTML pública del sitio
  que no es página de detalle de una colección

#### Scenario: Partes en el footer
- **WHEN** se abre cualquier página
- **THEN** el sitemap del footer muestra una lista con nombre por cada parte del libro, en orden de
  lectura

### Requirement: Migas de pan en subpáginas
Las subpáginas de Resources y About y los capítulos del Body of Knowledge SHALL mostrar migas de pan
(`nav` etiquetado como Breadcrumb, lista ordenada, último elemento con `aria-current="page"`) y
emitir un bloque JSON-LD `BreadcrumbList` con URLs absolutas. Las páginas raíz (`/`, `/thesis`,
`/es/thesis`, `/bok`, `/about`) y las landings MUST NOT mostrar migas de pan.

#### Scenario: Subpágina de Resources
- **WHEN** se abre `/resources/frameworks`
- **THEN** las migas muestran "Resources › Frameworks", el primer elemento enlaza a `/resources` y
  el JSON-LD contiene `BreadcrumbList`

### Requirement: Landings y capítulos alcanzables
Las landings `/role` y `/stack` SHALL ser los destinos de "The Role" y "The Stack" en Practice; los
capítulos correspondientes SHALL seguir alcanzables desde el panel de Body of Knowledge, desde la
landing (enlace "Chapter NN · Body of Knowledge") y desde el footer.

#### Scenario: Del menú a la landing y al capítulo
- **WHEN** el usuario elige "The Role" en Practice
- **THEN** llega a `/role`, y desde su cabecera puede seguir a `/bok/the-role`

### Requirement: Calidad de la navegación
La navegación MUST NOT usar scripts inline (política CSP `script-src 'self'`); la auditoría axe
MUST NOT reportar violaciones serias o críticas con un panel abierto a 1440 px ni con el drawer
abierto a 390 px, en tema claro y oscuro; Lighthouse MUST mantener accesibilidad y buenas prácticas
en 1.0 y rendimiento ≥ 0.95 en las rutas auditadas.

#### Scenario: Auditoría con menú abierto
- **WHEN** se ejecuta axe con el panel de Body of Knowledge abierto y, por separado, con el drawer
  abierto
- **THEN** no hay violaciones serias ni críticas

### Requirement: Capítulos agrupados por partes
El grupo Body of Knowledge del modelo SHALL agrupar sus capítulos por las partes de `chapterParts`,
en su orden, y cada capítulo MUST aparecer en exactamente una parte. La descripción del grupo SHALL
calcularse desde los datos (número de capítulos y de partes) y MUST NOT fijar un número a mano. En
el panel de escritorio las partes SHALL mostrarse como listas con nombre (título y rango de
capítulos) repartidas en columnas; el panel MUST NOT ensanchar la página y su altura MUST quedar
acotada al viewport con scroll propio.

#### Scenario: Panel de Body of Knowledge
- **WHEN** a 1440 px el usuario abre Body of Knowledge
- **THEN** ve una lista con nombre por parte y cada capítulo del libro enlazado una sola vez

#### Scenario: Capítulo nuevo
- **WHEN** se añade un capítulo a `chapters.ts` con su parte
- **THEN** aparece en su parte en el panel, el drawer, el footer y el carril lateral sin tocar
  `nav.ts`

### Requirement: Destinos de Reference y About
El grupo Reference SHALL enlazar Frameworks, Crosswalk, Harms atlas, Cases, Contracts, Templates &
schemas, Tools, Glossary y Reading list, cada uno con una descripción de una línea (≤ 90
caracteres). El grupo About SHALL enlazar Changelog, Contributors y Methodology.

#### Scenario: Recursos nuevos en el menú
- **WHEN** el usuario abre Reference
- **THEN** encuentra enlaces a `/resources/harms`, `/cases`, `/resources/contracts` y
  `/resources/templates`
