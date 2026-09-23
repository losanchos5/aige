# Spec Delta

## Purpose
Actualiza la capacidad `page-hero` tras la pasada de la auditoría impeccable (hallazgos SL-04 y
SL-18): las cabeceras dejan de llevar kicker/eyebrow y textura de puntos o rejilla; la malla se
conserva como única capa de fondo decorativa.

## MODIFIED Requirements

### Requirement: Fondo del hero a ancho completo
En `/resources`, sus cinco subpáginas (`frameworks`, `crosswalk`, `tools`, `reading-list`,
`glossary`), `/role`, `/stack`, `/path` y `/map`, la capa de malla del hero, cuando la página la
tiene, SHALL cubrir el ancho completo del viewport mientras el texto queda dentro de la columna de
contenido. Ninguna cabecera SHALL llevar textura de puntos ni de rejilla. La solución MUST NOT
producir scroll horizontal en ningún ancho entre 320 y 1517 px.

#### Scenario: Subpágina de Resources a 1440 px
- **WHEN** se abre `/resources/frameworks` a 1440×900
- **THEN** la caja de la capa mesh empieza en x = 0, mide lo mismo que el viewport y el ancho de
  scroll del documento es igual al ancho del viewport

#### Scenario: Glosario sin capas decorativas
- **WHEN** se abre `/resources/glossary`
- **THEN** la cabecera no tiene capa mesh ni capa de textura (ruta auditada por Lighthouse) y el
  ancho de scroll de la cabecera es igual a su ancho visible

### Requirement: Componente único con variantes
Las páginas anteriores SHALL usar el mismo componente de hero con dos variantes (landing y
referencia), migas de pan en la variante de referencia, título, entradilla (texto o slot con
enlaces), nota opcional y enlace opcional al capítulo relacionado como línea bajo la entradilla. El
componente MUST NOT renderizar kicker ni eyebrow sobre el título. Las reglas de estilo del hero
MUST vivir en el componente y no duplicarse en las hojas de estilo de página.

#### Scenario: Landing con enlace al capítulo
- **WHEN** se abre `/role`
- **THEN** la cabecera muestra "Chapter 06 · Body of Knowledge" como enlace a `/bok/the-role`
  debajo de la entradilla y no existe ningún elemento de kicker sobre el título

#### Scenario: Ruta de aprendizaje sin capítulo erróneo
- **WHEN** se abre `/path`
- **THEN** la cabecera no atribuye la página al capítulo 06
