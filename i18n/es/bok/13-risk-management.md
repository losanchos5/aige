---
lang: es
source: bok/13-risk-management.md
sourceHash: "5d4b19bcfaf479cb81e356f3a4f331c3aaeac3d7bc06c510b84c82a57fa70158"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 13. Dónde se sitúa la gestión de riesgos

> La gestión de riesgos es el bucle que le dice a cada otro control cuán fuerte debe morder:
> identificar, evaluar, tratar y monitorear, ejecutado en las cinco capas y siete flujos de trabajo,
> con el registro de riesgos como evidencia.

## Lo que este capítulo resuelve

El libro se ha apoyado en el riesgo sin darle un hogar. El capítulo 03 dice que cada control debe
[partir de un modo de fallo o daño nombrado](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm);
el capítulo 04 advierte contra una junta de revisión de riesgos que califica hallazgos pero no puede
detener un lanzamiento; el capítulo 08 nombra un "registro de riesgos como código" como el artefacto
detrás de `Art. 9` sin definirlo. Ninguno de ellos dice dónde se toman las decisiones de riesgo, en
qué escala, por quién, o cómo una decisión se convierte en un umbral que una tubería puede hacer
cumplir. Este capítulo lo hace.

La afirmación es breve. La gestión de riesgos no es una sexta capa ni un comité junto al stack. Es
el bucle que establece los parámetros de cada otro control: qué sistemas obtienen qué puertas, cuán
alto se sitúa un umbral de eval, cuándo una persona debe aprobar una acción, y quién puede firmar
por el riesgo que queda. El bucle tiene cuatro pasos (identificar, evaluar, tratar, monitorear).
Cada paso produce un artefacto en una de las cinco capas y es propiedad de uno de los siete flujos
de trabajo del capítulo 06. Su registro de evidencia es el **registro de riesgos**, mantenido como
datos versionados en lugar de como una hoja de cálculo.

Tres contrastes mantienen el alcance honesto (el capítulo 01 tiene el grupo completo).
**La gestión de riesgos empresariales** agrega cada riesgo que una organización ejecuta; la gestión
de riesgos de IA la alimenta, como pide el NIST AI RMF [1]. **La gestión de riesgos de modelos**
valida modelos en la tradición bancaria; en los Estados Unidos su orientación fundadora, SR 11-7,
fue reemplazada el 17 de abril de 2026 por orientación interagencial que adapta la práctica al
perfil de riesgo de modelo, tamaño y complejidad de cada banco [2]. Esta disciplina toma prestada la
adaptación y añade agentes, control en tiempo de ejecución y evidencia continua.
**La investigación de seguridad de IA** pregunta si una capacidad es peligrosa en principio; este
capítulo decide qué puede hacer un despliegue, y lo prueba.

## Riesgo, definido para ingenieros

Dos definiciones anclan el capítulo. El Reglamento de IA de la UE define **riesgo** como "la
combinación de la probabilidad de que ocurra un daño y la gravedad de ese daño" [3]. El NIST AI RMF
usa la misma forma, "la medida compuesta de la probabilidad de que ocurra un evento y la magnitud o
grado de las consecuencias", y permite que esas consecuencias sean positivas o negativas [1]. Este
libro funciona en el lado negativo: daño a las personas, a sus derechos, a la organización y a los
sistemas que la rodean. El vocabulario compartido proviene de la familia de normas ISO de riesgo,
cuyo estándar de vocabulario actual es ISO 31073:2022; reemplazó a ISO Guide 73:2009, que ahora está
retirada [4].

Cada término a continuación tiene un artefacto que lo sostiene; esa es la prueba de que un término
funciona.

| Término | Significado en este libro | Dónde vive |
|---|---|---|
| **Fuente de riesgo** | Cualquier cosa que pueda dar lugar a riesgo: un conjunto de datos, una concesión de herramienta, un adversario, un grupo de usuarios | Registro `source`; AIBOM; modelo de amenaza |
| **Riesgo inherente** | La calificación antes de que se cuente ningún control | Registro `inherent` |
| **Riesgo residual** | La calificación después de los controles que tienen evidencia de funcionar | Registro `residual` |
| **Apetito de riesgo** | Cuánto riesgo, y de qué tipos, la organización está preparada para asumir para sus objetivos | Archivo de datos de apetito (capa 01) |
| **Tolerancia al riesgo** | Cuánto de un riesgo dado la organización soportará para alcanzar un objetivo; el límite que una puerta hace cumplir | Umbrales de nivel (capa 01) |
| **Tratamiento** | La opción elegida (evitar, mitigar, transferir, aceptar) y los controles que la llevan | Registro `treatment`; ids de control |
| **Aceptación** | Una decisión nombrada, firmada y que vence para llevar un riesgo residual | Registro de aceptación (capa 05) |

La IA hace que cada uno de estos sea más difícil de precisar. NIST enumera por qué: componentes de
terceros, riesgos emergentes, sin métricas acordadas, calificaciones que cambian a lo largo del
ciclo de vida, resultados de laboratorio que difieren de la producción, opacidad y sin línea de base
humana [1]. Así que cada calificación es provisional, recomputada a partir de evidencia (un
resultado de eval, una señal de telemetría, un incidente), no re-argumentada en una reunión.

## El bucle: identificar, evaluar, tratar, monitorear

ISO 31000:2018 da el proceso genérico: comunicar y consultar; establecer alcance, contexto y
criterios; evaluar (identificar, analizar, evaluar); tratar; monitorear y revisar; registrar e
informar [5]. La edición 2018 es actual pero marcada para revisión, con un sucesor en etapa de
borrador de comité a partir de 2026-09-24 [5]. ISO/IEC 23894:2023 es la orientación específica de IA
para organizaciones que desarrollan, producen, despliegan o usan IA, personalizable a cualquier
organización y contexto [6]. Sus cláusulas siguen la estructura ISO 31000, como muestra el cruce de
NIST entre los dos [7].

