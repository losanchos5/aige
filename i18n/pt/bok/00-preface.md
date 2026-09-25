---
lang: pt
source: bok/00-preface.md
sourceHash: "597a86da43989641cc3dbd772fc7bad71dee72e7408f4a33f88a9f7c6c54188f"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 00. Prefácio

> Por que este livro existe, para quem é e como utilizá-lo.

## Por que existe

Existe um manifesto para a engenharia de GRC. Existe um manifesto para software ágil. Existe um
catálogo de padrões para IA responsável e um guia de doze fatores para aplicações em nuvem. Não
existe nada que vos diga como *engenheirar* a governação de sistemas de IA: como transformar uma
obrigação do Regulamento da IA ou um controlo ISO 42001 em política como código, um eval gate, um
registo de agentes e evidência legível por máquina que um auditor possa ler. Este livro é a primeira
tentativa de o documentar.

Existe porque a lacuna é agora dispendiosa. A coisa a ser governada (modelos que retreinam, prompts
que mudam, agentes que atuam por conta própria) move-se mais depressa do que qualquer documento
consegue acompanhar. A governação escrita como PDFs e folhas de cálculo fica obsoleta antes de ser
assinada. A disciplina que fecha a lacuna é a engenharia, aplicada à governação. Este livro é o seu
texto fundador e a sua referência de trabalho.

## Quem o escreveu e a partir de quê

