---
lang: pt
source: bok/05-patterns.md
sourceHash: "75573567c87d6e935731d6d9eb10dd5b66d986b32073f533a761faaa51306dcb"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 05. Padrões

> Um catálogo de padrões de engenharia de governação da IA reutilizáveis, cada um nomeado para uma
> camada do stack, na estrutura do Catálogo de Padrões de IA Responsável da CSIRO.

Este capítulo é o catálogo. Cada padrão é uma solução reutilizável para um problema que recorre
quando engenheira a governação de sistemas de IA. A estrutura segue o Catálogo de Padrões de IA
Responsável da CSIRO, que aplica padrões de design de engenharia de software à IA responsável em
níveis de governação, processo e produto [1]. Mantemos os seus campos (resumo, objetivos,
utilizadores-alvo, partes interessadas afetadas, princípios relevantes, contexto, problema, solução,
consequências, padrões relacionados) e adicionamos uma linha **Maps to** nomeando os padrões,
artigos e camada de stack (1–5) que cada padrão serve.

Cada padrão nomeia uma das cinco camadas ([capítulo 04](/bok/the-stack)) de modo a que o catálogo e
o stack permaneçam consistentes, e realiza um ou mais dos seis princípios
([capítulo 03](/bok/values-and-principles)): *construa o controlo no ponto mais cedo em que pode
bloquear · dê a cada controlo dentes · registe e limite cada ator antes de agir · instrumente a
compilação para produzir a sua própria prova · comece a partir de um modo de falha ou dano nomeado ·
torne o caminho governado o caminho mais fácil*. Cada linha **Maps to** extrai os seus IDs de ameaça
do OWASP Top 10 for Agentic Applications 2026 [2] e os seus rótulos de função do NIST AI RMF [3]; os
padrões do lado do desenvolvimento também nomeiam IDs do OWASP Top 10 for LLM Applications 2026 e
MITRE ATLAS, cada um fornecido na sua própria página. Cada padrão carrega um exemplo curto rotulado
`(illustrative)`: um esboço plausível, desidentificado, não uma reivindicação sobre qualquer sistema
nomeado. Os mapeamentos para o Regulamento da IA da UE são ilustrativos, não uma reivindicação de
conformidade, e a partir de 2026-09-24 nenhuma norma harmonizada sob o Regulamento é referenciada no
Jornal Oficial [4].

No website cada padrão tem a sua própria página, listada por camada em [/patterns](/patterns), com o
texto completo, o seu diagrama e as suas próprias fontes numeradas; este capítulo mantém o modelo, o
mapa de padrões e, sob o título de cada padrão, um resumo curto que liga ao padrão completo. A
edição impressa carrega cada padrão na íntegra neste capítulo.

## O modelo de padrão

Cada página de padrão utiliza os mesmos campos, nesta ordem, e termina com a sua própria lista de
**Fontes**.

| Campo | O que responde |
|---|---|
| Resumo | O que é o padrão e quando se aplica. |
| Objetivos | O resultado de governação que o padrão alcança. |
| Utilizadores-alvo | Quem o implementa. |
| Partes interessadas afetadas | Quem é afetado por ele. |
| Princípios relevantes | Qual dos seis princípios realiza. |
| Contexto | A situação em que o problema surge. |
| Problema | As forças em jogo e o modo de falha se o padrão não for aplicado. |
| Solução | Como construir: os artefatos, onde se situam no pipeline, o que é executado quando. |
| Consequências | Benefícios e compromissos: custo, latência, falsos positivos, manutenção. |
| Padrões relacionados | Os padrões de que depende ou que alimenta. |
| Mapeia para | As normas, artigos e camada de stack que o padrão serve. |

Um padrão não é uma política. Cada um nomeia o artefato que um engenheiro entrega, o ponto no ciclo
de vida onde é executado e a evidência que deixa para trás, para que o padrão possa falhar uma
compilação ou bloquear uma ação em vez de descrever uma intenção.

## Padrão: Policy Card

Expresse uma regra de governação como um cartão legível por máquina que viaja com o modelo ou
agente, em vez de prosa que um humano deve lembrar-se de aplicar. O mesmo cartão é avaliado
pré-merge, na implantação e no ponto de ação, e cada avaliação emite um veredicto, para que uma
mudança de regra seja um diff revisável e o mapeamento cruzado possa ser gerado a partir dos
cartões.

Camada 01 Govern-as-Code · [Leia o padrão Policy Card](/patterns/policy-card)

## Padrão: Eval Gate in CI

