---
lang: pt
source: bok/patterns/shadow-ai-discovery.md
sourceHash: "111b0c4d599fa4a939ded2796f092a76ec6baf037b98ca0e46bfe0d9467f5c4f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: shadow-ai-discovery
title: Shadow-AI Discovery
layer: 2
order: 16
summary: "Descoberta contínua de sistemas de IA e agentes em execução sem uma entrada de registo, reconciliados contra o registo para que o inventário corresponda à produção."
---

# Padrão: Shadow-AI Discovery

**Resumo:** Descubra continuamente sistemas de IA e agentes que estão em execução mas não
registados, e reconcilie-os contra o registo, para que o inventário reflita a realidade em vez de
apenas o que as equipas se lembraram de declarar. Não pode governar o que não consegue ver.

## Objetivos
Feche a lacuna entre o registo e a produção encontrando modelos, agentes e ferramentas ativadas por
IA não registados e trazendo-os sob governação.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de segurança, equipa de plataforma.

## Partes interessadas afetadas
Proprietários de modelos, operações de segurança, auditores.

## Princípios relevantes
Registe e delimite cada ator antes de agir; torne o caminho governado o caminho mais fácil.

## Contexto
Uma organização onde as equipas adotam ferramentas de IA e criam agentes mais rapidamente do que
qualquer inventário central consegue rastrear, e onde, pela comparação de um fornecedor da
categoria, grande parte do mercado de plataforma de governação de IA "gere o programa … sem qualquer
caminho de dados de runtime" [1].

## Problema
Um registo alimentado apenas por declaração voluntária está sempre atrasado. Agentes não registados,
a frota sombra, são exatamente a camada que um inventário em papel não consegue ver, e um inquérito
de 2026 de um fornecedor de segurança relata que aproximadamente um em cada oito incidentes de IA
envolveu sistemas agênticos [2].

## Solução
Execute descoberta contra os ambientes onde a IA aparece (fornecedores de identidade, contas na
nuvem, saída de rede, repositórios de código, integrações SaaS) utilizando ferramentas de descoberta
(ilustrativas) para encontrar modelos e agentes. Reconcilie descobertas contra o registo, abra uma
entrada para cada desconhecido com um proprietário para o reclamar e escale o não reclamado.
Alimente o resultado de volta para a verificação de desvio do Agent Registry.

> **Exemplo (ilustrativo)** Uma varredura de descoberta semanal encontra um agente chamando uma API
> externa de uma conta na nuvem de uma equipa sem entrada de registo; é auto-registado como não
> reclamado, o seu proprietário é notificado e o seu âmbito é congelado até ser reclamado.

## Consequências
O inventário converge na realidade e o ponto cego encolhe. O custo é a integração de descoberta e o
processo para triagem e reclamação do que encontra.

## Padrões relacionados
[Agent Registry](/patterns/agent-registry);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondências:** Regulamento da IA da UE Art. 49/71 · ISO/IEC 42001 · NIST AI RMF (Map) · CSA
AICM · OWASP Agentic ASI10 · Camada 02 Inventory & Transparency.

Os IDs de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [3] e os rótulos de função o
NIST AI RMF [4]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
