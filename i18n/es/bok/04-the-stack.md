---
lang: es
source: bok/04-the-stack.md
sourceHash: "70613b3c9beac9bd4322bd76445b643bbf981c8dc8701bbc0ac1f82996da262e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 04. El stack (cinco capas)

> La arquitectura de referencia de la ingeniería de gobernanza de IA: cinco capas que responden las
> tres preguntas, donde la evidencia se produce en la parte inferior y se prueba en la parte
> superior.

## Cómo leer el stack

El stack no es un organigrama ni una escalera de madurez. Es un orden de compilación. Cada capa
produce un artefacto que la capa anterior consume, de modo que la gobernanza deja de ser un conjunto
de documentos paralelos y se convierte en un único sistema con una ruta de datos de política a
prueba.

Léelo a lo largo de una columna vertebral:
**Política → Inventario → Evals → Runtime → Aseguramiento**. Escribes la regla como código (capa
01). No puedes aplicar una regla contra un sistema que no puedes ver, así que inventarías lo que se
está ejecutando (capa 02). No puedes afirmar que un sistema cumple la regla sin una prueba que pueda
fallar, así que ejecutas evals como evidencia (capa 03). Las reglas y pruebas decaen en el momento
en que el sistema cambia, así que mantienes la línea en runtime (capa 04). Y nada de esto vale nada
para un auditor a menos que la evidencia se emita, se firme y sea consultable, así que cierras con
aseguramiento continuo (capa 05).

**La evidencia fluye hacia arriba.** Un veredicto de política de la capa 01, una entrada del
registro de la capa 02, un resultado de eval de la capa 03 y una decisión de guardrail de la capa 04
no son cuatro registros desconectados. Cada uno es un artefacto estructurado con una marca de tiempo
y un propietario, y la capa 05 es donde se agregan en evidencia lista para auditoría. La prueba de
todo el stack es la prueba de la Tesis: como dice Ayoub Fandi, un panel verde sobre un control roto
es "teatro con pasos adicionales" [1]. El stack es la tubería que hace que el panel signifique algo:
cada celda verde se remonta a un control en ejecución y la evidencia que emitió.

Las cinco capas, nombradas exactamente y en orden, son:
**01 Gobernanza como código · 02 Inventario y Transparencia · 03 Evals y Red Teaming como Evidencia · 04 Controles de Runtime y Observabilidad · 05 Aseguramiento y Cumplimiento Continuo.**
Se asignan a las tres preguntas que la disciplina debe responder en cualquier momento. La capa 02
responde *qué IA se está ejecutando*. Las capas 01 y 04 responden *qué se le permite hacer*: la capa
01 escribe el límite como código y la capa 04 lo aplica en la llamada en vivo, bajo la identidad y
alcance propios del agente. Las capas 03 y 05 responden *qué evidencia lo prueba*. Las amenazas
contra las que se construyen los controles (secuestro de objetivo, mal uso de herramientas, abuso de
identidad y privilegio de agente, agentes deshonestos) se catalogan en OWASP's Top 10 para
Aplicaciones Agentic 2026 [2].

Tres de estas capas se heredan, no se inventan. Gobernanza como código (01), Inventario y
Transparencia (02) y Aseguramiento y Cumplimiento Continuo (05) provienen casi sin cambios de la
ingeniería GRC: política como código, el inventario de activos y la evidencia legible por máquina
son su práctica establecida, y los registros específicos de IA (el registro de agentes, el AIBOM)
los extienden en lugar de reemplazarlos. Las capas 03 y 04 (evals y red-teaming como controles, e
identidad de agente y control de runtime) son lo que la IA obliga a la disciplina a agregar, porque
un modelo cuyo comportamiento debe ser probado y un actor autónomo que actúa bajo autoridad delegada
no tienen análogo en GRC clásico. El nuevo trabajo se concentra allí; el resto es una
especialización de un método que ya funciona.

Cada herramienta nombrada a continuación es un ejemplo de una categoría, no una recomendación. Las
categorías son la sustancia; las marcas son ilustrativas e intercambiables.

## Capa 01: Gobernanza como código

**Lo que prueba.** Que una regla de gobernanza existe como un artefacto ejecutable, no un párrafo, y
que evaluó un cambio específico y devolvió una decisión. La prueba es un veredicto de política
vinculado a un commit, una solicitud de extracción o un despliegue, legible por máquina y
reproducible.

**Los artefactos.** Un ingeniero de gobernanza de IA envía política como código: reglas escritas en
un lenguaje de política que una canalización evalúa. Los artefactos típicos son una biblioteca de
políticas bajo control de versiones, un conjunto de asignaciones que mapean cada política a los
marcos que sirve, y el cableado de CI/CD que ejecuta la política en la puerta correcta. Una política
en esta capa es pequeña y comprobable: "la inferencia para esta clase de datos no puede enrutarse
fuera de la región permitida", "sin despliegues de modelo sin un propietario registrado y una puerta
de eval aprobada", "un agente no puede ser otorgado un alcance de herramienta que no declaró". Cada
regla lleva una declaración legible por humanos de intención como su documentación, pero la versión
aplicada es el código.

