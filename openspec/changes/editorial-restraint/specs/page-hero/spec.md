# Spec Delta

## MODIFIED Requirements

### Requirement: Fondo del hero a ancho completo
En `/resources`, sus cinco subpáginas (`frameworks`, `crosswalk`, `tools`, `reading-list`, `glossary`), `/role`, `/stack`, `/path` y `/map`, la cabecera de página SHALL ir sobre el fondo de papel de la página, sin capa mesh, y cerrarse con una línea de 1px a ancho completo del viewport mientras el texto queda dentro de la columna de contenido. La solución MUST NOT producir scroll horizontal en ningún ancho entre 900 y 1517 px.

#### Scenario: Subpágina de Resources a 1440 px
- **WHEN** se abre `/resources/frameworks` a 1440×900
- **THEN** la cabecera no contiene capa mesh y el ancho de scroll del documento es igual al ancho del viewport

#### Scenario: Glosario sin mesh
- **WHEN** se abre `/resources/glossary`
- **THEN** la cabecera no contiene capa mesh y el título usa la tipografía de títulos del sitio
