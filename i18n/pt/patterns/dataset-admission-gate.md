---
lang: pt
source: bok/patterns/dataset-admission-gate.md
sourceHash: "2e990980e7b5e71079ebe1f603a788526c6583e366dfbe7ac2ee5cf6fc972584"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: dataset-admission-gate
title: Dataset Admission Gate
layer: 1
secondaryLayer: 2
order: 21
summary: "Uma porta de política como código que permite que uma tarefa de treino, avaliação ou recuperação leia apenas conjuntos de dados com um registo de admissão completo e assinado para esse uso."
---

# Padrão: Dataset Admission Gate

**Resumo:** Coloque uma porta diante de cada tarefa que lê dados para treinar, ajustar, validar,
testar, avaliar ou construir um índice de recuperação: a tarefa pode ler uma versão de conjunto de
dados apenas se existir um registo de admissão para ela, que nomeie o caso de uso da tarefa entre os
seus usos permitidos, e que mostre que os testes de direitos, qualidade, representatividade,
enviesamento e integridade foram aprovados ou foram dispensados por alguém autorizado a
dispensá-los. A verificação é política como código no pipeline, portanto um campo em falta falha a
execução em vez de um lembrete numa wiki.

## Objetivos
Decida se os dados podem ser utilizados e se são adequados para o fim antes de um modelo aprender
com eles, porque um problema de qualidade pode ser corrigido mais tarde e um problema de direitos ou
envenenamento muitas vezes não pode.

## Utilizadores-alvo
Engenheiro de governação da IA, proprietários de dados e curadores, equipa de plataforma ML,
conselheiro de privacidade, engenheiro de segurança.

## Partes interessadas afetadas
Titulares de dados e detentores de direitos, pessoas afetadas pelos resultados do modelo
(especialmente grupos que os dados sub-representam), proprietários de modelos, auditores e
organismos notificados.

## Princípios relevantes
Construa o controlo no ponto mais antigo em que pode bloquear; dê a cada controlo poder de execução;
instrumente a construção para produzir a sua própria prova.

## Contexto
Plataformas de dados que permitem que qualquer equipa leia qualquer tabela que possa alcançar, lojas
de características partilhadas entre modelos e tarefas de treino lançadas a partir de cadernos. Para
sistemas de risco elevado, o Regulamento da IA da UE transforma a governação de dados em requisitos:
os conjuntos de treino, validação e teste devem estar sujeitos a práticas que cubram, entre outras,
a sua origem, preparação, o «exame tendo em vista possíveis enviesamentos» e «medidas apropriadas
para detetar, prevenir e mitigar possíveis enviesamentos» (`Art. 10(2)(f)` e `(g)`), e devem ser
«relevantes, suficientemente representativos e, na maior medida possível, isentos de erros e
completos tendo em vista a finalidade prevista» (`Art. 10(3)`) [1]. Após o Omnibus Digital, a base
estreita para o tratamento de categorias especiais de dados pessoais para detetar e corrigir
enviesamentos situa-se num novo `Art. 4a` [2].

## Problema
Os dados entram nos modelos pelo caminho de menor resistência, e as razões pelas quais não deveriam
ter entrado são descobertas após o treino.

- **Forças.** Os cientistas de dados precisam de dados rapidamente e iteram frequentemente. A pessoa
  que quer que um conjunto de dados seja utilizado não deve ser a única pessoa que decide que pode
  ser. Os testes de direitos, qualidade e enviesamento situam-se com proprietários diferentes. O
  tratamento ilícito na fase de desenvolvimento pode afetar a legalidade do uso posterior do modelo:
  o EDPB disse isso na sua Opinião 28/2024 [3]. Os dados de treino são também uma superfície de
  ataque: ATLAS cataloga envenenamento de dados de treino (`AML.T0020`) [4] e OWASP lista
  envenenamento de dados e modelos como `LLM05:2026` [5].
- **Modo de falha.** Um modelo treina em dados fora do seu âmbito de consentimento, numa amostra que
  não abrange a população que servirá, em rótulos que ninguém auditou ou numa fotografia que alguém
  alterou. O problema surge em produção ou numa auditoria, e a correção é um retreino em dados que
  deveriam ter sido recusados em primeiro lugar.

