---
lang: es
source: bok/20-existing-law.md
sourceHash: "179fe9816c0f1c18447beceee294f06e854a51817f689d791e15cd8e3e0a9b39"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 20. Otra ley que ya se aplica a la IA

> La ley de derechos de autor, antidiscriminación, protección del consumidor y responsabilidad por
> productos ya vincula los sistemas de IA; este capítulo mapea cada deber a su artefacto de
> evidencia y capa de stack.

El Reglamento de IA es la capa más nueva de ley sobre sistemas de IA, no la única. Cuatro cuerpos de
ley más antiguos alcanzaron la IA primero y se aplican contra ella hoy: propiedad intelectual, no
discriminación, protección del consumidor y responsabilidad por productos. Un regulador
estadounidense expresó la premisa en una línea cuando lanzó una investigación contra afirmaciones
engañosas sobre IA: "no hay exención de IA de las leyes en vigor" [1]. Ninguna de estas leyes fue
escrita para modelos, pero cada una hace una pregunta que un sistema de IA debe responder con
evidencia: ¿tuvimos derecho a usar esta entrada, el sistema desventaja a un grupo protegido, es
verdad lo que decimos sobre él, y era defectuoso cuando salió de nuestro control.

Para cada cuerpo de ley el capítulo da la doctrina en términos claros, una comparación UE / EE.UU. /
Reino Unido fechada, y el artefacto, capa de stack (capítulo 04) y patrón (capítulo 05) que
evidencian el cumplimiento. Cierra con ultrasuplantaciones y un modelo de contratación ejecutado a
través de cinco cuerpos de ley a la vez.

