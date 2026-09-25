---
lang: pt
source: bok/patterns/kill-switch-circuit-breaker.md
sourceHash: "4085d3a3066ab6f5a2bcc5c008d937c4de6c9c26c7df7f845dc56669c3cab6bc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: kill-switch-circuit-breaker
title: "Kill Switch / Circuit Breaker"
layer: 4
order: 9
summary: "Um mecanismo testado que para um agente ou classe de agentes no ponto de ação, revogando o seu acesso sem quebrar o resto da frota."
---

# Padrão: Kill Switch / Circuit Breaker

**Resumo:** Forneça um mecanismo testado para parar um agente ou classe de agentes no ponto de ação,
revogando acesso e interrompendo chamadas de ferramentas, sem quebrar o resto da frota. A autonomia
é concedida apenas quando pode ser retirada.

## Objetivos
Limite o raio de explosão de um agente mal comportado ou comprometido, e faça de "pare-o" um
controlo que foi exercido, não uma afirmação.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de segurança, SRE.

## Partes interessadas afetadas
Proprietários de modelos, utilizadores, respondentes a incidentes, terceiros afetados.

## Princípios relevantes
Regista e limita cada ator antes de agir; começa por um modo de falha ou dano nomeado.

## Contexto
Agentes que atuam autonomamente (chamando ferramentas, movendo dados ou dinheiro), onde uma única
falha pode cascata. A Gartner espera que até 2029 mais de metade dos ataques bem-sucedidos em
agentes de IA explorarão fraquezas de controlo de acesso e injeção de prompts [1].

## Problema
Um agente que não pode ser parado com precisão só pode ser parado quebrando tudo. Uma frota em
credenciais partilhadas significa que um incidente força uma escolha entre deixar o agente em
execução e rodar um segredo que para toda a frota.

## Solução
Vincule cada agente à sua própria identidade (ver
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)) para que o
acesso possa ser revogado por agente. Implemente um circuit breaker no limite de chamada de
ferramenta que dispara num sinal definido: uma violação de limiar, uma anomalia, um puxão manual.
Teste o kill switch num calendário; um kill switch não testado não é um controlo.

> **Exemplo (ilustrativo)** O circuit breaker de um agente de pagamentos dispara automaticamente
> quando a sua taxa de chamada de ferramenta não autorizada cruza um limiar, revogando apenas o
> escopo desse agente enquanto o resto da frota continua em execução; o puxão é ensaiado
> mensalmente.

## Consequências
Os incidentes estão contidos a um agente e a recuperação é rápida. O custo é a encanação de
identidade por agente e a engenharia para tornar a revogação instantânea e segura.

## Padrões relacionados
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Agent Registry](/patterns/agent-registry);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondências:** Regulamento da IA Art. 14, Art. 15 · ISO/IEC 42001 · NIST AI RMF (Manage) ·
CSA AICM · OWASP Agentic ASI02/ASI10 · Camada 04 Runtime Controls & Observability.

Os IDs de ameaça seguem o OWASP Top 10 para Aplicações Agentic 2026 [2] e os rótulos de função o
NIST AI RMF [3]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
