---
lang: es
source: bok/07-maturity-model.md
sourceHash: "541c28ee31cef3e3713b5b858d53c65c0157543b0cc3a6b894e8d1e6f9893a7e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# # 07. Modelo de madurez (cinco niveles)

> Una escalera de papel a producción (Documentado, Inventariado, Probado, Ejecutado, Continuo),
> donde cada nivel se prueba por lo que los sistemas en ejecución pueden mostrar, no por lo que un
> documento afirma.

## ## Por qué un modelo de madurez y cómo leer este

Los modelos de madurez fallan cuando miden papeleo. Este mide los sistemas. Un nivel no es una
puntuación que te otorgues a ti mismo; es un estado que puedes demostrar consultando el registro,
ejecutando el gate y leyendo el almacén de evidencia. La escalera va de gobernanza que existe solo
en papel a gobernanza que se ejecuta continuamente fuera de la ruta de datos en tiempo de ejecución.

Los cinco niveles responden a las tres preguntas con confianza creciente. **Documentado** e
**Inventariado** responden *qué IA se está ejecutando*, primero en papel, luego desde un inventario
en vivo. **Probado** y **Ejecutado** responden *qué se le permite hacer*, primero midiendo, luego
bloqueando. **Continuo** responde *qué evidencia lo prueba*, continuamente, desde telemetría. Cada
nivel se evalúa en las cinco capas del stack (capítulo 04); estás en un nivel solo cuando cada capa
lo ha alcanzado, porque una cadena es tan fuerte como su eslabón más débil.

## ## Los cinco niveles

