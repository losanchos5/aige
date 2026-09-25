---
lang: es
source: bok/patterns/aibom.md
sourceHash: "6e929d4beb125a7562e751991ab3082ab4a2d2a41c33715bf06e279fb4a112d5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: aibom
title: AIBOM
layer: 2
order: 5
summary: "Una lista de materiales de IA emitida en la compilación, registrando modelos, conjuntos de datos, pesos y su procedencia en un formato estándar junto a la entrada del registro."
---

# Patrón: AIBOM

**Resumen:** Genera una lista de materiales de IA en la compilación para cada sistema de IA,
registrando modelos, conjuntos de datos, pesos y su procedencia en un formato estándar, y almacénala
con la entrada del registro. El AIBOM es lo que las capas de transparencia y eval leen para saber
qué documentar y qué probar.

## Objetivos
Haz que la composición y procedencia de un sistema de IA sean legibles por máquina, para que el
riesgo de cadena de suministro y las obligaciones de transparencia puedan ser respondidas desde un
artefacto, no reconstruidas.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de ML, ingeniero de seguridad.

## Partes interesadas afectadas
Propietarios de modelos, responsables del despliegue a nivel posterior, auditores, adquisiciones.

## Principios relevantes
Instrumenta la compilación para que produzca su propia evidencia; comienza desde un modo de fallo o
daño nombrado.

## Contexto
Sistemas de IA ensamblados a partir de modelos base, ajustes finos, conjuntos de datos de terceros y
librerías, donde el SBOM clásico captura dependencias de software pero no modelos ni datos.

## Problema
Sin una lista de materiales para modelos y datos, una organización no puede responder qué versión
del modelo, de qué procedencia, entrenado con qué datos, está dentro de un sistema dado, por lo que
no puede evaluar el riesgo de la cadena de suministro ni producir documentación de transparencia
bajo demanda.

## Solución
Emite un AIBOM en la compilación en un formato estándar, CycloneDX ML-BOM o el perfil de IA de SPDX
3.0, por ejemplo con el generador AIBOM de OWASP [1] (ilustrativo), cubriendo modelos, conjuntos de
datos, pesos y su procedencia y licencias. Adjúntalo a la entrada del registro y regeneralo en cada
compilación para que nunca se desvíe del sistema desplegado.

> **Ejemplo (ilustrativo)** El AIBOM de un asistente aumentado por recuperación lista el modelo
> base, el modelo de incrustación, la instantánea del corpus y sus licencias; cuando una licencia
> del corpus cambia, la diferencia aparece en el AIBOM de la siguiente compilación.

## Consecuencias
Las preguntas sobre la cadena de suministro y la procedencia se convierten en consultas; los
documentos de transparencia pueden generarse a partir del AIBOM. El coste es la integración de la
cadena de herramientas y mantener precisos los metadatos de procedencia.

## Patrones relacionados
[Agent Registry](/patterns/agent-registry);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal).

**Correspondencias:** Reglamento de IA Art. 11, Art. 53 (documentación de IA de uso general) ·
ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · Capa 02 Inventory & Transparency.

Las etiquetas de función siguen el NIST AI RMF [2]. Los mapeos son ilustrativos, no una afirmación
de conformidad.

## Sources

[1] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
