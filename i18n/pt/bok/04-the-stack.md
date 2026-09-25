---
lang: pt
source: bok/04-the-stack.md
sourceHash: "70613b3c9beac9bd4322bd76445b643bbf981c8dc8701bbc0ac1f82996da262e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 04. O stack (cinco camadas)

> A arquitetura de referência da engenharia de governação da IA: cinco camadas que respondem às três
> questões, onde a evidência é produzida na base e provada no topo.

## Como ler o stack

O stack não é um organograma e não é uma escada de maturidade. É uma ordem de construção. Cada
camada produz um artefato que a camada acima consome, de modo que a governação deixa de ser um
conjunto de documentos paralelos e se torna um único sistema com um caminho de dados da política à
prova.

Leia-o ao longo de uma espinha: **Política → Inventário → Avaliações → Runtime → Garantia**. Escreve
a regra como código (camada 01). Não consegue impor uma regra contra um sistema que não consegue
ver, portanto inventaria o que está em execução (camada 02). Não consegue afirmar que um sistema
cumpre a regra sem um teste que possa falhar, portanto executa avaliações como evidência (camada
03). As regras e testes degradam-se no momento em que o sistema muda, portanto mantém a linha em
runtime (camada 04). E nada disso vale a pena para um auditor a menos que a evidência seja emitida,
assinada e consultável, portanto fecha com garantia contínua (camada 05).

**A evidência flui para cima.** Um veredicto de política da camada 01, uma entrada de registo da
camada 02, um resultado de avaliação da camada 03 e uma decisão de guardrail da camada 04 não são
quatro registos desconectados. Cada um é um artefato estruturado com um carimbo de data/hora e um
proprietário, e a camada 05 é onde são agregados em evidência pronta para auditoria. O teste de todo
o stack é o teste da Tese: como Ayoub Fandi diz, um painel verde sobre um controlo quebrado é
"teatro com passos extra" [1]. O stack é a tubagem que torna o painel significativo: cada célula
verde rastreia até um controlo em execução e a evidência que emitiu.

As cinco camadas, nomeadas exatamente e em ordem, são:
**01 Governação como Código · 02 Inventário & Transparência · 03 Avaliações & Red Teaming como Evidência · 04 Controlos de Runtime & Observabilidade · 05 Garantia & Conformidade Contínua.**
Mapeiam para as três questões que a disciplina deve responder em qualquer momento. A camada 02
responde *que IA está em execução*. As camadas 01 e 04 respondem *o que lhe é permitido fazer*: a
camada 01 escreve o limite como código e a camada 04 impõe-o na chamada ao vivo, sob a identidade e
âmbito próprios do agente. As camadas 03 e 05 respondem *que evidência o prova*. As ameaças contra
as quais os controlos são construídos (sequestro de objetivo, utilização indevida de ferramentas,
abuso de identidade e privilégio de agente, agentes desonestos) são catalogadas no Top 10 OWASP para
Aplicações Agentic 2026 [2].

Três destas camadas são herdadas, não inventadas. Governação como Código (01), Inventário &
Transparência (02) e Garantia & Conformidade Contínua (05) vêm quase inalteradas da engenharia GRC:
política como código, o inventário de ativos e a evidência legível por máquina são a sua prática
estabelecida, e os registos específicos de IA (o registro de agentes, o AIBOM) estendem-nos em vez
de os substituir. As camadas 03 e 04 (avaliações e red teaming como controlos, e identidade de
agente e controlo de runtime) são o que a IA força a disciplina a adicionar, porque um modelo cujo
comportamento deve ser testado e um ator autónomo que age sob autoridade delegada não têm análogo na
GRC clássica. O novo trabalho concentra-se aí; o resto é uma especialização de um método que já
funciona.

Cada ferramenta nomeada abaixo é um exemplo de uma categoria, não uma recomendação. As categorias
são a substância; as marcas são ilustrativas e intercambiáveis.

## Camada 01: Governação como Código

**O que prova.** Que uma regra de governação existe como um artefato executável, não um parágrafo, e
que avaliou uma mudança específica e devolveu uma decisão. A prova é um veredicto de política ligado
a um commit, um pull request ou um deploy, legível por máquina e reproduzível.

**Os artefatos.** Um engenheiro de governação da IA entrega política como código: regras escritas
numa linguagem de política que um pipeline avalia. Os artefatos típicos são uma biblioteca de
políticas sob controlo de versão, um conjunto de mapeamentos que ligam cada política aos frameworks
que serve, e a tubagem CI/CD que executa a política na porta certa. Uma política nesta camada é
pequena e testável: "inferência para esta classe de dados não pode rotear fora da região permitida",
"nenhum modelo faz deploy sem um proprietário registado e uma porta de avaliação aprovada", "um
agente não pode receber um âmbito de ferramenta que não declarou". Cada regra carrega uma declaração
legível por humanos da intenção como documentação, mas a versão imposta é o código.

