---
lang: es
source: bok/16-fairness-explainability.md
sourceHash: "51457249289a3e5c6a3d9843df211b5c45bec1543edc01267f5faaa5f38770b9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 16. Equidad y explicabilidad para profesionales

> La equidad y la explicabilidad se convierten en controles solo cuando se miden, se cierran y se
> archivan como evidencia; este capítulo mapea cada técnica a su capa de stack y su gancho legal.

## Cómo leer este capítulo

La equidad y la explicabilidad son los dos principios que todo marco de IA responsable nombra y los
dos que más a menudo se quedan en el cartel. El Marco de Gestión de Riesgos de IA del NIST enumera
«Justo, con sesgo perjudicial gestionado» e «Explicable e interpretable» entre las características
de la IA de confianza, y asigna a cada uno una subcategoría de medición: `MEASURE 2.11` (se evalúan
la equidad y el sesgo y se documentan los resultados) y `MEASURE 2.9` (el modelo se explica, valida
y documenta, y su salida se interpreta en contexto) [1]. La pregunta de ingeniería es qué se
convierten esas dos frases un martes cualquiera: qué métrica, calculada en qué segmento, contra qué
umbral, ante cuyo fallo se rompe la compilación; qué explicación, producida por qué método, probada
cómo, entregada a quién, y conservada como qué registro.

