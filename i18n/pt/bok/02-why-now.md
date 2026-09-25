---
lang: pt
source: bok/02-why-now.md
sourceHash: "fd5e154caa65ef30565b60079cffc5a315d017e112d2db5705e6d107d4af8a78"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 02. Por que agora

> A engenharia de governação da IA está a formar-se agora porque a coisa a ser governada mudou de
> forma, o mercado começou a contratar competências de engenharia antes de a profissão se nomear a
> si própria, e a lei começou a pedir evidência engenheirada, tudo entre abril de 2025 e agosto
> de 2026.

As disciplinas não aparecem num calendário. Aparecem quando uma forma antiga de trabalhar
visualmente deixa de funcionar e pessoas suficientes, em lugares suficientes, começam a construir a
substituição em simultâneo. Isto está a acontecer à governação da IA agora. A Tese enuncia cinco
problemas fundamentais com a governação da IA legada; este capítulo toma cada um por sua vez, anexa
a evidência, e depois expõe os sinais de mercado, regulamentares e técnicos que em conjunto explicam
o calendário. A afirmação é estreita e falsificável: não que a governação de repente importe, mas
que a *engenharia* da governação se tornou o constrangimento, e que os dados agora o dizem. As
afirmações datadas são atuais a partir de 2026-09-24.

## Os cinco problemas, com a evidência

### 1. Governação escrita para sistemas que já não existem

A governação legada descreve um sistema de IA como estava no dia em que foi revisto, enquanto
modelos retreinam, prompts mudam e agentes ganham ferramentas dia após dia; o artefato está obsoleto
antes de ser assinado. O indicador estrutural é *onde a função se situa*. No Relatório de Profissão
de Governação de IA 2025 da IAPP, a função de governação de IA está alojada principalmente com
privacidade (22%), legal e conformidade (22%) e TI (17%), e com apenas 5% em segurança [1], longe do
pipeline onde o sistema muda. Uma função na camada de revisão, não na camada de construção, não pode
manter a sua descrição de produção verdadeira, porque nada a liga à implantação.

### 2. Revisão num ponto no tempo de uma coisa continuamente em mudança

Avaliações anuais e aprovações de comité assumem um sistema que se mantém imóvel o tempo suficiente
para ser julgado. Modelos de fronteira e agentes autónomos não. A Gartner espera que mais de 40% dos
projetos de IA agentic sejam cancelados até ao final de 2027, nomeando controlos de risco
inadequados entre as causas [2], e prevê que até 2029 mais de metade dos ataques bem-sucedidos a
agentes de IA explorarão fraquezas de controlo de acesso e injeção de prompts [3]. Ambos são modos
de falha em tempo de execução (o sistema a comportar-se mal entre revisões), e uma avaliação uma vez
por ano é estruturalmente cega a eles. Isto não é o mesmo trabalho que a gestão de risco de modelo
na tradição SR 11-7, que valida um modelo em pontos no tempo; o objeto aqui nunca deixa de se mover.
A orientação própria da tradição dos EUA concorda sobre o limite: SR 26-2, que substituiu SR 11-7 em
17 abr 2026, deixa modelos de IA generativa e agentic fora do seu âmbito [22][23]. O capítulo 11
lista
[os traços da IA que quebram a governação clássica de TI](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance),
cada um emparelhado com o controlo que o responde.

### 3. Governação como um limiar no final, não uma propriedade da construção

