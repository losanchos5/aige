# page-hero Specification

## Purpose

La cabecera de página (hero) de las landings y de las páginas de referencia cubre el ancho completo
del viewport con sus capas de fondo, se construye con un único componente y admite migas de pan,
kicker, enlace al capítulo relacionado y notas.

## Requirements

### Requirement: Fondo del hero a ancho completo
En `/resources`, sus cinco subpáginas (`frameworks`, `crosswalk`, `tools`, `reading-list`, `glossary`), `/role`, `/stack`, `/path` y `/map`, la cabecera de página SHALL ir sobre el fondo de papel de la página, sin capa mesh, y cerrarse con una línea de 1px a ancho completo del viewport mientras el texto queda dentro de la columna de contenido. La solución MUST NOT producir scroll horizontal en ningún ancho entre 900 y 1517 px.

#### Scenario: Subpágina de Resources a 1440 px
- **WHEN** se abre `/resources/frameworks` a 1440×900
- **THEN** la cabecera no contiene capa mesh y el ancho de scroll del documento es igual al ancho del viewport

#### Scenario: Glosario sin mesh
- **WHEN** se abre `/resources/glossary`
- **THEN** la cabecera no contiene capa mesh y el título usa la tipografía de títulos del sitio

### Requirement: Componente único con variantes
Las páginas anteriores SHALL usar el mismo componente de hero con dos variantes (landing y
referencia), kicker con muestra de color o migas de pan, título, entradilla (texto o slot con
enlaces), nota opcional y enlace opcional al capítulo relacionado. Las reglas de estilo del hero
MUST vivir en el componente y no duplicarse en las hojas de estilo de página.

#### Scenario: Landing con enlace al capítulo
- **WHEN** se abre `/role`
- **THEN** la cabecera muestra "Chapter 06 · Body of Knowledge" como enlace a `/bok/the-role`

#### Scenario: Ruta de aprendizaje sin capítulo erróneo
- **WHEN** se abre `/path`
- **THEN** la cabecera no atribuye la página al capítulo 06

### Requirement: Sin regresión visual ni de accesibilidad
Tras la migración, las capturas de revisión de Resources (E), landings (D) y ruta (B) SHALL
regenerarse, la suite de layout SHALL seguir en verde y la auditoría axe MUST NOT reportar
violaciones serias o críticas en las páginas migradas.

#### Scenario: Suite de layout
- **WHEN** se ejecutan los tests de layout y de hero
- **THEN** todos pasan en los seis anchos definidos
