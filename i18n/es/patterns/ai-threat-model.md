---
lang: es
source: bok/patterns/ai-threat-model.md
sourceHash: "c6e202cafb0a952d2c1905a3058a54e99ecf670f49c955b26240308a2cc50482"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: ai-threat-model
title: AI Threat Model
layer: 1
secondaryLayer: 3
order: 19
summary: "Un modelo de amenaza versionado por sistema de IA: STRIDE extendido con ataques específicos de IA, donde cada amenaza se resuelve en una mitigación y la prueba que lo demuestra."
---

# Patrón: AI Threat Model

**Resumen:** Modela las amenazas de cada sistema de IA en la revisión de diseño como un archivo de
datos versionado, no una diapositiva: descompón sus flujos de datos, enumera amenazas por elemento
con una lista de verificación clásica como STRIDE extendido con los ataques específicos de IA que
MITRE ATLAS, NIST AI 100-2 y las listas de OWASP catalogan, y requiere que cada amenaza por encima
de la tolerancia se resuelva en una mitigación y en la prueba que demuestra que la mitigación
funciona. El modelo de amenaza decide qué cubre la suite de red team, los guardrails y los controles
de cadena de suministro, y se reabre cada vez que el sistema o el catálogo de amenazas cambia.

## Objetivos
Convierte "¿qué puede salir mal?" en una cadena rastreable de amenaza, mitigación y prueba, para que
los controles de seguridad de un sistema de IA se elijan desde su diseño en lugar de por hábito, y
un auditor pueda ver que cada clase de ataque conocida fue considerada y manejada o aceptada por un
propietario nombrado.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de seguridad, ingeniero de ML, equipo de plataforma.

## Partes interesadas afectadas
Usuarios y personas afectadas por los resultados del sistema, titulares de datos cuyos datos lo
entrenaron o lo alimentan, propietarios de modelos, la función CISO, auditores y autoridades de
vigilancia del mercado.

## Principios relevantes
Comienza desde un modo de fallo o daño nombrado; construye el control en el punto más temprano en
que pueda bloquear; dale dientes a cada control.

## Contexto
Una revisión de diseño para un sistema que entrena o ajusta sobre datos externos, recupera
documentos, llama herramientas o sirve un modelo a través de una API. Los equipos de seguridad ya
modelan amenazas en software, a menudo con STRIDE (suplantación, manipulación, repudio, divulgación
de información, denegación de servicio, elevación de privilegios) como parte de un ciclo de vida de
desarrollo seguro [1]. La IA añade superficie de ataque que esas seis palabras no nombran: datos de
entrenamiento, componentes preentrenados, prompts, corpus de recuperación y la propia API de
inferencia. La guía de Microsoft para sistemas de IA y aprendizaje automático pone el cambio de
alcance claramente: "Training Data stores and the systems that host them are part of your Threat
Modeling scope" [2].

## Problema
Las amenazas que más importan para un sistema de IA son las que una revisión genérica no pregunta.

- **Fuerzas.** La seguridad quiere profundidad, el producto quiere velocidad. Los catálogos de
  ataques de IA son grandes y cambian: el lanzamiento 2026.09 de MITRE ATLAS se envió el 15 de
  septiembre de 2026 [3]. Un modelo de amenaza escrito como documento está desactualizado en el
  siguiente cambio. Los red teams prueban lo que piensan, que no siempre es lo que el diseño expone.
- **Modo de fallo.** La suite de red team y los guardrails se eligen por hábito. Las amenazas
  específicas del sistema (un corpus envenenado, pesos manipulados, extracción a través de la API,
  una herramienta con más alcance del que la tarea necesita) no tienen propietario ni prueba.
  Después de un incidente, nadie puede demostrar que la amenaza fue considerada alguna vez.

## Solución
Mantén el modelo de amenaza junto al registro de diseño, como datos, y haz que la revisión de diseño
falle cuando esté incompleta.

1. **Alcance desde el diseño.** Descompón los flujos de datos (fuentes de datos, canalización de
   entrenamiento, artefacto de modelo y registro, corpus de recuperación, prompts, herramientas, API
   de inferencia, consumidores posteriores) y marca los límites de confianza. Los almacenes de datos
   de entrenamiento y el registro de modelos están en alcance [2].