Integre uma suite de avaliação versionada em CI para que um modelo ou agente deva ultrapassar um
limiar documentado, rastreado até um modo de falha nomeado ou obrigação, antes de ser entregue. A
execução da avaliação é o controlo e o seu resultado estruturado é a evidência; uma avaliação
falhada bloqueia a compilação em vez de registar uma constatação.

Camada 03 Evals & Red Teaming as Evidence ·
[Leia o padrão Eval Gate in CI](/patterns/eval-gate-in-ci)

## Padrão: Adversarial Red-Team Suite

Mantenha uma suite adversarial versionada, construída a partir de uma taxonomia de ameaças em vez de
intuição, e execute-a em CI ou num agendamento contra a versão registada. Cada constatação é
corrigida ou aceite no registo, arquivada como evidência e realimentada como teste de regressão,
para que um ataque fechado permaneça fechado.

Camada 03 Evals & Red Teaming as Evidence ·
[Leia o padrão Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite)

## Padrão: Agent Registry

Mantenha um inventário consciente do tempo de execução de cada modelo, serviço e agente, com cada
entrada contendo um proprietário, um âmbito e uma data de expiração, escrita pelo pipeline de
implantação em vez de digitada manualmente. O registo torna-se uma precondição da produção, e o
registo é o objeto sobre o qual as políticas avaliam e os controlos de tempo de execução se anexam.

Camada 02 Inventory & Transparency · [Leia o padrão Agent Registry](/patterns/agent-registry)

## Padrão: AIBOM

Emita uma lista de materiais de IA na compilação, num formato padrão como CycloneDX ML-BOM ou o
perfil de IA SPDX 3.0, registando modelos, conjuntos de dados, pesos e a sua proveniência e
licenças. Armazenada com a entrada do registo e regenerada em cada compilação, transforma questões
de cadeia de abastecimento e transparência em consultas.

Camada 02 Inventory & Transparency · [Leia o padrão AIBOM](/patterns/aibom)

## Padrão: Model Card as Control Evidence

Preencha a ficha de modelo e a ficha de dados a partir do pipeline (resultados de avaliação, os
conjuntos de dados no AIBOM, limitações conhecidas, o proprietário) e regenere-as em cada mudança
significativa. Uma ficha reconstruída a partir do que a produção produziu é tanto documentação como
evidência de controlo; uma ficha escrita uma vez no lançamento decai em ficção.

Camada 02 Inventory & Transparency ·
[Leia o padrão Model Card as Control Evidence](/patterns/model-card-as-control-evidence)

## Padrão: Continuous Assurance Telemetry

Tenha cada controlo a escrever um registo de evidência estruturado com carimbo de data/hora para um
armazém de garantia, num esquema único com chave no id do registo. O estado de um controlo torna-se
uma consulta em tempo real sobre o que o sistema emitiu, não uma atestação de que existia quando
alguém olhou.

Camada 05 Assurance & Continuous Compliance ·
[Leia o padrão Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry)

## Padrão: Runtime Guardrail

Filtre entradas e saídas no caminho de pedido em tempo real com guardrails que imponham a mesma
Policy Card que CI avaliou, e emita um evento de decisão em cada chamada. O guardrail decide uma
chamada de cada vez; numa violação definida, sinaliza o disjuntor, que retira a autonomia do agente
no seu todo.

Camada 04 Runtime Controls & Observability ·
[Leia o padrão Runtime Guardrail](/patterns/runtime-guardrail)

## Padrão: Kill Switch / Circuit Breaker

Vincule cada agente à sua própria identidade e coloque um disjuntor no limite de chamada de
ferramenta que se ativa numa violação de limiar, uma anomalia ou um puxão manual. A revogação atinge
o âmbito de um agente enquanto a frota continua a funcionar, e o disjuntor é testado num
agendamento, porque um disjuntor não testado não é um controlo.

Camada 04 Runtime Controls & Observability ·
[Leia o padrão Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker)

## Padrão: Incident Pipeline

Conecte a deteção em tempo de execução a um fluxo de trabalho de triagem que classifique a gravidade
e, num evento reportável, redija o relatório e inicie o relógio estatutário. Para sistemas de risco
elevado, codifica os prazos de comunicação do Artigo 73 do Regulamento da IA da UE e o feed de
acompanhamento pós-comercialização do Artigo 72 [5], e mantém o registo de incidente como evidência
legível por máquina.

Camada 05 Assurance & Continuous Compliance ·
[Leia o padrão Incident Pipeline](/patterns/incident-pipeline)

