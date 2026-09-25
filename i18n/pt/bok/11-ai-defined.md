---
lang: pt
source: bok/11-ai-defined.md
sourceHash: "22aa065addac570dc901cead7669db00821af938af30615db31b2b35b900ba68"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 11. IA, definida para governação

> O que é um sistema de IA para fins de governação: as definições que estabelecem o âmbito, os tipos
> de IA e as características que quebram a governação clássica, cada uma transformada num campo de
> registo, um controlo e evidência.

Uma função de governação não pode governar o que não definiu. Antes de um registo poder listar
sistemas de IA, antes de uma admissão poder classificá-los e antes de uma política poder
vinculá-los, alguém tem de decidir quais os sistemas que contam. Essa decisão não é um exercício de
glossário. É o primeiro controlo no stack: decide o que entra no **registo de agentes** (camada 02),
quais as obrigações para as quais a admissão encaminha um sistema e quais os sistemas deixados fora
de todos os outros controlos neste livro. Se errar numa direção, um modelo de pontuação escapa à
revisão porque alguém o chamou "apenas estatística". Se errar na outra, o registo enche-se de macros
de folha de cálculo, o sinal afoga-se e os proprietários deixam de o ler.

Este capítulo compara as quatro definições que estabelecem o âmbito, transforma cada um dos seus
elementos num campo de registo, separa IA de software determinístico, ordena os tipos de IA pelos
controlos que alteram e nomeia as características que fazem falhar a governação clássica de TI.
Encerra com duas coisas normalmente deixadas como prosa: governar saídas probabilísticas e rastrear
os conjuntos de princípios de IA responsável publicados até aos artefatos. Não é um manual de
aprendizagem automática: uma técnica importa aqui apenas quando altera um controlo, um proprietário
ou uma peça de evidência.

## Por que a definição é um controlo

Duas decisões situam-se na frente de cada admissão, e são decisões diferentes. A primeira é
**definitória**: isto é um sistema de IA? A segunda é **classificatória**: dado que é, quais as
obrigações e quais os controlos que se aplicam? A maioria da lei e a maioria dos programas de
governação tratam a primeira como um portão para a segunda. Sob o Regulamento da IA da UE, a
definição é literalmente o âmbito da regulamentação: o Regulamento aplica-se apenas aos sistemas que
cumprem a definição no Artigo 3(1), e essa definição tem estado em vigor desde 2 de fevereiro de
2025 [1]. A mesma orientação da Comissão tem o cuidado de acrescentar que "a grande maioria dos
sistemas, mesmo que se qualifiquem como sistemas de IA", não terá obrigações sob o Regulamento [1].
Assim, um sistema pode estar dentro da definição e fora de cada dever; um engenheiro de governação
precisa de ambas as respostas, registadas separadamente, com o raciocínio anexado.