2. **Haz las cuatro preguntas.** El Threat Modeling Manifesto enmarca el trabajo como "What are we
   working on?", "What can go wrong?", "What are we going to do about it?" y "Did we do a good
   enough job?" [4]. El primero es el diagrama de flujo de datos; los dos siguientes son las filas
   debajo; el último es la puerta.
3. **Enumera por elemento, luego extiende.** Camina cada elemento con STRIDE [1], luego añade las
   clases específicas de IA: los ataques de evasión, envenenamiento, privacidad y mal uso de NIST AI
   100-2 E2025 [5], las técnicas de MITRE ATLAS [3], y el OWASP Top 10 for LLM Applications 2026 [6]
   y for Agentic Applications 2026 [7] para sistemas generativos y agentes. La tabla es una lista de
   verificación inicial, no una completa.

   | Categoría STRIDE | Lectura específica de IA | IDs de catálogo (ejemplos) |
   |---|---|---|
   | Suplantación | Un origen de modelo o conjunto de datos falsificado; un agente o servidor de herramientas suplantado | `AML.T0010.003`; `ASI03`, `ASI04` |
   | Manipulación | Datos de entrenamiento envenenados; un modelo manipulado; instrucciones inyectadas a través de contenido recuperado | `AML.T0020`, `AML.T0018`, `AML.T0051.001`; `LLM05:2026`, `LLM01:2026` |
   | Repudio | Una acción de agente sin identidad atribuible; una decisión sin registro | `ASI03` |
   | Divulgación de información | Inferencia de membresía, inversión de modelo o extracción de modelo a través de la API de inferencia | `AML.T0024.000`, `AML.T0024.001`, `AML.T0024.002` |
   | Denegación de servicio | Consumo ilimitado de tokens, cómputo o llamadas de herramientas | `LLM06:2026` |
   | Elevación de privilegios | Agencia excesiva o mal uso de herramientas; un archivo de modelo que ejecuta código al cargar | `LLM03:2026`, `ASI02`; `AML.T0011.000` |

4. **Califica y decide.** Califica cada amenaza en las escalas de probabilidad y severidad de la
   organización y decide: mitigar, evitar, transferir o aceptar. Una amenaza aceptada se convierte
   en una entrada del registro de riesgos con un aceptador nombrado; una mitigada nombra sus
   controles.
5. **Cierra el bucle con una prueba.** Cada amenaza mitigada lleva el id de la prueba que demuestra
   la mitigación: un caso de red team, una eval, una verificación de canalización (una firma o
   verificación de hash), una prueba de guardrail. La revisión de diseño es una puerta: falla
   mientras cualquier amenaza por encima de la tolerancia no tiene mitigación ni prueba.
6. **Reabre en disparadores.** Una nueva herramienta, fuente de datos, modelo o exposición, un
   incidente o casi incidente, o una técnica nueva relevante en los catálogos reabre el modelo.
   Porque el archivo está versionado, la reapertura es un diff con un revisor.

Para sistemas de alto riesgo bajo el Reglamento de IA de la UE, el resultado es también evidencia de
`Art. 15(5)`: resiliencia contra intentos de terceros no autorizados de explotar vulnerabilidades,
con soluciones técnicas que incluyen, cuando sea apropiado, medidas contra envenenamiento de datos,
envenenamiento de modelos a través de "pre-trained components used in training", ejemplos
adversariales, ataques de confidencialidad y defectos de modelos [8]. Los proveedores de modelos de
uso general con riesgo sistémico deben garantizar "an adequate level of cybersecurity protection"
para el modelo y su infraestructura física (`Art. 55(1)(d)`) [8]. El AI RMF pide que la seguridad y
la resiliencia sean "evaluated and documented" (MEASURE 2.7) [9].

Entrada de amenaza ilustrativa, una fila del archivo de datos del modelo:

