# La Tesis de la Ingeniería de Gobernanza de IA

Versión 0.4.0 · 2026-09-19 · Jorge García Aibar y Aurélie Pols

_Traducción al español de `THESIS.md` (2026-09-20). En caso de discrepancia, prevalece el texto original en inglés._

---

**La ingeniería de gobernanza de IA es la aplicación de la práctica de la ingeniería (pensamiento
sistémico, pensamiento de producto y código) a la gobernanza de los sistemas de IA.** Trata la
gobernanza no como un documento que se firma, sino como un sistema que se construye, se ejecuta y se
mide, con el mismo rigor que los ingenieros ya aplican a los modelos y agentes que gobierna.

Es más que «gobernanza de IA más unos cuantos scripts». Es un cambio en cómo se hace el trabajo. La
gobernanza de IA heredada describe un sistema de IA sobre el papel y confía en que el papel siga siendo
cierto. Hacer ingeniería de la gobernanza significa que la política es ejecutable, que el control se
ejecuta en el pipeline, que la evidencia se produce como subproducto de la construcción, y que todo el
conjunto se juzga con una sola prueba: ¿bajó realmente el riesgo, y puede un regulador o un auditor leer
la demostración? Es una capacidad, no un puesto de trabajo. Cualquiera que esté lo bastante cerca de la
construcción puede desarrollarla. Se mide por la reducción real del riesgo y por la evidencia lista para
auditoría, nunca por cuántos marcos aparecen en una diapositiva.

La idea no surge de la nada. Hereda de una línea de movimientos de ingeniería que convirtieron el
proceso en sistemas en ejecución: la ingeniería de fiabilidad de sitios (SRE), DevSecOps, la política
como código (policy-as-code) y la seguridad de la cadena de suministro de software. De forma más
directa, hereda de la ingeniería GRC (gobernanza, riesgo y cumplimiento), que desde aproximadamente 2024
ha convertido la gobernanza, el riesgo y el cumplimiento en un producto construido con código, probado en CI/CD y que
entrega evidencia a través de APIs [1]. La gobernanza de IA necesita ahora el mismo salto, porque lo que
se gobierna (modelos que se reentrenan, prompts que cambian, agentes que actúan por su cuenta) se mueve
más rápido de lo que cualquier documento puede seguir.

## Problemas fundamentales de la gobernanza de IA heredada

**1. Gobernanza escrita para sistemas que ya no existen.** La gobernanza de IA heredada funciona con
políticas en PDF e inventarios en hojas de cálculo que describen un sistema de IA tal como era el día en
que se revisó. Pero los modelos se reentrenan, los prompts se reescriben y los agentes adquieren nuevas
herramientas cada día. El artefacto queda obsoleto antes de firmarse. No es casualidad que la función
siga residiendo sobre todo en privacidad, en el área jurídica y en TI, y solo en un 5 % en seguridad
[3]: lejos del pipeline donde el sistema cambia de verdad.

**2. Revisión puntual de algo que cambia continuamente.** Las evaluaciones anuales y las aprobaciones de
comité presuponen un sistema que se mantiene quieto el tiempo suficiente para ser juzgado. Los modelos
de frontera y los agentes autónomos no lo hacen. Gartner espera que más del 40 % de los proyectos de IA
agéntica se cancelen antes de que acabe 2027, y cita entre las causas unos controles de riesgo
inadecuados [4]; y predice que para 2029 más de la mitad de los ataques con éxito contra agentes de IA
explotarán debilidades de control de acceso e inyección de prompts [5]: modos de fallo en tiempo de
ejecución ante los que una revisión anual es estructuralmente ciega.

**3. Gobernanza como barrera al final, no como propiedad de la construcción.** La gobernanza llega
después de entrenar el modelo, como un punto de control que hay que superar antes del lanzamiento. Los
ingenieros la viven como un peaje que se cobra en la puerta, y nada de lo que produce se reconecta con la
forma en que se construye el sistema. Una política que solo puede recomendar no puede detener un mal
despliegue. Una eval que puede hacer fallar la construcción, sí. La gobernanza colocada al final solo
puede describir el riesgo; la gobernanza integrada en el pipeline puede prevenirlo.

**4. Teatro de marcos.** Mapear a NIST AI RMF o a ISO/IEC 42001 se convierte en el estado final en lugar
de en el punto de partida. Se confunde una matriz de mapeo en verde con un control que funciona. Y, sin
embargo, a 2026-09-24 no hay ninguna norma armonizada citada en el Diario Oficial de la UE, de modo que
ni siquiera un certificado ISO 42001 confiere presunción de conformidad con el Reglamento de IA [6]. La
cobertura no es aseguramiento. Un crosswalk (tabla de correspondencias) demuestra que has leído el marco,
no que el control al que apunta se dispare de verdad; una matriz en verde sobre un control roto es
«teatro con pasos de más» [2].

