---
lang: es
source: bok/patterns/agent-identity-scoped-credentials.md
sourceHash: "55431cbb8efa2afa776e743d9403dd351f1aa386460f499aa836c7048c9bd27f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-identity-scoped-credentials
title: "Agent Identity & Scoped Credentials"
layer: 4
order: 14
summary: "Cada agente obtiene su propia identidad, propietario, alcance acotado y vencimiento antes de actuar, de modo que sus acciones son atribuibles y su acceso revocable."
---

# Patrón: Agent Identity & Scoped Credentials

**Resumen:** Dale a cada agente su propia identidad, un propietario, un alcance acotado y un
vencimiento, establecidos antes de que actúe, de modo que sus acciones puedan ser atribuidas, su
acceso revocado con precisión y su alcance contenido. La identidad es la precondición de la
responsabilidad; el alcance es la precondición de la contención.

## Objetivos
Haz cada actor no humano gobernable por construcción: atribuible, acotable, revocable, con
vencimiento.

## Usuarios objetivo
Ingeniero de gobernanza de IA, ingeniero de seguridad, equipo de IAM/plataforma.

## Partes interesadas afectadas
Propietarios de modelos, operaciones de seguridad, auditores, terceros afectados.

## Principios relevantes
Registra y acota cada actor antes de que actúe; comienza desde un modo de fallo o daño nombrado.

## Contexto
Agentes que actúan bajo autoridad delegada (llamando a APIs, herramientas y otros agentes), donde el
valor predeterminado es una cuenta de servicio compartida o una clave estática.

## Problema
Un agente con credenciales prestadas no puede ser atribuido, contenido o revocado. NIST's NCCoE
plantea la pregunta abierta directamente: cómo se aplican la identificación, autenticación y
autorización de modo que cada agente sea "conocido, confiable y adecuadamente gobernado", con no
repudio y registro a prueba de manipulaciones [1].

## Solución
Emite a cada agente una identidad de carga de trabajo distinta con un alcance declarado, un
propietario y un vencimiento, registrados en el Agent Registry. Mantén dos preguntas separadas.
**Autenticación de canal** asegura un salto: cómo un cliente se autentica en un servidor de
herramientas; la especificación MCP de 2026-07-28 apretó exactamente esto, deprecando Dynamic Client
Registration a favor de Client ID Metadata Documents y vinculando credenciales a su emisor [2]. Eso
endurece la conexión MCP pero no es la identidad del agente.
**Identidad de carga de trabajo del agente** es la identidad durable y atribuible que el agente
lleva en cada salto y protocolo, bajo la cual sus acciones se registran y su acceso se revoca: el
trabajo de un sistema de identidad de carga de trabajo (SPIFFE/SPIRE) o una identidad de agente de
primera clase de un proveedor empresarial (por ejemplo Microsoft Entra Agent ID [3] u Okta Agent SSO
[4]; ilustrativo), registrado en el registro, no del protocolo de transporte. Asegura el canal *y*
emite la identidad de carga de trabajo; acota sus credenciales al menor privilegio que la función
declarada del agente necesita.

> **Ejemplo (ilustrativo)** Un agente de análisis de datos se autentica con una credencial vinculada
> al emisor y un alcance limitado a acceso de solo lectura a un conjunto de datos; cada una de sus
> acciones se registra bajo su propia identidad, y su credencial vence con su entrada de registro.

## Consecuencias
La atribución, contención y revocación precisa se hacen posibles, y el kill switch tiene algo en lo
que actuar. El costo es la integración de IAM y la gestión de identidades no humanas a escala.

## Patrones relacionados
[Agent Registry](/patterns/agent-registry);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Policy Card](/patterns/policy-card); [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).

**Correspondencias:** Reglamento de IA Art. 12, Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF
(Manage) · CSA AICM · OWASP Agentic ASI03 · Layer 04 Runtime Controls & Observability.

Los IDs de amenaza siguen el Top 10 de OWASP para Aplicaciones Agentic 2026 [5] y las etiquetas de
función el NIST AI RMF [6]. Los mapeos son ilustrativos, no una afirmación de conformidad.

## Sources

[1] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[2] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[3] Microsoft Entra Agent ID (first-class agent identity; OAuth 2.0, MCP, A2A). Microsoft Learn. 2026-04. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id (verified: primary)
[4] "Okta brings first-class identity to AI agents with Agent SSO" (GA 24 Aug 2026; Cross App Access as MCP EMA extension). Okta. 2026-08-24. https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/ (verified: primary)
[5] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
