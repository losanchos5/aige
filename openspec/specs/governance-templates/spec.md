# governance-templates Specification

## Purpose
La biblioteca de plantillas y esquemas convierte los registros de la gobernanza de IA en artefactos
validables: cada esquema publica los campos de un registro, las obligaciones que ayuda a evidenciar
y su lugar en el stack, cada ejemplo valida, cada plantilla humana usa los mismos campos, y la build
falla si algo de eso deriva.

## Requirements

### Requirement: Esquemas publicados con identidad estable
El sitio SHALL publicar en `/schemas/<nombre>.v1.json` un JSON Schema draft 2020-12 por registro,
con `$schema` del draft 2020-12, un `$id` igual a
`https://aigovernanceengineer.com/schemas/<nombre>.v1.json`, `title`, `description`, `type: object`
y una lista `required` no vacía. Cada esquema MUST declarar en la raíz `x-evidences` (referencias a
obligaciones por identificador), `x-layer` (capas 1 a 5), `x-pattern` (URL de patrones del
capítulo 05) y `x-lifecycle-stage`, y cada propiedad MUST llevar `description`.

#### Scenario: El `$id` no coincide con el fichero
- **WHEN** un esquema declara un `$id` distinto de su nombre de fichero
- **THEN** `npm run build` falla en `schemas-check` indicando el fichero y el `$id` esperado

#### Scenario: Palabra clave no soportada
- **WHEN** un esquema usa una palabra clave de validación que el validador mínimo no implementa
  (por ejemplo `oneOf`)
- **THEN** la build falla nombrando la ruta y la palabra clave, en lugar de ignorarla

### Requirement: Ejemplos que validan y plantillas con los mismos campos
Cada esquema SHALL tener un ejemplo relleno en `/schemas/examples/<nombre>.example.json` cuyo
`$schema` es el `$id` del esquema y que MUST validar contra él, y una plantilla humana en
`/templates/<nombre>.md` que enlaza el `$id` y nombra cada campo de primer nivel. Los ejemplos MUST
estar desidentificados y usar roles, no nombres de personas.

#### Scenario: Un ejemplo deja de validar
- **WHEN** a un ejemplo le falta un campo requerido, trae un valor fuera de su `enum`, una fecha
  imposible o un campo no declarado
- **THEN** la build falla listando cada error con su ruta dentro del ejemplo

#### Scenario: Plantilla desalineada
- **WHEN** un esquema gana un campo de primer nivel que su plantilla no nombra
- **THEN** la build falla indicando la plantilla y el campo

### Requirement: Compatibilidad con las formas del capítulo 05
Las formas JSON ilustrativas del capítulo de patrones (veredicto, resultado de eval, entrada de
registro y registro de evidencia) MUST validar contra `policy-card` (`$defs/verdict`),
`eval-result`, `agent-register-entry`, `ai-system-register-entry` y `evidence-record`. La
comprobación SHALL leer los bloques del propio `bok/05-patterns.md` en cada build.

#### Scenario: El capítulo cambia una forma
- **WHEN** el capítulo 05 añade a una forma ilustrativa un campo que el esquema no admite
- **THEN** la build falla señalando el bloque del capítulo y el esquema afectado

### Requirement: Registro de incidentes alineado con las plantillas de reporte
El esquema `incident-record` SHALL nombrar sus campos según la plantilla de la Comisión para
incidentes graves de modelos de IA de uso general con riesgo sistémico y el marco común de reporte
de incidentes de la OCDE, indicando en `x-aligns-with` el punto o criterio que cada campo cubre, y
MUST exigir los siete criterios obligatorios del marco de la OCDE.

#### Scenario: Informe generado desde el registro
- **WHEN** un equipo rellena un `incident-record` válido
- **THEN** cada punto de la plantilla de la Comisión y cada criterio obligatorio de la OCDE tiene un
  campo del registro del que tomar su contenido

### Requirement: Kit de políticas con una sola fuente
El kit SHALL incluir `ai-policy.yaml` como fuente única de la política de IA y dos vistas derivadas,
`ai-policy.md` (prosa) y `ai-policy.rego` (esqueleto ejecutable), enlazadas por los mismos
identificadores de regla, más `committee-charter.md`, `raci.csv`, `policy-gap-assessment.csv`,
`literacy-curriculum.csv` y `contract-clause-checklist.md`. Los CSV MUST ser rectangulares y los
ficheros de la biblioteca MUST NOT contener la raya (U+2014).

#### Scenario: CSV con columnas desiguales
- **WHEN** una fila de un CSV del kit tiene más o menos columnas que la cabecera
- **THEN** la build falla indicando el fichero y la fila

#### Scenario: Veredicto trazable a la política
- **WHEN** el esqueleto Rego deniega una acción
- **THEN** el mensaje empieza por el identificador de la regla del YAML que lo produjo

### Requirement: Página de la biblioteca
El sitio SHALL publicar `/resources/templates`, construida desde los propios ficheros de esquema,
con una fila por esquema y por plantilla del kit que muestre propósito, obligaciones evidenciadas,
patrones (enlazados a anclas existentes de `/bok/patterns`), capa y enlaces de descarga, y una lista
de fuentes numeradas. La página MUST declarar que las correspondencias son ilustrativas, no una
declaración de conformidad ni asesoramiento jurídico.

#### Scenario: Enlaces que resuelven
- **WHEN** se ejecuta `npm run build`
- **THEN** la comprobación de enlaces encuentra cada esquema, ejemplo, plantilla y ancla de patrón
  enlazados desde la página

#### Scenario: Esquema nuevo sin tocar la página
- **WHEN** se añade un esquema válido a `public/schemas/`
- **THEN** la página lo lista en su etapa del ciclo de vida sin editar el código de la página
