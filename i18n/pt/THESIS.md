---
lang: pt
source: THESIS.md
sourceHash: "921fc304377c137a926045c38040d78fbec8f056e7944d519b5b34cd7a8a48a8"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# A Tese de Engenharia de Governação da IA

Versão 0.5.0 · 2026-09-25 · Jorge García Aibar e Aurélie Pols

---

**A engenharia de governação da IA é a aplicação da prática de engenharia (pensamento sistémico, pensamento de produto e código) à governação de sistemas de IA.**
Trata a governação não como um documento a ser assinado mas como um sistema a ser construído,
executado e medido, com o mesmo rigor que os engenheiros já aplicam aos modelos e agentes que
governa.

É mais do que "governação de IA mais alguns scripts." É uma mudança em como o trabalho é feito. A
governação de IA legada descreve um sistema de IA em papel e espera que o papel se mantenha
verdadeiro. Engenheirar a governação significa que a política é executável, o controlo funciona no
pipeline, a evidência é produzida como um subproduto da construção, e tudo é julgado por um teste: a
redução efetiva do risco realmente caiu, e um regulador ou auditor consegue ler a prova? É uma
capacidade, não um título de cargo. Qualquer pessoa suficientemente próxima da construção consegue
desenvolvê-la. É medida pela redução efetiva do risco e pela evidência pronta para auditoria, nunca
por quantos frameworks aparecem num diapositivo.

A ideia não aparece do nada. Herda de uma linha de movimentos de engenharia que transformaram
processo em sistemas em funcionamento: site reliability engineering, DevSecOps, política como código
e segurança da cadeia de fornecimento de software. Mais diretamente, herda da engenharia de GRC, que
desde cerca de 2024 transformou governação, risco e conformidade num produto construído com código,
testado em CI/CD e enviando evidência através de APIs [1]. A governação de IA agora precisa do mesmo
passo de mudança, porque a coisa a ser governada (modelos que retreinam, prompts que mudam, agentes
que agem por conta própria) move-se mais rápido do que qualquer documento consegue acompanhar.

## Problemas fundamentais com a governação de IA legada

**1. Governação escrita para sistemas que já não existem.** A governação de IA legada funciona em
políticas em PDF e inventários em folha de cálculo que descrevem um sistema de IA como era no dia em
que foi revisto. Mas os modelos são retreinados, prompts são reescritos e agentes adquirem novas
ferramentas todos os dias. O artefato fica obsoleto antes de ser assinado. Não é por acaso que a
função ainda fica principalmente com privacidade, legal e TI e apenas 5% com segurança [3]: longe do
pipeline onde o sistema realmente muda.

**2. Revisão num ponto no tempo de uma coisa que muda continuamente.** Avaliações anuais e
aprovações de comissão assumem um sistema que se mantém imóvel o tempo suficiente para ser julgado.
Modelos de fronteira e agentes autónomos não. A Gartner espera que mais de 40% dos projetos de IA
agêntica sejam cancelados até ao final de 2027, citando controlos de risco inadequados entre as
causas [4], e prevê que até 2029 mais de metade dos ataques bem-sucedidos a agentes de IA explorarão
fraquezas de controlo de acesso e injeção de prompts [5]: modos de falha em tempo de execução que
uma revisão uma vez por ano é estruturalmente cega.

**3. Governação como uma porta no final, não uma propriedade da construção.** A governação chega
após o modelo ser treinado, como um ponto de verificação a ultrapassar antes do lançamento. Os
engenheiros experimentam-na como um imposto cobrado à porta, e nada que produz é ligado de volta a
como o sistema é construído. Uma política que só consegue recomendar não consegue parar um
lançamento ruim. Uma avaliação que consegue falhar a construção consegue. A governação colocada no
final só consegue descrever risco; a governação construída no pipeline consegue preveni-lo.

**4. Teatro de frameworks.** O mapeamento para NIST AI RMF ou ISO/IEC 42001 torna-se o estado final
em vez do ponto de partida. Uma matriz de mapeamento verde é confundida com um controlo em
funcionamento. No entanto, a partir de 2026-09-24 nenhuma norma harmonizada é citada no Jornal
Oficial da UE, portanto mesmo um certificado ISO 42001 não confere presunção de conformidade com o
Regulamento da IA [6]. Cobertura não é garantia. Um mapeamento cruzado prova que leste o framework,
não que o controlo para o qual aponta realmente funciona; uma matriz verde sobre um controlo
quebrado é "teatro com passos extra" [2].

