---
lang: pt
source: bok/patterns/runtime-guardrail.md
sourceHash: "6bebe5fd743c4435cfd24ed335b0c118e62d19e6f1794335bb1d4e37879939b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: runtime-guardrail
title: Runtime Guardrail
layer: 4
order: 8
summary: "Guardrails de entrada e saída no caminho de pedido em tempo de execução que executam a Policy Card do sistema em cada chamada e emitem um evento de decisão para cada uma."
---

# Padrão: Runtime Guardrail

**Resumo:** Coloque guardrails de entrada e saída no caminho de tempo de execução do modelo ou
agente que executem a sua Policy Card em cada pedido em tempo de execução e emitam uma decisão para
telemetria e para o disjuntor. O guardrail é onde uma política escrita na camada 01 e um limiar
testado na camada 03 se tornam uma ação tomada numa chamada real, não uma alegação sobre uma.

## Objetivos
Execute a política no ponto de ação, em inputs e outputs que nenhuma avaliação antecipou, e faça de
cada execução um evento estruturado que as camadas de garantia e incidente possam consumir.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de ML, engenheiro de segurança, equipa de plataforma.

## Partes interessadas afetadas
Utilizadores, proprietários de modelos, pessoas afetadas, respondentes a incidentes, auditores.

## Princípios relevantes
Dê a cada controlo dentes; instrumente a construção para produzir a sua própria prova.

## Contexto
Um agente ou modelo em produção, agindo em inputs em tempo de execução, cuja Policy Card e limiares
de avaliação existem mas não têm ponto de execução em tempo de execução, portanto uma regra provada
em CI é desprotegida no momento em que o sistema encontra um input que nenhum teste cobriu.

## Problema
As políticas e avaliações são ponto-no-tempo; o sistema depois encontra injeção de prompt, saídas
inseguras e chamadas de ferramenta que ninguém reviu. Um guardrail que apenas regista é
observabilidade confundida com controlo: o sistema observa-se a si próprio falhar em alta resolução.
Sem um ponto de execução que possa bloquear e emitir, o tempo de execução é a lacuna entre um
controlo testado e uma ação descontrolada.

## Solução
Coloque um guardrail em ambos os lados do caminho modelo/agente. O guardrail de entrada filtra
prompts e contexto recuperado para injeção e pedidos que violam a política antes de chegarem ao
modelo; o guardrail de saída filtra gerações e chamadas de ferramenta para conteúdo inseguro,
vazamento de dados e ações fora do escopo antes de terem efeito. Execute a mesma Policy Card
avaliada em CI [1], para que a decisão em tempo de execução e a decisão do pipeline partilhem uma
regra. Em cada chamada emita um evento estruturado,
`{agent, direction (input/output), rule_id, decision (allow/block/redact), timestamp}`, para a loja
de garantia ([Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)) e, numa
violação definida, sinalize o disjuntor
([Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)). Os frameworks de guardrail
realizam isto como uma categoria; o OWASP Agent Control Standard nomeia a superfície de controlo em
tempo de execução [2]. Isto é distinto do disjuntor: o guardrail decide uma chamada de cada vez e
permanece no caminho de pedido; o disjuntor retira a autonomia do agente no atacado quando os sinais
do guardrail cruzam um limiar.

> **Exemplo (ilustrativo)** Um guardrail de entrada de um assistente de atendimento ao cliente
> bloqueia uma tentativa de injeção de prompt e o seu guardrail de saída redige um número de conta
> que o modelo estava prestes a devolver; ambas as decisões são emitidas para a loja de garantia, e
> uma explosão de bloqueios dispara o disjuntor.

## Consequências
O controlo testado mantém-se no tráfego em direto e cada aplicação deixa evidência; o guardrail é
também o sensor que o disjuntor e o pipeline de incidentes leem. O custo é a latência por chamada,
os falsos positivos a ajustar e manter a regra de runtime sincronizada com a Policy Card e os
limiares de avaliação.

## Padrões relacionados
[Policy Card](/patterns/policy-card);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Correspondências:** Regulamento da IA da UE Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF
(Manage) · OWASP Agentic ASI02/ASI03 · Camada 04 Runtime Controls & Observability.

Os IDs de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [3] e os rótulos de função o
NIST AI RMF [4]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
