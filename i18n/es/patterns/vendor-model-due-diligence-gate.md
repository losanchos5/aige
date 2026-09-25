---
lang: es
source: bok/patterns/vendor-model-due-diligence-gate.md
sourceHash: "61ed551de3df62c18170990d3246c6031fd5fb0989f823ca33dd889e35bd71f9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: vendor-model-due-diligence-gate
title: "Vendor / Model Due-Diligence Gate"
layer: 2
secondaryLayer: 5
order: 17
summary: "Una puerta de debida diligencia estructurada para IA comprada y solo API que registra qué puedes y qué no puedes verificar antes de que el sistema llegue a producción."
---

# Patrón: Vendor / Model Due-Diligence Gate

**Resumen:** Controla la compra o integración de un sistema de IA de terceros (SaaS con un LLM
integrado, un modelo de fundación solo API, un agente de un proveedor) en una evaluación de debida
diligencia estructurada, para que un modelo que no posees aún entre a través de un control que
registre qué puedes y qué no puedes verificar sobre él. Cuando no posees el modelo, esta puerta es
lo que reemplaza el equipo rojo que no puedes ejecutar.

## Objetivos
Lleva la IA comprada y solo API bajo la misma disciplina de registro y garantía que los sistemas que
construyes, y haz explícitos los límites de tu verificación en lugar de asumir que desaparecen.

## Usuarios objetivo
Ingeniero de gobernanza de IA, compras, ingeniero de seguridad, DPD.

## Partes interesadas afectadas
Responsables del despliegue, proveedores de modelos, titulares de datos, auditores, reguladores.

## Principios relevantes
Registra y acota cada actor antes de que actúe; comienza desde un modo de fallo o daño nombrado.

## Contexto
Una organización que consume mucha más IA de la que entrena: características de SaaS con un LLM
integrado, modelos de fundación alojados alcanzados solo por API, agentes enviados dentro del
producto de un proveedor. Los pesos, datos de entrenamiento y guardrails internos pertenecen a otro.

## Problema
Las partes del stack que asumen que posees el modelo se degradan cuando no lo haces. No puedes hacer
equipo rojo en pesos que no puedes alcanzar, por lo que una puerta de eval (capa 03) solo puede
probar el sistema del proveedor como una caja negra en su límite; el control en tiempo de ejecución
(capa 04) se reduce a los alcances de herramientas, identidad y tráfico que expone la integración,
no el comportamiento del modelo en sí. Sin gobernanza, la IA comprada se convierte en la flota
fantasma con un contrato: en producción, sin evaluar, y fuera del registro.

## Solución
Convierte la debida diligencia en una puerta que todo sistema de IA adquirido o integrado debe
superar antes de llegar a producción, y estructura la evaluación sobre una plantilla en lugar de un
cuestionario ad hoc; los campos de evaluación de proveedores del Catálogo de Patrones de IA
Responsable de CSIRO son un punto de partida utilizable [1]. Evalúa, como mínimo: las propias
evaluaciones del proveedor y la evidencia de red team (qué compartirán y su independencia); la ficha
de modelo, la documentación del proveedor y cualquier AIBOM que puedas obtener; la base legal y los
flujos de datos, incluyendo si tus entradas entrenan su modelo; los alcances de la herramienta e
identidad que otorgarás al agente del proveedor; los compromisos del proveedor en materia de
notificación de incidentes; y el derecho contractual a auditar y ser notificado de cambios
materiales. Registra el resultado como una entrada de registro con propietario y alcance, y reabre
la puerta en renovación o ante un cambio material del modelo. Ancla la evaluación en ISO/IEC 42001
Anexo A.10 (relaciones con terceros y clientes) [2], la asignación de deberes del Reglamento de IA
de la UE a lo largo de la cadena de valor (obligaciones del proveedor frente a obligaciones del
responsable del despliegue en los artículos 25, 26 y 27 [3]) y, para modelos de uso general, la
transparencia y documentación que el Código de Prácticas de IA de Uso General espera que los
proveedores suministren [4]. Cuando no puedas verificar un control, registra que no puedes, y
compensa limitando la integración: alcances de mínimo privilegio, evals de límite y observación en
tiempo de ejecución más estricta del tráfico que sí controlas.

> **Ejemplo (ilustrativo)** Un equipo que integra un modelo fundacional solo por API no puede probar
> sus pesos, así que la puerta captura las evaluaciones publicadas del proveedor, restringe el
> modelo a una identidad de servicio con alcance sin acceso a datos permanentes, añade una eval de
> límite sobre los propios prompts del equipo, y archiva toda la evaluación como entrada de registro
> del sistema, marcada «proveedor-atestiguado» donde el equipo se basó en la evidencia del proveedor
> en lugar de la suya propia.

### Operar: avisos de cambio, reevaluación y alternativa

Pasar la puerta una vez demuestra poco sobre un sistema que sigue cambiando después de que se firma
el contrato. El paso de operación mantiene la puerta abierta mientras el sistema se ejecute.

