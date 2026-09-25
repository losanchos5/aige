---
lang: pt
source: bok/18-eu-ai-act.md
sourceHash: "27e0f6a82271ee4899688f462429d1cbc2f0599581148abdf4dbc5e2407b5ba6"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 18. O Regulamento da IA da UE numa passagem

> O Regulamento da IA da UE, conforme alterado pelo Omnibus Digital, lido de ponta a ponta: o que
> cobre, como classifica o risco, quem carrega qual dever, e a data em que cada dever começa a
> aplicar-se.

## Como ler este capítulo

Este capítulo ensina o Regulamento; o [capítulo 08](/bok/regulatory-map#eu-ai-act-post-omnibus)
indexa-o. Lê este para a lógica da lei e o capítulo 08 para as linhas de obrigação completas. Cada
dever abaixo nomeia o artefato que o evidencia e a camada da stack que o produz.

O texto é lido contra o Regulamento (UE) 2024/1689 [1] conforme alterado pelo Regulamento (UE)
2026/1744, o Omnibus Digital sobre IA [2], e cada data é marcada a partir de 2026-09-24. É uma
leitura de engenheiro, não aconselhamento jurídico. O engenheiro constrói o controlo e a evidência;
o conselho confirma que a obrigação foi lida corretamente (ver
[tradução regulatória](/bok/the-role#regulatory-translation)). Os mapeamentos são ilustrativos, não
uma afirmação de conformidade.

As camadas da stack nomeadas ao longo são as cinco do capítulo 04:
**1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.

## O Regulamento e o Omnibus

O Regulamento da IA é uma regulamentação de segurança de produtos com objetivos de direitos
fundamentais. É diretamente aplicável em todos os Estados-Membros, entrou em vigor em 1 de agosto de
2024, e os seus deveres ativam-se em fases [1][2]. Quatro ideias sustentam todo o texto:

1. **Uma porta de definição.** É a coisa um sistema de IA, um modelo de IA de finalidade geral
   (GPAI), ou nenhum dos dois?
2. **Uma escada de risco.** Qual é o degrau em que a finalidade prevista do sistema o coloca?
3. **Um conjunto de papéis de operador.** Qual é o chapéu que a tua organização usa para este
   sistema?
4. **Uma cronologia.** A partir de qual data é que cada dever entra em vigor?

O **Omnibus Digital sobre IA** é o Regulamento (UE) 2026/1744 de 8 de julho de 2026. Foi publicado
no Jornal Oficial em 24 de julho de 2026 e entrou em vigor no terceiro dia após a publicação, 27 de
julho de 2026 [2]. Não reescreveu o Regulamento. Moveu as datas de risco elevado, adicionou duas
proibições e fez alterações direcionadas que importam para um engenheiro (o seu homólogo RGPD é uma
proposta separada, coberta em
[o lado RGPD do Omnibus Digital](/bok/privacy-and-ai#the-gdpr-side-of-the-digital-omnibus), capítulo
19):

| Alteração | Onde | O que significa para o engenheiro |
|---|---|---|
| Deveres de risco elevado adiados | `Art. 113(c)` | Anexo III a partir de 2027-12-02; Anexo I a partir de 2028-08-02 |
| Duas novas proibições | `Art. 5(1)(ba)`, `(bb)` | Imagens íntimas sem consentimento e material de abuso sexual infantil, a partir de 2026-12-02 |
| Literacia em IA reformulada | `Art. 4` | "Tomar medidas para apoiar" literacia; nenhum nível garantido |
| Base de dados de detecção de enviesamento | `Art. 4a` (`Art. 10(5)` eliminado) | Dados de categorias especiais para correção de enviesamento, com salvaguardas rigorosas |
| "Componente de segurança" estreitado | `Art. 3(14)`, `6(1a)` para `6(1c)` | Menos sistemas incorporados classificados como risco elevado |
| Alívio para PME e pequena empresa média (PMC) | `Arts. 11`, `17`, `63`, `99(6a)` | Documentação e QMS simplificados; multas mais baixas |
| Cooperação na cadeia de valor | `Art. 25(2)`, `25(4)`, `99(4)(da)` | Os prestadores iniciais devem entregar documentação e acesso; o dever é multado |
| FRIA pode reutilizar a AIPD | `Art. 27(4)`, `27(5)` | Um registo de avaliação, com referência cruzada |
| Serviço para a IA supervisiona alguns sistemas | `Arts. 75(1)`, {`75a`} para {`75d`} | Um segundo supervisor com poderes diretos |
| Presunção do Regulamento de Ciber-Resiliência | `Art. 42(3)` | A conformidade com CRA conta para {`Art. 15`} cibersegurança |
| Organismos notificados | `Arts. 28` para `30`, Anexo XIV | Aplicação única; um código de designação que nomeia IA agêntica ({`AIH 0401`}) |

Tudo o que acima se refere está no texto de alteração [2]. Os números de artigos no resto do
capítulo são os posteriores ao Omnibus.

## Âmbito e alcance

### Quem está no âmbito

O artigo 2.º, n.º 1, abrange prestadores que colocam sistemas de IA ou modelos de IA de finalidade
geral no mercado da UE, independentemente de onde estejam estabelecidos; responsáveis pela
implantação na União; prestadores e responsáveis pela implantação em países terceiros cujo resultado
do sistema é utilizado na União; importadores e distribuidores; fabricantes de produtos que colocam
IA com o seu produto sob o seu próprio nome; mandatários de prestadores não-UE; e pessoas afetadas
na União [1].

O alcance é extraterritorial de duas formas: pela colocação e pelo resultado [1]. A consequência de
engenharia é um campo de registo. "Onde está alojado?" não é a questão de âmbito; "onde é utilizado
o seu resultado?" é. Um registo de agentes que regista apenas a região de alojamento não consegue
responder.

### O que conta como um sistema de IA

O artigo 3.º, n.º 1, define um **sistema de IA** como "um sistema baseado em máquinas que é
concebido para funcionar com níveis variáveis de autonomia e que pode apresentar capacidade de
adaptação após a implantação, e que, para objetivos explícitos ou implícitos, infere, a partir da
entrada que recebe, como gerar resultados, tais como previsões, conteúdo, recomendações ou decisões
que podem influenciar ambientes físicos ou virtuais" [1]. As orientações da Comissão leem a frase
como sete elementos (baseado em máquinas; autonomia; possível capacidade de adaptação; objetivos;
inferência; resultados; influência em ambientes) e observam que nem todos os elementos têm de estar
presentes tanto na fase de construção como na fase de utilização [3].

O elemento decisivo é a inferência. As orientações excluem sistemas baseados em regras definidas
unicamente por pessoas singulares, e nomeiam quatro famílias que calculam mas podem ainda ficar fora
da definição: sistemas para melhorar a otimização matemática, processamento básico de dados,
sistemas baseados em heurísticas clássicas e sistemas de previsão simples [3]. As orientações não
são vinculativas [3].

Para o engenheiro, o âmbito é uma decisão registada, não uma suposição. Cada entrada de registo
contém `ai_system: true | false` e, quando falsa, o elemento que falha e o raciocínio. Uma chamada
"não é um sistema de IA" sem raciocínio anexado é a primeira coisa que uma autoridade perguntará. Um
**modelo de IA de finalidade geral** é um objeto separado com a sua própria definição
(`Art. 3(63)`), abordado abaixo; um modelo não é um sistema de IA por si só e necessita de
componentes adicionais, como uma interface de utilizador, para se tornar um (considerando 97) [1]. O
que "IA" significa tecnicamente, para além do teste legal, é o assunto do
[capítulo 11](/bok/ai-defined#four-definitions-compared).

### O que a Lei exclui

| Exclusão | Artigo | O que observar |
|---|---|---|
| Militar, defesa ou segurança nacional | `Art. 2(3)` | A exclusão abrange sistemas utilizados *exclusivamente* para esses fins; um sistema de dupla utilização está no âmbito para os seus outros usos |
| Autoridades públicas de países terceiros e organizações internacionais em cooperação em matéria de aplicação da lei ou judicial | `Art. 2(4)` | Apenas com salvaguardas adequadas para os direitos fundamentais |
| Investigação e desenvolvimento científicos como único objetivo | `Art. 2(6)` | O sistema ou modelo deve ser especificamente desenvolvido e colocado em serviço para esse único objetivo |
| Investigação, testagem e desenvolvimento antes da colocação no mercado | `Art. 2(8)` | A testagem em condições reais não é abrangida pela exclusão |
| Utilização puramente pessoal, não profissional | `Art. 2(10)` | Remove obrigações de responsável pela implantação apenas para pessoas singulares |
| Sistemas de IA livres e de código aberto | `Art. 2(12)` | Não se estiverem colocados no mercado como de risco elevado, ou apanhados por `Art. 5` ou `Art. 50` |
| Produtos sob o Anexo I, Secção B (regimes setoriais) | `Art. 2(2)` | Pós-Omnibus, apenas `Art. 6(1)`, {`Art. 60a`} e {`Arts. 102`} a {`112`} se aplicam |

As primeiras seis linhas estão no texto original [1]; a linha da Secção B é conforme alterada [2]. A
lei de proteção de dados da União aplica-se juntamente com a Lei em todos os casos (`Art. 2(7)`).

## A escada de risco

A Lei classifica os sistemas de IA por finalidade prevista em quatro degraus, e coloca modelos de IA
de finalidade geral numa pista separada. Um sistema pode estar em dois degraus ao mesmo tempo: um
chatbot do Anexo III carrega tanto as obrigações de risco elevado como a obrigação de divulgação
`Art. 50`.

| Degrau | Teste | Consequência | Artigos | Aplica-se a partir de |
|---|---|---|---|---|
| Proibido | A prática está listada em `Art. 5` | Não pode ser colocada no mercado, colocada em serviço ou utilizada | `Art. 5` | 2025-02-02; novos pontos 2026-12-02 |
| Risco elevado | Componente de segurança do Anexo I que necessite avaliação de terceiros, ou uma utilização do Anexo III não filtrada por `Art. 6(3)` | Requisitos de {`Arts. 8`} a {`15`}, obrigações de prestador e responsável pela implantação, avaliação da conformidade | `Arts. 6` a `49` | 2027-12-02 (Anexo III); 2028-08-02 (Anexo I) |
| Transparência | Interage com pessoas, gera conteúdo sintético, reconhece emoções, categoriza biometricamente, ou produz falsificações profundas | Divulgar, marcar, etiquetar | `Art. 50` | 2026-08-02 |
| Mínimo | Tudo o resto | Sem obrigações específicas para além de `Art. 4`; códigos voluntários | `Arts. 4`, `95` | 2025-02-02 (`Art. 4` reformulado 2026-07-27) |
| Pista de IA de finalidade geral | Generalidade do modelo; risco sistémico por capacidade, computação ou designação | Obrigações ao nível do modelo | `Arts. 51` a `56` | 2025-08-02; aplicação pela Comissão 2026-08-02 |

As datas são as de `Art. 113` conforme alterado [1][2].

### Práticas proibidas (Artigo 5.º)

O artigo 5.º é uma lista de utilizações proibidas, não uma avaliação de risco. Se uma prática está
na lista, nenhuma mitigação a torna lícita. A lista tem agora dez pontos [1][2]:

| Ponto | Prática proibida (parafraseada) | Exceção restrita | Aplica-se a partir de |
|---|---|---|---|
| `(a)` | Técnicas sublimares, manipuladoras ou enganosas que distorcem materialmente o comportamento, causando ou suscetíveis de causar dano significativo | Nenhum | 2025-02-02 |
| `(b)` | Exploração de vulnerabilidades de idade, deficiência ou situação social ou económica, com o mesmo efeito | Nenhum | 2025-02-02 |
| `(c)` | Classificação social levando a tratamento injustificado ou descontextualizado prejudicial | Nenhum | 2025-02-02 |
| `(d)` | Previsão de risco de crime baseada unicamente em definição de perfis ou traços de personalidade | Apoio a uma avaliação humana baseada em factos objetivos e verificáveis | 2025-02-02 |
| `(e)` | Raspagem não direcionada de imagens faciais para construir bases de dados de reconhecimento | Nenhum | 2025-02-02 |
| `(f)` | Inferência de emoções no trabalho ou na educação | Razões médicas ou de segurança | 2025-02-02 |
| `(g)` | Categorização biométrica para inferir traços sensíveis, como raça, crenças ou orientação sexual | Conjuntos de dados legalmente adquiridos; categorização de aplicação da lei | 2025-02-02 |
| `(h)` | Identificação biométrica remota em tempo real em espaços públicos para aplicação da lei | Três objetivos, com autorização prévia (`Art. 5(2)` a `5(7)`) | 2025-02-02 |
| `(ba)` | Geração ou manipulação de imagens íntimas realistas de uma pessoa identificável sem consentimento explícito | Condições em `Art. 5(1a)`, `5(1b)` | 2026-12-02 |
| `(bb)` | Geração ou manipulação de material de abuso sexual infantil (Diretiva 2011/93/UE) | Defesa "sem direito"; `Art. 5(1a)` | 2026-12-02 |

Os dois pontos Omnibus carregam um teste de engenharia. Colocar tal gerador no mercado é proibido
apenas quando esse resultado é a sua finalidade prevista, ou quando o resultado é "um resultado
razoavelmente previsível e reproduzível" e o sistema carece de "medidas técnicas de segurança
razoáveis e adequadas" para o prevenir e corrigir a utilização indevida observada; a utilização é
proibida apenas quando o responsável pela implantação a utiliza para esse fim [2]. A evidência de
que a salvaguarda se mantém é, portanto, parte do teste legal. As orientações da Comissão sobre as
proibições originais não são vinculativas [4]. A proibição de raspagem no ponto `(e)` tem um
precedente de proteção de dados no [caso Clearview AI](/cases/clearview-ai).

Para a maioria das organizações `Art. 5` são dois controlos: uma lista de negação de finalidades
proibidas avaliada na admissão ([Policy Card](/patterns/policy-card)), e para sistemas generativos
um [Runtime Guardrail](/patterns/runtime-guardrail) de saída testado por uma
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite). Ambos deixam registos que um
regulador pode ler. As violações situam-se no escalão de multa mais elevado (ver "Penalties").

> **Na prática (ilustrativo)**
> Uma equipa que envia uma funcionalidade de edição de imagens tratou 2 de dezembro de 2026 como uma
> porta de lançamento, não um memorando legal. Adicionou um conjunto adversarial de prompts de
> imagens íntimas e segurança de menores à porta de avaliação, definiu um limiar de tolerância zero,
> e ligou as decisões de bloqueio do classificador de resultados ao armazém de evidências sob o id
> de obrigação `EU-AIA-5-1-ba`. A primeira execução falhou em edições que aumentaram a exposição em
> fotos existentes. A correção foi enviada antes da data, e a execução bem-sucedida, não uma
> declaração de política, tornou-se a evidência de que a salvaguarda era "razoável e adequada".

### Risco elevado através de produtos (Anexo I)

Um sistema é de risco elevado sob {`Art. 6(1)`} quando ambas as condições se verificam: é um
componente de segurança de um produto, ou é ele próprio um produto, abrangido pela legislação de
harmonização da União no Anexo I; e esse produto deve ser submetido a uma avaliação de conformidade
de terceiros sob essa legislação [1]. A Secção A do Anexo I abrange produtos como brinquedos,
elevadores, equipamentos de rádio, dispositivos médicos e diagnósticos in vitro; a Secção B abrange
regimes setoriais como aviação civil e veículos [1].

O Omnibus estreitou a rota {[2]}. Um **componente de segurança** deve agora ter a finalidade
prevista de prevenir ou mitigar riscos para a saúde e segurança, ou ser um cuja falha os coloque em
perigo ({`Art. 3(14)`}). A IA utilizada unicamente para assistência ao utilizador, otimização de
desempenho, eficiência, automação, conveniência ou controlo de qualidade não é um componente de
segurança a menos que a sua falha colocasse em perigo a saúde e segurança ({`Art. 6(1a)`},
{`6(1b)`}). Uma avaliação de terceiros necessária apenas por razões não relacionadas com segurança,
como espectro de rádio, não conta ({`Art. 6(1c)`}). Maquinaria mudou para a Secção B, e atos
delegados devidos até 2 de agosto de 2027 podem limitar obrigações quando a lei da Secção A já dá
proteção equivalente ({`Art. 2(13)`}). A rota do Anexo I aplica-se a partir de 2 de agosto de 2028
{[2]}.

### Risco elevado através de utilização (Anexo III)

Sob {`Art. 6(2)`}, o Anexo III lista oito áreas. Um sistema cuja finalidade prevista se enquadra
numa delas é de risco elevado a menos que o filtro {`Art. 6(3)`} o retire {[1]}:

| Área | O que está listado (uma linha) |
|---|---|
| 1. Biometria | Identificação biométrica remota (não verificação um-para-um), categorização biométrica por atributos sensíveis, reconhecimento de emoções |
| 2. Infraestrutura crítica | Componentes de segurança em infraestrutura digital crítica, tráfego rodoviário, e fornecimento de água, gás, aquecimento ou eletricidade |
| 3. Educação e formação profissional | Admissão, avaliação de resultados de aprendizagem, avaliação do nível de educação, deteção de comportamento proibido em testes |
| 4. Emprego e gestão de trabalhadores | Recrutamento e seleção, decisões sobre termos, promoção ou rescisão, alocação de tarefas, monitorização e avaliação de desempenho |
| 5. Serviços privados e públicos essenciais | Elegibilidade para benefícios públicos, solvabilidade creditícia e classificação de crédito (não deteção de fraude), preços de seguros de vida e saúde, triagem e despacho de chamadas de emergência |
| 6. Aplicação da lei | Risco para vítima, polígrafo, fiabilidade de evidência, risco de reincidência não baseado unicamente em definição de perfis, definição de perfis em investigações |
| 7. Migração, asilo e controlo de fronteiras | Polígrafo, avaliação de risco de pessoas, exame de candidaturas, deteção ou identificação de pessoas (não verificações de documentos de viagem) |
| 8. Administração da justiça e processos democráticos | Assistência às autoridades judiciais com factos e direito (e RAD), influência em eleições ou comportamento de voto |

A Comissão Europeia pode adicionar casos de utilização ao Anexo III por acto delegado (`Art. 7`)
[1], pelo que a tabela do Anexo III do classificador de admissão é dados com uma versão, não uma
lista codificada. O que o ponto 5 protege é visível no
[caso holandês de subsídios para cuidados infantis](/cases/dutch-childcare-benefits).

### O filtro do Anexo III e a sobreposição da definição de perfis

Nos termos de `Art. 6(3)`, um sistema do Anexo III não é de risco elevado quando não apresenta um
risco significativo de dano à saúde, segurança ou direitos fundamentais, incluindo por não
influenciar materialmente o resultado da tomada de decisão. O filtro aplica-se quando pelo menos uma
de quatro condições se verifica [1]:

1. o sistema executa uma tarefa processual restrita;
2. melhora o resultado de uma atividade humana previamente concluída;
3. deteta padrões de tomada de decisão ou desvios sem substituir ou influenciar a avaliação humana
   concluída sem revisão humana adequada;
4. executa uma tarefa preparatória para uma avaliação relevante para um caso de utilização do Anexo
   III.

Uma sobreposição bate todas as quatro: um sistema do Anexo III que
**define perfis de pessoas singulares é sempre de risco elevado** [1]. Um prestador que se baseia no
filtro deve documentar a sua avaliação antes de colocar o sistema no mercado, registá-lo
(`Art. 6(4)`, `Art. 49(2)`), e entregar a documentação às autoridades mediante pedido [1]. O Omnibus
Digital reduziu esse registo de registo, eliminando o resumo dos fundamentos e a lista de
Estados-Membros do Anexo VIII, Secção B [2].

As orientações de classificação da Comissão Europeia, com exemplos práticos, deveriam ter sido
publicadas até 2 de fevereiro de 2026 nos termos de `Art. 6(5)`. Um projeto foi publicado em 19 de
maio de 2026, com uma consulta direcionada aberta até 23 de julho de 2026; a partir de 2026-09-24 a
página da Comissão Europeia ainda as apresenta como um projeto [5][6]. Até que sejam finais, a
defesa do engenheiro é um bom registo, não um bom argumento.

> **Exemplo (ilustrativo)**
> Um registo de decisão de classificação, arquivado no registo e reavaliado sempre que a finalidade
> prevista muda:
>
> ```json
> { "system": "cv-screen-02", "annex_iii_point": "4(a)",
>   "art_6_3_condition": "preparatory_task", "profiling": true,
>   "result": "high-risk", "reason": "profiling override, Art. 6(3) third subparagraph",
>   "reviewed_by": "ai-governance", "date": "2026-09-24" }
> ```
>
> A bandeira explícita `profiling` é o ponto: o filtro foi invocado, e a sobreposição o derrotou.

Este registo é o resultado do fluxo de trabalho de
[admissão e classificação](/bok/the-role#intake-and-classification) e reside na Camada 2 (Inventory
& Transparency); a regra que o calcula reside na Camada 1.

### Casos de transparência (Artigo 50)

O Artigo 50 é frequentemente chamado o degrau de "risco limitado". Aplica-se a qualquer sistema de
IA que se enquadre num dos seus casos, seja qual for o resto do sistema [1]:

| Caso | Responsável pelo dever | Dever | Artefato | Camada |
|---|---|---|---|---|
| `50(1)`: interage diretamente com pessoas | Prestador | As pessoas devem saber que é IA, a menos que seja óbvio | Divulgação na interface; um teste que se renderiza | 4 · 3 |
| `50(2)`: gera áudio, imagem, vídeo ou texto sintético | Prestador | Marcação legível por máquina, detetável | Marca de água ou metadados de proveniência; teste de marcação em CI | 4 · 3 |
| `50(3)`: reconhecimento de emoções ou categorização biométrica | Responsável pela implantação | Informar as pessoas expostas | Aviso no ponto de exposição | 2 |
| `50(4)`: falsificações profundas | Responsável pela implantação | Divulgar a manipulação (mais leve para arte ou sátira evidentes) | Etiqueta de conteúdo; verificação de publicação | 4 |
| `50(4)`: texto de IA informando o público | Responsável pela implantação | Divulgar, a menos que haja responsabilidade editorial humana | Registo de controlo editorial ou etiqueta | 2 · 4 |

A informação deve chegar às pessoas o mais tardar na primeira interação ou exposição (`Art. 50(5)`)
[1]. O artigo aplica-se desde 2 de agosto de 2026; os sistemas generativos já no mercado antes dessa
data têm até 2 de dezembro de 2026 para marcar resultados (`Art. 111(4)`) [2]. O Código de Prática
final sobre Transparência de Conteúdo Gerado por IA (10 de junho de 2026) tem uma secção de
prestador sobre marcação e uma secção de responsável pela implantação sobre etiquetagem, e a
Comissão Europeia e o Conselho da IA confirmaram-no como uma ferramenta voluntária adequada; a
Comissão Europeia publicou as suas orientações sobre as obrigações de transparência de `Art. 50` em
20 de julho de 2026, após um projeto de 8 de maio de 2026 [9][14]. A lei fora do Regulamento também
atinge meios sintéticos: ver
[falsificações profundas e meios sintéticos](/bok/existing-law#deepfakes-and-synthetic-media) no
capítulo 20.

### Risco mínimo

Tudo o resto é risco mínimo. O Regulamento não pede nada específico para além da literacia no
domínio da IA (`Art. 4`) e convida a códigos de conduta voluntários (`Art. 95`) [1]. "Mínimo" é uma
categoria legal, não um veredicto de risco: a proteção de dados, consumidor, responsabilidade do
produto e lei anti-discriminação ainda se aplicam (ver
[lei existente](/bok/existing-law#how-to-read-this-chapter) e
[privacidade e IA](/bok/privacy-and-ai#principles-applied-to-ai)), e a sua própria
[gestão de riscos](/bok/risk-management#assessing-risk-the-likelihood-by-severity-matrix) pode
classificar um sistema de risco mínimo como elevado para a sua organização.

## Modelos de IA de finalidade geral

### Modelo, sistema e o critério indicativo

Um **modelo de IA de finalidade geral** é um modelo de IA que "apresenta generalidade significativa
e é capaz de executar competentemente uma vasta gama de tarefas distintas" e pode ser integrado numa
variedade de sistemas a jusante, excluindo modelos utilizados para investigação, desenvolvimento ou
prototipagem antes de serem colocados no mercado (`Art. 3(63)`) [1]. Um
**sistema de IA de finalidade geral** é um sistema de IA baseado num tal modelo (`Art. 3(66)`) [1].
As orientações da Comissão Europeia dão um critério indicativo: computação de treino acima de 10^23
FLOP e a capacidade de gerar linguagem (texto ou áudio), texto para imagem ou texto para vídeo [7].

### Deveres de cada prestador de IA de finalidade geral

| Dever | Artigo | Artefato | Camada |
|---|---|---|---|
| Documentação técnica (Anexo XI) para o Serviço para a IA e autoridades nacionais, mediante pedido | `Art. 53(1)(a)` | Documentação do modelo com resultados de treino, teste e avaliação | 2 |
| Informação para prestadores a jusante (Anexo XII) | `Art. 53(1)(b)` | Ficha de modelo; notas de capacidade e limitação; guia de integração | 2 |
| Política de direitos de autor, incluindo respeito por exclusões de mineração de texto e dados | `Art. 53(1)(c)` | Regras de filtragem de fontes como código; registo de honra de exclusão | 1 · 2 |
| Resumo público do conteúdo de treino no modelo do Serviço para a IA | `Art. 53(1)(d)` | Resumo gerado a partir de registos de proveniência de conjunto de dados | 2 |
| Mandatário autorizado na União para prestadores não-UE | `Art. 54` | Mandato escrito; documentação mantida por 10 anos | 5 |

Os deveres e os seus detalhes estão no Regulamento [1]; as linhas do capítulo 08 para
[`Art. 53` e `Art. 55`](/bok/regulatory-map#eu-ai-act-post-omnibus) carregam as datas e a
autoridade. A lei de direitos de autor por trás da política de `Art. 53(1)(c)` está no capítulo 20
([política de direitos de autor e exclusões de TDM](/bok/existing-law#copyright-and-training-data)).

### Risco sistémico: limiar, notificação, designação

Um modelo de IA de finalidade geral tem **risco sistémico** se tiver capacidades de elevado impacto,
ou se a Comissão Europeia o designar nos critérios do Anexo XIII (`Art. 51(1)`) [1]. Presume-se que
as capacidades de elevado impacto estão acima de 10^25 FLOP de computação de treino cumulativa, um
limiar que a Comissão Europeia pode alterar (`Art. 51(2)`, `51(3)`) [1]. O prestador deve notificar
a Comissão Europeia no prazo de duas semanas após atingir o limiar ou saber que o atingirá, e pode
argumentar que o modelo excepcionalmente não apresenta risco sistémico (`Art. 52`) [1].

O artefato de engenharia é um **registo de computação**: FLOP de treino cumulativo por linhagem de
modelo, com o método de estimativa, e um alerta quando a computação *planeada* ultrapassará o
limiar, porque o relógio de duas semanas pode começar antes do treino terminar.

### Deveres para modelos com risco sistémico

Para além de `Arts. 53` e `54`, o prestador deve avaliar o modelo com protocolos de última geração
incluindo testes adversariais; avaliar e mitigar riscos sistémicos a nível da União; rastrear,
documentar e relatar incidentes graves ao Serviço para a IA sem demora indevida; e garantir
cibersegurança adequada para o modelo e a sua infraestrutura física (`Art. 55(1)`) [1]. Os artefatos
são o [eval gate](/patterns/eval-gate-in-ci) e suite de red team, um registo de risco sistémico, o
[pipeline de incidentes](/patterns/incident-pipeline) no modelo de relatório da Comissão Europeia
(ver [capítulo 08](/bok/regulatory-map#gpai-code-of-practice)) e controlos de segurança de peso.

### Exclusões de código aberto e os seus limites

Um modelo lançado sob uma licença livre e de código aberto, com os seus pesos, arquitetura e
informações de utilização públicas, está isento de `Art. 53(1)(a)` e `(b)` e do dever de mandatário
autorizado (`Arts. 53(2)`, `54(6)`) [1]. A exclusão nunca cobre um modelo de risco sistémico, e a
política de direitos de autor e resumo de treino ainda se aplicam [1]. A monetização o derrota: as
orientações tratam licenciamento duplo, suporte pago sem o qual o modelo não pode ser utilizado, e
alojamento pago exclusivo como monetização [7]. O Omnibus Digital mantém modelos de IA de finalidade
geral dentro do dever de acordo escrito de `Art. 25(4)` mesmo quando lançados abertamente [2].

### Quando um ajustador fino se torna um prestador de IA de finalidade geral

Um modificador torna-se o prestador de um novo modelo de IA de finalidade geral apenas se a
alteração for significativa para generalidade, capacidades ou risco sistémico. O critério indicativo
das orientações é computação de modificação acima de um terço da computação de treino original (ou,
se desconhecida, um terço de 10^25 FLOP para um original de risco sistémico e de 10^23 FLOP caso
contrário), e os deveres de `Art. 53(1)` do modificador limitam-se então à modificação e aos seus
dados; `Art. 54` aplica-se, e onde o original é um modelo de risco sistémico o modelo modificado
presume-se ter risco sistémico, pelo que o modificador notifica a Comissão Europeia (`Art. 52`) e
cumpre os deveres de {`Art. 55`} [7]. Mantenha este teste separado de {`Art. 25`}: o ajuste fino de
um *modelo* muda o estatuto de prestador de IA de finalidade geral; alterar a finalidade prevista de
um *sistema* para o Anexo III muda o estatuto de prestador de risco elevado. Dois testes, dois
objetos, dois campos de registo.

### O Código de Prática e a aplicação

O Código de Prática de IA de Finalidade Geral foi publicado em 10 de julho de 2025. Os seus
capítulos de Transparência e Direitos de Autor aplicam-se a todos os prestadores de IA de finalidade
geral, o seu capítulo de Segurança e Segurança apenas a modelos de risco sistémico, e a Comissão
Europeia e o Conselho da IA confirmaram-no como uma ferramenta voluntária adequada [8]. Os
prestadores podem basear-se nele até que exista uma norma harmonizada; os não-signatários devem
mostrar meios alternativos adequados (`Arts. 53(4)`, `55(2)`) [1]. As obrigações de IA de finalidade
geral aplicam-se desde 2 de agosto de 2025, as multas da Comissão Europeia nos termos de
{`Art. 101`} desde 2 de agosto de 2026, e os modelos colocados no mercado antes de 2 de agosto de
2025 devem estar em conformidade até 2 de agosto de 2027 (`Art. 111(3)`) [1][7].

## Requisitos de risco elevado (Artigos 8 a 15)

O Artigo 8 exige que um sistema de risco elevado cumpra a Secção 2 do Capítulo III, tendo em conta a
sua finalidade prevista e o estado da arte [1]. Os requisitos são deveres de conceção do prestador.
Numa tabela, com o artefato que evidencia cada um:

| Artigo | Requisito numa linha | Artefato | Camada |
|---|---|---|---|
| `Art. 9` | Um sistema de gestão de riscos executado como um processo contínuo e iterativo ao longo do ciclo de vida, incluindo testes e utilização indevida razoavelmente previsível | Registo de riscos como código, ligado aos resultados de avaliação e à AIPD | 1 · 3 |
| `Art. 10` | Dados de treino, validação e teste que sejam relevantes, suficientemente representativos e, tanto quanto possível, livres de erros e completos; enviesamento examinado e mitigado | Fichas de dados, linhagem, testes de enviesamento e qualidade em CI | 2 · 3 |
| `Art. 11` | Documentação técnica (Anexo IV) antes da colocação no mercado, mantida atualizada; um formulário simplificado para PME e PMC | AIBOM; documentação técnica gerada; ficha de modelo | 2 |
| `Art. 12` | Registo automático de eventos ao longo da vida útil do sistema, para rastreabilidade | Registos de eventos estruturados e à prova de adulteração, e rastreios | 4 |
| `Art. 13` | Instruções de utilização para responsáveis pela implantação, incluindo precisão declarada, limitações e medidas de supervisão | Instruções de utilização como código; ficha de modelo | 2 |
| `Art. 14` | Supervisão humana: as pessoas conseguem compreender, monitorizar, manter-se conscientes do enviesamento da automatização, interpretar, anular e parar o sistema | Pontos de verificação com intervenção humana; caminho de anulação; kill switch | 4 |
| `Art. 15` | Precisão, robustez e cibersegurança ao longo do ciclo de vida, incluindo defesas contra envenenamento, exemplos adversariais e ataques de confidencialidade | Eval gate; suite de red-team; controlos de segurança | 3 · 4 |

Os requisitos estão no Regulamento [1]; o formulário simplificado para PME e PMC em `Art. 11(1)` é
uma adição do Omnibus Digital [2]. O capítulo 14 constrói
[o ficheiro técnico](/bok/governing-development#the-technical-file) a partir dos registos do
pipeline. `Art. 14(5)` acrescenta verificação por duas pessoas antes de agir sobre uma identificação
biométrica à distância, com exceções na aplicação da lei, migração, controlo de fronteiras e asilo
[1]; consulte [conceção de supervisão humana](/bok/the-stack#designing-human-oversight-article-14) e
o [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate). Um sistema de IA de risco elevado no
âmbito do Regulamento de Ciber-Resiliência que cumpra as condições do seu artigo 12.º, n.º 1, é
considerado como cumprindo o requisito de cibersegurança do `Art. 15` (`Art. 42(3)`) [2], pelo que
um pacote de evidência de segurança pode servir ambos os regimes.

## Obrigações do prestador para além dos requisitos

### Artigo 16.º e o sistema de gestão da qualidade (artigo 17.º)

O artigo 16.º é o guarda-chuva para as obrigações do prestador: os requisitos, nome do sistema, SGQ,
documentação, registos, avaliação da conformidade, declaração, marcação CE, registo, ação corretiva,
cooperação e acessibilidade [1]. O capítulo 08 desdobra-o artigo por artigo.

O SGQ deve ser documentado como políticas, procedimentos e instruções escritas cobrindo pelo menos
13 aspetos, desde uma estratégia de conformidade com gestão de mudanças, controlo de conceção,
testes e gestão de dados até ao sistema de `Art. 9` risco, acompanhamento pós-comercialização,
comunicação de incidentes, manutenção de registos e um quadro de responsabilidade (`Art. 17(1)`)
[1]. É proporcional ao tamanho do prestador, que o Omnibus Digital agora especifica para PME e PMC
sem reduzir o rigor exigido, e as PME sem empresas parceiras ou ligadas podem cumprir certos
elementos de forma simplificada (`Arts. 17(2)`, `63`) [2]. Lido como engenheiro, o SGQ é o pipeline
mais os seus registos: políticas versionadas, controlo de mudanças e os gates que funcionam em cada
lançamento. A norma do artigo 17.º é publicada mas não citada no Jornal Oficial, e a ISO/IEC 42001
não é o SGQ do artigo 17.º (consulte [capítulo 08](/bok/regulatory-map#what-is-not-harmonised-yet),
e capítulo 22 sobre
[normas harmonizadas e a presunção de conformidade](/bok/principles-and-standards#how-presumption-of-conformity-works)).

### Avaliação da conformidade, declaração, marcação e registo

Os pontos 2 a 8 do Anexo III utilizam controlo interno (Anexo VI) sem organismo notificado; a
biometria (ponto 1) pode utilizar controlo interno apenas quando as normas harmonizadas ou
especificações comuns foram aplicadas na íntegra, e caso contrário necessita de um organismo
notificado (Anexo VII) (`Art. 43(1)`, `43(2)`) [1]. Os produtos da Secção A do Anexo I seguem o
procedimento setorial, que agora expressamente inclui os requisitos da Secção 2 e uma avaliação do
SGQ; os seus organismos notificados devem candidatar-se à designação sob o Regulamento até 28 de
janeiro de 2028 (`Art. 43(3)`) [2]. Uma modificação substancial desencadeia uma nova avaliação
(`Art. 43(4)`) [1].

O prestador elabora então a declaração de conformidade da UE (`Art. 47`), afixe a marcação CE
(`Art. 48`) e registe o sistema na base de dados da UE (`Arts. 49`, `71`) [1]. A documentação é
mantida durante 10 anos (`Art. 18`) e os registos durante pelo menos seis meses (`Art. 19`) [1].
Cada um é um resultado do pipeline: a declaração é gerada a partir da evidência de que os gates
foram aprovados, e o registo de registo é enviado do registo.

### Acompanhamento pós-comercialização e incidentes graves (artigos 72.º e 73.º)

O prestador executa um sistema de acompanhamento pós-comercialização que recolhe e analisa
ativamente dados de desempenho, incluindo de responsáveis pela implantação, para avaliar a
conformidade contínua (`Art. 72(1)`, `72(2)`) [1]. O seu plano faz parte da documentação do Anexo
IV, e o Omnibus Digital substituiu o ato de execução vencido por orientações da Comissão e um modelo
com prazo até 2 de setembro de 2027 (`Art. 72(3)`) [2].
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry) é o sistema de
monitorização; o plano é a sua configuração versionada.

Os incidentes graves são comunicados à autoridade de fiscalização do mercado imediatamente após uma
ligação causal, ou a sua probabilidade razoável, ser estabelecida, e em qualquer caso nos relógios
`Art. 73`, cada um contado a partir do momento em que o prestador (ou responsável pela implantação)
fica ciente do incidente: 15 dias em geral, dois dias para uma violação generalizada ou uma
perturbação grave e irreversível da gestão ou funcionamento de infraestrutura crítica
(`Art. 3(49)(b)`), e 10 dias após uma morte [1]. O capítulo 08 contém a
[tabela de relógios de comunicação](/bok/regulatory-map#eu-ai-act-post-omnibus); o capítulo 17 trata
[incidentes](/bok/incidents#the-overlapping-clocks) de ponta a ponta. Os prestadores de sistemas de
IA de risco elevado sob a competência direta do Serviço para a IA comunicam ao Serviço para a IA em
vez disso (`Art. 75(1a)`) [2].

## Quem é na cadeia de valor

### Os papéis de operador da UE

O Regulamento vincula **operadores** (`Art. 3(8)`): prestadores, fabricantes de produtos,
responsáveis pela implantação, mandatários, importadores e distribuidores [1]. O capítulo GPAI
acrescenta o prestador de GPAI e o prestador a jusante. A tabela coloca cada papel nos termos do
engenheiro: o que produz e o que deve recolher de outra pessoa.

| Papel | Quem é (palavras próprias) | Obrigações principais | Evidência que produz | Evidência que recolhe |
|---|---|---|---|---|
| Prestador (`Art. 3(3)`) | Desenvolve um sistema de IA ou modelo de GPAI, ou tem um desenvolvido, e coloca-o no mercado ou em serviço sob o seu próprio nome | `Arts. 8` a `17`, `43` a `49`, `72`, `73`; `50(1)`, `50(2)` | Documentação técnica, registos do SGQ, resultados de avaliação, declaração | Informação de modelo a montante; acordos `Art. 25(4)` |
| Responsável pela implantação (`Art. 3(4)`) | Utiliza um sistema de IA sob a sua autoridade, que não seja para uso pessoal e não profissional | `Arts. 26`, `27`, `50(3)`, `50(4)`, `86` | Registos de utilização, lista de supervisão, AIPD, avisos | Instruções de utilização, declaração, id de registo |
| Importador (`Art. 3(6)`) | Baseado na UE; coloca no mercado um sistema com o nome de um prestador não-UE | `Art. 23`: verificar a avaliação, documentos e marcação do prestador; manter cópias 10 anos | Registo de verificação de importação | Certificado, declaração, instruções |
| Distribuidor (`Art. 3(7)`) | Disponibiliza um sistema sem ser o seu prestador ou importador | `Art. 24`: verificar marcação e documentos; reter sistemas não conformes | Registo de verificação de distribuição | O mesmo conjunto |
| Mandatário (`Art. 3(5)`) | Baseado na UE, com um mandato escrito de um prestador não-UE | `Arts. 22`, `54`: verificar, manter documentos 10 anos, cooperar, terminar o mandato em caso de violação | Mandato; cópias de documentos | Tudo do prestador |
| Fabricante de produto (`Art. 25(3)`) | Coloca um componente de segurança de risco elevado com o seu produto da Secção A do Anexo I sob o seu próprio nome | Obrigações de prestador (`Art. 16`) | Como prestador | Documentação do fornecedor |
| Prestador de GPAI (`Art. 53`) | O prestador de um modelo de GPAI | `Arts. 53` a `55` | Documentação de modelo, resumo de treino, política de direitos de autor | Proveniência de dados e licenças |
| Prestador a jusante (`Art. 3(68)`) | Integra um modelo de IA, o seu ou de terceiros, num sistema de IA | Obrigações de prestador para o sistema | Documentação do sistema | Informação do Anexo XII |

As obrigações estão em `Arts. 16` a `27` e `53` a `55` [1]. A **pessoa afetada** está no âmbito
(`Art. 2(1)(g)`) como titular de proteções, não de obrigações [1].

### Artigo 25.º: quando outra pessoa se torna o prestador

Um distribuidor, importador, responsável pela implantação ou outra terceira pessoa torna-se o
prestador de um sistema de IA de risco elevado, com todas as obrigações de `Art. 16`, em três casos
(`Art. 25(1)`) [1]:

1. coloca o seu nome ou marca comercial num sistema de IA de risco elevado já no mercado, sujeito a
   contratos que atribuem as obrigações de outra forma;
2. faz uma modificação substancial a um sistema de IA de risco elevado que permanece de risco
   elevado;
3. muda a finalidade prevista de um sistema que não era de risco elevado, incluindo um sistema de IA
   de finalidade geral, de modo que se torna de risco elevado.

Uma **modificação substancial** é uma mudança não planeada após a colocação no mercado que afeta a
conformidade ou muda a finalidade prevista avaliada (`Art. 3(23)`) [1]. Quando um gatilho dispara, o
prestador inicial deixa de ser o prestador desse sistema mas deve cooperar com o novo; o Omnibus
Digital agora especifica que isto significa documentação suficiente para avaliar a conformidade,
limitações conhecidas e modos de falha, e acesso técnico direcionado para testes, a menos que o
prestador inicial tivesse claramente excluído qualquer mudança para um sistema de risco elevado
(`Art. 25(2)`) [2]. Os prestadores de risco elevado e os seus fornecedores de sistemas, modelos,
ferramentas e componentes devem corrigir as informações e acesso necessários num acordo escrito
(`Art. 25(4)`), e as violações de ambos os parágrafos são agora multadas no escalão intermédio
(`Art. 99(4)(da)`) [2].

No pipeline os três gatilhos são eventos detetáveis: uma mudança de marca branca ou marca, um
retreino que toca a conformidade, e uma mudança de configuração que move `intended_purpose` para um
valor do Anexo III. Cada um deve disparar uma reavaliação de papel e um bilhete
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) (consulte
[IA de terceiros e procurada](/bok/the-stack#third-party-and-procured-ai)).

> **Exemplo (ilustrativo)**
> Uma equipa de RH configura um assistente de chat de finalidade geral, que implanta sob uma licença
> de fornecedor, para classificar candidatos a emprego. A configuração move a finalidade prevista
> para o Anexo III, ponto 4(a), portanto sob `Art. 25(1)(c)` a organização torna-se o prestador de
> um sistema de IA de risco elevado: `Arts. 8` a `17`, avaliação da conformidade e registo são agora
> as suas obrigações. Se começa com algo depende do contrato. Se o fornecedor não excluiu utilização
> de risco elevado, `Art. 25(2)` obriga-o a entregar documentação, limitações conhecidas e acesso de
> teste. Se excluiu, a organização constrói a evidência sozinha. A cláusula de exclusão nos termos
> do fornecedor define o tamanho do orçamento de evidência.

### Os papéis nomeiam tarefas, não organizações

Um papel está associado a uma atividade num sistema específico, não a uma empresa. Um banco é o
prestador do modelo de crédito que construiu, o responsável pela implantação desse modelo nas suas
sucursais ("colocação em serviço" inclui uso próprio, `Art. 3(11)` [1]) e o responsável pela
implantação de um chatbot de um fornecedor. Assim, o registo registra papéis por sistema, como uma
lista: `["provider", "deployer"]` para um sistema interno, `["deployer"]` para um adquirido.

### Os mesmos papéis em diferentes regimes

As palavras diferem entre leis; as tarefas raramente o fazem. A coluna de mapeamento é a leitura
deste capítulo, não uma equivalência legal.

| Regime | Papel | O que abrange (palavras próprias) | Papel mais próximo da UE (nosso mapeamento) |
|---|---|---|---|
| Regulamento da IA [1] | Prestador; responsável pela implantação; importador; distribuidor; mandatário; fabricante de produtos | Como na tabela acima | Ponto de referência |
| Colorado SB 26-189 [10] | Programador | Constrói tecnologia de tomada de decisão utilizada em decisões consequentes; documenta-a para os responsáveis pela implantação | Prestador |
| Colorado SB 26-189 [10] | Responsável pela implantação | Utiliza-a em decisões consequentes; avisa o consumidor; mantém registos durante pelo menos três anos | Responsável pela implantação |
| Texas HB 149 (TRAIGA) [11] | Programador | Desenvolve um sistema de IA oferecido ou fornecido no Texas | Prestador |
| Texas HB 149 (TRAIGA) [11] | Responsável pela implantação | Implanta um sistema de IA para utilização no Texas | Responsável pela implantação |
| Lei Básica de IA da Coreia [12] | Operador de negócio de desenvolvimento de IA | Desenvolve e fornece IA | Prestador |
| Lei Básica de IA da Coreia [12] | Operador de negócio de utilização de IA | Oferece produtos ou serviços construídos sobre IA de um operador de desenvolvimento | Prestador a jusante ou responsável pela implantação |
| Lei Básica de IA da Coreia [12] | Utilizador; pessoa afetada | Recebe o serviço; tem vida, segurança ou direitos significativamente afetados | Protegido, não é titular de obrigações |
| ISO/IEC 22989 [13] | Prestador de IA, produtor, cliente, parceiro, sujeito; autoridades relevantes (verificar) | Papéis de vocabulário, não obrigações legais | Útil em contratos |

A lei do Colorado foi assinada em 14 de maio de 2026 e as suas obrigações aplicam-se a partir de 1
de janeiro de 2027 [10]. A Lei Coreana (versão em vigor desde 21 de julho de 2026) abrange atos no
estrangeiro que afetem o mercado ou utilizadores coreanos e exige um representante doméstico para
operadores estrangeiros acima dos limiares do decreto (`Arts. 4`, `36`) [12]. A lista ISO/IEC 22989
e a sua cláusula (5.19) estão marcadas para verificação [13]. Consulte
[capítulo 08](/bok/regulatory-map#us-federal-and-state-laws) e
[Leis de IA em todo o mundo](/bok/ai-laws-worldwide#comparing-the-regimes) para estes regimes em
contexto.

## Obrigações do responsável pela implantação (Artigo 26)

O Artigo 26 é a lista do responsável pela implantação para sistemas de risco elevado. Dividida em
sub-obrigações, cada uma tem um artefato [1]:

| Sub-obrigação | Parágrafo | Artefato | Camada |
|---|---|---|---|
| Utilizá-lo de acordo com as instruções de utilização | `26(1)` | Configuração de implantação fixada às instruções; verificação de política na implantação | 1 · 2 |
| Designar supervisores competentes, treinados e capacitados | `26(2)` | Lista de supervisão ligada aos registos de treino; porta com intervenção humana | 4 · 5 |
| Manter dados de entrada relevantes e representativos, onde os controla | `26(4)` | Verificações de dados de entrada; ficha de dados de implantação | 2 · 3 |
| Monitorizar; informar o prestador; suspender em caso de risco; comunicar incidentes graves | `26(5)` | Ganchos de monitorização; comutador de suspensão; pipeline de incidentes | 4 · 5 |
| Manter registos durante pelo menos seis meses | `26(6)` | Política de retenção de registos como código | 4 |
| Informar trabalhadores e seus representantes antes da utilização no local de trabalho | `26(7)` | Registo de aviso e consulta | 2 |
| Organismos públicos: registar a utilização; nunca utilizar sistemas não registados | `26(8)` | Registo sincronizado com o id da base de dados da UE | 2 |
| Alimentar a informação `Art. 13` do prestador na AIPD | `26(9)` | AIPD com referência cruzada às instruções | 1 · 2 |
| Após identificação biométrica remota: autorização, registo, relatórios | `26(10)` | Registo de autorização; registo por utilização | 5 |
| Informar pessoas sujeitas a decisões do Anexo III | `26(11)` | [Aviso de decisão](/patterns/decision-notice-contest-path) no ponto de decisão | 2 · 4 |
| Cooperar com autoridades | `26(12)` | Exportação de evidência sob solicitação | 5 |

As instituições financeiras cumprem as obrigações de monitorização e registo através das suas regras
de governação de serviços financeiros [1]. A visão do responsável pela implantação de sistemas
adquiridos é desenvolvida em
[governação da implantação](/bok/governing-deployment#operating-the-system).

> **Na prática (ilustrativo)**
> Numa grande operadora de telecomunicações, as obrigações do responsável pela implantação deixaram
> de ser um questionário quando cada uma se tornou um campo de registo com um proprietário.
> `oversight_roster` apontava para pessoas nomeadas cujo treino de literacia estava atual;
> `log_retention_days` era verificado em relação ao piso de seis meses por um teste de política;
> {`worker_notice_ref`} estava ligado ao registo de consulta antes de uma ferramenta de local de
> trabalho poder ser ativada. A pergunta de auditoria "mostre-me os seus controlos do Artigo 26 para
> este sistema" tornou-se uma consulta de registo por sistema.

## Avaliação de impacto sobre os direitos fundamentais (Artigo 27)

**Quem.** Antes de implantar um sistema do Anexo III (exceto ponto 2, infraestrutura crítica), uma
AIPD é exigida dos responsáveis pela implantação que são organismos regidos pelo direito público ou
entidades privadas que prestam serviços públicos, e dos responsáveis pela implantação de pontuação
de crédito (ponto 5(b)) e preços de seguros de vida e saúde (ponto 5(c)) [1].

**Quando.** Antes da primeira utilização; o responsável pela implantação pode confiar em AIPDs
anteriores ou na avaliação de impacto do prestador em casos semelhantes, e deve atualizá-la quando
um elemento muda (`Art. 27(2)`) [1].

**O quê.** Os processos do responsável pela implantação que utilizam o sistema; o período e
frequência de utilização; as categorias de pessoas afetadas; os riscos específicos de dano para
elas, utilizando a informação `Art. 13` do prestador; as medidas de supervisão humana; e as medidas
se os riscos se materializarem, incluindo governação interna e mecanismos de reclamação
(`Art. 27(1)(a)` a `(f)`) [1].

**Depois.** O responsável pela implantação notifica a autoridade de fiscalização do mercado dos
resultados no modelo do Serviço para a IA (`Art. 27(3)`) [1]. Após o Omnibus, pode fazer referência
cruzada ou incluir as secções relevantes da AIPD, e o modelo deve permitir isso (`Art. 27(4)`,
`27(5)`) [2]. A obrigação aplica-se a partir de 2 de dezembro de 2027 com o regime do Anexo III [2].
Construa-a como [governação como código](/patterns/fria-as-code): um registo versionado gerado a
partir do registo, das instruções de utilização e da AIPD, para que uma atualização seja uma
diferença, não uma reescrita.

## Explicação e aviso às pessoas afetadas

**O direito à explicação (`Art. 86`).** Uma pessoa sujeita a uma decisão do responsável pela
implantação baseada no resultado de um sistema de risco elevado do Anexo III (exceto ponto 2), que
produz efeitos jurídicos ou efeitos igualmente significativos que a pessoa considera adversos à sua
saúde, segurança ou direitos fundamentais, pode obter "explicações claras e significativas do papel
do sistema de IA no procedimento de tomada de decisão e dos elementos principais da decisão tomada"
[1]. O direito cede a exceções no direito da União ou nacional e aplica-se apenas quando o direito
da União não o fornece já [1], razão pela qual tem de ser lido com os direitos do RGPD sobre
decisões automatizadas (consulte [privacidade e IA](/bok/privacy-and-ai#the-regimes-side-by-side)).

O artefato é um [**registo de explicação**](/patterns/explanation-artefact) por decisão: versão do
sistema e modelo, as entradas ou códigos de razão por trás do resultado, se o resultado foi
determinante ou consultivo, e a pessoa que decidiu; os métodos estão em
[equidade e explicabilidade](/bok/fairness-and-explainability#explanation-artefacts-as-evidence-records),
com o que o
[direito à explicação (Art. 86)](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
pede do conteúdo. Quanto ao calendário, `Art. 86` está no Capítulo IX, que se aplica a partir de 2
de agosto de 2026, mas tem trabalho a fazer apenas uma vez que os sistemas do Anexo III são
regulados a partir de 2 de dezembro de 2027. Esta é a leitura deste capítulo; confirme com o seu
consultor jurídico (verificar).

**Os outros avisos.** Trabalhadores antes da utilização no local de trabalho (`Art. 26(7)`); pessoas
sujeitas a decisões do Anexo III (`Art. 26(11)`); pessoas expostas a reconhecimento de emoções ou
categorização biométrica (`Art. 50(3)`); e qualquer pessoa enfrentando uma falsificação profunda
(`Art. 50(4)`) [1]. Qualquer pessoa pode apresentar uma reclamação a uma autoridade de fiscalização
do mercado (`Art. 85`), e os denunciantes que comunicam violações da Lei estão protegidos sob a
Diretiva (UE) 2019/1937 (`Art. 87`) [1].

## Literacia em IA e dados de detecção de enviesamento

**Literacia em IA (`Art. 4`).** Desde 27 de julho de 2026, os prestadores e responsáveis pela
implantação devem "tomar medidas para apoiar o desenvolvimento de literacia em IA" do seu pessoal e
outros que operem ou utilizem sistemas de IA em seu nome, considerando o seu conhecimento, o
contexto de utilização e as pessoas afetadas, sem ter de garantir qualquer nível específico [2].
Vincula todos os prestadores e responsáveis pela implantação em todos os níveis. O artefato é um
programa de literacia baseado em papéis cujos registos de conclusão estão ligados aos papéis de
registo, para que ninguém seja designado como supervisor {`Art. 26(2)`} sem um registo atual.

**Dados de detecção de enviesamento (`Art. 4a`).** Os prestadores de sistemas de risco elevado podem
excepcionalmente processar categorias especiais de dados pessoais quando estritamente necessário
para detecção e correção de enviesamento, se outros dados (incluindo dados sintéticos ou
anonimizados) não funcionariam, os dados são pseudonimizados, protegidos, controlados no acesso e
nunca transmitidos, são eliminados uma vez corrigido o enviesamento, e os registos de processamento
explicam porquê [2]. `Art. 4a(2)` estende a base a outros sistemas e modelos de IA e aos
responsáveis pela implantação de sistemas de risco elevado, sem criar uma obrigação [2]. O artefato
é um enclave controlado com registos de acesso e eliminação automática (consulte
[governação de dados em toda a stack](/bok/the-stack#data-governance-across-the-stack)).

## Ambientes de testagem e testagem em condições reais

**Ambientes de testagem (`Arts. 57` a `59`).** Cada Estado-Membro deve ter pelo menos um ambiente de
testagem da regulamentação da IA nacional operacional até 2 de agosto de 2027, data que o Omnibus
moveu de 2 de agosto de 2026 [1][2]. O Serviço para a IA pode executar um ambiente de testagem ao
nível da União para os sistemas sob a sua competência direta, com prioridade para PME e PMC, e um
plano de ambiente de testagem pode incluir testagem em condições reais [2]. `Art. 59`} estabelece as
condições para processamento adicional de dados pessoais num ambiente de testagem para sistemas de
interesse público [1].

**Testagem em condições reais (`Arts. 60`, `60a`, `61`).** Os prestadores podem testar sistemas do
Anexo III, e após o Omnibus sistemas da Secção A do Anexo I, em condições reais fora de um ambiente
de testagem [2]. As condições incluem um plano aprovado pela autoridade de fiscalização do mercado,
registo com um número de identificação ao nível da União, um máximo de seis meses prorrogável por
seis, consentimento informado que é datado e documentado, supervisão efetiva, resultados que podem
ser revertidos, e `Art. 73`} comunicação de incidentes graves [1]. Os Estados-Membros podem permitir
testagem de produtos da Secção B do Anexo I sob marcos nacionais (`Art. 60a`) [2]. Uma testagem em
condições reais é um sistema de produção com evidência adicional: um plano como código, registos de
consentimento, um caminho de reversão e ganchos de incidentes.

## Governação e aplicação

### Quem supervisiona o quê

| Organismo | Nível | Papel | Base |
|---|---|---|---|
| Serviço para a IA | União | Função da Comissão; supervisiona modelos, códigos e modelos de IA de finalidade geral e, após o Omnibus, alguns sistemas de IA | `Arts. 3(47)`, `64`, `75`, `88` a `94` |
| Conselho Europeu de IA | União | Um representante por Estado-Membro; observador do EDPS; Serviço para a IA sem voto | `Arts. 65`, `66` |
| Fórum consultivo e painel científico | União | Conhecimento das partes interessadas; peritos independentes que podem alertar sobre risco sistémico de IA de finalidade geral | `Arts. 67`, `68`, `90` |
| Autoridades nacionais competentes | Nacional | Pelo menos uma autoridade notificadora e uma autoridade de fiscalização do mercado, com um único ponto de contacto | `Art. 70` |
| Autoridades de fiscalização do mercado | Nacional | Aplicar as regras dos sistemas de IA com poderes do Regulamento (UE) 2019/1020 e acesso ao código-fonte mediante pedido fundamentado | `Art. 74` |
| Organismos notificados | Designadas | Avaliação da conformidade por terceiros, delimitada pelos códigos do Anexo XIV | `Arts. 28` a `39` |
| Organismos de direitos fundamentais | Nacional | Obter documentação através da autoridade de fiscalização do mercado | `Art. 77` |

A fiscalização do mercado segue o sector [1]: autoridades de produtos para sistemas da Secção A do
Anexo I (`Art. 74(3)`), supervisores financeiros para instituições financeiras reguladas
(`Art. 74(6)`), e autoridades de proteção de dados ou outras autoridades designadas para biometria
na aplicação da lei, gestão de fronteiras e justiça e para os pontos 6 a 8 do Anexo III
(`Art. 74(8)`). Os códigos do Anexo XIV e as regras `Art. 77` são texto do Omnibus [2].

### Os poderes diretos do Serviço para a IA (Artigos 75 e 75a a 75d)

O Omnibus tornou o Serviço para a IA exclusivamente competente para dois grupos de sistemas de IA
[2]: sistemas construídos sobre um modelo de IA de finalidade geral pelo mesmo prestador ou entidade
(exceto produtos do Anexo I, ponto 2 do Anexo III, sistemas de justiça sob o ponto 8, e sistemas de
aplicação da lei, fronteiras e financeiros sob `Art. 74(6)`), e sistemas que são ou se encontram
dentro de plataformas em linha muito grandes designadas ou motores de busca. A competência abrange
prestadores e responsáveis pela implantação apenas dentro da mesma entidade [2].

Os Artigos 75a a 75d conferem ao Serviço para a IA investigações, pedidos de informação, inspecções,
ordens para dar acesso e explicações e para reter dados (`Art. 75a`); compromissos vinculativos
(`Art. 75b`); decisões de não conformidade com multas de `Art. 99` e pagamentos de penalidade
periódica até 5% do rendimento médio diário ou volume de negócios anual mundial por dia
(`Art. 75c`); e direitos de defesa e publicação de decisões (`Art. 75d`) [2]. Encontram-se no
Capítulo IX, que se aplica a partir de 2 de agosto de 2026 [1][2]. Se construir sistemas sobre o seu
próprio modelo de IA de finalidade geral, o seu arquivo de evidência deve responder a Bruxelas tão
rapidamente quanto uma autoridade nacional.

### Sanções

| Violação | Limite máximo | Base |
|---|---|---|
| Práticas de IA proibidas (`Art. 5`) | EUR 35 milhões ou 7% do volume de negócios anual mundial, o que for superior | `Art. 99(3)` |
| Obrigações do operador: prestadores (`Art. 16`), mandatários (`22`), importadores (`23`), distribuidores (`24`), responsáveis pela implantação (`26`), organismos notificados, transparência (`50`); após o Omnibus também `Art. 25(2)`, `25(4)` | EUR 15 milhões ou 3%, o que for superior | `Art. 99(4)` |
| Informações incorrectas, incompletas ou enganosas para organismos notificados ou autoridades nacionais | EUR 7,5 milhões ou 1%, o que for superior | `Art. 99(5)` |
| PME e start-ups; após o Omnibus, PMC para os dois escalões inferiores | O menor entre o montante e a percentagem | `Art. 99(6)`, `99(6a)` |
| Prestadores de IA de finalidade geral, por violações intencionais ou negligentes | 3% ou EUR 15 milhões, o que for superior, por decisão da Comissão | `Art. 101` |
| Sistemas sob a competência direta do Serviço para a IA | `Art. 99` níveis, mais pagamentos de penalidade periódica | `Art. 75c` |

Os escalões encontram-se em `Arts. 99`} e {`101`} [1], com as adições do Omnibus em {`Arts. 75c`},
{`99(4)(da)`} e {`99(6a)`} [2]. Os Estados-Membros decidem se e como os organismos públicos são
multados (`Art. 99(8)`) [1]. Dois dos factores que as autoridades consideram são o grau de
responsabilidade "tendo em conta as medidas técnicas e organizacionais implementadas" e se o
operador notificou a violação a si próprio (`Art. 99(7)(g)`, `(h)`) [1]. A sua evidência é também o
seu argumento de atenuação.

## A cronologia pós-Omnibus

| Data | O que se aplica | Base |
|---|---|---|
| 2024-08-01 | O Regulamento entra em vigor | `Art. 113` [1][2] |
| 2025-02-02 | Capítulos I e II: definições, literacia no domínio da IA e as proibições originais | `Art. 113(a)` [1] |
| 2025-08-02 | Regras de organismos notificados, obrigações de IA de finalidade geral, governação, sanções (exceto `Art. 101`) e confidencialidade; pontos de contacto nacionais publicados | `Art. 113(b)`, `Art. 70(2)` [1] |
| 2026-07-27 | Omnibus em vigor: {`Art. 4`} reformulado, novo {`Art. 4a`}, alterações a outros actos ({`Arts. 102`} a {`110`}) | Omnibus {`Art. 4`}; {`Art. 113(d)`} {[2]} |
| 2026-08-02 | Aplicação geral: {`Art. 50`} transparência, multas da Comissão a prestadores de IA de finalidade geral, medidas do Capítulo VI incluindo testagem em condições reais, e o capítulo de aplicação incluindo {`Arts. 75a`} a {`75d`} | `Art. 113` [1][2] |
| 2026-12-02 | Novas proibições {`Art. 5(1)(ba)`} e {`(bb)`}; marcação {`Art. 50(2)`} para sistemas generativos colocados antes de 2026-08-02 | `Art. 113(a)`, `Art. 111(4)` [2] |
| 2027-08-02 | Modelos de IA de finalidade geral colocados antes de 2025-08-02 devem estar em conformidade; ambientes de testagem nacionais operacionais; actos delegados limitando deveres para produtos da Secção A do Anexo I devidos | `Arts. 111(3)`, `57(1)`, `2(13)` [1][2] |
| 2027-09-02 | Orientação da Comissão e modelo para o plano de acompanhamento pós-comercialização devidos | `Art. 72(3)` [2] |
| 2027-12-02 | Alto risco, Anexo III: classificação, requisitos, deveres do prestador e responsável pela implantação, avaliação de impacto sobre os direitos fundamentais | `Art. 113(c)(i)` [2] |
| 2028-01-28 | Organismos notificados da Secção A do Anexo I candidatam-se à designação sob o Regulamento | `Art. 43(3)` [2] |
| 2028-08-02 | Alto risco, Anexo I ({`Art. 6(1)`}) | `Art. 113(c)(ii)` [2] |
| 2030-08-02 | Sistemas de alto risco legados destinados a utilização por autoridades públicas devem estar em conformidade | `Art. 111(2)` [2] |
| 2030-12-31 | Componentes de sistemas de TI de grande escala do Anexo X colocados antes de 2027-08-02 devem estar em conformidade | `Art. 111(1)` [1] |

Outros sistemas de alto risco já no mercado antes da data do Capítulo III caem sob o Regulamento
apenas se o seu design mudar significativamente após essa data ({`Art. 111(2)`} conforme alterado)
{[2]}. "Mudança significativa no design" é portanto um evento que o pipeline deve registar, com o
raciocínio, sempre que um sistema legado é modificado.

## O que pode fazer esta semana

1. **Adicione três campos a cada entrada de registo:** `eu_roles` (uma lista, por sistema),
   `risk_rung` com o artigo que a colocou lá, e `output_used_in_eu`. Execute
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) para encontrar os sistemas que não têm
   entrada.
2. **Escreva o registo de decisão de classificação** para cada candidato do Anexo III, com a
   condição `Art. 6(3)` em que se baseia e a bandeira de definição de perfis explicitamente
   indicada, e armazene-o junto do sistema. O [AI Act triage](/toolkit/ai-act-triage) redige um de
   acordo com o [esquema](/schemas/classification-decision-record.v1.json).
3. **Gate as proibições de 2 de dezembro de 2026.** Coloque {`Art. 5(1)(ba)`} e {`(bb)`} na lista de
   negação de entrada e adicione uma suite adversarial para qualquer gerador de imagem, vídeo ou voz
   ao gate de avaliação antes dessa data.
4. **Leia os seus termos de fornecedor para {`Art. 25`}.** Encontre a cláusula que exclui utilização
   de alto risco e o acordo escrito sob {`Art. 25(4)`}; abra um ticket de due diligence sempre que
   um componente de alto risco não tenha nenhum dos dois.
5. **Teste as superfícies {`Art. 50`} que já estão em directo.** Verifique que cada interface de
   chat divulga a utilização de IA e cada gerador marca o seu resultado, e guarde a verificação
   bem-sucedida como evidência.

**Correspondências:** Regulamento da IA da UE {`Arts. 2`}, {`3`}, {`4`}, {`4a`}, {`5`}, {`6`}, {`8`}
a {`27`}, {`43`} a {`50`}, {`51`} a {`57`}, {`60`} a {`61`}, {`72`} a {`75d`}, {`86`}, {`99`},
{`101`}, {`111`}, {`113`} (conforme alterado pelo Regulamento (UE) 2026/1744) · GPAI Code of
Practice · Code of Practice on Transparency of AI-generated Content · Colorado SB 26-189 · Texas HB
149 · Korea AI Basic Act · ISO/IEC 22989 · todas as cinco camadas do stack. Os mapeamentos são
ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (original text: Arts. 2, 3, 5 to 27, 43, 49 to 61, 64 to 75, 85 to 87, 99, 101, 111, 113; Annexes I, III, VIII). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Regulations (EU) 2024/1689, 2018/1139 and 2023/1230; OJ L, 2026/1744, 24.7.2026; in force on the third day after publication (amended Arts. 2, 3(14), 4, 4a, 5, 6, 10, 11, 17, 25, 27, 42, 43, 50, 56, 57, 60, 60a, 63, 72, 75, 75a to 75d, 77, 99, 111, 113; Annexes I, VIII, XIV). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission Guidelines on the definition of an artificial intelligence system established by Regulation (EU) 2024/1689 (seven elements; four out-of-scope families; non-binding; formal text C(2025) 5053 final). European Commission. 2025-02-06. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application (verified: primary)
[4] Commission Guidelines on prohibited artificial intelligence practices, as defined by the AI Act (non-binding; authoritative interpretation reserved to the CJEU). European Commission. 2025-02-04. https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act (verified: primary)
[5] Draft Commission guidelines on the classification of high-risk AI systems (Art. 6; Annex I and Annex III sections; practical examples; draft for targeted consultation). European Commission. 2026-05-19. https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems (verified: primary)
[6] Guidelines for providers and deployers of AI high-risk systems (policy page: classification guidelines still in draft, consultation open until 23 July 2026; application dates 2 Dec 2027 and 2 Aug 2028). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-high-risk-systems (verified: primary)
[7] Commission Guidelines on the scope of the obligations for providers of general-purpose AI models established by Regulation (EU) 2024/1689 (content approved 18 July 2025 by C(2025) 5045 final; formal text C(2025) 7719 final of 19 Nov 2025; paras. 65 to 68 on modifiers; 10^23 FLOP indicative criterion; one-third modification criterion; monetisation; notification within two weeks; fines from 2 Aug 2026). European Commission. 2025-11-19. https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act (verified: primary)
[8] The General-Purpose AI Code of Practice (published 10 July 2025; Transparency, Copyright, and Safety and Security chapters; confirmed as an adequate voluntary tool). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[9] Code of Practice on Transparency of AI-generated Content (final version 10 June 2026; provider marking and detection, deployer labelling; confirmed as an adequate voluntary tool; Art. 50 guidelines: draft 8 May 2026, final 20 July 2026). European Commission. 2026-06-10. https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content (verified: primary)
[10] SB26-189 Automated Decision-Making Technology (signed 14 May 2026; developer and deployer duties; covered technology from 1 Jan 2027; deployer records kept at least three years). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[11] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text (Sec. 552.001 definitions of developer and deployer). Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[12] Framework Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법), Act No. 21311 as amended 20 Jan 2026, version in force 21 Jul 2026 (Art. 2(7) to (9) roles; Art. 4 reach; Arts. 31 to 36 duties and domestic representative). Korea Ministry of Government Legislation (law.go.kr). 2026-07-21. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=282791 (verified: primary)
[13] ISO/IEC 22989:2022, Artificial intelligence concepts and terminology (edition 1; AI stakeholder roles). ISO/IEC JTC 1/SC 42. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[14] Guidelines on transparency obligations for providers and deployers of AI systems (Art. 50; final text after the draft of 8 May 2026; obligations apply from 2 Aug 2026). European Commission. 2026-07-20. https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems (verified: primary)
