---
lang: pt
source: bok/19-privacy-and-ai.md
sourceHash: "b4edeb76a673fe200699b6e6830e31e975325b921be2a2968fbf303a0af74e72"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 19. Lei de privacidade e proteção de dados aplicada à IA

> A lei de proteção de dados já vincula cada sistema de IA que toca dados pessoais; este capítulo
> transforma os seus deveres para treino, inferência, direitos e violações em artefatos, camadas do
> stack e evidência.

A lei de privacidade foi a primeira lei de IA. O RGPD aplica-se desde 25 de maio de 2018 a qualquer
tratamento de dados pessoais, e um modelo treinado em, recuperando de ou decidindo sobre pessoas
trata dados pessoais em vários pontos da sua vida {[1]}. O Regulamento da IA adiciona deveres sem
deslocar a proteção de dados, e diz-o no seu próprio texto {[2]}. Os deveres de privacidade
geralmente chegam primeiro, têm multas até EUR 20 milhões ou 4% do volume de negócios anual mundial
por violações dos princípios fundamentais {[1]}, e alcançam sistemas que o Regulamento da IA nunca
classifica como de alto risco.

O RGPD é a espinha aqui, com contrastes breves com o UK GDPR, as leis dos estados dos EUA, a LGPD do
Brasil e a PIPL da China. Cada dever resolve-se num **artefato**, uma **camada do stack**
(capítulo 04) e um **registo de evidência** que uma consulta pode devolver. Uma linha de
desambiguação: o encarregado da proteção de dados e o conselho de privacidade decidem se uma base
lícita se mantém; o engenheiro de governação da IA constrói o registo que mostra a decisão, o
controlo que a aplica e o sinal que diz quando deixou de se manter. Esta é tradução de engenharia,
não aconselhamento jurídico.

## Como ler este capítulo

Um sistema de IA trata dados pessoais em mais momentos do que os seus proprietários geralmente
listam, e cada momento é uma operação de tratamento separada com o seu próprio fim, base, retenção e
exposição de direitos. A tabela utiliza o exemplo em execução do capítulo 04, {`csa-01`}, um
assistente de atendimento ao cliente numa grande operadora de telecomunicações, ajustado com base em
transcrições de suporte anteriores, recuperando de notas de conta e chamando um modelo de terceiros.

| Momento de tratamento | Dados pessoais ({`csa-01`}) | O que a lei pede primeiro | Registo de evidência |
|---|---|---|---|
| Recolha para treino | Transcrições históricas | Compatibilidade de fins; base; notificação | Entrada de registo de base |
| Treino e ajuste fino | Transcrições filtradas | Minimização; rastreio de categorias especiais | Ficha de dados; registo de filtro |
| Indexação de recuperação (RAG) | Notas de conta | Controlo de acesso; retenção; alcance de direitos | Manifesto de índice |
| Inferência | Prompts e resultados em directo | Transparência; transferências; limites de ADM | Rastreio com vereditos de política |
| Registo e monitorização | Prompts, resultados, rastreios | Limitação de armazenamento; segurança | Vereditos de retenção |
| Avaliação | Conjuntos dourados e de equipa adversarial | Minimização; sintético onde possível | Ficha de conjunto de avaliação |

