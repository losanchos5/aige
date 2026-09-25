---
lang: es
source: bok/patterns/claims-substantiation-gate.md
sourceHash: "8aa53627e138fdeb83eabfc7f57afd3ad70d870c8fcec31a058c678db4692172"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: claims-substantiation-gate
title: Claims Substantiation Gate
layer: 5
secondaryLayer: 3
order: 25
summary: "Un registro de afirmaciones que vincula cada declaración pública sobre la precisión, equidad o capacidad de un sistema de IA a la ejecución de eval que la respalda, y retira las afirmaciones obsoletas."
---

# Patrón: Claims Substantiation Gate

**Resumen:** Mantén un registro de cada declaración pública sobre qué hace un sistema de IA y qué
tan bien: precisión, equidad, seguridad, autonomía, capacidad "impulsada por IA". Cada afirmación es
una fila que cita la ejecución de eval que la respalda, la población y las condiciones en que se
midió, y la fecha. Una puerta bloquea la publicación de una afirmación sin evidencia activa, y cada
lanzamiento de modelo reejecutar las evals citadas e identifica cualquier afirmación que la nueva
versión ya no respalda. Es una puerta de eval apuntada a textos de marketing, materiales de ventas y
las cifras de precisión declaradas en las instrucciones de uso.

## Objetivos
Di solo lo que la evidencia respalda, para la población que la afirmación describe, y sigue
diciéndolo solo mientras siga siendo cierto; y sé capaz de mostrar, para cualquier afirmación, qué
la respalda el día en que se hizo.

## Usuarios objetivo
Ingeniero de gobernanza de IA, marketing de producto, habilitación de ventas, ingeniero de ML,
asesor legal y de derecho del consumidor, relaciones con inversores.

## Partes interesadas afectadas
Clientes y consumidores, responsables del despliegue que confían en las cifras del proveedor,
inversores, reguladores de protección del consumidor y financieros, autoridades de vigilancia del
mercado.

## Principios relevantes
Dale dientes a cada control; instrumenta la compilación para que produzca su propia evidencia;
comienza desde un modo de fallo o daño nombrado.

## Contexto
Las páginas de producto, presentaciones de ventas, licitaciones, materiales para inversores, fichas
de modelo e instrucciones de uso dicen qué tan precisos, equitativos, seguros o autónomos es un
sistema. El texto se escribe una vez y es propiedad del marketing; la evidencia es producida por ML
y cambia con cada lanzamiento. Los reguladores leen ese texto. El anuncio de la FTC sobre Operation
AI Comply declaró que "no hay exención de IA de las leyes en vigor" [1]; su orden Workado siguió una
afirmación de precisión del 98% para un detector de contenido de IA que las pruebas pusieron en el
53% en contenido de uso general, y requiere evidencia competente y confiable para tales afirmaciones
[2]. La SEC llegó a un acuerdo con dos asesores de inversión por declaraciones falsas y engañosas
sobre su uso de IA [3]. Bajo el Reglamento de IA de la UE, la finalidad prevista en sí se define en
parte por los "materiales y declaraciones promocionales o de ventas" del proveedor (`Art. 3(12)`), y
para sistemas de alto riesgo los "niveles de precisión y las métricas de precisión relevantes" deben
declararse en las instrucciones de uso (`Art. 15(3)`), indicando el nivel "contra el cual el sistema
de IA de alto riesgo ha sido probado y validado" (`Art. 13(3)(b)(ii)`) [4].

## Problema
Las afirmaciones sobreviven a la evidencia que una vez las respalda, o nunca tuvieron ninguna.

- **Fuerzas.** El marketing quiere un número simple; el número honesto tiene un intervalo y una
  población. Las evals se ejecutan en los datos disponibles, no en la población que la afirmación
  describe: el detector de Workado fue entrenado en texto académico, y la afirmación falló en todo
  lo demás [2]. Las cifras del proveedor se repiten como si se midieran internamente. El engaño, en
  la política de la FTC, es una representación, omisión o práctica probable que engañe a un
  consumidor que actúa razonablemente, y material [5]; la Directiva de Prácticas Comerciales
  Desleales de la UE y la Ley de Mercados Digitales, Competencia y Consumidores del Reino Unido de
  2024 prohíben las prácticas comerciales desleales en términos generales [6] [7].
- **Modo de fallo.** Una regresión se envía y la antigua afirmación de precisión permanece en el
  sitio web. Una afirmación de equidad descansa en un folleto del proveedor. Una autoridad pregunta
  qué respalda una declaración hecha hace un año, y la única respuesta es la diapositiva en la que
  apareció.

## Solución
Registra la afirmación, vinculala a la evidencia, y cierra tanto la publicación como el lanzamiento
en la vinculación.

1. **Registra cada afirmación.** Una fila por afirmación: el texto exacto, cada lugar donde aparece
   (URLs, documentos, las instrucciones de uso, la ficha de modelo), el sistema y versión, la
   métrica, el valor afirmado, el propietario y el estado. "Impulsado por IA" y "autónomo" son
   afirmaciones también: la fila apunta a la entrada del registro que muestra qué hace realmente el
   sistema.
