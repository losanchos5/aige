---
lang: pt
source: bok/03-values-principles.md
sourceHash: "92d0c8a26a210d3b43d6f5a17ec0327d94ea1204a4b6e3b8a92ddb03e15e6dab"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 03. Valores e princípios

> Os oito valores e seis princípios da Tese, cada um expandido com o que significa na prática e o
> anti-padrão que rejeita.

A Tese enuncia oito valores e seis princípios numa única linha cada. Este capítulo expande-os. Os
dois são deliberadamente tipos de coisa diferentes, e a diferença é o que os impede de ser a mesma
lista contada duas vezes. Um **valor** é uma preferência: um compromisso, para o qual nos inclinamos
quando não conseguimos ter ambos; é enunciado como uma afirmação, e nomear o que construímos *para*
também nomeia o que construímos *longe de*. Um **princípio** é um compromisso de *agir*: uma regra
de método, fraseada como algo que fazemos, que se mantém independentemente da preferência. Leia os
valores para saber para que lado se inclinar; leia os princípios para saber o que fazer na
segunda-feira.

Nem todos os valores são novos para a IA. Governação como código (1), evidência legível por máquina
(5) e redução de risco medida (7) são herdados da engenharia GRC, a disciplina-mãe. Avaliações que
falham a construção (2) e identidade e âmbito de agente (4) são o que a IA nos força a adicionar; o
modelo que deve ser testado e o ator autónomo que deve ser limitado não têm análogo no GRC clássico.