**5. Sin vía de datos en tiempo de ejecución.** El registro no sabe qué está en ejecución. Gartner
pide a las plataformas de gobernanza de IA «la aplicación automatizada de políticas en tiempo de
ejecución» [11]; sin embargo, la comparativa de un proveedor, publicada por un competidor de la propia
categoría, concluye que la mayor parte de ella «gestiona el programa (inventarios, evaluaciones, mapeos
de marcos, flujos de trabajo de evidencia) sin ninguna vía de datos en tiempo de ejecución» [7]. El
propio relato de IBM sobre su reconocimiento como Líder en el primer Cuadrante Mágico de Gartner para
Plataformas de Gobernanza de IA (junio de 2026) apunta en la misma dirección: describe visibilidad sobre
los casos de uso de IA y una hoja de ruta de inventario centralizado de activos de IA, trazabilidad e
incorporación de casos de uso (la capa de programa), y no menciona la aplicación de controles en tiempo
de ejecución [10]. Así, las tres preguntas que definen la disciplina (qué IA está en
ejecución, qué se le permite hacer, qué evidencia lo demuestra) quedan sin responder, porque nada está
conectado a producción. Mientras tanto, la encuesta de 2026 de un proveedor de seguridad señala que
aproximadamente una de cada ocho brechas de IA afectó a sistemas agénticos [8]: justo la capa que el registro en papel no puede ver.

## Valores

Ocho afirmaciones. Cada una declara aquello hacia lo que construimos y, al nombrarlo, aquello de lo que
nos alejamos. No todas son nuevas: los valores 1, 5 y 7 (la gobernanza como código, la evidencia legible
por máquina y la reducción medida del riesgo) se heredan de la ingeniería GRC; los valores 2 y 4 (las
evals que hacen fallar la construcción, y la identidad y el alcance de los agentes) son lo que la IA nos
obliga a añadir. El capítulo 03 amplía cada uno con un ejemplo práctico y el antipatrón que rechaza.

**1. La gobernanza es código, no un documento.** Una política en un PDF es una declaración de
intenciones que una persona debe recordar y aplicar; una política como código es un control que se
ejecuta, versionado en un repositorio y aplicado sin que nadie tenga que acordarse. El documento describe
la regla; el código *es* la regla, y solo lo que se ejecuta se puede medir.

**2. Las evals hacen fallar las construcciones; las revisiones solo recomiendan.** Una revisión produce
una recomendación sobre la que alguien puede actuar, más tarde, o no. Una eval produce un veredicto con
consecuencias: el modelo o el agente pasó o no pasó una prueba definida, y un fallo bloquea la
publicación. Preferimos los controles que muerden.

**3. La evidencia viene del tiempo de ejecución, no de una atestación puntual.** Una atestación dice que
un control estaba en su sitio cuando alguien miró. La evidencia en tiempo de ejecución lo muestra
funcionando de forma continua, emitida por el sistema a medida que se ejecuta, porque un sistema de IA
cambia entre revisiones y la evidencia recogida una sola vez se degrada de inmediato.

**4. Cada agente lleva su propia identidad y su propio alcance.** Un actor que usa credenciales
compartidas es ingobernable: no puedes atribuir sus acciones, revocar su acceso con precisión ni acotar
lo que puede hacer. La identidad es la condición previa de la rendición de cuentas; el alcance es la
condición previa de la contención, y ambos se establecen antes de que se permita actuar al actor.

**5. La evidencia es legible por máquina o no es evidencia.** La evidencia que una persona tiene que
producir, formatear y archivar a mano no se puede consultar, comparar ni verificar con rapidez. Los
artefactos legibles por máquina (OSCAL, resultados estructurados de evals, registros firmados)
convierten la auditoría en una consulta y alimentan el aseguramiento continuo en lugar de una carpeta
puntual.

**6. Las herramientas deben ser inspeccionables y componibles.** No puedes confiar en un veredicto que no
puedes rastrear. Unas herramientas cuyo razonamiento y vía de datos puedes abrir, compradas o
construidas, te permiten seguir una decisión hasta la regla que la produjo y la evidencia que emitió, e
integrarlas en el pipeline que ya ejecutas en lugar de exportarla al de otra persona.

