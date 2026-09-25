---
lang: pt
source: bok/23-governing-agents.md
sourceHash: "68496168af91fdc6ea15449a06098053248d0f6b2e38249b40eb5ca4c2606e28"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 23. Governação de agentes de IA

> Um agente de IA é governado quando cada ação remonta a uma identidade registada, um âmbito que
> alguém aprovou, um ponto de verificação que disparou onde as apostas o exigiam e uma forma testada
> de o parar.

O Capítulo 05 apresenta quatro padrões de agentes: o [Agent Registry](/patterns/agent-registry),
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials), o
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) e a
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
[A Camada 04 do stack](/bok/the-stack#layer-04-runtime-controls--observability) diz o que o controlo
de runtime deve provar, e o [mapa regulatório](/bok/regulatory-map#china) alinha os controlos de
agentes de três frameworks lado a lado. Nenhum diz num único lugar o que torna um agente diferente
de governar, como os controlos formam um plano de controlo, ou onde cada controlo encontra a lei.
Este capítulo faz.

Um contraste primeiro. **A engenharia de segurança de IA**, a disciplina irmã, pergunta como um
atacante pode fazer um agente causar dano, e é proprietária do
[modelo de ameaça](/patterns/ai-threat-model). A engenharia de governação de IA faz uma pergunta
mais ampla: sob cuja autoridade o agente agiu, dentro de que limite, com que evidência, e quem
poderia tê-lo parado. Os dois partilham a maioria dos controlos. Diferem no que conta como feito:
para segurança um ataque bloqueado está feito; para governação está feito quando o bloqueio, a
autoridade por trás da ação e a aprovação estão no registo.

A lista agentic da OWASP afirma o primeiro princípio, **agência mínima**: o seu conselho é "evitar
autonomia desnecessária", porque o comportamento agentic implantado onde não é necessário "expande a
superfície de ataque sem adicionar valor" [1]. O controlo de agente mais barato é o agente que não
construiu: um fluxo de trabalho fixo com uma chamada de modelo é mais fácil de governar do que um
planeador que escolhe as suas próprias ferramentas. O Capítulo 15 trata
[o invólucro agentic como uma opção de implantação](/bok/governing-deployment#how-it-is-adapted),
com os controlos que adiciona em cima do modelo que envolve.

## O que torna um agente um objeto de governação

Um agente é um sistema de IA que persegue um objetivo escolhendo e tomando ações: planeia, chama
ferramentas, lê e escreve memória e pode entregar trabalho a outros agentes. O Capítulo 11 coloca-o
entre [os tipos de IA](/bok/ai-defined#agentic-systems) que um registo deve distinguir. Quatro
propriedades importam para a governação, e cada quebra uma suposição em que a governação de modelos
se baseia.

| Propriedade | O que muda | Questão de governação | Primeiro controlo |
|---|---|---|---|
| **Autoridade delegada** | O agente age em nome de alguém, com as suas permissões ou as suas próprias | Cuja autoridade foi utilizada, e era mais estreita do que a sua? | Identidade de carga de trabalho; registo de delegação |
| **Ferramentas** | A saída torna-se um efeito num sistema de registo, não texto que uma pessoa lê | Que ações pode tomar, em que recursos? | Lista de permissão de ferramentas; credenciais com âmbito |
| **Memória** | O estado persiste entre sessões, utilizadores e tarefas | O que se lembra, por quanto tempo, e quem pode escrever nela? | Âmbitos de memória; retenção; proveniência de escrita |
| **Autonomia** | Os passos acontecem sem nenhuma pessoa entre eles | Onde deve uma pessoa decidir, e pode pará-lo? | Pontos de verificação; kill switch |

O modelo de evidência muda com eles. Um modelo é avaliado nas suas saídas; um agente também deve ser
avaliado na sua **trajetória**, a sequência de planos, chamadas de ferramentas e operações de
memória que levaram a um efeito. Uma avaliação que pontua a resposta final e ignora o caminho
passará um agente que atingiu o resultado correto através de uma ferramenta que nunca deveria ter
tido.

### A autonomia é uma decisão de conceção

A autonomia é uma configuração que o responsável pela implantação escolhe, não uma propriedade do
modelo. Como Feng, McDonald e Zhang o colocam, "O nível de autonomia de um agente pode ser tratado
como uma decisão de conceção deliberada, separada da sua capacidade e ambiente operacional" [2].
Definem cinco níveis pelo papel que o utilizador desempenha: operador, colaborador, consultor,
aprovador e observador.
[O Modelo de Estrutura de Governação de IA de Singapura para IA Agentic](/bok/ai-laws-worldwide#singapore-model-frameworks-and-ai-verify)
descreve quatro níveis de envolvimento humano, de "agente propõe, humano opera" a "agente opera,
humano observa", e cita o mesmo trabalho [3]. A Estrutura de Confiança Agentic da Cloud Security
Alliance nomeia quatro níveis, de Estagiário (apenas leitura) a Principal (autónomo dentro de
limites), e torna a promoção conquistada: "precisão sustentada, um registo de incidentes limpo, uma
auditoria de segurança aprovada e aprovação de governação explícita" [4].

O Regulamento da IA da UE pede a mesma proporcionalidade: as medidas de supervisão para um sistema
de IA de risco elevado devem ser commensuráveis com os seus riscos, o seu nível de autonomia e o seu
contexto de utilização (`Art. 14(3)`) [5]. A tabela alinha as três escalas e atribui a cada nível um
conjunto mínimo de controlos. O alinhamento e os conjuntos de controlos são uma leitura deste livro,
não dos autores.

| Papel do utilizador [2] | Nível IMDA mais próximo [3] | Nível ATF mais próximo [4] | O que a pessoa faz | Controlos mínimos |
|---|---|---|---|---|
| **Operador** | O agente propõe, o utilizador opera | Estagiário | Executa todas as ações | Entrada no registo; identidade própria; ferramentas apenas de leitura; rastreios |
| **Colaborador** | O agente e o utilizador colaboram | Júnior | Aprova passos significativos | O acima, mais uma lista de permissão de ferramentas e um ponto de verificação antes de cada escrita |
| **Consultor** | Entre os dois | Júnior a Sénior | Define objetivos, dá feedback | O acima, mais um guardrail de tempo de execução em cada chamada de ferramenta e orçamentos de execução |
| **Aprovador** | O agente opera, o utilizador aprova | Sénior | Aprova passos críticos ou irreversíveis | O acima, mais um registo de aprovação, um disjuntor por agente e um kill switch testado |
| **Observador** | O agente opera, o utilizador observa | Principal | Audita após o facto | O acima, mais detecção de anomalias de trajetória e avaliações de trajetória independentes; apenas ações reversíveis e limitadas |

Registe o nível como um campo do registo (o capítulo 11 fornece
[uma escala de autonomia ilustrativa](/bok/ai-defined#from-definition-element-to-registry-field)
para o efeito) e trate a sua elevação como uma alteração que necessita da mesma revisão que uma nova
implantação. Uma promoção é uma decisão com evidência por trás dela, não uma bandeira que alguém
ativou.

## O registo de agentes

O padrão [Agent Registry](/patterns/agent-registry) torna o registo uma precondição da produção:
proprietário, âmbito e expiração, escritos pelo pipeline. A entrada de um agente tem de conter mais.
O enquadramento de Singapura pede que as identidades dos agentes sejam "catalogadas e geridas
centralmente", emitidas e rastreadas por um sistema central "para evitar a proliferação de agentes"
[3]; o apêndice de agentes da TC260 pede uma identidade única por agente e um conjunto de permissões
definido pelo modo de decisão [6].

| Campo | Por que está lá | Evidência que permite |
|---|---|---|
| **Identidade** (por exemplo um ID SPIFFE) | Atribuição | Cada linha de registo liga-se a uma entrada |
| **Proprietário** (equipa e pessoa responsável) | Responsabilidade | Uma rota de escalada que existe |
| **Finalidade** | Teste de âmbito; classificação legal | Detecção de utilização fora da finalidade |
| **Nível de autonomia** | Controlos proporcionados | Histórico de promoção |
| **Ferramentas e âmbitos** | A lista de permissão aplicada | Diffs de configuração de guardrail |
| **Classes de dados e armazenamentos de memória** | Privacidade e retenção | Ligações AIPD e registos de processamento |
| **Direitos de delegação** | Limites entre agentes | Política de delegação |
| **Versões** (modelo, prompts, pacote de política) | Controlo de alterações | Repetição da configuração exata num incidente |
| **Pontos de verificação** | Design de supervisão | Registo de aprovação |
| **Identificadores de paragem** (disjuntor, caminho de revogação, último teste) | Kill switch | Registo de teste |
| **Expiração** | Nenhum agente sobrevive à sua revisão | Desativação automática |
| **Papel regulatório e classe** | Obrigações | Mapa de obrigações |

> **Exemplo (ilustrativo)** Uma entrada de registo para um agente de reembolsos, escrita pelo
> pipeline de implantação. O bloco de versões é o que torna um incidente repetível; o bloco de
> paragem é o que torna o kill switch mais do que uma afirmação.

```yaml
# agent-registry entry (illustrative)
id: refunds-agent
identity: spiffe://corp.example/agents/refunds-agent
owner: { team: support-platform, accountable: head-of-support-operations }
purpose: Draft and execute refunds for orders under the published returns policy
autonomy_level: approver
tools:
  - { name: orders.read, scopes: [orders:read] }
  - { name: refunds.create, scopes: [refunds:write], checkpoint: "amount_eur > 200" }
delegation: { may_call: [fraud-check-agent], may_be_called_by: [support-orchestrator] }
memory: { session: true, long_term: none }
versions: { model: vendor-model@2026-08-15, system_prompt: "sha256:9f2c...e41", policy_bundle: v14 }
budgets: { tool_calls_per_task: 25, spend_eur_per_day: 5000 }
stop: { breaker: cb-refunds-01, revoke: identity, last_drill: 2026-09-10 }
ai_act: { role: deployer, class: not-high-risk }
expiry: 2026-12-17
```

Um registo é apenas tão bom quanto aquilo que perde. O padrão
[Shadow-AI Discovery](/patterns/shadow-ai-discovery) reconcilia-o com o que funciona: conectores
SaaS, agentes de codificação em portáteis e servidores MCP locais, que funcionam com os mesmos
privilégios que o cliente que os iniciou [7]. Um agente encontrado pela descoberta é registado
dentro de um prazo ou desligado.

> **Na prática (ilustrativo)**
> Numa grande operadora de telecomunicações, a primeira varredura de descoberta encontrou mais
> agentes em portáteis de programadores do que no registo de produção: assistentes de codificação
> com servidores MCP locais contendo tokens de acesso pessoal, alguns com acesso de escrita a
> repositórios partilhados. A solução não foi uma proibição. Um caminho pavimentado emitiu a cada
> programador um agente com uma credencial de curta duração, com âmbito de repositório, do sistema
> de identidade de produção, e a varredura tornou-se uma reconciliação semanal com um proprietário
> para cada descoberta.

## Identidade e credenciais de curta duração

### A autenticação de canal não é identidade de agente

Os capítulos 04 e 05 traçam a linha-chave. **Autenticação de canal** protege um salto, como um
cliente a falar com um servidor MCP. **Identidade de carga de trabalho de agente** é a identidade
atribuível que o agente carrega em cada salto, sob a qual as suas ações são registadas e o seu
acesso é revogado. O enquadramento de Singapura lista o que essa identidade deve ser: única e
"criptograficamente verificável"; "contabilizada", ligada a um agente supervisor, um utilizador
humano ou um departamento organizacional; diferenciada "de acordo com a capacidade em que atua",
independentemente ou em nome de um utilizador nomeado; e catalogada centralmente [3]. O NCCoE do
NIST pergunta como cada agente pode ser "conhecido, confiável e adequadamente governado" [8].

### Credenciais atestadas de curta duração

SPIFFE define "documentos de identidade criptográfica de curta duração", chamados SVIDs, entregues
através de uma Workload API que também os roda; um SVID é atualmente um certificado X.509 ou um JWT,
e SPIRE é a implementação de referência [9]. Um terceiro formato, WIT-SVID, um perfil SPIFFE do
Token de Identidade de Carga de Trabalho IETF WIMSE, ainda está em incubação a partir de 2026-09-24
[30]. O valor de governação está na duração: uma credencial que expira em minutos não precisa de ser
procurada após um incidente, apenas não ser reemitida. Uma chave API estática na configuração de um
agente é o oposto, e os atacantes sabem onde procurar: MITRE ATLAS cataloga "Credentials from AI
Agent Configuration" (`AML.T0083`) [10]. TC260 pede que as credenciais sejam revogadas no final da
tarefa [6]. Singapura pede que as autorizações sejam "limitadas no tempo ou na sessão, não
transferíveis", privilégio mínimo por defeito e nunca superior ao que o utilizador autorizador pode
fazer [3].

### Delegação sem representação

Quando um agente atua por um utilizador, duas identidades estão em jogo, e o registo deve manter
ambas. OAuth 2.0 Token Exchange (RFC 8693) separa **representação**, onde o ator se torna
indistinguível do sujeito, de **delegação**, onde ambos permanecem identificáveis. A sua afirmação
`act` "fornece um meio dentro de um JWT para expressar que a delegação ocorreu e identificar a parte
atuante", e as afirmações aninhadas `act` registam os atores anteriores na cadeia [11]. A regra para
agentes segue: trocar o token do utilizador por um delegado que nomeie o agente, com um âmbito mais
estreito e uma expiração curta; nunca entregue ao agente o próprio token do utilizador.

> **Exemplo (ilustrativo)** As afirmações de um token de acesso delegado. O utilizador é o sujeito;
> o agente de reembolsos é o ator atual; o orquestrador que delegou a tarefa a ele está aninhado
> dentro. O público é uma API e o âmbito uma operação.

```json
{
  "sub": "user:4711",
  "aud": "https://refunds.api.example",
  "scope": "refunds:write",
  "exp": 1790330400,
  "act": {
    "sub": "spiffe://corp.example/agents/refunds-agent",
    "act": { "sub": "spiffe://corp.example/agents/support-orchestrator" }
  }
}
```

### Autorização MCP a partir de 2026-07-28

A especificação do Model Context Protocol datada de 2026-07-28 é a versão atual a partir de
2026-09-24. A autorização é opcional em MCP; onde um transporte HTTP a utiliza, o servidor MCP atua
como um servidor de recursos OAuth 2.1 [12]. Os requisitos que importam para a governação:

| Requisito (especificação 2026-07-28) | O que previne | Evidência a manter |
|---|---|---|
| Os servidores DEVEM implementar Metadados de Recurso Protegido OAuth 2.0 (RFC 9728), e os clientes DEVEM utilizá-lo para encontrar o servidor de autorização [12] | Clientes a adivinhar de onde vêm os tokens | Configuração de descoberta no manifesto de ferramentas |
| Os clientes e servidores de autorização DEVEM suportar Documentos de Metadados de ID de Cliente; o Registo Dinâmico de Cliente está deprecado [12][13] | Registos de cliente anónimos e não geridos | Domínios de cliente permitidos como política |
| Os clientes DEVEM enviar o parâmetro `resource` (RFC 8707) com o URI canónico do servidor [12] | Tokens que funcionam em qualquer servidor | Pedidos de token nomeando o recurso |
| Os servidores DEVEM validar que um token foi emitido para eles e "NÃO DEVEM aceitar ou transitar nenhuns outros tokens" [12] | Passagem de token e o deputado confuso | Falhas de verificação de público levantadas como alertas |
| Os clientes DEVEM validar o parâmetro `iss` (RFC 9207) antes de resgatar um código, e as credenciais do cliente estão ligadas ao emissor que as cunhou [12][13] | Mistura de servidor de autorização | O emissor registado por fluxo |
| Os servidores DEVEM desafiar com os âmbitos que uma operação necessita, e os clientes sobem para mais [12] | Âmbitos omnibus concedidos antecipadamente | Eventos de elevação com IDs de correlação [7] |

A orientação de segurança que a acompanha é mais direta: a passagem de token "é explicitamente
proibida", e os erros de âmbito que lista incluem "Publicar todos os âmbitos possíveis" e "Usar
âmbitos wildcard ou omnibus" [7]. A versão 2026-07-28 também estabeleceu uma política de depreciação
com uma janela mínima de doze meses [13], portanto a versão MCP que cada servidor fala é um campo de
registo. E a especificação do Documento de Metadados de ID de Cliente ainda é um Internet-Draft IETF
(revisão 02, 6 Jul 2026) [14].

Nada disto identifica o agente. MCP protege o salto entre um cliente e um servidor. Qual agente está
por trás do cliente, e por quem, é o trabalho da identidade de carga de trabalho.

## Permissões de ferramenta e servidor MCP

### A lista de permissão de ferramentas

Uma ferramenta é uma capacidade, e a lista de permissão é onde as capacidades são concedidas. O
conselho da OWASP sob `ASI02` é "Definir perfis de privilégio mínimo por ferramenta (âmbitos, taxa
máxima e listas de bloqueio de saída)" e expressá-los "como estrofes de política IAM ou autorização
anexadas a cada ferramenta, em vez de confiar em convenções ad-hoc" [1]. TC260 pede que um agente
obtenha apenas as permissões mínimas que a sua tarefa atual necessita, e que uma operação seja
recusada por defeito quando o sistema de aprovação falha, o utilizador não responde ou nenhuma regra
de aprovação existe [6]. Uma entrada de lista de permissão tem mais do que um nome:

| Propriedade | Regra | Exemplo |
|---|---|---|
| **Identidade de ferramenta** | Servidor, nome da ferramenta e um hash da definição de ferramenta, fixado | `refunds.create` em `payments-mcp`, definição `sha256:…` |
| **Classe de operação** | Leitura, escrita, eliminação, envio, execução ou pagamento; a classe impulsiona pontos de verificação | `refunds.create` é pagamento |
| **Âmbito de recurso** | O conjunto de recursos mais estreito que a tarefa necessita | Encomendas do cliente no caso atual |
| **Taxa e volume** | Chamadas por tarefa e por hora | 25 por tarefa |
| **Saída** | Destinos que a ferramenta pode alcançar | Apenas API de pagamentos interna |
| **Classes de dados** | O que pode fluir dentro e fora | Nenhuns dados de categorias especiais para ferramentas externas |
| **Ponto de verificação** | Quando uma pessoa deve aprovar | Montante acima de 200 EUR |

Nenhuma ferramenta é inócua pelo nome. A lista da OWASP descreve um agente de codificação cuja
ferramenta ping aprovada automaticamente foi acionada repetidamente para exfiltrar dados através de
consultas DNS [1]; ATLAS cataloga "Exfiltração através da Invocação de Ferramenta de Agente de IA"
(`AML.T0086`) e "Destruição de Dados através da Invocação de Ferramenta de Agente de IA"
(`AML.T0101`) [10]. Limites de taxa e de saída aplicam-se, portanto, a todas as ferramentas,
incluindo aquelas com as quais ninguém se preocupa.

> **Exemplo (ilustrativo)** A lista de permissões como política de negação por defeito que o gateway
> de ferramentas avalia em cada chamada, lendo o registo como dados. A verificação de taxa é omitida
> por brevidade.

```rego
package agents.tools

default allow := false

allow if {
  entry := data.registry[input.agent_id]
  some tool in entry.tools
  tool.name == input.tool.name
  tool.definition_hash == input.tool.definition_hash
  input.tool.scope in tool.scopes
}

needs_approval if {
  input.tool.operation in {"delete", "send", "pay", "execute"}
}
```

### Admitir um servidor MCP

Um servidor MCP é um prestador. OWASP separa dois casos: uma ferramenta cuja interface é manipulada
em tempo de execução (envenenamento de ferramenta, sob `ASI02`) e uma ferramenta que é maliciosa ou
comprometida na origem (`ASI04`) [1]. ATLAS adicionou "Envenenamento de Ferramenta de Agente de IA"
(`AML.T0110`) para conteúdo ou comportamento malicioso introduzido na definição visível pelo modelo
de uma ferramenta ou na sua implementação [10]. Uma descrição de ferramenta é uma instrução que o
modelo lê, portanto uma descrição alterada é uma instrução alterada. Admita um servidor através de
um gate:

1. **Proveniência.** Publicador, repositório de origem e uma versão assinada, registados no
   [AIBOM](/patterns/aibom) de cada agente que o utiliza.
2. **Fixação de definição.** Faça hash dos nomes, descrições e esquemas das ferramentas na admissão;
   alerte sobre alterações.
3. **Conformidade de autorização.** Versão MCP, metadados de recursos protegidos, validação de
   audiência, sem passagem de token.
4. **Isolamento para servidores locais.** A orientação MCP exige que um cliente mostre o comando
   exato, sem truncagem, e obtenha aprovação explícita antes de uma instalação de servidor local com
   um clique, e recomenda executar tais servidores isolados com privilégios mínimos [7].
5. **Testagem.** Descritores envenenados e saídas de ferramentas injetadas, antes de qualquer lista
   de permissões.
6. **Um proprietário e uma data de revisão**, como qualquer outro prestador.

O [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) cobre o lado
comercial: quem responde quando o servidor se comporta mal, e que aviso recebe antes de ser
alterado.

## Pontos de verificação humanos e design de aprovação

### Onde colocar um ponto de verificação

O padrão [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) diz para fazer gate por
consequência. Duas fontes tornam "consequência" concreta. A Partnership on AI classifica o risco do
agente em três fatores: **stakes** (a gravidade das consequências potenciais), **reversibilidade**
(se uma falha pode ser desfeita) e **affordances** (seleção de ferramentas sem restrições e memória
persistente introduzem modos de falha mais complexos do que designs restritos) [15]. O framework de
Singapura lista quatro tipos de ponto de verificação: ações e decisões de alto risco, ações
irreversíveis, comportamento atípico ou fora do comum, e limites definidos pelo utilizador [3].

| Classe de ponto de verificação | Acionador (exemplos) | Quem aprova | Evidência |
|---|---|---|---|
| **Alto risco** | Uma decisão final sobre uma pessoa; uma edição a um registo sensível | Um papel nomeado com autoridade para recusar | Registo de aprovação com o contexto mostrado |
| **Irreversível** | Um pagamento, uma eliminação, uma mensagem externa, uma publicação | O proprietário do negócio da ação | Aprovação vinculada aos parâmetros exatos |
| **Atípico** | Acesso fora do escopo usual; um plano duas vezes o comprimento usual | O proprietário de serviço | Evento de anomalia e decisão |
| **Definido pelo utilizador** | Uma compra acima do limite do próprio utilizador | O utilizador | Registo de consentimento |
| **Elevação de escopo** | Um pedido de elevação para um novo escopo | O proprietário do agente | Evento de elevação |

### Como se parece uma boa aprovação

O Regulamento da IA descreve o supervisor que o design deve servir. Para um sistema de risco
elevado, devem ser capazes de reconhecer "a possível tendência de confiar automaticamente ou confiar
excessivamente na saída", de "descartar, anular ou reverter a saída", e de "interromper o sistema
através de um botão 'parar' ou procedimento similar" (`Art. 14(4)(b), (d), (e)`) [5]. O responsável
pela implantação deve atribuir supervisão a pessoas "que possuam a competência, formação e
autoridade necessárias, bem como o apoio necessário" (`Art. 26(2)`) [5]. Singapura acrescenta dois
pontos práticos: manter pedidos de aprovação "contextuais e digeríveis" enquanto deixa o risco
claro, e "Aplicar aprovação humana através de controlos ao nível do sistema sempre que possível, vs
guardrails ao nível do prompt, que podem ser contornados ou 'esquecidos'" [3].

A ameaça contra a qual se deve desenhar é `ASI09`, **exploração de confiança humano-agente**:
pessoas confiando excessivamente na rationale confiante de um agente e "aprovando ações sem
validação independente", que um atacante a orientar o agente pode explorar [1]. ATLAS tem uma
técnica para a própria persuasão, "Manipulação de Componentes de Saída Confiável de LLM"
(`AML.T0067`) [10]. As regras que se seguem:

1. **O gate vive fora do modelo.** O gateway de ferramentas mantém a chamada até que a aprovação
   chegue; o prompt não decide se deve pedir.
2. **Mostre a chamada, não a história.** O aprovador vê a ferramenta, os parâmetros e o alvo tal
   como o gateway os executará, depois a razão do agente, o risco e o que acontece na rejeição.
3. **Vincule a aprovação.** Uma aprovação é de uso único e vinculada a um hash dos parâmetros; um
   montante alterado precisa de uma nova aprovação.
4. **Tempo limite fechado.** Nenhuma resposta significa nenhuma ação.
5. **Meça a supervisão.** Taxa de aprovação, tempo para decidir e taxa de anulação, tal como
   [designing human oversight](/bok/the-stack#designing-human-oversight-article-14) descreve.

> **Antipadrão** Um ponto de verificação que dispara 200 vezes por dia numa pessoa com outro
> trabalho. Torna-se um carimbo de borracha dentro de uma semana, e o registo de aprovação então
> lava as decisões que deveria examinar.

> **Na prática (ilustrativo)**
> Uma equipa de pagamentos descobriu que os seus revisores aprovavam quase todos os pedidos de
> reembolso de agente em segundos. Duas alterações corrigiram: apenas reembolsos irreversíveis e de
> alto valor agora chegam a uma pessoa, o que reduziu o volume por uma ordem de magnitude, e o ecrã
> de aprovação mostra a chamada de ferramenta bruta primeiro, com a explicação do agente abaixo. As
> anulações subiram de quase nenhuma para uma taxa que vale a pena investigar, e duas das primeiras
> expuseram um caminho de injeção de prompt através de notas de cliente.

## Guardrails em tempo de execução para chamadas de ferramentas

Um guardrail em tempo de execução para um agente fica num ponto: entre a decisão de chamar uma
ferramenta e a chamada. A especificação Autonomous Action Runtime Management (AARM) da CSA define
"as capacidades que um sistema de segurança de agente deve fornecer para governar o que um agente de
IA pode fazer em tempo de execução", começando com interceção pré-execução vinculada a identidade e
avaliação de política antes da ação ser executada [16]. O Agent Control Standard da OWASP é uma
especificação de fio para o mesmo ponto: permite que um agente guardião separado "inspecione o que
um agente de IA está prestes a fazer e permita, negue ou modifique essa ação antes de acontecer,
sobre um canal autenticado, com um trilho de auditoria" [17].

O guardião de referência no repositório ACS começa com uma postura de falha de "proceder", anulável
para negar [17]. A partir de 2026-09-24 o README do repositório também divulga que o guardião de
referência ainda não implementa a assinatura de envelope HMAC-SHA256 que a especificação exige,
portanto o seu fio é não autenticado e qualquer coisa que possa alcançar a porta pode ler e causar
decisões [17]. O padrão de falha aberta é uma decisão de governação disfarçada de configuração:
quando o guardião está inativo, falha aberta deixa todas as chamadas passar descontroladas e falha
fechada para o negócio. Decida por classe de operação e registe no
[Policy Card](/patterns/policy-card) do agente: falha fechada para pagar, eliminar, enviar e
executar; falha aberta, com um alerta, apenas para leituras.

| Verificação | Executa | Na falha |
|---|---|---|
| A identidade corresponde a uma entrada de registo ativa | Cada chamada | Negar |
| Ferramenta na lista de permissões; hash de definição corresponde | Cada chamada | Negar |
| Parâmetros dentro da política (recurso no escopo, limites de montante) | Cada chamada | Negar, ou encaminhar para um ponto de verificação |
| Proveniência de instrução: o pedido originou-se em conteúdo não confiável? | Antes de chamadas de classe de escrita | Encaminhar para um ponto de verificação |
| Filtro de saída e saída (segredos, dados pessoais, destinos) | Após a chamada, antes do resultado retornar | Redactar ou bloquear |
| Orçamentos de execução (passos, chamadas, tokens, despesa, tempo) | Continuamente | Dispare o disjuntor |
| O código executa apenas numa sandbox | Ferramentas de classe de execução | Negar (`ASI05`) |

### Limites de execução

Orçamentos são o guardrail que apanha o que nenhuma regra antecipou. A lista OWASP LLM de 2026
nomeia "arquiteturas agentes e protocolos de uso de ferramentas (como MCP) que amplificam um único
pedido em operações cascata a jusante" como um fator agravante e recomenda "limites de despesa
rígidos, disjuntores ao nível do agente, e monitorização contínua de atribuição de custos"
(`LLM06:2026`) [18]. ATLAS adicionou "Consumo de Recursos Agente" (`AML.T0034.002`) para atacantes
que coagem um agente em chamadas de ferramentas caras [10], e TC260 pede limites de passo,
frequência e duração [6]. Coloque os orçamentos na entrada do registo, aplique-os no gateway e faça
a exaustão disparar o disjuntor em vez de abrir um ticket. O padrão
[Runtime Guardrail](/patterns/runtime-guardrail) cobre a mecânica; um **agente guardião**, como o
capítulo 04 nota, é uma forma de construir o ponto de aplicação e precisa da sua própria identidade,
escopo e kill switch.

## Kill switch e disjuntores por agente

A autonomia é concedida apenas onde pode ser retirada. O NIST AI RMF pede mecanismos para
"substituir, desativar ou desativar" sistemas cujos resultados são inconsistentes com o uso previsto
(MANAGE 2.4) [19]; o Regulamento da IA pede um procedimento de paragem (`Art. 14(4)(e)`) [5]; o
framework da CSA coloca o objetivo claramente: "Pode parar um agente sem parar o negócio" [4]. O
padrão [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) dá o mecanismo. Em
operação, uma paragem tem níveis:

| Nível de paragem | Mecanismo | Raio de explosão | Tempo alvo (ilustrativo) | Evidência |
|---|---|---|---|---|
| **Pausar uma tarefa** | Manter no próximo ponto de verificação, ou cancelar a tarefa | Uma tarefa | Segundos | Mudança de estado de tarefa |
| **Estreitar o escopo** | Remova uma ferramenta ou escopo da lista de permissões | Uma capacidade de um agente | Menos de um minuto | Diff de política |
| **Dispare o disjuntor** | O gateway rejeita cada chamada do agente | Um agente | Segundos | Evento de disjuntor |
| **Revogar a identidade** | Pare de emitir credenciais; revogue tokens de atualização | Um agente, em todo o lado | Limitado pela duração da credencial | Registo de revogação |
| **Parar uma classe** | Disjuntores em cada agente partilhando um modelo, ferramenta ou versão de prompt | Um segmento de frota | Minutos | Evento de frota |
| **Degradar** | Mude para apenas aconselhamento ou volte ao piloto | Comportamento, não disponibilidade | Minutos | Mudança de modo |

La última fila utiliza los modos de
[degradación gradual](/bok/governing-deployment#graduated-degradation) del capítulo 15: «solo
asesoramiento» (el agente redacta, una persona actúa) mantiene el servicio mientras elimina la
autonomía. Los disparadores se definen por adelantado: una extracción manual, un umbral de
presupuesto o llamadas no autorizadas, una anomalía, un aviso ascendente (el proveedor del modelo
informa de un incidente) o una instrucción legal.

Una parada que no ha sido simulada es una afirmación. Simúlala según un calendario, mide el tiempo
hasta la parada y comprueba que la parada se mantuvo: ninguna llamada de herramienta después de que
se activara el disyuntor, ninguna credencial emitida después de la revocación. El capítulo 17 hace
el mismo punto para [comportamiento rogue](/bok/incidents#ai-specific-failure-modes): revoca y luego
verifica que la revocación surtió efecto.
[Decommissioning](/patterns/deactivation-localisation-retirement-runbook) es la versión planificada:
TC260 enumera apagado completo, copia de seguridad de datos y limpieza del entorno [6]; añade
eliminar la memoria según su regla de retención y eliminar el agente de las listas de delegación de
otros agentes.

### Parada entre saltos

No puedes parar el agente de otra persona. La operación de cancelación de A2A lo dice: «El servidor
intentará cancelar la tarea, pero el éxito no está garantizado» [20]. Lo que controlas es tu propio
límite: evita que tus agentes llamen al remoto y revoca lo que le emitiste. Los tokens delegados de
corta duración hacen que esa revocación esté limitada por su tiempo de vida; los de larga duración
la convierten en una esperanza.

> **Na prática (ilustrativo)**
> Una simulación de kill-switch en un agente de procesamiento de documentos midió cuatro segundos
> desde la extracción hasta que el disyuntor rechazara las llamadas, lo que parecía un éxito. La
> comprobación de seguimiento encontró tareas de larga duración aún escribiendo en el almacenamiento
> veinte minutos después, en un token de actualización emitido antes de la extracción. Los tokens de
> actualización del agente fueron eliminados, los tokens de acceso reducidos a cinco minutos, y la
> simulación ahora afirma cero escrituras después de la extracción, no solo un disyuntor rápido.

## Gobernanza de memoria y contexto

La memoria convierte una entrada mala en una duradera. La lista OWASP LLM de 2026 llama a esto
**persistencia de memoria**: «una inyección que escribe en memoria a largo plazo, un corpus RAG, un
almacén de vectores o un servicio de memoria alojado contamina cada sesión posterior que lee de ese
almacén» [18]. La lista de agentes de OWASP lo tiene como `ASI06` Memory & Context Poisoning [1];
ATLAS tiene «AI Agent Context Poisoning» (`AML.T0080`), con subtécnicas para memoria y para el hilo
de chat [10].

| Memória | Lo que contiene | Riesgo principal | Control | Retención |
|---|---|---|---|---|
| **Ventana de contexto** | Instrucciones, texto recuperado, salidas de herramientas | Inyección a través de la salida de herramientas | Etiquetas de procedencia; segmentos no confiables marcados | Una solicitud |
| **Hilo de conversación** | Una sesión | Envenenamiento de hilo (`AML.T0080.001`) | Aislamiento por sesión | La sesión |
| **Memoria a largo plazo** | Hechos y preferencias entre sesiones | Envenenamiento de memoria (`AML.T0080.000`); datos personales conservados demasiado tiempo | Puerta de escritura; espacio de nombres por usuario; tiempo de vida; ruta de borrado | Definido por política, por clase |
| **Corpus de recuperación** | Documentos | Fuentes envenenadas u obsoletas (`AML.T0099`) | Admisión de fuentes; comprobación de derechos en la recuperación | Por versión de corpus |
| **Memoria compartida** | Estado pasado entre agentes | Contaminación entre agentes | Aislamiento por tarea; escrituras atribuidas | La tarea |
| **Configuración del agente** | Prompts, configuración de herramientas | Manipulación (`AML.T0081`); credenciales almacenadas (`AML.T0083`) | Control de cambios; sin secretos | Versionado |

Cinco reglas hacen la memoria gobernable. **Las escrituras son eventos** que llevan su fuente, así
que una entrada envenenada se remonta a lo que la produjo.
**El contenido no confiable no puede escribir en memoria a largo plazo** sin una puerta.
**La memoria está aislada** por usuario y por tarea, como TC260 pide, con ventanas de retención y
sin credenciales en memoria [6]. **La retención es código**: un almacén de memoria que contiene
datos personales está sujeto a los principios de minimización y limitación del almacenamiento del
RGPD (`Art. 5(1)(c), (e)`) y al derecho al olvido (`Art. 17`) [21]; véase
[derechos de los interesados contra modelos entrenados](/bok/privacy-and-ai#data-subject-rights-against-trained-models).
**La memoria puede revertirse** a una instantánea conocida como buena en lugar de ser borrada.

Para sistemas de alto riesgo que continúan aprendiendo después del despliegue, la Ley de IA pide que
se desarrollen para reducir «el riesgo de que las salidas posiblemente sesgadas influyan en la
entrada para operaciones futuras» (`Art. 15(4)`) [5]. Una memoria que forma el comportamiento
posterior es tal ruta de retroalimentación en todo menos en el nombre, y leer `Art. 15(4)` como
cubriéndola es el curso prudente hasta que la orientación diga lo contrario.

## Sistemas multiagente y cadenas de delegación

El protocolo Agent2Agent (A2A) es un protocolo abierto para la comunicación entre agentes,
desarrollado inicialmente por Google y donado a la Linux Foundation. La versión 1.0.0 se lanzó el 12
de marzo de 2026 y la 1.0.1 el 28 de mayo de 2026 [20]; el 27 de agosto de 2026, A2A fue aceptado
como un proyecto de Growth Stage de la Agentic AI Foundation, dirigido por la Linux Foundation,
junto con MCP [22]. Su modelo de seguridad te da bloques de construcción. Un agente publica una
**Agent Card** en `/.well-known/agent-card.json`} describiendo su identidad, habilidades, punto
final y requisitos de autenticación; la tarjeta puede estar firmada con JWS sobre una forma JSON
canónica; la tarjeta declara los esquemas de autenticación que el agente acepta (claves API,
autenticación HTTP, OAuth 2.0, OpenID Connect o TLS mutuo); y el servidor «DEBE autenticar cada
solicitud entrante» [20]. La autorización después de eso es, en palabras de la especificación,
«específica de la implementación» [20].

Lo que A2A no te da es responsabilidad. Un agente que necesita más autoridad a mitad de la tarea
mueve la tarea a `TASK_STATE_AUTH_REQUIRED`}, y un cliente que es en sí mismo un agente puede pasar
la solicitud hacia arriba, «formando una cadena de tareas» [20]. Pero la especificación establece
que «no define el alcance, la representación, la validez o la semántica de revocación de la decisión
de autorización u credencial obtenida» [20]. El protocolo mueve tareas; las reglas sobre quién puede
autorizar qué, a través de cuántos saltos, son tuyas para escribir.

Las amenazas se nombran: `ASI07`} Insecure Inter-Agent Communication, `ASI08`} Cascading Failures y
`ASI10`} Rogue Agents [1]}, y ATLAS añadió «Autonomous AI Agent Communication» (`AML.T0118`}) a
finales de agosto de 2026 [10]}. El Código de Prácticas de GPAI enumera «colusión» con otros
sistemas de IA y «descoordinación o conflicto» con ellos entre las propensiones del modelo que son
fuentes de riesgo sistémico [23]}.

