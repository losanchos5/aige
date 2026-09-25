---
lang: pt
source: bok/16-fairness-explainability.md
sourceHash: "51457249289a3e5c6a3d9843df211b5c45bec1543edc01267f5faaa5f38770b9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 16. Equidade e explicabilidade para profissionais

> Equidade e explicabilidade tornam-se controlos apenas quando são medidas, gateadas e arquivadas
> como evidência; este capítulo mapeia cada técnica para sua camada de stack e seu gancho legal.

## Como ler este capítulo

A equidade e a explicabilidade são os dois princípios que todas as estruturas de IA responsável
nomeiam e os dois que mais frequentemente ficam no cartaz. O NIST AI Risk Management Framework lista
«Equitativo – com Viés Prejudicial Gerido» e «Explicável e Interpretável» entre as características
da IA confiável, e atribui a cada um uma subcategoria de medição: `MEASURE 2.11` (a equidade e o
viés são avaliados e os resultados documentados) e `MEASURE 2.9` (o modelo é explicado, validado e
documentado, e o seu resultado interpretado em contexto) [1]. A questão de engenharia é o que essas
duas frases se tornam numa terça-feira: qual métrica, calculada em qual segmento, contra qual
limiar, falhando qual construção; qual explicação, produzida por qual método, testada como, entregue
a quem, e mantida como qual registo.

