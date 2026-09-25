---
lang: es
source: bok/patterns/staged-rollout-rollback-criteria.md
sourceHash: "75d88b1728a25ef59fcd822587bf2668b045c846a1763723ab78f4c5fd3df44e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: staged-rollout-rollback-criteria
title: Staged Rollout with Rollback Criteria
layer: 4
order: 29
summary: "Lanza cada modelo, prompt o cambio de versión de proveedor a través de etapas shadow, pilot y canary cuyos criterios de reversión se registran antes de que comience cada etapa."
---

# Patrón: Staged Rollout with Rollback Criteria

**Resumen:** Lleva cada cambio a un sistema de IA desplegado (un nuevo modelo, un reentrenamiento,
un cambio de prompt o corpus, una nueva versión de modelo de proveedor) a producción en etapas que
limitan la exposición mientras se acumula evidencia: shadow, pilot, canary, luego disponibilidad
general. Cada etapa tiene criterios de reversión escritos en el plan de lanzamiento antes de que
comience y evaluados por el pipeline, las versiones se fijan en el registro, y el camino de vuelta
ha sido probado. Un criterio inventado después de que la métrica se movió es una negociación, no un
control.

## Objetivos
Limita el daño que un cambio malo puede hacer a la parte del tráfico o casos expuestos a él, y haz
que "revertirlo" sea una decisión que el pipeline toma en una señal preacordada en lugar de una
reunión.

## Usuarios objetivo
Ingeniero de gobernanza de IA, equipo de plataforma ML, SRE, propietario del sistema.

## Partes interesadas afectadas
Usuarios y personas afectadas del sistema, operadores y revisores, el panel de lanzamiento,
responsables del despliegue posteriores al cambio de un proveedor.

## Principios relevantes
Dale a cada control fuerza; construye el control en el punto más temprano en el que puede bloquear;
instrumenta la compilación para producir su propia prueba.

## Contexto
Los sistemas de IA cambian más a menudo que sus aprobaciones. Un reentrenamiento, una edición de
prompt, un corpus de recuperación actualizado y una nueva versión de modelo del proveedor pueden
cada uno mover la calidad, la seguridad o la equidad sin que cambie una línea del código del
responsable del despliegue. La ingeniería de confiabilidad de sitios ya tiene la mecánica: el
canarying es un despliegue parcial y limitado en tiempo de un cambio y su evaluación [1], el
despliegue azul-verde mantiene una forma probada de volver atrás [2], y los feature toggles
operacionales cambian la exposición por cohorte sin un despliegue [3]. El Reglamento de IA de la UE
pide a los responsables del despliegue de sistemas de alto riesgo que supervisen la operación y
suspendan el uso cuando tengan razones para considerar que el sistema presenta un riesgo [4], y un
proveedor o futuro proveedor que pilote un sistema del Anexo III con usuarios reales antes de
introducirlo en el mercado está realizando pruebas en condiciones reales, que el Artículo 60 rige
[4]. El NIST AI RMF espera una determinación de si el despliegue debe proceder y mecanismos para
reemplazar o desactivar un sistema cuyos resultados sean inconsistentes con el uso previsto [5].

## Problema
Sin etapas, un cambio va del arnés de eval a todos a la vez, y la primera evidencia sobre el
comportamiento en vivo es el daño mismo. Con etapas pero sin criterios preregistrados, cada
reversión se convierte en un debate sobre si una métrica movida importa, celebrado después de los
hechos por las personas que querían el lanzamiento. Una actualización de modelo de proveedor que
nadie trató como un lanzamiento salta cada etapa.

### Fuerzas
- **Velocidad contra evidencia.** Cada etapa retrasa el valor; una etapa demasiado corta no prueba
  nada.
- **Poder estadístico contra exposición.** Un canary pequeño expone a pocas personas pero necesita
  tiempo para detectar una regresión real, especialmente por grupo.
- **Etiquetas tardías.** Las etiquetas de resultado a menudo llegan después de que termina la etapa,
  por lo que los criterios se apoyan en proxies: desacuerdo, anulaciones, quejas, fundamentación.
- **Cambios que no hiciste.** Un cambio de versión del proveedor llega en su calendario, no en el
  tuyo.

## Solución
Escribe el plan de lanzamiento como datos, regístralo antes de la primera etapa, y deja que el
pipeline lo haga cumplir.

1. **Etapas con un propósito.** Shadow (entradas en vivo, salidas registradas pero no utilizadas)
   prueba el comportamiento en tráfico real; un piloto con usuarios capacitados prueba que la
   supervisión funciona; un canary contra un grupo de control prueba que no hay regresión a escala;
   la disponibilidad general mantiene los criterios como monitores en vivo.
