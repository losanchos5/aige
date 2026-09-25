---
lang: pt
source: bok/patterns/adversarial-red-team-suite.md
sourceHash: "c4d084fd1712d0e8721e2a1ba027323a2a5cdcd94936434061e34b761a4d8b51"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: adversarial-red-team-suite
title: Adversarial Red-Team Suite
layer: 3
order: 3
summary: "Uma suite adversarial versionada construída a partir de uma taxonomia de ameaças, executada em CI ou conforme agendado, cujos resultados são triados, registados e realimentados como testes."
---

# Padrão: Adversarial Red-Team Suite

**Resumo:** Mantém uma suite de testes adversarial versionada, construída a partir de uma taxonomia
de ameaças e executada em CI ou conforme agendado, cujos resultados são triados em correções ou
riscos aceites, registados como evidência e realimentados na suite. Quando um Eval Gate prova que um
limiar ainda se mantém, a suite de red team é o adversário permanente que continua a encontrar as
entradas que o limiar nunca antecipou.

## Objetivos
Transforma os testes adversarial de um exercício único numa atividade mantida, versionada, que
descobre modos de falha antes de um atacante o fazer e deixa um registo triado e auditável de cada
resultado.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de segurança, engenheiro de ML, responsável pela equipa
de red team.

## Partes interessadas afetadas
Proprietários de modelos, utilizadores expostos ao sistema, responsáveis pela resposta a incidentes,
auditores, reguladores.

## Princípios relevantes
Começa por um modo de falha ou dano nomeado; dá poder a cada controlo.

## Contexto
Um modelo ou agente cuja exposição cresce à medida que ganha ferramentas, instruções e alcance, numa
organização que já executa um Eval Gate para regressão e quer um adversário permanente em vez de um
único teste de penetração pré-lançamento.

## Problema
Um red team único fica desatualizado no momento em que o sistema muda, e os seus resultados, um
conjunto de jailbreaks, não deixam qualquer vestígio de que foram corrigidos ou aceites. Sem uma
suite versionada e um registo de triagem, o mesmo ataque é redescoberto a cada trimestre e ninguém
consegue provar quais os resultados que foram encerrados.

## Solução
Constrói a suite a partir de uma taxonomia de ameaças em vez de intuição: extrai técnicas do MITRE
ATLAS's adversarial tactics and techniques for AI systems [1] e das classes de ataque agentic no
OWASP Top 10 for Agentic Applications [2], para que cada teste rastreie uma técnica nomeada.
Versiona a suite juntamente com o modelo e executa-a em CI ou conforme agendado contra a versão
registada. Encaminha cada resultado através de triagem (corrigir ou aceitar com uma justificação
registada e um proprietário) e regista o resultado como um registo de evidência estruturado contra a
entrada do registo. Realimenta cada resultado confirmado na suite como um teste de regressão, para
que um ataque encerrado permaneça encerrado. A suite complementa o Eval Gate: o gate impõe um limiar
em cada lançamento, a suite é o adversário que gera o próximo.

> **Exemplo (ilustrativo)** Uma suite de red team para um assistente de atendimento ao cliente
> executa um conjunto versionado de casos de injeção de prompts e abuso de ferramentas extraídos do
> ATLAS e das classes agentic do OWASP; um novo resultado de exfiltração de ferramentas é triado,
> corrigido e adicionado à suite, para que o próximo lançamento o tenha de passar.

### Do modelo de ameaça ao plano de testes

Uma suite construída a partir de uma taxonomia ainda precisa de uma razão para cada caso. Essa razão
é o modelo de ameaça do sistema conforme implantado, e o passo que transforma um no outro é
documentado, para que um revisor possa ver por que a suite contém o que contém e o que deixa de
fora.

1. **Decompõe o sistema.** Desenha os fluxos de dados conforme executados: utilizadores, a
   aplicação, recuperação, o modelo, as ferramentas e as suas credenciais, memória e cada consumidor
   a jusante de resultados. Marca cada limite de confiança e marca quais os componentes que possuis
   e quais um prestador executa.
