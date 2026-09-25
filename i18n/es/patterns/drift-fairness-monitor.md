---
lang: es
source: bok/patterns/drift-fairness-monitor.md
sourceHash: "b9828bdd1d92a29e23961aa63df5e010aeeec6aaebd0c9f3196fee218e82cbf5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: drift-fairness-monitor
title: "Drift & Fairness Monitor"
layer: 4
secondaryLayer: 5
order: 30
summary: "Señales de producción para deriva, calidad e imparcialidad por grupo, cada una con un umbral, un propietario y una consecuencia preacodada, escritas como evidencia."
---

# Patrón: Drift & Fairness Monitor

**Resumen:** Observa un sistema desplegado para las formas en que se aleja del estado en el que fue
aprobado: deriva de entrada, etiqueta, concepto, pipeline, modelo de proveedor y uso, y calidad e
imparcialidad por grupo. Cada señal tiene un umbral, un propietario y una consecuencia preacodada
(un problema, un reentrenamiento, un modo degradado, un incidente, un disyuntor activado), y cada
evaluación escribe un registro de evidencia, por lo que "el modelo sigue siendo apto e imparcial" es
una consulta sobre telemetría en lugar de una creencia del día del lanzamiento.

## Objetivos
Detecta la pérdida de rendimiento o imparcialidad en producción antes de que las personas afectadas
la detecten, encamina cada incumplimiento a alguien que pueda actuar, y mantén un registro continuo
de que el sistema fue observado contra los pisos que su decisión de despliegue estableció.

## Usuarios objetivo
Ingeniero de gobernanza de IA, on-call de plataforma ML, científico de datos, propietario del
sistema.

## Partes interesadas afectadas
Personas afectadas, especialmente grupos que el sistema puede desfavorecer; operadores y revisores;
la función de riesgo; proveedores e implementadores que comparten el deber de monitoreo.

## Principios relevantes
Comienza desde un modo de fallo o daño nombrado; dale dientes a cada control; instrumenta la
compilación para producir su propia prueba.

## Contexto
Un sistema que pasó sus evals en el lanzamiento puede derivar hacia error o imparcialidad sin ningún
cambio de código. La deriva de concepto, un cambio en el tiempo en la relación que un modelo
aprendió, es un problema estudiado cuyo trabajo se divide en detección, comprensión y adaptación
[1]. El Reglamento de IA pide a los proveedores de sistemas de alto riesgo que ejecuten monitoreo
poscomercialización e implementadores que monitoreen la operación sobre la base de las instrucciones
de uso, suspendiendo el uso e informando al proveedor donde el sistema presenta un riesgo
(`Art. 72`, `Art. 26(5)`), y pide a los sistemas que siguen aprendiendo que aborden bucles de
retroalimentación sesgados (`Art. 15(4)`) [2]. Donde el monitoreo de sesgo necesita categorías
especiales de datos personales, el Omnibus Digital establece las condiciones en un nuevo `Art. 4a`
[3]. Algunas leyes requieren auditorías periódicas directamente: la Ley Local 144 de la Ciudad de
Nueva York requiere una auditoría de sesgo dentro de un año antes de que se use una herramienta de
decisión de empleo automatizada [4]. El NIST AI RMF pide que la funcionalidad y el comportamiento se
monitoreen en producción y que la imparcialidad y el sesgo se evalúen y documenten [5].

## Problema
Los paneles sin umbrales no son observados por nadie. Las etiquetas llegan tarde o nunca, por lo que
la precisión no puede medirse cuando importa. El atributo de grupo necesario para medir la
imparcialidad generalmente está ausente en tiempo de ejecución. Un sistema generativo puede
degradarse (más respuestas sin fundamento, más rechazos en un idioma) mientras que cada métrica de
infraestructura permanece verde. Y un incumplimiento que no alerta a nadie es solo un gráfico.

### Fuerzas
- **Retraso de etiqueta contra oportunidad.** Los proxies libres de resultado (deriva de entrada,
  tasas de selección, anulaciones, quejas) llegan ahora; el rendimiento en etiquetas frescas llega
  después y es lo que importa.
- **Sensibilidad contra fatiga de alerta.** Los umbrales ajustados detectan deriva temprano y
  alertan a personas por ruido.
- **Medición de imparcialidad contra privacidad.** Medir por grupo necesita el atributo de grupo,
  que a menudo es datos de categoría especial con sus propias condiciones legales.
- **Deber compartido.** Proveedor e implementador monitorean cada parte del sistema y ven datos
  diferentes.

## Solución
Ejecuta el monitor como una ruta de señal de capa 04 que escribe evidencia de capa 05, impulsada por
un plan de monitoreo que es datos.

1. **Nombra lo que puede moverse.** Para cada sistema, enumera las clases de deriva que se aplican:
   datos (distribución de entrada), etiqueta (tasa base), concepto (relación entrada-resultado),
   pipeline (esquema ascendente o paso de recuperación), modelo de proveedor (el modelo detrás de la
   API) y uso (quién lo usa, para qué). Elige una estadística por clase: un índice de estabilidad o
   prueba de dos muestras en características o incrustaciones contra una ventana de referencia;
   positivo predicho contra observado; rendimiento en etiquetas frescas con detección de punto de
   cambio; contratos de datos; comprobaciones de fijación de versión; clasificación de temas del
   tráfico contra el espacio negativo.