El capítulo mantiene la línea de la casa del capítulo 01. La IA responsable y la ética de la IA
fijan el objetivo; la ingeniería de gobernanza de IA construye el control que lo alcanza y la
evidencia que lo prueba (véase
[el clúster de desambiguación](/bok/definition#the-disambiguation-cluster)). Nada aquí es
asesoramiento legal. La ley decide qué disparidad es ilegal y qué explicación se debe; el ingeniero
construye la medición y la explicación para que Legal tenga algo verdadero en qué decidir.

Las dos mitades pertenecen juntas por una razón práctica. La equidad trata de resultados entre
personas; la explicabilidad trata de las razones de un resultado. Una explicación es cómo un
individuo descubre que una decisión fue injusta para él, y los métodos de atribución son una forma
en que un equipo encuentra el proxy que hizo que un modelo fuera injusto. Ambos también se
intercambian contra la privacidad: no puedes medir una disparidad entre un grupo que no puedes
observar, ni explicar una decisión sin revelar algo sobre sus datos. La primera mitad cubre la
equidad, la segunda la explicabilidad, y la última sección coloca ambas en las cinco capas del
[stack](/bok/the-stack#how-to-read-the-stack).

## Dónde entra el sesgo en el ciclo de vida

NIST SP 1270 clasifica el sesgo de IA en tres categorías, **sistémico**, **estadístico** y
**humano**, y afirma claramente que «no es posible lograr un riesgo cero de sesgo en un sistema de
IA» [2]. La consecuencia para un ingeniero es que la equidad se gestiona como cualquier otro riesgo
residual: nombrado, medido, acotado y monitoreado, nunca declarado resuelto.

Suresh y Guttag dan la vista del ciclo de vida: siete fuentes de daño posterior, distribuidas desde
la recopilación de datos hasta el despliegue [3]. Cada una tiene un control diferente, así que el
primer trabajo es saber cuál estás mirando.

| Fuente | Dónde entra | Fallo típico | Control y evidencia | Capa |
|---|---|---|---|---|
| Sesgo histórico | El mundo que describen los datos | Las decisiones de contratación pasadas codifican la discriminación pasada | Auditoría de etiquetas; decisión de reetiquetar o cambiar el objetivo, registrada en la ficha de datos | 02 · 03 |
| Sesgo de representación | Muestreo | Un grupo está submuestreado, por lo que su tasa de error es alta y ruidosa | Informe de cobertura por grupo contra la población de despliegue | 02 · 03 |
| Sesgo de medición | Características y etiquetas | Un proxy conveniente se interpone por el objetivo real | Revisión de validez del objetivo; escaneo de proxy | 03 |
| Sesgo de agregación | Modelado | Un modelo ajustado a grupos con relaciones diferentes | Rendimiento por grupo; términos de interacción o modelos separados | 03 |
| Sesgo de aprendizaje | Objetivo de entrenamiento | Optimizar la pérdida promedio se intercambia por un grupo minoritario | Entrenamiento restringido por equidad; curvas de pérdida por grupo | 03 |
| Sesgo de evaluación | Puntos de referencia | El conjunto de prueba no se parece a las personas servidas | Conjunto de evaluación extraído de la población de despliegue; métricas segmentadas | 03 |
| Sesgo de despliegue | Uso en contexto | Una puntuación construida para un propósito utilizada para otro | Campo de finalidad prevista en el registro; monitoreo de uso indebido | 02 · 04 |

El sesgo de medición merece la mayor atención porque pasa cada prueba de precisión. El caso canónico
es un algoritmo comercial de atención médica ampliamente utilizado que predecía *costos* de atención
médica como sustituto de la *necesidad* de salud. Porque se gastaba menos dinero en pacientes negros
al mismo nivel de enfermedad, el modelo era preciso en su objetivo y sesgado en lo que importaba;
corregir la disparidad habría elevado la proporción de pacientes negros marcados para ayuda extra
del 17,7% al 46,5% [4]. Ninguna métrica de equidad calculada contra la etiqueta de costo lo habría
detectado. Lo que lo detecta es una revisión de si la etiqueta mide la construcción sobre la que
trata la decisión, registrada antes del entrenamiento. El
[caso de puntuación de riesgo de salud](/cases/health-risk-score-proxy) lo lee como una autopsia, y
el [caso de modelo de contratación (reportado)](/cases/recruiting-model-reported) hace lo mismo para
el sesgo histórico en datos de contratación. La Ley de IA de la UE escribe esta vista en la ley para
sistemas de alto riesgo. Los artículos 10(2)(f) y (g) requieren que los datos se examinen para
sesgos que probablemente afecten la salud y la seguridad, dañen los derechos fundamentales o
conduzcan a discriminación prohibida, y requieren medidas para detectarlos, prevenirlos y
mitigarlos; los artículos 10(3) y (4) requieren datos que sean relevantes, suficientemente
representativos e idóneos para la configuración de uso [5]. El artículo 15(4) añade el bucle de
retroalimentación: un sistema que sigue aprendiendo debe construirse para reducir el riesgo de que
los resultados sesgados se conviertan en entradas futuras [6]. Cada cláusula es una prueba que
puedes ejecutar y un registro que puedes mantener (véase
[Gobernanza de datos en todo el stack](/bok/the-stack#data-governance-across-the-stack)).

## Características protegidas, proxies y los datos que necesitas para probar

Las **características protegidas** se definen por el marco legal, no por el ingeniero. La ley
federal de empleo de EE.UU. protege la raza, el color, la religión, el sexo y el origen nacional
bajo el Título VII [7]; la ley de igualdad de la UE define la discriminación por motivos como el
origen racial o étnico [8]; el RGPD nombra categorías especiales de datos personales cuyo
tratamiento está restringido [9]. Un sistema desplegado en múltiples jurisdicciones necesita la
unión de las listas que se aplican, registrada en la política como datos, no en la cabeza de un
ingeniero.

Eliminar el atributo protegido del conjunto de características, a veces llamado «equidad a través
del desconocimiento», no elimina el sesgo. Otras características llevan la misma información: el
código postal se interpone por la etnia, el nombre de pila por el sexo y el origen, una brecha en la
carrera por el sexo o la discapacidad, el tipo de dispositivo por los ingresos. Dos pruebas exponen
**proxies** y pertenecen a la suite de eval:

- **Predice el atributo protegido.** Entrena un modelo pequeño para predecir el atributo protegido a
  partir de las características candidatas. Si tiene éxito muy por encima del azar, el conjunto de
  características codifica el atributo y un modelo entrenado en él puede discriminar sin verlo
  nunca.
- **Atribuye y ablaciona.** Usa atribución de características (más adelante en este capítulo) para
  encontrar qué características impulsan la disparidad, luego mide la disparidad con cada
  característica sospechosa eliminada o neutralizada.

Ambas pruebas necesitan el atributo protegido en el momento de la evaluación, que es la tensión de
privacidad que todo programa de equidad enfrenta. La UE lo resolvió estrechamente. El Omnibus
Digital eliminó el artículo 10(5) y movió la regla a un nuevo **artículo 4a**, en vigor desde el 27
de julio de 2026 [10]. El artículo 4a(1) permite a los proveedores de sistemas de alto riesgo
procesar excepcionalmente categorías especiales de datos personales en la medida estrictamente
necesaria para la detección y corrección de sesgos conforme a los artículos 10(2)(f) y (g); el
artículo 4a(2) extiende la misma posibilidad a proveedores e implementadores de otros sistemas y
modelos de IA e implementadores de sistemas de alto riesgo, para sesgos que probablemente afecten la
salud y la seguridad o los derechos fundamentales o conduzcan a discriminación prohibida, bajo las
mismas condiciones, mientras afirma que no crea obligación de ejecutar tal detección [11]. Las
condiciones se leen como una especificación de control, que es cómo construirlas:

| Condición del art. 4a(1) | Control de ingeniería | Registro de evidencia |
|---|---|---|
| (a) Otros datos, incluidos datos sintéticos o anonimizados, no funcionarían | Memorándum de necesidad comparando las alternativas intentadas | Memorándum firmado vinculado desde la ficha de datos |
| (b) Límites de reutilización y seguridad de última generación, incluida la seudonimización | Seudonimización en la ingesta; etiqueta de propósito aplicada en la compilación de la tubería | Configuración de tubería y veredicto de política |
| (c) Acceso estricto y documentado para personas autorizadas bajo confidencialidad | Rol de acceso limitado; registro de acceso | Registro de acceso por consulta |
| (d) Sin transmisión a ni acceso por otras partes | Política de salida como código denegando la exportación del conjunto etiquetado | Veredictos de política en cada despliegue |
| (e) Eliminación una vez que el sesgo se corrige o la retención termina, lo que ocurra primero | Retención como código con un trabajo de eliminación | Evento de eliminación con hash del conjunto de datos |
| (f) Registros del estado de procesamiento que explican por qué el procesamiento fue estrictamente necesario | Entrada de registro de procesamiento generada a partir del memorándum | Versión de registro de procesamiento |

El artículo se sitúa encima del RGPD, no en lugar de él, por lo que la base legal y la EIPD aún se
aplican (véase el capítulo 19,
[Privacidad e IA](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)). Donde los
datos de categoría especial no pueden usarse en absoluto, los alternativas son la autoidentificación
voluntaria con una declaración clara de propósito, pruebas en paneles consentidos, y atributos
inferidos; estos últimos llevan su propio error y riesgo legal y necesitan la misma revisión que
cualquier otro uso de los datos (capítulo 19 sobre
[datos sensibles inferidos y proxy](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data)).

## Trato disparatado e impacto disparatado

La ley antidiscriminación tiene dos doctrinas, y un sistema de IA puede violar cualquiera de ellas.

| Doctrina | Marco de EE.UU. | Marco de la UE | Cómo se ve en un modelo | Primera prueba |
|---|---|---|---|---|
| **Trato disparatado** (discriminación directa) | Uso intencional o explícito de una característica protegida | Trato menos favorable por un motivo protegido en una situación comparable | El atributo protegido, o un sustituto deliberado, es una característica o una regla | Auditoría de características; prueba de cambio contrafáctico |
| **Impacto disparatado** (discriminación indirecta) | Una práctica que causa un impacto disparatado y no está relacionada con el trabajo y es consistente con la necesidad comercial | Un criterio aparentemente neutral que pone a un grupo en una desventaja particular sin justificación objetiva | Las características neutrales producen resultados desiguales | Ratios de tasa de selección; brechas de tasa de error |

En la ley de empleo de EE.UU., el impacto disparatado es estatutario: una práctica que lo causa es
ilegal a menos que esté relacionada con el trabajo y sea consistente con la necesidad comercial, o
donde se rechaza una alternativa menos discriminatoria [7]. La prueba de la UE para la
discriminación indirecta tiene la misma forma: un criterio aparentemente neutral que desventaja a un
grupo es ilegal a menos que esté objetivamente justificado por un objetivo legítimo perseguido por
medios apropiados y necesarios [8]. Para un ingeniero, «criterio neutral» significa
«característica», y «justificado» significa demostrar por qué la característica es necesaria y que
ninguna alternativa menos discriminatoria funciona aceptablemente. Esa comparación es una eval, y su
resultado es evidencia.

### La regla de cuatro quintos y la razón de impacto adverso

El número de detección más utilizado proviene de las Directrices Uniformes de EE.UU. sobre
Procedimientos de Selección de Empleados de 1978. Una tasa de selección para cualquier raza, sexo o
grupo étnico que sea inferior a cuatro quintas partes (80%) de la tasa del grupo con la tasa más
alta «será generalmente considerada» por las agencias federales de cumplimiento como evidencia de
impacto adverso [12]. La razón de las dos tasas es la **razón de impacto adverso (AIR)**.

El mismo párrafo contiene las advertencias que la mayoría de los paneles de control omiten. Las
diferencias más pequeñas pueden seguir constituyendo impacto adverso cuando son significativas tanto
en términos estadísticos como prácticos, y las diferencias más grandes pueden no serlo cuando se
basan en números pequeños y no son estadísticamente significativas [12]. Así que la regla de cuatro
quintas es un disparador para investigación, no una marca de aprobación. Una puerta que trata 0,81
como verde y 0,79 como rojo, sin intervalo de confianza y sin muestra mínima, es la trampa de
Goodhart descrita en [los límites de la eval gate](/bok/definition#the-limits-of-the-eval-gate).

> **Ejemplo (ilustrativo)** Un modelo de detección avanza 120 de 400 solicitantes del grupo A (una
> tasa de selección del 30%) y 45 de 250 del grupo B (18%). La AIR para el grupo B es 18 / 30 =
> 0,60, muy por debajo de 0,8. La eval registra las tasas, los recuentos, la razón, un intervalo de
> confianza bootstrap para la razón y la fuente del atributo protegido, y la puerta dirige el
> lanzamiento a revisión en lugar de fallar o pasar silenciosamente.

El peso legal de la regla está cambiando. A partir del 2026-09-24, la aplicación federal de EE.UU.
se ha alejado del impacto desproporcionado: el 9 de junio de 2026, el Departamento de Justicia
anunció una opinión de la Oficina de Asesoría Legal concluyendo que las directrices de impacto
desproporcionado de la EEOC son inconstitucionales [13]. La opinión aborda las Directrices
Uniformes, se presenta como implementación de la Orden Ejecutiva 14281, y sigue un plan de
aplicación de la EEOC que prioriza el trato desproporcionado; no es una sentencia judicial, y los
comentaristas señalan que los demandantes privados y muchas leyes estatales siguen apoyando
reclamaciones de impacto desproporcionado [14]. La conclusión de ingeniería no cambia con el clima
de aplicación: la razón de impacto adverso sigue siendo la señal temprana más económica de un
resultado desigual, y varios regímenes aún la requieren por nombre.

La Ley Local 144 de Nueva York es el ejemplo más claro. Un empleador puede utilizar una herramienta
automatizada de decisión de empleo solo si ha sido sometida a una auditoría de sesgo por un auditor
independiente en el año anterior; la auditoría debe calcular tasas de selección o puntuación y
ratios de impacto entre categorías de sexo, categorías de raza/etnia y categorías
**interseccionales**; se debe publicar un resumen de los resultados; y las categorías bajo el 2% de
los datos de auditoría pueden ser excluidas [15]. La ley no requiere ninguna acción específica sobre
los resultados [15], que es exactamente por qué la función de ingeniería debe adjuntar un umbral
interno y un propietario: un ratio de impacto publicado sin ninguno es transparencia sin control.

Dos puntos legales adicionales restringen la solución, no solo el hallazgo. El Título VII prohíbe
ajustar puntuaciones o usar diferentes puntuaciones de corte por raza, color, religión, sexo u
origen nacional en pruebas de empleo [7], por lo que una solución de post-procesamiento que
establece umbrales específicos por grupo puede ser en sí misma ilegal en ese contexto. Y cualquier
mitigación que utilice el atributo protegido en el momento de la decisión corre el riesgo de
convertirse en discriminación directa según la ley de la UE. Las opciones de mitigación van a Legal
con la evidencia de eval adjunta (véase [mitigación](#mitigation-before-during-and-after-training) a
continuación). El panorama más amplio de EE.UU. y la UE está en el capítulo 20,
[Ley existente e IA](/bok/existing-law#fairness-measures-the-law-recognises).

## Métricas de equidad de grupo

Una **métrica de equidad de grupo** compara una estadística del comportamiento del modelo entre
grupos. Las cinco que más importan, en el vocabulario de la investigación que las definió, están a
continuación. `Ŷ` es la decisión o predicción, `Y` el resultado verdadero y `A` el grupo.

| Métrica | Se cumple cuando | Iguala | Se ajusta cuando | Cuidado con |
|---|---|---|---|---|
| **Paridad demográfica** (paridad estadística) | `P(Ŷ=1 given A=a)` es igual entre grupos | Tasas de selección | La oportunidad debe compartirse independientemente del resultado medido; la AIR es su forma de razón | Ignora diferentes tasas base; puede cumplirse seleccionando miembros no calificados de un grupo [16] |
| **Igualdad de oportunidades** | Las tasas de verdaderos positivos son iguales | Beneficio para los calificados | Perder a una persona calificada es el daño principal (contratación, admisiones, acceso a atención) [17] | Deja los falsos positivos sin restricciones |
| **Probabilidades igualadas** | Las tasas de verdaderos positivos y falsos positivos son ambas iguales | Ambos tipos de error | Ambos errores son costosos [17] | Más difícil de satisfacer; puede costar precisión para todos los grupos |
| **Paridad predictiva** | La precisión (`P(Y=1 given Ŷ=1)`) es igual | Significado de una decisión positiva | Una decisión positiva desencadena una acción cuyo valor depende de ser correcto (derivación de fraude) [18] | Incompatible con tasas de error iguales cuando las tasas base difieren |
| **Calibración dentro de grupos** | Entre personas puntuadas `s`, una fracción `s` son positivas, en cada grupo | Significado de una puntuación | Las puntuaciones se consumen como probabilidades (fijación de precios de crédito, riesgo clínico) [19] | Una puntuación calibrada puede seguir produciendo tasas de error muy diferentes |

Dos reglas prácticas se derivan. Reporta diferencias *y* razones, porque una brecha absoluta pequeña
en una tasa base baja puede ser una razón grande y viceversa [20]. Y reporta la métrica con su
denominador: una tasa en 30 personas es una anécdota, y la eval debe decirlo. El catálogo de
herramientas enumera [kits de herramientas de equidad](/resources/tools#cat-fairness) como ejemplos
ilustrativos, no respaldos.

### Equidad individual y contrafáctica

Las métricas de grupo pueden satisfacerse mientras los individuos son tratados arbitrariamente
dentro de cada grupo. Dos nociones a nivel individual abordan eso. La **equidad individual**
requiere que individuos similares sean tratados de manera similar, dada una medida de similitud
específica de la tarea; la parte difícil, que sus autores nombran, es acordar esa medida [16]. La
**equidad contrafáctica** requiere que una decisión sea la misma en el mundo real y en un mundo
contrafáctico donde el individuo pertenecía a un grupo diferente, lo que necesita un modelo causal
explícito de cómo el atributo influye en las otras características [21].

Ninguno se calcula generalmente de forma exacta en producción, pero ambos tienen una aproximación
económica y útil: la **prueba de cambio contrafáctico**. Cambia solo el atributo protegido, o sus
marcadores textuales (un nombre, un pronombre, un dialecto), mantén todo lo demás fijo, y mide con
qué frecuencia cambia la decisión o el texto generado. Para sistemas basados en LLM, esta es la eval
de equidad más práctica disponible, porque las etiquetas de grupo para salidas raramente existen
mientras que los prompts emparejados son fáciles de generar.

## Los resultados de imposibilidad

Dos artículos de 2016 y 2017 convirtieron «¿qué métrica de equidad?» de una pregunta técnica en una
opción de valor. Kleinberg, Mullainathan y Raghavan formalizaron tres condiciones (calibración
dentro de grupos y equilibrio de puntuaciones para la clase positiva y para la clase negativa) y
probaron que, excepto en casos especiales altamente restringidos, ningún método puede satisfacer las
tres simultáneamente [19]. Chouldechova mostró que cuando la prevalencia del resultado difiere entre
grupos, un instrumento no puede satisfacer la paridad predictiva y las tasas de error iguales
simultáneamente, y que el impacto desproporcionado puede surgir cuando el equilibrio de tasas de
error falla [18]. Los casos especiales son predicción perfecta y tasas base iguales, y los
despliegues reales raramente tienen ninguno.

> **Ejemplo (ilustrativo)** Dos grupos de 1.000 personas. El grupo A tiene una tasa base del 30%
> (300 positivos), el grupo B una tasa base del 10% (100 positivos). Un clasificador con la misma
> tasa de verdaderos positivos (0,8) y tasa de falsos positivos (0,1) en ambos grupos satisface
> probabilidades igualadas. En el grupo A produce 240 verdaderos positivos y 70 falsos positivos
> (0,1 × 700), una precisión de 240 / 310 = 0,77. En el grupo B produce 80 verdaderos positivos y 90
> falsos positivos (0,1 × 900), una precisión de 80 / 170 = 0,47. Tasas de error iguales,
> significado desigual de una decisión positiva: la paridad predictiva falla, y ninguna opción de
> umbral arregla ambas mientras las tasas base difieran.

La consecuencia de ingeniería es procedural. Porque las métricas entran en conflicto, la opción
entre ellas es una decisión de gobernanza con un propietario, tomada *antes* de ver los resultados y
registrada como política. Un equipo que elige la métrica después de mirar cuál es la que su modelo
aprueba está comprando métricas, y el registro debe hacer eso imposible: la métrica elegida, la
razón, el umbral y el aprobador viven en una [Ficha de Política](/patterns/policy-card) versionada
que la eval lee.

## Pruebas interseccionales y de subgrupos

Las métricas de grupo agregadas ocultan a las personas en las intersecciones. La auditoría Gender
Shades de tres clasificadores de género comerciales encontró tasas de error de hasta 34,7% para
mujeres de piel más oscura contra un máximo de 0,8% para hombres de piel más clara [22]; un informe
por género solo, o por tipo de piel solo, promedia el grupo peor servido en uno más grande. Kearns y
colegas nombraron el fracaso general **gerrymandering de equidad**: un clasificador puede verse
justo en cada grupo predefinido y aún violar gravemente la restricción en subgrupos estructurados
definidos sobre los atributos protegidos [23]. Las fichas de modelo se propusieron en parte para
reportar evaluación entre grupos demográficos e interseccionales [24], y las auditorías de sesgo de
Nueva York ahora requieren categorías interseccionales [15].

Las pruebas interseccionales se encuentran con números pequeños rápidamente, así que la eval
necesita reglas para ellas:

- **Un tamaño mínimo de celda** en la política; por debajo de él la eval reporta «datos
  insuficientes», enumera la celda y nunca la cuenta como un pase.
- **Intervalos de confianza** en cada tasa y razón, con la puerta en el intervalo, no en el punto.
- **Una corrección de comparación múltiple establecida**, porque con docenas de celdas algunas
  fallan por casualidad.
- **Una búsqueda del peor corte**, por ejemplo un árbol superficial ajustado al indicador de error,
  para encontrar subgrupos que nadie enumeró; la métrica del peor grupo se reporta junto al
  promedio.

## Elegir una métrica de equidad por caso de uso

La métrica sigue el daño, y el daño sigue el caso de uso. La guía del usuario de Fairlearn separa
**daños de asignación** (un sistema extiende o retiene oportunidades, recursos o información) de
**daños de calidad de servicio** (un sistema funciona menos bien para algunas personas incluso
cuando nada se retiene) y **daños de estereotipificación** [20]. Suma el costo de cada tipo de error
y el marco legal, y la opción se estrecha. El costo de cada tipo de error es el
[apetito de error](/bok/governing-development#error-appetite-false-positives-versus-false-negatives)
del registro del caso de uso (capítulo 14).

| Caso de uso | Tipo de daño | Error más costoso | Métrica principal | Comprobaciones secundarias | Marco legal |
|---|---|---|---|---|---|
| Detección de CV, promoción | Asignación | Rechazar a un candidato calificado | AIR de tasa de selección; igualdad de oportunidades | AIR interseccional; escaneo de proxy | Título VII, Directrices Uniformes, NYC LL144; Reglamento de IA Anexo III punto 4 |
| Aprobación de crédito y fijación de precios | Asignación | Ambos: denegación indebida y crédito inasequible | Calibración dentro de grupos; AIR de tasa de aprobación | Brechas en tasas de error; consistencia de códigos de razón | ECOA y Regulación B, FCRA; Reglamento de IA Anexo III punto 5(b) |
| Elegibilidad y recuperación de prestaciones | Asignación (punitiva al reclamar) | Suspensión o reclamación indebida de una prestación | Paridad de tasa de falsos positivos | Paridad predictiva; resultados de apelaciones por grupo | Ley de igualdad; RGPD art. 22; Reglamento de IA Anexo III punto 5(a) |
| Triaje clínico | Asignación (basada en necesidad) | Omitir a una persona en necesidad | Igualdad de oportunidades; calibración | Revisión de validez de etiquetas (coste frente a necesidad) | Ley de dispositivos médicos e igualdad |
| Voz, visión, búsqueda de documentos | Calidad del servicio | Fallo para un grupo de usuarios | Tasa de error del peor grupo | Error interseccional | Accesibilidad e igualdad de oportunidades |
| Asistente generativo | Calidad del servicio; estereotipos | Salida degradada o denigrante para un grupo | Tasa de cambio contrafáctico; piso de calidad por grupo | Sondas de estereotipos; brechas en tasas de rechazo | Igualdad y derecho del consumidor |

Los puntos del Anexo III son los casos de uso de alto riesgo del Reglamento de IA para empleo (punto
4), prestaciones de asistencia pública (punto 5(a)) y solvencia crediticia y puntuación crediticia
(punto 5(b)), que expresamente excluye sistemas utilizados para detectar fraude financiero [25]. La
tabla es un punto de partida, no una regla. Lo que hace que la elección sea defendible es que está
escrita con sus razones antes de que se ejecute la eval, revisada por alguien que representa a las
personas afectadas (el patrón [FRIA-as-Code](/patterns/fria-as-code) es donde vive esa revisión), y
revisada cuando cambia el caso de uso.

## Mitigación antes, durante y después del entrenamiento

Una vez que se encuentra una disparidad y se juzga inaceptable, las correcciones se dividen en tres
familias según dónde actúen. Los kits de herramientas abiertos implementan muchas de ellas; AI
Fairness 360 incluye métricas de conjunto de datos y modelo y algoritmos de mitigación [26],
Fairlearn proporciona evaluación y mitigación con un marco explícitamente sociotécnico [27], y
Aequitas se centra en auditoría entre subgrupos [28]. Se nombran como ejemplos de una categoría, no
como respaldos.

| Etapa | Técnicas (ejemplos) | Qué cambia | Evidencia a mantener | Precaución |
|---|---|---|---|---|
| **Preprocesamiento** | Recopilar mejores datos; reponderar o remuestrear grupos subrepresentados; reetiquetar después de una auditoría de etiquetas; transformar características para eliminar información de proxy | Los datos de entrenamiento | Diff de ficha de datos; informe de cobertura antes/después | A menudo la corrección más duradera; la reponderación puede sobreajustar grupos pequeños |
| **Procesamiento en línea** | Optimización con restricción de equidad; regularizadores en brechas de grupo; desesgado adversarial | El objetivo de aprendizaje | Configuración de entrenamiento; curvas de pérdida por grupo; la restricción y su límite | Necesita el atributo en tiempo de entrenamiento (ver art. 4a) |
| **Posprocesamiento** | Umbrales específicos de grupo [17]; revisión de opción de rechazo cerca del límite | La regla de decisión | Tabla de umbral; versión de regla de decisión | Los puntos de corte específicos de grupo pueden ser ilegales en pruebas de empleo estadounidenses [7] y arriesgan discriminación directa en la UE |

Tres reglas se aplican a cada mitigación. Vuelve a ejecutar el conjunto completo, incluida la
precisión por grupo, porque una corrección puede "igualar" haciendo que todos estén peor. Registra
la mitigación como un cambio con un propietario y una razón, para que la ficha de modelo explique el
comportamiento. Y prefiere la corrección más temprana que funcione: mejores datos vencen a una
restricción inteligente, y una restricción vence a un parche de umbral.

## Monitoreo de equidad en producción

Una eval de equidad prueba que el modelo era aceptable en los datos de evaluación en tiempo de
compilación. La producción trae nuevas personas, poblaciones desplazadas y etiquetas retrasadas. El
monitoreo cierra la brecha con señales que no necesitan verdad fundamental inmediatamente:

- **Tasas de selección o aprobación por grupo** y su AIR, en una ventana móvil, comparadas contra la
  línea base de eval. Estas no necesitan etiqueta de resultado.
- **Calibración y tasas de error por grupo** una vez que llegan los resultados, con el retraso de
  etiqueta indicado.
- **Señales de supervisión humana por grupo**: tasas de anulación, tiempo para decidir y tasas de
  reversión en la [Puerta de Supervisión Humana](/patterns/human-in-the-loop-gate). Un revisor que
  anula un grupo más a menudo es una señal de equidad sobre el modelo o sobre el revisor.
- **Quejas, apelaciones y solicitudes de explicación por grupo**, incluidos sus resultados. El
  [canal de contestación](/patterns/decision-notice-contest-path) es un sensor.
- **Comprobaciones de bucle de retroalimentación** para sistemas cuyos resultados dan forma a datos
  de entrenamiento futuro, que el artículo 15(4) requiere que los sistemas de alto riesgo que
  continúan aprendiendo aborden [6].

El atributo de grupo generalmente está ausente en tiempo de ejecución. Las opciones son una muestra
consentida o panel en el que se conoce el atributo, auditorías periódicas bajo las condiciones del
artículo 4a (los responsables del despliegue de sistemas de alto riesgo caen bajo el artículo 4a(2)
[11]), o monitoreo solo de las tasas libres de resultado con el atributo unido en un entorno
asegurado. Sea cual sea el elegido, el [monitor](/patterns/drift-fairness-monitor) es una señal de
capa 04 transmitida a capa 05 a través de
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry), y una violación abre un
ticket con un propietario, no un gráfico que nadie lee. Una disparidad que causó daño es un
incidente y sigue el capítulo 17,
[Incidentes](/bok/incidents#incident-hazard-issue-and-serious-incident).

## Transparencia, interpretabilidad y explicabilidad

Las tres palabras se usan indistintamente y no deberían serlo. El marco de NIST traza la línea en
una oración cada una: la transparencia responde "qué sucedió" en el sistema, la explicabilidad
responde "cómo" se tomó una decisión, y la interpretabilidad responde "por qué" se tomó y qué
significa para el usuario en contexto [1]. El capítulo 11 nombra las tres fuentes de opacidad entre
[los rasgos de IA que rompen la gobernanza clásica de TI](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).

| Término | Pregunta que responde | Artefacto típico | Audiencia principal | Capa |
|---|---|---|---|---|
| **Transparencia** | ¿Qué es este sistema, qué datos y modelo utiliza, qué puede y no puede hacer? | Ficha de modelo, ficha de datos, AIBOM, instrucciones de uso, aviso de uso de IA | Responsables del despliegue, auditores, el público | 02 |
| **Explicabilidad** | ¿Cómo llegó el sistema a este resultado? | Registro de explicación por decisión; atribución; códigos de razón | Operadores, personas afectadas, revisores | 03 · 04 |
| **Interpretabilidad** | ¿Por qué este resultado significa lo que significa, aquí? | Un modelo cuya estructura una persona puede leer; orientación de interpretación | Propietarios de modelos, validadores, expertos en dominio | 03 |

NIST IR 8312 añade cuatro principios que un sistema que debe ser explicable debe cumplir: entrega
**explicación** (evidencia o razones para resultados), la explicación es **significativa** para su
consumidor previsto, tiene **precisión de explicación** (refleja correctamente cómo se produjo el
resultado), y el sistema respeta **límites de conocimiento** (opera solo donde fue diseñado y con
suficiente confianza) [29]. El tercer principio es el que más a menudo se incumple, y al que este
capítulo vuelve bajo pruebas.

## Interpretable por diseño o explicado después del hecho

Hay dos rutas para una explicación. Un **modelo inherentemente interpretable** es uno cuya
estructura es la explicación: un modelo lineal o logístico disperso, un cuadro de puntuación, un
modelo aditivo generalizado, un árbol de decisión poco profundo o una lista de reglas corta. Una
**explicación post-hoc** es producida por un segundo método que aproxima el comportamiento de un
modelo que no es legible en sí mismo.

El argumento de Rudin es que para decisiones de alto riesgo esta elección no es neutral: explicar
una caja negra en lugar de usar un modelo interpretable "es probable que perpetúe malas prácticas",
porque una explicación post-hoc es un modelo del modelo, y puede estar equivocada al respecto [30].
La forma práctica de ese argumento es una regla de diseño. Entrena primero una línea base
interpretable. Si el modelo complejo no la supera por un margen que importe para la decisión, envía
el interpretable; si lo hace, registra el margen, la razón por la que la ganancia justifica el
riesgo de explicación, y el método post-hoc que se utilizará, en el registro de decisiones de diseño
(capítulo 14,
[Gobernanza del desarrollo](/bok/governing-development#architecture-and-model-selection-trade-offs)).

### Cuándo se requiere un modelo interpretable

Ningún estatuto en este capítulo dice "usa un cuadro de puntuación". Varios dicen cosas que son
difíciles de cumplir de otra manera. Un modelo interpretable es el predeterminado cuando la mayoría
de lo siguiente se cumple:

- **La decisión tiene efectos legales o igualmente significativos en una persona** (crédito, empleo,
  prestaciones, seguros, educación), por lo que las razones se deben por ley.
- **Las razones deben ser los factores realmente utilizados.** La Regulación B requiere que las
  razones de acción adversa se relacionen con los factores realmente considerados o puntuados [57];
  una aproximación post-hoc puede desviarse.
- **Los datos son tabulares con características significativas**, donde los modelos interpretables a
  menudo son competitivos.
- **Los validadores o reguladores deben reproducir la lógica**, como en la gestión del riesgo del
  modelo.
- **La persona debe poder actuar sobre la explicación**, lo que necesita factores estables y
  comprensibles.

Donde estos se cumplen y un modelo complejo aún se elige, la puerta debe exigir la evidencia más
fuerte: pruebas de precisión de explicación, pruebas de estabilidad de códigos de razón y una
justificación firmada.

## Técnicas de explicación

Las explicaciones varían a lo largo de dos ejes: **alcance** (una explicación *global* describe el
comportamiento general del modelo; una *local* explica un único resultado) y **acceso** (un método
*agnóstico del modelo* necesita solo entradas y salidas; uno *específico del modelo* utiliza los
internos del modelo). El catálogo de herramientas enumera
[bibliotecas de explicabilidad](/resources/tools#cat-explainability) como ejemplos ilustrativos, no
respaldos.

| | Global | Local |
|---|---|---|
| **Agnóstico del modelo** | Modelos sustitutos globales; importancia de características de permutación; dependencia parcial | LIME; KernelSHAP; explicaciones contrafácticas; explicaciones de ejemplo más cercano |
| **Específico del modelo** | Coeficientes de un modelo interpretable; estructura de árbol; sondeo de representaciones internas | TreeSHAP; gradientes integrados y otras atribuciones de gradiente; análisis de atención o circuito (investigación) |

### Atribución de características: SHAP, LIME y gradientes integrados

**Atribución de características** asigna a cada característica de entrada una parte de
responsabilidad en una salida. **SHAP** (SHapley Additive exPlanations) asigna a cada característica
un valor de importancia para una predicción particular, fundamentado en valores de Shapley de la
teoría de juegos, y unifica varios métodos anteriores como medidas de atribución de características
aditivas [32]. **LIME** explica una predicción individual ajustando un modelo simple e interpretable
al comportamiento de la caja negra en muestras perturbadas alrededor de esa entrada [33].
**Integrated gradients** atribuye la predicción de una red profunda acumulando gradientes a lo largo
de un camino desde una entrada de referencia hasta la real, y está diseñado para satisfacer dos
axiomas, sensibilidad e invariancia de implementación, que muchos métodos de atribución no cumplen
[34].

Cada uno tiene modos de fallo que la suite de evals debe probar en lugar de asumir:

- **Características correlacionadas.** El crédito se divide entre características correlacionadas
  según los supuestos del método, por lo que dos proxies de la misma cosa pueden parecer menores
  cada uno.
- **Líneas de base.** SHAP e integrated gradients explican en relación con una referencia; cámbiala
  y la explicación cambia, por lo que la referencia es parte del artefacto.
- **Perturbaciones fuera de la variedad.** Slack y colegas construyeron un clasificador estructurado
  cuyas predicciones permanecen sesgadas mientras que las explicaciones de LIME y SHAP se ven
  inocuas [35]. Las explicaciones pueden ser manipuladas.
- **Métodos que ignoran el modelo.** Algunos métodos de saliencia producen explicaciones
  independientes tanto del modelo como de los datos, por lo que la plausibilidad visual no es
  evidencia de precisión [36].

### Modelos sustitutos

Un **sustituto global** es un modelo interpretable (un árbol, una lista de reglas) entrenado para
imitar las predicciones del modelo complejo. Es útil para revisión y documentación, y solo es tan
bueno como su **fidelidad**: la proporción de entradas en las que coincide con el modelo que
describe. Un sustituto reportado sin su fidelidad en la población de despliegue es un diagrama, no
evidencia.

### Explicaciones contrafácticas

Una **explicación contrafáctica** establece el cambio más pequeño en la entrada que habría cambiado
el resultado, por ejemplo (ilustrativo) "si tus ingresos mensuales declarados hubieran sido 400 más
altos, la solicitud habría sido aprobada". Wachter, Mittelstadt y Russell argumentaron que tales
explicaciones pueden ayudar a un titular de datos a entender, impugnar y actuar sobre una decisión
sin abrir la caja negra [37]. Son el ajuste natural para **recourse**, y se asignan estrechamente a
lo que el Tribunal de Justicia ha pedido desde entonces a los responsables del tratamiento (ver los
ganchos legales a continuación).

Los contrafácticos necesitan restricciones de ingeniería para ser honestos y útiles. Restringe los
cambios a características que la persona realmente puede cambiar (nunca edad, origen o
discapacidad); respeta las dependencias causales entre características; prefiere cambios plausibles
y escasos; y verifica que el contrafáctico sea estable, para que dos solicitantes casi idénticos no
reciban consejos opuestos. Un contrafáctico que recomienda cambiar una característica protegida es
un hallazgo de equidad, no una explicación.

### Explicaciones basadas en ejemplos

Las **explicaciones basadas en ejemplos** muestran prototipos, los ejemplos de entrenamiento más
cercanos o los ejemplos que más influyeron en una predicción. Son intuitivas para imágenes y
documentos y para revisores expertos. También divulgan datos de entrenamiento: mostrar un caso
pasado similar puede revelar datos personales de otra persona, por lo que el método necesita la
misma revisión de privacidad que cualquier liberación de datos.

### Explicaciones para LLMs y sistemas RAG

Los modelos de lenguaje grande añaden dos complicaciones. Primero, la propia cuenta del modelo sobre
su razonamiento no es una explicación en el sentido NIST de precisión de explicación. El texto de
cadena de pensamiento puede representar sistemáticamente mal la verdadera razón de una predicción:
cuando los modelos fueron impulsados por características que nunca mencionaron, produjeron
racionalizaciones plausibles, con precisión cayendo hasta un 36% en las tareas afectadas [38]. Una
justificación generada es una salida a evaluar, no una ventana al modelo.

Segundo, **interpretabilidad mecanicista**, el programa de investigación que intenta hacer
ingeniería inversa de los cálculos dentro de una red, ha hecho progreso visible pero, según la
cuenta de sus propios investigadores, aún enfrenta problemas conceptuales y prácticos abiertos antes
de que muchos de sus beneficios puedan realizarse [39]. A partir de 2026-09-24, trátalo como una
entrada de investigación para red teaming y casos de seguridad, no como una fuente de explicaciones
por decisión que una organización pueda entregar a una persona afectada o a un auditor.

Para generación aumentada por recuperación, la explicación práctica es la **cita**: qué pasajes
recuperados apoyan qué oraciones. Las citas son tan buenas como su apoyo. Una auditoría de cuatro
motores de búsqueda generativos encontró que en promedio el 51,5% de las oraciones generadas fueron
completamente apoyadas por sus citas y el 74,5% de las citas apoyaron su oración [40]. Así que un
artefacto de explicación RAG necesita sus propias evals: precisión de citas (¿cada pasaje citado
apoya su afirmación?), recuperación de citas (¿cada afirmación está citada?), y fundamentación, todo
ejecutado en la capa 03, más un rastro en la capa 04 que almacena la instantánea del corpus e
identificadores de pasajes detrás de cada respuesta para que la cita pueda ser re-verificada más
tarde.

## Los ganchos legales para explicaciones

Los deberes de explicación provienen de varios regímenes que difieren en quién debe qué, a quién y
cuándo. La tabla encamina el trabajo; las subsecciones añaden lo que importa para la construcción.
Los capítulos 18 a 20
([El Reglamento de IA de la UE](/bok/eu-ai-act#explanation-and-notice-to-affected-people),
[Privacidad e IA](/bok/privacy-and-ai#gdpr-article-22-after-schufa),
[Derecho existente e IA](/bok/existing-law#credit-and-lending)) dan el panorama legal completo.

| Instrumento | Quién lo debe | Desencadenante | Qué debe darse | Artefacto |
|---|---|---|---|---|
| ECOA y Regulation B, 12 CFR 1002.9 | Acreedor | Acción adversa en una solicitud de crédito o cuenta | Declaración de razones principales específicas [31] | Servicio de código de razón; plantilla de aviso; registro de decisiones |
| FCRA, 15 U.S.C. 1681m y 1681g(f) | Usuario de un informe de consumidor | Acción adversa basada en el informe | Aviso, puntuación de crédito utilizada y hasta cuatro factores clave [41] | Registro de puntuación y factores clave |
| RGPD arts. 13(2)(f), 14(2)(g), 15(1)(h) | Responsable del tratamiento | Toma de decisiones automatizada conforme al art. 22(1) y (4) | Información significativa sobre la lógica implicada, la significación y las consecuencias previstas [9] | Aviso a nivel de sistema; explicación por solicitud |
| RGPD art. 22(3) | Responsable del tratamiento | Decisión únicamente automatizada con efecto legal o similarmente significativo, sobre contrato o consentimiento | Intervención humana, la oportunidad de expresar una opinión y de impugnar [9] | Canal de impugnación; registro de revisión |
| RGPD del Reino Unido arts. 22A–22D | Responsable del tratamiento | Decisión significativa basada únicamente en procesamiento automatizado | Información, representaciones, intervención humana, impugnación [42] | Lo mismo, variante del Reino Unido |
| Reglamento de IA art. 13 | Proveedor (a responsables del despliegue) | Sistema de alto riesgo | Instrucciones de uso que permitan a los responsables del despliegue interpretar la salida [43] | Instrucciones de uso; ficha de método de explicación |
| Reglamento de IA art. 86 | Responsable del despliegue | Decisión basada en un sistema del Anexo III (excepto punto 2) con efecto adverso legal o similarmente significativo | Explicación clara y significativa del papel del sistema de IA y los elementos principales de la decisión [44] | Flujo de trabajo de solicitud de explicación; registro de explicación |

### Crédito: avisos de acción adversa y códigos de razón

La ley de crédito estadounidense es el régimen de explicación más antiguo y más concreto. Regulation
B requiere que las razones de la acción adversa sean específicas e indiquen las razones principales;
decir solo que el solicitante no cumplió con estándares internos o una puntuación calificante es
insuficiente [31]. El comentario oficial añade el detalle de ingeniería: más de cuatro razones no es
probable que sea útil; las razones deben relacionarse con y describir con precisión los factores
realmente considerados o puntuados; ninguna razón principal puede ser omitida; y no se requiere un
único método de selección, con dos métodos de referencia que comparan la puntuación del solicitante
en cada factor contra puntuaciones promedio [57]. Cuando la acción se basa en un informe de
consumidor, la FCRA añade la puntuación de crédito utilizada y hasta cuatro factores clave [41].

Las dos circulares de la CFPB aplicando estos deberes a algoritmos complejos y a formularios de
razón de muestra fueron retiradas el 12 de mayo de 2025 [45]; a partir de 2026-09-24 la regulación y
su comentario aún llevan el deber. Así que un servicio de **código de razón** asigna cada factor
principal que el modelo realmente utilizó a una razón estable y legible por humanos, versionada con
el modelo, y una prueba muestra que las razones dadas para una muestra de denegaciones coinciden con
los factores que las impulsaron. Si el modelo es demasiado complejo para que esa prueba pase, el
modelo es el problema, no el aviso.

### Protección de datos: RGPD y el régimen del Reino Unido

Los artículos del RGPD no utilizan las palabras "derecho a la explicación"; el Considerando 71
menciona obtener "una explicación de la decisión adoptada", y los artículos 13 a 15 requieren
información significativa sobre la lógica implicada donde tiene lugar la toma de decisiones
automatizada del artículo 22 [9]. El Tribunal de Justicia ha hecho eso concreto. En *SCHUFA*
(C-634/21, 7 de diciembre de 2023) sostuvo que generar una puntuación de crédito puede ser en sí
misma una decisión del artículo 22(1) donde un tercero se basa fuertemente en ella [46], por lo que
el proveedor de puntuación, no solo el prestamista, puede deber las salvaguardas. En *Dun &
Bradstreet Austria* (C-203/22, 27 de febrero de 2025) sostuvo que el responsable del tratamiento
debe explicar el procedimiento y los principios realmente aplicados, que una fórmula matemática
compleja no cumple el deber, y que los secretos comerciales van a la autoridad o tribunal para un
balance caso por caso en lugar de justificar la negativa [47]. El Tribunal añadió que, para la
elaboración de perfiles, el tribunal nacional podría encontrar suficientemente transparente e
inteligible decir al titular de los datos hasta qué punto una variación en los datos personales
tenidos en cuenta habría conducido a un resultado diferente (párr. 62) [47][48]: una explicación
contrafáctica en lenguaje legal.

En el Reino Unido, la Data (Use and Access) Act 2025 reemplazó el artículo 22 con los artículos 22A
a 22D, que tratan una decisión como únicamente automatizada donde no hay participación humana
significativa y requieren salvaguardas para informar al titular de los datos, tomar
representaciones, proporcionar intervención humana y permitir impugnación [42]. La guía co-marcada
de la ICO con The Alan Turing Institute sobre explicación de decisiones de IA está bajo revisión
como resultado a partir de 2026-09-24; sus seis tipos de explicación (justificación,
responsabilidad, datos, equidad, seguridad y desempeño, impacto) siguen siendo una lista de
verificación útil [49]. En la UE, el ómnibus digital más amplio de la Comisión propuso reescribir el
artículo 22; un primer compromiso del Consejo dejó caer ese cambio, y a partir de 2026-09-24 las
enmiendas del RGPD no están adoptadas [50] (verifica antes de confiar en el texto actual).

### El Reglamento de IA de la UE: artículos 13 y 86

El Reglamento de IA añade una obligación aguas arriba y otra aguas abajo. El artículo 13 requiere
que los sistemas de alto riesgo sean lo suficientemente transparentes para que los responsables del
despliegue puedan interpretar el resultado y utilizarlo adecuadamente, con instrucciones de uso que
sean «relevantes, accesibles y comprensibles para los responsables del despliegue» y que cubran las
capacidades técnicas del sistema para proporcionar información relevante para explicar su resultado,
su rendimiento para las personas o grupos a los que está previsto que se aplique, y las medidas
técnicas que ayudan a los responsables del despliegue a interpretar los resultados [43]. El
artefacto del proveedor es una ficha de método de explicación que se envía con las instrucciones:
método, línea de base, límites conocidos, fidelidad y rendimiento a nivel de grupo.

El artículo 86 otorga a una persona sujeta a una decisión de un responsable del despliegue basada en
un sistema de alto riesgo del Anexo III (excepto infraestructura crítica, punto 2), con efectos
adversos legales o de importancia similar en su salud, seguridad o derechos fundamentales, el
derecho a «explicaciones claras y significativas del papel del sistema de IA en el procedimiento de
toma de decisiones y los elementos principales de la decisión adoptada» [44]. Se aplica solo cuando
la legislación de la Unión no ya proporciona el derecho [44], por lo que los artículos 15(1)(h) y 22
del RGPD tienen prioridad donde sean aplicables. Los responsables del despliegue también deben
informar a las personas de que están sujetas al sistema [51]. El Omnibus Digital trasladó las
principales obligaciones del Anexo III al 2 de diciembre de 2027 [10]; si el inicio práctico del
artículo 86 sigue esa fecha debe confirmarse con asesoramiento legal (verificar). La construcción no
necesita esperar: un registro de explicación, descrito a continuación, sirve para el artículo 86, el
artículo 15(1)(h) y un aviso de acción adversa.

## Prueba de la calidad de la explicación

Una explicación es un resultado, por lo que recibe evals como cualquier otro resultado. La taxonomía
de Doshi-Velez y Kim proporciona tres niveles de evidencia, en coste creciente: pruebas
**funcionalmente fundamentadas** sin humanos (métricas proxy), pruebas **fundamentadas en humanos**
con personas leigas en tareas simplificadas, y pruebas **fundamentadas en aplicación** con usuarios
reales en la tarea real [52]. Un conjunto práctico mezcla los tres.

| Prueba | Lo que comprueba | Nivel | Condición de puerta ilustrativa (ilustrativa) |
|---|---|---|---|
| **Fidelidad** | La explicación refleja el modelo (precisión de explicación NIST [29]): eliminar las características más atribuidas cambia el resultado más que eliminar las aleatorias | Funcional | El área de la curva de eliminación supera la aleatoria por un margen establecido en el conjunto de validación |
| **Estabilidad** | Las entradas casi idénticas obtienen explicaciones y códigos de razón casi idénticos | Funcional | Superposición de razón superior a k por encima de un umbral bajo pequeñas perturbaciones |
| **Cordura** | La explicación cambia cuando el modelo se aleatoriza [36] | Funcional | Similitud de explicación después de aleatorización de pesos por debajo de un umbral |
| **Resistencia a la manipulación** | El sondeo fuera de la variedad no puede ocultar un sesgo conocido [35] | Funcional | El modelo de prueba de sesgo plantado es detectado por el método de explicación |
| **Consistencia del código de razón** | Los códigos de razón coinciden con los factores que realmente impulsaron la decisión [57] | Funcional | El 100% de los rechazos muestreados tienen razones extraídas de factores puntuados |
| **Validez contrafáctica** | El cambio sugerido invierte la decisión y utiliza solo características mutables | Funcional | Todos los contrafácticos muestreados son válidos y accionables |
| **Comprensión** | La audiencia prevista puede indicar la razón principal y qué podrían cambiar | Fundamentada en humanos | Una mayoría de un panel de prueba responde correctamente ambas preguntas |
| **Apoyo a la decisión** | Los revisores con explicaciones deciden mejor, no solo más rápido, y no se ven inducidos al sesgo de automatización | Fundamentada en aplicación | La precisión de anulación con explicaciones al menos igual a sin ellas |

Las dos últimas filas son las que los equipos omiten y las que la ley le importan: una explicación
debe ser **significativa** para la persona que la recibe [29]. Prueba el aviso con personas como sus
destinatarios, incluidas personas con baja alfabetización en su idioma y personas que utilizan
tecnología de asistencia, y mantén el protocolo y los resultados como evidencia. Para los revisores,
empareja esto con
[Diseño de supervisión humana](/bok/the-stack#designing-human-oversight-article-14): una explicación
que hace que los revisores estén de acuerdo más rápido con un modelo incorrecto es un fallo de
control.

## Explicaciones accesibles

Una explicación que el destinatario no puede percibir o entender falla la prueba de «significativa»
sea cual sea su fidelidad. El Reglamento de IA pide instrucciones de uso que sean «relevantes,
accesibles y comprensibles para los responsables del despliegue» [43] y requiere que los proveedores
de sistemas de alto riesgo cumplan los requisitos de accesibilidad de la UE de las Directivas (UE)
2016/2102 y 2019/882 [53]. WCAG 2.2 proporciona los criterios comprobables para el canal digital
[54]. En la práctica:

- **Texto primero.** Cada gráfico de atribución (una cascada SHAP, un mapa de prominencia) tiene un
  equivalente textual que indica los factores principales en palabras (criterio de éxito WCAG 1.1.1,
  contenido no textual).
- **Nunca solo color.** Las contribuciones positivas y negativas se marcan por signo y etiqueta, no
  solo rojo y verde (1.4.1, uso del color).
- **Lenguaje claro.** Los códigos de razón se escriben para el destinatario, no para el científico
  de datos; apunta a un nivel de lectura de educación secundaria inferior cuando la audiencia es el
  público (3.1.5, nivel de lectura, un criterio de nivel AAA utilizado aquí como objetivo).
- **Detalle en capas.** Una razón de una oración, luego los factores principales, luego cómo
  impugnar, luego el anexo técnico para quienes lo soliciten.
- **Más de un canal.** La misma explicación está disponible en papel, por teléfono o en persona para
  personas que no utilizan el canal digital.

## Artefactos de explicación como registros de evidencia

Una explicación entregada y no conservada no puede ser auditada, reproducida o defendida. La unidad
de evidencia es el [**registro de explicación**](/patterns/explanation-artefact): un objeto
estructurado por decisión explicada, escrito en el momento de la decisión por el tiempo de ejecución
(capa 04), vinculado al mismo id de registro que cualquier otro artefacto, y retenido por la
obligación que sirve.

> **Ejemplo (ilustrativo)** Un registro de explicación para una solicitud de financiación de
> dispositivo rechazada:
>
> ```json
> { "decision_id": "dfc-2026-09-18-004211", "subject": "credit-dfc@2026-09-01",
>   "outcome": "decline", "method": "treeshap", "method_version": "0.46",
>   "baseline": "bg-sample.v12", "fidelity_check": "pass",
>   "reason_codes": ["R07 debt-to-income", "R12 recent missed payments"],
>   "counterfactual": { "feature": "monthly_debt", "change": "-180", "result": "approve" },
>   "template": "adverse-action.en.v5", "audience": "applicant",
>   "delivered": "2026-09-18T10:02:13Z", "channel": "email+letter",
>   "contest_url_ref": "appeal-flow.v3" }
> ```

El registro hace tres cosas verdaderas. La explicación es reproducible, porque la versión del
modelo, el método, su versión y la línea de base están fijados. Es comprobable, porque los códigos
de razón pueden ser re-derivados y comparados. Y es reutilizable, porque el mismo registro responde
a un aviso de Regulación B, una solicitud de acceso del artículo 15(1)(h), una solicitud del
artículo 86 y una apelación interna. Los registros de explicación se transmiten a la capa 05 con el
resto de la evidencia, donde un auditor puede preguntar «muéstrame cada rechazo en agosto cuyo
código de razón difiera de un nuevo cálculo» y obtener una consulta, no un proyecto.

## Equidad y explicabilidad en el stack

Ambas disciplinas producen evidencia en cada capa. La tabla es la lista de verificación; cada fila
nombra el artefacto, no la aspiración.

| Capa | Artefacto de equidad | Artefacto de explicabilidad | Patrón |
|---|---|---|---|
| **01 Govern-as-Code** | Política de equidad como datos: atributos protegidos por jurisdicción, métrica elegida y razón, umbrales, tamaño mínimo de celda, aprobador | Política de explicación: tipos de explicación requeridos por caso de uso, regla interpretable por defecto, límites de código de razón | [Policy Card](/patterns/policy-card) |
| **02 Inventory & Transparency** | Ficha de datos con cobertura por grupo y base del art. 4a; ficha de modelo con métricas desagregadas e interseccionales | Instrucciones de uso y ficha de método de explicación (método, línea de base, fidelidad, límites); aviso de uso de IA | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) |
| **03 Evals & Red Teaming as Evidence** | [Suite de eval de equidad](/patterns/fairness-eval-suite): métricas de grupo con intervalos, cortes interseccionales, escaneo proxy, prueba de volteo contrafáctico | Suite de eval de explicación: fidelidad, estabilidad, cordura, consistencia de código de razón, prueba de comprensión | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **04 Runtime Controls & Observability** | Tasas de selección y AIR rodantes por grupo; tasas de anulación y apelación por grupo | [Registro de explicación](/patterns/explanation-artefact) por decisión; canal de impugnación; rastro de cita RAG | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **05 Assurance & Continuous Compliance** | Resultados de equidad y resúmenes de auditoría como evidencia legible por máquina; resumen publicado estilo LL144 | Registro de solicitud de explicación con tiempos de respuesta; comprobaciones periódicas de re-derivación | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |

La capa 03 es donde ambas se convierten en controles, por lo que la definición de hecho en
[Capa 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) se aplica sin cambios: los
conjuntos se versionan con el modelo, se ejecutan en CI, emiten resultados estructurados archivados
contra la entrada del registro, y fallan la compilación cuando fallan. Para modelos procurados la
misma lógica se mantiene en el límite: aún puedes calcular métricas de grupo en los resultados del
sistema de un proveedor y probar las explicaciones que devuelve, y la
[Puerta de Diligencia Debida de Proveedor / Modelo](/patterns/vendor-model-due-diligence-gate) es
donde pides los propios resultados desagregados del proveedor y documentación de método de
explicación (ver [IA de terceros y procurada](/bok/the-stack#third-party-and-procured-ai)).

El estante de normas para este trabajo es corto. NIST SP 1270 enmarca el sesgo [2], NIST IR 8312
enmarca la explicación [29], e ISO/IEC TR 24027:2021 cubre el sesgo en sistemas de IA y toma de
decisiones asistida por IA [55]; se hace referencia aquí solo por número. ISO/IEC TS 6254:2025
(publicado en septiembre de 2025) es el documento SC 42 sobre objetivos y enfoques para la
explicabilidad e interpretabilidad de modelos de aprendizaje automático y sistemas de IA [56];
también se hace referencia aquí solo por número. Ninguno de estos es una norma armonizada, y ninguno
confiere una presunción de conformidad con el Reglamento de IA (ver
[el mapa regulatorio](/bok/regulatory-map#eu-ai-act-post-omnibus)).

### Condiciones de puerta

Una condición de puerta es una oración que la tubería puede evaluar. Condiciones ilustrativas, cada
una vinculada a un valor de política en lugar de un número redondo elegido por comodidad:

- Para cada grupo y celda interseccional por encima del tamaño mínimo, el límite de confianza
  inferior del AIR está en o por encima del piso de política y la brecha en la métrica de error
  elegida está dentro de su límite, o una justificación firmada se adjunta a la versión.
- Las celdas por debajo del tamaño mínimo se enumeran como «datos insuficientes»; ninguna se reporta
  como un pase.
- El escaneo proxy está por debajo del límite de política, o cada característica marcada tiene una
  justificación registrada.
- El método de explicación pasa las comprobaciones de fidelidad, estabilidad y cordura; los códigos
  de razón muestreados provienen solo de factores puntuados; los contrafácticos muestreados son
  válidos y utilizan solo características mutables.
- La ficha de modelo, ficha de método de explicación e instrucciones de uso fueron regeneradas para
  esta versión.

Un resultado de puerta de eval lleva la métrica, su intervalo y la política contra la que fue
juzgada (ilustrativa):

```json
{ "suite_id": "fairness.credit-dfc.v3", "model_version": "credit-dfc@2026-09-01",
  "metric": "approval_air", "group": "age_65_plus", "value": 0.86,
  "ci95": [0.81, 0.91], "floor": 0.80, "min_cell": 200, "n": 1840,
  "policy": "fairness-policy.credit.v2", "result": "pass" }
```

> **En la práctica (ilustrativo)** Una operadora de telefonía que vende terminales en planes de pago
> realiza una verificación de crédito en el punto de venta, por lo que cada rechazo es una decisión
> de crédito que debe justificar al solicitante. La primera versión utilizaba un modelo de gradient
> boosting y generaba códigos de razón a partir de valores SHAP en tiempo de solicitud. Una prueba
> de consistencia de códigos de razón encontró que para un segmento de rechazos la característica
> SHAP superior era una interacción ingenierizada que ningún aviso podía describir. El equipo
> entrenó un scorecard monótono como línea base, encontró que estaba dentro de un pequeño margen del
> modelo complejo en precisión de aprobación, y desplegó el scorecard. La eval de equidad entonces
> bloqueó cada lanzamiento en el AIR de tasa de aprobación por grupo de edad con intervalos, y cada
> rechazo escribió un registro de explicación. La pregunta de auditoría "¿por qué se rechazó a este
> cliente y se trató de manera diferente a alguien como él?" se convirtió en dos consultas.

**Correspondencias:** Reglamento de IA Art. 4a (datos de categorías especiales para detección de
sesgos), Art. 10(2)(f)–(g), 10(3)–(4) (datos y sesgos), Art. 13 (transparencia para responsables del
despliegue), Art. 15(4) (bucles de retroalimentación), Art. 26(11) (informar a las personas
afectadas), Art. 86 (derecho a la explicación) · RGPD Arts. 13–15, 22 · UK GDPR Arts. 22A–22D · ECOA
/ Regulation B, FCRA · US Uniform Guidelines (29 CFR 1607.4(D)) · NYC Local Law 144 · NIST AI RMF
(Measure 2.9, 2.11) · NIST SP 1270 · NIST IR 8312 · ISO/IEC TR 24027 · Layers 01–05. Los mapeos son
ilustrativos, no una afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Elige un sistema de decisión sobre personas y escribe su política de equidad como datos**: los
   atributos protegidos que aplican, la métrica que elegiste y por qué, el umbral, el tamaño mínimo
   de celda y el aprobador. Compromételo antes de mirar la siguiente ejecución de eval.
2. **Ejecuta un escaneo de proxy** en las características de ese sistema: entrena un modelo para
   predecir el atributo protegido a partir de ellas y registra el resultado en la ficha de datos,
   con la base del Art. 4a si utilizaste datos de categorías especiales.
3. **Añade una eval de equidad interseccional a CI** con intervalos de confianza y un resultado de
   "datos insuficientes", conectada al [Eval Gate in CI](/patterns/eval-gate-in-ci) para que pueda
   fallar la compilación.
4. **Emite un registro de explicación para cada decisión adversa** que el sistema toma, con la
   versión del modelo, método, línea base y códigos de razón fijados, y prueba 10 de ellos para
   consistencia de códigos de razón.
5. **Pon un aviso delante de cinco personas** como las que lo reciben y pídeles que indiquen la
   razón principal y qué podrían cambiar. Conserva las respuestas como evidencia y corrige lo que
   entendieron mal.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (transparency answers "what happened", explainability "how", interpretability "why"; MEASURE 2.9 and 2.11). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[2] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[3] "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle" (H. Suresh, J. Guttag; seven sources: historical, representation, measurement, aggregation, learning, evaluation, deployment; EAAMO 2021). arXiv 1901.10002. 2019-01-28. https://arxiv.org/abs/1901.10002 (verified: primary)
[4] "Dissecting racial bias in an algorithm used to manage the health of populations" (Z. Obermeyer, B. Powers, C. Vogeli, S. Mullainathan; Science 366(6464):447-453; cost as a proxy for need; 17.7% to 46.5%). Science (PubMed 31649194). 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance; 10(2)(f)-(g) examination for and mitigation of biases; 10(3)-(4) relevance, representativeness and setting; former 10(5) deleted and moved to Art. 4a by the Omnibus). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15(4) (systems that continue to learn must reduce the risk of biased outputs influencing input for future operations, "feedback loops"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[7] 42 U.S.C. § 2000e-2(k) and (l) (burden of proof in disparate-impact cases: job related and consistent with business necessity; less discriminatory alternative; (l) no adjusted scores or different cut-off scores by race, colour, religion, sex or national origin). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[8] Council Directive 2000/43/EC (Racial Equality Directive), Art. 2(2)(a)-(b) (direct and indirect discrimination). EUR-Lex. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[9] Regulation (EU) 2016/679 (GDPR), Arts. 9, 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). EUR-Lex. 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[10] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[11] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4a (processing of special categories of personal data for bias detection and correction: conditions (a)-(f) in para. 1; para. 2 for other AI systems and models and for deployers of high-risk systems; no obligation created; inserted by Reg. (EU) 2026/1744, in force 27 Jul 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[12] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[13] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[14] "DOJ Opinion Finds EEOC Disparate Impact Liability Guidelines Unconstitutional" (opinion addresses 29 CFR part 1607 and 1608; "helps to implement" Executive Order 14281; EEOC enforcement plan of 4 Jun 2026 prioritises disparate treatment; private and state-law disparate-impact claims remain). Ogletree Deakins. 2026-06-29. https://ogletree.com/insights-resources/blog-posts/doj-opinion-finds-eeoc-disparate-impact-liability-guidelines-unconstitutional/ (verified: secondary)
[15] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary; no specific action required; categories under 2% may be excluded). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[16] "Fairness Through Awareness" (C. Dwork, M. Hardt, T. Pitassi, O. Reingold, R. Zemel; individual fairness; limits of statistical parity). arXiv 1104.3913. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[17] "Equality of Opportunity in Supervised Learning" (M. Hardt, E. Price, N. Srebro; equalised odds, equal opportunity and post-processing adjustment). arXiv 1610.02413. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[18] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[19] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[20] Fairlearn user guide, "Fairness in machine learning" (allocation, quality-of-service and stereotyping harms; disparity metrics as ratios or differences). Fairlearn project. 2026. https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html (verified: primary)
[21] "Counterfactual Fairness" (M. Kusner, J. Loftus, C. Russell, R. Silva). arXiv 1703.06856. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[22] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[23] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[24] "Model Cards for Model Reporting" (M. Mitchell et al.; evaluation across demographic and intersectional groups; FAT* 2019). arXiv 1810.03993. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[25] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III (high-risk use cases: point 2 critical infrastructure; point 4 employment; point 5(a) public assistance benefits; point 5(b) creditworthiness and credit scoring, excluding financial-fraud detection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[26] "AI Fairness 360: An Extensible Toolkit for Detecting, Understanding, and Mitigating Unwanted Algorithmic Bias" (R. Bellamy et al.). arXiv 1810.01943. 2018-10-03. https://arxiv.org/abs/1810.01943 (verified: primary)
[27] "Fairlearn: Assessing and Improving Fairness of AI Systems" (H. Weerts et al.; fairness as a sociotechnical challenge). arXiv 2303.16626. 2023-03-29. https://arxiv.org/abs/2303.16626 (verified: primary)
[28] "Aequitas: A Bias and Fairness Audit Toolkit" (P. Saleiro et al.). arXiv 1811.05577. 2018-11-14. https://arxiv.org/abs/1811.05577 (verified: primary)
[29] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[30] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[31] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons; the official commentary is [57]). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[32] "A Unified Approach to Interpreting Model Predictions" (S. Lundberg, S.-I. Lee; SHAP). arXiv 1705.07874. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[33] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (M. T. Ribeiro, S. Singh, C. Guestrin; LIME). arXiv 1602.04938. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[34] "Axiomatic Attribution for Deep Networks" (M. Sundararajan, A. Taly, Q. Yan; integrated gradients; sensitivity and implementation invariance). arXiv 1703.01365. 2017-03-04. https://arxiv.org/abs/1703.01365 (verified: primary)
[35] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[36] "Sanity Checks for Saliency Maps" (J. Adebayo et al.; some saliency methods are independent of model and data). arXiv 1810.03292. 2018-10-08. https://arxiv.org/abs/1810.03292 (verified: primary)
[37] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (S. Wachter, B. Mittelstadt, C. Russell; Harvard Journal of Law & Technology, 2018). arXiv 1711.00399. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[38] "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting" (M. Turpin, J. Michael, E. Perez, S. R. Bowman; accuracy drops of up to 36% on 13 BIG-Bench Hard tasks). arXiv 2305.04388. 2023-05-07. https://arxiv.org/abs/2305.04388 (verified: primary)
[39] "Open Problems in Mechanistic Interpretability" (L. Sharkey et al.). arXiv 2501.16496. 2025-01-27. https://arxiv.org/abs/2501.16496 (verified: primary)
[40] "Evaluating Verifiability in Generative Search Engines" (N. F. Liu, T. Zhang, P. Liang; 51.5% of generated sentences fully supported by citations; 74.5% of citations support their sentence). arXiv 2304.09848. 2023-04-19. https://arxiv.org/abs/2304.09848 (verified: primary)
[41] 15 U.S.C. § 1681m(a) and § 1681g(f)(1) (duties of users taking adverse action on the basis of a consumer report; credit score, range and key factors, not more than four). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII.htm (verified: primary)
[42] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22A no meaningful human involvement; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and provision of information to deployers; 13(2) "relevant, accessible and comprehensible to deployers"; 13(3)(b)(iv), (v), (vii); 13(3)(d)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[44] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; Annex III except point 2; subsidiary to other Union law under 86(3)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[45] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms and Circular 2023-03 on adverse-action reasons and sample forms, both withdrawn 12 May 2025). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
[46] "CJEU's first ruling on Article 22 GDPR: 'credit scoring' is an automated decision" (C-634/21 SCHUFA, 7 Dec 2023; a probability value is an Art. 22(1) decision where a third party draws strongly on it). Cloisters. 2023-12-14. https://www.cloisters.com/latest/cjeus-first-ruling-on-article-22-gdpr-credit-scoring-is-an-automated-decision (verified: secondary)
[47] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (paras. 58 to 62 and 74 to 76; Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation; for profiling, the effect of a variation in the personal data on the result can suffice (para. 62); trade secrets balanced case by case by the authority or court). Court of Justice of the EU (EUR-Lex). 2025-02-27. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0203 (verified: primary)
[48] "ECJ Ruling on Automated Decision-Making and Data Subject Access" (commentary on C-203/22: an explanation of how variations in the data might change the outcome). Clyde & Co. 2025-03. https://clydeco.com/en/insights/2025/03/ecj-ruling-on-automated-decision-making-and-data-s (verified: secondary)
[49] Explaining decisions made with AI (co-badged ICO and The Alan Turing Institute guidance; six explanation types; under review after the Data (Use and Access) Act). Information Commissioner's Office. consulted 2026-09-24. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/ (verified: primary)
[50] "The Digital Omnibus: a step back from the brink, but the risks remain" (first Council compromise drops the proposed rewrite of GDPR Art. 22; GDPR amendments still in negotiation). European Digital Rights (EDRi). 2026-03-17. https://edri.org/our-work/the-digital-omnibus-a-step-back-from-the-brink-but-the-risks-remain/ (verified: secondary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(11) (deployers of Annex III high-risk systems that make or assist decisions about natural persons must inform them). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[52] "Towards A Rigorous Science of Interpretable Machine Learning" (F. Doshi-Velez, B. Kim; application-grounded, human-grounded and functionally-grounded evaluation). arXiv 1702.08608. 2017-02-28. https://arxiv.org/abs/1702.08608 (verified: primary)
[53] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16(l) (providers of high-risk systems ensure accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[54] Web Content Accessibility Guidelines (WCAG) 2.2 (W3C Recommendation; SC 1.1.1, 1.4.1, 3.1.5). W3C. 2024-12-12. https://www.w3.org/TR/WCAG22/ (verified: primary)
[55] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
[56] ISO/IEC TS 6254:2025, Information technology, Artificial intelligence: Objectives and approaches for explainability and interpretability of machine learning (ML) models and artificial intelligence (AI) systems (published, edition 1; referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2025-09. https://www.iso.org/standard/82148.html (verified: primary)
[57] 12 CFR Part 1002, Supplement I, Official Interpretations, comments 9(b)(2)-1 to -5 (more than four reasons not likely helpful; reasons must relate to and accurately describe the factors actually considered or scored; no principal reason left out; no single reason-selection method required, two reference methods against average scores). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/appendix-Supplement%20I%20to%20Part%201002 (verified: primary)
