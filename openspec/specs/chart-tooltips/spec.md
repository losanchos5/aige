# chart-tooltips Specification

## Purpose
Que cualquier lector identifique al instante cada elemento de cada gráfico del sitio, con ratón, con
teclado o tocando en móvil, mediante un tooltip que enseña el nombre de la marca.

## Requirements

### Requirement: Cobertura del tooltip
El sitio SHALL enseñar un tooltip con el nombre de la marca en todo elemento con nombre que esté dentro
de un gráfico: las marcas de los SVG del kit envueltos por `Chart.astro` y las celdas o teselas de las
rejillas HTML de gráficos (ControlMosaic, ControlLanes, ControlsCrosswalkIndex, CoverageMap,
CrosswalkMatrix, LayerMatrix, ObligationMatrix, ObligationIsotype, ControlCoverage,
ComparisonButterfly) y del mapa de calor AIGP. El tooltip MUST NOT aparecer en el título ni en la
descripción raíz del SVG, en la leyenda, en los ejes ni en los diagramas archify, las figuras de
`src/figures/` o los diagramas interactivos con panel propio.

#### Scenario: Marca SVG del kit
- **WHEN** el lector pasa el ratón por una marca con nombre de un gráfico del kit
- **THEN** el tooltip enseña ese nombre sin esperar a que el puntero se detenga

#### Scenario: Celda de rejilla HTML
- **WHEN** el lector pasa el ratón por una tesela del mosaico de `/controls`
- **THEN** el tooltip enseña su nombre (id, título, capa y respuesta del control)

#### Scenario: Elemento fuera de alcance
- **WHEN** el lector pasa el ratón por el título del gráfico, la leyenda o un nodo de un diagrama archify
- **THEN** el tooltip de gráficos no aparece

### Requirement: Texto igual al nombre accesible
El texto del tooltip SHALL ser el nombre accesible de la marca, tomado en este orden: `data-tip`,
`aria-label`, el `<title>` hijo directo, el atributo `title`. El tooltip MUST NOT añadir hechos, cifras
ni fechas que no estén en ese nombre, y MUST quedar oculto a las tecnologías de apoyo para que el nombre
no se lea dos veces. Mientras el tooltip está abierto, el navegador MUST NOT enseñar además su tooltip
nativo sobre la misma marca, y al cerrarse la marca MUST conservar su `<title>` o `title` original.

#### Scenario: Sin doble lectura
- **WHEN** un lector de pantalla enfoca una marca enlazada que enseña el tooltip
- **THEN** oye el nombre de la marca una sola vez

#### Scenario: Sin tooltip nativo duplicado
- **WHEN** el puntero se queda quieto un segundo sobre una marca con `<title>`
- **THEN** solo se ve el tooltip del sitio, y al salir la marca vuelve a tener su `<title>`

### Requirement: Apertura y cierre
El tooltip SHALL abrirse al entrar el puntero en la marca, al recibir la marca el foco de teclado y al
tocarla en una pantalla táctil, y SHALL seguir a la marca mientras el puntero se mueve dentro de ella.
Cumpliendo WCAG 1.4.13, MUST cerrarse con Esc sin mover el foco ni el puntero, MUST seguir abierto
mientras el puntero pase de la marca al propio tooltip, y MUST seguir abierto mientras el puntero o el
foco sigan en la marca.

#### Scenario: Teclado
- **WHEN** el lector llega con Tab a una marca enlazada o enfocable
- **THEN** el tooltip enseña su nombre junto a la marca

#### Scenario: Esc
- **WHEN** el tooltip está abierto y el lector pulsa Esc
- **THEN** el tooltip se cierra y el foco sigue en la marca

#### Scenario: Puntero sobre el tooltip
- **WHEN** el puntero sale de la marca hacia el tooltip
- **THEN** el tooltip sigue abierto hasta que el puntero sale también del tooltip

### Requirement: Toque en móvil
En una pantalla táctil, el primer toque sobre una marca SHALL enseñar su tooltip y resaltar la marca
sin navegar. Un segundo toque sobre la misma marca, si es un enlace que navega, SHALL seguir el
enlace. En las marcas cuyo toque ya abre un panel, un cajón o un filtro, el primer toque SHALL hacer esa
acción como hoy y enseñar el tooltip a la vez. Tocar fuera de cualquier marca MUST cerrar el tooltip.
El tooltip MUST NOT bloquear el desplazamiento de la página ni de las regiones desplazables.

#### Scenario: Primer y segundo toque en un enlace
- **WHEN** el lector toca una tesela enlazada del mosaico de `/controls` y después la toca otra vez
- **THEN** el primer toque enseña su nombre y el segundo abre la página del control

#### Scenario: Toque que abre un cajón
- **WHEN** el lector toca una celda de la matriz de `/resources/crosswalk`
- **THEN** el cajón se abre igual que hoy

#### Scenario: Desplazamiento
- **WHEN** el lector arrastra el dedo sobre un gráfico para desplazar la página
- **THEN** la página se desplaza y no se abre ningún tooltip

#### Scenario: Marca pequeña
- **WHEN** el lector toca un punto que cae entre marcas a menos de 12 px de la más cercana
- **THEN** el tooltip enseña la marca más cercana

### Requirement: Posición y presentación
El tooltip SHALL colocarse junto al puntero o, con teclado, junto a la marca, y MUST quedar entero dentro
del viewport a cualquier ancho desde 320 px, dándose la vuelta arriba o abajo e izquierda o derecha
cuando no cabe. MUST usar solo tokens de color válidos en claro y oscuro, MUST usar Canvas y CanvasText
en forced-colors, MUST NOT imprimirse, MUST NOT animarse con `prefers-reduced-motion`, y solo MAY animar
`transform` u `opacity` del contenedor del tooltip, nunca la opacidad de su texto ni el tamaño de un
contenedor de enlaces.

#### Scenario: Viewport estrecho
- **WHEN** el lector abre el tooltip de una marca pegada al borde derecho a 320 px de ancho
- **THEN** el tooltip queda entero dentro de la pantalla

#### Scenario: Forced-colors
- **WHEN** el sistema usa colores forzados
- **THEN** el tooltip se dibuja con Canvas, CanvasText y un borde visible

### Requirement: Carga y degradación
La isla del tooltip SHALL ser un fichero `public/*.js` sin dependencias de como mucho 15 KB gzip,
cargado con `<script src>` (nunca inline) una sola vez en las páginas que tienen al menos un gráfico
cubierto, y en ninguna otra. Sin JavaScript, los gráficos MUST comportarse como hoy: `<title>` nativo,
enlaces que navegan al primer toque y tabla alternativa. La isla MUST NOT impedir que otros scripts
reciban los clics y las teclas que ya escuchan.

#### Scenario: Página sin gráficos
- **WHEN** se construye una página sin ningún gráfico cubierto
- **THEN** su HTML no carga la isla del tooltip

#### Scenario: Página con varios gráficos
- **WHEN** una página tiene varios gráficos cubiertos
- **THEN** su HTML carga la isla una sola vez

#### Scenario: Sin JavaScript
- **WHEN** la página se abre con JavaScript desactivado
- **THEN** no hay errores, las marcas conservan su `<title>` y los enlaces navegan al primer toque
