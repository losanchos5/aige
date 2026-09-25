---
lang: es
source: bok/patterns/incident-pipeline.md
sourceHash: "73905c623ed3c25ee83609d31bb598c906bf81f6ad4ee22eecc3578ec1aff46d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: incident-pipeline
title: Incident Pipeline
layer: 5
order: 10
summary: "La fontanería que detecta, clasifica y reporta incidentes graves de IA dentro de la ventana legal, con cronogramas y plantillas codificados, no recordados."
---

# Patrón: Incident Pipeline

**Resumen:** Construye la fontanería para detectar, clasificar y reportar incidentes graves de IA en
el reloj, con cronogramas de reporte y plantillas codificados en lugar de recordados. Para sistemas
de alto riesgo esto incluye el reporte de incidentes graves del Artículo 73 del Reglamento de IA de
la UE; para modelos de IA de uso general incluye el reporte de incidentes sistémicos que el Código
de Prácticas espera [1]. La misma canalización sirve al responsable de la implantación de un sistema
que otro construyó: le dice al proveedor, suspende el uso cuando el sistema presenta un riesgo, y
mantiene el reloj de reporte cuando el proveedor no puede ser alcanzado.

## Objetivos
Convierte una señal de tiempo de ejecución en una obligación reportada dentro de la ventana legal, y
produce el registro de incidente como evidencia estructurada. Mantén problemas e incidentes
separados, clasifica gravedad en una escala escrita, encuentra la causa sin culpa, y alimenta cada
incidente cerrado de vuelta a los controles.

## Usuarios objetivo
Ingeniero de gobernanza de IA, respondedor de seguridad/incidentes, legal/cumplimiento, delegado de
protección de datos, el enlace de proveedor de un responsable de la implantación.

## Partes interesadas afectadas
Reguladores, personas afectadas, responsables de la implantación, proveedores, propietarios del
modelo.

## Principios relevantes
Instrumenta la compilación para que produzca su propia evidencia; comienza desde un modo de fallo o
daño nombrado.

## Contexto
Un sistema de alto riesgo o de IA de uso general en producción, sujeto a deberes de reporte de
incidentes graves, donde la detección vive en ingeniería y el reporte vive en legal, sin cable entre
ellos. La mayoría de las organizaciones encuentran incidentes de IA como responsables de la
implantación de un sistema procurado, así la canalización tiene que funcionar para un modelo que no
poseen así como para uno que construyeron.

## Problema
Cuando se detecta un incidente, el reloj comienza. Si la detección, clasificación y reporte son
pasos manuales desconectados, la fecha límite se pierde y la evidencia de lo que sucedió se
reconstruye después del hecho. Un único campo "prioridad" leído de una manera por ingeniería y de
otra por legal oculta la decisión de reportabilidad, y una autopsia que busca a alguien a quien
culpar enseña a las personas a reportar menos.

## Solución
Conecta la detección de tiempo de ejecución (de observabilidad y guardrails) a un flujo de trabajo
de clasificación que clasifique gravedad y, en un evento reportable, redacte el reporte contra la
plantilla requerida e inicie el cronómetro estatutario. Codifica los cronogramas del Artículo 73 del
Reglamento de IA de la UE y la alimentación de monitoreo poscomercialización del Artículo 72 [2];
mantén el registro de incidente como evidencia legible por máquina. Los cinco pasos a continuación
son las partes que fallan más a menudo en la práctica; el [capítulo 17](/bok/incidents) trata cada
una en profundidad.

> **Ejemplo (ilustrativo)** Un guardrail señala un intento de exfiltración de datos a través de una
> herramienta de agente; la canalización lo clasifica, abre un incidente con el cronómetro del
> Artículo 73 en marcha, y pre-rellena el reporte desde el rastro y la entrada del registro.

### Problema o incidente: dos colas, un tipo de registro

