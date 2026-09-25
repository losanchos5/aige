---
lang: es
source: bok/06-the-role.md
sourceHash: "17a44abb101fec04ddcb1b5db48761eb55b950d17a34ab07095b17e22699c0b1"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 06. El rol

> El ingeniero de gobernanza de IA como rol concreto: una capacidad primero y un título de trabajo
> segundo, definido por los flujos de trabajo que posee y la evidencia que produce, no por las
> certificaciones de su titular.

## Capacidad primero, título segundo

La Tesis insiste en que la ingeniería de gobernanza de IA es una capacidad, no un título de trabajo
(la misma afirmación que la disciplina madre hace sobre la ingeniería GRC, una capacidad que
cualquiera cercano a la compilación puede desarrollar [8]). Este capítulo lo hace concreto sin
contradecir eso: una capacidad aún vive en la semana de alguien: los tickets que posee, los
pipelines que mantiene, los incidentes por los que se le llama. Así que describimos el
**ingeniero de gobernanza de IA** como la persona, en cualquier organigrama, que posee esa capacidad
y es responsable de las tres preguntas en producción: qué IA se está ejecutando, qué se le permite
hacer, y qué evidencia lo prueba.

La distinción importa porque el título aún se está formando. El mismo trabajo se anuncia como «AI
Governance Engineer», «AI Risk Engineer», «AI Evaluation & Governance Engineer» [1], «Responsible AI
Engineer» y, dentro de equipos GRC que construyen la versión orientada a IA de su función, «GRC
Engineer» con un mandato de IA [2]. Un ingeniero de seguridad que escribe la puerta de eval, un
ingeniero de privacidad que convierte una FRIA en código, un ingeniero MLOps que conecta el registro
al despliegue: cada uno está haciendo ingeniería de gobernanza de IA bajo un título diferente.
Definimos el rol por lo que posee, no por lo que HR llamó a la requisición.

Una línea la separa de su vecino analista, y el resto del capítulo gana esa línea: el analista de
gobernanza de IA describe el sistema desde afuera y presenta la descripción; el ingeniero de
gobernanza de IA lee el sistema directamente y envía el control que cambia lo que hace.

## Lo que el rol posee, por flujo de trabajo

El ingeniero posee flujos de trabajo, no documentos. Cada flujo de trabajo a continuación es un
sistema en ejecución con entradas, artefactos y evidencia, y cada uno se asigna a una de las cinco
capas del stack (capítulo 04). Agrupar responsabilidades de esta manera mantiene el rol honesto:
posees un flujo de trabajo cuando puedes ser llamado por él, no cuando tu nombre está en una
política.

### Intake y clasificación