A governação ainda tende a chegar depois do modelo ser treinado, como um ponto de controlo a
ultrapassar antes do lançamento, e nada do que produz é ligado de volta a como o sistema é
construído. Uma política que só pode recomendar não pode parar um lançamento ruim; uma avaliação
ligada a um `eval gate` que pode falhar a construção pode: a diferença entre um controlo que
descreve risco e um que o previne. O capítulo 14 reconstrói
[a construção como uma cadeia de limiares](/bok/governing-development#the-build-as-a-chain-of-gates).

### 4. Teatro de framework

O mapeamento para NIST AI RMF ou ISO/IEC 42001 torna-se o estado final em vez do ponto de partida, e
uma matriz de mapeamento verde é confundida com um controlo que funciona. Contudo, a partir de
2026-09-24 nenhuma norma harmonizada é citada no Jornal Oficial da UE, portanto não há presunção de
conformidade do Artigo 40 para o Regulamento da IA [4]. Mesmo EN ISO/IEC 42001, a norma de sistema
de gestão de IA, não é o sistema de gestão de qualidade do Artigo 17 que o Regulamento exige e
confere presunção de conformidade por si só [5]. Cobertura não é garantia. Um mapeamento cruzado
prova que leu o framework; não prova que o controlo para o qual aponta realmente funciona.

### 5. Sem caminho de dados em tempo de execução

O registo não sabe o que está em execução. A comparação de um fornecedor da categoria de plataforma
de governação de IA, publicada por um concorrente nela, encontra que a maioria da categoria "gere o
programa (inventários, avaliações, mapeamentos de framework, fluxos de trabalho de evidência) sem
qualquer caminho de dados em tempo de execução" [6]. Trate isto como uma afirmação a testar, não um
facto estabelecido; onde se mantém, as três questões que definem a disciplina (que IA está em
execução, o que lhe é permitido fazer, que evidência o prova) ficam sem resposta, porque nada está
ligado à produção. Entretanto, um inquérito de 2026 de um fornecedor de segurança relata que
aproximadamente um em cada oito incidentes de IA envolveu sistemas agentic [7]: exatamente a camada
que o registo de papel não consegue ver. Um controlo sem telemetria é uma afirmação, não um
controlo.

## A evidência

### A profissão está com falta de pessoal, e sabe-o

O sinal mais claro de que o trabalho superou a sua forma atual é que quase ninguém pensa que tem
pessoas suficientes para o fazer. No relatório 2025 da IAPP, de 671 respondentes apenas 10 (1,5%)
disseram que não precisarão de pessoal adicional de governação de IA nos próximos 12 meses [1].
Aproximadamente 77% das organizações relatam trabalhar em governação de IA, subindo para
aproximadamente nove em dez entre as que já utilizam IA [1]. A procura é quase universal; a
capacidade não. Quando uma função é desejada em todo o lado, sub-recursos, e alojada fora da camada
de construção, o hiato não é fechado contratando mais revisores. É fechado transformando a
governação num sistema que escala, o que é um problema de engenharia.

### O mercado está a contratar para a engenharia

O mercado de trabalho já está a contratar para esta mudança, e está a fazê-lo no vocabulário da
engenharia. Uma análise de 1.997 anúncios de governação de IA dos Estados Unidos, atualizada em
agosto de 2026, encontrou que a competência mais comum exigida era plataformas de observabilidade,
em 41% dos anúncios, seguida de Python (28%) e frameworks NIST (27%) [8]. Estas são competências de
construção e execução, não competências de revisão. Na fronteira, a Anthropic anunciou em 2026 um
Engineering Manager para GRC encarregado de construir uma "função de engenharia de GRC orientada
para IA", traduzindo "políticas em política como código", e implantando fluxos de trabalho agentic
que usam Claude "para servir como um analista de GRC virtual" [9]. Os anúncios descrevem a
substância da engenharia de governação da IA; ainda não concordaram sobre o seu nome.

### Registo versus tempo de execução

O mercado de ferramentas conta a mesma história do lado da oferta. A Gartner publicou o seu primeiro
Magic Quadrant para Plataformas de Governação de IA em junho de 2026, como um dos fornecedores
nomeados nele relatou [10]. O próprio enquadramento da Gartner da categoria pede mais do que um
registo: a sua análise de fevereiro de 2026 diz que estas plataformas devem permitir "aplicação de
política automatizada em tempo de execução" e monitorização contínua, e espera que os gastos em
governação de IA atinjam USD 492 milhões em 2026 e passem USD 1 mil milhão até 2030 [11]. O que a
categoria é pedida para fazer e o que envia são questões diferentes. A comparação de fornecedor
citada acima, que classifica os treze fornecedores no Magic Quadrant, encontra que a maioria deles
gere o programa "sem qualquer caminho de dados em tempo de execução" [6], e a conta que um Líder dá
da sua própria colocação centra-se na visibilidade em casos de uso de IA e um roteiro de inventário
de ativos, linhagem e integração de caso de uso [10]. A questão a fazer a qualquer plataforma é
portanto concreta: foi esta decisão de política tomada numa chamada ao vivo, e onde está o registo?
A distância entre a definição do analista e essa resposta é o espaço que a disciplina ocupa.

### O hiato de normas

O problema do teatro de conformidade tem um prazo rigoroso associado. A partir de 2026-09-24, zero
normas harmonizadas estão citadas no Jornal Oficial, pelo que a presunção de conformidade do Artigo
40 ainda não está disponível para ninguém [4]. A EN 18286, a norma de gestão da qualidade dirigida
ao Artigo 17, foi publicada em julho de 2026, a primeira norma JTC 21 escrita para o Regulamento da
IA a atingir publicação, mas ainda não está citada no Jornal Oficial, pelo que não tem presunção de
conformidade [4][12]. As normas de gestão de riscos do Artigo 9, registo do Artigo 12 e
cibersegurança do Artigo 15 foram reportadas como ainda em fase de Consulta em meados de 2026, com
objetivo no final de 2026 [13]. A EN ISO/IEC 42001:2026, a adoção europeia da norma de sistema de
gestão de IA, não é o SGQ do Artigo 17 e não evidencia por si só conformidade [5]. A consequência
prática para uma função de governação: durante o período coberto por esta edição, não existe norma
contra a qual possa certificar-se para obter uma presunção legal. Tem de construir os controlos e a
evidência por si próprio e estar pronto para os defender pelos seus méritos.

### A onda regulatória: o Omnibus Digital e a aplicação da GPAI

A lei mudou duas vezes no verão de 2026, em direções opostas, e ambas as mudanças apontam para a
engenharia. Primeiro,
[o Omnibus Digital, Regulamento (UE) 2026/1744](/bok/eu-ai-act#the-act-and-the-omnibus), entrou em
vigor em 27 de julho de 2026, seis dias antes do prazo de 2 de agosto de risco elevado, e reiniciou
o relógio: as obrigações de risco elevado do Anexo III passaram de 2 de agosto de 2026 para 2 de
dezembro de 2027, e o risco elevado incorporado do Anexo I de 2 de agosto de 2027 para 2 de agosto
de 2028 [14][19]. O tempo adicional é real, mas não é alívio da engenharia; é mais pista para a
fazer. Segundo, e não afetado pelo Omnibus, a aplicação da GPAI entrou em vigor em 2 de agosto de
2026: o Serviço para a IA pode agora exigir documentação, avaliar modelos e exigir medidas, e a
Comissão pode multar prestadores de modelos de finalidade geral até 3% do volume de negócios anual
global ou EUR 15 milhões, o que for superior, sob o Artigo 101 [15]. Em 29 de agosto de 2026 a
Vice-Presidente Executiva da Comissão Henna Virkkunen anunciou que o Serviço para a IA tinha
formalmente enviado os seus primeiros pedidos de informação a vários prestadores de GPAI, abrangendo
segurança de modelos, avaliações externas independentes e monitorização de modelos uma vez no
mercado [16]. O que as obrigações executáveis pedem (avaliações de modelos, testes adversariais,
comunicação de incidentes, segurança de pesos) é um programa de engenharia, não um ficheiro de
política.

Os próximos pontos de viragem estão datados no próprio Omnibus [19]. Em 2 de dezembro de 2026 as
novas proibições do Artigo 5 sobre imagens íntimas não consensuais geradas por IA e material de
abuso sexual infantil aplicam-se, e prestadores de sistemas generativos colocados no mercado antes
de 2 de agosto de 2026 devem cumprir a obrigação de marcação do Artigo 50(2). As obrigações de risco
elevado do Anexo III seguem em 2 de dezembro de 2027 e do Anexo I em 2 de agosto de 2028; sistemas
de risco elevado destinados a autoridades públicas que já estavam no mercado devem estar em
conformidade em 2 de agosto de 2030. [O Capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)
mapeia cada data para o artefato que a responde.

O mesmo padrão aparece fora da UE.
[A SB 53 da Califórnia](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
a Lei de Transparência em Inteligência Artificial de Fronteira, assinada em 29 de setembro de 2025 e
em vigor desde 1 de janeiro de 2026, vincula grandes desenvolvedores de fronteira (modelos treinados
com mais de 10^26 operações; receita anual acima de USD 500 milhões) a publicar um marco de IA de
fronteira, e cada desenvolvedor de fronteira, grande ou não, a comunicar incidentes críticos de
segurança ao Serviço de Emergências do estado dentro de 15 dias, com penalidades civis até USD 1
milhão por violação recuperadas pelo Procurador-Geral [17][18]. O seu âmbito é estreito (o capítulo
08 coloca-o ao lado das outras
[leis estaduais dos EUA](/bok/regulatory-map#us-federal-and-state-laws)), mas o que pede, um marco
publicado e
[um pipeline de incidentes que funciona num relógio](/bok/incidents#the-overlapping-clocks), é
novamente um entregável de engenharia.

### A mudança de agentes

O último sinal é o próprio objeto da governação. Agentes que navegam, executam código, chamam APIs e
atuam sob autoridade delegada são agora a coisa mais difícil e mais nova de governar, e a evidência
de que os controlos legados não os conseguem ver está a acumular-se. A previsão da Gartner de que em
2029 mais de metade dos ataques bem-sucedidos a agentes de IA explorarão fraquezas de controlo de
acesso e injeção de prompts [3] nomeia identidade e injeção (preocupações de tempo de execução) como
a superfície de ataque dominante. O problema de identidade é concreto: em 5 de fevereiro de 2026 o
Centro Nacional de Excelência em Cibersegurança do NIST publicou um documento conceptual sobre como
identificação, autenticação e autorização se aplicam para que agentes sejam "conhecidos, confiáveis
e adequadamente governados", perguntando como as ações de agentes podem ser registadas de forma à
prova de adulteração e vinculadas a um humano para não-repúdio [20]. Um agente executado numa conta
de serviço genérica e partilhada falha esse teste por construção: as suas ações não podem ser
rastreadas ou revogadas com precisão. O Top 10 da OWASP para Aplicações Agentic 2026 cataloga os
modos de falha que se seguem, desde sequestro de objetivo de agente (ASI01) através de uso indevido
de ferramentas (ASI02) e abuso de identidade e privilégio de agente (ASI03) até agentes desonestos
(ASI10) [21]. E o inquérito de fornecedor de 2026 citado acima reporta aproximadamente um em cada
oito incidentes de IA envolvendo sistemas agentic [7]. O modelo de ameaça moveu-se para a camada que
o registo de papel não consegue alcançar. O Capítulo 23 mapeia
[essas ameaças para controlos](/bok/governing-agents#threats-mapped-to-controls).

## O que muda quando a governação é engenharia

Os cinco problemas partilham uma raiz: governação que descreve em vez de executar. Engenharia da
governação muda o artefato, e mudar o artefato muda o que a função pode prometer. Quando o registo é
alimentado pelo pipeline de implantação, "que IA está a executar?" é uma consulta em direto, não um
palpite trimestral, e a obsolescência do problema 1 deixa de existir. Quando uma `eval gate` falha a
construção num limiar de resistência a injeção reduzido e uma política compilada para código
bloqueia uma implantação fora da região, a revisão pontual do problema 2 e o portão de fim de linha
do problema 3 cedem lugar a controlos que disparam onde o sistema muda. Quando decisões de
guardrail, resultados de avaliação e veredictos de política fluem para um armazém de garantia como
registos legíveis por máquina, o teatro de conformidade do problema 4 é respondido por uma medida
que é a taxa de queda de um modo de falha nomeado, não uma contagem de células verdes. E quando a
identidade precede a autonomia e a telemetria se torna um sinal de controlo em direto, o caminho de
dados de tempo de execução do problema 5 é a espinha dorsal em vez de uma reflexão tardia, pelo que
as três questões se tornam respondíveis em qualquer terça-feira, a partir de sistemas em direto.

Nada disto é uma afirmação de que a governação engenharia garante conformidade; nenhum artefato o
faz, e nenhuma norma ainda confere uma presunção. A afirmação é mais estreita e mais útil: medida
contra redução efetiva do risco e evidência pronta para auditoria, uma função de governação que
executa bate uma que é escrita, e o mercado, o regulador e o modelo de ameaça têm todos, entre abril
de 2025 e agosto de 2026, começado a pedir a versão que executa. É por isso que agora.

> **Na prática**
> Dentro de uma grande operadora de telecomunicações, a mudança de "documentado" para "engenharia"
> foi visível num exercício de incidente de um único trimestre. A versão em papel respondeu "que
> agentes conseguem alcançar a API de pagamentos?" com uma folha de cálculo que estava uma semana
> desatualizada e faltavam dois serviços criados desde a última revisão. Depois que o registo foi
> ligado ao pipeline de implantação e cada agente recebeu uma identidade com âmbito, a mesma
> pergunta era uma consulta que retornava proprietários, âmbitos e marcas de tempo de última
> visualização em segundos, e um agente com comportamento inadequado podia ser revogado sem quebrar
> os outros. A evidência para o exercício não foi montada depois; já estava no armazém de garantia.

**Correspondências:** Regulamento da IA da UE Art. 4/4a (literacia, dados de detecção de
enviesamento), Art. 15 (robustez, cibersegurança), Art. 17 (SGQ), Art. 53/55 (GPAI), Art. 101
(multas GPAI) · ISO/IEC 42001 · NIST AI RMF (Govern, Map, Measure, Manage) · OWASP Top 10 para
Aplicações Agentic 2026 (ASI01–ASI03, ASI10) · SB 53 da Califórnia · stack de cinco camadas, todas
as camadas. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] AI Governance Profession Report 2025 (with Credo AI; 671 respondents; only 1.5% will not need more staff; 77% working on AI governance; 5% of the function in Security; still the current edition on 2026-09-24). IAPP. 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[2] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[3] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027" (by 2029, >50% of successful attacks on AI agents exploit access control and prompt injection). Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[6] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[7] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[8] "The State of the AI Governance Job Market in 2026" (1,997 US postings; observability platforms 41%, Python 28%, NIST frameworks 27%; updated 2026-08-04). Axial Search. 2026-08-04. https://axialsearch.com/insights/ai-governance-jobs (verified: secondary)
[9] "Engineering Manager, GRC" (build an "AI-forward GRC engineering function"; "translate policies into policy-as-code"; Claude "as a virtual GRC analyst"; no longer accepting applications on 2026-09-24). Anthropic (via General Catalyst jobs). 2026. https://jobs.generalcatalyst.com/companies/anthropic/jobs/78167778-engineering-manager-grc (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
[12] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[13] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[14] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[15] Commission enforcement powers over GPAI providers apply from 2 August 2026 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[16] Statement announcing the AI Office's first formal requests for information to GPAI providers (model security, independent external evaluations, post-market monitoring; recipients not named). Henna Virkkunen, Executive Vice-President of the European Commission (LinkedIn). 2026-08-29. https://www.linkedin.com/feed/update/urn:li:activity:7499411372032602112/ (verified: primary)
[17] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier model > 10^26 operations; large frontier developer > USD 500M revenue; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only; a regular-session statute, in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1)). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum. 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1: new Art. 5(1)(ba)–(bb) from 2 Dec 2026; new Art. 111(4) (Art. 50(2) marking for systems placed on the market before 2 Aug 2026, by 2 Dec 2026); Art. 111(2) (public-authority high-risk systems by 2 Aug 2030); Art. 113 (Annex III 2 Dec 2027; Annex I 2 Aug 2028). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[20] "Accelerating the Adoption of Software and Artificial Intelligence Agent Identity and Authorization" (concept paper; agents "known, trusted, and properly governed"; tamper-proof logging and non-repudiation). NIST NCCoE. 2026-02-05. https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents (verified: primary)
[21] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack, ASI02 Tool Misuse, ASI03 Agent Identity & Privilege Abuse, … ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[22] SR 26-2, Revised Guidance on Model Risk Management (Federal Reserve, OCC and FDIC; supersedes SR 11-7 of 2011-04-04 and SR 21-8). Board of Governors of the Federal Reserve System. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm (verified: primary)
[23] Revised Guidance on Model Risk Management, attachment to SR 26-2 (footnote 3: generative AI and agentic AI models "are not within the scope of this guidance"). Federal Reserve, OCC and FDIC. 2026-04-17. https://www.federalreserve.gov/supervisionreg/srletters/SR2602a1.pdf (verified: primary)
