# Spec Delta

## ADDED Requirements

### Requirement: Buscador por artículo en el crosswalk
La página `/resources/crosswalk` SHALL mostrar el buscador "Look up an article" antes de la matriz,
de modo que el lector que llega con una cláusula concreta vaya a su página de obligación o a su tema
sin recorrer la matriz. Las celdas de la matriz SHALL seguir abriendo el panel del tema, y cada
referencia del panel que tenga fila en el registro SHALL enlazar su página de obligación.

#### Scenario: Del crosswalk a la obligación
- **WHEN** el lector escribe "AI Act 9" en el buscador de `/resources/crosswalk` y pulsa Intro
- **THEN** llega a `/obligations/aige-obl-euaia-art9`

#### Scenario: Panel del tema
- **WHEN** el lector abre la celda EU AI Act del tema "Governance and accountability"
- **THEN** la referencia Art. 87 del panel enlaza su página de obligación