**Herramientas y estándares de referencia (ilustrativos).** Los motores de política expresan lógica
de permitir/denegar. `OPA/Rego` es el predeterminado general para política no de autorización
(residencia de datos, gating de despliegue, restricciones de configuración), mientras que `Cedar` es
más estrecho: un lenguaje de autorización, más fuerte para "¿puede este principal tomar esta acción
en este recurso?" y un ajuste pobre para política que no es una decisión de acceso. Elige por la
forma de la regla, no por la marca. Más allá de motores de propósito general, un enfoque propuesto
es Policy Cards: una propuesta de investigación para un artefacto legible por máquina en la capa de
despliegue que codifica restricciones operacionales, regulatorias y éticas para un agente y las
vincula a canalizaciones de aplicación y auditoría [3]; es un único preprint, prometedor pero aún no
un estándar, y el punto que hace, que la regla debe viajar con el agente como datos, se mantiene
cualquiera que sea el formato que gane. Las asignaciones hacen referencia a los marcos mismos:
ISO/IEC 42001 (el sistema de gestión de IA), NIST AI RMF y sus cuatro funciones (Govern, Map,
Measure, Manage [4]), el Reglamento de IA de la UE, y la Matriz de Controles de IA de CSA (AICM)
v1.1, que ofrece 247 objetivos de control en 18 dominios como vocabulario de control para mapear
[5]. Los proveedores son ilustrativos; los estándares no.

**Definition of done.**

- Cada política existe como código en un repositorio, con una prueba que demuestra que se dispara en
  una entrada que viola y pasa una limpia.
- Cada política declara las cláusulas del marco a las que se asigna, de modo que la asignación se
  genera a partir del código, no se mantiene junto a él.
- Al menos una política se ejecuta antes de la fusión y bloquea la fusión en caso de fallo; al menos
  una se ejecuta en el despliegue o admisión y bloquea la liberación.
- Un cambio en una política es un diff revisable con un propietario y una fecha efectiva.
- El motor de política emite un veredicto estructurado (permitir/denegar, id de regla, hash de
  entrada, marca de tiempo) para cada evaluación.

**Antipatrones.**

- La "biblioteca de políticas" que es una carpeta de documentos de Word que nadie puede consultar,
  aplicada por correo electrónico y auto-atestiguada en una hoja de cálculo.
- La asignación mantenida como una matriz de 300 filas en una herramienta separada, desviándose de
  las políticas que afirma describir: cobertura presentada como control.

**Evidencia a la siguiente capa.** El veredicto de política es el primer artefacto de evidencia.
Pero un veredicto solo es significativo contra un objeto conocido: "denegar despliegue del modelo X"
presume que el stack sabe que el modelo X existe, quién lo posee y qué es. Ese objeto es lo que la
capa 02 suministra.

> **En la práctica** Para `csa-01`, un asistente de servicio al cliente en una gran operadora de
> telecomunicaciones, una regla de residencia de datos escrita como `OPA/Rego` se ejecutaba tanto en
> CI como en admisión y bloqueaba cualquier despliegue que enrutara su inferencia fuera de la región
> permitida. El valor no estaba en la regla sino en que la versión aplicada emitía un veredicto que
> cada ingeniero podía ver antes de fusionar.

**Correspondencias:** Reglamento de IA Art. 9 (gestión de riesgos) · ISO/IEC 42001 · NIST AI RMF
(Govern) · CSA AICM · OWASP Agentic ASI02/ASI03. Los mapeos son ilustrativos, no una afirmación de
conformidad.

## Capa 02: Inventory & Transparency

**Qué demuestra.** Que la organización sabe qué IA está en ejecución (qué modelos, sistemas y
agentes están activos, en qué versión, quién es el propietario), y que cada uno tiene la
documentación de transparencia que exige una obligación. La prueba es una entrada de registro y sus
documentos adjuntos, idealmente escritos por un pipeline de despliegue en lugar de ser
mecanografiados manualmente.

**Los artefactos.** El artefacto central es el **registro de agentes**: el inventario consciente del
tiempo de ejecución de cada modelo, servicio y agente, cada uno con un propietario, un alcance y un
estado. Alrededor de él se encuentran los documentos de transparencia (fichas de modelo y fichas de
datos) y el **AIBOM**, la lista de materiales para un sistema de IA. Las referencias de FRIA y DPIA
cuelgan de la entrada del registro para sistemas que las necesitan, por lo que el inventario es
también el índice de qué sistema tiene qué evaluación de impacto.

**Herramientas y estándares de referencia (ilustrativos).** Los registros van desde suites de ITSM y
gobernanza (por ejemplo ServiceNow, Credo AI) hasta herramientas de descubrimiento de agentes (por
ejemplo Zenity) que encuentran IA que el inventario no conocía. El AIBOM tiene formatos estándar:
CycloneDX ML-BOM y el perfil de IA de SPDX 3.0, con el generador OWASP AIBOM produciendo salida
CycloneDX [6]. La distinción de un SBOM clásico importa: un AIBOM registra modelos, conjuntos de
datos, pesos y su procedencia, no solo dependencias de software. El registro es el objeto que las
políticas de la capa 01 evalúan y los controles de tiempo de ejecución de la capa 04 se adjuntan;
sin una ruta de datos de tiempo de ejecución alimentándolo, es una hoja de cálculo que era verdadera
el día en que se editó.

**Definition of done.**

