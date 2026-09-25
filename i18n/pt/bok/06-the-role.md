---
lang: pt
source: bok/06-the-role.md
sourceHash: "17a44abb101fec04ddcb1b5db48761eb55b950d17a34ab07095b17e22699c0b1"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 06. El rol

> El ingeniero de gobernanza de IA como rol concreto: una capacidad primero y un título de trabajo
> segundo, definido por los flujos de trabajo que posee y la evidencia que produce, no por las
> certificaciones de su titular.

## Capacidad primero, título segundo

La Tesis insiste en que la ingeniería de gobernanza de IA es una capacidad, no un título de trabajo
(la misma afirmación que la disciplina padre hace sobre la ingeniería GRC, una capacidad que
cualquiera cercano a la compilación puede desarrollar [8]). Este capítulo lo hace concreto sin
contradecir eso: una capacidad aún vive en la semana de alguien: los tickets que posee, las tuberías
que mantiene, los incidentes por los que es llamado. Así que describimos el
**ingeniero de gobernanza de IA** como la persona, en cualquier organigrama, que posee esa capacidad
y es responsable de las tres preguntas en producción: qué IA se está ejecutando, qué se le permite
hacer, y qué evidencia lo prueba.

La distinción importa porque el título aún se está formando. El mismo trabajo se anuncia como «AI
Governance Engineer», «AI Risk Engineer», «AI Evaluation & Governance Engineer» [1], «Responsible AI
Engineer» y, dentro de equipos GRC que construyen la versión orientada a IA de su función, «GRC
Engineer» con un mandato de IA [2]. Un ingeniero de seguridad que escribe la puerta de eval, un
ingeniero de privacidad que convierte una FRIA en código, un ingeniero MLOps que conecta el registro
al despliegue: cada uno está haciendo ingeniería de gobernanza de IA bajo un título diferente.
Definimos el rol por lo que posee, no por lo que HR llamó a la solicitud.

Una línea la separa de su vecino analista, y el resto del capítulo gana esa línea: el analista de
gobernanza de IA describe el sistema desde afuera y presenta la descripción; el ingeniero de
gobernanza de IA lee el sistema directamente y envía el control que cambia lo que hace.

## Lo que el rol posee, por flujo de trabajo

El ingeniero posee flujos de trabajo, no documentos. Cada flujo de trabajo a continuación es un
sistema en ejecución con entradas, artefactos y evidencia, y cada uno se asigna a una de las cinco
capas de la pila (capítulo 04). Agrupar responsabilidades de esta manera mantiene el rol honesto:
posees un flujo de trabajo cuando puedes ser llamado para él, no cuando tu nombre está en una
política.

### Ingesta y clasificación

