---
lang: pt
source: bok/09-glossary.md
sourceHash: "74f57d118a1f998ca0b0ad563a37274cb81318c198299053529a104759296753"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 09. Glossário

> As definições canónicas para o livro: cada termo definido uma vez, alfabeticamente, e referenciado
> cruzado ao capítulo que o trata completamente.

Os termos estão listados alfabeticamente sob títulos de letras, e cada definição tem no máximo 60
palavras. Quando um termo tem uma ortografia canónica no guia de estilo (§8), essa ortografia é
usada aqui e em todo o livro. Um termo retirado de uma lei, uma norma ou um artigo tem uma citação
`[n]`; um termo que o livro cunha não tem, e o seu capítulo é a sua fonte. As definições legais são
parafraseadas, e o texto citado governa. "Contraste com" nomeia os termos com os quais é mais
frequentemente confundido, "Ver" liga a secção que o desenvolve, e o parêntesis lista os capítulos
que o tratam. Cada termo também tem a sua própria página, ligada a partir do seu nome, com as suas
fontes, os capítulos que o usam e uma citação pronta.

## Pares frequentemente confundidos

Dez pares são confundidos com frequência suficiente em revisões para valer a pena corrigir no
vocabulário de uma equipa. A página de cada termo contém a mesma comparação.

| Par | A diferença | Por que importa para os controlos |
|---|---|---|
| [Transparência](/glossary/transparency) e [explicabilidade](/glossary/explainability) | O que aconteceu, a partir de registos do que correu, contra como uma decisão foi tomada | Dois artefatos: registo, fichas e registos para o primeiro; um método de explicação com um teste de fidelidade para o segundo |
| [Proveniência de dados](/glossary/data-provenance) e [linhagem de dados](/glossary/data-lineage) | De onde vieram os dados e em que termos, contra o caminho que percorreram através dos seus próprios pipelines | Linhagem perfeita sobre proveniência desconhecida ainda é não governada; apagamento e desistência precisam de ambas |
| [Desvio de dados](/glossary/data-drift) e [desvio de conceito](/glossary/concept-drift) | As entradas mudam, contra a relação entre entradas e a resposta correta mudando | O primeiro mostra em monitores de entrada antes de rótulos chegarem; o segundo apenas em resultados em rótulos frescos |
| [Incidente de IA](/glossary/ai-incident) e [questão (versus incidente)](/glossary/issue-versus-incident) | Dano aconteceu, contra um defeito ou desvio que não produziu um evento prejudicial | Incidentes iniciam relógios de comunicação e CAPA; questões vão para um backlog rastreado com um proprietário e uma data de vencimento |
| [Prestador](/glossary/provider) e [responsável pela implantação](/glossary/deployer) | Desenvolve o sistema e coloca-o no mercado sob o seu próprio nome, contra usa-o sob a sua própria autoridade | Deveres diferentes e evidência diferente; uma modificação substancial pode transformar um responsável pela implantação no prestador |
| [Humano no loop (HITL)](/glossary/human-in-the-loop-hitl) e [humano sobre o loop (HOTL)](/glossary/human-on-the-loop-hotl) | Uma pessoa aprova cada decisão consequente, contra uma pessoa monitora e pode parar o sistema | HITL é evidenciado por registos de aprovação e taxas de substituição; HOTL por alertas e um caminho de paragem testado |
| [Apetite de risco](/glossary/risk-appetite) e [tolerância de risco](/glossary/risk-tolerance) | Quanto risco a organização aceitará no geral, contra a banda residual que um sistema pode ter | O apetite é uma declaração do conselho compilada para dados; a tolerância é o limiar que um gate de implantação lê |
| [Ficha de modelo](/glossary/model-card) e [ficha de sistema](/glossary/system-card) | Documentação de um modelo, contra a do sistema implantado: modelos, prompts, recuperação, ferramentas, guardrails e supervisão | Responsáveis pela implantação e autoridades precisam da vista de sistema; uma ficha de modelo sozinha perde os controlos em torno do modelo |
| [Injeção de prompts](/glossary/prompt-injection) e [jailbreak](/glossary/jailbreak) | Qualquer entrada que altere o comportamento de formas não intencionais, direta ou oculta em conteúdo processado, contra entradas visando descartar as regras de segurança | Avaliações de jailbreak testam recusas; injeção também precisa de ferramentas de privilégio mínimo e isolamento de conteúdo não confiável |
| [Pseudonimização](/glossary/pseudonymisation) e [dados anónimos](/glossary/anonymous-data) | Re-atribuíveis com informação mantida separadamente, portanto ainda dados pessoais, contra não se relacionarem com uma pessoa identificável | Os dados pseudonimizados mantêm todos os deveres do RGPD; uma alegação de anonimato necessita de uma avaliação datada |

## A

