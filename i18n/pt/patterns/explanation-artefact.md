---
lang: pt
source: bok/patterns/explanation-artefact.md
sourceHash: "f5f1c480d5aacda263f8733e9b94dcdab9bb143de057b0c0d5c3a12e2c0f0374"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: explanation-artefact
title: Explanation Artefact
layer: 4
secondaryLayer: 5
order: 23
summary: "Um registo de explicação por decisão consequente, com modelo, método e códigos de razão fixados, testados quanto à fidelidade e reutilizados para cada dever de explicação."
---

# Patrón: Explanation Artefact

**Resumo:** Para cada decisão consequente que um sistema toma ou apoia sobre uma pessoa, escreva um
**registo de explicação** estruturado no momento da decisão: a versão do modelo, o método de
explicação com a sua versão e baseline, os códigos de razão extraídos dos fatores que o modelo
realmente pontuou, um contrafactual válido onde ajuda, o modelo de aviso e a rota de contestação.
Teste as explicações quanto à fidelidade no CI, mantenha os registos no armazém de evidência e
responda a cada dever de explicação (um aviso de ação adversa, um pedido de acesso do titular dos
dados, um pedido de explicação do Regulamento da IA, um recurso interno) a partir do mesmo registo.

## Objetivos
Torne cada explicação reproduzível, verificável e reutilizável: reproduzível porque o que a produziu
está fixado, verificável porque as suas razões podem ser recomputadas e comparadas, e reutilizável
porque um registo serve vários deveres legais e internos em vez de cada equipa escrever a sua
própria carta.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de ML, equipas de produto e operações que enviam avisos,
conselheiros de privacidade e direito do consumidor.

## Partes interessadas afetadas
Pessoas sujeitas a decisões e os seus representantes, operadores e revisores que dependem da
explicação, responsáveis pela implantação, auditores, autoridades de proteção de dados e de
fiscalização do mercado.

## Princípios relevantes
Instrumentar a compilação para produzir a sua própria prova; dar dentes a cada controlo; começar a
partir de um modo de falha ou dano nomeado.

## Contexto
Um sistema que recusa, fixa preços, classifica, sinaliza ou pontua pessoas, onde a pessoa, um
operador ou uma autoridade perguntará porquê. Os deveres sobrepõem-se. Sob o Regulamento da IA, uma
pessoa sujeita a uma decisão tomada por um responsável pela implantação com base no resultado de um
sistema de risco elevado do Anexo III (exceto ponto 2), com efeitos adversos legais ou igualmente
significativos, tem o direito de obter "explicações claras e significativas do papel do sistema de
IA no procedimento de tomada de decisão e dos elementos principais da decisão tomada"
(`Art. 86(1)`); os responsáveis pela implantação devem informar as pessoas de que estão sujeitas a
tal sistema (`Art. 26(11)`); e as instruções de utilização devem descrever, quando aplicável, as
capacidades do sistema "para fornecer informações relevantes para explicar o seu resultado"
(`Art. 13(3)(b)(iv)`) [1]. O RGPD dá aos titulares dos dados informações significativas sobre a
lógica envolvida em decisões automatizadas (`Art. 15(1)(h)`, `Art. 22`) [2], que o Tribunal de
Justiça interpretou em C-203/22 como uma explicação do "procedimento e princípios realmente
aplicados" [3]. No crédito dos EUA, o Regulamento B exige as razões principais específicas para ação
adversa, e devem relacionar-se com os fatores realmente considerados ou pontuados [4].

## Problema
As explicações são geradas em tempo real, enviadas e esquecidas.

- **Forças.** Os métodos de atribuição pós-hoc podem divergir do modelo que explicam, e podem ser
  manipulados: um classificador enviesado pode ser envolvido para que LIME e SHAP reportem
  características inócuas [5]. As razões escritas para o cientista de dados não ajudam o
  destinatário. Cada dever tem o seu próprio público e redação. Onde as apostas são altas, um modelo
  interpretável pode ser a sua própria explicação, e Rudin argumenta que deve ser preferido a
  explicar uma caixa negra após o facto [6].
- **Modo de falha.** Ninguém consegue reproduzir a explicação que um cliente recebeu no ano passado,
  porque o modelo, o método ou o baseline mudou. Os códigos de razão nomeiam fatores que o modelo
  não utilizou. Cada pedido de acesso e cada recurso torna-se um projeto forense, e a organização
  não consegue demonstrar que as suas explicações eram precisas.

## Solução
Trate a explicação como um artefato com um esquema, um teste e uma regra de retenção.

1. **Decida a explicação por caso de uso.** Uma política de explicação (camada 01) estabelece, por
   caso de uso, os tipos de explicação necessários (códigos de razão, um contrafactual, citações de
   fonte para respostas baseadas em recuperação, uma descrição do procedimento e princípios
   aplicados), o público e idioma, o método permitido, e se um modelo interpretável é necessário.
2. **Escreva o registo no momento da decisão.** O tempo de execução (camada 04) escreve um registo
   por decisão explicada, indexado ao id do registo e ao id da decisão: versão do modelo; método,
   versão e baseline; se o resultado foi determinativo ou consultivo; códigos de razão de fatores
   pontuados, classificados; um contrafactual que altera apenas características mutáveis, onde útil;
   o modelo de aviso, idioma, canal e hora de entrega; e a rota de contestação. Fixar o método e o
   baseline é o que torna o registo reproduzível.
