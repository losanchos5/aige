---
lang: pt
source: bok/patterns/staged-rollout-rollback-criteria.md
sourceHash: "75d88b1728a25ef59fcd822587bf2668b045c846a1763723ab78f4c5fd3df44e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: staged-rollout-rollback-criteria
title: Staged Rollout with Rollback Criteria
layer: 4
order: 29
summary: "Liberte cada modelo, prompt ou mudança de versão de fornecedor através de fases sombra, piloto e canário cujos critérios de reversão são registados antes de cada fase começar."
---

# Patrón: Staged Rollout with Rollback Criteria

**Resumo:** Leve cada mudança a um sistema de IA implantado (um novo modelo, um retreino, uma
mudança de prompt ou corpus, uma nova versão de modelo de fornecedor) para produção em fases que
limitam a exposição enquanto a evidência se acumula: sombra, piloto, canário, depois disponibilidade
geral. Cada fase tem critérios de reversão escritos no plano de lançamento antes de começar e
avaliados pelo pipeline, as versões são fixadas no registo e o caminho de volta foi testado. Um
critério inventado depois de a métrica se mover é uma negociação, não um controlo.

## Objetivos
Delimite o dano que uma mudança má pode fazer à quota de tráfego ou casos expostos a ela, e torne
"reverter" uma decisão que o pipeline toma num sinal pré-acordado em vez de uma reunião.

## Utilizadores-alvo
Engenheiro de governação da IA, equipa de plataforma ML, SRE, proprietário do sistema.

## Partes interessadas afetadas
Utilizadores e pessoas afetadas do sistema, operadores e revisores, o painel de ativação,
responsáveis pela implantação a jusante de uma mudança de fornecedor.

## Princípios relevantes
Dê a cada controlo força; construa o controlo no ponto mais cedo em que pode bloquear; instrumente a
construção para produzir a sua própria prova.

## Contexto
Os sistemas de IA mudam com mais frequência do que as suas aprovações. Um retreino, uma edição de
prompt, um corpus de recuperação atualizado e uma nova versão de modelo de um prestador podem cada
um alterar a qualidade, a segurança ou a equidade sem que uma linha do código do responsável pela
implantação mude. A engenharia de fiabilidade de sítios já tem a mecânica: o canarying é uma
implantação parcial e limitada no tempo de uma mudança e a sua avaliação [1], a implantação
azul-verde mantém um caminho testado de volta [2], e os comutadores de funcionalidades operacionais
mudam a exposição por coorte sem uma implantação [3]. O Regulamento da IA da UE pede aos
responsáveis pela implantação de sistemas de risco elevado que monitorizem a operação e suspendam a
utilização quando tenham razão para considerar que o sistema apresenta um risco [4], e um prestador
ou potencial prestador que pilota um sistema do Anexo III com utilizadores reais antes de o colocar
no mercado está a fazer testagem em condições reais, que o Artigo 60 governa [4]. O NIST AI RMF
espera uma determinação de se a implantação deve prosseguir e mecanismos para substituir ou
desativar um sistema cujos resultados são inconsistentes com a utilização prevista [5].

## Problema
Sem fases, uma mudança vai do harness de avaliação para todos de uma vez, e a primeira evidência
sobre o comportamento em direto é o próprio dano. Com fases mas sem critérios pré-registados, cada
reversão torna-se um debate sobre se uma métrica movida importa, realizado depois do facto pelas
pessoas que queriam a libertação. Uma atualização de modelo de prestador que ninguém tratou como uma
libertação salta todas as fases.

### Forças
- **Velocidade contra evidência.** Cada fase atrasa o valor; uma fase demasiado curta não prova
  nada.
- **Poder estatístico contra exposição.** Um canário pequeno expõe poucas pessoas mas precisa de
  tempo para detetar uma regressão real, especialmente por grupo.
- **Rótulos tardios.** Os rótulos de resultado chegam frequentemente depois da fase terminar,
  portanto os critérios dependem de proxies: desacordo, substituições, reclamações, fundamentação.
- **Mudanças que não fez.** Uma mudança de versão de prestador chega no seu calendário, não no seu.

## Solução
Escreva o plano de implementação como dados, registe-o antes da primeira fase, e deixe o pipeline
aplicá-lo.

1. **Fases com um propósito.** Shadow (entradas em direto, saídas registadas não utilizadas) prova o
   comportamento no tráfego real; um piloto com utilizadores treinados prova que a supervisão
   funciona; um canário contra um grupo de controlo prova nenhuma regressão à escala; a
   disponibilidade geral mantém os critérios como monitores em direto.
