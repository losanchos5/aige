---
lang: es
source: bok/05-patterns.md
sourceHash: "75573567c87d6e935731d6d9eb10dd5b66d986b32073f533a761faaa51306dcb"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 05. Patrones

> Un catálogo de patrones de ingeniería de gobernanza de IA reutilizables, cada uno nombrado a una
> capa del stack, en la estructura del Catálogo de Patrones de IA Responsable de CSIRO.

Este capítulo es el catálogo. Cada patrón es una solución reutilizable a un problema que recurre
cuando diseñas la gobernanza de sistemas de IA. La estructura sigue el Catálogo de Patrones de IA
Responsable de CSIRO, que aplica patrones de diseño de ingeniería de software a IA responsable en
los niveles de gobernanza, proceso y producto [1]. Mantenemos sus campos (resumen, objetivos,
usuarios objetivo, partes interesadas impactadas, principios relevantes, contexto, problema,
solución, consecuencias, patrones relacionados) y añadimos una línea **Maps to** que nombra los
estándares, artículos y capa del stack (1–5) que cada patrón sirve.

Cada patrón nombra una de las cinco capas ([capítulo 04](/bok/the-stack)) para que el catálogo y el
stack permanezcan consistentes, y realiza uno o más de los seis principios
([capítulo 03](/bok/values-and-principles)): *construye el control en el punto más temprano en que
pueda bloquear · dale dientes a cada control · registra y acota cada actor antes de que actúe ·
instrumenta la compilación para producir su propia prueba · comienza desde un modo de fallo o daño
nombrado · haz que el camino gobernado sea el camino más fácil*. Cada línea **Maps to** extrae sus
IDs de amenaza del OWASP Top 10 para Aplicaciones Agentes 2026 [2] y sus etiquetas de función del
NIST AI RMF [3]; los patrones del lado del desarrollo también nombran OWASP Top 10 para Aplicaciones
LLM 2026 e IDs de MITRE ATLAS, cada uno originado en su propia página. Cada patrón lleva un ejemplo
corto etiquetado `(illustrative)`: un bosquejo plausible y desidentificado, no una afirmación sobre
ningún sistema nombrado. Los mapeos al Reglamento de IA de la UE son ilustrativos, no una afirmación
de conformidad, y a partir de 2026-09-24 ninguna norma armonizada bajo el Reglamento está
referenciada en el Diario Oficial [4].

En el sitio web cada patrón tiene su propia página, listada por capa en [/patterns](/patterns), con
el texto completo, su diagrama y sus propias fuentes numeradas; este capítulo mantiene la plantilla,
el mapa de patrones y, bajo el encabezado de cada patrón, un resumen corto que enlaza al patrón
completo. La edición impresa lleva cada patrón en su totalidad en este capítulo.

## La plantilla de patrón

Cada página de patrón utiliza los mismos campos, en este orden, y termina con su propia lista de
**Fuentes**.

| Campo | Qué responde |
|---|---|
| Resumen | Qué es el patrón y cuándo se aplica. |
| Objetivos | El resultado de gobernanza que logra el patrón. |
| Usuarios objetivo | Quién lo implementa. |
| Partes interesadas afectadas | Quién se ve afectado por él. |
| Principios relevantes | Cuál de los seis principios realiza. |
| Contexto | La situación en la que surge el problema. |
| Problema | Las fuerzas en juego y el modo de fallo si no se aplica el patrón. |
| Solución | Cómo construirlo: los artefactos, dónde se sitúan en el pipeline, qué se ejecuta cuándo. |
| Consecuencias | Beneficios y compensaciones: coste, latencia, falsos positivos, mantenimiento. |
| Patrones relacionados | Los patrones de los que depende o a los que alimenta. |
| Se asigna a | Los estándares, artículos y capa del stack que sirve el patrón. |

Un patrón no es una política. Cada uno nombra el artefacto que envía un ingeniero, el punto del
ciclo de vida donde se ejecuta y la evidencia que deja atrás, para que el patrón pueda fallar una
compilación o bloquear una acción en lugar de describir una intención.

## Patrón: Policy Card

Expresa una regla de gobernanza como una tarjeta legible por máquina que viaja con el modelo o
agente, en lugar de prosa que un humano debe recordar aplicar. La misma tarjeta se evalúa antes de
la fusión, en el despliegue y en el punto de acción, y cada evaluación emite un veredicto, por lo
que un cambio de regla es un diff revisable y el crosswalk se puede generar a partir de las
tarjetas.

