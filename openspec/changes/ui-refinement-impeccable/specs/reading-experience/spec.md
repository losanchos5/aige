# Spec Delta

## Purpose
Estados visibles del layout de lectura larga del Body of Knowledge: el color del capítulo guía las
secciones, la tabla de contenidos muestra dónde está el lector, y la navegación entre capítulos usa
las mismas tarjetas que el resto del sitio.

## ADDED Requirements

### Requirement: Color del capítulo en las secciones
El marcador de cada `h2` del contenido de un capítulo SHALL usar el color de tinta de la capa asignada
al capítulo (la misma que su cabecera), no un color fijo.

#### Scenario: Capítulo de la capa 3
- **WHEN** se abre un capítulo cuya cabecera usa la capa 3
- **THEN** el marcador de sus `h2` tiene el color de tinta de la capa 3 en claro y en oscuro

### Requirement: Estado de la tabla de contenidos
La tabla de contenidos SHALL distinguir por color tres estados de cada entrada: actual, ya leída y
pendiente. La distinción MUST NOT usar opacity y los tres estados MUST cumplir AA sobre el fondo.

#### Scenario: Scroll a la tercera sección
- **WHEN** el lector desplaza hasta la tercera sección de un capítulo
- **THEN** la tercera entrada lleva `aria-current`, las dos anteriores tienen el estilo "leída" y las
  siguientes el estilo "pendiente"

### Requirement: Tarjetas de anterior y siguiente
Los enlaces de capítulo anterior y siguiente SHALL renderizarse como tarjetas con el mismo estilo de
borde luminoso y elevación al hover que las tarjetas del resto del sitio, con el nombre del capítulo
como nombre accesible.

#### Scenario: Último capítulo
- **WHEN** se abre el último capítulo del BoK
- **THEN** solo aparece la tarjeta "anterior" y el test de navegación del BoK pasa
