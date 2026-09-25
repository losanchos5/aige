---
lang: pt
source: bok/22-principles-and-standards.md
sourceHash: "45f690d8e41680445e0ec502f1a21c2904a69366d076f37bc4836cff3aeee9fc"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 22. Princípios, soft law e normas

> Os princípios dizem como é o bom e as normas dizem como o demonstrar; este capítulo mapeia cada
> instrumento à camada do stack e ao registo de evidência que o respondem.

## Como ler este capítulo

A maioria do que molda a governação da IA não é lei. É uma rede de conjuntos de princípios, um
tratado, estruturas voluntárias e normas técnicas, cada uma escrita por um corpo diferente para um
público diferente. O trabalho do engenheiro não é recitá-las. É saber, para cada uma, o que pede,
quanto peso carrega, e qual artefato no stack evidenciaria que o pedido é cumprido. Um princípio só
conta uma vez que é um controlo; uma norma só ajuda uma vez que as suas cláusulas estão ligadas a um
portão, um campo de registo ou um registo de evidência.

Em ordem aproximada de força: lei vinculativa (o Regulamento da IA, no
[capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus) e
[capítulo 18](/bok/eu-ai-act#the-act-and-the-omnibus)); um tratado vinculativo, a Convenção-Quadro
do Conselho da Europa, que vincula as Partes que a ratificam e deixa cada uma escolher como alcançar
atores privados [1]; **normas harmonizadas**, normas europeias escritas a pedido da Comissão que dão
uma presunção de conformidade uma vez que a sua referência é publicada no Jornal Oficial [2]; normas
e estruturas internacionais (ISO/IEC, NIST, IEEE), voluntárias e por vezes certificáveis; e
princípios e soft law (OCDE, UNESCO, G7, Grupo de Peritos de Alto Nível da UE), que estabelecem o
alvo e o vocabulário partilhado.

Duas cautelas percorrem o capítulo. As normas apoiam, não conferem: nenhum certificado e nenhuma
figura de cobertura torna um sistema conforme, e o teste do
[capítulo 01](/bok/definition#three-clarifiers) ainda se aplica. E este capítulo explica os
instrumentos enquanto [capítulo 08](/bok/regulatory-map#how-to-read-this-map) permanece o índice de
obrigações; onde um instrumento já tem linhas lá, este capítulo liga a elas. Os conjuntos de
princípios são o terreno de origem da IA Responsável e ética de IA
([capítulo 01](/bok/definition#the-disambiguation-cluster)): estabelecem os valores. As tabelas de
artefatos e camadas abaixo são a contribuição de engenharia, não uma afirmação sobre o que os
autores dos princípios pretendiam.

## Os instrumentos num relance

| Instrumento | Emissor | Força | O que muda no stack | Camadas principais |
|---|---|---|---|---|
| Princípios de IA da OCDE (2019, rev. 2024) | OECD | Compromisso político de 47 aderentes | Definição partilhada, campos de ciclo de vida e classificação para o registo | 1 · 2 |
| Recomendação da UNESCO (2021) | UNESCO | Não vinculativa, adotada por 193 Estados-Membros | Avaliação de impacto ético como registo ligado ao registo | 2 |
| Convenção-Quadro (CETS Nº 225) | Conselho da Europa | Vinculativa nas Partes uma vez em vigor; não em vigor a partir de 2026-09-24 | Gestão de risco e impacto, testes em mudança, registos de contestabilidade | 1 · 2 · 3 · 5 |
| Código de Conduta de Hiroshima (2023) | G7 | Voluntário; estrutura de comunicação da OCDE | Comunicação de capacidade pública, partilha de incidentes, proveniência | 2 · 4 · 5 |
| Diretrizes de Ética e ALTAI (2019, 2020) | EU AI HLEG | Não vinculativas; recordadas no considerando 27 do Regulamento da IA | Sete requisitos como lista de verificação para converter em controlos | 1 · 2 |
| NIST AI RMF 1.0 e perfis | NIST | Voluntário | Ids de função, categoria e subcategoria como metadados de controlo | 1–5 |
| ISO/IEC 22989, 42001 e família | ISO/IEC JTC 1/SC 42 | Voluntária; 42001 certificável | Evidência de sistema de gestão; vocabulário; processos de ciclo de vida | 1 · 2 · 5 |
| Normas harmonizadas JTC 21 | CEN-CENELEC | Presunção de conformidade uma vez citada em OJ; nenhuma citada até onde conseguimos encontrar | Ficheiro de risco do prestador, esquema de registo, evidência de QMS | 1–5 |
| Série IEEE 7000 | IEEE | Voluntário | Ética por conceção e processos de enviesamento no SDLC | 1 · 2 · 3 |

As fontes de cada linha encontram-se na secção que a trata. Os números de aderentes e
Estados-Membros provêm de [3] e [4]; o estado da Convenção de [5].

## Uma breve genealogia do direito mole da IA

Os instrumentos citam-se mutuamente, e a ordem importa porque as definições descem a jusante. O
Grupo de Peritos de Alto Nível da UE publicou as suas Orientações Éticas em 8 de abril de 2019 [6].
O Conselho da OCDE adoptou a sua Recomendação sobre IA em 22 de maio de 2019, e os líderes do G20
acolheram os Princípios de IA do G20 dela derivados em Osaka em junho de 2019 [7]. Os
Estados-Membros da UNESCO adoptaram a Recomendação sobre a Ética da IA em novembro de 2021 [4]. A
OCDE publicou o seu Quadro para a Classificação de Sistemas de IA em 22 de fevereiro de 2022 [8], e
o NIST AI RMF 1.0 seguiu-se em 26 de janeiro de 2023, adaptando o ciclo de vida e as dimensões da
OCDE na sua própria Figura 2 [9]. Os líderes do G7 acordaram os Princípios Orientadores de Hiroshima
e o Código de Conduta em 30 de outubro de 2023 [10]. A OCDE reviu a sua definição de sistema de IA
em 8 de novembro de 2023 e toda a Recomendação em 3 de maio de 2024 [7]. O Conselho da Europa
adoptou a sua Convenção-Quadro em 17 de maio de 2024 e abriu-a para assinatura em 5 de setembro de
2024 [11]. A OCDE lançou o quadro de comunicação de Hiroshima em 7 de fevereiro de 2025 [12], e a
União Europeia ratificou a Convenção em 15 de maio de 2026 [13].

A consequência prática é a convergência numa única definição. A definição de sistema de IA da OCDE,
o Artigo 2 da Convenção e o Artigo 3(1) do Regulamento da IA utilizam uma redacção quase idêntica, e
o considerando 12 do Regulamento da IA diz que a noção deve estar estreitamente alinhada com o
trabalho das organizações internacionais [7][1][14]. Um registo que classifique sistemas contra essa
redacção uma única vez pode responder aos três instrumentos; o
[capítulo 11](/bok/ai-defined#four-definitions-compared) trata a própria definição, e tabula
[onde os conjuntos de princípios concordam](/bok/ai-defined#where-the-sets-agree).

## Princípios de IA da OCDE

A Recomendação sobre IA da OCDE (instrumento legal `OECD/LEGAL/0449`) foi o primeiro padrão
intergovernamental sobre IA. Contém cinco princípios baseados em valores para os actores de IA,
cinco recomendações aos governos, e definições de sistema de IA, ciclo de vida do sistema de IA e
actores de IA [7]. A revisão de 2024 acrescentou atenção explícita à desinformação e integridade da
informação, a utilizações fora da finalidade prevista, a anulação segura e desmantelamento, e à
sustentabilidade ambiental, e moveu rastreabilidade e gestão de riscos sob o princípio da
responsabilidade [7]. A partir de 2026-09-24, OECD.AI lista 47 aderentes, incluindo os 38 membros da
OCDE, a União Europeia e oito não-membros [3].

### Os cinco princípios e cinco recomendações

Os princípios dirigem-se aos actores de IA; as recomendações dirigem-se aos governos. Apenas os
primeiros cinco se tornam trabalho de engenharia directamente. A tabela lê cada princípio como uma
pergunta que o stack deve responder.

| Princípio | O que pede aos actores de IA (parafraseado) | Artefato de engenharia | Camada |
|---|---|---|---|
| `1.1` Crescimento inclusivo, desenvolvimento sustentável e bem-estar | Prosseguir resultados benéficos para as pessoas e o planeta | Declaração de finalidade prevista e benefício no registo de admissão; danos nomeados por sistema | 2 |
| `1.2` Estado de direito, direitos humanos e valores democráticos, incluindo equidade e privacidade | Respeitar direitos ao longo do ciclo de vida; agência humana e supervisão; proteger contra utilização indevida | Avaliação de impacto ligada ao registo; avaliações de equidade e privacidade; ponto de controlo de supervisão | 2 · 3 · 4 |
| `1.3` Transparência e explicabilidade | Informação significativa e apropriada ao contexto sobre o sistema e os seus resultados | Ficha de modelo e ficha de dados; divulgação de interacção; artefatos de explicação | 2 |
| `1.4` Robustez, segurança e segurança | Funcionamento sob utilização normal, utilização indevida previsível e condições adversas; anular, reparar ou desmantelar com segurança | Avaliações adversárias e de robustez; kill switch; proveniência de conteúdo | 3 · 4 |
| `1.5` Responsabilidade | Rastreabilidade de conjuntos de dados, processos e decisões; gestão sistemática de riscos por fase do ciclo de vida | Armazém de evidência indexado por ids do registo; registo de riscos como código; registos de fornecedores | 1 · 5 |

As cinco recomendações (investigação e desenvolvimento; um ecossistema inclusivo de IA; um ambiente
de governação e política interoperável; capacidade humana e transformação do mercado de trabalho;
cooperação internacional) dirigem-se aos Aderentes, não aos proprietários de sistemas. O apelo da
Recomendação 2.5 por "normas técnicas globais consensuais e multi-stakeholder" é a raiz política do
trabalho de normalização mais adiante neste capítulo [7].

O Princípio 1.4(b) é a frase mais directamente operacional do instrumento: mecanismos devem permitir
que sistemas de IA que arriscam causar dano indevido sejam "anulados, reparados e/ou desmantelados
com segurança" [7]. Em termos de stack, isso é o padrão
[**Kill Switch / Circuit Breaker**](/patterns/kill-switch-circuit-breaker) com um caminho de
revogação testado, e um registo de desmantelamento no registo. A rastreabilidade do Princípio 1.5(b)
"em relação a conjuntos de dados, processos e decisões" é o que
[**Continuous Assurance Telemetry**](/patterns/continuous-assurance-telemetry) produz quando cada
registo de evidência carrega o id do registo do sistema que descreve.

### A definição de sistema de IA da OCDE e o ciclo de vida

A definição de 2023 lê-se: um sistema baseado em máquina que, para objectivos explícitos ou
implícitos, infere, a partir da entrada que recebe, como gerar resultados tais como previsões,
conteúdo, recomendações ou decisões que podem influenciar ambientes físicos ou virtuais; os sistemas
variam em autonomia e adaptabilidade após implantação [7]. OECD.AI nota que a União Europeia, o
Conselho da Europa, os Estados Unidos e as Nações Unidas utilizam esta definição e ciclo de vida nos
seus próprios quadros [3].

O ciclo de vida tem sete fases: planear e conceber; recolher e processar dados; construir ou adaptar
modelos; testar, avaliar, verificar e validar; disponibilizar para utilização ou implantar; operar e
monitorizar; reformar ou desmantelar. As fases são iterativas e não necessariamente sequenciais, e a
reforma pode ocorrer em qualquer ponto durante a operação [7]. Essa última cláusula é fácil de
perder e útil de codificar: o registo precisa de um estado `retired` acessível a partir de
`operating`, com a sua própria evidência (quem o reformou, porquê, que dados foram apagados), não
apenas um caminho de {`built`} para {`deployed`}.

| Fase do ciclo de vida da OCDE | Onde vive no pipeline | Evidência que deve deixar |
|---|---|---|
| Planear e conceber | Ingesta y clasificación | Registo de admissão; nível de risco; finalidade prevista |
| Recolher e processar dados | Pipeline de dados | Ficha de dados; linhagem; nota de base legal |
| Construir ou adaptar modelos | Trabalhos de treino e ajuste fino | AIBOM; metadados de execução de treino |
| Testar, avaliar, verificar, validar | CI eval gate | Resultado de avaliação contra limiar |
| Disponibilizar ou implantar | Admissão e lançamento | Veredicto de política; entrada de registo |
| Operar e monitorizar | Runtime | Decisões de guardrail; rastreios; alertas de desvio |
| Reformar ou desmantelar | Mudança de estado do registo | Registo de reforma; credenciais revogadas |

### O Quadro para a Classificação de Sistemas de IA

O quadro de classificação da OCDE avalia um sistema de IA de uma perspectiva política ao longo de
cinco dimensões: **Pessoas e Planeta**, **Contexto Económico**, **Dados e Entrada**,
**Modelo de IA** e **Tarefa e Resultado**, cada uma com as suas próprias propriedades e atributos
[8]. O NIST AI RMF reproduz uma versão modificada da mesma imagem, com Contexto de Aplicação em
lugar de Contexto Económico e teste, avaliação, verificação e validação (TEVV) desenhados ao longo
do ciclo de vida [9].

Para um engenheiro, o quadro é um esquema, não um papel. Cada dimensão torna-se um grupo de campos
de registo que torna um sistema comparável com outros e diz ao resto do stack o que testar.

> **Exemplo (ilustrativo)** Uma entrada de registo estendida com as cinco dimensões. Os campos são a
> escolha da equipa; o agrupamento é da OCDE.
>
> ```yaml
> id: credit-limit-assist
> oecd_classification:
>   people_and_planet: { affected: [applicants], rights_impact: high, opt_out: false }
>   economic_context: { sector: consumer-credit, criticality: high, deployment: customer-facing }
>   data_and_input: { provenance: [bureau-feed, application-form], personal_data: true }
>   ai_model: { type: gradient-boosted-trees, adaptive_after_deployment: false }
>   task_and_output: { task: recommendation, autonomy: human-reviewed, output: limit-band }
> ```
>
> Uma política na camada 01 lê `rights_impact: high` e requer um portão de avaliação de equidade; o
> portão de avaliação na camada 03 lê `personal_data: true` e acrescenta uma suite de fuga. A
> classificação deixa de ser uma descrição e começa a encaminhar controlos.

### O observatório OECD.AI

Três recursos OECD.AI valem a pena integrar. O
**Catálogo de Ferramentas e Métricas para IA Confiável** é um lugar para encontrar métodos de
avaliação e métricas, não uma lista de aprovação [15]. O **Monitor de Incidentes e Perigos de IA**
[3] é uma entrada para a camada 03: uma falha reportada num sistema comparável é um caso de
avaliação candidato (ver [capítulo 17](/bok/incidents#learning-from-public-incident-databases)). O
**Quadro de Comunicação de IA de Hiroshima** é onde os programadores de sistemas de IA avançados
apresentam relatórios de gestão de riscos [3] (ver a secção do G7).

> **Na prática (ilustrativo)**
> Uma equipa de governação numa grande seguradora acrescentou as cinco dimensões da OCDE ao seu
> esquema de registo como campos obrigatórios. A primeira reconciliação encontrou vários sistemas
> cujo `task_and_output.autonomy`} dizia "revisto por humano" enquanto os rastreios de runtime
> mostravam nenhuma acção do revisor na maioria das decisões. O campo não criou a lacuna; tornou a
> lacuna consultável. A correcção foi um ponto de controlo de supervisão com aprovações registadas,
> e o campo de registo tornou-se uma afirmação que os rastreios poderiam falsificar.

## Recomendação da UNESCO sobre a Ética da IA

Os 193 Estados-Membros da UNESCO adoptaram a Recomendação sobre a Ética da Inteligência Artificial
em novembro de 2021, o primeiro padrão global sobre ética da IA [4]. Repousa em quatro valores
centrais (direitos humanos e dignidade; sociedades justas, pacíficas e interconectadas; diversidade
e inclusividade; o florescimento do ambiente e dos ecossistemas) e dez princípios centrais:
proporcionalidade e não causar dano; segurança e protecção; privacidade e protecção de dados;
governação multi-stakeholder e adaptativa; responsabilidade e responsabilização; transparência e
explicabilidade; supervisão humana e determinação; sustentabilidade; consciência e literacia;
equidade e não-discriminação [4]. As áreas de acção política transformam então os valores em
programas governamentais.

A Recomendação dirige-se aos estados, portanto o seu peso operacional para uma organização vem
através de duas ferramentas. A **Metodologia de Avaliação de Prontidão** (RAM) avalia como preparado
está um país para governar a IA responsavelmente [16]; é contexto útil ao implantar numa jurisdição
que tenha executado uma. A **Avaliação de Impacto Ético** (EIA) é ao nível do sistema: ajuda a
avaliar as implicações éticas de um sistema de IA individual antes e durante a utilização, e é
concebida para governos que adquirem ou implantam IA, empresas que a desenvolvem e investigadores
que a avaliam [17].

Na stack uma AIPD é uma avaliação de impacto adicional: anexada à entrada do registo, versionada e
re-executada em caso de alteração, seguindo [**FRIA-as-Code**](/patterns/fria-as-code). Um comprador
público que a exija aos fornecedores torna-a um artefato de aquisição para a
[**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate).
«Proporcionalidade e não causar dano» reafirma o princípio da casa
[começar a partir de um modo de falha nomeado ou de um dano nomeado](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm)
[4].

## Convenção-Quadro do Conselho da Europa (CETS n.º 225)

A Convenção-Quadro sobre Inteligência Artificial, Direitos Humanos, Democracia e Estado de Direito é
o primeiro tratado internacional juridicamente vinculativo sobre IA. Foi adotada em Estrasburgo em
17 de maio de 2024 e aberta para assinatura em Vilnius em 5 de setembro de 2024 [11]. É neutra em
relação à tecnologia e vincula as Partes, não as empresas [5][1].

### Âmbito e estatuto

O artigo 3.º estabelece o âmbito. As Partes devem aplicar a Convenção às atividades do ciclo de vida
dos sistemas de IA realizadas por autoridades públicas ou por atores privados agindo em seu nome.
Para outros atores privados, cada Parte deve abordar riscos e impactos de forma consistente com o
objeto e finalidade da Convenção, e deve declarar como o fará. A segurança nacional, a defesa
nacional e a investigação ainda não disponibilizada para utilização são excluídas, com condições
[1].

A Convenção entra em vigor no primeiro dia do mês seguinte a três meses após cinco signatários,
incluindo pelo menos três Estados-membros do Conselho da Europa, a terem ratificado (artigo 30.º(3))
[1]. **Estatuto em 2026-09-24:** a página própria do Conselho da Europa lista a União Europeia como
a única Parte e 20 signatários adicionais, entre eles o Reino Unido, a Noruega, a Suíça, a Ucrânia,
o Canadá, Israel, o Japão, os Estados Unidos e o Uruguai [5]. A Convenção não está, portanto, ainda
em vigor. O Parlamento Europeu consentiu na conclusão pela UE em 11 de março de 2026 [18], e a UE
ratificou em 15 de maio de 2026 na 135.ª Sessão do Comité de Ministros em Chișinău [13]. A Decisão
do Conselho que conclui a Convenção pela União, Decisão (UE) 2026/1080 de 21 de abril de 2026 (JO L,
13.5.2026), estabelece que a Convenção é implementada na União exclusivamente através do Regulamento
da IA e de outro acervo da União relevante, e inclui a declaração da UE ao abrigo do artigo
3.º(1)(b) de que aplicará os Capítulos II a VI da Convenção aos atores privados através do
Regulamento da IA [19].

Dentro da UE, o tratado é implementado através do Regulamento da IA em vez de através de um conjunto
separado de obrigações do setor privado. Fora dela, uma vez em vigor a Convenção, as medidas de
implementação de cada Parte são o que vincula; acompanhe-as por jurisdição no
[capítulo 21](/bok/ai-laws-worldwide#comparing-the-regimes).

### O que a Convenção pede e o que muda na stack

O Capítulo III estabelece princípios que as Partes implementam: dignidade humana e autonomia
individual; transparência e supervisão; responsabilidade; igualdade e não-discriminação; privacidade
e proteção de dados pessoais; fiabilidade; inovação segura, incluindo ambientes de testagem
controlados (artigos 7.º–13.º) [1]. Os Capítulos IV e V são onde a engenharia reside.

| Artigo | Obrigação das Partes (parafraseada) | Artefato de engenharia | Camada |
|---|---|---|---|
| `Art. 14(2)(a)–(b)` | Documentar informações relevantes sobre sistemas que podem afetar significativamente os direitos humanos, suficientes para que as pessoas afetadas possam contestar decisões | Registo de decisão por resultado consequente; [caminho de contestação](/patterns/decision-notice-contest-path) com o registo anexado | 2 · 5 |
| `Art. 14(2)(c)` | Uma possibilidade efetiva de apresentar queixa às autoridades competentes | Receção de queixa ligada ao id do registo | 5 |
| `Art. 15(2)` | Notificar as pessoas de que estão a interagir com um sistema de IA, conforme apropriado | Divulgação de interação aplicada em tempo de execução | 4 |
| `Art. 16(1)–(2)(a)–(f)` | Gestão iterativa e graduada de risco e impacto: contexto, severidade e probabilidade, perspetivas das partes interessadas, monitorização, documentação | Registo de risco como código; avaliação de impacto ligada ao registo; monitorização em relação à linha de base | 1 · 2 · 4 |
| `Art. 16(2)(g)` | Testar sistemas antes da primeira utilização e quando significativamente modificados, quando apropriado | Avaliação na libertação e em alteração material | 3 |
| `Art. 16(4)` | Avaliar a necessidade de uma moratória, proibição ou outras medidas para utilizações incompatíveis | Lista de bloqueio de utilizações proibidas como política-como-código | 1 |

O artigo 16.º(2)(g) merece ênfase. «Quando forem significativamente modificados» é um gatilho, não
uma data, e um gatilho é algo que um pipeline pode avaliar: um diff do registo que altera o modelo,
os dados de treino ou a finalidade prevista re-executa o gate. Este é o padrão
[**Eval Gate in CI**](/patterns/eval-gate-in-ci) com a regra de alteração material escrita, e
responde à mesma questão que o Regulamento da IA coloca sobre modificação substancial (ver
[capítulo 18](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)).

O Conselho da Europa também publicou **HUDERIA**, uma metodologia não vinculativa para avaliação de
risco e impacto de sistemas de IA do ponto de vista dos direitos humanos, democracia e estado de
direito. Tem duas partes: a Metodologia HUDERIA, aprovada pelo Comité de Ministros em 26 de
fevereiro de 2025, e o Modelo HUDERIA: Análise de Risco Baseada em Contexto (COBRA), aprovado em 25
de fevereiro de 2026, que estrutura a recolha de informações sobre o contexto, design e implantação
de um sistema [20]. As Partes podem usar ou adaptar qualquer uma. Para uma equipa que já executa
FRIA-as-Code, as questões de contexto do COBRA são uma lista de campos para reconciliar com o
registo, não um segundo processo.

**Correspondências:** CETS n.º 225 arts. 14.º–16.º · Regulamento da IA da UE arts. 9.º, 27.º, 50.º
(através da escolha de implementação da UE) · camadas 1–5. Os mapeamentos são ilustrativos, não uma
afirmação de conformidade.

## Processo Hiroshima do G7

Os líderes do G7 acordaram dois textos em 30 de outubro de 2023: os Princípios Orientadores
Internacionais para Organizações que Desenvolvem Sistemas de IA Avançada e o Código de Conduta
Internacional construído sobre eles. O Código é voluntário, dirigido a organizações que desenvolvem
os sistemas de IA mais avançados (incluindo modelos de fundação e IA generativa), descrito como um
documento vivo não exaustivo que se baseia nos Princípios de IA da OCDE, e a ser seguido de acordo
com uma abordagem baseada no risco [10]. As suas 11 ações mapeiam-se na stack com pouca tradução:

| Ação | Pergunta (parafraseada) | Artefato de engenharia | Camada |
|---|---|---|---|
| 1 | Identificar, avaliar e mitigar riscos ao longo do ciclo de vida, incluindo testagem antes da implantação | Suite de red-team adversarial; avaliação gate | 3 |
| 2 | Identificar e mitigar vulnerabilidades, incidentes e utilização indevida após implantação | Monitorização em tempo de execução; pipeline de incidentes | 4 · 5 |
| 3 | Relatar publicamente capacidades, limitações e utilizações apropriadas e inapropriadas | Ficha de modelo publicada a partir do registo | 2 |
| 4 | Partilhar informações e relatar incidentes responsavelmente com a indústria, governos, sociedade civil, academia | Pipeline de incidentes com um ramo de partilha externa | 5 |
| 5 | Desenvolver, implementar e divulgar políticas de governação da IA e gestão de riscos | Biblioteca de política-como-código com um resumo publicado | 1 |
| 6 | Investir em controlos de segurança, incluindo salvaguardas físicas, cibernéticas e contra ameaças internas | Controlos de segurança em pesos e pipelines | 4 |
| 7 | Implementar mecanismos de autenticação de conteúdo e proveniência quando viável | Marcação de proveniência na saída; teste de verificação | 4 |
| 8 | Priorizar investigação sobre riscos sociais, de segurança e de cibersegurança | (Nível de programa; sem artefato direto) | – |
| 9 | Priorizar sistemas que abordem desafios globais | (Nível de programa; sem artefato direto) | – |
| 10 | Avançar e adotar normas técnicas internacionais | Vigilância de normas; manutenção de crosswalk | 1 |
| 11 | Implementar medidas de entrada de dados e proteger dados pessoais e propriedade intelectual | Ficha de dados; licença e proveniência no AIBOM | 2 |

Em 7 de fevereiro de 2025 a OCDE lançou um quadro para as empresas reportarem comparativamente como
aplicam o Código (avaliação de risco, relato de incidentes, partilha de informações). Os primeiros
relatórios eram devidos em 15 de abril de 2025, com submissões contínuas e atualizações anuais
depois [12]. Um relatório é uma divulgação, não uma auditoria; gerado a partir do registo e do
armazém de evidência mantém-se verdadeiro, escrito à mão desvirtua-se. Para desenvolvedores de
modelos de IA de finalidade geral colocados no mercado da UE, o equivalente vinculativo é o regime
GPAI do Regulamento da IA e o seu Código de Prática voluntário, indexado no
[capítulo 08](/bok/regulatory-map#gpai-code-of-practice).

## Diretrizes do HLEG da UE e ALTAI

O Grupo de Peritos de Alto Nível independente da Comissão sobre IA apresentou as suas Diretrizes de
Ética para IA Confiável em 8 de abril de 2019. IA Confiável, nas Diretrizes, é legal, ética e
robusta, e sete requisitos-chave a tornam concreta: agência humana e supervisão; robustez técnica e
segurança; privacidade e governação de dados; transparência; diversidade, não-discriminação e
equidade; bem-estar social e ambiental; responsabilidade [6]. As Diretrizes nomeiam três abordagens
de supervisão (human-in-the-loop, human-on-the-loop e human-in-command), que continua a ser o
vocabulário mais compacto para design de supervisão [6]; o padrão
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) escolhe entre elas por consequência.

A **Assessment List for Trustworthy AI** (ALTAI) seguiu em 17 de julho de 2020, revista após um
piloto com mais de 350 partes interessadas e publicada tanto como documento como como ferramenta de
auto-avaliação baseada na web [21]. O considerando 27 do Regulamento da IA recorda os sete
princípios como orientação não vinculativa que contribui para IA confiável e centrada no ser humano,
sem prejuízo dos requisitos vinculativos do Regulamento [14].

A lição duradoura da ALTAI é um aviso. Um questionário de auto-avaliação respondido uma vez é uma
atestação, e o terceiro valor do livro diz que a evidência vem do tempo de execução, não de uma
atestação num ponto no tempo
([valor 3](/bok/values-and-principles#3-evidence-comes-from-runtime-not-from-a-point-in-time-attestation)).
O movimento útil é tratar cada pergunta como um controlo candidato. As Diretrizes pedem
«salvaguardas que permitam um plano de contingência em caso de problemas» [6]; como um controlo que
se torna «existe um kill switch testado, e quando foi o último teste bem-sucedido?». Uma pergunta
que não pode tornar-se uma verificação com um registo de evidência vai para o conselho de revisão, e
a lista continua a valer a pena manter para isso.

## NIST AI RMF 1.0 em profundidade

O NIST AI Risk Management Framework 1.0 (NIST AI 100-1, 26 de janeiro de 2023) descreve-se como
voluntário, preservador de direitos, não específico do setor e agnóstico em relação ao caso de uso
[9]. O capítulo 08 mapeia as suas quatro funções para artefatos
([capítulo 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf)); esta secção vai um nível abaixo, para
o que um engenheiro precisa de usar os seus identificadores como metadados de controlo.

### Dano, risco e tolerância

A Parte 1 enquadra o risco como uma função da magnitude do dano e da sua probabilidade, e agrupa
potenciais danos em dano a pessoas, dano a uma organização e dano a um ecossistema [9]. Duas
escolhas de enquadramento importam para a engenharia. O RMF pode ajudar a priorizar o risco mas «não
prescreve tolerância ao risco»: o limiar é para a organização estabelecer, influenciado por lei,
política e normas [9]. E trata a medição como difícil: riscos que não serão ou não podem ser medidos
devem ainda ser documentados (MEASURE 1.1). Ambos empurram da mesma forma que o princípio da casa
[dar a cada controlo dentes](/bok/values-and-principles#give-every-control-teeth): um limiar deve
ser escolhido, escrito com a sua fundamentação e aplicado, porque o quadro não o escolherá por si.

### As sete características confiáveis

O RMF nomeia sete características da IA digna de confiança e descreve válido e fiável como a base
para as outras, com responsável e transparente abrangendo todas elas [9].

| Característica | Evidência de que se verifica | Camada |
|---|---|---|
| Válido e fiável | Avaliações de capacidade e regressão contra um conjunto de referência; acompanhamento de desvios | 3 · 4 |
| Seguro | Avaliações de limiar de segurança; kill switch testado; caminho de sobreposição | 3 · 4 |
| Seguro e resiliente | Adversarial Red-Team Suite; [modelo de ameaça](/patterns/ai-threat-model); detecção em tempo de execução | 3 · 4 |
| Responsável e transparente | Propriedade do registo; ficha de modelo; evidência indexada a ids do registo | 2 · 5 |
| Explicável e interpretável | [Artefatos de explicação](/patterns/explanation-artefact) e códigos de razão, testados quanto à fidelidade ([capítulo 16](/bok/fairness-and-explainability#testing-explanation-quality)) | 2 · 3 |
| Melhorado em privacidade | Avaliações de fuga e memorização; AIPD ligada ao registo ([capítulo 19](/bok/privacy-and-ai#does-a-model-contain-personal-data)) | 2 · 3 |
| Justo com enviesamento prejudicial gerido | [Avaliações de equidade](/patterns/fairness-eval-suite) com limiares rastreados até danos nomeados | 3 |

### O Núcleo: 19 categorias

O Núcleo tem quatro funções, 19 categorias e, pela nossa contagem das tabelas publicadas, 72
subcategorias [9]. GOVERN é transversal; MAP, MEASURE e MANAGE funcionam por sistema. A tabela
parafraseou cada categoria numa linha e nomeia o artefato que a evidencia.

| Categoria | Numa linha (parafraseado) | Artefato | Camada |
|---|---|---|---|
| GOVERN 1 | Políticas e processos para risco de IA existem, são transparentes e funcionam; inclui inventário (1.6) e desativação (1.7) | Biblioteca de política como código; registo alimentado por implementações | 1 · 2 |
| GOVERN 2 | Estruturas de responsabilidade: pessoas capacitadas, responsáveis e treinadas | Campo de proprietário por entrada do registo; RACI | 1 · 2 |
| GOVERN 3 | Equipas diversas e papéis humano-IA definidos informam o trabalho de risco | Roster de revisores; definições de papel de supervisão | 1 |
| GOVERN 4 | Uma cultura que considera e comunica risco; testes, identificação de incidentes e partilha (4.3) | Pipeline de incidentes; propriedade de avaliação | 3 · 5 |
| GOVERN 5 | Envolvimento com atores de IA relevantes, incluindo feedback de fora da equipa | Canal de feedback e contestação ligado ao registo | 4 · 5 |
| GOVERN 6 | Riscos de software, dados e cadeia de fornecimento de terceiros abordados | Gate de due-diligence de fornecedor; AIBOM | 1 · 2 |
| MAP 1 | Contexto estabelecido: finalidades, utilizadores, leis, normas, configurações | Registo de admissão | 2 |
| MAP 2 | O sistema é categorizado: tarefas, métodos, limites de conhecimento | Campos de classificação (as dimensões da OCDE encaixam aqui) | 2 |
| MAP 3 | Capacidades, utilização, benefícios e custos compreendidos; processos de supervisão definidos (3.5) | Declaração de utilização prevista; design de supervisão | 2 · 4 |
| MAP 4 | Riscos e benefícios mapeados para cada componente, incluindo terceiros | Mapa de risco de componente do AIBOM | 2 |
| MAP 5 | Impactos em indivíduos, grupos, comunidades, organizações e sociedade caracterizados | Avaliação de impacto (FRIA, ISO/IEC 42005) | 1 · 2 |
| MEASURE 1 | Métodos e métricas escolhidos, começando pelos riscos mais significativos | Plano de avaliação com limiares e fundamentação | 3 |
| MEASURE 2 | Sistemas avaliados contra as características dignas de confiança | Suites de avaliação; resultados de red-team | 3 |
| MEASURE 3 | Riscos rastreados ao longo do tempo, incluindo emergentes em implementação | Métricas em tempo de execução comparadas com baseline de avaliação | 4 |
| MEASURE 4 | Feedback sobre se a medição funciona é recolhido e avaliado | Revisão de cobertura de avaliação; análise de incidentes perdidos | 3 · 5 |
| MANAGE 1 | Riscos priorizados e tratados; uma decisão de ir ou não ir em implementação | Decisões de registo de risco; gate de lançamento | 1 · 5 |
| MANAGE 2 | Estratégias de maximização de benefício e minimização de dano; substituir, desengajar ou desativar (2.4) | Guardrail em tempo de execução; kill switch | 4 |
| MANAGE 3 | Riscos e benefícios de terceiros geridos; modelos pré-treinados monitorados | Monitorização de fornecedor; verificações de proveniência de modelo | 2 · 4 |
| MANAGE 4 | Tratamentos, resposta, recuperação e comunicação documentados e monitorados; incidentes comunicados (4.3) | Pipeline de incidentes; plano de monitorização pós-implementação | 4 · 5 |

Os identificadores são a parte útil. Um controlo que carrega
`nist_ai_rmf: [MEASURE 2.7, MANAGE 2.4]` nos seus metadados pode ser contado, cruzado e consultado;
um controlo descrito em prosa não pode. O padrão
[**Framework Crosswalk**](/patterns/framework-crosswalk) gera a vista RMF a partir desses metadados
em vez de a manter ao lado do código.

### Como uma entrada de Playbook é estruturada

O AI RMF Playbook é o companheiro que transforma cada subcategoria em prática sugerida. Cada entrada
tem as mesmas cinco partes: **About** (o que a subcategoria significa), **Suggested Actions**,
**Transparency and Documentation** (enquadrado como "Organizations can document the following", uma
lista de perguntas), **AI Transparency Resources** e **References** [22]. NIST descreve o Playbook
como material voluntário que os utilizadores adaptam, não uma lista de verificação para completar
[9].

Lido como engenheiro, as perguntas "Transparency and Documentation" são critérios de aceitação. Cada
pergunta nomeia um artefato que a stack já emite (então liga-o) ou expõe uma lacuna (então
constrói-o ou regista por que não).

> **Exemplo (ilustrativo)** Uma subcategoria, transformada num gate e num registo de evidência.
>
> ```yaml
> control: kill-switch-tested
> nist_ai_rmf: [MANAGE 2.4]          # supersede, disengage or deactivate
> playbook_question: "Who can deactivate the system, and how is that tested?"
> check: last_kill_switch_test.passed == true and age_days <= 30
> enforce: deploy-admission          # block release if stale
> evidence: kill-switch-test-result  # filed against the registry id
> ```
>
> O Playbook forneceu a pergunta; o pipeline fornece a resposta em cada lançamento.

### Perfis e o Perfil de IA Generativa

Um perfil aplica o Núcleo a um contexto. O RMF descreve três tipos: **perfis de caso de uso** para
uma configuração particular, **perfis temporais** (um Perfil Atual de como a IA é gerida hoje e um
Perfil Alvo de onde a organização quer estar, cuja comparação revela as lacunas) e
**perfis transversais** para riscos comuns em utilizações, como o uso de grandes modelos de
linguagem, serviços baseados em nuvem ou aquisição [9]. Gerados a partir de metadados de controlo, o
Perfil Atual é a cobertura ao vivo de cada subcategoria por um controlo em execução, e o Perfil Alvo
é um diff revisto.

**NIST AI 600-1**, o Perfil de IA Generativa (26 de julho de 2024), é o principal perfil
transversal. Define 12 riscos únicos ou exacerbados por IA generativa: informação ou capacidades
CBRN; confabulação; conteúdo perigoso, violento ou odioso; privacidade de dados; impactos
ambientais; enviesamento prejudicial e homogeneização; configuração humano-IA; integridade da
informação; segurança da informação; propriedade intelectual; conteúdo obsceno, degradante e/ou
abusivo; integração da cadeia de valor e componentes [23]. Em seguida, lista ações sugeridas
indexadas às subcategorias do RMF com identificadores como `GV-1.1-001`; contamos 212 desses
identificadores no texto publicado [23]. Esses identificadores fazem bons nomes de teste: uma suite
de avaliação para confabulação que cita as ações que implementa pode ser rastreada até ao perfil sem
uma folha de cálculo. Em 7 de abril de 2026 NIST também anunciou uma nota de conceito para um perfil
do AI RMF em IA digna de confiança em infraestrutura crítica [24].

### Trabalho NIST adjacente

Quatro publicações NIST adicionais têm impacto direto na stack. Os rascunhos mais recentes já
indexados em [capítulo 08](/bok/regulatory-map#newer-nist-ai-work) (a AI Agent Standards Initiative,
o Cyber AI Profile em rascunho e o AI 800-1 em rascunho) não são repetidos aqui.

- **NIST AI 100-2 E2025** (março de 2025) é uma taxonomia e terminologia de aprendizagem automática
  adversarial: métodos de ML, fases do ciclo de vida de ataque, objetivos do atacante, objetivos,
  capacidades e conhecimento, e mitigações [25]. Use os seus termos para nomear os casos na
  [**Adversarial Red-Team Suite**](/patterns/adversarial-red-team-suite), para que uma descoberta
  leia o mesmo no relatório de avaliação e no modelo de ameaça.
- **NIST SP 800-218A** (julho de 2024) é um perfil comunitário do Secure Software Development
  Framework para IA generativa e modelos de fundação de dupla utilização. Adiciona práticas e
  tarefas específicas de IA ao SSDF 1.1 para produtores de modelos de IA, produtores de sistemas de
  IA que os utilizam, e adquirentes [26]. É a metade do pipeline de construção da história:
  proveniência de pesos e dados, integridade do ambiente de treino.
- **CSF 2.0** (26 de fevereiro de 2024) organiza resultados de cibersegurança em seis Funções:
  Govern, Identify, Protect, Detect, Respond e Recover [27]. O AI RMF e CSF 2.0 são irmãos, não
  substitutos: o RMF cobre risco de IA amplamente (equidade, privacidade, explicabilidade bem como
  segurança), CSF cobre resultados de cibersegurança para qualquer sistema, e ambos colocam a
  governação em primeiro lugar. O Cyber AI Profile em rascunho (NIST IR 8596) é a ponte, um perfil
  CSF 2.0 para IA [28].
- **COSAiS**, o SP 800-53 Control Overlays for Securing AI Systems, adaptará controlos SP 800-53 a
  cinco casos de uso: assistentes de IA generativa, IA preditiva, sistemas de agente único e
  multi-agente, e controlos para desenvolvedores de IA. A partir de 2026-09-24 a página do projeto
  mostra o documento de conceito (14 de agosto de 2025) e um esboço anotado para o overlay de IA
  preditiva (8 de janeiro de 2026), sem nenhum overlay de rascunho público ainda [29]. Para
  organizações que já executam SP 800-53, os overlays serão a rota mais direta de uma baseline de
  controlo existente para IA.

### Estado de revisão

O RMF em si previa uma revisão formal com entrada da comunidade não mais tarde de 2028, com versões
numeradas 1.n para menores e 2.0 para revisões principais [9]. A partir de 2026-09-24 a página do
framework do NIST afirma que o AI RMF 1.0 "está a ser revisto como parte do White House AI Action
Plan" [24]; não encontrámos nenhuma versão revista publicada, portanto 1.0 permanece o texto citável
(verifique antes de confiar na redação da categoria). Duas consequências de engenharia seguem. Fixe
a versão nos metadados de controlo (`nist_ai_rmf@1.0`), para que uma revisão seja um diff que revê
em vez de uma mudança silenciosa de significado. E prefira os identificadores de categoria e
subcategoria à sua prosa, porque os identificadores tendem a sobreviver a revisões melhor do que a
redação.

NIST também aloja cruzamentos do RMF para outros frameworks, incluindo ISO/IEC 42001 e, datado de 14
de agosto de 2025, um cruzamento ISO/IEC 23894 revisto e um novo ISO/IEC 42005 [30]. São um ponto de
partida sólido para um ficheiro de cruzamento, não um substituto para mapear os seus próprios
controlos.

## A família ISO/IEC

ISO/IEC JTC 1/SC 42 publica as normas internacionais de IA. São referenciadas aqui apenas por número
e título curto; os textos são vendidos pela ISO e organismos nacionais e não são reproduzidos. O
capítulo 08 já mapeia as áreas do Anexo A da ISO/IEC 42001 e ISO/IEC 42005, 42006 e 23894 para
artefatos ([capítulo 08, ISO/IEC](/bok/regulatory-map#isoiec-42001-42005-and-42006)).

### Fundações e vocabulário

| Norma | Título curto | O que muda no stack | Camada |
|---|---|---|---|
| `ISO/IEC 22989:2022` | Conceitos e terminologia de IA [31] | Vocabulário controlado para campos de registo e texto de política; papéis de stakeholder | 1 · 2 |
| `ISO/IEC 23053:2022` | Framework para sistemas de IA usando aprendizagem automática [32] | Decomposição de referência de um sistema de ML em componentes para o AIBOM | 2 |
| `ISO/IEC 5338:2023` | Processos do ciclo de vida do sistema de IA, baseados em ISO/IEC/IEEE 15288 e 12207 [33] | Fases do ciclo de vida a que os gates do pipeline se ligam | 1 · 3 |
| `ISO/IEC TR 24028:2020` | Visão geral da confiabilidade em IA [34] | Taxonomia de fundo para catálogos de ameaças e modos de falha | 1 |

ISO/IEC 22989 estabelece terminologia e conceitos para IA e é escrita para ser utilizada por outras
normas [31]; ISO/IEC 5338, por exemplo, extrai os seus processos específicos de IA de 22989 e 23053
[33]. Um registo cujos nomes de campos seguem 22989 necessita de menos tradução quando um auditor
trabalha a partir da família SC 42. A norma também define papéis de intervenientes como fornecedor
de IA, produtor de IA, cliente de IA, parceiro de IA e titular de IA (verifique a lista de papéis em
relação ao texto), que não são o fornecedor e responsável pela implantação do Regulamento da IA:
mapeie-os explicitamente no registo em vez de assumir que coincidem.

### Risco, qualidade e dados

| Norma | Título curto | O que muda no stack | Camada |
|---|---|---|---|
| `ISO/IEC 23894:2023` | IA: orientação sobre gestão de riscos [35] | Processo de risco de IA organizacional; registo de riscos como código | 1 · 3 |
| `ISO/IEC TR 24027:2021` | Enviesamento em sistemas de IA e tomada de decisão auxiliada por IA [36] | Fontes de enviesamento e medidas a cobrir em avaliações de equidade | 3 |
| Série `ISO/IEC 5259` (2024–2025) | Qualidade de dados para análise e ML: visão geral, estrutura de processo, estrutura de governação e partes relacionadas [37] | Testes de qualidade de dados em CI; campos de ficha de dados; papéis de governação de dados | 2 · 3 |
| `ISO/IEC 25059:2023` | Modelo de qualidade para sistemas de IA (extensão SQuaRE) [38] | Características de qualidade a especificar e medir; cobertura de suite de avaliação | 3 |
| `ISO/IEC 38507:2022` | Implicações de governação do uso de IA por organizações [39] | Direitos de decisão ao nível do conselho e relatórios de supervisão | 1 · 5 |

Dois detalhes importam para o planeamento. ISO/IEC 25059 está marcada como "a ser revista" na página
da ISO a partir de 2026-09-24, com uma edição de substituição já em fase FDIS e esperada dentro de
meses [38], portanto fixe a edição que mapeia. E ISO/IEC 38507 é escrita para o órgão de governação
e seus conselheiros (executivos, auditores, decisores políticos) [39]: é a norma que diz a um
conselho o que é seu, que é onde o caminho de escalada na camada 05 termina.

### O trio de sistemas de gestão

**ISO/IEC 42001:2023** especifica requisitos para estabelecer, implementar, manter e melhorar
continuamente um sistema de gestão de IA [40]. **ISO/IEC 42005:2025** fornece orientação para
avaliações de impacto de sistemas de IA sobre indivíduos, grupos e sociedade ao longo do ciclo de
vida [41]. **ISO/IEC 42006:2025** estabelece requisitos adicionais, além de ISO/IEC 17021-1, para
organismos que auditam e certificam sistemas de gestão de IA contra 42001 [42]: é como o emissor de
um certificado demonstra a competência para o emitir.

42001 segue a Estrutura Harmonizada da ISO para normas de sistemas de gestão, o esquema partilhado e
texto central definido no Anexo SL, portanto as suas cláusulas 4 a 10 (contexto, liderança,
planeamento, suporte, operação, avaliação de desempenho, melhoria) alinham-se com todas as outras
normas de sistemas de gestão da ISO [43]. Como ISO/IEC 27001, emparelha essas cláusulas com um anexo
de controlos, e a organização justifica quais controlos aplica numa Declaração de Aplicabilidade
(verifique a redação da cláusula). A leitura de engenharia da SoA: é um ficheiro gerado, não um
documento. Cada controlo do Anexo A listado como aplicável deve apontar para o controlo em execução
e o fluxo de evidência que o implementa; cada exclusão deve incluir a sua justificação e um
proprietário.

O que um certificado 42001 prova, e o que não prova, é estabelecido em
[capítulo 07](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments) e
[capítulo 08](/bok/regulatory-map#what-is-not-harmonised-yet): evidencia um sistema de gestão; não
confere presunção de conformidade com o Regulamento da IA.

### Integração com 27001, 27701 e 9001

A ISO desenhou normas de sistemas de gestão para partilharem uma estrutura de modo a que uma
organização possa executar um sistema de gestão integrado satisfazendo vários deles simultaneamente
[43]. Para IA isso significa ISO/IEC 42001 juntamente com ISO/IEC 27001:2022 para segurança da
informação [44], ISO/IEC 27701 para privacidade, cuja edição 2025 é um sistema de gestão de
informações de privacidade autónomo que pode ser utilizado isoladamente ou alinhado com 27001 [45],
e ISO 9001 para qualidade, cuja edição 2026 substituiu a edição 2015 em setembro de 2026 [46].

| Cláusula partilhada (Estrutura Harmonizada) | Um artefato servindo todos os quatro | Camada |
|---|---|---|
| 4 Contexto | Uma declaração de âmbito e registo de partes interessadas, com sistemas de IA como entradas de registo | 2 |
| 5 Liderança | Um conjunto de políticas como código, com secções de IA, segurança, privacidade e qualidade | 1 |
| 6 Planeamento | Um registo de riscos com riscos tipificados (IA, segurança, privacidade, qualidade) e um fluxo de tratamento único | 1 |
| 7 Suporte | Um registo de competência e treino único; um armazenamento de informações documentadas único | 5 |
| 8 Operação | Portas de pipeline etiquetadas com as normas que cada uma serve | 1 · 3 · 4 |
| 9 Avaliação de desempenho | Um armazenamento de evidência respondendo auditoria interna para todos os quatro | 5 |
| 10 Melhoria | Uma fila de não-conformidade e ação corretiva alimentada por incidentes | 5 |

> **Na prática (ilustrativo)**
> Uma equipa que já tinha ISO/IEC 27001 adicionou 42001 estendendo, não duplicando. O registo de
> riscos ganhou um tipo de risco `ai` e uma ligação ao id de registo; o programa de auditoria
> interna ganhou controlos de IA; a Declaração de Aplicabilidade para 42001 foi gerada a partir dos
> mesmos metadados de controlo que a de 27001. A auditoria de certificação encontrou a evidência
> onde os auditores de 27001 sempre a tinham encontrado. O único novo artefato foi a avaliação de
> impacto, construída para 42005 e anexada a cada entrada de registo de risco elevado.

## Normas harmonizadas sob o Regulamento da IA

*Última revisão 2026-09-24. Os estágios mudam mensalmente; verifique novamente antes de confiar em
qualquer linha.*

### Como funciona a presunção de conformidade

O artigo 40 do Regulamento da IA presume que sistemas de risco elevado (e modelos de IA de
finalidade geral) estão em conformidade com os requisitos correspondentes quando estão em
conformidade com normas harmonizadas cujas referências foram publicadas no Jornal Oficial, na medida
em que as normas cobrem esses requisitos [2]. Duas condições controlam a presunção: uma norma
europeia adotada a pedido da Comissão, e a sua referência citada no JO após a Comissão a avaliar. A
publicação apenas por CEN-CENELEC não é suficiente. Quando as normas não chegam, não são aceites ou
abordam insuficientemente direitos fundamentais, o artigo 41 permite à Comissão adotar
**especificações comuns** por ato de execução [2].

A Comissão pediu primeiro a CEN e CENELEC normas de IA em 22 de maio de 2023 (`C(2023)3215`,
registado como pedido `M/593`) [47][48]. Após CEN-CENELEC relatar atrasos significativos, a Comissão
revogou e substituiu esse pedido em junho de 2025 com `C(2025)3871`, alinhado com o texto final do
Regulamento da IA [47]. O pedido cobre dez tópicos: gestão de riscos; governação e qualidade de
conjuntos de dados; manutenção de registos; transparência; supervisão humana; precisão; robustez;
cibersegurança; gestão de qualidade; avaliação de conformidade [49]. Em outubro de 2025 CEN e
CENELEC adotaram medidas excecionais para acelerar a entrega, incluindo publicação direta após um
voto de Consulta positivo sem um voto formal separado, com os produtos prioritários visados para Q4
2026 [48].

O calendário interage com o Omnibus Digital, que moveu a aplicação das obrigações de risco elevado
do Anexo III para 2 de dezembro de 2027 e do Anexo I para 2 de agosto de 2028 [50]. Para a maioria
dos prestadores as normas devem portanto chegar antes das obrigações se aplicarem, mas não muito
antes, o que deixa pouco espaço para construir para um texto final.

### O programa JTC 21

O trabalho situa-se no comité técnico conjunto CEN-CENELEC JTC 21, organizado em grupos de trabalho
sobre aspetos operacionais, aspetos de engenharia, aspetos fundamentais e sociais, e cibersegurança
[51]. Os estágios abaixo vêm de um ponto de informação de normas pan-europeu executado com
organismos nacionais de normalização [52] e são verificados em relação a um rastreador público [53];
ambos são secundários, e o mapeamento de artigos é conforme relatado por essas fontes.

| Entregável | Assunto | Regulamento da IA | Estágio a partir de 2026-09-24 (relatado) | O que muda no stack | Camada |
|---|---|---|---|---|---|
| `EN 18286:2026` | Sistema de gestão de qualidade para fins do Regulamento da IA | `Art. 17` | Publicado julho de 2026 [54]; nenhuma citação de JO encontrada | Processos de QMS executados como estágios de pipeline; design e controlo de mudança deixam evidência | 1 · 5 |
| `prEN 18228` | Gestão de riscos de IA | `Art. 9` | Voto de Consulta encerrado 30 jul 2026 | Ficheiro de risco do prestador: perigo, estimativa, avaliação, controlo, monitorização; critérios de aceitabilidade como código | 1 · 3 · 5 |
| `prEN 18229-1` | Estrutura de confiabilidade, Parte 1: registo | `Art. 12` | Voto de Consulta encerrado 20 ago 2026 | Esquema de registo de eventos e retenção para sistemas de risco elevado | 4 · 5 |
| `prEN 18229-2` | Parte 2: transparência | `Art. 13` | Redação (período de comentários encerrado jan 2026) | Campos de instruções de utilização e ficha de modelo | 2 |
| `prEN 18229-3` | Parte 3: supervisão humana | `Art. 14` | Consulta lançada 30 jul 2026 | Design de ponto de controlo de supervisão; telemetria de supervisão | 4 |
| `prEN 18229-4`, `-5` | Partes 4 e 5: precisão, robustez | `Art. 15` | Novos projetos aprovados 24 jun 2026 | Limiares de precisão e robustez na porta de avaliação | 3 |
| `prEN 18282` | Especificações de cibersegurança para sistemas de IA | `Art. 15` | Voto de Consulta encerrado 30 jul 2026 | Modelo de ameaça; suite adversarial; detecção em tempo de execução | 3 · 4 |
| `prEN 18283` | Gestão de enviesamento em sistemas de IA | `Art. 10` | Aprovado para Consulta 24 set 2026 | Medidas de enviesamento em avaliações de equidade; tratamento de dados enviesados | 2 · 3 |
| `prEN 18284` | Qualidade e governação de conjuntos de dados | `Art. 10` | Redação; nenhuma Consulta registada (verifique) | Fichas de dados; linhagem; testes de aceitação de conjuntos de dados | 2 · 3 |
| `prEN 18285` | Estrutura de avaliação de conformidade | `Art. 43` | Redação; nenhuma Consulta registada (verifique) | Estrutura do pacote de evidência para avaliação | 5 |
| `prEN 18281`, `prEN ISO/IEC 23282` | Avaliação de precisão para visão computacional e para PNL | `Art. 15` | 18281: Voto de Consulta encerrado 11 jun 2026; 23282: Consulta de 3 set 2026 | Métodos e métricas de avaliação específicas de tarefas | 3 |

Algumas normas ISO/IEC também foram adotadas como normas europeias (por exemplo
`EN ISO/IEC 23894:2024` [52]). A adoção como EN não torna uma norma harmonizada sob o Regulamento da
IA: apenas uma norma entregue a pedido da Comissão e citada no JO carrega a presunção. A partir de
2026-09-24 não encontrámos nenhuma decisão de execução da Comissão citando qualquer norma
harmonizada do Regulamento da IA, consistente com o rastreador de junho de 2026 [53] e com
[capítulo 08](/bok/regulatory-map#what-is-not-harmonised-yet) (verifique em EUR-Lex antes de confiar
nela).

### O que cada produto entregável muda no stack

Os rascunhos não são públicos, portanto esta é uma leitura dos seus âmbitos publicados, não das suas
cláusulas. Três mudanças destacam-se.

**A gestão de riscos move-se da organização para o produto.** O âmbito publicado de prEN 18228
aborda prestadores de sistemas de IA: identificar perigos, estimar e avaliar riscos, controlá-los e
monitorizar os controlos, para riscos à saúde, segurança e direitos fundamentais, ao longo do ciclo
de vida. Requer que os prestadores estabeleçam critérios objetivos de aceitabilidade de risco, mas
não estabelece os níveis, e não se destina a gerir riscos que a própria organização enfrenta [52].
Esse é um objeto diferente de ISO/IEC 23894, que orienta a gestão de riscos organizacional [35]. No
stack, o ficheiro de risco torna-se um artefato por sistema com chave no id de registo, com
critérios de aceitabilidade escritos como limiares que uma porta pode avaliar, e monitorização que
fecha o ciclo na camada 05.

**O registo, a supervisão e a transparência tornam-se especificáveis.** A série prEN 18229 divide os
Artigos 12–15 em partes separadas [52]. Uma vez final, a parte de registo é um esquema para validar
registos de eventos em CI, a parte de supervisão uma referência de conceção para a
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate), e a parte de transparência uma lista
de campos para a ficha de modelo e instruções de utilização.

**O SGQ torna-se auditável como um pipeline.** A EN 18286 suporta o sistema de gestão da qualidade
do Artigo 17 [54]. Um SGQ cujo controlo de conceção, gestão de alterações e acompanhamento
pós-comercialização funcionam como fases de pipeline emite a sua própria evidência; um que existe em
procedimentos não o faz. O padrão
[**Machine-Readable Evidence (OSCAL)**](/patterns/machine-readable-evidence-oscal) é como essa
evidência chega a um avaliador.

### Construir antes da citação do JO

A lacuna entre um rascunho e uma norma citada é onde a maioria das equipas passará 2026 e 2027. Três
regras mantêm o trabalho reutilizável:

1. **Construir para o requisito, mapear para a norma.** O artigo do Regulamento da IA é fixo; a
   numeração das cláusulas da norma não é. Controlos-chave em `Art. 9`, `Art. 12` e assim por
   diante, e adicione ids de cláusula de norma como metadados quando o texto for final.
2. **Manter uma vigilância de normas como dados.** Um ficheiro com cada entrega, a sua fase, a data
   em que verificou pela última vez e os controlos que dependem dela. Uma mudança de fase é então um
   diff que nomeia os controlos a rever, não uma surpresa.
3. **Não reclame a presunção cedo.** Até que a citação do JO exista, a conformidade com um rascunho
   ou uma EN publicada é evidência pelos seus próprios méritos, não uma presunção. Diga-o na
   documentação técnica.

> **Na prática (ilustrativo)**
> Um prestador de uma ferramenta de recrutamento de IA de risco elevado construiu o seu ficheiro de
> risco para o âmbito publicado da prEN 18228 enquanto o rascunho estava em Inquérito: perigos,
> estimativas, controlos e monitorização por sistema, com limiares de aceitabilidade como código.
> Quando a EN 18286 foi publicada, a equipa comparou a sua lista de processos SGQ com as fases de
> pipeline que já executava e encontrou duas lacunas (notificação de mudança de fornecedor e uma
> cadência de revisão pós-comercialização). Ambas se tornaram fases de pipeline com proprietários. O
> ficheiro de vigilância de normas registou a data de cada verificação, que é o que um avaliador
> pediu para ver.

## Série IEEE 7000

A série IEEE 7000 aborda a ética como processo de engenharia de sistemas. Nenhuma destas normas é
harmonizada sob o Regulamento da IA, e nenhuma confere uma presunção; são úteis como referências de
processo.

| Norma | Assunto | O que muda no stack | Camada |
|---|---|---|---|
| `IEEE 7000-2021` | Processo de modelo para considerar valores éticos desde exploração de conceito até desenvolvimento, com elicitação de valor de partes interessadas e rastreabilidade [55] | Requisitos de valor rastreados até decisões de conceção e testes | 1 |
| `IEEE 7001-2021` | Transparência de sistemas autónomos, em níveis mensuráveis e testáveis [56] | Níveis de transparência escritos como requisitos testáveis | 2 · 3 |
| `IEEE 7002-2022` | Processo de privacidade de dados para sistemas que utilizam dados pessoais [57] | Requisitos de privacidade como gates de SDLC | 1 · 2 |
| `IEEE 7003-2024` | Considerações de enviesamento algorítmico, incl. seleção de dados de validação e limites de aplicação [58] | Conjuntos de validação de enviesamento; limites de aplicação declarados no registo | 2 · 3 |
| `IEEE 7005-2021` | Governação transparente de dados de empregadores [59] | Regras de tratamento para dados de empregados utilizados por IA | 2 |
| `IEEE 7010-2020` | Prática recomendada para avaliar o impacto de sistemas autónomos e inteligentes no bem-estar humano [60] | Indicadores de bem-estar na avaliação de impacto | 2 |

Os "limites de aplicação para os quais o algoritmo foi concebido" da IEEE 7003 é a ideia mais
portável aqui: um limite declarado na entrada do registo é algo que um guardrail de runtime pode
impor e uma avaliação pode testar [58].

## Um controlo, muitos instrumentos

Os instrumentos sobrepõem-se muito mais do que os seus vocabulários diferentes dos autores sugerem.
A tabela mostra, para sete controlos que o stack já constrói, onde cada instrumento os pede. É um
ponto de partida para um ficheiro de crosswalk, não uma afirmação de que as linhas são equivalentes.

| Controlo (camada) | OECD | CoE CETS 225 | G7 Code | NIST AI RMF | ISO/IEC | JTC 21 |
|---|---|---|---|---|---|---|
| Avaliação de risco e impacto (1 · 2) | `1.5(c)` | `Art. 16` | Ação 1 | MAP 5, MANAGE 1 | 23894, 42005 | prEN 18228 |
| Testagem antes do lançamento e na mudança (3) | `1.4(a)` | `Art. 16(2)(g)` | Ação 1 | MEASURE 1, 2 | 42001 `A.6` | prEN 18229-4, -5 |
| Rastreabilidade e registo (4 · 5) | `1.5(b)` | `Art. 14(2)(a)` | Ação 1 | MEASURE 3, MANAGE 4 | 42001 `A.6` | prEN 18229-1 |
| Transparência e divulgação (2 · 4) | `1.3` | `Art. 8`, `15(2)` | Ação 3 | MEASURE 2.8 | 42001 `A.8` | prEN 18229-2 |
| Supervisão humana e sobreposição (4) | `1.2(b)`, `1.4(b)` | `Art. 8` | – | MAP 3.5, MANAGE 2.4 | 42001 `A.9` | prEN 18229-3 |
| Tratamento e partilha de incidentes (5) | – | `Art. 16(3)` | Ações 2, 4 | GOVERN 4.3, MANAGE 4.3 | 42001 `10.2` | – |
| Cadeia de fornecimento e terceiros (2) | `1.5(c)` | – | Ação 11 | GOVERN 6, MANAGE 3 | 42001 `A.10` | – |

Fontes: [7][1][10][9][40][52]; os ids de cláusula ISO/IEC 42001 e Anexo A seguem
[capítulo 08](/bok/regulatory-map#isoiec-42001-42005-and-42006) e o
[crosswalk](/resources/crosswalk) do site, cujo [explorador](/resources/crosswalk#explore) deriva
estes pares para quaisquer dois instrumentos e os exporta como uma coleção de mapeamento OSCAL. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

A regra de engenharia é a do fluxo de trabalho de
[tradução regulatória](/bok/the-role#regulatory-translation): construir cada controlo uma vez,
etiquetá-lo com cada instrumento que serve, e gerar a vista de cada instrumento a partir das
etiquetas. Um princípio, um artigo de tratado, uma subcategoria e uma cláusula harmonizada tornam-se
então quatro consultas sobre a mesma evidência, e adicionar um quinto instrumento é uma mudança de
metadados, não um novo programa.

**Correspondências:** Princípios de IA da OCDE `1.1`–`1.5` · CoE CETS n.º 225 Arts. 14–16 · Ações
1–7, 10, 11 do Código de Conduta G7 Hiroshima · Regulamento da IA da UE Art. 9–15, 17, 40, 41 ·
ISO/IEC 22989, 23894, 42001, 42005, 42006 · NIST AI RMF (Govern, Map, Measure, Manage) e AI 600-1 ·
Entregas CEN-CENELEC JTC 21 · todas as cinco camadas do stack. Os mapeamentos são ilustrativos, não
uma afirmação de conformidade.

## O que pode fazer esta semana

1. **Adicione as cinco dimensões de classificação da OCDE ao esquema do seu registo** como campos
   obrigatórios, e faça uma política ler uma delas (por exemplo, `rights_impact: high` requer uma
   avaliação de equidade).
2. **Etiquete os seus dez controlos mais importantes com ids de subcategoria NIST AI RMF e ids de cláusula ISO/IEC 42001**,
   fixados à edição, e gere um Perfil Atual a partir das etiquetas.
3. **Inicie um ficheiro de vigilância de normas** listando cada entrega JTC 21 na tabela acima, a
   sua fase, a data em que verificou e os controlos que dependem dela; defina uma revisão mensal.
4. **Pegue nos princípios de IA publicados da sua organização e nomeie, para cada um, o controlo e o registo de evidência que o implementam.**
   Um princípio sem controlo é uma lacuna; escreva-o como tal.
5. **Se tem ISO/IEC 27001, mapeie as suas cláusulas partilhadas para as 42001** e aponte ambas para
   um armazém de evidência antes de escrever qualquer novo procedimento.

## Sources

[1] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Art. 2 definition; Art. 3 scope and private-actor declaration; Arts. 7–13 principles; Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 40 and 41 (Art. 40: harmonised standards, presumption of conformity once references are published in the OJ; Art. 41: common specifications by implementing act). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_40 (verified: primary)
[3] OECD AI Principles overview (47 adherents: 38 OECD members, the EU and eight non-members; definition and lifecycle used by the EU, the Council of Europe, the US and the UN; AI Incidents and Hazards Monitor; Hiroshima AI Reporting Framework). OECD.AI. 2026-09-24. https://oecd.ai/en/ai-principles (verified: primary)
[4] Recommendation on the Ethics of Artificial Intelligence (adopted November 2021 by 193 Member States; four core values, ten core principles, policy action areas). UNESCO. 2021-11. https://www.unesco.org/en/artificial-intelligence/recommendation-ethics (verified: primary)
[5] The Framework Convention on Artificial Intelligence (technology-neutral; Parties: the European Union; 20 further signatories listed, read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[6] Ethics Guidelines for Trustworthy AI (lawful, ethical, robust; seven key requirements; human-in-the-loop, human-on-the-loop, human-in-command; "safeguards that enable a fallback plan in case of problems"). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[7] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; G20 AI Principles drawn from it, June 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles, five recommendations; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[8] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (Fig. 1 harms; risk tolerance not prescribed; Fig. 2 lifecycle and dimensions adapted from the OECD; seven trustworthy characteristics; Core of 4 functions and 19 categories, 72 subcategories by our count of Tables 1–4; use-case, temporal and cross-sectoral profiles; formal review no later than 2028). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems, with the International Guiding Principles (11 actions; voluntary; living document building on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[11] "Council of Europe adopts first international treaty on artificial intelligence" (adopted in Strasbourg on 17 May 2024; opens for signature in Vilnius on 5 September 2024). Council of Europe. 2024-05-17. https://www.coe.int/en/web/portal/-/council-of-europe-adopts-first-international-treaty-on-artificial-intelligence (verified: primary)
[12] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (first reports by 15 April 2025, rolling submissions, annual updates). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[13] "European Union ratifies the Council of Europe Framework Convention on Artificial Intelligence" (15 May 2026, 135th Session of the Committee of Ministers, Chișinău). Council of Europe. 2026-05-15. https://www.coe.int/en/web/artificial-intelligence/-/european-union-ratifies-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), Recitals 12 and 27 and Art. 3(1) (recital 27: the seven AI HLEG principles as non-binding guidance; recital 12: the AI-system notion closely aligned with the work of international organisations; Art. 3(1)). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#rct_27 (verified: primary)
[15] Catalogue of Tools & Metrics for Trustworthy AI. OECD.AI. 2026. https://oecd.ai/en/catalogue/overview (verified: primary)
[16] Readiness Assessment Methodology (RAM): country-level readiness to govern AI (RAM 2.0). UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/ram (verified: primary)
[17] Ethical Impact Assessment (EIA): system-level assessment before and during use, for governments, companies and researchers. UNESCO Global AI Ethics and Governance Observatory. 2026. https://www.unesco.org/ethics-ai/en/eia (verified: primary)
[18] "EU Parliament backs EU conclusion of the Council of Europe Framework Convention on Artificial Intelligence" (European Parliament approval on 11 March 2026). Council of Europe. 2026-03-11. https://www.coe.int/en/web/artificial-intelligence/-/eu-parliament-backs-eu-conclusion-of-the-council-of-europe-framework-convention-on-artificial-intelligence (verified: primary)
[19] Council Decision (EU) 2026/1080 of 21 April 2026 on the conclusion, on behalf of the European Union, of the Council of Europe Framework Convention on AI (implemented in the Union exclusively through Reg. (EU) 2024/1689 and other relevant Union acquis; declaration under Art. 3(1)(b) on private actors; OJ L 13 May 2026; text read from the Publications Office Cellar, CELEX 32026D1080). Council of the EU (EUR-Lex). 2026-05-13. https://eur-lex.europa.eu/eli/dec/2026/1080/oj/eng (verified: primary)
[20] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 February 2025; HUDERIA Model: COBRA approved 25 February 2026; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[21] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list 17 July 2020 after a pilot with over 350 stakeholders; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[22] NIST AI RMF Playbook, GOVERN entries (per subcategory: About; Suggested Actions; Transparency and Documentation; AI Transparency Resources; References). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[23] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV/MP/MS/MG, 212 identifiers by our count). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[24] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; concept note for a critical-infrastructure profile, 7 April 2026). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[25] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations. NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[26] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (augments SSDF 1.1). NIST. 2024-07-26. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[27] The NIST Cybersecurity Framework (CSF) 2.0, NIST CSWP 29 (Functions: Govern, Identify, Protect, Detect, Respond, Recover). NIST. 2024-02-26. https://doi.org/10.6028/NIST.CSWP.29 (verified: primary)
[28] NIST IR 8596 (initial preliminary draft): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile; comments closed 30 January 2026). NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[29] SP 800-53 Control Overlays for Securing AI Systems (COSAiS) (five use cases; concept paper 14 August 2025; predictive-AI annotated outline 8 January 2026; page updated 8 January 2026). NIST CSRC. 2026-01-08. https://csrc.nist.gov/projects/cosais (verified: primary)
[30] AI RMF crosswalk documents (AI RMF to ISO/IEC 42001; ISO/IEC 23894 revised crosswalk and ISO/IEC 42005 crosswalk dated 14 August 2025). NIST Trustworthy and Responsible AI Resource Center. 2025. https://airc.nist.gov/airmf-resources/crosswalks/ (verified: primary)
[31] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology. ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[32] ISO/IEC 23053:2022, Framework for AI systems using machine learning. ISO/IEC. 2022-06. https://www.iso.org/standard/74438.html (verified: primary)
[33] ISO/IEC 5338:2023, AI system life cycle processes (based on ISO/IEC/IEEE 15288 and 12207, with AI-specific processes from ISO/IEC 22989 and 23053). ISO/IEC. 2023-12. https://www.iso.org/standard/81118.html (verified: primary)
[34] ISO/IEC TR 24028:2020, Overview of trustworthiness in artificial intelligence. ISO/IEC. 2020-05. https://www.iso.org/standard/77608.html (verified: primary)
[35] ISO/IEC 23894:2023, AI: Guidance on risk management (organisational AI risk management). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[36] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making. ISO/IEC. 2021-11. https://www.iso.org/standard/77607.html (verified: primary)
[37] ISO/IEC 5259 series, Data quality for analytics and machine learning (Part 1:2024 overview, terminology and examples; Part 4:2024 process framework; Part 5:2025 governance framework). ISO/IEC. 2024-07. https://www.iso.org/standard/81088.html (verified: primary)
[38] ISO/IEC 25059:2023, SQuaRE: Quality model for AI systems (stage 90.92, to be revised, as of 2026-09-24; replacement at FDIS stage, expected within the coming months). ISO/IEC. 2023-06. https://www.iso.org/standard/80655.html (verified: primary)
[39] ISO/IEC 38507:2022, Governance implications of the use of artificial intelligence by organizations (for governing bodies, executives, auditors, policymakers). ISO/IEC. 2022-04. https://www.iso.org/standard/56641.html (verified: primary)
[40] ISO/IEC 42001:2023, AI management systems (requirements for establishing, implementing, maintaining and continually improving an AIMS). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: primary)
[41] ISO/IEC 42005:2025, AI system impact assessment (guidance). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[42] ISO/IEC 42006:2025, Requirements for AIMS audit and certification bodies (builds on ISO/IEC 17021-1). ISO/IEC. 2025-07. https://www.iso.org/standard/44546.html (verified: primary)
[43] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[44] ISO/IEC 27001:2022, Information security management systems. ISO/IEC. 2022-10. https://www.iso.org/standard/82875.html (verified: primary)
[45] ISO/IEC 27701:2025, Privacy information management systems: Requirements and guidance (independent management system standard; aligns with ISO/IEC 27001). ISO/IEC. 2025-10. https://www.iso.org/standard/85819.html (verified: primary)
[46] ISO 9001:2026, Quality management systems: Requirements (replaces ISO 9001:2015). ISO. 2026-09. https://www.iso.org/standard/9001 (verified: primary)
[47] Commission Implementing Decision C(2025)3871 on a standardisation request to CEN and Cenelec in support of Reg. (EU) 2024/1689, repealing Implementing Decision C(2023)3215 of 22 May 2023 (significant delays reported by CEN and Cenelec; request aligned with the final AI Act). European Commission. 2025-06-23. https://ec.europa.eu/transparency/documents-register/detail?ref=C(2025)3871&lang=en (verified: primary)
[48] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; drafting group for delayed drafts; Q4 2026 target; Standardization Request M/593 and Amendment M/613). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[49] AI Act standardisation (ten requested topics; prEN 18286 first to public enquiry on 30 October 2025; page updated 3 August 2026). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[50] "AI Omnibus enters into force" (Reg. (EU) 2026/1744; Annex III high-risk from 2 Dec 2027; Annex I from 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[51] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity; prEN 18229 in five parts). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[52] Project stages for JTC 21 deliverables read on 2026-09-24: EN 18286:2026 (60.60, 2026-07-22); prEN 18228 (40.60, vote closed 2026-07-30; published scope); prEN 18229-1 (40.60, 2026-08-20); prEN 18229-2 (20.60, 2026-01-06); prEN 18229-3 (40.20, 2026-07-30); prEN 18229-4 and -5 (10.99, 2026-06-24); prEN 18281 (40.60, 2026-06-11); prEN 18282 (40.60, 2026-07-30); prEN 18283 (30.99, 2026-09-24); prEN 18284 (10.99); prEN 18285 (10.99); prEN ISO/IEC 23282 (40.20, 2026-09-03); EN ISO/IEC 23894:2024 (60.60). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[53] JTC 21 standards tracker (AI Act article per deliverable; no JTC 21 deliverable cited in the OJ as of June 2026). kla.digital. 2026-06-29. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[54] "EN 18286 in the spotlight: supporting compliance with the AI Act" (EN 18286:2026, Artificial intelligence: Quality management system for EU AI Act regulatory purposes; supports Art. 17). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[55] IEEE 7000-2021, Standard Model Process for Addressing Ethical Concerns during System Design. IEEE SA. 2021. https://standards.ieee.org/standard/7000-2021.html (verified: primary)
[56] IEEE 7001-2021, Standard for Transparency of Autonomous Systems. IEEE SA. 2021. https://standards.ieee.org/standard/7001-2021.html (verified: primary)
[57] IEEE 7002-2022, Standard for Data Privacy Process. IEEE SA. 2022. https://standards.ieee.org/standard/7002-2022.html (verified: primary)
[58] IEEE 7003-2024, Standard for Algorithmic Bias Considerations (validation-data selection; application boundaries). IEEE SA. 2024. https://standards.ieee.org/standard/7003-2024.html (verified: primary)
[59] IEEE 7005-2021, Standard for Transparent Employer Data Governance. IEEE SA. 2021. https://standards.ieee.org/standard/7005-2021.html (verified: primary)
[60] IEEE 7010-2020, Recommended Practice for Assessing the Impact of Autonomous and Intelligent Systems on Human Well-Being. IEEE SA. 2020. https://standards.ieee.org/standard/7010-2020.html (verified: primary)
