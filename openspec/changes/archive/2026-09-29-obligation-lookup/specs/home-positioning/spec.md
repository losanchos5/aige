# Spec Delta

## ADDED Requirements

### Requirement: Tile del buscador por artículo
Los tiles de la portada SHALL incluir "Look up an article", con la pregunta "What does Article X
require, and what else covers it?", hacia `/obligations#lookup`, sin desplazar "Open controls" de
la segunda posición.

#### Scenario: Tile presente
- **WHEN** se abre `/`
- **THEN** un tile enlaza `/obligations#lookup` y el segundo tile sigue enlazando `/controls`
