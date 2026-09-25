---
lang: es
source: bok/09-glossary.md
sourceHash: "74f57d118a1f998ca0b0ad563a37274cb81318c198299053529a104759296753"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 09. Glosario

> Las definiciones canónicas para el libro: cada término definido una vez, alfabéticamente, y
> referenciado cruzado al capítulo que lo trata en profundidad.

Los términos se enumeran alfabéticamente bajo encabezados de letra, y cada definición tiene como
máximo 60 palabras. Cuando un término tiene una ortografía canónica en la guía de estilo (§8), esa
ortografía se usa aquí y en todas partes del libro. Un término tomado de una ley, una norma o un
artículo lleva una citación `[n]` a su fuente; un término que el libro acuña no la lleva, y su
capítulo es su fuente. Las definiciones legales se parafrasean, y el texto citado rige. "Contrasta
con" nombra los términos con los que se confunde más a menudo, "Ver" vincula la sección que lo
desarrolla, y el paréntesis enumera los capítulos que lo tratan. Cada término también tiene su
propia página, vinculada desde su nombre, con sus fuentes, los capítulos que la usan y una citación
lista para usar.

## Pares comúnmente confundidos

Diez pares se confunden lo suficientemente a menudo en revisiones como para valer la pena corregir
en el vocabulario de un equipo. La página de cada término lleva la misma comparación.

| Par | La diferencia | Por qué importa para los controles |
|---|---|---|
| [Transparencia](/glossary/transparency) y [explicabilidad](/glossary/explainability) | Qué pasó, a partir de registros de lo que se ejecutó, contra cómo se tomó una decisión | Dos artefactos: registro, fichas y registros para el primero; un método de explicación con una prueba de fidelidad para el segundo |
| [Procedencia de datos](/glossary/data-provenance) y [linaje de datos](/glossary/data-lineage) | De dónde vinieron los datos y en qué términos, contra la ruta que tomó a través de tus propios pipelines | El linaje perfecto sobre procedencia desconocida sigue siendo no gobernado; la supresión y el desmantelamiento necesitan ambos |
| [Desviación de datos](/glossary/data-drift) y [desviación de concepto](/glossary/concept-drift) | Las entradas cambian, contra la relación entre entradas y la respuesta correcta cambia | El primero se muestra en monitores de entrada antes de que lleguen las etiquetas; el segundo solo en resultados con etiquetas nuevas |
| [Incidente de IA](/glossary/ai-incident) y [problema (versus incidente)](/glossary/issue-versus-incident) | Ha ocurrido daño, contra un defecto o desviación que no ha producido un evento dañino | Los incidentes inician relojes de informes y CAPA; los problemas van a un registro rastreado con un propietario y una fecha de vencimiento |
| [Proveedor](/glossary/provider) y [responsable del despliegue](/glossary/deployer) | Desarrolla el sistema y lo coloca en el mercado bajo su propio nombre, contra lo usa bajo su propia autoridad | Deberes diferentes y evidencia diferente; una modificación sustancial puede convertir un responsable del despliegue en el proveedor |
| [Humano en el bucle (HITL)](/glossary/human-in-the-loop-hitl) y [humano en el bucle (HOTL)](/glossary/human-on-the-loop-hotl) | Una persona aprueba cada decisión consecuente, contra una persona monitorea y puede detener el sistema | HITL se evidencia por registros de aprobación y tasas de anulación; HOTL por alertas y una ruta de parada probada |
| [Apetito de riesgo](/glossary/risk-appetite) y [tolerancia de riesgo](/glossary/risk-tolerance) | Cuánto riesgo asumirá la organización en general, contra la banda residual que un sistema puede llevar | El apetito es una declaración de junta compilada a datos; la tolerancia es el umbral que una puerta de despliegue lee |
| [Ficha de modelo](/glossary/model-card) y [ficha de sistema](/glossary/system-card) | La documentación de un modelo, contra la del sistema desplegado: modelos, prompts, recuperación, herramientas, guardrails y supervisión | Los responsables del despliegue y las autoridades necesitan la vista del sistema; una ficha de modelo sola pierde los controles alrededor del modelo |
| [Inyección de prompts](/glossary/prompt-injection) y [jailbreak](/glossary/jailbreak) | Cualquier entrada que altere el comportamiento de formas no intencionadas, directa u oculta en contenido procesado, contra entradas dirigidas a eliminar las reglas de seguridad | Las evals de jailbreak prueban rechazos; la inyección también necesita herramientas de menor privilegio y aislamiento de contenido no confiable |
| [Seudonimización](/glossary/pseudonymisation) y [datos anónimos](/glossary/anonymous-data) | Re-atribuibles con información mantenida por separado, por lo que siguen siendo datos personales, frente a no relacionarse con ninguna persona identificable | Los datos seudonimizados mantienen todas las obligaciones de la RGPD; una afirmación de anonimato necesita una evaluación fechada |

## A