**5. Sem caminho de dados em tempo de execução.** O registo não sabe o que está em funcionamento. A
Gartner pede às plataformas de governação de IA "aplicação de política automatizada em tempo de
execução" [11], no entanto a comparação de uma fornecedora da categoria, publicada por um
concorrente nela, descobre que a maioria "gere o programa (inventários, avaliações, mapeamentos de
frameworks, fluxos de trabalho de evidência) sem qualquer caminho de dados em tempo de execução"
[7]. A própria conta da IBM de ser nomeada Líder no primeiro Magic Quadrant da Gartner para
Plataformas de Governação de IA (junho de 2026) aponta para o mesmo: descreve visibilidade em casos
de utilização de IA e um roteiro de inventário centralizado de ativos de IA, linhagem e integração
de casos de utilização (a camada de programa), e não menciona aplicação em tempo de execução [10].
Portanto as três questões que definem a disciplina (que IA está em funcionamento, o que lhe é
permitido fazer, que evidência prova) ficam sem resposta, porque nada está ligado à produção.
Entretanto um inquérito de 2026 de uma fornecedora de segurança relata que aproximadamente um em
cada oito incidentes de IA envolveu sistemas agênticos [8]: exatamente a camada que o registo em
papel não consegue ver.

## Valores

Oito afirmações. Cada uma enuncia aquilo para o qual construímos e, ao nomeá-lo, aquilo de que nos
afastamos. Nem todas são novas: os valores 1, 5 e 7 (governação como código, evidência legível por
máquina e redução de risco medida) são herdados da engenharia de GRC; os valores 2 e 4 (avaliações
que falham a compilação e identidade e âmbito de agentes) são o que a IA nos força a acrescentar. O
capítulo 03 expande cada um com um exemplo prático e o anti-padrão que rejeita.

**1. A governação é código, não um documento.** Uma política num PDF é uma declaração de intenção
que um humano deve recordar e aplicar; uma política como código é um controlo que executa,
versionado num repositório e aplicado sem que ninguém tenha de se lembrar. O documento descreve a
regra; o código *é* a regra, e apenas o que executa pode ser medido.

**2. As avaliações falham compilações; as revisões apenas recomendam.** Uma revisão produz uma
recomendação que alguém pode ou não executar, mais tarde. Uma avaliação produz um veredicto com
consequências: o modelo ou agente passou ou falhou um teste definido, e uma falha bloqueia o
lançamento. Preferimos controlos que têm efeito.

**3. A evidência vem do tempo de execução, não de uma atestação pontual.** Uma atestação diz que um
controlo estava em vigor quando alguém olhou. A evidência em tempo de execução mostra-o a funcionar
continuamente, emitida pelo sistema enquanto executa, porque um sistema de IA muda entre revisões, e
a evidência recolhida uma vez decai imediatamente.

**4. Cada agente carrega a sua própria identidade e âmbito.** Um ator com credenciais partilhadas é
ingovernável: não pode atribuir as suas ações, revogar o seu acesso com precisão, ou limitar o que
pode fazer. A identidade é a precondição da responsabilidade; o âmbito é a precondição do
confinamento, e ambos são estabelecidos antes de o ator ser autorizado a agir.

**5. A evidência é legível por máquina ou não é evidência.** Evidência que um humano deve produzir,
formatar e arquivar manualmente não pode ser consultada, comparada ou verificada com rapidez.
Artefatos legíveis por máquina (OSCAL, resultados de avaliação estruturados, registos assinados)
transformam a auditoria numa consulta e alimentam a garantia contínua em vez de um dossier único.

**6. As ferramentas devem ser inspecionáveis e compostas.** Não pode confiar num veredicto que não
pode rastrear. Ferramentas cujo raciocínio e caminho de dados pode abrir, compradas ou construídas,
permitem-lhe seguir uma decisão até à regra que a produziu e à evidência que emitiu, e integrá-la no
pipeline que já executa em vez de exportar para o de outra pessoa.

**7. O sucesso é medido em redução efetiva do risco, não em cobertura de framework.** Mapear cada
controlo para um framework prova que o leu, não que algum risco caiu. Medimos a coisa em si: a taxa
do modo de falha caiu, o raio de explosão encolheu, o incidente foi apanhado mais cedo? A cobertura
é um input; a redução efetiva do risco é o resultado.

**8. A governação é possuída com a engenharia, não aplicada de fora.** Governação que fica à parte e
concede ou nega passagem é um estrangulamento que os engenheiros contornam. Possuída conjuntamente
com a engenharia, construída no caminho pavimentado, adotada porque é a forma mais fácil de lançar,
torna-se parte de como as coisas são feitas, não uma reunião que um lado teme.

## Princípios

Os valores dizem o que preferimos; estes princípios dizem o que nos comprometemos a *fazer*. São
regras de ação, não reafirmações das preferências acima.

