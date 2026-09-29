# obligation-links Specification

## Purpose
Las obligaciones se unen por su id estable en todo el sitio: el crosswalk enlaza cada fila con
`/obligations/<id>` y sus exportaciones llevan `obligationId` y `obligationUrl`, sin depender del texto.

## Requirements

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

### Requirement: Unión por cláusula exacta
Una referencia del crosswalk que no declare `obligationId` SHALL recibir el id de la fila del
registro cuando exista exactamente una fila con el mismo instrumento (`frameworkId`) y la misma
cláusula, comparadas sin mayúsculas, espacios, puntos ni el prefijo "Art." o "Arts.". Si hay cero o
varias filas candidatas la referencia MUST quedar sin unir. Las exportaciones del crosswalk y la
página del tema SHALL reflejar esa unión igual que una declarada a mano.

#### Scenario: Cláusula idéntica
- **WHEN** el crosswalk archiva EU AI Act Art. 87 sin `obligationId` y el registro tiene la fila
  `AIGE-OBL-EUAIA-ART87`
- **THEN** la referencia enlaza `/obligations/aige-obl-euaia-art87` y `crosswalk.json` lleva ese
  `obligationId`

#### Scenario: Cláusula sin fila
- **WHEN** el crosswalk archiva ISO/IEC 42001 6.1.2 y el registro no tiene fila con esa cláusula
- **THEN** la referencia no lleva `obligationId`
