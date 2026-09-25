---
lang: es
source: bok/14-governing-development.md
sourceHash: "a8da4ad617810f33e44a55719a0c5546569e9310e2e3364c1f29cf97fe4090de"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 14. Gobernanza del desarrollo de IA

> El desarrollo de IA se gobierna cuando toda decisión en la construcción, desde el caso de uso
> hasta el lanzamiento, deja un registro que una puerta lee, de modo que el pipeline compila el
> archivo técnico en lugar de que un equipo lo escriba después.

## La construcción como una cadena de puertas

La mayoría de los fallos de gobernanza en un sistema de IA se deciden antes de que sirva su primera
solicitud. El caso de uso nunca se escribió, por lo que nadie puede decir para qué es el sistema. El
conjunto de entrenamiento se raspó bajo términos que nadie verificó. El conjunto de prueba se filtró
en el entrenamiento. El lanzamiento salió porque la fecha era fija. Cada uno de estos es una
decisión de desarrollo, y cada uno deja atrás un registro o una brecha.

Este capítulo cubre el lado del proveedor del ciclo de vida: la organización que diseña, entrena,
prueba y lanza un sistema o modelo de IA.
[El capítulo 15](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance) cubre el despliegue
y el uso. La división sigue los deberes del Reglamento de IA de la UE (ver el
[mapa regulatorio](/bok/regulatory-map#eu-ai-act-post-omnibus)): la mayoría de lo que sigue vincula
al proveedor, y un responsable del despliegue que se basa en un modelo procurado hereda una versión
más delgada de él a través de la
[**Puerta de Debida Diligencia de Proveedor / Modelo**](/patterns/vendor-model-due-diligence-gate).

Los textos de referencia están de acuerdo en las etapas y dicen poco sobre el mecanismo. ISO/IEC
5338:2023 define procesos del ciclo de vida del sistema de IA [1]; ISO/IEC 42001 agrupa los
controles bajo Anexo A.6 (ciclo de vida) y A.7 (datos) [2]; el NIST AI RMF pone contexto en Map y
pruebas en Measure [3]; el Reglamento de IA de la UE pide un sistema de gestión de la calidad que
incluya control de diseño, verificación de diseño y "procedimientos de examen, prueba y validación a
realizar antes, durante y después del desarrollo" [4]. La lectura de ingeniería: cada etapa termina
en una puerta, cada puerta lee un registro estructurado, y cada registro aterriza en el almacén de
evidencia vinculado al id de registro, la ruta de datos de
[un sistema a través de las cinco capas](/bok/the-stack#one-system-through-the-five-layers).

Los números de capa en las tablas de este capítulo siguen el capítulo 04:
**1 Gobernanza como código · 2 Inventario y Transparencia · 3 Evals y Red Teaming como Evidencia · 4 Controles de Tiempo de Ejecución y Observabilidad · 5 Aseguramiento y Cumplimiento Continuo**.

| Etapa | Pregunta de gobernanza | Registro | Compuerta | Capa |
|---|---|---|---|---|
| Caso de uso | ¿Es este el problema correcto, y es la IA la herramienta correcta? | Registro de caso de uso | [Aprobación de intake](/patterns/use-case-intake-risk-tiering) | 1 · 2 |
| Revisión de diseño | ¿Se mantienen los requisitos, la arquitectura y el análisis de mal uso? | Registro de diseño y registro de decisiones | Aprobación de revisión de diseño | 1 · 2 |
| Datos | ¿Podemos usar estos datos, y son aptos para el propósito? | Registro de admisión de conjunto de datos, hoja de datos, linaje | [Puerta de admisión de conjunto de datos](/patterns/dataset-admission-gate) | 1 · 2 · 3 |
| Pruebas | ¿Cumple el sistema los umbrales fijados antes de que las pruebas se ejecutaran? | Plan de prueba, resultados de eval, informe de prueba | Gate de eval | 3 |
| Lanzamiento | ¿Está listo, y se completa la ruta de conformidad? | Registro de go/no-go, declaración, registro | Puerta de lanzamiento | 1 · 5 |
| Archivo técnico | ¿Puede una autoridad reconstruir todo lo anterior? | Archivo Anexo IV, fichas, AIBOM | Construcción de documentación | 2 · 5 |

Esto no es MLOps, que mueve el modelo a través de las mismas etapas, y no es validación de modelo en
el sentido bancario, que desafía el modelo en puntos en el tiempo (el
[clúster de desambiguación](/bok/definition#the-disambiguation-cluster) dibuja ambas líneas). Es el
registro de gobernanza que esas dos actividades producen, hecho legible por máquina y dado el poder
de bloquear. Las reglas a nivel de organización que cada puerta aplica se establecen en el capítulo
12
([lo que la política requiere en cada etapa](/bok/governance-program#what-policy-requires-at-each-stage)),
y la página de plantillas tiene esquemas y ejemplos completados para el
[registro de caso de uso, revisión de diseño, admisión de conjunto de datos, plan y informe de prueba, y puerta de lanzamiento](/resources/templates#stage-build).
## El registro de caso de uso

El registro de caso de uso es el primer artefacto y el que más a menudo falta. Se escribe en
[intake](/bok/the-role#intake-and-classification), se almacena como campos en la entrada del
registro, y se lee por cada puerta posterior. El Reglamento de IA de la UE lo ancla: la
**finalidad prevista** es "el uso para el que el proveedor tiene la intención de que se utilice un
sistema de IA, incluido el contexto específico y las condiciones de uso" [5], y la mayoría de los
deberes de alto riesgo se miden contra ella. El NIST AI RMF pide lo mismo en términos de ingeniería:
las finalidades previstas, los entornos prospectivos y los tipos de usuarios son "entendidos y
documentados" (MAP 1.1), y las tolerancias de riesgo organizacionales son "determinadas y
documentadas" (MAP 1.5) [3].

| Campo | Lo que registra | Leído después por |
|---|---|---|
| Contexto empresarial | El objetivo, el patrocinador, la decisión que el sistema informa | Revisión de diseño, go/no-go |
| Finalidad prevista | Tarea, contexto y condiciones de uso | Clasificación, pruebas, instrucciones de uso |
| Usos fuera de alcance | Usos que el proveedor descarta, declarados explícitamente | Análisis de mal uso, instrucciones de uso, política de tiempo de ejecución |
| Usuarios y personas afectadas | Quién lo opera; quién está sujeto a sus salidas, incluidos grupos vulnerables | Evaluaciones de impacto, pruebas de sesgo |
| Autoridad de decisión | Asesor, aprobado por humano o autónomo; quién puede anularlo | Diseño de supervisión, puerta de bucle humano |
| Entorno operativo | Dónde se ejecuta, fuentes de entrada, idiomas, jurisdicciones | Comprobaciones de representatividad, plan de prueba |
| Métricas de éxito | La métrica empresarial, la métrica del modelo y el vínculo entre ellas | Plan de prueba, monitoreo |
| Apetito de error | El costo de un falso positivo contra un falso negativo; tasas toleradas | Umbrales |
| Vida útil esperada | Fecha de revisión y criterios de jubilación | Mantenimiento, retención |
| Disponibilidad de datos | Si existen datos lícitos y suficientes | Viabilidad, admisión de conjunto de datos |

### ¿Es la IA la herramienta correcta?

La primera pregunta de la puerta es si construir en absoluto. La guía de ingeniería de Google abre
con la regla «No tengas miedo de lanzar un producto sin aprendizaje automático» [6], y la versión de
gobernanza es más tajante: si una regla, una búsqueda o un flujo de trabajo humano cumplen la
métrica de éxito, un modelo añade riesgo sin añadir valor. Registra la línea base sin ML en el
registro del caso de uso y requiere que la revisión de diseño la supere por un margen establecido.
La línea base también da a las pruebas su primera comparación: un modelo que no supera el
rendimiento de la regla que reemplaza no se ha ganado un lugar en producción.

### Apetito de error: falsos positivos frente a falsos negativos

Todo clasificador intercambia un error por otro, y el intercambio es una decisión empresarial y de
derechos, no de modelado. Un modelo de fraude que marca demasiado congela a clientes legítimos; uno
que marca demasiado poco deja pasar el fraude. Escribe el apetito antes del entrenamiento, en la
moneda del daño: qué cuesta un caso perdido, qué cuesta una falsa alarma, y qué error, para qué
grupo, está limitado independientemente del coste. La selección del umbral se convierte entonces en
aritmética contra costes establecidos, y mover el umbral se convierte en un cambio del registro con
un aprobador, no una decisión de ajuste dentro de un cuaderno. Las tasas de error por grupo y los
compromisos de equidad que fuerzan se tratan en
[capítulo 16](/bok/fairness-and-explainability#the-impossibility-results).

### Expansión de funciones

Un modelo construido para un propósito se desplaza hacia otros porque sus puntuaciones están
disponibles y son baratas. La guía revisada de riesgo de modelo de los organismos bancarios
estadounidenses lo expresa claramente: «Usar un modelo más allá de su propósito previsto introduce
incertidumbre y riesgo adicionales» [7]. Bajo el Reglamento de IA de la UE, el desplazamiento tiene
consecuencias legales. Un actor de la cadena de valor que modifica la finalidad prevista de un
sistema de modo que se convierte en de alto riesgo se trata como su proveedor (Art. 25(1)(c)) [8], y
un cambio no previsto en la evaluación de conformidad inicial que afecta al cumplimiento es una
**modificación sustancial** (Art. 3(23)) [5]. El control de ingeniería es hacer que la finalidad
prevista y la lista de exclusión sean campos que una política lee. Un nuevo consumidor de la API del
modelo declara su uso en el registro; un uso declarado fuera del registro falla la admisión y reabre
la clasificación y las evaluaciones de impacto.

> **Ejemplo (ilustrativo)** Un registro de caso de uso almacenado en la entrada del registro de un
> modelo de límite de crédito. Cada puerta posterior lee estos campos en lugar de una diapositiva.

```json
{
  "id": "uc-credit-limit-07",
  "registry_id": "clm-07",
  "intended_purpose": "Recommend a credit-limit band for existing retail customers; a credit officer approves.",
  "out_of_scope": ["new-customer onboarding", "collections prioritisation", "employment decisions"],
  "affected_persons": ["retail customers", "guarantors"],
  "decision_authority": "advisory; officer approval required above band 3",
  "success_metric": { "business": "bad-debt rate", "model": "AUC >= 0.78 on frozen holdout" },
  "error_appetite": { "false_negative": "loss amount", "false_positive": "declined uplift",
                      "max_fnr_gap_between_groups": 0.03 },
  "non_ml_baseline": "scorecard-v5",
  "classification": { "eu_ai_act": "high-risk, Annex III 5(b)", "gdpr_dpia": true, "fria": true },
  "owner": "team-credit-decisioning",
  "review_by": "2027-03-31"
}
```

> **En la práctica (ilustrativo)**
> Un equipo de retención en una gran operadora de telecomunicaciones pidió un modelo de abandono y
> obtuvo, en la admisión, un registro de caso de uso de una página para rellenar en lugar de un
> cuaderno. Escribir la lista de exclusión reveló que ventas quería las mismas puntuaciones para
> establecer niveles de descuento individuales: un segundo propósito con su propia exposición de
> equidad. El registro dividió la solicitud en dos casos de uso, cada uno con su propia
> clasificación y apetito de error, y el caso de descuento volvió para una evaluación de impacto
> antes de que se ejecutara ningún entrenamiento.

## Revisión de diseño

La revisión de diseño es la puerta entre un caso de uso aprobado y gastar computación. Lee el
registro del caso de uso y produce un **registro de diseño**: requisitos, arquitectura y elección de
modelo con su justificación, el análisis de mal uso, el diseño de supervisión y los controles
integrados. El Anexo IV punto 2(b) pedirá a un proveedor de alto riesgo las decisiones de diseño
clave, su justificación y supuestos, y los compromisos realizados [9]; escrito en el momento, eso
cuesta minutos, y reconstruido un año después, cuesta un proyecto.

### Requisitos con trazabilidad

Los requisitos vienen en tres familias. Los requisitos **funcionales** dicen qué hace el sistema.
Los requisitos **no funcionales** establecen pisos para precisión, latencia, equidad,
explicabilidad, privacidad, robustez y coste. Los requisitos **regulatorios** son las obligaciones
que la clasificación desencadena, como el registro de eventos o la supervisión diseñada para un
sistema de alto riesgo. El NIST AI RMF pide que los requisitos del sistema sean «obtenidos de y
entendidos por los actores de IA relevantes» (MAP 1.6) [3].

La trazabilidad es la parte de ingeniería. Cada requisito obtiene un id, cada id se asigna a al
menos una prueba, y cada prueba emite un registro de evidencia nombrando el requisito. El rastro se
convierte entonces en una unión, no una hoja de cálculo: `REQ-FAIR-02` (brecha de tasa de falsos
negativos entre bandas de edad como máximo 0,03) se resuelve en la suite `fnr-gap-by-age.v2`, en su
último resultado, y en la versión que se envió en él. Un requisito sin prueba es un deseo; una
prueba sin requisito es ruido en la puerta.

### Arquitectura y compromisos de selección de modelo

La elección del modelo es una decisión de gobernanza porque fija qué puede probarse, explicarse y
evidenciarse después. Registra cada elección como un registro de decisión corto (contexto, opciones,
decisión, consecuencias, fecha, aprobador) en el mismo repositorio que el código.

| Elección | Opciones | Consecuencia de gobernanza |
|---|---|---|
| Interpretable o complejo | Tarjeta de puntuación, modelo disperso o aditivo, árbol pequeño; o impulso de gradiente, red profunda, LLM | Un modelo interpretable es su propia explicación; uno complejo necesita explicación post-hoc que puede divergir del modelo. Rudin argumenta que las decisiones de alto riesgo deben usar modelos interpretables en lugar de explicar cajas negras después del hecho [10] |
| Pesos abiertos o propietarios | Pesos auto-alojados; o una API de proveedor | Los pesos pueden probarse, fijarse y alojarse en región; una API puede cambiar detrás de ti, y su evidencia se recopila, no se produce ([IA procurada](/bok/the-stack#third-party-and-procured-ai)) |
| Entrenar, ajustar o indicar | Modelo propio; modelo de fundación ajustado; indicación y recuperación | Cada paso hacia arriba añade deberes de datos de entrenamiento; una modificación lo suficientemente grande de un modelo de propósito general puede hacerte su proveedor [11] |
| Recuperación o ajuste para conocimiento | Corpus RAG; conocimiento en pesos | Un corpus puede versionarse, filtrarse y eliminarse; el conocimiento en pesos no puede eliminarse sin reentrenamiento |
| Alojamiento | Servicio gestionado; infraestructura propia | Residencia de datos, propiedad de registros y control de retención |
| Coste y sostenibilidad | Tamaño del modelo, ejecuciones de entrenamiento, volumen de inferencia | El Anexo IV pide los recursos computacionales utilizados para desarrollar, entrenar, probar y validar [9]; el Anexo XI pide a los proveedores de GPAI el consumo de energía conocido o estimado [12] |

### Uso indebido razonablemente previsible

El **uso indebido razonablemente previsible** es «el uso de un sistema de IA de una manera que no
está de acuerdo con su finalidad prevista, pero que puede resultar del comportamiento humano
razonablemente previsible o la interacción con otros sistemas» [5]. No es lo mismo que un ataque. Un
atacante es modelado por el equipo rojo en
[capa 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence); el mal uso previsible es lo que
los usuarios ordinarios y los sistemas adyacentes harán de todas formas con la salida: una
puntuación de triaje leída como diagnóstico, una clasificación de CV utilizada para rechazar sin
revisión, un resumidor apuntado a un idioma en el que nunca fue probado.

El Reglamento de IA de la UE hace que el análisis sea una entrada de diseño dos veces. El sistema de
gestión de riesgos debe estimar y evaluar los riesgos que emergen bajo condiciones de uso indebido
razonablemente previsible (Art. 9(2)(b)) [13], y las instrucciones de uso deben divulgar
circunstancias conocidas o previsibles, incluido tal mal uso, que pueden llevar a riesgos para la
salud, seguridad o derechos fundamentales (Art. 13(3)(b)(iii)) [14]. Mantén un
**registro de mal uso** en el registro de diseño: escenario, quién lo haría, probabilidad, daño, y
la respuesta. Cada entrada debe caer en al menos uno de tres lugares: una prueba en la suite de
eval, una política de tiempo de ejecución que la bloquea o marca, o una advertencia en las
instrucciones de uso. Una entrada que no cae en ningún lugar es un riesgo aceptado y necesita un
aceptor nombrado ([capítulo 13](/bok/risk-management#who-may-accept) cubre quién puede aceptar).

### Supervisión y controles diseñados

El campo de autoridad de decisión del registro del caso de uso establece el modelo de supervisión.
El Grupo de Expertos de Alto Nivel de la UE nombra tres enfoques: humano en el bucle, humano en el
bucle y humano al mando [15]. La revisión de diseño elige uno por clase de decisión y lo diseña
contra sesgo de automatización y supervisión que se degrada bajo carga, como se establece en
[diseño de supervisión humana](/bok/the-stack#designing-human-oversight-article-14) y el patrón
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate). La misma revisión fija los controles
que son baratos ahora y caros de retro-equipar: registro de eventos, una ruta de reversión, un modo
sombra, y un [**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) para
cualquier cosa que actúe.

La revisión es una puerta con revisores nombrados: un líder de ingeniería, el ingeniero de
gobernanza de IA, seguridad, privacidad, un experto en dominio y, donde las personas afectadas están
fuera de la organización, alguien que pueda hablar por ellas. Su salida es un registro de diseño
firmado con condiciones abiertas, no actas.

## Datos para entrenamiento y pruebas

[Gobernanza de datos en todo el stack](/bok/the-stack#data-governance-across-the-stack) establece la
regla de que cada conjunto de datos lleva una base legal, una procedencia, un límite de retención y
un conjunto de derechos. Esta sección es el procedimiento de tiempo de desarrollo que lo hace
cumplir: una [**puerta de admisión de conjunto de datos**](/patterns/dataset-admission-gate). Un
trabajo de entrenamiento solo puede leer conjuntos de datos cuyo registro de admisión esté completo
y firmado por el propietario de los datos, y la verificación es política como código en la tubería,
no un recordatorio en una wiki.

### El derecho a usar los datos

La admisión comienza con derechos, porque un problema de calidad puede solucionarse y un problema de
derechos a menudo no. Por conjunto de datos, el registro responde cinco preguntas.

- **Base legal y propósito.** Para datos personales, qué base del RGPD se aplica al entrenamiento, y
  si el entrenamiento es compatible con el propósito de la recopilación original. La limitación de
  propósito (Art. 5(1)(b)) y los factores de compatibilidad del Art. 6(4) deciden si los datos
  recopilados para servir a los clientes pueden entrenar un modelo sobre ellos [16]. El
  consentimiento a un servicio no es consentimiento para entrenar.
- **Categorías especiales.** Después del Omnibus Digital, la base estrecha para procesar datos de
  categorías especiales para detección de sesgos se sienta en un nuevo Art. 4a en lugar del antiguo
  Art. 10(5), condicionado a salvaguardas y eliminación [17] (ver el
  [mapa regulatorio](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- **Modelos como datos personales.** La Opinión 28/2024 de la EDPB (diciembre de 2024) sostiene que
  un modelo entrenado en datos personales es anónimo solo si es muy poco probable tanto identificar
  a las personas cuyos datos lo entrenaron como permitir que alguien extraiga esos datos a través de
  consultas; establece una prueba de tres pasos para interés legítimo y advierte que el
  procesamiento ilegal en desarrollo puede afectar la legalidad del despliegue [18].
  [Capítulo 19](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference) va más allá.
- **Contenido raspado y de terceros.** La excepción de la UE para minería de textos y datos se
  aplica solo cuando los titulares de derechos no han reservado sus derechos "de manera apropiada,
  como por medios legibles por máquina" para contenido disponible públicamente en línea (Directiva
  DSM art. 4(3)) [19], y un proveedor de IA de uso general debe mantener una política de derechos de
  autor que identifique y cumpla con tales reservas (Reglamento de IA art. 53(1)(c)) [20]. Registra
  la fecha de rastreo, la comprobación de reserva y su resultado por fuente.
- **Licencias y garantías.** Si la licencia del conjunto de datos permite el entrenamiento, uso
  comercial y distribución de modelos derivados, y qué garantiza el proveedor sobre la recopilación
  legal. La licencia entra en el [**AIBOM**](/patterns/aibom) para que un cambio de licencia sea
  visible en la siguiente compilación.

### ### Calidad, cantidad, representatividad e idoneidad para el propósito

Para sistemas de alto riesgo, el art. 10 convierte la calidad de datos en ley. Los conjuntos de
entrenamiento, validación y prueba necesitan prácticas de gobernanza que cubran, entre otras,
recopilación y origen, preparación, los supuestos sobre qué mide el dato, disponibilidad e
idoneidad, examen y mitigación de sesgos, y lagunas de datos (art. 10(2)); deben ser "relevantes,
suficientemente representativos y, en la mayor medida posible, libres de errores y completos" (art.
10(3)) y reflejar el contexto de uso (art. 10(4)) [21]. La serie ISO/IEC 5259 proporciona el
vocabulario, las medidas y los marcos de proceso y gobernanza [22].

| Dimensión | Pregunta | Prueba que lo evidencia |
|---|---|---|
| Precisión de etiquetas | ¿Son correctas las etiquetas? | Auditoría de una muestra etiquetada; acuerdo entre anotadores |
| Completitud | ¿Faltan campos, segmentos o períodos? | Tasas nulas por campo y por segmento |
| Consistencia | ¿Se registra el mismo hecho de la misma manera? | Comprobaciones de esquema y restricciones |
| Actualidad | ¿Son los datos actuales para el entorno operativo? | Rango de fechas contra el registro de caso de uso |
| Cantidad | ¿Hay suficientes ejemplos por clase y por grupo? | Recuentos de celdas contra el mínimo en el plan de prueba |
| Representatividad | ¿Coincide la población con la población de despliegue? | Comparación de distribución contra una referencia |
| Idoneidad para el propósito | ¿Mide el dato lo que el caso de uso necesita, o un proxy? | Análisis de proxy; registro de supuestos (art. 10(2)(d)) |
| Integridad | ¿Ha cambiado desde la admisión? | Hashes de contenido; snapshots firmados |

La cantidad no es representatividad. Un conjunto de datos grande extraído de la población equivocada
es precisamente incorrecto, y más de él no cura el sesgo; solo estrecha el intervalo de confianza
alrededor de la respuesta equivocada. El catálogo de herramientas lista
[herramientas de validación de datos](/resources/tools#cat-data-validation) como ejemplos
ilustrativos, no como respaldos.

### ### Propietarios, administradores y la puerta de admisión

El **propietario de datos** es responsable de un conjunto de datos: sus usos permitidos, su
aceptación de riesgo y la firma en su registro de admisión. El **administrador de datos** lo opera:
comprobaciones de calidad, metadatos, acceso y eliminación. Separar los dos mantiene a la persona
que quiere que se usen los datos de ser la única que decide que pueden serlo. Cuando muchos equipos
comparten datos, una pequeña junta de revisión de datos resuelve admisiones controvertidas y
establece la lista de comprobación de admisión mínima; la lista misma vive como código para que un
campo faltante falle la tubería.

### ### Procedencia versus linaje

Las dos palabras se usan indistintamente y no deberían. **Procedencia** es de dónde vino un conjunto
de datos y en qué términos. W3C PROV la define como "información sobre entidades, actividades y
personas involucradas en la producción de un dato o cosa, que puede usarse para formar evaluaciones
sobre su calidad, confiabilidad o fiabilidad", y su modelo de datos (PROV-DM, una Recomendación W3C
desde el 30 de abril de 2013) la expresa como entidades, actividades y agentes [23]. **Linaje** es
cómo el dato se movió y cambió a través de tuberías. OpenLineage proporciona un estándar abierto
para emitir eventos de linaje sobre conjuntos de datos, trabajos y ejecuciones, con facetas
extensibles [24]. El linaje funciona en ambas direcciones: linaje hacia atrás responde "¿qué
alimentó este modelo?", linaje hacia adelante responde "¿qué modelos usaron este conjunto de
datos?", y la segunda pregunta es la que hace una solicitud de eliminación o un retiro de licencia.

Elige granularidad por dónde se adjuntan los derechos. La procedencia a nivel de conjunto de datos
es la predeterminada. La procedencia a nivel de registro es necesaria cuando los derechos se
adjuntan a registros (datos personales, licencias por fuente, exclusiones). El linaje a nivel de
característica es necesario para características derivadas sensibles que pueden actuar como proxies.
El acompañamiento legible por humanos es una hoja de datos: Gebru y colegas propusieron que cada
conjunto de datos lleve una que cubra su motivación, composición, recopilación, preprocesamiento,
usos, distribución y mantenimiento [25]. El catálogo de herramientas lista
[herramientas de versionado y linaje](/resources/tools#cat-versioning) como ejemplos ilustrativos,
no como respaldos.

### ### Datos sintéticos, aumento y tecnologías que mejoran la privacidad

Los datos sintéticos heredan las propiedades de su generador: sus sesgos, sus lagunas y, donde el
generador memorizó, sus registros de origen. Trata un conjunto sintético como un conjunto de datos
con su propio registro de admisión que nombre el generador, los datos semilla y el método de
privacidad. La privacidad diferencial es la tecnología que mejora la privacidad con una garantía
medible, y NIST SP 800-226 (marzo de 2025) explica cómo evaluar una afirmación de privacidad
diferencial y los "peligros de privacidad" que surgen cuando las matemáticas se encuentran con una
implementación [26]. El aumento y el remuestreo cambian el equilibrio de clases y, aplicados antes
de la división de entrenamiento y prueba, filtran información en el conjunto de prueba e inflan
puntuaciones.

Los datos sintéticos también son un elemento de divulgación. La AB 2013 de California, vigente desde
el 1 de enero de 2026, requiere que los desarrolladores de sistemas de IA generativa disponibles
para californianos publiquen documentación de datos de entrenamiento que indique, entre otros
elementos, si se utilizó generación de datos sintéticos [27]; la plantilla de la UE para el resumen
de contenido de entrenamiento de IA de uso general lista datos sintéticos entre las fuentes de datos
a describir [28].

> **Ejemplo (ilustrativo)** Un registro de admisión de conjunto de datos. El trabajo de
> entrenamiento comprueba `admitted` y `permitted_uses` contra el id de caso de uso antes de leer un
> byte.

```json
{
  "dataset_id": "ds-claims-2019-2025@v4",
  "owner": "head-of-claims-data",
  "steward": "data-platform-claims",
  "sources": [{ "name": "claims-core", "period": "2019-01/2025-12",
                "basis": "GDPR Art. 6(1)(f); compatibility assessment CA-2026-014", "licence": "internal" }],
  "tdm_reservation_check": "not applicable (internal data)",
  "special_category": { "present": false },
  "provenance": "prov:wasDerivedFrom claims-core@2026-01-15",
  "lineage_run": "openlineage:claims-features/run-8812",
  "quality": { "null_rate_max": 0.02, "label_agreement": 0.91, "min_n_per_group": 400 },
  "permitted_uses": ["uc-fraud-triage-03"],
  "retention_until": "2032-12-31",
  "admitted": true,
  "admitted_by": "head-of-claims-data",
  "timestamp": "2026-09-20T10:12:00Z"
}
```

## ## Prueba y validación

### ### Un plan de prueba antes de la primera ejecución

El Reglamento de IA de la UE requiere que los sistemas de alto riesgo se prueben "durante todo el
proceso de desarrollo y, en cualquier caso, antes de su introducción en el mercado", contra
"métricas previamente definidas y umbrales probabilísticos que sean apropiados para la finalidad
prevista" (art. 9(8)) [13]. El NIST AI RMF pide que los conjuntos de prueba, métricas y herramientas
estén documentados (MEASURE 2.1) y que el sistema se demuestre válido y confiable, con los límites
de generalización documentados (MEASURE 2.5) [3]. Las palabras operativas son *previamente
definidas*. Congela el plan de prueba en el repositorio antes de que comience la evaluación:
métricas, umbrales con su vínculo al apetito de error, conjuntos de datos, subgrupos, tamaños de
muestra y el número de ejecuciones repetidas. Un cambio en el plan después de que se conocen los
resultados es un diff con un aprobador. Esa única regla previene la búsqueda de métricas, el hábito
de elegir la métrica que pasa después de verlas todas.

### ### La matriz de tipos de prueba

ISO/IEC TR 29119-11 proporciona directrices para pruebas de sistemas basados en IA [29], e ISO/IEC
24029 cubre la evaluación de robustez de redes neuronales [30]. La matriz a continuación es la
versión de trabajo: una fila por tipo de prueba, una columna por familia de sistemas, y la evidencia
que deja cada ejecución. La latencia de cola (el percentil 95 o 99) pertenece a ella porque una
media oculta las solicitudes lentas que los usuarios y los tiempos de espera realmente encuentran.

| Tipo de prueba | ML clásico | Sistema LLM o agente | Registro de evidencia |
|---|---|---|---|
| Unitaria | Transformaciones de características, validadores de datos, contratos de entrada y salida de envoltorio de modelo | Plantillas de prompts, esquemas de herramientas, analizadores de salida | Ejecución de prueba CI |
| Integración | Tubería de extremo a extremo en un conjunto de datos de fixture | Orquestación, recuperación y llamadas de herramientas contra sandboxes | Informe de integración |
| Validación | Holdout, validación cruzada k-fold, validación externa en otro sitio o período | Suites de tareas retenidas, conjuntos dorados, muestras calificadas por humanos | Resultado de eval con intervalo |
| Rendimiento | Rendimiento, latencia p95 y p99, memoria | Tiempo hasta el primer token, latencia p99, tokens y costo por tarea | Informe de prueba de carga |
| Robustez y fuera de distribución | Ruido, perturbación, cambio de covariable, conjuntos fuera de distribución | Paráfrasis, errores tipográficos, cambio de idioma y formato, contexto largo | Eval de robustez |
| Estrés y casos límite | Valores extremos, clases raras, entradas faltantes | Entradas de tamaño excesivo, fallos de herramientas, tiempos de espera, bucles | Informe de estrés |
| Seguridad y adversarial | Evasión, envenenamiento, extracción de modelo, inferencia de membresía | Inyección de prompts, jailbreak, mal uso de herramientas, exfiltración de datos | Hallazgos de red team |
| Sesgo y equidad | Tasas de error y selección por grupo | Tasas de calidad y rechazo por grupo, idioma y dialecto | Eval de subgrupo |
| Interpretabilidad | Importancia global de características, explicaciones locales, estabilidad de código de razón | Fidelidad de citas, consistencia de razonamiento | Eval de explicación |
| Escenario | Casos de extremo a extremo del registro de caso de uso y registro de mal uso | Tareas de múltiples pasos y trayectorias de agentes | Informe de escenario |
| Persona en el bucle | Precisión del revisor con y sin el modelo; tasa de anulación | Calidad de aprobación bajo carga; sondas de sesgo de automatización | Prueba de supervisión |
| Regresión | Deltas de puntuación contra la última versión | Deltas de puntuación contra la última versión de modelo o prompt | Veredicto de puerta de eval |

Cada fila es una suite detrás de la [**Eval Gate in CI**](/patterns/eval-gate-in-ci); la fila de
seguridad es la [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite). Las métricas
de equidad se definen en el [capítulo 16](/bok/fairness-and-explainability#group-fairness-metrics),
que también cubre
[pruebas de sesgo e interpretabilidad](/bok/fairness-and-explainability#testing-explanation-quality)
de las explicaciones mismas.

### ### Validez estadística de evals

Una puerta de eval es tan buena como la estadística bajo su umbral, y la mayoría de puertas no
tienen ninguna ([los límites de la puerta de eval](/bok/definition#the-limits-of-the-eval-gate)
establecen los otros límites). El tratamiento de Miller de evaluaciones de modelos de lenguaje
enmarca preguntas de eval como una muestra de una superpoblación no vista y proporciona las fórmulas
para errores estándar, para comparar dos modelos y para planificar tamaños de muestra [31]. Cuatro
consecuencias para la puerta siguen.

- **Reporta un intervalo, no un punto.** Una tasa de aprobación de 0,96 en 200 casos tiene un error
  estándar de √(0,96 × 0,04 / 200) ≈ 0,014, por lo que su intervalo del 95% es aproximadamente 0,933
  a 0,987 (±1,96 errores estándar). Un umbral de 0,95 se sitúa dentro de él, y la puerta no puede
  distinguir un aprobado de un suspenso. En 2.000 casos el intervalo se estrecha a aproximadamente
  0,951 a 0,969. Dimensiona la suite desde el umbral, no desde el tiempo disponible.
- **Cero fallos no es cero riesgo.** Si ninguno de *n* casos independientes falla, la tasa de fallos
  que produciría ese resultado el 5% de las veces satisface (1 − p)^n = 0,05, por lo que p ≈
  −ln(0,05)/n ≈ 3/n. Trescientos casos limpios acotan la tasa de fallos en aproximadamente el 1% con
  una confianza del 95%.
- **Repite ejecuciones no deterministas.** La temperatura de muestreo, el agrupamiento y la latencia
  de herramientas hacen que una ejecución sea una muestra de una. Ejecuta cada suite varias veces,
  informa de la media y la dispersión, fija semillas y versiones donde el stack lo permite, y
  compara modelos en las mismas preguntas (un diseño pareado) para reducir el ruido [31].
- **Desconfía del juez y del benchmark.** Los jueces LLM muestran sesgos de posición, verbosidad y
  automejoría, incluso donde jueces fuertes alcanzan más del 80% de acuerdo con las preferencias
  humanas [32]. Calibra un juez contra una muestra etiquetada por humanos, aleatoriza el orden de
  respuestas, prefiere un juez de una familia de modelos diferente a la que se está probando, y
  versiona el prompt del juez con la suite. Los elementos de prueba vistos en el entrenamiento
  inflan las puntuaciones; la contaminación puede demostrarse incluso para modelos de caja negra
  [33]. Mantén conjuntos privados retenidos, rota elementos y registra cuándo se escribió cada
  elemento en relación con la fecha de corte de datos del modelo.

### ### Validación independiente y gestión de riesgos de modelos

La banca ha ejecutado validación de modelos independiente durante años, e ingeniería de gobernanza
de IA toma prestada su mejor idea: **desafío efectivo**. En EE.UU., SR 11-7 (2011) fue reemplazado
el 17 de abril de 2026 por SR 26-2, orientación conjunta de la Reserva Federal, la OCC y la FDIC.
Mantiene el desafío efectivo como análisis crítico por expertos objetivos con la experiencia,
"suficiente independencia para mantener la objetividad", y la capacidad de efectuar cambios, y
mantiene los tres componentes de la validación: solidez conceptual, monitoreo continuo y análisis de
resultados [7]. También traza una línea que el ingeniero debe notar: los modelos de IA generativa y
agéntica "no están dentro del alcance de esta orientación", mientras que sus principios se aplican a
modelos tradicionales y "modelos de IA no generativos y no agénticos" [7]. En el Reino Unido, SS1/23
de la PRA se aplica a bancos, sociedades de crédito inmobiliario y empresas de inversión designadas
por la PRA con aprobación de modelo interno, hace de la validación de modelos independiente uno de
sus cinco principios y aborda técnicas de IA y aprendizaje automático [34].

Ingeniería de gobernanza de IA toma de esta tradición la independencia del validador, el desafío
documentado y la clasificación por materialidad. Añade validación como una suite re-ejecutable con
registros de evidencia en lugar de un PDF, y cobertura para los sistemas generativos y agénticos que
SR 26-2 deja fuera. El validador trabaja desde un repositorio separado con acceso de lectura al
modelo y los datos, presenta hallazgos como problemas con propietarios y plazos, y firma la puerta
de lanzamiento para los niveles altos.

### ### Reproducibilidad y versionado vinculado

Un resultado que nadie puede reproducir no es evidencia. El **registro de entrenamiento** captura el
commit del código, los hashes de las instantáneas de datos admitidas, la configuración e
hiperparámetros, las semillas, el entorno (digest del contenedor, versiones de bibliotecas,
hardware), el cómputo utilizado, la calidad del etiquetado (acuerdo entre anotadores) y el
propietario. El registro vincula en ambas direcciones: versión del modelo a registro de
entrenamiento a resultados de eval a etiqueta de lanzamiento a las aprobaciones de riesgo que le
permitieron enviarse.

El [artefacto del modelo en sí necesita integridad](/patterns/model-artefact-integrity). Fírmalo: la
herramienta de firma de modelos de OpenSSF firma una declaración que enumera cada archivo del modelo
y su digest, a través de Sigstore o claves convencionales, y la verificación recomputa los hashes
[35]. Rechaza cargar formatos serializados que ejecuten código de fuentes no confiables; la
documentación de Python es clara en que "El módulo pickle no es seguro" [36]. Ambas comprobaciones
pertenecen a la compilación junto a la [**AIBOM**](/patterns/aibom). El catálogo de herramientas
enumera [herramientas de firma y escaneo de artefactos](/resources/tools#cat-signing) como ejemplos
ilustrativos, no respaldos.

### ### Qué sale mal en el entrenamiento y las pruebas

| Problema | Cómo se muestra | Cómo detectarlo | Respuesta de la puerta |
|---|---|---|---|
| Fuga de datos | Puntuación de prueba demasiado buena; colapsa en producción | Divide por entidad y tiempo; audita características para campos posteriores al resultado | Bloquea; re-divide y reentrena |
| Sobreajuste | Puntuación de entrenamiento muy por encima de validación | Curvas de aprendizaje; varianza de validación cruzada | Bloquea; regulariza o añade datos |
| Infraajuste | Ambas puntuaciones bajas, cerca de la línea base | Comparación con la línea base no-ML | Bloquea; revisa el diseño |
| Ruido de etiquetas | Techo de precisión; etiquetas inconsistentes | Acuerdo entre anotadores; muestra re-etiquetada | Reabre la admisión de conjuntos de datos |
| Desequilibrio de clases | Alta precisión, pobre recall de minoría | Métricas por clase, no solo precisión | Remuestrea o repesa; re-prueba |
| Calibración deficiente | Las puntuaciones no coinciden con las tasas observadas | Diagrama de confiabilidad; error de calibración | Recalibra antes de que se establezcan umbrales |
| Brecha de cobertura de subgrupo | Intervalos amplios o sin datos para un grupo | Recuentos de celdas contra el plan de prueba | Bloquea para alto riesgo; recopila datos |
| Desajuste de entorno | Pasa sin conexión, falla en línea | Ejecución en la sombra en entradas en vivo | Mantén en la sombra |
| Contaminación de pruebas | Puntuación de benchmark público por encima de puntuación de conjunto privado | Brecha privada y pública; pruebas de contaminación | Elimina elementos contaminados |
| Resultado irreproducible | Una re-ejecución no está de acuerdo | Re-ejecuciones con semilla fija | Bloquea hasta que sea reproducible |
| Uso más allá del alcance del consentimiento | Conjunto de datos utilizado fuera de sus usos permitidos | Linaje unido a registros de admisión | Bloquea; revisión legal |

Cada hallazgo se convierte en un problema con un propietario, una severidad y un plazo. Un hallazgo
que se envía sin corregir es un riesgo aceptado con un aceptador nombrado, registrado en el registro
de riesgos que [capítulo 13](/bok/risk-management#the-risk-register-as-an-evidence-record) describe,
y se convierte en una prueba de regresión para que no pueda volver silenciosamente.

> **En la práctica (ilustrativo)**
> Un resumidor LLM pasó su puerta de lanzamiento en 0,96 contra un piso de 0,95, en 150 casos
> seleccionados a mano. Un revisor pidió el intervalo: en ese tamaño de muestra iba de
> aproximadamente 0,93 a 0,99, por lo que la puerta no podía distinguir un aprobado de un suspenso.
> El equipo pasó a un plan congelado de 1.500 casos estratificados por tipo de documento e idioma,
> tres ejecuciones repetidas para capturar la varianza de muestreo, y un juez de una familia de
> modelos diferente calibrado contra 200 calificaciones humanas. La puerta se volvió más lenta, y
> sus veredictos comenzaron a significar algo.

## ## Preparación para el lanzamiento y conformidad

### ### La puerta de sí/no

El lanzamiento es un hito de gobernanza, no una entrega de ingeniería. La puerta de lanzamiento lee
los registros que las puertas anteriores produjeron y se niega a abrirse mientras alguno falte o
esté obsoleto: un registro de caso de uso actual; un registro de diseño firmado; conjuntos de datos
admitidos; un informe de prueba contra el plan congelado; problemas abiertos por debajo de la
severidad acordada o aceptados por un aceptador nombrado; evaluaciones de impacto completadas;
fichas e instrucciones de uso regeneradas; monitoreo configurado (ver
[capítulo 15](/bok/governing-deployment#operating-the-system)); un retroceso probado; operadores
capacitados. Los revisores se nombran con anticipación: propietario del producto, ingeniería, el
ingeniero de gobernanza de IA, seguridad, privacidad y, para los niveles altos, legal y el validador
independiente. El resultado es un registro de sí/no firmado con sus condiciones, presentado contra
la entrada del registro. El responsable del despliegue ejecuta su propia
[revisión de puesta en marcha](/bok/governing-deployment#the-go-live-review) además (capítulo 15).
[Lanzamiento en etapas](/patterns/staged-rollout-rollback-criteria), cada una con criterios de
salida del plan de prueba: **sombra** (el sistema se ejecuta en entradas en vivo y sus salidas se
registran, no se usan), **canario** (una pequeña parte del tráfico), un **piloto limitado**, luego
disponibilidad general. En la UE, la investigación, las pruebas y el desarrollo antes de la
introducción en el mercado se encuentran fuera del Reglamento de IA, excepto las pruebas en
condiciones reales [37]; esas pruebas se rigen por el Art. 60, que después del Omnibus cubre
sistemas del Anexo III y productos de la Sección A del Anexo I, con un nuevo Art. 60a que permite a
los estados miembros permitirlo para productos de la Sección B [17].

### ### Conformidad del Reglamento de IA de la UE, en orden

Para sistemas de alto riesgo, la puerta de lanzamiento lleva una secuencia legal. Después del
Omnibus Digital, los deberes de alto riesgo se aplican a sistemas del Anexo III desde el 2 de
diciembre de 2027 y a productos del Anexo I desde el 2 de agosto de 2028 [38].

| Paso | Artículo | Artefacto | Producido por |
|---|---|---|---|
| 1. Sistema de gestión de la calidad en vigor | `Art. 17` | Procedimientos QMS, versionados | Proveedor |
| 2. Documentación técnica elaborada | `Art. 11`, Anexo IV | El fichero técnico | Pipeline y autores nombrados |
| 3. Evaluación de la conformidad | `Art. 43`, Anexo VI o VII | Registro de control interno, o certificado de organismo notificado | Proveedor, u organismo notificado |
| 4. Declaración UE de conformidad | `Art. 47`, Anexo V | Declaración firmada | Proveedor |
| 5. Marcado CE | `Art. 48` | Marcado CE físico o digital, con el número del organismo notificado donde uno estuvo implicado | Proveedor |
| 6. Registro | `Art. 49`, `Art. 71` | Entrada en la base de datos de la UE | Proveedor |
| 7. Introducción en el mercado y monitoreo | `Art. 72` | Plan de vigilancia poscomercialización en operación | Proveedor |

**Anexo VI o Anexo VII.** Los puntos 2 a 8 del Anexo III siguen el control interno bajo el Anexo VI,
sin organismo notificado [39]. Bajo el Anexo VI el proveedor verifica que su sistema de gestión de
la calidad cumple con el Art. 17, examina la documentación técnica contra los requisitos, y verifica
que el proceso de diseño y desarrollo y el monitoreo poscomercialización son consistentes con esa
documentación [39]. El punto 1 del Anexo III (biometría) puede usar el Anexo VI o el Anexo VII solo
donde el proveedor ha aplicado normas armonizadas o especificaciones comunes; de lo contrario, debe
seguir el Anexo VII, en el cual un organismo notificado evalúa el sistema de gestión de la calidad y
la documentación técnica, con acceso completo a los conjuntos de datos de entrenamiento, validación
y prueba, emite un certificado y debe ser informado de cambios [39]. Ninguna norma armonizada había
sido citada en el Diario Oficial en la última comprobación que este libro registra (2026-09-19; ver
[qué aún no está armonizado](/bok/regulatory-map#what-is-not-harmonised-yet)) [40]; mientras eso se
mantenga, un proveedor de biometría que planifique hoy debe planificar para un organismo notificado.
Los productos del Anexo I pasan por su procedimiento de conformidad sectorial, y el Omnibus permite
que los organismos notificados bajo esa legislación evalúen los requisitos de IA si solicitan
designación antes del 28 de enero de 2028 [17].

**Declaración, marcado y registro.** La declaración de conformidad de la UE sigue el Anexo V y se
conserva durante 10 años; el marcado CE se coloca de forma visible, legible e indeleble, o
digitalmente para sistemas proporcionados digitalmente [41]. Antes de la introducción en el mercado,
el proveedor registra los sistemas del Anexo III en la base de datos de la UE, excepto el punto 2
(infraestructura crítica), que se registra a nivel nacional; también se registran los sistemas que
el proveedor ha considerado no de alto riesgo conforme al art. 6(3); y los sistemas de garantía del
cumplimiento del Derecho, migración, asilo y fronteras van a una sección no pública [42]. Tras el
Omnibus, el registro del art. 6(3) solicita menos datos, y las pymes y medianas empresas pequeñas
pueden proporcionar la documentación técnica en una forma simplificada que establece la Comisión
[17]. El movimiento de ingeniería es generar la carga útil de la base de datos a partir de la
entrada del registro, de modo que el registro y el
[**Registro de Agentes**](/patterns/agent-registry) no puedan divergir.

### ### Modificación sustancial

Una **modificación sustancial** es un cambio después de la introducción en el mercado "que no fue
previsto ni planificado en la evaluación de la conformidad inicial realizada por el proveedor y que,
como resultado, afecta al cumplimiento del sistema de IA con los requisitos establecidos en el
Capítulo III, Sección 2, o da lugar a una modificación de la finalidad prevista para la que el
sistema de IA ha sido evaluado" [5]. Desencadena una nueva evaluación de la conformidad (art.
43(4)); para sistemas que continúan aprendiendo después del lanzamiento, los cambios que el
proveedor predeterminó en la evaluación inicial y describió en la documentación técnica no son
modificaciones sustanciales [39], por lo que el Anexo IV punto 2(f) solicita esos cambios
predeterminados y las soluciones técnicas que mantienen el sistema conforme a medida que cambia [9].

Escribe el envolvente predeterminado como código: fuentes de datos permitidas, cadencia de
reentrenamiento, pisos de métricas y rangos de umbral. Luego clasifica cada cambio en modelo, datos,
prompts, herramientas o umbrales en la fusión: dentro del envolvente (vuelve a ejecutar las
puertas), fuera de él pero sin afectar el cumplimiento (vuelve a ejecutar las puertas y registra el
razonamiento), o una posible modificación sustancial (detente, revisión legal, reevaluación). Un
modelo reentrenado es un nuevo lanzamiento. Pasa las mismas puertas, obtiene una nueva versión en el
registro y regenera sus fichas; no hereda los veredictos de su predecesor. Para agentes, el capítulo
23 pone
[los cambios de prompt y system-prompt bajo control de cambios](/bok/governing-agents#prompts-as-configuration-under-change-control).

## El fichero técnico

### ### Anexo IV, elemento por elemento

El art. 11 requiere que la documentación técnica de un sistema de alto riesgo se elabore antes de su
introducción en el mercado y se mantenga actualizada, con al menos el contenido del Anexo IV [9]. La
mayor parte del Anexo IV ya es producida por un pipeline gobernado; el resto es criterio que solo
una persona puede proporcionar. La tabla lo divide.

| Elemento del Anexo IV | Lo que pide | Fuente del pipeline | Lo que una persona aún debe escribir |
|---|---|---|---|
| 1(a) | Finalidad prevista, proveedor, versión | Registro de caso de uso; entrada del registro | La declaración de finalidad prevista en sí |
| 1(b) | Interacción con otro hardware, software y sistemas de IA | AIBOM; diagrama de arquitectura | Supuestos de integración |
| 1(c) | Versiones de software y firmware; requisitos de actualización | AIBOM; ficheros de bloqueo | Ninguno más allá de la revisión |
| 1(d) | Formas en que se introduce en el mercado | Manifiesto de lanzamiento | Descripción de distribución |
| 1(e) | Hardware en el que se ejecuta | Manifiestos de despliegue | Ninguno más allá de la revisión |
| 1(f) | Fotografías, cuando es un componente del producto | No aplicable a la mayoría del software | Documentación del producto |
| 1(g) | La interfaz de usuario proporcionada al responsable del despliegue | Capturas de pantalla de pruebas de integración | Descripción de uso |
| 1(h) | Instrucciones de uso | Generadas a partir del registro de caso de uso, ficha de modelo y registro de uso indebido | Limitaciones y orientación de supervisión, en lenguaje claro |
| 2(a) | Métodos de desarrollo, sistemas preentrenados, herramientas de terceros | Registro de entrenamiento; AIBOM | Por qué se eligieron estos |
| 2(b) | Especificaciones de diseño, decisiones clave, razonamiento, compensaciones | Registro de diseño; registro de decisiones | El razonamiento y los supuestos |
| 2(c) | Arquitectura y recursos computacionales | Registro de entrenamiento (cómputo); diagrama de arquitectura | Ninguno más allá de la revisión |
| 2(d) | Fichas de datos: datos de entrenamiento, procedencia, selección, etiquetado, limpieza | Registros de admisión; fichas de datos; linaje | Los supuestos sobre lo que miden los datos |
| 2(e) | Evaluación de las medidas de supervisión humana | Diseño de supervisión; resultados de pruebas de bucle humano | La evaluación |
| 2(f) | Cambios predeterminados y cómo se mantiene el cumplimiento | Envolvente como código | La justificación del envolvente |
| 2(g) | Validación y pruebas: datos, métricas, impactos discriminatorios, informes de pruebas fechados y firmados | Plan de pruebas; resultados de evals; informes de pruebas | Firmas de las personas responsables |
| 2(h) | Medidas de ciberseguridad | Resultados de pruebas de seguridad; [modelo de amenaza](/patterns/ai-threat-model); [registros de firma](/patterns/model-artefact-integrity) | Riesgo de seguridad residual |
| 3 | Capacidades, limitaciones, precisión para grupos específicos, resultados no intencionados previsibles | Ficha de modelo; evals de subgrupos; registro de uso indebido | Interpretación de los límites |
| 4 | Por qué las métricas de rendimiento son apropiadas | Plan de pruebas | El argumento |
| 5 | El sistema de gestión de riesgos | Registro de riesgos | Criterio de riesgo residual |
| 6 | Cambios relevantes durante el ciclo de vida | Control de versiones; historial del registro | Ninguno más allá de la revisión |
| 7 | Normas armonizadas aplicadas, u otras soluciones utilizadas | Fichero de correspondencia | Descripción de las soluciones (ninguna norma citada en el DO en la última comprobación) |
| 8 | Una copia de la declaración de conformidad de la UE | Generada a partir de la evidencia | Firma |
| 9 | El sistema de vigilancia poscomercialización, con su plan | Configuración de monitoreo | Los disparadores y respuestas del plan |

El plan de vigilancia poscomercialización es parte de este fichero, no un documento separado (art.
72(3)) [43]. Construye el fichero como se construye el código: un trabajo de documentación lo
ensambla en cada candidato de lanzamiento, falla cuando una fila generada está obsoleta o una fila
escrita es anterior a la versión del modelo que describe, y emite el resultado como
[**Evidencia Legible por Máquina (OSCAL)**](/patterns/machine-readable-evidence-oscal) junto con una
representación legible por humanos.

### ### Fichas de modelo, fichas de sistema y fichas de datos

Los documentos se superponen y responden preguntas diferentes para lectores diferentes.

| Documento | Describe | Lector principal | Completado a partir de |
|---|---|---|---|
| Ficha de modelo | Un modelo entrenado: uso previsto, evaluación entre grupos y condiciones, limitaciones [44] | Integradores, responsables del despliegue, auditores | Resultados de evals; AIBOM |
| Ficha de sistema | El sistema desplegado: modelos, prompts, recuperación, herramientas, guardrails y supervisión | Responsables del despliegue, autoridades, el público | Registro; configuración de guardrail; resultados de red team |
| Ficha de datos (ficha de datos) | Un conjunto de datos: motivación, composición, recopilación, preprocesamiento, usos, distribución, mantenimiento [25] | Propietarios de datos, constructores de modelos, auditores | Registro de admisión; linaje |
| Instrucciones de uso | Lo que un responsable del despliegue necesita para usar correctamente un sistema de alto riesgo (art. 13) [14] | Responsables del despliegue | Registro de caso de uso; ficha de modelo; registro de uso indebido |
| Archivo técnico | Todo lo anterior más gestión de riesgos, normas, declaración y plan de monitoreo [9] | Autoridades; organismos notificados | Todo lo anterior |

La mayoría del riesgo está en el sistema, no en el modelo crudo
([capítulo 01](/bok/definition#the-object-of-governance)), por lo que una ficha de modelo sola
describe insuficientemente cualquier cosa con herramientas o recuperación. Genera cada ficha a
partir de los mismos registros, como en el patrón
[**Ficha de Modelo como Evidencia de Control**](/patterns/model-card-as-control-evidence), de modo
que la ficha que lee un auditor es la ficha que produjo la producción.

### ### El lado del proveedor de GPAI

Un proveedor de un modelo de IA de uso general tiene su propio conjunto de documentación conforme al
art. 53: documentación técnica conforme al Anexo XI para la Oficina de IA y autoridades nacionales,
información conforme al Anexo XII para proveedores posteriores, una política de derechos de autor y
un resumen público del contenido de entrenamiento en la plantilla de la Oficina de IA [20]. El Anexo
XI cubre arquitectura y número de parámetros, metodología de entrenamiento, los datos de
entrenamiento (tipo, procedencia, curación, métodos para detectar fuentes inadecuadas y sesgos), el
cómputo y el consumo de energía conocido o estimado; para modelos con riesgo sistémico añade
estrategias de evaluación, pruebas adversariales y arquitectura del sistema [12].

Quién es un proveedor de GPAI es en parte una cuestión de cómputo. El criterio indicativo de la
Comisión es cómputo de entrenamiento superior a 10^23 FLOP con capacidad de generar lenguaje, texto
a imagen o texto a vídeo; un modificador posterior es indicativamente el proveedor del modelo
modificado cuando su cómputo de modificación supera un tercio del original; y la presunción de
riesgo sistémico comienza en 10^25 FLOP, con notificación a la Comisión en dos semanas [11]. Pon
estos umbrales en el registro de selección de modelo de la revisión de diseño, porque un plan de
ajuste fino puede cambiar el rol legal de la organización.

Tres instrumentos de la Comisión convierten los deberes en artefactos. El Código de Prácticas de
GPAI (10 jul 2025, voluntario) incluye, en su capítulo de Transparencia, un Formulario de
Documentación de Modelo [45] que reúne la información de los Anexos XI y XII en un solo lugar y
marca cada elemento para proveedores posteriores, la Oficina de IA o autoridades nacionales; el
Código pide que la documentación de cada versión se conserve durante 10 años [46]. El resumen del
contenido de entrenamiento utiliza una plantilla que es obligatoria conforme al art. 53(1)(d): cubre
información general, fuentes de datos (incluyendo datos públicos, privados, rastreados, de usuario y
sintéticos) y procesamiento de datos, enumera los 10 dominios rastreados principales (5% o 1.000, el
que sea menor, para pymes), se actualiza cada seis meses o antes después de una actualización
material, y debe existir antes del 2 ago 2027 para modelos introducidos en el mercado antes del 2
ago 2025 [28]. Para modelos de riesgo sistémico, el capítulo de Seguridad y Protección del Código
añade un Informe de Seguridad y Protección del Modelo, creado antes de que el modelo se introduzca
en el mercado y mantenido actualizado (Compromiso 7) [46]. Implicación de ingeniería: el Formulario
de Documentación de Modelo se genera a partir del registro de entrenamiento y el AIBOM, y el resumen
del contenido de entrenamiento, incluyendo su lista de dominios, es una consulta sobre los registros
de admisión y los registros de rastreo, no un ejercicio de redacción.

### ### Decisiones de lanzamiento de peso abierto

El lanzamiento es un gradiente, no un interruptor. Solaiman describe seis niveles de acceso:
completamente cerrado, acceso gradual o por fases, acceso alojado, acceso en la nube o por API,
acceso descargable y completamente abierto [47]. El lanzamiento por fases, como se practicó con
GPT-2 en 2019, deja tiempo entre lanzamientos para el análisis de riesgos y beneficios a medida que
crece la capacidad [48]. Para pesos abiertos, la decisión es irreversible de una manera que nada más
en este capítulo lo es: un modelo lanzado no puede ser recuperado, parcheado o colocado detrás de un
kill switch. El registro de lanzamiento debe por lo tanto llevar la capacidad y las evals de uso
dual, el registro de mal uso, la respuesta a "¿qué haríamos si esto se usa indebidamente, dado que
no podemos retirarlo?", y la elección de licencia. La definición de la Open Source Initiative
requiere las libertades de usar, estudiar, modificar y compartir, y trata los datos, la información,
el código y los parámetros como la forma preferida para la modificación [49]; una licencia que
restrinja campos de uso por lo tanto no la cumple.

Las exenciones legales para el código abierto son más estrechas de lo que parecen.

- El Reglamento de IA no se aplica a sistemas de IA lanzados bajo licencias libres y de código
  abierto, a menos que se coloquen en el mercado o se pongan en servicio como sistemas de alto
  riesgo, como prácticas prohibidas o como sistemas del Art. 50 (Art. 2(12)) [37].
- Un modelo GPAI bajo una licencia libre y de código abierto con parámetros públicos está exento
  solo de los deberes de documentación de los Anexos XI y XII; la política de derechos de autor y el
  resumen del contenido de entrenamiento siguen siendo aplicables, y ninguna exención se aplica a
  modelos con riesgo sistémico (Art. 53(2)) [20][11].
- Las directrices de la Comisión tratan la monetización como descalificadora: la doble licencia
  (gratuita para uso académico, de pago para uso comercial), el soporte de pago que es necesario
  para usar el modelo, y el procesamiento de datos de usuarios para ganancia comercial se dan como
  ejemplos [50].

### Conservación de registros

Para sistemas de alto riesgo, el proveedor mantiene la documentación técnica, la documentación del
sistema de gestión de la calidad, los cambios aprobados por organismos notificados, sus decisiones y
la declaración de conformidad de la UE a disposición de las autoridades nacionales durante 10 años
después de la introducción en el mercado (Art. 18), y mantiene los registros que el sistema genera
automáticamente, cuando están bajo su control, durante un período apropiado para la finalidad
prevista de al menos seis meses, a menos que otra ley disponga lo contrario; las instituciones
financieras los mantienen dentro de su documentación de servicios financieros (Art. 19) [51]. Los
responsables del despliegue llevan un deber de registro paralelo, cubierto en
[capítulo 15](/bok/governing-deployment#records-retention).

Trata la retención como código: cada clase de evidencia lleva una regla de retención vinculada a su
obligación, los registros firmados van al almacenamiento de escritura única, una retención legal
anula la eliminación, y el piso de registro de seis meses es un piso, no un valor predeterminado,
reconciliado con la limitación de almacenamiento del RGPD para datos personales en los registros. Un
horizonte de 10 años sobrevive a la mayoría de las herramientas, lo que argumenta a favor de
formatos abiertos (JSON, `OSCAL`).

### Divulgaciones públicas

Se deben diferentes divulgaciones a diferentes audiencias, y cada una tiene algo que no debe
publicarse.

| Audiencia | Lo que reciben | Canal | Lo que retener |
|---|---|---|---|
| Autoridad u organismo notificado | El archivo técnico completo, registros de prueba, acceso a conjuntos de datos bajo el Anexo VII | Bajo solicitud; evaluación de la conformidad | Nada que la ley requiera; marca los secretos comerciales como confidenciales |
| Responsable del despliegue | Instrucciones de uso (Art. 13); fichas de modelo y sistema; información del Anexo XII para GPAI | Contrato; portal de documentación | Detalle de seguridad explotable; pesos |
| Personas afectadas | Que se utiliza IA, y cómo impugnar u obtener explicación (ver [capítulo 15](/bok/governing-deployment#external-communications)) | Interfaz del producto; avisos | Nada sobre su propio caso que un derecho les otorgue |
| El público | Entrada en la base de datos de la UE; resumen del contenido de entrenamiento de GPAI; documentación AB 2013; resúmenes de auditoría de sesgos; evaluaciones de impacto publicadas | Sitio web; registros públicos | Detalle de explotación del equipo rojo; datos personales; configuración de seguridad |

Dos divulgaciones no comunitarias muestran el patrón. La Ley Local 144 de la Ciudad de Nueva York
requiere que los empleadores que utilicen una herramienta de decisión de empleo automatizada
realicen una auditoría de sesgos por un auditor independiente dentro del año anterior, publiquen un
resumen de sus resultados, incluida la fuente de los datos utilizados, y notifiquen a los candidatos
10 días hábiles antes del uso [52]. La Directiva de Canadá sobre Toma de Decisiones Automatizada
requiere que las instituciones federales publiquen los resultados finales de su evaluación de
impacto algorítmico en el Portal de Gobierno Abierto antes de que el sistema entre en producción
[53].

> **En la práctica (ilustrativo)**
> Un proveedor que preparaba un sistema del Anexo III para la fecha del 2 de diciembre de 2027
> enumeró los 23 elementos del Anexo IV en un archivo, una fila cada uno, con la fuente del pipeline
> y un autor nombrado. La mayoría de las filas resultaron ser ensambladas a partir de registros que
> el pipeline ya había emitido; el resto eran justificación, juicios de riesgo residual y firmas. El
> trabajo de documentación se ejecutó en cada candidato de lanzamiento y falló dos veces en su
> primer mes: una vez en una ficha de modelo más antigua que el modelo, una vez en un informe de
> prueba que nadie había firmado. Ambas fallas habrían salido a la superficie un año después, frente
> a un organismo notificado.

## Evaluaciones de impacto comparadas

Un único sistema puede desencadenar varias evaluaciones de impacto a la vez. Se superponen en hechos
(quién se ve afectado, qué podría salir mal, qué controles existen) y difieren en ley,
desencadenante, revisor y audiencia. La respuesta de ingeniería es una base de hechos compartida con
varias vistas, no cinco documentos que se desvíen.

| Evaluación | Realizado por | Desencadenante | Cuándo | Revisado o firmado por | Publicado | Re-evaluado cuando |
|---|---|---|---|---|---|---|
| Evaluación de impacto del sistema de IA (ISO/IEC 42005) | La organización que desarrolla o proporciona el sistema | Política organizacional; ISO/IEC 42001 A.5 | A lo largo del ciclo de vida, desde el diseño [54] | Según el sistema de gestión de IA de la organización | Voluntario | Actualizado según sea necesario a lo largo del ciclo de vida [54] |
| EIPD (RGPD Art. 35) | El responsable del tratamiento | Tratamiento probable que resulte en alto riesgo; casos obligatorios en Art. 35(3) | Antes del tratamiento [16] | Responsable del tratamiento, con el consejo del DPD; la autoridad de supervisión si el alto riesgo persiste (Art. 36) | No requerido | Cuando el riesgo del tratamiento cambia (Art. 35(11)) [16] |
| FRIA (Reglamento de IA Art. 27) | Responsables del despliegue que son organismos públicos o proporcionan servicios públicos, y responsables del despliegue de sistemas del Anexo III 5(b) y (c) | Desplegar un sistema de alto riesgo del Anexo III (no punto 2) | Antes del primer uso [55] | Los resultados se notifican a la autoridad de vigilancia del mercado | No requerido públicamente | Cuando cualquier elemento evaluado cambia [55] |
| Evaluación de impacto algorítmico (Canadá) | Institución federal | Sistema de decisión automatizada bajo la Directiva | Antes de la producción [53] | Aprobado internamente; revisión de expertos según el nivel de impacto | Sí, Portal de Gobierno Abierto | Según un cronograma, y cuando la funcionalidad o el alcance cambian [53] |
| Auditoría de sesgos (Ley Local 144 de NYC) | Auditor independiente, para el empleador o agencia | Usar una herramienta de decisión de empleo automatizada en NYC | Dentro de un año antes del uso [52] | Auditor independiente | Sí, resumen de resultados | Cada año [52] |
| Validación de modelo independiente (SR 26-2, SS1/23) | Función de validación independiente del desarrollo | Uso de modelo en un banco supervisado | Generalmente antes del primer uso [7] | Validadores con capacidad para efectuar cambios | No | Periódicamente, y en cambio material [7] |

### Dimensiones que hacen los impactos comparables

Puntúa cada impacto en los mismos ejes sea cual sea la evaluación que alimenta: **severidad** (qué
tan malo para la persona afectada), **escala** (cuántas personas), **reversibilidad** (si el daño
puede deshacerse, y qué tan rápido), **duración** y **probabilidad**. Las dimensiones no se inventan
aquí. La Directiva de Canadá define sus niveles de impacto por ellas, desde el nivel I, donde los
impactos probablemente sean "poco o ninguno, fácilmente reversibles y breves", hasta el nivel IV,
donde probablemente sean "muy altos, irreversibles y perpetuos" [53]. La FRIA pide las categorías
afectadas, los riesgos específicos de daño, las medidas de supervisión y los arreglos de mitigación
y reclamación (Art. 27(1)) [55]; la EIPD pide el tratamiento, su necesidad y proporcionalidad, los
riesgos y las medidas (Art. 35(7)) [16]. Un registro con estos campos responde a ambos, y Art. 27(4)
permite que una FRIA se base en una EIPD que cubra el mismo terreno [55].

### Realizar versus revisar

El ejecutor es dueño de los hechos; el revisor los cuestiona. Un revisor que no escribió la
evaluación verifica seis cosas: el alcance coincide con el registro de caso de uso actual; los
grupos afectados incluyen personas que nunca usan el sistema; cada calificación de riesgo cita
evidencia (un id de eval, un informe de prueba, un perfil de datos), no una opinión; cada mitigación
se vincula a un control que se ejecuta; el riesgo residual es aceptado por alguien con autoridad
para aceptarlo; y los desencadenantes de re-evaluación se escriben como condiciones que un pipeline
puede evaluar. Una evaluación que falla en cualquiera de los seis vuelve atrás, sin importar cuán
bien escrita esté.

### Desencadenantes de re-evaluación

Codifica los desencadenantes para que el registro, no un recordatorio de calendario, reabre la
evaluación: una finalidad prevista nueva o ampliada; reentrenamiento en una nueva fuente de datos;
una nueva población afectada, idioma o jurisdicción; un cambio de umbral; un incidente o casi
incidente ([capítulo 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite)); una
señal de monitoreo fuera de su banda; nueva ley o guía; y una fecha de revisión programada. El
patrón [**FRIA-as-Code**](/patterns/fria-as-code#re-assessment-triggers-as-code) ya hace esto para
la FRIA y su referencia cruzada de EIPD; la misma estructura se generaliza, como
Impact-Assessment-as-Code, a cada evaluación en la tabla.

> **En la práctica (ilustrativo)**
> El modelo de límite de crédito del ejemplo de caso de uso se encontraba bajo cuatro evaluaciones a
> la vez: una EIPD (el banco como responsable del tratamiento), una FRIA (el banco como responsable
> del despliegue de un sistema del Anexo III 5(b)), una evaluación de impacto realizada por el
> equipo del modelo siguiendo líneas ISO/IEC 42005, y validación independiente. El equipo mantuvo
> una base de hechos (grupos afectados, daños puntuados en las cinco dimensiones, controles con sus
> ids de eval) y renderizó cuatro vistas desde ella. Cuando el reentrenamiento agregó una nueva
> fuente de datos, el cambio de linaje activó el desencadenante para los cuatro en la misma
> ejecución del pipeline, y los revisores vieron un diff en lugar de cuatro documentos nuevos.

**Correspondencias:** Reglamento de IA de la UE Art. 3(12), 3(13) y 3(23), Art. 9, 10, 11 y Anexo
IV, Art. 13, 17, 18, 19, 25, 27, 43 y Anexos VI y VII, Art. 47 a 49, Art. 53 y Anexos XI y XII, Art.
72 · RGPD Art. 35 · ISO/IEC 42001 (A.5, A.6, A.7), ISO/IEC 42005, ISO/IEC 5338, ISO/IEC 5259 · NIST
AI RMF (Map, Measure) · Capa 01 Govern-as-Code a Capa 05 Assurance & Continuous Compliance. Los
mapeos son ilustrativos, no una afirmación de conformidad.

## Lo que puedes hacer esta semana

1. Escribe el registro de caso de uso para el sistema de mayor riesgo que tengas en desarrollo,
   incluyendo sus usos fuera del alcance y tu apetito de falsos positivos frente a falsos negativos,
   y almacénalo en la entrada del registro.
1. Congela el plan de prueba para su próxima versión en el repositorio: métricas, umbrales,
   subgrupos, ejecuciones repetidas y el tamaño de muestra que cada umbral necesita para ser
   distinguible de un fallo.
1. Elige un conjunto de datos de entrenamiento y rellena su registro de admisión (base o licencia,
   comprobación de reserva, procedencia, propietario, administrador), luego haz que el trabajo de
   entrenamiento rechace conjuntos de datos sin uno.
1. Mapea tu documentación actual a la tabla del Anexo IV anterior y marca cada fila generada,
   escrita o faltante.
1. Lista cada evaluación de impacto que el sistema desencadena y traslada sus hechos compartidos a
   un registro, con los disparadores de reevaluación escritos como condiciones.

## Sources

[1] ISO/IEC 5338:2023, AI system life cycle processes. ISO/IEC. 2023. https://www.iso.org/standard/81118.html (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (Annex A.5 impact assessment, A.6 AI system life cycle, A.7 data for AI systems). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] AI Risk Management Framework 1.0 (NIST AI 100-1; MAP 1.1 intended purposes and context documented, MAP 1.5 risk tolerances, MAP 1.6 system requirements, MEASURE 2.1 test sets and metrics documented, MEASURE 2.5 validity and reliability). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system: design control and design verification; examination, test and validation procedures before, during and after development; data management). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[6] Rules of Machine Learning: Best Practices for ML Engineering (Rule #1: "Don't be afraid to launch a product without machine learning"). Google for Developers. n.d. (accessed 2026-09-24). https://developers.google.com/machine-learning/guides/rules-of-ml (verified: primary)
[7] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; generative and agentic AI models out of scope; effective challenge; conceptual soundness, ongoing monitoring, outcomes analysis; model use beyond intended purpose). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (responsibilities along the AI value chain; 25(1)(c) a third party that modifies the intended purpose of a system so that it becomes high-risk is considered its provider). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 11 and Annex IV (technical documentation: 1(a) to (h) general description incl. instructions for use; 2(a) to (h) development process, design choices and trade-offs, compute, datasheets and provenance, oversight, pre-determined changes, validation and testing with dated and signed reports, cybersecurity; 3 to 9 capabilities and limitations, metrics, risk management, changes, standards, declaration, post-market monitoring). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_IV (verified: primary)
[10] Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead (Cynthia Rudin). Nature Machine Intelligence. 2019. https://www.nature.com/articles/s42256-019-0048-x (verified: primary)
[11] General-Purpose AI Models in the AI Act: Questions & Answers (indicative GPAI criterion: training compute above 10^23 FLOP and generation of language, text-to-image or text-to-video; a downstream modifier is indicatively the provider when modification compute exceeds a third of the original's; 10^25 FLOP systemic-risk threshold; notification within two weeks; Art. 53(2) open-source conditions). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annexes XI and XII (GPAI technical documentation: architecture and parameters, training methodology, training data provenance and curation, compute, known or estimated energy consumption; Section 2 for systemic-risk models: evaluation strategies, adversarial testing, system architecture; Annex XII information for downstream providers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[13] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2)(b) risks under reasonably foreseeable misuse; 9(8) testing against prior defined metrics and probabilistic thresholds, before placing on the market). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and instructions for use; 13(3)(b)(iii) known or foreseeable circumstances, incl. reasonably foreseeable misuse, that may lead to risks). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[15] Ethics Guidelines for Trustworthy AI (High-Level Expert Group on AI; oversight through human-in-the-loop, human-on-the-loop and human-in-command approaches). European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[16] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing; Art. 35 data protection impact assessment (35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes); Art. 36 prior consultation. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a replaces the deleted Art. 10(5) for special-category data in bias detection; simplified technical documentation for SMEs and small mid-caps under Art. 11(1); Annex VIII Section B points 7 and 9 deleted for Art. 6(3) registrations; Art. 43(3) sectoral notified bodies to apply for designation by 28 Jan 2028; Art. 60 scope (Annex III and Annex I Section A) and new Art. 60a (Annex I Section B)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[18] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[19] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI provider obligations: (a) Annex XI documentation, (b) Annex XII information for downstream providers, (c) copyright policy incl. reservations of rights, (d) public summary of training content on the AI Office template; 53(2) open-source exemption from (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[21] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance: 10(2) practices, 10(3) relevant, sufficiently representative, free of errors and complete, 10(4) specific setting of use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[22] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[23] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[24] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[25] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[26] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[27] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[28] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data; top 10% of scraped domains, for SMEs 5% or 1,000; six-monthly update). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[29] ISO/IEC TR 29119-11:2020, Software testing, Part 11: Guidelines on the testing of AI-based systems. ISO/IEC. 2020. https://www.iso.org/standard/79016.html (verified: primary)
[30] ISO/IEC TR 24029-1:2021 and ISO/IEC 24029-2:2023, Robustness of neural networks (Part 1 overview; Part 2 methodology for the use of formal methods). ISO/IEC. 2021–2023. https://www.iso.org/standard/79804.html (verified: primary)
[31] Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations (Evan Miller; arXiv 2411.00640). arXiv. 2024-11-01. https://arxiv.org/abs/2411.00640 (verified: primary)
[32] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.; position, verbosity and self-enhancement biases; over 80% agreement with human preferences; arXiv 2306.05685). arXiv. 2023-06-09. https://arxiv.org/abs/2306.05685 (verified: primary)
[33] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[34] SS1/23, Model risk management principles for banks (five principles incl. independent model validation; UK-incorporated banks, building societies and PRA-designated investment firms with internal-model approval; addresses AI and machine-learning techniques; first published 17 May 2023, in effect from 17 May 2024; current version published and effective 23 Apr 2026 after low-impact amendments). Bank of England, Prudential Regulation Authority. 2026-04-23. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[35] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[36] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[37] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 2 (2(8) research, testing and development before placing on the market excluded, except testing in real-world conditions; 2(12) systems under free and open-source licences excluded unless high-risk, Art. 5 or Art. 50). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_2 (verified: primary)
[38] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 43 and Annexes VI and VII (internal control for Annex III points 2 to 8; Annex VI or VII for point 1 where harmonised standards or common specifications are applied, Annex VII otherwise; Annex I products under sectoral procedures; 43(4) new assessment on substantial modification, pre-determined changes excepted; Annex VII notified-body access to training, validation and testing data and control of changes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_43 (verified: primary)
[40] CEN-CENELEC JTC 21 standards tracker (no AI Act harmonised standard cited in the Official Journal, so no Art. 40 presumption of conformity; tracker updated 29 Jun 2026; the book's regulatory map rechecked on 2026-09-19). CEN-CENELEC JTC 21 (via kla.digital). 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[41] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 47 and 48 (EU declaration of conformity per Annex V, kept for 10 years; CE marking affixed visibly, legibly and indelibly, digital marking for digitally provided systems, notified-body number where applicable). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_47 (verified: primary)
[42] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 49 (registration in the EU database before placing on the market; Annex III point 2 at national level; Art. 6(3) systems; public-authority deployers; non-public section for law enforcement, migration, asylum and border control). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_49 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 72 (post-market monitoring system; 72(3) the monitoring plan is part of the Annex IV technical documentation; as amended by Reg. (EU) 2026/1744, Commission guidance including a template by 2 Sep 2027). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_72 (verified: primary)
[44] Model Cards for Model Reporting (Mitchell et al.; arXiv 1810.03993). arXiv. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[45] The General-Purpose AI Code of Practice (published 10 Jul 2025; voluntary; Transparency chapter with a Model Documentation Form; Safety and Security chapter for systemic-risk models). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[46] EU AI Act: General-Purpose AI Code of Practice, final version (unofficial reader: Model Documentation Form marks items for downstream providers, AI Office or national authorities; documentation kept 10 years per version; Safety and Security chapter Commitment 7, a Safety and Security Model Report before placing a model on the market). code-of-practice.ai (Alexander Zacherl). 2025. https://code-of-practice.ai/ (verified: secondary)
[47] The Gradient of Generative AI Release: Methods and Considerations (Irene Solaiman; six levels of access from fully closed to fully open; arXiv 2302.04844). arXiv. 2023-02-05. https://arxiv.org/abs/2302.04844 (verified: primary)
[48] Release Strategies and the Social Impacts of Language Models (Solaiman et al.; GPT-2 staged release; arXiv 1908.09203). arXiv. 2019-08-24. https://arxiv.org/abs/1908.09203 (verified: primary)
[49] The Open Source AI Definition 1.0 (freedoms to use, study, modify and share; preferred form for modification covers data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[50] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; section 4.2.2, paras 82 to 84: monetisation defeats the open-source exceptions, e.g. dual licensing free for academic and paid for commercial use, paid support or services required to access or use the model, and processing of personal data other than strictly for model security). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 18 and 19 (provider keeps technical documentation, QMS documentation, notified-body decisions and the EU declaration for 10 years; automatically generated logs kept at least six months unless other law provides otherwise; financial institutions keep logs within financial-services documentation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[52] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; public summary incl. data source; notice 10 business days before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[53] Directive on Automated Decision-Making (6.1 algorithmic impact assessment completed, approved and published on the Open Government Portal before production, updated on a schedule and when functionality or scope changes; 6.3.7 expert review; Appendix B impact levels defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[54] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[55] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c), except point 2 systems; elements (a) to (f); results notified to the market surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