## Solução
Dê a cada versão de conjunto de dados um registo de admissão, e faça com que cada tarefa de leitura
de dados apresente um.

1. **Escreva o registo de admissão.** Por versão de conjunto de dados e por pipeline permitido,
   reutilize o esquema de registo de admissão de conjunto de dados publicado
   [dataset admission record schema](/resources/templates#schema-dataset-admission-record)
   (`dataset-admission-record.v1`): o assunto, o pipeline (treino, ajuste fino, validação, teste,
   avaliação ou índice de recuperação), o sistema alvo, a ficha de dados ligada, a decisão (admitir,
   admitir com condições, rejeitar), os testes com a obrigação que cada um impõe, o hash de conteúdo
   da fotografia admitida, o ator e uma assinatura.
2. **Verifique os direitos primeiro.** A base legal e compatibilidade de finalidade para dados
   pessoais, a licença e a verificação de reserva de direitos vêm do
   [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); uma fonte sem uma linha de
   registo falha a admissão.
3. **Verifique a adequação para a finalidade.** Medidas de qualidade (precisão de rótulos,
   completude, consistência, oportunidade) no vocabulário da série ISO/IEC 5259 [6]; quantidade por
   classe e por grupo contra os tamanhos mínimos de células no plano de teste; representatividade
   contra a população de implantação indicada no registo de caso de uso; um exame de proxy e
   enviesamento com o resultado registado; e, quando dados de categorias especiais são utilizados
   para deteção de enviesamento, as condições `Art. 4a` [2].
4. **Verifique a integridade.** Admita uma fotografia endereçada por conteúdo e assinada;
   re-verifique o hash quando a tarefa a lê; execute verificações de anomalia em dados novos ou
   anexados. ATLAS lista «Sanitize Training Data» (`AML.M0007`) e «Maintain AI Dataset Provenance»
   (`AML.M0025`) entre as suas mitigações [4]. Registe a proveniência em termos W3C PROV (entidades,
   atividades e agentes) [7] e emita eventos de linhagem (conjuntos de dados, tarefas e execuções)
   para que cada execução de treino nomeie os registos de admissão que leu [8].
5. **Separe os deveres.** O proprietário dos dados é responsável e assina; o curador de dados opera
   os testes; uma pequena junta de revisão resolve admissões contestadas. A lista de verificação
   mínima vive como código, portanto adicionar um teste é uma mudança revista.
6. **Aplique na hora da leitura.** A tarefa apresenta o seu id de caso de uso e sistema alvo; a
   política nega a leitura a menos que o registo admita esse pipeline para esse uso. Uma folha de
   dados legível por humanos viaja com o registo, cobrindo motivação, composição, recolha,
   pré-processamento, usos, distribuição e manutenção [9].
7. **Re-admita na mudança.** Uma nova versão, uma nova fonte, desvio de qualidade, uma mudança de
   licença, um pedido de apagamento ou um novo caso de uso reabre a admissão.

O AI RMF pede que as considerações de recolha e seleção de dados (disponibilidade,
representatividade, adequação) sejam «identificadas e documentadas» (MAP 2.3) e que os riscos legais
de dados de terceiros sejam mapeados (MAP 4.1) [10].

Registo de admissão ilustrativo, válido contra `dataset-admission-record.v1`:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/dataset-admission-record.v1.json",
  "control_id": "data.admission.v2",
  "subject": "claims-2019-2025@v4",
  "pipeline": "training",
  "target_system": "fraud-triage@3.0.0",
  "dataset_card": "https://evidence.example.org/cards/claims-2019-2025/v4",
  "decision": "admit_with_conditions",
  "checks": [
    { "check_id": "ledger.rows_present", "requirement": "Training-data rights ledger", "result": "pass" },
    { "check_id": "lawful_basis.compatible", "requirement": "GDPR Art. 6(4)", "result": "pass",
      "detail": "compatibility assessment CA-2026-014" },
    { "check_id": "use_case.permitted", "requirement": "uc-fraud-triage-03", "result": "pass" },
    { "check_id": "quality.label_agreement", "requirement": "EU AI Act Art. 10(3)", "result": "pass",
      "detail": "0.91 inter-annotator agreement" },
    { "check_id": "representativeness.region", "requirement": "EU AI Act Art. 10(3)", "result": "waived",
      "detail": "islands region below minimum cell; waiver W-2026-007 signed by data owner" },
    { "check_id": "bias.examination", "requirement": "EU AI Act Art. 10(2)(f)-(g)", "result": "pass" },
    { "check_id": "integrity.snapshot_hash", "result": "pass" }
  ],
  "conditions": ["collect islands-region claims before the next retrain", "report the islands cell as insufficient data"],
  "input_hash": "sha256:3b7e9c2a41f08d6e5c1b2a9f7e3d4c5b6a8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d",
  "actor": "ci-data-gate",
  "timestamp": "2026-09-20T10:12:00Z",
  "signature": "ed25519:Hk3v8QpZ2sL7dT4rW9xY1aB6cE0fG5jM"
}
```

> **Exemplo (ilustrativo)** Uma equipa de triagem de fraude apontou uma tarefa de treino para o
> armazém completo de reclamações. A porta recusou: o armazém não tinha registo de admissão para
> treino, e duas das suas fontes não tinham linha de registo. A equipa admitiu uma fotografia mais
> estreita em vez disso, com uma verificação de representatividade dispensada por escrito e uma
> condição para recolher dados para a região em falta antes do próximo retreino. A dispensa e a
> condição agora aparecem na ficha de modelo, e o próximo retreino não pode começar até que a
> condição seja fechada.

## Consequências
Nenhum modelo aprende com dados que nunca foram admitidos para o seu uso; os testes de direitos,
qualidade e enviesamento deixam evidência antes do treino em vez de explicações depois dele; e a
linhagem para a frente pode encontrar cada modelo que um conjunto de dados mau alcançou. Os custos:
a porta atrasa o trabalho exploratório a menos que um pipeline de caixa de areia com a sua própria
admissão mais leve exista; as dispensas precisam de um proprietário e de uma expiração ou tornam-se
a norma; e os testes são apenas tão bons quanto os limiares por trás deles.

## Padrões relacionados
[Training-Data Rights Ledger](/patterns/training-data-rights-ledger);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Fairness Eval Suite](/patterns/fairness-eval-suite); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [AI Threat Model](/patterns/ai-threat-model).

**Correspondências:** Regulamento da IA da UE Art. 10(2)–(4), Art. 4a · RGPD Art. 5(1)(b), Art. 6(4)
· ISO/IEC 42001 A.7.2, A.7.4, A.7.5, A.7.6 · NIST AI RMF (Map 2.3, 4.1) · OWASP LLM05:2026 · Layer
01 Govern-as-Code / Layer 02 Inventory & Transparency.

Os IDs de ameaça seguem o OWASP Top 10 for LLM Applications 2026 [5] e MITRE ATLAS [4]; os rótulos
de função e subcategoria seguem o NIST AI RMF [10]; os ids ISO/IEC 42001 Annex A seguem um
mapeamento publicado, não o texto do padrão [11]. Os mapeamentos são ilustrativos, não uma alegação
de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 10 (data and data governance: 10(2)(f) examination in view of possible biases, 10(2)(g) measures to detect, prevent and mitigate them; 10(3) relevant, sufficiently representative, free of errors and complete; 10(4) setting of use) (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on processing special categories of personal data for bias detection and correction, replacing Art. 10(5)); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0020 Training Data Poisoning; mitigations AML.M0007 Sanitize Training Data and AML.M0025 Maintain AI Dataset Provenance). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM05:2026 Data and Model Poisoning). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[7] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[8] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[9] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 2.3 data collection and selection considerations "identified and documented"; MAP 4.1 legal risks of components incl. third-party data). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[11] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.2 data for development and enhancement, B.7.4 quality of data, B.7.5 data provenance, B.7.6 data preparation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