3. **Teste as explicações.** No CI (camada 03), uma suite de explicação verifica fidelidade (as
   razões predizem o comportamento do modelo), estabilidade (entradas quase idênticas obtêm razões
   quase idênticas), sanidade (o método é sensível ao modelo e aos dados) e consistência de código
   de razão (cada razão amostrada é um fator pontuado). O NIST nomeia "explicação de precisão" como
   um dos quatro princípios da IA explicável [7]. Recompute uma amostra de registos armazenados
   contra o modelo fixado para detetar desvio ou manipulação.
4. **Reutilize o registo.** O mesmo registo renderiza o aviso de ação adversa, responde a um pedido
   de acesso e a um pedido `Art. 86`, e dá a um revisor humano o contexto para um recurso. No Reino
   Unido, as salvaguardas para decisões automatizadas significativas incluem informações sobre a
   decisão, a oportunidade de fazer representações, intervenção humana e uma forma de contestá-la
   [8]; o registo contém o que cada um desses passos necessita.
5. **Retenha e consulte.** Os registos fluem para o armazém de evidência (camada 05) com um período
   de retenção definido pela obrigação mais longa que servem. Os recursos e os seus resultados são
   registados contra o registo e contados por grupo, o que alimenta a monitorização de equidade.

O AI RMF pede que "o modelo de IA seja explicado, validado e documentado" e o seu resultado
"interpretado dentro do seu contexto" (MEASURE 2.9), e que os riscos de transparência e
responsabilidade sejam "examinados e documentados" (MEASURE 2.8) [9].

Registo de explicação ilustrativo para um aumento de limite de crédito recusado:

```json
{
  "record_id": "exp-2026-09-21-118204",
  "decision_id": "cl-2026-09-21-118204",
  "subject": "credit-limit@4.2.1",
  "registry_id": "clm-07",
  "outcome": "limit_increase_declined",
  "decision_role": "determinative",
  "method": { "name": "treeshap", "version": "0.46", "baseline": "bg-sample.v14" },
  "fidelity_suite": { "suite_id": "explain.fidelity.v2", "result": "pass" },
  "reason_codes": [
    { "code": "R07", "text": "Debt-to-income ratio too high", "factor": "dti", "rank": 1 },
    { "code": "R12", "text": "Recent missed payments", "factor": "missed_payments_6m", "rank": 2 }
  ],
  "counterfactual": { "feature": "monthly_debt", "change": "-150", "result": "approve", "mutable_only": true },
  "notice": { "template": "adverse-action.en.v6", "language": "en", "channel": "app+letter",
              "delivered": "2026-09-21T10:04:51Z" },
  "contest_route": "appeal-flow.v3",
  "retention_until": "2031-09-21"
}
```

> **Exemplo (ilustrativo)** A verificação de crédito de um retalhista de telemóveis gerou códigos de
> razão a partir de valores SHAP no momento do pedido. Um teste de consistência de código de razão
> descobriu que, para uma fatia de recusas, o fator principal era uma interação engenheirada que
> nenhum aviso conseguia descrever em palavras simples. A equipa mudou para um scorecard monótono
> dentro de uma pequena margem do modelo complexo, fixou o método no registo, e agora responde "por
> que foi este cliente recusado?" com o registo armazenado e uma recomputação fresca lado a lado.

## Consequências
As explicações tornam-se evidência: reproduzível, testável e reutilizável em deveres, com a sua
precisão verificada em vez de assumida. Os custos: armazenamento e retenção para um registo por
decisão; uma suite de explicação para manter juntamente com o modelo; modelos em linguagem simples
que precisam de testes com destinatários reais; e, para modelos complexos, o risco de que nenhuma
explicação fiel seja simples o suficiente, o que é uma constatação de design, não uma de
documentação.

## Padrões relacionados
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci).

**Correspondências:** Regulamento da IA Art. 86, Art. 26(11), Art. 13(3)(b)(iv) · RGPD Art.
15(1)(h), Art. 22 · Regulamento B (12 CFR 1002.9) · ISO/IEC 42001 A.8.2 · NIST AI RMF (Measure 2.8,
2.9) · Camada 04 Runtime Controls & Observability / Camada 05 Assurance & Continuous Compliance.

Os rótulos de função e subcategoria seguem o NIST AI RMF [9]; os ids do Anexo A da ISO/IEC 42001
seguem um crosswalk publicado, não o texto da norma [10]. Os mapeamentos são ilustrativos, não uma
alegação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 86(1) right to explanation of individual decision-making (Annex III systems except point 2); Art. 26(11) deployers inform natural persons subject to Annex III systems; Art. 13(3)(b)(iv) capabilities to provide information relevant to explain the output (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2016/679 (GDPR), Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[3] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation). JuLIA project case-law database. 2025-02-27. https://www.julia-project.eu/database/case-law/319 (verified: secondary)
[4] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons) and Supplement I, comment 9(b)(2) (reasons must relate to factors actually considered or scored). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[5] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[6] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[7] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[8] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.8 transparency and accountability risks "examined and documented"; MEASURE 2.9 model "explained, validated, and documented" and output "interpreted within its context"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
