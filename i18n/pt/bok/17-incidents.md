---
lang: pt
source: bok/17-incidents.md
sourceHash: "76dcf38990c332292ea0247ad2d9be4d335a72f55e2510c48bbeb1b7e5f9218d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 17. Incidentes, questões e causas raiz

> A gestão de incidentes de IA transforma um sinal em tempo de execução num evento que é
> classificado, contido, reportado em cada relógio que se aplica e explicado, com a sua causa
> realimentada nos controlos.

Este capítulo estende duas coisas que o livro já tem. O padrão
[**Incident Pipeline**](/patterns/incident-pipeline) (capítulo 05) liga a detecção a um relatório
com o temporizador estatutário em funcionamento; a tabela de relógio do Artigo 73 no
[mapa regulatório](/bok/regulatory-map#eu-ai-act-post-omnibus) (capítulo 08) diz quanto tempo esse
temporizador é. Nenhum diz o que conta como um incidente abaixo do limiar grave, como classificar a
gravidade, quem puxa qual alavanca, como encontrar a causa, ou o que fazer quando um evento inicia
quatro relógios ao mesmo tempo.

Um contraste primeiro. **A resposta a incidentes de segurança**, o terreno natal da disciplina irmã,
lida com comprometimento: um atacante, uma vulnerabilidade, uma violação. A gestão de incidentes de
IA herda o seu ciclo de vida e muitas das suas ferramentas, mas o conjunto de danos é mais amplo
(discriminação, conselhos inseguros, violações de direitos, desinformação agida) e a falha é
frequentemente comportamento em vez de comprometimento: um modelo que se afasta, um agente que
utiliza uma ferramenta permitida de forma prejudicial. Nada foi violado, e as pessoas foram ainda
assim prejudicadas. O entregável é um evento governado com um rasto de evidência, não apenas um
serviço restaurado.

## Incidente, perigo, questão e incidente grave

Quatro palavras decidem se um relógio inicia, portanto defina-as antes de tudo o resto.

As definições da OCDE são o ponto de partida mais amplamente partilhado. Um **incidente de IA** é um
evento, circunstância ou série de eventos em que o desenvolvimento, utilização ou mau funcionamento
de um ou mais sistemas de IA conduz direta ou indiretamente a danos: lesão ou dano à saúde de
pessoas, perturbação de infraestrutura crítica, violações de direitos humanos ou de obrigações
legais que protegem direitos fundamentais, laborais e de propriedade intelectual, ou dano a
propriedade, comunidades ou ambiente. Um **perigo de IA** é o mesmo tipo de evento em que o sistema
de IA *poderia plausivamente conduzir* a tal incidente [1]. O documento da OCDE também define termos
classificados (incidente grave de IA, desastre de IA, perigo grave de IA), e a sua estrutura de
relatório comum utiliza essa escada como os valores do seu campo de gravidade [1][2].

O Regulamento da IA define apenas o topo da escada. Um **incidente grave** sob `Art. 3(49)` é um
incidente ou mau funcionamento de um sistema de IA que conduz direta ou indiretamente a um de quatro
resultados: (a) a morte de uma pessoa ou dano grave à saúde de uma pessoa; (b) uma perturbação grave
e irreversível da gestão ou operação de infraestrutura crítica; (c) a violação de obrigações sob a
lei da União destinadas a proteger direitos fundamentais; ou (d) dano grave a propriedade ou
ambiente [3]. Um termo definido separado, **violação generalizada** (`Art. 3(61)`), abrange atos
contrários à lei da União que prejudicam os interesses coletivos de indivíduos em vários
Estados-Membros; encurta o prazo de relatório, como a secção de relógios mostra [3].

Mais dois termos são definições internas, e o livro utiliza-os consistentemente:

- Uma **questão** é um defeito, desvio ou fraqueza de controlo que não produziu um evento: uma
  avaliação que regrediu abaixo do seu limiar em preparação, um alerta de desvio, uma ficha de
  modelo que já não corresponde à versão implementada, um guardrail cuja taxa de falsos positivos
  duplicou. Uma questão é rastreada até ao encerramento com um proprietário e uma data de
  vencimento. Em termos de ISO/IEC 42001, a maioria das questões são não-conformidades tratadas sob
  a cláusula 10.2 [4].
- Um **quase acidente** é um perigo que um controlo (ou sorte) interrompeu: o guardrail bloqueou a
  tentativa de exfiltração, o revisor humano apanhou a dosagem inventada. Nenhum dano ocorreu, mas o
  caminho para o dano era real. O Código de Prática GPAI pede aos prestadores que reportem "dados
  individuais ou agregados sobre quase acidentes" ligados a um incidente grave, o que lhe diz que
  quase acidentes são evidência, não ruído [5].

| Termo | Dano realizado? | Inicia um relógio legal? | Onde vive | Exemplo |
|---|---|---|---|---|
| **Questão** | Nenhum evento | Não | Registo de questões (backlog com proprietário, data de vencimento) | Avaliação de injeção cai de 0,98 para 0,93 em preparação |
| **Quase acidente / Perigo de IA** | Não, mas plausível | Não, mas pode ser dados dentro de um relatório GPAI | Registo de incidente, gravidade SEV-4 | Guardrail bloqueia a tentativa de um agente de enviar dados de encomenda para um URL externo |
| **Incidente de IA** | Sim | Apenas se o gatilho de um regime for cumprido | Registo de incidente, SEV-3 ou superior | Assistente cita uma política de reembolso errada para 40 clientes |
| **Incidente grave** (`Art. 3(49)`) | Sim, num de quatro limiares legais | Sim, para prestadores de alto risco e prestadores de risco sistémico GPAI | Registo de incidente, SEV-1 ou SEV-2, com relógios | O desvio do modelo de crédito produz recusas discriminatórias |

A distinção que mais importa na prática é entre *gravidade* e *notificabilidade*. Gravidade é um
julgamento sobre dano na sua escala interna. Notificabilidade é um teste separado, executado uma vez
por regime, contra o gatilho desse regime. Um incidente moderado pode ainda ser notificável (uma
pequena violação de dados pessoais sob RGPD); um grave pode cair fora do âmbito de cada regime (um
sistema não de alto risco sem dados pessoais envolvidos). Mantenha as duas decisões em campos
separados, tomadas por pessoas nomeadas, com marcas de tempo.

> **Na prática (ilustrativo)**
> Numa grande operadora de telecomunicações, a primeira mudança útil ao processo de incidente não
> foi uma nova ferramenta mas um novo campo. Os bilhetes tinham um valor de "prioridade" que a
> engenharia definia para urgência e a legal lia como notificabilidade, e as duas leituras
> discordavam silenciosamente. Dividi-lo em `severity` (definido pelo engenheiro de chamada a partir
> de uma tabela de danos) e uma bandeira {`reportable_<regime>`} por regime aplicável (definida
> pelos proprietários de privacidade e legal, cada um com uma marca de tempo e uma justificação)
> tornou cada decisão revisável depois. A primeira revisão encontrou bilhetes do trimestre anterior
> que deveriam ter sido avaliados para notificação RGPD e nunca foram.

## Uma escala de gravidade mapeada para os relógios

Uma escala de gravidade é uma política, portanto escreva-a como uma. A escala abaixo tem quatro
níveis de incidente e um nível para questões. É ilustrativa; o que importa é que cada nível nomeia
um teste de dano, mapeia para as classes legais que pode desencadear e carrega uma resposta padrão.

| Nível | Teste de dano | Classe do Regulamento da IA que pode desencadear | Valor de gravidade OCDE [2] | Resposta padrão |
|---|---|---|---|---|
| **SEV-1 Crítico** | Morte; dano grave à saúde; perturbação grave e irreversível de infraestrutura crítica; violação generalizada | `Art. 73(4)` morte: 10 dias; `Art. 73(3)`: 2 dias | Incidente grave; desastre | Comandante de incidente em 15 minutos; conter primeiro; legal e EPD na ponte |
| **SEV-2 Maior** | Violação de obrigações de direitos fundamentais; dano grave a propriedade ou ambiente; violação de dados pessoais de alto risco; violação grave de cibersegurança de um modelo | `Art. 73(2)`: 15 dias | Incidente grave | Mesmo dia de trabalho; notificabilidade avaliada por regime em horas |
| **SEV-3 Moderado** | Dano realizado que é limitado, recuperável e abaixo dos limiares graves | Nenhum por si só; verifique RGPD, NIS2, DORA | Incidente | Conter mesmo dia; revisão pós-ação em cinco dias de trabalho |
| **SEV-4 Quase acidente** | Nenhum dano; um caminho plausível para o dano foi interrompido | Nenhum; padrões de quase acidentes alimentam relatórios GPAI [5] | Perigo; perigo grave | Revisão semanal; avaliação de regressão adicionada |
| **Questão** | Defeito ou fraqueza de controlo sem evento | Nenhum | Não é um evento | Registo de questões com proprietário e data de vencimento |

Três regras fazem a escala funcionar sob pressão.

1. **Classifique para cima, desclassifique com evidência.** Na triagem raramente conhece o dano
   completo. Classifique contra a leitura mais grave plausível e registe porquê; desclassifique
   quando a evidência a estreita. O Regulamento da IA suporta esta leitura: os prazos externos
   correm a partir da consciência, e a "probabilidade razoável" de uma ligação causal é suficiente
   para chamar o relatório [3].
2. **A gravidade segue o dano, não a causa.** Um bug trivial que causou uma morte é SEV-1; um ataque
   sofisticado que um guardrail parou é SEV-4. O interesse técnico não é uma entrada de gravidade.
3. **A escala é código.** Os testes de dano e os gatilhos de regime são avaliados por um motor de
   regras quando um incidente abre, pelo que a primeira classificação e os relógios que inicia são
   reproduzíveis, versionados e auditáveis. Um humano pode sobrepor-se; a sobreposição é registada
   com uma razão.

> **Exemplo (ilustrativo)** Uma regra de severidade escrita como uma
> [ficha de política](/patterns/policy-card) dispara quando um registo de incidente tem `harm.type`
> de `fundamental_rights` e `system.ai_act_class` de `high_risk`: define `severity: SEV-2`, abre um
> relógio `ai_act_art73` com um limite de 15 dias a partir do timestamp `aware_at`, e notifica o
> proprietário do sistema e a área jurídica. O próprio veredicto é armazenado como evidência, para
> que um revisor posterior possa ver qual versão da regra classificou o evento.

Duas ressalvas sobre o mapeamento. As classes do Regulamento da IA aplicam-se apenas a sistemas de
risco elevado (para `Art. 73`) e a modelos de IA de finalidade geral com risco sistémico (para
`Art. 55`), e as classes de IA de finalidade geral diferem ligeiramente: o Código de Prática
acrescenta uma classe de cinco dias para violações graves de cibersegurança, incluindo exfiltração
de pesos de modelo [5]. E os valores da OCDE são um vocabulário para comunicação, não um limiar
legal.

## O ciclo de vida da resposta

A orientação de resposta a incidentes do NIST mudou de forma em abril de 2025. SP 800-61 Revision 3
substituiu a revisão de 2012 e o seu ciclo de vida circular (preparação; detecção e análise;
contenção, erradicação e recuperação; atividade pós-incidente) por um modelo construído sobre as
seis funções CSF 2.0, argumentando que os incidentes são agora frequentes e prolongados, e que as
lições devem ser partilhadas assim que são identificadas [6]. As fases abaixo mantêm os verbos
familiares, porque os engenheiros de prontidão pensam neles, e mapeiam cada uma para a função CSF
que o NIST agora utiliza.

| Fase | Ações específicas da IA | Evidência que deixa registada | Camada | Função CSF 2.0 [6] |
|---|---|---|---|---|
| **Detetar** | Eventos de guardrail, regressões de avaliação em produção, alertas de desvio, reclamações de utilizadores, notificações de responsável pela implantação ou prestador, análises de base de dados de incidentes | Evento de sinal com fonte, timestamp e id de registo | 04 · 05 | Detetar |
| **Triagem** | Severidade a partir da tabela de danos; comunicabilidade por regime; proprietário e comandante de incidente nomeados; `aware_at` corrigido | Registo de incidente aberto; relógios iniciados | 05 | Detetar · Responder |
| **Contenção** | Kill switch ou circuit breaker; revogação de âmbito; recuo para um caminho humano; reversão para a última versão boa de modelo ou prompt; suspensão do responsável pela implantação | Ação de contenção com ator, hora e âmbito | 04 | Responder |
| **Erradicação** | Corrigir a causa: corrigir o guardrail, remover dados envenenados, revogar credenciais, retreinar; apenas após a preservação de evidência | Registo de alteração ligado ao incidente | 01 · 03 | Responder |
| **Recuperação** | Executar novamente o gate de avaliação; reintrodução faseada; janela de monitorização elevada | Resultado do gate de avaliação; janela de monitorização fechada | 03 · 04 | Recuperar |
| **Revisão pós-ação** | Revisão sem culpa; causa raiz; CAPA; atualizações de registo de risco e avaliação | Registo de revisão; itens CAPA; entradas de risco atualizadas | 05 | Identificar (Melhoria) |

A detecção necessita de mais canais do que os sinais de tempo de execução da
[camada 04](/bok/the-stack#layer-04-runtime-controls--observability). O Código de Prática de IA de
finalidade geral espera que os prestadores revejam relatórios policiais e de comunicação social,
redes sociais, artigos de investigação e bases de dados de incidentes, e que facilitem a comunicação
por modificadores a jusante, prestadores a jusante e utilizadores, informando-os de canais de
comunicação direta, ao prestador ou ao Serviço para a IA, quando disponíveis [5]. Um responsável
pela implantação que apenas observa os seus próprios painéis aprenderá sobre alguns incidentes
através de um jornalista. O pessoal é também um canal:
[um canal para levantar preocupações](/bok/governance-program#a-channel-for-raising-concerns)
(capítulo 12) encaminha os seus relatórios para o mesmo pipeline, e para um prestador de risco
elevado o plano de acompanhamento pós-comercialização é uma fonte permanente
([acompanhamento pós-comercialização e incidentes graves sob o Regulamento da IA](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73),
capítulo 18).

A contenção é onde os padrões de tempo de execução ganham o seu valor. Um
[kill switch](/patterns/kill-switch-circuit-breaker) que revoga o âmbito de um agente sem quebrar a
frota, um [guardrail de tempo de execução](/patterns/runtime-guardrail) apertado por um push de
configuração, e um registo que conhece a versão ativa e a última versão boa transformam "conter" de
uma reunião em um comando. O NIST AI RMF nomeia a capacidade: mecanismos e responsabilidades
atribuídas para "substituir, desligar ou desativar" sistemas de IA cujo desempenho ou resultados são
inconsistentes com o uso previsto [7].

### Congelar antes de corrigir

O instinto após a contenção é corrigir a coisa. Para um sistema de risco elevado o Regulamento da IA
diz esperar: após comunicar um incidente grave, o prestador investiga, incluindo uma avaliação de
risco e ação corretiva, mas não deve realizar qualquer investigação que altere o sistema de forma
que possa afetar a avaliação posterior das causas do incidente antes de informar as autoridades
competentes [3]. A engenharia lê isto como um passo de preservação entre contenção e erradicação:

- **Capturar um instantâneo do sistema tal como era.** Versão e hash do modelo, prompt do sistema,
  versões de política e guardrail, âmbitos de ferramenta, instantâneo do índice de recuperação,
  configuração e sinalizadores de funcionalidade, todos codificados com o id de registo e o id de
  incidente.
- **Selar os traços.** Os registos `Art. 12` e os traços de tempo de execução para a janela de
  incidente, exportados para armazenamento à prova de adulteração. Os responsáveis pela implantação
  devem manter os registos gerados automaticamente de um sistema de risco elevado, quando sob seu
  controlo, durante pelo menos seis meses, a menos que outra lei diga o contrário [3]; um incidente
  aberto é uma razão para os manter mais tempo.
- **Registar quem tocou em quê.** Cada ação de contenção e diagnóstico é registada com o seu ator,
  para que a avaliação das causas possa separar o incidente da resposta.
- **Corrigir num ramo, não no local.** A erradicação é executada como uma alteração para uma nova
  versão; a versão do incidente permanece reproduzível.

A retenção sobrevive ao incidente. O Código de Prática compromete os signatários de IA de finalidade
geral a manter a documentação de incidentes durante pelo menos cinco anos a partir da documentação
ou do incidente, o que for mais tarde [5]. A evidência congelada também alimenta o
[ficheiro de defesa](/bok/existing-law#the-defence-file) que a lei de responsabilidade do produto
agora permite que um tribunal ordene ser divulgado (capítulo 20).

## Playbooks, RACI e simulações

Um playbook é a resposta a um modo de falha, escrito antes de acontecer. Mantenha-o curto o
suficiente para ler durante o incidente e específico o suficiente para agir sem interpretação.

```yaml
# playbook: indirect-prompt-injection (illustrative)
trigger: guardrail rule output.exfil.* fires, or a tool call to an unregistered domain
first_15_minutes:
  - page: on-call engineer, AI governance engineer
  - contain: revoke agent tool scope "http:egress" via kill switch; keep read scopes
  - preserve: snapshot registry entry, prompt, retrieval index; seal traces for the window
decision_rights:
  kill_switch: on-call engineer (no approval needed)
  customer_notice: DPO
  regulator_filing: legal, on DPO or system-owner recommendation
evidence_checklist: [trace_ids, guardrail_events, affected_records, scope_revocation_event]
regimes_to_assess: [gdpr_art33, gdpr_art34, nis2_art23, ai_act_art73]
```

O bloco de direitos de decisão é o mais importante. Quem estiver de prontidão deve ser capaz de
puxar o kill switch sem pedir, porque a contenção que espera por um comité não é contenção.
Apresentar a um regulador é o oposto: precisa de proprietários nomeados com autoridade para assinar.
Um RACI torna ambos explícitos (R responsável, A responsabilizado, C consultado, I informado):

| Atividade | Engenheiro de prontidão | Engenheiro de governação de IA | Proprietário do sistema | Líder de IR de segurança | DPO | Legal | Ligação do prestador |
|---|---|---|---|---|---|---|---|
| Detetar e abrir o registo | R | C | I | C | I | I | I |
| Definir severidade | R | A | C | C | C | I | I |
| Puxar o kill switch ou suspender o uso | R | I | A | C | I | I | I |
| Preservar evidência | R | A | I | C | I | C | I |
| Decidir comunicabilidade por regime | I | C | C | C | R (GDPR) | A | C |
| Apresentar o relatório regulador | I | C | C | C (NIS2, DORA) | R (GDPR) | A | I |
| Informar o prestador (dever do responsável pela implantação) | I | C | A | I | I | C | R |
| Análise de causa raiz | C | R | A | C | C | I | C |
| Aprovar CAPA e fechar | I | R | A | C | C | C | I |

Adapte as colunas à sua organização; não elimine as linhas. Cada linha é um artefato que alguém deve
produzir, e uma célula vazia às 2 da manhã é uma lacuna que um auditor encontrará mais tarde.

**As simulações são o controlo; o playbook é a afirmação.** O livro trata um kill switch não testado
como uma afirmação, não um controlo, e o mesmo teste aplica-se ao playbook. Execute exercícios de
mesa numa agenda, classifique-os e mantenha o resultado como evidência:

- **Cenários.** Rode através dos modos de falha abaixo: uma injeção indireta de prompt que exfiltra
  dados; desvio que produz resultados discriminatórios; um fornecedor que silenciosamente altera o
  modelo atrás de uma API; um loop de agente que queima orçamento e chama ferramentas milhares de
  vezes; conselho confiante e errado em que um utilizador age.
- **Medidas.** Tempo para classificar, tempo para conter, tempo para um relatório de rascunho para
  cada relógio, e se cada relógio teria sido cumprido. Rastreie o tempo médio para detetar (MTTD),
  conter (MTTC) e recuperar (MTTR) em incidentes reais e simulações separadamente.
- **Evidência.** A simulação produz os mesmos registos que um incidente real produziria (registo,
  relógios, relatórios de rascunho, eventos de contenção), marcados como uma simulação. Um auditor
  perguntando "consegue comunicar a tempo?" obtém uma consulta sobre resultados de simulação, não
  uma promessa.

> **Na prática (ilustrativo)**
> Uma mesa de trabalho trimestral numa grande operadora de telecomunicações reexecutou um cenário de
> injeção contra um agente de atendimento ao cliente. A primeira execução levou 50 minutos para
> revogar o âmbito de egresso do agente, porque a única pessoa que conhecia o comando de revogação
> estava de licença. A correção foi uma entrada de runbook de uma linha e um segundo titular
> nomeado; a próxima execução levou quatro minutos. O registo de simulação, com ambos os tempos, foi
> para o armazenamento de garantia como evidência para o controlo de contenção.

## Modos de falha específicos da IA

A maioria dos incidentes de IA são incidentes de sistema, não incidentes de modelo: o modelo
comportou-se como os modelos fazem, e o sistema à sua volta (recuperação, ferramentas, prompts,
supervisão) transformou esse comportamento em dano. A tabela nomeia os modos de falha que recorrem,
o sinal que normalmente os deteta e o primeiro movimento de contenção.

| Modo de falha | Como se parece em produção | Sinal de detecção típico | Primeira contenção |
|---|---|---|---|
| **Fragilidade** | Pequenas alterações de entrada benígnas produzem grandes alterações de saída; entradas fora da distribuição quebram o comportamento | Pico em saídas de baixa confiança ou inconsistentes; reclamações agrupadas num novo tipo de entrada | Encaminhar a classe de entrada afetada para um fallback ou um humano |
| **Falta de robustez** | Entradas adversariais ou ruidosas degradam a precisão ou segurança | Descoberta de red team reproduzida em produção; mudança de taxa de acerto de guardrail | Apertar filtros de entrada; limitar a taxa do padrão |
| **Dados pobres ou não representativos** | As taxas de erro diferem por subgrupo; a recuperação retorna documentos obsoletos ou incorretos | Métricas de subgrupo na monitorização; falhas de fundamentação | Suspender a classe de decisão afetada; fixar o último corpus bom |
| **Desvio** | A distribuição de entrada (desvio de dados) ou a relação entrada-resultado (desvio de conceito) move-se após a implantação | Testes de distribuição contra a linha de base de avaliação; métricas de resultado | Aumentar a quota de revisão humana; reverter ou retreinar |
| **Injeção de prompts** | Instruções ocultas na entrada do utilizador ou em conteúdo recuperado redirecionam o sistema; a OWASP lista-a em primeiro lugar (`LLM01:2025`), direta e indireta [8] | Eventos de guardrail; chamadas de ferramenta fora da tarefa; egresso incomum | Revogar o âmbito de ferramenta que a injeção utilizou; colocar em quarentena o documento de origem |
| **Uso indevido de ferramenta** | Um agente utiliza uma ferramenta permitida de forma não intencional ou prejudicial (`ASI02`) [9] | Anomalias de volume ou parâmetro de chamada de ferramenta contra o âmbito de registo | Kill switch no agente; estreitar o âmbito |
| **Alucinação com dano** | Factos inventados, citações, políticas ou dosagens em que uma pessoa age | Reclamações; correções a jusante; verificações de fundamentação | Desativar a classe de resposta; exigir fundamentação ou uma citação |
| **Falhas em cascata** | O erro de um agente propaga-se através de outros (`ASI08`) [9] | Falhas correlacionadas em agentes que partilham uma ferramenta ou memória | Quebrar a cadeia no componente partilhado |
| **Comportamento desonesto** | Um agente age fora do seu âmbito declarado ou persiste após deveria parar (`ASI10`) [9] | Eventos de identidade fora do âmbito; atividade após expiração | Revogar identidade; verificar que a revogação teve efeito |

Seguem-se dois pontos práticos. Primeiro, um modo de falha é uma *hipótese* na triagem e uma
*descoberta* apenas após análise de causa raiz; não deixe que o primeiro rótulo se mantenha.
Segundo, cada linha corresponde a um teste que poderia tê-lo apanhado mais cedo (um caso
adversarial, uma avaliação de subgrupo, um limiar de desvio), razão pela qual a revisão pós-ação
termina na suite de avaliações, não num slide. Para agentes, o capítulo 23 estende a tabela para
[a taxonomia de incidentes de agentes](/bok/governing-agents#an-agent-incident-taxonomy).

## Análise de causa raiz

A análise de causa raiz (RCA) responde a "por que isto aconteceu, e por que os nossos controlos não
o impediram?" A segunda metade é a parte que a engenharia de governação da IA acrescenta: um
incidente é também evidência de que um controlo falhou, estava em falta ou nunca foi concebido.

### Quem participa

Realize a revisão como uma pequena **comissão de revisão de incidentes** com um núcleo permanente e
especialistas convidados:

- um facilitador que não está na linha hierárquica de ninguém envolvido;
- o proprietário do sistema, que é responsável pela CAPA;
- o engenheiro de ML ou dados que conhece o modelo e os seus dados;
- o engenheiro de governação da IA, que é proprietário do mapeamento de causa para controlo e para
  obrigação;
- segurança, quando um adversário ou uma vulnerabilidade é plausível;
- o EPD e legal, quando dados pessoais ou direitos estão envolvidos;
- alguém que represente as pessoas afetadas (operações de clientes, um especialista de domínio, um
  clínico), para que o dano seja descrito a partir da perspetiva de quem o recebe.

A comissão reúne-se para cada incidente SEV-1 e SEV-2 e amostra incidentes SEV-3 e quase-acidentes.
Decide quatro coisas e regista cada uma como uma decisão: as causas confirmadas, os itens e
proprietários da CAPA, as alterações ao registo de riscos e o encerramento.

### Técnicas

**Cinco porquês.** Pergunte por que o dano aconteceu, depois por que isso aconteceu, até chegar a
uma causa que possa mudar. É rápido, mas segue uma cadeia, enquanto as falhas de IA geralmente têm
várias causas contribuintes (uma lacuna de dados *e* uma avaliação em falta *e* um passo de
supervisão que carimbou). Também tende a parar em "erro humano", que é onde a análise deveria
começar.

**Análise de árvore de falhas.** Comece pelo evento de topo (o dano) e decomponha-o através de
portas AND e OR nas condições que tinham de se manter para que ocorresse; a IEC 61025 padroniza o
método [10]. Adequa-se bem aos sistemas de IA governados, porque os controlos são em camadas: uma
saída prejudicial chegou a um cliente apenas se o modelo a produziu E o guardrail de saída a perdeu
E nenhuma revisão humana se aplicou. A árvore mostra quais as camadas que falharam em conjunto, e
qual a correção única que teria quebrado a cadeia.

**Post-mortem sem culpa.** A revisão procura causas contribuintes "sem incriminar qualquer indivíduo
ou equipa", com a premissa de que as pessoas agiram razoavelmente com base no que sabiam e que pode
corrigir sistemas e processos mas não pessoas [11]. Defina os acionadores para um post-mortem
obrigatório com antecedência (cada SEV-1 e SEV-2, cada apresentação regulatória, cada acionamento de
kill switch) para que escrever um seja rotina, não uma acusação [11].

### Uma taxonomia de causas que aponta para controlos

Uma taxonomia de causas é útil apenas se cada classe nomear o controlo que deveria tê-la apanhado.
Codifique cada causa confirmada contra uma ou mais destas classes:

| Classe de causa | O que significa | Controlo que deveria tê-la apanhado | Camada | Padrão |
|---|---|---|---|---|
| **Dados** | Dados de treino ou recuperação de má qualidade, não representativos, obsoletos ou envenenados | Ficha de dados, linhagem, testes de qualidade de dados e enviesamento | 02 · 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Limites do modelo** | Fragilidade, falta de robustez, alucinação, limites de capacidade | Avaliações de capacidade e robustez; equipa vermelha | 03 | [Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) |
| **Desvio** | Desvio de dados ou conceito após implantação | Monitorização contra a linha de base de avaliação; acionadores de retreino | 04 · 05 | [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) |
| **Lacuna de testes** | Testes insuficientes ou não representativos; uma suite ajustada ao seu próprio limiar | Revisão de cobertura da suite de avaliações; manutenção de casos adversariais | 03 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **Conceção ou especificação** | Objetivo desalinhado, métrica de proxy errada, conceção de prompt ou fluxo de trabalho falha | Revisão de conceção; política como código sobre uso previsto | 01 | [Policy Card](/patterns/policy-card) |
| **Integração e ferramentas** | Âmbito excessivo de ferramenta, mediação em falta, credenciais partilhadas | Identidade com âmbito; mediação de chamada de ferramenta | 04 | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) |
| **Adversarial** | Injeção de prompts, jailbreak, compromisso da cadeia de fornecimento | Equipa vermelha; guardrails de entrada e saída; AIBOM | 03 · 04 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| **Falha de supervisão** | Enviesamento de automação; um revisor sem contexto, tempo ou autoridade; sem ponto de verificação | Supervisão concebida com taxas de sobreposição medidas | 04 | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **Gestão de mudanças** | Mudança de modelo, prompt ou configuração não revista; atualização silenciosa do fornecedor | Versionamento de registo; porta de mudança; termos de aviso do fornecedor | 01 · 02 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| **Utilização fora da finalidade prevista** | Implantação além do uso para o qual o sistema foi avaliado | [Admissão e classificação](/patterns/use-case-intake-risk-tiering); instruções de utilização | 01 · 02 | [Agent Registry](/patterns/agent-registry) |
| **Organizacional** | Sem proprietário, direitos de decisão pouco claros, fadiga de alerta, pessoal sem treino | Modelo operacional, RACI, simulacros | 05 | [Incident Pipeline](/patterns/incident-pipeline) |

A taxonomia não é apenas um dispositivo de aprendizagem; os reguladores pedem-na. O modelo de
relatório da Comissão para incidentes graves de GPAI tem um campo de causa raiz que pede as saídas
do modelo que levaram ao incidente e os fatores por trás delas, incluindo as entradas utilizadas e
quaisquer falhas ou contornos de mitigações de risco sistémico [12]. O relatório final da NIS2 pede
"o tipo de ameaça ou causa raiz" provável de ter desencadeado um incidente significativo [13]. A
DORA vai mais longe: incidentes recorrentes que estão individualmente abaixo do limiar importante
contam como um incidente importante quando ocorrem pelo menos duas vezes num período de seis meses
com a mesma causa aparente e em conjunto cumprem os critérios [14]. A codificação inconsistente de
causas portanto faz mais do que estragar as suas estatísticas: sob DORA pode ocultar um incidente
reportável. O quadro de relatório da OCDE mantém os seus próprios campos adjacentes de causa (se o
incidente está ligado aos dados de treino, ao modelo de IA, ou à interação de vários sistemas de IA)
que a mesma codificação pode preencher [2].

> **Exemplo (ilustrativo)** Uma árvore de falhas para "recusas discriminatórias chegaram aos
> candidatos" tem três ramos AND-ados: a taxa de erro do modelo subiu para uma faixa etária (classe
> de causa: desvio); a monitorização comparou apenas precisão agregada, não precisão de subgrupo
> (lacuna de testes); e os revisores aprovaram 99% das recomendações do modelo em menos de dez
> segundos (falha de supervisão). Corrigir qualquer um dos ramos teria quebrado a cadeia. A comissão
> atribui três itens de CAPA, um por ramo, e regista todos os três códigos de causa no incidente.

## CAPA: do incidente para o registo de riscos e suite de avaliações

**CAPA** (ação corretiva e preventiva) é a saída da revisão. A ação corretiva corrige esta
instância: corrigir, retreinar, reverter, re-escopiar. A ação preventiva impede que a classe de
falha recorra em qualquer lugar da frota: um novo caso de avaliação para cada sistema semelhante,
uma mudança de política, um campo de registo tornado obrigatório. A ISO/IEC 42001 coloca isto na
cláusula 10.2 [4]; o NIST AI RMF pede que incidentes e erros sejam comunicados aos atores de IA
relevantes, incluindo comunidades afetadas, e que processos de rastreamento e resposta sejam
documentados [7]. Para fornecedores de risco elevado a Reglamento de IA acrescenta bordas duras: um
fornecedor com razão para considerar um sistema não conforme deve imediatamente trazê-lo para
conformidade, retirar, desativar ou recuperá-lo, e informar distribuidores e responsáveis pela
implantação; quando apresenta um risco, o fornecedor investiga as causas com o responsável pela
implantação de relatório e informa a autoridade de fiscalização do mercado [3].

Cada incidente encerrado deveria deixar cinco artefatos atrás:

1. **Uma avaliação de regressão.** O incidente torna-se um caso de teste que falha na versão do
   incidente e passa na correção, ligado à [porta de avaliação](/patterns/eval-gate-in-ci) para que
   a falha não possa ser enviada novamente despercebida.
2. **Uma mudança de registo de riscos.** Ou um novo risco ou um existente re-pontuado, com o id do
   incidente anexado. A ligação corre nos dois sentidos: o registo de incidente lista os riscos que
   realizou, e a entrada de risco lista os incidentes que a realizaram. O próprio método de risco é
   o capítulo 13, [gestão de riscos](/bok/risk-management#incidents-are-realised-risks).
3. **Uma mudança de controlo** onde a árvore de falhas encontrou uma: um guardrail apertado, um
   âmbito mais estreito, um novo ponto de verificação de supervisão.
4. **Uma atualização de playbook**, se a própria resposta foi lenta ou pouco clara.
5. **Um registo de evidência** de que a CAPA foi verificada: a nova avaliação passa em CI, e a
   métrica de tempo de execução manteve-se na linha de base durante uma janela definida.

Duas verificações cruzadas mantêm a ligação ao registo de riscos honesta. Um risco pontuado
"probabilidade baixa" que já tem dois incidentes anexados está mal pontuado. Um incidente que não
corresponde a nenhum risco no registo é em si uma descoberta: a identificação de risco perdeu-o, e
isso também vai na lista de CAPA.

```json
{
  "capa_id": "CAPA-2026-041",
  "incident_id": "INC-2026-0918-01",
  "type": "preventive",
  "cause_codes": ["adversarial", "integration_and_tooling"],
  "action": "Add indirect-injection cases from quarantined documents to injection-resistance.v5",
  "owner": "team-support-platform",
  "due": "2026-10-02",
  "risk_ids": ["RISK-017"],
  "verification": { "eval_suite": "injection-resistance.v5", "result": "pending" }
}
```

Meça o ciclo, não o trabalho administrativo: taxa de recorrência por classe de causa, itens de CAPA
encerrados e verificados no prazo, a proporção de incidentes que produziram uma avaliação de
regressão, e tendências de MTTD e MTTC. Esses são números de redução efetiva do risco; uma contagem
de post-mortems escritos não é.

## Deveres do responsável pela implantação: informar o fornecedor, suspender o uso

A maioria das organizações encontra incidentes de IA como **responsáveis pela implantação** de um
sistema que alguém mais construiu. Para sistemas de risco elevado, `Art. 26(5)` estabelece três
deveres [3]:

- **Monitorizar** a operação do sistema com base nas instruções de utilização e, quando relevante,
  informar o fornecedor para a sua monitorização pós-comercialização.
- **Informar e suspender.** Quando o responsável pela implantação tem razão para considerar que usar
  o sistema conforme instruído pode apresentar um risco no sentido de `Art. 79(1)`, informa o
  fornecedor ou distribuidor e a autoridade de fiscalização do mercado sem demora indevida, e
  suspende o uso.
- **Reportar incidentes graves acima da cadeia.** Quando o responsável pela implantação identifica
  um incidente grave, imediatamente informa primeiro o fornecedor, depois o importador ou
  distribuidor e a autoridade de fiscalização do mercado. Se não conseguir contactar o fornecedor,
  `Art. 73` aplica-se ao responsável pela implantação mutatis mutandis: o responsável pela
  implantação herda o relógio de relatório.

Duas exceções aplicam-se: o dever não cobre dados operacionais sensíveis de responsáveis pela
implantação de aplicação da lei, e para instituições financeiras o dever de monitorização é
considerado cumprido por conformidade com as suas regras de governação interna sob lei de serviços
financeiros [3]. Estes deveres aplicam-se com o resto do regime de risco elevado, a partir de 2 de
dezembro de 2027 para sistemas do Anexo III após o Omnibus Digital (ver
[capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).

Cada dever precisa de um artefato engenheirado, e nenhum deles existe por defeito:

| Dever | Artefato | Onde vive |
|---|---|---|
| Monitorizar conforme as instruções de utilização | Ganchos de monitorização para as métricas que as instruções do fornecedor nomeiam; limiares como código | Camada 04 |
| Informar o fornecedor | Contacto de incidente do fornecedor e canal na entrada de registo; termos de notificação contratual testados em simulacros | Camada 02 |
| Suspender o uso | Um caminho de suspensão testado para um sistema adquirido: sinalizador de funcionalidade, comutação de tráfego para um caminho humano ou legado | Camada 04 |
| Incidente grave: prestador em primeiro lugar | O registo de incidentes do responsável pela implantação exporta o relatório voltado para o prestador; marcas de tempo de cada notificação | Camada 05 |
| Prestador inacessível | Relógio de contingência: os mesmos temporizadores `Art. 73` iniciam-se no registo próprio do responsável pela implantação | Camada 05 |
| Evidência para a investigação do prestador | Registos mantidos pelo responsável pela implantação retidos pelo menos seis meses, mais tempo enquanto um incidente está aberto [3] | Camadas 04 · 05 |

A suspensão é um kill switch para um sistema que não é seu. Não pode revogar os pesos de um
fornecedor, mas pode deixar de enviar-lhe tráfego; teste que consegue fazê-lo e quanto tempo demora,
antes de precisar. O
[Incident Pipeline](/patterns/incident-pipeline#the-deployer-side-inform-the-provider-suspend-use)
constrói o lado do responsável pela implantação. O
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) é onde pertencem os
termos de notificação bidirecional: o prestador informa sobre incidentes e ações corretivas que
afetam a sua implantação, e tem um canal designado para informar o prestador. A mesma lógica
funciona mais acima na cadeia para GPAI: o Código de Prática pede aos fornecedores de modelos que
informem os prestadores a jusante, modificadores e utilizadores como comunicar incidentes graves,
diretamente ou ao Serviço para a IA [5]. A governação da implantação como um todo é o capítulo 15,
[governing deployment](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance), cujo
[external communications plan](/bok/governing-deployment#external-communications) transporta os
[notices](/patterns/disclosure-notification-pipeline) para utilizadores, pessoas afetadas e
autoridades.

## Os relógios sobrepostos

Um evento pode iniciar vários relógios. Uma injeção de prompts indireta que vaza dados de clientes
de um sistema de risco elevado gerido por um banco pode, simultaneamente, ser um incidente grave sob
o Regulamento da IA, uma violação de dados pessoais sob o RGPD e um incidente grave relacionado com
TIC sob o DORA; numa entidade essencial não financeira a mesma fuga poderia ser um incidente
significativo sob o NIS2. Cada regime tem o seu próprio gatilho, destinatário, prazo e conteúdo. A
tabela coloca-os lado a lado, a partir de 2026-09-24.

| Regime | Quem comunica | Desencadeador | Primeiro relatório | Seguimento e final | Para quem |
|---|---|---|---|---|---|
| Regulamento da IA da UE `Art. 73` [3] | Prestador de um sistema de risco elevado; o responsável pela implantação se o prestador não puder ser contactado | Incidente grave (`Art. 3(49)`) | Imediatamente após uma ligação causal ou a sua probabilidade razoável; no máximo 2 dias (infração generalizada ou infraestrutura crítica), 10 dias (morte) ou 15 dias (outro) a partir da consciência; um relatório inicial incompleto é permitido | Investigação, avaliação de risco e ação corretiva; sem alterar o sistema antes de informar as autoridades | Autoridade de fiscalização do mercado onde ocorreu; o Serviço para a IA para sistemas sob a sua competência [15] |
| Regulamento da IA da UE `Art. 26(5)` [3] | Responsável pela implantação de um sistema de risco elevado | Incidente grave; ou razão para considerar que o sistema apresenta um risco | Incidente grave: imediatamente, prestador em primeiro lugar; risco: sem demora injustificada, mais suspensão | Cooperação com a investigação do prestador | Prestador, depois importador ou distribuidor, e a autoridade de fiscalização do mercado |
| Regulamento da IA da UE `Art. 55(1)(c)` com Compromisso 9 do Código de Prática [5][16] | Prestador de um modelo GPAI com risco sistémico | Incidente grave envolvendo o modelo | Sem demora injustificada; sob o Código: 2 dias (infraestrutura crítica), 5 dias (violação grave de cibersegurança), 10 dias (morte), 15 dias (saúde, direitos, propriedade, ambiente) | Relatório intermédio pelo menos a cada quatro semanas enquanto não resolvido; relatório final no prazo de 60 dias após resolução | Serviço para a IA e, conforme aplicável, autoridades nacionais |
| GDPR `Art. 33` [17] | Responsável pelo tratamento (o subcontratante notifica o responsável sem demora injustificada) | Violação de dados pessoais, a menos que seja improvável resultar num risco | Sem demora injustificada e, quando viável, no prazo de 72 horas a partir da consciência; razões obrigatórias se mais tarde | A informação pode ser fornecida em fases; cada violação documentada | Autoridade de supervisão |
| GDPR `Art. 34` [17] | Responsável pelo tratamento | Violação com probabilidade de resultar num risco elevado | Sem atraso injustificado | Nenhum estabelecido | Titulares de dados afetados |
| NIS2 `Art. 23` [13] | Entidades essenciais e importantes | Incidente significativo | Aviso prévio no prazo de 24 horas; notificação de incidente no prazo de 72 horas | Relatório intermédio a pedido; relatório final no prazo de um mês a partir da notificação | CSIRT ou autoridade competente |
| DORA `Art. 19` com RTS 2025/301 [18][19] | Entidades financeiras | Incidente grave relacionado com TIC | No prazo de 4 horas após classificação como grave, e no máximo 24 horas a partir da consciência; se classificado como grave apenas após essas 24 horas, no prazo de 4 horas dessa classificação | Intermédio no prazo de 72 horas a partir da notificação inicial; final no prazo de um mês a partir do último relatório intermédio | Autoridade competente financeira |
| Regulamento de Ciber-Resiliência `Art. 14` [20] | Fabricantes de produtos com elementos digitais | Vulnerabilidade explorada ativamente; incidente grave afetando a segurança do produto | Aviso prévio no prazo de 24 horas; notificação no prazo de 72 horas | Relatório final 14 dias após uma correção estar disponível (vulnerabilidade) ou um mês após notificação (incidente) | CSIRT coordenador e ENISA, através da plataforma de comunicação única |
| California SB 53 [21] | Programadores de fronteira (todos, não apenas grandes programadores de fronteira) | Incidente crítico de segurança | No prazo de 15 dias a partir da descoberta; no prazo de 24 horas se houver risco iminente de morte ou lesão física grave | Nenhum estabelecido aqui | Serviço de Emergências; para risco iminente, uma autoridade apropriada |
| New York RAISE Act [22][23] | Programadores de fronteira (modelos treinados acima de 10^26 operações; todos, não apenas grandes programadores de fronteira) | Incidente crítico de segurança | No prazo de 72 horas a partir de uma determinação ou de conhecer factos que apoiem uma crença razoável; no prazo de 24 horas se houver risco iminente de morte ou lesão física grave; efetivo a 1 de janeiro de 2027 | Nenhum estabelecido aqui | Serviço de supervisão dentro do Departamento de Serviços Financeiros; para risco iminente, uma agência de aplicação da lei ou segurança pública com jurisdição |
| Estrutura comum de comunicação da OCDE [2] | Voluntário | Incidente ou perigo de IA | Sem relógio | 29 critérios em oito dimensões | Não é um dever de comunicação; um esquema partilhado |

### Leitura da tabela

**Os gatilhos não são o mesmo evento.** RGPD, NIS2, CRA e `Art. 73` contam a partir da
*consciência*. O relógio de 4 horas do DORA conta a partir da *classificação* como grave, com um
limite externo de 24 horas a partir da consciência; uma classificação feita após essas 24 horas
inicia o seu próprio relógio de 4 horas (`Art. 5(2)` de RTS 2025/301) [19]. `Art. 73` também pede o
relatório *imediatamente* uma vez estabelecida uma ligação causal, ou a sua probabilidade razoável,
com as contagens de dias como limites externos [3]. RAISE conta a partir de uma *determinação* ou
uma *crença razoável* [23]. Um registo de incidentes portanto necessita de uma marca de tempo por
gatilho, não um "aberto em": primeiro sinal, decisão de consciência, classificação por regime,
ligação causal estabelecida, e cada submissão.

**Alguns regimes diferem para outros.** NIS2 afasta-se onde um ato da União específico do setor
impõe notificação de incidentes pelo menos equivalente, que é como DORA desloca a comunicação NIS2
para entidades financeiras [13]. O Regulamento da IA estreita-se de forma semelhante: para sistemas
do Anexo III cujos prestadores já estão sob obrigações de comunicação equivalentes da União, e para
IA em dispositivos médicos, `Art. 73` a comunicação é limitada a infrações de direitos fundamentais
(`Art. 3(49)(c)`) [3]. De acordo com um resumo de um escritório de advocacia da orientação do
projeto da Comissão, o projeto aplica isto a setores como infraestrutura crítica NIS2 [24]. Quais os
regimes que contam como "equivalentes" para um determinado sistema é uma questão legal; registe-o
por sistema no registo, não por incidente sob pressão.

**As datas estão em movimento.** Quatro pontos a verificar novamente antes de confiar na tabela,
todos a partir de 2026-09-24:

- O regime de risco elevado aplica-se aos sistemas do Anexo III a partir de 2 de dezembro de 2027 e
  aos sistemas do Anexo I a partir de 2 de agosto de 2028, após o Omnibus Digital ter adiado o
  Capítulo III, Secções 1 a 3 (`Art. 113(c)`) [34]. `Art. 73` situa-se no Capítulo IX e não foi ele
  próprio adiado, mas atinge um sistema apenas uma vez {`Art. 6`} o classifica como de risco
  elevado, portanto na prática segue as mesmas datas (verifique com conselho); os deveres GPAI em
  {`Art. 55`} já se aplicam (ver [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)).
- O Omnibus deixou os prazos {`Art. 73`} inalterados mas adicionou {`Art. 75(1a)`}: prestadores de
  sistemas de risco elevado sob competência exclusiva do Serviço para a IA (amplamente, sistemas
  construídos no próprio modelo GPAI do prestador e sistemas em plataformas online muito grandes ou
  motores de busca) comunicam incidentes graves ao Serviço para a IA {[15][25]}.
- A Comissão publicou orientação de projeto {`Art. 73`} e um modelo de comunicação em 26 de setembro
  de 2025, alinhados com o monitor de incidentes e estrutura comum de comunicação da OCDE {[26]}. Se
  a orientação final foi entretanto adotada não é confirmado aqui (verifique).
- Uma proposta separada do Omnibus Digital (COM(2025) 837) alteraria a notificação de violação RGPD
  e adicionaria um ponto de entrada único para comunicações de incidentes. Está tabelada, não
  adotada: a partir da atualização de 1 de agosto de 2026 do Parlamento, as alterações estavam sob
  discussão e o mandato do Conselho tinha estagnado {[27]}. Comentadores relatam um prazo RGPD mais
  longo limitado a violações de risco elevado (verifique). A regra de 72 horas mantém-se; o capítulo
  19 cobre
  [violações de privacidade específicas de IA e o relógio de 72 horas](/bok/privacy-and-ai#ai-specific-privacy-breaches).
- Fora da UE os relógios diferem novamente: o capítulo 21 expõe os
  [relógios de incidentes entre regimes](/bok/ai-laws-worldwide#incident-clocks-across-regimes).

### Um registo, muitos relatórios

A resposta de engenharia para relógios sobrepostos não é um calendário melhor. É um registo de
incidentes que mantém os factos uma vez, e um gerador por regime que renderiza o relatório que esse
regime quer, cada um com o seu próprio temporizador. Os relógios vivem no registo, e o pipeline
alerta sobre o prazo mais próximo:

```json
{
  "incident_id": "INC-2026-0918-01",
  "clocks": [
    { "regime": "gdpr_art33", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "due_at": "2026-09-21T15:02:00Z", "status": "submitted",
      "submitted_at": "2026-09-20T10:40:00Z" },
    { "regime": "nis2_art23", "trigger": "aware", "trigger_at": "2026-09-18T15:02:00Z",
      "status": "not_applicable",
      "rationale": "not significant under Art. 23(3); signed off by security IR lead" },
    { "regime": "ai_act_art73", "status": "not_applicable",
      "rationale": "csa-01 is not a high-risk system (registry class: limited risk)" }
  ]
}
```

Uma decisão "não aplicável" é também evidência. Registe-a com a sua fundamentação e o seu
proprietário; a pergunta que uma autoridade faz um ano depois é geralmente "por que não comunicou?",
e a resposta deve ser um registo, não uma memória.

> **Na prática (ilustrativo)**
> Reproduzindo um cenário realista em {`csa-01`}, o assistente de atendimento ao cliente do
> [capítulo 04](/bok/the-stack#one-system-through-the-five-layers): uma nota de encomenda contendo
> instruções ocultas fez o assistente incluir o endereço de entrega de outro cliente numa resposta.
> O guardrail registou mas não bloqueou a saída. A triagem definiu SEV-2 (dados pessoais divulgados
> a terceiros) e executou os regimes. RGPD {`Art. 33`}: notificável, relógio de 72 horas a partir da
> decisão de consciência do EPD. RGPD {`Art. 34`}: não risco elevado para o cliente afetado nos
> factos, decisão registada. NIS2: prestadores de telecomunicações estão em âmbito como
> infraestrutura digital {[13]}, mas uma divulgação de registo único não foi significativa,
> determinação registada. Regulamento da IA {`Art. 73`}: não um sistema de risco elevado, portanto
> sem relógio; o incidente ainda foi para o fornecedor de modelo através do seu canal de comunicação
> a jusante. A notificação RGPD saiu em 44 horas, gerada a partir do mesmo registo que a revisão de
> causa raiz mais tarde utilizou.

## O registo de incidentes

Desenha o registo uma única vez, em torno do que os destinatários mais exigentes pedem, e todos os
outros relatórios tornam-se uma projeção do mesmo. A página de modelos tem os
[campos do registo de incidentes](/resources/templates#schema-incident-record) como um JSON Schema
com um exemplo preenchido. Dois esquemas públicos estabelecem o padrão. O modelo da Comissão para
incidentes graves de IA de finalidade geral pede dez itens: datas de início e fim, o dano resultante
e as vítimas ou grupo afetado, a sequência de eventos, o modelo envolvido, a evidência disponível, a
resposta do prestador, a sua recomendação às autoridades, uma análise de causa raiz, padrões do
acompanhamento pós-comercialização incluindo quase-incidentes, e informações do notificador [12]. O
quadro comum de comunicação da OCDE define 29 critérios em oito dimensões (metadados, detalhes do
dano, pessoas e planeta, contexto económico, dados e entrada, modelo de IA, tarefa e saída, outras
informações) [2].

| Grupo de campos | Campos do registo | Modelo da Comissão para IA de finalidade geral [12] | Quadro de comunicação da OCDE [2] | Preenchido a partir de |
|---|---|---|---|---|
| Identidade | `incident_id`, título, descrição, sistemas e versões, ids do registo, organizações que desenvolveram e implantaram | Modelo envolvido; notificador | Título; descrição; nome e versão; organizações; notificador | Registo (camada 02) |
| Tempo | `first_signal_at`, `aware_at`, `started_at`, `ended_at`, acionador por regime e tempos de submissão | Datas de início e fim | Data da primeira ocorrência conhecida | Rastreios; pipeline |
| Dano | Severidade, tipo de dano, quantificação, grupos afetados, países, impacto nos direitos | Dano resultante e vítimas | Severidade; tipo de dano; quantificação; partes interessadas afetadas; impactos nos direitos humanos; países | Triagem; EPD; legal |
| Contexto | Indústria, função comercial, ligação a infraestrutura crítica, amplitude da implantação, tarefa, nível de autonomia | Sequência de eventos | Indústria; função comercial; infraestrutura crítica; amplitude da implantação; tarefa; nível de autonomia | Registo; registo de admissão |
| Causa | Hipótese de modo de falha, códigos de causa confirmados, ligação aos dados de treino, modelo ou interação multi-sistema, utilização indevida | Análise de causa raiz; padrões pós-comercialização e quase-incidentes | Ligação aos dados de treino; ligação ao modelo; interação multi-sistema; utilização não intencional ou ilícita | Comissão de revisão |
| Evidência | Ids de rastreio, snapshots, eventos de guardrail, material de apoio | Evidência disponível | Materiais de apoio; passos para reproduzir | Camadas 04 · 05 |
| Resposta | Ações de contenção, ações corretivas, ids de CAPA, recomendação às autoridades | Resposta; recomendação | Ações tomadas | Comandante do incidente; CAPA |
| Relógios | Uma entrada por regime: aplicabilidade, fundamentação, proprietário, prazo, submetido | Não no modelo | Não no quadro | Pipeline |
| Ligações | Ids de risco, ids de avaliação adicionados, playbook utilizado | Não no modelo | Não no quadro | Registo de riscos; suite de avaliação |

Armazena o registo como dados estruturados no armazém de garantia, e emite as suas partes relevantes
para o controlo como evidência legível por máquina: itens de CAPA mapeiam naturalmente para um plano
de ação e marcos (`OSCAL`) (`POA&M`), o lugar nativo do modelo para descobertas abertas e a sua
remediação [28]. Este é o padrão
[Evidência Legível por Máquina](/patterns/machine-readable-evidence-oscal) aplicado a incidentes, e
permite que um auditor consulte "todos os incidentes SEV-2 no Q3 com CAPA aberta" em vez de pedir
uma folha de cálculo.

## Aprender com bases de dados públicas de incidentes

O teu próprio histórico de incidentes é pequeno e enviesado para o que já detectas. Repositórios
públicos alargam-no, desde que saibas o que são. Este site mantém dois pontos de partida curados: os
[casos de incidentes escritos como post-mortems](/cases) e o [atlas de danos](/resources/harms), que
mapeia danos por nível para o controlo que apanha cada um.

- **Base de Dados de Incidentes de IA (AIID).** Gerida pela Responsible AI Collaborative, indexa
  danos e quase-danos de IA implantada, à semelhança das bases de dados de incidentes da aviação e
  segurança informática. Classifica incidentes com várias taxonomias (a Taxonomia de Danos de IA do
  CSET, uma taxonomia de Objetivos, Métodos e Falhas, e a do Repositório de Risco de IA do MIT) e
  oferece snapshots completos da base de dados para descarregar [29].
- **Monitor de Incidentes e Riscos de IA da OCDE (AIM).** Um monitor automatizado de incidentes e
  riscos de IA reportados nos meios de comunicação social, que mantém incidentes e riscos separados
  conforme as definições da OCDE [30].
- **Repositório AIAAIC.** Um registo independente de incidentes e controvérsias envolvendo IA,
  algoritmos e automação, em setores que vão do reconhecimento facial à contratação automatizada
  [31].
- **Repositório de Risco de IA do MIT.** Não é uma base de dados de incidentes mas um catálogo
  estruturado de riscos de IA com taxonomias causais e de domínio, útil para verificar que a tua
  taxonomia de causas e registo de riscos não têm pontos cegos [32].

Utiliza-os de quatro formas. **Semeia o registo de riscos**: extrai os incidentes registados para
implantações como a tua e verifica que cada um tem um risco correspondente.
**Escreve a avaliação antes do incidente**: transforma um incidente público num caso de teste contra
o teu sistema, alimentando a [suite de red-team](/patterns/adversarial-red-team-suite) juntamente
com o catálogo de técnicas MITRE ATLAS [33]. **Calibra a escala de severidade**: verifica que
incidentes reais caem onde os teus testes de dano dizem que devem cair.
**Alimenta o acompanhamento de IA de finalidade geral**: o Código de Prática lista bases de dados de
incidentes entre as fontes que os prestadores devem rever [5].

Conhece os limites. Coleções com origem em meios de comunicação sobre-representam o que é
noticiável, o que é virado para o consumidor e o que é em língua inglesa; um evento pode aparecer
várias vezes; e nenhuma delas fornece taxas base. Utiliza-as para encontrar modos de falha que não
tinhas imaginado, não para estimar com que frequência os teus ocorrerão. A lista de leitura mantém
as ligações atuais sob
[repositórios de incidentes e riscos](/bok/reading-list#incident-and-risk-repositories-the-empirical-record).

## O que pode fazer esta semana

1. **Escreve a escala de severidade como política.** Cinco níveis, um teste de dano por nível, os
   acionadores de regime por nível; executa os teus últimos três incidentes através dela e corrige
   as regras até os resultados corresponderem ao que decidirías à mão.
2. **Adiciona os timestamps.** Dá a cada ticket de incidente `aware_at`}, uma bandeira de
   aplicabilidade por regime com proprietário e fundamentação, e um tempo de prazo por relógio.
   Preenche retroativamente os incidentes abertos.
3. **Executa um tabletop.** Injeção indireta de prompts contra o teu assistente mais conectado: puxa
   o kill switch, preserva a evidência, redige a notificação RGPD. Regista os tempos.
4. **Testa o caminho de suspensão para um sistema procurado.** Confirma que o contacto de incidente
   do prestador está na entrada do registo e que podes parar o tráfego para o sistema, e mede quanto
   tempo demora.
5. **Codifica três eventos passados.** Atribui classes de causa da taxonomia aos teus últimos três
   incidentes ou quase-incidentes, e adiciona uma avaliação de regressão para cada um.

**Correspondências:** Regulamento da IA Art. 3(49), 20, 26(5)–(6), 55(1)(c), 72, 73, 75(1a) · Código
de Prática de IA de Finalidade Geral, Compromisso de Segurança e Proteção 9 · RGPD Arts. 33–34 ·
SRI2 Art. 23 · DORA Art. 19 · Regulamento de Ciber-Resiliência Art. 14 · ISO/IEC 42001 (cláusula
10.2, Anexo A.8) · NIST AI RMF (Manage 2.4, 4.1, 4.3) · NIST SP 800-61r3 · OWASP LLM01:2025, Agentic
ASI02/ASI08/ASI10 · Camada 04 Runtime Controls & Observability · Camada 05 Assurance & Continuous
Compliance. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] "Name it to tame it: defining AI incidents and hazards" (Luis Aranda and Karine Perset; summary of the OECD paper "Defining AI incidents and related terms", OECD Artificial Intelligence Papers, doi 10.1787/d1a8d965-en; AI incident and AI hazard definitions; graded terms serious AI incident, AI disaster, serious AI hazard). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[2] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; 29 criteria in eight dimensions; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act) of 13 June 2024: Art. 3(49) serious incident; Art. 3(61) widespread infringement; Art. 20 corrective actions and duty of information; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 73 reporting of serious incidents (2, 10 and 15 days; incomplete initial report; no altering the system before informing authorities; limits in Art. 73(9)–(10)). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action; Annex A.8 information for interested parties). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[5] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 serious incident reporting (Measure 9.1 identification sources and informing third parties of direct reporting channels, if available; 9.2 information incl. near misses; 9.3 timelines of 2, 5, 10 and 15 days, intermediate reports at least every four weeks, final report within 60 days of resolution; 9.4 retention of at least five years). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[6] NIST SP 800-61r3, Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile (supersedes SP 800-61r2; previous life-cycle phases mapped to CSF 2.0 functions). NIST. 2025-04. https://csrc.nist.gov/pubs/sp/800/61/r3/final (verified: primary)
[7] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring incl. incident response; MANAGE 4.3 incidents and errors communicated, processes followed and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[8] LLM01:2025 Prompt Injection (direct and indirect prompt injection). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[9] Top 10 for Agentic Applications 2026 (ASI02 Tool Misuse; ASI08 Cascading Failures; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[10] IEC 61025:2006, Fault tree analysis (FTA), edition 2.0 (IEC TC 56 Dependability). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template under Art. 55(1)(c) and Commitment 9; ten fields from start and end dates to root-cause analysis, near-miss patterns and submitter). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[13] Directive (EU) 2022/2555 (NIS2) of 14 December 2022: Art. 4 sector-specific Union acts; Art. 23 reporting obligations (significant incident; early warning within 24 hours; notification within 72 hours; final report within one month incl. type of threat or root cause); Annex I digital infrastructure incl. providers of public electronic communications networks and services. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[14] Commission Delegated Regulation (EU) 2024/1772, RTS on the classification of ICT-related incidents under DORA (Art. 8: major incidents; recurring incidents with the same apparent root cause, occurring at least twice within six months, count as one major incident). Publications Office of the EU (EUR-Lex). 2024-03-13. https://eur-lex.europa.eu/eli/reg_del/2024/1772/oj/eng (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 75 (Art. 75(1a), inserted by Reg. (EU) 2026/1744: serious incidents of high-risk systems under the AI Office's competence reported to the AI Office, Art. 73(2) to (9) applying mutatis mutandis; Art. 73 deadlines unchanged). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_75 (verified: primary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 55 (GPAI models with systemic risk; Art. 55(1)(c) keep track of, document and report serious incidents to the AI Office without undue delay). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_55 (verified: primary)
[17] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 33 notification of a personal data breach to the supervisory authority (72 hours where feasible; processor to controller; phased information; documentation) and Art. 34 communication to the data subject (high risk). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[18] Regulation (EU) 2022/2554 (DORA) of 14 December 2022: Art. 3(8) ICT-related incident; Art. 19 reporting of major ICT-related incidents. Publications Office of the EU (EUR-Lex). 2022-12-14. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[19] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5(1): initial notification within 4 hours of classification and no later than 24 hours from awareness; Art. 5(2): within 4 hours of a classification made after those 24 hours; intermediate within 72 hours; final within one month); report templates in Commission Implementing Regulation (EU) 2025/302. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[20] Regulation (EU) 2024/2847 (Cyber Resilience Act) of 23 October 2024: Art. 14 reporting obligations of manufacturers (24-hour early warning; 72-hour notification; final report 14 days after a fix or one month after notification; CSIRT and ENISA via the single reporting platform); Art. 71(2) Art. 14 applies from 11 Sep 2026. Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[21] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025; approved 29 Sep 2025; Bus. & Prof. Code 22757.13(c): critical safety incidents reported by any frontier developer, not only a large frontier developer, to the Office of Emergency Services within 15 days, or within 24 hours to an appropriate authority on imminent risk of death or serious physical injury). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[22] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; 72-hour safety incident disclosure). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[23] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment; all frontier developers, not only large frontier developers, report a critical safety incident within 72 hours of a determination or reasonable belief to the DFS office; 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[24] "European Commission Publishes Draft Guidance on Reporting Serious AI Incidents" (indirect causation; simplified Art. 73 reporting where equivalent sector obligations apply, limited to fundamental-rights infringements). Latham & Watkins. 2025-10-28. https://www.lw.com/en/insights/european-commission-publishes-draft-guidance-reporting-serious-ai-incidents (verified: secondary)
[25] "EU AI Act Update: Digital Omnibus Finalizes 8 Compliance Changes" (AI Office exclusive competence over AI systems built on the same provider's GPAI model and over systems in very large online platforms and search engines; serious-incident reports from those providers go to the AI Office). Orrick. 2026-07-29. https://www.orrick.com/en/Insights/2026/07/EU-AI-Act-Update-Digital-Omnibus-Finalizes-8-Compliance-Changes (verified: secondary)
[26] "AI Act: Commission issues draft guidance and reporting template on serious AI incidents, and seeks stakeholders' feedback" (published 26 Sep 2025; feedback until 7 Nov 2025; alignment with the OECD AI Incidents Monitor and Common Reporting Framework). European Commission. 2025-09-26. https://digital-strategy.ec.europa.eu/en/consultations/ai-act-commission-issues-draft-guidance-and-reporting-template-serious-ai-incidents-and-seeks (verified: primary)
[27] Legislative Train Schedule: The Digital Omnibus Regulation Proposal (COM(2025) 837; status tabled; single reporting point for cybersecurity and data incidents; co-rapporteurs' draft report 22 Jun 2026; Council mandate vote cancelled 26 Jun 2026; page updated 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[28] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[29] AI Incident Database (harms and near harms from deployed AI; CSET, GMF and MIT taxonomies; database snapshots). Responsible AI Collaborative. 2026. https://incidentdatabase.ai/ (verified: primary)
[30] OECD.AI Incidents and Hazards Monitor (AIM; automated monitor of news media; incidents and hazards distinguished). OECD. 2026. https://oecd.ai/en/incidents (verified: primary)
[31] AIAAIC Repository (independent register of AI, algorithmic and automation incidents and controversies). AIAAIC. 2026. https://www.aiaaic.org/aiaaic-repository (verified: primary)
[32] MIT AI Risk Repository (living database of AI risks; causal and domain taxonomies). MIT FutureTech. 2026. https://airisk.mit.edu/ (verified: primary)
[33] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[34] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 113 (Art. 113(c) as amended by Reg. (EU) 2026/1744: Chapter III, Sections 1 to 3, apply from 2 Dec 2027 for Annex III systems and from 2 Aug 2028 for Annex I systems; Chapter IX, Art. 73 included, is not listed among the postponed provisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_113 (verified: primary)
