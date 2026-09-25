---
lang: pt
source: bok/patterns/eval-gate-in-ci.md
sourceHash: "db2745d7602943a223d8898cfaeead6d0e348fe954232d642e744aefe3792ff8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: eval-gate-in-ci
title: Eval Gate in CI
layer: 3
order: 2
summary: "Uma suite de avaliação integrada no CI para que um modelo ou agente seja colocado em produção apenas acima de um limiar documentado: a execução da avaliação é o controlo, o seu resultado é a evidência."
---

# Padrão: Eval Gate in CI

**Resumo:** Integre uma suite de avaliação no pipeline CI/CD para que um modelo ou agente tenha de
passar num teste definido, acima de um limiar documentado, antes de ser colocado em produção. A
execução da avaliação é o controlo e o seu resultado é a evidência; uma avaliação falhada bloqueia a
compilação.

## Objetivos
Torne concreto "dar dentes a cada controlo": atribua uma consequência a uma propriedade testável,
para que a falha interrompa um lançamento em vez de registar uma constatação.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de ML, equipa de plataforma.

## Partes interessadas afetadas
Proprietários de modelos, utilizadores expostos ao sistema, auditores.

## Princípios relevantes
Dar dentes a cada controlo; construir o controlo no ponto mais precoce em que possa bloquear.

## Contexto
Um modelo ou agente que muda (retreinado, re-solicitado, com uma nova ferramenta) e um pipeline que
já executa testes de correção funcional.

## Problema
Avaliações executadas uma única vez antes do lançamento e coladas numa apresentação não provam nada
após a próxima alteração. Uma comissão de revisão que apenas pode classificar constatações não pode
impedir um lançamento agendado. Sem um gate, a avaliação é investigação, não controlo.

## Solução
Versione uma suite de avaliação juntamente com o modelo. Execute pelo menos uma avaliação de
capacidade e uma avaliação adversarial no CI (por exemplo com Inspect, promptfoo, Garak ou Giskard;
ilustrativo). Defina um limiar que rastreie um modo de falha nomeado ou uma obrigação. Falhe o
pipeline abaixo do limiar. Emita um resultado estruturado (id da suite, versão do modelo, pontuação,
limiar, aprovado/reprovado, timestamp) registado contra a entrada do registo.

Esquema ilustrativo para o resultado:

```json
{
  "suite_id": "injection-resistance.v4",
  "model_version": "csa-01@2026-09-18",
  "score": 0.982,
  "threshold": 0.95,
  "result": "pass",
  "timestamp": "2026-09-18T14:22:03Z"
}
```

> **Exemplo (ilustrativo)** Um agente de codificação interno tem de passar um piso de resistência a
> injeção e uma suite de regressão antes da implantação; um lançamento que reduz a resistência
> abaixo do piso falha o pipeline e não é colocado em produção até ser corrigido.

## Consequências
As regressões são detetadas antes da produção e a evidência acumula-se automaticamente. A
compensação é a manutenção da avaliação, o custo de tempo de execução no CI e a necessidade de
ajustar limiares para evitar gates instáveis.

## Padrões relacionados
[Policy Card](/patterns/policy-card);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence).

**Correspondências:** Regulamento da IA Art. 15, Art. 55 · ISO/IEC 42001 · NIST AI RMF (Measure) ·
OWASP Agentic ASI01/ASI02 · Camada 03 Evals & Red Teaming as Evidence.

Os IDs de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [1] e os rótulos de função o
NIST AI RMF [2]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