**7. El éxito se mide en reducción real del riesgo, no en cobertura de marcos.** Mapear cada control a un
marco demuestra que lo has leído, no que haya bajado ningún riesgo. Medimos la cosa en sí: ¿cayó la
frecuencia del modo de fallo?, ¿se redujo el radio de impacto?, ¿se detectó antes el incidente? La
cobertura es una entrada; la reducción real del riesgo es el resultado.

**8. La gobernanza se posee junto con ingeniería, no se impone desde fuera.** Una gobernanza que se
sitúa aparte y concede o deniega el paso es un cuello de botella que los ingenieros esquivan. Poseída de
forma conjunta con ingeniería, integrada en el camino pavimentado, adoptada porque es la forma más fácil
de entregar, pasa a formar parte de cómo se hacen las cosas, no de una reunión que un bando teme.

## Principios

Los valores dicen lo que preferimos; estos principios dicen lo que nos comprometemos a *hacer*. Son
reglas de acción, no una reformulación de las preferencias anteriores.

**Construye el control en el punto más temprano en el que pueda bloquear.** Coloca cada control donde
todavía pueda detener aquello que va a salir mal, y no más tarde: en el repositorio, la construcción y el
tiempo de ejecución, no en una revisión a posteriori. El punto exigible más temprano es el más barato y
el más fuerte, así que ahí es donde lo ponemos.

**Dale dientes a cada control, o llámalo señal.** Un control tiene que poder cambiar lo que ocurre a
continuación: bloquear un merge, hacer fallar un despliegue, revocar un acceso. Cualquier cosa que solo
pueda informar a un comité es una señal, y la etiquetamos honestamente como tal en lugar de disfrazarla
de control.

**Registra y acota cada actor antes de que actúe.** Nada, humano o no humano, llega a actuar hasta que
tiene un responsable, un alcance declarado y una forma de ser detenido. La autonomía se concede solo allí
donde puede atribuirse, contenerse y retirarse, nunca por defecto.

**Instrumenta la construcción para que produzca su propia demostración.** Conecta cada control para que
emita su propio registro a medida que se ejecuta, de modo que el aseguramiento salga del sistema en lugar
de montarse a mano. Si demostrar un control necesita una captura de pantalla, no hemos terminado de
construirlo.

**Parte de un modo de fallo con nombre o de un daño con nombre.** Diseña cada control frente a una forma
específica en que el sistema falla (inyección de prompts, uso indebido de herramientas, abuso de la
identidad de un agente, exfiltración de datos) o frente a un daño específico a los derechos de una
persona. Si no podemos nombrar el riesgo al que responde, no lo construimos.

**Haz que el camino gobernado sea el camino más fácil.** Entrega la gobernanza como herramientas,
plantillas y caminos pavimentados que los ingenieros adoptan sin pedir permiso, y mide la adopción. Si
esquivar la gobernanza es más fácil que usarla, arreglamos el producto, no a las personas.

## Qué construyen los ingenieros de gobernanza de IA

No presentaciones. Artefactos que funcionan, versionados en un repositorio y en ejecución en producción:

- **Policy-as-code** (política como código): reglas de gobernanza como política ejecutable (`OPA/Rego`,
  Cedar, Policy Cards) que se evalúan en CI/CD y en tiempo de ejecución.
- **Un registro de agentes** (agent registry): el inventario, consciente del tiempo de ejecución, de
  cada modelo, servicio y agente, cada uno con un responsable, un alcance y un estado.
- **AIBOM y model/data cards** (fichas de modelo y de datos): la lista de materiales de un sistema de IA
  (`CycloneDX ML-BOM`, perfil `SPDX 3.0 AI`) y documentación de transparencia estructurada.
- **Eval gates en CI** (puertas de evaluación): evals adversariales y de capacidad (Inspect, promptfoo,
  Garak, Giskard) integradas en el pipeline para que una eval fallida bloquee la publicación.
- **Guardrails de ejecución y kill switches** (barreras de protección e interruptores de parada):
  controles de entrada/salida, mediación de llamadas a herramientas y una forma probada de detener a un
  agente, en el punto de acción.
- **Telemetría de aseguramiento continuo**: trazas y monitorización (`OpenTelemetry`, observabilidad de
  agentes) que convierte el comportamiento en producción en una señal de control en vivo.
- **Evidencia legible por máquina**: `OSCAL` y artefactos estructurados y firmados que hacen de la
  auditoría una consulta en lugar de una carrera a contrarreloj.
- **Pipelines de incidentes**: la fontanería para detectar, triar y notificar incidentes graves dentro
  de plazo, incluida la notificación del artículo 73 del Reglamento de IA de la UE para los sistemas de
  alto riesgo.
