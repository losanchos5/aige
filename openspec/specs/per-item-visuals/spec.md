# per-item-visuals Specification

## Purpose
TBD - created by archiving change page-visuals. Update Purpose after archive.

## Requirements

### Requirement: Visuales temporales con marca de hoy
`/obligations`, `/obligations/[id]`, `/patterns/[id]`, `/for/[slug]` y la página de plazos del AI Act
(EN y ES) SHALL mostrar un eje temporal generado desde las fechas de aplicación de sus datos, de
izquierda a derecha (vertical a 390 px), con una marca de la fecha de build y el sello As of.

#### Scenario: Fechas del dataset
- **WHEN** una obligación tiene fecha de aplicación e hitos
- **THEN** el eje de su página los pinta todos y la tabla alternativa los lista con las mismas fechas

### Requirement: Plantillas por ítem sin registro
Las rutas dinámicas SHALL generar su visual por ítem dentro del componente, sin entrada en
`figures.ts`: pajarita en `/cases/[id]`, anatomía del control con pass frente a fail en
`/controls/[profile]/[control]`, constelación (RelationRadial) en `/obligations/[id]`,
`/patterns/[id]`, `/controls/[profile]/[control]` y `/glossary/[slug]`, huella por capítulo en
`/glossary/[slug]`, tabla periódica y heatmap de cobertura en `/controls/[profile]`, y carriles de
aplicación en `/controls`.

#### Scenario: Pocas relaciones
- **WHEN** un ítem tiene menos de 3 relaciones
- **THEN** la constelación no se pinta y la página conserva sus listas

#### Scenario: Evidencia como nodo final
- **WHEN** se dibuja la pajarita de un caso o la anatomía de un control
- **THEN** el último nodo es el artefacto de evidencia con el glifo de documento con check y el color de su capa
