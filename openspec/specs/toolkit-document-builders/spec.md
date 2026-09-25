# toolkit-document-builders Specification

## Purpose
Los constructores de documentos del toolkit convierten los esquemas publicados en `/schemas/*` en
formularios que producen registros válidos: la entrada del inventario de IA (sistema o agente), la
evaluación de impacto (FRIA, AIIA o adenda DPIA) y la ficha de modelo o de sistema. Validan contra
el mismo fichero que sirve el sitio, exportan en formatos abiertos, muestran cómo un registro
alimenta cada régimen y no envían a ningún servidor nada de lo que escribe el usuario.

## Requirements

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

### Requirement: Faithful to the chapter
Cada herramienta SHALL leer sus plazos, escalas, controles y métricas de datos en
`site/src/data/tool-*.ts` que reproducen el texto de su capítulo, y MUST NOT afirmar ningún plazo,
control, métrica ni obligación que el capítulo no enuncie. Cada ancla de capítulo que enlaza una
herramienta SHALL resolverse en la build contra los encabezados del capítulo, y la build MUST fallar
si el encabezado ya no existe.

#### Scenario: Tabla de relojes del capítulo 17
- **WHEN** se compara `regimes` y `clockNumbers` de `tool-incident-clock.ts` con la tabla "The
  overlapping clocks" de `bok/17-incidents.md`
- **THEN** quién notifica, el disparador, el primer informe, el seguimiento, el destinatario y cada
  cifra de horas, días y meses coinciden celda a celda

#### Scenario: Encabezado renombrado
- **WHEN** un encabezado de los capítulos 16, 17 o 23 que enlaza una herramienta cambia de texto
- **THEN** la build falla con el nombre del capítulo y del ancla que falta

### Requirement: Shared toolkit contract
Las cuatro herramientas SHALL seguir el contrato del toolkit: entrada `live` en
`site/src/data/toolkit.ts`, página dentro de `ToolShell` con el aviso fijo "Indicative, not legal
advice and not a conformity claim", guía y fuentes renderizadas en el servidor para lectura sin
JavaScript, módulo de cliente externo que importa `lib.js` y `form-kit.js`, estado en el fragmento
de la URL y JSON exportado con `kind` y `version`. Ningún script MUST enviar a la red nada de lo que
escribe el lector, ni usar scripts en línea o código de terceros.

#### Scenario: Sin red
- **WHEN** el lector rellena cualquiera de las cuatro herramientas y exporta todos sus formatos
- **THEN** la página no hace ninguna petición que contenga lo escrito

#### Scenario: Enlace reproducible
- **WHEN** el lector abre el enlace copiado de un resultado
- **THEN** la herramienta rellena el formulario y recalcula el mismo resultado

#### Scenario: Formulario incompleto
- **WHEN** falta una respuesta obligatoria
- **THEN** aparece un resumen de errores que recibe el foco y enlaza cada campo, y no se muestra
  resultado

### Requirement: Vendor due-diligence request
`/toolkit/vendor-due-diligence` SHALL calcular un nivel de riesgo (low, medium, high o critical) a
partir del tipo de suministro, el nivel de uso, la sensibilidad de los datos, la autonomía, las
jurisdicciones y el sector, con las razones del nivel, y SHALL producir entre 20 y 40 peticiones de
artefactos redactadas por el sitio. Cada petición MUST referenciar solo temas del crosswalk y ids de
control CSA AICM que el crosswalk ya contiene, y la lista de cláusulas MUST salir de
`site/src/data/contracts.ts`. SHALL exportar la petición en Markdown y CSV y un registro de respuesta
JSON que valide contra `vendor-due-diligence-response.v1`.

#### Scenario: Petición de nivel alto
- **WHEN** un modelo por API decide sobre personas con datos personales en la UE
- **THEN** el nivel es high y la petición incluye la documentación para proveedores posteriores, el
  resumen del contenido de entrenamiento, la política de derechos de autor y el informe de pruebas
  de sesgo

#### Scenario: Id de control desconocido
- **WHEN** una pregunta cita un id CSA AICM que el crosswalk no contiene
- **THEN** la build falla