Cada sistema de IA, modelo y agente entra a través de un intake que lo clasifica: por nivel de
riesgo, por exposición regulatoria (Reglamento de IA de alto riesgo, GPAI, fuera de alcance), por
sensibilidad de datos y por autonomía. El ingeniero construye intake como una ruta de formulario más
código, no una reunión: una solicitud que estructura una entrada de registro, activa la evaluación
de impacto correcta (FRIA, DPIA), y encamina el sistema a los controles que su clase requiere. La
función Map del NIST AI RMF es el vocabulario natural para el paso de clasificación. Intake
pregunta, en orden: si el problema necesita IA en absoluto
([estrategia, valor y si usar IA en absoluto](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all),
capítulo 12); si el sistema cuenta como IA
([la decisión definitoria y sus campos de registro](/bok/ai-defined#from-definition-element-to-registry-field),
capítulo 11); qué dice el [registro de caso de uso](/bok/governing-development#the-use-case-record)
sobre propósito y autoridad de decisión (capítulo 14); qué nivel de riesgo da el
[perfil de riesgo de caso de uso](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile)
(capítulo 13); y dónde se sitúa en
[la escalera de riesgo del Reglamento de IA](/bok/eu-ai-act#the-risk-ladder) (capítulo 18). Un
sistema que se compra en lugar de construirse entra con un
[Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record) (capítulo
15). El [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering) construye el
intake, y el [AI Act triage](/toolkit/ai-act-triage) redacta el registro de decisión de
clasificación. **Maps to** Inventory & Transparency.

### Inventario y registro

El ingeniero es propietario del inventario de modelos y del **registro de agentes**, el registro
consciente del tiempo de ejecución de cada actor no humano, cada uno con un propietario, un alcance
declarado, un estado y un kill switch. La capacidad que distingue al ingeniero aquí es la ruta de
datos en tiempo de ejecución: el registro se alimenta del pipeline de despliegue y del
descubrimiento en producción, no se escribe en una hoja de cálculo, y cada actor no humano en él
lleva su propia identidad; el capítulo 23 establece qué
[una entrada del registro de un agente](/bok/governing-agents#the-agent-registry) debe llevar.
**Se asigna a** Inventory & Transparency.

### Evals y red teaming como evidencia

El ingeniero construye y mantiene los conjuntos de evals (capacidad, seguridad y adversarial) y los
conecta a un **eval gate** para que un eval fallido bloquee el lanzamiento. Este es el flujo de
trabajo que más claramente separa al ingeniero del analista: el analista revisa un informe de
modelo; el ingeniero escribe la prueba que el modelo debe pasar y es propietario del arnés que la
ejecuta (Inspect AI, promptfoo, Garak, Giskard, DeepEval, Ragas como ejemplos de categoría,
ilustrativos no respaldados). El rol de "AI Evaluation & Governance Engineer" se define en torno a
"arneses de prueba automatizados y guardrails de seguridad" y red teaming adversarial [1].
**Se asigna a** Evals & Red Teaming as Evidence.

### Policy-as-code y gates

El ingeniero expresa las reglas de gobernanza como política ejecutable (`OPA/Rego`, Cedar, Policy
Cards) que se evalúa en CI/CD y en la admisión, y mantiene los gates que las hacen cumplir. Un
anuncio público de ingeniero-gestor de GRC enmarca el mandato como "traducir políticas a
policy-as-code" [3]. El resultado del ingeniero aquí es una fusión que se bloquea o se permite, con
una razón registrada, no una recomendación en una revisión. **Se asigna a** Govern-as-Code.

### Monitoreo en tiempo de ejecución e incidentes

El ingeniero instrumenta el tiempo de ejecución: decisiones de guardrail, mediación de llamadas de
herramientas, señales de drift y flujo de comportamiento del agente se introducen en observabilidad
(Langfuse, Arize Phoenix sobre OpenTelemetry como ejemplos). Son propietarios de la ruta de
detección a informe para incidentes graves, incluido el reloj del Artículo 73 del Reglamento de IA
de la UE para sistemas de alto riesgo, y son propietarios del **kill switch** probado para agentes,
con el modelo de amenaza que dice contra qué fallos en tiempo de ejecución se construyen los
controles [5]. El capítulo 17 cubre [respuesta a incidentes](/bok/incidents#the-response-lifecycle)
y [análisis de causa raíz](/bok/incidents#root-cause-analysis). **Se asigna a** Runtime Controls &
Observability.

### Aseguramiento y evidencia de auditoría

El ingeniero emite **evidencia lista para auditoría** como subproducto de la construcción (`OSCAL`
componente y artefactos de evaluación, registros firmados, resultados de eval estructurados) para
que la auditoría sea una consulta, no un proyecto. Este es **aseguramiento continuo**: el estado del
control es una señal en vivo, no una atestación puntual. **Se asigna a** Assurance & Continuous
Compliance.

### Traducción regulatoria

El ingeniero lee la obligación lo suficientemente bien como para construir el control que la cumple:
convirtiendo un artículo del Reglamento de IA, un control ISO/IEC 42001 o una subcategoría NIST AI
RMF en un gate, un campo de registro o un artefacto de evidencia, y de vuelta, para que un auditor
pueda rastrear el control a la obligación. Esta es traducción, no asesoramiento legal; el ingeniero
depende de Legal para confirmar que la obligación se lee correctamente. **Se asigna a** las cinco
capas; es la columna vertebral que el capítulo 08 indexa, y el capítulo 18 lee
[el Reglamento de IA de la UE de una pasada](/bok/eu-ai-act#how-to-read-this-chapter) para el
ingeniero que tiene que traducirlo.

## Habilidades, por flujo de trabajo

Las habilidades se agrupan por el flujo de trabajo que sirven, no por el certificado que las enseña.
La tabla es un mapa de capacidades: dice qué debes ser capaz de hacer, en orden aproximado de cuán
crítico es para cada flujo de trabajo. Es ilustrativa, no una lista de verificación para pasar.

| Flujo de trabajo | Habilidades principales | Habilidades de apoyo |
|---|---|---|
| Intake y clasificación | Diseño de taxonomía de riesgos; lectura de los niveles de riesgo del Reglamento de IA de la UE; análisis de requisitos | Herramientas de formulario/flujo de trabajo; modelado de datos ligero |
| Inventario y registro | Identidad no humana y acceso limitado; integración de API a CI/CD; modelado de datos | Cloud IAM; herramientas de descubrimiento; conceptos SPIFFE/SPIRE |
| Evals y red teaming | Ingeniería de arnés de eval; prompting adversarial; alfabetización estadística; Python | Internos de LLM/agente; diseño de benchmarks; modelado de amenazas (STRIDE/PASTA) |
| Policy-as-code y gates | `OPA/Rego` o Cedar; ingeniería de pipeline CI/CD; Git | Diseño de esquema de política (Policy Cards); control de admisión |
| Monitoreo en tiempo de ejecución e incidentes | Observabilidad/OpenTelemetry; configuración de guardrail; respuesta a incidentes | Ingeniería de detección; seguridad de MCP y protocolo de agente |
| Aseguramiento y evidencia de auditoría | `OSCAL` y evidencia legible por máquina; registro y firma; fluidez de auditoría | Atestación criptográfica; diseño de almacén de evidencia |
| Traducción regulatoria | Lectura de regulación y estándares (Reglamento de IA, ISO/IEC 42001, NIST AI RMF); mapeo | Inglés legal; metodología DPIA/FRIA |

Dos habilidades transversales se encuentran bajo las siete: suficiente **Python** para pegar
sistemas (los anuncios ponen Python en aproximadamente uno de cada cuatro listados de gobernanza de
IA [4]), y suficiente **lectura de leyes** para analizar un artículo sin confundirlo con
asesoramiento. Ninguno es opcional; ninguno es el trabajo completo.

## Analista versus ingeniero

La forma más clara de definir el rol es contra el analista del que crece. El contraste a
continuación está escrito para la gobernanza de IA y modelado en la tabla analista-vs-ingeniero que
la literatura de GRC Engineer usa para su disciplina madre [2]. Ambos roles son necesarios; el
ingeniero no es "mejor", pero hace un trabajo diferente y se mide de manera diferente.

| Dimensión | Analista de gobernanza de IA | Ingeniero de gobernanza de IA |
|---|---|---|
| **Artefacto de evidencia** | Un artefacto puntual (una atestación, un cuestionario, un informe exportado) compilado para una revisión | Un artefacto emitido continuamente (un resultado de consulta, una ejecución de eval, un registro firmado) producido mientras se ejecuta el pipeline |
| **Fuente primaria** | Funciona a partir de la descripción reportada del sistema: documentación, resúmenes y respuestas de proveedores | Funciona a partir del sistema en ejecución: el registro y la telemetría de producción, las mismas señales que emite la construcción |
| **Conjunto de herramientas** | Hojas de cálculo, una plataforma GRC/gobernanza de IA, ticketing | Python, `OPA/Rego`, Git, CI/CD, arneses de eval, `OSCAL`}, más la plataforma |
| **Cadencia** | Periódica: revisiones trimestrales, evaluaciones anuales | Continua: cada commit, despliegue y llamada en tiempo de ejecución |
| **Resultado** | Un informe, una matriz de mapeo, una calificación de riesgo | Una construcción fusionada o bloqueada, un agente registrado, un artefacto de evidencia legible por máquina |
| **Métrica de éxito** | Auditoría aprobada, cobertura de marco completa | Fallos de control detectados antes de que llegue el auditor, y reducción de riesgo realizada mediblemente |

La distinción es cadencia y artefacto, no competencia o autorización. No es que el analista no pueda
leer un registro o que el ingeniero no pueda escribir un informe; es que el resultado del analista
es una descripción periódica y el del ingeniero es un control continuo. Un buen analista lee
sistemas de cerca; un buen ingeniero escribe claramente. Los modos de fallo también difieren, y
nombrarlos mantiene a ambos honestos. El modo de fallo del analista es teatro de cumplimiento:
documentación que corre por delante de la realidad. El modo de fallo del ingeniero es
sobre-ingeniería: automatizar un control para un proceso que nadie acordó arreglar, o construir un
gate tan frágil que los ingenieros lo rodeen. Ningún rol está seguro de su propio modo de fallo solo
por el título.

## La escalera de carrera

El rol tiene peldaños observables, cada uno definido por lo que la persona puede ser de confianza
para poseer de extremo a extremo, no por años de servicio, y verificable mirando los sistemas, no
una autoevaluación.

1. **Asociado.** Ejecuta controles existentes: añade un eval a un conjunto, registra un agente
   correctamente, produce evidencia de un control que alguien más construyó.
2. **Ingeniero de gobernanza de IA.** Construye un control de extremo a extremo (una obligación en
   un gate, un conjunto de evals para una clase de sistema, conectado a CI/CD) y es propietario de
   al menos un flujo de trabajo para un área de producto.
3. **Senior.** Es propietario de un flujo de trabajo completo en toda la organización y diseña el
   camino pavimentado que otros adoptan; el registro, eval gate o pipeline de evidencia que
   construyó es la plantilla estándar.
4. **Staff / principal.** Es propietario de la arquitectura de referencia (cómo encajan las cinco
   capas) y de las decisiones transversales (modelo de identidad, formato de evidencia, ruta de
   incidentes).
5. **Jefe de ingeniería de gobernanza de IA.** Es propietario de la función y su propiedad
   compartida con ingeniería, medido por reducción de riesgo realizada, no por controles detenidos.
   Un anuncio público de ingeniero-gestor con alcance para "construir una función de ingeniería de
   GRC orientada a IA" se encuentra en este peldaño [3].

Una persona puede tener la capacidad en el peldaño dos mientras el título se queda en "analista", o
tener el título sin la capacidad. La escalera describe el trabajo, y el trabajo es visible en los
sistemas.

## Tres formas de entrar

Nadie comienza como ingeniero de gobernanza de IA; todos se convierten desde una disciplina
adyacente, manteniendo su fortaleza y añadiendo lo que le falta.

- **Desde Legal o privacidad.** Tu ventaja es la traducción regulatoria; tu brecha es la
  construcción. Convierte una evaluación en un artefacto versionado y ejecutable (una plantilla
  FRIA-as-Code, una política en `OPA/Rego`), y aprende suficiente pipeline para ver dónde se dispara
  el control. Comienza con policy-as-code e intake.
- **Desde Seguridad o GRC.** Tu ventaja es la mentalidad de control; tu brecha es la capa de modelo.
  La ingeniería de GRC ya enseñó los movimientos padre: policy-as-code, aseguramiento continuo,
  evidencia como subproducto [2]. Añade los objetos específicos de IA: evals como controles,
  identidad y alcance del agente, y los modos de fallo de modelo y agente del OWASP Agentic Top 10
  [5]. Comienza con evals-as-evidence y el registro de agentes.
- **Desde MLOps o ingeniería de ML.** Tu ventaja es la ruta de datos en tiempo de ejecución que
  todos los demás carecen; tu obligación es la brecha. Añade la *puerta* de eval en lugar del
  informe de eval, el campo de registro para propietario y alcance, el artefacto de evidencia que la
  auditoría necesita. Comienza con puertas de eval en CI y monitorización en tiempo de ejecución.

## El mercado

El rol se define por los flujos de trabajo anteriores, no por las vacantes. Pero el mercado se está
formando y la evidencia es pública, y corrobora la forma del trabajo. Trata cada cifra como fuente;
los puntos de salario son medianas de encuestas o rangos de anuncios, no garantías.

**Bandas de encuesta.** El IAPP Salary & Jobs Report 2025-26 (más de 1.600 encuestados, más de 60
países) sitúa los roles técnicos de gobernanza de IA en el sector tecnológico en una mediana de USD
221.000 (su banda más alta) frente a USD 151.800 para el trabajo de gobernanza de IA en general y
USD 169.700 para roles combinados de privacidad y gobernanza de IA [6]. La prima es para el extremo
técnico y de construcción de controles de la disciplina, que es exactamente el rol que este capítulo
describe.

**Competencias demandadas.** El análisis de ofertas de empleo estadounidenses desde enero de 2026
(Axial Search) reporta observabilidad/monitorización en el 41-42% de las ofertas de gobernanza de
IA, Python en el 27-28%, marcos NIST en aproximadamente el 27%, familiaridad con modelos base en el
25,6% y cloud en el 18,2%; el salario mediano anunciado fue de USD 169.000 y la experiencia
requerida mediana de cinco años [4]. Y la señal de demanda es amplia: el listado de Competencias en
Alza 2026 de LinkedIn incluye competencias de gobernanza e IA responsable entre sus clusters de más
rápido crecimiento, junto con las capacidades técnicas de IA [7]. La señal que soporta la carga es
la mezcla de competencias (observabilidad, Python, la ruta de datos en tiempo de ejecución), no el
titular del salario.

> **Ofertas de empleo (nota).** Las ofertas individuales marcan el extremo superior del rango: un
> rol de ingeniero gestor de GRC en un laboratorio de frontera se anunció en 2026 a USD 405.000 [3].
> Pero las vacantes nombradas son una señal retrasada y ruidosa, mantenida aquí como corroboración y
> fuera del argumento; esta edición no cita ninguna oferta de tablón de empleo cuya URL expire o sea
> reasignada una vez que la vacante se cierre. El rol son los flujos de trabajo, no la requisición.

## ## Qué se equivocan los empleadores en la descripción del puesto

Leyendo las ofertas contra los flujos de trabajo anteriores, tres errores se repiten.

- **Certificaciones como proxy de capacidad.** Las descripciones listan AIGP, CIPP, CISSP y CISM
  como si un certificado produjera un control. Los datos de Axial muestran que las certificaciones
  aparecen en menos del 11% de las ofertas cada una [4]; las competencias que soportan la carga
  (arneses de eval, política como código, la ruta de datos en tiempo de ejecución) son las que la
  descripción del puesto infraespecifica. Pide el flujo de trabajo, luego el certificado si ayuda.
  Lo que cada esquema evalúa y cómo se relaciona este libro con ello se expone de forma neutral en
  la [página de certificaciones](/for/certifications).
- **Trabajo de analista bajo un título de ingeniero.** En nuestra lectura de las ofertas, los
  títulos de "Ingeniero de Gobernanza de IA" a menudo describen intake, mapeo e informes (trabajo de
  analista) a salario de ingeniero. La señal es la ausencia de cualquier construcción: sin eval
  gate, sin integración de registro, sin pipeline de evidencia.
- **Todo, en una contratación.** Una única oferta pide política como código, red teaming, identidad,
  observabilidad, respuesta a incidentes, traducción regulatoria y gestión de stakeholders. Eso es
  una función, no una persona: los siete flujos de trabajo son propiedad de todo un equipo, y una
  primera contratación es propietaria de dos o tres y construye el camino pavimentado para el resto.

> **En la práctica**
> En una gran operadora de telecomunicaciones, el rol llegó antes del título. La primera versión del
> trabajo se ubicó dentro de un equipo de privacidad y parecía DPIAs y revisiones. Lo que la
> convirtió en ingeniería de gobernanza de IA fue ser propietaria de dos flujos de trabajo
> completamente: conectar el registro de modelos y agentes a la pipeline de despliegue para que
> fuera cierto cualquier martes, y poner un eval gate en CI para que una regresión en resistencia a
> inyección fallara la construcción. La descripción del puesto se puso al día un año después. La
> capacidad era visible en los sistemas mucho antes de serlo en el organigrama.

**Correspondencias:** Art. 9 del Reglamento de IA de la UE (gestión de riesgos), Art. 26/27 (deberes
del responsable del despliegue, FRIA), Art. 72 (acompanhamiento pós-comercialización), Art. 73
(notificación de incidentes graves) · ISO/IEC 42001 (roles, responsabilidades y competencia) · NIST
AI RMF (Govern) · OWASP Top 10 for Agentic Applications 2026. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Mapea los siete flujos de trabajo.** Anota quién es propietario de intake, inventario, evals,
   política como código, tiempo de ejecución e incidentes, aseguramiento y traducción regulatoria
   hoy, y marca los que nadie es propietario.
2. **Sé propietario de un flujo de trabajo completamente.** Elige el que tenga menos construcción en
   él (a menudo el registro o el eval gate) y envía un control allí que bloquee o registre, no uno
   que recomiende.
3. **Reescribe una descripción de puesto.** Reemplaza la lista de certificaciones con los flujos de
   trabajo que la contratación será propietaria y los artefactos que enviará en su primer trimestre.
4. **Practica una competencia central en un sistema real.** De la tabla de competencias, toma la
   competencia central que tu flujo de trabajo carece y úsala una vez en una pipeline en vivo: una
   política en `OPA/Rego`, una eval en un arnés, un trace en OpenTelemetry.
5. **Traduce un artículo en un par.** Sienta a un abogado o DPO con un ingeniero y convierte un
   artículo del Reglamento de IA en un gate, un campo de registro o un artefacto de evidencia, y de
   vuelta.

## Sources

[1] "How the AI Engineer role is unbundling in 2026" (names the AI Evaluation & Governance Engineer). AI Journal. 2026-08-26. https://aijourn.com/how-the-ai-engineer-role-is-unbundling-in-2026/ (verified: secondary)
[2] "The GRC Engineer role" (analyst-vs-engineer table; career paths). GRC Engineer. 2025. https://grcengineer.com/grc-engineer/ (verified: primary)
[3] "Engineering Manager, GRC" posting (AI-forward GRC engineering function; policies into policy-as-code), USD 405,000. Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: secondary)
[4] AI governance jobs analysis (US postings since Jan 2026: observability 41-42%, Python 27-28%, NIST ~27%, foundation models 25.6%, cloud 18.2%; median pay USD 169,000; median 5 yrs). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] Salary & Jobs Report 2025-26 (technical AI-gov in tech median USD 221,000; AI governance only 151,800; privacy + AI governance 169,700). IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[7] LinkedIn 2026 Skills on the Rise (governance and responsible-AI skills among the fastest-rising clusters; no per-skill percentage published). LinkedIn, via EdTech Innovation Hub. 2026. https://www.edtechinnovationhub.com/news/linkedins-2026-skills-on-the-rise-shows-global-ai-driving-hiring-shifts (verified: secondary)
[8] "What is GRC Engineering" (capability, not a job title). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
