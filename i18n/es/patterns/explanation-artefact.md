---
lang: es
source: bok/patterns/explanation-artefact.md
sourceHash: "f5f1c480d5aacda263f8733e9b94dcdab9bb143de057b0c0d5c3a12e2c0f0374"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: explanation-artefact
title: Explanation Artefact
layer: 4
secondaryLayer: 5
order: 23
summary: "Un registro de explicación por decisión consecuente, con modelo fijado, método y códigos de razón, probado para fidelidad y reutilizado para cada deber de explicación."
---

# Patrón: Explanation Artefact

**Resumen:** Para cada decisión consecuente que un sistema toma o apoya sobre una persona, escribe
un **registro de explicación** estructurado en el momento de la decisión: la versión del modelo, el
método de explicación con su versión y línea base, los códigos de razón extraídos de los factores
que el modelo realmente puntuó, un contrafáctico válido donde uno ayuda, la plantilla de aviso y la
ruta de impugnación. Prueba las explicaciones para fidelidad en CI, mantén los registros en el
almacén de evidencia, y responde cada deber de explicación (un aviso de acción adversa, una
solicitud de acceso de titular de datos, una solicitud de explicación del Reglamento de IA, una
apelación interna) desde el mismo registro.

## Objetivos
Haz cada explicación reproducible, verificable y reutilizable: reproducible porque lo que la produjo
está fijado, verificable porque sus razones pueden recomputarse y compararse, y reutilizable porque
un registro sirve varios deberes legales e internos en lugar de que cada equipo escriba su propia
carta.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de ML, equipos de producto y operaciones que envían avisos,
abogados de privacidad y derecho del consumidor.

## Partes interesadas afectadas
Personas sujetas a decisiones y sus representantes, operadores y revisores que confían en la
explicación, responsables del despliegue, auditores, autoridades de protección de datos y vigilancia
del mercado.

## Principios relevantes
Instrumenta la compilación para producir su propia prueba; da dientes a cada control; comienza desde
un modo de fallo o daño nombrado.

## Contexto
Un sistema que rechaza, fija precios, clasifica, marca o puntúa personas, donde la persona, un
operador o una autoridad preguntarán por qué. Los deberes se superponen. Bajo el Reglamento de IA,
una persona sujeta a una decisión tomada por un responsable del despliegue sobre la base de la
salida de un sistema de alto riesgo del Anexo III (excepto punto 2), con efectos adversos legales o
similarmente significativos, tiene derecho a obtener "explicaciones claras y significativas del
papel del sistema de IA en el procedimiento de toma de decisiones y los elementos principales de la
decisión tomada" (`Art. 86(1)`); los responsables del despliegue deben informar a las personas que
están sujetas a tal sistema (`Art. 26(11)`); y las instrucciones de uso deben describir, donde sea
aplicable, las capacidades del sistema "para proporcionar información que sea relevante para
explicar su salida" (`Art. 13(3)(b)(iv)`) [1]. El RGPD da a los titulares de datos información
significativa sobre la lógica implicada en decisiones automatizadas (`Art. 15(1)(h)`, `Art. 22`)
[2], que el Tribunal de Justicia interpretó en C-203/22 como una explicación del "procedimiento y
principios realmente aplicados" [3]. En crédito estadounidense, la Regulación B requiere las razones
principales específicas para acción adversa, y deben relacionarse con los factores realmente
considerados o puntuados [4].

## Problema
Las explicaciones se generan sobre la marcha, se envían y se olvidan.

- **Fuerzas.** Los métodos de atribución post-hoc pueden divergir del modelo que explican, y pueden
  ser manipulados: un clasificador sesgado puede envolverse para que LIME y SHAP reporten
  características inocuas [5]. Las razones escritas para el científico de datos no ayudan al
  destinatario. Cada deber tiene su propia audiencia y redacción. Donde las apuestas son altas, un
  modelo interpretable puede ser su propia explicación, y Rudin argumenta que debería preferirse a
  explicar una caja negra después del hecho [6].
- **Modo de fallo.** Nadie puede reproducir la explicación que un cliente recibió el año pasado,
  porque el modelo, el método o la línea base cambió. Los códigos de razón nombran factores que el
  modelo no utilizó. Cada solicitud de acceso y cada apelación se convierte en un proyecto forense,
  y la organización no puede demostrar que sus explicaciones fueron precisas.

## Solución
Trata la explicación como un artefacto con un esquema, una prueba y una regla de retención.

1. **Decide la explicación por caso de uso.** Una política de explicación (capa 01) establece, por
   caso de uso, los tipos de explicación requeridos (códigos de razón, un contrafáctico, citas de
   fuentes para respuestas basadas en recuperación, una descripción del procedimiento y principios
   aplicados), la audiencia e idioma, el método permitido, y si se requiere un modelo interpretable.
2. **Escribe el registro en el momento de la decisión.** El runtime (capa 04) escribe un registro
   por decisión explicada, con clave al id del registro y el id de decisión: versión del modelo;
   método, versión y línea base; si la salida fue determinante o consultiva; códigos de razón de
   factores puntuados, clasificados; un contrafáctico que cambia solo características mutables,
   donde sea útil; la plantilla de aviso, idioma, canal y tiempo de entrega; y la ruta de
   impugnación. Fijar el método y la línea base es lo que hace el registro reproducible.