### Responsabilidad entre saltos

| Propriedade | Regra | Evidência |
|---|---|---|
| **Principal originario** | Cada tarea lleva la persona o sistema que la inició | Raíz del registro de delegación |
| **Actor por salto** | Cada agente se autentica como sí mismo; delegación, nunca suplantación | Reclamaciones anidadas `act`} [11]} |
| **Alcance** | Se estrecha o permanece igual en cada salto; nunca se amplía | Registro de intercambio de tokens |
| **Finalidade** | El propósito de la tarea viaja con ella y se comprueba en cada salto | Campo de propósito en cada llamada |
| **Profundidad y dispersión** | Saltos máximos y subtareas paralelas máximas | Evento de disyuntor en caso de incumplimiento |
| **Rastreo** | Un contexto de rastreo desde el primer salto hasta el último | ID de rastreo en cada intervalo |
| **Pares** | Solo agentes registrados con tarjetas verificadas y firmadas | Lista de permitidos de pares |
| **Terceros** | Un contrato nombra quién responde por un agente remoto | Referencia de cláusula en el registro |

Dois esforços de normalização abordam a parte difícil, transportando contexto de identidade e
autorização através de uma cadeia de chamadas. O rascunho Transaction Tokens do grupo de trabalho
OAuth (revisão 11, 30 Jul 2026, aguardando a sua redação) foi concebido "para manter e propagar
identidade de utilizador, identidade de carga de trabalho e contexto de autorização ao longo da
Cadeia de Chamadas dentro de um domínio de confiança" [24]; o grupo de trabalho WIMSE do IETF
(Workload Identity in Multi System Environments) abrange identidade de carga de trabalho entre
sistemas [25]. Ambos estão inacabados a partir de 2026-09-24. Até se resolverem, a tabela acima é o
contrato, aplicado em cada gateway que controla. Para agentes de terceiros, as cláusulas em
[contratos e licenças](/resources/contracts) são a outra metade.