Capa 01 Gobernanza como código · [Lee el patrón Policy Card](/patterns/policy-card)

## Patrón: Eval Gate in CI

Conecta una suite de eval versionada en CI para que un modelo o agente deba superar un umbral
documentado, trazable a un modo de fallo o una obligación nombrada, antes de que se envíe. La
ejecución de eval es el control y su resultado estructurado es la evidencia; un eval fallido bloquea
la compilación en lugar de presentar un hallazgo.

Capa 03 Evals & Red Teaming as Evidence · [Lee el patrón Eval Gate in CI](/patterns/eval-gate-in-ci)

## Patrón: Adversarial Red-Team Suite

Mantén una suite adversarial versionada, construida a partir de una taxonomía de amenazas en lugar
de intuición, y ejecútala en CI o según un cronograma contra la versión registrada. Cada hallazgo se
corrige o se acepta en el registro, se presenta como evidencia y se retroalimenta como una prueba de
regresión, por lo que un ataque cerrado permanece cerrado.

Capa 03 Evals & Red Teaming as Evidence ·
[Lee el patrón Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite)

## Patrón: Agent Registry

Mantén un inventario consciente del tiempo de ejecución de cada modelo, servicio y agente, cada
entrada con un propietario, un alcance y una fecha de vencimiento, escrita por el pipeline de
despliegue en lugar de escrita a mano. El registro se convierte en una precondición de la
producción, y el registro es el objeto sobre el que las políticas evalúan y los controles de tiempo
de ejecución se adjuntan.

Capa 02 Inventory & Transparency · [Lee el patrón Agent Registry](/patterns/agent-registry)

## Patrón: AIBOM

Emite una lista de materiales de IA en la compilación, en un formato estándar como CycloneDX ML-BOM
o el perfil de IA de SPDX 3.0, registrando modelos, conjuntos de datos, pesos y su procedencia y
licencias. Almacenado con la entrada del registro y regenerado en cada compilación, convierte las
preguntas de cadena de suministro y transparencia en consultas.

Capa 02 Inventory & Transparency · [Lee el patrón AIBOM](/patterns/aibom)

## Patrón: Model Card as Control Evidence

Rellena la ficha de modelo y la ficha de datos desde el pipeline (resultados de eval, los conjuntos
de datos en el AIBOM, limitaciones conocidas, el propietario) y regeneralas en cada cambio
significativo. Una tarjeta reconstruida a partir de lo que la producción produjo es tanto
documentación como evidencia de control; una tarjeta escrita una vez en el lanzamiento se convierte
en ficción.

Capa 02 Inventory & Transparency ·
[Lee el patrón Model Card as Control Evidence](/patterns/model-card-as-control-evidence)

## Patrón: Continuous Assurance Telemetry

Haz que cada control escriba un registro de evidencia con marca de tiempo y estructurado en un
almacén de aseguramiento, en un esquema con clave en el id del registro. El estado de un control se
convierte en una consulta en vivo sobre lo que el sistema emitió, no una atestación de que existía
cuando alguien miró.

Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)

## Patrón: Runtime Guardrail

Examina entradas y salidas en la ruta de solicitud en vivo con guardrails que apliquen la misma
Policy Card que CI evaluó, y emite un evento de decisión en cada llamada. El guardrail decide una
llamada a la vez; en una violación definida, señala el circuit breaker, que retira la autonomía del
agente al por mayor.

Capa 04 Runtime Controls & Observability ·
[Lee el patrón Runtime Guardrail](/patterns/runtime-guardrail)

## Patrón: Kill Switch / Circuit Breaker

Vincula cada agente a su propia identidad y coloca un circuit breaker en el límite de llamada de
herramientas que se active en una violación de umbral, una anomalía o un tirón manual. La revocación
afecta el alcance de un agente mientras la flota sigue funcionando, y el interruptor se prueba en un
cronograma, porque un kill switch no probado no es un control.

Capa 04 Runtime Controls & Observability ·
[Lee el patrón Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)

## Patrón: Incident Pipeline

Conecta la detección en tiempo de ejecución a un flujo de trabajo de triaje que clasifique la
gravedad y, en un evento reportable, redacte el informe e inicie el reloj estatutario. Para sistemas
de alto riesgo, codifica los plazos de notificación del Artículo 73 del Reglamento de IA de la UE y
la retroalimentación de vigilancia poscomercialización del Artículo 72 [5], y mantiene el registro
de incidentes como evidencia legible por máquina.

Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Incident Pipeline](/patterns/incident-pipeline)

