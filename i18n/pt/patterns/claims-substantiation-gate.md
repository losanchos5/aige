---
lang: pt
source: bok/patterns/claims-substantiation-gate.md
sourceHash: "8aa53627e138fdeb83eabfc7f57afd3ad70d870c8fcec31a058c678db4692172"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: claims-substantiation-gate
title: Claims Substantiation Gate
layer: 5
secondaryLayer: 3
order: 25
summary: "Um registo de afirmações que vincula cada declaração pública sobre a precisão, equidade ou capacidade de um sistema de IA à execução de avaliação por trás dela, e retira afirmações obsoletas."
---

# Patrón: Claims Substantiation Gate

**Resumo:** Mantenha um registo de cada declaração pública sobre o que um sistema de IA faz e com
que eficácia: precisão, equidade, segurança, autonomia, capacidade "alimentada por IA". Cada
afirmação é uma linha que cita a execução de avaliação que a suporta, a população e as condições em
que foi medida, e a data. Um portão bloqueia a publicação de uma afirmação sem evidência ativa, e
cada lançamento de modelo executa novamente as avaliações citadas e assinala qualquer afirmação que
a nova versão já não suporta. É um portão de avaliação apontado para cópia de marketing, material de
vendas e os números de precisão declarados nas instruções de utilização.

## Objetivos
Diga apenas o que a evidência suporta, para a população que a afirmação descreve, e continue a
dizê-lo apenas enquanto permanecer verdadeiro; e seja capaz de mostrar, para qualquer afirmação, o
que a suportou no dia em que foi feita.

## Utilizadores-alvo
Engenheiro de governação da IA, marketing de produto, habilitação de vendas, engenheiro de ML,
conselheiro jurídico e de direito do consumidor, relações com investidores.

## Partes interessadas afetadas
Clientes e consumidores, responsáveis pela implantação que confiam nos números do prestador,
investidores, reguladores de proteção do consumidor e financeiros, autoridades de fiscalização do
mercado.

## Princípios relevantes
Dê a cada controlo força; instrumente a construção para produzir a sua própria evidência; comece por
um modo de falha ou dano nomeado.

## Contexto
Páginas de produto, apresentações de vendas, concursos, materiais para investidores, fichas de
modelo e instruções de utilização dizem todos como é preciso, justo, seguro ou autónomo um sistema.
A cópia é escrita uma vez e propriedade do marketing; a evidência é produzida por ML e muda a cada
lançamento. Os reguladores leem essa cópia. A Operação AI Comply da FTC anunciou que "não há isenção
de IA das leis em vigor" [1]; a sua ordem Workado seguiu uma afirmação de precisão de 98% para um
detetor de conteúdo de IA que testes colocaram em 53% em conteúdo de finalidade geral, e exige
evidência competente e fiável para tais afirmações [2]. A SEC resolveu com dois consultores de
investimento sobre declarações falsas e enganosas sobre o seu uso de IA [3]. Sob o Regulamento da
IA, a própria finalidade prevista é definida em parte pelos "materiais e declarações promocionais ou
de vendas" do prestador (`Art. 3(12)`), e para sistemas de risco elevado os "níveis de precisão e as
métricas de precisão relevantes" devem ser declarados nas instruções de utilização (`Art. 15(3)`),
indicando o nível "contra o qual o sistema de IA de risco elevado foi testado e validado"
(`Art. 13(3)(b)(ii)`) [4].

## Problema
As afirmações sobrevivem à evidência que uma vez as suportou, ou nunca tiveram nenhuma.

- **Forças.** O marketing quer um número simples; o número honesto tem um intervalo e uma população.
  As avaliações são executadas nos dados à mão, não na população que a afirmação descreve: o detetor
  de Workado foi treinado em texto académico, e a afirmação falhou em tudo o resto [2]. Os números
  dos fornecedores são repetidos como se medidos internamente. A enganação, na política da FTC, é
  uma representação, omissão ou prática suscetível de enganar um consumidor agindo razoavelmente, e
  material [5]; a Diretiva de Práticas Comerciais Desleais da UE e a Lei de Mercados Digitais,
  Concorrência e Consumidores do Reino Unido de 2024 proíbem práticas comerciais desleais em termos
  gerais [6] [7].
- **Modo de falha.** Uma regressão é enviada e a antiga afirmação de precisão permanece no sítio.
  Uma afirmação de equidade repousa num folheto do fornecedor. Uma autoridade pergunta o que
  suportou uma declaração feita há um ano, e a única resposta é o diapositivo em que apareceu.

## Solução
Registe a afirmação, vincule-a à evidência, e coloque um portão tanto na publicação como no
lançamento da vinculação.

1. **Registe cada afirmação.** Uma linha por afirmação: o texto exato, cada lugar onde aparece
   (URLs, documentos, as instruções de utilização, a ficha de modelo), o sistema e versão, a
   métrica, o valor afirmado, o proprietário e o estado. "Alimentado por IA" e "autónomo" são também
   afirmações: a linha aponta para a entrada do registo que mostra o que o sistema realmente faz.