2. **Imparcialidad por grupo, con y sin etiquetas.** Monitorea tasas de selección o aprobación por
   grupo sin etiqueta necesaria; tasas de error y calibración por grupo una vez que los resultados
   llegan, con el retraso de etiqueta indicado; tasas de anulación, queja y disputa por grupo del
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path); y, para sistemas
   generativos, tasas de fundamentación y rechazo por tema e idioma. Donde el atributo de grupo no
   se mantiene en tiempo de ejecución, usa una muestra consentida o una auditoría periódica en un
   entorno asegurado.
3. **Umbral, propietario, consecuencia.** Cada métrica en el plan lleva un umbral, una ventana, un
   propietario nombrado que puede ser alertado, y la acción que un incumplimiento dispara: abre un
   problema, programa un reentrenamiento, cambia un modo degradado, abre un incidente a través del
   [Incident Pipeline](/patterns/incident-pipeline), o activa el
   [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).
4. **Evidencia en cada evaluación.** Cada comprobación escribe un registro de evidencia al almacén
   de aseguramiento a través de
   [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry), aprobado o rechazado,
   por lo que la ausencia de incumplimientos es en sí misma evidenciada.
5. **El plan como datos.** El plan de monitoreo del implementador reutiliza el
   [esquema del plan de monitoreo poscomercialización](/resources/templates#schema-post-market-monitoring-plan),
   y un cambio de umbral es un diff revisado, como cualquier cambio en un control.

Plan de monitoreo ilustrativo para un asistente de soporte, como un registro del plan de monitoreo
poscomercialización:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/post-market-monitoring-plan.v1.json",
  "plan_id": "mon-csa-01",
  "subject": "csa-01@2026-09-18",
  "scope": "All chats in ES and PT, including escalations to human agents and customer complaints.",
  "data_sources": [
    { "source": "chat telemetry with groundedness scores", "type": "telemetry", "owner": "ml-platform" },
    { "source": "agent overrides and escalations", "type": "deployer_feedback", "owner": "contact-centre-ops" },
    { "source": "complaints that mention the assistant", "type": "user_complaint", "owner": "customer-care" },
    { "source": "monthly re-run of the regression suite on sampled chats", "type": "eval_rerun", "owner": "model-validation" }
  ],
  "metrics": [
    {
      "metric": "groundedness of sampled answers",
      "threshold": "< 0.90 over 7 days",
      "cadence": "daily",
      "failure_mode": "ungrounded answers",
      "alert_route": "ml-platform"
    },
    {
      "metric": "resolution-rate ratio, lowest language to highest",
      "threshold": "< 0.90 over 14 days",
      "cadence": "weekly",
      "failure_mode": "worse service for one language group",
      "alert_route": "ai-governance"
    },
    {
      "metric": "share of chats classified outside the intended topics",
      "threshold": "> 5% over 7 days",
      "cadence": "daily",
      "failure_mode": "usage drift into unapproved use",
      "alert_route": "system-owner"
    }
  ],
  "drift_signals": ["embedding drift on user turns", "topic mix", "vendor model version pin"],
  "triggers": [
    { "condition": "groundedness breach for two consecutive windows", "action": "rollback", "owner": "system-owner" },
    { "condition": "language resolution ratio breach", "action": "investigate", "owner": "ai-governance" },
    { "condition": "unpinned vendor model version detected", "action": "suspend", "owner": "ml-platform" }
  ],
  "feedback_channels": ["in-chat feedback", "complaint form", "contest path for account decisions"],
  "retraining_policy": "A retrain, prompt change or corpus refresh is a release and goes through the staged rollout.",
  "review_cadence": "Thresholds reviewed quarterly with their owners",
  "owner": "system-owner",
  "effective_from": "2026-09-18"
}
```

> **Ejemplo (ilustrativo)** Tres semanas después de que una actualización del modelo de proveedor
> pasara su canario, la métrica de deriva de uso sube: el personal ha comenzado a hacer preguntas de
> RRHH al asistente de cliente. El incumplimiento abre un problema para el propietario del sistema,
> quien añade temas de RRHH a la lista de uso prohibido y los encamina al portal de RRHH; la métrica
> cae por debajo del umbral, y el problema, el cambio y la recuperación están todos en el almacén de
> aseguramiento.

## Consecuencias
La deriva y la imparcialidad se detectan como señales con propietarios en lugar de descubrirse como
incidentes, y las auditorías periódicas se vuelven baratas porque la telemetría ya existe. El costo
es la capacidad de etiquetado y muestreo, el cuidado estadístico en umbrales (las métricas por grupo
en grupos pequeños son ruidosas), el trabajo de privacidad para atributos de grupo, y cobertura
on-call para cada señal que puede alertar.

## Patrones relacionados
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path).

**Correspondencias:** Reglamento de IA Art. 4a, Art. 15(4), Art. 26(5), Art. 72 · NYC Local Law 144
· ISO/IEC 42001 A.5.4, A.6.2.6 · NIST AI RMF MEASURE 2.4, MEASURE 2.11, MEASURE 3.1, MANAGE 4.1 ·
Layer 04 Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance.

Los ids de control siguen ISO/IEC 42001 Anexo A [6] y los ids de subcategoría el NIST AI RMF [5].
Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[2] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 15(4) feedback loops in systems that continue to learn; Art. 26(5) deployer monitoring, suspension and information; Art. 72 post-market monitoring by providers). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special categories of personal data for bias detection and correction); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.4 functionality and behaviour monitored in production; MEASURE 2.11 fairness and bias evaluated and documented; MEASURE 3.1 existing, unanticipated and emergent risks tracked; MANAGE 4.1 post-deployment monitoring plans). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.5.4 assessing AI system impact on individuals or groups of individuals; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
