---
lang: pt
source: bok/12-governance-program.md
sourceHash: "460584c50e45544537c593e6d00f037ffa678694b52f0164664a33518e8e400f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 12. Executar o programa de governação da IA

> Um programa de governação da IA é a organização governada como um sistema: as pessoas detêm os
> deveres, um comité decide o que os gates não podem, as políticas compilam em gates, e a evidência
> chega ao conselho.

## A organização como um objeto de governação

O capítulo 01 nomeia cinco objetos de governação: modelos, sistemas, agentes, dados e a organização.
Os primeiros quatro recebem a maioria da maquinaria deste livro. O quinto decide se essa maquinaria
é construída, financiada, obedecida ou contornada. "Um controlo sem proprietário não é um controlo"
é uma afirmação sobre a organização, e este capítulo escreve-a: quem detém qual dever, onde as
decisões são tomadas, como as políticas se tornam gates, como as pessoas são treinadas e ouvidas, e
como a liderança aprende se algo disso funciona.

Uma regra percorre o capítulo: **o comité decide; os gates executam.** As pessoas tomam as decisões
que precisam de julgamento (este caso de uso vale o seu risco, este risco residual é aceitável, esta
exceção é justificada). O código executa-as em cada mudança e deixa a evidência. Um programa que
inverte isto, com reuniões executando e código aconselhando, é o anti-padrão "risk review board" do
capítulo 04: recomendação sem consequência.

A lei já espera que a camada organizacional seja concebida. O Regulamento da IA da UE exige que o
sistema de gestão da qualidade de um prestador de risco elevado inclua "um quadro de
responsabilidade que estabeleça as responsabilidades da gestão e de outro pessoal" (`Art. 17(1)(m)`)
[1]. ISO/IEC 42001 pede funções, responsabilidades e autoridades definidas (cláusula 5.3; Anexo
A.3.2) [2], e o NIST AI RMF para funções documentadas e linhas de comunicação para risco de IA
(GOVERN 2.1) [3]. Nenhum diz como tornar esse quadro verdadeiro numa terça-feira. Esse é o trabalho
de engenharia.

