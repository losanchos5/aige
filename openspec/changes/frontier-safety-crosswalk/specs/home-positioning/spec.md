# Spec Delta

## ADDED Requirements

### Requirement: Tile del crosswalk de frontera
Los tiles de la portada SHALL incluir uno hacia `/resources/frontier-safety-crosswalk`, colocado justo
después del tile del Crosswalk, sin desplazar "Open controls" de la segunda posición. Para mantener el
bento en doce tiles, la portada MUST NOT incluir ya los tiles de `/bok/glossary` y `/bok/reading-list`
(siguen enlazados desde la navegación y el pie), y "Research notes" SHALL ser el último tile.

#### Scenario: Tile presente
- **WHEN** se abre `/`
- **THEN** un tile enlaza `/resources/frontier-safety-crosswalk`, el segundo tile sigue enlazando
  `/controls` y el último enlaza `/research`
