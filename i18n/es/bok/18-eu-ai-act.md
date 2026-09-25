---
lang: es
source: bok/18-eu-ai-act.md
sourceHash: "27e0f6a82271ee4899688f462429d1cbc2f0599581148abdf4dbc5e2407b5ba6"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 18. El Reglamento de IA de la UE en un paso

> El Reglamento de IA de la UE, enmendado por el Omnibus Digital, leído de principio a fin: qué
> cubre, cómo clasifica el riesgo, quién lleva qué deber, y la fecha en que cada deber comienza a
> aplicarse.

## Cómo leer este capítulo

Este capítulo enseña la Ley; el [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus) la indexa.
Lee este para la lógica de la ley y el capítulo 08 para las filas de obligación completas. Cada
deber a continuación nombra el artefacto que lo evidencia y la capa del stack que lo produce.

El texto se lee contra la Regulación (UE) 2024/1689 [1] enmendada por la Regulación (UE) 2026/1744,
el Omnibus Digital sobre IA [2], y cada fecha está marcada a partir del 2026-09-24. Es una lectura
de ingeniero, no asesoramiento legal. El ingeniero construye el control y la evidencia; el abogado
confirma que la obligación fue leída correctamente (ver
[regulatory translation](/bok/the-role#regulatory-translation)). Los mapeos son ilustrativos, no una
afirmación de conformidad.

Las capas del stack nombradas a lo largo son las cinco del capítulo 04:
**1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

## La Ley y el Omnibus

El Reglamento de IA es una regulación de seguridad de productos con objetivos de derechos
fundamentales. Es directamente aplicable en cada Estado miembro, entró en vigor el 1 de agosto de
2024, y sus deberes se activan en etapas [1][2]. Cuatro ideas llevan todo el texto:

1. **Una puerta de definición.** ¿Es la cosa un sistema de IA, un modelo de IA de uso general
   (GPAI), o ninguno de los dos?
2. **Una escalera de riesgo.** ¿En qué peldaño pone la finalidad prevista del sistema?
3. **Un conjunto de roles de operador.** ¿Qué sombrero lleva tu organización para este sistema?
4. **Una línea de tiempo.** ¿A partir de qué fecha entra en vigor cada deber?

El **Omnibus Digital sobre IA** es la Regulación (UE) 2026/1744 del 8 de julio de 2026. Fue
publicada en el Diario Oficial el 24 de julio de 2026 y entró en vigor el tercer día después de la
publicación, 27 de julio de 2026 [2]. No reescribió la Ley. Movió las fechas de alto riesgo, añadió
dos prohibiciones e hizo cambios dirigidos que importan a un ingeniero (su homólogo de RGPD es una
propuesta separada, cubierta en
[el lado RGPD del Omnibus Digital](/bok/privacy-and-ai#the-gdpr-side-of-the-digital-omnibus),
capítulo 19):

| Cambio | Dónde | Qué significa para el ingeniero |
|---|---|---|
| Deberes de alto riesgo diferidos | `Art. 113(c)` | Anexo III desde 2027-12-02; Anexo I desde 2028-08-02 |
| Dos nuevas prohibiciones | `Art. 5(1)(ba)`, `(bb)` | Imágenes íntimas sin consentimiento y material de abuso sexual infantil, desde 2026-12-02 |
| Alfabetización en IA replanteada | `Art. 4` | «Tomar medidas para apoyar» la alfabetización; sin nivel garantizado |
| Base de datos de detección de sesgos | `Art. 4a` (`Art. 10(5)` eliminado) | Datos de categorías especiales para corrección de sesgos, con salvaguardas estrictas |
| «Componente de seguridad» estrechado | `Art. 3(14)`, `6(1a)` a `6(1c)` | Menos sistemas embebidos clasificados como alto riesgo |
| Alivio para PYME y pequeña empresa mediana (PEM) | `Arts. 11`, `17`, `63`, `99(6a)` | Documentación y QMS simplificados; multas más bajas |
| Cooperación en la cadena de valor | `Art. 25(2)`, `25(4)`, `99(4)(da)` | Los proveedores iniciales deben entregar documentación y acceso; el deber es multado |
| FRIA puede reutilizar la AIPD | `Art. 27(4)`, `27(5)` | Un registro de evaluación, referenciado de forma cruzada |
| La Oficina de IA supervisa algunos sistemas | `Arts. 75(1)`, {`75a`} a `75d` | Un segundo supervisor con poderes directos |
| Presunción de la Ley de Ciber-Resiliencia | `Art. 42(3)` | La conformidad de CRA cuenta para {`Art. 15`} ciberseguridad |
| Organismos notificados | `Arts. 28` a `30`, Anexo XIV | Solicitud única; un código de designación que nombra IA agéntica (`AIH 0401`) |

Todo lo anterior está en el texto enmendador [2]. Los números de artículo en el resto del capítulo
son los posteriores al Omnibus.

## Alcance y cobertura

### Quién está en el alcance

El artículo 2(1) alcanza a los proveedores que colocan sistemas de IA o modelos de IA de uso general
en el mercado de la UE, dondequiera que estén establecidos; a los responsables del despliegue en la
Unión; a los proveedores y responsables del despliegue en terceros países cuya salida del sistema se
utiliza en la Unión; a los importadores y distribuidores; a los fabricantes de productos que colocan
IA con su producto bajo su propio nombre; a los representantes autorizados de proveedores no
comunitarios; y a las personas afectadas en la Unión [1].

El alcance es extraterritorial de dos formas: por colocación y por salida [1]. La consecuencia de
ingeniería es un campo de registro. "¿Dónde está alojado?" no es la pregunta de alcance; "¿dónde se
utiliza su salida?" sí lo es. Un registro de agentes que registra solo la región de alojamiento no
puede responderla.

### Qué cuenta como sistema de IA

El artículo 3(1) define un **sistema de IA** como "un sistema basado en máquinas que está diseñado
para operar con distintos niveles de autonomía y que puede exhibir adaptabilidad después del
despliegue, y que, para objetivos explícitos o implícitos, deduce, a partir de la entrada que
recibe, cómo generar salidas tales como predicciones, contenido, recomendaciones o decisiones que
pueden influir en entornos físicos o virtuales" [1]. Las directrices de la Comisión leen la oración
como siete elementos (basado en máquinas; autonomía; posible adaptabilidad; objetivos; deducción;
salidas; influencia en entornos) y señalan que no todos los elementos tienen que estar presentes
tanto en la fase de construcción como en la de uso [3].

El elemento decisivo es la deducción. Las directrices excluyen sistemas basados en reglas definidas
únicamente por personas físicas, y nombran cuatro familias que calculan pero pueden seguir cayendo
fuera de la definición: sistemas para mejorar la optimización matemática, procesamiento básico de
datos, sistemas basados en heurísticas clásicas y sistemas de predicción simple [3]. Las directrices
no son vinculantes [3].

Para el ingeniero, el alcance es una decisión registrada, no una suposición. Cada entrada de
registro lleva `ai_system: true | false` y, cuando es falsa, el elemento que falla y el
razonamiento. Una llamada "no es un sistema de IA" sin razonamiento adjunto es lo primero que una
autoridad preguntará. Un **modelo de IA de uso general** es un objeto separado con su propia
definición (`Art. 3(63)`), cubierto a continuación; un modelo no es un sistema de IA por sí solo y
necesita componentes adicionales, como una interfaz de usuario, para convertirse en uno
(considerando 97) [1]. Lo que "IA" significa técnicamente, más allá de la prueba legal, es el tema
del [capítulo 11](/bok/ai-defined#four-definitions-compared).

### Lo que la Ley excluye

| Exclusión | Artículo | Qué vigilar |
|---|---|---|
| Militar, defensa o seguridad nacional | `Art. 2(3)` | La exclusión cubre sistemas utilizados *exclusivamente* para esos propósitos; un sistema de doble uso está dentro del alcance para sus otros usos |
| Autoridades públicas de terceros países y organizaciones internacionales en cooperación en materia de aplicación de la ley o judicial | `Art. 2(4)` | Solo con salvaguardas adecuadas para los derechos fundamentales |
| Investigación científica y desarrollo como único propósito | `Art. 2(6)` | El sistema o modelo debe estar específicamente desarrollado y puesto en servicio para ese propósito únicamente |
| Investigación, pruebas y desarrollo antes de la colocación en el mercado | `Art. 2(8)` | Las pruebas en condiciones reales no están cubiertas por la exclusión |
| Uso puramente personal y no profesional | `Art. 2(10)` | Elimina obligaciones del responsable del despliegue solo para personas físicas |
| Sistemas de IA libres y de código abierto | `Art. 2(12)` | No si se colocan en el mercado como de alto riesgo, o capturados por `Art. 5` o `Art. 50` |
| Productos bajo el Anexo I, Sección B (regímenes sectoriales) | `Art. 2(2)` | Post-Omnibus, solo `Art. 6(1)`, {`Art. 60a`} y {`Arts. 102`} a {`112`} se aplican |

Las primeras seis filas están en el texto original [1]; la fila de la Sección B es según se modificó
[2]. La ley de protección de datos de la Unión se aplica junto con la Ley en todos los casos
(`Art. 2(7)`).

## La escalera de riesgo

La Ley clasifica los sistemas de IA por finalidad prevista en cuatro escalones, y coloca los modelos
de IA de uso general en una pista separada. Un sistema puede estar en dos escalones a la vez: un
chatbot del Anexo III lleva tanto las obligaciones de alto riesgo como la obligación de divulgación
de `Art. 50`.

| Escalón | Prueba | Consecuencia | Artículos | Se aplica desde |
|---|---|---|---|---|
| Prohibida | La práctica está listada en `Art. 5` | No puede ser colocada en el mercado, puesta en servicio o utilizada | `Art. 5` | 2025-02-02; nuevos puntos 2026-12-02 |
| Alto riesgo | Componente de seguridad del Anexo I que requiere evaluación de terceros, o un uso del Anexo III no filtrado por `Art. 6(3)` | Requisitos de {`Arts. 8`} a {`15`}, obligaciones del proveedor y responsable del despliegue, evaluación de la conformidad | `Arts. 6` a `49` | 2027-12-02 (Anexo III); 2028-08-02 (Anexo I) |
| Transparencia | Interactúa con personas, genera contenido sintético, reconoce emociones, categoriza biométricamente, o produce ultrasuplantaciones | Divulgar, marcar, etiquetar | `Art. 50` | 2026-08-02 |
| Mínimo | Todo lo demás | Sin obligaciones específicas más allá de `Art. 4`; códigos voluntarios | `Arts. 4`, `95` | 2025-02-02 (`Art. 4` reformulado 2026-07-27) |
| Pista de IA de uso general | Generalidad del modelo; riesgo sistémico por capacidad, cómputo o designación | Obligaciones a nivel de modelo | `Arts. 51` a `56` | 2025-08-02; aplicación de la Comisión 2026-08-02 |

Las fechas son las de `Art. 113` según se modificó [1][2].

### Prácticas prohibidas (Artículo 5)

El artículo 5 es una lista de usos prohibidos, no una evaluación de riesgos. Si una práctica está en
la lista, ninguna mitigación la hace lícita. La lista ahora tiene diez puntos [1][2]:

| Punto | Práctica prohibida (parafraseada) | Excepción estrecha | Se aplica desde |
|---|---|---|---|
| `(a)` | Técnicas sublimales, manipuladoras o engañosas que distorsionan materialmente el comportamiento, causando o siendo probable que causen daño significativo | Ninguno | 2025-02-02 |
| `(b)` | Explotación de vulnerabilidades por edad, discapacidad o situación social o económica, con el mismo efecto | Ninguno | 2025-02-02 |
| `(c)` | Puntuación social que conduce a trato perjudicial injustificado o fuera de contexto | Ninguno | 2025-02-02 |
| `(d)` | Predicción del riesgo de delito basada únicamente en elaboración de perfiles o rasgos de personalidad | Apoyo a una evaluación humana basada en hechos objetivos y verificables | 2025-02-02 |
| `(e)` | Raspado no dirigido de imágenes faciales para construir bases de datos de reconocimiento | Ninguno | 2025-02-02 |
| `(f)` | Deducción de emociones en el trabajo o en la educación | Razones médicas o de seguridad | 2025-02-02 |
| `(g)` | Categorización biométrica para deducir rasgos sensibles como raza, creencias u orientación sexual | Conjuntos de datos adquiridos lícitamente; categorización de garantía del cumplimiento del Derecho | 2025-02-02 |
| `(h)` | Identificación biométrica remota en tiempo real en espacios públicos para garantía del cumplimiento del Derecho | Tres objetivos, con autorización previa (`Art. 5(2)` a `5(7)`) | 2025-02-02 |
| `(ba)` | Generar o manipular imágenes íntimas realistas de una persona identificable sin consentimiento explícito | Condiciones en {`Art. 5(1a)`}, {`5(1b)`} | 2026-12-02 |
| `(bb)` | Generar o manipular material de abuso sexual infantil (Directiva 2011/93/UE) | Defensa "sin derecho"; `Art. 5(1a)` | 2026-12-02 |

Los dos puntos del Omnibus llevan una prueba de ingeniería. Colocar tal generador en el mercado está
prohibido solo donde esa salida es su finalidad prevista, o donde la salida es "un resultado
razonablemente previsible y reproducible" y el sistema carece de "medidas técnicas de seguridad
razonables y adecuadas" para prevenirlo y corregir el uso indebido observado; el uso está prohibido
solo donde el responsable del despliegue lo utiliza para ese propósito [2]. La evidencia de que la
salvaguarda se mantiene es por lo tanto parte de la prueba legal. Las directrices de la Comisión
sobre las prohibiciones originales no son vinculantes [4]. La prohibición de raspado en el punto
`(e)` tiene un precedente de protección de datos en [el caso Clearview AI](/cases/clearview-ai).

Para la mayoría de organizaciones `Art. 5` son dos controles: una lista de exclusión de finalidades
prohibidas evaluada en la admisión ([Policy Card](/patterns/policy-card)), y para sistemas
generativos un [Runtime Guardrail](/patterns/runtime-guardrail) de salida probado por una
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite). Ambos dejan registros que un
regulador puede leer. Las infracciones se sitúan en el nivel de multa más alto (véase «Sanciones»).

> **En la práctica (ilustrativo)**
> Un equipo que enviaba una función de edición de imágenes trató el 2 de diciembre de 2026 como una
> puerta de lanzamiento, no un memorando legal. Agregó una suite adversarial de prompts de imágenes
> íntimas y seguridad de menores a la puerta de eval, estableció un umbral de tolerancia cero, e
> integró las decisiones de bloqueo del clasificador de salida en el almacén de evidencia bajo el id
> de obligación `EU-AIA-5-1-ba`. La primera ejecución falló en ediciones que aumentaban la
> exposición en fotos existentes. La corrección se envió antes de la fecha, y la ejecución exitosa,
> no una declaración de política, se convirtió en la evidencia de que la salvaguarda era "razonable
> y adecuada".

### Alto riesgo a través de productos (Anexo I)

Un sistema es de alto riesgo bajo {`Art. 6(1)`} cuando ambas condiciones se cumplen: es un
componente de seguridad de un producto, o es en sí mismo un producto, cubierto por la legislación de
armonización de la Unión en el Anexo I; y ese producto debe someterse a una evaluación de la
conformidad de terceros bajo esa legislación [1]. La Sección A del Anexo I cubre productos como
juguetes, ascensores, equipos de radio, dispositivos médicos y diagnósticos in vitro; la Sección B
cubre regímenes sectoriales como aviación civil y vehículos [1].

El Omnibus estrechó la ruta {[2]}. Un **componente de seguridad** debe ahora tener la finalidad
prevista de prevenir o mitigar riesgos para la salud y la seguridad, o ser uno cuya falla los pone
en peligro ({`Art. 3(14)`}). La IA utilizada únicamente para asistencia al usuario, optimización del
rendimiento, eficiencia, automatización, conveniencia o control de calidad no es un componente de
seguridad a menos que su falla ponga en peligro la salud y la seguridad ({`Art. 6(1a)`}, {`6(1b)`}).
Una evaluación de terceros requerida solo por razones no relacionadas con la seguridad, como el
espectro de radio, no cuenta ({`Art. 6(1c)`}). La maquinaria se trasladó a la Sección B, y los actos
delegados vencidos el 2 de agosto de 2027 pueden limitar obligaciones donde la ley de la Sección A
ya proporciona protección equivalente ({`Art. 2(13)`}). La ruta del Anexo I se aplica desde el 2 de
agosto de 2028 {[2]}.

### Alto riesgo a través del uso (Anexo III)

Bajo {`Art. 6(2)`}, el Anexo III enumera ocho áreas. Un sistema cuya finalidad prevista cae en una
de ellas es de alto riesgo a menos que el filtro {`Art. 6(3)`} lo saque {[1]}:

| Área | Lo que está listado (una línea) |
|---|---|
| 1. Biometría | Identificación biométrica remota (no verificación uno a uno), categorización biométrica por atributos sensibles, reconocimiento de emociones |
| 2. Infraestructura crítica | Componentes de seguridad en infraestructura digital crítica, tráfico vial, y suministro de agua, gas, calefacción o electricidad |
| 3. Educación y formación profesional | Admisión, evaluación de resultados de aprendizaje, evaluación del nivel de educación, detección de comportamiento prohibido en pruebas |
| 4. Empleo y gestión de trabajadores | Reclutamiento y selección, decisiones sobre términos, promoción o terminación, asignación de tareas, monitoreo y evaluación del desempeño |
| 5. Servicios esenciales privados y públicos | Elegibilidad para beneficios públicos, solvencia crediticia y puntuación crediticia (no detección de fraude), precios de seguros de vida y salud, triaje de llamadas de emergencia y despacho |
| 6. Garantía del cumplimiento del Derecho | Riesgo de víctima, polígrafos, confiabilidad de evidencia, riesgo de delincuencia no basado únicamente en elaboración de perfiles, elaboración de perfiles en investigaciones |
| 7. Migración, asilo y control de fronteras | Polígrafos, evaluación de riesgo de personas, examen de solicitudes, detección o identificación de personas (no verificaciones de documentos de viaje) |
| 8. Administración de justicia y procesos democráticos | Asistencia a autoridades judiciales con hechos y derecho (y ADR), influencia en elecciones o comportamiento electoral |

La Comisión puede añadir casos de uso al Anexo III mediante acto delegado (`Art. 7`) [1], por lo que
la tabla del Anexo III del clasificador de intake es datos con versión, no una lista codificada. Lo
que el punto 5 protege es visible en
[el caso holandés de prestaciones para guarderías](/cases/dutch-childcare-benefits).

### El filtro del Anexo III y la anulación de la elaboración de perfiles

Conforme a `Art. 6(3)`, un sistema del Anexo III no es de alto riesgo cuando no plantea un riesgo
significativo de daño a la salud, la seguridad o los derechos fundamentales, incluso por no influir
materialmente en el resultado de la toma de decisiones. El filtro se aplica cuando se cumple al
menos una de cuatro condiciones [1]:

1. el sistema realiza una tarea procesal estrecha;
2. mejora el resultado de una actividad humana completada anteriormente;
3. detecta patrones de toma de decisiones o desviaciones sin sustituir ni influir en la evaluación
   humana completada sin revisión humana adecuada;
4. realiza una tarea preparatoria para una evaluación relevante para un caso de uso del Anexo III.

Una anulación vence a las cuatro: un sistema del Anexo III que
**elabora perfiles de personas físicas es siempre de alto riesgo** [1]. Un proveedor que se base en
el filtro debe documentar su evaluación antes de introducir el sistema en el mercado, registrarlo
(`Art. 6(4)`, `Art. 49(2)`), y entregar la documentación a las autoridades bajo solicitud [1]. El
Omnibus redujo ese registro, eliminando el resumen de fundamentos y la lista de Estados miembros del
Anexo VIII, Sección B [2].

Las directrices de clasificación de la Comisión, con ejemplos prácticos, debían estar listas el 2 de
febrero de 2026 conforme a `Art. 6(5)`. Un borrador se publicó el 19 de mayo de 2026, con una
consulta dirigida abierta hasta el 23 de julio de 2026; a partir del 2026-09-24 la página de la
Comisión aún las presenta como borrador [5][6]. Hasta que sean finales, la defensa del ingeniero es
un buen registro, no un buen argumento.

> **Ejemplo (ilustrativo)**
> Un registro de decisión de clasificación, archivado en el registro y reevaluado siempre que cambie
> la finalidad prevista:
>
> ```json
> { "system": "cv-screen-02", "annex_iii_point": "4(a)",
>   "art_6_3_condition": "preparatory_task", "profiling": true,
>   "result": "high-risk", "reason": "profiling override, Art. 6(3) third subparagraph",
>   "reviewed_by": "ai-governance", "date": "2026-09-24" }
> ```
>
> La bandera explícita `profiling` es el punto: se invocó el filtro, y la anulación lo derrotó.

Este registro es la salida del flujo de trabajo de
[intake y clasificación](/bok/the-role#intake-and-classification) y reside en la Capa 2 (Inventory &
Transparency); la regla que lo calcula reside en la Capa 1.

### Casos de transparencia (Artículo 50)

El Artículo 50 suele llamarse el escalón de "riesgo limitado". Se aplica a cualquier sistema de IA
que encaje en uno de sus casos, sea cual sea el resto del sistema [1]:

| Caso | Responsable del deber | Deber | Artefacto | Capa |
|---|---|---|---|---|
| `50(1)`: interactúa directamente con personas | Proveedor | Las personas deben saber que es IA, a menos que sea obvio | Divulgación en interfaz; una prueba de que se renderiza | 4 · 3 |
| `50(2)`: genera audio, imagen, vídeo o texto sintético | Proveedor | Marcado legible por máquina, detectable | Marca de agua o metadatos de procedencia; prueba de marcado en CI | 4 · 3 |
| `50(3)`: reconocimiento de emociones o categorización biométrica | Responsable del despliegue | Informar a las personas expuestas | Aviso en el punto de exposición | 2 |
| `50(4)`: ultrasuplantaciones | Responsable del despliegue | Divulgar la manipulación (más ligero para arte o sátira evidente) | Etiqueta de contenido; comprobación de publicación | 4 |
| `50(4)`: texto de IA que informa al público | Responsable del despliegue | Divulgar, a menos que haya responsabilidad editorial humana | Registro de control editorial o etiqueta | 2 · 4 |

La información debe llegar a las personas a más tardar en la primera interacción o exposición
(`Art. 50(5)`) [1]. El artículo ha aplicado desde el 2 de agosto de 2026; los sistemas generativos
ya en el mercado antes de esa fecha tienen hasta el 2 de diciembre de 2026 para marcar salidas
(`Art. 111(4)`) [2]. El Código de Prácticas final sobre Transparencia del Contenido Generado por IA
(10 de junio de 2026) tiene una sección de proveedores sobre marcado y una sección de responsables
del despliegue sobre etiquetado, y la Comisión y la Junta de IA lo confirmaron como herramienta
voluntaria adecuada; la Comisión publicó sus directrices sobre las obligaciones de `Art. 50`
transparencia el 20 de julio de 2026, después de un borrador del 8 de mayo de 2026 [9][14]. La ley
fuera de la Ley también alcanza medios sintéticos: véase
[ultrasuplantaciones y medios sintéticos](/bok/existing-law#deepfakes-and-synthetic-media) en el
capítulo 20.

### Riesgo mínimo

Todo lo demás es riesgo mínimo. La Ley no pide nada específico más allá de alfabetización en materia
de IA (`Art. 4`) e invita a códigos de conducta voluntarios (`Art. 95`) [1]. "Mínimo" es una
categoría legal, no un veredicto de riesgo: la protección de datos, la ley de consumo, la
responsabilidad por productos y la ley antidiscriminación aún se aplican (véase
[ley existente](/bok/existing-law#how-to-read-this-chapter) y
[privacidad e IA](/bok/privacy-and-ai#principles-applied-to-ai)), y tu propia
[gestión de riesgos](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix) puede
calificar un sistema de riesgo mínimo como alto para tu organización.

## Modelos de IA de uso general

### Modelo, sistema y el criterio indicativo

Un **modelo GPAI** es un modelo de IA que "muestra una generalidad significativa y es capaz de
realizar competentemente una amplia gama de tareas distintas" e integrable en una variedad de
sistemas posteriores, excluyendo modelos usados para investigación, desarrollo o prototipado antes
de su introducción en el mercado (`Art. 3(63)`) [1]. Un **sistema GPAI** es un sistema de IA basado
en tal modelo (`Art. 3(66)`) [1]. Las directrices de la Comisión dan un criterio indicativo:
computación de entrenamiento por encima de 10^23 FLOP y capacidad de generar lenguaje (texto o
audio), texto a imagen o texto a vídeo [7].

### Deberes de todo proveedor GPAI

| Deber | Artículo | Artefacto | Capa |
|---|---|---|---|
| Documentación técnica (Anexo XI) para la Oficina de IA y autoridades nacionales, bajo solicitud | `Art. 53(1)(a)` | Documentación del modelo con resultados de entrenamiento, validación y evaluación | 2 |
| Información para proveedores posteriores (Anexo XII) | `Art. 53(1)(b)` | Ficha de modelo; notas de capacidad y limitación; guía de integración | 2 |
| Política de derechos de autor, incluyendo respeto a exclusiones de minería de textos y datos | `Art. 53(1)(c)` | Reglas de filtrado de fuentes como código; registro de honor de exclusiones | 1 · 2 |
| Resumen público del contenido de entrenamiento en la plantilla de la Oficina de IA | `Art. 53(1)(d)` | Resumen generado a partir de registros de procedencia de conjuntos de datos | 2 |
| Representante autorizado en la Unión para proveedores no comunitarios | `Art. 54` | Mandato escrito; documentación conservada durante 10 años | 5 |

Los deberes y sus detalles están en la Ley [1]; las filas del capítulo 08 para
[`Art. 53` y `Art. 55`](/bok/regulatory-map#eu-ai-act-post-omnibus) llevan las fechas y la
autoridad. La ley de derechos de autor detrás de la política de `Art. 53(1)(c)` está en el capítulo
20
([política de derechos de autor y exclusiones de TDM](/bok/existing-law#copyright-and-training-data)).

### Riesgo sistémico: umbral, notificación, designación

Un modelo GPAI tiene **riesgo sistémico** si tiene capacidades de gran impacto, o si la Comisión lo
designa en los criterios del Anexo XIII (`Art. 51(1)`) [1]. Las capacidades de gran impacto se
presumen por encima de 10^25 FLOP de computación de entrenamiento acumulada, un umbral que la
Comisión puede enmendar (`Art. 51(2)`, `51(3)`) [1]. El proveedor debe notificar a la Comisión en el
plazo de dos semanas desde que cumpla el umbral o sepa que lo hará, y puede argumentar que el modelo
excepcionalmente no presenta riesgo sistémico (`Art. 52`) [1].

El artefacto de ingeniería es un **registro de computación**: FLOP de entrenamiento acumulado por
linaje de modelo, con el método de estimación, y una alerta cuando la computación *planificada*
cruzará el umbral, porque el reloj de dos semanas puede empezar antes de que termine el
entrenamiento.

### Deberes para modelos con riesgo sistémico

Además de `Arts. 53` y `54`, el proveedor debe evaluar el modelo con protocolos de última generación
incluyendo pruebas adversariales; evaluar y mitigar riesgos sistémicos a nivel de Unión; rastrear,
documentar e informar incidentes graves a la Oficina de IA sin demora indebida; y garantizar
ciberseguridad adecuada para el modelo e infraestructura física (`Art. 55(1)`) [1]. Los artefactos
son la [eval gate](/patterns/eval-gate-in-ci) y suite de red team, un registro de riesgo sistémico,
el [incident pipeline](/patterns/incident-pipeline) en la plantilla de informe de la Comisión (véase
[capítulo 08](/bok/regulatory-map#gpai-code-of-practice)) y controles de seguridad de pesos.

### Exenciones de código abierto y sus límites

Un modelo lanzado bajo una licencia libre y de código abierto, con sus pesos, arquitectura e
información de uso públicos, está exento de `Art. 53(1)(a)` y `(b)` y del deber de representante
autorizado (`Arts. 53(2)`, `54(6)`) [1]. La exención nunca cubre un modelo de riesgo sistémico, y la
política de derechos de autor y resumen de entrenamiento aún se aplican [1]. La monetización lo
derrota: las directrices tratan la licencia dual, soporte pagado sin el cual el modelo no puede
usarse, y alojamiento pagado exclusivo como monetización [7]. El Omnibus mantiene los modelos GPAI
dentro del deber de acuerdo escrito `Art. 25(4)` incluso cuando se lanzan abiertamente [2].

### Cuando un ajustador fino se convierte en proveedor GPAI

Un modificador se convierte en proveedor de un nuevo modelo GPAI solo si el cambio es significativo
para generalidad, capacidades o riesgo sistémico. El criterio indicativo de las directrices es
computación de modificación por encima de un tercio de la computación de entrenamiento original (o,
si se desconoce, un tercio de 10^25 FLOP para un original de riesgo sistémico y de 10^23 FLOP en
caso contrario), y los deberes de `Art. 53(1)` del modificador se limitan entonces a la modificación
y sus datos; `Art. 54` se aplica, y donde el original es un modelo de riesgo sistémico el modelo
modificado se presume que tiene riesgo sistémico, por lo que el modificador notifica a la Comisión
(`Art. 52`) y cumple los deberes de `Art. 55` [7]. Mantén esta prueba aparte de `Art. 25`: ajustar
un *modelo* cambia el estado de proveedor GPAI; cambiar la finalidad prevista de un *sistema* al
Anexo III cambia el estado de proveedor de alto riesgo. Dos pruebas, dos objetos, dos campos de
registro.

### El Código de Prácticas y la aplicación

El Código de Prácticas de IA de Uso General se publicó el 10 de julio de 2025. Sus capítulos de
Transparencia y Derechos de Autor se aplican a todos los proveedores GPAI, su capítulo de Seguridad
y Ciberseguridad solo a modelos de riesgo sistémico, y la Comisión y la Junta de IA lo confirmaron
como herramienta voluntaria adecuada [8]. Los proveedores pueden confiar en él hasta que exista una
norma armonizada; los no signatarios deben mostrar medios alternativos adecuados (`Arts. 53(4)`,
`55(2)`) [1]. Las obligaciones GPAI han aplicado desde el 2 de agosto de 2025, multas de la Comisión
bajo `Art. 101` desde el 2 de agosto de 2026, y modelos introducidos en el mercado antes del 2 de
agosto de 2025 deben cumplir antes del 2 de agosto de 2027 (`Art. 111(3)`) [1][7].

## Requisitos de alto riesgo (Artículos 8 a 15)

El Artículo 8 requiere que un sistema de alto riesgo cumpla la Sección 2 del Capítulo III, teniendo
en cuenta su finalidad prevista y el estado de la técnica [1]. Los requisitos son deberes de diseño
del proveedor. En una tabla, con el artefacto que evidencia cada uno:

| Artículo | Requisito en una línea | Artefacto | Capa |
|---|---|---|---|
| `Art. 9` | Un sistema de gestión de riesgos ejecutado como proceso continuo e iterativo durante el ciclo de vida, incluyendo pruebas y uso indebido razonablemente previsible | Registro de riesgos como código, vinculado a resultados de eval y la FRIA | 1 · 3 |
| `Art. 10` | Datos de entrenamiento, validación y prueba que sean relevantes, suficientemente representativos y, en la medida de lo posible, libres de errores y completos; sesgo examinado y mitigado | Fichas de datos, linaje, pruebas de sesgo y calidad en CI | 2 · 3 |
| `Art. 11` | Documentación técnica (Anexo IV) antes de la introducción en el mercado, mantenida actualizada; un formulario simplificado para pymes y empresas de mediano tamaño | AIBOM; documentación técnica generada; ficha de modelo | 2 |
| `Art. 12` | Registro automático de eventos durante toda la vida útil del sistema, para la trazabilidad | Registros de eventos estructurados y resistentes a manipulaciones, y trazas | 4 |
| `Art. 13` | Instrucciones de uso para responsables del despliegue, incluida la precisión declarada, limitaciones y medidas de supervisión | Instrucciones de uso como código; ficha de modelo | 2 |
| `Art. 14` | Supervisión humana: las personas pueden entender, supervisar, mantenerse conscientes del sesgo de automatización, interpretar, anular y detener el sistema | Puntos de control con intervención humana; ruta de anulación; kill switch | 4 |
| `Art. 15` | Precisión, robustez y ciberseguridad a lo largo del ciclo de vida, incluidas defensas contra envenenamiento, ejemplos adversariales y ataques de confidencialidad | Eval gate; suite de red team; controles de seguridad | 3 · 4 |

Los requisitos están en la Ley [1]; el formulario para pymes y empresas de mediano tamaño en
`Art. 11(1)` es una adición del Omnibus [2]. El capítulo 14 construye
[el fichero técnico](/bok/governing-development#the-technical-file) a partir de registros de
pipeline. `Art. 14(5)` añade verificación de dos personas antes de actuar sobre una identificación
biométrica remota, con excepciones en garantía del cumplimiento del Derecho, migración, control de
fronteras y asilo [1]; véase
[diseño de supervisión humana](/bok/the-stack#designing-human-oversight-article-14) y
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Un sistema de alto riesgo dentro de la
Ley de Ciberresiliencia que cumple las condiciones de su artículo 12(1) se considera que cumple el
requisito de `Art. 15` ciberseguridad (`Art. 42(3)`) [2], por lo que un paquete de evidencia de
seguridad puede servir para ambos regímenes.

## Obligaciones del proveedor más allá de los requisitos

### Artículo 16 y el sistema de gestión de la calidad (artículo 17)

El artículo 16 es el paraguas para las obligaciones del proveedor: los requisitos, nombre del
sistema, SGC, documentación, registros, evaluación de la conformidad, declaración, marcado CE,
registro, acción correctiva, cooperación y accesibilidad [1]. El capítulo 08 lo desglosa artículo
por artículo.

El SGC debe estar documentado como políticas, procedimientos e instrucciones escritas que cubran al
menos 13 aspectos, desde una estrategia de cumplimiento con gestión del cambio, control del diseño,
pruebas y gestión de datos hasta el sistema de `Art. 9` riesgo, vigilancia poscomercialización,
notificación de incidentes, conservación de registros y un marco de responsabilidad (`Art. 17(1)`)
[1]. Es proporcional al tamaño del proveedor, que el Omnibus ahora especifica para pymes y empresas
de mediano tamaño sin reducir el rigor requerido, y las pymes sin empresas asociadas o vinculadas
pueden cumplir ciertos elementos de forma simplificada (`Arts. 17(2)`, `63`) [2]. Leído como
ingeniero, el SGC es el pipeline más sus registros: políticas versionadas, control de cambios y los
gates que se ejecutan en cada lanzamiento. El estándar del artículo 17 está publicado pero no citado
en el Diario Oficial, e ISO/IEC 42001 no es el SGC del artículo 17 (véase
[capítulo 08](/bok/regulatory-map#what-is-not-harmonised-yet), y capítulo 22 sobre
[normas armonizadas y la presunción de conformidad](/bok/principles-and-standards#how-presumption-of-conformity-works)).

### Evaluación de la conformidad, declaración, marcado y registro

Los puntos 2 a 8 del Anexo III utilizan control interno (Anexo VI) sin organismo notificado; la
biometría (punto 1) puede utilizar control interno solo cuando se aplicaron íntegramente normas
armonizadas o especificaciones comunes, y en caso contrario necesita un organismo notificado (Anexo
VII) (`Art. 43(1)`, `43(2)`) [1]. Los productos de la sección A del Anexo I siguen el procedimiento
sectorial, que ahora incluye expresamente los requisitos de la sección 2 y una evaluación del SGC;
sus organismos notificados deben solicitar la designación conforme a la Ley antes del 28 de enero de
2028 (`Art. 43(3)`) [2]. Una modificación sustancial desencadena una nueva evaluación (`Art. 43(4)`)
[1].

El proveedor entonces elabora la declaración de conformidad de la UE (`Art. 47`), coloca el marcado
CE (`Art. 48`) y registra el sistema en la base de datos de la UE (`Arts. 49`, `71`) [1]. La
documentación se conserva durante 10 años (`Art. 18`) y los registros durante al menos seis meses
(`Art. 19`) [1]. Cada uno es una salida del pipeline: la declaración se genera a partir de la
evidencia de que los gates pasaron, y el registro se envía desde el registro.

### Vigilancia poscomercialización e incidentes graves (artículos 72 y 73)

El proveedor ejecuta un sistema de vigilancia poscomercialización que recopila y analiza activamente
datos de rendimiento, incluidos los de responsables del despliegue, para evaluar el cumplimiento
continuo (`Art. 72(1)`, `72(2)`) [1]. Su plan es parte de la documentación del Anexo IV, y el
Omnibus sustituyó el acto de ejecución vencido por orientaciones de la Comisión y una plantilla que
vence el 2 de septiembre de 2027 (`Art. 72(3)`) [2].
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) es el sistema de
vigilancia; el plan es su configuración versionada.

Los incidentes graves se notifican a la autoridad de vigilancia del mercado inmediatamente después
de que se establezca un vínculo causal, o su probabilidad razonable, y en cualquier caso en los
relojes de `Art. 73`, cada uno contado desde cuando el proveedor (o responsable del despliegue) se
percata del incidente: 15 días en general, dos días para una infracción generalizada o una
perturbación grave e irreversible de la gestión u operación de infraestructura crítica
(`Art. 3(49)(b)`), y 10 días después de una muerte [1]. El capítulo 08 contiene la
[tabla de relojes de notificación](/bok/regulatory-map#eu-ai-act-post-omnibus); el capítulo 17 trata
[incidentes](/bok/incidents#the-overlapping-clocks) de principio a fin. Los proveedores de sistemas
de alto riesgo bajo la competencia directa de la Oficina de IA notifican a la Oficina de IA en su
lugar (`Art. 75(1a)`) [2].

## Quién eres en la cadena de valor

### Los roles de operador de la UE

La Ley vincula a los **operadores** (`Art. 3(8)`): proveedores, fabricantes de productos,
responsables del despliegue, representantes autorizados, importadores y distribuidores [1]. El
capítulo de IA de uso general añade el proveedor de IA de uso general y el proveedor posterior. La
tabla coloca cada rol en términos de ingeniero: qué produce y qué debe recopilar de otro.

| Rol | Quién es (palabras propias) | Obligaciones principales | Evidencia que produce | Evidencia que recopila |
|---|---|---|---|---|
| Proveedor (`Art. 3(3)`) | Desarrolla un sistema de IA o modelo de IA de uso general, o lo hace desarrollar, e introduce en el mercado o pone en servicio bajo su propio nombre | `Arts. 8` a `17`, `43` a `49`, `72`, `73`; `50(1)`, `50(2)` | Documentación técnica, registros del SGC, resultados de evals, declaración | Información de modelo anterior; acuerdos de `Art. 25(4)` |
| Responsable del despliegue (`Art. 3(4)`) | Utiliza un sistema de IA bajo su autoridad, que no sea para uso personal y no profesional | `Arts. 26`, `27`, `50(3)`, `50(4)`, `86` | Registros de uso, lista de supervisión, FRIA, notificaciones | Instrucciones de uso, declaración, id de registro |
| Importador (`Art. 3(6)`) | Con sede en la UE; introduce en el mercado un sistema con el nombre de un proveedor no comunitario | `Art. 23`: verificar la evaluación, documentos y marcado del proveedor; conservar copias 10 años | Registro de verificación de importación | Certificado, declaración, instrucciones |
| Distribuidor (`Art. 3(7)`) | Comercializa un sistema sin ser su proveedor o importador | `Art. 24`: verificar marcado y documentos; retener sistemas no conformes | Registro de verificación de distribución | El mismo conjunto |
| Representante autorizado (`Art. 3(5)`) | Con sede en la UE, con un mandato escrito de un proveedor no comunitario | `Arts. 22`, `54`: verificar, conservar documentos 10 años, cooperar, terminar el mandato en caso de incumplimiento | Mandato; copias de documentos | Todo del proveedor |
| Fabricante de productos (`Art. 25(3)`) | Introduce un componente de seguridad de alto riesgo con su producto de la sección A del Anexo I bajo su propio nombre | Obligaciones de proveedor (`Art. 16`) | Como proveedor | Documentación del proveedor |
| Proveedor de IA de uso general (`Art. 53`) | El proveedor de un modelo de IA de uso general | `Arts. 53` a `55` | Documentación del modelo, resumen de entrenamiento, política de derechos de autor | Procedencia de datos y licencias |
| Proveedor posterior (`Art. 3(68)`) | Integra un modelo de IA, el suyo o de un tercero, en un sistema de IA | Obligaciones de proveedor para el sistema | Documentación del sistema | Información del Anexo XII |

Las obligaciones están en `Arts. 16` a `27` y `53` a `55` [1]. La **persona afectada** está en el
ámbito de aplicación (`Art. 2(1)(g)`) como titular de protecciones, no obligaciones [1].

### Artículo 25: cuándo alguien más se convierte en proveedor

Un distribuidor, importador, responsable del despliegue u otro tercero se convierte en proveedor de
un sistema de alto riesgo, con todas las obligaciones de `Art. 16`, en tres casos (`Art. 25(1)`)
[1]:

1. coloca su nombre o marca comercial en un sistema de alto riesgo ya en el mercado, sujeto a
   contratos que asignen las obligaciones de otro modo;
2. realiza una modificación sustancial de un sistema de alto riesgo que sigue siendo de alto riesgo;
3. cambia la finalidad prevista de un sistema que no era de alto riesgo, incluido un sistema de IA
   de uso general, de modo que se convierte en de alto riesgo.

Una **modificación sustancial** es un cambio no planificado después de la introducción en el mercado
que afecta al cumplimiento o cambia la finalidad prevista evaluada (`Art. 3(23)`) [1]. Cuando se
activa un disparador, el proveedor inicial deja de ser el proveedor de ese sistema pero debe
cooperar con el nuevo; el Omnibus ahora especifica que esto significa documentación suficiente para
evaluar el cumplimiento, limitaciones conocidas y modos de fallo, y acceso técnico dirigido para
pruebas, a menos que el proveedor inicial hubiera excluido claramente cualquier cambio hacia un
sistema de alto riesgo (`Art. 25(2)`) [2]. Los proveedores de alto riesgo y sus proveedores de
sistemas, modelos, herramientas y componentes deben fijar la información y el acceso necesarios en
un acuerdo escrito (`Art. 25(4)`), y los incumplimientos de ambos párrafos ahora se multan en el
nivel medio (`Art. 99(4)(da)`) [2].

En el pipeline los tres disparadores son eventos detectables: un cambio de marca blanca o marca, un
reentrenamiento que toca conformidad, y un cambio de configuración que mueve `intended_purpose` a un
valor del Anexo III. Cada uno debe activar una reevaluación de rol y un ticket de
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) (véase
[IA de terceros y adquirida](/bok/the-stack#third-party-and-procured-ai)).

> **Ejemplo (ilustrativo)**
> Un equipo de RRHH configura un asistente de chat de uso general, que despliega bajo una licencia
> de proveedor, para clasificar candidatos de empleo. La configuración mueve la finalidad prevista
> al Anexo III, punto 4(a), por lo que conforme a `Art. 25(1)(c)` la organización se convierte en
> proveedor de un sistema de alto riesgo: `Arts. 8` a `17`, evaluación de la conformidad y registro
> son ahora sus obligaciones. Si comienza con algo depende del contrato. Si el proveedor no excluyó
> el uso de alto riesgo, `Art. 25(2)` lo obliga a entregar documentación, limitaciones conocidas y
> acceso de prueba. Si lo hizo, la organización construye la evidencia sola. La cláusula de
> exclusión en los términos del proveedor establece el tamaño del presupuesto de evidencia.

### Los roles nombran tareas, no organizaciones

Un rol se vincula a una actividad en un sistema específico, no a una empresa. Un banco es el
proveedor del modelo de crédito que construyó, el responsable del despliegue de ese modelo en sus
sucursales ("puesta en servicio" incluye el uso propio, `Art. 3(11)` [1]) y el responsable del
despliegue del chatbot de un proveedor. Así, el registro documenta roles por sistema, como una
lista: `["provider", "deployer"]` para un sistema interno, `["deployer"]` para uno adquirido.

### Los mismos roles en diferentes regímenes

Las palabras difieren entre leyes; las tareas raramente lo hacen. La columna de correspondencia es
la lectura de este capítulo, no una equivalencia legal.

| Régimen | Rol | Qué cubre (palabras propias) | Rol más cercano de la UE (nuestra correspondencia) |
|---|---|---|---|
| Reglamento de IA de la UE [1] | Proveedor; responsable del despliegue; importador; distribuidor; representante autorizado; fabricante del producto | Como en la tabla anterior | Punto de referencia |
| Colorado SB 26-189 [10] | Desarrollador | Construye tecnología de toma de decisiones utilizada en decisiones relevantes; la documenta para los responsables del despliegue | Proveedor |
| Colorado SB 26-189 [10] | Responsable del despliegue | La utiliza en decisiones relevantes; notifica al consumidor; mantiene registros al menos tres años | Responsable del despliegue |
| Texas HB 149 (TRAIGA) [11] | Desarrollador | Desarrolla un sistema de IA ofrecido o proporcionado en Texas | Proveedor |
| Texas HB 149 (TRAIGA) [11] | Responsable del despliegue | Despliega un sistema de IA para su uso en Texas | Responsable del despliegue |
| Ley Básica de IA de Corea [12] | Operador de empresa de desarrollo de IA | Desarrolla y proporciona IA | Proveedor |
| Ley Básica de IA de Corea [12] | Operador de empresa de utilización de IA | Ofrece productos o servicios construidos sobre IA de un operador de desarrollo | Proveedor posterior o responsable del despliegue |
| Ley Básica de IA de Corea [12] | Usuario; persona afectada | Recibe el servicio; su vida, seguridad o derechos se ven significativamente afectados | Protegida, no es responsable de obligaciones |
| ISO/IEC 22989 [13] | Proveedor de IA, productor, cliente, socio, sujeto; autoridades relevantes (verificar) | Roles de vocabulario, no obligaciones legales | Útil en contratos |

La ley de Colorado se firmó el 14 de mayo de 2026 y sus obligaciones se aplican desde el 1 de enero
de 2027 [10]. La Ley coreana (versión en vigor desde el 21 de julio de 2026) alcanza actos en el
extranjero que afecten al mercado o usuarios coreanos y requiere un representante doméstico para
operadores extranjeros por encima de umbrales de decreto (`Arts. 4`, `36`) [12]. La lista ISO/IEC
22989 y su cláusula (5.19) están marcadas para verificación [13]. Véase
[capítulo 08](/bok/regulatory-map#us-federal-and-state-laws) e
[Leyes de IA en todo el mundo](/bok/ai-laws-worldwide#comparing-the-regimes) para estos regímenes en
contexto.

## Obligaciones del responsable del despliegue (Artículo 26)

El artículo 26 es la lista del responsable del despliegue para sistemas de alto riesgo. Desglosada
en sub-obligaciones, cada una tiene un artefacto [1]:

| Sub-obligación | Párr. | Artefacto | Capa |
|---|---|---|---|
| Utilizarlo de acuerdo con las instrucciones de uso | `26(1)` | Configuración de despliegue fijada a las instrucciones; verificación de política en el despliegue | 1 · 2 |
| Asignar supervisores competentes, capacitados y autorizados | `26(2)` | Lista de supervisión vinculada a registros de capacitación; puerta de supervisión humana | 4 · 5 |
| Mantener datos de entrada relevantes y representativos, donde los controlas | `26(4)` | Verificaciones de datos de entrada; ficha de datos de despliegue | 2 · 3 |
| Monitorear; informar al proveedor; suspender en caso de riesgo; reportar incidentes graves | `26(5)` | Ganchos de monitoreo; interruptor de suspensión; canalización de incidentes | 4 · 5 |
| Mantener registros al menos seis meses | `26(6)` | Política de retención de registros como código | 4 |
| Informar a los trabajadores y sus representantes antes del uso en el lugar de trabajo | `26(7)` | Registro de notificación y consulta | 2 |
| Organismos públicos: registrar el uso; nunca utilizar sistemas no registrados | `26(8)` | Registro sincronizado con el id de la base de datos de la UE | 2 |
| Alimentar la información `Art. 13` del proveedor en la EIPD | `26(9)` | EIPD haciendo referencia cruzada a las instrucciones | 1 · 2 |
| Después de identificación biométrica remota: autorización, registro, informes | `26(10)` | Registro de autorización; registro por uso | 5 |
| Informar a las personas sujetas a decisiones del Anexo III | `26(11)` | [Notificación de decisión](/patterns/decision-notice-contest-path) en el punto de decisión | 2 · 4 |
| Cooperar con las autoridades | `26(12)` | Exportación de evidencia bajo solicitud | 5 |

Las instituciones financieras cumplen las obligaciones de monitoreo y registro a través de sus
reglas de gobernanza de servicios financieros [1]. La vista del responsable del despliegue de
sistemas adquiridos se desarrolla en
[gobernanza del despliegue](/bok/governing-deployment#operating-the-system).

> **En la práctica (ilustrativo)**
> En una gran operadora de telecomunicaciones, las obligaciones del responsable del despliegue
> dejaron de ser un cuestionario una vez que cada una se convirtió en un campo de registro con un
> propietario. `oversight_roster` apuntaba a personas nombradas cuya capacitación en alfabetización
> era actual; {`log_retention_days`} se verificaba contra el piso de seis meses mediante una prueba
> de política; {`worker_notice_ref`} se vinculaba al registro de consulta antes de que una
> herramienta de lugar de trabajo pudiera activarse. La pregunta de auditoría "muéstrame tus
> controles del Artículo 26 para este sistema" se convirtió en una consulta de registro por sistema.

## Evaluación de impacto relativa a los derechos fundamentales (Artículo 27)

**Quién.** Antes de desplegar un sistema del Anexo III (excepto punto 2, infraestructura crítica),
se requiere una EIPD de responsables del despliegue que sean organismos regidos por el derecho
público o entidades privadas que presten servicios públicos, y de responsables del despliegue de
puntuación crediticia (punto 5(b)) y precios de seguros de vida y salud (punto 5(c)) [1].

**Cuándo.** Antes del primer uso; el responsable del despliegue puede confiar en EIPD anteriores o
en la evaluación de impacto del proveedor en casos similares, y debe actualizarla cuando cambie un
elemento (`Art. 27(2)`) [1].

**Qué.** Los procesos del responsable del despliegue que utilizan el sistema; el período y
frecuencia de uso; las categorías de personas afectadas; los riesgos específicos de daño para ellas,
utilizando la información `Art. 13` del proveedor; las medidas de supervisión humana; y las medidas
si los riesgos se materializan, incluida la gobernanza interna y los mecanismos de reclamación
(`Art. 27(1)(a)` a `(f)`) [1].

**Luego.** El responsable del despliegue notifica a la autoridad de vigilancia del mercado de los
resultados en la plantilla de la Oficina de IA (`Art. 27(3)`) [1]. Después del Omnibus, puede hacer
referencia cruzada o incluir las secciones relevantes de la EIPD, y la plantilla debe permitir eso
(`Art. 27(4)`, `27(5)`) [2]. La obligación se aplica desde el 2 de diciembre de 2027 con el régimen
del Anexo III [2]. Constrúyela como [gobernanza como código](/patterns/fria-as-code): un registro
versionado generado desde el registro, las instrucciones de uso y la EIPD, así que una actualización
es un diff, no una reescritura.

## Explicación y notificación a las personas afectadas

**El derecho a la explicación (`Art. 86`).** Una persona sujeta a una decisión del responsable del
despliegue basada en la salida de un sistema de alto riesgo del Anexo III (excepto punto 2), que
produce efectos legales o efectos igualmente significativos que la persona considera adversos para
su salud, seguridad o derechos fundamentales, puede obtener "explicaciones claras y significativas
del papel del sistema de IA en el procedimiento de toma de decisiones y los elementos principales de
la decisión tomada" [1]. El derecho cede ante excepciones en la ley de la Unión o nacional y se
aplica solo donde la ley de la Unión no lo proporciona ya [1], por lo que debe leerse junto con los
derechos del RGPD sobre decisiones automatizadas (véase
[privacidad e IA](/bok/privacy-and-ai#the-regimes-side-by-side)).

El artefacto es un [**registro de explicación**](/patterns/explanation-artefact) por decisión:
versión del sistema y modelo, las entradas o códigos de razón detrás de la salida, si la salida fue
determinante o consultiva, y la persona que decidió; los métodos están en
[equidad y explicabilidad](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records),
con lo que el
[derecho a la explicación (Art. 86)](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
pide del contenido. En cuanto al tiempo, `Art. 86` se encuentra en el Capítulo IX, que se aplica
desde el 2 de agosto de 2026, pero solo tiene trabajo que hacer una vez que los sistemas del Anexo
III se regulen desde el 2 de diciembre de 2027. Esta es la lectura de este capítulo; confirma con
asesor legal (verificar).

**Las otras notificaciones.** Trabajadores antes del uso en el lugar de trabajo (`Art. 26(7)`);
personas sujetas a decisiones del Anexo III (`Art. 26(11)`); personas expuestas a reconocimiento de
emociones o categorización biométrica (`Art. 50(3)`); y cualquiera que enfrente una falsificación
profunda (`Art. 50(4)`) [1]. Cualquier persona puede presentar una queja ante una autoridad de
vigilancia del mercado (`Art. 85`), y los denunciantes que reporten incumplimientos de la Ley están
protegidos bajo la Directiva (UE) 2019/1937 (`Art. 87`) [1].

## Alfabetización en materia de IA y datos de detección de sesgos

**Alfabetización en materia de IA (`Art. 4`).** Desde el 27 de julio de 2026, los proveedores y
responsables del despliegue deben "tomar medidas para apoyar el desarrollo de alfabetización en
materia de IA" de su personal y otros que operen o utilicen sistemas de IA en su nombre,
considerando su conocimiento, el contexto de uso y las personas afectadas, sin tener que garantizar
ningún nivel específico [2]. Se vincula a cada proveedor y responsable del despliegue en cada nivel.
El artefacto es un programa de alfabetización basado en roles cuyo registro de finalización está
vinculado a roles de registro, así que nadie está en la lista como supervisor {`Art. 26(2)`} sin un
registro actual.

**Datos de detección de sesgos (`Art. 4a`).** Los proveedores de sistemas de alto riesgo pueden
excepcionalmente procesar categorías especiales de datos personales cuando sea estrictamente
necesario para la detección y corrección de sesgos, si otros datos (incluidos datos sintéticos o
anonimizados) no funcionarían, los datos están seudonimizados, asegurados, controlados en acceso y
nunca se transmiten, se eliminan una vez que se corrige el sesgo, y los registros de procesamiento
dicen por qué [2]. {`Art. 4a(2)`} extiende la base a otros sistemas de IA y modelos y a responsables
del despliegue de sistemas de alto riesgo, sin crear una obligación {[2]}. El artefacto es un
enclave controlado con registros de acceso y eliminación automática (véase
[gobernanza de datos en todo el stack](/bok/the-stack#data-governance-across-the-stack)).

## Espacios controlados de pruebas y pruebas en condiciones reales

**Espacios controlados de pruebas (`Arts. 57` a `59`).** Cada Estado miembro debe tener al menos un
espacio controlado de pruebas para la IA de regulación nacional operativo antes del 2 de agosto de
2027, una fecha que el Omnibus trasladó del 2 de agosto de 2026 [1][2]. La Oficina de IA puede
ejecutar un espacio controlado de pruebas a nivel de la Unión para los sistemas bajo su competencia
directa, con prioridad para pymes y medianas empresas, y un plan de espacio controlado de pruebas
puede incluir pruebas en condiciones reales [2]. {`Art. 59`} establece las condiciones para el
procesamiento adicional de datos personales en un espacio controlado de pruebas para sistemas de
interés público {[1]}.

**Pruebas en condiciones reales (`Arts. 60`, `60a`, `61`).** Los proveedores pueden probar sistemas
del Anexo III, y después del Omnibus sistemas de la Sección A del Anexo I, en condiciones reales
fuera de un espacio controlado de pruebas [2]. Las condiciones incluyen un plan aprobado por la
autoridad de vigilancia del mercado, registro con un número de identificación a nivel de la Unión,
un máximo de seis meses prorrogables por seis, consentimiento informado que sea fechado y
documentado, supervisión efectiva, salidas que puedan revertirse, e informes {`Art. 73`} de
incidentes graves {[1]}. Los Estados miembros pueden permitir pruebas de productos de la Sección B
del Anexo I bajo marcos nacionales ({`Art. 60a`}) {[2]}. Una prueba en condiciones reales es un
sistema de producción con evidencia adicional: un plan como código, registros de consentimiento, una
ruta de reversión y ganchos de incidentes.

## Gobernanza y aplicación

### Quién supervisa qué

| Organismo | Nivel | Rol | Base |
|---|---|---|---|
| Oficina de IA | Unión | Función de la Comisión; supervisa modelos, códigos y plantillas de IA de uso general y, después del Omnibus, algunos sistemas de IA | `Arts. 3(47)`, `64`, `75`, `88` a `94` |
| Junta Europea de IA | Unión | Un representante por Estado miembro; observador del EPED; Oficina de IA sin voto | `Arts. 65`, `66` |
| Foro asesor y panel científico | Unión | Experiencia de partes interesadas; expertos independientes que pueden plantear alertas calificadas sobre riesgo sistémico de IA de uso general | `Arts. 67`, `68`, `90` |
| Autoridades nacionales competentes | Nacional | Al menos una autoridad notificante y una autoridad de vigilancia del mercado, con un único punto de contacto | `Art. 70` |
| Autoridades de vigilancia del mercado | Nacional | Hacer cumplir las normas de sistemas de IA con poderes del Reglamento (UE) 2019/1020 y acceso al código fuente previa solicitud motivada | `Art. 74` |
| Organismos notificados | Designadas | Evaluación de la conformidad por terceros, delimitada por códigos del Anexo XIV | `Arts. 28` a `39` |
| Organismos de derechos fundamentales | Nacional | Obtener documentación a través de la autoridad de vigilancia del mercado | `Art. 77` |

La vigilancia del mercado sigue el sector [1]: autoridades de productos para sistemas de la Sección
A del Anexo I (`Art. 74(3)`), supervisores financieros para instituciones financieras reguladas
(`Art. 74(6)`), y autoridades de protección de datos u otras autoridades designadas para biometría
en garantía del cumplimiento del Derecho, gestión de fronteras y justicia y para los puntos 6 a 8
del Anexo III (`Art. 74(8)`). Los códigos del Anexo XIV y las normas `Art. 77` son texto del Omnibus
[2].

### Los poderes directos de la Oficina de IA (artículos 75 y 75a a 75d)

El Omnibus hizo que la Oficina de IA fuera exclusivamente competente para dos grupos de sistemas de
IA [2]: sistemas construidos sobre un modelo de IA de uso general por el mismo proveedor u
organización (excepto productos del Anexo I, punto 2 del Anexo III, sistemas de justicia bajo el
punto 8, y sistemas de garantía del cumplimiento del Derecho, frontera y financieros bajo
`Art. 74(6)`), y sistemas que son o están dentro de plataformas en línea muy grandes designadas o
motores de búsqueda. La competencia cubre proveedores, y responsables del despliegue solo dentro de
la misma organización [2].

Los artículos 75a a 75d dan a la Oficina de IA investigaciones, solicitudes de información,
inspecciones, órdenes de dar acceso y explicaciones y de retener datos (`Art. 75a`); compromisos
vinculantes (`Art. 75b`); decisiones de incumplimiento con `Art. 99` multas y pagos de penalización
periódica de hasta el 5% de los ingresos diarios medios o la facturación anual mundial por día
(`Art. 75c`); y derechos de defensa y publicación de decisiones (`Art. 75d`) [2]. Se encuentran en
el Capítulo IX, que se aplica desde el 2 de agosto de 2026 [1][2]. Si construyes sistemas sobre tu
propio modelo de IA de uso general, tu almacén de evidencia debe responder a Bruselas tan rápido
como una autoridad nacional.

### Sanciones

| Incumplimiento | Límite máximo | Base |
|---|---|---|
| Prácticas de IA prohibidas (`Art. 5`) | EUR 35 millones o el 7% de la facturación anual mundial, el que sea mayor | `Art. 99(3)` |
| Obligaciones del operador: proveedores (`Art. 16`), representantes autorizados (`22`), importadores (`23`), distribuidores (`24`), responsables del despliegue (`26`), organismos notificados, transparencia (`50`); después del Omnibus también `Art. 25(2)`, `25(4)` | EUR 15 millones o el 3%, el que sea mayor | `Art. 99(4)` |
| Información incorrecta, incompleta o engañosa a organismos notificados o autoridades nacionales | EUR 7,5 millones o el 1%, el que sea mayor | `Art. 99(5)` |
| PYMES y empresas emergentes; después del Omnibus, PYMES para los dos niveles inferiores | El menor de la cantidad y el porcentaje | `Art. 99(6)`, `99(6a)` |
| Proveedores de IA de uso general, por incumplimientos intencionales o negligentes | El 3% o EUR 15 millones, el que sea mayor, por decisión de la Comisión | `Art. 101` |
| Sistemas bajo la competencia directa de la Oficina de IA | `Art. 99` niveles, más pagos de penalización periódica | `Art. 75c` |

Los niveles están en `Arts. 99`} y {`101`} [1], con las adiciones del Omnibus en {`Arts. 75c`},
{`99(4)(da)`} y {`99(6a)`} [2]. Los Estados miembros deciden si y cómo se multa a los organismos
públicos (`Art. 99(8)`) [1]. Dos de los factores que pesan las autoridades son el grado de
responsabilidad "teniendo en cuenta las medidas técnicas y organizativas implementadas" y si el
operador notificó el incumplimiento a sí mismo (`Art. 99(7)(g)`, `(h)`) [1]. Tu evidencia es también
tu argumento de mitigación.

## La cronología posterior al Omnibus

| Fecha | Lo que se aplica | Base |
|---|---|---|
| 2024-08-01 | El Reglamento entra en vigor | `Art. 113` [1][2] |
| 2025-02-02 | Capítulos I y II: definiciones, alfabetización en materia de IA y las prohibiciones originales | `Art. 113(a)` [1] |
| 2025-08-02 | Normas de organismos notificados, obligaciones de IA de uso general, gobernanza, sanciones (excepto `Art. 101`) y confidencialidad; puntos de contacto nacionales publicados | `Art. 113(b)`, `Art. 70(2)` [1] |
| 2026-07-27 | Omnibus en vigor: `Art. 4` reformulado, nuevo `Art. 4a`, enmiendas a otros actos (`Arts. 102` a `110`) | Omnibus `Art. 4`; `Art. 113(d)`} [2] |
| 2026-08-02 | Aplicación general: transparencia {`Art. 50`}, multas de la Comisión a proveedores de IA de uso general, medidas del Capítulo VI incluidas pruebas en condiciones reales, y el capítulo de aplicación incluido {`Arts. 75a`} a {`75d`} | `Art. 113` [1][2] |
| 2026-12-02 | Nuevas prohibiciones {`Art. 5(1)(ba)`} y {`(bb)`}; marcado {`Art. 50(2)`} para sistemas generativos colocados antes del 2026-08-02 | `Art. 113(a)`, `Art. 111(4)` [2] |
| 2027-08-02 | Los modelos de IA de uso general colocados antes del 2025-08-02 deben cumplir; espacios controlados de pruebas nacionales operativos; actos delegados que limitan deberes para productos de la Sección A del Anexo I vencidos | `Arts. 111(3)`, `57(1)`, `2(13)` [1][2] |
| 2027-09-02 | Orientación de la Comisión y plantilla para el plan de vigilancia poscomercialización vencidos | `Art. 72(3)` [2] |
| 2027-12-02 | Alto riesgo, Anexo III: clasificación, requisitos, deberes del proveedor y responsable del despliegue, EIPD | `Art. 113(c)(i)` [2] |
| 2028-01-28 | Los organismos notificados de la Sección A del Anexo I solicitan designación bajo el Reglamento | `Art. 43(3)` [2] |
| 2028-08-02 | Alto riesgo, Anexo I (`Art. 6(1)`}) | `Art. 113(c)(ii)` [2] |
| 2030-08-02 | Los sistemas de alto riesgo heredados destinados a ser utilizados por autoridades públicas deben cumplir | `Art. 111(2)` [2] |
| 2030-12-31 | Los componentes de sistemas de TI a gran escala del Anexo X colocados antes del 2027-08-02 deben cumplir | `Art. 111(1)` [1] |

Otros sistemas de alto riesgo ya en el mercado antes de la fecha del Capítulo III caen bajo el
Reglamento solo si su diseño cambia significativamente después de esa fecha (`Art. 111(2)` según se
modifica) [2]. "Cambio significativo en el diseño" es por lo tanto un evento que el pipeline debe
registrar, con el razonamiento, cada vez que se modifica un sistema heredado.

## Lo que puedes hacer esta semana

1. **Añade tres campos a cada entrada del registro:** `eu_roles` (una lista, por sistema),
   {`risk_rung`} con el artículo que la puso allí, y {`output_used_in_eu`}. Ejecuta
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) para encontrar los sistemas que no tienen
   entrada.
2. **Escribe el registro de decisión de clasificación** para cada candidato del Anexo III, con la
   condición {`Art. 6(3)`} en la que se basa y la bandera de definición de perfil indicada
   explícitamente, y guárdalo junto al sistema. El
   [triage del Reglamento de IA](/toolkit/ai-act-triage) redacta uno contra el
   [esquema](/schemas/classification-decision-record.v1.json).
3. **Cierra las prohibiciones del 2 de diciembre de 2026.** Pon {`Art. 5(1)(ba)`} y {`(bb)`} en la
   lista de denegación de admisión y añade un conjunto adversarial para cualquier generador de
   imagen, vídeo o voz a la puerta de eval antes de esa fecha.
4. **Lee tus términos de proveedor para {`Art. 25`}.** Encuentra la cláusula que excluye el uso de
   alto riesgo y el acuerdo escrito bajo {`Art. 25(4)`}; abre un ticket de debida diligencia siempre
   que un componente de alto riesgo no tenga ninguno.
5. **Prueba las superficies {`Art. 50`} que ya están en directo.** Comprueba que cada interfaz de
   chat divulga el uso de IA y cada generador marca su salida, y archiva la comprobación aprobada
   como evidencia.

**Correspondencias:** Reglamento de IA de la UE {`Arts. 2`}, {`3`}, {`4`}, {`4a`}, {`5`}, {`6`},
{`8`} a {`27`}, {`43`} a {`50`}, {`51`} a {`57`}, {`60`} a {`61`}, {`72`} a {`75d`}, {`86`}, {`99`},
{`101`}, {`111`}, {`113`} (según se modifica por el Reglamento (UE) 2026/1744) · Código de Prácticas
de IA de Uso General · Código de Prácticas sobre Transparencia del Contenido Generado por IA ·
Colorado SB 26-189 · Texas HB 149 · Ley Básica de IA de Corea · ISO/IEC 22989 · las cinco capas del
stack. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (original text: Arts. 2, 3, 5 to 27, 43, 49 to 61, 64 to 75, 85 to 87, 99, 101, 111, 113; Annexes I, III, VIII). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230; OJ L, 2026/1744, 24.7.2026; in force on the third day after publication (amended Arts. 2, 3(14), 4, 4a, 5, 6, 10, 11, 17, 25, 27, 42, 43, 50, 56, 57, 60, 60a, 63, 72, 75, 75a to 75d, 77, 99, 111, 113; Annexes I, VIII, XIV). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (seven elements; four out-of-scope families; non-binding; formal text C(2025) 5053 final). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[4] Commission Guidelines on prohibited artificial intelligence practices, as defined by the AI Act (non-binding; authoritative interpretation reserved to the CJEU). European Commission. 2025-02-04. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act (verified: primary)
[5] Draft Commission guidelines on the classification of high-risk AI systems (Art. 6; Annex I and Annex III sections; practical examples; draft for targeted consultation). European Commission. 2026-05-19. https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems (verified: primary)
[6] Guidelines for providers and deployers of AI high-risk systems (policy page: classification guidelines still in draft, consultation open until 23 July 2026; application dates 2 Dec 2027 and 2 Aug 2028). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems (verified: primary)
[7] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; 10^23 FLOP indicative criterion; one-third modification criterion; monetisation; notification within two weeks; fines from 2 Aug 2026). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[8] The General-Purpose AI Code of Practice (published 10 July 2025; Transparency, Copyright, and Safety and Security chapters; confirmed as an adequate voluntary tool). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[9] Code of Practice on Transparency of AI-generated Content (final version 10 June 2026; provider marking and detection, deployer labelling; confirmed as an adequate voluntary tool; Art. 50 guidelines: draft 8 May 2026, final 20 July 2026). European Commission. 2026-06-10. https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content (verified: primary)
[10] SB26-189 Automated Decision-Making Technology (signed 14 May 2026; developer and deployer duties; covered technology from 1 Jan 2027; deployer records kept at least three years). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[11] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text (Sec. 552.001 definitions of developer and deployer). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[12] Framework Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 21311 as amended 20 Jan 2026, version in force 21 Jul 2026 (Art. 2(7) to (9) roles; Art. 4 reach; Arts. 31 to 36 duties and domestic representative). Korea Ministry of Government Legislation (law.go.kr). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791 (verified: primary)
[13] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (edition 1; AI stakeholder roles). ISO/IEC JTC 1/SC 42. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[14] Guidelines on transparency obligations for providers and deployers of AI systems (Art. 50; final text after the draft of 8 May 2026; obligations apply from 2 Aug 2026). European Commission. 2026-07-20. https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems (verified: primary)
