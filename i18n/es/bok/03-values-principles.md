---
lang: es
source: bok/03-values-principles.md
sourceHash: "92d0c8a26a210d3b43d6f5a17ec0327d94ea1204a4b6e3b8a92ddb03e15e6dab"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 03. Valores y principios

> Los ocho valores y seis principios de la Tesis, cada uno expandido con lo que significa en la
> práctica y el antipatrón que rechaza.

La Tesis establece ocho valores y seis principios en una línea cada uno. Este capítulo los expande.
Los dos son deliberadamente diferentes tipos de cosa, y la diferencia es lo que los mantiene de ser
la misma lista contada dos veces. Un **valor** es una preferencia: un compromiso, hacia qué nos
inclinamos cuando no podemos tener ambos; se afirma como una afirmación, y nombrar lo que
construimos *hacia* también nombra lo que construimos *lejos de*. Un **principio** es un compromiso
de *actuar*: una regla de método, expresada como algo que hacemos, que se mantiene
independientemente de la preferencia. Así que los valores nombran los artefactos y resultados hacia
los que construimos; los principios nombran cómo trabajamos, y no llevan vocabulario tomado de los
valores. Lee los valores para saber hacia dónde inclinarte; lee los principios para saber qué hacer
el lunes.

No todos los valores son nuevos para la IA. Gobernanza como código (1), evidencia legible por
máquina (5) y reducción de riesgo medida (7) se heredan de la ingeniería GRC, la disciplina padre.
Evals que fallan la compilación (2) e identidad y alcance de agentes (4) son lo que la IA nos obliga
a añadir; el modelo que debe ser probado y el actor autónomo que debe ser acotado no tienen análogo
en GRC clásico.