## Prompts como configuración bajo control de cambios

El comportamiento de un agente se establece por su modelo, su prompt del sistema, sus descripciones
de herramientas y su paquete de política. Cambia cualquiera y el comportamiento cambia, sin ningún
cambio de código en absoluto. Así que trata cada uno como configuración bajo control de cambios,
como código de infraestructura:

1. **Versiona y hazlo tuyo.** Los prompts viven en el repositorio, con un propietario nombrado y dos
   revisores.
2. **Hazle hash en todas partes.** El registro registra el hash, y también lo hace cada rastreo: las
   convenciones de OpenTelemetry llevan `gen_ai.agent.version`} exactamente para esto [26]}.
3. **Controle-a.** Toda a alteração executa a suite de regressão (sucesso da tarefa, resistência a
   injeção, verificações de trajetória) no [Eval Gate in CI](/patterns/eval-gate-in-ci); uma falha
   bloqueia a alteração.
4. **Implante-a e reverta-a.** Canário a alteração, como em
   [progressive delivery](/bok/governing-deployment#progressive-delivery-as-a-control), e mantenha o
   hash anterior pronto para restaurar.
5. **Questione se a finalidade mudou.** Um prompt que muda para o que o sistema é pode ser uma
   [modificação substancial](/bok/governing-development#substantial-modification) e, sob
   [Artigo 25](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider), pode tornar o
   responsável pela implantação o prestador.

Un prompt del sistema es configuración, no un secreto y no un control. La lista OWASP de 2026
renombró la fuga del prompt del sistema a **Hidden Context Exposure** (`LLM08:2026`}) y aconseja que
«Los profesionales deben diseñar bajo el supuesto de que el contexto oculto es descubrible»: sin
credenciales en él, y sin depender de él «como un límite de seguridad para autorización, separación
de privilegios, aplicación de políticas o filtrado de contenido» [18]}. ATLAS enumera tanto «Extract
LLM System Prompt» (`AML.T0056`}) como «Modify AI Agent Configuration» (`AML.T0081`}) [10]}.
Cualquier cosa que deba mantenerse va en la puerta.

