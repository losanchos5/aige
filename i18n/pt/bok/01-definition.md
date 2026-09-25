---
lang: pt
source: bok/01-definition.md
sourceHash: "1cce4e63e8eb069cdc6eb894461204e8419fc6b0b7176c3e0210281b0d47437e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 01. A definição

> A engenharia de governação da IA é a aplicação de prática de engenharia (pensamento sistémico,
> pensamento de produto e código) à governação de sistemas de IA; uma capacidade, não um título de
> trabalho, medida por redução efetiva do risco e evidência pronta para auditoria.

## A definição

**A engenharia de governação da IA é a aplicação de prática de engenharia (pensamento sistémico, pensamento de produto e código) à governação de sistemas de IA.**

Leia a frase em três partes. *Prática de engenharia* significa que construímos, operamos e medimos a
governação da forma como os engenheiros constroem, operam e medem qualquer outra coisa: como
sistemas versionados com testes, telemetria e proprietários, não como documentos. *Pensamento
sistémico e pensamento de produto* significam que tratamos a governação como um todo que abrange
dados, modelo, pipeline, runtime e organização, entregue como um produto aos engenheiros que são
seus utilizadores. *A governação de sistemas de IA* é o assunto: todo o espectro de governação,
risco e garantia para IA, incluindo agentes autónomos, não uma fatia estreita disso. O capítulo 11
estabelece [o que conta como um sistema de IA](/bok/ai-defined#four-definitions-compared) para fins
de governação, e por que essa decisão é ela própria o primeiro controlo.

O enquadramento é emprestado, deliberadamente. A engenharia de GRC define-se como "a aplicação de
prática de engenharia de software, pensamento sistémico e pensamento de produto à governação, risco
e conformidade" [1]. A engenharia de governação da IA é esse mesmo movimento, dirigido à governação
da IA. É a disciplina-mãe apontada para um alvo mais rápido e mais estranho.

## Três esclarecimentos

**Abrange a governação, o risco e a garantia de sistemas de IA, incluindo agentes.** O âmbito não é
"conformidade". Vai desde a definição das regras (governação), passando pela identificação e redução
do que pode correr mal (risco), até à produção de evidência de que os controlos funcionam
(garantia). Inclui explicitamente IA autónoma e agêntica, porque é aí que residem agora os problemas
de governação mais difíceis: um agente que navega, executa código, chama APIs e atua sob autoridade
delegada é o objeto que a governação legada menos consegue ver.

**É uma capacidade, não um título de cargo.** Não precisa de "engenheiro de governação da IA" no seu
cartão de visita para fazer este trabalho, e ter o título não significa que o está a fazer. É um
conjunto de práticas (política como código, eval gates, registos de agentes, garantia contínua) que
um engenheiro de segurança, um engenheiro de privacidade, um engenheiro de MLOps ou um responsável
de governação podem cada um desenvolver. O mercado está a formar o papel (funções técnicas de
governação da IA no setor tecnológico reportam uma mediana próxima de USD 221 000, a faixa mais
elevada no inquérito da IAPP [2], e a Gartner prevê despesas de governação da IA de USD 492 milhões
em 2026, ultrapassando USD 1 mil milhão em 2030 [3]), mas a disciplina é definida pela capacidade,
não pela vaga.

**É medida pela redução efetiva do risco e pela evidência pronta para auditoria.** Existem
exatamente dois testes. O risco caiu realmente, de forma mensurável, em produção, e não num slide de
maturidade? E pode um regulador ou auditor ler a prova como evidência legível por máquina, e não uma
captura de ecrã remontada? Um controlo que não passa nenhum destes testes é teatro. A cobertura de
framework, o número de políticas escritas e as reuniões realizadas são inputs no máximo; nunca são a
medida.

## ## O cluster de desambiguação

A disciplina é definida tanto pelo que não é como pelo que é. Oito vizinhos são rotineiramente
confundidos com ela. Cada um partilha uma fronteira; nenhum é a mesma coisa.

| Vizinho | O que faz | Como a engenharia de governação da IA difere |
|---|---|---|
| **Investigação em segurança de IA** | Estuda se modelos poderosos são seguros em princípio (alinhamento, capacidades perigosas). | Engenharia dos controlos e evidência para sistemas de IA em produção; consome investigação em segurança, não a conduz. |
| **MLOps / LLMOps** | Constrói, implanta e serve modelos e pipelines de forma fiável. | Governa o que MLOps envia: adiciona política, avaliações como evidência, registo e garantia como gates no mesmo pipeline. |
| **Gestão de risco de modelo (estilo SR 11-7)** | Valida modelos, verifica a solidez conceptual e faz backtests, na tradição bancária; nos EUA, SR 11-7 foi substituído por SR 26-2 em 17 abr 2026 [6]. | Estende-se para além da validação de modelo até ao comportamento em tempo de execução, agentes, impacto de direitos e evidência contínua e legível por máquina. |
| **Conformidade de IA / legal** | Interpreta obrigações (Regulamento da IA, RGPD) e aconselha sobre elas. | Transforma a obrigação num controlo executável e evidência legível; precisa de legal, não a substitui. |
| **IA responsável / ética de IA** | Define os valores e princípios (equidade, transparência, responsabilidade). | Implementa esses valores como controlos em execução; a ética define o alvo, a engenharia atinge-o e prova-o. |
| **Engenharia GRC** (a progenitora) | Aplica prática de engenharia à governação, risco e conformidade em geral. | Mesmo método, especializado em IA: modelos, agentes, avaliações, AIBOM, controlos de IA em tempo de execução. |
| **Engenharia de segurança de IA** (a irmã) | Protege sistemas de IA contra ataque (injeção de prompts, roubo de modelo, abuso de agente); o seu entregável é um sistema defendido. | Sobrepõe-se muito (frequentemente a mesma pessoa), mas o seu entregável é um sistema *governado e evidenciado*: o registo de direitos e obrigações e garantia contínua, não apenas defesa. |
| **"Engenharia de governação da IA" da Visure** | Governa a IA que os engenheiros *usam dentro* de fluxos de trabalho de engenharia (requisitos, MBSE). | A direção oposta: o nosso assunto é governar sistemas de IA, não governar engenharia assistida por IA [4]. |

Em prosa: a fronteira situa-se onde uma disciplina termina. **A investigação em segurança de IA**
pergunta se um modelo é seguro; nós perguntamos se o sistema implantado é governado, e provamo-lo.
**MLOps** responde "o modelo está a servir?"; nós respondemos "é permitido servir, e que evidência o
diz?" Governamos o próprio pipeline que MLOps executa. **A gestão de risco de modelo** na tradição
SR 11-7 valida um modelo em pontos no tempo; nós governamos o sistema continuamente, incluindo
agentes que não têm análogo num modelo de crédito. O texto de referência da tradição nos EUA mudou
em 17 abr 2026, quando a Reserva Federal, o OCC e a FDIC substituíram SR 11-7 por SR 26-2
([SR 11-7, agora SR 26-2](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai), no
capítulo 21) [6]. A nova orientação coloca modelos de IA generativa e agêntica fora do seu âmbito
[7], portanto os sistemas de que este livro mais se preocupa são aqueles que a validação de modelo
bancário agora deixa para outros controlos; o capítulo 13 define onde
[a gestão de risco de modelo encontra a gestão de risco de IA](/bok/risk-management#what-this-chapter-settles).
**A conformidade de IA e legal** dizem-lhe o que a lei exige; nós construímos o controlo que o
cumpre e a evidência que o mostra, e dependemos de advogados para nos dizerem que compreendemos
corretamente a obrigação. **A IA responsável e a ética de IA** definem os valores; sem engenharia,
esses valores ficam num cartaz (o capítulo 16 transforma um deles,
[equidade, em métricas e eval gates](/bok/fairness-and-explainability#group-fairness-metrics)).
**A engenharia GRC** é o método progenitor, e somos a sua especialização em IA. Herdamos três das
cinco camadas do stack quase inalteradas (Governance-as-Code, Inventory & Transparency, e Assurance
& Continuous Compliance, que transportam política como código, o inventário de ativos e evidência
legível por máquina) juntamente com o teste "um dashboard verde sobre um controlo quebrado é
teatro"; o que a IA nos força a adicionar são as outras duas, avaliações e red-teaming como
controlos e identidade de agente e controlo em tempo de execução, porque um modelo cujo
comportamento deve ser testado e um ator autónomo que atua sob autoridade delegada não têm análogo
na GRC clássica. **A engenharia de segurança de IA** é a irmã com quem mais nos sobrepõemos, e a
sobreposição é uma característica, não uma disputa de fronteira: a mesma pessoa frequentemente usa
ambos os chapéus. A linha não é "enquadramento versus cercas" mas *entregável*. O entregável da
engenharia de segurança é um sistema defendido: para o ataque. O entregável da engenharia de
governação da IA é um sistema *governado e evidenciado*: o registo de direitos e obrigações (qual
controlo responde a qual artigo, com a prova anexada) e garantia contínua como um produto que um
auditor ou regulador pode consultar. Uma avaliação de red-team é trabalho de segurança e trabalho de
governação ao mesmo tempo; torna-se governação quando o seu resultado é arquivado como evidência
contra uma obrigação. A segurança pergunta "é seguro contra ataque?"; nós perguntamos "é governado,
e podemos prová-lo?" Geralmente precisamos da resposta de segurança como um input para a nossa. E o
uso **da Visure** da frase idêntica aponta inteiramente para a outra direção: governar a IA que
assiste o trabalho de engenharia, não engenharia a governação da IA. Reclamamos o segundo
significado e desambiguamos o primeiro à vista.

## ## O objeto da governação

O que, concretamente, governa esta disciplina? Cinco objetos aninhados, cada um necessitando de
controlos diferentes:

- **Modelos.** Os artefatos treinados (modelos de fundação, fine-tunes, classificadores), com a sua
  proveniência, capacidades, avaliações e modos de falha conhecidos. Governados com fichas de
  modelo, avaliações e AIBOM.
- **Sistemas.** A aplicação em torno do modelo: prompts, recuperação, ferramentas, orquestração, os
  utilizadores humanos e máquina. A maioria do risco está aqui, não no modelo bruto.
- **Agentes.** Sistemas que atuam: navegam, executam código, chamam APIs, movem dinheiro, delegam em
  outros agentes. Governados com identidade, âmbito limitado, mediação de ferramentas, guardrails em
  tempo de execução e kill switches. Este é o objeto mais difícil e mais novo, e aquele que a
  governação legada não consegue ver; o capítulo 23 abrange
  [governar agentes](/bok/governing-agents#what-makes-an-agent-a-governance-object) de ponta a
  ponta.
- **Dados.** Dados de treino, corpora de recuperação, prompts e outputs, com a sua base legal,
  direitos, proveniência e retenção. Governados com fichas de dados, DPIAs e linhagem; o capítulo 19
  aplica [lei de proteção de dados a IA](/bok/privacy-and-ai#principles-applied-to-ai).
- **A organização.** Os papéis, direitos de decisão, caminhos de escalada e responsabilidade que
  rodeiam tudo o que acima se menciona. Governados com um modelo operacional, RACI e um pipeline de
  incidentes (o capítulo 12 mapeia
  [os stakeholders e os seus deveres](/bok/governance-program#the-stakeholder-map)). Um controlo sem
  proprietário não é um controlo.

A disciplina é coerente apenas quando aborda os cinco. Uma ficha de modelo sem registo de agentes,
ou um registo de agentes sem caminho de dados em tempo de execução, governa um objeto e deixa os
outros abertos.

## ## As três questões

Em qualquer momento, uma função de engenharia de governação da IA deve ser capaz de responder a três
questões sobre produção, instantaneamente, a partir de sistemas em direto, não a partir de um
documento atualizado pela última vez há um trimestre:

1. **Que IA está em execução?** Quais modelos, sistemas e agentes estão em direto, em que versão,
   propriedade de quem. Este é o trabalho do inventário e do registo de agentes, e deve ser
   alimentado por um caminho de dados em tempo de execução, não digitado numa folha de cálculo.
2. **O que é permitido fazer?** O âmbito, permissões, guardrails e política que limitam cada sistema
   e agente. Este é o trabalho da governação como código e controlos em tempo de execução:
   identidade antes de autonomia, âmbito antes de ação.
3. **Que evidência o prova?** O registo legível por máquina e pronto para auditoria que os controlos
   funcionaram e o risco caiu. Este é o trabalho de avaliações como evidência e garantia contínua:
   evidência como um subproduto da construção.

Estas três questões são a espinha dorsal de todo o Body of Knowledge. O stack de cinco camadas
(capítulo 04) é construído para as responder: Inventory & Transparency responde *o que está em
execução*; Govern-as-Code e Runtime Controls & Observability respondem *o que pode fazer*, o
primeiro escrevendo o limite como código e o segundo aplicando-o na chamada em direto; Evals & Red
Teaming e Assurance & Continuous Compliance respondem *que evidência o prova*. As ameaças contra as
quais esses controlos são construídos (injeção de prompts, uso indevido de ferramentas, identidade
de agente e abuso de privilégio, agentes desonestos) estão catalogadas no Top 10 da OWASP para
Aplicações Agênticas [5], e os padrões que as respondem estão no capítulo 05.

## ## Os limites do eval gate

Este livro confia muito em avaliações como controlos, portanto deve ao leitor o mesmo teste de
"teatro" que aplica a tudo o resto. Um eval gate é necessário; não é suficiente. Leve-o a sério e os
seus limites seguem-se diretamente:

- **É ponto-no-tempo e limitado por amostragem.** Uma avaliação prova que o sistema passou *estes*
  casos nesta *versão*. Não diz nada sobre os inputs que não amostrou, e nada sobre o modelo de
  amanhã.
- **É manipulável.** No momento em que um limiar controla um lançamento, há pressão para ajustar o
  modelo à suite ou o limiar ao modelo. Um limiar otimizado contra torna-se um número que sobe
  enquanto o risco que representava não se move.
- **Deteta regressões, não novidade.** Uma suite testa modos de falha conhecidos. Um jailbreak novo
  ou um ataque que a suite nunca imaginou passa a verde, porque nada no limiar foi construído para o
  ver.

Nada disto argumenta contra o limiar; argumenta sobre como o limiar deve ser executado. A suite de
avaliações é ela própria um artefato a ser governado: a sua cobertura medida, os seus casos mantidos
adversarialmente, os seus limiares rastreados até modos de falha nomeados em vez de números
redondos, e o seu tamanho definido pelo limiar que tem de resolver (o capítulo 14 mostra como
[dimensionar a suite a partir do limiar](/bok/governing-development#statistical-validity-of-evals)).
A mesma cautela aplica-se a
[benchmarks públicos e leaderboards](/bok/governing-deployment#what-public-benchmarks-and-leaderboards-cannot-tell-you),
que classificam um modelo em casos de terceiros em vez de na sua tarefa. E um limiar aprovado
*obriga* a monitorização em tempo de execução (camada 04) em vez de a substituir. Uma avaliação é o
controlo em tempo de construção; o guardrail e o rastreio são o controlo em tempo de execução,
contra as entradas que nenhuma avaliação antecipou. Uma disciplina que trata um limiar aprovado como
prova de segurança reconstruiu teatro de framework com um pipeline mais rápido.

> **Na prática**
> Dentro de uma grande operadora de telecomunicações, a diferença entre "governado" e "documentado"
> resumiu-se a essas três questões. Um inventário de modelos mantido manualmente respondeu à
> primeira questão no dia em que foi editado e estava errado dentro de uma semana. Ligar o registo
> ao pipeline de implantação (para que um novo modelo ou agente se registasse a si próprio, com um
> proprietário e um âmbito, no momento da implantação) foi o que tornou as três questões
> respondíveis em qualquer terça-feira. O documento tornou-se uma consulta.

**Correspondências:** Regulamento da IA Art. 9 (gestão de riscos), Art. 11/49/71 (documentação e
registo), Art. 55 (deveres de risco sistémico de GPAI) · ISO/IEC 42001 (sistema de gestão de IA) ·
NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Top 10 for Agentic Applications 2026. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[2] Salary & Jobs Report 2025-26. IAPP. 2025-08-03. https://iapp.org/resources/article/salary-survey-summary/ (verified: primary)
[3] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[4] "AI Governance Engineering". Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[5] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[6] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant to banking organisations above USD 30 billion in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[7] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models; effective challenge). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
