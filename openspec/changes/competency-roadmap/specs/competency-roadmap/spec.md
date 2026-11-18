# Spec Delta

## Purpose

La matriz de competencias de `/role/competencies` se lee como un recorrido: cada flujo de trabajo es
una vía con cuatro estaciones que convergen en el quinto peldaño, sobre un panel opaco enmarcado por
una pintura, sin perder la tabla, las anclas ni la lectura sin JavaScript.

## ADDED Requirements

### Requirement: Vías por flujo que convergen en el quinto peldaño

La tabla de flujos por peldaños de `/role/competencies` SHALL dibujarse como siete vías, una por
flujo de trabajo, cada una con una estación por cada uno de los cuatro primeros peldaños en el orden
de la escalera y unidas por una línea continua. Las siete vías SHALL converger en un único nodo del
quinto peldaño que enlaza a la banda de función. El recorrido SHALL ser la propia tabla, con sus
cabeceras de fila y de columna expuestas a las tecnologías de apoyo, y MUST NOT ser una figura
aparte que duplique el contenido.

#### Scenario: Lectura de una vía

- **WHEN** un lector sigue la fila de un flujo de izquierda a derecha
- **THEN** encuentra las cuatro estaciones en el orden de los peldaños y, al final, el nodo del
  quinto peldaño

#### Scenario: Tecnologías de apoyo

- **WHEN** un lector de pantalla recorre el recorrido
- **THEN** cada estación se anuncia con el flujo de su fila y el peldaño de su columna

#### Scenario: Sin JavaScript

- **WHEN** se carga la página con JavaScript desactivado
- **THEN** las siete vías, las 28 estaciones y el nodo del quinto peldaño están completos y sus
  enlaces funcionan

### Requirement: Etiqueta corta por celda

Cada celda de la matriz SHALL tener una etiqueta de entre dos y cuatro palabras, derivada de lo que
la celda dice que la persona puede asumir, y el quinto peldaño SHALL tener la suya. Una etiqueta
MUST NOT afirmar nada que el texto de su celda no afirme. Cada estación SHALL mostrar la etiqueta de
su celda y la marca de color de la capa del flujo, y SHALL enlazar al detalle de esa celda.

#### Scenario: Etiqueta ausente o fuera de límites

- **WHEN** una celda no tiene etiqueta o su etiqueta tiene menos de dos o más de cuatro palabras
- **THEN** la comprobación de datos falla e identifica la celda

#### Scenario: De la estación al detalle

- **WHEN** un lector activa una estación
- **THEN** el detalle de esa celda queda a la vista, por debajo de la cabecera fija

### Requirement: Recorrido enmarcado por una pintura

El recorrido SHALL presentarse en un panel opaco que flota sobre una pintura del catálogo de
pinturas del sitio, con su línea de crédito. La página MUST NOT poner texto directamente sobre la
pintura.

#### Scenario: Ambos temas

- **WHEN** se abre la página en tema claro y en tema oscuro
- **THEN** todo el texto del recorrido está sobre el panel opaco y la página pasa axe sin
  infracciones de contraste

### Requirement: Detalle por flujo como pasos

El detalle de cada flujo SHALL mostrar sus cuatro celdas completas como cuatro pasos en el orden de
la escalera, junto a las habilidades del flujo, y SHALL ofrecer un enlace de vuelta al recorrido. La
celda abierta por su ancla SHALL distinguirse a la vista de las otras tres.

#### Scenario: Celda abierta por su ancla

- **WHEN** se abre la URL de la página con el ancla de una celda
- **THEN** esa celda aparece marcada dentro de los cuatro pasos de su flujo, con su peldaño
  identificable

### Requirement: Recorrido en pantallas estrechas

A 390 px de ancho cada flujo SHALL leerse como un recorrido vertical propio: el nombre del flujo
seguido de sus cuatro estaciones, cada una con el nombre de su peldaño, y el nodo del quinto peldaño
al final. La página MUST NOT tener desplazamiento lateral.

#### Scenario: Móvil

- **WHEN** se abre la página a 390 px
- **THEN** cada flujo muestra sus cuatro estaciones con el peldaño nombrado y la página no se
  desplaza lateralmente