- **Trata cada aviso de cambio y deprecación como un evento.** Archiva cada aviso del proveedor (una
  nueva versión del modelo, un cambio de predeterminado, una fecha de deprecación, un nuevo
  subprocesador, nuevos términos de uso de datos) contra la entrada de registro, y vuelve a ejecutar
  la eval de límite contra el sistema modificado antes de que el cambio llegue a los usuarios
  siempre que el contrato te permita fijar una versión. Una fecha de deprecación se convierte en un
  hito fechado en la entrada, con un propietario para la decisión de migración.
- **Detecta el cambio que nadie anunció.** Ejecuta un pequeño conjunto canario de la eval de límite
  en un cronograma contra el endpoint en vivo y alerta cuando sus resultados se salgan de su banda.
  Un cambio detectado sin aviso es un hallazgo bajo el contrato. MITRE ATLAS cataloga la forma
  adversarial del mismo riesgo, un rug pull de cadena de suministro, en el que un componente gana
  confianza y luego envía una actualización maliciosa (`AML.T0109`) [5].
- **Reevalúa en desencadenantes y por nivel, no solo en renovación.** Reabre la puerta en un
  cronograma establecido por el nivel de riesgo y en cualquier desencadenante: un incidente en el
  proveedor o en tu propio despliegue, un cambio de propiedad o de subprocesadores, un cambio
  regulatorio, un cambio material del modelo. El NIST AI RMF pide que los riesgos de terceros se
  monitoreen regularmente y que los modelos preentrenados se monitoreen como parte del mantenimiento
  del sistema (MANAGE 3.1 y 3.2) [6].
- **Mantén una alternativa que hayas probado.** Mantén un modelo alternativo activo en el arnés de
  eval, un proceso manual que el personal haya practicado y los modos degradados a los que el
  sistema puede recurrir, y prueba el cambio con un cronómetro en marcha. El NIST AI RMF pide
  procesos de contingencia para fallos en sistemas de terceros considerados de alto riesgo (GOVERN
  6.2) [7]. El mismo cambio es cómo un responsable del despliegue cumple su deber de monitorear un
  sistema de alto riesgo sobre la base de las instrucciones de uso y suspender el uso cuando
  presenta un riesgo (`Art. 26(5)`) [3]; el [Incident Pipeline](/patterns/incident-pipeline) es
  propietario de la notificación al proveedor.

El lado de continuidad y salida de este paso (interrupciones, modelos retirados, migraciones
forzadas, salida contractual) se establece en el
[capítulo 15](/bok/governing-deployment#when-the-provider-fails-continuity).

> **Ejemplo (ilustrativo)** Un proveedor anuncia que la versión del modelo detrás de un asistente de
> triaje de reclamaciones será retirada en 90 días. El aviso se archiva en la entrada de registro
> con la fecha como hito; la eval de límite se ejecuta contra la versión sucesora la misma semana y
> muestra una caída en dos métricas de subgrupo; el equipo registra una decisión de migración con un
> umbral compensatorio, y un simulacro programado demuestra que el cambio a la cola manual toma
> menos de diez minutos.

## Consecuencias
La IA adquirida se inventaría y se limita, y la dependencia de la evidencia suministrada por el
proveedor es explícita en lugar de oculta. El costo es real: las capas 03 y 04 dan menos garantía
sobre un modelo que no posees, y la puerta depende de la cooperación del proveedor y términos
contractuales que quizás no ganes completamente. El paso de operación añade un costo permanente:
ejecuciones canarias contra un endpoint en vivo, una alternativa activa que debe mantenerse
actualizada, y simulacros que demuestren que la alternativa aún funciona.

## Patrones relacionados
[Agent Registry](/patterns/agent-registry); [AIBOM](/patterns/aibom);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondencias:** Reglamento de IA de la UE Art. 25 (responsabilidades en la cadena de valor),
Art. 26 (deberes del responsable del despliegue), Art. 27 (FRIA), Art. 53 (documentación de IA de
uso general) · ISO/IEC 42001 Anexo A.10 · Código de Prácticas de IA de Uso General · NIST AI RMF
(Map, Govern) · Capa 02 Inventory & Transparency / Capa 05 Assurance & Continuous Compliance.

Las etiquetas de función siguen el NIST AI RMF [8]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act), Arts. 25 (value-chain responsibilities), 26 (deployer obligations, incl. 26(5) monitoring on the basis of the instructions for use, informing the provider and suspending use), 27 (FRIA): allocation of duties between provider and deployer. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; the Transparency chapter's Model Documentation Form for the documentation providers supply to downstream providers). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[5] MITRE ATLAS data, release v2026.09 (AML.T0109 AI Supply Chain Rug Pull; AML.T0010 AI Supply Chain Compromise). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[6] NIST AI RMF Playbook, MANAGE (3.1 third-party risks monitored; 3.2 pre-trained models monitored; 2.4 supersede, disengage or deactivate). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[7] NIST AI RMF Playbook, GOVERN (6.1 third-party risk policies; 6.2 contingency processes for failures in third-party systems deemed high-risk). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[8] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