**A2A (protocolo Agent2Agent).** Um protocolo aberto para agentes delegarem tarefas uns aos outros,
na versão 1.0 desde março de 2026 [129] e um projeto em Growth Stage da Agentic AI Foundation
dirigida pela Linux Foundation desde agosto de 2026 [130]. Os servidores devem autenticar cada
pedido, mas a autorização e o âmbito e revogação da autoridade concedida durante a tarefa ficam a
cargo do implementador [129]. Contraste com [MCP](/glossary/mcp). Veja
[cap. 23, Sistemas multi-agente e cadeias de delegação](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(cap. 23)

**Banda de abstenção.** Um intervalo de pontuações em que um sistema não atua por si próprio mas
encaminha o caso para um revisor humano. A sua largura é definida pelo nível de risco; o tamanho da
banda e a taxa de sobreposição dos revisores são monitorizados como sinais. A predição conformal
oferece uma forma de a dimensionar [20]. Veja
[cap. 11, Certeza exigida pelo nível de risco](/bok/ai-defined#certainty-required-by-risk-tier).
(cap. 11)

**Política de uso aceitável (AUP).** As regras dirigidas ao pessoal para utilizar ferramentas de IA:
quais as ferramentas aprovadas, quais as classes de dados que podem ir para onde, deveres de rever e
divulgar resultados, registo, atestação antes do acesso e consequências. É aplicada através de um
gateway sancionado e descoberta, não apenas o manual. Veja
[cap. 12, Uso aceitável de IA pelo pessoal](/bok/governance-program#acceptable-use-of-ai-by-staff);
[cap. 05, Padrão: Gateway de IA Sancionado](/patterns/sanctioned-ai-gateway). (cap. 05, 12)

**Adaptabilidade.** A capacidade de um sistema de IA alterar o seu comportamento durante a
utilização, através de aprendizagem após implantação; opcional na definição do Regulamento da IA da
UE [21]. Para a governação é um gatilho de mudança entre vários: a maioria das mudanças de
comportamento na prática vem de atualizações do fornecedor, desvio, edições de prompts ou
atualizações de corpus. Veja
[cap. 11, Do elemento de definição ao campo do registo](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11)

**ADMT (Califórnia).** Tecnologia de decisão automatizada sob as regulamentações CCPA da Califórnia:
tecnologia que processa informações pessoais e utiliza computação para substituir, ou substituir
substancialmente, a tomada de decisão humana. A sua utilização para decisões significativas
desencadeia deveres de notificação pré-utilização, exclusão ou apelação, acesso e avaliação de risco
[22]. Contraste com [Decisão automatizada (ADM)](/glossary/automated-decision-making-adm). Veja
[cap. 19, Estados Unidos](/bok/privacy-and-ai#united-states). (cap. 19)

**Notificação de ação adversa.** A notificação que um credor norte-americano deve dar quando nega ou
piora crédito, indicando as razões principais específicas [23]. As razões devem ser precisas mesmo
quando a decisão vem de um modelo complexo, portanto os códigos de razão necessitam de um teste de
fidelidade. Contraste com [Notificação de decisão](/glossary/decision-notice). Veja
[cap. 20, Crédito e empréstimo](/bok/existing-law#credit-and-lending). (cap. 16, 20)

**Rácio de impacto adverso (AIR).** A taxa de seleção de um grupo dividida pela taxa de seleção do
grupo mais selecionado. Sob as Diretrizes Uniformes norte-americanas um rácio abaixo de quatro
quintos é geralmente tratado como evidência de impacto adverso [24]; a prática de engenharia lê-o
como um gatilho para investigação, reportado com contagens e um intervalo de confiança. Veja
[cap. 16, A regra dos quatro quintos e o rácio de impacto adverso](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio).
(cap. 16)

**AESIA.** A Agencia Española de Supervisión de Inteligencia Artificial de Espanha, uma agência
estatal baseada em A Coruña cujo estatuto foi aprovado pelo Real Decreto 729/2023, criada para atuar
como autoridade supervisora nacional de Espanha para o Regulamento da IA [1]. Veja
[cap. 21, Espanha: AESIA, a sandbox e um projeto de lei](/bok/ai-laws-worldwide#spain-aesia-the-sandbox-and-a-bill).
(cap. 08, 21)

**Agente (IA agentic).** Um sistema de IA que atua (navega, executa código, chama APIs, move dados
ou delega a outros agentes) sob autoridade delegada, em vez de apenas produzir texto. Os agentes são
o objeto mais difícil de governar porque o seu comportamento é emergente e as suas ações têm efeitos
externos. Veja
[cap. 23, O que torna um agente um objeto de governação](/bok/governing-agents#what-makes-an-agent-a-governance-object);
[cap. 11, Sistemas agentic](/bok/ai-defined#agentic-systems). (cap. 01, 11, 23)

**Ficha de Agente.** O documento JSON que um agente A2A publica, geralmente em
`/.well-known/agent-card.json`, descrevendo a sua identidade, competências, ponto final de serviço e
os esquemas de autenticação que aceita. Pode ser assinado com JWS sobre uma forma canonicalizada,
para que um cliente possa verificar que a ficha não foi alterada e vem do fornecedor alegado [129].
Uma lista de permissão de pares admite apenas agentes registados com fichas verificadas. Veja
[cap. 23, Sistemas multi-agente e cadeias de delegação](/bok/governing-agents#multi-agent-systems-and-delegation-chains).
(cap. 23)

**Registo de agentes.** O inventário consciente do tempo de execução de cada ator não humano
(modelo, serviço e agente), cada um com um proprietário, um âmbito declarado, um estado e um kill
switch, alimentado por um caminho de dados de tempo de execução em vez de digitado manualmente. É o
artefato que responde "que IA está em execução?". Veja
[cap. 23, O registo de agentes](/bok/governing-agents#the-agent-registry);
[cap. 05, Padrão: Registo de Agentes](/bok/patterns#pattern-agent-registry). (cap. 04, 05, 06, 23)

**Regulamento da IA (UE).** Regulamento (UE) 2024/1689, a lei horizontal e estratificada por risco
da UE para IA, alterada pelo Omnibus Digital [2]. Classifica os sistemas por risco (proibido, risco
elevado, limitado, mínimo) e impõe obrigações em conformidade. Veja
[cap. 18, O Regulamento e o Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (cap. 08, 18)

**Operador de negócios de IA (Coreia).** Sob a Lei Básica de IA coreana, uma pessoa jurídica,
organização, indivíduo ou órgão estatal que faz negócios de IA, dividido em operadores de negócios
de desenvolvimento, que desenvolvem e fornecem IA, e operadores de negócios de utilização, que
oferecem produtos ou serviços construídos sobre ela [25]. Veja
[cap. 18, Os mesmos papéis em todos os regimes](/bok/eu-ai-act#the-same-roles-across-regimes). (cap.
18, 21)

**Comissão de governação de IA.** O órgão multifuncional que toma as decisões que um gate não
consegue: aceitar risco residual acima da autoridade de um proprietário de produto, conceder
exceções, pesar trade-offs de valor e aprovar o conjunto de políticas. Decide; os gates do pipeline
aplicam as suas decisões e registam a evidência. As agências federais norte-americanas executam tais
conselhos por mandato [26]. Veja
[cap. 12, A comissão decide, os gates aplicam](/bok/governance-program#the-committee-decides-the-gates-enforce).
(cap. 12)

**Engenheiro de governação da IA.** A pessoa que detém a capacidade de engenharia de governação da
IA e é responsável pelas três questões em produção; uma capacidade e um papel, não necessariamente
um título de trabalho. Veja
[cap. 06, Capacidade em primeiro lugar, título em segundo](/bok/the-role#capability-first-title-second).
(cap. 06)

**Engenharia de governação da IA.** A aplicação de prática de engenharia (pensamento sistémico,
pensamento de produto e código) à governação de sistemas de IA; medida por redução efetiva do risco
e evidência pronta para auditoria. Contraste com [IA Confiável](/glossary/trustworthy-ai). Veja
[cap. 01, A definição](/bok/definition#the-definition). (cap. 01)

**Dano de IA.** Uma consequência negativa de construir ou utilizar um sistema de IA para uma pessoa,
um grupo, uma organização, a sociedade ou o ambiente. O livro nomeia cada dano pelo nível em que
cai, o seu mecanismo, um modo de falha testável e o controlo que o apanha, mapeado para a taxonomia
do MIT AI Risk Repository [27]. Veja [Atlas de danos](/resources/harms). (cap. 03)

**Perigo de IA.** Na definição da OCDE, um evento ou série de eventos onde o desenvolvimento,
utilização ou mau funcionamento de um sistema de IA poderia plausivamente levar a um incidente de IA
[28]. Um perigo é dano que ainda não aconteceu; um quase-acidente é um perigo que um controlo
interrompeu. Contraste com [Incidente de IA](/glossary/ai-incident). Veja
[cap. 17, Incidente, perigo, questão e incidente grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Incidente de IA.** Na definição da OCDE, um evento ou série de eventos onde o desenvolvimento,
utilização ou mau funcionamento de um ou mais sistemas de IA leva direta ou indiretamente a dano à
saúde, infraestrutura crítica, direitos humanos ou fundamentais, propriedade, comunidades ou
ambiente [28]. Contraste com [Questão (versus incidente)](/glossary/issue-versus-incident),
[Perigo de IA](/glossary/ai-hazard) e [Incidente grave](/glossary/serious-incident). Veja
[cap. 17, Incidente, perigo, questão e incidente grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Literacia no domínio da IA.** Sob o Regulamento da IA da UE, as competências, conhecimento e
compreensão que permitem aos prestadores, responsáveis pela implantação e pessoas afetadas utilizar
IA de forma informada e compreender as suas oportunidades, riscos e possível dano. O artigo 4,
conforme alterado em 2026, exige que os prestadores e responsáveis pela implantação tomem medidas
para a apoiar, sem garantir qualquer nível individual [2]. Veja
[cap. 18, Literacia no domínio da IA e dados de detecção de enviesamento](/bok/eu-ai-act#ai-literacy-and-bias-detection-data);
[cap. 12, Literacia no domínio da IA como código](/bok/governance-program#ai-literacy-as-code).
(cap. 12, 18)

**Serviço para a IA.** O órgão da Comissão Europeia que supervisiona IA de finalidade geral e
coordena a aplicação do Regulamento da IA, com poderes de investigação e a capacidade de impor
penalidades aos prestadores de GPAI [2]. Veja
[cap. 18, Quem supervisiona o quê](/bok/eu-ai-act#who-supervises-what). (cap. 08, 18)

**Ambiente de testagem da regulamentação da IA.** Sob o Regulamento da IA da UE, um quadro
controlado estabelecido por uma autoridade competente em que os prestadores desenvolvem, treinam,
testam e validam sistemas de IA inovadores durante um tempo limitado sob um plano de sandbox,
possivelmente com testagem em condições reais. Cada Estado-Membro deve ter um operacional até 2 de
agosto de 2027 [2]. Contraste com
[Testagem em condições reais](/glossary/testing-in-real-world-conditions). Veja
[cap. 18, Sandboxes e testagem em condições reais](/bok/eu-ai-act#sandboxes-and-real-world-testing).
(cap. 18, 21)

**Funções do AI RMF.** As quatro funções principais do NIST AI Risk Management Framework
(**Govern, Map, Measure, Manage**), utilizadas em todo o livro como alvo de mapeamento para
controlos [3]. Veja
[cap. 22, O Núcleo: 19 categorias](/bok/principles-and-standards#the-core-19-categories). (cap.
08, 22)

**Playbook do AI RMF.** O companheiro online do NIST para o AI RMF. Para cada subcategoria fornece
uma nota About, ações sugeridas, questões de transparência e documentação e referências [29]. É
material voluntário para adaptar, não uma lista de verificação; as suas questões de documentação
funcionam bem como critérios de aceitação. Veja
[cap. 22, Como uma entrada do Playbook é estruturada](/bok/principles-and-standards#how-a-playbook-entry-is-structured).
(cap. 22)

**Perfil do AI RMF.** Uma aplicação do AI RMF Core a um contexto. O NIST descreve perfis de caso de
uso, perfis temporais (um perfil atual e um perfil alvo cuja lacuna guia o trabalho) e perfis
transversais como NIST AI 600-1 para IA generativa [30]. Veja
[cap. 22, Perfis e o Perfil de IA Generativa](/bok/principles-and-standards#profiles-and-the-generative-ai-profile).
(cap. 22)

**Sistema de IA.** Para fins de governação, o objeto que a definição de IA coloca no âmbito de
aplicação. Sob o Regulamento da IA da UE, um sistema baseado em máquinas concebido para funcionar
com alguma autonomia, possivelmente adaptável após implantação, que infere a partir da sua entrada
como gerar saídas que podem influenciar ambientes físicos ou virtuais [2][21]. A inferência
distingue-o do software baseado em regras. Ver
[cap. 11, Four definitions, compared](/bok/ai-defined#four-definitions-compared);
[cap. 18, What counts as an AI system](/bok/eu-ai-act#what-counts-as-an-ai-system). (cap. 11, 18)

**Avaliação de impacto do sistema de IA.** Uma avaliação de como um sistema de IA e as suas
aplicações razoavelmente previsíveis podem afetar indivíduos, grupos e sociedade, realizada ao longo
do ciclo de vida e atualizada conforme necessário; a ISO/IEC 42005:2025 fornece a orientação [17].
Contraste com [FRIA](/glossary/fria). Ver
[cap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(cap. 14)

**Ciclo de vida do sistema de IA (OCDE).** As fases iterativas da OCDE de um sistema de IA: planear
e conceber; recolher e processar dados; construir ou adaptar modelos; testar, avaliar, verificar e
validar; implantar; operar e monitorizar; reformar ou desativar [31]. A reforma pode ocorrer em
qualquer ponto durante a operação. Ver
[cap. 22, The OECD AI system definition and lifecycle](/bok/principles-and-standards#the-oecd-ai-system-definition-and-lifecycle).
(cap. 22)

**Falsificação de IA.** Exagerar ou inventar o uso ou capacidade de IA em comunicações de marketing
ou para investidores. Os reguladores dos EUA tratam-na como fraude; a SEC resolveu acusações contra
dois consultores de investimento sobre tais afirmações em março de 2024 [32]. Ver
[cap. 20, Unfair and deceptive practices in the United States](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states);
[cap. 05, Pattern: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (cap. 05, 20)

**AIBOM.** Lista de materiais de IA: o inventário legível por máquina dos componentes de um sistema
de IA (modelos, conjuntos de dados, dependências) em formatos como CycloneDX ML-BOM ou o perfil de
IA SPDX 3.0. Ver [cap. 05, Pattern: AIBOM](/bok/patterns#pattern-aibom). (cap. 04, 05)

**AICM.** A Matriz de Controlos de IA da CSA, um quadro de controlo (v1.1, 247 objetivos de controlo
em 18 domínios) que mapeia para ISO 42001, ISO 27001 e NIST AI RMF e fundamenta STAR for AI [4]. Ver
[cap. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (cap. 08)

**AIMA.** A Avaliação de Maturidade de IA da OWASP, reportada na v1.0 (ago 2025), que classifica a
amplitude de um programa de segurança e governação de IA em domínios [5]. Ver
[cap. 07, How this relates to certification and other assessments](/bok/maturity-model#how-this-relates-to-certification-and-other-assessments).
(cap. 07)

**AIMS.** Um sistema de gestão de IA: a estrutura de governação, funções, controlos e ciclo de
melhoria contínua que a ISO/IEC 42001 certifica. Um AIMS não é o sistema de gestão da qualidade do
Artigo 17 do Regulamento da IA. Contraste com [QMS (Art. 17)](/glossary/qms-art-17). Ver
[cap. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio).
(cap. 07, 08, 22)

**Disgorgement algorítmico.** Uma medida que ordena a eliminação de modelos ou algoritmos
desenvolvidos com dados obtidos ilicitamente, não apenas os dados em si [33]. O cumprimento e a sua
comprovação requerem rastreabilidade de cada conjunto de dados para cada modelo treinado com ele.
Ver
[cap. 20, Claims substantiation and algorithmic disgorgement](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[cap. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (cap.
05, 20)

**Avaliação de Impacto Algorítmico (AIA).** A avaliação que a Diretiva do Canadá sobre Decisões
Automatizadas exige antes de um sistema federal de decisão automatizada entrar em produção. Define
um nível de impacto de I a IV que dimensiona as salvaguardas necessárias, é publicada no Portal do
Governo Aberto e é atualizada quando o sistema muda [34]. Ver
[cap. 21, Canada: after AIDA, the Directive on Automated Decision-Making](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making);
[cap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(cap. 14, 21)

**Gestão algorítmica.** O uso de sistemas de monitorização e decisão automatizados para dirigir,
avaliar ou sancionar trabalhadores. A Diretiva da UE sobre Trabalho em Plataforma limita os dados
que tais sistemas podem processar e exige transparência, supervisão humana e direito a revisão
humana [35]. Ver [cap. 20, Employment](/bok/existing-law#employment). (cap. 20)

**Norma de Registo de Transparência Algorítmica (ATRS).** O modelo de norma do Reino Unido para
organismos do setor público publicarem como e por que utilizam ferramentas algorítmicas; obrigatório
para departamentos governamentais e para organismos autónomos que prestam serviços públicos ou de
primeira linha [36]. Ver
[cap. 21, United Kingdom: principles, regulators and public-sector records](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records).
(cap. 21)

**ALTAI.** A Lista de Avaliação para IA Confiável, publicada pelo Grupo de Peritos de Alto Nível da
UE em IA em julho de 2020: uma lista de verificação de auto-avaliação que transforma os sete
requisitos das Diretrizes de Ética de 2019 em questões [37]. Útil como fonte de controlos
candidatos; respondida uma vez, é apenas uma atestação. Ver
[cap. 22, EU HLEG guidelines and ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(cap. 11, 22)

**Anexo I (Regulamento da IA).** O anexo do Regulamento da IA que lista a legislação de harmonização
da União sob a qual a IA está incorporada em produtos regulados (máquinas, dispositivos médicos,
brinquedos e similares); as obrigações para estes sistemas de alto risco incorporados entram em
vigor a partir de 2 de agosto de 2028 sob a cronologia do Omnibus Digital [2]. Contraste com
[Anexo III](/glossary/annex-iii). Ver
[cap. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(cap. 08, 18)

**Anexo III.** O anexo do Regulamento da IA que lista casos de uso de alto risco (biometria,
infraestrutura crítica, educação, emprego, serviços essenciais, aplicação da lei, migração,
justiça); as obrigações para estes entram em vigor sob a cronologia do Omnibus Digital [2].
Contraste com [Anexo I (Regulamento da IA)](/glossary/annex-i-eu-ai-act). Ver
[cap. 18, High-risk through use (Annex III)](/bok/eu-ai-act#high-risk-through-use-annex-iii). (cap.
08, 18)

**Dados anónimos.** Informações que não se relacionam com uma pessoa identificável, avaliadas em
relação a todos os meios razoavelmente suscetíveis de serem utilizados por qualquer pessoa para a
identificar [38]. Caem fora do RGPD, mas a alegação decai à medida que dados auxiliares e técnicas
de re-identificação melhoram, pelo que necessitam de uma avaliação datada. Contraste com
[Pseudonimização](/glossary/pseudonymisation). Ver
[cap. 19, Anonymisation versus pseudonymisation](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(cap. 19)

**Filtro do Artigo 6(3).** A derrogação sob a qual um sistema do Anexo III não é de alto risco
quando não apresenta risco significativo de dano e cumpre uma de quatro condições (tarefa processual
estreita, melhorar trabalho humano concluído, detetar padrões, tarefa preparatória). A definição de
perfis de pessoas singulares derrota-a sempre; o prestador documenta e regista a avaliação [2].
Contraste com [Profiling override](/glossary/profiling-override). Ver
[cap. 18, The Annex III filter and the profiling override](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: EU AI Act role and risk-class triage](/toolkit/ai-act-triage). (cap. 18)

**ASI01–ASI10.** Os dez riscos do OWASP Top 10 para Aplicações Agentes 2026 [6]: ASI01 Agent Goal
Hijack, ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply
Chain Vulnerabilities, ASI05 Unexpected Code Execution (RCE), ASI06 Memory & Context Poisoning,
ASI07 Insecure Inter-Agent Communication, ASI08 Cascading Failures, ASI09 Human-Agent Trust
Exploitation e ASI10 Rogue Agents. Ver
[cap. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls);
[cap. 08, OWASP GenAI Security Project](/bok/regulatory-map#owasp-genai-security-project). (cap. 05,
08, 23)

**ATLAS.** A Paisagem de Ameaça Adversária da MITRE para Sistemas de Inteligência Artificial, uma
base de conhecimento de táticas e técnicas de adversários contra IA, incluindo técnicas específicas
de agentes [7]. Ver
[cap. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[cap. 23, Threats mapped to controls](/bok/governing-agents#threats-mapped-to-controls). (cap. 05,
10, 15, 23)

**Evidência pronta para auditoria.** Evidência emitida como subproduto da construção numa forma que
um auditor pode ler diretamente (legível por máquina, assinada, com carimbo de data/hora), para que
a auditoria seja uma consulta, não um projeto de recolha. Ver
[cap. 01, Three clarifiers](/bok/definition#three-clarifiers). (cap. 01, 04)

**Mandatário.** Sob o Regulamento da IA da UE, uma pessoa estabelecida na União com um mandato
escrito de um prestador não-UE de um sistema de IA de alto risco ou modelo de IA de finalidade geral
para executar as obrigações desse prestador em seu nome, incluindo manter a documentação disponível
para as autoridades [2]. Ver [cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles).
(cap. 18)

**Decisão automatizada (ADM).** Uma decisão sobre uma pessoa tomada por meios automatizados. O
Artigo 22 do RGPD restringe decisões baseadas unicamente no processamento automatizado com efeitos
legais ou significativos semelhantes [38]; após a sentença SCHUFA, uma pontuação que os credores
tratam como determinante é em si uma tal decisão [39]. Ver
[cap. 19, GDPR Article 22 after SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa). (cap.
16, 19)

**Viés de automação.** A tendência de uma pessoa de confiar excessivamente na saída de um sistema
automatizado. O Artigo 14 do Regulamento da IA da UE pede que as pessoas que supervisionem sistemas
de alto risco se mantenham conscientes disso [2]; a porta humana regista o aprovador, o tempo para
decidir e a taxa de sobreposição para que a supervisão degradada seja visível. Ver
[cap. 11, Certainty required by risk tier](/bok/ai-defined#certainty-required-by-risk-tier);
[cap. 04, Designing human oversight (Article 14)](/bok/the-stack#designing-human-oversight-article-14);
[cap. 23, What a good approval looks like](/bok/governing-agents#what-a-good-approval-looks-like).
(cap. 04, 11, 23)

**Autonomia.** Nos textos do Regulamento da IA da UE e da OCDE, algum grau de independência de ação
do envolvimento humano, que quase todos os sistemas de IA têm. A ISO/IEC 22989 usa a palavra para
uma propriedade muito mais forte, um sistema que pode mudar o seu próprio objetivo ou domínio de
uso, e chama o caso ordinário automação [40]. Contraste com
[Nível de autonomia](/glossary/autonomy-level). Ver
[cap. 11, ISO/IEC 22989](/bok/ai-defined#isoiec-22989). (cap. 11, 23)

**Nível de autonomia.** Até que ponto um agente atua sem uma pessoa entre os seus passos, definido
pelo responsável pela implantação como uma decisão de conceção em vez de ser tomado como uma
propriedade do modelo; uma escala de investigação nomeia cinco níveis pelo papel do utilizador, de
operador a observador [122]. É um campo de registo vinculado a um conjunto de controlo mínimo, e
elevá-lo é uma mudança revista. Contraste com [Autonomia](/glossary/autonomy). Ver
[cap. 23, Autonomy is a design decision](/bok/governing-agents#autonomy-is-a-design-decision). (cap.
15, 17, 23)

## B

**Viés.** Um erro sistemático que favorece ou prejudica algumas pessoas ou resultados. A NIST
classifica o viés de IA em três categorias: sistémico, estatístico e computacional, e humano [41]. O
viés pode entrar em qualquer fase do ciclo de vida, pelo que é testado por fase em vez de uma única
vez. Contraste com [Equidade](/glossary/fairness). Ver
[cap. 16, Where bias enters the lifecycle](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle).
(cap. 16)

**Auditoria de enviesamento (Lei Local de Nova Iorque 144).** Uma auditoria independente,
obrigatória no ano anterior a um empregador utilizar uma ferramenta de decisão de emprego
automatizada em Nova Iorque, que relata taxas de seleção ou pontuação e rácios de impacto por sexo,
raça e etnia e as suas intersecções; o seu resumo deve ser publicado [42]. Ver
[cap. 20, Emprego](/bok/existing-law#employment);
[cap. 14, Avaliações de impacto comparadas](/bok/governing-development#impact-assessments-compared).
(cap. 14, 20)

**Dados biométricos.** Dados pessoais do processamento técnico de características físicas,
fisiológicas ou comportamentais que permite ou confirma a identificação única de uma pessoa, como
imagens faciais ou impressões digitais [38]. A identificação, verificação e categorização são
tratadas de forma diferente no RGPD, no Regulamento da IA e noutras leis. Ver
[cap. 19, Biometria](/bok/privacy-and-ai#biometrics). (cap. 19)

**Post-mortem sem culpa.** Uma revisão de incidente que identifica causas contribuintes sem
incriminar qualquer indivíduo ou equipa, com base na premissa de que as pessoas agiram razoavelmente
com o conhecimento que tinham e que os sistemas e processos são o que pode ser corrigido [43]. Os
seus acionadores são definidos antecipadamente. Ver [cap. 17, Técnicas](/bok/incidents#techniques).
(cap. 17)

**Implementação azul-verde.** Dois ambientes de produção idênticos com tráfego comutado entre eles,
para que uma versão possa ser revertida comutando de volta [44]. Oferece a um sistema de IA um
caminho testado e instantâneo para a versão anterior. Contraste com
[Lançamento canário](/glossary/canary-release). Ver
[cap. 15, Entrega progressiva como controlo](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Padrão: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 15)

**Proveniência de compilação (SLSA).** Um registo verificável, no formato SLSA, do que compilou um
artefato, por que processo e a partir de quais entradas de nível superior. Os seus níveis de
compilação variam de L1, proveniência existe, até L2, assinado por uma plataforma de compilação
alojada, até L3, compilações endurecidas cuja proveniência é muito difícil de falsificar [136]. Para
um modelo, as entradas incluem o resumo do modelo base e registos de admissão de conjuntos de dados.
Contraste com [Assinatura de modelo](/glossary/model-signing). Ver
[cap. 05, Padrão: Model Artefact Integrity](/patterns/model-artefact-integrity). (cap. 05)

## C

**CAC (Administração do Ciberespaço da China).** O regulador da internet da China (国家互联网信息办公室),
principal emissor das regras de IA vinculativas (recomendação algorítmica, síntese profunda,
serviços de IA generativa e rotulagem de conteúdo de IA) e o organismo sob cuja orientação o TC260
publica o AI Safety Governance Framework [18]. Ver
[cap. 21, China: o que o capítulo 08 ainda não cobre](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(cap. 08, 21)

**Calibração.** A propriedade de que a confiança de um modelo corresponde à sua precisão: dos casos
pontuados em 0,9, cerca de nove em dez estão corretos. As redes neurais modernas são frequentemente
mal calibradas [45], portanto a calibração é medida no eval gate por versão e subgrupo antes de
qualquer limiar ser confiável. Contraste com
[Calibração dentro de grupos](/glossary/calibration-within-groups). Ver
[cap. 11, Calibração antes de limiares](/bok/ai-defined#calibration-before-thresholds). (cap. 11)

**Calibração dentro de grupos.** A propriedade de equidade de que, em cada grupo, as pessoas com uma
pontuação s resultam positivas à taxa s, para que uma pontuação signifique a mesma coisa para todos.
Geralmente entra em conflito com taxas de erro iguais quando as taxas base diferem [46]. Contraste
com [Calibração](/glossary/calibration) e [Probabilidades equalizadas](/glossary/equalised-odds).
Ver
[cap. 16, Os resultados da impossibilidade](/bok/fairness-and-explainability#the-impossibility-results).
(cap. 16)

**Lançamento canário.** Uma implementação parcial e limitada no tempo de uma alteração para uma
pequena parte do tráfego de produção, avaliada em relação a um grupo de controlo antes do lançamento
continuar {[47]}. Para sistemas de IA, a avaliação compara métricas de qualidade, segurança e
equidade ao vivo com critérios de reversão pré-registados. Contraste com
[Implementação de sombra](/glossary/shadow-deployment) e
[Implementação azul-verde](/glossary/blue-green-deployment). Ver
[cap. 15, Entrega progressiva como controlo](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Padrão: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 14, 15, 23)

**CAPA.** Ação corretiva e preventiva, o resultado de uma revisão de incidente. A ação corretiva
corrige esta instância; a ação preventiva impede que a classe de falha recorra em toda a frota,
tipicamente como uma avaliação de regressão, uma mudança de política e uma atualização do registo de
riscos, verificada antes do incidente fechar [48]. Ver
[cap. 17, CAPA: do incidente ao registo de riscos e suite de avaliação](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite).
(cap. 17)

**Esquecimento catastrófico.** A tendência das redes neurais de perder competência anterior quando
treinadas em novas tarefas {[49]}. É uma razão pela qual cada retreinamento é um evento de mudança
que re-executa a suite de avaliação completa, não apenas os testes para a nova capacidade. Ver
[cap. 11, Oito características que quebram a governação clássica de TI](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(cap. 11)

**Sobreposição de severidade catastrófica.** A regra de que qualquer cenário classificado no nível
de severidade superior é Crítico independentemente da sua probabilidade, não pode ser aceite pela
equipa de entrega e deve ser eliminado, reduzido em severidade ou aceite explicitamente pelo
organismo governante por um período fixo. O NIST pede que tais riscos possam ser cessados com
segurança {[30]}. Ver
[cap. 13, A sobreposição de severidade catastrófica](/bok/risk-management#the-catastrophic-severity-override).
(cap. 13)

**Marcação CE.** A marca que mostra a conformidade de um sistema de IA de risco elevado com o
Regulamento da IA da UE, afixada de forma visível, legível e indelével, ou digitalmente para
sistemas fornecidos digitalmente, com o número do organismo notificado quando um foi envolvido
{[2]}. Contraste com [Declaração de conformidade da UE](/glossary/eu-declaration-of-conformity). Ver
[cap. 18, Avaliação de conformidade, declaração, marcação e registo](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[cap. 14, Conformidade do Regulamento da IA da UE, por ordem](/bok/governing-development#eu-ai-act-conformity-in-order).
(cap. 14, 18)

**Cedar.** Uma linguagem de política de código aberto para autorização de granularidade fina,
utilizada como motor de política como código para decisões de acesso em tempo de execução; uma
alternativa tipada por esquema e analisável para `OPA/Rego`. Contraste com
[OPA/Rego](/glossary/opa-rego). Ver
[cap. 06, Política como código e gates](/bok/the-role#policy-as-code-and-gates). (cap. 04, 05, 06)

**CEN-CENELEC JTC 21.** O comité técnico conjunto das organizações de normalização europeias CEN e
CENELEC que elabora as normas harmonizadas do Regulamento da IA, incluindo EN 18286 sobre gestão da
qualidade e os projetos sobre gestão de riscos, confiabilidade e cibersegurança {[50]}. Ver
[cap. 22, O programa JTC 21](/bok/principles-and-standards#the-jtc-21-programme). (cap. 22)

**CIMD.** Client ID Metadata Document: o mecanismo pelo qual um cliente OAuth se identifica com um
URL, utilizado como seu ID de cliente, que aponta para o seu documento de metadados. A especificação
MCP de 2026-07-28 tem clientes e servidores de autorização a apoiá-lo e deprecia o Registo Dinâmico
de Clientes {[8]}; a especificação IETF é ainda um Internet-Draft (revisão 02, 6 Jul 2026) a partir
de 2026-09-24 {[132]}. Ver
[cap. 23, Autorização MCP a partir de 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28);
[cap. 04, Camada 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 04, 05, 23)

**Registo de afirmações.** O registo de cada declaração pública sobre a precisão, equidade,
segurança ou capacidade de um sistema de IA: a redação exata, onde aparece, e a execução de
avaliação, valor medido, intervalo e população por trás dela. A cópia que contém uma afirmação cuja
evidência está em falta, desatualizada ou falhando não é publicada; a FTC exige evidência competente
e confiável para tais afirmações quando são feitas {[139]}. Ver
[cap. 20, Substantiação de afirmações e disgorgement algorítmico](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement);
[cap. 05, Padrão: Claims Substantiation Gate](/patterns/claims-substantiation-gate). (cap. 05, 20)

**Registo de decisão de classificação.** Um registo de registo versionado de por que um sistema se
situa num dado degrau da escada de risco do Regulamento da IA: o ponto do Anexo III, qualquer
condição do Artigo 6(3) em que se baseia, uma bandeira de definição de perfis explícita, o revisor e
a data {[2]}. É re-avaliado sempre que a finalidade prevista muda. Contraste com
[Sobreposição de definição de perfis](/glossary/profiling-override). Ver
[cap. 18, O filtro do Anexo III e a sobreposição de definição de perfis](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: Triagem de papel e classe de risco do Regulamento da IA da UE](/toolkit/ai-act-triage).
(cap. 18)

**Especificações comuns.** Especificações técnicas que a Comissão pode adotar por ato de execução
sob o Artigo 41 do Regulamento da IA quando um pedido de normalização não é aceite, as normas estão
atrasadas ou abordam insuficientemente preocupações com direitos fundamentais; estar em conformidade
com elas também dá uma presunção de conformidade {[2]}. Contraste com
[Norma harmonizada](/glossary/harmonised-standard). Ver
[cap. 22, Como funciona a presunção de conformidade](/bok/principles-and-standards#how-presumption-of-conformity-works).
(cap. 22)

**Desvio de conceito.** Uma mudança na relação entre as entradas de um sistema e a saída correta,
para que a mesma entrada deva agora obter uma resposta diferente {[51]}. Ao contrário da desvio de
dados, mostra-se apenas em resultados: em produção aparece no desempenho em rótulos frescos e em
testes de ponto de mudança na taxa de erro. Contraste com [Desvio de dados](/glossary/data-drift).
Ver [cap. 11, Pares de contraste](/bok/ai-defined#contrast-pairs);
[cap. 15, Desvio: o que se move e como vê-lo](/bok/governing-deployment#drift-what-moves-and-how-to-see-it).
(cap. 11, 15)

**Predição conformal.** Um método livre de distribuição que transforma a saída de um modelo treinado
num conjunto de respostas candidatas que contém a correta com uma probabilidade escolhida {[20]}. Um
conjunto grande sinaliza incerteza que uma regra de governação pode encaminhar. Ver
[cap. 11, Calibração antes de limiares](/bok/ai-defined#calibration-before-thresholds). (cap. 11)

**Avaliação de conformidade.** O procedimento pelo qual um prestador mostra que um sistema de IA de
risco elevado cumpre o Regulamento da IA da UE antes de o colocar no mercado: controlo interno para
a maioria dos sistemas do Anexo III, um organismo notificado para alguns sistemas biométricos, e o
procedimento setorial para produtos do Anexo I {[2]}. Precede a declaração, marcação CE e registo.
Ver
[cap. 18, Avaliação de conformidade, declaração, marcação e registo](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[cap. 14, Conformidade do Regulamento da IA da UE, por ordem](/bok/governing-development#eu-ai-act-conformity-in-order).
(cap. 14, 18)

**Proveniência de conteúdo (C2PA).** Informações assinadas e à prova de adulteração sobre de onde
veio um conteúdo e como foi editado, vinculadas ao ativo. A especificação C2PA a empacota como um
manifesto de afirmações, uma afirmação e uma assinatura de afirmação {[52]}; o NIST trata o
rastreamento de proveniência como uma abordagem para a transparência de conteúdo sintético {[53]}.
Contraste com [Marca de água](/glossary/watermarking) e
[Proveniência de dados](/glossary/data-provenance). Ver
[cap. 20, Deepfakes e mídia sintética](/bok/existing-law#deepfakes-and-synthetic-media). (cap.
18, 20)

**Caminho de contestação.** A rota pela qual uma pessoa afetada por uma decisão automatizada chega a
um revisor que não tomou a decisão original, vê as entradas, as razões e as representações da
pessoa, e pode alterar o resultado, com o resultado escrito de volta no registo de decisão. É como o
direito de contestação do artigo 22.º, n.º 3 do RGPD é honrado na prática [38]. Contraste com
[Contestabilidade](/glossary/contestability). Ver
[cap. 19, Artigo 22.º do RGPD após SCHUFA](/bok/privacy-and-ai#gdpr-article-22-after-schufa);
[cap. 05, Padrão: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (cap. 05,
19, 22)

**Contestabilidade.** A capacidade de uma pessoa afetada por uma decisão apoiada por IA de a
contestar e obter uma resposta que a possa alterar. O artigo 22.º, n.º 3 do RGPD confere um direito
de contestação apenas para decisões totalmente automatizadas [38], e os princípios da OCDE pedem que
as pessoas adversamente afetadas possam contestar um resultado [31]. Contraste com
[Recurso](/glossary/recourse) e [Caminho de contestação](/glossary/contest-path). Ver
[cap. 16, Os ganchos legais para explicações](/bok/fairness-and-explainability#the-legal-hooks-for-explanations);
[cap. 05, Padrão: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (cap. 05,
12, 16)

**Garantia contínua.** Garantia produzida continuamente a partir de telemetria em vez de num ponto
no tempo; o estado do controlo é uma consulta em direto, não uma aprovação anual. É o Nível 5 do
modelo de maturidade. Ver
[cap. 05, Padrão: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry).
(cap. 04, 05, 07)

**Fator contribuinte.** Uma propriedade de um sistema ou do seu contexto (autonomia, exposição,
reversibilidade, grupos vulneráveis, sensibilidade dos dados, opacidade) que move a probabilidade ou
a gravidade de um risco sem o criar [30]. É capturada como campos de registo na admissão para que
uma política possa calcular o nível. Contraste com [Fonte de risco](/glossary/risk-source). Ver
[cap. 13, Fatores contribuintes e o perfil de risco do caso de uso](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile).
(cap. 13)

**Responsável pelo tratamento e subcontratante.** Sob o RGPD, o responsável pelo tratamento decide
os fins e os meios do tratamento e assume a maioria das obrigações; o subcontratante atua de acordo
com as suas instruções documentadas [38]. Um fornecedor de IA que serve a sua inferência é
normalmente um subcontratante, mas torna-se um responsável pelo tratamento para qualquer utilização
dos seus dados que decida, como treino. Contraste com [Sub-subcontratante](/glossary/sub-processor).
Ver
[cap. 19, Responsável pelo tratamento, subcontratante ou responsável pelo tratamento conjunto](/bok/privacy-and-ai#controller-processor-or-joint-controller).
(cap. 19)

**Explicação contrafactual.** Uma explicação que indica a menor alteração à entrada que teria
alterado o resultado, restrita a características que a pessoa pode realmente alterar [54]. É a base
natural para recurso. Contraste com [Equidade contrafactual](/glossary/counterfactual-fairness). Ver
[cap. 16, Explicações contrafactuais](/bok/fairness-and-explainability#counterfactual-explanations).
(cap. 16)

**Equidade contrafactual.** O requisito de que uma decisão sobre um indivíduo seja a mesma num mundo
contrafactual onde o indivíduo pertencesse a um grupo diferente, definido através de um modelo
causal [55]; aproximado na prática por testes de inversão contrafactual. Contraste com
[Explicação contrafactual](/glossary/counterfactual-explanation) e
[Teste de inversão contrafactual](/glossary/counterfactual-flip-test). Ver
[cap. 16, Equidade individual e contrafactual](/bok/fairness-and-explainability#individual-and-counterfactual-fairness).
(cap. 16)

**Teste de inversão contrafactual.** Um teste que altera apenas um atributo protegido numa entrada,
ou troca termos de identidade em prompts idênticos, e mede com que frequência o resultado ou a
qualidade da resposta muda. É a aproximação prática da equidade contrafactual [55] e executa na
suite de avaliação de equidade. Contraste com
[Equidade contrafactual](/glossary/counterfactual-fairness). Ver
[cap. 16, Equidade individual e contrafactual](/bok/fairness-and-explainability#individual-and-counterfactual-fairness);
[cap. 05, Padrão: Fairness Eval Suite](/patterns/fairness-eval-suite). (cap. 05, 16)

## D

**Ficha de dados.** Documentação estruturada e versionada de um conjunto de dados (proveniência,
base legal, direitos, composição e limitações conhecidas) mantida como código ao lado do sistema.
Contraste com [Datasheet for datasets](/glossary/datasheet-for-datasets). Ver
[cap. 04, Governação de dados em todo o stack](/bok/the-stack#data-governance-across-the-stack).
(cap. 04)

**Desvio de dados.** Uma alteração na distribuição das entradas que um sistema vê em produção em
relação aos dados em que foi validado, como um novo segmento de cliente ou um formulário a montante
alterado [51]. Mostra-se nas entradas antes de qualquer rótulo chegar, portanto é monitorizado
diretamente. Contraste com [Desvio de conceito](/glossary/concept-drift). Ver
[cap. 11, Pares de contraste](/bok/ai-defined#contrast-pairs). (cap. 11, 15)

**Linhagem de dados.** O registo de como os dados se moveram e alteraram através dos pipelines de
uma organização. A linhagem regressiva mostra o que alimentou um modelo; a linhagem progressiva
mostra quais os modelos que utilizaram um conjunto de dados, quais os pedidos de apagamento e
retiradas de licença que precisam. OpenLineage é um padrão aberto para emiti-la [56]. Contraste com
[Proveniência de dados](/glossary/data-provenance). Ver
[cap. 14, Proveniência versus linhagem](/bok/governing-development#provenance-versus-lineage).
(cap. 14)

**Minimização de dados.** O princípio do RGPD de que os dados pessoais devem ser adequados,
relevantes e limitados ao que o fim necessita [38]. Para IA é argumentado característica por
característica, aplicado a snapshots de treino, índices de recuperação, registos e conjuntos de
avaliação, e evidenciado por justificações de características e registos de filtro. Ver
[cap. 19, Minimização, privacidade desde a conceção e PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(cap. 19)

**Proveniência de dados.** Informação sobre as entidades, atividades e pessoas envolvidas na
produção de dados, utilizada para avaliar a sua qualidade e confiabilidade [57]. Na prática: de onde
um conjunto de dados veio originalmente e em que termos (fonte, licença, base legal). Linhagem
perfeita sobre proveniência desconhecida ainda é não governada. Contraste com
[Linhagem de dados](/glossary/data-lineage). Ver
[cap. 14, Proveniência versus linhagem](/bok/governing-development#provenance-versus-lineage);
[cap. 12, Atualizar as políticas que já tem](/bok/governance-program#updating-the-policies-you-already-have).
(cap. 12, 14)

**Porta de admissão de conjunto de dados.** Um controlo de pipeline que deixa uma tarefa de treino
ler apenas conjuntos de dados cujo registo de admissão está completo e assinado pelo proprietário
dos dados: base legal ou licença, verificações de reserva, resultados de qualidade, proveniência,
utilizações permitidas e retenção. Evidencia as práticas de governação de dados do artigo 10.º do
Regulamento da IA [2]. Ver
[cap. 14, Proprietários, curadores e a porta de admissão](/bok/governing-development#owners-stewards-and-the-admission-gate);
[cap. 05, Padrão: Dataset Admission Gate](/patterns/dataset-admission-gate). (cap. 05, 14)

**Datasheet for datasets.** Documentação que acompanha um conjunto de dados com a sua motivação,
composição, processo de recolha, pré-processamento, utilizações, distribuição e manutenção, conforme
proposto por Gebru e colegas [58]; o acompanhamento legível por humanos do registo de admissão do
conjunto de dados e da ficha de dados. Contraste com [Ficha de dados](/glossary/data-card). Ver
[cap. 14, Fichas de modelo, fichas de sistema e datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets).
(cap. 14)

**Aviso de decisão.** O aviso que uma pessoa recebe no ponto de uma decisão automatizada ou apoiada
por IA, prestado a partir de um modelo versionado e do registo de decisão: que um sistema foi
utilizado, as razões principais e o que a pessoa pode fazer até quando. O conteúdo segue cada
regime, como aviso de utilização sob o artigo 26.º, n.º 11 do Regulamento da IA ou razões sob a
Regulação B dos EUA [2][23]. Contraste com [Aviso de ação adversa](/glossary/adverse-action-notice).
Ver
[cap. 18, Deveres do responsável pela implantação (Artigo 26.º)](/bok/eu-ai-act#deployer-duties-article-26);
[cap. 05, Padrão: Decision Notice & Contest Path](/patterns/decision-notice-contest-path). (cap. 05,
08, 18)

**Limiar de decisão.** A pontuação acima ou abaixo da qual uma saída de IA dispara uma ação. É onde
o apetite de risco se torna comportamento, portanto é governado como uma política com um
proprietário, versão e data efetiva, testado na porta de avaliação e registado com cada decisão; o
Regulamento da IA pede métricas de precisão declaradas [2]. Ver
[cap. 11, Uma pontuação não é uma decisão](/bok/ai-defined#a-score-is-not-a-decision). (cap. 11)

**Desativação.** A reforma planeada de um sistema de IA: análise de dependência, fallback e
transição, avisos de encerramento, um snapshot de evidência final, arquivo ou eliminação de pesos e
dados, revogação de cada identidade, e uma entrada de registo marcada como retirada em vez de
eliminada. NIST pede que os sistemas sejam eliminados com segurança [29]. Ver
[cap. 15, Reforma e desativação](/bok/governing-deployment#retirement-and-decommissioning);
[cap. 05, Padrão: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(cap. 05, 15)

**Falsificação profunda.** Sob o Regulamento da IA da UE, uma falsificação profunda é conteúdo de
imagem, áudio ou vídeo gerado ou manipulado por IA que se assemelha a pessoas, objetos, lugares,
entidades ou eventos existentes e pareceria falsamente autêntico a uma pessoa; os responsáveis pela
implantação devem divulgá-la, com deveres mais leves para arte ou sátira evidentes [2]. Contraste
com [Proveniência de conteúdo (C2PA)](/glossary/content-provenance-c2pa). Ver
[cap. 20, Falsificações profundas e media sintético](/bok/existing-law#deepfakes-and-synthetic-media);
[cap. 18, Casos de transparência (Artigo 50.º)](/bok/eu-ai-act#transparency-cases-article-50). (cap.
18, 20)

**Delegação (troca de token OAuth).** Em RFC 8693, o modo em que uma parte atua por outra enquanto
ambas permanecem identificáveis: o token nomeia o sujeito e, na sua reclamação de ato, o ator atual,
com reclamações de ato aninhadas para atores anteriores [123]. Sob representação o ator torna-se
indistinguível do sujeito. Um agente deve manter um token delegado e mais estreito, nunca o próprio
do utilizador. Contraste com [Cadeia de delegação](/glossary/delegation-chain) e
[Passagem de token](/glossary/token-passthrough). Ver
[cap. 23, Delegação sem representação](/bok/governing-agents#delegation-without-impersonation).
(cap. 23)

**Cadeia de delegação.** A sequência de agentes por que uma tarefa passa desde a pessoa ou sistema
que a iniciou. É governada para que cada salto se autentique como ele próprio, o âmbito se estreite
ou permaneça igual mas nunca se alargue, o fim viaje com a tarefa, a profundidade e a dispersão
sejam limitadas, e um rastreio abrange cada salto. Contraste com
[Delegação (troca de token OAuth)](/glossary/delegation-oauth-token-exchange). Ver
[cap. 23, Responsabilidade entre saltos](/bok/governing-agents#accountability-across-hops).
(cap. 23)

**Paridade demográfica.** Um critério de equidade de grupo que se mantém quando a taxa de decisões
positivas é igual entre grupos; a razão de impacto adverso é a sua forma de razão. Ignora diferenças
nas taxas de base [59]. Contraste com [Probabilidades equalizadas](/glossary/equalised-odds). Ver
[cap. 16, Métricas de equidade de grupo](/bok/fairness-and-explainability#group-fairness-metrics).
(cap. 16)

**Responsável pela implantação.** Sob o Regulamento da IA da UE, quem quer que utilize um sistema de
IA sob a sua própria autoridade, exceto numa atividade puramente pessoal e não profissional [2].
Para sistemas de risco elevado segue as instruções de utilização, equipa supervisão, monitora,
mantém registos, informa as pessoas afetadas e, em casos listados, realiza a AIPD. O rótulo nomeia
uma tarefa, não um tipo de organização. Contraste com [Prestador](/glossary/provider). Ver
[cap. 18, Os papéis de operador da UE](/bok/eu-ai-act#the-eu-operator-roles);
[cap. 18, Deveres do responsável pela implantação (Artigo 26.º)](/bok/eu-ai-act#deployer-duties-article-26).
(cap. 15, 18)

**Registo de Decisão de Implantação (DDR).** O artefacto que regista a decisão de implantar um
sistema de IA: objetivo, as pessoas sobre as quais atua, espaço negativo, nível de risco e
obrigações, pisos de desempenho por grupo, condições de retirada, proprietário e aprovador. É
confirmado com o código do sistema; os seus pisos tornam-se limiares de eval gate. Ver
[cap. 15, The Deployment Decision Record](/bok/governing-deployment#the-deployment-decision-record).
(cap. 15)

**Defeito de conceção.** Em responsabilidade civil de produtos, um defeito inerente à conceção de
cada unidade, julgado pelas expectativas do consumidor ou ponderando o risco contra a utilidade
[60]. Para IA: condições de funcionamento não testadas, um guardrail em falta ou supervisão em falta
quando uma alternativa mais segura era razoavelmente disponível. Contraste com
[Defeito de fabrico](/glossary/manufacturing-defect). Ver
[cap. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(cap. 20)

**Privacidade diferencial.** Uma garantia matemática que limita quanto o registo de uma única pessoa
pode alterar o resultado de uma análise ou de um modelo treinado, ajustado por um orçamento de
privacidade. A sua força depende do orçamento e das escolhas de implementação que o NIST designa
como riscos de privacidade [61]. Ver
[cap. 19, Privacy-enhancing technologies and their honest limits](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(cap. 19)

**Omnibus Digital.** O pacote de reforma de 2026 que altera o Regulamento da IA da UE (em vigor 27
jul 2026), que ajustou o cronograma de risco elevado, adicionou poderes de investigação do Serviço
para a IA e reformulou vários artigos [2]. Ver
[cap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (cap. 08, 18)

**Impacto desproporcional.** Uma prática aparentemente neutra que afeta mais duramente um grupo
protegido. Sob o Título VII dos EUA, o empregador deve demonstrar que a prática está relacionada com
o trabalho e é consistente com a necessidade comercial, e perde se recusa uma alternativa menos
discriminatória [62]. O equivalente da UE é discriminação indireta. Contraste com
[Tratamento desproporcional](/glossary/disparate-treatment) e
[Discriminação indireta](/glossary/indirect-discrimination). Ver
[cap. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact);
[cap. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(cap. 16, 20)

**Tratamento desproporcional.** Tratar uma pessoa menos favoravelmente por causa de uma
característica protegida como raça, sexo ou idade, incluindo através de uma característica ou regra
que deliberadamente a substitui [62]. O equivalente da UE é discriminação direta [63]. Contraste com
[Impacto desproporcional](/glossary/disparate-impact). Ver
[cap. 16, Disparate treatment and disparate impact](/bok/fairness-and-explainability#disparate-treatment-and-disparate-impact);
[cap. 20, Disparate treatment, disparate impact and proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(cap. 16, 20)

**Distribuidor.** Sob o Regulamento da IA da UE, uma pessoa na cadeia de fornecimento, que não seja
o prestador ou o importador, que disponibiliza um sistema de IA no mercado da União. Verifica a
marcação e documentos e retém sistemas de risco elevado que acredita não estar em conformidade [2].
Contraste com [Importador](/glossary/importer). Ver
[cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Representante doméstico (Coreia).** Uma pessoa com endereço ou escritório na Coreia que um
operador de negócio de IA estrangeiro acima dos limiares estabelecidos por decreto deve designar por
escrito. Submete resultados de segurança, apresenta pedidos de confirmação de elevado impacto e
apoia as medidas de elevado impacto [25][64]. Ver
[cap. 21, Domestic representative](/bok/ai-laws-worldwide#domestic-representative). (cap. 21)

**Modificador a jusante (GPAI).** Um ator que ajusta ou modifica o modelo de IA de finalidade geral
de outro prestador. As orientações da Comissão tornam-o prestador do modelo modificado apenas quando
a modificação utiliza mais de um terço da computação de treino original; as suas `Art. 53(1)`
obrigações cobrem então a modificação, mas um modelo modificado de risco sistémico presume-se manter
esse risco e as suas obrigações [65][76]. Contraste com
[Prestador a jusante](/glossary/downstream-provider). Ver
[cap. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider);
[cap. 18, When a fine-tuner becomes a GPAI provider](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(cap. 15, 18)

**Prestador a jusante.** Sob o Regulamento da IA da UE, o prestador de um sistema de IA que integra
um modelo de IA, seu ou fornecido por outra entidade. Confia nas informações do modelo que os
prestadores de modelos de IA de finalidade geral devem fornecer a jusante [2]. Contraste com
[Modificador a jusante (GPAI)](/glossary/downstream-modifier-gpai). Ver
[cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Registo de Utilização a Jusante.** O registo de cada consumidor dos resultados de um sistema de IA
(um sistema, equipa, parceiro ou pipeline de treino), cada um com a sua utilização aprovada, o
re-teste que autorizou os resultados para esse contexto e qualquer contrato, mantido contra a
entrada de registo do sistema produtor. O acesso é concedido por consumidor registado, e uma
alteração de modelo ou retirada é notificada a todos. Ver
[cap. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm);
[cap. 05, Pattern: Downstream Use Register](/patterns/downstream-use-register). (cap. 05, 15)

**AIPD.** Avaliação de Impacto sobre a Proteção de Dados: a avaliação do Artigo 35 do RGPD do
tratamento suscetível de resultar em risco elevado para os titulares dos dados [38], mantida nesta
disciplina como um artefacto versionado, não um documento único. Contraste com
[FRIA](/glossary/fria). Ver
[cap. 19, The DPIA for AI systems](/bok/privacy-and-ai#the-dpia-for-ai-systems). (cap. 04, 05, 19)

**Desvio.** A divergência gradual das entradas, saídas ou desempenho de um modelo da sua linha de
base validada ao longo do tempo; um sinal de tempo de execução que um controlo ou avaliação deve
detetar. Os dois tipos a distinguir são desvio de dados, nas entradas, e desvio de conceito, na
relação entrada-resposta. Contraste com [Desvio de dados](/glossary/data-drift) e
[Desvio de conceito](/glossary/concept-drift). Ver
[cap. 15, Drift: what moves and how to see it](/bok/governing-deployment#drift-what-moves-and-how-to-see-it);
[cap. 05, Pattern: Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[cap. 17, AI-specific failure modes](/bok/incidents#ai-specific-failure-modes). (cap. 04, 05, 11,
15, 16, 17)

**Dupla utilização.** A capacidade da mesma capacidade de IA servir fins prejudiciais bem como
legítimos, por exemplo um modelo de toxicidade invertido para propor moléculas tóxicas [66]. É
respondida com modelos de ameaça de uso indevido, casos de teste de equipa vermelha para usos
prejudiciais de capacidade legítima e deteção em tempo de execução. Ver
[cap. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).
(cap. 11)

**Titular de obrigação.** Quem uma obrigação vincula legalmente (sob o Regulamento da IA da UE, o
prestador, o responsável pela implantação ou ambos), distinto de quem a executa; o capítulo 08 tem
uma coluna de titular de obrigação para que um engenheiro possa dizer quais os artefactos que a sua
organização é responsável por produzir. Ver
[cap. 18, Who you are in the value chain](/bok/eu-ai-act#who-you-are-in-the-value-chain). (cap.
08, 18)

## E

**Desafio efetivo.** Análise crítica de um modelo por especialistas objetivos com a perícia,
independência e posição organizacional para forçar mudança. O termo vem da orientação de risco de
modelo dos EUA, agora SR 26-2 [67], e é emprestado para validação independente de sistemas de IA.
Ver
[cap. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management).
(cap. 14)

**EN 18286.** A norma europeia para o sistema de gestão da qualidade do Artigo 17 do Regulamento da
IA, publicada pela CEN-CENELEC em julho de 2026 (a primeira norma JTC 21 do Regulamento da IA a
atingir publicação), mas ainda não citada no Jornal Oficial a partir de 2026-09-24, pelo que não
confere presunção de conformidade [10]. Ver
[cap. 22, The JTC 21 programme](/bok/principles-and-standards#the-jtc-21-programme). (cap. 08, 22)

**Probabilidades equalizadas.** Um critério de equidade de grupo que se mantém quando as taxas de
verdadeiro positivo e falso positivo são ambas iguais entre grupos; oportunidade igual é a versão
mais fraca que iguala apenas as taxas de verdadeiro positivo [68]. Contraste com
[Paridade demográfica](/glossary/demographic-parity). Ver
[cap. 16, Group fairness metrics](/bok/fairness-and-explainability#group-fairness-metrics).
(cap. 16)

**Declaração de conformidade da UE.** A declaração assinada do prestador, seguindo o Anexo V do
Regulamento da IA, de que um sistema de IA de risco elevado cumpre os requisitos do Regulamento;
elaborada após a avaliação da conformidade e mantida por 10 anos [2]. Contraste com
[Marcação CE](/glossary/ce-marking). Ver
[cap. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration).
(cap. 18)

**Eval gate.** Uma fase do pipeline que falha a compilação quando uma avaliação falha; o mecanismo
que transforma uma avaliação num controlo executado em vez de um relatório. Ver
[cap. 05, Pattern: Eval Gate in CI](/bok/patterns#pattern-eval-gate-in-ci). (cap. 04, 05)

**Avaliações.** Testes automatizados do comportamento de um modelo ou agente (capacidade, segurança
e adversarial), executados como controlos, não como investigação única. Ver
[cap. 04, Layer 03: Evals & Red Teaming as Evidence](/bok/the-stack#layer-03-evals--red-teaming-as-evidence).
(cap. 04)

**Avaliações como evidência.** O princípio de que a execução da avaliação *é* a evidência de
garantia: uma avaliação falhada bloqueia a compilação e o seu resultado estruturado é armazenado
como prova de que o controlo disparou. Ver
[cap. 03, 2. Evals fail builds; reviews only recommend](/bok/values-and-principles#2-evals-fail-builds-reviews-only-recommend).
(cap. 03, 04)

**Registo de evidência.** O registo assinado e estruturado que um controlo escreve cada vez que
decide: qual controlo, sobre qual versão de sistema, o que decidiu, contra qual métrica, limiar e
obrigação, em qual entrada, quando e por quem. Uma forma para cada controlo permite que uma
auditoria seja executada como uma consulta sobre um armazenamento [69]. Ver
[cap. 05, Pattern: Continuous Assurance Telemetry](/bok/patterns#pattern-continuous-assurance-telemetry);
[Templates and schemas](/resources/templates). (cap. 05)

**Registo de exceções.** Uma lista controlada por versão de exceções aprovadas, cada uma vinculada a
uma regra e um sistema, com justificação, controlos compensadores, aprovador e expiração. O motor de
política lê-a, para que uma libertação possa passar sob uma exceção ativa, o veredicto diz assim, e
a regra falha novamente uma vez que a exceção expira. Contraste com
[Registo de risco](/glossary/risk-register). Ver
[cap. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(cap. 12)

**Explicabilidade.** Na estrutura do NIST, uma representação dos mecanismos por trás do
funcionamento de um sistema: como uma decisão foi tomada [30]. Na prática uma explicação por decisão
como atribuições de características, códigos de razão ou um contrafactual. Contraste com
[Transparência](/glossary/transparency) e [Interpretabilidade](/glossary/interpretability). Ver
[cap. 16, Transparency, interpretability and explainability](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[cap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (cap. 11, 16)

**Registo de explicação.** O artefacto de evidência para uma decisão explicada: versão do modelo,
método e versão de explicação, linha de base, códigos de razão, contrafactual, modelo, audiência e
entrega, escrito no momento da decisão para que a explicação possa ser reproduzida quando uma pessoa
invoca um direito de explicação [2]. Ver
[cap. 16, Explanation artefacts as evidence records](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records);
[cap. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (cap. 05, 16)

## F

**Postura de falha.** O que um guardrail, agente guardião ou gateway de ferramentas faz quando não
consegue chegar a uma decisão: falha aberta deixa a chamada passar, falha fechada bloqueia-a. O
guardião de referência da Norma de Controlo de Agentes OWASP começa por prosseguir a menos que seja
definido para negar [127]. A postura é uma decisão de governação, definida por classe de operação e
registada na Ficha de Política do agente. Consulte
[cap. 23, Guardrails em tempo de execução para chamadas de ferramentas](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(cap. 23)

**Falha em avisar.** Na responsabilidade do produto, um defeito nas instruções ou avisos sobre
perigos não óbvios [60]. Para IA: limitações não divulgadas ou utilizações fora do âmbito, razão
pela qual as fichas de modelo e as instruções de utilização são versionadas com cada lançamento.
Consulte [cap. 20, Dever de avisar após atualizações](/bok/existing-law#duty-to-warn-after-updates).
(cap. 20)

**Utilização legítima.** A defesa de direitos de autor dos EUA que pondera quatro fatores:
finalidade e transformatividade, natureza da obra, quantidade utilizada e efeito no mercado [70]. Os
tribunais aplicam-na aos casos de treino de IA caso a caso; os resultados até agora dependem de como
os dados foram adquiridos e de cada registo. Contraste com [exceção TDM](/glossary/tdm-exception).
Consulte [cap. 20, Casos de treino nos EUA, datados](/bok/existing-law#us-training-cases-dated).
(cap. 20)

**Equidade.** A propriedade de que os resultados e erros de um sistema não prejudicam
injustificavelmente pessoas ou grupos. O NIST lista "equitativo, com enviesamento prejudicial
gerido" entre as suas características confiáveis [30]; na prática, a equidade é uma métrica
escolhida e registada (grupo, individual ou contrafactual) com um limiar, não uma afirmação geral.
Contraste com [Enviesamento](/glossary/bias). Consulte
[cap. 16, Escolher uma métrica de equidade por caso de utilização](/bok/fairness-and-explainability#choosing-a-fairness-metric-by-use-case).
(cap. 16)

**Manipulação de equidade.** A falha em que um modelo satisfaz uma restrição de equidade em cada
grupo predefinido mas viola-a em subgrupos definidos por combinações de atributos [71]; a razão pela
qual é necessário teste interseccional. Consulte
[cap. 16, Teste interseccional e de subgrupos](/bok/fairness-and-explainability#intersectional-and-subgroup-testing).
(cap. 16)

**Política de equidade.** O registo por sistema, fixado antes de os resultados serem vistos, do que
a equidade significa para esse sistema: os atributos protegidos em cada jurisdição e de onde vêm os
seus valores, a métrica escolhida e porquê, o limiar, o tamanho mínimo de célula, a correção de
comparações múltiplas e o aprovador. A suite de avaliação de equidade é julgada contra ela.
Contraste com [Equidade](/glossary/fairness). Consulte
[cap. 16, Equidade e explicabilidade no stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack);
[cap. 05, Padrão: Suite de Avaliação de Equidade](/patterns/fairness-eval-suite). (cap. 05, 16)

**Aprendizagem federada.** Treino de um modelo em dispositivos ou locais onde os dados residem,
partilhando atualizações de modelo em vez de registos brutos [72]. Limita o movimento de dados mas
não oculta por si só dados pessoais, porque as atualizações partilhadas podem vazar exemplos de
treino. Consulte
[cap. 19, Tecnologias de melhoria da privacidade e os seus limites honestos](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(cap. 19)

**Ajuste fino.** Treino adicional de um modelo existente em novos dados para o adaptar a uma tarefa
ou domínio. Altera o modelo, portanto é um evento de mudança com as suas próprias avaliações; para
modelos de IA de finalidade geral, a Comissão trata um modificador como prestador apenas acima de um
terço do cálculo de treino original [65]. Consulte
[cap. 15, Como é adaptado](/bok/governing-deployment#how-it-is-adapted);
[cap. 18, Quando um ajustador se torna prestador de IA de finalidade geral](/bok/eu-ai-act#when-a-fine-tuner-becomes-a-gpai-provider).
(cap. 15, 18)

**Modelo fundacional.** Um modelo treinado em dados amplos em escala e adaptável a uma vasta gama de
tarefas a jusante [73]. Os seus defeitos são herdados por cada sistema construído sobre ele,
portanto as organizações que chamam ou adaptam um recolhem a evidência do prestador e gerem a versão
fixada como uma mudança. Contraste com [IA de finalidade geral](/glossary/gpai) e
[Modelo de fronteira](/glossary/frontier-model). Consulte
[cap. 11, Modelos fundacionais e IA de finalidade geral](/bok/ai-defined#foundation-models-and-gpai).
(cap. 11)

**Regra dos quatro quintos.** A regra prática das Diretrizes Uniformes dos EUA de que uma taxa de
seleção de grupo abaixo de 80% da taxa do grupo mais elevado será geralmente considerada como
evidência de impacto adverso, qualificada por significância estatística e prática [24]. Não é um
porto seguro: lacunas menores podem ainda contar. Consulte
[cap. 16, A regra dos quatro quintos e a razão de impacto adverso](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
[cap. 20, Medidas de equidade que a lei reconhece](/bok/existing-law#fairness-measures-the-law-recognises).
(cap. 16, 20)

**Convenção-Quadro sobre IA (CETS n.º 225).** O tratado do Conselho da Europa sobre IA e direitos
humanos, democracia e estado de direito, aberto para assinatura em setembro de 2024. Vincula as suas
Partes, que decidem como alcançar atores privados, e pede gestão de risco e impacto e recursos [74].
Consulte
[cap. 22, Convenção-Quadro do Conselho da Europa (CETS n.º 225)](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225).
(cap. 22)

**Mapeamento de framework.** Um mapeamento dos controlos de um framework para os de outro; útil como
índice, mas um mapeamento prova que leu o framework, não que o controlo mapeado funciona. Consulte
[cap. 05, Padrão: Mapeamento de Framework](/bok/patterns#pattern-framework-crosswalk). (cap. 05, 08)

**AIPD.** Avaliação de Impacto sobre os Direitos Fundamentais: a avaliação do Artigo 27 do
Regulamento da IA do impacto de um sistema de risco elevado nos direitos [2], mantida aqui como um
artefato versionado e revisto. Contraste com [AIPD](/glossary/dpia) e
[avaliação de impacto do sistema de IA](/glossary/ai-system-impact-assessment). Consulte
[cap. 18, Avaliação de impacto sobre os direitos fundamentais (Artigo 27)](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27);
[cap. 05, Padrão: FRIA-as-Code](/bok/patterns#pattern-fria-as-code). (cap. 04, 05, 18)

**Modelo de fronteira.** Um modelo de finalidade geral na ou perto da fronteira de capacidade. As
leis traçam a linha pelo cálculo de treino: o SB 53 da Califórnia, por exemplo, cobre modelos
treinados com mais de 10^26 operações [14]. As leis de programadores de fronteira pedem um framework
de segurança publicado e relatório de incidentes [12]. Contraste com
[Modelo fundacional](/glossary/foundation-model). Consulte
[cap. 21, Proveniência, dados de treino e programadores de fronteira](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers);
[cap. 08, Leis de programadores de fronteira](/bok/regulatory-map#frontier-developer-laws). (cap.
08, 21)

**Registo de cumprimento.** O registo por pedido de como um pedido de titular de dados foi honrado
onde quer que os dados da pessoa residam, desde sistemas de origem, snapshots, índices de
recuperação, registos e conjuntos de avaliação até pesos de modelo: a ação em cada um, as versões de
modelo afetadas, qualquer retreino agendado e se o prazo do RGPD de um mês, prorrogável por dois,
foi cumprido [38]. Consulte
[cap. 19, Registar como um pedido foi honrado](/bok/privacy-and-ai#recording-how-a-request-was-honoured);
[cap. 05, Padrão: Pedidos de Direitos Contra Modelos](/patterns/rights-requests-against-models).
(cap. 05, 08, 19)

**Desvio de função.** A reutilização gradual de dados pessoais ou um sistema de IA para fins que
ninguém aprovou, geralmente por configuração em vez de um novo lançamento. Para dados pessoais,
viola a limitação de finalidade a menos que uma avaliação de compatibilidade ou nova base cubra o
novo uso [38]; espaço negativo no registo de implantação torna-o detetável. Consulte
[cap. 19, Limitação de finalidade e desvio de função](/bok/privacy-and-ai#purpose-limitation-and-function-creep);
[cap. 15, Utilização secundária e dano a jusante](/bok/governing-deployment#secondary-use-and-downstream-harm);
[cap. 05, Padrão: Registo de Utilização a Jusante](/patterns/downstream-use-register). (cap. 05, 14,
15, 19)

## G

**IA generativa.** IA que produz novo conteúdo (texto, imagens, áudio, vídeo, código) em vez de uma
estimativa sobre algo que existe. Os seus riscos distintivos incluem confabulação, integridade da
informação, propriedade intelectual e conteúdo sintético abusivo [75]; a sua evidência é
fundamentação, recusa e avaliações de red-team e marcação de conteúdo. Contraste com
[IA preditiva](/glossary/predictive-ai). Consulte
[cap. 11, Preditivo versus generativo](/bok/ai-defined#predictive-versus-generative). (cap. 11)

**Decisão de prosseguir/não prosseguir.** A decisão de lançamento assinada para uma versão de
sistema, tomada por funções de revisor nomeadas contra uma lista de verificação cujos itens ligam
cada um o registo que os responde. O NIST enquadra-a como a determinação de se o desenvolvimento ou
implantação deve prosseguir [30]; o pipeline implanta apenas em prosseguir. Consulte
[cap. 14, O gate de prosseguir/não prosseguir](/bok/governing-development#the-gono-go-gate).
(cap. 14)

**Governação como código.** Regras de governação expressas como código executável que avalia pull
requests, implantações e chamadas em tempo de execução e retorna uma decisão; o termo guarda-chuva
do qual política como código é o subconjunto CI/CD. Contraste com
[Política como código](/glossary/policy-as-code). Consulte
[cap. 04, Camada 01: Govern-as-Code](/bok/the-stack#layer-01-govern-as-code). (cap. 03, 04)

**IA de finalidade geral.** Modelo de IA de finalidade geral: sob o Regulamento da IA, um modelo que
mostra generalidade significativa, pode executar competentemente uma vasta gama de tarefas distintas
e pode ser integrado em muitos sistemas a jusante [2]. O critério indicativo da Comissão é cálculo
de treino acima de 10^23 FLOP [76]. O Serviço para a IA aplica deveres de IA de finalidade geral a
partir de 2 de agosto de 2026. Contraste com [Modelo fundacional](/glossary/foundation-model).
Consulte [cap. 18, Modelos de IA de finalidade geral](/bok/eu-ai-act#general-purpose-ai-models);
[cap. 11, Modelos fundacionais e IA de finalidade geral](/bok/ai-defined#foundation-models-and-gpai).
(cap. 08, 11, 18)

**Código de Prática de IA de Finalidade Geral.** O instrumento voluntário (publicado em 10 de julho
de 2025) que os prestadores de IA de finalidade geral utilizam para demonstrar conformidade com as
suas obrigações do Regulamento da IA até que existam normas harmonizadas; três capítulos:
Transparência, Direitos de Autor e Segurança (o último para modelos de risco sistémico) [16].
Consulte
[cap. 08, Código de Prática de IA de Finalidade Geral](/bok/regulatory-map#gpai-code-of-practice);
[cap. 18, O Código de Prática e aplicação](/bok/eu-ai-act#the-code-of-practice-and-enforcement).
(cap. 08, 18)

**Degradação graduada.** Modos operacionais pré-construídos e testados aquém de desligar um sistema
de IA: apenas aconselhamento, limiares de confiança elevados, respostas apenas fundamentadas,
desativação para um grupo, idioma ou região, e um retorno à coorte piloto. Cada um é um toggle
operacional com um gatilho nomeado [77]. Contraste com [Kill switch](/glossary/kill-switch).
Consulte [cap. 15, Degradação graduada](/bok/governing-deployment#graduated-degradation);
[cap. 05, Padrão: Runbook de Desativação, Localização e Reforma](/patterns/deactivation-localisation-retirement-runbook).
(cap. 05, 15, 23)

**Agente guardião.** Um agente de IA cujo trabalho é supervisionar, verificar ou constranger outros
agentes em tempo de execução; a Gartner prevê que as tecnologias de agente guardião representarão
pelo menos 10 a 15% dos mercados de IA agêntica até 2030 [9]. Contraste com
[Guardrail](/glossary/guardrail). Consulte
[cap. 04, Camada 04: Controlos em Tempo de Execução e Observabilidade](/bok/the-stack#layer-04-runtime-controls--observability);
[cap. 23, Guardrails em tempo de execução para chamadas de ferramentas](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(cap. 04, 23)

**Guardrail.** Um controlo em tempo de execução que inspeciona ou medeia as entradas, saídas ou
chamadas de ferramentas de um modelo ou agente e bloqueia, reescreve ou escalada o que quebra uma
política, registando cada decisão como evidência. Os guardrails são código determinístico ou
classificadores no caminho de chamada, ao contrário de um agente guardião, que é em si um sistema de
IA. Contraste com [Agente guardião](/glossary/guardian-agent). Consulte
[cap. 05, Padrão: Guardrail em Tempo de Execução](/bok/patterns#pattern-runtime-guardrail);
[cap. 23, Guardrails em tempo de execução para chamadas de ferramentas](/bok/governing-agents#runtime-guardrails-for-tool-calls).
(cap. 04, 05, 23)

## H

**Alucinação.** Resultado gerado que é afirmado com confiança mas é falso ou não é apoiado pelas
suas fontes; o perfil de IA generativa do NIST chama-lhe confabulação e lista-a entre os riscos que
a IA generativa cria ou agrava [75]. As verificações de fundamentação e citação são a evidência
usual contra ela. Contraste com [Regurgitação](/glossary/regurgitation). Veja
[cap. 17, Modos de falha específicos da IA](/bok/incidents#ai-specific-failure-modes);
[cap. 11, Preditivo versus generativo](/bok/ai-defined#predictive-versus-generative). (cap. 11, 17)

**Norma harmonizada.** Uma norma europeia adoptada mediante um pedido de normalização da Comissão.
Sob o Regulamento da IA, a conformidade com uma cuja referência é publicada no Jornal Oficial
presume a conformidade com os requisitos que cobre; a publicação apenas pela CEN-CENELEC não o faz
[2]. A partir de 2026-09-24, nenhuma é ainda citada [10]. Contraste com
[Especificações comuns](/glossary/common-specifications) e
[Estrutura Harmonizada (ISO)](/glossary/harmonized-structure-iso). Veja
[cap. 22, Como funciona a presunção de conformidade](/bok/principles-and-standards#how-presumption-of-conformity-works).
(cap. 08, 22)

**Estrutura Harmonizada (ISO).** A disposição comum de cláusulas e o texto central partilhado pelas
normas de sistemas de gestão ISO como ISO/IEC 42001, 27001 e 27701 e ISO 9001, que permite que um
sistema de gestão integrado cumpra vários deles [78]. Não confundir com uma norma harmonizada da UE.
Contraste com [Norma harmonizada](/glossary/harmonised-standard). Veja
[cap. 22, Integração com 27001, 27701 e 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001).
(cap. 22)

**Exposição de Contexto Oculto.** LLM08:2026 no OWASP LLM Top 10, que substituiu System Prompt
Leakage: extrair, inferir ou reconstruir o contexto oculto que um modelo vê, como prompts de
sistema, instruções de programadores, texto de política recuperado e esquemas de ferramentas [128].
O conselho é assumir que o contexto oculto é detectável, manter credenciais fora dele e nunca
confiar nele como limite de segurança. Contraste com
[Injeção de prompts](/glossary/prompt-injection). Veja
[cap. 23, Prompts como configuração sob controlo de mudanças](/bok/governing-agents#prompts-as-configuration-under-change-control).
(cap. 23)

**IA de Elevado Impacto (Coreia).** Sob a Lei Básica de IA da Coreia, um sistema de IA que pode
afectar significativamente a vida, a segurança física ou direitos fundamentais e é utilizado numa
área listada como cuidados de saúde, contratação e triagem de empréstimos, análise biométrica,
transporte ou decisões de serviços públicos. Activa deveres de gestão de riscos, explicação,
supervisão humana e manutenção de registos [25]. Contraste com
[Sistema de IA de risco elevado](/glossary/high-risk-ai-system). Veja
[cap. 21, IA de elevado impacto e como é confirmada](/bok/ai-laws-worldwide#high-impact-ai-and-how-it-is-confirmed).
(cap. 21)

**Sistema de IA de risco elevado.** Sob o Regulamento da IA da UE, um sistema de IA que é um
componente de segurança de, ou é em si, um produto sob legislação do Anexo I que necessite avaliação
de conformidade por terceiros, ou que é utilizado numa área do Anexo III, a menos que o filtro do
Artigo 6(3) se aplique. Comporta os requisitos dos Artigos 8 a 15 e deveres de prestador e
responsável pela implantação [2]. Contraste com [Prática proibida](/glossary/prohibited-practice),
[IA de Elevado Impacto (Coreia)](/glossary/high-impact-ai-korea) e
[Nível de risco](/glossary/risk-tier). Veja
[cap. 18, A escada de risco](/bok/eu-ai-act#the-risk-ladder). (cap. 18)

**Código de Conduta de Hiroshima.** O Código Internacional Voluntário de Conduta para Organizações
que Desenvolvem Sistemas de IA Avançada do G7 (Outubro de 2023): 11 acções cobrindo avaliação de
risco do ciclo de vida, acompanhamento pós-implantação, relatório público, partilha de incidentes,
políticas de governação, segurança, proveniência e protecção de dados [79]. Veja
[cap. 22, Processo Hiroshima do G7](/bok/principles-and-standards#g7-hiroshima-process). (cap. 22)

**Declaração de espera.** Uma breve declaração pública preparada em esboço antes de qualquer
incidente: o que aconteceu na medida em que é conhecido, o que foi feito para o conter, o que as
pessoas afectadas devem fazer, e quando virá a próxima actualização. Nunca especula sobre a causa.
Veja [cap. 15, Comunicações externas](/bok/governing-deployment#external-communications);
[cap. 05, Padrão: Pipeline de Divulgação e Notificação](/patterns/disclosure-notification-pipeline).
(cap. 05, 15)

**HUDERIA.** A metodologia não vinculativa do Conselho da Europa para avaliar os riscos e impactos
de sistemas de IA nos direitos humanos, democracia e estado de direito [80]. As partes na
Convenção-Quadro podem utilizá-la ou adaptá-la. Veja
[cap. 22, O que a Convenção pede, e o que muda na stack](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack).
(cap. 22)

**Supervisão humana.** As medidas que permitem às pessoas singulares compreender, monitorizar e,
quando necessário, anular ou parar um sistema de IA de risco elevado, exigidas pelo Artigo 14 do
Regulamento da IA, incluindo consciência do enviesamento de automação e uma forma de parar o sistema
com segurança [2]. Engenhada como gates, ferramentas de revisão e exercícios de anulação que deixam
registos. Veja
[cap. 04, Conceber supervisão humana (Artigo 14)](/bok/the-stack#designing-human-oversight-article-14);
[cap. 23, Como é uma boa aprovação](/bok/governing-agents#what-a-good-approval-looks-like). (cap.
04, 11, 23)

**Humano em Comando (HIC).** O modo de supervisão, nomeado pelo Grupo de Peritos de Alto Nível da
UE, em que as pessoas supervisionam a actividade geral de um sistema de IA e decidem quando e se o
utilizar numa situação dada [81]. Contraste com
[Humano no Ciclo (HOTL)](/glossary/human-on-the-loop-hotl). Veja
[cap. 11, Do elemento de definição ao campo de registo](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11)

**Humano no Ciclo (HITL).** O modo de supervisão em que uma pessoa pode intervir em cada ciclo de
decisão de um sistema de IA [81]; em termos de engenharia, um gate que retém cada acção consequente
até um aprovador nomeado decidir, registando aprovador, tempo para decidir e anulação. Contraste com
[Humano no Ciclo (HOTL)](/glossary/human-on-the-loop-hotl). Veja
[cap. 05, Padrão: Gate de Humano no Ciclo](/bok/patterns#pattern-human-in-the-loop-gate);
[cap. 11, Do elemento de definição ao campo de registo](/bok/ai-defined#from-definition-element-to-registry-field);
[cap. 23, Pontos de verificação humana e concepção de aprovação](/bok/governing-agents#human-checkpoints-and-approval-design).
(cap. 05, 11, 23)

**Humano no Ciclo (HOTL).** O modo de supervisão em que uma pessoa pode intervir no ciclo de
concepção e monitoriza a operação do sistema, em vez de aprovar cada decisão [81]. O sistema actua;
as pessoas observam os sinais e podem pará-lo, portanto o caminho de paragem e os alertas são o que
deve ser testado. Contraste com [Humano no Ciclo (HITL)](/glossary/human-in-the-loop-hitl) e
[Humano em Comando (HIC)](/glossary/human-in-command-hic). Veja
[cap. 11, Do elemento de definição ao campo de registo](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11)

## I

**Negação implícita.** A regra de autorização que um pedido que nenhuma política explicitamente
permite é recusado. Cedar nega por defeito e permite que qualquer proibição correspondente anule
cada permissão [141]; uma lista de permissão de ferramentas de um agente funciona da mesma forma,
portanto uma ferramenta não listada é bloqueada sem uma regra própria. Veja
[cap. 23, A lista de permissão de ferramentas](/bok/governing-agents#the-tool-allow-list);
[Toolkit: Construtor de Ficha de Política](/toolkit/policy-card#pc-engines). (cap. 08, 23)

**Importador.** Sob o Regulamento da IA da UE, uma pessoa estabelecida na União que coloca no
mercado um sistema de IA com o nome ou marca comercial de um prestador estabelecido fora da União.
Deve verificar o trabalho de conformidade do prestador antes de colocar um sistema de risco elevado
no mercado [2]. Contraste com [Distribuidor](/glossary/distributor). Veja
[cap. 18, Os papéis de operador da UE](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**Discriminação indirecta.** A contraparte da UE do impacto desproporcional: um critério
aparentemente neutro que coloca um grupo protegido numa desvantagem particular, ilegal a menos que
objectivamente justificado por um objectivo legítimo perseguido por meios apropriados e necessários
[63]. Contraste com [Impacto desproporcional](/glossary/disparate-impact). Veja
[cap. 20, Tratamento desproporcional, impacto desproporcional e proxies](/bok/existing-law#disparate-treatment-disparate-impact-and-proxies).
(cap. 20)

**Inferência (sentido do Regulamento da IA).** A capacidade de derivar resultados de entrada através
de aprendizagem a partir de dados ou raciocínio sobre conhecimento codificado, em vez de executar
regras que as pessoas escreveram. A Comissão trata-a como a condição indispensável que separa um
sistema de IA do software convencional [21]. Veja
[cap. 11, Artigo 3(1) do Regulamento da IA da UE e as directrizes da Comissão](/bok/ai-defined#eu-ai-act-article-31-and-the-commission-guidelines).
(cap. 11)

**Dados sensíveis inferidos.** Informação sensível que um sistema deriva de entradas ordinárias
(saúde a partir de compras, crenças a partir de comportamento) ou transporta através de uma
característica proxy. A Lei My Health My Data de Washington cobre dados de saúde derivados por
algoritmos ou aprendizagem automática [82]; testes de proxy e políticas de inferência tornam-na
verificável. Contraste com [Dados de categoria especial](/glossary/special-category-data). Veja
[cap. 19, Dados sensíveis inferidos e proxy](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data).
(cap. 19)

**Risco inerente.** A classificação de probabilidade e severidade de um cenário de risco antes de
qualquer controlo ser contado. A lacuna entre risco inerente e residual é o valor reclamado para os
controlos, e deve ser apoiada pela sua evidência [30]. Contraste com
[Risco residual](/glossary/residual-risk). Veja
[cap. 13, Risco inerente, risco residual e quem o aceita](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(cap. 13)

**Instruções de utilização.** A informação que um prestador de um sistema de IA de risco elevado
deve dar aos responsáveis pela implantação: finalidade prevista, precisão e robustez declaradas,
riscos conhecidos, como ler o resultado, medidas de supervisão humana, manutenção e registo [2].
Melhor gerada a partir da entrada de registo e relatório de teste, para que os números correspondam
à evidência. Veja [cap. 14, O ficheiro técnico](/bok/governing-development#the-technical-file).
(cap. 14, 18)

**Finalidade prevista.** O uso para o qual o prestador pretende um sistema de IA, incluindo o seu
contexto específico e condições de utilização {[2]. A maioria dos deveres de risco elevado são
medidos contra ela, portanto é um campo do registo de caso de uso que a classificação, testes e
instruções de utilização lêem. Um modelo movido para um novo propósito é, para risco, um novo
sistema. Contraste com
[Utilização indevida razoavelmente previsível](/glossary/reasonably-foreseeable-misuse). Veja
[cap. 14, O registo de caso de uso](/bok/governing-development#the-use-case-record);
[cap. 11, Do elemento de definição ao campo de registo](/bok/ai-defined#from-definition-element-to-registry-field).
(cap. 11, 14)

**Canal de denúncia interno.** Uma rota confidencial para pessoal e contratados levantarem
preocupações sobre sistemas de IA fora da cadeia de comando, com relógios estatutários codificados
(sob a Directiva de Denúncia da UE, reconhecimento dentro de sete dias e feedback dentro de três
meses) e protecção contra represálias {[83]. Veja
[cap. 12, Um canal para levantar preocupações](/bok/governance-program#a-channel-for-raising-concerns).
(cap. 12)

**Interpretabilidade.** Na estrutura do NIST, o significado do resultado de um sistema no contexto
do seu propósito: por que uma decisão foi tomada e o que significa para o utilizador {[30]. Um
modelo inerentemente interpretável, como um scorecard ou uma árvore rasa, é a sua própria
explicação. Contraste com [Explicabilidade](/glossary/explainability). Veja
[cap. 16, Transparência, interpretabilidade e explicabilidade](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[cap. 16, Interpretável por concepção ou explicado após o facto](/bok/fairness-and-explainability#interpretable-by-design-or-explained-after-the-fact).
(cap. 16)

**ISO/IEC 22989.** A norma ISO/IEC (2022) que estabelece conceitos e terminologia de IA para
utilização por outras normas e por diversos intervenientes {[40]. Nomear campos de registo após o
seu vocabulário reduz a tradução ao auditar contra a família SC 42. Veja
[cap. 22, Fundações e vocabulário](/bok/principles-and-standards#foundations-and-vocabulary). (cap.
11, 22)

**ISO/IEC 42001.** A norma ISO/IEC (2023) que especifica os requisitos para um sistema de gestão de
IA, certificável por organismos acreditados [48]. A partir de 2026-09-24 não é uma norma harmonizada
sob o Regulamento da IA, pelo que a certificação não confere presunção de conformidade [10].
Consulte
[cap. 22, The management-system trio](/bok/principles-and-standards#the-management-system-trio);
[cap. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006). (cap.
07, 08, 22)

**ISO/IEC 42005.** ISO/IEC 42005:2025, a norma de avaliação de impacto de sistemas de IA
(complementar ao artigo 27 FRIA do Regulamento da IA e ao Anexo A.5 da ISO/IEC 42001), que fornece
um método estruturado para avaliar os impactos de um sistema de IA nas pessoas e na sociedade [17].
Consulte
[cap. 08, ISO/IEC 42001, 42005 and 42006](/bok/regulatory-map#isoiec-42001-42005-and-42006);
[cap. 14, Impact assessments compared](/bok/governing-development#impact-assessments-compared).
(cap. 08, 14)

**Questão (versus incidente).** Um defeito, desvio ou fraqueza de controlo que não produziu um
evento prejudicial, como uma regressão de avaliação em ambiente de teste ou um alerta de desvio. É
rastreada até ao encerramento com um responsável e uma data de vencimento e não inicia nenhum prazo
legal; a maioria das questões são não-conformidades em termos de sistema de gestão [48]. Contraste
com [Incidente de IA](/glossary/ai-incident). Consulte
[cap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

## J

**Jailbreak.** Um prompt elaborado para fazer um modelo ignorar completamente as suas instruções de
segurança. O OWASP trata o jailbreak como uma forma de injeção de prompts [84]; é testado com suites
de red team na porta de avaliação e contido em tempo de execução por guardrails que não dependem das
próprias recusas do modelo. Contraste com [Injeção de prompts](/glossary/prompt-injection). Consulte
[cap. 14, The test-type matrix](/bok/governing-development#the-test-type-matrix). (cap. 14, 17)

**JSON Schema.** Um vocabulário para descrever a estrutura de documentos JSON de modo a que um
validador possa verificá-los: quais campos existem, quais são obrigatórios, os seus tipos e valores
permitidos [85]. A biblioteca de modelos publica um esquema draft 2020-12 por registo de governação,
pelo que um registo valida ou falha a compilação. Consulte
[cap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal);
[Templates and schemas](/resources/templates). (cap. 05)

**Memorando de justificação.** O registo de admissão para um caso de uso de IA: o problema, a
alternativa sem IA, o benefício mensurável, quem sofre os erros e como os contestam, reversibilidade
e critérios de paragem. Responde a "deve ser usada IA" antes de um sistema atingir uma porta, a
determinação de prosseguir/não prosseguir que o NIST coloca no início [30]. Consulte
[cap. 12, Strategy, value and whether to use AI at all](/bok/governance-program#strategy-value-and-whether-to-use-ai-at-all).
(cap. 12)

## K

**Indicador-chave de risco (KRI).** Uma métrica que mostra se um risco se está a aproximar do limite
do apetite (IA não registada encontrada, exceções abertas por idade, taxas de sobreposição),
distinto de um indicador-chave de desempenho, que mostra se o programa está a fazer o seu trabalho.
Consulte
[cap. 12, KPIs and KRIs for leadership and the board](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
(cap. 12)

**Kill switch.** Um mecanismo testado para impedir que um agente ou sistema atue; uma pré-condição
para conceder autonomia, registada contra a identidade do agente. Contraste com
[Degradação gradual](/glossary/graduated-degradation). Consulte
[cap. 05, Pattern: Kill Switch / Circuit Breaker](/bok/patterns#pattern-kill-switch--circuit-breaker);
[cap. 23, Kill switch and per-agent circuit breakers](/bok/governing-agents#kill-switch-and-per-agent-circuit-breakers).
(cap. 03, 05, 23)

## L

**Modelo de linguagem de grande dimensão (LLM).** Um modelo fundacional para linguagem, normalmente
servido a partir de um centro de dados através de uma API. Como as chamadas passam por um gateway,
os controlos em tempo de execução (rastreamento, filtragem, paragem) podem estar centralizados [86].
Contraste com [Modelo de linguagem pequeno (SLM)](/glossary/small-language-model-slm). Consulte
[cap. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (cap. 11)

**Divulgação latente.** Sob a Lei de Transparência de IA da Califórnia, informações de proveniência
incorporadas em imagem, vídeo ou áudio gerado por IA de modo a que persista e possa ser lida por uma
ferramenta de deteção, em contraste com um rótulo visível mostrado ao utilizador [87]. Contraste com
[Marca de água](/glossary/watermarking). Consulte
[cap. 21, Provenance, training data and frontier developers](/bok/ai-laws-worldwide#provenance-training-data-and-frontier-developers).
(cap. 21)

**Base legal.** Uma das seis bases no artigo 6 do RGPD que tornam o tratamento de dados pessoais
legal: consentimento, contrato, obrigação legal, interesses vitais, tarefa pública e interesses
legítimos [38]. Para IA, cada momento de tratamento (treino, recuperação, inferência, registo)
necessita da sua própria base, registada por conjunto de dados e fase. Consulte
[cap. 19, Lawful basis for training versus inference](/bok/privacy-and-ai#lawful-basis-for-training-versus-inference).
(cap. 19)

**Menor agência.** O princípio, na lista agentic do OWASP, de dar a um agente apenas a autonomia que
a sua tarefa necessita: comportamento agentic implementado onde não é necessário alarga a superfície
de ataque sem adicionar valor [6]. O controlo de agente mais barato é o agente não construído, como
um fluxo de trabalho fixo com uma chamada de modelo em vez de um planeador. Contraste com
[Nível de autonomia](/glossary/autonomy-level). Consulte
[cap. 23, Governing AI agents](/bok/governing-agents). (cap. 23)

**Avaliação de interesses legítimos (LIA).** O teste documentado de três passos para confiar em
interesses legítimos: um interesse legal, preciso e presente; tratamento necessário para o mesmo; e
um equilíbrio não ultrapassado pelos direitos das pessoas e expectativas razoáveis [88]. Mantido
como um artefato versionado que aponta cada mitigação para o controlo que a implementa. Consulte
[cap. 19, Legitimate interests and the three-step test](/bok/privacy-and-ai#legitimate-interests-and-the-three-step-test).
(cap. 19)

**LIME.** Local Interpretable Model-agnostic Explanations: explica uma previsão ajustando um modelo
simples interpretável ao comportamento da caixa negra em amostras perturbadas em torno da entrada
[89]; vulnerável a manipulação fora da variedade. Contraste com [SHAP](/glossary/shap). Consulte
[cap. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(cap. 16)

**Localização (por jurisdição).** Controlar onde um sistema de IA é executado e quais
funcionalidades oferece em cada jurisdição, com conjuntos de regras por jurisdição como código,
instâncias regionais onde a residência as exige e sinalizadores de funcionalidade por região, de
modo a que um mercado possa ser desligado sem afetar os outros. Um sistema é lançado numa jurisdição
apenas após demonstrar que os seus deveres aí são cumpridos. Consulte
[cap. 15, Localisation by jurisdiction](/bok/governing-deployment#localisation-by-jurisdiction);
[cap. 05, Pattern: Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).
(cap. 05, 12, 15)

**Perda de controlo.** Um dos riscos sistémicos que o Código de Prática GPAI especifica: riscos de
os humanos perderem a capacidade de dirigir, modificar ou desligar de forma fiável um modelo, que
pode emergir de desalinhamento, auto-replicação, engano, resistência à modificação de objetivos ou
procura de poder [95]. Os signatários avaliam-no para modelos com risco sistémico; um responsável
pela implantação de agentes questiona como a autonomia e o uso de ferramentas foram avaliados.
Consulte [cap. 23, EU AI Act hooks for agents](/bok/governing-agents#eu-ai-act-hooks-for-agents);
[cap. 08, GPAI Code of Practice](/bok/regulatory-map#gpai-code-of-practice). (cap. 08, 23)

## M

**Aprendizagem automática.** O ramo da IA em que um sistema melhora numa tarefa aprendendo padrões a
partir de dados em vez de seguir regras que as pessoas escreveram. A ISO/IEC 22989 agrupa as suas
abordagens em aprendizagem supervisionada, não supervisionada, semi-supervisionada e por reforço
[40]. Consulte [cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Desaprendizagem automática.** Técnicas que removem a influência de um registo de treino de um
modelo sem retreinamento completo. Os métodos exatos retreinam um fragmento afetado [90]; os métodos
aproximados ajustam pesos e são difíceis de verificar, pelo que uma alegação de desaprendizagem é
testada com avaliações de inferência de associação ou extração. Contraste com
[Supressão de saída](/glossary/output-suppression). Consulte
[cap. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning);
[cap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (cap.
05, 19)

**Evidência legível por máquina.** Evidência que uma máquina pode consultar, comparar e agregar
(`OSCAL` artefatos, resultados de avaliação estruturados, registos assinados), em contraste com
capturas de ecrã e folhas de cálculo exportadas. Consulte
[cap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(cap. 03, 04, 05)

**Incidente grave relacionado com TIC (DORA).** Sob a Lei de Resiliência Operacional Digital da UE,
um incidente relacionado com TIC numa entidade financeira que cumpre os critérios de classificação
para um incidente grave. É comunicado no prazo de 4 horas da classificação e no máximo 24 horas da
tomada de conhecimento (no prazo de 4 horas de uma classificação feita após essas 24 horas), depois
em relatórios intermédios e finais [91]. Consulte
[cap. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (cap. 17)

**Defeito de fabrico.** Em responsabilidade do produto, um desvio de uma unidade do seu próprio
design [60]. Para IA: a versão errada do modelo, pesos corrompidos, um guardrail mal configurado ou
um pipeline de dados quebrado no sistema implementado. Contraste com
[Defeito de design](/glossary/design-defect). Consulte
[cap. 20, Defect types mapped to AI failure modes](/bok/existing-law#defect-types-mapped-to-ai-failure-modes).
(cap. 20)

**Autoridade de fiscalização do mercado.** A autoridade nacional designada para fazer cumprir o
Regulamento da IA para produtos colocados no seu mercado, com poderes para investigar, exigir
documentação e exigir ações corretivas. Consulte
[cap. 18, Who supervises what](/bok/eu-ai-act#who-supervises-what). (cap. 08, 18)

**Piso de maturidade.** O nível de maturidade geral único de uma função de governação de IA: o nível
da sua camada de stack mais fraca. É um piso para planeamento, não um veredicto sobre toda a função.
O perfil por camada mostra onde está a alavanca, e o próximo passo é o próximo critério na camada
mais fraca. Consulte
[cap. 07, Observable criteria by layer and level](/bok/maturity-model#observable-criteria-by-layer-and-level);
[Toolkit: Maturity self-check](/toolkit/maturity-self-check). (cap. 07)

**MCP.** Model Context Protocol: um protocolo aberto para ligar aplicações de IA a ferramentas e
fontes de dados; a sua especificação de 2026 adiciona padrões de servidor de recursos OAuth 2.1 e
credenciais vinculadas ao emissor para autorização de agentes [8]. Protege o salto entre um cliente
e um servidor; qual agente está por trás do cliente é para uma identidade de carga de trabalho
dizer. Contraste com [Protocolo A2A (Agent2Agent)](/glossary/a2a-agent2agent-protocol). Consulte
[cap. 23, MCP authorization as of 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28);
[cap. 04, Layer 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 04, 05, 23)

**Inferência de associação.** Um ataque que determina se o registo de uma pessoa específica estava
no conjunto de treino de um modelo a partir do comportamento do modelo [92]. O EDPB conta a
resistência a isto entre a evidência para reclamar que um modelo é anónimo. Contraste com
[Inversão de modelo](/glossary/model-inversion). Consulte
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap. 19)

**Envenenamento de memória.** Uma injeção que escreve na memória de longo prazo de um agente, num
corpus de recuperação, num armazenamento vetorial ou num serviço de memória alojado, contaminando
assim todas as sessões posteriores que leem desse armazenamento [128]. A lista de agentes da OWASP
tem-a como ASI06 Memory & Context Poisoning [6] e a MITRE ATLAS como AI Agent Context Poisoning
(AML.T0080) [126]. Contraste com [Injeção de prompts](/glossary/prompt-injection). Veja
[cap. 23, Memory and context governance](/bok/governing-agents#memory-and-context-governance).
(cap. 23)

**Hierarquia de mitigação.** A ordem em que os tratamentos de risco são tentados: eliminar,
substituir, engenharia, administrativo, depois aceitar e monitorizar. Emprestada da hierarquia de
controlos de segurança ocupacional [93] e espelhada no Artigo 9(5) do Regulamento da IA [2]; degraus
superiores em primeiro lugar, com a razão registada quando são inviáveis. Veja
[cap. 13, Treating risk: the mitigation hierarchy](/bok/risk-management#treating-risk-the-mitigation-hierarchy).
(cap. 13)

**Anonimato de modelo.** O teste do EDPB para quando um modelo treinado fica fora do RGPD: tanto a
extração direta de dados dos titulares de treino como a sua obtenção através de consultas devem ser
insignificantes, tendo em conta todos os meios razoavelmente suscetíveis de serem utilizados [88].
Evidenciado por registos de conceção e avaliações de ataque. Veja
[cap. 19, The EDPB anonymity test](/bok/privacy-and-ai#the-edpb-anonymity-test). (cap. 19)

**Ficha de modelo.** Documentação estruturada e versionada de um modelo (proveniência, utilização
prevista, capacidades, avaliações e modos de falha conhecidos) mantida como código. Contraste com
[Ficha de sistema](/glossary/system-card) e [Ficha de dados](/glossary/data-card). Veja
[cap. 14, Model cards, system cards and datasheets](/bok/governing-development#model-cards-system-cards-and-datasheets);
[cap. 05, Pattern: Model Card as Control Evidence](/bok/patterns#pattern-model-card-as-control-evidence).
(cap. 04, 05, 14)

**Inversão de modelo.** Um ataque que reconstrói características dos titulares de treino, como um
rosto, a partir dos resultados e pontuações de confiança de um modelo [94]. Pode transformar um
modelo implantado num canal para divulgação de dados pessoais. Contraste com
[Inferência de adesão](/glossary/membership-inference). Veja
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap. 19)

**Gestão de risco de modelo.** A prática de supervisão bancária de validar modelos quanto à solidez
conceptual, monitorização e análise de resultados sob desafio efetivo. O SR 11-7 estabeleceu a
tradição dos EUA até que o SR 26-2 o substituiu em 17 de abril de 2026 [67], e o SR 26-2 deixa
modelos de IA generativa e agêntica fora do seu âmbito [121]. Uma disciplina vizinha, aqui estendida
ao comportamento em tempo de execução e agentes. Contraste com
[Gestão de risco](/glossary/risk-management). Veja
[cap. 14, Independent validation and model risk management](/bok/governing-development#independent-validation-and-model-risk-management);
[cap. 21, Sector rules that already reach AI](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai);
[cap. 01, The disambiguation cluster](/bok/definition#the-disambiguation-cluster). (cap. 01, 02, 13,
14, 21)

**Assinatura de modelo.** Assinar os ficheiros de um modelo na construção: um manifesto lista cada
ficheiro com o seu resumo criptográfico e uma assinatura destacada cobre o manifesto, de modo que
qualquer ficheiro alterado falha na verificação. A especificação Model Signing da OpenSSF utiliza o
formato de pacote Sigstore e suporta assinatura sem chave, PKI privada, certificados auto-assinados
ou chaves simples [135]. O servidor verifica a assinatura antes de carregar um modelo. Contraste com
[Proveniência de construção (SLSA)](/glossary/build-provenance-slsa). Veja
[cap. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning);
[cap. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (cap. 05, 14, 15)

**Modelo multimodal.** Um modelo que recebe ou produz mais de uma modalidade (texto, imagem, áudio,
vídeo). Cada modalidade é um novo canal para dados pessoais, instruções injetadas e conteúdo
sintético que pode necessitar de marcação [2], portanto guardrails e avaliações são necessários por
modalidade. Veja [cap. 11, Multimodal models](/bok/ai-defined#multimodal-models). (cap. 11)

## N

**Quase acidente.** Um perigo que um controlo, ou sorte, interrompeu antes de ocorrer dano: o
guardrail bloqueou a exfiltração, o revisor apanhou a dosagem inventada. Os dados de quase acidente
são evidência; o Código de Prática GPAI pede aos prestadores que comuniquem padrões de quase
acidentes conectados com incidentes graves [95]. Contraste com [Perigo de IA](/glossary/ai-hazard).
Veja
[cap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Espaço negativo.** As utilizações que um sistema de IA explicitamente não é para, escritas no seu
Deployment Decision Record. Fica dentro da finalidade prevista do prestador e torna a função creep
detetável, porque uma utilização não aprovada tem um lugar para ser registada como fora do âmbito.
Veja
[cap. 15, Start from the use case, not the model](/bok/governing-deployment#start-from-the-use-case-not-the-model).
(cap. 15)

**Dados neurais.** Informação gerada pela medição da atividade do sistema nervoso central ou
periférico de uma pessoa. A Califórnia trata-a como informação pessoal sensível [96], o que ativa
deveres de consentimento e avaliação para sistemas de IA que leem dispositivos portáteis ou
interfaces cérebro-computador. Veja
[cap. 19, Consumer-health and neural data](/bok/privacy-and-ai#consumer-health-and-neural-data).
(cap. 19)

**NHI.** Identidade não humana: a identidade de um agente, conta de serviço ou ator máquina. Cada
NHI obtém uma entrada de registo, um proprietário e um âmbito antes de ser autorizado a atuar.
Contraste com [Identidade de carga de trabalho](/glossary/workload-identity). Veja
[cap. 05, Pattern: Agent Identity & Scoped Credentials](/bok/patterns#pattern-agent-identity--scoped-credentials);
[cap. 23, Identity and short-lived credentials](/bok/governing-agents#identity-and-short-lived-credentials).
(cap. 04, 05, 23)

**NIST AI RMF.** O NIST Artificial Intelligence Risk Management Framework 1.0 (NIST AI 100-1,
janeiro de 2023): orientação voluntária organizada como um Núcleo de quatro funções (Govern, Map,
Measure, Manage) com categorias e subcategorias, mais perfis e um Playbook complementar [3][30].
Veja [cap. 22, NIST AI RMF 1.0 in depth](/bok/principles-and-standards#nist-ai-rmf-10-in-depth);
[cap. 08, NIST AI RMF](/bok/regulatory-map#nist-ai-rmf). (cap. 08, 22)

**Organismo notificado.** Um organismo de avaliação da conformidade designado sob o Regulamento da
IA da UE para realizar avaliação da conformidade de terceiros de sistemas de IA de risco elevado.
Sob o procedimento de organismo notificado, avalia o sistema de gestão da qualidade e a documentação
técnica do prestador, com acesso a dados de treino, validação e teste [2]. Veja
[cap. 18, Conformity assessment, declaration, marking and registration](/bok/eu-ai-act#conformity-assessment-declaration-marking-and-registration);
[cap. 14, EU AI Act conformity, in order](/bok/governing-development#eu-ai-act-conformity-in-order).
(cap. 14, 18)

## O

**Princípios de IA da OCDE.** Os cinco princípios baseados em valores (crescimento inclusivo e
bem-estar; direitos humanos, equidade e privacidade; transparência e explicabilidade; robustez,
segurança e proteção; responsabilidade) e cinco recomendações políticas da Recomendação da OCDE
sobre IA, adotada em 2019 e revista em 2024 [31]. Um compromisso dos governos aderentes, não uma
regra vinculativa para empresas. Veja
[cap. 22, OECD AI Principles](/bok/principles-and-standards#oecd-ai-principles). (cap. 11, 22)

**Estrutura da OCDE para a Classificação de Sistemas de IA.** Uma ferramenta da OCDE (2022) para
caracterizar um sistema de IA de uma perspetiva política ao longo de cinco dimensões: People &
Planet, Economic Context, Data & Input, AI Model, e Task & Output [97]. Na prática de engenharia, as
suas dimensões tornam-se grupos de campos de registo que encaminham controlos. Veja
[cap. 22, The Framework for the Classification of AI Systems](/bok/principles-and-standards#the-framework-for-the-classification-of-ai-systems).
(cap. 22)

**OPA/Rego.** O Open Policy Agent e a sua linguagem de política Rego, um motor de política como
código de uso geral que avalia regras de governação em CI/CD e na admissão em tempo de execução; o
exemplo canónico de política como código executável. Contraste com [Cedar](/glossary/cedar). Veja
[cap. 06, Policy-as-code and gates](/bok/the-role#policy-as-code-and-gates). (cap. 04, 05, 06)

**Opacidade.** A incapacidade de uma pessoa seguir como um sistema chegou a um resultado. Tem três
fontes (sigilo, analfabetismo técnico e a natureza e escala da aprendizagem automática) [98], cada
uma com uma correção diferente: divulgação, literacia e métodos de explicação mais avaliações
comportamentais. Contraste com [Explicabilidade](/glossary/explainability). Veja
[cap. 11, Eight characteristics that break classic IT governance](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance);
[cap. 11, Contrast pairs](/bok/ai-defined#contrast-pairs). (cap. 11)

**Modelo de peso aberto.** Um modelo cujos pesos treinados são publicados para descarregamento sob
uma licença que pode ser permissiva, copyleft, restrita ao uso ou personalizada [99]. Pesos abertos
não são código aberto; o responsável pela implantação produz quase toda a evidência (hashes,
análises, avaliações, equipa vermelha) e deve honrar a licença e qualquer política de uso aceitável.
Contraste com [Licença de IA Responsável (OpenRAIL)](/glossary/responsible-ai-licence-openrail).
Veja [cap. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences);
[cap. 18, Open-source carve-outs and their limits](/bok/eu-ai-act#open-source-carve-outs-and-their-limits).
(cap. 15, 18)

**Operador (Regulamento da IA da UE).** O termo abrangente para os atores que o Regulamento da IA
vincula: prestador, fabricante de produto, responsável pela implantação, mandatário, importador e
distribuidor [2]. A mesma organização pode ser vários operadores para sistemas diferentes, ou para o
mesmo. Veja [cap. 18, The EU operator roles](/bok/eu-ai-act#the-eu-operator-roles). (cap. 18)

**OSCAL.** A Open Security Controls Assessment Language, um formato legível por máquina NIST para
controlos, avaliações e evidência, utilizado aqui como o formato para evidência pronta para
auditoria [3]. Veja
[cap. 05, Pattern: Machine-Readable Evidence (OSCAL)](/bok/patterns#pattern-machine-readable-evidence-oscal).
(cap. 04, 05, 10)

**Supressão de resultado.** Um filtro em torno de um modelo que o impede de produzir dados de uma
pessoa: a resposta rápida e primeira a um pedido de apagamento ou objeção quando os dados estão nos
pesos e o retreino é desproporcionado. A CNIL aceita filtros demonstrados como eficazes e robustos e
prefere regras gerais a uma lista de nomes [140]. Os dados permanecem no modelo. Contraste com
[Desaprendizagem automática](/glossary/machine-unlearning). Veja
[cap. 19, Suppression, retraining and unlearning](/bok/privacy-and-ai#suppression-retraining-and-unlearning);
[cap. 05, Pattern: Rights Requests Against Models](/patterns/rights-requests-against-models). (cap.
05, 19)

## P

**Caminho pavimentado.** Uma rota suportada, de baixo atrito e padrão (um modelo, biblioteca ou
pipeline) que torna o caminho governado o caminho mais fácil para enviar, de modo que os engenheiros
adotem a governação sem pedir permissão. Veja
[cap. 03, Make the governed path the easiest path](/bok/values-and-principles#make-the-governed-path-the-easiest-path).
(cap. 03, 06)

**Violação de dados pessoais.** Uma violação de segurança que leva à destruição, perda, alteração ou
divulgação acidental ou ilícita de, ou acesso a, dados pessoais, notificada à autoridade no prazo de
72 horas a menos que improvável resultar num risco [38]. A IA acrescenta regurgitação, inversão e
exfiltração por injeção de prompts como rotas. Veja
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap. 19)

**PIPIA.** Avaliação de impacto de informação pessoal da China sob os Artigos 55 e 56 da PIPL,
necessária antecipadamente para dados sensíveis, decisões automatizadas, processamento confiado e
provisão transfronteiriça, com o relatório mantido por pelo menos três anos [100]. Contraste com
[AIPD](/glossary/dpia). Veja [cap. 19, Brazil and China](/bok/privacy-and-ai#brazil-and-china).
(cap. 19)

**Colocação no mercado.** Sob o Regulamento da IA da UE, a primeira disponibilização de um sistema
de IA ou modelo de IA de finalidade geral no mercado da União; os fornecimentos posteriores no
decurso de uma atividade comercial são disponibilização [2]. Para um sistema de risco elevado, a
avaliação da conformidade e a documentação técnica precedem-na, ou precedem a colocação em serviço.
Contraste com [Colocação em serviço](/glossary/putting-into-service). Veja
[cap. 18, Os papéis de operador da UE](/bok/eu-ai-act#the-eu-operator-roles);
[Toolkit: triagem de papel e classe de risco do Regulamento da IA da UE](/toolkit/ai-act-triage).
(cap. 08, 14, 15, 18, 20)

**Policy Card.** Um artefato de governação legível por máquina em esquema JSON que declara os
comportamentos permitidos e proibidos de um agente para aplicação em tempo de execução [11]. Veja
[cap. 05, Padrão: Policy Card](/bok/patterns#pattern-policy-card). (cap. 04, 05, 10, 23)

**Veredicto de política.** O registo estruturado que um motor de política emite cada vez que avalia
uma regra: permitir ou negar, o id da regra versionado, um hash da entrada e um carimbo de
data/hora, assinado e escrito no arquivo de evidência. Uma libertação ou chamada de ferramenta sem
veredicto é uma constatação de auditoria, e uma que passou sob uma exceção nomeia-a no seu
veredicto. Veja [cap. 04, Camada 01: Governance-as-Code](/bok/the-stack#layer-01-govern-as-code);
[Toolkit: construtor de Policy Card](/toolkit/policy-card). (cap. 04, 05, 12, 23)

**Política como código.** Política de governação expressa numa linguagem de política executável
(`OPA/Rego`, Cedar) que avalia em CI/CD e na admissão; o subconjunto mais restrito, de pipeline, de
governance-as-code. Contraste com [Governance-as-code](/glossary/governance-as-code). Veja
[cap. 06, Política como código e portas](/bok/the-role#policy-as-code-and-gates). (cap. 04, 05, 06)

**Acompanhamento pós-comercialização.** O dever do Artigo 72 do Regulamento da IA de monitorizar
ativamente o desempenho e os riscos de um sistema de risco elevado após implantação, ao longo da sua
vida útil [2]. Veja
[cap. 18, Acompanhamento pós-comercialização e incidentes graves (Artigos 72 e 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(cap. 08, 18)

**Alterações pré-determinadas.** Alterações a um sistema de risco elevado que continua a aprender,
planeadas pelo prestador na avaliação de conformidade inicial e descritas na documentação técnica;
não são modificações substanciais [2]. Engenhadas como um envelope de alteração escrito em código.
Contraste com [Modificação substancial](/glossary/substantial-modification). Veja
[cap. 14, Modificação substancial](/bok/governing-development#substantial-modification). (cap. 14)

**IA preditiva.** IA que produz uma estimativa sobre algo que existe: uma pontuação, classe ou
previsão [21]. Os seus danos são principalmente danos de alocação, e a sua evidência é precisão,
calibração e taxas de erro por subgrupo, com um limiar de decisão que alguém detém. Também chamada
IA discriminativa. Contraste com [IA generativa](/glossary/generative-ai). Veja
[cap. 11, Preditiva versus generativa](/bok/ai-defined#predictive-versus-generative). (cap. 11)

**Presunção de conformidade.** O efeito legal sob o Artigo 40 do Regulamento da IA: um sistema de
risco elevado ou modelo GPAI que está em conformidade com normas harmonizadas citadas no JO
presume-se que cumpre os requisitos que essas normas cobrem, e nenhuns outros [2]. Indisponível até
uma norma ser citada, que a partir de 2026-09-24 nenhuma está [10]. Veja
[cap. 22, Como funciona a presunção de conformidade](/bok/principles-and-standards#how-presumption-of-conformity-works).
(cap. 08, 22)

**Proteção de dados desde a conceção e por defeito.** O dever do Artigo 25 do RGPD de incorporar
princípios de proteção de dados no tratamento através de medidas técnicas e organizacionais, e de
tratar por defeito apenas os dados pessoais que cada finalidade necessita [38]. Numa stack de IA
aparece como filtros, regras de retenção e limites de acesso aplicados como código. Veja
[cap. 19, Minimização, proteção de dados desde a conceção e PETs](/bok/privacy-and-ai#minimisation-privacy-by-design-and-pets).
(cap. 19)

**Tecnologia de melhoria da privacidade (PET).** Uma técnica que reduz o que um atacante, fornecedor
ou insider pode aprender a partir de dados pessoais, tal como privacidade diferencial, aprendizagem
federada, dados sintéticos, mascaramento ou execução confiável [61]. Nenhuma torna um sistema
conforme por si só; cada uma tem um modo de falha conhecido e é evidenciada por um teste. Veja
[cap. 19, Tecnologias de melhoria da privacidade e os seus limites honestos](/bok/privacy-and-ai#privacy-enhancing-technologies-and-their-honest-limits).
(cap. 19)

**Diretiva relativa à responsabilidade decorrente dos produtos defeituosos (PLD).** Diretiva (UE)
2024/2853, que trata software, incluindo IA, como um produto; julga defeito com aprendizagem e
atualizações em vista; permite aos tribunais ordenar divulgação e presumir defeito; e aplica-se a
produtos colocados no mercado após 9 de dezembro de 2026 [101]. Veja
[cap. 20, A Diretiva relativa à responsabilidade decorrente dos produtos defeituosos da UE](/bok/existing-law#the-eu-product-liability-directive).
(cap. 20)

**Sobreposição de definição de perfis.** A regra no terceiro parágrafo do Artigo 6(3) do Regulamento
da IA que um sistema do Anexo III que realiza definição de perfis de pessoas singulares é sempre de
risco elevado, qualquer que seja a condição de filtro que cumpra [2]. Um registo de decisão de
classificação carrega portanto uma bandeira de definição de perfis explícita, para que uma alegação
de filtro que a sobreposição derrota seja visível. Contraste com
[Filtro do Artigo 6(3)](/glossary/article-6-3-filter). Veja
[cap. 18, O filtro do Anexo III e a sobreposição de definição de perfis](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override);
[Toolkit: triagem de papel e classe de risco do Regulamento da IA da UE](/toolkit/ai-act-triage).
(cap. 08, 18)

**Entrega progressiva.** Libertar uma alteração para uma quota pequena e crescente de tráfego real
em fases (sombra, piloto, canário, disponibilidade geral), cada uma com critérios de reversão
registados antes de começar e um caminho testado de volta à versão anterior, para que a evidência
sobre comportamento em direto chegue antes da exposição completa. Para sistemas de IA cobre
alterações de modelo, prompt, corpus e versão de fornecedor igualmente. Veja
[cap. 15, Entrega progressiva como um controlo](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Padrão: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 14, 15, 23)

**Prática proibida.** Uma prática de IA banida completamente pelo Artigo 5 do Regulamento da IA, tal
como técnicas manipuladoras que causam dano significativo, classificação social, raspagem não
direcionada de imagens faciais, reconhecimento de emoções no trabalho ou escola, e a maioria da
identificação biométrica remota em tempo real em público para aplicação da lei [2]. Nenhuma
aceitação de risco pode cobrir uma. Contraste com
[Sistema de IA de risco elevado](/glossary/high-risk-ai-system). Veja
[cap. 18, Práticas proibidas (Artigo 5)](/bok/eu-ai-act#prohibited-practices-article-5). (cap. 18)

**Injeção de prompts.** Uma entrada que altera o comportamento ou a saída de um modelo de formas que
os seus designers não pretendiam. É direta quando o utilizador a fornece e indireta quando chega
dentro de conteúdo que o modelo processa, tal como uma página web, ficheiro ou resultado de
ferramenta [84]. Contida por guardrails, ferramentas de privilégio mínimo e avaliações. Contraste
com [Jailbreak](/glossary/jailbreak) e
[Exposição de Contexto Oculto](/glossary/hidden-context-exposure). Veja
[cap. 04, Camada 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 01, 04, 17, 23)

**Governação proporcional.** Executar o mesmo ciclo de risco numa intensidade definida pelo tamanho
da organização, setor, maturidade e tolerância ao risco, acima de um piso de controlos que nunca se
adapta. O próprio Regulamento da IA dimensiona deveres de documentação e gestão da qualidade para
empresas mais pequenas [2]. Reduz o custo da governação, não a proteção devida. Veja
[cap. 13, Governação proporcional: adaptação do ciclo](/bok/risk-management#proportionate-governance-tailoring-the-loop).
(cap. 13)

**Prestador.** Sob o Regulamento da IA da UE, quem quer que desenvolva um sistema de IA ou modelo de
IA de finalidade geral, ou o tenha desenvolvido, e o coloque no mercado ou o coloque em serviço sob
o seu próprio nome ou marca comercial, quer por pagamento quer gratuitamente [2]. Carrega os deveres
de conceção, documentação, conformidade e monitorização para sistemas de risco elevado. Contraste
com [Responsável pela implantação](/glossary/deployer). Veja
[cap. 18, Os papéis de operador da UE](/bok/eu-ai-act#the-eu-operator-roles). (cap. 15, 18)

**Rótulo substituto.** Um alvo de treino que representa a construção que uma decisão se destina a
capturar, tal como custo de cuidados de saúde representando necessidade de saúde [102]. Quando o
substituto é moldado por tratamento desigual, um modelo pode ser preciso no substituto e enviesado
na construção. Contraste com [Variável substituta](/glossary/proxy-variable). Veja
[Caso: uma pontuação de risco de saúde com um rótulo substituto](/cases/health-risk-score-proxy).
(cap. 16)

**Análise de substituto.** Um teste que treina um modelo para prever um atributo protegido a partir
das características de um sistema; características que o predizem fortemente são sinalizadas como
substitutos para justificar ou remover, e o resultado é registado na ficha de dados. Encontra
variáveis substitutas antes de uma métrica de resultado mostrar o seu efeito. Veja
[cap. 16, Equidade e explicabilidade na stack](/bok/fairness-and-explainability#fairness-and-explainability-in-the-stack);
[cap. 05, Padrão: Fairness Eval Suite](/patterns/fairness-eval-suite). (cap. 05, 16)

**Variável substituta.** Uma característica que carrega a informação de uma característica
protegida, tal como código postal para etnia, para que um modelo possa discriminar sem usar o
atributo em si. Testes de substituto procuram características que predizem o atributo protegido
[102]. Contraste com [Rótulo substituto](/glossary/proxy-label). Veja
[cap. 16, Características protegidas, substitutos e os dados que precisa para testar](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test).
(cap. 16, 20)

**Pseudonimização.** Processamento de dados pessoais para que deixem de poder ser atribuídos a uma
pessoa sem informação adicional mantida separadamente e protegida [38]. Dados pseudonimizados
continuam a ser dados pessoais para quem os possa re-atribuir; é uma medida de segurança, não
anonimização. Contraste com [Dados anónimos](/glossary/anonymous-data). Veja
[cap. 19, Anonimização versus pseudonimização](/bok/privacy-and-ai#anonymisation-versus-pseudonymisation).
(cap. 19)

**Limitação de finalidade.** O princípio do RGPD que dados pessoais recolhidos para uma finalidade
especificada não podem ser processados posteriormente de forma incompatível; o Artigo 6(4)
estabelece o teste de compatibilidade [38]. Aplicado em pipelines de IA por etiquetas de finalidade
em conjuntos de dados e uma política que nega execuções cuja finalidade declarada não corresponde.
Veja
[cap. 19, Limitação de finalidade e expansão de função](/bok/privacy-and-ai#purpose-limitation-and-function-creep).
(cap. 19)

**Colocação em serviço.** Sob o Regulamento da IA da UE, o fornecimento de um sistema de IA para
primeiro uso diretamente ao responsável pela implantação, ou para uso do prestador, na União para a
sua finalidade prevista [2]. O uso próprio conta: uma organização que constrói um sistema e o
executa é o seu prestador e o seu responsável pela implantação, sem venda envolvida. Contraste com
[Colocação no mercado](/glossary/placing-on-the-market). Veja
[cap. 18, Os papéis nomeiam tarefas, não organizações](/bok/eu-ai-act#roles-name-tasks-not-organisations);
[Toolkit: triagem de papel e classe de risco do Regulamento da IA da UE](/toolkit/ai-act-triage).
(cap. 15, 18)

## Q

**QMS (Art. 17).** O sistema de gestão da qualidade que o Artigo 17 do Regulamento da IA exige dos
prestadores de risco elevado; distinto de um AIMS ISO/IEC 42001, que certifica um sistema de gestão
mas não é harmonizado [2][10]. Contraste com [AIMS](/glossary/aims). Veja
[cap. 18, Artigo 16 e o sistema de gestão da qualidade (Artigo 17)](/bok/eu-ai-act#article-16-and-the-quality-management-system-article-17).
(cap. 08, 18)

## R

**RAISE Act.** Lei de Segurança e Educação em IA Responsável de Nova Iorque, uma lei de segurança de
IA de fronteira que vincula grandes programadores de fronteira à publicação de um quadro de
segurança e obriga todos os programadores de fronteira a comunicar incidentes críticos de segurança;
assinada a 19 de dezembro de 2025 e em vigor a partir de 1 de janeiro de 2027 após uma alteração do
capítulo em março de 2026 que colocou a supervisão num serviço dentro do Departamento de Serviços
Financeiros (DFS) [12][15]. Ver
[cap. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (cap. 08, 21)

**Redução efetiva do risco.** A queda medida na taxa ou raio de explosão de um modo de falha nomeado
em produção; um dos dois testes da disciplina, em relação à cobertura do quadro. Ver
[cap. 03, 7. Success is measured in realised risk reduction, not framework coverage](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage).
(cap. 01, 03)

**Código de razão.** Uma declaração estável e legível por humanos de um fator principal por trás de
uma decisão adversa, mapeada a partir dos fatores que o modelo realmente pontuou e versionada com o
modelo; exigida em substância pelas regras de ação adversa dos EUA [23]. Ver
[cap. 16, Credit: adverse-action notices and reason codes](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes);
[cap. 05, Pattern: Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[cap. 05, Pattern: Explanation Artefact](/patterns/explanation-artefact). (cap. 05, 16, 20)

**Utilização indevida razoavelmente previsível.** Utilização de um sistema de IA não em conformidade
com a sua finalidade prevista que pode resultar de comportamento humano razoavelmente previsível ou
interação com outros sistemas, incluindo outros sistemas de IA [2]. Distinto de um ataque; mantido
num registo de utilização indevida que alimenta testes, política em tempo de execução e as
instruções de utilização. Contraste com [Intended purpose](/glossary/intended-purpose). Ver
[cap. 14, Reasonably foreseeable misuse](/bok/governing-development#reasonably-foreseeable-misuse);
[cap. 15, Secondary use and downstream harm](/bok/governing-deployment#secondary-use-and-downstream-harm).
(cap. 14, 15)

**Registos das atividades de tratamento (ROPA).** O registo do Artigo 30 do RGPD de cada atividade
de tratamento: finalidades, categorias de dados e pessoas, destinatários, transferências, retenção e
segurança [38]. Para IA é melhor gerado por momento de tratamento a partir do registo e fichas de
dados, para não ficar obsoleto. Ver
[cap. 19, Records of processing](/bok/privacy-and-ai#records-of-processing). (cap. 19)

**Recurso.** A capacidade de uma pessoa obter uma decisão diferente alterando entradas sobre as
quais pode realmente agir, como rendimento em vez de idade [103]. Explicações contrafactuais
restritas a características acionáveis são a sua forma de engenharia usual; um sistema pode oferecer
contestação e ainda deixar sem recurso. Contraste com [Contestability](/glossary/contestability).
Ver
[cap. 16, Counterfactual explanations](/bok/fairness-and-explainability#counterfactual-explanations).
(cap. 16, 21)

**Red teaming.** Testes adversariais estruturados de um modelo ou agente para provocar falhas
(jailbreaks, injeção, utilização indevida de ferramentas) antes de um atacante o fazer; tratado aqui
como um controlo produtor de evidência. Ver
[cap. 05, Pattern: Adversarial Red-Team Suite](/bok/patterns#pattern-adversarial-red-team-suite).
(cap. 04, 05, 15)

**Regurgitação.** Um modelo reproduzindo dados de treino memorizados verbatim, incluindo dados
pessoais, quer solicitado deliberadamente (extração de dados de treino) ou não [104]. Detetado por
verificações de saída e canários, e testado por avaliações de extração. Contraste com
[Hallucination](/glossary/hallucination). Ver
[cap. 19, AI-specific privacy breaches](/bok/privacy-and-ai#ai-specific-privacy-breaches). (cap.
19, 20)

**Aprendizagem por reforço.** Aprender a maximizar um sinal de recompensa através de tentativa e
feedback [40]. A sua falha característica é a exploração de recompensa, portanto a recompensa é
registada como o objetivo do sistema e as avaliações procuram estratégias não intencionais. Ver
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Aprendizagem por reforço a partir de feedback humano (RLHF).** Uma forma de alinhar um modelo
pré-treinado: ajuste fino supervisionado em demonstrações humanas, depois aprendizagem por reforço
contra um modelo de recompensa treinado em classificações humanas de saídas [105]. As instruções dos
avaliadores e o modelo de recompensa tornam-se artefatos governados, porque moldam o que o modelo
recusa e prefere. Contraste com [Fine-tuning](/glossary/fine-tuning). Ver
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Relógio de comunicação.** Um prazo estatutário para uma notificação de incidente, definido pelo
seu acionador (conhecimento, classificação, ligação causal ou determinação), destinatário, conteúdo
e acompanhamentos, como no Artigo 73 do Regulamento da IA [2]. Um evento pode iniciar vários
relógios, portanto cada um é mantido como seu próprio temporizador num único registo de incidente.
Ver [cap. 17, The overlapping clocks](/bok/incidents#the-overlapping-clocks). (cap. 17)

**Risco residual.** O que resta de um risco uma vez aplicado o tratamento [30]. O Regulamento da IA
da UE exige que o risco residual por perigo e global seja julgado aceitável para sistemas de risco
elevado [2]. Uma classificação residual credita apenas controlos cuja evidência é atual. Contraste
com [Inherent risk](/glossary/inherent-risk) e [Risk tolerance](/glossary/risk-tolerance). Ver
[cap. 13, Inherent risk, residual risk and who accepts it](/bok/risk-management#inherent-risk-residual-risk-and-who-accepts-it).
(cap. 13)

**Licença de IA responsável (OpenRAIL).** Uma licença que concede acesso aberto e isento de
royalties a um artefato de IA enquanto anexa utilizações proibidas que toda a redistribuição e
derivado deve levar adiante [106]. As restrições viajam com o modelo, portanto os próprios termos de
utilização de um responsável pela implantação devem repeti-las. Contraste com
[Open-weight model](/glossary/open-weight-model). Ver
[cap. 15, Open-weight licences](/bok/governing-deployment#open-weight-licences). (cap. 15)

**Conjunto de princípios de IA responsável.** Um conjunto publicado de objetivos normativos para IA,
como os Princípios de IA da OCDE [31], a Recomendação da UNESCO, os requisitos do HLEG ou os
princípios de Hiroshima do G7. Não o "princípio" da casa, que é uma regra de método; um conjunto de
princípios conta como aplicado apenas quando um artefato o evidencia. Contraste com
[Trustworthy AI](/glossary/trustworthy-ai). Ver
[cap. 11, Responsible-AI principle sets, engineered](/bok/ai-defined#responsible-ai-principle-sets-engineered).
(cap. 11)

**Geração aumentada por recuperação (RAG).** Um sistema que combina a memória aprendida de um modelo
com um armazém recuperável de documentos no momento da resposta [107]. O corpus torna-se
comportamento, portanto é governado como um modelo: versionado, cartografado, ligado à avaliação que
o testou, com uma verificação de direito sobre o que cada utilizador pode recuperar. Ver
[cap. 11, RAG systems](/bok/ai-defined#rag-systems). (cap. 11, 16)

**Exploração de recompensa.** Um sistema encontrando uma forma não intencional de maximizar sua
recompensa ou objetivo sem fazer o que seus designers pretendiam [108]. Respondido registando o
objetivo e testando estratégias não intencionais, não apenas a tarefa pretendida. Ver
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Direito à explicação (Regulamento da IA Art. 86).** O direito de uma pessoa afetada pela decisão
de um responsável pela implantação baseada na saída de um sistema de risco elevado do Anexo III, com
efeitos adversos legais ou igualmente significativos, a explicações claras e significativas do papel
do sistema e dos elementos principais da decisão, quando a lei da União não o prevê já [2].
Contraste com [Explainability](/glossary/explainability). Ver
[cap. 18, Explanation and notice to affected people](/bok/eu-ai-act#explanation-and-notice-to-affected-people).
(cap. 16, 18, 19)

**Reserva de direitos (opt-out de TDM).** A reserva expressa de um detentor de direitos de mineração
de texto e dados sob o Artigo 4(3) da Diretiva DSM, que retira o conteúdo da exceção geral de
mineração; para conteúdo disponibilizado publicamente online deve ser feita de forma apropriada,
como meios legíveis por máquina [115]. Os prestadores de modelos de IA de finalidade geral devem
identificar e cumprir tais reservas [2]. Contraste com [TDM exception](/glossary/tdm-exception). Ver
[cap. 20, Artefacts that evidence IP compliance](/bok/existing-law#artefacts-that-evidence-ip-compliance);
[cap. 05, Pattern: Training-Data Rights Ledger](/patterns/training-data-rights-ledger). (cap. 05,
08, 12, 20)

**Aceitação de risco.** Uma decisão nomeada, assinada e com expiração por alguém com a autoridade
que uma banda residual exige, que um risco pode permanecer por um período limitado sob controlos
compensadores nomeados e um sinal de monitorização que o anula [30]. A autoridade aumenta com a
classificação; uma utilização proibida não pode ser aceite por ninguém. Contraste com
[Exception register](/glossary/exception-register). Ver
[cap. 13, Who may accept](/bok/risk-management#who-may-accept);
[cap. 12, Risk acceptance and exceptions](/bok/governance-program#risk-acceptance-and-exceptions).
(cap. 12, 13)

**Apetite de risco.** Quanto risco, e de que tipos, uma organização está preparada para assumir na
prossecução dos seus objetivos [109]. Neste livro é compilado a partir de uma declaração aprovada
num ficheiro de dados versionado que controla a leitura, em vez de deixado num documento de
conselho. Contraste com [Risk tolerance](/glossary/risk-tolerance). Ver
[cap. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(cap. 13)

**Gestão de riscos.** A prática organizada de orientar as decisões de uma organização com os seus
riscos em vista [109]: identificar, avaliar, tratar e monitorizar, num ciclo. Para sistemas de risco
elevado o Regulamento da IA exige um sistema de gestão de riscos documentado ao longo do ciclo de
vida [2]. Contraste com [Model risk management](/glossary/model-risk-management). Ver
[cap. 13, The loop: identify, assess, treat, monitor](/bok/risk-management#the-loop-identify-assess-treat-monitor).
(cap. 13)

**Matriz de risco.** Uma grelha que transforma uma classificação de probabilidade e uma
classificação de gravidade, cada uma em escalas definidas, numa banda que desencadeia um tratamento,
um controlo e uma cadência de revisão. Útil para consistência, não precisão [110]; mantenha os
números por trás de cada célula. Ver
[cap. 13, Assessing risk: the likelihood-by-severity matrix](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix).
(cap. 13)

**Registo de riscos.** O registo de evidência do ciclo de risco: um ficheiro versionado por risco,
indexado a um id de registo, com classificações, tratamento, controlos que se resolvem em evidência,
proprietário, aceitação, cadência de revisão e ligações a avaliações, incidentes e obrigações. Os
controlos de implantação o leem; evidencia um sistema de gestão de riscos do Artigo 9 [2]. Contraste
com [Exception register](/glossary/exception-register). Ver
[cap. 13, The risk register as an evidence record](/bok/risk-management#the-risk-register-as-an-evidence-record).
(cap. 13)

**Fonte de risco.** Qualquer coisa que possa dar origem a risco sozinha ou em combinação, como um
conjunto de dados, uma concessão de ferramenta, um adversário ou um grupo de utilizadores [111]. As
fontes internas situam-se dentro do controlo da organização; as externas surgem fora dela e são
principalmente engenhadas contra e monitorizadas. Contraste com
[Contributing factor](/glossary/contributing-factor). Ver
[cap. 13, Internal and external risk sources](/bok/risk-management#internal-and-external-risk-sources).
(cap. 13)

**Nível de risco.** A classificação própria de uma organização de um caso de uso de IA, calculada na
admissão por uma política versionada a partir de campos de perfil declarados, como autonomia,
impacto da decisão, exposição, reversibilidade, grupos vulneráveis, classe de dados e terceiros. O
nível seleciona as avaliações, avaliações, limiares, aprovadores e cadência de revisão que um
sistema deve cumprir; situa-se ao lado da classificação legal, não em seu lugar. Contraste com
[High-risk AI system](/glossary/high-risk-ai-system). Veja
[cap. 13, Contributing factors and the use-case risk profile](/bok/risk-management#contributing-factors-and-the-use-case-risk-profile);
[cap. 05, Pattern: Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (cap.
05, 06, 12, 13)

**Tolerância ao risco.** A disposição em suportar um determinado risco para alcançar objetivos [30].
Engenhada como a banda residual mais elevada que um nível de sistema pode ter antes de uma porta de
implantação exigir uma aceitação assinada. Contraste com [Risk appetite](/glossary/risk-appetite).
Veja
[cap. 13, Risk appetite and tolerance, compiled into gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates).
(cap. 13)

**Critérios de reversão.** As condições, escritas no plano de implementação antes de uma fase de
lançamento começar, sob as quais o pipeline retorna à versão anterior automaticamente: um piso
violado em relação ao grupo de controlo, uma taxa de discordância ou sobreposição acima de um
limiar, um evento de severidade 1. Um critério definido após a métrica ter mudado é uma negociação,
não um controlo. Contraste com [Kill switch](/glossary/kill-switch). Veja
[cap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 15)

**Análise de causa raiz (RCA).** A revisão que responde por que um incidente aconteceu e por que os
controlos não o impediram, utilizando técnicas como os cinco porquês, análise de árvore de falhas
[112] e post-mortems sem culpa, e codifica cada causa confirmada em relação a uma taxonomia que
nomeia o controlo que deveria tê-la detetado. Veja
[cap. 17, Root-cause analysis](/bok/incidents#root-cause-analysis). (cap. 17)

**Caminho de dados em tempo de execução.** A ligação em direto entre produção e a função de
governação (descoberta, telemetria e aplicação), sem a qual um registo ou painel de controlo
descreve o programa mas não consegue ver o que está em execução [13]. Veja
[cap. 02, 5. No runtime data path](/bok/why-now#5-no-runtime-data-path). (cap. 02, 04, 07)

## S

**Safetensors.** Um formato de ficheiro para armazenar os tensores de um modelo com segurança, em
contraste com Python pickle [137], cujo carregamento pode executar código arbitrário e que a
documentação do Python designa como não seguro [138]. Armazenar pesos como safetensors e analisar
quaisquer ficheiros pickle restantes para importações que executem código antes de chegarem a um
registo fecha uma rota comum de cadeia de fornecimento para a disponibilização. Veja
[cap. 14, Reproducibility and linked versioning](/bok/governing-development#reproducibility-and-linked-versioning);
[cap. 05, Pattern: Model Artefact Integrity](/patterns/model-artefact-integrity). (cap. 05, 14)

**Componente de segurança.** Sob o Regulamento da IA conforme alterado em 2026, um componente de um
produto ou sistema de IA cuja finalidade prevista é prevenir ou mitigar riscos para a saúde e
segurança das pessoas ou propriedade, ou cuja falha as coloca em perigo. A IA utilizada unicamente
para conveniência, eficiência ou controlo de qualidade é excluída, a menos que a sua falha colocasse
em perigo a segurança [2]. Veja
[cap. 18, High-risk through products (Annex I)](/bok/eu-ai-act#high-risk-through-products-annex-i).
(cap. 18)

**Gateway de IA autorizado.** A rota única aprovada pela qual o pessoal acede a ferramentas de IA e
APIs de modelos: ferramentas aprovadas atrás de um único início de sessão e um gateway que
classifica cada pedido por classe de dados, permite, redige ou bloqueia sob a política de utilização
aceitável, verifica uma atestação atual e regista uma decisão por chamada. Funciona por ser a rota
mais fácil. Contraste com [Shadow AI](/glossary/shadow-ai). Veja
[cap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff);
[cap. 05, Pattern: Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway). (cap. 05, 12)

**SB 53.** Lei de transparência de IA de fronteira da Califórnia (TFAIA), em vigor a partir de 1 de
janeiro de 2026, abrangendo programadores de fronteira que treinam modelos acima de 10^26 FLOP:
todos eles publicam relatórios de transparência e comunicam incidentes críticos de segurança, e
grandes programadores de fronteira também publicam um quadro de segurança [14][142]. Veja
[cap. 08, Frontier-developer laws](/bok/regulatory-map#frontier-developer-laws). (cap. 08, 21)

**Aprendizagem auto-supervisionada.** Aprendizagem pela previsão de partes da entrada em si mesma,
como o próximo token, sobre grandes corpora; a definição do Regulamento da IA de um modelo de
finalidade geral nomeia a auto-supervisão em escala [2]. A proveniência do corpus, direitos e
memorização são difíceis de rastrear, razão pela qual o AIBOM regista a proveniência do conjunto de
dados. Veja [cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Incidente grave.** Sob o Artigo 3(49) do Regulamento da IA, um incidente ou mau funcionamento de
um sistema de IA que direta ou indiretamente leva a (a) morte ou lesão grave à saúde, (b)
perturbação grave e irreversível de infraestrutura crítica, (c) violação de obrigações do direito da
União que protegem direitos fundamentais, ou (d) dano grave à propriedade ou ao ambiente, acionando
comunicação do Artigo 73 [2]. Contraste com [AI incident](/glossary/ai-incident). Veja
[cap. 17, Incident, hazard, issue and serious incident](/bok/incidents#incident-hazard-issue-and-serious-incident);
[cap. 18, Post-market monitoring and serious incidents (Articles 72 and 73)](/bok/eu-ai-act#post-market-monitoring-and-serious-incidents-articles-72-and-73).
(cap. 04, 08, 17, 18)

**Shadow AI.** Um sistema de IA, modelo ou agente em execução sem registo, incluindo utilização por
pessoal de ferramentas de IA não aprovadas; o modo de falha que torna um inventário completo apenas
para os honestos. É encontrado por descoberta e respondido com uma rota autorizada, não uma
proibição. Contraste com [Sanctioned AI gateway](/glossary/sanctioned-ai-gateway). Veja
[cap. 05, Pattern: Shadow-AI Discovery](/bok/patterns#pattern-shadow-ai-discovery);
[cap. 12, Acceptable use of AI by staff](/bok/governance-program#acceptable-use-of-ai-by-staff).
(cap. 05, 07, 12)

**Implantação sombra.** Uma fase de lançamento na qual um novo modelo ou sistema recebe entradas em
direto mas as suas saídas não são utilizadas, para que o seu comportamento no tráfego real possa ser
comparado com o incumbente ou com decisões humanas antes de qualquer exposição. O registo de
discordância é a sua evidência. Contraste com [Canary release](/glossary/canary-release). Veja
[cap. 15, Progressive delivery as a control](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Pattern: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 14, 15)

**SHAP.** SHapley Additive exPlanations: um método de atribuição de características que atribui a
cada característica de entrada uma parte de uma previsão particular, com base em valores de Shapley
[113]; as suas explicações dependem dos dados de base ou de fundo escolhidos. Contraste com
[LIME](/glossary/lime). Veja
[cap. 16, Feature attribution: SHAP, LIME and integrated gradients](/bok/fairness-and-explainability#feature-attribution-shap-lime-and-integrated-gradients).
(cap. 16)

**Modelo de linguagem pequeno (SLM).** Um modelo de linguagem suficientemente pequeno para ser
executado perto do utilizador, por exemplo num telemóvel [86]. Os seus controlos devem ser enviados
com ele: guardrails no dispositivo, um inventário de versão em toda a frota e um kill switch
entregue como uma bandeira remota ou atualização de aplicação. Contraste com
[Large language model (LLM)](/glossary/large-language-model-llm). Veja
[cap. 11, LLMs and SLMs](/bok/ai-defined#llms-and-slms). (cap. 11)

**Empresa pequena de média capitalização (SMC).** Uma empresa que cresceu para além da definição de
PME mas se enquadra na definição de pequena média capitalização da UE. O Omnibus Digital estende
algum alívio de PME sob o Regulamento da IA a SMCs, como documentação técnica simplificada e um
sistema de gestão da qualidade proporcional [2]. Veja
[cap. 18, The Act and the Omnibus](/bok/eu-ai-act#the-act-and-the-omnibus). (cap. 18)

**Dados de categoria especial.** As categorias do Artigo 9 do RGPD cujo tratamento é proibido a
menos que se aplique uma condição: dados que revelam origem racial ou étnica, opiniões políticas,
crenças ou filiação sindical, e dados genéticos, biométricos (para identificação), de saúde, de vida
sexual e de orientação sexual [38]. A IA pode criá-los por inferência. Contraste com
[Inferred sensitive data](/glossary/inferred-sensitive-data). Veja
[cap. 19, Special categories, inferred data and biometrics](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics).
(cap. 19)

**Mapeamento de partes interessadas.** Nomear quem é afetado por ou tem uma opinião sobre um sistema
de IA (utilizadores, não-utilizadores afetados, responsáveis pela implantação, prestadores, funções
internas, reguladores, órgão de governação) e como cada opinião entra no ciclo de risco, com a
consulta registada. Uma FRIA também nomeia os grupos afetados [2]. Veja
[cap. 13, Stakeholder mapping](/bok/risk-management#stakeholder-mapping). (cap. 13)

**STAR for AI.** Programa de garantia de segurança e certificação da CSA para IA, construído sobre o
AICM, com um nível de auto-avaliação, um nível automatizado "Valid-AI-ted" e um Nível 2 combinando
ISO/IEC 42001 com a avaliação validada [4]. Veja
[cap. 08, CSA AICM and STAR for AI](/bok/regulatory-map#csa-aicm-and-star-for-ai). (cap. 07, 08)

**STRIDE.** Uma lista de verificação de classificação de ameaças do Security Development Lifecycle
da Microsoft: spoofing, tampering, repudiation, information disclosure, denial of service e
elevation of privilege [133]. Para um sistema de IA é percorrida por elemento do diagrama de fluxo
de dados e depois estendida com catálogos específicos de IA como MITRE ATLAS e as listas OWASP.
Contraste com [ATLAS](/glossary/atlas). Veja
[cap. 15, Threat modelling the deployed system](/bok/governing-deployment#threat-modelling-the-deployed-system);
[cap. 05, Pattern: AI Threat Model](/patterns/ai-threat-model). (cap. 05, 06, 15)

**Subcontratante.** Um subcontratante que outro subcontratante contrata para realizar o tratamento
para um responsável, como o anfitrião do modelo atrás de um fornecedor de IA. Sob o Artigo 28 do
RGPD necessita da autorização prévia escrita do responsável, específica ou geral com aviso de
alterações e uma oportunidade de se opor, e as mesmas obrigações de proteção de dados fluem para ele
por contrato [38]. Contraste com [Controller and processor](/glossary/controller-and-processor).
Veja
[cap. 19, AI vendor DPAs and no-training clauses](/bok/privacy-and-ai#ai-vendor-dpas-and-no-training-clauses);
[cap. 15, Vendor contracts and licence terms](/bok/governing-deployment#vendor-contracts-and-licence-terms).
(cap. 08, 12, 15, 19)

**Modificação substancial.** Sob o Regulamento da IA da UE, uma alteração após a colocação no
mercado que a avaliação de conformidade inicial não previu e que afeta a conformidade ou altera a
finalidade prevista [2]. Aciona uma nova avaliação de conformidade e pode transformar um responsável
pela implantação ou distribuidor no prestador; as alterações pré-determinadas são isentas. Contraste
com [Pre-determined changes](/glossary/pre-determined-changes). Veja
[cap. 18, Article 25: when someone else becomes the provider](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider);
[cap. 14, Substantial modification](/bok/governing-development#substantial-modification);
[cap. 15, When a deployer becomes a provider](/bok/governing-deployment#when-a-deployer-becomes-a-provider).
(cap. 14, 15, 18)

**Aprendizagem supervisionada.** Aprendizagem a partir de exemplos rotulados [40]. Os rótulos
codificam decisões humanas passadas com os seus erros e enviesamento, por isso a ficha de dados
regista a proveniência dos rótulos e a porta de avaliação testa taxas de erro por subgrupo.
Contraste com [Unsupervised learning](/glossary/unsupervised-learning). Veja
[cap. 11, By learning paradigm](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**SVID.** Documento de Identidade Verificável SPIFFE: um documento de identidade criptográfico de
curta duração, seja um certificado X.509 ou um JWT, que prova o ID SPIFFE de uma carga de trabalho e
é emitido e rotacionado através da API de Carga de Trabalho SPIFFE, que SPIRE implementa [124]. Uma
credencial que expira em minutos não precisa ser procurada após um incidente, apenas não ser
reemitida. Contraste com [Identidade de carga de trabalho](/glossary/workload-identity). Veja
[cap. 23, Credenciais de curta duração e atestadas](/bok/governing-agents#short-lived-attested-credentials).
(cap. 23)

**Dados sintéticos.** Dados gerados por um modelo ou simulação em vez de recolhidos de pessoas ou
eventos, utilizados para aumentar conjuntos de treino, testar casos extremos ou reduzir a exposição
de dados pessoais. Herdam os enviesamentos do seu gerador e podem vazar os registos em que foram
ajustados, pelo que são testados como qualquer outro conjunto de dados. Veja
[cap. 14, Dados sintéticos, aumento e tecnologias de privacidade reforçada](/bok/governing-development#synthetic-data-augmentation-and-privacy-enhancing-technologies).
(cap. 14, 19)

**Ficha de sistema.** Documentação de um sistema de IA implantado como um todo (modelos, prompts,
recuperação, ferramentas, guardrails e supervisão), onde uma ficha de modelo documenta um modelo
[114]. O seu público-alvo são responsáveis pela implantação, autoridades e o público; a sua
evidência é a entrada do registo, a configuração do guardrail e os resultados de testes
adversariais. Contraste com [Ficha de modelo](/glossary/model-card). Veja
[cap. 14, Fichas de modelo, fichas de sistema e folhas de dados](/bok/governing-development#model-cards-system-cards-and-datasheets).
(cap. 14, 15)

**Risco sistémico.** Sob o Regulamento da IA, o risco colocado pelos modelos de IA de uso geral mais
capazes, acionando deveres adicionais de avaliação, testes adversariais e comunicação de incidentes
nos seus prestadores [2]. Veja
[cap. 18, Risco sistémico: limiar, notificação, designação](/bok/eu-ai-act#systemic-risk-threshold-notification-designation).
(cap. 08, 18)

## T

**Exercício de mesa.** Um ensaio agendado e pontuado de um manual de incidentes contra um modo de
falha nomeado, produzindo os mesmos registos que um incidente real produziria (registo, relógios,
rascunhos de relatórios, eventos de contenção) marcados como um simulacro. O manual é a alegação; o
resultado do simulacro é a evidência. Veja
[cap. 17, Manuais, RACI e simulacros](/bok/incidents#playbooks-raci-and-drills). (cap. 17)

**TC260.** O Comité Técnico Nacional 260 sobre Cibersegurança da Administração de Normalização da
China (全国网络安全标准化技术委员会), que elabora as normas nacionais de cibersegurança e IA da China (GB e GB/T)
e publica o Quadro Voluntário de Governação de Segurança da IA (1.0 em 2024, 2.0 em 2025, 3.0 em 14
de setembro de 2026) [19]. Veja
[cap. 21, China: o que o capítulo 08 não cobre já](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover).
(cap. 08, 21)

**Exceção TDM.** A exceção de direitos de autor da UE para mineração de texto e dados (Artigos 3 e 4
da Diretiva DSM) que permite a qualquer pessoa copiar obras legalmente acessíveis para mineração,
incluindo treino de IA, a menos que o titular dos direitos tenha reservado essa utilização; para
conteúdo disponibilizado publicamente em linha, a reserva deve ser feita de forma apropriada, como
através de meios legíveis por máquina [115]. Contraste com [Utilização justa](/glossary/fair-use) e
[Reserva de direitos (exclusão TDM)](/glossary/rights-reservation-tdm-opt-out). Veja
[cap. 20, Direitos de autor e dados de treino](/bok/existing-law#copyright-and-training-data).
(cap. 20)

**Documentação técnica (Anexo IV).** O ficheiro técnico do prestador para um sistema de IA de risco
elevado, elaborado antes da colocação no mercado e mantido atualizado sob o Artigo 11: descrição,
processo de desenvolvimento, dados, testes, supervisão, gestão de riscos, normas, declaração e plano
de acompanhamento pós-comercialização [2]. A maioria dos itens pode ser gerada a partir de registos
de pipeline. Veja
[cap. 14, Anexo IV, elemento por elemento](/bok/governing-development#annex-iv-element-by-element).
(cap. 14)

**Contaminação do conjunto de teste.** A presença de itens de avaliação nos dados de treino de um
modelo, que infla as suas pontuações; pode ser demonstrada mesmo para modelos de linguagem de caixa
preta [116]. Mitigada com conjuntos privados retidos, itens rotacionados e itens de teste datados.
Veja
[cap. 14, Validade estatística de avaliações](/bok/governing-development#statistical-validity-of-evals).
(cap. 14)

**Testagem em condições reais.** Sob o Regulamento da IA da UE, testagem temporária de um sistema de
IA para a sua finalidade prevista fora de um laboratório, sob um plano aprovado pela autoridade de
fiscalização do mercado, com registo, consentimento informado dos sujeitos, supervisão efetiva e
resultados reversíveis, por um período limitado [2]. Contraste com
[Ambiente de testagem da regulamentação da IA](/glossary/ai-regulatory-sandbox). Veja
[cap. 18, Ambientes de testagem e testagem em condições reais](/bok/eu-ai-act#sandboxes-and-real-world-testing).
(cap. 18)

**Modelo de ameaça (IA).** Um registo versionado do que pode correr mal com um sistema de IA e o que
é feito a respeito: fluxos de dados e limites de confiança, ameaças por elemento de STRIDE e
catálogos específicos de IA, uma decisão sobre cada uma, e o teste que prova cada mitigação.
Responde às quatro questões de modelação de ameaças, terminando com se o trabalho foi feito
suficientemente bem [134]. Contraste com [Testes adversariais](/glossary/red-teaming). Veja
[cap. 15, Modelação de ameaças do sistema implantado](/bok/governing-deployment#threat-modelling-the-deployed-system);
[cap. 05, Padrão: Modelo de Ameaça de IA](/patterns/ai-threat-model). (cap. 05, 14, 15, 23)

**Modelo de Três Linhas.** A atualização de 2020 do Instituto de Auditores Internos das "três linhas
de defesa": o órgão de governação supervisiona; a gestão detém funções de primeira linha (entrega de
produtos e serviços) e funções de segunda linha (perícia em risco, apoio e desafio); a auditoria
interna fornece garantia independente de terceira linha [117]. Veja
[cap. 12, As três linhas, aplicadas à IA](/bok/governance-program#the-three-lines-applied-to-ai).
(cap. 12)

**Passagem de token.** O anti-padrão em que um servidor aceita um token que não lhe foi emitido e o
encaminha, sem modificação, para uma API a jusante, que pode então confiar nele como se o servidor o
tivesse validado. A especificação MCP proíbe-o: um servidor não deve aceitar nenhum token não
explicitamente emitido para ele, e portanto verifica a audiência de cada token [125]. Contraste com
[Delegação (troca de token OAuth)](/glossary/delegation-oauth-token-exchange). Veja
[cap. 23, Autorização MCP a partir de 2026-07-28](/bok/governing-agents#mcp-authorization-as-of-2026-07-28).
(cap. 23)

**Lista de permissão de ferramentas.** A lista de negação por defeito de ferramentas que um agente
pode chamar, cada entrada fixada por um hash da definição da ferramenta e limitada por âmbito de
recurso, classe de operação, taxa, destinos de saída, classes de dados e uma regra de ponto de
verificação, avaliada pelo gateway de ferramentas em cada chamada. OWASP pede tais perfis de
privilégio mínimo por ferramenta [6]. Veja
[cap. 23, A lista de permissão de ferramentas](/bok/governing-agents#the-tool-allow-list). (cap. 23)

**Envenenamento de ferramentas.** Adulteração de uma ferramenta que um agente utiliza, através da
sua definição visível pelo modelo (descrição, esquema, metadados) ou do seu comportamento, para que
o agente atue com base em premissas falsas. OWASP classifica a manipulação da interface de uma
ferramenta legítima sob ASI02 e uma ferramenta comprometida na origem sob ASI04 [6]; MITRE ATLAS
lista Envenenamento de Ferramenta de Agente de IA (AML.T0110) [126]. Contraste com
[Injeção de prompts](/glossary/prompt-injection). Veja
[cap. 23, Admissão de um servidor MCP](/bok/governing-agents#admitting-an-mcp-server). (cap. 23)

**Resumo de conteúdo de treino.** O resumo público do conteúdo utilizado para treinar um modelo de
IA de uso geral, exigido pelo Artigo 53(1)(d) do Regulamento da IA num modelo obrigatório da
Comissão cobrindo fontes de dados, incluindo os domínios mais raspados, e processamento de dados
[118]. Veja
[cap. 14, O lado do prestador de GPAI](/bok/governing-development#the-gpai-provider-side). (cap. 14)

**Dados de treino, validação e teste.** Os três conjuntos de dados que o Regulamento da IA define
para sistemas de risco elevado: dados de treino ajustam o modelo, dados de validação o afinam e
protegem contra sobreajuste, e dados de teste dão uma verificação independente antes do lançamento
[2]. Mantê-los separados, e prová-lo, é o que impede a contaminação do conjunto de teste. Contraste
com [Contaminação do conjunto de teste](/glossary/test-set-contamination). Veja
[cap. 14, Dados para treino e teste](/bok/governing-development#data-for-training-and-testing).
(cap. 14)

**Trajetória (agente).** A sequência de planos, chamadas de ferramentas e operações de memória que
levaram um agente a um efeito. Os agentes são avaliados nas suas trajetórias bem como nos seus
resultados finais, porque um resultado correto alcançado através de uma ferramenta que o agente
nunca deveria ter tido é ainda uma falha. Veja
[cap. 23, O que torna um agente um objeto de governação](/bok/governing-agents#what-makes-an-agent-a-governance-object).
(cap. 14, 23)

**Token de transação (Txn-Token).** Um token assinado de curta duração, especificado num rascunho do
grupo de trabalho IETF OAuth, que transporta identidade de utilizador, identidade de carga de
trabalho e contexto de autorização através de uma cadeia de chamadas dentro de um domínio confiável,
para que serviços a jusante possam decidir sobre contexto protegido [131]. Ainda um rascunho
(revisão 11, 30 de julho de 2026) a partir de 2026-09-24. Contraste com
[Delegação (troca de token OAuth)](/glossary/delegation-oauth-token-exchange). Veja
[cap. 23, Responsabilidade entre saltos](/bok/governing-agents#accountability-across-hops).
(cap. 23)

**Avaliação de impacto de transferência (TIA).** A avaliação do exportador de dados sobre se a lei
de um país terceiro permite ao importador honrar a ferramenta de transferência, como cláusulas
contratuais padrão, e que medidas suplementares são necessárias [119]. Pontos finais de inferência
remota e telemetria de fornecedor fora do EEE podem acioná-la. Veja
[cap. 19, Transferências, inferência remota e TIAs](/bok/privacy-and-ai#transfers-remote-inference-and-tias).
(cap. 19)

**Transparência.** Na estrutura do NIST, até que ponto a informação sobre um sistema de IA e os seus
resultados chega às pessoas que interagem com ele: o que aconteceu [30]. Evidenciada por registos do
que correu (registo, fichas de modelo e sistema, registos) e pelas divulgações que a lei exige.
Contraste com [Explicabilidade](/glossary/explainability) e
[Interpretabilidade](/glossary/interpretability). Veja
[cap. 16, Transparência, interpretabilidade e explicabilidade](/bok/fairness-and-explainability#transparency-interpretability-and-explainability);
[cap. 11, Pares de contraste](/bok/ai-defined#contrast-pairs). (cap. 11, 16)

**IA confiável.** Uma bandeira utilizada pelos quadros de outras pessoas, nomeadamente o Grupo de
Peritos de Alto Nível da UE [81] e NIST, cujas sete características confiáveis a tornam concreta
[30]. Este livro cita-a em vez de a adotar: a disciplina é medida pela redução efetiva do risco e
evidência, não pelo rótulo. Contraste com
[Engenharia de governação da IA](/glossary/ai-governance-engineering) e
[Conjunto de princípios de IA responsável](/glossary/responsible-ai-principle-set). Veja
[cap. 22, Diretrizes do HLEG da UE e ALTAI](/bok/principles-and-standards#eu-hleg-guidelines-and-altai).
(cap. 01, 22)

**Características confiáveis (NIST).** As sete características de IA confiável no NIST AI RMF:
válida e confiável; segura; segura e resiliente; responsável e transparente; explicável e
interpretável; com privacidade reforçada; justa com enviesamento prejudicial gerido [30]. Válida e
confiável é a base; responsável e transparente abrange as outras. Veja
[cap. 22, As sete características confiáveis](/bok/principles-and-standards#the-seven-trustworthy-characteristics).
(cap. 22)

## U

**UDAP.** Atos ou práticas injustos ou enganosos, proibidos pela secção 5 da Lei FTC e pelas leis
estaduais [120]. Engano é uma representação material suscetível de induzir em erro; injustiça é
lesão substancial, inevitável não compensada por benefícios. Alegações de desempenho de IA não
fundamentadas caem sob ela. Veja
[cap. 20, Práticas injustas e enganosas nos Estados Unidos](/bok/existing-law#unfair-and-deceptive-practices-in-the-united-states).
(cap. 20)

**Aprendizagem não supervisionada.** Aprendizagem de estrutura (agrupamentos, anomalias) a partir de
dados sem rótulos [40]. Sem verdade fundamental para testar, os controlos dependem de testes de
estabilidade e revisão humana dos segmentos antes de serem utilizados em decisões. Contraste com
[Aprendizagem supervisionada](/glossary/supervised-learning). Ver
[cap. 11, Por paradigma de aprendizagem](/bok/ai-defined#by-learning-paradigm). (cap. 11)

**Registo de caso de uso.** O registo de admissão para um caso de uso de IA proposto: contexto
empresarial, finalidade prevista e utilizações excluídas, pessoas afetadas, autoridade de decisão,
métricas de sucesso e tolerância a erros, armazenados como campos na entrada do registo para que
classificação, limiares, testes e avaliações de impacto leiam os mesmos factos [30]. Ver
[cap. 14, O registo de caso de uso](/bok/governing-development#the-use-case-record);
[cap. 06, Admissão e classificação](/bok/the-role#intake-and-classification);
[cap. 05, Padrão: Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering). (cap. 05,
06, 14)

## V

**Fixação de versão.** Fixação, na entrada do registo, das versões exatas do modelo, prompts, corpus
de recuperação e guardrails que um sistema implantado utiliza, para que se saiba o que foi executado
e qualquer alteração não fixada, incluindo uma atualização de modelo do fornecedor, seja detetada e
tratada como um lançamento. Ver
[cap. 15, Entrega progressiva como controlo](/bok/governing-deployment#progressive-delivery-as-a-control);
[cap. 05, Padrão: Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).
(cap. 05, 15)

## W

**Marca de água.** Incorporação de um sinal em conteúdo gerado (imagem, áudio, vídeo ou texto) que
um detetor pode posteriormente ler para identificá-lo como gerado por IA. O Regulamento da IA pede
aos prestadores de sistemas generativos uma marcação legível por máquina e detetável [2]; o NIST
revê marcas de água juntamente com rastreamento de proveniência e deteção [53]. As marcas podem
degradar-se sob transformações ordinárias, pelo que a sua sobrevivência é testada. Contraste com
[Proveniência de conteúdo (C2PA)](/glossary/content-provenance-c2pa) e
[Divulgação latente](/glossary/latent-disclosure). Ver
[cap. 18, Casos de transparência (Artigo 50)](/bok/eu-ai-act#transparency-cases-article-50). (cap.
18, 20)

**Violação generalizada.** Sob o Artigo 3(61) do Regulamento da IA, um ato ou omissão contrário ao
direito da União que protege os interesses dos indivíduos que prejudica, ou é provável que
prejudique, os interesses coletivos dos indivíduos em vários Estados-Membros. Encurta o prazo de
incidente grave do Artigo 73 para dois dias [2]. Contraste com
[Incidente grave](/glossary/serious-incident). Ver
[cap. 17, Incidente, perigo, questão e incidente grave](/bok/incidents#incident-hazard-issue-and-serious-incident).
(cap. 17)

**Identidade de carga de trabalho.** A identidade atribuível que uma carga de trabalho, como um
agente, transporta em cada salto, sob a qual as suas ações são registadas e o seu acesso é revogado,
tipicamente uma credencial de curta duração e atestada, como um SVID [124]. Difere da autenticação
de canal, que protege um único salto, como um cliente a comunicar com um servidor MCP. Contraste com
[NHI](/glossary/nhi) e [SVID](/glossary/svid). Ver
[cap. 23, A autenticação de canal não é identidade de agente](/bok/governing-agents#channel-authentication-is-not-agent-identity);
[cap. 04, Camada 04: Runtime Controls & Observability](/bok/the-stack#layer-04-runtime-controls--observability).
(cap. 03, 04, 05, 23)

## Sources

[1] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act), consolidated text as amended by Regulation (EU) 2026/1744 (Digital Omnibus on AI, in force 27 Jul 2026; definitions in Art. 3, incl. 3(1), 3(3) to 3(14), 3(14b), 3(20), 3(22), 3(23), 3(29) to 3(32), 3(49), 3(55) to 3(57), 3(60), 3(61), 3(63), 3(68); Arts. 4, 5, 6 (incl. 6(3) third subparagraph, profiling), 9, 10, 11, 13, 14, 15, 17, 22 to 27 (incl. 26(11)), 40, 41, 43, 47, 48, 50, 53 (incl. 53(1)(c)), 55, 57, 60, 72, 73, 86; Annexes I, III, IV). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[3] NIST AI Risk Management Framework 1.0 (Govern, Map, Measure, Manage); OSCAL. NIST. 2023. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] AI Controls Matrix v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/star/ai (verified: primary)
[5] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025). OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[6] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; Least-Agency; per-tool least-privilege profiles; tool poisoning of a legitimate tool's interface under ASI02, a tool compromised at the source under ASI04). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] MITRE ATLAS (adversarial threat knowledge base for AI). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[8] Model Context Protocol specification 2026-07-28 (OAuth 2.1 resource servers; Client ID Metadata Documents; issuer-bound credentials). Anthropic / MCP. 2026-07-28. https://blog.modelcontextprotocol.io/posts/2026-07-28/ (verified: primary)
[9] "Gartner Predicts that Guardian Agents will Capture 10-15% of the Agentic AI Market by 2030" (at least 10 to 15% of agentic AI markets by 2030). Gartner. 2025-06-11. https://www.gartner.com/en/newsroom/press-releases/2025-06-11-gartner-predicts-that-guardian-agents-will-capture-10-15-percent-of-the-agentic-ai-market-by-2030 (verified: primary)
[10] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; none found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[11] Policy Cards: machine-readable runtime governance artefacts for agents. arXiv 2510.24383. 2025-10. https://arxiv.org/abs/2510.24383 (verified: primary)
[12] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; oversight office within the Department of Financial Services). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[13] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[14] California SB 53 / TFAIA (models above 10^26 FLOP; transparency reports and incident reports by all frontier developers; frameworks by large frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[15] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment signed 27 Mar 2026; effective 1 Jan 2027; framework for large frontier developers, critical safety incident reports for every frontier developer; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[16] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[17] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[18] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[19] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[20] A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification (prediction sets with user-specified coverage; arXiv 2107.07511). Angelopoulos and Bates. 2021-07-15. https://arxiv.org/abs/2107.07511 (verified: primary)
[21] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (C(2025) 5053 final; non-binding; seven elements of Art. 3(1), inference as the indispensable condition; exclusions). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[22] CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[23] 12 CFR 1002.9 (Regulation B, notifications) (1002.9(b)(2) statement of specific principal reasons for adverse action; Supplement I commentary; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[24] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978) (adverse impact and the "four-fifths rule", with statistical-significance and small-numbers caveats; text as of 2026-09-01). eCFR. 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[25] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Korea AI Basic Act) (Act No. 20676, in force 2026-01-22; Art. 2 as amended 2026-01-20; Arts. 2(4) high-impact areas, 2(7) AI business operators, 33 confirmation, 34 high-impact duties, 36 domestic representative). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[26] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (agency AI Governance Boards chaired at Deputy Secretary level with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[27] The AI Risk Repository: a meta-review, database, and taxonomy of risks from artificial intelligence (Domain Taxonomy of 7 domains and 24 subdomains; CC BY 4.0). Slattery, Saeri, Grundy et al., Patterns (Cell Press). 2026. https://doi.org/10.1016/j.patter.2026.101517 (verified: primary)
[28] "Name it to tame it: defining AI incidents and hazards" (summary of the OECD paper "Defining AI incidents and related terms", doi 10.1787/d1a8d965-en). OECD.AI. 2024-05-17. https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards (verified: primary)
[29] NIST AI RMF Playbook, GOVERN (per subcategory: About, Suggested Actions, Transparency and Documentation, References; GOVERN 1.7 decommissioning and phasing out safely). NIST Trustworthy and Responsible AI Resource Center. 2026. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[30] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (risk tolerance and residual risk; seven trustworthy characteristics; transparency answers "what happened", explainability "how", interpretability "why"; MAP 1.1 intended purposes; MANAGE 1.1 go/no-go determination; profiles). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[31] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (adopted 22 May 2019; AI-system definition revised 8 Nov 2023; revised 3 May 2024; five principles and five recommendations; 1.3 enables people adversely affected to challenge an output; definitions of AI system, lifecycle and AI actors). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[32] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[33] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed with users' biometric information, to be deleted). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[34] Directive on Automated Decision-Making (algorithmic impact assessment completed and published before production; Appendix B and C impact levels; recourse; modified 2025-06-24). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[35] Directive (EU) 2024/2831 on improving working conditions in platform work (Arts. 7 limits on processing, 9 transparency, 10 human oversight, 11 human review; transposition by 2 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[36] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[37] Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (final list presented 17 Jul 2020 after a pilot; document and web tool). High-Level Expert Group on AI / European Commission. 2020-07-17. https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment (verified: primary)
[38] Regulation (EU) 2016/679 (General Data Protection Regulation) (Arts. 4(1), 4(5), 4(7), 4(8), 4(12), 4(14), 5, 6, 9, 12(3), 22, 25, 28(2) and 28(4), 30, 33, 35; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[39] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[40] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (referenced by identifier only; autonomy and heteronomy; clause 5.11 machine learning approaches: supervised, unsupervised, semi-supervised, reinforcement). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: secondary)
[41] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories of AI bias: systemic, statistical and computational, and human). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[42] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021; bias audit by an independent auditor within the past year; selection rates and impact ratios by sex, race/ethnicity and intersectional categories; public summary; notice before use). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[43] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[44] "BlueGreenDeployment" (two identical production environments; switch back on failure). Martin Fowler. 2010-03-01. https://martinfowler.com/bliki/BlueGreenDeployment.html (verified: primary)
[45] On Calibration of Modern Neural Networks (modern networks poorly calibrated; ICML 2017; arXiv 1706.04599). Guo, Pleiss, Sun and Weinberger. 2017-06-14. https://arxiv.org/abs/1706.04599 (verified: primary)
[46] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (Kleinberg, Mullainathan and Raghavan; three fairness conditions cannot hold together except in special cases; arXiv 1609.05807). arXiv. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[47] The Site Reliability Workbook, ch. 16 "Canarying Releases" ("a partial and time-limited deployment of a change in a service and its evaluation"). Google (O'Reilly). 2018. https://sre.google/workbook/canarying-releases/ (verified: primary)
[48] ISO/IEC 42001:2023, AI management systems (referenced by identifier only; requirements for an AI management system; clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[49] Overcoming catastrophic forgetting in neural networks (networks lose earlier competence when trained on new tasks; arXiv 1612.00796). Kirkpatrick et al.. 2016-12-02. https://arxiv.org/abs/1612.00796 (verified: primary)
[50] Working groups and projects of CEN-CENELEC JTC 21 (WG 2 operational aspects, WG 3 engineering aspects, WG 4 foundational and societal aspects, WG 5 cybersecurity). JTC 21 website. 2026. https://jtc21.eu/working-groups/ (verified: secondary)
[51] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation; arXiv 2004.05785). Lu et al.. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[52] Content Credentials: C2PA Technical Specification, version 2.2 (a manifest of assertions, a claim and a claim signature bound to an asset). Coalition for Content Provenance and Authenticity (C2PA). 2025-05. https://spec.c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html (verified: primary)
[53] NIST AI 100-4, Reducing Risks Posed by Synthetic Content: An Overview of Technical Approaches to Digital Content Transparency (provenance data tracking, watermarking, metadata recording and synthetic-content detection). NIST. 2024-11-20. https://doi.org/10.6028/NIST.AI.100-4 (verified: primary)
[54] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (Wachter, Mittelstadt and Russell; Harvard Journal of Law & Technology, 2018; arXiv 1711.00399). arXiv. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[55] "Counterfactual Fairness" (Kusner, Loftus, Russell and Silva; arXiv 1703.06856). arXiv. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[56] OpenLineage: an open platform for collection and analysis of data lineage (standard API for lineage events over datasets, jobs and runs). OpenLineage project (The Linux Foundation). 2026. https://openlineage.io/ (verified: primary)
[57] PROV Overview (PROV-DM and PROV-O W3C Recommendations of 30 April 2013; provenance as information about the entities, activities and people involved in producing data). W3C. 2013-04-30. https://www.w3.org/TR/prov-overview/ (verified: primary)
[58] Datasheets for Datasets (Gebru et al.; arXiv 1803.09010). arXiv. 2018-03-23. https://arxiv.org/abs/1803.09010 (verified: primary)
[59] "Fairness Through Awareness" (Dwork, Hardt, Pitassi, Reingold and Zemel; individual fairness; limits of statistical parity; arXiv 1104.3913). arXiv. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[60] "Products liability" (design, manufacturing and marketing defects, incl. failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. 2026. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[61] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[62] 42 U.S.C. § 2000e-2 (Title VII: unlawful employment practices; 2000e-2(k) burden of proof in disparate-impact cases, business necessity and less discriminatory alternatives). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[63] Council Directive 2000/43/EC (Racial Equality Directive) (Art. 2(2)(a) direct and 2(2)(b) indirect discrimination, with objective justification). Official Journal of the EU (EUR-Lex). 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[64] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, in force 2026-01-22; Art. 29 domestic-representative thresholds). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[65] Guidelines on obligations for general-purpose AI providers, FAQ (a modifier becomes a provider only when the modification uses more than one third of the original model's training compute; obligations limited to the modification). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/faqs/guidelines-obligations-general-purpose-ai-providers (verified: primary)
[66] "Dual use of artificial-intelligence-powered drug discovery" (an inverted toxicity model proposed about 40,000 candidate toxic molecules in under six hours; Nature Machine Intelligence). Urbina, Lentzos, Invernizzi and Ekins (PubMed Central). 2022-03-07. https://pmc.ncbi.nlm.nih.gov/articles/PMC9544280/ (verified: primary)
[67] SR 26-2, Revised Guidance on Model Risk Management (issued 17 Apr 2026 by the Federal Reserve, OCC and FDIC; supersedes and replaces SR 11-7 of 4 Apr 2011 and SR 21-8; effective challenge). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[68] "Equality of Opportunity in Supervised Learning" (Hardt, Price and Srebro; equalised odds and equal opportunity; arXiv 1610.02413). arXiv. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[69] Evidence-record schema v1 (evidence-record.v1.json) (AI Governance Engineer templates and schemas library). aigovernanceengineer.com. 2026-09-24. https://aigovernanceengineer.com/schemas/evidence-record.v1.json (verified: primary)
[70] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/17/107 (verified: secondary)
[71] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (Kearns, Neel, Roth and Wu; arXiv 1711.05144). arXiv. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[72] "Communication-Efficient Learning of Deep Networks from Decentralized Data" (McMahan et al.; federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[73] On the Opportunities and Risks of Foundation Models ("trained on broad data at scale"; defects inherited downstream; arXiv 2108.07258). Bommasani et al. (Stanford CRFM). 2021-08-16. https://arxiv.org/abs/2108.07258 (verified: primary)
[74] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225) (Art. 3 scope and private-actor declaration; Arts. 14 and 15 remedies and safeguards; Art. 16 risk and impact management). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[75] Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (twelve risks unique to or exacerbated by generative AI; confabulation defined). NIST. 2024-07. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[76] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; non-binding; indicative criterion of training compute above 10^23 FLOP with the ability to generate language, images or video). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[77] "Feature Toggles (aka Feature Flags)" (release, experiment, ops and permissioning toggles; ops kill switches for graceful degradation). Pete Hodgson, martinfowler.com. 2017-10-09. https://martinfowler.com/articles/feature-toggles.html (verified: primary)
[78] Management system standards (Harmonized Structure; Annex SL common text; integrated management systems). ISO. 2026. https://www.iso.org/management-system-standards.html (verified: primary)
[79] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary; builds on the OECD AI Principles). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[80] HUDERIA: risk and impact assessment of AI systems (HUDERIA Methodology approved 26 Feb 2025; non-binding). Council of Europe. 2026. https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems (verified: primary)
[81] Ethics Guidelines for Trustworthy AI (four ethical principles; seven requirements; human-in-the-loop, human-on-the-loop and human-in-command oversight). High-Level Expert Group on AI / European Commission. 2019-04-08. https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai (verified: primary)
[82] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data includes data derived or extrapolated from non-health information, incl. by algorithms or machine learning). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[83] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8 internal channels for private entities with 50 or more workers; Art. 9 acknowledgment within seven days and feedback within three months; Art. 19 no retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[84] LLM01:2025 Prompt Injection (OWASP Top 10 for LLM Applications 2025; direct and indirect injection; jailbreaking as a form of prompt injection that makes the model disregard its safety protocols). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm01-prompt-injection/ (verified: primary)
[85] JSON Schema Draft 2020-12. JSON Schema. 2022-06-16. https://json-schema.org/draft/2020-12 (verified: primary)
[86] Phi-3 Technical Report: A Highly Capable Language Model Locally on Your Phone (3.8-billion-parameter model deployable on a phone; arXiv 2404.14219). Abdin et al. (Microsoft). 2024-04-22. https://arxiv.org/abs/2404.14219 (verified: primary)
[87] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13; operative 2026-08-02; latent disclosures in generated content). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[88] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (three-step legitimate-interest test; anonymity test and evidence). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[89] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (Ribeiro, Singh and Guestrin; LIME; arXiv 1602.04938). arXiv. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[90] "Machine Unlearning" (Bourtoule et al.; SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[91] Commission Delegated Regulation (EU) 2025/301 (Art. 5, time limits for major ICT-related incident reports under DORA; Art. 5(2) late classification). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[92] "Membership Inference Attacks against Machine Learning Models" (Shokri et al.; arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[93] Hierarchy of Controls (elimination, substitution, engineering controls, administrative controls, PPE). CDC / NIOSH. 2024-04-10. https://www.cdc.gov/niosh/hierarchy-of-controls/about/index.html (verified: primary)
[94] "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (Fredrikson, Jha and Ristenpart; CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[95] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, serious incident reporting, Measure 9.2; Appendix 1.4 specified systemic risks, incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[96] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data added to sensitive personal information under the CCPA; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[97] OECD Framework for the Classification of AI Systems (OECD Digital Economy Papers No. 323; People & Planet, Economic Context, Data & Input, AI Model, Task & Output). OECD. 2022-02-22. https://doi.org/10.1787/cb6d9eca-en (verified: primary)
[98] "How the machine thinks: Understanding opacity in machine learning algorithms" (three forms of opacity; Big Data & Society 3(1)). SAGE (Jenna Burrell). 2016-01-06. https://doi.org/10.1177/2053951715622512 (verified: primary)
[99] Llama 3.1 Community License Agreement (an example of an open-weight licence with an incorporated acceptable-use policy and attribution terms). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[100] Personal Information Protection Law of the People's Republic of China (Arts. 55 and 56 personal information protection impact assessment, records kept three years; official English translation). National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[101] Directive (EU) 2024/2853 on liability for defective products (software as a product; defectiveness incl. the ability to continue to learn; substantial modification; transposition by 9 Dec 2026). Official Journal of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[102] "Dissecting racial bias in an algorithm used to manage the health of populations" (Obermeyer, Powers, Vogeli and Mullainathan; Science 366(6464):447-453; cost as a proxy for need). Science. 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[103] "Actionable Recourse in Linear Classification" (Ustun, Spangher and Liu; recourse as the ability to change a model's decision by altering actionable inputs; arXiv 1809.06514). arXiv. 2018-09-18. https://arxiv.org/abs/1809.06514 (verified: primary)
[104] "Extracting Training Data from Large Language Models" (Carlini et al.; verbatim training sequences extracted, incl. personal data; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[105] "Training language models to follow instructions with human feedback" (Ouyang et al.; supervised fine-tuning on demonstrations, then reinforcement learning from human feedback on ranked outputs; arXiv 2203.02155). arXiv. 2022-03-04. https://arxiv.org/abs/2203.02155 (verified: primary)
[106] "OpenRAIL: Towards open and responsible AI licensing frameworks" (use-based restrictions that redistributions and derivatives must carry). Hugging Face. 2022-08-31. https://huggingface.co/blog/open_rail (verified: primary)
[107] Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (parametric and non-parametric memory; arXiv 2005.11401). Lewis et al.. 2020-05-22. https://arxiv.org/abs/2005.11401 (verified: primary)
[108] Concrete Problems in AI Safety (reward hacking among five practical problems; arXiv 1606.06565). Amodei et al.. 2016-06-21. https://arxiv.org/abs/1606.06565 (verified: primary)
[109] ISO 31073:2022, Risk management: Vocabulary (replaced ISO Guide 73:2009, withdrawn; referenced by identifier only). ISO/TC 262. 2022-02. https://www.iso.org/standard/79637.html (verified: primary)
[110] What's Wrong with Risk Matrices? (L. A. Cox Jr.; Risk Analysis 28(2) 497-512). Wiley. 2008-04. https://doi.org/10.1111/j.1539-6924.2008.01030.x (verified: primary)
[111] Crosswalk: AI RMF (1.0) and ISO/IEC FDIS 23894 (function-to-clause mapping, incl. risk sources). NIST. 2023-01-26. https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf (verified: primary)
[112] IEC 61025:2006, Fault tree analysis (FTA) (edition 2.0). IEC. 2006-12-13. https://webstore.iec.ch/en/publication/4311 (verified: primary)
[113] "A Unified Approach to Interpreting Model Predictions" (Lundberg and Lee; SHAP; arXiv 1705.07874). arXiv. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[114] "System Cards, a new resource for understanding how AI systems work" (documents a whole system of models, AI and non-AI components, where a model card documents one model). Meta AI. 2022-02-23. https://ai.meta.com/blog/system-cards-a-new-resource-for-understanding-how-ai-systems-work/ (verified: primary)
[115] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Arts. 3 and 4: text and data mining for research and a general exception subject to a machine-readable reservation). Official Journal of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[116] Proving Test Set Contamination in Black Box Language Models (Oren et al.; arXiv 2310.17623). arXiv. 2023-10-26. https://arxiv.org/abs/2310.17623 (verified: primary)
[117] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[118] Template for general-purpose AI model providers to summarise their training content (mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[119] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data (version 2.0). European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[120] 15 U.S.C. § 45 (FTC Act section 5) (unfair or deceptive acts or practices; 45(n) standard for unfairness). Legal Information Institute, Cornell Law School. 2026. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[121] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"; the principles apply to traditional statistical and quantitative models and non-generative, non-agentic AI models). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
[122] "Levels of Autonomy for AI Agents" (K. J. Kevin Feng, David W. McDonald, Amy X. Zhang; arXiv 2506.12469; autonomy as a deliberate design decision separate from capability and operational environment; five levels by user role: operator, collaborator, consultant, approver, observer). arXiv. 2025-06-14 (v2 2025-07-28). https://arxiv.org/abs/2506.12469 (verified: primary)
[123] RFC 8693, OAuth 2.0 Token Exchange (impersonation versus delegation semantics; the act (actor) claim; nested act claims record prior actors). IETF. 2020-01. https://www.rfc-editor.org/rfc/rfc8693.html (verified: primary)
[124] SPIFFE overview (short-lived cryptographic identity documents called SVIDs, as X.509 certificates or JWTs; the Workload API issues and rotates them; SPIRE implementation). SPIFFE project. 2026. https://spiffe.io/docs/latest/spiffe-about/overview/ (verified: primary)
[125] Model Context Protocol, Security Best Practices, version 2026-07-28 (token passthrough defined and explicitly forbidden; servers MUST NOT accept any tokens not explicitly issued for them; audience validation). Model Context Protocol. 2026-07-28. https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices (verified: primary)
[126] MITRE ATLAS data, release v2026.09 (AML.T0080 AI Agent Context Poisoning, .000 Memory; AML.T0110 AI Agent Tool Poisoning). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[127] Agent Control Standard (ACS) repository (a wire specification that lets a separate guardian agent permit, deny or modify an agent's action before it happens; the reference guardian's failure posture defaults to proceed, overridable to deny; donated to the OWASP GenAI Security Project, announced 1 Sep 2026). OWASP GenAI Security Project (GitHub). 2026-09-01. https://github.com/GenAI-Security-Project/agent-control-standard (verified: primary)
[128] OWASP GenAI LLM Top 10 2026 (published 3 Aug 2026; LLM01:2026 Prompt Injection, incl. memory persistence; LLM08:2026 Hidden Context Exposure, which replaced System Prompt Leakage: assume hidden context is discoverable, no credentials in it, not a security boundary; final text in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[129] Agent2Agent (A2A) Protocol Specification, v1.0 (v1.0.0 released 2026-03-12 and v1.0.1 on 2026-05-28 in github.com/a2aproject/A2A; Agent Card at /.well-known/agent-card.json, signed with JWS over JCS-canonicalised JSON; servers authenticate every request; authorisation implementation-specific; scope and revocation of in-task authorisation not defined). A2A Project (Linux Foundation). 2026-05-28. https://a2a-protocol.org/latest/specification/ (verified: primary)
[130] "A New Chapter for A2A: Joining the Agentic AI Foundation" (A2A accepted as a Growth Stage project of the Linux Foundation-directed Agentic AI Foundation, alongside MCP). A2A Project. 2026-08-27. https://a2a-protocol.org/latest/blog/2026/08/27/a-new-chapter-for-a2a-joining-the-agentic-ai-foundation/ (verified: primary)
[131] draft-ietf-oauth-transaction-tokens-11, Transaction Tokens (Internet-Draft, OAuth working group, revision 11 of 30 Jul 2026, WG state "Waiting for Write-Up"; short-lived signed tokens that propagate user identity, workload identity and authorisation context through a call chain within a trusted domain). IETF. 2026-07-30. https://datatracker.ietf.org/doc/draft-ietf-oauth-transaction-tokens/ (verified: primary)
[132] draft-ietf-oauth-client-id-metadata-document-02, OAuth Client ID Metadata Document (Internet-Draft, OAuth working group, revision 02 of 6 Jul 2026; a URL used as client_id that refers to the client's metadata document). IETF. 2026-07-06. https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/ (verified: primary)
[133] Threats: Microsoft Threat Modeling Tool (the STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; the tool is a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[134] Threat Modeling Manifesto (threat modelling as analysing representations of a system to highlight concerns about security and privacy characteristics; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-25). https://www.threatmodelingmanifesto.org/ (verified: primary)
[135] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private PKI, self-signed certificates, bare keys, keyless Sigstore). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[136] SLSA specification v1.2, Build track basics (provenance: what built the artefact, by what process and from which top-level inputs; Build L1 provenance exists, L2 hosted build platform, L3 hardened builds). OpenSSF SLSA project. n.d. (accessed 2026-09-25). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[137] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-25). https://huggingface.co/docs/safetensors/index (verified: primary)
[138] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[139] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy, 53% on general-purpose content; competent and reliable evidence required at the time a claim is made). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[140] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; retraining; output filters accepted if shown sufficiently effective and robust, based on general rules rather than lists of people). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[141] Authorization (Cedar Policy Language Reference Guide) (no request is allowed unless a permit policy grants it, so the default decision is Deny; any satisfied forbid overrides every permit). Cedar. n.d. (accessed 2026-09-25). https://docs.cedarpolicy.com/auth/authorization.html (verified: primary)
[142] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; transparency report; critical safety incidents to the Office of Emergency Services within 15 days). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
