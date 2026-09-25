---
lang: es
source: bok/12-governance-program.md
sourceHash: "460584c50e45544537c593e6d00f037ffa678694b52f0164664a33518e8e400f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 12. Ejecutar el programa de gobernanza de IA

> Un programa de gobernanza de IA es la organización gobernada como un sistema: las personas tienen
> los deberes, un comité decide qué puertas no pueden, las políticas se compilan en puertas, y la
> evidencia llega a la junta.

## La organización como objeto de gobernanza

El capítulo 01 nombra cinco objetos de gobernanza: modelos, sistemas, agentes, datos y la
organización. Los primeros cuatro obtienen la mayoría de la maquinaria de este libro. El quinto
decide si esa maquinaria se construye, se financia, se obedece o se elude. «Un control sin
propietario no es un control» es una afirmación sobre la organización, y este capítulo lo
desarrolla: quién tiene qué deber, dónde se toman las decisiones, cómo las políticas se convierten
en puertas, cómo se capacita y se escucha a las personas, y cómo el liderazgo aprende si algo de
esto funciona.

Una regla recorre el capítulo: **el comité decide; las puertas cumplen.** Las personas toman las
decisiones que necesitan juicio (¿vale la pena este caso de uso su riesgo, es aceptable este riesgo
residual, está justificada esta excepción). El código las cumple en cada cambio y deja la evidencia.
Un programa que invierte esto, con reuniones cumpliendo y código asesorando, es el antipatrón de
«junta de revisión de riesgos» del capítulo 04: recomendación sin consecuencia.

La ley ya espera que la capa organizacional sea diseñada. El Reglamento de IA de la UE requiere que
el sistema de gestión de la calidad de un proveedor de alto riesgo incluya «un marco de
responsabilidad que establezca las responsabilidades de la dirección y otro personal»
(`Art. 17(1)(m)`) [1]. ISO/IEC 42001 pide roles, responsabilidades y autoridades definidas (cláusula
5.3; Anexo A.3.2) [2], y el NIST AI RMF para roles documentados y líneas de comunicación para riesgo
de IA (GOVERN 2.1) [3]. Ninguno dice cómo hacer que ese marco sea verdadero un martes. Ese es el
trabajo de ingeniería.