**Ferramentas e normas de referência (ilustrativas).** Os motores de política expressam lógica
allow/deny. `OPA/Rego` é a predefinição geral para política não-autorização (residência de dados,
gating de deploy, restrições de configuração), enquanto `Cedar` é mais estreito: uma linguagem de
autorização, mais forte para "pode este principal tomar esta ação neste recurso?" e um ajuste pobre
para política que não é uma decisão de acesso. Escolha pela forma da regra, não pela marca. Para
além de motores de uso geral, uma abordagem proposta é Policy Cards: uma proposta de investigação
para um artefato legível por máquina, camada de deployment, que codifica restrições operacionais,
regulatórias e éticas para um agente e as liga a pipelines de imposição e auditoria [3]; é um único
preprint, promissor mas ainda não uma norma, e o ponto que faz, que a regra deve viajar com o agente
como dados, permanece qualquer que seja o formato que vença. Os mapeamentos referenciam as próprias
estruturas: ISO/IEC 42001 (o sistema de gestão de IA), NIST AI RMF e as suas quatro funções (Govern,
Map, Measure, Manage [4]), o Regulamento da IA, e a CSA AI Controls Matrix (AICM) v1.1, que oferece
247 objetivos de controlo em 18 domínios como um vocabulário de controlo para mapear contra [5]. Os
fornecedores são ilustrativos; as normas não.

**Definição de pronto.**

- Cada política existe como código num repositório, com um teste que prova que dispara numa entrada
  violadora e passa uma limpa.
- Cada política declara as cláusulas de framework para as quais mapeia, de modo que o mapeamento é
  gerado a partir do código, não mantido ao lado dele.
- Pelo menos uma política é executada pré-merge e bloqueia o merge em caso de falha; pelo menos uma
  é executada em deploy ou admissão e bloqueia o lançamento.
- Uma mudança a uma política é um diff revisável com um proprietário e uma data efetiva.
- O motor de política emite um veredicto estruturado (allow/deny, id de regra, hash de entrada,
  carimbo de data/hora) para cada avaliação.

**Anti-padrões.**

- A "biblioteca de políticas" que é uma pasta de documentos Word que ninguém consegue consultar,
  imposta por email e auto-atestada numa folha de cálculo.
- O mapeamento mantido como uma matriz de 300 linhas numa ferramenta separada, divergindo das
  políticas que afirma descrever: cobertura apresentada como controlo.

**Evidência para a próxima camada.** O veredicto de política é o primeiro artefato de evidência. Mas
um veredicto é apenas significativo contra um objeto conhecido: "negar deploy do modelo X" pressupõe
que o stack sabe que o modelo X existe, quem o possui e o que é. Esse objeto é o que a camada 02
fornece.

> **Na prática** Para `csa-01`, um assistente de atendimento ao cliente numa grande operadora de
> telecomunicações, uma regra de residência de dados escrita como `OPA/Rego` executava-se tanto em
> CI como na admissão e bloqueava qualquer implementação que encaminhasse a sua inferência fora da
> região permitida. O valor não estava na regra, mas no facto de a versão imposta emitir um
> veredicto que todos os engenheiros podiam ver antes da fusão.

**Correspondências:** Regulamento da IA Art. 9 (gestão de riscos) · ISO/IEC 42001 · NIST AI RMF
(Govern) · CSA AICM · OWASP Agentic ASI02/ASI03. Os mapeamentos são ilustrativos, não uma afirmação
de conformidade.

## Camada 02: Inventory & Transparency

**O que prova.** Que a organização sabe qual IA está em execução (quais modelos, sistemas e agentes
estão ativos, em que versão, de quem são proprietários), e que cada um tem a documentação de
transparência que uma obrigação exige. A prova é uma entrada no registo e os seus documentos
anexados, idealmente escritos por um pipeline de implementação em vez de digitados manualmente.

**Os artefatos.** O artefato central é o **registo de agentes**: o inventário consciente do tempo de
execução de cada modelo, serviço e agente, cada um com um proprietário, um âmbito e um estado. À sua
volta situam-se os documentos de transparência (fichas de modelo e fichas de dados) e o **AIBOM**, a
lista de materiais para um sistema de IA. As referências FRIA e AIPD pendem da entrada do registo
para sistemas que as necessitam, pelo que o inventário é também o índice de qual sistema tem qual
avaliação de impacto.

**Ferramentas e normas de referência (ilustrativas).** Os registos variam desde suites de ITSM e
governação (por exemplo ServiceNow, Credo AI) até ferramentas de descoberta de agentes (por exemplo
Zenity) que encontram IA que o inventário não conhecia. O AIBOM tem formatos normalizados: CycloneDX
ML-BOM e o perfil AI SPDX 3.0, com o gerador OWASP AIBOM a produzir saída CycloneDX [6]. A distinção
de um SBOM clássico é importante: um AIBOM regista modelos, conjuntos de dados, pesos e a sua
proveniência, não apenas dependências de software. O registo é o objeto que as políticas da camada
01 avaliam e os controlos de tempo de execução da camada 04 se ligam; sem um caminho de dados de
tempo de execução a alimentá-lo, é uma folha de cálculo que era verdadeira no dia em que foi
editada.

**Definição de pronto.**

- Cada modelo, sistema e agente em produção tem uma entrada no registo com um proprietário, uma
  versão e um âmbito declarado; um artefato não registado não pode chegar à produção.
- O registo é alimentado pelo pipeline de implementação, não por entrada manual; uma nova
  implementação regista-se a si mesma.
- Cada sistema de risco elevado liga-se à sua ficha de modelo, ficha de dados e, quando necessário,
  à sua FRIA/AIPD.
