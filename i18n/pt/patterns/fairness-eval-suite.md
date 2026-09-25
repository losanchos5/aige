---
lang: pt
source: bok/patterns/fairness-eval-suite.md
sourceHash: "90d2e8a073fc15049630c4372ec6456f8367ddee6b1f68b10f8b26916bb97f7f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fairness-eval-suite
title: Fairness Eval Suite
layer: 3
order: 22
summary: "Uma suite de equidade versionada no CI: métricas de grupo e interseccionais com intervalos, uma verificação de proxy e um teste contrafactual, julgados contra uma política fixada primeiro."
---

# Padrão: Fairness Eval Suite

**Resumo:** Versione uma suite de equidade com o modelo e execute-a atrás do eval gate: métricas de
grupo e interseccionais com intervalos de confiança, um resultado "dados insuficientes" para células
pequenas, uma verificação de proxy e um teste de inversão contrafactual, cada um julgado contra uma
política de equidade (métrica, limiar, tamanho mínimo de célula, aprovador) escrita antes da
execução. A suite emite um resultado estruturado por métrica e fatia, falha a compilação quando a
política não é cumprida, e executa novamente em decisões em direto para que um sistema que era justo
no lançamento não possa desviar-se dele sem ser visto.

## Objetivos
Transforme "é justo?" num pequeno conjunto de propriedades escolhidas e testáveis com consequências,
para que um lançamento que trata um grupo pior do que a política permite não seja colocado em
produção, e a evidência mostre qual métrica foi escolhida, porquê e o que mediu.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de ML, cientista de dados, consultor jurídico e de
igualdade.

## Partes interessadas afetadas
Pessoas sujeitas às decisões do sistema, especialmente grupos protegidos e interseccionais,
responsáveis pela implantação, proprietários de modelos, auditores, organismos de igualdade e
reguladores.

## Princípios relevantes
Comece por um modo de falha ou dano nomeado; dê dentes a cada controlo; instrumente a construção
para produzir a sua própria prova.

## Contexto
Um sistema que aloca algo a pessoas (crédito, empregos, habitação, benefícios, preços) ou as serve
com uma qualidade que pode diferir por grupo (reconhecimento, transcrição, respostas num dialeto).
Para sistemas de risco elevado, o Regulamento da IA da UE exige que os dados sejam examinados «tendo
em vista possíveis enviesamentos» e medidas «para detetar, prevenir e mitigar» os mesmos
(`Art. 10(2)(f)` e `(g)`), sistemas que continuam a aprender para resolver «ciclos de
retroalimentação» enviesados (`Art. 15(4)`), e as instruções de utilização devem indicar, quando
apropriado, o desempenho «relativamente a pessoas ou grupos de pessoas específicos»
(`Art. 13(3)(b)(v)`) [1]. O NIST AI RMF pede que a equidade e o enviesamento «sejam avaliados e os
resultados documentados» (MEASURE 2.11) [2].

## Problema
A equidade é medida uma única vez, no agregado, com uma métrica escolhida após ver os resultados.

- **Forças.** Os critérios comuns entram em conflito: quando as taxas base diferem entre grupos, uma
  pontuação não pode ser calibrada e ter taxas de erro iguais entre grupos simultaneamente [3], e as
  três condições de calibração e equilíbrio para ambas as classes não podem manter-se em conjunto
  exceto em casos especiais altamente restritos [4]. Assim, uma métrica deve ser escolhida para o
  caso de uso, e a escolha é uma decisão com um proprietário. Os números agregados ocultam as
  interseções: a auditoria Gender Shades encontrou taxas de erro até 34,7% para mulheres de pele
  mais escura contra um máximo de 0,8% para homens de pele mais clara [5], e um classificador pode
  parecer justo em cada grupo predefinido enquanto falha em subgrupos estruturados [6]. Células
  pequenas tornam as estimativas pontuais ruidosas. O peso legal de limiares familiares muda: a
  regra dos quatro quintos das Diretrizes Uniformes dos EUA é um filtro com ressalvas de
  significância estatística e prática [7], e em junho de 2026 o Departamento de Justiça dos EUA
  anunciou uma opinião concluindo que as diretrizes de impacto desproporcional da EEOC são
  inconstitucionais [8].
- **Modo de falha.** Um painel marca 0,81 verde e 0,79 vermelho sem intervalo e sem amostra mínima;
  a interseção pior servida é média; o lançamento ocorre numa métrica escolhida porque passou; e a
  deriva em produção não é medida porque o teste foi executado apenas no lançamento.

## Solução
Escreva a política primeiro, depois construa a suite que pode falhar contra ela.

1. **Política de equidade como dados.** Por sistema: os atributos protegidos que se aplicam em cada
   jurisdição e de onde vêm os seus valores, a métrica escolhida e a razão (proporção de taxa de
   seleção para alocação, lacunas de taxa de erro para qualidade de serviço), o limiar, o tamanho
   mínimo de célula, a correção de comparação múltipla e o aprovador. Confirme-a antes de ver a
   próxima execução.
2. **Métricas de grupo e interseccionais com intervalos.** Calcule taxas e proporções por grupo e
   por célula interseccional, cada uma com um intervalo de confiança, e julgue o gate no intervalo,
   não no ponto. Células abaixo do mínimo relatam «dados insuficientes» e são listadas, nunca
   contadas como aprovações. Procure também a pior fatia, bem como as listadas.
