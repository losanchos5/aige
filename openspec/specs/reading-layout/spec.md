# reading-layout Specification

## Purpose
Define la maqueta de lectura a tres columnas del sitio (índice lateral, contenido e índice de página), el aspecto de sus piezas y las páginas que la usan.

## Requirements

### Requirement: Tres columnas en escritorio
Las páginas de lectura SHALL mostrar en escritorio ancho un índice lateral a la izquierda, el contenido en el centro con una medida de lectura acotada y un índice de la página a la derecha, ambos laterales fijos al hacer scroll. La página MUST NOT tener scroll horizontal en ningún ancho.

#### Scenario: Tres columnas a 1440 px
- **WHEN** se abre `/bok/why-now` a 1440 px
- **THEN** son visibles el índice lateral, el contenido y el índice de página, y el borde derecho de la prosa queda al menos 24px a la izquierda del índice de página

#### Scenario: Móvil sin desbordes
- **WHEN** se abre `/bok/why-now` a 390 px
- **THEN** el índice lateral es un cajón cerrado, el índice de página es un desplegable sobre el contenido y no hay scroll horizontal

### Requirement: Índice lateral por partes numeradas
El índice lateral SHALL agrupar sus entradas en módulos, cada uno con un número mono grande en el color de acento, su título en mono y su rango, y SHALL mostrar las entradas como un árbol con una línea vertical y una marca por fila. La entrada actual SHALL distinguirse por fondo suave de acento, borde de 1px y mayor peso, no solo por color.

#### Scenario: Entrada actual
- **WHEN** se abre `/bok/why-now`
- **THEN** la entrada "Why Now" lleva `aria-current`, un fondo distinto del resto y un peso de fuente mayor

#### Scenario: Agrupación por partes
- **WHEN** se abre un capítulo
- **THEN** el índice lateral muestra las cinco partes del libro con su número y su rango

### Requirement: Cabecera de capítulo sin banda
La cabecera de una página de lectura SHALL mostrar una píldora mono con la posición ("Chapter 02 of 24"), la parte, el título en Newsreader, la firma de autor y los metadatos como chips mono. MUST NOT llevar banda de mesh ni de color.

#### Scenario: Píldora de posición
- **WHEN** se abre `/bok/why-now`
- **THEN** la cabecera muestra una píldora con el número del capítulo y el total calculado desde los datos

### Requirement: Firma de autor con marco
La firma de autor de las páginas de lectura SHALL mostrarse dentro de un panel opaco rodeado por un marco de cuadro, conservando la foto, el nombre enlazado a `/about`, el botón de LinkedIn, el cargo y la fecha, con los mismos destinos y eventos de analítica que antes del cambio.

#### Scenario: Enlaces y eventos intactos
- **WHEN** se abre un capítulo
- **THEN** la firma enlaza `/about` y LinkedIn, y el enlace de LinkedIn conserva su evento de analítica `linkedin-click`

### Requirement: Índice de página numerado
El índice de página SHALL llevar una etiqueta mono, entradas numeradas con cero inicial y una línea a su izquierda, y SHALL marcar la sección en lectura con un borde de acento y mayor peso.

#### Scenario: Sección en lectura
- **WHEN** se hace scroll en un capítulo hasta su segunda sección
- **THEN** la entrada de esa sección lleva `aria-current` y un peso de fuente mayor que las demás

### Requirement: Prosa con encabezados numerados
En la prosa de lectura cada h2 SHALL llevar una línea superior y un contador mono, la negrita SHALL marcarse con un subrayado de marcador en el color de acento, y el código en línea SHALL ir sobre el fondo suave de acento.

#### Scenario: Contador en los h2
- **WHEN** se abre `/bok/why-now`
- **THEN** cada h2 de la prosa muestra un contador de dos cifras correlativo

### Requirement: Páginas con maqueta de lectura
La maqueta de lectura con índice lateral SHALL aplicarse a los capítulos, los patrones, la Thesis (en todos sus idiomas), las notas de investigación, las páginas de perfil de control y de control, las páginas de About y la de certificaciones. Las páginas de índice y de herramienta MUST conservar su maqueta actual.

#### Scenario: Thesis con índices
- **WHEN** se abre `/thesis` a 1440 px
- **THEN** la página muestra un índice de página a la derecha y la prosa conserva su medida de lectura

#### Scenario: Herramientas sin cambio de maqueta
- **WHEN** se abre `/resources/crosswalk`
- **THEN** la página no muestra índice lateral