O capítulo mantém a linha da casa do capítulo 01. A IA responsável e a ética da IA estabelecem o
alvo; a engenharia de governação da IA constrói o controlo que o atinge e a evidência que o prova
(ver [o cluster de desambiguação](/bok/definition#the-disambiguation-cluster)). Nada aqui é
aconselhamento jurídico. A lei decide qual disparidade é ilegal e qual explicação é devida; o
engenheiro constrói a medição e a explicação para que o departamento jurídico tenha algo verdadeiro
sobre o qual decidir.

As duas metades pertencem juntas por uma razão prática. A equidade é sobre resultados entre pessoas;
a explicabilidade é sobre as razões para um resultado. Uma explicação é como um indivíduo descobre
que uma decisão foi injusta para ele, e os métodos de atribuição são uma forma de uma equipa
encontrar o substituto que tornou um modelo injusto. Ambas também trocam contra a privacidade: não
pode medir uma disparidade entre um grupo que pode não observar, ou explicar uma decisão sem
divulgar algo sobre os seus dados. A primeira metade cobre equidade, a segunda explicabilidade, e a
última secção coloca ambas nas cinco camadas do [stack](/bok/the-stack#how-to-read-the-stack).

## Onde o viés entra no ciclo de vida

O NIST SP 1270 classifica o viés de IA em três categorias, **sistémico**, **estatístico** e
**humano**, e afirma claramente que «não é possível alcançar risco zero de viés num sistema de IA»
[2]. A consequência para um engenheiro é que a equidade é gerida como qualquer outro risco residual:
nomeado, medido, limitado e monitorizado, nunca declarado resolvido.

Suresh e Guttag dão a perspetiva do ciclo de vida: sete fontes de dano a jusante, espalhadas desde a
recolha de dados até à implantação [3]. Cada uma tem um controlo diferente, portanto o primeiro
trabalho é saber qual é que está a observar.

| Fonte | Onde entra | Falha típica | Controlo e evidência | Camada |
|---|---|---|---|---|
| Viés histórico | O mundo que os dados descrevem | As decisões de contratação passadas codificam a discriminação passada | Auditoria de rótulos; decisão de rerotular ou alterar o alvo, registada na ficha de dados | 02 · 03 |
| Viés de representação | Amostragem | Um grupo é subamostragem, portanto a sua taxa de erro é elevada e ruidosa | Relatório de cobertura por grupo em relação à população de implantação | 02 · 03 |
| Viés de medição | Características e rótulos | Um substituto conveniente representa o alvo real | Revisão de validade do alvo; análise de substitutos | 03 |
| Viés de agregação | Modelação | Um modelo ajustado a grupos com relações diferentes | Desempenho por grupo; termos de interação ou modelos separados | 03 |
| Viés de aprendizagem | Objetivo de treino | Otimizar a perda média compromete um grupo minoritário | Treino com restrição de equidade; curvas de perda por grupo | 03 |
| Viés de avaliação | Referências | O conjunto de teste não se parece com as pessoas servidas | Conjunto de avaliação extraído da população de implantação; métricas segmentadas | 03 |
| Viés de implantação | Utilização em contexto | Uma pontuação construída para um propósito utilizada para outro | Campo de finalidade prevista no registo; monitorização de utilização indevida | 02 · 04 |

O viés de medição merece a maior atenção porque passa em todos os testes de precisão. O caso
canónico é um algoritmo de cuidados de saúde comercial amplamente utilizado que previa *custos* de
cuidados de saúde como substituto da *necessidade* de saúde. Como menos dinheiro foi gasto em
doentes negros no mesmo nível de doença, o modelo era preciso no seu alvo e enviesado na coisa que
importava; corrigir a disparidade teria aumentado a proporção de doentes negros sinalizados para
ajuda extra de 17,7% para 46,5% [4]. Nenhuma métrica de equidade calculada contra o rótulo de custo
teria apanhado. O que apanha é uma revisão de se o rótulo mede a construção sobre a qual a decisão
é, registada antes do treino. O
[caso de pontuação de risco de saúde](/cases/health-risk-score-proxy) lê-o como uma autópsia, e o
[caso de modelo de recrutamento (reportado)](/cases/recruiting-model-reported) faz o mesmo para o
viés histórico nos dados de contratação. O Regulamento da IA da UE escreve esta perspetiva na lei
para sistemas de risco elevado. Os artigos 10(2)(f) e (g) exigem que os dados sejam examinados para
vieses que possam afetar a saúde e segurança, prejudicar direitos fundamentais ou levar a
discriminação proibida, e exigem medidas para os detetar, prevenir e mitigar; os artigos 10(3) e (4)
exigem dados que sejam relevantes, suficientemente representativos e adequados à configuração de
utilização [5]. O artigo 15(4) acrescenta o ciclo de retroalimentação: um sistema que continua a
aprender deve ser construído para reduzir o risco de que resultados enviesados se tornem entradas
futuras [6]. Cada cláusula é um teste que pode executar e um registo que pode manter (ver
[Governação de dados em todo o stack](/bok/the-stack#data-governance-across-the-stack)).

## Características protegidas, substitutos e os dados de que precisa para testar

**Características protegidas** são definidas pelo enquadramento legal, não pelo engenheiro. A lei
federal de emprego dos EUA protege raça, cor, religião, sexo e origem nacional sob o Título VII [7];
a lei de igualdade da UE define discriminação com base em fatores como origem racial ou étnica [8];
o RGPD nomeia categorias especiais de dados pessoais cujo tratamento é restrito [9]. Um sistema
implantado em várias jurisdições precisa da união das listas que se aplicam, registada na política
como dados, não na cabeça de um engenheiro.

Remover o atributo protegido do conjunto de características, por vezes chamado «equidade através do
desconhecimento», não remove o viés. Outras características transportam a mesma informação: código
postal representa etnia, primeiro nome representa sexo e origem, um intervalo de carreira representa
sexo ou deficiência, tipo de dispositivo representa rendimento. Dois testes expõem **substitutos** e
pertencem à suite de avaliação:

- **Prever o atributo protegido.** Treine um pequeno modelo para prever o atributo protegido a
  partir das características candidatas. Se tiver sucesso bem acima do acaso, o conjunto de
  características codifica o atributo e um modelo treinado nele pode discriminar sem nunca o ver.
- **Atribuir e remover.** Utilize atribuição de características (mais adiante neste capítulo) para
  encontrar quais características impulsionam a disparidade, depois meça a disparidade com cada
  característica suspeita removida ou neutralizada.

Ambos os testes precisam do atributo protegido no tempo de avaliação, que é a tensão de privacidade
que todos os programas de equidade encontram. A UE resolveu-a estreitamente. O Omnibus Digital
eliminou o artigo 10(5) e moveu a regra para um novo **artigo 4a**, em vigor desde 27 de julho de
2026 [10]. O artigo 4a(1) permite aos prestadores de sistemas de risco elevado excepcionalmente
tratar categorias especiais de dados pessoais na medida estritamente necessária para deteção e
correção de viés sob os artigos 10(2)(f) e (g); o artigo 4a(2) estende a mesma possibilidade aos
prestadores e responsáveis pela implantação de outros sistemas e modelos de IA e aos responsáveis
pela implantação de sistemas de risco elevado, para vieses que possam afetar a saúde e segurança ou
direitos fundamentais ou levar a discriminação proibida, sob as mesmas condições, enquanto afirma
que não cria obrigação de executar tal deteção [11]. As condições leem-se como uma especificação de
controlo, que é como as construir:

| Condição do art. 4a(1) | Controlo de engenharia | Registo de evidência |
|---|---|---|
| (a) Outros dados, incluindo dados sintéticos ou anonimizados, não funcionariam | Memorando de necessidade comparando as alternativas tentadas | Memorando assinado ligado a partir da ficha de dados |
| (b) Limites de reutilização e segurança de última geração, incluindo pseudonimização | Pseudonimização na ingestão; etiqueta de finalidade aplicada na construção do pipeline | Config do pipeline e veredicto de política |
| (c) Acesso estrito e documentado para pessoas autorizadas sob confidencialidade | Função de acesso com âmbito; registo de acesso | Registo de acesso por consulta |
| (d) Sem transmissão para ou acesso por outras partes | Política de saída como código negando exportação do conjunto etiquetado | Veredictos de política em cada implantação |
| (e) Eliminação uma vez corrigido o viés ou fim da retenção, o que ocorrer primeiro | Retenção como código com um trabalho de eliminação | Evento de eliminação com hash do conjunto de dados |
| (f) Registos do estado de processamento explicando por que o processamento era estritamente necessário | Entrada de registo de processamento gerada a partir do memorando | Versão de registo de processamento |

O artigo fica em cima do RGPD, não em vez dele, portanto a base legal e a AIPD ainda se aplicam (ver
capítulo 19,
[Privacidade e IA](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)). Onde dados
de categoria especial não podem ser utilizados de todo, os substitutos são auto-identificação
voluntária com uma declaração clara de finalidade, testes em painéis consentidos, e atributos
inferidos; os últimos transportam o seu próprio erro e risco legal e precisam da mesma revisão que
qualquer outra utilização dos dados (capítulo 19 sobre
[dados sensíveis inferidos e substitutos](/bok/privacy-and-ai#inferred-and-proxy-sensitive-data)).

## Tratamento disparatado e impacto disparatado

A lei antidiscriminação tem duas doutrinas, e um sistema de IA pode violar qualquer uma.

| Doutrina | Enquadramento dos EUA | Enquadramento da UE | Como se parece num modelo | Primeiro teste |
|---|---|---|---|---|
| **Tratamento disparatado** (discriminação direta) | Utilização intencional ou explícita de uma característica protegida | Tratamento menos favorável com base numa característica protegida numa situação comparável | O atributo protegido, ou um substituto deliberado, é uma característica ou uma regra | Auditoria de características; teste de inversão contrafactual |
| **Impacto disparatado** (discriminação indireta) | Uma prática que causa impacto disparatado e não é relacionada com o trabalho e consistente com necessidade comercial | Um critério aparentemente neutro que coloca um grupo numa desvantagem particular sem justificação objetiva | Características neutras produzem resultados desiguais | Rácios de taxa de seleção; lacunas de taxa de erro |

Na lei de emprego dos EUA, o impacto disparatado é estatutário: uma prática que o causa é ilegal a
menos que seja relacionada com o trabalho e consistente com necessidade comercial, ou onde uma
alternativa menos discriminatória é recusada [7]. O teste da UE para discriminação indireta tem a
mesma forma: um critério aparentemente neutro que desvantaja um grupo é ilegal a menos que
objetivamente justificado por um objetivo legítimo perseguido por meios apropriados e necessários
[8]. Para um engenheiro, «critério neutro» significa «característica», e «justificado» significa
mostrar por que a característica é necessária e que nenhuma alternativa menos discriminatória
funciona aceitavelmente. Essa comparação é uma avaliação, e o seu resultado é evidência.

### A regra dos quatro quintos e o rácio de impacto adverso

O número de triagem mais amplamente utilizado provém das Uniform Guidelines on Employee Selection
Procedures dos EUA de 1978. Uma taxa de seleção para qualquer raça, sexo ou grupo étnico inferior a
quatro quintos (80%) da taxa do grupo com a taxa mais elevada «será geralmente considerada» pelas
agências federais de aplicação da lei como evidência de impacto adverso [12]. A razão entre as duas
taxas é a **razão de impacto adverso (AIR)**.

O mesmo parágrafo contém ressalvas que a maioria dos painéis de controlo omite. Diferenças menores
podem ainda constituir impacto adverso quando são significativas tanto em termos estatísticos como
práticos, e diferenças maiores podem não constituir quando se baseiam em números pequenos e não são
estatisticamente significativas [12]. Portanto, a regra dos quatro quintos é um gatilho para
investigação, não uma marca de aprovação. Um gate que trata 0,81 como verde e 0,79 como vermelho,
sem intervalo de confiança e sem amostra mínima, é a armadilha de Goodhart descrita em
[os limites do eval gate](/bok/definition#the-limits-of-the-eval-gate).

> **Exemplo (ilustrativo)** Um modelo de triagem avança 120 de 400 candidatos do grupo A (uma taxa
> de seleção de 30%) e 45 de 250 do grupo B (18%). A AIR para o grupo B é 18 / 30 = 0,60, bem abaixo
> de 0,8. A avaliação regista as taxas, as contagens, a razão, um intervalo de confiança bootstrap
> para a razão e a origem do atributo protegido, e o gate encaminha o lançamento para revisão em vez
> de falhar ou passar silenciosamente.

O peso legal da regra está a mudar. A partir de 2026-09-24, a aplicação da lei federal dos EUA
afastou-se do impacto desproporcional: em 9 de junho de 2026, o Departamento de Justiça anunciou uma
opinião do Office of Legal Counsel concluindo que as diretrizes de impacto desproporcional da EEOC
são inconstitucionais [13]. A opinião aborda as Uniform Guidelines, é apresentada como implementação
da Ordem Executiva 14281, e segue um plano de aplicação da lei da EEOC que prioriza o tratamento
desproporcional; não é uma decisão judicial, e comentadores observam que litigantes privados e
muitas leis estaduais ainda apoiam reclamações de impacto desproporcional [14]. A conclusão de
engenharia não muda com as variações da aplicação da lei: a razão de impacto adverso permanece o
sinal inicial mais económico de um resultado desigual, e vários regimes ainda o exigem por nome.

A Lei Local 144 de Nova Iorque é o exemplo mais claro. Um empregador pode utilizar uma ferramenta de
decisão de emprego automatizada apenas se tiver sido sujeito a uma auditoria de enviesamento por um
auditor independente no ano anterior; a auditoria deve calcular taxas de seleção ou pontuação e
razões de impacto em categorias de sexo, categorias de raça/etnia e categorias **interseccionais**;
um resumo dos resultados deve ser publicado; e categorias inferiores a 2% dos dados da auditoria
podem ser excluídas [15]. A lei não exige nenhuma ação específica sobre os resultados [15], o que é
exatamente porque a função de engenharia deve anexar um limiar interno e um proprietário: uma razão
de impacto publicada sem nenhum destes é transparência sem controlo.

Dois pontos legais adicionais limitam a correção, não apenas a constatação. O Título VII proíbe
ajustar pontuações ou utilizar diferentes pontos de corte por raça, cor, religião, sexo ou origem
nacional em testes de emprego [7], portanto uma correção pós-processamento que define limiares
específicos por grupo pode ser ilegal nesse contexto. E qualquer mitigação que utilize o atributo
protegido no momento da decisão corre o risco de se tornar discriminação direta sob a lei da UE. As
escolhas de mitigação vão para Assuntos Jurídicos com a evidência de avaliação anexada (ver
[mitigação](#mitigation-before-during-and-after-training) abaixo). O panorama mais amplo dos EUA e
da UE está no capítulo 20,
[Direito existente e IA](/bok/existing-law#fairness-measures-the-law-recognises).

## Métricas de equidade de grupo

Uma **métrica de equidade de grupo** compara uma estatística do comportamento do modelo em grupos.
As cinco que mais importam, na linguagem da investigação que as definiu, estão abaixo. `Ŷ` é a
decisão ou previsão, `Y` o resultado verdadeiro e `A` o grupo.

| Métrica | Mantém-se quando | Iguala | Adequa-se quando | Cuidado com |
|---|---|---|---|---|
| **Paridade demográfica** (paridade estatística) | `P(Ŷ=1 given A=a)` é igual em grupos | Taxas de seleção | A oportunidade deve ser partilhada independentemente do resultado medido; a AIR é a sua forma de razão | Ignora diferentes taxas base; pode ser satisfeita selecionando membros não qualificados de um grupo [16] |
| **Igualdade de oportunidades** | As taxas de verdadeiros positivos são iguais | Benefício para os qualificados | Perder uma pessoa qualificada é o dano principal (contratação, admissões, acesso a cuidados) [17] | Deixa falsos positivos sem restrições |
| **Probabilidades equalizadas** | As taxas de verdadeiros positivos e falsos positivos são ambas iguais | Ambos os tipos de erro | Ambos os erros são custosos [17] | Mais difícil de satisfazer; pode custar precisão para todos os grupos |
| **Paridade preditiva** | A precisão (`P(Y=1 given Ŷ=1)`) é igual | Significado de uma decisão positiva | Uma decisão positiva desencadeia uma ação cujo valor depende de estar correto (encaminhamento de fraude) [18] | Incompatível com taxas de erro iguais quando as taxas base diferem |
| **Calibração dentro de grupos** | Entre pessoas pontuadas `s`, uma fração `s` são positivas, em cada grupo | Significado de uma pontuação | As pontuações são consumidas como probabilidades (preços de crédito, risco clínico) [19] | Uma pontuação calibrada pode ainda produzir taxas de erro muito diferentes |

Duas regras práticas seguem. Comunique diferenças *e* razões, porque uma lacuna absoluta pequena
numa taxa base baixa pode ser uma razão grande e vice-versa [20]. E comunique a métrica com o seu
denominador: uma taxa em 30 pessoas é uma anedota, e a avaliação deve dizê-lo. O catálogo de
ferramentas lista [kits de ferramentas de equidade](/resources/tools#cat-fairness) como exemplos
ilustrativos, não como recomendações.

### Equidade individual e contrafactual

As métricas de grupo podem ser satisfeitas enquanto indivíduos são tratados arbitrariamente dentro
de cada grupo. Duas noções ao nível individual abordam isso. A **equidade individual** exige que
indivíduos semelhantes sejam tratados de forma semelhante, dada uma medida de similaridade
específica da tarefa; a parte difícil, que os seus autores nomeiam, é concordar essa medida [16]. A
**equidade contrafactual** exige que uma decisão seja a mesma no mundo real e num mundo
contrafactual onde o indivíduo pertencia a um grupo diferente, o que necessita de um modelo causal
explícito de como o atributo influencia as outras características [21].

Nenhuma é geralmente calculada exatamente em produção, mas ambas têm uma aproximação barata e útil:
o **teste de inversão contrafactual**. Altere apenas o atributo protegido, ou os seus marcadores
textuais (um nome, um pronome, um dialeto), mantenha tudo o resto fixo, e meça com que frequência a
decisão ou o texto gerado muda. Para sistemas baseados em LLM, esta é a avaliação de equidade mais
prática disponível, porque os rótulos de grupo para saídas raramente existem enquanto as instruções
emparelhadas são fáceis de gerar.

## Os resultados de impossibilidade

Dois artigos de 2016 e 2017 transformaram «qual métrica de equidade?» de uma questão técnica numa
escolha de valores. Kleinberg, Mullainathan e Raghavan formalizaram três condições (calibração
dentro de grupos e equilíbrio de pontuações para a classe positiva e para a classe negativa) e
provaram que, exceto em casos especiais altamente restritos, nenhum método pode satisfazer todas as
três simultaneamente [19]. Chouldechova mostrou que quando a prevalência do resultado difere entre
grupos, um instrumento não pode satisfazer paridade preditiva e taxas de erro iguais
simultaneamente, e que o impacto desproporcional pode surgir quando o equilíbrio de taxa de erro
falha [18]. Os casos especiais são previsão perfeita e taxas base iguais, e as implementações reais
raramente têm nenhuma delas.

> **Exemplo (ilustrativo)** Dois grupos de 1.000 pessoas. O grupo A tem uma taxa base de 30% (300
> positivos), o grupo B uma taxa base de 10% (100 positivos). Um classificador com a mesma taxa de
> verdadeiros positivos (0,8) e taxa de falsos positivos (0,1) em ambos os grupos satisfaz
> probabilidades equalizadas. No grupo A produz 240 verdadeiros positivos e 70 falsos positivos (0,1
> × 700), uma precisão de 240 / 310 = 0,77. No grupo B produz 80 verdadeiros positivos e 90 falsos
> positivos (0,1 × 900), uma precisão de 80 / 170 = 0,47. Taxas de erro iguais, significado desigual
> de uma decisão positiva: a paridade preditiva falha, e nenhuma escolha de limiar corrige ambas
> enquanto as taxas base diferem.

A consequência de engenharia é processual. Porque as métricas entram em conflito, a escolha entre
elas é uma decisão de governação com um proprietário, tomada *antes* de os resultados serem vistos e
registada como política. Uma equipa que escolhe a métrica depois de ver qual a que o seu modelo
passa é compra de métricas, e o registo deve tornar isso impossível: a métrica escolhida, a razão, o
limiar e o aprovador vivem num [Policy Card](/patterns/policy-card) versionado que a avaliação lê.

## Testes interseccionais e de subgrupo

As métricas de grupo agregadas ocultam as pessoas nas intersecções. A auditoria Gender Shades de
três classificadores comerciais de género encontrou taxas de erro até 34,7% para mulheres de pele
mais escura contra um máximo de 0,8% para homens de pele mais clara [22]; um relatório por género
sozinho, ou por tipo de pele sozinho, faz a média do grupo pior servido num maior. Kearns e colegas
nomearam a falha geral **gerrymandering de equidade**: um classificador pode parecer justo em cada
grupo predefinido e ainda violar gravemente a restrição em subgrupos estruturados definidos sobre os
atributos protegidos [23]. As fichas de modelo foram propostas em parte para comunicar avaliação em
grupos demográficos e interseccionais [24], e as auditorias de enviesamento de Nova Iorque agora
exigem categorias interseccionais [15].

Os testes interseccionais encontram números pequenos rapidamente, portanto a avaliação precisa de
regras para eles:

- **Um tamanho mínimo de célula** na política; abaixo dele a avaliação comunica «dados
  insuficientes», lista a célula e nunca a conta como uma aprovação.
- **Intervalos de confiança** em cada taxa e razão, com o gate no intervalo, não no ponto.
- **Uma correção de comparação múltipla declarada**, porque com dezenas de células algumas falham
  por acaso.
- **Uma busca pela pior fatia**, por exemplo uma árvore rasa ajustada ao indicador de erro, para
  encontrar subgrupos que ninguém listou; a métrica do pior grupo é comunicada ao lado da média.

## Escolher uma métrica de equidade por caso de uso

A métrica segue o dano, e o dano segue o caso de uso. O guia do utilizador do Fairlearn separa
**danos de alocação** (um sistema estende ou nega oportunidades, recursos ou informações) de
**danos de qualidade de serviço** (um sistema funciona menos bem para algumas pessoas mesmo quando
nada é negado) e **danos de estereótipo** [20]. Adicione o custo de cada tipo de erro e o
enquadramento legal, e a escolha estreita. O custo de cada tipo de erro é o
[apetite de erro](/bok/governing-development#error-appetite-false-positives-versus-false-negatives)
do registo do caso de uso (capítulo 14).

| Caso de uso | Tipo de dano | Erro mais custoso | Métrica primária | Verificações secundárias | Enquadramento legal |
|---|---|---|---|---|---|
| Triagem de CV, promoção | Alocação | Rejeitar um candidato qualificado | Taxa de seleção AIR; igualdade de oportunidades | AIR interseccional; análise de proxy | Title VII, Uniform Guidelines, NYC LL144; Regulamento da IA Anexo III ponto 4 |
| Aprovação de crédito e preços | Alocação | Ambos: negação indevida e crédito inacessível | Calibração dentro de grupos; taxa de aprovação AIR | Lacunas nas taxas de erro; consistência de códigos de razão | ECOA e Regulation B, FCRA; Regulamento da IA Anexo III ponto 5(b) |
| Elegibilidade e recuperação de benefícios | Alocação (punitiva ao reclamar) | Corte ou reclamação indevida de benefício | Paridade de taxa de falsos positivos | Paridade preditiva; resultados de apelação por grupo | Lei de igualdade; RGPD Art. 22; Regulamento da IA Anexo III ponto 5(a) |
| Triagem clínica | Alocação (baseada em necessidade) | Não identificar uma pessoa em necessidade | Igualdade de oportunidades; calibração | Revisão de validade de rótulo (custo versus necessidade) | Lei de dispositivos médicos e igualdade |
| Fala, visão, pesquisa de documentos | Qualidade de serviço | Falha para um grupo de utilizadores | Taxa de erro do pior grupo | Erro interseccional | Acessibilidade e lei de igualdade |
| Assistente generativo | Qualidade de serviço; estereotipagem | Resultado degradado ou demeritório para um grupo | Taxa de inversão contrafactual; piso de qualidade por grupo | Sondas de estereótipo; lacunas na taxa de recusa | Lei de igualdade e consumidor |

Os pontos do Anexo III são os casos de uso de risco elevado do Regulamento da IA para emprego (ponto
4), benefícios de assistência pública (ponto 5(a)) e solvabilidade e pontuação de crédito (ponto
5(b)), que expressamente exclui sistemas utilizados para detetar fraude financeira [25]. A tabela é
um ponto de partida, não uma regra. O que torna a escolha defensável é que está escrita com as suas
razões antes da avaliação ser executada, revista por alguém que representa as pessoas afetadas (o
padrão [FRIA-as-Code](/patterns/fria-as-code) é onde essa revisão reside), e revisitada quando o
caso de uso muda.

## Mitigação antes, durante e após o treino

Uma vez encontrada uma disparidade e julgada inaceitável, as correções dividem-se em três famílias
pelo local onde atuam. Kits de ferramentas abertos implementam muitas delas; AI Fairness 360 inclui
métricas de conjunto de dados e modelo e algoritmos de mitigação [26], Fairlearn fornece avaliação e
mitigação com um enquadramento sociotécnico explícito [27], e Aequitas centra-se na auditoria entre
subgrupos [28]. São nomeadas como exemplos de uma categoria, não como recomendações.

| Fase | Técnicas (exemplos) | O que muda | Evidência a manter | Precaução |
|---|---|---|---|---|
| **Pré-processamento** | Recolher dados melhores; reponderar ou reamostrar grupos sub-representados; relabeling após auditoria de rótulo; transformar características para remover informação de proxy | Os dados de treino | Diferença de ficha de dados; relatório de cobertura antes/depois | Frequentemente a correção mais durável; a repondeção pode sobreajustar grupos pequenos |
| **Processamento em curso** | Otimização com restrição de equidade; regularizadores em lacunas de grupo; desvio adversarial | O objetivo de aprendizagem | Configuração de treino; curvas de perda por grupo; a restrição e o seu limite | Necessita do atributo no momento do treino (ver Art. 4a) |
| **Pós-processamento** | Limiares específicos de grupo [17]; revisão de opção de rejeição perto do limite | A regra de decisão | Tabela de limiar; versão da regra de decisão | Os pontos de corte específicos de grupo podem ser ilegais em testes de emprego nos EUA [7] e arriscam discriminação direta na UE |

Três regras aplicam-se a todas as mitigações. Executar novamente a suite completa, incluindo
precisão por grupo, porque uma correção pode "igualar" tornando todos piores. Registar a mitigação
como uma mudança com um proprietário e uma razão, para que a ficha de modelo explique o
comportamento. E preferir a correção mais cedo que funciona: dados melhores superam uma restrição
inteligente, e uma restrição supera um patch de limiar.

## Monitorização de equidade em produção

Uma avaliação de equidade prova que o modelo era aceitável nos dados de avaliação no momento da
construção. A produção traz novas pessoas, populações deslocadas e rótulos atrasados. A
monitorização preenche a lacuna com sinais que não necessitam de verdade fundamental imediatamente:

- **Taxas de seleção ou aprovação por grupo** e o seu AIR, numa janela móvel, comparadas com a linha
  de base de avaliação. Estas não necessitam de rótulo de resultado.
- **Calibração e taxas de erro por grupo** uma vez que os resultados chegam, com o atraso de rótulo
  indicado.
- **Sinais de supervisão humana por grupo**: taxas de sobreposição, tempo para decidir e taxas de
  reversão no [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Um revisor que sobrepõe um
  grupo mais frequentemente é um sinal de equidade sobre o modelo ou sobre o revisor.
- **Reclamações, apelações e pedidos de explicação por grupo**, incluindo os seus resultados. O
  [canal de contestação](/patterns/decision-notice-contest-path) é um sensor.
- **Verificações de ciclo de retroalimentação** para sistemas cujos resultados moldam dados de
  treino futuro, que o Artigo 15(4) exige que sistemas de risco elevado que continuam a aprender
  abordem [6].

O atributo de grupo está geralmente ausente no tempo de execução. As opções são uma amostra
consentida ou painel em que o atributo é conhecido, auditorias periódicas sob as condições do Artigo
4a (os responsáveis pela implantação de sistemas de risco elevado enquadram-se no Artigo 4a(2)
[11]), ou monitorização apenas das taxas livres de resultado com o atributo associado num ambiente
seguro. Qualquer que seja escolhido, o [monitor](/patterns/drift-fairness-monitor) é um sinal de
camada 04 transmitido para a camada 05 através de
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry), e uma violação abre um
bilhete com um proprietário, não um gráfico que ninguém lê. Uma disparidade que causou dano é um
incidente e segue o capítulo 17,
[Incidents](/bok/incidents#incident-hazard-issue-and-serious-incident).

## Transparência, interpretabilidade e explicabilidade

As três palavras são utilizadas indistintamente e não devem ser. O enquadramento do NIST traça a
linha numa frase cada: transparência responde "o que aconteceu" no sistema, explicabilidade responde
"como" uma decisão foi tomada, e interpretabilidade responde "porquê" foi tomada e o que significa
para o utilizador em contexto [1]. O capítulo 11 nomeia as três fontes de opacidade entre
[os traços da IA que quebram a governação clássica de TI](/bok/ai-defined#eight-characteristics-that-break-classic-it-governance).

| Termo | Pergunta que responde | Artefato típico | Público primário | Camada |
|---|---|---|---|---|
| **Transparência** | O que é este sistema, que dados e modelo utiliza, o que pode e não pode fazer? | Ficha de modelo, ficha de dados, AIBOM, instruções de utilização, aviso de utilização de IA | Responsáveis pela implantação, auditores, o público | 02 |
| **Explicabilidade** | Como é que o sistema chegou a este resultado? | Registo de explicação por decisão; atribuição; códigos de razão | Operadores, pessoas afetadas, revisores | 03 · 04 |
| **Interpretabilidade** | Porquê é que este resultado significa o que significa, aqui? | Um modelo cuja estrutura uma pessoa pode ler; orientação de interpretação | Proprietários de modelo, validadores, especialistas de domínio | 03 |

NIST IR 8312 adiciona quatro princípios que um sistema que deve ser explicável deve cumprir: fornece
**explicação** (evidência ou razões para resultados), a explicação é **significativa** para o seu
consumidor pretendido, tem **precisão de explicação** (reflete corretamente como o resultado foi
produzido), e o sistema respeita **limites de conhecimento** (opera apenas onde foi concebido para e
com confiança suficiente) [29]. O terceiro princípio é o mais frequentemente quebrado, e aquele a
que este capítulo volta sob testes.

## Interpretável por conceção ou explicado após o facto

Existem duas rotas para uma explicação. Um modelo **inerentemente interpretável** é aquele cuja
estrutura é a explicação: um modelo linear ou logístico esparso, um scorecard baseado em pontos, um
modelo aditivo generalizado, uma árvore de decisão rasa ou uma lista de regras curta. Uma explicação
**post-hoc** é produzida por um segundo método que aproxima o comportamento de um modelo que não é
em si legível.

O argumento de Rudin é que para decisões de alto risco esta escolha não é neutra: explicar uma caixa
negra em vez de utilizar um modelo interpretável "é provável que perpetue más práticas", porque uma
explicação post-hoc é um modelo do modelo, e pode estar errada sobre ele [30]. A forma prática desse
argumento é uma regra de conceção. Treinar primeiro uma linha de base interpretável. Se o modelo
complexo não a supera por uma margem que importa para a decisão, enviar o interpretável; se supera,
registar a margem, a razão pela qual o ganho justifica o risco de explicação, e o método post-hoc
que será utilizado, no registo de decisão de conceção (capítulo 14,
[Governing development](/bok/governing-development#architecture-and-model-selection-trade-offs)).

### Quando um modelo interpretável é necessário

Nenhum estatuto neste capítulo diz "utilizar um scorecard". Vários dizem coisas que são difíceis de
cumprir de qualquer outra forma. Um modelo interpretável é o padrão quando a maioria dos seguintes
se mantém:

- **A decisão tem efeitos legais ou similarmente significativos numa pessoa** (crédito, emprego,
  benefícios, seguro, educação), portanto as razões são devidas por lei.
- **As razões devem ser os fatores realmente utilizados.** Regulation B exige que as razões de ação
  adversa se relacionem com os fatores realmente considerados ou pontuados [57]; uma aproximação
  post-hoc pode desviar-se.
- **Os dados são tabulares com características significativas**, onde modelos interpretáveis são
  frequentemente competitivos.
- **Validadores ou reguladores devem reproduzir a lógica**, como na gestão de risco de modelo.
- **A pessoa deve ser capaz de agir sobre a explicação**, o que necessita de fatores estáveis e
  compreensíveis.

Onde estes se mantêm e um modelo complexo é ainda escolhido, o gate deve exigir a evidência mais
forte: testes de precisão de explicação, testes de estabilidade de código de razão e uma
justificação assinada.

## Técnicas de explicação

As explicações variam ao longo de dois eixos: **âmbito** (uma explicação *global* descreve o
comportamento geral do modelo; uma *local* explica um único resultado) e **acesso** (um método
*agnóstico de modelo* necessita apenas de entradas e saídas; um *específico de modelo* utiliza os
internos do modelo). O catálogo de ferramentas lista
[bibliotecas de explicabilidade](/resources/tools#cat-explainability) como exemplos ilustrativos,
não recomendações.

| | Global | Local |
|---|---|---|
| **Agnóstico de modelo** | Modelos substitutos globais; importância de características de permutação; dependência parcial | LIME; KernelSHAP; explicações contrafactuais; explicações de exemplo mais próximo |
| **Específico de modelo** | Coeficientes de um modelo interpretável; estrutura de árvore; sondagem de representações internas | TreeSHAP; gradientes integrados e outras atribuições de gradiente; análise de atenção ou circuito (pesquisa) |

### Atribuição de características: SHAP, LIME e gradientes integrados

A **atribuição de características** atribui a cada característica de entrada uma quota de
responsabilidade por uma saída. **SHAP** (SHapley Additive exPlanations) atribui a cada
característica um valor de importância para uma previsão particular, fundamentado em valores de
Shapley da teoria dos jogos, e unifica vários métodos anteriores como medidas de atribuição de
características aditivas [32]. **LIME** explica uma previsão individual ajustando um modelo simples
e interpretável ao comportamento da caixa negra em amostras perturbadas em torno dessa entrada [33].
**Integrated gradients** atribui a previsão de uma rede profunda acumulando gradientes ao longo de
um caminho de uma entrada de referência até à entrada real, e foi concebido para satisfazer dois
axiomas, sensibilidade e invariância de implementação, que muitos métodos de atribuição não
conseguem satisfazer [34].

Cada um tem modos de falha que a suite de avaliação deve testar em vez de ignorar:

- **Características correlacionadas.** O crédito é dividido entre características correlacionadas de
  acordo com os pressupostos do método, pelo que dois proxies para a mesma coisa podem parecer
  menores.
- **Referências.** SHAP e integrated gradients explicam em relação a uma referência; altere-a e a
  explicação muda, portanto a referência faz parte do artefato.
- **Perturbações fora da variedade.** Slack e colegas construíram um classificador estruturado cujas
  previsões mantêm viés enquanto as explicações LIME e SHAP parecem inócuas [35]. As explicações
  podem ser manipuladas.
- **Métodos que ignoram o modelo.** Alguns métodos de saliência produzem explicações independentes
  tanto do modelo como dos dados, pelo que a plausibilidade visual não é evidência de precisão [36].

### Modelos substitutos

Um **modelo substituto global** é um modelo interpretável (uma árvore, uma lista de regras) treinado
para imitar as previsões do modelo complexo. É útil para revisão e documentação, e é tão bom quanto
a sua **fidelidade**: a quota de entradas em que concorda com o modelo que descreve. Um modelo
substituto reportado sem a sua fidelidade na população de implantação é um diagrama, não evidência.

### Explicações contrafactuais

Uma **explicação contrafactual** indica a alteração mais pequena à entrada que teria mudado o
resultado, por exemplo (ilustrativo) "se o seu rendimento mensal declarado tivesse sido 400
superior, a candidatura teria sido aprovada". Wachter, Mittelstadt e Russell argumentaram que tais
explicações podem ajudar um titular dos dados a compreender, contestar e agir sobre uma decisão sem
abrir a caixa negra [37]. São o ajuste natural para **recourse**, e mapeiam-se de perto com o que o
Tribunal de Justiça pediu desde então aos responsáveis pelo tratamento (ver os ganchos legais
abaixo).

Os contrafactuais precisam de restrições de engenharia para serem honestos e úteis. Restrinja as
alterações a características que a pessoa pode realmente alterar (nunca idade, origem ou
deficiência); respeite as dependências causais entre características; prefira alterações plausíveis
e escassas; e verifique que o contrafactual é estável, para que dois candidatos quase idênticos não
recebam conselhos opostos. Um contrafactual que recomenda alterar uma característica protegida é uma
descoberta de equidade, não uma explicação.

### Explicações baseadas em exemplos

As **explicações baseadas em exemplos** mostram protótipos, os exemplos de treino mais próximos ou
os exemplos que mais influenciaram uma previsão. São intuitivas para imagens e documentos e para
revisores especialistas. Também divulgam dados de treino: mostrar um caso anterior semelhante pode
revelar dados pessoais de outra pessoa, pelo que o método precisa da mesma revisão de privacidade
que qualquer libertação de dados.

### Explicações para LLMs e sistemas RAG

Os modelos de linguagem de grande escala adicionam duas complicações. Primeiro, a própria conta do
modelo sobre o seu raciocínio não é uma explicação no sentido NIST de precisão de explicação. O
texto de cadeia de pensamento pode representar sistematicamente de forma incorreta a verdadeira
razão para uma previsão: quando os modelos foram influenciados por características que nunca
mencionaram, produziram racionalizações plausíveis, com a precisão a cair até 36% nas tarefas
afetadas [38]. Uma justificação gerada é uma saída a ser avaliada, não uma janela para o modelo.

Segundo, a **interpretabilidade mecanística**, o programa de investigação que tenta fazer engenharia
reversa das computações dentro de uma rede, fez progressos visíveis mas, segundo a conta dos seus
próprios investigadores, ainda enfrenta problemas conceptuais e práticos abertos antes de muitos dos
seus benefícios poderem ser realizados [39]. A partir de 2026-09-24, trate-a como uma entrada de
investigação para red-teaming e casos de segurança, não como uma fonte de explicações por decisão
que uma organização possa entregar a uma pessoa afetada ou a um auditor.

Para geração aumentada por recuperação, a explicação prática é a **citação**: quais as passagens
recuperadas que suportam quais as frases. As citações são tão boas quanto o seu suporte. Uma
auditoria de quatro motores de pesquisa generativos descobriu que em média 51,5% das frases geradas
foram totalmente suportadas pelas suas citações e 74,5% das citações suportaram a sua frase [40].
Portanto, um artefato de explicação RAG precisa das suas próprias avaliações: precisão de citação
(cada passagem citada suporta a sua afirmação?), recall de citação (cada afirmação é citada?), e
fundamentação, todas executadas na camada 03, mais um rastreio na camada 04 que armazena o snapshot
do corpus e identificadores de passagem por trás de cada resposta para que a citação possa ser
re-verificada mais tarde.

## Os ganchos legais para explicações

Os deveres de explicação vêm de vários regimes que diferem em quem deve o quê, a quem e quando. A
tabela encaminha o trabalho; as subsecções adicionam o que importa para a construção. Os capítulos
18 a 20 ([O Regulamento da IA da UE](/bok/eu-ai-act#explanation-and-notice-to-affected-people),
[Privacidade e IA](/bok/privacy-and-ai#gdpr-article-22-after-schufa),
[Lei existente e IA](/bok/existing-law#credit-and-lending)) dão o quadro legal completo.

| Instrumento | Quem o deve | Desencadeador | O que deve ser dado | Artefato |
|---|---|---|---|---|
| ECOA e Regulamento B, 12 CFR 1002.9 | Credor | Ação adversa numa candidatura de crédito ou conta | Declaração de razões principais específicas [31] | Serviço de código de razão; modelo de aviso; registo de decisão |
| FCRA, 15 U.S.C. 1681m e 1681g(f) | Utilizador de um relatório de consumidor | Ação adversa baseada no relatório | Aviso, pontuação de crédito utilizada e até quatro fatores principais [41] | Registo de pontuação e fatores principais |
| RGPD Arts. 13(2)(f), 14(2)(g), 15(1)(h) | Responsável pelo tratamento | Decisão automatizada sob Art. 22(1) e (4) | Informação significativa sobre a lógica envolvida, o significado e as consequências previstas [9] | Aviso ao nível do sistema; explicação por pedido |
| RGPD Art. 22(3) | Responsável pelo tratamento | Decisão unicamente automatizada com efeito legal ou igualmente significativo, em contrato ou consentimento | Intervenção humana, a oportunidade de expressar uma opinião e de contestar [9] | Canal de contestação; registo de revisão |
| RGPD do Reino Unido Arts. 22A–22D | Responsável pelo tratamento | Decisão significativa baseada unicamente em processamento automatizado | Informação, representações, intervenção humana, contestação [42] | Mesmo, variante do Reino Unido |
| Regulamento da IA Art. 13 | Prestador (para responsáveis pela implantação) | Sistema de risco elevado | Instruções de utilização que permitem aos responsáveis pela implantação interpretar a saída [43] | Instruções de utilização; ficha de método de explicação |
| Regulamento da IA Art. 86 | Responsável pela implantação | Decisão baseada num sistema do Anexo III (exceto ponto 2) com efeito adverso legal ou igualmente significativo | Explicação clara e significativa do papel do sistema de IA e dos elementos principais da decisão [44] | Fluxo de trabalho de pedido de explicação; registo de explicação |

### Crédito: avisos de ação adversa e códigos de razão

A lei de crédito dos EUA é o regime de explicação mais antigo e mais concreto. O Regulamento B exige
que as razões para ação adversa sejam específicas e indiquem as razões principais; dizer apenas que
o candidato não cumpriu normas internas ou uma pontuação de qualificação é insuficiente [31]. O
comentário oficial adiciona o detalhe de engenharia: mais de quatro razões não é provável que seja
útil; as razões devem relacionar-se com e descrever com precisão os fatores realmente considerados
ou pontuados; nenhuma razão principal pode ser omitida; e nenhum método de seleção único é
necessário, com dois métodos de referência que comparam a pontuação do candidato em cada fator
contra pontuações médias [57]. Quando a ação repousa num relatório de consumidor, o FCRA adiciona a
pontuação de crédito utilizada e até quatro fatores principais [41].

As duas circulares do CFPB aplicando estes deveres a algoritmos complexos e a formulários de razão
de amostra foram retiradas em 12 de maio de 2025 [45]; a partir de 2026-09-24 o regulamento e o seu
comentário ainda carregam o dever. Portanto, um serviço de **código de razão** mapeia cada fator
principal que o modelo realmente utilizou para uma razão estável e legível por humanos, versionada
com o modelo, e um teste mostra que as razões dadas para uma amostra de recusas correspondem aos
fatores que as impulsionaram. Se o modelo é demasiado complexo para esse teste passar, o modelo é o
problema, não o aviso.

### Proteção de dados: RGPD e regime do Reino Unido

Os artigos do RGPD não utilizam as palavras "direito à explicação"; o Considerando 71 menciona obter
"uma explicação da decisão tomada", e os Artigos 13 a 15 exigem informação significativa sobre a
lógica envolvida quando o processamento automatizado do Artigo 22 ocorre [9]. O Tribunal de Justiça
tornou isso concreto. Em *SCHUFA* (C-634/21, 7 de dezembro de 2023) decidiu que gerar uma pontuação
de crédito pode ser em si uma decisão do Artigo 22(1) quando um terceiro se baseia fortemente nela
[46], pelo que o prestador de pontuação, não apenas o credor, pode dever as salvaguardas. Em *Dun &
Bradstreet Austria* (C-203/22, 27 de fevereiro de 2025) decidiu que o responsável pelo tratamento
deve explicar o procedimento e os princípios realmente aplicados, que uma fórmula matemática
complexa não cumpre o dever, e que os segredos comerciais vão para a autoridade ou tribunal para um
equilíbrio caso a caso em vez de justificar recusa [47]. O Tribunal acrescentou que, para definição
de perfis, o tribunal nacional poderia considerar suficientemente transparente e inteligível dizer
ao titular dos dados até que ponto uma variação nos dados pessoais tidos em conta teria levado a um
resultado diferente (para. 62) [47][48]: uma explicação contrafactual em linguagem legal.

No Reino Unido, a Lei de Dados (Utilização e Acesso) de 2025 substituiu o Artigo 22 pelos Artigos
22A a 22D, que tratam uma decisão como unicamente automatizada quando não há envolvimento humano
significativo e exigem salvaguardas para informar o titular dos dados, aceitar representações,
fornecer intervenção humana e permitir contestação [42]. A orientação co-marcada do ICO com The Alan
Turing Institute sobre explicação de decisões de IA está sob revisão como resultado a partir de
2026-09-24; os seus seis tipos de explicação (justificação, responsabilidade, dados, equidade,
segurança e desempenho, impacto) permanecem uma lista de verificação útil [49]. Na UE, o omnibus
digital mais amplo da Comissão propôs reescrever o Artigo 22; um primeiro compromisso do Conselho
abandonou essa alteração, e a partir de 2026-09-24 as alterações do RGPD não foram adotadas [50]
(verifique antes de confiar no texto atual).

### O Regulamento da IA da UE: Artigos 13 e 86

O Regulamento da IA acrescenta uma obrigação a montante e outra a jusante. O Artigo 13 exige que os
sistemas de risco elevado sejam suficientemente transparentes para que os responsáveis pela
implantação possam interpretar o resultado e utilizá-lo adequadamente, com instruções de utilização
que sejam «relevantes, acessíveis e compreensíveis para os responsáveis pela implantação» e que
cubram as capacidades técnicas do sistema para fornecer informações relevantes para explicar o seu
resultado, o seu desempenho para as pessoas ou grupos em que se destina a ser utilizado, e as
medidas técnicas que ajudam os responsáveis pela implantação a interpretar os resultados [43]. O
artefato do prestador é uma ficha de método de explicação enviada com as instruções: método, linha
de base, limites conhecidos, fidelidade e desempenho ao nível do grupo.

O Artigo 86 confere a uma pessoa sujeita a uma decisão de um responsável pela implantação baseada
num sistema de risco elevado do Anexo III (exceto infraestrutura crítica, ponto 2), com efeitos
adversos legais ou igualmente significativos na sua saúde, segurança ou direitos fundamentais, o
direito a «explicações claras e significativas do papel do sistema de IA no procedimento de tomada
de decisão e dos elementos principais da decisão tomada» [44]. Aplica-se apenas quando o direito não
é já fornecido pela legislação da União [44], pelo que os Artigos 15.º(1)(h) e 22.º do RGPD têm
prioridade quando se aplicam. Os responsáveis pela implantação devem também informar as pessoas de
que estão sujeitas ao sistema [51]. O Omnibus Digital deslocou as principais obrigações do Anexo III
para 2 de dezembro de 2027 [10]; se o início prático do Artigo 86 acompanha essa data deve ser
confirmado com assessoria jurídica (verificar). A construção não precisa de esperar: um registo de
explicação, descrito abaixo, serve o Artigo 86, o Artigo 15.º(1)(h) e um aviso de ação adversa.

## Testagem da qualidade da explicação

Uma explicação é um resultado, portanto recebe avaliações como qualquer outro resultado. A taxonomia
de Doshi-Velez e Kim oferece três níveis de evidência, em custo crescente: testes
**funcionalmente fundamentados** sem humanos (métricas proxy), testes **fundamentados em humanos**
com pessoas leigas em tarefas simplificadas, e testes **fundamentados na aplicação** com os
utilizadores reais na tarefa real [52]. Uma suite prática mistura os três.

| Teste | O que verifica | Nível | Exemplo de condição de gate (ilustrativo) |
|---|---|---|---|
| **Fidelidade** | A explicação reflete o modelo (precisão de explicação NIST [29]): eliminar as características mais atribuídas altera o resultado mais do que eliminar aleatoriamente | Funcional | A área da curva de eliminação supera aleatório por uma margem definida no conjunto de validação |
| **Estabilidade** | Entradas quase idênticas recebem explicações e códigos de razão quase idênticos | Funcional | Sobreposição de top-k razões acima de um limiar sob pequenas perturbações |
| **Sanidade** | A explicação muda quando o modelo é aleatorizado [36] | Funcional | Similaridade de explicação após aleatorização de pesos abaixo de um limiar |
| **Resistência à manipulação** | Sondagem fora da variedade não consegue ocultar um enviesamento conhecido [35] | Funcional | Modelo de teste de enviesamento plantado é detetado pelo método de explicação |
| **Consistência do código de razão** | Os códigos de razão correspondem aos fatores que realmente impulsionaram a decisão [57] | Funcional | 100% das recusas amostradas têm razões extraídas de fatores pontuados |
| **Validade contrafactual** | A mudança sugerida inverte a decisão e utiliza apenas características mutáveis | Funcional | Todos os contrafactuais amostrados válidos e acionáveis |
| **Compreensão** | O público-alvo pode indicar a razão principal e o que poderia mudar | Fundamentado em humanos | Uma maioria de um painel de teste responde corretamente a ambas as questões |
| **Apoio à decisão** | Os revisores com explicações decidem melhor, não apenas mais rápido, e não são levados para enviesamento de automação | Fundamentado na aplicação | Precisão de sobreposição com explicações pelo menos igual a sem |

As últimas duas linhas são as que as equipas saltam e as que a lei se importa: uma explicação deve
ser **significativa** para a pessoa que a recebe [29]. Teste o aviso com pessoas semelhantes aos
seus destinatários, incluindo pessoas com baixa literacia na sua língua e pessoas que utilizam
tecnologia de apoio, e mantenha o protocolo e os resultados como evidência. Para revisores, combine
isto com [Designing human oversight](/bok/the-stack#designing-human-oversight-article-14): uma
explicação que faz os revisores concordarem mais rapidamente com um modelo errado é uma falha de
controlo.

## Explicações acessíveis

Uma explicação que o destinatário não consegue perceber ou compreender falha o teste «significativa»
seja qual for a sua fidelidade. O Regulamento da IA pede instruções de utilização que sejam
«relevantes, acessíveis e compreensíveis para os responsáveis pela implantação» [43] e exige que os
prestadores de sistemas de risco elevado cumpram os requisitos de acessibilidade da UE das Diretivas
(UE) 2016/2102 e 2019/882 [53]. WCAG 2.2 fornece os critérios testáveis para o canal digital [54].
Na prática:

- **Texto em primeiro lugar.** Cada gráfico de atribuição (uma cascata SHAP, um mapa de saliência)
  tem um equivalente em texto que indica os fatores principais em palavras (critério de sucesso WCAG
  1.1.1, conteúdo não textual).
- **Nunca apenas cor.** As contribuições positivas e negativas são marcadas por sinal e rótulo, não
  apenas vermelho e verde (1.4.1, utilização de cor).
- **Linguagem simples.** Os códigos de razão são escritos para o destinatário, não para o cientista
  de dados; procure um nível de leitura de ensino secundário inferior quando o público é o público
  em geral (3.1.5, nível de leitura, um critério de nível AAA utilizado aqui como alvo).
- **Detalhe em camadas.** Uma razão de uma frase, depois os fatores principais, depois como
  contestar, depois o anexo técnico para quem perguntar.
- **Mais de um canal.** A mesma explicação está disponível em papel, por telefone ou pessoalmente
  para pessoas que não utilizam o canal digital.

## Artefatos de explicação como registos de evidência

Uma explicação entregue e não mantida não pode ser auditada, reproduzida ou defendida. A unidade de
evidência é o [**registo de explicação**](/patterns/explanation-artefact): um objeto estruturado por
decisão explicada, escrito no momento da decisão pelo tempo de execução (camada 04), associado ao
mesmo id de registo que qualquer outro artefato, e retido pela obrigação que serve.

> **Exemplo (ilustrativo)** Um registo de explicação para uma aplicação de financiamento de
> dispositivo recusada:
>
> ```json
> { "decision_id": "dfc-2026-09-18-004211", "subject": "credit-dfc@2026-09-01",
>   "outcome": "decline", "method": "treeshap", "method_version": "0.46",
>   "baseline": "bg-sample.v12", "fidelity_check": "pass",
>   "reason_codes": ["R07 debt-to-income", "R12 recent missed payments"],
>   "counterfactual": { "feature": "monthly_debt", "change": "-180", "result": "approve" },
>   "template": "adverse-action.en.v5", "audience": "applicant",
>   "delivered": "2026-09-18T10:02:13Z", "channel": "email+letter",
>   "contest_url_ref": "appeal-flow.v3" }
> ```

O registo torna três coisas verdadeiras. A explicação é reproduzível, porque a versão do modelo, o
método, a sua versão e a linha de base são fixados. É verificável, porque os códigos de razão podem
ser re-derivados e comparados. E é reutilizável, porque o mesmo registo responde a um aviso de
Regulamento B, um pedido de acesso do Artigo 15.º(1)(h), um pedido do Artigo 86 e um recurso
interno. Os registos de explicação fluem para a camada 05 com o resto da evidência, onde um auditor
pode perguntar «mostre-me cada recusa em agosto cujos códigos de razão diferem de uma recomputação
fresca» e obter uma consulta, não um projeto.

## Equidade e explicabilidade na stack

Ambas as disciplinas produzem evidência em cada camada. A tabela é a lista de verificação; cada
linha nomeia o artefato, não a aspiração.

| Camada | Artefato de equidade | Artefato de explicabilidade | Padrão |
|---|---|---|---|
| **01 Govern-as-Code** | Política de equidade como dados: atributos protegidos por jurisdição, métrica escolhida e razão, limiares, tamanho mínimo de célula, aprovador | Política de explicação: tipos de explicação necessários por caso de uso, regra interpretável por defeito, limites de código de razão | [Policy Card](/patterns/policy-card) |
| **02 Inventory & Transparency** | Ficha de dados com cobertura por grupo e base do Art. 4a; ficha de modelo com métricas desagregadas e interseccionais | Instruções de utilização e ficha de método de explicação (método, linha de base, fidelidade, limites); aviso de utilização de IA | [Model Card as Control Evidence](/patterns/model-card-as-control-evidence) |
| **03 Evals & Red Teaming as Evidence** | [Suite de avaliação de equidade](/patterns/fairness-eval-suite): métricas de grupo com intervalos, fatias interseccionais, verificação de proxy, teste de inversão contrafactual | Suite de avaliação de explicação: fidelidade, estabilidade, sanidade, consistência de código de razão, teste de compreensão | [Eval Gate in CI](/patterns/eval-gate-in-ci) |
| **04 Runtime Controls & Observability** | Taxas de seleção e AIR contínuos por grupo; taxas de sobreposição e recurso por grupo | [Registo de explicação](/patterns/explanation-artefact) por decisão; canal de contestação; traço de citação RAG | [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate) |
| **05 Assurance & Continuous Compliance** | Resultados de equidade e resumos de auditoria como evidência legível por máquina; resumo publicado estilo LL144 | Registo de pedido de explicação com tempos de resposta; verificações de re-derivação periódicas | [Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal) |

A camada 03 é onde ambas se tornam controlos, razão pela qual a definição de feito em
[Layer 03](/bok/the-stack#layer-03-evals--red-teaming-as-evidence) se aplica inalterada: as suites
são versionadas com o modelo, executadas em CI, emitem resultados estruturados arquivados contra a
entrada de registo, e falham a construção quando falham. Para modelos adquiridos a mesma lógica
mantém-se no limite: ainda pode calcular métricas de grupo nos resultados de um sistema de
fornecedor e testar as explicações que devolve, e o
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) é onde pede os seus
próprios resultados desagregados e documentação de método de explicação do prestador (ver
[Third-party and procured AI](/bok/the-stack#third-party-and-procured-ai)).

A prateleira de normas para este trabalho é curta. NIST SP 1270 enquadra enviesamento [2], NIST IR
8312 enquadra explicação [29], e ISO/IEC TR 24027:2021 cobre enviesamento em sistemas de IA e tomada
de decisão auxiliada por IA [55]; é referenciada aqui apenas por número. ISO/IEC TS 6254:2025
(publicada setembro de 2025) é o documento SC 42 sobre objetivos e abordagens para explicabilidade e
interpretabilidade de modelos de aprendizagem automática e sistemas de IA [56]; também é
referenciada aqui apenas por número. Nenhuma destas é uma norma harmonizada, e nenhuma confere uma
presunção de conformidade com o Regulamento da IA (ver
[the regulatory map](/bok/regulatory-map#eu-ai-act-post-omnibus)).

### Condições de gate

Uma condição de gate é uma frase que o pipeline pode avaliar. Condições ilustrativas, cada uma
ligada a um valor de política em vez de um número redondo escolhido para conforto:

- Para cada grupo e célula interseccional acima do tamanho mínimo, o limite de confiança inferior do
  AIR está no piso de política ou acima e a lacuna na métrica de erro escolhida está dentro do seu
  limite, ou uma justificação assinada é anexada à libertação.
- Células abaixo do tamanho mínimo são listadas como «dados insuficientes»; nenhuma é reportada como
  uma aprovação.
- A verificação de proxy está abaixo do limite de política, ou cada característica assinalada tem
  uma justificação registada.
- O método de explicação passa verificações de fidelidade, estabilidade e sanidade; códigos de razão
  amostrados vêm apenas de fatores pontuados; contrafactuais amostrados são válidos e utilizam
  apenas características mutáveis.
- A ficha de modelo, ficha de método de explicação e instruções de utilização foram regeneradas para
  esta versão.

Um resultado de gate de avaliação carrega a métrica, o seu intervalo e a política contra a qual foi
julgado (ilustrativo):

```json
{ "suite_id": "fairness.credit-dfc.v3", "model_version": "credit-dfc@2026-09-01",
  "metric": "approval_air", "group": "age_65_plus", "value": 0.86,
  "ci95": [0.81, 0.91], "floor": 0.80, "min_cell": 200, "n": 1840,
  "policy": "fairness-policy.credit.v2", "result": "pass" }
```

> **Na prática (ilustrativo)** Uma operadora de telecomunicações que vende telemóveis em planos de
> pagamento parcelado executa uma verificação de crédito no ponto de venda, pelo que cada recusa é
> uma decisão de crédito que deve justificar ao requerente. A primeira versão utilizou um modelo de
> gradient boosting e gerou códigos de razão a partir de valores SHAP no momento do pedido. Um teste
> de consistência de códigos de razão descobriu que, para um conjunto de recusas, a característica
> SHAP mais importante era uma interação engenheirada que nenhum aviso conseguia descrever. A equipa
> treinou um scorecard monótono como linha de base, verificou que estava dentro de uma pequena
> margem do modelo complexo em precisão de aprovação, e implementou o scorecard. A avaliação de
> equidade gateou então cada lançamento na AIR de taxa de aprovação por faixa etária com intervalos,
> e cada recusa registou um registo de explicação. A pergunta de auditoria "por que foi este cliente
> recusado, e alguém semelhante foi tratado de forma diferente?" tornou-se duas consultas.

**Correspondências:** Regulamento da IA Art. 4a (dados de categorias especiais para detecção de
enviesamento), Art. 10(2)(f)–(g), 10(3)–(4) (dados e enviesamento), Art. 13 (transparência para
responsáveis pela implantação), Art. 15(4) (ciclos de retroalimentação), Art. 26(11) (informação de
pessoas afetadas), Art. 86 (direito à explicação) · RGPD Arts. 13–15, 22 · UK GDPR Arts. 22A–22D ·
ECOA / Regulation B, FCRA · US Uniform Guidelines (29 CFR 1607.4(D)) · NYC Local Law 144 · NIST AI
RMF (Measure 2.9, 2.11) · NIST SP 1270 · NIST IR 8312 · ISO/IEC TR 24027 · Layers 01–05. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## O que pode fazer esta semana

1. **Escolha um sistema de decisão sobre pessoas e escreva a sua política de equidade como dados**:
   os atributos protegidos que se aplicam, a métrica que escolheu e porquê, o limiar, o tamanho
   mínimo de célula e o aprovador. Confirme antes de consultar a próxima execução de avaliação.
2. **Execute uma análise de proxy** nas características desse sistema: treine um modelo para prever
   o atributo protegido a partir delas e registe o resultado na ficha de dados, com a base do Art.
   4a se utilizou dados de categorias especiais.
3. **Adicione uma avaliação de equidade interseccional ao CI** com intervalos de confiança e um
   resultado de "dados insuficientes", ligada ao [Eval Gate in CI](/patterns/eval-gate-in-ci) para
   que possa falhar a compilação.
4. **Emita um registo de explicação para cada decisão adversa** que o sistema toma, com a versão do
   modelo, método, linha de base e códigos de razão fixos, e teste 10 deles para consistência de
   códigos de razão.
5. **Coloque um aviso em frente a cinco pessoas** como as que o recebem e peça-lhes para indicar a
   razão principal e o que poderiam alterar. Mantenha as respostas como evidência e corrija o que
   compreenderam mal.

## Sources

[1] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (transparency answers "what happened", explainability "how", interpretability "why"; MEASURE 2.9 and 2.11). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[2] NIST SP 1270, Towards a Standard for Identifying and Managing Bias in Artificial Intelligence (three categories: systemic, statistical and human; "not possible to achieve zero risk of bias"). NIST. 2022-03-15. https://doi.org/10.6028/NIST.SP.1270 (verified: primary)
[3] "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle" (H. Suresh, J. Guttag; seven sources: historical, representation, measurement, aggregation, learning, evaluation, deployment; EAAMO 2021). arXiv 1901.10002. 2019-01-28. https://arxiv.org/abs/1901.10002 (verified: primary)
[4] "Dissecting racial bias in an algorithm used to manage the health of populations" (Z. Obermeyer, B. Powers, C. Vogeli, S. Mullainathan; Science 366(6464):447-453; cost as a proxy for need; 17.7% to 46.5%). Science (PubMed 31649194). 2019-10-25. https://doi.org/10.1126/science.aax2342 (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 10 (data and data governance; 10(2)(f)-(g) examination for and mitigation of biases; 10(3)-(4) relevance, representativeness and setting; former 10(5) deleted and moved to Art. 4a by the Omnibus). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_10 (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 15(4) (systems that continue to learn must reduce the risk of biased outputs influencing input for future operations, "feedback loops"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_15 (verified: primary)
[7] 42 U.S.C. § 2000e-2(k) and (l) (burden of proof in disparate-impact cases: job related and consistent with business necessity; less discriminatory alternative; (l) no adjusted scores or different cut-off scores by race, colour, religion, sex or national origin). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title42/html/USCODE-2024-title42-chap21-subchapVI-sec2000e-2.htm (verified: primary)
[8] Council Directive 2000/43/EC (Racial Equality Directive), Art. 2(2)(a)-(b) (direct and indirect discrimination). EUR-Lex. 2000-06-29. https://eur-lex.europa.eu/eli/dir/2000/43/oj/eng (verified: primary)
[9] Regulation (EU) 2016/679 (GDPR), Arts. 9, 13(2)(f), 14(2)(g), 15(1)(h), 22 and Recital 71 ("an explanation of the decision reached"). EUR-Lex. 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[10] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[11] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4a (processing of special categories of personal data for bias detection and correction: conditions (a)-(f) in para. 1; para. 2 for other AI systems and models and for deployers of high-risk systems; no obligation created; inserted by Reg. (EU) 2026/1744, in force 27 Jul 2026). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4a (verified: primary)
[12] 29 CFR 1607.4(D), Uniform Guidelines on Employee Selection Procedures (1978): adverse impact and the "four-fifths rule", with the statistical and practical significance and small-numbers caveats. eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-29/subtitle-B/chapter-XIV/part-1607/section-1607.4 (verified: primary)
[13] "Justice Department Concludes EEOC Disparate-Impact Guidelines Violate the Constitution" (Office of Legal Counsel opinion). US Department of Justice. 2026-06-09. https://www.justice.gov/opa/pr/justice-department-concludes-eeoc-disparate-impact-guidelines-violate-constitution (verified: primary)
[14] "DOJ Opinion Finds EEOC Disparate Impact Liability Guidelines Unconstitutional" (opinion addresses 29 CFR part 1607 and 1608; "helps to implement" Executive Order 14281; EEOC enforcement plan of 4 Jun 2026 prioritises disparate treatment; private and state-law disparate-impact claims remain). Ogletree Deakins. 2026-06-29. https://ogletree.com/insights-resources/blog-posts/doj-opinion-finds-eeoc-disparate-impact-liability-guidelines-unconstitutional/ (verified: secondary)
[15] Automated Employment Decision Tools: Frequently Asked Questions (Local Law 144 of 2021: independent bias audit within the past year; selection or scoring rates and impact ratios across sex, race/ethnicity and intersectional categories; published summary; no specific action required; categories under 2% may be excluded). NYC Department of Consumer and Worker Protection. 2023-06-29. https://www.nyc.gov/assets/dca/downloads/pdf/about/DCWP-AEDT-FAQ.pdf (verified: primary)
[16] "Fairness Through Awareness" (C. Dwork, M. Hardt, T. Pitassi, O. Reingold, R. Zemel; individual fairness; limits of statistical parity). arXiv 1104.3913. 2011-04-20. https://arxiv.org/abs/1104.3913 (verified: primary)
[17] "Equality of Opportunity in Supervised Learning" (M. Hardt, E. Price, N. Srebro; equalised odds, equal opportunity and post-processing adjustment). arXiv 1610.02413. 2016-10-07. https://arxiv.org/abs/1610.02413 (verified: primary)
[18] "Fair prediction with disparate impact: A study of bias in recidivism prediction instruments" (A. Chouldechova; criteria cannot all hold when prevalence differs across groups). arXiv 1703.00056. 2017-02-28. https://arxiv.org/abs/1703.00056 (verified: primary)
[19] "Inherent Trade-Offs in the Fair Determination of Risk Scores" (J. Kleinberg, S. Mullainathan, M. Raghavan; three fairness conditions cannot hold together except in highly constrained special cases). arXiv 1609.05807. 2016-09-19. https://arxiv.org/abs/1609.05807 (verified: primary)
[20] Fairlearn user guide, "Fairness in machine learning" (allocation, quality-of-service and stereotyping harms; disparity metrics as ratios or differences). Fairlearn project. 2026. https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html (verified: primary)
[21] "Counterfactual Fairness" (M. Kusner, J. Loftus, C. Russell, R. Silva). arXiv 1703.06856. 2017-03-20. https://arxiv.org/abs/1703.06856 (verified: primary)
[22] "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification" (J. Buolamwini, T. Gebru; error rates up to 34.7% for darker-skinned females; maximum 0.8% for lighter-skinned males). Proceedings of Machine Learning Research 81:77-91. 2018. https://proceedings.mlr.press/v81/buolamwini18a.html (verified: primary)
[23] "Preventing Fairness Gerrymandering: Auditing and Learning for Subgroup Fairness" (M. Kearns, S. Neel, A. Roth, Z. S. Wu). arXiv 1711.05144. 2017-11-14. https://arxiv.org/abs/1711.05144 (verified: primary)
[24] "Model Cards for Model Reporting" (M. Mitchell et al.; evaluation across demographic and intersectional groups; FAT* 2019). arXiv 1810.03993. 2018-10-05. https://arxiv.org/abs/1810.03993 (verified: primary)
[25] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III (high-risk use cases: point 2 critical infrastructure; point 4 employment; point 5(a) public assistance benefits; point 5(b) creditworthiness and credit scoring, excluding financial-fraud detection). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
[26] "AI Fairness 360: An Extensible Toolkit for Detecting, Understanding, and Mitigating Unwanted Algorithmic Bias" (R. Bellamy et al.). arXiv 1810.01943. 2018-10-03. https://arxiv.org/abs/1810.01943 (verified: primary)
[27] "Fairlearn: Assessing and Improving Fairness of AI Systems" (H. Weerts et al.; fairness as a sociotechnical challenge). arXiv 2303.16626. 2023-03-29. https://arxiv.org/abs/2303.16626 (verified: primary)
[28] "Aequitas: A Bias and Fairness Audit Toolkit" (P. Saleiro et al.). arXiv 1811.05577. 2018-11-14. https://arxiv.org/abs/1811.05577 (verified: primary)
[29] NIST IR 8312, Four Principles of Explainable Artificial Intelligence (explanation, meaningful, explanation accuracy, knowledge limits). NIST. 2021-09-29. https://doi.org/10.6028/NIST.IR.8312 (verified: primary)
[30] "Stop Explaining Black Box Machine Learning Models for High Stakes Decisions and Use Interpretable Models Instead" (C. Rudin; Nature Machine Intelligence 1:206-215, May 2019). arXiv 1811.10154. 2018-11-26. https://arxiv.org/abs/1811.10154 (verified: primary)
[31] 12 CFR 1002.9 (Regulation B, notifications; 1002.9(b)(2) specific principal reasons; the official commentary is [57]). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[32] "A Unified Approach to Interpreting Model Predictions" (S. Lundberg, S.-I. Lee; SHAP). arXiv 1705.07874. 2017-05-22. https://arxiv.org/abs/1705.07874 (verified: primary)
[33] "'Why Should I Trust You?': Explaining the Predictions of Any Classifier" (M. T. Ribeiro, S. Singh, C. Guestrin; LIME). arXiv 1602.04938. 2016-02-16. https://arxiv.org/abs/1602.04938 (verified: primary)
[34] "Axiomatic Attribution for Deep Networks" (M. Sundararajan, A. Taly, Q. Yan; integrated gradients; sensitivity and implementation invariance). arXiv 1703.01365. 2017-03-04. https://arxiv.org/abs/1703.01365 (verified: primary)
[35] "Fooling LIME and SHAP: Adversarial Attacks on Post hoc Explanation Methods" (D. Slack, S. Hilgard, E. Jia, S. Singh, H. Lakkaraju). arXiv 1911.02508. 2019-11-06. https://arxiv.org/abs/1911.02508 (verified: primary)
[36] "Sanity Checks for Saliency Maps" (J. Adebayo et al.; some saliency methods are independent of model and data). arXiv 1810.03292. 2018-10-08. https://arxiv.org/abs/1810.03292 (verified: primary)
[37] "Counterfactual Explanations without Opening the Black Box: Automated Decisions and the GDPR" (S. Wachter, B. Mittelstadt, C. Russell; Harvard Journal of Law & Technology, 2018). arXiv 1711.00399. 2017-11-01. https://arxiv.org/abs/1711.00399 (verified: primary)
[38] "Language Models Don't Always Say What They Think: Unfaithful Explanations in Chain-of-Thought Prompting" (M. Turpin, J. Michael, E. Perez, S. R. Bowman; accuracy drops of up to 36% on 13 BIG-Bench Hard tasks). arXiv 2305.04388. 2023-05-07. https://arxiv.org/abs/2305.04388 (verified: primary)
[39] "Open Problems in Mechanistic Interpretability" (L. Sharkey et al.). arXiv 2501.16496. 2025-01-27. https://arxiv.org/abs/2501.16496 (verified: primary)
[40] "Evaluating Verifiability in Generative Search Engines" (N. F. Liu, T. Zhang, P. Liang; 51.5% of generated sentences fully supported by citations; 74.5% of citations support their sentence). arXiv 2304.09848. 2023-04-19. https://arxiv.org/abs/2304.09848 (verified: primary)
[41] 15 U.S.C. § 1681m(a) and § 1681g(f)(1) (duties of users taking adverse action on the basis of a consumer report; credit score, range and key factors, not more than four). US Government Publishing Office, GovInfo (United States Code, 2024 edition). 2024. https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap41-subchapIII.htm (verified: primary)
[42] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22A no meaningful human involvement; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[43] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 13 (transparency and provision of information to deployers; 13(2) "relevant, accessible and comprehensible to deployers"; 13(3)(b)(iv), (v), (vii); 13(3)(d)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_13 (verified: primary)
[44] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 86 (right to explanation of individual decision-making; Annex III except point 2; subsidiary to other Union law under 86(3)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_86 (verified: primary)
[45] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms and Circular 2023-03 on adverse-action reasons and sample forms, both withdrawn 12 May 2025). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
[46] "CJEU's first ruling on Article 22 GDPR: 'credit scoring' is an automated decision" (C-634/21 SCHUFA, 7 Dec 2023; a probability value is an Art. 22(1) decision where a third party draws strongly on it). Cloisters. 2023-12-14. https://www.cloisters.com/latest/cjeus-first-ruling-on-article-22-gdpr-credit-scoring-is-an-automated-decision (verified: secondary)
[47] CJEU, 27 February 2025, CK v Magistrat der Stadt Wien and Dun & Bradstreet Austria GmbH, C-203/22 (paras. 58 to 62 and 74 to 76; Art. 15(1)(h): explain "the procedure and principles actually applied"; a complex mathematical formula is not a sufficiently concise and intelligible explanation; for profiling, the effect of a variation in the personal data on the result can suffice (para. 62); trade secrets balanced case by case by the authority or court). Court of Justice of the EU (EUR-Lex). 2025-02-27. https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:62022CJ0203 (verified: primary)
[48] "ECJ Ruling on Automated Decision-Making and Data Subject Access" (commentary on C-203/22: an explanation of how variations in the data might change the outcome). Clyde & Co. 2025-03. https://clydeco.com/en/insights/2025/03/ecj-ruling-on-automated-decision-making-and-data-s (verified: secondary)
[49] Explaining decisions made with AI (co-badged ICO and The Alan Turing Institute guidance; six explanation types; under review after the Data (Use and Access) Act). Information Commissioner's Office. consulted 2026-09-24. https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/ (verified: primary)
[50] "The Digital Omnibus: a step back from the brink, but the risks remain" (first Council compromise drops the proposed rewrite of GDPR Art. 22; GDPR amendments still in negotiation). European Digital Rights (EDRi). 2026-03-17. https://edri.org/our-work/the-digital-omnibus-a-step-back-from-the-brink-but-the-risks-remain/ (verified: secondary)
[51] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26(11) (deployers of Annex III high-risk systems that make or assist decisions about natural persons must inform them). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[52] "Towards A Rigorous Science of Interpretable Machine Learning" (F. Doshi-Velez, B. Kim; application-grounded, human-grounded and functionally-grounded evaluation). arXiv 1702.08608. 2017-02-28. https://arxiv.org/abs/1702.08608 (verified: primary)
[53] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 16(l) (providers of high-risk systems ensure accessibility requirements under Directives (EU) 2016/2102 and (EU) 2019/882). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_16 (verified: primary)
[54] Web Content Accessibility Guidelines (WCAG) 2.2 (W3C Recommendation; SC 1.1.1, 1.4.1, 3.1.5). W3C. 2024-12-12. https://www.w3.org/TR/WCAG22/ (verified: primary)
[55] ISO/IEC TR 24027:2021, Bias in AI systems and AI aided decision making (referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2021. https://www.iso.org/standard/77607.html (verified: secondary)
[56] ISO/IEC TS 6254:2025, Information technology, Artificial intelligence: Objectives and approaches for explainability and interpretability of machine learning (ML) models and artificial intelligence (AI) systems (published, edition 1; referenced by identifier and title only). ISO/IEC JTC 1/SC 42. 2025-09. https://www.iso.org/standard/82148.html (verified: primary)
[57] 12 CFR Part 1002, Supplement I, Official Interpretations, comments 9(b)(2)-1 to -5 (more than four reasons not likely helpful; reasons must relate to and accurately describe the factors actually considered or scored; no principal reason left out; no single reason-selection method required, two reference methods against average scores). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/appendix-Supplement%20I%20to%20Part%201002 (verified: primary)