## Patrón: FRIA-as-Code

Plantilla la evaluación de impacto sobre los derechos fundamentales como datos estructurados,
vincula cada mitigación al control que la implementa, y haz referencias cruzadas con la AIPD para
que los elementos compartidos se escriban una sola vez. La evaluación se almacena con la entrada del
registro y se reabre cuando el sistema cambia significativamente.

Capa 01 Gobernanza como código / Capa 02 Inventory & Transparency ·
[Lee el patrón FRIA-as-Code](/patterns/fria-as-code)

## Patrón: Framework Crosswalk

Genera la asignación de controles a cláusulas del marco a partir de los propios controles, y úsala
para encontrar brechas y reutilizar controles. Cada celda debe resolverse en un control en ejecución
y su evidencia: una celda de asignación sin nada detrás se marca, no se cuenta, porque la cobertura
no es control.

Capa 01 Gobernanza como código / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Framework Crosswalk](/patterns/framework-crosswalk)

## Patrón: Machine-Readable Evidence (OSCAL)

Emite resultados de control como artefactos OSCAL de definición de componentes y resultados de
evaluación, basándose en las capas nativas de control, implementación y evaluación antes de
cualquier extensión específica de IA. La evidencia se vuelve consultable, comparable y reutilizable
en auditorías, y la captura de pantalla deja de ser un artefacto de evidencia.

Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal)

## Patrón: Agent Identity & Scoped Credentials

Emite a cada agente una identidad de carga de trabajo distinta con un alcance declarado, un
propietario y una fecha de vencimiento, registrada en el Agent Registry y establecida antes de que
actúe. Asegurar el canal a un servidor de herramientas es necesario pero no es la identidad del
agente; la identidad es lo que hace que sus acciones sean atribuibles y su acceso revocable.

Capa 04 Runtime Controls & Observability ·
[Lee el patrón Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)

## Patrón: Human-in-the-loop Gate

Clasifica las acciones de un agente por consecuencia y mantén la clase de alta consecuencia detrás
de un aprobador humano nombrado con contexto suficiente para decidir, mientras que la clase
rutinaria permanece autónoma bajo guardrails. El aprobador, el contexto y la decisión se registran
como evidencia de supervisión en el punto de acción.

Capa 04 Runtime Controls & Observability ·
[Lee el patrón Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)

## Patrón: Shadow-AI Discovery

Escanea los lugares donde aparece la IA (proveedores de identidad, cuentas en la nube, salida de
red, repositorios de código, integraciones de SaaS) para buscar modelos y agentes que no tengan
entrada en el registro. Cada desconocido se registra como sin reclamar y se le asigna un propietario
para reclamarlo, o se escala, para que el inventario converja en lo que realmente se está
ejecutando.

Capa 02 Inventory & Transparency ·
[Lee el patrón Shadow-AI Discovery](/patterns/shadow-ai-discovery)

## Patrón: Vendor / Model Due-Diligence Gate

Controla la IA comprada y de solo API en una evaluación de diligencia debida estructurada antes de
que llegue a producción: las evaluaciones y documentación del proveedor, flujos de datos, los
alcances que otorgas, compromisos de notificación de incidentes y derechos de auditoría. Donde no
puedas verificar un control, el registro lo dice y la integración se limita en su lugar.

Capa 02 Inventory & Transparency / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)

## Patrón: Use-Case Intake & Risk Tiering

Enruta cada caso de uso de IA propuesto, construido o comprado, a través de una entrada que escribe
un registro de caso de uso estructurado, lo examina contra prácticas prohibidas y la escalera de
riesgo del Reglamento de IA de la UE, y calcula un nivel interno a partir de campos de perfil
declarados. El nivel activa las evaluaciones, evals y aprobaciones que el sistema debe superar, y el
registro se convierte en su entrada de registro.

Capa 01 Gobernanza como código / Capa 02 Inventory & Transparency ·
[Lee el patrón Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering)

## Patrón: AI Threat Model

Modela las amenazas de cada sistema de IA en la revisión de diseño como un archivo de datos
versionado: STRIDE por elemento de flujo de datos, extendido con los ataques específicos de IA que
MITRE ATLAS, NIST AI 100-2 y las listas de OWASP catalogan. Cada amenaza por encima de la tolerancia
se resuelve en una mitigación y en la prueba que lo demuestra, y la revisión de diseño falla
mientras uno no lo haga.

