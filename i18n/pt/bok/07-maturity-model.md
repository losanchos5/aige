---
lang: pt
source: bok/07-maturity-model.md
sourceHash: "541c28ee31cef3e3713b5b858d53c65c0157543b0cc3a6b894e8d1e6f9893a7e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 07. Modelo de maturidade (cinco níveis)

> Uma escada do papel à produção (Documentado, Inventariado, Testado, Aplicado, Contínuo), onde cada
> nível é provado pelo que os sistemas em execução podem mostrar, não pelo que um documento afirma.

## Por que um modelo de maturidade, e como ler este

Os modelos de maturidade falham quando medem documentação. Este mede os sistemas. Um nível não é uma
pontuação que se atribui a si mesmo; é um estado que pode demonstrar consultando o registo,
executando a porta e lendo o armazenamento de evidência. A escada vai de governação que existe
apenas no papel a governação que funciona continuamente fora do caminho de dados em tempo de
execução.

Os cinco níveis respondem às três questões com confiança crescente. **Documentado** e
**Inventariado** respondem *que IA está em execução*, primeiro no papel, depois de um inventário
ativo. **Testado** e **Aplicado** respondem *o que é permitido fazer*, primeiro medindo, depois
bloqueando. **Contínuo** responde *que evidência o prova*, continuamente, a partir de telemetria.
Cada nível é avaliado em todas as cinco camadas do stack (capítulo 04); está num nível apenas quando
cada camada o atingiu, porque uma corrente é tão forte quanto a sua camada mais fraca.

## Os cinco níveis