No es asesoramiento legal. **Las funciones de cumplimiento de IA y legal** interpretan estas
obligaciones; el ingeniero convierte la interpretación en un control y un registro, y depende del
asesor legal para confirmar la lectura (ver
[el clúster de desambiguación](/bok/definition#the-disambiguation-cluster) y
[traducción regulatoria](/bok/the-role#regulatory-translation)). La ley de protección de datos tiene
su propio capítulo ([19](/bok/privacy-and-ai#how-to-read-this-chapter)), el Reglamento de IA tiene
el capítulo [18](/bok/eu-ai-act#how-to-read-this-chapter), y los estatutos específicos de IA en todo
el mundo están en el capítulo [21](/bok/ai-laws-worldwide#the-landscape-at-a-glance), con las
[reglas sectoriales que ya alcanzan la IA](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai).
Cada estado en este capítulo está marcado a partir de 2026-09-24; los casos judiciales y plazos de
transposición se mueven, así que vuelve a comprobar antes de confiar en una fila.

## Cómo leer este capítulo

Cada cuerpo de ley hace una pregunta a un sistema de IA. La tabla nombra el artefacto que la
responde y su capa en [el stack](/bok/the-stack#how-to-read-the-stack):
**1 Gobernanza como código · 2 Inventario y Transparencia · 3 Evals y Red Teaming como Evidencia · 4 Controles en Tiempo de Ejecución y Observabilidad · 5 Aseguramiento y Cumplimiento Continuo**.

| Cuerpo de ley | La pregunta que hace a un sistema de IA | Artefacto de evidencia primaria | Capa |
|---|---|---|---|
| Propiedad intelectual | ¿Tuvimos derecho a usar cada entrada, y alguna salida copia expresión protegida? | [Registro de derechos de datos de entrenamiento](/patterns/training-data-rights-ledger); eval de memorización; registro de filtro de salida | 2 · 3 · 4 |
| No discriminación | ¿El sistema pone a un grupo protegido en desventaja que no puede justificar? | Eval de impacto por grupo; búsqueda de registro de alternativas menos discriminatorias; prueba de fidelidad de código de razón | 3 · 5 |
| Protección del consumidor | ¿Es lo que afirmamos sobre el sistema, o hacemos a través de su interfaz, engañoso o injusto? | Registro de afirmaciones vinculado a ejecuciones de eval; registro de revisión de interfaz y divulgación | 1 · 3 · 5 |
| Responsabilidad por productos | ¿Era el sistema defectuoso cuando salió de nuestro control, y advertimos sobre sus límites? | FMEA; AIBOM con hashes; historial de eval; registro de cambios; instrucciones de uso | 2 · 3 · 5 |
| Medios sintéticos | ¿Se marca el medio generado, se divulga y es removible bajo solicitud? | Marcado de procedencia en generación; pipeline de retirada con reloj | 4 · 5 |

Tres advertencias recorren el capítulo.

- **La jurisdicción decide la respuesta.** La misma ejecución de entrenamiento puede ser legal en un
  país e infractora en otro, así que los artefactos registran *dónde* se copiaron datos, se entrenó
  un modelo y se colocó un sistema en el mercado.
- **La evidencia que guardas es evidencia que puedes ser ordenado a producir.** Bajo el nuevo
  régimen de responsabilidad por productos de la UE un tribunal puede ordenar a un demandado que
  divulgue evidencia relevante, y el incumplimiento desencadena una presunción de que el producto
  era defectuoso [2]. Un archivo de defensa que es incompleto o inexacto funciona en tu contra.
  Mantenlo completo, versionado y honesto.
- **Los mapeos son ilustrativos, no una afirmación de conformidad.** Un artefacto apoya y evidencia
  una obligación; si la obligación se cumple es un juicio legal.

## Propiedad intelectual

La propiedad intelectual toca un sistema de IA en cuatro puntos: las obras copiadas para entrenarlo,
sus salidas, la información confidencial que se le proporciona, y las invenciones que ayuda a hacer.
En cada punto el ingeniero registra qué sucedió, dónde, y bajo qué derecho.

### Derechos de autor y datos de entrenamiento

Copiar una obra en un corpus de entrenamiento es, en apariencia, una reproducción. La pregunta legal
es si una excepción (la ruta de la UE, Reino Unido y Japón) o una defensa (la ruta estadounidense)
la cubre.

**Unión Europea.** La Directiva del Mercado Único Digital (DSM) crea dos excepciones de minería de
texto y datos (TDM). El artículo 3 permite a las organizaciones de investigación e instituciones de
patrimonio cultural extraer obras para investigación científica. El artículo 4 es la excepción
general: cualquiera puede copiar obras legalmente accesibles para TDM y mantener las copias el
tiempo que sea necesario, a menos que el titular de derechos haya reservado expresamente ese uso "de
manera apropiada, como medios legibles por máquina en el caso de contenido disponible públicamente
en línea" [3]. El Reglamento de IA convierte esa exclusión en un deber del proveedor: el artículo
53(1)(c) requiere que cada proveedor de modelo de IA de uso general (GPAI) implemente una política
de derechos de autor que identifique y cumpla con las reservas del artículo 4(3), y el artículo
53(1)(d) requiere un resumen público del contenido de entrenamiento en la plantilla de la Oficina de
IA [4]. La Comisión publicó esa plantilla el 24 de julio de 2025 [5]. La exención de código abierto
en el artículo 53(2) levanta solo los deberes de documentación en los puntos (a) y (b), así que los
modelos de peso abierto aún deben la política de derechos de autor y el resumen [4]. El Código de
Prácticas de GPAI convierte la política en cinco medidas: una política escrita, acceso legal (sin
eludir paywall, sin sitios persistentemente infractores), rastreadores que sigan `robots.txt`},
salvaguardas contra salidas infractoras, y un contacto de quejas [6].

Los tribunales están rellenando los detalles. En *Kneschke v LAION* el Tribunal Regional Superior de
Hamburgo sostuvo el 10 de diciembre de 2025 que construir el conjunto de datos LAION-5B se ajustaba
a las excepciones alemanas de TDM, y que una reserva escrita en lenguaje natural en términos del
sitio web no era legible por máquina; permitió un recurso adicional al Tribunal Federal de Justicia
[7]. En *GEMA v OpenAI* el Tribunal Regional de Múnich sostuvo el 11 de noviembre de 2025 que las
letras de canciones memorizadas en los parámetros de un modelo son reproducciones, que la excepción
de TDM cubre copias preparatorias pero no la incorporación a largo plazo de obras en el modelo, y
que las salidas que reproducen las letras son responsabilidad del proveedor [8]; comprueba si hay un
recurso pendiente antes de confiar en ello (verificar). La Corte de Justicia escuchó su primer caso
de derechos de autor de IA generativa, *Like Company v Google* (C-250/25), el 10 de marzo de 2026,
sobre si el entrenamiento es una reproducción, si el artículo 4 lo cubre y si las respuestas de
chatbot que reproducen contenido de prensa son una comunicación al público. Una opinión del Abogado
General estaba programada para el 3 de septiembre de 2026; la sentencia está pendiente a partir de
2026-09-24 [9] (verificar la opinión).

**Estados Unidos.** No hay excepción de TDM. El entrenamiento se juzga bajo el uso justo, que
pondera cuatro factores: el propósito y carácter del uso (incluyendo si es transformativo), la
naturaleza de la obra, la cantidad utilizada, y el efecto en el mercado de la obra [10]. Los casos
hasta ahora se basan en sus hechos; se tabulan a continuación.

**Reino Unido.** La excepción de TDM del Reino Unido cubre copias realizadas para análisis
computacional «con el único propósito de investigación sin ánimo de lucro» [11]. El informe
estatutario del gobierno de 18 de marzo de 2026 no llevó adelante la excepción de exclusión
voluntaria sobre la que había consultado; propone reunir más evidencia y desarrollar transparencia
de entrada mediante buenas prácticas en lugar de legislación [12] [13]. En *Getty Images v Stability
AI*, la sentencia de la Corte Superior de noviembre de 2025 desestimó la demanda de infracción
secundaria sobre un modelo entrenado en el extranjero, sobre la base de que los pesos del modelo no
eran una «copia infractora»; se concedió permiso para apelar sobre ese punto, y la apelación está
pendiente [14].

**Japón.** El artículo 30-4 de la Ley de Derechos de Autor permite la explotación de una obra cuando
el propósito no es disfrutar de su expresión, como el entrenamiento de IA, a menos que «perjudicaría
injustificadamente los intereses del titular de los derechos de autor». La *Comprensión General* no
vinculante de la Oficina de Derechos de Autor de Japón (mayo de 2024) sitúa el entrenamiento que
tiene como objetivo producir la expresión de las obras de entrenamiento (sobreajuste deliberado,
ajuste fino imitativo, generación aumentada por recuperación que produce la fuente) fuera del
artículo 30-4, y la copia de una base de datos vendida para análisis mientras se eludan medidas como
`robots.txt` dentro de la salvedad [15].

| Pregunta (a partir de 2026-09-24) | EU | Estados Unidos | Reino Unido | Japón |
|---|---|---|---|---|
| ¿Se permite el entrenamiento comercial en obras accesibles lícitamente sin licencia? | Sí, conforme al art. 4 de la DSM, a menos que esté reservado [3] | Solo si es uso justo, decidido caso por caso [10] | Sin excepción general; el art. 29A es solo investigación sin ánimo de lucro [11] | Sí, para propósitos de no disfrute, sujeto a la salvedad [15] |
| ¿Cómo se excluye voluntariamente un titular de derechos? | Reserva expresa, legible por máquina para contenido en línea [3] | Sin exclusión voluntaria estatutaria | No aplicable; excepción de exclusión voluntaria no adoptada [12] | Sin exclusión voluntaria; las medidas técnicas importan a la salvedad [15] |
| ¿Deber del proveedor de publicar información de entrenamiento? | Sí para proveedores de IA de uso general: resumen del art. 53(1)(d) [4] | Sin deber federal | Sin deber estatutario [13] | No |

### Casos de entrenamiento estadounidenses, fechados

Cada sentencia se basó en su propio expediente; ninguna es una regla para cada modelo.

| Caso | Tribunal | Qué se decidió | Estado (a partir de 2026-09-24) |
|---|---|---|---|
| *Thomson Reuters v. ROSS Intelligence* | D. Del.; 3d Cir. No. 25-2153 | Copiar notas de cabecera para construir una herramienta de búsqueda legal competidora y no generativa no fue uso justo (11 de febrero de 2025) [16] | Apelación interlocutoria argumentada el 11 de junio de 2026; decisión pendiente [17] |
| *Bartz v. Anthropic* | N.D. Cal. | El entrenamiento en libros adquiridos lícitamente fue uso justo; mantener una biblioteca central de copias pirateadas no lo fue (23 de junio de 2025) [18] | Acuerdo de clase de USD 1.500 millones finalmente aprobado el 20 de julio de 2026; liberación limitada a conducta pasada, reclamaciones de salida preservadas [18] [19] |
| *Kadrey v. Meta* | N.D. Cal. | Sentencia de resumen parcial a favor de Meta sobre uso justo para entrenamiento, en el expediente que construyeron los demandantes (25 de junio de 2025) [20] | Sentencia limitada a esos demandantes y ese expediente [20] |
| *New York Times v. Microsoft and OpenAI* | S.D.N.Y. | Reclamaciones sobre entrenamiento y reproducción de artículos de noticias | Pendiente en sentencia de resumen; el Departamento de Justicia de EE.UU. presentó en apoyo de los demandados en septiembre de 2026 [21] |
| *Andersen v. Stability AI* | N.D. Cal. | Reclamaciones de artistas visuales sobre entrenamiento y distribución de modelos de imagen | Pendiente; juicio con jurado reprogramado para el 20 de septiembre de 2027 [22] |
| *Disney Enterprises v. Midjourney* | C.D. Cal. | Reclamaciones de estudios sobre entrenamiento y salidas de personajes (presentadas el 11 de junio de 2025) | Pendiente [23] |

Tres lecciones de ingeniería se derivan de estos casos y los de la UE.

- **Cómo adquiriste los datos importa.** *Bartz* separó la compra y escaneo lícito de las descargas
  pirateadas [18], así que el registro de derechos registra el canal de adquisición, no solo la
  licencia.
- **La memorización es la exposición del lado de la salida.** *GEMA* se basó en letras que el modelo
  podía reproducir [8]; una eval de memorización encuentra esa exposición antes de que un demandante
  lo haga.
- **Las exclusiones voluntarias son leídas por máquinas en el momento del rastreo.** *LAION* y el
  Código descansan en señales legibles por máquina [7] [6]; la política del rastreador es código y
  sus decisiones son registros.

### Salidas: memorización y propiedad

**Salidas infractoras.** Los modelos de lenguaje pueden devolver secuencias de entrenamiento raras
verbatim en consultas dirigidas, y los modelos más grandes están más expuestos [24]. Los controles
se sitúan en dos capas: una eval que sondea la regurgitación antes del lanzamiento (capa 03) y un
filtro de salida que bloquea la reproducción casi verbatim de corpus protegidos o código licenciado
en producción (capa 04), las salvaguardas que el Código de Práctica solicita [6].

**Quién es propietario de una salida.** En Estados Unidos, los derechos de autor requieren un autor
humano. El Circuito de D.C. lo sostuvo el 18 de marzo de 2025 en *Thaler v. Perlmutter* [25], y la
Corte Suprema rechazó revisar el caso el 2 de marzo de 2026 [26]. El informe de protegibilidad de
derechos de autor de la Oficina de Derechos de Autor de EE.UU. (29 de enero de 2025) trata los
prompts solos como insuficientes para la autoría, mientras que las contribuciones expresivas
humanas, la selección y disposición, y la modificación de la salida de IA pueden estar protegidas;
su guía de registro de marzo de 2023 requiere que los solicitantes divulguen material generado por
IA [27]. Su informe sobre entrenamiento (Parte 3) sigue siendo una versión previa a la publicación
[27]. El Reino Unido es la excepción: para una obra generada por computadora el autor es «la persona
por quien se realizan los arreglos necesarios para la creación de la obra» [11].

Para el ingeniero, la propiedad es un problema de procedencia: proteger un activo que un modelo
ayudó a crear necesita un registro de la contribución humana (prompts, selección, ediciones, quién y
cuándo), que también respalda la divulgación que un registro solicita.

### Derechos de base de datos y secretos comerciales

**Derecho de base de datos.** La UE otorga al creador de una base de datos un derecho sui generis
contra la extracción o reutilización de todo o una parte sustancial de su contenido, cuando el
creador invirtió sustancialmente en obtener, verificar o presentarlos [28]. Raspar una base de datos
para entrenamiento es extracción; el artículo 4 de la DSM lo cubre en las mismas condiciones que los
derechos de autor, incluida la reserva [3].

**Secretos comerciales y fuga a través de prompts.** Un secreto comercial está protegido solo
mientras su titular toma «medidas razonables» (UE) o «medidas razonables» (EE.UU.) para mantenerlo
en secreto [29] [30]. Dos caminos de IA ponen esa condición en riesgo: personal pegando código,
precios o datos de clientes en un modelo de terceros cuyos términos permiten retención o
entrenamiento, y ajuste fino en material confidencial que los ataques de extracción pueden recuperar
más tarde [24]. Un registro que no muestra control alguno es un mal comienzo en cualquier caso. Los
artefactos son ordinarios y económicos: una regla de prevención de pérdida de datos frente a cada
punto final de modelo externo (capa 04, [Runtime Guardrail](/patterns/runtime-guardrail)); un
registro de proveedor de términos de retención y sin entrenamiento, verificado en la
[Puerta de Diligencia Debida de Proveedor / Modelo](/patterns/vendor-model-due-diligence-gate); y
una etiqueta de clasificación de datos en cada conjunto de ajuste fino, para que un secreto nunca
entre en un pipeline de entrenamiento sin una decisión registrada.

### Patentes e inventiva de IA

Las solicitudes de DABUS, en las que un sistema de IA fue nombrado como único inventor, fracasaron
en todas partes donde fueron probadas. El Circuito Federal de EE.UU. sostuvo el 5 de agosto de 2022
que un inventor debe ser una persona natural [31]; la Corte Suprema del Reino Unido llegó al mismo
resultado el 20 de diciembre de 2023 [32]; y la Junta de Apelaciones Jurídicas de la EPO sostuvo el
21 de diciembre de 2021 que «una máquina no es un inventor» conforme a la EPC [33]. Para invenciones
asistidas por IA, la USPTO rescindió su guía de febrero de 2024 el 28 de noviembre de 2025 y la
reemplazó: la IA se trata como cualquier otra herramienta, y la prueba de concepción ordinaria se
aplica a los humanos involucrados [34].

El artefacto es un registro de invención que captura la concepción humana (quién planteó el problema
y reconoció la solución) junto con las herramientas e insumos de IA utilizados.

### Licencias de modelo e indemnidades de proveedor

**Los pesos abiertos no son lo mismo que código abierto.** Muchos modelos de pesos abiertos se
distribuyen bajo licencias con restricciones de uso. La licencia de Llama 3.1, por ejemplo,
incorpora una política de uso aceptable y requiere una licencia separada de Meta para licenciatarios
cuyos productos superaron 700 millones de usuarios activos mensuales en la fecha de lanzamiento
[35]. La definición de la Iniciativa de Código Abierto, por el contrario, requiere la forma
preferida para modificación: información de datos, código y parámetros [36]. El alivio de código
abierto de la Ley de IA es aún más estrecho y nunca cubre los deberes de derechos de autor [4].

El control es un campo de licencia en cada modelo y conjunto de datos en el
[AIBOM](/patterns/aibom), más una política que bloquea un despliegue cuyo caso de uso incumple la
política de uso de la licencia o el umbral comercial (capa 01). Una licencia leída una vez en la
adquisición y nunca más no es un control.

**Las indemnidades son condicionales, y las condiciones son controles en tiempo de ejecución.** El
Compromiso de Derechos de Autor de Copilot de Microsoft (7 de septiembre de 2023), por ejemplo, está
condicionado a que el cliente use los guardrails incorporados y los filtros de contenido y no
intente generar material infractor [37]. Desactivar los filtros para reducir falsos positivos puede
desactivar la indemnidad. Registra el alcance y las condiciones en la puerta de diligencia debida, y
mantén instantáneas de configuración y registros de filtros que muestren que las condiciones se
cumplieron cuando se produjo una salida.

### Artefactos que evidencian cumplimiento de PI

| Artefacto | Lo que registra | Capa | Patrón |
|---|---|---|---|
| Registro de derechos de datos de entrenamiento | Por conjunto de datos: fuente, canal de adquisición, licencia, verificación de reserva de TDM (resultado, método, fecha), lugar de copia | 2 | [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); [AIBOM](/patterns/aibom) |
| Política de rastreador como código | Honrando `robots.txt` y otras reservas legibles por máquina; sin elusión de muros de pago; lista de bloqueo de sitios infractores | 1 | [Policy Card](/patterns/policy-card) |
| Eval de memorización y regurgitación | Sondeos de extracción y umbrales de superposición verbatim por versión de modelo | 3 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| Registro de filtro de salida | Salidas casi verbatim bloqueadas; coincidencias de licencia en código generado | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| Política de derechos de autor y resumen de entrenamiento | Política versionada del art. 53(1)(c) y resumen del art. 53(1)(d) para proveedores de IA de uso general | 5 | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Registro de licencia e indemnidad | Licencias de modelo y conjunto de datos, políticas de uso, alcance de indemnidad y condiciones | 2 · 5 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| Regla de DLP de prompt | Secretos y código fuente bloqueados o redactados antes de llamadas externas | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |

> **En la práctica (ilustrativo)**
> Se construyó un asistente de recuperación para el equipo de ventas de una editorial sobre un
> corpus reunido por tres equipos diferentes. El registro de derechos se añadió después: una fila
> por fuente, con su canal de adquisición y licencia. Dos fuentes no tenían licencia registrada y
> una había sido extraída de un sitio cuyo `robots.txt` desautorizaba el agente de usuario del
> rastreador. La compilación del corpus ahora falla cuando una fuente carece de fila en el registro,
> las decisiones de permitir/denegar del rastreador se registran por URL, y las dos fuentes sin
> licencia fueron eliminadas y el índice reconstruido, con la reconstrucción registrada contra el
> mismo id de registro.

## No discriminación

La ley antidiscriminación no pregunta si un modelo es justo en abstracto. Pregunta si una decisión
en un dominio regulado trató peor a un grupo protegido, y si la práctica que la causó puede
justificarse. El trabajo de ingeniería es medir el efecto en los términos de la ley y mantener la
justificación con la medición.

### Trato discriminatorio, impacto discriminatorio y proxies

**Dos teorías.** El *trato discriminatorio* es tratar a alguien de forma diferente por una
característica protegida. El *impacto discriminatorio* es una práctica neutral que afecta más
duramente a un grupo protegido. Bajo el Título VII, un demandante prueba el impacto demostrando que
una práctica particular lo causa; el empleador debe entonces demostrar que la práctica es
"relacionada con el trabajo para el puesto en cuestión y coherente con la necesidad empresarial"; y
el demandante aún puede ganar demostrando una práctica laboral alternativa con menor impacto que el
empleador se niega a adoptar [38]. La ley de la UE traza la misma línea entre discriminación directa
e indirecta: un criterio aparentemente neutral que coloca a un grupo "en una situación de desventaja
particular" es ilegal "a menos que esa disposición, criterio o práctica esté objetivamente
justificada por un objetivo legítimo y los medios para lograr ese objetivo sean apropiados y
necesarios" [39] [40].

**La postura de aplicación no es el estatuto.** En Estados Unidos, la Orden Ejecutiva 14281 de 23 de
abril de 2025 ordena a las agencias federales deprioritizar la aplicación de estatutos y
regulaciones en la medida en que incluyan responsabilidad por impacto discriminatorio [41], y HUD ha
propuesto eliminar sus regulaciones de impacto discriminatorio de la Ley de Vivienda Justa, con una
propuesta complementaria cuyo período de comentarios se extiende hasta el 9 de octubre de 2026 [42].
Para crédito, el movimiento va más allá de la postura: la CFPB enmendó la Regulación B, con efecto a
partir del 21 de julio de 2026, para establecer que la ECOA no autoriza responsabilidad por impacto
discriminatorio (la "prueba de efectos"), dejando las reglas de acción adversa en 12 CFR 1002.9 sin
cambios [83]. El texto de impacto discriminatorio del Título VII no ha cambiado [38], las demandas
privadas continúan (véase *Mobley* a continuación) y la ley de la UE y estatal no se ven afectadas,
por lo que la prueba de impacto se mantiene para el empleo, bajo la ley estatal y en la UE; en
crédito estadounidense ya no se basa en la Regulación B [83].

**Proxies.** Eliminar el atributo protegido no elimina el efecto: código postal, nombre, escuela o
brechas en la carrera pueden llevar la misma información. La ceguera también hace que las pruebas
sean más difíciles, porque no puedes medir una disparidad entre grupos que no has registrado; para
probar, debes procesar el atributo. Después del Omnibus Digital, el nuevo artículo 4a del Reglamento
de IA da a los proveedores de sistemas de alto riesgo una base para procesar datos de categorías
especiales para detección de sesgos, con seudonimización y eliminación una vez que el sesgo se
corrija [43]. El capítulo [16](/bok/fairness-and-explainability#group-fairness-metrics) cubre las
métricas en sí; esta sección cubre contra qué la ley las leerá.

### Empleo

**Estados Unidos.** El Título VII se aplica a la selección por IA como a cualquier otro
procedimiento de selección [38], y los proveedores no están seguros fuera de la ley federal de
discriminación por edad: en *Mobley v. Workday* el tribunal certificó condicionalmente una demanda
colectiva de discriminación por edad a nivel nacional contra el proveedor de un sistema de selección
de solicitantes el 16 de mayo de 2025 [44]. La Ley Local 144 de Nueva York es la regla más concreta
específica de IA: un empleador no puede usar una herramienta de decisión laboral automatizada a
menos que haya tenido una auditoría de sesgo en el año anterior, el resumen de auditoría sea
publicado, y los candidatos sean notificados 10 días hábiles antes del uso; la aplicación comenzó el
5 de julio de 2023 [45]. La auditoría, por un tercero independiente, reporta tasas de selección y
ratios de impacto por sexo, por raza y etnia y por su intersección [46]. Illinois enmendó su Ley de
Derechos Humanos para alcanzar el uso discriminatorio de IA por empleadores, reportado como efectivo
a partir del 1 de enero de 2026 (verificar).

**Unión Europea.** Las directivas de Igualdad Racial y Marco de Empleo prohíben la discriminación
directa e indirecta en el acceso al empleo, condiciones de trabajo y despido [39] [40]. El
Reglamento de IA enumera la contratación, selección, promoción, terminación, asignación de tareas y
monitoreo del desempeño como de alto riesgo (Anexo III, punto 4) [47], con los deberes de alto
riesgo para sistemas del Anexo III diferidos por el Omnibus al 2 de diciembre de 2027 [48]. La
Directiva sobre Trabajo en Plataformas (UE) 2024/2831, que debe ser transpuesta antes del 2 de
diciembre de 2026, va más lejos para plataformas de trabajo digital: sin procesamiento automatizado
del estado emocional de un trabajador o conversaciones privadas, y sin inferencia de características
protegidas (Art. 7); información escrita sobre sistemas automatizados y sus parámetros principales
(Art. 9); una evaluación de impacto, incluyendo sobre igualdad de trato, al menos cada dos años, y
una decisión humana para cualquier suspensión o terminación de cuenta (Art. 10); y un derecho a una
explicación y revisión, con rectificación en dos semanas (Art. 11) [49].

### Crédito y préstamos

**Estados Unidos.** Cuando un acreedor toma una acción adversa, la Regulación B requiere una
declaración de las razones específicas, o un aviso del derecho a recibirlas [50]. La Circular
2022-03 de la CFPB dijo en 2022 que los acreedores que usan algoritmos complejos, incluyendo IA o
aprendizaje automático, deben aún proporcionar las razones principales específicas [51]; la CFPB
retiró la circular el 12 de mayo de 2025 [84], pero el deber de la Regulación B no ha cambiado
[50][83]. Cuando la decisión se basa en un informe del consumidor, la FCRA añade sus propios deberes
de acción adversa [52]. La consecuencia de ingeniería es precisa: las razones en el aviso deben ser
las razones que el modelo utilizó, por lo que un código de razón producido por un método de
atribución se prueba por fidelidad contra cada versión del modelo (capítulo 16 sobre
[avisos de acción adversa](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)).

**Unión Europea.** La segunda Directiva de Crédito al Consumo (UE) 2023/2225 requiere una evaluación
de solvencia sobre información relevante y precisa, sin datos de categorías especiales o redes
sociales como fuente (Art. 18(3)). Cuando la evaluación es automatizada, el consumidor puede obtener
intervención humana: una explicación de la evaluación y su lógica, una oportunidad de exponer su
punto de vista, y una revisión (Art. 18(8)). Los Estados miembros debían adoptar las reglas antes
del 20 de noviembre de 2025 y aplicarlas a partir del 20 de noviembre de 2026 [53] (verificar la
transposición nacional y cualquier cambio a la fecha de aplicación). La puntuación de solvencia
también es de alto riesgo bajo el Reglamento de IA (Anexo III, punto 5(b)), con detección de fraude
excluida [47]; las reglas de protección de datos sobre decisiones automatizadas están en el capítulo
[19](/bok/privacy-and-ai#automated-decision-making).

### Vivienda, seguros y servicios públicos

**Vivienda.** La Ley de Vivienda Justa alcanza algoritmos de entrega de anuncios: en un acuerdo de
2022 con el Departamento de Justicia de EE.UU., Meta acordó eliminar su herramienta "Special Ad
Audience" y construir un sistema para reducir la varianza en la entrega de anuncios de vivienda
entre grupos [54]. En la UE, la Directiva de Igualdad Racial cubre el acceso a bienes y servicios
disponibles para el público, incluyendo vivienda [39].

**Seguros.** El SB21-169 de Colorado (firmado el 6 de julio de 2021) prohíbe a los aseguradores
discriminar injustamente a través de datos de consumidores externos, algoritmos y modelos
predictivos, y requiere un marco de gestión de riesgos, evaluación y monitoreo, y certificación por
un oficial de riesgo jefe, bajo reglas que el comisionado adopta línea de seguro por línea [55]
(verificar las líneas cubiertas y fechas efectivas de las reglas de implementación a partir de
2026-09-24). El boletín modelo de la NAIC del 4 de diciembre de 2023 espera que los aseguradores
mantengan un programa escrito para el uso responsable de sistemas de IA, incluyendo supervisión de
sistemas de IA de terceros y datos [56]. En la UE, la Corte de Justicia sostuvo en *Test-Achats* que
la derogación que permite diferencias basadas en el sexo en las primas de seguros era inválida con
efecto a partir del 21 de diciembre de 2012 [57], y el Reglamento de IA enumera la evaluación de
riesgos y la fijación de precios en seguros de vida y salud como de alto riesgo (Anexo III, punto
5(c)) [47].

**Servicios públicos.** Las decisiones de elegibilidad para asistencia pública son de alto riesgo
bajo el Reglamento de IA (Anexo III, punto 5(a)) [47]. En el caso *Bridges* del Reino Unido, la
Corte de Apelación encontró que la fuerza policial "nunca buscó satisfacerse a sí misma, ni
directamente ni por verificación independiente, de que el programa de software en este caso no tiene
un sesgo inaceptable por motivos de raza o sexo", un incumplimiento del deber de igualdad del sector
público [58]. El artefacto faltante era una prueba de sesgo que el responsable del despliegue
poseía.

### Medidas de equidad que la ley reconoce

La ley no elige una única métrica de equidad, pero varias de sus pruebas son cuantitativas. Cada una
se asigna a una eval y un registro.

| Prueba legal | Qué pregunta | Eval (capa 03) | Registro de evidencia (capa 05) |
|---|---|---|---|
| Regla de cuatro quintos (procedimientos de selección estadounidenses) | Una tasa de selección por debajo del 80% de la del grupo más alto es generalmente evidencia de impacto adverso; las brechas más pequeñas aún pueden contar [59] | Ratio de impacto adverso por grupo, con tamaños de muestra y una prueba de significancia | Resultado de eval firmado por versión de modelo, en la ficha de modelo |
| Impacto discriminatorio del Título VII | Impacto causado por una práctica; necesidad empresarial; alternativa menos discriminatoria [38] | Métricas de impacto; validación de relación con el trabajo; búsqueda entre modelos candidatos | Registro de alternativas consideradas y por qué cada una fue rechazada |
| Ley Local 144 de Nueva York | Ratios de impacto por sexo, raza y etnia, y categorías interseccionales, por un auditor independiente [46] | El mismo cálculo sobre datos históricos o de prueba | Resumen de auditoría publicado con su fecha; registro de notificación de candidatos |
| Discriminación indirecta de la UE | Desventaja particular; justificación objetiva; medios apropiados y necesarios [39] | Métricas de disparidad de grupo más un análisis de necesidad | Sección de justificación en la [FRIA](/patterns/fria-as-code) o DPIA |
| Acción adversa (ECOA, FCRA) | Razones principales específicas para la decisión [50] [52] | Prueba de fidelidad del código de razón contra el modelo | Resultado de eval del código de razón y versión de plantilla de aviso |
| CCD2 Art. 18(8) | Explicación, intervención humana y revisión [53] | [Artefacto de explicación](/patterns/explanation-artefact) por versión de modelo | Registro de revisión con resultado y revisor |

La regla de cuatro quintos es una regla práctica para las agencias de cumplimiento, no un puerto
seguro [59]. Trata una proporción de impacto superior a 0,8 como un aprobado de una comprobación, no
como prueba de legalidad. El capítulo 16 la calcula e informa con conteos e intervalos
([impacto desproporcionado y la regla de cuatro quintos](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)).

> **En la práctica (ilustrativo)**
> Un equipo de reclutamiento desplegó un modelo de clasificación de proveedores en Nueva York y dos
> países de la UE. La auditoría de sesgo del proveedor tenía un año de antigüedad y se calculó con
> datos de otro cliente. El equipo volvió a ejecutar las proporciones de impacto en su propio flujo
> de solicitantes mensualmente, como una eval de pipeline con un piso de 0,8 que alertaba al
> propietario. En el mes tres una categoría interseccional cayó a 0,71; la causa fue una nueva
> característica "años de experiencia continua" que penalizaba brechas en la carrera. La
> característica se eliminó, el registro de búsqueda registró las alternativas probadas, y se
> publicó un resumen de auditoría actualizado antes de la siguiente ronda.

## Protección del consumidor

La ley de protección del consumidor llega a la IA a través de tres puertas, sin estatuto específico
de IA: lo que afirmas sobre el sistema, cómo su interfaz trata a las personas, y qué hace con sus
datos. Lo que un chatbot le dice a un cliente vincula al negocio que lo desplegó:
[Moffatt v. Air Canada](/cases/moffatt-v-air-canada) es el caso documentado como autopsia.

### ### Prácticas injustas y engañosas en Estados Unidos

La sección 5 de la Ley FTC prohíbe actos o prácticas injustos o engañosos. Una práctica es injusta
solo si causa o es probable que cause "daño sustancial a los consumidores que no es razonablemente
evitable por los propios consumidores y no es compensado por beneficios contrarios" [60]. El engaño,
en la declaración de política de la FTC de 1983, es una representación, omisión o práctica que es
probable que induzca a error a un consumidor que actúa razonablemente y es material [61]. Una
afirmación de desempeño de IA sin evidencia detrás es engañosa en exactamente este sentido [62].

- **Afirmaciones de desempeño no sustanciadas.** Workado afirmó que su detector de contenido de IA
  era 98% preciso; las pruebas pusieron la precisión en contenido de propósito general en 53%,
  porque el modelo fue entrenado en texto académico. La orden requiere evidencia competente y
  confiable para tales afirmaciones [62]. El barrido de septiembre de 2024, Operación AI Comply, se
  dirigió a un servicio de "abogado robot" entre otros [1].
- **Despliegue sin salvaguardas razonables.** Rite Aid está prohibida por cinco años de usar
  reconocimiento facial para seguridad o vigilancia, después de que la FTC alegó que desplegó la
  tecnología sin procedimientos razonables para prevenir daño a los consumidores [63].
- **Disgorgement algorítmico.** Cuando una empresa entrena con datos que obtuvo ilícitamente, el
  remedio puede alcanzar el modelo. La orden de Everalbum define "Affected Work Product" como
  "cualquier modelo o algoritmo desarrollado en todo o en parte usando" los datos biométricos, y
  requiere su eliminación dentro de 90 días con una declaración jurada [64].
- **AI washing.** En marzo de 2024 la SEC llegó a un acuerdo con dos asesores de inversión por
  afirmaciones falsas sobre su uso de IA, por USD 400.000 en sanciones combinadas [65].
- **Reseñas falsas y bots.** La regla de la FTC sobre reseñas de consumidores (16 CFR Parte 465)
  prohíbe reseñas falsas, incluidas reseñas generadas por IA atribuidas a personas que no existen,
  con sanciones civiles [66]. California hace ilegal usar un bot para engañar a una persona sobre su
  identidad artificial para vender algo o influir en una votación, a menos que el bot se divulgue
  clara y conspicuamente [67].

Las prioridades de cumplimiento cambian con las administraciones; el estatuto y las órdenes
anteriores no. Una afirmación necesita evidencia cuando se hace, y un modelo entrenado con datos
contaminados puede ser ordenado destruir.

### ### La UE: UCPD, DSA y Reglamento de IA

La Directiva sobre Prácticas Comerciales Injustas prohíbe prácticas que sean contrarias a la
diligencia profesional y distorsionen materialmente, o sean probables que distorsionen, el
comportamiento económico del consumidor medio, juzgado desde la perspectiva de un grupo vulnerable
donde se dirige [68]. Desde las enmiendas de 2019, su lista negra incluye afirmar que las reseñas
provienen de usuarios reales sin pasos razonables para verificar, y enviar o encargar reseñas falsas
[69]. La Ley de Servicios Digitales añade reglas específicas de plataforma: las plataformas en línea
no pueden diseñar interfaces que engañen o manipulen a los usuarios o afecten sus decisiones libres
e informadas (Art. 25); las plataformas deben explicar los parámetros principales de sus sistemas de
recomendación (Art. 27); y la mitigación de riesgos de plataformas muy grandes incluye marcado
prominente de medios generados o manipulados que se asemejan apreciablemente a personas o eventos
reales (Art. 35(1)(k)) [70]. El Reglamento de IA prohíbe sistemas de IA que usen técnicas
manipuladoras o engañosas, o exploten vulnerabilidades, para distorsionar el comportamiento de
formas que causen daño significativo (Art. 5(1)(a)–(b)) [71], y requiere que se informe a las
personas cuando interactúan con un sistema de IA a menos que sea obvio (Art. 50(1)) [72].

### ### Reino Unido: Ley DMCC

Bajo la Ley de Mercados Digitales, Competencia y Consumidores de 2024, la prohibición general de
prácticas comerciales injustas ha aplicado desde el 6 de abril de 2025 (s. 225), y las prácticas
siempre consideradas injustas incluyen reseñas de consumidores falsas y reseñas que ocultan un
incentivo (Sch. 20, para. 13) [73].

| Práctica (a partir de 2026-09-24) | Estados Unidos | Unión Europea | Reino Unido | Artefacto de evidencia | Capa |
|---|---|---|---|---|---|
| Afirmación de precisión o equidad no sustanciada | Ley FTC s. 5; orden Workado [62] | Cláusula general UCPD [68] | DMCC s. 225 [73] | [Registro de afirmaciones](/patterns/claims-substantiation-gate) vinculado a ejecuciones de eval | 3 · 5 |
| Reseñas falsas generadas por IA | 16 CFR Parte 465 [66] | UCPD Anexo I, 23b–23c [69] | DMCC Sch. 20, para. 13 [73] | Política bloqueando generación de reseñas; registro de procedencia | 1 · 4 |
| Bot no divulgado | Cal. BPC s. 17941 [67] | Reglamento de IA Art. 50(1) [72] | Sin regla específica de bot; s. 225 puede aplicar [73] | Control de divulgación y una prueba que lo renderiza | 4 |
| Interfaz manipuladora o salida | Ley FTC s. 5 injusticia [60] | DSA Art. 25 [70]; Reglamento de IA Art. 5(1)(a)–(b) [71] | s. 225 [73] | Revisión de interfaz; eval de red-team para manipulación | 3 · 5 |
| Modelo construido con datos obtenidos ilícitamente | Eliminación de "Affected Work Product" [64] | Remedios de protección de datos (capítulo 19) | Remedios de protección de datos (capítulo 19) | Linaje desde conjunto de datos a cada modelo entrenado en él | 2 |

### ### Sustanciación de afirmaciones y disgorgement algorítmico

**Un registro de afirmaciones.** Cada afirmación pública sobre precisión, equidad, autonomía o
capacidad "impulsada por IA" es una fila: la afirmación, dónde aparece, la ejecución de eval que la
respalda, los datos en los que se midió, y la fecha. Workado falló en las últimas dos columnas: la
medición no coincidía con la población que la afirmación describía [62]. Un lanzamiento de modelo
vuelve a ejecutar la eval y revalida cada afirmación que la cita; una afirmación antigua o fallida
se retira de la copia. Esto se propone aquí como un nuevo patrón, la
[**Claims Substantiation Gate**](/patterns/claims-substantiation-gate): una
[eval gate](/patterns/eval-gate-in-ci) apuntada a la copia de marketing.

**Linaje listo para eliminación.** Una orden de eliminar "modelos o algoritmos desarrollados en todo
o en parte usando" algunos datos [64] solo puede cumplirse y probarse si sabes qué modelos tocaron
los datos. Eso es un [AIBOM](/patterns/aibom) con linaje de conjunto de datos hasta la versión, más
el [training-data rights ledger](/patterns/training-data-rights-ledger). Sin él, la única respuesta
segura a una orden de disgorgement es eliminar todo.

## Responsabilidad por productos

La responsabilidad del producto pregunta si un producto era defectuoso y si el defecto causó el
daño. Para la IA las nuevas preguntas son si el software es un producto, quién lo controla después
de que se envía, y qué es un defecto en algo que aprende y se actualiza.

### ### Directiva de Responsabilidad por Productos Defectuosos de la UE

La Directiva revisada sobre Responsabilidad por Productos Defectuosos, (UE) 2024/2853, fue adoptada
el 23 de octubre de 2024 y publicada el 18 de noviembre de 2024. Los Estados miembros deben
transponerla antes del 9 de diciembre de 2026, y se aplica a productos colocados en el mercado o
puestos en servicio después de esa fecha [2]. Sus movimientos principales para la IA:

- **El software es un producto** (Art. 4(1)); los considerandos nombran la IA entre las razones de
  la revisión, y el software libre y de código abierto suministrado fuera de una actividad comercial
  está excluido (Art. 2(2)) [2].
- **El defecto se juzga con el aprendizaje y las actualizaciones en vista.** Los factores incluyen
  "el efecto en el producto de cualquier capacidad de continuar aprendiendo o adquiriendo nuevas
  características después de que se coloca en el mercado", requisitos de seguridad relevantes
  incluida la ciberseguridad, y el momento en que el producto salió del control del fabricante (Art.
  7(2)) [2]. El control continúa mientras el fabricante puede suministrar actualizaciones de
  software (Art. 4(5)) [2].
- **Las actualizaciones reabre el archivo.** La defensa de que un defecto surgió después de la
  colocación en el mercado no se aplica donde, dentro del control del fabricante, el defecto se debe
  a software o sus actualizaciones, una actualización de seguridad faltante, o una modificación
  sustancial (Art. 11(2)) [2]. Quien modifica sustancialmente un producto fuera del control del
  fabricante se convierte en su fabricante (Art. 8(2)) [2].
- **Divulgación y presunciones.** Un tribunal puede ordenar al demandado que divulgue evidencia
  relevante, con protección para secretos comerciales (Art. 9). El defecto se presume si el
  demandado no divulga, si el producto incumple requisitos de seguridad obligatorios, o si el daño
  provino de un mal funcionamiento obvio; y un tribunal debe presumir defecto o causalidad donde el
  demandante enfrenta dificultad excesiva, notablemente por complejidad técnica o científica, y
  muestra que uno u otro es probable (Art. 10) [2].
- **Daño y tiempo.** El daño compensable cubre muerte, lesión personal incluido daño psicológico
  médicamente reconocido, daño a la propiedad y la destrucción o corrupción de datos no utilizados
  para fines profesionales (Art. 6). Las reclamaciones expiran 10 años después de la colocación en
  el mercado, reiniciándose desde una modificación sustancial, o 25 años para lesión personal
  latente (Art. 17) [2].

La propuesta paralela de Directiva de Responsabilidad por IA, que habría facilitado reclamaciones
basadas en culpa, fue retirada: anunciada en el programa de trabajo de la Comisión de 2025,
publicada en el Diario Oficial el 6 de octubre de 2025 [74]. Las reclamaciones de IA basadas en
culpa permanecen con la ley de responsabilidad civil nacional.

### ### Teorías de responsabilidad civil de Estados Unidos

La responsabilidad civil por productos en EE.UU. reconoce tres tipos de defecto: defectos de
fabricación en algunas unidades, defectos de diseño inherentes al diseño, y defectos de
comercialización, que cubren instrucciones inadecuadas y fallos en advertir de peligros latentes;
los tribunales prueban los defectos de diseño por las expectativas del consumidor, ponderando el
riesgo frente a la utilidad, o ambos [75]. Si el software, y en particular un chatbot, es un
"producto" es controvertido y se decide caso por caso. En *Garcia v. Character Technologies*, una
demanda por muerte injusta sobre una aplicación de chatbot de compañía presentada como
responsabilidad civil por productos, el tribunal otorgó en parte y denegó en parte las mociones para
desestimar el 21 de mayo de 2025, y el caso se resolvió y se desestimó sin perjuicio el 7 de enero
de 2026 [76]; check informa que las teorías de responsabilidad civil por productos sobrevivieron
contra la orden misma (verificar).

### La revisión de responsabilidad civil por productos del Reino Unido

La Law Commission está revisando el régimen de la Consumer Protection Act 1987, incluyendo
expresamente productos digitales e IA; los términos de referencia se publicaron el 8 de diciembre de
2025 y se planifica una consulta para la segunda mitad de 2026 [77].

### Tipos de defecto mapeados a modos de fallo de IA

Cada categoría legal se corresponde con modos de fallo de ingeniería y un artefacto que muestra si
ocurrieron.

| Tipo de defecto | Qué significa para un sistema de IA | Evidencia que lo responde | Capa |
|---|---|---|---|
| Fabricación | El sistema desplegado se aparta de su propio diseño: versión de modelo incorrecta, pesos corruptos, guardrail mal configurado, tubería de datos rota | AIBOM con hashes; registro de despliegue firmado; alertas de desviación de configuración | 2 · 4 · 5 |
| Diseño | El diseño mismo es inseguro para un uso previsible, y una alternativa más segura estaba razonablemente disponible: condiciones de funcionamiento no probadas, sin guardrail, sin supervisión humana donde sea necesaria | FMEA; matriz de cobertura de evals; resultados de red team; revisión de diseño con alternativas consideradas | 1 · 3 |
| Advertencia (comercialización) | Los límites conocidos y los usos fuera del alcance no fueron divulgados | [Ficha de modelo](/patterns/model-card-as-control-evidence); instrucciones de uso; avisos en el producto, todos versionados | 2 · 5 |
| Actualización (UE Art. 11(2)) | Una actualización introdujo el defecto, o una actualización de seguridad que era necesaria no fue entregada | Registro de cambios; evals de regresión por versión; registros de decisión de parches | 3 · 4 · 5 |

### Deber de advertencia después de actualizaciones

Una actualización de modelo es una nueva versión. Bajo el régimen de la UE el fabricante responde
por los defectos que las actualizaciones causan, o que una actualización de seguridad faltante deja
en su lugar, mientras el sistema esté bajo su control [2]; las teorías estadounidenses de fallo en
advertir llegan al mismo punto [75]. Así que las advertencias viajan con versiones: la ficha de
modelo e instrucciones de uso se regeneran en cada versión, las notas de versión listan limitaciones
conocidas y comportamiento cambiado, y el monitoreo de campo alimenta el
[Incident Pipeline](/patterns/incident-pipeline), así que un nuevo peligro produce una decisión
(parche, advertencia, retirada) con un propietario y una fecha (capítulo
[17](/bok/incidents#the-response-lifecycle)).

### El archivo de defensa

Un archivo de defensa por versión de producto contiene:

- un **análisis de modos de fallo y efectos** en la forma que describe el estándar IEC 60812, con
  modos de fallo de IA (cambio de distribución, inyección de prompts, hechos alucinados, uso
  inseguro de herramientas) como filas [78];
- el **AIBOM** para la versión, con hashes de modelo, conjunto de datos y dependencias;
- el **historial de evals**: cada resultado de gate para esta y versiones anteriores, incluyendo
  fallos y las correcciones que siguieron;
- **registros de tiempo de ejecución firmados** para las decisiones en cuestión, retenidos durante
  el período de reclamación;
- las **advertencias tal como se entregaron**: ficha de modelo, instrucciones de uso y avisos en el
  producto en esa versión.

El archivo corta en ambos sentidos: un demandante puede obtener divulgación, y una brecha puede en
sí misma plantear una presunción de defecto [2]. Mantenlo completo y recuperable durante al menos el
período de vencimiento de 10 años [2]; como
[evidencia legible por máquina](/patterns/machine-readable-evidence-oscal), la divulgación se
convierte en una consulta en lugar de un proyecto.

## Falsificaciones profundas y medios sintéticos

Los medios sintéticos se extienden a través de protección del consumidor, privacidad y derecho
penal. Tres regímenes establecen el piso.

- **Unión Europea.** Los proveedores de sistemas generativos deben marcar salidas de una manera
  legible por máquina y detectable (Reglamento de IA Art. 50(2)), y los responsables del despliegue
  deben divulgar falsificaciones profundas, con reglas más ligeras para trabajo evidentemente
  artístico, satírico o ficticio (Art. 50(4)) [72]. El artículo 50 ha aplicado desde el 2 de agosto
  de 2026 [79], con un período de gracia de marcado hasta el 2 de diciembre de 2026 para sistemas
  generativos colocados en el mercado antes del 2 de agosto de 2026 (Art. 111(4)) [43]. El Omnibus
  Digital también añadió una prohibición dirigida a la generación de IA de imágenes íntimas no
  consentidas y material de abuso sexual infantil, aplicable desde el 2 de diciembre de 2026 [43].
  Las plataformas muy grandes deben marcar medios generados o manipulados de manera prominente como
  parte de su mitigación de riesgos de la DSA [70].
- **Estados Unidos.** La TAKE IT DOWN Act (Public Law 119-12, 19 de mayo de 2025) hace que sea un
  crimen federal publicar deliberadamente imágenes íntimas no consentidas, incluyendo
  "falsificaciones digitales", y requiere que las plataformas cubiertas ejecuten un proceso de
  notificación y eliminación (dentro de un año de la promulgación) que elimine el contenido
  reportado dentro de 48 horas, ejecutado por la FTC [80]. Las leyes estatales de falsificación
  profunda y derechos de imagen varían (verificar los estados relevantes para cada despliegue).
- **Reino Unido.** Compartir una fotografía o película íntima que "muestre, o parezca mostrar" a
  otra persona sin consentimiento ha sido un delito desde el 31 de enero de 2024 [81], y la Data
  (Use and Access) Act 2025 añadió un delito de crear una supuesta imagen íntima de un adulto [82].

Los artefactos son marcado de procedencia en el punto de generación (por ejemplo credenciales de
contenido o marcas de agua, capa 04), una eval de detección para la supervivencia del marcado a
través de transformaciones comunes (capa 03), y una ruta de retirada con un reloj de 48 horas, un
propietario y un registro (capa 05, construida sobre el
[Incident Pipeline](/patterns/incident-pipeline)).

## Un modelo de contratación a través de cinco cuerpos de ley

Un único sistema generalmente responde a varios de estos cuerpos de ley a la vez, así que sus
artefactos deben compartir un id de registro.

> **Ejemplo (ilustrativo)**
> Un empleador en Nueva York y la UE despliega un modelo de un proveedor que clasifica candidatos
> para entrevistas. Una entrada de registro responde cinco preguntas legales.

| Cuerpo de ley | La pregunta para este sistema | Artefacto, clave del id de registro | Capa |
|---|---|---|---|
| Reglamento de IA (capítulo [18](/bok/eu-ai-act#deployer-duties-article-26)) | Anexo III punto 4 alto riesgo: ¿se cumplen los deberes del responsable del despliegue, y ha suministrado el proveedor su evidencia? [47] | Entrada de registro con rol (responsable del despliegue); documentación del proveedor recopilada en el gate de debida diligencia; diseño de supervisión humana | 2 · 5 |
| Protección de datos (capítulo [19](/bok/privacy-and-ai#automated-decision-making)) | ¿Es el tratamiento lícito y están salvaguardadas las decisiones automatizadas? | AIPD; aviso a candidatos; ruta de revisión | 1 · 5 |
| No discriminación | ¿Hay impacto adverso, está justificada la práctica, y se buscaron alternativas? [38] [45] [39] | Eval de ratio de impacto mensual; resumen de auditoría publicado; registro de búsqueda | 3 · 5 |
| Protección del consumidor | ¿Está sustanciada la afirmación "libre de sesgos" del proveedor, repetida en nuestros materiales de candidatos? [62] | Fila de registro de reclamaciones citando nuestra propia ejecución de eval, no el folleto del proveedor | 3 · 5 |
| Responsabilidad por productos | ¿Es la directiva la ruta para un candidato rechazado? | Generalmente no: sus cabezas de daño (lesión, propiedad, datos) no incluyen discriminación [2], así que la exposición corre a través de la ley de igualdad y contrato | 5 |

La última fila es la sorpresa útil: para un modelo de contratación la ley que muerde es igualdad y
protección de datos, no responsabilidad civil por productos; para un asistente de triaje médico el
balance se invierte. Escribir esta tabla por sistema, antes de construir controles, decide dónde va
el presupuesto de evidencia.

## Lo que puedes hacer esta semana

1. **Añade cuatro campos a la ficha de datos de cada conjunto de datos**: fuente, canal de
   adquisición, licencia, y el resultado y fecha de la verificación de reserva de TDM. Falla la
   tubería cuando alguno esté vacío.
2. **Busca en tu copia pública** (sitio web, presentaciones de ventas, fichas de modelo)
   afirmaciones numéricas o absolutas como "99% preciso", "sin sesgos" o "totalmente autónomo".
   Vincula cada una a un id de ejecución de eval, o elimínala.
3. **Calcula ratios de impacto adverso por grupo** para cada modelo de selección, elegibilidad o
   precios que ejecutes, con tamaños de muestra, y guárdalos en la ficha de modelo para la versión
   actual.
4. **Pon una regla de prevención de pérdida de datos delante de cada endpoint de modelo externo**
   para secretos y código fuente, y registra qué proveedores tienen términos de no entrenamiento y
   retención.
5. **Abre un archivo de defensa para tu próxima versión de IA**: AIBOM con hashes, historial de
   evals, una FMEA, las instrucciones de uso y las notas de versión, con un período de retención de
   al menos 10 años.

**Correspondencias:** Reglamento de IA UE Art. 4a, 5, 50, 53(1)(c)–(d), Anexo III puntos 4–5 ·
Directiva DSM Arts. 3–4 · PLD (UE) 2024/2853 · Directiva de Trabajo en Plataformas (UE) 2024/2831 ·
CCD2 Art. 18 · UCPD · DSA Arts. 25, 27, 35 · FTC Act s. 5 · Title VII s. 703(k) · 29 CFR 1607.4(D) ·
Regulation B · NYC LL144 · TAKE IT DOWN Act · DMCC Act 2024 · las cinco capas del stack (capítulo
04). Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"; DoNotPay "robot lawyer" proposed order). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] Directive (EU) 2024/2853 on liability for defective products (Art. 2 scope and FOSS exclusion; Art. 4 software as a product and manufacturer's control; Art. 6 damage; Art. 7 defectiveness incl. ability to continue to learn; Art. 8(2) substantial modification; Art. 9 disclosure; Art. 10 presumptions; Art. 11(2) updates; Art. 17 expiry; Art. 22 transposition by 9 Dec 2026; OJ L 18 Nov 2024). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[3] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market, Arts. 3 and 4 (TDM for scientific research; general TDM exception subject to a reservation "in an appropriate manner, such as machine-readable means"). Official Journal of the EU. 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI providers: 53(1)(c) copyright policy honouring Art. 4(3) DSM reservations; 53(1)(d) public summary of training content; 53(2) open-source relief limited to points (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[5] "Commission presents template for General-Purpose AI model providers to summarise the data used to train their model" (template for the Art. 53(1)(d) public summary). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their (verified: primary)
[6] GPAI Code of Practice, Copyright chapter (Measures 1.1 to 1.5: copyright policy; lawful access without circumventing effective technological measures and excluding persistently infringing sites; robots.txt compliance; safeguards against infringing outputs; point of contact and complaints). Code of Practice text as published 10 Jul 2025. 2025-07-10. https://code-of-practice.ai/?section=copyright (verified: secondary)
[7] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[8] "German court rules in favour of music rights management organisation against OpenAI" (GEMA v. OpenAI, Munich Regional Court I, 11 Nov 2025; memorisation in model parameters as reproduction; TDM exception limited to preparatory copies; decision open to appeal). European Commission, European IP Helpdesk. 2025-11-14. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/german-court-rules-favour-music-rights-management-organisation-against-openai-nyt-vs-openai-dispute-2025-11-14_en (verified: secondary)
[9] "CJEU Grand Chamber rules on music sampling and pastiche; first CJEU hearing on generative AI and copyright: Like Company v Google" (C-250/25; hearing 10 Mar 2026; questions on reproduction in training, DSM Art. 4 and chatbot outputs; Advocate General opinion scheduled for 3 Sep 2026). European Commission, European IP Helpdesk. 2026-04-24. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/cjeu-grand-chamber-rules-music-sampling-and-pastiche-first-cjeu-hearing-generative-ai-and-copyright-2026-04-24_en (verified: secondary)
[10] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title17/html/USCODE-2024-title17-chap1-sec107.htm (verified: primary)
[11] Copyright, Designs and Patents Act 1988, s. 29A (copies for text and data analysis for non-commercial research) and s. 9(3) (author of a computer-generated work). legislation.gov.uk. current. https://www.legislation.gov.uk/ukpga/1988/48/section/29A (verified: primary)
[12] Report and Impact Assessment on Copyright and Artificial Intelligence (published under ss. 135 and 136 of the Data (Use and Access) Act 2025). UK Government, GOV.UK. 2026-03-18. https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence (verified: primary)
[13] "Copyright and artificial intelligence: analysing the UK government's March 2026 reports" (opt-out TDM exception previously favoured not taken forward; further evidence to be gathered; input transparency through best practice rather than statute). VWV. 2026-03. https://www.vwv.co.uk/insights/articles/copyright-and-artificial-intelligence-analysing-the-uk-governments-march-2026-reports (verified: secondary)
[14] "High Court grants permission to appeal in Getty Images v Stability AI" (secondary infringement and the meaning of "infringing copy" for an AI model; Stability refused permission on the trade mark findings). Wiggin LLP. 2026-01. https://www.wiggin.co.uk/insight/high-court-grants-permission-to-appeal-in-getty-images-v-stability-ai/ (verified: secondary)
[15] "General Understanding on AI and Copyright in Japan": Overview (Art. 30-4 non-enjoyment purpose and its proviso; fine-tuning and RAG that output training expression fall outside Art. 30-4; database works and robots.txt; not legally binding). Japan Copyright Office, Agency for Cultural Affairs. 2024-05. https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf (verified: primary)
[16] Thomson Reuters Enterprise Centre GmbH v. ROSS Intelligence Inc., No. 1:20-cv-00613 (D. Del.), Memorandum Opinion (Bibas, J.). CourtListener (court docket). 2025-02-11. https://www.courtlistener.com/docket/17131648/thomson-reuters-enterprise-centre-gmbh-v-ross-intelligence-inc/ (verified: primary)
[17] "Third Circuit Hears Oral Argument in Ross v. Reuters AI Training Copyright Case" (No. 25-2153; argued 11 Jun 2026; first federal appeal on fair use in AI training). Baker Botts. 2026-07. https://www.bakerbotts.com/thought-leadership/publications/2026/july/third-circuit-hears-oral-argument (verified: secondary)
[18] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[19] "Court Grants Final Approval of $1.5 Billion Anthropic Copyright Settlement" (release limited to past acquisition and copying through 25 Aug 2025; output claims preserved). The Authors Guild. 2026-07. https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/ (verified: secondary)
[20] Kadrey v. Meta Platforms, Inc., No. 3:23-cv-03417 (N.D. Cal.), Order denying the plaintiffs' motion and granting Meta's cross-motion for partial summary judgment (Chhabria, J., ECF 598). CourtListener (court docket). 2025-06-25. https://www.courtlistener.com/docket/67569326/kadrey-v-meta-platforms-inc/ (verified: primary)
[21] "DOJ urges judge to rule for OpenAI, Microsoft in N.Y. Times lawsuit" (summary-judgment stage; first US government position on AI-training copyright litigation). The Washington Post. 2026-09-02. https://www.washingtonpost.com/technology/2026/09/02/doj-urges-judge-rule-openai-microsoft-ny-times-lawsuit/ (verified: secondary)
[22] Andersen v. Stability AI Ltd., No. 3:23-cv-00201 (N.D. Cal.), Order regarding case schedule (Orrick, J., ECF 597; jury trial reset to 20 Sep 2027). CourtListener (court docket). 2026-06-15. https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/ (verified: primary)
[23] Disney Enterprises Inc. v. Midjourney Inc., No. 2:25-cv-05275 (C.D. Cal.), complaint (ECF 1). CourtListener (court docket). 2025-06-11. https://www.courtlistener.com/docket/70513159/disney-enterprises-inc-v-midjourney-inc/ (verified: primary)
[24] Extracting Training Data from Large Language Models (Carlini et al.; verbatim training sequences recovered from GPT-2; larger models more vulnerable; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[25] Thaler v. Perlmutter, No. 23-5233 (human authorship required for copyright registration). US Court of Appeals for the D.C. Circuit. 2025-03-18. https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf (verified: primary)
[26] "Supreme Court Denies Cert in AI Authorship Case" (Thaler v. Perlmutter; certiorari denied 2 Mar 2026). Mayer Brown. 2026-03. https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case (verified: secondary)
[27] Copyright and Artificial Intelligence (Part 2, Copyrightability, 29 Jan 2025; Part 3, Generative AI Training, pre-publication version 9 May 2025; registration guidance for works containing AI-generated material, 16 Mar 2023). U.S. Copyright Office. 2025. https://copyright.gov/ai/ (verified: primary)
[28] Directive 96/9/EC on the legal protection of databases, Art. 7 (sui generis right against extraction and re-utilisation of a substantial part). Official Journal of the EU. 1996-03-11. https://eur-lex.europa.eu/eli/dir/1996/9/oj (verified: primary)
[29] Directive (EU) 2016/943 on the protection of undisclosed know-how and business information (trade secrets), Art. 2(1) ("reasonable steps under the circumstances" to keep information secret). Official Journal of the EU. 2016-06-08. https://eur-lex.europa.eu/eli/dir/2016/943/oj (verified: primary)
[30] 18 U.S.C. § 1839(3) (trade secret: the owner "has taken reasonable measures to keep such information secret"). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title18/html/USCODE-2024-title18-partI-chap90-sec1839.htm (verified: primary)
[31] Thaler v. Vidal, No. 2021-2347 (inventors under the Patent Act must be natural persons). US Court of Appeals for the Federal Circuit. 2022-08-05. https://cafc.uscourts.gov/opinions-orders/21-2347.OPINION.8-5-2022_1988142.pdf (verified: primary)
[32] Thaler v Comptroller-General of Patents, Designs and Trade Marks [2023] UKSC 49 (DABUS cannot be an inventor under the Patents Act 1977). UK Supreme Court. 2023-12-20. https://www.supremecourt.uk/cases/uksc-2021-0201 (verified: primary)
[33] J 8/20 (DABUS; "A machine is not an inventor within the meaning of the EPC"). EPO Legal Board of Appeal. 2021-12-21. https://www.epo.org/en/boards-of-appeal/decisions/j200008eu1 (verified: primary)
[34] Revised Inventorship Guidance for AI-Assisted Inventions, 90 FR 54636 (rescinds the 13 Feb 2024 guidance; AI as a tool; ordinary conception standard). USPTO, Federal Register. 2025-11-28. https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions (verified: primary)
[35] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated; separate licence required above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[36] The Open Source AI Definition 1.0 (use, study, modify, share; preferred form for modification: data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[37] "Microsoft announces new Copilot Copyright Commitment for customers" (defence and payment of adverse judgments; conditional on using built-in guardrails and content filters and not attempting to generate infringing material). Microsoft On the Issues. 2023-09-07. https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/ (verified: primary)
[38] 42 U.S.C. § 2000e-2(k) (Title VII s. 703(k): burden of proof in disparate-impact cases; business necessity; alternative employment practice). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[39] Council Directive 2000/43/EC implementing the principle of equal treatment irrespective of racial or ethnic origin, Art. 2(2)(b) (indirect discrimination; objective justification) and Art. 3(1)(h) (goods and services, including housing). Official Journal of the EU. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj (verified: primary)
[40] Council Directive 2000/78/EC establishing a general framework for equal treatment in employment and occupation. Official Journal of the EU. 2000-11-27. https://eur-lex.europa.eu/eli/dir/2000/78/oj (verified: primary)
[41] Executive Order 14281, Restoring Equality of Opportunity and Meritocracy (s. 4: agencies to deprioritise enforcement of disparate-impact liability; FR Doc. 2025-07378). The White House, via GovInfo (Federal Register). 2025-04-23. https://www.govinfo.gov/content/pkg/FR-2025-04-28/html/2025-07378.htm (verified: primary)
[42] HUD's Implementation of the Fair Housing Act's Disparate Impact Standard: proposed rule (FR Doc. 2026-00590, 14 Jan 2026) and supplemental proposed rule (FR Doc. 2026-16228; comments due 9 Oct 2026). US Department of Housing and Urban Development, Federal Register. 2026-08-10. https://www.federalregister.gov/documents/2026/08/10/2026-16228/huds-implementation-of-the-fair-housing-acts-disparate-impact-standard-amendments-to-huds-title-vi (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a special-category data for bias detection in high-risk systems; Art. 5(1)(ba) and (bb) prohibitions on NCII and CSAM generation, applying from 2 Dec 2026 under Art. 113(a); Art. 111(4): Art. 50(2) marking deadline of 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[44] Mobley v. Workday, Inc., No. 3:23-cv-00770 (N.D. Cal.), Order granting preliminary collective certification (Lin, J., ECF 128). CourtListener (court docket). 2025-05-16. https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/ (verified: primary)
[45] Automated Employment Decision Tools (Local Law 144 of 2021 and 6 RCNY 5-300: bias audit within one year before use, published summary, notice 10 business days before use; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[46] Automated Employment Decision Tools: Frequently Asked Questions (bias audit by an independent third party; selection rates and impact ratios by sex, race/ethnicity and intersectional categories). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[47] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, points 4 and 5 (employment, workers management; public assistance eligibility; creditworthiness, fraud detection excepted; risk assessment and pricing in life and health insurance). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[48] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[49] Directive (EU) 2024/2831 on improving working conditions in platform work, Arts. 7 (limits on processing), 9 (transparency), 10 (human oversight), 11 (human review) and 29 (transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[50] 12 CFR § 1002.9 (Regulation B notifications: statement of specific reasons for adverse action). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[51] Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms (withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14; the circular's page carries no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[52] 15 U.S.C. § 1681m(a) (FCRA duties of users taking adverse action on the basis of consumer reports). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII-sec1681m.htm (verified: primary)
[53] Directive (EU) 2023/2225 on credit agreements for consumers, Art. 18 (creditworthiness assessment; 18(3) no special-category data, social networks not an external source; 18(8) human intervention and explanation) and Art. 48 (adopt by 20 Nov 2025, apply from 20 Nov 2026). Official Journal of the EU. 2023-10-18. https://eur-lex.europa.eu/eli/dir/2023/2225/oj (verified: primary)
[54] "Justice Department Secures Groundbreaking Settlement Agreement with Meta Platforms, Formerly Known as Facebook, to Resolve Allegations of Discriminatory Advertising" (Fair Housing Act; Special Ad Audience discontinued; Variance Reduction System for housing ads). US Department of Justice. 2022-06-21. https://www.justice.gov/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known (verified: primary)
[55] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 6 Jul 2021; risk-management framework, assessment and monitoring, chief risk officer attestation; rules by insurance practice). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[56] NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (written AIS Program; third-party AI systems and data; adopted 4 Dec 2023). National Association of Insurance Commissioners. 2023-12-04. https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf (verified: primary)
[57] Case C-236/09, Association Belge des Consommateurs Test-Achats (Art. 5(2) of Directive 2004/113/EC invalid with effect from 21 Dec 2012). Court of Justice of the EU. 2011-03-01. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62009CJ0236 (verified: primary)
[58] R (Bridges) v Chief Constable of South Wales Police [2020] EWCA Civ 1058 (public sector equality duty; no verification that facial recognition software lacked unacceptable race or sex bias). Court of Appeal (Civil Division), Courts and Tribunals Judiciary. 2020-08-11. https://www.judiciary.uk/wp-content/uploads/2020/08/R-Bridges-v-CC-South-Wales-ors-Judgment.pdf (verified: primary)
[59] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures (adverse impact and the "four-fifths rule"). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[60] 15 U.S.C. § 45(n) (FTC Act s. 5: standard for unfairness). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap2-subchapI-sec45.htm (verified: primary)
[61] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[62] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[63] FTC v. Rite Aid Corporation, No. 2:23-cv-5023 (E.D. Pa.) (five-year ban on facial recognition for security or surveillance; stipulated order approved 8 Mar 2024). Federal Trade Commission, case page. 2024-03-08. https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v (verified: primary)
[64] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[65] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[66] "Federal Trade Commission Announces Final Rule Banning Fake Reviews and Testimonials" (16 CFR Part 465; covers AI-generated fake reviews; civil penalties for knowing violations). Federal Trade Commission. 2024-08-14. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (verified: primary)
[67] California Business and Professions Code ss. 17940 to 17943 (bot disclosure: unlawful to use a bot to mislead about its artificial identity to incentivise a sale or influence a vote, unless clearly and conspicuously disclosed; in force 1 Jul 2019). California Legislative Information. 2019. https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=7.&title=&part=3.&chapter=6.&article= (verified: primary)
[68] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[69] Directive (EU) 2019/2161 (better enforcement and modernisation of EU consumer protection rules), adding UCPD Annex I points 23b and 23c (consumer reviews). Official Journal of the EU. 2019-11-27. https://eur-lex.europa.eu/eli/dir/2019/2161/oj (verified: primary)
[70] Regulation (EU) 2022/2065 (Digital Services Act), Arts. 25 (online interface design and organisation), 27 (recommender system transparency) and 35(1)(k) (prominent marking of generated or manipulated media). Official Journal of the EU. 2022-10-19. https://eur-lex.europa.eu/eli/reg/2022/2065/oj (verified: primary)
[71] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(a) and (b) (manipulative or deceptive techniques; exploitation of vulnerabilities). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[72] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of AI interaction; machine-readable marking of synthetic content; deployer disclosure of deep fakes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[73] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[74] AI Liability Directive, Legislative Train Schedule (withdrawal announced in the Commission 2025 work programme; withdrawal published OJ C/2025/5423, 6 Oct 2025). European Parliament. 2026-08. https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-ai-liability-directive (verified: secondary)
[75] "Products liability" (design, manufacturing and marketing defects, including failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. current. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[76] Garcia v. Character Technologies, Inc., No. 6:24-cv-01903 (M.D. Fla.): order granting in part and denying in part motions to dismiss (ECF 115, 21 May 2025); notice of resolution and order dismissing without prejudice (ECF 242 and 244, 7 Jan 2026). CourtListener (court docket). 2026-01-07. https://www.courtlistener.com/docket/69300919/garcia-v-character-technologies-inc/ (verified: primary)
[77] Product liability (review of the regime, including digital products and AI; terms of reference 8 Dec 2025; consultation planned for the second half of 2026). Law Commission of England and Wales. 2025-12. https://lawcom.gov.uk/project/product-liability/ (verified: primary)
[78] IEC 60812:2018, Failure modes and effects analysis (FMEA and FMECA), edition 3.0. International Electrotechnical Commission. 2018-08-10. https://webstore.iec.ch/en/publication/26359 (verified: primary)
[79] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[80] TAKE IT DOWN Act, Public Law 119-12 (S. 146) (knowing publication of intimate images incl. digital forgeries; notice-and-removal process within one year of enactment; removal within 48 hours; FTC enforcement). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[81] Sexual Offences Act 2003, s. 66B (sharing or threatening to share a photograph or film which "shows, or appears to show" another person in an intimate state; in force 31 Jan 2024). legislation.gov.uk. 2024-01-31. https://www.legislation.gov.uk/ukpga/2003/42/section/66B (verified: primary)
[82] Data (Use and Access) Act 2025, s. 138 (inserts Sexual Offences Act 2003 s. 66E, creating a purported intimate image of an adult). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/138 (verified: primary)
[83] Equal Credit Opportunity Act (Regulation B): final rule (ECOA does not authorize disparate-impact liability, the effects test; amends 12 CFR 1002.4, 1002.6, 1002.8 and 1002.15 and Supplement I, not 1002.9; 91 FR 21620, FR Doc. 2026-07804; effective 2026-07-21). Consumer Financial Protection Bureau, Federal Register. 2026-04-22. https://www.federalregister.gov/documents/2026/04/22/2026-07804/equal-credit-opportunity-act-regulation-b (verified: primary)
[84] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
