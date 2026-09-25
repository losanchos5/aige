---
lang: es
source: bok/patterns/adversarial-red-team-suite.md
sourceHash: "c4d084fd1712d0e8721e2a1ba027323a2a5cdcd94936434061e34b761a4d8b51"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: adversarial-red-team-suite
title: Adversarial Red-Team Suite
layer: 3
order: 3
summary: "Un conjunto de pruebas adversariales versionado construido a partir de una taxonomía de amenazas, ejecutado en CI o según un cronograma, cuyos hallazgos se clasifican, registran y retroalimentan como pruebas."
---

# Patrón: Adversarial Red-Team Suite

**Resumen:** Mantén un conjunto de pruebas adversariales versionado, construido a partir de una
taxonomía de amenazas y ejecutado en CI o según un cronograma, cuyos hallazgos se clasifican en
correcciones o riesgos aceptados, se registran como evidencia y se retroalimentan en el conjunto.
Cuando una Eval Gate prueba que un umbral aún se mantiene, el conjunto de red team es el adversario
permanente que sigue encontrando las entradas que el umbral nunca anticipó.

## Objetivos
Convierte las pruebas adversariales de un ejercicio único en un control mantenido y versionado que
descubre modos de fallo antes de que lo haga un atacante y deja un registro clasificado y auditable
de cada hallazgo.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de seguridad, ingeniero de ML, líder de red team.

## Partes interesadas afectadas
Propietarios de modelos, usuarios expuestos al sistema, respondedores de incidentes, auditores,
reguladores.

## Principios relevantes
Comienza desde un modo de fallo o daño nombrado; da a cada control capacidad de acción.

## Contexto
Un modelo o agente cuya exposición crece a medida que gana herramientas, prompts y alcance, en una
organización que ya ejecuta una Eval Gate para regresión y quiere un adversario permanente en lugar
de una única prueba de penetración previa al lanzamiento.

## Problema
Un red team único queda obsoleto en el momento en que el sistema cambia, y sus hallazgos, una
diapositiva de jailbreaks, no dejan rastro de que fueron corregidos o aceptados. Sin un conjunto
versionado y un registro de clasificación, el mismo ataque se redescubre cada trimestre y nadie
puede probar qué hallazgos fueron cerrados.

## Solución
Construye el conjunto a partir de una taxonomía de amenazas en lugar de intuición: extrae técnicas
de las tácticas y técnicas adversariales de MITRE ATLAS para sistemas de IA [1] y las clases de
ataque agentic en el Top 10 de OWASP para Aplicaciones Agentic [2], de modo que cada prueba se trace
a una técnica nombrada. Versionea el conjunto junto con el modelo y ejecútalo en CI o según un
cronograma contra la versión registrada. Encamina cada hallazgo a través de clasificación (corregir,
o aceptar con una justificación registrada y un propietario) y archiva el resultado como un registro
de evidencia estructurado contra la entrada del registro. Retroalimenta cada hallazgo confirmado en
el conjunto como una prueba de regresión, de modo que un ataque cerrado permanezca cerrado. El
conjunto complementa la Eval Gate: la puerta refuerza un umbral en cada lanzamiento, el conjunto es
el adversario que genera el siguiente.

> **Ejemplo (ilustrativo)** Un conjunto de red team para un asistente de servicio al cliente ejecuta
> un conjunto versionado de casos de inyección de prompts y abuso de herramientas extraídos de ATLAS
> y las clases agentic de OWASP; un nuevo hallazgo de exfiltración de herramientas se clasifica,
> corrige y se añade al conjunto, de modo que el siguiente lanzamiento debe pasarlo.

### Del modelo de amenaza al plan de pruebas

Un conjunto construido a partir de una taxonomía aún necesita una razón para cada caso. Esa razón es
el modelo de amenaza del sistema tal como se implementa, y el paso que convierte uno en el otro está
escrito, de modo que un revisor pueda ver por qué el conjunto contiene lo que contiene y qué deja
fuera.

1. **Descompón el sistema.** Dibuja los flujos de datos tal como se ejecutan: usuarios, la
   aplicación, recuperación, el modelo, las herramientas y sus credenciales, memoria y cada
   consumidor posterior de salidas. Marca cada límite de confianza y marca qué componentes posees y
   cuáles ejecuta un proveedor.