Todo o sistema de IA, modelo e agente entra através de uma admissão que o classifica: por nível de
risco, por exposição regulatória (Regulamento da IA de alto risco, GPAI, fora do âmbito), por
sensibilidade dos dados e por autonomia. O engenheiro constrói a admissão como um caminho de
formulário mais código, não como uma reunião: um pedido que estrutura uma entrada de registo,
dispara a avaliação de impacto correta (FRIA, AIPD), e encaminha o sistema para os controlos que a
sua classe exige. A função Map do NIST AI RMF é o vocabulário natural para o passo de classificação.
A admissão pergunta, por ordem: se o problema precisa de IA de todo
([estratégia, valor e se usar IA de todo](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all),
capítulo 12); se o sistema conta como IA
([a decisão definitória e os seus campos de registo](/bok/ai-defined#from-definition-element-to-registry-field),
capítulo 11); o que o [registo de caso de uso](/bok/governing-development#the-use-case-record) diz
sobre finalidade e autoridade de decisão (capítulo 14); que nível de risco o
[perfil de risco do caso de uso](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile)
lhe atribui (capítulo 13); e onde se situa na
[escada de risco do Regulamento da IA](/bok/eu-ai-act#the-risk-ladder) (capítulo 18). Um sistema que
é comprado em vez de construído entra com um
[Registo de Decisão de Implantação](/bok/governing-deployment#the-deployment-decision-record)
(capítulo 15). O padrão [Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering)
constrói a admissão, e a [triagem do Regulamento da IA](/toolkit/ai-act-triage) redige o registo de
decisão de classificação. **Mapeia para** Inventory & Transparency.

### Inventario y registro

O engenheiro é proprietário do inventário de modelos e do **registo de agentes**, o registo
consciente do tempo de execução de cada ator não humano, cada um com um proprietário, um âmbito
declarado, um estado e um kill switch. A capacidade que distingue o engenheiro aqui é o caminho de
dados em tempo de execução: o registo é alimentado pelo pipeline de implantação e pela descoberta em
produção, não digitado numa folha de cálculo, e cada ator não humano nele carrega a sua própria
identidade; o capítulo 23 define o que
[uma entrada do registo de um agente](/bok/governing-agents#the-agent-registry) tem de conter.
**Mapeia para** Inventory & Transparency.

### Avaliações e testes adversariais como evidência

O engenheiro constrói e mantém os conjuntos de avaliação (capacidade, segurança e adversariais) e
integra-os numa **eval gate** de modo a que uma avaliação falhada bloqueie o lançamento. Este é o
fluxo de trabalho que mais nitidamente separa o engenheiro do analista: o analista revê um relatório
de modelo; o engenheiro escreve o teste que o modelo tem de passar e é proprietário do equipamento
que o executa (Inspect AI, promptfoo, Garak, Giskard, DeepEval, Ragas como exemplos de categoria,
ilustrativos e não recomendados). O papel de "AI Evaluation & Governance Engineer" é definido em
torno de "automated testing harnesses and safety guardrails" e testes adversariais de red-teaming
[1]. **Mapeia para** Evals & Red Teaming as Evidence.

### Policy-as-code e gates

O engenheiro expressa as regras de governação como política executável (`OPA/Rego`, Cedar, Policy
Cards) que avalia em CI/CD e na admissão, e mantém os gates que as impõem. Uma publicação pública de
gestor de GRC enquadra o mandato como "traduzir políticas em policy-as-code" [3]. O resultado do
engenheiro aqui é uma fusão que é bloqueada ou permitida, com uma razão registada, não uma
recomendação numa revisão. **Mapeia para** Govern-as-Code.

### Monitorização em tempo de execução e incidentes

O engenheiro instrumenta o tempo de execução: decisões de guardrail, mediação de chamadas de
ferramentas, sinais de desvio e fluxo de comportamento do agente entram em observabilidade
(Langfuse, Arize Phoenix sobre OpenTelemetry como exemplos). É proprietário do caminho de detecção
para relatório de incidentes graves, incluindo o relógio do Artigo 73 do Regulamento da IA da UE
para sistemas de risco elevado, e é proprietário do **kill switch** testado para agentes, com o
modelo de ameaça que diz contra quais falhas de tempo de execução os controlos são construídos [5].
O capítulo 17 cobre [resposta a incidentes](/bok/incidents#the-response-lifecycle) e
[análise de causa raiz](/bok/incidents#root-cause-analysis). **Mapeia para** Runtime Controls &
Observability.

### Garantia e evidência de auditoria

O engenheiro emite **evidência pronta para auditoria** como subproduto da construção (`OSCAL`
componente e artefatos de avaliação, registos assinados, resultados de avaliação estruturados) de
modo a que a auditoria seja uma consulta, não um projeto. Esta é **garantia contínua**: o estado do
controlo é um sinal em direto, não uma atestação pontual. **Mapeia para** Assurance & Continuous
Compliance.

### Tradução regulatória

O engenheiro lê a obrigação com suficiente profundidade para construir o controlo que a cumpre:
transformando um artigo do Regulamento da IA, um controlo ISO/IEC 42001 ou uma subcategoria NIST AI
RMF num gate, um campo de registo ou um artefato de evidência, e vice-versa, de modo a que um
auditor possa rastrear o controlo até à obrigação. Esta é tradução, não aconselhamento jurídico; o
engenheiro depende de Legal para confirmar que a obrigação é lida corretamente. **Mapeia para**
todas as cinco camadas; é a espinha dorsal que o capítulo 08 indexa, e o capítulo 18 lê
[o Regulamento da IA da UE de uma vez](/bok/eu-ai-act#how-to-read-this-chapter) para o engenheiro
que tem de o traduzir.

## Competências, por fluxo de trabalho

As competências são agrupadas pelo fluxo de trabalho que servem, não pelo certificado que as ensina.
A tabela é um mapa de capacidades: diz o que deve ser capaz de fazer, em ordem aproximada de como é
crítico para cada fluxo de trabalho. É ilustrativa, não uma lista de verificação para passar.

| Fluxo de trabalho | Competências essenciais | Competências de apoio |
|---|---|---|
| Admissão e classificação | Design de taxonomia de risco; leitura dos níveis de risco do Regulamento da IA da UE; análise de requisitos | Ferramentas de formulário/fluxo de trabalho; modelação de dados leve |
| Inventário e registo | Identidade não humana e acesso com âmbito; integração de API em CI/CD; modelação de dados | Cloud IAM; ferramentas de descoberta; conceitos SPIFFE/SPIRE |
| Avaliações e testes adversariais | Engenharia de equipamento de avaliação; prompting adversarial; literacia estatística; Python | Internals de LLM/agente; design de benchmark; modelação de ameaças (STRIDE/PASTA) |
| Policy-as-code e gates | `OPA/Rego` ou Cedar; engenharia de pipeline CI/CD; Git | Design de esquema de política (Policy Cards); controlo de admissão |
| Monitorização em tempo de execução e incidentes | Observabilidade/OpenTelemetry; configuração de guardrail; resposta a incidentes | Engenharia de detecção; segurança de MCP e protocolo de agente |
| Garantia e evidência de auditoria | `OSCAL` e evidência legível por máquina; logging e assinatura; fluência de auditoria | Atestação criptográfica; design de armazenamento de evidência |
| Tradução regulatória | Leitura de regulamentação e normas (Regulamento da IA, ISO/IEC 42001, NIST AI RMF); mapeamento | Inglês jurídico; metodologia AIPD/FRIA |

Duas competências transversais situam-se sob todas as sete: **Python** suficiente para colar
sistemas (publicações colocam Python em aproximadamente um em cada quatro anúncios de governação de
IA [4]), e **leitura de lei** suficiente para analisar um artigo sem o confundir com aconselhamento.
Nenhuma é opcional; nenhuma é o trabalho inteiro.

## Analista versus engenheiro

A forma mais clara de definir o papel é contra o analista de que cresce. O contraste abaixo é
escrito para governação de IA e modelado na tabela analista-vs-engenheiro que a literatura de GRC
Engineer usa para a sua disciplina-mãe [2]. Ambos os papéis são necessários; o engenheiro não é
"melhor", mas faz trabalho diferente e é medido de forma diferente.

| Dimensão | Analista de governação de IA | Engenheiro de governação de IA |
|---|---|---|
| **Artefato de evidência** | Um artefato pontual (uma atestação, um questionário, um relatório exportado) compilado para uma revisão | Um artefato continuamente emitido (um resultado de consulta, uma execução de avaliação, um registo assinado) produzido conforme o pipeline é executado |
| **Fonte primária** | Trabalha a partir da descrição relatada do sistema: documentação, resumos e respostas de fornecedor | Trabalha a partir do sistema em execução: o registo e telemetria de produção, os mesmos sinais que a construção emite |
| **Conjunto de ferramentas** | Folhas de cálculo, uma plataforma GRC/governação de IA, ticketing | Python, `OPA/Rego`, Git, CI/CD, equipamentos de avaliação, `OSCAL`}, mais a plataforma |
| **Cadência** | Periódica: revisões trimestrais, avaliações anuais | Contínua: cada commit, implantação e chamada em tempo de execução |
| **Resultado** | Um relatório, uma matriz de mapeamento, uma classificação de risco | Uma construção fundida ou bloqueada, um agente registado, um artefato de evidência legível por máquina |
| **Métrica de sucesso** | Auditoria passou, cobertura de framework completa | Falhas de controlo capturadas antes da chegada do auditor, e redução de risco efetiva mensurável |

A distinção é cadência e artefato, não competência ou autorização. Não é que o analista não possa
ler um registo ou o engenheiro não possa escrever um relatório; é que o resultado do analista é uma
descrição periódica e o do engenheiro é um controlo contínuo. Um bom analista lê sistemas de perto;
um bom engenheiro escreve claramente. Os modos de falha diferem também, e nomeá-los mantém ambos
honestos. O modo de falha do analista é teatro de conformidade: documentação que corre à frente da
realidade. O modo de falha do engenheiro é sobre-engenharia: automatizar um controlo para um
processo que ninguém concordou em corrigir, ou construir um gate tão frágil que os engenheiros o
contornam. Nenhum papel é seguro do seu próprio modo de falha apenas pelo título.

## A escada de carreira

O papel tem degraus observáveis, cada um definido pelo que a pessoa pode ser confiada para possuir
de ponta a ponta, não por anos de serviço, e verificável olhando para os sistemas, não uma
auto-avaliação.

1. **Associado.** Executa controlos existentes: adiciona uma avaliação a um conjunto, regista um
   agente corretamente, produz evidência de um controlo que alguém construiu.
2. **Engenheiro de governação de IA.** Constrói um controlo de ponta a ponta (uma obrigação num
   gate, um conjunto de avaliação para uma classe de sistema, integrado em CI/CD) e é proprietário
   de pelo menos um fluxo de trabalho para uma área de produto.
3. **Sénior.** É proprietário de um fluxo de trabalho completo em toda a organização e desenha o
   caminho pavimentado que outros adotam; o registo, gate de avaliação ou pipeline de evidência que
   construiu é o modelo de template padrão.
4. **Staff / principal.** É proprietário da arquitetura de referência (como as cinco camadas se
   encaixam) e das decisões transversais (modelo de identidade, formato de evidência, caminho de
   incidente).
5. **Chefe de engenharia de governação de IA.** É proprietário da função e da sua propriedade
   partilhada com engenharia, medido por redução de risco efetiva, não por controlos parados. Uma
   publicação pública de gestor de engenharia com âmbito para "construir uma função de engenharia
   GRC com foco em IA" situa-se neste degrau [3].

Uma pessoa pode deter a capacidade no degrau dois enquanto o título fica para trás em "analista", ou
deter o título sem a capacidade. A escada descreve o trabalho, e o trabalho é visível nos sistemas.

## Três formas de entrar

Ninguém começa como engenheiro de governação de IA; todos convertem de uma disciplina adjacente,
mantendo a sua força e adicionando o que lhe falta.

- **De Legal ou privacidade.** A sua vantagem é a tradução regulatória; a sua lacuna é a construção.
  Transforme uma avaliação numa versão executável (um modelo FRIA-as-Code, uma política em
  `OPA/Rego`), e aprenda pipeline suficiente para ver onde o controlo dispara. Comece em
  policy-as-code e admissão.
- **De Segurança ou GRC.** A sua vantagem é a mentalidade de controlo; a sua lacuna é a camada de
  modelo. A engenharia GRC já ensinou os movimentos-pai: policy-as-code, garantia contínua,
  evidência como subproduto [2]. Adicione os objetos específicos de IA: avaliações como controlos,
  identidade e âmbito de agente, e os modos de falha de modelo e agente do OWASP Agentic Top 10 [5].
  Comece em evals-as-evidence e no registo de agentes.
- **De MLOps ou engenharia ML.** A sua vantagem é o caminho de dados em tempo de execução que todos
  os outros não têm; a sua lacuna é a obrigação. Adicione o *gate* de avaliação em vez do relatório
  de avaliação, o campo de registo para proprietário e âmbito, o artefato de evidência que a
  auditoria necessita. Comece nos gates de avaliação em CI e monitorização em tempo de execução.

## O mercado

O papel é definido pelos fluxos de trabalho acima, não pelas vagas. Mas o mercado está a formar-se e
a evidência é pública, e corrobora a forma do trabalho. Trate cada figura como originária; os pontos
de salário são medianas de pesquisa ou intervalos de publicação, não garantias.

**Bandas de pesquisa.** O IAPP Salary & Jobs Report 2025-26 (1.600+ respondentes, 60+ países) coloca
papéis técnicos de governação de IA no setor tecnológico numa mediana de USD 221.000 (a sua banda
mais alta) contra USD 151.800 para trabalho de governação de IA em geral e USD 169.700 para papéis
combinados de privacidade-e-governação-de-IA [6]. O prémio é para a extremidade técnica e de
construção de controlo da disciplina, que é exatamente o papel que este capítulo descreve.

**Competências em procura.** A análise de anúncios nos EUA desde janeiro de 2026 (Axial Search)
relata observabilidade/monitorização em 41-42% dos anúncios de governação de IA, Python em 27-28%,
frameworks NIST em cerca de 27%, familiaridade com modelos de fundação em 25,6% e cloud em 18,2%; a
remuneração mediana anunciada foi USD 169 000 e a experiência mediana exigida cinco anos [4]. E o
sinal de procura é amplo: a lista de Competências em Ascensão 2026 do LinkedIn inclui competências
de governação e IA responsável entre os seus clusters de crescimento mais rápido, juntamente com as
capacidades técnicas de IA [7]. O sinal estruturante é a mistura de competências (observabilidade,
Python, o caminho de dados em tempo de execução), não a manchete salarial.

> **Ofertas de emprego (nota).** Os anúncios individuais marcam o topo da gama: um papel de gestor
> de engenharia de GRC num laboratório de vanguarda foi anunciado em 2026 a USD 405 000 [3]. Mas as
> vagas nomeadas são um sinal atrasado e ruidoso, mantido aqui como corroboração e fora do
> argumento; esta edição não cita nenhum anúncio de quadro de empregos cujo URL expire ou seja
> reatribuído após o encerramento da vaga. O papel são os fluxos de trabalho, não a requisição.

## O que os empregadores entendem mal na descrição do cargo

Lendo os anúncios em relação aos fluxos de trabalho acima, três erros recorrem.

- **Certificações como proxy de capacidade.** As descrições listam AIGP, CIPP, CISSP e CISM como se
  uma certificação produzisse um controlo. Os dados de Axial mostram que certificações aparecem em
  menos de 11% de cada anúncio [4]; as competências estruturantes (harnesses de avaliação, política
  como código, o caminho de dados em tempo de execução) são as que a descrição do cargo
  sub-especifica. Peça o fluxo de trabalho, depois a certificação se ajudar. O que cada esquema
  avalia, e como este livro se relaciona com isso, está estabelecido de forma neutra na
  [página de certificações](/for/certifications).
- **Trabalho de analista sob um título de engenheiro.** Na nossa leitura dos anúncios, os títulos de
  "Engenheiro de Governação de IA" frequentemente descrevem trabalho de admissão, mapeamento e
  relatório (trabalho de analista) a salário de engenheiro. O indicador é a ausência de qualquer
  construção: nenhuma porta de avaliação, nenhuma integração de registo, nenhum pipeline de
  evidência.
- **Tudo, numa contratação.** Um único anúncio pede política como código, red teaming, identidade,
  observabilidade, resposta a incidentes, tradução regulatória e gestão de stakeholders. Isso é uma
  função, não uma pessoa: os sete fluxos de trabalho são propriedade de uma equipa, e uma primeira
  contratação é proprietária de dois ou três e constrói o caminho pavimentado para o resto.

> **Na prática**
> Numa grande operadora de telecomunicações, o papel chegou antes do título. A primeira versão do
> trabalho estava dentro de uma equipa de privacidade e parecia AIPDs e revisões. O que a
> transformou em engenharia de governação de IA foi ser proprietária de dois fluxos de trabalho:
> ligar o registo de modelos e agentes ao pipeline de implantação para que fosse verdadeiro em
> qualquer terça-feira, e colocar uma porta de avaliação em CI para que uma regressão na resistência
> a injeção falhasse a construção. A descrição do cargo alcançou-a um ano depois. A capacidade era
> visível nos sistemas muito antes de ser visível no organograma.

**Correspondências:** Art. 9 do Regulamento da IA (gestão de riscos), Art. 26/27 (deveres do
responsável pela implantação, AIPD), Art. 72 (acompanhamento pós-comercialização), Art. 73
(relatório de incidentes graves) · ISO/IEC 42001 (papéis, responsabilidades e competência) · NIST AI
RMF (Govern) · OWASP Top 10 para Aplicações Agentic 2026. Os mapeamentos são ilustrativos, não uma
afirmação de conformidade.

## O que pode fazer esta semana

1. **Mapeie os sete fluxos de trabalho.** Escreva quem é proprietário de admissão, inventário,
   avaliações, política como código, tempo de execução e incidentes, garantia e tradução regulatória
   hoje, e marque os que ninguém é proprietário.
2. **Seja proprietário de um fluxo de trabalho completamente.** Escolha o que tem menos construção
   nele (frequentemente o registo ou a porta de avaliação) e envie um controlo lá que bloqueia ou
   regista, não um que recomenda.
3. **Reescreva uma descrição de cargo.** Substitua a lista de certificações pelos fluxos de trabalho
   que a contratação será proprietária e pelos artefatos que enviará no seu primeiro trimestre.
4. **Pratique uma competência central num sistema real.** Da tabela de competências, pegue na
   competência central que o seu fluxo de trabalho carece e use-a uma vez num pipeline ativo: uma
   política em `OPA/Rego`, uma avaliação num harness, um rastreio em OpenTelemetry.
5. **Traduza um artigo num par.** Sente um advogado ou EPD com um engenheiro e transforme um artigo
   do Regulamento da IA numa porta, um campo de registo ou um artefato de evidência, e vice-versa.

## Sources

[1] "How the AI Engineer role is unbundling in 2026" (names the AI Evaluation & Governance Engineer). AI Journal. 2026-08-26. https://aijourn.com/how-the-ai-engineer-role-is-unbundling-in-2026/ (verified: secondary)
[2] "The GRC Engineer role" (analyst-vs-engineer table; career paths). GRC Engineer. 2025. https://grcengineer.com/grc-engineer/ (verified: primary)
[3] "Engineering Manager, GRC" posting (AI-forward GRC engineering function; policies into policy-as-code), USD 405,000. Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: secondary)
[4] AI governance jobs analysis (US postings since Jan 2026: observability 41-42%, Python 27-28%, NIST ~27%, foundation models 25.6%, cloud 18.2%; median pay USD 169,000; median 5 yrs). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] Salary & Jobs Report 2025-26 (technical AI-gov in tech median USD 221,000; AI governance only 151,800; privacy + AI governance 169,700). IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[7] LinkedIn 2026 Skills on the Rise (governance and responsible-AI skills among the fastest-rising clusters; no per-skill percentage published). LinkedIn, via EdTech Innovation Hub. 2026. https://www.edtechinnovationhub.com/news/linkedins-2026-skills-on-the-rise-shows-global-ai-driving-hiring-shifts (verified: secondary)
[8] "What is GRC Engineering" (capability, not a job title). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