Estos son los propios valores y principios del libro. Los conjuntos de principios publicados por
otros se tratan en otro lugar: el capítulo 11 traza
[los conjuntos de principios de IA responsable publicados a artefactos](/bok/ai-defined#responsible-ai-principle-sets-engineered),
y el capítulo 22 tiene los
[Principios de IA de la OCDE asignados al stack](/bok/principles-and-standards#the-five-principles-and-five-recommendations).

---

## Los ocho valores

Cada valor se afirma como una afirmación: lo que construimos hacia, que al nombrarlo también nombra
lo que construimos lejos de. La forma de valores y principios sigue el Manifiesto de Ingeniería GRC
que es el precedente de este libro [1].

### 1. La gobernanza es código, no un documento

Una política en un PDF es una declaración de intención que un humano debe leer, recordar y aplicar.
Una política como código es un control que se ejecuta: evalúa una solicitud de extracción, un
despliegue o una llamada de tiempo de ejecución y devuelve una decisión. El documento describe la
regla; el código *es* la regla, versionada en un repositorio, probada y aplicada sin que nadie tenga
que recordarla. Cuando la regla cambia, cambias un artefacto y cada punto de aplicación se
actualiza. Cuando un auditor pregunta cuál era la política en una fecha determinada, muestras el
commit.

Esto no es «eliminar todos los documentos». Una política aún necesita una declaración legible por
humanos de por qué existe. El valor reside en que la versión autorizada y ejecutada es la
ejecutable, y la prosa es su documentación, no al revés.

> **En la práctica** Una regla de residencia de datos escrita como `OPA/Rego` bloquea cualquier
> despliegue que enrutaría la inferencia fuera de la región permitida, en CI y en la admisión. La
> misma regla, como PDF, se «comunicaba» trimestralmente y se violaba mensualmente.
> **Antipatrón** La «biblioteca de políticas» que es una carpeta de documentos Word que nadie puede
> consultar, cuya aplicación es un correo electrónico y cuyo cumplimiento es autoevaluado.

### 2. Las evals fallan las compilaciones; las revisiones solo recomiendan

Una revisión produce una recomendación; alguien puede actuar sobre ella, más tarde, o no. Una eval
produce un veredicto con consecuencias: el modelo o agente pasó o falló una prueba definida, y un
fallo bloquea el lanzamiento. En sistemas de IA, el control más honesto es una prueba que el sistema
debe pasar, ejecutada automáticamente, cuyo resultado cambia lo que sucede después. Preferimos
controles que muerdan.

Una revisión aún tiene su lugar: para preguntas que ninguna prueba puede resolver. Pero cuando una
propiedad *puede* ser probada (un umbral de resistencia a jailbreak, un límite de fuga de PII, una
verificación de alcance de herramientas), convertirla en una revisión en lugar de una puerta eval es
una opción para poder recomendar pero no detener.

> **En la práctica** Una suite eval de red team (Inspect, Garak) se ejecuta en CI; si la resistencia
> a inyección cae por debajo del umbral acordado, la canalización falla y el lanzamiento no se envía
> hasta que se corrija.
> **Antipatrón** Una «junta de revisión de riesgo de modelo» que se reúne mensualmente, escribe
> hallazgos calificados como bajo/medio/alto, y no tiene mecanismo para detener un lanzamiento ya
> programado.

### 3. La evidencia proviene del tiempo de ejecución, no de una atestación en un momento específico

Una atestación dice que un control estaba en su lugar cuando alguien miró. La evidencia en tiempo de
ejecución muestra el control funcionando continuamente, desde el sistema mismo. Los sistemas de IA
cambian entre revisiones (un modelo se reentrena, un agente gana una herramienta), por lo que la
evidencia recopilada una vez se degrada inmediatamente. Preferimos evidencia que se emite mientras
el sistema se ejecuta, de modo que «¿funciona el control?» se responde mediante telemetría en vivo,
no por una firma fechada el trimestre pasado.

> **En la práctica** Las decisiones de guardrail, resultados eval y veredictos de política se
> transmiten a un almacén de aseguramiento con marcas de tiempo; el estado del control es una
> consulta en vivo, no una firma anual.
> **Antipatrón** Un carpeta de atestación estilo SOC ensamblada la semana anterior a una auditoría,
> describiendo controles como se imaginaba que fueran, no como la producción se comportó realmente.

### 4. Cada agente lleva su propia identidad y alcance

Un agente que actúa en una cuenta de servicio compartida o una clave estática es ingobernable: no
puedes atribuir sus acciones, revocar su acceso con precisión, o limitar lo que puede hacer.
Preferimos que cada actor no humano tenga su propia identidad, un propietario, y un alcance de
acciones permitidas, establecido *antes* de que se le permita actuar. La identidad es la
precondición de la responsabilidad; el alcance es la precondición de la contención. El capítulo 23
construye ambos para agentes, comenzando desde
[identidad y credenciales de corta duración](/bok/governing-agents#identity-and-short-lived-credentials).

> **En la práctica** A cada agente se le emite una identidad de carga de trabajo distinta,
> registrada con un propietario y un alcance declarado; un agente que se comporta mal se rastrea
> hasta su identidad y su acceso se revoca sin tocar a los otros.
> **Antipatrón** Una flota de agentes que comparten una clave API y una cuenta de servicio
> privilegiada, donde un incidente significa rotar un secreto y romper todo, y la atribución es
> imposible.

### 5. La evidencia es legible por máquina o no es evidencia

La evidencia que un humano debe producir, formatear y archivar manualmente no escala y no puede
verificarse a velocidad. La evidencia legible por máquina (`OSCAL`, resultados de evals
estructurados, registros firmados) puede consultarse, compararse, agregarse y verificarse
automáticamente. Preferimos evidencia que una máquina pueda leer, porque entonces la auditoría se
convierte en una consulta y la misma evidencia alimenta el aseguramiento continuo en lugar de una
carpeta única.

> **En la práctica** Los resultados de control se emiten como artefactos de componente y evaluación
> `OSCAL`; la pregunta de un auditor se responde ejecutando una consulta contra el almacén de
> evidencia.
> **Antipatrón** Una unidad compartida de capturas de pantalla y hojas de cálculo exportadas,
> recopiladas desde cero para cada auditoría, inverificables y obsoletas en el momento en que se
> guardan.

### 6. Las herramientas deben ser inspeccionables y componibles

El punto no es quién construyó la herramienta o si es de código abierto; es si puedes ver dentro. No
puedes confiar en un veredicto que no puedes rastrear. Las herramientas inspeccionables te permiten
seguir una decisión hasta la regla que la produjo, la entrada que vio y la evidencia que emitió; las
herramientas componibles te permiten conectar esa decisión en tu propia canalización en lugar de
exportar a la de otro. Preferimos herramientas cuyo razonamiento y ruta de datos podemos abrir,
compradas o construidas, porque la gobernanza que no puedes ver dentro es un control en el que no
puedes confiar. La comparación de un proveedor de la categoría de plataforma de gobernanza de IA,
publicada por un competidor en ella, encuentra que la mayoría de la categoría «gestiona el programa
(inventarios, evaluaciones, mapeos de marcos, flujos de trabajo de evidencia) sin ninguna ruta de
datos en tiempo de ejecución» [3]; donde eso se mantiene, la objeción no es que la herramienta sea
comercial sino que su veredicto no puede ser auditado.

Esta es una inclinación, no un absoluto. Las herramientas cerradas y comerciales tienen un lugar,
incluidas plataformas capaces. Pero el predeterminado es herramientas que el equipo puede
inspeccionar y componer, sobre una caja negra en la que el equipo debe confiar.

> **En la práctica** El arnés eval, la biblioteca de políticas y el registro exponen cómo se alcanza
> un veredicto (la regla, la entrada y la evidencia emitida) y se componen en la canalización que el
> equipo ya ejecuta, ya sean los componentes de código abierto o una plataforma con una ruta de
> datos abierta.
> **Antipatrón** Una plataforma de gobernanza de seis cifras cuya «puntuación de cumplimiento» no
> puede rastrearse a un único control en ejecución, y cuya ruta de datos se detiene en la
> importación de hojas de cálculo.

### 7. El éxito se mide en reducción real del riesgo, no en cobertura de marcos

Mapear cada control a NIST AI RMF e ISO 42001 prueba que has leído los marcos; no prueba que ningún
riesgo haya caído. Preferimos medir la cosa en sí: ¿cayó la tasa del modo de fallo, se redujo el
radio de explosión, se detectó el incidente antes? La cobertura es una entrada; la reducción real
del riesgo es el resultado. Una matriz de mapeo verde sobre un control roto es teatro con pasos
adicionales [2].

> **En la práctica** Cada control declara el modo de fallo que aborda y una métrica para él (tasa de
> éxito de inyección, tiempo para detectar, llamadas de herramientas no autorizadas bloqueadas); el
> control se juzga por la métrica moviéndose, no por la celda del marco volviéndose verde.
> **Antipatrón** Una matriz de trazabilidad de 300 filas que mapea controles a cinco marcos,
> presentada como madurez, sin medición de si alguno de los controles mapeados reduce realmente el
> riesgo.

### 8. La gobernanza es propiedad conjunta con la ingeniería, no impuesta desde fuera

La gobernanza que se sienta aparte y otorga o niega el paso es un cuello de botella que los
ingenieros rodean. La gobernanza propiedad conjunta con la ingeniería, construida en la ruta
pavimentada, adoptada porque es la forma más fácil de enviar, se convierte en parte de cómo se hacen
las cosas. Preferimos la propiedad compartida: la función de gobernanza construye las herramientas,
la ingeniería construye sobre ellas, y la puerta es una etapa en una canalización que ambos poseen,
no una reunión que un lado teme. El capítulo 12 describe la
[cultura de gobernanza](/bok/governance-program#governance-culture) de la que depende la propiedad
compartida.

> **En la práctica** La puerta eval y las verificaciones de política se envían como parte de la
> plantilla de canalización estándar; los ingenieros las adoptan porque la ruta pavimentada es
> también la ruta más rápida, y la gobernanza las co-mantiene.
> **Antipatrón** Un equipo de gobernanza que revisa y aprueba lanzamientos desde fuera, medido por
> cuántos detiene, mientras la ingeniería construye un proceso de sombra para evitarlo.

**Aún usamos las prácticas que cada valor construye alejándose; construimos hacia la afirmación.**

---

## Los seis principios

### Construye el control en el punto más temprano en el que puede bloquear

Coloca cada control donde aún puede detener que algo salga mal, y no más tarde. El lugar más
temprano en el que se puede detectar un riesgo es el más barato de arreglar y el lugar más fuerte
para hacer cumplir: detectarlo en el repositorio supera detectarlo en producción, que supera
explicarlo a un regulador. Entonces un control se sitúa en la primera puerta que puede rechazar el
cambio: una política en CI, una eval antes de desplegar, una verificación de identidad en la
admisión, un guardrail en el punto de acción. El compromiso es sobre *colocación*: cualquiera que
sea el control, pertenece al punto ejecutable más temprano, no añadido al final.

> **En la práctica** Un nuevo agente no puede ser desplegado hasta que haya registrado un
> propietario y un alcance y haya pasado su puerta eval; la canalización lo hace cumplir en la
> puerta más temprana que puede rechazarlo, no una persona al final.
> **Antipatrón** Una «revisión de gobernanza» previa al lanzamiento que ocurre después de que el
> sistema está construido, no cambia nada sobre cómo fue construido, y solo puede retrasar u
> ondular.

### Dale a cada control dientes

Un control debe ser capaz de cambiar lo que sucede después: bloquear una fusión, fallar un
despliegue, revocar acceso. Cualquier cosa que solo pueda informar a un comité es una *señal*, y lo
decimos así en lugar de disfrazarlo como un control. Este es el compromiso que convierte una eval de
investigación en una puerta, una política de un PDF en una verificación, un umbral de un número de
panel en un bloqueador de lanzamiento. Cuando una propiedad puede ser probada, convertirla en una
revisión en lugar de una puerta es una opción para poder recomendar pero no detener, y hacemos esa
opción conscientemente o no en absoluto.

Los dientes no son el animal completo. Una puerta que puede fallar la compilación es necesaria y no
suficiente: una eval es en un momento específico y limitada por muestreo, puede ser manipulada
ajustando el modelo a la suite o el umbral al modelo, y detecta regresiones contra casos conocidos,
no el ataque novedoso que la suite nunca imaginó. Entonces un control con dientes lleva obligaciones
propias (su cobertura medida, sus casos mantenidos adversarialmente, sus umbrales rastreados a modos
de fallo nombrados), y una puerta de aprobación *obliga* al monitoreo en tiempo de ejecución de la
capa 04, no lo reemplaza. Una puerta verde tratada como prueba de seguridad es teatro de marcos con
una canalización más rápida.

> **En la práctica** Las evals de capacidad y adversariales se versionan junto con el modelo; el
> despliegue depende de que el trabajo eval pase, su cobertura se rastrea como su propia métrica, y
> un guardrail en tiempo de ejecución lleva el mismo umbral a la producción contra las entradas que
> ninguna eval muestreó.
> **Antipatrón** Una evaluación de modelo única antes del lanzamiento, sus resultados pegados en una
> diapositiva, nunca re-ejecutada cuando el modelo o sus prompts cambian; o una puerta cuyo umbral
> se baja silenciosamente hasta que la compilación se vuelve verde.

### Registra y limita cada actor antes de que actúe

Nada, humano o no humano, actúa hasta que tiene un propietario, un alcance declarado y una forma de
ser detenido. La autonomía sobre credenciales compartidas es ingobernable por construcción: no
puedes atribuir, contener o revocar lo que no puedes rastrear hasta un actor. Así que el registro es
una precondición, no un seguimiento: cada actor se inscribe, se delimita en alcance y se le da un
kill switch *antes* de que haga nada por su cuenta. La autonomía se gana siendo gobernable, no se
otorga por defecto.

> **En la práctica** El registro de agentes es la puerta: un agente sin propietario, sin alcance o
> sin kill switch se le niega una identidad de carga de trabajo y no puede llegar a producción.
> **Antipatrón** Agentes creados ad hoc en una clave compartida, descubiertos solo después de que
> uno de ellos toma una acción que nadie puede explicar o deshacer.

### Instrumentar la compilación para producir su propia prueba

Conecta cada control para que emita su propio registro mientras se ejecuta, de modo que el
aseguramiento se derive del sistema en lugar de ser ensamblado manualmente antes de una auditoría.
Si demostrar un control requiere una captura de pantalla, no hemos terminado de construirlo. El
compromiso es con la instrumentación: cada puerta, guardrail y verificación escribe un registro
estructurado y firmado mientras se dispara, de modo que la auditoría es una consulta y los mismos
registros impulsan el aseguramiento continuo y la respuesta a incidentes (el capítulo 17 especifica
[el registro de incidentes](/bok/incidents#the-incident-record)).

> **En la práctica** Cada puerta y guardrail escribe un registro estructurado y firmado; el registro
> de auditoría se construye a sí mismo, y el almacén de evidencia responde tanto al auditor como al
> ingeniero de guardia.
> **Antipatrón** Un sprint de recopilación de evidencia antes de cada auditoría, recreando después
> del hecho un registro que los sistemas nunca produjeron realmente.

### Comenzar desde un modo de fallo nombrado o un daño nombrado

Diseña cada control contra una forma específica en que el sistema falla o un daño específico que
puede causar a una persona, y comienza ahí, no desde una lista de verificación de marco. Los modelos
de amenaza (inyección de prompts, mal uso de herramientas, abuso de identidad de agente,
exfiltración de datos) y
[evaluaciones de impacto sobre derechos fundamentales](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27)
son las entradas para el diseño, no documentación producida después. Si no podemos nombrar el riesgo
que un control responde, no lo construimos. El capítulo 13 muestra cómo
[identificar fuentes de riesgo, factores y partes interesadas](/bok/risk-management#identifying-risk-sources-factors-and-stakeholders),
y el [atlas de daños](/resources/harms) enumera daños por nivel, cada uno con el control que lo
detecta.

> **En la práctica** El diseño del agente comienza desde su modelo de amenaza Agentic de OWASP [4] y
> su FRIA; los controles que se envían son exactamente los que esos dos documentos exigieron, y se
> asignan de nuevo a ellos.
> **Antipatrón** Un catálogo de controles ensamblado desde una lista de verificación de marco,
> abordando riesgos que el sistema no tiene mientras se pierden la ruta de inyección que un atacante
> realmente usa.

### Hacer que la ruta gobernada sea la ruta más fácil

Envía la gobernanza como herramientas, plantillas y rutas pavimentadas que los ingenieros adoptan
sin pedir permiso (una biblioteca de políticas, un registro con una API, una puerta que pueden
ejecutar localmente antes de que empujen), y mide la adopción. Las personas gobernadas son nuestros
usuarios; la ruta pavimentada tiene que ser la ruta más rápida o será eludida. Si usar la gobernanza
es más difícil que evitarla, la gobernanza está diseñada mal, y arreglamos el producto, no las
personas.

> **En la práctica** Un ingeniero estructura un nuevo servicio de IA a partir de una plantilla que
> ya incluye el gancho del registro, las verificaciones de política y la puerta de eval; el
> cumplimiento es el predeterminado, no una solicitud.
> **Antipatrón** Una intranet de gobernanza de formularios y colas de tickets, donde hacer lo
> correcto toma una semana y una reunión, así que los equipos hacen silenciosamente lo rápido en su
> lugar.

**Correspondencias:** los valores y principios se realizan a través del stack de cinco capas
(capítulo 04) y el catálogo de patrones (capítulo 05); los modos de fallo que apuntan son OWASP Top
10 para Aplicaciones Agentic; el aseguramiento que demandan se asigna a ISO/IEC 42001, NIST AI RMF y
Artículos 9, 15, 55 y 72 del Reglamento de IA de la UE. Las asignaciones son ilustrativas, no una
afirmación de conformidad.

## Sources

[1] GRC Engineering Manifesto (values and principles precedent). grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[4] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