Estes são os próprios valores e princípios do livro. Os conjuntos de princípios publicados por
outros são tratados noutro local: o capítulo 11 rastreia
[os conjuntos de princípios de IA responsável publicados para artefatos](/bok/ai-defined#responsible-ai-principle-sets-engineered),
e o capítulo 22 tem os
[Princípios de IA da OCDE mapeados para o stack](/bok/principles-and-standards#the-five-principles-and-five-recommendations).

---

## Os oito valores

Cada valor é enunciado como uma afirmação: o que construímos para, que ao nomeá-lo também nomeia o
que construímos longe de. A forma valores-e-princípios segue o Manifesto de Engenharia GRC que é o
precedente deste livro [1].

### 1. A governação é código, não um documento

Uma política num PDF é uma declaração de intenção que um humano deve ler, lembrar e aplicar. Uma
política como código é um controlo que executa: avalia um pedido de integração, uma implantação ou
uma chamada de tempo de execução e retorna uma decisão. O documento descreve a regra; o código *é* a
regra, versionada num repositório, testada e aplicada sem que ninguém se lembre de o fazer. Quando a
regra muda, muda um artefato e cada ponto de aplicação atualiza. Quando um auditor pergunta qual era
a política numa determinada data, mostra o commit.

Isto não é «apagar todos os documentos». Uma política ainda precisa de uma declaração legível por
humanos sobre a razão pela qual existe. O valor está em que a versão autorizada e executada é a
executável, e a prosa é a sua documentação, não o contrário.

> **Na prática** Uma regra de residência de dados escrita como `OPA/Rego` bloqueia qualquer
> implantação que encaminhasse a inferência para fora da região permitida, em CI e na admissão. A
> mesma regra, como PDF, era «comunicada» trimestralmente e violada mensalmente.
> **Antipadrão** A «biblioteca de políticas» que é uma pasta de documentos Word que ninguém consegue
> consultar, cuja execução é um email e cuja conformidade é auto-atestada.

### 2. As avaliações falham as compilações; as revisões apenas recomendam

Uma revisão produz uma recomendação; alguém pode agir sobre ela, mais tarde, ou não. Uma avaliação
produz um veredicto com consequências: o modelo ou agente passou ou falhou um teste definido, e uma
falha bloqueia o lançamento. Em sistemas de IA, o controlo mais honesto é um teste que o sistema
deve passar, executado automaticamente, cujo resultado muda o que acontece a seguir. Preferimos
controlos que funcionem.

Uma revisão ainda tem o seu lugar: para questões que nenhum teste pode resolver. Mas quando uma
propriedade *pode* ser testada (um limiar de resistência a jailbreak, um limite de fuga de PII, uma
verificação de âmbito de ferramentas), transformá-la numa revisão em vez de uma porta de avaliação é
uma escolha para poder recomendar mas não parar.

> **Na prática** Uma suite de avaliação de red-team (Inspect, Garak) executa em CI; se a resistência
> à injeção cair abaixo do limiar acordado, o pipeline falha e o lançamento não é enviado até ser
> corrigido.
> **Antipadrão** Um «conselho de revisão de risco de modelo» que se reúne mensalmente, escreve
> conclusões classificadas como baixo/médio/alto, e não tem mecanismo para parar um lançamento já
> agendado.

### 3. A evidência vem do tempo de execução, não de um atestado pontual

Um atestado diz que um controlo estava em vigor quando alguém olhou. A evidência em tempo de
execução mostra o controlo funcionando continuamente, a partir do próprio sistema. Os sistemas de IA
mudam entre revisões (um modelo é retreinado, um agente ganha uma ferramenta), portanto a evidência
recolhida uma vez decai imediatamente. Preferimos evidência que é emitida enquanto o sistema
funciona, de modo que «o controlo está a funcionar?» é respondido por telemetria em direto, não por
uma assinatura datada do trimestre passado.

> **Na prática** As decisões de guardrail, resultados de avaliação e veredictos de política fluem
> para um armazém de garantia com marcas de tempo; o estado do controlo é uma consulta em direto,
> não uma aprovação anual.
> **Antipadrão** Um ficheiro de atestado ao estilo SOC montado a semana antes de uma auditoria,
> descrevendo controlos como se imaginava que fossem, não como a produção realmente se comportou.

### 4. Cada agente tem a sua própria identidade e âmbito

Um agente que atua numa conta de serviço partilhada ou numa chave estática é ingovernável: não
consegue atribuir as suas ações, revogar o seu acesso com precisão, ou limitar o que pode fazer.
Preferimos que cada ator não humano tenha a sua própria identidade, um proprietário, e um âmbito de
ações permitidas, estabelecido *antes* de ser autorizado a agir. A identidade é a pré-condição da
responsabilidade; o âmbito é a pré-condição do confinamento. O capítulo 23 constrói ambos para
agentes, começando por
[identidade e credenciais de curta duração](/bok/governing-agents#identity-and-short-lived-credentials).

> **Na prática** Cada agente recebe uma identidade de carga de trabalho distinta, registada com um
> proprietário e um âmbito declarado; um agente que se comporta mal é rastreado até à sua identidade
> e o seu acesso é revogado sem afetar os outros.
> **Antipadrão** Uma frota de agentes partilhando uma chave API e uma conta de serviço privilegiada,
> onde um incidente significa rodar um segredo e quebrar tudo, e a atribuição é impossível.

### 5. A evidência é legível por máquina ou não é evidência

Evidência que um humano deve produzir, formatar e arquivar manualmente não escala e não pode ser
verificada com rapidez. Evidência legível por máquina (`OSCAL`, resultados de avaliação
estruturados, registos assinados) pode ser consultada, comparada, agregada e verificada
automaticamente. Preferimos evidência que uma máquina consegue ler, porque a auditoria torna-se
então uma consulta e a mesma evidência alimenta garantia contínua em vez de um ficheiro único.

> **Na prática** Os resultados de controlo são emitidos como artefatos de componente e avaliação
> `OSCAL`; uma pergunta de um auditor é respondida executando uma consulta contra o armazém de
> evidência.
> **Antipadrão** Uma unidade partilhada de capturas de ecrã e folhas de cálculo exportadas,
> recolhidas do zero para cada auditoria, não verificáveis e desatualizadas no momento em que são
> guardadas.

### 6. As ferramentas devem ser inspecionáveis e compostas

O ponto não é quem construiu a ferramenta ou se é código aberto; é se consegue ver dentro dela. Não
consegue confiar num veredicto que não consegue rastrear. As ferramentas inspecionáveis permitem-lhe
seguir uma decisão até à regra que a produziu, à entrada que viu e à evidência que emitiu; as
ferramentas compostas permitem-lhe ligar essa decisão ao seu próprio pipeline em vez de exportar
para o de outro. Preferimos ferramentas cuja lógica e caminho de dados conseguimos abrir, compradas
ou construídas, porque a governação que não consegue ver dentro é um controlo em que não consegue
confiar. Uma comparação de um fornecedor da categoria de plataforma de governação de IA, publicada
por um concorrente nela, descobre que a maioria da categoria «gere o programa (inventários,
avaliações, mapeamentos de estrutura, fluxos de trabalho de evidência) sem qualquer caminho de dados
em tempo de execução» [3]; onde isto se verifica, a objeção não é que a ferramenta é comercial mas
que o seu veredicto não pode ser auditado.

Esta é uma inclinação, não um absoluto. As ferramentas fechadas e comerciais têm um lugar, incluindo
plataformas capazes. Mas o padrão é ferramentas que a equipa consegue inspecionar e compor, em vez
de uma caixa negra em que a equipa deve confiar cegamente.

> **Na prática** O arnês de avaliação, a biblioteca de políticas e o registo expõem como um
> veredicto é alcançado (a regra, a entrada e a evidência emitida) e compõem-se no pipeline que a
> equipa já executa, quer os componentes sejam código aberto ou uma plataforma com um caminho de
> dados aberto.
> **Antipadrão** Uma plataforma de governação de seis dígitos cuja «pontuação de conformidade» não
> pode ser rastreada até um único controlo em execução, e cujo caminho de dados para na importação
> de folha de cálculo.

### 7. O sucesso é medido em redução efetiva do risco, não em cobertura de estrutura

Mapear cada controlo para NIST AI RMF e ISO 42001 prova que leu as estruturas; não prova que
qualquer risco caiu. Preferimos medir a coisa em si: a taxa do modo de falha caiu, o raio de
explosão encolheu, o incidente foi apanhado mais cedo? A cobertura é uma entrada; a redução efetiva
do risco é o resultado. Uma matriz de mapeamento verde sobre um controlo quebrado é teatro com
passos extra [2].

> **Na prática** Cada controlo declara o modo de falha que aborda e uma métrica para ele (taxa de
> sucesso de injeção, tempo para detetar, chamadas de ferramentas não autorizadas bloqueadas); o
> controlo é julgado pela métrica a mover-se, não pela célula de estrutura a ficar verde.
> **Antipadrão** Uma matriz de rastreabilidade de 300 linhas mapeando controlos para cinco
> estruturas, apresentada como maturidade, sem medição de se qualquer um dos controlos mapeados
> reduz realmente o risco.

### 8. A governação é possuída com engenharia, não executada de fora

Governação que fica à parte e concede ou nega passagem é um estrangulamento que os engenheiros
contornam. Governação possuída conjuntamente com engenharia, construída no caminho pavimentado,
adotada porque é a forma mais fácil de enviar, torna-se parte de como as coisas são feitas.
Preferimos propriedade partilhada: a função de governação constrói as ferramentas, a engenharia
constrói sobre elas, e a porta é uma fase num pipeline que ambos possuem, não uma reunião que um
lado teme. O capítulo 12 descreve a
[cultura de governação](/bok/governance-program#governance-culture) de que a propriedade partilhada
depende.

> **Na prática** A porta de avaliação e as verificações de política são enviadas como parte do
> modelo de pipeline padrão; os engenheiros adotam-nas porque o caminho pavimentado é também o
> caminho mais rápido, e a governação co-mantém-nas.
> **Antipadrão** Uma equipa de governação que revê e aprova lançamentos de fora, medida por quantos
> bloqueia, enquanto a engenharia constrói um processo sombra para evitá-la.

**Ainda usamos as práticas que cada valor constrói longe; construímos em direção à afirmação.**

---

## Os seis princípios

### Construa o controlo no ponto mais cedo em que consegue bloquear

Coloque cada controlo onde ainda consegue parar a coisa de correr mal, e não mais tarde. O lugar
mais cedo em que um risco consegue ser apanhado é o mais barato de corrigir e o lugar mais forte
para executar: apanhá-lo no repositório bate apanhá-lo em produção, que bate explicá-lo a um
regulador. Portanto, um controlo é colocado na primeira porta que consegue recusar a mudança: uma
política em CI, uma avaliação antes de implantar, uma verificação de identidade na admissão, um
guardrail no ponto de ação. O compromisso é sobre *colocação*: qualquer que seja o controlo,
pertence ao ponto executável mais cedo, não aparafusado no fim.

> **Na prática** Um novo agente não consegue ser implantado até ter registado um proprietário e um
> âmbito e ter passado a sua porta de avaliação; o pipeline executa isto na primeira porta que
> consegue recusá-lo, não uma pessoa no fim.
> **Antipadrão** Uma «revisão de governação» pré-lançamento que acontece depois do sistema ser
> construído, não muda nada sobre como foi construído, e consegue apenas atrasar ou acenar.

### Dê a cada controlo dentes

Um controlo deve conseguir mudar o que acontece a seguir: bloquear uma fusão, falhar uma
implantação, revogar acesso. Qualquer coisa que consegue apenas informar um comité é um *sinal*, e
dizemos assim em vez de o disfarçar como controlo. Este é o compromisso que transforma uma avaliação
de pesquisa numa porta, uma política de um PDF numa verificação, um limiar de um número de painel
numa bloqueadora de lançamento. Quando uma propriedade consegue ser testada, transformá-la numa
revisão em vez de uma porta é uma escolha para poder recomendar mas não parar, e fazemos essa
escolha conscientemente ou não a fazemos.

Os dentes não são o animal inteiro. Uma porta que consegue falhar a compilação é necessária e não
suficiente: uma avaliação é pontual e limitada por amostragem, consegue ser enganada afinando o
modelo para a suite ou o limiar para o modelo, e apanha regressões contra casos conhecidos, não o
ataque novel que a suite nunca imaginou. Portanto, um controlo com dentes carrega obrigações
próprias (a sua cobertura medida, os seus casos mantidos adversarialmente, os seus limiares
rastreados até modos de falha nomeados), e uma porta de passagem *obriga* ao acompanhamento em tempo
de execução da camada 04, não o substitui. Uma porta verde tratada como prova de segurança é teatro
de estrutura com um pipeline mais rápido.

> **Na prática** As avaliações de capacidade e adversariais são versionadas juntamente com o modelo;
> a implantação depende da tarefa de avaliação passar, a sua cobertura é rastreada como a sua
> própria métrica, e um guardrail em tempo de execução carrega o mesmo limiar para produção contra
> as entradas que nenhuma avaliação amostrou.
> **Antipadrão** Uma execução de avaliação de modelo única antes do lançamento, os seus resultados
> colados num diapositivo, nunca re-executada quando o modelo ou os seus prompts mudam; ou uma porta
> cujo limiar é silenciosamente baixado até a compilação ficar verde.

### Registe e delimite cada ator antes de agir

Nada, humano ou não humano, age até ter um proprietário, um âmbito declarado e uma forma de ser
interrompido. Autonomia com credenciais partilhadas é ingovernável por construção: não é possível
atribuir, conter ou revogar aquilo que não se consegue rastrear até um ator. Portanto, o registo é
uma precondição, não uma consequência: cada ator é inscrito, delimitado em âmbito e recebe um kill
switch *antes* de agir por conta própria. A autonomia é conquistada por ser governável, não
concedida por defeito.

> **Na prática** O registro de agentes é a porta: um agente sem proprietário, sem âmbito ou sem kill
> switch é negado uma identidade de carga de trabalho e não consegue chegar à produção.
> **Antipadrão** Agentes criados ad hoc numa chave partilhada, descobertos apenas depois de um deles
> tomar uma ação que ninguém consegue explicar ou desfazer.

### Instrumentar a construção para produzir a sua própria prova

Ligue cada controlo para emitir o seu próprio registo enquanto é executado, de modo que a garantia
contínua saia do sistema em vez de ser montada manualmente antes de uma auditoria. Se demonstrar um
controlo requer uma captura de ecrã, não terminámos a sua construção. O compromisso é com a
instrumentação: cada porta, guardrail e verificação escreve um registo estruturado e assinado quando
dispara, de modo que a auditoria é uma consulta e os mesmos registos impulsionam a garantia contínua
e a resposta a incidentes (o capítulo 17 especifica
[o registo de incidentes](/bok/incidents#the-incident-record)).

> **Na prática** Cada porta e guardrail escreve um registo estruturado e assinado; o registo de
> auditoria constrói-se a si próprio, e o armazenamento de evidência responde tanto ao auditor como
> ao engenheiro de serviço.
> **Antipadrão** Um sprint de recolha de evidência antes de cada auditoria, recriando após o facto
> um registo que os sistemas nunca produziram efetivamente.

### Começar a partir de um modo de falha nomeado ou de um dano nomeado

Desenhe cada controlo contra uma forma específica de o sistema falhar ou um dano específico que
possa causar a uma pessoa, e comece por aí, não a partir de uma lista de verificação de estrutura.
Os modelos de ameaça (injeção de prompts, utilização indevida de ferramentas, abuso de identidade de
agente, exfiltração de dados) e
[avaliações de impacto sobre os direitos fundamentais](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27)
são as entradas para o desenho, não documentação produzida posteriormente. Se não conseguimos nomear
o risco que um controlo responde, não o construímos. O capítulo 13 mostra como
[identificar fontes de risco, fatores e partes interessadas](/bok/risk-management#identifying-risk-sources-factors-and-stakeholders),
e o [atlas de danos](/resources/harms) lista danos por nível, cada um com o controlo que o deteta.

> **Na prática** O desenho do agente começa a partir do seu modelo de ameaça Agentic OWASP [4] e da
> sua FRIA; os controlos que são entregues são exatamente os que esses dois documentos exigiam, e
> mapeiam de volta para eles.
> **Antipadrão** Um catálogo de controlos montado a partir de uma lista de verificação de estrutura,
> abordando riscos que o sistema não tem enquanto perde o caminho de injeção que um atacante
> realmente usa.

### Tornar o caminho governado o caminho mais fácil

Entregue a governação como ferramentas, modelos e caminhos pavimentados que os engenheiros adotam
sem pedir permissão (uma biblioteca de políticas, um registo com uma API, uma porta que conseguem
executar localmente antes de fazer push), e meça a adoção. As pessoas governadas são os nossos
utilizadores; o caminho pavimentado tem de ser o caminho mais rápido ou será contornado. Se usar a
governação é mais difícil do que evitá-la, a governação está mal desenhada, e corrigimos o produto,
não as pessoas.

> **Na prática** Um engenheiro estrutura um novo serviço de IA a partir de um modelo que já inclui o
> gancho de registo, as verificações de política e a porta de avaliação; a conformidade é a
> predefinição, não um pedido.
> **Antipadrão** Uma intranet de governação de formulários e filas de bilhetes, onde fazer a coisa
> certa leva uma semana e uma reunião, portanto as equipas fazem silenciosamente a coisa rápida em
> vez disso.

**Correspondências:** os valores e princípios são realizados através do stack de cinco camadas
(capítulo 04) e do catálogo de padrões (capítulo 05); os modos de falha que visam são OWASP Top 10
para Aplicações Agentic; a garantia que exigem mapeia para ISO/IEC 42001, NIST AI RMF e Artigos 9,
15, 55 e 72 do Regulamento da IA. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] GRC Engineering Manifesto (values and principles precedent). grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi; "theatre with extra steps"). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[4] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
