# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
