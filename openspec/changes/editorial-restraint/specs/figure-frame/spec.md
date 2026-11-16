# Spec Delta

## Purpose

Define el marco, el pie, el tamaño mínimo de texto y el uso del color comunes a todas las familias de figuras del sitio: diagramas archify, infografías, gráficos y el bucle de gobernanza.

## ADDED Requirements

### Requirement: Un marco para todas las figuras
Toda figura SHALL mostrarse en el mismo marco: superficie de panel lisa, línea de 1px, un único radio y sin sombra. Ninguna figura SHALL llevar un panel exterior con mesh, halos ni anillo degradado.

#### Scenario: Sin panel exterior
- **WHEN** se abre un capítulo o un patrón con diagrama
- **THEN** la figura no tiene ningún contenedor con mesh ni borde degradado y su `box-shadow` es `none`

#### Scenario: Mismo radio entre familias
- **WHEN** se comparan el marco de un diagrama archify, una infografía y un gráfico
- **THEN** los tres tienen el mismo radio de borde

### Requirement: Un pie para todas las figuras
Toda figura SHALL llevar el mismo pie: etiqueta mono con el número de figura, título, descripción y, si existen, controles secundarios en un único estilo de enlace mono (abrir el diagrama interactivo, tabla de datos, enlace permanente). Las figuras interactivas SHALL mostrar una única frase de ayuda en el mismo estilo.

#### Scenario: Controles con un solo estilo
- **WHEN** se inspeccionan los controles secundarios del pie de un diagrama, una infografía y un gráfico
- **THEN** usan la misma familia, tamaño y decoración de texto

### Requirement: Texto de figura de 12px como mínimo
Ningún texto de una figura SHALL renderizarse por debajo de 12px. Cuando una figura no quepa a ese tamaño en el ancho disponible, su marco SHALL permitir scroll horizontal dentro del marco en lugar de reducir el texto, sin provocar scroll horizontal de la página.

#### Scenario: Diagrama en la columna de lectura
- **WHEN** se abre un patrón con diagrama archify a 1440 px
- **THEN** la etiqueta más pequeña del diagrama mide al menos 12px

#### Scenario: Diagrama en móvil
- **WHEN** se abre ese patrón a 390 px
- **THEN** la etiqueta más pequeña mide al menos 12px y la página no tiene scroll horizontal

### Requirement: Color con significado en las figuras
Los nodos de los diagramas archify SHALL ser neutros (superficie de panel y trazo de tinta), con como mucho un nodo de énfasis en el color de acento por figura. Los colores de capa SHALL usarse en una figura solo para representar una capa del stack. El tipo de nodo MUST NOT codificarse con colores de capa.

#### Scenario: Nodos neutros
- **WHEN** se inspecciona un diagrama archify en una página
- **THEN** ningún nodo tiene como relleno un color de capa

#### Scenario: Gráfico por capas
- **WHEN** se abre un gráfico cuyas series son capas del stack
- **THEN** cada serie se identifica con su color de capa

### Requirement: Diagramas archify regenerados
Los diagramas archify SHALL regenerarse con una disposición que cumpla el tamaño mínimo de texto dentro de la columna de lectura, conservando los mismos nodos, aristas, notas y el visor interactivo de cada diagrama.

#### Scenario: Contenido conservado
- **WHEN** se compara cada diagrama regenerado con su versión anterior
- **THEN** tiene los mismos identificadores de nodo y las mismas aristas, y su nota por nodo sigue disponible