## Padrão: FRIA-as-Code

Modele a avaliação de impacto sobre os direitos fundamentais como dados estruturados, vincule cada
mitigação ao controlo que a implementa, e faça referência cruzada à AIPD para que elementos
partilhados sejam escritos uma vez. A avaliação é armazenada com a entrada do registo e reabre
quando o sistema muda significativamente.

Camada 01 Govern-as-Code / Camada 02 Inventory & Transparency ·
[Leia o padrão FRIA-as-Code](/patterns/fria-as-code)

## Padrão: Framework Crosswalk

Gere o mapeamento de controlos para cláusulas de framework a partir dos próprios controlos, e use-o
para encontrar lacunas e reutilizar controlos. Cada célula deve resolver para um controlo em
execução e a sua evidência: uma célula de mapeamento sem nada por trás é sinalizada, não contada,
porque cobertura não é controlo.

Camada 01 Govern-as-Code / Camada 05 Assurance & Continuous Compliance ·
[Leia o padrão Framework Crosswalk](/patterns/framework-crosswalk)

## Padrão: Machine-Readable Evidence (OSCAL)

Emita resultados de controlo como artefatos OSCAL component-definition e assessment-results,
construindo sobre as camadas nativa de controlo, implementação e avaliação antes de qualquer
extensão específica de IA. A evidência torna-se consultável, comparável e reutilizável em
auditorias, e a captura de ecrã deixa de ser um artefato de evidência.

Camada 05 Assurance & Continuous Compliance ·
[Leia o padrão Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal)

## Padrão: Agent Identity & Scoped Credentials

Emita a cada agente uma identidade de carga de trabalho distinta com um âmbito declarado, um
proprietário e uma data de expiração, registada no Agent Registry e estabelecida antes de agir.
Proteger o canal para um servidor de ferramentas é necessário mas não é a identidade do agente; a
identidade é o que torna as suas ações atribuíveis e o seu acesso revogável.

Camada 04 Runtime Controls & Observability ·
[Leia o padrão Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials)

## Padrão: Human-in-the-loop Gate

Classifique as ações de um agente por consequência e mantenha a classe de alta consequência atrás de
um aprovador humano nomeado com contexto suficiente para decidir, enquanto a classe rotineira
permanece autónoma sob guardrails. O aprovador, o contexto e a decisão são registados como evidência
de supervisão no ponto de ação.

Camada 04 Runtime Controls & Observability ·
[Leia o padrão Human-in-the-loop Gate](/patterns/human-in-the-loop-gate)

## Padrão: Shadow-AI Discovery

Digitalize os locais onde a IA aparece (fornecedores de identidade, contas na nuvem, saída de rede,
repositórios de código, integrações SaaS) para modelos e agentes que não têm entrada no registo.
Cada desconhecido é registado como não reclamado e atribuído a um proprietário para o reclamar, ou
escalado, para que o inventário convirja no que está realmente em execução.

Camada 02 Inventory & Transparency ·
[Leia o padrão Shadow-AI Discovery](/patterns/shadow-ai-discovery)

## Padrão: Vendor / Model Due-Diligence Gate

Controle a IA comprada e apenas por API numa avaliação de due-diligence estruturada antes de chegar
à produção: as avaliações e documentação do prestador, fluxos de dados, os âmbitos que concede,
compromissos de comunicação de incidentes e direitos de auditoria. Onde não conseguir verificar um
controlo, o registo diz-o e a integração é limitada em vez disso.

Camada 02 Inventory & Transparency / Camada 05 Assurance & Continuous Compliance ·
[Leia o padrão Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate)

## Padrão: Use-Case Intake & Risk Tiering

Encaminhe cada caso de uso de IA proposto, construído ou comprado, através de uma entrada única que
escreve um registo de caso de uso estruturado, o filtra contra práticas proibidas e a escada de
risco do Regulamento da IA da UE, e calcula um nível interno a partir de campos de perfil
declarados. O nível ativa as avaliações, evals e aprovações que o sistema deve ultrapassar, e o
registo torna-se a sua entrada no registo.

Camada 01 Govern-as-Code / Camada 02 Inventory & Transparency ·
[Leia o padrão Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering)

## Padrão: AI Threat Model

Modele ameaças para cada sistema de IA na revisão de design como um ficheiro de dados versionado:
STRIDE por elemento de fluxo de dados, estendido com os ataques específicos de IA que MITRE ATLAS,
NIST AI 100-2 e as listas OWASP catalogam. Cada ameaça acima da tolerância resolve para uma
mitigação e para o teste que a prova, e a revisão de design falha enquanto uma não o fizer.

