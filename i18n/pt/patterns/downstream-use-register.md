---
lang: pt
source: bok/patterns/downstream-use-register.md
sourceHash: "f84d166dd4281cb06775468258a2e6c681be6b23130230ce233dc30679fcb3c7"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: downstream-use-register
title: Downstream Use Register
layer: 2
secondaryLayer: 1
order: 31
summary: "Utilizações pretendidas e proibidas como uma Policy Card, cada consumidor das saídas de um sistema registado contra a sua entrada de registo, e proveniência marcada nas saídas."
---

# Patrón: Downstream Use Register

**Resumo:** Registe, contra cada entrada de registo de um sistema, para que as suas saídas podem e
não podem ser utilizadas e quem realmente as consome: outros sistemas, equipas, parceiros e modelos
treinados nelas. As utilizações pretendidas e proibidas são escritas como uma Policy Card; cada
consumidor é registado com a sua utilização, a sua aprovação e o re-teste que o aprovou; as saídas
carregam proveniência e ressalvas para que um consumidor saiba o que está a utilizar; e a utilização
fora de finalidade é monitorizada em tempo de execução. A utilização secundária, a expansão de
função e o dano a jusante tornam-se visíveis, e uma mudança ou reforma pode chegar a todos os que
afeta.

## Objetivos
Preveja e delimite as utilizações para as quais um sistema não foi aprovado, torne cada consumidor a
jusante das suas saídas conhecido e responsável, e dê aos processos de mudança, incidente e reforma
uma lista de quem informar.

## Utilizadores-alvo
Engenheiro de governação da IA, proprietário do sistema, equipa de plataforma de dados, gestor de
produto.

## Partes interessadas afetadas
Pessoas afetadas por decisões a jusante, equipas e parceiros consumidores, responsáveis pela
implantação de um sistema de um prestador, auditores e autoridades de fiscalização do mercado.

## Princípios relevantes
Registe e delimite cada ator antes de agir; comece a partir de um modo de falha ou dano nomeado;
torne o caminho governado o caminho mais fácil.

## Contexto
Os sistemas são utilizados para mais do que foram aprovados. O Regulamento da IA da UE nomeia o
conceito: utilização indevida razoavelmente previsível é utilização não de acordo com a finalidade
prevista que pode resultar de comportamento humano razoavelmente previsível ou interação com outros
sistemas (`Art. 3(13)`), os prestadores devem avaliar riscos sob ela (`Art. 9(2)(b)`), e um
responsável pela implantação que mude a finalidade prevista de um sistema para que se torne de alto
risco assume os deveres do prestador (`Art. 25(1)(c)`) [1]. Os prestadores de sistemas generativos
devem marcar saídas sintéticas de forma legível por máquina (`Art. 50(2)`) [1], que é proveniência
que um consumidor pode ler. As saídas que alimentam outros componentes são também uma superfície de
ataque: o tratamento impróprio de saída, onde as saídas do modelo passam a jusante sem validação, é
uma classe de risco nomeada [2], e em sistemas agentes o erro de um agente pode cascata através de
outros [3]. A governação da implantação e utilização agora inclui previsão e redução de danos
secundários e a jusante; o Body of Knowledge AIGP da IAPP lista-o sob competência IV.C [4].

## Problema
Um registo documenta sistemas, não aquilo em que os seus resultados se transformam. Uma pontuação de
risco aprovada para priorizar revisão manual torna-se, um ano depois, uma recusa automática no
pipeline de outra equipa; os resultados de um modelo de resumo são colhidos como dados de treino; um
parceiro recebe resultados sob um contrato que ninguém ligado ao registo conhece. Nenhum destes
consumidores foi avaliado, nenhum é informado quando o modelo muda, e o runbook de desativação não
consegue encontrá-los. Quando os resultados moldam os dados que a próxima versão aprende, o ciclo de
retroalimentação é também invisível.

### Forças
- **Reutilização contra finalidade.** Reutilizar um bom modelo é barato e útil; cada reutilização
  pode também ser uma nova finalidade não avaliada.
- **Abertura contra controlo.** Os resultados publicados através de uma API ou plataforma de dados
  são fáceis de consumir e difíceis de rastrear.
- **Ressalvas contra usabilidade.** Marcar proveniência e limites em cada resultado adiciona peso
  que os consumidores podem remover.
- **Previsão contra certeza.** O uso indevido tem de ser imaginado antes de acontecer, sem dados
  para provar a previsão.

## Solução
Dê ao uso a jusante um registo, e faça do registo a única forma de obter os resultados.

1. **Usos como uma [Policy Card](/patterns/policy-card).** As finalidades previstas do sistema e o
   seu espaço negativo (usos proibidos, populações e contextos para os quais não foi validado) são
   regras num cartão armazenado com a entrada do registo do
   [Agent Registry](/patterns/agent-registry), não um parágrafo numa ficha de modelo.
