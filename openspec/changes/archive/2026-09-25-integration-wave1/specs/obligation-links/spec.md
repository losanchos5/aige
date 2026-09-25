# Spec Delta

## ADDED Requirements

### Requirement: Unión del crosswalk por id estable
Cada referencia del crosswalk que corresponda a una fila del registro de obligaciones SHALL nombrarla
por su id estable (`obligationId`, `AIGE-OBL-...`), y todo id MUST existir en `frameworks.ts`. La
unión por texto literal (`obligation`) MAY resolverse como unión heredada, pero el crosswalk v0.5.0
MUST NOT usarla. El enlace de la referencia SHALL llevar a `/obligations/<id>`, y las exportaciones
`crosswalk.json` y `crosswalk.csv` SHALL añadir el id sin quitar ni renombrar campos de la
`schemaVersion` 2.

#### Scenario: Fila reformulada
- **WHEN** el texto de una obligación cambia en `frameworks.ts` y su id no
- **THEN** el crosswalk sigue enlazando la misma página de obligación y los tests de datos pasan

#### Scenario: Id inexistente
- **WHEN** una referencia del crosswalk nombra un `obligationId` que no está en el registro
- **THEN** el test de datos falla nombrando el tema, la cláusula y el id

### Requirement: Tabla de obligaciones y casos enlazan el registro
Cada fila de `ObligationTable` SHALL enlazar su página `/obligations/<id>` y mostrar su id; cuando la
fila corresponda a un patrón, su artefacto SHALL enlazar la página `/patterns/<slug>`. Un caso MAY
declarar `obligationId` en cada obligación que toca, y la página del caso SHALL enlazar entonces la
página de esa obligación.

#### Scenario: Artículo 15 en la tabla
- **WHEN** se abre `/resources/frameworks`
- **THEN** la fila del artículo 15 enlaza `/obligations/aige-obl-euaia-art15` y su artefacto enlaza
  `/patterns/eval-gate-in-ci`
