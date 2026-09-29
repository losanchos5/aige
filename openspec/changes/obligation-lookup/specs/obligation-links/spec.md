# Spec Delta

## ADDED Requirements

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
