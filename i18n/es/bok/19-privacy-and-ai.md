---
lang: es
source: bok/19-privacy-and-ai.md
sourceHash: "b4edeb76a673fe200699b6e6830e31e975325b921be2a2968fbf303a0af74e72"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 19. Ley de privacidad y protección de datos aplicada a la IA

> La ley de protección de datos ya vincula cada sistema de IA que toca datos personales; este
> capítulo convierte sus deberes para entrenamiento, inferencia, derechos e incumplimientos en
> artefactos, capas del stack y evidencia.

La ley de privacidad fue la primera ley de IA. El RGPD se ha aplicado desde el 25 de mayo de 2018 a
cualquier tratamiento de datos personales, y un modelo entrenado en, recuperando de o decidiendo
sobre personas trata datos personales en varios puntos de su vida [1]. El Reglamento de IA añade
deberes encima sin desplazar la protección de datos, y lo dice en su propio texto [2]. Los deberes
de privacidad generalmente llegan primero, conllevan multas de hasta EUR 20 millones o el 4% de la
facturación anual mundial por incumplimientos de los principios fundamentales [1], y alcanzan
sistemas que el Reglamento de IA nunca clasifica como de alto riesgo.

El RGPD es la columna vertebral aquí, con contrastes breves con el RGPD del Reino Unido, las leyes
estatales de EE.UU., la LGPD de Brasil y la PIPL de China. Cada deber se resuelve en un
**artefacto**, una **capa del stack** (capítulo 04) y un **registro de evidencia** que una consulta
puede devolver. Una línea de desambiguación: el delegado de protección de datos y el asesor de
privacidad deciden si se mantiene una base lícita; el ingeniero de gobernanza de IA construye el
registro que muestra la decisión, el control que la hace cumplir y la señal que dice cuándo dejó de
mantenerse. Esta es traducción de ingeniería, no asesoramiento legal.

## Cómo leer este capítulo

Un sistema de IA trata datos personales en más momentos de los que sus propietarios suelen enumerar,
y cada momento es una operación de tratamiento separada con su propio propósito, base, retención y
exposición de derechos. La tabla utiliza el ejemplo en ejecución del capítulo 04, {`csa-01`}, un
asistente de servicio al cliente en una gran telco, ajustado finamente en transcripciones de soporte
anteriores, recuperando de notas de cuenta y llamando a un modelo de terceros.

| Momento de tratamiento | Datos personales ({`csa-01`}) | Lo que la ley pide primero | Registro de evidencia |
|---|---|---|---|
| Recopilación para entrenamiento | Transcripciones históricas | Compatibilidad de propósito; base; aviso | Entrada del registro de base |
| Entrenamiento y ajuste fino | Transcripciones filtradas | Minimización; detección de categorías especiales | Ficha de datos; registro de filtro |
| Indexación de recuperación (RAG) | Notas de cuenta | Control de acceso; retención; alcance de derechos | Manifiesto de índice |
| Deducción | Prompts y salidas en directo | Transparencia; transferencias; límites de ADM | Rastreo con veredictos de política |
| Registro y monitoreo | Prompts, salidas, rastreos | Limitación de almacenamiento; seguridad | Veredictos de retención |
| Evaluación | Conjuntos dorados y de equipo rojo | Minimización; sintético donde sea posible | Ficha de conjunto de eval |

