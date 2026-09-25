---
lang: es
source: bok/02-why-now.md
sourceHash: "fd5e154caa65ef30565b60079cffc5a315d017e112d2db5705e6d107d4af8a78"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 02. Por qué ahora

> La ingeniería de gobernanza de IA se está formando ahora porque la cosa siendo gobernada cambió de
> forma, el mercado comenzó a contratar habilidades de ingeniería antes de que la profesión se
> nombrara a sí misma, y la ley comenzó a pedir evidencia ingenierizada, todo entre abril de 2025 y
> agosto de 2026.

Las disciplinas no aparecen en un cronograma. Aparecen cuando una forma antigua de trabajar
visiblemente deja de funcionar y suficientes personas, en suficientes lugares, comienzan a construir
el reemplazo a la vez. Eso está sucediendo a la gobernanza de IA ahora. La Tesis establece cinco
problemas fundamentales con la gobernanza de IA heredada; este capítulo toma cada uno a su vez,
adjunta la evidencia, y luego expone las señales de mercado, regulatorias y técnicas que juntas
explican el momento. La afirmación es estrecha y falsable: no que la gobernanza de repente importe,
sino que la *ingeniería* de la gobernanza se ha convertido en la restricción, y que los datos ahora
lo dicen. Las declaraciones fechadas son actuales a partir de 2026-09-24.

## Los cinco problemas, con la evidencia

### 1. Gobernanza escrita para sistemas que ya no existen

La gobernanza heredada describe un sistema de IA tal como estaba el día en que fue revisado,
mientras que los modelos se reentrena, los prompts cambian y los agentes ganan herramientas día a
día; el artefacto está obsoleto antes de ser firmado. La señal estructural es *dónde se sienta la
función*. En el Informe de Profesión de Gobernanza de IA 2025 de IAPP, la función de gobernanza de
IA se aloja principalmente con privacidad (22%), legal y cumplimiento (22%) e IT (17%), y con solo
5% en seguridad [1], lejos del pipeline donde el sistema cambia. Una función en la capa de revisión,
no la capa de construcción, no puede mantener su descripción de producción verdadera, porque nada la
conecta al despliegue.

### 2. Revisión en un punto en el tiempo de una cosa continuamente cambiante

Las evaluaciones anuales y las aprobaciones de comités asumen un sistema que se mantiene quieto el
tiempo suficiente para ser juzgado. Los modelos fronterizos y los agentes autónomos no. Gartner
espera que más del 40% de los proyectos de IA agéntica sean cancelados antes del final de 2027,
nombrando controles de riesgo inadecuados entre las causas [2], y predice que para 2029 más de la
mitad de los ataques exitosos en agentes de IA explotarán debilidades de control de acceso e
inyección de prompts [3]. Ambos son modos de fallo en tiempo de ejecución (el sistema funcionando
mal entre revisiones), y una evaluación una vez al año es estructuralmente ciega a ellos. Esto no es
el mismo trabajo que la gestión de riesgo de modelos en la tradición SR 11-7, que valida un modelo
en puntos en el tiempo; el objeto aquí nunca deja de moverse. La propia orientación de EE.UU. de la
tradición está de acuerdo en el límite: SR 26-2, que reemplazó SR 11-7 el 17 de abril de 2026, deja
modelos generativos y agénticos de IA fuera de su alcance [22][23]. El capítulo 11 enumera
[los rasgos de la IA que rompen la gobernanza clásica de TI](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance),
cada uno emparejado con el control que lo responde.

### 3. Gobernanza como un gate al final, no una propiedad de la construcción

