# editorial-system Specification

## Purpose
Define el sistema visual común a todo el sitio: un fondo de papel con grano, superficies de panel lisas, un solo acento, colores de capa reservados a su significado y un reparto fijo de tipografías por rol.

## Requirements

### Requirement: Fondo único de papel con grano
Toda página SHALL usar el mismo color de fondo de papel, con un grano tenue de un solo tono que no altera el matiz. El sitio MUST NOT pintar mesh de halos, degradados de color ni tintes de banda como fondo de sección. El grano MUST NOT mostrarse sobre la pintura de la hero.

#### Scenario: Sin mesh en ninguna ruta
- **WHEN** se carga cualquier ruta construida del sitio
- **THEN** no existe ningún elemento de capa mesh ni sección con tinte de capa como fondo

#### Scenario: Grano presente y decorativo
- **WHEN** se carga `/` o `/bok/why-now`
- **THEN** existe una capa de grano que cubre el fondo, no recibe eventos de puntero y está oculta a tecnologías de apoyo

### Requirement: Paneles lisos y opacos
Todo panel que agrupa contenido (callouts, tablas, marcos de figura, bloques de código, tarjetas) SHALL usar una superficie lisa y opaca, separada por una línea de 1px, sin sombra en reposo. La regla es: la página lleva grano, el panel no.

#### Scenario: Panel sin grano ni sombra
- **WHEN** se inspecciona el callout "At a glance" de un capítulo
- **THEN** su fondo es un color opaco, tiene borde de 1px y `box-shadow` es `none`

#### Scenario: Ritmo vertical de los paneles
- **WHEN** se mide un panel dentro de la prosa de un capítulo a 1440 y a 390 px
- **THEN** el espacio por encima y por debajo del panel es el mismo y no es menor de 24px

### Requirement: Un solo acento y colores de capa con significado
La interfaz SHALL usar un único color de acento (el azul marino de la hero en claro y su equivalente claro en oscuro) para enlaces, estados activos y énfasis. Los cinco colores de capa SHALL aparecer solo donde significan una capa del stack, y solo como muestra pequeña o filete, nunca como relleno de tarjeta ni de sección.

#### Scenario: Capas solo como muestra
- **WHEN** se carga `/`
- **THEN** ningún elemento mayor de 24px de lado tiene como fondo un color de capa

#### Scenario: Estado activo con el acento
- **WHEN** se abre `/bok/why-now` a 1440 px
- **THEN** la fila activa del índice lateral y la entrada activa del índice de página usan el color de acento y ningún color de capa

### Requirement: Tipografía por rol
Los títulos h1 y h2 SHALL usar Newsreader; el cuerpo y los títulos h3 y h4 SHALL usar Instrument Sans; etiquetas, números, chips y pies de figura SHALL usar JetBrains Mono. Ningún texto de interfaz SHALL renderizarse por debajo de 12px. El sitio MUST NOT cargar Bricolage Grotesque.

#### Scenario: Familias cargadas
- **WHEN** se carga `/bok/why-now`
- **THEN** el h1 usa Newsreader, los párrafos usan Instrument Sans y no hay ninguna petición de una fuente Bricolage

#### Scenario: Tamaño mínimo
- **WHEN** se mide el texto visible de `/` y `/bok/why-now` a 390 px
- **THEN** ningún nodo de texto tiene un tamaño calculado menor de 12px

### Requirement: Numeración mono repetida
Las secciones de la portada, las partes del índice lateral, los h2 de la prosa y las entradas del índice de página SHALL llevar un número en mono con cero inicial como motivo común.

#### Scenario: Numeración en la portada
- **WHEN** se carga `/`
- **THEN** cada sección bajo la hero muestra una etiqueta mono con su número de dos cifras

### Requirement: Contraste en ambos temas
Todo texto SHALL cumplir WCAG AA en claro y en oscuro. El texto MUST NOT atenuarse con opacidad.

#### Scenario: Axe sin fallos
- **WHEN** se pasa axe a la muestra de rutas en claro y oscuro a 1440 y 390 px
- **THEN** no hay fallos serios ni críticos