**Nível 1: Documentado.** A governação existe como artefatos que um humano mantém: um PDF de
política, um inventário em folha de cálculo, um registo de riscos, uma revisão que acontece antes do
lançamento. As regras estão escritas e alguém é responsável, mas nada executa. Evidência típica:
documentos de política, uma folha de cálculo preenchida, atas de reunião. Falha típica que o move
para trás: o documento foi editado pela última vez há um trimestre e já não corresponde à produção;
o artefato está obsoleto antes de ser assinado. O capítulo 13 mostra como o registo de riscos se
parece em cada nível
([prática de risco por nível de maturidade](/bok/risk-management#risk-practice-by-maturity-level)).

**Nível 2: Inventariado.** Existe um inventário real de modelos e um
**[registo de agentes](/patterns/agent-registry)**, e é alimentado por um caminho de dados em tempo
de execução em vez de digitado à mão: uma implantação regista um sistema com um proprietário, um
âmbito e um estado. Pode responder *que está em execução* em qualquer dia. Evidência típica: um
registo com um proprietário e uma classe para cada sistema; um trabalho de descoberta reconciliando
o registo contra a produção. Falha típica: [descoberta de IA sombra](/patterns/shadow-ai-discovery).
Um sistema ou agente chega à produção sem se registar, para que o inventário seja completo apenas
para os honestos.

**Nível 3: Testado.** Os sistemas são avaliados contra testes definidos (avaliações de capacidade,
segurança e adversárias) e os resultados são registados como evidência. As falhas são visíveis, mas
uma avaliação falhada ainda não bloqueia nada. Sabe quais os sistemas que ficam aquém; ainda não
tornou ficar aquém ter consequências. Evidência típica: suites de avaliação versionadas; resultados
de avaliação armazenados e com carimbo de tempo; descobertas de red team. Falha típica: a avaliação
é executada uma vez antes do lançamento, colada numa apresentação, e nunca re-executada quando o
modelo ou os seus prompts mudam.

**Nível 4: Aplicado.** Os testes têm efeito. [Política como código](/patterns/policy-card) e
**[portas de avaliação](/patterns/eval-gate-in-ci)** executam em CI/CD e na admissão, e um controlo
falhado bloqueia a fusão ou a implantação. A identidade precede a autonomia: um agente sem
proprietário, âmbito ou **[kill switch](/patterns/kill-switch-circuit-breaker)** é negado uma
[identidade de carga de trabalho](/bok/governing-agents#identity-and-short-lived-credentials). A
governação é agora uma propriedade da construção, não um ponto de verificação após ela. Mas uma
porta de bloqueio é apenas tão boa quanto o teste por trás dela, para que o Nível 4 tenha uma
segunda condição que é fácil de saltar: a *qualidade* da suite de avaliação é avaliada, não apenas a
sua existência e os seus dentes. Uma porta que bloqueia numa suite trivial ou obsoleta é Nível 4
pela letra e teatro de framework de facto: uma construção verde que não prova nada. Assim, a
afirmação de aplicação requer que a cobertura seja medida, casos adversários sejam mantidos contra
ameaças atuais, e limiares rastreiem para modos de falha nomeados em vez de números redondos (ver
capítulo 01, "os limites da porta de avaliação"). Evidência típica: registos de pipeline mostrando
lançamentos bloqueados com razões; negações de controlo de admissão; o registo agindo como uma porta
de implantação; uma métrica de cobertura rastreada ou qualidade adversária para as suites que
portam. Falha típica: portas frágeis que os engenheiros contornam; uma porta mantida apenas pela
governação que a engenharia não é proprietária; ou uma porta cuja suite é trivial ou não mantida,
para que o bloqueio seja real mas a garantia não seja.

**Nível 5: Contínuo.** A garantia é produzida continuamente a partir do caminho de dados em tempo de
execução. Decisões de guardrail, mediação de chamadas de ferramentas, deriva e comportamento de
agentes fluem para observabilidade;
**[garantia contínua](/patterns/continuous-assurance-telemetry)** transforma o comportamento de
produção num sinal de controlo ativo; evidência é emitida como
[artefatos legíveis por máquina](/patterns/machine-readable-evidence-oscal) (`OSCAL`, registos
assinados) conforme o pipeline e o tempo de execução operam. A auditoria é uma consulta. Numa
comparação de um fornecedor da categoria de plataforma de governação de IA, a maior parte não atinge
este estado final, porque "gere o programa … sem qualquer caminho de dados em tempo de execução"
[1]. Evidência típica: um armazenamento de garantia ativo; telemetria de avaliação e guardrail em
streaming; uma auditoria respondida executando uma consulta. Falha típica: telemetria que é
recolhida mas nunca ligada a uma decisão; observabilidade sem aplicação decai de volta ao Nível 3
disfarçado de Nível 5.

## Critérios observáveis, por camada e nível

Leia cada linha como uma camada amadurecendo da esquerda para a direita. Está num nível apenas
quando cada linha atingiu a sua coluna.

| Camada | 1 Documentado | 2 Inventariado | 3 Testado | 4 Aplicado | 5 Contínuo |
|---|---|---|---|---|---|
| **1 Govern-as-Code** | Políticas escritas em prosa | Políticas indexadas, mapeadas para sistemas | Verificações de política executadas e relatório, não bloqueante | [Política como código](/patterns/policy-card) bloqueia fusão/implantação | [Vereditos de política](/patterns/continuous-assurance-telemetry) fluem para garantia, versionados |
| **2 Inventory & Transparency** | Inventário em folha de cálculo | Registo alimentado por implantação; proprietário + âmbito por sistema | Registo reconciliado contra produção | [Registo porta implantação](/patterns/agent-registry); nenhuma entrada, nenhuma identidade | Registo ativo fora de [descoberta em tempo de execução](/patterns/shadow-ai-discovery); deriva auto-sinalizada |
| **3 Evals & Red Teaming as Evidence** | Avaliações descritas num plano | Suites de avaliação existem e são versionadas | Avaliações executadas, resultados armazenados, não bloqueante | [Porta de avaliação](/patterns/eval-gate-in-ci) falha a construção na regressão; cobertura de suite e qualidade adversária avaliadas | Avaliações executadas continuamente; resultados são evidência ativa |
| **4 Runtime Controls & Observability** | Guardrails nomeados num design | Guardrails implantados, não medidos | Decisões de guardrail registadas | [Kill switch](/patterns/kill-switch-circuit-breaker) testado; chamadas de ferramentas mediadas e aplicadas | Sinais em tempo de execução impulsionam decisões de controlo em tempo real |
| **5 Assurance & Continuous Compliance** | Evidência recolhida à mão para auditoria | Evidência templada por controlo | Evidência estruturada produzida por execução | Evidência necessária para passar o gate | [Evidência legível por máquina](/patterns/machine-readable-evidence-oscal) emitida continuamente; auditoria = consulta |

**A maturidade parcial é o estado normal.** Quase nenhuma função real fica num nível único e limpo
em todas as cinco camadas; a imagem habitual é uma linha irregular: inventário na Camada 4,
avaliações na Camada 2, garantia na Camada 3. Isto não é uma falha do modelo, é o ponto de o ler por
camada. O nível geral único é a camada mais fraca, e é um *piso* para planeamento, não um veredicto
sobre a função inteira. Duas leituras seguem: relatar o perfil por camada, não apenas o piso, porque
mostra onde está a alavanca; e esperar que o perfil permaneça irregular, porque as camadas
amadurecem à velocidade do trabalho que controlam, não em sincronismo. Uma função que está no Nível
4 em identidade e no Nível 2 em avaliações está a fazer melhor do que o "Nível 2" geral sugere, e o
seu próximo passo é óbvio a partir do perfil.

## Métricas por nível

Cada nível tem métricas que pode ler dos sistemas. Acompanhe a tendência, não o número único.

- **Nível 1 → 2:** percentagem de sistemas de IA e agentes no registo com um proprietário nomeado e
  uma classe; lacuna de reconciliação registo-produção (sistemas em produção mas não registados).
- **Nível 2 → 3:** percentagem de sistemas registados com uma suite de avaliação versionada;
  percentagem com um resultado de avaliação registado e com marca de tempo na última versão.
- **Nível 3 → 4:** percentagem de versões que passam por um **eval gate** (versus contorná-lo);
  percentagem de agentes com um kill switch testado e uma identidade com âmbito, não partilhada;
  número de versões bloqueadas com uma razão registada.
- **Nível 4 → 5:** tempo médio para detetar uma ação de agente não autorizada (um agente a fazer
  algo fora do seu âmbito declarado, território OWASP Agentic ASI03/ASI10 [2]);
  **atualidade da evidência** (idade do artefato de evidência mais recente por controlo);
  percentagem de controlos cuja situação é respondível por uma consulta em direto em vez de uma
  extração manual.

A métrica transversal mais reveladora é a atualidade da evidência. No Nível 1 a evidência mais
recente tem um trimestre de idade; no Nível 5 tem a idade da última execução do pipeline. Se a sua
evidência envelhece em meses, ainda não é contínua, seja o que disser o painel. Estas são métricas
de engenharia; o conjunto de nível de conselho que as relata para cima está no capítulo 12
([KPIs e KRIs para liderança e conselho](/bok/governance-program#kpis-and-kris-for-leadership-and-the-board)).

## Lista de verificação de auto-avaliação

Responda a cada uma com o sistema, não com a intenção. Um "não" coloca-o no nível abaixo.

- **Documentado:** Cada sistema de IA é coberto por uma política escrita com um proprietário
  nomeado? Existe um registo de riscos que uma pessoa mantém?
- **Inventariado:** O registo recebe uma entrada automaticamente na implantação, com proprietário,
  âmbito e situação? Consegue listar cada modelo e agente em execução hoje, a partir do sistema de
  registo, em menos de um minuto?
- **Testado:** Cada sistema registado tem uma suite de avaliação versionada? Os resultados são
  armazenados com marcas de tempo? Executa avaliações de red-team contra os seus agentes?
- **Aplicado:** Uma avaliação falhada ou uma verificação de política realmente bloqueia uma versão?
  Um agente sem proprietário, âmbito e kill switch é impedido de chegar à produção? Consegue mostrar
  uma versão que foi bloqueada, com a razão registada?
- **Contínuo:** A telemetria de tempo de execução está ligada a decisões de controlo, não apenas a
  painéis? A evidência é emitida como artefatos legíveis por máquina continuamente? Uma pergunta de
  auditoria seria respondida por uma consulta em vez de um sprint de recolha?

Se conseguir dizer sim a um nível inteiro e a cada camada dentro dele, está nesse nível. O primeiro
"não" é o seu próximo trabalho, e o passo mais pequeno para o nível seguinte é quase sempre fechar a
camada mais fraca, não adicionar um sexto controlo à mais forte. Execute a lista de verificação como
uma ferramenta: a [auto-verificação de maturidade](/toolkit/maturity-self-check) desenha o seu
perfil por camada, nomeia o piso e o próximo passo, e exporta-o.

## Como isto se relaciona com certificação e outras avaliações

Este modelo de maturidade não é uma certificação e não confere uma. Relaciona-se com três esquemas
externos; a relação é de apoio e sobreposição, não de equivalência.

**Certificação ISO/IEC 42001.** ISO/IEC 42001 certifica que um sistema de gestão de IA (AIMS) existe
e é operado, uma prova de Nível 1-2 de *processo*: que a governação é documentada, propriedade e
revista. Diz pouco sobre se um **eval gate** bloqueia uma compilação ou se a evidência é legível por
máquina, as propriedades de Nível 4-5. E não é uma norma harmonizada: o certificado não confere
presunção de conformidade com o Regulamento da IA da UE, porque nenhuma é ainda citada no Jornal
Oficial [3]. Atingir o Nível 5 apoia uma auditoria 42001 produzindo evidência continuamente; não
substitui o certificado, e o certificado não prova que passou do Nível 2. Seja qual for o esquema,
execute [um programa de auditoria](/bok/governing-deployment#an-audit-programme-not-an-audit), não
uma auditoria única (capítulo 15).

**Avaliação de Maturidade de IA OWASP (AIMA).** O Projeto de Segurança GenAI da OWASP publica uma
Avaliação de Maturidade de IA reportada na v1.0 (Ago 2025) [4]. É complementar: onde AIMA classifica
a *amplitude* de um programa de segurança de IA, este modelo classifica a *profundidade* do caminho
de dados de tempo de execução. Use AIMA para encontrar lacunas na cobertura; use esta escada para
descobrir se os controlos cobertos realmente funcionam.

**CSA STAR para IA.** CSA's STAR para IA é um programa de certificação construído na Matriz de
Controlos de IA (AICM), com um nível de auto-avaliação, um nível automatizado "Valid-AI-ted" e um
Nível 2 combinando certificação ISO/IEC 42001 de terceiros com a avaliação validada [1][5]. O seu
Nível 2 alinha-se com o fim *Aplicado* desta escada, mas, como 42001, atesta um programa em vez de
medir a atualidade da evidência de tempo de execução, a propriedade que a garantia contínua
(Nível 5) torna barata de produzir e difícil de falsificar. Certificados de pessoas (AIGP, ISO/IEC
42001 Lead Implementer e Lead Auditor, AAISM, AAIA) são uma coisa diferente: veja a
[página de certificações](/for/certifications).

> **Na prática**
> Uma função numa grande operadora de telecomunicações avaliou-se honestamente e chegou ao Nível 2
> para inventário mas Nível 1 para avaliações: o registo estava em direto fora do pipeline de
> implantação, mas as avaliações ainda eram executadas manualmente antes do lançamento e coladas em
> diapositivos. A cadeia era apenas tão forte quanto a sua camada mais fraca, portanto a função
> estava no Nível 1 geral. O passo mais pequeno não era um novo mapeamento de framework; era
> versionar uma suite de avaliação e armazenar os seus resultados com marca de tempo, movendo a
> camada de avaliação para o Nível 3, antes de a ligar a um gate. A atualidade da evidência caiu de
> um trimestre para um ciclo de versão em dois sprints.

**Correspondências:** Regulamento da IA Art. 9 (gestão de riscos), Art. 17 (sistema de gestão da
qualidade), Art. 72 (acompanhamento pós-comercialização) · ISO/IEC 42001 (AIMS) e ISO/IEC 42005
(avaliação de impacto) · NIST AI RMF (Govern, Measure, Manage) · OWASP Top 10 para Aplicações
Agênticas 2026 · CSA AICM / STAR para IA. Os mapeamentos são ilustrativos, não uma alegação de
conformidade.

## O que pode fazer esta semana

1. **Classifique cada camada, não a função.** Responda à lista de verificação de auto-avaliação por
   camada, a partir dos sistemas em vez da intenção, e tome o nível mais baixo como o seu nível
   geral.
2. **Meça a atualidade da evidência.** Para cada controlo, registe a idade do seu artefato de
   evidência mais recente. O mais antigo é onde o próximo sprint começa.
3. **Reconcilie o registo uma vez.** Compare o que o registo lista com o que está em execução em
   produção, e conte os sistemas e agentes que nunca se registaram.
4. **Eleve a camada mais fraca por um nível.** Implemente o passo mais pequeno lá (uma suite de
   avaliação versionada com resultados armazenados, ou um registo que controla uma implantação)
   antes de adicionar um controlo à camada mais forte.
5. **Encontre uma versão bloqueada.** Mostre uma versão que uma avaliação falhada ou uma verificação
   de política parou, com a razão registada. Se não houver nenhuma, ainda não está no Aplicado, seja
   o que disser o painel.

## Sources

[1] "Best AI Governance Platforms in 2026: 14 Enterprise Vendors Compared" (vendor-published comparison of the 13 Magic Quadrant vendors plus its own product; most of the category "manages the program … without any runtime data path"). Kosmoy. 2026-07-10. https://www.kosmoy.com/resources/blog/best-ai-governance-platforms-2026/ (verified: secondary)
[2] Top 10 for Agentic Applications 2026 (ASI03 Agent Identity & Privilege Abuse; ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] ISO/IEC 42001 certification is not yet a presumption of conformity with the EU AI Act (no harmonised standard cited in the OJ). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[4] OWASP AI Maturity Assessment (AIMA), reported at v1.0 (Aug 2025); Secure Governance initiative. OWASP GenAI Security Project. 2025. https://genai.owasp.org/initiatives/ (verified: reported)
[5] STAR for AI (three certification levels; Level 2 = third-party ISO/IEC 42001 + Valid-AI-ted; built on the AI Controls Matrix). Cloud Security Alliance. 2026. https://cloudsecurityalliance.org/star/ai (verified: primary)