Capa 01 Gobernanza como código / Capa 03 Evals & Red Teaming as Evidence ·
[Lee el patrón AI Threat Model](/patterns/ai-threat-model)

## Patrón: Training-Data Rights Ledger

Mantén una fila de libro mayor por fuente de entrenamiento: canal de adquisición, licencia o base
legal, la comprobación de reserva de derechos con su método y fecha, y los usos permitidos. Unido a
la linaje, el libro mayor nombra los modelos que cada fuente entrenó, por lo que una retirada, una
solicitud de borrado o una orden llega solo a los modelos afectados.

Capa 02 Inventory & Transparency ·
[Lee el patrón Training-Data Rights Ledger](/patterns/training-data-rights-ledger)

## Patrón: Dataset Admission Gate

Permite que un trabajo de entrenamiento, evaluación o recuperación lea una versión de conjunto de
datos solo si un registro de admisión firmado permite ese uso, después de comprobaciones de
derechos, calidad, representatividad, sesgo e integridad. La comprobación es política como código en
tiempo de lectura, por lo que un campo faltante falla la ejecución en lugar de una revisión.

Capa 01 Gobernanza como código / Capa 02 Inventory & Transparency ·
[Lee el patrón Dataset Admission Gate](/patterns/dataset-admission-gate)

## Patrón: Fairness Eval Suite

Versiona una suite de equidad con el modelo: métricas de grupo e interseccionales con intervalos de
confianza, un resultado de «datos insuficientes» para celdas pequeñas, un escaneo de proxy y una
prueba de cambio contrafáctico, juzgados contra una política fijada antes de la ejecución. Falla la
compilación cuando la política no se cumple y se ejecuta de nuevo en decisiones en vivo.

Capa 03 Evals & Red Teaming as Evidence ·
[Lee el patrón Fairness Eval Suite](/patterns/fairness-eval-suite)

## Patrón: Explanation Artefact

Escribe un registro de explicación por decisión consecuente en el momento de la decisión, con la
versión del modelo, el método y la línea de base, códigos de razón extraídos de factores puntuados y
la ruta de contestación fijada. Prueba las explicaciones para fidelidad y responde a cada obligación
de explicación desde el mismo registro.

Capa 04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Explanation Artefact](/patterns/explanation-artefact)

## Patrón: Model Artefact Integrity

Firma un manifiesto de cada archivo de modelo en la compilación, adjunta la procedencia de
compilación, prefiere formatos de serialización que no puedan ejecutar código y escanea el resto, y
haz que cada tiempo de ejecución verifique la firma, los resúmenes y la procedencia contra la
entrada del registro antes de cargar los pesos.

Capa 02 Inventory & Transparency / Capa 04 Runtime Controls & Observability ·
[Lee el patrón Model Artefact Integrity](/patterns/model-artefact-integrity)

## Patrón: Claims Substantiation Gate

Registra cada afirmación pública sobre la precisión, equidad o capacidad de un sistema de IA con la
ejecución de eval, la población y la fecha que la respaldan. La publicación se bloquea sin evidencia
en vivo, y cada lanzamiento vuelve a ejecutar las evals citadas e indica cualquier afirmación que la
nueva versión ya no respalda.

Capa 05 Assurance & Continuous Compliance / Capa 03 Evals & Red Teaming as Evidence ·
[Lee el patrón Claims Substantiation Gate](/patterns/claims-substantiation-gate)
## Patrón: Decision Notice & Contest Path

Cuando un sistema de IA toma o da forma a una decisión sobre una persona, envía un aviso generado a
partir del registro de decisión que da las razones principales y dice cómo contestar, y encamina
cada contestación a un revisor con la autoridad y la información para cambiar el resultado. El
aviso, la contestación y el resultado de la revisión son registros, por lo que el derecho a
contestar se evidencia decisión por decisión.

Capa 04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Decision Notice & Contest Path](/patterns/decision-notice-contest-path)

## Patrón: Rights Requests Against Models

Encamina cada solicitud de titular de datos a cada lugar donde los datos de la persona se encuentran
en un sistema de IA, desde sistemas de origen e índices de recuperación hasta registros, conjuntos
de eval y, donde el modelo no es anónimo, los pesos. Cada ubicación tiene una respuesta preacordada,
desde eliminación hasta reentrenamiento programado, y la solicitud se cierra con un registro de
cumplimiento que data la brecha restante.