3. **Análise de proxy.** Treine um modelo para prever o atributo protegido a partir das
   características; um preditor forte sinaliza proxies para justificar ou remover, e o resultado
   entra na ficha de dados.
4. **Teste de inversão contrafactual.** Altere apenas o atributo protegido, ou para um modelo de
   linguagem troque termos de identidade em prompts idênticos, e meça com que frequência o resultado
   ou a qualidade da resposta muda.
5. **Dados de teste legítimos.** Quando dados de categorias especiais são necessários para deteção
   de enviesamento, use-os apenas com base e sob as condições de `Art. 4a`, que o Omnibus Digital
   inseriu no lugar do antigo `Art. 10(5)` [9]; caso contrário, registe como a filiação ao grupo foi
   estimada e o erro que isso acrescenta.
6. **Gate e ficheiro.** Emita um resultado estruturado por métrica e fatia, reutilizando o
   [esquema de resultado de avaliação](/resources/templates#schema-eval-result) publicado
   (`eval-result.v1`), ficheiro-o contra a entrada do registo e alimente os números desagregados na
   ficha de modelo. Uma célula falhada falha a compilação a menos que uma justificação assinada seja
   anexada ao lançamento.
7. **Execute-o em direto.** Calcule as mesmas métricas nas decisões de produção numa janela móvel,
   com os mesmos limiares, para que a deriva levante um alerta antes de uma reclamação. Quando um
   regime exige publicação, como as auditorias de enviesamento independentes da Lei Local 144 de
   Nova Iorque com proporções de impacto entre sexo, raça/etnia e categorias interseccionais [10],
   os resultados da suite são a entrada, não um exercício separado.

NIST SP 1270 é um enquadramento útil para o que a suite não consegue ver: o enviesamento é sistémico
e humano bem como estatístico, e é «não ser possível alcançar risco zero de enviesamento» [11].

Resultado ilustrativo para uma fatia, válido contra `eval-result.v1` (o intervalo e a política
viajam em `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/eval-result.v1.json",
  "suite_id": "fairness.credit-dfc.v3",
  "model_version": "credit-dfc@2026-09-01",
  "score": 0.81,
  "threshold": 0.80,
  "result": "pass",
  "timestamp": "2026-09-18T09:40:12Z",
  "direction": "higher_is_better",
  "metric": "approval adverse-impact ratio, lower 95% bound, age 65+ against age 35-49",
  "failure_mode": "older applicants declined at a disproportionate rate",
  "obligation": "EU AI Act Art. 10(2)(f)-(g)",
  "sample_size": 1840,
  "extensions": {
    "point_estimate": 0.86,
    "ci95": [0.81, 0.91],
    "reference_group": "age_35_49",
    "min_cell": 200,
    "policy": "fairness-policy.credit.v2",
    "insufficient_data_cells": ["age_65_plus x region_islands"]
  }
}
```

> **Exemplo (ilustrativo)** A suite de um credor julgou as taxas de aprovação por faixa etária no
> limite inferior de confiança da proporção de impacto adverso, com uma célula mínima de 200. A
> primeira execução passou cada faixa na estimativa pontual e falhou uma no limite; a segunda, num
> conjunto de teste congelado maior, passou-a. Uma interseção ficou abaixo da célula mínima,
> portanto as notas de lançamento listam-na como «dados insuficientes» e o proprietário dos dados
> carrega uma condição para recolher mais antes do próximo retreino. As mesmas métricas agora
> executam semanalmente em decisões em direto.

## Consequências
As alegações de equidade tornam-se específicas, reproduzíveis e datadas; a escolha da métrica e os
seus compromissos estão registados; e grupos pequenos ou interseccionais são relatados em vez de
serem média. Os custos: o acesso legítimo a atributos protegidos é difícil e às vezes impossível,
portanto as estimativas carregam erro; os intervalos alargam-se com amostras pequenas, portanto as
suites precisam de conjuntos de teste maiores; uma suite aprovada não prova que o sistema é justo
fora do que mediu; e a mitigação que promove pode ser ilegal em algumas configurações, portanto as
correções vão para revisão jurídica com a evidência anexada.

## Padrões relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Explanation Artefact](/patterns/explanation-artefact);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Claims Substantiation Gate](/patterns/claims-substantiation-gate).

**Correspondências:** Regulamento da IA Art. 10(2)(f)–(g), Art. 13(3)(b)(v), Art. 15(4), Art. 4a ·
Lei Local 144 de Nova Iorque · 29 CFR 1607.4(D) · ISO/IEC 42001 A.5.4, A.6.2.4 · ISO/IEC TR 24027 ·
NIST AI RMF (Measure 2.11) · Camada 03 Evals & Red Teaming as Evidence.

Os rótulos de função e subcategoria seguem o NIST AI RMF [2]; os ids do Anexo A da ISO/IEC 42001
seguem um mapa publicado, não o texto da norma [12]; a ISO/IEC TR 24027 é referenciada apenas por
identificador e título [13]. Os mapeamentos são ilustrativos, não uma alegação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(f)-(g) examination for and mitigation of possible biases; Art. 13(3)(b)(v) performance regarding specific persons or groups in the instructions for use; Art. 15(4) feedback loops in systems that continue to learn (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.11 fairness and bias "evaluated and results are documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[4] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[5] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[6] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[7] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[8] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[11] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[12] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.4 assessing AI system impact on individuals and groups, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
[13] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