#### Scenario: Registro de respuesta
- **WHEN** el lector anota las respuestas recibidas y la decisión del comprador
- **THEN** el JSON exportado valida contra `vendor-due-diligence-response.v1` y lista como abiertas
  las peticiones sin evidencia

### Requirement: Incident clock
`/toolkit/incident-clock` SHALL clasificar el evento en la escala de severidad del capítulo 17 y,
para cada régimen seleccionado (AI Act Art. 73, Art. 26(5) y Art. 55(1)(c), RGPD Arts. 33 y 34, NIS2
Art. 23 y DORA Art. 19), mostrar quién notifica a quién y cada plazo como fecha de calendario
contada desde el disparador que el capítulo indica. SHALL mostrar de forma destacada que cada fecha
se verifica con asesoría jurídica o con la autoridad, MUST NOT aplicar reglas de cómputo de plazos
que el capítulo no enuncia y MUST NOT decidir si un evento es notificable. SHALL exportar
recordatorios `.ics`, un resumen Markdown y un esqueleto de registro que valide contra
`incident-record.v1`.

#### Scenario: Plazo más corto del Art. 73
- **WHEN** un proveedor de un sistema del Anexo III registra una muerte y una perturbación de
  infraestructura crítica después del 2 Dec 2027
- **THEN** el plazo del Art. 73 es el de 2 días desde el conocimiento

#### Scenario: Régimen aún no aplicable
- **WHEN** el conocimiento es anterior a la fecha desde la que se aplica el régimen de alto riesgo al
  nivel del sistema
- **THEN** el reloj del Art. 73 aparece como pendiente y dice desde qué fecha se aplica

#### Scenario: DORA sin hora de clasificación
- **WHEN** una entidad financiera no ha fijado la hora de clasificación como incidente grave
- **THEN** el primer informe de DORA vence a las 24 horas del conocimiento

#### Scenario: Registro sin evidencia
- **WHEN** el lector pide el esqueleto de registro sin sistema, organización o evidencia
- **THEN** la herramienta no lo exporta y nombra cada carencia

### Requirement: Agent control profile
`/toolkit/agent-control-profile` SHALL derivar, a partir del nivel de autonomía, las herramientas y
servidores MCP con su clase de operación y alcance, las clases de datos, la memoria, las acciones
externas, el modelo de identidad y los puntos de aprobación, el conjunto mínimo de controles del
capítulo 23 con el patrón que aplica cada uno, y las carencias entre lo descrito y lo que el
capítulo exige. Cada control MUST enlazar una sección real del capítulo 23 y un patrón existente.
SHALL exportar una entrada de registro que valide contra `agent-register-entry.v1` y una lista de
comprobación en Markdown y CSV.

#### Scenario: Operador con credenciales del usuario
- **WHEN** un agente de nivel Operator tiene herramientas de escritura y usa el token del usuario
- **THEN** el perfil exige herramientas de solo lectura y señala dos carencias

#### Scenario: Entrada de registro
- **WHEN** el lector exporta la entrada de un agente con aprobación antes de pagos
- **THEN** el JSON valida contra `agent-register-entry.v1` y la herramienta de pago lleva
  `requires_approval: true`

### Requirement: Fairness metric chooser
`/toolkit/fairness-metric-chooser` SHALL recorrer las preguntas que el capítulo 16 dice que deciden
la métrica (tipo de daño, verdad de referencia, error más costoso, marco legal y acceso al atributo
protegido) y SHALL devolver familias de métricas principales, comprobaciones secundarias,
advertencias y notas legales, cada una enlazada a su ancla del capítulo 16. Cuando la etiqueta no es
fiable, las métricas que dependen de ella MUST aparecer como diferidas a la revisión de la etiqueta
o a la llegada de resultados. SHALL exportar Markdown y JSON.

#### Scenario: Selección en empleo en EE. UU.
- **WHEN** la decisión es de asignación, hay etiquetas fiables, el error más costoso es el falso
  negativo y el marco es empleo en EE. UU.
- **THEN** las métricas principales son igualdad de oportunidades y paridad demográfica, con la
  nota de la regla de los cuatro quintos

#### Scenario: Sistema generativo
- **WHEN** el daño es de un sistema generativo sin verdad de referencia
- **THEN** la herramienta propone pruebas contrafactuales y un suelo de calidad por grupo