- Um AIBOM é gerado na construção para cada sistema de IA e armazenado com a entrada do registo.
- Um mecanismo de descoberta reconcilia periodicamente o registo contra o que está realmente em
  execução e assinala desvio.

**Anti-padrões.**

- O inventário de modelo mantido manualmente que responde "o que está em execução?" corretamente no
  dia em que é editado e está errado dentro de uma semana.
- Documentos de transparência escritos uma vez no lançamento e nunca regenerados quando o modelo,
  prompt ou conjunto de dados muda: uma ficha de modelo descrevendo um modelo que já não existe.

**Evidência para a camada seguinte.** A entrada do registo nomeia o objeto sob teste. Uma avaliação
na camada 03 é executada *contra uma versão registada* e o seu resultado é arquivado *contra essa
entrada*, pelo que a pergunta "este modelo foi testado?" é respondida por uma junção, não uma
pesquisa. O AIBOM diz à camada de avaliação o que testar: qual modelo, quais conjuntos de dados,
quais afirmações de proveniência precisam de sondagem adversarial.

> **Na prática** Ligar o registo ao pipeline de implementação (para que `csa-01` se registasse a si
> mesmo, com um proprietário e um âmbito, no tempo de implementação) transformou "documentado" em
> "governado". A sua entrada no registo tornou-se uma consulta respondida a partir da produção, não
> a partir de um slide.

**Correspondências:** Regulamento da IA Art. 11 (documentação técnica), Art. 49/71 (registo e base
de dados da UE), Art. 50 (transparência) · ISO/IEC 42001 · NIST AI RMF (Map) · CSA AICM · OWASP
Agentic ASI10.

## Camada 03: Evals & Red Teaming as Evidence

**O que prova.** Que o modelo ou agente passou um teste definido cuja falha tem consequências. Esta
é a camada onde o princípio "dar a cada controlo dentes" se torna concreto para avaliações: um
benchmark que apenas informa um comité não é um controlo; uma avaliação ligada a um **eval gate**
que pode falhar a construção é. A prova é um resultado de avaliação estruturado: passar ou falhar
contra um limiar, versionado juntamente com o modelo que testou.

**Os artefatos.** Um engenheiro envia suites de avaliação e o gate que as executa. Três famílias
recorrem: avaliações de capacidade e qualidade (o sistema faz o seu trabalho: fundamentação,
regressão contra um conjunto dourado), avaliações adversariais e de red-team (resiste a jailbreaks,
injeção de prompts, uso indevido de ferramentas), e avaliações de limiar de segurança ligadas a uma
política da camada 01 (um limite de vazamento de PII, um piso de resistência a injeção). O gate é um
estágio do pipeline: se a avaliação cair abaixo do limiar acordado, o pipeline falha e a versão não
é enviada.

**Ferramentas e normas de referência (ilustrativas).** Estruturas de avaliação como Inspect (mantida
em nome do UK AI Security Institute [7]), promptfoo e DeepEval executam suites de capacidade e
regressão; Garak, Mindgard e Giskard executam sondagens adversariais e de vulnerabilidade; Ragas
cobre qualidade de recuperação aumentada. Os testes adversariais não são apenas uma boa prática: o
Código de Prática GPAI lista testes adversariais e red-teaming entre as abordagens de avaliação
esperadas de modelos GPAI com risco sistémico, embora o Código seja voluntário e limitado a esses
modelos [8]. O resultado da avaliação é o artefato de evidência que a camada 05 agregará, razão pela
qual deve ser legível por máquina, não uma captura de ecrã colada num slide.

**Definição de pronto.**

- Cada modelo ou agente tem uma suite de avaliação versionada no mesmo repositório e atualizada
  quando o sistema muda.
- Pelo menos uma avaliação adversarial e uma avaliação de capacidade executam em CI, com um limiar
  documentado.
- Uma avaliação falhada bloqueia a implementação; o gate tem dentes, não apenas um relatório.
- Cada execução de avaliação emite um resultado estruturado (id da suite, versão do modelo,
  pontuação, limiar, passar/falhar, timestamp) arquivado contra a entrada do registo.