> **Exemplo (ilustrativo)** Un manifiesto de prompt que la tubería se niega a desplegar a menos que
> la ejecución de eval que nombra haya pasado.

```yaml
# prompt manifest (illustrative)
agent: refunds-agent
artefact: system_prompt
version: 2026-09-22.1
sha256: "9f2c...e41"
owner: support-platform
reviewers: [product-owner, ai-governance-engineer]
eval_run: evals/refunds-agent/2026-09-22-1842   # must be green
rollout: { strategy: canary, share: 5%, hold_hours: 48 }
rollback_to: 2026-09-10.3
changes_intended_purpose: false
```

> **Antipadrão** Editar el prompt del sistema de producción en una consola de proveedor para
> arreglar una queja. El comportamiento cambia, el registro y los rastreos aún nombran la versión
> anterior, y el próximo incidente reproduce una configuración que nunca se ejecutó.

## Incidentes de agentes y telemetría

### Una taxonomía de incidentes de agentes

A Partnership on AI define a capacidade que os agentes mais precisam: "Real-time failure detection
is the use of automated monitoring systems that track agent behavior as it unfolds, flag anomalies,
and either halt execution or escalate to human oversight" [15]. A taxonomia abaixo estende os
[modos de falha específicos de IA](/bok/incidents#ai-specific-failure-modes) do capítulo 17 para
agentes; a escala de severidade e os relógios de comunicação são os que
[o capítulo 17 estabelece](/bok/incidents#a-severity-scale-mapped-to-the-clocks).

| Clase | Cómo se ve | Señal de detección | Primeira contenção | IDs |
|---|---|---|---|---|
| **Secuestro de objetivo** | Las instrucciones en un documento redirigen la tarea | Llamadas de herramientas no relacionadas con el propósito de la tarea | Pausa la tarea; pone en cuarentena la fuente | `ASI01`; `AML.T0051.001` |
| **Uso indevido de ferramenta** | Una herramienta permitida utilizada para efecto dañino | Parámetros fuera del perfil del registro | Estrecha el alcance; activa el disyuntor | `ASI02`; `AML.T0053` |
| **Abuso de privilegios** | O agente utiliza autoridade além da sua tarefa | Falhas de audiência ou âmbito | Revogar a identidade | `ASI03`; `AML.T0098` |
| **Compromisso da cadeia de fornecimento** | Uma definição de ferramenta muda após admissão | Incompatibilidade de hash de definição | Remover o servidor das listas de permissão | `ASI04`; `AML.T0110` |
| **Execução de código inesperada** | O código gerado é executado fora da sandbox | Violação de sandbox | Terminar o processo; revogar | `ASI05`; `AML.T0112.000` |
| **Envenenamento de memória** | Um "facto" injetado persiste entre sessões | Escritas de memória de fontes não fidedignas | Congelar e reverter o armazenamento | `ASI06`; `AML.T0080` |
| **Falsificação entre agentes** | Um agente não registado responde como um par | Identidade desconhecida; cartão não assinado | Bloquear o par | `ASI07`; `AML.T0118` |
| **Cascata** | O erro de um agente amplifica-se através de outros | Falhas correlacionadas | Quebrar a cadeia no componente partilhado | `ASI08` |
| **Exploração de confiança** | Um resumo enganoso vence uma aprovação | Incompatibilidade entre resumo e chamada | Mostrar chamadas brutas; rever aprovações anteriores | `ASI09`; `AML.T0067` |
| **Descontrolo ou rogue** | Atividade fora do âmbito, após expiração ou além do orçamento | Chamadas após expiração; pico de despesa | Revogar; verificar que a paragem se manteve | `ASI10`; `AML.T0034.002` |
| **Exfiltração através de uma ferramenta** | Dados codificados numa escrita legítima | Saída para um destino desconhecido | Bloquear saída; ativar o disjuntor | `ASI02`; `AML.T0086` |

### Telemetria com as convenções GenAI do OpenTelemetry

As convenções semânticas de IA generativa do OpenTelemetry vivem agora no seu próprio repositório e
têm o estado **Development**, pelo que os nomes ainda podem mudar [26]. Definem operações para
`create_agent`, `invoke_agent`, `invoke_workflow`, `plan`, `execute_tool` e operações de memória
como `search_memory` e `update_memory`. Um span de ferramenta é nomeado
`execute_tool {gen_ai.tool.name}`; `gen_ai.tool.name` é obrigatório, `gen_ai.tool.call.id`
recomendado, e os argumentos e resultado da chamada são opcionais. Os spans de agente transportam
`gen_ai.agent.id`, `gen_ai.agent.name` e `gen_ai.agent.version`, e uma convenção separada cobre MCP
(`mcp.method.name`, `mcp.session.id`) [26].

A governação necessita de campos que as convenções ainda não definem (ID de registo, identidade de
carga de trabalho, veredicto de política, ID de aprovação, cadeia de delegação): adicione-os no seu
próprio espaço de nomes e mapeie-os mais tarde. Ativar a captura de argumentos e resultado pode
capturar dados pessoais, pelo que necessita das suas próprias regras de retenção e acesso. E os
registos são evidência: sistemas de risco elevado devem registar eventos ao longo da sua vida útil
(`Art. 12`), e os responsáveis pela implantação devem manter os registos sob o seu controlo durante
pelo menos seis meses (`Art. 26(6)`) [5]. O
[registo de incidente](/bok/incidents#the-incident-record) do capítulo 17 é onde o rastreio termina.

## Ameaças mapeadas para controlos

As duas listas OWASP dividem o terreno. A lista LLM de 2026, publicada em 3 de agosto de 2026, diz
que "é proprietária do risco quando o modelo é um componente dentro da sua aplicação"; uma vez que o
modelo "se torna um ator, com ferramentas que pode chamar, memória que transporta entre sessões e
consequências que coloca em movimento a jusante, o risco move-se para o OWASP Agentic Top 10", e
Excessive Agency subiu para terceiro (`LLM03:2026`) [18]. A tabela mapeia cada ameaça agentic para
entradas LLM relacionadas, técnicas ATLAS de exemplo da versão de dados de 2026-09 [10], um controlo
e o padrão que o implementa.

| Ameaça agentic [1] | LLM 2026 relacionado [18] | Técnicas ATLAS de exemplo | Control | Padrão | Camada |
|---|---|---|---|---|---|
| `ASI01` Agent Goal Hijack | `LLM01` Prompt Injection | `AML.T0051` LLM Prompt Injection | Proveniência de instrução; pontos de verificação antes de escritas; avaliações de trajetória | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI02` Tool Misuse and Exploitation | `LLM03` Excessive Agency; `LLM06` Unbounded Consumption | `AML.T0053` AI Agent Tool Invocation; `AML.T0086` | Lista de permissão de ferramentas; taxa por ferramenta, saída e orçamentos | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI03` Identity and Privilege Abuse | `LLM03` Excessive Agency | `AML.T0083`; `AML.T0098` AI Agent Tool Credential Harvesting | Identidade de carga de trabalho; tokens delegados de curta duração; verificações de audiência | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI04` Agentic Supply Chain Vulnerabilities | `LLM04` Supply Chain | `AML.T0110` AI Agent Tool Poisoning | Admissão de servidor; fixação de definição | [AIBOM](/patterns/aibom) | 02 |
| `ASI05` Unexpected Code Execution (RCE) | `LLM10` Improper Output Handling | `AML.T0112.000` Local AI Agent | Execução em sandbox; negar por defeito | [Runtime Guardrail](/patterns/runtime-guardrail) | 04 |
| `ASI06` Memory & Context Poisoning | `LLM05` Data and Model Poisoning; `LLM09` Vector and Embedding Weaknesses | `AML.T0080` AI Agent Context Poisoning | Porta de escrita de memória; espaços de nomes; reversão | [Runtime Guardrail](/patterns/runtime-guardrail) | 03 · 04 |
| `ASI07` Insecure Inter-Agent Communication | Nenhum | `AML.T0118` Autonomous AI Agent Communication | Autenticação mútua; Agent Cards assinados; lista de permissão de pares | [Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials) | 04 |
| `ASI08` Cascading Failures | `LLM06` Unbounded Consumption | `AML.T0034.002` Agentic Resource Consumption | Limites de profundidade e fan-out; disjuntores por agente | [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) | 04 |
| `ASI09` Human-Agent Trust Exploitation | `LLM07` Misinformation | `AML.T0067` LLM Trusted Output Components Manipulation | Aprovações de chamada bruta; métricas de supervisão | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) | 04 · 05 |
| `ASI10` Rogue Agents | `LLM03` Excessive Agency | `AML.T0103` Deploy AI Agent | Registo com expiração; descoberta; kill switch testado | [Agent Registry](/patterns/agent-registry); [Shadow-AI Discovery](/patterns/shadow-ai-discovery) | 02 · 04 |

`LLM02:2026` Sensitive Information Disclosure chega ao filtro de saída e `LLM08:2026` Hidden Context
Exposure no tratamento de prompts. Utilize os IDs ATLAS para etiquetar casos de teste na
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite), para que uma descoberta rastreie
desde a técnica até ao controlo até à avaliação que agora a protege. A
[ponte de ameaças](/resources/threats) do site transporta as mesmas linhas que os dados. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Estruturas escritas para agentes

Cinco organismos publicaram orientações específicas para agentes, e o capítulo 08 já coloca três
delas lado a lado na sua [tabela de controlo de agentes](/bok/regulatory-map#china). O seu estado em
2026-09-24:

| Estrutura | Estado | O que acrescenta |
|---|---|---|
| **NIST AI Agent Standards Initiative** (CAISI) | Lançada em 17 de fevereiro de 2026; três pilares: normas lideradas pela indústria, protocolos abertos, investigação sobre segurança e identidade de agentes [27] | Um RFI sobre segurança de agentes de IA e o documento de conceito do NCCoE sobre identidade e autorização de agentes [27][8] |
| **CSA Agentic Trust Framework** e **AARM** | ATF v1, publicado em fevereiro de 2026 sob CC BY 4.0 [4]; AARM de um grupo de trabalho da CSA [16]; ambos nomeados no programa de plano de controlo agentic da CSA de abril de 2026 [28] | Zero trust para agentes com níveis de autonomia conquistados (ATF); requisitos de interceção em tempo de execução (AARM) |
| **IMDA Model AI Governance Framework for Agentic AI** | Lançado em 22 de janeiro de 2026 [29]; versão 1.5 publicada em 20 de maio de 2026 [3] | Quatro dimensões: limitar riscos antecipadamente, responsabilizar humanos, controlos técnicos, responsabilidade do utilizador final |
| **TC260 AI Safety Governance Framework 3.0, Appendix 2** | Voluntário; publicado em 14 de setembro de 2026 [6] | Identidade por modo de decisão, registos de aprovação à prova de manipulação, isolamento de memória, desativação |
| **OWASP Agent Control Standard** | Doado ao OWASP GenAI Security Project, anunciado em 1 de setembro de 2026; repositório na versão 0.1.2 [17] | Um contrato de interface entre um anfitrião de agente e um agente guardião |

O mapa regulatório também lista um suplemento de controlo agentic AICM proposto da CSA. Este
capítulo não conseguiu corresponder a um documento primário da CSA em 2026-09-24, pelo que o trate
como não confirmado (verifique).

Lado a lado, convergem numa lista curta: uma identidade única por agente, privilégio mínimo que
expira, pontos de verificação em ações irreversíveis, interceção antes da execução, uma paragem que
funciona num agente, memória isolada e registos completos. Singapura acrescenta responsabilidade do
utilizador final, a CSA autonomia conquistada, TC260 desativação. Nenhuma confere conformidade; são
fontes de controlos e vocabulário.

## Ganchos do Regulamento da IA da UE para agentes

O Regulamento da IA não define "agente". Um agente é um sistema de IA, classificado pela sua
finalidade prevista como qualquer outro: um agente que avalia candidatos a emprego é de risco
elevado através do Anexo III independentemente da sua arquitetura, e um assistente de agendamento
não é. O capítulo 18 tem os
[requisitos de risco elevado](/bok/eu-ai-act#high-risk-requirements-articles-8-to-15) e os
[deveres do responsável pela implantação](/bok/eu-ai-act#deployer-duties-article-26) na íntegra. As
disposições abaixo são onde os controlos de agentes produzem a evidência; o registo de obrigações dá
a cada um a sua própria página, com as suas datas, evidência e correspondência:
[Art. 12](/obligations/aige-obl-euaia-art12), [Art. 14](/obligations/aige-obl-euaia-art14),
[Art. 15](/obligations/aige-obl-euaia-art15), [Art. 25](/obligations/aige-obl-euaia-art25),
[Art. 26](/obligations/aige-obl-euaia-art26) e [Art. 50](/obligations/aige-obl-euaia-art50).

| Disposição | O que pergunta | Artefato de agente | Responsável pelo dever |
|---|---|---|---|
| `Art. 12` | Registo automático de eventos ao longo da vida útil, para identificar risco, apoiar acompanhamento pós-comercialização e monitorizar operação [5] | Rastreios com identidade, chamadas de ferramentas, veredictos e aprovações | Prestador |
| `Art. 14(3)`–`(4)` | Supervisão comensurável com o nível de autonomia; consciência de viés de automação; substituição; paragem [5] | Nível de autonomia; pontos de verificação; aprovações de chamada bruta; kill switch | O prestador projeta; o responsável pela implantação opera |
| `Art. 15(4)` | Resiliência; reduzir ciclos de retroalimentação em sistemas que continuam a aprender [5] | Porta de escrita de memória; avaliações de memória; reversão | Prestador |
| `Art. 15(5)` | Resiliência contra tentativas de alterar uso, saídas ou desempenho, incluindo envenenamento e entradas adversariais [5] | Guardrails; admissão de servidor; red team etiquetado com IDs ATLAS | Prestador |
| `Art. 25` | Um responsável pela implantação que modifica substancialmente um sistema de risco elevado, ou muda a finalidade prevista de um sistema para que se torne de risco elevado, torna-se seu prestador [5] | Revisão de mudança de prompts e ferramentas com uma verificação de finalidade | Responsável pela implantação |
| `Art. 26(1)`–`(2)`, `(5)`–`(6)` | Utilizar de acordo com as instruções; supervisores competentes com autoridade; monitorizar e suspender; manter registos durante pelo menos seis meses [5] | Lista de aprovadores; disjuntor; retenção de registos | Responsável pela implantação |
| `Art. 50(1)` | As pessoas são informadas de que estão a interagir com um sistema de IA a menos que isso seja óbvio; aplica-se a partir de 2 de agosto de 2026 [5] | Divulgação nas mensagens, chamadas e conversas que um agente envia | Prestador |
| `Arts. 53`, `55` | Documentação para prestadores a jusante; avaliação de risco sistémico para os maiores modelos [5] | A documentação do prestador como entrada de due-diligence; avaliações agentic no ficheiro do fornecedor | Prestador de IA de finalidade geral |

O Código de Prática GPAI torna a ligação agentic explícita para prestadores de modelos com risco
sistémico. As suas fontes de risco sistémico incluem "capacidades para operar autonomamente" e
"capacidades para utilizar ferramentas, incluindo 'computer use'", e entre as funcionalidades
"acesso a ferramentas (incluindo outros modelos/sistemas de IA)" e o "nível de supervisão humana
(por exemplo, grau de autonomia do modelo)"; os seus riscos sistémicos especificados incluem
**perda de controlo**, definida como "Riscos de os humanos perderem a capacidade de dirigir,
modificar ou desligar de forma fiável um modelo" [23]. Um responsável pela implantação deve
perguntar como o prestador avaliou autonomia e utilização de ferramentas na
[porta de due-diligence](/patterns/vendor-model-due-diligence-gate); o capítulo 18 cobre
[os deveres GPAI](/bok/eu-ai-act#general-purpose-ai-models). O Código é uma ferramenta voluntária.
Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## O que pode fazer esta semana

1. **Encontre os seus agentes.** Execute uma varredura de descoberta que inclua agentes de
   codificação e configurações de servidor MCP local, e registe o que encontra com um proprietário,
   um nível de autonomia e uma expiração.
2. **Retire uma chave estática.** Mova um agente para uma identidade de carga de trabalho de curta
   duração, e confirme que os servidores MCP que chama rejeitam tokens emitidos para outra
   audiência.
3. **Escreve uma lista de permissões como política.** Nega por defeito, com hashes de definição,
   classes de operação e um ponto de verificação em cada chamada de pagamento, eliminação, envio e
   execução.
4. **Testa a paragem.** Dispara o disjuntor num agente, mede o tempo até à paragem e confirma que
   nenhuma chamada ou escrita ocorreu depois.
5. **Versiona a instrução do sistema.** Coloca-a no repositório atrás de um eval gate e regista o
   seu hash no registo e em cada rastreio.

**Correspondências:** Regulamento da IA Art. 12, 14(3)–(4), 15(4)–(5), 25, 26(1)–(2), 26(5)–(6),
50(1), 53, 55 · GPAI Code of Practice, Safety and Security (Appendix 1.3, 1.4) · ISO/IEC 42001
(Annex A.6, A.9) · NIST AI RMF (Manage 2.4) · NIST AI Agent Standards Initiative · OWASP Agentic
ASI01–ASI10 · OWASP LLM01, LLM03, LLM06, LLM08:2026 · MITRE ATLAS · IMDA Model AI Governance
Framework for Agentic AI · TC260 Framework 3.0 Appendix 2 · Layer 02 Inventory & Transparency ·
Layer 04 Runtime Controls & Observability · Layer 05 Assurance & Continuous Compliance. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] OWASP Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation, per-tool least-privilege profiles, auto-approved ping tool used for DNS exfiltration; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; "Least-Agency"). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[2] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; five levels by user role: operator, collaborator, consultant, approver, observer; autonomy as a design decision separate from capability). Knight First Amendment Institute at Columbia University / arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[3] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20; four levels of human involvement; agent identity unique, cryptographically verifiable, accounted for, differentiated by capacity, catalogued and centrally managed; authorisations scoped, time- or session-bound, non-transferable, bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals contextual and digestible; human approval enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[4] Agentic Trust Framework, v1 (zero-trust governance for AI agents; five elements: identity, behaviour, data governance, segmentation, incident response; autonomy tiers Intern, Junior, Senior, Principal; promotion criteria; CC BY 4.0; released February 2026). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27 as amended by Regulation (EU) 2026/1744: Art. 12 record-keeping; Art. 14(3)–(4) human oversight commensurate with risks, level of autonomy and context of use, automation bias, override, "stop" button; Art. 15(4)–(5) robustness, feedback loops, cybersecurity; Art. 25 responsibilities along the value chain; Art. 26(1)–(2), (5)–(6) deployer obligations; Art. 50(1) transparency for systems interacting with natural persons; Arts. 53 and 55 GPAI providers; Art. 113 application dates as amended (Annex III high-risk from 2 December 2027, Annex I from 2 August 2028). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[6] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), Appendix 2 agentic AI risk management (II.2 unique identity and minimum permissions by decision mode, credentials revoked at task end; II.3 human control checkpoints, tamper-proof approval logs, deny by default when approval fails or no rule exists; II.5 execution limits, memory retention and isolation, no credentials in memory; II.7 decommissioning). TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[7] Model Context Protocol, Security Best Practices, version 2026-07-28 (confused deputy; token passthrough "explicitly forbidden"; SSRF; state handle hijacking; local MCP server compromise, consent and sandboxing; scope minimisation and common mistakes). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[8] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"; non-repudiation, tamper-proof logging). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[9] SPIFFE overview (Secure Production Identity Framework for Everyone; SPIFFE ID; short-lived SVIDs as X.509 or JWT delivered and rotated through the Workload API; SPIRE reference implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[10] MITRE ATLAS data, release v2026.09 (agent techniques incl. AML.T0034.002 Agentic Resource Consumption, AML.T0051 LLM Prompt Injection, AML.T0053 AI Agent Tool Invocation, AML.T0056 Extract LLM System Prompt, AML.T0067 LLM Trusted Output Components Manipulation, AML.T0080 AI Agent Context Poisoning (.000 Memory, .001 Thread), AML.T0081 Modify AI Agent Configuration, AML.T0083 Credentials from AI Agent Configuration, AML.T0086 Exfiltration via AI Agent Tool Invocation, AML.T0098 AI Agent Tool Credential Harvesting, AML.T0099 AI Agent Tool Data Poisoning, AML.T0101 Data Destruction via AI Agent Tool Invocation, AML.T0103 Deploy AI Agent, AML.T0110 AI Agent Tool Poisoning, AML.T0112.000 Local AI Agent, AML.T0118 Autonomous AI Agent Communication). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[11] RFC 8693, OAuth 2.0 Token Exchange (M. Jones, A. Nadalin, B. Campbell, J. Bradley, C. Mortimore; impersonation versus delegation semantics; "act" actor claim and nested actors; "may_act" claim). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[12] Model Context Protocol specification, version 2026-07-28, Authorization (optional; OAuth 2.1 resource server; RFC 9728 Protected Resource Metadata; Client ID Metadata Documents SHOULD, Dynamic Client Registration deprecated; RFC 8707 resource parameter; audience validation; no other tokens accepted or transited; RFC 9207 issuer validation; scope challenges and step-up). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization (verified: primary)
[13] "Authorization changes in the 2026-07-28 specification" (RFC 9207 issuer validation; DCR "formally deprecated in favor of CIMD"; client credentials bound to the issuer that minted them; formal deprecation policy with a twelve-month minimum window). Model Context Protocol blog. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[14] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group; a URL used as client_id that points to the client metadata). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[15] Prioritizing Real-Time Failure Detection in AI Agents (lead author Madhulika Srikumar; stakes, reversibility and affordances; definition of real-time failure detection). Partnership on AI. 2025-09-11. https://partnershiponai.org/resource/prioritizing-real-time-failure-detection-in-ai-agents/ (verified: primary)
[16] Autonomous Action Runtime Management (AARM) specification (system category specification for agentic runtime security; pre-execution interception with identity binding; policy evaluation before execution; core requirements R1–R6; CSA working group). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[17] Agent Control Standard (ACS) (wire specification letting a guardian agent permit, deny or modify an agent's action before it happens, over an authenticated channel, with an audit trail; reference guardian failure posture "proceed" unless overridden; README discloses that the reference guardian lacks the required HMAC-SHA256 envelope signature, open issue #70; repository github.com/GenAI-Security-Project/agent-control-standard at version 0.1.2; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/resource/agent-control-standard-acs/ (verified: primary)
[18] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01 Prompt Injection incl. memory persistence; LLM02 Sensitive Information Disclosure; LLM03 Excessive Agency; LLM04 Supply Chain; LLM05 Data and Model Poisoning; LLM06 Unbounded Consumption; LLM07 Misinformation; LLM08 Hidden Context Exposure, formerly System Prompt Leakage; LLM09 Vector and Embedding Weaknesses; LLM10 Improper Output Handling; boundary with the Agentic Top 10 stated in the preface; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[19] AI Risk Management Framework 1.0, NIST AI 100-1 (MANAGE 2.4: mechanisms to supersede, disengage or deactivate AI systems inconsistent with intended use). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[20] Agent2Agent (A2A) Protocol Specification, v1.0 (releases v1.0.0 on 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, optional JWS signature over JCS-canonicalised JSON; security schemes; servers MUST authenticate every incoming request; authorisation implementation-specific; in-task authorisation via TASK_STATE_AUTH_REQUIRED and its unspecified scope and revocation semantics; Cancel Task not guaranteed). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[21] Regulation (EU) 2016/679 (GDPR) of 27 April 2016: Art. 5(1)(c) data minimisation and 5(1)(e) storage limitation; Art. 17 right to erasure. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[22] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP, goose and AGENTS.md). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[23] General-Purpose AI Code of Practice, Safety and Security chapter, Appendix 1.3 sources of systemic risk (capabilities to operate autonomously and to use tools; propensities incl. colluding and mis-coordination with other AI systems; affordances incl. access to tools and level of human oversight) and Appendix 1.4 specified systemic risks (incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[24] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group; WG state "Waiting for Write-Up"; propagation of user identity, workload identity and authorisation context through a call chain within a trust domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[25] Workload Identity in Multi System Environments (WIMSE) working group, charter. IETF. 2026. https://datatracker.ietf.org/wg/wimse/about/ (verified: primary)
[26] OpenTelemetry semantic conventions for generative AI (status Development; agent spans create_agent, invoke_agent, invoke_workflow, plan; execute_tool span and gen_ai.tool.* attributes, arguments and results opt-in; memory operations; gen_ai.agent.id, .name, .version; MCP conventions mcp.method.name, mcp.session.id). OpenTelemetry. 2026. https://github.com/open-telemetry/semantic-conventions-genai/tree/main/docs/gen-ai (verified: primary)
[27] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI with ITL; three pillars; RFI on AI agent security; AI agent identity and authorization concept paper; listening sessions). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[28] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (Agentic Trust Framework; Autonomous Action Runtime Management framework; Catastrophic Risk Annex; STAR for AI). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[29] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[30] WIT-SVID (SPIFFE specification; Stability: Incubating; a sub-profile of the Workload Identity Token of the IETF WIMSE working group). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-specs/wit-svid/ (verified: primary)
