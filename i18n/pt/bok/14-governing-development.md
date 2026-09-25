---
lang: pt
source: bok/14-governing-development.md
sourceHash: "a8da4ad617810f33e44a55719a0c5546569e9310e2e3364c1f29cf97fe4090de"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 14. Governar o desenvolvimento de IA

> O desenvolvimento de IA é governado quando cada decisão na construção, desde o caso de uso até à
> libertação, deixa um registo que um gate lê, para que o pipeline compile o ficheiro técnico em vez
> de uma equipa o escrever depois.

## A construção como uma cadeia de gates

A maioria das falhas de governação num sistema de IA são decididas antes de servir o seu primeiro
pedido. O caso de uso nunca foi escrito, portanto ninguém pode dizer para que serve o sistema. O
conjunto de treino foi raspado sob termos que ninguém verificou. O conjunto de teste vazou para o
treino. A libertação saiu porque a data foi fixada. Cada um destes é uma decisão de desenvolvimento,
e cada um deixa para trás um registo ou uma lacuna.

Este capítulo cobre o lado do prestador do ciclo de vida: a organização que desenha, treina, testa e
liberta um sistema ou modelo de IA. O
[Capítulo 15](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance) cobre a implantação e
utilização. A divisão segue os detentores de deveres do Regulamento da IA da UE (ver o
[mapa regulatório](/bok/regulatory-map#eu-ai-act-post-omnibus)): a maioria do que se segue vincula o
prestador, e um responsável pela implantação que constrói sobre um modelo procurado herda uma versão
mais fina através do
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate).

Os textos de referência concordam sobre as fases e dizem pouco sobre o mecanismo. ISO/IEC 5338:2023
define processos de ciclo de vida do sistema de IA [1]; ISO/IEC 42001 agrupa os controlos sob Anexo
A.6 (ciclo de vida) e A.7 (dados) [2]; o NIST AI RMF coloca contexto em Map e testes em Measure [3];
o sistema de gestão da qualidade do Regulamento da IA da UE pede controlo de design, verificação de
design e "procedimentos de exame, teste e validação a serem realizados antes, durante e após o
desenvolvimento" [4]. A leitura de engenharia: cada fase termina num gate, cada gate lê um registo
estruturado, e cada registo aterra na loja de evidência associada ao id do inventário, o caminho de
dados de [um sistema através das cinco camadas](/bok/the-stack#one-system-through-the-five-layers).

Os números de camada nas tabelas deste capítulo seguem o capítulo 04:
**1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Fase | Questão de governação | Registo | Gate | Camada |
|---|---|---|---|---|
| Caso de uso | É este o problema certo, e a IA é a ferramenta certa? | Registo de caso de uso | [Aprovação de admissão](/patterns/use-case-intake-risk-tiering) | 1 · 2 |
| Revisão de design | Os requisitos, a arquitetura e a análise de uso indevido resistem? | Registo de design e registo de decisões | Aprovação de revisão de design | 1 · 2 |
| Dados | Podemos usar estes dados, e são adequados para o fim? | Registo de admissão de conjunto de dados, folha de dados, linhagem | [Gate de admissão de conjunto de dados](/patterns/dataset-admission-gate) | 1 · 2 · 3 |
| Testes | O sistema cumpre os limiares fixados antes dos testes serem executados? | Plano de teste, resultados de avaliação, relatório de teste | Gate de avaliação | 3 |
| Lançamento | Está pronto, e a rota de conformidade está completa? | Registo go/no-go, declaração, registo | Gate de libertação | 1 · 5 |
| Ficheiro técnico | Pode uma autoridade reconstruir tudo o que precede? | Ficheiro Anexo IV, fichas, AIBOM | Construção de documentação | 2 · 5 |

Isto não é MLOps, que move o modelo através das mesmas fases, e não é validação de modelo no sentido
bancário, que desafia o modelo em pontos no tempo (o
[cluster de desambiguação](/bok/definition#the-disambiguation-cluster) desenha ambas as linhas). É o
registo de governação que essas duas atividades produzem, feito legível por máquina e dado o poder
de bloquear. As regras de nível organizacional que cada gate aplica são estabelecidas no capítulo 12
([o que a política requer em cada fase](/bok/governance-program#what-policy-requires-at-each-stage)),
e a página de modelos tem esquemas e exemplos preenchidos para o
[registo de caso de uso, revisão de design, admissão de conjunto de dados, plano e relatório de teste, e gate de libertação](/resources/templates#stage-build).
## O registo de caso de uso

O registo de caso de uso é o primeiro artefato e o mais frequentemente ausente. É escrito na
[admissão](/bok/the-role#intake-and-classification), armazenado como campos na entrada do
inventário, e lido por cada gate posterior. O Regulamento da IA da UE ancora-o: a
**finalidade prevista** é "o uso para o qual um sistema de IA é destinado pelo prestador, incluindo
o contexto específico e as condições de utilização" [5], e a maioria dos deveres de risco elevado
são medidos contra ela. O NIST AI RMF pede a mesma coisa em termos de engenharia: as finalidades
previstas, os cenários prospetivos e os tipos de utilizadores são "compreendidos e documentados"
(MAP 1.1), e as tolerâncias de risco organizacionais são "determinadas e documentadas" (MAP 1.5)
[3].

| Campo | O que regista | Lido depois por |
|---|---|---|
| Contexto comercial | O objetivo, o patrocinador, a decisão que o sistema informa | Revisão de design, go/no-go |
| Finalidade prevista | Tarefa, contexto e condições de utilização | Classificação, testes, instruções de utilização |
| Utilizações fora do âmbito | Utilizações que o prestador exclui, declaradas explicitamente | Análise de uso indevido, instruções de utilização, política de runtime |
| Utilizadores e pessoas afetadas | Quem o opera; quem está sujeito aos seus resultados, incluindo grupos vulneráveis | Avaliações de impacto, testes de enviesamento |
| Autoridade de decisão | Consultivo, aprovado por humano ou autónomo; quem pode anulá-lo | Design de supervisão, gate de human-in-the-loop |
| Ambiente operacional | Onde funciona, fontes de entrada, idiomas, jurisdições | Verificações de representatividade, plano de teste |
| Métricas de sucesso | A métrica comercial, a métrica do modelo e a ligação entre elas | Plano de teste, monitorização |
| Apetência de erro | O custo de um falso positivo contra um falso negativo; taxas toleradas | Limiares |
| Tempo de vida esperado | Data de revisão e critérios de reforma | Manutenção, retenção |
| Disponibilidade de dados | Se existem dados legítimos e suficientes | Viabilidade, admissão de conjunto de dados |

### A IA é a ferramenta certa?

A primeira questão do gate é se construir de todo. A orientação de engenharia do Google abre com a
regra «Não tenha medo de lançar um produto sem machine learning» [6], e a versão de governação é
mais rigorosa: se uma regra, uma consulta ou um fluxo de trabalho humano cumpre a métrica de
sucesso, um modelo adiciona risco sem adicionar valor. Registe a linha de base não-ML no registo de
caso de uso e exija que a revisão de design a supere por uma margem declarada. A linha de base
também dá ao teste a sua primeira comparação: um modelo que não supera a regra que substitui não
ganhou um lugar em produção.

### Apetite por erro: falsos positivos versus falsos negativos

Todo o classificador negocia um erro por outro, e a negociação é uma decisão de negócio e direitos,
não de modelação. Um modelo de fraude que assinala demasiado congela clientes legítimos; um que
assinala demasiado pouco deixa a fraude passar. Escreva o apetite antes do treino, na moeda do dano:
o que um caso perdido custa, o que um falso alarme custa, e qual erro, para qual grupo, é limitado
independentemente do custo. A seleção de limiar torna-se então aritmética contra custos declarados,
e mover o limiar torna-se uma alteração ao registo com um aprovador, não uma decisão de ajuste
dentro de um caderno. As taxas de erro por grupo e as negociações de equidade que forçam são
tratadas em [capítulo 16](/bok/fairness-and-explainability#the-impossibility-results).

### Expansão de função

Um modelo construído para um propósito desliza para outros porque as suas pontuações estão
disponíveis e são baratas. A orientação revista de risco de modelo das agências bancárias dos EUA
coloca-o claramente: «Usar um modelo para além da sua finalidade prevista introduz incerteza e risco
adicionais» [7]. Sob o Regulamento da IA da UE a deriva tem consequências legais. Um ator da cadeia
de valor que modifica a finalidade prevista de um sistema de modo que se torna de risco elevado é
tratado como seu prestador (Art. 25(1)(c)) [8], e uma alteração não prevista na avaliação de
conformidade inicial que afeta a conformidade é uma **modificação substancial** (Art. 3(23)) [5]. O
controlo de engenharia é fazer da finalidade prevista e da lista de fora do âmbito campos que uma
política lê. Um novo consumidor da API do modelo declara a sua utilização no registo; uma utilização
declarada fora do registo falha a admissão e reabre a classificação e as avaliações de impacto.

> **Exemplo (ilustrativo)** Um registo de caso de uso armazenado na entrada do registo de um modelo
> de limite de crédito. Cada gate posterior lê estes campos em vez de um slide.

```json
{
  "id": "uc-credit-limit-07",
  "registry_id": "clm-07",
  "intended_purpose": "Recommend a credit-limit band for existing retail customers; a credit officer approves.",
  "out_of_scope": ["new-customer onboarding", "collections prioritisation", "employment decisions"],
  "affected_persons": ["retail customers", "guarantors"],
  "decision_authority": "advisory; officer approval required above band 3",
  "success_metric": { "business": "bad-debt rate", "model": "AUC >= 0.78 on frozen holdout" },
  "error_appetite": { "false_negative": "loss amount", "false_positive": "declined uplift",
                      "max_fnr_gap_between_groups": 0.03 },
  "non_ml_baseline": "scorecard-v5",
  "classification": { "eu_ai_act": "high-risk, Annex III 5(b)", "gdpr_dpia": true, "fria": true },
  "owner": "team-credit-decisioning",
  "review_by": "2027-03-31"
}
```

> **Na prática (ilustrativo)**
> Uma equipa de retenção numa grande operadora de telecomunicações pediu um modelo de churn e
> recebeu, na admissão, um registo de caso de uso de uma página para preencher em vez de um caderno.
> Escrever a lista de fora do âmbito revelou que as vendas queriam as mesmas pontuações para definir
> níveis de desconto individuais: um segundo propósito com a sua própria exposição de equidade. O
> registo dividiu o pedido em dois casos de uso, cada um com a sua própria classificação e apetite
> por erro, e o caso de desconto voltou para uma avaliação de impacto antes de qualquer treino ser
> executado.

## Revisão de design

A revisão de design é o gate entre um caso de uso aprovado e gastar computação. Lê o registo de caso
de uso e produz um **registo de design**: requisitos, arquitetura e escolha de modelo com a sua
fundamentação, a análise de uso indevido, o design de supervisão e os controlos incorporados. O
Anexo IV ponto 2(b) pedirá a um prestador de risco elevado as escolhas de design chave, a sua
fundamentação e pressupostos, e as negociações feitas [9]; escrito no momento, isso custa minutos, e
reconstruído um ano depois, custa um projeto.

### Requisitos com rastreabilidade

Os requisitos vêm em três famílias. Os requisitos **funcionais** dizem o que o sistema faz. Os
requisitos **não-funcionais** estabelecem pisos para precisão, latência, equidade, explicabilidade,
privacidade, robustez e custo. Os requisitos **regulatórios** são as obrigações que a classificação
desencadeia, como registo de eventos ou supervisão incorporada para um sistema de risco elevado. O
NIST AI RMF pede que os requisitos do sistema sejam «obtidos de e compreendidos pelos atores de IA
relevantes» (MAP 1.6) [3].

A rastreabilidade é a parte de engenharia. Cada requisito obtém um id, cada id mapeia para pelo
menos um teste, e cada teste emite um registo de evidência nomeando o requisito. O rastreio torna-se
então uma junção, não uma folha de cálculo: `REQ-FAIR-02` (diferença de taxa de falso negativo entre
grupos etários no máximo 0,03) resolve-se para a suite `fnr-gap-by-age.v2`, para o seu último
resultado, e para a versão que foi enviada nele. Um requisito sem teste é um desejo; um teste sem
requisito é ruído no gate.

### Arquitetura e negociações de seleção de modelo

A escolha de modelo é uma decisão de governação porque fixa o que pode ser testado, explicado e
evidenciado mais tarde. Registe cada escolha como um registo de decisão curto (contexto, opções,
decisão, consequências, data, aprovador) no mesmo repositório que o código.

| Escolha | Opções | Consequência de governação |
|---|---|---|
| Interpretável ou complexo | Scorecard, modelo esparso ou aditivo, árvore pequena; ou gradient boosting, rede profunda, LLM | Um modelo interpretável é a sua própria explicação; um complexo precisa de explicação post-hoc que pode divergir do modelo. Rudin argumenta que decisões de alto risco devem usar modelos interpretáveis em vez de explicar caixas negras depois do facto [10] |
| Pesos abertos ou proprietários | Pesos auto-hospedados; ou uma API de fornecedor | Os pesos podem ser testados, fixados e hospedados em região; uma API pode mudar atrás de si, e a sua evidência é recolhida, não produzida ([IA procurada](/bok/the-stack#third-party-and-procured-ai)) |
| Treinar, ajustar ou solicitar | Modelo próprio; modelo de fundação ajustado; solicitação e recuperação | Cada passo acima adiciona deveres de dados de treino; uma modificação suficientemente grande de um modelo de finalidade geral pode torná-lo seu prestador [11] |
| Recuperação ou ajuste para conhecimento | Corpus RAG; conhecimento em pesos | Um corpus pode ser versionado, filtrado e apagado; o conhecimento em pesos não pode ser removido sem retreino |
| Hospedagem | Serviço gerido; infraestrutura própria | Residência de dados, propriedade de registo e controlo de retenção |
| Custo e sustentabilidade | Tamanho do modelo, execuções de treino, volume de inferência | O Anexo IV pede os recursos computacionais utilizados para desenvolver, treinar, testar e validar [9]; o Anexo XI pede aos prestadores de GPAI consumo de energia conhecido ou estimado [12] |

### Utilização indevida razoavelmente previsível

A **utilização indevida razoavelmente previsível** é «a utilização de um sistema de IA de forma não
conforme com a sua finalidade prevista, mas que pode resultar de comportamento humano razoavelmente
previsível ou interação com outros sistemas» [5]. Não é a mesma coisa que um ataque. Um atacante é
modelado pela equipa de red team em
[camada 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence); a utilização indevida
previsível é o que utilizadores ordinários e sistemas adjacentes farão de qualquer forma com o
resultado: uma pontuação de triagem lida como diagnóstico, uma classificação de CV usada para
rejeitar sem revisão, um resumidor apontado para uma língua em que nunca foi testado.

O Regulamento da IA da UE torna a análise uma entrada de design duas vezes. O sistema de gestão de
riscos deve estimar e avaliar os riscos que emergem em condições de utilização indevida
razoavelmente previsível (Art. 9(2)(b)) [13], e as instruções de utilização devem divulgar
circunstâncias conhecidas ou previsíveis, incluindo tal utilização indevida, que podem levar a
riscos para a saúde, segurança ou direitos fundamentais (Art. 13(3)(b)(iii)) [14]. Mantenha um
**registo de utilização indevida** no registo de design: cenário, quem o faria, probabilidade, dano,
e a resposta. Cada entrada deve cair em pelo menos um de três lugares: um teste na suite de
avaliação, uma política de tempo de execução que a bloqueia ou assinala, ou um aviso nas instruções
de utilização. Uma entrada que não cai em lado nenhum é um risco aceite e precisa de um aceitador
nomeado ([capítulo 13](/bok/risk-management#who-may-accept) cobre quem pode aceitar).

### Supervisão e controlos incorporados

O campo de autoridade de decisão do registo de caso de uso define o modelo de supervisão. O Grupo de
Peritos de Alto Nível da UE nomeia três abordagens: humano no loop, humano sobre o loop e humano em
comando [15]. A revisão de design escolhe uma por classe de decisão e a desenha contra viés de
automação e supervisão que se degrada sob carga, conforme estabelecido em
[desenhar supervisão humana](/bok/the-stack#designing-human-oversight-article-14) e o padrão
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate). A mesma revisão fixa os controlos
que são baratos agora e caros de retrofit: registo de eventos, um caminho de reversão, um modo de
sombra, e um [**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) para
qualquer coisa que atua.

A revisão é um gate com revisores nomeados: um líder de engenharia, o engenheiro de governação da
IA, segurança, privacidade, um especialista de domínio e, onde as pessoas afetadas estão fora da
organização, alguém que pode falar por elas. O seu resultado é um registo de design assinado com
condições abertas, não minutos.

## Dados para treino e teste

[Governação de dados em todo o stack](/bok/the-stack#data-governance-across-the-stack) estabelece a
regra de que cada conjunto de dados tem uma base legal, uma proveniência, um limite de retenção e um
conjunto de direitos. Esta secção é o procedimento de tempo de desenvolvimento que a impõe: um
[**gate de admissão de conjunto de dados**](/patterns/dataset-admission-gate). Uma tarefa de treino
pode ler apenas conjuntos de dados cujo registo de admissão está completo e assinado pelo
proprietário dos dados, e a verificação é política como código no pipeline, não um lembrete numa
wiki.

### O direito de utilizar os dados

A admissão começa com direitos, porque um problema de qualidade pode ser corrigido e um problema de
direitos muitas vezes não pode. Por conjunto de dados, o registo responde a cinco questões.

- **Base legal e finalidade.** Para dados pessoais, qual base do RGPD se aplica ao treino, e se o
  treino é compatível com a finalidade da recolha original. A limitação de finalidade (Art. 5(1)(b))
  e os fatores de compatibilidade do Art. 6(4) decidem se dados recolhidos para servir clientes
  podem treinar um modelo sobre eles [16]. O consentimento para um serviço não é consentimento para
  treinar.
- **Categorias especiais.** Após o Omnibus Digital, a base estreita para processar dados de
  categorias especiais para deteção de viés senta-se num novo Art. 4a em vez do antigo Art. 10(5),
  condicionado a salvaguardas e apagamento [17] (veja o
  [mapa regulatório](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- **Modelos como dados pessoais.** A Opinião 28/2024 do EDPB (dezembro de 2024) sustenta que um
  modelo treinado em dados pessoais é anónimo apenas se for muito improvável tanto identificar as
  pessoas cujos dados o treinaram como deixar qualquer pessoa extrair esses dados através de
  consultas; estabelece um teste de três passos para interesse legítimo e avisa que o processamento
  ilegal no desenvolvimento pode afetar a legalidade da implantação [18].
  [Capítulo 19](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference) leva isto mais
  longe.
- **Conteúdo raspado e de terceiros.** A exceção comercial de mineração de texto e dados da UE
  aplica-se apenas quando os titulares de direitos não reservaram os seus direitos "de forma
  apropriada, nomeadamente através de meios legíveis por máquina" para conteúdo disponibilizado
  publicamente em linha (Diretiva DSM Art. 4(3)) [19], e um prestador de IA de finalidade geral deve
  manter uma política de direitos de autor que identifique e cumpra tais reservas (Regulamento da IA
  Art. 53(1)(c)) [20]. Registe a data da raspagem, a verificação da reserva e o seu resultado por
  fonte.
- **Licenças e garantias.** Se a licença do conjunto de dados permite treino, utilização comercial e
  distribuição de modelos derivados, e o que o fornecedor garante sobre a recolha legal. A licença
  entra no [**AIBOM**](/patterns/aibom) para que uma alteração de licença apareça na próxima
  compilação.

### ### Qualidade, quantidade, representatividade e adequação ao fim

Para sistemas de risco elevado, o Art. 10 transforma a qualidade dos dados em lei. Os conjuntos de
treino, validação e teste necessitam de práticas de governação cobrindo, entre outras, recolha e
origem, preparação, os pressupostos sobre o que os dados medem, disponibilidade e adequação, exame e
mitigação de enviesamento, e lacunas nos dados (Art. 10(2)); devem ser "relevantes, suficientemente
representativos e, na melhor medida possível, isentos de erros e completos" (Art. 10(3)) e refletir
o contexto de utilização (Art. 10(4)) [21]. A série ISO/IEC 5259 fornece o vocabulário, as medidas e
os processos e estruturas de governação [22].

| Dimensão | Pergunta | Teste que o evidencia |
|---|---|---|
| Precisão das etiquetas | As etiquetas estão corretas? | Auditoria de uma amostra etiquetada; concordância entre anotadores |
| Completude | Faltam campos, segmentos ou períodos? | Taxas nulas por campo e por segmento |
| Consistência | O mesmo facto é registado da mesma forma? | Verificações de esquema e restrições |
| Atualidade | Os dados estão atualizados para o ambiente operacional? | Intervalo de datas em relação ao registo de caso de utilização |
| Quantidade | Há exemplos suficientes por classe e por grupo? | Contagens de células em relação ao mínimo no plano de teste |
| Representatividade | A população corresponde à população de implantação? | Comparação de distribuição em relação a uma referência |
| Adequação ao fim | Os dados medem o que o caso de utilização necessita, ou um proxy? | Análise de proxy; registo de pressupostos (Art. 10(2)(d)) |
| Integridade | Alterou-se desde a admissão? | Hashes de conteúdo; snapshots assinados |

Quantidade não é representatividade. Um conjunto de dados grande extraído da população errada é
precisamente errado, e mais dele não cura o enviesamento; apenas estreita o intervalo de confiança
em torno da resposta errada. O catálogo de ferramentas lista
[ferramentas de validação de dados](/resources/tools#cat-data-validation) como exemplos
ilustrativos, não como recomendações.

### ### Proprietários, curadores e a porta de admissão

O **proprietário dos dados** é responsável por um conjunto de dados: as suas utilizações permitidas,
a sua aceitação de risco e a assinatura no seu registo de admissão. O **curador dos dados** opera-o:
verificações de qualidade, metadados, acesso e eliminação. Separar os dois mantém a pessoa que quer
que os dados sejam utilizados afastada de ser a única pessoa que decide que podem ser. Quando muitas
equipas partilham dados, uma pequena comissão de revisão de dados resolve admissões contestadas e
define a lista de verificação mínima de admissão; a lista de verificação em si existe como código
para que um campo em falta falhe o pipeline.

### ### Proveniência versus linhagem

As duas palavras são utilizadas indistintamente e não devem ser. **Proveniência** é de onde veio um
conjunto de dados e em que termos. W3C PROV define-a como "informação sobre entidades, atividades e
pessoas envolvidas na produção de um dado ou coisa, que pode ser utilizada para formar avaliações
sobre a sua qualidade, fiabilidade ou confiabilidade", e o seu modelo de dados (PROV-DM, uma
Recomendação W3C desde 30 de Abril de 2013) expressa-a como entidades, atividades e agentes [23].
**Linhagem** é como os dados se moveram e alteraram através de pipelines. OpenLineage fornece um
padrão aberto para emitir eventos de linhagem sobre conjuntos de dados, tarefas e execuções, com
facetas extensíveis [24]. A linhagem funciona nos dois sentidos: a linhagem retrógrada responde "o
que alimentou este modelo?", a linhagem prospetiva responde "quais modelos utilizaram este conjunto
de dados?", e a segunda pergunta é a que um pedido de apagamento ou uma retirada de licença coloca.

Escolha a granularidade por onde os direitos se fixam. A proveniência ao nível do conjunto de dados
é a predefinição. A proveniência ao nível do registo é necessária quando os direitos se fixam em
registos (dados pessoais, licenças por fonte, exclusões). A linhagem ao nível da característica é
necessária para características derivadas sensíveis que podem atuar como proxies. O acompanhamento
legível por humanos é uma folha de dados: Gebru e colegas propuseram que cada conjunto de dados
tenha uma cobrindo a sua motivação, composição, recolha, pré-processamento, utilizações,
distribuição e manutenção [25]. O catálogo de ferramentas lista
[ferramentas de versionamento e linhagem](/resources/tools#cat-versioning) como exemplos
ilustrativos, não como recomendações.

### ### Dados sintéticos, aumento e tecnologias de melhoria da privacidade

Os dados sintéticos herdam as propriedades do seu gerador: os seus enviesamentos, as suas lacunas e,
quando o gerador memorizou, os seus registos de origem. Trate um conjunto sintético como um conjunto
de dados com o seu próprio registo de admissão nomeando o gerador, os dados de origem e o método de
privacidade. A privacidade diferencial é a tecnologia de melhoria da privacidade com uma garantia
mensurável, e NIST SP 800-226 (Março de 2025) explica como avaliar uma afirmação de privacidade
diferencial e os "perigos de privacidade" que surgem quando a matemática encontra uma implementação
[26]. O aumento e a reamostragem alteram o equilíbrio de classes e, aplicados antes da divisão de
treino e teste, vazam informação para o conjunto de teste e inflacionam as pontuações.

Os dados sintéticos são também um item de divulgação. A AB 2013 da Califórnia, em vigor desde 1 de
Janeiro de 2026, exige que os programadores de sistemas de IA generativa disponibilizados aos
californianos publiquem documentação de dados de treino que declare, entre outros itens, se foi
utilizada geração de dados sintéticos [27]; o modelo da UE para o resumo de conteúdo de treino de IA
de finalidade geral lista dados sintéticos entre as fontes de dados a descrever [28].

> **Exemplo (ilustrativo)** Um registo de admissão de conjunto de dados. A tarefa de treino verifica
> `admitted` e `permitted_uses` em relação ao id do caso de utilização antes de ler um byte.

```json
{
  "dataset_id": "ds-claims-2019-2025@v4",
  "owner": "head-of-claims-data",
  "steward": "data-platform-claims",
  "sources": [{ "name": "claims-core", "period": "2019-01/2025-12",
                "basis": "GDPR Art. 6(1)(f); compatibility assessment CA-2026-014", "licence": "internal" }],
  "tdm_reservation_check": "not applicable (internal data)",
  "special_category": { "present": false },
  "provenance": "prov:wasDerivedFrom claims-core@2026-01-15",
  "lineage_run": "openlineage:claims-features/run-8812",
  "quality": { "null_rate_max": 0.02, "label_agreement": 0.91, "min_n_per_group": 400 },
  "permitted_uses": ["uc-fraud-triage-03"],
  "retention_until": "2032-12-31",
  "admitted": true,
  "admitted_by": "head-of-claims-data",
  "timestamp": "2026-09-20T10:12:00Z"
}
```

## ## Teste e validação

### ### Um plano de teste antes da primeira execução

O Regulamento da IA da UE exige que sistemas de risco elevado sejam testados "durante todo o
processo de desenvolvimento e, em qualquer caso, antes de serem colocados no mercado", em relação a
"métricas previamente definidas e limiares probabilísticos apropriados à finalidade prevista" (Art.
9(8)) [13]. O NIST AI RMF pede que conjuntos de teste, métricas e ferramentas sejam documentados
(MEASURE 2.1) e que o sistema seja demonstrado como válido e fiável, com os limites de generalização
documentados (MEASURE 2.5) [3]. As palavras operacionais são *previamente definidas*. Congele o
plano de teste no repositório antes de a avaliação começar: métricas, limiares com a sua ligação ao
apetite de erro, conjuntos de dados, subgrupos, tamanhos de amostra e o número de execuções
repetidas. Uma alteração ao plano após os resultados serem conhecidos é um diff com um aprovador.
Essa única regra previne a procura de métricas, o hábito de escolher a métrica que passa após ver
todas elas.

### ### A matriz de tipo de teste

ISO/IEC TR 29119-11 fornece diretrizes para teste de sistemas baseados em IA [29], e a série ISO/IEC
24029 cobre a avaliação da robustez de redes neurais [30]. A matriz abaixo é a versão de trabalho:
uma linha por tipo de teste, uma coluna por família de sistema, e a evidência que cada execução
deixa. A latência de cauda (o percentil 95 ou 99) pertence a ela porque uma média oculta os pedidos
lentos que os utilizadores e os tempos limite realmente encontram.

| Tipo de teste | ML clássico | Sistema LLM ou agente | Registo de evidência |
|---|---|---|---|
| Unidade | Transformações de características, validadores de dados, contratos de entrada e saída do invólucro de modelo | Modelos de prompt, esquemas de ferramentas, analisadores de saída | Execução de teste CI |
| Integração | Pipeline de ponta a ponta num conjunto de dados de acessório | Orquestração, recuperação e chamadas de ferramentas em relação a caixas de areia | Relatório de integração |
| Validação | Validação retida, validação cruzada k-fold, validação externa noutro local ou período | Suites de tarefas retidas, conjuntos dourados, amostras classificadas por humanos | Resultado de avaliação com intervalo |
| Desempenho | Débito, latência p95 e p99, memória | Tempo até ao primeiro token, latência p99, tokens e custo por tarefa | Relatório de teste de carga |
| Robustez e fora da distribuição | Ruído, perturbação, mudança de covariável, conjuntos fora da distribuição | Paráfrase, erros tipográficos, mudança de idioma e formato, contexto longo | Avaliação de robustez |
| Stress e casos extremos | Valores extremos, classes raras, entradas em falta | Entradas de tamanho excessivo, falhas de ferramentas, tempos limite, ciclos | Relatório de stress |
| Segurança e adversarial | Evasão, envenenamento, extração de modelo, inferência de adesão | Injeção de prompts, jailbreak, uso indevido de ferramentas, exfiltração de dados | Descobertas de equipa vermelha |
| Enviesamento e equidade | Taxas de erro e seleção por grupo | Taxas de qualidade e recusa por grupo, idioma e dialeto | Avaliação de subgrupo |
| Interpretabilidade | Importância de características global, explicações locais, estabilidade de código de razão | Fidelidade de citação, consistência de justificativa | Avaliação de explicação |
| Cenário | Casos de ponta a ponta do registo de caso de utilização e registo de uso indevido | Tarefas multi-passo e trajetórias de agente | Relatório de cenário |
| Humano no ciclo | Precisão do revisor com e sem o modelo; taxa de sobreposição | Qualidade de aprovação sob carga; sondas de enviesamento de automação | Teste de supervisão |
| Regressão | Deltas de pontuação em relação à última versão | Deltas de pontuação em relação à última versão de modelo ou prompt | Veredicto da porta de avaliação |

Cada linha é uma suite atrás da [**Eval Gate in CI**](/patterns/eval-gate-in-ci); a linha de
segurança é a [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite). As métricas de
equidade são definidas no [capítulo 16](/bok/fairness-and-explainability#group-fairness-metrics),
que também cobre
[teste de enviesamento e interpretabilidade](/bok/fairness-and-explainability#testing-explanation-quality)
das próprias explicações.

### ### Validade estatística de avaliações

Uma porta de avaliação é apenas tão boa quanto a estatística sob o seu limiar, e a maioria das
portas não tem nenhuma
([os limites da porta de avaliação](/bok/definition#the-limits-of-the-eval-gate) estabelecem os
outros limites). O tratamento de Miller de avaliações de modelos de linguagem enquadra questões de
avaliação como uma amostra de uma super-população não vista e fornece as fórmulas para erros padrão,
para comparar dois modelos e para planear tamanhos de amostra [31]. Quatro consequências para a
porta seguem.

- **Reporte um intervalo, não um ponto.** Uma taxa de aprovação de 0,96 em 200 casos tem um erro
  padrão de √(0,96 × 0,04 / 200) ≈ 0,014, portanto o seu intervalo de 95% é aproximadamente 0,933 a
  0,987 (±1,96 erros padrão). Um limiar de 0,95 fica dentro dele, e a porta não consegue distinguir
  uma aprovação de uma rejeição. Em 2.000 casos o intervalo estreita-se para aproximadamente 0,951 a
  0,969. Dimensione a suite a partir do limiar, não a partir do tempo disponível.
- **Zero falhas não é zero risco.** Se nenhum de *n* casos independentes falha, a taxa de falha que
  produziria esse resultado 5% das vezes satisfaz (1 − p)^n = 0,05, portanto p ≈ −ln(0,05)/n ≈ 3/n.
  Trezentos casos limpos limitam a taxa de falha a cerca de 1% com 95% de confiança.
- **Repita execuções não determinísticas.** A temperatura de amostragem, o agrupamento e a latência
  de ferramentas tornam uma execução uma amostra de uma. Execute cada suite várias vezes, comunique
  a média e a dispersão, fixe sementes e versões onde o stack o permite, e compare modelos nas
  mesmas questões (um desenho emparelhado) para reduzir ruído [31].
- **Desconfie do juiz e do benchmark.** Juízes de LLM mostram enviesamentos de posição, verbosidade
  e auto-aprimoramento, mesmo onde juízes fortes atingem mais de 80% de concordância com
  preferências humanas [32]. Calibre um juiz contra uma amostra rotulada por humanos, randomize a
  ordem das respostas, prefira um juiz de uma família de modelos diferente daquela sob teste, e
  versione o prompt do juiz com a suite. Itens de teste vistos no treino inflacionam pontuações; a
  contaminação pode ser demonstrada mesmo para modelos de caixa preta [33]. Mantenha conjuntos
  privados retidos, rode itens e registe quando cada item foi escrito em relação ao corte de dados
  do modelo.

### ### Validação independente e gestão de risco de modelos

A banca executa validação independente de modelos há anos, e a engenharia de governação da IA toma
emprestada a sua melhor ideia: **desafio efetivo**. Nos EUA, SR 11-7 (2011) foi substituído em 17 de
abr de 2026 por SR 26-2, orientação conjunta da Reserva Federal, do OCC e do FDIC. Mantém o desafio
efetivo como análise crítica por peritos objetivos com a perícia, "independência suficiente para
manter a objetividade", e a posição para efetuar mudanças, e mantém os três componentes da
validação: solidez conceptual, acompanhamento contínuo e análise de resultados [7]. Também traça uma
linha que o engenheiro deve notar: modelos de IA generativa e agêntica "não estão no âmbito desta
orientação", enquanto os seus princípios se aplicam a modelos tradicionais e "modelos de IA não
generativos, não agênticos" [7]. No Reino Unido, a SS1/23 da PRA aplica-se a bancos, sociedades de
construção e empresas de investimento designadas pela PRA com aprovação de modelo interno, torna a
validação independente de modelos um dos seus cinco princípios e aborda técnicas de IA e
aprendizagem automática [34].

A engenharia de governação da IA toma desta tradição a independência do validador, o desafio
documentado e a estratificação por materialidade. Acrescenta validação como uma suite re-executável
com registos de evidência em vez de um PDF, e cobertura para os sistemas generativos e agênticos que
SR 26-2 deixa de fora. O validador trabalha a partir de um repositório separado com acesso de
leitura ao modelo e aos dados, arquiva descobertas como problemas com proprietários e prazos, e
assina a porta de lançamento para os níveis altos.

### ### Reprodutibilidade e versionamento ligado

Um resultado que ninguém consegue reproduzir não é evidência. O **registo de treino** captura o
commit de código, os hashes dos instantâneos de dados admitidos, a configuração e hiperparâmetros,
as sementes, o ambiente (digest de contentor, versões de biblioteca, hardware), a computação
utilizada, qualidade de rotulagem (concordância entre anotadores) e o proprietário. O registo liga
em ambas as direções: versão de modelo para registo de treino para resultados de avaliação para tag
de lançamento para as aprovações de risco que o deixam enviar.

O [próprio artefato de modelo precisa de integridade](/patterns/model-artefact-integrity). Assine-o:
a ferramenta de assinatura de modelos da OpenSSF assina uma declaração listando cada ficheiro de
modelo e o seu digest, através de Sigstore ou chaves convencionais, e a verificação recomputa os
hashes [35]. Recuse carregar formatos serializados que executem código de fontes não confiáveis; a
documentação Python é clara que "O módulo pickle não é seguro" [36]. Ambas as verificações pertencem
à compilação junto com o [**AIBOM**](/patterns/aibom). O catálogo de ferramentas lista
[ferramentas de assinatura e digitalização de artefatos](/resources/tools#cat-signing) como exemplos
ilustrativos, não recomendações.

### ### O que corre mal no treino e teste

| Problema | Como se manifesta | Como detetar | Resposta da porta |
|---|---|---|---|
| Fuga de dados | Pontuação de teste demasiado boa; colapsa em produção | Divida por entidade e tempo; audite características para campos pós-resultado | Bloqueie; re-divida e retreine |
| Sobreajuste | Pontuação de treino muito acima da validação | Curvas de aprendizagem; variância de validação cruzada | Bloqueie; regularize ou adicione dados |
| Subajuste | Ambas as pontuações baixas, perto da linha de base | Comparação com a linha de base não-ML | Bloqueie; revise o desenho |
| Ruído de rótulo | Teto de precisão; rótulos inconsistentes | Concordância entre anotadores; amostra reetiquetada | Reabra admissão de conjunto de dados |
| Desequilíbrio de classe | Precisão alta, recall de minoria fraco | Métricas por classe, não apenas precisão | Reamostra ou repondere; re-teste |
| Calibração fraca | Pontuações não correspondem a taxas observadas | Diagrama de confiabilidade; erro de calibração | Recalibre antes de os limiares serem definidos |
| Lacuna de cobertura de subgrupo | Intervalos amplos ou sem dados para um grupo | Contagens de células em relação ao plano de teste | Bloqueie para risco elevado; recolha dados |
| Incompatibilidade de ambiente | Passa offline, falha online | Execução paralela em entradas em direto | Mantenha em execução paralela |
| Contaminação de teste | Pontuação de benchmark público acima da pontuação de conjunto privado | Lacuna privada e pública; testes de contaminação | Elimine itens contaminados |
| Resultado irreproducível | Uma re-execução discorda | Re-execuções com semente fixa | Bloqueie até reproduzível |
| Utilização além do âmbito do consentimento | Conjunto de dados utilizado fora dos seus usos permitidos | Linhagem ligada aos registos de admissão | Bloqueie; revisão legal |

Cada descoberta torna-se um problema com um proprietário, uma gravidade e um prazo. Uma descoberta
que é enviada sem correção é um risco aceite com um aceitador nomeado, registado no registo de risco
que o [capítulo 13](/bok/risk-management#the-risk-register-as-an-evidence-record) descreve, e
torna-se um teste de regressão para que não possa regressar silenciosamente.

> **Na prática (ilustrativo)**
> Um resumidor de LLM passou a sua porta de lançamento em 0,96 contra um piso de 0,95, em 150 casos
> selecionados manualmente. Um revisor pediu o intervalo: nesse tamanho de amostra corria de cerca
> de 0,93 a 0,99, portanto a porta não conseguia distinguir uma aprovação de uma rejeição. A equipa
> mudou para um plano congelado de 1.500 casos estratificados por tipo de documento e idioma, três
> execuções repetidas para capturar variância de amostragem, e um juiz de uma família de modelos
> diferente calibrado contra 200 classificações humanas. A porta tornou-se mais lenta, e os seus
> veredictos começaram a significar algo.

## ## Prontidão de lançamento e conformidade

### ### A porta de go/no-go

O lançamento é um marco de governação, não uma entrega de engenharia. A porta de lançamento lê os
registos que as portas anteriores produziram e recusa abrir enquanto algum estiver em falta ou
desatualizado: um registo de caso de uso atual; um registo de desenho assinado; conjuntos de dados
admitidos; um relatório de teste em relação ao plano congelado; problemas abertos abaixo da
gravidade acordada ou aceites por um aceitador nomeado; avaliações de impacto concluídas; fichas e
instruções de utilização regeneradas; monitorização configurada (ver
[capítulo 15](/bok/governing-deployment#operating-the-system)); um rollback testado; operadores
treinados. Os revisores são nomeados antecipadamente: proprietário do produto, engenharia, o
engenheiro de governação da IA, segurança, privacidade e, para os níveis altos, legal e o validador
independente. O resultado é um registo go/no-go assinado com as suas condições, arquivado em relação
à entrada do registo. O responsável pela implantação executa a sua própria
[revisão de go-live](/bok/governing-deployment#the-go-live-review) em cima dele (capítulo 15).
[Lançamento em fases](/patterns/staged-rollout-rollback-criteria), cada uma com critérios de saída
do plano de teste: **execução paralela** (o sistema executa em entradas em direto e os seus
resultados são registados, não utilizados), **canário** (uma pequena parte do tráfego), um
**piloto limitado**, depois disponibilidade geral. Na UE, investigação, teste e desenvolvimento
antes de colocar no mercado ficam fora do Regulamento da IA, exceto teste em condições reais [37];
esse teste é regido pelo Art. 60, que após o Omnibus Digital cobre sistemas do Anexo III e produtos
da Secção A do Anexo I, com um novo Art. 60a deixando os estados-membros permitir para produtos da
Secção B [17].

### ### Conformidade do Regulamento da IA da UE, por ordem

Para sistemas de risco elevado, a porta de lançamento carrega uma sequência legal. Após o Omnibus
Digital, os deveres de risco elevado aplicam-se a sistemas do Anexo III a partir de 2 de dez de 2027
e a produtos do Anexo I a partir de 2 de ago de 2028 [38].

| Passo | Artigo | Artefato | Produzido por |
|---|---|---|---|
| 1. Sistema de gestão da qualidade em vigor | `Art. 17` | Procedimentos QMS, versionados | Prestador |
| 2. Documentação técnica elaborada | `Art. 11`, Anexo IV | O ficheiro técnico | Pipeline e autores nomeados |
| 3. Avaliação da conformidade | `Art. 43`, Anexo VI ou VII | Registo de controlo interno, ou certificado de organismo notificado | Prestador, ou organismo notificado |
| 4. Declaração de conformidade da UE | `Art. 47`, Anexo V | Declaração assinada | Prestador |
| 5. Marcação CE | `Art. 48` | Marcação CE física ou digital, com o número do organismo notificado onde um foi envolvido | Prestador |
| 6. Registo | `Art. 49`, `Art. 71` | Entrada na base de dados da UE | Prestador |
| 7. Colocação no mercado e monitorização | `Art. 72` | Plano de acompanhamento pós-comercialização em operação | Prestador |

**Anexo VI ou Anexo VII.** Os pontos 2 a 8 do Anexo III seguem controlo interno sob Anexo VI, sem
organismo notificado [39]. Sob Anexo VI o prestador verifica que o seu sistema de gestão da
qualidade cumpre o Art. 17, examina a documentação técnica em relação aos requisitos, e verifica que
o processo de desenho e desenvolvimento e o acompanhamento pós-comercialização são consistentes com
essa documentação [39]. O ponto 1 do Anexo III (biometria) pode utilizar Anexo VI ou Anexo VII
apenas onde o prestador tenha aplicado normas harmonizadas ou especificações comuns; caso contrário,
deve seguir Anexo VII, em que um organismo notificado avalia o sistema de gestão da qualidade e a
documentação técnica, com acesso completo aos conjuntos de dados de treino, validação e teste, emite
um certificado e deve ser informado de mudanças [39]. Nenhuma norma harmonizada tinha sido citada no
Jornal Oficial na última verificação que este livro regista (2026-09-19; ver
[o que ainda não está harmonizado](/bok/regulatory-map#what-is-not-harmonised-yet)) [40]; enquanto
isso se mantiver, um prestador de biometria que planeie hoje deve planear para um organismo
notificado. Os produtos do Anexo I passam pelo seu procedimento de conformidade setorial, e o
Omnibus Digital deixa os organismos notificados sob essa legislação avaliar os requisitos de IA se
se candidatarem a designação até 28 de jan de 2028 [17].

**Declaração, marcação e registo.** A declaração de conformidade da UE segue o Anexo V e é mantida
durante 10 anos; a marcação CE é afixada de forma visível, legível e indelével, ou digitalmente para
sistemas fornecidos digitalmente [41]. Antes da colocação no mercado, o prestador regista os
sistemas do Anexo III na base de dados da UE, exceto o ponto 2 (infraestrutura crítica), que é
registado a nível nacional; os sistemas que o prestador considerou não serem de risco elevado nos
termos do Art. 6(3) são também registados; e os sistemas de aplicação da lei, migração, asilo e
fronteiras entram numa secção não pública [42]. Após o Omnibus Digital, o registo do Art. 6(3)
solicita menos dados, e as PME e pequenas empresas de média dimensão podem fornecer a documentação
técnica numa forma simplificada que a Comissão estabelece [17]. O movimento de engenharia é gerar a
carga útil da base de dados a partir da entrada do registo, de modo que o registo e o
[**Agentenregister**](/patterns/agent-registry) não possam divergir.

### ### Modificação substancial

Uma **modificação substancial** é uma alteração após a colocação no mercado "que não foi prevista ou
planeada na avaliação de conformidade inicial realizada pelo prestador e que, como resultado, afeta
a conformidade do sistema de IA com os requisitos estabelecidos no Capítulo III, Secção 2, ou
resulta numa modificação da finalidade prevista para a qual o sistema de IA foi avaliado" [5].
Desencadeia uma nova avaliação de conformidade (Art. 43(4)); para sistemas que continuam a aprender
após o lançamento, as alterações que o prestador pré-determinou na avaliação inicial e descreveu na
documentação técnica não são modificações substanciais [39], razão pela qual o Anexo IV ponto 2(f)
solicita essas alterações pré-determinadas e as soluções técnicas que mantêm o sistema em
conformidade à medida que muda [9].

Escreva o envelope pré-determinado como código: fontes de dados permitidas, cadência de retreino,
pisos de métricas e intervalos de limiar. Depois classifique cada alteração ao modelo, dados,
prompts, ferramentas ou limiares na fusão: dentro do envelope (re-executar os gates), fora dele mas
conformidade não afetada (re-executar os gates e registar o raciocínio), ou uma potencial
modificação substancial (parar, revisão legal, reavaliação). Um modelo retreinado é um novo
lançamento. Passa pelos mesmos gates, obtém uma nova versão no registo e regenera as suas fichas;
não herda os veredictos do seu predecessor. Para agentes, o capítulo 23 coloca
[alterações de prompt e system-prompt sob controlo de alterações](/bok/governing-agents#prompts-as-configuration-under-change-control).

## O ficheiro técnico

### ### Anexo IV, elemento por elemento

O Art. 11 exige que a documentação técnica de um sistema de risco elevado seja elaborada antes da
colocação no mercado e mantida atualizada, com pelo menos o conteúdo do Anexo IV [9]. A maior parte
do Anexo IV é já produzida por um pipeline governado; o resto é julgamento que apenas uma pessoa
pode fornecer. A tabela divide-o.

| Item do Anexo IV | O que pede | Fonte do pipeline | O que uma pessoa ainda deve escrever |
|---|---|---|---|
| 1(a) | Finalidade prevista, prestador, versão | Registo de caso de uso; entrada do registo | A própria declaração de finalidade prevista |
| 1(b) | Interação com outro hardware, software e sistemas de IA | AIBOM; diagrama de arquitetura | Pressupostos de integração |
| 1(c) | Versões de software e firmware; requisitos de atualização | AIBOM; ficheiros de bloqueio | Nenhum além da revisão |
| 1(d) | Formas em que é colocado no mercado | Manifesto de lançamento | Descrição de distribuição |
| 1(e) | Hardware em que funciona | Manifestos de implantação | Nenhum além da revisão |
| 1(f) | Fotografias, quando é um componente de produto | Não aplicável à maioria do software | Documentação do produto |
| 1(g) | A interface de utilizador fornecida ao responsável pela implantação | Capturas de ecrã de testes de integração | Descrição de utilização |
| 1(h) | Instruções de utilização | Geradas a partir do registo de caso de uso, ficha de modelo e registo de utilização indevida | Limitações e orientação de supervisão, em linguagem clara |
| 2(a) | Métodos de desenvolvimento, sistemas pré-treinados, ferramentas de terceiros | Registo de treino; AIBOM | Por que estes foram escolhidos |
| 2(b) | Especificações de design, escolhas-chave, fundamentação, compromissos | Registo de design; registo de decisões | A fundamentação e pressupostos |
| 2(c) | Arquitetura e recursos computacionais | Registo de treino (computação); diagrama de arquitetura | Nenhum além da revisão |
| 2(d) | Fichas de dados: dados de treino, proveniência, seleção, rotulagem, limpeza | Registos de admissão; fichas de dados; linhagem | Os pressupostos sobre o que os dados medem |
| 2(e) | Avaliação das medidas de supervisão humana | Design de supervisão; resultados de testes com humano no ciclo | A avaliação |
| 2(f) | Alterações pré-determinadas e como a conformidade é mantida | Envelope como código | A justificação do envelope |
| 2(g) | Validação e testes: dados, métricas, impactos discriminatórios, relatórios de testes datados e assinados | Plano de testes; resultados de avaliação; relatórios de testes | Assinaturas das pessoas responsáveis |
| 2(h) | Medidas de cibersegurança | Resultados de testes de segurança; [modelo de ameaça](/patterns/ai-threat-model); [registos de assinatura](/patterns/model-artefact-integrity) | Risco de segurança residual |
| 3 | Capacidades, limitações, precisão para grupos específicos, resultados indesejados razoavelmente previsíveis | Ficha de modelo; avaliações de subgrupo; registo de utilização indevida | Interpretação dos limites |
| 4 | Por que as métricas de desempenho são apropriadas | Plano de testes | O argumento |
| 5 | O sistema de gestão de riscos | Registo de riscos | Julgamento de risco residual |
| 6 | Alterações relevantes ao longo do ciclo de vida | Controlo de versão; histórico do registo | Nenhum além da revisão |
| 7 | Normas harmonizadas aplicadas, ou outras soluções utilizadas | Ficheiro de correspondência | Descrição das soluções (nenhuma norma citada no JO na última verificação) |
| 8 | Uma cópia da declaração de conformidade da UE | Gerada a partir da evidência | Assinatura |
| 9 | O sistema de acompanhamento pós-comercialização, com o seu plano | Configuração de acompanhamento | Os acionadores e respostas do plano |

O plano de acompanhamento pós-comercialização faz parte deste ficheiro, não um documento separado
(Art. 72(3)) [43]. Construa o ficheiro da forma como o código é construído: uma tarefa de
documentação monta-o em cada candidato a lançamento, falha quando uma linha gerada está
desatualizada ou uma linha escrita é mais antiga que a versão do modelo que descreve, e emite o
resultado como [**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal)
juntamente com uma renderização legível por humanos.

### ### Fichas de modelo, fichas de sistema e fichas de dados

Os documentos sobrepõem-se e respondem a perguntas diferentes para leitores diferentes.

| Documento | Descreve | Leitor principal | Preenchido a partir de |
|---|---|---|---|
| Ficha de modelo | Um modelo treinado: utilização prevista, avaliação em grupos e condições, limitações [44] | Integradores, responsáveis pela implantação, auditores | Resultados de avaliação; AIBOM |
| Ficha de sistema | O sistema implantado: modelos, prompts, recuperação, ferramentas, guardrails e supervisão | Responsáveis pela implantação, autoridades, o público | Registo; configuração de guardrail; resultados de testes adversários |
| Ficha de dados (ficha de dados) | Um conjunto de dados: motivação, composição, recolha, pré-processamento, utilizações, distribuição, manutenção [25] | Proprietários de dados, construtores de modelos, auditores | Registo de admissão; linhagem |
| Instruções de utilização | O que um responsável pela implantação precisa para utilizar corretamente um sistema de risco elevado (Art. 13) [14] | Responsáveis pela implantação | Registo de caso de uso; ficha de modelo; registo de utilização indevida |
| Ficheiro técnico | Tudo o acima mencionado mais gestão de riscos, normas, declaração e plano de acompanhamento [9] | Autoridades; organismos notificados | Tudo o acima mencionado |

A maioria do risco situa-se no sistema, não no modelo bruto
([capítulo 01](/bok/definition#the-object-of-governance)), portanto uma ficha de modelo sozinha
sub-descreve qualquer coisa com ferramentas ou recuperação. Gere cada ficha a partir dos mesmos
registos, como no padrão
[**Model Card as Control Evidence**](/patterns/model-card-as-control-evidence), de modo que a ficha
que um auditor lê é a ficha que a produção produziu.

### ### O lado do prestador de GPAI

Um prestador de um modelo de IA de finalidade geral tem o seu próprio conjunto de documentação nos
termos do Art. 53: documentação técnica por Anexo XI para o Serviço para a IA e autoridades
nacionais, informações por Anexo XII para prestadores a jusante, uma política de direitos de autor,
e um resumo público do conteúdo de treino no modelo do Serviço para a IA [20]. O Anexo XI cobre
arquitetura e contagem de parâmetros, metodologia de treino, os dados de treino (tipo, proveniência,
curadoria, métodos para detetar fontes inadequadas e enviesamentos), a computação e o consumo de
energia conhecido ou estimado; para modelos com risco sistémico adiciona estratégias de avaliação,
testes adversários e arquitetura de sistema [12].

Quem é um prestador de GPAI é em parte uma questão de computação. O critério indicativo da Comissão
é computação de treino acima de 10^23 FLOP com a capacidade de gerar linguagem, texto para imagem ou
texto para vídeo; um modificador a jusante é indicativamente o prestador do modelo modificado quando
a sua computação de modificação excede um terço do original; e a presunção de risco sistémico começa
em 10^25 FLOP, com notificação à Comissão dentro de duas semanas [11]. Coloque estes limiares no
registo de seleção de modelo da revisão de design, porque um plano de ajuste fino pode alterar o
papel legal da organização.

Três instrumentos da Comissão transformam os deveres em artefatos. O Código de Prática de GPAI (10
Jul 2025, voluntário) inclui, no seu capítulo de Transparência, um Formulário de Documentação de
Modelo [45] que reúne as informações do Anexo XI e XII num único local e marca cada item para
prestadores a jusante, o Serviço para a IA ou autoridades nacionais; o Código pede que a
documentação de cada versão seja mantida durante 10 anos [46]. O resumo do conteúdo de treino
utiliza um modelo que é obrigatório nos termos do Art. 53(1)(d): cobre informações gerais, fontes de
dados (incluindo dados públicos, privados, recolhidos, de utilizadores e sintéticos) e processamento
de dados, lista os 10% principais de domínios recolhidos (5% ou 1.000, o que for menor, para PME), é
atualizado a cada seis meses ou mais cedo após uma atualização material, e deve existir até 2 Ago
2027 para modelos colocados no mercado antes de 2 Ago 2025 [28]. Para modelos de risco sistémico, o
capítulo de Segurança e Proteção do Código adiciona um Relatório de Modelo de Segurança e Proteção,
criado antes do modelo ser colocado no mercado e mantido atualizado (Compromisso 7) [46]. Implicação
de engenharia: o Formulário de Documentação de Modelo é gerado a partir do registo de treino e do
AIBOM, e o resumo do conteúdo de treino, incluindo a sua lista de domínios, é uma consulta sobre os
registos de admissão e os registos de rastreamento, não um exercício de redação.

### ### Decisões de lançamento de peso aberto

O lançamento é um gradiente, não um interruptor. Solaiman descreve seis níveis de acesso: totalmente
fechado, acesso gradual ou faseado, acesso alojado, acesso em nuvem ou API, acesso transferível e
totalmente aberto [47]. O lançamento faseado, tal como praticado para o GPT-2 em 2019, deixa tempo
entre lançamentos para análise de risco e benefício à medida que a capacidade cresce [48]. Para
pesos abertos, a decisão é irreversível de forma que nada mais neste capítulo é: um modelo lançado
não pode ser recuperado, corrigido ou colocado atrás de um kill switch. O registo de lançamento
deve, portanto, incluir a capacidade e as avaliações de duplo uso, o registo de utilização indevida,
a resposta a "o que faríamos se isto fosse utilizado indevidamente, dado que não podemos
retirá-lo?", e a escolha de licença. A definição da Open Source Initiative exige as liberdades de
utilizar, estudar, modificar e partilhar, e trata informações de dados, código e parâmetros como a
forma preferida para modificação [49]; uma licença que restringe campos de utilização, portanto, não
a satisfaz.

As isenções legais para código aberto são mais estreitas do que parecem.

- O Regulamento da IA não se aplica a sistemas de IA lançados sob licenças livres e de código
  aberto, a menos que sejam colocados no mercado ou colocados em serviço como sistemas de risco
  elevado, como práticas proibidas ou como sistemas do Art. 50 (Art. 2(12)) [37].
- Um modelo GPAI sob uma licença livre e de código aberto com parâmetros públicos está isento apenas
  dos deveres de documentação do Anexo XI e Anexo XII; a política de direitos de autor e o resumo do
  conteúdo de treino ainda se aplicam, e nenhuma isenção se aplica a modelos com risco sistémico
  (Art. 53(2)) [20][11].
- As orientações da Comissão tratam a monetização como desqualificante: licenciamento duplo
  (gratuito para uso académico, pago para uso comercial), suporte pago que é necessário para
  utilizar o modelo, e processamento de dados do utilizador para ganho comercial são dados como
  exemplos [50].

### Manutenção de registos

Para sistemas de risco elevado, o prestador mantém a documentação técnica, a documentação do sistema
de gestão da qualidade, as alterações aprovadas pelos organismos notificados, as suas decisões e a
declaração de conformidade da UE à disposição das autoridades nacionais durante 10 anos após a
colocação no mercado (Art. 18), e mantém os registos que o sistema gera automaticamente, quando
estão sob o seu controlo, durante um período apropriado à finalidade prevista de pelo menos seis
meses, a menos que outra lei disponha de forma diferente; as instituições financeiras mantêm-nos
dentro da sua documentação de serviços financeiros (Art. 19) [51]. Os responsáveis pela implantação
têm um dever de registo paralelo, abrangido no
[capítulo 15](/bok/governing-deployment#records-retention).

Trate a retenção como código: cada classe de evidência tem uma regra de retenção associada à sua
obrigação, os registos assinados vão para armazenamento de escrita única, uma suspensão legal
substitui a eliminação, e o piso de registo de seis meses é um piso, não um padrão, reconciliado com
a limitação de armazenamento do RGPD para dados pessoais nos registos. Um horizonte de 10 anos
sobrevive à maioria das ferramentas, o que argumenta a favor de formatos abertos (JSON, `OSCAL`).

### Divulgações públicas

Públicos diferentes são devidos divulgações diferentes, e cada um tem algo que não deve ser
publicado.

| Público | O que recebem | Canal | O que reter |
|---|---|---|---|
| Autoridade ou organismo notificado | O ficheiro técnico completo, registos de teste, acesso a conjuntos de dados sob o Anexo VII | Sob pedido; avaliação de conformidade | Nada que a lei exija; marque segredos comerciais como confidenciais |
| Responsável pela implantação | Instruções de utilização (Art. 13); fichas de modelo e sistema; informações do Anexo XII para GPAI | Contrato; portal de documentação | Detalhe de segurança explorável; pesos |
| Pessoas afetadas | Que a IA é utilizada, e como contestar ou procurar explicação (ver [capítulo 15](/bok/governing-deployment#external-communications)) | Interface do produto; avisos | Nada sobre o seu próprio caso que um direito lhes dê direito |
| O público | Entrada na base de dados da UE; resumo do conteúdo de treino GPAI; documentação AB 2013; resumos de auditoria de enviesamento; avaliações de impacto publicadas | Website; registos públicos | Detalhe de exploração de equipa vermelha; dados pessoais; configuração de segurança |

Duas divulgações fora da UE mostram o padrão. A Lei Local 144 de Nova Iorque exige que os
empregadores que utilizam uma ferramenta de decisão de emprego automatizada realizem uma auditoria
de enviesamento por um auditor independente dos últimos 12 meses, publiquem um resumo dos seus
resultados, incluindo a fonte dos dados utilizados, e notifiquem os candidatos 10 dias úteis antes
da utilização [52]. A Diretiva do Canadá sobre Decisões Automatizadas exige que as instituições
federais publiquem os resultados finais da sua avaliação de impacto algorítmico no Portal do Governo
Aberto antes do sistema entrar em produção [53].

> **Na prática (ilustrativo)**
> Um prestador que preparava um sistema do Anexo III para a data de 2 de dezembro de 2027 listou os
> 23 itens do Anexo IV num ficheiro, uma linha cada, com a fonte do pipeline e um autor nomeado. A
> maioria das linhas acabou por ser montada a partir de registos que o pipeline já tinha emitido; o
> resto era fundamentação, julgamentos de risco residual e assinaturas. O trabalho de documentação
> foi executado em cada candidato a lançamento e falhou duas vezes no seu primeiro mês: uma vez numa
> ficha de modelo mais antiga do que o modelo, uma vez num relatório de teste que ninguém tinha
> assinado. Ambas as falhas teriam surgido um ano depois, perante um organismo notificado.

## Avaliações de impacto comparadas

Um único sistema pode desencadear várias avaliações de impacto em simultâneo. Sobrepõem-se em factos
(quem é afetado, o que pode correr mal, que controlos existem) e diferem em lei, desencadeador,
revisor e público. A resposta de engenharia é uma base de factos partilhada com várias vistas, não
cinco documentos que se afastam.

| Avaliação | Realizado por | Desencadeador | Quando | Revisto ou assinado por | Publicado | Reavaliado quando |
|---|---|---|---|---|---|---|
| Avaliação de impacto do sistema de IA (ISO/IEC 42005) | A organização que desenvolve ou fornece o sistema | Política organizacional; ISO/IEC 42001 A.5 | Ao longo do ciclo de vida, desde a conceção [54] | De acordo com o sistema de gestão de IA da organização | Voluntário | Atualizado conforme necessário ao longo do ciclo de vida [54] |
| AIPD (RGPD Art. 35) | O responsável pelo tratamento | Processamento suscetível de resultar em risco elevado; casos obrigatórios no Art. 35(3) | Antes do processamento [16] | Responsável pelo tratamento, com o parecer do EPD; a autoridade de supervisão se o risco elevado persistir (Art. 36) | Não obrigatório | Quando o risco do processamento muda (Art. 35(11)) [16] |
| FRIA (Regulamento da IA Art. 27) | Responsáveis pela implantação que são entidades públicas ou prestam serviços públicos, e responsáveis pela implantação de sistemas do Anexo III 5(b) e (c) | Implantação de um sistema de risco elevado do Anexo III (não ponto 2) | Antes da primeira utilização [55] | Resultados notificados à autoridade de fiscalização do mercado | Não obrigatoriamente público | Quando qualquer elemento avaliado muda [55] |
| Avaliação de impacto algorítmico (Canadá) | Instituição federal | Sistema de decisão automatizada sob a Diretiva | Antes da produção [53] | Aprovado internamente; revisão de especialista por nível de impacto | Sim, Portal do Governo Aberto | Num calendário, e quando a funcionalidade ou âmbito muda [53] |
| Auditoria de enviesamento (Lei Local 144 de NYC) | Auditor independente, para o empregador ou agência | Utilização de uma ferramenta de decisão de emprego automatizada em NYC | Dentro de um ano antes da utilização [52] | Auditor independente | Sim, resumo dos resultados | Todos os anos [52] |
| Validação de modelo independente (SR 26-2, SS1/23) | Função de validação independente do desenvolvimento | Utilização de modelo num banco supervisionado | Geralmente antes da primeira utilização [7] | Validadores com capacidade de efetuar mudança | Não | Periodicamente, e em mudança material [7] |

### Dimensões que tornam os impactos comparáveis

Classifique cada impacto nos mesmos eixos, qualquer que seja a avaliação que alimenta:
**severidade** (quão má para a pessoa afetada), **escala** (quantas pessoas), **reversibilidade**
(se o dano pode ser desfeito, e com que rapidez), **duração** e **probabilidade**. As dimensões não
são inventadas aqui. A Diretiva do Canadá define os seus níveis de impacto por elas, do nível I,
onde os impactos são suscetíveis de ser "pouco ou nenhum, facilmente reversíveis e breves", ao nível
IV, onde são suscetíveis de ser "muito elevados, irreversíveis e perpétuos" [53]. A FRIA pede as
categorias afetadas, os riscos específicos de dano, as medidas de supervisão e os arranjos de
mitigação e reclamação (Art. 27(1)) [55]; a AIPD pede o processamento, a sua necessidade e
proporcionalidade, os riscos e as medidas (Art. 35(7)) [16]. Um registo com estes campos responde a
ambos, e o Art. 27(4) permite que uma FRIA se baseie numa AIPD que cubra o mesmo terreno [55].

### Realização versus revisão

O executor é dono dos factos; o revisor desafia-os. Um revisor que não escreveu a avaliação verifica
seis coisas: o âmbito corresponde ao registo de caso de utilização atual; os grupos afetados incluem
pessoas que nunca utilizam o sistema; cada classificação de risco cita evidência (um id de
avaliação, um relatório de teste, um perfil de dados), não uma opinião; cada mitigação liga a um
controlo que funciona; o risco residual é aceite por alguém com autoridade para o aceitar; e os
desencadeadores de reavaliação são escritos como condições que um pipeline pode avaliar. Uma
avaliação que falha em qualquer uma das seis volta atrás, por bem escrita que seja.

### Desencadeadores de reavaliação

Codifique os desencadeadores para que o registo, não um lembrete de calendário, reabra a avaliação:
uma finalidade prevista nova ou alargada; retreino numa nova fonte de dados; uma população afetada,
idioma ou jurisdição novos; uma mudança de limiar; um incidente ou quase incidente
([capítulo 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite)); um sinal de
monitorização fora da sua banda; lei ou orientação nova; e uma data de revisão agendada. O padrão
[**FRIA-as-Code**](/patterns/fria-as-code#re-assessment-triggers-as-code) já faz isto para a FRIA e
a sua referência cruzada AIPD; a mesma estrutura generaliza, como Impact-Assessment-as-Code, para
cada avaliação na tabela.

> **Na prática (ilustrativo)**
> O modelo de limite de crédito do exemplo de caso de utilização estava sob quatro avaliações em
> simultâneo: uma AIPD (o banco como responsável pelo tratamento), uma FRIA (o banco como
> responsável pela implantação de um sistema do Anexo III 5(b)), uma avaliação de impacto executada
> pela equipa ao longo das linhas ISO/IEC 42005, e validação independente. A equipa manteve uma base
> de factos (grupos afetados, danos classificados nas cinco dimensões, controlos com os seus ids de
> avaliação) e renderizou quatro vistas a partir dela. Quando o retreino adicionou uma nova fonte de
> dados, a mudança de linhagem acionou o desencadeador para todos os quatro numa execução de
> pipeline, e os revisores viram um diff em vez de quatro documentos novos.

**Correspondências:** Regulamento da IA da UE Art. 3(12), 3(13) e 3(23), Art. 9, 10, 11 e Anexo IV,
Art. 13, 17, 18, 19, 25, 27, 43 e Anexos VI e VII, Art. 47 a 49, Art. 53 e Anexos XI e XII, Art. 72
· RGPD Art. 35 · ISO/IEC 42001 (A.5, A.6, A.7), ISO/IEC 42005, ISO/IEC 5338, ISO/IEC 5259 · NIST AI
RMF (Map, Measure) · Layer 01 Govern-as-Code a Layer 05 Assurance & Continuous Compliance. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## O que pode fazer esta semana

1. Escreve o registo de caso de utilização para o sistema de maior risco que tens em
   desenvolvimento, incluindo os seus usos fora do âmbito e o seu apetite por falsos positivos
   versus falsos negativos, e armazena-o na entrada do registo.
1. Congela o plano de teste para o seu próximo lançamento no repositório: métricas, limiares,
   subgrupos, execuções repetidas e o tamanho da amostra que cada limiar necessita para ser
   distinguível de uma falha.
1. Escolhe um conjunto de dados de treino e preenche o seu registo de admissão (base ou licença,
   verificação de reserva, proveniência, proprietário, gestor), depois faz com que a tarefa de
   treino recuse conjuntos de dados sem um.
1. Mapeia a tua documentação atual para a tabela do Anexo IV acima e marca cada linha gerada,
   escrita ou em falta.
1. Lista todas as avaliações de impacto que o sistema desencadeia e move os seus factos partilhados
   para um registo, com os gatilhos de reavaliação escritos como condições.

## Sources

[1] ISO/IEC 5338:2023, AI system life cycle processes. ISO/IEC. 2023. https://www.iso.org/standard/81118.html (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (Annex A.5 impact assessment, A.6 AI system life cycle, A.7 data for AI systems). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] AI Risk Management Framework 1.0 (NIST AI 100-1; MAP 1.1 intended purposes and context documented, MAP 1.5 risk tolerances, MAP 1.6 system requirements, MEASURE 2.1 test sets and metrics documented, MEASURE 2.5 validity and reliability). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system: design control and design verification; examination, test and validation procedures before, during and after development; data management). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[6] Rules of Machine Learning: Best Practices for ML Engineering (Rule #1: "Don't be afraid to launch a product without machine learning"). Google for Developers. n.d. (accessed 2026-09-24). https://developers.google.com/machine-learning/guides/rules-of-ml (verified: primary)
[7] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; generative and agentic AI models out of scope; effective challenge; conceptual soundness, ongoing monitoring, outcomes analysis; model use beyond intended purpose). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (responsibilities along the AI value chain; 25(1)(c) a third party that modifies the intended purpose of a system so that it becomes high-risk is considered its provider). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 11 and Annex IV (technical documentation: 1(a) to (h) general description incl. instructions for use; 2(a) to (h) development process, design choices and trade-offs, compute, datasheets and provenance, oversight, pre-determined changes, validation and testing with dated and signed reports, cybersecurity; 3 to 9 capabilities and limitations, metrics, risk management, changes, standards, declaration, post-market monitoring). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_IV (verified: primary)
[10] Stop explaining black box machine learning models for high stakes decisions and use interpretable models instead (Cynthia Rudin). Nature Machine Intelligence. 2019. https://www.nature.com/articles/s42256-019-0048-x (verified: primary)
[11] General-Purpose AI Models in the AI Act: Questions & Answers (indicative GPAI criterion: training compute above 10^23 FLOP and generation of language, text-to-image or text-to-video; a downstream modifier is indicatively the provider when modification compute exceeds a third of the original's; 10^25 FLOP systemic-risk threshold; notification within two weeks; Art. 53(2) open-source conditions). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/faqs/general-purpose-ai-models-ai-act-questions-answers (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annexes XI and XII (GPAI technical documentation: architecture and parameters, training methodology, training data provenance and curation, compute, known or estimated energy consumption; Section 2 for systemic-risk models: evaluation strategies, adversarial testing, system architecture; Annex XII information for downstream providers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[13] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2)(b) risks under reasonably foreseeable misuse; 9(8) testing against prior defined metrics and probabilistic thresholds, before placing on the market). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and instructions for use; 13(3)(b)(iii) known or foreseeable circumstances, incl. reasonably foreseeable misuse, that may lead to risks). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[15] Ethics Guidelines for Trustworthy AI (High-Level Expert Group on AI; oversight through human-in-the-loop, human-on-the-loop and human-in-command approaches). European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[16] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing; Art. 35 data protection impact assessment (35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes); Art. 36 prior consultation. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a replaces the deleted Art. 10(5) for special-category data in bias detection; simplified technical documentation for SMEs and small mid-caps under Art. 11(1); Annex VIII Section B points 7 and 9 deleted for Art. 6(3) registrations; Art. 43(3) sectoral notified bodies to apply for designation by 28 Jan 2028; Art. 60 scope (Annex III and Annex I Section A) and new Art. 60a (Annex I Section B)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[18] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity of models; legitimate interest; consequences of unlawful processing in development). European Data Protection Board. 2024-12. https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en (verified: primary)
[19] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI provider obligations: (a) Annex XI documentation, (b) Annex XII information for downstream providers, (c) copyright policy incl. reservations of rights, (d) public summary of training content on the AI Office template; 53(2) open-source exemption from (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[21] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance: 10(2) practices, 10(3) relevant, sufficiently representative, free of errors and complete, 10(4) specific setting of use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[22] ISO/IEC 5259 series, Data quality for analytics and machine learning (ML): Part 1 overview, terminology and examples (2024); Part 2 data quality measures (2024); Part 3 data quality management requirements and guidelines (2024); Part 4 data quality process framework (2024); Part 5 data quality governance framework (2025). ISO/IEC. 2024–2025. https://www.iso.org/standard/81088.html (verified: primary)
[23] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[24] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs, with facets). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[25] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[26] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[27] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[28] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data; top 10% of scraped domains, for SMEs 5% or 1,000; six-monthly update). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[29] ISO/IEC TR 29119-11:2020, Software testing, Part 11: Guidelines on the testing of AI-based systems. ISO/IEC. 2020. https://www.iso.org/standard/79016.html (verified: primary)
[30] ISO/IEC TR 24029-1:2021 and ISO/IEC 24029-2:2023, Robustness of neural networks (Part 1 overview; Part 2 methodology for the use of formal methods). ISO/IEC. 2021–2023. https://www.iso.org/standard/79804.html (verified: primary)
[31] Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations (Evan Miller; arXiv 2411.00640). arXiv. 2024-11-01. https://arxiv.org/abs/2411.00640 (verified: primary)
[32] Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena (Zheng et al.; position, verbosity and self-enhancement biases; over 80% agreement with human preferences; arXiv 2306.05685). arXiv. 2023-06-09. https://arxiv.org/abs/2306.05685 (verified: primary)
[33] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[34] SS1/23, Model risk management principles for banks (five principles incl. independent model validation; UK-incorporated banks, building societies and PRA-designated investment firms with internal-model approval; addresses AI and machine-learning techniques; first published 17 May 2023, in effect from 17 May 2024; current version published and effective 23 Apr 2026 after low-impact amendments). Bank of England, Prudential Regulation Authority. 2026-04-23. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[35] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[36] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[37] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 2 (2(8) research, testing and development before placing on the market excluded, except testing in real-world conditions; 2(12) systems under free and open-source licences excluded unless high-risk, Art. 5 or Art. 50). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_2 (verified: primary)
[38] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 43 and Annexes VI and VII (internal control for Annex III points 2 to 8; Annex VI or VII for point 1 where harmonised standards or common specifications are applied, Annex VII otherwise; Annex I products under sectoral procedures; 43(4) new assessment on substantial modification, pre-determined changes excepted; Annex VII notified-body access to training, validation and testing data and control of changes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_43 (verified: primary)
[40] CEN-CENELEC JTC 21 standards tracker (no AI Act harmonised standard cited in the Official Journal, so no Art. 40 presumption of conformity; tracker updated 29 Jun 2026; the book's regulatory map rechecked on 2026-09-19). CEN-CENELEC JTC 21 (via kla.digital). 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[41] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 47 and 48 (EU declaration of conformity per Annex V, kept for 10 years; CE marking affixed visibly, legibly and indelibly, digital marking for digitally provided systems, notified-body number where applicable). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_47 (verified: primary)
[42] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 49 (registration in the EU database before placing on the market; Annex III point 2 at national level; Art. 6(3) systems; public-authority deployers; non-public section for law enforcement, migration, asylum and border control). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_49 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 72 (post-market monitoring system; 72(3) the monitoring plan is part of the Annex IV technical documentation; as amended by Reg. (EU) 2026/1744, Commission guidance including a template by 2 Sep 2027). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_72 (verified: primary)
[44] Model Cards for Model Reporting (Mitchell et al.; arXiv 1810.03993). arXiv. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[45] The General-Purpose AI Code of Practice (published 10 Jul 2025; voluntary; Transparency chapter with a Model Documentation Form; Safety and Security chapter for systemic-risk models). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[46] EU AI Act: General-Purpose AI Code of Practice, final version (unofficial reader: Model Documentation Form marks items for downstream providers, AI Office or national authorities; documentation kept 10 years per version; Safety and Security chapter Commitment 7, a Safety and Security Model Report before placing a model on the market). code-of-practice.ai (Alexander Zacherl). 2025. https://code-of-practice.ai/ (verified: secondary)
[47] The Gradient of Generative AI Release: Methods and Considerations (Irene Solaiman; six levels of access from fully closed to fully open; arXiv 2302.04844). arXiv. 2023-02-05. https://arxiv.org/abs/2302.04844 (verified: primary)
[48] Release Strategies and the Social Impacts of Language Models (Solaiman et al.; GPT-2 staged release; arXiv 1908.09203). arXiv. 2019-08-24. https://arxiv.org/abs/1908.09203 (verified: primary)
[49] The Open Source AI Definition 1.0 (freedoms to use, study, modify and share; preferred form for modification covers data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[50] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; section 4.2.2, paras 82 to 84: monetisation defeats the open-source exceptions, e.g. dual licensing free for academic and paid for commercial use, paid support or services required to access or use the model, and processing of personal data other than strictly for model security). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 18 and 19 (provider keeps technical documentation, QMS documentation, notified-body decisions and the EU declaration for 10 years; automatically generated logs kept at least six months unless other law provides otherwise; financial institutions keep logs within financial-services documentation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[52] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; public summary incl. data source; notice 10 business days before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[53] Directive on Automated Decision-Making (6.1 algorithmic impact assessment completed, approved and published on the Open Government Portal before production, updated on a schedule and when functionality or scope changes; 6.3.7 expert review; Appendix B impact levels defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[54] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[55] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c), except point 2 systems; elements (a) to (f); results notified to the market surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
