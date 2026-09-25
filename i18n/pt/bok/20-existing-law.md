---
lang: pt
source: bok/20-existing-law.md
sourceHash: "179fe9816c0f1c18447beceee294f06e854a51817f689d791e15cd8e3e0a9b39"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 20. Outra legislação que já se aplica à IA

> A lei de direitos de autor, anti-discriminação, proteção do consumidor e responsabilidade por
> produtos já vincula sistemas de IA; este capítulo mapeia cada dever para o seu artefato de
> evidência e camada de stack.

O Regulamento da IA é a camada mais recente de legislação sobre sistemas de IA, não a única. Quatro
corpos de legislação mais antigos alcançaram a IA primeiro e são aplicados contra ela hoje:
propriedade intelectual, não-discriminação, proteção do consumidor e responsabilidade por produtos.
Um regulador dos EUA colocou a premissa numa linha quando lançou uma varredura contra alegações
enganosas de IA: "não há isenção de IA das leis em vigor" [1]. Nenhuma destas leis foi escrita para
modelos, mas cada uma coloca uma questão que um sistema de IA deve responder com evidência: tínhamos
o direito de usar esta entrada, o sistema desfavorece um grupo protegido, o que dizemos sobre ele é
verdadeiro, e era defeituoso quando saiu do nosso controlo.

Para cada corpo de legislação o capítulo fornece a doutrina em termos simples, uma comparação datada
UE / EUA / Reino Unido, e o artefato, camada de stack (capítulo 04) e padrão (capítulo 05) que
evidenciam conformidade. Termina com falsificações profundas e um modelo de contratação executado
através de cinco corpos de legislação simultaneamente.

