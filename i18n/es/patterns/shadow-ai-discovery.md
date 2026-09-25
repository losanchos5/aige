---
lang: es
source: bok/patterns/shadow-ai-discovery.md
sourceHash: "111b0c4d599fa4a939ded2796f092a76ec6baf037b98ca0e46bfe0d9467f5c4f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: shadow-ai-discovery
title: Shadow-AI Discovery
layer: 2
order: 16
summary: "Descubrimiento continuo de sistemas de IA y agentes que se ejecutan sin una entrada de registro, reconciliados contra el registro para que el inventario coincida con la producción."
---

# Patrón: Shadow-AI Discovery

**Resumen:** Descubre continuamente sistemas de IA y agentes que se están ejecutando pero no están
registrados, y reconcílialos contra el registro, para que el inventario refleje la realidad en lugar
de solo lo que los equipos recordaron declarar. No puedes gobernar lo que no puedes ver.

## Objetivos
Cierra la brecha entre el registro y la producción encontrando modelos, agentes y herramientas
habilitadas para IA no registrados, y poniéndolos bajo gobernanza.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de seguridad, equipo de plataforma.

## Partes interesadas afectadas
Propietarios de modelos, operaciones de seguridad, auditores.

## Principios relevantes
Registra y delimita cada actor antes de que actúe; haz que el camino gobernado sea el más fácil.

## Contexto
Una organización donde los equipos adoptan herramientas de IA e inician agentes más rápido de lo que
cualquier inventario central puede rastrear, y donde, según la comparación de un proveedor de la
categoría, gran parte del mercado de plataformas de gobernanza de IA "gestiona el programa ... sin
ninguna ruta de datos de runtime" [1].

## Problema
Un registro alimentado solo por declaración voluntaria siempre está atrasado. Los agentes no
registrados, la flota fantasma, son exactamente la capa que un inventario en papel no puede ver, y
una encuesta de un proveedor de seguridad de 2026 reporta que aproximadamente uno de cada ocho
brechas de IA involucraron sistemas agénticos [2].

## Solución
Ejecuta el descubrimiento contra los entornos donde aparece la IA (proveedores de identidad, cuentas
en la nube, salida de red, repositorios de código, integraciones SaaS) usando herramientas de
descubrimiento (ilustrativas) para encontrar modelos y agentes. Reconcilia los hallazgos contra el
registro, abre una entrada para cada desconocido con un propietario para reclamarlo, y escala lo no
reclamado. Alimenta el resultado nuevamente en la comprobación de drift del Agent Registry.

> **Ejemplo (ilustrativo)** Un barrido de descubrimiento semanal encuentra un agente que llama a una
> API externa desde la cuenta en la nube de un equipo sin entrada de registro; se registra
> automáticamente como no reclamado, se notifica a su propietario y su alcance se congela hasta que
> se reclame.

## Consecuencias
El inventario converge en la realidad y el punto ciego se reduce. El coste es la integración del
descubrimiento y el proceso para clasificar y reclamar lo que encuentra.

## Patrones relacionados
[Agent Registry](/patterns/agent-registry);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondencias:** Reglamento de IA Art. 49/71 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM ·
OWASP Agentic ASI10 · Layer 02 Inventory & Transparency.

Los IDs de amenaza siguen el OWASP Top 10 for Agentic Applications 2026 [3] y las etiquetas de
función el NIST AI RMF [4]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