Un **problema** es un defecto o debilidad de control sin evento detrás: una eval que retrocedió en
staging, una alerta de drift, una ficha de modelo que ya no coincide con la versión desplegada. Va a
un registro de problemas con un propietario y una fecha de vencimiento, y en términos de ISO/IEC
42001 la mayoría de los problemas son disconformidades manejadas bajo la cláusula 10.2 [3]. Un
**incidente** es un evento en el que el sistema causó daño; un **peligro** (o casi-accidente) es uno
que podría haber causado daño de manera plausible y no lo hizo [4]. Un **incidente grave** bajo
`Art. 3(49)` es el nivel superior de esa escala: muerte o daño grave a la salud, interrupción grave
e irreversible de infraestructura crítica, un incumplimiento de obligaciones que protegen derechos
fundamentales, o daño grave a la propiedad o el medio ambiente [2]. Mantén la severidad (un juicio
interno sobre el daño) y la notificabilidad (una prueba ejecutada una vez por régimen) en campos
separados, cada uno establecido por una persona designada con una marca de tiempo. Las definiciones
completas están en [el capítulo 17](/bok/incidents#incident-hazard-issue-and-serious-incident).

### Una escala de severidad mapeada a las clases del Art. 73

Escribe la escala como política y evalúala como código cuando se abre un incidente, de modo que la
primera clasificación y los relojes que inicia sean reproducibles. Los niveles siguientes son
ilustrativos; lo que importa es que cada uno nombre una prueba de daño y la clase legal que puede
desencadenar.

| Nivel | Prueba de daño | `Art. 73` clase que puede desencadenar [2] | Respuesta por defecto |
|---|---|---|---|
| **SEV-1** | Muerte; interrupción grave e irreversible de infraestructura crítica; incumplimiento generalizado | `Art. 73(4)` muerte: no más tarde de 10 días; `Art. 73(3)`: no más tarde de 2 días | Contener primero; legal y DPO en la llamada |
| **SEV-2** | Incumplimiento de obligaciones de derechos fundamentales; daño grave a la propiedad o el medio ambiente | `Art. 73(2)`: no más tarde de 15 días | El mismo día laboral; notificabilidad evaluada por régimen |
| **SEV-3** | Daño realizado por debajo de los umbrales graves | Ninguno por sí solo; comprueba RGPD y regímenes sectoriales | Contener el mismo día; revisar dentro de cinco días laborales |
| **SEV-4** | Casi-accidente: una ruta hacia el daño fue interrumpida | Ninguno | Revisión semanal; eval de regresión añadida |
| **Problema** | Defecto o debilidad, sin evento | Ninguno | Registro de problemas con propietario y fecha de vencimiento |

Clasifica hacia arriba y degrada con evidencia: los plazos corren desde la conciencia, y una
probabilidad razonable de un vínculo causal es suficiente para iniciarlos [2]. Un evento puede
iniciar varios relojes. Una violación de datos personales dentro de un incidente de IA añade la
notificación RGPD a la autoridad supervisora, dentro de 72 horas cuando sea viable [5], de modo que
el registro lleva una bandera de notificabilidad por régimen (véase
[los relojes superpuestos](/bok/incidents#the-overlapping-clocks)).

### El registro: un esquema, muchos informes

Mantén cada evento como un registro de incidente que valida contra
[`incident-record.v1.json`](/schemas/incident-record.v1.json) (una plantilla
[Markdown](/templates/incident-record.md) rellenable está junto a él). El campo `severity` del
esquema toma los valores OCDE (peligro, peligro grave, incidente, incidente grave, desastre) [4];
mantén el nivel SEV interno junto a él. El bloque `reporting` registra cuándo la organización tomó
conciencia y una entrada por régimen evaluado, de modo que cada reloj es una consulta, no una
memoria; `containment` registra si se utilizó el kill switch; {`root_cause_analysis`} y
{`actions_taken`} cierran el bucle. Los informes dirigidos a reguladores se renderizan desde el
registro, nunca se retipean.

### Causa raíz, CAPA y revisión sin culpa

Ejecuta la revisión en un disparador establecido de antemano (cada SEV-1 y SEV-2, una muestra del
resto) y escríbela sin culpa: la pregunta es qué condiciones permitieron que una persona razonable
actuara como lo hizo, no quién cometió un error [6]. Nombra el método (cinco por qué, árbol de
fallos, revisión de cronología) y una categoría de causa en el registro. El resultado es **CAPA**
(acción correctiva y preventiva): la acción correctiva corrige esta instancia, la acción preventiva
detiene la clase de fallo recurriendo en cualquier lugar de la flota. Cada incidente cerrado deja
una eval de regresión en la [Eval Gate](/patterns/eval-gate-in-ci), un cambio de registro de riesgos
y un registro de evidencia de que la corrección fue verificada, como establece el
[capítulo 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite).

### Simulacros de mesa

Un manual sin probar es una afirmación, no un control. Ensaya en un cronograma, rotando los modos de
fallo (una inyección de prompts indirecta que exfiltra datos, drift hacia resultados
discriminatorios, un proveedor que cambia silenciosamente el modelo detrás de una API, un bucle de
agente que quema presupuesto), y cronometra los pasos que importan: clasificar, contener, un
borrador de informe para cada reloj. El simulacro produce los mismos registros que un incidente
real, etiquetados como simulacro, de modo que "¿puedes informar a tiempo?" se responde con una
consulta sobre resultados de simulacros
([manuales, RACI y simulacros](/bok/incidents#playbooks-raci-and-drills)).

### El lado del responsable de la implantación: informar al proveedor, suspender el uso

Un responsable de la implantación de un sistema de alto riesgo tiene tres deberes bajo `Art. 26(5)`
[2]. Monitorea el sistema sobre la base de las instrucciones de uso e informa al proveedor cuando
sea relevante. Cuando tiene razones para considerar que el uso según las instrucciones puede
presentar un riesgo, informa al proveedor o distribuidor y a la autoridad de vigilancia del mercado
sin demora indebida y suspende el uso. Cuando identifica un incidente grave, inmediatamente informa
al proveedor primero, luego al importador o distribuidor y a la autoridad; si no puede contactar al
proveedor, `Art. 73` se aplica al responsable de la implantación. Ingeniería cada deber:

- **Un canal de proveedor en la entrada del registro**, con los términos de notificación contractual
  que la [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) negoció,
  probado en simulacros.
- **Una ruta de suspensión para un sistema que no posees**: una bandera de característica o
  conmutador de tráfico a una ruta humana o heredada, conectada a la
  [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) y cronometrada en
  simulacros.
- **Una exportación dirigida al proveedor del registro** con la marca de tiempo de cada
  notificación, y un reloj de reserva que inicia los temporizadores `Art. 73` en el registro propio
  del responsable de la implantación cuando el proveedor está en silencio.
- **Retención de registros** bajo el control del responsable de la implantación durante al menos
  seis meses (`Art. 26(6)`), más tiempo mientras un incidente está abierto [2].

## Consecuencias
Los informes se realizan a tiempo y el registro está listo para auditoría. La severidad y la
notificabilidad permanecen separadas, las revisiones enseñan en lugar de culpar, y cada incidente
cerrado endurece los controles a través de CAPA. El costo es la integración multifuncional,
simulacros que sacan a las personas de otro trabajo, términos de notificación contractual que deben
ganarse de los proveedores, y mantener los criterios de severidad y plantillas actuales con la ley.

## Patrones relacionados
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondencias:** Reglamento de IA Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI
RMF (Manage) · Layer 05 Assurance & Continuous Compliance.

Las etiquetas de función siguen el NIST AI RMF [7]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 (serious incident reporting for GPAI models with systemic risk). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act): Art. 3(49) serious incident; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 72 post-market monitoring; Art. 73 reporting of serious incidents (73(2) no later than 15 days, 73(3) no later than 2 days, 73(4) no later than 10 days). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; AI incident and AI hazard; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority within 72 hours where feasible). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[7] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