**Construa o controlo no ponto mais cedo em que pode bloquear.** Coloque cada controlo onde ainda
pode impedir que a coisa corra mal, e não depois: no repositório, na compilação e no tempo de
execução, não numa revisão após o facto. O ponto mais cedo em que pode ser aplicado é o mais barato
e o mais forte, por isso é aí que o colocamos.

**Dê a cada controlo dentes, ou chame-lhe um sinal.** Um controlo tem de ser capaz de mudar o que
acontece a seguir: bloquear uma fusão, falhar um lançamento, revogar acesso. Qualquer coisa que
apenas pode informar um comité é um sinal, e nós a rotulamos honestamente como tal em vez de a
disfarçar de controlo.

**Registe e delimite cada ator antes de agir.** Nada, humano ou não humano, age até ter um
proprietário, um âmbito declarado e uma forma de ser parado. A autonomia é concedida apenas onde
pode ser atribuída, confinada e retirada, nunca por defeito.

**Instrumente a compilação para produzir a sua própria prova.** Ligue cada controlo para emitir o
seu próprio registo enquanto executa, para que a garantia saia do sistema em vez de ser montada
manualmente. Se demonstrar um controlo requer uma captura de ecrã, não o terminámos de construir.

**Comece por um modo de falha nomeado ou um dano nomeado.** Desenhe cada controlo contra uma forma
específica de o sistema falhar (injeção de prompts, uso indevido de ferramentas, abuso de identidade
de agente, exfiltração de dados) ou um dano específico aos direitos de uma pessoa. Se não conseguir
nomear o risco a que responde, não o construímos.

**Torne o caminho governado o caminho mais fácil.** Envie a governação como ferramentas, modelos e
caminhos pavimentados que os engenheiros adotam sem pedir permissão, e meça a adoção. Se contornar a
governação é mais fácil do que usá-la, corrigimos o produto, não as pessoas.

## O que os engenheiros de governação da IA constroem

Não apresentações. Artefatos de trabalho, versionados num repositório e em execução em produção:

- **Política como código**: regras de governação como política executável (`OPA/Rego`, Cedar, Policy
  Cards) que avaliam em CI/CD e em tempo de execução.
- **Um registo de agentes**: o inventário consciente do tempo de execução de cada modelo, serviço e
  agente, cada um com um proprietário, um âmbito e um estado.
- **AIBOM e fichas de modelo/dados**: a lista de materiais para um sistema de IA
  (`CycloneDX ML-BOM`, perfil `SPDX 3.0 AI`) e documentação de transparência estruturada.
- **Portas de avaliação em CI**: avaliações adversariais e de capacidade (Inspect, promptfoo, Garak,
  Giskard) ligadas ao pipeline para que uma avaliação falhada bloqueie o lançamento.
- **Guardrails em tempo de execução e kill switches**: controlos de entrada/saída, mediação de
  chamadas de ferramentas e uma forma testada de parar um agente, no ponto de ação.
- **Telemetria de garantia contínua**: rastreamento e monitorização (`OpenTelemetry`,
  observabilidade de agentes) que transforma o comportamento em produção num sinal de controlo em
  direto.
- **Evidência legível por máquina**: `OSCAL` e artefatos estruturados e assinados que tornam a
  auditoria uma consulta em vez de uma confusão.
- **Pipelines de incidentes**: a infraestrutura para detetar, triagiar e relatar incidentes graves
  no prazo, incluindo o relatório do artigo 73 do Regulamento da IA da UE para sistemas de risco
  elevado.
- **Modelos FRIA e DPIA como código**: avaliações de impacto sobre direitos fundamentais e proteção
  de dados mantidas como artefatos versionados e revisáveis, não documentos únicos.

Estes artefatos mapeiam, camada por camada, para o stack de engenharia de governação da IA de cinco
camadas: Govern-as-Code, Inventory & Transparency, Evals & Red Teaming as Evidence, Runtime Controls
& Observability, e Assurance & Continuous Compliance.

Reconhecemos a herança claramente, porque é a defesa honesta contra «isto é apenas GRC com palavras
de IA». Três das cinco camadas (Govern-as-Code, Inventory & Transparency, e Assurance & Continuous
Compliance, que transportam política como código, o inventário de ativos e evidência legível por
máquina) são herdadas da engenharia de GRC e transportadas quase inalteradas. Duas são o que a IA
nos força a acrescentar: avaliações e red-teaming *como controlos* (camada 03), porque a coisa a ser
governada é um modelo cujo comportamento apenas pode ser estabelecido testando-o; e identidade de
agente e controlo em tempo de execução (camada 04), porque um ator autónomo não tem análogo na GRC
clássica. O trabalho novo da disciplina concentra-se nessas duas camadas.

