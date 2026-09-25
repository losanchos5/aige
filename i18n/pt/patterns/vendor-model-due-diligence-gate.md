---
lang: pt
source: bok/patterns/vendor-model-due-diligence-gate.md
sourceHash: "61ed551de3df62c18170990d3246c6031fd5fb0989f823ca33dd889e35bd71f9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: vendor-model-due-diligence-gate
title: "Vendor / Model Due-Diligence Gate"
layer: 2
secondaryLayer: 5
order: 17
summary: "Um portão de diligência devida estruturado para IA comprada e apenas API que regista o que pode e não pode verificar antes do sistema chegar à produção."
---

# Padrão: Vendor / Model Due-Diligence Gate

**Resumo:** Portão da compra ou integração de um sistema de IA de terceiros (SaaS com um LLM
incorporado, um modelo de fundação apenas API, um agente de um fornecedor) numa avaliação de
diligência devida estruturada, para que um modelo que não possui ainda entre através de um controlo
que regista o que pode e não pode verificar sobre ele. Quando não possui o modelo, este portão é o
que substitui o red team que não consegue executar.

## Objetivos
Traga IA comprada e apenas API sob a mesma disciplina de registo e garantia que sistemas que
constrói, e torne os limites da sua verificação explícitos em vez de assumidos.

## Utilizadores-alvo
Engenheiro de governação da IA, compras, engenheiro de segurança, EPD.

## Partes interessadas afetadas
Responsáveis pela implantação, prestadores de modelos, titulares de dados, auditores, reguladores.

## Princípios relevantes
Regista e limita cada ator antes de agir; começa por um modo de falha ou dano nomeado.

## Contexto
Uma organização que consome muito mais IA do que treina: funcionalidades SaaS com um LLM
incorporado, modelos de fundação alojados alcançados apenas por API, agentes enviados dentro de um
produto de um fornecedor. Os pesos, dados de treino e guardrails internos pertencem a outra pessoa.

## Problema
As partes do stack que assumem que possui o modelo degradam-se quando não possui. Não consegue fazer
red team de pesos que não consegue alcançar, portanto um portão de eval (camada 03) pode apenas
testar o sistema do fornecedor como uma caixa preta na sua fronteira; controlo em tempo de execução
(camada 04) reduz-se aos âmbitos de ferramentas, identidade e tráfego que a integração expõe, não o
comportamento do próprio modelo. Deixada sem governação, a IA comprada torna-se a frota sombra com
um contrato: em produção, não avaliada, e fora do registo.

## Solução
Converte a avaliação de fornecedores numa porta que um sistema de IA adquirido ou integrado deve
ultrapassar antes de chegar à produção, e estrutura a avaliação num modelo em vez de um questionário
ad-hoc; os campos de avaliação de fornecedores do CSIRO Responsible AI Pattern Catalogue são um
ponto de partida utilizável [1]. Avalia, no mínimo: as avaliações próprias do prestador e a
evidência de red-team (o que partilhará e a sua independência); a ficha de modelo, documentação do
fornecedor e qualquer AIBOM que consigas obter; a base legal e fluxos de dados, incluindo se os teus
dados de entrada treinam o modelo deles; os âmbitos da ferramenta e identidade que concederás ao
agente do fornecedor; os compromissos de comunicação de incidentes do prestador; e o direito
contratual de auditoria e de notificação de alteração material. Regista o resultado como uma entrada
de registo com um proprietário e um âmbito, e reabre a porta na renovação ou numa alteração material
do modelo. Ancora a avaliação na ISO/IEC 42001 Anexo A.10 (relações com terceiros e clientes) [2],
na atribuição de deveres do Regulamento da IA da UE ao longo da cadeia de valor (obrigações do
prestador versus obrigações do responsável pela implantação nos Artigos 25, 26 e 27 [3]) e, para
modelos de finalidade geral, na transparência e documentação que o GPAI Code of Practice espera que
os prestadores forneçam [4]. Quando não consegues verificar um controlo, regista que não consegues,
e compensa limitando a integração: âmbitos de privilégio mínimo, avaliações de limite e observação
mais rigorosa em tempo de execução do tráfego que controlas.

> **Exemplo (ilustrativo)** Uma equipa que integra um modelo de fundação apenas por API não consegue
> testar os seus pesos, portanto a porta captura as avaliações publicadas do prestador, restringe o
> modelo a uma identidade de serviço com âmbito sem acesso a dados permanentes, adiciona uma
> avaliação de limite nos prompts próprios da equipa, e arquiva toda a avaliação como entrada de
> registo do sistema, marcada "atestado pelo prestador" quando a equipa se baseou na evidência do
> fornecedor em vez da sua própria.

### Operar: avisos de alteração, reavaliação e contingência

Passar pela porta uma vez prova pouco sobre um sistema que continua a mudar após a assinatura do
contrato. O passo de operação mantém a porta aberta enquanto o sistema funciona.

- **Trata cada aviso de alteração e descontinuação como um evento.** Arquiva cada aviso do prestador
  (uma nova versão do modelo, uma predefinição alterada, uma data de descontinuação, um novo
  sub-processador, novos termos de utilização de dados) contra a entrada de registo, e executa
  novamente a avaliação de limite contra o sistema alterado antes da alteração chegar aos
  utilizadores sempre que o contrato te deixe fixar uma versão. Uma data de descontinuação torna-se
  um marco datado na entrada, com um proprietário para a decisão de migração.
