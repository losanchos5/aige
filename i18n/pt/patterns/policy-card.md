---
lang: pt
source: bok/patterns/policy-card.md
sourceHash: "95594508eddf7681f1fbddc9909215a928bd9b78c9f9df12c2ab751cfa63a6f8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: policy-card
title: Policy Card
layer: 1
order: 1
summary: "Uma regra de governação escrita como um cartão legível por máquina que o pipeline e o runtime ambos avaliam, deixando um veredicto em cada verificação."
---

# Padrão: Policy Card

**Resumo:** Expresse uma regra de governação como um artefato legível por máquina que viaja com o
modelo ou agente e é avaliado no pipeline e em runtime, em vez de como prosa que um humano deve
aplicar. O Policy Card codifica ações permitidas e proibidas, obrigações e requisitos de evidência
para um sistema de IA, e liga aos pipelines de execução e auditoria que atuam sobre ele [1].

## Objetivos
Transforme uma política de uma declaração de intenção em um controlo executável, versionado e
testável, para que uma mudança de regra seja um diff revisável e cada avaliação deixe um veredicto.

## Utilizadores-alvo
Engenheiro de governação da IA, equipa de plataforma, proprietário de política.

## Partes interessadas afetadas
Proprietários de modelos, responsáveis pela implantação, auditores, reguladores.

## Princípios relevantes
Construa o controlo no ponto mais inicial em que consegue bloquear; torne o caminho governado o
caminho mais fácil.

## Contexto
Uma organização com mais do que um punhado de sistemas de IA e uma função de governação que não
consegue rever cada mudança manualmente. As regras existem mas vivem em documentos que nenhum
pipeline consegue ler.

## Problema
A política em prosa não pode ser executada automaticamente, diverge dos sistemas que governa e não
deixa evidência de que foi aplicada. Uma regra que só pode ser memorizada é violada no momento em
que alguém a esquece.

## Solução
Escreva cada regra como uma Policy Card: um artefato estruturado, legível por máquina (por exemplo
expresso para um motor `OPA/Rego` ou `Cedar`, ou como um documento Policy Cards) que declara a
lógica de permissão/negação, o modo de falha que aborda e as cláusulas do framework a que se mapeia.
Armazene-a com o sistema que governa. Avalie-a pré-merge, na implantação e (quando a regra é uma
restrição em tempo de execução) no ponto de ação. Emita um veredicto (id da regra, hash de entrada,
decisão, timestamp) em cada avaliação.

Esquema ilustrativo para o veredicto:

```json
{
  "rule_id": "residency.eu-only.v3",
  "decision": "deny",
  "input_hash": "sha256:9f2b…",
  "timestamp": "2026-09-18T14:07:11Z"
}
```

> **Exemplo (ilustrativo)** Uma Policy Card para um agente de atendimento ao cliente declara que
> pode chamar a ferramenta de reembolsos apenas até um montante limitado e nunca fora do horário
> comercial; a mesma ficha é avaliada em CI contra o escopo declarado do agente e em tempo de
> execução pelo guardrail de chamada de ferramenta.

## Consequências
As regras tornam-se executáveis e auditáveis, e o crosswalk gera-se a si próprio. O custo é a
autoria e manutenção de fichas, e a disciplina de manter a versão executável como autoritária sobre
a prosa.

## Padrões relacionados
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials).

**Correspondências:** Regulamento da IA Art. 9 · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA AICM ·
OWASP Agentic ASI02/ASI03 · Layer 01 Governance-as-Code.

Os IDs de ameaça seguem o OWASP Top 10 para Aplicações Agentic 2026 [2] e os rótulos de função o
NIST AI RMF [3]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Policy Cards: machine-readable, deployment-layer governance artefacts for AI agents, linked to enforcement and audit pipelines (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
