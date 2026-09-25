---
lang: pt
source: bok/patterns/agent-identity-scoped-credentials.md
sourceHash: "55431cbb8efa2afa776e743d9403dd351f1aa386460f499aa836c7048c9bd27f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-identity-scoped-credentials
title: "Agent Identity & Scoped Credentials"
layer: 4
order: 14
summary: "Cada agente obtém a sua própria identidade, proprietário, âmbito limitado e expiração antes de agir, para que as suas ações sejam atribuíveis e o seu acesso revogável."
---

# Padrão: Agent Identity & Scoped Credentials

**Resumo:** Dá a cada agente a sua própria identidade, um proprietário, um âmbito limitado e uma
expiração, estabelecidos antes de agir, para que as suas ações possam ser atribuídas, o seu acesso
revogado com precisão e o seu âmbito contido. A identidade é a precondição da responsabilidade; o
âmbito é a precondição da contenção.

## Objetivos
Torna cada ator não humano governável por construção: atribuível, limitável, revogável, expirável.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de segurança, equipa de IAM/plataforma.

## Partes interessadas afetadas
Proprietários de modelos, operações de segurança, auditores, terceiros afetados.

## Princípios relevantes
Regista e limita cada ator antes de agir; começa por um modo de falha ou dano nomeado.

## Contexto
Agentes que agem sob autoridade delegada (chamando APIs, ferramentas e outros agentes), onde a
predefinição é uma conta de serviço partilhada ou uma chave estática.

## Problema
Um agente com credenciais emprestadas não pode ser atribuído, contido ou revogado. O NIST's NCCoE
enquadra a questão aberta diretamente: como é que identificação, autenticação e autorização se
aplicam para que cada agente seja "conhecido, confiável e adequadamente governado", com não-repúdio
e registo à prova de adulteração [1].

## Solução
Emite a cada agente uma identidade de carga de trabalho distinta com um âmbito declarado, um
proprietário e uma expiração, registados no Agent Registry. Mantém duas questões separadas.
**Autenticação de canal** protege um salto: como um cliente se autentica num servidor de
ferramentas; a especificação MCP de 2026-07-28 apertou exatamente isto, descontinuando Dynamic
Client Registration em favor de Client ID Metadata Documents e vinculando credenciais ao seu emissor
[2]. Isto enrijece a ligação MCP mas não é a identidade do agente.
**Identidade de carga de trabalho do agente** é a identidade durável e atribuível que o agente
carrega em cada salto e protocolo, sob a qual as suas ações são registadas e o seu acesso revogado:
o trabalho de um sistema de identidade de carga de trabalho (SPIFFE/SPIRE) ou uma identidade de
agente de primeira classe de um prestador empresarial (por exemplo Microsoft Entra Agent ID [3] ou
Okta Agent SSO [4]; ilustrativo), registada no registo, não do protocolo de transporte. Protege o
canal *e* emite a identidade de carga de trabalho; limita as suas credenciais ao menor privilégio
que a função declarada do agente necessita.

> **Exemplo (ilustrativo)** Um agente de análise de dados autentica-se com uma credencial vinculada
> ao emissor e um âmbito limitado a acesso apenas de leitura a um conjunto de dados; cada uma das
> suas ações é registada sob a sua própria identidade e a sua credencial expira com a sua entrada no
> registo.

## Consequências
A atribuição, contenção e revogação precisa tornam-se possíveis, e o kill switch tem algo em que
atuar. O custo é a integração de IAM e a gestão de identidades não humanas em escala.

## Padrões relacionados
[Agent Registry](/patterns/agent-registry);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Policy Card](/patterns/policy-card); [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).

**Correspondências:** Regulamento da IA Art. 12, Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF
(Manage) · CSA AICM · OWASP Agentic ASI03 · Layer 04 Runtime Controls & Observability.

Os IDs de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [5] e os rótulos de função o
NIST AI RMF [6]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[2] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[3] Microsoft Entra Agent ID (first-class agent identity; OAuth 2.0, MCP, A2A). Microsoft Learn. 2026-04. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id (verified: primary)
[4] "Okta brings first-class identity to AI agents with Agent SSO" (GA 24 Aug 2026; Cross App Access as MCP EMA extension). Okta. 2026-08-24. https://www.okta.com/newsroom/press-releases/okta-brings-first-class-identity-to-ai-agents-with-agent-sso/ (verified: primary)
[5] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