Este capítulo não é um manual de programa GRC e não é aconselhamento legal. É o modelo operacional
que dá aos cinco proprietários das camadas de [stack](/bok/the-stack#how-to-read-the-stack) os seus
proprietários. O ciclo de risco é o capítulo 13
([Onde a gestão de risco se senta](/bok/risk-management#the-loop-identify-assess-treat-monitor)); os
controlos em cada fase de construção e execução são os capítulos 14 e 15
([Governar o desenvolvimento de IA](/bok/governing-development#the-build-as-a-chain-of-gates),
[Governar a implantação e utilização](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance)).

## O mapa de partes interessadas

Cada parte interessada detém um dever, um direito de decisão (ou explicitamente nenhum) e um
artefato que evidencia o dever. Se não conseguir nomear o artefato, o dever ainda não é real.

| Parte interessada | Dever no programa | Decide | Artefato que detém ou assina |
|---|---|---|---|
| **Conselho** (órgão de governação) | Define o apetite de risco de IA; supervisiona o programa | Apetite; a política de IA | Declaração de apetite; atas do conselho |
| **Liderança executiva** | Detém decisões de risco de IA para o negócio; financia o programa | Aceitação dos riscos residuais mais elevados | Aceitações de risco assinadas; orçamento |
| **CAIO / CDAO** | Executa a estratégia de IA e o portfólio de casos de uso; preside o comité | Prioridades do portfólio | Portfólio; inventário de casos de uso |
| **Comité de governação da IA** | Decide o que os gates não podem: risco residual, exceções, compensações de valor | Exceções; go/no-go acionado | Registos de decisão; registo de exceções |
| **Legal** | Lê obrigações; confirma que um controlo as cumpre | Interpretação | Registo de obrigações; cláusulas contratuais |
| **Privacidade / EPD** | Proteção de dados desde a conceção; AIPD; direitos dos titulares dos dados | Aconselhamento e aprovação da AIPD | AIPD; registos das atividades de tratamento |
| **CISO / segurança** | Modelo de ameaça de IA; controlos de segurança; resposta a incidentes | Exceções de segurança | Modelos de ameaça; resultados de red team |
| **Risco** (segunda linha) | Taxonomia de risco de IA dentro de ERM; desafio; KRIs | Método de classificação | Registo de risco; limiares de KRI |
| **Auditoria interna** (terceira linha) | Garantia independente sobre o programa | Opinião de auditoria | Relatórios de auditoria; amostras testadas |
| **Proprietário do produto** | Responsável pelo caso de uso, valor e risco de um sistema | Escopo; pedido de lançamento | Memorando de justificação; campo proprietário do registo |
| **Engenharia** (ML, dados, plataforma) | Constrói e executa o sistema dentro dos gates | Design técnico | Código; resultados de avaliação; AIBOM |
| **Engenheiro de governação da IA** | Constrói os gates, o registo e o caminho de evidência | Design de gate | Código de política; armazenamento de evidência |
| **Aquisições** | Entrada de IA para compras; classificação de fornecedores | Aprovação de fornecedor, com risco | Ficheiro de fornecedor; contrato |
| **HR** | Literacia da força de trabalho; IA em decisões de emprego; informação do trabalhador | Processos de pessoas | Registos de treino; avisos ao trabalhador |
| **Operadores e utilizadores finais** | Utilizam sistemas conforme instruído; exercem supervisão; reportam preocupações | Anular no momento | Registos de anulação e escalação |
| **Pessoas afetadas** e representantes | Dão feedback; contestam decisões | Nenhum formalmente; uma voz | Registos de feedback e contestação |
| **Fornecedores** | Fornecem evidência; notificam mudanças e incidentes | O seu próprio sistema | Fichas de modelo; AIBOM; avisos de incidente |

Quatro linhas precisam de mais do que uma célula.

**O conselho.** No Modelo de Três Linhas do Instituto de Auditores Internos, o órgão de governação é
responsável pela supervisão, a gestão executa os papéis da primeira e segunda linha, e a auditoria
interna dá garantia independente [4]. Para IA, o conselho aprova apetite e política e recebe
evidência; não revê casos de uso. NIST declara o dever executivo claramente: a liderança executiva
"assume a responsabilidade pelas decisões sobre riscos associados ao desenvolvimento e implantação
de sistemas de IA" (GOVERN 2.3) [3]. Um conselho nunca pedido para aceitar um risco de IA não
delegou a decisão; nunca a viu.

**O CAIO.** O Chief AI Officer (ou Chief Data and AI Officer) é responsável pela carteira: que casos
de uso a organização persegue e porquê. O modelo público mais claro é o federal dos EUA: o Memorando
OMB M-25-21 de 3 de abril de 2025 exigiu que cada agência designasse um CAIO no prazo de 60 dias,
mantendo o inventário de casos de uso de IA e estabelecendo "um processo de revisão independente de
casos de uso de elevado impacto antes da aceitação do risco" [5]. A lição é transferível: o CAIO é
responsável pelo inventário e pelo processo de aceitação, e não revê os seus próprios casos de uso.

**Operadores.** Um responsável pela implantação de um sistema de risco elevado deve "atribuir
supervisão humana a pessoas singulares que possuam a competência, formação e autoridade necessárias,
bem como o apoio necessário" (`Art. 26(2)`) [6]. Competência e autoridade são factos
organizacionais: um registo de formação e um direito documentado de parar o sistema (ver
[Designing human oversight](/bok/the-stack#designing-human-oversight-article-14)).

**Pessoas afetadas.** As pessoas sobre as quais um sistema toma decisões raramente estão no
programa, pelo que este tem de as alcançar. Os empregadores que implantam um sistema de risco
elevado no local de trabalho devem informar primeiro os representantes dos trabalhadores e os
trabalhadores afetados (`Art. 26(7)`) [6]. O NIST solicita práticas que integrem feedback de pessoas
fora da equipa que construiu ou implantou o sistema (GOVERN 5.1) e decisões informadas por uma
equipa diversa (GOVERN 3.1) [3]. Um conselho de ética ou painel externo justifica o seu lugar apenas
se o seu parecer é registado contra uma decisão e respondido.

## Uma RACI de ciclo de vida

A RACI diz quem faz o quê em cada fase do ciclo de vida. **R** faz o trabalho, **A** é responsável
por ele (um por linha), **C** é consultado antes, **I** é informado depois.

| Fase | Proprietário do produto | Engenharia | Engenheiro de governação de IA | Legal e privacidade | Segurança | Risco | Comissão | Auditoria interna |
|---|---|---|---|---|---|---|---|---|
| Admissão | A | C | R | C | C | C | I (C se acionado) | I |
| Conceção | A | R | C | C | C | I | I | I |
| Dados | A | R | C | R | I | I | I | I |
| Construção | A | R | C | I | C | I | I | I |
| Teste | A | R | R | I | R | C | I | I |
| Lançamento | A (comissão se acionada) | R | R | C | C | C | C | I |
| Operação | A | R | R | I | R | C | I | I |
| Alteração | A | R | R | C | C | I | I | I |
| Desativação | A | R | R | C | C | I | I | I |

Três regras mantêm a tabela honesta. O proprietário do produto é responsável em cada fase, porque a
responsabilidade que se move entre funções à medida que um sistema amadurece é a lacuna por onde os
incidentes caem. A auditoria interna é informada em todo o lado e responsável em lado nenhum; uma
vez que executa uma tarefa de primeira ou segunda linha, já não pode auditar essa tarefa de forma
independente [4]. A comissão detém o A apenas para casos de uso acionados, pelo que não se torna um
estrangulamento para os ordinários.

Uma RACI num slide é uma afirmação. Compile-a em vez disso: um `raci.yaml` mapeia fases para
funções, cada entrada do registo nomeia as pessoas que ocupam essas funções para esse sistema, e o
pipeline lê ambos. Um lançamento sem um proprietário do produto nomeado falha a admissão; um pull
request que toque uma política precisa da revisão do seu proprietário (uma regra de code-owners
gerada a partir do mesmo ficheiro). O quadro de responsabilidade de `Art. 17(1)(m)` torna-se um
ficheiro que pode fazer diff [1].

## A comissão decide, os gates executam

As comissões têm uma má reputação neste livro, e o capítulo 04 justifica-a: um conselho que
classifica as conclusões mensalmente sem poder de parar um lançamento é teatro. Mas algumas decisões
não podem ser automatizadas, e fingir o contrário esconde-as na configuração do pipeline que ninguém
revê. A comissão é legítima onde toma essas decisões, e apenas aí.

### Para que serve a comissão

Quatro tipos de decisão. **Aceitação de risco**: se um risco residual acima da autoridade do
proprietário do produto é aceitável, por quanto tempo e sob que controlos compensatórios.
**Exceções**: se um sistema pode prosseguir enquanto falha uma regra nomeada. **Trocas de valor**:
se um benefício justifica um risco que nenhum limiar pode precificar (uma decisão que afeta
direitos, uma população vulnerável). **Política**: aprovação do conjunto de políticas e suas
alterações materiais. Não revê cada lançamento, não escreve controlos nem executa avaliações; os
gates e as equipas fazem isso.

### Carta e composição

Uma carta de uma ou duas páginas define propósito, direitos de decisão, quórum, composição,
cadência, escalada, como as decisões são registadas e como a carta muda. Um núcleo viável é o CAIO
ou um delegado (presidente), legal, privacidade, segurança, risco, um líder de engenharia sénior e
um ou dois líderes de produto, com RH e aprovisionamento para os seus casos e auditoria interna como
observador sem direito de voto. Para amplitude, o M-25-21 pediu aos conselhos de governação de IA
das maiores agências (CFO Act) que incluíssem TI, cibersegurança, dados, orçamento, legal,
privacidade, direitos civis e liberdades civis, e que consultassem especialistas externos conforme
necessário [5].

### Consultivo ou vinculativo

Uma comissão consultiva recomenda e um executivo nomeado decide; uma comissão vinculativa decide
dentro da sua carta. Qualquer um funciona se a carta diz qual, por tipo de decisão. O que falha é a
ambiguidade: uma comissão que acredita que aprovou um lançamento e um proprietário do produto que
acredita que apenas comentou. Uma divisão comum é vinculativa em exceções e casos de uso acionados,
consultiva em estratégia.

### Aceitação de risco e exceções

O risco residual é aceite por alguém com autoridade para o possuir, por um tempo limitado. Uma
matriz de aceitação torna isso explícito, usando as classificações do capítulo 13 (limiares
ilustrativos):

| Risco residual | Quem pode aceitar | Validade máxima | Evidência necessária |
|---|---|---|---|
| Baixo | Proprietário do produto | 12 meses | Entrada do registo; gates aprovados |
| Médio | Proprietário do produto + função de risco | 6 meses | Controlos compensatórios nomeados |
| Alto | Comissão de governação de IA | 3 meses | Registo de decisão; plano de monitorização |
| Acima do apetite | Liderança executiva, reportado ao conselho | 3 meses | Notificação do conselho |
| Utilização proibida | Ninguém | Não aplicável | Bloqueado na admissão |

Uma exceção é uma aceitação de risco para uma regra num sistema. Pertence ao repositório de
políticas como dados, não em atas. Um registo (ilustrativo):

```yaml
exception:
  id: EXC-2026-014
  rule_id: eval.injection-floor.v4
  system: csa-01
  requested_by: team-support-platform
  justification: "Vendor model update lowered injection resistance; fix scheduled"
  compensating_controls:
    - guardrail.input.injection.v3 in block mode
    - human approval for refunds above the tier-2 limit
  residual_risk: high
  decision_record: DEC-2026-051
  approved_by: ai-governance-committee
  expires: 2026-10-31T23:59:59Z
```

O gate lê o registo. Enquanto a exceção está ativa, a regra retorna `allow` com o id da exceção no
seu veredicto, pelo que a evidência mostra que o lançamento passou *sob uma exceção*. Quando expira,
a mesma regra falha a construção novamente sem que ninguém tenha de se lembrar. As exceções abertas
por idade tornam-se um indicador do conselho.

### Escalada, acionadores e cadência

A maioria dos casos de uso nunca chega à comissão; passam
[admissão, recebem um nível](/patterns/use-case-intake-risk-tiering) e passam pelos gates. Os
acionadores de revisão encaminham o resto:

- uma decisão com efeito legal ou igualmente significativo sobre uma pessoa (crédito, emprego,
  seguros, habitação, educação, serviços públicos);
- identificação ou categorização biométrica, reconhecimento de emoções, ou dados de categorias
  especiais;
- crianças ou outras pessoas vulneráveis como utilizadores ou sujeitos;
- um agente com acesso de escrita a dinheiro, registos de clientes ou infraestrutura de produção;
- saídas que não podem ser explicadas bem o suficiente para as pessoas que devem agir sobre elas;
- qualquer pedido de exceção classificado como alto ou superior.

As exceções e casos acionados precisam de um nível de serviço (por exemplo, uma decisão no prazo de
dez dias úteis) e um caminho assíncrono; uma reunião mensal tornaria a governação o passo mais lento
na entrega. As aprovações de políticas podem ser mensais e o relatório do conselho trimestral. A
escalada funciona proprietário do produto, comissão, executivo, conselho, com o acionador para cada
salto escrito na carta.

> **Na prática (ilustrativo)**
> Numa grande operadora de telecomunicações, as primeiras reuniões da comissão debateram lançamentos
> individuais. Mover exceções para um registo que os gates leem mudou o seu trabalho. Os engenheiros
> apresentaram pedidos como pull requests; a comissão decidiu no prazo de serviço; o gate executou a
> expiração. As reuniões encolheram para casos de uso acionados e a tendência em exceções abertas, e
> um auditor poderia listar cada lançamento que foi enviado sob uma exceção com uma consulta.

## Risco empresarial, as três linhas e auditoria interna

### Risco de IA no registo de risco empresarial

O risco de IA pertence ao registo de risco empresarial sob o mesmo apetite, escala de classificação
e linha de reporte que qualquer outro risco, com categorias de IA por baixo (dano a pessoas,
exposição legal, segurança, fiabilidade, terceiros). ISO/IEC 23894 adapta o processo de risco ISO
31000 à IA e é a ponte natural [7]. Gere a vista empresarial a partir da vista do sistema: cada
entrada do registo carrega as suas classificações e controlos ligados, e o registo agrega-os por
categoria e unidade de negócio. A ligação funciona nos dois sentidos, pelo que uma alteração no
apetite altera as regras de nível e os limiares dos gates.

### As três linhas, aplicadas à IA

| Linha | Quem | Deveres de IA | Evidência que produz |
|---|---|---|---|
| Primeira | Proprietários de produtos, engenharia, operadores | Construir e executar sistemas dentro dos gates; possuir os seus riscos | Entradas do registo; resultados de avaliação; registos de tempo de execução |
| Segunda | Risco, conformidade, privacidade, segurança, governação de IA | Definir método e política; construir o caminho pavimentado; questionar as classificações da primeira linha | Políticas como código; limiares de KRI; registos de revisão |
| Terceira | Auditoria interna | Garantia independente sobre a conceção e operação dos controlos | Relatórios de auditoria; amostras testadas |

O engenheiro de governação de IA geralmente fica na segunda linha, construindo ferramentas que a
primeira linha executa. O modelo descreve funções, não caixas num organograma; o que importa é que a
terceira linha se mantenha independente do que assegura [4].

### O que a auditoria interna testa

ISO/IEC 42001 pede auditorias internas do sistema de gestão (cláusula 9.2) [2]. Devem testar os
gates, não os documentos sobre eles. **Re-execução**: re-executar a decisão de política para uma
amostra aleatória de lançamentos das entradas armazenadas; o veredicto deve corresponder ao armazém
de evidência. **Caça ao bypass**: comparar o que a descoberta encontra em execução com o registo, e
implantações com veredictos de gate; uma implantação sem um veredicto é uma conclusão.
**Higiene de exceção**: amostra de exceções para um aprovador nomeado, uma expiração e controlos
compensatórios que realmente funcionaram. Exercícios de mesa (um incidente grave simulado, um modelo
de fornecedor retirado da noite para o dia) testam os caminhos de decisão que nenhum exercício de
pipeline testa.

**Correspondências:** Regulamento da IA `Art. 17(1)(m)` (quadro de responsabilidade), `Art. 26(2)` e
`Art. 26(7)` (competência de supervisão; informar trabalhadores) · Cláusulas ISO/IEC 42001 5.1–5.3,
9.2; Anexo A.2, A.3 · NIST AI RMF GOVERN 2, 3, 5 · camadas 1 Govern-as-Code e 5 Assurance &
Continuous Compliance. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Literacia em IA como código

### O que o Artigo 4 pede após o Omnibus Digital

O artigo 4.º do Regulamento da IA da UE aplica-se desde 2 de fevereiro de 2025. Conforme alterado
pelo Regulamento (UE) 2026/1744, em vigor desde 27 de julho de 2026, exige que os prestadores e
responsáveis pela implantação «tomem medidas para apoiar o desenvolvimento da literacia no domínio
da IA» do seu pessoal e de outras pessoas que operem sistemas de IA em seu nome, e acrescenta que
isto «não exige que os prestadores ou responsáveis pela implantação garantam qualquer nível
específico de literacia no domínio da IA de qualquer indivíduo» [8][9]. As Perguntas e Respostas da
Comissão (atualizadas em 27 de julho de 2026) indicam que a obrigação permanece sem qualquer nível
«suficiente» obrigatório; não é necessário certificado e um registo interno das formações é
suficiente; «outras pessoas» incluem contratantes, prestadores de serviços e clientes; as instruções
de utilização por si só não são suficientes; e as autoridades nacionais de fiscalização do mercado
supervisionam a regra a partir de 2 de agosto de 2026 [10]. Esta é a posição em 2026-09-24.

A redação mais suave não é razão para fazer menos. Para responsáveis pela implantação de risco
elevado, o dever mais rigoroso situa-se em `Art. 26(2)`: a supervisão vai para pessoas com a
competência, formação e autoridade para a exercer [6]. O NIST espera formação em risco de IA
adequada aos deveres de cada pessoa (GOVERN 2.2) [3], e a ISO/IEC 42001 aborda competência e
sensibilização nas cláusulas 7.2 e 7.3 [2]. A resposta de engenharia aos três é literacia como um
sistema baseado em funções com registos, não uma apresentação anual.

### Currículos baseados em funções

| Persona | Deve ser capaz de | Blocos de currículo | Gatilho de atualização |
|---|---|---|---|
| Conselho e executivos | Definir apetência; ler o pacote KPI/KRI; aceitar ou recusar risco | Terminologia; estratégia e apetência; função de prestador ou responsável pela implantação | Nova lei; incidente grave |
| Proprietários de produtos | Escrever um memorando de justificação; classificar um caso de uso; possuir risco residual | Intake e gatilhos; método de risco; políticas por fase | Mudança de política |
| Engenheiros e cientistas de dados | Construir dentro dos gates; ler um resultado de avaliação; registar uma exceção | Caminho pavimentado; avaliações; aquisição de dados; deveres de incidente | Novo gate ou ferramenta |
| Legal, privacidade, conformidade | Traduzir uma obrigação numa regra e vice-versa | O stack; formatos de evidência; comportamento do sistema | Nova obrigação |
| Operadores com deveres de supervisão | Ler resultados; sobrepor, parar, escalar | O sistema específico; viés de automação; simulação de sobreposição na interface real | Nova versão de modelo |
| Todo o pessoal que utiliza ferramentas de IA | Utilizar ferramentas aprovadas em dados permitidos; comunicar preocupações | Utilização aceitável; classes de dados; o canal de preocupações | Anual; nova ferramenta |
| Aquisição e recursos humanos | Detetar IA numa compra; lidar com IA em decisões de pessoal | Bandeira de intake; classificação de fornecedores; regras de emprego | Mudança de modelo |

Os formatos seguem a persona: briefings de cenários para o conselho, laboratórios para engenheiros,
simulações para operadores, microaprendizagem com atestação para todos os outros.

### Registos de formação e atestação como condição de acesso

Um registo de formação é evidência quando é estruturado, vinculado a um sistema e capaz de expirar
(ilustrativo):

```json
{ "person": "u-48213", "role": "operator.credit-review",
  "module": "oversight.credit-scorer.v3", "completed": "2026-09-12",
  "assessment": "pass", "systems": ["credit-scorer-02"],
  "expires": "2027-09-12T00:00:00Z", "attested": true }
```

Torna-se um controlo quando o acesso depende dele. O fornecedor de identidade ou gateway de IA
pergunta ao motor de política antes de conceder acesso (ilustrativo `OPA/Rego`):

```rego
package access.ai_tools

import rego.v1

default allow := false

allow if {
  some r in data.training_records[input.user]
  r.module == data.required_module[input.tool]
  r.attested
  time.parse_rfc3339_ns(r.expires) > time.now_ns()
}
```

Um operador cujo módulo expirou perde a consola de sobreposição, não apenas uma linha num relatório;
uma nova versão de modelo aumenta o módulo obrigatório, portanto os operadores reciclam antes de o
tocar. O registo é `Art. 4` evidência, a decisão de acesso é `Art. 26(2)` evidência, e ambos chegam
ao armazém de evidência sem um sprint de recolha.

### Medir e atualizar literacia

As taxas de conclusão medem a assistência. Indicadores melhores são cobertura por persona, tempo
desde a adesão (ou desde uma nova versão de modelo) até um registo atual, e sinais de resultado:
taxas de sobreposição de operadores e tempo para decidir (métricas de supervisão do capítulo 04), a
proporção de pedidos de exceção que chegam bem formados, preocupações levantadas por equipa.
Atualizar em eventos (uma nova lei, capacidade, incidente ou ferramenta) bem como no calendário.

## Cultura de governação

Os controlos falham silenciosamente quando as pessoas os contornam; a cultura é se o fazem. Três
alavancas estão ao alcance de uma função de governação.

**Campeões.** Um campeão nomeado em cada equipa de produto, com formação mais aprofundada, responde
às primeiras questões e faz a primeira revisão de intakes. Os campeões escalam a segunda linha sem
adicionar ao seu efetivo e levam o caminho pavimentado para equipas que de outra forma encontrariam
a governação apenas como uma construção bloqueada
([tornar o caminho governado o caminho mais fácil](/bok/values-and-principles#make-the-governed-path-the-easiest-path)).

**Incentivos.** Medir equipas em lançamentos através do caminho pavimentado, exceções fechadas antes
da expiração e preocupações levantadas e resolvidas, nunca em zero incidentes, o que recompensa o
silêncio. O NIST pede uma mentalidade de pensamento crítico e segurança em primeiro lugar e práticas
que permitam testes, identificação de incidentes e partilha de informações (GOVERN 4.1, 4.3) [3]; os
incentivos são como essa mentalidade sobrevive a um prazo.

**Revisão sem culpa.** Após um incidente de IA ou quase falha, revise o sistema, não a pessoa. A
prática SRE do Google define uma autópsia sem culpa como aquela que se concentra em «identificar as
causas contributivas do incidente sem acusar qualquer indivíduo ou equipa de comportamento
inadequado ou impróprio» [11]. O seu resultado de engenharia é um gate, avaliação ou política
alterada, registada como um pedido de pull citando a revisão. Uma contagem crescente de quase falhas
comunicadas é geralmente uma boa notícia: a alternativa é menos relatórios, não menos falhas.

## Um canal para comunicar preocupações

Os pipelines capturam o que foram construídos para ver. Um cientista de dados que suspeita que um
benchmark foi manipulado, um operador que vê um padrão de resultados prejudiciais, um engenheiro
pedido para desativar um guardrail antes de uma demonstração: estes chegam ao programa apenas se as
pessoas puderem comunicá-los com segurança, fora da cadeia de comando que criou o problema. A lei
agora espera tais canais (em 2026-09-24):

| Regime | Quem deve agir | O que exige |
|---|---|---|
| Regulamento da IA da UE `Art. 87` com Diretiva (UE) 2019/1937 [12][13] | Entidades jurídicas privadas com 50 ou mais trabalhadores, através da lei nacional de transposição | Canais internos e acompanhamento (Art. 8.º); reconhecimento dentro de sete dias e resposta dentro de três meses (Art. 9.º(1)(b), (f)); sem retaliação (Art. 19.º) |
| California SB 53, Labor Code §1107.1 [14][15] | Desenvolvedores de fronteira; o dever de processo interno vincula grandes desenvolvedores de fronteira | Nenhuma regra impedindo funcionários cobertos de divulgar ao Procurador-Geral ou outras autoridades; sem retaliação; aviso de direitos; um processo interno anónimo com atualizações mensais ao comunicante, partilhadas com oficiais e diretores pelo menos trimestralmente |
| ISO/IEC 42001 Anexo A.3.3 [2] | Organizações que implementam a norma (voluntário) | Um processo para comunicar preocupações sobre sistemas de IA |

O artigo 87.º aplica a Diretiva sobre Denunciantes a relatórios de infrações do Regulamento da IA a
partir de 2 de agosto de 2026 [12]. O SB 53, em vigor desde 1 de janeiro de 2026, protege
«funcionários cobertos» (aqueles responsáveis por avaliar, gerir ou abordar o risco de incidentes
críticos de segurança) que divulgam que as atividades de um desenvolvedor de fronteira representam
«um perigo específico e substancial para a saúde ou segurança pública resultante de um risco
catastrófico» ou violam o Regulamento [14][15].

Construa o canal como qualquer sistema governado. O intake aceita relatórios anónimos e nomeados por
mais de uma rota. Cada relatório torna-se um registo de caso com os relógios estatutários
codificados como temporizadores, não lembretes. A triagem encaminha um possível incidente para o
[Pipeline de Incidentes](/patterns/incident-pipeline), uma possível infração para legal, uma lacuna
de política para o comité. A identidade do comunicante é selada das pessoas nomeadas, e os recursos
humanos observam sinais de retaliação (ações de desempenho súbitas, mudanças de acesso) em torno de
comunicantes protegidos. Volumes, conformidade de relógio e resultados sobem sem identidades. Isto
esboça a engenharia; não é aconselhamento sobre qualquer lei nacional de transposição.

## KPIs e KRIs para liderança e conselho

A liderança precisa de alguns indicadores em que possa confiar, calculados a partir de sistemas em
direto em vez de auto-comunicados. Um **KPI** diz se o programa está a fazer o seu trabalho; um
**KRI** diz se o risco está a mover-se em direção à borda da apetência.

| Indicador | Tipo | Definição | Produzido por |
|---|---|---|---|
| Cobertura de registo | KPI | Proporção de sistemas de IA e agentes descobertos com uma entrada de registo e um proprietário | Camada 02; [Shadow-AI Discovery](/patterns/shadow-ai-discovery) |
| IA não registada encontrada | KRI | Contagem de IA em execução sem entrada, por nível | Descoberta da Camada 02 |
| Cobertura de gate | KPI | Proporção de lançamentos de produção que passaram por um gate de avaliação | Camada 03 |
| Exceções abertas por idade | KRI | Exceções em direto, as mais antigas primeiro; as expiradas marcadas | Registo de exceções (camada 01) |
| Tempo para decisão | KPI | Dias medianos desde intake até go/no-go, por nível | Fluxo de trabalho de intake |
| Avaliações atuais | KPI | Sistemas de risco elevado com uma AIPD ou AIPD atual | Camada 02 |
| Incidentes e tempo para conter | KRI | Incidentes de IA por gravidade; tempo mediano para detetar e conter | Camadas 04 e 05 |
| Qualidade de supervisão | KRI | Taxa de sobreposição e tempo para decidir em pontos de verificação humanos | Camada 04 |
| Cobertura de literacia | KPI | Proporção de cada persona com um registo de formação atual | Registos de formação |
| Relógios de preocupação cumpridos | KPI | Relatórios reconhecidos dentro de sete dias e respondidos dentro de três meses | Canal de preocupações |
| Reavaliações de fornecedores em atraso | KRI | Fornecedores de Nível 1 após a sua data de reavaliação | Ficheiro de aquisição |
| Redução efetiva do risco | KPI | Mudança na taxa de modos de falha nomeados em produção | Camada 05 |

A última linha importa mais e é mais difícil de preencher, razão pela qual pertence ao pacote do
conselho desde o início
([valor 7](/bok/values-and-principles#7-success-is-measured-in-realised-risk-reduction-not-framework-coverage)).
Os indicadores de cobertura são entradas; o capítulo 07
([métricas por nível](/bok/maturity-model#metrics-per-level)) mostra as métricas de engenharia
abaixo delas. O pacote do conselho é uma página: tendências para seis a oito indicadores, qualquer
coisa fora do limiar, decisões que o conselho deve tomar, exceções acima da apetência. Uma consulta
gera-o; um pacote montado manualmente afasta-se dos sistemas que descreve.

## Revisão de gestão e melhoria contínua

Um sistema de gestão melhora apenas se alguém observar a evidência num calendário e mudar algo. A
ISO/IEC 42001 pede monitorização e medição, auditoria interna e revisão de gestão (cláusulas 9.1 a
9.3) e melhoria contínua com ação corretiva (cláusulas 10.1 e 10.2); leia a norma para as entradas e
saídas obrigatórias [2]. Uma revisão pode servir vários sistemas de gestão
([integração da ISO/IEC 42001 com 27001, 27701 e 9001](/bok/principles-and-standards#integrating-with-27001-27701-and-9001),
capítulo 22). O NIST pede revisão periódica planeada do processo de risco, com funções e frequência
definidas (GOVERN 1.5) [3].

Engenheira a revisão para produzir alterações, não atas. Entradas: o pacote de KPI/KRI, constatações
de auditoria, incidentes e quase-acidentes, preocupações, alterações na legislação e normas, ações
corretivas abertas. Saídas, registadas como dados: um diff de política com data efetiva, uma
alteração de limiar, uma decisão de recursos, uma ação corretiva com proprietário e data de
conclusão. Acompanha ações corretivas da forma como `OSCAL` acompanha um plano de ação e marcos
(capítulo 04), para que cada revisão comece com o que foi prometido e o que foi feito. Uma revisão
que não altera nada durante dois ciclos significa que a evidência não a está a atingir, ou não é
acreditada.

**Correspondências:** Regulamento da IA da UE `Art. 4` (literacia no domínio da IA), `Art. 26(2)`
(competência de supervisão), `Art. 87` (comunicação de infrações) · Diretiva (UE) 2019/1937 ·
California SB 53 (Labor Code §1107.1) · ISO/IEC 42001 cláusulas 7.2–7.3, 9.1–9.3, 10.1–10.2; Anexo
A.3.3 · NIST AI RMF GOVERN 1.5, 2.2, 4 · camadas 1 Govern-as-Code e 5 Assurance & Continuous
Compliance.

## Estratégia, valor e se deve usar IA

A governação geralmente começa depois de alguém ter decidido construir. Deveria começar um passo
antes. O NIST AI RMF espera que os objetivos para IA e o valor comercial de cada caso de uso sejam
documentados (MAP 1.3, 1.4), que benefícios e custos sejam examinados, incluindo os custos não
monetários de erros (MAP 3.1, 3.2), e, após mapeamento, uma "decisão inicial de prosseguir/não
prosseguir sobre se desenhar, desenvolver ou implantar um sistema de IA"; mais tarde questiona
novamente se o desenvolvimento ou implantação devem prosseguir (MANAGE 1.1) [3].

Torna a questão um campo obrigatório. Um memorando de justificação na admissão (ilustrativo):

```yaml
use_case: refund-triage-assistant
owner: team-support-platform
problem: "Refund requests wait days for a first answer"
non_ai_alternative: "Rules engine plus extra staff at peak"
why_ai: "Free-text requests; the rules engine misroutes a large share"
benefit_metric: "Median time to first answer"
who_bears_errors: "Customers wrongly refused a refund"
contest_route: "Human review on request, within two working days"
reversible: true
kill_criteria: "Wrong-refusal rate above the tier threshold for two weeks"
```

Cinco questões decidem a maioria dos casos. Existe uma alternativa não-IA a custo aceitável? O
benefício pode ser medido, e por quem? Quem suporta os erros, e podem contestá-los? A decisão é
reversível? O que nos faria parar? Um caso de uso que não consegue responder à última questão não
está pronto para um gate, porque não há limiar para fazer cumprir.

Agregados, os memorandos são o portfólio de IA: onde a organização gasta, que riscos carrega, que
benefícios mediu. Também respondem à acusação de que a governação apenas atrasa as coisas. "Tempo
para decisão" é um KPI do programa, e um caminho pavimentado que leva um caso de uso de baixo risco
da admissão à produção em dias é como a governação permite a entrega em vez de a taxar.

## Constituir um programa sem capacidade de engenharia

Muitas organizações que precisam de um programa não constroem IA nenhuma; compram-na. A rota
centrada em engenharia do capítulo 04
([a stack mínima viável para uma equipa de um](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one))
assume um pipeline para colocar gates. Um comprador ainda tem pipelines: aquisição, identidade e
despesas. Constrói sobre esses.

| Pilar | Artefato mínimo | Imposto através de |
|---|---|---|
| Carta e âmbito | Carta do programa; carta do comité | Aprovação do patrocinador executivo |
| Inventário | Registo com proprietário, prestador, classes de dados e nível | Admissão de aquisição; catálogo de aplicações de início de sessão único; revisão de despesas |
| Conjunto de políticas | Utilização aceitável; admissão de IA; IA de terceiros | Aprovação de compra; controlos de gateway ou navegador |
| Funções | Proprietário nomeado por sistema; adesão ao comité | Campo obrigatório do registo |
| Literacia | Módulos baseados em funções; registos de treino | Acesso a ferramentas condicionado a atestação |
| Métricas | Cinco indicadores da tabela acima | Consulta mensal sobre dados de registo e aquisição |
| Cadência de revisão | Revisão de gestão trimestral | Decisões registadas como dados |

Primeiros 90 dias: carta, comité, política de utilização aceitável e um inventário semeado a partir
de aquisição e catálogo de início de sessão (dias 1 a 30); a bandeira de IA em pedidos de compra,
estratificação do que já foi comprado, módulos para operadores dos sistemas mais arriscados (dias 31
a 60); o primeiro pacote de KPI, a primeira revisão de gestão e uma decisão sobre qual controlo
automatizar primeiro (dias 61 a 90). O Q&A da Comissão nota que o Artigo 4 não obriga a nenhuma
estrutura de governação específica [10]; dimensiona o programa ao que a organização executa e faz
crescer o código com o portfólio. O capítulo 13 define quanto do ciclo de risco cada tipo de
organização executa
([governação proporcional](/bok/risk-management#proportionate-governance-tailoring-the-loop)), e a
página de modelos tem secções iniciais de
[comité, RACI e política de IA](/resources/templates#tpl-kit).
## Políticas ao longo do ciclo de vida

### Política, norma, procedimento, código

Documentos de política falham por serem demasiado vagos para fazer cumprir ou demasiado detalhados
para manter atualizados. Uma hierarquia de quatro níveis dá a cada nível um trabalho.

| Nível | Respostas | Aprovado por | Alterações | Exemplo |
|---|---|---|---|---|
| Política | Porquê e o quê: princípios, apetite, âmbito | Conselho ou comité | Raramente | "Nenhum sistema de IA chega à produção sem um proprietário e um gate de avaliação aprovado." |
| Norma | Requisitos mensuráveis por nível | Comité ou delegado | Trimestral | "Sistemas de nível 2 e 3 pontuam pelo menos 0,95 na suite de injeção." |
| Procedimento | Como, passo a passo | Proprietário da função | Conforme necessário | "Execute o gate localmente; anexe o resultado à entrada do registo." |
| Política como código | A regra imposta | Revisão de código com o proprietário da política | Cada alteração é um pull request | `eval.injection-floor.v4` |

ISO/IEC 42001 pede uma política de IA (cláusula 5.2) e tem controlos sobre políticas relacionadas
com IA (Anexo A.2) [2]; NIST pede que políticas e procedimentos de risco de IA estejam em vigor,
sejam transparentes e implementados eficazmente (GOVERN 1) [3]. A hierarquia adiciona uma regra de
engenharia: cada regra em código carrega os ids da norma e política que implementa, para que um
leitor possa caminhar de uma construção falhada para a frase que o conselho aprovou.

### O que a política requer em cada fase

Cada fase tem um requisito mínimo, um gate que o impõe e a evidência que deixa. Os capítulos 14 e 15
tratam as fases de construção e execução em profundidade.

| Fase | A política requer | Gate que o impõe | Evidência | Camada |
|---|---|---|---|---|
| Admissão | Memorando de justificação; nível de risco; rastreio de utilização proibida; gatilhos de revisão | A admissão escreve um stub de registo; sem stub, sem implantação | Entrada de registo; registo de nível | 1 · 2 |
| Conceção | [Modelo de ameaça](/patterns/ai-threat-model); desenho de supervisão; avaliação de impacto quando acionada | Revisão de desenho como verificação obrigatória | Modelo de ameaça; referência FRIA/AIPD | 1 · 3 |
| Dados | Registo de aquisição; base legal; licença; verificações de qualidade e enviesamento | [Pipeline recusa um conjunto de dados sem uma ficha de dados válida](/patterns/dataset-admission-gate) | Ficha de dados; linhagem | 2 · 3 |
| Construção | Modelos e plataformas aprovados; prompts versionados, recuperação e ferramentas; AIBOM | Verificações de política de CI; lista de permissões de modelo | AIBOM; vereditos de política | 1 · 2 |
| Teste | Categorias de avaliação obrigatórias e limiares por nível; red teaming para níveis superiores | Gate de avaliação | Resultados de avaliação | 3 |
| Lançamento | Pacote de implantação completo; aprovações; avisos de transparência | Controlo de admissão lê o registo | Registo de lançamento; ficha de modelo | 1 · 2 · 5 |
| Operação | Monitorização; supervisão; definição de incidente e escala de gravidade; registo | Guardrails; alertas; pipeline de incidentes | Rastreios; eventos de guardrail; registos de incidentes | 4 · 5 |
| Alteração | Gatilhos de alteração material para âmbito de modelo, prompt, dados e ferramentas | Gates re-executados na alteração; bump de versão de registo | Diff; novos resultados de avaliação | 1 · 3 |
| Desativação | Revogar identidades, arquivar evidência, eliminar ou reter dados | Estado de registo `retired`; identidade revogada | Registo de desativação | 2 · 4 · 5 |

Três fases faltam frequentemente em conjuntos de políticas. **Operar** precisa de uma definição de
incidente mais ampla do que a da lei. O "incidente grave" do Regulamento da IA cobre morte ou lesão
grave à saúde, perturbação grave e irreversível de infraestrutura crítica, violação de obrigações de
direitos fundamentais e dano grave à propriedade ou ambiente [16]; a maioria dos incidentes que um
programa deve aprender fica abaixo dessa linha (um lote enviesado, um prompt vazado, uma chamada de
ferramenta fora do âmbito). Encaminha cada gravidade através de um pipeline e deixa apenas a classe
superior iniciar um relógio estatutário (capítulo 17,
[Incidentes, questões e causas raiz](/bok/incidents#a-severity-scale-mapped-to-the-clocks)). Os
responsáveis pela implantação de alto risco também devem informar o prestador e suspender a
utilização quando têm razão para considerar que o sistema apresenta um risco (`Art. 26(5)`) [6].
**Alteração** precisa de gatilhos, porque uma edição de prompt ou uma nova fonte de recuperação pode
alterar o comportamento tanto quanto um novo modelo. **Retirar** precisa de um
[runbook](/patterns/deactivation-localisation-retirement-runbook): NIST pede desativação segura "de
forma que não aumente riscos" (GOVERN 1.7) [3], o que significa revogar cada identidade e
credencial, marcar a entrada de registo como retirada, arquivar a evidência para o seu período de
retenção e aplicar regras de retenção aos dados de treino e derivados.

### Política como código: uma fonte, duas saídas

A deriva entre um PDF de política e a verificação que a impõe é onde os auditores encontram as suas
constatações. Escreve cada regra uma vez, como dados, e compila-a duas vezes: na prosa que as
pessoas leem e na verificação que o pipeline executa. A fonte (ilustrativa):

```yaml
id: AIP-07
title: Evaluation before release
owner: ai-governance-committee
effective: 2026-10-01
maps_to: ["EU AI Act Art. 15", "ISO/IEC 42001 A.6", "NIST AI RMF MEASURE"]
rules:
  - rule_id: eval.injection-floor.v4
    applies_to_tiers: [2, 3]
    suite: injection-resistance.v4
    threshold: 0.95
    exceptions: register
```

O compilador de prosa renderiza: "AIP-07.1. Um sistema de IA de nível 2 ou nível 3 é lançado apenas
se a sua última execução de `injection-resistance.v4` pontua pelo menos 0,95. As exceções seguem o
registo de exceções. Proprietário: comité de governação de IA. Efetivo 1 out 2026." O compilador de
código renderiza a verificação (ilustrativa `OPA/Rego`):

```rego
package aip07

import rego.v1

deny contains msg if {
  input.system.tier in {2, 3}
  r := input.evals["injection-resistance.v4"]
  r.score < 0.95
  not exception_active(input.system.id, "eval.injection-floor.v4")
  msg := sprintf("AIP-07 eval.injection-floor.v4: %s scored %v, below 0.95", [input.system.id, r.score])
}

exception_active(sys, rule) if {
  some e in data.exceptions
  e.system == sys
  e.rule_id == rule
  time.parse_rfc3339_ns(e.expires) > time.now_ns()
}
```

Ambas as saídas vêm de um commit, para que a política publicada e a regra imposta não possam
discordar. A mesma fonte alimenta o [Framework Crosswalk](/patterns/framework-crosswalk) e, para
agentes, uma [Policy Card](/patterns/policy-card). Testes provam que a regra dispara numa entrada
violadora e passa uma limpa, conforme a camada 01 requer.

## Atualizar as políticas que já tens

A maioria das organizações não precisa de uma nova política para cada preocupação de IA. Precisam
que as suas políticas de privacidade, segurança, governação de dados e propriedade intelectual vejam
IA. Uma avaliação de lacunas encontra onde não o fazem.

1. **Inventaria** cada política que toca sistemas de IA ou seus dados, incluindo aquisição, RH,
   registos e utilização aceitável.
2. **Testa cada contra os cinco objetos** (modelo, sistema, agente, dados, organização) e as fases
   do ciclo de vida: nomeia o objeto, contém uma regra que se aplica a ele, e diz que evidência
   mostra que a regra é seguida?
3. **Decide: estender ou criar.** Estende quando o proprietário existente e o controlo se ajustam
   (uma regra de retenção que apenas precisa de artefatos de modelo adicionados). Cria quando um
   novo objeto precisa de um novo proprietário (identidade de agente não tem casa numa política de
   controlo de acesso clássica).
4. **Arquiva cada lacuna como dados** (política, cláusula, lacuna, decisão, proprietário, data de
   conclusão, evidência), para que o registo de lacunas seja uma consulta e o seu encerramento um
   KPI.

| Política | Lacunas típicas de IA | Adições típicas | Evidência |
|---|---|---|---|
| Privacidade | Base legal para treino versus inferência; limitação de finalidade na reutilização; o que modelos memorizam; avisos; direitos sobre modelos e saídas; retenção de dados de treino e derivados | Tags de finalidade de conjunto de dados; gatilhos de AIPD para IA; procedimento para [pedidos de direitos contra modelos](/patterns/rights-requests-against-models) | AIPD; ficha de dados; registo de pedidos de direitos |
| Segurança | Injeção de prompt, envenenamento, extração de modelo e ameaças da cadeia de fornecimento faltam na avaliação de risco e playbooks; sem fontes de modelo confiáveis | Ameaças de IA na avaliação de risco do ISMS; playbooks de incidentes de IA; lista de permissões de modelo e conjunto de dados | Modelo de ameaça; resultados de red-team; lista de permissões |
| Governação de dados | Linhagem sem proveniência; dados raspados, intermediados e sintéticos sem etiqueta; sem retenção por camada | Política de aquisição (abaixo); campos de proveniência; retenção para dados brutos, características, etiquetas e pesos | Ficha de dados; grafo de linhagem |
| Propriedade intelectual | Direitos de treino e exclusões de mineração de texto e dados; utilização de resultados; segredos comerciais em prompts; licenças de peso aberto; indenizações de fornecedores | Revisão de direitos por conjunto de dados; regras de utilização de resultados; regras de prompts por classe de dados; revisão de licença de modelo | [Registo de direitos](/patterns/training-data-rights-ledger); registos de licença |

Três notas. Para **segurança**, o catálogo de ameaças de agentes (desvio de objetivo, uso indevido
de ferramentas, abuso de identidade e privilégio, agentes desonestos) é a lista de verificação a
adicionar ao modelo de ameaça existente [17]. Para **governação de dados**, mantenha uma distinção
clara: *linhagem* é o caminho que os dados percorreram através dos seus pipelines; *proveniência* é
de onde vieram e em que termos. Linhagem perfeita sobre proveniência desconhecida ainda é não
governada. Para **propriedade intelectual**, a lei da UE permite aos titulares de direitos reservar
obras da mineração de texto e dados "de forma apropriada, tal como por meios legíveis por máquina no
caso de conteúdo disponibilizado publicamente em linha" (Diretiva (UE) 2019/790, Art. 4(3)) [18], e
os fornecedores de modelos de finalidade geral devem ter uma política para identificar e cumprir
essas reservas (`Art. 53(1)(c)`) [19]. Os capítulos 19 e 20
([Direito da privacidade e proteção de dados aplicado à IA](/bok/privacy-and-ai#principles-applied-to-ai),
[Outra lei que já se aplica à IA](/bok/existing-law#how-to-read-this-chapter)) cobrem a lei; o
trabalho da política é tornar cada regra verificável.

## Uma política de aquisição de dados

A maioria das falhas de governação de dados são decididas na aquisição: uma raspagem que ninguém
delimitou, um conjunto de dados de um intermediário sem proveniência, etiquetas produzidas em
condições que ninguém verificou. ISO/IEC 42001 tem um controlo de Anexo A sobre a aquisição de dados
(A.7.3) [2]. A política nomeia fontes aceitáveis e as condições mínimas para cada uma, e torna cada
condição um campo no registo de aquisição.

| Fonte | Condições mínimas | Campo de evidência |
|---|---|---|
| Dados de primeira parte recolhidos para outro fim | Compatibilidade de fim avaliada; aviso atualizado; AIPD se acionada | Etiqueta de fim; base legal |
| Raspagem web | Fontes sensíveis excluídas; reservas legíveis por máquina e ficheiros de exclusão respeitados; lista de exclusão honrada; recolha limitada no tempo | Hash de configuração do crawler; versões de lista de exclusão e exclusão |
| Intermediários de dados e conjuntos de dados licenciados | Cadeia de proveniência; garantias de base legal; licença cobrindo treino de IA; direito de auditoria; eliminação a pedido | Id de contrato; declaração de proveniência |
| Dados etiquetados ou anotados | Diretrizes escritas; piloto; acordo entre anotadores acima de um limiar; salário e condições padrão; garantia de qualidade | Versão de diretriz; pontuação de acordo; atestado de fornecedor |
| Dados partilhados por um parceiro | Acordo cobrindo fim, retenção, partilha posterior, segurança, eliminação, aviso de violação e auditoria | Id de acordo |
| Dados sintéticos | Gerador e dados de semente registados; etiquetados como sintéticos; teste de re-identificação | Versão de gerador; resultado de teste |

A linha de raspagem segue a Opinião 28/2024 do Comité Europeu para a Proteção de Dados, cujas
medidas mitigadoras incluem excluir certas fontes e categorias de dados, respeitar "ficheiros
robots.txt ou ai.txt ou qualquer outro mecanismo reconhecido" que se oponha à raspagem, e uma lista
de exclusão gerida pelo responsável [20]. A linha de etiquetagem segue a orientação da Partnership
on AI sobre o fornecimento de trabalho de enriquecimento de dados, que cobre seleção de fornecedor,
pilotos, instruções claras, termos de pagamento, comunicação com trabalhadores, garantia de
qualidade e desativação [21]. As condições dos anotadores são uma questão de governação: etiquetas
produzidas com pressa sob instruções pouco claras tornam-se o ruído e o enviesamento que a suite de
avaliação mais tarde tem de encontrar.

Aplique na fronteira do pipeline: nenhum conjunto de dados entra num pipeline de treino, ajuste fino
ou recuperação sem um registo de aquisição que passe validação de esquema, e o registo flui para a
ficha de dados e o [AIBOM](/patterns/aibom) (ver
[governação de dados através da stack](/bok/the-stack#data-governance-across-the-stack)).

## Política de IA de terceiros

A maioria da IA que uma organização executa, comprou-a. O capítulo 04 explica como a stack se
degrada para IA procurada
([IA de terceiros e procurada](/bok/the-stack#third-party-and-procured-ai)), e o capítulo 05 dá o
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate). ISO/IEC 42001 cobre
relações de terceiros e clientes no Anexo A.10 [2]; NIST pede políticas sobre risco de IA de
terceiros, incluindo violação de propriedade intelectual de terceiros, e processos de contingência
para falhas em dados ou sistemas de terceiros de alto risco (GOVERN 6.1, 6.2) [3].

**Entrada de aquisição.** Cada pedido de compra tem uma bandeira de IA: o produto usa IA, processa
os nossos dados com IA, treina nos nossos dados, atua nos nossos sistemas, ou toma ou apoia decisões
sobre pessoas? Um sim encaminha-o para tiering. O caso mais silencioso é a IA chegar dentro de um
produto já comprado: uma nota de lançamento adicionando uma funcionalidade de IA a um contrato
existente ativa a mesma entrada.

**Tiering de fornecedor.** Tier por criticidade, sensibilidade de dados, autonomia e contexto
regulatório, e dimensione a avaliação ao tier.

| Tier | Perfil típico | Avaliação | Reavaliação |
|---|---|---|---|
| 1 | Decisões sobre pessoas; uso de alto risco; agentes com acesso de escrita; dados de categorias especiais | Diligência devida completa; avaliações de fronteira; conjunto de cláusulas completo; aprovação de comité | Anual e em acionadores |
| 2 | Produtividade interna em dados confidenciais | Questionário com evidência; conjunto de cláusulas padrão | A cada dois anos e em acionadores |
| 3 | Sem dados confidenciais; sem decisões sobre pessoas | Verificação leve; coberta por utilização aceitável | Na renovação |

**Termos de contrato como controlos.** Uma cláusula é um controlo quando cria algo que pode
monitorizar. A Comissão Europeia publica cláusulas contratuais de IA modelo para compradores
públicos numa versão de alto risco e não-alto-risco, voluntárias e deliberadamente silenciosas sobre
PI, pagamento e proteção de dados; a versão na sua página é datada de 29 de setembro de 2023 (a
partir de 2026-09-24) [22]. São uma biblioteca de partida sólida para compradores privados também.

| Cláusula | Controlo que cria | Evidência ou monitor |
|---|---|---|
| Divulgação de uso de IA e sub-processadores | Completude de inventário; mapa de quarta parte | Registo de fornecedor; AIBOM fornecido |
| Sem treino em dados de cliente sem consentimento | Limitação de fim | Bandeira de contrato; atestado; verificação de configuração |
| Aviso de mudança material (modelo, versão, comportamento) | Acionador para re-avaliação | Aviso inicia uma re-execução de avaliação de fronteira |
| Janela de notificação de incidente | Entrada no seu próprio relógio de incidente | Timestamp de aviso no pipeline de incidente |
| Direitos de evidência e auditoria | Evidência recolhida | Ficha de modelo, resultados de avaliação e certificados no armazém de evidência |
| Dever de teste de enviesamento e remediação | Evidência de equidade para a sua utilização | Relatórios de teste de fornecedor |
| Desativação, devolução de dados e saída | Um kill switch contratual | Runbook de saída testado |
| Responsabilidade e indenização, incluindo PI | Transferência de risco, não redução de risco | Registo de contrato |

**Cadeia de fornecimento e código aberto.** O modelo de fundação sob o produto de um fornecedor é
uma dependência que herda; mapeie estas quarta partes. A cadeia de valor também pode mudar o seu
papel: sob `Art. 25`, um distribuidor, importador, responsável pela implantação ou outra terceira
parte que coloca o seu nome ou marca comercial num sistema de alto risco, o modifica
substancialmente, ou muda a finalidade prevista de um sistema para que se torne de alto risco é
tratado como seu prestador [23]. Modelos de peso aberto e conjuntos de dados abertos passam pela
mesma entrada: licença e restrições de utilização revistas, proveniência registada, artefatos
digitalizados e fixados antes de carregar, resultados no AIBOM. Reavalie em eventos, não apenas na
renovação: um incidente, uma mudança de propriedade, uma nova versão de modelo, controvérsia pública
ou ação regulatória, uma mudança na lei.

**Pessoas.** IA utilizada para recrutamento e seleção, promoção ou rescisão, alocação de tarefas, ou
monitorização e avaliação de trabalhadores é de alto risco sob Anexo III ponto 4 [24], com o dever
de informação do trabalhador de `Art. 26(7)` para responsáveis pela implantação [6]. Anotadores,
contratados e revisores terceirizados que lidam com os seus dados são parte da cadeia de
fornecimento, sob as condições de aquisição acima [21].

## Utilização aceitável de IA pelo pessoal

O glossário define IA sombra como IA em execução em produção sem registar. O uso de ferramentas não
aprovadas pelo pessoal é o seu gémeo quotidiano: um funcionário colando um ficheiro de cliente num
chatbot público. Uma política de utilização aceitável (AUP) cobre ferramentas aprovadas, entradas
proibidas por classe de dados, o dever de rever resultados, divulgação onde os resultados chegam aos
clientes, registo, o atestado necessário antes do acesso e consequências proporcionais.

| Classe de dados | Ferramenta de IA pública | Gateway de IA sancionado | Sistema interno aprovado |
|---|---|---|---|
| Público | Permitido | Permitido | Permitido |
| Interno | Não permitido | Permitido, registado | Permitido |
| Dados confidenciais ou de cliente | Não permitido | Apenas casos de utilização aprovados; registado; redatado | Permitido dentro do âmbito |
| Dados de categorias especiais ou regulados | Não permitido | Apenas com um caso de utilização apoiado por AIPD | Permitido dentro do âmbito |
| Segredos, credenciais, código restrito | Não permitido | Não permitido | Por norma de segurança |

Aplique com o [gateway](/patterns/sanctioned-ai-gateway), não o manual: ferramentas aprovadas atrás
de um único sinal de entrada e um gateway que aplica regras de classe de dados e regista utilização;
acesso condicional a um atestado AUP atual (o gate de literacia acima); descoberta de ferramentas
não aprovadas através de dados de identidade, rede e despesa (o padrão
[Shadow-AI Discovery](/patterns/shadow-ai-discovery)). Quando a descoberta encontra uma ferramenta
não aprovada, ofereça um caminho (registar, tier, aprovar ou substituir) antes de uma sanção. As
pessoas usam ferramentas não aprovadas porque o caminho aprovado é mais lento; a correção é
geralmente um caminho melhor.

> **Exemplo (ilustrativo)**
> Uma equipa legal começa a usar um assistente de redação pública para resumos de contrato. A
> descoberta sinaliza o tráfego. Em vez de bloquear o domínio, o programa executa a ferramenta
> através da entrada de aquisição, assina um acordo empresarial sem treino em dados de cliente,
> encaminha-a através do gateway sob a regra de dados confidenciais, e adiciona um módulo de uma
> página ao currículo da equipa legal. A utilização move-se para a rota sancionada dentro de
> semanas, porque agora é a mais fácil.

**Correspondências:** Reglamento da IA `Art. 25` (cadeia de valor), `Art. 26` (deveres do
responsável pela implantação), `Art. 53(1)(c)` (política de direitos de autor de GPAI), Anexo III
ponto 4 (emprego) · Diretiva (UE) 2019/790 `Art. 4(3)` · ISO/IEC 42001 cláusula 5.2; Anexo A.2,
A.7.3, A.10 · NIST AI RMF GOVERN 1, 6; MAP 1, 3; MANAGE 1.1 · camadas 1 Governance-as-Code, 2
Inventory & Transparency e 5 Assurance & Continuous Compliance.

## O que pode fazer esta semana

1. **Escreva a carta do comité numa página**, listando os quatro tipos de decisão que apenas o
   comité toma e afirmando que os gates aplicam tudo o resto.
2. **Crie o registo de exceção** como um ficheiro no repositório de política, aponte um gate para
   ele e defina uma expiração máxima.
3. **Condicione uma ferramenta no portão um ao treino**: torne o acesso à consola de sobreposição do
   seu sistema de maior risco, ou ao seu gateway de IA, dependente de um registo de treino atual.
4. **Gere três indicadores de conselho a partir de dados em direto**: cobertura do registo, IA não
   registada encontrada e exceções abertas por idade.
5. **Execute a avaliação de lacunas em duas políticas** (privacidade e segurança) contra os cinco
   objetos, e registe cada lacuna como uma linha com um proprietário.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 17 (quality management system; Art. 17(1)(a) strategy for regulatory compliance; Art. 17(1)(m) accountability framework; Art. 17(2) proportionality, as amended by Reg. (EU) 2026/1744). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_17 (verified: primary)
[2] ISO/IEC 42001:2023, AI management system (referenced by number only: clauses 5.1–5.3, 7.2–7.3, 9.1–9.3, 10.1–10.2; Annex A.2, A.3.2, A.3.3, A.7.3, A.10). ISO/IEC. 2023-12. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1, 1.5, 1.7, 2.1–2.3, 3.1, 4.1, 4.3, 5.1, 6.1–6.2; MAP 1.3–1.4, 3.1–3.2; MANAGE 1.1; initial go/no-go decision after MAP). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[4] The IIA's Three Lines Model: an update of the Three Lines of Defense (governing body; management's first- and second-line roles; internal audit as third line; third-line independence). The Institute of Internal Auditors. 2020-07. https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/ (verified: primary)
[5] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (CAIO within 60 days; AI use-case inventory; independent review of high-impact use cases before risk acceptance; CFO Act agency AI Governance Boards within 90 days, chaired at Deputy Secretary level, with IT, cybersecurity, data, budget, legal, privacy, civil rights and civil liberties representation). Office of Management and Budget, The White House. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[6] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 26 (deployer obligations: 26(1) use per instructions; 26(2) oversight by persons with competence, training and authority; 26(5) monitoring, informing the provider and suspension; 26(7) informing workers' representatives and affected workers). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_26 (verified: primary)
[7] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[8] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 4 (as amended by Reg. (EU) 2026/1744: providers and deployers "take measures to support the development of AI literacy"; no guaranteed level for any individual; support from the Commission and Member States; Board recommendations; applies since 2 Feb 2025 under Art. 113(a)). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_4 (verified: primary)
[9] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[10] AI Literacy: Questions & Answers (obligation remains, no specific or "sufficient" level mandated; no certificate needed; internal record of trainings; "other persons" include contractors, service providers and clients; no specific governance structure mandated; instructions for use alone not sufficient; supervision by national market-surveillance authorities from 2 Aug 2026). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers (verified: primary)
[11] "Postmortem Culture: Learning from Failure" (John Lunney, Sue Lueder), in Site Reliability Engineering. Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[12] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 87 (Directive (EU) 2019/1937 applies to the reporting of infringements of the AI Act and the protection of reporting persons; applies from 2 Aug 2026 under Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_87 (verified: primary)
[13] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (Art. 8(1) and 8(3) internal channels for private entities with 50 or more workers; Art. 9(1)(b) acknowledgment within seven days; Art. 9(1)(f) feedback within three months; Art. 19 prohibition of retaliation). Publications Office of the EU (EUR-Lex). 2019-10-23. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[14] SB 53, Transparency in Frontier Artificial Intelligence Act (Chapter 138, Statutes of 2025, approved and filed 29 Sep 2025, a regular-session statute and so in force from 1 Jan 2026 under Cal. Const. art. IV, §8(c)(1); Labor Code §§1107–1107.2: "covered employee", no rule preventing disclosure, no retaliation, notice of rights, anonymous internal process for large frontier developers with monthly updates and quarterly sharing with officers and directors). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[15] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[16] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 3(49) (definition of "serious incident"). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_3 (verified: primary)
[17] Top 10 for Agentic Applications 2026. OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[18] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(1) text-and-data-mining exception; Art. 4(3) reservation by rightholders, by machine-readable means for content online). Publications Office of the EU (EUR-Lex). 2019-04-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng#art_4 (verified: primary)
[19] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 53(1)(c) (GPAI providers' copyright policy, incl. identifying and complying with Art. 4(3) reservations). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_53 (verified: primary)
[20] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (paras 104–106: web-scraping mitigations incl. excluding sources and data categories, respecting robots.txt or ai.txt, opt-out lists). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/our-work-tools/our-documents/opinion-board-art-64/opinion-282024-certain-data-protection-aspects_en (verified: primary)
[21] Responsible Sourcing of Data Enrichment Services (provider selection, pilots, instructions, payment terms, communication with workers, quality assurance, offboarding). Partnership on AI. 2021-06-16. https://partnershiponai.org/paper/responsible-sourcing-considerations/ (verified: primary)
[22] EU model contractual AI clauses (MCC-AI) to pilot in procurements of AI (high-risk and non-high-risk versions; voluntary; exclude IP, payment and GDPR terms). Public Buyers Community, European Commission. 2023-09-29. https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/eu-model-contractual-ai-clauses-pilot-procurements-ai (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Art. 25(1) (a value-chain actor becomes the provider when it puts its name or trademark on a high-risk system, makes a substantial modification, or modifies the intended purpose so that the system becomes high-risk). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#art_25 (verified: primary)
[24] Regulation (EU) 2024/1689 (AI Act), consolidated text of 2026-07-27, Annex III, point 4 (employment, workers' management and access to self-employment: recruitment and selection; decisions on work relationships, task allocation, monitoring and evaluation). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng#anx_III (verified: primary)