Trate a resposta definitória como um controlo como qualquer outro neste livro. Tem um proprietário
(o [fluxo de trabalho de admissão](/bok/the-role#intake-and-classification)). Funciona no ponto mais
cedo em que pode bloquear: na admissão, não na revisão pré-lançamento. Deixa evidência: um registo
de decisão nomeando a definição aplicada, os elementos encontrados, quem ou o que decidiu e quando.
E é revisitado quando o sistema muda, porque um motor de regras que ganha um componente aprendido
cruza a linha sem que ninguém apresente um ticket.

> **Na prática (ilustrativo)**
> Numa grande empresa de telecomunicações, a primeira passagem de admissão pediu às equipas que se
> auto-declarassem "IA ou não". A auto-declaração produziu ambos os modos de falha ao mesmo tempo:
> um modelo de propensão de churn registado como "análise" e uma macro de encaminhamento por
> palavra-chave registada como "IA". Substituir a pergunta sim/não pelas perguntas de elementos
> abaixo, cada uma respondida no registo com uma razão de uma linha, moveu a decisão de opinião para
> registo. Os desacordos tornaram-se diffs no registo de decisão, revistos como qualquer outra
> mudança.

## Quatro definições, comparadas

Quatro textos estabelecem o âmbito para a maioria das organizações: a definição da OCDE, a definição
do Regulamento da IA da UE com a orientação da Comissão sobre ela, ISO/IEC 22989 e NIST AI 100-1.
São mais próximas do que as jurisdições dos seus autores sugerem, por conceção, e as diferenças que
permanecem são exatamente as que alteram uma decisão de âmbito.

### A definição da OCDE (revisão de 2023)

O capítulo 22 coloca
[a definição e ciclo de vida da OCDE](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle)
nos instrumentos mais amplos da OCDE. O Conselho da OCDE reviu a sua definição em 8 de novembro de
2023, antes da revisão mais ampla de cinco anos dos Princípios de IA, em parte para apoiar o
alinhamento com definições então a ser escritas na UE, Japão e noutros locais [2][3]. Agora lê-se:
"Um sistema de IA é um sistema baseado em máquinas que, para objetivos explícitos ou implícitos,
infere, a partir da entrada que recebe, como gerar saídas tais como previsões, conteúdo,
recomendações ou decisões que podem influenciar ambientes físicos ou virtuais. Diferentes sistemas
de IA variam nos seus níveis de autonomia e adaptabilidade após implantação." [3]

Contra o texto de 2019, a revisão fez quatro mudanças que importam para o âmbito: eliminou "definido
pelo ser humano" dos objetivos (os objetivos podem agora ser implícitos), fez da **inferência** o
ato definidor, adicionou **conteúdo** como uma saída (o caso generativo) e adicionou
**adaptabilidade** após implantação [3]. O seu memorando explicativo (que não faz parte da
Recomendação) lê a autonomia como o grau em que um sistema pode "aprender ou agir sem envolvimento
humano" uma vez que as pessoas delegaram nele, e a adaptabilidade como a mudança contínua de
sistemas de aprendizagem automática após desenvolvimento inicial, tal como um reconhecedor de fala
adaptando-se a uma voz [3].

### Artigo 3(1) do Regulamento da IA da UE e as orientações da Comissão

O Capítulo 18 estabelece
[a definição legal de um sistema de IA](/bok/eu-ai-act#what-counts-as-an-ai-system) no âmbito de
aplicação do Regulamento. O Artigo 3.º(1) do Regulamento da IA segue de perto o texto da OCDE:
"'sistema de IA' significa um sistema baseado em máquinas que é concebido para funcionar com
diferentes níveis de autonomia e que pode apresentar adaptabilidade após a implantação, e que, para
objetivos explícitos ou implícitos, infere, a partir dos dados que recebe, como gerar resultados
como previsões, conteúdo, recomendações ou decisões que podem influenciar ambientes físicos ou
virtuais" [4]. O Considerando 12 explica a intenção: a definição deve distinguir a IA de "sistemas
de software tradicional mais simples ou abordagens de programação" e não deve abranger sistemas
baseados em regras definidas unicamente por pessoas singulares para executar operações
automaticamente [5]. As técnicas que permitem a inferência incluem aprendizagem automática e
"abordagens baseadas em lógica e conhecimento" [5].

As orientações da Comissão sobre a definição decompõem-na em sete elementos: (1) um sistema baseado
em máquinas; (2) concebido para funcionar com diferentes níveis de autonomia; (3) que pode
apresentar adaptabilidade após a implantação; (4) para objetivos explícitos ou implícitos; (5)
infere, a partir dos dados que recebe, como gerar resultados; (6) como previsões, conteúdo,
recomendações ou decisões; (7) que podem influenciar ambientes físicos ou virtuais [1]. Cinco das
suas interpretações alteram o funcionamento de uma admissão:

- **A inferência é a condição indispensável**; as orientações chamam-lhe "uma condição-chave,
  indispensável, que distingue os sistemas de IA de outros tipos de sistemas" [1].
- **A autonomia é necessária mas o limiar é baixo.** Apenas os sistemas concebidos para funcionar
  "unicamente com envolvimento e intervenção manual humana completa" são excluídos; um sistema que
  produz um resultado a partir de dados de entrada fornecidos manualmente, sem que esse resultado
  seja especificado por uma pessoa, já tem "algum grau de independência de ação" [1].
- **A adaptabilidade é opcional.** A palavra "pode" torna a auto-aprendizagem após a implantação
  "uma condição facultativa e, portanto, não uma condição decisiva" [1]. Um modelo congelado
  continua a ser um sistema de IA.
- **Os objetivos não são a finalidade prevista.** Os objetivos são internos ao sistema; a finalidade
  prevista (Art. 3.º(12)) é o contexto externo de utilização [1], e o contexto é aquilo em que se
  baseia um nível de risco.
- **Os elementos não precisam estar todos presentes em ambas as fases.** A definição adota uma
  perspetiva de ciclo de vida: alguns elementos podem aparecer na fase de construção e não na fase
  de utilização [1].

As orientações também nomeiam quatro famílias que caem fora da definição apesar de alguma capacidade
de inferência: sistemas que melhoram ou aceleram a otimização matemática clássica;
**processamento básico de dados** (consultas de base de dados, folhas de cálculo sem funções de IA,
painéis descritivos); sistemas baseados em **heurísticas clássicas** (um motor de xadrez usando
minimax com uma função de avaliação escrita à mão); e **sistemas de previsão simples** cujo
desempenho uma regra estatística básica poderia igualar, como uma linha de base que prevê sempre a
média histórica [1]. Deixam explícito que "nenhuma determinação automática ou listas exaustivas" são
possíveis e que cada sistema é avaliado pela sua arquitetura e funcionalidade [1]. Também não são
vinculativas; apenas o Tribunal de Justiça da UE pode dar uma interpretação autorizada [1].

### ISO/IEC 22989

ISO/IEC 22989:2022 é a norma de terminologia em que o resto da família ISO/IEC AI se baseia [6]. A
sua definição de um sistema de IA (termo 3.1.4) é mais curta e de forma mais antiga: um sistema de
engenharia cujos resultados, desde conteúdo a decisões, servem objetivos que as pessoas estabelecem
[6]. A inferência e a adaptabilidade não fazem parte dela. A sua contribuição mais útil para a
governação é o vocabulário que os outros textos não têm. Separa **automação**, que varia em grau, de
**autonomia**, uma propriedade muito mais forte que reserva para sistemas que podem alterar o seu
próprio objetivo ou domínio de utilização sem que ninguém os dirija; o oposto de autonomia é
**heteronomia**, e a cláusula 5.13 trata os três em conjunto [6]. Também nomeia os papéis das partes
interessadas em torno de um sistema de IA (prestador, produtor, cliente, parceiro, sujeito e
autoridades relevantes, cláusula 5.19) [6]. Uma alteração sobre IA generativa (ISO/IEC
22989:2022/FDAmd 1) está em fase de projeto final: o seu FDIS foi registado para aprovação formal em
18 de setembro de 2026, e não está publicado a partir de 2026-09-24 [7].

A palavra "autonomia" significa, portanto, duas coisas diferentes nos textos. No Regulamento da IA e
no texto da OCDE é um grau de independência de ação, e quase todos os sistemas têm algum. Na ISO/IEC
22989 é uma propriedade forte que a maioria dos sistemas implantados não tem. Um registo que regista
"autónomo: sim" não registou nada até dizer em que sentido o significa.

### NIST AI 100-1

O NIST AI Risk Management Framework (NIST AI 100-1, janeiro de 2023) "refere-se a um sistema de IA
como um sistema de engenharia ou baseado em máquinas que pode, para um dado conjunto de objetivos,
gerar resultados como previsões, recomendações ou decisões que influenciam ambientes reais ou
virtuais", concebido para funcionar com diferentes níveis de autonomia, e afirma que adapta o texto
de 2019 da OCDE e ISO/IEC 22989 [8]. Precede a revisão da OCDE, portanto não tem "infere", não tem
"conteúdo" e não tem adaptabilidade. O seu peso para a governação situa-se noutro lugar: o Apêndice
B lista como os riscos de IA diferem dos riscos de software tradicional, que é a espinha dorsal da
tabela de características mais adiante neste capítulo [8].

### As definições lado a lado

| Elemento | OECD (2023) | Regulamento da IA UE Art. 3.º(1) | ISO/IEC 22989:2022 | NIST AI 100-1 (2023) |
|---|---|---|---|---|
| Substrato | Baseado em máquinas | Baseado em máquinas | Sistema de engenharia | Sistema de engenharia ou baseado em máquinas |
| Objetivos | Explícitos ou implícitos | Explícitos ou implícitos | Definidos por humanos | "Um dado conjunto de objetivos" |
| Inferência | Ato definidor | Ato definidor; indispensável segundo as orientações | Não na definição | Não na definição |
| Resultados | Previsões, conteúdo, recomendações, decisões | Os mesmos quatro | Conteúdo, previsões, recomendações, decisões | Previsões, recomendações, decisões |
| Efeito | Ambientes físicos ou virtuais | Ambientes físicos ou virtuais | Não na definição | Ambientes reais ou virtuais |
| Autonomia | Varia por sistema | Concebida para diferentes níveis; necessária | A automação varia; a autonomia é uma propriedade forte e separada | Diferentes níveis |
| Adaptabilidade | Varia por sistema | "Pode"; não decisiva | Não na definição | Não na definição |

Fontes: [3][4][1][6][8].

Duas conclusões práticas decorrem. Com qualquer exposição à UE, o texto do Regulamento da IA lido
com as orientações da Comissão é o teste operativo, e o texto da OCDE é o seu gémeo noutro lugar. E
os testes não são intercambiáveis: um sistema que o vocabulário ISO/IEC 22989 ou NIST chamaria IA
pode ainda situar-se numa das famílias excluídas das orientações. Registe qual teste aplicou.

## Do elemento de definição ao campo de registo

Cada elemento da definição é uma pergunta que a admissão faz e um campo que o registo mantém. A
resposta ao elemento também impulsiona uma decisão posterior, razão pela qual o campo merece o seu
lugar: um campo que nenhuma decisão lê é um campo que ninguém manterá.

| Elemento | Pergunta de admissão | Campo de registo (ilustrativo) | Decisão de âmbito ou controlo que impulsiona |
|---|---|---|---|
| Baseado em máquinas | Onde é executado e quem opera o tempo de execução? | `substrate` (`cloud-api`, `self-hosted`, `on-device`, `embedded`) | Quais controlos de tempo de execução são possíveis (camada 04); se a rota de segurança do produto pode aplicar-se |
| Objetivos | Para que está o sistema a otimizar? | `objective` | Qual avaliação mede o sucesso; onde a exploração de recompensas ou alvos substitutos podem esconder-se |
| Finalidade prevista | Em que contexto, para quem, é utilizado? | `intended_purpose` | Nível de risco e obrigações; o gatilho FRIA ou AIPD |
| Inferência | Deriva resultados por aprendizagem ou por conhecimento codificado, em vez de por regras que as pessoas escreveram? | `inference_technique` (`ml.supervised`, `ml.self-supervised`, `logic-based`, `none` …) | Dentro ou fora da definição de IA; qual família excluída, se houver |
| Resultados | Previsão, conteúdo, recomendação ou decisão? | `output_types` | Conteúdo: análise de marcação e divulgação (Art. 50); decisão: deveres de explicação e revisão humana (Art. 86, RGPD Art. 22) |
| Efeito | Altera um ambiente físico ou virtual, e através de quê? | `effect_surface` (`display`, `tools`, `actuator`) | Ferramentas: registo de agentes, credenciais com âmbito; atuador: parar num estado seguro |
| Autonomia | O que acontece entre resultado e efeito sem uma pessoa? | `autonomy_level` (0–4, abaixo) | Design de supervisão humana, colocação de porta, kill switch |
| Adaptabilidade | O comportamento pode mudar em utilização sem uma versão? | `adapts_in_use`, `change_triggers` | Gatilhos de re-avaliação; [monitorização de desvio](/patterns/drift-fairness-monitor); controlos de ciclo de retroalimentação (Art. 15.º(4)) |

Fontes para os ganchos legais: [9][10][11][12].

Duas linhas merecem uma nota. As equipas frequentemente colapsam **objetivo** em
**finalidade prevista**. O próprio exemplo das orientações é um assistente corporativo cujo objetivo
é responder com precisão a perguntas sobre um conjunto de documentos e cuja finalidade prevista é
apoiar as tarefas de um departamento [1]. O primeiro diz-lhe o que avaliar; o segundo diz-lhe para
que a lei pensa que o sistema é. Um modelo inalterado movido para uma nova finalidade prevista é,
para fins de risco, um novo sistema. E a linha de **resultados** regista o resultado *tal como
utilizado*: as orientações observam que uma recomendação "aplicada automaticamente" torna-se uma
decisão [1], portanto um modelo que recomenda mais um pipeline que aprova automaticamente é, em
conjunto, um sistema de decisão.

Um campo de autonomia precisa de uma escala. Não há uma norma; a escala abaixo é ilustrativa e
mapeia o vocabulário de supervisão do Grupo de Peritos de Alto Nível da UE (humano no ciclo, humano
no circuito, humano no comando) [13].

| Nível | Nome | O que acontece entre resultado e efeito | Modo de supervisão |
|---|---|---|---|
| 0 | Consultivo | Uma pessoa lê o resultado e decide | Humano no comando |
| 1 | Assistido | O sistema redige; uma pessoa aprova cada ação | Humano no ciclo |
| 2 | Ação limitada | O sistema atua dentro de um âmbito declarado; ações consequentes passam uma porta | No ciclo para ações com porta |
| 3 | Autonomia supervisionada | O sistema atua; as pessoas monitorizam e podem pará-lo | Humano no circuito |
| 4 | Não supervisionada | O sistema atua sem supervisão rotineira | Nenhuma rotineira; apenas kill switch |

> **Exemplo (ilustrativo)**
> Os campos de âmbito de `csa-01`, o assistente de atendimento ao cliente utilizado em todo este
> livro, tal como o seu registo de registo os regista. A decisão definitória e o nível de risco são
> registos separados.

```yaml
id: csa-01
definition_basis: eu-ai-act-art-3-1+commission-guidelines
definition_decision: in_scope        # in_scope | out_of_scope | undecided
definition_reason: "LLM infers replies from customer messages; generates content and
  recommendations; calls tools. Not basic data processing or classical heuristics."
decided_by: intake-pipeline + ai-governance-review
decided_on: 2026-09-18
substrate: cloud-api
objective: "answer order and refund questions accurately from the knowledge base"
intended_purpose: "first-line support for retail customers in the EU"
inference_technique: [ml.self-supervised, ml.rlhf, retrieval]
output_types: [content, recommendation]
effect_surface: tools
tools: [refunds:read, orders:read]
autonomy_level: 2
adapts_in_use: false
change_triggers: [vendor-model-version, prompt-change, corpus-snapshot]
kind: [generative, rag, agentic]
```

As decisões fora do âmbito importam tanto quanto as dentro do âmbito. Um motor de regras de
elegibilidade de reembolso cujo cada ramo uma pessoa escreveu recebe também uma entrada de registo,
marcada `out_of_scope` com a razão ("processamento básico de dados; regras definidas unicamente por
pessoas"). Essa entrada é o que permite mostrar a um auditor que olhou, e o que torna uma mudança
posterior (alguém adiciona uma pontuação de fraude aprendida ao motor) visível como uma diferença.

## IA versus software convencional

A linha entre IA e software convencional é a linha entre comportamento que alguém especificou e
comportamento que alguém induziu. O Considerando 12 desenha-a no mesmo lugar: regras definidas
unicamente por pessoas não são IA; inferência a partir de dados ou de conhecimento codificado é [5].
Para a governação, a diferença não é filosófica. Cada linha abaixo é um controlo que a governação
clássica de TI executa e que deixa de funcionar.

| Propriedade | Software determinístico convencional | Sistema de IA | Consequência para a governação |
|---|---|---|---|
| De onde vem o comportamento | Regras escritas por pessoas | Aprendidas a partir de dados ou inferidas a partir de conhecimento codificado | Reveja os dados e as avaliações, não apenas o código |
| Mesma entrada, mesma saída | Sim, por construção | Não garantido; a geração pode variar mesmo com temperatura zero [14] | A evidência fixa a versão e as definições de amostragem; as avaliações repetem-se |
| O que "correto" significa | Corresponde a uma especificação | Cumpre uma taxa de erro numa distribuição | Limiares substituem aprovado/reprovado; os limiares precisam de proprietários |
| Como é testado | Testes unitários e de integração contra a especificação | Avaliações sobre amostras; a cobertura é estatística | A suite de avaliação é em si um artefato governado |
| O que muda o comportamento | Uma diferença de código | Uma diferença de código, novos pesos, novos dados, uma edição de prompt, uma atualização de corpus, uma atualização de fornecedor | A gestão de mudanças dispara em todos eles |
| Como falha | Um bug reproduzível | Um modo de falha que aparece em algumas entradas, por vezes, em escala | Monitorize as taxas em produção, não apenas incidentes |
| Como o explica | Leia o código | Os internos não são legíveis por humanos | As explicações são produzidas, registadas e testadas |

Duas ressalvas mantêm a tabela honesta. Primeiro, a fronteira é legal bem como técnica, e a lei
desenha-a com alguma falta de clareza: um sistema especialista baseado em lógica que infere
conclusões a partir de conhecimento médico codificado está dentro da definição do Regulamento da IA,
enquanto um motor de xadrez heurístico está fora dele [1]. Registe o raciocínio, porque o próximo
revisor desenha a linha novamente. Segundo, "não IA" não é "não governado". A automatização
determinística pode prejudicar em escala por si só, e a lei de proteção de dados dá às pessoas o
direito de não serem sujeitas a uma decisão "baseada unicamente no tratamento automatizado" com
efeitos legais ou similarmente significativos, independentemente de qualquer definição de IA ser
cumprida [11]. A decisão definitória encaminha um sistema para os controlos específicos de IA; não
isenta nada mais (ver [Privacidade e IA](/bok/privacy-and-ai#principles-applied-to-ai)).

> **Nota**
> Um **modelo** não é um **sistema**, e nenhum deles é um **agente**. O Regulamento da IA define o
> sistema de IA (Art. 3(1)) e, separadamente, o modelo de IA de finalidade geral (Art. 3(63)) e o
> sistema de IA de finalidade geral construído sobre um (Art. 3(66)) [4]. O registo mantém ambos os
> níveis e liga-os: um modelo pode estar dentro de muitos sistemas, e os
> [cinco objetos de governação](/bok/definition#the-object-of-governance) do capítulo 01 precisam
> cada um da sua própria entrada.

## Tipos de IA que mudam o problema de governação

As taxonomias de IA são abundantes. O teste aplicado aqui é estreito: saber o tipo muda um controlo,
um proprietário ou a evidência? Quando não muda, a taxonomia é mencionada e posta de lado.

### Por capacidade e por funcionalidade

A escada de capacidades (IA estreita, inteligência artificial geral, superinteligência) é a mais
citada e a menos útil para controlos. Cada sistema implantado é estreito no sentido que importa; não
há uma definição acordada de inteligência geral, e as propostas de investigação para a
operacionalizar fazem-no através de níveis de desempenho, generalidade e autonomia em vez de um
único limiar [15]. A lei contornou a questão com proxies que pode medir. O Regulamento da IA regula
o **modelo de IA de finalidade geral**, um que "apresenta generalidade significativa" e é "capaz de
desempenhar competentemente uma vasta gama de tarefas distintas", incluindo modelos treinados em
dados grandes "usando auto-supervisão em escala" [4], e presume "capacidades de elevado impacto"
quando o cálculo de treino excede 10^25 operações de ponto flutuante [16]. As diretrizes GPAI da
Comissão adicionam um critério indicativo para o próprio estatuto de finalidade geral: cálculo de
treino acima de 10^23 FLOP e a capacidade de gerar linguagem, texto para imagem ou texto para vídeo
[17]. Para o registo, a capacidade torna-se portanto dois campos mensuráveis, `model_generality` e
`training_compute_flop`, ambos normalmente retirados da documentação do prestador em vez de medidos
internamente.

A taxonomia de funcionalidade (máquinas reativas, memória limitada, teoria da mente,
autoconsciência) vem de um artigo popular de 2016 [18]. Apenas os dois primeiros descrevem sistemas
que existem, e nenhum mapeia para um controlo; reconheça-o, mas não o faça um campo de registo.

### Por paradigma de aprendizagem

O paradigma de aprendizagem diz-lhe de onde veio o comportamento, e portanto de onde a sua evidência
deve vir.

| Paradigma | Como aprende | Risco de governação que adiciona | Controlo que o responde |
|---|---|---|---|
| Supervisionada | A partir de exemplos etiquetados | As etiquetas codificam decisões humanas passadas, os seus erros e o seu enviesamento; proxies para características protegidas | Proveniência de etiquetas na ficha de dados; avaliações de subgrupo no eval gate |
| Não supervisionada | Encontra estrutura sem etiquetas (clusters, anomalias) | Sem verdade fundamental para testar; os segmentos podem rastrear características protegidas | Testes de estabilidade; revisão humana das definições de segmento antes da utilização |
| Semi-supervisionada | Propaga algumas etiquetas através de dados não etiquetados | Os erros de etiqueta propagam-se silenciosamente | Audite uma amostra de etiquetas propagadas |
| Auto-supervisionada | Prevê partes da sua própria entrada (o próximo token) em grandes corpora | A proveniência do corpus, direitos e memorização são difíceis de rastrear | AIBOM com proveniência de dataset; o resumo de conteúdo de treino GPAI (ver [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Reforço, incluindo a partir de feedback humano | Maximiza um sinal de recompensa | **Exploração de recompensa**: o sistema encontra uma forma não intencional de pontuar [19] | Registe a recompensa como `objective`; avaliações que procuram estratégias não intencionais |
| Em contexto (zero-shot e few-shot) | Segue instruções e exemplos no prompt no tempo de inferência | O comportamento muda com uma edição de prompt, sem retreinamento envolvido | Prompts versionados como artefatos governados; eval gate na mudança de prompt |

### Por família de tecnologia

| Família | Exemplo | O que muda para a governação |
|---|---|---|
| Aprendizagem automática clássica | Pontuação de crédito com gradient boosting em dados tabulares | Calibração e erro de subgrupo dominam a suite de avaliação |
| Aprendizagem profunda | Classificador de imagem | Opacidade; entradas adversariais; custo de cálculo e evidência mais elevado |
| Processamento de linguagem natural | Triagem de reclamações; assistentes LLM | O texto carrega dados pessoais e, para LLMs, instruções que um atacante pode plantar |
| Visão computacional | Reconhecimento de documentos ou faces | Os dados biométricos levantam questões de categorias especiais e práticas proibidas (ver [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) |
| Fala | Transcrição de chamadas; síntese de voz | A voz é dados pessoais; o áudio sintético deve ser marcado (Art. 50) [9] |
| Robótica e ciber-física | Robô de armazém | Efeito físico: a paragem deve trazer o sistema para um estado seguro (Art. 14(4)(e)) [20] |
| Baseada em lógica e conhecimento | Sistema especialista para suporte ao diagnóstico | Dentro da definição do Regulamento da IA quando infere a partir de conhecimento codificado [1]; "é apenas regras" não é uma isenção |

### Preditiva versus generativa

Um sistema **preditivo** (ou discriminativo) produz uma estimativa sobre algo que existe: uma
pontuação, uma classe, uma previsão. Os seus danos são danos de alocação (uma estimativa errada ou
enviesada coloca uma pessoa na fila errada), e a sua evidência é precisão, calibração e taxas de
erro por subgrupo.

Um sistema **generativo** produz algo novo: texto, imagem, áudio, vídeo, código. Os seus danos são
diferentes em tipo. O perfil de IA generativa do NIST lista doze riscos que a IA generativa cria ou
agrava, entre eles **confabulação** ("a produção de conteúdo errado ou falso afirmado com
confiança"), integridade da informação, propriedade intelectual, privacidade de dados, enviesamento
prejudicial e homogeneização, e conteúdo obsceno ou abusivo incluindo material de abuso sexual
infantil sintético [21]. A evidência muda em conformidade: avaliações de fundamentação e recusa,
red-teaming, guardrails de saída e, sob o Regulamento da IA, marcação legível por máquina de saída
sintética [9]. Um conjunto de controlo não se adequa a ambos: um limiar de calibração não significa
nada para texto gerado, e uma avaliação de fundamentação nada para uma pontuação de crédito.

### Modelos de fundação e GPAI

Um **modelo de fundação** é um "treinado em dados amplos em escala" e "adaptável a uma vasta gama de
tarefas a jusante" [22]. O facto de governação sobre modelos de fundação é herança: nas palavras do
artigo original, "os defeitos do modelo de fundação são herdados por todos os modelos adaptados a
jusante" [22]. A maioria das organizações chama um através de uma API ou adapta um de peso aberto,
portanto a evidência move-se de produzida para recolhida: a ficha de modelo e avaliações do
prestador tornam-se entradas na sua entrada de registo, e a versão que fixa torna-se uma mudança que
gere (ver [IA de terceiros e procurada](/bok/the-stack#third-party-and-procured-ai) e o
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)). GPAI é a categoria
legal mais próxima do Regulamento da IA, com os seus próprios deveres no prestador do modelo (ver
[GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice)).

### LLMs e SLMs

Um **modelo de linguagem grande (LLM)** é um modelo de fundação para linguagem, normalmente servido
a partir de um centro de dados. Um **modelo de linguagem pequeno (SLM)** troca amplitude por tamanho
para que possa funcionar perto do utilizador; um relatório técnico de 2024 descreve um modelo de 3,8
mil milhões de parâmetros "pequeno o suficiente para ser implantado num telefone" [23]. A diferença
de governação é onde os controlos vivem. Um LLM atrás de uma API fica atrás de um gateway que
controla, onde cada chamada pode ser rastreada, filtrada e parada. Um SLM num dispositivo funciona
onde a sua telemetria pode não chegar: os seus guardrails enviam-se com ele, o seu inventário é uma
frota de dispositivos e o seu kill switch é uma bandeira remota ou uma atualização de aplicação, com
o atraso que isso implica.

### Modelos multimodais

Um modelo **multimodal** recebe ou produz mais de uma modalidade (texto, imagem, áudio, vídeo). As
imagens e áudio podem carregar dados pessoais que o pipeline de texto nunca viu e instruções que os
filtros de texto nunca varreram, e imagens, áudio e vídeo sintéticos levantam os deveres de marcação
do Artigo 50 [9]. Portanto, os guardrails existem por modalidade, e a suite de avaliação inclui
casos multimodais.

### Sistemas RAG

**Geração aumentada por recuperação (RAG)** combina a memória aprendida ("paramétrica") de um modelo
com um armazenamento recuperável ("não-paramétrico") de documentos, originalmente um índice de
vetores densos [24]. Os seus autores já identificaram a proveniência como um problema em aberto
[24]. Para a governação, o corpus torna-se comportamento: altere os documentos e as respostas
alteram-se sem qualquer mudança no modelo. Assim, o corpus é governado como um modelo, versionado e
fichado, a sua captura ligada à avaliação que o testou (ver
[governação de dados em todo o stack](/bok/the-stack#data-governance-across-the-stack)). A
recuperação também necessita de uma verificação de direitos: um sistema RAG que recupera um
documento que o utilizador não pode ver vazou-o, por mais educada que seja a resposta.

### Sistemas agentic

Um **sistema agentic** planeia e atua: chama ferramentas, navega, executa código e move dados sob
autoridade delegada, frequentemente em múltiplos passos. Altera mais o problema de governação,
porque o seu resultado é um efeito num sistema de registos, não uma recomendação que uma pessoa lê.
As ameaças estão catalogadas no OWASP Top 10 for Agentic Applications [25], e os controlos são o
conjunto da camada 04: identidade, âmbito, mediação de ferramentas, portas humanas e uma paragem
testada ([Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials),
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker),
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)). O tratamento completo está em
[Governing agents](/bok/governing-agents#what-makes-an-agent-a-governance-object).

### Por que o tipo importa: o conjunto de controlos por tipo

| Tipo | Dano distintivo | Controlo que muda | Camada · padrão |
|---|---|---|---|
| Preditivo ou de pontuação | Alocação errada ou enviesada | Avaliações de calibração e subgrupo; uma política de limiar com um proprietário | 03 · [Eval Gate in CI](/patterns/eval-gate-in-ci); 01 · [Policy Card](/patterns/policy-card) |
| Generativo | Confabulação, PI, integridade da informação, conteúdo abusivo | Avaliações de fundamentação e red-team; guardrails de resultado; marcação de conteúdo | 03 · [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite); 04 · [Runtime Guardrail](/patterns/runtime-guardrail) |
| Modelo de fundação ou GPAI, adquirido | Defeitos herdados; evidência que não pode produzir | Diligência devida; fixação de versão; modelo base no AIBOM | 02 · [AIBOM](/patterns/aibom); Vendor / Model Due-Diligence Gate |
| SLM no dispositivo | Sem telemetria central; atraso de atualização | Guardrails enviados com o modelo; inventário de versão ao nível do dispositivo | 02 · [Agent Registry](/patterns/agent-registry); 04 · Kill Switch |
| Multimodal | Novos canais de injeção e dados pessoais | Guardrails por modalidade; avaliações cross-modais; marcação | 04 · Runtime Guardrail; 03 · Red-Team Suite |
| RAG | Alterações do corpus alteram o comportamento; recuperação vaza | Corpus como dados governados; verificação de direitos na recuperação; avaliações de fundamentação | 02 · ficha de dados; 04 · Runtime Guardrail |
| Agentic | Ações sob autoridade delegada | Identidade, âmbito, portas humanas, paragem testada | 04 · Agent Identity & Scoped Credentials; Kill Switch; Human-in-the-loop Gate |

Os tipos combinam-se. `csa-01` é generativo, aumentado por recuperação e agentic simultaneamente,
pelo que carrega todos os controlos das três linhas; o campo `kind` do registo é uma lista, não um
valor único.

## Oito características que quebram a governação clássica de TI

A governação clássica de TI (gestão de mudanças, portas SDLC, controlo de acesso, o sistema de
gestão de segurança, auditoria periódica) assume que o comportamento é especificado, uma mudança é
um diff de código, um teste passa ou falha contra uma especificação, uma pessoa está por trás de
cada ação consequente e o sistema faz hoje o que fez ontem. A IA quebra cada suposição em algum
lugar. O Apêndice B do NIST lista as formas como o risco de IA difere do risco de software
tradicional, desde dados que podem não representar o contexto de utilização, através de escala e
complexidade com "mil milhões ou até biliões de pontos de decisão", até "opacidade aumentada",
deriva que exige manutenção mais frequente e a "incapacidade de prever ou detetar os efeitos
secundários de sistemas baseados em IA para além de medidas estatísticas" [8]. A tabela transforma
essa lista nas oito características que um engenheiro tem de projetar.

| Característica | Por que a governação clássica de TI falha | O que a responde (camada · padrão) | Evidência que emite |
|---|---|---|---|
| **Complexidade** | A CMDB regista a aplicação; o modelo, conjuntos de dados, prompts, corpus de recuperação e gráfico de ferramentas dentro dela são invisíveis | 02 · AIBOM, Agent Registry | Um AIBOM por compilação; ligações de registo de sistema a modelo a dados |
| **Opacidade** | A revisão de código assume que a lógica é legível; os internos do modelo não são | 03 · avaliações comportamentais; 02 · [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Resultados de avaliação contra modos de falha nomeados; explicações registadas |
| **Autonomia** | O controlo de acesso e a segregação de funções assumem uma pessoa por trás de cada sessão | 04 · Agent Identity & Scoped Credentials; Human-in-the-loop Gate; Kill Switch | Eventos de identidade; decisões de porta com aprovador; registos de exercício de kill-switch |
| **Velocidade e escala** | A revisão periódica baseada em amostra chega depois de um erro ter-se repetido um milhão de vezes | 04 · Runtime Guardrail, Kill Switch / Circuit Breaker; 05 · [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Decisões de guardrail; disjuntor dispara; registos de reversão |
| **Resultados probabilísticos** | Os testes são passar/falhar contra uma especificação; uma única resposta errada é um erro | 03 · Eval Gate in CI com limiares; 01 · Policy Card por nível de risco | Resultados de calibração e limiar por versão |
| **Dependência de dados** | A governação de dados protege dados como registos, não como fonte de comportamento | 02 · data card e linhagem; 03 · testes de qualidade de dados e subgrupo | Data card; registo de linhagem; resultados de teste fichados contra a versão do conjunto de dados |
| **Duplo uso e utilização indevida** | Os modelos de ameaça centram-se no acesso não autorizado, não na utilização autorizada para um fim prejudicial | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail; 01 · utilização aceitável como código | Descobertas de red-team; deteções de utilização indevida; vereditos de política |
| **Adaptabilidade e deriva** | A gestão de mudanças dispara em implementações de código; o comportamento muda sem uma | 05 · Continuous Assurance Telemetry; 03 · re-executar a porta em mudança de modelo, dados ou prompt | Alertas de deriva contra a linha de base de avaliação; resultados de re-avaliação |

Algumas linhas precisam de mais do que uma célula.

**A opacidade tem três fontes, e cada uma tem uma correção diferente.** Burrell distingue opacidade
como sigilo corporativo ou estatal intencional, opacidade como analfabetismo técnico, e opacidade
"que surge das características dos algoritmos de aprendizagem automática e da escala necessária para
os aplicar de forma útil" [26]. O sigilo é respondido por contrato e divulgação (documentação do
fornecedor, direitos de auditoria); o analfabetismo por literacia e por explicações escritas para o
seu leitor; apenas o terceiro necessita de métodos de explicação técnica e, acima de tudo, evidência
comportamental. Quando não consegue ler o mecanismo, testa o comportamento, e o resultado da
avaliação torna-se a evidência que se substitui à inspeção. As técnicas de explicação em si estão
cobertas em [Fairness and explainability](/bok/fairness-and-explainability#explanation-techniques).

**O duplo uso é uma propriedade da capacidade, não da intenção.** Investigadores que inverteram o
objetivo de um modelo de toxicidade de descoberta de fármacos, recompensando a toxicidade em vez de
a penalizar, relatam que gerou cerca de 40.000 moléculas tóxicas candidatas em menos de seis horas,
incluindo agentes nervosos conhecidos [27]. Nada foi violado; um utilizador autorizado alterou um
objetivo. É por isso que a utilização indevida precisa do seu próprio modelo de ameaça, casos de
red-team para utilizações prejudiciais de capacidade legítima, e deteção em tempo de execução, não
apenas segurança de perímetro.

**A velocidade e a escala transformam uma pequena taxa de erro em dano em massa.** Uma taxa de erro
de 1% é um erro de arredondamento numa revisão trimestral e dez mil decisões erradas por dia num
sistema que faz um milhão. Assim, as respostas situam-se em tempo de execução: um guardrail por
chamada, um disjuntor que dispara numa taxa, uma reversão testada antes de ser necessária.

**A adaptabilidade é mais ampla do que a auto-aprendizagem.** Para sistemas que continuam a aprender
em utilização, a Lei de IA pede projetos que reduzam o risco de resultados enviesados realimentarem
entradas futuras ("ciclos de retroalimentação") [12]. Mas a maioria das mudanças de comportamento
chega sem auto-aprendizagem: um fornecedor atualiza o modelo por trás de uma API, as entradas
derivam, um prompt é editado, um corpus é atualizado. O retreinamento também pode quebrar o que
funcionava: as redes neurais são propensas a **esquecimento catastrófico**, perdendo competência
anterior quando treinadas em novas tarefas [28]. Cada um é um evento de mudança, e a porta de
avaliação executa em cada um.

### Pares de contraste

Quatro pares são confundidos com frequência suficiente em revisões para valer a pena corrigir no
vocabulário da equipa.

| Par | A diferença | Por que importa para os controlos |
|---|---|---|
| **Complexidade** e **opacidade** | Quantas partes interagem, contra se uma pessoa consegue seguir o raciocínio; uma pequena rede neural é simples e opaca | A complexidade precisa de um inventário; a opacidade precisa de avaliações |
| **Transparência**, **explicabilidade**, **interpretabilidade** | No enquadramento do NIST respondem "o que aconteceu", "como" foi tomada uma decisão e "porquê", com o seu significado para o utilizador [8] | Três artefatos: registos do que executou, um método de explicação, uma mensagem em que o utilizador pode agir |
| **Deriva de dados** e **deriva de conceito** | As entradas mudam, contra a relação entre entradas e a resposta correta mudando | A primeira mostra-se nas entradas; a segunda apenas nos resultados |
| **Privacidade** e **segurança** | Se o processamento de dados pessoais é apropriado, contra se o sistema resiste a ataque | Um sistema seguro ainda pode processar dados que não tem direito de processar |

## Governação de resultados probabilísticos

O software convencional devolve uma resposta. A maioria da IA devolve uma estimativa ou uma amostra,
e alguém tem de decidir o que fazer com ela. Essa decisão é mais frequentemente deixada a um padrão
de um cientista de dados, e é onde a engenharia acrescenta mais.

### Uma pontuação não é uma decisão

Um modelo preditivo emite uma pontuação. Uma decisão é uma pontuação, mais um limiar, mais uma ação
tomada quando a pontuação o ultrapassa. O limiar é onde o apetite de risco se torna comportamento,
pelo que é uma decisão de política com um proprietário, uma versão e uma data efetiva, não um
hiperparâmetro deixado em 0,5. Escreva-o como uma regra [Policy Card](/patterns/policy-card),
teste-o na porta de avaliação e registe-o com cada decisão que produz. Quando um auditor pergunta
por que um candidato foi recusado, "a pontuação era 0,41 e o limiar, propriedade da gestão de risco
de crédito e efetivo desde 1 de outubro, era 0,45" é uma resposta; "o modelo disse não" não é.

### Calibração antes de limiares

Um limiar só significa algo se a pontuação o fizer. Um modelo **calibrado** com 0,9 está certo cerca
de nove em dez vezes. Um estudo amplamente citado descobriu que as redes neurais modernas, ao
contrário das de uma década atrás, são mal calibradas, e que uma correção simples pós-hoc
(temperature scaling) é surpreendentemente eficaz [29]. Assim, a calibração pertence à suite de
avaliação como uma propriedade medida com o seu próprio limiar (um limite de erro de calibração
esperado, por versão e por subgrupo), re-verificado quando o modelo ou a população muda. A Lei de IA
já aponta nesta direção para sistemas de risco elevado: os níveis de precisão e "as métricas de
precisão relevantes" têm de ser declarados nas instruções de utilização [12]. As métricas declaradas
tornam-se a linha de base contra a qual a telemetria em tempo de execução é comparada.

Quando uma única pontuação não é suficiente, a **predição conformal** oferece uma alternativa
disciplinada: transforma o resultado de qualquer modelo treinado num conjunto de respostas
candidatas «garantido conter a verdade fundamental com uma probabilidade especificada pelo
utilizador», sem pressupostos sobre a distribuição dos dados [30]. Um conjunto grande significa que
o modelo está a dizer que tem incerteza, que é exatamente o sinal que uma regra de governação pode
encaminhar.

### Certeza exigida por nível de risco

A certeza que uma decisão necessita depende do custo de estar errado, portanto a regra de execução é
definida pelo nível de risco. Três movimentos recorrem. Uma **banda de abstenção** encaminha
pontuações que não são claramente positivas nem claramente negativas para uma pessoa através de um
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Uma **regra de resultado adverso** envia
cada decisão que prejudica o titular para revisão, por mais confiante que seja o modelo. Uma
**regra de fora da distribuição** recusa ou escalona entradas diferentes de tudo aquilo em que o
sistema foi testado, porque uma pontuação confiante numa entrada desconhecida é o resultado menos
fiável que um modelo produz.

| Nível de risco (ilustrativo) | Regra de execução | Evidência exigida por versão | Papel humano |
|---|---|---|---|
| Baixo (classificação de pesquisa interna) | Agir sobre o resultado principal | Precisão agregada num conjunto dourado | Revisão periódica |
| Moderado (assistente virado para o cliente) | Agir; abster-se e transferir quando a fundamentação ou confiança cai abaixo de um limite | Avaliações de fundamentação, recusa e transferência | No circuito: monitorizar e parar |
| Elevado (decisões sobre o acesso das pessoas a empregos, crédito ou serviços) | Recomendar apenas acima de um limiar calibrado; banda de abstenção e cada resultado adverso para um revisor | Taxas de calibração e erro de subgrupo; métricas de precisão declaradas | No circuito para a banda e resultados adversos; explicação sob pedido |
| Não deve ser automatizado | Sem ação automática; resultado consultivo no máximo, ou a utilização é bloqueada | Um veredicto de política | Em comando |

O papel humano é em si um controlo que pode degradar-se. A supervisão sob carga transforma-se num
carimbo de borracha, e o Regulamento da IA pede que as pessoas que supervisionam sistemas de risco
elevado mantenham consciência do «viés de automação», a tendência de confiar demasiado no resultado
[20]. Portanto, o gate regista o aprovador, o tempo para decidir e a taxa de sobreposição, e uma
taxa de sobreposição decrescente é investigada, não celebrada (ver
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

> **Exemplo (ilustrativo)**
> Uma política de limiar para um modelo de triagem de empréstimos, escrita como uma regra Policy
> Card. Os números são ilustrativos; o ponto é que cada um tem um proprietário e uma data efetiva e
> é testado no gate.

```json
{ "policy_id": "decision-threshold.loan-triage.v3", "subject": "loan-triage-02",
  "risk_tier": "high", "owner": "credit-risk-product", "effective": "2026-10-01",
  "auto_approve_if": "calibrated_score >= 0.92",
  "review_band": [0.55, 0.92], "review_route": "hitl-gate.credit-review",
  "adverse_outcome": "always-human-review",
  "out_of_distribution": "escalate",
  "release_requires": ["calibration.ece <= 0.03", "subgroup.fnr_gap <= 0.02"] }
```

### Resultados generativos e não-determinismo

Os sistemas generativos não têm uma única pontuação para limiar. Os controlos movem-se para
propriedades do resultado: fundamentado nas suas fontes, citado, recusado quando deve ser,
consistente entre amostras. A consistência não pode ser assumida. Um laboratório relata que enviar o
mesmo prompt 1.000 vezes para um modelo grande com temperatura zero produziu 80 conclusões
distintas, e rastreia a variação para o batching da stack de serviço em vez de amostragem [14].
Portanto, a evidência regista a versão do modelo, parâmetros de amostragem e, onde a stack o
permite, a seed; e uma avaliação que importa executa-se em várias amostras e relata uma taxa, não um
único resultado.

## Conjuntos de princípios de IA responsável, engenheirados

Neste livro, **princípio** tem um significado interno: uma das seis regras de método no
[capítulo 03](/bok/values-and-principles#the-six-principles), formulada como algo que fazemos. Os
textos de IA responsável publicados usam a palavra para um alvo normativo, uma propriedade que a IA
deve ter. Esta secção mantém os dois separados. Chama aos publicados **conjuntos de princípios**,
trata-os como frameworks de outras pessoas (na
[desambiguação](/bok/definition#the-disambiguation-cluster) do capítulo 01, a ética define o alvo; a
engenharia atinge-o e prova-o) e coloca uma questão a cada um: qual artefato o evidencia, de qual
camada, sob qual valor interno e princípio. Os conjuntos como frameworks são tratados em detalhe em
[Principles and standards](/bok/principles-and-standards#the-instruments-at-a-glance).

### Quatro conjuntos de princípios em resumo

**Princípios de IA da OCDE.** Adotados em 22 de maio de 2019, com a definição revista em 8 de
novembro de 2023 e os princípios em 3 de maio de 2024, a Recomendação estabelece cinco princípios
baseados em valores: crescimento inclusivo, desenvolvimento sustentável e bem-estar; direitos
humanos e valores democráticos, incluindo equidade e privacidade; transparência e explicabilidade;
robustez, segurança e segurança; e responsabilidade [2]. A revisão de 2024 adicionou pontos que um
engenheiro pode atuar diretamente: mecanismos para que sistemas de IA que «correm o risco de causar
dano indevido ou exibir comportamento indesejado» possam ser «substituídos, reparados e/ou
desativados com segurança»; atenção ao uso indevido e utilizações fora da finalidade prevista;
integridade da informação; e uma referência explícita à sustentabilidade ambiental [2].

**Recomendação da UNESCO sobre a Ética da IA.** Adotada pelos 193 estados-membros da UNESCO em
novembro de 2021, estabelece quatro valores centrais (direitos humanos e dignidade; sociedades
pacíficas, justas e interconectadas; diversidade e inclusividade; florescimento do ambiente e do
ecossistema) e dez princípios, da proporcionalidade e não causar dano através da equidade e
não-discriminação [31]. A sua ferramenta de Avaliação de Impacto Ético, dirigida inicialmente aos
compradores de sistemas de IA, avalia um sistema específico antes e depois da implantação [32].

**Grupo de Peritos de Alto Nível da UE (HLEG).** As Diretrizes de Ética para IA Confiável (8 de
abril de 2019) assentam em quatro princípios éticos (respeito pela autonomia humana, prevenção de
dano, equidade, explicabilidade) e estabelecem sete requisitos: agência humana e supervisão;
robustez técnica e segurança; privacidade e governação de dados; transparência; diversidade,
não-discriminação e equidade; bem-estar societal e ambiental; e responsabilidade [13]. A Lista de
Avaliação para IA Confiável (ALTAI, 17 de julho de 2020) transforma os sete numa lista de
verificação de auto-avaliação [33], e o Considerando 27 do Regulamento da IA aponta para os mesmos
sete como princípios não vinculativos que complementam o Regulamento [34].

**Processo de Hiroshima do G7.** Os Princípios Orientadores Internacionais para Organizações que
Desenvolvem Sistemas de IA Avançada (30 de outubro de 2023), com um Código de Conduta complementar,
baseiam-se nos princípios da OCDE para modelos avançados e fundacionais [35]. Os seus onze
princípios são operacionais em vez de éticos: medidas de risco do ciclo de vida incluindo
red-teaming, monitorização pós-implantação, relatório público de capacidades e limitações, partilha
de informações de incidentes, políticas de governação, controlos de segurança, proveniência de
conteúdo, investigação, desafios globais, normas, e proteções de entrada de dados e PI [36]. Desde
fevereiro de 2025 a OCDE executa um framework de relatório voluntário contra o Código de Conduta
[37].

### Onde os conjuntos concordam

Os quatro conjuntos discordam na ênfase e concordam na substância. A tabela cruza os sete princípios
que partilham com onde cada conjunto os declara.

| Princípio partilhado | OECD (2024) | UNESCO (2021) | EU HLEG (2019) | G7 Hiroshima (2023) |
|---|---|---|---|---|
| Equidade e não-discriminação | 1.2 (equidade, não-discriminação) | Equidade e não-discriminação | Req. 5 diversidade, não-discriminação e equidade | Preâmbulo; 11 (qualidade de dados contra viés prejudicial) |
| Segurança e fiabilidade | 1.4 (robusto, seguro; substituir, reparar, desativar) | Proporcionalidade e não causar dano; segurança e segurança | Req. 2 robustez técnica e segurança | 1 (medidas de risco do ciclo de vida); 2 (monitorização pós-implantação) |
| Privacidade e segurança | 1.2 (privacidade, proteção de dados); 1.4 (segurança) | Direito à privacidade e proteção de dados; segurança e segurança | Req. 3 privacidade e governação de dados | 6 (controlos de segurança); 11 (dados pessoais, PI) |
| Transparência e explicabilidade | 1.3 (incl. informação para contestar um resultado) | Transparência e explicabilidade | Req. 4 transparência | 3 (relatório público); 7 (proveniência de conteúdo) |
| Responsabilidade | 1.5 (rastreabilidade; gestão sistemática de riscos) | Responsabilidade e responsabilidade | Req. 7 responsabilidade | 4 (partilha de incidentes); 5 (políticas de governação) |
| Centricidade humana, incl. acessibilidade e inclusão | 1.1 (crescimento inclusivo); 1.2 (agência humana e supervisão) | Supervisão e determinação humana; consciência e literacia; diversidade e inclusividade | Req. 1 agência humana e supervisão; Req. 5 (acessibilidade e design universal) | Preâmbulo (centricidade humana) |
| Sustentabilidade | 1.1 (sustentabilidade ambiental) | Sustentabilidade; florescimento do ambiente e do ecossistema | Req. 6 bem-estar societal e ambiental | 9 (crise climática e outros desafios globais) |

Fontes: [2][31][13][36].

### Do princípio ao artefato

Um princípio é aplicado quando foi rastreado a um dano nomeado, um controlo que morde, uma métrica
que se move e um registo de evidência que alguém pode consultar. Isto é o
«[começar a partir de um modo de falha nomeado ou um dano nomeado](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)»
do capítulo 03 aplicado aos alvos de outras pessoas. A tabela dá, para cada princípio partilhado, os
valores internos ([capítulo 03](/bok/values-and-principles#the-eight-values)) e princípios internos
que o engenheiram e o artefato que o evidencia. É um mapa inicial, não uma afirmação de que qualquer
artefato satisfaz um princípio.

| Princípio partilhado | Valores internos | Princípios internos | Artefato que o evidencia | Camada · padrão |
|---|---|---|---|---|
| Equidade | 2 avaliações falham compilações; 7 redução efetiva do risco | Começar a partir de um dano nomeado; dar a cada controlo dentes | Resultados de avaliação de subgrupo contra um limiar declarado; ficha de dados com notas de representatividade; FRIA | 03 · Eval Gate in CI; 01 · [FRIA-as-Code](/patterns/fria-as-code) |
| Segurança e fiabilidade | 2; 3 evidência de execução | Compilar no ponto mais antigo; dar a cada controlo dentes | Resultados de gate de avaliação e red-team por versão; decisões de guardrail; registos de exercício de kill-switch | 03 · Adversarial Red-Team Suite; 04 · Runtime Guardrail, Kill Switch |
| Privacidade e segurança | 1 governação é código; 4 identidade e âmbito | Registar e limitar cada ator; compilar no ponto mais antigo | Veredictos de política sobre classe de dados e residência; credenciais com âmbito; AIPD; avaliações de fuga de PII | 01 · Policy Card; 04 · Agent Identity & Scoped Credentials |
| Transparência e explicabilidade | 5 evidência legível por máquina; 6 ferramentas inspecionáveis | Instrumentar a compilação | Ficha de modelo, ficha de dados e AIBOM; registos de divulgação e marcação; [códigos de razão registados por decisão](/patterns/explanation-artefact) | 02 · Model Card as Control Evidence; AIBOM |
| Responsabilidade | 4; 8 propriedade com engenharia | Registar e limitar cada ator; instrumentar a compilação | Proprietário do registo por entrada; registos de decisão; registos assinados; registos de incidentes; resultados de avaliação OSCAL | 02 · Agent Registry; 05 · [Incident Pipeline](/patterns/incident-pipeline), [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Centricidade humana | 8; 3 | Começar a partir de um dano nomeado; tornar o caminho governado o mais fácil | Registos de gate (aprovador, tempo para decidir, taxa de sobreposição); resultados de teste de acessibilidade para avisos e explicações; registos de apelação | 04 · Human-in-the-loop Gate |
| Sustentabilidade | 7 | Instrumentar a compilação | Energia ou computação por execução de avaliação e por 1.000 inferências no armazém de evidência; um registo de decisão de tamanho de modelo | 05 · Continuous Assurance Telemetry |

Três linhas têm peso legal ou numérico. **Centricidade humana** inclui acessibilidade, e para
sistemas de risco elevado é um dever: os prestadores devem cumprir os requisitos de acessibilidade
das diretivas de acessibilidade web da UE e da Lei Europeia de Acessibilidade (Art. 16(l)) [38],
portanto cada aviso e explicação que o sistema mostra a uma pessoa recebe um teste de acessibilidade
no pipeline. **Transparência** chega à pessoa afetada: o texto da OCDE pede informações que permitam
aos afetados negativamente "contestar o seu resultado" [2], e o Regulamento da IA dá às pessoas
afetadas por certas decisões de risco elevado o direito a "explicações claras e significativas do
papel do sistema de IA" [10]; o artefato é um código de razão registado e uma rota de apelação com
resultados registados. **Sustentabilidade** tem um número: a IEA estima que os centros de dados
utilizaram cerca de 415 TWh em 2024, aproximadamente 1,5% da eletricidade global, e projeta cerca de
945 TWh até 2030 [39]. Nem tudo isso é IA, mas torna a escolha entre um SLM e um LLM para a mesma
tarefa uma decisão de governação com um registo.

> **Exemplo (ilustrativo)**
> Um princípio rastreado de ponta a ponta. OCDE 1.3 pede que as pessoas afetadas negativamente por
> um sistema possam contestar o seu resultado. Dano nomeado: um candidato rejeitado por
> `loan-triage-02` não consegue descobrir porquê ou contestá-lo. Controlo: cada decisão adversa tem
> códigos de razão registados e uma rota de apelação para um revisor que pode revertê-la. Métrica:
> volume de apelações, taxa de reversão e tempo para resolução, por mês. Evidência: o registo de
> apelações, arquivado contra a entrada do registo e a versão do modelo. Obrigação que suporta:
> Regulamento da IA Art. 86 onde se aplica, RGPD Art. 22 salvaguardas onde a decisão é unicamente
> automatizada.

### As compensações são decisões, e as decisões são registos

Os princípios colidem. NIST nomeia as colisões habituais: interpretabilidade contra privacidade,
precisão preditiva contra interpretabilidade, e técnicas de proteção de privacidade que custam
precisão e com ela equidade onde os dados são escassos; acrescenta que estas compensações "devem ser
resolvidas de forma transparente e adequadamente justificável" [8]. A leitura de engenharia é que
cada compensação resolvida é um registo de decisão com um proprietário, as opções consideradas, a
métrica que cada uma teria movido e a data em que será revisitada.

| Tensão | Caso típico | Onde a decisão vive |
|---|---|---|
| Precisão contra interpretabilidade | Um modelo de gradient boosting supera um scorecard por alguns pontos | Registo de seleção de modelo na ficha de modelo, com ambos os resultados de avaliação |
| Testes de equidade contra privacidade | As avaliações de subgrupo precisam dos dados de categoria especial que a lei de privacidade restringe | Ficha de dados anotando a base legal (ver Art. 4a no [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)), pseudonimização e eliminação |
| Eficiência contra centricidade humana | Um passo de revisão adiciona latência a cada decisão | Registo de colocação de gate: quais ações são controladas e porquê |
| Transparência contra segurança | Publicar regras de detecção ajuda atacantes a evitá-las | Decisão de divulgação: o que é publicado, o que é mantido para auditores |

Uma compensação que ninguém registou foi ainda assim feita; foi feita por defeito, por quem quer que
tenha tocado no código por último.

> **Na prática (ilustrativo)**
> Uma equipa de governação herdou uma carta de "IA responsável" publicada de seis princípios e sem
> evidência por trás de nenhum deles. Em vez de reescrever a carta, adicionou uma coluna ao registo
> por princípio e perguntou, para cada sistema de risco elevado, qual artefato o evidenciava. Quatro
> de seis colunas estavam vazias para a maioria dos sistemas no primeiro dia. As células vazias
> tornaram-se o backlog, e a carta tornou-se auditável pela primeira vez: um princípio sem artefato
> foi reportado como uma lacuna, não como um valor.

## O que pode fazer esta semana

1. Adicione os oito campos de escopo deste capítulo (`substrate`, `objective`, `intended_purpose`,
   `inference_technique`, `output_types`, `effect_surface`, `autonomy_level`, `adapts_in_use`) e um
   `definition_decision` com a sua razão ao seu esquema de registo, e preencha retroativamente os
   seus dez sistemas de maior exposição.
2. Registre as decisões fora do escopo que já fez implicitamente (motores de regras, dashboards,
   previsores de linha de base), cada uma com a família excluída e a razão, para que uma mudança
   posterior apareça como um diff.
3. Para um sistema preditivo em produção, encontre o limiar de decisão, o seu proprietário e a sua
   última verificação de calibração. Se algum dos três estiver em falta, adicione uma avaliação de
   calibração ao seu gate e coloque o limiar num ficheiro de política com um proprietário.
4. Para um sistema generativo, execute a sua avaliação mais importante cinco vezes na versão atual
   do modelo e registre a taxa de aprovação com as definições de amostragem. Se a taxa estiver
   abaixo do piso que pensava ter, encontrou o seu primeiro gate real.
5. Pegue num princípio que a sua organização publicou e rastreie-o até um artefato para um sistema,
   utilizando a tabela acima. Se não houver artefato, registre a lacuna no registo de risco.

**Correspondências:** Regulamento da IA Art. 3(1), 3(63), 3(66) (definições), Art. 14 (supervisão
humana), Art. 15 (métricas de precisão, ciclos de feedback), Art. 16(l) (acessibilidade), Art. 50
(transparência), Art. 51 (risco sistémico de GPAI), Art. 86 (explicação) · RGPD Art. 22 · ISO/IEC
22989 · ISO/IEC 42001 · NIST AI RMF (Map, Measure) e NIST AI 600-1 · Princípios da OCDE · OWASP
Agentic ASI02/ASI03 · Camadas 01–05. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; first published 6 Feb 2025; not binding; seven elements of Art. 3(1); exclusions at paras 40–51; definition applicable since 2 Feb 2025). European Commission. 2025-07-29. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[2] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; definition revised 8 Nov 2023; principles revised 3 May 2024; principles 1.1–1.5, incl. 1.3(iv) challenge an output and 1.4(b) override, repair, decommission). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[3] Explanatory memorandum on the updated OECD definition of an AI system (2019 and 2023 texts compared; autonomy and adaptiveness explained; not part of the Recommendation). OECD Artificial Intelligence Papers. 2024-03. https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (definitions: (1) AI system, (3) provider, (4) deployer, (63) general-purpose AI model, (66) general-purpose AI system). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Recital 12 (AI distinguished from simpler traditional software and from rules defined solely by natural persons; inference; machine learning and logic- and knowledge-based approaches; autonomy and adaptiveness; recitals are not reproduced in the consolidated text). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_12 (verified: primary)
[6] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (AI system, term 3.1.4; autonomy and heteronomy, terms 3.1.5 and 3.1.16; clause 5.13 autonomy, heteronomy and automation; clause 5.19 AI stakeholder roles); referenced by identifier only. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[7] ISO/IEC 22989:2022/FDAmd 1, Generative AI (stage 50.00, FDIS registered for formal approval on 2026-09-18; not published as of 2026-09-24). ISO/IEC JTC 1/SC 42. 2026-09-18. https://www.iso.org/standard/88145.html (verified: primary)
[8] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (AI system definition; trustworthy characteristics; s. 3.5 transparency, explainability, interpretability; trade-offs; Appendix B, how AI risks differ from traditional software risks). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[9] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of interaction with an AI system; machine-readable marking of synthetic audio, image, video and text). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[10] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to clear and meaningful explanations of the role of a high-risk AI system in a decision). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[11] Regulation (EU) 2016/679 (GDPR), Art. 22(1) (right not to be subject to a decision based solely on automated processing, including profiling, with legal or similarly significant effects). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_22 (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15 (15(3) accuracy levels and metrics declared in the instructions for use; 15(4) feedback loops in systems that continue to learn). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[13] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; HITL, HOTL and HIC oversight; requirement 5 includes accessibility and universal design). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[14] "Defeating Nondeterminism in LLM Inference" (1,000 temperature-zero completions of one prompt gave 80 unique outputs; cause traced to lack of batch invariance). Thinking Machines Lab (Horace He et al.). 2025-09-10. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ (verified: primary)
[15] Levels of AGI for Operationalizing Progress on the Path to AGI (levels of performance, generality and autonomy) (arXiv 2311.02462). Morris et al.. 2023-11-04. https://arxiv.org/abs/2311.02462 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 51 (classification of GPAI models with systemic risk; 51(2) presumption of high-impact capabilities above 10^25 FLOP of training compute). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_51 (verified: primary)
[17] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (C(2025) 7719 final; first published 18 Jul 2025; para. 17 indicative criterion: training compute above 10^23 FLOP and able to generate language, text-to-image or text-to-video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[18] "Understanding the four types of AI, from reactive robots to self-aware beings" (reactive machines, limited memory, theory of mind, self-awareness). The Conversation (Arend Hintze). 2016-11-14. https://theconversation.com/understanding-the-four-types-of-ai-from-reactive-robots-to-self-aware-beings-67616 (verified: primary)
[19] Concrete Problems in AI Safety (reward hacking among five practical problems) (arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[20] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 14 (14(4)(b) automation bias; 14(4)(e) interrupting the system so it comes to a halt in a safe state). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_14 (verified: primary)
[21] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[22] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream) (arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[23] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone) (arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[24] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; provenance as an open problem) (arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[25] Top 10 for Agentic Applications 2026 (ASI01–ASI10 threat catalogue for agentic systems). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[26] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity), Big Data & Society 3(1). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[27] "Dual use of artificial-intelligence-powered drug discovery" (inverted toxicity model generated about 40,000 candidate toxic molecules in under six hours), Nature Machine Intelligence. Urbina, Lentzos, Invernizzi and Ekins (full text on PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[28] Overcoming catastrophic forgetting in neural networks (neural networks lose earlier competence when trained on new tasks; elastic weight consolidation) (arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[29] On Calibration of Modern Neural Networks (modern networks poorly calibrated; temperature scaling), ICML 2017 (arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[30] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage) (arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[31] Recommendation on the Ethics of Artificial Intelligence (adopted by 193 member states, November 2021; four core values; ten principles). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[32] Ethical Impact Assessment: a tool of the Recommendation on the Ethics of AI (ex-ante and ex-post assessment of a system; aimed at procurers of AI systems). UNESCO. 2023-08-28. https://www.unesco.org/en/articles/ethical-impact-assessment-tool-recommendation-ethics-artificial-intelligence (verified: primary)
[33] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), Recital 27 (the seven HLEG principles as non-binding ethical principles complementing the Act). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[35] Hiroshima Process International Guiding Principles for Organizations Developing Advanced AI Systems (welcomed by G7 leaders with a companion Code of Conduct; builds on the OECD AI Principles). European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-guiding-principles-advanced-ai-system (verified: primary)
[36] Hiroshima Process International Guiding Principles, full text of the eleven principles (preamble on human rights, fairness and human-centricity; principle 11 elaboration on data quality against harmful bias). G7 Information Centre (University of Toronto). 2023-10-30. https://g7.utoronto.ca/summit/2023hiroshima/231030-ai-principles.html (verified: secondary)
[37] Hiroshima AI Process (HAIP) Reporting Framework (voluntary reporting against the Code of Conduct; launched February 2025). OECD.AI. 2025-02. https://oecd.ai/en/hiroshima (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16 (provider obligations; 16(l) accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[39] Energy and AI (data centres about 415 TWh in 2024, around 1.5% of global electricity; projected around 945 TWh by 2030). International Energy Agency. 2025. https://www.iea.org/reports/energy-and-ai (verified: primary)
