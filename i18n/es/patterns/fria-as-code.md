---
lang: es
source: bok/patterns/fria-as-code.md
sourceHash: "dd24efa21bad73918c74ee9e686aba9d023e209a786d176e3dcc383f4058f3b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fria-as-code
title: FRIA-as-Code
layer: 1
secondaryLayer: 2
order: 11
summary: "Cada evaluación de impacto (ISO/IEC 42005 AIIA, DPIA, FRIA) mantenida como una base de hechos versionada, vinculada a sus controles y reabierta cuando el sistema cambia."
---

# Patrón: FRIA-as-Code

**Resumen:** Mantén la evaluación de impacto sobre derechos fundamentales como un artefacto
versionado y revisable referenciado cruzadamente a la evaluación de impacto sobre protección de
datos, para que una evaluación de derechos sea una entrada al diseño que se actualiza con el
sistema, no un documento producido una vez y archivado. Generalizado, esto es
**Impact-Assessment-as-Code**: cada evaluación de impacto que un sistema desencadena (la evaluación
de impacto del sistema de IA, o AIIA, que ISO/IEC 42005 describe, la DPIA del RGPD y la FRIA del
Reglamento de IA de la UE) es una base de hechos compartida con varias vistas, cada una con su
propio disparador, revisor y regla de re-evaluación. El patrón mantiene su nombre original y
dirección para que los enlaces publicados a él aún se resuelvan.

## Objetivos
Mantén la FRIA y su DPIA referenciada cruzada en vivo y vinculada a los controles que demandan, para
que un cambio en el sistema desencadene una revisión de su impacto en derechos. Extiende la misma
disciplina a la AIIA, para que un conjunto de hechos sobre grupos afectados, daños y controles
alimente cada evaluación y ninguna de las dos evaluaciones discrepe sobre el mismo sistema.

## Usuarios objetivo
Ingeniero de gobernanza de IA, DPD, legal/cumplimiento, el equipo de modelo que ejecuta la AIIA.

## Partes interesadas afectadas
Titulares de datos, personas afectadas (incluyendo personas que nunca usan el sistema), responsables
del despliegue, proveedores, reguladores.

## Principios relevantes
Comienza desde un modo de fallo o daño nombrado; instrumenta la compilación para producir su propia
prueba.

## Contexto
Un responsable de la implantación de un sistema de IA de alto riesgo sujeto al artículo 27 del
Reglamento de IA de la UE, donde una evaluación de impacto relativa a la protección de datos
conforme al artículo 35 del RGPD puede ya existir y solaparse. En el lado del proveedor, una
organización que ejecuta un sistema de gestión de IA evalúa el impacto de cada sistema de IA en
individuos, grupos y sociedad a lo largo de su ciclo de vida, como pide el Anexo A.5 de ISO/IEC
42001 e ISO/IEC 42005 guía. Un sistema puede estar bajo los tres simultáneamente.

## Problema
Una evaluación de impacto relativa a los derechos fundamentales redactada una sola vez como
documento de Word describe el impacto sobre los derechos en un momento único y nunca se revisa
cuando el sistema cambia. El esfuerzo duplicado entre la evaluación de impacto relativa a los
derechos fundamentales y la evaluación de impacto relativa a la protección de datos desperdicia
trabajo y deja las dos desincronizadas. Añade una evaluación de impacto relativa a la IA separada
redactada por el equipo del modelo y la organización mantiene tres relatos de los mismos daños,
puntuados en escalas diferentes, revisados por personas diferentes, y obsoletos en fechas
diferentes.

## Solución
Plantilla la evaluación de impacto relativa a los derechos fundamentales como datos estructurados
que cubran el uso previsto, los grupos afectados, los riesgos para los derechos, y los controles
mitigadores, con cada mitigación vinculada al control que la implementa (una Ficha de Política, una
Puerta de Eval, un guardrail). Referencia cruzada la evaluación de impacto relativa a la protección
de datos para que los elementos compartidos se escriban una sola vez. Almacénala con la entrada del
registro y reabrela en caso de cambio significativo. La evaluación de impacto relativa a los
derechos fundamentales del artículo 27 del Reglamento de IA y su referencia cruzada a la evaluación
de impacto relativa a la protección de datos definen el alcance [1].

> **Ejemplo (ilustrativo)** La evaluación de impacto relativa a los derechos fundamentales de un
> sistema de elegibilidad de prestaciones vincula cada riesgo identificado a los derechos de las
> personas a una eval específica y un guardrail; cuando el modelo se reentrena, la evaluación de
> impacto relativa a los derechos fundamentales señala qué mitigaciones necesitan re-verificación.

### Una base de hechos, tres vistas

Mantén un registro por sistema con los hechos que cada evaluación necesita: el uso previsto y los
usos fuera de alcance, los grupos afectados, cada daño puntuado en las mismas dimensiones (gravedad,
escala, reversibilidad, duración, probabilidad), y cada mitigación con el id del control y la eval
que la implementan. Renderiza las tres evaluaciones como vistas de ese registro. El esquema house
[`impact-assessment.v1.json`](/schemas/impact-assessment.v1.json) hace esto con un campo `type`
(`aiia`, `dpia_addendum`, `fria`), campos compartidos para riesgos, mitigaciones y resultado, y
campos específicos del tipo para lo que solo una evaluación pide; una
[plantilla Markdown](/templates/impact-assessment.md) rellenable está junto a él.

