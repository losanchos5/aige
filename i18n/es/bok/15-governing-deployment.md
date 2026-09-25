---
lang: es
source: bok/15-governing-deployment.md
sourceHash: "b36107eafc969f54fd80c6d9a7b9b07bfd81efb8a8843db6acb8ab5a87c7cd53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 15. Gobernanza del despliegue y el uso

> Gobernanza de la ejecución: cómo un responsable del despliegue decide usar un sistema de IA, lo
> elige, contrata por él, lo pone en marcha, lo opera y lo retira, dejando en cada paso evidencia de
> que un control se activó.

La mayoría de las organizaciones despliegan mucha más IA de la que construyen. Los deberes de diseño
de un proveedor se cumplen en gran medida cuando el sistema se introduce en el mercado; los deberes
de un responsable del despliegue comienzan cuando el sistema se pone en servicio, y se mantienen
mientras funcione: úsalo según las instrucciones, asigna personal para su supervisión, monitoréalo,
suspende su uso cuando presente un riesgo, conserva sus registros e informa a la gente de que existe
[1]. El capítulo 18 enumera los
[deberes del responsable del despliegue del artículo 26](/bok/eu-ai-act#deployer-duties-article-26)
uno por uno, y el capítulo 17 cubre el lado de incidentes de los mismos
([deberes del responsable del despliegue: informar al proveedor, suspender el uso](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)).
Este capítulo sigue un sistema desde la decisión de usarlo hasta el día en que se apaga. En cada
paso nombra la decisión, el artefacto que la registra, la capa del stack que produce la evidencia y
el registro que llega al almacén de aseguramiento.

Dos términos recorren el capítulo. Un **responsable del despliegue** es cualquiera que use un
sistema de IA bajo su autoridad, excepto en una actividad personal y no profesional; un
**proveedor** desarrolla un sistema o modelo, o lo hace desarrollar, e introduce en el mercado o
pone en servicio bajo su propio nombre o marca [2]. Las etiquetas describen tareas, no tipos de
organización: un banco que ajusta un modelo de un proveedor y envía el resultado bajo su propia
marca puede desempeñar ambos roles para el mismo sistema (véase
[Cuando un responsable del despliegue se convierte en proveedor](#when-a-deployer-becomes-a-provider)).
El capítulo 14 cubre el lado de la construcción; este capítulo cubre el lado de la ejecución. Las
referencias a artículos se refieren al Reglamento de IA de la UE modificado por el Omnibus Digital,
a partir del 2024-09-24, cuyas normas de alto riesgo se aplican a los sistemas del Anexo III a
partir del 2 de diciembre de 2027 [3]; son mapeos ilustrativos, no una afirmación de conformidad.

La gobernanza del despliegue no es ingeniería de lanzamiento. MLOps pregunta si una nueva versión
puede desplegarse y revertirse. La ingeniería de gobernanza de IA pregunta quién decidió que el
sistema puede servir, sobre qué evidencia, qué señal lo revierte sin una reunión, y qué registro
prueba que cada una de esas cosas sucedió.

## El ciclo de vida del despliegue de un vistazo

| Etapa | La decisión | Artefacto | Capa | Registro de evidencia |
|---|---|---|---|---|
| Decidir | ¿Debe hacer esto la IA, y exactamente qué? | Registro de Decisión de Despliegue | 1 · 2 | Registro firmado vinculado a la entrada del registro |
| Elegir | ¿Qué modelo, alojado dónde, adaptado cómo? | Registro de selección de modelo | 3 · 2 | Resultados de eval de tarea por candidato |
| Contrato | ¿En qué términos? | Revisión de contrato y licencia | 1 · 5 | Lista de verificación de cláusulas; campos de licencia AIBOM |
| Puesta en marcha | ¿Aprobar, aprobar con condiciones o rechazar? | Decisión de puesta en marcha con disconformidad | 1 · 5 | Registro de decisión; condiciones como política |
| Despliegue | ¿Cuánta exposición, y qué lo revierte? | [Plan de despliegue con criterios de reversión](/patterns/staged-rollout-rollback-criteria) | 4 | Resultados de puerta de etapa; eventos de reversión |
| Operación | ¿Sigue siendo apto, justo y vale la pena? | [Plan de monitoreo](/patterns/drift-fairness-monitor); calendario de mantenimiento | 4 · 5 | Telemetría de desviación, equidad, costo y energía |
| Asegurar | ¿Siguen funcionando los controles? | Programa de auditoría, red team y modelo de amenaza | 3 · 5 | Hallazgos rastreados hasta su cierre |
| Comunicar | ¿Quién debe escuchar qué, y cuándo? | [Plan de comunicaciones y plantillas](/patterns/disclosure-notification-pipeline) | 5 | Avisos enviados, con marcas de tiempo |
| Retirada | ¿Degradar, localizar o apagar? | [Runbook de desactivación y retiro](/patterns/deactivation-localisation-retirement-runbook) | 4 · 2 | Registro de decisión; snapshot final de evidencia |

## La decisión de despliegue

### Comienza por el caso de uso, no por el modelo

La decisión de desplegar es una decisión de producto con un registro de gobernanza. Antes de
comparar cualquier modelo, anota el objetivo empresarial y cómo sabrás que se cumplió, las personas
sobre las que actuará el sistema, la decisión que informa o toma, y si la IA es la herramienta
correcta en absoluto: un motor de reglas, un formulario mejor o un índice de búsqueda a veces es la
respuesta honesta.

Luego nombra el **espacio negativo**: para qué el sistema explícitamente no es. El espacio negativo
es lo que después hace detectable la expansión de funciones, porque un uso que nunca fue aprobado
tiene un lugar donde ser registrado como fuera del alcance. La **finalidad prevista** del proveedor
(el uso para el que diseñó y documentó el sistema, incluyendo el contexto y las condiciones de uso
[2]) es el límite exterior; tu espacio negativo se sitúa dentro de él.

Clasifica el uso en la admisión, el flujo de trabajo descrito en el
[capítulo 06](/bok/the-role#intake-and-classification): nivel de riesgo, exposición regulatoria,
sensibilidad de datos y autonomía. La clasificación decide cuáles de los controles en este capítulo
se aplican. Un uso del Anexo III desencadena los deberes del responsable del despliegue del artículo
26 [1] y, para organismos públicos, entidades privadas que prestan servicios públicos, y usos de
puntuación crediticia y precios de seguros de vida y salud, la evaluación de impacto sobre derechos
fundamentales del artículo 27 (FRIA) antes del primer uso [4]. Un chatbot o un generador de
contenido sintético desencadena los deberes de transparencia del artículo 50, que se aplican a
partir del 2 de agosto de 2026 [5]; un sistema generativo ya en el mercado antes de esa fecha tiene
hasta el 2 de diciembre de 2026 para cumplir el deber de marcado del artículo 50(2) (artículo
111(4)) [8]. Las prácticas prohibidas del artículo 5 vinculan a responsables del despliegue así como
a proveedores, incluyendo la prohibición de sistemas que explotan vulnerabilidades debido a la edad,
discapacidad o una situación social o económica específica [6].

### Establece primero los requisitos de rendimiento y explicabilidad

Los requisitos escritos después de una demostración de un proveedor se ajustan a la demostración.
Establécelos antes de mirar a los candidatos:

- **Métricas que coincidan con el daño.** Para un clasificador de triaje, falsos negativos en casos
  urgentes; para un asistente generativo, fundamentación y el rechazo de solicitudes fuera del
  alcance. Una cifra de precisión promedio rara vez es la métrica que coincide con un daño.
- **Pisos por grupo.** Un umbral por población sobre la que actúa el sistema, para que un buen
  promedio no pueda ocultar un grupo en el que el sistema falla.
- **Umbrales de ir/no ir** que la revisión de puesta en marcha aplicará, cada uno rastreado al modo
  de fallo que representa, que es la disciplina establecida en
  [los límites de la puerta de eval](/bok/definition#the-limits-of-the-eval-gate).
- **La explicación que el uso necesita.** Un código de razón para una decisión adversa, una fuente
  citada para una respuesta generada, o un modelo interpretable donde la decisión debe ser
  cuestionable. Cuando una decisión basada en la salida de la mayoría de los sistemas del Anexo III
  tiene efectos legales o similarmente significativos en una persona, esa persona tiene derecho a
  una explicación clara y significativa del responsable del despliegue sobre el papel del sistema en
  la decisión [7]. Diseñar para esa respuesta es más barato que adaptarlo después; el
  [capítulo 16](/bok/fairness-and-explainability#explanation-techniques) cubre los métodos.

### Comprueba los datos y las personas

**Datos.** ¿Existen los datos de entrada con la cobertura y calidad que el uso necesita, con un
suministro que durará, y una base legal para este propósito? Cuando el responsable del despliegue
controla los datos de entrada de un sistema de alto riesgo, debe asegurar que los datos sean
relevantes y suficientemente representativos para la finalidad prevista [1].

**Personas.** La supervisión debe asignarse a personas con la competencia, capacitación y autoridad
necesarias, y el apoyo para usarla [1]. El artículo 4, reformulado por el Omnibus, pide a
proveedores y responsables del despliegue que apoyen la alfabetización en materia de IA de su
personal [8]. Antes de que un sistema de alto riesgo se use en el trabajo, un empleador-responsable
del despliegue debe informar a los representantes de los trabajadores y a los trabajadores afectados
[1]. La preparación también significa la autoridad para pausar: un operador que vea que el sistema
se comporta mal debe poder detenerlo sin pedir permiso primero.

### El Registro de Decisión de Despliegue

Reúne estas respuestas en un artefacto, el **Registro de Decisión de Despliegue (DDR)**,
comprometido junto al código del sistema y referenciado desde su entrada del registro (capa 02). Sus
pisos se convierten en los umbrales de la puerta de eval (capa 03); su espacio negativo se convierte
en el alcance que el runtime vigila (capa 04). La página de plantillas tiene un JSON Schema para
[la decisión de despliegue y el runbook de retiro](/resources/templates#schema-deployment-decision-record).
Un extracto ilustrativo:

```json
{ "ddr_id": "ddr-csa-01-v1", "system": "csa-01",
  "objective": "resolve tier-1 refund queries without an agent",
  "not_for": ["credit decisions", "complaints about staff"],
  "risk_tier": "limited", "obligations": ["EU AI Act Art. 50", "GDPR Art. 35"],
  "floors": { "groundedness": 0.95, "out_of_scope_refusal": 0.98 },
  "retire_if": ["deflection below business case for two quarters"],
  "owner": "team-support-platform", "decision": "proceed-to-selection" }
```

> **En la práctica (ilustrativo)**
> Para `csa-01`, el asistente de servicio al cliente en una gran telco, el espacio negativo del DDR
> enumeraba "quejas sobre el personal". Meses después, un equipo propuso enrutar consultas internas
> de RRHH al mismo asistente. El formulario de admisión comprobó la propuesta contra el registro, la
> marcó como un nuevo uso, y la devolvió a través de la clasificación en lugar de un cambio de
> configuración silencioso. El registro no detuvo la idea; hizo visible y responsable el cambio de
> propósito.

## Elegir el modelo

### Evalúa en tu tarea, tus datos y tus usuarios

Un benchmark público responde "¿qué tan bueno es este modelo en ese benchmark?". La pregunta del
responsable del despliegue es "¿qué tan bueno es en nuestra tarea, para nuestros usuarios, bajo
nuestras restricciones?". Construye una **eval de selección**: un conjunto de casos representativos
extraídos del tráfico que puedas usar legalmente, etiquetados con la respuesta que quieres,
estratificados por los grupos y casos extremos que el DDR nombra, y puntuados en las métricas que
coinciden con el daño. Hazla lo suficientemente grande para mostrar la diferencia por grupo que te
importa. Ejecuta cada candidato a través del mismo arnés con los mismos prompts, recuperación y
guardrails, y conserva los resultados: la eval de selección se convierte en la primera versión de la
suite de regresión detrás de la [puerta de eval](/patterns/eval-gate-in-ci).

### Lo que los benchmarks públicos y los leaderboards no pueden decirte

- **Contaminación.** Los elementos de prueba se filtran en los datos de entrenamiento. Cuando los
  investigadores escribieron un conjunto nuevo de problemas de matemáticas de primaria coincidentes
  con un benchmark popular, varias familias de modelos perdieron hasta un 8% en precisión, un signo
  de sobreajuste al conjunto público [9].
- **Divulgación selectiva.** Una clasificación refleja lo que los proveedores eligen enviar. Un
  análisis de un leaderboard de estilo arena ampliamente utilizado encontró que algunos proveedores
  probaron muchas variantes privadas antes del lanzamiento y podrían retirar puntuaciones si lo
  elegían [10].
- **Goodhart.** Una vez que un benchmark importa comercialmente, los modelos se ajustan a él. La
  presión que hace que una eval gate sea Goodhartable se aplica con más fuerza a un número público
  que no controlas.

Usa benchmarks para hacer una lista corta, nunca para tomar la decisión.

### Cuenta el coste total, incluida la energía

El coste de un modelo es la licencia o tarifa de API más el cálculo de inferencia, integración,
evaluación y monitorización, el coste de funcionamiento del stack de gobernanza alrededor de él
(véase [el coste del stack](/bok/the-stack#the-cost-of-the-stack)) y el coste de salida. La energía
y el carbono pertenecen al mismo registro, y la elección del modelo es donde se decide la mayoría de
ellos. Un estudio midió arquitecturas generativas multipropósito como órdenes de magnitud más caras
por inferencia que sistemas específicos de tarea en las mismas tareas, incluso controlando el tamaño
del modelo [11]. El límite de medición importa: un proveedor puso el prompt de texto mediano de su
asistente en 0,24 Wh, contando la capacidad inactiva y la sobrecarga del centro de datos así como
los aceleradores [12]; una cifra que deja estos fuera no es comparable. A nivel de todo el sector,
la AIE proyecta que el uso de electricidad de los centros de datos se más que duplique a alrededor
de 945 TWh para 2030 [13]. El Reglamento de IA pide a los proveedores de GPAI que documenten el
consumo de energía conocido o estimado de sus modelos [14]; nada en él mide tu huella de inferencia,
así que el responsable del despliegue tiene que hacerlo.

### Registra la elección

El **registro de selección de modelo** lista los candidatos, sus resultados de eval de selección,
las estimaciones de coste y energía, las razones de la elección, las condiciones que la reabrirían
(un cambio de precio, una nueva versión del proveedor, un piso incumplido en producción) y el plan
de salida. Se archiva contra la entrada del registro, así que "¿por qué este modelo?" se responde
con una consulta un año después, cuando las personas que eligieron se han ido.

## Tipos de modelo y opciones de despliegue

El tipo de modelo cambia los modos de fallo. La opción de alojamiento cambia quién puede ver y
detener qué. La técnica de adaptación cambia qué debes re-probar y, a veces, tu rol legal. Las
tablas a continuación describen cada opción, y la matriz al final nombra el control que cada
combinación añade. Trata todo esto como ilustrativo, no como una afirmación de conformidad: los
controles que un despliegue real necesita siguen de su nivel de riesgo, sus obligaciones y sus modos
de fallo.

### El tipo de modelo cambia el conjunto de controles

| Tipo de modelo | Modos de fallo dominantes | Controles que añade (capa) |
|---|---|---|
| **Predictivo clásico (clasificador, puntuador, predictor)** | Descalibración; brechas de error entre grupos; deriva de entrada y etiqueta; bucles de retroalimentación donde la puntuación forma los siguientes datos de entrenamiento. | L3: Pisos de rendimiento por grupo y una eval de calibración en tus propios datos etiquetados; L4: Monitor de deriva en entradas y resultados (PSI, KS); L2: Ficha de modelo que indica la población en la que se validó el modelo |
| **Generativo (texto, código, medios)** | Salida sin fundamento o fabricada; contenido dañino o que infringe derechos; inyección de prompts; fuga de datos personales o confidenciales. | L3: Evals de fundamentación y red team en tus propios prompts; L4: Guardrails de entrada y salida; divulgación y etiquetado de contenido sintético (Art. 50); L2: Prompts y prompts del sistema versionados como configuración en la entrada del registro |
| **Propietario (API o pesos licenciados)** | Cambio de versión silencioso; bloqueo; datos de entrenamiento opacos; términos o precios que cambian bajo ti. | L1: Términos del contrato (sin entrenamiento en entradas, residencia) aplicados como política; L2: Versión del modelo del proveedor fijada en la entrada del registro; L3: Evals de límite re-ejecutadas en cada cambio de versión del proveedor |
| **Pesos abiertos** | Incumplimiento de licencia o uso aceptable; archivos de pesos manipulados o maliciosos; vulnerabilidades sin parches que ahora son tuyas para parchar. | L1: Comprobación de licencia y uso aceptable como puerta de política; L2: Entrada de AIBOM con fuente, licencia y hash de archivo; L3: Suite completa de eval y red team propia; L4: Tus propios guardrails: ninguna capa de seguridad del proveedor se sienta delante |
| **Pequeño (tamaño de tarea, capaz de borde)** | Techo de capacidad; entrenamiento de rechazo más débil; frágil fuera de su tarea. | L3: Eval específica de tarea que prueba aptitud para esta tarea, no en general; L4: Enruta solicitudes fuera de alcance a un fallback o a un humano |
| **Grande (propósito general, frontera)** | Superficie de capacidad amplia; superficie de jailbreak amplia; sobrecostes; exceso de confianza por parte de los usuarios. | L1: Alcance del caso de uso en política: qué el sistema no puede ser pedido que haga; L3: Red team más amplio en las capacidades que no necesitas; L4: Límites de velocidad y límites de gasto por identidad |
| **Solo lenguaje** | Daños de texto; inyección a través de documentos y contenido web que el modelo lee. | L3: Red team de texto incluyendo inyección indirecta; L4: Guardrails de texto en entrada y salida |
| **Multimodal (imagen, audio, vídeo)** | Medios sintéticos e suplantación; instrucciones ocultas en imágenes o audio; usos biométricos y de vigilancia. | L1: Comprobaciones de prácticas prohibidas (Art. 5) y una política de uso biométrico; L3: Red team multimodal; L4: Marcado legible por máquina de medios generados (Art. 50) |

La división más grande es clásico contra generativo. Los modelos clásicos fallan silenciosamente, a
través de calibración, deriva y brechas de error de grupo; los modelos generativos fallan
ruidosamente, a través de contenido. Propietario contra pesos abiertos es principalmente una
cuestión de quién produce la evidencia: con una API la recopilas del proveedor (ficha de modelo,
AIBOM si se ofrece, avisos de cambio), con pesos abiertos produces casi toda tú mismo (hashes,
escaneos, evals, resultados de red team, registros de tiempo de ejecución; véase
[IA de terceros y adquirida](/bok/the-stack#third-party-and-procured-ai)).

### Dónde se ejecuta

| Dónde se ejecuta | Modos de fallo dominantes | Controles que añade (capa) |
|---|---|---|
| **Nube (servicio gestionado o API)** | Los datos salen de tu límite; interrupción del proveedor; inferencia enrutada a la región incorrecta. | L1: Residencia y política de clase de datos como código; L4: Aplicación de egreso y región en la ruta de inferencia; L5: Atestaciones del proveedor y lista de subprocesadores recopiladas y fechadas |
| **En las instalaciones (tu centro de datos o nube privada)** | Eres dueño del parche, la capacidad y la seguridad física; las actualizaciones se retrasan. | L4: Segmentación de red y control de acceso en los pesos; L2: AIBOM con hashes de archivo para cada artefacto desplegado; L5: Tus propios registros a prueba de manipulación |
| **Borde (dispositivo, vehículo, sucursal)** | Manipulación; extracción de pesos; versiones obsoletas en el campo; sin registro central. | L2: Artefactos de modelo firmados y un registro de versiones de campo; L4: Arranque seguro, atestación de dispositivo, reversión remota y desactivación remota; L5: Telemetría muestreada que llega al almacén de evidencia |
| **Híbrido (dividido por clase de datos o carga)** | Brechas de política en el límite; datos sensibles enrutados al nivel incorrecto; versiones inconsistentes. | L1: Política de enrutamiento por clase de datos, evaluada en cada solicitud; L2: Una entrada de registro que abarca cada nivel y sus versiones |

### Cómo se adapta

| Adaptación | Modos de fallo dominantes | Controles que añade (capa) | Efecto de rol |
|---|---|---|---|
| **Tal cual (solo prompting)** | Modelo no ajustado a tu tarea o población; el proveedor lo cambia bajo ti. | L3: Validación contra tus propios umbrales antes de go-live; L4: Guardrails compensatorios para las brechas que la validación encontró; L2: Prompt del sistema versionado con la entrada del registro | Responsable del despliegue, a menos que lo rebautices o cambies su finalidad prevista (Art. 25(1)(a), (c)). |
| **Fine-tune** | Entrenamiento de seguridad erosionado; datos de ajuste memorizados; nuevos sesgos. | L3: Trata el resultado como un nuevo sistema: eval completo y red team de nuevo; L2: Ficha de datos para el conjunto de ajuste; AIBOM vincula modelo base y pesos ajustados; L1: Registro de cálculo comprobado contra el criterio de modificación de GPAI | Puede ser una modificación sustancial de un sistema de alto riesgo (Art. 25(1)(b)) o hacerte el proveedor de un modelo GPAI modificado. |
| **Generación aumentada por recuperación (RAG)** | Envenenamiento de recuperación; corpus obsoleto o sin licencia; respuestas que filtran documentos entre usuarios. | L4: Control de acceso de corpus que refleja los permisos del sistema de origen; L3: Eval de fundamentación contra una instantánea de corpus; L2: Procedencia de corpus y licencia registradas en el AIBOM | Generalmente deja el rol sin cambios. |
| **Destilación, cuantización, adaptadores LoRA** | Regresión silenciosa de calidad o seguridad; tasas de error desplazadas entre grupos; proliferación de adaptadores. | L3: Re-ejecuta la puerta de eval y red team en el artefacto comprimido; L2: Registra cada adaptador y construcción cuantizada como su propia versión | Destilar o adaptar un modelo GPAI es una modificación: compruébalo contra el criterio de cálculo (verifica). |
| **Envoltura agéntica (herramientas, acciones)** | Mal uso de herramientas; secuestro de objetivo; abuso de privilegios; acciones que se propagan en cascada. | L4: Identidad del agente, credenciales limitadas, mediación de herramientas y un kill switch probado; L2: Entrada del registro de agentes con propietario, alcance y vencimiento; L4: Puerta de bucle humano en acciones de alto impacto | Cambia el riesgo más que el rol: la autonomía es el multiplicador de riesgo. |

### La matriz de tipo de modelo por opción de despliegue

Lee cada celda como el único control que la combinación añade además de su fila y su columna.

| Tipo de modelo | Nube | En las instalaciones | Borde | Fine-tune | RAG | Envoltura agéntica |
|---|---|---|---|---|---|---|
| **Predictivo clásico** | Comprobación de residencia en características; monitor de deriva de entrada | Ser dueño del pipeline de reentrenamiento y su aprobación | Modelo firmado; telemetría de versión de campo; reversión remota | Reentrenamiento es una versión: re-ejecuta pisos por grupo | No típico; gobernar la linaje del almacén de características en su lugar | La puntuación desencadena una acción: puerta humana en resultados adversos |
| **Generativo, lenguaje** | Sin entrenamiento y términos de retención; guardrail de salida | Guardrails propios, parches y medición de energía | Modelo pequeño; guardrails sin conexión; actualizaciones firmadas | Red team completo; eval de erosión de seguridad | Eval de fundamentación; permisos de corpus; comprobaciones de envenenamiento | Identidad del agente, mediación de herramientas, kill switch |
| **Generativo, multimodal** | Marcas de procedencia en salida; bloqueo de uso biométrico | Firma de contenido propia; reglas de retención de medios | Avisos de cámara y micrófono; minimización en dispositivo | Comprobaciones de similitud y consentimiento en medios de ajuste | Pruebas de inyección multimodal en medios recuperados | Acciones de pantalla y voz detrás de una puerta humana |
| **Propietario (API)** | Fija la versión; evals de límite en cada cambio | Dispositivo del proveedor: atestigua versión y ruta de actualización | SDK del proveedor: límites de licencia; revocación sin conexión | Servicio de fine-tune del proveedor: términos de datos; tu propia re-eval | Tu corpus, su modelo: términos de retención y sin entrenamiento | Otorga herramientas limitadas; el agente del proveedor obtiene su propia identidad |
| **Pesos abiertos** | Puerta de licencia; pesos verificados por hash en cálculo alquilado | Eres dueño del parche: AIBOM, escaneos de archivo, red team | Los pesos son extraíbles: términos de licencia y [modelo de amenaza](/patterns/ai-threat-model) | Registro de cálculo contra el criterio de un tercio de GPAI | Cada capa de evidencia es tuya para producir | Guardrails propios de extremo a extremo; sin capa de seguridad del proveedor |

## Construir, comprar o adaptar

### Tres rutas, tres cargas de evidencia

| Ruta | Lo que controlas | Evidencia que produces | Evidencia que recopilas | Rol típico |
|---|---|---|---|---|
| **Comprar** (SaaS, API) | Integración, prompts, identidades, el tráfico que envías | Evals de límite; registros de tiempo de ejecución de tu tráfico | Ficha de modelo, instrucciones de uso, certificaciones, avisos de cambios | Responsable del despliegue |
| **Adaptar** (ajuste fino, RAG, envoltorio agente) | La adaptación y todo lo que la rodea | Evals del sistema adaptado; ficha de datos de ajuste; registro de cómputo | Documentación y licencia del modelo base | Responsable del despliegue; proveedor si se activa un disparador del Art. 25 o se aplica el criterio de IA de uso general |
| **Construir** (modelo propio) | Todo | Todo | Licencias para datos y componentes de terceros | Proveedor y responsable del despliegue |

Cuanto menos del modelo poseas, más de tu presupuesto de control se desplaza de probarlo a acotarlo
y evidenciar al proveedor; cuanto más poseas, más de la evidencia es tuya para producir.

### Cuándo un responsable del despliegue se convierte en proveedor

El artículo 25(1) convierte a un distribuidor, importador, responsable del despliegue u otro tercero
en proveedor de un sistema de IA de alto riesgo, con las obligaciones del proveedor, cuando pone su
nombre o marca comercial en un sistema de alto riesgo ya en el mercado; realiza una modificación
sustancial en un sistema de alto riesgo de modo que siga siendo de alto riesgo; o cambia la
finalidad prevista de un sistema, incluido uno de uso general, de modo que se convierte en de alto
riesgo [15]. Una **modificación sustancial** es un cambio no previsto en la evaluación de la
conformidad inicial del proveedor que afecta al cumplimiento de los requisitos de alto riesgo o
cambia la finalidad prevista [2]. El proveedor inicial deja de ser el proveedor de ese sistema pero
debe cooperar; el Omnibus Digital extendió esa obligación para cubrir documentación técnica,
limitaciones conocidas y modos de fallo, y acceso técnico dirigido para pruebas y validación [8].

Los modelos de uso general tienen su propia prueba. Las directrices de la Comisión sobre
obligaciones de IA de uso general (contenido aprobado el 18 de julio de 2025, adoptadas como C(2025)
7719 final el 19 de noviembre de 2025) [16] tratan a un actor que modifica o ajusta un modelo de IA
de uso general como proveedor del modelo modificado solo en casos excepcionales, con un criterio
indicativo: la modificación utiliza más de un tercio del cómputo de entrenamiento del modelo
original. Las obligaciones de documentación, política de derechos de autor y resumen de
entrenamiento cubren entonces la modificación, no el modelo completo [17]; donde el modelo original
tiene riesgo sistémico, las directrices presumen que el modelo modificado también lo tiene, con
todas las obligaciones de riesgo sistémico [16]. El criterio es indicativo, y cómo se aplica a la
destilación o al entrenamiento repetido de adaptadores es una cuestión para plantear a asesoría
legal (verifica). La consecuencia de ingeniería es clara de cualquier forma: registra el cómputo de
cada ajuste fino como un artefacto, porque la pregunta será formulada.

| Desencadenante | Cómo sucede en la práctica | Detección | Artefacto |
|---|---|---|---|
| Nombre o marca comercial (`Art. 25(1)(a)`) | Etiquetado blanco de un sistema de alto riesgo de un proveedor | Comprobación de marca en la lista de verificación de lanzamiento | Decisión de rol en la entrada del registro |
| Modificación sustancial (`Art. 25(1)(b)`) | Reentrenamiento, nuevas fuentes de datos, umbrales movidos más allá de los cambios predeterminados del proveedor | Clasificación de cambios en CI contra los cambios predeterminados en las instrucciones de uso [18] | Registro de cambios |
| Finalidad prevista cambiada (`Art. 25(1)(c)`) | Un asistente general puesto a trabajar en contratación o crédito | Intake; el registro de uso posterior | Reclasificación; DDR enmendado |
| Modificación de IA de uso general | Ajuste fino de un modelo de IA de uso general con más de un tercio de su cómputo de entrenamiento original | Registro de cómputo | Estimación de cómputo presentada con el AIBOM |

### Licencias de pesos abiertos

Los pesos abiertos no son una licencia, y "peso abierto" no es "código abierto". Cada familia pide
algo diferente de un responsable del despliegue:

| Familia | Ejemplos | Qué te pide | Ten cuidado con |
|---|---|---|---|
| **Permisiva** | Apache 2.0, MIT, BSD | Mantén avisos y el texto de la licencia; Apache 2.0 añade una concesión de patente expresa. | La licencia del modelo puede ser permisiva mientras que su datos de entrenamiento o una licencia de conjunto de datos no lo es. |
| **Copyleft** | Familia GPL | Distribuir un derivado requiere liberarlo bajo la misma licencia. | Se aplica al código en la pila de servicio tanto como al modelo; la distribución es el disparador. |
| **Copyleft de red** | AGPL 3.0 | Los usuarios que interactúan a través de una red con una versión modificada deben ser ofrecidos su código fuente. | Servir un componente modificado detrás de una API puede activar la oferta de código fuente. |
| **Licencia de IA responsable (uso restringido)** | Familia OpenRAIL | Acceso abierto con usos prohibidos enumerados que deben ser transmitidos a cada usuario posterior y derivado. | Las restricciones de uso viajan con el modelo: tus términos de uso deben llevarlas. |
| **Licencia comunitaria personalizada** | Licencias comunitarias "comunitarias" de proveedores para modelos de pesos abiertos | Política de uso aceptable incorporada por referencia; obligaciones de atribución o denominación; umbrales de escala por encima de los cuales se necesita una licencia separada. | Los umbrales y políticas difieren por versión del modelo; las reglas de denominación pueden aplicarse a derivados que publiques. |
| **No comercial o solo investigación** | Familia CC BY-NC; licencias de investigación | Sin uso comercial. | Un conjunto de datos o modelo solo de investigación dentro de un producto comercial es un incumplimiento, sea quien sea quien lo añadió. |

Tres ejemplos muestran el rango. Apache 2.0 añade una concesión de patente expresa a sus permisos
[19]. La AGPL requiere que los usuarios que interactúan con una versión modificada a través de una
red sean ofrecidos su código fuente [20], lo que alcanza pilas de servicio. Las licencias de estilo
OpenRAIL otorgan acceso abierto pero adjuntan restricciones de uso que deben pasar a cada derivado y
redistribución [21]. Las licencias comunitarias personalizadas van más allá: la licencia de Llama
3.1 incorpora una política de uso aceptable, requiere atribución "Construido con Llama", pide que
los modelos derivados distribuidos a otros lleven "Llama" al inicio de su nombre, y requiere que los
licenciatarios cuyos productos tuvieron más de 700 millones de usuarios activos mensuales en la
fecha de lanzamiento soliciten una licencia separada [22]. Los controles siguen: una comprobación de
licencia como puerta de política (capa 01), licencia, versión de uso aceptable y hash de archivo en
el [AIBOM](/patterns/aibom) (capa 02), verificación de hash de cada archivo de peso antes de cargar,
y un [escaneo de archivos de modelo serializados](/patterns/model-artefact-integrity) antes de que
lleguen a un tiempo de ejecución. La cláusula completa y la lista de verificación de licencia están
en la [página de contratos](/resources/contracts).

### Poseer el modelo: la ventaja y la carga

Construir o adaptar fuertemente tu propio modelo compra control: sobre versiones y fechas de
retirada, sobre personalización, sobre dónde viven los datos, y sobre la evidencia misma, ya que
puedes hacer red-teaming de pesos que posees. También compra la carga del proveedor si colocas el
sistema en el mercado, y tres riesgos operacionales que los clientes de API principalmente alquilan.
**Seguridad de pesos**: los pesos son un activo a proteger, del robo de archivos y de la extracción
a través de la API de inferencia, que la taxonomía de ataques adversariales de NIST y MITRE ATLAS
ambos catálogos [23][24]; límites de velocidad, monitoreo de patrones de consulta y acceso de menor
privilegio al almacenamiento de pesos son los controles. **Mantenimiento**: parches, revalidación y
actualizaciones de modelo base se convierten en tu calendario. **Riesgo de persona clave**: un
modelo que solo dos personas pueden reentrenar es un riesgo de continuidad con nombres adjuntos.

### Responsabilidad, seguros y transferencia de riesgo

La nueva Directiva sobre responsabilidad por productos defectuosos trae software, incluidos sistemas
de IA, dentro de la definición de producto; los Estados miembros deben transponerla antes del 9 de
diciembre de 2026, y se aplica a productos colocados en el mercado después de esa fecha [25]. Para
constructores que colocan sistemas en el mercado, la responsabilidad por defectos se convierte en
una entrada de diseño; para responsables del despliegue, el contrato decide qué recurso tienen
contra el proveedor. Existe un mercado para seguros específicos de IA, incluida cobertura para
pérdidas de errores de modelo ofrecida a proveedores de IA y a las organizaciones que despliegan sus
sistemas [26]. Comprueba las exclusiones de IA en las pólizas existentes de ciberseguridad, errores
y omisiones tecnológicos y de responsabilidad con tu corredor antes de asumir cobertura. Donde un
asegurador pide evidencia de controles, el cuestionario de suscripción se convierte en un consumidor
más del almacén de aseguramiento. Y el riesgo transferido no es riesgo reducido: el riesgo residual
dejado después de límites, exclusiones y deducibles pertenece en el registro de riesgos (ver
[capítulo 13](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it)).

## Contratos de proveedores y términos de licencia

Cuando despliegas un sistema que no construiste, el contrato es una superficie de control, y el
lugar donde la [política de IA de terceros](/bok/governance-program#third-party-ai-policy) de la
organización (capítulo 12) se vuelve ejecutable. Decide si puedes probar el sistema, si te enteras
cuando cambia, dónde van tus datos y cómo te vas. El Reglamento de IA requiere un acuerdo escrito
entre el proveedor de un sistema de alto riesgo y terceros que suministren sus componentes,
herramientas y servicios, especificando la información, capacidades, acceso técnico y asistencia que
el proveedor necesita [15]. Para compradores, las cláusulas contractuales tipo de la UE para
adquisición de IA (MCC-AI), actualizadas el 5 de marzo de 2025 en una versión de alto riesgo y una
versión ligera con un comentario, dan un texto de referencia redactado para organizaciones públicas;
es la versión más reciente a partir de 2026-09-24 [27]. ISO/IEC 42001 Anexo A.10 y NIST AI RMF
(GOVERN 6, MANAGE 3) nombran los controles de terceros que las cláusulas apoyan [28][29][30].

Las cláusulas que más importan para la gobernanza, con la bandera roja a buscar y la evidencia a
mantener (la posición de repliegue para cada una está en la
[página de contratos](/resources/contracts)):

| Cláusula | Bandera roja | Evidencia a mantener |
|---|---|---|
| **Uso de tus datos para entrenamiento** | El uso de entrenamiento está activado por defecto, permitido para "mejora del servicio", o controlado por una configuración que el proveedor puede cambiar. | La cláusula, la cuenta o configuración de API capturada en el lanzamiento, y una recomprobación periódica de esa configuración. |
| **Derechos en entradas y salidas** | El proveedor toma una licencia a tus entradas más allá de proporcionar el servicio, o se reserva derechos en salidas. | La cláusula, referenciada desde la entrada del registro de cada sistema que usa el proveedor. |
| **Retención y eliminación** | Retención "según sea necesario" sin número, o retención de monitoreo de abuso que no puedes acortar o ver. | Términos de retención por tipo de datos; confirmaciones de eliminación; tu propio cronograma de retención de registros que cumple con el Art. 26(6). |
| **Sub-procesadores y proveedores de modelos anteriores** | Una lista de sub-procesadores que no se publica, o cambia sin aviso y sin derecho a objetar. | Instantáneas fechadas de la lista de sub-procesadores; decisiones de objeción. |
| **Residencia de datos y transferencias** | Un compromiso de región para almacenamiento solo, mientras que la inferencia o el soporte pueden ejecutarse en cualquier lugar. | Veredictos de política de residencia de la ruta de inferencia; la evaluación de transferencia. |
| **Documentación e instrucciones de uso** | Documentación "disponible bajo solicitud" o limitada a material de marketing. | Copias versionadas adjuntas a la entrada del registro. |
| **Acceso a auditoría y evaluación** | Auditoría solo leyendo el propio resumen del proveedor; pruebas, benchmarking o investigación de seguridad prohibidos. | Informes recibidos; tus resultados de eval de límites; las ventanas de prueba acordadas. |
| **Aviso de cambio, fijación de versiones y deprecación** | Los modelos pueden ser «actualizados o mejorados en cualquier momento»; aviso de deprecación más corto que tu ciclo de revalidación. | Avisos de cambio presentados contra la entrada del registro; resultados de revalidación por versión. |
| **Notificación de incidentes y vulnerabilidades** | Aviso «sin demora indebida» sin horas especificadas, o limitado a violaciones de datos personales. | El SLA; avisos recibidos y sus marcas de tiempo; tus registros de incidentes que los citan. |
| **Disponibilidad, latencia y límites de velocidad** | Créditos de servicio como único remedio para una interrupción que detiene un proceso crítico. | Informes de SLA; tu propio monitoreo de disponibilidad; pruebas de continuidad. |
| **Indemnización de propiedad intelectual** | Indemnización excluida cuando modificas prompts, usas filtros de forma diferente o combinas salidas. | Prueba de que cumpliste las condiciones de indemnización (filtros activados, uso documentado), conservada como registros. |
| **Garantías de rendimiento y exenciones de responsabilidad sobre salidas** | Exenciones generales de precisión sin rendimiento documentado alguno. | El rendimiento documentado, comparado con tus propias evals. |
| **Límites de responsabilidad y exclusiones** | Un límite establecido en algunos meses de cuotas, con datos, propiedad intelectual y pérdidas regulatorias todas excluidas. | El límite y las exclusiones, registrados como riesgo residual en el registro de riesgos. |
| **Política de uso aceptable del proveedor** | Una política incorporada por referencia que el proveedor puede cambiar unilateralmente. | La versión de la política verificada en el lanzamiento, mapeada a tu propia lista de usos prohibidos. |
| **Asignación de roles y cooperación regulatoria** | Silencio sobre los roles del Reglamento de IA, o una cláusula que traslada deberes del proveedor a ti sin el acceso para cumplirlos. | La decisión de rol registrada en la entrada del registro, con la cláusula que la respalda. |
| **Controles de seguridad y certificaciones** | Certificaciones que excluyen el servicio de IA de su alcance. | Certificados con sus declaraciones de alcance; resúmenes de red team. |
| **Asistencia de terminación, portabilidad y salida** | Sin período de transición; los pesos ajustados o adaptadores pertenecen al proveedor; exportación solo en formatos propietarios. | Un plan de salida y el registro de un simulacro de salida. |
| **Seguro** | Sin cláusula de seguro, o cobertura que excluya reclamaciones relacionadas con IA. | Certificados de seguro, fechados y archivados con el contrato. |

Dos reglas convierten la tabla en gobernanza. Primero, una cláusula que importa en tiempo de
ejecución debe convertirse en una verificación: la configuración de no entrenamiento leída desde la
cuenta, el compromiso de residencia aplicado en la ruta de inferencia, la versión fijada en el
registro. Una cláusula que nada verifica es una esperanza. Segundo, la revisión es un paso de la
[Puerta de Diligencia Debida del Proveedor / Modelo](/patterns/vendor-model-due-diligence-gate), por
lo que se reabre en la renovación y en cada aviso de cambio material. El conjunto de datos detrás de
esta tabla, con el riesgo que cada cláusula aborda, una posición de repliegue y los instrumentos a
los que se asigna, es una lista de verificación de ingeniería, no asesoramiento legal.

> **Ejemplo (ilustrativo)**
> Los términos de un proveedor permitían 60 días de aviso antes de retirar una versión de modelo. El
> ciclo de revalidación del responsable del despliegue (eval de selección, red team, canary) tomaba
> aproximadamente 90 días. La brecha fue registrada como un riesgo, negociada a una ventana de
> deprecación de 120 días en la renovación, y mientras tanto cubierta manteniendo un segundo modelo
> candidato caliente en el arnés de eval.

## La revisión de lanzamiento

### Qué lee la revisión

La revisión de lanzamiento lee un paquete de evidencia, no una presentación: el DDR; el registro de
selección de modelo; resultados de la puerta de eval contra los pisos; el resumen de red team; las
evaluaciones de impacto (una FRIA donde se aplica el Artículo 27, una DPIA donde la ley de
protección de datos lo requiere, ambas mantenidas como en el patrón
[FRIA-as-Code](/patterns/fria-as-code)); la revisión del contrato; el plan de monitoreo con
propietarios nombrados; el plan de lanzamiento con sus criterios de reversión; el plan de
comunicaciones; y el runbook de desactivación. Cuando la evidencia es propia del proveedor (sus
instrucciones de uso, que deben indicar las capacidades, limitaciones, medidas de supervisión y
necesidades de mantenimiento del sistema [18]), la revisión se ejecuta en **modo de revisión**:
evalúa la evaluación y registros del proveedor y registra explícitamente qué no pudo verificar el
responsable del despliegue. En el lado del proveedor, la misma evidencia salió de
[preparación para el lanzamiento y conformidad](/bok/governing-development#release-readiness-and-conformity)
(capítulo 14).

### Tres resultados

| Resultado | Significado | Qué se registra | Qué hace el pipeline |
|---|---|---|---|
| **Aprobar** | La evidencia cumple los pisos | Decisión, aprobador, riesgo residual y quién lo aceptó | El plan de lanzamiento comienza en su primera etapa |
| **Aprobar con condiciones** | Proceder solo mientras se mantengan las condiciones nombradas | Cada condición con un propietario, una fecha límite y la verificación que la verifica | Las condiciones se convierten en política: una bandera limita la exposición, y la aprobación lleva una fecha de vencimiento |
| **Rechazar** | La evidencia no respalda el despliegue | Las razones y qué cambiaría la respuesta | El despliegue está bloqueado; el estado del registro lee `rejected` |

Una aprobación con condiciones es donde la gobernanza más a menudo se convierte en teatro, porque
las condiciones son fáciles de otorgar y fáciles de olvidar. Hazlas código: cada condición es una
verificación con una fecha límite, y si la verificación no ha pasado para entonces la aprobación
caduca y la bandera de característica se cierra. El riesgo residual es aceptado por una autoridad
que coincide con el nivel de riesgo, nunca por el equipo que quiere enviar.

### Disconformidad registrada

Cualquier miembro de la revisión puede registrar disconformidad. La disconformidad se adjunta al
registro de decisión, se nombra, y se revisa en la primera revisión de monitoreo después del
lanzamiento. No cuesta nada cuando el disconforme está equivocado, y cuando tiene razón responde la
primera pregunta que cada revisión de incidente hace: ¿alguien vio esto venir?

> **En la práctica (ilustrativo)**
> La revisión de lanzamiento para `csa-01` la aprobó con dos condiciones: un piso de fundamentación
> en el tema de reembolsos, remeasurado después de cuatro semanas de tráfico en vivo, y un red team
> en español antes de que el asistente sirviera a hablantes de español. Ambas se convirtieron en
> banderas. El líder de seguridad registró disconformidad en el alcance de la herramienta para
> búsquedas de pedidos. La verificación de cuatro semanas pasó; el red team no, por lo que el
> español se mantuvo detrás de su bandera hasta que se envió una corrección, y la disconformidad se
> cerró con un alcance reducido.

## Entrega progresiva como control

La entrega progresiva limita la exposición mientras se acumula evidencia. Cada etapa es una puerta
con un criterio establecido de antemano; las etapas se toman de la ingeniería de confiabilidad del
sitio, donde el canarying se define como un despliegue parcial y limitado en tiempo de un cambio y
su evaluación [31].

| Etapa | Qué es | Qué prueba | Criterio de reversión (establecido antes de que comience la etapa) | Evidencia |
|---|---|---|---|---|
| **Shadow** | El nuevo sistema ve entradas en vivo; sus salidas no se utilizan | Comportamiento en tráfico real sin exposición | Desacuerdo con el incumbente o con decisiones humanas por encima de un umbral | Salidas emparejadas; registro de desacuerdo |
| **Pilot** | Un pequeño grupo informado de usuarios | Usabilidad; la supervisión funciona; la fuerza laboral está lista | Tasa de anulación o tasa de quejas por encima de un umbral | Informe piloto; registro de retroalimentación |
| **Canary** | Una pequeña parte del tráfico de producción, comparada con un grupo de control [31] | Sin regresión a escala | Cualquier piso incumplido contra el control | Análisis canary por métrica |
| **Blue-green** | Dos entornos de producción; el tráfico cambia entre ellos [32] | Una ruta de regreso probada e instantánea | Cualquier evento de severidad 1 | Eventos de cambio |
| **Feature flags** | Alternancias en tiempo de ejecución por cohorte, región o función, incluyendo kill switches operacionales [33] | La exposición es controlable sin un despliegue | Establecido por bandera | Registro de cambios de bandera |
| **Version pinning** | El registro fija versiones de modelo, prompt, corpus y guardrail | Se sabe qué se ejecutó | Se detecta un cambio sin fijar | Diff del registro |

Los criterios de reversión deben ser **pre-registrados**: escritos en el
[plan de lanzamiento](/patterns/staged-rollout-rollback-criteria) antes de que comience la etapa, y
evaluados por el pipeline, no por una reunión. Un criterio inventado después de que la métrica se
movió es una negociación, no un control. Lo mismo se aplica a cambios que no hiciste: una nueva
versión de modelo de proveedor es un lanzamiento, y pasa por shadow y canary en tu lado contra la
versión fijada antes de que tome tráfico. El catálogo de herramientas lista
[herramientas de entrega progresiva](/resources/tools#cat-progressive-delivery) como ejemplos
ilustrativos, no respaldos.

## Operación del sistema

### Políticas en el lanzamiento

El sistema se lanza con las políticas que hacen su uso gobernable. Una **política de uso aceptable**
para personal y clientes, extraída del espacio negativo. **Entrenamiento basado en roles**: para qué
es el sistema, las limitaciones que declaran sus instrucciones de uso [18], cuándo anularlo y cómo
reportar un problema, con la finalización como condición de acceso. **Ayudas de interfaz** que
respalden el juicio en lugar de reemplazarlo: fuentes mostradas, confianza donde es significativa, y
una forma visible de llegar a una persona. Estas son la forma práctica de los deberes del Artículo
26 de usar el sistema como se instruye y de dar supervisión a personas competentes con autoridad
[1], y de los controles de uso responsable en ISO/IEC 42001 Anexo A.9 [28]. La supervisión en sí se
diseña como en [diseño de supervisión humana](/bok/the-stack#designing-human-oversight-article-14).

### Gobernanza de datos en tiempo de inferencia

Las entradas en vivo son procesamiento de datos, y un sistema desplegado crea nuevos datos con cada
solicitud: prompts, pasajes recuperados, salidas, registros y retroalimentación. Gobiérnalos como
gobiernas los datos de entrenamiento (ver
[gobernanza de datos en todo el stack](/bok/the-stack#data-governance-across-the-stack)):

- **Minimiza** lo que llega al modelo, con filtrado de PII y prevención de pérdida de datos en el
  [guardrail](/patterns/runtime-guardrail) de entrada.
- **Establece retención por tipo de dato** como código, reconciliando el piso de retención de
  registros con el techo de limitación de almacenamiento de la ley de protección de datos.
- **Recomprueba la base legal** cuando cambia el propósito; un nuevo uso de registros antiguos es un
  nuevo propósito de procesamiento.
- **Mapea transferencias** cuando la inferencia, almacenamiento o soporte se ejecutan en otra
  jurisdicción; el capítulo 19 trata
  [la inferencia remota como una transferencia](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
- **Planifica para [solicitudes de titulares de datos](/patterns/rights-requests-against-models)**
  que lleguen a prompts, registros, corpus de recuperación y pesos ajustados. Eliminar un registro
  de un corpus es una eliminación; eliminar su influencia de pesos ajustados puede significar
  reentrenamiento, así que decide antes de ajustar sobre datos personales. Los responsables del
  despliegue de sistemas de alto riesgo utilizan la información del proveedor para llevar a cabo su
  DPIA [1]; [el capítulo 19](/bok/privacy-and-ai#the-dpia-for-ai-systems) cubre el lado de la
  privacidad en profundidad.

### Calendario de mantenimiento y gobernanza de reentrenamiento

Las instrucciones de uso del proveedor indican la vida útil esperada del sistema y el mantenimiento
que necesita, incluyendo con qué frecuencia [18]. El calendario del responsable del despliegue
comienza allí y añade el suyo:

| Cadencia | Actividad | Artefacto | Capa |
|---|---|---|---|
| Continuo | Señales de drift, equidad, calidad, costo y energía contra umbrales | Telemetría de monitoreo | 4 · 5 |
| Semanal | Clasificación de problemas y casi fallos; revisión de tendencias de anulación y quejas | Registro de problemas | 5 |
| Mensual | Avisos de cambio de proveedor, cambios de subprocesador, informes de SLA | Registro de revisión de terceros | 2 · 5 |
| Trimestral | Revisión de umbral; red team en versiones actuales; actualización de fichas y registro | Fichas actualizadas; resultados de red team | 2 · 3 |
| Anualmente (o por nivel de riesgo) | Reevaluación de impacto; revisión de beneficio; actualización de licencia y dependencias; simulacro de desactivación | Reevaluación; registro de simulacro | 1 · 2 · 4 |
| En un evento | Nueva población, jurisdicción, nivel de autonomía o versión de proveedor; un incidente | Registro de activación de reevaluación | 1 · 2 |

La **gobernanza del reentrenamiento** descansa en una regla: un reentrenamiento, un ajuste fino, un
cambio de prompt, una actualización de corpus y una actualización de modelo de proveedor son todos
lanzamientos. Cada uno pasa por la eval gate y las etapas de entrega progresiva, y cada uno
incrementa la versión en el registro. Un cambio de umbral es un cambio de control, así que es un
diff revisado con un aprobador, no una edición en un panel. El reentrenamiento se activa por una
brecha de drift o piso, por el calendario, o por un cambio en el mundo que describe el DDR. El
catálogo de herramientas lista [herramientas de monitoreo](/resources/tools#cat-monitoring) como
ejemplos ilustrativos, no como respaldos.

### Drift: qué se mueve y cómo verlo

El concept drift es un cambio imprevisible en la distribución de los datos que un modelo ve a lo
largo del tiempo, y la investigación sobre él divide el trabajo en detección, comprensión y
adaptación [34]. En producción ayuda nombrar qué se movió:

| Drift | Qué cambia | Ejemplo (ilustrativo) | Cómo detectarlo |
|---|---|---|---|
| **Datos (covariante)** | La distribución de entrada | Una nueva línea de productos cambia las preguntas que hacen los clientes | Índice de estabilidad de población o una prueba de Kolmogorov-Smirnov en características o embeddings contra una ventana de referencia |
| **Etiqueta (prior)** | La tasa base del resultado | La tasa de fraude sube en una temporada | Tasa de positivos predicha contra observada |
| **Concepto** | La relación entre entrada y resultado | Los mismos síntomas, nueva orientación de tratamiento | Rendimiento en etiquetas nuevas; detección de punto de cambio en la tasa de error |
| **Pipeline** | Una característica, esquema o paso de recuperación ascendente | Un cambio de esquema vacía un campo | Contratos de datos; monitores de tasa nula y frescura |
| **Modelo de proveedor** | El modelo detrás de la API | El proveedor envía una nueva versión | Verificación de fijación de versión; canary contra la línea base fijada |
| **Uso** | Quién usa el sistema y para qué | El personal comienza a usar el asistente para preguntas de RRHH | Clasificación de tema del tráfico contra el espacio negativo |

Las etiquetas a menudo llegan tarde, o nunca. Para modelos clásicos, empareja estadísticas de drift
de entrada con una verificación de rendimiento retrasada cuando llegan las etiquetas; para sistemas
generativos, muestrea salidas para puntuación de fundamentación y revisión humana. Cada
[señal de drift](/patterns/drift-fairness-monitor) necesita un umbral, un propietario y una
consecuencia definida: un problema, un reentrenamiento, un modo degradado o un incidente.

### Equidad y calidad en producción

Un sistema que pasó sus [evals de equidad](/patterns/fairness-eval-suite) en el lanzamiento puede
derivar hacia inequidad sin ningún cambio de código. Monitorea tasas de error por grupo contra los
pisos por grupo en el DDR, tasas de quejas y apelaciones por grupo, y, para sistemas generativos,
tasas de fundamentación y rechazo por tema e idioma. Donde la ley requiere una auditoría de sesgo
periódica (la Ley Local 144 de Nueva York, por ejemplo, requiere una auditoría de sesgo dentro de un
año antes de que se use una herramienta de decisión de empleo automatizada, y un resumen público de
sus resultados [35]), la telemetría de producción es lo que hace la auditoría barata. El
[capítulo 16](/bok/fairness-and-explainability#monitoring-fairness-in-production) cubre las
métricas; el punto aquí es que se ejecutan continuamente y alimentan la misma ruta de umbral,
problema e incidente que cualquier otra señal.

### Quién es propietario de la señal

| Señal | Vigila (responsable) | Decide (responsable) | Consultado | Informado | Escala a |
|---|---|---|---|---|---|
| Rendimiento y drift | Guardia de plataforma ML | Propietario del sistema | Ingeniero de gobernanza de IA | Riesgo | Panel de lanzamiento si se incumple un piso |
| Equidad | Ingeniero de gobernanza de IA | Propietario del sistema | Legal; representantes de grupos afectados | DPO | Comité de riesgos |
| Seguridad y abuso | Operaciones de seguridad | Responsable de seguridad | Ingeniero de gobernanza de IA | Propietario del sistema | [Incident pipeline](/patterns/incident-pipeline) |
| Obligaciones de cumplimiento | Ingeniero de gobernanza de IA | Responsable de cumplimiento | Legal | Enlace regulador | Incident pipeline; propietario de comunicaciones |
| Costo, energía y beneficio | FinOps | Propietario del negocio | Responsable de sostenibilidad | Finanzas | Revisión de beneficio |

La regla es la del [capítulo 06](/bok/the-role#runtime-monitoring-and-incidents): eres propietario
de una señal cuando puedes ser llamado para ella. Un sistema crítico necesita cobertura para cada
hora que se ejecuta, y una señal sin propietario es una señal en la que nadie actúa.

### Monitoreo de terceros mientras ejecutas

Un sistema adquirido sigue cambiando después de que se firma el contrato. Archiva cada aviso de
cambio y deprecación contra la entrada del registro, lee los informes de SLA, toma una instantánea
de la lista de subprocesadores, y reabre la puerta de due-diligence en la renovación. Mantén un
modelo alternativo caliente en el arnés de eval para que una migración forzada comience desde
evidencia, no desde un comienzo en frío. El NIST AI RMF pide exactamente esto: riesgos y beneficios
de terceros monitoreados regularmente, y modelos preentrenados monitoreados como parte del
mantenimiento propio del sistema [30]. El
[paso de operación de la puerta de due-diligence](/patterns/vendor-model-due-diligence-gate#operate-change-notices-reassessment-and-fallback)
convierte esto en un runbook.

### Cuando el proveedor falla: continuidad

Planifica para que el proveedor falle en cada una de las formas en que puede: una interrupción, un
límite de velocidad en el pico, una caída de calidad, un modelo retirado, una deprecación forzada, o
una salida comercial o legal. Los respaldos son un proceso manual que el personal ha practicado, un
modelo alternativo detrás de la misma interfaz, respuestas en caché o plantillas, y los modos
degradados descritos a continuación. La recuperación necesita su propia evidencia: haz una copia de
seguridad de la instantánea del corpus y los embeddings, o sabe que puedes reconstruir el índice;
mantén los prompts y configuraciones de guardrail bajo control de versión; y prueba el cambio. El
NIST AI RMF pide procesos de contingencia para fallos en sistemas de IA de terceros considerados de
alto riesgo [29].

Algunos sectores hacen esto un deber legal. Las entidades financieras bajo DORA, en aplicación desde
el 17 de enero de 2025 [36], deben mantener un registro de información sobre todos los acuerdos
contractuales para servicios TIC de proveedores de terceros, y deben tener estrategias de salida
para servicios TIC que apoyen funciones críticas o importantes [37]. Un modelo de IA alcanzado como
servicio es probable que cuente como un servicio TIC para este propósito (verifica para tu caso).
Las entidades en el alcance de NIS2 deben tomar medidas para la continuidad del negocio, incluida la
gestión de copias de seguridad y recuperación ante desastres, y para la seguridad de la cadena de
suministro [38]; si estás en el alcance depende de tu sector y tamaño (verifica).

### Realización de beneficio

Rastrea el objetivo en el DDR contra lo que el sistema entrega, incluido su costo de inferencia y
operación. La entrega insuficiente es una señal de gobernanza, no solo una comercial: un sistema que
cuesta más ejecutar y gobernar que lo que devuelve es un candidato para reconfiguración o retiro, y
la revisión de beneficio es donde eso se decide en evidencia. Un registro de sistemas en vivo sin
beneficio medido es un inventario de riesgo sin precio.

### Reporte de huella energética

Mide energía por solicitud y en total, con el límite establecido: aceleradores, sistemas
anfitriones, capacidad inactiva y sobrecarga del centro de datos [12]. En tu propio hardware,
mídelo; en el de un proveedor, pídelo en el contrato y registra lo que recibiste. Convierte a
carbono con la intensidad de la red de la región que sirve el tráfico, repórtalo junto al costo en
la revisión de beneficio, y deja que informe la próxima elección de modelo: cuando un modelo más
pequeño pasa la eval de selección, la diferencia de energía es una razón para preferirlo [11].

### Retención de registros

| Registro | Mantenido por | Mínimo | Fuente |
|---|---|---|---|
| Registros generados automáticamente por un sistema de alto riesgo, en la medida bajo el control del responsable del despliegue | Responsable del despliegue | Al menos seis meses, a menos que otra ley diga lo contrario | `Art. 26(6)` [1] |
| Los mismos registros, bajo el control del proveedor | Proveedor | Al menos seis meses | `Art. 19(1)` [39] |
| Documentación técnica y de gestión de calidad, declaración de conformidad | Proveedor | 10 años después de la introducción en el mercado | `Art. 18(1)` [40] |
| DDR, decisión de lanzamiento, condiciones y disconformidad | Responsable del despliegue | La vida del sistema más el período de limitación que establece el asesor legal | Práctica |
| Registros de operador bajo el marco voluntario TC260 3.0 de China | Operador | Al menos seis meses, con auditoría | §5.3 [41] |

La retención es un control, así que es código: un cronograma por tipo de registro, almacenamiento a
prueba de manipulaciones para registros, una retención legal que anula la eliminación, y formatos de
archivo que alguien aún pueda leer en 10 años. El piso de seis meses para registros es un mínimo; la
ley de protección de datos establece un techo para los datos personales dentro de ellos, y los dos
se reconcilian por tipo de datos, no manteniendo todo.

## Aseguramiento periódico

### Un programa de auditoría, no una auditoría

Una auditoría única es una instantánea. Un programa de auditoría tiene una carta, una cadencia
basada en riesgos vinculada al nivel de riesgo, e independencia proporcional a las apuestas:
revisión de segunda línea, auditoría interna, o un evaluador externo (ver
[cómo se relaciona esto con la certificación](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments)).
Los buenos programas re-ejecutan en lugar de leer: el auditor re-ejecuta una verificación de equidad
o reproduce una muestra de registros en lugar de aceptar el informe que dice que se hizo. Cada
hallazgo obtiene un propietario, una fecha y una prueba de cierre, y los hallazgos abiertos son una
consulta en vivo, no una hoja de cálculo.

### Red teaming en un cronograma

Programa red teaming por nivel de riesgo, y apúntalo a la configuración desplegada (prompts,
herramientas, corpus de recuperación, guardrails), no solo al modelo. Para un sistema adquirido,
prueba en el límite dentro de las ventanas que permite el contrato. El patrón
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) convierte cada hallazgo en una
prueba de regresión, así que la próxima ejecución programada prueba que la corrección se mantuvo.

### Modelado de amenazas del sistema desplegado

Descompón los flujos de datos (usuario, aplicación, recuperación, modelo, herramientas, consumidores
posteriores), luego enumera amenazas por elemento con una lista de verificación de categoría clásica
como STRIDE, extendida con los ataques específicos de IA que la taxonomía de aprendizaje automático
adversarial de NIST [23], MITRE ATLAS [24] y el OWASP Top 10 para Aplicaciones Agentes [42]
catálogo. El resultado que importa es el mapeo de amenaza a mitigación a la prueba que prueba que la
mitigación funciona:

| Amenaza | Dónde entra | Mitigación | La prueba que lo prueba |
|---|---|---|---|
| Inyección de prompt indirecta | Documentos recuperados, salidas de herramientas | Guardrail de entrada; alcance de herramienta estrecho | Casos de red team con instrucciones plantadas |
| Envenenamiento de recuperación | Ingesta de corpus | Lista de permitidos de fuente; procedencia en el AIBOM | Documentos canario que nunca deben ser recuperados |
| Extracción de modelo | API de inferencia | Límites de velocidad; detección de patrón de consulta | Sonda de extracción contra los límites |
| Inferencia de membresía, inversión | Un modelo ajustado en datos personales | Minimiza datos personales en ajuste; filtrado de salida | Suite de ataque de privacidad en el modelo ajustado |
| Pesos manipulados | Cadena de suministro | [Verificación de hash y firma](/patterns/model-artefact-integrity) | El pipeline falla en una falta de coincidencia de hash |
| Mal uso de herramienta | Acciones de agente | Credenciales limitadas; puerta humana en acciones de alto impacto | Pruebas de alcance y [kill-switch](/patterns/kill-switch-circuit-breaker) |

El [threat bridge](/resources/threats) del sitio alinea estas amenazas con los patrones que las
controlan.

## Uso secundario y daño a terceros

Los sistemas se utilizan para más de lo que fueron aprobados. El Reglamento de IA nombra el
concepto: el **uso indebido razonablemente previsible** es el uso no conforme con la finalidad
prevista, pero que puede resultar de comportamientos humanos razonablemente previsibles o de la
interacción con otros sistemas [2]. Alrededor de él se sitúan la **expansión de funciones** (la
extensión gradual de un sistema a finalidades que nadie aprobó), el **uso dual** (la misma capacidad
sirviendo un propósito dañino), el **daño a terceros** (las salidas alimentando otros sistemas que
actúan sobre ellas), los **bucles de retroalimentación** (las salidas moldeando los datos de los que
aprende la siguiente versión, como cuando una puntuación de riesgo decide a quién se inspecciona y
así decide qué casos se etiquetan) y el **reciclaje sintético** (las salidas generadas reutilizadas
como datos de entrenamiento).

Anticípalos antes del lanzamiento con tres técnicas económicas. Un **premortem**: asume que es un
año después y el sistema causó daño, luego escribe cómo. **Casos de abuso**: historias de mal uso
escritas junto a las historias de usuario, por personas pagadas para pensar como el atacante.
**Mapeo de impacto en partes interesadas**: cada grupo al que llegan las salidas, incluidos los que
nunca tocan la interfaz.

Luego da a las respuestas un hogar, que este capítulo llama un
**[registro de uso a terceros](/patterns/downstream-use-register)**: usos previstos y prohibidos
escritos como una [Policy Card](/patterns/policy-card); cada consumidor de las salidas (sistemas,
equipos, socios) registrado contra la entrada del registro; procedencia y advertencias marcadas en
las salidas para que un consumidor sepa qué está utilizando; y una re-prueba siempre que las salidas
se utilicen en un nuevo contexto. En tiempo de ejecución, el uso fuera de propósito es una señal
como cualquier otra: clasifica el tráfico contra el espacio negativo y alerta sobre lo que cae fuera
de él. Los despliegues orientados al consumidor añaden una pregunta más, si los niños u otras
personas vulnerables utilizarán el sistema, con garantía de edad y la prohibición del artículo 5 de
explotar vulnerabilidades como los controles a considerar [6].

## Comunicaciones externas

Todo sistema desplegado necesita un plan para hablar con personas fuera de la organización, escrito
antes de que sea necesario. El plan nombra un propietario y una única voz, un flujo de trabajo de
aprobación, y una única fuente de verdad: una página de transparencia y una ficha de sistema en
lenguaje llano [generada desde el registro](/patterns/disclosure-notification-pipeline), para que lo
que digas públicamente no pueda divergir de lo que se está ejecutando. Las plantillas se versionan
como código. El NIST AI RMF pide que los incidentes y errores se comuniquen a los actores de IA
relevantes, incluidas las comunidades afectadas [30].

| Audiencia | Proactivo | Disparador reactivo | Reloj | Plantilla |
|---|---|---|---|---|
| Autoridad de vigilancia del mercado | Registro donde sea obligatorio (responsables del despliegue de autoridades públicas) [1] | Razón para considerar que el sistema presenta un riesgo: informar al proveedor o distribuidor y a la autoridad, y suspender el uso [1] | Sin demora indebida | Aviso de riesgo rellenado previamente |
| Proveedor, luego autoridad | Ninguno | Un incidente grave: informar primero al proveedor, luego al importador o distribuidor y a las autoridades [1] | Inmediatamente; los propios relojes de notificación del proveedor siguen (ver [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) | Aviso de incidente grave |
| Autoridad de protección de datos | EIPD donde sea obligatorio | Una violación de la seguridad de los datos personales | En el plazo de 72 horas cuando sea viable [43] | Notificación de violación |
| Usuarios y personas afectadas | Divulgación de IA [5]; notificación a personas sujetas a decisiones del Anexo III [1]; explicación bajo solicitud [7] | Una violación que probablemente cause alto riesgo para ellos [44]; un cambio material; una corrección | Sin demora indebida | Avisos; aviso de corrección |
| Trabajadores y sus representantes | Información antes del uso en el trabajo [1] | Un cambio de alcance | Antes del uso | Paquete informativo |
| Clientes empresariales y socios | Registro de cambios; actualizaciones de ficha de modelo y AIBOM | Un incidente que los afecta; una depreciación | Como el contrato establece | Aviso al cliente |
| Medios y público | Página de transparencia; ficha de sistema | Un incidente con impacto público | Declaración de espera primero, hechos según se confirmen | Declaración de espera; Preguntas y respuestas |

Una **declaración de espera** se prepara en esqueleto antes de cualquier incidente: qué sucedió,
indicado solo en la medida en que se conoce; qué se ha hecho para contenerlo; qué deben hacer las
personas afectadas; y cuándo llegará la próxima actualización. Nunca especula sobre la causa. El
lado del incidente de la comunicación se desarrolla en
[capítulo 17](/bok/incidents#the-response-lifecycle). En la jubilación, el mismo plan envía los
avisos de puesta en marcha. Y mide el plan: si los avisos llegaron a las personas para las que eran,
y qué hizo el volumen de quejas después.

## Desactivación, degradación, localización y jubilación

### Una política de desactivación que alguien pueda ejecutar

Una [política de desactivación](/patterns/deactivation-localisation-retirement-runbook) nombra sus
disparadores, su autoridad de decisión, el registro que deja cada decisión, cómo se preserva la
evidencia y los criterios para un reinicio seguro. Los disparadores vienen en dos tipos.
Disparadores de umbral: un piso incumplido y no recuperado dentro de una ventana establecida, una
brecha de equidad por encima de su límite, una gravedad de incidente. Disparadores legales: el deber
del responsable del despliegue de suspender el uso cuando tiene razón para considerar que el sistema
presenta un riesgo [1]; la acción correctiva de un proveedor para retirar, deshabilitar o recuperar
un sistema no conforme [45]; acción de una autoridad sobre un sistema de IA que presenta un riesgo
para la salud, la seguridad o los derechos fundamentales [46]; y una práctica recientemente
prohibida. El NIST AI RMF pide mecanismos, con responsabilidades asignadas, para reemplazar,
desconectar o desactivar sistemas cuyo desempeño o resultados son inconsistentes con el uso previsto
[30].

La preservación de evidencia viene primero: congela los registros, aplica una retención legal,
captura las versiones. Luego detente. La desactivación se aplica a todo tipo de sistema, no solo
agentes: un clasificador incrustado en un producto de proveedor también necesita un interruptor, ya
sea una bandera de característica o una ruta de respaldo. Para agentes, se aplica el patrón
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker), y
[capítulo 23](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers) lo desarrolla.

### Degradación graduada

Apagar es el último recurso, no el único. Construye los modos intermedios con anticipación como
alternadores operacionales [33], y pruébalos:

| Modo | Qué cambia | Úsalo cuando |
|---|---|---|
| **Solo asesoramiento** | La salida va a una persona; el sistema nunca actúa o decide solo | Duda sobre precisión o equidad; la acción es lo que lleva riesgo |
| **Umbrales elevados** | El sistema se abstiene por debajo de una confianza más alta y se enruta a una persona | Deriva detectada; etiquetas pendientes |
| **Solo fundamentado** | Responde solo con una fuente recuperada; de lo contrario se niega | La tasa de alucinación está aumentando |
| **Alcance desactivado** | Deshabilitado para un grupo, idioma, región o función | Daño concentrado en un segmento |
| **Volver a piloto** | La exposición vuelve a la cohorte piloto | Regresión amplia con una causa desconocida |
| **Apagado** | El proceso de respaldo se hace cargo | Disparador legal; daño grave |

### Localización por jurisdicción

Lanza solo donde se ha demostrado el cumplimiento, y mantén la jurisdicción como una entrada de
política en lugar de un accidente de despliegue: conjuntos de reglas por jurisdicción como código,
instancias regionales donde la residencia las requiere, y banderas de característica por región para
que un mercado pueda apagarse sin tocar los otros. Las obligaciones se superponen en lugares (el
piso de registro de seis meses del Reglamento de IA y la retención de registro de operador de seis
meses en el marco voluntario TC260 de China [1][41]) y divergen en muchos otros; ver
[capítulo 21](/bok/ai-laws-worldwide#comparing-the-regimes) y el
[mapa regulatorio](/bok/regulatory-map#other-jurisdictions).

### Jubilación y desmantelamiento

Diseña la jubilación desde el principio: el DDR ya nombra las condiciones bajo las cuales el sistema
se jubila. Los disparadores incluyen un déficit de beneficio, una depreciación de proveedor, un
reemplazo y un evento legal. El NIST AI RMF advierte que la terminación irregular o indiscriminada
puede aumentar el riesgo [29], por lo que la jubilación es un runbook, no una eliminación:

1. **Análisis de dependencia.** ¿Quién consume las salidas? El
   [registro de uso a terceros](/patterns/downstream-use-register) lo responde.
2. **Respaldo y transición.** Los usuarios se mueven al reemplazo o al proceso manual, con
   capacitación.
3. **Avisos de puesta en marcha.** Los clientes, socios y personas afectadas escuchan antes de la
   fecha, no después.
4. **Captura final de evidencia.** Las fichas, evals, decisiones y registros se archivan según el
   cronograma de retención.
5. **Archivo o eliminación.** Los pesos, corpus y registros se mantienen o se destruyen según la
   licencia, la base legal y la retención decidan.
6. **Revoca identidades y credenciales.** Cada identidad no humana que el sistema tenía se revoca.
7. **Jubila, no elimines, la entrada del registro.** Su estado lee `retired`, con la fecha y el
   registro de decisión.
8. **Confirma que se ha ido.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery) comprueba que
   ninguna copia sigue ejecutándose.

## Un sistema de decisión a jubilación

`csa-01`, el asistente que [capítulo 04](/bok/the-stack#one-system-through-the-five-layers) sigue a
través de las cinco capas, también se ejecuta a través de este capítulo. Los artefactos que deja,
todos ilustrativos:

| Etapa | Artefacto | Capa |
|---|---|---|
| Decidir | `ddr-csa-01-v1`, con su espacio negativo y pisos | 1 · 2 |
| Elegir | Eval de selección en tres candidatos; estimación de energía por 1.000 solicitudes | 3 |
| Contrato | Revisión de cláusula; configuración sin entrenamiento leída semanalmente | 1 · 5 |
| Puesta en marcha | Aprobado con dos condiciones y un disenso | 1 · 5 |
| Despliegue | Sombra, luego canario con reversión preregistrada en fundamentación | 4 |
| Operación | Alerta de deriva de uso en temas de RRHH; cambio de versión de proveedor pasó canario | 4 · 5 |
| Asegurar | Red team trimestral; hallazgos cerrados como pruebas de regresión | 3 · 5 |
| Retirada | Condiciones de jubilación en el DDR; runbook practicado una vez al año | 2 · 4 |

**Correspondencias:** Reglamento de IA Art. 4, 5, 13, 25, 26, 27, 50, 86 · RGPD Art. 33, 34, 35 ·
ISO/IEC 42001 Anexo A.6.2.5, A.6.2.6, A.9, A.10 · NIST AI RMF (GOVERN 1.7, GOVERN 6, MANAGE 2.4,
MANAGE 3, MANAGE 4) · DORA Art. 28 · NIS2 Art. 21 · las cinco capas. Los mapeos son ilustrativos, no
una afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Escribe el DDR para tu sistema en vivo más arriesgado**, retroactivamente si debes, incluido su
   espacio negativo y condiciones de jubilación, y enlázalo desde la entrada del registro.
2. **Comprueba cinco cláusulas en tu contrato de IA más grande**: uso de tus datos para
   entrenamiento, aviso de cambio y depreciación, aviso de incidente, acceso a auditoría y
   evaluación, y salida. Archiva cada brecha como un riesgo.
3. **Pre-registra los criterios de reversión** para tu próximo modelo, prompt o cambio de versión de
   proveedor, y conecta uno de ellos como una comprobación de canario automática.
4. **Compara la retención de registros** en cada sistema de alto riesgo o probable alto riesgo
   contra el piso de seis meses y tu techo de protección de datos.
5. **Construye un modo degradado** (solo asesoramiento o solo fundamentado) detrás de una bandera, y
   prueba que funciona.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per the instructions; 26(2) oversight by competent persons with authority; 26(4) relevant and representative input data; 26(5) monitor, suspend and inform, serious incidents to the provider first; 26(6) logs kept at least six months; 26(7) inform workers; 26(8) public-authority registration; 26(9) DPIA; 26(11) inform affected persons). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 definitions: (3) provider, (4) deployer, (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification. Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[3] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk rules from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27(1) (FRIA before first use by public bodies, private entities providing public services and deployers of Annex III points 5(b) and (c)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency obligations apply from 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(b) (prohibition on exploiting vulnerabilities due to age, disability or a specific social or economic situation; applies to placing on the market, putting into service and use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[7] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86(1) (right to a clear and meaningful explanation from the deployer of the role of an Annex III system in a decision, except point 2 systems). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4 replaced: providers and deployers support AI literacy; Art. 25(2) cooperation extended to technical documentation, known limitations and failure modes and targeted technical access; Art. 25(4) revised; Art. 26 unchanged; Art. 111(4) transitional period for Art. 50(2) marking to 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[9] "A Careful Examination of Large Language Model Performance on Grade School Arithmetic" (GSM1k; accuracy drops of up to 8% against GSM8k; systematic overfitting in several model families) (arXiv 2405.00332). Zhang et al. 2024-05-01. https://arxiv.org/abs/2405.00332 (verified: primary)
[10] "The Leaderboard Illusion" (undisclosed private testing of multiple variants and score retraction on Chatbot Arena) (arXiv 2504.20879). Singh et al. 2025-04-29. https://arxiv.org/abs/2504.20879 (verified: primary)
[11] "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" (multi-purpose generative architectures orders of magnitude more expensive per inference than task-specific systems, controlling for parameters) (arXiv 2311.16863; FAccT '24). Luccioni, Jernite, Strubell. 2023-11-28. https://arxiv.org/abs/2311.16863 (verified: primary)
[12] "Measuring the environmental impact of delivering AI at Google Scale" (median Gemini Apps text prompt 0.24 Wh; boundary includes host energy, idle capacity and data-centre overhead) (arXiv 2508.15734). Elsworth et al., Google. 2025-08-21. https://arxiv.org/abs/2508.15734 (verified: primary)
[13] Energy and AI, executive summary (data-centre electricity 415 TWh in 2024, around 945 TWh by 2030). International Energy Agency. 2025-04. https://www.iea.org/reports/energy-and-ai/executive-summary (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex XI, Section 1, point 2(e) (GPAI technical documentation: known or estimated energy consumption of the model). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (value chain: 25(1)(a) name or trademark, (b) substantial modification, (c) changed intended purpose; 25(2) cooperation of the initial provider; 25(4) written agreement with third-party suppliers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[16] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; content approved 18 Jul 2025; paras. 67 to 68: a modified systemic-risk model is presumed to have systemic risk). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[17] Guidelines on obligations for general-purpose AI providers, FAQ (modifiers become providers only when the modification uses more than one third of the original model's training compute; obligations limited to documenting the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[18] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13(3) (instructions for use: capabilities and limitations of performance; pre-determined changes; human oversight measures; expected lifetime and maintenance measures, including their frequency; log collection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[19] Apache License, Version 2.0 (section 3, grant of patent licence). Apache Software Foundation. 2004-01. https://www.apache.org/licenses/LICENSE-2.0 (verified: primary)
[20] GNU Affero General Public License v3 (section 13, remote network interaction). Free Software Foundation. 2007-11-19. https://www.gnu.org/licenses/agpl-3.0.html (verified: primary)
[21] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that must be adopted by redistributions and derivatives). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[22] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated by reference; "Built with Llama" attribution; "Llama" at the start of distributed derived model names; separate licence above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[23] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[24] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems. MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[25] Directive (EU) 2024/2853 on liability for defective products (software within the definition of product; transposition by 9 Dec 2026; applies to products placed on the market or put into service after that date). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[26] aiSure AI insurance (cover for losses from AI model errors, for AI vendors and corporate adopters). Munich Re. 2026. https://www.munichre.com/en/solutions/for-industry-clients/insure-ai.html (verified: primary)
[27] Updated EU AI model contractual clauses (MCC-AI high-risk and light versions, with commentary; update of the 2023 clauses). Community of Practice on Public Procurement of AI, Public Buyers Community (European Commission). 2025-03-05. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses (verified: primary)
[28] ISO/IEC 42001:2023, Annex A control titles (A.6.2.5 AI system deployment; A.6.2.6 operation and monitoring; A.9 use of AI systems; A.10 third-party and customer relationships), referenced by identifier only. ISO/IEC (titles checked via a secondary listing). 2023. https://www.iso.org/standard/42001 (verified: secondary)
[29] NIST AI RMF Playbook, GOVERN (1.7 decommissioning and phasing out safely; 6.1 third-party risk policies; 6.2 contingency for failures in high-risk third-party systems). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] NIST AI RMF Playbook, MANAGE (2.4 supersede, disengage or deactivate; 3.1 third-party risks monitored; 3.2 pre-trained models monitored; 4.1 post-deployment monitoring plans; 4.3 incidents communicated, including to affected communities). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[31] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[32] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[33] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[34] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[35] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[36] Digital Operational Resilience Act (DORA): in application since 17 Jan 2025; register of information; ICT third-party risk. EIOPA. 2025. https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en (verified: primary)
[37] Regulation (EU) 2022/2554 (DORA), Art. 28(3) register of information on ICT third-party arrangements and Art. 28(8) exit strategies for ICT services supporting critical or important functions. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng#art_28 (verified: primary)
[38] Directive (EU) 2022/2555 (NIS2), Art. 21(2)(c) business continuity, backup management, disaster recovery and crisis management, and (d) supply-chain security. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 19(1) (providers keep automatically generated logs for at least six months). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_19 (verified: primary)
[40] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 18(1) (providers keep documentation for 10 years after placing on the market or putting into service). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[41] AI Safety Governance Framework 3.0, §5.3 operators' guidelines (logs kept for at least six months and audited; voluntary). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[42] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[43] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority without undue delay and, where feasible, within 72 hours). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_33 (verified: primary)
[44] Regulation (EU) 2016/679 (GDPR), Art. 34(1) (communication of a breach likely to result in a high risk to the data subject without undue delay). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_34 (verified: primary)
[45] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 20(1) (providers take corrective action: bring into conformity, withdraw, disable or recall; inform distributors and deployers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_20 (verified: primary)
[46] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 79 (procedure for AI systems presenting a risk to health, safety or fundamental rights). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_79 (verified: primary)