La gobernanza todavía tiende a llegar después de que el modelo es entrenado, como un checkpoint para
pasar antes del lanzamiento, y nada de lo que produce está conectado a cómo se construye el sistema.
Una política que solo puede recomendar no puede detener una liberación mala; un eval conectado a un
`eval gate` que puede fallar la construcción puede: la diferencia entre un control que describe
riesgo y uno que lo previene. El capítulo 14 reconstruye
[la construcción como una cadena de gates](/bok/governing-development#the-build-as-a-chain-of-gates).

### 4. Teatro de framework

Mapear a NIST AI RMF o ISO/IEC 42001 se convierte en el estado final en lugar del punto de partida,
y una matriz de mapeo verde es confundida con un control que funciona. Sin embargo, a partir de
2026-09-24 ninguna norma armonizada es citada en el Diario Oficial de la UE, por lo que no hay
presunción de conformidad del Artículo 40 para el Reglamento de IA [4]. Incluso EN ISO/IEC 42001, la
norma de sistema de gestión de IA, no es el sistema de gestión de calidad del Artículo 17 que
requiere el Reglamento y no confiere presunción de conformidad por sí sola [5]. La cobertura no es
aseguramiento. Un crosswalk prueba que has leído el framework; no prueba que el control al que
apunta realmente funcione.

### 5. Sin ruta de datos en tiempo de ejecución

El registro no sabe qué se está ejecutando. La comparación de un proveedor de la categoría de
plataforma de gobernanza de IA, publicada por un competidor en ella, encuentra que la mayoría de la
categoría "gestiona el programa (inventarios, evaluaciones, mapeos de framework, flujos de trabajo
de evidencia) sin ninguna ruta de datos en tiempo de ejecución" [6]. Trata eso como una afirmación a
probar, no un hecho establecido; donde se sostiene, las tres preguntas que definen la disciplina
(qué IA se está ejecutando, qué se le permite hacer, qué evidencia lo prueba) quedan sin respuesta,
porque nada está conectado a producción. Mientras tanto, una encuesta de 2026 de un proveedor de
seguridad reporta que aproximadamente uno de cada ocho brechas de IA involucraron sistemas agénticos
[7]: exactamente la capa que el registro de papel no puede ver. Un control sin telemetría es una
afirmación, no un control.

## La evidencia

### La profesión está insuficientemente dotada de personal, y lo sabe

La señal más clara de que el trabajo ha superado su forma actual es que casi nadie piensa que tiene
suficientes personas para hacerlo. En el informe 2025 de IAPP, de 671 encuestados solo 10 (1,5%)
dijeron que no necesitarán personal adicional de gobernanza de IA en los próximos 12 meses [1].
Aproximadamente el 77% de las organizaciones reportan trabajar en gobernanza de IA, subiendo a
aproximadamente nueve de cada diez entre aquellas que ya usan IA [1]. La demanda es casi universal;
la capacidad no. Cuando una función es deseada en todas partes, insuficientemente dotada de
recursos, y alojada fuera de la capa de construcción, la brecha no se cierra contratando más
revisores. Se cierra convirtiendo la gobernanza en un sistema que escala, que es un problema de
ingeniería.

### El mercado está contratando para la ingeniería

El mercado laboral ya está contratando para este cambio, y lo está haciendo en el vocabulario de la
ingeniería. Un análisis de 1.997 publicaciones de gobernanza de IA de Estados Unidos, actualizado en
agosto de 2026, encontró que la habilidad más común demandada era plataformas de observabilidad, en
41% de las publicaciones, seguida de Python (28%) y frameworks NIST (27%) [8]. Estas son habilidades
de construcción y ejecución, no habilidades de revisión. En la frontera, Anthropic anunció en 2026
un Engineering Manager para GRC encargado de construir una función de "ingeniería de GRC orientada a
IA", traduciendo "políticas en política como código", e implementando flujos de trabajo agénticos
que usan Claude "para servir como analista virtual de GRC" [9]. Las publicaciones describen la
sustancia de la ingeniería de gobernanza de IA; aún no han acordado su nombre.

### Registro versus tiempo de ejecución

