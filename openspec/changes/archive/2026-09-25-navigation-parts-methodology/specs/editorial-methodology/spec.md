# Spec Delta

## Purpose

El sitio explica cómo trabaja: cómo elige y etiqueta sus fuentes, cómo mantiene las fechas, cómo se
corrige, cómo se contribuye y cómo se versiona, y ofrece formularios para cada tipo de aportación.

## ADDED Requirements

### Requirement: Página de metodología
El sitio SHALL publicar `/about/methodology` con secciones sobre la selección de fuentes, las
etiquetas `primary`, `secondary` y `reported`, las fechas "as of", la cadencia de revisión, las
comprobaciones de la build, las correcciones y contribuciones (con enlaces a los formularios de
issue) y el versionado con DOI. Cada afirmación MUST ser comprobable en el repositorio o citar una
fuente numerada en el formato de la casa, y la página MUST NOT afirmar nada sobre financiación o
patrocinio. La ruta SHALL figurar en `SOURCE_BY_PATH`, en el grupo About de la navegación y en
`/about`.

#### Scenario: Enlaces de la página
- **WHEN** se carga `/about/methodology`
- **THEN** enlaza `/about/changelog`, `/about/contributors` y los formularios de issue del
  repositorio, y muestra la versión y el DOI desde `site.ts`

#### Scenario: Sin afirmaciones de independencia inventadas
- **WHEN** se lee la página
- **THEN** no contiene ninguna declaración de financiación, patrocinio o independencia

### Requirement: Roles de autoría y revisión
`bok/CONTRIBUTORS.md` SHALL definir los roles de autor, revisor y colaborador, qué hace cada uno,
cómo se acredita a un revisor (por nombre, con la versión y los capítulos revisados) y que ningún
rol cambia la autoría declarada salvo acuerdo expreso. La sección MUST NOT añadir nombres.

#### Scenario: Revisor acreditado
- **WHEN** un revisor termina la revisión de un capítulo para una versión
- **THEN** la política indica en qué lista y con qué forma se le acredita

### Requirement: Formularios de issue
El repositorio SHALL ofrecer formularios de issue para reportar un error en una página (con campo
URL obligatorio), proponer una fila de obligación, proponer un término de glosario y proponer un
caso, además de los formularios existentes para firmar la Tesis y sugerir una fuente. Cada
formulario que propone contenido MUST pedir la fuente primaria y su etiqueta de verificación.

#### Scenario: Reporte de error
- **WHEN** un lector abre el formulario "Report an error on a page"
- **THEN** debe indicar la URL de la página y qué está mal antes de enviarlo