**Nivel 1: Documentado.** La gobernanza existe como artefactos que un humano mantiene: un PDF de
política, un inventario de hoja de cálculo, un registro de riesgos, una revisión que ocurre antes
del lanzamiento. Las reglas están escritas y alguien es responsable, pero nada se ejecuta. Evidencia
típica: documentos de política, una hoja de cálculo completada, actas de reuniones. Fallo típico que
te devuelve: el documento fue editado por última vez hace un trimestre y ya no coincide con la
producción; el artefacto está obsoleto antes de ser firmado. El capítulo 13 muestra cómo se ve el
registro de riesgos en cada nivel
([práctica de riesgos por nivel de madurez](/bok/risk-management#risk-practice-by-maturity-level)).

**Nivel 2: Inventariado.** Hay un inventario real de modelos y un
**[registro de agentes](/patterns/agent-registry)**, y se alimenta de una ruta de datos en tiempo de
ejecución en lugar de ser escrito a mano: un despliegue registra un sistema con un propietario, un
alcance y un estado. Puedes responder *qué se está ejecutando* en cualquier día dado. Evidencia
típica: un registro con un propietario y una clase para cada sistema; un trabajo de descubrimiento
reconciliando el registro contra la producción. Fallo típico:
[IA en la sombra](/patterns/shadow-ai-discovery). Un sistema o agente llega a producción sin
registrarse, por lo que el inventario es completo solo para los honestos.

**Nivel 3: Probado.** Los sistemas se evalúan contra pruebas definidas (evals de capacidad,
seguridad y adversariales) y los resultados se registran como evidencia. Los fallos son visibles,
pero un eval fallido aún no detiene nada. Sabes qué sistemas quedan cortos; aún no has hecho que
quedarse corto tenga consecuencias. Evidencia típica: suites de eval versionadas; resultados de eval
almacenados y con marca de tiempo; hallazgos de red team. Fallo típico: el eval se ejecuta una vez
antes del lanzamiento, se pega en una diapositiva y nunca se vuelve a ejecutar cuando el modelo o
sus prompts cambian.

**Nivel 4: Ejecutado.** Las pruebas muerden. [Política como código](/patterns/policy-card) y
**[eval gates](/patterns/eval-gate-in-ci)** se ejecutan en CI/CD y en la admisión, y un control
fallido bloquea la fusión o el despliegue. La identidad precede a la autonomía: un agente sin
propietario, alcance o **[kill switch](/patterns/kill-switch-circuit-breaker)** se le niega una
[identidad de carga de trabajo](/bok/governing-agents#identity-and-short-lived-credentials). La
gobernanza es ahora una propiedad de la construcción, no un punto de control después de ella. Pero
un gate de bloqueo es tan bueno como la prueba detrás de él, por lo que el Nivel 4 tiene una segunda
condición que es fácil de saltar: la *calidad* de la suite de eval se evalúa, no solo su existencia
y sus dientes. Un gate que bloquea en una suite trivial u obsoleta es Nivel 4 por la letra y teatro
de marco en realidad: una construcción verde que no prueba nada. Así que la afirmación de ejecución
requiere que la cobertura se mida, los casos adversariales se mantengan contra amenazas actuales, y
los umbrales se tracen a modos de fallo nombrados en lugar de números redondos (ver capítulo 01,
"los límites del eval gate"). Evidencia típica: registros de pipeline mostrando lanzamientos
bloqueados con razones; denegaciones de control de admisión; el registro actuando como un gate de
despliegue; una métrica de cobertura o calidad adversarial rastreada para las suites que gatean.
Fallo típico: gates frágiles que los ingenieros rodean; un gate mantenido solo por gobernanza que la
ingeniería no es propietaria; o un gate cuya suite es trivial o no mantenida, por lo que el bloqueo
es real pero la garantía no.

**Nivel 5: Continuo.** La garantía se produce continuamente desde la ruta de datos en tiempo de
ejecución. Las decisiones de guardrail, la mediación de llamadas de herramientas, la deriva y el
comportamiento del agente fluyen hacia la observabilidad;
**[aseguramiento continuo](/patterns/continuous-assurance-telemetry)** convierte el comportamiento
de producción en una señal de control en vivo; la evidencia se emite como
[artefactos legibles por máquina](/patterns/machine-readable-evidence-oscal) (`OSCAL`, registros
firmados) mientras la pipeline y el tiempo de ejecución operan. La auditoría es una consulta. En la
comparación de un proveedor de la categoría de plataforma de gobernanza de IA, la mayoría no alcanza
este estado final, porque "gestiona el programa … sin ninguna ruta de datos en tiempo de ejecución"
[1]. Evidencia típica: un almacén de garantía en vivo; telemetría de eval y guardrail en streaming;
una auditoría respondida ejecutando una consulta. Fallo típico: telemetría que se recopila pero
nunca se conecta a una decisión; la observabilidad sin ejecución decae de vuelta al Nivel 3
disfrazada de Nivel 5.

## ## Criterios observables, por capa y nivel

Lee cada fila como una capa madurando de izquierda a derecha. Estás en un nivel solo cuando cada
fila ha alcanzado su columna.

| Capa | 1 Documentado | 2 Inventariado | 3 Probado | 4 Ejecutado | 5 Continuo |
|---|---|---|---|---|---|
| **1 Govern-as-Code** | Políticas escritas como prosa | Políticas indexadas, mapeadas a sistemas | Las comprobaciones de política se ejecutan e informan, sin bloqueo | [Política como código](/patterns/policy-card) bloquea fusión/despliegue | Los [veredictos de política](/patterns/continuous-assurance-telemetry) fluyen a garantía, versionados |
| **2 Inventory & Transparency** | Inventario de hoja de cálculo | Registro alimentado por despliegue; propietario + alcance por sistema | Registro reconciliado contra producción | [El registro gatea el despliegue](/patterns/agent-registry); sin entrada, sin identidad | Registro en vivo fuera de [descubrimiento en tiempo de ejecución](/patterns/shadow-ai-discovery); deriva auto-marcada |
| **3 Evals & Red Teaming as Evidence** | Evals descritos en un plan | Las suites de eval existen y están versionadas | Los evals se ejecutan, los resultados se almacenan, sin bloqueo | [El eval gate](/patterns/eval-gate-in-ci) falla la construcción en regresión; cobertura de suite y calidad adversarial evaluadas | Los evals se ejecutan continuamente; los resultados son evidencia en vivo |
| **4 Runtime Controls & Observability** | Los guardrails se nombran en un diseño | Los guardrails se despliegan, no se miden | Las decisiones de guardrail se registran | El [kill switch](/patterns/kill-switch-circuit-breaker) se prueba; las llamadas de herramientas se median y se ejecutan | Las señales en tiempo de ejecución impulsan decisiones de control en tiempo real |
| **5 Assurance & Continuous Compliance** | La evidencia se recopila a mano para auditoría | La evidencia se templatea por control | Evidencia estructurada producida por ejecución | Evidencia requerida para pasar la puerta | [Evidencia legible por máquina](/patterns/machine-readable-evidence-oscal) emitida continuamente; auditoría = consulta |

**La madurez parcial es el estado normal.** Casi ninguna función real se sitúa en un nivel limpio
único en las cinco capas; la imagen habitual es una línea irregular: inventario en Nivel 4, evals en
Nivel 2, aseguramiento en Nivel 3. Eso no es un fallo del modelo, es el punto de leerlo por capa. El
nivel general único es la capa más débil, y es un *piso* para la planificación, no un veredicto
sobre la función completa. Dos lecturas siguen: reporta el perfil por capa, no solo el piso, porque
muestra dónde está la palanca; y espera que el perfil siga siendo irregular, porque las capas
maduran a la velocidad del trabajo que cierran, no al unísono. Una función que está en Nivel 4 en
identidad y Nivel 2 en evals está haciendo mejor de lo que sugiere el "Nivel 2" general, y su
siguiente movimiento es obvio del perfil.

## Métricas por nivel

Cada nivel tiene métricas que puedes leer de los sistemas. Sigue la tendencia, no el número único.

- **Nivel 1 → 2:** porcentaje de sistemas de IA y agentes en el registro con propietario nombrado y
  clase; brecha de reconciliación registro-producción (sistemas en producción pero no registrados).
- **Nivel 2 → 3:** porcentaje de sistemas registrados con suite de eval versionada; porcentaje con
  resultado de eval grabado y con marca de tiempo en el último lanzamiento.
- **Nivel 3 → 4:** porcentaje de lanzamientos que pasan por una **puerta de eval** (versus
  evitarla); porcentaje de agentes con kill switch probado e identidad con alcance, no compartida;
  número de lanzamientos bloqueados con razón registrada.
- **Nivel 4 → 5:** tiempo medio para detectar una acción de agente no autorizada (un agente haciendo
  algo fuera de su alcance declarado, territorio OWASP Agentic ASI03/ASI10 [2]);
  **frescura de evidencia** (antigüedad del artefacto de evidencia más reciente por control);
  porcentaje de controles cuyo estado es respondible por una consulta en vivo en lugar de una
  extracción manual.

La métrica transversal más reveladora es la frescura de evidencia. En Nivel 1 la evidencia más
fresca tiene un trimestre de antigüedad; en Nivel 5 tiene la antigüedad de la última ejecución de
pipeline. Si tu evidencia envejece en meses, aún no eres continuo, sea lo que diga el panel. Estas
son métricas de ingeniería; el conjunto de nivel de junta que las reporta hacia arriba está en el
capítulo 12
([KPIs y KRIs para liderazgo y junta](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board)).

## Lista de verificación de autoevaluación

Responde cada una con el sistema, no la intención. Un "no" te limita al nivel inferior.

- **Documentado:** ¿Está cada sistema de IA cubierto por una política escrita con propietario
  nombrado? ¿Hay un registro de riesgos que una persona mantiene?
- **Inventariado:** ¿Obtiene el registro una entrada automáticamente al desplegar, con propietario,
  alcance y estado? ¿Puedes listar cada modelo y agente ejecutándose hoy, desde el sistema de
  registro, en menos de un minuto?
- **Probado:** ¿Tiene cada sistema registrado una suite de eval versionada? ¿Se almacenan resultados
  con marcas de tiempo? ¿Ejecutas evals de red team contra tus agentes?
- **Aplicado:** ¿Bloquea realmente un eval fallido o una verificación de política un lanzamiento?
  ¿Se previene que un agente sin propietario, alcance y kill switch llegue a producción? ¿Puedes
  mostrar un lanzamiento que fue bloqueado, con la razón registrada?
- **Continuo:** ¿Está la telemetría en tiempo de ejecución conectada a decisiones de control, no
  solo paneles? ¿Se emite evidencia como artefactos legibles por máquina continuamente? ¿Sería una
  pregunta de auditoría respondida por una consulta en lugar de un sprint de recopilación?

Si puedes decir sí a un nivel completo y a cada capa dentro de él, estás en ese nivel. El primer
"no" es tu siguiente pieza de trabajo, y el paso más pequeño al siguiente nivel es casi siempre
cerrar la capa más débil, no añadir un sexto control a la más fuerte. Ejecuta la lista de
verificación como herramienta: la [autoverificación de madurez](/toolkit/maturity-self-check) dibuja
tu perfil por capa, nombra el piso y el siguiente movimiento, y lo exporta.

## Cómo se relaciona esto con certificación y otras evaluaciones

Este modelo de madurez no es una certificación y no confiere una. Se relaciona con tres esquemas
externos; la relación es de apoyo y solapamiento, no equivalencia.

**Certificación ISO/IEC 42001.** ISO/IEC 42001 certifica que existe un sistema de gestión de IA
(AIMS) y se opera, una prueba de Nivel 1-2 de *proceso*: que la gobernanza está documentada, es
propiedad y se revisa. Dice poco sobre si una **puerta de eval** bloquea una compilación o si la
evidencia es legible por máquina, las propiedades de Nivel 4-5. Y no es una norma armonizada: el
certificado no confiere presunción de conformidad con el Reglamento de IA de la UE, porque ninguna
está aún citada en el Diario Oficial [3]. Alcanzar Nivel 5 apoya una auditoría 42001 produciendo
evidencia continuamente; no reemplaza el certificado, y el certificado no prueba que estés pasado
Nivel 2. Sea cual sea el esquema, ejecuta
[un programa de auditoría](/bok/governing-deployment#an-audit-programme-not-an-audit), no una
auditoría única (capítulo 15).

**Evaluación de Madurez de IA de OWASP (AIMA).** El Proyecto de Seguridad GenAI de OWASP publica una
Evaluación de Madurez de IA reportada en v1.0 (ago 2025) [4]. Es complementaria: donde AIMA puntúa
la *amplitud* de un programa de seguridad de IA, este modelo puntúa la *profundidad* de la ruta de
datos en tiempo de ejecución. Usa AIMA para encontrar brechas en cobertura; usa esta escalera para
encontrar si los controles cubiertos realmente funcionan.

**CSA STAR para IA.** STAR para IA de CSA es un programa de certificación construido sobre la Matriz
de Controles de IA (AICM), con un nivel de autoevaluación, un nivel automatizado "Valid-AI-ted" y un
Nivel 2 que combina certificación ISO/IEC 42001 de terceros con la evaluación validada [1][5]. Su
Nivel 2 se alinea con el final *Aplicado* de esta escalera, pero, como 42001, atestigua un programa
en lugar de medir la frescura de evidencia en tiempo de ejecución, la propiedad que el aseguramiento
continuo (Nivel 5) hace barato producir y difícil falsificar. Los certificados de personas (AIGP,
ISO/IEC 42001 Lead Implementer y Lead Auditor, AAISM, AAIA) son otra cosa: ver la
[página de certificaciones](/for/certifications).

> **En la práctica**
> Una función en una telco grande se autoevaluó honestamente y llegó a Nivel 2 para inventario pero
> Nivel 1 para evals: el registro estaba en vivo del pipeline de despliegue, pero los evals aún se
> ejecutaban a mano antes del lanzamiento y se pegaban en diapositivas. La cadena era solo tan
> fuerte como su capa más débil, así que la función estaba en Nivel 1 en general. El paso más
> pequeño no era un nuevo mapeo de marco; era versionar una suite de eval y almacenar sus resultados
> con marca de tiempo, moviendo la capa de eval a Nivel 3, antes de conectarla a una puerta. La
> frescura de evidencia cayó de un trimestre a un ciclo de lanzamiento en dos sprints.

**Correspondencias:** Art. 9 del Reglamento de IA de la UE (gestión de riesgos), Art. 17 (sistema de
gestión de calidad), Art. 72 (vigilancia poscomercialización) · ISO/IEC 42001 (AIMS) e ISO/IEC 42005
(evaluación de impacto) · NIST AI RMF (Govern, Measure, Manage) · OWASP Top 10 para Aplicaciones
Agentic 2026 · CSA AICM / STAR para IA. Los mapeos son ilustrativos, no una afirmación de
conformidad.

## Lo que puedes hacer esta semana

1. **Puntúa cada capa, no la función.** Responde la lista de verificación de autoevaluación por
   capa, desde los sistemas en lugar de la intención, y toma el nivel más bajo como tu nivel
   general.
2. **Mide frescura de evidencia.** Para cada control, registra la antigüedad de su artefacto de
   evidencia más reciente. El más antiguo es donde comienza el siguiente sprint.
3. **Reconcilia el registro una vez.** Compara lo que el registro lista con lo que se ejecuta en
   producción, y cuenta los sistemas y agentes que nunca se registraron.
4. **Eleva la capa más débil un nivel.** Envía el paso más pequeño allí (una suite de eval
   versionada con resultados almacenados, o un registro que cierre un despliegue) antes de añadir un
   control a la capa más fuerte.
5. **Encuentra un lanzamiento bloqueado.** Muestra un lanzamiento que un eval fallido o una
   verificación de política detuvo, con la razón registrada. Si no hay ninguno, aún no estás en
   Aplicado, sea lo que diga el panel.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] Top 10 for Agentic Applications 2026 (ASI03 Agent Identity & Privilege Abuse; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] ISO/IEC 42001 certification is not yet a presumption of conformity with the EU AI Act (no harmonised standard cited in the OJ). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[4] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025); Secure Governance initiative. OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[5] STAR for AI (three certification levels; Level 2 = third-party ISO/IEC 42001 + Valid-AI-ted; built on the AI Controls Matrix). Cloud Security Alliance. 2026. https://cloudsecurityalliance.org/star/ai (verified: primary)
