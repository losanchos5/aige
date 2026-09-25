---
lang: es
source: bok/patterns/eval-gate-in-ci.md
sourceHash: "db2745d7602943a223d8898cfaeead6d0e348fe954232d642e744aefe3792ff8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: eval-gate-in-ci
title: Eval Gate in CI
layer: 3
order: 2
summary: "Una suite de evaluación conectada a CI para que un modelo o agente se lance solo por encima de un umbral documentado: la ejecución de eval es el control, su resultado la evidencia."
---

# Patrón: Eval Gate in CI

**Resumen:** Conecta una suite de evaluación al pipeline de CI/CD para que un modelo o agente deba
pasar una prueba definida, por encima de un umbral documentado, antes de poder lanzarse. La
ejecución de eval es el control y su resultado es la evidencia; un eval fallido bloquea la
compilación.

## Objetivos
Haz concreto "dar dientes a cada control": da a una propiedad comprobable una consecuencia, para que
el fallo detenga un lanzamiento en lugar de archivar un hallazgo.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de ML, equipo de plataforma.

## Partes interesadas afectadas
Propietarios de modelos, usuarios expuestos al sistema, auditores.

## Principios relevantes
Da dientes a cada control; construye el control en el punto más temprano en el que pueda bloquear.

## Contexto
Un modelo o agente que cambia (reentrenado, re-solicitado, con una nueva herramienta) y un pipeline
que ya ejecuta pruebas de corrección funcional.

## Problema
Las evaluaciones que se ejecutan una sola vez antes del lanzamiento y se pegan en una diapositiva no
prueban nada después del siguiente cambio. Una junta de revisión que solo puede calificar hallazgos
no puede detener un lanzamiento programado. Sin una puerta, la evaluación es investigación, no
control.

## Solución
Versiona una suite de eval junto con el modelo. Ejecuta al menos una eval de capacidad y una eval
adversarial en CI (por ejemplo con Inspect, promptfoo, Garak o Giskard; ilustrativo). Establece un
umbral que se trace a un modo de fallo nombrado u obligación. Falla el pipeline por debajo del
umbral. Emite un resultado estructurado (id de suite, versión de modelo, puntuación, umbral,
aprobado/fallido, marca de tiempo) archivado contra la entrada del registro.

Esquema ilustrativo para el resultado:

```json
{
  "suite_id": "injection-resistance.v4",
  "model_version": "csa-01@2026-09-18",
  "score": 0.982,
  "threshold": 0.95,
  "result": "pass",
  "timestamp": "2026-09-18T14:22:03Z"
}
```

> **Ejemplo (ilustrativo)** Un agente de codificación interno debe superar un piso de resistencia a
> inyección y una suite de regresión antes del despliegue; un lanzamiento que reduce la resistencia
> por debajo del piso falla el pipeline y no se lanza hasta que se corrija.

## Consecuencias
Las regresiones se detectan antes de producción y la evidencia se acumula automáticamente. El
compromiso es el mantenimiento de eval, el costo de tiempo de ejecución en CI, y la necesidad de
ajustar umbrales para evitar puertas inestables.

## Patrones relacionados
[Policy Card](/patterns/policy-card);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence).

**Correspondencias:** Reglamento de IA Art. 15, Art. 55 · ISO/IEC 42001 · NIST AI RMF (Measure) ·
OWASP Agentic ASI01/ASI02 · Capa 03 Evals & Red Teaming as Evidence.

Los IDs de amenaza siguen el OWASP Top 10 for Agentic Applications 2026 [1] y las etiquetas de
función el NIST AI RMF [2]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
