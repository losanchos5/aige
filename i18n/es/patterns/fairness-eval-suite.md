---
lang: es
source: bok/patterns/fairness-eval-suite.md
sourceHash: "90d2e8a073fc15049630c4372ec6456f8367ddee6b1f68b10f8b26916bb97f7f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fairness-eval-suite
title: Fairness Eval Suite
layer: 3
order: 22
summary: "Una suite de equidad versionada en CI: métricas de grupo e interseccionales con intervalos, un escaneo de proxy y una prueba contrafáctica, juzgadas contra una política fijada primero."
---

# Patrón: Fairness Eval Suite

**Resumen:** Versiona una suite de equidad con el modelo y ejecútala detrás de la puerta de eval:
métricas de grupo e interseccionales con intervalos de confianza, un resultado "datos insuficientes"
para celdas pequeñas, un escaneo de proxy y una prueba de volteo contrafáctico, cada una juzgada
contra una política de equidad (métrica, umbral, tamaño mínimo de celda, aprobador) escrita antes de
la ejecución. La suite emite un resultado estructurado por métrica y segmento, falla la compilación
cuando la política no se cumple, y se ejecuta nuevamente en decisiones en vivo para que un sistema
que era justo en el lanzamiento no pueda derivar fuera de él sin ser visto.

## Objetivos
Convierte "¿es justo?" en un pequeño conjunto de propiedades elegidas y comprobables con
consecuencias, para que un lanzamiento que trata un grupo peor que lo que la política permite no se
lance, y la evidencia muestre qué métrica fue elegida, por qué, y qué midió.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de ML, científico de datos, asesor legal e igualdad.

## Partes interesadas afectadas
Personas sujetas a las decisiones del sistema, especialmente grupos protegidos e interseccionales,
responsables del despliegue, propietarios de modelos, auditores, organismos de igualdad y
reguladores.

## Principios relevantes
Comienza desde un modo de fallo o daño nombrado; dale dientes a cada control; instrumenta la
compilación para producir su propia prueba.

## Contexto
Un sistema que asigna algo a personas (crédito, empleos, vivienda, prestaciones, precios) o las
sirve con una calidad que puede diferir por grupo (reconocimiento, transcripción, respuestas en un
dialecto). Para sistemas de alto riesgo, el Reglamento de IA de la UE requiere que los datos se
examinen «en vista de posibles sesgos» y medidas «para detectar, prevenir y mitigar» los mismos
(`Art. 10(2)(f)` y `(g)`), sistemas que continúan aprendiendo para abordar «bucles de
retroalimentación» sesgados (`Art. 15(4)`), y las instrucciones de uso deben indicar, cuando sea
apropiado, el rendimiento «respecto a personas o grupos de personas específicos»
(`Art. 13(3)(b)(v)`) [1]. El NIST AI RMF pide que la equidad y el sesgo «se evalúen y los resultados
se documenten» (MEASURE 2.11) [2].

## Problema
La equidad se mide una sola vez, en el agregado, con una métrica elegida después de ver los
resultados.

- **Fuerzas.** Los criterios comunes entran en conflicto: cuando las tasas base difieren entre
  grupos, una puntuación no puede estar calibrada y tener tasas de error iguales entre grupos a la
  vez [3], y las tres condiciones de calibración y equilibrio para ambas clases no pueden mantenerse
  juntas excepto en casos especiales muy restringidos [4]. Así que una métrica debe elegirse para el
  caso de uso, y la elección es una decisión con propietario. Los números agregados ocultan las
  intersecciones: la auditoría Gender Shades encontró tasas de error de hasta el 34,7% para mujeres
  de piel más oscura frente a un máximo del 0,8% para hombres de piel más clara [5], y un
  clasificador puede parecer justo en cada grupo predefinido mientras falla en subgrupos
  estructurados [6]. Las celdas pequeñas hacen que las estimaciones puntuales sean ruidosas. El peso
  legal de umbrales familiares se mueve: la regla de cuatro quintos de las Directrices Uniformes de
  EE.UU. es una pantalla con advertencias de significancia estadística y práctica [7], y en junio de
  2026 el Departamento de Justicia de EE.UU. anunció una opinión concluyendo que las directrices de
  impacto desproporcionado de la EEOC son inconstitucionales [8].
- **Modo de fallo.** Un panel marca 0,81 en verde y 0,79 en rojo sin intervalo y sin muestra mínima;
  la intersección peor servida se promedia; la versión se envía en una métrica elegida porque pasó;
  y la deriva en producción no se mide porque la prueba se ejecutó solo al lanzamiento.

## Solución
Escribe la política primero, luego construye el conjunto que puede fallar contra ella.

1. **Política de equidad como datos.** Por sistema: los atributos protegidos que aplican en cada
   jurisdicción y de dónde vienen sus valores, la métrica elegida y la razón (relación de tasa de
   selección para asignación, brechas de tasa de error para calidad de servicio), el umbral, el
   tamaño mínimo de celda, la corrección de comparación múltiple y el aprobador. Confirma antes de
   mirar la siguiente ejecución.
2. **Métricas de grupo e interseccionales con intervalos.** Calcula tasas y ratios por grupo y por
   celda interseccional, cada una con un intervalo de confianza, y juzga la puerta en el intervalo,
   no en el punto. Las celdas por debajo del mínimo reportan «datos insuficientes» y se enumeran,
   nunca se cuentan como aprobadas. Busca el peor corte así como los enumerados.