```json
{
  "threat_id": "TM-support-rag-07",
  "system": "support-rag@2026-09-20",
  "element": "retrieval corpus ingestion",
  "stride": "tampering",
  "ai_class": "indirect prompt injection through retrieved documents",
  "catalogue": ["AML.T0051.001", "LLM01:2026"],
  "likelihood": "likely",
  "severity": "major",
  "decision": "mitigate",
  "mitigations": ["source allow-list at ingestion", "input guardrail on retrieved chunks",
                  "read-only tool scope for the answering step"],
  "tests": ["redteam.planted-instructions.v3", "canary-docs.never-retrieved.v1"],
  "owner": "team-support-platform",
  "reviewed": "2026-09-22"
}
```

> **Ejemplo (ilustrativo)** La primera revisión de diseño de un asistente de soporte listó inyección
> de prompts y se detuvo ahí. Caminar el diagrama de flujo de datos elemento por elemento añadió
> tres filas: documentos de una wiki de socio entraban al corpus sin revisar, los pesos del modelo
> se extraían de un hub público por etiqueta en lugar de por digest, y la herramienta de tickets
> podía cerrar cualquier ticket, no solo el del solicitante. Cada fila obtuvo un control y una
> prueba: una lista de permitidos de ingesta con casos de instrucciones plantadas, fijación de
> digest con una verificación de canalización, y una herramienta con alcance con una prueba de
> denegación. La puerta de revisión de diseño ahora falla en cualquier fila de amenaza cuya lista
> `tests` esté vacía.

## Consecuencias
La suite de red team, los guardrails y las verificaciones de cadena de suministro se remontan a
amenazas nombradas, y el caso de seguridad para un lanzamiento es una consulta sobre el archivo. Los
costos: el modelado de amenazas requiere tiempo especializado; los catálogos cambian mensualmente,
por lo que alguien es propietario de la revisión delta; y un modelo de amenaza es solo tan bueno
como el diagrama de flujo de datos, que se desvía a menos que el registro de diseño se mantenga
actualizado.

## Patrones relacionados
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Model Artefact Integrity](/patterns/model-artefact-integrity);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering).

**Correspondencias:** Reglamento de IA Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.2, A.6.2.4 ·
NIST AI RMF (Map 5.1; Measure 2.7) · OWASP LLM01:2026, LLM05:2026 · OWASP Agentic ASI02/ASI03/ASI04
· MITRE ATLAS · Layer 01 Govern-as-Code / Layer 03 Evals & Red Teaming as Evidence.

Los IDs de amenaza siguen el OWASP Top 10 for LLM Applications 2026 [6] y for Agentic Applications
2026 [7] y MITRE ATLAS [3]; las etiquetas de función y subcategoría siguen el NIST AI RMF [9]; los
IDs de ISO/IEC 42001 Annex A siguen un crosswalk publicado, no el texto del estándar [10]. Los
mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] Threats: Microsoft Threat Modeling Tool (STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[2] Threat Modeling AI/ML Systems and Dependencies (A. Marshall, J. Parikh, E. Kiciman, R. Shankar Siva Kumar; supplements SDL threat modelling; "Training Data stores and the systems that host them are part of your Threat Modeling scope"). Microsoft Learn. 2019-11 (page dated 2025-03-12). https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml (verified: primary)
[3] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; AML.T0018 Manipulate AI Model; AML.T0020 Training Data Poisoning; AML.T0024.000 Infer Training Data Membership, .001 Invert AI Model, .002 Extract AI Model; AML.T0051.001 LLM Prompt Injection: Indirect). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[4] Threat Modeling Manifesto (definition: "analyzing representations of a system to highlight concerns about security and privacy characteristics"; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-24). https://www.threatmodelingmanifesto.org/ (verified: primary)
[5] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (attack classes incl. evasion, poisoning, privacy compromises and misuse enablement). NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[6] OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM03 Excessive Agency, LLM04 Supply Chain, LLM05 Data and Model Poisoning, LLM06 Unbounded Consumption). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[7] Top 10 for Agentic Applications 2026 (ASI01 to ASI10; ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities (data poisoning, model poisoning through pre-trained components, adversarial examples or model evasion, confidentiality attacks, model flaws); Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 5.1 likelihood and magnitude of each identified impact; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.2 AI system requirements and specification, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
