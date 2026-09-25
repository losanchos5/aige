---
lang: es
source: bok/01-definition.md
sourceHash: "1cce4e63e8eb069cdc6eb894461204e8419fc6b0b7176c3e0210281b0d47437e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 01. La definición

> La ingeniería de gobernanza de IA es la aplicación de la práctica de ingeniería (pensamiento
> sistémico, pensamiento de producto y código) a la gobernanza de sistemas de IA; una capacidad, no
> un título de trabajo, medida por reducción real del riesgo y evidencia lista para auditoría.

## La definición

**La ingeniería de gobernanza de IA es la aplicación de la práctica de ingeniería (pensamiento sistémico, pensamiento de producto y código) a la gobernanza de sistemas de IA.**

Lee la oración en tres partes. *Práctica de ingeniería* significa que construimos, ejecutamos y
medimos la gobernanza de la manera en que los ingenieros construyen, ejecutan y miden cualquier otra
cosa: como sistemas versionados con pruebas, telemetría y propietarios, no como documentos.
*Pensamiento sistémico y pensamiento de producto* significa que tratamos la gobernanza como un todo
que abarca datos, modelo, pipeline, runtime y organización, entregada como un producto a los
ingenieros que son sus usuarios. *La gobernanza de sistemas de IA* es el sujeto: el alcance completo
de la gobernanza, riesgo y aseguramiento para IA, incluyendo agentes autónomos, no una sola parte
estrecha de ella. El capítulo 11 establece
[qué cuenta como un sistema de IA](/bok/ai-defined#four-definitions-compared) para propósitos de
gobernanza, y por qué esa decisión es en sí misma el primer control.

El encuadre se toma prestado, deliberadamente. La ingeniería de GRC se define a sí misma como "la
aplicación de la práctica de ingeniería de software, pensamiento sistémico y pensamiento de producto
a la gobernanza, riesgo y cumplimiento" [1]. La ingeniería de gobernanza de IA es ese mismo
movimiento, dirigido a la gobernanza de IA. Es la disciplina padre apuntada a un objetivo más rápido
y más extraño.

## Tres aclaradores

**Cubre la gobernanza, el riesgo y el aseguramiento de sistemas de IA, incluidos agentes.** El
alcance no es "cumplimiento normativo." Va desde establecer las reglas (gobernanza), pasando por
identificar y reducir lo que puede salir mal (riesgo), hasta producir la evidencia de que los
controles funcionan (aseguramiento). Incluye explícitamente la IA autónoma y agéntica, porque ahí es
donde viven ahora los problemas de gobernanza más difíciles: un agente que navega, ejecuta código,
llama APIs y actúa bajo autoridad delegada es el objeto que la gobernanza heredada menos puede ver.

**Es una capacidad, no un título de puesto.** No necesitas "ingeniero de gobernanza de IA" en tu
tarjeta de visita para hacer este trabajo, y tener el título no significa que lo estés haciendo. Es
un conjunto de prácticas (política como código, eval gates, registros de agentes, aseguramiento
continuo) que un ingeniero de seguridad, un ingeniero de privacidad, un ingeniero de MLOps o un
responsable de gobernanza pueden cada uno desarrollar. El mercado está formando el rol (los roles
técnicos de gobernanza de IA en el sector tecnológico reportan una mediana cercana a USD 221.000, la
banda más alta en la encuesta de IAPP [2], y Gartner pronostica un gasto en gobernanza de IA de USD
492 millones en 2026, superando USD 1.000 millones en 2030 [3]), pero la disciplina se define por la
capacidad, no por la vacante.

**Se mide por la reducción real del riesgo y la evidencia lista para auditoría.** Hay exactamente
dos pruebas. ¿El riesgo realmente cayó, mediblemente, en producción, no en una diapositiva de
madurez? ¿Y puede un regulador o auditor leer la prueba como evidencia legible por máquina, no como
una captura de pantalla rearmada? Un control que no pasa ninguna de estas dos pruebas es teatro. La
cobertura de marcos, el número de políticas escritas y los comités celebrados son insumos como
máximo; nunca son la medida.

## ## El clúster de desambiguación

La disciplina se define tanto por lo que no es como por lo que es. Ocho vecinos se confunden
rutinariamente con ella. Cada uno comparte una frontera; ninguno es lo mismo.

| Vecino | Qué hace | Cómo difiere la ingeniería de gobernanza de IA |
|---|---|---|
| **Investigación en seguridad de IA** | Estudia si los modelos poderosos son seguros en principio (alineación, capacidades peligrosas). | Ingeniería de los controles y la evidencia para sistemas de IA en producción; consume investigación en seguridad, no la realiza. |
| **MLOps / LLMOps** | Construye, despliega y sirve modelos y pipelines de forma confiable. | Gobierna lo que MLOps envía: añade política, evals como evidencia, registro y aseguramiento como gates en el mismo pipeline. |
| **Gestión del riesgo de modelos (estilo SR 11-7)** | Valida modelos, verifica la solidez conceptual y realiza backtests, en la tradición bancaria; en EE.UU., SR 11-7 fue reemplazado por SR 26-2 el 17 de abril de 2026 [6]. | Se extiende más allá de la validación de modelos al comportamiento en tiempo de ejecución, agentes, impacto en derechos y evidencia continua legible por máquina. |
| **Cumplimiento de IA / legal** | Interpreta obligaciones (Reglamento de IA, RGPD) y asesora sobre ellas. | Convierte la obligación en un control ejecutable y evidencia legible; necesita asesoramiento legal, no lo reemplaza. |
| **IA responsable / ética de IA** | Establece los valores y principios (equidad, transparencia, responsabilidad). | Implementa esos valores como controles en ejecución; la ética establece el objetivo, la ingeniería lo alcanza y lo prueba. |
| **Ingeniería GRC** (la disciplina padre) | Aplica la práctica de ingeniería a la gobernanza, el riesgo y el cumplimiento en general. | Mismo método, especializado en IA: modelos, agentes, evals, AIBOM, controles de IA en tiempo de ejecución. |
| **Ingeniería de seguridad de IA** (la disciplina hermana) | Asegura sistemas de IA contra ataques (inyección de prompts, robo de modelos, abuso de agentes); su entregable es un sistema defendido. | Se superpone mucho (a menudo la misma persona), pero su entregable es un sistema *gobernado y evidenciado*: el registro de derechos y obligaciones y el aseguramiento continuo, no solo la defensa. |
| **"Ingeniería de gobernanza de IA" de Visure** | Gobierna la IA que los ingenieros *usan dentro* de flujos de trabajo de ingeniería (requisitos, MBSE). | La dirección opuesta: nuestro tema es gobernar sistemas de IA, no gobernar ingeniería asistida por IA [4]. |

En prosa: la frontera está donde una disciplina se detiene. **La investigación en seguridad de IA**
pregunta si un modelo es seguro; nosotros preguntamos si el sistema desplegado está gobernado, y lo
probamos. **MLOps** responde "¿está sirviendo el modelo?"; nosotros respondemos "¿se le permite
servir, y qué evidencia lo dice?" Gobernamos el mismo pipeline que MLOps ejecuta.
**La gestión del riesgo de modelos** en la tradición SR 11-7 valida un modelo en puntos en el
tiempo; nosotros gobernamos el sistema continuamente, incluidos agentes que no tienen análogo en un
modelo de crédito. El texto de referencia de la tradición en EE.UU. cambió el 17 de abril de 2026,
cuando la Reserva Federal, la OCC y la FDIC reemplazaron SR 11-7 con SR 26-2
([SR 11-7, ahora SR 26-2](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai), en el
capítulo 21) [6]. La nueva orientación coloca modelos de IA generativa y agéntica fuera de su
alcance [7], por lo que los sistemas que este libro más le importan son aquellos que la validación
de modelos bancarios ahora deja a otros controles; el capítulo 13 establece dónde
[la gestión del riesgo de modelos se encuentra con la gestión del riesgo de IA](/bok/risk-management#what-this-chapter-settles).
**El cumplimiento de IA y legal** te dicen qué requiere la ley; nosotros construimos el control que
lo cumple y la evidencia que lo demuestra, y dependemos de los abogados para decirnos que entendimos
correctamente la obligación. **La IA responsable y la ética de IA** establecen los valores; sin
ingeniería, esos valores se quedan en un póster (el capítulo 16 convierte uno de ellos,
[equidad, en métricas y eval gates](/bok/fairness-and-explainability#group-fairness-metrics)).
**La ingeniería GRC** es el método padre, y somos su especialización en IA. Heredamos tres de las
cinco capas del stack casi sin cambios (Govern-as-Code, Inventory & Transparency, y Assurance &
Continuous Compliance, que llevan política como código, el inventario de activos y evidencia legible
por máquina) junto con la prueba "un dashboard verde sobre un control roto es teatro"; lo que la IA
nos obliga a añadir son las otras dos, evals y red-teaming como controles e identidad de agentes y
control en tiempo de ejecución, porque un modelo cuyo comportamiento debe ser probado y un actor
autónomo que actúa bajo autoridad delegada no tienen análogo en GRC clásico.
**La ingeniería de seguridad de IA** es la disciplina hermana con la que más nos superponemos, y la
superposición es una característica, no una disputa de límites: la misma persona a menudo usa ambos
sombreros. La línea no es "encuadre versus cercas" sino *entregable*. El entregable de la ingeniería
de seguridad es un sistema defendido: detiene el ataque. El entregable de la ingeniería de
gobernanza de IA es un sistema *gobernado y evidenciado*: el registro de derechos y obligaciones
(qué control responde qué artículo, con la prueba adjunta) y el aseguramiento continuo como producto
que un auditor o regulador puede consultar. Una eval de red-team es trabajo de seguridad y trabajo
de gobernanza a la vez; se convierte en gobernanza cuando su resultado se archiva como evidencia
contra una obligación. La seguridad pregunta "¿está seguro del ataque?"; nosotros preguntamos "¿está
gobernado, y podemos probarlo?" Usualmente necesitamos la respuesta de seguridad como entrada a la
nuestra. Y el **uso idéntico de la frase por Visure** apunta en la dirección completamente opuesta:
gobernar la IA que asiste el trabajo de ingeniería, no ingeniería de la gobernanza de IA. Reclamamos
el segundo significado y desambiguamos el primero a la vista.

## ## El objeto de la gobernanza

¿Qué, concretamente, gobierna esta disciplina? Cinco objetos anidados, cada uno necesitando
controles diferentes:

- **Modelos.** Los artefactos entrenados (modelos fundacionales, fine-tunes, clasificadores), con su
  procedencia, capacidades, evaluaciones y modos de fallo conocidos. Gobernados con fichas de
  modelo, evals y AIBOM.
- **Sistemas.** La aplicación alrededor del modelo: prompts, recuperación, herramientas,
  orquestación, los usuarios humanos y máquinas. La mayoría del riesgo está aquí, no en el modelo
  crudo.
- **Agentes.** Sistemas que actúan: navegan, ejecutan código, llaman APIs, mueven dinero, delegan a
  otros agentes. Gobernados con identidad, alcance acotado, mediación de herramientas, guardrails en
  tiempo de ejecución y kill switches. Este es el objeto más difícil y más nuevo, y el que la
  gobernanza heredada no puede ver; el capítulo 23 cubre
  [gobernar agentes](/bok/governing-agents#what-makes-an-agent-a-governance-object) de principio a
  fin.
- **Datos.** Datos de entrenamiento, corpus de recuperación, prompts y salidas, con su base legal,
  derechos, procedencia y retención. Gobernados con fichas de datos, DPIAs y linaje; el capítulo 19
  aplica [la ley de protección de datos a la IA](/bok/privacy-and-ai#principles-applied-to-ai).
- **La organización.** Los roles, derechos de decisión, rutas de escalada y responsabilidad que
  rodean todo lo anterior. Gobernados con un modelo operativo, RACI y un pipeline de incidentes (el
  capítulo 12 mapea [los stakeholders y sus deberes](/bok/governance-program#the-stakeholder-map)).
  Un control sin propietario no es un control.

La disciplina es coherente solo cuando aborda los cinco. Una ficha de modelo sin registro de
agentes, o un registro de agentes sin ruta de datos en tiempo de ejecución, gobierna un objeto y
deja los otros abiertos.

## ## Las tres preguntas

En cualquier momento, una función de ingeniería de gobernanza de IA debe poder responder tres
preguntas sobre producción, instantáneamente, desde sistemas en vivo, no desde un documento
actualizado hace un trimestre:

1. **¿Qué IA está en ejecución?** Qué modelos, sistemas y agentes están en vivo, en qué versión,
   propiedad de quién. Este es el trabajo del inventario y del registro de agentes, y debe ser
   alimentado por una ruta de datos en tiempo de ejecución, no escrito en una hoja de cálculo.
2. **¿Qué se le permite hacer?** El alcance, permisos, guardrails y política que acotan cada sistema
   y agente. Este es el trabajo de la gobernanza como código y los controles en tiempo de ejecución:
   identidad antes de autonomía, alcance antes de acción.
3. **¿Qué evidencia lo prueba?** El registro legible por máquina y listo para auditoría que los
   controles se dispararon y el riesgo cayó. Este es el trabajo de evals como evidencia y
   aseguramiento continuo: evidencia como subproducto de la construcción.

Estas tres preguntas son la columna vertebral de todo el Body of Knowledge. El stack de cinco capas
(capítulo 04) está construido para responderlas: Inventory & Transparency responde *qué está en
ejecución*; Govern-as-Code y Runtime Controls & Observability responden *qué se le permite hacer*,
el primero escribiendo el límite como código y el segundo aplicándolo en la llamada en vivo; Evals &
Red Teaming y Assurance & Continuous Compliance responden *qué evidencia lo prueba*. Las amenazas
contra las que se construyen esos controles (inyección de prompts, mal uso de herramientas,
identidad de agentes y abuso de privilegios, agentes descontrolados) están catalogadas en el Top 10
de OWASP para Aplicaciones Agénticas [5], y los patrones que las responden están en el capítulo 05.

## ## Los límites del eval gate

Este libro se apoya mucho en evals como controles, por lo que le debe al lector la misma prueba de
"teatro" que aplica a todo lo demás. Un eval gate es necesario; no es suficiente. Tómalo en serio y
sus límites se derivan directamente:

- **Es punto-en-el-tiempo y limitado por muestreo.** Una eval prueba que el sistema pasó *estos*
  casos en *esta* versión. No dice nada sobre los insumos que no muestreó, y nada sobre el modelo de
  mañana.
- **Es Goodharteable.** En el momento en que un umbral cierra una liberación, hay presión para
  ajustar el modelo a la suite o el umbral al modelo. Un gate optimizado contra se convierte en un
  número que sube mientras el riesgo que representaba no se mueve.
- **Detecta regresiones, no novedad.** Una suite prueba modos de fallo conocidos. Un jailbreak
  novedoso o un ataque que la suite nunca imaginó pasa en verde, porque nada en el gate fue
  construido para verlo.

Nada de esto argumenta contra el gate; argumenta por cómo debe ejecutarse el gate. La suite eval es
en sí misma un artefacto a gobernar: su cobertura medida, sus casos mantenidos adversarialmente, sus
umbrales trazados a modos de fallo nombrados en lugar de números redondos, y su tamaño establecido
por el umbral que tiene que resolver (el capítulo 14 muestra cómo
[dimensionar la suite desde el umbral](/bok/governing-development#statistical-validity-of-evals)).
La misma precaución se aplica a
[benchmarks públicos y leaderboards](/bok/governing-deployment#what-public-benchmarks-and-leaderboards-cannot-tell-you),
que califican un modelo en casos de otro en lugar de en tu tarea. Y un gate que pasa *obliga* a
monitoreo en tiempo de ejecución (capa 04) en lugar de reemplazarlo. Un eval es el control en tiempo
de construcción; el guardrail y el trace son el control en tiempo de ejecución, contra las entradas
que ningún eval anticipó. Una disciplina que trata un gate en verde como prueba de seguridad ha
reconstruido teatro de framework con un pipeline más rápido.

> **En la práctica**
> Dentro de una gran telco, la diferencia entre "gobernada" y "documentada" se redujo a esas tres
> preguntas. Un inventario de modelos mantenido a mano respondía la pregunta uno el día en que fue
> editado y estaba mal dentro de una semana. Conectar el registro al pipeline de despliegue (para
> que un nuevo modelo o agente se registrara a sí mismo, con un propietario y un alcance, en tiempo
> de despliegue) fue lo que hizo las tres preguntas respondibles en cualquier martes dado. El
> documento se convirtió en una consulta.

**Correspondencias:** Reglamento de IA de la UE Art. 9 (gestión de riesgos), Art. 11/49/71
(documentación y registro), Art. 55 (deberes de riesgo sistémico de GPAI) · ISO/IEC 42001 (sistema
de gestión de IA) · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Top 10 for Agentic
Applications 2026. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Salary & Jobs Report 2025-26. IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[3] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[4] "AI Governance Engineering". Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant to banking organisations above USD 30 billion in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[7] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models; effective challenge). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
