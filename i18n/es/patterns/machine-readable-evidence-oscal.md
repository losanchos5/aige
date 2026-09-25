---
lang: es
source: bok/patterns/machine-readable-evidence-oscal.md
sourceHash: "be7a12b4bb256bc5061873011ed1ac00eb14de3c039d565f3ba60f94a06cb2da"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: machine-readable-evidence-oscal
title: "Machine-Readable Evidence (OSCAL)"
layer: 5
order: 13
summary: "Evidencia de control emitida en un formato estándar legible por máquina, OSCAL primero, de modo que una auditoría se convierte en una consulta y los mismos registros alimentan la aseguramiento continuo."
---

# Patrón: Machine-Readable Evidence (OSCAL)

**Resumen:** Emite evidencia de control en un formato estándar legible por máquina para que la
auditoría sea una consulta y la misma evidencia alimente el aseguramiento continuo. OSCAL, extendido
con propiedades para IA, es el formato organizador: los marcos especifican qué asegurar pero no
proporcionan un formato ejecutable para cómo, y este patrón lo proporciona [1].

## Objetivos
Haz que la evidencia sea consultable, comparable y agregable, y elimina la captura de pantalla como
un artefacto de evidencia.

## Usuarios objetivo
Ingeniero de gobernanza de IA, auditor, equipo de plataforma.

## Partes interesadas afectadas
Auditores, reguladores, propietarios de modelos.

## Principios relevantes
Instrumenta la compilación para que produzca su propia evidencia; dale dientes a cada control.

## Contexto
Un stack cuyos controles ya producen registros estructurados, y una función de aseguramiento que
debe responder a los auditores repetidamente y a velocidad.

## Problema
La evidencia que un humano debe formatear y archivar manualmente no escala, no puede ser verificada
rápidamente, y está desactualizada en el momento en que se guarda. Cada auditoría la recopila desde
cero.

## Solución
Emite resultados de control como artefactos OSCAL component-definition y assessment-results. El
modelo nativo de OSCAL es el sustrato estable: una capa de control (`catalog`, `profile`), una capa
de implementación (`component-definition`, `system-security-plan`) y una capa de evaluación
(`assessment-plan`, `assessment-results`, `POA&M`), con trazabilidad desde un resultado hasta el
control que probó [2]. Construye sobre él primero. Las extensiones específicas de IA aún se están
formando: un enfoque propuesto, un preprint único de 2026, añade dieciséis extensiones de
propiedades para fase de ciclo de vida, semántica de cumplimiento y trazabilidad de riesgos en una
arquitectura de política/evidencia/cumplimiento de tres capas que genera resultados de evaluación
OSCAL automáticamente y los valida contra el esquema JSON de NIST [1]. Adopta las extensiones si se
ajustan, pero los modelos de evaluación nativos llevan la mayoría de la carga hoy. Almacena la
evidencia para que la pregunta de un auditor sea respondida por una consulta.

> **Ejemplo (ilustrativo)** Una eval gate escribe un resultado de evaluación OSCAL en cada
> ejecución; la solicitud del auditor de "toda la evidencia de robustez en Q3" es un filtro sobre el
> almacén, devuelto en minutos.

## Consecuencias
La auditoría se convierte en una consulta y la evidencia se compone entre herramientas y
jurisdicciones. El costo es adoptar el esquema e instrumentar controles para emitirlo.

## Patrones relacionados
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondencias:** Reglamento de IA de la UE Art. 12, Art. 17, Art. 72 · ISO/IEC 42001 · NIST AI
RMF (Manage, Govern) · Layer 05 Assurance & Continuous Compliance.

Las etiquetas de función siguen el NIST AI RMF [3]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer policy/evidence/enforcement; "specify what to assure but provide no executable format for how") (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[2] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