3. **Prueba las explicaciones.** En CI (capa 03), una suite de explicación comprueba fidelidad (las
   razones predicen el comportamiento del modelo), estabilidad (entradas casi idénticas obtienen
   razones casi idénticas), cordura (el método es sensible al modelo y los datos) y consistencia de
   códigos de razón (cada razón muestreada es un factor puntuado). NIST nombra "exactitud de
   explicación" como uno de cuatro principios de IA explicable [7]. Recomputa una muestra de
   registros almacenados contra el modelo fijado para detectar deriva o manipulación.
4. **Reutiliza el registro.** El mismo registro renderiza el aviso de acción adversa, responde una
   solicitud de acceso y una solicitud `Art. 86`, y da a un revisor humano el contexto para una
   apelación. En el Reino Unido, las salvaguardas para decisiones automatizadas significativas
   incluyen información sobre la decisión, la oportunidad de hacer representaciones, intervención
   humana y una forma de impugnarla [8]; el registro lleva lo que cada uno de esos pasos necesita.
5. **Retén y consulta.** Los registros fluyen hacia el almacén de evidencia (capa 05) con un período
   de retención establecido por la obligación más larga que sirven. Las apelaciones y sus resultados
   se registran contra el registro y se cuentan por grupo, lo que alimenta el monitoreo de equidad.

El AI RMF pide que "el modelo de IA sea explicado, validado y documentado" y su salida "interpretada
dentro de su contexto" (MEASURE 2.9), y que los riesgos de transparencia y responsabilidad sean
"examinados y documentados" (MEASURE 2.8) [9].

Registro de explicación ilustrativo para un aumento de límite de crédito rechazado:

```json
{
  "record_id": "exp-2026-09-21-118204",
  "decision_id": "cl-2026-09-21-118204",
  "subject": "credit-limit@4.2.1",
  "registry_id": "clm-07",
  "outcome": "limit_increase_declined",
  "decision_role": "determinative",
  "method": { "name": "treeshap", "version": "0.46", "baseline": "bg-sample.v14" },
  "fidelity_suite": { "suite_id": "explain.fidelity.v2", "result": "pass" },
  "reason_codes": [
    { "code": "R07", "text": "Debt-to-income ratio too high", "factor": "dti", "rank": 1 },
    { "code": "R12", "text": "Recent missed payments", "factor": "missed_payments_6m", "rank": 2 }
  ],
  "counterfactual": { "feature": "monthly_debt", "change": "-150", "result": "approve", "mutable_only": true },
  "notice": { "template": "adverse-action.en.v6", "language": "en", "channel": "app+letter",
              "delivered": "2026-09-21T10:04:51Z" },
  "contest_route": "appeal-flow.v3",
  "retention_until": "2031-09-21"
}
```

> **Ejemplo (ilustrativo)** La verificación de crédito de un minorista de teléfonos generó códigos
> de razón a partir de valores SHAP en el momento de la solicitud. Una prueba de consistencia de
> códigos de razón encontró que, para un segmento de rechazos, el factor principal era una
> interacción ingenierizada que ningún aviso podría describir en palabras simples. El equipo pasó a
> un scorecard monótono dentro de un pequeño margen del modelo complejo, fijó el método en el
> registro, y ahora responde "¿por qué fue rechazado este cliente?" con el registro almacenado y una
> recomputación fresca lado a lado.

## Consecuencias
Las explicaciones se convierten en evidencia: reproducibles, comprobables y reutilizables en
deberes, con su exactitud verificada en lugar de asumida. Los costos: almacenamiento y retención
para un registro por decisión; una suite de explicación para mantener junto con el modelo;
plantillas en lenguaje simple que necesitan pruebas con destinatarios reales; y, para modelos
complejos, el riesgo de que ninguna explicación fiel sea lo suficientemente simple, que es un
hallazgo de diseño, no uno de documentación.

## Patrones relacionados
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Correspondencias:** Reglamento de IA Art. 86, Art. 26(11), Art. 13(3)(b)(iv) · RGPD Art. 15(1)(h),
Art. 22 · Regulación B (12 CFR 1002.9) · ISO/IEC 42001 A.8.2 · NIST AI RMF (Measure 2.8, 2.9) · Capa
04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance.

Las etiquetas de función y subcategoría siguen el NIST AI RMF [9]; los ids de ISO/IEC 42001 Anexo A
siguen un crosswalk publicado, no el texto del estándar [10]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 86(1) right to explanation of individual decision-making (Annex III systems except point 2); Art. 26(11) deployers inform natural persons subject to Annex III systems; Art. 13(3)(b)(iv) capabilities to provide information relevant to explain the output (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2016/679 (GDPR), Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[3] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation). JuLIA project case-law database. 2025-02-27. https://www.julia-project.eu/database/case-law/319 (verified: secondary)
[4] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons) and Supplement I, comment 9(b)(2) (reasons must relate to factors actually considered or scored). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[5] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[6] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[7] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[8] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.8 transparency and accountability risks "examined and documented"; MEASURE 2.9 model "explained, validated, and documented" and output "interpreted within its context"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
