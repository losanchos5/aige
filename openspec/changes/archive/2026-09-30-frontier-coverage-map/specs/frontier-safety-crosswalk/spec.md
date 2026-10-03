# Spec Delta

## MODIFIED Requirements

### Requirement: Página del crosswalk de frontera
El sitio SHALL publicar `/resources/frontier-safety-crosswalk` con H1 "How the frontier labs govern
themselves, mapped to NIST AI RMF and ISO/IEC 42001", migas Resources → Frontier safety crosswalk y,
en este orden: franja de versiones (nombre, versión, fecha efectiva y enlace de cada uno de los tres
documentos de labs, más la fecha "as of"), "How to read this", el mapa de cobertura ("Coverage at a
glance"), la matriz, un artículo por dimensión con id `topic-<id>`, "Three readings", "Limits and
method", la lista de fuentes y las descargas con "How to cite". La página MUST enlazar `/frontier`.

#### Scenario: Estructura visible
- **WHEN** se abre `/resources/frontier-safety-crosswalk`
- **THEN** el H1 es el indicado, la franja muestra tres documentos con versión y fecha, y existe un
  `#topic-<id>` por cada dimensión del dataset

#### Scenario: Sin JavaScript
- **WHEN** se abre la página con JavaScript desactivado y se sigue el enlace de una fila o celda
- **THEN** el navegador salta al artículo `#topic-<id>` de esa dimensión

## ADDED Requirements

### Requirement: Mapa de cobertura
La página SHALL mostrar una rejilla con una fila por dimensión y una celda por cada una de las cinco
columnas de la matriz. Cada celda SHALL comunicar, por texto accesible y por un patrón visual que no
dependa solo del color, uno de estos estados derivados del dataset: hueco documentado; solo
referencias `related`; o el número de referencias `core`. Cada fila SHALL indicar cuántas de las cinco
columnas tienen al menos una referencia `core`, y cada columna cuántas dimensiones cubre. Cada celda
SHALL ser un enlace a `#topic-<id>` de su dimensión que, con JavaScript, abre el mismo drawer que la
matriz con las referencias de esa columna resaltadas. El mapa MUST NOT afirmar conformidad: su texto
habla de cobertura.

#### Scenario: Estados coherentes con el dataset
- **WHEN** se abre la página
- **THEN** hay una celda por dimensión y columna, y las celdas marcadas como hueco son exactamente los
  pares dimensión/columna de los huecos documentados del dataset

#### Scenario: Drawer desde el mapa
- **WHEN** se pulsa una celda del mapa y luego Esc
- **THEN** el drawer se abre con el título de esa dimensión y las referencias de esa columna
  resaltadas, y al cerrarse el foco vuelve a la celda

#### Scenario: Sin JavaScript en el mapa
- **WHEN** se abre la página con JavaScript desactivado
- **THEN** el mapa y su leyenda se ven completos, el selector de lentes no se muestra y cada celda
  enlaza a un `#topic-<id>` existente

### Requirement: Lentes del mapa
Con JavaScript, el mapa SHALL ofrecer un selector de una sola opción con tres lentes: "All" (todas las
celdas con su estado), "Labs vs standards" (marca las filas donde las tres columnas de labs tienen
referencia `core` y alguna columna de estándar no, y las filas donde una columna de estándar tiene
referencia `core` y alguna columna de lab no) y "Gaps only" (destaca solo las celdas de hueco). La
lente activa SHALL reflejarse en el fragmento de la URL y restaurarse al cargar la página con ese
fragmento. Las celdas no destacadas MUST mantener un contraste de texto WCAG AA (sin atenuar por
opacidad).

#### Scenario: Lente de huecos
- **WHEN** se elige "Gaps only"
- **THEN** solo las celdas de hueco quedan destacadas y el fragmento de la URL recoge la lente

#### Scenario: Vista compartida
- **WHEN** se abre la página con el fragmento de la lente "Gaps only"
- **THEN** esa lente aparece seleccionada y aplicada

### Requirement: Accesibilidad y responsive del mapa
El mapa SHALL pasar axe (WCAG 2.1 AA) en tema claro y oscuro con cualquier lente activa, SHALL ser
operable con teclado (lentes y celdas) y SHALL caber a 390 px sin scroll horizontal de página. Las
transiciones MUST respetar `prefers-reduced-motion`.

#### Scenario: Mapa a 390 px
- **WHEN** se abre la página a 390 px de ancho
- **THEN** las cinco columnas del mapa son visibles y el documento no es más ancho que la ventana