**A2A (protocolo Agent2Agent).** Un protocolo abierto para que los agentes se deleguen tareas entre
sí, en versión 1.0 desde marzo de 2026 [129] y proyecto en Growth Stage de la Agentic AI Foundation
dirigida por la Linux Foundation desde agosto de 2026 [130]. Los servidores deben autenticar cada
solicitud, pero la autorización, el alcance y la revocación de la autoridad concedida durante la
tarea se dejan al implementador [129]. Contrasta con [MCP](/glossary/mcp). Véase
[cap. 23, Sistemas multiagente y cadenas de delegación](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(cap. 23)

**Banda de abstención.** Un rango de puntuaciones en el que un sistema no actúa por sí solo sino que
remite el caso a un revisor humano. Su amplitud se establece por nivel de riesgo; el tamaño de la
banda y la tasa de anulación de los revisores se supervisan como señales. La predicción conforme
ofrece una forma de dimensionarla [20]. Véase
[cap. 11, Certeza requerida por nivel de riesgo](/bok/ai-defined#certainty-required-by-risk-tier).
(cap. 11)

**Política de uso aceptable (AUP).** Las reglas dirigidas al personal para usar herramientas de IA:
qué herramientas están aprobadas, qué clases de datos pueden ir adónde, obligaciones de revisar y
divulgar resultados, registro, atestación antes del acceso y consecuencias. Se aplica a través de
una puerta de acceso sancionada y descubrimiento, no solo el manual. Véase
[cap. 12, Uso aceptable de IA por el personal](/bok/governance-program#acceptable-use-of-ai-by-staff);
[cap. 05, Patrón: Puerta de acceso de IA sancionada](/patterns/sanctioned-ai-gateway). (cap. 05, 12)

**Adaptabilidad.** La capacidad de un sistema de IA de cambiar su comportamiento mientras está en
uso, mediante aprendizaje después del despliegue; opcional bajo la definición de la Reglamento de IA
[21]. Para la gobernanza es uno de varios desencadenantes de cambio: la mayoría del cambio de
comportamiento en la práctica proviene de actualizaciones de proveedores, desviación, ediciones de
prompts o actualizaciones de corpus. Véase
[cap. 11, Del elemento de definición al campo del registro](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11)

**ADMT (California).** Tecnología de toma de decisiones automatizada bajo las regulaciones de la
CCPA de California: tecnología que procesa información personal y utiliza computación para
reemplazar, o reemplazar sustancialmente, la toma de decisiones humana. Usarla para decisiones
significativas desencadena obligaciones de aviso previo al uso, exclusión voluntaria o apelación,
acceso y evaluación de riesgos [22]. Contrasta con
[Toma de decisiones automatizada (ADM)](/glossary/automated-decision-making-adm). Véase
[cap. 19, Estados Unidos](/bok/privacy-and-ai#united-states). (cap. 19)

**Aviso de acción adversa.** El aviso que un acreedor estadounidense debe dar cuando deniega o
empeora el crédito, indicando las razones principales específicas [23]. Las razones deben ser
precisas incluso cuando la decisión proviene de un modelo complejo, por lo que los códigos de razón
necesitan una prueba de fidelidad. Contrasta con [Aviso de decisión](/glossary/decision-notice).
Véase [cap. 20, Crédito y préstamos](/bok/existing-law#credit-and-lending). (cap. 16, 20)

**Ratio de impacto adverso (AIR).** La tasa de selección de un grupo dividida por la tasa de
selección del grupo más seleccionado. Bajo las Directrices Uniformes estadounidenses, un ratio por
debajo de cuatro quintos se trata generalmente como evidencia de impacto adverso [24]; la práctica
de ingeniería lo lee como un desencadenante de investigación, reportado con conteos e intervalo de
confianza. Véase
[cap. 16, La regla de cuatro quintos y el ratio de impacto adverso](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio).
(cap. 16)

**AESIA.** La Agencia Española de Supervisión de Inteligencia Artificial, un organismo estatal con
sede en A Coruña cuyo estatuto fue aprobado por Real Decreto 729/2023, creado para actuar como
autoridad supervisora nacional de España para el Reglamento de IA [1]. Véase
[cap. 21, España: AESIA, el espacio controlado de pruebas y un proyecto de ley](/bok/ai-laws-worldwide#spain-aesia-the-sandbox-and-a-bill).
(cap. 08, 21)

**Agente (IA agéntica).** Un sistema de IA que actúa (navega, ejecuta código, llama a APIs, mueve
datos o delega a otros agentes) bajo autoridad delegada, en lugar de solo producir texto. Los
agentes son el objeto más difícil de gobernar porque su comportamiento es emergente y sus acciones
tienen efectos externos. Véase
[cap. 23, Qué hace que un agente sea un objeto de gobernanza](/bok/governing-agents#what-makes-an-agent-a-governance-object);
[cap. 11, Sistemas agénticos](/bok/ai-defined#agentic-systems). (cap. 01, 11, 23)

**Ficha de agente.** El documento JSON que un agente A2A publica, generalmente en
`/.well-known/agent-card.json`, describiendo su identidad, habilidades, punto final de servicio y
los esquemas de autenticación que acepta. Puede estar firmado con JWS sobre una forma
canonicalizada, por lo que un cliente puede verificar que la ficha no ha sido alterada y proviene
del proveedor reclamado [129]. Una lista de permitidos de pares admite solo agentes registrados con
fichas verificadas. Véase
[cap. 23, Sistemas multiagente y cadenas de delegación](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(cap. 23)

**Registro de agentes.** El inventario consciente del tiempo de ejecución de cada actor no humano
(modelo, servicio y agente), cada uno con un propietario, un alcance declarado, un estado y un kill
switch, alimentado por una ruta de datos de tiempo de ejecución en lugar de ser escrito a mano. Es
el artefacto que responde a "¿qué IA se está ejecutando?". Véase
[cap. 23, El registro de agentes](/bok/governing-agents#the-agent-registry);
[cap. 05, Patrón: Registro de agentes](/bok/patterns#pattern-agent-registry). (cap. 04, 05, 06, 23)

**Reglamento de IA (UE).** Reglamento (UE) 2024/1689, la ley horizontal y escalonada por riesgo de
la UE para la IA, modificada por el Omnibus Digital [2]. Clasifica los sistemas por riesgo
(prohibido, alto riesgo, limitado, mínimo) e impone obligaciones en consecuencia. Véase
[cap. 18, El Reglamento y el Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (cap. 08, 18)

**Operador de negocio de IA (Corea).** Bajo la Ley Básica de IA de Corea, una persona jurídica,
organización, individuo u órgano estatal que realiza negocios de IA, dividido en operadores de
negocio de desarrollo, que desarrollan y proporcionan IA, y operadores de negocio de utilización,
que ofrecen productos o servicios construidos sobre ella [25]. Véase
[cap. 18, Los mismos roles en todos los regímenes](/bok/eu-ai-act#the-same-roles-across-regimes).
(cap. 18, 21)

**Comité de gobernanza de IA.** El órgano multifuncional que toma las decisiones que una puerta no
puede: aceptar riesgo residual por encima de la autoridad de un propietario de producto, otorgar
excepciones, sopesar compensaciones de valor y aprobar el conjunto de políticas. Decide; las puertas
del pipeline aplican sus decisiones y registran la evidencia. Las agencias federales estadounidenses
ejecutan tales juntas por mandato [26]. Véase
[cap. 12, El comité decide, las puertas aplican](/bok/governance-program#the-committee-decides-the-gates-enforce).
(cap. 12)

**Ingeniero de gobernanza de IA.** La persona que posee la capacidad de ingeniería de gobernanza de
IA y es responsable de las tres preguntas en producción; una capacidad y un rol, no necesariamente
un título de trabajo. Véase
[cap. 06, Capacidad primero, título segundo](/bok/the-role#capability-first-title-second). (cap. 06)

**Ingeniería de gobernanza de IA.** La aplicación de la práctica de ingeniería (pensamiento
sistémico, pensamiento de producto y código) a la gobernanza de sistemas de IA; medida por reducción
real del riesgo y evidencia lista para auditoría. Contrasta con
[IA de confianza](/glossary/trustworthy-ai). Véase
[cap. 01, La definición](/bok/definition#the-definition). (cap. 01)

**Daño de IA.** Una consecuencia negativa de construir o usar un sistema de IA para una persona, un
grupo, una organización, la sociedad o el medio ambiente. El libro nombra cada daño por el nivel en
el que cae, su mecanismo, un modo de fallo comprobable y el control que lo detecta, mapeado a la
taxonomía del MIT AI Risk Repository [27]. Véase [Atlas de daños](/resources/harms). (cap. 03)

**Peligro de IA.** En la definición de la OCDE, un evento o serie de eventos donde el desarrollo,
uso o mal funcionamiento de un sistema de IA podría plausiblemente llevar a un incidente de IA [28].
Un peligro es daño que aún no ha sucedido; un casi accidente es un peligro que un control
interrumpió. Contrasta con [Incidente de IA](/glossary/ai-incident). Véase
[cap. 17, Incidente, peligro, problema e incidente grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Incidente de IA.** En la definición de la OCDE, un evento o serie de eventos donde el desarrollo,
uso o mal funcionamiento de uno o más sistemas de IA conduce directa o indirectamente a daño a la
salud, infraestructura crítica, derechos humanos o fundamentales, propiedad, comunidades o el medio
ambiente [28]. Contrasta con [Problema (frente a incidente)](/glossary/issue-versus-incident),
[Peligro de IA](/glossary/ai-hazard) e [Incidente grave](/glossary/serious-incident). Véase
[cap. 17, Incidente, peligro, problema e incidente grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Alfabetización en materia de IA.** Bajo el Reglamento de IA de la UE, las habilidades,
conocimientos y comprensión que permiten a proveedores, responsables del despliegue y personas
afectadas usar IA de manera informada y comprender sus oportunidades, riesgos y posibles daños. El
artículo 4, modificado en 2026, requiere que proveedores y responsables del despliegue tomen medidas
para apoyarla, sin garantizar ningún nivel individual [2]. Véase
[cap. 18, Alfabetización en materia de IA y datos de detección de sesgos](/bok/eu-ai-act#ai-literacy-and-bias-detection-data);
[cap. 12, Alfabetización en materia de IA como código](/bok/governance-program#ai-literacy-as-code).
(cap. 12, 18)

**Oficina de IA.** El órgano de la Comisión Europea que supervisa la IA de uso general y coordina la
aplicación del Reglamento de IA, con poderes de investigación y la capacidad de imponer sanciones a
proveedores de GPAI [2]. Véase [cap. 18, Quién supervisa qué](/bok/eu-ai-act#who-supervises-what).
(cap. 08, 18)

**Espacio controlado de pruebas para la IA.** Bajo el Reglamento de IA de la UE, un marco controlado
establecido por una autoridad competente en el que los proveedores desarrollan, entrenan, prueban y
validan sistemas de IA innovadores durante un tiempo limitado bajo un plan de espacio controlado de
pruebas, posiblemente con pruebas en condiciones reales. Cada Estado miembro debe tener uno
operativo antes del 2 de agosto de 2027 [2]. Contrasta con
[Prueba en condiciones reales](/glossary/testing-in-real-world-conditions). Véase
[cap. 18, Espacios controlados de pruebas y pruebas en condiciones reales](/bok/eu-ai-act#sandboxes-and-real-world-testing).
(cap. 18, 21)

**Funciones de AI RMF.** Las cuatro funciones principales del Marco de Gestión de Riesgos de IA de
NIST (**Govern, Map, Measure, Manage**), utilizadas en todo el libro como objetivo de mapeo para
controles [3]. Véase
[cap. 22, El núcleo: 19 categorías](/bok/principles-and-standards#the-core-19-categories). (cap.
08, 22)

**Playbook de AI RMF.** El complemento en línea de NIST para el AI RMF. Para cada subcategoría
proporciona una nota Acerca de, acciones sugeridas, preguntas de transparencia y documentación y
referencias [29]. Es material voluntario para adaptar, no una lista de verificación; sus preguntas
de documentación funcionan bien como criterios de aceptación. Véase
[cap. 22, Cómo se estructura una entrada de Playbook](/bok/principles-and-standards#how-a-playbook-entry-is-structured).
(cap. 22)

**Perfil de AI RMF.** Una aplicación del AI RMF Core a un contexto. NIST describe perfiles de caso
de uso, perfiles temporales (un perfil actual y un perfil objetivo cuya brecha guía el trabajo) y
perfiles intersectoriales como NIST AI 600-1 para IA generativa [30]. Véase
[cap. 22, Perfiles y el Perfil de IA Generativa](/bok/principles-and-standards#profiles-and-the-generative-ai-profile).
(cap. 22)

**Sistema de IA.** Para la gobernanza, el objeto que la definición de IA pone en el alcance.
Conforme al Reglamento de IA de la UE, un sistema basado en máquinas diseñado para operar con cierta
autonomía, posiblemente adaptable tras el despliegue, que deduce de sus entradas cómo generar
salidas que pueden influir en entornos físicos o virtuales [2][21]. La deducción lo diferencia del
software basado en reglas. Véase
[cap. 11, Four definitions, compared](/bok/ai-defined#four-definitions-compared);
[cap. 18, What counts as an AI system](/bok/eu-ai-act#what-counts-as-an-ai-system). (cap. 11, 18)

**Evaluación de impacto del sistema de IA.** Una evaluación de cómo un sistema de IA y sus
aplicaciones razonablemente previsibles pueden afectar a individuos, grupos y la sociedad, realizada
a lo largo del ciclo de vida y actualizada según sea necesario; ISO/IEC 42005:2025 proporciona la
orientación [17]. Contrasta con [FRIA](/glossary/fria). Véase
[cap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(cap. 14)

**Ciclo de vida del sistema de IA (OCDE).** Las fases iterativas de la OCDE de un sistema de IA:
planificar y diseñar; recopilar y procesar datos; construir o adaptar modelos; probar, evaluar,
verificar y validar; desplegar; operar y monitorizar; retirar o desmantelar [31]. La retirada puede
ocurrir en cualquier momento durante la operación. Véase
[cap. 22, The OECD AI system definition and lifecycle](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle).
(cap. 22)

**Falsa publicidad de IA.** Exagerar o inventar el uso o la capacidad de IA en comunicaciones de
marketing o de inversores. Los reguladores estadounidenses lo tratan como engaño; la SEC resolvió
cargos contra dos asesores de inversión por tales afirmaciones en marzo de 2024 [32]. Véase
[cap. 20, Unfair and deceptive practices in the United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states);
[cap. 05, Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (cap. 05, 20)

**AIBOM.** Lista de materiales de IA: el inventario legible por máquina de los componentes de un
sistema de IA (modelos, conjuntos de datos, dependencias) en formatos como CycloneDX ML-BOM o el
perfil de IA de SPDX 3.0. Véase [cap. 05, Pattern: AIBOM](/bok/patterns#pattern-aibom). (cap.
04, 05)

**AICM.** La Matriz de Controles de IA de la CSA, un marco de control (v1.1, 247 objetivos de
control en 18 dominios) que se asigna a ISO 42001, ISO 27001 y NIST AI RMF y respalda STAR para IA
[4]. Véase [cap. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai).
(cap. 08)

**AIMA.** La Evaluación de Madurez de IA de OWASP, reportada en v1.0 (ago 2025), que califica la
amplitud de un programa de seguridad y gobernanza de IA en todos los dominios [5]. Véase
[cap. 07, How this relates to certification and other assessments](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments).
(cap. 07)

**AIMS.** Un sistema de gestión de IA: la estructura de gobernanza, roles, controles y bucle de
mejora continua que ISO/IEC 42001 certifica. Un AIMS no es el sistema de gestión de la calidad del
Artículo 17 del Reglamento de IA. Contrasta con [QMS (Art. 17)](/glossary/qms-art-17). Véase
[cap. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio).
(cap. 07, 08, 22)

**Decomiso algorítmico.** Un remedio que ordena la eliminación de modelos o algoritmos desarrollados
con datos obtenidos ilícitamente, no solo los datos en sí [33]. Cumplir y probarlo requiere
trazabilidad desde cada conjunto de datos hasta cada modelo entrenado con él. Véase
[cap. 20, Claims substantiation and algorithmic disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[cap. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (cap.
05, 20)

**Evaluación de Impacto Algorítmico (AIA).** La evaluación que la Directiva de Canadá sobre Toma de
Decisiones Automatizada requiere antes de que un sistema federal de decisión automatizada entre en
producción. Establece un nivel de impacto de I a IV que escala las salvaguardas requeridas, se
publica en el Portal de Gobierno Abierto y se actualiza cuando el sistema cambia [34]. Véase
[cap. 21, Canada: after AIDA, the Directive on Automated Decision-Making](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making);
[cap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(cap. 14, 21)

**Gestión algorítmica.** El uso de sistemas automatizados de monitorización y decisión para dirigir,
evaluar o sancionar a trabajadores. La Directiva de Plataformas de Trabajo de la UE limita los datos
que tales sistemas pueden procesar y requiere transparencia, supervisión humana y derecho a revisión
humana [35]. Véase [cap. 20, Employment](/bok/existing-law#employment). (cap. 20)

**Estándar de Registro de Transparencia Algorítmica (ATRS).** La plantilla estándar del Reino Unido
para que los organismos del sector público publiquen cómo y por qué utilizan herramientas
algorítmicas; obligatorio para departamentos gubernamentales y para organismos dependientes que
prestan servicios públicos o de primera línea [36]. Véase
[cap. 21, United Kingdom: principles, regulators and public-sector records](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records).
(cap. 21)

**ALTAI.** La Lista de Evaluación para IA Confiable, publicada por el Grupo de Expertos de Alto
Nivel de la UE sobre IA en julio de 2020: una lista de verificación de autoevaluación que convierte
los siete requisitos de las Directrices de Ética de 2019 en preguntas [37]. Útil como fuente de
controles candidatos; respondida una vez, es solo una atestación. Véase
[cap. 22, EU HLEG guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(cap. 11, 22)

**Anexo I (Reglamento de IA).** El anexo del Reglamento de IA que enumera la legislación de
armonización de la Unión bajo la cual la IA está integrada en productos regulados (maquinaria,
dispositivos médicos, juguetes y similares); las obligaciones para estos sistemas de alto riesgo
integrados se implementan a partir del 2 de agosto de 2028 conforme al calendario del Omnibus
Digital [2]. Contrasta con [Anexo III](/glossary/annex-iii). Véase
[cap. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(cap. 08, 18)

**Anexo III.** El anexo del Reglamento de IA que enumera casos de uso de alto riesgo (biometría,
infraestructura crítica, educación, empleo, servicios esenciales, garantía del cumplimiento del
Derecho, migración, justicia); las obligaciones para estos se implementan conforme al calendario del
Omnibus Digital [2]. Contrasta con [Anexo I (Reglamento de IA)](/glossary/annex-i-eu-ai-act). Véase
[cap. 18, High-risk through use (Annex III)](/bok/eu-ai-act#high-risk-through-use-annex-iii). (cap.
08, 18)

**Datos anónimos.** Información que no se relaciona con una persona identificable, juzgada contra
todos los medios razonablemente probables de ser utilizados por cualquiera para identificarla [38].
Cae fuera del RGPD, pero la afirmación decae a medida que los datos auxiliares y las técnicas de
reidentificación mejoran, por lo que necesita una evaluación fechada. Contrasta con
[Seudonimización](/glossary/pseudonymisation). Véase
[cap. 19, Anonymisation versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(cap. 19)

**Filtro del Artículo 6(3).** La derogación conforme a la cual un sistema del Anexo III no es de
alto riesgo cuando no presenta un riesgo significativo de daño y cumple una de cuatro condiciones
(tarea procesal estrecha, mejora del trabajo humano completado, detección de patrones, tarea
preparatoria). La definición de perfil de personas físicas siempre lo anula; el proveedor documenta
y registra la evaluación [2]. Contrasta con
[Anulación de definición de perfil](/glossary/profiling-override). Véase
[cap. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (cap. 18)

**ASI01–ASI10.** Los diez riesgos de OWASP Top 10 para Aplicaciones Agentic 2026 [6]: ASI01 Agent
Goal Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic
Supply Chain Vulnerabilities, ASI05 Unexpected Code Execution (RCE), ASI06 Memory & Context
Poisoning, ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI09 Human-Agent
Trust Exploitation y ASI10 Rogue Agents. Véase
[cap. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls);
[cap. 08, OWASP GenAI Security Project](/bok/regulatory-map#owasp-genai-security-project). (cap. 05,
08, 23)

**ATLAS.** El Panorama de Amenazas Adversariales para Sistemas de Inteligencia Artificial de MITRE,
una base de conocimientos de tácticas y técnicas de adversarios contra IA, incluyendo técnicas
específicas de agentes [7]. Véase
[cap. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[cap. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls). (cap. 05,
10, 15, 23)

**Evidencia lista para auditoría.** Evidencia emitida como subproducto de la construcción en una
forma que un auditor puede leer directamente (legible por máquina, firmada, con marca de tiempo), de
modo que la auditoría es una consulta, no un proyecto de recopilación. Véase
[cap. 01, Three clarifiers](/bok/definition#three-clarifiers). (cap. 01, 04)

**Representante autorizado.** Conforme al Reglamento de IA de la UE, una persona establecida en la
Unión con un mandato escrito de un proveedor no comunitario de un sistema de IA de alto riesgo o
modelo de IA de uso general para llevar a cabo las obligaciones de ese proveedor en su nombre,
incluyendo mantener la documentación disponible para las autoridades [2]. Véase
[cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Toma de decisiones automatizada (ADM).** Una decisión sobre una persona tomada por medios
automatizados. El Artículo 22 del RGPD restringe las decisiones basadas únicamente en el
procesamiento automatizado con efectos legales o similarmente significativos [38]; tras la sentencia
SCHUFA, una puntuación que los prestamistas tratan como determinante es en sí misma tal decisión
[39]. Véase
[cap. 19, GDPR Article 22 after SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa). (cap.
16, 19)

**Sesgo de automatización.** La tendencia de una persona a confiar excesivamente en la salida de un
sistema automatizado. El Artículo 14 del Reglamento de IA de la UE pide que las personas que
supervisen sistemas de alto riesgo permanezcan conscientes de ello [2]; la puerta humana registra
aprobador, tiempo para decidir y tasa de anulación de modo que la supervisión degradada sea visible.
Véase [cap. 11, Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier);
[cap. 04, Designing human oversight (Article 14)](/bok/the-stack#designing-human-oversight-article-14);
[cap. 23, What a good approval looks like](/bok/governing-agents#what-a-good-approval-looks-like).
(cap. 04, 11, 23)

**Autonomía.** En el Reglamento de IA de la UE y textos de la OCDE, cierto grado de independencia de
acción de la implicación humana, que casi todo sistema de IA tiene. ISO/IEC 22989 utiliza la palabra
para una propiedad mucho más fuerte, un sistema que puede cambiar su propio objetivo o dominio de
uso, y llama al caso ordinario automatización [40]. Contrasta con
[Nivel de autonomía](/glossary/autonomy-level). Véase
[cap. 11, ISO/IEC 22989](/bok/ai-defined#isoiec-22989). (cap. 11, 23)

**Nivel de autonomía.** Hasta qué punto un agente actúa sin una persona entre sus pasos, establecido
por el responsable del despliegue como una decisión de diseño en lugar de tomarse como una propiedad
del modelo; una escala de investigación nombra cinco niveles por el rol del usuario, desde operador
a observador [122]. Es un campo de registro vinculado a un conjunto de control mínimo, y elevarlo es
un cambio revisado. Contrasta con [Autonomía](/glossary/autonomy). Véase
[cap. 23, Autonomy is a design decision](/bok/governing-agents#autonomy-is-a-design-decision). (cap.
15, 17, 23)

## B

**Sesgo.** Un error sistemático que favorece o desventaja a algunas personas o resultados. NIST
clasifica el sesgo de IA en tres categorías: sistémico, estadístico y computacional, y humano [41].
El sesgo puede entrar en cualquier etapa del ciclo de vida, por lo que se prueba por etapa en lugar
de una sola vez. Contrasta con [Equidad](/glossary/fairness). Véase
[cap. 16, Where bias enters the lifecycle](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle).
(cap. 16)

**Auditoría de sesgo (Ley Local 144 de Nueva York).** Una auditoría independiente, requerida dentro
del año anterior a que un empleador utilice una herramienta de decisión laboral automatizada en
Nueva York, que informa de las tasas de selección o puntuación y ratios de impacto por sexo, raza y
etnia e intersecciones; su resumen debe publicarse [42]. Véase
[cap. 20, Empleo](/bok/existing-law#employment);
[cap. 14, Evaluaciones de impacto comparadas](/bok/governing-development#impact-assessments-compared).
(cap. 14, 20)

**Datos biométricos.** Datos personales del procesamiento técnico de características físicas,
fisiológicas o conductuales que permite o confirma la identificación única de una persona, como
imágenes faciales o huellas dactilares [38]. La identificación, verificación y categorización se
tratan de forma diferente en el RGPD, el Reglamento de IA y otras leyes. Véase
[cap. 19, Biometría](/bok/privacy-and-ai#biometrics). (cap. 19)

**Post-mortem sin culpa.** Una revisión de incidentes que identifica causas contribuyentes sin
incriminar a ningún individuo o equipo, partiendo de la premisa de que las personas actuaron
razonablemente con lo que sabían y que los sistemas y procesos son lo que puede corregirse [43]. Sus
disparadores se establecen con anticipación. Véase [cap. 17, Técnicas](/bok/incidents#techniques).
(cap. 17)

**Despliegue azul-verde.** Dos entornos de producción idénticos con tráfico conmutado entre ellos,
de modo que un lanzamiento puede revertirse conmutando hacia atrás [44]. Proporciona a un sistema de
IA una ruta probada e instantánea a la versión anterior. Contrasta con
[Lanzamiento canario](/glossary/canary-release). Véase
[cap. 15, Entrega progresiva como control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Patrón: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 15)

**Procedencia de compilación (SLSA).** Un registro verificable, en formato SLSA, de qué compiló un
artefacto, por qué proceso y desde qué entradas de nivel superior. Sus niveles de compilación van
desde L1, la procedencia existe, pasando por L2, firmado por una plataforma de compilación alojada,
hasta L3, compilaciones endurecidas cuya procedencia es muy difícil de falsificar [136]. Para un
modelo, las entradas incluyen el resumen del modelo base y registros de admisión de conjuntos de
datos. Contrasta con [Firma de modelo](/glossary/model-signing). Véase
[cap. 05, Patrón: Model Artefact Integrity](/patterns/model-artefact-integrity). (cap. 05)

## C

**CAC (Administración del Ciberespacio de China).** El regulador de internet de China (国家互联网信息办公室),
principal emisor de las normas de IA vinculantes (recomendación algorítmica, síntesis profunda,
servicios de IA generativa y etiquetado de contenido de IA) y el organismo bajo cuya orientación
TC260 publica el Marco de Gobernanza de Seguridad de IA [18]. Véase
[cap. 21, China: lo que el capítulo 08 no cubre ya](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(cap. 08, 21)

**Calibración.** La propiedad de que la confianza de un modelo coincida con su precisión: de los
casos puntuados con 0,9, aproximadamente nueve de cada diez son correctos. Las redes neuronales
modernas a menudo están mal calibradas [45], por lo que la calibración se mide en la puerta de eval
por versión y subgrupo antes de que se confíe en ningún umbral. Contrasta con
[Calibración dentro de grupos](/glossary/calibration-within-groups). Véase
[cap. 11, Calibración antes de umbrales](/bok/ai-defined#calibration-before-thresholds). (cap. 11)

**Calibración dentro de grupos.** La propiedad de equidad de que, en cada grupo, las personas con
una puntuación s resultan positivas a una tasa s, de modo que una puntuación significa lo mismo para
todos. Generalmente entra en conflicto con tasas de error iguales cuando las tasas base difieren
[46]. Contrasta con [Calibración](/glossary/calibration) y
[Probabilidades ecualizadas](/glossary/equalised-odds). Véase
[cap. 16, Los resultados de imposibilidad](/bok/fairness-and-explainability#the-impossibility-results).
(cap. 16)

**Lanzamiento canario.** Un despliegue parcial y limitado en tiempo de un cambio a una pequeña parte
del tráfico de producción, evaluado contra un grupo de control antes de que continúe el lanzamiento
[47]. Para sistemas de IA, la evaluación compara métricas de calidad, seguridad y equidad en vivo
con criterios de reversión preregistrados. Contrasta con
[Despliegue en la sombra](/glossary/shadow-deployment) y
[Despliegue azul-verde](/glossary/blue-green-deployment). Véase
[cap. 15, Entrega progresiva como control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Patrón: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 14, 15, 23)

**CAPA.** Acción correctiva y preventiva, el resultado de una revisión de incidentes. La acción
correctiva corrige esta instancia; la acción preventiva evita que la clase de fallo se repita en
toda la flota, típicamente como una eval de regresión, un cambio de política y una actualización del
registro de riesgos, verificada antes de que se cierre el incidente [48]. Véase
[cap. 17, CAPA: del incidente al registro de riesgos y suite de evals](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite).
(cap. 17)

**Olvido catastrófico.** La tendencia de las redes neuronales a perder competencia anterior cuando
se entrenan en nuevas tareas [49]. Es una razón por la que cada reentrenamiento es un evento de
cambio que vuelve a ejecutar la suite de eval completa, no solo las pruebas de la nueva capacidad.
Véase
[cap. 11, Ocho características que rompen la gobernanza clásica de TI](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(cap. 11)

**Anulación de severidad catastrófica.** La regla de que cualquier escenario calificado en el nivel
de severidad superior es Crítico independientemente de su probabilidad, no puede ser aceptado por el
equipo de entrega y debe ser eliminado, reducido en severidad o aceptado explícitamente por el
órgano de gobierno por un período fijo. NIST pide que tales riesgos puedan cesarse de forma segura
[30]. Véase
[cap. 13, La anulación de severidad catastrófica](/bok/risk-management#the-catastrophic-severity-override).
(cap. 13)

**Marcado CE.** La marca que muestra la conformidad de un sistema de IA de alto riesgo con el
Reglamento de IA de la UE, colocada de forma visible, legible e indeleble, o digitalmente para
sistemas proporcionados digitalmente, con el número del organismo notificado donde uno estuvo
involucrado [2]. Contrasta con
[Declaración de conformidad de la UE](/glossary/eu-declaration-of-conformity). Véase
[cap. 18, Evaluación de conformidad, declaración, marcado y registro](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[cap. 14, Conformidad del Reglamento de IA de la UE, en orden](/bok/governing-development#eu-ai-act-conformity-in-order).
(cap. 14, 18)

**Cedar.** Un lenguaje de política de código abierto para autorización de grano fino, utilizado como
motor de política como código para decisiones de acceso en tiempo de ejecución; una alternativa
tipificada por esquema y analizable a `OPA/Rego`. Contrasta con [OPA/Rego](/glossary/opa-rego).
Véase [cap. 06, Política como código y puertas](/bok/the-role#policy-as-code-and-gates). (cap. 04,
05, 06)

**CEN-CENELEC JTC 21.** El comité técnico conjunto de los organismos de normalización europeos CEN y
CENELEC que redacta las normas armonizadas del Reglamento de IA, incluida EN 18286 sobre gestión de
la calidad y los borradores sobre gestión de riesgos, confiabilidad y ciberseguridad [50]. Véase
[cap. 22, El programa JTC 21](/bok/principles-and-standards#the-jtc-21-programme). (cap. 22)

**CIMD.** Documento de metadatos de ID de cliente: el mecanismo por el cual un cliente OAuth se
identifica con una URL, utilizada como su ID de cliente, que apunta a su documento de metadatos. La
especificación MCP de 2026-07-28 tiene clientes y servidores de autorización que lo soportan y
depreca el Registro Dinámico de Clientes [8]; la especificación IETF sigue siendo un Internet-Draft
(revisión 02, 6 de julio de 2026) a partir de 2026-09-24 [132]. Véase
[cap. 23, Autorización MCP a partir de 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28);
[cap. 04, Capa 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 04, 05, 23)

**Registro de afirmaciones.** El registro de cada declaración pública sobre la precisión, equidad,
seguridad o capacidad de un sistema de IA: la redacción exacta, dónde aparece, y la ejecución de
eval, valor medido, intervalo y población detrás de ella. La copia que lleva una afirmación cuya
evidencia falta, está obsoleta o falla no se publica; la FTC requiere evidencia competente y
confiable para tales afirmaciones cuando se hacen [139]. Véase
[cap. 20, Sustanciación de afirmaciones y disgorgement algorítmico](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[cap. 05, Patrón: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (cap. 05, 20)

**Registro de decisión de clasificación.** Un registro de registro versionado de por qué un sistema
se sitúa en un peldaño dado de la escalera de riesgos del Reglamento de IA: el punto del Anexo III,
cualquier condición del Artículo 6(3) en la que se confía, una bandera de elaboración de perfiles
explícita, el revisor y la fecha [2]. Se reevalúa cada vez que cambia la finalidad prevista.
Contrasta con [Anulación de elaboración de perfiles](/glossary/profiling-override). Véase
[cap. 18, El filtro del Anexo III y la anulación de elaboración de perfiles](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: Triaje de rol y clase de riesgo del Reglamento de IA de la UE](/toolkit/ai-act-triage).
(cap. 18)

**Especificaciones comunes.** Especificaciones técnicas que la Comisión puede adoptar por acto de
ejecución conforme al Artículo 41 del Reglamento de IA cuando una solicitud de normalización no es
aceptada, las normas llegan tarde o abordan insuficientemente preocupaciones de derechos
fundamentales; conformarse con ellas también da una presunción de conformidad [2]. Contrasta con
[Norma armonizada](/glossary/harmonised-standard). Véase
[cap. 22, Cómo funciona la presunción de conformidad](/bok/principles-and-standards#how-presumption-of-conformity-works).
(cap. 22)

**Desviación de concepto.** Un cambio en la relación entre las entradas de un sistema y la salida
correcta, de modo que la misma entrada ahora debería obtener una respuesta diferente [51]. A
diferencia de la desviación de datos, se muestra solo en resultados: en producción aparece en el
rendimiento en etiquetas frescas y en pruebas de punto de cambio en la tasa de error. Contrasta con
[Desviación de datos](/glossary/data-drift). Véase
[cap. 11, Pares de contraste](/bok/ai-defined#contrast-pairs);
[cap. 15, Desviación: qué se mueve y cómo verlo](/bok/governing-deployment#drift-what-moves-and-how-to-see-it).
(cap. 11, 15)

**Predicción conforme.** Un método libre de distribución que convierte la salida de un modelo
entrenado en un conjunto de respuestas candidatas que contiene la correcta con una probabilidad
elegida [20]. Un conjunto grande señala incertidumbre que una regla de gobernanza puede enrutar.
Véase [cap. 11, Calibración antes de umbrales](/bok/ai-defined#calibration-before-thresholds).
(cap. 11)

**Evaluación de la conformidad.** El procedimiento por el cual un proveedor demuestra que un sistema
de IA de alto riesgo cumple con el Reglamento de IA de la UE antes de colocarlo en el mercado:
control interno para la mayoría de sistemas del Anexo III, un organismo notificado para algunos
sistemas biométricos, y el procedimiento sectorial para productos del Anexo I [2]. Precede a la
declaración, marcado CE y registro. Véase
[cap. 18, Evaluación de conformidad, declaración, marcado y registro](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[cap. 14, Conformidad del Reglamento de IA de la UE, en orden](/bok/governing-development#eu-ai-act-conformity-in-order).
(cap. 14, 18)

**Procedencia de contenido (C2PA).** Información firmada y a prueba de manipulaciones sobre de dónde
vino un contenido y cómo fue editado, vinculada al activo. La especificación C2PA lo empaqueta como
un manifiesto de afirmaciones, una afirmación y una firma de afirmación [52]; NIST trata el
seguimiento de procedencia como un enfoque para la transparencia de contenido sintético [53].
Contrasta con [Marca de agua](/glossary/watermarking) y
[Procedencia de datos](/glossary/data-provenance). Véase
[cap. 20, Deepfakes y medios sintéticos](/bok/existing-law#deepfakes-and-synthetic-media). (cap.
18, 20)

**Ruta de contestación.** La vía por la que una persona afectada por una decisión automatizada llega
a un revisor que no tomó la decisión original, ve las entradas, las razones y las representaciones
de la persona, y puede cambiar el resultado, con el resultado escrito de nuevo en el registro de
decisiones. Es cómo se honra en la práctica el derecho de contestación del artículo 22(3) del RGPD
[38]. Contrasta con [Contestabilidad](/glossary/contestability). Véase
[cap. 19, Artículo 22 del RGPD después de SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa);
[cap. 05, Patrón: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (cap. 05,
19, 22)

**Contestabilidad.** La capacidad de una persona afectada por una decisión apoyada en IA de
impugnarla y obtener una respuesta que pueda cambiarla. El artículo 22(3) del RGPD otorga un derecho
de contestación únicamente para decisiones totalmente automatizadas [38], y los principios de la
OCDE piden que las personas afectadas negativamente puedan impugnar un resultado [31]. Contrasta con
[Recurso](/glossary/recourse) y [Ruta de contestación](/glossary/contest-path). Véase
[cap. 16, Los ganchos legales para explicaciones](/bok/fairness-and-explainability#the-legal-hooks-for-explanations);
[cap. 05, Patrón: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (cap. 05,
12, 16)

**Aseguramiento continuo.** Aseguramiento producido continuamente a partir de telemetría en lugar de
en un momento puntual; el estado del control es una consulta en vivo, no una aprobación anual. Es el
nivel 5 del modelo de madurez. Véase
[cap. 05, Patrón: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry).
(cap. 04, 05, 07)

**Factor contribuyente.** Una propiedad de un sistema o su contexto (autonomía, exposición,
reversibilidad, grupos vulnerables, sensibilidad de datos, opacidad) que mueve la probabilidad o
severidad de un riesgo sin crearlo [30]. Se captura como campos de registro en la admisión para que
una política pueda calcular el nivel. Contrasta con [Fuente de riesgo](/glossary/risk-source). Véase
[cap. 13, Factores contribuyentes y el perfil de riesgo del caso de uso](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile).
(cap. 13)

**Responsable del tratamiento y encargado del tratamiento.** Bajo el RGPD, el responsable del
tratamiento decide los fines y medios del tratamiento y asume la mayoría de obligaciones; el
encargado del tratamiento actúa conforme a sus instrucciones documentadas [38]. Un proveedor de IA
que sirve tu inferencia es normalmente un encargado del tratamiento, pero se convierte en
responsable del tratamiento para cualquier uso de tus datos que decida, como el entrenamiento.
Contrasta con [Subencargado del tratamiento](/glossary/sub-processor). Véase
[cap. 19, Responsable del tratamiento, encargado del tratamiento o responsables conjuntos](/bok/privacy-and-ai#controller-processor-or-joint-controller).
(cap. 19)

**Explicación contrafáctica.** Una explicación que establece el cambio más pequeño en la entrada que
habría cambiado el resultado, restringido a características que la persona realmente puede cambiar
[54]. Es la base natural para el recurso. Contrasta con
[Equidad contrafáctica](/glossary/counterfactual-fairness). Véase
[cap. 16, Explicaciones contrafácticas](/bok/fairness-and-explainability#counterfactual-explanations).
(cap. 16)

**Equidad contrafáctica.** El requisito de que una decisión sobre un individuo sea la misma en un
mundo contrafáctico donde el individuo perteneciera a un grupo diferente, definido a través de un
modelo causal [55]; aproximado en la práctica por pruebas de cambio contrafáctico. Contrasta con
[Explicación contrafáctica](/glossary/counterfactual-explanation) y
[Prueba de cambio contrafáctico](/glossary/counterfactual-flip-test). Véase
[cap. 16, Equidad individual y contrafáctica](/bok/fairness-and-explainability#individual-and-counterfactual-fairness).
(cap. 16)

**Prueba de cambio contrafáctico.** Una prueba que cambia solo un atributo protegido en una entrada,
o intercambia términos de identidad en indicaciones por lo demás idénticas, y mide con qué
frecuencia cambian el resultado o la calidad de la respuesta. Es la aproximación práctica de la
equidad contrafáctica [55] y se ejecuta en la suite de eval de equidad. Contrasta con
[Equidad contrafáctica](/glossary/counterfactual-fairness). Véase
[cap. 16, Equidad individual y contrafáctica](/bok/fairness-and-explainability#individual-and-counterfactual-fairness);
[cap. 05, Patrón: Fairness Eval Suite](/patterns/fairness-eval-suite). (cap. 05, 16)

## D

**Ficha de datos.** Documentación estructurada y versionada de un conjunto de datos (procedencia,
base legal, derechos, composición y limitaciones conocidas) mantenida como código junto al sistema.
Contrasta con [Datasheet for datasets](/glossary/datasheet-for-datasets). Véase
[cap. 04, Gobernanza de datos en el stack](/bok/the-stack#data-governance-across-the-stack).
(cap. 04)

**Cambio de datos.** Un cambio en la distribución de las entradas que un sistema ve en producción en
relación con los datos en los que fue validado, como un nuevo segmento de clientes o un formulario
anterior modificado [51]. Se muestra en las entradas antes de que llegue cualquier etiqueta, por lo
que se monitorea directamente. Contrasta con [Cambio de concepto](/glossary/concept-drift). Véase
[cap. 11, Pares de contraste](/bok/ai-defined#contrast-pairs). (cap. 11, 15)

**Linaje de datos.** El registro de cómo los datos se movieron y cambiaron a través de los pipelines
de una organización. El linaje hacia atrás muestra qué alimentó un modelo; el linaje hacia adelante
muestra qué modelos usaron un conjunto de datos, qué solicitudes de supresión y retiros de licencia
se necesitan. OpenLineage es un estándar abierto para emitirlo [56]. Contrasta con
[Procedencia de datos](/glossary/data-provenance). Véase
[cap. 14, Procedencia versus linaje](/bok/governing-development#provenance-versus-lineage).
(cap. 14)

**Minimización de datos.** El principio del RGPD de que los datos personales deben ser adecuados,
relevantes y limitados a lo que el fin necesita [38]. Para IA se argumenta característica por
característica, aplicado a snapshots de entrenamiento, índices de recuperación, registros y
conjuntos de eval, y evidenciado por justificaciones de características y registros de filtros.
Véase
[cap. 19, Minimización, privacidad por diseño y PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(cap. 19)

**Procedencia de datos.** Información sobre las entidades, actividades y personas implicadas en la
producción de datos, utilizada para juzgar su calidad y confiabilidad [57]. En la práctica: de dónde
vino originalmente un conjunto de datos y en qué términos (fuente, licencia, base legal). Un linaje
perfecto sobre procedencia desconocida sigue siendo ingobernado. Contrasta con
[Linaje de datos](/glossary/data-lineage). Véase
[cap. 14, Procedencia versus linaje](/bok/governing-development#provenance-versus-lineage);
[cap. 12, Actualización de las políticas que ya tienes](/bok/governance-program#updating-the-policies-you-already-have).
(cap. 12, 14)

**Puerta de admisión de conjuntos de datos.** Un control de pipeline que permite que un trabajo de
entrenamiento lea solo conjuntos de datos cuyo registro de admisión está completo y firmado por el
propietario de los datos: base legal o licencia, comprobaciones de reserva, resultados de calidad,
procedencia, usos permitidos y retención. Evidencia las prácticas de gobernanza de datos del
artículo 10 del Reglamento de IA [2]. Véase
[cap. 14, Propietarios, administradores y la puerta de admisión](/bok/governing-development#owners-stewards-and-the-admission-gate);
[cap. 05, Patrón: Dataset Admission Gate](/patterns/dataset-admission-gate). (cap. 05, 14)

**Datasheet for datasets.** Documentación que acompaña a un conjunto de datos con su motivación,
composición, proceso de recopilación, preprocesamiento, usos, distribución y mantenimiento, como
propusieron Gebru y colegas [58]; el complemento legible por humanos del registro de admisión del
conjunto de datos y la ficha de datos. Contrasta con [Ficha de datos](/glossary/data-card). Véase
[cap. 14, Fichas de modelo, fichas de sistema y datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets).
(cap. 14)

**Aviso de decisión.** El aviso que una persona recibe en el momento de una decisión automatizada o
asistida por IA, renderizado a partir de una plantilla versionada y el registro de decisiones: que
se utilizó un sistema, las razones principales y qué puede hacer la persona y cuándo. El contenido
sigue cada régimen, como el aviso de uso bajo el artículo 26(11) del Reglamento de IA o razones bajo
la Regulación B de EE.UU. [2][23]. Contrasta con
[Aviso de acción adversa](/glossary/adverse-action-notice). Véase
[cap. 18, Obligaciones del responsable de la implantación (Artículo 26)](/bok/eu-ai-act#deployer-duties-article-26);
[cap. 05, Patrón: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (cap. 05,
08, 18)

**Umbral de decisión.** La puntuación por encima o por debajo de la cual una salida de IA
desencadena una acción. Es donde el apetito de riesgo se convierte en comportamiento, por lo que se
rige como una política con propietario, versión y fecha efectiva, se prueba en la puerta de eval y
se registra con cada decisión; el Reglamento de IA pide métricas de precisión declaradas [2]. Véase
[cap. 11, Una puntuación no es una decisión](/bok/ai-defined#a-score-is-not-a-decision). (cap. 11)

**Desmantelamiento.** La retirada planificada de un sistema de IA: análisis de dependencias,
alternativa y transición, avisos de puesta en marcha, una snapshot final de evidencia, archivo o
eliminación de pesos y datos, revocación de cada identidad, y una entrada de registro marcada como
retirada en lugar de eliminada. NIST pide que los sistemas se retiren de forma segura [29]. Véase
[cap. 15, Retirada y desmantelamiento](/bok/governing-deployment#retirement-and-decommissioning);
[cap. 05, Patrón: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(cap. 05, 15)

**Ultrasuplantación.** Bajo el Reglamento de IA de la UE, una ultrasuplantación es contenido de
imagen, audio o vídeo generado o manipulado por IA que se asemeja a personas, objetos, lugares,
entidades o eventos existentes y parecería falsamente auténtico a una persona; los responsables de
la implantación deben divulgarlo, con obligaciones más ligeras para arte o sátira evidente [2].
Contrasta con [Procedencia de contenido (C2PA)](/glossary/content-provenance-c2pa). Véase
[cap. 20, Ultrasuplantaciones y medios sintéticos](/bok/existing-law#deepfakes-and-synthetic-media);
[cap. 18, Casos de transparencia (Artículo 50)](/bok/eu-ai-act#transparency-cases-article-50). (cap.
18, 20)

**Delegación (intercambio de tokens OAuth).** En RFC 8693, el modo en el que una parte actúa por
otra mientras ambas permanecen identificables: el token nombra el sujeto y, en su reclamación act,
el actor actual, con reclamaciones act anidadas para actores anteriores [123]. Bajo suplantación el
actor se vuelve indistinguible del sujeto. Un agente debe mantener un token delegado y más estrecho,
nunca el propio del usuario. Contrasta con [Cadena de delegación](/glossary/delegation-chain) y
[Paso de token](/glossary/token-passthrough). Véase
[cap. 23, Delegación sin suplantación](/bok/governing-agents#delegation-without-impersonation).
(cap. 23)

**Cadena de delegación.** La secuencia de agentes por la que pasa una tarea desde la persona o
sistema que la inició. Se rige para que cada salto se autentique como sí mismo, el alcance se
estreche o permanezca igual pero nunca se amplíe, el propósito viaja con la tarea, la profundidad y
la ramificación están limitadas, y un rastro abarca cada salto. Contrasta con
[Delegación (intercambio de tokens OAuth)](/glossary/delegation-oauth-token-exchange). Véase
[cap. 23, Responsabilidad entre saltos](/bok/governing-agents#accountability-across-hops). (cap. 23)

**Paridad demográfica.** Un criterio de equidad grupal que se cumple cuando la tasa de decisiones
positivas es igual entre grupos; la razón de impacto adverso es su forma de razón. Ignora
diferencias en tasas base [59]. Contrasta con [Probabilidades igualadas](/glossary/equalised-odds).
Véase
[cap. 16, Métricas de equidad grupal](/bok/fairness-and-explainability#group-fairness-metrics).
(cap. 16)

**Responsable de la implantación.** Bajo el Reglamento de IA de la UE, quien utiliza un sistema de
IA bajo su propia autoridad, distinto de en una actividad puramente personal y no profesional [2].
Para sistemas de alto riesgo sigue las instrucciones de uso, dota de personal la supervisión,
monitorea, mantiene registros, informa a las personas afectadas y, en casos enumerados, realiza la
EIPD. La etiqueta nombra una tarea, no una clase de organización. Contrasta con
[Proveedor](/glossary/provider). Véase
[cap. 18, Los roles de operador de la UE](/bok/eu-ai-act#the-eu-operator-roles);
[cap. 18, Obligaciones del responsable de la implantación (Artículo 26)](/bok/eu-ai-act#deployer-duties-article-26).
(cap. 15, 18)

**Registro de Decisión de Despliegue (DDR).** El artefacto que registra la decisión de desplegar un
sistema de IA: objetivo, las personas sobre las que actúa, espacio negativo, nivel de riesgo y
obligaciones, umbrales de rendimiento por grupo, condiciones de retirada, propietario y aprobador.
Se compromete con el código del sistema; sus umbrales se convierten en umbrales de eval gate. Véase
[cap. 15, The Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record).
(cap. 15)

**Defecto de diseño.** En responsabilidad civil de productos, un defecto inherente al diseño de cada
unidad, juzgado por las expectativas del consumidor o ponderando el riesgo frente a la utilidad
[60]. Para IA: condiciones de funcionamiento no probadas, un guardrail faltante o supervisión
faltante cuando una alternativa más segura era razonablemente disponible. Contrasta con
[Defecto de fabricación](/glossary/manufacturing-defect). Véase
[cap. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(cap. 20)

**Privacidad diferencial.** Una garantía matemática que limita cuánto el registro de una sola
persona puede cambiar la salida de un análisis o un modelo entrenado, ajustado por un presupuesto de
privacidad. Su fortaleza depende del presupuesto y de las opciones de implementación que NIST llama
riesgos de privacidad [61]. Véase
[cap. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(cap. 19)

**Ómnibus Digital.** El paquete de reforma de 2026 que modifica el Reglamento de IA de la UE (en
vigor 27 jul 2026), que ajustó la cronología de alto riesgo, añadió poderes de investigación de la
Oficina de IA y reformuló varios artículos [2]. Véase
[cap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (cap. 08, 18)

**Impacto dispar.** Una práctica aparentemente neutral que afecta más duramente a un grupo
protegido. Bajo el Título VII estadounidense el empleador debe demostrar que la práctica está
relacionada con el trabajo y es coherente con la necesidad empresarial, y pierde si rechaza una
alternativa menos discriminatoria [62]. El equivalente de la UE es discriminación indirecta.
Contrasta con [Trato dispar](/glossary/disparate-treatment) e
[Discriminación indirecta](/glossary/indirect-discrimination). Véase
[cap. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact);
[cap. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(cap. 16, 20)

**Trato dispar.** Tratar a una persona menos favorablemente por una característica protegida como
raza, sexo o edad, incluyendo a través de una característica o regla que deliberadamente la
sustituye [62]. El equivalente de la UE es discriminación directa [63]. Contrasta con
[Impacto dispar](/glossary/disparate-impact). Véase
[cap. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact);
[cap. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(cap. 16, 20)

**Distribuidor.** Bajo el Reglamento de IA de la UE, una persona en la cadena de suministro,
distinta del proveedor o del importador, que comercializa un sistema de IA en el mercado de la
Unión. Comprueba el marcado y los documentos y retiene los sistemas de alto riesgo que cree que no
cumplen [2]. Contrasta con [Importador](/glossary/importer). Véase
[cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Representante doméstico (Corea).** Una persona con domicilio u oficina en Corea a la que un
operador de negocio de IA extranjero por encima de los umbrales fijados por decreto debe designar
por escrito. Presenta resultados de seguridad, presenta solicitudes de confirmación de alto impacto
y apoya las medidas de alto impacto [25][64]. Véase
[cap. 21, Domestic representative](/bok/ai-laws-worldwide#domestic-representative). (cap. 21)

**Modificador posterior (GPAI).** Un actor que ajusta finamente o modifica el modelo de IA de uso
general de otro proveedor. Las directrices de la Comisión lo hacen proveedor del modelo modificado
solo cuando la modificación utiliza más de un tercio del cálculo de entrenamiento original; sus
`Art. 53(1)` deberes entonces cubren la modificación, pero un modelo modificado de riesgo sistémico
se presume que mantiene ese riesgo y sus deberes [65][76]. Contrasta con
[Proveedor posterior](/glossary/downstream-provider). Véase
[cap. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider);
[cap. 18, When a fine-tuner becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(cap. 15, 18)

**Proveedor posterior.** Bajo el Reglamento de IA de la UE, el proveedor de un sistema de IA que
integra un modelo de IA, el suyo propio o uno suministrado por otra entidad. Se basa en la
información del modelo que los proveedores de modelos de IA de uso general deben entregar a los
proveedores posteriores [2]. Contrasta con
[Modificador posterior (GPAI)](/glossary/downstream-modifier-gpai). Véase
[cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Registro de uso posterior.** El registro de cada consumidor de las salidas de un sistema de IA (un
sistema, equipo, socio o tubería de entrenamiento), cada uno con su uso aprobado, la re-prueba que
autorizó las salidas para ese contexto y cualquier contrato, mantenido contra la entrada del
registro del sistema productor. El acceso se otorga por consumidor registrado, y un cambio de modelo
o retirada se notifica a todos ellos. Véase
[cap. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm);
[cap. 05, Pattern: Downstream Use Register](/patterns/downstream-use-register). (cap. 05, 15)

**EIPD.** Evaluación de Impacto relativa a la Protección de Datos: la evaluación del artículo 35 del
RGPD del tratamiento probable que resulte en riesgo alto para los individuos [38]}, mantenida en
esta disciplina como un artefacto versionado, no un documento único. Contrasta con
[FRIA](/glossary/fria). Véase
[cap. 19, The DPIA for AI systems](/bok/privacy-and-ai#the-dpia-for-ai-systems). (cap. 04, 05, 19)

**Desviación.** La divergencia gradual de las entradas, salidas o rendimiento de un modelo desde su
línea base validada a lo largo del tiempo; una señal en tiempo de ejecución que un control o eval
debe detectar. Los dos tipos a distinguir son desviación de datos, en las entradas, y desviación de
concepto, en la relación entrada-respuesta. Contrasta con
[Desviación de datos](/glossary/data-drift) y [Desviación de concepto](/glossary/concept-drift).
Véase
[cap. 15, Drift: what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it);
[cap. 05, Pattern: Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[cap. 17, AI-specific failure modes](/bok/incidents#ai-specific-failure-modes). (cap. 04, 05, 11,
15, 16, 17)

**Uso dual.** La capacidad de la misma capacidad de IA para servir fines dañinos así como legítimos,
por ejemplo un modelo de toxicidad invertido para proponer moléculas tóxicas [66]. Se responde con
modelos de amenaza de mal uso, casos de red team para usos dañinos de capacidad legítima y detección
en tiempo de ejecución. Véase
[cap. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(cap. 11)

**Titular de obligación.** A quién una obligación vincula legalmente (bajo el Reglamento de IA de la
UE, el proveedor, el responsable del despliegue o ambos), como distinto de quién la ejecuta; el
capítulo 08 lleva una columna de titular de obligación para que un ingeniero pueda decir qué
artefactos su organización es responsable de producir. Véase
[cap. 18, Who you are in the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain). (cap.
08, 18)

## E

**Cuestionamiento efectivo.** Análisis crítico de un modelo por expertos objetivos con la
experiencia, independencia y posición organizativa para forzar cambio. El término viene de la guía
de riesgo de modelo estadounidense, ahora SR 26-2 [67], y se toma prestado para validación
independiente de sistemas de IA. Véase
[cap. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management).
(cap. 14)

**EN 18286.** La norma europea para el sistema de gestión de la calidad del artículo 17 del
Reglamento de IA, publicada por CEN-CENELEC en julio de 2026 (la primera norma JTC 21 del Reglamento
de IA en alcanzar publicación), pero aún no citada en el Diario Oficial a partir de 2026-09-24, por
lo que no confiere presunción de conformidad [10]. Véase
[cap. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (cap. 08, 22)

**Probabilidades equalizadas.** Un criterio de equidad de grupo que se cumple cuando las tasas de
verdadero positivo y falso positivo son ambas iguales entre grupos; la igualdad de oportunidades es
la versión más débil que iguala solo las tasas de verdadero positivo [68]. Contrasta con
[Paridad demográfica](/glossary/demographic-parity). Véase
[cap. 16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics).
(cap. 16)

**Declaración de conformidad de la UE.** La declaración firmada del proveedor, siguiendo el Anexo V
del Reglamento de IA, de que un sistema de IA de alto riesgo cumple los requisitos del Reglamento;
elaborada después de la evaluación de la conformidad y conservada durante 10 años [2]. Contrasta con
[Marcado CE](/glossary/ce-marking). Véase
[cap. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration).
(cap. 18)

**Eval gate.** Una etapa de tubería que falla la compilación cuando una eval falla; el mecanismo que
convierte una evaluación en un control ejecutado en lugar de un informe. Véase
[cap. 05, Pattern: Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci). (cap. 04, 05)

**Evals.** Pruebas automatizadas del comportamiento de un modelo o agente (capacidad, seguridad y
adversarial), ejecutadas como controles, no como investigación única. Véase
[cap. 04, Layer 03: Evals & Red Teaming as Evidence](/bok/the-stack#layer-03-evals--red-teaming-as-evidence).
(cap. 04)

**Evals como evidencia.** El principio de que la ejecución de eval *es* la evidencia de
aseguramiento: una eval fallida bloquea la compilación y su resultado estructurado se almacena como
prueba de que el control se activó. Véase
[cap. 03, 2. Evals fail builds; reviews only recommend](/bok/values-and-principles#2-evals-fail-builds-reviews-only-recommend).
(cap. 03, 04)

**Registro de evidencia.** El registro firmado y estructurado que un control escribe cada vez que
decide: qué control, sobre qué versión del sistema, qué decidió, contra qué métrica, umbral y
obligación, en qué entrada, cuándo y por quién. Una forma para cada control permite que una
auditoría se ejecute como una consulta sobre un almacén [69]. Véase
[cap. 05, Pattern: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry);
[Templates and schemas](/resources/templates). (cap. 05)

**Registro de excepciones.** Una lista controlada por versión de excepciones aprobadas, cada una
vinculada a una regla y un sistema, con justificación, controles compensatorios, aprobador y
vencimiento. El motor de política la lee, por lo que una versión puede pasar bajo una excepción en
vivo, el veredicto lo dice, y la regla falla de nuevo una vez que la excepción vence. Contrasta con
[Registro de riesgos](/glossary/risk-register). Véase
[cap. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(cap. 12)

**Explicabilidad.** En el marco de NIST, una representación de los mecanismos detrás de la operación
de un sistema: cómo se tomó una decisión [30]. En la práctica una explicación por decisión como
atribuciones de características, códigos de razón o un contrafáctico. Contrasta con
[Transparencia](/glossary/transparency) e [Interpretabilidad](/glossary/interpretability). Véase
[cap. 16, Transparency, interpretability and explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[cap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (cap. 11, 16)

**Registro de explicación.** El artefacto de evidencia para una decisión explicada: versión del
modelo, método de explicación y versión, línea base, códigos de razón, contrafáctico, plantilla,
audiencia y entrega, escrito en el momento de la decisión para que la explicación pueda reproducirse
cuando una persona invoca un derecho a explicación [2]. Véase
[cap. 16, Explanation artefacts as evidence records](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records);
[cap. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (cap. 05, 16)

## F

**Postura ante fallos.** Lo que hace un guardrail, un agente guardián o una puerta de enlace de
herramientas cuando no puede llegar a una decisión: fallar abierto deja pasar la llamada, fallar
cerrado la bloquea. El guardián de referencia del Estándar de Control de Agentes de OWASP comienza
en proceder a menos que se establezca en denegar [127]. La postura es una decisión de gobernanza,
establecida por clase de operación y registrada en la Ficha de Política del agente. Véase
[cap. 23, Guardrails en tiempo de ejecución para llamadas a herramientas](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(cap. 23)

**Incumplimiento del deber de advertencia.** En responsabilidad civil de productos, un defecto en
las instrucciones o advertencias sobre peligros no obvios [60]. Para IA: limitaciones no divulgadas
o usos fuera del alcance, por lo que las fichas de modelo e instrucciones de uso se versionan con
cada lanzamiento. Véase
[cap. 20, Deber de advertencia tras actualizaciones](/bok/existing-law#duty-to-warn-after-updates).
(cap. 20)

**Uso legítimo.** La defensa del derecho de autor estadounidense que pondera cuatro factores:
propósito y transformación, naturaleza de la obra, cantidad utilizada y efecto en el mercado [70].
Los tribunales la aplican a casos de entrenamiento de IA caso por caso; los resultados hasta ahora
dependen de cómo se adquirieron los datos y de cada registro. Contrasta con
[excepción TDM](/glossary/tdm-exception). Véase
[cap. 20, Casos de entrenamiento estadounidenses, fechados](/bok/existing-law#us-training-cases-dated).
(cap. 20)

**Equidad.** La propiedad de que los resultados y errores de un sistema no desventajen
injustificadamente a personas o grupos. NIST enumera «equitativo, con sesgo perjudicial gestionado»
entre sus características de confiabilidad [30]; en la práctica, la equidad es una métrica elegida y
registrada (grupal, individual o contrafáctica) con un umbral, no una afirmación general. Contrasta
con [Sesgo](/glossary/bias). Véase
[cap. 16, Elegir una métrica de equidad por caso de uso](/bok/fairness-and-explainability#choosing-a-fairness-metric-by-use-case).
(cap. 16)

**Manipulación de equidad.** El fallo en el que un modelo satisface una restricción de equidad en
cada grupo predefinido pero la viola en subgrupos definidos por combinaciones de atributos [71]; la
razón por la que se necesita prueba interseccional. Véase
[cap. 16, Prueba interseccional y de subgrupos](/bok/fairness-and-explainability#intersectional-and-subgroup-testing).
(cap. 16)

**Política de equidad.** El registro por sistema, fijado antes de ver resultados, de qué significa
equidad para ese sistema: los atributos protegidos en cada jurisdicción y de dónde proceden sus
valores, la métrica elegida y por qué, el umbral, el tamaño mínimo de celda, la corrección de
comparaciones múltiples y el aprobador. La suite de eval de equidad se juzga contra ella. Contrasta
con [Equidad](/glossary/fairness). Véase
[cap. 16, Equidad y explicabilidad en el stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack);
[cap. 05, Patrón: Suite de Eval de Equidad](/patterns/fairness-eval-suite). (cap. 05, 16)

**Aprendizaje federado.** Entrenamiento de un modelo en dispositivos o sitios donde residen los
datos, compartiendo actualizaciones de modelo en lugar de registros sin procesar [72]. Limita el
movimiento de datos pero no oculta por sí mismo datos personales, porque las actualizaciones
compartidas pueden filtrar ejemplos de entrenamiento. Véase
[cap. 19, Tecnologías que mejoran la privacidad y sus límites honestos](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(cap. 19)

**Ajuste fino.** Entrenamiento adicional de un modelo existente en nuevos datos para adaptarlo a una
tarea o dominio. Cambia el modelo, por lo que es un evento de cambio con sus propias evals; para
modelos de IA de uso general, la Comisión trata un modificador como proveedor solo por encima de un
tercio del cálculo de entrenamiento original [65]. Véase
[cap. 15, Cómo se adapta](/bok/governing-deployment#how-it-is-adapted);
[cap. 18, Cuándo un ajustador se convierte en proveedor de IA de uso general](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(cap. 15, 18)

**Modelo fundacional.** Un modelo entrenado en datos amplios a escala y adaptable a una amplia gama
de tareas posteriores [73]. Sus defectos son heredados por cada sistema construido sobre él, por lo
que las organizaciones que llaman o adaptan uno recopilan la evidencia del proveedor y gestionan la
versión fijada como un cambio. Contrasta con [IA de uso general](/glossary/gpai) y
[Modelo fronterizo](/glossary/frontier-model). Véase
[cap. 11, Modelos fundacionales e IA de uso general](/bok/ai-defined#foundation-models-and-gpai).
(cap. 11)

**Regla de cuatro quintos.** La regla práctica de las Directrices Uniformes estadounidenses de que
una tasa de selección de grupo por debajo del 80% de la tasa del grupo más alto generalmente se
considerará evidencia de impacto adverso, calificada por significancia estadística y práctica [24].
No es un puerto seguro: las brechas más pequeñas aún pueden contar. Véase
[cap. 16, La regla de cuatro quintos y la razón de impacto adverso](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
[cap. 20, Medidas de equidad que la ley reconoce](/bok/existing-law#fairness-measures-the-law-recognises).
(cap. 16, 20)

**Convención Marco sobre IA (CETS n.º 225).** El tratado del Consejo de Europa sobre IA y derechos
humanos, democracia y estado de derecho, abierto a la firma en septiembre de 2024. Vincula a sus
Partes, que deciden cómo llegar a actores privados, y pide gestión de riesgos e impacto y remedios
[74]. Véase
[cap. 22, Convención Marco del Consejo de Europa (CETS n.º 225)](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225).
(cap. 22)

**Mapeo de marcos.** Una asignación de los controles de un marco a los de otro; útil como índice,
pero un mapeo demuestra que leíste el marco, no que el control asignado funcione. Véase
[cap. 05, Patrón: Framework Crosswalk](/bok/patterns#pattern-framework-crosswalk). (cap. 05, 08)

**FRIA.** Evaluación de Impacto en Derechos Fundamentales: la evaluación del artículo 27 de la Ley
de IA del impacto de un sistema de alto riesgo en derechos [2], mantenida aquí como un artefacto
versionado y revisable. Contrasta con [EIPD](/glossary/dpia) y
[evaluación de impacto del sistema de IA](/glossary/ai-system-impact-assessment). Véase
[cap. 18, Evaluación de impacto en derechos fundamentales (artículo 27)](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27);
[cap. 05, Patrón: FRIA como Código](/bok/patterns#pattern-fria-as-code). (cap. 04, 05, 18)

**Modelo fronterizo.** Un modelo de uso general en o cerca de la frontera de capacidades. Las leyes
trazan la línea por cálculo de entrenamiento: la SB 53 de California, por ejemplo, cubre modelos
entrenados con más de 10^26 operaciones [14]. Las leyes de desarrolladores fronterizos piden un
marco de seguridad publicado e informes de incidentes [12]. Contrasta con
[Modelo fundacional](/glossary/foundation-model). Véase
[cap. 21, Procedencia, datos de entrenamiento y desarrolladores fronterizos](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers);
[cap. 08, Leyes de desarrolladores fronterizos](/bok/regulatory-map#frontier-developer-laws). (cap.
08, 21)

**Registro de cumplimiento.** El registro por solicitud de cómo se honró una solicitud de titular de
datos dondequiera que residan sus datos, desde sistemas de origen, instantáneas, índices de
recuperación, registros y conjuntos de eval hasta pesos de modelo: la acción en cada uno, las
versiones de modelo afectadas, cualquier reentrenamiento programado y si se cumplió el plazo de la
RGPD de un mes, prorrogable por dos [38]. Véase
[cap. 19, Registro de cómo se honró una solicitud](/bok/privacy-and-ai#recording-how-a-request-was-honoured);
[cap. 05, Patrón: Solicitudes de Derechos Contra Modelos](/patterns/rights-requests-against-models).
(cap. 05, 08, 19)

**Expansión de funciones.** La reutilización gradual de datos personales o un sistema de IA para
propósitos que nadie aprobó, generalmente por configuración en lugar de un nuevo lanzamiento. Para
datos personales incumple la limitación de propósito a menos que una evaluación de compatibilidad o
una nueva base cubra el nuevo uso [38]; el espacio negativo en el registro de despliegue lo hace
detectable. Véase
[cap. 19, Limitación de propósito y expansión de funciones](/bok/privacy-and-ai#purpose-limitation-and-function-creep);
[cap. 15, Uso secundario y daño posterior](/bok/governing-deployment#secondary-use-and-downstream-harm);
[cap. 05, Patrón: Registro de Uso Posterior](/patterns/downstream-use-register). (cap. 05, 14,
15, 19)

## G

**IA generativa.** IA que genera nuevo contenido (texto, imágenes, audio, vídeo, código) en lugar de
una estimación sobre algo que existe. Sus riesgos distintivos incluyen confabulación, integridad de
la información, propiedad intelectual y contenido sintético abusivo [75]; su evidencia es
fundamentación, rechazo y evals de equipo rojo y marcado de contenido. Contrasta con
[IA predictiva](/glossary/predictive-ai). Véase
[cap. 11, Predictiva versus generativa](/bok/ai-defined#predictive-versus-generative). (cap. 11)

**Decisión de adelante/no adelante.** La decisión de lanzamiento firmada para una versión de
sistema, tomada por roles de revisor nombrados contra una lista de verificación cuyos elementos cada
uno vinculan el registro que los responde. NIST lo enmarca como la determinación de si el desarrollo
o despliegue debe proceder [30]; la tubería despliega solo en adelante. Véase
[cap. 14, La puerta de adelante/no adelante](/bok/governing-development#the-gono-go-gate). (cap. 14)

**Gobernanza como código.** Reglas de gobernanza expresadas como código ejecutable que evalúa
solicitudes de extracción, despliegues y llamadas en tiempo de ejecución y devuelve una decisión; el
término paraguas del cual política como código es el subconjunto de CI/CD. Contrasta con
[Política como código](/glossary/policy-as-code). Véase
[cap. 04, Capa 01: Gobernanza como Código](/bok/the-stack#layer-01-govern-as-code). (cap. 03, 04)

**IA de uso general.** Modelo de IA de uso general: bajo la Ley de IA, un modelo que muestra
generalidad significativa, puede realizar competentemente una amplia gama de tareas distintas y
puede integrarse en muchos sistemas posteriores [2]. El criterio indicativo de la Comisión es
cálculo de entrenamiento por encima de 10^23 FLOP [76]. La Oficina de IA hace cumplir los deberes de
IA de uso general desde el 2 de agosto de 2026. Contrasta con
[Modelo fundacional](/glossary/foundation-model). Véase
[cap. 18, Modelos de IA de uso general](/bok/eu-ai-act#general-purpose-ai-models);
[cap. 11, Modelos fundacionales e IA de uso general](/bok/ai-defined#foundation-models-and-gpai).
(cap. 08, 11, 18)

**Código de Prácticas de IA de Uso General.** El instrumento voluntario (publicado el 10 de julio
de 2025) que los proveedores de IA de uso general utilizan para demostrar cumplimiento con sus
obligaciones de la Ley de IA hasta que existan normas armonizadas; tres capítulos: Transparencia,
Derechos de Autor y Seguridad (el último para modelos de riesgo sistémico) [16]. Véase
[cap. 08, Código de Prácticas de IA de Uso General](/bok/regulatory-map#gpai-code-of-practice);
[cap. 18, El Código de Prácticas y cumplimiento](/bok/eu-ai-act#the-code-of-practice-and-enforcement).
(cap. 08, 18)

**Degradación gradual.** Modos operativos preconstruidos y probados cortos de apagar un sistema de
IA: solo asesoramiento, umbrales de confianza elevados, respuestas solo fundamentadas,
deshabilitación para un grupo, idioma o región, y un retorno a la cohorte piloto. Cada uno es un
conmutador operacional con un disparador nombrado [77]. Contrasta con
[Interruptor de parada](/glossary/kill-switch). Véase
[cap. 15, Degradación gradual](/bok/governing-deployment#graduated-degradation);
[cap. 05, Patrón: Runbook de Desactivación, Localización y Jubilación](/patterns/deactivation-localisation-retirement-runbook).
(cap. 05, 15, 23)

**Agente guardián.** Un agente de IA cuyo trabajo es supervisar, verificar o restringir otros
agentes en tiempo de ejecución; Gartner predice que las tecnologías de agente guardián representarán
al menos el 10 a 15% de los mercados de IA agéntica para 2030 [9]. Contrasta con
[Guardrail](/glossary/guardrail). Véase
[cap. 04, Capa 04: Controles en Tiempo de Ejecución y Observabilidad](/bok/the-stack#layer-04-runtime-controls--observability);
[cap. 23, Guardrails en tiempo de ejecución para llamadas a herramientas](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(cap. 04, 23)

**Guardrail.** Un control en tiempo de ejecución que inspecciona o media las entradas, salidas o
llamadas a herramientas de un modelo o agente y bloquea, reescribe o escala lo que incumple una
política, registrando cada decisión como evidencia. Los guardrails son código determinista o
clasificadores en la ruta de llamada, a diferencia de un agente guardián, que es en sí mismo un
sistema de IA. Contrasta con [Agente guardián](/glossary/guardian-agent). Véase
[cap. 05, Patrón: Guardrail en Tiempo de Ejecución](/bok/patterns#pattern-runtime-guardrail);
[cap. 23, Guardrails en tiempo de ejecución para llamadas a herramientas](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(cap. 04, 05, 23)

## H

**Alucinación.** Salida generativa que se afirma con confianza pero es falsa o no está respaldada
por sus fuentes; el perfil de IA generativa del NIST la denomina confabulación y la enumera entre
los riesgos que la IA generativa crea o agrava [75]. Las comprobaciones de fundamentación y citas
son la evidencia habitual contra ella. Contrasta con [Regurgitación](/glossary/regurgitation). Véase
[cap. 17, Modos de fallo específicos de IA](/bok/incidents#ai-specific-failure-modes);
[cap. 11, Predictiva frente a generativa](/bok/ai-defined#predictive-versus-generative). (cap.
11, 17)

**Norma armonizada.** Una norma europea adoptada a solicitud de normalización de la Comisión.
Conforme al Reglamento de IA, la conformidad con una cuya referencia se publica en el Diario Oficial
presume la conformidad con los requisitos que cubre; la publicación únicamente por CEN-CENELEC no lo
hace [2]. A partir de 2026-09-24, ninguna está aún citada [10]. Contrasta con
[Especificaciones comunes](/glossary/common-specifications) y
[Estructura armonizada (ISO)](/glossary/harmonized-structure-iso). Véase
[cap. 22, Cómo funciona la presunción de conformidad](/bok/principles-and-standards#how-presumption-of-conformity-works).
(cap. 08, 22)

**Estructura armonizada (ISO).** La disposición de cláusulas comunes y el texto central compartidos
por normas de sistemas de gestión ISO como ISO/IEC 42001, 27001 y 27701 e ISO 9001, que permiten que
un sistema de gestión integrado cumpla varios de ellos [78]. No debe confundirse con una norma
armonizada de la UE. Contrasta con [Norma armonizada](/glossary/harmonised-standard). Véase
[cap. 22, Integración con 27001, 27701 y 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001).
(cap. 22)

**Exposición de contexto oculto.** LLM08:2026 en el OWASP LLM Top 10, que sustituyó a Fuga de
indicación del sistema: extracción, inferencia o reconstrucción del contexto oculto que ve un
modelo, como indicaciones del sistema, instrucciones de desarrolladores, texto de política
recuperado y esquemas de herramientas [128]. El consejo es asumir que el contexto oculto es
descubrible, mantener las credenciales fuera de él y nunca confiar en él como límite de seguridad.
Contrasta con [Inyección de prompts](/glossary/prompt-injection). Véase
[cap. 23, Prompts como configuración bajo control de cambios](/bok/governing-agents#prompts-as-configuration-under-change-control).
(cap. 23)

**IA de alto impacto (Corea).** Conforme a la Ley Básica de IA de Corea, un sistema de IA que puede
afectar significativamente a la vida, la seguridad física o los derechos fundamentales y se utiliza
en un área enumerada como sanidad, contratación y evaluación de préstamos, análisis biométrico,
transporte o decisiones de servicios públicos. Activa obligaciones de gestión de riesgos,
explicación, supervisión humana y conservación de registros [25]. Contrasta con
[Sistema de IA de alto riesgo](/glossary/high-risk-ai-system). Véase
[cap. 21, IA de alto impacto y cómo se confirma](/bok/ai-laws-worldwide#high-impact-ai-and-how-it-is-confirmed).
(cap. 21)

**Sistema de IA de alto riesgo.** Conforme al Reglamento de IA de la UE, un sistema de IA que es un
componente de seguridad de, o es en sí mismo, un producto conforme a la legislación del Anexo I que
requiere evaluación de conformidad por terceros, o que se utiliza en un área del Anexo III, a menos
que se aplique el filtro del artículo 6(3). Lleva los requisitos de los artículos 8 a 15 y
obligaciones de proveedor y responsable del despliegue [2]. Contrasta con
[Práctica prohibida](/glossary/prohibited-practice),
[IA de alto impacto (Corea)](/glossary/high-impact-ai-korea) y
[Nivel de riesgo](/glossary/risk-tier). Véase
[cap. 18, La escalera de riesgos](/bok/eu-ai-act#the-risk-ladder). (cap. 18)

**Código de conducta de Hiroshima.** El Código internacional voluntario de conducta de los países
del G7 para organizaciones que desarrollan sistemas avanzados de IA (octubre de 2023): 11 acciones
que cubren evaluación de riesgos del ciclo de vida, acompañamiento posterior al despliegue,
información pública, intercambio de incidentes, políticas de gobernanza, seguridad, procedencia y
protección de datos [79]. Véase
[cap. 22, Proceso de Hiroshima del G7](/bok/principles-and-standards#g7-hiroshima-process).
(cap. 22)

**Declaración de espera.** Una breve declaración pública preparada en esqueleto antes de cualquier
incidente: qué sucedió en la medida en que se conoce, qué se ha hecho para contenerlo, qué deben
hacer las personas afectadas y cuándo llegará la próxima actualización. Nunca especula sobre la
causa. Véase [cap. 15, Comunicaciones externas](/bok/governing-deployment#external-communications);
[cap. 05, Patrón: Canalización de divulgación y notificación](/patterns/disclosure-notification-pipeline).
(cap. 05, 15)

**HUDERIA.** La metodología no vinculante del Consejo de Europa para evaluar los riesgos e impactos
de los sistemas de IA en los derechos humanos, la democracia y el estado de derecho [80]. Las partes
en el Convenio marco pueden utilizarla o adaptarla. Véase
[cap. 22, Lo que el Convenio pide y lo que cambia en el stack](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack).
(cap. 22)

**Supervisión humana.** Las medidas que permiten a las personas físicas comprender, monitorizar y,
cuando sea necesario, anular o detener un sistema de IA de alto riesgo, requeridas por el artículo
14 del Reglamento de IA, incluida la conciencia del sesgo de automatización y una forma de detener
el sistema de forma segura [2]. Diseñada como puertas, herramientas de revisión y simulacros de
anulación que dejan registros. Véase
[cap. 04, Diseño de supervisión humana (artículo 14)](/bok/the-stack#designing-human-oversight-article-14);
[cap. 23, Cómo se ve una buena aprobación](/bok/governing-agents#what-a-good-approval-looks-like).
(cap. 04, 11, 23)

**Humano en mando (HIC).** El modo de supervisión, nombrado por el Grupo de expertos de alto nivel
de la UE, en el que las personas supervisan la actividad general de un sistema de IA y deciden
cuándo y si utilizarlo en una situación determinada [81]. Contrasta con
[Humano en el bucle (HOTL)](/glossary/human-on-the-loop-hotl). Véase
[cap. 11, De elemento de definición a campo de registro](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11)

**Humano en el bucle (HITL).** El modo de supervisión en el que una persona puede intervenir en cada
ciclo de decisión de un sistema de IA [81]; en términos de ingeniería, una puerta que retiene cada
acción consecuente hasta que un aprobador designado decide, registrando aprobador, tiempo para
decidir y anulación. Contrasta con [Humano en el bucle (HOTL)](/glossary/human-on-the-loop-hotl).
Véase [cap. 05, Patrón: Puerta de humano en el bucle](/bok/patterns#pattern-human-in-the-loop-gate);
[cap. 11, De elemento de definición a campo de registro](/bok/ai-defined#from-definition-element-to-registry-field);
[cap. 23, Puntos de control humano y diseño de aprobación](/bok/governing-agents#human-checkpoints-and-approval-design).
(cap. 05, 11, 23)

**Humano en el bucle (HOTL).** El modo de supervisión en el que una persona puede intervenir en el
ciclo de diseño y monitoriza la operación del sistema, en lugar de aprobar cada decisión [81]. El
sistema actúa; las personas observan las señales y pueden detenerlo, por lo que la ruta de parada y
las alertas son lo que debe probarse. Contrasta con
[Humano en el bucle (HITL)](/glossary/human-in-the-loop-hitl) y
[Humano en mando (HIC)](/glossary/human-in-command-hic). Véase
[cap. 11, De elemento de definición a campo de registro](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11)

## I

**Denegación implícita.** La regla de autorización que una solicitud que ninguna política permite
explícitamente es rechazada. Cedar deniega por defecto y permite que cualquier prohibición
coincidente anule cada permiso [141]; la lista de permitidos de herramientas de un agente funciona
de la misma manera, por lo que una herramienta no enumerada se bloquea sin una regla propia. Véase
[cap. 23, La lista de permitidos de herramientas](/bok/governing-agents#the-tool-allow-list);
[Toolkit: Constructor de ficha de política](/toolkit/policy-card#pc-engines). (cap. 08, 23)

**Importador.** Conforme al Reglamento de IA de la UE, una persona establecida en la Unión que
introduce en el mercado un sistema de IA que lleva el nombre o marca comercial de un proveedor
establecido fuera de la Unión. Debe verificar el trabajo de conformidad del proveedor antes de
introducir un sistema de alto riesgo en el mercado [2]. Contrasta con
[Distribuidor](/glossary/distributor). Véase
[cap. 18, Los roles de operador de la UE](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Discriminación indirecta.** El equivalente de la UE del impacto desproporcionado: un criterio
aparentemente neutral que coloca a un grupo protegido en una desventaja particular, ilegal a menos
que esté objetivamente justificado por un objetivo legítimo perseguido por medios apropiados y
necesarios [63]. Contrasta con [Impacto desproporcionado](/glossary/disparate-impact). Véase
[cap. 20, Trato discriminatorio, impacto desproporcionado y proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(cap. 20)

**Inferencia (sentido Reglamento de IA).** La capacidad de derivar salidas de entradas mediante
aprendizaje a partir de datos o razonamiento sobre conocimiento codificado, en lugar de ejecutar
reglas que las personas escribieron. La Comisión la trata como la condición indispensable que separa
un sistema de IA del software convencional [21]. Véase
[cap. 11, Artículo 3(1) del Reglamento de IA de la UE y directrices de la Comisión](/bok/ai-defined#eu-ai-act-article-31-and-the-commission-guidelines).
(cap. 11)

**Datos sensibles inferidos.** Información sensible que un sistema deriva de entradas ordinarias
(salud de compras, creencias de comportamiento) o lleva a través de una característica proxy. La Ley
de mis datos de salud de Washington cubre datos de salud derivados por algoritmos o aprendizaje
automático [82]; las pruebas de proxy y las políticas de inferencia lo hacen verificable. Contrasta
con [Datos de categoría especial](/glossary/special-category-data). Véase
[cap. 19, Datos sensibles inferidos y proxy](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data).
(cap. 19)

**Riesgo inherente.** La calificación de probabilidad y gravedad de un escenario de riesgo antes de
que se cuente ningún control. La brecha entre riesgo inherente y residual es el valor reclamado para
los controles, y debe estar respaldada por su evidencia [30]. Contrasta con
[Riesgo residual](/glossary/residual-risk). Véase
[cap. 13, Riesgo inherente, riesgo residual y quién lo acepta](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(cap. 13)

**Instrucciones de uso.** La información que un proveedor de un sistema de IA de alto riesgo debe
dar a los responsables del despliegue: finalidad prevista, precisión y robustez declaradas, riesgos
conocidos, cómo leer la salida, medidas de supervisión humana, mantenimiento y registro [2]. Mejor
generada a partir de la entrada de registro y el informe de prueba, para que los números coincidan
con la evidencia. Véase
[cap. 14, El fichero técnico](/bok/governing-development#the-technical-file). (cap. 14, 18)

**Finalidad prevista.** El uso para el que el proveedor pretende un sistema de IA, incluido su
contexto específico y condiciones de uso [2]. La mayoría de obligaciones de alto riesgo se miden
contra ella, por lo que es un campo del registro de caso de uso que la clasificación, las pruebas y
las instrucciones de uso leen. Un modelo trasladado a un nuevo propósito es, para riesgo, un nuevo
sistema. Contrasta con
[Uso indebido razonablemente previsible](/glossary/reasonably-foreseeable-misuse). Véase
[cap. 14, El registro de caso de uso](/bok/governing-development#the-use-case-record);
[cap. 11, De elemento de definición a campo de registro](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11, 14)

**Canal de denuncia interna.** Una ruta confidencial para que el personal y los contratistas
planteen preocupaciones sobre sistemas de IA fuera de la cadena de mando, con plazos estatutarios
codificados (conforme a la Directiva de denunciantes de la UE, reconocimiento dentro de siete días y
retroalimentación dentro de tres meses) y protección contra represalias [83]. Véase
[cap. 12, Un canal para plantear preocupaciones](/bok/governance-program#a-channel-for-raising-concerns).
(cap. 12)

**Interpretabilidad.** En el marco del NIST, el significado de la salida de un sistema en el
contexto de su propósito: por qué se tomó una decisión y qué significa para el usuario {[30]. Un
modelo inherentemente interpretable, como una tarjeta de puntuación o un árbol poco profundo, es su
propia explicación. Contrasta con [Explicabilidad](/glossary/explainability). Véase
[cap. 16, Transparencia, interpretabilidad y explicabilidad](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[cap. 16, Interpretable por diseño o explicado después del hecho](/bok/fairness-and-explainability#interpretable-by-design-or-explained-after-the-fact).
(cap. 16)

**ISO/IEC 22989.** La norma ISO/IEC (2022) que establece conceptos y terminología de IA para uso por
otras normas y por diversos interesados {[40]. Nombrar campos de registro según su vocabulario
reduce la traducción al auditar contra la familia SC 42. Véase
[cap. 22, Fundamentos y vocabulario](/bok/principles-and-standards#foundations-and-vocabulary).
(cap. 11, 22)

**ISO/IEC 42001.** La norma ISO/IEC (2023) que especifica los requisitos para un sistema de gestión
de IA, certificable por organismos acreditados [48]. A partir de 2026-09-24 no es una norma
armonizada conforme al Reglamento de IA, por lo que la certificación no presume conformidad [10].
Véase
[cap. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio);
[cap. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006). (cap.
07, 08, 22)

**ISO/IEC 42005.** ISO/IEC 42005:2025, la norma de evaluación de impacto de sistemas de IA
(complementaria al artículo 27 FRIA del Reglamento de IA y al Anexo A.5 de ISO/IEC 42001), que
proporciona un método estructurado para evaluar los impactos de un sistema de IA en las personas y
la sociedad [17]. Véase
[cap. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006);
[cap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(cap. 08, 14)

**Incidencia (frente a incidente).** Un defecto, desviación o debilidad de control que no ha
producido un evento dañino, como una regresión de eval en staging o una alerta de drift. Se registra
hasta su cierre con un responsable y una fecha de vencimiento y no inicia ningún plazo legal; la
mayoría de incidencias son no conformidades en términos de sistema de gestión [48]. Contrasta con
[AI incident](/glossary/ai-incident). Véase
[cap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

## J

**Jailbreak.** Un prompt diseñado para que un modelo ignore completamente sus instrucciones de
seguridad. OWASP trata el jailbreak como una forma de inyección de prompts [84]; se prueba con
suites de red team en la eval gate y se contiene en tiempo de ejecución mediante guardrails que no
dependen de los propios rechazos del modelo. Contrasta con
[Prompt injection](/glossary/prompt-injection). Véase
[cap. 14, The test-type matrix](/bok/governing-development#the-test-type-matrix). (cap. 14, 17)

**JSON Schema.** Un vocabulario para describir la estructura de documentos JSON de modo que un
validador pueda verificarlos: qué campos existen, cuáles son obligatorios, sus tipos y valores
permitidos [85]. La biblioteca de plantillas publica un esquema draft 2020-12 por cada registro de
gobernanza, de modo que un registro valida o falla la compilación. Véase
[cap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal);
[Templates and schemas](/resources/templates). (cap. 05)

**Memo de justificación.** El registro de intake para un caso de uso de IA: el problema, la
alternativa sin IA, el beneficio medible, quién soporta los errores y cómo los impugnan,
reversibilidad y criterios de parada. Responde a «¿debe usarse IA en absoluto?» antes de que un
sistema llegue a una gate, la determinación go/no-go que NIST sitúa al principio [30]. Véase
[cap. 12, Strategy, value and whether to use AI at all](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all).
(cap. 12)

## K

**Indicador clave de riesgo (KRI).** Una métrica que muestra si un riesgo se está moviendo hacia el
límite del apetito (IA no registrada encontrada, excepciones abiertas por antigüedad, tasas de
anulación), a diferencia de un indicador clave de desempeño, que muestra si el programa está
cumpliendo su función. Véase
[cap. 12, KPIs and KRIs for leadership and the board](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
(cap. 12)

**Kill switch.** Un mecanismo probado para detener a un agente o sistema de actuar; una precondición
para otorgar autonomía, registrada contra la identidad del agente. Contrasta con
[Graduated degradation](/glossary/graduated-degradation). Véase
[cap. 05, Pattern: Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker);
[cap. 23, Kill switch and per-agent circuit breakers](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers).
(cap. 03, 05, 23)

## L

**Modelo de lenguaje grande (LLM).** Un modelo fundacional para lenguaje, normalmente servido desde
un centro de datos detrás de una API. Porque las llamadas pasan a través de una gateway, los
controles en tiempo de ejecución (trazado, filtrado, parada) pueden situarse centralmente [86].
Contrasta con [Small language model (SLM)](/glossary/small-language-model-slm). Véase
[cap. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (cap. 11)

**Divulgación latente.** Conforme a la Ley de Transparencia de IA de California, información de
procedencia incrustada en imágenes, vídeos o audio generados por IA de modo que persista y pueda ser
leída por una herramienta de detección, a diferencia de una etiqueta visible mostrada al usuario
[87]. Contrasta con [Watermarking](/glossary/watermarking). Véase
[cap. 21, Provenance, training data and frontier developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers).
(cap. 21)

**Base legal.** Una de las seis bases del artículo 6 del RGPD que hacen lícito el tratamiento de
datos personales: consentimiento, contrato, obligación legal, intereses vitales, tarea pública e
intereses legítimos [38]. Para IA, cada momento de tratamiento (entrenamiento, recuperación,
inferencia, registro) necesita su propia base, registrada por conjunto de datos y etapa. Véase
[cap. 19, Lawful basis for training versus inference](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference).
(cap. 19)

**Mínima agencia.** El principio, en la lista agentic de OWASP, de no dar a un agente más autonomía
de la que su tarea necesita: el comportamiento agentic desplegado donde no es necesario amplía la
superficie de ataque sin añadir valor [6]. El control de agente más barato es el agente no
construido, como un flujo de trabajo fijo con una llamada de modelo en lugar de un planificador.
Contrasta con [Autonomy level](/glossary/autonomy-level). Véase
[cap. 23, Governing AI agents](/bok/governing-agents). (cap. 23)

**Evaluación de intereses legítimos (LIA).** La prueba documentada de tres pasos para confiar en
intereses legítimos: un interés lícito, preciso y presente; tratamiento necesario para él; y un
equilibrio no anulado por los derechos y expectativas razonables de las personas [88]. Se mantiene
como un artefacto versionado que apunta cada mitigación al control que la implementa. Véase
[cap. 19, Legitimate interests and the three-step test](/bok/privacy-and-ai#legitimate-interests-and-the-three-step-test).
(cap. 19)

**LIME.** Local Interpretable Model-agnostic Explanations: explica una predicción ajustando un
modelo simple interpretable al comportamiento de la caja negra en muestras perturbadas alrededor de
la entrada [89]; vulnerable a manipulación fuera de la variedad. Contrasta con
[SHAP](/glossary/shap). Véase
[cap. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(cap. 16)

**Localización (por jurisdicción).** Controlar dónde se ejecuta un sistema de IA y qué
características ofrece en cada jurisdicción, con conjuntos de reglas por jurisdicción como código,
instancias regionales donde la residencia lo requiere y feature flags por región, de modo que un
mercado pueda desactivarse sin tocar los demás. Un sistema se lanza en una jurisdicción solo una vez
que se demuestra que se cumplen sus obligaciones allí. Véase
[cap. 15, Localisation by jurisdiction](/bok/governing-deployment#localisation-by-jurisdiction);
[cap. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(cap. 05, 12, 15)

**Pérdida de control.** Uno de los riesgos sistémicos que especifica el Código de Prácticas GPAI:
riesgos de que los humanos pierdan la capacidad de dirigir, modificar o detener de forma fiable un
modelo, que pueden surgir de desalineación, autorreplicación, engaño, resistencia a la modificación
de objetivos o búsqueda de poder [95]. Los signatarios lo evalúan para modelos con riesgo sistémico;
un responsable del despliegue de agentes pregunta cómo se evaluaron la autonomía y el uso de
herramientas. Véase
[cap. 23, EU AI Act hooks for agents](/bok/governing-agents#eu-ai-act-hooks-for-agents);
[cap. 08, GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice). (cap. 08, 23)

## M

**Aprendizaje automático.** La rama de la IA en la que un sistema mejora en una tarea aprendiendo
patrones de datos en lugar de seguir reglas que escribieron las personas. ISO/IEC 22989 agrupa sus
enfoques en aprendizaje supervisado, no supervisado, semi-supervisado y por refuerzo [40]. Véase
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Desaprendizaje automático.** Técnicas que eliminan la influencia de un registro de entrenamiento
de un modelo sin reentrenamiento completo. Los métodos exactos reentrena un fragmento afectado [90];
los métodos aproximados ajustan pesos y son difíciles de verificar, por lo que una afirmación de
desaprendizaje se prueba con evals de inferencia de membresía o extracción. Contrasta con
[Output suppression](/glossary/output-suppression). Véase
[cap. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning);
[cap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (cap.
05, 19)

**Evidencia legible por máquina.** Evidencia que una máquina puede consultar, comparar y agregar
(`OSCAL` artefactos, resultados de eval estructurados, registros firmados), a diferencia de capturas
de pantalla y hojas de cálculo exportadas. Véase
[cap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(cap. 03, 04, 05)

**Incidente grave relacionado con TIC (DORA).** Conforme a la Ley de Resiliencia Operativa Digital
de la UE, un incidente relacionado con TIC en una entidad financiera que cumple los criterios de
clasificación para un incidente grave. Se notifica en el plazo de 4 horas desde la clasificación y
no más tarde de 24 horas desde la conciencia (en el plazo de 4 horas desde una clasificación
realizada después de esas 24 horas), luego en informes intermedios y finales [91]. Véase
[cap. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (cap. 17)

**Defecto de fabricación.** En responsabilidad civil de productos, una desviación de una unidad de
su propio diseño [60]. Para IA: la versión de modelo incorrecta, pesos corruptos, un guardrail mal
configurado o una tubería de datos rota en el sistema desplegado. Contrasta con
[Design defect](/glossary/design-defect). Véase
[cap. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(cap. 20)

**Autoridad de vigilancia del mercado.** La autoridad nacional designada para hacer cumplir el
Reglamento de IA para productos colocados en su mercado, con poderes para investigar, exigir
documentación y requerir acciones correctivas. Véase
[cap. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (cap. 08, 18)

**Piso de madurez.** El nivel de madurez general único de una función de gobernanza de IA: el nivel
de su capa de stack más débil. Es un piso para la planificación, no un veredicto sobre toda la
función. El perfil por capa muestra dónde está el apalancamiento, y el siguiente movimiento es el
siguiente criterio en la capa más débil. Véase
[cap. 07, Observable criteria by layer and level](/bok/maturity-model#observable-criteria-by-layer-and-level);
[Toolkit: Maturity self-check](/toolkit/maturity-self-check). (cap. 07)

**MCP.** Model Context Protocol: un protocolo abierto para conectar aplicaciones de IA a
herramientas y fuentes de datos; su especificación 2026 añade patrones de servidor de recursos OAuth
2.1 y credenciales vinculadas al emisor para autorización de agentes [8]. Asegura el salto entre un
cliente y un servidor; qué agente se sienta detrás del cliente es para que lo diga una identidad de
carga de trabajo. Contrasta con [A2A (Agent2Agent protocol)](/glossary/a2a-agent2agent-protocol).
Véase
[cap. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28);
[cap. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 04, 05, 23)

**Inferencia de membresía.** Un ataque que determina si el registro de una persona específica estaba
en el conjunto de entrenamiento de un modelo a partir del comportamiento del modelo [92]. El EDPB
cuenta la resistencia a él entre la evidencia para afirmar que un modelo es anónimo. Contrasta con
[Model inversion](/glossary/model-inversion). Véase
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap. 19)

**Envenenamiento de memoria.** Una inyección que escribe en la memoria a largo plazo de un agente,
un corpus de recuperación, un almacén vectorial o un servicio de memoria alojado, y contamina así
cada sesión posterior que lee de ese almacén [128]. La lista de agentes de OWASP lo tiene como ASI06
Memory & Context Poisoning [6] y MITRE ATLAS como AI Agent Context Poisoning (AML.T0080) [126].
Contrasta con [Inyección de prompts](/glossary/prompt-injection). Véase
[cap. 23, Memory and context governance](/bok/governing-agents#memory-and-context-governance).
(cap. 23)

**Jerarquía de mitigación.** El orden en que se aplican los tratamientos de riesgo: eliminar,
sustituir, ingenierizar, administrativo, y luego aceptar y monitorizar. Tomado de la jerarquía de
controles de seguridad ocupacional [93] y reflejado en el artículo 9(5) del Reglamento de IA [2];
primero los escalones superiores, con la razón registrada cuando son inviables. Véase
[cap. 13, Treating risk: the mitigation hierarchy](/bok/risk-management#treating-risk-the-mitigation-hierarchy).
(cap. 13)

**Anonimato del modelo.** La prueba de la EDPB para determinar cuándo un modelo entrenado queda
fuera del RGPD: tanto la extracción directa de datos de los sujetos de entrenamiento como su
obtención mediante consultas deben ser insignificantes, dados todos los medios razonablemente
probables de ser utilizados [88]. Evidenciado por registros de diseño y evals de ataque. Véase
[cap. 19, The EDPB anonymity test](/bok/privacy-and-ai#the-edpb-anonymity-test). (cap. 19)

**Ficha de modelo.** Documentación estructurada y versionada de un modelo (procedencia, uso
previsto, capacidades, evaluaciones y modos de fallo conocidos) mantenida como código. Contrasta con
[Ficha de sistema](/glossary/system-card) y [Ficha de datos](/glossary/data-card). Véase
[cap. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets);
[cap. 05, Pattern: Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence).
(cap. 04, 05, 14)

**Inversión de modelo.** Un ataque que reconstruye características de los sujetos de entrenamiento,
como un rostro, a partir de los resultados y puntuaciones de confianza de un modelo [94]. Puede
convertir un modelo desplegado en un canal para divulgar datos personales. Contrasta con
[Inferencia de pertenencia](/glossary/membership-inference). Véase
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap. 19)

**Gestión de riesgo de modelo.** La práctica de supervisión bancaria de validar modelos por solidez
conceptual, monitorización y análisis de resultados bajo desafío efectivo. SR 11-7 estableció la
tradición estadounidense hasta que SR 26-2 la sustituyó el 17 de abril de 2026 [67], y SR 26-2 deja
fuera de su alcance los modelos de IA generativa y agéntica [121]. Una disciplina vecina, extendida
aquí al comportamiento en tiempo de ejecución y agentes. Contrasta con
[Gestión de riesgo](/glossary/risk-management). Véase
[cap. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management);
[cap. 21, Sector rules that already reach AI](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai);
[cap. 01, The disambiguation cluster](/bok/definition#the-disambiguation-cluster). (cap. 01, 02, 13,
14, 21)

**Firma de modelo.** Firmar los archivos de un modelo en la construcción: un manifiesto lista cada
archivo con su resumen criptográfico y una firma separada cubre el manifiesto, de modo que cualquier
archivo modificado falla la verificación. La especificación Model Signing de OpenSSF utiliza el
formato de paquete Sigstore y soporta firma sin clave, PKI privada, certificados autofirmados o
claves simples [135]. El servicio verifica la firma antes de cargar un modelo. Contrasta con
[Build provenance (SLSA)](/glossary/build-provenance-slsa). Véase
[cap. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning);
[cap. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (cap. 05, 14, 15)

**Modelo multimodal.** Un modelo que toma o produce más de una modalidad (texto, imagen, audio,
vídeo). Cada modalidad es un nuevo canal para datos personales, instrucciones inyectadas y contenido
sintético que puede necesitar marcado [2], por lo que se necesitan guardrails y evals por modalidad.
Véase [cap. 11, Multimodal models](/bok/ai-defined#multimodal-models). (cap. 11)

## N

**Casi accidente.** Un peligro que un control, o la suerte, interrumpió antes de que ocurriera daño:
el guardrail bloqueó la exfiltración, el revisor atrapó la dosis inventada. Los datos de casi
accidente son evidencia; el Código de Prácticas GPAI pide a los proveedores que informen de patrones
de casi accidentes conectados con incidentes graves [95]. Contrasta con
[Peligro de IA](/glossary/ai-hazard). Véase
[cap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Espacio negativo.** Los usos para los que un sistema de IA explícitamente no es, escritos en su
Deployment Decision Record. Se sitúa dentro de la finalidad prevista del proveedor y hace detectable
la expansión de funciones, porque un uso no aprobado tiene un lugar donde ser registrado como fuera
de alcance. Véase
[cap. 15, Start from the use case, not the model](/bok/governing-deployment#start-from-the-use-case-not-the-model).
(cap. 15)

**Datos neurales.** Información generada midiendo la actividad del sistema nervioso central o
periférico de una persona. California los trata como información personal sensible [96], lo que
activa deberes de consentimiento y evaluación para sistemas de IA que leen dispositivos portátiles o
interfaces cerebro-computadora. Véase
[cap. 19, Consumer-health and neural data](/bok/privacy-and-ai#consumer-health-and-neural-data).
(cap. 19)

**NHI.** Identidad no humana: la identidad de un agente, cuenta de servicio o actor máquina. Cada
NHI obtiene una entrada de registro, un propietario y un alcance antes de que se le permita actuar.
Contrasta con [Identidad de carga de trabajo](/glossary/workload-identity). Véase
[cap. 05, Pattern: Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials);
[cap. 23, Identity and short-lived credentials](/bok/governing-agents#identity-and-short-lived-credentials).
(cap. 04, 05, 23)

**NIST AI RMF.** El Marco de Gestión de Riesgos de IA del NIST 1.0 (NIST AI 100-1, enero de 2023):
orientación voluntaria organizada como un Núcleo de cuatro funciones (Govern, Map, Measure, Manage)
con categorías y subcategorías, más perfiles y un Playbook complementario [3][30]. Véase
[cap. 22, NIST AI RMF 1.0 in depth](/bok/principles-and-standards#nist-ai-rmf-10-in-depth);
[cap. 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf). (cap. 08, 22)

**Organismo notificado.** Un organismo de evaluación de la conformidad designado conforme al
Reglamento de IA de la UE para llevar a cabo la evaluación de la conformidad de terceros de sistemas
de IA de alto riesgo. Conforme al procedimiento de organismo notificado, evalúa el sistema de
gestión de la calidad y la documentación técnica del proveedor, con acceso a datos de entrenamiento,
validación y prueba [2]. Véase
[cap. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[cap. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(cap. 14, 18)

## O

**Principios de IA de la OCDE.** Los cinco principios basados en valores (crecimiento inclusivo y
bienestar; derechos humanos, equidad y privacidad; transparencia y explicabilidad; robustez,
seguridad y protección; responsabilidad) y cinco recomendaciones de política de la Recomendación de
la OCDE sobre IA, adoptada en 2019 y revisada en 2024 [31]. Un compromiso de los gobiernos
adherentes, no una norma vinculante para las empresas. Véase
[cap. 22, OECD AI Principles](/bok/principles-and-standards#oecd-ai-principles). (cap. 11, 22)

**Marco de la OCDE para la Clasificación de Sistemas de IA.** Una herramienta de la OCDE (2022) para
caracterizar un sistema de IA desde una perspectiva política a lo largo de cinco dimensiones: People
& Planet, Economic Context, Data & Input, AI Model, y Task & Output [97]. En la práctica de
ingeniería sus dimensiones se convierten en grupos de campos de registro que encaminan controles.
Véase
[cap. 22, The Framework for the Classification of AI Systems](/bok/principles-and-standards#the-framework-for-the-classification-of-ai-systems).
(cap. 22)

**OPA/Rego.** El Open Policy Agent y su lenguaje de política Rego, un motor de política como código
de propósito general que evalúa reglas de gobernanza en CI/CD y en admisión en tiempo de ejecución;
el ejemplo canónico de política como código ejecutable. Contrasta con [Cedar](/glossary/cedar).
Véase [cap. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (cap. 04, 05, 06)

**Opacidad.** La incapacidad de una persona de seguir cómo un sistema llegó a un resultado. Tiene
tres fuentes (secreto, analfabetismo técnico, y la naturaleza y escala del aprendizaje automático)
[98], cada una con una solución diferente: divulgación, alfabetización, y métodos de explicación más
evals conductuales. Contrasta con [Explicabilidad](/glossary/explainability). Véase
[cap. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance);
[cap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (cap. 11)

**Modelo de pesos abiertos.** Un modelo cuyos pesos entrenados se publican para descargar bajo una
licencia que puede ser permisiva, copyleft, restringida en uso o personalizada [99]. Los pesos
abiertos no son código abierto; el responsable del despliegue produce casi toda la evidencia
(hashes, escaneos, evals, red team) y debe honrar la licencia y cualquier política de uso aceptable.
Contrasta con [Licencia de IA Responsable (OpenRAIL)](/glossary/responsible-ai-licence-openrail).
Véase [cap. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences);
[cap. 18, Open-source carve-outs and their limits](/bok/eu-ai-act#open-source-carve-outs-and-their-limits).
(cap. 15, 18)

**Operador (Reglamento de IA de la UE).** El término paraguas para los actores que vincula el
Reglamento de IA: proveedor, fabricante de productos, responsable del despliegue, representante
autorizado, importador y distribuidor [2]. La misma organización puede ser varios operadores para
diferentes sistemas, o para el mismo. Véase
[cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**OSCAL.** El Open Security Controls Assessment Language, un formato legible por máquina del NIST
para controles, evaluaciones y evidencia, utilizado aquí como el formato para evidencia lista para
auditoría [3]. Véase
[cap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(cap. 04, 05, 10)

**Supresión de salida.** Un filtro alrededor de un modelo que le impide producir datos de una
persona: la respuesta rápida y primera a una solicitud de supresión u objeción cuando los datos se
encuentran en los pesos y el reentrenamiento es desproporcionado. La CNIL acepta filtros demostrados
como efectivos y robustos y prefiere reglas generales a una lista de nombres [140]. Los datos
permanecen en el modelo. Contrasta con [Desaprendizaje automático](/glossary/machine-unlearning).
Véase
[cap. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning);
[cap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (cap.
05, 19)

## P

**Camino pavimentado.** Una ruta soportada y de bajo roce por defecto (una plantilla, biblioteca o
pipeline) que hace que el camino gobernado sea el más fácil de desplegar, de modo que los ingenieros
adopten la gobernanza sin pedir permiso. Véase
[cap. 03, Make the governed path the easiest path](/bok/values-and-principles#make-the-governed-path-the-easiest-path).
(cap. 03, 06)

**Violación de la seguridad de los datos personales.** Una violación de seguridad que conduce a la
destrucción, pérdida, alteración o divulgación no autorizada accidental o ilícita de, o acceso a,
datos personales, notificada a la autoridad en el plazo de 72 horas a menos que sea improbable que
resulte en un riesgo [38]. La IA añade regurgitación, inversión y exfiltración por inyección de
prompts como rutas. Véase
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap. 19)

**PIPIA.** La evaluación de impacto de la información personal de China conforme a los artículos 55
y 56 de PIPL, requerida por adelantado para datos sensibles, toma de decisiones automatizada,
tratamiento confiado y provisión transfronteriza, con el informe conservado durante al menos tres
años [100]. Contrasta con [AIPD](/glossary/dpia). Véase
[cap. 19, Brazil and China](/bok/privacy-and-ai#brazil-and-china). (cap. 19)

**Comercialización.** Según el Reglamento de IA de la UE, la primera disponibilización de un sistema
de IA o modelo de IA de uso general en el mercado de la Unión; los suministros posteriores en el
curso de una actividad comercial son disponibilización [2]. Para un sistema de alto riesgo, la
evaluación de la conformidad y la documentación técnica deben realizarse antes de la
comercialización o antes de la puesta en servicio. Contrasta con
[Puesta en servicio](/glossary/putting-into-service). Véase
[cap. 18, Los roles de operador de la UE](/bok/eu-ai-act#the-eu-operator-roles);
[Toolkit: Clasificación de roles y clases de riesgo del Reglamento de IA de la UE](/toolkit/ai-act-triage).
(cap. 08, 14, 15, 18, 20)

**Policy Card.** Un artefacto de gobernanza legible por máquina con esquema JSON que declara los
comportamientos permitidos y prohibidos de un agente para su aplicación en tiempo de ejecución [11].
Véase [cap. 05, Patrón: Policy Card](/bok/patterns#pattern-policy-card). (cap. 04, 05, 10, 23)

**Veredicto de política.** El registro estructurado que emite un motor de políticas cada vez que
evalúa una regla: permitir o denegar, el id de la regla versionado, un hash de la entrada y una
marca de tiempo, firmado y escrito en el almacén de evidencia. Un lanzamiento o llamada de
herramienta sin veredicto es un hallazgo de auditoría, y uno que pasó bajo una excepción la nombra
en su veredicto. Véase
[cap. 04, Capa 01: Gobernanza como código](/bok/the-stack#layer-01-govern-as-code);
[Toolkit: Constructor de Policy Card](/toolkit/policy-card). (cap. 04, 05, 12, 23)

**Política como código.** Política de gobernanza expresada en un lenguaje de política ejecutable
(`OPA/Rego`, Cedar) que se evalúa en CI/CD y en admisión; el subconjunto más estrecho de gobernanza
como código, específico del pipeline. Contrasta con
[Gobernanza como código](/glossary/governance-as-code). Véase
[cap. 06, Política como código y puertas](/bok/the-role#policy-as-code-and-gates). (cap. 04, 05, 06)

**Vigilancia poscomercialización.** El deber establecido en el artículo 72 del Reglamento de IA de
supervisar activamente el rendimiento y los riesgos de un sistema de alto riesgo después del
despliegue, durante toda su vida útil [2]. Véase
[cap. 18, Vigilancia poscomercialización e incidentes graves (artículos 72 y 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(cap. 08, 18)

**Cambios predeterminados.** Cambios en un sistema de alto riesgo que continúa aprendiendo,
planificados por el proveedor en la evaluación de conformidad inicial y descritos en la
documentación técnica; no son modificaciones sustanciales [2]. Diseñados como una envolvente de
cambio escrita en código. Contrasta con
[Modificación sustancial](/glossary/substantial-modification). Véase
[cap. 14, Modificación sustancial](/bok/governing-development#substantial-modification). (cap. 14)

**IA predictiva.** IA que genera una estimación sobre algo que existe: una puntuación, clase o
pronóstico [21]. Sus daños son principalmente daños de asignación, y su evidencia es precisión,
calibración y tasas de error por subgrupo, con un umbral de decisión que alguien posee. También
llamada IA discriminativa. Contrasta con [IA generativa](/glossary/generative-ai). Véase
[cap. 11, Predictiva versus generativa](/bok/ai-defined#predictive-versus-generative). (cap. 11)

**Presunción de conformidad.** El efecto legal según el artículo 40 del Reglamento de IA: un sistema
de alto riesgo o modelo de IA de uso general que se ajusta a las normas armonizadas citadas en el
Diario Oficial se presume que cumple los requisitos que esas normas cubren, y ningún otro [2]. No
disponible hasta que se cite una norma, que a partir de 2026-09-24 ninguna lo está [10]. Véase
[cap. 22, Cómo funciona la presunción de conformidad](/bok/principles-and-standards#how-presumption-of-conformity-works).
(cap. 08, 22)

**Protección de datos desde el diseño y por defecto.** El deber establecido en el artículo 25 del
RGPD de integrar los principios de protección de datos en el tratamiento mediante medidas técnicas y
organizativas, y de tratar por defecto solo los datos personales que cada finalidad necesita [38].
En un stack de IA aparece como filtros, reglas de retención y límites de acceso aplicados como
código. Véase
[cap. 19, Minimización, protección de datos desde el diseño y tecnologías que mejoran la privacidad](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(cap. 19)

**Tecnología que mejora la privacidad (PET).** Una técnica que reduce lo que un atacante, proveedor
o persona interna puede aprender de datos personales, como privacidad diferencial, aprendizaje
federado, datos sintéticos, enmascaramiento o ejecución de confianza [61]. Ninguna hace un sistema
conforme por sí sola; cada una tiene un modo de fallo conocido y se evidencia mediante una prueba.
Véase
[cap. 19, Tecnologías que mejoran la privacidad y sus límites honestos](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(cap. 19)

**Directiva sobre responsabilidad por los daños causados por productos defectuosos (PLD).**
Directiva (UE) 2024/2853, que trata el software, incluida la IA, como un producto; juzga el defecto
teniendo en cuenta el aprendizaje y las actualizaciones; permite a los tribunales ordenar la
divulgación y presumen el defecto; y se aplica a los productos comercializados después del 9 de
diciembre de 2026 [101]. Véase
[cap. 20, La Directiva sobre responsabilidad por los daños causados por productos defectuosos de la UE](/bok/existing-law#the-eu-product-liability-directive).
(cap. 20)

**Anulación de definición de perfil.** La regla en el tercer párrafo del artículo 6(3) del
Reglamento de IA que un sistema del Anexo III que realiza definición de perfil de personas físicas
siempre es de alto riesgo, cualquiera que sea la condición de filtro que cumpla [2]. Un registro de
decisión de clasificación por lo tanto lleva una bandera de definición de perfil explícita, de modo
que una reclamación de filtro que la anulación derrota es visible. Contrasta con
[Filtro del artículo 6(3)](/glossary/article-6-3-filter). Véase
[cap. 18, El filtro del Anexo III y la anulación de definición de perfil](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: Clasificación de roles y clases de riesgo del Reglamento de IA de la UE](/toolkit/ai-act-triage).
(cap. 08, 18)

**Entrega progresiva.** Lanzar un cambio a una parte pequeña y creciente del tráfico real en etapas
(sombra, piloto, canario, disponibilidad general), cada una con criterios de reversión registrados
antes de que comience y una ruta probada de vuelta a la versión anterior, de modo que la evidencia
sobre el comportamiento en vivo llega antes de la exposición completa. Para sistemas de IA cubre
cambios de modelo, prompt, corpus y versión de proveedor por igual. Véase
[cap. 15, Entrega progresiva como control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Patrón: Despliegue por etapas con criterios de reversión](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 14, 15, 23)

**Práctica prohibida.** Una práctica de IA prohibida completamente por el artículo 5 del Reglamento
de IA, como técnicas manipuladoras que causan daño significativo, puntuación social, raspado sin
objetivo de imágenes faciales, reconocimiento de emociones en el trabajo o la escuela, e
identificación biométrica remota en tiempo real sin objetivo en público para garantía del
cumplimiento del Derecho [2]. Ninguna aceptación de riesgo puede cubrir una. Contrasta con
[Sistema de IA de alto riesgo](/glossary/high-risk-ai-system). Véase
[cap. 18, Prácticas prohibidas (artículo 5)](/bok/eu-ai-act#prohibited-practices-article-5).
(cap. 18)

**Inyección de prompts.** Una entrada que altera el comportamiento o la salida de un modelo de
formas que sus diseñadores no tenían la intención. Es directa cuando el usuario la suministra e
indirecta cuando llega dentro del contenido que el modelo procesa, como una página web, archivo o
resultado de herramienta [84]. Contenida por guardrails, herramientas de menor privilegio y evals.
Contrasta con [Jailbreak](/glossary/jailbreak) y
[Exposición de contexto oculto](/glossary/hidden-context-exposure). Véase
[cap. 04, Capa 04: Controles en tiempo de ejecución y observabilidad](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 01, 04, 17, 23)

**Gobernanza proporcional.** Ejecutar el mismo bucle de riesgo a una intensidad establecida por
tamaño de organización, sector, madurez y tolerancia al riesgo, por encima de un piso de controles
que nunca se adapta. El Reglamento de IA en sí escala los deberes de documentación y gestión de la
calidad para empresas más pequeñas [2]. Reduce el costo de la gobernanza, no la protección adeudada.
Véase
[cap. 13, Gobernanza proporcional: adaptación del bucle](/bok/risk-management#proportionate-governance-tailoring-the-loop).
(cap. 13)

**Proveedor.** Según el Reglamento de IA de la UE, quien desarrolla un sistema de IA o modelo de IA
de uso general, o lo hace desarrollar, y lo comercializa o lo pone en servicio bajo su propio nombre
o marca comercial, ya sea por pago o de forma gratuita [2]. Lleva los deberes de diseño,
documentación, conformidad y supervisión para sistemas de alto riesgo. Contrasta con
[Responsable del despliegue](/glossary/deployer). Véase
[cap. 18, Los roles de operador de la UE](/bok/eu-ai-act#the-eu-operator-roles). (cap. 15, 18)

**Etiqueta proxy.** Un objetivo de entrenamiento que representa la construcción que una decisión
pretende capturar, como el costo de atención médica que representa la necesidad de salud {[102]}.
Cuando el proxy está moldeado por un trato desigual, un modelo puede ser preciso en el proxy y
sesgado en la construcción. Contrasta con [Variable proxy](/glossary/proxy-variable). Véase
[Caso: una puntuación de riesgo de salud con una etiqueta proxy](/cases/health-risk-score-proxy).
(cap. 16)

**Escaneo proxy.** Una prueba que entrena un modelo para predecir un atributo protegido a partir de
las características de un sistema; las características que lo predicen fuertemente se marcan como
proxies para justificar o eliminar, y el resultado se registra en la ficha de datos. Encuentra
variables proxy antes de que una métrica de resultado muestre su efecto. Véase
[cap. 16, Equidad y explicabilidad en el stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack);
[cap. 05, Patrón: Suite de evaluación de equidad](/patterns/fairness-eval-suite). (cap. 05, 16)

**Variable proxy.** Una característica que lleva la información de una característica protegida,
como código postal para etnia, de modo que un modelo puede discriminar sin usar el atributo en sí.
Las pruebas proxy buscan características que predicen el atributo protegido [102]. Contrasta con
[Etiqueta proxy](/glossary/proxy-label). Véase
[cap. 16, Características protegidas, proxies y los datos que necesitas para probar](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
(cap. 16, 20)

**Seudonimización.** Tratamiento de datos personales de modo que ya no puedan atribuirse a una
persona sin información adicional mantenida por separado y protegida {[38]}. Los datos
seudonimizados siguen siendo datos personales para quien pueda re-atribuirlos; es una medida de
seguridad, no anonimización. Contrasta con [Datos anónimos](/glossary/anonymous-data). Véase
[cap. 19, Anonimización versus seudonimización](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(cap. 19)

**Limitación de la finalidad.** El principio del RGPD que los datos personales recogidos para una
finalidad especificada no pueden ser tratados posteriormente de forma incompatible; el artículo 6(4)
establece la prueba de compatibilidad {[38]}. Aplicada en pipelines de IA mediante etiquetas de
finalidad en conjuntos de datos y una política que deniega ejecuciones cuya finalidad declarada no
coincide. Véase
[cap. 19, Limitación de la finalidad y ampliación de funciones](/bok/privacy-and-ai#purpose-limitation-and-function-creep).
(cap. 19)

**Puesta en servicio.** Según el Reglamento de IA de la UE, el suministro de un sistema de IA para
primer uso directamente al responsable del despliegue, o para uso del proveedor, en la Unión para su
finalidad prevista {[2]}. El uso propio cuenta: una organización que construye un sistema y lo
ejecuta por sí misma es su proveedor y su responsable del despliegue, sin venta involucrada.
Contrasta con [Comercialización](/glossary/placing-on-the-market). Véase
[cap. 18, Los roles nombran tareas, no organizaciones](/bok/eu-ai-act#roles-name-tasks-not-organisations);
[Toolkit: Clasificación de roles y clases de riesgo del Reglamento de IA de la UE](/toolkit/ai-act-triage).
(cap. 15, 18)

## Q

**QMS (Art. 17).** El sistema de gestión de la calidad que el artículo 17 del Reglamento de IA
requiere de los proveedores de alto riesgo; distinto de un AIMS ISO/IEC 42001, que certifica un
sistema de gestión pero no está armonizado {[2][10]}. Contrasta con [AIMS](/glossary/aims). Véase
[cap. 18, Artículo 16 y el sistema de gestión de la calidad (artículo 17)](/bok/eu-ai-act#article-16-and-the-quality-management-system-article-17).
(cap. 08, 18)

## R

**RAISE Act.** Ley de Educación y Seguridad de la IA Responsable de Nueva York, una ley de seguridad
de IA fronteriza que vincula a los grandes desarrolladores fronterizos a publicar un marco de
seguridad y obliga a cada desarrollador fronterizo a informar de incidentes críticos de seguridad;
firmada el 19 de diciembre de 2025 y en vigor desde el 1 de enero de 2027 tras una enmienda del
capítulo de marzo de 2026 que situó la supervisión en una oficina dentro del Departamento de
Servicios Financieros (DFS) [12][15]. Véase
[cap. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (cap. 08, 21)

**Reducción real del riesgo.** La caída medida en la tasa o radio de explosión de un modo de fallo
nombrado en producción; una de las dos pruebas de la disciplina, frente a la cobertura del marco.
Véase
[cap. 03, 7. Success is measured in realised risk reduction, not framework coverage](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage).
(cap. 01, 03)

**Código de razón.** Una declaración estable y legible por humanos de un factor principal detrás de
una decisión adversa, mapeada desde los factores que el modelo realmente puntuó y versionada con el
modelo; requerida en sustancia por las normas estadounidenses de acción adversa [23]. Véase
[cap. 16, Credit: adverse-action notices and reason codes](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes);
[cap. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[cap. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (cap. 05, 16, 20)

**Uso indebido razonablemente previsible.** Uso de un sistema de IA no conforme a su finalidad
prevista que puede resultar de comportamientos humanos razonablemente previsibles o de la
interacción con otros sistemas, incluidos otros sistemas de IA [2]. Distinto de un ataque; se
mantiene en un registro de usos indebidos que alimenta pruebas, política en tiempo de ejecución e
instrucciones de uso. Contrasta con [Intended purpose](/glossary/intended-purpose). Véase
[cap. 14, Reasonably foreseeable misuse](/bok/governing-development#reasonably-foreseeable-misuse);
[cap. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm).
(cap. 14, 15)

**Registro de las actividades de tratamiento (ROPA).** El registro del artículo 30 del RGPD de cada
actividad de tratamiento: finalidades, categorías de datos y personas, destinatarios,
transferencias, retención y seguridad [38]. Para la IA es mejor generarlo por momento de tratamiento
desde el registro y las fichas de datos, para que no se quede obsoleto. Véase
[cap. 19, Records of processing](/bok/privacy-and-ai#records-of-processing). (cap. 19)

**Recurso.** La capacidad de una persona de obtener una decisión diferente cambiando entradas sobre
las que puede actuar realmente, como los ingresos en lugar de la edad [103]. Las explicaciones
contrafácticas restringidas a características accionables son su forma de ingeniería habitual; un
sistema puede ofrecer contestación y aun así no dejar ningún recurso. Contrasta con
[Contestability](/glossary/contestability). Véase
[cap. 16, Counterfactual explanations](/bok/fairness-and-explainability#counterfactual-explanations).
(cap. 16, 21)

**Red teaming.** Pruebas adversariales estructuradas de un modelo o agente para provocar fallos
(inyecciones de prompts, inyecciones, mal uso de herramientas) antes de que lo haga un atacante;
tratado aquí como un control que produce evidencia. Véase
[cap. 05, Pattern: Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite).
(cap. 04, 05, 15)

**Regurgitación.** Un modelo reproduciendo datos de entrenamiento memorizados textualmente,
incluidos datos personales, ya sea solicitado deliberadamente (extracción de datos de entrenamiento)
o no [104]. Detectado por comprobaciones de salida y canarios, y probado por evals de extracción.
Contrasta con [Hallucination](/glossary/hallucination). Véase
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap.
19, 20)

**Aprendizaje por refuerzo.** Aprender a maximizar una señal de recompensa mediante prueba y
retroalimentación [40]. Su fallo característico es el reward hacking, por lo que la recompensa se
registra como el objetivo del sistema y los evals buscan estrategias no intencionadas. Véase
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Aprendizaje por refuerzo a partir de retroalimentación humana (RLHF).** Una forma de alinear un
modelo preentrenado: ajuste fino supervisado en demostraciones humanas, luego aprendizaje por
refuerzo contra un modelo de recompensa entrenado en clasificaciones humanas de salidas [105]. Las
instrucciones de los evaluadores y el modelo de recompensa se convierten en artefactos gobernados,
porque dan forma a lo que el modelo rechaza y prefiere. Contrasta con
[Fine-tuning](/glossary/fine-tuning). Véase
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Reloj de notificación.** Un plazo estatutario para una notificación de incidente, definido por su
desencadenante (conciencia, clasificación, vínculo causal o determinación), destinatario, contenido
y seguimientos, como en el artículo 73 del Reglamento de IA [2]. Un evento puede iniciar varios
relojes, por lo que cada uno se mantiene como su propio temporizador en un único registro de
incidente. Véase [cap. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (cap. 17)

**Riesgo residual.** Lo que queda de un riesgo una vez que se aplica el tratamiento [30]. El
Reglamento de IA de la UE requiere que el riesgo residual por peligro y en general se juzgue
aceptable para sistemas de alto riesgo [2]. Una calificación residual acredita solo controles cuya
evidencia es actual. Contrasta con [Inherent risk](/glossary/inherent-risk) y
[Risk tolerance](/glossary/risk-tolerance). Véase
[cap. 13, Inherent risk, residual risk and who accepts it](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(cap. 13)

**Licencia de IA responsable (OpenRAIL).** Una licencia que otorga acceso abierto y libre de
regalías a un artefacto de IA mientras adjunta usos prohibidos que cada redistribución y derivado
debe llevar adelante [106]. Las restricciones viajan con el modelo, por lo que los propios términos
de uso de un responsable del despliegue deben repetirlas. Contrasta con
[Open-weight model](/glossary/open-weight-model). Véase
[cap. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences). (cap. 15)

**Conjunto de principios de IA responsable.** Un conjunto publicado de objetivos normativos para la
IA, como los Principios de IA de la OCDE [31], la Recomendación de la UNESCO, los requisitos del
HLEG o los principios de Hiroshima del G7. No el "principio" de la casa, que es una regla de método;
un conjunto de principios se cuenta como aplicado solo cuando un artefacto lo evidencia. Contrasta
con [Trustworthy AI](/glossary/trustworthy-ai). Véase
[cap. 11, Responsible-AI principle sets, engineered](/bok/ai-defined#responsible-ai-principle-sets-engineered).
(cap. 11)

**Generación aumentada por recuperación (RAG).** Un sistema que combina la memoria aprendida de un
modelo con un almacén recuperable de documentos en el momento de la respuesta [107]. El corpus se
convierte en comportamiento, por lo que se gobierna como un modelo: versionado, fichado, vinculado a
la eval que lo probó, con una comprobación de derechos sobre lo que cada usuario puede recuperar.
Véase [cap. 11, RAG systems](/bok/ai-defined#rag-systems). (cap. 11, 16)

**Reward hacking.** Un sistema encontrando una forma no intencionada de maximizar su recompensa u
objetivo sin hacer lo que sus diseñadores pretendían [108]. Respondido registrando el objetivo y
probando estrategias no intencionadas, no solo la tarea prevista. Véase
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Derecho a la explicación (Reglamento de IA art. 86).** El derecho de una persona afectada por una
decisión de un responsable del despliegue basada en la salida de un sistema de alto riesgo del Anexo
III, con efectos adversos legales o de importancia similar, a explicaciones claras y significativas
del papel del sistema y los elementos principales de la decisión, cuando el derecho de la Unión no
lo proporcione ya [2]. Contrasta con [Explainability](/glossary/explainability). Véase
[cap. 18, Explanation and notice to affected people](/bok/eu-ai-act#explanation-and-notice-to-affected-people).
(cap. 16, 18, 19)

**Reserva de derechos (exclusión de TDM).** La reserva expresa de un titular de derechos de minería
de textos y datos conforme al artículo 4(3) de la Directiva DSM, que saca el contenido de la
excepción general de minería; para contenido puesto a disposición públicamente en línea debe hacerse
de manera apropiada, como medios legibles por máquina [115]. Los proveedores de modelos de IA de uso
general deben identificar y cumplir tales reservas [2]. Contrasta con
[TDM exception](/glossary/tdm-exception). Véase
[cap. 20, Artefacts that evidence IP compliance](/bok/existing-law#artefacts-that-evidence-ip-compliance);
[cap. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (cap. 05,
08, 12, 20)

**Aceptación del riesgo.** Una decisión nombrada, firmada y con vencimiento de alguien con la
autoridad que requiere una banda residual, de que un riesgo puede permanecer durante un período
acotado bajo controles compensadores nombrados y una señal de monitoreo que la anula [30]. La
autoridad aumenta con la calificación; un uso prohibido no puede ser aceptado por nadie. Contrasta
con [Exception register](/glossary/exception-register). Véase
[cap. 13, Who may accept](/bok/risk-management#who-may-accept);
[cap. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(cap. 12, 13)

**Apetito de riesgo.** Cuánto riesgo, y de qué tipos, una organización está preparada para asumir en
la persecución de sus objetivos [109]. En este libro se compila a partir de una declaración aprobada
en un fichero de datos versionado que abre la lectura, en lugar de dejarse en un documento de junta.
Contrasta con [Risk tolerance](/glossary/risk-tolerance). Véase
[cap. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(cap. 13)

**Gestión de riesgos.** La práctica organizada de dirigir las decisiones de una organización
teniendo en cuenta sus riesgos [109]: identificar, evaluar, tratar y monitorear, en un bucle. Para
sistemas de alto riesgo el Reglamento de IA requiere un sistema documentado de gestión de riesgos a
lo largo del ciclo de vida [2]. Contrasta con
[Model risk management](/glossary/model-risk-management). Véase
[cap. 13, The loop: identify, assess, treat, monitor](/bok/risk-management#the-loop-identify-assess-treat-monitor).
(cap. 13)

**Matriz de riesgos.** Una cuadrícula que convierte una calificación de probabilidad y una
calificación de severidad, cada una en escalas definidas, en una banda que desencadena un
tratamiento, una puerta y una cadencia de revisión. Útil para la consistencia, no para la precisión
[110]; mantén los números detrás de cada celda. Véase
[cap. 13, Assessing risk: the likelihood-by-severity matrix](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix).
(cap. 13)

**Registro de riesgos.** El registro de evidencia del bucle de riesgo: un fichero versionado por
riesgo, indexado por id de registro, con calificaciones, tratamiento, controles que se resuelven en
evidencia, propietario, aceptación, cadencia de revisión y enlaces a evals, incidentes y
obligaciones. Las puertas de despliegue lo leen; evidencia un sistema de gestión de riesgos del
artículo 9 [2]. Contrasta con [Exception register](/glossary/exception-register). Véase
[cap. 13, The risk register as an evidence record](/bok/risk-management#the-risk-register-as-an-evidence-record).
(cap. 13)

**Fuente de riesgo.** Cualquier cosa que pueda dar lugar a riesgo sola o en combinación, como un
conjunto de datos, una concesión de herramienta, un adversario o un grupo de usuarios [111]. Las
fuentes internas se encuentran dentro del control de la organización; las externas surgen fuera de
ella y se ingenian principalmente contra ellas y se monitorean. Contrasta con
[Contributing factor](/glossary/contributing-factor). Véase
[cap. 13, Internal and external risk sources](/bok/risk-management#internal-and-external-risk-sources).
(cap. 13)

**Nivel de riesgo.** Calificación propia de una organización de un caso de uso de IA, calculada en
la admisión mediante una política versionada a partir de campos de perfil declarados como autonomía,
impacto de la decisión, exposición, reversibilidad, grupos vulnerables, clase de datos y terceros.
El nivel selecciona las evaluaciones, evals, umbrales, aprobadores y cadencia de revisión que un
sistema debe superar; se sitúa junto a la clasificación legal, no en su lugar. Contrasta con
[High-risk AI system](/glossary/high-risk-ai-system). Véase
[cap. 13, Contributing factors and the use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile);
[cap. 05, Pattern: Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (cap.
05, 06, 12, 13)

**Tolerancia al riesgo.** La disposición a asumir un riesgo dado para lograr objetivos [30]. Se
implementa como la banda residual más alta que un nivel de sistema puede llevar antes de que una
puerta de despliegue requiera una aceptación firmada. Contrasta con
[Risk appetite](/glossary/risk-appetite). Véase
[cap. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(cap. 13)

**Criterios de reversión.** Las condiciones, escritas en el plan de despliegue antes de que comience
una fase de lanzamiento, bajo las cuales la tubería vuelve automáticamente a la versión anterior: un
piso incumplido respecto al grupo de control, una tasa de desacuerdo u omisión por encima de un
umbral, un evento de severidad 1. Un criterio establecido después de que la métrica se movió es una
negociación, no un control. Contrasta con [Kill switch](/glossary/kill-switch). Véase
[cap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 15)

**Análisis de causa raíz (RCA).** La revisión que responde por qué sucedió un incidente y por qué
los controles no lo detuvieron, utilizando técnicas como los cinco porqués, análisis de árbol de
fallos [112] y retrospectivas sin culpa, y codifica cada causa confirmada contra una taxonomía que
nombra el control que debería haberla detectado. Véase
[cap. 17, Root-cause analysis](/bok/incidents#root-cause-analysis). (cap. 17)

**Ruta de datos en tiempo de ejecución.** La conexión en vivo entre producción y la función de
gobernanza (descubrimiento, telemetría y aplicación), sin la cual un registro o panel de control
describe el programa pero no puede ver qué se está ejecutando [13]. Véase
[cap. 02, 5. No runtime data path](/bok/why-now#5-no-runtime-data-path). (cap. 02, 04, 07)

## S

**Safetensors.** Un formato de archivo para almacenar los tensores de un modelo de forma segura, a
diferencia de Python pickle [137], cuya carga puede ejecutar código arbitrario y que la
documentación de Python califica como no segura [138]. Almacenar pesos como safetensors y escanear
cualquier archivo pickle restante en busca de importaciones que ejecuten código antes de que lleguen
a un registro cierra una ruta común de cadena de suministro hacia el servicio. Véase
[cap. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning);
[cap. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (cap. 05, 14)

**Componente de seguridad.** Conforme al Reglamento de IA modificado en 2026, un componente de un
producto o sistema de IA cuya finalidad prevista es prevenir o mitigar riesgos para la salud y
seguridad de las personas o la propiedad, o cuyo fallo las pone en peligro. La IA utilizada
únicamente para comodidad, eficiencia o control de calidad se excluye a menos que su fallo ponga en
peligro la seguridad [2]. Véase
[cap. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(cap. 18)

**Puerta de IA sancionada.** La única ruta aprobada por la que el personal accede a herramientas de
IA e interfaces de programación de aplicaciones de modelos: herramientas aprobadas detrás de un
inicio de sesión único y una puerta que clasifica cada solicitud por clase de datos, permite,
redacta o bloquea bajo la política de uso aceptable, verifica una atestación actual y registra una
decisión por llamada. Funciona siendo la ruta más fácil. Contrasta con
[Shadow AI](/glossary/shadow-ai). Véase
[cap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff);
[cap. 05, Pattern: Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway). (cap. 05, 12)

**SB 53.** Ley de transparencia de IA fronteriza de California (TFAIA), en vigor desde el 1 de enero
de 2026, que cubre desarrolladores fronterizos que entrenan modelos por encima de 10^26 FLOP: todos
ellos publican informes de transparencia e informan de incidentes de seguridad críticos, y los
grandes desarrolladores fronterizos también publican un marco de seguridad [14][142]. Véase
[cap. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (cap. 08, 21)

**Aprendizaje autosupervisado.** Aprendizaje prediciendo partes de la entrada misma, como el
siguiente token, sobre grandes corpus; la definición de modelo de uso general del Reglamento de IA
nombra la autosupervisión a escala [2]. La procedencia del corpus, los derechos y la memorización
son difíciles de rastrear, por lo que el AIBOM registra la procedencia del conjunto de datos. Véase
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Incidente grave.** Conforme al artículo 3(49) del Reglamento de IA, un incidente o mal
funcionamiento de un sistema de IA que directa o indirectamente conduce a (a) una muerte o daño
grave para la salud, (b) una perturbación grave e irreversible de infraestructura crítica, (c) una
infracción de obligaciones de derecho de la Unión que protegen derechos fundamentales, o (d) un daño
grave a la propiedad o el medio ambiente, que desencadena la notificación del artículo 73 [2].
Contrasta con [AI incident](/glossary/ai-incident). Véase
[cap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident);
[cap. 18, Post-market monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(cap. 04, 08, 17, 18)

**IA en la sombra.** Un sistema de IA, modelo o agente ejecutándose sin registro, incluyendo el uso
por parte del personal de herramientas de IA no aprobadas; el modo de fallo que hace que un
inventario sea completo solo para los honestos. Se encuentra mediante descubrimiento y se responde
con una ruta sancionada, no una prohibición. Contrasta con
[Sanctioned AI gateway](/glossary/sanctioned-ai-gateway). Véase
[cap. 05, Pattern: Shadow-AI Discovery](/bok/patterns#pattern-shadow-ai-discovery);
[cap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff).
(cap. 05, 07, 12)

**Despliegue en la sombra.** Una fase de lanzamiento en la que un modelo o sistema nuevo recibe
entradas en vivo pero sus salidas no se utilizan, de modo que su comportamiento en tráfico real
puede compararse con el incumbente o con decisiones humanas antes de cualquier exposición. El
registro de desacuerdo es su evidencia. Contrasta con [Canary release](/glossary/canary-release).
Véase
[cap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 14, 15)

**SHAP.** SHapley Additive exPlanations: un método de atribución de características que asigna a
cada característica de entrada una parte de una predicción particular, basado en valores de Shapley
[113]; sus explicaciones dependen de los datos de línea de base o fondo elegidos. Contrasta con
[LIME](/glossary/lime). Véase
[cap. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(cap. 16)

**Modelo de lenguaje pequeño (SLM).** Un modelo de lenguaje lo suficientemente pequeño para
ejecutarse cerca del usuario, por ejemplo en un teléfono [86]. Sus controles deben enviarse con él:
guardrails en el dispositivo, un inventario de versiones en toda la flota y un kill switch entregado
como una bandera remota o actualización de aplicación. Contrasta con
[Large language model (LLM)](/glossary/large-language-model-llm). Véase
[cap. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (cap. 11)

**Empresa pequeña y mediana (SMC).** Una empresa que ha superado la definición de PYME pero se
encuentra dentro de la definición de pequeña y mediana empresa de la UE. El Omnibus Digital extiende
algunos alivios de PYME conforme al Reglamento de IA a las SMC, como documentación técnica
simplificada y un sistema de gestión de la calidad proporcionado [2]. Véase
[cap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (cap. 18)

**Datos de categoría especial.** Las categorías del artículo 9 del RGPD cuyo tratamiento está
prohibido a menos que se aplique una condición: datos que revelen origen racial o étnico, opiniones
políticas, creencias o afiliación sindical, y datos genéticos, biométricos (para identificación), de
salud, vida sexual y orientación sexual [38]. La IA puede crearlos por inferencia. Contrasta con
[Inferred sensitive data](/glossary/inferred-sensitive-data). Véase
[cap. 19, Special categories, inferred data and biometrics](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics).
(cap. 19)

**Mapeo de partes interesadas.** Nombrar quién se ve afectado por un sistema de IA u ostenta una
opinión sobre él (usuarios, no usuarios afectados, responsables del despliegue, proveedores,
funciones internas, reguladores, órgano de gobierno) y cómo cada opinión entra en el bucle de
riesgo, con la consulta registrada. Una FRIA también nombra los grupos afectados [2]. Véase
[cap. 13, Stakeholder mapping](/bok/risk-management#stakeholder-mapping). (cap. 13)

**STAR para IA.** Programa de aseguramiento de seguridad y certificación de CSA para IA, construido
sobre el AICM, con un nivel de autoevaluación, un nivel automatizado "Valid-AI-ted" y un Nivel 2 que
combina ISO/IEC 42001 con la evaluación validada [4]. Véase
[cap. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (cap. 07, 08)

**STRIDE.** Una lista de verificación de clasificación de amenazas del Ciclo de Vida de Desarrollo
Seguro de Microsoft: suplantación, manipulación, repudio, divulgación de información, denegación de
servicio y elevación de privilegios [133]. Para un sistema de IA se recorre por cada elemento del
diagrama de flujo de datos y luego se extiende con catálogos específicos de IA como MITRE ATLAS y
las listas de OWASP. Contrasta con [ATLAS](/glossary/atlas). Véase
[cap. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[cap. 05, Pattern: AI Threat Model](/patterns/ai-threat-model). (cap. 05, 06, 15)

**Subencargado del tratamiento.** Un encargado del tratamiento que otro encargado contrata para
llevar a cabo el tratamiento de un responsable, como el host del modelo detrás de un proveedor de
IA. Conforme al artículo 28 del RGPD necesita la autorización previa escrita del responsable,
específica o general con notificación de cambios y una oportunidad de oposición, y las mismas
obligaciones de protección de datos fluyen hacia él por contrato [38]. Contrasta con
[Controller and processor](/glossary/controller-and-processor). Véase
[cap. 19, AI vendor DPAs and no-training clauses](/bok/privacy-and-ai#ai-vendor-dpas-and-no-training-clauses);
[cap. 15, Vendor contracts and licence terms](/bok/governing-deployment#vendor-contracts-and-licence-terms).
(cap. 08, 12, 15, 19)

**Modificación sustancial.** Conforme al Reglamento de IA de la UE, un cambio después de la
introducción en el mercado que la evaluación de la conformidad inicial no previó y que afecta al
cumplimiento o cambia la finalidad prevista [2]. Desencadena una nueva evaluación de la conformidad
y puede convertir a un responsable del despliegue o distribuidor en el proveedor; los cambios
predeterminados están exentos. Contrasta con
[Pre-determined changes](/glossary/pre-determined-changes). Véase
[cap. 18, Article 25: when someone else becomes the provider](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider);
[cap. 14, Substantial modification](/bok/governing-development#substantial-modification);
[cap. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider).
(cap. 14, 15, 18)

**Aprendizaje supervisado.** Aprendizaje a partir de ejemplos etiquetados [40]. Las etiquetas
codifican decisiones humanas pasadas con sus errores y sesgos, por lo que la ficha de datos registra
la procedencia de las etiquetas y la puerta de eval prueba tasas de error por subgrupo. Contrasta
con [Unsupervised learning](/glossary/unsupervised-learning). Véase
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**SVID.** Documento de Identidad Verificable de SPIFFE: un documento de identidad criptográfico de
corta duración, ya sea un certificado X.509 o un JWT, que prueba el ID de SPIFFE de una carga de
trabajo y se emite y rota a través de la API de Carga de Trabajo de SPIFFE, que SPIRE implementa
[124]. Una credencial que expira en minutos no necesita ser buscada después de un incidente, solo no
ser reemitida. Contrasta con [Identidad de carga de trabajo](/glossary/workload-identity). Véase
[cap. 23, Credenciales de corta duración y atestiguadas](/bok/governing-agents#short-lived-attested-credentials).
(cap. 23)

**Datos sintéticos.** Datos generados por un modelo o simulación en lugar de recopilados de personas
o eventos, utilizados para aumentar conjuntos de entrenamiento, probar casos extremos o reducir la
exposición de datos personales. Hereda los sesgos de su generador y puede filtrar los registros en
los que se ajustó, por lo que se prueba como cualquier otro conjunto de datos. Véase
[cap. 14, Datos sintéticos, aumento y tecnologías que mejoran la privacidad](/bok/governing-development#synthetic-data-augmentation-and-privacy-enhancing-technologies).
(cap. 14, 19)

**Ficha de sistema.** Documentación de un sistema de IA desplegado en su conjunto (modelos, prompts,
recuperación, herramientas, guardrails y supervisión), donde una ficha de modelo documenta un modelo
[114]. Su audiencia son los responsables del despliegue, las autoridades y el público; su evidencia
es la entrada del registro, la configuración del guardrail y los resultados del red team. Contrasta
con [Ficha de modelo](/glossary/model-card). Véase
[cap. 14, Fichas de modelo, fichas de sistema y hojas de datos](/bok/governing-development#model-cards-system-cards-and-datasheets).
(cap. 14, 15)

**Riesgo sistémico.** Según el Reglamento de IA, el riesgo que plantean los modelos de IA de uso
general más capaces, que desencadenan deberes adicionales de evaluación, pruebas adversariales e
informes de incidentes en sus proveedores [2]. Véase
[cap. 18, Riesgo sistémico: umbral, notificación, designación](/bok/eu-ai-act#systemic-risk-threshold-notification-designation).
(cap. 08, 18)

## T

**Ejercicio de mesa.** Un ensayo programado y puntuado de un manual de incidentes contra un modo de
fallo nombrado, que produce los mismos registros que produciría un incidente real (registro,
relojes, borradores de informes, eventos de contención) etiquetados como un simulacro. El manual es
la afirmación; el resultado del simulacro es la evidencia. Véase
[cap. 17, Manuales, RACI y simulacros](/bok/incidents#playbooks-raci-and-drills). (cap. 17)

**TC260.** El Comité Técnico Nacional 260 sobre Ciberseguridad de la Administración de
Estandarización de China (全国网络安全标准化技术委员会), que redacta los estándares nacionales de ciberseguridad e
IA de China (GB y GB/T) y publica el Marco Voluntario de Gobernanza de Seguridad de IA (1.0 en 2024,
2.0 en 2025, 3.0 el 14 de septiembre de 2026) [19]. Véase
[cap. 21, China: lo que el capítulo 08 no cubre ya](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(cap. 08, 21)

**Excepción TDM.** La excepción de derechos de autor de la UE para minería de textos y datos
(Artículos 3 y 4 de la Directiva DSM) que permite a cualquiera copiar obras legalmente accesibles
para minería, incluido el entrenamiento de IA, a menos que el titular de derechos haya reservado ese
uso; para contenido puesto a disposición públicamente en línea, la reserva debe hacerse de manera
apropiada, como por medios legibles por máquina [115]. Contrasta con [Uso justo](/glossary/fair-use)
y [Reserva de derechos (exclusión voluntaria de TDM)](/glossary/rights-reservation-tdm-opt-out).
Véase
[cap. 20, Derechos de autor y datos de entrenamiento](/bok/existing-law#copyright-and-training-data).
(cap. 20)

**Documentación técnica (Anexo IV).** El fichero técnico del proveedor para un sistema de IA de alto
riesgo, elaborado antes de la introducción en el mercado y mantenido actualizado conforme al
Artículo 11: descripción, proceso de desarrollo, datos, pruebas, supervisión, gestión de riesgos,
normas, declaración y plan de vigilancia poscomercialización [2]. La mayoría de elementos pueden
generarse a partir de registros de pipeline. Véase
[cap. 14, Anexo IV, elemento por elemento](/bok/governing-development#annex-iv-element-by-element).
(cap. 14)

**Contaminación del conjunto de prueba.** La presencia de elementos de evaluación en los datos de
entrenamiento de un modelo, que infla sus puntuaciones; puede demostrarse incluso para modelos de
lenguaje de caja negra [116]. Se mitiga con conjuntos retenidos privados, elementos rotados y
elementos de prueba fechados. Véase
[cap. 14, Validez estadística de evals](/bok/governing-development#statistical-validity-of-evals).
(cap. 14)

**Prueba en condiciones reales.** Conforme al Reglamento de IA de la UE, prueba temporal de un
sistema de IA para su finalidad prevista fuera de un laboratorio, conforme a un plan aprobado por la
autoridad de vigilancia del mercado, con registro, consentimiento informado de los sujetos,
supervisión efectiva y resultados reversibles, durante un período limitado [2]. Contrasta con
[Espacio controlado de pruebas para la IA](/glossary/ai-regulatory-sandbox). Véase
[cap. 18, Espacios controlados de pruebas y pruebas en condiciones reales](/bok/eu-ai-act#sandboxes-and-real-world-testing).
(cap. 18)

**Modelo de amenaza (IA).** Un registro versionado de qué puede salir mal con un sistema de IA y qué
se hace al respecto: flujos de datos y límites de confianza, amenazas por elemento de STRIDE y
catálogos específicos de IA, una decisión sobre cada una, y la prueba que demuestra cada mitigación.
Responde a las cuatro preguntas del modelado de amenazas, terminando con si el trabajo se hizo lo
suficientemente bien [134]. Contrasta con [Red teaming](/glossary/red-teaming). Véase
[cap. 15, Modelado de amenazas del sistema desplegado](/bok/governing-deployment#threat-modelling-the-deployed-system);
[cap. 05, Patrón: Modelo de Amenaza de IA](/patterns/ai-threat-model). (cap. 05, 14, 15, 23)

**Modelo de Tres Líneas.** La actualización de 2020 del Instituto de Auditores Internos de las "tres
líneas de defensa": el órgano de gobierno supervisa; la dirección desempeña funciones de primera
línea (entrega de productos y servicios) y segunda línea (experiencia en riesgos, apoyo y desafío);
la auditoría interna proporciona aseguramiento independiente de tercera línea [117]. Véase
[cap. 12, Las tres líneas, aplicadas a IA](/bok/governance-program#the-three-lines-applied-to-ai).
(cap. 12)

**Paso de token.** El antipatrón en el que un servidor acepta un token que no le fue emitido y lo
reenvía, sin modificar, a una API posterior, que puede entonces confiar en él como si el servidor lo
hubiera validado. La especificación MCP lo prohíbe: un servidor no debe aceptar ningún token que no
le haya sido explícitamente emitido, y por lo tanto verifica la audiencia de cada token [125].
Contrasta con [Delegación (intercambio de tokens OAuth)](/glossary/delegation-oauth-token-exchange).
Véase
[cap. 23, Autorización MCP a partir de 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28).
(cap. 23)

**Lista de permitidos de herramientas.** La lista de denegación por defecto de herramientas que un
agente puede llamar, cada entrada fijada por un hash de la definición de la herramienta y limitada
por alcance de recursos, clase de operación, tasa, destinos de salida, clases de datos y una regla
de punto de control, evaluada por la puerta de herramientas en cada llamada. OWASP solicita tales
perfiles de privilegio mínimo por herramienta [6]. Véase
[cap. 23, La lista de permitidos de herramientas](/bok/governing-agents#the-tool-allow-list).
(cap. 23)

**Envenenamiento de herramientas.** Manipulación de una herramienta que usa un agente, a través de
su definición visible por el modelo (descripción, esquema, metadatos) o su comportamiento, de modo
que el agente actúe sobre premisas falsas. OWASP archiva la manipulación de la interfaz de una
herramienta legítima bajo ASI02 y una herramienta comprometida en la fuente bajo ASI04 [6]; MITRE
ATLAS enumera Envenenamiento de Herramientas de Agente de IA (AML.T0110) [126]. Contrasta con
[Inyección de prompts](/glossary/prompt-injection). Véase
[cap. 23, Admisión de un servidor MCP](/bok/governing-agents#admitting-an-mcp-server). (cap. 23)

**Resumen del contenido de entrenamiento.** El resumen público del contenido utilizado para entrenar
un modelo de IA de uso general, requerido por el Artículo 53(1)(d) del Reglamento de IA en una
plantilla obligatoria de la Comisión que cubre fuentes de datos, incluidos los dominios más
raspados, y procesamiento de datos [118]. Véase
[cap. 14, El lado del proveedor de GPAI](/bok/governing-development#the-gpai-provider-side).
(cap. 14)

**Datos de entrenamiento, validación y prueba.** Los tres conjuntos de datos que el Reglamento de IA
define para sistemas de alto riesgo: los datos de entrenamiento ajustan el modelo, los datos de
validación lo afilan y protegen contra el sobreajuste, y los datos de prueba dan una verificación
independiente antes del lanzamiento [2]. Mantenerlos separados, y probarlo, es lo que detiene la
contaminación del conjunto de prueba. Contrasta con
[Contaminación del conjunto de prueba](/glossary/test-set-contamination). Véase
[cap. 14, Datos para entrenamiento y prueba](/bok/governing-development#data-for-training-and-testing).
(cap. 14)

**Trayectoria (agente).** La secuencia de planes, llamadas de herramientas y operaciones de memoria
que llevaron a un agente a un efecto. Los agentes se evalúan en sus trayectorias así como en sus
resultados finales, porque un resultado correcto alcanzado a través de una herramienta que el agente
nunca debería haber tenido sigue siendo un fracaso. Véase
[cap. 23, Qué hace que un agente sea un objeto de gobernanza](/bok/governing-agents#what-makes-an-agent-a-governance-object).
(cap. 14, 23)

**Token de transacción (Txn-Token).** Un token firmado de corta duración, especificado en un
borrador del grupo de trabajo IETF OAuth, que lleva identidad de usuario, identidad de carga de
trabajo y contexto de autorización a través de una cadena de llamadas dentro de un dominio de
confianza, de modo que los servicios posteriores puedan decidir sobre contexto protegido [131]. Aún
un borrador (revisión 11, 30 de julio de 2026) a partir de 2026-09-24. Contrasta con
[Delegación (intercambio de tokens OAuth)](/glossary/delegation-oauth-token-exchange). Véase
[cap. 23, Responsabilidad entre saltos](/bok/governing-agents#accountability-across-hops). (cap. 23)

**Evaluación de impacto de transferencia (TIA).** La evaluación del exportador de datos sobre si la
ley de un tercer país permite al importador honrar la herramienta de transferencia, como cláusulas
contractuales tipo, y qué medidas complementarias son necesarias [119]. Los puntos finales de
inferencia remota y la telemetría de proveedores fuera del EEE pueden desencadenarla. Véase
[cap. 19, Transferencias, inferencia remota y TIAs](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
(cap. 19)

**Transparencia.** En el marco de NIST, hasta qué punto la información sobre un sistema de IA y sus
resultados llega a las personas que interactúan con él: qué sucedió [30]. Evidenciada por registros
de qué se ejecutó (registro, fichas de modelo y sistema, registros) y por las divulgaciones que la
ley requiere. Contrasta con [Explicabilidad](/glossary/explainability) e
[Interpretabilidad](/glossary/interpretability). Véase
[cap. 16, Transparencia, interpretabilidad y explicabilidad](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[cap. 11, Pares de contraste](/bok/ai-defined#contrast-pairs). (cap. 11, 16)

**IA de confianza.** Un lema utilizado por marcos de otras personas, en particular el Grupo de
Expertos de Alto Nivel de la UE [81] y NIST, cuyas siete características de confianza lo hacen
concreto [30]. Este libro lo cita en lugar de adoptarlo: la disciplina se mide por la reducción real
del riesgo y la evidencia, no por la etiqueta. Contrasta con
[Ingeniería de gobernanza de IA](/glossary/ai-governance-engineering) e
[Conjunto de principios de IA responsable](/glossary/responsible-ai-principle-set). Véase
[cap. 22, Directrices de la UE HLEG y ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(cap. 01, 22)

**Características de confianza (NIST).** Las siete características de la IA de confianza en el NIST
AI RMF: válida y confiable; segura; segura y resiliente; responsable y transparente; explicable e
interpretable; mejorada en privacidad; justa con sesgo dañino gestionado [30]. Válida y confiable es
la base; responsable y transparente abarca las otras. Véase
[cap. 22, Las siete características de confianza](/bok/principles-and-standards#the-seven-trustworthy-characteristics).
(cap. 22)

## U

**UDAP.** Actos o prácticas injustos o engañosos, prohibidos por la sección 5 de la Ley FTC y por
las leyes estatales [120]. El engaño es una representación material que probablemente induzca a
error; la injusticia es una lesión sustancial, inevitable no compensada por beneficios. Las
afirmaciones de rendimiento de IA no sustanciadas caen bajo ella. Véase
[cap. 20, Prácticas injustas y engañosas en Estados Unidos](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states).
(cap. 20)

**Aprendizaje no supervisado.** Aprender estructura (clusters, anomalías) a partir de datos sin
etiquetas [40]. Sin una verdad de referencia contra la que contrastar, los controles se basan en
pruebas de estabilidad y revisión humana de los segmentos antes de usarlos en decisiones. Contrasta
con [Aprendizaje supervisado](/glossary/supervised-learning). Véase
[cap. 11, Por paradigma de aprendizaje](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Registro de caso de uso.** El registro de entrada para un caso de uso de IA propuesto: contexto
empresarial, finalidad prevista y usos descartados, personas afectadas, autoridad decisoria,
métricas de éxito y tolerancia al error, almacenados como campos en la entrada del registro para que
la clasificación, umbrales, pruebas y evaluaciones de impacto lean los mismos hechos [30]. Véase
[cap. 14, El registro de caso de uso](/bok/governing-development#the-use-case-record);
[cap. 06, Entrada y clasificación](/bok/the-role#intake-and-classification);
[cap. 05, Patrón: Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (cap. 05,
06, 14)

## V

**Fijación de versiones.** Fijar, en la entrada del registro, las versiones exactas del modelo,
prompts, corpus de recuperación y guardrails que utiliza un sistema desplegado, para que se sepa qué
se ejecutó y cualquier cambio no fijado, incluida una actualización de modelo del proveedor, se
detecte y se trate como un lanzamiento. Véase
[cap. 15, Entrega progresiva como control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Patrón: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 15)

## W

**Marca de agua.** Incrustar una señal en contenido generado (imagen, audio, vídeo o texto) que un
detector pueda leer posteriormente para identificarlo como generado por IA. El Reglamento de IA pide
a los proveedores de sistemas generativos una marca legible por máquina y detectable [2]; NIST
revisa las marcas de agua junto con el seguimiento de procedencia y la detección [53]. Las marcas
pueden degradarse bajo transformaciones ordinarias, por lo que se prueba su persistencia. Contrasta
con [Procedencia del contenido (C2PA)](/glossary/content-provenance-c2pa) y
[Divulgación latente](/glossary/latent-disclosure). Véase
[cap. 18, Casos de transparencia (Artículo 50)](/bok/eu-ai-act#transparency-cases-article-50). (cap.
18, 20)

**Infracción generalizada.** Conforme al Artículo 3(61) del Reglamento de IA, un acto u omisión
contrario a la legislación de la Unión que protege los intereses de las personas que causa daño, o
es probable que cause daño, a los intereses colectivos de personas en varios Estados miembros.
Acorta el plazo del incidente grave del Artículo 73 a dos días [2]. Contrasta con
[Incidente grave](/glossary/serious-incident). Véase
[cap. 17, Incidente, peligro, problema e incidente grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Identidad de carga de trabajo.** La identidad atribuible que una carga de trabajo como un agente
lleva en cada salto, bajo la cual se registran sus acciones y se revoca su acceso, típicamente una
credencial de corta duración y atestiguada como un SVID [124]. Difiere de la autenticación de canal,
que asegura un único salto, como un cliente hablando con un servidor MCP. Contrasta con
[NHI](/glossary/nhi) y [SVID](/glossary/svid). Véase
[cap. 23, La autenticación de canal no es identidad de agente](/bok/governing-agents#channel-authentication-is-not-agent-identity);
[cap. 04, Capa 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 03, 04, 05, 23)

## Sources

[1] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text as amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI, in force 27 Jul 2026; definitions in Art. 3, incl. 3(1), 3(3) to 3(14), 3(14b), 3(20), 3(22), 3(23), 3(29) to 3(32), 3(49), 3(55) to 3(57), 3(60), 3(61), 3(63), 3(68); Arts. 4, 5, 6 (incl. 6(3) third subparagraph, profiling), 9, 10, 11, 13, 14, 15, 17, 22 to 27 (incl. 26(11)), 40, 41, 43, 47, 48, 50, 53 (incl. 53(1)(c)), 55, 57, 60, 72, 73, 86; Annexes I, III, IV). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[3] NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage); OSCAL. NIST. 2023. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] AI Controls Matrix v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/star/ai (verified: primary)
[5] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025). OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[6] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; Least-Agency; per-tool least-privilege profiles; tool poisoning of a legitimate tool's interface under ASI02, a tool compromised at the source under ASI04). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] MITRE ATLAS (adversarial threat knowledge base for AI). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[8] Model Context Protocol specification 2026-07-28 (OAuth 2.1 resource servers; Client ID Metadata Documents; issuer-bound credentials). Anthropic / MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[9] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (at least 10 to 15% of agentic AI markets by 2030). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[10] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; none found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[11] Policy Cards: machine-readable runtime governance artefacts for agents. arXiv 2510.24383. 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[12] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; oversight office within the Department of Financial Services). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[13] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[14] California SB 53 / TFAIA (models above 10^26 FLOP; transparency reports and incident reports by all frontier developers; frameworks by large frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[15] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment signed 27 Mar 2026; effective 1 Jan 2027; framework for large frontier developers, critical safety incident reports for every frontier developer; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[16] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[17] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[18] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[19] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[20] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage; arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[21] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; non-binding; seven elements of Art. 3(1), inference as the indispensable condition; exclusions). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[22] CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[23] 12 CFR 1002.9 (Regulation B, notifications) (1002.9(b)(2) statement of specific principal reasons for adverse action; Supplement I commentary; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[24] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978) (adverse impact and the "four-fifths rule", with statistical-significance and small-numbers caveats; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[25] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Korea AI Basic Act) (Act No. 20676, in force 2026-01-22; Art. 2 as amended 2026-01-20; Arts. 2(4) high-impact areas, 2(7) AI business operators, 33 confirmation, 34 high-impact duties, 36 domestic representative). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[26] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (agency AI Governance Boards chaired at Deputy Secretary level with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[27] The AI Risk Repository: a meta-review, database, and taxonomy of risks from artificial intelligence (Domain Taxonomy of 7 domains and 24 subdomains; CC BY 4.0). Slattery, Saeri, Grundy et al., Patterns (Cell Press). 2026. https://doi.org/10.1016/j.patter.2026.101517 (verified: primary)
[28] "Name it to tame it: defining AI incidents and hazards" (summary of the OECD paper "Defining AI incidents and related terms", doi 10.1787/d1a8d965-en). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[29] NIST AI RMF Playbook, GOVERN (per subcategory: About, Suggested Actions, Transparency and Documentation, References; GOVERN 1.7 decommissioning and phasing out safely). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (risk tolerance and residual risk; seven trustworthy characteristics; transparency answers "what happened", explainability "how", interpretability "why"; MAP 1.1 intended purposes; MANAGE 1.1 go/no-go determination; profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[31] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles and five recommendations; 1.3 enables people adversely affected to challenge an output; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[32] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[33] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed with users' biometric information, to be deleted). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[34] Directive on Automated Decision-Making (algorithmic impact assessment completed and published before production; Appendix B and C impact levels; recourse; modified 2025-06-24). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[35] Directive (EU) 2024/2831 on improving working conditions in platform work (Arts. 7 limits on processing, 9 transparency, 10 human oversight, 11 human review; transposition by 2 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[36] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[37] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020 after a pilot; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[38] Regulation (EU) 2016/679 (General Data Protection Regulation) (Arts. 4(1), 4(5), 4(7), 4(8), 4(12), 4(14), 5, 6, 9, 12(3), 22, 25, 28(2) and 28(4), 30, 33, 35; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[39] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[40] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (referenced by identifier only; autonomy and heteronomy; clause 5.11 machine learning approaches: supervised, unsupervised, semi-supervised, reinforcement). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[41] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories of AI bias: systemic, statistical and computational, and human). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[42] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection rates and impact ratios by sex, race/ethnicity and intersectional categories; public summary; notice before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[43] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[44] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[45] On Calibration of Modern Neural Networks (modern networks poorly calibrated; ICML 2017; arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[46] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (Kleinberg, Mullainathan and Raghavan; three fairness conditions cannot hold together except in special cases; arXiv 1609.05807). arXiv. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[47] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[48] ISO/IEC 42001:2023, AI management systems (referenced by identifier only; requirements for an AI management system; clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[49] Overcoming catastrophic forgetting in neural networks (networks lose earlier competence when trained on new tasks; arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[50] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[51] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation; arXiv 2004.05785). Lu et al.. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[52] Content Credentials: C2PA Technical Specification, version 2.2 (a manifest of assertions, a claim and a claim signature bound to an asset). Coalition for Content Provenance and Authenticity (C2PA). 2025-05. https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html (verified: primary)
[53] NIST AI 100-4, Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency (provenance data tracking, watermarking, metadata recording and synthetic-content detection). NIST. 2024-11-20. https://doi.org/10.6028/NIST.AI.100-4 (verified: primary)
[54] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (Wachter, Mittelstadt and Russell; Harvard Journal of Law & Technology, 2018; arXiv 1711.00399). arXiv. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[55] "Counterfactual Fairness" (Kusner, Loftus, Russell and Silva; arXiv 1703.06856). arXiv. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[56] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[57] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about the entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[58] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[59] "Fairness Through Awareness" (Dwork, Hardt, Pitassi, Reingold and Zemel; individual fairness; limits of statistical parity; arXiv 1104.3913). arXiv. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[60] "Products liability" (design, manufacturing and marketing defects, incl. failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. 2026. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[61] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[62] 42 U.S.C. § 2000e-2 (Title VII: unlawful employment practices; 2000e-2(k) burden of proof in disparate-impact cases, business necessity and less discriminatory alternatives). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[63] Council Directive 2000/43/EC (Racial Equality Directive) (Art. 2(2)(a) direct and 2(2)(b) indirect discrimination, with objective justification). Official Journal of the EU (EUR-Lex). 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[64] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, in force 2026-01-22; Art. 29 domestic-representative thresholds). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[65] Guidelines on obligations for general-purpose AI providers, FAQ (a modifier becomes a provider only when the modification uses more than one third of the original model's training compute; obligations limited to the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[66] "Dual use of artificial-intelligence-powered drug discovery" (an inverted toxicity model proposed about 40,000 candidate toxic molecules in under six hours; Nature Machine Intelligence). Urbina, Lentzos, Invernizzi and Ekins (PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[67] SR 26-2, Revised Guidance on Model Risk Management (issued 17 Apr 2026 by the Federal Reserve, OCC and FDIC; supersedes and replaces SR 11-7 of 4 Apr 2011 and SR 21-8; effective challenge). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[68] "Equality of Opportunity in Supervised Learning" (Hardt, Price and Srebro; equalised odds and equal opportunity; arXiv 1610.02413). arXiv. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[69] Evidence-record schema v1 (evidence-record.v1.json) (AI Governance Engineer templates and schemas library). aigovernanceengineer.com. 2026-09-24. https://aigovernanceengineer.com/schemas/evidence-record.v1.json (verified: primary)
[70] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/17/107 (verified: secondary)
[71] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (Kearns, Neel, Roth and Wu; arXiv 1711.05144). arXiv. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[72] "Communication-Efficient Learning of Deep Networks from Decentralized Data" (McMahan et al.; federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[73] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream; arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[74] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225) (Art. 3 scope and private-actor declaration; Arts. 14 and 15 remedies and safeguards; Art. 16 risk and impact management). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[75] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[76] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; non-binding; indicative criterion of training compute above 10^23 FLOP with the ability to generate language, images or video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[77] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[78] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[79] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary; builds on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[80] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 Feb 2025; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[81] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; human-in-the-loop, human-on-the-loop and human-in-command oversight). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[82] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data includes data derived or extrapolated from non-health information, incl. by algorithms or machine learning). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[83] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8 internal channels for private entities with 50 or more workers; Art. 9 acknowledgment within seven days and feedback within three months; Art. 19 no retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[84] LLM01:2025 Prompt Injection (OWASP Top 10 for LLM Applications 2025; direct and indirect injection; jailbreaking as a form of prompt injection that makes the model disregard its safety protocols). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[85] JSON Schema Draft 2020-12. JSON Schema. 2022-06-16. https://json-schema.org/draft/2020-12 (verified: primary)
[86] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone; arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[87] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13; operative 2026-08-02; latent disclosures in generated content). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[88] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (three-step legitimate-interest test; anonymity test and evidence). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[89] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (Ribeiro, Singh and Guestrin; LIME; arXiv 1602.04938). arXiv. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[90] "Machine Unlearning" (Bourtoule et al.; SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[91] Commission Delegated Regulation (EU) 2025/301 (Art. 5, time limits for major ICT-related incident reports under DORA; Art. 5(2) late classification). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[92] "Membership Inference Attacks against Machine Learning Models" (Shokri et al.; arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[93] Hierarchy of Controls (elimination, substitution, engineering controls, administrative controls, PPE). CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[94] "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (Fredrikson, Jha and Ristenpart; CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[95] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, serious incident reporting, Measure 9.2; Appendix 1.4 specified systemic risks, incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[96] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data added to sensitive personal information under the CCPA; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[97] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[98] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity; Big Data & Society 3(1)). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[99] Llama 3.1 Community License Agreement (an example of an open-weight licence with an incorporated acceptable-use policy and attribution terms). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[100] Personal Information Protection Law of the People's Republic of China (Arts. 55 and 56 personal information protection impact assessment, records kept three years; official English translation). National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[101] Directive (EU) 2024/2853 on liability for defective products (software as a product; defectiveness incl. the ability to continue to learn; substantial modification; transposition by 9 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[102] "Dissecting racial bias in an algorithm used to manage the health of populations" (Obermeyer, Powers, Vogeli and Mullainathan; Science 366(6464):447-453; cost as a proxy for need). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[103] "Actionable Recourse in Linear Classification" (Ustun, Spangher and Liu; recourse as the ability to change a model's decision by altering actionable inputs; arXiv 1809.06514). arXiv. 2018-09-18. https://arxiv.org/abs/1809.06514 (verified: primary)
[104] "Extracting Training Data from Large Language Models" (Carlini et al.; verbatim training sequences extracted, incl. personal data; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[105] "Training language models to follow instructions with human feedback" (Ouyang et al.; supervised fine-tuning on demonstrations, then reinforcement learning from human feedback on ranked outputs; arXiv 2203.02155). arXiv. 2022-03-04. https://arxiv.org/abs/2203.02155 (verified: primary)
[106] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that redistributions and derivatives must carry). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[107] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[108] Concrete Problems in AI Safety (reward hacking among five practical problems; arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[109] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn; referenced by identifier only). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[110] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[111] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (function-to-clause mapping, incl. risk sources). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[112] IEC 61025:2006, Fault tree analysis (FTA) (edition 2.0). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[113] "A Unified Approach to Interpreting Model Predictions" (Lundberg and Lee; SHAP; arXiv 1705.07874). arXiv. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[114] "System Cards, a new resource for understanding how AI systems work" (documents a whole system of models, AI and non-AI components, where a model card documents one model). Meta AI. 2022-02-23. https://ai.meta.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/ (verified: primary)
[115] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Arts. 3 and 4: text and data mining for research and a general exception subject to a machine-readable reservation). Official Journal of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[116] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[117] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[118] Template for general-purpose AI model providers to summarise their training content (mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[119] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data (version 2.0). European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[120] 15 U.S.C. § 45 (FTC Act section 5) (unfair or deceptive acts or practices; 45(n) standard for unfairness). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[121] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
[122] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; autonomy as a deliberate design decision separate from capability and operational environment; five levels by user role: operator, collaborator, consultant, approver, observer). arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[123] RFC 8693, OAuth 2.0 Token Exchange (impersonation versus delegation semantics; the act (actor) claim; nested act claims record prior actors). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[124] SPIFFE overview (short-lived cryptographic identity documents called SVIDs, as X.509 certificates or JWTs; the Workload API issues and rotates them; SPIRE implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[125] Model Context Protocol, Security Best Practices, version 2026-07-28 (token passthrough defined and explicitly forbidden; servers MUST NOT accept any tokens not explicitly issued for them; audience validation). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[126] MITRE ATLAS data, release v2026.09 (AML.T0080 AI Agent Context Poisoning, .000 Memory; AML.T0110 AI Agent Tool Poisoning). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[127] Agent Control Standard (ACS) repository (a wire specification that lets a separate guardian agent permit, deny or modify an agent's action before it happens; the reference guardian's failure posture defaults to proceed, overridable to deny; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project (GitHub). 2026-09-01. https://github.com/GenAI-Security-Project/agent-control-standard (verified: primary)
[128] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01:2026 Prompt Injection, incl. memory persistence; LLM08:2026 Hidden Context Exposure, which replaced System Prompt Leakage: assume hidden context is discoverable, no credentials in it, not a security boundary; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[129] Agent2Agent (A2A) Protocol Specification, v1.0 (v1.0.0 released 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, signed with JWS over JCS-canonicalised JSON; servers authenticate every request; authorisation implementation-specific; scope and revocation of in-task authorisation not defined). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[130] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[131] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group, revision 11 of 30 Jul 2026, WG state "Waiting for Write-Up"; short-lived signed tokens that propagate user identity, workload identity and authorisation context through a call chain within a trusted domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[132] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group, revision 02 of 6 Jul 2026; a URL used as client_id that refers to the client's metadata document). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[133] Threats: Microsoft Threat Modeling Tool (the STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; the tool is a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[134] Threat Modeling Manifesto (threat modelling as analysing representations of a system to highlight concerns about security and privacy characteristics; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-25). https://www.threatmodelingmanifesto.org/ (verified: primary)
[135] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private PKI, self-signed certificates, bare keys, keyless Sigstore). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[136] SLSA specification v1.2, Build track basics (provenance: what built the artefact, by what process and from which top-level inputs; Build L1 provenance exists, L2 hosted build platform, L3 hardened builds). OpenSSF SLSA project. n.d. (accessed 2026-09-25). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[137] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-25). https://huggingface.co/docs/safetensors/index (verified: primary)
[138] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[139] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy, 53% on general-purpose content; competent and reliable evidence required at the time a claim is made). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[140] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; retraining; output filters accepted if shown sufficiently effective and robust, based on general rules rather than lists of people). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[141] Authorization (Cedar Policy Language Reference Guide) (no request is allowed unless a permit policy grants it, so the default decision is Deny; any satisfied forbid overrides every permit). Cedar. n.d. (accessed 2026-09-25). https://docs.cedarpolicy.com/auth/authorization.html (verified: primary)
[142] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; transparency report; critical safety incidents to the Office of Emergency Services within 15 days). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
