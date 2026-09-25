---
lang: es
source: bok/22-principles-and-standards.md
sourceHash: "45f690d8e41680445e0ec502f1a21c2904a69366d076f37bc4836cff3aeee9fc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 22. Principios, soft law y estándares

> Los principios dicen cómo se ve lo bueno y los estándares dicen cómo demostrarlo; este capítulo
> mapea cada instrumento a la capa del stack y al registro de evidencia que lo responden.

## Cómo leer este capítulo

La mayoría de lo que forma la gobernanza de IA no es ley. Es una red de conjuntos de principios, un
tratado, marcos voluntarios y estándares técnicos, cada uno escrito por un cuerpo diferente para una
audiencia diferente. El trabajo del ingeniero no es recitarlos. Es saber, para cada uno, qué pide,
cuánta fuerza tiene, y qué artefacto en el stack evidenciaría que la solicitud se cumple. Un
principio solo cuenta una vez que es un control; un estándar solo ayuda una vez que sus cláusulas
están conectadas a una puerta, un campo de registro o un registro de evidencia.

En orden aproximado de fuerza: ley vinculante (el Reglamento de IA, en
[capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus) y
[capítulo 18](/bok/eu-ai-act#the-act-and-the-omnibus)); un tratado vinculante, el Convenio Marco del
Consejo de Europa, que vincula a las Partes que lo ratifican y deja a cada una elegir cómo llegar a
los actores privados [1]; **normas armonizadas**, normas europeas escritas a solicitud de la
Comisión que dan una presunción de conformidad una vez que su referencia se publica en el Diario
Oficial [2]; estándares e marcos internacionales (ISO/IEC, NIST, IEEE), voluntarios y a veces
certificables; y principios y soft law (OCDE, UNESCO, G7, Grupo de Expertos de Alto Nivel de la UE),
que establecen el objetivo y el vocabulario compartido.

Dos advertencias recorren el capítulo. Los estándares apoyan, no confieren: ningún certificado y
ninguna cifra de cobertura hace que un sistema sea conforme, y la prueba del
[capítulo 01](/bok/definition#three-clarifiers) aún se aplica. Y este capítulo explica los
instrumentos mientras que el [capítulo 08](/bok/regulatory-map#how-to-read-this-map) permanece como
el índice de obligaciones; donde un instrumento ya tiene filas allí, este capítulo vincula a ellas.
Los conjuntos de principios son el terreno de juego de la IA Responsable y la ética de IA
([capítulo 01](/bok/definition#the-disambiguation-cluster)): establecen los valores. Las tablas de
artefactos y capas a continuación son la contribución de ingeniería, no una afirmación sobre lo que
los autores de los principios pretendían.

## Los instrumentos de un vistazo

| Instrumento | Emisor | Fuerza | Qué cambia en el stack | Capas principales |
|---|---|---|---|---|
| Principios de IA de la OCDE (2019, rev. 2024) | OECD | Compromiso político de 47 adherentes | Definición compartida, campos de ciclo de vida y clasificación para el registro | 1 · 2 |
| Recomendación de la UNESCO (2021) | UNESCO | No vinculante, adoptada por 193 Estados Miembros | Evaluación de impacto ético como registro vinculado a un registro | 2 |
| Convenio Marco (CETS No. 225) | Consejo de Europa | Vinculante para las Partes una vez en vigor; no en vigor a partir de 2026-09-24 | Gestión de riesgo e impacto, pruebas en cambios, registros de impugnabilidad | 1 · 2 · 3 · 5 |
| Código de Conducta de Hiroshima (2023) | G7 | Voluntario; marco de notificación de la OCDE | Notificación de capacidad pública, intercambio de incidentes, procedencia | 2 · 4 · 5 |
| Directrices de Ética y ALTAI (2019, 2020) | EU AI HLEG | No vinculante; recordado en considerando 27 del Reglamento de IA | Siete requisitos como lista de verificación para convertir en controles | 1 · 2 |
| NIST AI RMF 1.0 y perfiles | NIST | Voluntario | Ids de función, categoría y subcategoría como metadatos de control | 1–5 |
| ISO/IEC 22989, 42001 y familia | ISO/IEC JTC 1/SC 42 | Voluntario; 42001 certificable | Evidencia de sistema de gestión; vocabulario; procesos de ciclo de vida | 1 · 2 · 5 |
| Normas armonizadas JTC 21 | CEN-CENELEC | Presunción de conformidad una vez citada en OJ; ninguna citada hasta donde podemos encontrar | Archivo de riesgo del proveedor, esquema de registro, evidencia de QMS | 1–5 |
| Serie IEEE 7000 | IEEE | Voluntario | Ética por diseño y procesos de sesgo en el SDLC | 1 · 2 · 3 |

Las fuentes de cada fila están en la sección que la trata. Los recuentos de adherentes y Estados
miembros proceden de [3] y [4]; el estado de la Convención de [5].

## Una breve genealogía de la soft law de IA

Los instrumentos se citan entre sí, y el orden importa porque las definiciones viajan aguas abajo.
El Grupo de Expertos de Alto Nivel de la UE publicó sus Directrices de Ética el 8 de abril de 2019
[6]. El Consejo de la OCDE adoptó su Recomendación sobre IA el 22 de mayo de 2019, y los líderes del
G20 acogieron los Principios de IA del G20 derivados de ella en Osaka en junio de 2019 [7]. Los
Estados miembros de la UNESCO adoptaron la Recomendación sobre la Ética de la IA en noviembre de
2021 [4]. La OCDE publicó su Marco para la Clasificación de Sistemas de IA el 22 de febrero de 2022
[8], y el NIST AI RMF 1.0 le siguió el 26 de enero de 2023, adaptando el ciclo de vida y las
dimensiones de la OCDE en su propia Figura 2 [9]. Los líderes del G7 acordaron los Principios
Rectores de Hiroshima y el Código de Conducta el 30 de octubre de 2023 [10]. La OCDE revisó su
definición de sistema de IA el 8 de noviembre de 2023 y toda la Recomendación el 3 de mayo de 2024
[7]. El Consejo de Europa adoptó su Convención Marco el 17 de mayo de 2024 y la abrió para firma el
5 de septiembre de 2024 [11]. La OCDE lanzó el marco de información de Hiroshima el 7 de febrero de
2025 [12], y la Unión Europea ratificó la Convención el 15 de mayo de 2026 [13].

La consecuencia práctica es la convergencia en una única definición. La definición de sistema de IA
de la OCDE, el artículo 2 de la Convención y el artículo 3(1) del Reglamento de IA utilizan una
redacción casi idéntica, y el considerando 12 del Reglamento de IA dice que la noción debe estar
estrechamente alineada con el trabajo de las organizaciones internacionales [7][1][14]. Un registro
que clasifique sistemas contra esa redacción una sola vez puede responder a los tres instrumentos;
el [capítulo 11](/bok/ai-defined#four-definitions-compared) trata la definición en sí, y tabula
[dónde los conjuntos de principios coinciden](/bok/ai-defined#where-the-sets-agree).

## Principios de IA de la OCDE

La Recomendación sobre IA de la OCDE (instrumento legal `OECD/LEGAL/0449`) fue el primer estándar
intergubernamental sobre IA. Contiene cinco principios basados en valores para los actores de IA,
cinco recomendaciones para los gobiernos, y definiciones de sistema de IA, ciclo de vida del sistema
de IA y actores de IA [7]. La revisión de 2024 añadió atención explícita a la desinformación e
integridad de la información, a los usos fuera de la finalidad prevista, a la anulación segura y
desmantelamiento, y a la sostenibilidad ambiental, y trasladó la trazabilidad y la gestión de
riesgos bajo el principio de responsabilidad [7]. A partir del 2026-09-24, OECD.AI lista 47
adherentes, incluyendo los 38 miembros de la OCDE, la Unión Europea y ocho no miembros [3].

### Los cinco principios y cinco recomendaciones

Los principios se dirigen a los actores de IA; las recomendaciones se dirigen a los gobiernos. Solo
los primeros cinco se convierten en trabajo de ingeniería directamente. La tabla lee cada principio
como una pregunta que el stack debe responder.

| Principio | Lo que pide a los actores de IA (parafraseado) | Artefacto de ingeniería | Capa |
|---|---|---|---|
| `1.1` Crecimiento inclusivo, desarrollo sostenible y bienestar | Perseguir resultados beneficiosos para las personas y el planeta | Declaración de uso previsto y beneficio en el registro de intake; daños nombrados por sistema | 2 |
| `1.2` Estado de derecho, derechos humanos y valores democráticos, incluyendo equidad y privacidad | Respetar derechos en todo el ciclo de vida; agencia humana y supervisión; proteger contra el uso indebido | Evaluación de impacto vinculada al registro; evals de equidad y privacidad; punto de control de supervisión | 2 · 3 · 4 |
| `1.3` Transparencia y explicabilidad | Información significativa y contextualmente apropiada sobre el sistema y sus salidas | Ficha de modelo y ficha de datos; divulgación de interacción; artefactos de explicación | 2 |
| `1.4` Robustez, seguridad y seguridad operacional | Funcionamiento bajo uso normal, uso indebido previsible y condiciones adversas; anulación, reparación o desmantelamiento seguro | Evals adversariales y de robustez; kill switch; procedencia del contenido | 3 · 4 |
| `1.5` Responsabilidad | Trazabilidad de conjuntos de datos, procesos y decisiones; gestión sistemática de riesgos por fase del ciclo de vida | Almacén de evidencia indexado por ids del registro; registro de riesgos como código; registros de proveedores | 1 · 5 |

Las cinco recomendaciones (investigación y desarrollo; un ecosistema inclusivo habilitador de IA; un
entorno de gobernanza y política interoperable; capacidad humana y transformación del mercado
laboral; cooperación internacional) se dirigen a los Adherentes, no a los propietarios de sistemas.
El llamamiento de la Recomendación 2.5 a "normas técnicas globales consensuadas y multisectoriales"
es la raíz política del trabajo de normalización más adelante en este capítulo [7].

El Principio 1.4(b) es la frase más directamente operacional del instrumento: los mecanismos deben
permitir que los sistemas de IA que riesgan daño indebido sean "anulados, reparados y/o
desmantelados de forma segura" [7]. En términos de stack eso es el patrón
[**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) con una ruta de
revocación probada, y un registro de desmantelamiento en el registro. La trazabilidad del Principio
1.5(b) "en relación con conjuntos de datos, procesos y decisiones" es lo que
[**Continuous Assurance Telemetry**](/patterns/continuous-assurance-telemetry) produce cuando cada
registro de evidencia lleva el id del registro del sistema que describe.

### La definición y ciclo de vida del sistema de IA de la OCDE

La definición de 2023 dice: un sistema basado en máquinas que, para objetivos explícitos o
implícitos, deduce, a partir de la entrada que recibe, cómo generar salidas tales como predicciones,
contenido, recomendaciones o decisiones que pueden influir en entornos físicos o virtuales; los
sistemas varían en autonomía y adaptabilidad después del despliegue [7]. OECD.AI señala que la Unión
Europea, el Consejo de Europa, los Estados Unidos y las Naciones Unidas utilizan esta definición y
ciclo de vida en sus propios marcos [3].

El ciclo de vida tiene siete fases: planificar y diseñar; recopilar y procesar datos; construir o
adaptar modelos; probar, evaluar, verificar y validar; poner a disposición para uso o desplegar;
operar y monitorear; retirar o desmantelar. Las fases son iterativas y no necesariamente
secuenciales, y la retirada puede ocurrir en cualquier punto durante la operación [7]. Esa última
cláusula es fácil de pasar por alto y útil de codificar: el registro necesita un estado `retired`
alcanzable desde `operating`, con su propia evidencia (quién lo retiró, por qué, qué datos se
eliminaron), no solo una ruta de {`built`} a {`deployed`}.

| Fase del ciclo de vida de la OCDE | Dónde vive en el pipeline | Evidencia que debe dejar |
|---|---|---|
| Planificar y diseñar | Intake y clasificación | Registro de intake; nivel de riesgo; finalidad prevista |
| Recopilar y procesar datos | Pipeline de datos | Ficha de datos; linaje; nota de base legal |
| Construir o adaptar modelos | Trabajos de entrenamiento y ajuste fino | AIBOM; metadatos de ejecución de entrenamiento |
| Probar, evaluar, verificar, validar | CI eval gate | Resultado de eval contra umbral |
| Poner a disposición o desplegar | Admisión y lanzamiento | Veredicto de política; entrada del registro |
| Operar y monitorear | Runtime | Decisiones de guardrail; trazas; alertas de drift |
| Retirar o desmantelar | Cambio de estado del registro | Registro de retirada; credenciales revocadas |

### El Marco para la Clasificación de Sistemas de IA

El marco de clasificación de la OCDE evalúa un sistema de IA desde una perspectiva política a lo
largo de cinco dimensiones: **People & Planet**, **Economic Context**, **Data & Input**,
**AI Model** y **Task & Output**, cada una con sus propias propiedades y atributos [8]. El NIST AI
RMF reproduce una versión modificada de la misma imagen, con Application Context en lugar de
Economic Context y prueba, evaluación, verificación y validación (TEVV) dibujadas en todo el ciclo
de vida [9].

Para un ingeniero el marco es un esquema, no un papel. Cada dimensión se convierte en un grupo de
campos del registro que hace un sistema comparable con otros y le dice al resto del stack qué
probar.

> **Ejemplo (ilustrativo)** Una entrada del registro extendida con las cinco dimensiones. Los campos
> son la elección del equipo; la agrupación es la de la OCDE.
>
> ```yaml
> id: credit-limit-assist
> oecd_classification:
>   people_and_planet: { affected: [applicants], rights_impact: high, opt_out: false }
>   economic_context: { sector: consumer-credit, criticality: high, deployment: customer-facing }
>   data_and_input: { provenance: [bureau-feed, application-form], personal_data: true }
>   ai_model: { type: gradient-boosted-trees, adaptive_after_deployment: false }
>   task_and_output: { task: recommendation, autonomy: human-reviewed, output: limit-band }
> ```
>
> Una política en la capa 01 lee `rights_impact: high` y requiere una puerta de eval de equidad; la
> puerta de eval en la capa 03 lee `personal_data: true` y añade una suite de fuga. La clasificación
> deja de ser una descripción y comienza a enrutar controles.

### El observatorio OECD.AI

Tres recursos de OECD.AI merecen ser conectados. El
**Catálogo de Herramientas y Métricas para IA Confiable** es un lugar para encontrar métodos de eval
y métricas, no una lista de aprobación [15]. El **Monitor de Incidentes y Riesgos de IA** [3] es una
entrada a la capa 03: un fallo reportado en un sistema comparable es un caso de eval candidato (ver
[capítulo 17](/bok/incidents#learning-from-public-incident-databases)). El
**Marco de Información de Hiroshima sobre IA** es donde los desarrolladores de sistemas de IA
avanzados presentan informes de gestión de riesgos [3] (ver la sección del G7).

> **En la práctica (ilustrativo)**
> Un equipo de gobernanza en una gran aseguradora añadió las cinco dimensiones de la OCDE a su
> esquema de registro como campos requeridos. La primera reconciliación encontró varios sistemas
> cuyo `task_and_output.autonomy` decía "revisado por humanos" mientras que las trazas de runtime
> mostraban ninguna acción del revisor en la mayoría de las decisiones. El campo no creó la brecha;
> hizo la brecha consultable. La solución fue un punto de control de supervisión con aprobaciones
> registradas, y el campo del registro se convirtió en una afirmación que las trazas podían
> falsificar.

## Recomendación de la UNESCO sobre la Ética de la IA

Los 193 Estados miembros de la UNESCO adoptaron la Recomendación sobre la Ética de la Inteligencia
Artificial en noviembre de 2021, el primer estándar global sobre ética de la IA [4]. Descansa en
cuatro valores fundamentales (derechos humanos y dignidad; sociedades justas, pacíficas e
interconectadas; diversidad e inclusividad; el florecimiento del medio ambiente y los ecosistemas) y
diez principios fundamentales: proporcionalidad y no causar daño; seguridad y protección; privacidad
y protección de datos; gobernanza multisectorial y adaptativa; responsabilidad y rendición de
cuentas; transparencia y explicabilidad; supervisión humana y determinación; sostenibilidad;
conciencia y alfabetización; equidad y no discriminación [4]. Las áreas de acción política entonces
convierten los valores en programas gubernamentales.

La Recomendación se dirige a los estados, por lo que su peso operacional para una organización viene
a través de dos herramientas. La **Metodología de Evaluación de Preparación** (RAM) evalúa qué tan
preparado está un país para gobernar la IA responsablemente [16]; es contexto útil cuando se
despliega en una jurisdicción que ha ejecutado una. La **Evaluación de Impacto Ético** (EIA) es a
nivel de sistema: ayuda a evaluar las implicaciones éticas de un sistema de IA individual antes y
durante el uso, y está diseñada para gobiernos que procuran o despliegan IA, empresas que la
desarrollan e investigadores que la evalúan [17].

En el stack una EIA es una evaluación de impacto más: adjunta a la entrada del registro, versionada
y re-ejecutada en caso de cambio, siguiendo [**FRIA-as-Code**](/patterns/fria-as-code). Un comprador
público que requiera una a los proveedores la convierte en un artefacto de adquisición para la
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate).
«Proporcionalidad y no causar daño» reafirma el principio de la casa
[partir de un modo de fallo nombrado o un daño nombrado](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
[4].

## Convención Marco del Consejo de Europa (CETS nº 225)

La Convención Marco sobre Inteligencia Artificial y Derechos Humanos, Democracia y Estado de Derecho
es el primer tratado internacional vinculante sobre IA. Fue adoptada en Estrasburgo el 17 de mayo de
2024 y abierta para firma en Vilna el 5 de septiembre de 2024 [11]. Es neutral desde el punto de
vista tecnológico y vincula a los Estados Partes, no a las empresas [5][1].

### Ámbito de aplicación y estado

El artículo 3 establece el ámbito de aplicación. Los Estados Partes deben aplicar la Convención a
las actividades del ciclo de vida de los sistemas de IA realizadas por autoridades públicas o
actores privados que actúen en su nombre. Para otros actores privados, cada Estado Parte debe
abordar los riesgos e impactos de manera coherente con el objeto y propósito de la Convención, y
debe declarar cómo lo hará. La seguridad nacional, la defensa nacional y la investigación aún no
disponible para su uso están excluidas, con condiciones [1].

La Convención entra en vigor el primer día del mes siguiente a tres meses después de que cinco
signatarios, incluidos al menos tres Estados miembros del Consejo de Europa, la hayan ratificado
(artículo 30(3)) [1]. **Estado a 2026-09-24:** la página propia del Consejo de Europa enumera la
Unión Europea como único Estado Parte y 20 signatarios adicionales, entre ellos el Reino Unido,
Noruega, Suiza, Ucrania, Canadá, Israel, Japón, Estados Unidos y Uruguay [5]. La Convención, por lo
tanto, aún no está en vigor. El Parlamento Europeo consintió la conclusión de la UE el 11 de marzo
de 2026 [18], y la UE ratificó el 15 de mayo de 2026 en la 135ª Sesión del Comité de Ministros en
Chișinău [13]. La Decisión del Consejo que concluye la Convención para la Unión, Decisión (UE)
2026/1080 de 21 de abril de 2026 (DO L, 13.5.2026), establece que la Convención se implementa en la
Unión exclusivamente a través del Reglamento de IA y otros acervos relevantes de la Unión, y lleva
la declaración de la UE conforme al artículo 3(1)(b) de que aplicará los capítulos II a VI de la
Convención a actores privados a través del Reglamento de IA [19].

Dentro de la UE, entonces, el tratado se implementa a través del Reglamento de IA en lugar de a
través de un conjunto separado de deberes del sector privado. Fuera de ella, una vez que la
Convención esté en vigor, las medidas de implementación de cada Estado Parte son las que vinculan;
realiza un seguimiento de ellas por jurisdicción en
[capítulo 21](/bok/ai-laws-worldwide#comparing-the-regimes).

### Lo que la Convención pide, y lo que cambia en el stack

El capítulo III establece principios que los Estados Partes implementan: dignidad humana y autonomía
individual; transparencia y supervisión; responsabilidad; igualdad y no discriminación; privacidad y
protección de datos personales; fiabilidad; innovación segura, incluidos entornos de prueba
controlados (artículos 7–13) [1]. Los capítulos IV y V son donde vive la ingeniería.

| Artículo | Deber de los Estados Partes (parafraseado) | Artefacto de ingeniería | Capa |
|---|---|---|---|
| `Art. 14(2)(a)–(b)` | Documentar información relevante sobre sistemas que pueden afectar significativamente a los derechos humanos, suficiente para que las personas afectadas puedan impugnar decisiones | Registro de decisión por resultado consecuente; [ruta de impugnación](/patterns/decision-notice-contest-path) con el registro adjunto | 2 · 5 |
| `Art. 14(2)(c)` | Una posibilidad efectiva de presentar una queja ante autoridades competentes | Entrada de queja vinculada al id del registro | 5 |
| `Art. 15(2)` | Notificar a las personas que están interactuando con un sistema de IA, según corresponda | Divulgación de interacción aplicada en tiempo de ejecución | 4 |
| `Art. 16(1)–(2)(a)–(f)` | Gestión iterativa y graduada de riesgos e impactos: contexto, severidad y probabilidad, puntos de vista de las partes interesadas, monitoreo, documentación | Registro de riesgos como código; evaluación de impacto vinculada al registro; monitoreo contra línea base | 1 · 2 · 4 |
| `Art. 16(2)(g)` | Probar sistemas antes del primer uso y cuando se modifiquen significativamente, cuando sea apropiado | Eval gate en lanzamiento y en cambio material | 3 |
| `Art. 16(4)` | Evaluar la necesidad de una moratoria, prohibición u otras medidas para usos incompatibles | Lista de bloqueo de política como código de usos prohibidos | 1 |

El artículo 16(2)(g) merece énfasis. «Cuando se modifiquen significativamente» es un disparador, no
una fecha, y un disparador es algo que un pipeline puede evaluar: un diff del registro que cambia el
modelo, los datos de entrenamiento o la finalidad prevista re-ejecuta la puerta. Ese es el patrón
[**Eval Gate in CI**](/patterns/eval-gate-in-ci) con la regla de cambio material escrita, y responde
la misma pregunta que el Reglamento de IA hace sobre modificación sustancial (ver
[capítulo 18](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)).

El Consejo de Europa también publicó **HUDERIA**, una metodología no vinculante para la evaluación
de riesgos e impactos de sistemas de IA desde el punto de vista de los derechos humanos, la
democracia y el estado de derecho. Tiene dos partes: la Metodología HUDERIA, aprobada por el Comité
de Ministros el 26 de febrero de 2025, y el Modelo HUDERIA: Análisis de Riesgos Basado en el
Contexto (COBRA), aprobado el 25 de febrero de 2026, que estructura la recopilación de información
sobre el contexto, diseño e implementación de un sistema [20]. Los Estados Partes pueden utilizar o
adaptar cualquiera de ellas. Para un equipo que ya ejecuta FRIA-as-Code, las preguntas de contexto
de COBRA son una lista de campos para reconciliar con el registro, no un segundo proceso.

**Correspondencias:** CETS nº 225 arts. 14–16 · Reglamento de IA de la UE arts. 9, 27, 50 (a través
de la opción de implementación de la UE) · capas 1–5. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Proceso Hiroshima del G7

Los líderes del G7 acordaron dos textos el 30 de octubre de 2023: los Principios Rectores
Internacionales para Organizaciones que Desarrollan Sistemas de IA Avanzada y el Código de Conducta
Internacional construido sobre ellos. El Código es voluntario, dirigido a organizaciones que
desarrollan los sistemas de IA más avanzados (incluidos modelos fundacionales e IA generativa),
descrito como un documento vivo no exhaustivo que se basa en los Principios de IA de la OCDE, y debe
seguirse de acuerdo con un enfoque basado en el riesgo [10]. Sus 11 acciones se mapean en el stack
con poca traducción:

| Acción | Pregunta (parafraseada) | Artefacto de ingeniería | Capa |
|---|---|---|---|
| 1 | Identificar, evaluar y mitigar riesgos en todo el ciclo de vida, incluidas pruebas antes del despliegue | Suite de red team adversarial; eval gate | 3 |
| 2 | Identificar y mitigar vulnerabilidades, incidentes y uso indebido después del despliegue | Monitoreo en tiempo de ejecución; pipeline de incidentes | 4 · 5 |
| 3 | Reportar públicamente capacidades, limitaciones y usos apropiados e inapropiados | Ficha de modelo publicada desde el registro | 2 |
| 4 | Compartir información e informar incidentes responsablemente con la industria, gobiernos, sociedad civil, academia | Pipeline de incidentes con una rama de intercambio externo | 5 |
| 5 | Desarrollar, implementar y divulgar políticas de gobernanza de IA y gestión de riesgos | Biblioteca de política como código con un resumen publicado | 1 |
| 6 | Invertir en controles de seguridad, incluidas salvaguardas físicas, cibernéticas y contra amenazas internas | Controles de seguridad en pesos y pipelines | 4 |
| 7 | Desplegar mecanismos de autenticación de contenido y trazabilidad de origen donde sea viable | Marcado de trazabilidad de origen en la salida; prueba de verificación | 4 |
| 8 | Priorizar la investigación sobre riesgos sociales, de seguridad y de ciberseguridad | (A nivel de programa; sin artefacto directo) | – |
| 9 | Priorizar sistemas que aborden desafíos globales | (A nivel de programa; sin artefacto directo) | – |
| 10 | Avanzar y adoptar estándares técnicos internacionales | Vigilancia de estándares; mantenimiento de crosswalk | 1 |
| 11 | Implementar medidas de entrada de datos y proteger datos personales y propiedad intelectual | Ficha de datos; licencia y procedencia en el AIBOM | 2 |

El 7 de febrero de 2025, la OCDE lanzó un marco para que las empresas informen de manera comparable
sobre cómo aplican el Código (evaluación de riesgos, reporte de incidentes, intercambio de
información). Los primeros informes vencían el 15 de abril de 2025, con presentaciones continuas y
actualizaciones anuales después [12]. Un informe es una divulgación, no una auditoría; generado a
partir del registro y el almacén de evidencia se mantiene verdadero, escrito a mano se desvía. Para
desarrolladores de modelos de IA de uso general colocados en el mercado de la UE, la contraparte
vinculante es el régimen GPAI del Reglamento de IA y su Código de Conducta voluntario, indexado en
[capítulo 08](/bok/regulatory-map#gpai-code-of-practice).

## Directrices del HLEG de la UE y ALTAI

El Grupo de Expertos de Alto Nivel independiente de la Comisión sobre IA presentó sus Directrices de
Ética para la IA de Confianza el 8 de abril de 2019. La IA de Confianza, en las Directrices, es
legal, ética y robusta, y siete requisitos clave la hacen concreta: agencia humana y supervisión;
robustez técnica y seguridad; privacidad y gobernanza de datos; transparencia; diversidad, no
discriminación e imparcialidad; bienestar social y ambiental; responsabilidad [6]. Las Directrices
nombran tres enfoques de supervisión (human-in-the-loop, human-on-the-loop y human-in-command), que
sigue siendo el vocabulario más compacto para el diseño de supervisión [6]; el patrón
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) elige entre ellos por consecuencia.

La **Assessment List for Trustworthy AI** (ALTAI) siguió el 17 de julio de 2020, revisada después de
un piloto con más de 350 partes interesadas y publicada tanto como documento como como herramienta
de autoevaluación basada en web [21]. El considerando 27 del Reglamento de IA recuerda los siete
principios como orientación no vinculante que contribuye a la IA de confianza y centrada en el ser
humano, sin perjuicio de los requisitos vinculantes del Reglamento [14].

La lección duradera de ALTAI es una advertencia. Un cuestionario de autoevaluación respondido una
sola vez es una atestación, y el tercer valor del libro dice que la evidencia proviene del tiempo de
ejecución, no de una atestación en un momento determinado
([valor 3](/bok/values-and-principles#3-evidence-comes-from-runtime-not-from-a-point-in-time-attestation))).
El movimiento útil es tratar cada pregunta como un control candidato. Las Directrices piden
«salvaguardas que permitan un plan de contingencia en caso de problemas» [6]; como control que se
convierte en «¿hay un kill switch probado, y cuándo pasó la última prueba?". Una pregunta que no
puede convertirse en una verificación con un registro de evidencia va a la junta de revisión, y la
lista sigue siendo valiosa para eso.

## NIST AI RMF 1.0 en profundidad

El Marco de Gestión de Riesgos de IA del NIST 1.0 (NIST AI 100-1, 26 de enero de 2023) se describe a
sí mismo como voluntario, que preserva derechos, no específico del sector y agnóstico respecto al
caso de uso [9]. El capítulo 08 mapea sus cuatro funciones a artefactos
([capítulo 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf)); esta sección va un nivel más abajo, a
lo que un ingeniero necesita para usar sus identificadores como metadatos de control.

### Daño, riesgo y tolerancia

La parte 1 encuadra el riesgo como una función de la magnitud del daño y su probabilidad, y agrupa
los daños potenciales en daño a personas, daño a una organización y daño a un ecosistema [9]. Dos
opciones de encuadre importan para la ingeniería. El RMF puede ayudar a priorizar el riesgo pero «no
prescribe tolerancia al riesgo»: el umbral es para que lo establezca la organización, influenciado
por la ley, la política y las normas [9]. Y trata la medición como difícil: los riesgos que no se
medirán o no se pueden medir deben documentarse de todas formas (MEASURE 1.1). Ambos empujan de la
misma manera que el principio de la casa
[dar a cada control dientes](/bok/values-and-principles#give-every-control-teeth): un umbral debe
ser elegido, escrito con su justificación y aplicado, porque el marco no lo elegirá por ti.

### Las siete características de confianza

El RMF nombra siete características de la IA confiable y describe válido y fiable como la base para
los demás, con responsable y transparente abarcándolos todos [9].

| Característica | Evidencia de que se cumple | Capa |
|---|---|---|
| Válido y fiable | Evals de capacidad y regresión contra un conjunto de referencia; monitoreo de desviación | 3 · 4 |
| Seguro | Evals de umbral de seguridad; kill switch probado; ruta de anulación | 3 · 4 |
| Seguro y resiliente | Adversarial Red-Team Suite; [modelo de amenaza](/patterns/ai-threat-model); detección en tiempo de ejecución | 3 · 4 |
| Responsable y transparente | Propiedad del registro; ficha de modelo; evidencia vinculada a ids del registro | 2 · 5 |
| Explicable e interpretable | [Artefactos de explicación](/patterns/explanation-artefact) y códigos de razón, probados para fidelidad ([capítulo 16](/bok/fairness-and-explainability#testing-explanation-quality)) | 2 · 3 |
| Mejorado en privacidad | Evals de fuga y memorización; DPIA vinculada al registro ([capítulo 19](/bok/privacy-and-ai#does-a-model-contain-personal-data)) | 2 · 3 |
| Justo con sesgo dañino gestionado | [Evals de equidad](/patterns/fairness-eval-suite) con umbrales trazados a daños nombrados | 3 |

### El núcleo: 19 categorías

El núcleo tiene cuatro funciones, 19 categorías y, según nuestro recuento de las tablas publicadas,
72 subcategorías [9]. GOVERN es transversal; MAP, MEASURE y MANAGE se ejecutan por sistema. La tabla
parafrasea cada categoría en una línea y nombra el artefacto que la evidencia.

| Categoría | En una línea (parafraseado) | Artefacto | Capa |
|---|---|---|---|
| GOVERN 1 | Existen políticas y procesos para el riesgo de IA, son transparentes y funcionan; incluye inventario (1.6) y desmantelamiento (1.7) | Biblioteca de política como código; registro alimentado por despliegues | 1 · 2 |
| GOVERN 2 | Estructuras de responsabilidad: personas empoderadas, responsables y capacitadas | Campo propietario por entrada del registro; RACI | 1 · 2 |
| GOVERN 3 | Equipos diversos y roles humano-IA definidos informan el trabajo de riesgo | Roster de revisores; definiciones de rol de supervisión | 1 |
| GOVERN 4 | Una cultura que considera y comunica riesgo; pruebas, identificación de incidentes y compartición (4.3) | Pipeline de incidentes; propiedad de eval | 3 · 5 |
| GOVERN 5 | Participación con actores de IA relevantes, incluida retroalimentación de fuera del equipo | Canal de retroalimentación y contestación vinculado al registro | 4 · 5 |
| GOVERN 6 | Se abordan riesgos de software, datos y cadena de suministro de terceros | Puerta de debida diligencia del proveedor; AIBOM | 1 · 2 |
| MAP 1 | Contexto establecido: propósitos, usuarios, leyes, normas, configuraciones | Registro de entrada | 2 |
| MAP 2 | El sistema se categoriza: tareas, métodos, límites de conocimiento | Campos de clasificación (las dimensiones de la OCDE encajan aquí) | 2 |
| MAP 3 | Capacidades, uso, beneficios y costos entendidos; procesos de supervisión definidos (3.5) | Declaración de uso previsto; diseño de supervisión | 2 · 4 |
| MAP 4 | Riesgos y beneficios mapeados para cada componente, incluido terceros | Mapa de riesgo de componentes del AIBOM | 2 |
| MAP 5 | Impactos en individuos, grupos, comunidades, organizaciones y sociedad caracterizados | Evaluación de impacto (FRIA, ISO/IEC 42005) | 1 · 2 |
| MEASURE 1 | Métodos y métricas elegidos, comenzando con los riesgos más significativos | Plan de eval con umbrales y justificación | 3 |
| MEASURE 2 | Sistemas evaluados contra las características confiables | Suites de eval; resultados de red team | 3 |
| MEASURE 3 | Riesgos rastreados a lo largo del tiempo, incluidos los emergentes en despliegue | Métricas en tiempo de ejecución comparadas con línea de base de eval | 4 |
| MEASURE 4 | Se recopila y evalúa retroalimentación sobre si la medición funciona | Revisión de cobertura de eval; análisis de incidentes perdidos | 3 · 5 |
| MANAGE 1 | Riesgos priorizados y tratados; una decisión de ir o no ir en despliegue | Decisiones del registro de riesgos; puerta de lanzamiento | 1 · 5 |
| MANAGE 2 | Estrategias de maximización de beneficios y minimización de daños; reemplazar, desvincularse o desactivar (2.4) | Guardrail en tiempo de ejecución; kill switch | 4 |
| MANAGE 3 | Riesgos y beneficios de terceros gestionados; modelos preentrenados monitoreados | Monitoreo de proveedores; comprobaciones de procedencia del modelo | 2 · 4 |
| MANAGE 4 | Tratamientos, respuesta, recuperación y comunicación documentados y monitoreados; incidentes comunicados (4.3) | Pipeline de incidentes; plan de monitoreo posterior al despliegue | 4 · 5 |

Los identificadores son la parte útil. Un control que lleva `nist_ai_rmf: [MEASURE 2.7, MANAGE 2.4]`
en sus metadatos puede ser contado, cruzado y consultado; un control descrito en prosa no puede. El
patrón [**Framework Crosswalk**](/patterns/framework-crosswalk) genera la vista del RMF a partir de
esos metadatos en lugar de mantenerla junto al código.

### Cómo se estructura una entrada de Playbook

El AI RMF Playbook es el complemento que convierte cada subcategoría en práctica sugerida. Cada
entrada tiene las mismas cinco partes: **About** (qué significa la subcategoría),
**Suggested Actions**, **Transparency and Documentation** (enmarcado como "Organizations can
document the following", una lista de preguntas), **AI Transparency Resources** y **References**
[22]. NIST describe el Playbook como material voluntario que los usuarios adaptan, no una lista de
verificación para completar [9].

Leído como ingeniero, las preguntas de "Transparency and Documentation" son criterios de aceptación.
Cada pregunta nombra un artefacto que el stack ya emite (entonces vincularlo) o expone una brecha
(entonces construirlo o registrar por qué no).

> **Ejemplo (ilustrativo)** Una subcategoría, convertida en una puerta y un registro de evidencia.
>
> ```yaml
> control: kill-switch-tested
> nist_ai_rmf: [MANAGE 2.4]          # supersede, disengage or deactivate
> playbook_question: "Who can deactivate the system, and how is that tested?"
> check: last_kill_switch_test.passed == true and age_days <= 30
> enforce: deploy-admission          # block release if stale
> evidence: kill-switch-test-result  # filed against the registry id
> ```
>
> El Playbook suministró la pregunta; el pipeline suministra la respuesta en cada lanzamiento.

### Perfiles y el Perfil de IA Generativa

Un perfil aplica el núcleo a un contexto. El RMF describe tres tipos: **perfiles de caso de uso**
para una configuración particular, **perfiles temporales** (un Perfil Actual de cómo se gestiona la
IA hoy y un Perfil Objetivo de dónde quiere estar la organización, cuya comparación revela las
brechas) y **perfiles intersectoriales** para riesgos comunes en todos los usos, como el uso de
modelos de lenguaje grandes, servicios basados en la nube o adquisición [9]. Generado a partir de
metadatos de control, el Perfil Actual es la cobertura en vivo de cada subcategoría por un control
en ejecución, y el Perfil Objetivo es un diff revisado.

**NIST AI 600-1**, el Perfil de IA Generativa (26 de julio de 2024), es el principal perfil
intersectorial. Define 12 riesgos únicos o exacerbados por la IA generativa: información o
capacidades de CBRN; confabulación; contenido peligroso, violento u odioso; privacidad de datos;
impactos ambientales; sesgo dañino y homogeneización; configuración humano-IA; integridad de la
información; seguridad de la información; propiedad intelectual; contenido obsceno, degradante y/o
abusivo; integración de cadena de valor y componentes [23]. Luego enumera acciones sugeridas
vinculadas a las subcategorías del RMF con identificadores como `GV-1.1-001`; contamos 212
identificadores de este tipo en el texto publicado [23]. Esos identificadores hacen buenos nombres
de prueba: una suite de eval para confabulación que cita las acciones que implementa puede ser
trazada de vuelta al perfil sin una hoja de cálculo. El 7 de abril de 2026, NIST también anunció una
nota conceptual para un perfil del AI RMF sobre IA confiable en infraestructura crítica [24].

### Trabajo NIST adyacente

Cuatro publicaciones NIST adicionales inciden directamente en el stack. Los borradores más nuevos ya
indexados en [capítulo 08](/bok/regulatory-map#newer-nist-ai-work) (la Iniciativa de Estándares de
Agentes de IA, el Perfil de Cibernética de IA en borrador y el AI 800-1 en borrador) no se repiten
aquí.

- **NIST AI 100-2 E2025** (marzo de 2025) es una taxonomía y terminología del aprendizaje automático
  adversarial: métodos de ML, etapas del ciclo de vida del ataque, objetivos del atacante,
  objetivos, capacidades y conocimiento, y mitigaciones [25]. Usa sus términos para nombrar los
  casos en la [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite), para que un
  hallazgo se lea igual en el informe de eval y en el modelo de amenaza.
- **NIST SP 800-218A** (julio de 2024) es un perfil comunitario del Marco de Desarrollo Seguro de
  Software para IA generativa y modelos fundacionales de uso dual. Añade prácticas y tareas
  específicas de IA a SSDF 1.1 para productores de modelos de IA, productores de sistemas de IA que
  los usan, y adquirentes [26]. Es la mitad del pipeline de construcción de la historia: procedencia
  de pesos y datos, integridad del entorno de entrenamiento.
- **CSF 2.0** (26 de febrero de 2024) organiza los resultados de ciberseguridad en seis Funciones:
  Govern, Identify, Protect, Detect, Respond y Recover [27]. El AI RMF y CSF 2.0 son hermanos, no
  sustitutos: el RMF cubre el riesgo de IA ampliamente (equidad, privacidad, explicabilidad así como
  seguridad), CSF cubre resultados de ciberseguridad para cualquier sistema, y ambos ponen la
  gobernanza primero. El Perfil de Cibernética de IA en borrador (NIST IR 8596) es el puente, un
  perfil CSF 2.0 para IA [28].
- **COSAiS**, los Superposiciones de Control SP 800-53 para Asegurar Sistemas de IA, adaptarán los
  controles SP 800-53 a cinco casos de uso: asistentes de IA generativa, IA predictiva, sistemas de
  agente único y multiagente, y controles para desarrolladores de IA. A partir de 2026-09-24 la
  página del proyecto muestra el documento conceptual (14 de agosto de 2025) y un esquema anotado
  para la superposición de IA predictiva (8 de enero de 2026), sin borrador público de superposición
  aún [29]. Para organizaciones que ya ejecutan SP 800-53, las superposiciones serán la ruta más
  directa desde una línea de base de control existente a IA.

### Estado de revisión

El RMF mismo previó una revisión formal con entrada de la comunidad no más tarde de 2028, con
versiones numeradas 1.n para menores y 2.0 para revisiones mayores [9]. A partir de 2026-09-24 la
página del marco de NIST establece que AI RMF 1.0 "está siendo revisado como parte del Plan de
Acción de IA de la Casa Blanca" [24]; no encontramos versión revisada publicada, por lo que 1.0
sigue siendo el texto citable (verifica antes de confiar en la redacción de categoría). Dos
consecuencias de ingeniería siguen. Fija la versión en metadatos de control (`nist_ai_rmf@1.0`),
para que una revisión sea un diff que revises en lugar de un cambio silencioso de significado. Y
prefiere los identificadores de categoría y subcategoría sobre su prosa, porque los identificadores
tienden a sobrevivir revisiones mejor que la redacción.

NIST también aloja cruces del RMF a otros marcos, incluido ISO/IEC 42001 y, fechado 14 de agosto de
2025, un cruce ISO/IEC 23894 revisado y uno nuevo ISO/IEC 42005 [30]. Son un punto de partida sólido
para un archivo de cruce, no un sustituto para mapear tus propios controles.

## La familia ISO/IEC

ISO/IEC JTC 1/SC 42 publica los estándares internacionales de IA. Se hace referencia a ellos aquí
solo por número y título corto; los textos se venden por ISO y organismos nacionales y no se
reproducen. El capítulo 08 ya mapea las áreas del Anexo A de ISO/IEC 42001 e ISO/IEC 42005, 42006 y
23894 a artefactos ([capítulo 08, ISO/IEC](/bok/regulatory-map#isoiec-42001-42005-and-42006)).

### Fundamentos y vocabulario

| Norma | Título corto | Qué cambia en el stack | Capa |
|---|---|---|---|
| `ISO/IEC 22989:2022` | Conceptos y terminología de IA [31] | Vocabulario controlado para campos de registro y texto de política; roles de partes interesadas | 1 · 2 |
| `ISO/IEC 23053:2022` | Marco para sistemas de IA que utilizan aprendizaje automático [32] | Descomposición de referencia de un sistema ML en componentes para el AIBOM | 2 |
| `ISO/IEC 5338:2023` | Procesos del ciclo de vida del sistema de IA, basados en ISO/IEC/IEEE 15288 y 12207 [33] | Etapas del ciclo de vida a las que se adjuntan las puertas del pipeline | 1 · 3 |
| `ISO/IEC TR 24028:2020` | Descripción general de la confiabilidad en IA [34] | Taxonomía de fondo para catálogos de amenazas y modos de fallo | 1 |

ISO/IEC 22989 establece la terminología y los conceptos para la IA y está escrita para ser utilizada
por otros estándares [31]; ISO/IEC 5338, por ejemplo, extrae sus procesos específicos de IA de 22989
y 23053 [33]. Un registro cuyos nombres de campo sigan 22989 necesita menos traducción cuando un
auditor trabaja desde la familia SC 42. El estándar también define roles de partes interesadas como
proveedor de IA, productor de IA, cliente de IA, socio de IA y sujeto de IA (verifica la lista de
roles contra el texto), que no son el proveedor y responsable del despliegue del Reglamento de IA:
asígnalos explícitamente en el registro en lugar de asumir que coinciden.

### Riesgo, calidad y datos

| Norma | Título corto | Qué cambia en el stack | Capa |
|---|---|---|---|
| `ISO/IEC 23894:2023` | IA: orientación sobre gestión de riesgos [35] | Proceso de riesgo de IA organizacional; registro de riesgos como código | 1 · 3 |
| `ISO/IEC TR 24027:2021` | Sesgo en sistemas de IA y toma de decisiones asistida por IA [36] | Fuentes de sesgo y medidas a cubrir en evals de equidad | 3 |
| Serie `ISO/IEC 5259` (2024–2025) | Calidad de datos para análisis y ML: descripción general, marco de procesos, marco de gobernanza y partes relacionadas [37] | Pruebas de calidad de datos en CI; campos de ficha de datos; roles de gobernanza de datos | 2 · 3 |
| `ISO/IEC 25059:2023` | Modelo de calidad para sistemas de IA (extensión SQuaRE) [38] | Características de calidad a especificar y medir; cobertura de suite de evals | 3 |
| `ISO/IEC 38507:2022` | Implicaciones de gobernanza del uso de IA por parte de las organizaciones [39] | Derechos de decisión a nivel de junta directiva e informes de supervisión | 1 · 5 |

Dos detalles importan para la planificación. ISO/IEC 25059 está marcada como «a revisar» en la
página de ISO a partir de 2026-09-24, con una edición de reemplazo ya en etapa FDIS y esperada
dentro de meses [38], así que fija la edición a la que asignas. E ISO/IEC 38507 está escrita para el
órgano de gobierno y sus asesores (ejecutivos, auditores, responsables políticos) [39]: es el
estándar que le dice a una junta directiva lo que posee, que es donde termina la ruta de escalada en
la capa 05.

### El trío de sistemas de gestión

**ISO/IEC 42001:2023** especifica los requisitos para establecer, implementar, mantener y mejorar
continuamente un sistema de gestión de IA [40]. **ISO/IEC 42005:2025** proporciona orientación para
evaluaciones de impacto de sistemas de IA en individuos, grupos y sociedad en todo el ciclo de vida
[41]. **ISO/IEC 42006:2025** establece requisitos adicionales, además de ISO/IEC 17021-1, para
organismos que auditan y certifican sistemas de gestión de IA contra 42001 [42]: es cómo el emisor
de un certificado demuestra la competencia para emitirlo.

42001 sigue la Estructura Armonizada de ISO para estándares de sistemas de gestión, el diseño
compartido y el texto central definido en el Anexo SL, por lo que sus cláusulas 4 a 10 (contexto,
liderazgo, planificación, apoyo, operación, evaluación del desempeño, mejora) se alinean con todos
los demás estándares de sistemas de gestión de ISO [43]. Como ISO/IEC 27001, empareja esas cláusulas
con un anexo de controles, y la organización justifica qué controles aplica en una Declaración de
Aplicabilidad (verifica la redacción de la cláusula). La lectura de ingeniería de la SoA: es un
archivo generado, no un documento. Cada control del Anexo A listado como aplicable debe apuntar al
control en ejecución y al flujo de evidencia que lo implementa; cada exclusión debe llevar su
justificación y un propietario.

Lo que un certificado 42001 prueba, y lo que no, se establece en
[capítulo 07](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments) y
[capítulo 08](/bok/regulatory-map#what-is-not-harmonised-yet): evidencia un sistema de gestión; no
confiere presunción de conformidad del Reglamento de IA.

### Integración con 27001, 27701 y 9001

ISO diseñó estándares de sistemas de gestión para compartir una estructura de modo que una
organización pueda ejecutar un sistema de gestión integrado que cumpla con varios de ellos a la vez
[43]. Para IA eso significa ISO/IEC 42001 junto con ISO/IEC 27001:2022 para seguridad de la
información [44], ISO/IEC 27701 para privacidad, cuya edición 2025 es un sistema de gestión de
información de privacidad independiente que puede usarse solo o alineado con 27001 [45], e ISO 9001
para calidad, cuya edición 2026 reemplazó la edición 2015 en septiembre de 2026 [46].

| Cláusula compartida (Estructura Armonizada) | Un artefacto sirviendo a los cuatro | Capa |
|---|---|---|
| 4 Contexto | Una declaración de alcance y registro de partes interesadas, con sistemas de IA como entradas de registro | 2 |
| 5 Liderazgo | Un conjunto de políticas como código, con secciones de IA, seguridad, privacidad y calidad | 1 |
| 6 Planificación | Un registro de riesgos con riesgos tipificados (IA, seguridad, privacidad, calidad) y un flujo de tratamiento | 1 |
| 7 Apoyo | Un registro de competencia y capacitación; un almacén de información documentada | 5 |
| 8 Operación | Puertas de pipeline etiquetadas con los estándares que cada una sirve | 1 · 3 · 4 |
| 9 Evaluación del desempeño | Un almacén de evidencia respondiendo auditoría interna para los cuatro | 5 |
| 10 Mejora | Una cola de no conformidad y acción correctiva alimentada por incidentes | 5 |

> **En la práctica (ilustrativo)**
> Un equipo que ya tenía ISO/IEC 27001 añadió 42001 extendiendo, no duplicando. El registro de
> riesgos ganó un tipo de riesgo `ai` y un enlace al id del registro; el programa de auditoría
> interna ganó controles de IA; la Declaración de Aplicabilidad para 42001 fue generada a partir de
> los mismos metadatos de control que la de 27001. La auditoría de certificación encontró la
> evidencia donde los auditores de 27001 siempre la habían encontrado. El único artefacto nuevo fue
> la evaluación de impacto, construida a 42005 y adjunta a cada entrada de registro de alto riesgo.

## Normas armonizadas bajo el Reglamento de IA

*Última revisión 2026-09-24. Las etapas cambian mensualmente; vuelve a verificar antes de confiar en
cualquier fila.*

### Cómo funciona la presunción de conformidad

El artículo 40 del Reglamento de IA presume que los sistemas de alto riesgo (y los modelos de IA de
uso general) cumplen con los requisitos correspondientes cuando cumplen con las normas armonizadas
cuyas referencias han sido publicadas en el Diario Oficial, en la medida en que las normas cubran
esos requisitos [2]. Dos condiciones cierran la presunción: un estándar europeo adoptado por
solicitud de la Comisión, y su referencia citada en el DO después de que la Comisión lo evalúe. La
publicación solo por CEN-CENELEC no es suficiente. Cuando las normas no llegan, no son aceptadas o
abordan insuficientemente los derechos fundamentales, el artículo 41 permite que la Comisión adopte
**especificaciones comunes** por acto de ejecución en su lugar [2].

La Comisión pidió por primera vez a CEN y CENELEC normas de IA el 22 de mayo de 2023 (`C(2023)3215`,
registrada como solicitud `M/593`) [47][48]. Después de que CEN-CENELEC informara retrasos
significativos, la Comisión derogó y reemplazó esa solicitud en junio de 2025 con `C(2025)3871`,
alineada con el texto final del Reglamento de IA [47]. La solicitud cubre diez temas: gestión de
riesgos; gobernanza y calidad de conjuntos de datos; conservación de registros; transparencia;
supervisión humana; precisión; robustez; ciberseguridad; gestión de calidad; evaluación de la
conformidad [49]. En octubre de 2025 CEN y CENELEC adoptaron medidas excepcionales para acelerar la
entrega, incluida la publicación directa después de una votación de Consulta positiva sin una
Votación Formal separada, con los entregables prioritarios dirigidos a Q4 2026 [48].

El cronograma interactúa con el Omnibus Digital, que trasladó la aplicación de las obligaciones de
Anexo III de alto riesgo al 2 de diciembre de 2027 y del Anexo I al 2 de agosto de 2028 [50]. Para
la mayoría de proveedores las normas deberían por lo tanto llegar antes de que se apliquen las
obligaciones, pero no mucho antes, lo que deja poco margen para construir a un texto final.

### El programa JTC 21

El trabajo se sitúa en el comité técnico conjunto CEN-CENELEC JTC 21, organizado en grupos de
trabajo sobre aspectos operacionales, aspectos de ingeniería, aspectos fundamentales y sociales, y
ciberseguridad [51]. Las etapas a continuación provienen de un punto de información de normas
paneuropeo ejecutado con organismos nacionales de normalización [52] y se verifican cruzadamente
contra un rastreador público [53]; ambos son secundarios, y la asignación de artículos es según lo
informado por esas fuentes.

| Entregable | Asunto | Reglamento de IA | Etapa a partir de 2026-09-24 (reportada) | Qué cambia en el stack | Capa |
|---|---|---|---|---|---|
| `EN 18286:2026` | Sistema de gestión de calidad para propósitos del Reglamento de IA | `Art. 17` | Publicado julio 2026 [54]; no se encontró cita en DO | Los procesos QMS se ejecutan como etapas de pipeline; el diseño y control de cambios dejan evidencia | 1 · 5 |
| `prEN 18228` | Gestión de riesgos de IA | `Art. 9` | Votación de Consulta cerrada 30 jul 2026 | Archivo de riesgos del proveedor: peligro, estimación, evaluación, control, monitoreo; criterios de aceptabilidad como código | 1 · 3 · 5 |
| `prEN 18229-1` | Marco de confiabilidad, Parte 1: registro | `Art. 12` | Votación de Consulta cerrada 20 ago 2026 | Esquema de registro de eventos y retención para sistemas de alto riesgo | 4 · 5 |
| `prEN 18229-2` | Parte 2: transparencia | `Art. 13` | Redacción (período de comentarios cerrado ene 2026) | Campos de instrucciones de uso y ficha de modelo | 2 |
| `prEN 18229-3` | Parte 3: supervisión humana | `Art. 14` | Consulta lanzada 30 jul 2026 | Diseño de punto de control de supervisión; telemetría de supervisión | 4 |
| `prEN 18229-4`, `-5` | Partes 4 y 5: precisión, robustez | `Art. 15` | Nuevos proyectos aprobados 24 jun 2026 | Umbrales de precisión y robustez en la puerta de eval | 3 |
| `prEN 18282` | Especificaciones de ciberseguridad para sistemas de IA | `Art. 15` | Votación de Consulta cerrada 30 jul 2026 | Modelo de amenaza; suite adversarial; detección en tiempo de ejecución | 3 · 4 |
| `prEN 18283` | Gestión del sesgo en sistemas de IA | `Art. 10` | Aprobado para Consulta 24 sep 2026 | Medidas de sesgo en evals de equidad; manejo de datos de sesgo | 2 · 3 |
| `prEN 18284` | Calidad y gobernanza de conjuntos de datos | `Art. 10` | Redacción; no se registró Consulta (verifica) | Fichas de datos; linaje; pruebas de aceptación de conjuntos de datos | 2 · 3 |
| `prEN 18285` | Marco de evaluación de la conformidad | `Art. 43` | Redacción; no se registró Consulta (verifica) | Estructura del paquete de evidencia para la evaluación | 5 |
| `prEN 18281`, `prEN ISO/IEC 23282` | Evaluación de precisión para visión por computadora y para PNL | `Art. 15` | 18281: Votación de Consulta cerrada 11 jun 2026; 23282: Consulta desde 3 sep 2026 | Métodos y métricas de evaluación específicas de tareas | 3 |

Algunos estándares ISO/IEC también han sido adoptados como normas europeas (por ejemplo
`EN ISO/IEC 23894:2024` [52]). La adopción como EN no hace que un estándar sea armonizado bajo el
Reglamento de IA: solo un estándar entregado en la solicitud de la Comisión y citado en el DO lleva
la presunción. A partir de 2026-09-24 no encontramos ninguna decisión de ejecución de la Comisión
citando ningún estándar armonizado del Reglamento de IA, consistente con el rastreador de junio de
2026 [53] y con [capítulo 08](/bok/regulatory-map#what-is-not-harmonised-yet) (verifica en EUR-Lex
antes de confiar en ello).

### Lo que cada entregable cambia en el stack

Los borradores no son públicos, así que esta es una lectura de sus alcances publicados, no de sus
cláusulas. Tres cambios destacan.

**La gestión de riesgos se mueve de la organización al producto.** El alcance publicado de prEN
18228 aborda proveedores de sistemas de IA: identificar peligros, estimar y evaluar riesgos,
controlarlos y monitorear los controles, para riesgos a la salud, seguridad y derechos
fundamentales, en todo el ciclo de vida. Requiere que los proveedores establezcan criterios
objetivos de aceptabilidad de riesgos pero no establece los niveles, y no está destinado a gestionar
riesgos que la organización misma enfrenta [52]. Ese es un objeto diferente de ISO/IEC 23894, que
guía la gestión de riesgos organizacionales [35]. En el stack, el archivo de riesgos se convierte en
un artefacto por sistema con clave al id del registro, con criterios de aceptabilidad escritos como
umbrales que una puerta puede evaluar, y monitoreo que cierra el bucle en la capa 05.

**El registro, la supervisión y la transparencia se vuelven especificables.** La serie prEN 18229
divide los artículos 12–15 en partes separadas [52]. Una vez finales, la parte de registro es un
esquema para validar registros de eventos en CI, la parte de supervisión es una referencia de diseño
para la [**Puerta de Supervisión Humana**](/patterns/human-in-the-loop-gate), y la parte de
transparencia es una lista de campos para la ficha de modelo e instrucciones de uso.

**El SGC se vuelve auditable como un pipeline.** EN 18286 respalda el sistema de gestión de la
calidad del artículo 17 [54]. Un SGC cuyo control de diseño, gestión de cambios y vigilancia
poscomercialización se ejecutan como etapas de pipeline emite su propia evidencia; uno que vive en
procedimientos no. El patrón
[**Evidencia Legible por Máquina (OSCAL)**](/patterns/machine-readable-evidence-oscal) es cómo esa
evidencia llega a un evaluador.

### Construcción antes de la cita del DO

La brecha entre un borrador y una norma citada es donde la mayoría de los equipos pasarán 2026
y 2027. Tres reglas mantienen el trabajo reutilizable:

1. **Construye según el requisito, mapea a la norma.** El artículo de la Ley de IA es fijo; la
   numeración de cláusulas de la norma no. Controles clave en `Art. 9`, `Art. 12` y así
   sucesivamente, y añade ids de cláusula de norma como metadatos cuando el texto sea final.
2. **Mantén una vigilancia de normas como datos.** Un archivo con cada entregable, su etapa, la
   fecha en que lo comprobaste por última vez y los controles que dependen de él. Un cambio de etapa
   es entonces un diff que nombra los controles a revisar, no una sorpresa.
3. **No reclames la presunción temprano.** Hasta que exista la cita del DO, la conformidad con un
   borrador o una EN publicada es evidencia por sus propios méritos, no una presunción. Dilo en la
   documentación técnica.

> **En la práctica (ilustrativo)**
> Un proveedor de una herramienta de reclutamiento de alto riesgo construyó su archivo de riesgos
> según el alcance publicado de prEN 18228 mientras el borrador estaba en Consulta: peligros,
> estimaciones, controles y supervisión por sistema, con umbrales de aceptabilidad como código.
> Cuando se publicó EN 18286, el equipo comparó su lista de procesos SGC con las etapas de pipeline
> que ya ejecutaba y encontró dos brechas (notificación de cambio de proveedor y una cadencia de
> revisión poscomercialización). Ambas se convirtieron en etapas de pipeline con propietarios. El
> archivo de vigilancia de normas registró la fecha de cada comprobación, que es lo que un evaluador
> pidió ver.

## Serie IEEE 7000

La serie IEEE 7000 aborda la ética como proceso de ingeniería de sistemas. Ninguna de estas normas
está armonizada bajo la Ley de IA, y ninguna confiere una presunción; son útiles como referencias de
proceso.

| Norma | Asunto | Qué cambia en el stack | Capa |
|---|---|---|---|
| `IEEE 7000-2021` | Proceso modelo para considerar valores éticos desde la exploración de conceptos hasta el desarrollo, con elicitación de valor de partes interesadas y trazabilidad [55] | Requisitos de valor trazados a decisiones de diseño y pruebas | 1 |
| `IEEE 7001-2021` | Transparencia de sistemas autónomos, en niveles medibles y comprobables [56] | Niveles de transparencia escritos como requisitos comprobables | 2 · 3 |
| `IEEE 7002-2022` | Proceso de privacidad de datos para sistemas que utilizan datos personales [57] | Requisitos de privacidad como puertas SDLC | 1 · 2 |
| `IEEE 7003-2024` | Consideraciones de sesgo algorítmico, incl. selección de datos de validación y límites de aplicación [58] | Conjuntos de validación de sesgo; límites de aplicación declarados en el registro | 2 · 3 |
| `IEEE 7005-2021` | Gobernanza transparente de datos de empleadores [59] | Reglas de manejo para datos de empleados utilizados por IA | 2 |
| `IEEE 7010-2020` | Práctica recomendada para evaluar el impacto de sistemas autónomos e inteligentes en el bienestar humano [60] | Indicadores de bienestar en la evaluación de impacto | 2 |

Los "límites de aplicación para los que el algoritmo ha sido diseñado" de IEEE 7003 es la idea más
portátil aquí: un límite declarado en la entrada del registro es algo que un guardrail de tiempo de
ejecución puede hacer cumplir y una eval puede probar [58].

## Un control, muchos instrumentos

Los instrumentos se superponen mucho más de lo que sus vocabularios diferentes sugieren. La tabla
muestra, para siete controles que el stack ya construye, dónde cada instrumento los solicita. Es un
punto de partida para un archivo de mapeo cruzado, no una afirmación de que las filas sean
equivalentes.

| Control (capa) | OECD | CoE CETS 225 | G7 Code | NIST AI RMF | ISO/IEC | JTC 21 |
|---|---|---|---|---|---|---|
| Evaluación de riesgos e impacto (1 · 2) | `1.5(c)` | `Art. 16` | Acción 1 | MAP 5, MANAGE 1 | 23894, 42005 | prEN 18228 |
| Pruebas antes del lanzamiento y en cambios (3) | `1.4(a)` | `Art. 16(2)(g)` | Acción 1 | MEASURE 1, 2 | 42001 `A.6` | prEN 18229-4, -5 |
| Trazabilidad y registro (4 · 5) | `1.5(b)` | `Art. 14(2)(a)` | Acción 1 | MEASURE 3, MANAGE 4 | 42001 `A.6` | prEN 18229-1 |
| Transparencia y divulgación (2 · 4) | `1.3` | `Art. 8`, `15(2)` | Acción 3 | MEASURE 2.8 | 42001 `A.8` | prEN 18229-2 |
| Supervisión humana y anulación (4) | `1.2(b)`, `1.4(b)` | `Art. 8` | – | MAP 3.5, MANAGE 2.4 | 42001 `A.9` | prEN 18229-3 |
| Manejo e intercambio de incidentes (5) | – | `Art. 16(3)` | Acciones 2, 4 | GOVERN 4.3, MANAGE 4.3 | 42001 `10.2` | – |
| Cadena de suministro y terceros (2) | `1.5(c)` | – | Acción 11 | GOVERN 6, MANAGE 3 | 42001 `A.10` | – |

Fuentes: [7][1][10][9][40][52]; los ids de cláusula y Anexo A de ISO/IEC 42001 siguen
[capítulo 08](/bok/regulatory-map#isoiec-42001-42005-and-42006) y el
[mapeo cruzado](/resources/crosswalk) del sitio, cuyo [explorador](/resources/crosswalk#explore)
deriva estos pares para dos instrumentos cualesquiera y los exporta como una colección de mapeo
OSCAL. Los mapeos son ilustrativos, no una afirmación de conformidad.

La regla de ingeniería es la del flujo de trabajo de
[traducción regulatoria](/bok/the-role#regulatory-translation): construye cada control una vez,
etiquétalo con cada instrumento al que sirve, y genera la vista de cada instrumento a partir de las
etiquetas. Un principio, un artículo de tratado, una subcategoría y una cláusula armonizada se
convierten en cuatro consultas sobre la misma evidencia, y añadir un quinto instrumento es un cambio
de metadatos, no un nuevo programa.

**Correspondencias:** Principios de IA de la OCDE `1.1`–`1.5` · CoE CETS No. 225 Arts. 14–16 ·
Acciones 1–7, 10, 11 del Código de Conducta G7 Hiroshima · Ley de IA de la UE Art. 9–15, 17, 40, 41
· ISO/IEC 22989, 23894, 42001, 42005, 42006 · NIST AI RMF (Govern, Map, Measure, Manage) e IA 600-1
· Entregables de CEN-CENELEC JTC 21 · las cinco capas del stack. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Añade las cinco dimensiones de clasificación de la OCDE a tu esquema de registro** como campos
   obligatorios, y haz que una política lea una de ellas (por ejemplo, `rights_impact: high`
   requiere una eval de equidad).
2. **Etiqueta tus diez controles más importantes con ids de subcategoría de NIST AI RMF e ids de cláusula de ISO/IEC 42001**,
   fijados a la edición, y genera un Perfil Actual a partir de las etiquetas.
3. **Inicia un archivo de vigilancia de normas** listando cada entregable de JTC 21 en la tabla
   anterior, su etapa, la fecha en que lo comprobaste y los controles que dependen de él; establece
   una revisión mensual.
4. **Toma los principios de IA publicados de tu organización y nombra, para cada uno, el control y el registro de evidencia que lo implementan.**
   Un principio sin control es una brecha; escríbelo como tal.
5. **Si tienes ISO/IEC 27001, mapea sus cláusulas compartidas a las de 42001** y apunta ambas a un
   almacén de evidencia antes de escribir cualquier procedimiento nuevo.

## Sources

[1] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Art. 2 definition; Art. 3 scope and private-actor declaration; Arts. 7–13 principles; Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 40 and 41 (Art. 40: harmonised standards, presumption of conformity once references are published in the OJ; Art. 41: common specifications by implementing act). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_40 (verified: primary)
[3] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; definition and lifecycle used by the EU, the Council of Europe, the US and the UN; AI Incidents and Hazards Monitor; Hiroshima AI Reporting Framework). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[4] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four core values, ten core principles, policy action areas). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[5] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[6] Ethics Guidelines for Trustworthy AI (lawful, ethical, robust; seven key requirements; human-in-the-loop, human-on-the-loop, human-in-command; "safeguards that enable a fallback plan in case of problems"). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[7] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; G20 AI Principles drawn from it, June 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles, five recommendations; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[8] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (Fig. 1 harms; risk tolerance not prescribed; Fig. 2 lifecycle and dimensions adapted from the OECD; seven trustworthy characteristics; Core of 4 functions and 19 categories, 72 subcategories by our count of Tables 1–4; use-case, temporal and cross-sectoral profiles; formal review no later than 2028). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; living document building on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[11] "Council of Europe adopts first international treaty on artificial intelligence" (adopted in Strasbourg on 17 May 2024; opens for signature in Vilnius on 5 September 2024). Council of Europe. 2024-05-17. https://www.coe.int/en/web/portal/-/council-of-europe-adopts-first-international-treaty-on-artificial-intelligence (verified: primary)
[12] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[13] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), Recitals 12 and 27 and Art. 3(1) (recital 27: the seven AI HLEG principles as non-binding guidance; recital 12: the AI-system notion closely aligned with the work of international organisations; Art. 3(1)). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[15] Catalogue of Tools & Metrics for Trustworthy AI. OECD.AI. 2026. https://oecd.ai/en/catalogue/overview (verified: primary)
[16] Readiness Assessment Methodology (RAM): country-level readiness to govern AI (RAM 2.0). UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/ram (verified: primary)
[17] Ethical Impact Assessment (EIA): system-level assessment before and during use, for governments, companies and researchers. UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/eia (verified: primary)
[18] "EU Parliament backs EU conclusion of the Council of Europe Framework Convention on Artificial Intelligence" (European Parliament approval on 11 March 2026). Council of Europe. 2026-03-11. https://www.coe.int/en/web/artificial-intelligence/-/eu-parliament-backs-eu-conclusion-of-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[19] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union exclusively through Reg. (EU) 2024/1689 and other relevant Union acquis; declaration under Art. 3(1)(b) on private actors; OJ L 13 May 2026; text read from the Publications Office Cellar, CELEX 32026D1080). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: primary)
[20] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 February 2025; HUDERIA Model: COBRA approved 25 February 2026; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[21] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list 17 July 2020 after a pilot with over 350 stakeholders; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[22] NIST AI RMF Playbook, GOVERN entries (per subcategory: About; Suggested Actions; Transparency and Documentation; AI Transparency Resources; References). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[23] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV/MP/MS/MG, 212 identifiers by our count). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[24] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; concept note for a critical-infrastructure profile, 7 April 2026). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[25] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[26] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (augments SSDF 1.1). NIST. 2024-07-26. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[27] The NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 (Functions: Govern, Identify, Protect, Detect, Respond, Recover). NIST. 2024-02-26. https://doi.org/10.6028/NIST.CSWP.29 (verified: primary)
[28] NIST IR 8596 (initial preliminary draft): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile; comments closed 30 January 2026). NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[29] SP 800-53 Control Overlays for Securing AI Systems (COSAiS) (five use cases; concept paper 14 August 2025; predictive-AI annotated outline 8 January 2026; page updated 8 January 2026). NIST CSRC. 2026-01-08. https://csrc.nist.gov/projects/cosais (verified: primary)
[30] AI RMF crosswalk documents (AI RMF to ISO/IEC 42001; ISO/IEC 23894 revised crosswalk and ISO/IEC 42005 crosswalk dated 14 August 2025). NIST Trustworthy and Responsible AI Resource Center. 2025. https://airc.nist.gov/airmf-resources/crosswalks/ (verified: primary)
[31] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[32] ISO/IEC 23053:2022, Framework for AI systems using machine learning. ISO/IEC. 2022-06. https://www.iso.org/standard/74438.html (verified: primary)
[33] ISO/IEC 5338:2023, AI system life cycle processes (based on ISO/IEC/IEEE 15288 and 12207, with AI-specific processes from ISO/IEC 22989 and 23053). ISO/IEC. 2023-12. https://www.iso.org/standard/81118.html (verified: primary)
[34] ISO/IEC TR 24028:2020, Overview of trustworthiness in artificial intelligence. ISO/IEC. 2020-05. https://www.iso.org/standard/77608.html (verified: primary)
[35] ISO/IEC 23894:2023, AI: Guidance on risk management (organisational AI risk management). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[36] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making. ISO/IEC. 2021-11. https://www.iso.org/standard/77607.html (verified: primary)
[37] ISO/IEC 5259 series, Data quality for analytics and machine learning (Part 1:2024 overview, terminology and examples; Part 4:2024 process framework; Part 5:2025 governance framework). ISO/IEC. 2024-07. https://www.iso.org/standard/81088.html (verified: primary)
[38] ISO/IEC 25059:2023, SQuaRE: Quality model for AI systems (stage 90.92, to be revised, as of 2026-09-24; replacement at FDIS stage, expected within the coming months). ISO/IEC. 2023-06. https://www.iso.org/standard/80655.html (verified: primary)
[39] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[40] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AIMS). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[41] ISO/IEC 42005:2025, AI system impact assessment (guidance). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[42] ISO/IEC 42006:2025, Requirements for AIMS audit and certification bodies (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
[43] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[44] ISO/IEC 27001:2022, Information security management systems. ISO/IEC. 2022-10. https://www.iso.org/standard/82875.html (verified: primary)
[45] ISO/IEC 27701:2025, Privacy information management systems: Requirements and guidance (independent management system standard; aligns with ISO/IEC 27001). ISO/IEC. 2025-10. https://www.iso.org/standard/85819.html (verified: primary)
[46] ISO 9001:2026, Quality management systems: Requirements (replaces ISO 9001:2015). ISO. 2026-09. https://www.iso.org/standard/9001 (verified: primary)
[47] Commission Implementing Decision C(2025)3871 on a standardisation request to CEN and Cenelec in support of Reg. (EU) 2024/1689, repealing Implementing Decision C(2023)3215 of 22 May 2023 (significant delays reported by CEN and Cenelec; request aligned with the final AI Act). European Commission. 2025-06-23. https://ec.europa.eu/transparency/documents-register/detail?ref=C(2025)3871&lang=en (verified: primary)
[48] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; drafting group for delayed drafts; Q4 2026 target; Standardization Request M/593 and Amendment M/613). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[49] AI Act standardisation (ten requested topics; prEN 18286 first to public enquiry on 30 October 2025; page updated 3 August 2026). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[50] "AI Omnibus enters into force" (Reg. (EU) 2026/1744; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[51] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity; prEN 18229 in five parts). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[52] Project stages for JTC 21 deliverables read on 2026-09-24: EN 18286:2026 (60.60, 2026-07-22); prEN 18228 (40.60, vote closed 2026-07-30; published scope); prEN 18229-1 (40.60, 2026-08-20); prEN 18229-2 (20.60, 2026-01-06); prEN 18229-3 (40.20, 2026-07-30); prEN 18229-4 and -5 (10.99, 2026-06-24); prEN 18281 (40.60, 2026-06-11); prEN 18282 (40.60, 2026-07-30); prEN 18283 (30.99, 2026-09-24); prEN 18284 (10.99); prEN 18285 (10.99); prEN ISO/IEC 23282 (40.20, 2026-09-03); EN ISO/IEC 23894:2024 (60.60). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[53] JTC 21 standards tracker (AI Act article per deliverable; no JTC 21 deliverable cited in the OJ as of June 2026). kla.digital. 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[54] "EN 18286 in the spotlight: supporting compliance with the AI Act" (EN 18286:2026, Artificial intelligence: Quality management system for EU AI Act regulatory purposes; supports Art. 17). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[55] IEEE 7000-2021, Standard Model Process for Addressing Ethical Concerns during System Design. IEEE SA. 2021. https://standards.ieee.org/standard/7000-2021.html (verified: primary)
[56] IEEE 7001-2021, Standard for Transparency of Autonomous Systems. IEEE SA. 2021. https://standards.ieee.org/standard/7001-2021.html (verified: primary)
[57] IEEE 7002-2022, Standard for Data Privacy Process. IEEE SA. 2022. https://standards.ieee.org/standard/7002-2022.html (verified: primary)
[58] IEEE 7003-2024, Standard for Algorithmic Bias Considerations (validation-data selection; application boundaries). IEEE SA. 2024. https://standards.ieee.org/standard/7003-2024.html (verified: primary)
[59] IEEE 7005-2021, Standard for Transparent Employer Data Governance. IEEE SA. 2021. https://standards.ieee.org/standard/7005-2021.html (verified: primary)
[60] IEEE 7010-2020, Recommended Practice for Assessing the Impact of Autonomous and Intelligent Systems on Human Well-Being. IEEE SA. 2020. https://standards.ieee.org/standard/7010-2020.html (verified: primary)