2. **Enumera amenazas por elemento, por id.** Camina cada elemento contra los catálogos específicos
   de IA: el Top 10 de OWASP para Aplicaciones LLM 2026 para el modelo como componente [3], el Top
   10 de OWASP para Aplicaciones Agentic para herramientas, memoria y delegación [2], técnicas de
   MITRE ATLAS para la ruta del atacante [1] y la taxonomía de aprendizaje automático adversarial de
   NIST para ataques en modelos predictivos y generativos, como evasión, envenenamiento y ataques de
   privacidad [4]. El perfil de desarrollo seguro de NIST para IA generativa pide exactamente esto:
   modelado de riesgos que incluya tipos de vulnerabilidad y amenaza específicos de IA (`PW.1.1`)
   [5]. Registra cada amenaza con su id externo, de modo que el modelo lee `LLM01:2026` o
   `AML.T0051`, no "riesgo de inyección".
3. **Nombra el control y la prueba que lo demuestra.** Para cada amenaza en alcance, escribe el
   control esperado para detenerla y la prueba que fallaría si el control no funcionara. La prueba
   se convierte en una entrada del conjunto en el plan de pruebas del lanzamiento, que valida contra
   [`test-plan.v1.json`](/schemas/test-plan.v1.json): un id de conjunto versionado, la categoría
   (`adversarial`, `security`, `privacy`), la métrica, un umbral fijado antes de las pruebas, el
   modo de fallo que protege y si un fallo bloquea el lanzamiento.
4. **Etiqueta cada caso con sus ids de amenaza.** Un caso lleva los ids de las amenazas que ejerce,
   y un hallazgo los hereda, de modo que un hallazgo se trace desde técnica a control a la eval que
   ahora lo protege, y un informe de cobertura puede listar las amenazas en alcance que ningún caso
   ejerce aún.
5. **Registra qué está fuera de alcance y por qué.** Una amenaza que el sistema no puede enfrentar
   (sin herramientas, sin memoria, sin datos personales) se cierra con una razón; una amenaza que no
   puedes probar (los pesos de un proveedor) se encamina a la
   [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) como evidencia
   atestiguada por el proveedor. Vuelve a ejecutar el paso cuando los flujos de datos cambien: una
   herramienta nueva, un corpus nuevo, un modelo nuevo.

El [puente de amenazas](/resources/threats) contiene el resultado de los pasos 2 y 3 como datos
abiertos: cada fila toma un id de amenaza externo a los patrones que lo controlan, una eval de
ejemplo que lo prueba y las obligaciones que la evidencia ayuda a satisfacer.

```yaml
# one entry of the test plan's `suites`, derived from a threat (illustrative)
suite_id: indirect-injection.v4
category: adversarial
metric: attack success rate on planted instructions in retrieved documents
threshold: "<= 0.02"
direction: lower_is_better
failure_mode: >-
  agent follows instructions found in retrieved content
  (LLM01:2026, ASI01, AML.T0051.001, NISTAML.015)
blocking: true
```

## Consecuencias
La cobertura adversarial crece con el tiempo en lugar de reiniciarse en cada lanzamiento, y el
registro de clasificación muestra qué fue encontrado, corregido o aceptado. El costo es mantener la
taxonomía y el conjunto, el cálculo para ejecutar casos adversariales a menudo, y la disciplina de
clasificar cada hallazgo en lugar de dejar que caduque. El paso del modelo de amenaza añade su
propio mantenimiento: el modelo se vuelve obsoleto el día en que se añade una herramienta o un
corpus, por lo que debe volver a ejecutarse en cambio, no una vez al año.

## Patrones relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Incident Pipeline](/patterns/incident-pipeline);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondencias:** Reglamento de IA Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI RMF
(Measure) · OWASP Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Los IDs de amenaza siguen el Top 10 de OWASP para Aplicaciones Agentic 2026 [2] y las etiquetas de
función el NIST AI RMF [6]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] OWASP GenAI LLM Top 10 2026 (LLM01 Prompt Injection to LLM10 Improper Output Handling; published 3 Aug 2026; canonical Markdown in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (predictive and generative AI attack classes with NISTAML identifiers). NIST. 2025-03-24. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[5] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (recommendation R1 on SSDF 1.1 task PW.1.1: include AI model-specific vulnerability and threat types in risk modelling). NIST. 2024-07. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