Camada 01 Govern-as-Code / Camada 03 Evals & Red Teaming as Evidence ·
[Leia o padrão AI Threat Model](/patterns/ai-threat-model)

## Padrão: Training-Data Rights Ledger

Mantenha uma linha de registo por fonte de treino: canal de aquisição, licença ou base legal, a
verificação de reserva de direitos com o seu método e data, e os usos permitidos. Unida à linhagem,
o registo nomeia os modelos que cada fonte treinou, para que uma retirada, um pedido de apagamento
ou uma ordem atinja apenas os modelos afetados.

Camada 02 Inventory & Transparency ·
[Leia o padrão Training-Data Rights Ledger](/patterns/training-data-rights-ledger)

## Padrão: Dataset Admission Gate

Deixe uma tarefa de treino, avaliação ou recuperação ler uma versão de conjunto de dados apenas se
um registo de admissão assinado permitir esse uso, após verificações de direitos, qualidade,
representatividade, enviesamento e integridade. A verificação é política como código no tempo de
leitura, para que um campo em falta falhe a execução em vez de uma revisão.

Camada 01 Govern-as-Code / Camada 02 Inventory & Transparency ·
[Leia o padrão Dataset Admission Gate](/patterns/dataset-admission-gate)

## Padrão: Fairness Eval Suite

Versiona una suite de equidad con el modelo: métricas de grupo e interseccionales con intervalos de
confianza, un resultado de «datos insuficientes» para celdas pequeñas, un escaneo de proxy y una
prueba de cambio contrafáctico, juzgados contra una política fijada antes de la ejecución. Falla la
compilación cuando la política no se cumple y se ejecuta de nuevo en decisiones en vivo.

Capa 03 Evals & Red Teaming as Evidence ·
[Lee el patrón Fairness Eval Suite](/patterns/fairness-eval-suite)

## Patrón: Explanation Artefact

Escribe un registro de explicación por decisión consecuente en el momento de la decisión, con la
versión del modelo, el método y la línea de base, códigos de razón extraídos de factores puntuados y
la ruta de contestación fijada. Prueba las explicaciones para fidelidad y responde a cada deber de
explicación desde el mismo registro.

Capa 04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Explanation Artefact](/patterns/explanation-artefact)

## Patrón: Model Artefact Integrity

Firma un manifiesto de cada archivo de modelo en la compilación, adjunta la procedencia de
compilación, prefiere formatos de serialización que no puedan ejecutar código y escanea el resto, y
haz que cada tiempo de ejecución verifique la firma, los resúmenes y la procedencia contra la
entrada del registro antes de cargar los pesos.

Capa 02 Inventory & Transparency / Capa 04 Runtime Controls & Observability ·
[Lee el patrón Model Artefact Integrity](/patterns/model-artefact-integrity)

## Patrón: Claims Substantiation Gate

Registra cada afirmación pública sobre la precisión, equidad o capacidad de un sistema de IA con la
ejecución de eval, población y fecha que la respaldan. La publicación se bloquea sin evidencia en
vivo, y cada lanzamiento vuelve a ejecutar las evals citadas y marca cualquier afirmación que la
nueva versión ya no respalda.

Capa 05 Assurance & Continuous Compliance / Capa 03 Evals & Red Teaming as Evidence ·
[Lee el patrón Claims Substantiation Gate](/patterns/claims-substantiation-gate)
## Patrón: Decision Notice & Contest Path

Cuando un sistema de IA toma o conforma una decisión sobre una persona, envía un aviso generado a
partir del registro de decisión que da las razones principales y dice cómo contestar, y encamina
cada contestación a un revisor con la autoridad y la información para cambiar el resultado. El
aviso, la contestación y el resultado de la revisión son registros, por lo que el derecho a
contestar se evidencia decisión por decisión.

Capa 04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Decision Notice & Contest Path](/patterns/decision-notice-contest-path)

## Patrón: Rights Requests Against Models

Encamina cada solicitud de titular de datos a cada lugar donde los datos de la persona se encuentran
en un sistema de IA, desde sistemas de origen e índices de recuperación hasta registros, conjuntos
de eval y, donde el modelo no es anónimo, los pesos. Cada ubicación tiene una respuesta preacordada,
desde eliminación hasta reentrenamiento programado, y la solicitud se cierra con un registro de
cumplimiento que data la brecha restante.

Capa 02 Inventory & Transparency / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Rights Requests Against Models](/patterns/rights-requests-against-models)

