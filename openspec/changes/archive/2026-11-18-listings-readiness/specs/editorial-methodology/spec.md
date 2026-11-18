## MODIFIED Requirements

### Requirement: Página de metodología
El sitio SHALL publicar `/about/methodology` con secciones sobre la selección de fuentes, las
etiquetas `primary`, `secondary` y `reported`, las fechas "as of", la cadencia de revisión, las
comprobaciones de la build, las correcciones y contribuciones (con enlaces a los formularios de
issue) y el versionado con DOI. Cada afirmación MUST ser comprobable en el repositorio o citar una
fuente numerada en el formato de la casa, y la página MUST NOT afirmar nada sobre financiación o
patrocinio: esa declaración es del autor y vive en `/about/independence`, que la página SHALL
enlazar. La ruta SHALL figurar en `SOURCE_BY_PATH`, en el grupo About de la navegación y en
`/about`.

#### Scenario: Enlaces de la página
- **WHEN** se carga `/about/methodology`
- **THEN** enlaza `/about/changelog`, `/about/contributors` y los formularios de issue del
  repositorio, y muestra la versión y el DOI desde `site.ts`

#### Scenario: Sin afirmaciones de independencia inventadas
- **WHEN** se lee la página
- **THEN** no hace ninguna declaración de financiación, patrocinio o independencia y enlaza
  `/about/independence`, donde está la del autor
