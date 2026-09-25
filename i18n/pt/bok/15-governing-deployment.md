---
lang: pt
source: bok/15-governing-deployment.md
sourceHash: "b36107eafc969f54fd80c6d9a7b9b07bfd81efb8a8843db6acb8ab5a87c7cd53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 15. Governar a implantação e a utilização

> Governar a execução: como um responsável pela implantação decide utilizar um sistema de IA, o
> escolhe, contrata para o efeito, o coloca em funcionamento, o opera e o retira, deixando em cada
> passo evidência de que um controlo foi acionado.

A maioria das organizações implanta muito mais IA do que constrói. Os deveres de conceção de um
prestador são em grande medida cumpridos quando o sistema é colocado no mercado; os deveres de um
responsável pela implantação começam quando o sistema é colocado em serviço, e prolongam-se enquanto
este funcionar: utilizá-lo conforme instruído, dotar a sua supervisão de pessoal, monitorizá-lo,
suspender a sua utilização quando apresenta um risco, manter os seus registos e informar as pessoas
da sua existência [1]. O capítulo 18 lista os
[deveres do responsável pela implantação do Artigo 26](/bok/eu-ai-act#deployer-duties-article-26) um
a um, e o capítulo 17 aborda o lado dos incidentes desses deveres
([deveres do responsável pela implantação: informar o prestador, suspender a utilização](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)).
Este capítulo segue um sistema desde a decisão de o utilizar até ao dia em que é desligado. Em cada
passo nomeia a decisão, o artefato que a regista, a camada do stack que produz a evidência e o
registo que vai para o arquivo de garantia.

Dois termos percorrem o capítulo. Um **responsável pela implantação** é qualquer pessoa que utilize
um sistema de IA sob a sua autoridade, exceto numa atividade pessoal não profissional; um
**prestador** desenvolve um sistema ou modelo, ou o faz desenvolver, e coloca-o no mercado ou o
coloca em serviço sob o seu próprio nome ou marca comercial [2]. Os rótulos descrevem tarefas, não
tipos de organização: um banco que ajusta um modelo de um fornecedor e envia o resultado sob a sua
própria marca pode ter ambas as funções para o mesmo sistema (ver
[Quando um responsável pela implantação se torna um prestador](#when-a-deployer-becomes-a-provider)).
O capítulo 14 aborda o lado da construção; este capítulo aborda o lado da execução. As referências
aos artigos são ao Regulamento da IA da UE conforme alterado pelo Omnibus Digital, a partir de
2026-09-24, cujas regras de risco elevado se aplicam aos sistemas do Anexo III a partir de 2 de
dezembro de 2027 [3]; são mapeamentos ilustrativos, não uma afirmação de conformidade.

Governar a implantação não é engenharia de lançamento. MLOps questiona se uma nova versão pode ser
lançada e revertida. A engenharia de governação da IA questiona quem decidiu que o sistema pode
servir, com que evidência, qual o sinal que o reverte sem uma reunião, e que registo prova que cada
um desses acontecimentos ocorreu.

## O ciclo de vida da implantação num relance

| Fase | A decisão | Artefato | Camada | Registo de evidência |
|---|---|---|---|---|
| Decidir | Deve a IA fazer isto, e exatamente o quê? | Registo de Decisão de Implantação | 1 · 2 | Registo assinado ligado à entrada do registo |
| Escolher | Qual modelo, alojado onde, adaptado como? | Registo de seleção de modelo | 3 · 2 | Resultados de avaliação de tarefa por candidato |
| Contrato | Em que termos? | Revisão de contrato e licença | 1 · 5 | Lista de verificação de cláusulas; campos de licença AIBOM |
| Colocar em funcionamento | Aprovar, aprovar com condições ou rejeitar? | Decisão de colocação em funcionamento com discordância | 1 · 5 | Registo de decisão; condições como política |
| Lançar | Quanto de exposição, e o que a reverte? | [Plano de lançamento com critérios de reversão](/patterns/staged-rollout-rollback-criteria) | 4 | Resultados de porta de fase; eventos de reversão |
| Operação | Continua adequado, justo e vale a pena? | [Plano de monitorização](/patterns/drift-fairness-monitor); calendário de manutenção | 4 · 5 | Telemetria de desvio, equidade, custo e energia |
| Garantir | Os controlos ainda funcionam? | Programa de auditoria, teste de equipa vermelha e modelo de ameaça | 3 · 5 | Constatações rastreadas até ao encerramento |
| Comunicar | Quem deve ouvir o quê, e quando? | [Plano de comunicações e modelos](/patterns/disclosure-notification-pipeline) | 5 | Avisos enviados, com marcas de tempo |
| Desativação | Degradar, localizar ou desligar? | [Runbook de desativação e reforma](/patterns/deactivation-localisation-retirement-runbook) | 4 · 2 | Registo de decisão; snapshot de evidência final |

## A decisão de implantação

### Começa pelo caso de utilização, não pelo modelo

A decisão de implantar é uma decisão de produto com um registo de governação. Antes de qualquer
modelo ser comparado, escreve o objetivo comercial e como saberás que foi atingido, as pessoas em
que o sistema atuará, a decisão que informa ou toma, e se a IA é realmente a ferramenta certa: um
motor de regras, um formulário melhor ou um índice de pesquisa é por vezes a resposta honesta.

Depois nomeia o **espaço negativo**: para o que o sistema explicitamente não é. O espaço negativo é
o que mais tarde torna a expansão de função detetável, porque uma utilização que nunca foi aprovada
tem um lugar onde ser registada como fora do âmbito. A **finalidade prevista** do prestador (a
utilização para a qual concebeu e documentou o sistema, incluindo o contexto e as condições de
utilização [2]) é o limite exterior; o teu espaço negativo situa-se dentro dele.

Classifica a utilização na admissão, o fluxo de trabalho descrito no
[capítulo 06](/bok/the-role#intake-and-classification): nível de risco, exposição regulatória,
sensibilidade dos dados e autonomia. A classificação decide quais dos controlos neste capítulo se
aplicam. Uma utilização do Anexo III desencadeia os deveres do responsável pela implantação do
Artigo 26 [1] e, para organismos do setor público, entidades privadas que prestam serviços públicos,
e utilizações de pontuação de crédito e de preços de seguros de vida e saúde, a avaliação de impacto
sobre os direitos fundamentais do Artigo 27 (FRIA) antes da primeira utilização [4]. Um chatbot ou
um gerador de conteúdo sintético desencadeia os deveres de transparência do Artigo 50, que se
aplicam a partir de 2 de agosto de 2026 [5]; um sistema generativo já no mercado antes dessa data
tem até 2 de dezembro de 2026 para cumprir o dever de marcação do Artigo 50(2) (Artigo 111(4)) [8].
As práticas proibidas do Artigo 5 vinculam responsáveis pela implantação bem como prestadores,
incluindo a proibição de sistemas que exploram vulnerabilidades devido à idade, deficiência ou uma
situação social ou económica específica [6].

### Define requisitos de desempenho e explicabilidade primeiro

Os requisitos escritos após uma demonstração de um fornecedor são ajustados à demonstração.
Define-os antes de olhares para candidatos:

- **Métricas que correspondem ao dano.** Para um classificador de triagem, falsos negativos em casos
  urgentes; para um assistente generativo, fundamentação e recusa de pedidos fora do âmbito. Uma
  figura de precisão média raramente é a métrica que corresponde a um dano.
- **Pisos por grupo.** Um limiar por população em que o sistema atua, para que uma boa média não
  possa esconder um grupo em que o sistema falha.
- **Limiares de ir/não ir** que a revisão de colocação em funcionamento aplicará, cada um rastreado
  até ao modo de falha que representa, que é a disciplina estabelecida em
  [os limites da porta de avaliação](/bok/definition#the-limits-of-the-eval-gate).
- **A explicação que a utilização necessita.** Um código de razão para uma decisão adversa, uma
  fonte citada para uma resposta gerada, ou um modelo interpretável onde a decisão deve ser
  contestável. Quando uma decisão baseada no resultado da maioria dos sistemas do Anexo III tem
  efeitos legais ou similarmente significativos numa pessoa, essa pessoa tem direito a uma
  explicação clara e significativa do responsável pela implantação sobre o papel do sistema na
  decisão [7]. Conceber para essa resposta é mais barato do que adaptá-la posteriormente; o
  [capítulo 16](/bok/fairness-and-explainability#explanation-techniques) aborda os métodos.

### Verifica os dados e as pessoas

**Dados.** Existem os dados de entrada na cobertura e qualidade que a utilização necessita, com um
fornecimento que durará, e uma base legal para este fim? Quando o responsável pela implantação
controla os dados de entrada de um sistema de risco elevado, deve garantir que os dados são
relevantes e suficientemente representativos para a finalidade prevista [1].

**Pessoas.** A supervisão deve ser atribuída a pessoas com a competência, formação e autoridade
necessárias, e o apoio para a utilizar [1]. O Artigo 4, reformulado pelo Omnibus, pede aos
prestadores e responsáveis pela implantação que apoiem a literacia no domínio da IA do seu pessoal
[8]. Antes de um sistema de risco elevado ser utilizado no trabalho, um empregador-responsável pela
implantação deve informar os representantes dos trabalhadores e os trabalhadores afetados [1]. A
prontidão também significa a autoridade para fazer uma pausa: um operador que vê o sistema
comportar-se mal deve ser autorizado a detê-lo sem primeiro pedir permissão.

### O Registo de Decisão de Implantação

Reúne estas respostas num artefato, o **Registo de Decisão de Implantação (RDI)**, confirmado junto
ao código do sistema e referenciado a partir da sua entrada no registo (camada 02). Os seus pisos
tornam-se os limiares da porta de avaliação (camada 03); o seu espaço negativo torna-se o âmbito que
o tempo de execução vigia (camada 04). A página de modelos tem um JSON Schema para
[a decisão de implantação e o runbook de reforma](/resources/templates#schema-deployment-decision-record).
Um excerto ilustrativo:

```json
{ "ddr_id": "ddr-csa-01-v1", "system": "csa-01",
  "objective": "resolve tier-1 refund queries without an agent",
  "not_for": ["credit decisions", "complaints about staff"],
  "risk_tier": "limited", "obligations": ["EU AI Act Art. 50", "GDPR Art. 35"],
  "floors": { "groundedness": 0.95, "out_of_scope_refusal": 0.98 },
  "retire_if": ["deflection below business case for two quarters"],
  "owner": "team-support-platform", "decision": "proceed-to-selection" }
```

> **Na prática (ilustrativo)**
> Para `csa-01`, o assistente de atendimento ao cliente numa grande operadora de telecomunicações, o
> espaço negativo do RDI listava "reclamações sobre pessoal". Meses depois uma equipa propôs
> encaminhar consultas internas de RH para o mesmo assistente. O formulário de admissão verificou a
> proposta contra o registo, sinalizou-a como uma nova utilização e reenviou-a através da
> classificação em vez de uma alteração de configuração silenciosa. O registo não parou a ideia;
> tornou a mudança de finalidade visível e responsável.

## Escolher o modelo

### Avalia na tua tarefa, nos teus dados e nos teus utilizadores

Um benchmark público responde "como é que este modelo é bom nesse benchmark?". A questão do
responsável pela implantação é "como é que é bom na nossa tarefa, para os nossos utilizadores, sob
as nossas restrições?". Constrói uma **avaliação de seleção**: um conjunto de casos representativos
extraídos do tráfego que podes utilizar legalmente, etiquetados com a resposta que desejas,
estratificados pelos grupos e casos extremos que o RDI nomeia, e pontuados nas métricas que
correspondem ao dano. Torna-a suficientemente grande para mostrar a diferença por grupo que te
importa. Executa cada candidato através do mesmo arnês com as mesmas instruções, recuperação e
guardrails, e mantém os resultados: a avaliação de seleção torna-se a primeira versão da suite de
regressão atrás da [porta de avaliação](/patterns/eval-gate-in-ci).

### O que os benchmarks públicos e as tabelas de classificação não podem dizer-te

- **Contaminação.** Os itens de teste vazam para os dados de treino. Quando investigadores
  escreveram um conjunto novo de problemas de matemática do ensino básico correspondentes a um
  benchmark popular, várias famílias de modelos perderam até 8% em precisão, um sinal de sobreajuste
  ao conjunto público [9].
- **Divulgação seletiva.** Uma classificação reflete o que os prestadores escolhem submeter. Uma
  análise de uma tabela de classificação de estilo arena amplamente utilizada descobriu que alguns
  prestadores testaram muitas variantes privadas antes do lançamento e poderiam retratar pontuações
  se escolhessem [10].
- **Goodhart.** Uma vez que um benchmark tem importância comercial, os modelos são ajustados a ele.
  A pressão que torna um eval gate vulnerável a Goodhart aplica-se com mais força a um número
  público que não controlas.

Utiliza benchmarks para construir uma lista curta, nunca para tomar a decisão.

### Contabiliza o custo total, incluindo energia

O custo de um modelo é a taxa de licença ou API mais a computação de inferência, integração,
avaliação e monitorização, o custo de funcionamento do stack de governação à sua volta (ver
[o custo do stack](/bok/the-stack#the-cost-of-the-stack)) e o custo de saída. Energia e carbono
pertencem ao mesmo registo, e a escolha do modelo é onde a maioria deles é decidida. Um estudo mediu
arquiteturas generativas multiusos como ordens de magnitude mais caras por inferência do que
sistemas específicos de tarefas nas mesmas tarefas, mesmo controlando o tamanho do modelo [11]. O
limite de medição importa: um prestador colocou a mediana do prompt de texto do seu assistente em
0,24 Wh, contabilizando a capacidade inativa e a sobrecarga do centro de dados, bem como os
aceleradores [12]; uma figura que deixa estes de fora não é comparável. Ao nível de todo o setor, a
AIE projeta que o uso de eletricidade dos centros de dados mais do que duplicará para cerca de 945
TWh até 2030 [13]. O Regulamento da IA pede aos prestadores de GPAI que documentem o consumo de
energia conhecido ou estimado dos seus modelos [14]; nada nele mede a tua pegada de inferência,
portanto o responsável pela implantação tem de o fazer.

### Regista a escolha

O **registo de seleção de modelo** lista os candidatos, os resultados das evals de seleção, as
estimativas de custo e energia, as razões da escolha, as condições que a reabririam (uma mudança de
preço, uma nova versão do prestador, um limite violado em produção) e o plano de saída. É arquivado
contra a entrada do registo, portanto "porque este modelo?" é respondido por uma consulta um ano
depois, quando as pessoas que escolheram se foram embora.

## Tipos de modelo e opções de implantação

O tipo de modelo altera os modos de falha. A opção de alojamento altera quem pode ver e parar o quê.
A técnica de adaptação altera o que tens de re-testar e, por vezes, o teu papel legal. As tabelas
abaixo descrevem cada opção, e a matriz no final nomeia o controlo que cada combinação adiciona.
Trata tudo isto como ilustrativo, não como uma afirmação de conformidade: os controlos que uma
implantação real necessita resultam do seu nível de risco, das suas obrigações e dos seus modos de
falha.

### O tipo de modelo altera o conjunto de controlos

| Tipo de modelo | Modos de falha dominantes | Controlos que adiciona (camada) |
|---|---|---|
| **Preditivo clássico (classificador, pontuador, previsor)** | Má calibração; lacunas de erro entre grupos; desvio de entrada e rótulo; ciclos de retroalimentação onde a pontuação molda os dados de treino seguintes. | L3: Pisos de desempenho por grupo e uma eval de calibração nos teus dados rotulados; L4: Monitor de desvio em entradas e resultados (PSI, KS); L2: Ficha de modelo que indica a população em que o modelo foi validado |
| **Generativo (texto, código, media)** | Saída sem fundamento ou fabricada; conteúdo prejudicial ou infrator; injeção de prompts; fuga de dados pessoais ou confidenciais. | L3: Evals de fundamentação e red-team nos teus próprios prompts; L4: Guardrails de entrada e saída; divulgação e rotulagem de conteúdo sintético (Art. 50); L2: Prompts e system prompts versionados como configuração na entrada do registo |
| **Proprietário (API ou pesos licenciados)** | Mudança silenciosa de versão; bloqueio; dados de treino opacos; termos ou preços que mudam sob ti. | L1: Termos de contrato (sem treino em entradas, residência) aplicados como política; L2: Versão do modelo do prestador fixada na entrada do registo; L3: Evals de limite re-executadas em cada mudança de versão do prestador |
| **Pesos abertos** | Violação de licença ou uso aceitável; ficheiros de pesos adulterados ou maliciosos; vulnerabilidades não corrigidas que agora são tuas para corrigir. | L1: Verificação de licença e uso aceitável como porta de política; L2: Entrada AIBOM com origem, licença e hash de ficheiro; L3: Suite completa de eval e red-team tua; L4: Teus próprios guardrails: nenhuma camada de segurança do prestador fica à frente |
| **Pequeno (tamanho de tarefa, capaz de edge)** | Teto de capacidade; treino de recusa mais fraco; frágil fora da sua tarefa. | L3: Eval específica de tarefa que prova adequação para esta tarefa, não em geral; L4: Encaminha pedidos fora do âmbito para um fallback ou um humano |
| **Grande (finalidade geral, fronteira)** | Superfície de capacidade ampla; superfície de jailbreak ampla; sobrecustos; sobre-confiança dos utilizadores. | L1: Âmbito do caso de uso em política: o que o sistema não pode ser solicitado a fazer; L3: Red-team mais amplo nas capacidades que não necessitas; L4: Limites de taxa e limites de gastos por identidade |
| **Apenas linguagem** | Danos de texto; injeção através de documentos e conteúdo web que o modelo lê. | L3: Red-team de texto incluindo injeção indireta; L4: Guardrails de texto em entrada e saída |
| **Multimodal (imagem, áudio, vídeo)** | Media sintética e suplantação; instruções ocultas em imagens ou áudio; usos biométricos e de vigilância. | L1: Verificações de prática proibida (Art. 5) e uma política de uso biométrico; L3: Red-team multimodal; L4: Marcação legível por máquina de media gerada (Art. 50) |

A maior divisão é clássico contra generativo. Os modelos clássicos falham silenciosamente, através
de calibração, desvio e lacunas de erro de grupo; os modelos generativos falham ruidosamente,
através de conteúdo. Proprietário contra pesos abertos é principalmente uma questão de quem produz a
evidência: com uma API recolhes-a do prestador (ficha de modelo, AIBOM se oferecida, avisos de
mudança), com pesos abertos produzes quase toda ela tu mesmo (hashes, scans, evals, resultados de
red-team, registos de tempo de execução; ver
[IA de terceiros e procurada](/bok/the-stack#third-party-and-procured-ai)).

### Onde funciona

| Onde funciona | Modos de falha dominantes | Controlos que adiciona (camada) |
|---|---|---|
| **Cloud (serviço gerido ou API)** | Os dados saem do teu limite; indisponibilidade do prestador; inferência encaminhada para a região errada. | L1: Política de residência e classe de dados como código; L4: Aplicação de egresso e região no caminho de inferência; L5: Atestados do prestador e lista de sub-processadores recolhidos e datados |
| **No local (o teu centro de dados ou cloud privada)** | Tu próprio patching, capacidade e segurança física; atualizações atrasam. | L4: Segmentação de rede e controlo de acesso nos pesos; L2: AIBOM com hashes de ficheiro para cada artefato implantado; L5: Teus próprios registos à prova de adulteração |
| **Edge (dispositivo, veículo, filial)** | Adulteração; extração de pesos; versões obsoletas no campo; sem registo central. | L2: Artefatos de modelo assinados e um registo de versões de campo; L4: Arranque seguro, atestado de dispositivo, reversão remota e desativação remota; L5: Telemetria amostrada que chega ao armazenamento de evidência |
| **Híbrido (dividido por classe de dados ou carga)** | Lacunas de política no limite; dados sensíveis encaminhados para o nível errado; versões inconsistentes. | L1: Política de encaminhamento por classe de dados, avaliada em cada pedido; L2: Uma entrada de registo abrangendo cada nível e as suas versões |

### Como é adaptado

| Adaptação | Modos de falha dominantes | Controlos que adiciona (camada) | Efeito de papel |
|---|---|---|---|
| **Tal como está (apenas prompting)** | Modelo não ajustado à tua tarefa ou população; o prestador muda-o por baixo de ti. | L3: Validação contra os teus próprios limiares antes de go-live; L4: Guardrails compensadores para as lacunas que a validação encontrou; L2: System prompt versionado com a entrada do registo | Responsável pela implantação, a menos que o rebrandizes ou alteres a sua finalidade prevista (Art. 25(1)(a), (c)). |
| **Fine-tune** | Treino de segurança erodido; dados de tuning memorizados; novos enviesamentos. | L3: Trata o resultado como um novo sistema: eval completa e red-team novamente; L2: Ficha de dados para o conjunto de tuning; AIBOM liga modelo base e pesos ajustados; L1: Registo de computação verificado contra o critério de modificação GPAI | Pode ser uma modificação substancial de um sistema de alto risco (Art. 25(1)(b)) ou fazer-te o prestador de um modelo GPAI modificado. |
| **Geração aumentada por recuperação (RAG)** | Envenenamento de recuperação; corpus obsoleto ou sem licença; respostas que vazam documentos entre utilizadores. | L4: Controlo de acesso ao corpus que espelha as permissões do sistema de origem; L3: Eval de fundamentação contra um snapshot de corpus; L2: Proveniência do corpus e licença registadas no AIBOM | Normalmente deixa o papel inalterado. |
| **Destilação, quantização, adaptadores LoRA** | Regressão silenciosa de qualidade ou segurança; taxas de erro deslocadas entre grupos; proliferação de adaptadores. | L3: Re-executa a porta de eval e red-team no artefato comprimido; L2: Regista cada adaptador e construção quantizada como a sua própria versão | Destilar ou adaptar um modelo GPAI é uma modificação: verifica-a contra o critério de computação (verifica). |
| **Invólucro agêntico (ferramentas, ações)** | Uso indevido de ferramentas; sequestro de objetivo; abuso de privilégio; ações que em cascata. | L4: Identidade do agente, credenciais com âmbito, mediação de ferramentas e um kill switch testado; L2: Entrada de registo de agente com proprietário, âmbito e expiração; L4: Porta de human-in-the-loop em ações de alta consequência | Altera o risco mais do que o papel: autonomia é o multiplicador de risco. |

### A matriz de tipo de modelo por opção de implantação

Lê cada célula como o único controlo que a combinação adiciona no topo da sua linha e da sua coluna.

| Tipo de modelo | Cloud | No local | Edge | Fine-tune | RAG | Invólucro agêntico |
|---|---|---|---|---|---|---|
| **Preditivo clássico** | Verificação de residência em características; monitor de desvio de entrada | Possui o pipeline de retreino e a sua aprovação | Modelo assinado; telemetria de versão de campo; reversão remota | Retreino é uma versão: re-executa pisos por grupo | Não é típico; governa a linhagem da feature-store em vez disso | Pontuação dispara uma ação: porta humana em resultados adversos |
| **Generativo, linguagem** | Termos de sem-treino e retenção; guardrail de saída | Teus próprios guardrails, patching e medição de energia | Modelo pequeno; guardrails offline; atualizações assinadas | Red-team completo; eval de erosão de segurança | Eval de fundamentação; permissões de corpus; verificações de envenenamento | Identidade do agente, mediação de ferramentas, kill switch |
| **Generativo, multimodal** | Marcas de proveniência em saída; bloqueio de uso biométrico | Assinatura de conteúdo própria; regras de retenção de media | Avisos de câmara e microfone; minimização no dispositivo | Verificações de semelhança e consentimento em media de tuning | Testes de injeção multimodal em media recuperada | Ações de ecrã e voz atrás de uma porta humana |
| **Proprietário (API)** | Fixa a versão; evals de limite em cada mudança | Eletrodoméstico do prestador: atesta versão e caminho de atualização | SDK do prestador: limites de licença; revogação offline | Serviço de tuning do prestador: termos de dados; tua própria re-eval | Teu corpus, o seu modelo: termos de retenção e sem-treino | Concede ferramentas com âmbito; o agente do prestador obtém a sua própria identidade |
| **Pesos abertos** | Porta de licença; pesos verificados por hash em computação alugada | Tu próprio patching: AIBOM, scans de ficheiro, red-team | Pesos são extraíveis: termos de licença e [modelo de ameaça](/patterns/ai-threat-model) | Registo de computação contra o critério de um terço GPAI | Cada camada de evidência é tua para produzir | Teus próprios guardrails de ponta a ponta; nenhuma camada de segurança do prestador |

## Construir, comprar ou adaptar

### Três rotas, três encargos de evidência

| Rota | O que controlas | Evidência que produzes | Evidência que recolhes | Papel típico |
|---|---|---|---|---|
| **Comprar** (SaaS, API) | Integração, prompts, identidades, o tráfego que envias | Evals de limite; registos de tempo de execução do teu tráfego | Ficha de modelo, instruções de utilização, certificações, avisos de alteração | Responsável pela implantação |
| **Adaptar** (ajuste fino, RAG, wrapper agentico) | A adaptação e tudo o que a rodeia | Avaliações do sistema adaptado; ficha de dados de ajuste; registo de computação | Documentação e licença do modelo base | Responsável pela implantação; prestador se se aplicar um gatilho do Art. 25 ou o critério de modelo de finalidade geral |
| **Construir** (modelo próprio) | Tudo | Tudo | Licenças para dados e componentes de terceiros | Prestador e responsável pela implantação |

Quanto menos do modelo lhe pertence, mais do seu orçamento de controlo se desloca de o testar para o
limitar e evidenciar o fornecedor; quanto mais lhe pertence, mais da evidência é sua para produzir.

### Quando um responsável pela implantação se torna prestador

O artigo 25.º, n.º 1, torna um distribuidor, importador, responsável pela implantação ou outro
terceiro prestador de um sistema de IA de risco elevado, com as obrigações do prestador, quando
coloca o seu nome ou marca comercial num sistema de risco elevado já no mercado; faz uma modificação
substancial num sistema de risco elevado de modo que este permaneça de risco elevado; ou altera a
finalidade prevista de um sistema, incluindo um de finalidade geral, de modo que se torne de risco
elevado [15]. Uma **modificação substancial** é uma alteração não prevista na avaliação da
conformidade inicial do prestador que afeta a conformidade com os requisitos de risco elevado ou
altera a finalidade prevista [2]. O prestador inicial deixa então de ser o prestador desse sistema
mas deve cooperar; o Omnibus Digital alargou esse dever para cobrir documentação técnica, limitações
conhecidas e modos de falha, e acesso técnico direcionado para testagem e validação [8].

Os modelos de finalidade geral têm o seu próprio teste. As orientações da Comissão sobre obrigações
de modelos de finalidade geral (conteúdo aprovado em 18 de julho de 2025, adotadas como C(2025) 7719
final em 19 de novembro de 2025) [16] tratam um ator que modifica ou ajusta finamente um modelo de
finalidade geral como prestador do modelo modificado apenas em casos excecionais, com um critério
indicativo: a modificação utiliza mais de um terço da computação de treino do modelo original. As
obrigações de documentação, política de direitos de autor e resumo de treino cobrem então a
modificação, não o modelo inteiro [17]; quando o modelo original tem risco sistémico, as orientações
presumem que o modelo modificado também o tem, com as obrigações completas de risco sistémico [16].
O critério é indicativo, e como se aplica a destilação ou treino repetido de adaptadores é uma
questão a colocar ao conselho jurídico (verifique). A consequência de engenharia é clara de qualquer
forma: registe a computação de cada ajuste fino como um artefato, porque a questão será colocada.

| Desencadeador | Como acontece na prática | Deteção | Artefato |
|---|---|---|---|
| Nome ou marca comercial (`Art. 25(1)(a)`) | Revenda com marca branca de um sistema de risco elevado de um fornecedor | Verificação de marca na lista de verificação de lançamento | Decisão de papel na entrada do registo |
| Modificação substancial (`Art. 25(1)(b)`) | Retreino, novas fontes de dados, limiares movidos além das alterações pré-determinadas do prestador | Classificação de alteração em CI contra as alterações pré-determinadas nas instruções de utilização [18] | Registo de alteração |
| Finalidade prevista alterada (`Art. 25(1)(c)`) | Um assistente geral colocado a trabalhar em contratação ou crédito | Intake; o registo de utilização a jusante | Reclassificação; DDR alterado |
| Modificação de modelo de finalidade geral | Ajuste fino de um modelo de finalidade geral com mais de um terço da sua computação de treino original | Registo de computação | Estimativa de computação arquivada com o AIBOM |

### Licenças de pesos abertos

Pesos abertos não são uma licença, e "peso aberto" não é "código aberto". Cada família pede algo
diferente de um responsável pela implantação:

| Família | Exemplos | O que lhe pede | Tenha cuidado com |
|---|---|---|---|
| **Permissiva** | Apache 2.0, MIT, BSD | Mantenha avisos e o texto da licença; Apache 2.0 acrescenta uma concessão de patente expressa. | A licença do modelo pode ser permissiva enquanto a sua licença de dados de treino ou de conjunto de dados não é. |
| **Copyleft** | Família GPL | Distribuir um derivado requer lançá-lo sob a mesma licença. | Aplica-se ao código na stack de serviço tanto quanto ao modelo; a distribuição é o gatilho. |
| **Copyleft de rede** | AGPL 3.0 | Utilizadores que interagem através de uma rede com uma versão modificada devem ter acesso ao seu código-fonte. | Servir um componente modificado atrás de uma API pode ativar a oferta de código-fonte. |
| **Licença de IA responsável (com restrição de utilização)** | Família OpenRAIL | Acesso aberto com utilizações proibidas listadas que devem ser transmitidas a cada utilizador a jusante e derivado. | Restrições de utilização viajam com o modelo: os seus termos de utilização devem transportá-las. |
| **Licença comunitária personalizada** | Licenças comunitárias de fornecedor para modelos de pesos abertos | Política de utilização aceitável incorporada por referência; deveres de atribuição ou nomeação; limiares de escala acima dos quais é necessária uma licença separada. | Os limiares e políticas diferem por versão de modelo; as regras de nomeação podem aplicar-se a derivados que publica. |
| **Não comercial ou apenas para investigação** | Família CC BY-NC; licenças de investigação | Sem utilização comercial. | Um conjunto de dados ou modelo apenas para investigação dentro de um produto comercial é uma violação, independentemente de quem o adicionou. |

Três exemplos mostram o intervalo. Apache 2.0 acrescenta uma concessão de patente expressa às suas
permissões [19]. A AGPL requer que utilizadores que interagem com uma versão modificada através de
uma rede lhes seja oferecido o seu código-fonte [20], o que alcança stacks de serviço. Licenças de
estilo OpenRAIL concedem acesso aberto mas anexam restrições de utilização que devem passar a cada
derivado e redistribuição [21]. Licenças comunitárias personalizadas vão mais longe: a licença Llama
3.1 incorpora uma política de utilização aceitável, requer atribuição "Built with Llama", pede que
modelos derivados distribuídos a outros transportem "Llama" no início do seu nome, e requer que
licenciados cujos produtos tiveram mais de 700 milhões de utilizadores ativos mensais na data de
lançamento solicitem uma licença separada [22]. Os controlos seguem: uma verificação de licença como
um portão de política (camada 01), licença, versão de utilização aceitável e hash de ficheiro no
[AIBOM](/patterns/aibom) (camada 02), verificação de hash de cada ficheiro de peso antes de
carregar, e uma [análise de ficheiros de modelo serializados](/patterns/model-artefact-integrity)
antes de chegarem a um runtime. A cláusula completa e lista de verificação de licença estão na
[página de contratos](/resources/contracts).

### Possuir o modelo: o lado positivo e o fardo

Construir ou adaptar muito o seu próprio modelo compra controlo: sobre versões e datas de reforma,
sobre personalização, sobre onde os dados vivem, e sobre a própria evidência, uma vez que pode fazer
red-teaming de pesos que detém. Também compra o fardo do prestador se coloca o sistema no mercado, e
três riscos operacionais que clientes de API principalmente alugam. **Segurança de pesos**: os pesos
são um ativo a proteger, do roubo de ficheiros e da extração através da API de inferência, que a
taxonomia de ataques adversariais do NIST e MITRE ATLAS ambos catalogam [23][24]; limites de taxa,
monitorização de padrões de consulta e acesso de privilégio mínimo ao armazenamento de pesos são os
controlos. **Manutenção**: correção, re-validação e atualizações de modelo base tornam-se o seu
calendário. **Risco de pessoa-chave**: um modelo que apenas duas pessoas podem retreinar é um risco
de continuidade com nomes anexados.

### Responsabilidade, seguro e transferência de risco

A nova Diretiva sobre Responsabilidade Decorrente dos Produtos Defeituosos traz software, incluindo
sistemas de IA, dentro da definição de um produto; os Estados-Membros devem transpô-la até 9 de
dezembro de 2026, e aplica-se a produtos colocados no mercado após essa data [25]. Para construtores
que colocam sistemas no mercado, a responsabilidade por defeito torna-se uma entrada de conceção;
para responsáveis pela implantação, o contrato decide que recurso têm contra o fornecedor. Existe um
mercado para seguro específico de IA, incluindo cobertura para perdas de erros de modelo oferecida a
fornecedores de IA e às organizações que implantam os seus sistemas [26]. Verifique as políticas
existentes de cibernética, erros e omissões de tecnologia e responsabilidade para exclusões de IA
com o seu corretor antes de assumir cobertura. Quando uma seguradora pede evidência de controlos, o
questionário de subscrição torna-se um consumidor adicional da loja de garantia. E risco transferido
não é risco reduzido: o risco residual deixado após limites, exclusões e franquias pertence ao
registo de risco (ver
[capítulo 13](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it)).

## Contratos de fornecedor e termos de licença

Quando implanta um sistema que não construiu, o contrato é uma superfície de controlo, e o lugar
onde a [política de IA de terceiros](/bok/governance-program#third-party-ai-policy) da organização
(capítulo 12) se torna executável. Decide se pode testar o sistema, se ouve quando muda, onde os
seus dados vão e como sai. O Regulamento da IA requer um acordo escrito entre o prestador de um
sistema de risco elevado e terceiros que fornecem os seus componentes, ferramentas e serviços,
especificando as informações, capacidades, acesso técnico e assistência que o prestador necessita
[15]. Para compradores, as cláusulas contratuais tipo da UE para aquisição de IA (MCC-AI),
atualizadas em 5 de março de 2025 numa versão de risco elevado e leve com um comentário, dão um
texto de referência redigido para organizações públicas; é a versão mais recente a partir de
2026-09-24 [27]. ISO/IEC 42001 Anexo A.10 e NIST AI RMF (GOVERN 6, MANAGE 3) nomeiam os controlos de
terceiros que as cláusulas suportam [28][29][30].

As cláusulas que mais importam para a governação, com a bandeira vermelha a procurar e a evidência a
manter (a posição de recuo para cada uma está na [página de contratos](/resources/contracts)):

| Cláusula | Bandeira vermelha | Evidência a manter |
|---|---|---|
| **Utilização dos seus dados para treino** | A utilização de treino está ativada por padrão, permitida para "melhoria de serviço", ou controlada por uma definição que o fornecedor pode alterar. | A cláusula, a conta ou definição de API capturada no go-live, e uma re-verificação periódica dessa definição. |
| **Direitos em entradas e saídas** | O fornecedor toma uma licença para as suas entradas além de fornecer o serviço, ou reserva direitos em saídas. | A cláusula, referenciada a partir da entrada do registo de cada sistema que utiliza o fornecedor. |
| **Retenção e eliminação** | Retenção "enquanto necessário" sem número, ou retenção de monitorização de abuso que não pode encurtar ou ver. | Termos de retenção por tipo de dados; confirmações de eliminação; o seu próprio cronograma de retenção de registo que cumpre o Art. 26.º, n.º 6. |
| **Sub-processadores e fornecedores de modelos a montante** | Uma lista de sub-processadores que não é publicada, ou muda sem aviso e sem direito de oposição. | Snapshots datados da lista de sub-processadores; decisões de oposição. |
| **Residência de dados e transferências** | Um compromisso de região para armazenamento apenas, enquanto inferência ou suporte podem correr em qualquer lugar. | Vereditos de política de residência do caminho de inferência; a avaliação de transferência. |
| **Documentação e instruções de utilização** | Documentação "disponível sob pedido" ou limitada a material de marketing. | Cópias versionadas anexadas à entrada do registo. |
| **Acesso de auditoria e avaliação** | Auditoria apenas lendo o próprio resumo do fornecedor; testagem, benchmarking ou investigação de segurança proibidos. | Relatórios recebidos; os resultados da vossa avaliação de limites; as janelas de teste acordadas. |
| **Aviso de alteração, fixação de versão e descontinuação** | Os modelos podem ser «atualizados ou melhorados em qualquer momento»; aviso de descontinuação mais curto do que o vosso ciclo de revalidação. | Avisos de alteração registados contra a entrada do registo; resultados de revalidação por versão. |
| **Notificação de incidente e vulnerabilidade** | Aviso «sem demora injustificada» sem horas especificadas, ou limitado a violações de dados pessoais. | O SLA; avisos recebidos e respetivos registos de data e hora; os vossos registos de incidente que os citam. |
| **Disponibilidade, latência e limites de taxa** | Créditos de serviço como único recurso para uma indisponibilidade que paralisa um processo crítico. | Relatórios de SLA; a vossa própria monitorização de disponibilidade; testes de continuidade. |
| **Indenização por propriedade intelectual** | Indenização excluída quando modificam prompts, utilizam filtros de forma diferente ou combinam resultados. | Prova de que cumpriram as condições de indenização (filtros ativados, utilização documentada), mantida como registos. |
| **Garantias de desempenho e isenções de responsabilidade sobre resultados** | Isenções genéricas de precisão sem qualquer desempenho documentado. | O desempenho documentado, comparado com as vossas próprias avaliações. |
| **Limites de responsabilidade e exclusões** | Um limite estabelecido em alguns meses de taxas, com perdas de dados, propriedade intelectual e regulatórias todas excluídas. | O limite e as exclusões, registados como risco residual no registo de riscos. |
| **Política de utilização aceitável do fornecedor** | Uma política incorporada por referência que o fornecedor pode alterar unilateralmente. | A versão da política verificada no lançamento, mapeada para a vossa própria lista de utilizações proibidas. |
| **Atribuição de papéis e cooperação regulatória** | Silêncio sobre papéis do Regulamento da IA, ou uma cláusula que transfere deveres do prestador para vós sem o acesso necessário para os cumprir. | A decisão de papel registada na entrada do registo, com a cláusula que a suporta. |
| **Controlos de segurança e certificações** | Certificações que excluem o serviço de IA do seu âmbito. | Certificados com as suas declarações de âmbito; resumos de testes adversariais. |
| **Assistência na rescisão, portabilidade e saída** | Sem período de transição; pesos ajustados ou adaptadores pertencem ao fornecedor; exportação apenas em formatos proprietários. | Um plano de saída e o registo de um teste de saída. |
| **Seguro** | Sem cláusula de seguro, ou cobertura que exclui sinistros relacionados com IA. | Certificados de seguro, datados e arquivados com o contrato. |

Duas regras transformam a tabela em governação. Primeiro, uma cláusula que importa em tempo de
execução deve tornar-se uma verificação: a definição de não-treino lida de volta da conta, o
compromisso de residência aplicado no caminho de inferência, a versão fixa mantida no registo. Uma
cláusula que nada verifica é uma esperança. Segundo, a revisão é um passo do
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate), portanto reabre na
renovação e em cada aviso de alteração material. O conjunto de dados por trás desta tabela, com o
risco que cada cláusula aborda, uma posição de recurso e os instrumentos a que se mapeia, é uma
lista de verificação de engenharia, não aconselhamento jurídico.

> **Exemplo (ilustrativo)**
> Os termos de um fornecedor permitiam 60 dias de aviso antes de descontinuar uma versão de modelo.
> O ciclo de revalidação do responsável pela implantação (avaliação de seleção, teste adversarial,
> canário) levava cerca de 90 dias. A lacuna foi registada como um risco, negociada para uma janela
> de descontinuação de 120 dias na renovação, e entretanto coberta mantendo um segundo modelo
> candidato aquecido no harness de avaliação.

## A revisão de lançamento

### O que a revisão lê

A revisão de lançamento lê um pacote de evidência, não um conjunto de diapositivos: o DDR; o registo
de seleção de modelo; resultados do eval gate contra os limites; o resumo do teste adversarial; as
avaliações de impacto (uma FRIA onde o Artigo 27 se aplica, uma AIPD onde a lei de proteção de dados
o exige, ambas mantidas como no padrão [FRIA-as-Code](/patterns/fria-as-code)); a revisão do
contrato; o plano de monitorização com proprietários nomeados; o plano de lançamento com os seus
critérios de reversão; o plano de comunicações; e o runbook de desativação. Quando a evidência é do
próprio fornecedor (as suas instruções de utilização, que devem indicar as capacidades, limitações,
medidas de supervisão e necessidades de manutenção do sistema [18]), a revisão funciona em
**modo de revisão**: avalia a avaliação e os registos do fornecedor e regista, explicitamente, o que
o responsável pela implantação não conseguiu verificar. Do lado do fornecedor, a mesma evidência
saiu de
[prontidão de lançamento e conformidade](/bok/governing-development#release-readiness-and-conformity)
(capítulo 14).

### Três resultados

| Resultado | Significado | O que é registado | O que o pipeline faz |
|---|---|---|---|
| **Aprovar** | A evidência cumpre os limites | Decisão, aprovador, risco residual e quem o aceitou | O plano de lançamento começa na sua primeira fase |
| **Aprovar com condições** | Proceder apenas enquanto as condições nomeadas se mantêm | Cada condição com um proprietário, um prazo e a verificação que a valida | As condições tornam-se política: uma flag limita a exposição, e a aprovação tem uma data de expiração |
| **Rejeitar** | A evidência não suporta a implantação | As razões e o que mudaria a resposta | A implantação é bloqueada; o estado do registo lê `rejected` |

Uma aprovação com condições é onde a governação mais frequentemente se torna teatro, porque as
condições são fáceis de conceder e fáceis de esquecer. Tornem-nas código: cada condição é uma
verificação com um prazo, e se a verificação não tiver passado até então a aprovação caduca e a flag
de funcionalidade fecha. O risco residual é aceite por uma autoridade que corresponde ao nível de
risco, nunca pela equipa que quer lançar.

### Dissensão registada

Qualquer membro da revisão pode registar dissensão. A dissensão é anexada ao registo de decisão,
nomeada, e revista na primeira revisão de monitorização após o lançamento. Não custa nada quando o
dissidente está errado, e quando está certo responde à primeira pergunta que toda a revisão de
incidente faz: alguém viu isto a chegar?

> **Na prática (ilustrativo)**
> A revisão de lançamento para `csa-01` aprovou-a com duas condições: um limite de fundamentação no
> tópico de reembolsos, remedicado após quatro semanas de tráfego em direto, e um teste adversarial
> em espanhol antes do assistente servir falantes de espanhol. Ambos se tornaram flags. O
> responsável pela segurança registou dissensão no âmbito da ferramenta para pesquisas de
> encomendas. A verificação de quatro semanas passou; o teste adversarial não, portanto o espanhol
> manteve-se atrás da sua flag até que uma correção fosse lançada, e a dissensão foi fechada com um
> âmbito reduzido.

## Entrega progressiva como um controlo

A entrega progressiva limita a exposição enquanto a evidência se acumula. Cada fase é um gate com um
critério estabelecido antecipadamente; as fases são emprestadas da engenharia de confiabilidade do
site, onde o canário é definido como uma implantação parcial e limitada no tempo de uma alteração e
a sua avaliação [31].

| Fase | O que é | O que prova | Critério de reversão (estabelecido antes do início da fase) | Evidência |
|---|---|---|---|---|
| **Shadow** | O novo sistema vê entradas em direto; os seus resultados não são utilizados | Comportamento em tráfego real sem exposição | Desacordo com o incumbente ou com decisões humanas acima de um limite | Resultados emparelhados; registo de desacordo |
| **Pilot** | Um pequeno grupo de utilizadores informados | Usabilidade; a supervisão funciona; a força de trabalho está pronta | Taxa de sobreposição ou taxa de reclamação acima de um limite | Relatório piloto; registo de feedback |
| **Canary** | Uma pequena parte do tráfego de produção, comparada com um grupo de controlo [31] | Sem regressão à escala | Qualquer limite violado contra o controlo | Análise de canário por métrica |
| **Blue-green** | Dois ambientes de produção; o tráfego muda entre eles [32] | Um caminho testado e instantâneo de volta | Qualquer evento de severidade 1 | Eventos de comutação |
| **Feature flags** | Toggles em tempo de execução por coorte, região ou função, incluindo kill switches operacionais [33] | A exposição é controlável sem uma implantação | Definido por flag | Registo de alteração de flag |
| **Version pinning** | O registo fixa versões de modelo, prompt, corpus e guardrail | O que correu é conhecido | Uma alteração não fixa é detetada | Diff do registo |

Os critérios de reversão devem ser **pré-registados**: escritos no
[plano de lançamento](/patterns/staged-rollout-rollback-criteria) antes do início da fase, e
avaliados pelo pipeline, não por uma reunião. Um critério inventado depois de a métrica se mover é
uma negociação, não um controlo. O mesmo se aplica a alterações que não fizeram: uma nova versão de
modelo de fornecedor é um lançamento, e passa por shadow e canário do vosso lado contra a versão
fixa antes de receber tráfego. O catálogo de ferramentas lista
[ferramentas de entrega progressiva](/resources/tools#cat-progressive-delivery) como exemplos
ilustrativos, não recomendações.

## Operação do sistema

### Políticas no lançamento

O sistema é lançado com as políticas que tornam a sua utilização governável. Uma
**política de utilização aceitável** para pessoal e clientes, extraída do espaço negativo.
**Treino baseado em papéis**: para que serve o sistema, as limitações que as suas instruções de
utilização declaram [18], quando o sobrepor e como comunicar um problema, com conclusão como
condição de acesso. **Ajudas de interface** que suportam o julgamento em vez de o substituir: fontes
mostradas, confiança onde é significativa, e uma forma visível de chegar a uma pessoa. Estas são a
forma prática dos deveres do Artigo 26 de utilizar o sistema conforme instruído e de dar supervisão
a pessoas competentes com autoridade [1], e dos controlos de utilização responsável na ISO/IEC 42001
Anexo A.9 [28]. A supervisão em si é concebida como em
[conceção de supervisão humana](/bok/the-stack#designing-human-oversight-article-14).

### Governação de dados em tempo de inferência

Entradas em direto são processamento de dados, e um sistema implantado cria novos dados a cada
pedido: prompts, passagens recuperadas, resultados, registos e feedback. Governem-nos como governam
dados de treino (ver
[governação de dados em todo o stack](/bok/the-stack#data-governance-across-the-stack)):

- **Minimizem** o que chega ao modelo, com filtragem de PII e prevenção de perda de dados no
  [guardrail](/patterns/runtime-guardrail) de entrada.
- **Estabeleçam retenção por tipo de dados** como código, reconciliando o limite de retenção de
  registos abaixo com o teto de limitação de armazenamento da lei de proteção de dados.
- **Revalidem a base legal** quando o propósito muda; uma nova utilização de registos antigos é um
  novo propósito de processamento.
- **Mapeiem transferências** quando a inferência, armazenamento ou suporte funcionam noutra
  jurisdição; o capítulo 19 trata
  [inferência remota como uma transferência](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
- **Planeiem para [pedidos de titulares de dados](/patterns/rights-requests-against-models)** que
  cheguem a prompts, registos, corpora de recuperação e pesos ajustados. Apagar um registo de um
  corpus é uma eliminação; remover a sua influência de pesos ajustados pode significar retreino,
  portanto decidam antes de ajustar em dados pessoais. Os responsáveis pela implantação de sistemas
  de risco elevado utilizam as informações do fornecedor para realizar a sua AIPD [1];
  [o capítulo 19](/bok/privacy-and-ai#the-dpia-for-ai-systems) cobre o lado da privacidade em
  profundidade.

### Calendário de manutenção e governação de retreino

As instruções de utilização do fornecedor indicam o tempo de vida esperado do sistema e a manutenção
que necessita, incluindo com que frequência [18]. O calendário do responsável pela implantação
começa aí e adiciona o seu próprio:

| Cadência | Atividade | Artefato | Camada |
|---|---|---|---|
| Contínuo | Sinais de drift, equidade, qualidade, custo e energia contra limites | Telemetria de monitorização | 4 · 5 |
| Semanal | Triagem de problemas e quase acidentes; revisão de tendências de sobreposição e reclamação | Registo de problemas | 5 |
| Mensal | Avisos de mudança de fornecedor, alterações de subcontratante, relatórios de SLA | Registo de revisão de terceiros | 2 · 5 |
| Trimestral | Revisão de limiar; red team nas versões atuais; atualização de fichas e registo | Fichas atualizadas; resultados de red team | 2 · 3 |
| Anualmente (ou por nível de risco) | Reavaliação de impacto; revisão de benefício; atualização de licença e dependências; simulacro de desativação | Reavaliação; registo de simulacro | 1 · 2 · 4 |
| Num evento | Nova população, jurisdição, nível de autonomia ou versão de fornecedor; um incidente | Registo de acionamento de reavaliação | 1 · 2 |

A **governação de retreino** assenta numa regra: um retreino, um ajuste fino, uma mudança de prompt,
uma atualização de corpus e uma atualização de modelo de fornecedor são todos lançamentos. Cada um
passa pela avaliação e pelas fases de entrega progressiva, e cada um incrementa a versão no registo.
Uma mudança de limiar é uma mudança a um controlo, portanto é um diff revisto com um aprovador, não
uma edição num painel. O retreino é acionado por uma violação de deriva ou piso, pelo calendário, ou
por uma mudança no mundo que o DDR descreve. O catálogo de ferramentas lista
[ferramentas de monitorização](/resources/tools#cat-monitoring) como exemplos ilustrativos, não como
recomendações.

### Deriva: o que muda e como o ver

A deriva de conceito é uma mudança imprevisível na distribuição dos dados que um modelo vê ao longo
do tempo, e a investigação sobre ela divide o trabalho em deteção, compreensão e adaptação [34]. Em
produção, ajuda nomear o que mudou:

| Deriva | O que muda | Exemplo (ilustrativo) | Como detetar |
|---|---|---|---|
| **Dados (covariável)** | A distribuição de entrada | Uma nova linha de produtos muda as questões que os clientes fazem | Índice de Estabilidade Populacional ou teste de Kolmogorov-Smirnov em características ou embeddings contra uma janela de referência |
| **Rótulo (anterior)** | A taxa base do resultado | A taxa de fraude sobe numa estação | Taxa de positivos prevista contra observada |
| **Conceito** | A relação entre entrada e resultado | Mesmos sintomas, nova orientação de tratamento | Desempenho em rótulos frescos; deteção de ponto de mudança na taxa de erro |
| **Pipeline** | Uma característica, esquema ou passo de recuperação a montante | Uma mudança de esquema esvazia um campo | Contratos de dados; monitores de taxa nula e atualização |
| **Modelo de fornecedor** | O modelo por trás da API | O prestador envia uma nova versão | Verificação de fixação de versão; canário contra a linha de base fixada |
| **Utilização** | Quem utiliza o sistema e para quê | O pessoal começa a utilizar o assistente para questões de RH | Classificação de tópicos do tráfego contra o espaço negativo |

Os rótulos chegam frequentemente tarde, ou nunca. Para modelos clássicos, emparelhe estatísticas de
deriva de entrada com uma verificação de desempenho atrasada quando os rótulos chegam; para sistemas
generativos, amostre saídas para pontuação de fundamentação e revisão humana. Cada
[sinal de deriva](/patterns/drift-fairness-monitor) precisa de um limiar, um proprietário e uma
consequência definida: um problema, um retreino, um modo degradado ou um incidente.

### Equidade e qualidade em produção

Um sistema que passou suas [avaliações de equidade](/patterns/fairness-eval-suite) no lançamento
pode derivar para injustiça sem qualquer mudança de código. Monitorize taxas de erro por grupo
contra os pisos por grupo no DDR, taxas de reclamação e apelação por grupo, e, para sistemas
generativos, taxas de fundamentação e recusa por tópico e idioma. Quando a lei exige uma auditoria
periódica de viés (a Lei Local 144 de Nova Iorque, por exemplo, exige uma auditoria de viés dentro
de um ano antes de uma ferramenta de decisão de emprego automatizada ser utilizada, e um resumo
público dos seus resultados [35]), a telemetria de produção é o que torna a auditoria barata. O
[Capítulo 16](/bok/fairness-and-explainability#monitoring-fairness-in-production) cobre as métricas;
o ponto aqui é que funcionam continuamente e alimentam o mesmo caminho de limiar, problema e
incidente que qualquer outro sinal.

### Quem é proprietário do sinal

| Sinal | Vigia (responsável) | Decide (responsabilizado) | Consultado | Informado | Escalona para |
|---|---|---|---|---|---|
| Desempenho e deriva | Equipa de chamada da plataforma ML | Proprietário do sistema | Engenheiro de governação de IA | Risco | Painel de lançamento se um piso for violado |
| Equidade | Engenheiro de governação de IA | Proprietário do sistema | Legal; representantes de grupos afetados | DPO | Comissão de risco |
| Segurança e abuso | Operações de segurança | Responsável de segurança | Engenheiro de governação de IA | Proprietário do sistema | [Pipeline de incidente](/patterns/incident-pipeline) |
| Obrigações de conformidade | Engenheiro de governação de IA | Responsável de conformidade | Legal | Ligação reguladora | Pipeline de incidente; proprietário de comunicações |
| Custo, energia e benefício | FinOps | Proprietário de negócio | Responsável de sustentabilidade | Finanças | Revisão de benefício |

A regra é a do [capítulo 06](/bok/the-role#runtime-monitoring-and-incidents): é proprietário de um
sinal quando pode ser chamado para ele. Um sistema crítico precisa de cobertura para cada hora que
funciona, e um sinal sem proprietário é um sinal em que ninguém atua.

### Monitorizar terceiros enquanto funciona

Um sistema adquirido continua a mudar após o contrato ser assinado. Registe cada aviso de mudança e
descontinuação contra a entrada do registo, leia os relatórios de SLA, tire uma fotografia da lista
de subcontratantes, e reabra a porta de diligência devida na renovação. Mantenha um modelo
alternativo aquecido no arnês de avaliação para que uma migração forçada comece a partir de
evidência, não de um ponto de partida nulo. O NIST AI RMF pede exatamente isto: riscos e benefícios
de terceiros monitorados regularmente, e modelos pré-treinados monitorados como parte da manutenção
própria do sistema [30]. O
[passo de funcionamento da porta de diligência devida](/patterns/vendor-model-due-diligence-gate#operate-change-notices-reassessment-and-fallback)
transforma isto numa runbook.

### Quando o fornecedor falha: continuidade

Planeie para o fornecedor falhar em cada uma das formas que pode: uma interrupção, um limite de taxa
no pico, uma queda de qualidade, um modelo retirado, uma descontinuação forçada, ou uma saída
comercial ou legal. Os retrocessos são um processo manual que o pessoal praticou, um modelo
alternativo por trás da mesma interface, respostas em cache ou modelo, e os modos degradados
descritos abaixo. A recuperação precisa da sua própria evidência: faça cópia de segurança da
fotografia de corpus e dos embeddings, ou saiba que pode reconstruir o índice; mantenha os prompts e
as configurações de guardrail sob controlo de versão; e teste a mudança. O NIST AI RMF pede
processos de contingência para falhas em sistemas de IA de terceiros considerados de risco elevado
[29].

Alguns setores tornam isto um dever legal. As entidades financeiras sob DORA, em aplicação desde 17
de janeiro de 2025 [36], devem manter um registo de informações sobre todos os acordos contratuais
para serviços de TIC de prestadores de terceiros, e devem ter estratégias de saída para serviços de
TIC que suportam funções críticas ou importantes [37]. Um modelo de IA alcançado como serviço é
provável que conte como um serviço de TIC para este fim (verifique para o seu caso). As entidades no
âmbito de NIS2 devem tomar medidas para continuidade de negócio, incluindo gestão de cópia de
segurança e recuperação de desastres, e para segurança da cadeia de abastecimento [38]; se está no
âmbito depende do seu setor e tamanho (verifique).

### Realização de benefício

Rastreie o objetivo no DDR contra o que o sistema entrega, incluindo o seu custo de inferência e
funcionamento. A entrega insuficiente é um sinal de governação, não apenas um sinal de negócio: um
sistema que custa mais para funcionar e governar do que retorna é um candidato para re-escopo ou
reforma, e a revisão de benefício é onde isto é decidido com base em evidência. Um registo de
sistemas em direto sem benefício medido é um inventário de risco não precificado.

### Relatório de pegada energética

Meça energia por pedido e no total, com o limite declarado: aceleradores, sistemas anfitriões,
capacidade inativa e sobrecarga do centro de dados [12]. No seu próprio hardware, meça-o; no de um
prestador, peça-o no contrato e registe o que recebeu. Converta para carbono com a intensidade da
rede da região que serve o tráfego, relate-o junto ao custo na revisão de benefício, e deixe-o
informar a próxima escolha de modelo: quando um modelo mais pequeno passa a avaliação de seleção, a
diferença de energia é uma razão para o preferir [11].

### Retenção de registos

| Registo | Mantido por | Mínimo | Fonte |
|---|---|---|---|
| Registos gerados automaticamente por um sistema de risco elevado, na medida sob o controlo do responsável pela implantação | Responsável pela implantação | Pelo menos seis meses, a menos que outra lei diga o contrário | `Art. 26(6)` [1] |
| Os mesmos registos, sob o controlo do prestador | Prestador | Pelo menos seis meses | `Art. 19(1)` [39] |
| Documentação técnica e de gestão da qualidade, declaração de conformidade | Prestador | 10 anos após colocação no mercado | `Art. 18(1)` [40] |
| DDR, decisão de lançamento, condições e discordância | Responsável pela implantação | A vida do sistema mais o período de limitação que o conselho define | Prática |
| Registos de operador sob o quadro voluntário TC260 3.0 da China | Operador | Pelo menos seis meses, com auditoria | §5.3 [41] |

A retenção é um controlo, portanto é código: um calendário por tipo de registo, armazenamento à
prova de adulteração para registos, uma retenção legal que substitui a eliminação, e formatos de
arquivo que alguém ainda pode ler em 10 anos. O piso de seis meses para registos é um mínimo; a lei
de proteção de dados define um teto para os dados pessoais dentro deles, e os dois são reconciliados
por tipo de dados, não mantendo tudo.

## Garantia periódica

### Um programa de auditoria, não uma auditoria

Uma única auditoria é uma fotografia. Um programa de auditoria tem uma carta, uma cadência baseada
em risco ligada ao nível de risco, e independência proporcional aos riscos: revisão de segunda
linha, auditoria interna, ou um avaliador externo (veja
[como isto se relaciona com certificação](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments)).
Bons programas re-executam em vez de ler: o auditor re-executa uma verificação de equidade ou
reproduz uma amostra de registos em vez de aceitar o relatório que diz que foi feito. Cada
constatação obtém um proprietário, uma data e um teste de encerramento, e as constatações abertas
são uma consulta em direto, não uma folha de cálculo.

### Red teaming num calendário

Agende red teaming por nível de risco, e dirija-o à configuração implantada (prompts, ferramentas,
corpus de recuperação, guardrails), não apenas ao modelo. Para um sistema adquirido, teste no limite
dentro das janelas que o contrato permite. O padrão
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) transforma cada constatação numa
teste de regressão, para que a próxima execução agendada prove que a correção se manteve.

### Modelagem de ameaça do sistema implantado

Decomponha os fluxos de dados (utilizador, aplicação, recuperação, modelo, ferramentas, consumidores
a jusante), depois enumere ameaças por elemento com uma lista de verificação de categoria clássica
como STRIDE, estendida com os ataques específicos de IA que a taxonomia de aprendizagem automática
adversarial do NIST [23], MITRE ATLAS [24] e o OWASP Top 10 para Aplicações Agentes [42] catalogam.
O resultado que importa é o mapeamento de ameaça para mitigação para o teste que prova que a
mitigação funciona:

| Ameaça | Onde entra | Mitigação | O teste que prova |
|---|---|---|---|
| Injeção indireta de prompts | Documentos recuperados, saídas de ferramentas | Guardrail de entrada; âmbito de ferramenta estreito | Casos de red team com instruções plantadas |
| Envenenamento de recuperação | Ingestão de corpus | Lista de permissão de origem; proveniência no AIBOM | Documentos canário que nunca devem ser recuperados |
| Extração de modelo | API de inferência | Limites de taxa; deteção de padrão de consulta | Sonda de extração contra os limites |
| Inferência de associação, inversão | Um modelo ajustado em dados pessoais | Minimizar dados pessoais no ajuste; filtragem de saída | Suite de ataque de privacidade no modelo ajustado |
| Pesos adulterados | Cadeia de abastecimento | [Verificação de hash e assinatura](/patterns/model-artefact-integrity) | O pipeline falha numa incompatibilidade de hash |
| Uso indevido de ferramenta | Ações de agente | Credenciais com âmbito; porta humana em ações de alta consequência | Testes de âmbito e [kill-switch](/patterns/kill-switch-circuit-breaker) |

A [ponte de ameaças](/resources/threats) do site alinha estas ameaças com os padrões que as
controlam.

## Utilização secundária e dano a jusante

Os sistemas são utilizados para mais do que foram aprovados. O Regulamento da IA nomeia o conceito:
**utilização indevida razoavelmente previsível** é a utilização não conforme com a finalidade
prevista, mas que pode resultar de comportamento humano razoavelmente previsível ou interação com
outros sistemas [2]. À sua volta situam-se **expansão de funções** (a extensão gradual de um sistema
para finalidades que ninguém aprovou), **dupla utilização** (a mesma capacidade servindo uma
finalidade prejudicial), **dano a jusante** (resultados alimentando outros sistemas que atuam sobre
eles), **ciclos de retroalimentação** (resultados moldando os dados a partir dos quais a próxima
versão aprende, como quando uma pontuação de risco decide quem é inspecionado e assim decide quais
casos são etiquetados) e **reciclagem sintética** (resultados gerados reutilizados como dados de
treino).

Preveja-os antes do lançamento com três técnicas económicas. Uma **autópsia preventiva**: assuma que
é um ano depois e o sistema causou dano, depois escreva como. **Casos de abuso**: histórias de
utilização indevida escritas ao lado das histórias de utilizador, por pessoas pagas para pensar como
o abusador. **Mapeamento de impacto das partes interessadas**: cada grupo que os resultados
alcançam, incluindo aqueles que nunca tocam na interface.

Depois dê às respostas um local, que este capítulo chama um
**[registo de utilização a jusante](/patterns/downstream-use-register)**: utilizações previstas e
proibidas escritas como um [Policy Card](/patterns/policy-card); cada consumidor dos resultados
(sistemas, equipas, parceiros) registado contra a entrada do registo; proveniência e ressalvas
marcadas nos resultados para que um consumidor saiba o que está a utilizar; e um reteste sempre que
os resultados são utilizados num novo contexto. Em tempo de execução, a utilização fora de propósito
é um sinal como qualquer outro: classifique o tráfego contra o espaço negativo e alerte sobre o que
cai fora dele. As implantações viradas para o consumidor adicionam uma pergunta a mais, se crianças
ou outras pessoas vulneráveis utilizarão o sistema, com garantia de idade e a proibição do Artigo 5
de explorar vulnerabilidades como os controlos a considerar [6].

## Comunicações externas

Cada sistema implantado precisa de um plano para falar com pessoas fora da organização, escrito
antes de ser necessário. O plano nomeia um proprietário e uma voz única, um fluxo de trabalho de
aprovação e uma única fonte de verdade: uma página de transparência e uma ficha de sistema em
linguagem clara [gerada a partir do registo](/patterns/disclosure-notification-pipeline), para que o
que diz publicamente não possa divergir do que está em execução. Os modelos são versionados como
código. O NIST AI RMF pede que incidentes e erros sejam comunicados aos atores de IA relevantes,
incluindo comunidades afetadas [30].

| Público | Proativo | Gatilho reativo | Relógio | Modelo |
|---|---|---|---|---|
| Autoridade de fiscalização do mercado | Registo onde necessário (responsáveis pela implantação de autoridades públicas) [1] | Razão para considerar que o sistema apresenta um risco: informar o prestador ou distribuidor e a autoridade, e suspender a utilização [1] | Sem atraso injustificado | Aviso de risco pré-preenchido |
| Prestador, depois autoridade | Nenhum | Um incidente grave: informar primeiro o prestador, depois o importador ou distribuidor e as autoridades [1] | Imediatamente; os relógios de comunicação do próprio prestador seguem (ver [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) | Aviso de incidente grave |
| Autoridade de proteção de dados | AIPD onde necessário | Uma violação de dados pessoais | Dentro de 72 horas quando viável [43] | Notificação de violação |
| Utilizadores e pessoas afetadas | Divulgação de IA [5]; aviso a pessoas sujeitas a decisões do Anexo III [1]; explicação sob pedido [7] | Uma violação suscetível de causar risco elevado para eles [44]; uma alteração material; uma correção | Sem atraso injustificado | Avisos; aviso de correção |
| Trabalhadores e seus representantes | Informação antes da utilização no trabalho [1] | Uma alteração de âmbito | Antes da utilização | Pacote informativo |
| Clientes comerciais e parceiros | Registo de alterações; atualizações de ficha de modelo e AIBOM | Um incidente que os afeta; uma descontinuação | Como o contrato estabelece | Aviso ao cliente |
| Média e público | Página de transparência; ficha de sistema | Um incidente com impacto público | Declaração de espera primeiro, factos conforme confirmados | Declaração de espera; Perguntas e respostas |

Uma **declaração de espera** é preparada em esqueleto antes de qualquer incidente: o que aconteceu,
afirmado apenas até ao ponto em que é conhecido; o que foi feito para o conter; o que as pessoas
afetadas devem fazer; e quando virá a próxima atualização. Nunca especula sobre a causa. O lado do
incidente da comunicação é desenvolvido no [capítulo 17](/bok/incidents#the-response-lifecycle). Na
reforma, o mesmo plano envia os avisos de encerramento. E meça o plano: se os avisos chegaram às
pessoas para as quais eram destinados, e o que o volume de reclamações fez depois.

## Desativação, degradação, localização e reforma

### Uma política de desativação que alguém pode executar

Uma [política de desativação](/patterns/deactivation-localisation-retirement-runbook) nomeia seus
gatilhos, sua autoridade de decisão, o registo que cada decisão deixa, como a evidência é preservada
e os critérios para um reinício seguro. Os gatilhos vêm em dois tipos. Gatilhos de limite: um piso
ultrapassado e não recuperado dentro de uma janela definida, uma lacuna de equidade acima de seu
limite, uma gravidade de incidente. Gatilhos legais: o dever do responsável pela implantação de
suspender a utilização quando tem razão para considerar que o sistema apresenta um risco [1]; a ação
corretiva de um prestador para retirar, desativar ou recuperar um sistema não conforme [45]; ação
por uma autoridade sobre um sistema de IA que apresenta um risco para a saúde, segurança ou direitos
fundamentais [46]; e uma prática recentemente proibida. O NIST AI RMF pede mecanismos, com
responsabilidades atribuídas, para substituir, desengatar ou desativar sistemas cujo desempenho ou
resultados são inconsistentes com a utilização prevista [30].

A preservação de evidência vem em primeiro lugar: congele os registos, aplique uma suspensão legal,
tire uma fotografia das versões. Depois pare. A desativação aplica-se a todos os tipos de sistema,
não apenas agentes: um classificador incorporado num produto de fornecedor também precisa de um
interruptor, seja uma bandeira de funcionalidade ou um caminho de retorno. Para agentes, o padrão
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) aplica-se, e o
[capítulo 23](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers) desenvolve-o.

### Degradação graduada

Desligar é o último recurso, não o único. Construa os modos intermédios com antecedência como
alternadores operacionais [33], e teste-os:

| Modo | O que muda | Utilize-o quando |
|---|---|---|
| **Apenas aconselhamento** | O resultado vai para uma pessoa; o sistema nunca atua ou decide sozinho | Dúvida sobre precisão ou equidade; a ação é o que carrega risco |
| **Limiares elevados** | O sistema abstém-se abaixo de uma confiança mais elevada e encaminha para uma pessoa | Desvio detetado; etiquetas pendentes |
| **Apenas fundamentado** | Respostas apenas com uma fonte recuperada; caso contrário, recusa | Taxa de alucinação em aumento |
| **Âmbito desligado** | Desativado para um grupo, idioma, região ou função | Dano concentrado num segmento |
| **Voltar ao piloto** | A exposição volta à coorte piloto | Regressão ampla com uma causa desconhecida |
| **Desligado** | O processo de retorno assume o controlo | Gatilho legal; dano grave |

### Localização por jurisdição

Lance apenas onde a conformidade foi demonstrada, e mantenha a jurisdição como uma entrada de
política em vez de um acidente de implantação: conjuntos de regras por jurisdição como código,
instâncias regionais onde a residência as exige, e bandeiras de funcionalidade por região para que
um mercado possa ser desligado sem tocar nos outros. As obrigações sobrepõem-se em lugares (o piso
de seis meses de registo do Regulamento da IA e a retenção de registo de operador de seis meses na
estrutura voluntária TC260 da China [1][41]) e divergem em muitos outros; ver
[capítulo 21](/bok/ai-laws-worldwide#comparing-the-regimes) e o
[mapa regulatório](/bok/regulatory-map#other-jurisdictions).

### Reforma e desmantelamento

Projete a reforma desde o início: o DDR já nomeia as condições sob as quais o sistema é reformado.
Os gatilhos incluem uma falta de benefício, uma descontinuação de fornecedor, uma substituição e um
evento legal. O NIST AI RMF avisa que o encerramento irregular ou indiscriminado pode em si aumentar
o risco [29], portanto a reforma é um runbook, não uma eliminação:

1. **Análise de dependência.** Quem consome os resultados? O
   [registo de utilização a jusante](/patterns/downstream-use-register) responde.
2. **Retorno e transição.** Os utilizadores mudam para a substituição ou o processo manual, com
   treino.
3. **Avisos de encerramento.** Clientes, parceiros e pessoas afetadas ouvem antes da data, não
   depois.
4. **Fotografia final de evidência.** Fichas, avaliações, decisões e registos são arquivados de
   acordo com o cronograma de retenção.
5. **Arquive ou elimine.** Pesos, corpora e registos são mantidos ou destruídos conforme a licença,
   base legal e retenção decidem.
6. **Revogue identidades e credenciais.** Cada identidade não humana que o sistema detinha é
   revogada.
7. **Retire, não elimine, a entrada do registo.** Seu estado lê `retired`, com a data e o registo de
   decisão.
8. **Confirme que desapareceu.** [Shadow-AI Discovery](/patterns/shadow-ai-discovery) verifica que
   nenhuma cópia ainda está em execução.

## Um sistema da decisão à reforma

`csa-01`, o assistente que o [capítulo 04](/bok/the-stack#one-system-through-the-five-layers) segue
através das cinco camadas, também passa por este capítulo. Os artefatos que deixa, todos
ilustrativos:

| Fase | Artefato | Camada |
|---|---|---|
| Decidir | `ddr-csa-01-v1`, com seu espaço negativo e pisos | 1 · 2 |
| Escolher | Avaliação de seleção em três candidatos; estimativa de energia por 1.000 pedidos | 3 |
| Contrato | Revisão de cláusula; configuração sem treino relida semanalmente | 1 · 5 |
| Colocar em funcionamento | Aprovado com duas condições e um voto contra | 1 · 5 |
| Lançar | Sombra, depois canário com retrocesso pré-registado em fundamentação | 4 |
| Operação | Alerta de desvio de utilização em tópicos de RH; alteração de versão de fornecedor passou canário | 4 · 5 |
| Garantir | Equipa vermelha trimestral; descobertas fechadas como testes de regressão | 3 · 5 |
| Desativação | Condições de reforma no DDR; runbook praticado uma vez por ano | 2 · 4 |

**Correspondências:** Regulamento da IA da UE Art. 4, 5, 13, 25, 26, 27, 50, 86 · RGPD Art. 33, 34,
35 · ISO/IEC 42001 Anexo A.6.2.5, A.6.2.6, A.9, A.10 · NIST AI RMF (GOVERN 1.7, GOVERN 6, MANAGE
2.4, MANAGE 3, MANAGE 4) · DORA Art. 28 · NIS2 Art. 21 · todas as cinco camadas. Os mapeamentos são
ilustrativos, não uma afirmação de conformidade.

## O que pode fazer esta semana

1. **Escreva o DDR para seu sistema ao vivo mais arriscado**, retroativamente se necessário,
   incluindo seu espaço negativo e condições de reforma, e ligue-o a partir da entrada do registo.
2. **Verifique cinco cláusulas em seu maior contrato de IA**: utilização de seus dados para treino,
   aviso de alteração e descontinuação, aviso de incidente, acesso a auditoria e avaliação, e saída.
   Arquive cada lacuna como um risco.
3. **Pré-registre os critérios de retrocesso** para sua próxima alteração de modelo, prompt ou
   versão de fornecedor, e ligue um deles como uma verificação de canário automática.
4. **Compare a retenção de registo** em cada sistema de risco elevado ou provável risco elevado
   contra o piso de seis meses e seu teto de proteção de dados.
5. **Construa um modo degradado** (apenas aconselhamento ou apenas fundamentado) atrás de uma
   bandeira, e teste que funciona.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per the instructions; 26(2) oversight by competent persons with authority; 26(4) relevant and representative input data; 26(5) monitor, suspend and inform, serious incidents to the provider first; 26(6) logs kept at least six months; 26(7) inform workers; 26(8) public-authority registration; 26(9) DPIA; 26(11) inform affected persons). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 definitions: (3) provider, (4) deployer, (12) intended purpose, (13) reasonably foreseeable misuse, (23) substantial modification. Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[3] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk rules from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27(1) (FRIA before first use by public bodies, private entities providing public services and deployers of Annex III points 5(b) and (c)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency obligations apply from 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(b) (prohibition on exploiting vulnerabilities due to age, disability or a specific social or economic situation; applies to placing on the market, putting into service and use). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[7] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86(1) (right to a clear and meaningful explanation from the deployer of the role of an Annex III system in a decision, except point 2 systems). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4 replaced: providers and deployers support AI literacy; Art. 25(2) cooperation extended to technical documentation, known limitations and failure modes and targeted technical access; Art. 25(4) revised; Art. 26 unchanged; Art. 111(4) transitional period for Art. 50(2) marking to 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[9] "A Careful Examination of Large Language Model Performance on Grade School Arithmetic" (GSM1k; accuracy drops of up to 8% against GSM8k; systematic overfitting in several model families) (arXiv 2405.00332). Zhang et al. 2024-05-01. https://arxiv.org/abs/2405.00332 (verified: primary)
[10] "The Leaderboard Illusion" (undisclosed private testing of multiple variants and score retraction on Chatbot Arena) (arXiv 2504.20879). Singh et al. 2025-04-29. https://arxiv.org/abs/2504.20879 (verified: primary)
[11] "Power Hungry Processing: Watts Driving the Cost of AI Deployment?" (multi-purpose generative architectures orders of magnitude more expensive per inference than task-specific systems, controlling for parameters) (arXiv 2311.16863; FAccT '24). Luccioni, Jernite, Strubell. 2023-11-28. https://arxiv.org/abs/2311.16863 (verified: primary)
[12] "Measuring the environmental impact of delivering AI at Google Scale" (median Gemini Apps text prompt 0.24 Wh; boundary includes host energy, idle capacity and data-centre overhead) (arXiv 2508.15734). Elsworth et al., Google. 2025-08-21. https://arxiv.org/abs/2508.15734 (verified: primary)
[13] Energy and AI, executive summary (data-centre electricity 415 TWh in 2024, around 945 TWh by 2030). International Energy Agency. 2025-04. https://www.iea.org/reports/energy-and-ai/executive-summary (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex XI, Section 1, point 2(e) (GPAI technical documentation: known or estimated energy consumption of the model). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_XI (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25 (value chain: 25(1)(a) name or trademark, (b) substantial modification, (c) changed intended purpose; 25(2) cooperation of the initial provider; 25(4) written agreement with third-party suppliers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[16] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (C(2025) 7719 final; content approved 18 Jul 2025; paras. 67 to 68: a modified systemic-risk model is presumed to have systemic risk). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[17] Guidelines on obligations for general-purpose AI providers, FAQ (modifiers become providers only when the modification uses more than one third of the original model's training compute; obligations limited to documenting the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[18] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13(3) (instructions for use: capabilities and limitations of performance; pre-determined changes; human oversight measures; expected lifetime and maintenance measures, including their frequency; log collection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[19] Apache License, Version 2.0 (section 3, grant of patent licence). Apache Software Foundation. 2004-01. https://www.apache.org/licenses/LICENSE-2.0 (verified: primary)
[20] GNU Affero General Public License v3 (section 13, remote network interaction). Free Software Foundation. 2007-11-19. https://www.gnu.org/licenses/agpl-3.0.html (verified: primary)
[21] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that must be adopted by redistributions and derivatives). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[22] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated by reference; "Built with Llama" attribution; "Llama" at the start of distributed derived model names; separate licence above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[23] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[24] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems. MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[25] Directive (EU) 2024/2853 on liability for defective products (software within the definition of product; transposition by 9 Dec 2026; applies to products placed on the market or put into service after that date). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[26] aiSure AI insurance (cover for losses from AI model errors, for AI vendors and corporate adopters). Munich Re. 2026. https://www.munichre.com/en/solutions/for-industry-clients/insure-ai.html (verified: primary)
[27] Updated EU AI model contractual clauses (MCC-AI high-risk and light versions, with commentary; update of the 2023 clauses). Community of Practice on Public Procurement of AI, Public Buyers Community (European Commission). 2025-03-05. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses (verified: primary)
[28] ISO/IEC 42001:2023, Annex A control titles (A.6.2.5 AI system deployment; A.6.2.6 operation and monitoring; A.9 use of AI systems; A.10 third-party and customer relationships), referenced by identifier only. ISO/IEC (titles checked via a secondary listing). 2023. https://www.iso.org/standard/42001 (verified: secondary)
[29] NIST AI RMF Playbook, GOVERN (1.7 decommissioning and phasing out safely; 6.1 third-party risk policies; 6.2 contingency for failures in high-risk third-party systems). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] NIST AI RMF Playbook, MANAGE (2.4 supersede, disengage or deactivate; 3.1 third-party risks monitored; 3.2 pre-trained models monitored; 4.1 post-deployment monitoring plans; 4.3 incidents communicated, including to affected communities). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[31] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[32] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[33] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[34] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[35] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[36] Digital Operational Resilience Act (DORA): in application since 17 Jan 2025; register of information; ICT third-party risk. EIOPA. 2025. https://www.eiopa.europa.eu/digital-operational-resilience-act-dora_en (verified: primary)
[37] Regulation (EU) 2022/2554 (DORA), Art. 28(3) register of information on ICT third-party arrangements and Art. 28(8) exit strategies for ICT services supporting critical or important functions. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng#art_28 (verified: primary)
[38] Directive (EU) 2022/2555 (NIS2), Art. 21(2)(c) business continuity, backup management, disaster recovery and crisis management, and (d) supply-chain security. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng#art_21 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 19(1) (providers keep automatically generated logs for at least six months). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_19 (verified: primary)
[40] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 18(1) (providers keep documentation for 10 years after placing on the market or putting into service). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_18 (verified: primary)
[41] AI Safety Governance Framework 3.0, §5.3 operators' guidelines (logs kept for at least six months and audited; voluntary). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[42] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[43] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority without undue delay and, where feasible, within 72 hours). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_33 (verified: primary)
[44] Regulation (EU) 2016/679 (GDPR), Art. 34(1) (communication of a breach likely to result in a high risk to the data subject without undue delay). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_34 (verified: primary)
[45] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 20(1) (providers take corrective action: bring into conformity, withdraw, disable or recall; inform distributors and deployers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_20 (verified: primary)
[46] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 79 (procedure for AI systems presenting a risk to health, safety or fundamental rights). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_79 (verified: primary)