- Cada modelo, sistema y agente en producción tiene una entrada de registro con un propietario, una
  versión y un alcance declarado; un artefacto no registrado no puede llegar a producción.
- El registro se alimenta del pipeline de despliegue, no de entrada manual; un nuevo despliegue se
  registra a sí mismo.
- Cada sistema de alto riesgo se vincula a su ficha de modelo, ficha de datos y, donde sea
  necesario, su FRIA/DPIA.
- Un AIBOM se genera en la compilación para cada sistema de IA y se almacena con la entrada del
  registro.
- Un mecanismo de descubrimiento reconcilia periódicamente el registro contra lo que realmente se
  está ejecutando e indica la desviación.

**Antipatrones.**

- El inventario de modelos mantenido a mano que responde "¿qué se está ejecutando?" correctamente el
  día en que se edita y es incorrecto dentro de una semana.
- Documentos de transparencia escritos una vez al lanzamiento y nunca regenerados cuando el modelo,
  prompt o conjunto de datos cambia: una ficha de modelo que describe un modelo que ya no existe.

**Evidencia para la siguiente capa.** La entrada del registro nombra el objeto bajo prueba. Una eval
en la capa 03 se ejecuta *contra una versión registrada* y su resultado se archiva *contra esa
entrada*, por lo que la pregunta "¿fue probado este modelo?" se responde con una unión, no una
búsqueda. El AIBOM le dice a la capa de eval qué probar: qué modelo, qué conjuntos de datos, qué
afirmaciones de procedencia necesitan sondeo adversarial.

> **En la práctica** Conectar el registro al pipeline de despliegue (para que `csa-01` se registrara
> a sí mismo, con un propietario y un alcance, en el momento del despliegue) convirtió "documentado"
> en "gobernado". Su entrada de registro se convirtió en una consulta respondida desde producción,
> no desde una diapositiva.

**Correspondencias:** Reglamento de IA Art. 11 (documentación técnica), Art. 49/71 (registro y base
de datos de la UE), Art. 50 (transparencia) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP
Agentic ASI10.

## Capa 03: Evals & Red Teaming as Evidence

**Qué demuestra.** Que el modelo o agente pasó una prueba definida cuyo fracaso tiene consecuencias.
Esta es la capa donde el principio "dar a cada control dientes" se vuelve concreto para evals: un
benchmark que solo informa a un comité no es un control; una eval conectada a una **eval gate** que
puede fallar la compilación sí lo es. La prueba es un resultado de eval estructurado: aprobado o
reprobado contra un umbral, versionado junto al modelo que probó.

**Los artefactos.** Un ingeniero envía suites de eval y la puerta que las ejecuta. Tres familias
recurrentes: evals de capacidad y calidad (¿hace el sistema su trabajo: fundamentación, regresión
contra un conjunto dorado?), evals adversariales y de red team (¿resiste jailbreaks, inyección de
prompts, mal uso de herramientas?), y evals de umbral de seguridad vinculadas a una política de la
capa 01 (un límite de fuga de PII, un piso de resistencia a inyección). La puerta es una etapa del
pipeline: si la eval cae por debajo del umbral acordado, el pipeline falla y el lanzamiento no se
envía.

**Herramientas y estándares de referencia (ilustrativos).** Marcos de evaluación como Inspect
(mantenido en nombre del UK AI Security Institute [7]), promptfoo y DeepEval ejecutan suites de
capacidad y regresión; Garak, Mindgard y Giskard ejecutan sondeos adversariales y de vulnerabilidad;
Ragas cubre calidad de recuperación aumentada. Las pruebas adversariales no son solo una buena
práctica: el Código de Prácticas de GPAI enumera las pruebas adversariales y el red-teaming entre
los enfoques de evaluación esperados de modelos GPAI con riesgo sistémico, aunque el Código es
voluntario y se limita a esos modelos [8]. El resultado de la eval es el artefacto de evidencia que
la capa 05 agregará, por lo que debe ser legible por máquina, no una captura de pantalla pegada en
una diapositiva.

**Definition of done.**

- Cada modelo o agente tiene una suite de eval versionada en el mismo repositorio y actualizada
  cuando el sistema cambia.
- Al menos una eval adversarial y una eval de capacidad se ejecutan en CI, con un umbral
  documentado.
- Una eval fallida bloquea el despliegue; la puerta tiene dientes, no solo un informe.
- Cada ejecución de eval emite un resultado estructurado (id de suite, versión de modelo,
  puntuación, umbral, aprobado/reprobado, marca de tiempo) archivado contra la entrada del registro.
