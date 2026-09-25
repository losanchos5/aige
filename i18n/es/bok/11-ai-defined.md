---
lang: es
source: bok/11-ai-defined.md
sourceHash: "22aa065addac570dc901cead7669db00821af938af30615db31b2b35b900ba68"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 11. IA, definida para gobernanza

> Qué es un sistema de IA para propósitos de gobernanza: las definiciones que establecen el alcance,
> los tipos de IA y los rasgos que rompen la gobernanza clásica, cada uno convertido en un campo de
> registro, un control y evidencia.

Una función de gobernanza no puede gobernar lo que no ha definido. Antes de que un registro pueda
listar sistemas de IA, antes de que una admisión pueda clasificarlos y antes de que una política
pueda vincularlos, alguien tiene que decidir qué sistemas cuentan. Esa decisión no es un ejercicio
de glosario. Es el primer control en el stack: decide qué entra en el **registro de agentes** (capa
02), a qué obligaciones la admisión encamina un sistema y qué sistemas quedan fuera de todos los
demás controles en este libro. Acertarla en una dirección y un modelo de puntuación escapa a
revisión porque alguien lo llamó "solo estadística". Acertarla en la otra y el registro se llena de
macros de hojas de cálculo, la señal se ahoga y los propietarios dejan de leerlo.

Este capítulo compara las cuatro definiciones que establecen el alcance, convierte cada uno de sus
elementos en un campo de registro, separa IA de software determinista, ordena los tipos de IA por
los controles que cambian y nombra los rasgos que hacen fallar la gobernanza clásica de TI. Cierra
con dos cosas que normalmente se dejan como prosa: gobernar salidas probabilísticas y rastrear los
conjuntos de principios de IA responsable publicados hasta artefactos. No es un manual de
aprendizaje automático: una técnica importa aquí solo cuando cambia un control, un propietario o una
pieza de evidencia.

## Por qué la definición es un control

Dos decisiones se sientan al frente de cada admisión, y son decisiones diferentes. La primera es
**definitoria**: ¿es esto un sistema de IA en absoluto? La segunda es **clasificatoria**: dado que
lo es, ¿qué obligaciones y qué controles aplican? La mayoría de la ley y la mayoría de los programas
de gobernanza tratan la primera como una puerta a la segunda. Bajo el Reglamento de IA de la UE la
definición es literalmente el alcance de la regulación: el Reglamento aplica solo a sistemas que
cumplen la definición en el artículo 3(1), y esa definición ha aplicado desde el 2 de febrero de
2025 [1]. La misma orientación de la Comisión tiene cuidado de añadir que "la gran mayoría de
sistemas, incluso si califican como sistemas de IA", no llevarán obligaciones bajo el Reglamento
[1]. Así que un sistema puede estar dentro de la definición y fuera de cada deber; un ingeniero de
gobernanza necesita ambas respuestas, registradas por separado, con el razonamiento adjunto.