El Reglamento de IA de la UE convierte el mismo bucle en ley para sistemas de alto riesgo. El
artículo 9 requiere que un sistema de gestión de riesgos sea "establecido, implementado, documentado
y mantenido", ejecutado como un proceso iterativo continuo a lo largo del ciclo de vida, con cuatro
pasos: identificar y analizar los riesgos conocidos y razonablemente previsibles para la salud, la
seguridad o los derechos fundamentales; estimar y evaluar los riesgos bajo el uso previsto y el uso
indebido razonablemente previsible; evaluar riesgos adicionales a partir de datos de vigilancia
poscomercialización; y adoptar medidas de gestión de riesgos específicas [8]. El Omnibus Digital
dejó el artículo 9 sin enmendar [9]; para sistemas del Anexo III se aplica desde el 2 de diciembre
de 2027 [10]. Vincula al proveedor; el responsable del despliegue ejecuta su propio bucle a través
de `Art. 26`} monitoreo y, donde se aplica, la {`Art. 27`} FRIA (capítulo 08). Una lectura legal del
artículo 9, escrita contra la propuesta de 2021, es una guía útil para lo que cada paso pide [11].
Ninguna norma armonizada para la gestión de riesgos de IA está aún citada en el Diario Oficial [12];
el borrador que respondería al artículo 9, prEN 18228, se rastrea en
[el programa JTC 21](/bok/principles-and-standards#the-jtc-21-programme) (capítulo 22).

Los cuatro pasos comprimen las actividades de ISO: **identificar** cubre alcance, contexto,
criterios e identificación; **evaluar** cubre análisis y evaluación; **monitorear** cubre revisión,
registro e informe. La comunicación y consulta se ejecuta a través de los cuatro, aquí como mapeo de
partes interesadas.

| Paso | Cláusula ISO/IEC 23894 (por cruce de NIST) | NIST AI RMF | Reglamento de IA de la UE `Art. 9` | Artefacto primario |
|---|---|---|---|---|
| **Identificar** | 6.3 alcance, contexto, criterios; 6.4.2 identificación | MAP 1–5; GOVERN 5 | 9(2)(a) | Perfil de riesgo de caso de uso; mapa de partes interesadas; entrada de registro |
| **Evaluar** | 6.4.3 análisis; resto de 6.4 | MAP 5.1; MEASURE 1–2 | 9(2)(b) | Calificación de matriz; resultados de eval como evidencia de probabilidad |
| **Tratar** | 6.5 tratamiento | MANAGE 1–3 | 9(2)(d); 9(5) | Controles vinculados al riesgo; registro de aceptación |
| **Monitorear** | 6.6 monitoreo y revisión; 6.7 registro e informe | MEASURE 3–4; MANAGE 4 | 9(2)(c) | Re-calificación de telemetría; enlaces de incidentes; registro de revisión |

### El bucle en las cinco capas

El bucle no añade una capa. Le da a cada capa existente un trabajo de riesgo, y cada trabajo deja un
registro de evidencia que la capa anterior puede leer.

| Capa | Su trabajo de riesgo | Artefacto de riesgo | Registro de evidencia |
|---|---|---|---|
| **01 Govern-as-Code** | Sostiene apetito, tolerancia, escalas y reglas de nivel como datos; bloquea lo que las excede | `appetite.yaml`; política de puerta | Veredicto de política que cita el id de riesgo y la banda |
| **02 Inventory & Transparency** | Da a cada riesgo un objeto: id de registro, propietario, nivel, partes interesadas afectadas | Entrada de registro; perfil de riesgo de caso de uso; AIBOM | Registro de registro con nivel e ids de riesgo vinculados |
| **03 Evals & Red Teaming as Evidence** | Mide probabilidad; encuentra riesgos que nadie enumeró | Suites de eval con umbrales establecidos por nivel; hallazgos de equipo rojo | Resultado de eval archivado contra el riesgo y la versión |
| **04 Runtime Controls & Observability** | Trata en tiempo de ejecución; detecta un riesgo que se hace real | Guardrails; puertas de bucle humano; identidad con alcance; interruptor de circuito | Eventos de guardrail; registros de aprobación; trazas |
| **05 Assurance & Continuous Compliance** | Registra, re-califica e informa; sostiene aceptaciones | Registro de riesgos como datos; registros de aceptación; enlaces de incidentes | Historial de registro; aceptaciones firmadas; registro de revisión |

La evidencia fluye hacia arriba, como en todas partes en el stack. Una calificación residual es una
afirmación de que un control funciona; es creíble solo si el id del control se resuelve en un
veredicto de política, resultado de eval o evento de guardrail del período de revisión actual. Una
calificación residual cuyo control no tiene evidencia es riesgo inherente con una etiqueta mejor.

### El bucle en los siete flujos de trabajo

Cada flujo de trabajo del capítulo 06 posee parte del bucle; el propietario del sistema permanece
responsable de cada riesgo de principio a fin.

| Flujo de trabajo | Paso de riesgo | Lo que produce |
|---|---|---|
| [Ingesta y clasificación](/bok/the-role#intake-and-classification) | Identificar | Perfil de riesgo de caso de uso; nivel; primeras entradas de registro; mapa de partes interesadas |
| [Inventario y registro](/bok/the-role#inventory-and-registry) | Identificar | Id de registro, propietario y nivel para cada riesgo; sistemas no registrados como riesgo no evaluado |
| [Evals y equipo rojo como evidencia](/bok/the-role#evals-and-red-teaming-as-evidence) | Evaluar | Evidencia de probabilidad; nuevos riesgos de hallazgos de equipo rojo |
| [Política como código y puertas](/bok/the-role#policy-as-code-and-gates) | Tratar | Apetito compilado en reglas de puerta; despliegue denegado en riesgo residual no aceptado |
| [Monitoreo en tiempo de ejecución e incidentes](/bok/the-role#runtime-monitoring-and-incidents) | Tratar, monitorear | Controles en tiempo de ejecución; señales que re-califican riesgos; enlaces de incidentes |
| [Aseguramiento y evidencia de auditoría](/bok/the-role#assurance-and-audit-evidence) | Monitorear | El registro como evidencia; registros de aceptación y revisión; informes |
| [Traducción regulatoria](/bok/the-role#regulatory-translation) | Identificar, tratar | Obligaciones como fuentes de riesgo y como tratamientos requeridos |

## NIST AI RMF e ISO/IEC 23894 en el stack

El NIST AI RMF 1.0 divide el trabajo de riesgo en cuatro funciones, cada una desglosada en
categorías y subcategorías. GOVERN se aplica en todo el proceso; MAP, MEASURE y MANAGE se aplican
por sistema y por etapa del ciclo de vida [1]. El capítulo 08 mapea las funciones a capas; la tabla
a continuación desciende a las 19 categorías y las subcategorías en las que se basa este capítulo
(parafraseadas; los ids son de NIST; la columna de capa es la lectura ilustrativa de este libro). El
capítulo 22 recorre
[las 19 categorías del NIST AI RMF](/bok/principles-and-standards#the-core-19-categories) en su
totalidad.

| Categoría | Subcategorías que este capítulo usa | Capa | Artefacto |
|---|---|---|---|
| GOVERN 1 | 1.3 nivel de actividad de riesgo establecido por tolerancia al riesgo; 1.5 frecuencia de revisión; 1.6 inventario | 1 · 2 | Datos de apetito; reglas de nivel; registro |
| GOVERN 2 | 2.1 roles y líneas de comunicación; 2.3 liderazgo ejecutivo posee decisiones de riesgo de IA | 1 · 5 | Tabla de autoridad de aceptación; RACI |
| GOVERN 3 | 3.2 roles para configuraciones humano-IA y supervisión | 1 · 4 | Diseño de supervisión; configuración de puerta de aprobación |
| GOVERN 4 | 4.2 equipos documentan riesgos e impactos; 4.3 pruebas, identificación de incidentes, intercambio de información | 3 · 5 | Registro; canalización de incidentes |
| GOVERN 5 | 5.1 retroalimentación de personas fuera del equipo; 5.2 retroalimentación adjudicada en el diseño | 2 | Mapa de partes interesadas; canal de retroalimentación |
| GOVERN 6 | 6.1 políticas de terceros; 6.2 contingencia para fallos en sistemas de terceros de alto riesgo | 2 · 5 | Puerta de diligencia debida; AIBOM |
| MAP 1 | 1.1 finalidad prevista y contexto; 1.5 tolerancias de riesgo determinadas y documentadas | 1 · 2 | Perfil de riesgo del caso de uso; datos de apetito |
| MAP 2 | 2.1 tarea y método; 2.2 límites del conocimiento y supervisión humana | 2 | Tier; ficha de modelo |
| MAP 3 | 3.2 costes de errores frente a tolerancia de riesgo; 3.5 procesos de supervisión humana | 2 · 3 | Nota de beneficio y coste; resultados de referencia |
| MAP 4 | 4.1 riesgos de componentes y legales; 4.2 controles internos por componente | 2 | Riesgos vinculados a AIBOM |
| MAP 5 | 5.1 probabilidad y magnitud de cada impacto; 5.2 participación regular | 2 · 3 | Calificaciones de matriz; registro de partes interesadas |
| MEASURE 1 | 1.1 riesgos más significativos medidos primero, los no medidos documentados; 1.3 evaluadores independientes | 3 | Plan de eval por riesgo |
| MEASURE 2 | 2.6 riesgo negativo residual dentro de la tolerancia, falla de forma segura; 2.7 seguridad; 2.11 equidad | 3 | Resultados de eval; hallazgos de red team |
| MEASURE 3 | 3.1 riesgos existentes, imprevistos y emergentes; 3.3 retroalimentación del usuario y apelación | 4 · 5 | Revaluación de telemetría; canal de retroalimentación |
| MEASURE 4 | 4.3 mejoras o declives a partir de datos de campo | 3 · 5 | Revisión de cobertura de suite |
| MANAGE 1 | 1.1 adelante o no adelante; 1.2 priorizar por impacto, probabilidad, recursos; 1.3 mitigar, transferir, evitar o aceptar; 1.4 riesgos residuales documentados | 1 · 5 | Decisión de gate; tratamiento de registro; registro de aceptación |
| MANAGE 2 | 2.1 alternativas no basadas en IA ponderadas; 2.3 respuesta a un riesgo previamente desconocido; 2.4 sustituir, desvincularse o desactivar | 4 | Registro de sustitución; kill switch |
| MANAGE 3 | 3.1 riesgos de terceros monitoreados; 3.2 modelos preentrenados monitoreados | 2 · 4 | Reevaluación de proveedor; monitoreo de drift |
| MANAGE 4 | 4.1 planes de monitoreo posterior al despliegue; 4.3 incidentes comunicados | 4 · 5 | Plan de monitoreo; canalización de incidentes |

El AI RMF también ofrece **perfiles**: un perfil actual de cómo se gestiona el riesgo hoy, un perfil
objetivo de los resultados deseados, y la brecha entre ellos como plan de acción [1]. La matriz de
adaptación más adelante en este capítulo hace el mismo movimiento.

### ISO 31000, ISO/IEC 23894 e ISO/IEC 42001

Tres documentos ISO, tres trabajos. ISO 31000 es orientación genérica para cualquier riesgo [5];
ISO/IEC 23894 la aplica a IA [6]; ISO/IEC 42001 es el estándar de sistema de gestión certificable,
cuyas cláusulas sobre evaluación de riesgo de IA (6.1.2), tratamiento de riesgo de IA (6.1.3) e
impacto del sistema de IA (6.1.4), y su operación (8.2 a 8.4), requieren que el bucle exista y
funcione [13]. El crosswalk de NIST muestra que sus funciones y las cláusulas 23894 describen un
proceso [7].

| Función AI RMF | Cláusulas ISO/IEC 23894 en el crosswalk de NIST | Capa |
|---|---|---|
| GOVERN | 5.2 liderazgo y compromiso; 5.3 integración; 5.4 diseño (5.4.1 a 5.4.5: contexto, compromiso, roles, recursos, comunicación) | 1 · 2 |
| MAP | 5.4.1 contexto; 6.3.2 a 6.3.4 alcance, contexto y criterios de riesgo; 6.4.2 identificación (6.4.2.3 fuentes de riesgo, 6.4.2.4 eventos y resultados, 6.4.2.6 consecuencias); 6.4.3 análisis; 5.7 mejora; 6.7 | 2 · 3 |
| MEASURE | 6.3.4 criterios de riesgo; 6.4.2.5 identificación de controles; 6.4.3.2 consecuencias; 6.4.3.3 probabilidad; 6.6 monitoreo y revisión; 6.7 | 3 |
| MANAGE | 5.5 implementación; 5.7 mejora; 6.5 tratamiento (6.5.2 opciones, 6.5.3 planes); 6.6; 6.7 | 4 · 5 |

El crosswalk de NIST fue un borrador de enero de 2023 para comentarios, mapeado contra el borrador
final de 23894 [7]; verifica los números de cláusula contra el texto publicado de 2023 antes de
citarlos en una auditoría (verifica).

> **Nota** Un crosswalk es un índice, no un control (véase el patrón
> [Framework Crosswalk](/patterns/framework-crosswalk)). La fila que cuenta es aquella cuyo
> artefacto existe y emite evidencia.

## Identificación de riesgo: fuentes, factores y partes interesadas

La identificación es donde el trabajo de riesgo falla silenciosamente: un registro escrito en un
taller lista lo que la sala pensó, y el resto permanece invisible hasta que un incidente lo nombra.
Ingeniarlo significa una lista sistemática de fuentes, factores contribuyentes capturados como
datos, partes interesadas mapeadas en lugar de asumidas, y una ruta de entrada que ningún sistema
puede saltarse en su camino a producción.

### Fuentes de riesgo internas y externas

Una fuente **interna** se sitúa dentro del control de la organización: datos, decisiones de diseño,
personas, procesos. Una fuente **externa** surge fuera de él: proveedores, adversarios, usuarios, el
contexto operativo, reguladores, la sociedad. La división predice el tratamiento. Las fuentes
internas a menudo pueden ser eliminadas o sustituidas por diseño; las externas principalmente tienen
que ser diseñadas para resistirlas y monitoreadas.

| Fuente | Interna o externa | Riesgos típicos | Identificado por (artefacto, capa) |
|---|---|---|---|
| Datos de entrenamiento, ajuste fino y recuperación | Interna (externa cuando se compra) | Sesgo; fuga de datos personales; corpus envenenado; conocimiento obsoleto | Ficha de datos, linaje (2); pruebas de datos (3) |
| Elección y configuración del modelo | Interno | Capacidad más allá de la necesidad; opacidad; confabulación | Ficha de modelo (2); evals de capacidad (3) |
| Diseño del sistema: prompts, herramientas, autonomía | Interno | Mal uso de herramientas; agencia excesiva; secuestro de objetivos | Alcance del registro (2); modelo de amenaza; red team (3) |
| Personas y proceso | Interno | Sesgo de automatización; sistemas sin dueño; cambio sin revisión | Métricas de supervisión (4); propiedad del registro (2) |
| Incentivos organizacionales | Interno | Umbrales ajustados para enviar; gates enrutados alrededor | Tasa de bypass de gate (1); auditoría (5) |
| Modelos, APIs y componentes de terceros | Externa | Actualizaciones silenciosas del modelo; datos de entrenamiento no divulgados; interrupción | Due-diligence gate, AIBOM (2); evals de límite (3) |
| Adversarios | Externa | Inyección de prompts; exfiltración de datos; extracción de modelo | Suite de red team (3); guardrails (4) |
| Usuarios y mal uso razonablemente previsible | Externa | Uso fuera de la finalidad prevista; confianza excesiva | Registro de finalidad prevista (2); evals de mal uso (3) |
| Contexto operativo | Externa | Drift de datos; nuevas poblaciones; cambios estacionales | Telemetría de drift (4) |
| Ley y reguladores | Externa | Nueva obligación; fecha movida; prioridad de aplicación | Traducción regulatoria (1); crosswalk |
| Personas afectadas y sociedad | Externa | Impacto en derechos; discriminación; pérdida de confianza | FRIA o DPIA (1 · 2); mapa de partes interesadas |

Dos filas llevan una nota legal. El **mal uso razonablemente previsible** del Reglamento de IA es el
uso fuera de la finalidad prevista que "puede resultar de comportamiento humano razonablemente
previsible o interacción con otros sistemas, incluidos otros sistemas de IA" [3]: el mal uso por
usuarios y por otros agentes está en el alcance, no es una excusa. Y NIST advierte que el riesgo de
terceros proviene tanto del componente como de cómo se utiliza, y que las métricas del desarrollador
y el responsable del despliegue pueden no coincidir [1]. El capítulo 14 convierte el mal uso
previsible en entradas de diseño
([mal uso razonablemente previsible](/bok/governing-development#reasonably-foreseeable-misuse)). Los
catálogos encuentran brechas; no son un registro. NIST AI 600-1 nombra 12 riesgos únicos o agravados
por IA generativa y sugiere agruparlos como técnicos o de modelo, mal uso por humanos, y ecosistema
o societal [14]. El Top 10 de OWASP para Aplicaciones Agentes cubre amenazas de agentes como
secuestro de objetivos, mal uso de herramientas y abuso de privilegios [15]. El Repositorio de
Riesgo de IA del MIT consolida 1.725 riesgos de 74 marcos y encuentra que las decisiones humanas
causan casi tantos riesgos de IA (38%) como los sistemas de IA mismos (42%) [16]: un registro que
lista solo modos de fallo del modelo se pierde una gran parte de lo que sale mal.

### Factores contribuyentes y el perfil de riesgo del caso de uso

Un **factor contribuyente** no crea un riesgo por sí solo; mueve la probabilidad, la gravedad o
ambas. NIST da mayor prioridad inicial donde los datos de entrenamiento son sensibles o personales o
los resultados afectan directamente a las personas, y cuenta la personalización del responsable del
despliegue como un factor [1]. El artículo 9 pide a los proveedores que consideren a personas
menores de 18 años y otros grupos vulnerables [8]. Captura factores como campos del registro en
[intake](/patterns/use-case-intake-risk-tiering) y deja que una política calcule el tier.

| Factor | Mueve | Campo de perfil |
|---|---|---|
| Autonomía: sugiere, redacta, actúa después de revisión, actúa solo | Probabilidad y gravedad | `autonomy` |
| Impacto de la decisión: ninguno, informa, decide sobre una persona | Gravedad | `decision_impact` |
| Exposición: usuarios internos, clientes, el público; volumen diario | Probabilidad | `exposure`, `volume_per_day` |
| Reversibilidad del peor resultado | Gravedad | `reversibility` |
| Grupos vulnerables afectados: menores, pacientes, solicitantes | Gravedad | `vulnerable_groups` |
| Sensibilidad de datos: personal, categoría especial, confidencial | Gravedad | `data_class` |
| Opacidad y novedad de la técnica | Probabilidad, y confianza en la calificación | `explainability`, `novel_technique` |
| Dependencia de terceros | Probabilidad | `supplier_ids` |
| Personalización del responsable del despliegue (para proveedores) | Probabilidad | `customisation` |

El tier se calcula, no se negocia. Un propietario del sistema que no está de acuerdo con el tier
cambia un factor con evidencia, en una solicitud de extracción revisada, y el tier sigue.

> **Ejemplo (ilustrativo)** RRHH propone un asistente de selección de CV. Su perfil lee
> `decision_impact: decides-about-person`, `exposure: public-applicants`,
> `autonomy: filters, a recruiter sees only the shortlist`, `data_class: personal`. La regla de tier
> lo coloca en tier 3 antes de cualquier reunión. El gate entonces pide evals de equidad y robustez,
> un enlace DPIA y una aceptación firmada para cualquier riesgo residual por encima de Bajo. Si
> también es un sistema de IA de alto riesgo bajo el Reglamento de IA es una pregunta separada para
> la ruta Annex III (capítulo 08).

### Mapeo de partes interesadas

Diferentes actores ven diferentes riesgos. Un desarrollador que libera un modelo preentrenado puede
tener una perspectiva de riesgo diferente del responsable del despliegue que lo utiliza, y las
personas dañadas no siempre son usuarios directos [1]. El AI RMF construye esto en GOVERN 5.1, MAP
1.2 y MEASURE 1.3, que pide que las comunidades afectadas sean consultadas según lo requiera la
tolerancia de riesgo [1]. Para responsables del despliegue de ciertos sistemas de alto riesgo, la
FRIA lo convierte en ley: nombra las categorías de personas probables de ser afectadas y los riesgos
específicos de daño para ellas [17]. ISO llama al mismo paso "comunicar y consultar" [5].

| Parte interesada | Cómo su vista entra en el bucle | Evidencia |
|---|---|---|
| Usuarios directos (operadores, clientes) | Pruebas de usabilidad; retroalimentación en el producto | Elementos de retroalimentación vinculados a ids de riesgo |
| No usuarios afectados (solicitantes, pacientes, el público) | Consulta; FRIA; quejas | Registro FRIA; enlaces de quejas |
| Responsables del despliegue posteriores (para proveedores) | Instrucciones de uso; informes del responsable del despliegue | Problemas reportados por el responsable del despliegue |
| Proveedores anteriores (para responsables del despliegue) | Diligencia debida; avisos de cambio | Evidencia del proveedor en el AIBOM |
| Funciones internas (legal, privacidad, seguridad, riesgo, auditoría) | Revisión en intake; desafío de segunda línea | Registros de revisión |
| Reguladores y autoridades | Obligaciones mapeadas; rutas de reporte | Crosswalk; canalización de incidentes |
| Ejecutivos y el órgano de gobierno | Declaración de apetito; informes de riesgo | Apetito aprobado; aceptaciones |

El resultado no es un póster. Es una lista de partes interesadas en la entrada del registro, un
campo `affected` en cada riesgo del registro, y un registro de quién fue consultado, cuándo y con
qué resultado.

## Evaluación de riesgo: la matriz de probabilidad por gravedad

Una matriz de riesgos convierte dos juicios en una banda que desencadena una respuesta. Su valor es
la consistencia, no la precisión: dos evaluadores que califiquen un escenario deberían caer en la
misma celda, y la celda debería decidir la misma compuerta cada vez. IEC 31010:2019 cataloga otras
técnicas de evaluación de riesgos para cuando una matriz no es suficiente [18].

### Escalas definidas

Sin definiciones compartidas, los evaluadores pueden dar calificaciones opuestas al mismo riesgo
[19]. Ancla la probabilidad a evidencia que puedas leer (tasas de fallo de evals, telemetría,
incidentes) y la gravedad a la peor consecuencia creíble de una ocurrencia. Los umbrales son
ilustrativos; calibra los tuyos a tus volúmenes.

| Nivel | Probabilidad | Definición (por sistema, en producción) | Evidencia que la establece |
|---|---|---|---|
| L1 | Rara | No se espera en la vida del sistema | Un equipo rojo dirigido no puede reproducirla |
| L2 | Improbable | Podría ocurrir aproximadamente una vez al año | Reproducida solo por un conjunto de pruebas adversariales dedicado |
| L3 | Posible | Se espera algunas veces al año | Tasa de fallo de regresión o del equipo rojo por debajo del 1% |
| L4 | Probable | Se espera mensualmente | Tasa de fallo del 1% al 5%, o casi fallos en telemetría |
| L5 | Casi segura | Se espera semanalmente o más | Tasa de fallo superior al 5%, o ya vista en producción |

| Nivel | Gravedad | Peor consecuencia creíble de una ocurrencia |
|---|---|---|
| S1 | Insignificante | Inconveniente; completamente reversible; los derechos de nadie se ven afectados |
| S2 | Menor | Daño limitado y reversible a pocas personas o una pequeña pérdida; reparado en un día |
| S3 | Moderada | Daño material a individuos (una denegación injusta, datos de una persona expuestos); reversible con esfuerzo |
| S4 | Mayor | Daño significativo a muchas personas o a derechos fundamentales; difícil de revertir |
| S5 | Catastrófica | Muerte o daño grave a la salud; interrupción grave e irreversible de infraestructura crítica; daño grave a la propiedad o el medio ambiente; infracción generalizada de derechos fundamentales |

S4 y S5 juntas cubren las cuatro categorías de un **incidente grave** bajo el Reglamento de IA [3],
así que un riesgo calificado allí es un candidato a incidente reportable el día que se materializa.
El [atlas de daños](/resources/harms) proporciona una taxonomía de daños por nivel, con registros de
incidentes reales, para calibrar la columna de gravedad.
### La matriz y qué desencadena cada banda

| Gravedad / probabilidad | L1 Rara | L2 Improbable | L3 Posible | L4 Probable | L5 Casi segura |
|---|---|---|---|---|---|
| **S5 Catastrófica** | Crítica (anulación) | Crítica (anulación) | Crítica (anulación) | Crítica (anulación) | Crítica (anulación) |
| **S4 Mayor** | Medio | Alto | Alto | Crítica | Crítica |
| **S3 Moderada** | Bajo | Medio | Alto | Alto | Crítica |
| **S2 Menor** | Bajo | Bajo | Medio | Medio | Alto |
| **S1 Insignificante** | Bajo | Bajo | Bajo | Medio | Medio |

Una banda es útil solo si cambia lo que hace la canalización. La política más adelante en este
capítulo compila estas consecuencias ilustrativas.

| Banda | Tratamiento mínimo | Compuerta | Quién puede aceptar el riesgo residual | Revisión |
|---|---|---|---|---|
| **Baja** | Monitorear | Entrada de registro y propietario | Propietario del sistema | Anualmente o en caso de cambio |
| **Media** | Al menos un control de ingeniería con evidencia | Compuerta de eval en el riesgo vinculado | Propietario del producto | Cada seis meses |
| **Alta** | Controles de ingeniería más detección en tiempo de ejecución; una persona decide dónde las consecuencias llegan a una persona | Compuerta de eval y guardrail en tiempo de ejecución; despliegue denegado sin una aceptación actual | Comité de riesgos, segunda línea consultada | Trimestral |
| **Crítica** | Eliminar o sustituir; la ingeniería sola no la despliega | Despliegue denegado | Órgano de gobierno, o nadie | Mensualmente mientras esté abierta |

### La anulación de gravedad catastrófica

Multiplicar probabilidad por gravedad oculta la cola. Una cuadrícula puede dar a una catástrofe rara
la banda de una molestia frecuente, y donde la frecuencia y la gravedad están correlacionadas
negativamente (la forma del riesgo catastrófico) las matrices pueden ser "peor que inútiles" [19].
Así que S5 funciona en su propia pista:

1. **La banda ignora la probabilidad.** Cualquier escenario S5 es Crítico. Su probabilidad se
   registra, porque guía el monitoreo, pero no reduce la banda.
2. **El equipo no puede aceptarla.** El tratamiento debe eliminar el escenario o reducir su
   gravedad, generalmente eliminando una capacidad, una acción o una exposición. De lo contrario,
   solo el órgano de gobierno puede aceptarla, explícita y por un período fijo.
3. **El daño presente significa parar.** Donde impactos negativos significativos son inminentes,
   daños graves están ocurriendo o riesgos catastróficos están presentes, NIST dice que el
   desarrollo y despliegue "deberían cesar de manera segura hasta que los riesgos puedan ser
   suficientemente gestionados" [1]. El kill switch probado es el mecanismo.
4. **La frontera usa la misma lógica.** Bajo el Código de Prácticas GPAI, los signatarios definen
   niveles de riesgo sistémico (u otros criterios de aceptación), los aplican con márgenes de
   seguridad y, si el riesgo sistémico no es aceptable, no ponen el modelo a disposición, o lo
   restringen, retiran o recuperan [20].

La mayoría de los controles reducen la probabilidad; solo un cambio de diseño reduce la gravedad. La
anulación fuerza esa conversación de diseño en lugar de permitir que los controles de probabilidad
hablen de una catástrofe a Medio.

### Lo que una matriz no puede decirte

Cox nombra cuatro límites: pobre resolución, errores de calificación, sin base para asignar
recursos, e inputs y outputs ambiguos [19]. Las respuestas son procedimentales:

- **Mantén los números detrás de la celda** (tasa de fallo de eval, volumen, estimación del peor
  caso) para que la banda pueda ser recomputada. La celda es una vista de los datos, no los datos.
- **Nunca sumes o promedies celdas.** Prioriza por banda, luego gravedad, luego costo del
  tratamiento; MANAGE 1.2 prioriza por impacto, probabilidad y recursos disponibles [1].
- **Lee la probabilidad basada en eval como un límite inferior.** Un eval está limitado por muestreo
  y detecta regresiones, no novedad
  ([los límites de la compuerta de eval](/bok/definition#the-limits-of-the-eval-gate)).

Para sistemas de alto riesgo la ley apunta de la misma manera: las pruebas se ejecutan contra
"métricas previamente definidas y umbrales probabilísticos" apropiados para la finalidad prevista
[8]. Una escala de probabilidad escrita como umbrales que una canalización puede verificar es
exactamente eso.

## Apetito de riesgo y tolerancia, compilados en compuertas

NIST no prescribe una tolerancia de riesgo. Define la tolerancia como la "disposición a asumir el
riesgo para lograr sus objetivos", la llama contextual y cambiante, dice a las organizaciones que
sigan las reglas del sector o definan una tolerancia razonable donde no exista, y pide que las
tolerancias se documenten (MAP 1.5) y establezcan el nivel de esfuerzo de gestión de riesgos (GOVERN
1.3) [1]. Una declaración de apetito que vive solo en un paquete de junta no cambia nada que una
canalización haga. Compílala.

### De la declaración a los datos

> **Ejemplo (ilustrativo)** Una declaración de apetito como la podría aprobar un órgano de gobierno:
> "Usamos IA para hacer más rápidos a empleados y clientes. Aceptamos riesgo moderado en
> herramientas internas y en soporte de decisiones donde una persona revisa cada resultado, para que
> aprendamos rápidamente. Aceptamos solo riesgo residual bajo en sistemas que deciden sobre una
> persona o actúan en su nombre. Ningún agente mueve dinero por encima de una cantidad establecida
> sin la decisión de una persona. Llevamos riesgo catastrófico solo con la aceptación explícita del
> órgano de gobierno, por un período fijo. Ningún riesgo se acepta indefinidamente."

Cada oración se convierte en un valor en un archivo versionado que las compuertas leen. El archivo
es la versión ejecutada; la declaración es su documentación.

```yaml
# appetite.yaml (illustrative, not a claim of conformity)
version: 2026-09-24
approved_by: governing-body
tolerance:                     # highest residual band carried without escalation
  tier-1-internal: medium
  tier-2-decision-support: medium
  tier-3-decision-about-a-person: low
  tier-4-agentic-or-high-stakes: low
acceptance_authority:          # who may sign each residual band
  low: system-owner
  medium: product-owner
  high: risk-committee
  critical: governing-body
max_acceptance_days: {low: 365, medium: 180, high: 90, critical: 30}
eval_floor:                    # likelihood evidence required per tier
  tier-3-decision-about-a-person: {robustness: 0.95, subgroup_parity: 0.90}
  tier-4-agentic-or-high-stakes: {injection_resistance: 0.95, tool_scope_adherence: 0.99}
human_approval_above_eur: 250  # enforced at runtime by the approval gate
catastrophic_override: true    # severity 5: eliminate, or governing-body acceptance
```

| Cláusula de declaración | Compilada en | Capa | Evidencia |
|---|---|---|---|
| "riesgo moderado en herramientas internas y en soporte de decisiones" | `tolerance` para niveles 1 y 2: `medium` | 01 | Veredicto de compuerta |
| "solo riesgo residual bajo en sistemas que deciden sobre una persona o actúan en su nombre" | `tolerance` para niveles 3 y 4: `low`; `eval_floor` | 01 · 03 | Veredicto de compuerta; resultado de eval |
| "Ningún agente mueve dinero por encima de una cantidad establecida sin la decisión de una persona" | `human_approval_above_eur` | 04 | Registro de aprobación |
| "riesgo catastrófico solo con la aceptación explícita del órgano de gobierno" | Regla de anulación; `critical: governing-body` | 01 · 05 | Aceptación firmada |
| "Ningún riesgo se acepta indefinidamente" | `max_acceptance_days` | 05 | Expiración de aceptación |

### De los datos a una compuerta

La compuerta se ejecuta en despliegue (capa 01) sobre la entrada del registro (capa 02), los riesgos
abiertos del sistema (capa 05) y sus últimos resultados de eval (capa 03). Su veredicto nombra el id
de riesgo, así que la evidencia dice qué riesgo detuvo qué lanzamiento.

```
package risk.gate

import rego.v1

# Illustrative, not a claim of conformity. data.appetite is appetite.yaml;
# input holds the registry entry, the system's open risks and its eval results.

rank := {"low": 1, "medium": 2, "high": 3, "critical": 4}

tier := input.system.tier

deny contains "system has no known tier in the registry" if {
	not data.appetite.tolerance[tier]
}

# Residual above the tier's tolerance needs a current acceptance by the
# authority that the residual band requires.
deny contains msg if {
	some r in input.risks
	rank[r.residual.band] > rank[data.appetite.tolerance[tier]]
	not valid_acceptance(r, data.appetite.acceptance_authority[r.residual.band])
	msg := sprintf("%s: residual %s above %s tolerance, no valid acceptance", [r.id, r.residual.band, tier])
}

# Catastrophic-severity override: likelihood plays no part.
deny contains msg if {
	some r in input.risks
	r.residual.severity == 5
	not valid_acceptance(r, "governing-body")
	msg := sprintf("%s: severity 5 needs elimination or governing-body acceptance", [r.id])
}

# Eval floors by tier: missing evidence fails like bad evidence.
deny contains msg if {
	some metric, floor in data.appetite.eval_floor[tier]
	not input.evals[metric] >= floor
	msg := sprintf("%s: eval %s below the %s floor", [input.system.id, metric, tier])
}

valid_acceptance(r, role) if {
	r.acceptance.role == role
	time.parse_ns("2006-01-02", r.acceptance.expires) > time.now_ns()
}
```

Dos detalles importan más que la sintaxis. Un resultado de eval faltante falla como uno bajo, así
que "no lo medimos" nunca es un pase. Una aceptación expirada cuenta como ninguna, así que el
calendario ejecuta la revisión. Como cada política de capa 01 se envía con una fixture que debe ser
denegada y una que debe pasar ([Capa 01](/bok/the-stack#layer-01-govern-as-code)).

## Tratar el riesgo: la jerarquía de mitigación

NIST enumera las opciones de respuesta como mitigación, transferencia, evitación o aceptación [1];
el orden en que las alcanzas importa más. La seguridad ocupacional clasifica los controles por
efectividad (eliminación, sustitución, ingeniería, administrativa, luego equipo de protección) y
advierte contra confiar en la última cuando existen opciones mejores [21]. El Reglamento de IA
establece el mismo orden para sistemas de alto riesgo: eliminar o reducir el riesgo mediante el
diseño en la medida técnicamente viable, luego medidas de mitigación y control, luego información y,
cuando sea apropiado, capacitación para responsables del despliegue [8]. NIST añade que se deben
sopesar alternativas no basadas en IA (MANAGE 2.1) [1].

| Escalón | Qué significa para IA | Control de stack | Patrón | Evidencia |
|---|---|---|---|---|
| **1 Eliminar** | No lo construyas; elimina la capacidad; rechaza el uso | Veredicto de denegación de política; lista de bloqueo de uso prohibido; herramienta nunca otorgada | [Policy Card](/patterns/policy-card) | Veredicto de denegación; alcance ausente en el registro |
| **2 Sustituir** | Mismo objetivo, menor riesgo: un método no basado en IA, un modelo más simple o interpretable, recuperación sobre generación libre, solo lectura en lugar de escritura | Registro de diseño; alcance de registro más estrecho | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | Decisión de diseño vinculada al id de riesgo |
| **3 Ingenierizar** | Controles que actúan sin depender de que alguien recuerde | Compuerta de eval; guardrail en tiempo de ejecución; compuerta de aprobación; kill switch | [Eval Gate in CI](/patterns/eval-gate-in-ci), [Runtime Guardrail](/patterns/runtime-guardrail), [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate), [Kill Switch](/patterns/kill-switch-circuit-breaker) | Resultados de eval; eventos de guardrail; registros de aprobación |
| **4 Administrativa** | Reglas para personas: instrucciones de uso, capacitación, procedimientos, advertencias | Instrucciones de uso; registros de alfabetización y capacitación | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Atestaciones de capacitación; instrucciones versionadas |
| **5 Aceptar y monitorear** | Llevar lo que queda, conscientemente, y observarlo | Aceptación firmada; telemetría; fecha de revisión | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Registro de aceptación; señal de monitoreo |

La eliminación tiene un piso legal: las prácticas que el Reglamento de IA prohíbe se eliminan, nunca
se tratan o aceptan [22]. **Transferencia** (seguros, indemnidades contractuales) se sitúa al lado
de la escalera, no en ella: mueve la consecuencia financiera, no el daño a la persona al otro
extremo de la decisión, así que nunca reemplaza los escalones uno a cuatro donde las personas pueden
ser dañadas.

Cuatro reglas convierten la escalera en práctica:

- **Trabaja de arriba hacia abajo, y escribe por qué.** El registro registra qué escalones
  superiores fueron considerados y por qué eran inviables; un tratamiento que comienza en el escalón
  cuatro sin ese registro falla la revisión.
- **Los controles de ingeniería cuentan solo con evidencia.** Un guardrail que nunca se activó en
  una prueba, o un kill switch nunca ejercitado, es como mucho el escalón cuatro.
- **Los controles administrativos solos no mueven una banda Alta.** Los revisores tienden a
  confirmar el resultado de máquinas confiables; la supervisión tiene que diseñarse y medirse
  ([diseñar supervisión humana](/bok/the-stack#designing-human-oversight-article-14)).
- **Cada peldaño deja un residual.** La escalera termina en aceptación, nunca en "resuelto".

> **En la práctica (ilustrativo)**
> El primer diseño de `csa-01`, el asistente de servicio al cliente del capítulo 04, le dio una
> herramienta que emitía reembolsos. Intake clasificó el escenario "una instrucción inyectada hace
> que el agente reembolse la cantidad o cuenta incorrecta" en L4 y S3: Alto. El equipo recorrió la
> escalera. Eliminar reembolsos habría eliminado el caso de uso. Sustituir un alcance de solo
> lectura, con el agente redactando un reembolso que una persona emite, cortó el camino al evento.
> Los controles de ingeniería (un guardrail de inyección, una puerta de eval de resistencia a
> inyección, el paso de aprobación) redujeron aún más la probabilidad. El residual resultó en L2 y
> S3, Medio, aceptado por el propietario del producto durante seis meses, nulo si la puntuación de
> eval caía por debajo de su piso. El alcance de reembolso de solo lectura en la entrada del
> registro del capítulo 04 es esa decisión, como datos.

## Riesgo inherente, riesgo residual y quién lo acepta

**Riesgo inherente** es la clasificación antes de que se cuente ningún control. **Riesgo residual**
es el "riesgo que permanece después del tratamiento del riesgo", en la definición derivada de ISO
que NIST adopta [1]. La brecha entre ellos es el valor reclamado para los controles; una brecha
grande que descansa en un control es un punto único de fallo que merece su propia prueba.

Tres textos hacen del riesgo residual un resultado de primera clase. El artículo 9 requiere que "el
riesgo residual relevante asociado con cada peligro, así como el riesgo residual general" se juzgue
aceptable [8]. MEASURE 2.6 pide que el riesgo negativo residual se mantenga dentro de la tolerancia
y el sistema falle de forma segura, y MANAGE 1.4 que los riesgos residuales para los adquirentes
posteriores y usuarios finales se documenten [1]. Así que una clasificación residual es también un
artefacto de transparencia: pertenece a las limitaciones de la ficha de modelo y a las instrucciones
de uso, no solo al registro.

Una regla lo mantiene honesto:
**una clasificación residual acredita solo controles cuyos ids se resuelven en evidencia del período de revisión actual.**
Si la eval no se ha ejecutado desde que el modelo cambió, el residual revierte hacia la
clasificación inherente hasta que lo haga.

### Quién puede aceptar

La aceptación es una decisión con un nombre. El Modelo de Tres Líneas del Instituto de Auditores
Internos da una división común de responsabilidades: la primera línea proporciona el producto y
gestiona su riesgo; la segunda línea proporciona experiencia, apoyo, monitoreo y desafío sobre
riesgo; la auditoría interna proporciona garantía independiente; el órgano de gobierno establece la
dirección [23]. El AI RMF añade que el liderazgo ejecutivo asume la responsabilidad de las
decisiones sobre riesgo de IA (GOVERN 2.3) [1].
[El capítulo 12](/bok/governance-program#risk-acceptance-and-exceptions) cubre comités y derechos de
decisión; la tabla siguiente es la parte que una puerta puede hacer cumplir.

| Banda residual | Acepta | Consultado (desafío) | Período máximo | Registro |
|---|---|---|---|---|
| **Baja** | Propietario del sistema | Ninguno requerido | 12 meses | Entrada del registro |
| **Media** | Propietario del producto | Riesgo de segunda línea | Seis meses | Aceptación firmada con una condición de nulidad |
| **Alta** | Comité de riesgos | Segunda línea; legal y privacidad donde hay derechos involucrados | Tres meses | Aceptación firmada con justificación y condiciones |
| **Crítico o S5** | Órgano de gobierno, o nadie | Segunda línea; revisión independiente | Un mes, renovado solo con nueva evidencia | Acta de la decisión vinculada al id de riesgo |

Un registro de aceptación lleva la persona y rol, la justificación, las condiciones que lo anulan
(una señal de monitoreo y su umbral), la fecha y la expiración. Cada residual es aceptado por la
autoridad que su banda nombra; la puerta bloquea solo cuando la banda está por encima de la
tolerancia del nivel y no existe una aceptación válida. Por encima de Medio, el aceptante debe estar
al menos un nivel por encima del equipo cuya fecha de entrega depende de la respuesta.

> **Antipatrón** "Aceptado" como un estado sin nombre, sin fecha y sin expiración. El registro se
> llena de riesgos que nadie eligió asumir, y el primer incidente revela que la aceptación era un
> valor predeterminado de hoja de cálculo.

## El registro de riesgos como registro de evidencia

El capítulo 08 nombra un "registro de riesgos como código" como el artefacto detrás de `Art. 9`} e
ISO/IEC 23894; esta sección lo define. El registro es el registro de evidencia de la capa 05 de todo
el bucle: un archivo versionado por riesgo, clave a un id de registro, cada referencia de control
resolviéndose a un artefacto que emite evidencia, cada cambio revisado como código. Responde al
"documentado" del artículo 9 y es donde un auditor comienza. Su forma estándar más cercana es el
plan de acción e hitos (`POA&M`}) en la capa de evaluación de OSCAL [24], a la cual un registro
puede exportar sus tratamientos abiertos. Un JSON Schema para
[una entrada de registro de riesgos](/resources/templates#schema-risk-register-entry), con un
ejemplo completo, está en la página de plantillas.
### Esquema del registro

```yaml
# risk-register/csa-01/R-017.yaml (illustrative, not a claim of conformity)
id: R-017
system: csa-01                        # registry id (layer 02)
title: Injected instruction leads to a wrong refund
scenario:
  cause: instruction hidden in a customer message reaches the refund workflow
  event: a refund is proposed and issued for the wrong amount or account
  consequence: financial loss; customer harm; possible fraud report
source: {origin: external, category: adversary}
affected: [customers, finance-operations]
factors: {autonomy: drafts, exposure: public, reversibility: partial}
inherent: {likelihood: 4, severity: 3, band: high}
treatment:
  option: mitigate
  rung: substitute+engineer
  higher_rungs_considered: "eliminate rejected (refunds are the use case); substitute adopted (read-only scope)"
  controls:
    - scope.refunds.read-only           # registry scope (layer 02)
    - guardrail.input.injection.v3      # runtime guardrail (layer 04)
    - eval.injection-resistance.v4      # eval gate (layer 03)
    - approval.refund-issue             # human decision (layer 04)
residual: {likelihood: 2, severity: 3, band: medium}
owner: team-support-platform
acceptance:
  by: head-of-support-products
  role: product-owner
  date: 2026-09-18
  expires: 2027-03-17
  voided_if: "injection-resistance below 0.95, or approval override rate above 2%"
review: {cadence: semiannual, last: 2026-09-18, next: 2027-03-17}
rerate_on: [model-version-change, new-tool-grant, linked-incident, eval-regression]
links:
  evals: [injection-resistance.v4@csa-01@2026-09-18]
  incidents: []
  obligations: ["ISO/IEC 42001 6.1.3", "NIST AI RMF MANAGE 1.3"]
status: open
```

Tres campos hacen lo que una hoja de cálculo no puede. `treatment.controls` se resuelve en
artefactos que emiten evidencia, `treatment.higher_rungs_considered` prueba que la jerarquía fue
aplicada, y `acceptance.voided_if` permite que la telemetría termine una aceptación sin esperar una
reunión.

### Operación del registro

- **Cadencia por banda, desencadenantes por evento.** La tabla de banda establece el calendario;
  `rerate_on` lo anula, forzando una re-clasificación antes de la siguiente versión.
- **Los cambios llegan como solicitudes de extracción,** con la evidencia en el diff, un revisor de
  segunda línea para Alto y superior, e historial de solo anexión.
- **La puerta lo lee,** así que un residual no aceptado por encima de la tolerancia bloquea la
  versión con el id de riesgo en el veredicto.
- **Los enlaces van en ambas direcciones.** Una falla de eval abre o re-clasifica un riesgo; un
  incidente se vincula a su riesgo, y el riesgo enumera sus evals e incidentes.
- **Mide el registro, no su tamaño:** residuales Alto y Crítico abiertos, aceptaciones expiradas,
  tiempo desde identificar un riesgo hasta un control en una puerta, y la proporción de
  clasificaciones residuales respaldadas por evidencia fresca
  ([métricas por nivel](/bok/maturity-model#metrics-per-level)).

> **En la práctica (ilustrativo)**
> Una función de gobernanza movió su registro de una hoja de cálculo al repositorio que contiene sus
> políticas, un archivo por riesgo clave a ids de registro, y apuntó la puerta de despliegue a él.
> La primera ejecución bloqueó dos versiones por la misma razón: riesgos aceptados sin aceptante
> nombrado y sin expiración. Nadie había decidido asumirlos; la hoja de cálculo lo había hecho.
> Dentro de un trimestre cada riesgo Alto abierto tenía una aceptación firmada y que expiraba o un
> control cuya evidencia la puerta podía leer.

## Gobernanza proporcional: adaptación del bucle

El bucle es igual en todas partes; su intensidad no. El AI RMF establece el nivel de actividad de
riesgo por tolerancia de riesgo (GOVERN 1.3) [1]. El Reglamento de IA de la UE ha requerido desde
2024 que el sistema de gestión de la calidad de un proveedor de alto riesgo sea proporcional al
tamaño de su organización, mientras que los proveedores "respeten el grado de rigor y el nivel de
protección requerido" [27]. El Omnibus Digital añade "en particular, si el proveedor es una PYME,
incluida una start-up, o una empresa mediana", y abre el formulario de documentación técnica
simplificada, hasta entonces limitado a PYMES y start-ups, a pequeñas empresas medianas [9]. Los
supervisores bancarios estadounidenses ahora adaptan la gestión del riesgo del modelo al perfil,
tamaño y complejidad [2]. La proporcionalidad reduce el costo del bucle, nunca la protección debida
a las personas del otro lado.

### La matriz de adaptación

Seis factores establecen la intensidad. Para cada uno, la matriz da controles mínimos, puertas e
intensidad de revisión. Lee cada fila como un piso; donde se aplican dos filas, la más estricta
gana.

| Factor | Perfil | Controles mínimos | Puertas | Intensidad de revisión |
|---|---|---|---|---|
| **Tamaño** | Equipo de uno, start-up o PYME | Registro en el repo; apetito como un archivo de datos; escalas publicadas | Negar sistemas no registrados y Críticos abiertos | En cambio; apetito anual |
| | Tamaño medio, varios equipos de producto | Registro clave al registro; autoridades de aceptación; mapas de partes interesadas del nivel 3 | Banda contra tolerancia del nivel; puerta de eval del nivel 2 | Trimestral; desafío de segunda línea para Alto |
| | Empresa federada | Apetito central, tolerancias locales; registro consolidado en riesgo empresarial | Las puertas locales heredan una biblioteca de políticas compartida | Comité mensual para Alto y Crítico; muestreo de auditoría |
| **Sector** | Comercial general | Las filas siguientes, nada extra | Como niveles | Como niveles |
| | Regulado (finanzas, salud, infraestructura crítica, sector público) | Campos de superposición sectorial (abajo); validación independiente para niveles 3 y 4 | Evidencia sectorial antes del despliegue | Como el régimen espera, nunca menos que niveles |
| **Madurez** (capítulo 07) | Nivel 1 a 2 | El registro existe y está clave a ids de registro | Negar sistemas no registrados | Revisiones de calendario |
| | Nivel 3 | Los resultados de eval rellenan la probabilidad | Informe de riesgo en CI, no bloqueante | Revisión en cada versión |
| | Nivel 4 a 5 | Bandas compiladas en puertas; telemetría re-clasifica | Negar en residual no aceptado; las aceptaciones se anulan a sí mismas | Impulsado por eventos más calendario |
| **Productos y servicios** | Nivel 1: herramienta interna | Entrada del registro, propietario, reglas de uso aceptable | Puerta del registro | Anual |
| | Nivel 2: apoyo a la decisión, una persona revisa cada resultado | Más evals de capacidad y mal uso; métricas de supervisión | Gate de eval | Cada seis meses |
| | Nivel 3: decisión automatizada sobre una persona | Más evals de equidad y robustez; FRIA o DPIA donde sea requerido; un [canal de contestación](/patterns/decision-notice-contest-path) | Puerta de eval; sin despliegue sin aceptación en Alto | Trimestral |
| | Nivel 4: agéntico con acceso de escritura, o apuestas altas en tiempo real | Más puertas de aprobación; identidad con alcance; kill switch probado; guardrails en tiempo de ejecución | Más cumplimiento en tiempo de ejecución | Mensual e impulsado por eventos |
| **Objetivos** | Liderado por innovación | Niveles 1 y 2 en sandbox con tolerancia más amplia; piso sin cambios | Puertas de sandbox aparte de producción | Frecuente, ligero |
| | Adverso al riesgo | Tolerancias más bajas; aceptación un nivel más alto | Pisos de eval más altos | Más pesado, menos frecuente |
| | Impulsado por misión (servicio público, salud) | Consulta del grupo afectado desde el nivel 3 | Puerta de evaluación de impacto | Incluye entrada del grupo afectado |
| **Tolerancia al riesgo** | Bajo | Tolerancia `low` del nivel 2; pisos de eval más altos | Negar más, aceptar más arriba | Períodos de aceptación más cortos |
| | Más alto | Tolerancia `medium` para niveles 1 y 2 | Como niveles | Como niveles; la anulación S5 sin cambios |

Un equipo de uno no debería intentar ejecutar todo esto: comienza desde el corte vertical delgado
del capítulo 04
([el stack mínimo viable](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one)) más el
registro y una puerta, y añade filas a medida que la organización y su exposición crecen.

### Superposiciones sectoriales

NIST dice a las organizaciones que sigan los criterios de riesgo, tolerancias y respuestas que su
sector ya establece [1]. Una superposición añade campos de registro y puertas, no un segundo
registro.

| Sector | Régimen existente para integrar | Lo que añade al bucle |
|---|---|---|
| Banca y finanzas | Orientación de gestión del riesgo del modelo; en los EE.UU., SR 26-2 (17 de abril de 2026), que sustituyó a SR 11-7 y es más relevante para organizaciones bancarias por encima de USD 30 mil millones en activos totales [2] | Validación independiente antes del uso e inventario de modelos con calificaciones de riesgo, como en la tradición de riesgo de modelos; intensidad adaptada al tamaño y la complejidad |
| Dispositivos médicos y salud | ISO 14971:2019, gestión de riesgos para dispositivos médicos [25]; la ruta del Anexo I del Reglamento de IA, con deberes de alto riesgo para sistemas integrados desde el 2 de agosto de 2028 [10] | Registro basado en peligros; evaluación beneficio-riesgo; vigilancia poscomercialización que alimenta la recalificación |
| Industrial y crítico para la seguridad | Práctica de seguridad funcional; ISO/IEC TR 5469:2024 sobre IA dentro de funciones relacionadas con la seguridad y funciones no relacionadas con la IA que mantienen seguro el equipo controlado por IA [26] | Requisitos de seguridad por función; funciones de seguridad no relacionadas con la IA como controles de nivel tres |
| Sector público | Deber FRIA cuando organismos regidos por derecho público, o entidades privadas que prestan servicios públicos, despliegan sistemas de alto riesgo [17] | Mapeo obligatorio de grupos afectados; mecanismos de reclamación y disposiciones de gobernanza interna como tratamientos |

### El piso que no se adapta

Algunos controles son iguales en cada tamaño, en cada sector y en cada nivel de madurez:

- Todo sistema de IA en producción tiene una entrada de registro, un propietario y un nivel.
- Las prácticas prohibidas se eliminan, nunca se tratan ni se aceptan [22].
- Todo escenario S5 ejecuta la anulación de severidad catastrófica.
- Todo riesgo aceptado tiene un aceptador designado, una condición de nulidad y una fecha de
  vencimiento.
- Todo incidente se vincula a un riesgo, existente o nuevo.
- Todo agente que actúa tiene su propia identidad y un kill switch probado.

## Riesgo, madurez e incidentes

### Práctica de riesgo por nivel de madurez

La práctica de riesgo no es una sexta fila en el modelo de madurez; es una lente sobre las cinco
capas, y la regla de capa más débil del capítulo 07 también se aplica a ella
([los cinco niveles](/bok/maturity-model#the-five-levels)).

| Nivel | Práctica de riesgo que puedes mostrar | Evidencia |
|---|---|---|
| **1 Documentado** | Un registro mantenido a mano; una declaración de apetito; escalas definidas | El archivo de registro; escalas aprobadas |
| **2 Inventariado** | Todo riesgo vinculado a un id de registro; sistemas no registrados marcados como riesgo no evaluado | La unión entre registro e inventario; informe de descubrimiento |
| **3 Probado** | Las calificaciones de probabilidad citan resultados de eval; los hallazgos de red team abren nuevos riesgos | Ids de eval en enlaces de registro |
| **4 Aplicado** | Las tolerancias se compilan en puertas; una aceptación vencida bloquea el despliegue | Veredictos de puerta que citan ids de riesgo |
| **5 Continuo** | La telemetría recalifica riesgos; las aceptaciones se anulan a sí mismas cuando su condición falla | Historial de calificación impulsado por señales de tiempo de ejecución |

### Los incidentes son riesgos realizados

Un incidente es un riesgo que se materializó, o uno que nadie identificó. Si coincide con una
entrada de registro, es evidencia de probabilidad: la calificación se recomputa y, si la condición
de nulidad se activó, la aceptación caduca. Si no coincide con nada, abre una nueva entrada, la
respuesta del AI RMF a un riesgo previamente desconocido (MANAGE 2.3) [1], y pregunta por qué la
identificación de intake lo pasó por alto.

La escala de severidad conecta las dos. Porque S4 y S5 cubren las categorías de incidente grave del
Reglamento de IA [3], una entrada calificada allí ya nombra la ruta de notificación, y el
[Incident Pipeline](/patterns/incident-pipeline) puede iniciar el reloj `Art. 73` desde el id de
riesgo (plazos en [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)). El artículo 9 cierra
el bucle desde el otro lado: los riesgos que surgen de datos de vigilancia poscomercialización se
evalúan en el sistema de gestión de riesgos [8]. MANAGE 4.3 añade que los incidentes se comunican a
los actores de IA relevantes, incluidas las comunidades afectadas [1].
[El capítulo 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) cubre el ciclo
de vida del incidente; este capítulo es propietario del vínculo.

Dos medidas muestran si el vínculo funciona. La **tasa de acierto de identificación** es la
proporción de incidentes que coincidieron con un riesgo preexistente; una tasa baja significa que
intake pierde fuentes. El **retraso de recalificación** es el tiempo desde un incidente hasta la
calificación recomputada; un retraso largo significa que el registro registra el pasado.

**Correspondencias:** Reglamento de IA de la UE `Art. 9` (sistema de gestión de riesgos),
`Art. 17(2)` (proporcionalidad), `Art. 26`, `Art. 27` (FRIA), `Art. 72`, `Art. 73` · ISO 31000 ·
ISO/IEC 23894 · ISO/IEC 42001 (6.1.2, 6.1.3, 8.2, 8.3) · NIST AI RMF (Govern, Map, Measure, Manage)
· OWASP Agentic ASI01–ASI10 · las cinco capas del stack. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Publica las escalas.** Escribe definiciones de probabilidad y severidad de cinco niveles para
   tu contexto, con S5 alineado con las categorías de incidente grave y la anulación de severidad
   catastrófica declarada. Una página, versionada junto a tus políticas.
2. **Compila una línea de apetito.** Pon tolerancia por nivel en un archivo de datos y haz que una
   puerta de despliegue lo lea: deniega cuando un sistema lleva un Critical abierto o un residual no
   aceptado por encima de su nivel.
3. **Vincula el registro al inventario.** Para tus tres sistemas de nivel más alto, mueve sus
   riesgos principales a archivos vinculados a ids de inventario, cada uno con calificaciones
   inherentes y residuales, controles que se resuelven en evidencia, un propietario y una fecha de
   vencimiento.
4. **Encuentra los huérfanos.** Lista todo riesgo aceptado sin aceptador designado o sin fecha de
   vencimiento, e todo incidente del último trimestre sin riesgo vinculado. Ambas listas son el
   trabajo pendiente del próximo mes.
5. **Mapea los stakeholders de un sistema.** Para el sistema con la exposición más amplia, nombra
   los no usuarios afectados y escribe cómo su vista llega al registro.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (§1.1 risk; §1.2.2 risk tolerance; §1.2.3 prioritisation, "cease in a safe manner", residual risk; Core tables 1 to 4; §6 profiles). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[2] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC, FDIC; supersedes SR 11-7 and SR 21-8; tailored to risk profile, size and complexity; most relevant above USD 30 billion in assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (points 2 "risk", 13 "reasonably foreseeable misuse", 49 "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[4] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[5] ISO 31000:2018, Risk management: Guidelines (stage 90.92, to be revised; ISO/CD 31000 under development as of 2026-09-24). ISO/TC 262. 2018-02. https://www.iso.org/standard/65694.html (verified: primary)
[6] ISO/IEC 23894:2023, Artificial intelligence: Guidance on risk management. ISO/IEC JTC 1/SC 42. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[7] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (draft for comment; function to clause mapping). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2) steps; 9(5) residual risk and order of measures; 9(8) "prior defined metrics and probabilistic thresholds"; 9(9) minors and vulnerable groups). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[9] Regulation (EU) 2026/1744, Digital Omnibus on AI (Art. 9 not amended; Art. 1 point (10): Art. 11(1) simplified technical-documentation form extended to SMCs; Art. 1 point (11): Art. 17(2) replaced to name SMEs, start-ups and SMCs). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] "AI Omnibus enters into force" (Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[11] Risk management in the Artificial Intelligence Act (J. Schuett; Art. 9 of the 2021 proposal; Eur. J. Risk Regul. 15 (2024) 367-385). arXiv 2212.03109. 2024. https://arxiv.org/abs/2212.03109 (verified: primary)
[12] CEN-CENELEC JTC 21 standards tracker (no harmonised standard cited in the OJ). CEN-CENELEC JTC 21 (via kla.digital). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[13] ISO/IEC 42001:2023, Artificial intelligence: Management system (6.1.2 AI risk assessment, 6.1.3 AI risk treatment, 6.1.4 AI system impact assessment; 8.2 to 8.4). ISO/IEC JTC 1/SC 42. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[14] Generative Artificial Intelligence Profile, NIST AI 600-1 (12 GAI risks; grouping in footnote 5). NIST. 2024-07. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (verified: primary)
[15] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[16] The AI Risk Repository (v3; 74 frameworks, 1,725 risks; human decisions 38%, AI systems 42%) (arXiv 2408.12622). P. Slattery et al., MIT. 2026-05-05. https://arxiv.org/abs/2408.12622 (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA: who performs it; elements (a) to (f)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[18] IEC 31010:2019, Risk management: Risk assessment techniques. IEC / ISO/TC 262. 2019-06. https://www.iso.org/standard/72140.html (verified: primary)
[19] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[20] GPAI Code of Practice, Safety and Security chapter, Commitment 4 (systemic risk acceptance determination; Measure 4.2). code-of-practice.ai. 2025-07-10. https://code-of-practice.ai/?section=safety-security (verified: secondary)
[21] Hierarchy of Controls. CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[22] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5 (prohibited AI practices, as amended by the Digital Omnibus, Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[23] The IIA's Three Lines Model: an update of the Three Lines of Defense. The Institute of Internal Auditors. 2020-09-08. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[24] OSCAL native model (assessment layer incl. POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[25] ISO 14971:2019, Medical devices: Application of risk management to medical devices. ISO/TC 210. 2019-12. https://www.iso.org/standard/72704.html (verified: primary)
[26] ISO/IEC TR 5469:2024, Artificial intelligence: Functional safety and AI systems. ISO/IEC JTC 1/SC 42. 2024-01. https://www.iso.org/standard/81283.html (verified: primary)
[27] Regulation (EU) 2024/1689 (AI Act), text as published in the Official Journal (OJ L, 12.7.2024), Art. 17(2) (quality management system proportionate to the size of the provider's organisation; providers "shall, in any event, respect the degree of rigour and the level of protection required"). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#art_17 (verified: primary)