2. **Vincule cada afirmação à evidência.** A linha cita a suite de avaliação e a execução, o valor
   medido com o seu intervalo, e a população e as condições de medição. O teste do AI RMF é o
   correto: desempenho "demonstrado para condições semelhantes aos cenários de implantação" (MEASURE
   2.3), com os limites de generalização documentados (MEASURE 2.5) [8]. As regras de fundamentação
   executam como código: a população de medição deve corresponder ao âmbito da afirmação; uma figura
   pontual é afirmada apenas se o limite inferior do intervalo a suporta; uma afirmação comparativa
   precisa de uma comparação emparelhada nos mesmos dados; uma figura fornecida por um fornecedor é
   marcada como atestada pelo prestador até ser remedicida.
3. **Coloque um portão na publicação.** A cópia que contém uma afirmação registada não pode ser
   publicada, ou enviada num concurso, enquanto a evidência da afirmação estiver em falta, obsoleta
   ou a falhar. As afirmações quantitativas não registadas são apanhadas em revisão pela mesma regra
   que bloqueia sistemas não registados.
4. **Coloque um portão no lançamento.** Cada lançamento de modelo executa novamente as suites
   citadas. Uma afirmação cuja evidência cai abaixo do valor afirmado falha o lançamento ou abre uma
   tarefa de retirada com um prazo e um proprietário; a precisão declarada nas instruções de
   utilização é regenerada a partir das mesmas linhas.
5. **Mantenha o histórico.** As afirmações retiradas e alteradas mantêm o seu registo (o que foi
   dito, onde, em que evidência, até quando), para que a organização possa mostrar o que sabia e
   quando.

Linha ilustrativa do registo de afirmações:

```json
{
  "claim_id": "CLM-2026-017",
  "text": "Catches 95% of card-not-present fraud",
  "locations": ["https://www.example.com/product/fraud-shield", "sales-deck-2026Q3#slide-4",
                "instructions-for-use/fraud-cnp/5.3#accuracy"],
  "system": "fraud-cnp@5.3.0",
  "metric": "recall on confirmed card-not-present fraud",
  "claimed_value": 0.95,
  "evidence": { "suite_id": "fraud.recall.cnp.v7", "run": "ci-run-99812", "value": 0.962,
                "ci95": [0.953, 0.970], "population": "EU card-not-present, 2026-Q2, n=4120 confirmed fraud",
                "timestamp": "2026-09-12T08:00:00Z" },
  "scope_match": "pass",
  "status": "substantiated",
  "owner": "product-marketing-fraud",
  "revalidate_on": ["model_release", "2026-12-31"]
}
```

> **Exemplo (ilustrativo)** O sítio de um produto de fraude afirmava uma taxa de deteção medida duas
> versões de modelo antes em tráfego de um país. Registar a afirmação mostrou ambas as lacunas: a
> evidência era obsoleta e a população mais estreita do que a cópia implicava. A afirmação foi
> reescrita para nomear a região, o próximo lançamento executou novamente a suite, e um
> retreinamento posterior que caiu abaixo do valor afirmado abriu uma tarefa de retirada antes do
> novo modelo ser enviado.

## Consequências
As declarações públicas tornam-se evidenciadas, delimitadas e datadas, as afirmações obsoletas são
retiradas pelo pipeline em vez de por um regulador, e a precisão declarada nas instruções de
utilização permanece consistente com o marketing. Os custos: o marketing e o direito devem aceitar
um registo e um passo de revisão; as afirmações honestas são mais estreitas e carregam intervalos; e
a regra sobre correspondência de âmbito precisa de julgamento para afirmações qualitativas, que
permanecem com revisão jurídica.

## Padrões relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Fairness Eval Suite](/patterns/fairness-eval-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondências:** Regulamento da IA Art. 3(12), Art. 13(3)(b)(ii), Art. 15(3) · FTC Act s. 5 ·
Diretiva 2005/29/CE Art. 5 · DMCC Act 2024 s. 225 · ISO/IEC 42001 A.8.2, A.8.5 · NIST AI RMF
(Measure 2.3, 2.5) · Camada 05 Assurance & Continuous Compliance / Camada 03 Evals & Red Teaming as
Evidence.

Os rótulos de função e subcategoria seguem o NIST AI RMF [8]; os ids do Anexo A da ISO/IEC 42001
seguem um mapeamento publicado, não o texto da norma [9]. Os mapeamentos são ilustrativos, não uma
afirmação de conformidade.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; trained on academic text; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[3] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose incl. "promotional or sales materials and statements"; Art. 13(3)(b)(ii) level of accuracy, incl. its metrics, against which the system has been tested and validated; Art. 15(3) accuracy levels and metrics declared in the instructions for use (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[6] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[7] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.3 performance "demonstrated for conditions similar to deployment setting(s)"; MEASURE 2.5 validity and reliability, limits of generalisability documented). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[9] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.8.2 system documentation and information for users, B.8.5 information for interested parties; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