2. **Vincula cada afirmación a la evidencia.** La fila cita la suite de eval y la ejecución, el
   valor medido con su intervalo, y la población y condiciones de medición. La prueba del AI RMF es
   la correcta: el desempeño "demostrado para condiciones similares a los escenarios de despliegue"
   (MEASURE 2.3), con los límites de generalización documentados (MEASURE 2.5) [8]. Las reglas de
   sustanciación se ejecutan como código: la población de medición debe coincidir con el alcance de
   la afirmación; una cifra puntual se afirma solo si el límite inferior del intervalo la respalda;
   una afirmación comparativa necesita una comparación pareada en los mismos datos; una cifra
   suministrada por un proveedor se marca como atestiguada por el proveedor hasta que se vuelva a
   medir.
3. **Cierra la publicación.** El texto que lleva una afirmación registrada no puede publicarse, o
   enviarse en una licitación, mientras la evidencia de la afirmación esté faltante, obsoleta o
   fallando. Las afirmaciones cuantitativas no registradas se detectan en la revisión por la misma
   regla que bloquea los sistemas no registrados.
4. **Cierra el lanzamiento.** Cada lanzamiento de modelo reejecutar las suites citadas. Una
   afirmación cuya evidencia cae por debajo del valor afirmado falla el lanzamiento o abre una tarea
   de retiro con una fecha límite y un propietario; la precisión declarada en las instrucciones de
   uso se regenera a partir de las mismas filas.
5. **Mantén el historial.** Las afirmaciones retiradas y enmendadas mantienen su registro (qué se
   dijo, dónde, en qué evidencia, hasta cuándo), para que la organización pueda mostrar qué sabía y
   cuándo.

Fila ilustrativa del registro de afirmaciones:

```json
{
  "claim_id": "CLM-2026-017",
  "text": "Catches 95% of card-not-present fraud",
  "locations": ["https://www.example.com/product/fraud-shield", "sales-deck-2026Q3#slide-4",
                "instructions-for-use/fraud-cnp/5.3#accuracy"],
  "system": "fraud-cnp@5.3.0",
  "metric": "recall on confirmed card-not-present fraud",
  "claimed_value": 0.95,
  "evidence": { "suite_id": "fraud.recall.cnp.v7", "run": "ci-run-99812", "value": 0.962,
                "ci95": [0.953, 0.970], "population": "EU card-not-present, 2026-Q2, n=4120 confirmed fraud",
                "timestamp": "2026-09-12T08:00:00Z" },
  "scope_match": "pass",
  "status": "substantiated",
  "owner": "product-marketing-fraud",
  "revalidate_on": ["model_release", "2026-12-31"]
}
```

> **Ejemplo (ilustrativo)** El sitio web de un producto de fraude afirmaba una tasa de detección
> medida dos versiones de modelo antes en el tráfico de un país. Registrar la afirmación mostró
> ambas brechas: la evidencia era obsoleta y la población más estrecha de lo que el texto implicaba.
> La afirmación fue reescrita para nombrar la región, el siguiente lanzamiento reejecutó la suite, y
> un reentrenamiento posterior que cayó por debajo del valor afirmado abrió una tarea de retiro
> antes de que el nuevo modelo se enviara.

## Consecuencias
Las declaraciones públicas se vuelven evidenciadas, delimitadas y fechadas, las afirmaciones
obsoletas se retiran por la tubería en lugar de por un regulador, y la precisión declarada en las
instrucciones de uso se mantiene consistente con el marketing. Los costes: el marketing y la ley
deben aceptar un registro y un paso de revisión; las afirmaciones honestas son más estrechas y
llevan intervalos; y la regla sobre coincidencia de alcance necesita criterio para afirmaciones
cualitativas, que permanecen con revisión legal.

## Patrones relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondencias:** Reglamento de IA Art. 3(12), Art. 13(3)(b)(ii), Art. 15(3) · FTC Act s. 5 ·
Directiva 2005/29/CE Art. 5 · DMCC Act 2024 s. 225 · ISO/IEC 42001 A.8.2, A.8.5 · NIST AI RMF
(Measure 2.3, 2.5) · Capa 05 Assurance & Continuous Compliance / Capa 03 Evals & Red Teaming as
Evidence.

Las etiquetas de función y subcategoría siguen el NIST AI RMF [8]; los ids de ISO/IEC 42001 Annex A
siguen un mapeo publicado, no el texto del estándar [9]. Los mapeos son ilustrativos, no una
afirmación de conformidad.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; trained on academic text; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[3] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose incl. "promotional or sales materials and statements"; Art. 13(3)(b)(ii) level of accuracy, incl. its metrics, against which the system has been tested and validated; Art. 15(3) accuracy levels and metrics declared in the instructions for use (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[6] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[7] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.3 performance "demonstrated for conditions similar to deployment setting(s)"; MEASURE 2.5 validity and reliability, limits of generalisability documented). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[9] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users, B.8.5 information for interested parties; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