2. **Previsão antes de colocar em produção.** Execute uma premortem ("daqui a um ano isto causou
   dano: como?"), casos de abuso escritos junto às histórias de utilizador, e um mapa de impacto das
   partes interessadas que inclua pessoas que nunca tocam na interface. Cada uso indevido plausível
   torna-se uma regra de uso proibido ou um monitor.
3. **Consumidores como entradas.** Cada consumidor (um sistema, uma equipa, um parceiro, um pipeline
   de treino) é registado contra o sistema produtor com a sua finalidade, a sua aprovação, o
   re-teste que autorizou os resultados para esse novo contexto e o contrato que vincula uma parte
   externa. O acesso à API de resultados ou tabela é concedido por consumidor registado, portanto um
   consumidor não registado não tem credencial.
4. **Proveniência nos resultados.** Os resultados transportam o sistema produtor e versão, a
   finalidade prevista e um ressalva, como metadados que um consumidor pode ler (para conteúdo
   generativo, a marcação que o Regulamento da IA exige aos prestadores).
5. **Uso fora de finalidade como sinal.** Classifique o tráfego e pedidos de consumidor contra o
   espaço negativo e alerte sobre o que cai fora dele; observe os resultados que regressam como
   dados de treino (ciclos de retroalimentação).
6. **Propagação na mudança.** Uma mudança de modelo, um incidente ou uma desativação lê o registo e
   notifica cada consumidor através do
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline).

Entrada ilustrativa do registo de uso a jusante:

```json
{
  "subject": "risk-score-02@4.1",
  "policy_card": "uses.risk-score-02.v3",
  "intended_uses": ["prioritise claims for manual review"],
  "prohibited_uses": ["automatic decline of a claim", "pricing", "use on commercial policies"],
  "consumers": [
    {
      "consumer": "claims-triage-service",
      "type": "system",
      "use": "queue ordering for human review",
      "approved_at": "2026-03-02",
      "retest": "eval:rs2-claims-triage-v3",
      "credential": "svc-claims-triage"
    },
    {
      "consumer": "reinsurance-partner-a",
      "type": "partner",
      "use": "aggregate statistics only, no row-level scores",
      "approved_at": "2026-05-11",
      "contract": "dpa-2026-017 schedule 3"
    }
  ],
  "output_stamp": ["producer", "version", "intended_use", "caveat"],
  "feedback_loop_check": "scores excluded from the training labels of risk-score-03",
  "reviewed_at": "2026-09-10"
}
```

> **Exemplo (ilustrativo)** Uma equipa de fraude pede pontuações de risco ao nível da linha para
> recusar sinistros automaticamente. O pedido chega como um registo de consumidor, encontra uma
> regra de uso proibido no cartão e vai ao comité como uma nova finalidade, onde é recusado; a
> equipa recebe um feed de prioridade de revisão em vez disso. Quando o modelo é retreinado, ambos
> os consumidores registados recebem o aviso de mudança e re-executam os seus testes de aceitação.

## Consequências
O uso secundário é decidido em vez de descoberto, os consumidores são conhecidos quando o modelo
muda ou é desativado, e os ciclos de retroalimentação são verificados propositadamente. O custo é o
próprio registo, controlo de acesso por consumidor nos resultados, re-testes para novos contextos e
o atrito de dizer não a reutilização útil. O registo vincula bem os consumidores internos; os
externos dependem dos termos do contrato e direitos de auditoria.

## Padrões relacionados
[Policy Card](/patterns/policy-card);
[Agent Registry](/patterns/agent-registry);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondências:** Regulamento da IA Art. 3(13), Art. 9(2)(b), Art. 25(1)(c), Art. 50(2) ·
ISO/IEC 42001 A.8.2, A.9.4, A.10.4 · NIST AI RMF MAP 1.1, MAP 3.3, MANAGE 1.4 · OWASP LLM10:2026,
OWASP Agentic ASI08 · Layer 02 Inventory & Transparency / Layer 01 Govern-as-Code.

Os ids de ameaça seguem o OWASP Top 10 for LLM Applications 2026 [2] e o OWASP Top 10 for Agentic
Applications 2026 [3], os ids de controlo ISO/IEC 42001 Annex A [5] e os ids de subcategoria o NIST
AI RMF [6]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 3(13) reasonably foreseeable misuse; Art. 9(2)(b) risks under reasonably foreseeable misuse; Art. 25(1)(c) changed intended purpose; Art. 50(2) machine-readable marking of synthetic outputs). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] OWASP Top 10 for LLM Applications 2026 (LLM10 Improper Output Handling). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[3] Top 10 for Agentic Applications 2026 (ASI08 Cascading Failures). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[4] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: forecast and reduce risks of secondary or unintended uses and downstream harms; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.4 intended use of the AI system; A.10.4 customers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 1.1 intended purposes and prospective settings documented; MAP 3.3 targeted application scope specified; MANAGE 1.4 negative residual risks to downstream acquirers and end users documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