Las fichas de datos viven en la capa 02
([Inventory & Transparency](/bok/the-stack#layer-02-inventory--transparency)); reglas de propósito,
retención y residencia en la capa 01; pruebas de privacidad en la capa 03; redacción, filtros y
enrutamiento en la capa 04; y los registros que un regulador pide en la capa 05. Dos capítulos
vecinos llevan el lado organizativo: capítulo 12 sobre
[actualizar las políticas que ya tienes](/bok/governance-program#updating-the-policies-you-already-have),
y capítulo 14 sobre
[el derecho a usar los datos](/bok/governing-development#the-right-to-use-the-data) en la
[puerta de admisión de conjunto de datos](/patterns/dataset-admission-gate).

## Principios aplicados a la IA

El artículo 5 RGPD establece los principios (licitud, equidad y transparencia; limitación de
propósito; minimización de datos; exactitud; limitación del almacenamiento; integridad y
confidencialidad) y hace que el responsable del tratamiento pueda demostrar el cumplimiento, el
deber de responsabilidad [1]. Para la IA los principios no cambian; dónde muerden sí.

### Base lícita para entrenamiento versus inferencia

El artículo 6 ofrece seis bases lícitas y ninguna se clasifica por encima de otra; el responsable
del tratamiento elige la que se ajusta a cada actividad de tratamiento [3]. La trampa es elegir una
base para "el modelo". El entrenamiento en transcripciones, la indexación de notas de cuenta y la
respuesta a un cliente en directo son actividades diferentes, y cada una necesita su propia base.
[La orden del Garante sobre ChatGPT](/cases/garante-chatgpt-order) muestra lo que cuesta una base no
registrada.

| Etapa | Bases que generalmente se ajustan | Por qué la elección es difícil |
|---|---|---|
| Entrenar un modelo con datos raspados o de terceros | Intereses legítimos (`Art. 6(1)(f)`) | Sin relación con las personas; notificación indirecta; la oposición debe funcionar |
| Ajuste fino con datos de clientes que posees | Intereses legítimos; a veces consentimiento | Nuevo propósito; prueba de compatibilidad; expectativas |
| Recuperación sobre registros de clientes | Contrato (`Art. 6(1)(b)`) para ese cliente | El índice no debe responder a un cliente con datos de otro |
| Inferencia al servicio del cliente | Contrato; intereses legítimos | La necesidad es estrecha |
| Monitoreo de registros y revisión de abusos | Intereses legítimos; obligación legal | La retención se desvía; la revisión humana amplía el acceso |

El artefacto es un **registro de bases**: cada conjunto de datos y etapa lleva su base, propósito y
un puntero a la evaluación detrás, adjunto a la entrada del registro del sistema. Un trabajo de
entrenamiento lo lee y rechaza ejecutarse en un conjunto de datos cuya base no cubre el
entrenamiento.

> **Ejemplo (ilustrativo)**
> Una entrada del registro de bases leída por el pipeline de entrenamiento `csa-01` antes de una
> ejecución:
>
> ```json
> { "dataset": "support-transcripts-2025q4", "system": "csa-01", "stage": "fine-tuning",
>   "basis": "Art. 6(1)(f)", "lia_ref": "lia-csa-01-v3", "purpose": "support-answer-quality",
>   "special_category_scan": "pass", "retention": "P18M", "objection_opt_out": true }
> ```

### Intereses legítimos y la prueba de tres pasos

Los intereses legítimos son la base en la que los desarrolladores de IA es más probable que se basen
[4]. La EDPB estableció cómo las autoridades lo prueban en la Opinión 28/2024 del 17 de diciembre de
2024 [3]. El interés debe ser lícito, articulado con precisión, y real y presente. El tratamiento
debe ser necesario, sin una forma menos intrusiva de alcanzar el mismo fin, juzgado con la
minimización en mente. Y el interés no debe ser anulado por los derechos de las personas, donde las
expectativas razonables pesan mucho: si los datos eran públicos, la relación con el responsable, la
fuente y su configuración de privacidad, si las personas saben que sus datos están en línea [3].

Cuando el equilibrio se inclina, las mitigaciones más allá de lo que el RGPD ya requiere pueden
restaurarlo. Los ejemplos de la EDPB incluyen enmascarar nombres y correos electrónicos con valores
falsos, un retraso entre recopilar un conjunto de datos y entrenar con él, una opción de exclusión
incondicional antes del tratamiento, supresión más allá de los motivos del artículo 17, un canal
para informar de regurgitación, excluir fuentes intrusivas y respetar `robots.txt` o `ai.txt` al
raspar, y filtros de salida en el despliegue [3]. La CNIL añade un derecho discrecional previo a la
oposición y transparencia sobre el riesgo de extracción [4].

Cada mitigación es un control, así que la **evaluación de intereses legítimos (LIA)** es un
artefacto versionado que apunta cada mitigación al control que la implementa (el punto final de
exclusión, el id de la regla de filtro, la lista de permitidos de raspado). Desactiva una mitigación
y la LIA se vuelve obsoleta; el registro debería indicarlo.

### Los límites del consentimiento

El consentimiento debe ser específico, informado y libremente dado; el responsable debe probarlo; y
las personas pueden retirarlo en cualquier momento, tan fácilmente como lo dieron, con efecto para
el futuro [1]. La retirada después del entrenamiento no elimina la influencia de una persona de los
pesos calculados, así que un conjunto de entrenamiento basado en consentimiento compromete al
responsable a una ruta de eliminación que puede ejecutar realmente (véase «Supresión,
reentrenamiento y desaprendizaje» más abajo). El consentimiento a un servicio tampoco es
consentimiento para entrenar un modelo con los datos del servicio. El artefacto es un
**registro de consentimiento-propósito** que une cada consentimiento a los conjuntos de datos y
versiones de modelo que lo heredaron; sin esa unión una retirada no puede rastrearse a las
ejecuciones que afecta. La PIPL de China añade un consentimiento separado para información personal
sensible [5].

### Transparencia para las personas en los datos

Los artículos 13 y 14 requieren notificación, y el artículo 14 cubre datos no recogidos de la
persona, el caso normal para datos de entrenamiento raspados o con licencia [1]. Cuando están
implicadas decisiones del artículo 22, la notificación y el acceso deben incluir información
significativa sobre la lógica implicada y las consecuencias previstas [1]. Una notificación escrita
para el servicio original rara vez describe el entrenamiento, y una notificación que describía el
modelo del año pasado es incorrecta después de un reentrenamiento con nuevas fuentes. Genera la
notificación desde la misma entrada del registro que la ficha de modelo, así cambia cuando las
fuentes lo hacen; la EDPB nombra fichas de modelo entre las formas de cerrar la brecha de
información [3].

### Limitación de propósito y función creep

Los datos no pueden ser tratados de forma incompatible con su propósito original; el artículo 6(4)
establece la prueba: el vínculo entre propósitos, el contexto, la naturaleza de los datos, las
consecuencias y las salvaguardas, como el cifrado o la seudonimización [1]. La IA hace que cada
registro almacenado parezca datos de entrenamiento, y los fallos son **función creep**:
transcripciones de soporte reutilizadas para perfilar clientes para ventas, metraje de seguridad
reutilizado para asistencia, características de fraude reutilizadas para límites de crédito.

El control es una etiqueta de propósito que viaja con los datos y una regla de capa 01 que compara
el propósito en la tarjeta del conjunto de datos con el propósito declarado por el sistema
consumidor, denegando la ejecución cuando difieren y no se registra ninguna evaluación de
compatibilidad. Una unión denegada es prueba del bit de límite de propósito.

> **En la práctica (ilustrativo)**
> Un equipo de análisis fue pedido para ajustar un modelo de abandono en las transcripciones
> recogidas para `csa-01`. La comprobación de propósito denegó el trabajo: la tarjeta decía
> `support-answer-quality`, el solicitante decía `retention-marketing`, y no existía ninguna
> evaluación de compatibilidad. La solicitud se convirtió en una evaluación del artículo 6(4) que
> permitía solo recuentos de temas agregados, y la ejecución denegada y la evaluación fueron ambas
> archivadas contra la entrada del registro del conjunto de datos.

**Correspondencias:** RGPD `Arts. 5–7`, `13`, `14` · Reglamento de IA `Art. 10`, `Art. 13` · ISO/IEC
42001 · ISO/IEC 27701 · NIST AI RMF (Map) · capas 01 y 02. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Minimización, privacidad por diseño y PETs

Los datos deben ser adecuados, relevantes y limitados a lo que el propósito necesita, y el artículo
25 requiere esto por diseño (medidas como la seudonimización incorporadas) y por defecto (solo se
tratan y hacen accesibles los datos que cada propósito necesita) [1]. El aprendizaje automático tira
en la otra dirección, así que la minimización se argumenta característica por característica, no se
afirma una vez:

- **Justificación a nivel de característica.** Cada característica de entrada lleva una razón y una
  contribución medida en la tarjeta de datos; una sin ninguna es eliminada, y los campos de
  categoría especial necesitan una condición documentada.
- **Filtrado antes del entrenamiento.** Los escaneos de PII y categoría especial se ejecutan en cada
  instantánea y el registro de filtro se mantiene con ella; la EDPB enumera la selección de fuentes,
  preparación y filtrado entre las áreas que una autoridad examina [3].
- **Recuperación mínima y registros.** Los índices RAG contienen solo los campos que las respuestas
  necesitan; la retención de registros sigue la obligación, no el defecto de almacenamiento. La
  tensión con los deberes de registro de la Ley de IA (véase
  [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) se resuelve registrando lo que el deber
  necesita, seudonimizado donde lo permite.
- **Conjuntos de evaluación sintéticos o enmascarados** siempre que una prueba no dependa de
  identidades reales.

### Anonimización versus seudonimización

La distinción decide si el RGPD se aplica. Los datos **seudonimizados** no pueden atribuirse a una
persona sin información adicional mantenida por separado [1]; los datos que pueden re-atribuirse con
esa información siguen siendo sobre una persona identificable [1], y las directrices de 2025 de la
EDPB tratan la seudonimización como una salvaguarda a aplicar bien [6]. Los datos **anónimos** caen
fuera del RGPD, pero el Considerando 26 juzga la identificabilidad contra todos los medios
razonablemente probables de ser utilizados, por el responsable u otra persona, dado el coste, tiempo
y tecnología [1].

En EDPS c. SRB (C-413/23 P, 4 de septiembre de 2025) el Tribunal de Justicia sostuvo que los datos
seudonimizados no son datos personales en todos los casos y para cada persona, ya que la
seudonimización puede impedir que un destinatario identifique a nadie; pero los deberes propios del
responsable, como informar a las personas, se juzgan desde el punto de vista del responsable en la
recogida [7]. En una cadena de suministro de IA, un proveedor que recibe registros bien
seudonimizados sin la clave puede estar fuera del RGPD para ellos; el remitente no.

Las afirmaciones de anonimización decaen. Un estudio estimó que el 99,98% de los estadounidenses
serían correctamente re-identificados en cualquier conjunto de datos usando 15 atributos
demográficos [8]. Mantén una **evaluación de re-identificación** con cada conjunto de datos
"anónimo": técnica, modelo de atacante, riesgo residual y fecha.

### Tecnologías de mejora de la privacidad y sus límites honestos

Las tecnologías de mejora de la privacidad (PETs) reducen lo que un atacante, proveedor o persona
interna puede aprender. Ninguna hace que un sistema sea conforme, y cada una tiene un modo de fallo
conocido.

| PET | Qué hace | Lo que no hace | Registro de evidencia |
|---|---|---|---|
| Privacidad diferencial | Limita cuánto un registro puede cambiar un resultado o modelo | Cubrir datos fuera del presupuesto; sobrevivir a un presupuesto mal establecido o reiniciado | Presupuesto de privacidad por lanzamiento, con método de contabilidad |
| Aprendizaje federado | Entrena donde viven los datos [9] | Ocultar datos en gradientes compartidos, que pueden filtrar ejemplos [10] | Configuración de agregación y DP |
| Datos sintéticos | Reemplaza registros reales para pruebas o compartición | Garantizar privacidad: o falla al detener ataques de inferencia o pierde utilidad [11] | Tarjeta de generador; resultados de ataque |
| Seudonimización y enmascaramiento | Elimina identificadores directos | Hacer datos anónimos; detener vinculación de cuasi-identificadores | Registro de custodia de claves; reglas de enmascaramiento |
| Ejecución confiable (enclaves) | Protege datos en uso del anfitrión | Eliminar confianza en el proveedor de hardware; reparar memorización | Informe de atestación por carga de trabajo |
| Filtrado de salida y redacción | Bloquea datos personales en tiempo de ejecución | Eliminar datos del modelo; capturar cada paráfrasis | Decisiones de guardrail con ids de regla |

NIST SP 800-226 es la referencia para evaluar afirmaciones de privacidad diferencial y nombra los
«peligros de privacidad» que aparecen en la implementación [12]. Una afirmación de PET es una eval
como cualquier otra: un umbral, un ataque nombrado, una compilación fallida cuando se pierde el
umbral.

> **En la práctica (ilustrativo)**
> Un equipo intercambió registros reales en la suite de regresión de `csa-01` por sintéticos y
> asumió que el problema estaba resuelto. Una prueba de inferencia de membresía añadida a la puerta
> de eval marcó registros raros reproducidos casi textualmente. El generador fue reentrenado con un
> presupuesto de privacidad, la prueba se mantuvo como una puerta permanente, y la tarjeta del
> conjunto sintético ahora lleva el resultado del ataque como su evidencia de idoneidad.

**Correspondencias:** RGPD `Art. 5(1)(c)`, `Art. 25`, `Art. 32` · Reglamento de IA `Art. 10`,
`Art. 4a` · ISO/IEC 27701 · NIST AI RMF (Measure) ·
[Gobernanza de datos en todo el stack](/bok/the-stack#data-governance-across-the-stack) · capas 01,
03 y 04. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Deberes del responsable en toda la cadena de suministro de IA

### Responsable, encargado del tratamiento o responsables conjuntos

Un **responsable del tratamiento** decide los fines y los medios; un **encargado del tratamiento**
actúa en su nombre; las partes que deciden conjuntamente son
**responsables conjuntos del tratamiento** y deben repartirse las responsabilidades [1]. El
Reglamento de IA no mapea el proveedor y el responsable de la implantación uno a uno con estos: un
responsable de la implantación suele ser un responsable del tratamiento, y un proveedor de modelos
puede ser tu encargado del tratamiento para la inferencia y un responsable del tratamiento para su
propio entrenamiento.

| Actor | Rol típico del RGPD | Qué lo decide |
|---|---|---|
| Desarrollador de modelos que entrena con datos que recopiló | Responsable del tratamiento para el entrenamiento | Eligió las fuentes y el fin |
| Proveedor de API que sirve tu inferencia | Encargado del tratamiento | Actúa solo según instrucciones documentadas [1] |
| El mismo proveedor que entrena con tus prompts | Responsable del tratamiento para ese uso | Un encargado del tratamiento que determina los fines es un responsable del tratamiento para ese tratamiento [1] |
| Tu organización que despliega el asistente | Responsable del tratamiento | Decide por qué se tratan los datos de los clientes |
| Socios que entrenan conjuntamente con datos agrupados | Responsables conjuntos del tratamiento | Deciden los fines y los medios conjuntamente |

Mantén un **registro de roles** por sistema y fase con la entrada del registro: un responsable del
tratamiento ejecuta la EIPD y responde a las solicitudes; un encargado del tratamiento asiste y
notifica las violaciones al responsable del tratamiento sin dilación indebida [1].

### Acuerdos de tratamiento de datos con proveedores de IA y cláusulas de no entrenamiento

El artículo 28 requiere un contrato bajo el cual el encargado del tratamiento actúa solo según
instrucciones documentadas, incluidas las transferencias [1]. Para proveedores de IA, la
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) debe verificar
cláusulas que un acuerdo genérico no cubre:

- **Sin entrenamiento con datos de clientes** (prompts, salidas, ficheros, embeddings,
  retroalimentación), cualquier consentimiento explícito.
- **Retención de prompts y salidas**, incluida la retención para monitoreo de abuso y revisión del
  personal.
- **Ubicación del tratamiento** por endpoint y función, incluido el acceso de soporte.
- **Subencargados del tratamiento**, con notificación y objeción cuando cambia un anfitrión de
  modelos.
- **Supresión y devolución** al final del contrato, certificadas.
- **Notificación de violación** con un plazo que deje espacio para las propias 72 horas del
  responsable del tratamiento.
- **Notificación de cambios** cuando el modelo, su política de datos o su región cambian.
- **Evidencia**: ficha de modelo, atestaciones de seguridad y cualquier AIBOM, entregadas como
  documentos almacenados.

El registro de la puerta (respuestas de lista de verificación, referencia de contrato, fecha) se
encuentra en la entrada del registro del proveedor y se vuelve a ejecutar en cada cambio notificado.

### La EIPD para sistemas de IA

Se requiere una **EIPD** antes de un tratamiento que probablemente resulte en un riesgo alto,
particularmente con nuevas tecnologías, y siempre para los tres casos del artículo 35(3): evaluación
sistemática con decisiones automatizadas significativas, tratamiento a gran escala de categorías
especiales y monitoreo a gran escala de espacios públicos [1]. Las directrices del Grupo de Trabajo
del artículo 29, respaldadas por el CEPD, dan nueve criterios y dicen que el tratamiento que cumple
dos de ellos generalmente necesitará una EIPD [13]. Los sistemas de IA cumplen varios a la vez:

| Criterio [13] | Caso típico de IA |
|---|---|
| Evaluación o puntuación | Puntuaciones de riesgo, modelos de propensión, clasificación de candidatos |
| Decisiones automatizadas con efecto legal o similar | Crédito, contratación, seguros, elegibilidad |
| Monitoreo sistemático | Análisis de lugar de trabajo, vídeo o actividad de agentes |
| Datos sensibles o altamente personales | Salud, biometría, rasgos inferidos |
| Gran escala; coincidencia o combinación de conjuntos de datos | Corpus a escala web; conjuntos de entrenamiento fusionados |
| Interesados vulnerables | Empleados, niños, pacientes |
| Tecnología innovadora | Modelos generativos, agentes, análisis de emociones |
| Prevenir el ejercicio de un derecho o el uso de un servicio | Puertas de elegibilidad automatizadas |

Una EIPD de IA necesita campos que una plantilla genérica no tiene: cada momento del tratamiento con
su base, fuentes de entrenamiento y filtrado, riesgo de memorización con los resultados de eval que
lo miden, el análisis de ADM, el mapa de proveedor y transferencia, el diseño de supervisión y la
ruta de derechos para datos dentro del modelo. El artículo 35(7) establece el contenido mínimo, y
cuando el riesgo residual sigue siendo alto, el responsable del tratamiento consulta primero a la
autoridad, que tiene hasta ocho semanas para responder [1]. El CEPD espera ver EIPDs y también
decisiones de que no era necesaria [3], así que "sin EIPD" es también un artefacto. Los responsables
de la implantación de sistemas de alto riesgo utilizan la información del artículo 13 del proveedor
para su EIPD [14], y la FRIA del artículo 27 complementa una EIPD en lugar de repetirla [15]; el
patrón [FRIA-as-Code](/patterns/fria-as-code) escribe los campos compartidos una sola vez. La página
de plantillas tiene un [apéndice de EIPD de IA](/resources/templates#schema-impact-assessment) en su
esquema de evaluación de impacto.

### Registros de tratamiento

El artículo 30 requiere un registro de las actividades de tratamiento (ROPA): fines, categorías de
datos y personas, destinatarios, transferencias, retención, seguridad [1]. Un sistema de IA
generalmente significa una entrada por momento de tratamiento, y las entradas se vuelven obsoletas
con cada cambio de pipeline, así que genéralas desde el registro, las fichas de datos y el registro
de base. El nuevo artículo 4a del Reglamento de IA se basa en este registro: cuando se tratan datos
de categorías especiales para detección de sesgos, el ROPA debe decir por qué fue estrictamente
necesario y por qué otros datos no servirían [2].

### Transferencias, inferencia remota y EIT

El capítulo V del RGPD requiere una base para cada transferencia a un tercer país: adecuación,
salvaguardas apropiadas como cláusulas contractuales tipo, o una derogación estrecha [1]. Los tres
criterios acumulativos del CEPD definen una transferencia (un exportador sujeto al RGPD pone datos
personales a disposición de un importador en un tercer país), y sus directrices tratan el acceso
remoto desde un tercer país como una transferencia [16]. Para IA que cubre un prompt con datos
personales enviados a un endpoint fuera del EEE, telemetría del proveedor que lleva prompts, una
conmutación por error a otra región y un equipo de soporte extranjero que puede leer registros.

Cuando la base es contractual, el exportador ejecuta una **evaluación de impacto de transferencia**
sobre si la ley del importador le permite honrar las cláusulas, añadiendo medidas complementarias
como recomienda el CEPD [17] bajo las cláusulas contractuales tipo de 2021 [18]. Para Estados
Unidos, la decisión de adecuación del Marco de Privacidad de Datos del 10 de julio de 2023 cubre
organizaciones certificadas [19], y el Tribunal General desestimó una acción para anularla el 3 de
septiembre de 2025 [20]. Registra que la entidad del proveedor está certificada para los datos en
cuestión.

El control extiende la regla de residencia del capítulo 04
([capa 01](/bok/the-stack#layer-01-govern-as-code)): enruta la inferencia para cada clase de datos
solo a endpoints cuya base está registrada, deniega en caso contrario y emite el veredicto. La
evidencia es el flujo de veredictos más un registro de transferencias (endpoint, región, importador,
base, referencia de EIT, fecha de revisión).

> **En la práctica (ilustrativo)**
> Cuando `csa-01`'s proveedor anunció un modelo servido desde una región estadounidense, el aviso de
> cambio activó la puerta de debida diligencia. Verificó la certificación del Marco de Privacidad de
> Datos del proveedor, almacenó la verificación en el registro de transferencias, y la política de
> residencia entonces permitió el nuevo endpoint solo para prompts de soporte pseudonimizados. Las
> notas de cuenta permanecieron en el endpoint de la UE, y los veredictos de política en los rastros
> probaron qué datos fueron adónde.

**Correspondencias:** RGPD `Arts. 26`, `28`, `30`, `35`, `36`, `44`–`46` · Reglamento de IA de la UE
`Art. 4a`, `Art. 26(9)`, `Art. 27(4)` · ISO/IEC 42001 Anexo A.10 · ISO/IEC 27701 · NIST AI RMF
(Govern, Map) · capas 01, 02 y 05. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Toma de decisiones automatizada

### Artículo 22 del RGPD después de SCHUFA

El artículo 22 da a las personas el derecho a no ser objeto de una decisión basada únicamente en
tratamiento automatizado, incluida la elaboración de perfiles, con efectos legales o significativos
similares. Tales decisiones se permiten solo cuando son necesarias para un contrato, autorizadas por
ley o basadas en consentimiento explícito, y entonces con al menos el derecho a intervención humana,
a expresar una opinión y a impugnar [1]. El capítulo 16 convierte
[toma de decisiones automatizada bajo el artículo 22 del RGPD](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime)
en registros de explicación e impugnación.

Dos sentencias establecen la tarea de ingeniería. En SCHUFA (C-634/21, 7 de diciembre de 2023) el
Tribunal de Justicia sostuvo que una puntuación de crédito es en sí misma una decisión automatizada
cuando los prestamistas le dan un papel determinante [21] (el lado de la ley de crédito está en el
capítulo 20, [crédito y préstamos](/bok/existing-law#credit-and-lending)). Un modelo que "solo
recomienda" está dentro del artículo 22 cuando los humanos posteriores lo siguen como regla, y la
parte que produce la puntuación está decidiendo por sí misma. En Dun & Bradstreet Austria (C-203/22,
27 de febrero de 2025) el Tribunal sostuvo que información significativa sobre la lógica significa
describir el procedimiento y los principios realmente aplicados, para que la persona entienda qué
datos se utilizaron y cómo; que decir cuánto cambiaría el resultado un cambio en los datos puede ser
apropiado; que entregar un algoritmo no es una explicación; y que los secretos comerciales alegados
van a la autoridad o tribunal para equilibrar [22].

Los artefactos siguen: un **registro de decisión** por decisión (versión del modelo, entradas,
resultado, códigos de razón, contrafáctico); un **aviso** de que se tomó una decisión únicamente
automatizada y cómo impugnarla; una
**[ruta de impugnación](/patterns/decision-notice-contest-path)** a un revisor con autoridad e
información para cambiar el resultado, con un registro de lo que hizo; y un monitor de la
supervisión misma, porque un revisor que confirma casi cada salida en segundos no es una
participación significativa (el patrón [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)).

> **Ejemplo (ilustrativo)**
> Un registro de decisión para `credit-check-04`, una verificación de financiación de dispositivos
> de una operadora de telecomunicaciones, archivado en tiempo de ejecución:
>
> ```json
> { "decision_id": "cc4-2026-09-18-0192", "system": "credit-check-04@3.2",
>   "solely_automated": true, "basis": "GDPR Art. 22(2)(a)", "outcome": "declined",
>   "reason_codes": ["R07 payment arrears", "R12 short credit history"],
>   "counterfactual": "approval likely after six months without arrears",
>   "notice_sent": "2026-09-18T10:02:11Z", "contest_channel": "human-review-queue" }
> ```

### Los regímenes lado a lado

| Régimen | Desencadenante | Deber o derecho central | Artefacto | Capa |
|---|---|---|---|---|
| GDPR `Art. 22`, `Art. 15(1)(h)` | Decisión únicamente automatizada, efecto legal o similar | Permiso estrecho; intervención, opinión, impugnación; información sobre la lógica [1][22] | Registro de decisión; aviso; ruta de impugnación | 4 · 5 |
| UK GDPR `Arts. 22A–22D` | Decisión significativa sin participación humana significativa | Permitida con salvaguardas; más estricta para datos de categorías especiales [23] | Lo mismo, más por qué la participación es significativa | 4 · 5 |
| Regulaciones ADMT de la CCPA | ADMT para una decisión significativa | Aviso previo al uso; exclusión o apelación humana; acceso; desde el 1 de enero de 2027 [24] | Aviso; flujo de trabajo de exclusión y apelación; evaluación de riesgo | 2 · 4 · 5 |
| Leyes estatales estadounidenses (Virginia, Colorado, Minnesota) | Elaboración de perfiles para decisiones con efectos legales o similares | Exclusión [25][26]; en Minnesota, cuestionar el resultado, aprender la razón, reevaluación con datos corregidos [27] | Bandera de exclusión honrada en inferencia; flujo de trabajo de revisión | 1 · 4 |
| LGPD `Art. 20` | Decisión únicamente por tratamiento automatizado que afecta intereses | Revisión; información sobre criterios, respetando secretos comerciales [28] | Flujo de trabajo de revisión; declaración de criterios | 4 · 5 |
| PIPL `Art. 24` | Decisión automatizada con impacto significativo | Transparencia, equidad; explicación; rechazo de decisiones únicamente automatizadas [5] | Servicio de explicación; ruta manual | 4 |
| Reglamento de IA de la UE `Art. 86`, `Art. 26(11)` | Decisión del responsable de la implantación sobre una salida de alto riesgo del Anexo III | Explicación del papel del sistema y elementos principales; informar a las personas [29][14] | Explicación vinculada al registro de decisiones | 4 · 5 |

El artículo 86 se aplica solo cuando la ley de la Unión no otorga ya el derecho [29], por lo que la
vía RGPD suele resolver la cuestión (el capítulo 18 lee
[artículo 86 del Reglamento de IA y artículo 4a](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
en contexto). Se sitúa fuera de los requisitos del Anexo III que el Omnibus Digital aplazó al 2 de
diciembre de 2027 [2], y si se aplica antes no está resuelto a fecha de 2026-09-24 (verificar). La
propuesta de Omnibus Digital reformularía el artículo 22 como una lista de permisos en la que la
necesidad contractual se mantiene incluso si una persona podría decidir [30]; no es ley (véase más
abajo).

**Correspondencias:** RGPD `Art. 13(2)(f)`, `Art. 15(1)(h)`, `Art. 22` · UK GDPR `Arts. 22A–22D` ·
Regulaciones CCPA ADMT · LGPD `Art. 20` · PIPL `Art. 24` · Reglamento de IA de la UE `Art. 14`,
`Art. 26(11)`, `Art. 86` · NIST AI RMF (Manage) · capas 04 y 05. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Derechos de los interesados contra modelos entrenados

### Dónde debe llegar una solicitud

Los derechos de acceso, rectificación, supresión y oposición [1] no se detienen en la base de datos.
El plazo es de un mes, ampliable en dos para solicitudes complejas [31], por lo que la vía se diseña
antes de la primera solicitud. Un responsable del tratamiento que no pueda identificar a una persona
en un conjunto de entrenamiento puede decirlo, y la persona puede proporcionar información que haga
posible la identificación [31].

| Dónde están los datos | Respuesta viable a la supresión u oposición | Evidencia |
|---|---|---|
| Sistemas fuente y corpus bruto | Herramientas de solicitud normales | Cierre de ticket |
| Instantáneas de entrenamiento y ajuste fino | Eliminar; marcar modelos entrenados en la instantánea | Diferencia de instantánea |
| Índice RAG y cachés | Eliminar o reindexar fragmentos; inmediato | Manifiesto de índice |
| Registros de prompts y salidas | Eliminar o pseudonimizar por clave de interesado | Veredicto de retención |
| Conjuntos de eval | Reemplazar con registros sintéticos | Ficha de conjunto de eval |
| Pesos del modelo (si no son anónimos) | Suprimir salidas ahora; reentrenar o desaprender según calendario | Regla de filtro; plan de reentrenamiento |

### Supresión, reentrenamiento y desaprendizaje

Para datos dentro de los pesos hay una escala, de rápida y parcial a lenta y completa:

1. **Supresión de salidas.** Un filtro alrededor del modelo evita que produzca los datos de la
   persona. La CNIL acepta filtros donde el reentrenamiento es desproporcionado, si se demuestra que
   son efectivos y robustos, y prefiere reglas generales a una lista de nombres (en sí misma una
   lista de personas que se opusieron) [31]. Los datos permanecen en el modelo; prueba el filtro
   como cualquier control.
2. **Reentrenamiento sin los datos.** Cuando los datos de entrenamiento aún se conservan, el
   reentrenamiento responde a la solicitud, y el reentrenamiento periódico agrupa muchas [31].
   Completo para la nueva versión, costoso para modelos grandes.
3. **Desaprendizaje automático.** Enfoques exactos como el entrenamiento de fragmentos SISA para que
   solo se reentrene el fragmento afectado [32]; los aproximados ajustan pesos y son difíciles de
   verificar. Trata cualquier afirmación de desaprendizaje como una prueba a pasar (inferencia de
   pertenencia o extracción en los registros eliminados).

Registra la opción y su razón por solicitud: el regulador preguntará por qué supresión y no
reentrenamiento, y cuándo el próximo reentrenamiento cierra la brecha.

### Registro de cómo se cumplió una solicitud

La evidencia es un **[registro de cumplimiento](/patterns/rights-requests-against-models)** escrito
por el flujo de trabajo: cada ubicación, la acción en cada una, las versiones del modelo afectadas y
cuándo se cierra la brecha.

> **Ejemplo (ilustrativo)**
> Una solicitud de supresión contra `csa-01`, cerrada dentro del plazo:
>
> ```json
> { "request_id": "dsr-2026-0412", "right": "erasure", "subject_key": "hash:7c1e…",
>   "locations": { "crm": "deleted", "rag_index": "deleted", "fine_tune_set": "deleted",
>                  "logs": "deleted", "weights": "output-suppression:rule-dsr-0412" },
>   "retrain_scheduled": "csa-01@2026-10-15", "closed": "2026-09-30", "within_deadline": true }
> ```

**Correspondencias:** RGPD `Art. 12(3)`, `Arts. 15–17`, `Art. 21` · ISO/IEC 27701 · NIST AI RMF
(Manage) · capas 04 y 05. Los mapeos son ilustrativos, no una afirmación de conformidad.

## ¿Contiene un modelo datos personales?

### La prueba de anonimidad del EDPB

Si un modelo es dato personal, los derechos, las reglas de transferencia y de violación alcanzan los
pesos. Las autoridades difieren. El documento de debate de 2024 de la autoridad de Hamburgo
argumentó que almacenar un modelo de lenguaje grande no es tratamiento, que los derechos se adhieren
a las entradas y salidas del sistema, y que el entrenamiento ilícito no contamina el uso posterior
[33]. El EDPB fue más estricto: los modelos entrenados con datos personales no pueden en todos los
casos considerarse anónimos, y un modelo es anónimo solo si tanto la probabilidad de extraer
directamente datos de los interesados del entrenamiento como la probabilidad de obtenerlo a través
de consultas son insignificantes, dados todos los medios razonablemente probables de ser utilizados
[3]. La CNIL ha publicado desde entonces orientación sobre documentar si un modelo cae bajo el RGPD
y recomienda filtros robustos alrededor de modelos que pueden haber memorizado datos [34].

Para el ingeniero la opinión es un plan de prueba. Las autoridades examinarán la selección de
fuentes, preparación y minimización, opciones de entrenamiento (regularización, privacidad
diferencial), medidas de salida, auditorías y pruebas estructuradas contra inferencia de atributos y
pertenencia, exfiltración, regurgitación, inversión de modelo y ataques de reconstrucción; esperan
documentación incluyendo DPIAs (o la decisión de no ejecutar una), el modelo de amenaza, medidas por
fuente con URLs de fuente, y evidencia de resistencia a la reidentificación [3]. Eso es un
**paquete de evidencia de anonimidad**, y la mayoría es salida de la capa 03: una suite de ataque se
ejecuta como una puerta de eval en cada versión del modelo, y su resultado es la afirmación.

> **Ejemplo (ilustrativo)**
> Una línea de un paquete de evidencia de anonimidad, presentada contra una versión del modelo:
>
> ```json
> { "suite_id": "privacy.membership-inference.v2", "model_version": "csa-01@2026-09-18",
>   "attack_auc": 0.52, "threshold": 0.55, "canary_extraction": "0/500", "result": "pass" }
> ```

Pasar ataques conocidos evidencia resistencia a esos ataques solo, como nota el EDPB [3]; el paquete
se vuelve a ejecutar cuando el modelo, sus datos o el estado del arte cambian.

### Cuando el modelo fue entrenado ilícitamente

La opinión establece tres escenarios [3]. Si los datos personales permanecen en el modelo y
**el mismo responsable del tratamiento** lo despliega, el efecto del desarrollo ilícito se evalúa
caso por caso. Si **otro responsable del tratamiento** lo despliega, ese responsable debe haber
evaluado que el modelo no fue desarrollado ilícitamente, observando la fuente de los datos y
cualquier infracción encontrada por una autoridad o tribunal, escalada a su propio riesgo. Si el
modelo fue **anonimizado** antes del despliegue y los procesos de despliegue no procesan datos
personales, el RGPD no se aplica a esa operación; los nuevos datos personales procesados en el
despliegue se evalúan por su cuenta.

El segundo escenario alcanza a la mayoría de las organizaciones, porque la mayoría despliega modelos
que no entrenaron. En la
[Puerta de Diligencia Debida de Proveedor / Modelo](/patterns/vendor-model-due-diligence-gate) se
convierte en respuestas almacenadas: el resumen de datos de entrenamiento del proveedor, su base
declarada, cualquier hallazgo de aplicación pública, su afirmación de anonimidad y evidencia, y la
fecha verificada.

**Correspondencias:** RGPD `Art. 4(1)`, `Art. 5(2)`, `Art. 24`, `Art. 25` · Reglamento de IA de la
UE `Art. 53` · NIST AI RMF (Measure) ·
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) · capas 02, 03 y 05. Los mapeos
son ilustrativos, no una afirmación de conformidad.

## Categorías especiales, datos inferidos y biometría

El artículo 9(1) RGPD prohíbe el tratamiento de datos que revelen origen racial o étnico, opiniones
políticas, creencias religiosas o filosóficas o afiliación sindical, y el tratamiento de datos
genéticos, datos biométricos para identificación única, datos de salud y datos sobre vida sexual u
orientación sexual, a menos que se aplique una condición del artículo 9(2), como consentimiento
explícito [1]. El nuevo artículo 4a del Reglamento de IA permite a los proveedores de sistemas de
alto riesgo procesar tales datos cuando sea estrictamente necesario para la detección y corrección
de sesgos, solo si otros datos (incluyendo datos sintéticos o anonimizados) no servirían, con
pseudonimización, controles de acceso, sin transmisión posterior y eliminación una vez corregido el
sesgo (capítulo 16 sobre
[datos de categoría especial para detección de sesgos (Art. 4a)](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test));
los responsables del despliegue y proveedores de otros sistemas pueden hacerlo excepcionalmente, y
no se crea deber de ejecutar trabajo de sesgo [2]. La antigua base del artículo 10(5) fue eliminada
[35].

### Datos sensibles inferidos y proxy

La IA crea datos sensibles sin recopilarlos: salud inferida de compras, religión de opciones de
comidas, orientación de gráficos sociales, o un código postal sustituyendo la etnia. La orientación
de IA de la ICO trata inferencias y datos de categoría especial como una cuestión de legalidad [36].
La Ley de Mis Datos de Salud de Washington cuenta como datos de salud del consumidor información
derivada o extrapolada de datos no sanitarios, incluyendo por algoritmos o aprendizaje automático
[37]. California requiere una evaluación de riesgo antes de la inferencia automatizada de salud,
situación económica o comportamiento en ciertos contextos [24].

Dos controles hacen esto verificable. Una **prueba proxy** en la capa 03 mide qué tan bien cada
característica y la salida predicen un atributo protegido en un conjunto etiquetado, fallando la
compilación por encima de un umbral. Una **política de inferencia** en la capa 01 lista atributos
que un sistema no puede inferir, aplicada por un clasificador de salida en la capa 04. Ambas dejan
registros de que se buscó la inferencia sensible.

### Biometría

Los datos biométricos resultan del procesamiento técnico de características físicas, fisiológicas o
conductuales que permite o confirma identificación única, como imágenes faciales o huellas
dactilares [1]. Mantén tres usos separados: **identificación** (uno a muchos), **verificación** (uno
a uno) y **categorización** (asignar un grupo de características).

| Instrumento | Regla sobre biometría | Artefacto |
|---|---|---|
| GDPR `Art. 9` | Los datos biométricos para identificación única son una categoría especial [1] | Registro de condición del artículo 9(2); DPIA |
| Reglamento de IA de la UE `Art. 5(1)(e)`–`(h)` | Prohíbe raspado facial no dirigido, inferencia de emociones en el trabajo y la escuela (excepto usos médicos y de seguridad), categorización que infiere características sensibles, e identificación remota en tiempo real para aplicación de la ley excepto excepciones estrechas [38] | Política de uso prohibido como código; pantalla de entrada |
| Punto 1 del Anexo III del Reglamento de IA de la UE | La identificación remota (no verificación), categorización sensible y reconocimiento de emociones son de alto riesgo donde son lícitas [39] | Registro de clasificación de alto riesgo |
| Propuesta de Omnibus Digital `Art. 9(2)(l)` | Permitiría verificación bajo el control exclusivo de la persona [30] | Ninguno aún |
| Illinois BIPA | Calendario de retención, consentimiento escrito informado, sin lucro; acción privada con USD 1.000 por negligencia y USD 5.000 por violación intencional o temeraria [40] | Captura de consentimiento; retención como código; registro de destrucción |
| PIPL `Arts. 28–29` | La biometría es sensible: propósito específico, necesidad, consentimiento separado [5] | Registro de consentimiento separado; PIPIA |

BIPA se aplica a través de acciones de clase privadas, y se reporta que una enmienda de 2024 limita
escaneos repetidos de la misma persona a una recuperación (verificar) [40]. Una contraseña filtrada
puede restablecerse; una cara filtrada no, por lo que las plantillas biométricas obtienen las reglas
de retención y acceso más estrictas, y su registro de eliminación es evidencia que vale la pena
mantener.

### Datos de salud del consumidor y datos neurales

La Ley de Mis Datos de Salud de Washington, en vigor para la mayoría de entidades desde el 31 de
marzo de 2024, requiere consentimiento para recopilar, consentimiento separado para compartir y una
autorización firmada para vender, aplicada a través de la ley de protección del consumidor del
estado [37]. Los **datos neurales** (información generada midiendo la actividad del sistema
nervioso) son información personal sensible bajo la CCPA por SB 1223, aprobada el 28 de septiembre
de 2024 [41], y datos sensibles bajo la Ley de Privacidad de Colorado por HB24-1058, en vigor desde
el 7 de agosto de 2024 [42]. Un sistema de IA que lee dispositivos portátiles o interfaces
cerebro-computadora debe marcar estas clases de datos en la entrada, porque activan deberes de
consentimiento y evaluación que la telemetría ordinaria no tiene.

**Correspondencias:** RGPD `Art. 4(14)`, `Art. 9`, `Art. 35(3)(b)` · Reglamento de IA de la UE
`Art. 4a`, `Art. 5(1)(e)`–`(h)`, Anexo III punto 1 · BIPA · Washington MHMDA · CCPA · PIPL
`Arts. 28–29` · NIST AI RMF (Map, Measure) · capas 01, 03 y 04. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Violaciones de privacidad específicas de IA

Una **violación de la seguridad de los datos personales** es una violación de la seguridad que
conduce a la destrucción, pérdida, alteración, divulgación no autorizada de, o acceso a, datos
personales, accidental o ilícita [1]. El responsable del tratamiento notifica a la autoridad sin
dilación indebida y, cuando sea posible, en el plazo de 72 horas desde que tenga conocimiento, a
menos que la violación sea poco probable que resulte en un riesgo; informa a las personas afectadas
cuando el riesgo es alto; y documenta toda violación [1]. La IA añade formas de divulgar datos que
no parecen una base de datos robada.

| Tipo de violación | Mecanismo | Detección | Artefacto |
|---|---|---|---|
| Regurgitación y extracción | El modelo reproduce texto de entrenamiento memorizado, incluidos nombres, números de teléfono y correos electrónicos [43] | Coincidencias de PII en salida; canarios; reportes de usuarios | Registro de guardrail de salida; eval de extracción |
| Inferencia de pertenencia | Un atacante aprende si un registro estaba en el conjunto de entrenamiento [44] | Encontrado mediante pruebas, raramente en tiempo de ejecución | Eval de inferencia de pertenencia |
| Inversión de modelo | Características de sujetos de entrenamiento reconstruidas a partir de salidas y puntuaciones de confianza [45] | Patrones de sondeo de alto volumen | Límites de velocidad; resultado de red team |
| Exfiltración por inyección de prompts | Instrucciones ocultas en contenido recuperado hacen que el asistente filtre datos que puede leer [46][47] | Enlaces salientes bloqueados; anomalías en llamadas de herramientas | Decisiones de guardrail; trazas de llamadas de herramientas |
| Recuperación demasiado amplia | Un índice RAG devuelve registros de otro cliente | Alertas de recuperación entre inquilinos | Pruebas de acceso al índice; trazas de recuperación |
| Exposición de registros | Prompts con datos personales legibles en herramientas de observabilidad | Revisiones de acceso; DLP en almacenes de registros | Veredictos de retención; registros de acceso |

Si un evento dado es notificable es el juicio del equipo de privacidad sobre los hechos, con los
ejemplos trabajados de la EDPB como guía [48]. El trabajo de ingeniería es producir los hechos
dentro del plazo: la traza de lo que salió, la entrada del registro diciendo qué datos tiene el
sistema, el historial de eval diciendo si la debilidad era conocida. Para agentes que leen correo,
navegan y llaman herramientas, la orientación de la AEPD sobre IA agéntica del 18 de febrero de 2026
establece las amenazas añadidas y las medidas que los responsables pueden tomar [49]. Un incidente
puede iniciar varios plazos: las 72 horas del RGPD corren junto a los plazos del Artículo 73 del
Reglamento de IA (capítulo 08) y cualquier régimen sectorial; el capítulo 17 establece
[notificación de violación de RGPD junto a los plazos del Reglamento de IA](/bok/incidents#the-overlapping-clocks).
Dale al [Incident Pipeline](/patterns/incident-pipeline) una rama de violación de datos personales
con su propio temporizador desde la marca de tiempo de conocimiento, y mantén las 96 horas de la
propuesta Omnibus y el umbral de alto riesgo como parámetro, no como la regla de hoy [30].

**Correspondencias:** RGPD `Art. 4(12)`, `Arts. 32–34` · Reglamento de IA de la UE `Art. 15`,
`Art. 73` · OWASP LLM02:2025 · OWASP Agentic ASI01 [50] · NIST AI RMF (Manage) · capas 03, 04 y 05.
Los mapeos son ilustrativos, no una afirmación de conformidad.

## El lado RGPD del Omnibus Digital

Solo uno de los dos textos Omnibus es ley: el **Reglamento ómnibus digital sobre IA**, Reglamento
(UE) 2026/1744, en vigor desde el 27 de julio de 2026, que creó el Artículo 4a [2]. La propuesta de
**Omnibus Digital** del 19 de noviembre de 2025, COM(2025) 837, enmendaría el RGPD y normas vecinas
[30]. A partir del 2026-09-24 sigue siendo una propuesta: las comisiones ITRE y LIBE del Parlamento
tenían un proyecto de informe del 22 de junio de 2026 y más de 1.750 enmiendas, la votación de
mandato prevista del Consejo del 26 de junio de 2026 fue cancelada, y en agosto de 2026 los
triálogos no habían comenzado [51]. El comentario sobre los textos de trabajo del Consejo reportó
que un compromiso de junio reemplazó el Artículo 88c propuesto con un considerando y reformuló la
definición de datos personales a través de una nueva disposición de seudonimización [52].

| Cambio RGPD propuesto [30] | Ley actual | Construir ahora |
|---|---|---|
| `Art. 4(1)`: no datos personales para una entidad que no puede identificar a la persona por medios razonablemente probables de ser utilizados | Considerando 26; la sentencia SRB [7] | Registros de custodia de claves |
| `Art. 9(2)(k)`, `9(5)`: datos de categoría especial residuales en desarrollo y operación de IA; evitar, eliminar o proteger de salidas | Sin condición específica de IA | Escaneos de categoría especial; filtros de salida |
| `Art. 88c`: intereses legítimos para IA, con minimización, protección de datos residuales, transparencia mejorada y un derecho incondicional a oponerme | Artículo 6(1)(f) y la prueba de tres pasos [3] | LIA con punto final de exclusión |
| `Art. 22`: lista de permisos; necesidad contractual incluso si un humano pudiera decidir | Artículo 22 actual [1] | Registros de decisiones; rutas de impugnación |
| `Art. 33`: solo violaciones de alto riesgo, 96 horas, punto de entrada único | 72 horas, cualquier riesgo | Un temporizador de violación parametrizado |
| `Art. 35`: listas DPIA en toda la UE, plantilla y metodología | Listas nacionales | Una DPIA asignable a un esquema común |

La lectura es breve: no construyas para una propuesta. Construye los controles que ambas versiones
quieren, y haz que los parámetros que pueden cambiar (reloj de violación, umbral de notificación,
disparadores de DPIA) sean configuración, no código.

## Más allá de la UE: Reino Unido, EE.UU., Brasil y China

### Reino Unido

La Ley de Datos (Uso y Acceso) de 2025, sección 80, reemplazó el Artículo 22 del RGPD del Reino
Unido con los Artículos 22A a 22D: una decisión significativa sin participación humana significativa
está permitida con salvaguardas (información, representaciones, intervención humana, impugnación);
los datos de categoría especial se limitan al consentimiento explícito, o contrato o autorización
legal con la condición de interés público sustancial; y la nueva base de intereses legítimos
reconocida no puede apoyar tal decisión [23]. Las normas entraron en vigor el 5 de febrero de 2026
[23]. La ICO consultó sobre el proyecto de orientación ADM del 31 de marzo al 29 de mayo de 2026
[53], y marca su orientación de IA como bajo revisión debido a la Ley [36]. El capítulo 08 coloca el
Reino Unido en el [mapa regulatorio](/bok/regulatory-map#united-kingdom).

### Estados Unidos

No hay ley federal integral de privacidad. Las regulaciones de California sobre ADMT, evaluaciones
de riesgo y auditorías de ciberseguridad entraron en vigor el 1 de enero de 2026 [24]. El capítulo
21 recorre una herramienta de contratación a través de
[Colorado SB 26-189 y las reglas ADMT de CPPA](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes)
lado a lado. ADMT significa tecnología que utiliza computación para reemplazar o reemplazar
sustancialmente la toma de decisiones humana; una decisión significativa concierne préstamos,
vivienda, educación, empleo o atención médica. Las evaluaciones de riesgo se deben antes, entre
otros, de usar ADMT para decisiones significativas, ciertas inferencias automatizadas, y entrenar
ADMT o tecnología de reconocimiento facial; para procesamiento anterior a las normas se deben antes
del 31 de diciembre de 2027, con presentaciones a la agencia antes del 1 de abril de 2028 [24]. La
ley de Virginia muestra la forma de las otras en la tabla: exclusiones de publicidad dirigida, venta
y perfilado significativo, y evaluaciones que el Fiscal General puede exigir [25][54]. El número de
estados con tales leyes sigue creciendo (verifica el recuento actual).

| Ley | Derecho de perfilado o ADMT | Deber de evaluación | Nota de datos sensibles |
|---|---|---|---|
| CCPA de California y regulaciones ADMT | Aviso previo al uso; exclusión o apelación; acceso [24] | Evaluaciones de riesgo, presentadas a la agencia [24] | Los datos neurales son sensibles [41] |
| CDPA de Virginia | Exclusión del perfilado [25] | Evaluaciones, disponibles para el Fiscal General [54] | Los datos sensibles activan una evaluación [54] |
| Ley de Privacidad de Colorado (2023-07-01) | Exclusión incl. perfilado [26] | Evaluaciones para riesgo elevado [26] | Los datos neurales y biológicos son sensibles [42] |
| CDPA de Minnesota (2025-07-31) | Pregunta, razón, revisión, reevaluación [27] | No mapeado en esta edición | No mapeado en esta edición |

La unidad práctica es el derecho, no el estado: una señal de exclusión honrada en inferencia, un
flujo de trabajo de razón y revisión, una plantilla de evaluación con campos para los disparadores
de cada estado.

### Brasil y China

La **LGPD** de Brasil incluye intereses legítimos entre sus bases legales, establece condiciones más
estrictas para datos sensibles, trata datos anonimizados como fuera de la ley a menos que la
anonimización pueda revertirse con esfuerzos razonables, otorga un derecho a solicitar revisión de
decisiones únicamente automatizadas con información sobre los criterios (sujeto a secretos
comerciales), y permite a la autoridad exigir un informe de impacto [28].

La **PIPL** de China enumera sus bases legales en el Artículo 13 sin una base general de intereses
legítimos, por lo que el entrenamiento en información personal generalmente se basa en
consentimiento u otra base enumerada. Las decisiones automatizadas deben ser transparentes y justas,
con derecho a una explicación y a rechazar decisiones únicamente automatizadas de impacto
significativo; la información sensible, incluida la biometría, necesita necesidad y consentimiento
separado; la provisión transfronteriza necesita una evaluación de seguridad de la CAC, certificación
o el contrato estándar; y una evaluación de impacto es requerida por adelantado para datos
sensibles, decisiones automatizadas, procesamiento confiado y provisión transfronteriza, mantenida
durante al menos tres años [5]. El capítulo 08 mapea las normas específicas de IA de China
([China](/bok/regulatory-map#china)).

## Obligación de mapeo de artefactos

Capas:
**1 Gobernanza como código · 2 Inventario y Transparencia · 3 Evals y Red Teaming como Evidencia · 4 Controles en Tiempo de Ejecución y Observabilidad · 5 Aseguramiento y Conformidad Continua**.

| Obligación | Artefacto | Capa | Responsable del deber | Registro de evidencia |
|---|---|---|---|---|
| RGPD `Art. 5(1)(b)`, `6(4)` limitación de propósito | Etiquetas de propósito; política de coincidencia de propósito | 1 · 2 | Responsable del tratamiento | Veredicto por ejecución |
| RGPD `Art. 6` base legal | Registro de base; LIA versionada | 2 | Responsable del tratamiento | Entrada de registro con referencia LIA |
| RGPD `Art. 7` consentimiento | Registro de consentimiento-propósito | 2 · 5 | Responsable del tratamiento | Retiros rastreados a ejecuciones |
| RGPD `Arts. 13–14` transparencia | Aviso generado desde el registro | 2 | Responsable del tratamiento | Versión de aviso por versión de modelo |
| GDPR `Art. 5(1)(c)`, `Art. 25` | Justificación de características; filtros de PII; retención como código | 1 · 3 | Responsable del tratamiento | Registros de filtro; veredictos de retención |
| RGPD `Art. 28` encargados del tratamiento | Lista de verificación de cláusula de proveedor de IA | 2 · 5 | Responsable del tratamiento | Registro de puerta por cambio |
| GDPR `Art. 30` ROPA | Registros generados por momento de procesamiento | 2 · 5 | Responsable del tratamiento; encargado del tratamiento | Registro generado |
| GDPR `Arts. 35–36` DPIA | Plantilla DPIA de IA; decisión "sin DPIA" | 1 · 2 | Responsable del tratamiento | DPIA versionada |
| Transferencias RGPD `Arts. 44–46` | Registro de transferencias; política de enrutamiento; TIA | 1 · 4 · 5 | Responsable del tratamiento; encargado del tratamiento | Veredictos de enrutamiento |
| GDPR `Art. 22`, `15(1)(h)` ADM | Registro de decisión; aviso; ruta de impugnación | 4 · 5 | Responsable del tratamiento; productor de puntuación | Registros de decisión y revisión |
| Derechos RGPD `Arts. 15–17`, `21` | Flujo de solicitud en todas las ubicaciones | 4 · 5 | Responsable del tratamiento | Registro de cumplimiento |
| Anonimato del modelo RGPD `Art. 5(2)` | Paquete de evidencia de anonimato; evals de ataque a la privacidad | 3 · 5 | Responsable del tratamiento (desarrollador) | Resultado de eval por versión |
| Datos sensarios e inferidos RGPD `Art. 9` | Prueba proxy; política de inferencia; registro de condición | 1 · 3 · 4 | Responsable del tratamiento | Eval proxy; decisiones del clasificador |
| Violaciones RGPD `Arts. 33–34` | Rama de violación del pipeline de incidentes | 4 · 5 | Responsable del tratamiento; encargado del tratamiento | Marca de tiempo de conciencia; notificación |
| Reglamento de IA `Art. 4a` | Conjunto de sesgo seudonimizado; trabajo de eliminación; razón ROPA | 1 · 2 | Proveedor; responsable del despliegue (excepcionalmente) | Registro de eliminación; entrada ROPA |
| Reglamento de IA `Art. 26(9)`, `27(4)` | Gobernanza como código-FRIA compartiendo campos EIPD | 2 | Responsable del despliegue | Evaluaciones vinculadas |
| Reglamento de IA `Art. 86` | Explicación vinculada al registro de decisiones | 4 · 5 | Responsable del despliegue | Explicación por solicitud |
| UK GDPR `Arts. 22A–22D` | Flujo de salvaguarda; justificación de participación | 4 · 5 | Responsable del tratamiento | Registros de revisión |
| Regulaciones ADMT de la CCPA | Aviso previo al uso; exclusión u apelación; evaluación de riesgos | 2 · 4 · 5 | Negocio | Aviso; exclusiones; evaluación |
| Exclusiones de elaboración de perfiles de estados estadounidenses | Bandera de exclusión en inferencia; plantilla de evaluación | 1 · 4 · 5 | Responsable del tratamiento | Veredictos de exclusión |
| BIPA; MHMDA; leyes de datos neurales | Captura de consentimiento; calendario de retención; banderas de entrada | 1 · 2 | Negocio | Registros de consentimiento y destrucción |
| LGPD `Art. 20`; PIPL `Arts. 24`, `55–56` | Flujos de revisión y explicación; PIPIA | 4 · 5 | Responsable del tratamiento; encargado del tratamiento | Registros de revisión; PIPIA |

> **En la práctica (ilustrativo)**
> Un responsable de ingeniería de privacidad en una gran empresa de telecomunicaciones reconstruyó
> la EIPD `csa-01` para que la mayor parte se generara: momentos de procesamiento del registro,
> bases del registro de bases, el mapa de transferencias de la política de enrutamiento, riesgo de
> memorización de la última eval de privacidad, la ruta de derechos del flujo de solicitud. El DPD
> aún escribió y firmó el juicio de riesgo. Cuando el proveedor cambió de región, tres campos
> cambiaron y la EIPD mostró un diff en lugar de quedarse obsoleta en una carpeta compartida.

**Correspondencias:** RGPD `Arts. 5–7`, `9`, `13–17`, `21`, `22`, `25`, `26`, `28`, `30`, `32–36`,
`44–46` · RGPD del Reino Unido `Arts. 22A–22D` · CCPA y sus regulaciones ADMT · leyes de privacidad
de Virginia, Colorado y Minnesota · BIPA · MHMDA de Washington · LGPD · PIPL · Reglamento de IA
`Arts. 4a`, `5`, `26`, `27`, `86` · ISO/IEC 42001 · ISO/IEC 27701 · NIST AI RMF (Govern, Map,
Measure, Manage) · las cinco capas. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Enumera los momentos de procesamiento** de tu sistema de IA de mayor riesgo y escribe la base
   legal y la retención junto a cada uno. Cada celda en blanco es un hallazgo.
2. **Añade una eval de privacidad a la puerta**: una prueba de fuga de PII o inferencia de
   pertenencia con un umbral que falle la compilación. Su resultado es la primera página de un
   paquete de evidencia de anonimato.
3. **Ejecuta una solicitud de borrado simulada** a través de corpus, snapshots, índice RAG,
   registros y pesos, escribe el registro de cumplimiento y cronométralo contra el plazo de un mes.
4. **Envía a tus proveedores de IA la lista de verificación de cláusulas** (sin entrenamiento,
   retención de prompts, región, subprocesadores, aviso de cambio) y almacena las respuestas en sus
   entradas de registro.
5. **Rastrea una llamada de inferencia** al país que la sirve y comprueba que el registro de
   transferencias nombra una base. Si no lo hace, la política de residencia tiene su primera regla.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 4(1), 4(4), 4(5), 4(12), 4(14), 5, 6, 6(4), 7, 9, 12(3), 13–17, 21, 22, 25, 26, 28, 30, 33–36, 44–46, 83(5), 99; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special-category data for bias detection and correction, incl. the records-of-processing reason; amended Art. 2(7) keeping the GDPR unaffected; Annex III high-risk requirements from 2 Dec 2027); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (no hierarchy of legal bases; three-step legitimate-interest test; mitigating measures, paras 99–107; anonymity test at para 43, elements and documentation for the evidence at paras 49–58; three scenarios on unlawful development). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[4] "Relying on the legal basis of legitimate interests to develop an AI system" (AI how-to sheet; legitimate interest as the most likely basis; balancing test; discretionary prior right to object; transparency on regurgitation risk). CNIL. 2025-06 (page dated 2026-01-05). https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system (verified: primary)
[5] Personal Information Protection Law of the People's Republic of China (Arts. 13 legal bases, 24 automated decision-making, 28–29 sensitive personal information and separate consent, 38 cross-border provision, 55–56 impact assessment kept three years), official English translation. National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[6] Guidelines 01/2025 on pseudonymisation (version for public consultation, 17 Jan to 14 Mar 2025). European Data Protection Board. 2025-01. https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-pseudonymisation_en (verified: primary)
[7] Press release No 107/25: judgment in Case C-413/23 P, EDPS v SRB (pseudonymised data not personal data in all cases and for every person; identifiability for the controller's information duty assessed at collection, from the controller's point of view). Court of Justice of the EU. 2025-09-04. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250107en.pdf (verified: primary)
[8] Rocher, Hendrickx and de Montjoye, "Estimating the success of re-identifications in incomplete datasets using generative models" (99.98% of Americans correctly re-identified with 15 demographic attributes). Nature Communications 10, 3069. 2019-07-23. https://doi.org/10.1038/s41467-019-10933-3 (verified: primary)
[9] McMahan et al., "Communication-Efficient Learning of Deep Networks from Decentralized Data" (federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[10] Zhu, Liu and Han, "Deep Leakage from Gradients" (private training data recovered from shared gradients; arXiv 1906.08935). arXiv. 2019-06-21. https://arxiv.org/abs/1906.08935 (verified: primary)
[11] Stadler, Oprisanu and Troncoso, "Synthetic Data – Anonymisation Groundhog Day" (synthetic data either does not prevent inference attacks or does not retain utility; arXiv 2011.07018). arXiv. 2020-11-13. https://arxiv.org/abs/2011.07018 (verified: primary)
[12] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[13] Guidelines on Data Protection Impact Assessment (DPIA) and determining whether processing is "likely to result in a high risk" (WP248 rev.01; nine criteria; two criteria usually require a DPIA), endorsed by the EDPB. Article 29 Working Party. 2017-10-04. https://ec.europa.eu/newsroom/article29/items/611236 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(9) and (11) (deployers use Art. 13 information for their GDPR DPIA; informing people subject to Annex III high-risk decisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[16] Guidelines 05/2021 on the interplay between the application of Article 3 and the provisions on international transfers as per Chapter V of the GDPR, version 2.0 (three cumulative criteria for a transfer; remote access from a third country, Example 11). European Data Protection Board. 2023-02-14. https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf (verified: primary)
[17] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data, version 2.0. European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[18] Standard contractual clauses for international transfers (published 4 June 2021). European Commission. 2021-06-04. https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en (verified: primary)
[19] EU-US data transfers: adequacy decision for the EU-US Data Privacy Framework (adopted 10 July 2023). European Commission. 2023-07-10. https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en (verified: primary)
[20] Press release No 106/25: judgment in Case T-553/23, Latombe v Commission (action for annulment of the EU-US Data Privacy Framework adequacy decision dismissed). General Court of the EU. 2025-09-03. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf (verified: primary)
[21] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[22] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; effect of a variation in the data; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[23] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D: meaningful human involvement, restrictions for special-category data and for Art. 6(1)(ea), safeguards; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[24] California Privacy Protection Agency, CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved by OAL 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); significant decision § 7001(ddd); risk-assessment triggers § 7150; deadlines §§ 7155(b), 7157(a); ADMT compliance § 7200(b); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[25] Code of Virginia § 59.1-577, Personal data rights; consumers (opt out of targeted advertising, sale, or profiling in furtherance of decisions that produce legal or similarly significant effects). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-577/ (verified: primary)
[26] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[27] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review the data, correct and have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[28] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 7 legal bases incl. legitimate interests; Art. 11 sensitive data; Art. 12 anonymised data; Art. 20 review of automated decisions; Art. 38 impact report). Presidência da República (Brazil). 2018-08-14. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[29] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; deployer decisions based on Annex III high-risk outputs, except point 2; applies only where Union law does not otherwise provide the right). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[30] Proposal for a Regulation amending Regulations (EU) 2016/679, 2018/1724, 2018/1725, 2023/2854 and Directives 2002/58/EC, (EU) 2022/2555 and (EU) 2022/2557 as regards the simplification of the digital legislative framework (Digital Omnibus), COM(2025) 837 final, Council doc. 15698/25 (GDPR Arts. 4(1), 5(1)(b), 9(2)(k)–(l) and 9(5), 12(5), 13(4), 22, 33, 35, new 88c). European Commission / Council of the EU. 2025-11-19. https://data.consilium.europa.eu/doc/document/ST-15698-2025-INIT/en/pdf (verified: primary)
[31] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[32] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[33] Discussion Paper: Large Language Models and Personal Data (three theses: storing an LLM is not processing; rights attach to system inputs and outputs; unlawful training does not affect later use). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[34] "AI: the CNIL finalises its recommendations on the development of artificial intelligence systems and announces its upcoming work" (guidance on GDPR applicability to AI models; annotation; secure development). CNIL. 2025-07-22. https://www.cnil.fr/en/ai-cnil-finalises-its-recommendations-development-artificial-intelligence-systems (verified: primary)
[35] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 4a and 10 (as amended by Reg. (EU) 2026/1744: Art. 10(5) deleted; Art. 4a inserted). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[36] Guidance on AI and data protection (lawfulness incl. inferences and special category data; notice that it is under review because of the Data (Use and Access) Act; last updated 15 Mar 2023). Information Commissioner's Office. 2023-03-15. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/ (verified: primary)
[37] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated from non-health information by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; enforcement under chapter 19.86 RCW; 31 Mar 2024, small businesses 30 Jun 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(e)–(h) (untargeted facial scraping; emotion inference at work and school; biometric categorisation of sensitive traits; real-time remote biometric identification for law enforcement). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 1 (biometrics: remote biometric identification excluding verification; sensitive-attribute categorisation; emotion recognition). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[40] "Biometric Information Privacy Act" (740 ILCS 14, 2008; informed written consent, retention schedule, no profiting; USD 1,000 / 5,000 statutory damages; 2024 amendment, SB 2979, on per-person recovery). Wikipedia. 2026. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: secondary)
[41] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data defined and added to sensitive personal information under the CCPA; approved by the Governor 28 Sep 2024; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[42] HB24-1058, Protect Privacy of Biological Data (biological and neural data as sensitive data under the Colorado Privacy Act; signed 17 Apr 2024; effective 7 Aug 2024). Colorado General Assembly. 2024-04-17. https://leg.colorado.gov/bills/hb24-1058 (verified: primary)
[43] Carlini et al., "Extracting Training Data from Large Language Models" (hundreds of verbatim training sequences extracted from GPT-2, incl. names, phone numbers and email addresses; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[44] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[45] Fredrikson, Jha and Ristenpart, "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[46] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection" (data theft via injected prompts in retrieved content; arXiv 2302.12173). arXiv. 2023-02-23. https://arxiv.org/abs/2302.12173 (verified: primary)
[47] LLM02:2025 Sensitive Information Disclosure (OWASP Top 10 for LLM Applications, 2025 edition). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ (verified: primary)
[48] Guidelines 9/2022 on personal data breach notification under GDPR, version 2.0. European Data Protection Board. 2023-03-28. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-92022-personal-data-breach-notification-under_en (verified: primary)
[49] "La Agencia publica unas orientaciones sobre Inteligencia Artificial agéntica desde la perspectiva de protección de datos" (press release; guidance on agentic AI and data protection). Agencia Española de Protección de Datos. 2026-02-18. https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia (verified: primary)
[50] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[51] "The Digital Omnibus Regulation Proposal", Legislative Train Schedule (status: tabled; ITRE and LIBE joint; draft report 22 June 2026; 1,750+ amendments; Council mandate vote of 26 June cancelled; no trilogues; last update 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[52] "Digital Omnibus (GDPR) Negotiations at the Council – September 2026 Update" (June compromise replaced the AI provision, Art. 88c, with a recital; personal-data definition reworked via a new pseudonymisation article). Privacy Next. 2026-09-01. https://www.privacynext.eu/resources/digital-omnibus-gdpr-negotiations-at-the-council-september-2026-update/ (verified: reported)
[53] ICO consultation on the draft guidance about automated decision-making, including profiling (published 31 Mar 2026; closed 29 May 2026; follows the Data (Use and Access) Act 2025). Information Commissioner's Office. 2026-03-31. https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/ (verified: primary)
[54] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, risky profiling, sensitive data; available to the Attorney General on civil investigative demand). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
