---
lang: pt
source: bok/patterns/agent-registry.md
sourceHash: "08b0ddb94f34e908f4aa421264e1a2ef924b51c137046a23490c6e2a919d420a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: agent-registry
title: Agent Registry
layer: 2
order: 4
summary: "Um inventário consciente do tempo de execução de cada modelo, serviço e agente, cada um com um proprietário, um âmbito e uma expiração, escrito pelo pipeline de implantação, não manualmente."
---

# Padrão: Agent Registry

**Resumo:** Mantenha um registo de tempo de execução de cada modelo, serviço e agente, com cada
entrada contendo um proprietário, um âmbito e uma data de expiração, alimentado pelo pipeline de
implantação em vez de ser preenchido manualmente. O registo é o objeto que as políticas avaliam e
aos quais os controlos de tempo de execução se ligam.

## Objetivos
Responda "que IA está em execução e o que lhe é permitido fazer?" a partir de uma fonte em direto, e
torne o registo uma precondição para chegar à produção.

## Utilizadores-alvo
Engenheiro de governação da IA, equipa de plataforma, engenheiro de segurança.

## Partes interessadas afetadas
Proprietários de modelos, responsáveis pela implantação, auditores, responsáveis pela resposta a
incidentes.

## Princípios relevantes
Registe e delimite cada ator antes de agir; torne o caminho governado o caminho mais fácil.

## Contexto
Uma organização que implanta modelos e agentes em várias equipas, onde nenhuma fonte única sabe o
que está em direto.

## Problema
Um registo mantido manualmente está correto no dia em que é editado e incorreto uma semana depois.
Sem proprietário, âmbito e data de expiração, uma ação não pode ser atribuída, um âmbito não pode
ser aplicado, e um agente obsoleto permanece com acesso ativo que ninguém revê.

## Solução
Torne o registo uma API a que o pipeline de implantação escreve: um novo modelo ou agente regista-se
na implantação com um proprietário, um âmbito declarado e uma data de expiração após a qual a
entrada deve ser renovada ou é desativada. Negue o acesso à produção a artefatos não registados.
Reconcilie periodicamente com o que está realmente em execução (ver
[Shadow-AI Discovery](/patterns/shadow-ai-discovery)) e sinalize desvios.

Esquema ilustrativo para uma entrada de registo:

```json
{
  "id": "csa-01",
  "version": "2026-09-18",
  "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"],
  "expiry": "2026-12-17"
}
```

> **Exemplo (ilustrativo)** Cada entrada de registo de agente expira após 90 dias; um proprietário
> que não renova perde a identidade de carga de trabalho do agente, portanto agentes abandonados
> saem automaticamente da produção.

## Consequências
A atribuição, aplicação de âmbito e controlo de ciclo de vida tornam-se possíveis, e cada outra
camada obtém um objeto a que se ancorar. O custo é a integração do pipeline e a governação para
aplicar a expiração.

## Padrões relacionados
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[AIBOM](/patterns/aibom); [Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondências:** Regulamento da IA Art. 49/71, Art. 11 · ISO/IEC 42001 · NIST AI RMF (Map) ·
CSA AICM · OWASP Agentic ASI10 · Camada 02 Inventory & Transparency.

Os IDs de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [1] e os rótulos de função o
NIST AI RMF [2]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
