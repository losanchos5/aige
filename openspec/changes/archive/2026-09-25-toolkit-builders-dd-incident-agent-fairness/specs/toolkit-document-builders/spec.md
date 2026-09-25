# Spec Delta

## Purpose

Cuatro herramientas del toolkit convierten un cuestionario en un documento que el lector se lleva:
una petición de due diligence a un proveedor de IA, el calendario de notificaciones de un incidente,
el perfil de controles y la entrada de registro de un agente, y la elección razonada de una métrica
de equidad. Cada una reproduce su capítulo sin afirmar nada más, funciona entera en el navegador y
exporta en formatos abiertos que validan contra los esquemas publicados del sitio.

## ADDED Requirements

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
