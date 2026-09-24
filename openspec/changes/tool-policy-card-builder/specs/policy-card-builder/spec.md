# Spec Delta

## Purpose

El constructor de Policy Cards convierte el patrón Policy Card en una herramienta del toolkit: a
partir de una regla curada o de una condición propia genera, en el navegador y sin enviar nada, la
tarjeta para personas y máquinas, el módulo OPA/Rego con sus pruebas, un stub Cedar con sus pruebas
y el hook de CI que la ejecuta.

## ADDED Requirements

### Requirement: Plantillas de reglas curadas y regla propia
El sitio SHALL ofrecer en `/toolkit/policy-card` seis reglas curadas (ningún agente sin registrar en
producción; puntuación de eval igual o superior a un umbral antes de desplegar; ningún dato personal
a un modelo externo; aprobación humana para una herramienta concreta; model card presente antes de
publicar; una excepción caducada bloquea la build) y una regla propia sobre un campo de la entrada.
Cada plantilla MUST declarar enunciado, efecto, puntos de aplicación, modo de fallo, obligaciones por
defecto con ids estables del registro de obligaciones y el patrón que construye; la build MUST fallar
si una plantilla nombra una obligación o un patrón que no existe.

#### Scenario: Regla curada con sus valores por defecto
- **WHEN** el lector elige una regla curada
- **THEN** el formulario muestra solo sus parámetros y rellena el id de tarjeta, el título, el id de
  regla, el alcance, la cláusula de origen y las obligaciones por defecto de esa regla

#### Scenario: Regla propia
- **WHEN** el lector elige "Write your own rule" y fija acción, campo, operador, valor y efecto
- **THEN** el módulo Rego, el stub Cedar y sus pruebas expresan esa condición con ese efecto

### Requirement: Salidas válidas y comprobables
La herramienta SHALL generar la Policy Card en Markdown, YAML y JSON, y la tarjeta JSON MUST validar
contra `/schemas/policy-card.v1.json` (el navegador lo comprueba y lo dice). El YAML MUST releerse
como el mismo JSON. SHALL generar además un módulo OPA/Rego en sintaxis Rego v1 con las reglas
`decision`, `blocks` y `verdict` (con `rule_id`, `decision`, `input_hash` y `timestamp`), sus
pruebas para `opa test`, un stub Cedar con `@id` y `@effect` y sus pruebas para `cedar run-tests`,
un input de ejemplo conforme y un workflow de GitHub Actions. Todo lo generado MUST decir
"Illustrative, review before use".

#### Scenario: Tarjeta por defecto
- **WHEN** el lector construye la tarjeta con los valores por defecto de cualquier plantilla
- **THEN** aparecen nueve ficheros, la tarjeta valida contra el esquema y el módulo Rego declara el
  paquete `aige.cards.<id>` y el id de la regla

#### Scenario: Hook de CI en un punto de bloqueo
- **WHEN** la regla se aplica en `pre_merge`, `deploy` o `periodic` con efecto `deny` o `allow`
- **THEN** el workflow comprueba y prueba el módulo, guarda el veredicto como artefacto y falla el
  job con `opa eval --fail-defined` sobre `blocks`

#### Scenario: Hook de CI de una regla de runtime
- **WHEN** la regla solo se aplica en `runtime`
- **THEN** el workflow solo comprueba y prueba el módulo y explica cómo la pasarela pide el veredicto

### Requirement: Valores seguros para el código generado
Todo valor que acaba en código generado SHALL limitarse a caracteres que no necesitan escape en
Rego, Cedar, YAML o un nombre de fichero, y el texto libre MUST quedar en comentarios o cadenas sin
saltos de línea. Un valor no válido MUST impedir la generación, nombrarse en un resumen de errores
que recibe el foco y marcarse en su campo con `aria-invalid` y un mensaje enlazado por
`aria-describedby`.

#### Scenario: Valor no válido
- **WHEN** el lector escribe un umbral que no es un número o un id de tarjeta con espacios
- **THEN** no se genera nada, el resumen de errores recibe el foco y cada campo afectado queda
  marcado

### Requirement: Nada sale del navegador y el estado vive en el enlace
La herramienta MUST ejecutarse entera en la página (sin peticiones de red con lo que escribe el
lector, sin scripts en línea ni código de terceros) y SHALL guardar los valores en el fragmento del
enlace, de modo que un enlace copiado reconstruya la misma tarjeta.

#### Scenario: Enlace copiado
- **WHEN** se abre un enlace con el estado de una tarjeta construida
- **THEN** la página marca la misma regla, rellena los mismos valores y reconstruye los ficheros

### Requirement: Muestras publicadas y comprobadas
El sitio SHALL publicar en `/templates/policy-cards/` los ficheros de la tarjeta por defecto de cada
plantilla, generados por el mismo código que la página, y las pruebas MUST fallar si las muestras se
separan del generador. Las muestras de Rego MUST pasar `opa check --strict` y `opa test`, y las de
Cedar `cedar run-tests`.

#### Scenario: Deriva de las muestras
- **WHEN** cambia una plantilla o el generador sin regenerar las muestras
- **THEN** `tests/policy-card.spec.ts` falla hasta ejecutar `scripts/policy-card-samples.mjs`
