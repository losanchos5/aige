# value-chain-roles Specification

## Purpose
Un conjunto de datos tipado recoge la tabla de roles de la cadena de valor del capítulo 18 para que
figuras, herramientas y páginas del sitio puedan reutilizarla sin copiar texto del capítulo.

## Requirements

### Requirement: Dataset de roles entre regímenes
El sitio SHALL incluir `site/src/data/roles.ts`, que exporte el tipo `Role` con los campos `id`,
`regime`, `role`, `definition`, `sourceRef`, `duties`, `nearestEuRole` opcional,
`becomesProviderWhen` opcional, `anchor` y `verify` opcional, y un array `roles` con una fila por rol
y régimen: roles de operador del AI Act de la UE, desarrollador y desplegador de Colorado SB 26-189 y
de Texas HB 149, roles de la AI Basic Act de Corea y roles de ISO/IEC 22989. Las definiciones y los
deberes MUST estar redactados con palabras propias, y el material ISO/IEC MUST citarse solo por
identificador y título corto.

#### Scenario: El dataset compila
- **WHEN** se ejecuta `astro check` dentro de `bash D:/Documents/aige-wt/build.sh`
- **THEN** `roles.ts` compila sin errores de tipo en modo estricto

#### Scenario: Los disparadores del art. 25 están en los roles que pueden cambiar de sombrero
- **WHEN** un consumidor lee los roles `eu-deployer`, `eu-importer` y `eu-distributor`
- **THEN** cada uno trae en `becomesProviderWhen` los tres disparadores del art. 25(1), y
  `eu-product-manufacturer` trae los dos supuestos del art. 25(3)

### Requirement: Filas pendientes de verificar marcadas
Toda fila cuyo detalle no se haya podido confirmar contra la fuente primaria SHALL llevar
`verify: true` y la misma marca «(verify)» que usa el capítulo.

#### Scenario: Roles de ISO/IEC 22989
- **WHEN** un consumidor filtra las filas del régimen `iso-iec-22989`
- **THEN** todas llevan `verify: true` hasta que alguien confirme la cláusula contra la norma