Trata la respuesta definitoria como un control como cualquier otro en este libro. Tiene un
propietario (el [flujo de trabajo de admisión](/bok/the-role#intake-and-classification)). Se ejecuta
en el punto más temprano en que puede bloquear: en la admisión, no en la revisión previa al
lanzamiento. Deja evidencia: un registro de decisión que nombra la definición aplicada, los
elementos encontrados, quién o qué decidió y cuándo. Y se revisa cuando el sistema cambia, porque un
motor de reglas que gana un componente aprendido cruza la línea sin que nadie presente un ticket.

> **En la práctica (ilustrativo)**
> En una gran telco, la primera pasada de admisión pidió a los equipos que se autodeclararan "IA o
> no". La autodeclaración produjo ambos modos de fallo a la vez: un modelo de propensión de abandono
> registrado como "analítica" y una macro de enrutamiento de palabras clave registrada como "IA".
> Reemplazar la pregunta sí/no con las preguntas de elementos a continuación, cada una respondida en
> el registro con una razón de una línea, movió la decisión de opinión a registro. Los desacuerdos
> se convirtieron en diffs en el registro de decisión, revisados como cualquier otro cambio.

## Cuatro definiciones, comparadas

Cuatro textos establecen el alcance para la mayoría de las organizaciones: la definición de la OCDE,
la definición del Reglamento de IA de la UE con la orientación de la Comisión sobre ella, ISO/IEC
22989 y NIST AI 100-1. Son más cercanas de lo que sugieren las jurisdicciones de sus autores, por
diseño, y las diferencias que permanecen son exactamente las que cambian una decisión de alcance.

### La definición de la OCDE (revisión 2023)

El capítulo 22 coloca
[la definición y ciclo de vida de la OCDE](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle)
en los instrumentos más amplios de la OCDE. El Consejo de la OCDE revisó su definición el 8 de
noviembre de 2023, antes de la revisión más amplia de cinco años de los Principios de IA, en parte
para apoyar la alineación con definiciones que entonces se escribían en la UE, Japón y otros lugares
[2][3]. Ahora dice: "Un sistema de IA es un sistema basado en máquinas que, para objetivos
explícitos o implícitos, deduce, de la entrada que recibe, cómo generar salidas tales como
predicciones, contenido, recomendaciones o decisiones que pueden influir en entornos físicos o
virtuales. Los diferentes sistemas de IA varían en sus niveles de autonomía y adaptabilidad después
del despliegue." [3]

Contra el texto de 2019, la revisión hizo cuatro cambios que importan al alcance: eliminó "definido
por humanos" de los objetivos (los objetivos ahora pueden ser implícitos), hizo de la **inferencia**
el acto definitorio, añadió **contenido** como salida (el caso generativo) y añadió
**adaptabilidad** después del despliegue [3]. Su memorándum explicativo (que no es parte de la
Recomendación) lee autonomía como el grado en que un sistema puede "aprender o actuar sin
intervención humana" una vez que las personas han delegado en él, y adaptabilidad como el cambio
continuado de sistemas de aprendizaje automático después del desarrollo inicial, como un reconocedor
de voz adaptándose a una voz [3].

### Artículo 3(1) del Reglamento de IA de la UE y las directrices de la Comisión

El capítulo 18 establece
[la definición legal de un sistema de IA](/bok/eu-ai-act#what-counts-as-an-ai-system) en el alcance
de la Ley. El artículo 3(1) del Reglamento de IA sigue de cerca el texto de la OCDE: «'Sistema de
IA' significa un sistema basado en máquinas que está diseñado para operar con distintos niveles de
autonomía y que puede exhibir adaptabilidad después del despliegue, y que, para objetivos explícitos
o implícitos, deduce, a partir de los datos que recibe, cómo generar resultados tales como
predicciones, contenidos, recomendaciones o decisiones que pueden influir en entornos físicos o
virtuales» [4]. El considerando 12 explica la intención: la definición debe distinguir la IA de
«sistemas de software tradicionales más simples o enfoques de programación» y no debe cubrir
sistemas basados en reglas definidas únicamente por personas físicas para ejecutar operaciones
automáticamente [5]. Las técnicas que permiten la deducción incluyen aprendizaje automático y
«enfoques basados en lógica y conocimiento» [5].

Las directrices de la Comisión sobre la definición la dividen en siete elementos: (1) un sistema
basado en máquinas; (2) diseñado para operar con distintos niveles de autonomía; (3) que puede
exhibir adaptabilidad después del despliegue; (4) para objetivos explícitos o implícitos; (5)
deduce, a partir de los datos que recibe, cómo generar resultados; (6) tales como predicciones,
contenidos, recomendaciones o decisiones; (7) que pueden influir en entornos físicos o virtuales
[1]. Cinco de sus interpretaciones cambian cómo debe funcionar una admisión:

- **La deducción es la condición indispensable**; las directrices la llaman «una condición clave e
  indispensable que distingue los sistemas de IA de otros tipos de sistemas» [1].
- **La autonomía es necesaria pero el umbral es bajo.** Solo se excluyen los sistemas diseñados para
  operar «únicamente con participación e intervención humana manual completa»; un sistema que
  produce un resultado a partir de datos de entrada suministrados manualmente sin que ese resultado
  sea especificado por una persona ya tiene «cierto grado de independencia de acción» [1].
- **La adaptabilidad es opcional.** La palabra «puede» hace que el autoaprendizaje después del
  despliegue sea «una condición facultativa y por tanto no decisiva» [1]. Un modelo congelado sigue
  siendo un sistema de IA.
- **Los objetivos no son la finalidad prevista.** Los objetivos son internos al sistema; la
  finalidad prevista (art. 3(12)) es el contexto externo de uso [1], y el contexto es sobre lo que
  se construye un nivel de riesgo.
- **Los elementos no necesitan estar presentes en ambas fases.** La definición adopta una
  perspectiva del ciclo de vida: algunos elementos pueden aparecer en la fase de construcción y no
  en la fase de uso [1].

Las directrices también nombran cuatro familias que quedan fuera de la definición a pesar de tener
cierta capacidad de deducción: sistemas que mejoran o aceleran la optimización matemática clásica;
**procesamiento básico de datos** (consultas de bases de datos, hojas de cálculo sin funciones de
IA, paneles descriptivos); sistemas basados en **heurísticas clásicas** (un motor de ajedrez que usa
minimax con una función de evaluación escrita a mano); y **sistemas de predicción simples** cuyo
rendimiento una regla estadística básica podría igualar, como una línea de base que siempre predice
la media histórica [1]. Explícitamente afirman que «no es posible una determinación automática ni
listas exhaustivas» y que cada sistema se evalúa según su arquitectura y funcionalidad [1]. Tampoco
son vinculantes; solo el Tribunal de Justicia de la UE puede dar una interpretación autorizada [1].

### ISO/IEC 22989

ISO/IEC 22989:2022 es la norma de terminología sobre la que se construye el resto de la familia
ISO/IEC de IA [6]. Su definición de un sistema de IA (término 3.1.4) es más corta y de forma más
antigua: un sistema ingenierizado cuyos resultados, desde contenidos hasta decisiones, sirven
objetivos que las personas establecen [6]. La deducción y la adaptabilidad no forman parte de ella.
Su contribución más útil para la gobernanza es el vocabulario que los otros textos no tienen. Separa
**automatización**, que varía por grado, de **autonomía**, una propiedad mucho más fuerte que
reserva para sistemas que pueden cambiar su propio objetivo o dominio de uso sin que nadie los
dirija; lo opuesto a la autonomía es **heteronomía**, y la cláusula 5.13 trata los tres juntos [6].
También nombra los roles de las partes interesadas alrededor de un sistema de IA (proveedor,
productor, cliente, socio, sujeto y autoridades relevantes, cláusula 5.19) [6]. Una enmienda sobre
IA generativa (ISO/IEC 22989:2022/FDAmd 1) está en fase de borrador final: su FDIS se registró para
aprobación formal el 18 de septiembre de 2026, y no está publicada a partir de 2026-09-24 [7].

La palabra «autonomía» por tanto significa dos cosas diferentes en los textos. En el Reglamento de
IA y el texto de la OCDE es un grado de independencia de acción, y casi todos los sistemas tienen
algo. En ISO/IEC 22989 es una propiedad fuerte que la mayoría de los sistemas desplegados no tienen.
Un registro que anota «autónomo: sí» no ha anotado nada hasta que dice en cuál de los dos sentidos
lo significa.

### NIST AI 100-1

El Marco de Gestión de Riesgos de IA del NIST (NIST AI 100-1, enero de 2023) «se refiere a un
sistema de IA como un sistema ingenierizado o basado en máquinas que puede, para un conjunto dado de
objetivos, generar resultados tales como predicciones, recomendaciones o decisiones que influyen en
entornos reales o virtuales», diseñado para operar con distintos niveles de autonomía, y afirma que
adapta el texto de la OCDE de 2019 e ISO/IEC 22989 [8]. Es anterior a la revisión de la OCDE, por lo
que no tiene «deduce», no tiene «contenidos» y no tiene adaptabilidad. Su peso para la gobernanza
está en otro lugar: el apéndice B enumera cómo los riesgos de IA difieren de los riesgos del
software tradicional, que es la columna vertebral de la tabla de características más adelante en
este capítulo [8].

### Las definiciones lado a lado

| Elemento | OECD (2023) | Reglamento de IA de la UE art. 3(1) | ISO/IEC 22989:2022 | NIST AI 100-1 (2023) |
|---|---|---|---|---|
| Sustrato | Basado en máquinas | Basado en máquinas | Sistema ingenierizado | Sistema ingenierizado o basado en máquinas |
| Objetivos | Explícitos o implícitos | Explícitos o implícitos | Definidos por personas | «Un conjunto dado de objetivos» |
| Deducción | Acto definitorio | Acto definitorio; indispensable según directrices | No en la definición | No en la definición |
| Resultados | Predicciones, contenidos, recomendaciones, decisiones | Los mismos cuatro | Contenidos, pronósticos, recomendaciones, decisiones | Predicciones, recomendaciones, decisiones |
| Efecto | Entornos físicos o virtuales | Entornos físicos o virtuales | No en la definición | Entornos reales o virtuales |
| Autonomía | Varía según el sistema | Diseñada para distintos niveles; necesaria | La automatización varía; la autonomía es una propiedad fuerte y separada | Distintos niveles |
| Adaptabilidad | Varía según el sistema | «Puede»; no decisiva | No en la definición | No en la definición |

Fuentes: [3][4][1][6][8].

Se derivan dos conclusiones prácticas. Con cualquier exposición a la UE, el texto del Reglamento de
IA leído con las directrices de la Comisión es la prueba operativa, y el texto de la OCDE es su
gemelo en otros lugares. Y las pruebas no son intercambiables: un sistema que el vocabulario de
ISO/IEC 22989 o NIST llamaría IA puede seguir estando en una de las familias excluidas de las
directrices. Anota qué prueba aplicaste.

## Del elemento de definición al campo del registro

Cada elemento de la definición es una pregunta que la admisión hace y un campo que el registro
mantiene. La respuesta al elemento también impulsa una decisión posterior, por lo que el campo se
gana su lugar: un campo que ninguna decisión lee es un campo que nadie mantendrá.

| Elemento | Pregunta de admisión | Campo del registro (ilustrativo) | Decisión de alcance o control que impulsa |
|---|---|---|---|
| Basado en máquinas | ¿Dónde se ejecuta y quién opera el tiempo de ejecución? | `substrate` (`cloud-api`, `self-hosted`, `on-device`, `embedded`) | Qué controles de tiempo de ejecución son posibles (capa 04); si la ruta de seguridad del producto puede aplicarse |
| Objetivos | ¿Qué está optimizando el sistema? | `objective` | Qué medida de eval mide el éxito; dónde pueden esconderse la recompensa hackeada o los objetivos proxy |
| Finalidad prevista | ¿En qué contexto, para quién, se utiliza? | `intended_purpose` | Nivel de riesgo y obligaciones; el disparador de FRIA o DPIA |
| Deducción | ¿Deriva resultados mediante aprendizaje o conocimiento codificado, en lugar de reglas que las personas escribieron? | `inference_technique` (`ml.supervised`, `ml.self-supervised`, `logic-based`, `none` …) | Dentro o fuera de la definición de IA; qué familia excluida, si la hay |
| Resultados | ¿Predicción, contenido, recomendación o decisión? | `output_types` | Contenido: análisis de marcado y divulgación (art. 50); decisión: deberes de explicación y revisión humana (art. 86, RGPD art. 22) |
| Efecto | ¿Cambia un entorno físico o virtual, y a través de qué? | `effect_surface` (`display`, `tools`, `actuator`) | Herramientas: registro de agentes, credenciales limitadas; actuador: detención en estado seguro |
| Autonomía | ¿Qué sucede entre el resultado y el efecto sin una persona? | `autonomy_level` (0–4, abajo) | Diseño de supervisión humana, colocación de puertas, interruptor de parada |
| Adaptabilidad | ¿Puede cambiar el comportamiento en uso sin una versión? | `adapts_in_use`, `change_triggers` | Disparadores de re-evaluación; [monitoreo de desviación](/patterns/drift-fairness-monitor); controles de bucle de retroalimentación (art. 15(4)) |

Fuentes de los ganchos legales: [9][10][11][12].

Dos filas merecen una nota. Los equipos más a menudo colapsan **objetivo** en
**finalidad prevista**. El propio ejemplo de las directrices es un asistente corporativo cuyo
objetivo es responder preguntas sobre un conjunto de documentos con precisión y cuya finalidad
prevista es apoyar las tareas de un departamento [1]. El primero te dice qué evaluar; el segundo te
dice para qué cree la ley que es el sistema. Un modelo sin cambios trasladado a una nueva finalidad
prevista es, para propósitos de riesgo, un nuevo sistema. Y la fila de **resultados** registra el
resultado *tal como se usa*: las directrices notan que una recomendación «aplicada automáticamente»
se convierte en una decisión [1], por lo que un modelo que recomienda más un pipeline que aprueba
automáticamente es, en conjunto, un sistema de decisión.

Un campo de autonomía necesita una escala. No hay una estándar; la escala abajo es ilustrativa y se
asigna al vocabulario de supervisión del Grupo de Expertos de Alto Nivel de la UE (persona en el
bucle, persona sobre el bucle, persona al mando) [13].

| Nivel | Nombre | Qué sucede entre el resultado y el efecto | Modo de supervisión |
|---|---|---|---|
| 0 | Asesor | Una persona lee el resultado y decide | Persona al mando |
| 1 | Asistido | El sistema redacta; una persona aprueba cada acción | Persona en el bucle |
| 2 | Acción limitada | El sistema actúa dentro de un alcance declarado; las acciones consecuentes pasan una puerta | En el bucle para acciones con puerta |
| 3 | Autonomía supervisada | El sistema actúa; las personas monitorean y pueden detenerlo | Persona sobre el bucle |
| 4 | Sin supervisión | El sistema actúa sin supervisión rutinaria | Ninguna rutinaria; solo interruptor de parada |

> **Ejemplo (ilustrativo)**
> Los campos de alcance de `csa-01`, el asistente de servicio al cliente utilizado en todo este
> libro, tal como su entrada de registro los registra. La decisión definitoria y el nivel de riesgo
> son registros separados.

```yaml
id: csa-01
definition_basis: eu-ai-act-art-3-1+commission-guidelines
definition_decision: in_scope        # in_scope | out_of_scope | undecided
definition_reason: "LLM infers replies from customer messages; generates content and
  recommendations; calls tools. Not basic data processing or classical heuristics."
decided_by: intake-pipeline + ai-governance-review
decided_on: 2026-09-18
substrate: cloud-api
objective: "answer order and refund questions accurately from the knowledge base"
intended_purpose: "first-line support for retail customers in the EU"
inference_technique: [ml.self-supervised, ml.rlhf, retrieval]
output_types: [content, recommendation]
effect_surface: tools
tools: [refunds:read, orders:read]
autonomy_level: 2
adapts_in_use: false
change_triggers: [vendor-model-version, prompt-change, corpus-snapshot]
kind: [generative, rag, agentic]
```

Las decisiones fuera del alcance importan tanto como las dentro del alcance. Un motor de reglas de
elegibilidad de reembolso cuya rama cada persona escribió también obtiene una entrada de registro,
marcada `out_of_scope` con la razón («procesamiento básico de datos; reglas definidas únicamente por
personas»). Esa entrada es lo que te permite mostrar a un auditor que miraste, y lo que hace que un
cambio posterior (alguien añade una puntuación de fraude aprendida al motor) sea visible como un
diff.

## IA versus software convencional

La línea entre IA y software convencional es la línea entre comportamiento que alguien especificó y
comportamiento que alguien indujo. El Considerando 12 la traza en el mismo lugar: las reglas
definidas únicamente por personas no son IA; la inferencia a partir de datos o de conocimiento
codificado es [5]. Para la gobernanza, la diferencia no es filosófica. Cada fila a continuación es
un control que la gobernanza de TI clásica ejecuta y que deja de funcionar.

| Propiedad | Software determinista convencional | Sistema de IA | Consecuencia para la gobernanza |
|---|---|---|---|
| De dónde procede el comportamiento | Reglas escritas por personas | Aprendidas a partir de datos o inferidas a partir de conocimiento codificado | Revisa los datos y las evals, no solo el código |
| Misma entrada, misma salida | Sí, por construcción | No garantizado; la generación puede variar incluso a temperatura cero [14] | La evidencia fija la versión y la configuración de muestreo; las evals se repiten |
| Qué significa "correcto" | Coincide con una especificación | Cumple una tasa de error en una distribución | Los umbrales reemplazan aprobado/reprobado; los umbrales necesitan propietarios |
| Cómo se prueba | Pruebas unitarias e integración contra la especificación | Evals sobre muestras; la cobertura es estadística | El conjunto de evals es en sí mismo un artefacto gobernado |
| Qué cambia el comportamiento | Un diff de código | Un diff de código, pesos nuevos, datos nuevos, una edición de prompt, una actualización de corpus, una actualización de proveedor | La gestión de cambios se activa en todos ellos |
| Cómo falla | Un bug reproducible | Un modo de fallo que aparece en algunas entradas, a veces, a escala | Monitorea tasas en producción, no solo incidentes |
| Cómo lo explicas | Lee el código | Los internos no son legibles para humanos | Las explicaciones se producen, registran y prueban |

Dos advertencias mantienen la tabla honesta. Primero, el límite es tanto legal como técnico, y la
ley lo traza con cierta falta de precisión: un sistema experto basado en lógica que infiere
conclusiones a partir de conocimiento médico codificado está dentro de la definición de la Ley de
IA, mientras que un motor de ajedrez heurístico está fuera [1]. Registra el razonamiento, porque el
próximo revisor trazará la línea de nuevo. Segundo, "no es IA" no es "no está gobernado". La
automatización determinista puede causar daño a escala por sí sola, y la ley de protección de datos
da a las personas el derecho a no estar sujetas a una decisión "basada únicamente en el tratamiento
automatizado" con efectos legales o igualmente significativos, independientemente de si se cumple
alguna definición de IA [11]. La decisión definitoria encamina un sistema a los controles
específicos de IA; no exime nada más (véase
[Privacy and AI](/bok/privacy-and-ai#principles-applied-to-ai)).

> **Nota**
> Un **modelo** no es un **sistema**, y tampoco lo es un **agente**. La Ley de IA define el sistema
> de IA (Art. 3(1)) y, por separado, el modelo de IA de uso general (Art. 3(63)) y el sistema de IA
> de uso general construido sobre uno (Art. 3(66)) [4]. El registro mantiene ambos niveles y los
> vincula: un modelo puede estar dentro de muchos sistemas, y cada uno de los
> [cinco objetos de gobernanza](/bok/definition#the-object-of-governance) del capítulo 01 necesita
> su propia entrada.

## Tipos de IA que cambian el problema de gobernanza

Las taxonomías de IA son abundantes. La prueba aplicada aquí es estrecha: ¿saber el tipo cambia un
control, un propietario o la evidencia? Donde no lo hace, la taxonomía se menciona y se deja de
lado.

### Por capacidad y por funcionalidad

La escala de capacidades (IA estrecha, inteligencia artificial general, superinteligencia) es la más
citada y la menos útil para controles. Cada sistema desplegado es estrecho en el sentido que
importa; no hay una definición acordada de inteligencia general, y las propuestas de investigación
para operacionalizarla lo hacen a través de niveles de desempeño, generalidad y autonomía en lugar
de un único umbral [15]. La ley ha eludido la cuestión con proxies que puede medir. La Ley de IA
regula el **modelo de IA de uso general**, uno que "muestra una generalidad significativa" y es
"capaz de realizar competentemente una amplia gama de tareas distintas", incluidos los modelos
entrenados en datos grandes "usando autosupervisión a escala" [4], y presume "capacidades de gran
impacto" cuando el cálculo de entrenamiento supera 10^25 operaciones de punto flotante [16]. Las
directrices de GPAI de la Comisión añaden un criterio indicativo para el estado de uso general en
sí: cálculo de entrenamiento por encima de 10^23 FLOP y la capacidad de generar lenguaje, texto a
imagen o texto a vídeo [17]. Para el registro, la capacidad se convierte por lo tanto en dos campos
medibles, `model_generality` y `training_compute_flop`, ambos generalmente tomados de la
documentación del proveedor en lugar de medidos internamente.

La taxonomía de funcionalidad (máquinas reactivas, memoria limitada, teoría de la mente,
autoconciencia) proviene de un artículo popular de 2016 [18]. Solo los dos primeros describen
sistemas que existen, y ninguno se asigna a un control; reconócelo, pero no lo hagas un campo del
registro.

### Por paradigma de aprendizaje

El paradigma de aprendizaje te dice de dónde vino el comportamiento, y por lo tanto de dónde debe
venir su evidencia.

| Paradigma | Cómo aprende | Peligro de gobernanza que añade | Control que lo responde |
|---|---|---|---|
| Supervisado | A partir de ejemplos etiquetados | Las etiquetas codifican decisiones humanas pasadas, sus errores y su sesgo; proxies para características protegidas | Procedencia de etiquetas en la ficha de datos; evals de subgrupo en la puerta de eval |
| Sin supervisión | Encuentra estructura sin etiquetas (clusters, anomalías) | Sin verdad fundamental para probar; los segmentos pueden rastrear características protegidas | Pruebas de estabilidad; revisión humana de definiciones de segmentos antes del uso |
| Semisupervisado | Propaga pocas etiquetas en datos sin etiquetar | Los errores de etiqueta se propagan silenciosamente | Audita una muestra de etiquetas propagadas |
| Autosupervisado | Predice partes de su propia entrada (el siguiente token) en grandes corpus | La procedencia del corpus, los derechos y la memorización son difíciles de rastrear | AIBOM con procedencia del conjunto de datos; el resumen de contenido de entrenamiento de GPAI (véase [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Refuerzo, incluido el de retroalimentación humana | Maximiza una señal de recompensa | **Recompensa hackeada**: el sistema encuentra una forma no intencionada de puntuar [19] | Registra la recompensa como `objective`; evals que buscan estrategias no intencionadas |
| En contexto (cero y pocos disparos) | Sigue instrucciones y ejemplos en el prompt en tiempo de inferencia | El comportamiento cambia con una edición de prompt, sin reentrenamiento involucrado | Prompts versionados como artefactos gobernados; puerta de eval en cambio de prompt |

### Por familia de tecnología

| Familia | Ejemplo | Qué cambia para la gobernanza |
|---|---|---|
| Aprendizaje automático clásico | Puntuación de crédito potenciada por gradiente en datos tabulares | La calibración y el error de subgrupo dominan el conjunto de evals |
| Aprendizaje profundo | Clasificador de imágenes | Opacidad; entradas adversariales; costo de cálculo y evidencia más pesado |
| Procesamiento del lenguaje natural | Triaje de quejas; asistentes LLM | El texto lleva datos personales y, para LLMs, instrucciones que un atacante puede plantar |
| Visión por computadora | Reconocimiento de documentos o caras | Los datos biométricos plantean preguntas de categorías especiales y prácticas prohibidas (véase [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Voz | Transcripción de llamadas; síntesis de voz | La voz es datos personales; el audio sintético debe estar marcado (Art. 50) [9] |
| Robótica y ciber-física | Robot de almacén | Efecto físico: la parada debe llevar el sistema a un estado seguro (Art. 14(4)(e)) [20] |
| Basada en lógica y conocimiento | Sistema experto para apoyo al diagnóstico | Dentro de la definición de la Ley de IA cuando infiere a partir de conocimiento codificado [1]; "solo son reglas" no es una exención |

### Predictivo versus generativo

Un sistema **predictivo** (o discriminativo) produce una estimación sobre algo que existe: una
puntuación, una clase, un pronóstico. Sus daños son daños de asignación (una estimación incorrecta o
sesgada pone a una persona en la cola equivocada), y su evidencia es exactitud, calibración y tasas
de error por subgrupo.

Un sistema **generativo** produce algo nuevo: texto, imagen, audio, vídeo, código. Sus daños son
diferentes en naturaleza. El perfil de IA generativa de NIST enumera doce riesgos que la IA
generativa crea o empeora, entre ellos **confabulación** ("la producción de contenido erróneo o
falso afirmado con confianza"), integridad de la información, propiedad intelectual, privacidad de
datos, sesgo dañino y homogeneización, y contenido obsceno o abusivo incluido material de abuso
sexual infantil sintético [21]. La evidencia cambia en consecuencia: evals de fundamentación y
rechazo, red teaming, guardrails de salida y, bajo la Ley de IA, marcado legible por máquina de
salida sintética [9]. Un conjunto de control no se ajusta a ambos: un umbral de calibración no
significa nada para texto generado, y un eval de fundamentación nada para una puntuación de crédito.

### Modelos fundacionales y GPAI

Un **modelo fundacional** es uno "entrenado en datos amplios a escala" y "adaptable a una amplia
gama de tareas posteriores" [22]. El hecho de gobernanza sobre los modelos fundacionales es la
herencia: en palabras del artículo original, "los defectos del modelo fundacional son heredados por
todos los modelos adaptados posteriores" [22]. La mayoría de las organizaciones llaman a uno a
través de una API o adaptan uno de peso abierto, por lo que la evidencia se mueve de producida a
recopilada: la ficha de modelo del proveedor y las evaluaciones se convierten en entradas a tu
entrada de registro, y la versión que fijas se convierte en un cambio que gestionas (véase
[Third-party and procured AI](/bok/the-stack#third-party-and-procured-ai) y
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)). GPAI es la
categoría legal más cercana de la Ley de IA, con sus propios deberes en el proveedor del modelo
(véase [GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice)).

### LLMs y SLMs

Un **modelo de lenguaje grande (LLM)** es un modelo fundacional para lenguaje, generalmente servido
desde un centro de datos. Un **modelo de lenguaje pequeño (SLM)** intercambia amplitud por tamaño
para que pueda ejecutarse cerca del usuario; un informe técnico de 2024 describe un modelo de 3.8
mil millones de parámetros "lo suficientemente pequeño para ser desplegado en un teléfono" [23]. La
diferencia de gobernanza es dónde viven los controles. Un LLM detrás de una API se sienta detrás de
una puerta que controlas, donde cada llamada puede ser rastreada, filtrada y detenida. Un SLM en un
dispositivo se ejecuta donde tu telemetría puede no llegar: sus guardrails se envían con él, su
inventario es una flota de dispositivos y su kill switch es una bandera remota o una actualización
de aplicación, con el retraso que eso implica.

### Modelos multimodales

Un modelo **multimodal** toma o produce más de una modalidad (texto, imagen, audio, vídeo). Las
imágenes y el audio pueden llevar datos personales que la tubería de texto nunca vio e instrucciones
que los filtros de texto nunca escanearon, e imágenes, audio y vídeo sintéticos plantean los deberes
de marcado del Artículo 50 [9]. Así que los guardrails existen por modalidad, y el conjunto de evals
incluye casos multimodales.

### Sistemas RAG

**Generación aumentada por recuperación (RAG)** combina la memoria aprendida ("paramétrica") de un
modelo con un almacén recuperable ("no paramétrico") de documentos, originalmente un índice de
vectores densos [24]. Sus autores ya nombraron la procedencia como un problema abierto [24]. Para la
gobernanza, el corpus se convierte en comportamiento: cambia los documentos y las respuestas cambian
sin cambio de modelo. Así que el corpus se gobierna como un modelo, versionado y ficheado, su
instantánea vinculada a la eval que lo probó (ver
[gobernanza de datos en todo el stack](/bok/the-stack#data-governance-across-the-stack)). La
recuperación también necesita una comprobación de derechos: un sistema RAG que recupera un documento
que el usuario no puede ver lo ha filtrado, por muy educada que sea la respuesta.

### Sistemas agentes

Un **sistema agente** planifica y actúa: llama herramientas, navega, ejecuta código y mueve datos
bajo autoridad delegada, a menudo en muchos pasos. Cambia el problema de gobernanza más, porque su
salida es un efecto en un sistema de registros, no una recomendación que una persona lee. Las
amenazas están catalogadas en el OWASP Top 10 for Agentic Applications [25], y los controles son el
conjunto de la capa 04: identidad, alcance, mediación de herramientas, puertas humanas y una parada
probada ([Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials),
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker),
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)). El tratamiento completo está en
[Governing agents](/bok/governing-agents#what-makes-an-agent-a-governance-object).

### Por qué el tipo importa: el conjunto de controles por tipo

| Tipo | Daño distintivo | Control que cambia | Capa · patrón |
|---|---|---|---|
| Predictivo o puntuación | Asignación errónea o sesgada | Evals de calibración y subgrupo; una política de umbral con propietario | 03 · [Eval Gate in CI](/patterns/eval-gate-in-ci); 01 · [Policy Card](/patterns/policy-card) |
| Generativo | Confabulación, PI, integridad de información, contenido abusivo | Evals de fundamentación y red-team; guardrails de salida; marcado de contenido | 03 · [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite); 04 · [Runtime Guardrail](/patterns/runtime-guardrail) |
| Modelo de fundación o GPAI, adquirido | Defectos heredados; evidencia que no puedes producir | Diligencia debida; fijación de versión; modelo base en el AIBOM | 02 · [AIBOM](/patterns/aibom); Vendor / Model Due-Diligence Gate |
| SLM en dispositivo | Sin telemetría central; retraso de actualización | Guardrails enviados con el modelo; inventario de versión a nivel de dispositivo | 02 · [Agent Registry](/patterns/agent-registry); 04 · Kill Switch |
| Multimodal | Nuevos canales de inyección y datos personales | Guardrails por modalidad; evals multimodales; marcado | 04 · Runtime Guardrail; 03 · Red-Team Suite |
| RAG | Cambios de corpus el comportamiento; recuperación filtra | Corpus como datos gobernados; comprobación de derechos en recuperación; evals de fundamentación | 02 · ficha de datos; 04 · Runtime Guardrail |
| Agente | Acciones bajo autoridad delegada | Identidad, alcance, puertas humanas, parada probada | 04 · Agent Identity & Scoped Credentials; Kill Switch; Human-in-the-loop Gate |

Los tipos se combinan. `csa-01` es generativo, aumentado por recuperación y agente a la vez, así que
lleva todos los controles de las tres filas; el campo `kind` del registro es una lista, no un valor
único.

## Ocho características que rompen la gobernanza clásica de TI

La gobernanza clásica de TI (gestión de cambios, puertas SDLC, control de acceso, el sistema de
gestión de seguridad, auditoría periódica) asume que el comportamiento está especificado, un cambio
es un diff de código, una prueba pasa o falla contra una especificación, una persona está detrás de
cada acción consecuente y el sistema hace hoy lo que hizo ayer. La IA rompe cada suposición en algún
lugar. El Apéndice B de NIST enumera las formas en que el riesgo de IA difiere del riesgo de
software tradicional, desde datos que pueden no representar el contexto de uso, pasando por la
escala y complejidad con "miles de millones o incluso billones de puntos de decisión", hasta "mayor
opacidad", deriva que exige mantenimiento más frecuente e "incapacidad para predecir o detectar los
efectos secundarios de sistemas basados en IA más allá de medidas estadísticas" [8]. La tabla
convierte esa lista en las ocho características que un ingeniero tiene que diseñar.

| Característica | Por qué la gobernanza clásica de TI falla | Qué lo responde (capa · patrón) | Evidencia que emite |
|---|---|---|---|
| **Complejidad** | La CMDB registra la aplicación; el modelo, conjuntos de datos, prompts, corpus de recuperación y gráfico de herramientas dentro de ella son invisibles | 02 · AIBOM, Agent Registry | Un AIBOM por compilación; registro vincula de sistema a modelo a datos |
| **Opacidad** | La revisión de código asume que la lógica es legible; los internos del modelo no lo son | 03 · evals conductuales; 02 · [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Resultados de eval contra modos de fallo nombrados; explicaciones registradas |
| **Autonomía** | El control de acceso y la segregación de funciones asumen una persona detrás de cada sesión | 04 · Agent Identity & Scoped Credentials; Human-in-the-loop Gate; Kill Switch | Eventos de identidad; decisiones de puerta con aprobador; registros de prueba de parada de emergencia |
| **Velocidad y escala** | La revisión periódica basada en muestras llega después de que un error se ha repetido un millón de veces | 04 · Runtime Guardrail, Kill Switch / Circuit Breaker; 05 · [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Decisiones de guardrail; disparo de disyuntor; registros de reversión |
| **Salidas probabilísticas** | Las pruebas son pasa/falla contra una especificación; una única respuesta errónea es un error | 03 · Eval Gate in CI con umbrales; 01 · Policy Card por nivel de riesgo | Resultados de calibración y umbral por versión |
| **Dependencia de datos** | La gobernanza de datos protege los datos como registros, no como la fuente del comportamiento | 02 · data card y linaje; 03 · pruebas de calidad de datos y subgrupo | Data card; registro de linaje; resultados de prueba archivados contra la versión del conjunto de datos |
| **Uso dual y abuso** | Los modelos de amenaza se centran en acceso no autorizado, no en uso autorizado para un fin dañino | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail; 01 · uso aceptable como código | Hallazgos de red-team; detecciones de abuso; veredictos de política |
| **Adaptabilidad y deriva** | La gestión de cambios se activa en despliegues de código; el comportamiento cambia sin uno | 05 · Continuous Assurance Telemetry; 03 · vuelve a ejecutar la puerta en cambio de modelo, datos o prompt | Alertas de deriva contra la línea base de eval; resultados de re-evaluación |

Algunas filas necesitan más que una celda.

**La opacidad tiene tres fuentes, y cada una tiene una solución diferente.** Burrell distingue la
opacidad como secreto corporativo o estatal intencional, opacidad como analfabetismo técnico, y
opacidad "que surge de las características de los algoritmos de aprendizaje automático y la escala
requerida para aplicarlos útilmente" [26]. El secreto se responde con contrato y divulgación
(documentación del proveedor, derechos de auditoría); el analfabetismo por alfabetización y por
explicaciones escritas para su lector; solo el tercero necesita métodos de explicación técnica y,
sobre todo, evidencia conductual. Cuando no puedes leer el mecanismo, pruebas el comportamiento, y
el resultado de eval se convierte en la evidencia que se mantiene en lugar de inspección. Las
técnicas de explicación en sí se cubren en
[Fairness and explainability](/bok/fairness-and-explainability#explanation-techniques).

**El uso dual es una propiedad de la capacidad, no de la intención.** Los investigadores que
invirtieron el objetivo de un modelo de toxicidad de descubrimiento de fármacos, recompensando la
toxicidad en lugar de penalizarla, informan que generó aproximadamente 40.000 moléculas tóxicas
candidatas en menos de seis horas, incluidos agentes nerviosos conocidos [27]. Nada fue violado; un
usuario autorizado cambió un objetivo. Por eso el abuso necesita su propio modelo de amenaza, casos
de red-team para usos dañinos de capacidad legítima, y detección en tiempo de ejecución, no solo
seguridad perimetral.

**La velocidad y escala convierten una pequeña tasa de error en daño masivo.** Una tasa de error del
1% es un error de redondeo en una revisión trimestral y diez mil decisiones erróneas al día en un
sistema que toma un millón. Así que las respuestas se sientan en tiempo de ejecución: un guardrail
por llamada, un disyuntor que se dispara en una tasa, una reversión probada antes de que sea
necesaria.

**La adaptabilidad es más amplia que el autoaprendizaje.** Para sistemas que siguen aprendiendo en
uso, la Reglamento de IA pide diseños que reduzcan el riesgo de salidas sesgadas que se realimenten
en futuras entradas ("bucles de retroalimentación") [12]. Pero la mayoría de los cambios de
comportamiento llegan sin autoaprendizaje: un proveedor actualiza el modelo detrás de una API, las
entradas derivan, un prompt se edita, un corpus se actualiza. El reentrenamiento también puede
romper lo que funcionaba: las redes neuronales son propensas al **olvido catastrófico**, perdiendo
competencia anterior cuando se entrenan en nuevas tareas [28]. Cada uno es un evento de cambio, y la
puerta de eval se ejecuta en cada uno.

### Pares de contraste

Cuatro pares se confunden lo suficientemente a menudo en revisiones como para valer la pena corregir
en el vocabulario del equipo.

| Par | La diferencia | Por qué importa para los controles |
|---|---|---|
| **Complejidad** y **opacidad** | Cuántas partes interactúan, contra si una persona puede seguir el razonamiento; una pequeña red neuronal es simple y opaca | La complejidad necesita un inventario; la opacidad necesita evals |
| **Transparencia**, **explicabilidad**, **interpretabilidad** | En el marco de NIST responden "qué pasó", "cómo" se tomó una decisión y "por qué", con su significado para el usuario [8] | Tres artefactos: registros de lo que se ejecutó, un método de explicación, un mensaje en el que el usuario puede actuar |
| **Deriva de datos** y **deriva de concepto** | Las entradas cambian, contra la relación entre entradas y la respuesta correcta cambia | La primera se muestra en las entradas; la segunda solo en resultados |
| **Privacidad** y **seguridad** | Si el procesamiento de datos personales es apropiado, contra si el sistema resiste el ataque | Un sistema seguro aún puede procesar datos que no tiene derecho a procesar |

## Gobernanza de salidas probabilísticas

El software convencional devuelve una respuesta. La mayoría de la IA devuelve una estimación o una
muestra, y alguien tiene que decidir qué hacer con ella. Esa decisión se deja más a menudo a un
valor predeterminado de un científico de datos, y es donde la ingeniería añade más.

### Una puntuación no es una decisión

Un modelo predictivo emite una puntuación. Una decisión es una puntuación, más un umbral, más una
acción tomada cuando la puntuación lo cruza. El umbral es donde el apetito de riesgo se convierte en
comportamiento, así que es una decisión de política con propietario, versión y fecha efectiva, no un
hiperparámetro dejado en 0,5. Escríbelo como una regla de [Policy Card](/patterns/policy-card),
pruébalo en la puerta de eval y regístralo con cada decisión que produce. Cuando un auditor pregunta
por qué se rechazó un solicitante, "la puntuación fue 0,41 y el umbral, propiedad de riesgo de
crédito y efectivo desde el 1 de octubre, fue 0,45" es una respuesta; "el modelo dijo que no" no lo
es.

### Calibración antes de umbrales

Un umbral solo significa algo si la puntuación lo hace. Un modelo **calibrado** de 0,9 es correcto
aproximadamente nueve de cada diez veces. Un estudio ampliamente citado encontró que las redes
neuronales modernas, a diferencia de las de hace una década, están mal calibradas, y que una
solución simple post-hoc (escalado de temperatura) es sorprendentemente efectiva [29]. Así que la
calibración pertenece a la suite de eval como una propiedad medida con su propio umbral (un límite
de error de calibración esperado, por versión y por subgrupo), re-verificado cuando el modelo o la
población cambian. La Reglamento de IA ya apunta en esta dirección para sistemas de alto riesgo: los
niveles de precisión y "las métricas de precisión relevantes" tienen que ser declarados en las
instrucciones de uso [12]. Las métricas declaradas se convierten en la línea base contra la que se
compara la telemetría en tiempo de ejecución.

Cuando una única puntuación no es suficiente, la **predicción conforme** ofrece una alternativa
disciplinada: convierte la salida de cualquier modelo entrenado en un conjunto de respuestas
candidatas "garantizado que contiene la verdad fundamental con una probabilidad especificada por el
usuario", sin suposiciones sobre la distribución de los datos [30]. Un conjunto grande es el modelo
diciendo que no está seguro, que es exactamente la señal en la que una regla de gobernanza puede
basarse para actuar.

### Certeza requerida por nivel de riesgo

La certeza que una decisión necesita depende de lo que cuesta equivocarse, así que la regla en
tiempo de ejecución se establece por nivel de riesgo. Tres movimientos se repiten. Una
**banda de abstención** encamina puntuaciones que no son claramente positivas ni claramente
negativas a una persona a través de una [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
Una **regla de resultado adverso** envía a revisión cada decisión que daña al sujeto, sin importar
la confianza del modelo. Una **regla de fuera de distribución** rechaza o escala entradas diferentes
a cualquier cosa en la que el sistema fue probado, porque una puntuación confiada en una entrada
desconocida es la salida menos confiable que produce un modelo.

| Nivel de riesgo (ilustrativo) | Regla en tiempo de ejecución | Evidencia requerida por versión | Rol humano |
|---|---|---|---|
| Bajo (ranking de búsqueda interna) | Actuar sobre la salida superior | Precisión agregada en un conjunto de oro | Revisión periódica |
| Moderado (asistente orientado al cliente) | Actuar; abstenerse y ceder cuando la fundamentación o la confianza cae por debajo de un piso | Evals de fundamentación, rechazo y cesión | En el bucle: monitorear y detener |
| Alto (decisiones sobre el acceso de las personas a empleos, crédito o servicios) | Recomendar solo por encima de un umbral calibrado; banda de abstención y cada resultado adverso a un revisor | Calibración y tasas de error de subgrupo; métricas de precisión declaradas | En el bucle para la banda y resultados adversos; explicación bajo solicitud |
| No debe ser automatizado | Sin acción automática; salida consultiva como máximo, o el uso está bloqueado | Un veredicto de política | En comando |

El rol humano es en sí mismo un control que puede degradarse. La supervisión bajo carga se convierte
en un sello de goma, y la Ley de IA pide que las personas que supervisen sistemas de alto riesgo
sean conscientes del "sesgo de automatización", la tendencia a confiar excesivamente en la salida
[20]. Así que la puerta registra el aprobador, el tiempo para decidir y la tasa de anulación, y una
tasa de anulación decreciente se investiga, no se celebra (ver
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

> **Ejemplo (ilustrativo)**
> Una política de umbral para un modelo de clasificación de préstamos, escrita como una regla de
> Policy Card. Los números son ilustrativos; el punto es que cada uno tiene un propietario y una
> fecha efectiva y se prueba en la puerta.

```json
{ "policy_id": "decision-threshold.loan-triage.v3", "subject": "loan-triage-02",
  "risk_tier": "high", "owner": "credit-risk-product", "effective": "2026-10-01",
  "auto_approve_if": "calibrated_score >= 0.92",
  "review_band": [0.55, 0.92], "review_route": "hitl-gate.credit-review",
  "adverse_outcome": "always-human-review",
  "out_of_distribution": "escalate",
  "release_requires": ["calibration.ece <= 0.03", "subgroup.fnr_gap <= 0.02"] }
```

### Salidas generativas y no determinismo

Los sistemas generativos no tienen una única puntuación para establecer un umbral. Los controles se
mueven a propiedades de la salida: fundamentada en sus fuentes, citada, rechazada cuando debe serlo,
consistente entre muestras. La consistencia no puede asumirse. Un laboratorio reporta que enviar el
mismo prompt 1.000 veces a un modelo grande a temperatura cero produjo 80 finalizaciones distintas,
y rastrea la variación al batching de la pila de servicio en lugar del muestreo [14]. Así que la
evidencia registra la versión del modelo, los parámetros de muestreo y, donde la pila lo permite, la
semilla; y una eval que importa se ejecuta en varias muestras e informa una tasa, no un único pase.

## Conjuntos de principios de IA responsable, ingenierizados

En este libro, **principio** tiene un significado de casa: una de las seis reglas de método en
[capítulo 03](/bok/values-and-principles#the-six-principles), expresada como algo que hacemos. Los
textos de IA responsable publicados usan la palabra para un objetivo normativo, una propiedad que la
IA debería tener. Esta sección mantiene los dos separados. Llama a los publicados
**conjuntos de principios**, los trata como marcos de otras personas (en la
[desambiguación](/bok/definition#the-disambiguation-cluster) del capítulo 01, la ética establece el
objetivo; la ingeniería lo alcanza y lo prueba) y hace una pregunta de cada uno: qué artefacto lo
evidencia, de qué capa, bajo qué valor de casa y principio. Los conjuntos como marcos se tratan en
profundidad en
[Principles and standards](/bok/principles-and-standards#the-instruments-at-a-glance).

### Cuatro conjuntos de principios en breve

**Principios de IA de la OCDE.** Adoptados el 22 de mayo de 2019, con la definición revisada el 8 de
noviembre de 2023 y los principios el 3 de mayo de 2024, la Recomendación establece cinco principios
basados en valores: crecimiento inclusivo, desarrollo sostenible y bienestar; derechos humanos y
valores democráticos, incluyendo equidad y privacidad; transparencia y explicabilidad; robustez,
seguridad y seguridad; y responsabilidad [2]. La revisión de 2024 añadió puntos en los que un
ingeniero puede actuar directamente: mecanismos para que los sistemas de IA que "riesgo de causar
daño indebido o exhibir comportamiento no deseado" puedan ser "anulados, reparados y/o desmantelados
de forma segura"; atención al mal uso y usos fuera del propósito previsto; integridad de la
información; y una referencia explícita a la sostenibilidad ambiental [2].

**Recomendación de la UNESCO sobre la Ética de la IA.** Adoptada por los 193 estados miembros de la
UNESCO en noviembre de 2021, establece cuatro valores centrales (derechos humanos y dignidad;
sociedades pacíficas, justas e interconectadas; diversidad e inclusividad; florecimiento del medio
ambiente y los ecosistemas) y diez principios, desde la proporcionalidad y no causar daño hasta la
equidad y la no discriminación [31]. Su herramienta de Evaluación de Impacto Ético, dirigida primero
a los compradores de sistemas de IA, evalúa un sistema específico antes y después del despliegue
[32].

**Grupo de Expertos de Alto Nivel de la UE (HLEG).** Las Directrices de Ética para la IA de
Confianza (8 de abril de 2019) descansan en cuatro principios éticos (respeto por la autonomía
humana, prevención del daño, equidad, explicabilidad) y establecen siete requisitos: agencia humana
y supervisión; robustez técnica y seguridad; privacidad y gobernanza de datos; transparencia;
diversidad, no discriminación y equidad; bienestar societal y ambiental; y responsabilidad [13]. La
Lista de Evaluación para la IA de Confianza (ALTAI, 17 de julio de 2020) convierte los siete en una
lista de verificación de autoevaluación [33], y el Considerando 27 de la Ley de IA apunta de nuevo a
los mismos siete como principios no vinculantes que complementan la Ley [34].

**Proceso de Hiroshima del G7.** Los Principios Rectores Internacionales para Organizaciones que
Desarrollan Sistemas de IA Avanzada (30 de octubre de 2023), con un Código de Conducta
complementario, se basan en los principios de la OCDE para modelos avanzados y de fundación [35].
Sus once principios son operacionales en lugar de éticos: medidas de riesgo del ciclo de vida
incluyendo red-teaming, monitoreo posterior al despliegue, reporte público de capacidades y
limitaciones, intercambio de información de incidentes, políticas de gobernanza, controles de
seguridad, procedencia de contenido, investigación, desafíos globales, estándares, y protecciones de
entrada de datos e IP [36]. Desde febrero de 2025, la OCDE ejecuta un marco de reporte voluntario
contra el Código de Conducta [37].

### Donde los conjuntos están de acuerdo

Los cuatro conjuntos están en desacuerdo sobre el énfasis y de acuerdo sobre la sustancia. La tabla
cruza los siete principios que comparten con donde cada conjunto los establece.

| Principio compartido | OECD (2024) | UNESCO (2021) | EU HLEG (2019) | G7 Hiroshima (2023) |
|---|---|---|---|---|
| Equidad y no discriminación | 1.2 (equidad, no discriminación) | Equidad y no discriminación | Req. 5 diversidad, no discriminación y equidad | Preámbulo; 11 (calidad de datos contra sesgo dañino) |
| Seguridad y confiabilidad | 1.4 (robusto, seguro; anular, reparar, desmantelar) | Proporcionalidad y no causar daño; seguridad y seguridad | Req. 2 robustez técnica y seguridad | 1 (medidas de riesgo del ciclo de vida); 2 (monitoreo posterior al despliegue) |
| Privacidad y seguridad | 1.2 (privacidad, protección de datos); 1.4 (seguridad) | Derecho a la privacidad y protección de datos; seguridad y seguridad | Req. 3 privacidad y gobernanza de datos | 6 (controles de seguridad); 11 (datos personales, IP) |
| Transparencia y explicabilidad | 1.3 (incl. información para cuestionar una salida) | Transparencia y explicabilidad | Req. 4 transparencia | 3 (reporte público); 7 (procedencia de contenido) |
| Responsabilidad | 1.5 (trazabilidad; gestión sistemática de riesgos) | Responsabilidad y responsabilidad | Req. 7 responsabilidad | 4 (intercambio de incidentes); 5 (políticas de gobernanza) |
| Centricidad humana, incl. accesibilidad e inclusión | 1.1 (crecimiento inclusivo); 1.2 (agencia humana y supervisión) | Supervisión y determinación humana; conciencia y alfabetización; diversidad e inclusividad | Req. 1 agencia humana y supervisión; Req. 5 (accesibilidad y diseño universal) | Preámbulo (centricidad humana) |
| Sostenibilidad | 1.1 (sostenibilidad ambiental) | Sostenibilidad; florecimiento del medio ambiente y los ecosistemas | Req. 6 bienestar societal y ambiental | 9 (crisis climática y otros desafíos globales) |

Fuentes: [2][31][13][36].

### Del principio al artefacto

Un principio se aplica cuando ha sido trazado a un daño nombrado, un control que muerde, una métrica
que se mueve y un registro de evidencia que alguien puede consultar. Eso es el
"[empezar desde un modo de fallo nombrado o un daño nombrado](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)"
del capítulo 03 aplicado a los objetivos de otras personas. La tabla da, para cada principio
compartido, los valores de casa ([capítulo 03](/bok/values-and-principles#the-eight-values)) y los
principios de casa que lo ingenieran y el artefacto que lo evidencia. Es un mapa inicial, no una
afirmación de que ningún artefacto satisface un principio.

| Principio compartido | Valores de casa | Principios de casa | Artefacto que lo evidencia | Capa · patrón |
|---|---|---|---|---|
| Equidad | 2 evals fallan construcciones; 7 reducción real del riesgo | Empezar desde un daño nombrado; dar a cada control dientes | Resultados de eval de subgrupo contra un umbral declarado; ficha de datos con notas de representatividad; FRIA | 03 · Eval Gate in CI; 01 · [FRIA-as-Code](/patterns/fria-as-code) |
| Seguridad y confiabilidad | 2; 3 evidencia del tiempo de ejecución | Construir en el punto más temprano; dar a cada control dientes | Resultados de eval-gate y red-team por versión; decisiones de guardrail; registros de ejercicio de kill-switch | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail, Kill Switch |
| Privacidad y seguridad | 1 gobernanza es código; 4 identidad y alcance | Registrar y acotar cada actor; construir en el punto más temprano | Veredictos de política sobre clase de datos y residencia; credenciales con alcance; DPIA; evals de fuga de PII | 01 · Policy Card; 04 · Agent Identity & Scoped Credentials |
| Transparencia y explicabilidad | 5 evidencia legible por máquina; 6 herramientas inspeccionables | Instrumentar la construcción | Ficha de modelo, ficha de datos y AIBOM; registros de divulgación y marcado; [códigos de razón registrados por decisión](/patterns/explanation-artefact) | 02 · Model Card as Control Evidence; AIBOM |
| Responsabilidad | 4; 8 propiedad con ingeniería | Registrar y acotar cada actor; instrumentar la construcción | Propietario del registro por entrada; registros de decisión; registros firmados; registros de incidentes; resultados de evaluación OSCAL | 02 · Agent Registry; 05 · [Incident Pipeline](/patterns/incident-pipeline), [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Centricidad humana | 8; 3 | Empezar desde un daño nombrado; hacer que el camino gobernado sea el más fácil | Registros de puerta (aprobador, tiempo para decidir, tasa de anulación); resultados de prueba de accesibilidad para avisos y explicaciones; registros de apelación | 04 · Human-in-the-loop Gate |
| Sostenibilidad | 7 | Instrumentar la construcción | Energía o cálculo por ejecución de eval y por 1.000 inferencias en el almacén de evidencia; un registro de decisión de tamaño de modelo | 05 · Continuous Assurance Telemetry |

Tres filas tienen peso legal o numérico. **Centricidad en el ser humano** incluye accesibilidad, y
para sistemas de alto riesgo es un deber: los proveedores deben cumplir los requisitos de
accesibilidad de las directivas de accesibilidad web de la UE y de la Ley Europea de Accesibilidad
(Art. 16(l)) [38], por lo que cada notificación y explicación que el sistema muestra a una persona
recibe una prueba de accesibilidad en el pipeline. **Transparencia** llega a la persona afectada: el
texto de la OCDE pide información que permita a los perjudicados «cuestionar su resultado» [2], y el
Reglamento de IA da a las personas afectadas por ciertas decisiones de alto riesgo el derecho a
«explicaciones claras y significativas del papel del sistema de IA» [10]; el artefacto es un código
de razón registrado y una ruta de apelación con resultados documentados. **Sostenibilidad** tiene un
número: la AIE estima que los centros de datos utilizaron aproximadamente 415 TWh en 2024, alrededor
del 1,5% de la electricidad mundial, y proyecta alrededor de 945 TWh para 2030 [39]. No todo eso es
IA, pero hace que la elección entre un SLM y un LLM para la misma tarea sea una decisión de
gobernanza con un registro.

> **Ejemplo (ilustrativo)**
> Un principio trazado de extremo a extremo. OCDE 1.3 pide que las personas perjudicadas por un
> sistema puedan cuestionar su resultado. Daño nombrado: un solicitante rechazado por
> `loan-triage-02` no puede averiguar por qué ni impugnarlo. Control: cada decisión adversa lleva
> códigos de razón registrados y una ruta de apelación a un revisor que puede revertirla. Métrica:
> volumen de apelaciones, tasa de reversión y tiempo de resolución, por mes. Evidencia: el registro
> de apelaciones, archivado contra la entrada del registro y la versión del modelo. Obligación que
> respalda: Art. 86 del Reglamento de IA donde corresponda, salvaguardas del Art. 22 del RGPD donde
> la decisión es únicamente automatizada.

### Los compromisos son decisiones, y las decisiones son registros

Los principios chocan. NIST nombra los choques habituales: interpretabilidad contra privacidad,
precisión predictiva contra interpretabilidad, y técnicas que mejoran la privacidad que cuestan
precisión y con ella equidad donde los datos son escasos; añade que estos compromisos «deben
resolverse de una manera que sea tanto transparente como apropiadamente justificable» [8]. La
lectura de ingeniería es que cada compromiso resuelto es un registro de decisión con un propietario,
las opciones consideradas, la métrica que cada una habría movido y la fecha en que será revisado.

| Tensión | Caso típico | Dónde vive la decisión |
|---|---|---|
| Precisión contra interpretabilidad | Un modelo de aumento de gradiente supera una tarjeta de puntuación por algunos puntos | Registro de selección de modelo en la ficha de modelo, con resultados de eval de ambos |
| Prueba de equidad contra privacidad | Las evals de subgrupo necesitan los datos de categoría especial que la ley de privacidad restringe | Ficha de datos anotando la base legal (ver Art. 4a en [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)), seudonimización y eliminación |
| Eficiencia contra centricidad en el ser humano | Un paso de revisión añade latencia a cada decisión | Registro de colocación de puerta: qué acciones están puertas y por qué |
| Transparencia contra seguridad | Publicar reglas de detección ayuda a los atacantes a eludirlas | Decisión de divulgación: qué se publica, qué se retiene para auditores |

Un compromiso que nadie escribió fue hecho de todas formas; fue hecho por defecto, por quien tocó el
código por último.

> **En la práctica (ilustrativo)**
> Un equipo de gobernanza heredó una «carta de IA responsable» publicada de seis principios y sin
> evidencia detrás de ninguno de ellos. En lugar de reescribir la carta, añadió una columna al
> registro por principio y preguntó, para cada sistema de alto riesgo, qué artefacto lo evidenciaba.
> Cuatro de seis columnas estaban vacías para la mayoría de sistemas el primer día. Las celdas
> vacías se convirtieron en el backlog, y la carta se volvió auditable por primera vez: un principio
> sin artefacto fue reportado como una brecha, no como un valor.

## Lo que puedes hacer esta semana

1. Añade los ocho campos de alcance de este capítulo (`substrate`, `objective`, `intended_purpose`,
   `inference_technique`, `output_types`, `effect_surface`, `autonomy_level`, `adapts_in_use`) y un
   `definition_decision` con su razón a tu esquema de registro, y rellena retrospectivamente tus
   diez sistemas de mayor exposición.
2. Escribe las decisiones fuera de alcance que ya has tomado implícitamente (motores de reglas,
   paneles de control, pronosticadores de línea base), cada una con la familia excluida y la razón,
   para que un cambio posterior aparezca como un diff.
3. Para un sistema predictivo en producción, encuentra el umbral de decisión, su propietario y su
   última comprobación de calibración. Si falta alguno de los tres, añade una eval de calibración a
   su puerta y pon el umbral en un archivo de política con un propietario.
4. Para un sistema generativo, ejecuta su eval más importante cinco veces en la versión actual del
   modelo y registra la tasa de aprobación con la configuración de muestreo. Si la tasa está por
   debajo del piso que pensabas que tenías, has encontrado tu primera puerta real.
5. Toma un principio que tu organización ha publicado y trázalo a un artefacto para un sistema,
   usando la tabla anterior. Si no hay artefacto, registra la brecha en el registro de riesgos.

**Correspondencias:** Art. 3(1), 3(63), 3(66) del Reglamento de IA de la UE (definiciones), Art. 14
(supervisión humana), Art. 15 (métricas de precisión, bucles de retroalimentación), Art. 16(l)
(accesibilidad), Art. 50 (transparencia), Art. 51 (riesgo sistémico de IA de uso general), Art. 86
(explicación) · Art. 22 del RGPD · ISO/IEC 22989 · ISO/IEC 42001 · NIST AI RMF (Map, Measure) e NIST
AI 600-1 · Principios de la OCDE · OWASP Agentic ASI02/ASI03 · Capas 01–05. Los mapeos son
ilustrativos, no una afirmación de conformidad.

## Sources

[1] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; first published 6 Feb 2025; not binding; seven elements of Art. 3(1); exclusions at paras 40–51; definition applicable since 2 Feb 2025). European Commission. 2025-07-29. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[2] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; definition revised 8 Nov 2023; principles revised 3 May 2024; principles 1.1–1.5, incl. 1.3(iv) challenge an output and 1.4(b) override, repair, decommission). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[3] Explanatory memorandum on the updated OECD definition of an AI system (2019 and 2023 texts compared; autonomy and adaptiveness explained; not part of the Recommendation). OECD Artificial Intelligence Papers. 2024-03. https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (1) AI system, (3) provider, (4) deployer, (63) general-purpose AI model, (66) general-purpose AI system). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Recital 12 (AI distinguished from simpler traditional software and from rules defined solely by natural persons; inference; machine learning and logic- and knowledge-based approaches; autonomy and adaptiveness; recitals are not reproduced in the consolidated text). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_12 (verified: primary)
[6] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (AI system, term 3.1.4; autonomy and heteronomy, terms 3.1.5 and 3.1.16; clause 5.13 autonomy, heteronomy and automation; clause 5.19 AI stakeholder roles); referenced by identifier only. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[7] ISO/IEC 22989:2022/FDAmd 1, Generative AI (stage 50.00, FDIS registered for formal approval on 2026-09-18; not published as of 2026-09-24). ISO/IEC JTC 1/SC 42. 2026-09-18. https://www.iso.org/standard/88145.html (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (AI system definition; trustworthy characteristics; s. 3.5 transparency, explainability, interpretability; trade-offs; Appendix B, how AI risks differ from traditional software risks). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of interaction with an AI system; machine-readable marking of synthetic audio, image, video and text). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[10] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to clear and meaningful explanations of the role of a high-risk AI system in a decision). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[11] Regulation (EU) 2016/679 (GDPR), Art. 22(1) (right not to be subject to a decision based solely on automated processing, including profiling, with legal or similarly significant effects). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_22 (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15 (15(3) accuracy levels and metrics declared in the instructions for use; 15(4) feedback loops in systems that continue to learn). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[13] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; HITL, HOTL and HIC oversight; requirement 5 includes accessibility and universal design). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[14] "Defeating Nondeterminism in LLM Inference" (1,000 temperature-zero completions of one prompt gave 80 unique outputs; cause traced to lack of batch invariance). Thinking Machines Lab (Horace He et al.). 2025-09-10. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ (verified: primary)
[15] Levels of AGI for Operationalizing Progress on the Path to AGI (levels of performance, generality and autonomy) (arXiv 2311.02462). Morris et al.. 2023-11-04. https://arxiv.org/abs/2311.02462 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 51 (classification of GPAI models with systemic risk; 51(2) presumption of high-impact capabilities above 10^25 FLOP of training compute). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_51 (verified: primary)
[17] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (C(2025) 7719 final; first published 18 Jul 2025; para. 17 indicative criterion: training compute above 10^23 FLOP and able to generate language, text-to-image or text-to-video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[18] "Understanding the four types of AI, from reactive robots to self-aware beings" (reactive machines, limited memory, theory of mind, self-awareness). The Conversation (Arend Hintze). 2016-11-14. https://theconversation.com/understanding-the-four-types-of-ai-from-reactive-robots-to-self-aware-beings-67616 (verified: primary)
[19] Concrete Problems in AI Safety (reward hacking among five practical problems) (arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 14 (14(4)(b) automation bias; 14(4)(e) interrupting the system so it comes to a halt in a safe state). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_14 (verified: primary)
[21] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[22] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream) (arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[23] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone) (arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[24] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; provenance as an open problem) (arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[25] Top 10 for Agentic Applications 2026 (ASI01–ASI10 threat catalogue for agentic systems). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[26] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity), Big Data & Society 3(1). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[27] "Dual use of artificial-intelligence-powered drug discovery" (inverted toxicity model generated about 40,000 candidate toxic molecules in under six hours), Nature Machine Intelligence. Urbina, Lentzos, Invernizzi and Ekins (full text on PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[28] Overcoming catastrophic forgetting in neural networks (neural networks lose earlier competence when trained on new tasks; elastic weight consolidation) (arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[29] On Calibration of Modern Neural Networks (modern networks poorly calibrated; temperature scaling), ICML 2017 (arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[30] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage) (arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[31] Recommendation on the Ethics of Artificial Intelligence (adopted by 193 member states, November 2021; four core values; ten principles). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[32] Ethical Impact Assessment: a tool of the Recommendation on the Ethics of AI (ex-ante and ex-post assessment of a system; aimed at procurers of AI systems). UNESCO. 2023-08-28. https://www.unesco.org/en/articles/ethical-impact-assessment-tool-recommendation-ethics-artificial-intelligence (verified: primary)
[33] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), Recital 27 (the seven HLEG principles as non-binding ethical principles complementing the Act). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[35] Hiroshima Process International Guiding Principles for Organizations Developing Advanced AI Systems (welcomed by G7 leaders with a companion Code of Conduct; builds on the OECD AI Principles). European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-guiding-principles-advanced-ai-system (verified: primary)
[36] Hiroshima Process International Guiding Principles, full text of the eleven principles (preamble on human rights, fairness and human-centricity; principle 11 elaboration on data quality against harmful bias). G7 Information Centre (University of Toronto). 2023-10-30. https://g7.utoronto.ca/summit/2023hiroshima/231030-ai-principles.html (verified: secondary)
[37] Hiroshima AI Process (HAIP) Reporting Framework (voluntary reporting against the Code of Conduct; launched February 2025). OECD.AI. 2025-02. https://oecd.ai/en/hiroshima (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16 (provider obligations; 16(l) accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[39] Energy and AI (data centres about 415 TWh in 2024, around 1.5% of global electricity; projected around 945 TWh by 2030). International Energy Agency. 2025. https://www.iea.org/reports/energy-and-ai (verified: primary)
