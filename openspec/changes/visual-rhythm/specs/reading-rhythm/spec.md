# Spec Delta

## Purpose

Da ritmo visual a las páginas de lectura largas (capítulos, patrones, Thesis, About, research,
perfiles de control y el pilar `/ai-governance`). Lo hace con pausas de color entre tramos de
texto, sin tocar el texto corrido ni el significado de los colores de capa.

## ADDED Requirements

### Requirement: Cabecera con color sin reclamar capa
La cabecera de una página de lectura SHALL pintar un mesh quieto y decorativo.

- En un capítulo del Body of Knowledge, la composición SHALL depender de la parte del libro, de
  modo que las cinco partes tengan composiciones distintas.
- Un capítulo que trata de una sola capa SHALL conservar el tinte de esa capa.
- Ningún otro capítulo MUST tomar el color de una capa (SL-06).

#### Scenario: Capítulos de partes distintas
- **WHEN** se abren `/bok/the-stack` (discipline) y `/bok/eu-ai-act` (law)
- **THEN** las dos cabeceras contienen una capa mesh oculta a tecnologías de apoyo, sin eventos de
  puntero y sin animación
- **THEN** las composiciones de las dos cabeceras son distintas

### Requirement: Raya de sección en degradado
La raya corta sobre cada H2 SHALL ser:

- en una página de lectura sin capa, un degradado de las tres tintas de identidad;
- en un capítulo de una sola capa, la tinta de esa capa.

#### Scenario: Raya de un capítulo sin capa
- **WHEN** se abre `/bok/values-and-principles`
- **THEN** el pseudo-elemento de la raya del primer H2 tiene como fondo un degradado lineal

### Requirement: Paneles de pausa
Las figuras de primer nivel de la prosa (diagramas e infografías) y el bloque «At a glance» SHALL
asentarse sobre un panel de pausa: un suelo tenue, un mesh quieto, un aro de 1 px en degradado y
esquinas redondeadas.

- Dos figuras seguidas SHALL alternar la composición del mesh.
- El lienzo de la figura SHALL seguir siendo opaco, de modo que ningún mesh quede directamente bajo
  nodos o texto de la figura.

#### Scenario: Figura en pausa
- **WHEN** se abre `/bok/the-stack` a 1440 px
- **THEN** la primera figura de la prosa tiene padding
- **THEN** su fondo lleva degradados y su borde es transparente sobre el aro

### Requirement: Avisos como bandas
Los avisos de primer nivel se pintan según su tipo:

- practice, example y anti SHALL ocupar todo el pozo de lectura sobre un tinte de su tipo, con el
  aro en degradado, y su texto SHALL mantener la medida de la columna de prosa;
- note y summary SHALL quedarse en la columna y llevar el aro;
- fuera de un contenedor de lectura (Doc o el pilar), ningún aviso MUST ensancharse.

#### Scenario: Aviso In practice en un capítulo
- **WHEN** se abre `/bok/governing-agents` a 1440 px
- **THEN** un aviso `practice` es más ancho que la columna de prosa
- **THEN** el borde izquierdo de su texto coincide con el de la prosa, con una tolerancia de un
  paso de espaciado

#### Scenario: Sin desbordamiento en móvil
- **WHEN** se abre el mismo capítulo a 390 px
- **THEN** el ancho de scroll del documento es igual al del viewport

### Requirement: Tablas enmarcadas
Una tabla de primer nivel de la prosa SHALL ocupar el pozo de lectura dentro de su región de
scroll, sobre un suelo opaco y con el aro en degradado. Ningún mesh MUST quedar bajo una tabla.

#### Scenario: Tabla en un capítulo
- **WHEN** se abre `/bok/governing-agents` a 1440 px
- **THEN** la primera `.table-scroll` de primer nivel es más ancha que la columna de prosa
- **THEN** su fondo es opaco

### Requirement: Banda de cierre
Un capítulo que tenga enlaces al proyecto abierto o un formulario de newsletter SHALL cerrar con
una banda a todo el ancho con mesh quieto que los contenga. La banda va fuera de la rejilla de
lectura. Si no hay nada que mostrar, la banda MUST NOT renderizarse.

#### Scenario: Cierre del capítulo
- **WHEN** se abre `/bok/the-stack`
- **THEN** tras la rejilla de lectura hay una sección con mesh que contiene el formulario de
  newsletter

### Requirement: Accesibilidad de las pausas
Todo texto sobre una pausa, un aviso en banda o una banda de cierre SHALL cumplir WCAG AA en claro
y en oscuro. Ninguna superficie nueva MUST atenuar texto con opacity.

#### Scenario: Axe en páginas de lectura
- **WHEN** se pasa la suite axe a todas las páginas en claro y en oscuro, a 1440 y 390 px
- **THEN** no hay violaciones serias ni críticas