- **Plantillas de FRIA y DPIA como código**: evaluaciones de impacto en los derechos fundamentales
  (FRIA) y en la protección de datos (DPIA) mantenidas como artefactos versionados y revisables, no como
  documentos puntuales.

Estos artefactos se corresponden, capa a capa, con las cinco capas del stack de ingeniería de gobernanza
de IA: Govern-as-Code, Inventory & Transparency, Evals & Red Teaming as Evidence, Runtime Controls &
Observability, y Assurance & Continuous Compliance (en español: Gobernar como código; Inventario y
transparencia; Evals y red teaming como evidencia; Controles y observabilidad en tiempo de ejecución; y
Aseguramiento y cumplimiento continuo).

Reconocemos la herencia con claridad, porque es la defensa honesta frente a «esto no es más que GRC con
palabras de IA». Tres de las cinco capas (Govern-as-Code, Inventory & Transparency y Assurance &
Continuous Compliance, que aportan la política como código, el inventario de activos y la evidencia
legible por máquina) se heredan de la ingeniería GRC y se trasladan casi sin cambios. Dos son lo que la
IA nos obliga a añadir: las evals y el red teaming *como controles* (capa 03), porque lo que se gobierna
es un modelo cuyo comportamiento solo puede establecerse probándolo; y la identidad de los agentes y el
control en tiempo de ejecución (capa 04), porque un actor autónomo no tiene análogo en el GRC clásico. El
trabajo nuevo de la disciplina se concentra en esas dos capas.

## Una disciplina distinta de sus vecinas

La ingeniería de gobernanza de IA no es investigación en seguridad de la IA (AI safety), ni MLOps, ni
gestión del riesgo de modelos (model risk management), ni cumplimiento o trabajo jurídico de IA, ni la
ética de la IA responsable (Responsible AI); es la ingeniería que convierte todo eso en controles en
ejecución y evidencia legible. Es la hermana, en la era de la IA, de la ingeniería de seguridad de la IA,
y la descendiente directa de la ingeniería GRC. Merece la pena señalar un choque de nombres: algunos
proveedores usan las mismas palabras, «AI governance engineering», para el problema inverso: gobernar las
herramientas de IA que los ingenieros usan dentro de sus propios flujos de trabajo [9]. Eso es ingeniería
de IA gobernada, no la disciplina que se describe aquí. El capítulo 01 traza cada una de estas líneas en
detalle.

## Autores

**Jorge García Aibar (v0.1–v0.4.0)**, AI Governance & Privacy Engineer. LinkedIn:
https://www.linkedin.com/in/jorgara

**Aurélie Pols (v0.1–v0.4.0)**, Responsible AI (EU/Global), Privacy & Data Governance. LinkedIn:
https://www.linkedin.com/in/aureliepols

**Se buscan coautores.** Esta es la versión 0.4.0: un borrador público, deliberadamente incompleto. Lo
empezó un solo profesional y necesita a muchos. Si construyes gobernanza para sistemas de IA (policy-as-
code, registros de agentes, eval gates, guardrails de ejecución, aseguramiento continuo) y puedes aportar
un hecho verificado, un patrón que funcionó o un argumento más afilado, se te invita a coescribir. La
disciplina es una capacidad que cualquiera puede desarrollar, y este texto pertenece a todos los que
hacen el trabajo.

## Firma / participa

- **Léela** en https://aigovernanceengineer.com/thesis y el Cuerpo de Conocimiento (Body of Knowledge) en
  https://aigovernanceengineer.com/bok
- **Firma la Tesis** abriendo un pull request que añada tu nombre a `bok/CONTRIBUTORS.md` (sección
  SIGNATORIES) en el repositorio, `github.com/losanchos5/aige`.
- **Contribuye con un capítulo o un patrón** siguiendo `STYLEGUIDE.md`; toda afirmación factual necesita
  una cita con fuente y verificada.
- **Debátela** en LinkedIn con Jorge García Aibar (https://www.linkedin.com/in/jorgara), nombrando la
  disciplina, no a la persona.

## Licencia

Esta Tesis está publicada bajo licencia **CC BY 4.0**. Puede compartirse y adaptarse siempre que se dé
el crédito adecuado, se incluya un enlace a la licencia y se indiquen los cambios. Atribución: Jorge
García Aibar y Aurélie Pols.

## Fuentes

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] AI Governance Profession Report 2025. IAPP (with Credo AI). 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[4] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[5] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027". Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[6] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[7] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; runtime data path critique). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[8] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[9] "AI Governance Engineering" (governing AI used inside engineering workflows). Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