| Vista | Quién la realiza | Qué la desencadena | Cuándo | Qué añade a los hechos compartidos |
|---|---|---|---|---|
| AIIA (ISO/IEC 42005) | La organización que desarrolla o proporciona el sistema | Su sistema de gestión de IA (ISO/IEC 42001 A.5.2 a A.5.5) | A lo largo del ciclo de vida, desde el diseño [2][3] | Impactos sociales; documentación de la evaluación misma |
| EIPD (RGPD Art. 35) | El responsable del tratamiento | Tratamiento probable que resulte en un riesgo alto | Antes del tratamiento [4] | Necesidad y proporcionalidad; el consejo del delegado de protección de datos; consulta previa si el riesgo alto persiste |
| FRIA (Reglamento de IA Art. 27) | Organismos del sector público y prestadores de servicios públicos, y responsables de la implantación de sistemas de los puntos 5(b) y (c) del Anexo III | Primer uso de un sistema de alto riesgo del Anexo III (no punto 2) | Antes del primer uso [1] | Categorías afectadas, medidas de supervisión, mecanismos de reclamación; resultados notificados a la autoridad de fiscalización del mercado |

Dos reglas mantienen las vistas honestas. Una evaluación de impacto relativa a los derechos
fundamentales puede construirse sobre una evaluación de impacto relativa a la protección de datos
que ya cubre el mismo terreno (`Art. 27(4)`) [1], así los campos compartidos se escriben una sola
vez y se referencian, nunca se copian. Y una vista nunca se edita por sí sola: un cambio en los
hechos regenera cada vista, así la evaluación de impacto relativa a la protección de datos no puede
decir una cosa sobre los grupos afectados mientras la evaluación de impacto relativa a los derechos
fundamentales dice otra.

### Desencadenantes de re-evaluación como código

Escribe los desencadenantes como condiciones que el registro evalúa, no como recordatorios de
calendario: un uso previsto nuevo o ampliado; reentrenamiento en una nueva fuente de datos; una
población afectada nueva, idioma o jurisdicción; un umbral cambiado; un incidente o casi incidente
de la [Canalización de Incidentes](/patterns/incident-pipeline); una señal de monitoreo fuera de su
banda; ley o guía nueva; y una fecha de revisión programada. El Reglamento de IA pide al responsable
de la implantación que actualice la evaluación de impacto relativa a los derechos fundamentales
cuando cualquier elemento evaluado cambie [1], y el RGPD pide una revisión cuando el riesgo del
tratamiento cambie [4]; un único desencadenante reabre cada vista que el cambio toca, y el revisor
ve un diff en lugar de tres documentos nuevos. El
[Capítulo 14](/bok/governing-development#impact-assessments-compared) compara estas evaluaciones con
las evaluaciones de impacto algorítmico, auditorías de sesgo y validaciones de modelo que pueden
unirse a la misma base de hechos.

### Realizar versus revisar

El ejecutor es dueño de los hechos; el revisor los cuestiona. Antes de la aprobación el revisor
comprueba que el alcance coincida con el registro de caso de uso actual, los grupos afectados
incluyan personas que nunca usan el sistema, cada calificación de riesgo cite evidencia (un id de
eval, un informe de prueba, un perfil de datos), cada mitigación se vincule a un control que se
ejecuta, el riesgo residual sea aceptado por alguien con autoridad para aceptarlo, y los
desencadenantes se escriban como condiciones que una canalización pueda evaluar. Mantén el veredicto
y el nombre del revisor en el registro, así un auditor puede ver quién cuestionó qué.

## Consecuencias
La evaluación de derechos se mantiene actual y trazable a los controles, y los solapamientos con la
evaluación de impacto relativa a la protección de datos no se duplican. La evaluación de impacto
relativa a la IA, la evaluación de impacto relativa a la protección de datos y la evaluación de
impacto relativa a los derechos fundamentales coinciden porque leen los mismos hechos, y un cambio
de sistema reabre todas ellas a la vez. El coste es la plantilla, acordar una escala de puntuación
única entre legal, privacidad e ingeniería, y la disciplina de tratar la evaluación como viva.

## Patrones relacionados
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondencias:** Artículo 27 del Reglamento de IA de la UE (evaluación de impacto relativa a
los derechos fundamentales), artículo 9 · Artículo 35 del RGPD (evaluación de impacto relativa a la
protección de datos) · ISO/IEC 42005 · NIST AI RMF (Mapa) · Capa 01 Gobernanza como código / Capa 02
Inventario y Transparencia.

Las etiquetas de función siguen el NIST AI RMF [5]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 27 (fundamental-rights impact assessment by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c) systems; before first use; update when an assessed element changes; results notified to the market-surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[3] ISO/IEC 42001:2023, Annex A.5 (A.5.2 AI system impact assessment process; A.5.3 documentation of AI system impact assessments; A.5.4 impact on individuals or groups of individuals; A.5.5 societal impacts). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Regulation (EU) 2016/679 (GDPR), Art. 35 (data protection impact assessment: 35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes) and Art. 36 (prior consultation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