2. **Critérios de reversão pré-registados.** Cada fase lista métrica, comparação, limiar, janela e
   as desagregações de grupo que importam. O plano é comprometido e assinado antes da fase começar;
   uma mudança a um limiar é um diff revisto com um aprovador, nunca uma edição num painel.
3. **Versões fixadas.** O registo fixa versões de modelo, prompt, corpus de recuperação e guardrail
   para a linha de base e o candidato. Uma mudança não fixada detetada em tempo de execução é em si
   um gatilho de reversão.
4. **Um caminho testado de volta.** A comutação azul-verde ou uma bandeira de funcionalidade devolve
   o tráfego à linha de base, e a comutação é exercida na fase shadow, antes de alguém depender
   dela.
5. **Avaliação automática.** Uma tarefa de análise de canário compara candidato e controlo por
   métrica e por grupo e escreve um veredicto de fase (promover, manter, reverter) para o
   armazenamento de garantia. O registo de go/no-go resume a implementação no seu campo `rollout`
   (veja o [esquema de go/no-go](/resources/templates#schema-go-no-go)).
6. **Versões de prestador são libertações.** Uma nova versão de modelo de prestador executa em
   shadow e canário contra a versão fixada antes de levar tráfego.

Plano de implementação ilustrativo, registado antes da fase shadow:

```json
{
  "plan_id": "ro-csa-01-2026-09",
  "subject": "csa-01@2026-09-18",
  "baseline": "csa-01@2026-08-30",
  "registered_at": "2026-09-15T09:00:00Z",
  "pinned": {
    "model": "vendor-model@2026-08-01",
    "prompt": "csa-prompt@41",
    "corpus": "csa-kb@2026-09",
    "guardrails": "gr-csa@12"
  },
  "stages": [
    {
      "stage": "shadow",
      "min_days": 7,
      "rollback_if": [{ "metric": "disagreement_with_baseline", "op": ">", "value": 0.08 }]
    },
    {
      "stage": "pilot",
      "exposure": "40 trained agents",
      "min_days": 14,
      "rollback_if": [
        { "metric": "override_rate", "op": ">", "value": 0.15 },
        { "metric": "complaints_per_1000", "op": ">", "value": 2.0 }
      ]
    },
    {
      "stage": "canary",
      "exposure_percent": 10,
      "control_group": true,
      "min_days": 14,
      "rollback_if": [
        { "metric": "groundedness", "op": "<", "value": 0.92 },
        { "metric": "resolution_rate_ratio_min_by_language", "op": "<", "value": 0.9 },
        { "metric": "severity_1_events", "op": ">", "value": 0 }
      ]
    },
    { "stage": "general_availability", "exposure_percent": 100 }
  ],
  "rollback_path": "blue-green switch to csa-01@2026-08-30; flag csa01.candidate off",
  "go_no_go": "gng-csa-01-2026-09-18"
}
```

> **Exemplo (ilustrativo)** O novo prompt de um assistente de suporte passa o seu eval gate e entra
> em shadow. No canário, a fundamentação mantém-se no geral mas a taxa de resolução para chats em
> português cai abaixo de 90% da taxa em espanhol. O critério pré-registado dispara, a bandeira
> devolve a coorte de canário à linha de base em minutos, e o veredicto de fase e o evento de
> reversão chegam ao armazenamento de garantia antes de alguém ter chamado uma reunião.

## Consequências
As regressões são apanhadas enquanto afetam poucos utilizadores, e cada promoção ou reversão deixa
um registo ligado a critérios definidos antecipadamente. O custo é libertações mais lentas,
infraestrutura de canário, o trabalho estatístico para dimensionar fases e grupos, e a disciplina de
tratar atualizações de prestador e edições de prompt como libertações. Critérios demasiado apertados
produzem fadiga de reversão; reveja-os com os seus proprietários no calendário de manutenção.

## Padrões relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Agent Registry](/patterns/agent-registry);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondências:** Regulamento da IA da UE Art. 26(5), Art. 60 · ISO/IEC 42001 A.6.2.5, A.6.2.6 ·
NIST AI RMF MANAGE 1.1, MEASURE 2.3, MANAGE 2.4 · Camada 04 Runtime Controls & Observability.

Os ids de controlo seguem ISO/IEC 42001 Annex A [6] e os ids de subcategoria o NIST AI RMF [5]. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[2] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[3] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5) monitor, suspend and inform; Art. 60 testing of high-risk AI systems in real-world conditions outside sandboxes). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MANAGE 1.1 determination whether deployment should proceed; MEASURE 2.3 performance demonstrated for conditions similar to deployment; MANAGE 2.4 supersede, disengage or deactivate). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
