---
lang: pt
source: bok/patterns/continuous-assurance-telemetry.md
sourceHash: "289ffc6b24e3f832cc89b6f955693212f1589d484bb837315d06e2b3b4328273"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: continuous-assurance-telemetry
title: Continuous Assurance Telemetry
layer: 5
order: 7
summary: "Decisões de controlo transmitidas para um armazém de garantia conforme acontecem, para que se um controlo funciona seja uma consulta ativa, não uma atestação pontual."
---

# Padrão: Continuous Assurance Telemetry

**Resumo:** Transmita decisões de controlo (vereditos de política, resultados de avaliação, ações de
guardrail, eventos de identidade) para um armazém de garantia conforme acontecem, para que o estado
de um controlo seja uma consulta ativa em vez de uma atestação pontual. A confiabilidade torna-se um
sinal continuamente gerado, não um certificado estático [1].

## Objetivos
Substitua a atestação periódica por evidência emitida conforme o sistema funciona, para que "o
controlo está a funcionar?" seja respondido pela telemetria.

## Utilizadores-alvo
Engenheiro de governação da IA, equipa de SRE/plataforma, auditor.

## Partes interessadas afetadas
Proprietários de modelos, auditores, reguladores, responsáveis pela resposta a incidentes.

## Princípios relevantes
Instrumente a construção para produzir a sua própria evidência; dê força a cada controlo.

## Contexto
Uma stack cujas camadas inferiores já emitem registos estruturados, e uma função de garantia cansada
de montar pastas antes de cada auditoria.

## Problema
Uma atestação diz que um controlo existia quando alguém olhou; não diz nada sobre as semanas no
meio, durante as quais o modelo foi retreinado e um agente ganhou uma ferramenta. A evidência
pontual decai imediatamente.

## Solução
Tenha cada controlo escrever um registo estruturado com carimbo de tempo para um armazém de garantia
comum, num esquema. Corrija o esquema primeiro: um registo de evidência mínimo útil é
`{control_id, subject (model/agent/system id + version from the registry), decision (pass/fail/allow/deny/alert), metric + value + threshold, failure_mode/obligation ref, input_hash, actor, timestamp, signature}`.
Normalize a saída de cada ferramenta nessa forma na ingestão, para que fontes heterogéneas se
componham num armazém consultável único com chave no id do registo.

Esquema ilustrativo para o registo de evidência:

```json
{
  "control_id": "guardrail.output.pii.v2",
  "subject": "csa-01@2026-09-18",
  "decision": "alert",
  "metric": "pii_leak_rate", "value": 0.004, "threshold": 0.0,
  "obligation": "EU AI Act Art. 15",
  "input_hash": "sha256:1c7d…",
  "actor": "csa-01",
  "timestamp": "2026-09-18T14:31:52Z",
  "signature": "ed25519:5a…"
}
```

Duas propostas de investigação apontam para a mesma ideia e valem a pena observar, não adotar
integralmente: TAIP trata as saídas NIST TEVV como Objetos de Garantia de IA reutilizáveis que se
compõem entre sistemas [1], e AAGATE operacionaliza um plano de controlo alinhando as funções NIST
AI RMF para agentes em produção [2]; ambas são pré-impressões únicas. Exponha o estado atual de cada
controlo como uma consulta sobre o armazém.

> **Exemplo (ilustrativo)** Um mosaico do painel para o controlo de residência de dados é apoiado
> por uma consulta ativa sobre decisões de guardrail emitidas; se o controlo parar de disparar, o
> mosaico fica vermelho em minutos, não na próxima auditoria.

## Consequências
A auditoria torna-se uma consulta e a deriva é visível em tempo quase real. O custo é construir o
pipeline e armazenamento, e definir um esquema de evidência comum entre ferramentas.

## Padrões relacionados
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondências:** Regulamento da IA da UE Art. 72 · ISO/IEC 42001 · NIST AI RMF (Manage, Govern)
· CSA AICM · Layer 05 Assurance & Continuous Compliance.

Os rótulos de função seguem o NIST AI RMF [3]. Os mapeamentos são ilustrativos, não uma alegação de
conformidade.

## Sources

[1] TAIP: NIST TEVV outputs as reusable AI Assurance Objects; trustworthiness as a continuously generated signal (arXiv 2603.03340; submitted 15 Feb 2026). 2026-02. https://arxiv.org/abs/2603.03340 (verified: primary)
[2] AAGATE: NIST AI RMF-aligned, Kubernetes-native governance control plane for agentic AI (arXiv 2510.25863). 2025-10. https://arxiv.org/abs/2510.25863 (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