Este capítulo no es un manual de programa GRC ni asesoramiento legal. Es el modelo operativo que da
a las cinco capas de [el stack](/bok/the-stack#how-to-read-the-stack) sus propietarios. El bucle de
riesgo es el capítulo 13
([Dónde se sienta la gestión de riesgos](/bok/risk-management#the-loop-identify-assess-treat-monitor));
los controles en cada etapa de construcción y ejecución son los capítulos 14 y 15
([Gobernar el desarrollo de IA](/bok/governing-development#the-build-as-a-chain-of-gates),
[Gobernar el despliegue y el uso](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance)).

## El mapa de partes interesadas

Cada parte interesada tiene un deber, un derecho de decisión (o explícitamente ninguno) y un
artefacto que evidencia el deber. Si no puedes nombrar el artefacto, el deber aún no es real.

| Parte interesada | Deber en el programa | Decide | Artefacto que posee o firma |
|---|---|---|---|
| **Junta** (órgano de gobierno) | Establece el apetito de riesgo de IA; supervisa el programa | Apetito; la política de IA | Declaración de apetito; actas de la junta |
| **Liderazgo ejecutivo** | Posee decisiones de riesgo de IA para el negocio; financia el programa | Aceptación de los riesgos residuales más altos | Aceptaciones de riesgo firmadas; presupuesto |
| **CAIO / CDAO** | Ejecuta la estrategia de IA y la cartera de casos de uso; preside el comité | Prioridades de cartera | Cartera; inventario de casos de uso |
| **Comité de gobernanza de IA** | Decide qué puertas no pueden: riesgo residual, excepciones, compromisos de valor | Excepciones; go/no-go desencadenado | Registros de decisión; registro de excepciones |
| **Legal** | Lee obligaciones; confirma que un control las cumple | Interpretación | Registro de obligaciones; cláusulas de contrato |
| **Privacidad / DPD** | Protección de datos desde el diseño; EIPD; derechos de los interesados | Asesoramiento y aprobación de EIPD | EIPD; registros de tratamiento |
| **CISO / seguridad** | Modelo de amenaza de IA; controles de seguridad; respuesta a incidentes | Excepciones de seguridad | Modelos de amenaza; resultados de red team |
| **Riesgo** (segunda línea) | Taxonomía de riesgo de IA dentro de ERM; desafío; KRIs | Método de calificación | Registro de riesgos; umbrales de KRI |
| **Auditoría interna** (tercera línea) | Garantía independiente sobre el programa | Opinión de auditoría | Informes de auditoría; muestras probadas |
| **Propietario del producto** | Responsable del caso de uso, valor y riesgo de un sistema | Alcance; solicitud de lanzamiento | Memo de justificación; campo propietario del registro |
| **Ingeniería** (ML, datos, plataforma) | Construye y ejecuta el sistema dentro de las puertas | Diseño técnico | Código; resultados de eval; AIBOM |
| **Ingeniero de gobernanza de IA** | Construye las puertas, el registro y la ruta de evidencia | Diseño de puerta | Código de política; almacén de evidencia |
| **Adquisiciones** | Ingesta de IA para compras; clasificación de proveedores | Aprobación de proveedor, con riesgo | Archivo de proveedor; contrato |
| **HR** | Alfabetización de la fuerza laboral; IA en decisiones de empleo; información del trabajador | Procesos de personas | Registros de capacitación; avisos a trabajadores |
| **Operadores y usuarios finales** | Usan sistemas según se indica; ejercen supervisión; reportan preocupaciones | Anular en el momento | Registros de anulación y escalada |
| **Personas afectadas** y representantes | Dan retroalimentación; impugnan decisiones | Ninguno formalmente; una voz | Registros de retroalimentación e impugnación |
| **Proveedores** | Suministran evidencia; notifican cambios e incidentes | Su propio sistema | Fichas de modelo; AIBOM; avisos de incidentes |

Cuatro filas necesitan más que una celda.

**La junta.** En el Modelo de Tres Líneas del Instituto de Auditores Internos, el órgano de gobierno
es responsable de la supervisión, la dirección desempeña los roles de primera y segunda línea, y la
auditoría interna proporciona garantía independiente [4]. Para IA, la junta aprueba el apetito y la
política y recibe evidencia; no revisa casos de uso. NIST establece el deber ejecutivo claramente:
el liderazgo ejecutivo «asume la responsabilidad de las decisiones sobre riesgos asociados con el
desarrollo e implementación de sistemas de IA» (GOVERN 2.3) [3]. Una junta nunca se le pidió que
aceptara un riesgo de IA no ha delegado la decisión; nunca la ha visto.

**El CAIO.** El Chief AI Officer (o Chief Data and AI Officer) es propietario de la cartera: qué
casos de uso persigue la organización y por qué. La plantilla pública más clara es la federal
estadounidense: el Memorándum OMB M-25-21 de 3 de abril de 2025 requería que cada agencia designara
un CAIO en el plazo de 60 días, manteniendo el inventario de casos de uso de IA y estableciendo «un
proceso para una revisión independiente de casos de uso de alto impacto antes de la aceptación del
riesgo» [5]. La lección se transfiere: el CAIO es propietario del inventario y del proceso de
aceptación, y no revisa sus propios casos de uso.

**Operadores.** Un responsable del despliegue de un sistema de alto riesgo debe «asignar supervisión
humana a personas físicas que posean la competencia, formación y autoridad necesarias, así como el
apoyo necesario» (`Art. 26(2)`) [6]. La competencia y la autoridad son hechos organizacionales: un
registro de formación y un derecho documentado a detener el sistema (véase
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

**Personas afectadas.** Las personas sobre las que decide un sistema rara vez están en el programa,
así que tiene que llegar a ellas. Los empleadores que despliegan un sistema de alto riesgo en el
lugar de trabajo deben informar primero a los representantes de los trabajadores y a los
trabajadores afectados (`Art. 26(7)`) [6]. NIST pide prácticas que integren la retroalimentación de
personas ajenas al equipo que construyó o desplegó el sistema (GOVERN 5.1) y decisiones informadas
por un equipo diverso (GOVERN 3.1) [3]. Una junta de ética o un panel externo se gana su lugar solo
si su consejo se registra frente a una decisión y se responde.

## ## Una RACI de ciclo de vida

La RACI dice quién hace qué en cada etapa del ciclo de vida. **R** hace el trabajo, **A** responde
por él (uno por fila), **C** es consultado antes, **I** es informado después.

| Etapa | Propietario del producto | Ingeniería | Ingeniero de gobernanza de IA | Legal y privacidad | Seguridad | Riesgo | Comité | Auditoría interna |
|---|---|---|---|---|---|---|---|---|
| Intake | A | C | R | C | C | C | I (C si se activa) | I |
| Diseño | A | R | C | C | C | I | I | I |
| Datos | A | R | C | R | I | I | I | I |
| Construcción | A | R | C | I | C | I | I | I |
| Prueba | A | R | R | I | R | C | I | I |
| Lanzamiento | A (comité si se activa) | R | R | C | C | C | C | I |
| Operación | A | R | R | I | R | C | I | I |
| Cambio | A | R | R | C | C | I | I | I |
| Retirada | A | R | R | C | C | I | I | I |

Tres reglas mantienen la tabla honesta. El propietario del producto es responsable en cada etapa,
porque la responsabilidad que se mueve entre funciones a medida que un sistema madura es la brecha
por la que caen los incidentes. La auditoría interna es informada en todas partes y responsable en
ninguna; una vez que ejecuta una tarea de primera o segunda línea ya no puede auditar esa tarea de
forma independiente [4]. El comité tiene la A solo para casos de uso activados, por lo que no se
convierte en un cuello de botella para los ordinarios.

Una RACI en una diapositiva es una afirmación. Compílala en su lugar: un `raci.yaml` mapea etapas a
roles, cada entrada del registro nombra a las personas que ocupan esos roles para ese sistema, y la
tubería lee ambos. Un lanzamiento sin un propietario del producto nombrado falla la admisión; una
solicitud de extracción que toque una política necesita la revisión de su propietario (una regla de
propietarios de código generada a partir del mismo archivo). El marco de responsabilidad de
`Art. 17(1)(m)` se convierte en un archivo que puedes comparar [1].

## ## El comité decide, las puertas ejecutan

Los comités tienen mala reputación en este libro, y el capítulo 04 la justifica: una junta que
califica hallazgos mensualmente sin poder detener un lanzamiento es teatro. Pero algunas decisiones
no pueden automatizarse, y pretender lo contrario las oculta en la configuración de la tubería que
nadie revisa. El comité es legítimo donde toma esas decisiones, y solo allí.

### ### Para qué sirve el comité

Cuatro tipos de decisión. **Aceptación de riesgo**: si un riesgo residual por encima de la autoridad
del propietario del producto es aceptable, por cuánto tiempo y bajo qué controles compensatorios.
**Excepciones**: si un sistema puede proceder mientras falla una regla nombrada.
**Compensaciones de valor**: si un beneficio justifica un riesgo que ningún umbral puede valorar
(una decisión que afecta derechos, una población vulnerable). **Política**: aprobar el conjunto de
políticas y sus cambios materiales. No revisa cada lanzamiento, no escribe controles ni ejecuta
evals; las puertas y los equipos lo hacen.

### ### Carta y membresía

Una carta de una o dos páginas establece propósito, derechos de decisión, quórum, membresía,
cadencia, escalada, cómo se registran las decisiones y cómo cambia la carta. Un núcleo viable es el
CAIO o un delegado (presidente), legal, privacidad, seguridad, riesgo, un líder de ingeniería senior
y uno o dos líderes de producto, con RRHH y adquisiciones para sus casos y auditoría interna como
observador sin voto. Para amplitud, M-25-21 pidió a las juntas de gobernanza de IA de las agencias
más grandes (CFO Act) que incluyeran TI, ciberseguridad, datos, presupuesto, legal, privacidad,
derechos civiles y libertades civiles, y que consultaran a expertos externos según sea necesario
[5].

### ### Consultivo o vinculante

Un comité consultivo recomienda y un ejecutivo nombrado decide; un comité vinculante decide dentro
de su carta. Ambos funcionan si la carta dice cuál, por tipo de decisión. Lo que falla es la
ambigüedad: un comité que cree que aprobó un lanzamiento y un propietario del producto que cree que
solo comentó. Una división común es vinculante en excepciones y casos de uso activados, consultivo
en estrategia.

### ### Aceptación de riesgo y excepciones

El riesgo residual es aceptado por alguien con la autoridad para poseerlo, por un tiempo limitado.
Una matriz de aceptación hace eso explícito, usando las calificaciones del capítulo 13 (umbrales
ilustrativos):

| Riesgo residual | Quién puede aceptar | Validez máxima | Evidencia requerida |
|---|---|---|---|
| Bajo | Propietario del producto | 12 meses | Entrada del registro; puertas pasadas |
| Medio | Propietario del producto + función de riesgo | 6 meses | Controles compensatorios nombrados |
| Alto | Comité de gobernanza de IA | 3 meses | Registro de decisión; plan de monitoreo |
| Por encima del apetito | Liderazgo ejecutivo, reportado a la junta | 3 meses | Notificación a la junta |
| Uso prohibido | Nadie | No aplicable | Bloqueado en intake |

Una excepción es una aceptación de riesgo para una regla en un sistema. Pertenece al repositorio de
políticas como datos, no en actas. Un registro (ilustrativo):

```yaml
exception:
  id: EXC-2026-014
  rule_id: eval.injection-floor.v4
  system: csa-01
  requested_by: team-support-platform
  justification: "Vendor model update lowered injection resistance; fix scheduled"
  compensating_controls:
    - guardrail.input.injection.v3 in block mode
    - human approval for refunds above the tier-2 limit
  residual_risk: high
  decision_record: DEC-2026-051
  approved_by: ai-governance-committee
  expires: 2026-10-31T23:59:59Z
```

La puerta lee el registro. Mientras la excepción está activa, la regla devuelve `allow` con el id de
excepción en su veredicto, por lo que la evidencia muestra que el lanzamiento pasó *bajo una
excepción*. Cuando expira, la misma regla falla la construcción de nuevo sin que nadie tenga que
recordar. Las excepciones abiertas por antigüedad se convierten en un indicador de junta.

### ### Escalada, activadores y cadencia

La mayoría de los casos de uso nunca llegan al comité; pasan
[intake, obtienen un nivel](/patterns/use-case-intake-risk-tiering) y van a través de las puertas.
Los activadores de revisión enrutan el resto:

- una decisión con efecto legal o similar significativo en una persona (crédito, empleo, seguros,
  vivienda, educación, servicios públicos);
- identificación o categorización biométrica, reconocimiento de emociones, o datos de categorías
  especiales;
- niños u otras personas vulnerables como usuarios o sujetos;
- un agente con acceso de escritura a dinero, registros de clientes o infraestructura de producción;
- salidas que no pueden explicarse lo suficientemente bien para que las personas que deben actuar
  sobre ellas;
- cualquier solicitud de excepción calificada como alta o superior.

Las excepciones y los casos activados necesitan un nivel de servicio (por ejemplo, una decisión
dentro de diez días hábiles) y una ruta asincrónica; una reunión mensual haría que la gobernanza
fuera el paso más lento en la entrega. Las aprobaciones de políticas pueden ser mensuales y el
informe de la junta trimestral. La escalada corre propietario del producto, comité, ejecutivo,
junta, con el activador para cada salto escrito en la carta.

> **En la práctica (ilustrativo)**
> En una gran telco, las primeras reuniones del comité debatieron lanzamientos individuales. Mover
> excepciones a un registro que las puertas leen cambió su trabajo. Los ingenieros presentaron
> solicitudes como solicitudes de extracción; el comité decidió dentro del nivel de servicio; la
> puerta ejecutó la expiración. Las reuniones se redujeron a casos de uso activados y la tendencia
> en excepciones abiertas, y un auditor podría enumerar cada lanzamiento que se envió bajo una
> excepción con una consulta.

## ## Riesgo empresarial, las tres líneas y auditoría interna

### ### Riesgo de IA en el registro de riesgo empresarial

El riesgo de IA pertenece al registro de riesgo empresarial bajo el mismo apetito, escala de
calificación y línea de reporte que cualquier otro riesgo, con categorías de IA debajo (daño a
personas, exposición legal, seguridad, confiabilidad, terceros). ISO/IEC 23894 adapta el proceso de
riesgo ISO 31000 a IA y es el puente natural [7]. Genera la vista empresarial desde la vista del
sistema: cada entrada del registro lleva sus calificaciones y controles vinculados, y el registro
los resume por categoría y unidad de negocio. El vínculo corre en ambas direcciones, por lo que un
cambio en el apetito cambia las reglas de nivel y los umbrales de puerta.

### ### Las tres líneas, aplicadas a IA

| Línea | Quién | Deberes de IA | Evidencia que produce |
|---|---|---|---|
| Primera | Propietarios de producto, ingeniería, operadores | Construir y ejecutar sistemas dentro de las puertas; poseer sus riesgos | Entradas del registro; resultados de eval; registros de tiempo de ejecución |
| Segunda | Riesgo, cumplimiento, privacidad, seguridad, gobernanza de IA | Establecer método y política; construir el camino pavimentado; desafiar calificaciones de primera línea | Políticas como código; umbrales de KRI; registros de revisión |
| Tercera | Auditoría interna | Garantía independiente sobre el diseño y operación de controles | Informes de auditoría; muestras probadas |

El ingeniero de gobernanza de IA generalmente se sienta en la segunda línea, construyendo
herramientas que la primera línea ejecuta. El modelo describe roles, no cuadros en un organigrama;
lo que importa es que la tercera línea permanezca independiente de lo que asegura [4].

### ### Qué prueba la auditoría interna

ISO/IEC 42001 pide auditorías internas del sistema de gestión (cláusula 9.2) [2]. Deben probar las
puertas, no los documentos sobre ellas. **Re-ejecución**: vuelve a ejecutar la decisión de política
para una muestra aleatoria de lanzamientos de las entradas almacenadas; el veredicto debe coincidir
con el almacén de evidencia. **Búsqueda de derivaciones**: compara lo que el descubrimiento
encuentra ejecutándose con el registro, y los despliegues con veredictos de puerta; un despliegue
sin veredicto es un hallazgo. **Higiene de excepciones**: muestra excepciones para un aprobador
nombrado, una expiración y controles compensatorios que realmente se ejecutaron. Los ejercicios de
mesa (un incidente grave simulado, un modelo de proveedor retirado de la noche a la mañana) prueban
las rutas de decisión que ningún ejercicio de tubería.

**Correspondencias:** Reglamento de IA `Art. 17(1)(m)` (marco de responsabilidad), `Art. 26(2)` y
`Art. 26(7)` (competencia de supervisión; informar a los trabajadores) · Cláusulas ISO/IEC 42001
5.1–5.3, 9.2; Anexo A.2, A.3 · NIST AI RMF GOVERN 2, 3, 5 · capas 1 Gobernanza como código y 5
Aseguramiento y Cumplimiento Continuo. Los mapeos son ilustrativos, no una afirmación de
conformidad.

## ## Alfabetización en materia de IA como código

### ### Lo que el Artículo 4 pide después del Omnibus

El artículo 4 del Reglamento de IA de la UE ha estado en vigor desde el 2 de febrero de 2025. Según
la enmienda del Reglamento (UE) 2026/1744, en vigor desde el 27 de julio de 2026, requiere que los
proveedores y responsables del despliegue «adopten medidas para apoyar el desarrollo de la
alfabetización en materia de IA» de su personal y otras personas que operen sistemas de IA en su
nombre, y añade que esto «no requiere que los proveedores o responsables del despliegue garanticen
ningún nivel específico de alfabetización en materia de IA de ningún individuo» [8][9]. Las
preguntas frecuentes de la Comisión (actualizadas el 27 de julio de 2026) dicen que la obligación se
mantiene sin que se exija ningún nivel «suficiente»; no se necesita certificado y un registro
interno de las formaciones es suficiente; «otras personas» incluyen contratistas, proveedores de
servicios y clientes; las instrucciones de uso por sí solas no son suficientes; y las autoridades
nacionales de vigilancia del mercado supervisan la norma desde el 2 de agosto de 2026 [10]. Esta es
la posición a fecha de 2026-09-24.

La redacción más suave no es razón para hacer menos. Para los responsables del despliegue de alto
riesgo, el deber más estricto se encuentra en `Art. 26(2)`: la supervisión recae en personas con la
competencia, formación y autoridad para ejercerla [6]. NIST espera formación en riesgos de IA
adaptada a las funciones de cada persona (GOVERN 2.2) [3], e ISO/IEC 42001 aborda la competencia y
la conciencia en las cláusulas 7.2 y 7.3 [2]. La respuesta de ingeniería a los tres es la
alfabetización como un sistema basado en roles con registros, no una presentación anual.

### Currículos basados en roles

| Persona | Debe ser capaz de | Bloques de currículo | Disparador de actualización |
|---|---|---|---|
| Junta directiva y ejecutivos | Establecer el apetito; leer el paquete de KPI/KRI; aceptar o rechazar el riesgo | Terminología; estrategia y apetito; rol de proveedor o responsable del despliegue | Nueva ley; incidente importante |
| Propietarios de productos | Escribir un memorándum de justificación; clasificar un caso de uso; asumir el riesgo residual | Intake y disparadores; método de riesgo; políticas por etapa | Cambio de política |
| Ingenieros y científicos de datos | Construir dentro de las puertas; leer un resultado de eval; presentar una excepción | Ruta pavimentada; evals; adquisición de datos; deberes de incidente | Nueva puerta o herramienta |
| Legal, privacidad, cumplimiento | Traducir una obligación en una regla y viceversa | El stack; formatos de evidencia; comportamiento del sistema | Nueva obligación |
| Operadores con deberes de supervisión | Leer salidas; anular, detener, escalar | El sistema específico; sesgo de automatización; simulacro de anulación en la interfaz real | Nueva versión del modelo |
| Todo el personal que utiliza herramientas de IA | Utilizar herramientas aprobadas en datos permitidos; informar de preocupaciones | Uso aceptable; clases de datos; el canal de preocupaciones | Anual; nueva herramienta |
| Compras y recursos humanos | Detectar IA en una compra; manejar IA en decisiones de personal | Bandera de intake; clasificación de proveedores; reglas de empleo | Cambio de plantilla |

Los formatos siguen la persona: briefings de escenarios para la junta, laboratorios para ingenieros,
simulaciones para operadores, microaprendizaje con certificación para todos los demás.

### Registros de formación y certificación como condición de acceso

Un registro de formación es evidencia cuando está estructurado, vinculado a un sistema y puede
expirar (ilustrativo):

```json
{ "person": "u-48213", "role": "operator.credit-review",
  "module": "oversight.credit-scorer.v3", "completed": "2026-09-12",
  "assessment": "pass", "systems": ["credit-scorer-02"],
  "expires": "2027-09-12T00:00:00Z", "attested": true }
```

Se convierte en un control cuando el acceso depende de él. El proveedor de identidad o la puerta de
IA pregunta al motor de políticas antes de otorgar acceso (ilustrativo `OPA/Rego`):

```rego
package access.ai_tools

import rego.v1

default allow := false

allow if {
  some r in data.training_records[input.user]
  r.module == data.required_module[input.tool]
  r.attested
  time.parse_rfc3339_ns(r.expires) > time.now_ns()
}
```

Un operador cuyo módulo ha expirado pierde la consola de anulación, no solo una línea en un informe;
una nueva versión del modelo aumenta el módulo requerido, por lo que los operadores se reciclean
antes de tocarlo. El registro es `Art. 4` evidencia, la decisión de acceso es `Art. 26(2)`
evidencia, y ambos llegan al almacén de evidencia sin un sprint de recopilación.

### Medir y actualizar la alfabetización

Las tasas de finalización miden la asistencia. Los indicadores mejores son la cobertura por persona,
el tiempo desde la incorporación (o desde una nueva versión del modelo) hasta un registro actual, y
señales de resultado: tasas de anulación de operadores y tiempo para decidir (métricas de
supervisión del capítulo 04), la proporción de solicitudes de excepción que llegan bien formadas,
preocupaciones planteadas por equipo. Actualizar en eventos (una nueva ley, capacidad, incidente o
herramienta) así como en el calendario.

## Cultura de gobernanza

Los controles fallan silenciosamente cuando las personas los evitan; la cultura es si lo hacen. Tres
palancas están al alcance de una función de gobernanza.

**Campeones.** Un campeón designado en cada equipo de producto, capacitado con mayor profundidad,
responde las primeras preguntas y revisa primero los intakes. Los campeones escalan la segunda línea
sin añadir a su plantilla y llevan la ruta pavimentada a equipos que de otro modo solo se
encontrarían con la gobernanza como una compilación bloqueada
([hacer que la ruta gobernada sea la ruta más fácil](/bok/values-and-principles#make-the-governed-path-the-easiest-path)).

**Incentivos.** Medir equipos en lanzamientos a través de la ruta pavimentada, excepciones cerradas
antes de expirar y preocupaciones planteadas y resueltas, nunca en cero incidentes, lo que
recompensa el silencio. NIST pide una mentalidad de pensamiento crítico y seguridad primero y
prácticas que permitan pruebas, identificación de incidentes e intercambio de información (GOVERN
4.1, 4.3) [3]; los incentivos son cómo esa mentalidad sobrevive a un plazo.

**Revisión sin culpa.** Después de un incidente de IA o casi incidente, revisa el sistema, no la
persona. La práctica SRE de Google define una retrospectiva sin culpa como aquella que se enfoca en
«identificar las causas contribuyentes del incidente sin acusar a ningún individuo o equipo de
comportamiento malo o inapropiado» [11]. Su resultado de ingeniería es una puerta, eval o política
cambiada, presentada como una solicitud de extracción citando la revisión. Un recuento creciente de
casi incidentes reportados suele ser una buena noticia: la alternativa es menos informes, no menos
fallos.

## Un canal para plantear preocupaciones

Los pipelines capturan lo que fueron construidos para ver. Un científico de datos que sospecha que
un benchmark fue manipulado, un operador que ve un patrón de salidas dañinas, un ingeniero al que se
le pide que desactive un guardrail antes de una demostración: estos llegan al programa solo si las
personas pueden plantearlos de forma segura, fuera de la cadena de mando que creó el problema. La
ley ahora espera tales canales (a partir de 2026-09-24):

| Régimen | Quién debe actuar | Lo que requiere |
|---|---|---|
| Reglamento de IA de la UE `Art. 87` con Directiva (UE) 2019/1937 [12][13] | Entidades jurídicas privadas con 50 o más trabajadores, a través de la ley nacional de transposición | Canales internos y seguimiento (Art. 8); reconocimiento dentro de siete días y retroalimentación dentro de tres meses (Art. 9(1)(b), (f)); sin represalias (Art. 19) |
| California SB 53, Código Laboral §1107.1 [14][15] | Desarrolladores fronterizos; el deber de proceso interno vincula a grandes desarrolladores fronterizos | Sin regla que impida a los empleados cubiertos divulgar al Fiscal General u otras autoridades; sin represalias; aviso de derechos; un proceso interno anónimo con actualizaciones mensuales al denunciante, compartidas con funcionarios y directores al menos trimestralmente |
| ISO/IEC 42001 Anexo A.3.3 [2] | Organizaciones que implementan el estándar (voluntario) | Un proceso para informar sobre preocupaciones relacionadas con sistemas de IA |

El artículo 87 aplica la Directiva de Denunciantes a los informes de infracciones del Reglamento de
IA desde el 2 de agosto de 2026 [12]. SB 53, en vigor desde el 1 de enero de 2026, protege a los
«empleados cubiertos» (aquellos responsables de evaluar, gestionar o abordar el riesgo de incidentes
críticos de seguridad) que divulgan que las actividades de un desarrollador fronterizo plantean «un
peligro específico y sustancial para la salud o seguridad pública resultante de un riesgo
catastrófico» o violan el Reglamento [14][15].

Construye el canal como cualquier sistema gobernado. El intake acepta informes anónimos y nombrados
por más de una ruta. Cada informe se convierte en un registro de caso con los relojes estatutarios
codificados como temporizadores, no recordatorios. El triaje dirige un posible incidente al
[Incident Pipeline](/patterns/incident-pipeline), una posible infracción a legal, una brecha de
política al comité. La identidad del denunciante está sellada de las personas nombradas, y RRHH
vigila las señales de represalia (acciones de desempeño repentinas, cambios de acceso) alrededor de
denunciantes protegidos. Los volúmenes, el cumplimiento del reloj y los resultados suben sin
identidades. Esto esboza la ingeniería; no es asesoramiento sobre ninguna ley nacional de
transposición.

## KPIs y KRIs para liderazgo y la junta

El liderazgo necesita algunos indicadores en los que pueda confiar, calculados a partir de sistemas
en vivo en lugar de autoinformados. Un **KPI** dice si el programa está haciendo su trabajo; un
**KRI** dice si el riesgo se está moviendo hacia el borde del apetito.

| Indicador | Tipo | Definición | Producido por |
|---|---|---|---|
| Cobertura del registro | KPI | Proporción de sistemas de IA y agentes descubiertos con una entrada de registro y un propietario | Capa 02; [Shadow-AI Discovery](/patterns/shadow-ai-discovery) |
| IA no registrada encontrada | KRI | Recuento de IA en ejecución sin entrada, por nivel | Descubrimiento de capa 02 |
| Cobertura de puertas | KPI | Proporción de lanzamientos de producción que pasaron a través de una puerta de eval | Capa 03 |
| Excepciones abiertas por antigüedad | KRI | Excepciones en vivo, las más antiguas primero; las expiradas marcadas | Registro de excepciones (capa 01) |
| Tiempo para decidir | KPI | Días medianos desde intake hasta go/no-go, por nivel | Flujo de trabajo de intake |
| Evaluaciones actuales | KPI | Sistemas de alto riesgo con una FRIA o DPIA actual | Capa 02 |
| Incidentes y tiempo para contener | KRI | Incidentes de IA por severidad; tiempo mediano para detectar y contener | Capas 04 y 05 |
| Calidad de supervisión | KRI | Tasa de anulación y tiempo para decidir en puntos de control humano | Capa 04 |
| Cobertura de alfabetización | KPI | Proporción de cada persona con un registro de formación actual | Registros de formación |
| Relojes de preocupación cumplidos | KPI | Informes reconocidos dentro de siete días y respondidos dentro de tres meses | Canal de preocupaciones |
| Reevaluaciones de proveedores vencidas | KRI | Proveedores de nivel 1 pasada su fecha de reevaluación | Archivo de compras |
| Reducción real del riesgo | KPI | Cambio en la tasa de modos de fallo nombrados en producción | Capa 05 |

La última fila es la más importante y la más difícil de llenar, por lo que pertenece al paquete de
la junta desde el principio
([valor 7](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage)).
Los indicadores de cobertura son entradas; el capítulo 07
([métricas por nivel](/bok/maturity-model#metrics-per-level)) muestra las métricas de ingeniería
debajo de ellas. El paquete de la junta es una página: tendencias para seis a ocho indicadores,
cualquier cosa fuera del umbral, decisiones que la junta debe tomar, excepciones por encima del
apetito. Una consulta lo genera; un paquete ensamblado a mano se desvía de los sistemas que
describe.

## Revisión de gestión y mejora continua

Un sistema de gestión mejora solo si alguien mira la evidencia en un cronograma y cambia algo.
ISO/IEC 42001 pide monitoreo y medición, auditoría interna y revisión de gestión (cláusulas 9.1 a
9.3) y mejora continua con acción correctiva (cláusulas 10.1 y 10.2); lee el estándar para las
entradas y salidas requeridas [2]. Una revisión puede servir a varios sistemas de gestión
([integración de ISO/IEC 42001 con 27001, 27701 y 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001),
capítulo 22). NIST pide una revisión periódica planificada del proceso de riesgo, con roles y
frecuencia definidos (GOVERN 1.5) [3].

Diseña la revisión para producir cambios, no actas. Entradas: el pack de KPI/KRI, hallazgos de
auditoría, incidentes y casi-accidentes, preocupaciones, cambios en la ley y estándares, acciones
correctivas abiertas. Salidas, registradas como datos: un diff de política con fecha efectiva, un
cambio de umbral, una decisión de recursos, una acción correctiva con propietario y fecha de
vencimiento. Rastrea acciones correctivas de la manera que `OSCAL` rastrea un plan de acción e hitos
(capítulo 04), de modo que cada revisión comience con lo que se prometió y lo que se hizo. Una
revisión que no cambia nada durante dos ciclos significa que la evidencia no la alcanza, o no se
cree.

**Correspondencias:** Reglamento de IA de la UE `Art. 4` (alfabetización en materia de IA),
`Art. 26(2)` (competencia de supervisión), `Art. 87` (notificación de infracciones) · Directiva (UE)
2019/1937 · California SB 53 (Labor Code §1107.1) · ISO/IEC 42001 cláusulas 7.2–7.3, 9.1–9.3,
10.1–10.2; Anexo A.3.3 · NIST AI RMF GOVERN 1.5, 2.2, 4 · capas 1 Govern-as-Code y 5 Assurance &
Continuous Compliance.

## Estrategia, valor y si usar IA en absoluto

La gobernanza suele comenzar después de que alguien ha decidido construir. Debería comenzar un paso
antes. El NIST AI RMF espera que se documenten los objetivos de la IA y el valor empresarial de cada
uso (MAP 1.3, 1.4), que se examinen beneficios y costos, incluidos los costos no monetarios de
errores (MAP 3.1, 3.2), y, después del mapeo, una "decisión inicial de seguir adelante o no sobre si
diseñar, desarrollar o desplegar un sistema de IA"; más tarde vuelve a preguntar si el desarrollo o
despliegue debe continuar (MANAGE 1.1) [3].

Haz la pregunta un campo obligatorio. Un memo de justificación en la entrada (ilustrativo):

```yaml
use_case: refund-triage-assistant
owner: team-support-platform
problem: "Refund requests wait days for a first answer"
non_ai_alternative: "Rules engine plus extra staff at peak"
why_ai: "Free-text requests; the rules engine misroutes a large share"
benefit_metric: "Median time to first answer"
who_bears_errors: "Customers wrongly refused a refund"
contest_route: "Human review on request, within two working days"
reversible: true
kill_criteria: "Wrong-refusal rate above the tier threshold for two weeks"
```

Cinco preguntas deciden la mayoría de los casos. ¿Hay una alternativa sin IA a un costo aceptable?
¿Se puede medir el beneficio, y por quién? ¿Quién soporta los errores, y pueden impugnarlos? ¿Es
reversible la decisión? ¿Qué nos haría parar? Un caso de uso que no puede responder la última
pregunta no está listo para un gate, porque no hay umbral que hacer cumplir.

Consolidados, los memos son la cartera de IA: dónde gasta la organización, qué riesgos lleva, qué
beneficios ha medido. También responden a la acusación de que la gobernanza solo ralentiza las
cosas. "Tiempo para decidir" es un KPI del programa, y un camino pavimentado que lleva un caso de
uso de bajo riesgo de la entrada a producción en días es cómo la gobernanza habilita la entrega en
lugar de gravarlo.

## Poner en marcha un programa sin capacidad de ingeniería

Muchas organizaciones que necesitan un programa no construyen IA en absoluto; la compran. La ruta de
ingeniería primero del capítulo 04
([el stack mínimo viable para un equipo de uno](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one))
asume un pipeline para poner gates. Un comprador aún tiene pipelines: adquisición, identidad y
gastos. Construye sobre esos.

| Pilar | Artefacto mínimo | Aplicado a través de |
|---|---|---|
| Carta y alcance | Carta del programa; carta del comité | Aprobación del patrocinador ejecutivo |
| Inventario | Registro con propietario, proveedor, clases de datos y nivel | Entrada de adquisición; catálogo de aplicaciones de inicio de sesión único; revisión de gastos |
| Conjunto de políticas | Uso aceptable; entrada de IA; IA de terceros | Aprobación de compra; controles de gateway o navegador |
| Roles | Propietario nombrado por sistema; membresía del comité | Campo de registro obligatorio |
| Alfabetización | Módulos basados en roles; registros de capacitación | Acceso a herramientas condicionado a certificación |
| Métricas | Cinco indicadores de la tabla anterior | Consulta mensual sobre datos de registro y adquisición |
| Cadencia de revisión | Revisión de gestión trimestral | Decisiones registradas como datos |

Primeros 90 días: carta, comité, política de uso aceptable e inventario sembrado desde adquisición y
el catálogo de inicio de sesión (días 1 a 30); la bandera de IA en solicitudes de compra,
clasificación de lo que ya se ha comprado, módulos para operadores de los sistemas más riesgosos
(días 31 a 60); el primer pack de KPI, la primera revisión de gestión y una decisión sobre qué
control automatizar primero (días 61 a 90). El Q&A de la Comisión señala que el Artículo 4 no ordena
ninguna estructura de gobernanza específica [10]; dimensiona el programa a lo que la organización
ejecuta y crece el código con la cartera. El capítulo 13 establece cuánto del bucle de riesgo
ejecuta cada tipo de organización
([gobernanza proporcional](/bok/risk-management#proportionate-governance-tailoring-the-loop)), y la
página de plantillas tiene secciones iniciales de
[comité, RACI y política de IA](/resources/templates#tpl-kit).
## Políticas a lo largo del ciclo de vida

### Política, estándar, procedimiento, código

Los documentos de política fallan por ser demasiado vagos para hacer cumplir o demasiado detallados
para mantener actuales. Una jerarquía de cuatro niveles da a cada nivel un trabajo.

| Nivel | Responde | Aprobado por | Cambios | Ejemplo |
|---|---|---|---|---|
| Política | Por qué y qué: principios, apetito, alcance | Junta o comité | Raramente | "Ningún sistema de IA llega a producción sin un propietario y un gate de eval pasado." |
| Norma | Requisitos medibles por nivel | Comité o delegado | Trimestral | "Los sistemas de nivel 2 y 3 puntúan al menos 0.95 en la suite de inyección." |
| Procedimiento | Cómo, paso a paso | Propietario de función | Según sea necesario | "Ejecuta el gate localmente; adjunta el resultado a la entrada del registro." |
| Política como código | La regla aplicada | Revisión de código con el propietario de la política | Cada cambio es una solicitud de extracción | `eval.injection-floor.v4` |

ISO/IEC 42001 pide una política de IA (cláusula 5.2) y tiene controles sobre políticas relacionadas
con IA (Anexo A.2) [2]; NIST pide que las políticas y procedimientos de riesgo de IA estén en su
lugar, sean transparentes y se implementen efectivamente (GOVERN 1) [3]. La jerarquía añade una
regla de ingeniería: cada regla en código lleva los ids del estándar y política que implementa, de
modo que un lector puede caminar desde una compilación fallida a la oración que la junta aprobó.

### Qué requiere la política en cada etapa

Cada etapa tiene un requisito mínimo, un gate que lo hace cumplir y la evidencia que deja. Los
capítulos 14 y 15 tratan las etapas de construcción y ejecución en profundidad.

| Etapa | La política requiere | Gate que lo hace cumplir | Evidencia | Capa |
|---|---|---|---|---|
| Intake | Memo de justificación; nivel de riesgo; pantalla de uso prohibido; disparadores de revisión | La entrada escribe un stub de registro; sin stub, sin despliegue | Entrada de registro; registro de nivel | 1 · 2 |
| Diseño | [Modelo de amenaza](/patterns/ai-threat-model); diseño de supervisión; evaluación de impacto cuando se dispara | Revisión de diseño como una verificación obligatoria | Modelo de amenaza; referencia FRIA/DPIA | 1 · 3 |
| Datos | Registro de adquisición; base legal; licencia; comprobaciones de calidad y sesgo | [El pipeline rechaza un conjunto de datos sin una ficha de datos válida](/patterns/dataset-admission-gate) | Ficha de datos; linaje | 2 · 3 |
| Construcción | Modelos y plataformas aprobados; prompts versionados, recuperación y herramientas; AIBOM | Comprobaciones de política de CI; lista de modelos permitidos | AIBOM; veredictos de política | 1 · 2 |
| Prueba | Categorías de eval requeridas y umbrales por nivel; red teaming para niveles superiores | Gate de eval | Resultados de eval | 3 |
| Lanzamiento | Paquete de despliegue completo; aprobaciones; avisos de transparencia | El control de admisión lee el registro | Registro de lanzamiento; ficha de modelo | 1 · 2 · 5 |
| Operación | Monitoreo; supervisión; definición de incidente y escala de severidad; registro | Guardrails; alertas; pipeline de incidentes | Trazas; eventos de guardrail; registros de incidentes | 4 · 5 |
| Cambio | Disparadores de cambio material para modelo, prompt, datos y alcance de herramientas | Los gates se re-ejecutan en cambio; bump de versión de registro | Diff; nuevos resultados de eval | 1 · 3 |
| Retirada | Revocar identidades, archivar evidencia, eliminar o retener datos | Estado del registro `retired`; identidad revocada | Registro de desmantelamiento | 2 · 4 · 5 |

Tres etapas a menudo faltan en los conjuntos de políticas. **Operar** necesita una definición de
incidente más amplia que la de la ley. El "incidente grave" de la Reglamento de IA cubre muerte o
daño grave a la salud, perturbación grave e irreversible de infraestructura crítica, infracción de
obligaciones de derechos fundamentales y daño grave a la propiedad o el medio ambiente [16]; la
mayoría de incidentes de los que un programa debe aprender se sitúan por debajo de esa línea (un
lote sesgado, un prompt filtrado, una llamada de herramienta fuera de alcance). Encamina cada
severidad a través de un pipeline y deja que solo la clase superior inicie un reloj estatutario
(capítulo 17,
[Incidentes, problemas y causas raíz](/bok/incidents#a-severity-scale-mapped-to-the-clocks)). Los
responsables del despliegue de alto riesgo también deben informar al proveedor y suspender el uso
cuando tengan razones para considerar que el sistema presenta un riesgo (`Art. 26(5)`) [6].
**Cambio** necesita disparadores, porque una edición de prompt o una nueva fuente de recuperación
puede cambiar el comportamiento tanto como un nuevo modelo. **Retirar** necesita un
[runbook](/patterns/deactivation-localisation-retirement-runbook): NIST pide desmantelamiento seguro
"de una manera que no aumente riesgos" (GOVERN 1.7) [3], lo que significa revocar cada identidad y
credencial, marcar la entrada del registro como retirada, archivar la evidencia para su período de
retención y aplicar reglas de retención a datos de entrenamiento y derivados.

### Política como código: una fuente, dos salidas

La divergencia entre un PDF de política y la comprobación que la hace cumplir es donde los auditores
encuentran sus hallazgos. Escribe cada regla una vez, como datos, y compílala dos veces: en la prosa
que la gente lee y la comprobación que ejecuta el pipeline. La fuente (ilustrativa):

```yaml
id: AIP-07
title: Evaluation before release
owner: ai-governance-committee
effective: 2026-10-01
maps_to: ["EU AI Act Art. 15", "ISO/IEC 42001 A.6", "NIST AI RMF MEASURE"]
rules:
  - rule_id: eval.injection-floor.v4
    applies_to_tiers: [2, 3]
    suite: injection-resistance.v4
    threshold: 0.95
    exceptions: register
```

El compilador de prosa renderiza: "AIP-07.1. Un sistema de IA de nivel 2 o nivel 3 se libera solo si
su última ejecución de `injection-resistance.v4` puntúa al menos 0.95. Las excepciones siguen el
registro de excepciones. Propietario: comité de gobernanza de IA. Efectivo 1 de octubre de 2026." El
compilador de código renderiza la comprobación (ilustrativa `OPA/Rego`):

```rego
package aip07

import rego.v1

deny contains msg if {
  input.system.tier in {2, 3}
  r := input.evals["injection-resistance.v4"]
  r.score < 0.95
  not exception_active(input.system.id, "eval.injection-floor.v4")
  msg := sprintf("AIP-07 eval.injection-floor.v4: %s scored %v, below 0.95", [input.system.id, r.score])
}

exception_active(sys, rule) if {
  some e in data.exceptions
  e.system == sys
  e.rule_id == rule
  time.parse_rfc3339_ns(e.expires) > time.now_ns()
}
```

Ambas salidas provienen de un commit, de modo que la política publicada y la regla aplicada no
pueden estar en desacuerdo. La misma fuente alimenta el
[Framework Crosswalk](/patterns/framework-crosswalk) y, para agentes, una
[Policy Card](/patterns/policy-card). Las pruebas prueban que la regla se dispara en una entrada que
viola y pasa una limpia, como requiere la capa 01.

## Actualizar las políticas que ya tienes

La mayoría de las organizaciones no necesitan una nueva política para cada preocupación de IA.
Necesitan que sus políticas de privacidad, seguridad, gobernanza de datos y propiedad intelectual
vean IA. Una evaluación de brechas encuentra dónde no lo hacen.

1. **Inventaría** cada política que toque sistemas de IA o sus datos, incluida adquisición, RRHH,
   registros y uso aceptable.
2. **Prueba cada una contra los cinco objetos** (modelo, sistema, agente, datos, organización) y las
   etapas del ciclo de vida: ¿nombra el objeto, contiene una regla que se aplica a él, y dice qué
   evidencia muestra que se sigue la regla?
3. **Decide: extender o crear.** Extiende cuando el propietario existente y el control encajan (una
   regla de retención que solo necesita artefactos de modelo añadidos). Crea cuando un nuevo objeto
   necesita un nuevo propietario (la identidad del agente no tiene hogar en una política de control
   de acceso clásica).
4. **Archiva cada brecha como datos** (política, cláusula, brecha, decisión, propietario, fecha de
   vencimiento, evidencia), de modo que el registro de brechas es una consulta y su cierre un KPI.

| Política | Brechas típicas de IA | Adiciones típicas | Evidencia |
|---|---|---|---|
| Privacidad | Base legal para entrenamiento versus inferencia; limitación de propósito en reutilización; qué memorizan los modelos; avisos; derechos sobre modelos y salidas; retención de datos de entrenamiento y derivados | Etiquetas de propósito de conjunto de datos; disparadores de DPIA para IA; procedimiento para [solicitudes de derechos contra modelos](/patterns/rights-requests-against-models) | DPIA; ficha de datos; registro de solicitudes de derechos |
| Seguridad | Inyección de prompts, envenenamiento, extracción de modelos y amenazas de cadena de suministro faltantes en la evaluación de riesgos y playbooks; sin fuentes de modelos confiables | Amenazas de IA en la evaluación de riesgos del ISMS; playbooks de incidentes de IA; lista de modelos y conjuntos de datos permitidos | Modelo de amenaza; resultados de red teaming; lista de permitidos |
| Gobernanza de datos | Linaje sin procedencia; datos raspados, intermediados y sintéticos sin etiquetar; sin retención por capa | Política de adquisición (abajo); campos de procedencia; retención de datos brutos, características, etiquetas y pesos | Ficha de datos; gráfico de linaje |
| Propiedad intelectual | Derechos de entrenamiento y exclusiones de minería de textos y datos; uso de salidas; secretos comerciales en prompts; licencias de peso abierto; indemnidades de proveedores | Revisión de derechos por conjunto de datos; reglas de uso de salidas; reglas de prompts por clase de datos; revisión de licencia de modelo | [Registro de derechos](/patterns/training-data-rights-ledger); registros de licencia |

Tres notas. Para **seguridad**, el catálogo de amenazas para agentes (secuestro de objetivo, mal uso
de herramientas, abuso de identidad y privilegios, agentes deshonestos) es la lista de comprobación
que hay que añadir al modelo de amenazas existente [17]. Para **gobernanza de datos**, mantén clara
una distinción: *linaje* es el camino que los datos recorrieron a través de tus tuberías;
*procedencia* es de dónde vinieron y en qué términos. Un linaje perfecto sobre procedencia
desconocida sigue siendo ungobernado. Para **propiedad intelectual**, la ley de la UE permite a los
titulares de derechos reservar obras de la minería de textos y datos "de manera apropiada, como por
ejemplo por medios legibles por máquina en el caso de contenidos puestos a disposición del público
en línea" (Directiva (UE) 2019/790, art. 4, apartado 3) [18], y los proveedores de modelos de uso
general deben tener una política para identificar y cumplir esas reservas (`Art. 53(1)(c)`) [19].
Los capítulos 19 y 20
([Ley de privacidad y protección de datos aplicada a la IA](/bok/privacy-and-ai#principles-applied-to-ai),
[Otra ley que ya se aplica a la IA](/bok/existing-law#how-to-read-this-chapter)) cubren la ley; el
trabajo de la política es hacer que cada regla sea verificable.

## Una política de adquisición de datos

La mayoría de los fallos de gobernanza de datos se deciden en la adquisición: un raspado que nadie
delimitó, un conjunto de datos de un intermediario sin procedencia, etiquetas producidas en
condiciones que nadie verificó. ISO/IEC 42001 tiene un control en el Anexo A sobre la adquisición de
datos (A.7.3) [2]. La política nombra fuentes aceptables y las condiciones mínimas para cada una, y
convierte cada condición en un campo del registro de adquisición.

| Fuente | Condiciones mínimas | Campo de evidencia |
|---|---|---|
| Datos de primera parte recopilados para otro propósito | Compatibilidad de propósito evaluada; aviso actualizado; EIPD si se activa | Etiqueta de propósito; base legal |
| Raspado web | Fuentes sensibles excluidas; reservas legibles por máquina y archivos de exclusión respetados; lista de exclusión voluntaria honrada; recopilación acotada en tiempo | Hash de configuración del rastreador; versiones de lista de exclusión y exclusión voluntaria |
| Intermediarios de datos y conjuntos de datos licenciados | Cadena de procedencia; garantías de base legal; licencia que cubre entrenamiento de IA; derecho de auditoría; eliminación a solicitud | Id de contrato; declaración de procedencia |
| Datos etiquetados o anotados | Directrices escritas; piloto; acuerdo entre anotadores por encima de un umbral; paga y condiciones estándar; aseguramiento de calidad | Versión de directriz; puntuación de acuerdo; atestación de proveedor |
| Datos compartidos por un socio | Acuerdo que cubre propósito, retención, compartición posterior, seguridad, eliminación, aviso de violación y auditoría | Id de acuerdo |
| Datos sintéticos | Generador y datos semilla registrados; etiquetados como sintéticos; prueba de reidentificación | Versión del generador; resultado de prueba |

La fila de raspado sigue la Opinión 28/2024 de la Junta Europea de Protección de Datos, cuyas
medidas mitigantes incluyen excluir ciertas fuentes y categorías de datos, respetar "archivos
robots.txt o ai.txt o cualquier otro mecanismo reconocido" que se oponga al raspado, y una lista de
exclusión voluntaria gestionada por el responsable [20]. La fila de etiquetado sigue la orientación
de Partnership on AI sobre la obtención de trabajo de enriquecimiento de datos, que cubre selección
de proveedores, pilotos, instrucciones claras, términos de pago, comunicación con trabajadores,
aseguramiento de calidad y desvinculación [21]. Las condiciones de los anotadores son un asunto de
gobernanza: las etiquetas producidas con prisa bajo instrucciones poco claras se convierten en el
ruido y el sesgo que la suite de eval más tarde tiene que encontrar.

Aplica en el límite de la tubería: ningún conjunto de datos entra en una tubería de entrenamiento,
ajuste fino o recuperación sin un registro de adquisición que pase validación de esquema, y el
registro fluye hacia la ficha de datos y el [AIBOM](/patterns/aibom) (ver
[gobernanza de datos en toda la pila](/bok/the-stack#data-governance-across-the-stack)).

## Política de IA de terceros

La mayoría de la IA que una organización ejecuta, la compró. El capítulo 04 explica cómo se degrada
la pila para IA procurada
([IA de terceros y procurada](/bok/the-stack#third-party-and-procured-ai)), y el capítulo 05 da la
[Puerta de Debida Diligencia de Proveedor / Modelo](/patterns/vendor-model-due-diligence-gate).
ISO/IEC 42001 cubre relaciones de terceros y clientes en el Anexo A.10 [2]; NIST pide políticas
sobre riesgo de IA de terceros, incluyendo infracción de propiedad intelectual de terceros, y
procesos de contingencia para fallos en datos o sistemas de terceros de alto riesgo (GOVERN 6.1,
6.2) [3].

**Entrada de adquisición.** Cada solicitud de compra lleva una bandera de IA: ¿el producto usa IA,
procesa nuestros datos con IA, entrena en nuestros datos, actúa en nuestros sistemas, o toma o apoya
decisiones sobre personas? Un sí lo encamina a clasificación. El caso más silencioso es la IA que
llega dentro de un producto ya comprado: una nota de lanzamiento que añade una característica de IA
a un contrato existente activa la misma entrada.

**Clasificación de proveedores.** Clasifica por criticidad, sensibilidad de datos, autonomía y
contexto regulatorio, y escala la evaluación a la clasificación.

| Clasificación | Perfil típico | Evaluación | Reevaluación |
|---|---|---|---|
| 1 | Decisiones sobre personas; uso de alto riesgo; agentes con acceso de escritura; datos de categoría especial | Debida diligencia completa; evals de límite; conjunto de cláusulas completo; aprobación de comité | Anual y en activadores |
| 2 | Productividad interna en datos confidenciales | Cuestionario con evidencia; conjunto de cláusulas estándar | Cada dos años y en activadores |
| 3 | Sin datos confidenciales; sin decisiones sobre personas | Comprobación ligera; cubierta por uso aceptable | En renovación |

**Términos de contrato como controles.** Una cláusula es un control cuando crea algo que puedes
monitorear. La Comisión publica cláusulas de contrato de IA modelo en una versión de alto riesgo y
otra de no alto riesgo, voluntarias y deliberadamente silenciosas sobre PI, pago y protección de
datos; la versión en su página está fechada el 29 de septiembre de 2023 (a partir de 2026-09-24)
[22]. Son una biblioteca de inicio sólida también para compradores privados.

| Cláusula | Control que crea | Evidencia o monitor |
|---|---|---|
| Divulgación de uso de IA y subprocesadores | Completitud del inventario; mapa de cuarta parte | Registro de proveedor; AIBOM suministrado |
| Sin entrenamiento en datos de cliente sin consentimiento | Limitación de propósito | Bandera de contrato; atestación; comprobación de configuración |
| Aviso de cambio material (modelo, versión, comportamiento) | Activador para reevaluación | El aviso inicia una reejecución de eval de límite |
| Ventana de notificación de incidente | Entrada en tu propio reloj de incidente | Marca de tiempo de aviso en la tubería de incidente |
| Derechos de evidencia y auditoría | Evidencia recopilada | Ficha de modelo, resultados de eval y certificados en el almacén de evidencia |
| Deber de prueba de sesgo y remediación | Evidencia de equidad para tu uso | Informes de prueba de proveedor |
| Desactivación, devolución de datos y salida | Un interruptor de parada contractual | Runbook de salida probado |
| Responsabilidad e indemnidad, incluyendo PI | Transferencia de riesgo, no reducción de riesgo | Registro de contrato |

**Cadena de suministro y código abierto.** El modelo de fundación bajo el producto de un proveedor
es una dependencia que heredas; mapea estas cuartas partes. La cadena de valor también puede cambiar
tu rol: bajo `Art. 25`, un distribuidor, importador, responsable del despliegue u otro tercero que
pone su nombre o marca registrada en un sistema de alto riesgo, modifica sustancialmente uno, o
cambia el propósito previsto de un sistema para que se convierta en alto riesgo es tratado como su
proveedor [23]. Los modelos de peso abierto y los conjuntos de datos abiertos pasan por la misma
entrada: licencia y restricciones de uso revisadas, procedencia registrada, artefactos escaneados y
fijados antes de cargar, resultados en el AIBOM. Reevalúa en eventos, no solo en renovación: un
incidente, un cambio de propiedad, una nueva versión de modelo, controversia pública o acción
regulatoria, un cambio en la ley.

**Personas.** La IA utilizada para reclutamiento y selección, promoción o terminación, asignación de
tareas, o monitoreo y evaluación de trabajadores es de alto riesgo bajo el Anexo III punto 4 [24],
con el deber de información del trabajador de `Art. 26(7)` para responsables del despliegue [6]. Los
anotadores, contratistas y revisores externalizados que manejan tus datos son parte de la cadena de
suministro, bajo las condiciones de adquisición anteriores [21].

## Uso aceptable de IA por personal

El glosario define IA en la sombra como IA ejecutándose en producción sin registrarse. El uso de
herramientas no aprobadas por parte del personal es su gemelo cotidiano: un empleado pegando un
archivo de cliente en un chatbot público. Una política de uso aceptable (AUP) cubre herramientas
aprobadas, entradas prohibidas por clase de datos, el deber de revisar salidas, divulgación donde
las salidas llegan a clientes, registro, la atestación requerida antes del acceso y consecuencias
proporcionales.

| Clase de datos | Herramienta de IA pública | Puerta de IA sancionada | Sistema interno aprobado |
|---|---|---|---|
| Público | Permitido | Permitido | Permitido |
| Interno | No permitido | Permitido, registrado | Permitido |
| Datos confidenciales o de cliente | No permitido | Solo casos de uso aprobados; registrado; redactado | Permitido dentro del alcance |
| Datos de categoría especial o regulados | No permitido | Solo con un caso de uso respaldado por EIPD | Permitido dentro del alcance |
| Secretos, credenciales, código restringido | No permitido | No permitido | Por estándar de seguridad |

Aplica con la [puerta](/patterns/sanctioned-ai-gateway), no el manual: herramientas aprobadas detrás
de inicio de sesión único y una puerta que aplica reglas de clase de datos y registra uso; acceso
condicional a una atestación AUP actual (la puerta de alfabetización anterior); descubrimiento de
herramientas no aprobadas a través de datos de identidad, red y gastos (el patrón
[Descubrimiento de IA en la Sombra](/patterns/shadow-ai-discovery)). Cuando el descubrimiento
encuentra una herramienta no aprobada, ofrece una forma de entrar (registrar, clasificar, aprobar o
reemplazar) antes de una sanción. Las personas usan herramientas no aprobadas porque el camino
aprobado es más lento; la solución suele ser un camino mejor.

> **Ejemplo (ilustrativo)**
> Un equipo legal comienza a usar un asistente de redacción público para resúmenes de contratos. El
> descubrimiento marca el tráfico. En lugar de bloquear el dominio, el programa ejecuta la
> herramienta a través de entrada de adquisición, firma un acuerdo empresarial sin entrenamiento en
> datos de cliente, lo encamina a través de la puerta bajo la regla de datos confidenciales, y añade
> un módulo de una página al plan de estudios del equipo legal. El uso se mueve a la ruta sancionada
> dentro de semanas, porque ahora es la más fácil.

**Correspondencias:** Reglamento de IA de la UE `Art. 25` (cadena de valor), `Art. 26` (deberes del
responsable del despliegue), `Art. 53(1)(c)` (política de derechos de autor de GPAI), Anexo III
punto 4 (empleo) · Directiva (UE) 2019/790 `Art. 4(3)` · ISO/IEC 42001 cláusula 5.2; Anexo A.2,
A.7.3, A.10 · NIST AI RMF GOVERN 1, 6; MAP 1, 3; MANAGE 1.1 · capas 1 Gobernanza como Código, 2
Inventario y Transparencia y 5 Aseguramiento y Cumplimiento Continuo.

## Lo que puedes hacer esta semana

1. **Escribe la carta del comité en una página**, listando los cuatro tipos de decisión que solo el
   comité toma y afirmando que las puertas aplican todo lo demás.
2. **Crea el registro de excepciones** como un archivo en el repositorio de políticas, apunta una
   puerta a él y establece una caducidad máxima.
3. **Condiciona una herramienta de la puerta uno al entrenamiento**: haz que el acceso a la consola
   de anulación de tu sistema más arriesgado, o a tu puerta de IA, dependa de un registro de
   entrenamiento actual.
4. **Genera tres indicadores de junta a partir de datos en vivo**: cobertura del registro, IA no
   registrada encontrada y excepciones abiertas por antigüedad.
5. **Ejecuta la evaluación de brechas en dos políticas** (privacidad y seguridad) contra los cinco
   objetos, y registra cada brecha como una fila con un propietario.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(a) strategy for regulatory compliance; Art. 17(1)(m) accountability framework; Art. 17(2) proportionality, as amended by Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (referenced by number only: clauses 5.1–5.3, 7.2–7.3, 9.1–9.3, 10.1–10.2; Annex A.2, A.3.2, A.3.3, A.7.3, A.10). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1, 1.5, 1.7, 2.1–2.3, 3.1, 4.1, 4.3, 5.1, 6.1–6.2; MAP 1.3–1.4, 3.1–3.2; MANAGE 1.1; initial go/no-go decision after MAP). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[5] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance; CFO Act agency AI Governance Boards within 90 days, chaired at Deputy Secretary level, with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per instructions; 26(2) oversight by persons with competence, training and authority; 26(5) monitoring, informing the provider and suspension; 26(7) informing workers' representatives and affected workers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[7] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4 (as amended by Reg. (EU) 2026/1744: providers and deployers "take measures to support the development of AI literacy"; no guaranteed level for any individual; support from the Commission and Member States; Board recommendations; applies since 2 Feb 2025 under Art. 113(a)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4 (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] AI Literacy: Questions & Answers (obligation remains, no specific or "sufficient" level mandated; no certificate needed; internal record of trainings; "other persons" include contractors, service providers and clients; no specific governance structure mandated; instructions for use alone not sufficient; supervision by national market-surveillance authorities from 2 Aug 2026). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (John Lunney, Sue Lueder), in Site Reliability Engineering. Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 87 (Directive (EU) 2019/1937 applies to the reporting of infringements of the AI Act and the protection of reporting persons; applies from 2 Aug 2026 under Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_87 (verified: primary)
[13] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8(1) and 8(3) internal channels for private entities with 50 or more workers; Art. 9(1)(b) acknowledgment within seven days; Art. 9(1)(f) feedback within three months; Art. 19 prohibition of retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[14] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025, a regular-session statute and so in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); Labor Code §§1107–1107.2: "covered employee", no rule preventing disclosure, no retaliation, notice of rights, anonymous internal process for large frontier developers with monthly updates and quarterly sharing with officers and directors). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[15] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3(49) (definition of "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[17] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[18] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(1) text-and-data-mining exception; Art. 4(3) reservation by rightholders, by machine-readable means for content online). Publications Office of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng#art_4 (verified: primary)
[19] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53(1)(c) (GPAI providers' copyright policy, incl. identifying and complying with Art. 4(3) reservations). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[20] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (paras 104–106: web-scraping mitigations incl. excluding sources and data categories, respecting robots.txt or ai.txt, opt-out lists). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en (verified: primary)
[21] Responsible Sourcing of Data Enrichment Services (provider selection, pilots, instructions, payment terms, communication with workers, quality assurance, offboarding). Partnership on AI. 2021-06-16. https://partnershiponai.org/paper/responsible-sourcing-considerations/ (verified: primary)
[22] EU model contractual AI clauses (MCC-AI) to pilot in procurements of AI (high-risk and non-high-risk versions; voluntary; exclude IP, payment and GDPR terms). Public Buyers Community, European Commission. 2023-09-29. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/eu-model-contractual-ai-clauses-pilot-procurements-ai (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25(1) (a value-chain actor becomes the provider when it puts its name or trademark on a high-risk system, makes a substantial modification, or modifies the intended purpose so that the system becomes high-risk). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[24] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 4 (employment, workers' management and access to self-employment: recruitment and selection; decisions on work relationships, task allocation, monitoring and evaluation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