3. **Escaneo de proxy.** Entrena un modelo para predecir el atributo protegido a partir de las
   características; un predictor fuerte marca proxies para justificar o eliminar, y el resultado va
   en la ficha de datos.
4. **Prueba de cambio contrafáctico.** Cambia solo el atributo protegido, o para un modelo de
   lenguaje intercambia términos de identidad en prompts idénticos de otra manera, y mide con qué
   frecuencia cambian el resultado o la calidad de la respuesta.
5. **Datos de prueba lícitos.** Donde se necesitan datos de categorías especiales para detección de
   sesgos, úsalos solo sobre la base y bajo las condiciones de `Art. 4a`, que el Omnibus Digital
   insertó en lugar del antiguo `Art. 10(5)` [9]; de lo contrario, registra cómo se estimó la
   pertenencia al grupo y el error que añade.
6. **Puerta y archivo.** Emite un resultado estructurado por métrica y corte, reutilizando el
   [esquema de resultado de eval](/resources/templates#schema-eval-result) publicado
   (`eval-result.v1`), archívalo contra la entrada del registro y alimenta los números desagregados
   en la ficha de modelo. Una celda fallida falla la compilación a menos que una justificación
   firmada se adjunte a la versión.
7. **Ejecútalo en vivo.** Calcula las mismas métricas en decisiones de producción en una ventana
   móvil, con los mismos umbrales, para que la deriva genere una alerta antes de una queja. Donde un
   régimen requiere publicación, como las auditorías de sesgo independientes de la Ley Local 144 de
   la Ciudad de Nueva York con ratios de impacto entre sexo, raza/etnia y categorías
   interseccionales [10], los resultados del conjunto son la entrada, no un ejercicio separado.

NIST SP 1270 es un marco útil para lo que el conjunto no puede ver: el sesgo es sistémico y humano
así como estadístico, y «no es posible lograr riesgo cero de sesgo» [11].

Resultado ilustrativo para un corte, válido contra `eval-result.v1` (el intervalo y la política
viajan en `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/eval-result.v1.json",
  "suite_id": "fairness.credit-dfc.v3",
  "model_version": "credit-dfc@2026-09-01",
  "score": 0.81,
  "threshold": 0.80,
  "result": "pass",
  "timestamp": "2026-09-18T09:40:12Z",
  "direction": "higher_is_better",
  "metric": "approval adverse-impact ratio, lower 95% bound, age 65+ against age 35-49",
  "failure_mode": "older applicants declined at a disproportionate rate",
  "obligation": "EU AI Act Art. 10(2)(f)-(g)",
  "sample_size": 1840,
  "extensions": {
    "point_estimate": 0.86,
    "ci95": [0.81, 0.91],
    "reference_group": "age_35_49",
    "min_cell": 200,
    "policy": "fairness-policy.credit.v2",
    "insufficient_data_cells": ["age_65_plus x region_islands"]
  }
}
```

> **Ejemplo (ilustrativo)** El conjunto de un prestamista juzgó las tasas de aprobación por banda de
> edad en el límite inferior de confianza de la relación de impacto adverso, con una celda mínima
> de 200. La primera ejecución pasó cada banda en la estimación puntual y falló una en el límite; la
> segunda, en un conjunto de prueba congelado más grande, la pasó. Una intersección se mantuvo por
> debajo de la celda mínima, así que las notas de versión la enumeran como «datos insuficientes» y
> el propietario de datos lleva una condición para recopilar más antes del próximo reentrenamiento.
> Las mismas métricas ahora se ejecutan semanalmente en decisiones en vivo.

## Consecuencias
Las afirmaciones de equidad se vuelven específicas, reproducibles y fechadas; la elección de métrica
y sus compensaciones están en el registro; y los grupos pequeños o interseccionales se reportan en
lugar de promediarse. Los costos: el acceso lícito a atributos protegidos es difícil e imposible a
veces, así que las estimaciones llevan error; los intervalos se amplían con muestras pequeñas, así
que los conjuntos necesitan conjuntos de prueba más grandes; un conjunto aprobado no prueba que el
sistema sea justo fuera de lo que midió; y la mitigación que provoca puede ser ilícita en algunos
contextos, así que las correcciones van a revisión legal con la evidencia adjunta.

## Patrones relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Explanation Artefact](/patterns/explanation-artefact);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Claims Substantiation Gate](/patterns/claims-substantiation-gate).

**Correspondencias:** Reglamento de IA de la UE Art. 10(2)(f)–(g), Art. 13(3)(b)(v), Art. 15(4),
Art. 4a · Ley Local 144 de NYC · 29 CFR 1607.4(D) · ISO/IEC 42001 A.5.4, A.6.2.4 · ISO/IEC TR 24027
· NIST AI RMF (Measure 2.11) · Layer 03 Evals & Red Teaming as Evidence.

Las etiquetas de función y subcategoría siguen el NIST AI RMF [2]; los ids de ISO/IEC 42001 Annex A
siguen un crosswalk publicado, no el texto del estándar [12]; ISO/IEC TR 24027 se referencia solo
por identificador y título [13]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(f)-(g) examination for and mitigation of possible biases; Art. 13(3)(b)(v) performance regarding specific persons or groups in the instructions for use; Art. 15(4) feedback loops in systems that continue to learn (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.11 fairness and bias "evaluated and results are documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[4] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[5] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[6] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[7] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[8] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[11] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[12] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.4 assessing AI system impact on individuals and groups, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
[13] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
