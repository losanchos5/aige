# Spec Delta

## Purpose

Los constructores de documentos del toolkit convierten los esquemas publicados en `/schemas/*` en
formularios que producen registros válidos: la entrada del inventario de IA (sistema o agente), la
evaluación de impacto (FRIA, AIIA o adenda DPIA) y la ficha de modelo o de sistema. Validan contra
el mismo fichero que sirve el sitio, exportan en formatos abiertos, muestran cómo un registro
alimenta cada régimen y no envían a ningún servidor nada de lo que escribe el usuario.

## ADDED Requirements

### Requirement: Validación contra el esquema publicado
Cada constructor SHALL validar el registro contra el JSON Schema publicado en
`site/public/schemas/<nombre>.v1.json`, leído en build desde ese fichero y entregado al cliente en
la isla JSON de `ToolShell`. Un registro con errores MUST mostrar un resumen de errores al principio
del formulario, con foco en el resumen y un enlace por error al campo afectado. Todo registro
exportado MUST llevar `$schema` con el `$id` del esquema.

#### Scenario: Entrada sin campos obligatorios
- **WHEN** el usuario pulsa "Check the entry" en `/toolkit/ai-register-entry` con el formulario vacío
- **THEN** aparece "Fix these fields" con un enlace por cada campo obligatorio que falta, el foco va
  al resumen y el registro no se añade al inventario

#### Scenario: Ejemplo publicado
- **WHEN** se valida con el validador de `builders.js` cualquiera de los ejemplos de
  `/schemas/examples/` de los esquemas que usan los constructores
- **THEN** no hay errores, y un ejemplo roto a propósito sí los tiene

### Requirement: Esquemas v1 ampliados sin romperlos
Los campos que los constructores necesitan y que el esquema v1 no tenía SHALL añadirse como
propiedades opcionales (fuera de `required`) del mismo esquema v1, con `description`, de modo que
cualquier registro válido antes siga siendo válido. Cada campo del formulario MUST existir en el
esquema con un tipo compatible, y cada campo que el esquema exige MUST estar en el formulario.

#### Scenario: Registro v1 anterior
- **WHEN** se valida un registro de evaluación de impacto escrito antes de la ampliación, sin
  `iso42005_sections` ni `risks[].id`
- **THEN** valida sin errores

### Requirement: Inventario con importación y exportación masiva
`/toolkit/ai-register-entry` SHALL construir entradas de sistema de IA y de agente, guardarlas en un
registro en `localStorage` del navegador e importar y exportar ese registro en JSON y en CSV según
RFC 4180 (campos anidados con puntos, listas de texto separadas por `; `, listas de registros como
JSON en una celda, protección contra fórmulas que la importación deshace). La exportación CSV MUST
reimportarse sin cambios. Cada entrada importada MUST validarse y el informe de importación MUST
listar las que fallan con sus primeros errores.

#### Scenario: Ida y vuelta en CSV
- **WHEN** se exporta a CSV un registro con una entrada de sistema y una de agente y se vuelve a
  importar
- **THEN** las entradas reimportadas son iguales a las exportadas

### Requirement: Resumen público y crosswalk de campos
El constructor de inventario SHALL exportar un resumen público en Markdown que deje fuera los campos
internos, y SHALL mostrar para la entrada una tabla que indique, por campo, el nombre del campo
equivalente en UK ATRS (plantilla v4.0), Canadá AIA, el Anexo VIII del Reglamento (UE) 2024/1689
(secciones A, B y C, con las supresiones del Reglamento (UE) 2026/1744), la ficha de modelo (Hugging
Face y CycloneDX) y la declaración de aplicabilidad de ISO/IEC 42001. La tabla MUST citar solo
nombres de campo, con fuentes numeradas, y MUST decir que la correspondencia es ilustrativa, no una
declaración de conformidad; la tabla completa MUST renderizarse en el servidor.

#### Scenario: Crosswalk de una entrada
- **WHEN** el usuario comprueba una entrada con nombre y descripción pública
- **THEN** la tabla "Where this entry's fields go" muestra esos valores junto al campo de cada
  régimen, y se puede descargar en CSV y en Markdown

### Requirement: Evaluación de impacto por tipo con riesgos enlazados
`/toolkit/impact-assessment` SHALL ofrecer tres tipos: FRIA (los seis elementos del art. 27(1),
puntos (a) a (f)), AIIA (elementos documentados por identificador de cláusula de ISO/IEC 42005) y
adenda de IA a una DPIA (puntos (a) a (d) del art. 35(7) del RGPD más los campos específicos de IA).
Cada riesgo SHALL tener un identificador y cada medida MUST poder nombrar los riesgos que cubre, el
patrón del sitio que la implementa y sus controles; la matriz riesgo-medida MUST señalar los riesgos
sin medida y las medidas sin riesgo. Los disparadores de reapertura SHALL formar parte del registro.
La exportación SHALL ofrecer JSON, YAML y Markdown del mismo registro.

#### Scenario: FRIA con un riesgo sin medida
- **WHEN** una FRIA tiene dos riesgos y una sola medida que cubre el primero
- **THEN** la matriz muestra el segundo riesgo como no cubierto y la cobertura del art. 27(1) marca
  los elementos que faltan

#### Scenario: YAML equivalente
- **WHEN** se exporta la misma evaluación en JSON y en YAML
- **THEN** el YAML leído de nuevo es el mismo objeto que el JSON

### Requirement: Ficha de modelo con cobertura y exportaciones estándar
`/toolkit/model-card` SHALL construir un registro que valida contra `model-card.v1.json` y SHALL
mostrar una lista de cobertura por obligación (art. 11 y Anexo IV y art. 13(3) cuando el sistema es
de alto riesgo, art. 53(1) cuando es un modelo GPAI, Anexo A de ISO/IEC 42001 y NIST AI RMF MAP y
MEASURE siempre), con cada punto enlazado a su obligación del registro de obligaciones. La ficha
SHALL exportarse como Markdown estilo Hugging Face con front matter YAML y como BOM CycloneDX 1.7
en JSON con un componente de tipo `machine-learning-model` y su `modelCard`, que MUST validar contra
el esquema JSON oficial de CycloneDX 1.7.

#### Scenario: BOM CycloneDX
- **WHEN** se exporta a CycloneDX el ejemplo publicado de ficha de modelo
- **THEN** el documento tiene `bomFormat: "CycloneDX"`, `specVersion: "1.7"`, un `serialNumber` UUID
  y un componente `machine-learning-model`, y valida contra `bom-1.7.schema.json`

### Requirement: Nada sale del navegador
Los tres constructores SHALL funcionar enteros en el navegador: sin peticiones de red con lo que
escribe el usuario, sin subidas y sin persistencia más allá de borradores y del registro en
`localStorage`, que MUST tolerar un almacenamiento bloqueado. Cada página MUST mostrar el aviso fijo
"Indicative, not legal advice and not a conformity claim" y, sin JavaScript, MUST seguir enseñando
sus campos, elementos, cláusulas y crosswalk como hoja de trabajo.

#### Scenario: Sin red
- **WHEN** el usuario rellena y exporta cualquiera de los tres constructores
- **THEN** la página no hace ninguna petición que contenga lo escrito

#### Scenario: Sin JavaScript
- **WHEN** se abre cualquiera de los tres constructores con JavaScript desactivado
- **THEN** se leen el aviso, las listas de campos, las tablas y las fuentes, y no queda ningún
  control inútil visible