O Body of Knowledge foi escrito por Jorge García Aibar, um Engenheiro de Governação e Privacidade de
IA, baseando-se em dois anos e meio a desenhar e operar um framework de governação de IA dentro de
uma grande operadora de telecomunicações, situado entre Jurídico, Segurança e Engenharia, e cobrindo
as dimensões de governação, segurança, conformidade, negócio e desempenho de modelos do risco de IA.
A Tese é a única parte coautoria do projeto, escrita por Jorge García Aibar e Aurélie Pols, que
trabalha em IA Responsável, Privacidade e Governação de Dados. Nada neste livro divulga detalhes
internos de qualquer empregador; quando a prática é descrita é genérica ("numa grande operadora de
telecomunicações").

É construído a partir de três coisas. Primeiro, essa experiência operacional: o que realmente
funcionou quando um modelo mudou numa sexta-feira e um agente ganhou uma nova ferramenta durante o
fim de semana. Segundo, o precedente de **GRC Engineering**: a comunidade, manifesto e corpo de
prática que, desde cerca de 2024, transformou governação, risco e conformidade num produto
construído com código [1][2]. Terceiro, o registo público: o Regulamento da IA da UE e a sua reforma
Digital Omnibus, ISO/IEC 42001, NIST AI RMF, trabalho GenAI e Agentic da OWASP, CSA, Catálogo de
Padrões de IA Responsável da CSIRO, e os próprios frameworks de segurança dos laboratórios de
fronteira. Cada afirmação factual no livro carrega uma citação obtida de fonte e verificada.

## Quem deve ler isto

- **Responsáveis de governação de IA** que querem parar de enviar documentos e começar a enviar
  controlos. O capítulo 12 configura
  [o programa de governação](/bok/governance-program#the-organisation-as-an-object-of-governance)
  que dá a cada controlo um proprietário.
- **Engenheiros de segurança e engenheiros de segurança de IA** que estendem os seus modelos de
  ameaça a modelos e agentes. Comece com
  [camada 04 do stack](/bok/the-stack#layer-04-runtime-controls--observability) e
  [governação de agentes de IA](/bok/governing-agents#what-makes-an-agent-a-governance-object).
- **Engenheiros de privacidade e EPDs** que querem que FRIA e AIPD vivam como código, não como PDFs
  pontuais. O capítulo 19 aplica
  [lei de proteção de dados a IA](/bok/privacy-and-ai#principles-applied-to-ai), e o capítulo 18
  cobre a [FRIA](/bok/eu-ai-act#fundamental-rights-impact-assessment-article-27).
- **Engenheiros de LLMOps e plataforma** que estão a ser pedidos para fazer da governação uma
  propriedade do pipeline. Os capítulos 14 e 15 executam
  [a construção como uma cadeia de gates](/bok/governing-development#the-build-as-a-chain-of-gates)
  e
  [o ciclo de vida de implantação](/bok/governing-deployment#the-deployment-lifecycle-at-a-glance).
- **Responsáveis de risco e CISOs** que possuem a visão empresarial do risco de IA. O capítulo 13
  compila
  [apetite de risco e tolerância em gates](/bok/risk-management#risk-appetite-and-tolerance-compiled-into-gates),
  e o capítulo 17 executa
  [o ciclo de vida de resposta a incidentes](/bok/incidents#the-response-lifecycle).
- **Executivos e membros do conselho** que precisam saber se a governação funciona. O capítulo 12
  nomeia
  [os KPIs e KRIs que chegam ao conselho](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board).
- **Advogados e profissionais de conformidade que querem construir**, para ver a obrigação
  transformada num controlo executável e evidência legível, e para ajudar a especificá-la. A última
  parte lê [o Regulamento da IA da UE](/bok/eu-ai-act#how-to-read-this-chapter),
  [a lei que já se aplica](/bok/existing-law#how-to-read-this-chapter) e
  [leis de IA em todo o mundo](/bok/ai-laws-worldwide#the-landscape-at-a-glance) como artefatos a
  construir.
- **Equipas do setor público**, para as quais várias jurisdições já publicam instrumentos dedicados.
  O capítulo 21 cobre
  [os registos do setor público do Reino Unido](/bok/ai-laws-worldwide#united-kingdom-principles-regulators-and-public-sector-records)
  e
  [a Diretiva do Canadá sobre Tomada de Decisão Automatizada](/bok/ai-laws-worldwide#canada-after-aida-the-directive-on-automated-decision-making).
- **Pequenas organizações e startups**, que carregam os mesmos deveres com menos pessoas. O capítulo
  04 constrói
  [o stack mínimo viável para uma equipa de uma pessoa](/bok/the-stack#the-minimum-viable-stack-for-a-team-of-one).

Não precisa de escrever código de produção para usar este livro, mas deve estar confortável perto de
um pipeline. A disciplina é uma capacidade que qualquer pessoa perto da construção pode desenvolver,
seja qual for o título: um engenheiro de governação de IA é definido pelos workflows que possui, não
pelo nome do cargo.

O website adiciona [uma página de destino por público](/for) ([engenheiros](/for/engineers),
[CISOs e responsáveis de risco](/for/ciso-risk), [conselho jurídico e EPDs](/for/legal-dpo),
[executivos e conselhos](/for/executives-board), [setor público](/for/public-sector) e
[PMEs](/for/smes)) que coloca os capítulos, padrões, modelos e ferramentas na ordem que cada
trabalho necessita.

## Como usar este livro

O Body of Knowledge tem 24 capítulos em cinco partes. Leia a primeira parte por ordem: estabelece o
vocabulário que todos os outros capítulos usam. Depois disso, leia por parte, ou siga a pergunta que
tem diante de si.

1. **[A disciplina](/bok#part-discipline)** (capítulos 00–07): a definição, por que a disciplina
   está a formar-se agora, os seus valores e princípios, o stack de cinco camadas, o catálogo de
   padrões, o papel e o modelo de maturidade.
2. **[Referência](/bok#part-reference)** (08–10): o mapa regulatório que transforma cada obrigação
   num artefato e numa camada, o glossário e a lista de leitura. A maioria dos capítulos aponta para
   estes.
3. **[Fundações](/bok#part-foundations)** (11–13): o que conta como um sistema de IA, o programa de
   governação que dá a cada controlo um proprietário, e o ciclo de risco que diz a cada controlo
   quão rigorosamente atuar.
4. **[O ciclo de vida](/bok#part-lifecycle)** (14–17 e 23): desenvolvimento, implantação, equidade e
   explicabilidade, incidentes e agentes, cada fase deixando um registo que um gate lê.
5. **[Lei e normas](/bok#part-law)** (18–22): o Regulamento da IA da UE, proteção de dados, a outra
   lei que já se aplica, leis de IA em todo o mundo, e os princípios e normas.

A maioria dos capítulos abre com um resumo "À primeira vista" e uma lista de termos-chave, cada um
ligado à sua página de glossário, e termina com "O que pode fazer esta semana". Os capítulos
ligam-se uns aos outros por secção, para que um tópico possa ser seguido através de partes. No
website, os padrões, modelos, registo de obrigações e toolkit carregam o mesmo material numa forma
que pode copiar para um pipeline.

## O que isto não é

Isto não é uma lista de verificação de conformidade, e não é aconselhamento jurídico. Não vos diz se
o vosso sistema está em conformidade; diz-vos como construir os controlos e a evidência que permitem
a alguém qualificado fazer essa chamada. Não é uma agenda de pesquisa de segurança de IA, um manual
de MLOps, ou um guia de compra de fornecedor; ferramentas são nomeadas apenas como exemplos
ilustrativos de uma categoria, nunca como recomendações. E não está terminado. A versão 0.5.0 é um
rascunho público com lacunas deliberadas abertas a contribuições.

## Como citar

> García Aibar, J. *AI Governance Engineering: The Body of Knowledge*, v0.5.0. 2026.
> https://aigovernanceengineer.com/bok. Licensed CC BY 4.0.

Para a Tese, cite ambos os coautores:

> García Aibar, J., & Pols, A. *The AI Governance Engineering Thesis*, v0.5.0. 2026.
> https://aigovernanceengineer.com/thesis. Licensed CC BY 4.0.

Cite um capítulo específico pelo seu número e título (por exemplo, "capítulo 01, A definição"). A
casa canónica da Tese é https://aigovernanceengineer.com/thesis e do Body of Knowledge
https://aigovernanceengineer.com/bok. Cada capítulo carrega a sua própria lista de fontes numeradas;
a tabela consolidada vive em `sources/SOURCES.md`.

## Versionamento

Esta é **v0.5.0**, um rascunho público. O versionamento é semântico em espírito: lançamentos de
patch corrigem factos e erros tipográficos, lançamentos menores adicionam capítulos ou padrões, e um
1.0 marcará o ponto em que os capítulos principais (00–10) estão completos e revistos. Cada mudança
é registada em `bok/CHANGELOG.md`. Como a paisagem regulatória e de normas se move (a reforma
Digital Omnibus, normas harmonizadas sob JTC 21, os lançamentos OWASP e CSA), os capítulos carregam
uma data "atual a partir de" e espera-se que sejam revistos.

## Como contribuir

Este livro acolhe contribuições creditadas. Para contribuir:

1. Leia `STYLEGUIDE.md` e siga exatamente o modelo de capítulo ou padrão.
2. Obtenha fonte de cada afirmação factual. Use o formato de citação `[n]`, marque cada fonte
   `primary`, `secondary` ou `reported`, e adicione a linha a `sources/SOURCES.md` sob a secção do
   seu capítulo.
3. Abra um pull request. Para assinar a Tese, adicione o seu nome a `bok/CONTRIBUTORS.md`.

As regras existem para que muitas mãos produzam um livro coerente. Tudo o resto (os argumentos, os
padrões, os mapeamentos) está aberto para melhorar.

**Correspondências:** este prefácio não faz nenhuma afirmação normativa; as normas que nomeia são
tratadas em cheio nos capítulos 04, 05, 08, 18 e 22.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
