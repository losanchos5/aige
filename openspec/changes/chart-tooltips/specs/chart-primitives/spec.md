# Spec Delta

## ADDED Requirements

### Requirement: Cada marca dice qué es
Toda marca de datos que dibuje el kit (barra, segmento, punto, cuadro, celda, nodo, banda, tesela,
sector, conjunto, anillo de progreso, paso de escalera) SHALL llevar un nombre que identifique el
elemento que representa (su nombre o su código más su nombre) y no solo su estado, su capa o su valor.
Los enlaces de fila o de etiqueta MUST llevar el mismo nombre que la marca a la que acompañan. El
nombre MUST salir de los datos de entrada y MUST NOT añadir hechos que no estén en ellos.

#### Scenario: Anillo de progreso
- **WHEN** una página dibuja un anillo de progreso de una etapa
- **THEN** el anillo lleva un nombre con la etapa y su avance (hechos de total y porcentaje)

#### Scenario: Conjunto del Venn
- **WHEN** se dibuja un Venn o un Euler de marcos
- **THEN** cada círculo o elipse lleva el nombre del conjunto y su total

#### Scenario: Columna con código
- **WHEN** un mapa de calor rotula sus columnas con un código (por ejemplo una cláusula de ISO 42001)
- **THEN** el nombre de cada celda incluye también el nombre de esa columna tomado de los datos

#### Scenario: Enlace de fila
- **WHEN** una fila de barras enlaza su etiqueta
- **THEN** el enlace se llama igual que la barra, con su valor y unidad

### Requirement: Chart.astro carga la isla del tooltip
`Chart.astro` SHALL cargar la isla del tooltip de gráficos una sola vez por página, aunque la página
tenga varios gráficos, sin `<script>` inline. Las rejillas HTML de gráficos que no pasan por
`Chart.astro` MUST cargarla por el mismo mecanismo de carga única.

#### Scenario: Varios Chart en una página
- **WHEN** una página renderiza tres `Chart`
- **THEN** su HTML contiene exactamente un `<script src>` de la isla del tooltip
