---
lang: pt
source: bok/13-risk-management.md
sourceHash: "5d4b19bcfaf479cb81e356f3a4f331c3aaeac3d7bc06c510b84c82a57fa70158"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 13. Onde a gestão de riscos se situa

> A gestão de riscos é o ciclo que diz a cada outro controlo com que força morder: identificar,
> avaliar, tratar e monitorizar, executado nas cinco camadas e sete fluxos de trabalho, com o
> registo de riscos como evidência.

## O que este capítulo estabelece

O livro tem-se apoiado em risco sem lhe dar um lugar. O capítulo 03 diz que cada controlo deve
[começar a partir de um modo de falha ou dano nomeado](/bok/values-and-principles#start-from-a-named-failure-mode-or-a-named-harm);
o capítulo 04 avisa contra uma junta de revisão de riscos que classifica conclusões mas não consegue
impedir um lançamento; o capítulo 08 nomeia um "registo de riscos como código" como o artefato por
trás de `Art. 9` sem o definir. Nenhum deles diz onde as decisões de risco são tomadas, em que
escala, por quem, ou como uma decisão se torna um limiar que um pipeline pode impor. Este capítulo
faz.

A afirmação é breve. A gestão de riscos não é uma sexta camada e não é uma comissão ao lado do
stack. É o ciclo que define os parâmetros de cada outro controlo: quais sistemas recebem quais
portões, quão alto fica um limiar de avaliação, quando uma pessoa deve aprovar uma ação, e quem pode
assinar pelo risco que fica. O ciclo tem quatro passos (identificar, avaliar, tratar, monitorizar).
Cada passo produz um artefato numa das cinco camadas e é propriedade de um dos sete fluxos de
trabalho do capítulo 06. O seu registo de evidência é o **registo de riscos**, mantido como dados
versionados em vez de como uma folha de cálculo.

Três contrastes mantêm o âmbito honesto (o capítulo 01 tem o agrupamento completo).
**Gestão de riscos empresariais** agrega cada risco que uma organização executa; a gestão de riscos
de IA alimenta-a, como o NIST AI RMF pede [1]. **Gestão de riscos de modelos** valida modelos na
tradição bancária; nos Estados Unidos a sua orientação fundadora, SR 11-7, foi substituída em 17 de
Abr de 2026 por orientação interagencial que adapta a prática ao perfil de risco de modelo, tamanho
e complexidade de cada banco [2]. Esta disciplina toma de empréstimo a adaptação e adiciona agentes,
controlo em tempo de execução e evidência contínua. **Investigação em segurança de IA** pergunta se
uma capacidade é perigosa em princípio; este capítulo decide o que uma implantação pode fazer, e o
prova.

## Risco, definido para engenheiros

Duas definições ancoram o capítulo. O Regulamento da IA da UE define **risco** como "a combinação da
probabilidade de ocorrência de dano e da gravidade desse dano" [3]. O NIST AI RMF usa a mesma forma,
"a medida composta da probabilidade de um evento ocorrer e a magnitude ou grau das consequências", e
permite que essas consequências sejam positivas ou negativas [1]. Este livro funciona no lado
negativo: dano a pessoas, aos seus direitos, à organização e aos sistemas à sua volta. O vocabulário
partilhado vem da família de normas ISO de risco, cuja norma de vocabulário atual é ISO 31073:2022;
substituiu ISO Guide 73:2009, que agora está retirada [4].

Cada termo abaixo tem um artefato que o contém; esse é o teste de que um termo funciona.

| Termo | Significado neste livro | Onde vive |
|---|---|---|
| **Fonte de risco** | Qualquer coisa que possa dar origem a risco: um conjunto de dados, uma concessão de ferramenta, um adversário, um grupo de utilizadores | Registo `source`; AIBOM; modelo de ameaça |
| **Risco inerente** | A classificação antes de qualquer controlo ser contado | Registo `inherent` |
| **Risco residual** | A classificação após os controlos que têm evidência de funcionamento | Registo `residual` |
| **Apetite de risco** | Quanto risco, e de que tipos, a organização está preparada para assumir para os seus objetivos | Ficheiro de dados de apetite (camada 01) |
| **Tolerância de risco** | Quanto de um dado risco a organização suportará para atingir um objetivo; o limite que um portão impõe | Limiares de nível (camada 01) |
| **Tratamento** | A opção escolhida (evitar, mitigar, transferir, aceitar) e os controlos que a executam | Registo `treatment`; ids de controlo |
| **Aceitação** | Uma decisão nomeada, assinada e com expiração para suportar um risco residual | Registo de aceitação (camada 05) |

A IA torna cada um destes mais difícil de fixar. O NIST lista porquê: componentes de terceiros,
riscos emergentes, sem métricas acordadas, classificações que mudam ao longo do ciclo de vida,
resultados de laboratório que diferem da produção, opacidade e sem linha de base humana [1]. Assim,
cada classificação é provisória, recomputada a partir de evidência (um resultado de avaliação, um
sinal de telemetria, um incidente), não re-argumentada numa reunião.

## O ciclo: identificar, avaliar, tratar, monitorizar

ISO 31000:2018 dá o processo genérico: comunicar e consultar; definir âmbito, contexto e critérios;
avaliar (identificar, analisar, avaliar); tratar; monitorizar e rever; registar e relatar [5]. A
edição de 2018 é atual mas sinalizada para revisão, com um sucessor em fase de rascunho de comissão
a partir de 2026-09-24 [5]. ISO/IEC 23894:2023 é a orientação específica de IA para organizações que
desenvolvem, produzem, implantam ou utilizam IA, personalizável para qualquer organização e contexto
[6]. As suas cláusulas seguem a estrutura ISO 31000, como o mapa cruzado do NIST entre os dois
mostra [7].

O Regulamento da IA da UE transforma o mesmo ciclo em lei para sistemas de risco elevado. O artigo 9
exige que um sistema de gestão de riscos seja "estabelecido, implementado, documentado e mantido",
executado como um processo iterativo contínuo ao longo do ciclo de vida, com quatro passos:
identificar e analisar os riscos conhecidos e razoavelmente previsíveis para a saúde, segurança ou
direitos fundamentais; estimar e avaliar os riscos sob utilização prevista e utilização indevida
razoavelmente previsível; avaliar riscos adicionais a partir de dados de acompanhamento
pós-comercialização; e adotar medidas de gestão de riscos direcionadas [8]. O Omnibus Digital deixou
o artigo 9 inalterado [9]; para sistemas do Anexo III aplica-se a partir de 2 de Dez de 2027 [10].
Vincula o prestador; o responsável pela implantação executa o seu próprio ciclo através de
`Art. 26`} monitorização e, quando se aplica, a {`Art. 27`} FRIA (capítulo 08). Uma leitura legal do
artigo 9, escrita contra a proposta de 2021, é um guia útil para o que cada passo pede [11]. Nenhuma
norma harmonizada para gestão de riscos de IA é ainda citada no Jornal Oficial [12]; o rascunho que
responderia ao artigo 9, prEN 18228, é rastreado no
[programa JTC 21](/bok/principles-and-standards#the-jtc-21-programme) (capítulo 22).

Os quatro passos comprimem as atividades ISO: **identificar** cobre âmbito, contexto, critérios e
identificação; **avaliar** cobre análise e avaliação; **monitorizar** cobre revisão, registo e
relatório. Comunicação e consulta executa-se através de todos os quatro, aqui como mapeamento de
partes interessadas.

| Passo | Cláusula ISO/IEC 23894 (por mapa cruzado NIST) | NIST AI RMF | Regulamento da IA da UE `Art. 9` | Artefato primário |
|---|---|---|---|---|
| **Identificar** | 6.3 âmbito, contexto, critérios; 6.4.2 identificação | MAP 1–5; GOVERN 5 | 9(2)(a) | Perfil de risco de caso de uso; mapa de partes interessadas; entrada de registo |
| **Avaliar** | 6.4.3 análise; resto de 6.4 | MAP 5.1; MEASURE 1–2 | 9(2)(b) | Classificação de matriz; resultados de avaliação como evidência de probabilidade |
| **Tratar** | 6.5 tratamento | MANAGE 1–3 | 9(2)(d); 9(5) | Controlos ligados ao risco; registo de aceitação |
| **Monitorizar** | 6.6 monitorização e revisão; 6.7 registo e relatório | MEASURE 3–4; MANAGE 4 | 9(2)(c) | Reclassificação de telemetria; ligações de incidente; registo de revisão |

### O ciclo nas cinco camadas

O ciclo não adiciona uma camada. Dá a cada camada existente um trabalho de risco, e cada trabalho
deixa um registo de evidência que a camada acima pode ler.

| Camada | O seu trabalho de risco | Artefato de risco | Registo de evidência |
|---|---|---|---|
| **01 Govern-as-Code** | Contém apetite, tolerância, escalas e regras de nível como dados; bloqueia o que as excede | `appetite.yaml`; política de portão | Veredicto de política que cita o id de risco e a banda |
| **02 Inventory & Transparency** | Dá a cada risco um objeto: id de registo, proprietário, nível, partes interessadas afetadas | Entrada de registo; perfil de risco de caso de uso; AIBOM | Registo de registo com nível e ids de risco ligados |
| **03 Evals & Red Teaming as Evidence** | Mede probabilidade; encontra riscos que ninguém listou | Suites de avaliação com limiares definidos por nível; conclusões de equipa vermelha | Resultado de avaliação arquivado contra o risco e a versão |
| **04 Runtime Controls & Observability** | Trata em tempo de execução; deteta um risco a tornar-se real | Guardrails; portões de humano no ciclo; identidade com âmbito; interruptor de morte | Eventos de guardrail; registos de aprovação; rastreios |
| **05 Assurance & Continuous Compliance** | Registos, reclassifica e relata; contém aceitações | Registo de riscos como dados; registos de aceitação; ligações de incidente | Histórico de registo; aceitações assinadas; registo de revisão |

A evidência flui para cima, como em todo o lado no stack. Uma classificação residual é uma afirmação
de que um controlo funciona; é credível apenas se o id do controlo se resolver para um veredicto de
política, resultado de avaliação ou evento de guardrail do período de revisão atual. Uma
classificação residual cujo controlo não tem evidência é risco inerente com um rótulo melhor.

### O ciclo nos sete fluxos de trabalho

Cada fluxo de trabalho do capítulo 06 é proprietário de parte do ciclo; o proprietário do sistema
permanece responsável por cada risco de ponta a ponta.

| Fluxo de trabalho | Passo de risco | O que produz |
|---|---|---|
| [Entrada e classificação](/bok/the-role#intake-and-classification) | Identificar | Perfil de risco de caso de uso; nível; primeiras entradas de registo; mapa de partes interessadas |
| [Inventário e registo](/bok/the-role#inventory-and-registry) | Identificar | Id de registo, proprietário e nível para cada risco; sistemas não registados como risco não avaliado |
| [Avaliações e equipa vermelha como evidência](/bok/the-role#evals-and-red-teaming-as-evidence) | Avaliar | Evidência de probabilidade; novos riscos a partir de conclusões de equipa vermelha |
| [Política como código e portões](/bok/the-role#policy-as-code-and-gates) | Tratar | Apetite compilado em regras de portão; implantação negada em risco residual não aceite |
| [Monitorização em tempo de execução e incidentes](/bok/the-role#runtime-monitoring-and-incidents) | Tratar, monitorizar | Controlos em tempo de execução; sinais que reclassificam riscos; ligações de incidente |
| [Garantia e evidência de auditoria](/bok/the-role#assurance-and-audit-evidence) | Monitorizar | O registo como evidência; registos de aceitação e revisão; relatórios |
| [Tradução regulatória](/bok/the-role#regulatory-translation) | Identificar, tratar | Obrigações como fontes de risco e como tratamentos obrigatórios |

## NIST AI RMF e ISO/IEC 23894 no stack

O NIST AI RMF 1.0 divide o trabalho de risco em quatro funções, cada uma dividida em categorias e
subcategorias. GOVERN aplica-se em todo o processo; MAP, MEASURE e MANAGE aplicam-se por sistema e
por fase do ciclo de vida [1]. O capítulo 08 mapeia as funções para camadas; a tabela abaixo desce
às 19 categorias e às subcategorias em que este capítulo se baseia (parafraseadas; os ids são do
NIST; a coluna de camada é a leitura ilustrativa deste livro). O capítulo 22 percorre
[as 19 categorias do NIST AI RMF](/bok/principles-and-standards#the-core-19-categories) na íntegra.

| Categoria | Subcategorias que este capítulo utiliza | Camada | Artefato |
|---|---|---|---|
| GOVERN 1 | 1.3 nível de atividade de risco definido pela tolerância de risco; 1.5 frequência de revisão; 1.6 inventário | 1 · 2 | Dados de apetite; regras de nível; registo |
| GOVERN 2 | 2.1 papéis e linhas de comunicação; 2.3 liderança executiva é proprietária de decisões de risco de IA | 1 · 5 | Tabela de autoridade de aceitação; RACI |
| GOVERN 3 | 3.2 papéis para configurações humano-IA e supervisão | 1 · 4 | Design de supervisão; configuração de portão de aprovação |
| GOVERN 4 | 4.2 equipas documentam riscos e impactos; 4.3 testes, identificação de incidentes, partilha de informações | 3 · 5 | Registo; pipeline de incidentes |
| GOVERN 5 | 5.1 feedback de pessoas fora da equipa; 5.2 feedback adjudicado integrado no design | 2 | Mapa de partes interessadas; canal de feedback |
| GOVERN 6 | 6.1 políticas de terceiros; 6.2 contingência para falhas em sistemas de terceiros de risco elevado | 2 · 5 | Gate de due-diligence; AIBOM |
| MAP 1 | 1.1 finalidade prevista e contexto; 1.5 tolerâncias de risco determinadas e documentadas | 1 · 2 | Perfil de risco do caso de uso; dados de apetência |
| MAP 2 | 2.1 tarefa e método; 2.2 limites do conhecimento e supervisão humana | 2 | Tier; ficha de modelo |
| MAP 3 | 3.2 custos de erros em relação à tolerância de risco; 3.5 processos de supervisão humana | 2 · 3 | Nota de benefício e custo; resultados de benchmark |
| MAP 4 | 4.1 riscos de componente e legais; 4.2 controlos internos por componente | 2 | Riscos ligados ao AIBOM |
| MAP 5 | 5.1 probabilidade e magnitude de cada impacto; 5.2 envolvimento regular | 2 · 3 | Classificações de matriz; registo de partes interessadas |
| MEASURE 1 | 1.1 riscos mais significativos medidos primeiro, os não medidos documentados; 1.3 avaliadores independentes | 3 | Plano de avaliação por risco |
| MEASURE 2 | 2.6 risco negativo residual dentro da tolerância, falha com segurança; 2.7 segurança; 2.11 equidade | 3 | Resultados de avaliação; descobertas de red team |
| MEASURE 3 | 3.1 riscos existentes, não antecipados e emergentes; 3.3 feedback de utilizadores e apelação | 4 · 5 | Re-classificação de telemetria; canal de feedback |
| MEASURE 4 | 4.3 melhorias ou declínios a partir de dados de campo | 3 · 5 | Revisão de cobertura da suite |
| MANAGE 1 | 1.1 prosseguir ou não prosseguir; 1.2 priorizar por impacto, probabilidade, recursos; 1.3 mitigar, transferir, evitar ou aceitar; 1.4 riscos residuais documentados | 1 · 5 | Decisão de gate; registo de tratamento; registo de aceitação |
| MANAGE 2 | 2.1 alternativas não-IA ponderadas; 2.3 resposta a um risco previamente desconhecido; 2.4 substituir, desengajar ou desativar | 4 | Registo de substituição; kill switch |
| MANAGE 3 | 3.1 riscos de terceiros monitorizados; 3.2 modelos pré-treinados monitorizados | 2 · 4 | Re-avaliação de fornecedor; monitorização de drift |
| MANAGE 4 | 4.1 planos de monitorização pós-implantação; 4.3 incidentes comunicados | 4 · 5 | Plano de monitorização; pipeline de incidentes |

O NIST AI RMF também oferece **perfis**: um perfil atual de como o risco é gerido hoje, um perfil
alvo dos resultados desejados, e a lacuna entre eles como plano de ação [1]. A matriz de adaptação
mais adiante neste capítulo faz o mesmo movimento.

### ISO 31000, ISO/IEC 23894 e ISO/IEC 42001

Três documentos ISO, três funções. ISO 31000 é orientação genérica para qualquer risco [5]; ISO/IEC
23894 aplica-a a IA [6]; ISO/IEC 42001 é a norma de sistema de gestão certificável, cujas cláusulas
sobre avaliação de risco de IA (6.1.2), tratamento de risco de IA (6.1.3) e avaliação de impacto do
sistema de IA (6.1.4), e a sua operação (8.2 a 8.4), exigem que o ciclo exista e funcione [13]. O
crosswalk do NIST mostra que as suas funções e as cláusulas 23894 descrevem um processo [7].

| Função do NIST AI RMF | Cláusulas ISO/IEC 23894 no crosswalk do NIST | Camada |
|---|---|---|
| GOVERN | 5.2 liderança e compromisso; 5.3 integração; 5.4 design (5.4.1 a 5.4.5: contexto, compromisso, funções, recursos, comunicação) | 1 · 2 |
| MAP | 5.4.1 contexto; 6.3.2 a 6.3.4 âmbito, contexto e critérios de risco; 6.4.2 identificação (6.4.2.3 fontes de risco, 6.4.2.4 eventos e resultados, 6.4.2.6 consequências); 6.4.3 análise; 5.7 melhoria; 6.7 | 2 · 3 |
| MEASURE | 6.3.4 critérios de risco; 6.4.2.5 identificação de controlos; 6.4.3.2 consequências; 6.4.3.3 probabilidade; 6.6 monitorização e revisão; 6.7 | 3 |
| MANAGE | 5.5 implementação; 5.7 melhoria; 6.5 tratamento (6.5.2 opções, 6.5.3 planos); 6.6; 6.7 | 4 · 5 |

O crosswalk do NIST foi um rascunho de janeiro de 2023 para comentário, mapeado em relação ao
rascunho final de 23894 [7]; verifique os números de cláusula em relação ao texto publicado de 2023
antes de os citar numa auditoria (verificar).

> **Nota** Um crosswalk é um índice, não um controlo (ver o padrão
> [Framework Crosswalk](/patterns/framework-crosswalk)). A linha que conta é aquela cujo artefato
> existe e emite evidência.

## Identificar risco: fontes, fatores e partes interessadas

A identificação é onde o trabalho de risco falha silenciosamente: um registo escrito numa oficina
lista o que a sala pensou, e o resto permanece invisível até um incidente o nomear. Engenhariá-lo
significa uma lista sistemática de fontes, fatores contribuintes capturados como dados, partes
interessadas mapeadas em vez de assumidas, e um caminho de intake que nenhum sistema pode contornar
no seu caminho para produção.

### Fontes de risco internas e externas

Uma fonte **interna** situa-se dentro do controlo da organização: dados, escolhas de design,
pessoas, processos. Uma fonte **externa** surge fora dele: fornecedores, adversários, utilizadores,
o contexto operacional, reguladores, sociedade. A divisão prediz o tratamento. As fontes internas
podem frequentemente ser eliminadas ou substituídas por design; as externas têm principalmente de
ser engenhariadas e monitorizadas.

| Fonte | Interna ou externa | Riscos típicos | Identificado por (artefato, camada) |
|---|---|---|---|
| Dados de treino, fine-tuning e retrieval | Interna (externa quando comprada) | Enviesamento; fuga de dados pessoais; corpus envenenado; conhecimento obsoleto | Ficha de dados, linhagem (2); testes de dados (3) |
| Escolha e configuração do modelo | Interno | Capacidade além da necessidade; opacidade; confabulação | Ficha de modelo (2); avaliações de capacidade (3) |
| Design do sistema: prompts, ferramentas, autonomia | Interno | Uso indevido de ferramentas; agência excessiva; sequestro de objetivo | Âmbito do registry (2); modelo de ameaça; red team (3) |
| Pessoas e processo | Interno | Enviesamento de automação; sistemas sem proprietário; mudança sem revisão | Métricas de supervisão (4); propriedade do registry (2) |
| Incentivos organizacionais | Interno | Limiares ajustados para enviar; gates contornados | Taxa de bypass de gate (1); auditoria (5) |
| Modelos, APIs e componentes de terceiros | Externa | Atualizações silenciosas de modelo; dados de treino não divulgados; indisponibilidade | Gate de due-diligence, AIBOM (2); avaliações de limite (3) |
| Adversários | Externa | Injeção de prompts; exfiltração de dados; extração de modelo | Suite de red team (3); guardrails (4) |
| Utilizadores e utilização indevida razoavelmente previsível | Externa | Uso fora da finalidade prevista; confiança excessiva | Registo de finalidade prevista (2); avaliações de uso indevido (3) |
| Contexto operacional | Externa | Drift de dados; novas populações; mudanças sazonais | Telemetria de drift (4) |
| Lei e reguladores | Externa | Nova obrigação; data movida; prioridade de aplicação | Tradução regulatória (1); crosswalk |
| Pessoas afetadas e sociedade | Externa | Impacto em direitos; discriminação; perda de confiança | FRIA ou AIPD (1 · 2); mapa de partes interessadas |

Duas linhas têm uma nota legal. A **utilização indevida razoavelmente previsível** do Regulamento da
IA é o uso fora da finalidade prevista que "pode resultar de comportamento humano razoavelmente
previsível ou interação com outros sistemas, incluindo outros sistemas de IA" [3]: o uso indevido
por utilizadores e por outros agentes está em âmbito, não é uma desculpa. E o NIST avisa que o risco
de terceiros vem tanto do componente como de como é utilizado, e que as métricas de desenvolvedor e
responsável pela implantação podem não corresponder [1]. O capítulo 14 transforma o uso indevido
previsível em inputs de design
([utilização indevida razoavelmente previsível](/bok/governing-development#reasonably-foreseeable-misuse)).
Os catálogos encontram lacunas; não são um registo. O NIST AI 600-1 nomeia 12 riscos únicos ou
agravados pela IA generativa e sugere agrupá-los como técnicos ou de modelo, uso indevido por
humanos, e ecossistema ou societais [14]. O Top 10 do OWASP para Aplicações Agentic cobre ameaças de
agentes como sequestro de objetivo, uso indevido de ferramentas e abuso de privilégio [15]. O MIT AI
Risk Repository consolida 1.725 riscos de 74 frameworks e descobre que decisões humanas causam quase
tantos riscos de IA (38%) como os próprios sistemas de IA (42%) [16]: um registo que lista apenas
modos de falha de modelo perde uma grande parte do que corre mal.

### Fatores contribuintes e o perfil de risco do caso de uso

Um **fator contribuinte** não cria um risco por si só; move a probabilidade, a gravidade ou ambas. O
NIST dá prioridade inicial mais elevada onde os dados de treino são sensíveis ou pessoais ou os
outputs afetam pessoas diretamente, e conta a personalização do responsável pela implantação como um
fator [1]. O artigo 9 pede aos prestadores que considerem pessoas menores de 18 anos e outros grupos
vulneráveis [8]. Capture fatores como campos de registry em
[intake](/patterns/use-case-intake-risk-tiering) e deixe uma política calcular o tier.

| Fator | Move | Campo de perfil |
|---|---|---|
| Autonomia: sugere, redige, atua após revisão, atua sozinho | Probabilidade e gravidade | `autonomy` |
| Impacto da decisão: nenhum, informa, decide sobre uma pessoa | Gravidade | `decision_impact` |
| Exposição: utilizadores internos, clientes, o público; volume diário | Probabilidade | `exposure`, `volume_per_day` |
| Reversibilidade do pior resultado | Gravidade | `reversibility` |
| Grupos vulneráveis afetados: menores, pacientes, candidatos | Gravidade | `vulnerable_groups` |
| Sensibilidade dos dados: pessoais, categoria especial, confidenciais | Gravidade | `data_class` |
| Opacidade e novidade da técnica | Probabilidade, e confiança na classificação | `explainability`, `novel_technique` |
| Dependência de terceiros | Probabilidade | `supplier_ids` |
| Personalização do responsável pela implantação (para prestadores) | Probabilidade | `customisation` |

O tier é calculado, não negociado. Um proprietário de sistema que discorda do tier muda um fator com
evidência, num pull request revisto, e o tier segue.

> **Exemplo (ilustrativo)** RH propõe um assistente de triagem de CVs. O seu perfil lê
> `decision_impact: decides-about-person`, `exposure: public-applicants`,
> `autonomy: filters, a recruiter sees only the shortlist`, `data_class: personal`. A regra de tier
> coloca-o em tier 3 antes de qualquer reunião. O gate então pede avaliações de equidade e robustez,
> uma ligação AIPD e uma aceitação assinada para qualquer risco residual acima de Baixo. Se é também
> um sistema de IA de risco elevado sob o Regulamento da IA é uma questão separada para a rota Annex
> III (capítulo 08).

### Mapeamento de partes interessadas

Diferentes atores veem riscos diferentes. Um desenvolvedor que lança um modelo pré-treinado pode ter
uma perspetiva de risco diferente do responsável pela implantação que o utiliza, e as pessoas
prejudicadas nem sempre são utilizadores diretos [1]. O NIST AI RMF constrói isto em GOVERN 5.1, MAP
1.2 e MEASURE 1.3, que pede que comunidades afetadas sejam consultadas conforme a tolerância de
risco exige [1]. Para responsáveis pela implantação de certos sistemas de risco elevado a FRIA
torna-o lei: nomeia as categorias de pessoas suscetíveis de serem afetadas e os riscos específicos
de dano para elas [17]. ISO chama o mesmo passo "comunicar e consultar" [5].

| Parte interessada | Como a sua perspetiva entra no ciclo | Evidência |
|---|---|---|
| Utilizadores diretos (operadores, clientes) | Testes de usabilidade; feedback no produto | Itens de feedback ligados a ids de risco |
| Não-utilizadores afetados (candidatos, pacientes, o público) | Consulta; FRIA; reclamações | Registo FRIA; ligações de reclamação |
| Responsáveis pela implantação a jusante (para prestadores) | Instruções de utilização; relatórios de responsável pela implantação | Problemas reportados pelo responsável pela implantação |
| Prestadores a montante (para responsáveis pela implantação) | Due diligence; avisos de mudança | Evidência de fornecedor no AIBOM |
| Funções internas (legal, privacidade, segurança, risco, auditoria) | Revisão em intake; desafio de segunda linha | Registos de revisão |
| Reguladores e autoridades | Obrigações mapeadas; caminhos de reporte | Crosswalk; pipeline de incidentes |
| Executivos e o órgão de governação | Declaração de apetência; relatórios de risco | Apetência aprovada; aceitações |

O output não é um cartaz. É uma lista de partes interessadas na entrada do registry, um campo
`affected` em cada risco de registo, e um registo de quem foi consultado, quando e com que
resultado.

## Avaliar risco: a matriz de probabilidade por gravidade

Uma matriz de risco transforma dois julgamentos numa banda que desencadeia uma resposta. O seu valor
é a consistência, não a precisão: dois avaliadores classificando um cenário devem cair na mesma
célula, e a célula deve decidir o mesmo gate sempre. A IEC 31010:2019 cataloga outras técnicas de
avaliação de risco para quando uma matriz não é suficiente [18].

### Escalas definidas

Sem definições partilhadas, os avaliadores podem dar classificações opostas ao mesmo risco [19].
Ancor a probabilidade a evidência que consegue ler (taxas de falha de avaliação, telemetria,
incidentes) e a severidade à pior consequência credível de uma ocorrência. Os limiares são
ilustrativos; calibre-os aos seus volumes.

| Nível | Probabilidade | Definição (por sistema, em produção) | Evidência que a estabelece |
|---|---|---|---|
| L1 | Rara | Não esperada na vida útil do sistema | Uma equipa de red team direcionada não consegue reproduzi-la |
| L2 | Improvável | Poderia ocorrer cerca de uma vez por ano | Reproduzida apenas por uma suite adversarial dedicada |
| L3 | Possível | Esperada algumas vezes por ano | Taxa de falha de regressão ou red team abaixo de 1% |
| L4 | Provável | Esperada mensalmente | Taxa de falha de 1% a 5%, ou quase-acidentes em telemetria |
| L5 | Quase certa | Esperada semanalmente ou mais | Taxa de falha acima de 5%, ou já vista em produção |

| Nível | Gravidade | Pior consequência credível de uma ocorrência |
|---|---|---|
| S1 | Negligenciável | Incómodo; totalmente reversível; direitos de ninguém afetados |
| S2 | Menor | Dano limitado e reversível para poucas pessoas ou pequena perda; corrigido num dia |
| S3 | Moderada | Dano material a indivíduos (uma negação indevida, dados de uma pessoa expostos); reversível com esforço |
| S4 | Maior | Dano significativo a muitas pessoas ou a direitos fundamentais; difícil de reverter |
| S5 | Catastrófica | Morte ou dano grave à saúde; perturbação grave e irreversível de infraestrutura crítica; dano grave à propriedade ou ao ambiente; violação generalizada de direitos fundamentais |

S4 e S5 em conjunto cobrem as quatro categorias de um **incidente grave** sob o Regulamento da IA
[3], portanto um risco classificado aí é um candidato a incidente reportável no dia em que se
materializa. O [atlas de danos](/resources/harms) fornece uma taxonomia de danos por nível, com
registos de incidentes reais, para calibrar a coluna de severidade.
### A matriz e o que cada banda desencadeia

| Severidade / probabilidade | L1 Rara | L2 Improvável | L3 Possível | L4 Provável | L5 Quase certa |
|---|---|---|---|---|---|
| **S5 Catastrófica** | Crítica (sobreposição) | Crítica (sobreposição) | Crítica (sobreposição) | Crítica (sobreposição) | Crítica (sobreposição) |
| **S4 Maior** | Médio | Alto | Alto | Crítica | Crítica |
| **S3 Moderada** | Baixo | Médio | Alto | Alto | Crítica |
| **S2 Menor** | Baixo | Baixo | Médio | Médio | Alto |
| **S1 Negligenciável** | Baixo | Baixo | Baixo | Médio | Médio |

Uma banda é útil apenas se muda o que o pipeline faz. A política mais adiante neste capítulo compila
estas consequências ilustrativas.

| Banda | Tratamento mínimo | Gate | Quem pode aceitar o risco residual | Revisão |
|---|---|---|---|---|
| **Baixa** | Monitorizar | Entrada no registo e proprietário | Proprietário do sistema | Anualmente ou em caso de alteração |
| **Média** | Pelo menos um controlo de engenharia com evidência | Gate de avaliação no risco ligado | Proprietário do produto | A cada seis meses |
| **Elevada** | Controlos de engenharia mais deteção em tempo de execução; uma pessoa decide onde as consequências chegam a uma pessoa | Gate de avaliação e guardrail em tempo de execução; implantação negada sem uma aceitação atual | Comité de risco, segunda linha consultada | Trimestral |
| **Crítica** | Eliminar ou substituir; a engenharia sozinha não a coloca em produção | Implantação negada | Órgão de governação, ou ninguém | Mensalmente enquanto aberta |

### A sobreposição de severidade catastrófica

Multiplicar probabilidade por severidade esconde a cauda. Uma grelha pode dar a uma catástrofe rara
a banda de um incómodo frequente, e onde frequência e severidade são negativamente correlacionadas
(a forma do risco catastrófico) as matrizes podem ser "piores que inúteis" [19]. Portanto S5
funciona na sua própria faixa:

1. **A banda ignora a probabilidade.** Qualquer cenário S5 é Crítico. A sua probabilidade é
   registada, porque orienta a monitorização, mas não baixa a banda.
2. **A equipa não pode aceitá-la.** O tratamento deve eliminar o cenário ou reduzir a sua
   severidade, normalmente removendo uma capacidade, uma ação ou uma exposição. Caso contrário,
   apenas o órgão de governação pode aceitá-la, explicitamente e por um período fixo.
3. **Dano presente significa parar.** Quando impactos negativos significativos são iminentes, danos
   graves estão a ocorrer ou riscos catastróficos estão presentes, a NIST diz que o desenvolvimento
   e a implantação "devem cessar de forma segura até que os riscos possam ser suficientemente
   geridos" [1]. O kill switch testado é o mecanismo.
4. **A fronteira usa a mesma lógica.** Sob o Código de Prática GPAI, os signatários definem níveis
   de risco sistémico (ou outros critérios de aceitação), aplicam-nos com margens de segurança e, se
   o risco sistémico não for aceitável, não disponibilizam o modelo, ou restringem, retiram ou
   revogam-no [20].

A maioria dos controlos reduz a probabilidade; apenas uma mudança de design reduz a severidade. A
sobreposição força essa conversa de design em vez de deixar que controlos de probabilidade façam
descer uma catástrofe para Média.

### O que uma matriz não consegue dizer-lhe

Cox nomeia quatro limites: resolução fraca, erros de classificação, nenhuma base para alocar
recursos, e entradas e saídas ambíguas [19]. As respostas são procedimentais:

- **Mantenha os números atrás da célula** (taxa de falha de avaliação, volume, estimativa do pior
  caso) para que a banda possa ser recomputada. A célula é uma vista dos dados, não os dados.
- **Nunca some ou faça a média de células.** Priorize por banda, depois severidade, depois custo do
  tratamento; MANAGE 1.2 prioriza por impacto, probabilidade e recursos disponíveis [1].
- **Leia a probabilidade baseada em avaliação como um limite inferior.** Uma avaliação é limitada
  por amostragem e deteta regressões, não novidade
  ([os limites do gate de avaliação](/bok/definition#the-limits-of-the-eval-gate)).

Para sistemas de risco elevado a lei aponta da mesma forma: o teste funciona contra "métricas
previamente definidas e limiares probabilísticos" apropriados à finalidade prevista [8]. Uma escala
de probabilidade escrita como limiares que um pipeline consegue verificar é exatamente isso.

## Apetite de risco e tolerância, compilados em gates

A NIST não prescreve uma tolerância de risco. Define tolerância como a "disponibilidade para
suportar o risco a fim de atingir os seus objetivos", chama-a contextual e em mudança, diz às
organizações para seguirem regras do setor ou definirem uma tolerância razoável onde nenhuma existe,
e pede que as tolerâncias sejam documentadas (MAP 1.5) e estabeleçam o nível de esforço de gestão de
risco (GOVERN 1.3) [1]. Uma declaração de apetite que vive apenas num pacote de conselho de
administração não muda nada que um pipeline faz. Compile-a.

### Da declaração aos dados

> **Exemplo (ilustrativo)** Uma declaração de apetite como um órgão de governação poderia aprová-la:
> "Usamos IA para tornar o pessoal e os clientes mais rápidos. Aceitamos risco moderado em
> ferramentas internas e em suporte de decisão onde uma pessoa revê cada resultado, para que
> aprendamos rapidamente. Aceitamos apenas risco residual baixo em sistemas que decidem sobre uma
> pessoa ou atuam em seu nome. Nenhum agente move dinheiro acima de um montante definido sem a
> decisão de uma pessoa. Carregamos risco catastrófico apenas com a aceitação explícita do órgão de
> governação, por um período fixo. Nenhum risco é aceite indefinidamente."

Cada frase torna-se um valor num ficheiro versionado que os gates leem. O ficheiro é a versão
aplicada; a declaração é a sua documentação.

```yaml
# appetite.yaml (illustrative, not a claim of conformity)
version: 2026-09-24
approved_by: governing-body
tolerance:                     # highest residual band carried without escalation
  tier-1-internal: medium
  tier-2-decision-support: medium
  tier-3-decision-about-a-person: low
  tier-4-agentic-or-high-stakes: low
acceptance_authority:          # who may sign each residual band
  low: system-owner
  medium: product-owner
  high: risk-committee
  critical: governing-body
max_acceptance_days: {low: 365, medium: 180, high: 90, critical: 30}
eval_floor:                    # likelihood evidence required per tier
  tier-3-decision-about-a-person: {robustness: 0.95, subgroup_parity: 0.90}
  tier-4-agentic-or-high-stakes: {injection_resistance: 0.95, tool_scope_adherence: 0.99}
human_approval_above_eur: 250  # enforced at runtime by the approval gate
catastrophic_override: true    # severity 5: eliminate, or governing-body acceptance
```

| Cláusula da declaração | Compilada em | Camada | Evidência |
|---|---|---|---|
| "risco moderado em ferramentas internas e em suporte de decisão" | `tolerance` para níveis 1 e 2: `medium` | 01 | Veredicto do gate |
| "apenas risco residual baixo em sistemas que decidem sobre uma pessoa ou atuam em seu nome" | `tolerance` para níveis 3 e 4: `low`; `eval_floor` | 01 · 03 | Veredicto do gate; resultado de avaliação |
| "Nenhum agente move dinheiro acima de um montante definido sem a decisão de uma pessoa" | `human_approval_above_eur` | 04 | Registo de aprovação |
| "risco catastrófico apenas com a aceitação explícita do órgão de governação" | Regra de sobreposição; `critical: governing-body` | 01 · 05 | Aceitação assinada |
| "Nenhum risco é aceite indefinidamente" | `max_acceptance_days` | 05 | Expiração da aceitação |

### Dos dados a um gate

O gate funciona na implantação (camada 01) sobre a entrada do registo (camada 02), os riscos abertos
do sistema (camada 05) e os seus resultados de avaliação mais recentes (camada 03). O seu veredicto
nomeia o id de risco, portanto a evidência diz qual risco parou qual lançamento.

```
package risk.gate

import rego.v1

# Illustrative, not a claim of conformity. data.appetite is appetite.yaml;
# input holds the registry entry, the system's open risks and its eval results.

rank := {"low": 1, "medium": 2, "high": 3, "critical": 4}

tier := input.system.tier

deny contains "system has no known tier in the registry" if {
	not data.appetite.tolerance[tier]
}

# Residual above the tier's tolerance needs a current acceptance by the
# authority that the residual band requires.
deny contains msg if {
	some r in input.risks
	rank[r.residual.band] > rank[data.appetite.tolerance[tier]]
	not valid_acceptance(r, data.appetite.acceptance_authority[r.residual.band])
	msg := sprintf("%s: residual %s above %s tolerance, no valid acceptance", [r.id, r.residual.band, tier])
}

# Catastrophic-severity override: likelihood plays no part.
deny contains msg if {
	some r in input.risks
	r.residual.severity == 5
	not valid_acceptance(r, "governing-body")
	msg := sprintf("%s: severity 5 needs elimination or governing-body acceptance", [r.id])
}

# Eval floors by tier: missing evidence fails like bad evidence.
deny contains msg if {
	some metric, floor in data.appetite.eval_floor[tier]
	not input.evals[metric] >= floor
	msg := sprintf("%s: eval %s below the %s floor", [input.system.id, metric, tier])
}

valid_acceptance(r, role) if {
	r.acceptance.role == role
	time.parse_ns("2006-01-02", r.acceptance.expires) > time.now_ns()
}
```

Dois detalhes importam mais que a sintaxe. Um resultado de avaliação em falta falha como um baixo,
portanto "não o medimos" nunca é uma aprovação. Uma aceitação expirada conta como nenhuma, portanto
o calendário aplica a revisão. Como cada política da camada 01, é fornecida com um fixture que deve
ser negado e um que deve passar ([Camada 01](/bok/the-stack#layer-01-govern-as-code)).

## Tratar risco: a hierarquia de mitigação

A NIST lista as opções de resposta como mitigação, transferência, evitação ou aceitação [1]; a ordem
em que as procura importa mais. A segurança ocupacional classifica os controlos por eficácia
(eliminação, substituição, engenharia, administrativa, depois equipamento de proteção) e avisa
contra confiar na última quando existem opções melhores [21]. O Regulamento da IA estabelece a mesma
ordem para sistemas de risco elevado: eliminar ou reduzir risco através do design tanto quanto
tecnicamente viável, depois medidas de mitigação e controlo, depois informação e, quando apropriado,
formação para responsáveis pela implantação [8]. A NIST acrescenta que alternativas não-IA sejam
ponderadas (MANAGE 2.1) [1].

| Degrau | O que significa para IA | Controlo de stack | Padrão | Evidência |
|---|---|---|---|---|
| **1 Eliminar** | Não a construa; remova a capacidade; recuse o uso | Veredicto de negação de política; lista de bloqueio de uso proibido; ferramenta nunca concedida | [Policy Card](/patterns/policy-card) | Veredicto de negação; âmbito ausente no registo |
| **2 Substituir** | Mesmo objetivo, risco menor: um método não-IA, um modelo mais simples ou interpretável, recuperação em vez de geração livre, apenas leitura em vez de escrita | Registo de design; âmbito de registo mais estreito | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | Decisão de design ligada ao id de risco |
| **3 Engenharia** | Controlos que atuam sem confiar em que alguém se lembre | Gate de avaliação; guardrail em tempo de execução; gate de aprovação; kill switch | [Eval Gate in CI](/patterns/eval-gate-in-ci), [Runtime Guardrail](/patterns/runtime-guardrail), [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate), [Kill Switch](/patterns/kill-switch-circuit-breaker) | Resultados de avaliação; eventos de guardrail; registos de aprovação |
| **4 Administrativa** | Regras para pessoas: instruções de utilização, formação, procedimentos, avisos | Instruções de utilização; registos de literacia e formação | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) | Atestados de formação; instruções versionadas |
| **5 Aceitar e monitorizar** | Carregue o que resta, conscientemente, e observe-o | Aceitação assinada; telemetria; data de revisão | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) | Registo de aceitação; sinal de monitorização |

A eliminação tem um piso legal: práticas que o Regulamento da IA proíbe são eliminadas, nunca
tratadas ou aceites [22]. **Transferência** (seguro, indenizações contratuais) fica ao lado da
escada, não nela: move a consequência financeira, não o dano à pessoa no outro lado da decisão,
portanto nunca substitui os degraus um a quatro onde as pessoas podem ser prejudicadas.

Quatro regras transformam a escada em prática:

- **Trabalhe de cima para baixo, e escreva o porquê.** O registo regista quais degraus superiores
  foram considerados e por que razão eram inviáveis; um tratamento que começa no degrau quatro sem
  esse registo falha a revisão.
- **Controlos de engenharia contam apenas com evidência.** Um guardrail que nunca disparou num
  teste, ou um kill switch nunca exercitado, é no máximo degrau quatro.
- **Os controlos administrativos sozinhos não movem uma banda Alta.** Os revisores tendem a
  confirmar resultados confiantes da máquina; a supervisão tem de ser concebida e medida
  ([designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).
- **Cada degrau deixa um resíduo.** A escada termina em aceitação, nunca em "resolvido".

> **Na prática (ilustrativo)**
> O primeiro desenho de `csa-01`, o assistente de atendimento ao cliente do capítulo 04, deu-lhe uma
> ferramenta que emitia reembolsos. A admissão classificou o cenário "uma instrução injetada faz o
> agente reembolsar o montante ou conta errados" em L4 e S3: Alto. A equipa percorreu a escada.
> Eliminar reembolsos removeria o caso de uso. Substituir um âmbito apenas de leitura, com o agente
> rascunhando um reembolso que uma pessoa emite, cortou o caminho para o evento. Os controlos de
> engenharia (um guardrail de injeção, um portão de avaliação de resistência à injeção, o passo de
> aprovação) cortaram ainda mais a probabilidade. O resíduo saiu em L2 e S3, Médio, aceite pelo
> proprietário do produto durante seis meses, nulo se a pontuação de avaliação caísse abaixo do seu
> piso. O âmbito de reembolso apenas de leitura na entrada do registo do capítulo 04 é essa decisão,
> como dados.

## Risco inerente, risco residual e quem o aceita

**Risco inerente** é a classificação antes de qualquer controlo ser contabilizado.
**Risco residual** é o "risco remanescente após o tratamento do risco", na definição derivada da ISO
que a NIST adota [1]. A lacuna entre eles é o valor reclamado para os controlos; uma lacuna grande
apoiada num único controlo é um ponto único de falha que merece o seu próprio teste.

Três textos tornam o risco residual uma saída de primeira classe. O artigo 9 exige que "o risco
residual relevante associado a cada perigo, bem como o risco residual global" sejam julgados
aceitáveis [8]. A MEDIDA 2.6 pede que o risco negativo residual se mantenha dentro da tolerância e o
sistema falhe com segurança, e a GESTÃO 1.4 que os riscos residuais para os adquirentes a jusante e
utilizadores finais sejam documentados [1]. Assim, uma classificação residual é também um artefato
de transparência: pertence às limitações da ficha de modelo e às instruções de utilização, não
apenas ao registo.

Uma regra mantém-a honesta:
**uma classificação residual credita apenas controlos cujos ids se resolvem em evidência do período de revisão atual.**
Se a avaliação não foi executada desde que o modelo mudou, o resíduo reverte para a classificação
inerente até que o seja.

### Quem pode aceitar

A aceitação é uma decisão com um nome. O Modelo das Três Linhas do Instituto de Auditores Internos
fornece uma divisão comum de responsabilidades: a primeira linha fornece o produto e gere o seu
risco; a segunda linha fornece expertise, apoio, monitorização e desafio sobre risco; a auditoria
interna fornece garantia independente; o órgão de governação estabelece a direção [23]. A RMF de IA
acrescenta que a liderança executiva assume a responsabilidade pelas decisões sobre risco de IA
(GOVERN 2.3) [1]. [O capítulo 12](/bok/governance-program#risk-acceptance-and-exceptions) cobre
comissões e direitos de decisão; a tabela abaixo é a parte que um portão pode impor.

| Banda residual | Aceita | Consultado (desafio) | Período máximo | Registo |
|---|---|---|---|---|
| **Baixa** | Proprietário do sistema | Nenhum necessário | 12 meses | Entrada no registo |
| **Média** | Proprietário do produto | Risco da segunda linha | Seis meses | Aceitação assinada com uma condição de nulidade |
| **Elevada** | Comissão de risco | Segunda linha; legal e privacidade onde os direitos estão envolvidos | Três meses | Aceitação assinada com fundamentação e condições |
| **Crítico ou S5** | Órgão de governação, ou ninguém | Segunda linha; revisão independente | Um mês, renovado apenas com nova evidência | Ata da decisão ligada ao id do risco |

Um registo de aceitação carrega a pessoa e o papel, a fundamentação, as condições que o anulam (um
sinal de monitorização e o seu limiar), a data e a expiração. Cada residual é aceite pela autoridade
que a sua banda nomeia; o portão bloqueia apenas quando a banda está acima da tolerância do nível e
nenhuma aceitação válida existe. Acima de Médio, o aceitador deve estar pelo menos um nível acima da
equipa cuja data de entrega depende da resposta.

> **Antipadrão** "Aceite" como um estado sem nome, sem data e sem expiração. O registo enche-se de
> riscos que ninguém escolheu carregar, e o primeiro incidente revela que a aceitação era um padrão
> de folha de cálculo.

## O registo de risco como um registo de evidência

O capítulo 08 nomeia um "registo de risco como código" como o artefato por trás de `Art. 9`} e
ISO/IEC 23894; esta secção define-o. O registo é o registo de evidência do nível 05 de todo o ciclo:
um ficheiro versionado por risco, chaveado para um id de registo, cada referência de controlo
resolvendo-se num artefato que emite evidência, cada mudança revista como código. Responde ao
"documentado" do artigo 9 e é onde um auditor começa. A sua forma padrão mais próxima é o plano de
ação e marcos (`POA&M`}) na camada de avaliação do OSCAL [24], para o qual um registo pode exportar
os seus tratamentos abertos. Um JSON Schema para
[uma entrada de registo de risco](/resources/templates#schema-risk-register-entry), com um exemplo
preenchido, está na página de modelos.
### Esquema do registo

```yaml
# risk-register/csa-01/R-017.yaml (illustrative, not a claim of conformity)
id: R-017
system: csa-01                        # registry id (layer 02)
title: Injected instruction leads to a wrong refund
scenario:
  cause: instruction hidden in a customer message reaches the refund workflow
  event: a refund is proposed and issued for the wrong amount or account
  consequence: financial loss; customer harm; possible fraud report
source: {origin: external, category: adversary}
affected: [customers, finance-operations]
factors: {autonomy: drafts, exposure: public, reversibility: partial}
inherent: {likelihood: 4, severity: 3, band: high}
treatment:
  option: mitigate
  rung: substitute+engineer
  higher_rungs_considered: "eliminate rejected (refunds are the use case); substitute adopted (read-only scope)"
  controls:
    - scope.refunds.read-only           # registry scope (layer 02)
    - guardrail.input.injection.v3      # runtime guardrail (layer 04)
    - eval.injection-resistance.v4      # eval gate (layer 03)
    - approval.refund-issue             # human decision (layer 04)
residual: {likelihood: 2, severity: 3, band: medium}
owner: team-support-platform
acceptance:
  by: head-of-support-products
  role: product-owner
  date: 2026-09-18
  expires: 2027-03-17
  voided_if: "injection-resistance below 0.95, or approval override rate above 2%"
review: {cadence: semiannual, last: 2026-09-18, next: 2027-03-17}
rerate_on: [model-version-change, new-tool-grant, linked-incident, eval-regression]
links:
  evals: [injection-resistance.v4@csa-01@2026-09-18]
  incidents: []
  obligations: ["ISO/IEC 42001 6.1.3", "NIST AI RMF MANAGE 1.3"]
status: open
```

Três campos fazem o que uma folha de cálculo não consegue. `treatment.controls`} resolve-se em
artefatos que emitem evidência, `treatment.higher_rungs_considered`} prova que a hierarquia foi
aplicada, e `acceptance.voided_if`} permite que a telemetria termine uma aceitação sem esperar por
uma reunião.

### Operação do registo

- **Cadência por banda, acionadores por evento.** A tabela de banda define o calendário;
  `rerate_on`} sobrepõe-se a ele, forçando uma reclassificação antes da próxima versão.
- **As mudanças chegam como pedidos de extração,** com a evidência na diferença, um revisor da
  segunda linha para Alto e acima, e um histórico apenas de acréscimo.
- **O portão lê-o,** portanto um residual não aceite acima da tolerância bloqueia a versão com o id
  do risco no veredicto.
- **As ligações funcionam nos dois sentidos.** Uma falha de avaliação abre ou reclassifica um risco;
  um incidente liga-se ao seu risco, e o risco lista as suas avaliações e incidentes.
- **Meça o registo, não o seu tamanho:** abra residuais Elevados e Críticos, aceitações expiradas,
  tempo desde a identificação de um risco até um controlo num gate, e a proporção de classificações
  residuais apoiadas por evidência recente
  ([métricas por nível](/bok/maturity-model#metrics-per-level)).

> **Na prática (ilustrativo)**
> Uma função de governação moveu o seu registo de uma folha de cálculo para o repositório que contém
> as suas políticas, um ficheiro por risco chaveado para ids de registo, e apontou o portão de
> implantação para ele. A primeira execução bloqueou duas versões pela mesma razão: riscos aceites
> sem aceitador nomeado e sem expiração. Ninguém tinha decidido carregá-los; a folha de cálculo
> tinha. Dentro de um trimestre, cada risco Alto aberto tinha ou uma aceitação assinada e expirante
> ou um controlo cuja evidência o portão conseguia ler.

## Governação proporcional: adaptação do ciclo

O ciclo é o mesmo em todo o lado; a sua intensidade não é. A RMF de IA define o nível de atividade
de risco pela tolerância de risco (GOVERN 1.3) [1]}. O Regulamento da IA da UE exige desde 2024 que
o sistema de gestão da qualidade de um prestador de alto risco seja proporcional ao tamanho da sua
organização, enquanto os prestadores "respeitam o grau de rigor e o nível de proteção exigidos"
[27]}. O Omnibus Digital acrescenta "em particular, se o prestador é uma PME, incluindo uma
start-up, ou uma PMC", e abre o formulário de documentação técnica simplificada, até então limitado
a PMEs e start-ups, a pequenas empresas de médio porte [9]}. Os supervisores bancários dos EUA agora
adaptam a gestão de risco de modelo ao perfil, tamanho e complexidade [2]}. A proporcionalidade
reduz o custo do ciclo, nunca a proteção devida às pessoas do outro lado.

### A matriz de adaptação

Seis fatores definem a intensidade. Para cada um, a matriz fornece controlos mínimos, portões e
intensidade de revisão. Leia cada linha como um piso; onde duas linhas se aplicam, a mais rigorosa
vence.

| Fator | Perfil | Controlos mínimos | Portões | Intensidade de revisão |
|---|---|---|---|---|
| **Tamanho** | Equipa de um, start-up ou PME | Registo no repositório; apetite como um ficheiro de dados; escalas publicadas | Negar sistemas não registados e Críticos abertos | Na mudança; apetite anualmente |
| | Médio, várias equipas de produto | Registo chaveado para o registo; autoridades de aceitação; mapas de partes interessadas do nível 3 | Banda contra tolerância do nível; portão de avaliação do nível 2 | Trimestral; desafio da segunda linha para Alto |
| | Empresa federada | Apetite central, tolerâncias locais; registo agregado em risco empresarial | Portões locais herdam uma biblioteca de política partilhada | Comissão mensal para Alto e Crítico; amostragem de auditoria |
| **Setor** | Comercial geral | As linhas abaixo, nada extra | Como nivelado | Como nivelado |
| | Regulado (finanças, saúde, infraestrutura crítica, setor público) | Campos de sobreposição do setor (abaixo); validação independente para os níveis 3 e 4 | Evidência do setor antes da implantação | Como o regime espera, nunca menos que nivelado |
| **Maturidade** (capítulo 07) | Nível 1 a 2 | O registo existe e é chaveado para ids de registo | Negar sistemas não registados | Revisões de calendário |
| | Nível 3 | Os resultados de avaliação preenchem a probabilidade | Relatório de risco em CI, não bloqueante | Revisão em cada versão |
| | Nível 4 a 5 | Bandas compiladas em portões; telemetria reclassifica | Negar em residual não aceite; as aceitações anulam-se a si mesmas | Acionado por evento mais calendário |
| **Produtos e serviços** | Nível 1: ferramenta interna | Entrada no registo, proprietário, regras de uso aceitável | Portão de registo | Anualmente |
| | Nível 2: apoio à decisão, uma pessoa revê cada resultado | Mais avaliações de capacidade e uso indevido; métricas de supervisão | Gate de avaliação | A cada seis meses |
| | Nível 3: decisão automatizada sobre uma pessoa | Mais avaliações de equidade e robustez; FRIA ou AIPD onde necessário; um [canal de contestação](/patterns/decision-notice-contest-path) | Portão de avaliação; sem implantação sem aceitação em Alto | Trimestral |
| | Nível 4: agêntico com acesso de escrita, ou apostas altas em tempo real | Mais portões de aprovação; identidade com âmbito; kill switch testado; guardrails em tempo de execução | Mais imposição em tempo de execução | Mensal e acionado por evento |
| **Objetivos** | Liderado pela inovação | Níveis 1 e 2 em sandbox com tolerância mais ampla; piso inalterado | Portões de sandbox separados da produção | Frequente, leve |
| | Avesso ao risco | Tolerâncias mais baixas; aceitação um nível mais alto | Pisos de avaliação mais altos | Mais pesado, menos frequente |
| | Orientado pela missão (serviço público, saúde) | Consulta do grupo afetado a partir do nível 3 | Portão de avaliação de impacto | Inclui entrada do grupo afetado |
| **Tolerância de risco** | Baixo | Tolerância `low`} do nível 2; pisos de avaliação mais altos | Negar mais, aceitar mais acima | Períodos de aceitação mais curtos |
| | Mais alto | Tolerância `medium`} para os níveis 1 e 2 | Como nivelado | Como nivelado; a sobreposição S5 inalterada |

Uma equipa de uma pessoa não deve tentar executar tudo isto: comece pela fatia vertical fina do
capítulo 04 ([o stack mínimo viável](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one))
mais o registo e um gate, e adicione linhas conforme a organização e a sua exposição crescem.

### Sobreposições do setor

A NIST diz às organizações que sigam os critérios de risco, tolerâncias e respostas que o seu setor
já define [1]}. Uma sobreposição adiciona campos de registo e portões, não um segundo registo.

| Setor | Regime existente para integrar | O que adiciona ao ciclo |
|---|---|---|
| Banca e finanças | Orientação de gestão de risco de modelo; nos EUA, SR 26-2 (17 de abril de 2026), que substituiu SR 11-7 e é mais relevante para organizações bancárias acima de USD 30 mil milhões em ativos totais [2] | Validação independente antes da utilização e um inventário de modelos com classificações de risco, como na tradição de risco de modelos; intensidade adaptada ao tamanho e complexidade |
| Dispositivos médicos e saúde | ISO 14971:2019, gestão de riscos para dispositivos médicos [25]; a rota do Anexo I do Regulamento da IA, com deveres de risco elevado para sistemas incorporados a partir de 2 de agosto de 2028 [10] | Registo baseado em perigos; avaliação benefício-risco; acompanhamento pós-comercialização alimentando reclassificação |
| Industrial e crítico para a segurança | Prática de segurança funcional; ISO/IEC TR 5469:2024 sobre IA dentro de funções relacionadas com a segurança e funções não-IA que mantêm seguro o equipamento controlado por IA [26] | Requisitos de segurança por função; funções de segurança não-IA como controlos de terceiro nível |
| Setor público | Dever FRIA quando organismos sujeitos ao direito público, ou entidades privadas que prestam serviços públicos, implantam sistemas de risco elevado [17] | Mapeamento obrigatório de grupos afetados; mecanismos de reclamação e arranjos de governação interna como tratamentos |

### O piso que não se adapta

Alguns controlos são iguais em qualquer tamanho, em qualquer setor e em qualquer nível de
maturidade:

- Cada sistema de IA em produção tem uma entrada no registo, um proprietário e um nível.
- As práticas proibidas são eliminadas, nunca tratadas ou aceites [22].
- Cada cenário S5 executa a sobreposição de severidade catastrófica.
- Cada risco aceite tem um aceitador nomeado, uma condição de anulação e uma data de expiração.
- Cada incidente liga-se a um risco, existente ou novo.
- Cada agente que atua tem a sua própria identidade e um kill switch testado.

## Risco, maturidade e incidentes

### Prática de risco por nível de maturidade

A prática de risco não é uma sexta linha no modelo de maturidade; é uma perspetiva sobre as cinco
camadas, e a regra da camada mais fraca do capítulo 07 aplica-se também a ela
([os cinco níveis](/bok/maturity-model#the-five-levels)).

| Nível | Prática de risco que pode demonstrar | Evidência |
|---|---|---|
| **1 Documentado** | Um registo mantido manualmente; uma declaração de apetência; escalas definidas | O ficheiro de registo; escalas aprovadas |
| **2 Inventariado** | Cada risco associado a um id do registo; sistemas não registados sinalizados como risco não avaliado | A ligação entre registo e inventário; relatório de descoberta |
| **3 Testado** | As classificações de probabilidade citam resultados de avaliação; descobertas de red team abrem novos riscos | Ids de avaliação em ligações de registo |
| **4 Aplicado** | As tolerâncias compiladas em gates; uma aceitação expirada bloqueia a implantação | Vereditos de gate que citam ids de risco |
| **5 Contínuo** | A telemetria reclassifica riscos; as aceitações anulam-se quando a sua condição falha | Histórico de classificação impulsionado por sinais de runtime |

### Incidentes são riscos realizados

Um incidente é um risco que se materializou, ou um que ninguém identificou. Se corresponder a uma
entrada do registo, é evidência de probabilidade: a classificação é recomputada e, se a condição de
anulação se ativou, a aceitação caduca. Se não corresponder a nada, abre uma nova entrada, a
resposta do NIST AI RMF a um risco previamente desconhecido (MANAGE 2.3) [1], e questiona a
identificação sobre por que razão a admissão o perdeu.

A escala de severidade liga os dois. Porque S4 e S5 cobrem as categorias de incidente grave do
Regulamento da IA [3], uma entrada classificada aí já nomeia o caminho de comunicação, e o
[Incident Pipeline](/patterns/incident-pipeline) pode iniciar o relógio `Art. 73` a partir do id de
risco (prazos no [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)). O Artigo 9 fecha o
ciclo do outro lado: riscos emergentes de dados de acompanhamento pós-comercialização são avaliados
no sistema de gestão de riscos [8]. MANAGE 4.3 acrescenta que os incidentes são comunicados aos
atores de IA relevantes, incluindo comunidades afetadas [1]. O
[Capítulo 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) cobre o ciclo de
vida do incidente; este capítulo é proprietário da ligação.

Duas medidas mostram se a ligação funciona. A **taxa de acerto de identificação** é a proporção de
incidentes que corresponderam a um risco pré-existente; uma taxa baixa significa que a admissão
perde fontes. O **atraso de reclassificação** é o tempo desde um incidente até à classificação
recomputada; um atraso longo significa que o registo regista o passado.

**Correspondências:** Regulamento da IA da UE `Art. 9` (sistema de gestão de riscos), `Art. 17(2)`
(proporcionalidade), `Art. 26`, `Art. 27` (FRIA), `Art. 72`, `Art. 73` · ISO 31000 · ISO/IEC 23894 ·
ISO/IEC 42001 (6.1.2, 6.1.3, 8.2, 8.3) · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Agentic
ASI01–ASI10 · todas as cinco camadas do stack. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## O que pode fazer esta semana

1. **Publique as escalas.** Escreva definições de probabilidade e severidade de cinco níveis para o
   seu contexto, com S5 alinhado às categorias de incidente grave e a sobreposição de severidade
   catastrófica declarada. Uma página, versionada ao lado das suas políticas.
2. **Compile uma linha de apetência.** Coloque a tolerância por nível num ficheiro de dados e faça
   um gate de implantação lê-lo: negar quando um sistema carrega um Crítico aberto ou um residual
   não aceite acima do seu nível.
3. **Associe o registo ao inventário.** Para os seus três sistemas de nível mais elevado, mova os
   seus riscos principais para ficheiros associados a ids do inventário, cada um com classificações
   inerentes e residuais, controlos que se resolvem em evidência, um proprietário e uma data de
   expiração.
4. **Encontre os órfãos.** Liste cada risco aceite sem aceitador nomeado ou sem data de expiração, e
   cada incidente do último trimestre sem risco ligado. Ambas as listas são o backlog do próximo
   mês.
5. **Mapeie os stakeholders de um sistema.** Para o sistema com a exposição mais ampla, nomeie os
   não-utilizadores afetados e escreva como a sua perspetiva chega ao registo.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (§1.1 risk; §1.2.2 risk tolerance; §1.2.3 prioritisation, "cease in a safe manner", residual risk; Core tables 1 to 4; §6 profiles). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[2] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC, FDIC; supersedes SR 11-7 and SR 21-8; tailored to risk profile, size and complexity; most relevant above USD 30 billion in assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3 (points 2 "risk", 13 "reasonably foreseeable misuse", 49 "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[4] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[5] ISO 31000:2018, Risk management: Guidelines (stage 90.92, to be revised; ISO/CD 31000 under development as of 2026-09-24). ISO/TC 262. 2018-02. https://www.iso.org/standard/65694.html (verified: primary)
[6] ISO/IEC 23894:2023, Artificial intelligence: Guidance on risk management. ISO/IEC JTC 1/SC 42. 2023-02. https://www.iso.org/standard/77304.html (verified: primary)
[7] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (draft for comment; function to clause mapping). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 9 (risk management system; 9(2) steps; 9(5) residual risk and order of measures; 9(8) "prior defined metrics and probabilistic thresholds"; 9(9) minors and vulnerable groups). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_9 (verified: primary)
[9] Regulation (EU) 2026/1744, Digital Omnibus on AI (Art. 9 not amended; Art. 1 point (10): Art. 11(1) simplified technical-documentation form extended to SMCs; Art. 1 point (11): Art. 17(2) replaced to name SMEs, start-ups and SMCs). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] "AI Omnibus enters into force" (Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[11] Risk management in the Artificial Intelligence Act (J. Schuett; Art. 9 of the 2021 proposal; Eur. J. Risk Regul. 15 (2024) 367-385). arXiv 2212.03109. 2024. https://arxiv.org/abs/2212.03109 (verified: primary)
[12] CEN-CENELEC JTC 21 standards tracker (no harmonised standard cited in the OJ). CEN-CENELEC JTC 21 (via kla.digital). 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: secondary)
[13] ISO/IEC 42001:2023, Artificial intelligence: Management system (6.1.2 AI risk assessment, 6.1.3 AI risk treatment, 6.1.4 AI system impact assessment; 8.2 to 8.4). ISO/IEC JTC 1/SC 42. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[14] Generative Artificial Intelligence Profile, NIST AI 600-1 (12 GAI risks; grouping in footnote 5). NIST. 2024-07. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (verified: primary)
[15] Top 10 for Agentic Applications 2026 (ASI01 to ASI10). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[16] The AI Risk Repository (v3; 74 frameworks, 1,725 risks; human decisions 38%, AI systems 42%) (arXiv 2408.12622). P. Slattery et al., MIT. 2026-05-05. https://arxiv.org/abs/2408.12622 (verified: primary)
[17] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA: who performs it; elements (a) to (f)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[18] IEC 31010:2019, Risk management: Risk assessment techniques. IEC / ISO/TC 262. 2019-06. https://www.iso.org/standard/72140.html (verified: primary)
[19] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[20] GPAI Code of Practice, Safety and Security chapter, Commitment 4 (systemic risk acceptance determination; Measure 4.2). code-of-practice.ai. 2025-07-10. https://code-of-practice.ai/?section=safety-security (verified: secondary)
[21] Hierarchy of Controls. CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[22] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5 (prohibited AI practices, as amended by the Digital Omnibus, Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[23] The IIA's Three Lines Model: an update of the Three Lines of Defense. The Institute of Internal Auditors. 2020-09-08. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[24] OSCAL native model (assessment layer incl. POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[25] ISO 14971:2019, Medical devices: Application of risk management to medical devices. ISO/TC 210. 2019-12. https://www.iso.org/standard/72704.html (verified: primary)
[26] ISO/IEC TR 5469:2024, Artificial intelligence: Functional safety and AI systems. ISO/IEC JTC 1/SC 42. 2024-01. https://www.iso.org/standard/81283.html (verified: primary)
[27] Regulation (EU) 2024/1689 (AI Act), text as published in the Official Journal (OJ L, 12.7.2024), Art. 17(2) (quality management system proportionate to the size of the provider's organisation; providers "shall, in any event, respect the degree of rigour and the level of protection required"). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng#art_17 (verified: primary)