Capa 02 Inventory & Transparency / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Rights Requests Against Models](/patterns/rights-requests-against-models)

## Patrón: Sanctioned AI Gateway

Pon herramientas de IA aprobadas y API de modelos detrás de un inicio de sesión único y una puerta
de enlace que aplique la política de uso aceptable como código: reglas de clase de datos, redacción
o bloqueo, un evento de decisión por llamada y acceso condicionado a una atestación actual. La ruta
sancionada está construida para ser la más fácil, y el descubrimiento encuentra lo que la rodea.

Capa 04 Runtime Controls & Observability / Capa 02 Inventory & Transparency ·
[Lee el patrón Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway)

## Patrón: Staged Rollout with Rollback Criteria

Lleva cada cambio de modelo, prompt, corpus o versión de proveedor a producción a través de etapas
shadow, pilot y canary, con criterios de reversión registrados antes de que comience cada etapa y
evaluados por el pipeline. Las versiones se fijan en el registro y la ruta de vuelta se prueba antes
de que alguien dependa de ella.

Capa 04 Runtime Controls & Observability ·
[Lee el patrón Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria)

## Patrón: Drift & Fairness Monitor

Vigila un sistema desplegado para entrada, etiqueta, concepto, pipeline, modelo de proveedor y
cambio de uso, y para calidad y equidad por grupo. Cada señal tiene un umbral, un propietario y una
consecuencia preacordada, desde un problema hasta un disyuntor activado, y cada verificación escribe
un registro de evidencia.

Capa 04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Drift & Fairness Monitor](/patterns/drift-fairness-monitor)

## Patrón: Downstream Use Register

Escribe los usos previstos y prohibidos de un sistema como una Policy Card, registra cada consumidor
de sus salidas contra su entrada de registro con la re-prueba que autorizó ese uso, y sella
procedencia y advertencias en las salidas. El uso secundario se convierte en una decisión en lugar
de un descubrimiento, y un cambio o retiro puede llegar a todos los que afecta.

Capa 02 Inventory & Transparency / Capa 01 Govern-as-Code ·
[Lee el patrón Downstream Use Register](/patterns/downstream-use-register)

## Patrón: Disclosure & Notification Pipeline

Genera divulgaciones (avisos de interacción con IA, etiquetas, la página de transparencia y ficha de
sistema, avisos a trabajadores y personas afectadas) y notificaciones activadas (a proveedores,
autoridades, clientes y el público) desde el registro y plantillas versionadas, cada una en su
reloj. Cada aviso enviado se registra con su audiencia, versión de plantilla e marca de tiempo.

Capa 05 Assurance & Continuous Compliance / Capa 02 Inventory & Transparency ·
[Lee el patrón Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline)

## Patrón: Deactivation, Localisation & Retirement Runbook

Mantén un runbook practicado por sistema para degradarlo, apagarlo por jurisdicción y retirarlo:
umbrales nombrados y disparadores legales, un propietario de decisión, evidencia congelada primero,
modos graduados cortos de apagado, interruptores regionales y pasos de retiro que terminan en una
entrada de registro retirada y sin copia en ejecución.

Capa 04 Runtime Controls & Observability / Capa 02 Inventory & Transparency ·
[Lee el patrón Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook)

## Lo que puedes hacer esta semana

1. **Encuentra tu capa más vacía.** Lista los controles que ejecutas por capa y elige el patrón que
   llena la capa con menos.
2. **Adopta un patrón completo.** Construye la Solución de un patrón tal como está escrita,
   incluyendo el registro que emite, antes de adaptarla: un patrón sin su artefacto es una
   diapositiva.
3. **Comienza desde un fallo que has visto.** Para tu sistema de mayor riesgo, elige el patrón cuyo
   Problema nombra un fallo que ya has tenido, no el que es más fácil de construir.
4. **Traza una línea Maps to.** Toma un patrón que ejecutas y verifica que cada artículo, cláusula e
   id de amenaza en su línea Maps to apunte a un artefacto que puedas mostrar hoy.
5. **Escribe el patrón que te falta.** Si ejecutas un control que ningún patrón describe, esbózalo
   en la plantilla y propónlo: el catálogo está abierto a contribuciones.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; prEN 18286 entered public enquiry on 30 Oct 2025; page last updated 2026-08-03). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