- Los umbrales se remontan a un modo de fallo o obligación nombrado, no a un número redondo elegido
  por comodidad, y la certeza que demandan sigue el nivel de riesgo (el capítulo 11 establece la
  [certeza requerida por nivel de riesgo](/bok/ai-defined#certainty-required-by-risk-tier); el
  capítulo 14 dimensiona la suite para la
  [validez estadística de evals](/bok/governing-development#statistical-validity-of-evals)).

**Antipatrones.**

- La evaluación única previa al lanzamiento cuyos resultados se pegan en una diapositiva y nunca se
  vuelven a ejecutar cuando el modelo o sus prompts cambian.
- La "junta de revisión de riesgos" que califica hallazgos bajo/medio/alto mensualmente pero no
  tiene mecanismo para detener un lanzamiento ya programado: recomendación sin consecuencia. La
  solución es un comité que decide qué código no puede mientras las puertas aplican la decisión
  ([el comité decide, las puertas aplican](/bok/governance-program#the-committee-decides-the-gates-enforce),
  capítulo 12), con el apetito de riesgo
  [compilado en puertas](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates)
  (capítulo 13).

**Evidencia para la siguiente capa.** Una eval demuestra que el sistema era seguro *en el momento de
la prueba*. El sistema luego se encuentra con entradas que ninguna eval anticipó. La capa 04 lleva
los mismos umbrales a producción como guardrails de tiempo de ejecución, y el resultado de la eval
se convierte en la línea de base contra la que se compara la telemetría en vivo. Una caída en la
resistencia a inyección en vivo contra la línea de base probada es una señal, no una sorpresa.

> **En la práctica** Una suite de eval de red team combinando Inspect y Garak se ejecutó en CI para
> `csa-01`; un lanzamiento que redujo su resistencia a inyección por debajo del piso acordado falló
> el pipeline hasta ser corregido. La salida de la eval, no la opinión de un revisor, fue la
> evidencia de aseguramiento archivada contra la versión del modelo.

**Correspondencias:** Reglamento de IA Art. 15 (precisión, robustez, ciberseguridad), Art. 55
(evaluación de riesgo sistémico de GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) · CSA AICM · OWASP
Agentic ASI01/ASI02.

## Capa 04: Runtime Controls & Observability

**Qué demuestra.** Que los controles se mantienen mientras el sistema actúa, y que su comportamiento
se observa. Las políticas y evals son puntuales; los agentes actúan continuamente, en entradas que
nadie revisó. Esta capa demuestra que un guardrail medió una llamada real, que un agente actuó bajo
su propia identidad y alcance, y que hay una forma probada de detenerlo. La prueba es un flujo de
decisiones y trazas de tiempo de ejecución.

**Los artefactos.** Tres grupos. Guardrails: filtros de entrada/salida, mediación de llamadas de
herramientas, el punto de aplicación donde una política de la capa 01 se activa contra una solicitud
en vivo. Observabilidad: trazado y monitoreo que convierten el comportamiento del agente en una
señal de control. Identidad de tiempo de ejecución del agente: cada actor no humano con su propia
identidad de carga de trabajo, un alcance acotado, y un **kill switch**, una forma probada de
revocar acceso y detener un agente sin romper la flota. Registra y acota cada actor antes de que
actúe: ningún agente actúa antes de tener una identidad, un propietario y un alcance. Un
**agente guardián**, un agente cuyo trabajo es revisar, restringir o detener otros agentes en tiempo
de ejecución, es una forma de construir el punto de mediación; es en sí mismo un agente, por lo que
necesita su propia identidad, alcance y kill switch, y sus decisiones son evidencia como la de
cualquier otro guardrail [16]. El capítulo 23 trata
[la gobernanza de agentes de IA](/bok/governing-agents#what-makes-an-agent-a-governance-object) de
extremo a extremo, incluyendo
[identidad, delegación y autorización MCP para agentes](/bok/governing-agents#identity-and-short-lived-credentials).

**Herramientas y estándares de referencia (ilustrativo).** Marcos de guardrails como NVIDIA NeMo
Guardrails, Meta LlamaFirewall y Lakera aplican políticas de entrada/salida y llamadas de
herramientas; herramientas de observabilidad como Langfuse y Arize Phoenix se construyen sobre
OpenTelemetry para rastrear ejecuciones de agentes. La identidad del agente plantea dos preguntas
distintas que las herramientas no deben permitirse confundir. La primera es
**autenticación de canal**: cómo un cliente se autentica ante un servidor de herramientas en un
salto. La especificación del Protocolo de Contexto de Modelos de 2026-07-28 apretó exactamente esto:
deprecando el Registro Dinámico de Clientes a favor de Documentos de Metadatos de ID de Cliente y
vinculando credenciales a su emisor [9]. Eso endurece la conexión MCP; no es el modelo de identidad
del agente. La segunda es **identidad de carga de trabajo del agente**: una identidad duradera y
atribuible que el agente lleva en cada salto, herramienta y protocolo, bajo la cual se registran sus
acciones y se revoca su acceso. Ese es el trabajo de un sistema de identidad de carga de trabajo,
como SPIFFE/SPIRE o identidades de agente de primera clase de proveedores empresariales (por ejemplo
Microsoft Entra Agent ID, Okta Agent SSO), no de MCP, que asegura un canal. Confundir los dos deja
un agente bien autenticado en el salto MCP e igualmente no atribuible en cualquier otro lugar. El
NCCoE de NIST planteó las preguntas abiertas en su documento conceptual de febrero de 2026 sobre
identidad y autorización de agentes de software e IA: cómo se aplican la identificación,
autenticación y autorización para que cada agente sea "conocido, confiable y debidamente gobernado",
incluida la no repudiación y el registro a prueba de manipulaciones [10]. Gartner espera que para
2029 más de la mitad de los ataques exitosos contra agentes de IA explotarán debilidades de control
de acceso e inyección de prompts [11], los modos de fallo que esta capa existe para contener.

**Definition of done.**

- Cada agente se ejecuta bajo su propia identidad con un alcance declarado; ningún agente comparte
  una cuenta de servicio o una clave estática entre funciones.
- Un guardrail media las llamadas de herramientas y entrada/salida para cada agente, aplicando el
  alcance declarado en el registro.
- Existe un kill switch y ha sido probado: revocar el acceso de un agente no rompe los otros.
- Cada ejecución de agente se rastrea, y los rastros llevan la identidad del agente, las
  herramientas llamadas y los veredictos de política que se activaron.
- Las señales en tiempo de ejecución se comparan con la línea base de eval de la capa 03, y una
  regresión genera una alerta.

**Antipatrones.**

- Una flota de agentes que comparten una clave API y una cuenta de servicio privilegiada: un
  incidente significa rotar un secreto y romper todo, y la atribución es imposible.
- Guardrails que registran pero nunca bloquean: observabilidad confundida con control, por lo que el
  sistema se observa a sí mismo fallar en alta resolución.

**Evidencia para la siguiente capa.** Cada decisión de guardrail, rastro y evento de identidad es un
registro con marca de tiempo y estructurado. La capa 05 no recopila esta evidencia de nuevo; se
suscribe a ella. El tiempo de ejecución es donde el aseguramiento continuo obtiene su continuidad:
la diferencia entre una atestación de que un control existía y evidencia de que se activó, en una
llamada específica, en un momento específico.

> **En la práctica** `csa-01` recibió una identidad de carga de trabajo distinta con un propietario
> y un alcance declarado, como lo hizo cada otro agente en la telco; cuando se comportó mal fue
> rastreado a su identidad y revocado sin tocar los otros. El kill switch fue probado en un
> cronograma. Un kill switch no probado es una afirmación, no un control.

**Correspondencias:** Reglamento de IA Art. 14 (supervisión humana), Art. 15 (robustez,
ciberseguridad), Art. 12 (registro) · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM · OWASP
Agentic ASI02/ASI03/ASI10.

## Capa 05: Aseguramiento y Cumplimiento Continuo

**Lo que prueba.** Que los controles inferiores funcionan, continuamente, y que la prueba es legible
por máquina y lista para auditoría. Aquí es donde la evidencia deja de ser un subproducto y se
convierte en el producto: la auditoría es una consulta, no un proyecto. La prueba es un almacén de
aseguramiento en vivo que cualquiera de las capas inferiores escribe y un auditor puede leer.

**Los artefactos.** Evidencia legible por máquina en un formato estándar; asignaciones de marcos
generadas a partir de esa evidencia en lugar de mantenidas junto a ella; y la tubería de incidentes
e informes que convierte una señal en tiempo de ejecución en una obligación cumplida en el reloj. El
formato organizador es `OSCAL`. Su sustrato estable es el modelo nativo de NIST: una capa de control
(`catalog`, `profile`), una capa de implementación (`component-definition`, `system-security-plan`)
y una capa de evaluación (`assessment-plan`, `assessment-results`, `POA&M`), con trazabilidad desde
un resultado de evaluación hasta el control que probó [15]. Ese modelo es la parte en la que
construir; las adiciones específicas de IA en la parte superior aún se están formando. Un enfoque
propuesto (un único preprint de 2026, no un estándar) extiende OSCAL con dieciséis extensiones de
propiedades para fase de ciclo de vida, semántica de aplicación y trazabilidad de riesgos, en una
arquitectura de cumplimiento como código de tres capas que genera resultados de evaluación OSCAL
automáticamente [12]. Trátalo como una respuesta temprana a una brecha real que los autores nombran
bien: marcos "como el Reglamento de IA, ISO/IEC 42001 y NIST AI RMF especifican qué asegurar pero no
proporcionan un formato ejecutable para cómo" [12]. La brecha es lo que la capa 05 cierra; los
modelos de evaluación OSCAL nativos cierran la mayoría hoy, con o sin las extensiones.

**Herramientas y estándares de referencia (ilustrativo).** La evidencia se emite como artefactos de
componentes OSCAL y evaluación; suites de GRC y gobernanza de IA (por ejemplo Vanta, Drata,
OneTrust; watsonx.governance, Holistic AI, Saidot) la agregan y presentan. El informe de incidentes
se asigna al Reglamento de IA Art. 73 (incidentes graves) y Art. 72 (vigilancia
poscomercialización). A partir de 2026-09-24 ningún estándar armonizado se cita en el Diario Oficial
de la UE [13], por lo que un certificado ISO/IEC 42001 apoya el sistema de gestión de la calidad del
Art. 17 pero no lo satisface por sí solo, y no confiere presunción de conformidad bajo Art. 40 [17].

**Definition of done.**

- Los resultados de control de las capas 01–04 se emiten como evidencia legible por máquina (por
  ejemplo OSCAL) con marcas de tiempo y propietarios, continuamente.
- Las asignaciones de marcos se generan a partir de la evidencia, por lo que una celda de asignación
  que se vuelve verde apunta a un control que realmente se activó.
- La pregunta de un auditor se responde mediante una consulta contra el almacén de evidencia, no un
  sprint de recopilación de evidencia.
- Un pipeline de incidentes graves puede detectar, clasificar e informar en el reloj, con los
  cronogramas del Art. 73 codificados, no recordados (el capítulo 17 recorre
  [el ciclo de vida de la respuesta](/bok/incidents#the-response-lifecycle)).
- El almacén de aseguramiento mide la reducción real del riesgo (la tasa de modo de fallo, el tiempo
  de detección, el radio de explosión), no la cobertura de marcos.

**Antipatrones.**

- El aglutinante de atestación ensamblado la semana anterior a una auditoría, describiendo controles
  como se imaginaba que fueran, no como se comportó la producción.
- Una "puntuación de cumplimiento" de una plataforma cerrada que no puede rastrearse a un único
  control en ejecución, cuya ruta de datos se detiene en la importación de hojas de cálculo.

**La evidencia cierra el bucle.** El aseguramiento no es la parte superior de una escalera
unidireccional. Una caída en una métrica en vivo se retroalimenta a la capa 03 como una nueva eval,
a la capa 01 como una política más estricta, y a la capa 02 como una bandera de registro. El stack
es un bucle que resulta estar dibujado como una escalera.

> **En la práctica** Las decisiones de guardrail de `csa-01`, resultados de eval y veredictos de
> política se transmitieron a un almacén de aseguramiento con marcas de tiempo, por lo que el estado
> de un control era una consulta en vivo, no una firma anual. Cuando un auditor preguntó qué hizo su
> control de residencia de datos en el segundo trimestre, la respuesta fue un filtro sobre evidencia
> emitida, producida en minutos.

**Correspondencias:** Reglamento de IA Art. 17 (gestión de la calidad), Art. 72 (vigilancia
poscomercialización), Art. 73 (informe de incidentes graves) · ISO/IEC 42001, ISO/IEC 42005 · NIST
AI RMF (Govern, Manage) · CSA AICM.

## Gobernanza de datos en todo el stack

Las cinco capas gobiernan modelos y agentes; son tan sólidas como los datos subyacentes, y la
gobernanza de datos no es una capa sino un hilo a través de las cinco. Los datos de entrenamiento,
conjuntos de ajuste fino, corpus de recuperación, prompts y salidas cada uno llevan una base legal,
una procedencia, un límite de retención y un conjunto de derechos, y cada uno es un objeto que el
stack debe poder nombrar. En la capa 02 esto es la **ficha de datos** y el registro de linaje (de
dónde vino un conjunto de datos, para qué puede usarse, cuándo debe eliminarse), adjunto a la
entrada del registro junto a la ficha de modelo. En la capa 01 es política de retención y residencia
como código, con
[privacidad desde el diseño y tecnologías que mejoran la privacidad](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets)
(capítulo 19) donde están involucrados datos personales. En la capa 03 son pruebas de calidad de
datos y sesgo ejecutadas contra el conjunto, no asumidas de él, detrás de una
[puerta de admisión de conjunto de datos](/bok/governing-development#data-for-training-and-testing)
(capítulo 14); el capítulo 16 establece
[los datos que necesitas para probar sesgo](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
El Reglamento de IA de la UE trata esto como un deber de primera clase: el Artículo 10 requiere
conjuntos de datos representativos, relevantes y verificados para sistemas de alto riesgo, y el
Artículo 4a posterior a Omnibus da una base legal estrecha para procesar datos de categorías
especiales *para detección de sesgo*, condicionado a pseudonimización y eliminación una vez que se
corrige el sesgo (ver capítulo 08). El compromiso de ingeniería es que un corpus RAG se gobierna
como un modelo: versionado, su procedencia y licencia registradas en el AIBOM, su instantánea
vinculada a la eval que probó el sistema en él, por lo que "¿qué había en el corpus cuando se
produjo esta respuesta?" es una consulta, no una adivinanza. Los prompts, pasajes recuperados y
salidas en tiempo de ejecución necesitan las mismas reglas
([gobernanza de datos en tiempo de inferencia](/bok/governing-deployment#inference-time-data-governance),
capítulo 15). Los datos sin ficha, sin linaje y sin regla de retención son el objeto no gobernado
que hace que cada capa por encima de él sea improbable.

## Diseño de supervisión humana (Artículo 14)

La supervisión humana es un control que debe ser diseñado, no una garantía que deba ser afirmada. El
artículo 14 del Reglamento de IA de la UE requiere que los sistemas de alto riesgo estén diseñados
de modo que una persona pueda *supervisarlos efectivamente* (entender el resultado, decidir en
contra y detener el sistema), y la parte difícil es que la supervisión indiferenciada falla en ambas
direcciones. La revisión humana de cada acción destruye el valor de la automatización; la
supervisión nominal de un flujo de acciones es un sello de goma, y un sello de goma es peor que nada
porque lava la decisión. Dos modos de fallo deben ser diseñados explícitamente.
**Sesgo de automatización**: un revisor que ve un resultado de máquina confiado tenderá a
confirmarlo, así que la supervisión que solo ofrece «aprobar/rechazar» sobre la propuesta del modelo
es supervisión solo de nombre. **Supervisión que se degrada**: una puerta que una persona puede
cruzar en dos segundos bajo carga será cruzada en dos segundos, y su calidad cae silenciosamente
conforme sube el volumen. La respuesta de ingeniería es clasificar acciones por consecuencia y
colocar un punto de control diseñado solo donde las apuestas justifiquen la latencia (el patrón
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) en el capítulo 05), dando al revisor
contexto suficiente para estar en desacuerdo, registrando el aprobador y la decisión como evidencia,
y monitoreando la supervisión misma (tasa de aprobación, tiempo para decidir, tasa de anulación)
como una señal que puede degradarse. La supervisión que no mides es supervisión que no puedes
reclamar. Los enfoques
[human-in-the-loop, on-the-loop e in-command](/bok/principles-and-standards#eu-hleg-guidelines-and-altai)
del Grupo de Expertos de Alto Nivel de la UE (capítulo 22) nombran las opciones de colocación, y el
capítulo 16 prueba si las explicaciones realmente ayudan a los revisores a resistir el sesgo de
automatización
([testing explanation quality](/bok/fairness-and-explainability#testing-explanation-quality)).

## IA de terceros y contratada

La mayoría de las organizaciones no entrenan los modelos que ejecutan. Compran SaaS con un LLM
integrado, llaman a un modelo fundacional solo por API, o heredan un agente dentro del producto de
un proveedor; para esos, las partes del stack que asumen que posees el modelo se degradan. No puedes
hacer red-team de pesos que no puedes alcanzar, y una **eval gate** (capa 03) solo puede probar el
sistema del proveedor como una caja negra, en su límite, no sus internos. El control en tiempo de
ejecución (capa 04) se reduce a lo que la integración expone: los alcances de herramientas que
otorgas, la identidad que emites al agente del proveedor, el tráfico que puedes observar, no el
comportamiento del modelo mismo. Las capas no desaparecen, pero la capa 03 se reduce a evals de
límite y confianza en la evidencia propia del proveedor, y la capa 04 se reduce al perímetro que
controlas. Lo que crece para compensar es inventario y aseguramiento: el sistema del proveedor aún
necesita una entrada de registro, un propietario y un alcance; su documentación de proveedor, ficha
de modelo y cualquier AIBOM se convierten en evidencia que recopilas en lugar de producir; y la
debida diligencia misma se convierte en una puerta, escrita en una
[política de IA de terceros](/bok/governance-program#third-party-ai-policy) (capítulo 12). Este es
el patrón [**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate)
(capítulo 05), anclado en ISO/IEC 42001 Anexo A.10 (relaciones de terceros y clientes) y la división
de deberes del Reglamento de IA de la UE entre proveedor e implementador (ver capítulo 08, y
[quién eres en la cadena de valor](/bok/eu-ai-act#who-you-are-in-the-value-chain) en el capítulo
18). La regla de oro: cuanto menos del modelo poseas, más de tu presupuesto de control se mueve de
probarlo a acotarlo y evidenciar al proveedor. El capítulo 15 cubre la decisión
[build, buy or adapt](/bok/governing-deployment#build-buy-or-adapt) y su carga de evidencia, y el
capítulo 20 las
[licencias e indemnizaciones de modelos contratados](/bok/existing-law#model-licences-and-vendor-indemnities).

## El costo del stack

Nada de esto es gratis, y una línea de FinOps es parte de gobernarlo honestamente. Los costos
recurrentes son computación para suites de eval ejecutadas en cada cambio (las suites adversariales
son las caras, y ejecutarlas en cada commit en lugar de cada release es una factura real),
almacenamiento y egreso para trazas y el almacén de evidencia (las trazas de agentes son verbosas, y
la aseguramiento continuo significa mantenerlas el tiempo suficiente para responder una auditoría),
y el tiempo de ingeniería para mantener suites, umbrales e integraciones conforme los sistemas se
mueven. Los costos escalan con la frecuencia de cambio y el volumen de trazas, así que los
apalancamientos son obvios una vez nombrados: muestrea o nivela evals caros por riesgo, establece
retención por obligación en lugar de por defecto, y empuja los controles más baratos (una
verificación de política, una puerta de identidad) al frente donde atrapan fallos antes de que se
ejecute una eval cara. Un stack cuyo costo de ejecución nadie rastrea es un stack que será cortado
en la primera ronda de presupuesto, lo cual es su propio fracaso de gobernanza.

## El stack mínimo viable para un equipo de uno

La mayoría de las funciones de gobernanza de IA son pequeñas, y muchas son una sola persona: en la
disciplina GRC adyacente, aproximadamente la mitad de los equipos son cuatro personas o menos y casi
uno de cada cinco (18,5%) es un equipo de uno [14]. Un equipo de uno no puede construir las cinco
capas en profundidad, pero puede construir la columna vertebral delgadamente, de extremo a extremo:
un corte vertical que toca cada capa supera una capa construida y cuatro dejadas en papel. Comienza
donde el apalancamiento es más alto y el costo es más bajo:

- **Capa 02 primero, mínimamente.** Un registro al que un deploy escribe, con un propietario y un
  alcance por entrada. Si puedes responder «¿qué está ejecutándose y quién lo posee?» desde una
  fuente en vivo, tienes más que la mayoría.
- **Una política en la capa 01 con dientes.** Una sola regla que importa (sin deploy sin un
  propietario registrado, o una verificación de residencia de datos), como código, en el pipeline,
  bloqueando en fallo. Un control que muerde supera cien que recomiendan.
- **Una eval gate en la capa 03.** Una eval adversarial contra tu agente de mayor riesgo, cableada
  para que una regresión falle la compilación. Reutiliza un framework abierto; no escribas tu propio
  arnés.
- **Identidad y un kill switch en la capa 04.** Cada agente bajo su propia identidad con un alcance,
  y una forma probada de detenerlo. Este es el control más barato con la mayor reducción de radio de
  explosión.
- **Evidencia como subproducto en la capa 05.** Haz que cada uno de los anteriores emita un registro
  estructurado y con marca de tiempo en un almacén. Aún no estás construyendo un pipeline OSCAL; te
  niegas a confiar en capturas de pantalla.

El orden es deliberado: verlo, gobernarlo, probarlo, contenerlo, probarlo. Un corte vertical delgado
responde las tres preguntas para un sistema hoy y se amplía conforme el equipo crece. La
alternativa, una capa 01 gruesa de políticas sin inventario debajo, no responde ninguna de las tres
preguntas, y es exactamente el teatro de framework que la disciplina existe para terminar. Cuánto
del bucle de riesgo ejecuta una función pequeña está establecido por la
[matriz de adaptación](/bok/risk-management#the-tailoring-matrix) del capítulo 13.

## Un sistema a través de las cinco capas

`csa-01`, el asistente de servicio al cliente de los cuadros anteriores, es un sistema, no cinco. A
continuación está el artefacto único que produce en cada capa: fragmentos cortos de los esquemas
definidos en el capítulo 05, cada uno ilustrativo. Los Esquemas JSON completos con ejemplos
rellenados para estos registros, y [cómo usarlos](/resources/templates#tpl-how), están en la página
de plantillas.

**Capa 01: Govern-as-Code.** Un veredicto de Policy Card (ilustrativo):

```json
{ "rule_id": "residency.eu-only.v3", "decision": "deny",
  "input_hash": "sha256:9f2b…", "timestamp": "2026-09-18T14:07:11Z" }
```

**Capa 02: Inventory & Transparency.** Su entrada de registro (ilustrativa):

```json
{ "id": "csa-01", "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"], "expiry": "2026-12-17" }
```

**Capa 03: Evals & Red Teaming as Evidence.** Un resultado de eval-gate (ilustrativo):

```json
{ "suite_id": "injection-resistance.v4", "model_version": "csa-01@2026-09-18",
  "score": 0.982, "threshold": 0.95, "result": "pass" }
```

**Capa 04: Runtime Controls & Observability.** Un evento de guardrail (ilustrativo):

```json
{ "agent": "csa-01", "direction": "output", "rule_id": "output.pii.v2",
  "decision": "block", "timestamp": "2026-09-18T14:31:52Z" }
```

**Capa 05: Assurance & Continuous Compliance.** El registro de evidencia que emite (ilustrativo):

```json
{ "control_id": "guardrail.output.pii.v2", "subject": "csa-01@2026-09-18",
  "decision": "alert", "obligation": "EU AI Act Art. 15",
  "timestamp": "2026-09-18T14:31:52Z" }
```

Los cinco fragmentos son una ruta de datos de política a prueba, clave en el mismo id de registro.

## Lo que puedes hacer esta semana

1. **Dibuja un corte.** Elige un sistema y escribe, para cada una de las cinco capas, el artefacto
   único que produce hoy y el que le falta. Los vacíos son tu backlog, en orden de construcción.
2. **Conecta el registro al deploy.** Haz que un pipeline de despliegue escriba la entrada de
   registro (id, propietario, alcance, expiración) y falle cuando un campo esté vacío.
3. **Dale dientes a una política.** Mueve una regla que importa, un propietario registrado o una
   verificación de residencia de datos, a código en el pipeline, bloqueando en fallo, y registra
   cada veredicto con su id de regla.
4. **Cierra una release en una eval.** Pon una eval adversarial contra tu agente de mayor riesgo en
   CI, con un umbral trazado a un modo de fallo nombrado, para que una regresión falle la
   compilación.
5. **Practica una parada y mantén el registro.** Activa el kill switch en un agente en staging,
   cronometra la parada, y verifica que la parada y los eventos de guardrail llegaron a un almacén
   de evidencia, clave en el id de registro.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] Policy Cards: Machine-Readable Runtime Governance for Autonomous AI Agents (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[5] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[6] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[7] Inspect: a framework for large language model evaluations (UK AI Security Institute). GitHub. 2026. https://github.com/UKGovernmentBEIS/inspect_ai (verified: primary)
[8] General-Purpose AI Code of Practice, Safety and Security chapter (examples of model evaluation methods include "red-teaming and other methods of adversarial testing"; systemic-risk models only; voluntary; published 10 Jul 2025). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[9] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[10] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[11] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[12] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer compliance-as-code) (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[13] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[14] State of GRC 2026 (≈51% of GRC teams ≤4 people; ≈18.5% solo). GRC Engineer. 2026. https://grcengineer.com/report/ (verified: primary)
[15] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[16] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (guardian agents: AI-based technologies that review, monitor and redirect or block agent actions). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[17] CSA research note on the EU AI Act, prEN 18286 and ISO/IEC 42001 (ISO/IEC 42001 alone does not satisfy the AI Act and is not a harmonised standard; EN 18286 targets the Art. 17 QMS). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