El mercado de herramientas cuenta la misma historia desde el lado de la oferta. Gartner publicó su
primer Magic Quadrant para Plataformas de Gobernanza de IA en junio de 2026, como uno de los
proveedores nombrados en él reportó [10]. El propio marco de Gartner de la categoría pide más que un
registro: su análisis de febrero de 2026 dice que estas plataformas deberían permitir "aplicación de
políticas automatizada en tiempo de ejecución" y monitoreo continuo, y espera que el gasto en
gobernanza de IA alcance USD 492 millones en 2026 y pase USD 1 mil millones para 2030 [11]. Lo que
se pide a la categoría que haga y lo que envía son preguntas diferentes. La comparación de
proveedores citada arriba, que califica a los trece proveedores en el Magic Quadrant, encuentra que
la mayoría de ellos gestiona el programa "sin ninguna ruta de datos en tiempo de ejecución" [6], y
la cuenta que un Líder da de su propia colocación centra la visibilidad en casos de uso de IA y una
hoja de ruta de inventario de activos, linaje e incorporación de casos de uso [10]. La pregunta a
hacer a cualquier plataforma es por lo tanto concreta: ¿fue esta decisión de política tomada en una
llamada en vivo, y dónde está el registro? La distancia entre la definición del analista y esa
respuesta es el espacio que ocupa la disciplina.

### La brecha de normas

El problema del teatro de marcos tiene un plazo duro asociado. A partir del 2026-09-24, cero normas
armonizadas están citadas en el Diario Oficial, por lo que la presunción de conformidad del artículo
40 aún no está disponible para nadie [4]. EN 18286, la norma de gestión de la calidad dirigida al
artículo 17, fue publicada en julio de 2026, la primera norma JTC 21 redactada para el Reglamento de
IA en alcanzar publicación, pero aún no está citada en el Diario Oficial, por lo que no conlleva
presunción de conformidad [4][12]. Se informó que las normas de gestión de riesgos del artículo 9,
registro del artículo 12 y ciberseguridad del artículo 15 seguían en fase de Consulta a mediados de
2026, con objetivo de finales de 2026 [13]. EN ISO/IEC 42001:2026, la adopción europea de la norma
de sistema de gestión de IA, no es la QMS del artículo 17 y no evidencia por sí sola la conformidad
[5]. La consecuencia práctica para una función de gobernanza: durante el período cubierto por esta
edición, no hay norma contra la que puedas certificarte para obtener una presunción legal. Tienes
que construir los controles y la evidencia tú mismo y estar listo para defenderlos por sus méritos.

### La onda regulatoria: el Omnibus y la aplicación de GPAI