- Os limiares rastreiam um modo de falha nomeado ou uma obrigação, não um número redondo escolhido
  para conforto, e a certeza que exigem segue o nível de risco (o capítulo 11 define a
  [certeza exigida por nível de risco](/bok/ai-defined#certainty-required-by-risk-tier); o capítulo
  14 dimensiona a suite para a
  [validade estatística das avaliações](/bok/governing-development#statistical-validity-of-evals)).

**Anti-padrões.**

- A avaliação única pré-lançamento cujos resultados são colados num slide e nunca re-executados
  quando o modelo ou os seus prompts mudam.
- O "conselho de revisão de risco" que classifica as descobertas baixa/média/alta mensalmente mas
  não tem mecanismo para parar um lançamento já agendado: recomendação sem consequência. A correção
  é um comité que decide qual código não pode enquanto os gates impõem a decisão
  ([o comité decide, os gates impõem](/bok/governance-program#the-committee-decides-the-gates-enforce),
  capítulo 12), com o apetite de risco
  [compilado em gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates)
  (capítulo 13).

**Evidência para a camada seguinte.** Uma avaliação prova que o sistema era seguro *no tempo de
teste*. O sistema depois encontra entradas que nenhuma avaliação antecipou. A camada 04 leva os
mesmos limiares para a produção como guardrails de tempo de execução, e o resultado da avaliação
torna-se a linha de base contra a qual a telemetria ao vivo é comparada. Uma queda na resistência a
injeção ao vivo contra a linha de base testada é um sinal, não uma surpresa.

> **Na prática** Uma suite de avaliação de red-team combinando Inspect e Garak executava em CI para
> `csa-01`; uma versão que deixasse cair a sua resistência a injeção abaixo do piso acordado falhava
> o pipeline até ser corrigida. A saída da avaliação, não a opinião de um revisor, era a evidência
> de garantia arquivada contra a versão do modelo.

**Correspondências:** Regulamento da IA Art. 15 (precisão, robustez, cibersegurança), Art. 55
(avaliação de risco sistémico GPAI) · ISO/IEC 42001 · NIST AI RMF (Measure) · CSA AICM · OWASP
Agentic ASI01/ASI02.

## Camada 04: Runtime Controls & Observability

**O que prova.** Que os controlos se mantêm enquanto o sistema atua, e que o seu comportamento é
observado. Políticas e avaliações são ponto-no-tempo; agentes atuam continuamente, em entradas que
ninguém reviu. Esta camada prova que um guardrail mediou uma chamada real, que um agente atuou sob a
sua própria identidade e âmbito, e que há uma forma testada de o parar. A prova é um fluxo de
decisões e rastreios de tempo de execução.

**Os artefatos.** Três grupos. Guardrails: filtros de entrada/saída, mediação de chamadas de
ferramentas, o ponto de imposição onde uma política da camada 01 dispara contra um pedido ao vivo.
Observabilidade: rastreio e monitorização que transformam o comportamento do agente num sinal de
controlo. Identidade de tempo de execução do agente: cada ator não humano com a sua própria
identidade de carga de trabalho, um âmbito limitado, e um **kill switch**, uma forma testada de
revogar acesso e parar um agente sem quebrar a frota. Registe e limite cada ator antes de atuar:
nenhum agente atua antes de ter uma identidade, um proprietário e um âmbito. Um **agente guardião**,
um agente cujo trabalho é rever, restringir ou parar outros agentes no tempo de execução, é uma
forma de construir o ponto de mediação; é ele próprio um agente, pelo que precisa da sua própria
identidade, âmbito e kill switch, e as suas decisões são evidência como a de qualquer outro
guardrail [16]. O capítulo 23 trata
[governação de agentes de IA](/bok/governing-agents#what-makes-an-agent-a-governance-object) de
ponta a ponta, incluindo
[identidade, delegação e autorização MCP para agentes](/bok/governing-agents#identity-and-short-lived-credentials).

**Ferramentas e normas de referência (ilustrativas).** Estruturas de guardrail como NVIDIA NeMo
Guardrails, Meta LlamaFirewall e Lakera aplicam políticas de entrada/saída e chamadas de
ferramentas; ferramentas de observabilidade como Langfuse e Arize Phoenix baseiam-se em
OpenTelemetry para rastrear execuções de agentes. A identidade do agente coloca duas questões
distintas que as ferramentas não devem permitir confundir. A primeira é **autenticação de canal**:
como um cliente se autentica num servidor de ferramentas num único salto. A especificação Model
Context Protocol de 2026-07-28 reforçou exatamente isto: descontinuando o Registo Dinâmico de
Clientes em favor de Documentos de Metadados de ID de Cliente e vinculando credenciais ao seu
emissor [9]. Isto reforça a ligação MCP; não é o modelo de identidade do agente. A segunda é
**identidade de carga de trabalho do agente**: uma identidade durável e atribuível que o agente
carrega em cada salto, ferramenta e protocolo, sob a qual as suas ações são registadas e o seu
acesso revogado. Esse é o trabalho de um sistema de identidade de carga de trabalho, como
SPIFFE/SPIRE ou identidades de agente de primeira classe de prestadores empresariais (por exemplo
Microsoft Entra Agent ID, Okta Agent SSO), não do MCP, que protege um canal. Confundir os dois deixa
um agente bem autenticado no salto MCP e ainda inattribuível em qualquer outro lugar. O NCCoE da
NIST expôs as questões abertas no seu documento conceptual de fevereiro de 2026 sobre identidade e
autorização de agentes de software e IA: como a identificação, autenticação e autorização se aplicam
para que cada agente seja "conhecido, confiável e devidamente governado", incluindo não-repúdio e
registo à prova de adulteração [10]. A Gartner espera que até 2029 mais de metade dos ataques
bem-sucedidos a agentes de IA explorarão fraquezas de controlo de acesso e injeção de prompts [11],
os modos de falha que esta camada existe para conter.

**Definição de pronto.**

- Cada agente executa sob a sua própria identidade com um âmbito declarado; nenhum agente partilha
  uma conta de serviço ou uma chave estática entre funções.
- Um guardrail medeia chamadas de ferramentas e entrada/saída para cada agente, aplicando o âmbito
  declarado no registo.
- Existe um kill switch e foi testado: revogar o acesso de um agente não quebra os outros.
- Cada execução de agente é rastreada, e os rastreios carregam a identidade do agente, as
  ferramentas chamadas e os vereditos de política que foram acionados.
- Os sinais de tempo de execução são comparados com a linha de base de avaliação da camada 03, e uma
  regressão levanta um alerta.

**Anti-padrões.**

- Uma frota de agentes partilhando uma chave de API e uma conta de serviço privilegiada: um
  incidente significa rodar um segredo e quebrar tudo, e a atribuição é impossível.
- Guardrails que registam mas nunca bloqueiam: observabilidade confundida com controlo, portanto o
  sistema observa-se a si mesmo falhar em alta resolução.

**Evidência para a camada seguinte.** Cada decisão de guardrail, rastreio e evento de identidade é
um registo com carimbo de data/hora e estruturado. A camada 05 não recolhe esta evidência novamente;
subscreve-a. O tempo de execução é onde a garantia contínua obtém a sua continuidade: a diferença
entre um atestado de que um controlo existia e evidência de que foi acionado, numa chamada
específica, num momento específico.

> **Na prática** `csa-01` recebeu uma identidade de carga de trabalho distinta com um proprietário e
> um âmbito declarado, assim como todos os outros agentes na operadora de telecomunicações; quando
> se comportou mal foi rastreado até à sua identidade e revogado sem tocar nos outros. O kill switch
> foi testado num calendário. Um kill switch não testado é uma afirmação, não um controlo.

**Correspondências:** Regulamento da IA Art. 14 (supervisão humana), Art. 15 (robustez,
cibersegurança), Art. 12 (registo) · ISO/IEC 42001 · NIST AI RMF (Manage) · CSA AICM · OWASP Agentic
ASI02/ASI03/ASI10.

## Camada 05: Garantia & Conformidade Contínua

**O que prova.** Que os controlos abaixo estão a funcionar, continuamente, e que a prova é legível
por máquina e pronta para auditoria. É aqui que a evidência deixa de ser um subproduto e se torna o
produto: a auditoria é uma consulta, não um projeto. A prova é um armazém de garantia ativo que
qualquer uma das camadas inferiores escreve e um auditor pode ler.

**Os artefatos.** Evidência legível por máquina num formato padrão; mapeamentos de estrutura gerados
a partir dessa evidência em vez de mantidos ao lado dela; e a tubagem de incidentes e relatórios que
transforma um sinal de tempo de execução numa obrigação cumprida no prazo. O formato organizador é
`OSCAL`. O seu substrato estável é o modelo nativo da NIST: uma camada de controlo (`catalog`,
`profile`), uma camada de implementação (`component-definition`, `system-security-plan`) e uma
camada de avaliação (`assessment-plan`, `assessment-results`, `POA&M`), com rastreabilidade de um
resultado de avaliação de volta ao controlo que testou [15]. Esse modelo é a parte em que se deve
construir; as adições específicas de IA no topo ainda estão a formar-se. Uma abordagem proposta (um
único pré-print de 2026, não uma norma) estende OSCAL com dezasseis extensões de propriedade para
fase de ciclo de vida, semântica de aplicação e rastreabilidade de risco, numa arquitetura de
conformidade como código de três camadas que gera resultados de avaliação OSCAL automaticamente
[12]. Trate-a como uma resposta inicial a uma lacuna real que os autores nomeiam bem: estruturas
"como o Regulamento da IA, ISO/IEC 42001 e NIST AI RMF especificam o que garantir mas não fornecem
um formato executável para como" [12]. A lacuna é o que a camada 05 fecha; os modelos de avaliação
OSCAL nativos fecham a maioria dela hoje, com ou sem as extensões.

**Ferramentas e normas de referência (ilustrativas).** A evidência é emitida como artefatos de
componente e avaliação OSCAL; suites de GRC e governação de IA (por exemplo Vanta, Drata, OneTrust;
watsonx.governance, Holistic AI, Saidot) agregam e apresentam-na. O relatório de incidentes mapeia
para Regulamento da IA Art. 73 (incidentes graves) e Art. 72 (acompanhamento pós-comercialização). A
partir de 2026-09-24 nenhuma norma harmonizada é citada no Jornal Oficial da UE [13], portanto um
certificado ISO/IEC 42001 suporta o sistema de gestão da qualidade do Art. 17 mas não o satisfaz por
si só, e não confere presunção de conformidade sob Art. 40 [17].

**Definição de pronto.**

- Os resultados de controlo das camadas 01–04 são emitidos como evidência legível por máquina (por
  exemplo OSCAL) com carimbos de data/hora e proprietários, continuamente.
- Os mapeamentos de estrutura são gerados a partir da evidência, portanto uma célula de mapeamento
  que fica verde aponta para um controlo que realmente foi acionado.
- A pergunta de um auditor é respondida por uma consulta ao armazém de evidência, não por um sprint
  de recolha de evidência.
- Um pipeline de incidente grave pode detetar, triagiar e reportar no prazo, com os prazos do Art.
  73 codificados, não lembrados (o capítulo 17 percorre
  [o ciclo de vida da resposta](/bok/incidents#the-response-lifecycle)).
- O armazém de garantia mede redução efetiva do risco (a taxa de modo de falha, o tempo para
  detetar, o raio de explosão), não cobertura de estrutura.

**Anti-padrões.**

- O ficheiro de atestado montado a semana antes de uma auditoria, descrevendo controlos como se
  imaginava serem, não como a produção se comportou.
- Uma "pontuação de conformidade" de uma plataforma fechada que não pode ser rastreada a um único
  controlo em execução, cujo caminho de dados para na importação de folha de cálculo.

**A evidência fecha o ciclo.** A garantia não é o topo de uma escada unidirecional. Uma queda numa
métrica ativa alimenta de volta a camada 03 como uma nova avaliação, a camada 01 como uma política
reforçada, e a camada 02 como uma bandeira de registo. A stack é um ciclo que acontece ser desenhado
como uma escada.

> **Na prática** As decisões de guardrail, resultados de avaliação e vereditos de política de
> `csa-01` transmitidos para um armazém de garantia com carimbos de data/hora, portanto o estado de
> um controlo era uma consulta ativa, não uma aprovação anual. Quando um auditor perguntou o que o
> seu controlo de residência de dados fez no segundo trimestre, a resposta foi um filtro sobre
> evidência emitida, produzido em minutos.

**Correspondências:** Regulamento da IA Art. 17 (gestão da qualidade), Art. 72 (acompanhamento
pós-comercialização), Art. 73 (relatório de incidente grave) · ISO/IEC 42001, ISO/IEC 42005 · NIST
AI RMF (Govern, Manage) · CSA AICM.

## Governação de dados em toda a stack

As cinco camadas governam modelos e agentes; são apenas tão sólidas quanto os dados subjacentes, e a
governação de dados não é uma camada mas um fio através de todas as cinco. Dados de treino,
conjuntos de ajuste fino, corpora de recuperação, prompts e saídas cada um carregam uma base legal,
uma proveniência, um limite de retenção e um conjunto de direitos, e cada um é um objeto que a stack
deve ser capaz de nomear. Na camada 02 isto é a **ficha de dados** e o registo de linhagem (de onde
um conjunto de dados veio, para que pode ser usado, quando deve ser apagado), anexado à entrada de
registo ao lado da ficha de modelo. Na camada 01 é política de retenção e residência como código,
com
[proteção de dados desde a conceção e tecnologias de melhoria de privacidade](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets)
(capítulo 19) onde dados pessoais estão envolvidos. Na camada 03 são testes de qualidade de dados e
enviesamento executados contra o conjunto, não assumidos dele, atrás de um
[portão de admissão de conjunto de dados](/bok/governing-development#data-for-training-and-testing)
(capítulo 14); o capítulo 16 estabelece
[os dados que precisa para testar enviesamento](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
O Regulamento da IA trata isto como um dever de primeira classe: o Artigo 10 requer conjuntos de
dados representativos, relevantes e verificados para sistemas de risco elevado, e o Artigo 4a
pós-Omnibus dá uma base legal estreita para processar dados de categorias especiais *para deteção de
enviesamento*, condicionado a pseudonimização e apagamento uma vez que o enviesamento é corrigido
(ver capítulo 08). O compromisso de engenharia é que um corpus RAG é governado como um modelo:
versionado, a sua proveniência e licença registadas no AIBOM, o seu snapshot ligado à avaliação que
testou o sistema nele, portanto "o que estava no corpus quando esta resposta foi produzida?" é uma
consulta, não um palpite. Prompts, passagens recuperadas e saídas em tempo de execução precisam das
mesmas regras
([governação de dados em tempo de inferência](/bok/governing-deployment#inference-time-data-governance),
capítulo 15). Dados sem ficha, sem linhagem e sem regra de retenção é o objeto não governado que
torna cada camada acima dele improvável.

## Desenhar supervisão humana (Artigo 14)

A supervisão humana é um controlo a ser engenheirado, não uma garantia a ser afirmada. O artigo 14
do Regulamento da IA da UE exige que os sistemas de risco elevado sejam concebidos de modo a que uma
pessoa possa *efetivamente* supervisioná-los (compreender o resultado, decidir contra ele e parar o
sistema), e a parte difícil é que a supervisão indiferenciada falha em ambas as direções. A revisão
humana de cada ação destrói o valor da automatização; a supervisão nominal de um fluxo de ações é um
carimbo de borracha, e um carimbo de borracha é pior do que nenhum porque legitima a decisão. Dois
modos de falha têm de ser explicitamente engenheirados. **Enviesamento de automatização**: um
revisor que vê um resultado confiante da máquina tenderá a confirmá-lo, portanto a supervisão que
apenas oferece "aprovar/rejeitar" na proposta do modelo é supervisão apenas de nome.
**Supervisão que se degrada**: um portão que uma pessoa pode ultrapassar em dois segundos sob carga
será ultrapassado em dois segundos, e a sua qualidade cai silenciosamente à medida que o volume
aumenta. A resposta da engenharia é classificar ações por consequência e colocar um ponto de
verificação concebido apenas onde as apostas justificam a latência (o padrão
[**Human-in-the-loop Gate**](/patterns/human-in-the-loop-gate) no capítulo 05), dando ao revisor
contexto suficiente para discordar, registando o aprovador e a decisão como evidência, e monitorando
a própria supervisão (taxa de aprovação, tempo para decidir, taxa de sobreposição) como um sinal que
pode degradar-se. A supervisão que não mede é supervisão que não pode reivindicar. As abordagens
[human-in-the-loop, on-the-loop e in-command](/bok/principles-and-standards#eu-hleg-guidelines-and-altai)
do Grupo de Peritos de Alto Nível da UE (capítulo 22) nomeiam as escolhas de colocação, e o capítulo
16 testa se as explicações realmente ajudam os revisores a resistir ao enviesamento de automatização
([testing explanation quality](/bok/fairness-and-explainability#testing-explanation-quality)).

## IA de terceiros e adquirida

A maioria das organizações não treina os modelos que executam. Compram SaaS com um LLM incorporado,
chamam um modelo fundacional apenas por API, ou herdam um agente dentro de um produto de um
fornecedor; para esses, as partes do stack que assumem que o modelo é seu degradam. Não pode fazer
red-teaming de pesos que não consegue alcançar, e um **eval gate** (camada 03) pode apenas testar o
sistema do fornecedor como uma caixa preta, na sua fronteira, não os seus internos. O controlo em
tempo de execução (camada 04) reduz-se ao que a integração expõe: os âmbitos de ferramentas que
concede, a identidade que emite ao agente do fornecedor, o tráfego que pode observar, não o
comportamento do próprio modelo. As camadas não desaparecem, mas a camada 03 reduz-se a avaliações
de fronteira e confiança na própria evidência do fornecedor, e a camada 04 reduz-se ao perímetro que
controla. O que cresce para compensar é o inventário e a garantia: o sistema do fornecedor ainda
precisa de uma entrada de registo, um proprietário e um âmbito; a sua documentação de fornecedor,
ficha de modelo e qualquer AIBOM tornam-se evidência que recolhe em vez de produzir; e a própria
due-diligence torna-se um portão, escrito numa
[política de IA de terceiros](/bok/governance-program#third-party-ai-policy) (capítulo 12). Este é o
padrão [**Vendor / Model Due-Diligence Gate**](/patterns/vendor-model-due-diligence-gate) (capítulo
05), ancorado na ISO/IEC 42001 Anexo A.10 (relações com terceiros e clientes) e na divisão de
deveres do Regulamento da IA da UE entre prestador e responsável pela implantação (ver capítulo 08,
e [quem é na cadeia de valor](/bok/eu-ai-act#who-you-are-in-the-value-chain) no capítulo 18). A
regra prática: quanto menos do modelo possui, mais do seu orçamento de controlo passa de testá-lo
para limitá-lo e evidenciar o fornecedor. O capítulo 15 aborda a decisão
[build, buy or adapt](/bok/governing-deployment#build-buy-or-adapt) e o seu encargo de evidência, e
o capítulo 20 as
[licenças e indenizações de modelos adquiridos](/bok/existing-law#model-licences-and-vendor-indemnities).

## O custo do stack

Nada disto é gratuito, e uma linha de FinOps faz parte de governá-lo honestamente. Os custos
recorrentes são computação para suites de avaliação executadas em cada mudança (suites adversariais
são as caras, e executá-las em cada commit em vez de cada release é uma conta real), armazenamento e
saída para rastreios e a loja de evidência (rastreios de agentes são verbosos, e a garantia contínua
significa mantê-los tempo suficiente para responder a uma auditoria), e o tempo de engenharia para
manter suites, limiares e integrações à medida que os sistemas se movem. Os custos escalam com a
frequência de mudança e o volume de rastreio, portanto os alavancas são óbvias uma vez nomeadas:
amostra ou nível de avaliações caras por risco, defina retenção por obrigação em vez de por defeito,
e coloque os controlos mais baratos (uma verificação de política, um portão de identidade) na frente
onde apanham falhas antes de uma avaliação cara ser executada. Um stack cujo custo de execução
ninguém rastreia é um stack que será cortado na primeira ronda de orçamento, o que é em si uma falha
de governação.

## O stack mínimo viável para uma equipa de uma pessoa

A maioria das funções de governação da IA são pequenas, e muitas são uma única pessoa: na disciplina
GRC adjacente, aproximadamente metade das equipas têm quatro pessoas ou menos e quase uma em cinco
(18,5%) é uma equipa de uma pessoa [14]. Uma equipa de uma pessoa não pode construir todas as cinco
camadas em profundidade, mas pode construir a espinha dorsalmente, de ponta a ponta: uma fatia
vertical que toca cada camada bate uma camada construída e quatro deixadas no papel. Comece onde a
alavanca é mais alta e o custo é mais baixo:

- **Camada 02 primeiro, minimamente.** Um registo que uma implantação escreve, com um proprietário e
  um âmbito por entrada. Se conseguir responder "o que está em execução e quem o possui?" de uma
  fonte ativa, tem mais do que a maioria.
- **Uma política na camada 01 com dentes.** Uma única regra que importa (sem implantação sem um
  proprietário registado, ou uma verificação de residência de dados), como código, no pipeline,
  bloqueando em falha. Um controlo que morde bate cem que recomendam.
- **Um eval gate na camada 03.** Uma avaliação adversarial contra o seu agente de risco mais
  elevado, ligada de modo a que uma regressão falhe a compilação. Reutilize um framework aberto; não
  escreva o seu próprio harness.
- **Identidade e um kill switch na camada 04.** Cada agente sob a sua própria identidade com um
  âmbito, e uma forma testada de o parar. Este é o controlo mais barato com a maior redução de raio
  de explosão.
- **Evidência como um subproduto na camada 05.** Cada um dos acima emite um registo estruturado, com
  carimbo de data/hora, para uma loja. Ainda não está a construir um pipeline OSCAL; está a recusar
  confiar em capturas de ecrã.

A ordem é deliberada: veja-a, governe-a, teste-a, contenha-a, prove-a. Uma fatia vertical fina
responde às três perguntas para um sistema hoje e alarga-se à medida que a equipa cresce. A
alternativa, uma camada 01 espessa de políticas sem inventário sob elas, não responde a nenhuma das
três perguntas, e é exatamente o teatro de framework que a disciplina existe para terminar. Quanto
do ciclo de risco uma pequena função executa é definido pela
[matriz de adaptação](/bok/risk-management#the-tailoring-matrix) do capítulo 13.

## Um sistema através das cinco camadas

`csa-01`, o assistente de atendimento ao cliente das caixas acima, é um sistema, não cinco. Abaixo
está o artefato único que produz em cada camada: pequenos excertos dos esquemas definidos no
capítulo 05, cada ilustrativo. Os Esquemas JSON completos com exemplos preenchidos para estes
registos, e [como usá-los](/resources/templates#tpl-how), estão na página de modelos.

**Camada 01: Govern-as-Code.** Um veredicto de Policy Card (ilustrativo):

```json
{ "rule_id": "residency.eu-only.v3", "decision": "deny",
  "input_hash": "sha256:9f2b…", "timestamp": "2026-09-18T14:07:11Z" }
```

**Camada 02: Inventory & Transparency.** A sua entrada de registo (ilustrativa):

```json
{ "id": "csa-01", "owner": "team-support-platform",
  "scope": ["refunds:read", "orders:read"], "expiry": "2026-12-17" }
```

**Camada 03: Evals & Red Teaming as Evidence.** Um resultado de eval-gate (ilustrativo):

```json
{ "suite_id": "injection-resistance.v4", "model_version": "csa-01@2026-09-18",
  "score": 0.982, "threshold": 0.95, "result": "pass" }
```

**Camada 04: Runtime Controls & Observability.** Um evento de guardrail (ilustrativo):

```json
{ "agent": "csa-01", "direction": "output", "rule_id": "output.pii.v2",
  "decision": "block", "timestamp": "2026-09-18T14:31:52Z" }
```

**Camada 05: Assurance & Continuous Compliance.** O registo de evidência que emite (ilustrativo):

```json
{ "control_id": "guardrail.output.pii.v2", "subject": "csa-01@2026-09-18",
  "decision": "alert", "obligation": "EU AI Act Art. 15",
  "timestamp": "2026-09-18T14:31:52Z" }
```

Os cinco excertos são um caminho de dados de política para prova, com chave no mesmo id de registo.

## O que pode fazer esta semana

1. **Desenhe uma fatia.** Escolha um sistema e escreva, para cada uma das cinco camadas, o artefato
   único que produz hoje e o que lhe falta. As lacunas são o seu backlog, em ordem de construção.
2. **Ligue o registo à implantação.** Faça um pipeline de implantação escrever a entrada de registo
   (id, proprietário, âmbito, expiração) e falhe quando um campo está vazio.
3. **Dê a uma política dentes.** Mova uma regra que importa, um proprietário registado ou uma
   verificação de residência de dados, para código no pipeline, bloqueando em falha, e registe cada
   veredicto com o seu id de regra.
4. **Portão uma release num eval.** Coloque uma avaliação adversarial contra o seu agente de risco
   mais elevado em CI, com um limiar rastreado para um modo de falha nomeado, de modo a que uma
   regressão falhe a compilação.
5. **Faça um treino de uma paragem e mantenha o registo.** Dispare o kill switch num agente em
   staging, cronometrize a paragem, e verifique que a paragem e os eventos de guardrail chegaram a
   uma loja de evidência, com chave no id de registo.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] Policy Cards: Machine-Readable Runtime Governance for Autonomous AI Agents (arXiv 2510.24383). 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[4] AI Risk Management Framework (AI RMF 1.0). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[5] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[6] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[7] Inspect: a framework for large language model evaluations (UK AI Security Institute). GitHub. 2026. https://github.com/UKGovernmentBEIS/inspect_ai (verified: primary)
[8] General-Purpose AI Code of Practice, Safety and Security chapter (examples of model evaluation methods include "red-teaming and other methods of adversarial testing"; systemic-risk models only; voluntary; published 10 Jul 2025). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[9] Model Context Protocol specification 2026-07-28 (DCR deprecated in favour of CIMD; issuer-bound credentials). MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[10] "Accelerating the Adoption of Software and AI Agent Identity and Authorization" (concept paper; "known, trusted, and properly governed"). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[11] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (>50% of agent attacks exploit access-control and prompt injection by 2029). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[12] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer compliance-as-code) (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[13] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[14] State of GRC 2026 (≈51% of GRC teams ≤4 people; ≈18.5% solo). GRC Engineer. 2026. https://grcengineer.com/report/ (verified: primary)
[15] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[16] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (guardian agents: AI-based technologies that review, monitor and redirect or block agent actions). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[17] CSA research note on the EU AI Act, prEN 18286 and ISO/IEC 42001 (ISO/IEC 42001 alone does not satisfy the AI Act and is not a harmonised standard; EN 18286 targets the Art. 17 QMS). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
