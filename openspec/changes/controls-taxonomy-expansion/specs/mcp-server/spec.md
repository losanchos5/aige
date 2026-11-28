# Spec Delta

## ADDED Requirements

### Requirement: Consulta de controles por familia y actor
La herramienta de controles del servidor MCP SHALL aceptar un filtro opcional por familia y otro por
actor, y SHALL devolver en cada control su familia primaria, sus familias secundarias y `appliesTo`.
El servidor SHALL poder listar las familias con su definición y su número de controles. Una familia
o un actor desconocidos SHALL producir un error que enumere los valores válidos. Sin filtros, la
respuesta SHALL contener los mismos controles que antes del cambio.

#### Scenario: Filtro por familia
- **WHEN** un cliente pide los controles de la familia `third-party`
- **THEN** recibe solo controles cuya familia primaria o secundaria es `third-party`

#### Scenario: Familia desconocida
- **WHEN** un cliente pide una familia que no existe
- **THEN** recibe un error con la lista de ids de familia válidos

#### Scenario: Sin filtros
- **WHEN** un cliente lista los controles sin filtros
- **THEN** recibe todos los controles del registro, cada uno con su familia