2. **Enumera ameaças por elemento, por id.** Percorre cada elemento contra os catálogos específicos
   de IA: o OWASP Top 10 for LLM Applications 2026 para o modelo como componente [3], o OWASP Top 10
   for Agentic Applications para ferramentas, memória e delegação [2], técnicas MITRE ATLAS para o
   caminho do atacante [1] e a taxonomia de aprendizagem automática adversarial do NIST para ataques
   em modelos preditivos e generativos, como evasão, envenenamento e ataques de privacidade [4]. O
   perfil de desenvolvimento seguro do NIST para IA generativa pede exatamente isto: modelação de
   risco que inclua tipos de vulnerabilidade e ameaça específicos de IA (`PW.1.1`) [5]. Regista cada
   ameaça com o seu id externo, para que o modelo leia `LLM01:2026` ou `AML.T0051`, não "risco de
   injeção".
3. **Nomeia o controlo e o teste que o prova.** Para cada ameaça no âmbito, escreve o controlo
   esperado para a parar e o teste que falharia se o controlo não funcionasse. O teste torna-se uma
   entrada da suite no plano de testes do lançamento, que valida contra
   [`test-plan.v1.json`](/schemas/test-plan.v1.json): um id de suite versionado, a categoria
   (`adversarial`, `security`, `privacy`), a métrica, um limiar fixado antes dos testes, o modo de
   falha que guarda e se uma falha bloqueia o lançamento.
4. **Marca cada caso com os seus ids de ameaça.** Um caso carrega os ids das ameaças que exercita, e
   um resultado herda-os, para que um resultado rastreie da técnica ao controlo à avaliação que
   agora o guarda, e um relatório de cobertura possa listar as ameaças no âmbito que nenhum caso
   ainda exercita.
5. **Regista o que está fora do âmbito e por quê.** Uma ameaça que o sistema não consegue enfrentar
   (sem ferramentas, sem memória, sem dados pessoais) é encerrada com uma razão; uma ameaça que não
   consegues testar (os pesos de um prestador) é encaminhada para o
   [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) como evidência
   atestada pelo prestador. Re-executa o passo quando os fluxos de dados mudam: uma nova ferramenta,
   um novo corpus, um novo modelo.

A [ponte de ameaça](/resources/threats) contém o resultado dos passos 2 e 3 como dados abertos: cada
linha leva um id de ameaça externo aos padrões que o controlam, uma avaliação de exemplo que o testa
e as obrigações que a evidência ajuda a satisfazer.

```yaml
# one entry of the test plan's `suites`, derived from a threat (illustrative)
suite_id: indirect-injection.v4
category: adversarial
metric: attack success rate on planted instructions in retrieved documents
threshold: "<= 0.02"
direction: lower_is_better
failure_mode: >-
  agent follows instructions found in retrieved content
  (LLM01:2026, ASI01, AML.T0051.001, NISTAML.015)
blocking: true
```

## Consequências
A cobertura adversarial cresce ao longo do tempo em vez de repor-se em cada lançamento, e o registo
de triagem mostra o que foi encontrado, corrigido ou aceite. O custo é manter a taxonomia e a suite,
a computação para executar casos adversarial frequentemente e a disciplina de triar cada resultado
em vez de deixá-lo caducar. O passo do modelo de ameaça acrescenta a sua própria manutenção: o
modelo fica obsoleto no dia em que uma ferramenta ou um corpus é adicionado, por isso tem de ser
re-executado na mudança, não uma vez por ano.

## Padrões relacionados
[Eval Gate in CI](/patterns/eval-gate-in-ci); [Runtime Guardrail](/patterns/runtime-guardrail);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Incident Pipeline](/patterns/incident-pipeline);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondências:** Regulamento da IA Art. 9, Art. 15, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI
RMF (Measure) · OWASP Agentic ASI01/ASI02 · Layer 03 Evals & Red Teaming as Evidence.

Os IDs de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [2] e os rótulos de função o
NIST AI RMF [6]. Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] MITRE ATLAS: adversarial tactics and techniques knowledge base for AI systems (incl. agents). MITRE. 2026. https://atlas.mitre.org/ (verified: primary)
[2] Top 10 for Agentic Applications 2026 (ASI IDs). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[3] OWASP GenAI LLM Top 10 2026 (LLM01 Prompt Injection to LLM10 Improper Output Handling; published 3 Aug 2026; canonical Markdown in github.com/GenAI-Security-Project/GenAI-LLM-Top10, 2026/final). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (predictive and generative AI attack classes with NISTAML identifiers). NIST. 2025-03-24. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[5] NIST SP 800-218A, Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile (recommendation R1 on SSDF 1.1 task PW.1.1: include AI model-specific vulnerability and threat types in risk modelling). NIST. 2024-07. https://csrc.nist.gov/pubs/sp/800/218/a/final (verified: primary)
[6] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