La ley se movió dos veces en el verano de 2026, en direcciones opuestas, y ambos movimientos apuntan
a la ingeniería. Primero,
[el Omnibus Digital, Reglamento (UE) 2026/1744](/bok/eu-ai-act#the-act-and-the-omnibus), entró en
vigor el 27 de julio de 2026, seis días antes del plazo de alto riesgo del 2 de agosto, y reinició
el reloj: las obligaciones de alto riesgo del Anexo III se trasladaron del 2 de agosto de 2026 al 2
de diciembre de 2027, y el alto riesgo integrado del Anexo I del 2 de agosto de 2027 al 2 de agosto
de 2028 [14][19]. El tiempo extra es real, pero no es alivio de la ingeniería; es más pista para
hacerlo. Segundo, e inmóvil por el Omnibus, la aplicación de GPAI entró en vigor el 2 de agosto de
2026: la Oficina de IA ahora puede exigir documentación, evaluar modelos y requerir medidas, y la
Comisión puede multar a proveedores de modelos de uso general hasta el 3% de la facturación anual
global o EUR 15 millones, lo que sea superior, conforme al artículo 101 [15]. El 29 de agosto de
2026, la Vicepresidenta Ejecutiva de la Comisión Henna Virkkunen anunció que la Oficina de IA había
enviado formalmente sus primeras solicitudes de información a varios proveedores de GPAI, cubriendo
seguridad de modelos, evaluaciones externas independientes y el monitoreo de modelos una vez que
están en el mercado [16]. Lo que las obligaciones exigibles piden (evaluaciones de modelos, pruebas
adversariales, informes de incidentes, seguridad de pesos) es un programa de ingeniería, no una
carpeta de políticas.

Los próximos cambios están fechados en el Omnibus mismo [19]. El 2 de diciembre de 2026 se aplican
las nuevas prohibiciones del artículo 5 sobre imágenes íntimas no consentidas generadas por IA y
material de abuso sexual infantil, y los proveedores de sistemas generativos colocados en el mercado
antes del 2 de agosto de 2026 deben cumplir la obligación de marcado del artículo 50(2). Las
obligaciones de alto riesgo del Anexo III siguen el 2 de diciembre de 2027 y el Anexo I el 2 de
agosto de 2028; los sistemas de alto riesgo destinados a autoridades públicas que ya estaban en el
mercado deben cumplir antes del 2 de agosto de 2030.
[El capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus) asigna cada fecha al artefacto que la
responde.

El mismo tirón aparece fuera de la UE.
[SB 53 de California](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
la Ley de Transparencia en Inteligencia Artificial Fronteriza, firmada el 29 de septiembre de 2025 y
en vigor desde el 1 de enero de 2026, vincula a grandes desarrolladores fronterizos (modelos
entrenados con más de 10^26 operaciones; ingresos anuales superiores a USD 500 millones) a publicar
un marco de IA fronteriza, y a cada desarrollador fronterizo, grande o no, a informar incidentes
críticos de seguridad al Servicio de Emergencias de la oficina estatal dentro de 15 días, con
sanciones civiles de hasta USD 1 millón por violación recuperadas por el Fiscal General [17][18]. Su
alcance es estrecho (el capítulo 08 lo sitúa junto a las otras
[leyes estatales de EE.UU.](/bok/regulatory-map#us-federal-and-state-laws)), pero lo que pide, un
marco publicado y
[un pipeline de incidentes que funciona según un reloj](/bok/incidents#the-overlapping-clocks), es
nuevamente un entregable de ingeniería.

### El cambio de agentes

La última señal es el objeto de la gobernanza misma. Los agentes que navegan, ejecutan código,
llaman APIs y actúan bajo autoridad delegada son ahora lo más difícil y nuevo de gobernar, y la
evidencia de que los controles heredados no pueden verlos se acumula. El pronóstico de Gartner de
que para 2029 más de la mitad de los ataques exitosos contra agentes de IA explotarán debilidades de
control de acceso e inyección de prompts [3] nombra identidad e inyección (preocupaciones de tiempo
de ejecución) como la superficie de ataque dominante. El problema de identidad es concreto: el 5 de
febrero de 2026, el Centro Nacional de Excelencia en Ciberseguridad de NIST publicó un documento
conceptual sobre cómo se aplican identificación, autenticación y autorización para que los agentes
sean "conocidos, confiables y adecuadamente gobernados", preguntando cómo las acciones de los
agentes pueden registrarse de manera a prueba de manipulaciones y vincularse de nuevo a un humano
para no repudio [20]. Un agente ejecutado en una cuenta de servicio genérica compartida falla esa
prueba por construcción: sus acciones no pueden rastrearse o revocarse con precisión. El Top 10 de
OWASP para Aplicaciones Agentic 2026 cataloga los modos de fallo que siguen, desde secuestro de
objetivo de agente (ASI01) pasando por mal uso de herramientas (ASI02) e identidad de agente y abuso
de privilegios (ASI03) hasta agentes deshonestos (ASI10) [21]. Y la encuesta de proveedores de 2026
citada anteriormente informa aproximadamente uno de cada ocho incidentes de IA que involucran
sistemas agentic [7]. El modelo de amenaza se ha movido a la capa que el registro de papel no puede
alcanzar. El capítulo 23 asigna
[esas amenazas a controles](/bok/governing-agents#threats-mapped-to-controls).

## Qué cambia cuando la gobernanza se ingeniería

Los cinco problemas comparten una raíz: gobernanza que describe en lugar de ejecutar. Ingenierizar
la gobernanza cambia el artefacto, y cambiar el artefacto cambia lo que la función puede prometer.
Cuando el registro se alimenta del pipeline de despliegue, "¿qué IA se está ejecutando?" es una
consulta en vivo, no una adivinanza trimestral, y la antigüedad del problema 1 deja de existir.
Cuando un `eval gate` falla la compilación en un umbral de resistencia a inyección caído y una
política compilada a código bloquea un despliegue fuera de región, la revisión puntual del problema
2 y la puerta de fin de línea del problema 3 ceden a controles que se activan donde cambia el
sistema. Cuando decisiones de guardrail, resultados de evals y veredictos de política fluyen hacia
un almacén de aseguramiento como registros legibles por máquina, el teatro de marcos del problema 4
es respondido por una medida que es la tasa de caída de un modo de fallo nombrado, no un recuento de
celdas verdes. Y cuando la identidad precede a la autonomía y la telemetría se convierte en una
señal de control en vivo, la ruta de datos de tiempo de ejecución del problema 5 es la columna
vertebral en lugar de una ocurrencia tardía, por lo que las tres preguntas se vuelven respondibles
en cualquier martes dado, desde sistemas en vivo.

Nada de esto es una afirmación de que la gobernanza ingeniería garantiza cumplimiento; ningún
artefacto lo hace, y ninguna norma aún confiere una presunción. La afirmación es más estrecha y más
útil: medida contra reducción real del riesgo y evidencia lista para auditoría, una función de
gobernanza que se ejecuta supera a una que está escrita, y el mercado, el regulador y el modelo de
amenaza han todos, entre abril de 2025 y agosto de 2026, comenzado a pedir la versión que se
ejecuta. Por eso ahora.

> **En la práctica**
> Dentro de una gran telco, el cambio de "documentado" a "ingeniería" fue visible en un simulacro de
> incidentes de un solo trimestre. La versión en papel respondió "¿qué agentes pueden alcanzar la
> API de pagos?" con una hoja de cálculo que tenía una semana de antigüedad y le faltaban dos
> servicios levantados desde la última revisión. Después de que el registro se conectó al pipeline
> de despliegue y cada agente recibió una identidad con alcance, la misma pregunta fue una consulta
> que devolvió propietarios, alcances y marcas de tiempo de última visualización en segundos, y un
> agente que se comportaba mal podía revocarse sin romper los otros. La evidencia para el simulacro
> no se reunió después; ya estaba en el almacén de aseguramiento.

**Correspondencias:** Reglamento de IA de la UE art. 4/4a (alfabetización, datos de detección de
sesgos), art. 15 (robustez, ciberseguridad), art. 17 (QMS), art. 53/55 (GPAI), art. 101 (multas
GPAI) · ISO/IEC 42001 · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Top 10 para Aplicaciones
Agentic 2026 (ASI01–ASI03, ASI10) · SB 53 de California · stack de cinco capas, todas las capas. Los
asignaciones son ilustrativas, no una afirmación de conformidad.

## Sources

[1] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; only 1.5% will not need more staff; 77% working on AI governance; 5% of the function in Security; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[2] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[3] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (by 2029, >50% of successful attacks on AI agents exploit access control and prompt injection). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[6] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[7] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[8] "The State of the AI Governance Job Market in 2026" (1,997 US postings; observability platforms 41%, Python 28%, NIST frameworks 27%; updated 2026-08-04). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[9] "Engineering Manager, GRC" (build an "AI-forward GRC engineering function"; "translate policies into policy-as-code"; Claude "as a virtual GRC analyst"; no longer accepting applications on 2026-09-24). Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[12] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[13] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[14] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[15] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[16] Statement announcing the AI Office's first formal requests for information to GPAI providers (model security, independent external evaluations, post-market monitoring; recipients not named). Henna Virkkunen, Executive Vice-President of the European Commission (LinkedIn). 2026-08-29. https://www.linkedin.com/feed/update/urn:li:activity:7499411372032602112/ (verified: primary)
[17] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1: new Art. 5(1)(ba)–(bb) from 2 Dec 2026; new Art. 111(4) (Art. 50(2) marking for systems placed on the market before 2 Aug 2026, by 2 Dec 2026); Art. 111(2) (public-authority high-risk systems by 2 Aug 2030); Art. 113 (Annex III 2 Dec 2027; Annex I 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[20] "Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization" (concept paper; agents "known, trusted, and properly governed"; tamper-proof logging and non-repudiation). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[21] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack, ASI02 Tool Misuse, ASI03 Agent Identity & Privilege Abuse, … ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[22] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[23] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
