---
lang: pt
source: bok/21-ai-laws-worldwide.md
sourceHash: "191fdd18bca59f606083a61658b834845a9e9def3e8488c400b329303f5e4f2a"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 21. Leis específicas de IA em todo o mundo

> Fora da UE, a lei específica de IA varia desde a Lei Básica Horizontal da Coreia até estatutos
> estaduais dos EUA, diretivas do setor público e estruturas voluntárias; este capítulo data cada
> regime e nomeia o artefato que evidencia cada dever.

## Como ler este capítulo

Este capítulo é um guia de campo para as regras específicas de IA que se sentam ao lado do
Regulamento da IA da UE. É escrito para o engenheiro que tem de fazer um conjunto de controlos
responder a vários regimes ao mesmo tempo, não para o advogado que tem de opinar sobre qualquer um
deles. O capítulo 18 trata o [Regulamento da IA da UE](/bok/eu-ai-act#how-to-read-this-chapter) em
profundidade; o capítulo 19 cobre privacidade e proteção de dados, incluindo
[os regimes além da UE](/bok/privacy-and-ai#beyond-the-eu-uk-us-brazil-and-china); o capítulo 20
cobre a [outra lei que já se aplica a IA](/bok/existing-law#how-to-read-this-chapter); o capítulo 22
cobre [princípios, soft law e normas](/bok/principles-and-standards#the-instruments-at-a-glance),
incluindo os tratados internacionais. O capítulo 08 permanece o
[índice inverso](/bok/regulatory-map#other-jurisdictions) que transforma cada obrigação num artefato
e numa camada.

Cada entrada abaixo segue o mesmo modelo: **estado**, **datas**, **âmbito**, **deveres-chave**,
**aplicação** e os **artefatos que evidenciam conformidade**. Cada estado é marcado
**a partir de 2026-09-24**. Quando uma regra ainda estava em movimento nessa data, ou um facto não
pôde ser confirmado contra uma fonte primária, o texto diz-o e carrega uma etiqueta `(verify)`. As
traduções de termos coreanos, japoneses, chineses, italianos, espanhóis e portugueses são nossas a
menos que uma fonte dê uma oficial.

O vocabulário de estado tem quatro valores, os mesmos quatro que o dataset de jurisdição do site
usa:

- **Vinculativo, horizontal.** Um estatuto em vigor que se aplica entre setores (Coreia, Itália, lei
  de promoção do Japão).
- **Vinculativo, direcionado.** Regras vinculativas limitadas a um uso, um setor, uma classe de
  desenvolvedor ou o setor público (os estados dos EUA, as agências federais dos EUA, as regras
  departamentais da China, a diretiva do Canadá).
- **Voluntária.** Estruturas, orientações e princípios sem qualquer penalidade associada (Singapura,
  a abordagem específica do Reino Unido sobre IA, Índia, Austrália).
- **Projeto de lei.** Ainda não é lei (Brasil, projeto de lei nacional sobre IA de Espanha).

A leitura de engenharia é a que o capítulo 06 chama
[tradução regulatória](/bok/the-role#regulatory-translation): a maioria destes regimes exige o mesmo
pequeno conjunto de artefatos (um inventário, uma decisão de classificação, um aviso, um rótulo, uma
avaliação de risco, um relatório de incidente, um registo mantido por um período fixo). O que difere
é o gatilho, a redação do aviso, o prazo do relatório, o destinatário e a entidade que faz cumprir.
Construa o controlo uma vez na stack e parametrize-o por jurisdição; o padrão
[Framework Crosswalk](/patterns/framework-crosswalk) é o local onde esses parâmetros residem. Isto
não é aconselhamento jurídico, e os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## A paisagem num relance

| Jurisdição | Instrumento principal | Estado (a partir de 2026-09-24) | Tipo | Quem faz cumprir |
|---|---|---|---|---|
| Coreia do Sul | AI Basic Act e Enforcement Decree | Em vigor desde 2026-01-22; multas sujeitas a um período de orientação de pelo menos um ano [1][2][3] | Vinculativo, horizontal | Ministry of Science and ICT (MSIT) |
| Estados Unidos (federal) | EO 14179, EO 14365, OMB M-25-21, M-25-22 e M-26-04 | Em vigor para agências federais; nenhum estatuto federal para atores privados [5][6][8][10] | Vinculativo, direcionado | OMB e agências; força-tarefa do DOJ contra leis estaduais |
| Estados Unidos (estados) | Colorado SB 26-189, Texas HB 149, California SB 53, SB 942, AB 2013, SB 243 e regras CPPA, New York RAISE e GBL Art. 47, Utah, Illinois, NYC LL 144 | Misto: vários em vigor, Colorado a partir de 2027-01-01, RAISE a partir de 2027-01-01 [15][18][19][26] | Vinculativo, direcionado | Procuradores-gerais estaduais e agências |
| Japão | AI Promotion Act (Act No. 53 of 2025) | Totalmente em vigor desde 2025-09-01 [31][32] | Vinculativo, horizontal (promocional; sem penalidades) | Cabinet AI Strategy Headquarters |
| China | Regras departamentais da CAC, mais recentemente as medidas de interação antropomórfica | Em vigor; a mais recente de 2026-07-15 [35] | Vinculativo, direcionado | Cyberspace Administration of China (CAC) |
| Brasil | PL 2338/2023 | Projeto de lei: aprovado no Senado em 2024-12-10; aguardando parecer na Câmara [36][37] | Projeto de lei | Ainda não designado em lei |
| Canadá | Directive on Automated Decision-Making | Em vigor para instituições federais; AIDA expirou [38][39] | Vinculativo, direcionado | Treasury Board of Canada Secretariat |
| Índia | India AI Governance Guidelines | Publicado em 2025-11-05; nenhuma lei sobre IA [40] | Voluntário | MeitY (apenas orientação) |
| Reino Unido | Princípios aplicados pelos reguladores existentes; ATRS; AI Cyber Security Code of Practice | Não estatutário para IA como tal [41][43][44] | Voluntário | Reguladores setoriais existentes (por exemplo o ICO, FCA e MHRA) |
| Itália | Lei 132/2025 | Em vigor desde 2025-10-10 [46] | Vinculativo, horizontal | AgID e ACN, mais supervisores financeiros |
| Espanha | Projeto de lei para o bom uso e governação da IA; AESIA; ambiente de testagem | Projeto de lei não adotado; ambiente de testagem e guias em vigor [47][48][49] | Projeto de lei | AESIA e autoridades setoriais (conforme proposto) |
| Singapura | Model AI Governance Frameworks (incl. agentes), AI Verify | Voluntária [50][51][53] | Voluntário | IMDA (orientação) |
| Austrália | National AI Plan; Guidance for AI Adoption | A lei existente aplica-se; nenhuma lei sobre IA [54] | Voluntário | Reguladores existentes; AI Safety Institute aconselha |

Os mesmos regimes são apresentados como
[um mapa de azulejos por jurisdição](/figures/jurisdiction-tiles).

## Coreia do Sul: a AI Basic Act

A Coreia do Sul tem um estatuto horizontal sobre IA em vigor que impõe deveres aos operadores e
multas. O seu nome formal é a Basic Act on the Development of Artificial Intelligence and the
Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 20676 [1]. A maior
parte da Lei é política industrial (um comité nacional de estratégia de IA, dados de treino,
clusters de IA, apoio à indústria); os deveres que importam ao engenheiro situam-se no Capítulo 4,
Artigos 31 a 36, e nas disposições de execução dos Artigos 40 e 43 [1].

### Estatuto e datas

A Lei foi promulgada em 21 de janeiro de 2025 e entrou em vigor em 22 de janeiro de 2026; a parte da
definição de alto impacto que abrange dispositivos médicos digitais começou em 24 de janeiro de 2026
[1]. Uma Lei de alteração, No. 21311 de 20 de janeiro de 2026, reviu o Artigo 2 e outras disposições
antes da entrada em vigor. Um segundo grupo das suas alterações entrou em vigor em 21 de julho de
2026: uma segunda frase no Artigo 35(1) exige que a avaliação de impacto reflita as características
de grupos vulneráveis em relação à IA, e o Artigo 16(3) e (4) dizem aos organismos públicos que
considerem primeiro produtos de IA designados quando compram, e isentam os funcionários que os
compram ou utilizam de responsabilidade perante o seu organismo por qualquer perda resultante, salvo
intenção ou negligência grave [1]. O Enforcement Decree, Presidential Decree No. 36053, foi
promulgado em 21 de janeiro de 2026 e entrou em vigor em 22 de janeiro de 2026 [2]. O MSIT, o
ministério competente, anunciou um período de orientação de pelo menos um ano durante o qual as
investigações de facto e as multas administrativas são suspensas, exceto em casos muito excecionais,
como perda de vidas ou violações de direitos humanos [3]. O período de graça aplica-se às multas,
não aos deveres: as obrigações aplicam-se desde 22 de janeiro de 2026. Uma alteração do decreto em
vigor desde 21 de julho de 2026, Presidential Decree No. 36506, definiu os grupos vulneráveis em
relação à IA (entre eles pessoas com deficiência, pessoas com 65 anos ou mais, pessoas elegíveis
para subsídios de procura de emprego e mulheres com interrupções de carreira), criou a confirmação
de produtos de IA pelo ministério para contratação pública, e alterou o Artigo 28(1) do Decreto para
que a identificação de pessoas afetadas pela avaliação de impacto reflita esses grupos [2][4]. Os
outros deveres dos operadores descritos abaixo permanecem inalterados.

### Âmbito e titulares de deveres

A Lei alcança a conduta no estrangeiro que afeta o mercado coreano ou utilizadores coreanos (Artigo
4(1)), e exclui IA desenvolvida e utilizada unicamente para defesa ou segurança nacional, conforme
especificado por decreto (Artigo 4(2); Artigo 2 do Decreto) [1][2]. O titular do dever é o
**operador de negócios de IA**, que a Lei divide em dois papéis: o operador que desenvolve e fornece
IA, e o operador que utiliza IA fornecida por outro para oferecer o seu próprio produto ou serviço
(Artigo 2(7)) [1]. A divisão é próxima da do prestador e responsável pela implantação da UE, mas não
idêntica: ambos os papéis têm os deveres de transparência e alto impacto, e o decreto permite que um
operador utilizador se baseie nas medidas de gestão de risco, explicação e proteção do utilizador do
desenvolvedor, a menos que altere materialmente o propósito ou utilização do sistema (Artigo 27(3)
do Decreto) [2].

### IA de alto impacto e como é confirmada

**IA de alto impacto** é um sistema de IA que pode afetar significativamente, ou colocar um risco
para, a vida humana, segurança física ou direitos fundamentais, e que é utilizado numa das áreas que
a Lei lista (Artigo 2(4)) [1]:

- fornecimento de energia; produção de água potável; prestação de cuidados de saúde; desenvolvimento
  e utilização de dispositivos médicos e dispositivos médicos digitais; gestão segura de materiais e
  instalações nucleares;
- a análise e utilização de informações biométricas para investigação criminal ou detenção;
- julgamentos ou avaliações que afetam significativamente direitos e obrigações individuais,
  **como contratação e análise de empréstimos**;
- a operação principal de meios, instalações e sistemas de transporte;
- decisões de organismos estatais, governos locais e instituições públicas que afetam cidadãos, como
  verificações de elegibilidade e cobrança de taxas por serviços públicos;
- avaliação de estudantes na educação infantil, primária e secundária;
- qualquer outra área designada por decreto presidencial.

O operador deve rever antecipadamente se o seu sistema é de alto impacto, e pode pedir ao MSIT que
confirme (Artigo 33(1)) [1]. O decreto transforma o pedido num ficheiro: uma visão geral do produto
ou serviço, uma visão geral dos dados de treino, material mostrando como o sistema é utilizado e o
que produz, e qualquer outro documento de apoio. O MSIT pondera a área, o impacto, severidade e
frequência do risco, a revisão anterior do operador e, quando consultado, um comité de peritos, e
responde dentro de 30 dias, prorrogável uma vez por 30 dias. Um operador que discorde pode pedir
re-confirmação dentro de 10 dias, e o MSIT deve responder dentro de mais 30 dias após consultar o
comité de peritos (Artigo 25 do Decreto) [2].

Para o engenheiro isto é um artefato de entrada: um **registo de decisão de classificação** por
sistema, contendo a área do Artigo 2(4), a fundamentação do risco, a visão geral dos dados de treino
e, quando solicitado, a resposta do MSIT. É o mesmo registo que o capítulo 06 constrói em
[entrada e classificação](/bok/the-role#intake-and-classification), com um campo adicional.

### Transparência: aviso prévio e rotulagem

O Artigo 31 tem três deveres [1]:

1. **Aviso prévio.** Um operador que fornece um produto ou serviço utilizando IA de alto impacto ou
   generativa deve informar os utilizadores antecipadamente de que funciona com essa IA.
2. **Rotulagem de saída.** Um operador que fornece IA generativa, ou um produto ou serviço que a
   utiliza, deve indicar que as saídas foram geradas por IA generativa.
3. **Conteúdo sintético realista.** Quando um sistema produz som, imagens ou vídeo que são difíceis
   de distinguir da realidade, o operador deve notificar ou rotular de modo que os utilizadores
   possam claramente reconhecê-los como gerados por IA; para obras artísticas ou criativas, o aviso
   pode ser dado de forma que não prejudique a exposição ou fruição.

O decreto estabelece a mecânica (Artigo 23 do Decreto) [2]. O aviso prévio pode estar no próprio
produto, no contrato, manual ou termos de utilização, no ecrã ou dispositivo do utilizador, ou ser
afixado no local de fornecimento. Os rótulos podem ser percetíveis por humanos ou legíveis por
máquina; quando são legíveis por máquina apenas, o operador deve também informar o utilizador pelo
menos uma vez, por texto ou voz, de que a saída foi gerada por IA generativa. Os avisos e rótulos
para conteúdo sintético realista devem ser fáceis de perceber e devem ter em conta a idade dos
utilizadores principais e as suas condições físicas ou sociais. Aplicam-se três isenções: quando a
utilização de IA é óbvia a partir do nome, ecrã ou saída do produto; quando o sistema é utilizado
apenas para negócios internos do operador; e casos que o MSIT designa por aviso público.

### Deveres para IA de alto impacto

Um operador que fornece IA de alto impacto deve implementar seis medidas (Artigo 34(1)) [1]: um
plano de gestão de risco; um plano de explicação abrangendo, dentro da viabilidade técnica, o
resultado final, os critérios principais utilizados para o alcançar e uma visão geral dos dados de
treino; um plano de proteção do utilizador; gestão e supervisão humanas; documentos mostrando as
medidas tomadas; e qualquer outra medida que o comité nacional de IA resolva. O decreto acrescenta
três regras operacionais (Artigo 27 do Decreto) [2]:

- o operador publica o conteúdo principal da gestão de riscos, dos planos de explicação e proteção
  do utilizador, e o nome e dados de contacto da pessoa que supervisiona o sistema, nas suas
  instalações ou no seu sítio Web, com exceção dos segredos comerciais;
- o operador mantém a evidência documental das medidas durante **cinco anos**, em formato eletrónico
  ou outro;
- um operador utilizador pode pedir ao operador desenvolvedor as informações de que necessita, e o
  desenvolvedor deve esforçar-se por cooperar; as medidas tomadas sob outras leis contam quando o
  decreto o especifica no seu anexo.

**Avaliação de impacto** é um dever de melhor esforço: os operadores "devem esforçar-se" por avaliar
o efeito sobre os direitos fundamentais antes de disponibilizar IA de elevado impacto, e os
organismos públicos devem dar prioridade aos produtos que foram avaliados (Artigo 35) [1]. O decreto
fixa o conteúdo: os indivíduos e grupos suscetíveis de serem afetados, refletindo as características
dos grupos vulneráveis à IA (Artigos 3(5) e 35(1) da Lei, em vigor a partir de 21 de julho de 2026);
os direitos fundamentais em risco; os efeitos sociais e económicos; os padrões de utilização; os
indicadores quantitativos ou qualitativos e o método utilizado; as medidas de prevenção, mitigação e
recuperação; e um plano de melhoria quando necessário. O operador pode realizar a avaliação por si
próprio ou através de terceiros (Artigo 28 do Decreto) [2].

### Deveres de segurança para sistemas de elevada computação

O Artigo 32 aplica-se a sistemas cuja computação cumulativa de treino excede um limiar estabelecido
por decreto [1]. O decreto exige os três seguintes: computação cumulativa de treino de pelo menos
**10^26 operações em vírgula flutuante**; construção e operação com a tecnologia de IA mais avançada
do dia; e um perfil de risco que possa afetar de forma ampla e grave a vida, a segurança e os
direitos fundamentais (Artigo 24 do Decreto) [2]. Os operadores de tais sistemas devem identificar,
avaliar e mitigar riscos ao longo do ciclo de vida, construir um sistema de gestão de riscos que
monitorize e responda a incidentes de segurança da IA, e submeter os resultados ao MSIT [1]. A cifra
de computação é a mesma 10^26 que as leis de fronteira dos EUA utilizam (ver
[leis de desenvolvedor de fronteira](/bok/regulatory-map#frontier-developer-laws) no capítulo 08),
mas o teste conjuntivo torna a classe coreana mais estreita no papel.

### Representante doméstico

Um operador sem endereço ou estabelecimento comercial na Coreia deve designar um
**representante doméstico** por escrito e comunicá-lo ao MSIT se cumprir qualquer limiar do decreto
(Artigo 36; Artigo 29 do Decreto) [1][2]: receita total do ano anterior de KRW 1 bilião ou mais;
receita do ano anterior de serviços de IA de KRW 10 mil milhões ou mais; uma média de 1 milhão ou
mais utilizadores diários na Coreia durante os três meses anteriores ao final do ano anterior; ou
uma multa anterior por ignorar uma ordem corretiva. O representante submete os resultados de
segurança do Artigo 32, apresenta pedidos de confirmação de elevado impacto e apoia as medidas do
Artigo 34, incluindo verificar que os documentos estão atualizados e precisos; as suas violações são
atribuídas ao operador [1].

### Aplicação e período de graça

O MSIT pode exigir documentos e investigar, incluindo no local, quando encontra ou é informado de
uma suspeita violação dos deveres de rotulagem, segurança ou elevado impacto, e pode ordenar que a
violação seja interrompida ou corrigida (Artigo 40) [1]. Multas administrativas até
**KRW 30 milhões** aplicam-se a apenas três falhas: não dar o aviso prévio do Artigo 31(1), não
designar um representante doméstico, e não obedecer a uma ordem de paragem ou correção (Artigo 43)
[1]. Uma falha de rotulagem não é, portanto, multada diretamente; torna-se passível de multa quando
o operador ignora a ordem corretiva que se segue. Durante o período de orientação descrito acima, a
recolha de factos e as multas são suspensas exceto em casos excecionais [3].

| Dever (artigo) | Quem está vinculado | Artefato de engenharia que o evidencia | Camada |
|---|---|---|---|
| Autoanálise de elevado impacto e confirmação opcional (Art. 33; Art. 25 do Decreto) | Todos os operadores de negócios de IA | Registo de decisão de classificação por sistema: área Art. 2(4), razão de risco, visão geral dos dados de treino, resposta do MSIT | 1 · 2 |
| Aviso prévio (Art. 31(1); Art. 23(1) do Decreto) | Operadores de produtos que utilizam IA de elevado impacto ou generativa | Componente de notificação em UI, termos e contratos; inventário de notificação por superfície de utilizador | 2 · 4 |
| Rótulos de saída e aviso de conteúdo realista (Art. 31(2)–(3); Art. 23(2)–(3) do Decreto) | Operadores de IA generativa | Gasoduto de proveniência: rótulo visível ou marca legível por máquina, mais pelo menos um aviso de texto ou voz | 3 · 4 |
| Deveres de segurança acima de 10^26 FLOP (Art. 32; Art. 24 do Decreto) | Operadores de sistemas qualificados | Registo de riscos do ciclo de vida; monitorização de incidentes de segurança; relatório de resultados ao MSIT | 3 · 4 · 5 |
| Medidas de elevado impacto (Art. 34; Art. 27 do Decreto) | Operadores de IA de elevado impacto | Planos de gestão de riscos, explicação e proteção do utilizador; supervisor humano nomeado; resumo publicado; armazenamento de evidência de cinco anos | 1 · 2 · 4 · 5 |
| Avaliação de impacto, melhor esforço (Art. 35; Art. 28 do Decreto) | Operadores de IA de elevado impacto | Avaliação de impacto sobre direitos fundamentais contendo os sete elementos do decreto | 1 · 5 |
| Representante doméstico (Art. 36; Art. 29 do Decreto) | Operadores estrangeiros acima de um limiar | Designação arquivada no MSIT; manual de acesso a evidência para o representante | 5 |

> **Na prática (ilustrativo)**
> Um prestador estrangeiro de uma API de avaliação de contratação ultrapassou o limiar de 1 milhão
> de utilizadores diários através de clientes coreanos dos seus clientes. A equipa de governação fez
> três coisas. Adicionou um bloco `jurisdiction.kr` a cada entrada de registo do sistema contendo a
> área do Artigo 2(4) ("contratação"), o veredicto de autoanálise e uma ligação para a avaliação de
> impacto em forma de decreto. Estendeu a política de retenção do armazenamento de evidências para
> cinco anos para cada artefato marcado `kr-art34`. E deu ao representante doméstico acesso de
> leitura a uma vista de evidência filtrada, para que o representante pudesse responder ao MSIT a
> partir de documentos atuais em vez de enviar um e-mail à equipa de produto. Nada de novo foi
> construído no modelo; o trabalho foi no registo, na política de retenção e no caminho de acesso.

## Estados Unidos: a camada federal

Os Estados Unidos não têm um estatuto federal de IA que vincule atores privados. A camada federal é
um conjunto de ordens executivas e memorandos do Gabinete de Gestão e Orçamento (OMB) que vinculam
agências federais, e, através de contratação pública, os fornecedores que vendem para elas. Desde
dezembro de 2025 inclui também um impulso deliberado contra as leis estaduais de IA.

### Ordens executivas

- **EO 14179** (23 de janeiro de 2025), *Removing Barriers to American Leadership in Artificial
  Intelligence*, ordenou uma revisão de cada ação tomada sob a EO 14110 revogada, para que as
  inconsistentes com a nova política pudessem ser suspensas, revistas ou rescindidas, e ordenou um
  plano de ação de IA dentro de 180 dias [5].
- **EO 14319** (23 de julho de 2025), *Preventing Woke AI in the Federal Government*, estabeleceu
  dois "Princípios de IA Imparcial" (busca da verdade e neutralidade ideológica) para modelos de
  linguagem de grande dimensão que o governo compra [8].
- **EO 14365** (11 de dezembro de 2025), *Ensuring a National Policy Framework for Artificial
  Intelligence*, visa as leis estaduais de IA; é tratada na sua própria subsecção abaixo [10].

### Memorandos OMB para agências federais

**M-25-21** (3 de abril de 2025), *Accelerating Federal Use of AI through Innovation, Governance,
and Public Trust*, rescindiu e substituiu M-24-10 [6]. Define **IA de elevado impacto** como IA cuja
saída serve como base principal para decisões ou ações com efeito legal, material, vinculativo ou
significativo sobre direitos civis, liberdades civis ou privacidade, sobre acesso à educação,
habitação, seguros, crédito, emprego e outros programas, sobre acesso a serviços governamentais
críticos, ou sobre saúde e segurança humanas, entre outros [6]. Algumas categorias de casos de
utilização são presumidas de elevado impacto; um funcionário da agência que conclua o contrário deve
documentar a decisão ao Diretor de IA. As agências tinham 365 dias a partir da emissão para
documentar as práticas mínimas para IA de elevado impacto: testes pré-implantação; uma avaliação de
impacto de IA; monitorização contínua de desempenho e impactos adversos; formação adequada de
operadores; supervisão humana, intervenção e responsabilidade, com uma falha segura quando
praticável; recursos consistentes ou apelações para indivíduos afetados; e consulta de utilizadores
finais e do público [6]. **M-25-22**, emitida no mesmo dia, cobre aquisição [7].

**M-26-04** (11 de dezembro de 2025) implementa EO 14319 [8]. As agências tinham até 11 de março de
2026 para atualizar as suas políticas de contratação, e cada solicitação para um modelo de linguagem
de grande dimensão deve solicitar, no mínimo, a política de utilização aceitável do fornecedor;
fichas de modelo, sistema ou dados; recursos para utilizadores finais; e um mecanismo para feedback
de utilizadores finais sobre saídas que violem os princípios [8]. Os requisitos também abrangem
modelos incorporados noutro software que a agência compra [8].

### Plano de Ação de IA da América

O plano, publicado em julho de 2025, tem três pilares: acelerar a inovação, construir infraestrutura
de IA americana, e liderar na diplomacia e segurança internacional de IA [9]. Duas das suas ações
importam aqui. Pede às agências com financiamento discricionário de IA que considerem o clima
regulatório de IA de um estado ao tomar decisões de financiamento, e à Comissão Federal de
Comunicações que avalie se as regras estaduais de IA interferem com o seu mandato; e dirige ao NIST
que revise o Quadro de Gestão de Riscos de IA para remover referências a desinformação, diversidade,
equidade e inclusão, e mudança climática [9].

### O impulso federal contra as leis estaduais de IA

EO 14365 estabelece a maquinaria [10]. O Procurador-Geral deveria estabelecer uma
**Força-Tarefa de Litígio de IA** dentro de 30 dias para desafiar as leis estaduais de IA que entram
em conflito com a política federal; o Secretário do Comércio deveria publicar, dentro de 90 dias,
uma avaliação das leis estaduais de IA "onerosas", incluindo as que exigem que os modelos alterem
saídas verdadeiras; os estados com tais leis tornam-se inelegíveis para alguns fundos de banda larga
(BEAD) e podem ver outras subvenções discricionárias condicionadas; a FCC deve considerar um padrão
federal de comunicação e divulgação que preemptaria regras estaduais conflituosas; a Comissão
Federal de Comércio (FTC) deve emitir uma declaração de política sobre como a sua autoridade de
engano se aplica às leis estaduais que exigem saídas alteradas; e os conselheiros do Presidente
devem preparar legislação para um quadro federal uniforme. A recomendação legislativa da ordem não
deve propor preempção das leis estaduais sobre segurança infantil, sobre computação de IA e
infraestrutura de centros de dados que não seja licenciamento, ou sobre contratação pública e
utilização de IA pelos estados [10].

O que aconteceu a seguir, a partir de 2026-09-24:

- O Procurador-Geral anunciou a força-tarefa em 9 de janeiro de 2026, conforme comunicado por
  profissionais [12].
- A Casa Branca publicou recomendações legislativas não vinculativas em 20 de março de 2026, pedindo
  ao Congresso que preempta as leis estaduais de IA que impõem encargos indevidos enquanto não
  preempta as leis estaduais geralmente aplicáveis que protegem as crianças, previnem fraude e
  protegem os consumidores [11].
- A FTC solicitou comentários em 1 de julho de 2026 sobre uma proposta de declaração de política:
  que distorcer deliberadamente os resultados de um sistema de IA para fins ideológicos não
  divulgados pode ser enganoso sob a Secção 5 da Lei da FTC. A declaração discute a Lei de IA do
  Colorado e sugere que pode estar implicitamente preemptada quando coage mudanças nos resultados;
  os comentários fecharam em 31 de julho de 2026 [13].
- Na Câmara, um projeto de discussão bipartidário lançado em junho de 2026 permitiria a preempção
  federal da regulamentação estadual de IA durante três anos; era um projeto para comentários das
  partes interessadas, não um projeto apresentado [14]. Se foi desde então introduzido deve ser
  verificado (verificar).
- A avaliação do Comércio era devida no prazo de 90 dias da ordem [10]; se foi publicada e quais
  leis nomeia deve ser verificado (verificar).
- Nos tribunais, xAI processou em 9 de abril de 2026 para bloquear a Lei de IA original do Colorado,
  SB 24-205, e o Departamento de Justiça dos EUA interveio com uma reclamação complementar em 24 de
  abril de 2026, argumentando que a Lei viola a Cláusula de Proteção Igualitária [16][17]. Em 27 de
  abril de 2026, um juiz federal de magistrado entrou com uma ordem estipulada sob a qual o
  Procurador-Geral do Colorado não aplicaria SB 24-205 até 14 dias após uma decisão sobre o pedido
  de xAI de uma injunção preliminar; SB 26-189 então substituiu a Lei [16].

Para o engenheiro a regra prática é simples: um dever estadual vincula até ser revogado, substituído
ou suspenso. Mantenha os controlos de cada estado como um módulo de política separado e versionado,
codificado pela jurisdição, para que uma ordem judicial ou uma revogação seja uma mudança de
configuração e não uma reconstrução.

| Instrumento federal | Aplica-se a | O que pede | Artefato que a agência ou prestador mantém | Camada |
|---|---|---|---|---|
| OMB M-25-21 [6] | Agências federais (elementos da Comunidade de Inteligência encorajados, não obrigatórios) | Determinação de elevado impacto; sete práticas mínimas; Diretor de IA; inventário de casos de uso | Entrada de inventário de caso de utilização; relatório de teste pré-implantação; avaliação de impacto de IA; plano de monitorização; caminho de recurso | 2 · 3 · 4 · 5 |
| OMB M-26-04 [8] | Agências que compram modelos de linguagem grande e seus prestadores | Princípios de IA Imparcial como termos de contrato; pacote de transparência mínima | Política de utilização aceitável; fichas de modelo, sistema ou dados; recursos de utilizador final; canal de feedback | 2 · 5 |
| EO 14365 e a proposta da FTC [10][13] | Estados; programadores sujeitos às leis estaduais | Nenhum dever ainda sobre atores privados; risco de litígio e preempção | Módulos de política codificados por jurisdição; registo de quais controlos de resultado cada lei estadual exige | 1 |

## Estados Unidos: leis estaduais que vinculam organizações privadas

O Capítulo 08 mapeia as duas leis de fronteira, Texas e Colorado ao nível da tabela
[leis federais e estaduais dos EUA](/bok/regulatory-map#us-federal-and-state-laws). Esta secção
adiciona as leis que atingem programadores e responsáveis pela implantação ordinários, e dá a cada
uma o seu âmbito, datas, deveres e aplicação.

| Lei | Estado (a partir de 2026-09-24) | Âmbito | Deveres principais | Aplicação | Artefato de evidência | Camada |
|---|---|---|---|---|---|---|
| Colorado SB 26-189 (Tecnologia de Decisão Automatizada) | Assinado 2026-05-14; efetivo 2027-01-01; revoga e reenacta SB 24-205 [15][16] | Programadores e responsáveis pela implantação de ADMT em decisões consequentes (emprego, habitação, empréstimos, seguros, benefícios) | Documentação do programador para responsáveis pela implantação (usos previstos, categorias de dados de treino, limites conhecidos, instruções) e aviso de atualizações materiais; aviso do responsável pela implantação de uso de ADMT; explicação em linguagem clara no prazo de 30 dias de um resultado adverso; correção do consumidor, revisão humana e reconsideração; registos mantidos três anos ou mais | Procurador-Geral sob a Lei de Proteção do Consumidor; aviso de cura de 60 dias antes de 2030; nenhum novo direito de ação privada [15] | Inventário de ADMT; pacote de documentação do programador; modelos de notificação e explicação de resultado adverso; fila de revisão humana; armazenamento de registos de três anos | 2 · 4 · 5 |
| Texas TRAIGA (HB 149) | Em vigor 2026-01-01 [18] | Pessoas que fazem negócios no Texas; programadores, responsáveis pela implantação, governo | Proibições baseadas em intenção (manipulação de comportamento, classificação social governamental, discriminação ilegal, certos conteúdos sexuais); divulgação por agências governamentais e em serviços de saúde; sandbox de 36 meses; regras de IA locais preemptadas | Apenas Procurador-Geral; nenhum direito de ação privada; cura de 60 dias; USD 10.000–12.000 por violação curável, 80.000–200.000 por violação não curável, 2.000–40.000 por dia continuado [18] | Política de uso proibido como código; controlos de divulgação; uma ficha de modelo que responde às oito questões investigativas do Procurador-Geral | 1 · 2 · 4 |
| California SB 53 (Lei de Transparência em IA de Fronteira) | Chaptered 2025-09-29; em vigor 2026-01-01 [19][20] | Programadores de fronteira (modelos treinados acima de 10^26 operações); grandes programadores de fronteira (receita acima de USD 500M) | Estrutura de IA de fronteira publicada; relatório de transparência antes de implantar um modelo de fronteira novo ou substancialmente modificado; incidentes críticos de segurança relatados no prazo de 15 dias, 24 horas se morte ou lesão grave é iminente; canal de denunciante | Procurador-Geral; penalidade civil até USD 1M por violação [19] | Estrutura publicada; relatório de transparência pré-implantação; pipeline de incidentes com os dois relógios; canal de relatório anónimo | 3 · 4 · 5 |
| Lei de Transparência de IA da California (SB 942 conforme alterado por AB 853) | Operativo 2026-08-02; deveres de plataforma 2027-01-01; dispositivos de captura 2028-01-01 [21] | Prestadores cobertos de sistemas de IA generativa pública; grandes plataformas online; plataformas de alojamento; fabricantes de dispositivos de captura | Ferramenta de detecção gratuita; divulgação visível (manifesta) opcional; divulgação incorporada (latente) em imagem, vídeo e áudio; plataformas detetam e expõem proveniência e não devem removê-la | Penalidade civil de USD 5.000 por violação, cada dia uma violação separada, em ações pelo Procurador-Geral, um procurador da cidade ou um conselho do condado (Bus. & Prof. Code s. 22757.4) [21] | Pipeline de proveniência escrevendo metadados latentes; ponto final de detecção público; apresentação de proveniência no lado da plataforma | 3 · 4 |
| California AB 2013 (transparência de dados de treino) | Documentação devida em ou antes de 2026-01-01 e em cada novo lançamento ou modificação substancial [22] | Programadores de sistemas de IA generativa lançados desde 2022-01-01 para uso na California | Resumo público de conjuntos de dados de treino: fontes, finalidade, tamanho, tipos de dados, estado de PI, licenciamento, informações pessoais, limpeza, período de recolha, primeiro uso, dados sintéticos | Isenções: segurança e integridade, operação de aeronaves, usos de segurança nacional federal [22] | Ficha de dados por conjunto de dados, publicada no lançamento; registo de direitos de dados de treino | 2 |
| Regulamentos CPPA da California (ADMT, avaliações de risco, auditorias de cibersegurança) | Aprovado 2025-09-23; efetivo 2026-01-01; deveres de ADMT a partir de 2027-01-01; atestações de avaliação de risco devidas 2028-04-01 [23] | Empresas sujeitas ao CCPA usando ADMT para decisões significativas | Deveres de ADMT para decisões significativas (detalhe no capítulo 19); avaliações de risco; auditorias de cibersegurança | Agência de Proteção de Privacidade da California [23] | Registo de ADMT; aviso pré-uso; encaminhamento de opt-out; registo de avaliação de risco | 2 · 4 · 5 |
| California SB 243 (chatbots de companhia) | Chaptered 2025-10-13; relatórios anuais a partir de 2027-07-01 [24] | Operadores de chatbots complementares | Divulgue IA onde uma pessoa razoável poderia ser enganada; para menores conhecidos, divulgue IA e relembre pelo menos a cada três horas, e impeça conteúdo sexualmente explícito; protocolo de suicídio e automutilação com encaminhamento de crise | Direito de ação privada: pelo menos USD 1.000 por violação [24] | Política de modo complementar; temporizador de lembrete; classificador de encaminhamento para crise e registo; relatório anual | 1 · 4 · 5 |
| Lei RAISE de Nova Iorque | Assinado 2025-12-19; efetivo 2027-01-01 após a emenda do capítulo de 2026 [25][26] | Programadores de fronteira (modelos treinados acima de 10^26 operações) para relatórios de incidentes; grandes programadores de fronteira (receita acima de USD 500M) para o protocolo publicado, após a emenda do capítulo [26] | Protocolo de segurança publicado; incidentes de segurança divulgados no prazo de 72 horas; escritório de supervisão DFS | Procurador-Geral [25] | Protocolo publicado; pipeline de incidentes de 72 horas | 4 · 5 |
| Artigo 47 GBL de Nova Iorque (modelos de companhia de IA) | Em vigor [27] (verificar data de início) | Operadores de companhias de IA | Protocolo para detetar ideação suicida e automutilação e encaminhar para serviços de crise; aviso de que o utilizador não está a falar com um humano no início e pelo menos a cada três horas | Procurador-Geral; penalidades civis até USD 15.000 por dia [27] | Classificador de encaminhamento para crise e registo; temporizador de notificação | 4 · 5 |
| Lei de Política de IA de Utah (SB 149 conforme alterado por SB 226 e SB 332) | Emendas efetivas 2025-05-07; Lei revoga em 2027-07-01 {[28]} | Fornecedores que utilizam IA generativa em transações de consumidor; ocupações reguladas | Divulgue IA quando uma pessoa claramente pede; divulgação proeminente em interações "de alto risco" (dados sensíveis ou conselho personalizado) por profissionais regulados, verbalmente no início ou por escrito antes; porto seguro para divulgação clara no início | Divisão de Proteção do Consumidor [28] | Componente de divulgação com bandeira de risco de interação; registo de conversa mostrando a divulgação | 4 |
| Illinois HB 3773 (emenda da Lei de Direitos Humanos) | Efetivo 2026-01-01; regras de implementação em rascunho, conforme relatado [29] | Empregadores usando IA no recrutamento, contratação, promoção, disciplina e outros termos de emprego | Nenhum uso de IA com efeito discriminatório em classes protegidas; sem códigos ZIP como proxy; aviso aos funcionários e candidatos | Departamento de Direitos Humanos de Illinois e os recursos da Lei de Direitos Humanos [29] | Inventário de IA em RH; avaliação de impacto adverso por classe protegida; registo de notificação | 2 · 3 · 4 |
| Lei Local 144 de NYC (ferramentas de decisão de emprego automatizadas) | Aplicada desde 2023-07-05 [30] | Empregadores e agências de emprego que utilizam AEDTs para funções em Nova Iorque | Auditoria de viés no prazo de um ano antes do uso; resumo público dos resultados; avisos aos candidatos e funcionários | Departamento de Proteção do Consumidor e do Trabalhador; canal de reclamações [30] | Relatório de auditoria de viés independente; resumo publicado; registo de aviso | 3 · 5 |

### Decisões consequentes: uma ferramenta de contratação, quatro regimes

Colorado, as regras ADMT da California, Illinois e Nova Iorque City todos atingem contratação
automatizada, mas cada um pede um artefato diferente: Colorado uma explicação no prazo de 30 dias de
um resultado adverso e um caminho de revisão humana [15]; California, a partir de 2027, os deveres
de ADMT do CPPA [23]; Illinois um aviso e uma ausência de efeito discriminatório [29]; Nova Iorque
City uma auditoria de viés independente, publicada, com menos de um ano de idade [30]. A Coreia
também lista contratação como uma área de elevado impacto [1]. Uma suite de avaliação única que mede
taxas de seleção por classe protegida, executada em CI e em amostras de produção, produz a evidência
que cada um deles precisa; os avisos e caminhos de revisão diferem apenas em redação e calendário.

> **Exemplo (ilustrativo)**
> Um modelo de classificação de CV de um prestador é implantado por empregadores em Denver, Chicago,
> Nova Iorque City e Seul. O [Eval Gate em CI](/patterns/eval-gate-in-ci) executa uma suite de
> impacto adverso em cada lançamento e bloqueia um que move a razão de taxa de seleção de qualquer
> grupo abaixo do piso configurado. Os mesmos resultados alimentam o pedido de dados do auditor de
> auditoria de viés de NYC, o ficheiro de efeito discriminatório de Illinois e a secção "indicadores
> e método" da avaliação de impacto coreana. A entrada do registo carrega quatro modelos de aviso e
> uma fila de revisão humana; a [explicação de resultado adverso](/patterns/explanation-artefact) é
> gerada a partir dos códigos de razão principais do modelo e registada com a decisão, para que o
> relógio de 30 dias do Colorado seja cumprido pelo mesmo pipeline que responde a um aviso de ação
> adversa de crédito dos EUA.

### Proveniência, dados de treino e programadores de fronteira

A Califórnia divide a transparência de conteúdos em dois estatutos: a AB 2013 obriga os
programadores a publicar um resumo dos seus dados de treino [22], e a Lei de Transparência da IA
obriga os grandes prestadores a incorporar a proveniência nos meios que os seus sistemas produzem e
a dar ao público uma forma de a verificar [21]. Ambas são problemas de evidência antes de serem
problemas legais: uma ficha de dados por conjunto de dados e um pipeline de proveniência que escreve
metadados no momento da geração são os artefatos, e ambos pertencem às camadas 2 e 3 da
[stack](/bok/the-stack#layer-02-inventory--transparency). Para programadores de fronteira, a SB 53 e
a RAISE convergem num framework de segurança publicado e num relógio de incidentes curto [19][25]; o
capítulo 08 aborda as
[linhas de programadores de fronteira](/bok/regulatory-map#frontier-developer-laws).

### Chatbots e assistentes

Utah, Califórnia e Nova Iorque regulam a interface conversacional em si, não o modelo por trás dela
[24][27][28]. Utah exige divulgação mediante um pedido claro e divulgação proeminente em interações
reguladas e de risco elevado [28]; Califórnia e Nova Iorque acrescentam lembretes periódicos e um
protocolo de encaminhamento para crise para produtos assistentes, com os lembretes da Califórnia
vinculados a menores conhecidos [24][27]. As medidas de interação antropomórfica da China, abaixo,
cobrem o mesmo terreno com um lembrete de duas horas [35]. Estes são problemas de
[Runtime Guardrail](/patterns/runtime-guardrail): um temporizador de sessão, um classificador que
deteta sinais de automutilação e encaminha para um referral, e um registo que prova que ambos
funcionaram.

## Japão: a Lei de Promoção da IA

A Lei Japonesa sobre a Promoção da Investigação, Desenvolvimento e Utilização de Tecnologias
Relacionadas com IA (人工知能関連技術の研究開発及び活用の推進に関する法律), Lei n.º 53 de 2025, foi promulgada em 4 de junho
de 2025 e entrou plenamente em vigor em 1 de setembro de 2025, quando as disposições que estabelecem
a Sede de Estratégia de IA entraram em vigor [31][32]. É uma lei de framework e promoção sem
penalidades [31]. O seu dever sobre as empresas é uma frase: os operadores que utilizam tecnologia
relacionada com IA no seu negócio devem esforçar-se por a utilizar ativamente e devem **cooperar**
com as medidas do governo nacional e local (Artigo 7) [31]. O Estado emite diretrizes consistentes
com as normas internacionais para assegurar investigação, desenvolvimento e utilização apropriados
(Artigo 13), e recolhe informações sobre, e analisa, casos em que fins impróprios ou métodos
inadequados violaram os direitos das pessoas, depois fornece orientação, aconselhamento e informação
aos operadores (Artigo 16) [31].

Os instrumentos que dão conteúdo à Lei são suaves. A Sede de Estratégia de IA adotou diretrizes
sobre garantir a adequação da investigação, desenvolvimento e utilização de IA em 19 de dezembro de
2025 [34]. O Gabinete adotou o primeiro Plano Básico de IA em 23 de dezembro de 2025 e um plano
revisto em 14 de julho de 2026 [33]. A leitura de engenharia: sem apresentação de documentos e sem
multa, mas um governo que investiga casos de violação de direitos e nomeia operadores em orientação.
Um operador que mantém um registo de incidentes e uma ficha de modelo atualizados pode responder a
uma investigação do Artigo 16 sem pressa.

## China: o que o capítulo 08 ainda não cobre

O capítulo 08 mapeia os [níveis vinculativos e voluntários](/bok/regulatory-map#china) da China,
desde as disposições de recomendação algorítmica até ao framework 3.0 do TC260. Uma regra que não
mapeia é as **Medidas Provisórias para a Administração de Serviços de Interação Antropomórfica**
(人工智能拟人化互动服务管理暂行办法), emitidas pela CAC com mais quatro organismos e em vigor desde 15 de julho de
2026 [35]. Aplicam-se a serviços de IA oferecidos ao público na China que simulam personalidade
humana, pensamento e estilo de comunicação para fornecer **interação emocional sustentada**, como
companheirismo ou apoio emocional; atendimento ao cliente, resposta a perguntas, assistentes de
trabalho, educação e ferramentas de investigação sem interação emocional sustentada estão fora do
âmbito (Artigo 2) [35]. Os deveres:

- nenhum membro da família virtual ou parceiro virtual íntimo para menores; consentimento do tutor
  para utilizadores com menos de 14 anos; um modo para menores com lembretes de realidade e limites
  de tempo; passos razoáveis para identificar menores (Artigo 14) [35];
- rotulagem de conteúdo gerado por IA sob as regras de rotulagem nacionais e um sinal claro de que o
  utilizador está a interagir com IA; um aviso pop-up quando o excesso de confiança ou vício
  aparece; um lembrete após cada **duas horas** de utilização contínua (Artigo 18) [35];
- uma saída fácil: quando o utilizador pede para sair, o serviço deve parar e não deve manter o
  utilizador envolvido (Artigo 19) [35];
- uma **avaliação de segurança**, comunicada ao escritório de ciberespaço provincial, quando o
  serviço é lançado ou adiciona tais funcionalidades, quando a nova tecnologia o altera
  significativamente, quando atinge 1 milhão de utilizadores registados ou 100 000 utilizadores
  ativos mensais, ou quando surgem riscos de segurança nacional ou interesse público (Artigo 22)
  [35];
- apresentação de algoritmo sob as disposições de recomendação, com verificações anuais pela CAC
  (Artigo 26) [35].

Os artefatos são os mesmos que as leis de assistentes dos EUA exigem, mais um monitor de limiar em
contagens de utilizadores que desencadeia a avaliação, e o registo de apresentação que o capítulo 08
já mapeia.

## Brasil: PL 2338/2023 (projeto de lei)

O projeto de lei de IA do Brasil, PL 2338/2023, foi apresentado no Senado em 3 de maio de 2023,
aprovado pelo plenário do Senado em 10 de dezembro de 2024 e enviado à Câmara dos Deputados, que o
recebeu em 17 de março de 2025 [36][37]. A Câmara criou uma comissão especial em 4 de abril de 2025
porque o projeto foi remetido a mais de quatro comissões permanentes; conforme a última entrada
processual, em 2 de setembro de 2026, o projeto estava sob regime de prioridade e aguardando o
parecer do relator, com um número crescente de projetos relacionados anexados [37]. É um projeto de
lei, não uma lei. O texto do Senado, cujo objeto declarado é o desenvolvimento, promoção e
utilização ética e responsável de IA centrada na pessoa humana [37], segue um modelo baseado em
risco com uma lista de utilizações de risco elevado e utilizações proibidas (verifique o texto atual
antes de confiar em qualquer artigo). O conselho de engenharia para um projeto de lei é o mesmo em
todo o lado: mapeie-o no crosswalk como `status: bill`, não anexe controlos a ele ainda, e observe a
comissão.

## Canadá: após a AIDA, a Diretiva sobre Tomada de Decisão Automatizada

A Lei de Inteligência Artificial e Dados (AIDA), parte do Projeto de Lei C-27, morreu na Ordem de
Trabalhos quando a primeira sessão do 44.º Parlamento terminou em 6 de janeiro de 2025 [38]. O
Canadá portanto não tem um estatuto federal de IA para o setor privado. O que vincula é a
**Diretiva do Conselho do Tesouro sobre Tomada de Decisão Automatizada**, que se aplica aos sistemas
de decisão automatizada das instituições federais [39]. Entrou em vigor em 1 de abril de 2019; a
versão atual (modificada em 24 de junho de 2025) deu aos sistemas em vigor antes dessa data até 24
de junho de 2026 para cumprir os novos requisitos, e a diretiva é revista a cada dois anos [39]. O
seu núcleo:

- uma **Avaliação de Impacto Algorítmico** (AIA) concluída e publicada no Portal do Governo Aberto
  antes da produção, e atualizada quando a funcionalidade ou âmbito muda;
- requisitos dimensionados pelo **nível de impacto** da AIA (I a IV), estabelecido no Apêndice C;
- aviso antes das decisões através de cada canal de serviço, em linguagem clara, e uma explicação
  significativa após as decisões;
- garantia de qualidade, incluindo revisão por pares por especialistas qualificados com a revisão ou
  um resumo publicado antes da produção, e uma Análise Baseada em Género Plus;
- opções de recurso para contestar a decisão, e relatórios publicados sobre eficácia e equidade
  [39].

A AIA é o exemplo público mais maduro de uma avaliação de impacto que é também um artefato publicado
e versionado; é um modelo direto para [FRIA-as-Code](/patterns/fria-as-code).

## Índia: diretrizes de governação, sem lei de IA

A Índia não tem um estatuto específico de IA. A MeitY publicou as
**Diretrizes de Governação de IA da Índia** em 5 de novembro de 2025, sob a Missão IndiaAI [40].
Compreendem sete princípios orientadores ("sutras"), recomendações em seis pilares, um plano de ação
em cronogramas de curto, médio e longo prazo, e orientação prática para indústria, programadores e
reguladores [40]. O Secretário da MeitY descreveu a política como usando legislação existente sempre
que possível [40]. As obrigações portanto vêm da lei existente, nomeadamente lei de tecnologia da
informação e proteção de dados, que o capítulo 19 cobre; qualquer alteração específica de IA às
Regras de TI, por exemplo sobre rotulagem de conteúdo sintético, deve ser verificada quanto ao seu
estado atual antes de ser mapeada (verifique).

## Reino Unido: princípios, reguladores e registos do setor público

O Reino Unido não tem um estatuto de IA horizontal. A sua abordagem, confirmada na resposta do
governo de fevereiro de 2024 ao livro branco de regulação de IA, é cinco princípios transversais
(segurança, segurança e robustez; transparência e explicabilidade apropriadas; equidade;
responsabilidade e governação; contestabilidade e reparação) aplicados pelos reguladores existentes
dentro dos seus mandatos [41]. Se um projeto de lei de IA de fronteira foi introduzido desde então
deve ser verificado antes de confiar neste parágrafo (verifique). O resto do quadro do Reino Unido é
concreto:

- o **Instituto de Segurança de IA** (renomeado do Instituto de Segurança de IA em fevereiro
  de 2025) avalia modelos de fronteira [42];
- a **Norma de Registo de Transparência Algorítmica** (ATRS) é obrigatória para todos os
  departamentos governamentais e para organismos à distância que prestam serviços públicos ou de
  primeira linha ou interagem diretamente com o público; os registos são publicados num repositório
  central [43];
- o **Código de Prática de Segurança Cibernética de IA** (31 de janeiro de 2025) estabelece
  princípios de segurança de base para sistemas de IA, com um guia de implementação [44] (o capítulo
  08 mapeia separadamente a linha de base ETSI para segurança de IA, EN 304 223);
- para decisões significativas e unicamente automatizadas, a Lei de Dados (Utilização e Acesso) de
  2025 substituiu o Artigo 22 do RGPD do Reino Unido pelos Artigos 22A a 22D, em vigor desde 5 de
  fevereiro de 2026 (ver [capítulo 08](/bok/regulatory-map#united-kingdom)) [45].

Um registo ATRS é uma entrada de inventário escrita para o público. Um registo que já contém campos
de finalidade, proprietário, dados, supervisão humana e risco pode gerar a maior parte dela.

## Itália: Lei 132/2025

A Itália tem uma lei nacional de IA de âmbito geral que se situa ao lado da Lei de IA da UE. A Lei
n.º 132 de 23 de setembro de 2025, *Disposições e delegações ao Governo sobre inteligência
artificial*, foi publicada na Gazzetta Ufficiale em 25 de setembro de 2025 e entrou em vigor em 10
de outubro de 2025 [46]. Deve ser lida e aplicada consistentemente com a Lei de IA da UE (Artigo
1(2)) [46]. As disposições que um engenheiro encontrará:

- **Menores.** O acesso a tecnologias de IA por crianças com menos de 14 anos, e o processamento
  relacionado de dados pessoais, requer o consentimento do titular da responsabilidade parental
  (Artigo 4(4)) [46].
- **Trabalho.** O empregador deve informar os trabalhadores quando a IA é utilizada, nos casos e da
  forma das regras de transparência existentes para sistemas automatizados (Artigo 11.º(2)) [46].
- **Profissões.** Nas profissões intelectuais a IA pode ser utilizada apenas para atividades
  instrumentais e de apoio, e o profissional deve informar o cliente sobre quais sistemas de IA são
  utilizados (Artigo 13.º) [46].
- **Autoridades.** A AgID (agência digital) trata da inovação e da notificação e acompanhamento dos
  organismos de avaliação da conformidade; a ACN (agência de cibersegurança) supervisiona sistemas
  de IA, incluindo inspeções e sanções; o Banco de Itália, a CONSOB e a IVASS mantêm-se como
  autoridades de fiscalização do mercado para os seus setores (Artigo 20.º) [46].
- **Direito penal.** Um novo crime de disseminação ilícita de imagens, vídeos ou vozes gerados ou
  alterados por IA que causem dano injusto, punível com um a cinco anos de prisão (Artigo 26.º,
  inserindo o Artigo 612-quater no Código Penal) [46].

A lei também delega ao Governo a elaboração de regras adicionais; o texto consolidado na Normattiva
mostrava uma última atualização de 26 de junho de 2026 [46].

## Espanha: AESIA, a testagem e um projeto de lei

Espanha tem um supervisor de IA operacional, uma testagem em funcionamento e um projeto de lei
nacional sobre IA que não é lei.

- **O projeto de lei.** O Conselho de Ministros aprovou, em primeira leitura em 11 de março de 2025,
  o projeto de lei para o bom uso e a governação da Inteligência Artificial (Anteproyecto de Ley
  para el buen uso y la gobernanza de la Inteligencia Artificial), com tramitação urgente; tinha de
  voltar ao Conselho de Ministros como projeto de lei e depois ir às Cortes Generales [47]. Conforme
  proposto, estabelece o regime de sanções para o Regulamento de IA da UE dentro dos intervalos do
  Regulamento, trata a falha em rotular falsificações profundas como uma infração grave, acrescenta
  um poder para retirar provisoriamente um sistema do mercado espanhol após um incidente grave, e
  aloca supervisão: a agência de proteção de dados para sistemas biométricos proibidos e de gestão
  de fronteiras e para sistemas de migração e asilo de alto risco das forças de segurança do Estado,
  o conselho da magistratura para a justiça, a junta eleitoral central para processos democráticos,
  o Banco de Espanha, a direção de seguros e a CNMV para os seus setores, e a AESIA para o resto
  [47]. Não tinha sido adotado em 2026-09-24; verifique a sua fase parlamentar antes de o citar
  (verificar).
- **A testagem.** O Real Decreto 817/2023 estabeleceu um ambiente de testagem controlada para
  conformidade com o Regulamento de IA (então proposto) [48]; a primeira convocação procurava até 12
  sistemas de alto risco para um teste de um ano [47].
- **Os guias.** A AESIA publica 16 guias produzidos no piloto de testagem: dois guias introdutórios,
  13 guias técnicos (avaliação da conformidade, gestão da qualidade, gestão de riscos, supervisão
  humana, governação de dados, transparência, precisão, robustez, cibersegurança, registo,
  acompanhamento pós-comercialização, gestão de incidentes, documentação técnica) e um manual de
  verificação. Não são vinculativos e antecedem o Omnibus de IA, Regulamento (UE) 2026/1744, em
  vigor desde 27 de julho de 2026 [68]. Em 2026-09-24 a página da AESIA ainda dizia que seriam
  atualizados assim que o Omnibus fosse aprovado, portanto verifique cada guia em relação ao
  Regulamento alterado [49].

Os guias são o conjunto de modelos públicos mais prático para os requisitos de alto risco da UE; o
capítulo 18 mapeia os artigos que implementam.

## Singapura: estruturas de modelo e AI Verify

Singapura regula a IA através de estruturas voluntárias e um kit de ferramentas de testagem,
mantidos pela IMDA e pela Fundação AI Verify.

- A **Model AI Governance Framework for Generative AI** (maio de 2024) estabelece dimensões de
  governação incluindo testagem, transparência, comunicação de incidentes, segurança e proveniência
  de conteúdo [52].
- A **Model AI Governance Framework for Agentic AI** foi lançada em Davos em 22 de janeiro de 2026
  [50]; a versão atual 1.5 foi publicada em 20 de maio de 2026 e atualizada em 5 de junho de 2026
  [51]. Tem quatro dimensões: avaliar e delimitar os riscos antecipadamente (casos de uso adequados;
  limites e permissões por conceção); tornar os humanos significativamente responsáveis (alocação de
  responsabilidade; supervisão significativa); implementar controlos técnicos e processos (em
  conceção, antes da implantação, e continuamente na implantação); e permitir responsabilidade do
  utilizador final [51].
- **AI Verify** é uma estrutura de testagem que avalia um sistema de IA em relação a 11 princípios
  de governação internacionalmente reconhecidos, com uma extensão de IA generativa e ferramentas de
  testagem técnica [53].

As duas primeiras dimensões da estrutura de agentes são o que este livro chama de
[Agentenregister](/patterns/agent-registry) e
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials); a terceira é o
[Eval Gate in CI](/patterns/eval-gate-in-ci) mais acompanhamento em tempo de execução. O capítulo 23
sobre [governação de agentes](/bok/governing-agents#frameworks-written-for-agents) vai mais longe.

## Austrália: lei existente e orientação voluntária

A Austrália não tem uma lei de IA. O **National AI Plan** do governo, publicado em dezembro de 2025,
afirma que a Austrália tem estruturas legais existentes fortes, em grande medida neutras em relação
à tecnologia, que podem aplicar-se à IA, e que o governo monitorará e responderá conforme os
desafios surjam [54]. Estabelece um **AI Safety Institute** para monitorar, testar e partilhar
informações sobre capacidades e riscos emergentes e para aconselhar reguladores existentes, e
constrói ferramentas de adoção sobre as seis práticas essenciais da **Guidance for AI Adoption**
[54]. Para o engenheiro, as obrigações provêm da lei de privacidade, consumidor, discriminação e
setor; as seis práticas são uma lista de verificação razoável para um programa de governação, não um
dever de conformidade.

## Comparação dos regimes

A comparação abaixo utiliza as questões que uma função de governação coloca a qualquer lei
específica de IA. Cobre regimes cujo texto esta edição verificou; o Regulamento de IA da UE é o
ponto de referência e encontra-se no capítulo 18, que também mapeia
[os mesmos papéis em todos os regimes](/bok/eu-ai-act#the-same-roles-across-regimes) que a coluna
Papéis comprime. Um tratado internacional fica ao lado destes regimes: a
[Convenção-Quadro do Conselho da Europa](/bok/principles-and-standards#council-of-europe-framework-convention-cets-no-225)
é tratada no capítulo 22, com o seu estado de ratificação.

| Regime | Gatilho de classificação | Obrigações principais | Notificação e supervisão humana | Modelos de fronteira ou de finalidade geral | Aplicação | Funções |
|---|---|---|---|---|---|---|
| Lei Básica de IA da Coreia [1][2] | Áreas de elevado impacto listadas mais risco significativo; IA generativa | Gestão de riscos, explicação, proteção do utilizador, documentos mantidos cinco anos; avaliação de impacto (melhor esforço) | Notificação prévia; rótulos de saída; supervisor humano nomeado | Deveres de segurança acima de 10^26 FLOP e estado da arte | MSIT; multas até KRW 30M por três falhas; período de graça | Operadores em desenvolvimento e utilização; representante doméstico |
| Colorado SB 26-189 [15] | ADMT em decisões consequentes | Documentação do programador; registos três anos | Notificação; explicação dentro de 30 dias; revisão humana e reconsideração | Nenhum | Procurador-Geral; período de remediação; sem ação privada | Programador e responsável pela implantação |
| Texas TRAIGA [18] | Intenções proibidas; uso governamental e de cuidados de saúde | Evitar usos proibidos; responder a pedidos investigativos | Divulgação pelo governo e em cuidados de saúde | Nenhum | Procurador-Geral; penalidades civis escalonadas; período de remediação | Programador, responsável pela implantação, governo |
| California SB 53 e SB 942 [19][21] | Computação e receita (fronteira); base de utilizadores (proveniência) | Estrutura de fronteira; relatório de transparência; proveniência e deteção | Divulgações latentes e manifestas | Programadores de fronteira acima de 10^26 operações | Procurador-Geral; até USD 1M por violação (SB 53) | Programador de fronteira; prestador coberto; plataforma |
| China, medidas antropomórficas [35] | Serviços de interação emocional sustentada | Avaliação de segurança; apresentação de algoritmo; modo para menores | Sinal de IA; lembrança de duas horas; saída fácil | Nenhuma específica | CAC e escritórios provinciais | Prestador de serviço; lojas de aplicações |
| Lei de Promoção de IA do Japão [31] | Nenhuma (toda a tecnologia relacionada com IA) | Cooperação com medidas governamentais | Nenhuma na Lei | Nenhum | Sem penalidades; orientação após investigação | Instituições de investigação; operadores em utilização |
| Lei Italiana 132/2025 [46] | Disposições setoriais em cima do Regulamento de IA da UE | Informação do trabalhador; divulgação profissional; consentimento parental menores de 14 | Informação aos trabalhadores e clientes | Através do Regulamento de IA da UE | AgID e ACN; crime para falsificações profundas prejudiciais | Empregador; profissional; prestador |

## Regras setoriais que já alcançam a IA

A lei específica de IA é apenas metade do quadro. Os regimes setoriais escritos antes, ou ao lado,
das leis de IA já vinculam muitos sistemas de IA, normalmente porque a IA fica dentro de um produto,
um modelo financeiro, um sistema TIC ou uma plataforma que regulam. O capítulo 20 cobre lei geral
(propriedade intelectual, não discriminação, proteção do consumidor, responsabilidade do produto); a
tabela abaixo é a camada setorial.

| Regime | Gatilho de IA | Dever | Artefato de engenharia | Camada |
|---|---|---|---|---|
| DORA, Reg. (UE) 2022/2554 (aplica-se a partir de 2025-01-17) [55] | Os sistemas TIC de uma entidade financeira ou serviços TIC de terceiros incluem IA | Gestão de risco TIC, incluindo risco TIC de terceiros, e comunicação de incidentes graves relacionados com TIC | Sistemas de IA no inventário de ativos TIC; fornecedores de IA no registo de terceiros; pipeline de incidentes utilizando a classificação DORA | 2 · 4 · 5 |
| NIS2, Dir. (UE) 2022/2555 (transposição devida 2024-10-17) [56] | Os sistemas de rede e informação de uma entidade essencial ou importante incluem IA | Gestão de risco de cibersegurança; aviso prévio dentro de 24 horas, notificação dentro de 72 horas, relatório final dentro de um mês | Ativos de IA no âmbito de segurança; pipeline de incidentes com o relógio NIS2 | 4 · 5 |
| Regulamento de Ciber-Resiliência, Reg. (UE) 2024/2847 (comunicação a partir de 2026-09-11; deveres principais a partir de 2027-12-11) [57][58] | Um produto com elementos digitais que inclui componentes de IA | Segurança por conceção e tratamento de vulnerabilidades; comunicar vulnerabilidades ativamente exploradas e incidentes graves: 24 horas, 72 horas, relatório final | SBOM e AIBOM; processo de tratamento de vulnerabilidades; runbook de comunicação para a plataforma de comunicação única | 2 · 4 · 5 |
| Regulamento de Dados, Reg. (UE) 2023/2854 (aplica-se a partir de 2025-09-12) [59] | Produtos conectados e serviços relacionados cujos dados treinam ou alimentam IA; IA entregue como serviço de processamento de dados | Acesso e partilha de dados para utilizadores; comutação entre serviços de processamento de dados | Interface de acesso a dados e registo de partilha na ficha de dados; plano de saída e comutação para a plataforma de IA | 2 · 5 |
| MDR e IVDR da UE, com MDCG 2025-6 sobre a sua interação com o Regulamento de IA (junho de 2025) [60] | Software de dispositivo médico que utiliza IA | Avaliação da conformidade do dispositivo; quando a IA é também de alto risco sob o Regulamento de IA, ambos os regimes aplicam-se e o FAQ da MDCG explica como se encaixam | Documentação técnica construída uma vez para servir ambos os regimes; avaliação clínica ou de desempenho; plano de acompanhamento pós-comercialização | 3 · 5 |
| Orientação de rascunho da FDA sobre funções de software de dispositivos ativados por IA (janeiro de 2025; ainda em rascunho na página da FDA) [61] | Software de dispositivo ativado por IA numa submissão de comercialização nos EUA | Documentação recomendada em todo o ciclo de vida total do produto para apoiar a revisão de segurança e eficácia | Descrição do modelo; relatório de gestão e validação de dados; rotulagem; acompanhamento de desempenho pós-comercialização | 3 · 5 |
| Gestão de risco de modelo nos EUA: SR 26-2 (2026-04-17), substituindo SR 11-7 [62] | Modelos, incluindo IA e ML, utilizados por organizações bancárias; mais relevante acima de USD 30B em ativos | Gestão de risco de modelo baseada no risco, adaptada ao perfil de risco do modelo | Entrada de inventário de modelo; relatório de validação; resultados de avaliação como evidência de validação; acompanhamento de desempenho | 2 · 3 · 5 |
| PRA SS1/23 (efetiva 2024-05-17; versão revista efetiva 2026-04-23) [63] | Modelos utilizados por bancos do Reino Unido, sociedades de construção e empresas de investimento designadas pela PRA com aprovação de modelo interno para capital regulatório | Cinco princípios para uma abordagem estratégica ao risco de modelo, começando com identificação de modelo e classificação de risco de modelo | Inventário de modelo com estratificação; registo de validação; registo de mitigantes de risco de modelo | 2 · 3 · 5 |
| ECOA e Regulation B; avisos de ação adversa da FCRA [64] | Uma decisão de crédito tomada ou apoiada por um algoritmo complexo | Razões principais específicas para ação adversa sob 12 CFR 1002.9; a Circular 2022-03 do CFPB dizendo que a complexidade não é desculpa foi retirada em 12 de maio de 2025, e o dever da Regulation B permanece [71]. Os avisos da FCRA aplicam-se quando um relatório de consumidor é utilizado (verificar âmbito por produto) | Gerador de código de razão registado com cada decisão; modelo de aviso; avaliação de que as razões são fiéis ao modelo | 3 · 4 · 5 |
| Diretiva sobre Trabalho em Plataforma, Dir. (UE) 2024/2831 (transposição até 2 de dezembro de 2026, Art. 29(1)) [65][70] | Plataformas de trabalho digital utilizando monitorização ou tomada de decisão automatizadas | Transparência de sistemas automatizados; monitorização por pessoal qualificado; direito de contestar decisões automatizadas | Registo de gestão algorítmica; informação voltada para o trabalhador; fila de revisão humana com registo de decisão; AIPD | 2 · 4 · 5 |
| Menores e segurança em linha: orientações do Art. 28 da DSA (2025-07-14); deveres de proteção de crianças da Lei de Segurança em Linha do Reino Unido; leis de chatbot de acompanhamento [66][67][24][27][35] | Serviços suscetíveis de serem utilizados por crianças, incluindo chat de IA e acompanhantes | Medidas de proteção proporcionais; avaliação de risco de menores; lembretes e encaminhamento de crise | Sinal de verificação de idade; configuração de modo de menores; avaliação de risco de menores; registos de lembrete e encaminhamento | 1 · 4 · 5 |

Duas destas linhas mudaram recentemente o suficiente para apanhar uma equipa que olhou pela última
vez em 2025. As agências bancárias dos EUA substituíram SR 11-7, o texto de referência de "gestão de
risco de modelo" durante quinze anos, por SR 26-2 em 17 de abril de 2026 [62]; as referências a "SR
11-7" nas políticas de governação de modelo devem agora apontar para a orientação revista. E os
deveres de comunicação da Lei de Ciber-Resiliência começaram em 11 de setembro de 2026 [57].

### Relógios de incidente em diferentes regimes

Um incidente de IA pode iniciar vários relógios em simultâneo. O padrão
[Incident Pipeline](/patterns/incident-pipeline) deve manter cada relógio como dados, indexado pelo
regime e pelo gatilho, para que uma decisão de triagem se distribua por cada relatório que é devido.
O capítulo 17 trata a [resposta a incidentes](/bok/incidents#the-overlapping-clocks) na íntegra.

| Regime | Desencadeador | Relógio | Destinatário |
|---|---|---|---|
| NIS2 [56] | Incidente significativo | Aviso prévio de 24 h; notificação de 72 h; relatório final no prazo de um mês | CSIRT ou autoridade competente |
| Lei de Ciber-Resiliência [58] | Vulnerabilidade ativamente explorada ou incidente grave | Aviso prévio de 24 h; notificação de 72 h; relatório final 14 dias após uma correção (vulnerabilidades) ou um mês (incidentes) | Plataforma de comunicação única |
| DORA [55] | Incidente grave relacionado com TIC | Notificação inicial no prazo de 4 h após classificar o incidente como grave e não mais tarde de 24 h a partir da tomada de conhecimento; relatório intermédio no prazo de 72 h da notificação inicial; relatório final no prazo de um mês do último relatório intermédio (Regulamento Delegado (UE) 2025/301, Art. 5) [69] | Autoridade financeira competente |
| California SB 53 [19] | Incidente crítico de segurança | 15 dias; 24 h se morte ou lesão grave é iminente | Gabinete de Serviços de Emergência; autoridade apropriada para o caso de 24 horas |
| New York RAISE [25][26] | Incidente crítico de segurança | 72 h; 24 h se morte ou lesão física grave é iminente | Gabinete de supervisão dentro do Departamento de Serviços Financeiros; agência de aplicação da lei ou segurança pública para o caso de 24 horas |
| Lei Básica de IA da Coreia [1] | Deveres de segurança para sistemas de elevada computação | Sem relógio fixo; resultados das medidas de segurança submetidos ao MSIT | MSIT |
| Regulamento da IA da UE Art. 73 | Incidente grave (risco elevado) | Consulte a [tabela de relógio no capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus) | Autoridade de fiscalização do mercado |

> **Na prática (ilustrativo)**
> Uma empresa de pagamentos executava um modelo de pontuação de fraude dentro de uma plataforma que
> era um serviço TIC sob DORA, uma entidade importante sob NIS2 e, através dos seus dispositivos de
> ponto de venda, um produto CRA. Quando um caminho de injeção de prompts no seu agente de suporte
> expôs dados de cartão, o pipeline de incidente abriu um bilhete e três relatórios voltados para o
> regulador a partir da mesma linha cronológica, cada um com o seu próprio relógio e modelo. O que
> fez funcionar não foi o modelo: foi um registo que já marcava o agente com os três regimes, e um
> armazenamento de evidência que permitia a cada relatório citar os mesmos registos assinados.

## O que pode fazer esta semana

1. **Adicione um bloco de jurisdição a cada entrada de registo.** Liste onde cada sistema é
   oferecido, e para cada local registe o valor de estado (binding-horizontal, binding-targeted,
   voluntary, bill), o veredicto de classificação e o modelo de aviso em vigor. Comece com o teste
   de elevado impacto da Coreia e o teste de decisão consequente do Colorado; cobrem a maioria dos
   sistemas de contratação e empréstimo.
2. **Verifique os limiares de representante doméstico coreano.** Extraia a receita do ano passado
   dos serviços de IA e a média diária de utilizadores de três meses para a Coreia; se qualquer um
   cruzar a linha do decreto, designe um representante e dê-lhe uma vista de evidência apenas de
   leitura antes do período de orientação terminar.
3. **Transforme relógios de incidente em dados.** Coloque os relógios NIS2, CRA, DORA, SB 53, RAISE
   e Regulamento da IA Artigo 73 numa tabela indexada por gatilho, e faça o pipeline de incidente
   lê-la. Teste-o com um incidente de mesa que atinge dois regimes.
4. **Substitua "SR 11-7" na sua política de governação de modelo.** Aponte-a para SR 26-2 e
   re-estratifique o seu inventário de modelo contra a orientação revista, baseada no risco.
5. **Faça a ficha de modelo responder às questões do Texas.** Finalidade, tipos de dados de treino,
   categorias de entrada e saída, métricas de desempenho, limites conhecidos e acompanhamento
   pós-implantação: os oito itens que o Procurador-Geral do Texas pode exigir são um bom mínimo para
   qualquer ficha de modelo.

**Correspondências:** Lei Básica de IA da Coreia Arts. 2, 4, 31–36, 40, 43 e Decreto de Execução
Arts. 23–29 · OMB M-25-21 §4 e M-26-04 · EO 14365 · Colorado SB 26-189 · Texas HB 149 · California
SB 53, SB 942 e AB 853, AB 2013, SB 243 e regulamentos ADMT da CPPA · New York RAISE e GBL Art. 47 ·
Utah AI Policy Act · Illinois HB 3773 · NYC Local Law 144 · Lei Japonesa Nº 53 de 2025 · Medidas de
interação antropomórfica da CAC · Diretiva Canadiana sobre Tomada de Decisão Automatizada · Lei
Italiana 132/2025 · Estruturas de Governação de IA de Singapura e AI Verify · DORA · NIS2 · Lei de
Ciber-Resiliência · Lei de Dados · MDR e IVDR · SR 26-2 · PRA SS1/23 · Regulation B · Diretiva sobre
Trabalho em Plataforma · Art. 28 da DSA · todas as cinco camadas do stack
([Govern-as-Code](/bok/the-stack#layer-01-govern-as-code) a
[Assurance & Continuous Compliance](/bok/the-stack#layer-05-assurance--continuous-compliance)). Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; as amended by Act No. 21311 of 2026-01-20, in force 2026-01-22 and, for Arts. 3(5), 16(3)-(5), 17-2, 18, 22-3 and the second sentence of 35(1), 2026-07-21; Arts. 2(4) high-impact areas, 2(7) operators, 4 scope, 31 transparency, 32 safety, 33 confirmation, 34 high-impact duties, 35 impact assessment, 36 domestic representative, 40 fact-finding, 43 fines up to KRW 30M; version in force 2026-07-21). Korean Law Information Center (MOLEG). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791&efYd=20260721 (verified: primary)
[2] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22; as amended by Presidential Decree No. 36506 of 2026-07-20, in force 2026-07-21, and No. 36580, in force 2026-08-20; Art. 1-2 AI-vulnerable groups, Art. 15(4) confirmation of AI products for public procurement, Art. 23 notice and labelling methods, Art. 24 10^26 FLOP and two further criteria, Art. 25 confirmation procedure and 30-day reply, Art. 27 publication and five-year retention, Art. 28 impact-assessment content, Art. 29 domestic-representative thresholds; version in force 2026-08-20). Korean Law Information Center (MOLEG). 2026-08-18. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=288781&efYd=20260820 (verified: primary)
[3] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations; AI Basic Act help desk). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[4] "AI기본법 시행령 7월 시행, 공공조달 AI 확인 제도 핵심 정리" (decree amendment in force 2026-07-21: public-procurement AI confirmation system, liability exemption for adopting officials, AI-vulnerable groups widened to job seekers and women with career breaks, support measures). Korea Data Economy News (한국데이터경제신문). 2026-07-20. https://www.dataeconomy.co.kr/news/articleView.html?idxno=41346 (verified: secondary)
[5] Executive Order 14179, Removing Barriers to American Leadership in Artificial Intelligence (signed 2025-01-23; review of actions taken under the revoked EO 14110; AI action plan within 180 days). Federal Register, Vol. 90, No. 20 (via GovInfo). 2025-01-31. https://www.govinfo.gov/content/pkg/FR-2025-01-31/html/2025-02172.htm (verified: primary)
[6] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (rescinds M-24-10; high-impact AI definition; minimum practices §4(b); 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[7] "White House Releases New Policies on Federal Agency AI Use and Procurement" (M-25-21 and M-25-22, Driving Efficient Acquisition of Artificial Intelligence in Government). The White House. 2025-04-07. https://www.whitehouse.gov/releases/2025/04/white-house-releases-new-policies-on-federal-agency-ai-use-and-procurement/ (verified: primary)
[8] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (implements EO 14319 of 2025-07-23; policies updated by 2026-03-11; minimum LLM transparency: acceptable use policy, model/system/data cards, end-user resources, feedback mechanism). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[9] Winning the Race: America's AI Action Plan (three pillars; funding and state AI regulatory climate; FCC evaluation; NIST AI RMF revision). The White House. 2025-07. https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf (verified: primary)
[10] Executive Order 14365, Ensuring a National Policy Framework for Artificial Intelligence (signed 2025-12-11; §3 AI Litigation Task Force in 30 days; §4 Commerce evaluation in 90 days; §5 BEAD and grant conditions; §6 FCC; §7 FTC policy statement; §8 legislative recommendation and carve-outs). Federal Register, Vol. 90, No. 239 (via GovInfo). 2025-12-16. https://www.govinfo.gov/content/pkg/FR-2025-12-16/html/2025-23092.htm (verified: primary)
[11] National Policy Framework for Artificial Intelligence: Legislative Recommendations (non-binding; preempt unduly burdensome state AI laws; keep generally applicable child-protection, anti-fraud and consumer laws). The White House. 2026-03-20. https://www.whitehouse.gov/wp-content/uploads/2026/03/03.20.26-National-Policy-Framework-for-Artificial-Intelligence-Legislative-Recommendations.pdf (verified: primary)
[12] "Navigating the Emerging Federal-State AI Showdown: DOJ Establishes AI Litigation Task Force" (task force announced by the Attorney General on 2026-01-09). BakerHostetler. 2026-01-20. https://www.bakerlaw.com/insights/navigating-the-emerging-federal-state-ai-showdown-doj-establishes-ai-litigation-task-force/ (verified: secondary)
[13] "FTC Seeks Public Comment on Policy Statement Addressing AI Accuracy" (proposed Section 5 policy statement; Colorado AI Act discussed as possibly impliedly preempted; comments to 2026-07-31). Federal Trade Commission. 2026-07-01. https://www.ftc.gov/news-events/news/press-releases/2026/07/ftc-seeks-public-comment-policy-statement-addressing-ai-accuracy (verified: primary)
[14] "Lawmakers propose AI framework that would preempt state laws for 3 years" (Obernolte and Trahan discussion draft, Great American Artificial Intelligence Act of 2026). Nextgov/FCW. 2026-06-04. https://www.nextgov.com/artificial-intelligence/2026/06/lawmakers-propose-ai-framework-would-preempt-state-laws-3-years/413975/ (verified: secondary)
[15] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; developer documentation, deployer notice, 30-day explanation, human review, three-year records; Attorney General enforcement with 60-day cure). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[16] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 2026-06-30, then replaced by SB 26-189; xAI suit filed 2026-04-09; DOJ companion complaint 2026-04-24; stipulated order of 2026-04-27 pausing enforcement). McDermott Will & Emery. 2026-05-27. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[17] "DOJ Intervenes in Lawsuit Challenging Colorado's 'Algorithmic Discrimination' Law" (developer suit filed 2026-04-09 in the District of Colorado; DOJ complaint on Equal Protection grounds). Barnes & Thornburg. 2026-05-01. https://btlaw.com/en/insights/alerts/2026/doj-intervenes-in-lawsuit-challenging-colorados-algorithmic-discrimination-law (verified: secondary)
[18] Texas Responsible Artificial Intelligence Governance Act (HB 149, enrolled; effective 2026-01-01; §552.051 disclosure, §§552.052–552.057 prohibitions, §552.101 no private right of action, §552.103 civil investigative demand items, §552.104 60-day cure, §552.105 penalties, 36-month sandbox). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[19] SB-53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; chaptered 2025-09-29, Chapter 138; 10^26 operations; USD 500M revenue; frontier AI framework; transparency report; incident reports to OES in 15 days or 24 hours; up to USD 1M per violation; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislative Information. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53 (verified: primary)
[20] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; transparency reports by all frontier developers). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[21] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01; s. 22757.4 civil penalty USD 5,000 per violation, each day a discrete violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[22] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01; exemptions). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[23] "California Finalizes Regulations to Strengthen Consumers' Privacy" (ADMT, risk-assessment and cybersecurity-audit regulations approved 2025-09-23; effective 2026-01-01; ADMT from 2027-01-01; attestations from 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[24] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; three-hour reminders for known minors; self-harm protocol; reports from 2027-07-01; private right of action, at least USD 1,000 per violation). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[25] NY State Senate Bill 2025-S6953B (RAISE Act as signed 2025-12-19: frontier models above 10^26 operations costing over USD 100M; safety protocols; 72-hour incident disclosure; thresholds and the reporting recipient superseded by the chapter amendment signed 2026-03-27, which uses 10^26 operations, USD 500M revenue for large frontier developers and a DFS office, see [26]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[26] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment S8828 signed 2026-03-27; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; all frontier developers report critical safety incidents within 72 hours to a new DFS office, or within 24 hours to law enforcement or public safety agencies on imminent risk). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[27] New York General Business Law Article 47, Artificial Intelligence Companion Models (§1701 self-harm protocol; §1702 notice at start and every three hours; §1703 Attorney General, up to USD 15,000 per day). New York State Senate. 2026. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[28] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; regulated occupations; safe harbour; effective 2025-05-07; AI Policy Act repeal date 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[29] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; IDHR draft rules; Human Rights Act remedies). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[30] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[31] Act on the Promotion of Research, Development and Utilisation of AI-Related Technologies (人工知能関連技術の研究開発及び活用の推進に関する法律; Act No. 53 of 2025, promulgated 2025-06-04; Arts. 7, 13, 16, 18; no penalties). e-Gov Law Search (Digital Agency). 2025-06-04. https://laws.e-gov.go.jp/law/507AC0000000053 (verified: primary)
[32] AI Act page (promulgated and partly in force 2025-06-04; fully in force 2025-09-01). Cabinet Office of Japan. 2025. https://www8.cao.go.jp/cstp/ai/ai_act/ai_act.html (verified: primary)
[33] AI Basic Plan (Cabinet decisions of 2025-12-23 and 2026-07-14). Cabinet Office of Japan. 2026-07-14. https://www8.cao.go.jp/cstp/ai/ai_plan/ai_plan.html (verified: primary)
[34] Guidelines on ensuring the appropriateness of research, development and use of AI-related technologies (AI Strategy Headquarters decision of 2025-12-19). Cabinet Office of Japan. 2025-12-19. https://www8.cao.go.jp/cstp/ai/ai_guideline/ai_guideline.html (verified: primary)
[35] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; Art. 2 scope; Art. 14 minors; Art. 18 labelling and two-hour reminder; Art. 19 exit; Art. 22 security assessment incl. 1M registered or 100k monthly active users; Art. 26 filing; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[36] PL 2338/2023, Marco Legal da Inteligência Artificial (introduced 2023-05-03; approved by the Senate plenary 2024-12-10; sent to the Chamber of Deputies). Federal Senate of Brazil. 2025-03-17. https://www25.senado.leg.br/web/atividade/materias/-/materia/157233 (verified: primary)
[37] PL 2338/2023 in the Chamber of Deputies (received 2025-03-17; special committee created 2025-04-04; priority regime; awaiting report as of the 2026-09-02 entry). Câmara dos Deputados. 2026-09-02. https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262 (verified: primary)
[38] C-27 (44-1), Digital Charter Implementation Act, 2022 (enacting the Artificial Intelligence and Data Act; session ended 2025-01-06). LEGISinfo, Parliament of Canada. 2025. https://www.parl.ca/legisinfo/en/bill/44-1/c-27 (verified: primary)
[39] Directive on Automated Decision-Making (effective 2019-04-01; modified 2025-06-24; existing systems to comply by 2026-06-24; AIA, Appendix C impact levels, notice, explanation, peer review, GBA Plus, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[40] "MeitY Unveils India AI Governance Guidelines under IndiaAI Mission" (seven sutras, six pillars, action plan; existing legislation wherever possible). Press Information Bureau, Government of India. 2025-11-05. https://www.pib.gov.in/PressReleasePage.aspx?PRID=2186639 (verified: primary)
[41] A pro-innovation approach to AI regulation: government response (CP 1019; five cross-sector principles applied by existing regulators). Department for Science, Innovation and Technology. 2024-02-06. https://www.gov.uk/government/consultations/ai-regulation-a-pro-innovation-approach-policy-proposals/outcome/a-pro-innovation-approach-to-ai-regulation-government-response (verified: primary)
[42] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[43] Algorithmic Transparency Recording Standard Hub (mandatory for government departments and for arm's-length bodies delivering public or frontline services). Government Digital Service. 2025-05-08. https://www.gov.uk/government/collections/algorithmic-transparency-recording-standard-hub (verified: primary)
[44] AI Cyber Security Code of Practice (code and implementation guide). Department for Science, Innovation and Technology. 2025-01-31. https://www.gov.uk/government/publications/ai-cyber-security-code-of-practice (verified: primary)
[45] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 2026-02-05). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[46] Legge 23 settembre 2025, n. 132, Disposizioni e deleghe al Governo in materia di intelligenza artificiale (GU Serie Generale n. 223 of 2025-09-25; in force 2025-10-10; Arts. 1(2), 4(4), 11(2), 13, 20, 26; consolidated text last updated 2026-06-26). Gazzetta Ufficiale / Normattiva. 2025-09-25. https://www.gazzettaufficiale.it/eli/id/2025/09/25/25G00143/sg (verified: primary)
[47] Referencia del Consejo de Ministros, 11 March 2025 (Anteproyecto de Ley para el buen uso y la gobernanza de la Inteligencia Artificial, first reading, urgent processing; sanctions, deepfake labelling, provisional withdrawal, authorities; sandbox call for up to 12 systems). La Moncloa. 2025-03-11. https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx (verified: primary)
[48] Real Decreto 817/2023, de 8 de noviembre, entorno controlado de pruebas (AI regulatory sandbox). Boletín Oficial del Estado. 2023-11-09. https://www.boe.es/eli/es/rd/2023/11/08/817 (verified: primary)
[49] Guías (16 guides from the Spanish AI regulatory sandbox pilot; non-binding; the page still says they will be updated once the digital Omnibus is approved, as of 2026-09-24). AESIA. 2026. https://aesia.digital.gob.es/es/guias (verified: primary)
[50] "Singapore Launches New Model AI Governance Framework for Agentic AI" (launched at Davos). IMDA. 2026-01-22. https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai (verified: primary)
[51] Model AI Governance Framework for Agentic AI, version 1.5 (published 2026-05-20, updated 2026-06-05; four dimensions). IMDA. 2026-06-05. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[52] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[53] AI Verify Testing Framework (11 internationally recognised AI governance principles; generative-AI update). AI Verify Foundation. 2026. https://aiverifyfoundation.sg/what-is-ai-verify/ (verified: primary)
[54] National AI Plan, "Keep Australians safe" (existing technology-neutral frameworks; AI Safety Institute; six essential practices of the Guidance for AI Adoption; published December 2025; opened via the Internet Archive). Department of Industry, Science and Resources. 2025-12. https://www.industry.gov.au/publications/national-ai-plan/keep-australians-safe (verified: primary)
[55] Digital Operational Resilience Act (DORA) (entered into force 2023-01-16; applies from 2025-01-17; ICT and ICT third-party risk; reporting of major ICT-related incidents). European Securities and Markets Authority. 2025. https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/digital-operational-resilience-act-dora (verified: primary)
[56] NIS2 Directive: questions and answers (transposition by 2024-10-17; early warning 24 hours, notification 72 hours, final report within one month). European Commission. 2024. https://digital-strategy.ec.europa.eu/en/faqs/directive-measures-high-common-level-cybersecurity-across-union-nis2-directive-faqs (verified: primary)
[57] Cyber Resilience Act (in force 2024-12-10; reporting obligations from 2026-09-11; main obligations from 2027-12-11; guidance of 2026-07-27). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act (verified: primary)
[58] Cyber Resilience Act: reporting obligations (24-hour early warning, 72-hour notification, final report 14 days after a corrective measure or one month for severe incidents; single reporting platform). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/cra-reporting (verified: primary)
[59] Data Act (in force 2024-01-11; applies from 2025-09-12; access to data from connected products; switching between cloud providers). European Commission. 2025. https://digital-strategy.ec.europa.eu/en/policies/data-act (verified: primary)
[60] MDCG 2025-6, FAQ on interplay between the MDR and IVDR and the Artificial Intelligence Act (how the device regulations and the AI Act apply together; listed on the Commission's MDCG guidance page). Medical Device Coordination Group (European Commission). 2025-06. https://health.ec.europa.eu/document/download/b78a17d7-e3cd-4943-851d-e02a2f22bbb4_en?filename=mdcg_2025-6_en.pdf (verified: primary)
[61] Artificial Intelligence-Enabled Device Software Functions: Lifecycle Management and Marketing Submission Recommendations (draft guidance; docket FDA-2024-D-4488). US Food and Drug Administration. 2025-01-07. https://www.fda.gov/regulatory-information/search-fda-guidance-documents/artificial-intelligence-enabled-device-software-functions-lifecycle-management-and-marketing (verified: primary)
[62] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8; most relevant above USD 30B in total assets). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[63] SS1/23, Model risk management principles for banks (published 2023-05-17; effective 2024-05-17; revised version effective 2026-04-23; scope: banks, building societies and PRA-designated investment firms with internal-model approval; five principles). Prudential Regulation Authority (Bank of England). 2026-04. https://www.bankofengland.co.uk/prudential-regulation/publication/2023/may/model-risk-management-principles-for-banks-ss (verified: primary)
[64] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[65] "Platform workers: Council adopts new rules to improve their working conditions" (algorithmic management transparency; monitoring by qualified staff; right to contest; two years to transpose). Council of the European Union. 2024-10-14. https://www.consilium.europa.eu/en/press/press-releases/2024/10/14/platform-workers-council-adopts-new-rules-to-improve-their-working-conditions/ (verified: primary)
[66] "Commission publishes guidelines on the protection of minors" (DSA Art. 28 guidelines). European Commission. 2025-07-14. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors (verified: primary)
[67] Online Safety Act: explainer (children's risk assessments due 2025-07-24; child-safety regime in effect from summer 2025). Department for Science, Innovation and Technology. 2025-04-24. https://www.gov.uk/government/publications/online-safety-act-explainer/online-safety-act-explainer (verified: primary)
[68] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[69] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits for major ICT-related incident reports under DORA (Art. 5: initial notification within 4 hours of classification and 24 hours of awareness; intermediate within 72 hours; final within one month). Publications Office of the EU (EUR-Lex). 2024-10-23. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[70] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 29(1): transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[71] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
