# Spec Delta

## Purpose

Define el vocabulario de bandas que comparten la portada, las landings y las páginas de
referencia: tintes por tono, banda profunda y composiciones quietas del mesh. Así ninguna página
es una sucesión de secciones crema idénticas.

## ADDED Requirements

### Requirement: Tintes por tono
Una banda tintada SHALL poder tomar uno de cinco tonos: azul, salvia, rosa, ámbar o lima.

- Cada tono SHALL ser más marcado que el tinte pálido por defecto y SHALL tener valores propios en
  claro y en oscuro.
- Un tono es un ambiente y MUST NOT usarse como etiqueta de una capa.
- El texto atenuado sobre un tinte SHALL re-escoparse para cumplir AA.

#### Scenario: Banda con tono
- **WHEN** se abre `/` en claro y en oscuro
- **THEN** las bandas de preguntas, valores, capítulos y "What applies now" tienen tonos distintos
  entre sí
- **THEN** axe no reporta fallos serios ni críticos

### Requirement: Banda profunda
Una sección SHALL poder pintarse como banda profunda: el navy L1 con el juego completo de tokens
oscuros, en claro y en oscuro. Una página MUST NOT poner dos bandas oscuras o profundas seguidas.

#### Scenario: Banda deep en la portada
- **WHEN** se abre `/`
- **THEN** la banda `#where-it-operates` tiene el fondo navy
- **THEN** la sección siguiente no es ni oscura ni profunda

### Requirement: Composiciones quietas
El mesh SHALL ofrecer al menos cinco composiciones.

- Solo la composición por defecto, sobre una banda mesh, deriva.
- Ninguna pareja de bandas con mesh contiguas MUST compartir composición.

#### Scenario: Vecinas distintas
- **WHEN** se recorren las secciones con mesh de cualquier página de marketing o de referencia
- **THEN** ninguna pareja contigua repite composición

### Requirement: Páginas de referencia en bandas
El hero de las páginas de referencia SHALL pintar su mesh con una intensidad de 0.65. El cuerpo
SHALL componerse de bandas:

- las cabeceras de sección y las figuras, sobre un tinte por tono con mesh;
- las tablas, sobre el fondo liso, porque un mesh MUST NOT quedar bajo una tabla.

#### Scenario: Frameworks en bandas
- **WHEN** se abre `/resources/frameworks`
- **THEN** la cabecera "Frameworks" y la figura de linaje están en una banda tintada con mesh
- **THEN** la tabla de frameworks está en una banda sin mesh

### Requirement: Landings sin crema plano
Las landings de marketing SHALL alternar bandas tintadas por tono, mesh o profundas, sin dos
vecinas con el mismo tratamiento. Son `/controls`, `/role`, `/stack`, `/agents`, `/for`, los hubs
de audiencia, `/frontier`, `/contribute`, `/path` y `/map`.

#### Scenario: Alternancia en /controls
- **WHEN** se abre `/controls`
- **THEN** ninguna pareja de secciones contiguas comparte tono, tinte y composición a la vez
