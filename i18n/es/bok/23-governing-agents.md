---
lang: es
source: bok/23-governing-agents.md
sourceHash: "68496168af91fdc6ea15449a06098053248d0f6b2e38249b40eb5ca4c2606e28"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 23. Gobernanza de agentes de IA

> Un agente de IA está gobernado cuando cada acción se remonta a una identidad registrada, un
> alcance que alguien aprobó, un punto de control que se activó donde las apuestas lo requerían y
> una forma probada de detenerlo.

El capítulo 05 lleva cuatro patrones de agentes: el [Registro de Agentes](/patterns/agent-registry),
[Identidad de Agente y Credenciales Limitadas](/patterns/agent-identity-scoped-credentials), el
[Interruptor de Parada / Disyuntor](/patterns/kill-switch-circuit-breaker) y la
[Puerta de Supervisión Humana](/patterns/human-in-the-loop-gate).
[La capa 04 del stack](/bok/the-stack#layer-04-runtime-controls--observability) dice qué control de
tiempo de ejecución debe probar, y el [mapa regulatorio](/bok/regulatory-map#china) alinea los
controles de agentes de tres marcos uno al lado del otro. Ninguno dice en un lugar qué hace que un
agente sea diferente de gobernar, cómo los controles forman un plano de control, o dónde cada
control cumple la ley. Este capítulo lo hace.

Un contraste primero. **La ingeniería de seguridad de IA**, la disciplina hermana, pregunta cómo un
atacante puede hacer que un agente cause daño, y es propietaria del
[modelo de amenaza](/patterns/ai-threat-model). La ingeniería de gobernanza de IA hace una pregunta
más amplia: bajo cuya autoridad actuó el agente, dentro de qué límite, con qué evidencia, y quién
podría haberlo detenido. Los dos comparten la mayoría de los controles. Difieren en lo que cuenta
como hecho: para la seguridad un ataque bloqueado está hecho; para la gobernanza está hecho cuando
el bloqueo, la autoridad detrás de la acción y la aprobación están en el registro.

La lista agentic de OWASP establece el primer principio, **agencia mínima**: su consejo es "evitar
autonomía innecesaria", porque el comportamiento agentic desplegado donde no es necesario "expande
la superficie de ataque sin añadir valor" [1]. El control de agente más barato es el agente que no
construiste: un flujo de trabajo fijo con una llamada de modelo es más fácil de gobernar que un
planificador que elige sus propias herramientas. El capítulo 15 trata
[el envoltorio agentic como una opción de despliegue](/bok/governing-deployment#how-it-is-adapted),
con los controles que añade además del modelo que envuelve.

## Qué hace que un agente sea un objeto de gobernanza

Un agente es un sistema de IA que persigue un objetivo eligiendo y tomando acciones: planifica,
llama herramientas, lee y escribe memoria y puede entregar trabajo a otros agentes. El capítulo 11
lo coloca entre [los tipos de IA](/bok/ai-defined#agentic-systems) que un registro debe distinguir.
Cuatro propiedades importan para la gobernanza, y cada una rompe una suposición en la que la
gobernanza de modelos se basa.

| Propiedad | Qué cambia | Pregunta de gobernanza | Primer control |
|---|---|---|---|
| **Autoridad delegada** | El agente actúa en nombre de alguien, con sus permisos o los suyos propios | ¿Qué autoridad se utilizó, y era más estrecha que la suya? | Identidad de carga de trabajo; registro de delegación |
| **Herramientas** | La salida se convierte en un efecto en un sistema de registro, no en texto que una persona lee | ¿Qué acciones puede tomar, en qué recursos? | Lista de permitidos de herramientas; credenciales limitadas |
| **Memoria** | El estado persiste entre sesiones, usuarios y tareas | ¿Qué recuerda, durante cuánto tiempo, y quién puede escribir en ella? | Alcances de memoria; retención; procedencia de escritura |
| **Autonomía** | Los pasos ocurren sin que haya una persona entre ellos | ¿Dónde debe decidir una persona, y puede detenerlo? | Puntos de control; interruptor de parada |

El modelo de evidencia cambia con ellos. Un modelo se evalúa en sus salidas; un agente también debe
evaluarse en su **trayectoria**, la secuencia de planes, llamadas de herramientas y operaciones de
memoria que llevaron a un efecto. Una eval que puntúa la respuesta final e ignora el camino pasará
un agente que llegó al resultado correcto a través de una herramienta que nunca debería haber
tenido.

### La autonomía es una decisión de diseño

La autonomía es una configuración que el responsable del despliegue elige, no una propiedad del
modelo. Como lo expresan Feng, McDonald y Zhang, "El nivel de autonomía de un agente puede tratarse
como una decisión de diseño deliberada, separada de su capacidad y entorno operativo" [2]. Definen
cinco niveles por el papel que juega el usuario: operador, colaborador, consultor, aprobador y
observador.
[El Marco de Gobernanza de IA Modelo de Singapur para IA Agentic](/bok/ai-laws-worldwide#singapore-model-frameworks-and-ai-verify)
describe cuatro niveles de participación humana, desde "agente propone, humano opera" hasta "agente
opera, humano observa", y cita el mismo trabajo [3]. El Marco de Confianza Agentic de la Cloud
Security Alliance nombra cuatro niveles, desde Pasante (solo lectura) hasta Principal (autónomo
dentro de límites), y hace que la promoción sea ganada: "precisión sostenida, un registro de
incidentes limpio, una auditoría de seguridad aprobada y aprobación de gobernanza explícita" [4].

El Reglamento de IA de la UE pide la misma proporcionalidad: las medidas de supervisión de un
sistema de IA de alto riesgo deben ser conmensurables con sus riesgos, su nivel de autonomía y su
contexto de uso (`Art. 14(3)`) [5]. La tabla alinea las tres escalas y asigna a cada nivel un
conjunto mínimo de controles. La alineación y los conjuntos de controles son una lectura de este
libro, no de los autores.

| Rol del usuario [2] | Nivel IMDA más cercano [3] | Nivel ATF más cercano [4] | Lo que hace la persona | Controles mínimos |
|---|---|---|---|---|
| **Operador** | El agente propone, el humano opera | Pasante | Realiza todas las acciones | Entrada en el registro; identidad propia; herramientas de solo lectura; trazas |
| **Colaborador** | El agente y el humano colaboran | Junior | Aprueba pasos significativos | Lo anterior, más una lista de herramientas permitidas y un punto de control antes de cada escritura |
| **Consultor** | Entre los dos | Junior a Senior | Establece objetivos, da retroalimentación | Lo anterior, más un guardrail en tiempo de ejecución en cada llamada de herramienta y presupuestos de ejecución |
| **Aprobador** | El agente opera, el humano aprueba | Senior | Aprueba pasos críticos o irreversibles | Lo anterior, más un registro de aprobación, un disyuntor por agente y un kill switch probado |
| **Observador** | El agente opera, el humano observa | Principal | Audita después de los hechos | Lo anterior, más detección de anomalías de trayectoria y evals de trayectoria independientes; solo acciones reversibles y acotadas |

Registra el nivel como un campo del registro (el capítulo 11 proporciona
[una escala de autonomía ilustrativa](/bok/ai-defined#from-definition-element-to-registry-field)
para él) y trata la elevación como un cambio que necesita la misma revisión que un nuevo despliegue.
Una promoción es una decisión con evidencia detrás, no una bandera que alguien cambió.

## El registro de agentes

El patrón [Agent Registry](/patterns/agent-registry) hace que el registro sea una precondición de la
producción: propietario, alcance y vencimiento, escritos por el pipeline. La entrada de un agente
tiene que llevar más. El marco de Singapur pide que las identidades de los agentes sean "catalogadas
y gestionadas centralmente", emitidas y rastreadas por un sistema central "para prevenir la
proliferación de agentes" [3]; el apéndice de agentes de TC260 pide una identidad única por agente y
un conjunto de permisos establecido por modo de decisión [6].

| Campo | Por qué está ahí | Evidencia que permite |
|---|---|---|
| **Identidad** (por ejemplo, un ID de SPIFFE) | Atribución | Cada línea de registro se une a una entrada |
| **Propietario** (equipo y persona responsable) | Responsabilidad | Una ruta de escalada que existe |
| **Propósito** | Prueba de alcance; clasificación legal | Detección de uso fuera del propósito |
| **Nivel de autonomía** | Controles proporcionales | Historial de promoción |
| **Herramientas y alcances** | La lista de herramientas permitidas aplicada | Diffs de configuración de guardrail |
| **Clases de datos y almacenes de memoria** | Privacidad y retención | Enlaces de EIPD y registros de actividades de tratamiento |
| **Derechos de delegación** | Límites entre agentes | Política de delegación |
| **Versiones** (modelo, prompts, paquete de política) | Control de cambios | Reproducción de la configuración exacta en un incidente |
| **Puntos de control** | Diseño de supervisión | Registro de aprobación |
| **Asas de parada** (disyuntor, ruta de revocación, último simulacro) | Kill switch | Registro de simulacro |
| **Vencimiento** | Ningún agente sobrevive a su revisión | Desactivación automática |
| **Rol regulatorio y clase** | Obligaciones | Mapa de obligaciones |

> **Ejemplo (ilustrativo)** Una entrada de registro para un agente de reembolsos, escrita por el
> pipeline de despliegue. El bloque de versiones es lo que hace que un incidente sea reproducible;
> el bloque de parada es lo que hace que el kill switch sea más que una afirmación.

```yaml
# agent-registry entry (illustrative)
id: refunds-agent
identity: spiffe://corp.example/agents/refunds-agent
owner: { team: support-platform, accountable: head-of-support-operations }
purpose: Draft and execute refunds for orders under the published returns policy
autonomy_level: approver
tools:
  - { name: orders.read, scopes: [orders:read] }
  - { name: refunds.create, scopes: [refunds:write], checkpoint: "amount_eur > 200" }
delegation: { may_call: [fraud-check-agent], may_be_called_by: [support-orchestrator] }
memory: { session: true, long_term: none }
versions: { model: vendor-model@2026-08-15, system_prompt: "sha256:9f2c...e41", policy_bundle: v14 }
budgets: { tool_calls_per_task: 25, spend_eur_per_day: 5000 }
stop: { breaker: cb-refunds-01, revoke: identity, last_drill: 2026-09-10 }
ai_act: { role: deployer, class: not-high-risk }
expiry: 2026-12-17
```

Un registro es tan bueno como lo que se le escapa. El patrón
[Shadow-AI Discovery](/patterns/shadow-ai-discovery) lo reconcilia con lo que se ejecuta: conectores
SaaS, agentes de codificación en portátiles y servidores MCP locales, que se ejecutan con los mismos
privilegios que el cliente que los lanzó [7]. Un agente encontrado por discovery se registra dentro
de un plazo o se apaga.

> **En la práctica (ilustrativo)**
> En una gran empresa de telecomunicaciones, el primer barrido de discovery encontró más agentes en
> portátiles de desarrolladores que en el registro de producción: asistentes de codificación con
> servidores MCP locales que tenían tokens de acceso personal, algunos con acceso de escritura a
> repositorios compartidos. La solución no fue una prohibición. Una ruta pavimentada emitió a cada
> agente del desarrollador una credencial de corta duración, con alcance de repositorio, del sistema
> de identidad de producción, y el barrido se convirtió en una reconciliación semanal con un
> propietario para cada hallazgo.

## Identidad y credenciales de corta duración

### La autenticación de canal no es la identidad del agente

Los capítulos 04 y 05 trazan la línea clave. **La autenticación de canal** asegura un salto, como un
cliente hablando con un servidor MCP. **La identidad de carga de trabajo del agente** es la
identidad atribuible que el agente lleva en cada salto, bajo la cual sus acciones se registran y su
acceso se revoca. El marco de Singapur enumera lo que esa identidad debe ser: única y
"criptográficamente verificable"; "contabilizada", vinculada a un agente supervisor, un usuario
humano o un departamento organizacional; diferenciada "según la capacidad en la que actúa",
independientemente o en nombre de un usuario nombrado; y catalogada centralmente [3]. El NCCoE de
NIST pregunta cómo cada agente puede ser "conocido, confiable y debidamente gobernado" [8].

### Credenciales atestiguadas de corta duración

SPIFFE define "documentos de identidad criptográfica de corta duración", llamados SVIDs, entregados
a través de una Workload API que también los rota; un SVID es actualmente un certificado X.509 o un
JWT, y SPIRE es la implementación de referencia [9]. Un tercer formato, WIT-SVID, un perfil de
SPIFFE del Token de Identidad de Carga de Trabajo IETF WIMSE, aún está en incubación a partir de
2026-09-24 [30]. El valor de gobernanza está en la vida útil: una credencial que expira en minutos
no necesita ser buscada después de un incidente, solo no se reemite. Una clave API estática en la
configuración de un agente es lo opuesto, y los atacantes saben dónde buscar: MITRE ATLAS cataloga
"Credentials from AI Agent Configuration" (`AML.T0083`) [10]. TC260 pide que las credenciales se
revoquen al final de la tarea [6]. Singapur pide que las autorizaciones sean "limitadas en tiempo o
sesión, no transferibles", privilegio mínimo por defecto y nunca mayor que lo que el humano
autorizador pueda hacer [3].

### Delegación sin suplantación

Cuando un agente actúa por un usuario, dos identidades están en juego, y el registro debe mantener
ambas. OAuth 2.0 Token Exchange (RFC 8693) separa **suplantación**, donde el actor se vuelve
indistinguible del sujeto, de **delegación**, donde ambos permanecen identificables. Su `act` claim
"proporciona un medio dentro de un JWT para expresar que ha ocurrido delegación e identificar a la
parte actuante", y los claims `act` anidados registran los actores anteriores en la cadena [11]. La
regla para agentes sigue: intercambia el token del usuario por uno delegado que nombre al agente,
con un alcance más estrecho y un vencimiento corto; nunca entregues al agente el propio token del
usuario.

> **Ejemplo (ilustrativo)** Los claims de un token de acceso delegado. El usuario es el sujeto; el
> agente de reembolsos es el actor actual; el orquestador que delegó la tarea a él está anidado
> dentro. La audiencia es una API y el alcance una operación.

```json
{
  "sub": "user:4711",
  "aud": "https://refunds.api.example",
  "scope": "refunds:write",
  "exp": 1790330400,
  "act": {
    "sub": "spiffe://corp.example/agents/refunds-agent",
    "act": { "sub": "spiffe://corp.example/agents/support-orchestrator" }
  }
}
```

### Autorización de MCP a partir de 2026-07-28

La especificación del Protocolo de Contexto de Modelo fechada en 2026-07-28 es la versión actual a
partir de 2026-09-24. La autorización es opcional en MCP; donde un transporte HTTP la usa, el
servidor MCP actúa como un servidor de recursos OAuth 2.1 [12]. Los requisitos que importan para la
gobernanza:

| Requisito (especificación 2026-07-28) | Lo que previene | Evidencia a mantener |
|---|---|---|
| Los servidores DEBEN implementar Metadatos de Recurso Protegido de OAuth 2.0 (RFC 9728), y los clientes DEBEN usarlo para encontrar el servidor de autorización [12] | Los clientes adivinando de dónde vienen los tokens | Configuración de discovery en el manifiesto de herramientas |
| Los clientes y servidores de autorización DEBERÍAN soportar Documentos de Metadatos de ID de Cliente; el Registro Dinámico de Clientes está deprecado [12][13] | Registros de clientes anónimos y no gestionados | Dominios de cliente permitidos como política |
| Los clientes DEBEN enviar el parámetro `resource` (RFC 8707) con el URI canónico del servidor [12] | Tokens que funcionan en cualquier servidor | Solicitudes de token nombrando el recurso |
| Los servidores DEBEN validar que un token fue emitido para ellos y "NO DEBEN aceptar o transitar ningún otro token" [12] | Paso de token y el diputado confundido | Fallos de verificación de audiencia elevados como alertas |
| Los clientes DEBEN validar el parámetro `iss` (RFC 9207) antes de canjear un código, y las credenciales del cliente están vinculadas al emisor que las acuñó [12][13] | Mezcla de servidor de autorización | El emisor registrado por flujo |
| Los servidores DEBERÍAN desafiar con los alcances que una operación necesita, y los clientes escalan para obtener más [12] | Alcances omnibus otorgados por adelantado | Eventos de elevación con IDs de correlación [7] |

La guía de seguridad que la acompaña es más contundente: el paso de token "está explícitamente
prohibido", y los errores de alcance que enumera incluyen "Publicar todos los alcances posibles" y
"Usar alcances comodín u omnibus" [7]. La versión 2026-07-28 también estableció una política de
deprecación con una ventana mínima de doce meses [13], por lo que la versión de MCP que cada
servidor habla es un campo de registro. Y la especificación del Documento de Metadatos de ID de
Cliente sigue siendo un Internet-Draft de IETF (revisión 02, 6 de julio de 2026) [14].

Nada de esto identifica al agente. MCP asegura el salto entre un cliente y un servidor. Qué agente
está detrás del cliente, y por quién, es el trabajo de la identidad de carga de trabajo.

## Permisos de herramientas y servidores MCP

### La lista de herramientas permitidas

Una herramienta es una capacidad, y la lista de herramientas permitidas es donde se otorgan las
capacidades. El consejo de OWASP bajo `ASI02` es "Definir perfiles de privilegio mínimo por
herramienta (alcances, tasa máxima y listas blancas de salida)" y expresarlos "como estrofas de
política de IAM o autorización adjuntas a cada herramienta, en lugar de depender de convenciones ad
hoc" [1]. TC260 pide que un agente obtenga solo los permisos mínimos que su tarea actual necesita, y
que una operación sea rechazada por defecto cuando el sistema de aprobación falla, el usuario no
responde o no existe regla de aprobación [6]. Una entrada de lista de herramientas permitidas tiene
más que un nombre:

| Propiedad | Regla | Ejemplo |
|---|---|---|
| **Identidad de herramienta** | Servidor, nombre de herramienta y un hash de la definición de herramienta, fijado | `refunds.create` en `payments-mcp`, definición `sha256:…` |
| **Clase de operación** | Lectura, escritura, eliminación, envío, ejecución o pago; la clase impulsa puntos de control | `refunds.create` es pago |
| **Alcance de recurso** | El conjunto de recursos más estrecho que la tarea necesita | Pedidos del cliente en el caso actual |
| **Tasa y volumen** | Llamadas por tarea y por hora | 25 por tarea |
| **Salida** | Destinos a los que la herramienta puede llegar | Solo API de pagos interna |
| **Clases de datos** | Lo que puede fluir dentro y fuera | Sin datos de categorías especiales a herramientas externas |
| **Punto de control** | Cuándo una persona debe aprobar | Cantidad superior a 200 EUR |

Ninguna herramienta es inofensiva por su nombre. La lista de OWASP describe un agente de
codificación cuya herramienta ping aprobada automáticamente se activó repetidamente para exfiltrar
datos mediante consultas DNS [1]; ATLAS cataloga "Exfiltración mediante invocación de herramienta de
agente de IA" (`AML.T0086`) y "Destrucción de datos mediante invocación de herramienta de agente de
IA" (`AML.T0101`) [10]. Por lo tanto, los límites de velocidad y egreso se aplican a cada
herramienta, incluidas las que nadie se preocupa por usar.

> **Ejemplo (ilustrativo)** La lista de permitidos como política de denegación por defecto que la
> puerta de herramientas evalúa en cada llamada, leyendo el registro como datos. La comprobación de
> velocidad se omite por brevedad.

```rego
package agents.tools

default allow := false

allow if {
  entry := data.registry[input.agent_id]
  some tool in entry.tools
  tool.name == input.tool.name
  tool.definition_hash == input.tool.definition_hash
  input.tool.scope in tool.scopes
}

needs_approval if {
  input.tool.operation in {"delete", "send", "pay", "execute"}
}
```

### Admisión de un servidor MCP

Un servidor MCP es un proveedor. OWASP separa dos casos: una herramienta cuya interfaz se manipula
en tiempo de ejecución (envenenamiento de herramientas, bajo `ASI02`) y una herramienta que es
maliciosa o está comprometida en la fuente (`ASI04`) [1]. ATLAS añadió "Envenenamiento de
herramienta de agente de IA" (`AML.T0110`) para contenido o comportamiento malicioso introducido en
la definición visible del modelo de una herramienta o en su implementación [10]. Una descripción de
herramienta es una instrucción que el modelo lee, por lo que una descripción cambiada es una
instrucción cambiada. Admite un servidor a través de una puerta:

1. **Procedencia.** Editor, repositorio de fuente y una versión firmada, registrados en el
   [AIBOM](/patterns/aibom) de cada agente que la utiliza.
2. **Fijación de definición.** Nombres de herramientas hash, descripciones y esquemas en la
   admisión; alerta sobre cambios.
3. **Conformidad de autorización.** Versión MCP, metadatos de recursos protegidos, validación de
   audiencia, sin paso de tokens.
4. **Aislamiento para servidores locales.** La guía MCP requiere que un cliente muestre el comando
   exacto, sin truncamiento, y obtenga aprobación explícita antes de una instalación de servidor
   local de un clic, y recomienda ejecutar tales servidores aislados con privilegios mínimos [7].
5. **Pruebas.** Descriptores envenenados y salidas de herramientas inyectadas, antes de cualquier
   lista de permitidos.
6. **Un propietario y una fecha de revisión**, como cualquier otro proveedor.

La [Puerta de diligencia debida de proveedor/modelo](/patterns/vendor-model-due-diligence-gate)
cubre el lado comercial: quién responde cuando el servidor se comporta mal, y qué aviso recibes
antes de que cambie.

## Puntos de control humanos y diseño de aprobación

### Dónde poner un punto de control

El patrón [Puerta de bucle humano](/patterns/human-in-the-loop-gate) dice que hay que poner una
puerta por consecuencia. Dos fuentes hacen que "consecuencia" sea concreta. La Partnership on AI
califica el riesgo del agente en tres factores: **apuestas** (la gravedad de las posibles
consecuencias), **reversibilidad** (si un fallo puede deshacerse) y **affordances** (la selección de
herramientas sin restricciones y la memoria persistente introducen modos de fallo más complejos que
los diseños restringidos) [15]. El marco de Singapur enumera cuatro tipos de punto de control:
acciones y decisiones de alto riesgo, acciones irreversibles, comportamiento atípico u inusual, y
límites definidos por el usuario [3].

| Clase de punto de control | Activador (ejemplos) | Quién aprueba | Evidencia |
|---|---|---|---|
| **Alto riesgo** | Una decisión final sobre una persona; una edición de un registro sensible | Un rol nombrado con autoridad para rechazar | Registro de aprobación con el contexto mostrado |
| **Irreversible** | Un pago, una eliminación, un mensaje externo, una publicación | El propietario del negocio de la acción | Aprobación vinculada a los parámetros exactos |
| **Atípico** | Acceso fuera del alcance habitual; un plan el doble de la longitud habitual | El propietario de guardia | Evento de anomalía y decisión |
| **Definido por el usuario** | Una compra por encima del límite propio del usuario | El usuario | Registro de consentimiento |
| **Elevación de alcance** | Una solicitud de elevación para un nuevo alcance | El propietario del agente | Evento de elevación |

### Cómo se ve una buena aprobación

El Reglamento de IA describe el supervisor al que debe servir el diseño. Para un sistema de alto
riesgo, deben ser capaces de reconocer "la posible tendencia de confiar automáticamente o confiar
excesivamente en la salida", de "descartar, anular o revertir la salida", y de "interrumpir el
sistema mediante un botón de 'parada' o un procedimiento similar" (`Art. 14(4)(b), (d), (e)`) [5].
El responsable del despliegue debe asignar la supervisión a personas "que tengan la competencia,
formación y autoridad necesarias, así como el apoyo necesario" (`Art. 26(2)`) [5]. Singapur añade
dos puntos prácticos: mantener las solicitudes de aprobación "contextuales y digeribles" mientras se
aclara el riesgo, y "Aplicar la aprobación humana a través de controles a nivel de sistema cuando
sea posible, frente a guardrails de capa de prompt, que pueden ser eludidos u 'olvidados'" [3].

La amenaza contra la que hay que diseñar es `ASI09`, **explotación de confianza agente-humano**:
personas confiando excesivamente en la ratificación confiada de un agente y "aprobando acciones sin
validación independiente", que un atacante que dirija el agente puede explotar [1]. ATLAS tiene una
técnica para la persuasión en sí, "Manipulación de componentes de salida de confianza de LLM"
(`AML.T0067`) [10]. Las reglas que siguen:

1. **La puerta vive fuera del modelo.** La puerta de herramientas mantiene la llamada hasta que
   llega la aprobación; el prompt no decide si preguntar.
2. **Muestra la llamada, no la historia.** El aprobador ve la herramienta, los parámetros y el
   destino tal como la puerta los ejecutará, luego la razón del agente, el riesgo y qué sucede en
   caso de rechazo.
3. **Vincula la aprobación.** Una aprobación es de un solo uso y está vinculada a un hash de los
   parámetros; una cantidad cambiada necesita una nueva aprobación.
4. **Agota cerrado.** Sin respuesta significa sin acción.
5. **Mide la supervisión.** Tasa de aprobación, tiempo para decidir y tasa de anulación, como
   [diseñar supervisión humana](/bok/the-stack#designing-human-oversight-article-14) describe.

> **Antipatrón** Un punto de control que se activa 200 veces al día en una persona con otro trabajo.
> Se convierte en un sello de goma en una semana, y el registro de aprobación entonces lava las
> decisiones que se suponía que debía examinar.

> **En la práctica (ilustrativo)**
> Un equipo de pagos encontró que sus revisores aprobaban casi todas las solicitudes de reembolso de
> agentes en cuestión de segundos. Dos cambios lo arreglaron: solo los reembolsos irreversibles de
> alto valor ahora llegan a una persona, lo que redujo el volumen en un orden de magnitud, y la
> pantalla de aprobación muestra primero la llamada de herramienta sin procesar, con la explicación
> del agente debajo. Los rechazos aumentaron de casi ninguno a una tasa que vale la pena investigar,
> y dos de los primeros expusieron una ruta de inyección de prompt a través de notas de cliente.

## Guardrails en tiempo de ejecución para llamadas de herramientas

Un guardrail en tiempo de ejecución para un agente se sitúa en un punto: entre la decisión de llamar
a una herramienta y la llamada. La especificación Autonomous Action Runtime Management (AARM) de la
CSA define "las capacidades que un sistema de seguridad de agente de IA debe proporcionar para
gobernar lo que se permite que haga un agente de IA en tiempo de ejecución", comenzando con la
intercepción previa a la ejecución vinculada a la identidad y la evaluación de política antes de que
se ejecute la acción [16]. El Agent Control Standard de OWASP es una especificación de cable para el
mismo punto: permite que un agente guardián separado "inspeccione lo que un agente de IA está a
punto de hacer y permita, deniegue o modifique esa acción antes de que suceda, sobre un canal
autenticado, con un rastro de auditoría" [17].

El guardián de referencia en el repositorio de ACS comienza con una postura de fallo de "proceder",
anulable para denegar [17]. A partir del 2026-09-24, el README del repositorio también revela que el
guardián de referencia aún no implementa la firma de envolvente HMAC-SHA256 que requiere la
especificación, por lo que su cable no está autenticado y cualquier cosa que pueda alcanzar el
puerto puede leer y causar decisiones [17]. El defecto abierto por defecto es una decisión de
gobernanza disfrazada de configuración: cuando el guardián está inactivo, el fallo abierto deja
pasar cada llamada sin verificar y el fallo cerrado detiene el negocio. Decide por clase de
operación y registralo en la [Ficha de política](/patterns/policy-card) del agente: fallo cerrado
para pagar, eliminar, enviar y ejecutar; fallo abierto, con una alerta, solo para lecturas.

| Comprobación | Se ejecuta | En caso de fallo |
|---|---|---|
| La identidad coincide con una entrada de registro activa | Cada llamada | Denegar |
| Herramienta en la lista de permitidos; el hash de definición coincide | Cada llamada | Denegar |
| Parámetros dentro de la política (recurso en alcance, límites de cantidad) | Cada llamada | Denegar, o enrutar a un punto de control |
| Procedencia de instrucción: ¿se originó la solicitud en contenido no confiable? | Antes de llamadas de clase de escritura | Enrutar a un punto de control |
| Filtro de salida y egreso (secretos, datos personales, destinos) | Después de la llamada, antes de que se devuelva el resultado | Redactar o bloquear |
| Presupuestos de ejecución (pasos, llamadas, tokens, gasto, tiempo) | Continuamente | Dispara el disyuntor |
| El código se ejecuta solo en una caja de arena | Herramientas de clase de ejecución | Denegar (`ASI05`) |

### Límites de ejecución

Los presupuestos son el guardrail que atrapa lo que ninguna regla anticipó. La lista OWASP LLM de
2026 nombra "arquitecturas agentes y protocolos de uso de herramientas (como MCP) que amplifican una
única solicitud en operaciones posteriores en cascada" como un factor agravante y recomienda
"límites de gasto duros, disyuntores a nivel de agente, y monitoreo continuo de atribución de
costos" (`LLM06:2026`) [18]. ATLAS añadió "Consumo de recursos agentes" (`AML.T0034.002`) para
atacantes que coercen a un agente a realizar llamadas de herramientas costosas [10], y TC260 pide
límites de paso, frecuencia y duración [6]. Pon los presupuestos en la entrada del registro,
aplícalos en la puerta y haz que el agotamiento dispare el disyuntor en lugar de generar un ticket.
El patrón [Guardrail en tiempo de ejecución](/patterns/runtime-guardrail) cubre la mecánica; un
**agente guardián**, como señala el capítulo 04, es una forma de construir el punto de aplicación y
necesita su propia identidad, alcance y disyuntor.

## Disyuntor y disyuntores de circuito por agente

La autonomía se otorga solo donde puede ser retirada. El NIST AI RMF pide mecanismos para
"reemplazar, desconectar o desactivar" sistemas cuyos resultados son inconsistentes con el uso
previsto (MANAGE 2.4) [19]; el Reglamento de IA pide un procedimiento de parada (`Art. 14(4)(e)`)
[5]; el marco de la CSA plantea el objetivo claramente: "Puedes detener un agente sin detener el
negocio" [4]. El patrón [Disyuntor / Disyuntor de circuito](/patterns/kill-switch-circuit-breaker)
da el mecanismo. En operación, una parada tiene niveles:

| Nivel de parada | Mecanismo | Radio de explosión | Tiempo objetivo (ilustrativo) | Evidencia |
|---|---|---|---|---|
| **Pausa una tarea** | Mantener en el siguiente punto de control, o cancelar la tarea | Una tarea | Segundos | Cambio de estado de tarea |
| **Estrecha el alcance** | Elimina una herramienta o alcance de la lista de permitidos | Una capacidad de un agente | Menos de un minuto | Diferencia de política |
| **Dispara el disyuntor** | La puerta rechaza cada llamada del agente | Un agente | Segundos | Evento de disyuntor |
| **Revoca la identidad** | Deja de emitir credenciales; revoca tokens de actualización | Un agente, en todas partes | Limitado por la vida útil de la credencial | Registro de revocación |
| **Detén una clase** | Disyuntores en cada agente que comparte un modelo, herramienta o versión de prompt | Un segmento de flota | Minutos | Evento de flota |
| **Degradar** | Cambiar a solo asesoramiento o volver a piloto | Comportamiento, no disponibilidad | Minutos | Cambio de modo |

La última fila utiliza los modos de
[degradación gradual](/bok/governing-deployment#graduated-degradation) del capítulo 15: «solo
asesoramiento» (el agente redacta, una persona actúa) mantiene el servicio mientras elimina la
autonomía. Los disparadores se definen por adelantado: un tirón manual, un umbral de presupuesto o
llamadas no autorizadas, una anomalía, un aviso ascendente (el proveedor del modelo informa de un
incidente) o una instrucción legal.

Una parada que no ha sido simulada es una afirmación. Simúlala según un calendario, mide el tiempo
hasta la parada y comprueba que la parada se mantuvo: sin llamadas a herramientas después de que el
disyuntor se activara, sin credenciales emitidas después de la revocación. El capítulo 17 hace el
mismo punto para el [comportamiento rogue](/bok/incidents#ai-specific-failure-modes): revoca y luego
verifica que la revocación surtió efecto.
[Decommissioning](/patterns/deactivation-localisation-retirement-runbook) es la versión planificada:
TC260 enumera el apagado completo, la copia de seguridad de datos y la limpieza del entorno [6];
añade eliminar la memoria según su regla de retención y eliminar el agente de las listas de
delegación de otros agentes.

### Detención a través de saltos

No puedes detener el agente de otra persona. La operación de cancelación de A2A lo dice: «El
servidor intentará cancelar la tarea, pero el éxito no está garantizado» [20]. Lo que controlas es
tu propio límite: evita que tus agentes llamen al remoto y revoca lo que le emitiste. Los tokens
delegados de corta duración hacen que esa revocación esté limitada por su tiempo de vida; los de
larga duración la convierten en una esperanza.

> **En la práctica (ilustrativo)**
> Una simulación de kill-switch en un agente de procesamiento de documentos midió cuatro segundos
> desde el tirón hasta que el disyuntor rechazara las llamadas, lo que parecía un éxito. La
> comprobación de seguimiento encontró tareas de larga duración aún escribiendo en el almacenamiento
> veinte minutos después, en un token de actualización emitido antes del tirón. Los tokens de
> actualización del agente fueron eliminados, los tokens de acceso reducidos a cinco minutos, y la
> simulación ahora afirma cero escrituras después del tirón, no solo un disyuntor rápido.

## Gobernanza de memoria y contexto

La memoria convierte una entrada mala en una duradera. La lista OWASP LLM de 2026 llama a esto
**persistencia de memoria**: «una inyección que escribe en memoria a largo plazo, un corpus RAG, un
almacén vectorial o un servicio de memoria alojado contamina cada sesión posterior que lee de ese
almacén» [18]. La lista agentic de OWASP lo tiene como `ASI06` Memory & Context Poisoning [1]; ATLAS
tiene «AI Agent Context Poisoning» (`AML.T0080`), con subtécnicas para memoria y para el hilo de
chat [10].

| Memoria | Lo que contiene | Riesgo principal | Control | Retención |
|---|---|---|---|---|
| **Ventana de contexto** | Instrucciones, texto recuperado, salidas de herramientas | Inyección a través de la salida de herramientas | Etiquetas de procedencia; segmentos no confiables marcados | Una solicitud |
| **Hilo de conversación** | Una sesión | Envenenamiento de hilo (`AML.T0080.001`) | Aislamiento por sesión | La sesión |
| **Memoria a largo plazo** | Hechos y preferencias entre sesiones | Envenenamiento de memoria (`AML.T0080.000`); datos personales retenidos demasiado tiempo | Puerta de escritura; espacio de nombres por usuario; tiempo de vida; ruta de borrado | Definida por política, por clase |
| **Corpus de recuperación** | Documentos | Fuentes envenenadas u obsoletas (`AML.T0099`) | Admisión de fuentes; comprobación de derechos en la recuperación | Por versión de corpus |
| **Memoria compartida** | Estado pasado entre agentes | Contaminación entre agentes | Aislamiento por tarea; escrituras atribuidas | La tarea |
| **Configuración del agente** | Prompts, configuración de herramientas | Manipulación (`AML.T0081`); credenciales almacenadas (`AML.T0083`) | Control de cambios; sin secretos | Versionado |

Cinco reglas hacen la memoria gobernable. **Las escrituras son eventos** que llevan su origen, por
lo que una entrada envenenada se remonta a lo que la produjo.
**El contenido no confiable no puede escribir en memoria a largo plazo** sin una puerta.
**La memoria está aislada** por usuario y por tarea, como TC260 pide, con ventanas de retención y
sin credenciales en memoria [6]. **La retención es código**: un almacén de memoria que contiene
datos personales está sujeto a los principios de minimización y limitación del almacenamiento del
RGPD (`Art. 5(1)(c), (e)`) y al derecho al olvido (`Art. 17`) [21]; véase
[derechos de los interesados contra modelos entrenados](/bok/privacy-and-ai#data-subject-rights-against-trained-models).
**La memoria puede revertirse** a una instantánea conocida como buena en lugar de ser borrada.

Para sistemas de alto riesgo que continúan aprendiendo después del despliegue, la Ley de IA pide que
se desarrollen para reducir «el riesgo de que salidas posiblemente sesgadas influyan en la entrada
para operaciones futuras» (`Art. 15(4)`) [5]. Una memoria que forma el comportamiento posterior es
tal ruta de retroalimentación en todo menos en el nombre, y leer `Art. 15(4)` como cubriéndola es el
curso prudente hasta que la orientación diga lo contrario.

## Sistemas multiagente y cadenas de delegación

El protocolo Agent2Agent (A2A) es un protocolo abierto para la comunicación entre agentes,
desarrollado inicialmente por Google y donado a la Linux Foundation. La versión 1.0.0 se lanzó el 12
de marzo de 2026 y la 1.0.1 el 28 de mayo de 2026 [20]; el 27 de agosto de 2026, A2A fue aceptado
como un proyecto de Growth Stage de la Agentic AI Foundation, dirigida por la Linux Foundation,
junto con MCP [22]. Su modelo de seguridad te proporciona bloques de construcción. Un agente publica
una **Agent Card** en `/.well-known/agent-card.json`} describiendo su identidad, habilidades, punto
final y requisitos de autenticación; la tarjeta puede estar firmada con JWS sobre una forma JSON
canónica; la tarjeta declara los esquemas de autenticación que el agente acepta (claves API,
autenticación HTTP, OAuth 2.0, OpenID Connect o TLS mutuo); y el servidor «DEBE autenticar cada
solicitud entrante» [20]. La autorización después de eso es, en palabras de la especificación,
«específica de la implementación» [20].

Lo que A2A no te proporciona es responsabilidad. Un agente que necesita más autoridad a mitad de la
tarea mueve la tarea a `TASK_STATE_AUTH_REQUIRED`, y un cliente que es en sí mismo un agente puede
pasar la solicitud hacia arriba, «formando una cadena de tareas» [20]. Pero la especificación
establece que «no define el alcance, la representación, la validez o la semántica de revocación de
la decisión de autorización u credencial obtenida» [20]. El protocolo mueve tareas; las reglas sobre
quién puede autorizar qué, a través de cuántos saltos, son tuyas para escribir.

Las amenazas se nombran: `ASI07` Insecure Inter-Agent Communication, `ASI08` Cascading Failures y
`ASI10` Rogue Agents [1], y ATLAS añadió «Autonomous AI Agent Communication» (`AML.T0118`) a finales
de agosto de 2026 [10]. El Código de Prácticas GPAI enumera «colusión» con otros sistemas de IA y
«descoordinación o conflicto» con ellos entre las propensiones del modelo que son fuentes de riesgo
sistémico [23].

### Responsabilidad a través de saltos

| Propiedad | Regla | Evidencia |
|---|---|---|
| **Principal originario** | Cada tarea lleva la persona o sistema que la inició | Raíz del registro de delegación |
| **Actor por salto** | Cada agente se autentica como sí mismo; delegación, nunca suplantación | Reclamaciones anidadas `act` [11] |
| **Alcance** | Se estrecha o permanece igual en cada salto; nunca se amplía | Registro de intercambio de tokens |
| **Propósito** | El propósito de la tarea viaja con ella y se comprueba en cada salto | Campo de propósito en cada llamada |
| **Profundidad y abanico** | Máximo de saltos y máximo de subtareas paralelas | Evento de disyuntor en caso de incumplimiento |
| **Rastreo** | Un contexto de rastreo desde el primer salto hasta el último | ID de rastreo en cada intervalo |
| **Pares** | Solo agentes registrados con tarjetas verificadas y firmadas | Lista de permitidos de pares |
| **Terceros** | Un contrato nombra quién responde por un agente remoto | Referencia de cláusula en el registro |

Dos esfuerzos de estándares abordan la parte difícil, llevar contexto de identidad y autorización a
través de una cadena de llamadas. El borrador de Transaction Tokens del grupo de trabajo OAuth
(revisión 11, 30 de julio de 2026, esperando su redacción) está diseñado «para mantener y propagar
la identidad del usuario, la identidad de la carga de trabajo y el contexto de autorización en toda
la cadena de llamadas dentro de un dominio de confianza» [24]; el grupo de trabajo WIMSE del IETF
(Workload Identity in Multi System Environments) cubre la identidad de la carga de trabajo entre
sistemas [25]. Ambos están incompletos a partir de 2026-09-24. Hasta que se resuelvan, la tabla
anterior es el contrato, aplicado en cada puerta que controlas. Para agentes de terceros, las
cláusulas en [contratos y licencias](/resources/contracts) son la otra mitad.

## Prompts como configuración bajo control de cambios

El comportamiento de un agente se establece por su modelo, su prompt del sistema, sus descripciones
de herramientas y su paquete de política. Cambia cualquiera y el comportamiento cambia, sin ningún
cambio de código. Así que trata cada uno como configuración bajo control de cambios, como código de
infraestructura:

1. **Versiona y hazlo tuyo.** Los prompts viven en el repositorio, con un propietario nombrado y dos
   revisores.
2. **Haz hash en todas partes.** El registro registra el hash, al igual que cada rastreo: las
   convenciones de OpenTelemetry llevan `gen_ai.agent.version` exactamente para esto [26].
3. **Ciérralo.** Cada cambio ejecuta la suite de regresión (éxito de tarea, resistencia a
   inyecciones, comprobaciones de trayectoria) en [Eval Gate in CI](/patterns/eval-gate-in-ci); un
   fallo bloquea el cambio.
4. **Despliégalo y retrocede.** Canary el cambio, como en
   [entrega progresiva](/bok/governing-deployment#progressive-delivery-as-a-control), y mantén el
   hash anterior listo para restaurar.
5. **Pregúntate si el propósito cambió.** Un prompt que cambia para qué es el sistema puede ser una
   [modificación sustancial](/bok/governing-development#substantial-modification) y, bajo
   [Artículo 25](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider), puede hacer que
   el responsable del despliegue sea el proveedor.

Un prompt del sistema es configuración, no un secreto ni un control. La lista OWASP de 2026 renombró
la fuga de prompt del sistema a **Hidden Context Exposure** (`LLM08:2026`) y aconseja que «Los
profesionales deben diseñar bajo el supuesto de que el contexto oculto es descubrible»: sin
credenciales en él, y sin depender de él «como límite de seguridad para autorización, separación de
privilegios, aplicación de políticas o filtrado de contenido» [18]. ATLAS enumera tanto «Extract LLM
System Prompt» (`AML.T0056`) como «Modify AI Agent Configuration» (`AML.T0081`) [10]. Cualquier cosa
que deba mantenerse va en la puerta.

> **Ejemplo (ilustrativo)** Un manifiesto de prompt que la canalización se niega a desplegar a menos
> que la ejecución de eval que nombra haya pasado.

```yaml
# prompt manifest (illustrative)
agent: refunds-agent
artefact: system_prompt
version: 2026-09-22.1
sha256: "9f2c...e41"
owner: support-platform
reviewers: [product-owner, ai-governance-engineer]
eval_run: evals/refunds-agent/2026-09-22-1842   # must be green
rollout: { strategy: canary, share: 5%, hold_hours: 48 }
rollback_to: 2026-09-10.3
changes_intended_purpose: false
```

> **Antipatrón** Editar el prompt del sistema de producción en una consola de proveedor para
> arreglar una queja. El comportamiento cambia, el registro y los rastreos aún nombran la versión
> anterior, y el siguiente incidente reproduce una configuración que nunca se ejecutó.

## Incidentes de agentes y telemetría

### Una taxonomía de incidentes de agentes

La Partnership on AI define la capacidad que los agentes más necesitan: «La detección de fallos en
tiempo real es el uso de sistemas de monitoreo automatizados que rastrean el comportamiento del
agente a medida que se desarrolla, señalan anomalías y detienen la ejecución o escalan a supervisión
humana» [15]. La taxonomía a continuación extiende los
[modos de fallo específicos de IA](/bok/incidents#ai-specific-failure-modes) del capítulo 17 para
agentes; la escala de gravedad y los relojes de informe son los que
[el capítulo 17 establece](/bok/incidents#a-severity-scale-mapped-to-the-clocks).

| Clase | Cómo se ve | Señal de detección | Primera contención | IDs |
|---|---|---|---|---|
| **Secuestro de objetivo** | Las instrucciones en un documento redirigen la tarea | Llamadas a herramientas no relacionadas con el propósito de la tarea | Pausa la tarea; pone en cuarentena la fuente | `ASI01`; `AML.T0051.001` |
| **Mal uso de herramientas** | Una herramienta permitida utilizada para efecto dañino | Parámetros fuera del perfil del registro | Estrecha el alcance; activa el disyuntor | `ASI02`; `AML.T0053` |
| **Abuso de privilegios** | El agente utiliza autoridad más allá de su tarea | Fallos de audiencia o alcance | Revocar la identidad | `ASI03`; `AML.T0098` |
| **Compromiso de la cadena de suministro** | Una definición de herramienta cambia después de la admisión | Desajuste de hash de definición | Eliminar el servidor de las listas de permitidos | `ASI04`; `AML.T0110` |
| **Ejecución de código inesperada** | El código generado se ejecuta fuera del sandbox | Violación del sandbox | Matar el proceso; revocar | `ASI05`; `AML.T0112.000` |
| **Envenenamiento de memoria** | Un "hecho" inyectado persiste entre sesiones | Escrituras de memoria desde fuentes no confiables | Congelar y revertir el almacén | `ASI06`; `AML.T0080` |
| **Suplantación entre agentes** | Un agente no registrado responde como un par | Identidad desconocida; tarjeta sin firmar | Bloquear el par | `ASI07`; `AML.T0118` |
| **Cascada** | El error de un agente se amplifica a través de otros | Fallos correlacionados | Romper la cadena en el componente compartido | `ASI08` |
| **Explotación de confianza** | Un resumen engañoso gana una aprobación | Desajuste entre resumen y llamada | Mostrar llamadas sin procesar; revisar aprobaciones anteriores | `ASI09`; `AML.T0067` |
| **Descontrol o rebelde** | Actividad fuera de alcance, después de vencimiento o pasado presupuesto | Llamadas después de vencimiento; pico de gasto | Revocar; verificar que la parada se mantuvo | `ASI10`; `AML.T0034.002` |
| **Exfiltración a través de una herramienta** | Datos codificados en una escritura legítima | Salida a un destino desconocido | Bloquear salida; activar el disyuntor | `ASI02`; `AML.T0086` |

### Telemetría con las convenciones GenAI de OpenTelemetry

Las convenciones semánticas de IA generativa de OpenTelemetry ahora viven en su propio repositorio y
están en estado **Development**, por lo que los nombres aún pueden cambiar [26]. Definen operaciones
para `create_agent`, `invoke_agent`, `invoke_workflow`, `plan`, `execute_tool` y operaciones de
memoria como `search_memory` y `update_memory`. Un span de herramienta se denomina
`execute_tool {gen_ai.tool.name}`; `gen_ai.tool.name` es obligatorio, `gen_ai.tool.call.id`
recomendado, y los argumentos y resultado de la llamada son opcionales. Los spans de agente llevan
`gen_ai.agent.id`, {`gen_ai.agent.name`} y {`gen_ai.agent.version`}, y una convención separada cubre
MCP ({`mcp.method.name`}, {`mcp.session.id`}) {[26]}.

La gobernanza necesita campos que las convenciones aún no definen (ID de registro, identidad de
carga de trabajo, veredicto de política, ID de aprobación, cadena de delegación): añádelos en tu
propio espacio de nombres y asígnalos después. Activar la captura de argumentos y resultados puede
capturar datos personales, por lo que necesita sus propias reglas de retención y acceso. Y los
registros son evidencia: los sistemas de alto riesgo deben registrar eventos durante su vida útil
(`Art. 12`), y los responsables del despliegue deben mantener los registros bajo su control durante
al menos seis meses (`Art. 26(6)`}) {[5]}. El
[registro de incidentes](/bok/incidents#the-incident-record) del capítulo 17 es donde termina el
seguimiento.

## Amenazas asignadas a controles

Las dos listas de OWASP dividen el terreno. La lista LLM 2026, publicada el 3 de agosto de 2026,
dice que "es propietaria del riesgo cuando el modelo es un componente dentro de tu aplicación"; una
vez que el modelo "se convierte en un actor, con herramientas que puede llamar, memoria que lleva
entre sesiones y consecuencias que pone en marcha aguas abajo, el riesgo se traslada a OWASP Agentic
Top 10", y Excessive Agency subió al tercero (`LLM03:2026`}) {[18]}. La tabla asigna cada amenaza
agentic a entradas LLM relacionadas, técnicas ATLAS de ejemplo de la versión de datos 2026-09
{[10]}, un control y el patrón que lo implementa.

| Amenaza agentic [1] | LLM 2026 relacionado [18] | Técnicas ATLAS de ejemplo | Control | Patrón | Capa |
|---|---|---|---|---|---|
| `ASI01` Agent Goal Hijack | `LLM01` Prompt Injection | `AML.T0051` LLM Prompt Injection | Procedencia de instrucciones; puntos de control antes de escrituras; evals de trayectoria | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI02` Tool Misuse and Exploitation | `LLM03` Excessive Agency; `LLM06` Unbounded Consumption | `AML.T0053` AI Agent Tool Invocation; `AML.T0086` | Lista de permitidos de herramientas; tasa por herramienta, salida y presupuestos | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI03` Identity and Privilege Abuse | `LLM03` Excessive Agency | `AML.T0083`; `AML.T0098` AI Agent Tool Credential Harvesting | Identidad de carga de trabajo; tokens delegados de corta duración; comprobaciones de audiencia | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI04` Agentic Supply Chain Vulnerabilities | `LLM04` Supply Chain | `AML.T0110` AI Agent Tool Poisoning | Admisión de servidor; fijación de definición | [AIBOM](/patterns/aibom) | 02 |
| `ASI05` Unexpected Code Execution (RCE) | `LLM10` Improper Output Handling | `AML.T0112.000` Local AI Agent | Ejecución en sandbox; denegar por defecto | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI06` Memory & Context Poisoning | `LLM05` Data and Model Poisoning; `LLM09` Vector and Embedding Weaknesses | `AML.T0080` AI Agent Context Poisoning | Puerta de escritura de memoria; espacios de nombres; reversión | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI07` Insecure Inter-Agent Communication | Ninguno | `AML.T0118` Autonomous AI Agent Communication | Autenticación mutua; Agent Cards firmadas; lista de permitidos de pares | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI08` Cascading Failures | `LLM06` Unbounded Consumption | `AML.T0034.002` Agentic Resource Consumption | Límites de profundidad y fan-out; disyuntores por agente | [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) | 04 |
| `ASI09` Human-Agent Trust Exploitation | `LLM07` Misinformation | `AML.T0067` LLM Trusted Output Components Manipulation | Aprobaciones de llamadas sin procesar; métricas de supervisión | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) | 04 · 05 |
| `ASI10` Rogue Agents | `LLM03` Excessive Agency | `AML.T0103` Deploy AI Agent | Registro con vencimiento; descubrimiento; disyuntor perforado | [Agent Registry](/patterns/agent-registry); [Shadow-AI Discovery](/patterns/shadow-ai-discovery) | 02 · 04 |

`LLM02:2026` Sensitive Information Disclosure llega al filtro de salida y {`LLM08:2026`} Hidden
Context Exposure en el tratamiento de prompts. Utiliza los IDs de ATLAS para etiquetar casos de
prueba en [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite), de modo que un
hallazgo se rastree desde la técnica al control a la eval que ahora lo protege. El
[puente de amenazas](/resources/threats) del sitio lleva las mismas filas que los datos. Los mapeos
son ilustrativos, no una afirmación de conformidad.

## Marcos escritos para agentes

Cinco organismos han publicado orientación específica para agentes, y el capítulo 08 ya coloca tres
de ellos lado a lado en su [tabla de control de agentes](/bok/regulatory-map#china). Su estado a
partir del 2026-09-24:

| Marco | Estado | Lo que añade |
|---|---|---|
| **NIST AI Agent Standards Initiative** (CAISI) | Lanzado el 17 de febrero de 2026; tres pilares: estándares liderados por la industria, protocolos abiertos, investigación sobre seguridad de agentes e identidad {[27]} | Una RFI sobre seguridad de agentes de IA y el documento conceptual de NCCoE sobre identidad y autorización de agentes {[27][8]} |
| **CSA Agentic Trust Framework** y **AARM** | ATF v1, publicado en febrero de 2026 bajo CC BY 4.0 {[4]}; AARM de un grupo de trabajo de CSA {[16]}; ambos nombrados en el programa de plano de control agentic de CSA de abril de 2026 {[28]} | Zero trust para agentes con niveles de autonomía ganados (ATF); requisitos de intercepción en tiempo de ejecución (AARM) |
| **IMDA Model AI Governance Framework for Agentic AI** | Lanzado el 22 de enero de 2026 {[29]}; versión 1.5 publicada el 20 de mayo de 2026 {[3]} | Cuatro dimensiones: limitar riesgos por adelantado, hacer que los humanos sean responsables, controles técnicos, responsabilidad del usuario final |
| **TC260 AI Safety Governance Framework 3.0, Appendix 2** | Voluntario; publicado el 14 de septiembre de 2026 {[6]} | Identidad por modo de decisión, registros de aprobación a prueba de manipulaciones, aislamiento de memoria, desmantelamiento |
| **OWASP Agent Control Standard** | Donado al OWASP GenAI Security Project, anunciado el 1 de septiembre de 2026; repositorio en versión 0.1.2 {[17]} | Un contrato de cable entre un host de agente y un guardián |

El mapa regulatorio también enumera un suplemento de control agentic de AICM propuesto de la CSA.
Este capítulo no pudo hacerlo coincidir con un documento primario de CSA a partir del 2026-09-24,
así que trátalo como no confirmado (verifica).

Lado a lado, convergen en una lista corta: una identidad única por agente, privilegio mínimo que
vence, puntos de control en acciones irreversibles, intercepción antes de la ejecución, una parada
que funciona en un agente, memoria aislada y registros completos. Singapur añade responsabilidad del
usuario final, la autonomía ganada de CSA, desmantelamiento de TC260. Ninguno confiere conformidad;
son fuentes de controles y vocabulario.

## Ganchos del Reglamento de IA de la UE para agentes

El Reglamento de IA no define "agente". Un agente es un sistema de IA, clasificado por su finalidad
prevista como cualquier otro: un agente que examina candidatos a empleos es de alto riesgo a través
del Anexo III sea cual sea su arquitectura, y un asistente de programación no lo es. El capítulo 18
tiene los [requisitos de alto riesgo](/bok/eu-ai-act#high-risk-requirements-articles-8-to-15) y los
[deberes del responsable del despliegue](/bok/eu-ai-act#deployer-duties-article-26) en su totalidad.
Las disposiciones siguientes son donde los controles de agentes producen la evidencia; el registro
de obligaciones da a cada uno su propia página, con sus fechas, evidencia y crosswalk:
[Art. 12](/obligations/aige-obl-euaia-art12), [Art. 14](/obligations/aige-obl-euaia-art14),
[Art. 15](/obligations/aige-obl-euaia-art15), [Art. 25](/obligations/aige-obl-euaia-art25),
[Art. 26](/obligations/aige-obl-euaia-art26) y [Art. 50](/obligations/aige-obl-euaia-art50).

| Disposición | Qué pregunta | Artefacto de agente | Responsable del deber |
|---|---|---|---|
| `Art. 12` | Registro automático de eventos durante la vida útil, para identificar riesgo, apoyar la vigilancia poscomercialización y monitorear la operación {[5]} | Trazas con identidad, llamadas de herramientas, veredictos y aprobaciones | Proveedor |
| `Art. 14(3)`–`(4)` | Supervisión acorde con el nivel de autonomía; conciencia del sesgo de automatización; anulación; parada {[5]} | Nivel de autonomía; puntos de control; aprobaciones de llamadas sin procesar; disyuntor | El proveedor diseña; el responsable del despliegue opera |
| `Art. 15(4)` | Resiliencia; reducir bucles de retroalimentación en sistemas que siguen aprendiendo {[5]} | Puerta de escritura de memoria; evals de memoria; reversión | Proveedor |
| `Art. 15(5)` | Resiliencia contra intentos de alterar el uso, salidas o rendimiento, incluido envenenamiento e inputs adversariales {[5]} | Guardrails; admisión de servidor; red team etiquetado con IDs de ATLAS | Proveedor |
| `Art. 25` | Un responsable del despliegue que modifica sustancialmente un sistema de alto riesgo, o cambia la finalidad prevista de un sistema de modo que se convierte en de alto riesgo, se convierte en su proveedor {[5]} | Revisión de cambios de prompts y herramientas con una comprobación de finalidad | Responsable del despliegue |
| `Art. 26(1)`–`(2)`, `(5)`–`(6)` | Usar según instrucciones; supervisores competentes con autoridad; monitorear y suspender; mantener registros al menos seis meses {[5]} | Registro de aprobadores; disyuntor; retención de registros | Responsable del despliegue |
| `Art. 50(1)` | Se le dice a las personas que están interactuando con un sistema de IA a menos que sea obvio; se aplica a partir del 2 de agosto de 2026 {[5]} | Divulgación en los mensajes, llamadas y chats que envía un agente | Proveedor |
| `Arts. 53`, `55` | Documentación para proveedores posteriores; evaluación de riesgo sistémico para los modelos más grandes {[5]} | La documentación del proveedor como entrada de debida diligencia; evals agentic en el archivo del proveedor | Proveedor de IA de uso general |

El Código de Prácticas de GPAI hace el vínculo agentic explícito para proveedores de modelos con
riesgo sistémico. Sus fuentes de riesgo sistémico incluyen "capacidades para operar de forma
autónoma" y "capacidades para usar herramientas, incluido 'computer use'", y entre las
funcionalidades "acceso a herramientas (incluidos otros modelos/sistemas de IA)" y el "nivel de
supervisión humana (p. ej., grado de autonomía del modelo)"; sus riesgos sistémicos especificados
incluyen **pérdida de control**, definida como "Riesgos de que los humanos pierdan la capacidad de
dirigir, modificar o apagar un modelo de forma fiable" {[23]}. Un responsable del despliegue debe
preguntar cómo el proveedor evaluó la autonomía y el uso de herramientas en la
[puerta de debida diligencia](/patterns/vendor-model-due-diligence-gate); el capítulo 18 cubre
[los deberes de GPAI](/bok/eu-ai-act#general-purpose-ai-models). El Código es una herramienta
voluntaria. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Encuentra tus agentes.** Ejecuta un barrido de descubrimiento que incluya agentes de
   codificación y configuraciones de servidor MCP local, y registra lo que encuentres con un
   propietario, un nivel de autonomía y un vencimiento.
2. **Retira una clave estática.** Mueve un agente a una identidad de carga de trabajo de corta
   duración, y confirma que los servidores MCP que llama rechazan tokens emitidos para otra
   audiencia.
3. **Escribe una lista de permitidos como política.** Deniega por defecto, con hashes de definición,
   clases de operación y un punto de control en cada llamada de pago, eliminación, envío y
   ejecución.
4. **Prueba la parada.** Dispara el interruptor en un agente, mide el tiempo de parada y confirma
   que no ocurrió ninguna llamada ni escritura después.
5. **Versionea el prompt del sistema.** Colócalo en el repositorio detrás de una eval gate y
   registra su hash en el registro y en cada traza.

**Correspondencias:** EU AI Act Art. 12, 14(3)–(4), 15(4)–(5), 25, 26(1)–(2), 26(5)–(6), 50(1), 53,
55 · GPAI Code of Practice, Safety and Security (Appendix 1.3, 1.4) · ISO/IEC 42001 (Annex A.6, A.9)
· NIST AI RMF (Manage 2.4) · NIST AI Agent Standards Initiative · OWASP Agentic ASI01–ASI10 · OWASP
LLM01, LLM03, LLM06, LLM08:2026 · MITRE ATLAS · IMDA Model AI Governance Framework for Agentic AI ·
TC260 Framework 3.0 Appendix 2 · Layer 02 Inventory & Transparency · Layer 04 Runtime Controls &
Observability · Layer 05 Assurance & Continuous Compliance. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] OWASP Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation, per-tool least-privilege profiles, auto-approved ping tool used for DNS exfiltration; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; "Least-Agency"). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; five levels by user role: operator, collaborator, consultant, approver, observer; autonomy as a design decision separate from capability). Knight First Amendment Institute at Columbia University / arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[3] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20; four levels of human involvement; agent identity unique, cryptographically verifiable, accounted for, differentiated by capacity, catalogued and centrally managed; authorisations scoped, time- or session-bound, non-transferable, bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals contextual and digestible; human approval enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[4] Agentic Trust Framework, v1 (zero-trust governance for AI agents; five elements: identity, behaviour, data governance, segmentation, incident response; autonomy tiers Intern, Junior, Senior, Principal; promotion criteria; CC BY 4.0; released February 2026). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 as amended by Regulation (EU) 2026/1744: Art. 12 record-keeping; Art. 14(3)–(4) human oversight commensurate with risks, level of autonomy and context of use, automation bias, override, "stop" button; Art. 15(4)–(5) robustness, feedback loops, cybersecurity; Art. 25 responsibilities along the value chain; Art. 26(1)–(2), (5)–(6) deployer obligations; Art. 50(1) transparency for systems interacting with natural persons; Arts. 53 and 55 GPAI providers; Art. 113 application dates as amended (Annex III high-risk from 2 December 2027, Annex I from 2 August 2028). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[6] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), Appendix 2 agentic AI risk management (II.2 unique identity and minimum permissions by decision mode, credentials revoked at task end; II.3 human control checkpoints, tamper-proof approval logs, deny by default when approval fails or no rule exists; II.5 execution limits, memory retention and isolation, no credentials in memory; II.7 decommissioning). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[7] Model Context Protocol, Security Best Practices, version 2026-07-28 (confused deputy; token passthrough "explicitly forbidden"; SSRF; state handle hijacking; local MCP server compromise, consent and sandboxing; scope minimisation and common mistakes). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[8] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[9] SPIFFE overview (Secure Production Identity Framework for Everyone; SPIFFE ID; short-lived SVIDs as X.509 or JWT delivered and rotated through the Workload API; SPIRE reference implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[10] MITRE ATLAS data, release v2026.09 (agent techniques incl. AML.T0034.002 Agentic Resource Consumption, AML.T0051 LLM Prompt Injection, AML.T0053 AI Agent Tool Invocation, AML.T0056 Extract LLM System Prompt, AML.T0067 LLM Trusted Output Components Manipulation, AML.T0080 AI Agent Context Poisoning (.000 Memory, .001 Thread), AML.T0081 Modify AI Agent Configuration, AML.T0083 Credentials from AI Agent Configuration, AML.T0086 Exfiltration via AI Agent Tool Invocation, AML.T0098 AI Agent Tool Credential Harvesting, AML.T0099 AI Agent Tool Data Poisoning, AML.T0101 Data Destruction via AI Agent Tool Invocation, AML.T0103 Deploy AI Agent, AML.T0110 AI Agent Tool Poisoning, AML.T0112.000 Local AI Agent, AML.T0118 Autonomous AI Agent Communication). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[11] RFC 8693, OAuth 2.0 Token Exchange (M. Jones, A. Nadalin, B. Campbell, J. Bradley, C. Mortimore; impersonation versus delegation semantics; "act" actor claim and nested actors; "may_act" claim). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[12] Model Context Protocol specification, version 2026-07-28, Authorization (optional; OAuth 2.1 resource server; RFC 9728 Protected Resource Metadata; Client ID Metadata Documents SHOULD, Dynamic Client Registration deprecated; RFC 8707 resource parameter; audience validation; no other tokens accepted or transited; RFC 9207 issuer validation; scope challenges and step-up). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization (verified: primary)
[13] "Authorization changes in the 2026-07-28 specification" (RFC 9207 issuer validation; DCR "formally deprecated in favor of CIMD"; client credentials bound to the issuer that minted them; formal deprecation policy with a twelve-month minimum window). Model Context Protocol blog. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[14] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group; a URL used as client_id that points to the client metadata). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[15] Prioritizing Real-Time Failure Detection in AI Agents (lead author Madhulika Srikumar; stakes, reversibility and affordances; definition of real-time failure detection). Partnership on AI. 2025-09-11. https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/ (verified: primary)
[16] Autonomous Action Runtime Management (AARM) specification (system category specification for agentic runtime security; pre-execution interception with identity binding; policy evaluation before execution; core requirements R1–R6; CSA working group). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[17] Agent Control Standard (ACS) (wire specification letting a guardian agent permit, deny or modify an agent's action before it happens, over an authenticated channel, with an audit trail; reference guardian failure posture "proceed" unless overridden; README discloses that the reference guardian lacks the required HMAC-SHA256 envelope signature, open issue #70; repository github.com/GenAI-Security-Project/agent-control-standard at version 0.1.2; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/resource/agent-control-standard-acs/ (verified: primary)
[18] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01 Prompt Injection incl. memory persistence; LLM02 Sensitive Information Disclosure; LLM03 Excessive Agency; LLM04 Supply Chain; LLM05 Data and Model Poisoning; LLM06 Unbounded Consumption; LLM07 Misinformation; LLM08 Hidden Context Exposure, formerly System Prompt Leakage; LLM09 Vector and Embedding Weaknesses; LLM10 Improper Output Handling; boundary with the Agentic Top 10 stated in the preface; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[19] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems inconsistent with intended use). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[20] Agent2Agent (A2A) Protocol Specification, v1.0 (releases v1.0.0 on 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, optional JWS signature over JCS-canonicalised JSON; security schemes; servers MUST authenticate every incoming request; authorisation implementation-specific; in-task authorisation via TASK_STATE_AUTH_REQUIRED and its unspecified scope and revocation semantics; Cancel Task not guaranteed). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[21] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 5(1)(c) data minimisation and 5(1)(e) storage limitation; Art. 17 right to erasure. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[22] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP, goose and AGENTS.md). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[23] General-Purpose AI Code of Practice, Safety and Security chapter, Appendix 1.3 sources of systemic risk (capabilities to operate autonomously and to use tools; propensities incl. colluding and mis-coordination with other AI systems; affordances incl. access to tools and level of human oversight) and Appendix 1.4 specified systemic risks (incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[24] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group; WG state "Waiting for Write-Up"; propagation of user identity, workload identity and authorisation context through a call chain within a trust domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[25] Workload Identity in Multi System Environments (WIMSE) working group, charter. IETF. 2026. https://datatracker.ietf.org/wg/wimse/about/ (verified: primary)
[26] OpenTelemetry semantic conventions for generative AI (status Development; agent spans create_agent, invoke_agent, invoke_workflow, plan; execute_tool span and gen_ai.tool.* attributes, arguments and results opt-in; memory operations; gen_ai.agent.id, .name, .version; MCP conventions mcp.method.name, mcp.session.id). OpenTelemetry. 2026. https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai (verified: primary)
[27] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI with ITL; three pillars; RFI on AI agent security; AI agent identity and authorization concept paper; listening sessions). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[28] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (Agentic Trust Framework; Autonomous Action Runtime Management framework; Catastrophic Risk Annex; STAR for AI). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[29] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[30] WIT-SVID (SPIFFE specification; Stability: Incubating; a sub-profile of the Workload Identity Token of the IETF WIMSE working group). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-specs/wit-svid/ (verified: primary)
