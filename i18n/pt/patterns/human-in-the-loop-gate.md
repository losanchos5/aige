---
lang: pt
source: bok/patterns/human-in-the-loop-gate.md
sourceHash: "001841890c7b27ac0f909a695784012afe2cfa21e43a6f8ebf77a3447e788526"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: human-in-the-loop-gate
title: Human-in-the-loop Gate
layer: 4
order: 15
summary: "Um passo de aprovação humana num ponto de decisão definido de elevadas consequências, para que a autonomia de um agente pare exatamente onde as apostas justificam a latência."
---

# Padrão: Human-in-the-loop Gate

**Resumo:** Exija aprovação humana num ponto de decisão definido e de elevadas consequências antes
de uma ação de um agente ter efeito, para que a autonomia seja limitada por uma pessoa exatamente
onde as apostas justificam a latência. A supervisão é um ponto de verificação concebido, não uma
reflexão tardia.

## Objetivos
Insira supervisão humana significativa onde uma ação é irreversível ou de elevado impacto, e registe
a decisão como evidência.

## Utilizadores-alvo
Engenheiro de governação da IA, proprietário do produto, proprietário do risco.

## Partes interessadas afetadas
Pessoas afetadas, utilizadores, proprietários de modelos, reguladores.

## Princípios relevantes
Comece por um modo de falha ou dano nomeado; registe e delimite cada ator antes de agir.

## Contexto
Um agente cujas ações incluem algumas que são irreversíveis ou afetam os direitos das pessoas (um
pagamento, uma negação, uma publicação) juntamente com muitas que são rotineiras.

## Problema
A autonomia total sobre uma ação de elevadas consequências remove a supervisão humana que a lei e o
risco ambos exigem; a revisão manual total sobre cada ação destrói o valor do agente. A supervisão
indiferenciada falha em ambas as direções.

## Solução
Classifique as ações por consequência. Para a classe de elevadas consequências, coloque a ação atrás
de um passo de aprovação humana com contexto suficiente para decidir, e bloqueie a ação até
aprovação. Registe o aprovador, o contexto e a decisão como evidência. Mantenha a classe rotineira
autónoma sob guardrails. Isto realiza o requisito de supervisão humana do Artigo 14 do Regulamento
da IA da UE [1] no ponto de ação.

> **Exemplo (ilustrativo)** Um agente pode rascunhar e colocar em fila reembolsos autonomamente, mas
> qualquer reembolso acima de um limiar é retido para um aprovador humano nomeado, cuja decisão é
> registada contra a transação.

## Consequências
A supervisão aterrissa onde importa sem estrangular o trabalho rotineiro, e a aprovação é auditável.
O custo é conceber a classificação de consequência e a latência que acrescenta às ações controladas.

## Padrões relacionados
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Runtime Guardrail](/patterns/runtime-guardrail); [Policy Card](/patterns/policy-card);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[FRIA-as-Code](/patterns/fria-as-code).

**Correspondências:** Regulamento da IA da UE Artigo 14 · ISO/IEC 42001 · NIST AI RMF (Gerir) ·
OWASP Agentic ASI02 · Camada 04 Controlos de Tempo de Execução e Observabilidade.

Os IDs de ameaça seguem o OWASP Top 10 para Aplicações Agentic 2026 [2] e os rótulos de função o
NIST AI RMF [3]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 14 (human oversight of high-risk AI systems). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