## Uma disciplina, distinta dos seus vizinhos

A engenharia de governação da IA não é investigação de segurança de IA, MLOps, gestão de risco de
modelos, conformidade de IA ou trabalho legal, ou ética de IA Responsável; é a engenharia que
transforma tudo isto em controlos em execução e evidência legível. É a irmã da era da IA da
engenharia de segurança de IA, a descendente direta da engenharia de GRC. Uma colisão de nomes vale
a pena assinalar: alguns fornecedores usam as mesmas palavras, «engenharia de governação da IA»,
para o problema inverso, governar as ferramentas de IA que os engenheiros usam dentro dos seus
próprios fluxos de trabalho [9]. Isto é engenharia de IA governada, não a disciplina descrita aqui.
O capítulo 01 desenha cada uma destas linhas na íntegra.

## Autores

**Jorge García Aibar (v0.1–v0.5.0)**, Engenheiro de Governação e Privacidade de IA. LinkedIn:
https://www.linkedin.com/in/jorgara

**Aurélie Pols (v0.1–v0.5.0)**, IA Responsável (UE/Global), Privacidade e Governação de Dados.
LinkedIn: https://www.linkedin.com/in/aureliepols

**Co-autores procurados.** Esta é a versão 0.5.0: um rascunho público, deliberadamente incompleto.
Foi iniciado por um profissional e precisa de muitos. Se constrói governação para sistemas de IA
(política como código, registos de agentes, portas de avaliação, guardrails em tempo de execução,
garantia contínua) e pode trazer um facto verificado, um padrão que funcionou, ou um argumento mais
afiado, é convidado a co-autoria. A disciplina é uma capacidade que qualquer pessoa pode
desenvolver, e este texto pertence a todos os que fazem o trabalho.

## Assine / envolva-se

- **Leia-o** em https://aigovernanceengineer.com/thesis e o Body of Knowledge em
  https://aigovernanceengineer.com/bok
- **Assine a Tese** abrindo um pull request que adiciona o seu nome a `bok/CONTRIBUTORS.md` (secção
  SIGNATORIES) no repositório, `github.com/losanchos5/aige`.
- **Contribua um capítulo ou um padrão** seguindo `STYLEGUIDE.md`; cada afirmação factual precisa de
  uma citação obtida e verificada.
- **Discuta-o** no LinkedIn com Jorge García Aibar (https://www.linkedin.com/in/jorgara), nomeando a
  disciplina, não a pessoa.

## Licença

Esta Tese é licenciada sob **CC BY 4.0**. Pode partilhá-la e adaptá-la desde que dê crédito
apropriado, ligue à licença e indique alterações. Atribuição: Jorge García Aibar e Aurélie Pols.

## Sources

[1] GRC Engineering Manifesto. grcengineering. ~2024. https://grc.engineering/ (verified: primary)
[2] "What is GRC Engineering" (Ayoub Fandi). GRC Engineer. 2025. https://grcengineer.com/what-is-grc-engineering/ (verified: primary)
[3] AI Governance Profession Report 2025. IAPP (with Credo AI). 2025-04-16. https://iapp.org/resources/article/ai-governance-profession-report/ (verified: primary)
[4] "Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027". Gartner. 2025-06-25. https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027 (verified: primary)
[5] "Gartner Forecasts the Market for Securing AI Will Reach Almost $5 Billion in 2027". Gartner. 2026-08-26. https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027 (verified: primary)
[6] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption of conformity from any standard, ISO/IEC 42001 included; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[7] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; runtime data path critique). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[8] 2026 AI Threat Landscape Report (vendor survey; key finding stated on the report page: one in eight breaches were agentic). HiddenLayer. 2026. https://www.hiddenlayer.com/report-and-guide/threatreport2026 (verified: primary)
[9] "AI Governance Engineering" (governing AI used inside engineering workflows). Visure Solutions. 2026. https://visuresolutions.com/ai-engineering/ai-governance-engineering/ (verified: primary)
[10] "IBM recognized as a Leader in the Gartner Magic Quadrant for AI Governance Platforms" (vendor announcement citing Gartner, Magic Quadrant for AI Governance Platforms, L. Kornutick et al., 17 June 2026, the first MQ for the category; visibility into AI use cases; roadmap: AI asset inventory and lineage, use-case onboarding). IBM. 2026-06-17. https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms (verified: secondary)
[11] "Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms" (platforms should enable "automated policy enforcement at runtime"; AI governance spending USD 492M in 2026, over USD 1B by 2030). Gartner. 2026-02-17. https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms (verified: primary)
