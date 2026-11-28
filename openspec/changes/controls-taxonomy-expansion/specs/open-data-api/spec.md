# Spec Delta

## ADDED Requirements

### Requirement: Familia y actor en los datos de controles
Cada control de `/api/v1/controls.json` y de `/api/v1/controls/<id>.json` SHALL incluir `family`
(id de la familia primaria), `secondaryFamilies` (lista, posiblemente vacía), `appliesTo` (lista de
actores) y `mappingsReviewed` (fecha). `/api/v1/controls.json` SHALL incluir además la lista
`families` con id, orden, título, definición, anclas (marco, referencia, URL, fecha) y número de
controles. Los campos SHALL ser aditivos: ningún campo existente cambia de nombre, tipo o
significado, y la versión de la API no cambia. El documento OpenAPI SHALL describir los campos
nuevos.

#### Scenario: Campos nuevos presentes
- **WHEN** se lee `/api/v1/controls.json`
- **THEN** cada control tiene `family`, `secondaryFamilies`, `appliesTo` y `mappingsReviewed`, y el
  valor de `family` existe en `families`

#### Scenario: Compatibilidad
- **WHEN** un cliente escrito contra la respuesta anterior lee la nueva
- **THEN** todos los campos que leía siguen presentes con el mismo tipo

#### Scenario: OpenAPI al día
- **WHEN** se valida una respuesta de controles contra el documento OpenAPI publicado
- **THEN** valida, incluidos los campos nuevos