- **Deteta a alteração que ninguém anunciou.** Executa um pequeno conjunto de canário da avaliação
  de limite num calendário contra o ponto final em direto e alerta quando os seus resultados saem da
  sua banda. Uma alteração detetada sem aviso é uma constatação sob o contrato. O MITRE ATLAS
  cataloga a forma adversarial do mesmo risco, um roubo da cadeia de fornecimento, em que um
  componente ganha confiança e depois envia uma atualização maliciosa (`AML.T0109`) [5].
- **Reavalia em acionadores e por nível, não apenas na renovação.** Reabre a porta num calendário
  definido pelo nível de risco e em qualquer acionador: um incidente no prestador ou na tua própria
  implantação, uma alteração de propriedade ou de sub-processadores, uma alteração regulatória, uma
  alteração material do modelo. O NIST AI RMF pede que os riscos de terceiros sejam monitorizados
  regularmente e que os modelos pré-treinados sejam monitorizados como parte da manutenção do
  sistema (MANAGE 3.1 e 3.2) [6].
- **Mantém uma contingência que testaste.** Mantém um modelo alternativo aquecido no arnês de
  avaliação, um processo manual que o pessoal praticou e os modos degradados para os quais o sistema
  consegue recorrer, e testa a comutação com um temporizador em funcionamento. O NIST AI RMF pede
  processos de contingência para falhas em sistemas de terceiros considerados de risco elevado
  (GOVERN 6.2) [7]. A mesma comutação é como um responsável pela implantação cumpre o seu dever de
  monitorizar um sistema de risco elevado com base nas instruções de utilização e de suspender a
  utilização quando apresenta um risco (`Art. 26(5)`) [3]; o
  [Incident Pipeline](/patterns/incident-pipeline) é responsável pela notificação ao prestador.

O lado de continuidade e saída deste passo (interrupções, modelos retirados, migrações forçadas,
saída contratual) é estabelecido no
[capítulo 15](/bok/governing-deployment#when-the-provider-fails-continuity).

> **Exemplo (ilustrativo)** Um prestador anuncia que a versão do modelo por trás de um assistente de
> triagem de reclamações será retirada em 90 dias. O aviso é arquivado na entrada de registo com a
> data como marco; a avaliação de limite executa contra a versão sucessora na mesma semana e mostra
> uma queda em duas métricas de subgrupo; a equipa regista uma decisão de migração com um limiar
> compensador, e um exercício agendado prova que a comutação para a fila manual demora menos de dez
> minutos.

## Consequências
A IA adquirida é inventariada e limitada, e a dependência de evidência fornecida pelo prestador é
explícita em vez de oculta. O custo é real: as camadas 03 e 04 dão menos garantia sobre um modelo
que não possuis, e a porta depende da cooperação do prestador e de termos contratuais que podes não
conseguir totalmente. O passo de operação adiciona um custo permanente: execuções de canário contra
um ponto final em direto, uma alternativa aquecida que deve ser mantida atual, e exercícios que
provam que a contingência ainda funciona.

## Padrões relacionados
[Agent Registry](/patterns/agent-registry); [AIBOM](/patterns/aibom);
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).

**Correspondências:** Regulamento da IA Art. 25 (responsabilidades na cadeia de valor), Art. 26
(deveres do responsável pela implantação), Art. 27 (AIPD), Art. 53 (documentação GPAI) · ISO/IEC
42001 Anexo A.10 · GPAI Code of Practice · NIST AI RMF (Map, Govern) · Camada 02 Inventory &
Transparency / Camada 05 Assurance & Continuous Compliance.

Os rótulos de função seguem o NIST AI RMF [8]. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] Responsible AI Pattern Catalogue (template: summary, objectives, target users, impacted stakeholders, relevant principles, context, problem, solution, consequences; governance/process/product patterns). CSIRO. 2023–2024. https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/ (verified: primary)
[2] ISO/IEC 42001:2023 Annex A.10 (third-party and customer relationships; supplier controls). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act), Arts. 25 (value-chain responsibilities), 26 (deployer obligations, incl. 26(5) monitoring on the basis of the instructions for use, informing the provider and suspending use), 27 (FRIA): allocation of duties between provider and deployer. Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; the Transparency chapter's Model Documentation Form for the documentation providers supply to downstream providers). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[5] MITRE ATLAS data, release v2026.09 (AML.T0109 AI Supply Chain Rug Pull; AML.T0010 AI Supply Chain Compromise). MITRE. 2026-09-15. https://github.com/mitre-atlas/atlas-data/releases/tag/v2026.09 (verified: primary)
[6] NIST AI RMF Playbook, MANAGE (3.1 third-party risks monitored; 3.2 pre-trained models monitored; 2.4 supersede, disengage or deactivate). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/manage/ (verified: primary)
[7] NIST AI RMF Playbook, GOVERN (6.1 third-party risk policies; 6.2 contingency processes for failures in third-party systems deemed high-risk). NIST. 2023. https://airc.nist.gov/airmf-resources/playbook/govern/ (verified: primary)
[8] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
