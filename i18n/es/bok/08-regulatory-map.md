---
lang: es
source: bok/08-regulatory-map.md
sourceHash: "2d5c814e952facf7e41ebe981ae7a6527a4503f20516c8d52387badff54b53e5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 08. Mapa regulatorio (obligación → artefacto → capa)

> Este capítulo es el índice inverso de cada línea "Maps to" en el libro: para cada obligación
> nombra el artefacto de ingeniería que la satisface o apoya y la capa de stack donde vive el
> artefacto.

Cada otro capítulo mapea *hacia adelante*: una capacidad, luego las obligaciones que toca. Este
capítulo mapea *hacia atrás*: una obligación, luego el artefacto y la capa que la responden. La
unidad del mapa es una fila: una obligación, el artefacto de ingeniería que produce la evidencia
para ella, y una de las cinco capas de stack (capítulo 04):
**1 Gobernanza como código · 2 Inventario & Transparencia · 3 Evals & Red Teaming como evidencia · 4 Controles en tiempo de ejecución & Observabilidad · 5 Aseguramiento & Cumplimiento continuo**.
El mapa es un crosswalk para encontrar el artefacto que responde una pregunta, no un certificado que
el artefacto te hace cumplidor. Indexa primero los instrumentos específicos de IA y luego la
protección de datos, ciberseguridad, responsabilidad, consumidor y ley sectorial que un sistema de
IA encuentra el primer día, para que cada fila del [registro de obligaciones](/obligations) se
resuelva en una tabla en este capítulo. El capítulo 19 enseña las filas de protección de datos en su
[mapa de obligación a artefacto](/bok/privacy-and-ai#obligation-to-artefact-map), y el capítulo 20
la [otra ley que ya se aplica a la IA](/bok/existing-law) (derechos de autor, antidiscriminación,
protección del consumidor y responsabilidad del producto).

## Cómo leer este mapa

Lee cada fila como una oración: *esta obligación es respondida por este artefacto, que vive en esta
capa*. Tres advertencias aplican en todo.

- **Los mapeos son ilustrativos, no una afirmación de conformidad.** Ningún artefacto en este libro
  garantiza cumplimiento, y ningún estándar citado aquí confiere una presunción de conformidad (ver
  "Qué NO está armonizado aún"). Un artefacto *apoya* y *evidencia* una obligación; el juicio legal
  de conformidad permanece con abogados, organismos notificados y autoridades.
- **Las fechas son las fechas posteriores al Omnibus.** Cada fecha del Reglamento de IA de la UE a
  continuación refleja el Reglamento (UE) 2026/1744, el Omnibus Digital sobre IA, de 8 de julio de
  2026 (DO L, 24 de julio de 2026), en vigor 27 de julio de 2026 [1][2][22]. Donde el Omnibus movió
  una fecha, se muestra la fecha movida; donde no, la fila lo dice.
- **La autoridad competente difiere por régimen.** Para IA de uso general (GPAI) el supervisor es la
  **Oficina de IA**, y las multas de GPAI son decisiones formales de la Comisión bajo el Artículo
  101 [3][4]. Para sistemas de alto riesgo los supervisores son
  **autoridades nacionales de vigilancia del mercado**, cuyas sanciones corren bajo el Artículo 99
  [4]. Los Estados miembros eligen la suya; España, por ejemplo, estableció una agencia dedicada,
  **AESIA** (Agencia Española de Supervisión de Inteligencia Artificial), cuyo estatuto fue aprobado
  por Real Decreto 729/2023 [52]. El mapa establece la autoridad por fila para que el lector sepa
  quién pregunta.

## Reglamento de IA de la UE, post-Omnibus Digital

Para un recorrido didáctico del Reglamento antes de que este índice inverso lo mapee (ámbito de
aplicación, la escala de riesgos, los roles de la cadena de valor, los deberes del responsable del
despliegue, la aplicación y la cronología completa post-Omnibus Digital), consulta
[el capítulo 18](/bok/eu-ai-act), que recorre el Reglamento de principio a fin.

Las obligaciones de alto riesgo (artículos 9–15, 17, 25, 26, 27, 49, 71, 72, 73) se aplican a los
sistemas del Anexo III a partir del **2 de diciembre de 2027** y a los sistemas integrados del Anexo
I a partir del **2 de agosto de 2028**, ambos aplazados por el Omnibus Digital desde el 2 de agosto
de 2026 y el 2 de agosto de 2027 respectivamente [1][2]. El `Art. 113(c)` modificado aplaza el
Capítulo III, Secciones 1 a 3: clasificación, los requisitos de los artículos 8 a 15 y los deberes
de los proveedores, responsables del despliegue y otros operadores en los artículos 16 a 27 [22].
Los deberes de alto riesgo que se encuentran en otros lugares (evaluación de la conformidad, la
declaración, el marcado CE y el registro en los artículos 43 a 49 y 71, la vigilancia
poscomercialización e informes de incidentes en los artículos 72, 73 y 75(1a), y el derecho a la
explicación en el artículo 86) pertenecen a capítulos que formalmente se aplican desde el 2 de
agosto de 2026, pero solo tienen trabajo que hacer una vez que un sistema se clasifica como de alto
riesgo, por lo que el mapa los data por la fecha de clasificación. Esta es la lectura de este mapa;
confírmalo con asesoramiento legal (verifica) [22][63]. Los artículos 26(11), 27, 49, 71 y 86 se
refieren solo a sistemas del Anexo III, por lo que la fecha del 2 de agosto de 2028 no les afecta.
Las obligaciones de IA de uso general (artículos 53, 55) se han aplicado desde el 2 de agosto de
2025, con poderes de aplicación de la Comisión vigentes desde el 2 de agosto de 2026 [3]; los
proveedores de modelos comercializados antes del 2 de agosto de 2025 cumplen antes del 2 de agosto
de 2027 (`Art. 111(3)`) [63]. La transparencia (artículo 50) entró en vigor el 2 de agosto de 2026 y
no fue modificada [5]. Los sistemas de alto riesgo de autoridades públicas heredadas mantienen su
fecha original del 2 de agosto de 2030 [2].

La columna **Responsable del deber** nombra a quién vincula la obligación, que es un eje diferente
de quién la aplica. Los deberes de diseño y construcción de alto riesgo (artículos 9 a 15 y 17)
recaen en el **proveedor**; los artículos 26 y 27 recaen en el **responsable del despliegue**; los
artículos 4, 5 y 50 vinculan a **ambos**; y los artículos 53 y 55 vinculan al
**proveedor de IA de uso general**. El artículo 25 se extiende por toda la cadena de valor:
establece las condiciones bajo las cuales un distribuidor, importador o responsable del despliegue
se convierte en **proveedor** e hereda los deberes del proveedor. Los artículos 22 a 24 vinculan al
**representante autorizado** de un proveedor no perteneciente a la UE, al **importador** y al
**distribuidor**, y el artículo 54 al representante autorizado de un proveedor no perteneciente a la
UE de IA de uso general. Esto importa para el ingeniero porque los artefactos que puedes producir
dependen de qué rol desempeña tu organización: un responsable del despliegue no puede elaborar la
documentación técnica del proveedor, pero debe ejecutar la vigilancia del artículo 26 y la FRIA del
artículo 27; y cuando el modelo se adquiere, la mayoría de la evidencia del lado del proveedor se
convierte en algo que recopilas en lugar de producir (consulta la Puerta de Diligencia Debida del
Proveedor / Modelo en el capítulo 05).

El **artículo 16** es el paraguas para los deberes de alto riesgo del proveedor. Aparte del punto
(l), accesibilidad, que tiene su propia fila, no añade ningún artefacto propio; reúne las
obligaciones que las filas siguientes desglosan artículo por artículo: los requisitos de los
artículos 9 a 15 y 17, conservación de documentación y registros (artículos 18 y 19), acción
correctiva (artículo 20), la evaluación de la conformidad (artículo 43), la declaración de
conformidad de la UE y el marcado CE (artículos 47 y 48), el registro (artículos 49 y 71), la
vigilancia poscomercialización (artículo 72) e informes de incidentes graves (artículo 73). Por lo
tanto, se lee aquí como una referencia cruzada, no como una fila [22][63].

| Artículo | Obligación | Artefacto de ingeniería | Capa | Responsable del deber | Se aplica (post-Omnibus Digital) | Autoridad |
|---|---|---|---|---|---|---|
| `Art. 3(1)` | Ámbito de aplicación: decide, sistema por sistema, si es un sistema de IA según la definición del art. 3(1) antes de que se evalúe ningún otro deber | Registro de decisión definitoria en el registro: definición aplicada, elementos encontrados, familia excluida si la hay, razón, decisor, fecha | 2 | Proveedor + responsable del despliegue (ámbito de aplicación) | 2025-02-02 (Capítulo I) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 4` | Alfabetización en materia de IA: tomar medidas para apoyar el desarrollo de alfabetización en materia de IA entre el personal y los operadores | Programa de alfabetización como código; registros de formación basados en roles; puertas de incorporación | 1 | Proveedor + responsable del despliegue | 2025-02-02; reformulado 2026-07-27 (en vigor) [6][22][63] | Deber del proveedor/responsable del despliegue; autoridad nacional de vigilancia del mercado |
| `Art. 4a` | Base legal para procesar datos de categorías especiales para detección de sesgos en sistemas de alto riesgo, con seudonimización y supresión una vez corregido el sesgo | Controles de gobernanza de datos; seudonimización y retención como código; ficha de datos anotando base y supresión | 2 | Proveedor | 2026-07-27 (nuevo, en vigor) [2] | Autoridad nacional de vigilancia del mercado / Autoridades de protección de datos |
| `Art. 5` | Prácticas prohibidas; nuevas prohibiciones sobre material de ultrasuplantación íntima no consentida y CSAM generados por IA | Lista de bloqueo de política como código; guardrails de entrada/salida; detección de rechazo y abuso | 1 · 4 | Proveedor + responsable del despliegue | 2026-12-02 (prohibiciones nuevas); prohibiciones anteriores desde 2025-02-02 [2] | Autoridad nacional de vigilancia del mercado |
| `Art. 6` | Reglas de clasificación para sistemas de IA de alto riesgo, incl. la ruta del Anexo III (independiente) y la ruta del Anexo I (componente de seguridad) | Clasificación de riesgos como código; registro de decisión de clasificación de alto riesgo; entrada de registro marcando estado del Anexo III | 1 · 2 | Proveedor | 2027-12-02 (Anexo III) [1][22] | Autoridad nacional de vigilancia del mercado |
| `Art. 6(3)–(4)` | Un proveedor que encuentra un sistema del Anexo III no de alto riesgo según el filtro del art. 6(3) documenta la evaluación antes de comercializarlo y lo registra según el art. 49(2); un sistema que perfila personas físicas siempre es de alto riesgo | Registro de decisión de clasificación (punto del Anexo III, condición del art. 6(3), bandera de perfilado explícito); entrada de registro del art. 49(2) enviada desde el registro | 1 · 2 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 9` | Sistema de gestión de riesgos en todo el ciclo de vida de alto riesgo | Registro de riesgos como código; modelos de amenaza; vinculación a resultados de FRIA y evals | 1 · 3 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 10` | Datos y gobernanza de datos; conjuntos de datos representativos, relevantes y verificados en cuanto a errores | Fichas de datos; linaje; pruebas de sesgo y calidad en CI | 2 · 3 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 11` | Documentación técnica (Anexo IV) elaborada y mantenida actualizada | AIBOM (`CycloneDX ML-BOM`, `SPDX 3.0 AI`); documentación técnica generada automáticamente; fichas de modelo | 2 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 12` | Conservación de registros: registro automático de eventos durante la vida útil del sistema | Registros estructurados y firmados; trazas `OpenTelemetry`; almacén de eventos a prueba de manipulaciones | 4 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 13` | Transparencia y provisión de información a los responsables del despliegue | Instrucciones de uso como código; fichas de modelo y datos; notas de capacidad y limitación | 2 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 14` | Supervisión humana diseñada en el sistema | Puntos de control de supervisión humana; kill switch; rutas de anulación y escalada | 4 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 15` | Precisión, robustez y ciberseguridad | Puerta de eval; suite de red team adversarial; controles de robustez y seguridad; evals de regresión | 3 · 4 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 15(4)` | Los sistemas que continúan aprendiendo después de la comercialización se construyen para eliminar o reducir el riesgo de que salidas sesgadas alimenten entradas futuras (bucles de retroalimentación), con medidas de mitigación | Monitor de equidad de bucle de retroalimentación; verificación de sesgo de datos de reentrenamiento; puerta de escritura de memoria de agente con procedencia y reversión a una instantánea conocida como buena | 3 · 4 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 16(l)` | Los proveedores garantizan que el sistema de alto riesgo cumple con los requisitos de accesibilidad de las Directivas (UE) 2016/2102 y (UE) 2019/882 | Resultados de pruebas de accesibilidad para cada aviso, instrucción y explicación mostrados a personas, ejecutados en el pipeline; plantillas de explicación accesibles | 2 · 3 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 17` | Sistema de gestión de la calidad | QMS como código; políticas versionadas; controles de pipeline y gestión de cambios | 1 · 5 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 17(1)(m)` | El QMS incluye un marco de responsabilidad que establece las responsabilidades de la dirección y otro personal para cada aspecto del QMS | RACI como código compilado en campos de propietario del registro y reglas de propietario de código; registros de decisiones de comité | 1 · 2 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 18` | Mantener la documentación técnica, la documentación del QMS, los cambios de organismos notificados y decisiones y la declaración de la UE a disposición de las autoridades nacionales durante 10 años después de la comercialización | Retención como código para el fichero técnico, registros del QMS, decisiones de organismos notificados y la declaración de la UE (10 años); almacén de evidencia de escritura única | 2 · 5 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 19` | Mantener los registros generados automáticamente bajo el control del proveedor durante un período apropiado para la finalidad prevista, al menos seis meses a menos que otra ley disponga lo contrario | Política de retención de registros como código (al menos seis meses, establecida por finalidad prevista); almacén de registros a prueba de manipulaciones | 4 · 5 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 20` | Un proveedor con razón para considerar un sistema de alto riesgo no conforme inmediatamente lo pone en conformidad, lo retira, desactiva o lo retira del mercado e informa a los distribuidores y responsables del despliegue; cuando el sistema presenta un riesgo, investiga e informa a la autoridad de vigilancia del mercado | Registro de CAPA; runbook de retirada, desactivación o retiro; notificación de distribuidores y responsables del despliegue | 1 · 5 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 22` | Un proveedor establecido fuera de la Unión designa, por mandato escrito, un representante autorizado en la Unión antes de comercializar el sistema; el representante mantiene la declaración, documentación y certificado durante 10 años | Mandato escrito; copias de 10 años de la declaración, documentación técnica y certificado; ruta de contacto de autoridad | 5 | Proveedor no perteneciente a la UE + representante autorizado | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 23` | Antes de comercializar un sistema de alto riesgo, el importador verifica la evaluación de la conformidad, la documentación del Anexo IV, el marcado CE, la declaración e instrucciones y el representante autorizado, y mantiene copias durante 10 años | Registro de verificación de importación contra cada verificación; copias de documentos de 10 años | 2 · 5 | Importador | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 24` | Antes de comercializar un sistema de alto riesgo, el distribuidor verifica el marcado CE, la declaración e instrucciones, y retiene, retira o retira del mercado un sistema que considera no conforme | Registro de verificación de distribución; flujo de trabajo de retención, retirada o retiro | 2 · 5 | Distribuidor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 25` | Responsabilidades a lo largo de la cadena de valor de IA: cuándo un distribuidor, importador o responsable del despliegue se convierte en proveedor, y la información que un proveedor debe pasar a los actores posteriores | Puerta de diligencia debida de la cadena de valor; asignación de responsabilidad proveedor/responsable del despliegue; AIBOM y fichas de modelo/datos recopiladas de proveedores anteriores | 2 · 5 | Proveedor + actores de la cadena de valor | 2027-12-02 (Anexo III) [23] | Autoridad nacional de vigilancia del mercado |
| `Art. 26` | Obligaciones del responsable del despliegue para sistemas de alto riesgo: uso según las instrucciones de uso (art. 26(1)); las filas de párrafo siguientes desglosan supervisión, datos de entrada, vigilancia, registros y avisos | Registro de despliegue; ganchos de vigilancia; supervisión asignada y retención de registros | 2 · 4 | Responsable del despliegue | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 26(2)` | Los responsables del despliegue asignan supervisión humana a personas físicas con la competencia, formación y autoridad necesarias, y el apoyo necesario | Asignación de supervisión en el registro; registros de formación basados en roles con vencimiento; lista de aprobadores por clase de punto de control con autoridad para pausar o rechazar | 1 · 4 | Responsable del despliegue | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 26(4)` | En la medida en que el responsable del despliegue controla los datos de entrada, garantiza que los datos sean relevantes y suficientemente representativos para la finalidad prevista | Comprobaciones de datos de entrada contra la población en el registro de despliegue; monitores de desviación en las entradas | 2 · 3 | Responsable del despliegue | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 26(5)` | Los responsables del despliegue supervisan la operación conforme a las instrucciones; si tienen razones para considerar un riesgo informan al proveedor o distribuidor y a la autoridad y suspenden el uso; un incidente grave va al proveedor primero, y el art. 73 se aplica al responsable del despliegue si no se puede contactar al proveedor | Plan de supervisión con propietarios de señales; ruta de suspensión probada (feature flag, conmutador de tráfico); contacto de incidentes del proveedor en el registro; avisos de riesgo e incidentes graves rellenados previamente | 2 · 4 · 5 | Responsable del despliegue | 2027-12-02 (Anexo III) [63][57] | Autoridad nacional de vigilancia del mercado |
| `Art. 26(6)` | Los responsables del despliegue conservan los registros bajo su control durante un período apropiado para la finalidad prevista, al menos seis meses a menos que otra ley disponga lo contrario | Calendario de retención como código; almacén de registros a prueba de manipulación; bloqueo legal mientras un incidente está abierto | 4 · 5 | Responsable del despliegue | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 26(7)` | Antes de poner en servicio un sistema de alto riesgo en el lugar de trabajo, los responsables del despliegue que sean empleadores informan a los representantes de los trabajadores y a los trabajadores afectados | Registro de información de trabajadores fechado antes del primer uso y vinculado a la entrada del registro; activador de intake de RRHH para sistemas del punto 4 del Anexo III | 2 | Responsable del despliegue (empleador) | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 26(11)` | Los responsables del despliegue de sistemas del Anexo III que toman o ayudan a tomar decisiones sobre personas físicas informan a esas personas de que están sujetas al sistema | Aviso de uso de IA en el punto de decisión; plantillas de aviso versionadas como código; registro de entrega de avisos | 2 · 4 | Responsable del despliegue | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 27` | Evaluación de Impacto sobre los Derechos Fundamentales (FRIA) para responsables del despliegue de sistemas del Anexo III | FRIA como código a partir de una plantilla; referencia cruzada a una DPIA del RGPD `Art. 35` | 1 · 2 | Responsable del despliegue | 2027-12-02 (Anexo III) [7] | Autoridad nacional de vigilancia del mercado |
| `Art. 43` | Evaluación de la conformidad antes de la introducción en el mercado (control interno, u organismo notificado para biometría del punto 1 del Anexo III) | Flujo de trabajo de evaluación de conformidad; paquete de evidencia de control interno u organismo notificado; trazabilidad a la documentación del Anexo IV | 1 · 5 | Proveedor | 2027-12-02 (Anexo III) [1][22] | Autoridad nacional de vigilancia del mercado |
| `Art. 43(4)` | Un sistema ya evaluado se somete a una nueva evaluación de conformidad en caso de modificación sustancial; los cambios predeterminados en la documentación técnica de un sistema que continúa aprendiendo no son modificaciones sustanciales | Política de clasificación de cambios en merge; envolvente de cambio predeterminado como código; activador de reevaluación en el registro | 1 · 5 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 47` | Declaración UE de conformidad redactada al completar la evaluación | Declaración UE de conformidad generada automáticamente a partir de la evidencia; registro de marcado CE | 2 · 5 | Proveedor | 2027-12-02 (Anexo III) [1][22] | Autoridad nacional de vigilancia del mercado |
| `Art. 48` | Afixar el marcado CE de forma visible, legible e indeleble (un marcado digital para sistemas proporcionados digitalmente), seguido del número del organismo notificado cuando sea aplicable | Registro de marcado CE (físico o digital) generado con la declaración UE de conformidad; número del organismo notificado cuando sea aplicable | 2 · 5 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 49` / `Art. 71` | Registro de sistemas de alto riesgo en la base de datos de la UE | Registro de agentes/modelos con una API que alimenta el registro; propietario y estado por entrada | 2 | Proveedor; responsable del despliegue de autoridad pública | 2027-12-02 (Anexo III) [1] | MSA nacional; Comisión (base de datos) |
| `Art. 50` | Transparencia para ciertos sistemas de IA: divulgación de chatbot; marcado y etiquetado de contenido sintético | Etiquetado de contenido y marcado legible por máquina (p. ej. estilo C2PA); banner de divulgación de chatbot | 4 · 2 | Proveedor + responsable del despliegue | 2026-08-02; período de gracia de marcado para sistemas existentes hasta 2026-12-02 [2][5] | Autoridad nacional de vigilancia del mercado |
| `Art. 52` | Notificar a la Comisión sin demora, y en el plazo de dos semanas, una vez que un modelo de IA de uso general cumpla la condición del art. 51(1)(a) o se sepa que la cumplirá | Libro mayor de cálculo por linaje de modelo con alerta de umbral de cálculo planificado; registro de notificación presentado en el plazo de dos semanas | 2 · 5 | Proveedor de IA de uso general | Obligaciones desde 2025-08-02; aplicación desde 2026-08-02 [63][3] | Oficina de IA |
| `Art. 53` | Obligaciones de proveedor de IA de uso general, incl. un resumen público del contenido de entrenamiento en una plantilla de la Oficina de IA | Fichas de modelo; resumen de contenido de entrenamiento; AIBOM y procedencia del conjunto de datos | 2 | Proveedor de IA de uso general | Obligaciones desde 2025-08-02; aplicación desde 2026-08-02 [3] | Oficina de IA |
| `Art. 53(1)(c)` | Los proveedores de IA de uso general establecen una política para cumplir con la ley de derechos de autor de la Unión, incl. identificar y cumplir con las reservas de derechos conforme al art. 4(3) de la Directiva (UE) 2019/790 | Política de derechos de autor versionada; registros de decisiones de rastreador; libro mayor de derechos de datos de entrenamiento con el resultado de la comprobación de reserva | 1 · 2 · 5 | Proveedor de IA de uso general | Obligaciones desde 2025-08-02; aplicación desde 2026-08-02 [63][73] | Oficina de IA |
| `Art. 54` | Un proveedor de IA de uso general establecido fuera de la Unión designa, por mandato escrito, un representante autorizado antes de introducir el modelo en el mercado de la Unión; el representante conserva la documentación del Anexo XI durante 10 años | Mandato escrito; copia de documentación del Anexo XI conservada 10 años; ruta de contacto de la Oficina de IA | 5 | Proveedor de IA de uso general no perteneciente a la UE + representante autorizado | Obligaciones desde 2025-08-02; aplicación desde 2026-08-02 [63] | Oficina de IA |
| `Art. 55` | Modelos de IA de uso general con riesgo sistémico: evaluación de modelo incl. pruebas adversariales; evaluación de riesgo a nivel de la Unión; notificación de incidentes graves; ciberseguridad del modelo | Suite de eval y red team; pipeline de incidentes en la plantilla de notificación de incidentes graves de la Comisión; controles de seguridad de pesos; modelo de amenaza | 3 · 4 · 5 | Proveedor de IA de uso general (riesgo sistémico) | Obligaciones desde 2025-08-02; aplicación desde 2026-08-02 [3][26] | Oficina de IA |
| `Art. 60` | Prueba de sistemas de IA de alto riesgo (Anexo III) en condiciones reales fuera de espacios controlados de pruebas para la IA | Plan de prueba en condiciones reales; `Art. 61` registros de consentimiento informado; monitoreo de prueba, registro y hooks de incidentes | 3 · 4 | Proveedor / proveedor prospectivo | 2026-08-02 [22] | Autoridad nacional de vigilancia del mercado |
| `Art. 72` | Supervisión poscomercialización para sistemas de alto riesgo | Telemetría de aseguramiento continuo; plan de supervisión; señales de desviación y rendimiento | 5 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 73` | Notificación de incidentes graves para sistemas de alto riesgo (plazos en la tabla de reloj de notificación a continuación) | Pipeline de detección y clasificación de incidentes; automatización del reloj de notificación; captura de evidencia | 5 · 4 | Proveedor | 2027-12-02 (Anexo III) [1] | Autoridad nacional de vigilancia del mercado |
| `Art. 73(6)` | Después de notificar un incidente grave, el proveedor investiga sin demora (evaluación de riesgo, acción correctiva) y no altera el sistema de forma que pueda afectar la evaluación de las causas antes de informar a las autoridades | Paso de preservación de evidencia: snapshots de modelo, prompt, política e índice de recuperación; trazas selladas; corrección enviada en una nueva versión | 4 · 5 | Proveedor | 2027-12-02 (Anexo III) [63] | Autoridad nacional de vigilancia del mercado |
| `Art. 75(1a)` | Los proveedores de sistemas de alto riesgo bajo la competencia exclusiva de la Oficina de IA (sistemas construidos sobre su propio modelo de IA de uso general, y sistemas en plataformas en línea muy grandes designadas o motores de búsqueda) notifican incidentes graves a la Oficina de IA, aplicándose el art. 73(2) a (9) mutatis mutandis | Enrutamiento de pipeline de incidentes por bandera de competencia del registro (MSA nacional u Oficina de IA) | 2 · 5 | Proveedor (sistemas bajo competencia de la Oficina de IA) | 2027-12-02 (Anexo III); nuevo por el Omnibus (lectura, verificar) [22] | Oficina de IA |
| `Art. 86` | Una persona sujeta a una decisión de un responsable del despliegue basada en un sistema del Anexo III (excepto punto 2) con efectos adversos legales o de importancia similar puede obtener explicaciones claras y significativas del papel del sistema y los elementos principales de la decisión, cuando la ley de la Unión no otorgue ya el derecho | Registro de explicación por decisión (versión de sistema y modelo, códigos de razón, papel determinante o consultivo, responsable de la decisión humana); flujo de trabajo de manejo de solicitudes y registro de respuestas | 2 · 4 · 5 | Responsable del despliegue | 2027-12-02 (Anexo III); el Capítulo IX se aplica desde 2026-08-02 (lectura, verificar) [63][22] | Autoridad nacional de vigilancia del mercado |
| `Art. 87` | La Directiva (UE) 2019/1937 se aplica a las denuncias de infracciones de la Ley de IA y a la protección de las personas que las realizan | Canal de notificación interna gestionado como sistema de casos con los relojes de la directiva codificados; identidad del denunciante sellada; monitoreo de represalias; enrutamiento al pipeline de incidentes | 1 · 5 | Personas jurídicas con canales de notificación interna conforme a la Directiva (UE) 2019/1937 | 2026-08-02 [63][64] | Autoridades designadas conforme a la Directiva (UE) 2019/1937 |

Varias filas se desarrollan completamente en otros lugares del libro:

- `Art. 4`: el programa de alfabetización como código es
  [Alfabetización en IA como código](/bok/governance-program#ai-literacy-as-code) en el capítulo 12,
  y los registros de entrenamiento basados en roles tienen una
  [plantilla de plan de estudios de alfabetización](/resources/templates#kit-literacy-curriculum).
- `Art. 4a` y `Art. 10`: la base legal para
  [datos de categoría especial para detección de sesgos](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)
  está en el capítulo 19; los datos necesarios para probar sesgos, y
  [dónde entran los sesgos en el ciclo de vida](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle),
  están en el capítulo 16
  ([características protegidas, proxies y los datos que necesitas para probar](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test)).
- `Art. 6`:
  [el filtro del artículo 6(3) y la anulación de perfiles](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
  se explican en el capítulo 18.
- `Art. 9`: el registro de riesgos como código es
  [el registro de riesgos como registro de evidencia](/bok/risk-management#the-risk-register-as-an-evidence-record)
  en el capítulo 13; el mismo artefacto responde a la fila ISO/IEC 23894 a continuación.
- `Art. 11`, `Art. 43` y `Art. 47`:
  [Anexo IV, elemento por elemento](/bok/governing-development#annex-iv-element-by-element) y
  [conformidad, en orden](/bok/governing-development#eu-ai-act-conformity-in-order) están en el
  capítulo 14.
- `Art. 13`: las instrucciones de uso como código tienen un
  [esquema JSON y ejemplo rellenado](/resources/templates#schema-instructions-for-use); lo que deben
  decir a los responsables del despliegue y a las personas afectadas está en
  [la Ley de IA de la UE, artículos 13 y 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (capítulo 16).
- `Art. 25`:
  [cuándo un actor de la cadena de valor se convierte en proveedor](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)
  se establece en el capítulo 18.
- `Art. 26`: los
  [deberes del responsable del despliegue en operación](/bok/governing-deployment#operating-the-system)
  están en el capítulo 15.
- `Art. 27`: la referencia cruzada de la FRIA a una DPIA del RGPD `Art. 35` se desarrolla en
  [la DPIA para sistemas de IA](/bok/privacy-and-ai#the-dpia-for-ai-systems) (capítulo 19).
- `Art. 72`: el plan de supervisión tiene un
  [esquema de plan de supervisión poscomercialización](/resources/templates#schema-post-market-monitoring-plan).
- `Art. 3(1)`: el registro de decisión definitoria se construye campo a campo en
  [del elemento de definición al campo del registro](/bok/ai-defined#from-definition-element-to-registry-field)
  (capítulo 11).
- `Art. 15(4)`: los bucles de retroalimentación se supervisan en
  [supervisión de equidad en producción](/bok/fairness-and-explainability#monitoring-fairness-in-production)
  (capítulo 16), y para agentes en
  [gobernanza de memoria y contexto](/bok/governing-agents#memory-and-context-governance) (capítulo
  23); `Art. 16(l)` tiene
  [explicaciones accesibles](/bok/fairness-and-explainability#accessible-explanations).
- `Art. 17(1)(m)`: el marco de responsabilidad es
  [una RACI de ciclo de vida](/bok/governance-program#a-lifecycle-raci) (capítulo 12); `Art. 43(4)`
  es [modificación sustancial](/bok/governing-development#substantial-modification) en el capítulo
  14; `Arts. 22` a `24` son [los roles de operador de la UE](/bok/eu-ai-act#the-eu-operator-roles)
  en el capítulo 18.
- `Art. 26(2)` a `26(11)`: los párrafos del responsable del despliegue se extienden por el capítulo
  15, desde
  [comprobación de datos y personas](/bok/governing-deployment#check-the-data-and-the-people) hasta
  [retención de registros](/bok/governing-deployment#records-retention) y
  [comunicaciones externas](/bok/governing-deployment#external-communications); el capítulo 17 cubre
  [informar al proveedor y suspender el uso](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)
  (`Art. 26(5)`) y [congelación antes de reparar](/bok/incidents#freeze-before-you-fix)
  (`Art. 73(6)`), y el capítulo 23
  [diseño de aprobación para puntos de control de agentes](/bok/governing-agents#human-checkpoints-and-approval-design).
- `Art. 52`: el libro mayor de cálculo y la notificación de dos semanas están en
  [riesgo sistémico: umbral, notificación, designación](/bok/eu-ai-act#systemic-risk-threshold-notification-designation)
  (capítulo 18); `Art. 53(1)(c)` es
  [derechos de autor y datos de entrenamiento](/bok/existing-law#copyright-and-training-data)
  (capítulo 20).
- `Art. 86`: el registro de explicación se especifica en
  [la Ley de IA de la UE, artículos 13 y 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (capítulo 16) y
  [explicación y aviso a personas afectadas](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
  (capítulo 18); `Art. 87` se cumple mediante
  [un canal para plantear preocupaciones](/bok/governance-program#a-channel-for-raising-concerns)
  (capítulo 12).

El Omnibus también cambió las filas que la tabla comprime en una línea [22]. Para `Art. 6`, un
**componente de seguridad** debe ahora tener la finalidad de prevenir o mitigar riesgos para la
salud y la seguridad, o ser uno cuyo fallo las pone en peligro (`Art. 3(14)`, `Art. 6(1a)` a
`6(1c)`); ese estrechamiento se aplica a la ruta del Anexo I a partir del 2 de agosto de 2028, y la
maquinaria que se trasladó de la Sección A a la Sección B del Anexo I. El registro de conformidad
del Anexo VIII, Sección B para sistemas que se basan en el filtro `Art. 6(3)` perdió el resumen de
motivos y la lista de Estados miembros. Para `Art. 25`, la obligación del proveedor inicial de
cooperar ahora especifica documentación suficiente para evaluar la conformidad, limitaciones
conocidas y modos de fallo, y acceso técnico dirigido para pruebas (`Art. 25(2)`); la información y
el acceso deben fijarse en un acuerdo escrito (`Art. 25(4)`), y los incumplimientos de ambos
párrafos se sancionan conforme a `Art. 99(4)(da)`.

El reloj del Artículo 73 funciona por clase de incidente. El proveedor notifica a la autoridad de
vigilancia del mercado del Estado miembro donde ocurrió el incidente inmediatamente una vez que
establece un vínculo causal entre el sistema y el incidente, o la probabilidad razonable del mismo,
y en cualquier caso dentro de un plazo máximo que corre desde el momento en que el proveedor o, en
su caso, el responsable del despliegue **toma conocimiento** del incidente, no desde el hallazgo
causal [57]. Un responsable del despliegue que identifique un incidente grave informa primero al
proveedor, luego al importador o distribuidor y a la autoridad de vigilancia del mercado; si no
puede contactar con el proveedor, el Artículo 73 se aplica al responsable del despliegue mutatis
mutandis (`Art. 26(5)`) [57]:

| Clase de incidente | Plazo de notificación | Quién notifica | Artefacto |
|---|---|---|---|
| Incidente grave (general) | Inmediatamente al establecer un vínculo causal o su probabilidad razonable; no más tarde de 15 días después de tomar conocimiento | Proveedor → autoridad de vigilancia del mercado nacional; el responsable del despliegue si no puede contactar con el proveedor (`Art. 26(5)`) | Incident pipeline; automatización del reloj de notificación |
| Incumplimiento generalizado, o perturbación grave e irreversible de infraestructura crítica | Inmediatamente; no más tarde de 2 días después de tomar conocimiento | Proveedor → autoridad de vigilancia del mercado nacional; el responsable del despliegue si no puede contactar con el proveedor (`Art. 26(5)`) | Mismo pipeline, ruta de gravedad escalada |
| Muerte de una persona | Inmediatamente al establecer o sospechar un vínculo causal; no más tarde de 10 días después de tomar conocimiento | Proveedor → autoridad de vigilancia del mercado nacional; el responsable del despliegue si no puede contactar con el proveedor (`Art. 26(5)`) | Mismo pipeline, ruta prioritaria |

El Omnibus dejó estos plazos sin cambios. Para sistemas de alto riesgo bajo la competencia exclusiva
de la Oficina de IA, su nuevo `Art. 75(1a)` envía el informe a la Oficina de IA en su lugar, con
`Art. 73(2)` a `(9)` aplicándose mutatis mutandis, y la Oficina de IA lo transmite a la autoridad de
vigilancia del mercado del Estado miembro donde está establecido el proveedor [22]. Un incidente
raramente inicia solo un reloj: el capítulo 17 coloca el reloj del Artículo 73 junto a los relojes
del RGPD, SRI 2, DORA, CRA y GPAI en
[los relojes superpuestos](/bok/incidents#the-overlapping-clocks), y el
[esquema de registro de incidentes](/resources/templates#schema-incident-record) contiene las marcas
de tiempo que cada uno necesita.

Dos disposiciones transversales enmarcan las sanciones. Conforme al **`Art. 101`**, la Comisión
puede multar a los proveedores de GPAI hasta el 3% de la facturación anual mundial o 15 millones de
EUR, el que sea mayor [3][4]. Conforme al nuevo **`Art. 75a`–`75d`** del Omnibus, la Oficina de IA
adquiere poderes de investigación, compromisos vinculantes y decisiones de incumplimiento sobre los
sistemas de IA para los que el `Art. 75(1)` modificado la hace exclusivamente competente (sistemas
construidos sobre un modelo GPAI por el mismo proveedor u organización, y sistemas en plataformas en
línea muy grandes designadas o motores de búsqueda), no sobre modelos GPAI en general. Los pagos de
penalización periódica alcanzan hasta el 5% de los ingresos diarios promedio o la facturación anual
mundial por día por incumplimiento continuado (`Art. 75c(5)`). El Omnibus entró en vigor el 27 de
julio de 2026, y el Capítulo IX, donde se encuentran estos artículos, se aplica a partir del 2 de
agosto de 2026 conforme a `Art. 113` [8][22]. Las multas administrativas de alto riesgo se rigen
conforme a `Art. 99` (límites del 7%, 3% y 1% de la facturación según el incumplimiento), impuestas
por autoridades nacionales [4]. El capítulo 18 establece
[quién supervisa qué](/bok/eu-ai-act#who-supervises-what) y
[los poderes directos de la Oficina de IA](/bok/eu-ai-act#the-ai-offices-direct-powers-articles-75-and-75a-to-75d).

## Código de Prácticas de GPAI

El Código de Prácticas de GPAI, publicado el 10 de julio de 2025, es el instrumento voluntario que
los proveedores utilizan para demostrar el cumplimiento de las obligaciones de GPAI hasta que
existan normas armonizadas. Tiene tres capítulos [9][10].

| Capítulo | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|
| Seguridad (solo modelos de riesgo sistémico) | Un Marco de Seguridad; evaluaciones de modelos incl. pruebas adversariales; evaluación y mitigación de riesgo sistémico; notificación de incidentes graves; seguridad de modelos e infraestructura | Suite de eval y red team; arnés de pruebas adversariales; incident pipeline; controles de seguridad de pesos | 3 · 4 · 5 |
| Transparencia | Documentación de modelos actualizada para la Oficina de IA y responsables del despliegue posteriores | Fichas de modelo; documentación de modelo estructurada; AIBOM | 2 |
| Derechos de autor | Una política para cumplir con la ley de derechos de autor de la Unión, incl. respetando reservas de derechos | Registros de procedencia y licencia de datos de entrenamiento; política como código para filtrado de fuentes | 1 · 2 |
| Seguridad, Compromiso 9 (notificación de incidentes graves) | Notificar incidentes graves a la Oficina de IA dentro de 2, 5, 10 o 15 días por clase de incidente, con informes intermedios al menos cada cuatro semanas mientras no se resuelvan e informe final dentro de 60 días de la resolución; mantener los registros al menos cinco años [65] | Incident pipeline en los campos de plantilla de la Comisión; relojes por clase; política de retención de cinco años; canal de notificación posterior | 4 · 5 |
| Seguridad, Apéndice 1.3 y 1.4 (autonomía, uso de herramientas, pérdida de control) | Las fuentes de riesgo sistémico a considerar incluyen la capacidad de operar de forma autónoma, propensiones como colusión con otros sistemas de IA, y affordances como acceso a herramientas y sistemas físicos y el nivel de supervisión humana; la pérdida de control es un riesgo sistémico especificado [65] | Evaluaciones del proveedor de autonomía y uso de herramientas, solicitadas en la puerta de due diligence del proveedor y archivadas con la entrada del registro de agentes | 3 · 5 |

El Código es voluntario; firmarlo es una ruta para demostrar el cumplimiento, no una presunción
legal de conformidad [9]. El estado de signatario es dinámico y se cuenta conforme a la lista
oficial de la Comisión [10].

Para notificación de incidentes graves específicamente, la Comisión publicó una plantilla de
notificación el 4 de noviembre de 2025 para incidentes graves que involucren modelos GPAI con riesgo
sistémico. Se alinea con la obligación de notificación del Artículo 55 y con el Compromiso 9 del
capítulo de Seguridad del Código, y es el artefacto concreto que emite el incident pipeline, la
misma plantilla nombrada en la fila del Artículo 55 anterior [26]. Un
[registro de incidentes](/resources/templates#schema-incident-record) interno puede alimentar esta
plantilla y el informe de todos los demás regímenes. El Compromiso 9 del capítulo de Seguridad
establece los relojes (2, 5, 10 o 15 días por clase de incidente, informes intermedios al menos cada
cuatro semanas, informe final dentro de 60 días de la resolución) y una retención de al menos cinco
años, y su Apéndice 1 enumera la capacidad de operar de forma autónoma y acceso a herramientas entre
las fuentes de riesgo sistémico y pérdida de control entre los riesgos especificados, por lo que las
dos filas anteriores importan a cualquiera que implemente agentes en un modelo GPAI [65]. El
capítulo 17 coloca el Compromiso 9 junto a los otros regímenes en
[los relojes superpuestos](/bok/incidents#the-overlapping-clocks), y el capítulo 23 lee el Apéndice
1 para agentes en
[ganchos del Reglamento de IA de la UE para agentes](/bok/governing-agents#eu-ai-act-hooks-for-agents).

## Protección de datos y otra ley de la UE

Un sistema de IA colocado en el mercado de la UE cumple más ley que el Reglamento de IA el primer
día. Las filas a continuación indexan las obligaciones que los capítulos v0.5.0 enseñan: el RGPD,
los regímenes de ciberseguridad e notificación de incidentes, y la responsabilidad, derechos de
autor, consumidor y ley sectorial que ya alcanza la IA. Responden a sus propios supervisores
(autoridades de protección de datos, CSIRTs y supervisores financieros, tribunales y autoridades de
consumo), no a las autoridades de vigilancia del mercado del Reglamento de IA, y varios se aplican a
través de transposición nacional, por lo que la columna "Se aplica" lo indica. Los mapeos son
ilustrativos, no una afirmación de conformidad.

### El RGPD

El RGPD se ha aplicado desde el 25 de mayo de 2018 [66]. El capítulo 19 recorre cada fila a
continuación, con la prueba de anonimidad de la EDPB para modelos entrenados [67], en
[privacidad y ley de protección de datos aplicada a la IA](/bok/privacy-and-ai#obligation-to-artefact-map);
el capítulo 16 construye los registros de explicación y contestación de `Arts. 15(1)(h)` y `22` en
[protección de datos: el RGPD y el régimen del Reino Unido](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).

| Artículo | Lo que pide | Artefacto de ingeniería | Capa | Quién está vinculado | Se aplica |
|---|---|---|---|---|---|
| `Art. 5(1)(b) and 6(4)` | Los datos personales se recopilan para fines especificados, explícitos y legítimos y no se tratan posteriormente de forma incompatible; el Art. 6(4) establece la prueba de compatibilidad para la reutilización, como el entrenamiento en datos recopilados para otro fin [66] | Etiquetas de propósito en conjuntos de datos; política de coincidencia de propósito en pipelines de entrenamiento e indexación; registro de evaluación de compatibilidad | 1 · 2 | Responsable del tratamiento | 2018-05-25 |
| `Art. 6` | Una base legal para cada operación de tratamiento, evaluada por separado para entrenamiento, ajuste fino, recuperación e inferencia [66][67] | Registro de base por conjunto de datos y etapa; evaluación de interés legítimo versionada | 2 | Responsable del tratamiento | 2018-05-25 |
| `Art. 7` | Donde el consentimiento es la base, el responsable del tratamiento puede demostrarlo, y retirar el consentimiento es tan fácil como darlo [66] | Registro de propósito de consentimiento unido a conjuntos de datos y versiones de modelo; retirada propagada a los pipelines | 2 · 5 | Responsable del tratamiento | 2018-05-25 |
| `Art. 9` | El tratamiento de datos de categorías especiales, incl. datos biométricos para identificación única, está prohibido a menos que se aplique una condición del Art. 9(2), que alcanza datos sensibles que un modelo infiere [66] | Prueba de proxy en CI; política de inferencia con clasificador de salida en tiempo de ejecución; registro de condición del Art. 9(2) | 1 · 3 · 4 | Responsable del tratamiento | 2018-05-25 |
| `Arts. 13–14` | Informar a los interesados de los fines, bases, destinatarios y retención y, para toma de decisiones automatizada, dar información significativa sobre la lógica implicada (Arts. 13(2)(f), 14(2)(g)) [66] | Aviso generado desde la entrada del registro; ficha de modelo; aviso de decisión automatizada por sistema | 2 | Responsable del tratamiento | 2018-05-25 |
| `Art. 15(1)(h)` | A solicitud, confirmar la toma de decisiones automatizada y dar información significativa sobre la lógica implicada y su significancia y consecuencias previstas [66] | Explicación por solicitud generada desde el registro de decisión; aviso de decisión automatizada a nivel de sistema | 4 · 5 | Responsable del tratamiento | 2018-05-25 |
| `Arts. 15–17 and 21` | Las solicitudes de acceso, rectificación, supresión y oposición alcanzan cada lugar donde viven los datos: corpus, snapshots, índice de recuperación, registros y, donde contiene datos personales, el modelo [66] | Flujo de trabajo de solicitud en corpus, snapshots, índice de recuperación, registros y pesos; registro de cumplimiento | 4 · 5 | Responsable del tratamiento | 2018-05-25 |
| `Art. 22` | Un derecho a no ser objeto de una decisión basada únicamente en tratamiento automatizado con efectos legales o similarmente significativos, excepto en contrato, ley o consentimiento explícito; entonces intervención humana, el derecho a expresar una opinión y a contestar (Art. 22(3)) [66] | Registro de decisión con códigos de razón; canal de impugnación y registro de revisión humana; resultados de apelación por grupo | 4 · 5 | Responsable del tratamiento | 2018-05-25 |
| `Art. 5(1)(c) and 25` | Datos adecuados, relevantes y limitados, con medidas técnicas y organizativas integradas en el diseño y establecidas por defecto [66] | Registro de justificación de características; filtros de PII y categorías especiales; retención como código | 1 · 3 | Responsable del tratamiento | 2018-05-25 |
| `Art. 5(2)` | Un responsable del tratamiento que afirme que un modelo entrenado no contiene datos personales debe poder demostrarlo; el CEPD establece una prueba de anonimización y la evidencia que espera [66][67] | Paquete de evidencia de anonimización; evals de inferencia de pertenencia y extracción en la puerta de eval | 3 · 5 | Responsable del tratamiento (desarrollador del modelo) | 2018-05-25 |
| `Art. 28` | Utilizar solo encargados del tratamiento con garantías suficientes, bajo un contrato que fije instrucciones, subencargados, seguridad, asistencia y supresión [66] | Lista de verificación de cláusula de proveedor de IA en la puerta de debida diligencia (sin entrenamiento, retención, región, subencargados, aviso de cambio) | 2 · 5 | Responsable del tratamiento; encargado del tratamiento | 2018-05-25 |
| `Art. 30` | Los responsables del tratamiento y los encargados del tratamiento conservan un registro de las actividades de tratamiento bajo su responsabilidad [66] | Registros generados por momento de tratamiento desde el registro y fichas de datos | 2 · 5 | Responsable del tratamiento; encargado del tratamiento | 2018-05-25 |
| `Arts. 33–34` | Notificar a la autoridad de control sin dilación indebida y, cuando sea posible, en el plazo de 72 horas desde el conocimiento; informar a los interesados sin dilación indebida cuando la violación sea probable que resulte en un riesgo alto [66] | Rama de violación de datos personales del conducto de incidentes con su propio temporizador de 72 horas; plantilla de notificación a interesados | 4 · 5 | Responsable del tratamiento (el encargado del tratamiento notifica al responsable del tratamiento) | 2018-05-25 |
| `Arts. 35–36` | Evaluar el impacto antes del tratamiento probable que resulte en un riesgo alto, y consultar a la autoridad de control cuando el riesgo residual siga siendo alto [66] | Plantilla de EIPD de IA con campos específicos de IA, referenciada cruzadamente por la FRIA; decisión registrada cuando no se necesita EIPD | 1 · 2 | Responsable del tratamiento | 2018-05-25 |
| `Arts. 44–49` | Transferencias fuera del EEE solo en una decisión de adecuación, salvaguardas apropiadas (como cláusulas contractuales tipo o normas corporativas vinculantes) o una derogación estrecha; enviar datos personales a un modelo alojado fuera del EEE puede ser una transferencia [66] | Registro de transferencias; política de residencia y enrutamiento como código; evaluación de impacto de transferencia | 1 · 4 · 5 | Responsable del tratamiento; encargado del tratamiento | 2018-05-25 |

### Derecho de ciberseguridad e información de incidentes

NIS2 vincula entidades esenciales e importantes a través de la ley nacional, que los Estados
miembros aplican desde el 18 de octubre de 2024 [68]; DORA ha aplicado a entidades financieras desde
el 17 de enero de 2025 [69], con los límites de tiempo de incidentes fijados en el Reglamento
delegado (UE) 2025/301 [70]; y el deber de información de la Ley de Ciberresiliencia se aplica desde
el 11 de septiembre de 2026, antes del resto de ese Reglamento el 11 de diciembre de 2027 [71]. Un
incidente de IA puede iniciar varios de estos temporizadores a la vez: el capítulo 17 los coloca
lado a lado en [los relojes superpuestos](/bok/incidents#the-overlapping-clocks), y el capítulo 15
cubre
[continuidad cuando el proveedor falla](/bok/governing-deployment#when-the-provider-fails-continuity).

| Artículo | Lo que pide | Artefacto de ingeniería | Capa | Quién está vinculado | Se aplica |
|---|---|---|---|---|---|
| NIS2 `Art. 21(2)(c)–(d)` | Las medidas de gestión de riesgos incluyen continuidad empresarial (copia de seguridad, recuperación ante desastres, gestión de crisis) y seguridad de la cadena de suministro con proveedores directos y proveedores de servicios, que cubre servicios de IA y modelos [68] | Plan de continuidad para dependencias de IA con alternativas probadas; evaluaciones de proveedores para proveedores de modelos y plataformas | 4 · 5 | Entidades esenciales e importantes | 2024-10-18, a través de la ley nacional |
| NIS2 `Art. 23` | Una alerta temprana en el plazo de 24 horas desde el conocimiento de un incidente significativo, una notificación de incidente en el plazo de 72 horas y un informe final en el plazo de un mes desde la notificación, incl. la causa raíz [68] | Reloj por régimen en el registro de incidentes; determinación de significancia con un propietario; codificación de causa reutilizada en el informe final | 5 | Entidades esenciales e importantes | 2024-10-18, a través de la ley nacional |
| DORA `Art. 19` | Informar de incidentes importantes relacionados con TIC: notificación inicial en el plazo de 4 horas desde la clasificación como importante y no más tarde de 24 horas desde el conocimiento (en el plazo de 4 horas desde una clasificación realizada después de esas 24 horas), informe intermedio en el plazo de 72 horas desde la notificación inicial, informe final en el plazo de un mes desde el último informe intermedio [69][70] | Registro de clasificación con marca de tiempo; reloj por régimen; codificación de causa consistente para agregación de incidentes recurrentes | 5 | Entidades financieras | 2025-01-17 |
| DORA `Art. 28(3)`, `28(8)` | Mantener un registro de información sobre todos los acuerdos contractuales para servicios de TIC de proveedores terceros, y estrategias de salida para servicios de TIC que apoyen funciones críticas o importantes [69] | Entradas de registro para servicios de IA y modelos; plan de salida y registro de prueba de salida | 2 · 5 | Entidades financieras | 2025-01-17 |
| CRA `Art. 14` | Notificar vulnerabilidades activamente explotadas e incidentes graves a través de la plataforma de información única: alerta temprana en el plazo de 24 horas, notificación en el plazo de 72 horas, informe final 14 días después de que esté disponible una corrección (vulnerabilidad) o un mes después de la notificación (incidente) [71] | Relojes de vulnerabilidad e incidente en el registro de incidentes; envío a través de la plataforma de información única | 4 · 5 | Fabricantes de productos con elementos digitales | 2026-09-11; el resto desde 2027-12-11 |

### Responsabilidad civil, derechos de autor, derecho del consumidor y derecho sectorial

La Directiva revisada sobre responsabilidad por productos defectuosos trata el software, incluidos
los sistemas de IA, como un producto y se aplica a los productos introducidos en el mercado después
del 9 de diciembre de 2026 [72]. La excepción de minería de textos y datos de la Directiva DSM cede
ante una reserva del titular de derechos [73], que es la regla `Art. 53(1)(c)` a la que apunta el
Reglamento de IA. La Ley de Servicios Digitales, la Directiva sobre prácticas comerciales desleales,
la Directiva sobre trabajo en plataformas y la Directiva revisada sobre crédito al consumo añaden
deberes para plataformas, comerciantes, plataformas de trabajo digital y acreedores
[74][75][76][77]. El capítulo 20 las enseña:
[derechos de autor y datos de entrenamiento](/bok/existing-law#copyright-and-training-data),
[la Directiva de la UE sobre responsabilidad por productos defectuosos](/bok/existing-law#the-eu-product-liability-directive),
[deber de advertencia después de actualizaciones](/bok/existing-law#duty-to-warn-after-updates),
[la UE: UCPD, DSA y el Reglamento de IA](/bok/existing-law#the-eu-ucpd-dsa-and-the-ai-act),
[empleo](/bok/existing-law#employment) y
[crédito y préstamos](/bok/existing-law#credit-and-lending).

| Artículo | Lo que pide | Artefacto de ingeniería | Capa | Quién está vinculado | Se aplica |
|---|---|---|---|---|---|
| PLD `Art. 4(1)` | El software es un producto, por lo que el fabricante de un sistema de IA es estrictamente responsable del daño causado por un defecto en un producto introducido en el mercado o puesto en servicio después de 2026-12-09 [72] | Revisión de responsabilidad por defecto en el diseño; recurso contractual; riesgo residual en el registro | 1 · 5 | Fabricantes y otros operadores económicos | Productos introducidos en el mercado después de 2026-12-09 |
| PLD `Arts. 9–10` | Un tribunal puede ordenar al demandado que divulgue pruebas relevantes a su disposición; no divulgarlas es una de las condiciones bajo las cuales se presume que el producto es defectuoso [72] | Archivo de defensa por lanzamiento: AIBOM con hashes, historial de eval, análisis de modo de fallo, registros firmados, instrucciones de uso, conservados durante el período de responsabilidad | 2 · 3 · 5 | Fabricantes, incl. proveedores de sistemas de IA y modificadores sustanciales | Productos introducidos en el mercado después de 2026-12-09 |
| PLD `Art. 11(2)` | El fabricante no puede basarse en que el defecto surge después de la introducción en el mercado cuando se debe a software, incl. sus actualizaciones o mejoras, o a actualizaciones de seguridad faltantes, que permanecen bajo su control [72] | Registro de cambios; evals de regresión por lanzamiento; registros de decisión de parche; advertencias versionadas | 3 · 4 · 5 | Fabricantes | Productos introducidos en el mercado después de 2026-12-09 |
| Directiva DSM `Art. 4(3)` | La excepción general de minería de textos y datos se aplica solo cuando los titulares de derechos no han reservado expresamente el uso de manera apropiada, como medios legibles por máquina para contenido disponible públicamente en línea [73] | Política de rastreador como código honrando reservas; registro de derechos de datos de entrenamiento con el resultado de verificación de reserva, método y fecha | 1 · 2 | Cualquiera que mine obras, incl. desarrolladores de modelos | Plazo de transposición 2021-06-07 |
| DSA `Art. 25` | Las plataformas en línea no diseñan, organizan u operan sus interfaces de manera que engañen o manipulen a los usuarios o afecten sus decisiones libres e informadas [74] | Registro de revisión de interfaz; eval de equipo rojo para salidas manipuladoras | 3 · 5 | Proveedores de plataformas en línea | 2024-02-17 |
| DSA `Art. 27` | Las plataformas en línea establecen en sus términos los parámetros principales de sus sistemas de recomendación y cualquier opción que los usuarios tengan para modificarlos [74] | Ficha de parámetro de recomendador generada desde la configuración de clasificación; registro de las opciones ofrecidas a los usuarios | 2 · 4 | Proveedores de plataformas en línea | 2024-02-17 |
| UCPD `Arts. 5–7`, Anexo I | Ninguna práctica comercial contraria a la diligencia profesional, o engañosa, que distorsione las decisiones del consumidor medio, incl. afirmaciones generadas por IA y respuestas de chatbot; afirmar que las reseñas son genuinas sin comprobaciones razonables, y las reseñas falsas, están en la lista negra (puntos 23b y 23c del Anexo I) [75] | Registro de afirmaciones vinculado a resultados de eval; comprobaciones de procedencia de reseñas; evals de respuesta de chatbot sobre afirmaciones de productos | 1 · 3 · 4 | Comerciantes que tratan con consumidores | 2007-12-12; puntos de reseña desde la Directiva (UE) 2019/2161 |
| Directiva sobre trabajo en plataformas `Arts. 7`, `9–11` | Límites en los datos personales que las plataformas pueden procesar a través de sistemas automatizados, transparencia sobre esos sistemas, supervisión humana con una evaluación de impacto al menos cada dos años, y explicación y revisión humana de decisiones [76] | Registro de sistemas automatizados con sus parámetros principales; lista de negación de categoría de datos; evaluación de impacto bienal; registro de explicación y revisión humana | 1 · 2 · 3 · 5 | Plataformas de trabajo digital | Transposición antes de 2026-12-02 |
| CCD2 `Art. 18(8)` | Cuando la evaluación de solvencia implica procesamiento automatizado, el consumidor puede solicitar intervención humana, una explicación clara de la evaluación y su lógica, y una revisión de la decisión [77] | Artefacto de explicación por versión de modelo; ruta de revisión y registro | 3 · 4 · 5 | Acreedores | 2026-11-20 |

## ISO/IEC 42001, 42005 y 42006

ISO/IEC 42001:2023 es el estándar de sistema de gestión de IA (AIMS); su Anexo A agrupa objetivos de
control en nueve áreas (`A.2`–`A.10`). Es un estándar de sistema de gestión, no el QMS del Artículo
17, y su adopción europea (EN ISO/IEC 42001:2026) no confiere presunción de conformidad [11][12].

| Área del Anexo A | Enfoque | Artefacto de ingeniería | Capa |
|---|---|---|---|
| `A.2` Políticas relacionadas con IA | Conjunto de política de IA y su gobernanza | Biblioteca de política como código; repositorio de política versionado | 1 |
| `A.3` Organización interna | Roles, responsabilidades, información | Modelo operativo; RACI; propiedad en el registro | 1 · 2 |
| `A.4` Recursos para sistemas de IA | Datos, herramientas, cálculo, recursos humanos documentados | Inventario de recursos; AIBOM; manifiestos de entorno | 2 |
| `A.5` Evaluación de impactos de sistemas de IA | Proceso de evaluación de impacto | Evaluación de impacto como código; vinculación FRIA/EIPD (ISO/IEC 42005) | 1 · 3 |
| `A.6` Ciclo de vida del sistema de IA | Diseño, desarrollo, despliegue responsables | Controles de conducto; puertas de eval; gestión de cambios | 1 · 3 · 4 |
| `A.7` Datos para sistemas de IA | Calidad de datos, procedencia, preparación | Fichas de datos; linaje; pruebas de calidad de datos | 2 · 3 |
| `A.8` Información para partes interesadas | Transparencia e información a las partes interesadas | Fichas de modelo/datos; divulgaciones legibles por máquina | 2 |
| `A.9` Uso de sistemas de IA | Controles de uso responsable y monitoreo | Guardrails en tiempo de ejecución; telemetría de uso | 4 |
| `A.10` Relaciones con terceros y clientes | Gestión de responsabilidades de proveedores y clientes | AIBOM de proveedor; mapeo de control contractual y técnico | 2 · 5 |

ISO/IEC 42005:2025 proporciona orientación para la evaluación de impacto de sistemas de IA y es el
acompañante natural del artículo 27 (FRIA) y el anexo A.5 [13]. El modelo operativo y la RACI de la
fila `A.3` se construyen en [una RACI de ciclo de vida](/bok/governance-program#a-lifecycle-raci)
(capítulo 12), y el capítulo 22 sitúa estas normas en
[la familia ISO/IEC](/bok/principles-and-standards#the-isoiec-family) en su conjunto.

Dos normas ISO/IEC adicionales se sitúan junto a las AIMS. **ISO/IEC 42006:2025** establece los
requisitos para los organismos que auditan y certifican sistemas de gestión de IA: basándose en
ISO/IEC 17021-1, es la respuesta a "quién puede certificarte creíblemente en 42001", ya que fija la
competencia y la coherencia que debe demostrar un organismo de certificación. **ISO/IEC 23894:2023**
proporciona orientación sobre gestión de riesgos de IA, adaptando ISO 31000 a la IA; es el
acompañante de procesos de riesgo del artículo 9 y del NIST AI RMF [27][28]. La tabla también
incluye ISO/IEC 42005:2025, la orientación de evaluación de impacto [13], e **ISO/IEC 22989:2022**,
la norma de conceptos y terminología cuyos roles de partes interesadas en IA y vocabulario de ciclo
de vida un registro puede reutilizar campo por campo [78].

| Norma | Qué es | Artefacto de ingeniería | Capa |
|---|---|---|---|
| `ISO/IEC 42006:2025` | Requisitos para organismos que auditan y certifican sistemas de gestión de IA (quién puede certificarte creíblemente en 42001) | Alcance de certificación acreditado; evidencia de competencia del auditor; registro de certificados | 5 |
| `ISO/IEC 23894:2023` | Orientación sobre gestión de riesgos de IA (acompañante de ISO 31000) | Registro de riesgos como código; taxonomía de riesgos de IA; vinculación al Reglamento de IA de la UE `Art. 9` y el NIST AI RMF | 1 · 3 |
| `ISO/IEC 42005:2025` | Orientación para evaluar los impactos de un sistema de IA en individuos, grupos y sociedad a lo largo de su ciclo de vida (acompañante del art. 27 y anexo A.5) [13] | Evaluación de impacto como código a partir de una plantilla; referencias cruzadas de FRIA y DPIA; disparadores de reevaluación | 1 · 3 |
| `ISO/IEC 22989:2022` | Un vocabulario compartido para conceptos de IA, el ciclo de vida del sistema de IA y roles de partes interesadas en IA [78] | Nombres de campos del registro y vocabulario de roles alineados con los términos de la norma; referencias cruzadas del glosario | 2 |

**Correspondencias:** estos controles se realizan a través de las capas 1, 2, 3 y 5 del stack; el
control de evaluación de impacto (A.5 / ISO 42005) respalda el Reglamento de IA de la UE `Art. 27`.
Los mapeos son ilustrativos, no una afirmación de conformidad.

## NIST AI RMF

El Marco de Gestión de Riesgos de IA del NIST 1.0 (enero de 2023; no hay versión 2.0) organiza el
trabajo de riesgo en cuatro funciones. Es voluntario y de origen estadounidense, y se mapea
claramente en el stack de cinco capas [14]. A partir del 2026-09-24, la página del marco del NIST
indica que AI RMF 1.0 "está siendo revisado como parte del Plan de Acción de IA de la Casa Blanca";
no se había publicado ningún texto revisado, por lo que 1.0 sigue siendo la versión a citar y fijar
en metadatos de control [59]. El capítulo 22 cubre
[el NIST AI RMF en profundidad](/bok/principles-and-standards#nist-ai-rmf-10-in-depth): las siete
características confiables, las 19 categorías del Core, el Playbook y los perfiles.

| Función | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|
| GOVERN | Una cultura y estructura para gestionar el riesgo de IA | Política como código; modelo operativo; propiedad del registro | 1 · 2 |
| MAP | Contexto y encuadre de riesgo para cada sistema de IA | Modelos de amenaza; mapeo de casos de uso e impacto; fichas de datos/modelo | 2 · 3 |
| MEASURE | Analizar, comparar y monitorear el riesgo | Puertas de eval; suite de red team adversarial; métricas por modo de fallo | 3 |
| MANAGE | Priorizar, responder y recuperarse | Guardrails en tiempo de ejecución; pipeline de incidentes; aseguramiento continuo | 4 · 5 |

### Trabajo más reciente del NIST sobre IA

Más allá del RMF, tres esfuerzos más recientes del NIST afectan al stack. Dos aún están en borrador,
y el texto lo indica. La **Iniciativa de Estándares de Agentes de IA**, lanzada por el Centro de
Estándares e Innovación en IA (CAISI) del NIST el 17 de febrero de 2026, apunta a estándares
interoperables y seguros para agentes de IA: identidad, autenticación, autorización y seguridad de
agentes [29]. El **IR 8596 Cyber AI Profile** en borrador (borrador preliminar inicial, 16 de
diciembre de 2025; comentarios cerrados el 30 de enero de 2026, y aún la versión actual a partir del
2026-09-24) es un perfil del Marco de Ciberseguridad (CSF 2.0) para IA, organizado alrededor de
Secure, Defend y Thwart [30]. El **AI 800-1** en borrador (Gestión del Riesgo de Mal Uso para
Modelos Fundacionales de Uso Dual; segundo borrador público, enero de 2025; ninguna versión final
publicada a partir del 2026-09-24) es orientación voluntaria para identificar, medir y mitigar el
riesgo de mal uso en todo el ciclo de vida de la IA [31]. El **Perfil de IA Generativa** más
antiguo, NIST AI 600-1 (26 de julio de 2024), es el acompañante del RMF para IA generativa: 12
riesgos y acciones sugeridas codificadas a las cuatro funciones, y la tabla también lo incluye [79].

| Elemento del NIST | Qué es | Artefacto de ingeniería | Capa |
|---|---|---|---|
| Iniciativa de Estándares de Agentes de IA (2026) | Iniciativa CAISI sobre agentes de IA interoperables y seguros: identidad, autenticación, seguridad de agentes | Registro de agentes; controles de identidad no humana; autenticación y autorización de agentes; evals de agentes adversariales | 3 · 4 |
| IR 8596 Cyber AI Profile (borrador) | Perfil CSF 2.0 para IA (Secure / Defend / Thwart) | Controles de seguridad del sistema de IA; observabilidad en tiempo de ejecución; detección de amenazas mapeada a CSF 2.0 | 3 · 4 |
| AI 800-1 (borrador) | Gestión del Riesgo de Mal Uso para Modelos Fundacionales de Uso Dual (orientación voluntaria) | Suite de red team de mal uso; evals de capacidad y capacidad peligrosa; marco de seguridad | 3 |
| AI 600-1 Perfil de IA Generativa (2024) | Acciones sugeridas para 12 riesgos que la IA generativa crea o exacerba, codificadas a las funciones Govern, Map, Measure y Manage [79] | Suites de eval de IA generativa nombradas según los ids de acción del perfil (p. ej. confabulación, integridad de la información); una entrada de registro de riesgos por riesgo del perfil | 1 · 3 |

## AICM de CSA y STAR para IA

La Matriz de Controles de IA (AICM) v1.1 de la Cloud Security Alliance, publicada el 22 de junio de
2026, define 247 objetivos de control en 18 dominios, y el programa STAR para IA proporciona el
esquema de aseguramiento alrededor de él, en tres niveles: una autoevaluación de Nivel 1, una
validación automatizada "Valid-AI-ted" de Nivel 1, y un Nivel 2 que añade certificación ISO/IEC
42001 [15][83].

| Artefacto de CSA | Qué es | Artefacto de ingeniería | Capa |
|---|---|---|---|
| AICM v1.1 | 247 objetivos de control en 18 dominios, abarcando gobernanza, datos, modelo y tiempo de ejecución | Catálogo de controles mapeado a política como código y evals; crosswalk a ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR para IA | Programa de aseguramiento y certificación en el AICM: autoevaluación de Nivel 1, Valid-AI-ted de Nivel 1 (validación automatizada) y Nivel 2 (certificación ISO/IEC 42001 más la evaluación validada) [83] | Envío de evidencia legible por máquina; telemetría de aseguramiento continuo | 5 |
| Controles de agentes (AICM v1.1, ATF, AARM) | Controles AICM específicos de agentes (p. ej. IAM-18 Agent Access Restriction, AIS-11 Agents Security Boundaries), con el Marco de Confianza Agéntico v1 (niveles de autonomía ganada) y la especificación de intercepción en tiempo de ejecución AARM [80][81][82] | Definiciones de control específicas de agentes; política como código para alcance y herramientas de agentes; guardrails en tiempo de ejecución | 1 · 4 |
| Anexo de Riesgo Catastrófico | Controles AICM mejorados para sistemas de alta autonomía con potencial de riesgo catastrófico | Controles mejorados para sistemas de alta autonomía; controles de kill switch y supervisión; evidencia de auditoría piloto | 4 · 5 |

Dos líneas de trabajo impulsan el AICM hacia agentes y riesgo fronterizo. Para agentes, los
controles se encuentran dentro de la matriz misma (por ejemplo IAM-18 Agent Access Restriction y
AIS-11 Agents Security Boundaries) [80], y el programa de plano de control agéntico de CSA añade dos
especificaciones publicadas, el **Marco de Confianza Agéntico** (confianza cero para agentes con
niveles de autonomía ganada) y **AARM** (intercepción de acciones de agentes antes de que se
ejecuten) [32][81][82]. Las ediciones anteriores de este mapa enumeraban un "Suplemento de Control
Agéntico" propuesto al AICM; no se pudo hacer coincidir con un documento primario de CSA a partir
del 2026-09-24, por lo que la fila ahora nombra lo que está publicado (verificar). Para riesgo
fronterizo, el **Anexo de Riesgo Catastrófico** añade un conjunto de controles mejorados para
sistemas de alta autonomía, destinados a ser probados a través de auditorías piloto en lugar de ser
afirmados [33].

## Proyecto de Seguridad GenAI de OWASP

El Proyecto de Seguridad GenAI de OWASP proporciona el vocabulario de amenazas contra el que se
construyen los controles, más dos formatos (el Estándar de Control de Agentes y un AIBOM) que el
stack consume directamente [16][17][54]. El capítulo 23 mapea cada entrada agéntica a sus controles
en [amenazas mapeadas a controles](/bok/governing-agents#threats-mapped-to-controls).

| Artefacto de OWASP | Qué es | Artefacto de ingeniería | Capa |
|---|---|---|---|
| Top 10 para Aplicaciones Agénticas 2026 | Catálogo de amenazas de agentes (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Modelo de amenaza de agentes; evals adversariales; guardrails en tiempo de ejecución; kill switch | 3 · 4 |
| Top 10 para Aplicaciones LLM 2026 | Catálogo de amenazas de LLM (incl. Excessive Agency en #3) | Controles de inyección de prompts y manejo de salida; puerta de eval | 3 · 4 |
| Estándar de Control de Agentes (ACS) | Un estándar para expresar controles de agentes | Definiciones de control legibles por máquina para agentes | 1 · 4 |
| AIBOM | Formato y generador de lista de materiales de IA | AIBOM en construcción (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## Leyes federales y estatales de EE.UU.

Estados Unidos no tiene una ley federal horizontal sobre IA; las reglas vinculantes específicas de
IA son leyes estatales, y difieren en alcance. Dos vinculan solo a desarrolladores fronterizos, con
los deberes más pesados en los grandes; el resto alcanzan a desarrolladores, responsables del
despliegue y operadores ordinarios, y la ley federal que predatea la IA (préstamos justos, informes
de crédito, discriminación en el empleo, la Ley FTC) ya alcanza decisiones de IA. Las tablas a
continuación las llevan todas como filas. El capítulo 21 las enseña:
[la capa federal](/bok/ai-laws-worldwide#united-states-the-federal-layer) (órdenes ejecutivas, los
memorandos de la OMB que vinculan a agencias y sus proveedores, y el impulso federal contra las
leyes estatales de IA) y las
[leyes estatales que vinculan a organizaciones privadas](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
cada una con su alcance, fechas, deberes y cumplimiento.

### Leyes de desarrolladores fronterizos

Dos leyes estatales de EE.UU. vinculan solo a desarrolladores fronterizos, con los deberes más
pesados en los grandes, no en responsables del despliegue general: un alcance más estrecho que la
clasificación de riesgos de la Ley de IA de la UE. Piden a grandes desarrolladores fronterizos que
publiquen marcos de seguridad y a todos los desarrolladores fronterizos que reporten incidentes
críticos de seguridad al estado [18][19][25]. La protección de denunciantes de California se cumple
en la práctica mediante
[un canal para plantear preocupaciones](/bok/governance-program#a-channel-for-raising-concerns)
(capítulo 12).

| Ley | Alcance | Obligación | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| California SB 53 (TFAIA), en vigor 2026-01-01 | Desarrolladores fronterizos (modelos entrenados por encima de ~10^26 FLOP); el deber del marco vincula a grandes desarrolladores fronterizos (ingresos del desarrollador superiores a USD 500M) | Publicar un marco de IA fronterizo; reportar incidentes críticos de seguridad a la Oficina de Servicios de Emergencia dentro de 15 días; protección de denunciantes; hasta USD 1M por violación, cumplimiento de AG [56] | Marco de seguridad publicado; reportes de pipeline de incidentes al estado; artefactos de transparencia | 5 · 4 |
| Protecciones de denunciantes de California SB 53 (Código Laboral 1107–1107.2), en vigor 2026-01-01 | Desarrolladores fronterizos; el proceso anónimo vincula a grandes desarrolladores fronterizos | Sin norma, política o contrato que impida a los empleados cubiertos divulgar preocupaciones sobre riesgos catastróficos, y sin represalias; notificación de derechos; los grandes desarrolladores de frontera ejecutan un proceso interno anónimo con actualizaciones mensuales al denunciante, compartidas con los consejeros y directores al menos trimestralmente [56] | Canal de denuncia interno anónimo con actualizaciones de estado; registros de reconocimiento de notificación; resumen trimestral a consejeros y directores | 1 · 5 |
| New York RAISE Act (S6953B), firmada 2025-12-19 | Los desarrolladores de frontera (modelos entrenados por encima de 10^26 operaciones) denuncian incidentes en 72 horas; el deber del marco vincula a los grandes desarrolladores de frontera (ingresos anuales superiores a USD 500M); los umbrales de la enmienda del capítulo firmada 2026-03-27 | Publicar un marco de seguridad e IA de frontera; divulgar incidentes de seguridad en 72 horas. Una enmienda del capítulo firmada 2026-03-27 establece la fecha efectiva en 2027-01-01 y crea una oficina de supervisión dentro del Departamento de Servicios Financieros de Nueva York (DFS) [19][24][25] | Marco de IA de frontera publicado; canalización de denuncia e incidentes de 72 horas reportados a la oficina de supervisión del DFS | 5 · 4 |

### Otras leyes estatales de IA

Estas leyes estatales alcanzan más allá de los desarrolladores de frontera a desarrolladores,
responsables del despliegue y operadores ordinarios: Texas y Colorado; las leyes de datos de
entrenamiento, procedencia y chatbot complementario de California; las reglas complementarias de
Nueva York; Illinois; la Ley Local 144 de la Ciudad de Nueva York; y Utah
[55][84][85][86][88][89][90][91]. El capítulo 21 establece cada una con su aplicación en su
[tabla de leyes estatales](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
y compara las reglas de contratación en
[una herramienta de contratación, cuatro regímenes](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes).

| Ley | Alcance | Obligación | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| Texas TRAIGA (HB 149), en vigor 2026-01-01 | Desarrolladores y responsables del despliegue que hacen negocios en Texas | Prohibiciones basadas en intención de desarrollar o desplegar IA (manipulación del comportamiento, discriminación ilegal); puntuación social prohibida para entidades gubernamentales; divulgación de uso de IA por agencias gubernamentales y proveedores de atención médica; un espacio controlado de pruebas regulatorio; aplicación del Fiscal General; reglas de IA locales preemptidas [35] | Política de uso prohibido como código; controles de divulgación de uso de IA; manejo de quejas e incidentes | 1 · 4 |
| Colorado SB 26-189 (tecnología de toma de decisiones automatizada), efectiva 2027-01-01, reemplazando SB 24-205 | Desarrolladores y responsables del despliegue de ADMT en decisiones consecuentes | Documentación del desarrollador para responsables del despliegue y notificación de actualizaciones materiales; notificación del responsable del despliegue del uso de ADMT; una explicación en lenguaje sencillo dentro de 30 días de un resultado adverso; corrección, revisión humana y reconsideración; registros mantenidos al menos tres años. SB 26-189 (firmada 2026-05-14) derogó y re-promulgó SB 24-205, cuyo deber de diligencia contra la discriminación algorítmica había sido retrasado a 2026-06-30 y cuya aplicación un tribunal federal había bloqueado [36][55] | Inventario de ADMT; paquete de documentación del desarrollador; plantillas de notificación y explicación de resultado adverso; cola de revisión humana; almacén de registros de tres años | 2 · 4 · 5 |
| California AB 2013 (transparencia de datos de entrenamiento), vencimiento 2026-01-01 | Desarrolladores de sistemas de IA generativa lanzados desde 2022-01-01 | Los desarrolladores publican un resumen de los conjuntos de datos utilizados para entrenar un sistema de IA generativa puesto a disposición de los californianos (fuentes, tamaño, tipos de datos, información de PI y personal, datos sintéticos) en o antes de 2026-01-01 y en cada modificación sustancial [84] | Ficha de datos por conjunto de datos, publicada en el lanzamiento; registro de derechos de datos de entrenamiento | 2 |
| California AI Transparency Act (SB 942 enmendada por AB 853), operativa 2026-08-02 | Proveedores cubiertos de sistemas públicos de IA generativa; grandes plataformas en línea; fabricantes de dispositivos de captura | Los proveedores cubiertos ofrecen una herramienta gratuita de detección de IA e incrustan divulgaciones latentes, con una divulgación de manifiesto opcional, en imágenes, videos y audio generados; las grandes plataformas en línea y dispositivos de captura siguen después [85] | Canalización de procedencia escribiendo metadatos latentes; punto final de detección público; visualización de procedencia del lado de la plataforma | 3 · 4 |
| California SB 243 (chatbots complementarios), chaptered 2025-10-13 | Operadores de chatbots complementarios | Divulgar IA donde una persona razonable podría ser engañada; para menores conocidos, recordar al menos cada tres horas y prevenir contenido sexualmente explícito; ejecutar un protocolo de suicidio y autolesión con derivación de crisis; informes anuales desde 2027-07-01 [86] | Política de modo complementario; temporizador de recordatorio; clasificador de derivación de crisis y registro; informe anual | 1 · 4 · 5 |
| New York GBL Article 47 (modelos de compañero de IA), en vigor 2025-11-05 (verificar) | Operadores de compañeros de IA | Detectar ideación suicida y autolesión y derivar usuarios a servicios de crisis; decirles a los usuarios que no están hablando con un humano al inicio y al menos cada tres horas [88] | Clasificador de derivación de crisis y registro; temporizador de notificación | 4 · 5 |
| Illinois HB 3773 (enmienda de la Ley de Derechos Humanos), efectiva 2026-01-01 | Empleadores | Los empleadores no pueden usar IA con un efecto discriminatorio en clases protegidas en reclutamiento, contratación, promoción, disciplina u otros términos de empleo, ni códigos ZIP como proxy, y deben notificar a empleados y solicitantes [89][118] | Inventario de IA en RRHH; eval de impacto adverso por clase protegida; registro de notificación | 2 · 3 · 4 |
| NYC Local Law 144 (herramientas de decisión de empleo automatizadas), aplicada desde 2023-07-05 | Empleadores y agencias de empleo que utilizan AEDTs para funciones de la Ciudad de Nueva York | Una auditoría de sesgo independiente dentro de un año antes del uso, un resumen publicado de los resultados, y notificación a candidatos y empleados 10 días hábiles antes del uso [90] | Eval de relación de impacto por sexo, raza/etnia y categoría interseccional; resumen de auditoría publicado; registro de notificación | 3 · 5 |
| Ley de divulgación de IA de Utah (SB 226), efectiva 2025-05-07 | Proveedores que utilizan IA generativa en transacciones de consumidor; ocupaciones reguladas | Divulgar IA generativa cuando una persona lo solicita clara e inequívocamente; las ocupaciones reguladas lo divulgan de manera prominente en una interacción de IA de alto riesgo; la divulgación clara al inicio es un puerto seguro [91] | Componente de divulgación con una bandera de riesgo de interacción; registro de conversación mostrando la divulgación | 4 |

### Leyes de privacidad estatal y de sector

Los estatutos de privacidad estatal alcanzan la IA a través de exclusiones de perfilado,
evaluaciones, derechos de consentimiento y revisión, y una ley de sector alcanza los modelos de
aseguradoras. El capítulo 19 los compara en [Estados Unidos](/bok/privacy-and-ai#united-states) y el
capítulo 20 cubre
[vivienda, seguros y servicios públicos](/bok/existing-law#housing-insurance-and-public-services).

| Ley | Alcance | Obligación | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| Regulaciones CPPA de California (ADMT), deberes desde 2027-01-01 | Empresas sujetas a la CCPA | Las empresas que utilizan ADMT para decisiones significativas dan un aviso previo al uso, una exclusión o una apelación humana, y acceso a información sobre el ADMT [87] | Registro de ADMT; notificación previa al uso; flujo de trabajo de exclusión o apelación; respuesta de acceso a ADMT | 2 · 4 · 5 |
| Regulaciones CPPA de California (evaluaciones de riesgo), efectivas 2026-01-01 | Empresas sujetas a la CCPA | Una evaluación de riesgo antes de procesar que presenta riesgo significativo, incl. usar ADMT para decisiones significativas; atestaciones y resúmenes presentados a la Agencia [87] | Evaluación de riesgo por actividad desencadenante; registro de presentación | 5 |
| Virginia CDPA (§ 59.1-580), desde 2023-01-01 | Responsables del tratamiento | Los responsables del tratamiento documentan evaluaciones de protección de datos para publicidad dirigida, venta, perfilado que presenta un riesgo razonablemente previsible, y datos sensibles, para el procesamiento creado después de 2023-01-01, y los entregan al Fiscal General bajo solicitud [93] | Plantilla de evaluación por actividad de procesamiento; registro de perfilado | 1 · 5 |
| Colorado Privacy Act (SB21-190), efectiva 2023-07-01 | Responsables del tratamiento | Los consumidores pueden excluirse del perfilado en furtherance de decisiones con efectos legales o similarmente significativos, incl. a través de un mecanismo de exclusión universal; los responsables del tratamiento ejecutan evaluaciones de protección de datos para el procesamiento que presenta un riesgo elevado [94] | Bandera de exclusión honrada en inferencia; plantilla de evaluación; banderas de clase de datos de intake | 1 · 2 · 4 · 5 |
| Minnesota CDPA (§ 325M.14), efectiva 2025-07-31 | Responsables del tratamiento | Un consumidor puede cuestionar el resultado del perfilado, ser informado de la razón, revisar los datos personales utilizados, corregirlos y tener la decisión reevaluada [95] | Flujo de trabajo de razón y revisión con reevaluación en datos corregidos | 4 · 5 |
| Illinois BIPA (740 ILCS 14), en vigor 2008-10-03 | Entidades privadas | Consentimiento escrito informado antes de recopilar identificadores biométricos, un cronograma de retención y destrucción, y almacenamiento seguro; un derecho de acción privada con daños estatutarios [96][119] | Captura de consentimiento escrito; cronograma de retención como código; registro de destrucción | 1 · 2 |
| Washington My Health My Data Act (RCW 19.373), desde 2024-03-31 | Entidades reguladas | Consentimiento para recopilar y consentimiento separado para compartir datos de salud del consumidor, incl. datos derivados o extrapolados por algoritmos o aprendizaje automático, y una autorización firmada para cualquier venta [97] | Registros de consentimiento separados para recopilación y compartición; autorización de venta firmada; banderas de intake para datos de salud derivados | 1 · 2 |
| Colorado SB21-169 (aseguradoras), efectiva 2021-09-07 | Aseguradoras | Las aseguradoras no pueden discriminar injustamente a través de datos de consumidor externos, algoritmos o modelos predictivos; mantienen un marco de gestión de riesgos, prueban la discriminación injusta y presentan una atestación del oficial de riesgo jefe bajo reglas adoptadas por línea de seguros [92] | Inventario de fuentes de datos externos y modelos; pruebas de disparidad; registro de atestación del oficial de riesgo jefe | 2 · 3 · 5 |

### Ley federal que ya alcanza la IA

Las agencias federales están vinculadas por memorandos de OMB [98][99]. Para organizaciones
privadas, las reglas federales que alcanzan la IA son leyes antiguas y neutrales en tecnología:
avisos de acción adversa en préstamos e informes de crédito, impacto desproporcionado en empleo, la
prohibición de la Ley FTC sobre prácticas engañosas, y el deber de eliminación de la Ley TAKE IT
DOWN [100][101][102][103][104][105][106]. El capítulo 21 cubre
[la capa federal](/bok/ai-laws-worldwide#united-states-the-federal-layer); el capítulo 16 construye
los códigos de razón de
[avisos de acción adversa de crédito](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)
y la
[regla de cuatro quintos](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
el capítulo 20 cubre
[sustanciación de reclamaciones](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement)
y [falsificaciones profundas y medios sintéticos](/bok/existing-law#deepfakes-and-synthetic-media).

| Ley | Alcance | Obligación | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| OMB M-25-21 (uso federal de IA), emitida 2025-04-03 | Agencias federales estadounidenses (sus proveedores de IA por contrato) | Las agencias federales aplican prácticas mínimas a la IA de alto impacto: pruebas previas al despliegue, una evaluación de impacto de IA, monitoreo continuo, capacitación del operador, supervisión humana con un fail-safe donde sea practicable, recursos o apelaciones, y consulta de usuarios finales, documentado dentro de 365 días [98] | Entrada de inventario de caso de uso; informe de prueba previa al despliegue; evaluación de impacto de IA; plan de monitoreo; ruta de apelación | 2 · 3 · 4 · 5 |
| OMB M-26-04 (adquisición de LLM), emitida 2025-12-11 | Agencias federales estadounidenses y proveedores de LLM | Las solicitudes de modelos de lenguaje grande solicitan, como mínimo, la política de uso aceptable del proveedor, fichas de modelo, sistema o datos, recursos para usuarios finales y un mecanismo de retroalimentación [99] | Política de uso aceptable; fichas de modelo, sistema o datos; recursos para usuarios finales; canal de retroalimentación | 2 · 5 |
| ECOA Regulation B (`12 CFR 1002.9`) | Acreedores | Un acreedor que toma una medida adversa proporciona una declaración de razones principales específicas, o el derecho a una dentro de 30 días; citar estándares internos o una puntuación fallida es insuficiente, sea cual sea el modelo que tomó la decisión [100] | Servicio de código de razón versionado con el modelo; eval de fidelidad del código de razón; plantilla de notificación | 3 · 4 · 5 |
| FCRA (`15 U.S.C. 1681m(a)`) | Usuarios de informes de consumidor | Un usuario de un informe de consumidor que toma una medida adversa da notificación, divulga la puntuación de crédito numérica utilizada y sus factores clave, nombra la agencia de informes y declara el derecho a un informe gratuito y a disputar [101] | Registro de puntuación y factores clave por decisión adversa; plantilla de notificación | 4 |
| Título VII s. 703(k) y UGESP (`29 CFR 1607.4(D)`) | Empleadores | Un procedimiento de selección con impacto dispar es ilegal a menos que esté relacionado con el trabajo y sea coherente con la necesidad comercial, y aún se puede requerir una alternativa menos discriminatoria; una tasa de selección inferior a cuatro quintos de la tasa del grupo más alto se considera generalmente evidencia de impacto adverso [102][103] | Eval de ratio de impacto adverso por grupo con conteos e intervalos de confianza; validación de relación con el trabajo; registro de búsqueda de alternativas | 3 · 5 |
| Ley FTC s. 5 (`15 U.S.C. 45`) | Empresas que hacen afirmaciones sobre IA | Los actos o prácticas engañosos son ilegales: las afirmaciones sobre la precisión, el rendimiento o la equidad de un sistema de IA necesitan evidencia competente y confiable antes de hacerse [104][105] | Registro de afirmaciones vinculado a ejecuciones de eval actuales; puerta de sustanciación en la copia de lanzamiento | 1 · 3 · 5 |
| Ley TAKE IT DOWN (Ley Pública 119-12), proceso vencido 2026-05-19 | Plataformas cubiertas | Las plataformas cubiertas ejecutan un proceso de notificación y eliminación y eliminan imágenes íntimas no consentidas reportadas, incl. falsificaciones generadas por IA, y copias idénticas conocidas dentro de 48 horas de una solicitud válida [106] | Tubería de retirada con reloj de 48 horas, propietario y registro; coincidencia de copias idénticas | 4 · 5 |

## Otras jurisdicciones

La columna vertebral del mapa es el Reglamento de IA de la UE, pero una función de gobernanza que
funciona a través de fronteras responde a más de un régimen. Estas filas están marcadas a partir de
2026-09-24; donde una regla aún se está moviendo, la copia lo dice.

| Jurisdicción / instrumento | Estado (a partir de 2026-09-24) | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| Corea del Sur: Ley Básica de IA | En vigor 2026-01-22 [34], con su Decreto de Ejecución [62]; el ministerio (MSIT) anunció un período de orientación de al menos un año en el que la búsqueda de hechos y las multas se retienen excepto en casos excepcionales, mientras se aplican los deberes [58]; detalle en [capítulo 21](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act) | Deberes básicos para operadores de IA, deberes reforzados para IA de "alto impacto" en sectores sensibles, y etiquetado de contenido de IA | Registro de riesgos para IA de alto impacto; notificación de uso de IA; etiquetado de contenido de IA | 1 · 2 · 4 |
| Singapur: Marco de Gobernanza de IA de IMDA para IA Generativa | Voluntario; publicado mayo 2024 [39] | Dimensiones de gobernanza incl. pruebas, transparencia, notificación de incidentes, seguridad y procedencia del contenido | Suite de eval; fichas de modelo; procedencia del contenido y marca de agua | 2 · 3 · 4 |
| ETSI EN 304 223 (Securing AI) | Publicado (V2.1.1, dic 2025) [40] | Requisitos de ciberseguridad de línea base en todo el ciclo de vida de la IA (13 principios en cinco etapas) | Controles de seguridad del sistema de IA en todo el ciclo de vida; comprobaciones de cadena de suministro y AIBOM; endurecimiento en tiempo de ejecución | 4 |
| Singapur: Marco de Gobernanza de IA de IMDA para IA Agéntica (identidad y autorizaciones) | Voluntario; versión 1.5 publicada 2026-05-20 [107] | Cada agente tiene una identidad única, contabilizada, catalogada y gestionada centralmente; las autorizaciones están limitadas, vinculadas al tiempo o sesión, no transferibles y limitadas por el humano que autoriza | Registro de agentes con una identidad de carga de trabajo por agente; credenciales delegadas de corta duración nunca más amplias que el usuario | 2 · 4 |
| Singapur: Marco de Gobernanza de IA de IMDA para IA Agéntica (puntos de control humanos) | Voluntario; versión 1.5 publicada 2026-05-20 [107] | Puntos de control significativos para acciones de alto riesgo, irreversibles, atípicas y definidas por el usuario, con aprobaciones que son contextuales y digeribles y se aplican a través de controles a nivel de sistema | Clases de punto de control en la puerta de herramientas; registro de aprobación; métricas de supervisión | 4 · 5 |
| Canadá: Directiva sobre Toma de Decisiones Automatizada (instituciones federales) | En vigor desde 2019-04-01; modificado 2025-06-24 [108] | Completar, aprobar y publicar una evaluación de impacto algorítmico antes de la producción; aplicar los requisitos del Apéndice C para el nivel de impacto (notificación, explicación, revisión por pares, intervención humana); ofrecer recurso e informar sobre la efectividad | AIA publicada renderizada desde una base de hechos de impacto compartida; plantillas de notificación y explicación; registro de revisión por pares; ruta de recurso; disparadores de reevaluación como código | 1 · 2 · 5 |
| Brasil: LGPD `Art. 20` (revisión de decisiones automatizadas) | En vigor 2020-09-18 (verificar); sanciones desde 2021-08-01 [109] | Un titular de datos puede solicitar revisión de decisiones tomadas únicamente sobre procesamiento automatizado que afecten sus intereses, incl. elaboración de perfiles, y el responsable del tratamiento proporciona información clara sobre los criterios y procedimientos utilizados | Flujo de trabajo de revisión; declaración de criterios y procedimientos por sistema | 4 · 5 |

### Corea del Sur, artículo por artículo

Los deberes del operador de la Ley Básica de IA se encuentran en los Artículos 31 a 36, con la
mecánica en el Decreto de Ejecución [34][62]. Todos ellos se han aplicado desde el 22 de enero de
2026; lo que MSIT retiene durante su período de orientación de al menos un año es la búsqueda de
hechos y las multas, no los deberes [58]. El capítulo 21 recorre cada artículo en
[Corea del Sur: la Ley Básica de IA](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act).

| Artículo | Quién está vinculado | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| `Art. 31(1)` | Operadores de negocios de IA | Informar a los usuarios con anticipación de que un producto o servicio se ejecuta en IA de alto impacto o generativa, en el producto, los términos, la pantalla o el lugar de suministro (Decreto Art. 23(1)); una notificación faltante es sancionable (Art. 43) [34][62] | Componente de notificación en UI, términos y contratos; inventario de notificaciones por superficie de usuario | 2 · 4 |
| `Art. 31(2)–(3)` | Operadores que proporcionan IA generativa | Indicar que los resultados son generados por IA, y notificar o etiquetar sonido, imágenes o video sintético realista para que los usuarios puedan reconocerlos; una marca únicamente legible por máquina necesita al menos una notificación de texto o voz (Decreto Art. 23(2)–(3)) [34][62] | Tubería de procedencia: etiqueta visible o marca legible por máquina más al menos una notificación de texto o voz | 3 · 4 |
| `Art. 32` | Operadores de sistemas de computación calificados | Sistemas con al menos 10^26 FLOP de computación de entrenamiento acumulada, construidos con la tecnología más avanzada y que plantean riesgo amplio y grave (Decreto Art. 24), identificar, evaluar y mitigar riesgos en todo el ciclo de vida e informar los resultados a MSIT [34][62] | Registro de riesgos del ciclo de vida; monitoreo de incidentes de seguridad; informe de resultados a MSIT | 3 · 4 · 5 |
| `Art. 33` | Operadores de negocios de IA | Revisar con anticipación si un sistema es IA de alto impacto y opcionalmente pedir a MSIT que confirme; MSIT responde dentro de 30 días, extensible una vez (Decreto Art. 25) [34][62] | Registro de decisión de clasificación por sistema: área Art. 2(4), razón de riesgo, descripción general de datos de entrenamiento, respuesta de MSIT | 1 · 2 |
| `Art. 34` | Operadores de IA de alto impacto | Un plan de gestión de riesgos, un plan de explicación, un plan de protección del usuario, gestión y supervisión humana, y documentos que muestren las medidas; publicar el contenido principal y mantener la evidencia durante cinco años (Decreto Art. 27) [34][62] | Planes de gestión de riesgos, explicación y protección del usuario; supervisor humano nombrado; resumen publicado; almacén de evidencia de cinco años | 1 · 2 · 4 · 5 |
| `Art. 35` | Operadores de IA de alto impacto | Esforzarse por evaluar el efecto sobre los derechos fundamentales antes de proporcionar IA de alto impacto, cubriendo los siete elementos del Decreto Art. 28 [34][62] | Evaluación de impacto que lleva los siete elementos del decreto | 1 · 5 |
| `Art. 36` | Operadores de negocios de IA extranjeros por encima de un umbral | Un operador sin dirección o establecimiento en Corea que cumple un umbral de decreto (ingresos, ingresos de servicio de IA, usuarios diarios o una multa anterior; Decreto Art. 29) designa un representante doméstico por escrito e informa a MSIT [34][62] | Designación presentada ante MSIT; manual de acceso a evidencia para el representante | 5 |

### Reino Unido

El Reino Unido no tiene una ley de IA horizontal. Gobierna la IA a través de reguladores sectoriales
existentes (la ICO, la FCA, la MHRA y otros), coordinados centralmente, más el
**Instituto de Seguridad de IA** (renombrado del Instituto de Seguridad de IA en febrero de 2025)
para evaluación de modelos fronterizos [38]. Para la toma de decisiones automatizada, la Ley de
Datos (Uso y Acceso) de 2025 reemplazó el Artículo 22 del RGPD del Reino Unido con nuevos
**Artículos 22A–22D** (en vigor 5 de febrero de 2026): un modelo de permiso más salvaguardas para
decisiones significativas, únicamente automatizadas, con condiciones más estrictas donde se utilizan
datos de categorías especiales. Las salvaguardas (una ruta de revisión humana significativa, un
canal para hacer representaciones y para impugnar, y una notificación de decisión) son el artefacto
que el ingeniero construye [37]. El capítulo 19 establece los Artículos 22A–22D junto a los
regímenes RGPD y estadounidenses en
[los regímenes lado a lado](/bok/privacy-and-ai#the-regimes-side-by-side), y el capítulo 16
convierte las salvaguardas en registros de explicación y contestación en
[protección de datos: el RGPD y el régimen del Reino Unido](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).
La ley de consumidor del Reino Unido llega a las reseñas generadas por IA: la Ley de Mercados
Digitales, Competencia y Consumidores de 2024 prohíbe reseñas falsas e incentivadas ocultamente
desde el 6 de abril de 2025 [111], enseñado en el capítulo 20 bajo
[el Reino Unido: Ley DMCC](/bok/existing-law#the-united-kingdom-dmcc-act).

| Jurisdicción / instrumento | Estado (a partir de 2026-09-24) | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| Reino Unido: Ley de Datos (Uso y Acceso) de 2025, Artículos 22A–22D del RGPD del Reino Unido | En vigor 2026-02-05 [37] | Un modelo de permiso más salvaguardas para decisiones significativas, únicamente automatizadas, con condiciones más estrictas donde se utilizan datos de categorías especiales | Salvaguardas de ADM: ruta de revisión humana significativa, canal de contestación y representación, notificación de decisión | 4 · 2 |
| Reino Unido: Ley de Mercados Digitales, Competencia y Consumidores de 2024, s. 225 y Sch. 20 para. 13 | En vigor 2025-04-06 [111] | Las prácticas comerciales desleales están prohibidas, y el Anexo 20 prohíbe presentar o encargar reseñas de consumidor falsas y reseñas con incentivos ocultos, lo que llega a reseñas generadas por IA | Política que bloquea la generación de reseñas; registro de procedencia de reseñas | 1 · 4 |

### China

China gobierna la IA en dos niveles, y este mapa los mantiene separados. El nivel vinculante es un
conjunto de normas departamentales emitidas por la Administración del Ciberespacio de China (CAC)
con coemisores, sobre recomendación algorítmica (2022), síntesis profunda (2023), servicios de IA
generativa (2023) y el etiquetado de contenido sintético generado por IA (2025); varios son
territoriales, y las Medidas Provisionales para Servicios de IA Generativa se aplican solo a
servicios ofrecidos «al público dentro de la RPC» [43][44][45]. El deber de etiquetado está
respaldado por una norma nacional obligatoria, GB 45438-2025, que contiene los campos de metadatos
que la medida requiere [46][47]. El nivel voluntario es la norma recomendada GB/T 45654-2025 [48] y
el Marco de Gobernanza de Seguridad de IA TC260 [41][42]. La Ley de Ciberseguridad, enmendada por el
Comité Permanente de la APN el 2025-10-28 y en vigor desde 2026-01-01, añade un Artículo 20
programático sobre IA que no crea por sí mismo deberes del operador [49]; la norma vinculante más
reciente, las Medidas Provisionales para Servicios de Interacción Antropomórfica (en vigor
2026-07-15), es limitada en alcance (servicios que ofrecen interacción emocional sostenida); tiene
una fila a continuación y el capítulo 21 la expone bajo
[China: lo que el capítulo 08 no cubre ya](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover)
[50]. La información personal se rige por la Ley de Protección de Información Personal, cuyo
Artículo 24 sobre toma de decisiones automatizada también tiene una fila [110]. El marco 3.0 (14 de
septiembre de 2026) es un documento técnico TC260 publicado bajo orientación de la CAC y descrito
como «una referencia para desarrolladores, proveedores y usuarios»: establece una taxonomía de
riesgo de tres bloques (inherente, aplicación y secundario), califica el riesgo cualitativamente por
escenario, nivel de inteligencia y escala sin umbral de cómputo o parámetros, trata los modelos de
código abierto como un perfil de riesgo distinto y nombra la seguridad de poder computacional como
una categoría de riesgo, y su Apéndice 2 recorre el ciclo de vida del agente desde el diseño hasta
el desmantelamiento [42]. El comentario de profesionales reportó agentes y sistemas físicamente
interactivos como el cambio titular en la nueva versión [51].

Los instrumentos anteriores se resuelven en filas de obligación-a-artefacto con la misma forma que
las otras jurisdicciones:

| Jurisdicción / instrumento | Estado (a partir de 2026-09-20) | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| China: Disposiciones sobre la Administración de la Recomendación Algorítmica en Servicios de Información de Internet (Orden No. 9 de CAC, MIIT, MPS y SAMR) | Vinculante; en vigor desde 2022-03-01 [43] | Presentación de algoritmos para servicios con atributos de opinión pública o capacidad de movilización social, evaluación de seguridad, visualización del número de presentación, y una opción del usuario para desactivar la recomendación personalizada | Inventario de algoritmos con registro de presentación y número; paquete de evidencia de evaluación de seguridad; control de exclusión en tiempo de ejecución | 1 · 2 · 4 |
| China: Disposiciones sobre la Administración de la Síntesis Profunda en Servicios de Información de Internet (Orden No. 12 de CAC, MIIT y MPS) | Vinculante; en vigor desde 2023-01-10 [44] | Etiquetas conspicuas donde el contenido sintético podría engañar al público y marcas técnicas no removibles; gestión de datos de entrenamiento; consentimiento separado para edición de cara y voz; presentación y evaluación de seguridad para funciones de formación de opinión | Tubería de procedencia de contenido (etiqueta visible más marca de metadatos); registro de gobernanza de datos de entrenamiento; puerta de consentimiento; evaluación de seguridad previa al lanzamiento | 2 · 3 · 4 |
| China: Medidas Provisionales para la Administración de Servicios de IA Generativa (CAC y otros seis organismos, Orden No. 15) | Vinculante; en vigor desde 2023-08-15; se aplica a servicios ofrecidos al público dentro de la RPC [45] | Datos de entrenamiento de fuente lícita y modelos fundacionales; etiquetado de contenido conforme a las normas de síntesis profunda; evaluación de seguridad y presentación de algoritmos para servicios de formación de opinión; detener, eliminar, reentrenar e informar sobre contenido ilegal | Registro de linaje de datos y licencia; puerta de eval en contenido generado; tubería de incidentes con bucle de reentrenamiento; registro de presentación | 2 · 3 · 4 · 5 |
| China: Medidas para el Etiquetado de Contenido Sintético Generado por IA, con norma nacional obligatoria GB 45438-2025 | Vinculante; en vigor desde 2025-09-01, la norma implementada el mismo día [46][47] | Etiquetas explícitas (texto, audio o gráfico) y etiquetas de metadatos implícitas que llevan el nombre o código del proveedor y un número de contenido; las plataformas de distribución verifican metadatos e indican contenido sospechoso de IA | Tubería de procedencia y marca de agua que emite los campos de metadatos GB 45438; detección e indicación del lado de la plataforma | 3 · 4 |
| China: GB/T 45654-2025 Requisitos básicos de seguridad para servicios de IA generativa | Norma nacional recomendada (voluntaria); implementada 2025-11-01 [48] | Fuente del corpus de entrenamiento y cribado de contenido, requisitos de seguridad del modelo y los métodos de evaluación que respaldan la evaluación de seguridad | Registro de cribado de corpus; bancos de preguntas de eval; informe de evaluación de seguridad | 3 · 5 |
| China: Marco de Gobernanza de Seguridad de IA TC260 3.0 | Voluntario; publicado 2026-09-14, basándose en 1.0 (2024) y 2.0 (2025) [41][42] | Una taxonomía de riesgo de tres bloques (inherente, aplicación, secundario), contramedidas tecnológicas y de gobernanza y directrices basadas en roles; los operadores mantienen registros durante al menos seis meses y los auditan, monitorean el riesgo en tiempo real, mantienen una cadena de responsabilidad trazable y evalúan la resiliencia (§5.3) | Registro de riesgo codificado según la taxonomía del marco; política de retención de registros (seis meses) con auditoría; monitoreo de riesgo en tiempo real; evaluación de resiliencia | 1 · 4 · 5 |
| China: Ley de Protección de Información Personal, Arts. 24 y 55–56 | Vinculante; en vigor desde 2021-11-01 [110] | Las decisiones automatizadas permanecen transparentes y justas, sin trato diferencial irrazonable en precios o términos; los empujes dirigidos ofrecen una opción no personalizada o un rechazo fácil; los individuos pueden solicitar una explicación y rechazar decisiones únicamente automatizadas con un impacto significativo; una evaluación de impacto de antemano, conservada al menos tres años | Servicio de explicación y ruta de decisión manual; opción no personalizada en tiempo de ejecución; registro de evaluación de impacto conservado tres años | 2 · 4 · 5 |
| China: Medidas Provisionales para la Administración de Servicios de Interacción Antropomórfica (CAC, NDRC, MIIT, MPS y SAMR) | Vinculante; en vigor desde 2026-07-15 [50] | Un modo para menores; señales de IA y un recordatorio después de dos horas de uso continuo; una salida fácil; una evaluación de seguridad en 1 millón de usuarios registrados o 100.000 usuarios activos mensuales; presentación | Configuración de modo para menores; temporizador de recordatorio; monitor de umbral de recuento de usuarios; informe de evaluación de seguridad; registro de presentación | 1 · 2 · 4 · 5 |
| China: Marco TC260 3.0, Apéndice 2 (gestión de riesgo de IA agéntica) | Voluntario; publicado 2026-09-14 [42] | Identidad única y permisos de menor privilegio por agente según modo de decisión; puntos de control humanos con registros de aprobación a prueba de manipulación y denegación por defecto; verificación de herramienta y habilidad; guardrails en tiempo de ejecución (alerta, restricción, intercepción, suspensión, terminación); aislamiento de memoria sin credenciales en memoria; autenticación mutua; validación de sandbox, red teaming y revalidación en cambio importante; desmantelamiento controlado | Registro de agentes con identidad y alcance; almacén de registro de aprobación; lista de permitidos de herramienta con comprobaciones de integridad; guardrails en tiempo de ejecución e interruptor de emergencia; política de alcance de memoria; runbook de desmantelamiento | 2 · 3 · 4 · 5 |

Los controles de agentes del Apéndice 2 se alinean con las dos referencias agénticas que este
capítulo ya lleva, el Top 10 de OWASP para Aplicaciones Agénticas [16] y la Iniciativa de Estándares
de Agentes de IA de NIST [29]:

| Control de agente | Marco TC260 3.0, Apéndice 2 [42] | Top 10 de OWASP para Aplicaciones Agénticas 2026 [16] | Iniciativa de Estándares de Agentes de IA de NIST [29] | Capa |
|---|---|---|---|---|
| Identidad y menor privilegio | II.2: identidad única por agente, permisos por modo de decisión, credenciales revocadas al final de la tarea | ASI03 Abuso de Identidad y Privilegio | Identidad de agente, autenticación, autorización | 2 · 4 |
| Puntos de control humanos y registros de aprobación | II.3: controles escalonados, puntos de control humano, registros de aprobación a prueba de manipulación, denegación por defecto | ASI09 Explotación de Confianza Humano-Agente; ASI01 Secuestro de Objetivo de Agente | Ninguno | 4 · 5 |
| Herramientas, habilidades y cadena de suministro | II.4: verificación de herramienta, selección justa de herramienta, detección de anomalías, gestión de habilidades | ASI02 Mal Uso y Explotación de Herramienta; ASI04 Vulnerabilidades de Cadena de Suministro Agéntica | Seguridad de agente | 2 · 4 |
| Guardrails en tiempo de ejecución y límites de ejecución | II.5(1)(2)(5)(6): control de entrada, guardrails, límites de paso/frecuencia/duración, aislamiento de sandbox | ASI01 Secuestro de Objetivo de Agente; ASI05 Ejecución de Código Inesperada (RCE); ASI08 Fallos en Cascada; ASI10 Agentes Rogue | Ninguno | 4 |
| Memoria | II.5(3): ventanas de retención, aislamiento entre usuarios y tareas, sin credenciales en memoria | ASI06 Envenenamiento de Memoria y Contexto | Ninguno | 3 · 4 |
| Comunicación agente–modelo–herramienta | II.5(4): autenticación mutua, integridad, resistencia a repetición | ASI07 Comunicación Insegura Entre Agentes | Autenticación | 4 |
| Monitoreo, auditoría, sandbox, red teaming, respuesta a incidentes | II.6: bloqueo de anomalías, gestión de registros, auditoría de seguridad, validación de sandbox, red teaming, planes de emergencia, revalidación en cambio importante | Transversal | Evals de agente adversarial | 3 · 5 |
| Desmantelamiento | II.7: apagado completo, copia de seguridad de datos, limpieza del entorno | ASI10 Agentes Rogue (agentes residuales) | Ninguno | 2 · 4 |

El capítulo 23 compara estas fuentes de control de agentes con las de la CSA y Singapur en
[marcos escritos para agentes](/bok/governing-agents#frameworks-written-for-agents).

### Tratado y derecho internacional blando

Tres instrumentos internacionales llevan deberes que un ingeniero puede evidenciar. El Convenio
Marco del Consejo de Europa (CETS No. 225) vincula a los Estados Partes, no a las empresas, y aún no
está en vigor; dentro de la UE se implementa a través del Reglamento de IA [112][113]. Los
Principios de IA de la OCDE, revisados el 3 de mayo de 2024, y el Código de Conducta de Hiroshima
del G7 del 30 de octubre de 2023 son voluntarios [114][115]. El capítulo 22 los enseña en
[lo que el Convenio pide](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack),
[los cinco principios y cinco recomendaciones](/bok/principles-and-standards#the-five-principles-and-five-recommendations)
y [el Proceso Hiroshima del G7](/bok/principles-and-standards#g7-hiroshima-process).

| Instrumento y cláusula | Estado (a partir de 2026-09-24) | Lo que pide | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| Convenio del Consejo de Europa `Art. 14(2)(a)–(b)` | No en vigor (a partir de 2026-09-24) [112][113] | Documentar información relevante sobre sistemas que pueden afectar significativamente a los derechos humanos, suficiente para que las personas afectadas puedan impugnar las decisiones | Registro de decisión por salida consecuente; ruta de impugnación con el registro adjunto | 2 · 5 |
| Convenio del Consejo de Europa `Art. 15(2)` | No en vigor (a partir de 2026-09-24) [112][113] | Notificar a las personas que están interactuando con un sistema de IA, según corresponda | Divulgación de interacción aplicada en tiempo de ejecución | 4 |
| Convenio del Consejo de Europa `Art. 16(1)–(2)(a)–(f)` | No en vigor (a partir de 2026-09-24) [112][113] | Gestión iterativa y graduada de riesgo e impacto: contexto, severidad y probabilidad, puntos de vista de las partes interesadas, monitoreo y documentación | Registro de riesgo como código; evaluación de impacto vinculada al registro; monitoreo contra una línea de base | 1 · 2 · 4 |
| Convenio del Consejo de Europa `Art. 16(2)(g)` | No en vigor (a partir de 2026-09-24) [112][113] | Probar sistemas antes del primer uso y cuando se modifiquen significativamente, según corresponda | Eval gate en lanzamiento y en cambio material | 3 |
| OECD AI Principles, principio 1.4(b) | No vinculante; revisado 2024-05-03 [114] | Los mecanismos permiten que los sistemas de IA que riesgan causar daño indebido sean anulados, reparados o/y desmantelados de forma segura | Kill switch probado; registro de desmantelamiento en el registro | 2 · 4 |
| OECD AI Principles, principio 1.5(b)–(c) | No vinculante; revisado 2024-05-03 [114] | Trazabilidad de conjuntos de datos, procesos y decisiones, y gestión sistemática de riesgos en cada fase del ciclo de vida | Almacén de evidencia indexado por ids del registro; registro de riesgos como código; registros de proveedores | 1 · 5 |
| G7 Hiroshima Code of Conduct, acción 1 | Voluntario; acordado 2023-10-30 [115] | Identificar, evaluar y mitigar riesgos a lo largo del ciclo de vida, incl. pruebas antes del despliegue | Suite de red team adversarial; eval gate | 3 |
| G7 Hiroshima Code of Conduct, acciones 2 y 4 | Voluntario; acordado 2023-10-30 [115] | Identificar y mitigar vulnerabilidades, incidentes y uso indebido después del despliegue, e intercambiar información e informar de incidentes de forma responsable | Monitoreo en tiempo de ejecución; pipeline de incidentes con una rama de intercambio externo | 4 · 5 |
| G7 Hiroshima Code of Conduct, acción 3 | Voluntario; acordado 2023-10-30 [115][116] | Informar públicamente sobre capacidades, limitaciones y usos apropiados e inapropiados; el marco de informes de la OCDE ha recopilado tales informes desde 2025 | Ficha de modelo publicada desde el registro | 2 |
| G7 Hiroshima Code of Conduct, acción 7 | Voluntario; acordado 2023-10-30 [115] | Desplegar mecanismos de autenticación de contenido y trazabilidad de origen donde sea viable | Marcado de trazabilidad de origen en la salida; prueba de verificación | 4 |

Los mapeos son ilustrativos, no una afirmación de conformidad.

## Qué NO está armonizado aún

El mapa tiene un vacío, y es importante declararlo claramente en lugar de ocultarlo.

- **Ninguna norma armonizada se cita en el Diario Oficial.** A partir de 2026-09-24, la presunción
  de conformidad del artículo 40 no está disponible para nadie, porque ninguna norma armonizada ha
  sido citada en el DO [20].
- **EN 18286 está publicada pero no citada.** La norma de SGC del artículo 17 EN 18286:2026 fue
  publicada en julio de 2026 (la primera norma del JTC 21 sobre la Ley de IA en alcanzar
  publicación), pero aún no está citada en el Diario Oficial, por lo que no conlleva presunción de
  conformidad [20][21].
- **Los otros borradores del JTC 21 están en o antes de Consulta.** A partir de 2026-09-24, según lo
  informado por un punto de información de normas paneuropeo, las votaciones de Consulta sobre prEN
  18228 (`Art. 9`, gestión de riesgos) y prEN 18282 (`Art. 15`, ciberseguridad) cerraron el 30 de
  julio de 2026 y sobre prEN 18229-1 (`Art. 12`, registro) el 20 de agosto de 2026; prEN 18229-3
  (`Art. 14`, supervisión humana) entró en Consulta el 30 de julio de 2026; y prEN 18229-4 y -5
  (`Art. 15`, precisión y robustez) fueron aprobados como nuevos proyectos el 24 de junio de 2026
  [60], consistente con el rastreador público que los tenía en Consulta a mediados de 2026 [53]. CEN
  y CENELEC pueden publicar un entregable prioritario directamente después de una votación de
  Consulta positiva y dirigirse a Q4 2026 [61]; la publicación seguiría sin ser una citación en el
  DO. El capítulo 22 rastrea cada entregable y el
  [estado de las normas armonizadas del JTC 21](/bok/principles-and-standards#harmonised-standards-under-the-ai-act),
  y explica
  [cómo funciona la presunción de conformidad](/bok/principles-and-standards#how-presumption-of-conformity-works).
- **ISO/IEC 42001 no es el SGC del artículo 17.** Certificarse en EN ISO/IEC 42001:2026 evidencia un
  sistema de gestión de IA; no confiere una presunción de conformidad de la Ley de IA, porque no es
  una norma armonizada y su alcance difiere del SGC del artículo 17 [11][12].
- **El Código de Prácticas es voluntario.** Firmar el Código GPAI es una forma de demostrar
  cumplimiento con las obligaciones de GPAI; no es una presunción legal de conformidad [9].
- **El marco de China no hace referencias cruzadas a los instrumentos occidentales.** El Marco de
  Gobernanza de Seguridad de IA TC260 3.0 no cita ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF ni Ley
  de IA de la UE (sus puntos de referencia nombrados son la Iniciativa Global de Gobernanza de IA y
  canales centrados en la ONU), y tampoco nombra sus propias normas vinculantes [42]. Un mapeo
  cruzado entre los dos stacks es algo que el ingeniero construye; ninguno de los documentos de
  ambos lados lo proporciona.

El registro contiene los tres entregables del JTC 21 en los que se basa el libro, con su estado a
partir de 2026-09-24 [20][21][60]:

| Entregable | Qué es | Estado (a partir de 2026-09-24) | Artefacto de ingeniería | Capa |
|---|---|---|---|---|
| EN 18286:2026 | Requisitos de sistema de gestión de calidad que apoyan el art. 17; publicado pero no citado en el Diario Oficial, por lo que no conlleva presunción de conformidad | Publicado julio de 2026; no citado en el DO [21][20] | Los procesos del SGC se ejecutan como etapas de pipeline; evidencia de diseño y control de cambios | 1 · 5 |
| prEN 18228 | Norma armonizada en borrador para el sistema de gestión de riesgos del art. 9 | Borrador; votación de Consulta cerrada 2026-07-30, según lo informado [60] | Fichero de riesgos del proveedor por sistema; criterios de aceptabilidad como código; monitoreo de controles | 1 · 3 · 5 |
| prEN 18229-1 | Norma armonizada en borrador para el registro del art. 12 | Borrador; votación de Consulta cerrada 2026-08-20, según lo informado [60] | Especificación de registro por sistema; registros de eventos estructurados y firmados mapeados al borrador | 4 |

La lectura práctica: para el período que cubre esta edición, no puedes comprar una presunción de
conformidad lista para usar. Las filas de obligación-a-artefacto anteriores son cómo una función de
gobernanza evidencia la obligación por sus propios méritos mientras las normas armonizadas aún se
están escribiendo.

> **En la práctica (ilustrativo)**
> Un equipo de gobernanza mantuvo este mapa no como una diapositiva sino como un mapeo cruzado
> legible por máquina: un fichero versionado que vincula cada ID de obligación al artefacto que
> produjo su evidencia y la capa en la que residía, emitido como definiciones de componentes
> `OSCAL`. Cuando el Omnibus movió las fechas de alto riesgo, el cambio fue un diff a un campo por
> fila afectada, y cada línea "Maps to" posterior se re-resolvió desde el mismo fichero. La pregunta
> de auditoría "muéstrame qué responde al artículo 15" se convirtió en una consulta contra el mapeo
> cruzado, no una búsqueda a través de un wiki.

**Correspondencias:** este capítulo es el índice inverso para todo el libro; cada artículo de la Ley
de IA de la UE, el Código de Prácticas de GPAI, el RGPD, SRI2, DORA, la CRA, la Directiva de
Responsabilidad por Productos Defectuosos, DSM, Prácticas Comerciales Desleales, Trabajo en
Plataformas y Crédito al Consumo, la DSA, ISO/IEC 42001, 42005, 42006, 23894 y 22989, NIST AI RMF y
el trabajo más reciente de NIST AI, CSA AICM, OWASP GenAI/Agentic, los entregables del JTC 21 de
CEN-CENELEC, las leyes federales y estatales de EE.UU., las otras jurisdicciones y los instrumentos
de tratado y soft-law nombrados anteriormente se mapean al stack de cinco capas (capítulo 04) y el
catálogo de patrones (capítulo 05). Los mapeos son ilustrativos, no una afirmación de conformidad.

## Lo que puedes hacer esta semana

1. **Encuentra tus filas.** Para un sistema, enumera las filas de este mapa que se aplican a él, por
   rol y clase de riesgo, con la fecha a partir de la cual se aplica cada una.
2. **Nombra un artefacto por fila.** Junto a cada fila, escribe el artefacto que la evidencia hoy, o
   marca la brecha.
3. **Pon las fechas en el pipeline.** Almacena cada fecha aplicable como datos que tus
   comprobaciones de política leen, para que una obligación que comience a aplicarse aparezca como
   una comprobación fallida, no una sorpresa.
4. **Evidencia una obligación por sus propios méritos.** Para la obligación que más esperabas que
   una norma armonizada cubriera, anota cómo la evidencias hoy sin una presunción de conformidad.
5. **Re-lee en cambio.** Cuando una fecha o una fila en este mapa cambie, re-ejecuta el primer paso
   para tus sistemas y registra la diferencia.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1 amendments to Reg. (EU) 2024/1689: new Art. 4a (special-category data for bias detection, pseudonymisation, deletion once bias is corrected); new Art. 5(1)(ba)–(bb) NCII and CSAM bans from 2 Dec 2026; Art. 111(2) public-authority systems by 2 Aug 2030; new Art. 111(4) Art. 50(2) marking by 2 Dec 2026 for systems placed on the market before 2 Aug 2026; Art. 113 dates. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), Art. 101 (Commission fines for GPAI providers: up to 3% or EUR 15M) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; the reworded text applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] Regulation (EU) 2024/1689 (AI Act), Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[8] Regulation (EU) 2026/1744 (Digital Omnibus on AI), new Arts. 75a–75d of the AI Act: AI Office investigation powers, binding commitments, non-compliance decisions and periodic penalty payments up to 5% of average daily income or worldwide annual turnover per day (Art. 75c(5)). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[9] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[10] GPAI Code of Practice: contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] OWASP Top 10 for Agentic Applications for 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; names as in the document's contents, read 2026-09-24). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications (released 3 Aug 2026; Excessive Agency is LLM03:2026) and the Agent Control Standard (ACS), donated to the project. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[21] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026; amends Art. 3(14), 6(1a)–(1c), 25(2) and (4), 75(1), new 75(1a) (serious incidents of systems under the AI Office's competence reported to the AI Office), 99(4)(da), Annex I (machinery to Section B) and Annex VIII Section B (points 7 and 9 deleted); Art. 73 not amended; Art. 113(a) Chapters I and II apply from 2 Feb 2025; Art. 113(c) as replaced: Chapter III, Sections 1, 2 and 3, except Art. 6(5), apply from 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services; superseded in scope by the 2026 chapter amendment, which drops the cost test, adds a USD 500M revenue test and moves oversight to the DFS [25]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; large frontier developers publish the framework, all frontier developers report critical safety incidents; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[26] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template for serious-incident reporting under Art. 55; aligned to Commitment 9 of the GPAI Code). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[27] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1; who may credibly certify to 42001). ISO/IEC. 2025. https://www.iso.org/standard/42006 (verified: secondary)
[28] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[29] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI initiative; agent identity, authentication and security). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[30] NIST IR 8596 (initial preliminary draft; comments closed 2026-01-30; no later version on CSRC on 2026-09-24): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile); Secure / Defend / Thwart. NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[31] NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (voluntary; still in draft, no final version on NIST's publication server on 2026-09-24). NIST. 2025-01. https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models (verified: primary)
[32] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (names the Agentic Trust Framework, AARM, the Catastrophic Risk Annex and STAR for AI; no "Agentic Control Supplement" is named, checked 2026-09-24). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[33] AICM Catastrophic Risk Annex: enhanced AICM controls for high-autonomy systems with catastrophic-risk potential. Cloud Security Alliance. 2026-08-05. https://cloudsecurityalliance.org/csai-foundation/catastrophic-risk-annex (verified: primary)
[34] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; high-impact AI duties in Arts. 31 to 36; fact-finding in Art. 40; fines in Art. 43). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[35] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text; effective 1 Jan 2026. Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[36] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 30 Jun 2026, then replaced by SB 26-189, effective 1 Jan 2027). McDermott Will & Emery. 2026. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[37] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[38] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[39] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[40] ETSI EN 304 223: Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, Dec 2025; 13 principles across five lifecycle stages). ETSI. 2025-12. https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/ (verified: primary)
[41] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance; released 2026-09-14 at the 2026 National Cybersecurity Publicity Week). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[42] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF; English text printed pp. 49–130; §2.1.1(b) open-source models p. 55; §2.1.4(a) computing power p. 59; §5.3 operators' guidelines pp. 101–104; Appendix 2 agentic AI risk management pp. 113–126; no reference to ISO/IEC 42001, NIST AI RMF or the EU AI Act. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[43] Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (互联网信息服务算法推荐管理规定; CAC, MIIT, MPS and SAMR Order No. 9; promulgated 2021-12-31; in force 2022-03-01; Art. 17 opt-out, Art. 24 algorithm filing, Art. 27 security assessment). Cyberspace Administration of China. 2022-01-04. https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm (verified: primary)
[44] Provisions on the Administration of Deep Synthesis in Internet Information Services (互联网信息服务深度合成管理规定; CAC, MIIT and MPS Order No. 12; promulgated 2022-11-25; in force 2023-01-10; Arts. 14 training data and separate consent, 16–17 marks and labels, 19 filing, 15/20 security assessment). Cyberspace Administration of China. 2022-12-11. https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm (verified: primary)
[45] Interim Measures for the Administration of Generative AI Services (生成式人工智能服务管理暂行办法; CAC and six other bodies, Order No. 15; published 2023-07-13; in force 2023-08-15; Art. 2 scope: services to the public within the PRC; Art. 7 lawful-source data; Art. 12 labelling; Art. 14 stop-remove-retrain-report; Art. 17 security assessment and filing). Cyberspace Administration of China. 2023-07-13. https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm (verified: primary)
[46] Measures for Labelling AI-Generated Synthetic Content (人工智能生成合成内容标识办法; CAC, MIIT, MPS and NRTA; published 2025-03-14; in force 2025-09-01; explicit and implicit labels; platform verification duty). Cyberspace Administration of China. 2025-03-14. https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm (verified: primary)
[47] GB 45438-2025 Cybersecurity technology: Labeling method for content generated by artificial intelligence (网络安全技术 人工智能生成合成内容标识方法; mandatory national standard; issued 2025-02-28; implemented 2025-09-01). SAMR / SAC (drafted by TC260). 2025-02-28. https://std.samr.gov.cn/gb/search/gbDetailed?id=301E0388CB75788DE06397BE0A0AE1B4 (verified: primary)
[48] GB/T 45654-2025 Cybersecurity technology: Basic security requirements for generative artificial intelligence service (网络安全技术 生成式人工智能服务安全基本要求; recommended national standard; issued 2025-04-25; implemented 2025-11-01). SAMR / SAC (drafted by TC260). 2025-04-25. https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A (verified: primary)
[49] Cybersecurity Law of the PRC as amended by the NPC Standing Committee decision of 2025-10-28 (in force 2026-01-01; new Article 20 on AI: state support for AI research, training-data and computing infrastructure, AI ethics norms, risk monitoring, assessment and safety supervision). Cyberspace Administration of China (consolidated text). 2025-12-29. https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm (verified: primary)
[50] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; published 2026-04-10; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[51] "China's TC260 released Version 3.0 of the AI Safety Governance Framework" (LinkedIn post; agents and physically interactive systems as the headline change). Barbara Li (Reed Smith). 2026-09. https://www.linkedin.com/posts/barbara-li-67532067_tc260-ai-governance-share-7505863215600308224-XIyo/ (verified: reported)
[52] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[53] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[54] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[55] SB26-189 Automated Decision-Making Technology (signed by the Governor 14 May 2026; Session Laws chapter 131). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[56] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[57] Regulation (EU) 2024/1689 (AI Act): Art. 26(5) (a deployer that identifies a serious incident informs the provider first, then the importer or distributor and the market-surveillance authority; Art. 73 applies mutatis mutandis if it cannot reach the provider) and Art. 73(1)–(4) (report immediately on a causal link or its reasonable likelihood, and no later than 15, 2 or 10 days after the provider or, where applicable, the deployer becomes aware). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[58] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[59] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; no revised version published as of 2026-09-24). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[60] Project stages for JTC 21 deliverables read on 2026-09-24 (prEN 18228 and prEN 18282 Enquiry votes closed 2026-07-30; prEN 18229-1 closed 2026-08-20; prEN 18229-3 at Enquiry from 2026-07-30; prEN 18229-4 and -5 new projects 2026-06-24). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[61] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; Q4 2026 target). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[62] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[63] Regulation (EU) 2024/1689 (AI Act), consolidated text of 27 July 2026 incorporating Regulation (EU) 2026/1744 (Art. 3(1) AI system; Art. 6(3)–(4) documented non-high-risk assessment and Art. 49(2) registration; Art. 15(3)–(4) declared accuracy metrics and feedback loops; Art. 16(l) accessibility; Art. 17(1)(m) accountability framework; Art. 18 documentation kept 10 years; Art. 19 logs kept at least six months; Art. 20 corrective actions; Arts. 22–24 authorised representatives, importers and distributors; Art. 26(1)–(11) deployer duties; Art. 43(4) new assessment on substantial modification; Art. 48 CE marking; Art. 52 notification within two weeks; Art. 53(1)(c) copyright policy; Art. 54 authorised representative of GPAI providers; Art. 73(6) investigation without altering the system; Art. 86 right to explanation; Art. 87 Directive (EU) 2019/1937 applies; Art. 111(3) GPAI models placed on the market before 2 August 2025 comply by 2 August 2027; Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[64] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (internal reporting channels for private legal entities with 50 or more workers, Art. 8(3); acknowledgment within seven days and feedback within three months, Art. 9(1)). Publications Office of the EU (EUR-Lex). 2019-11-26. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[65] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, Measure 9.3: 2, 5, 10 and 15 days by incident class, intermediate reports at least every four weeks, final report within 60 days of resolution; Measure 9.4: records kept at least five years; Appendix 1.3 sources of systemic risk incl. the capability to operate autonomously, colluding with other AI systems, access to tools and the level of human oversight; Appendix 1.4 specified systemic risks incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[66] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 5(1)(b)–(c), 5(2), 6, 6(4), 7, 9, 13, 14, 15(1)(h), 16, 17, 21, 22, 25, 28, 30, 33–36, 44–49; applies from 25 May 2018, Art. 99(2)). Publications Office of the EU (EUR-Lex). 2016-05-04. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[67] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (legitimate-interest test; anonymity test and the evidence expected for a claim that a model is anonymous). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[68] Directive (EU) 2022/2555 (NIS2) (Art. 21(2)(c) business continuity and (d) supply-chain security; Art. 23(4) early warning within 24 hours, incident notification within 72 hours, final report within one month; Art. 41(1) measures applied from 18 October 2024). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[69] Regulation (EU) 2022/2554 (DORA) (Art. 19 reporting of major ICT-related incidents; Art. 28(3) register of information; Art. 28(8) exit strategies; Art. 64 applies from 17 January 2025). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[70] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits of major ICT-related incident reports (Art. 5(1): initial notification within four hours of classification and no later than 24 hours from awareness; Art. 5(2): within four hours of a classification made after those 24 hours; intermediate report within 72 hours of the initial notification; final report no later than one month after the latest intermediate report). Publications Office of the EU (EUR-Lex). 2025-02-20. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[71] Regulation (EU) 2024/2847 (Cyber Resilience Act) (Art. 14 reporting of actively exploited vulnerabilities and severe incidents: early warning within 24 hours, notification within 72 hours, final reports; Art. 71(2) applies from 11 December 2027, Art. 14 from 11 September 2026). Publications Office of the EU (EUR-Lex). 2024-11-20. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[72] Directive (EU) 2024/2853 on liability for defective products (Art. 2(1) products placed on the market or put into service after 9 December 2026; Art. 4(1) software is a product; Art. 9 disclosure of evidence; Art. 10 presumption of defectiveness; Art. 11(2) no exemption for defects due to software, its updates or the lack of safety updates within the manufacturer's control; Art. 22 transposition by 9 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-18. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[73] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(3) text-and-data-mining exception subject to an express reservation, by machine-readable means for content made publicly available online; Art. 29 transposition by 7 June 2021). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[74] Regulation (EU) 2022/2065 (Digital Services Act) (Art. 25 online interface design and organisation; Art. 27 recommender system transparency; applies from 17 February 2024). Publications Office of the EU (EUR-Lex). 2022-10-27. https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng (verified: primary)
[75] Directive 2005/29/EC (Unfair Commercial Practices Directive) (Art. 5 general prohibition; Arts. 6–7 misleading actions and omissions; Art. 19 measures applied by 12 December 2007), with Directive (EU) 2019/2161 adding Annex I points 23b and 23c on consumer reviews. Publications Office of the EU (EUR-Lex). 2005-06-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj/eng (verified: primary)
[76] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 7 limits on processing by automated systems; Art. 9 transparency; Art. 10 human oversight and an impact evaluation at least every two years; Art. 11 explanation and human review; Art. 29 transposition by 2 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-11. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[77] Directive (EU) 2023/2225 on credit agreements for consumers (Art. 18(8) human intervention, explanation and review where the creditworthiness assessment involves automated processing; Art. 48 measures applied from 20 November 2026). Publications Office of the EU (EUR-Lex). 2023-10-30. https://eur-lex.europa.eu/eli/dir/2023/2225/oj/eng (verified: primary)
[78] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (AI stakeholder roles; AI system life cycle). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[79] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV, MP, MS and MG). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[80] AICM v1.1.1 and AI-CAIQ machine-readable bundle (JSON, YAML, OSCAL; control ids and titles incl. IAM-18 Agent Access Restriction and AIS-11 Agents Security Boundaries). Cloud Security Alliance. 2026-08-04. https://cloudsecurityalliance.org/artifacts/aicm-machine-readable-bundle-json-yaml-oscal (verified: primary)
[81] Agentic Trust Framework, v1 (zero-trust governance for AI agents; autonomy tiers and promotion criteria; CC BY 4.0). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[82] Autonomous Action Runtime Management (AARM) specification (pre-execution interception with identity binding; policy evaluation before execution). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[83] STAR for AI (Level 1 self-assessment; Level 1 Valid-AI-ted automated validation; Level 2 with ISO/IEC 42001 certification plus the Valid-AI-ted assessment; read 2026-09-24). Cloud Security Alliance. 2026-09-24. https://cloudsecurityalliance.org/star/ai (verified: primary)
[84] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[85] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[86] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; reminders at least every three hours for known minors; suicide and self-harm protocol; annual reports to the Office of Suicide Prevention beginning 2027-07-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[87] "California Finalizes Regulations to Strengthen Consumers' Privacy" (regulations on ADMT, risk assessments and cybersecurity audits approved 2025-09-23; effective 2026-01-01; ADMT requirements from 2027-01-01; risk-assessment attestations and summaries due 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[88] New York General Business Law Article 47, Artificial Intelligence Companion Models (§§ 1700–1704; self-harm protocol; notice at the start and at least every three hours; Attorney General, up to USD 15,000 per day; most recent revision shown 2025-11-07). New York State Senate. 2025-11-07. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[89] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; ZIP codes as a proxy; IDHR draft rules). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[90] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[91] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (Utah Code 13-75, effective 2025-05-07: disclosure on a clear and unambiguous request; prominent disclosure in high-risk interactions by regulated occupations; safe harbour; Title 13, Chapter 72, Artificial Intelligence Policy Act, repealed 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[92] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 2021-07-06; effective 2021-09-07; risk-management framework, testing and chief-risk-officer attestation; rules per type of insurance, none effective before 2023-01-01). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[93] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, profiling with a reasonably foreseeable risk, sensitive data; processing activities created after 2023-01-01; available to the Attorney General). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
[94] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[95] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review and correct the data, have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[96] "Biometric Information Privacy Act" (signed 3 October 2008; consent, timely destruction and secure storage of biometric identifiers; USD 1,000 or 5,000 per violation). Wikipedia. 2026-09-24. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: reported)
[97] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; 31 March 2024, small businesses 30 June 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[98] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (high-impact AI; minimum practices; 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[99] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (policies updated by 2026-03-11; minimum LLM transparency in solicitations). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[100] 12 CFR § 1002.9, Notifications (statement of specific reasons, or the right to one within 30 days; internal standards or a failed score are insufficient; source 76 FR 79445, 21 December 2011, as amended 20 March 2023). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/12/1002.9 (verified: secondary)
[101] 15 U.S.C. § 1681m, Requirements on users of consumer reports (adverse-action notice; numerical credit score and key factors added by Pub. L. 111-203, s. 1100F, effective on the designated transfer date, 21 July 2011 per 12 U.S.C. § 5582 note). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/1681m (verified: secondary)
[102] 42 U.S.C. § 2000e-2(k), Burden of proof in disparate impact cases (business necessity; alternative employment practice; added by the Civil Rights Act of 1991, 21 November 1991). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[103] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures: adverse impact and the four-fifths rule (43 FR 38295, 25 August 1978). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/29/1607.4 (verified: secondary)
[104] 15 U.S.C. § 45(a)(1), Unfair methods of competition and unfair or deceptive acts or practices unlawful (deceptive-practices prong added by the Wheeler-Lea Act of 21 March 1938). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[105] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (competent and reliable evidence required for AI accuracy claims). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[106] TAKE IT DOWN Act, Public Law 119-12 (enacted 19 May 2025; s. 3: covered platforms establish a notice-and-removal process within one year of enactment and remove reported images, and known identical copies, within 48 hours; enforced by the FTC). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[107] Model AI Governance Framework for Agentic AI, version 1.5 (agent identity unique, accounted for and centrally managed; authorisations scoped, time- or session-bound, non-transferable and bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[108] Directive on Automated Decision-Making (in effect 1 April 2019; systems procured before 24 June 2025 comply by 24 June 2026; 6.1 algorithmic impact assessment published before production; Appendix C requirements by impact level; notice, explanation, peer review, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[109] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 20 review of decisions taken solely on automated processing; Art. 65 entry into force, incl. Arts. 52 to 54 from 1 August 2021). Presidência da República (Brazil). 2026-09-24. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[110] Personal Information Protection Law of the People's Republic of China, English translation for reference (Art. 24 automated decision-making; Arts. 55–56 personal information protection impact assessment kept at least three years; in force 1 November 2021). National People's Congress. 2021-12-29. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[111] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 April 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[112] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[113] The Framework Convention on Artificial Intelligence (Parties: the European Union; not yet in force; read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[114] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (principles 1.4(b) override, repair or decommission safely and 1.5(b)–(c) traceability and systematic risk management; revised 3 May 2024). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[115] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[116] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (reporting framework launched 7 February 2025; first reports by 15 April 2025). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[118] Public Act 103-0804, HB 3773 (amends the Illinois Human Rights Act, 775 ILCS 5/2-102(L): no AI with a discriminatory effect on protected classes, no ZIP codes as a proxy, notice of AI use; IDHR to adopt rules; approved 9 Aug 2024, effective 1 Jan 2026; text and bill status read from Web Archive captures of 2025-03-29 and 2025-06-17, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2024-08-09. https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804 (verified: primary)
[119] 740 ILCS 14, Biometric Information Privacy Act (Source: P.A. 95-994, eff. 10-3-08; s. 15 retention schedule, written release, secure storage; s. 20 right of action, USD 1,000 negligent or USD 5,000 intentional or reckless per violation; text read from the Web Archive capture of 2025-06-18, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2008-10-03. https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004&ChapterID=57 (verified: primary)
