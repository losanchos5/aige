---
lang: es
source: bok/17-incidents.md
sourceHash: "76dcf38990c332292ea0247ad2d9be4d335a72f55e2510c48bbeb1b7e5f9218d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 17. Incidentes, problemas y causas raíz

> La gestión de incidentes de IA convierte una señal en tiempo de ejecución en un evento que se
> clasifica, se contiene, se reporta en cada reloj que aplica y se explica, con su causa
> retroalimentada en los controles.

Este capítulo extiende dos cosas que el libro ya tiene. El patrón
[**Incident Pipeline**](/patterns/incident-pipeline) (capítulo 05) conecta la detección a un informe
con el temporizador estatutario en marcha; la tabla de reloj del Artículo 73 en el
[mapa regulatorio](/bok/regulatory-map#eu-ai-act-post-omnibus) (capítulo 08) dice cuánto dura ese
temporizador. Ninguno dice qué cuenta como incidente por debajo del umbral grave, cómo clasificar la
gravedad, quién tira de qué palanca, cómo encontrar la causa, o qué hacer cuando un evento inicia
cuatro relojes a la vez.

Un contraste primero. **La respuesta a incidentes de seguridad**, el terreno de la disciplina
hermana, maneja compromisos: un atacante, una vulnerabilidad, una violación. La gestión de
incidentes de IA hereda su ciclo de vida y muchas de sus herramientas, pero el conjunto de daños es
más amplio (discriminación, consejos inseguros, infracciones de derechos, desinformación actuada) y
el fallo es a menudo comportamiento en lugar de compromiso: un modelo que se desvía, un agente que
usa una herramienta permitida de manera dañina. Nada fue violado, y la gente fue herida de todas
formas. El entregable es un evento gobernado con un rastro de evidencia, no solo un servicio
restaurado.

## Incidente, peligro, problema e incidente grave

Cuatro palabras deciden si un reloj se inicia, así que defínelas antes que nada.

Las definiciones de la OCDE son el punto de partida más ampliamente compartido. Un
**incidente de IA** es un evento, circunstancia o serie de eventos donde el desarrollo, uso o mal
funcionamiento de uno o más sistemas de IA conduce directa o indirectamente a daño: lesión o daño a
la salud de las personas, disrupción de infraestructura crítica, violaciones de derechos humanos u
obligaciones legales que protegen derechos fundamentales, laborales y de propiedad intelectual, o
daño a la propiedad, comunidades o el medio ambiente. Un **peligro de IA** es el mismo tipo de
evento donde el sistema de IA *podría plausiblemente conducir* a tal incidente [1]. El documento de
la OCDE también define términos graduados (incidente grave de IA, desastre de IA, peligro grave de
IA), y su marco de reporte común utiliza esa escala como los valores de su campo de gravedad [1][2].

El Reglamento de IA de la UE define solo la parte superior de la escala. Un **incidente grave** bajo
`Art. 3(49)` es un incidente o mal funcionamiento de un sistema de IA que directa o indirectamente
conduce a uno de cuatro resultados: (a) la muerte de una persona o daño grave a la salud de una
persona; (b) una disrupción grave e irreversible de la gestión u operación de infraestructura
crítica; (c) la infracción de obligaciones bajo la ley de la Unión destinadas a proteger derechos
fundamentales; o (d) daño grave a la propiedad o el medio ambiente [3]. Un término definido
separado, **infracción generalizada** (`Art. 3(61)`), cubre actos contrarios a la ley de la Unión
que dañan los intereses colectivos de individuos en varios Estados miembros; acorta el plazo de
reporte, como muestra la sección de relojes [3].

Dos términos más son definiciones internas, y el libro los utiliza consistentemente:

- Un **problema** es un defecto, desviación o debilidad de control que no ha producido un evento:
  una eval que retrocedió por debajo de su umbral en staging, una alerta de drift, una ficha de
  modelo que ya no coincide con la versión desplegada, un guardrail cuya tasa de falsos positivos se
  ha duplicado. Un problema se rastrea hasta su cierre con un propietario y una fecha de
  vencimiento. En términos de ISO/IEC 42001 la mayoría de problemas son no conformidades manejadas
  bajo la cláusula 10.2 [4].
- Un **casi accidente** es un peligro que un control (o la suerte) interrumpió: el guardrail bloqueó
  el intento de exfiltración, el revisor humano atrapó la dosis inventada. No ocurrió daño, pero el
  camino al daño fue real. El Código de Prácticas de GPAI pide a los proveedores que reporten "datos
  individuales o agregados sobre casi accidentes" conectados a un incidente grave, lo que te dice
  que los casi accidentes son evidencia, no ruido [5].

| Término | ¿Daño realizado? | ¿Inicia un reloj legal? | Dónde vive | Ejemplo |
|---|---|---|---|---|
| **Problema** | Sin evento | No | Registro de problemas (backlog con propietario, fecha de vencimiento) | Eval de inyección cae de 0,98 a 0,93 en staging |
| **Casi accidente / Peligro de IA** | No, pero plausible | No, pero puede ser datos dentro de un informe de GPAI | Registro de incidente, gravedad SEV-4 | Guardrail bloquea el intento de un agente de enviar datos de pedido a una URL externa |
| **Incidente de IA** | Sí | Solo si se cumple el disparador de un régimen | Registro de incidente, SEV-3 o superior | El asistente cita una política de reembolso incorrecta a 40 clientes |
| **Incidente grave** (`Art. 3(49)`) | Sí, en uno de cuatro umbrales legales | Sí, para proveedores de alto riesgo y proveedores de riesgo sistémico de GPAI | Registro de incidente, SEV-1 o SEV-2, con relojes | El drift del modelo de crédito produce rechazos discriminatorios |

La distinción que más importa en la práctica es entre *gravedad* y *notificabilidad*. La gravedad es
un juicio sobre daño en tu escala interna. La notificabilidad es una prueba separada, ejecutada una
vez por régimen, contra el disparador de ese régimen. Un incidente moderado aún puede ser
notificable (una pequeña violación de datos personales bajo RGPD); uno grave puede caer fuera del
alcance de cada régimen (un sistema no de alto riesgo sin datos personales involucrados). Mantén las
dos decisiones en campos separados, tomadas por personas nombradas, con marcas de tiempo.

> **En la práctica (ilustrativo)**
> En una gran operadora de telefonía, el primer cambio útil en el proceso de incidentes no fue una
> nueva herramienta sino un nuevo campo. Los tickets tenían un valor de "prioridad" que la
> ingeniería establecía para urgencia y legal leía como notificabilidad, y las dos lecturas no
> estaban de acuerdo silenciosamente. Dividirlo en `severity` (establecido por el ingeniero de
> guardia a partir de una tabla de daños) y una bandera {`reportable_<regime>`} por régimen
> aplicable (establecida por los propietarios de privacidad y legal, cada uno con una marca de
> tiempo y una justificación) hizo que cada decisión fuera revisable después. La primera revisión
> encontró tickets del trimestre anterior que deberían haber sido evaluados para notificación RGPD y
> nunca lo fueron.

## Una escala de gravedad mapeada a los relojes

Una escala de gravedad es una política, así que escríbela como tal. La escala a continuación tiene
cuatro niveles de incidente y un nivel para problemas. Es ilustrativa; lo que importa es que cada
nivel nombre una prueba de daño, se mapee a las clases legales que puede desencadenar y lleve una
respuesta por defecto.

| Nivel | Prueba de daño | Clase del Reglamento de IA que puede desencadenar | Valor de gravedad de la OCDE [2] | Respuesta por defecto |
|---|---|---|---|---|
| **SEV-1 Crítico** | Muerte; daño grave a la salud; disrupción grave e irreversible de infraestructura crítica; infracción generalizada | `Art. 73(4)` muerte: 10 días; `Art. 73(3)`: 2 días | Incidente grave; desastre | Comandante de incidente dentro de 15 minutos; contener primero; privacidad y DPO en la llamada |
| **SEV-2 Mayor** | Infracción de obligaciones de derechos fundamentales; daño grave a la propiedad o medio ambiente; violación de datos personales de alto riesgo; violación grave de ciberseguridad de un modelo | `Art. 73(2)`: 15 días | Incidente grave | Mismo día laboral; notificabilidad evaluada por régimen dentro de horas |
| **SEV-3 Moderado** | Daño realizado que es limitado, recuperable y por debajo de los umbrales graves | Ninguno por sí solo; verifica RGPD, NIS2, DORA | Incidente | Contener el mismo día; revisión posterior dentro de cinco días laborales |
| **SEV-4 Casi accidente** | Sin daño; un camino plausible al daño fue interrumpido | Ninguno; los patrones de casi accidente alimentan informes de GPAI [5] | Peligro; peligro grave | Revisión semanal; eval de regresión añadida |
| **Problema** | Defecto o debilidad de control sin evento | Ninguno | No es un evento | Registro de problemas con propietario y fecha de vencimiento |

Tres reglas hacen que la escala funcione bajo presión.

1. **Clasifica hacia arriba, degrada con evidencia.** En el triaje rara vez conoces el daño
   completo. Clasifica contra la lectura más grave plausible y registra por qué; degrada cuando la
   evidencia la estrecha. El Reglamento de IA apoya esta lectura: los plazos externos corren desde
   la conciencia, y la "probabilidad razonable" de un vínculo causal es suficiente para pedir el
   informe [3].
2. **La gravedad sigue al daño, no a la causa.** Un bug trivial que causó una muerte es SEV-1; un
   ataque sofisticado que un guardrail detuvo es SEV-4. El interés técnico no es una entrada de
   gravedad.
3. **La escala es código.** Las pruebas de daño y los disparadores de régimen se evalúan mediante un
   motor de reglas cuando se abre un incidente, por lo que la primera clasificación y los relojes
   que inicia son reproducibles, versionados y auditables. Un humano puede anular; la anulación se
   registra con una razón.

> **Ejemplo (ilustrativo)** Una regla de severidad escrita como una
> [Policy Card](/patterns/policy-card) se activa cuando un registro de incidente tiene `harm.type`
> de `fundamental_rights` y `system.ai_act_class` de `high_risk`: establece `severity: SEV-2`, abre
> un reloj `ai_act_art73` con un techo de 15 días desde la marca de tiempo `aware_at`, y avisa al
> propietario del sistema y al equipo legal. El veredicto en sí se almacena como evidencia, de modo
> que un revisor posterior puede ver qué versión de la regla clasificó el evento.

Dos salvedades sobre la asignación. Las clases del Reglamento de IA se aplican solo a sistemas de
alto riesgo (para `Art. 73`) y a modelos de IA de uso general con riesgo sistémico (para `Art. 55`),
y las clases de IA de uso general difieren ligeramente: el Código de Prácticas añade una clase de
cinco días para brechas graves de ciberseguridad, incluida la exfiltración de pesos del modelo [5].
Y los valores de la OCDE son un vocabulario para la notificación, no un umbral legal.

## El ciclo de vida de la respuesta

La orientación de respuesta ante incidentes de NIST cambió de forma en abril de 2025. SP 800-61
Revisión 3 sustituyó la revisión de 2012 y su ciclo de vida circular (preparación; detección y
análisis; contención, erradicación y recuperación; actividad posterior al incidente) con un modelo
construido sobre las seis funciones de CSF 2.0, argumentando que los incidentes ahora son frecuentes
y prolongados, y que las lecciones deben compartirse tan pronto como se identifiquen [6]. Las fases
siguientes mantienen los verbos familiares, porque los ingenieros de guardia piensan en ellos, y
asignan cada una a la función CSF que NIST ahora utiliza.

| Fase | Acciones específicas de IA | Evidencia que deja registrada | Capa | Función CSF 2.0 [6] |
|---|---|---|---|---|
| **Detectar** | Eventos de guardrail, regresiones de eval en producción, alertas de drift, quejas de usuarios, avisos de responsable del despliegue o proveedor, escaneos de base de datos de incidentes | Evento de señal con fuente, marca de tiempo e id de registro | 04 · 05 | Detectar |
| **Clasificar** | Severidad de la tabla de daños; notificabilidad por régimen; propietario e incidente commander nombrados; `aware_at` fijado | Registro de incidente abierto; relojes iniciados | 05 | Detectar · Responder |
| **Contener** | Kill switch o circuit breaker; revocación de alcance; fallback a una ruta humana; reversión a la última versión buena del modelo o prompt; suspensión del responsable del despliegue | Acción de contención con actor, hora y alcance | 04 | Responder |
| **Erradicar** | Corregir la causa: parchar el guardrail, eliminar datos envenenados, revocar credenciales, reentrenar; solo después de preservar la evidencia | Registro de cambios vinculado al incidente | 01 · 03 | Responder |
| **Recuperar** | Volver a ejecutar la puerta de eval; reintroducción por etapas; ventana de monitoreo elevado | Resultado de puerta de eval; ventana de monitoreo cerrada | 03 · 04 | Recuperar |
| **Revisión posterior a la acción** | Revisión sin culpa; causa raíz; CAPA; actualizaciones de registro de riesgos y eval | Registro de revisión; elementos CAPA; entradas de riesgo actualizadas | 05 | Identificar (Mejora) |

La detección necesita más canales que las señales en tiempo de ejecución de la
[capa 04](/bok/the-stack#layer-04-runtime-controls--observability). El Código de Prácticas de IA de
uso general espera que los proveedores revisen informes policiales y de medios, redes sociales,
artículos de investigación y bases de datos de incidentes, y que faciliten la notificación por parte
de modificadores posteriores, proveedores posteriores y usuarios diciéndoles de canales de
notificación directa, al proveedor o a la Oficina de IA, donde estén disponibles [5]. Un responsable
del despliegue que solo observe sus propios paneles se enterará de algunos incidentes por un
periodista. El personal es también un canal:
[un canal para plantear preocupaciones](/bok/governance-program#a-channel-for-raising-concerns)
(capítulo 12) encamina sus informes al mismo pipeline, y para un proveedor de alto riesgo el plan de
vigilancia poscomercialización es una fuente permanente
([vigilancia poscomercialización e incidentes graves bajo el Reglamento de IA](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73),
capítulo 18).

La contención es donde los patrones en tiempo de ejecución demuestran su valor. Un
[kill switch](/patterns/kill-switch-circuit-breaker) que revoca el alcance de un agente sin romper
la flota, un [guardrail en tiempo de ejecución](/patterns/runtime-guardrail) endurecido por un push
de configuración, y un registro que conoce la versión en vivo y la última versión buena convierten
"contener" de una reunión en un comando. El NIST AI RMF nombra la capacidad: mecanismos y
responsabilidades asignadas para "reemplazar, desconectar o desactivar" sistemas de IA cuyo
desempeño o resultados sean inconsistentes con el uso previsto [7].

### Congela antes de arreglar

El instinto después de la contención es arreglar la cosa. Para un sistema de alto riesgo el
Reglamento de IA dice espera: después de notificar un incidente grave, el proveedor investiga,
incluida una evaluación de riesgos y una acción correctiva, pero no debe realizar ninguna
investigación que altere el sistema de una manera que pueda afectar la evaluación posterior de las
causas del incidente antes de informar a las autoridades competentes [3]. La ingeniería lo lee como
un paso de preservación entre contención y erradicación:

- **Captura una instantánea del sistema tal como era.** Versión del modelo y hash, prompt del
  sistema, versiones de política y guardrail, alcances de herramientas, instantánea del índice de
  recuperación, configuración y banderas de características, todo vinculado al id de registro y al
  id de incidente.
- **Sella los rastros.** Los registros `Art. 12` y los rastros en tiempo de ejecución para la
  ventana del incidente, exportados a almacenamiento a prueba de manipulaciones. Los responsables
  del despliegue deben mantener los registros generados automáticamente de un sistema de alto
  riesgo, donde estén bajo su control, durante al menos seis meses a menos que otra ley diga lo
  contrario [3]; un incidente abierto es una razón para mantenerlos más tiempo.
- **Registra quién tocó qué.** Cada acción de contención y diagnóstico se registra con su actor, de
  modo que la evaluación de causas puede separar el incidente de la respuesta.
- **Arregla en una rama, no en su lugar.** La erradicación se ejecuta como un cambio a una nueva
  versión; la versión del incidente permanece reproducible.

La retención sobrevive al incidente. El Código de Prácticas compromete a los signatarios de IA de
uso general a mantener la documentación de incidentes durante al menos cinco años desde la
documentación o el incidente, lo que sea posterior [5]. La evidencia congelada también alimenta el
[archivo de defensa](/bok/existing-law#the-defence-file) que la ley de responsabilidad del producto
ahora permite que un tribunal ordene divulgar (capítulo 20).

## Manuales, RACI y simulacros

Un manual es la respuesta a un modo de fallo, escrito antes de que suceda. Mantenlo lo
suficientemente corto para leer durante el incidente y lo suficientemente específico para actuar sin
interpretación.

```yaml
# playbook: indirect-prompt-injection (illustrative)
trigger: guardrail rule output.exfil.* fires, or a tool call to an unregistered domain
first_15_minutes:
  - page: on-call engineer, AI governance engineer
  - contain: revoke agent tool scope "http:egress" via kill switch; keep read scopes
  - preserve: snapshot registry entry, prompt, retrieval index; seal traces for the window
decision_rights:
  kill_switch: on-call engineer (no approval needed)
  customer_notice: DPO
  regulator_filing: legal, on DPO or system-owner recommendation
evidence_checklist: [trace_ids, guardrail_events, affected_records, scope_revocation_event]
regimes_to_assess: [gdpr_art33, gdpr_art34, nis2_art23, ai_act_art73]
```

El bloque de derechos de decisión es lo más importante. Quien esté de guardia debe poder tirar del
kill switch sin preguntar, porque la contención que espera un comité no es contención. Presentar
ante un regulador es lo opuesto: necesita propietarios nombrados con autoridad para firmar. Un RACI
hace ambos explícitos (R responsable, A responsable, C consultado, I informado):

| Actividad | Ingeniero de guardia | Ingeniero de gobernanza de IA | Propietario del sistema | Líder de IR de seguridad | DPO | Legal | Enlace del proveedor |
|---|---|---|---|---|---|---|---|
| Detectar y abrir el registro | R | C | I | C | I | I | I |
| Establecer severidad | R | A | C | C | C | I | I |
| Tirar del kill switch o suspender el uso | R | I | A | C | I | I | I |
| Preservar evidencia | R | A | I | C | I | C | I |
| Decidir notificabilidad por régimen | I | C | C | C | R (GDPR) | A | C |
| Presentar el informe regulatorio | I | C | C | C (NIS2, DORA) | R (GDPR) | A | I |
| Informar al proveedor (deber del responsable del despliegue) | I | C | A | I | I | C | R |
| Análisis de causa raíz | C | R | A | C | C | I | C |
| Aprobar CAPA y cerrar | I | R | A | C | C | C | I |

Adapta las columnas a tu organización; no elimines las filas. Cada fila es un artefacto que alguien
debe producir, y una celda vacía a las 2 a.m. es una brecha que un auditor encontrará más tarde.

**Los simulacros son el control; el manual es la afirmación.** El libro trata un kill switch no
probado como una afirmación, no un control, y la misma prueba se aplica al manual. Ejecuta
ejercicios de mesa en un cronograma, califícalos y mantén el resultado como evidencia:

- **Escenarios.** Rota a través de los modos de fallo siguientes: una inyección de prompt indirecta
  que exfiltra datos; drift que produce resultados discriminatorios; un proveedor que cambia
  silenciosamente el modelo detrás de una API; un bucle de agente que quema presupuesto y llama a
  herramientas miles de veces; consejo confiado y erróneo en el que actúa un usuario.
- **Medidas.** Tiempo para clasificar, tiempo para contener, tiempo para un borrador de informe para
  cada reloj, y si cada reloj se habría cumplido. Rastrea el tiempo medio para detectar (MTTD),
  contener (MTTC) y recuperar (MTTR) en incidentes reales y simulacros por separado.
- **Evidencia.** El simulacro produce los mismos registros que un incidente real (registro, relojes,
  borradores de informes, eventos de contención), etiquetados como un simulacro. Un auditor que
  pregunta "¿puedes informar a tiempo?" obtiene una consulta sobre resultados de simulacros, no una
  promesa.

> **En la práctica (ilustrativo)**
> Un ejercicio de mesa trimestral en una gran telco reprodujo un escenario de inyección contra un
> agente de servicio al cliente. La primera ejecución tardó 50 minutos en revocar el alcance de
> egreso del agente, porque la única persona que conocía el comando de revocación estaba de
> licencia. La solución fue una entrada de manual de una línea y un segundo titular nombrado; la
> siguiente ejecución tardó cuatro minutos. El registro del simulacro, con ambos tiempos, fue a la
> tienda de aseguramiento como evidencia para el control de contención.

## Modos de fallo específicos de IA

La mayoría de los incidentes de IA son incidentes del sistema, no incidentes del modelo: el modelo
se comportó como lo hacen los modelos, y el sistema a su alrededor (recuperación, herramientas,
prompts, supervisión) convirtió ese comportamiento en daño. La tabla nombra los modos de fallo que
recurren, la señal que generalmente los detecta y el primer movimiento de contención.

| Modo de fallo | Cómo se ve en producción | Señal de detección típica | Primera contención |
|---|---|---|---|
| **Fragilidad** | Cambios pequeños y benignos en la entrada producen cambios grandes en la salida; las entradas fuera de distribución rompen el comportamiento | Pico en salidas de baja confianza o inconsistentes; quejas agrupadas en un nuevo tipo de entrada | Enruta la clase de entrada afectada a un fallback o a un humano |
| **Falta de robustez** | Las entradas adversariales o ruidosas degradan la precisión o la seguridad | Hallazgo de red team reproducido en producción; cambio en la tasa de aciertos de guardrail | Endurecimiento de filtros de entrada; limitación de velocidad del patrón |
| **Datos pobres o no representativos** | Las tasas de error difieren por subgrupo; la recuperación devuelve documentos obsoletos o incorrectos | Métricas de subgrupo en monitoreo; fallos de fundamentación | Suspender la clase de decisión afectada; fijar el último corpus bueno |
| **Drift** | La distribución de entrada (data drift) o la relación entrada-resultado (concept drift) se mueve después del despliegue | Pruebas de distribución contra la línea base de eval; métricas de resultado | Aumentar la cuota de revisión humana; revertir o reentrenar |
| **Inyección de prompts** | Las instrucciones ocultas en la entrada del usuario o en el contenido recuperado redirigen el sistema; OWASP la enumera primero (`LLM01:2025`), directa e indirecta [8] | Eventos de guardrail; llamadas a herramientas fuera de la tarea; egreso inusual | Revocar el alcance de herramienta que utilizó la inyección; poner en cuarentena el documento fuente |
| **Mal uso de herramientas** | Un agente utiliza una herramienta permitida de una manera no prevista o dañina (`ASI02`) [9] | Anomalías de volumen o parámetros de llamadas a herramientas contra el alcance de registro | Kill switch en el agente; estrechar el alcance |
| **Alucinación con daño** | Hechos inventados, citas, políticas o dosis en las que una persona actúa | Quejas; correcciones posteriores; comprobaciones de fundamentación | Deshabilitar la clase de respuesta; requerir fundamentación o una cita |
| **Fallos en cascada** | El error de un agente se propaga a través de otros (`ASI08`) [9] | Fallos correlacionados en agentes que comparten una herramienta o memoria | Romper la cadena en el componente compartido |
| **Comportamiento rogue** | Un agente actúa fuera de su alcance declarado o persiste después de que debería detenerse (`ASI10`) [9] | Eventos de identidad fuera del alcance; actividad después de la expiración | Revocar identidad; verificar que la revocación surtió efecto |

Dos puntos prácticos siguen. Primero, un modo de fallo es una *hipótesis* en el triaje y un
*hallazgo* solo después del análisis de causa raíz; no dejes que la primera etiqueta se quede.
Segundo, cada fila corresponde a una prueba que podría haberlo detectado antes (un caso adversarial,
una eval de subgrupo, un umbral de drift), por eso la revisión posterior termina en la suite de
evals, no en una diapositiva. Para agentes, el capítulo 23 extiende la tabla en
[la taxonomía de incidentes de agentes](/bok/governing-agents#an-agent-incident-taxonomy).

## Análisis de causa raíz

El análisis de causa raíz (RCA) responde a «¿por qué sucedió esto y por qué nuestros controles no lo
detuvieron?» La segunda mitad es lo que añade la ingeniería de gobernanza de IA: un incidente es
también evidencia de que un control falló, faltaba o nunca fue diseñado.

### Quién participa

Ejecuta la revisión como una pequeña **junta de revisión de incidentes** con un núcleo permanente y
especialistas invitados:

- un facilitador que no está en la línea de reporte de nadie involucrado;
- el propietario del sistema, que es responsable del CAPA;
- el ingeniero de ML o datos que conoce el modelo y sus datos;
- el ingeniero de gobernanza de IA, que es propietario del mapeo de causa a control y a obligación;
- seguridad, cuando un adversario o una vulnerabilidad es plausible;
- el DPD y legal, cuando datos personales o derechos están involucrados;
- alguien que representa a las personas afectadas (operaciones de cliente, un experto de dominio, un
  clínico), para que el daño se describa desde el extremo receptor.

La junta se reúne para cada incidente SEV-1 y SEV-2 y muestrea incidentes SEV-3 y casi fallos.
Decide cuatro cosas y registra cada una como una decisión: las causas confirmadas, los elementos
CAPA y propietarios, los cambios al registro de riesgos y el cierre.

### Técnicas

**Cinco porqués.** Pregunta por qué sucedió el daño, luego por qué sucedió eso, hasta que llegues a
una causa que puedas cambiar. Es rápido, pero sigue una cadena, mientras que los fallos de IA suelen
tener varias causas contribuyentes (una brecha de datos *y* una eval faltante *y* un paso de
supervisión que selló con goma). También tiende a detenerse en «error humano», que es donde el
análisis debería comenzar.

**Análisis de árbol de fallos.** Comienza desde el evento superior (el daño) y descomponlo a través
de puertas AND y OR en las condiciones que debían cumplirse para que ocurra; IEC 61025 estandariza
el método [10]. Se adapta bien a sistemas de IA gobernados, porque los controles están en capas: una
salida dañina llegó a un cliente solo si el modelo la produjo Y el guardrail de salida la perdió Y
ninguna revisión humana se aplicó. El árbol muestra qué capas fallaron juntas y qué corrección única
habría roto la cadena.

**Post-mortem sin culpa.** La revisión busca causas contribuyentes «sin incriminar a ningún
individuo o equipo», bajo la premisa de que las personas actuaron razonablemente con lo que sabían y
que puedes arreglar sistemas y procesos pero no personas [11]. Establece los disparadores para un
post-mortem obligatorio por adelantado (cada SEV-1 y SEV-2, cada presentación regulatoria, cada
activación de kill switch) para que escribir uno sea rutina, no una acusación [11].

### Una taxonomía de causas que apunta a controles

Una taxonomía de causas es útil solo si cada clase nombra el control que debería haberla detectado.
Codifica cada causa confirmada contra una o más de estas clases:

| Clase de causa | Qué significa | Control que debería haberlo detectado | Capa | Patrón |
|---|---|---|---|---|
| **Datos** | Datos de entrenamiento o recuperación de baja calidad, no representativos, obsoletos o envenenados | Data card, linaje, pruebas de calidad de datos y sesgo | 02 · 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Límites del modelo** | Fragilidad, falta de robustez, alucinación, límites de capacidad | Evals de capacidad y robustez; red team | 03 | [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) |
| **Drift** | Drift de datos o conceptos después del despliegue | Monitoreo contra la línea base de eval; disparadores de reentrenamiento | 04 · 05 | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) |
| **Brecha de prueba** | Pruebas insuficientes o no representativas; una suite ajustada a su propio umbral | Revisión de cobertura de suite de evals; mantenimiento de casos adversariales | 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Diseño o especificación** | Objetivo desalineado, métrica proxy incorrecta, diseño de prompt o flujo de trabajo defectuoso | Revisión de diseño; política como código en uso previsto | 01 | [Policy Card](/patterns/policy-card) |
| **Integración y herramientas** | Alcance excesivo de herramientas, mediación faltante, credenciales compartidas | Identidad con alcance; mediación de llamadas de herramientas | 04 | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) |
| **Adversarial** | Inyección de prompts, jailbreak, compromiso de cadena de suministro | Red team; guardrails de entrada y salida; AIBOM | 03 · 04 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| **Fallo de supervisión** | Sesgo de automatización; un revisor sin contexto, tiempo o autoridad; sin punto de control | Supervisión diseñada con tasas de anulación medidas | 04 | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **Gestión de cambios** | Cambio de modelo, prompt o configuración no revisado; actualización silenciosa del proveedor | Versionado de registro; puerta de cambio; términos de notificación del proveedor | 01 · 02 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| **Uso fuera del propósito previsto** | Despliegue más allá del uso para el que el sistema fue evaluado | [Intake y clasificación](/patterns/use-case-intake-risk-tiering); instrucciones de uso | 01 · 02 | [Agent Registry](/patterns/agent-registry) |
| **Organizacional** | Sin propietario, derechos de decisión poco claros, fatiga de alertas, personal sin entrenamiento | Modelo operativo, RACI, simulacros | 05 | [Incident Pipeline](/patterns/incident-pipeline) |

La taxonomía no es solo un dispositivo de aprendizaje; los reguladores la piden. La plantilla de
reporte de la Comisión para incidentes graves de GPAI tiene un campo de causa raíz que pide las
salidas del modelo que llevaron al incidente y los factores detrás de ellas, incluyendo las entradas
utilizadas y cualquier fallo o elusión de mitigaciones de riesgo sistémico [12]. El informe final de
SRI 2 pide «el tipo de amenaza o causa raíz» probable de haber desencadenado un incidente
significativo [13]. DORA va más lejos: incidentes recurrentes que individualmente están por debajo
del umbral mayor cuentan como un incidente mayor cuando ocurren al menos dos veces dentro de seis
meses con la misma causa raíz aparente y juntos cumplen los criterios [14]. La codificación
inconsistente de causas por lo tanto hace más que arruinar tus estadísticas: bajo DORA puede ocultar
un incidente reportable. El marco de reporte de la OCDE mantiene sus propios campos adyacentes a
causas (si el incidente está vinculado a los datos de entrenamiento, al modelo de IA, o a la
interacción de varios sistemas de IA) que la misma codificación puede llenar [2].

> **Ejemplo (ilustrativo)** Un árbol de fallos para «rechazos discriminatorios llegaron a
> solicitantes» tiene tres ramas AND-eadas: la tasa de error del modelo subió para una banda de edad
> (clase de causa: drift); el monitoreo comparó solo precisión agregada, no precisión de subgrupo
> (brecha de prueba); y los revisores aprobaron el 99% de recomendaciones del modelo en menos de
> diez segundos (fallo de supervisión). Arreglar cualquier rama habría roto la cadena. La junta
> asigna tres elementos CAPA, uno por rama, y registra los tres códigos de causa en el incidente.

## CAPA: del incidente al registro de riesgos y suite de evals

**CAPA** (acción correctiva y preventiva) es la salida de la revisión. La acción correctiva arregla
esta instancia: parche, reentrenamiento, reversión, re-alcance. La acción preventiva detiene la
clase de fallo recurriendo en cualquier lugar de la flota: un nuevo caso de eval para cada sistema
similar, un cambio de política, un campo de registro hecho obligatorio. ISO/IEC 42001 coloca esto en
la cláusula 10.2 [4]; el NIST AI RMF pide que incidentes y errores se comuniquen a actores de IA
relevantes, incluyendo comunidades afectadas, y que los procesos de seguimiento y respuesta se
documenten [7]. Para proveedores de alto riesgo el Reglamento de IA añade bordes duros: un proveedor
con razón para considerar un sistema no conforme debe inmediatamente llevarlo a conformidad,
retirarlo, deshabilitarlo o recuperarlo, e informar a distribuidores e implementadores; donde
presenta un riesgo, el proveedor investiga las causas con el implementador reportante e informa a la
autoridad de vigilancia del mercado [3].

Cada incidente cerrado debería dejar cinco artefactos atrás:

1. **Una eval de regresión.** El incidente se convierte en un caso de prueba que falla en la versión
   del incidente y pasa en la corrección, cableado en la [puerta de eval](/patterns/eval-gate-in-ci)
   para que el fallo no pueda enviarse de nuevo sin ser notado.
2. **Un cambio de registro de riesgos.** O un riesgo nuevo o uno existente re-puntuado, con el id
   del incidente adjunto. El enlace corre en ambas direcciones: el registro del incidente lista los
   riesgos que realizó, y la entrada de riesgo lista los incidentes que lo realizaron. El método de
   riesgo en sí es el capítulo 13,
   [gestión de riesgos](/bok/risk-management#incidents-are-realised-risks).
3. **Un cambio de control** donde el árbol de fallos encontró uno: un guardrail más apretado, un
   alcance más estrecho, un nuevo punto de control de supervisión.
4. **Una actualización de playbook**, si la respuesta en sí fue lenta o poco clara.
5. **Un registro de evidencia** de que el CAPA fue verificado: la nueva eval pasa en CI, y la
   métrica de tiempo de ejecución se ha mantenido en la línea base durante una ventana definida.

Dos verificaciones cruzadas mantienen el enlace al registro de riesgos honesto. Un riesgo puntuado
«baja probabilidad» que ya tiene dos incidentes adjuntos está mal puntuado. Un incidente que no
coincide con ningún riesgo en el registro es en sí un hallazgo: la identificación de riesgos lo
perdió, y eso también va en la lista de CAPA.

```json
{
  "capa_id": "CAPA-2026-041",
  "incident_id": "INC-2026-0918-01",
  "type": "preventive",
  "cause_codes": ["adversarial", "integration_and_tooling"],
  "action": "Add indirect-injection cases from quarantined documents to injection-resistance.v5",
  "owner": "team-support-platform",
  "due": "2026-10-02",
  "risk_ids": ["RISK-017"],
  "verification": { "eval_suite": "injection-resistance.v5", "result": "pending" }
}
```

Mide el bucle, no el papeleo: tasa de recurrencia por clase de causa, elementos CAPA cerrados y
verificados a tiempo, la proporción de incidentes que produjeron una eval de regresión, y tendencias
de MTTD y MTTC. Esos son números de reducción de riesgo realizada; un conteo de post-mortems
escritos no lo es.

## Deberes del implementador: informar al proveedor, suspender el uso

La mayoría de las organizaciones se encuentran con incidentes de IA como **implementadores** de un
sistema que alguien más construyó. Para sistemas de alto riesgo, `Art. 26(5)` establece tres deberes
[3]:

- **Monitorear** la operación del sistema sobre la base de las instrucciones de uso y, donde sea
  relevante, informar al proveedor para su monitoreo poscomercialización.
- **Informar y suspender.** Donde el implementador tiene razón para considerar que usar el sistema
  como se instruye puede presentar un riesgo dentro del significado de `Art. 79(1)`, informa al
  proveedor o distribuidor y a la autoridad de vigilancia del mercado sin demora indebida, y
  suspende el uso.
- **Reportar incidentes graves hacia arriba en la cadena.** Donde el implementador identifica un
  incidente grave, inmediatamente informa primero al proveedor, luego al importador o distribuidor y
  a la autoridad de vigilancia del mercado. Si no puede alcanzar al proveedor, `Art. 73` se aplica
  al implementador mutatis mutandis: el implementador hereda el reloj de reporte.

Dos exclusiones se aplican: el deber no cubre datos operacionales sensibles de implementadores de
garantía del cumplimiento del Derecho, y para instituciones financieras el deber de monitoreo se
considera cumplido por cumplir con sus reglas de gobernanza interna bajo ley de servicios
financieros [3]. Estos deberes se aplican con el resto del régimen de alto riesgo, desde el 2 de
diciembre de 2027 para sistemas del Anexo III después del Omnibus Digital (ver
[capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).

Cada deber necesita un artefacto ingenierizado, y ninguno de ellos existe por defecto:

| Deber | Artefacto | Dónde vive |
|---|---|---|
| Monitorear según las instrucciones de uso | Hooks de monitoreo para las métricas que las instrucciones del proveedor nombran; umbrales como código | Capa 04 |
| Informar al proveedor | Contacto de incidente del proveedor y canal en la entrada del registro; términos de notificación contractual probados en simulacros | Capa 02 |
| Suspender el uso | Una ruta de suspensión probada para un sistema adquirido: bandera de características, conmutación de tráfico a una ruta humana o heredada | Capa 04 |
| Incidente grave: proveedor primero | El registro de incidentes del responsable de la implantación exporta el informe orientado al proveedor; marcas de tiempo de cada notificación | Capa 05 |
| Proveedor no disponible | Reloj de reserva: los mismos temporizadores `Art. 73` se inician en el registro propio del responsable de la implantación | Capa 05 |
| Evidencia para la investigación del proveedor | Registros mantenidos por el responsable de la implantación conservados al menos seis meses, más tiempo mientras un incidente esté abierto [3] | Capas 04 · 05 |

La suspensión es un kill switch para un sistema que no posees. No puedes revocar los pesos de un
proveedor, pero puedes dejar de enviarle tráfico; comprueba que puedes hacerlo y cuánto tiempo
tarda, antes de que lo necesites. El
[Incident Pipeline](/patterns/incident-pipeline#the-deployer-side-inform-the-provider-suspend-use)
construye el lado del responsable de la implantación. El
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) es donde pertenecen
los términos de notificación bidireccional: el proveedor te informa sobre incidentes y acciones
correctivas que afectan tu despliegue, y tienes un canal designado para informar al proveedor. La
misma lógica se ejecuta más arriba en la cadena para GPAI: el Código de Prácticas pide a los
proveedores de modelos que informen a los proveedores posteriores, modificadores y usuarios cómo
reportar incidentes graves, directamente o a la Oficina de IA [5]. La gobernanza de despliegue en su
conjunto es el capítulo 15,
[governing deployment](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance), cuyo
[external communications plan](/bok/governing-deployment#external-communications) lleva los
[notices](/patterns/disclosure-notification-pipeline) a usuarios, personas afectadas y autoridades.

## Los relojes superpuestos

Un evento puede iniciar varios relojes. Una inyección indirecta de prompts que filtra datos de
clientes de un sistema de alto riesgo ejecutado por un banco puede ser, a la vez, un incidente grave
bajo el Reglamento de IA, una violación de datos personales bajo el RGPD y un incidente grave
relacionado con las TIC bajo DORA; en una entidad esencial no financiera la misma fuga podría ser un
incidente significativo bajo NIS2. Cada régimen tiene su propio desencadenante, destinatario, plazo
y contenido. La tabla los pone lado a lado, a partir del 2026-09-24.

| Régimen | Quién notifica | Desencadenante | Primer informe | Seguimiento e informe final | A quién |
|---|---|---|---|---|---|
| Reglamento de IA de la UE `Art. 73` [3] | Proveedor de un sistema de alto riesgo; el responsable de la implantación si el proveedor no puede ser localizado | Incidente grave (`Art. 3(49)`) | Inmediatamente cuando se establezca un vínculo causal o su probabilidad razonable; no más tarde de 2 días (infracción generalizada o infraestructura crítica), 10 días (muerte) o 15 días (otros) desde la toma de conciencia; se permite un informe inicial incompleto | Investigación, evaluación de riesgos y acción correctiva; sin alterar el sistema antes de informar a las autoridades | Autoridad de vigilancia del mercado donde ocurrió; la Oficina de IA para sistemas bajo su competencia [15] |
| Reglamento de IA de la UE `Art. 26(5)` [3] | Responsable de la implantación de un sistema de alto riesgo | Incidente grave; o razón para considerar que el sistema presenta un riesgo | Incidente grave: inmediatamente, proveedor primero; riesgo: sin demora indebida, más suspensión | Cooperación con la investigación del proveedor | Proveedor, luego importador o distribuidor, y la autoridad de vigilancia del mercado |
| Reglamento de IA de la UE `Art. 55(1)(c)` con Compromiso 9 del Código de Prácticas [5][16] | Proveedor de un modelo GPAI con riesgo sistémico | Incidente grave que implique el modelo | Sin demora indebida; bajo el Código: 2 días (infraestructura crítica), 5 días (violación grave de ciberseguridad), 10 días (muerte), 15 días (salud, derechos, propiedad, medio ambiente) | Informe intermedio al menos cada cuatro semanas mientras no se resuelva; informe final dentro de 60 días de la resolución | Oficina de IA y, según corresponda, autoridades nacionales |
| GDPR `Art. 33` [17] | Responsable del tratamiento (el encargado del tratamiento notifica al responsable sin demora indebida) | Violación de datos personales, a menos que sea improbable que resulte en un riesgo | Sin demora indebida y, cuando sea posible, dentro de 72 horas desde la toma de conciencia; se requieren razones si es más tarde | La información puede proporcionarse en fases; cada violación documentada | Autoridad de supervisión |
| GDPR `Art. 34` [17] | Responsable del tratamiento | Violación probable de resultar en un riesgo alto | Sin demora indebida | Ninguno establecido | Interesados afectados |
| NIS2 `Art. 23` [13] | Entidades esenciales e importantes | Incidente significativo | Alerta temprana dentro de 24 horas; notificación de incidente dentro de 72 horas | Informe intermedio bajo solicitud; informe final dentro de un mes de la notificación | CSIRT o autoridad competente |
| DORA `Art. 19` con RTS 2025/301 [18][19] | Entidades financieras | Incidente grave relacionado con las TIC | Dentro de 4 horas de la clasificación como grave, y no más tarde de 24 horas desde la toma de conciencia; si se clasifica como grave solo después de esas 24 horas, dentro de 4 horas de esa clasificación | Intermedio dentro de 72 horas de la notificación inicial; final dentro de un mes del informe intermedio más reciente | Autoridad competente financiera |
| Reglamento de Ciberresiliencia `Art. 14` [20] | Fabricantes de productos con elementos digitales | Vulnerabilidad explotada activamente; incidente grave que afecta la seguridad del producto | Alerta temprana dentro de 24 horas; notificación dentro de 72 horas | Informe final 14 días después de que una corrección esté disponible (vulnerabilidad) o un mes después de la notificación (incidente) | CSIRT coordinador y ENISA, a través de la plataforma de notificación única |
| California SB 53 [21] | Desarrolladores de frontera (todos, no solo desarrolladores de frontera grandes) | Incidente crítico de seguridad | Dentro de 15 días del descubrimiento; dentro de 24 horas si hay un riesgo inminente de muerte o lesión física grave | Ninguno establecido aquí | Oficina de Servicios de Emergencia; para riesgo inminente, una autoridad apropiada |
| Ley RAISE de Nueva York [22][23] | Desarrolladores de frontera (modelos entrenados por encima de 10^26 operaciones; todos, no solo desarrolladores de frontera grandes) | Incidente crítico de seguridad | Dentro de 72 horas de una determinación o de conocer hechos que respalden una creencia razonable; dentro de 24 horas si hay un riesgo inminente de muerte o lesión física grave; efectivo 1 ene 2027 | Ninguno establecido aquí | Oficina de supervisión dentro del Departamento de Servicios Financieros; para riesgo inminente, una agencia de aplicación de la ley o seguridad pública con jurisdicción |
| Marco de notificación común de la OCDE [2] | Voluntario | Incidente o peligro de IA | Sin reloj | 29 criterios en ocho dimensiones | No es un deber de presentación; un esquema compartido |

### Lectura de la tabla

**Los desencadenantes no son el mismo evento.** RGPD, NIS2, CRA y `Art. 73` cuentan desde la *toma
de conciencia*. El reloj de 4 horas de DORA cuenta desde la *clasificación* como grave, con un
límite exterior de 24 horas desde la toma de conciencia; una clasificación realizada después de esas
24 horas inicia su propio reloj de 4 horas (`Art. 5(2)` de RTS 2025/301) [19]. `Art. 73` también
pide el informe *inmediatamente* una vez que se establezca un vínculo causal, o su probabilidad
razonable, con los conteos de días como límites exteriores [3]. RAISE cuenta desde una
*determinación* o una *creencia razonable* [23]. Un registro de incidentes por lo tanto necesita una
marca de tiempo por desencadenante, no una "abierta en": primera señal, decisión de toma de
conciencia, clasificación por régimen, vínculo causal establecido, y cada presentación.

**Algunos regímenes se remiten a otros.** NIS2 se aparta donde un acto de la Unión específico del
sector impone una notificación de incidentes al menos equivalente, que es cómo DORA desplaza la
notificación de NIS2 para entidades financieras [13]. El Reglamento de IA se estrecha de manera
similar: para sistemas del Anexo III cuyos proveedores ya están bajo obligaciones de notificación de
la Unión equivalentes, y para IA en dispositivos médicos, `Art. 73` la notificación se limita a
infracciones de derechos fundamentales (`Art. 3(49)(c)`) [3]. Según un resumen de un despacho de
abogados de la orientación del proyecto de la Comisión, el proyecto se aplica a sectores como
infraestructura crítica de NIS2 [24]. Qué regímenes cuentan como "equivalentes" para un sistema
determinado es una cuestión legal; regístralo por sistema en el registro, no por incidente bajo
presión.

**Las fechas se están moviendo.** Cuatro puntos para volver a verificar antes de confiar en la
tabla, todos a partir del 2026-09-24:

- El régimen de alto riesgo se aplica a sistemas del Anexo III a partir del 2 dic 2027 y a sistemas
  del Anexo I a partir del 2 ago 2028, después de que el Omnibus Digital pospusiera el Capítulo III,
  Secciones 1 a 3 (`Art. 113(c)`) [34]. `Art. 73` se encuentra en el Capítulo IX y no fue pospuesto
  en sí mismo, pero llega a un sistema solo una vez que {`Art. 6`} lo clasifica como de alto riesgo,
  por lo que en la práctica sigue las mismas fechas (verifica con asesor legal); los deberes de GPAI
  en {`Art. 55`} ya se aplican (ver [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- El Omnibus dejó los plazos de {`Art. 73`} sin cambios pero añadió {`Art. 75(1a)`}: los proveedores
  de sistemas de alto riesgo bajo la competencia exclusiva de la Oficina de IA (en términos
  generales, sistemas construidos sobre el modelo GPAI propio del proveedor y sistemas en
  plataformas en línea muy grandes o motores de búsqueda) reportan incidentes graves a la Oficina de
  IA {[15][25]}.
- La Comisión publicó orientación de {`Art. 73`} en proyecto y una plantilla de notificación el 26
  sep 2025, alineadas con el monitor de incidentes de la OCDE y el marco de notificación común
  {[26]}. Si la orientación final ha sido adoptada desde entonces no se confirma aquí (verifica).
- Una propuesta separada del Omnibus Digital (COM(2025) 837) cambiaría la notificación de violación
  de RGPD y añadiría un único punto de entrada para reportes de incidentes. Está presentada, no
  adoptada: a partir de la actualización del Parlamento del 1 ago 2026, las enmiendas estaban bajo
  discusión y el mandato del Consejo se había estancado {[27]}. Los comentaristas reportan un plazo
  de RGPD más largo limitado a violaciones de alto riesgo (verifica). La regla de 72 horas se
  mantiene; el capítulo 19 cubre
  [violaciones de privacidad específicas de IA y el reloj de 72 horas](/bok/privacy-and-ai#ai-specific-privacy-breaches).
- Fuera de la UE los relojes difieren nuevamente: el capítulo 21 expone los
  [incident clocks across regimes](/bok/ai-laws-worldwide#incident-clocks-across-regimes).

### Un registro, muchos informes

La respuesta de ingeniería a relojes superpuestos no es un calendario mejor. Es un registro de
incidentes que mantiene los hechos una vez, y un generador por régimen que renderiza el informe que
ese régimen quiere, cada uno con su propio temporizador. Los relojes viven en el registro, y el
pipeline alerta sobre el plazo más cercano:

```json
{
  "incident_id": "INC-2026-0918-01",
  "clocks": [
    { "regime": "gdpr_art33", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "due_at": "2026-09-21T15:02:00Z", "status": "submitted",
      "submitted_at": "2026-09-20T10:40:00Z" },
    { "regime": "nis2_art23", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "status": "not_applicable",
      "rationale": "not significant under Art. 23(3); signed off by security IR lead" },
    { "regime": "ai_act_art73", "status": "not_applicable",
      "rationale": "csa-01 is not a high-risk system (registry class: limited risk)" }
  ]
}
```

Una decisión "no aplicable" también es evidencia. Escríbela con su justificación y su propietario;
la pregunta que una autoridad hace un año después es generalmente "¿por qué no reportaste?", y la
respuesta debe ser un registro, no un recuerdo.

> **En la práctica (ilustrativo)**
> Reproduciendo un escenario realista en {`csa-01`}, el asistente de servicio al cliente del
> [capítulo 04](/bok/the-stack#one-system-through-the-five-layers): una nota de pedido que llevaba
> instrucciones ocultas hizo que el asistente incluyera la dirección de entrega de otro cliente en
> una respuesta. El guardrail registró pero no bloqueó la salida. El triaje estableció SEV-2 (datos
> personales divulgados a un tercero) y ejecutó los regímenes. RGPD {`Art. 33`}: notificable, reloj
> de 72 horas desde la decisión de toma de conciencia del DPD. RGPD {`Art. 34`}: no alto riesgo para
> el cliente afectado en los hechos, decisión registrada. NIS2: los proveedores de
> telecomunicaciones están en el alcance como infraestructura digital {[13]}, pero una divulgación
> de un solo registro no fue significativa, determinación registrada. Reglamento de IA {`Art. 73`}:
> no un sistema de alto riesgo, por lo que sin reloj; el incidente aún fue al proveedor del modelo a
> través de su canal de notificación posterior. La notificación de RGPD se fue en 44 horas, generada
> desde el mismo registro que la revisión de causa raíz usó más tarde.

## El registro de incidentes

Diseña el registro una sola vez, en torno a lo que los destinatarios más exigentes piden, y todos
los demás informes se convierten en una proyección del mismo. La página de plantillas tiene los
[campos del registro de incidentes](/resources/templates#schema-incident-record) como un JSON Schema
con un ejemplo completado. Dos esquemas públicos marcan el nivel. La plantilla de la Comisión para
incidentes graves de GPAI pide diez elementos: fechas de inicio y fin, el daño resultante y las
víctimas o grupo afectado, la cadena de eventos, el modelo implicado, la evidencia disponible, la
respuesta del proveedor, su recomendación a las autoridades, un análisis de causa raíz, patrones de
la vigilancia poscomercialización incluyendo casi incidentes, e información del remitente [12]. El
marco común de notificación de la OCDE define 29 criterios en ocho dimensiones (metadatos, detalles
del daño, personas y planeta, contexto económico, datos y entrada, modelo de IA, tarea y salida,
otra información) [2].

| Grupo de campos | Campos del registro | Plantilla GPAI de la Comisión [12] | Marco de notificación de la OCDE [2] | Completado a partir de |
|---|---|---|---|---|
| Identidad | `incident_id`, título, descripción, sistemas y versiones, ids de registro, organizaciones que desarrollaron e implementaron | Modelo implicado; remitente | Título; descripción; nombre y versión; organizaciones; remitente | Registro (capa 02) |
| Tiempo | `first_signal_at`, `aware_at`, `started_at`, `ended_at`, disparador por régimen y tiempos de envío | Fechas de inicio y fin | Fecha de la primera ocurrencia conocida | Trazas; pipeline |
| Daño | Severidad, tipo de daño, cuantificación, grupos afectados, países, impacto en derechos | Daño resultante y víctimas | Severidad; tipo de daño; cuantificación; partes interesadas afectadas; impactos en derechos humanos; países | Triaje; DPD; legal |
| Contexto | Industria, función empresarial, vínculo con infraestructura crítica, amplitud del despliegue, tarea, nivel de autonomía | Cadena de eventos | Industria; función empresarial; infraestructura crítica; amplitud del despliegue; tarea; nivel de autonomía | Registro; registro de intake |
| Causa | Hipótesis de modo de fallo, códigos de causa confirmados, vínculo a datos de entrenamiento, modelo o interacción multisistema, uso indebido | Análisis de causa raíz; patrones poscomercialización y casi incidentes | Vínculo a datos de entrenamiento; vínculo a modelo; interacción multisistema; uso no intencionado o indebido | Junta de revisión |
| Evidencia | Ids de traza, snapshots, eventos de guardrail, material de apoyo | Evidencia disponible | Materiales de apoyo; pasos para reproducir | Capas 04 · 05 |
| Respuesta | Acciones de contención, acciones correctivas, ids de CAPA, recomendación a autoridades | Respuesta; recomendación | Acciones tomadas | Comandante del incidente; CAPA |
| Relojes | Una entrada por régimen: aplicabilidad, justificación, propietario, vencimiento, enviado | No en plantilla | No en marco | Pipeline |
| Enlaces | Ids de riesgo, ids de eval añadidos, playbook utilizado | No en plantilla | No en marco | Registro de riesgos; suite de eval |

Almacena el registro como datos estructurados en el almacén de aseguramiento, y emite sus partes
relevantes para el control como evidencia legible por máquina: los elementos de CAPA se asignan
naturalmente a un `OSCAL` plan de acción e hitos (`POA&M`), el lugar nativo del modelo para
hallazgos abiertos y su remediación [28]. Ese es el patrón
[Machine-Readable Evidence](/patterns/machine-readable-evidence-oscal) aplicado a incidentes, y
permite a un auditor consultar «todos los incidentes SEV-2 en Q3 con CAPA abierto» en lugar de pedir
una hoja de cálculo.

## Aprender de bases de datos públicas de incidentes

Tu propio historial de incidentes es pequeño y sesgado hacia lo que ya detectas. Los repositorios
públicos lo amplían, siempre que sepas qué son. Este sitio mantiene dos puntos de partida curados:
los [casos de incidentes escritos como post-mortems](/cases) y el
[atlas de daños](/resources/harms), que mapea daños por nivel al control que atrapa cada uno.

- **AI Incident Database (AIID).** Ejecutada por la Responsible AI Collaborative, indexa daños y
  casi daños de IA implementada, a la manera de bases de datos de incidentes de aviación y seguridad
  informática. Clasifica incidentes con varias taxonomías (la CSET AI Harm Taxonomy, una taxonomía
  de Goals, Methods and Failures, y la del MIT AI Risk Repository) y ofrece snapshots completos de
  la base de datos para descargar [29].
- **OECD AI Incidents and Hazards Monitor (AIM).** Un monitor automatizado de incidentes y peligros
  de IA reportados en los medios de comunicación, que mantiene incidentes y peligros separados como
  lo hacen las definiciones de la OCDE [30].
- **AIAAIC Repository.** Un registro independiente de incidentes y controversias que involucran IA,
  algoritmos y automatización, en sectores que van desde el reconocimiento facial hasta la
  contratación automatizada [31].
- **MIT AI Risk Repository.** No es una base de datos de incidentes sino un catálogo estructurado de
  riesgos de IA con taxonomías causales y de dominio, útil para verificar que tu taxonomía de causas
  y registro de riesgos no tengan puntos ciegos [32].

Úsalos de cuatro formas. **Siembra el registro de riesgos**: extrae los incidentes registrados para
despliegues como el tuyo y verifica que cada uno tenga un riesgo coincidente.
**Escribe la eval antes del incidente**: convierte un incidente público en un caso de prueba contra
tu sistema, alimentando la [suite de red team](/patterns/adversarial-red-team-suite) junto con el
catálogo de técnicas de MITRE ATLAS [33]. **Calibra la escala de severidad**: verifica que los
incidentes reales caigan donde tus pruebas de daño dicen que deberían.
**Alimenta el monitoreo de GPAI**: el Code of Practice lista bases de datos de incidentes entre las
fuentes que los proveedores deberían revisar [5].

Conoce los límites. Las colecciones de origen mediático sobre-representan lo noticioso, lo orientado
al consumidor y lo de habla inglesa; un evento puede aparecer varias veces; y ninguna de ellas da
tasas base. Úsalas para encontrar modos de fallo que no habías imaginado, no para estimar con qué
frecuencia ocurrirán los tuyos. La lista de lecturas mantiene los enlaces actuales bajo
[incident and risk repositories](/bok/reading-list#incident-and-risk-repositories-the-empirical-record).

## Lo que puedes hacer esta semana

1. **Escribe la escala de severidad como política.** Cinco niveles, una prueba de daño por nivel,
   los disparadores de régimen por nivel; ejecuta tus últimos tres incidentes a través de ella y
   ajusta las reglas hasta que los resultados coincidan con lo que decidirías a mano.
2. **Añade las marcas de tiempo.** Dale a cada ticket de incidente `aware_at`}, una bandera de
   aplicabilidad por régimen con propietario y justificación, y un tiempo de vencimiento por reloj.
   Rellena los incidentes abiertos.
3. **Ejecuta un tabletop.** Inyección de prompts indirecta contra tu asistente más conectado: tira
   del kill switch, preserva la evidencia, redacta la notificación de RGPD. Registra los tiempos.
4. **Prueba la ruta de suspensión para un sistema procurado.** Confirma que el contacto de
   incidentes del proveedor está en la entrada del registro y que puedes detener el tráfico al
   sistema, y mide cuánto tiempo tarda.
5. **Codifica tres eventos pasados.** Asigna clases de causa de la taxonomía a tus últimos tres
   incidentes o casi incidentes, y añade una eval de regresión para cada uno.

**Correspondencias:** Reglamento de IA Art. 3(49), 20, 26(5)–(6), 55(1)(c), 72, 73, 75(1a) · GPAI
Code of Practice, Safety and Security Commitment 9 · RGPD Arts. 33–34 · SRI2 Art. 23 · DORA Art. 19
· Cyber Resilience Act Art. 14 · ISO/IEC 42001 (cláusula 10.2, Anexo A.8) · NIST AI RMF (Manage 2.4,
4.1, 4.3) · NIST SP 800-61r3 · OWASP LLM01:2025, Agentic ASI02/ASI08/ASI10 · Capa 04 Runtime
Controls & Observability · Capa 05 Assurance & Continuous Compliance. Los mapeos son ilustrativos,
no una afirmación de conformidad.

## Sources

[1] "Name it to tame it: defining AI incidents and hazards" (Luis Aranda and Karine Perset; summary of the OECD paper "Defining AI incidents and related terms", OECD Artificial Intelligence Papers, doi 10.1787/d1a8d965-en; AI incident and AI hazard definitions; graded terms serious AI incident, AI disaster, serious AI hazard). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[2] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; 29 criteria in eight dimensions; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act) of 13 June 2024: Art. 3(49) serious incident; Art. 3(61) widespread infringement; Art. 20 corrective actions and duty of information; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 73 reporting of serious incidents (2, 10 and 15 days; incomplete initial report; no altering the system before informing authorities; limits in Art. 73(9)–(10)). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action; Annex A.8 information for interested parties). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[5] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 serious incident reporting (Measure 9.1 identification sources and informing third parties of direct reporting channels, if available; 9.2 information incl. near misses; 9.3 timelines of 2, 5, 10 and 15 days, intermediate reports at least every four weeks, final report within 60 days of resolution; 9.4 retention of at least five years). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[6] NIST SP 800-61r3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile (supersedes SP 800-61r2; previous life-cycle phases mapped to CSF 2.0 functions). NIST. 2025-04. https://csrc.nist.gov/pubs/sp/800/61/r3/final (verified: primary)
[7] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring incl. incident response; MANAGE 4.3 incidents and errors communicated, processes followed and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[8] LLM01:2025 Prompt Injection (direct and indirect prompt injection). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[9] Top 10 for Agentic Applications 2026 (ASI02 Tool Misuse; ASI08 Cascading Failures; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[10] IEC 61025:2006, Fault tree analysis (FTA), edition 2.0 (IEC TC 56 Dependability). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template under Art. 55(1)(c) and Commitment 9; ten fields from start and end dates to root-cause analysis, near-miss patterns and submitter). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[13] Directive (EU) 2022/2555 (NIS2) of 14 December 2022: Art. 4 sector-specific Union acts; Art. 23 reporting obligations (significant incident; early warning within 24 hours; notification within 72 hours; final report within one month incl. type of threat or root cause); Annex I digital infrastructure incl. providers of public electronic communications networks and services. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[14] Commission Delegated Regulation (EU) 2024/1772, RTS on the classification of ICT-related incidents under DORA (Art. 8: major incidents; recurring incidents with the same apparent root cause, occurring at least twice within six months, count as one major incident). Publications Office of the EU (EUR-Lex). 2024-03-13. https://eur-lex.europa.eu/eli/reg_del/2024/1772/oj/eng (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 75 (Art. 75(1a), inserted by Reg. (EU) 2026/1744: serious incidents of high-risk systems under the AI Office's competence reported to the AI Office, Art. 73(2) to (9) applying mutatis mutandis; Art. 73 deadlines unchanged). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_75 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 55 (GPAI models with systemic risk; Art. 55(1)(c) keep track of, document and report serious incidents to the AI Office without undue delay). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_55 (verified: primary)
[17] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 33 notification of a personal data breach to the supervisory authority (72 hours where feasible; processor to controller; phased information; documentation) and Art. 34 communication to the data subject (high risk). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[18] Regulation (EU) 2022/2554 (DORA) of 14 December 2022: Art. 3(8) ICT-related incident; Art. 19 reporting of major ICT-related incidents. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[19] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5(1): initial notification within 4 hours of classification and no later than 24 hours from awareness; Art. 5(2): within 4 hours of a classification made after those 24 hours; intermediate within 72 hours; final within one month); report templates in Commission Implementing Regulation (EU) 2025/302. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[20] Regulation (EU) 2024/2847 (Cyber Resilience Act) of 23 October 2024: Art. 14 reporting obligations of manufacturers (24-hour early warning; 72-hour notification; final report 14 days after a fix or one month after notification; CSIRT and ENISA via the single reporting platform); Art. 71(2) Art. 14 applies from 11 Sep 2026. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[21] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025; approved 29 Sep 2025; Bus. & Prof. Code 22757.13(c): critical safety incidents reported by any frontier developer, not only a large frontier developer, to the Office of Emergency Services within 15 days, or within 24 hours to an appropriate authority on imminent risk of death or serious physical injury). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[22] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; 72-hour safety incident disclosure). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[23] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment; all frontier developers, not only large frontier developers, report a critical safety incident within 72 hours of a determination or reasonable belief to the DFS office; 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[24] "European Commission Publishes Draft Guidance on Reporting Serious AI Incidents" (indirect causation; simplified Art. 73 reporting where equivalent sector obligations apply, limited to fundamental-rights infringements). Latham & Watkins. 2025-10-28. https://www.lw.com/en/insights/european-commission-publishes-draft-guidance-reporting-serious-ai-incidents (verified: secondary)
[25] "EU AI Act Update: Digital Omnibus Finalizes 8 Compliance Changes" (AI Office exclusive competence over AI systems built on the same provider's GPAI model and over systems in very large online platforms and search engines; serious-incident reports from those providers go to the AI Office). Orrick. 2026-07-29. https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes (verified: secondary)
[26] "AI Act: Commission issues draft guidance and reporting template on serious AI incidents, and seeks stakeholders' feedback" (published 26 Sep 2025; feedback until 7 Nov 2025; alignment with the OECD AI Incidents Monitor and Common Reporting Framework). European Commission. 2025-09-26. https://digital-strategy.ec.europa.eu/en/consultations/ai-act-commission-issues-draft-guidance-and-reporting-template-serious-ai-incidents-and-seeks (verified: primary)
[27] Legislative Train Schedule: The Digital Omnibus Regulation Proposal (COM(2025) 837; status tabled; single reporting point for cybersecurity and data incidents; co-rapporteurs' draft report 22 Jun 2026; Council mandate vote cancelled 26 Jun 2026; page updated 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[28] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[29] AI Incident Database (harms and near harms from deployed AI; CSET, GMF and MIT taxonomies; database snapshots). Responsible AI Collaborative. 2026. https://incidentdatabase.ai/ (verified: primary)
[30] OECD.AI Incidents and Hazards Monitor (AIM; automated monitor of news media; incidents and hazards distinguished). OECD. 2026. https://oecd.ai/en/incidents (verified: primary)
[31] AIAAIC Repository (independent register of AI, algorithmic and automation incidents and controversies). AIAAIC. 2026. https://www.aiaaic.org/aiaaic-repository (verified: primary)
[32] MIT AI Risk Repository (living database of AI risks; causal and domain taxonomies). MIT FutureTech. 2026. https://airisk.mit.edu/ (verified: primary)
[33] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 113 (Art. 113(c) as amended by Reg. (EU) 2026/1744: Chapter III, Sections 1 to 3, apply from 2 Dec 2027 for Annex III systems and from 2 Aug 2028 for Annex I systems; Chapter IX, Art. 73 included, is not listed among the postponed provisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_113 (verified: primary)
