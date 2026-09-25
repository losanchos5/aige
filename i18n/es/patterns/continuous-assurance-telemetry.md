---
lang: es
source: bok/patterns/continuous-assurance-telemetry.md
sourceHash: "289ffc6b24e3f832cc89b6f955693212f1589d484bb837315d06e2b3b4328273"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: continuous-assurance-telemetry
title: Continuous Assurance Telemetry
layer: 5
order: 7
summary: "Decisiones de control transmitidas a un almacén de aseguramiento único a medida que suceden, para que si un control funciona sea una consulta activa, no una atestación puntual."
---

# Patrón: Continuous Assurance Telemetry

**Resumen:** Transmite decisiones de control (veredictos de política, resultados de eval, acciones
de guardrail, eventos de identidad) a un almacén de aseguramiento a medida que suceden, para que el
estado de un control sea una consulta activa en lugar de una atestación puntual. La confiabilidad se
convierte en una señal generada continuamente, no en un certificado estático [1].

## Objetivos
Reemplaza la atestación periódica con evidencia emitida mientras el sistema se ejecuta, para que
"¿funciona el control?" sea respondido por telemetría.

## Usuarios objetivo
Ingeniero de gobernanza de IA, equipo de SRE/plataforma, auditor.

## Partes interesadas afectadas
Propietarios de modelos, auditores, reguladores, respondedores de incidentes.

## Principios relevantes
Instrumenta la compilación para que produzca su propia evidencia; dale dientes a cada control.

## Contexto
Un stack cuyas capas inferiores ya emiten registros estructurados, y una función de aseguramiento
cansada de ensamblar carpetas antes de cada auditoría.

## Problema
Una atestación dice que un control existía cuando alguien miró; no dice nada sobre las semanas
intermedias, durante las cuales el modelo fue reentrenado y un agente ganó una herramienta. La
evidencia puntual se degrada inmediatamente.

## Solución
Haz que cada control escriba un registro estructurado con marca de tiempo a un almacén de
aseguramiento común, en un esquema. Fija el esquema primero: un registro de evidencia mínimamente
útil es
`{control_id, subject (model/agent/system id + version from the registry), decision (pass/fail/allow/deny/alert), metric + value + threshold, failure_mode/obligation ref, input_hash, actor, timestamp, signature}`.
Normaliza la salida de cada herramienta en esa forma en la ingesta, para que fuentes heterogéneas se
compongan en un almacén consultable único indexado por el id del registro.

Esquema ilustrativo para el registro de evidencia:

```json
{
  "control_id": "guardrail.output.pii.v2",
  "subject": "csa-01@2026-09-18",
  "decision": "alert",
  "metric": "pii_leak_rate", "value": 0.004, "threshold": 0.0,
  "obligation": "EU AI Act Art. 15",
  "input_hash": "sha256:1c7d…",
  "actor": "csa-01",
  "timestamp": "2026-09-18T14:31:52Z",
  "signature": "ed25519:5a…"
}
```

Dos propuestas de investigación apuntan a la misma idea y vale la pena observarlas, no adoptarlas
completamente: TAIP trata las salidas de NIST TEVV como Objetos de Aseguramiento de IA reutilizables
que se componen entre sistemas [1], y AAGATE operacionaliza un plano de control alineando las
funciones del NIST AI RMF para agentes en producción [2]; ambas son preprints únicos. Expone el
estado actual de cada control como una consulta sobre el almacén.

> **Ejemplo (ilustrativo)** Un mosaico del panel de control para el control de residencia de datos
> está respaldado por una consulta activa sobre decisiones de guardrail emitidas; si el control deja
> de dispararse, el mosaico se pone rojo en minutos, no en la siguiente auditoría.

## Consecuencias
La auditoría se convierte en una consulta y la deriva es visible en tiempo casi real. El coste es
construir la tubería y el almacenamiento, y definir un esquema de evidencia común entre
herramientas.

## Patrones relacionados
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondencias:** Reglamento de IA de la UE Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage,
Govern) · CSA AICM · Layer 05 Assurance & Continuous Compliance.

Las etiquetas de función siguen el NIST AI RMF [3]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] TAIP: NIST TEVV outputs as reusable AI Assurance Objects; trustworthiness as a continuously generated signal (arXiv 2603.03340; submitted 15 Feb 2026). 2026-02. https://arxiv.org/abs/2603.03340 (verified: primary)
[2] AAGATE: NIST AI RMF-aligned, Kubernetes-native governance control plane for agentic AI (arXiv 2510.25863). 2025-10. https://arxiv.org/abs/2510.25863 (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