2. **Criterios de reversión preregistrados.** Cada etapa lista métrica, comparación, umbral, ventana
   y los desgloses de grupo que importan. El plan se compromete y se firma antes de que comience la
   etapa; un cambio en un umbral es un diff revisado con un aprobador, nunca una edición en un
   panel.
3. **Versiones fijadas.** El registro fija las versiones de modelo, prompt, corpus de recuperación y
   guardrail para la línea base y la candidata. Un cambio sin fijar detectado en tiempo de ejecución
   es en sí mismo un disparador de reversión.
4. **Una ruta probada de vuelta.** El cambio azul-verde o un feature flag devuelve el tráfico a la
   línea base, y el cambio se ejercita en la etapa shadow, antes de que alguien dependa de él.
5. **Evaluación automática.** Un trabajo de análisis de canary compara candidata y control por
   métrica y por grupo y escribe un veredicto de etapa (promover, mantener, revertir) en el almacén
   de aseguramiento. El registro go/no-go resume el lanzamiento en su campo `rollout` (ver el
   [esquema go/no-go](/resources/templates#schema-go-no-go)).
6. **Las versiones del proveedor son lanzamientos.** Una nueva versión de modelo del proveedor se
   ejecuta en shadow y canary contra la versión fijada antes de que tome tráfico.

Plan de lanzamiento ilustrativo, registrado antes de la etapa shadow:

```json
{
  "plan_id": "ro-csa-01-2026-09",
  "subject": "csa-01@2026-09-18",
  "baseline": "csa-01@2026-08-30",
  "registered_at": "2026-09-15T09:00:00Z",
  "pinned": {
    "model": "vendor-model@2026-08-01",
    "prompt": "csa-prompt@41",
    "corpus": "csa-kb@2026-09",
    "guardrails": "gr-csa@12"
  },
  "stages": [
    {
      "stage": "shadow",
      "min_days": 7,
      "rollback_if": [{ "metric": "disagreement_with_baseline", "op": ">", "value": 0.08 }]
    },
    {
      "stage": "pilot",
      "exposure": "40 trained agents",
      "min_days": 14,
      "rollback_if": [
        { "metric": "override_rate", "op": ">", "value": 0.15 },
        { "metric": "complaints_per_1000", "op": ">", "value": 2.0 }
      ]
    },
    {
      "stage": "canary",
      "exposure_percent": 10,
      "control_group": true,
      "min_days": 14,
      "rollback_if": [
        { "metric": "groundedness", "op": "<", "value": 0.92 },
        { "metric": "resolution_rate_ratio_min_by_language", "op": "<", "value": 0.9 },
        { "metric": "severity_1_events", "op": ">", "value": 0 }
      ]
    },
    { "stage": "general_availability", "exposure_percent": 100 }
  ],
  "rollback_path": "blue-green switch to csa-01@2026-08-30; flag csa01.candidate off",
  "go_no_go": "gng-csa-01-2026-09-18"
}
```

> **Ejemplo (ilustrativo)** El nuevo prompt de un asistente de soporte pasa su eval gate e ingresa a
> shadow. En el canary, la fundamentación se mantiene en general pero la tasa de resolución para
> chats en idioma portugués cae por debajo del 90% de la tasa en español. El criterio preregistrado
> se activa, el flag devuelve la cohorte de canary a la línea base en minutos, y el veredicto de
> etapa y el evento de reversión llegan al almacén de aseguramiento antes de que alguien haya
> convocado una reunión.

## Consecuencias
Las regresiones se detectan mientras afectan a pocos usuarios, y cada promoción o reversión deja un
registro vinculado a criterios establecidos de antemano. El costo es lanzamientos más lentos,
infraestructura de canary, el trabajo estadístico para dimensionar etapas y grupos, y la disciplina
de tratar las actualizaciones de proveedor y ediciones de prompt como lanzamientos. Los criterios
que son demasiado estrictos producen fatiga de reversión; revísalos con sus propietarios en el
calendario de mantenimiento.

## Patrones relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Registry](/patterns/agent-registry);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondencias:** Reglamento de IA de la UE Art. 26(5), Art. 60 · ISO/IEC 42001 A.6.2.5, A.6.2.6
· NIST AI RMF MANAGE 1.1, MEASURE 2.3, MANAGE 2.4 · Capa 04 Runtime Controls & Observability.

Los ids de control siguen ISO/IEC 42001 Anexo A [6] y los ids de subcategoría el NIST AI RMF [5].
Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[2] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[3] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5) monitor, suspend and inform; Art. 60 testing of high-risk AI systems in real-world conditions outside sandboxes). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MANAGE 1.1 determination whether deployment should proceed; MEASURE 2.3 performance demonstrated for conditions similar to deployment; MANAGE 2.4 supersede, disengage or deactivate). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