Não é aconselhamento jurídico. **As funções de conformidade de IA e jurídica** interpretam estas
obrigações; o engenheiro transforma a interpretação num controlo e num registo, e depende do
conselho para confirmar a leitura (ver
[o cluster de desambiguação](/bok/definition#the-disambiguation-cluster) e
[tradução regulatória](/bok/the-role#regulatory-translation)). A lei de proteção de dados tem o seu
próprio capítulo ([19](/bok/privacy-and-ai#how-to-read-this-chapter)), o Regulamento da IA tem o
capítulo [18](/bok/eu-ai-act#how-to-read-this-chapter), e os estatutos específicos de IA em todo o
mundo estão no capítulo [21](/bok/ai-laws-worldwide#the-landscape-at-a-glance), com as
[regras do setor que já alcançam a IA](/bok/ai-laws-worldwide#sector-rules-that-already-reach-ai).
Cada estado neste capítulo é marcado a partir de 2026-09-24; casos judiciais e prazos de
transposição mudam, portanto verifique novamente antes de confiar numa linha.

## Como ler este capítulo

Cada corpo de legislação coloca uma questão a um sistema de IA. A tabela nomeia o artefato que a
responde e a sua camada no [stack](/bok/the-stack#how-to-read-the-stack):
**1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

| Corpo de legislação | A questão que coloca a um sistema de IA | Artefato de evidência primária | Camada |
|---|---|---|---|
| Propriedade intelectual | Tínhamos o direito de usar cada entrada, e alguma saída copia expressão protegida? | [Registo de direitos de dados de treino](/patterns/training-data-rights-ledger); avaliação de memorização; registo de filtro de saída | 2 · 3 · 4 |
| Não-discriminação | O sistema coloca um grupo protegido em desvantagem que não pode justificar? | Avaliação de impacto por grupo; registo de pesquisa de alternativas menos discriminatórias; teste de fidelidade de código de razão | 3 · 5 |
| Proteção do consumidor | O que afirmamos sobre o sistema, ou fazemos através da sua interface, é enganoso ou injusto? | Registo de alegações ligado a execuções de avaliação; registo de revisão de interface e divulgação | 1 · 3 · 5 |
| Responsabilidade por produtos | O sistema era defeituoso quando saiu do nosso controlo, e avisámos sobre os seus limites? | FMEA; AIBOM com hashes; histórico de avaliação; registo de alterações; instruções de utilização | 2 · 3 · 5 |
| Mídia sintética | A mídia gerada é marcada, divulgada e removível a pedido? | Marcação de proveniência na geração; pipeline de retirada com um relógio | 4 · 5 |

Três advertências percorrem o capítulo.

- **A jurisdição decide a resposta.** A mesma execução de treino pode ser legal num país e infratora
  noutro, portanto os artefatos registam *onde* os dados foram copiados, um modelo foi treinado e um
  sistema foi colocado no mercado.
- **A evidência que mantém é evidência que pode ser ordenado produzir.** Sob o novo regime de
  responsabilidade por produtos da UE um tribunal pode ordenar a um réu que divulgue evidência
  relevante, e a falha em fazê-lo desencadeia uma presunção de que o produto era defeituoso [2]. Um
  ficheiro de defesa que é incompleto ou impreciso funciona contra si. Mantenha-o completo,
  versionado e honesto.
- **Os mapeamentos são ilustrativos, não uma afirmação de conformidade.** Um artefato apoia e
  evidencia uma obrigação; se a obrigação é cumprida é um julgamento legal.

## Propriedade intelectual

A propriedade intelectual toca um sistema de IA em quatro pontos: as obras copiadas para o treinar,
as suas saídas, a informação confidencial que lhe é fornecida, e as invenções que ajuda a fazer. Em
cada ponto o engenheiro regista o que aconteceu, onde, e sob qual direito.

### Direitos de autor e dados de treino

Copiar uma obra para um corpus de treino é, à primeira vista, uma reprodução. A questão legal é se
uma exceção (a rota da UE, Reino Unido e Japão) ou uma defesa (a rota dos EUA) a cobre.

**União Europeia.** A Diretiva do Mercado Único Digital (DSM) cria duas exceções de mineração de
texto e dados (TDM). O Artigo 3 permite que organizações de investigação e instituições de
património cultural minarem obras para investigação científica. O Artigo 4 é a exceção geral:
qualquer pessoa pode copiar obras legalmente acessíveis para TDM e manter as cópias enquanto
necessário, a menos que o titular dos direitos tenha expressamente reservado esse uso "de forma
apropriada, tal como meios legíveis por máquina no caso de conteúdo disponibilizado publicamente
online" [3]. O Regulamento da IA transforma essa exclusão voluntária numa obrigação do prestador: o
Artigo 53(1)(c) exige que cada prestador de modelo de IA de finalidade geral (GPAI) coloque em
prática uma política de direitos de autor que identifique e cumpra as reservas do Artigo 4(3), e o
Artigo 53(1)(d) exige um resumo público do conteúdo de treino no modelo do Serviço para a IA [4]. A
Comissão publicou esse modelo em 24 Jul 2025 [5]. A isenção de código aberto no Artigo 53(2) levanta
apenas os deveres de documentação nos pontos (a) e (b), portanto modelos de peso aberto ainda devem
a política de direitos de autor e o resumo [4]. O Código de Prática GPAI transforma a política em
cinco medidas: uma política escrita, acesso legal (sem contorno de paywall, sem sites
persistentemente infratores), crawlers que seguem `robots.txt`}, salvaguardas contra saídas
infratoras, e um contacto de reclamações [6].

Os tribunais estão a preencher os detalhes. Em *Kneschke v LAION* o Tribunal Regional Superior de
Hamburgo decidiu em 10 Dez 2025 que construir o conjunto de dados LAION-5B caiu dentro das exceções
alemãs de TDM, e que uma reserva escrita em linguagem natural nos termos do website não era legível
por máquina; permitiu um recurso adicional para o Tribunal Federal de Justiça [7]. Em *GEMA v
OpenAI* o Tribunal Regional de Munique decidiu em 11 Nov 2025 que letras de canções memorizadas nos
parâmetros de um modelo são reproduções, que a exceção de TDM cobre cópias preparatórias mas não a
incorporação a longo prazo de obras no modelo, e que as saídas reproduzindo as letras são
responsabilidade do prestador [8]; verifique se um recurso está pendente antes de confiar nela
(verificar). O Tribunal de Justiça ouviu o seu primeiro caso de direitos de autor de IA generativa,
*Like Company v Google* (C-250/25), em 10 Mar 2026, sobre se o treino é uma reprodução, se o Artigo
4 a cobre e se as respostas de chatbot reproduzindo conteúdo de imprensa são uma comunicação ao
público. Uma opinião de Advogado-Geral foi agendada para 3 Sep 2026; a sentença está pendente a
partir de 2026-09-24 [9] (verifique a opinião).

**Estados Unidos.** Não há exceção de TDM. O treino é julgado sob uso justo, que pondera quatro
fatores: o propósito e carácter do uso (incluindo se é transformativo), a natureza da obra, a
quantidade usada, e o efeito no mercado da obra [10]. Os casos até agora dependem dos seus factos;
estão tabelados abaixo.

**Reino Unido.** A exceção TDM do Reino Unido cobre cópias feitas para análise computacional «para a
finalidade exclusiva de investigação para fins não comerciais» [11]. O relatório estatutário do
governo de 18 de março de 2026 não avançou com a exceção de exclusão voluntária sobre a qual tinha
consultado; propõe recolher mais evidência e desenvolver transparência de entrada através de boas
práticas em vez de legislação [12] [13]. Em *Getty Images v Stability AI*, o julgamento de novembro
de 2025 do Tribunal Superior rejeitou a reclamação de infração secundária sobre um modelo treinado
no estrangeiro, com base em que os pesos do modelo não eram uma «cópia infratora»; foi concedida
permissão para recurso nesse ponto, e o recurso está pendente [14].

**Japão.** O artigo 30-4 da Lei de Direitos de Autor permite a exploração de uma obra quando a
finalidade não é usufruir da sua expressão, como treino de IA, a menos que prejudicasse
«indevidamente os interesses do titular dos direitos de autor». O *General Understanding* (maio
de 2024) do Gabinete de Direitos de Autor do Japão coloca o treino que visa produzir a expressão das
obras de treino (sobreajuste deliberado, ajuste fino imitativo, geração aumentada por recuperação
que produz a fonte) fora do artigo 30-4, e a cópia de uma base de dados vendida para análise
enquanto contorna medidas como `robots.txt` dentro da ressalva [15].

| Pergunta (a partir de 2026-09-24) | EU | Estados Unidos | Reino Unido | Japão |
|---|---|---|---|---|
| É permitido o treino comercial em obras legalmente acedidas sem licença? | Sim, sob o artigo 4 da DSM, a menos que reservado [3] | Apenas se uso justo, decidido caso a caso [10] | Nenhuma exceção geral; a secção 29A é apenas investigação não comercial [11] | Sim, para fins de não-usufruto, sujeito à ressalva [15] |
| Como é que um titular de direitos se exclui? | Reserva expressa, legível por máquina para conteúdo em linha [3] | Nenhuma exclusão voluntária estatutária | Não aplicável; exceção de exclusão voluntária não adotada [12] | Nenhuma exclusão voluntária; medidas técnicas importam para a ressalva [15] |
| Dever do prestador de publicar informações de treino? | Sim para prestadores de GPAI: resumo do artigo 53(1)(d) [4] | Nenhum dever federal | Nenhum dever estatutário [13] | Não |

### Casos de treino dos EUA, datados

Cada decisão dependeu do seu próprio processo; nenhuma é uma regra para cada modelo.

| Caso | Tribunal | O que foi decidido | Estado (a partir de 2026-09-24) |
|---|---|---|---|
| *Thomson Reuters v. ROSS Intelligence* | D. Del.; 3d Cir. No. 25-2153 | Copiar notas de rodapé para construir uma ferramenta de pesquisa jurídica concorrente e não generativa não foi uso justo (11 de fevereiro de 2025) [16] | Recurso interlocutório argumentado em 11 de junho de 2026; decisão pendente [17] |
| *Bartz v. Anthropic* | N.D. Cal. | O treino em livros legalmente adquiridos foi uso justo; manter uma biblioteca central de cópias pirateadas não foi (23 de junho de 2025) [18] | Acordo de classe de USD 1,5 mil milhões finalmente aprovado em 20 de julho de 2026; libertação limitada a conduta passada, reclamações de saída preservadas [18] [19] |
| *Kadrey v. Meta* | N.D. Cal. | Sentença sumária parcial para Meta sobre uso justo para treino, no processo que os reclamantes construíram (25 de junho de 2025) [20] | Decisão confinada a esses reclamantes e esse processo [20] |
| *New York Times v. Microsoft and OpenAI* | S.D.N.Y. | Reclamações sobre treino em e reprodução de artigos de notícias | Pendente em sentença sumária; o Departamento de Justiça dos EUA apresentou em apoio dos réus em setembro de 2026 [21] |
| *Andersen v. Stability AI* | N.D. Cal. | Reclamações de artistas visuais sobre treino e distribuição de modelos de imagem | Pendente; julgamento por júri reposto para 20 de setembro de 2027 [22] |
| *Disney Enterprises v. Midjourney* | C.D. Cal. | Reclamações dos estúdios sobre treino e saídas de personagens (apresentadas em 11 de junho de 2025) | Pendente [23] |

Três lições de engenharia seguem destes casos e dos casos da UE.

- **Como adquiriu os dados importa.** *Bartz* separou compra e digitalização legítimas de
  descarregamentos pirateados [18], portanto o registo de direitos de dados regista o canal de
  aquisição, não apenas a licença.
- **Memorização é a exposição do lado da saída.** *GEMA* dependeu de letras que o modelo podia
  reproduzir [8]; uma avaliação de memorização encontra essa exposição antes de um reclamante o
  fazer.
- **As exclusões voluntárias são lidas por máquinas no momento da recolha.** *LAION* e o Código
  dependem ambos de sinais legíveis por máquina [7] [6]; a política do recolhedor é código e as suas
  decisões são registos.

### Saídas: memorização e propriedade

**Saídas infratoras.** Os modelos de linguagem podem devolver sequências raras de treino verbatim em
consultas direcionadas, e modelos maiores estão mais expostos [24]. Os controlos situam-se em duas
camadas: uma avaliação que investiga regurgitação antes do lançamento (camada 03) e um filtro de
saída que bloqueia reprodução quase-verbatim de corpora protegidos ou código licenciado em produção
(camada 04), as salvaguardas que o Código de Prática pede [6].

**Quem é proprietário de uma saída.** Nos Estados Unidos, os direitos de autor exigem um autor
humano. O Tribunal de Circuito de D.C. decidiu assim em 18 de março de 2025 em *Thaler v.
Perlmutter* [25], e a Suprema Corte recusou-se a rever o caso em 2 de março de 2026 [26]. O
relatório de capacidade de direitos de autor do Gabinete de Direitos de Autor dos EUA (29 de janeiro
de 2025) trata prompts sozinhos como insuficientes para autoria, enquanto contribuições expressivas
humanas, seleção e arranjo, e modificação de saída de IA podem ser protegidas; a sua orientação de
registo de março de 2023 exige que os requerentes divulguem material gerado por IA [27]. O seu
relatório sobre treino (Parte 3) é ainda uma versão pré-publicação [27]. O Reino Unido é a exceção:
para uma obra gerada por computador o autor é «a pessoa por quem são empreendidos os arranjos
necessários para a criação da obra» [11].

Para o engenheiro, a propriedade é um problema de proveniência: proteger um ativo que um modelo
ajudou a fazer necessita um registo da contribuição humana (prompts, seleção, edições, quem e
quando), que também suporta a divulgação que um registo pede.

### Direitos de base de dados e segredos comerciais

**Direito de base de dados.** A UE dá ao criador de uma base de dados um direito sui generis contra
extração ou reutilização de toda ou uma parte substancial do seu conteúdo, quando o criador investiu
substancialmente em obter, verificar ou apresentar [28]. Raspar uma base de dados para treino é
extração; o artigo 4 da DSM cobre-o nas mesmas condições que os direitos de autor, incluindo a
reserva [3].

**Segredos comerciais e fuga através de prompts.** Um segredo comercial é protegido apenas enquanto
o seu titular toma «medidas razoáveis» (UE) ou «medidas razoáveis» (EUA) para o manter secreto [29]
[30]. Dois caminhos de IA colocam essa condição em risco: pessoal colando código, preços ou dados de
clientes num modelo de terceiros cujos termos permitem retenção ou treino, e ajuste fino em material
confidencial que ataques de extração podem recuperar mais tarde [24]. Um registo mostrando nenhum
controlo é um mau começo em qualquer dos casos. Os artefatos são ordinários e baratos: uma regra de
prevenção de perda de dados em frente de cada ponto final de modelo externo (camada 04,
[Runtime Guardrail](/patterns/runtime-guardrail)); um registo de prestador de termos de retenção e
sem treino, verificado no
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate); e uma etiqueta de
classificação de dados em cada conjunto de ajuste fino, para que um segredo nunca entre num pipeline
de treino sem uma decisão em registo.

### Patentes e inventoria de IA

As aplicações DABUS, nas quais um sistema de IA foi nomeado como único inventor, falharam em todo o
lado onde foram testadas. O Tribunal Federal dos EUA decidiu em 5 de agosto de 2022 que um inventor
deve ser uma pessoa natural [31]; a Suprema Corte do Reino Unido chegou ao mesmo resultado em 20 de
dezembro de 2023 [32]; e a Junta de Apelação Legal do EPO decidiu em 21 de dezembro de 2021 que «uma
máquina não é um inventor» sob a EPC [33]. Para invenções assistidas por IA, o USPTO rescindiu a sua
orientação de fevereiro de 2024 em 28 de novembro de 2025 e substituiu-a: a IA é tratada como
qualquer outra ferramenta, e o teste de conceção ordinária aplica-se aos humanos envolvidos [34].

O artefato é um registo de invenção que captura conceção humana (quem enquadrou o problema e
reconheceu a solução) juntamente com as ferramentas e entradas de IA utilizadas.

### Licenças de modelo e indenizações de prestador

**Pesos abertos não são o mesmo que código aberto.** Muitos modelos de peso aberto são fornecidos
sob licenças com restrições de uso. A licença Llama 3.1, por exemplo, incorpora uma política de uso
aceitável e exige uma licença separada da Meta para licenciados cujos produtos excederam 700 milhões
de utilizadores ativos mensais na data de lançamento [35]. A definição da Open Source Initiative,
por contraste, exige a forma preferida para modificação: informação de dados, código e parâmetros
[36]. O alívio de código aberto da Lei de IA é ainda mais estreito e nunca cobre os deveres de
direitos de autor [4].

O controlo é um campo de licença em cada modelo e conjunto de dados no [AIBOM](/patterns/aibom),
mais uma política que bloqueia uma implantação cujo caso de uso viola a política de uso da licença
ou limiar comercial (camada 01). Uma licença lida uma vez na aquisição e nunca mais não é um
controlo.

**Indenizações são condicionais, e as condições são controlos em tempo de execução.** O Copilot
Copyright Commitment da Microsoft (7 de setembro de 2023), por exemplo, é condicionado ao cliente
usar as salvaguardas incorporadas e filtros de conteúdo e não tentar gerar material infrator [37].
Desligar os filtros para reduzir falsos positivos pode desligar a indenização. Registe âmbito e
condições no portão de diligência devida, e mantenha instantâneos de configuração e registos de
filtro que mostrem as condições mantidas quando uma saída foi produzida.

### Artefatos que evidenciam conformidade de PI

| Artefato | O que regista | Camada | Padrão |
|---|---|---|---|
| Registo de direitos de dados de treino | Por conjunto de dados: fonte, canal de aquisição, licença, verificação de reserva TDM (resultado, método, data), local de cópia | 2 | [Training-Data Rights Ledger](/patterns/training-data-rights-ledger); [AIBOM](/patterns/aibom) |
| Política de recolhedor como código | Honrando `robots.txt` e outras reservas legíveis por máquina; nenhuma contornação de paywall; lista de bloqueio de sites infratores | 1 | [Policy Card](/patterns/policy-card) |
| Avaliação de memorização e regurgitação | Sondas de extração e limiares de sobreposição verbatim por versão de modelo | 3 | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| Registo de filtro de saída | Saídas quase-verbatim bloqueadas; correspondências de licença em código gerado | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |
| Política de direitos de autor e resumo de treino | Política versionada do artigo 53(1)(c) e resumo do artigo 53(1)(d) para prestadores de GPAI | 5 | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |
| Registo de licença e indenização | Licenças de modelo e conjunto de dados, políticas de uso, âmbito de indenização e condições | 2 · 5 | [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) |
| Regra de DLP de prompt | Segredos e código-fonte bloqueados ou redigidos antes de chamadas externas | 4 | [Runtime Guardrail](/patterns/runtime-guardrail) |

> **Na prática (ilustrativo)**
> Um assistente de recuperação para a equipa de vendas de uma editora foi construído sobre um corpus
> reunido por três equipas diferentes. O registo de direitos foi adicionado posteriormente: uma
> linha por fonte, com o seu canal de aquisição e licença. Duas fontes não tinham licença registada
> e uma tinha sido extraída de um site cujo `robots.txt` proibia o agente utilizador do crawler. A
> construção do corpus agora falha quando uma fonte não tem uma linha no registo, as decisões de
> permissão/negação do crawler são registadas por URL, e as duas fontes sem licença foram removidas
> e o índice reconstruído, com a reconstrução registada contra o mesmo id do registo.

## Não-discriminação

A lei anti-discriminação não pergunta se um modelo é justo em abstrato. Pergunta se uma decisão num
domínio regulado tratou um grupo protegido pior, e se a prática que a causou pode ser justificada. O
trabalho de engenharia é medir o efeito nos termos da lei e manter a justificação com a medição.

### Tratamento discriminatório, impacto discriminatório e proxies

**Duas teorias.** *Tratamento discriminatório* é tratar alguém de forma diferente por causa de uma
característica protegida. *Impacto discriminatório* é uma prática neutra que afeta mais duramente um
grupo protegido. Sob o Título VII, um reclamante prova o impacto mostrando que uma prática
particular o causa; o empregador deve então mostrar que a prática é "relacionada com o trabalho para
a posição em questão e consistente com a necessidade comercial"; e o reclamante pode ainda ganhar
mostrando uma prática de emprego alternativa com menos impacto que o empregador se recusa a adotar
[38]. A lei da UE traça a mesma linha entre discriminação direta e indireta: um critério
aparentemente neutro que coloca um grupo "em desvantagem particular" é ilegal "a menos que essa
disposição, critério ou prática seja objetivamente justificada por um objetivo legítimo e os meios
para alcançar esse objetivo sejam apropriados e necessários" [39] [40].

**A postura de aplicação não é o estatuto.** Nos Estados Unidos, a Ordem Executiva 14281 de 23 de
abril de 2025 dirige as agências federais a deprioritizar a aplicação de estatutos e regulamentos na
medida em que incluem responsabilidade por impacto discriminatório [41], e a HUD propôs remover os
seus regulamentos de impacto discriminatório da Lei de Habitação Justa, com uma proposta
complementar cujo período de comentários decorre até 9 de outubro de 2026 [42]. Para crédito, a
mudança vai além da postura: a CFPB alterou o Regulamento B, com efeito a partir de 21 de julho de
2026, para afirmar que a ECOA não autoriza responsabilidade por impacto discriminatório (o "teste de
efeitos"), deixando as regras de ação adversa em 12 CFR 1002.9 inalteradas [83]. O texto de impacto
discriminatório do Título VII permanece inalterado [38], as ações privadas continuam (ver *Mobley*
abaixo) e a lei da UE e estadual não são afetadas, portanto o teste de impacto permanece para
emprego, sob lei estadual e na UE; no crédito dos EUA já não repousa no Regulamento B [83].

**Proxies.** Remover o atributo protegido não remove o efeito: código postal, nome, escola ou
lacunas na carreira podem carregar a mesma informação. A cegueira também torna o teste mais difícil,
porque não pode medir uma disparidade entre grupos que não registou; para testar, deve processar o
atributo. Após o Omnibus Digital, o novo Artigo 4a do Regulamento da IA dá aos prestadores de
sistemas de risco elevado uma base para processar dados de categorias especiais para detecção de
enviesamento, com pseudonimização e eliminação uma vez que o enviesamento é corrigido [43]. O
capítulo [16](/bok/fairness-and-explainability#group-fairness-metrics) cobre as próprias métricas;
esta secção cobre o que a lei as lerá contra.

### Emprego

**Estados Unidos.** O Título VII aplica-se à triagem de IA como a qualquer outro procedimento de
seleção [38], e os fornecedores não estão seguramente fora da lei federal de discriminação por
idade: em *Mobley v. Workday* o tribunal certificou condicionalmente um coletivo nacional de
discriminação por idade contra o fornecedor de um sistema de triagem de candidatos em 16 de maio de
2025 [44]. A Lei Local 144 de Nova Iorque é a regra mais concreta específica de IA: um empregador
não pode usar uma ferramenta de decisão de emprego automatizada a menos que tenha tido uma auditoria
de enviesamento no ano anterior, o resumo da auditoria seja publicado, e os candidatos sejam
notificados 10 dias úteis antes da utilização; a aplicação começou em 5 de julho de 2023 [45]. A
auditoria, por um terceiro independente, relata taxas de seleção e rácios de impacto por sexo, por
raça e etnia e pela sua interseção [46]. Illinois alterou a sua Lei de Direitos Humanos para
alcançar o uso discriminatório de IA pelo empregador, reportado como efetivo a partir de 1 de
janeiro de 2026 (verificar).

**União Europeia.** As diretivas de Igualdade Racial e Estrutura de Emprego proíbem discriminação
direta e indireta no acesso ao emprego, condições de trabalho e despedimento [39] [40]. O
Regulamento da IA lista recrutamento, seleção, promoção, rescisão, alocação de tarefas e
monitorização de desempenho como de risco elevado (Anexo III, ponto 4) [47], com os deveres de risco
elevado para sistemas do Anexo III adiados pelo Omnibus para 2 de dezembro de 2027 [48]. A Diretiva
sobre Trabalho em Plataforma (UE) 2024/2831, a ser transposta até 2 de dezembro de 2026, vai mais
longe para plataformas de trabalho digital: sem processamento automatizado do estado emocional ou
conversas privadas de um trabalhador, e sem inferência de características protegidas (Art. 7);
informação escrita sobre sistemas automatizados e seus parâmetros principais (Art. 9); uma avaliação
de impacto, incluindo sobre igualdade de tratamento, pelo menos a cada dois anos, e uma decisão
humana para qualquer suspensão ou rescisão de conta (Art. 10); e um direito a uma explicação e
revisão, com retificação em duas semanas (Art. 11) [49].

### Crédito e empréstimo

**Estados Unidos.** Quando um credor toma uma ação adversa, o Regulamento B exige uma declaração das
razões específicas, ou um aviso do direito de as receber [50]. A Circular 2022-03 da CFPB disse em
2022 que credores que usam algoritmos complexos, incluindo IA ou aprendizagem automática, devem
ainda fornecer as razões principais específicas [51]; a CFPB retirou a circular em 12 de maio de
2025 [84], mas o dever do Regulamento B permanece inalterado [50][83]. Quando a decisão repousa num
relatório do consumidor, a FCRA adiciona os seus próprios deveres de ação adversa [52]. A
consequência de engenharia é precisa: as razões no aviso devem ser as razões que o modelo usou,
portanto um código de razão produzido por um método de atribuição é testado quanto à fidelidade
contra cada versão do modelo (capítulo 16 sobre
[avisos de ação adversa](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)).

**União Europeia.** A segunda Diretiva de Crédito ao Consumidor (UE) 2023/2225 exige uma avaliação
de solvabilidade com base em informações relevantes e precisas, sem dados de categorias especiais ou
redes sociais como fonte (Art. 18(3)). Quando a avaliação é automatizada, o consumidor pode obter
intervenção humana: uma explicação da avaliação e da sua lógica, uma oportunidade de apresentar a
sua opinião, e uma revisão (Art. 18(8)). Os Estados-Membros tiveram de adotar as regras até 20 de
novembro de 2025 e aplicá-las a partir de 20 de novembro de 2026 [53] (verificar a transposição
nacional e qualquer alteração à data de aplicação). A pontuação de solvabilidade é também de risco
elevado sob o Regulamento da IA (Anexo III, ponto 5(b)), com detecção de fraude excluída [47]; as
regras de proteção de dados sobre decisões automatizadas estão no capítulo
[19](/bok/privacy-and-ai#automated-decision-making).

### Habitação, seguros e serviços públicos

**Habitação.** A Lei de Habitação Justa alcança algoritmos de entrega de anúncios: num acordo de
2022 com o Departamento de Justiça dos EUA, a Meta concordou em descartar a sua ferramenta "Special
Ad Audience" e construir um sistema para reduzir a variância na entrega de anúncios de habitação
entre grupos [54]. Na UE, a Diretiva de Igualdade Racial cobre o acesso a bens e serviços
disponíveis ao público, incluindo habitação [39].

**Seguros.** O SB21-169 do Colorado (assinado em 6 de julho de 2021) proíbe seguradoras de
discriminar injustamente através de dados de consumidor externos, algoritmos e modelos preditivos, e
exige um quadro de gestão de riscos, avaliação e monitorização, e atestação por um diretor de risco
chefe, sob regras que o comissário adota linha de seguro por linha [55] (verificar as linhas
cobertas e datas efetivas das regras de implementação a partir de 2026-09-24). O boletim modelo da
NAIC de 4 de dezembro de 2023 espera que as seguradoras mantenham um programa escrito para o uso
responsável de sistemas de IA, incluindo supervisão de sistemas de IA de terceiros e dados [56]. Na
UE, o Tribunal de Justiça decidiu em *Test-Achats* que a derrogação permitindo diferenças de prémios
de seguros baseadas no sexo era inválida com efeito a partir de 21 de dezembro de 2012 [57], e o
Regulamento da IA lista avaliação de risco e preços em seguros de vida e saúde como de risco elevado
(Anexo III, ponto 5(c)) [47].

**Serviços públicos.** As decisões de elegibilidade para assistência pública são de risco elevado
sob o Regulamento da IA (Anexo III, ponto 5(a)) [47]. No caso *Bridges* do Reino Unido, o Tribunal
de Recurso descobriu que a força policial "nunca procurou satisfazer-se, direta ou indiretamente ou
por verificação independente, que o programa de software neste caso não tem um enviesamento
inaceitável por motivos de raça ou sexo", uma violação do dever de igualdade do setor público [58].
O artefato em falta era um teste de enviesamento que o responsável pela implantação possuía.

### Medidas de justiça que a lei reconhece

A lei não escolhe uma única métrica de justiça, mas vários dos seus testes são quantitativos. Cada
um mapeia para uma avaliação e um registo.

| Teste legal | O que pergunta | Avaliação (camada 03) | Registo de evidência (camada 05) |
|---|---|---|---|
| Regra dos quatro quintos (procedimentos de seleção dos EUA) | Uma taxa de seleção abaixo de 80% da do grupo mais elevado é geralmente evidência de impacto adverso; lacunas menores ainda podem contar [59] | Rácio de impacto adverso por grupo, com tamanhos de amostra e um teste de significância | Resultado de avaliação assinado por versão de modelo, na ficha de modelo |
| Impacto discriminatório do Título VII | Impacto causado por uma prática; necessidade comercial; alternativa menos discriminatória [38] | Métricas de impacto; validação de relevância para o trabalho; busca entre modelos candidatos | Registo de alternativas consideradas e por que cada uma foi rejeitada |
| Lei Local 144 de Nova Iorque | Rácios de impacto por sexo, raça e etnia, e categorias interseccionais, por um auditor independente [46] | O mesmo cálculo em dados históricos ou de teste | Resumo de auditoria publicado com a sua data; registo de notificação de candidatos |
| Discriminação indireta da UE | Desvantagem particular; justificação objetiva; meios apropriados e necessários [39] | Métricas de disparidade de grupo mais uma análise de necessidade | Secção de justificação na [FRIA](/patterns/fria-as-code) ou AIPD |
| Ação adversa (ECOA, FCRA) | Razões principais específicas para a decisão [50] [52] | Teste de fidelidade de código de razão contra o modelo | Resultado de avaliação de código de razão e versão do modelo de aviso |
| CCD2 Art. 18(8) | Explicação, intervenção humana e revisão [53] | [Artefato de explicação](/patterns/explanation-artefact) por versão de modelo | Registo de revisão com resultado e revisor |

A regra dos quatro quintos é uma regra prática para agências de aplicação da lei, não um porto
seguro [59]. Trate uma proporção de impacto acima de 0,8 como aprovação de uma verificação, não como
prova de conformidade legal. O capítulo 16 calcula e reporta com contagens e intervalos
([impacto desproporcional e a regra dos quatro quintos](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio)).

> **Na prática (ilustrativo)**
> Uma equipa de recrutamento implementou um modelo de classificação de fornecedores em Nova Iorque e
> dois países da UE. A auditoria de enviesamento do fornecedor tinha um ano e foi calculada em dados
> de outro cliente. A equipa recalculou as proporções de impacto no seu próprio fluxo de candidatos
> mensalmente, como uma avaliação de pipeline com um limite de 0,8 que alertava o proprietário. No
> terceiro mês uma categoria interseccional caiu para 0,71; a causa foi uma nova funcionalidade
> "anos de experiência contínua" que penalizava interrupções de carreira. A funcionalidade foi
> removida, o registo de pesquisa registou as alternativas testadas, e um resumo de auditoria
> atualizado foi publicado antes da próxima ronda.

## Proteção do consumidor

A lei de proteção do consumidor atinge a IA por três portas, sem nenhum estatuto específico de IA: o
que afirma sobre o sistema, como a sua interface trata as pessoas, e o que faz com os seus dados. O
que um chatbot diz a um cliente vincula o negócio que o implementou:
[Moffatt v. Air Canada](/cases/moffatt-v-air-canada) é o caso documentado como análise post-mortem.

### ### Práticas injustas e enganosas nos Estados Unidos

A secção 5 da Lei da FTC proíbe atos ou práticas injustos ou enganosos. Uma prática é injusta apenas
se causa ou é provável que cause "lesão substancial aos consumidores que não é razoavelmente
evitável pelos próprios consumidores e não é compensada por benefícios contrabalançadores" [60].
Engano, na declaração de política de 1983 da FTC, é uma representação, omissão ou prática que é
provável que induza em erro um consumidor que age razoavelmente e é material [61]. Uma afirmação de
desempenho de IA sem evidência por trás é enganosa exatamente neste sentido [62].

- **Afirmações de desempenho não fundamentadas.** A Workado afirmou que o seu detetor de conteúdo de
  IA tinha 98% de precisão; testes colocaram a precisão em conteúdo de uso geral em 53%, porque o
  modelo foi treinado em texto académico. A ordem exige evidência competente e fiável para tais
  afirmações [62]. A operação de varredura de setembro de 2024, Operation AI Comply, visou um
  serviço de "advogado robô" entre outros [1].
- **Implementação sem salvaguardas razoáveis.** A Rite Aid é proibida por cinco anos de usar
  reconhecimento facial para segurança ou vigilância, depois que a FTC alegou que implementou a
  tecnologia sem procedimentos razoáveis para prevenir danos aos consumidores [63].
- **Restituição algorítmica.** Quando uma empresa treina em dados que obteve ilicitamente, o remédio
  pode atingir o modelo. A ordem Everalbum define "Affected Work Product" como "quaisquer modelos ou
  algoritmos desenvolvidos no todo ou em parte usando" os dados biométricos, e exige a sua
  eliminação dentro de 90 dias com uma declaração sob juramento [64].
- **Lavagem de IA.** Em março de 2024 a SEC resolveu com dois consultores de investimento sobre
  afirmações falsas sobre o seu uso de IA, por USD 400.000 em penalidades combinadas [65].
- **Avaliações falsas e bots.** A regra da FTC sobre avaliações de consumidores (16 CFR Part 465)
  proíbe avaliações falsas, incluindo avaliações geradas por IA atribuídas a pessoas que não
  existem, com penalidades civis [66]. A Califórnia torna ilegal usar um bot para enganar uma pessoa
  sobre a sua identidade artificial para vender algo ou influenciar um voto, a menos que o bot seja
  divulgado clara e conspicuamente [67].

As prioridades de aplicação mudam com as administrações; o estatuto e as ordens acima não. Uma
afirmação precisa de evidência quando é feita, e um modelo treinado em dados contaminados pode ser
ordenado destruído.

### ### A UE: UCPD, DSA e o Regulamento da IA

A Diretiva sobre Práticas Comerciais Injustas proíbe práticas que são contrárias à diligência
profissional e distorcem materialmente, ou são provável que distorçam, o comportamento económico do
consumidor médio, julgado da perspetiva de um grupo vulnerável onde é alvo [68]. Desde as alterações
de 2019, a sua lista negra inclui afirmar que as avaliações vêm de utilizadores reais sem passos
razoáveis para verificar, e submeter ou encomendar avaliações falsas [69]. O Regulamento dos
Serviços Digitais acrescenta regras específicas de plataforma: as plataformas online não podem
desenhar interfaces que enganem ou manipulem utilizadores ou prejudiquem as suas decisões livres e
informadas (Art. 25); as plataformas devem explicar os parâmetros principais dos seus sistemas de
recomendação (Art. 27); e a mitigação de risco das plataformas muito grandes inclui marcação
proeminente de media gerada ou manipulada que se assemelha apreciavelmente a pessoas ou eventos
reais (Art. 35(1)(k)) [70]. O Regulamento da IA proíbe sistemas de IA que usam técnicas
manipuladoras ou enganosas, ou exploram vulnerabilidades, para distorcer comportamento de formas que
causam dano significativo (Art. 5(1)(a)–(b)) [71], e exige que as pessoas sejam informadas quando
estão a interagir com um sistema de IA a menos que seja óbvio (Art. 50(1)) [72].

### ### Reino Unido: Lei DMCC

Sob a Lei de Mercados Digitais, Concorrência e Consumidores de 2024, a proibição geral de práticas
comerciais injustas aplicou-se desde 6 de abr de 2025 (s. 225), e as práticas sempre consideradas
injustas incluem avaliações de consumidores falsas e avaliações que ocultam um incentivo (Sch. 20,
para. 13) [73].

| Prática (a partir de 2026-09-24) | Estados Unidos | União Europeia | Reino Unido | Artefato de evidência | Camada |
|---|---|---|---|---|---|
| Afirmação de precisão ou equidade não fundamentada | Lei FTC s. 5; ordem Workado [62] | Cláusula geral UCPD [68] | DMCC s. 225 [73] | [Registo de afirmações](/patterns/claims-substantiation-gate) ligado a execuções de avaliação | 3 · 5 |
| Avaliações falsas geradas por IA | 16 CFR Part 465 [66] | UCPD Anexo I, 23b–23c [69] | DMCC Sch. 20, para. 13 [73] | Política bloqueando geração de avaliações; registo de proveniência | 1 · 4 |
| Bot não divulgado | Cal. BPC s. 17941 [67] | Regulamento da IA Art. 50(1) [72] | Nenhuma regra específica de bot; s. 225 pode aplicar-se [73] | Controlo de divulgação e um teste que o torna | 4 |
| Interface manipuladora ou saída | Lei FTC s. 5 injustiça [60] | DSA Art. 25 [70]; Regulamento da IA Art. 5(1)(a)–(b) [71] | s. 225 [73] | Revisão de interface; avaliação de red-team para manipulação | 3 · 5 |
| Modelo construído em dados obtidos ilicitamente | Eliminação de "Affected Work Product" [64] | Remédios de proteção de dados (capítulo 19) | Remédios de proteção de dados (capítulo 19) | Linhagem do conjunto de dados para cada modelo treinado nele | 2 |

### ### Fundamentação de afirmações e restituição algorítmica

**Um registo de afirmações.** Cada declaração pública sobre precisão, equidade, autonomia ou
capacidade "alimentada por IA" é uma linha: a afirmação, onde aparece, a execução de avaliação que a
suporta, os dados em que foi medida, e a data. A Workado falhou nas duas últimas colunas: a medição
não correspondia à população que a afirmação descrevia [62]. Uma versão de modelo reexecuta a
avaliação e revalida cada afirmação que a cita; uma afirmação obsoleta ou falhada é removida da
cópia. Isto é proposto aqui como um novo padrão, a
[**Porta de Fundamentação de Afirmações**](/patterns/claims-substantiation-gate): uma
[porta de avaliação](/patterns/eval-gate-in-ci) apontada para cópia de marketing.

**Linhagem pronta para eliminação.** Uma ordem para eliminar "modelos ou algoritmos desenvolvidos no
todo ou em parte usando" alguns dados [64] só pode ser cumprida, e provada, se souber quais modelos
tocaram os dados. Isto é um [AIBOM](/patterns/aibom) com linhagem de conjunto de dados até à versão,
mais o [registo de direitos de dados de treino](/patterns/training-data-rights-ledger). Sem isto, a
única resposta segura a uma ordem de restituição é eliminar tudo.

## Responsabilidade por produtos

A responsabilidade do produto pergunta se um produto era defeituoso e se o defeito causou o dano.
Para IA as novas questões são se o software é um produto, quem o controla depois de ser enviado, e o
que é um defeito em algo que aprende e atualiza.

### ### Diretiva da UE sobre Responsabilidade do Produto

A Diretiva revista sobre Responsabilidade do Produto, (UE) 2024/2853, foi adotada em 23 de out de
2024 e publicada em 18 de nov de 2024. Os Estados-Membros devem transpô-la até 9 de dez de 2026, e
aplica-se aos produtos colocados no mercado ou colocados em serviço após essa data [2]. Os seus
principais movimentos para IA:

- **O software é um produto** (Art. 4(1)); os considerandos nomeiam IA entre as razões para a
  revisão, e o software livre e de código aberto fornecido fora de uma atividade comercial é
  excluído (Art. 2(2)) [2].
- **O defeito é julgado com aprendizagem e atualizações em vista.** Os fatores incluem "o efeito no
  produto de qualquer capacidade de continuar a aprender ou adquirir novas funcionalidades depois de
  ser colocado no mercado", requisitos de segurança relevantes incluindo cibersegurança, e o momento
  em que o produto saiu do controlo do fabricante (Art. 7(2)) [2]. O controlo continua enquanto o
  fabricante pode fornecer atualizações de software (Art. 4(5)) [2].
- **As atualizações reabrem o processo.** A defesa de que um defeito surgiu após colocação no
  mercado não se aplica quando, dentro do controlo do fabricante, o defeito é devido ao software ou
  suas atualizações, uma atualização de segurança em falta, ou uma modificação substancial (Art.
  11(2)) [2]. Quem modifica substancialmente um produto fora do controlo do fabricante torna-se seu
  fabricante (Art. 8(2)) [2].
- **Divulgação e presunções.** Um tribunal pode ordenar ao réu que divulgue evidência relevante, com
  proteção para segredos comerciais (Art. 9). O defeito é presumido se o réu não divulgar, se o
  produto violar requisitos de segurança obrigatórios, ou se o dano veio de um mau funcionamento
  óbvio; e um tribunal deve presumir defeito ou causalidade quando o reclamante enfrenta dificuldade
  excessiva, nomeadamente de complexidade técnica ou científica, e mostra que um ou outro é provável
  (Art. 10) [2].
- **Dano e tempo.** O dano compensável cobre morte, lesão pessoal incluindo dano psicológico
  medicamente reconhecido, dano à propriedade e destruição ou corrupção de dados não utilizados para
  fins profissionais (Art. 6). As reclamações expiram 10 anos após colocação no mercado, reiniciando
  de uma modificação substancial, ou 25 anos para lesão pessoal latente (Art. 17) [2].

A proposta paralela da Diretiva de Responsabilidade de IA, que teria facilitado reclamações baseadas
em culpa, foi retirada: anunciada no programa de trabalho de 2025 da Comissão, publicada no Jornal
Oficial em 6 de out de 2025 [74]. As reclamações de IA baseadas em culpa permanecem com a lei de
responsabilidade civil nacional.

### ### Teorias de responsabilidade civil dos Estados Unidos

A responsabilidade do produto nos EUA reconhece três tipos de defeito: defeitos de fabrico em
algumas unidades, defeitos de conceção inerentes ao design, e defeitos de comercialização, que
abrangem instruções inadequadas e falhas em avisar sobre perigos latentes; os tribunais testam
defeitos de conceção pelas expectativas do consumidor, ponderando risco contra utilidade, ou ambos
[75]. Se o software, e um chatbot em particular, é um "produto" é contestado e decidido caso a caso.
Em *Garcia v. Character Technologies*, uma ação por morte injusta sobre uma aplicação de chatbot de
companhia alegada como responsabilidade do produto, o tribunal concedeu em parte e negou em parte as
moções para rejeição em 21 de maio de 2025, e o caso foi resolvido e rejeitado sem prejuízo em 7 de
janeiro de 2026 [76]; relatórios indicam que teorias de responsabilidade do produto sobreviveram
contra a própria sentença (verificar).

### A revisão da responsabilidade do produto no Reino Unido

A Law Commission está a rever o regime da Lei de Proteção do Consumidor de 1987, incluindo
expressamente produtos digitais e IA; os termos de referência foram publicados em 8 de dezembro de
2025 e uma consulta está planeada para a segunda metade de 2026 [77].

### Tipos de defeito mapeados para modos de falha de IA

Cada categoria legal mapeia para modos de falha de engenharia e um artefato que mostra se ocorreram.

| Tipo de defeito | O que significa para um sistema de IA | Evidência que responde a isto | Camada |
|---|---|---|---|
| Fabrico | O sistema implantado afasta-se do seu próprio design: versão de modelo errada, pesos corrompidos, guardrail mal configurado, pipeline de dados quebrado | AIBOM com hashes; registo de implantação assinado; alertas de desvio de configuração | 2 · 4 · 5 |
| Conceção | O próprio design é inseguro para um uso previsível, e uma alternativa mais segura estava razoavelmente disponível: condições operacionais não testadas, sem guardrail, sem supervisão humana onde necessária | FMEA; matriz de cobertura de avaliação; resultados de red team; revisão de design com alternativas consideradas | 1 · 3 |
| Aviso (comercialização) | Os limites conhecidos e utilizações fora do âmbito não foram divulgados | [Ficha de modelo](/patterns/model-card-as-control-evidence); instruções de utilização; avisos no produto, todos versionados | 2 · 5 |
| Atualização (Art. 11(2) da UE) | Uma atualização introduziu o defeito, ou uma atualização de segurança que era necessária não foi entregue | Registo de alterações; avaliações de regressão por lançamento; registos de decisão de correção | 3 · 4 · 5 |

### Dever de avisar após atualizações

Uma atualização de modelo é um novo lançamento. Sob o regime da UE o fabricante responde por
defeitos que as atualizações causam, ou que uma atualização de segurança em falta deixa no lugar,
enquanto o sistema está sob seu controlo [2]; as teorias de falha em avisar dos EUA chegam ao mesmo
ponto [75]. Assim os avisos viajam com versões: a ficha de modelo e as instruções de utilização
regeneram em cada lançamento, as notas de lançamento listam limitações conhecidas e comportamento
alterado, e a monitorização de campo alimenta o
[Pipeline de Incidentes](/patterns/incident-pipeline), para que um novo perigo produza uma decisão
(correção, aviso, retirada) com um proprietário e uma data (capítulo
[17](/bok/incidents#the-response-lifecycle)).

### O ficheiro de defesa

Um ficheiro de defesa por lançamento de produto contém:

- uma **análise de modo de falha e efeitos** na forma que a norma IEC 60812 descreve, com modos de
  falha de IA (desvio de distribuição, injeção de prompts, factos alucinados, utilização insegura de
  ferramentas) como linhas [78];
- o **AIBOM** para o lançamento, com hashes de modelo, dataset e dependência;
- o **histórico de avaliação**: cada resultado de gate para esta e versões anteriores, incluindo
  falhas e as correções que se seguiram;
- **registos de tempo de execução assinados** para as decisões em questão, retidos pelo período de
  reclamação;
- os **avisos como entregues**: ficha de modelo, instruções de utilização e avisos no produto nessa
  versão.

O ficheiro corta dos dois lados: um reclamante pode obter divulgação, e uma lacuna pode ela própria
levantar uma presunção de defeito [2]. Mantenha-o completo e recuperável durante pelo menos o
período de validade de 10 anos [2]; como
[evidência legível por máquina](/patterns/machine-readable-evidence-oscal), a divulgação torna-se
uma consulta em vez de um projeto.

## Falsificações profundas e media sintético

O media sintético situa-se entre proteção do consumidor, privacidade e direito penal. Três regimes
estabelecem o mínimo.

- **União Europeia.** Os prestadores de sistemas generativos devem marcar saídas de forma legível
  por máquina e detetável (Art. 50(2) do Regulamento da IA), e os responsáveis pela implantação
  devem divulgar falsificações profundas, com regras mais leves para trabalho evidentemente
  artístico, satírico ou ficcional (Art. 50(4)) [72]. O Artigo 50 aplica-se desde 2 de agosto de
  2026 [79], com um período de graça de marcação até 2 de dezembro de 2026 para sistemas generativos
  colocados no mercado antes de 2 de agosto de 2026 (Art. 111(4)) [43]. O Omnibus Digital também
  adicionou uma proibição visando a geração de IA de imagens íntimas não consentidas e material de
  abuso sexual infantil, aplicando-se a partir de 2 de dezembro de 2026 [43]. Plataformas muito
  grandes devem marcar media gerado ou manipulado de forma proeminente como parte da sua mitigação
  de risco da DSA [70].
- **Estados Unidos.** A Lei TAKE IT DOWN (Lei Pública 119-12, 19 de maio de 2025) torna crime
  federal publicar conscientemente imagens íntimas não consentidas, incluindo "falsificações
  digitais", e exige que plataformas cobertas executem um processo de notificação e remoção (dentro
  de um ano da promulgação) que remova conteúdo reportado dentro de 48 horas, aplicado pela FTC
  [80]. As leis estaduais sobre falsificações profundas e semelhança variam (verificar os estados
  relevantes para cada implantação).
- **Reino Unido.** Partilhar uma fotografia ou filme íntimo que "mostre, ou pareça mostrar" outra
  pessoa sem consentimento é uma ofensa desde 31 de janeiro de 2024 [81], e a Lei de Dados
  (Utilização e Acesso) de 2025 adicionou uma ofensa de criar uma imagem íntima alegada de um adulto
  [82].

Os artefatos são marcação de proveniência no ponto de geração (por exemplo credenciais de conteúdo
ou marcas de água, camada 04), uma avaliação de deteção para a sobrevivência da marcação através de
transformações comuns (camada 03), e um caminho de retirada com um relógio de 48 horas, um
proprietário e um registo (camada 05, construído no
[Pipeline de Incidentes](/patterns/incident-pipeline)).

## Um modelo de contratação através de cinco corpos de lei

Um único sistema geralmente responde a vários destes corpos de lei ao mesmo tempo, portanto seus
artefatos devem partilhar um id de registo.

> **Exemplo (ilustrativo)**
> Um empregador em Nova Iorque e na UE implanta um modelo de um prestador que classifica candidatos
> para entrevistas. Uma entrada de registo responde a cinco questões legais.

| Corpo de legislação | A questão para este sistema | Artefato, chaveado ao id do registo | Camada |
|---|---|---|---|
| Regulamento da IA (capítulo [18](/bok/eu-ai-act#deployer-duties-article-26)) | Anexo III ponto 4 alto risco: os deveres do responsável pela implantação são cumpridos, e o prestador forneceu sua evidência? [47] | Entrada de registo com papel (responsável pela implantação); documentação do prestador recolhida no gate de due diligence; design de supervisão humana | 2 · 5 |
| Proteção de dados (capítulo [19](/bok/privacy-and-ai#automated-decision-making)) | O processamento é lícito e as decisões automatizadas são salvaguardadas? | AIPD; aviso ao candidato; caminho de revisão | 1 · 5 |
| Não-discriminação | Existe impacto adverso, a prática é justificada, e foram procuradas alternativas? [38] [45] [39] | Avaliação de rácio de impacto mensal; resumo de auditoria publicado; registo de pesquisa | 3 · 5 |
| Proteção do consumidor | A alegação "sem enviesamento" do prestador, repetida nos nossos materiais de candidato, é substantivada? [62] | Linha de registo de reclamações citando nossa própria execução de avaliação, não o folheto do prestador | 3 · 5 |
| Responsabilidade por produtos | É a diretiva o caminho para um candidato rejeitado? | Geralmente não: seus danos (lesão, propriedade, dados) não incluem discriminação [2], portanto a exposição corre através da lei de igualdade e contrato | 5 |

A última linha é a surpresa útil: para um modelo de contratação a lei que morde é igualdade e
proteção de dados, não responsabilidade do produto; para um assistente de triagem médica o
equilíbrio inverte-se. Escrevendo esta tabela por sistema, antes de construir controlos, decide onde
vai o orçamento de evidência.

## O que pode fazer esta semana

1. **Adicione quatro campos à ficha de dados de cada dataset**: fonte, canal de aquisição, licença,
   e o resultado e data da verificação de reserva de TDM. Falhe o pipeline quando algum estiver
   vazio.
2. **Procure na sua cópia pública** (website, decks de vendas, fichas de modelo) por alegações
   numéricas ou absolutas como "99% preciso", "sem enviesamento" ou "totalmente autónomo". Ligue
   cada uma a um id de execução de avaliação, ou remova-a.
3. **Calcule rácios de impacto adverso por grupo** para cada modelo de seleção, elegibilidade ou
   preço que execute, com tamanhos de amostra, e armazene-os na ficha de modelo para a versão atual.
4. **Coloque uma regra de prevenção de perda de dados em frente a cada endpoint de modelo externo**
   para segredos e código-fonte, e registe quais prestadores têm termos de sem treino e retenção.
5. **Abra um ficheiro de defesa para seu próximo lançamento de IA**: AIBOM com hashes, histórico de
   avaliação, uma FMEA, as instruções de utilização e as notas de lançamento, com um período de
   retenção de pelo menos 10 anos.

**Correspondências:** Art. 4a, 5, 50, 53(1)(c)–(d) do Regulamento da IA da UE, Anexo III pontos 4–5
· Arts. 3–4 da Diretiva DSM · PLD (UE) 2024/2853 · Diretiva de Trabalho em Plataforma (UE) 2024/2831
· Art. 18 da CCD2 · UCPD · Arts. 25, 27, 35 da DSA · s. 5 da Lei FTC · s. 703(k) do Título VII · 29
CFR 1607.4(D) · Regulamento B · NYC LL144 · Lei TAKE IT DOWN · Lei DMCC 2024 · todas as cinco
camadas do stack (capítulo 04). Os mapeamentos são ilustrativos, não uma alegação de conformidade.

## Sources

[1] "FTC Announces Crackdown on Deceptive AI Claims and Schemes" (Operation AI Comply; "there is no AI exemption from the laws on the books"; DoNotPay "robot lawyer" proposed order). Federal Trade Commission. 2024-09-25. https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes (verified: primary)
[2] Directive (EU) 2024/2853 on liability for defective products (Art. 2 scope and FOSS exclusion; Art. 4 software as a product and manufacturer's control; Art. 6 damage; Art. 7 defectiveness incl. ability to continue to learn; Art. 8(2) substantial modification; Art. 9 disclosure; Art. 10 presumptions; Art. 11(2) updates; Art. 17 expiry; Art. 22 transposition by 9 Dec 2026; OJ L 18 Nov 2024). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2853/oj (verified: primary)
[3] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market, Arts. 3 and 4 (TDM for scientific research; general TDM exception subject to a reservation "in an appropriate manner, such as machine-readable means"). Official Journal of the EU. 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53 (GPAI providers: 53(1)(c) copyright policy honouring Art. 4(3) DSM reservations; 53(1)(d) public summary of training content; 53(2) open-source relief limited to points (a) and (b), not for systemic-risk models). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[5] "Commission presents template for General-Purpose AI model providers to summarise the data used to train their model" (template for the Art. 53(1)(d) public summary). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/news/commission-presents-template-general-purpose-ai-model-providers-summarise-data-used-train-their (verified: primary)
[6] GPAI Code of Practice, Copyright chapter (Measures 1.1 to 1.5: copyright policy; lawful access without circumventing effective technological measures and excluding persistently infringing sites; robots.txt compliance; safeguards against infringing outputs; point of contact and complaints). Code of Practice text as published 10 Jul 2025. 2025-07-10. https://code-of-practice.ai/?section=copyright (verified: secondary)
[7] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[8] "German court rules in favour of music rights management organisation against OpenAI" (GEMA v. OpenAI, Munich Regional Court I, 11 Nov 2025; memorisation in model parameters as reproduction; TDM exception limited to preparatory copies; decision open to appeal). European Commission, European IP Helpdesk. 2025-11-14. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/german-court-rules-favour-music-rights-management-organisation-against-openai-nyt-vs-openai-dispute-2025-11-14_en (verified: secondary)
[9] "CJEU Grand Chamber rules on music sampling and pastiche; first CJEU hearing on generative AI and copyright: Like Company v Google" (C-250/25; hearing 10 Mar 2026; questions on reproduction in training, DSM Art. 4 and chatbot outputs; Advocate General opinion scheduled for 3 Sep 2026). European Commission, European IP Helpdesk. 2026-04-24. https://intellectual-property-helpdesk.ec.europa.eu/news-events/news/cjeu-grand-chamber-rules-music-sampling-and-pastiche-first-cjeu-hearing-generative-ai-and-copyright-2026-04-24_en (verified: secondary)
[10] 17 U.S.C. § 107, Limitations on exclusive rights: fair use (the four factors). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title17/html/USCODE-2024-title17-chap1-sec107.htm (verified: primary)
[11] Copyright, Designs and Patents Act 1988, s. 29A (copies for text and data analysis for non-commercial research) and s. 9(3) (author of a computer-generated work). legislation.gov.uk. current. https://www.legislation.gov.uk/ukpga/1988/48/section/29A (verified: primary)
[12] Report and Impact Assessment on Copyright and Artificial Intelligence (published under ss. 135 and 136 of the Data (Use and Access) Act 2025). UK Government, GOV.UK. 2026-03-18. https://www.gov.uk/government/publications/report-and-impact-assessment-on-copyright-and-artificial-intelligence (verified: primary)
[13] "Copyright and artificial intelligence: analysing the UK government's March 2026 reports" (opt-out TDM exception previously favoured not taken forward; further evidence to be gathered; input transparency through best practice rather than statute). VWV. 2026-03. https://www.vwv.co.uk/insights/articles/copyright-and-artificial-intelligence-analysing-the-uk-governments-march-2026-reports (verified: secondary)
[14] "High Court grants permission to appeal in Getty Images v Stability AI" (secondary infringement and the meaning of "infringing copy" for an AI model; Stability refused permission on the trade mark findings). Wiggin LLP. 2026-01. https://www.wiggin.co.uk/insight/high-court-grants-permission-to-appeal-in-getty-images-v-stability-ai/ (verified: secondary)
[15] "General Understanding on AI and Copyright in Japan": Overview (Art. 30-4 non-enjoyment purpose and its proviso; fine-tuning and RAG that output training expression fall outside Art. 30-4; database works and robots.txt; not legally binding). Japan Copyright Office, Agency for Cultural Affairs. 2024-05. https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf (verified: primary)
[16] Thomson Reuters Enterprise Centre GmbH v. ROSS Intelligence Inc., No. 1:20-cv-00613 (D. Del.), Memorandum Opinion (Bibas, J.). CourtListener (court docket). 2025-02-11. https://www.courtlistener.com/docket/17131648/thomson-reuters-enterprise-centre-gmbh-v-ross-intelligence-inc/ (verified: primary)
[17] "Third Circuit Hears Oral Argument in Ross v. Reuters AI Training Copyright Case" (No. 25-2153; argued 11 Jun 2026; first federal appeal on fair use in AI training). Baker Botts. 2026-07. https://www.bakerbotts.com/thought-leadership/publications/2026/july/third-circuit-hears-oral-argument (verified: secondary)
[18] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[19] "Court Grants Final Approval of $1.5 Billion Anthropic Copyright Settlement" (release limited to past acquisition and copying through 25 Aug 2025; output claims preserved). The Authors Guild. 2026-07. https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/ (verified: secondary)
[20] Kadrey v. Meta Platforms, Inc., No. 3:23-cv-03417 (N.D. Cal.), Order denying the plaintiffs' motion and granting Meta's cross-motion for partial summary judgment (Chhabria, J., ECF 598). CourtListener (court docket). 2025-06-25. https://www.courtlistener.com/docket/67569326/kadrey-v-meta-platforms-inc/ (verified: primary)
[21] "DOJ urges judge to rule for OpenAI, Microsoft in N.Y. Times lawsuit" (summary-judgment stage; first US government position on AI-training copyright litigation). The Washington Post. 2026-09-02. https://www.washingtonpost.com/technology/2026/09/02/doj-urges-judge-rule-openai-microsoft-ny-times-lawsuit/ (verified: secondary)
[22] Andersen v. Stability AI Ltd., No. 3:23-cv-00201 (N.D. Cal.), Order regarding case schedule (Orrick, J., ECF 597; jury trial reset to 20 Sep 2027). CourtListener (court docket). 2026-06-15. https://www.courtlistener.com/docket/66732129/andersen-v-stability-ai-ltd/ (verified: primary)
[23] Disney Enterprises Inc. v. Midjourney Inc., No. 2:25-cv-05275 (C.D. Cal.), complaint (ECF 1). CourtListener (court docket). 2025-06-11. https://www.courtlistener.com/docket/70513159/disney-enterprises-inc-v-midjourney-inc/ (verified: primary)
[24] Extracting Training Data from Large Language Models (Carlini et al.; verbatim training sequences recovered from GPT-2; larger models more vulnerable; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[25] Thaler v. Perlmutter, No. 23-5233 (human authorship required for copyright registration). US Court of Appeals for the D.C. Circuit. 2025-03-18. https://media.cadc.uscourts.gov/opinions/docs/2025/03/23-5233.pdf (verified: primary)
[26] "Supreme Court Denies Cert in AI Authorship Case" (Thaler v. Perlmutter; certiorari denied 2 Mar 2026). Mayer Brown. 2026-03. https://www.mayerbrown.com/en/insights/publications/2026/03/supreme-court-denies-review-in-ai-authorship-case (verified: secondary)
[27] Copyright and Artificial Intelligence (Part 2, Copyrightability, 29 Jan 2025; Part 3, Generative AI Training, pre-publication version 9 May 2025; registration guidance for works containing AI-generated material, 16 Mar 2023). U.S. Copyright Office. 2025. https://copyright.gov/ai/ (verified: primary)
[28] Directive 96/9/EC on the legal protection of databases, Art. 7 (sui generis right against extraction and re-utilisation of a substantial part). Official Journal of the EU. 1996-03-11. https://eur-lex.europa.eu/eli/dir/1996/9/oj (verified: primary)
[29] Directive (EU) 2016/943 on the protection of undisclosed know-how and business information (trade secrets), Art. 2(1) ("reasonable steps under the circumstances" to keep information secret). Official Journal of the EU. 2016-06-08. https://eur-lex.europa.eu/eli/dir/2016/943/oj (verified: primary)
[30] 18 U.S.C. § 1839(3) (trade secret: the owner "has taken reasonable measures to keep such information secret"). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title18/html/USCODE-2024-title18-partI-chap90-sec1839.htm (verified: primary)
[31] Thaler v. Vidal, No. 2021-2347 (inventors under the Patent Act must be natural persons). US Court of Appeals for the Federal Circuit. 2022-08-05. https://cafc.uscourts.gov/opinions-orders/21-2347.OPINION.8-5-2022_1988142.pdf (verified: primary)
[32] Thaler v Comptroller-General of Patents, Designs and Trade Marks [2023] UKSC 49 (DABUS cannot be an inventor under the Patents Act 1977). UK Supreme Court. 2023-12-20. https://www.supremecourt.uk/cases/uksc-2021-0201 (verified: primary)
[33] J 8/20 (DABUS; "A machine is not an inventor within the meaning of the EPC"). EPO Legal Board of Appeal. 2021-12-21. https://www.epo.org/en/boards-of-appeal/decisions/j200008eu1 (verified: primary)
[34] Revised Inventorship Guidance for AI-Assisted Inventions, 90 FR 54636 (rescinds the 13 Feb 2024 guidance; AI as a tool; ordinary conception standard). USPTO, Federal Register. 2025-11-28. https://www.federalregister.gov/documents/2025/11/28/2025-21457/revised-inventorship-guidance-for-ai-assisted-inventions (verified: primary)
[35] Llama 3.1 Community License Agreement (Acceptable Use Policy incorporated; separate licence required above 700 million monthly active users on the release date). Meta. 2024-07-23. https://github.com/meta-llama/llama-models/blob/main/models/llama3_1/LICENSE (verified: primary)
[36] The Open Source AI Definition 1.0 (use, study, modify, share; preferred form for modification: data information, code and parameters). Open Source Initiative. 2024-10. https://opensource.org/ai/open-source-ai-definition (verified: primary)
[37] "Microsoft announces new Copilot Copyright Commitment for customers" (defence and payment of adverse judgments; conditional on using built-in guardrails and content filters and not attempting to generate infringing material). Microsoft On the Issues. 2023-09-07. https://blogs.microsoft.com/on-the-issues/2023/09/07/copilot-copyright-commitment-ai-legal-concerns/ (verified: primary)
[38] 42 U.S.C. § 2000e-2(k) (Title VII s. 703(k): burden of proof in disparate-impact cases; business necessity; alternative employment practice). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[39] Council Directive 2000/43/EC implementing the principle of equal treatment irrespective of racial or ethnic origin, Art. 2(2)(b) (indirect discrimination; objective justification) and Art. 3(1)(h) (goods and services, including housing). Official Journal of the EU. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj (verified: primary)
[40] Council Directive 2000/78/EC establishing a general framework for equal treatment in employment and occupation. Official Journal of the EU. 2000-11-27. https://eur-lex.europa.eu/eli/dir/2000/78/oj (verified: primary)
[41] Executive Order 14281, Restoring Equality of Opportunity and Meritocracy (s. 4: agencies to deprioritise enforcement of disparate-impact liability; FR Doc. 2025-07378). The White House, via GovInfo (Federal Register). 2025-04-23. https://www.govinfo.gov/content/pkg/FR-2025-04-28/html/2025-07378.htm (verified: primary)
[42] HUD's Implementation of the Fair Housing Act's Disparate Impact Standard: proposed rule (FR Doc. 2026-00590, 14 Jan 2026) and supplemental proposed rule (FR Doc. 2026-16228; comments due 9 Oct 2026). US Department of Housing and Urban Development, Federal Register. 2026-08-10. https://www.federalregister.gov/documents/2026/08/10/2026-16228/huds-implementation-of-the-fair-housing-acts-disparate-impact-standard-amendments-to-huds-title-vi (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, as amended by Regulation (EU) 2026/1744 (Art. 4a special-category data for bias detection in high-risk systems; Art. 5(1)(ba) and (bb) prohibitions on NCII and CSAM generation, applying from 2 Dec 2026 under Art. 113(a); Art. 111(4): Art. 50(2) marking deadline of 2 Dec 2026 for generative systems placed on the market before 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[44] Mobley v. Workday, Inc., No. 3:23-cv-00770 (N.D. Cal.), Order granting preliminary collective certification (Lin, J., ECF 128). CourtListener (court docket). 2025-05-16. https://www.courtlistener.com/docket/66831340/mobley-v-workday-inc/ (verified: primary)
[45] Automated Employment Decision Tools (Local Law 144 of 2021 and 6 RCNY 5-300: bias audit within one year before use, published summary, notice 10 business days before use; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[46] Automated Employment Decision Tools: Frequently Asked Questions (bias audit by an independent third party; selection rates and impact ratios by sex, race/ethnicity and intersectional categories). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[47] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, points 4 and 5 (employment, workers management; public assistance eligibility; creditworthiness, fraud detection excepted; risk assessment and pricing in life and health insurance). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[48] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 27 Jul 2026; Annex III high-risk obligations from 2 Dec 2027). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[49] Directive (EU) 2024/2831 on improving working conditions in platform work, Arts. 7 (limits on processing), 9 (transparency), 10 (human oversight), 11 (human review) and 29 (transposition by 2 Dec 2026). Official Journal of the EU. 2024-10-23. https://eur-lex.europa.eu/eli/dir/2024/2831/oj (verified: primary)
[50] 12 CFR § 1002.9 (Regulation B notifications: statement of specific reasons for adverse action). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[51] Circular 2022-03: Adverse action notification requirements in connection with credit decisions based on complex algorithms (withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14; the circular's page carries no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[52] 15 U.S.C. § 1681m(a) (FCRA duties of users taking adverse action on the basis of consumer reports). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII-sec1681m.htm (verified: primary)
[53] Directive (EU) 2023/2225 on credit agreements for consumers, Art. 18 (creditworthiness assessment; 18(3) no special-category data, social networks not an external source; 18(8) human intervention and explanation) and Art. 48 (adopt by 20 Nov 2025, apply from 20 Nov 2026). Official Journal of the EU. 2023-10-18. https://eur-lex.europa.eu/eli/dir/2023/2225/oj (verified: primary)
[54] "Justice Department Secures Groundbreaking Settlement Agreement with Meta Platforms, Formerly Known as Facebook, to Resolve Allegations of Discriminatory Advertising" (Fair Housing Act; Special Ad Audience discontinued; Variance Reduction System for housing ads). US Department of Justice. 2022-06-21. https://www.justice.gov/opa/pr/justice-department-secures-groundbreaking-settlement-agreement-meta-platforms-formerly-known (verified: primary)
[55] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 6 Jul 2021; risk-management framework, assessment and monitoring, chief risk officer attestation; rules by insurance practice). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[56] NAIC Model Bulletin: Use of Artificial Intelligence Systems by Insurers (written AIS Program; third-party AI systems and data; adopted 4 Dec 2023). National Association of Insurance Commissioners. 2023-12-04. https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf (verified: primary)
[57] Case C-236/09, Association Belge des Consommateurs Test-Achats (Art. 5(2) of Directive 2004/113/EC invalid with effect from 21 Dec 2012). Court of Justice of the EU. 2011-03-01. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62009CJ0236 (verified: primary)
[58] R (Bridges) v Chief Constable of South Wales Police [2020] EWCA Civ 1058 (public sector equality duty; no verification that facial recognition software lacked unacceptable race or sex bias). Court of Appeal (Civil Division), Courts and Tribunals Judiciary. 2020-08-11. https://www.judiciary.uk/wp-content/uploads/2020/08/R-Bridges-v-CC-South-Wales-ors-Judgment.pdf (verified: primary)
[59] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures (adverse impact and the "four-fifths rule"). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[60] 15 U.S.C. § 45(n) (FTC Act s. 5: standard for unfairness). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap2-subchapI-sec45.htm (verified: primary)
[61] FTC Policy Statement on Deception (representation, omission or practice likely to mislead a consumer acting reasonably; materiality). Federal Trade Commission. 1983-10-14. https://www.ftc.gov/legal-library/browse/ftc-policy-statement-deception (verified: primary)
[62] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (claimed 98% accuracy; 53% on general-purpose content; competent and reliable evidence required). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[63] FTC v. Rite Aid Corporation, No. 2:23-cv-5023 (E.D. Pa.) (five-year ban on facial recognition for security or surveillance; stipulated order approved 8 Mar 2024). Federal Trade Commission, case page. 2024-03-08. https://www.ftc.gov/legal-library/browse/cases-proceedings/2023190-rite-aid-corporation-ftc-v (verified: primary)
[64] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[65] "SEC Charges Two Investment Advisers with Making False and Misleading Statements About Their Use of Artificial Intelligence" (Delphia and Global Predictions; USD 400,000 combined penalties). US Securities and Exchange Commission. 2024-03-18. https://www.sec.gov/newsroom/press-releases/2024-36 (verified: primary)
[66] "Federal Trade Commission Announces Final Rule Banning Fake Reviews and Testimonials" (16 CFR Part 465; covers AI-generated fake reviews; civil penalties for knowing violations). Federal Trade Commission. 2024-08-14. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials (verified: primary)
[67] California Business and Professions Code ss. 17940 to 17943 (bot disclosure: unlawful to use a bot to mislead about its artificial identity to incentivise a sale or influence a vote, unless clearly and conspicuously disclosed; in force 1 Jul 2019). California Legislative Information. 2019. https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=BPC&division=7.&title=&part=3.&chapter=6.&article= (verified: primary)
[68] Directive 2005/29/EC (Unfair Commercial Practices Directive), Art. 5 (general prohibition; professional diligence; average and vulnerable consumer). Official Journal of the EU. 2005-05-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj (verified: primary)
[69] Directive (EU) 2019/2161 (better enforcement and modernisation of EU consumer protection rules), adding UCPD Annex I points 23b and 23c (consumer reviews). Official Journal of the EU. 2019-11-27. https://eur-lex.europa.eu/eli/dir/2019/2161/oj (verified: primary)
[70] Regulation (EU) 2022/2065 (Digital Services Act), Arts. 25 (online interface design and organisation), 27 (recommender system transparency) and 35(1)(k) (prominent marking of generated or manipulated media). Official Journal of the EU. 2022-10-19. https://eur-lex.europa.eu/eli/reg/2022/2065/oj (verified: primary)
[71] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(a) and (b) (manipulative or deceptive techniques; exploitation of vulnerabilities). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[72] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 50 (disclosure of AI interaction; machine-readable marking of synthetic content; deployer disclosure of deep fakes). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_50 (verified: primary)
[73] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 Apr 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[74] AI Liability Directive, Legislative Train Schedule (withdrawal announced in the Commission 2025 work programme; withdrawal published OJ C/2025/5423, 6 Oct 2025). European Parliament. 2026-08. https://www.europarl.europa.eu/legislative-train/theme-a-europe-fit-for-the-digital-age/file-ai-liability-directive (verified: secondary)
[75] "Products liability" (design, manufacturing and marketing defects, including failure to warn; consumer-expectation and risk-utility tests). Legal Information Institute, Wex. current. https://www.law.cornell.edu/wex/products_liability (verified: secondary)
[76] Garcia v. Character Technologies, Inc., No. 6:24-cv-01903 (M.D. Fla.): order granting in part and denying in part motions to dismiss (ECF 115, 21 May 2025); notice of resolution and order dismissing without prejudice (ECF 242 and 244, 7 Jan 2026). CourtListener (court docket). 2026-01-07. https://www.courtlistener.com/docket/69300919/garcia-v-character-technologies-inc/ (verified: primary)
[77] Product liability (review of the regime, including digital products and AI; terms of reference 8 Dec 2025; consultation planned for the second half of 2026). Law Commission of England and Wales. 2025-12. https://lawcom.gov.uk/project/product-liability/ (verified: primary)
[78] IEC 60812:2018, Failure modes and effects analysis (FMEA and FMECA), edition 3.0. International Electrotechnical Commission. 2018-08-10. https://webstore.iec.ch/en/publication/26359 (verified: primary)
[79] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[80] TAKE IT DOWN Act, Public Law 119-12 (S. 146) (knowing publication of intimate images incl. digital forgeries; notice-and-removal process within one year of enactment; removal within 48 hours; FTC enforcement). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[81] Sexual Offences Act 2003, s. 66B (sharing or threatening to share a photograph or film which "shows, or appears to show" another person in an intimate state; in force 31 Jan 2024). legislation.gov.uk. 2024-01-31. https://www.legislation.gov.uk/ukpga/2003/42/section/66B (verified: primary)
[82] Data (Use and Access) Act 2025, s. 138 (inserts Sexual Offences Act 2003 s. 66E, creating a purported intimate image of an adult). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/138 (verified: primary)
[83] Equal Credit Opportunity Act (Regulation B): final rule (ECOA does not authorize disparate-impact liability, the effects test; amends 12 CFR 1002.4, 1002.6, 1002.8 and 1002.15 and Supplement I, not 1002.9; 91 FR 21620, FR Doc. 2026-07804; effective 2026-07-21). Consumer Financial Protection Bureau, Federal Register. 2026-04-22. https://www.federalregister.gov/documents/2026/04/22/2026-07804/equal-credit-opportunity-act-regulation-b (verified: primary)
[84] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
