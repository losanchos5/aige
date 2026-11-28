# Spec Delta

## ADDED Requirements

### Requirement: Familia y actor en el catálogo OSCAL
Cada control del catálogo OSCAL SHALL llevar un `prop` con su familia primaria, un `prop` por cada
familia secundaria y un `prop` por cada actor de `appliesTo`, en el mismo espacio de nombres que los
`prop` propios ya existentes. Los grupos del catálogo SHALL seguir siendo los perfiles, uno por
perfil, incluidos los perfiles nuevos. Los ficheros SHALL seguir validando contra los esquemas de
NIST y siendo reproducibles.

#### Scenario: Props de familia
- **WHEN** se lee un control en `/oscal/catalog.json`
- **THEN** tiene un `prop` de familia primaria cuyo valor es un id del registro de familias

#### Scenario: Validación intacta
- **WHEN** se ejecuta la comprobación OSCAL del build tras añadir los `prop` y los perfiles nuevos
- **THEN** catálogo, perfiles y mapeos validan contra los esquemas de NIST