As fichas de dados residem na camada 02
([Inventory & Transparency](/bok/the-stack#layer-02-inventory--transparency)); as regras de
finalidade, retenção e residência na camada 01; os testes de privacidade na camada 03; a redação,
filtros e encaminhamento na camada 04; e os registos que um regulador solicita na camada 05. Dois
capítulos adjacentes cobrem o lado organizacional: o capítulo 12 sobre
[atualizar as políticas que já tem](/bok/governance-program#updating-the-policies-you-already-have),
e o capítulo 14 sobre
[o direito de utilizar os dados](/bok/governing-development#the-right-to-use-the-data) no
[Dataset Admission Gate](/patterns/dataset-admission-gate).

## Princípios aplicados à IA

O Artigo 5 RGPD estabelece os princípios (licitude, lealdade e transparência; limitação de fins;
minimização de dados; exactidão; limitação de armazenamento; integridade e confidencialidade) e
torna o responsável pelo tratamento capaz de demonstrar conformidade, o dever de responsabilidade
{[1]}. Para IA os princípios não mudam; onde mordem muda.

### Base lícita para treino versus inferência

O artigo 6.º oferece seis bases legais e nenhuma se sobrepõe a outra; o responsável pelo tratamento
escolhe a que se adequa a cada atividade de tratamento [3]. A armadilha é escolher uma base para "o
modelo". O treino em transcrições, a indexação de notas de conta e a resposta a um cliente em direto
são atividades diferentes, e cada uma precisa da sua própria base.
[A ordem ChatGPT do Garante](/cases/garante-chatgpt-order) mostra o custo de uma base não registada.

| Fase | Bases que geralmente se adequam | Por que a escolha é difícil |
|---|---|---|
| Treino de um modelo em dados raspados ou de terceiros | Interesses legítimos (`Art. 6(1)(f)`) | Sem relação com as pessoas; notificação indireta; objeção deve funcionar |
| Ajuste fino em dados de clientes que detém | Interesses legítimos; por vezes consentimento | Novo fim; teste de compatibilidade; expectativas |
| Recuperação sobre registos de clientes | Contrato (`Art. 6(1)(b)`) para esse cliente | O índice não deve responder a um cliente com dados de outro |
| Inferência ao serviço do cliente | Contrato; interesses legítimos | A necessidade é restrita |
| Monitorização de registos e revisão de abuso | Interesses legítimos; obrigação legal | A retenção varia; revisão humana alarga o acesso |

O artefato é um **registo de base**: cada conjunto de dados e fase tem a sua base, fim e um
apontador para a avaliação por trás, anexado à entrada do registo do sistema. Uma tarefa de treino
lê-o e recusa executar num conjunto de dados cuja base não cobre treino.

> **Exemplo (ilustrativo)**
> Uma entrada do registo de base lida pelo pipeline de treino `csa-01` antes de uma execução:
>
> ```json
> { "dataset": "support-transcripts-2025q4", "system": "csa-01", "stage": "fine-tuning",
>   "basis": "Art. 6(1)(f)", "lia_ref": "lia-csa-01-v3", "purpose": "support-answer-quality",
>   "special_category_scan": "pass", "retention": "P18M", "objection_opt_out": true }
> ```

### Interesses legítimos e o teste em três fases

Interesses legítimos é a base em que os programadores de IA têm maior probabilidade de se basear
[4]. O EDPB estabeleceu como as autoridades o testam na Opinião 28/2024 de 17 de dezembro de 2024
[3]. O interesse deve ser lícito, precisamente articulado, e real e presente. O tratamento deve ser
necessário, sem forma menos intrusiva de atingir o mesmo fim, julgado com minimização em mente. E o
interesse não deve ser ultrapassado pelos direitos das pessoas, onde as expectativas razoáveis pesam
muito: se os dados eram públicos, a relação com o responsável, a fonte e as suas definições de
privacidade, se as pessoas sabem que os seus dados estão online [3].

Quando o equilíbrio se inclina, mitigações para além do que o RGPD já exige podem restaurá-lo. Os
exemplos do EDPB incluem mascarar nomes e correios eletrónicos com valores falsos, um atraso entre
recolher um conjunto de dados e treinar nele, uma objeção incondicional antes do tratamento,
apagamento para além dos fundamentos do Artigo 17, um canal para denunciar regurgitação, excluir
fontes intrusivas e honrar `robots.txt` ou {`ai.txt`} ao raspar, e filtros de saída na implantação
[3]. A CNIL acrescenta um direito discricionário prévio de oposição e transparência sobre risco de
extração [4].

Cada mitigação é um controlo, portanto a **avaliação de interesses legítimos (AIL)** é um artefato
versionado que aponta cada mitigação ao controlo que a implementa (o ponto final de objeção, a id da
regra de filtro, a lista de permissões de raspagem). Desative uma mitigação e a AIL fica obsoleta; o
registo deve indicá-lo.

### Os limites do consentimento

O consentimento deve ser específico, informado e livremente dado; o responsável deve prová-lo; e as
pessoas podem revogá-lo em qualquer momento, tão facilmente como o deram, com efeito para o futuro
[1]. A revogação após treino não remove a influência de uma pessoa dos pesos calculados, portanto um
conjunto de treino baseado em consentimento compromete o responsável a um caminho de remoção que
pode realmente executar (ver "Supressão, retreino e desaprendizagem" abaixo). O consentimento para
um serviço também não é consentimento para treinar um modelo nos dados do serviço. O artefato é um
**registo de consentimento-fim** que une cada consentimento aos conjuntos de dados e versões de
modelo que o herdaram; sem essa união uma revogação não pode ser rastreada às execuções que afeta. A
PIPL da China acrescenta um consentimento separado para informações pessoais sensíveis [5].

### Transparência para as pessoas nos dados

Os Artigos 13 e 14 exigem notificação, e o Artigo 14 cobre dados não recolhidos da pessoa, o caso
normal para dados de treino raspados ou licenciados [1]. Quando decisões do Artigo 22 estão
envolvidas, a notificação e o acesso devem incluir informação significativa sobre a lógica envolvida
e as consequências previstas [1]. Uma notificação escrita para o serviço original raramente descreve
treino, e uma notificação que descrevia o modelo do ano passado está errada após um retreino em
novas fontes. Gere a notificação da mesma entrada do registo que a ficha de modelo, para que mude
quando as fontes mudam; o EDPB nomeia fichas de modelo entre as formas de fechar a lacuna de
informação [3].

### Limitação de fim e desvio de função

Os dados não podem ser tratados de forma incompatível com o seu fim original; o Artigo 6(4)
estabelece o teste: a ligação entre fins, o contexto, a natureza dos dados, as consequências e as
salvaguardas, como encriptação ou pseudonimização [1]. A IA faz cada registo armazenado parecer
dados de treino, e as falhas são **desvio de função**: transcrições de apoio reutilizadas para
perfilar clientes para vendas, gravações de segurança reutilizadas para presença, características de
fraude reutilizadas para limites de crédito.

O controlo é uma etiqueta de fim que viaja com os dados e uma regra da camada 01 que compara o fim
no cartão do conjunto de dados com o fim declarado pelo sistema consumidor, negando a execução
quando diferem e nenhuma avaliação de compatibilidade é registada. Uma junção negada é prova do bit
de limite de fim.

> **Na prática (ilustrativo)**
> Uma equipa de análise foi pedida para ajustar um modelo de abandono nas transcrições recolhidas
> para `csa-01`. A verificação de fim negou a tarefa: o cartão dizia {`support-answer-quality`}, o
> solicitante dizia {`retention-marketing`}, e nenhuma avaliação de compatibilidade existia. O
> pedido tornou-se uma avaliação do Artigo 6(4) que permitiu apenas contagens de tópicos agregadas,
> e a execução negada e a avaliação foram ambas arquivadas contra a entrada do registo do conjunto
> de dados.

**Correspondências:** RGPD `Arts. 5–7`, `13`, `14`} · Reglamento de IA da UE `Art. 10`, `Art. 13`} ·
ISO/IEC 42001 · ISO/IEC 27701 · NIST AI RMF (Mapa) · camadas 01 e 02. Os mapeamentos são
ilustrativos, não uma afirmação de conformidade.

## Minimização, proteção de dados desde a conceção e PETs

Os dados devem ser adequados, relevantes e limitados ao que o fim necessita, e o Artigo 25 exige
isto desde a conceção (medidas como pseudonimização incorporadas) e por defeito (apenas os dados que
cada fim necessita são tratados e tornados acessíveis) [1]. A aprendizagem automática puxa para o
outro lado, portanto a minimização é argumentada característica por característica, não afirmada uma
vez:

- **Justificação ao nível da característica.** Cada característica de entrada tem uma razão e uma
  contribuição medida na ficha de dados; uma sem nenhuma é removida, e campos de categoria especial
  precisam de uma condição documentada.
- **Filtragem antes do treino.** Análises de PII e categoria especial executam em cada instantâneo e
  o registo de filtro é mantido com ele; o EDPB lista seleção de fonte, preparação e filtragem entre
  as áreas que uma autoridade examina [3].
- **Recuperação mínima e registos.** Os índices RAG contêm apenas os campos que as respostas
  precisam; a retenção de registos segue a obrigação, não a predefinição de armazenamento. A tensão
  com os deveres de registo da Lei da IA (ver
  [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)) é resolvida registando o que o dever
  necessita, pseudonimizado onde permite.
- **Conjuntos de avaliação sintéticos ou mascarados** sempre que um teste não depende de identidades
  reais.

### Anonimização versus pseudonimização

A distinção decide se o RGPD se aplica. **Dados pseudonimizados** não podem ser atribuídos a uma
pessoa sem informação adicional mantida separadamente [1]; dados que podem ser re-atribuídos com
essa informação ainda são sobre uma pessoa identificável [1], e as diretrizes de 2025 do EDPB tratam
a pseudonimização como uma salvaguarda a aplicar bem [6]. **Dados anónimos** caem fora do RGPD, mas
o Considerando 26 julga a identificabilidade contra todos os meios razoavelmente prováveis de serem
utilizados, pelo responsável ou outra pessoa, dado custo, tempo e tecnologia [1].

Em EDPS v SRB (C-413/23 P, 4 de setembro de 2025) o Tribunal de Justiça decidiu que dados
pseudonimizados não são dados pessoais em todos os casos e para cada pessoa, uma vez que a
pseudonimização pode impedir um destinatário identificar alguém; mas os deveres próprios do
responsável, como informar pessoas, são julgados do ponto de vista do responsável na recolha [7].
Numa cadeia de fornecimento de IA, um fornecedor que recebe registos bem pseudonimizados sem a chave
pode estar fora do RGPD para eles; o remetente não.

As afirmações de anonimização decaem. Um estudo estimou que 99,98% dos americanos seriam
corretamente re-identificados em qualquer conjunto de dados usando 15 atributos demográficos [8].
Mantenha uma **avaliação de re-identificação** com cada conjunto de dados "anónimo": técnica, modelo
de atacante, risco residual e data.

### Tecnologias de proteção de privacidade e os seus limites honestos

As tecnologias de proteção de privacidade (PETs) reduzem o que um atacante, fornecedor ou insider
pode aprender. Nenhuma torna um sistema conforme, e cada tem um modo de falha conhecido.

| PET | O que faz | O que não faz | Registo de evidência |
|---|---|---|---|
| Privacidade diferencial | Limita quanto um registo pode mudar um resultado ou modelo | Cobrir dados fora do orçamento; sobreviver a um orçamento mal definido ou reposto | Orçamento de privacidade por lançamento, com método de contabilização |
| Aprendizagem federada | Treina onde os dados vivem [9] | Ocultar dados em gradientes partilhados, que podem vazar exemplos [10] | Agregação e definições de DP |
| Dados sintéticos | Substitui registos reais para testes ou partilha | Garantir privacidade: ou falha em parar ataques de inferência ou perde utilidade [11] | Cartão do gerador; resultados de ataque |
| Pseudonimização e mascaramento | Remove identificadores diretos | Tornar dados anónimos; parar ligação de quase-identificador | Registo de custódia de chave; regras de mascaramento |
| Execução confiável (enclaves) | Protege dados em uso do hospedeiro | Remover confiança no fornecedor de hardware; corrigir memorização | Relatório de atestação por carga de trabalho |
| Filtragem de saída e redação | Bloqueia dados pessoais em tempo de execução | Remover dados do modelo; apanhar cada paráfrase | Decisões de guardrail com ids de regra |

NIST SP 800-226 é a referência para avaliar afirmações de privacidade diferencial e nomeia os
"perigos de privacidade" que aparecem na implementação [12]. Uma afirmação de PET é uma avaliação
como qualquer outra: um limiar, um ataque nomeado, uma construção falhada quando o limiar é perdido.

> **Na prática (ilustrativo)**
> Uma equipa trocou registos reais em `csa-01`}'s suite de regressão por sintéticos e assumiu que o
> problema estava resolvido. Um teste de inferência de adesão adicionado ao portão de avaliação
> sinalizou registos raros reproduzidos quase verbatim. O gerador foi retreinado com um orçamento de
> privacidade, o teste permaneceu como um portão permanente, e o cartão do conjunto sintético agora
> carrega o resultado do ataque como a sua evidência de adequação.

**Correspondências:** RGPD `Art. 5(1)(c)`, `Art. 25`, `Art. 32` · Regulamento da IA da UE `Art. 10`,
`Art. 4a` · ISO/IEC 27701 · NIST AI RMF (Measure) ·
[Data governance across the stack](/bok/the-stack#data-governance-across-the-stack) · camadas 01, 03
e 04. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Deveres do responsável em toda a cadeia de fornecimento de IA

### Responsável, subcontratante ou responsável conjunto

Um **responsável pelo tratamento** decide finalidades e meios; um **subcontratante** atua em seu
nome; partes que decidem em conjunto são **responsáveis conjuntos pelo tratamento** e devem repartir
responsabilidades [1]. O Regulamento da IA não mapeia o prestador e o responsável pela implantação
um a um: um responsável pela implantação é geralmente um responsável pelo tratamento, e um prestador
de modelo pode ser o seu subcontratante para inferência e um responsável pelo tratamento para o seu
próprio treino.

| Ator | Papel típico do RGPD | O que o determina |
|---|---|---|
| Programador de modelo a treinar em dados que recolheu | Responsável pelo tratamento para o treino | Escolheu as fontes e a finalidade |
| Fornecedor de API a servir a sua inferência | Subcontratante | Atua apenas sob instruções documentadas [1] |
| O mesmo fornecedor a treinar nos seus prompts | Responsável pelo tratamento para essa utilização | Um subcontratante que determina finalidades é um responsável pelo tratamento para esse tratamento [1] |
| A sua organização a implantar o assistente | Responsável pelo tratamento | Decide por que razão os dados dos clientes são tratados |
| Parceiros a co-treinar em dados agrupados | Responsáveis conjuntos pelo tratamento | Decidem finalidades e meios em conjunto |

Mantenha um **registo de papéis** por sistema e fase com a entrada do registo: um responsável pelo
tratamento executa a AIPD e responde a pedidos; um subcontratante assiste e notifica violações ao
responsável pelo tratamento sem demora injustificada [1].

### APDs de fornecedores de IA e cláusulas de não treino

O artigo 28.º exige um contrato sob o qual o subcontratante atua apenas sob instruções documentadas,
incluindo em transferências [1]. Para fornecedores de IA, a
[Porta de Avaliação de Fornecedores / Modelos](/patterns/vendor-model-due-diligence-gate) deve
verificar cláusulas que um acordo genérico não cobre:

- **Sem treino em dados de clientes** (prompts, resultados, ficheiros, embeddings, feedback),
  qualquer consentimento explícito.
- **Retenção de prompts e resultados**, incluindo retenção para monitorização de abuso e revisão por
  pessoal.
- **Localização do tratamento** por endpoint e funcionalidade, incluindo acesso de suporte.
- **Subcontratantes**, com notificação e objeção quando um anfitrião de modelo muda.
- **Eliminação e devolução** no final do contrato, certificadas.
- **Notificação de violação** num prazo que deixe espaço para as próprias 72 horas do responsável
  pelo tratamento.
- **Notificação de alteração** quando o modelo, a sua política de dados ou a sua região muda.
- **Evidência**: ficha de modelo, atestados de segurança e qualquer AIBOM, entregues como documentos
  armazenados.

O registo da porta (respostas da lista de verificação, referência do contrato, data) fica na entrada
do registo do fornecedor e é re-executado em cada alteração notificada.

### A AIPD para sistemas de IA

Uma **AIPD** é obrigatória antes do tratamento suscetível de resultar num risco elevado,
particularmente com novas tecnologias, e sempre para os três casos do artigo 35.º, n.º 3: avaliação
sistemática com decisões automatizadas significativas, tratamento em larga escala de categorias
especiais de dados, e monitorização em larga escala de espaços acessíveis ao público [1]. As
orientações do Grupo de Trabalho do Artigo 29.º, endossadas pelo Comité Europeu para a Proteção de
Dados, dão nove critérios e dizem que o tratamento que cumpra dois deles geralmente necessitará de
uma AIPD [13]. Os sistemas de IA cumprem vários em simultâneo:

| Critério [13] | Caso típico de IA |
|---|---|
| Avaliação ou pontuação | Pontuações de risco, modelos de propensão, classificação de candidatos |
| Decisões automatizadas com efeito legal ou similar | Crédito, contratação, seguros, elegibilidade |
| Monitorização sistemática | Análise de local de trabalho, vídeo ou atividade de agentes |
| Dados sensíveis ou altamente pessoais | Saúde, biometria, traços inferidos |
| Larga escala; correspondência ou combinação de conjuntos de dados | Corpora à escala da web; conjuntos de treino fundidos |
| Titulares de dados vulneráveis | Colaboradores, crianças, doentes |
| Tecnologia inovadora | Modelos generativos, agentes, análise de emoções |
| Impedir o exercício de um direito ou a utilização de um serviço | Portas de elegibilidade automatizadas |

Uma AIPD de IA necessita de campos que um modelo genérico não tem: cada momento de tratamento com a
sua base, fontes de treino e filtragem, risco de memorização com os resultados de avaliação que o
medem, a análise de decisão automatizada, o mapa de fornecedor e transferência, o design de
supervisão, e o caminho de direitos para dados dentro do modelo. O artigo 35.º, n.º 7 estabelece o
conteúdo mínimo, e quando o risco residual permanece elevado o responsável pelo tratamento consulta
a autoridade primeiro, que tem até oito semanas para responder [1]. O Comité Europeu para a Proteção
de Dados espera ver AIPDs e também decisões de que uma não era necessária [3], portanto "sem AIPD" é
também um artefato. Os responsáveis pela implantação de sistemas de risco elevado utilizam as
informações do artigo 13.º do prestador para a sua AIPD [14], e a avaliação de impacto sobre os
direitos fundamentais do artigo 27.º complementa uma AIPD em vez de a repetir [15]; o padrão
[governação como código para FRIA](/patterns/fria-as-code) escreve os campos partilhados uma vez. A
página de modelos tem um [adendo de AIPD de IA](/resources/templates#schema-impact-assessment) no
seu esquema de avaliação de impacto.

### Registos das atividades de tratamento

O artigo 30.º exige um registo das atividades de tratamento: finalidades, categorias de dados e
pessoas, destinatários, transferências, retenção, segurança [1]. Um sistema de IA geralmente
significa uma entrada por momento de tratamento, e as entradas ficam obsoletas com cada alteração de
pipeline, portanto gere-as a partir do registo, das fichas de dados e do registo de base. O novo
artigo 4.º-A do Regulamento da IA depende deste registo: quando dados de categorias especiais são
tratados para deteção de enviesamento, o registo deve dizer por que razão era estritamente
necessário e por que razão outros dados não serviriam [2].

### Transferências, inferência remota e AITs

O capítulo V do RGPD exige uma base para cada transferência para um país terceiro: adequação,
garantias apropriadas como cláusulas contratuais tipo, ou uma derrogação estreita [1]. Os três
critérios cumulativos do Comité Europeu para a Proteção de Dados definem uma transferência (um
exportador sujeito ao RGPD disponibiliza dados pessoais a um importador num país terceiro), e as
suas orientações tratam o acesso remoto de um país terceiro como uma transferência [16]. Para IA que
cobre um prompt com dados pessoais enviados para um endpoint fora do EEE, telemetria de fornecedor
transportando prompts, uma ativação de contingência para outra região, e uma equipa de suporte
estrangeira que pode ler registos.

Quando a base é contratual, o exportador executa uma **avaliação de impacto de transferência** sobre
se a lei do importador lhe permite honrar as cláusulas, adicionando medidas complementares conforme
o Comité Europeu para a Proteção de Dados recomenda [17] sob as cláusulas contratuais tipo de 2021
[18]. Para os Estados Unidos, a decisão de adequação do Quadro de Privacidade de Dados de 10 de
julho de 2023 cobre organizações certificadas [19], e o Tribunal Geral rejeitou uma ação para a
anular em 3 de setembro de 2025 [20]. Registe que a entidade do fornecedor é certificada para os
dados em questão.

O controlo estende a regra de residência do capítulo 04
([camada 01](/bok/the-stack#layer-01-govern-as-code)): encaminhe a inferência para cada classe de
dados apenas para endpoints cuja base é registada, negue caso contrário, e emita o veredicto. A
evidência é o fluxo de veredicto mais um registo de transferência (endpoint, região, importador,
base, referência de AIT, data de revisão).

> **Na prática (ilustrativo)**
> Quando `csa-01` anunciou um modelo servido de uma região dos EUA, a notificação de alteração
> acionou a porta de avaliação de fornecedores. Verificou a certificação do Quadro de Privacidade de
> Dados do fornecedor, armazenou a verificação no registo de transferência, e a política de
> residência permitiu então o novo endpoint apenas para prompts de suporte pseudonimizados. As notas
> de conta permaneceram no endpoint da UE, e os veredictos de política nos rastreios provaram quais
> dados foram para onde.

**Correspondências:** RGPD `Arts. 26`, `28`, `30`, `35`, `36`, `44`–`46` · Regulamento da IA da UE
`Art. 4a`, `Art. 26(9)`, `Art. 27(4)` · ISO/IEC 42001 Anexo A.10 · ISO/IEC 27701 · NIST AI RMF
(Govern, Map) · camadas 01, 02 e 05. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Decisões automatizadas

### Artigo 22.º do RGPD após SCHUFA

O artigo 22.º dá às pessoas o direito de não serem sujeitas a uma decisão baseada unicamente em
tratamento automatizado, incluindo definição de perfis, com efeitos legais ou similarmente
significativos. Tais decisões são permitidas apenas quando necessárias para um contrato, autorizadas
por lei, ou baseadas em consentimento explícito, e então com pelo menos o direito a intervenção
humana, a expressar uma opinião e a contestar [1]. O capítulo 16 transforma
[decisão automatizada sob artigo 22.º do RGPD](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime)
em registos de explicação e contestação.

Dois acórdãos estabelecem a tarefa de engenharia. Em SCHUFA (C-634/21, 7 de dezembro de 2023) o
Tribunal de Justiça decidiu que uma pontuação de crédito é em si uma decisão automatizada quando os
credores lhe dão um papel determinante [21] (o lado da lei de crédito está no capítulo 20,
[crédito e empréstimos](/bok/existing-law#credit-and-lending)). Um modelo que "apenas recomenda"
está dentro do artigo 22.º quando os humanos a jusante o seguem como regra, e a parte que produz a
pontuação está ela própria a decidir. Em Dun & Bradstreet Austria (C-203/22, 27 de fevereiro
de 2025) o Tribunal decidiu que informações significativas sobre a lógica significam descrever o
procedimento e os princípios realmente aplicados, para que a pessoa compreenda quais dados foram
utilizados e como; que dizer até que ponto uma alteração nos dados teria alterado o resultado pode
ser apropriado; que entregar um algoritmo não é uma explicação; e que segredos comerciais alegados
vão à autoridade ou tribunal para equilibrar [22].

Os artefatos seguem: um **registo de decisão** por decisão (versão de modelo, entradas, resultado,
códigos de razão, contrafactual); um **aviso** de que uma decisão unicamente automatizada foi tomada
e como contestá-la; um **[caminho de contestação](/patterns/decision-notice-contest-path)** para um
revisor com autoridade e informação para alterar o resultado, com um registo do que fizeram; e um
monitor da própria supervisão, porque um revisor que confirma quase todos os resultados em segundos
não é envolvimento significativo (o padrão
[Porta de Supervisão Humana](/patterns/human-in-the-loop-gate)).

> **Exemplo (ilustrativo)**
> Um registo de decisão para `credit-check-04`, uma verificação de financiamento de equipamento de
> uma operadora de telecomunicações, arquivado em tempo de execução:
>
> ```json
> { "decision_id": "cc4-2026-09-18-0192", "system": "credit-check-04@3.2",
>   "solely_automated": true, "basis": "GDPR Art. 22(2)(a)", "outcome": "declined",
>   "reason_codes": ["R07 payment arrears", "R12 short credit history"],
>   "counterfactual": "approval likely after six months without arrears",
>   "notice_sent": "2026-09-18T10:02:11Z", "contest_channel": "human-review-queue" }
> ```

### Os regimes lado a lado

| Regime | Desencadeador | Dever ou direito central | Artefato | Camada |
|---|---|---|---|---|
| GDPR `Art. 22`, `Art. 15(1)(h)` | Decisão unicamente automatizada, efeito legal ou similar | Permissão estreita; intervenção, opinião, contestação; informação sobre a lógica [1][22] | Registo de decisão; aviso; caminho de contestação | 4 · 5 |
| UK GDPR `Arts. 22A–22D` | Decisão significativa sem envolvimento humano significativo | Permitida com garantias; mais apertada para dados de categorias especiais [23] | O mesmo, mais por que razão o envolvimento é significativo | 4 · 5 |
| Regulamentos ADMT da CCPA | ADMT para uma decisão significativa | Aviso pré-utilização; exclusão ou apelo humano; acesso; a partir de 1 de janeiro de 2027 [24] | Aviso; fluxo de trabalho de exclusão e apelo; avaliação de risco | 2 · 4 · 5 |
| Leis dos estados dos EUA (Virgínia, Colorado, Minnesota) | Definição de perfis para decisões com efeitos legais ou similares | Exclusão [25][26]; em Minnesota, questionar o resultado, aprender a razão, re-avaliação em dados corrigidos [27] | Bandeira de exclusão honrada em inferência; fluxo de trabalho de revisão | 1 · 4 |
| LGPD `Art. 20` | Decisão unicamente por tratamento automatizado afetando interesses | Revisão; informação sobre critérios, respeitando segredos comerciais [28] | Fluxo de trabalho de revisão; declaração de critérios | 4 · 5 |
| PIPL `Art. 24` | Decisão automatizada com impacto significativo | Transparência, equidade; explicação; recusa de decisões unicamente automatizadas [5] | Serviço de explicação; rota manual | 4 |
| Regulamento da IA da UE `Art. 86`, `Art. 26(11)` | Decisão do responsável pela implantação sobre um resultado de risco elevado do Anexo III | Explicação do papel do sistema e dos elementos principais; informação às pessoas [29][14] | Explicação ligada ao registo de decisão | 4 · 5 |

O artigo 86 aplica-se apenas quando a lei da União não concede já o direito [29], pelo que a via
RGPD geralmente resolve a questão (o capítulo 18 lê
[Artigo 86 do Regulamento da IA e Artigo 4a](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
em contexto). Situa-se fora dos requisitos do Anexo III que o Omnibus Digital adiou para 2 de
dezembro de 2027 [2], e se se aplica mais cedo não está definido em 2026-09-24 (verificar). A
proposta de Omnibus Digital reformularia o Artigo 22 como uma lista de permissões em que a
necessidade contratual se mantém mesmo que uma pessoa pudesse decidir [30]; não é lei (ver abaixo).

**Correspondências:** RGPD `Art. 13(2)(f)`, `Art. 15(1)(h)`, `Art. 22` · UK GDPR `Arts. 22A–22D` ·
Regulamentos CCPA ADMT · LGPD `Art. 20` · PIPL `Art. 24` · Regulamento da IA da UE `Art. 14`,
`Art. 26(11)`, `Art. 86` · NIST AI RMF (Manage) · camadas 04 e 05. Os mapeamentos são ilustrativos,
não uma afirmação de conformidade.

## Direitos dos titulares dos dados contra modelos treinados

### Onde um pedido tem de chegar

Os direitos de acesso, retificação, apagamento e oposição [1] não se detêm na base de dados. O prazo
é de um mês, prorrogável por dois para pedidos complexos [31], pelo que o caminho é concebido antes
do primeiro pedido. Um responsável pelo tratamento que não consiga identificar uma pessoa num
conjunto de treino pode dizê-lo, e a pessoa pode fornecer informações que tornem a identificação
possível [31].

| Onde os dados se encontram | Resposta viável a apagamento ou oposição | Evidência |
|---|---|---|
| Sistemas de origem e corpus bruto | Ferramentas de pedido normais | Encerramento de ticket |
| Snapshots de treino e ajuste fino | Remover; assinalar modelos treinados no snapshot | Diff de snapshot |
| Índice RAG e caches | Eliminar ou re-indexar chunks; imediato | Manifesto de índice |
| Registos de prompt e saída | Eliminar ou pseudonimizar por chave de titular | Veredicto de retenção |
| Conjuntos de avaliação | Substituir por registos sintéticos | Ficha de conjunto de avaliação |
| Pesos do modelo (se não anónimos) | Suprimir saídas agora; retreinar ou desaprender num calendário | Regra de filtro; plano de retreinamento |

### Supressão, retreinamento e desaprendizagem

Para dados dentro dos pesos há uma escala, de rápida e parcial a lenta e completa:

1. **Supressão de saída.** Um filtro em torno do modelo impede-o de produzir os dados da pessoa. A
   CNIL aceita filtros onde o retreinamento é desproporcionado, se demonstrados eficazes e robustos,
   e prefere regras gerais a uma lista de nomes (ela própria uma lista de pessoas que se opuseram)
   [31]. Os dados permanecem no modelo; teste o filtro como qualquer controlo.
2. **Retreinamento sem os dados.** Onde os dados de treino ainda são mantidos, o retreinamento
   responde ao pedido, e o retreinamento periódico agrupa muitos [31]. Completo para a nova versão,
   custoso para modelos grandes.
3. **Desaprendizagem automática.** Abordagens exatas como treino de shards SISA para que apenas o
   shard afetado seja retreinado [32]; as aproximadas ajustam pesos e são difíceis de verificar.
   Trate qualquer afirmação de desaprendizagem como um teste a passar (inferência de adesão ou
   extração nos registos removidos).

Registe a escolha e a sua razão por pedido: o regulador perguntará por que supressão e não
retreinamento, e quando o próximo retreinamento fecha a lacuna.

### Registar como um pedido foi honrado

A evidência é um **[registo de cumprimento](/patterns/rights-requests-against-models)** escrito pelo
fluxo de trabalho: cada localização, a ação em cada uma, as versões do modelo afetadas e quando a
lacuna se fecha.

> **Exemplo (ilustrativo)**
> Um pedido de apagamento contra `csa-01`, encerrado dentro do prazo:
>
> ```json
> { "request_id": "dsr-2026-0412", "right": "erasure", "subject_key": "hash:7c1e…",
>   "locations": { "crm": "deleted", "rag_index": "deleted", "fine_tune_set": "deleted",
>                  "logs": "deleted", "weights": "output-suppression:rule-dsr-0412" },
>   "retrain_scheduled": "csa-01@2026-10-15", "closed": "2026-09-30", "within_deadline": true }
> ```

**Correspondências:** RGPD `Art. 12(3)`, `Arts. 15–17`, `Art. 21` · ISO/IEC 27701 · NIST AI RMF
(Manage) · camadas 04 e 05. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Um modelo contém dados pessoais?

### O teste de anonimato do EDPB

Se um modelo é dado pessoal, os direitos, transferência e regras de violação atingem os pesos. As
autoridades diferem. O documento de discussão de 2024 da autoridade de Hamburgo argumentou que
armazenar um modelo de linguagem grande não é tratamento, que os direitos se ligam aos inputs e
outputs do sistema, e que o treino ilícito não contamina o uso posterior [33]. O EDPB foi mais
rigoroso: modelos treinados em dados pessoais não podem em todos os casos ser considerados anónimos,
e um modelo é anónimo apenas se tanto a probabilidade de extrair diretamente dados dos sujeitos de
treino como a probabilidade de obtê-los através de consultas forem insignificantes, tendo em conta
todos os meios razoavelmente prováveis de serem utilizados [3]. A CNIL publicou desde orientações
sobre documentar se um modelo se enquadra no RGPD e recomenda filtros robustos em torno de modelos
que possam ter memorizado dados [34].

Para o engenheiro a opinião é um plano de teste. As autoridades examinarão seleção de origem,
preparação e minimização, escolhas de treino (regularização, privacidade diferencial), medidas de
saída, auditorias e testes estruturados contra inferência de atributo e adesão, exfiltração,
regurgitação, inversão de modelo e ataques de reconstrução; esperam documentação incluindo DPIAs (ou
a decisão de não executar uma), o modelo de ameaça, medidas por origem com URLs de origem, e
evidência de resistência a re-identificação [3]. Isto é um **pacote de evidência de anonimato**, e a
maioria é saída de camada 03: uma suite de ataque executa como um eval gate em cada versão do
modelo, e o seu resultado é a afirmação.

> **Exemplo (ilustrativo)**
> Uma linha de um pacote de evidência de anonimato, arquivada contra uma versão do modelo:
>
> ```json
> { "suite_id": "privacy.membership-inference.v2", "model_version": "csa-01@2026-09-18",
>   "attack_auc": 0.52, "threshold": 0.55, "canary_extraction": "0/500", "result": "pass" }
> ```

Passar ataques conhecidos evidencia resistência apenas a esses ataques, como o EDPB nota [3]; o
pacote é re-executado quando o modelo, os seus dados ou o estado da arte mudam.

### Quando o modelo foi treinado ilicitamente

A opinião estabelece três cenários [3]. Se dados pessoais permanecem no modelo e
**o mesmo responsável pelo tratamento** o implementa, o efeito do desenvolvimento ilícito é avaliado
caso a caso. Se **outro responsável pelo tratamento** o implementa, esse responsável deve ter
avaliado que o modelo não foi desenvolvido ilicitamente, observando a origem dos dados e qualquer
infração encontrada por uma autoridade ou tribunal, dimensionada ao seu próprio risco. Se o modelo
foi **anonimizado** antes da implementação e os processos de implementação não tratam dados
pessoais, o RGPD não se aplica a essa operação; novos dados pessoais tratados na implementação são
avaliados por si.

O segundo cenário atinge a maioria das organizações, porque a maioria implementa modelos que não
treinou. Na
[Porta de Diligência Devida de Fornecedor / Modelo](/patterns/vendor-model-due-diligence-gate)
torna-se respostas armazenadas: o resumo de dados de treino do fornecedor, a sua base declarada,
qualquer constatação de execução pública, a sua afirmação de anonimato e evidência, e a data
verificada.

**Correspondências:** RGPD `Art. 4(1)`, `Art. 5(2)`, `Art. 24`, `Art. 25` · Regulamento da IA da UE
`Art. 53` · NIST AI RMF (Measure) ·
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite) · camadas 02, 03 e 05. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Categorias especiais, dados inferidos e biometria

O Artigo 9(1) RGPD proíbe o tratamento de dados que revelem origem racial ou étnica, opiniões
políticas, convicções religiosas ou filosóficas ou filiação sindical, e o tratamento de dados
genéticos, dados biométricos para identificação única, dados de saúde e dados sobre vida sexual ou
orientação sexual, a menos que se aplique uma condição do Artigo 9(2), como consentimento explícito
[1]. O novo Artigo 4a do Regulamento da IA permite aos prestadores de sistemas de risco elevado
tratar tais dados quando estritamente necessário para deteção e correção de enviesamento, apenas se
outros dados (incluindo dados sintéticos ou anonimizados) não o fariam, com pseudonimização,
controlos de acesso, sem transmissão posterior e eliminação uma vez corrigido o enviesamento
(capítulo 16 sobre
[dados de categoria especial para deteção de enviesamento (Art. 4a)](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test));
responsáveis pela implantação e prestadores de outros sistemas podem fazê-lo excepcionalmente, e
nenhum dever de executar trabalho de enviesamento é criado [2]. A antiga base do Artigo 10(5) foi
eliminada [35].

### Dados sensíveis inferidos e proxy

A IA cria dados sensíveis sem os recolher: saúde inferida de compras, religião de escolhas de
refeições, orientação de gráficos sociais, ou um código postal representando etnia. A orientação de
IA do ICO trata inferências e dados de categoria especial como uma questão de legalidade [36]. A Lei
de Saúde Minha Saúde Meus Dados de Washington conta como dados de saúde do consumidor informação
derivada ou extrapolada de dados não-saúde, incluindo por algoritmos ou aprendizagem automática
[37]. A Califórnia exige uma avaliação de risco antes da inferência automatizada de saúde, situação
económica ou comportamento em certos contextos [24].

Dois controlos tornam isto verificável. Um **teste proxy** em camada 03 mede quão bem cada
característica e a saída predizem um atributo protegido num conjunto rotulado, falhando a construção
acima de um limiar. Uma **política de inferência** em camada 01 lista atributos que um sistema não
pode inferir, executada por um classificador de saída em camada 04. Ambos deixam registos de que a
inferência sensível foi procurada.

### Biometria

Os dados biométricos resultam do processamento técnico de características físicas, fisiológicas ou
comportamentais que permite ou confirma identificação única, como imagens faciais ou impressões
digitais [1]. Mantenha três utilizações separadas: **identificação** (um para muitos),
**verificação** (um para um) e **categorização** (atribuir um grupo de características).

| Instrumento | Regra sobre biometria | Artefato |
|---|---|---|
| GDPR `Art. 9` | Dados biométricos para identificação única são uma categoria especial [1] | Registo de condição do Artigo 9(2); AIPD |
| Regulamento da IA da UE `Art. 5(1)(e)`–`(h)` | Proíbe raspagem facial não direcionada, inferência de emoção no trabalho e escola (usos médicos e de segurança excetuados), categorização inferindo características sensíveis, e identificação remota em tempo real para aplicação da lei salvo exceções estreitas [38] | Política de uso proibido como código; ecrã de entrada |
| Regulamento da IA da UE Anexo III ponto 1 | Identificação remota (não verificação), categorização sensível e reconhecimento de emoção são de risco elevado onde lícitas [39] | Registo de classificação de risco elevado |
| Proposta de Omnibus `Art. 9(2)(l)` | Permitiria verificação sob o controlo exclusivo da pessoa [30] | Nenhuma ainda |
| Illinois BIPA | Calendário de retenção, consentimento escrito informado, sem lucro; ação privada com USD 1.000 por negligência e USD 5.000 por violação intencional ou imprudente [40] | Captura de consentimento; retenção como código; registo de destruição |
| PIPL `Arts. 28–29` | Biometria é sensível: finalidade específica, necessidade, consentimento separado [5] | Registo de consentimento separado; PIPIA |

BIPA é executada através de ações de classe privadas, e uma emenda de 2024 é reportada limitar
digitalizações repetidas da mesma pessoa a uma recuperação (verificar) [40]. Uma palavra-passe
vazada pode ser reposta; um rosto vazado não pode, pelo que os modelos biométricos obtêm as regras
de retenção e acesso mais rigorosas, e o seu registo de eliminação é evidência que vale a pena
manter.

### Dados de saúde do consumidor e dados neurais

A Lei de Meus Dados de Saúde de Washington, em vigor para a maioria das entidades desde 31 Mar 2024,
exige consentimento para recolher, consentimento separado para partilhar e uma autorização assinada
para vender, aplicada através da lei de proteção do consumidor do estado [37]. **Dados neurais**
(informação gerada pela medição da atividade do sistema nervoso) são informação pessoal sensível sob
a CCPA por SB 1223, aprovada em 28 Set 2024 [41], e dados sensíveis sob a Lei de Privacidade do
Colorado por HB24-1058, em vigor desde 7 Ago 2024 [42]. Um sistema de IA que lê dispositivos
portáteis ou interfaces cérebro-computador deve assinalar estas classes de dados na admissão, porque
ativam deveres de consentimento e avaliação que a telemetria ordinária não ativa.

**Correspondências:** RGPD `Art. 4(14)`, `Art. 9`, `Art. 35(3)(b)` · Regulamento da IA `Art. 4a`,
`Art. 5(1)(e)`–`(h)`, Anexo III ponto 1 · BIPA · Lei de Meus Dados de Saúde de Washington · CCPA ·
PIPL `Arts. 28–29` · NIST AI RMF (Map, Measure) · camadas 01, 03 e 04. Os mapeamentos são
ilustrativos, não uma afirmação de conformidade.

## Violações de privacidade específicas da IA

Uma **violação de dados pessoais** é uma violação de segurança que conduz à destruição, perda,
alteração, divulgação não autorizada ou acesso acidental ou ilícito a dados pessoais [1]. O
responsável notifica a autoridade sem demora indevida e, quando viável, no prazo de 72 horas após
tomar conhecimento, a menos que a violação seja improvável de resultar num risco; informa as pessoas
afetadas quando o risco é elevado; e documenta cada violação [1]. A IA acrescenta formas de divulgar
dados que não parecem uma base de dados roubada.

| Tipo de violação | Mecanismo | Deteção | Artefato |
|---|---|---|---|
| Regurgitação e extração | O modelo reproduz texto de treino memorizado, incluindo nomes, números de telefone e endereços de correio eletrónico [43] | Impactos de PII na saída; canários; relatos de utilizadores | Registo de guardrail de saída; avaliação de extração |
| Inferência de adesão | Um atacante aprende se um registo estava no conjunto de treino [44] | Encontrado por testagem, raramente em tempo de execução | Avaliação de inferência de adesão |
| Inversão de modelo | Características dos sujeitos de treino reconstruídas a partir de saídas e pontuações de confiança [45] | Padrões de sondagem de elevado volume | Limites de taxa; resultado de red-team |
| Exfiltração por injeção de prompts | Instruções ocultas em conteúdo recuperado fazem o assistente vazar dados que consegue ler [46][47] | Ligações de saída bloqueadas; anomalias de chamada de ferramenta | Decisões de guardrail; rastreios de chamada de ferramenta |
| Recuperação demasiado ampla | Um índice RAG devolve registos de outro cliente | Alertas de recuperação entre inquilinos | Testes de acesso ao índice; rastreios de recuperação |
| Exposição de registo | Prompts com dados pessoais legíveis em ferramentas de observabilidade | Revisões de acesso; DLP em armazenamentos de registo | Veredictos de retenção; registos de acesso |

Se um determinado evento é notificável é o julgamento da equipa de privacidade sobre os factos, com
os exemplos trabalhados da EDPB como guia [48]. O trabalho de engenharia é produzir os factos dentro
do prazo: o rastreio do que saiu, a entrada de registo dizendo cujos dados o sistema detém, o
histórico de avaliação dizendo se a fraqueza era conhecida. Para agentes que leem correio, navegam e
chamam ferramentas, a orientação da AEPD sobre IA agêntica de 18 Fev 2026 estabelece as ameaças
acrescidas e as medidas que os responsáveis podem tomar [49]. Um incidente pode iniciar vários
prazos: as 72 horas do RGPD funcionam ao lado dos prazos do Artigo 73 do Regulamento da IA
(capítulo 08) e qualquer regime setorial; o capítulo 17 coloca
[notificação de violação do RGPD ao lado dos prazos do Regulamento da IA](/bok/incidents#the-overlapping-clocks).
Dê ao [Incident Pipeline](/patterns/incident-pipeline) um ramo de violação de dados pessoais com o
seu próprio temporizador a partir do carimbo de data/hora de conhecimento, e mantenha as 96 horas da
proposta Omnibus e o limiar de risco elevado como um parâmetro, não a regra de hoje [30].

**Correspondências:** RGPD `Art. 4(12)`, `Arts. 32–34` · Regulamento da IA `Art. 15`, `Art. 73` ·
OWASP LLM02:2025 · OWASP Agentic ASI01 [50] · NIST AI RMF (Manage) · camadas 03, 04 e 05. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## O lado do RGPD do Omnibus Digital

Apenas um dos dois textos Omnibus é lei: o **Regulamento Omnibus Digital sobre a IA**, Regulamento
(UE) 2026/1744, em vigor desde 27 Jul 2026, que criou o Artigo 4a [2]. A proposta de
**Omnibus Digital** de 19 Nov 2025, COM(2025) 837, alteraria o RGPD e regras vizinhas [30]. A partir
de 2026-09-24 permanece uma proposta: as comissões ITRE e LIBE do Parlamento tiveram um relatório de
projeto de 22 Jun 2026 e mais de 1.750 alterações, a votação de mandato planeada do Conselho de 26
Jun 2026 foi cancelada, e em agosto de 2026 os triálogos não tinham começado [51]. O comentário
sobre textos de trabalho do Conselho relatou que um compromisso de junho substituiu o Artigo 88c
proposto por um considerando e reformulou a definição de dados pessoais através de uma nova
disposição de pseudonimização [52].

| Alteração proposta ao RGPD [30] | Lei atual | Construir agora |
|---|---|---|
| `Art. 4(1)`: não dados pessoais para uma entidade que não consegue identificar a pessoa por meios razoavelmente suscetíveis de serem utilizados | Considerando 26; o julgamento SRB [7] | Registos de custódia de chaves |
| `Art. 9(2)(k)`, `9(5)`: dados de categoria especial residuais no desenvolvimento e operação de IA; evitar, remover ou proteger de saídas | Nenhuma condição específica de IA | Análises de categoria especial; filtros de saída |
| `Art. 88c`: interesses legítimos para IA, com minimização, proteção de dados residuais, transparência reforçada e um direito incondicional de oposição | Artigo 6(1)(f) e o teste de três passos [3] | LIA com um ponto final de exclusão |
| `Art. 22`: lista de permissões; necessidade contratual mesmo que um humano pudesse decidir | Artigo 22 atual [1] | Registos de decisão; caminhos de contestação |
| `Art. 33`: apenas violações de risco elevado, 96 horas, ponto de entrada único | 72 horas, qualquer risco | Um temporizador de violação parametrizado |
| `Art. 35`: listas DPIA em toda a UE, modelo e metodologia | Listas nacionais | Uma DPIA mapeável para um esquema comum |

A leitura é breve: não construa para uma proposta. Construa os controlos que ambas as versões
querem, e faça os parâmetros que podem mudar (relógio de violação, limiar de notificação,
acionadores de DPIA) configuração, não código.

## Para além da UE: Reino Unido, EUA, Brasil e China

### Reino Unido

A Lei de Dados (Utilização e Acesso) de 2025, secção 80, substituiu o Artigo 22 do RGPD do Reino
Unido pelos Artigos 22A a 22D: uma decisão significativa sem envolvimento humano significativo é
permitida com salvaguardas (informação, representações, intervenção humana, contestação); dados de
categoria especial limitam-se a consentimento explícito, ou contrato ou autorização legal com a
condição de interesse público substancial; e a nova base de interesses legítimos reconhecidos não
pode apoiar tal decisão [23]. As regras entraram em vigor em 5 Fev 2026 [23]. O ICO consultou sobre
orientação ADM de projeto de 31 Mar a 29 Mai 2026 [53], e marca a sua orientação de IA como sob
revisão por causa da Lei [36]. O capítulo 08 coloca o Reino Unido no
[mapa regulatório](/bok/regulatory-map#united-kingdom).

### Estados Unidos

Não existe lei federal abrangente de privacidade. Os regulamentos da Califórnia sobre ADMT,
avaliações de risco e auditorias de cibersegurança entraram em vigor em 1 Jan 2026 [24]. O capítulo
21 leva uma ferramenta de contratação através de
[Colorado SB 26-189 e as regras ADMT da CPPA](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes)
lado a lado. ADMT significa tecnologia que utiliza computação para substituir ou substituir
substancialmente a tomada de decisão humana; uma decisão significativa diz respeito a empréstimos,
habitação, educação, emprego ou saúde. As avaliações de risco são devidas antes, entre outros, de
utilizar ADMT para decisões significativas, certas inferências automatizadas e treino de ADMT ou
tecnologia de reconhecimento facial; para processamento anterior às regras são devidas até 31 Dez
2027, com submissões à agência até 1 Abr 2028 [24]. A lei de Virgínia mostra a forma das outras na
tabela: exclusões de publicidade direcionada, venda e definição de perfis significativa, e
avaliações que o Procurador-Geral pode exigir [25][54]. O número de estados com tais leis continua a
crescer (verifique a contagem atual).

| Lei | Direito de definição de perfis ou ADMT | Dever de avaliação | Nota de dados sensíveis |
|---|---|---|---|
| Regulamentos CCPA e ADMT da Califórnia | Aviso pré-uso; exclusão ou apelação; acesso [24] | Avaliações de risco, submetidas à agência [24] | Dados neurais são sensíveis [41] |
| CDPA de Virgínia | Exclusão de definição de perfis [25] | Avaliações, disponíveis para o Procurador-Geral [54] | Dados sensíveis acionam uma avaliação [54] |
| Lei de Privacidade do Colorado (2023-07-01) | Exclusão incl. definição de perfis [26] | Avaliações para risco elevado [26] | Dados neurais e biológicos são sensíveis [42] |
| CDPA de Minnesota (2025-07-31) | Questionar, razão, revisão, reavaliação [27] | Não mapeado nesta edição | Não mapeado nesta edição |

A unidade prática é o direito, não o estado: um sinal de exclusão honrado na inferência, um fluxo de
trabalho de razão e revisão, um modelo de avaliação com campos para os acionadores de cada estado.

### Brasil e China

A **LGPD** do Brasil inclui interesses legítimos entre as suas bases legais, estabelece condições
mais rigorosas para dados sensíveis, trata dados anonimizados como fora da lei a menos que a
anonimização possa ser revertida com esforços razoáveis, dá um direito de solicitar revisão de
decisões unicamente automatizadas com informação sobre os critérios (sujeito a segredos comerciais),
e permite à autoridade exigir um relatório de impacto [28].

A **PIPL** da China lista as suas bases legais no Artigo 13 sem uma base geral de interesses
legítimos, portanto o treino em informação pessoal geralmente repousa em consentimento ou outro
fundamento listado. As decisões automatizadas devem ser transparentes e justas, com um direito a uma
explicação e a recusar decisões unicamente automatizadas de impacto significativo; informação
sensível, incluindo biometria, necessita necessidade e consentimento separado; a provisão
transfronteiriça necessita uma avaliação de segurança CAC, certificação ou o contrato padrão; e uma
avaliação de impacto é necessária antecipadamente para dados sensíveis, decisões automatizadas,
processamento confiado e provisão transfronteiriça, mantida por pelo menos três anos [5]. O capítulo
08 mapeia as regras específicas de IA da China ([China](/bok/regulatory-map#china)).

## Obrigação de mapa de artefato

Camadas:
**1 Governação como Código · 2 Inventário & Transparência · 3 Avaliações & Red Teaming como Evidência · 4 Controlos de Tempo de Execução & Observabilidade · 5 Garantia & Conformidade Contínua**.

| Obrigação | Artefato | Camada | Responsável pelo dever | Registo de evidência |
|---|---|---|---|---|
| RGPD `Art. 5(1)(b)`, `6(4)` limitação de finalidade | Etiquetas de finalidade; política de correspondência de finalidade | 1 · 2 | Responsável pelo tratamento | Veredicto por execução |
| RGPD `Art. 6` base legal | Registo de base; LIA versionada | 2 | Responsável pelo tratamento | Entrada de registo com referência LIA |
| RGPD `Art. 7` consentimento | Registo de consentimento-finalidade | 2 · 5 | Responsável pelo tratamento | Retiradas rastreadas para execuções |
| RGPD `Arts. 13–14` transparência | Aviso gerado a partir do registo | 2 | Responsável pelo tratamento | Versão de aviso por versão de modelo |
| GDPR `Art. 5(1)(c)`, `Art. 25` | Justificação de características; filtros de PII; retenção como código | 1 · 3 | Responsável pelo tratamento | Registos de filtro; veredictos de retenção |
| RGPD `Art. 28` subcontratantes | Lista de verificação de cláusula de fornecedor de IA | 2 · 5 | Responsável pelo tratamento | Registo de gate por alteração |
| GDPR `Art. 30` ROPA | Registos gerados por momento de processamento | 2 · 5 | Responsável pelo tratamento; subcontratante | Registo gerado |
| GDPR `Arts. 35–36` DPIA | Modelo DPIA de IA; decisão "sem DPIA" | 1 · 2 | Responsável pelo tratamento | DPIA versionada |
| Transferências RGPD `Arts. 44–46` | Registo de transferências; política de encaminhamento; TIA | 1 · 4 · 5 | Responsável pelo tratamento; subcontratante | Vereditos de encaminhamento |
| GDPR `Art. 22`, `15(1)(h)` ADM | Registo de decisão; aviso; caminho de contestação | 4 · 5 | Responsável pelo tratamento; produtor de pontuação | Registos de decisão e revisão |
| Direitos RGPD `Arts. 15–17`, `21` | Fluxo de pedidos em todas as localizações | 4 · 5 | Responsável pelo tratamento | Registo de cumprimento |
| Anonimato do modelo RGPD `Art. 5(2)` | Pacote de evidência de anonimato; avaliações de ataque à privacidade | 3 · 5 | Responsável pelo tratamento (programador) | Resultado de avaliação por versão |
| Dados sensíveis e inferidos RGPD `Art. 9` | Teste de proxy; política de inferência; registo de condição | 1 · 3 · 4 | Responsável pelo tratamento | Avaliação de proxy; decisões do classificador |
| Violações RGPD `Arts. 33–34` | Ramo de violação do pipeline de incidentes | 4 · 5 | Responsável pelo tratamento; subcontratante | Marca de tempo de sensibilização; notificação |
| Regulamento da IA `Art. 4a` | Conjunto de enviesamento pseudonimizado; tarefa de eliminação; motivo ROPA | 1 · 2 | Prestador; responsável pela implantação (excepcionalmente) | Registo de eliminação; entrada ROPA |
| Regulamento da IA `Art. 26(9)`, `27(4)` | Partilha de FRIA-as-Code de campos AIPD | 2 | Responsável pela implantação | Avaliações ligadas |
| Regulamento da IA `Art. 86` | Explicação ligada ao registo de decisão | 4 · 5 | Responsável pela implantação | Explicação por pedido |
| UK GDPR `Arts. 22A–22D` | Fluxo de salvaguarda; justificação do envolvimento | 4 · 5 | Responsável pelo tratamento | Registos de revisão |
| Regulamentos ADMT da CCPA | Notificação pré-utilização; exclusão ou recurso; avaliação de risco | 2 · 4 · 5 | Negócio | Notificação; exclusões; avaliação |
| Exclusões de definição de perfis de estados dos EUA | Sinalizador de exclusão na inferência; modelo de avaliação | 1 · 4 · 5 | Responsável pelo tratamento | Vereditos de exclusão |
| BIPA; MHMDA; leis de dados neurais | Captura de consentimento; calendário de retenção; sinalizadores de admissão | 1 · 2 | Negócio | Registos de consentimento e destruição |
| LGPD `Art. 20`; PIPL `Arts. 24`, `55–56` | Fluxos de revisão e explicação; PIPIA | 4 · 5 | Responsável pelo tratamento; subcontratante | Registos de revisão; PIPIA |

> **Na prática (ilustrativo)**
> Um responsável pela engenharia de privacidade numa grande operadora de telecomunicações
> reconstruiu a AIPD `csa-01` de modo a que a maior parte fosse gerada: momentos de tratamento do
> registo, bases do registo de bases, o mapa de transferências da política de encaminhamento, risco
> de memorização da avaliação de privacidade mais recente, o caminho de direitos do fluxo de
> pedidos. O EPD continuou a escrever e assinar o julgamento de risco. Quando o fornecedor mudou de
> região, três campos mudaram e a AIPD mostrou uma diferença em vez de ficar obsoleta numa unidade
> partilhada.

**Correspondências:** RGPD `Arts. 5–7`, `9`, `13–17`, `21`, `22`, `25`, `26`, `28`, `30`, `32–36`,
`44–46` · RGPD do Reino Unido `Arts. 22A–22D` · CCPA e seus regulamentos ADMT · Leis de privacidade
da Virgínia, Colorado e Minnesota · BIPA · MHMDA de Washington · LGPD · PIPL · Regulamento da IA
`Arts. 4a`, `5`, `26`, `27`, `86` · ISO/IEC 42001 · ISO/IEC 27701 · NIST AI RMF (Govern, Map,
Measure, Manage) · todas as cinco camadas. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## O que pode fazer esta semana

1. **Enumere os momentos de tratamento** do seu sistema de IA de risco mais elevado e escreva a base
   legal e a retenção junto a cada um. Cada célula em branco é uma constatação.
2. **Adicione uma avaliação de privacidade ao gate**: um teste de fuga de PII ou inferência de
   associação com um limiar que falha a compilação. O seu resultado é a primeira página de um pacote
   de evidência de anonimato.
3. **Execute um pedido de apagamento simulado** através do corpus, snapshots, índice RAG, registos e
   pesos, escreva o registo de cumprimento e cronometrize-o em relação ao prazo de um mês.
4. **Envie aos seus fornecedores de IA a lista de verificação de cláusulas** (sem treino, retenção
   de prompts, região, sub-processadores, notificação de alteração) e guarde as respostas nas
   entradas do seu registo.
5. **Rastreie uma chamada de inferência** até ao país que a serve e verifique se o registo de
   transferências nomeia um fundamento. Se não nomear, a política de residência tem a sua primeira
   regra.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 4(1), 4(4), 4(5), 4(12), 4(14), 5, 6, 6(4), 7, 9, 12(3), 13–17, 21, 22, 25, 26, 28, 30, 33–36, 44–46, 83(5), 99; Recital 26). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special-category data for bias detection and correction, incl. the records-of-processing reason; amended Art. 2(7) keeping the GDPR unaffected; Annex III high-risk requirements from 2 Dec 2027); OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (no hierarchy of legal bases; three-step legitimate-interest test; mitigating measures, paras 99–107; anonymity test at para 43, elements and documentation for the evidence at paras 49–58; three scenarios on unlawful development). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[4] "Relying on the legal basis of legitimate interests to develop an AI system" (AI how-to sheet; legitimate interest as the most likely basis; balancing test; discretionary prior right to object; transparency on regurgitation risk). CNIL. 2025-06 (page dated 2026-01-05). https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system (verified: primary)
[5] Personal Information Protection Law of the People's Republic of China (Arts. 13 legal bases, 24 automated decision-making, 28–29 sensitive personal information and separate consent, 38 cross-border provision, 55–56 impact assessment kept three years), official English translation. National People's Congress. 2021-08-20. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[6] Guidelines 01/2025 on pseudonymisation (version for public consultation, 17 Jan to 14 Mar 2025). European Data Protection Board. 2025-01. https://www.edpb.europa.eu/our-work-tools/documents/public-consultations/2025/guidelines-012025-pseudonymisation_en (verified: primary)
[7] Press release No 107/25: judgment in Case C-413/23 P, EDPS v SRB (pseudonymised data not personal data in all cases and for every person; identifiability for the controller's information duty assessed at collection, from the controller's point of view). Court of Justice of the EU. 2025-09-04. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250107en.pdf (verified: primary)
[8] Rocher, Hendrickx and de Montjoye, "Estimating the success of re-identifications in incomplete datasets using generative models" (99.98% of Americans correctly re-identified with 15 demographic attributes). Nature Communications 10, 3069. 2019-07-23. https://doi.org/10.1038/s41467-019-10933-3 (verified: primary)
[9] McMahan et al., "Communication-Efficient Learning of Deep Networks from Decentralized Data" (federated learning; arXiv 1602.05629). arXiv. 2016-02-17. https://arxiv.org/abs/1602.05629 (verified: primary)
[10] Zhu, Liu and Han, "Deep Leakage from Gradients" (private training data recovered from shared gradients; arXiv 1906.08935). arXiv. 2019-06-21. https://arxiv.org/abs/1906.08935 (verified: primary)
[11] Stadler, Oprisanu and Troncoso, "Synthetic Data – Anonymisation Groundhog Day" (synthetic data either does not prevent inference attacks or does not retain utility; arXiv 2011.07018). arXiv. 2020-11-13. https://arxiv.org/abs/2011.07018 (verified: primary)
[12] NIST SP 800-226, Guidelines for Evaluating Differential Privacy Guarantees (differential privacy pyramid; privacy hazards). NIST. 2025-03. https://csrc.nist.gov/pubs/sp/800/226/final (verified: primary)
[13] Guidelines on Data Protection Impact Assessment (DPIA) and determining whether processing is "likely to result in a high risk" (WP248 rev.01; nine criteria; two criteria usually require a DPIA), endorsed by the EDPB. Article 29 Working Party. 2017-10-04. https://ec.europa.eu/newsroom/article29/items/611236 (verified: primary)
[14] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(9) and (11) (deployers use Art. 13 information for their GDPR DPIA; informing people subject to Annex III high-risk decisions). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[15] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_27 (verified: primary)
[16] Guidelines 05/2021 on the interplay between the application of Article 3 and the provisions on international transfers as per Chapter V of the GDPR, version 2.0 (three cumulative criteria for a transfer; remote access from a third country, Example 11). European Data Protection Board. 2023-02-14. https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf (verified: primary)
[17] Recommendations 01/2020 on measures that supplement transfer tools to ensure compliance with the EU level of protection of personal data, version 2.0. European Data Protection Board. 2021-06-18. https://www.edpb.europa.eu/our-work-tools/our-documents/recommendations/recommendations-012020-measures-supplement-transfer_en (verified: primary)
[18] Standard contractual clauses for international transfers (published 4 June 2021). European Commission. 2021-06-04. https://commission.europa.eu/publications/standard-contractual-clauses-international-transfers_en (verified: primary)
[19] EU-US data transfers: adequacy decision for the EU-US Data Privacy Framework (adopted 10 July 2023). European Commission. 2023-07-10. https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/eu-us-data-transfers_en (verified: primary)
[20] Press release No 106/25: judgment in Case T-553/23, Latombe v Commission (action for annulment of the EU-US Data Privacy Framework adequacy decision dismissed). General Court of the EU. 2025-09-03. https://curia.europa.eu/site/upload/docs/application/pdf/2025-09/cp250106en.pdf (verified: primary)
[21] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[22] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; effect of a variation in the data; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[23] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D: meaningful human involvement, restrictions for special-category data and for Art. 6(1)(ea), safeguards; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[24] California Privacy Protection Agency, CCPA regulations on automated decisionmaking technology, risk assessments and cybersecurity audits (approved by OAL 22 Sep 2025; effective 1 Jan 2026; ADMT definition § 7001(e); significant decision § 7001(ddd); risk-assessment triggers § 7150; deadlines §§ 7155(b), 7157(a); ADMT compliance § 7200(b); opt-out and appeal § 7221). California Privacy Protection Agency. 2025-09-22. https://cppa.ca.gov/regulations/ccpa_updates.html (verified: primary)
[25] Code of Virginia § 59.1-577, Personal data rights; consumers (opt out of targeted advertising, sale, or profiling in furtherance of decisions that produce legal or similarly significant effects). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-577/ (verified: primary)
[26] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[27] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review the data, correct and have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[28] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 7 legal bases incl. legitimate interests; Art. 11 sensitive data; Art. 12 anonymised data; Art. 20 review of automated decisions; Art. 38 impact report). Presidência da República (Brazil). 2018-08-14. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[29] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; deployer decisions based on Annex III high-risk outputs, except point 2; applies only where Union law does not otherwise provide the right). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[30] Proposal for a Regulation amending Regulations (EU) 2016/679, 2018/1724, 2018/1725, 2023/2854 and Directives 2002/58/EC, (EU) 2022/2555 and (EU) 2022/2557 as regards the simplification of the digital legislative framework (Digital Omnibus), COM(2025) 837 final, Council doc. 15698/25 (GDPR Arts. 4(1), 5(1)(b), 9(2)(k)–(l) and 9(5), 12(5), 13(4), 22, 33, 35, new 88c). European Commission / Council of the EU. 2025-11-19. https://data.consilium.europa.eu/doc/document/ST-15698-2025-INIT/en/pdf (verified: primary)
[31] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[32] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[33] Discussion Paper: Large Language Models and Personal Data (three theses: storing an LLM is not processing; rights attach to system inputs and outputs; unlawful training does not affect later use). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[34] "AI: the CNIL finalises its recommendations on the development of artificial intelligence systems and announces its upcoming work" (guidance on GDPR applicability to AI models; annotation; secure development). CNIL. 2025-07-22. https://www.cnil.fr/en/ai-cnil-finalises-its-recommendations-development-artificial-intelligence-systems (verified: primary)
[35] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Arts. 4a and 10 (as amended by Reg. (EU) 2026/1744: Art. 10(5) deleted; Art. 4a inserted). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[36] Guidance on AI and data protection (lawfulness incl. inferences and special category data; notice that it is under review because of the Data (Use and Access) Act; last updated 15 Mar 2023). Information Commissioner's Office. 2023-03-15. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/ (verified: primary)
[37] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated from non-health information by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; enforcement under chapter 19.86 RCW; 31 Mar 2024, small businesses 30 Jun 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[38] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 5(1)(e)–(h) (untargeted facial scraping; emotion inference at work and school; biometric categorisation of sensitive traits; real-time remote biometric identification for law enforcement). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_5 (verified: primary)
[39] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 1 (biometrics: remote biometric identification excluding verification; sensitive-attribute categorisation; emotion recognition). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[40] "Biometric Information Privacy Act" (740 ILCS 14, 2008; informed written consent, retention schedule, no profiting; USD 1,000 / 5,000 statutory damages; 2024 amendment, SB 2979, on per-person recovery). Wikipedia. 2026. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: secondary)
[41] SB 1223, Consumer privacy: sensitive personal information: neural data (neural data defined and added to sensitive personal information under the CCPA; approved by the Governor 28 Sep 2024; Chapter 887, Statutes of 2024). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240SB1223 (verified: primary)
[42] HB24-1058, Protect Privacy of Biological Data (biological and neural data as sensitive data under the Colorado Privacy Act; signed 17 Apr 2024; effective 7 Aug 2024). Colorado General Assembly. 2024-04-17. https://leg.colorado.gov/bills/hb24-1058 (verified: primary)
[43] Carlini et al., "Extracting Training Data from Large Language Models" (hundreds of verbatim training sequences extracted from GPT-2, incl. names, phone numbers and email addresses; arXiv 2012.07805). arXiv. 2020-12-14. https://arxiv.org/abs/2012.07805 (verified: primary)
[44] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[45] Fredrikson, Jha and Ristenpart, "Model Inversion Attacks that Exploit Confidence Information and Basic Countermeasures" (CCS 2015). ACM. 2015-10-12. https://doi.org/10.1145/2810103.2813677 (verified: primary)
[46] Greshake et al., "Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection" (data theft via injected prompts in retrieved content; arXiv 2302.12173). arXiv. 2023-02-23. https://arxiv.org/abs/2302.12173 (verified: primary)
[47] LLM02:2025 Sensitive Information Disclosure (OWASP Top 10 for LLM Applications, 2025 edition). OWASP GenAI Security Project. 2025. https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/ (verified: primary)
[48] Guidelines 9/2022 on personal data breach notification under GDPR, version 2.0. European Data Protection Board. 2023-03-28. https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-92022-personal-data-breach-notification-under_en (verified: primary)
[49] "La Agencia publica unas orientaciones sobre Inteligencia Artificial agéntica desde la perspectiva de protección de datos" (press release; guidance on agentic AI and data protection). Agencia Española de Protección de Datos. 2026-02-18. https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia (verified: primary)
[50] Top 10 for Agentic Applications 2026 (ASI01 Agent Goal Hijack). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[51] "The Digital Omnibus Regulation Proposal", Legislative Train Schedule (status: tabled; ITRE and LIBE joint; draft report 22 June 2026; 1,750+ amendments; Council mandate vote of 26 June cancelled; no trilogues; last update 1 Aug 2026). European Parliament. 2026-08-01. https://www.europarl.europa.eu/legislative-train/theme-a-new-plan-for-europe-s-sustainable-prosperity-and-competitiveness/file-digital-package (verified: primary)
[52] "Digital Omnibus (GDPR) Negotiations at the Council – September 2026 Update" (June compromise replaced the AI provision, Art. 88c, with a recital; personal-data definition reworked via a new pseudonymisation article). Privacy Next. 2026-09-01. https://www.privacynext.eu/resources/digital-omnibus-gdpr-negotiations-at-the-council-september-2026-update/ (verified: reported)
[53] ICO consultation on the draft guidance about automated decision-making, including profiling (published 31 Mar 2026; closed 29 May 2026; follows the Data (Use and Access) Act 2025). Information Commissioner's Office. 2026-03-31. https://ico.org.uk/about-the-ico/ico-and-stakeholder-consultations/2026/03/ico-consultation-on-the-draft-guidance-about-automated-decision-making-including-profiling/ (verified: primary)
[54] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, risky profiling, sensitive data; available to the Attorney General on civil investigative demand). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