## Patrón: Sanctioned AI Gateway

Pon herramientas de IA aprobadas y API de modelos detrás de un inicio de sesión único y una puerta
de enlace que aplique la política de uso aceptable como código: reglas de clase de datos, redacción
o bloqueo, un evento de decisión por llamada y acceso condicionado a una atestación actual. La ruta
sancionada se construye para ser la más fácil, y el descubrimiento encuentra lo que la rodea.

Capa 04 Runtime Controls & Observability / Capa 02 Inventory & Transparency ·
[Lee el patrón Sanctioned AI Gateway](/patterns/sanctioned-ai-gateway)

## Patrón: Staged Rollout with Rollback Criteria

Lleva cada cambio de modelo, prompt, corpus o versión de proveedor a producción a través de etapas
de sombra, piloto y canario, con criterios de reversión registrados antes de que comience cada etapa
y evaluados por la tubería. Las versiones se fijan en el registro y la ruta de vuelta se prueba
antes de que alguien dependa de ella.

Capa 04 Runtime Controls & Observability ·
[Lee el patrón Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria)

## Patrón: Drift & Fairness Monitor

Vigila un sistema desplegado para entrada, etiqueta, concepto, tubería, modelo de proveedor y cambio
de uso, y para calidad y equidad por grupo. Cada señal tiene un umbral, un propietario y una
consecuencia preacordada, desde un problema hasta un disyuntor activado, y cada verificación escribe
un registro de evidencia.

Capa 04 Runtime Controls & Observability / Capa 05 Assurance & Continuous Compliance ·
[Lee el patrón Drift & Fairness Monitor](/patterns/drift-fairness-monitor)

## Patrón: Downstream Use Register

Escribe los usos previstos y prohibidos de un sistema como una Policy Card, registra cada consumidor
de sus salidas contra su entrada de registro con la re-prueba que autorizó ese uso, e imprime
procedencia y advertencias en las salidas. El uso secundario se convierte en una decisión en lugar
de un descubrimiento, y un cambio o jubilación puede llegar a todos los que afecta.

Capa 02 Inventory & Transparency / Capa 01 Govern-as-Code ·
[Lee el patrón Downstream Use Register](/patterns/downstream-use-register)

## Patrón: Disclosure & Notification Pipeline

Genera divulgaciones (avisos de interacción con IA, etiquetas, la página de transparencia y ficha de
sistema, avisos a trabajadores y personas afectadas) y notificaciones activadas (a proveedores,
autoridades, clientes y el público) desde el registro y plantillas versionadas, cada una en su
reloj. Cada aviso enviado se registra con su audiencia, versión de plantilla e marca de tiempo.

Capa 05 Assurance & Continuous Compliance / Capa 02 Inventory & Transparency ·
[Lee el patrón Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline)

## Patrón: Deactivation, Localisation & Retirement Runbook

Mantén un runbook practicado por sistema para degradarlo, apagarlo por jurisdicción y jubilarlo:
umbrales nombrados y disparadores legales, un propietario de decisión, evidencia congelada primero,
modos graduados cortos de apagado, interruptores regionales y pasos de jubilación que terminan en
una entrada de registro jubilada y sin copia en ejecución.

Capa 04 Runtime Controls & Observability / Capa 02 Inventory & Transparency ·
[Lee el patrón Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook)

## O que pode fazer esta semana

1. **Encuentra tu capa más vacía.** Lista los controles que ejecutas por capa y elige el patrón que
   llena la capa con menos.
2. **Adopta un patrón completo.** Construye la Solución de un patrón tal como está escrita,
   incluyendo el registro que emite, antes de adaptarla: un patrón sin su artefacto es una
   diapositiva.
3. **Comienza desde un fallo que has visto.** Para tu sistema de mayor riesgo, elige el patrón cuyo
   Problema nombra un fallo que ya has tenido, no el que es más fácil de construir.
4. **Traza una línea Maps to.** Toma un patrón que ejecutas y verifica que cada artículo, cláusula e
   id de amenaza en su línea Maps to apunte a un artefacto que puedas mostrar hoy.
5. **Escribe el patrón que te falta.** Si ejecutas un control que ningún patrón describe, esbózalo
   en la plantilla y propónlo: el catálogo está abierto a contribuciones.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[4] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal; prEN 18286 entered public enquiry on 30 Oct 2025; page last updated 2026-08-03). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[5] Regulation (EU) 2024/1689 (AI Act), Art. 72 (post-market monitoring) and Art. 73 (reporting of serious incidents). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
