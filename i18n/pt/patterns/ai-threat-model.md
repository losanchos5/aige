---
lang: pt
source: bok/patterns/ai-threat-model.md
sourceHash: "c6e202cafb0a952d2c1905a3058a54e99ecf670f49c955b26240308a2cc50482"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: ai-threat-model
title: AI Threat Model
layer: 1
secondaryLayer: 3
order: 19
summary: "Um modelo de ameaça versionado por sistema de IA: STRIDE estendido com ataques específicos de IA, onde cada ameaça se resolve numa mitigação e no teste que a prova."
---

# Padrão: AI Threat Model

**Resumo:** Modele a ameaça de cada sistema de IA na revisão de conceção como um ficheiro de dados
versionado, não um slide: decomponha os seus fluxos de dados, enumere ameaças por elemento com uma
lista de verificação clássica como STRIDE estendido com os ataques específicos de IA que os
catálogos MITRE ATLAS, NIST AI 100-2 e as listas OWASP catalogam, e exija que cada ameaça acima da
tolerância se resolva numa mitigação e no teste que prova que a mitigação funciona. O modelo de
ameaça decide o que a suite de testes de segurança, os guardrails e os controlos da cadeia de
fornecimento cobrem, e é reaberto sempre que o sistema ou o catálogo de ameaças muda.

## Objetivos
Transforme "o que pode correr mal?" numa cadeia rastreável de ameaça, mitigação e teste, para que os
controlos de segurança de um sistema de IA sejam escolhidos a partir da sua conceção em vez de por
hábito, e um auditor possa ver que cada classe de ataque conhecida foi considerada e foi tratada ou
aceite por um proprietário nomeado.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de segurança, engenheiro de ML, equipa de plataforma.

## Partes interessadas afetadas
Utilizadores e pessoas afetadas pelos resultados do sistema, titulares de dados cujos dados o
treinaram ou alimentam, proprietários de modelos, a função CISO, auditores e autoridades de
fiscalização do mercado.

## Princípios relevantes
Comece por um modo de falha ou dano nomeado; construa o controlo no ponto mais cedo em que pode
bloquear; dê dentes a cada controlo.

## Contexto
Uma revisão de conceção para um sistema que treina ou ajusta em dados externos, recupera documentos,
chama ferramentas ou serve um modelo através de uma API. As equipas de segurança já modelam ameaças
de software, frequentemente com STRIDE (falsificação, adulteração, repúdio, divulgação de
informações, negação de serviço, elevação de privilégio) como parte de um ciclo de vida de
desenvolvimento seguro [1]. A IA adiciona superfície de ataque que essas seis palavras não nomeiam:
dados de treino, componentes pré-treinados, prompts, corpora de recuperação e a própria API de
inferência. A orientação da Microsoft para sistemas de IA e aprendizagem automática coloca a mudança
de âmbito claramente: "Training Data stores and the systems that host them are part of your Threat
Modeling scope" [2].

## Problema
As ameaças que mais importam para um sistema de IA são as que uma revisão genérica não pergunta.

- **Forças.** A segurança quer profundidade, o produto quer velocidade. Os catálogos de ataques de
  IA são grandes e mudam: o MITRE ATLAS enviou a sua versão 2026.09 em 15 de setembro de 2026 [3].
  Um modelo de ameaça escrito como um documento fica desatualizado na próxima mudança. As equipas de
  testes de segurança testam o que pensam, o que nem sempre é o que a conceção expõe.
- **Modo de falha.** A suite de testes de segurança e os guardrails são escolhidos por hábito. As
  ameaças específicas do sistema (um corpus envenenado, pesos adulterados, extração através da API,
  uma ferramenta com mais âmbito do que a tarefa precisa) não têm proprietário nem teste. Após um
  incidente, ninguém pode mostrar que a ameaça foi alguma vez considerada.

## Solução
Mantenha o modelo de ameaça junto ao registo de conceção, como dados, e torne a revisão de conceção
falhar quando está incompleta.

1. **Âmbito a partir da conceção.** Decomponha os fluxos de dados (fontes de dados, pipeline de
   treino, artefato de modelo e registo, corpus de recuperação, prompts, ferramentas, API de
   inferência, consumidores a jusante) e marque os limites de confiança. Os armazéns de dados de
   treino e o registo de modelos estão no âmbito [2].
2. **Faça as quatro perguntas.** O Threat Modeling Manifesto enquadra o trabalho como "What are we
   working on?", "What can go wrong?", "What are we going to do about it?" e "Did we do a good
   enough job?" [4]. O primeiro é o diagrama de fluxo de dados; os dois seguintes são as linhas
   abaixo; o último é a porta.
3. **Enumere por elemento, depois estenda.** Percorra cada elemento com STRIDE [1], depois adicione
   as classes específicas de IA: os ataques de evasão, envenenamento, privacidade e uso indevido do
   NIST AI 100-2 E2025 [5], as técnicas do MITRE ATLAS [3], e o OWASP Top 10 for LLM Applications
   2026 [6] e for Agentic Applications 2026 [7] para sistemas generativos e de agentes. A tabela é
   uma lista de verificação inicial, não uma completa.

   | Categoria STRIDE | Leitura específica de IA | IDs de catálogo (exemplos) |
   |---|---|---|
   | Falsificação | Uma origem de modelo ou conjunto de dados forjada; um agente ou servidor de ferramenta personificado | `AML.T0010.003`; `ASI03`, `ASI04` |
   | Adulteração | Dados de treino envenenados; um modelo manipulado; instruções injetadas através de conteúdo recuperado | `AML.T0020`, `AML.T0018`, `AML.T0051.001`; `LLM05:2026`, `LLM01:2026` |
   | Repúdio | Uma ação de agente sem identidade atribuível; uma decisão sem registo | `ASI03` |
   | Divulgação de informações | Inferência de associação, inversão de modelo ou extração de modelo através da API de inferência | `AML.T0024.000`, `AML.T0024.001`, `AML.T0024.002` |
   | Negação de serviço | Consumo ilimitado de tokens, computação ou chamadas de ferramentas | `LLM06:2026` |
   | Elevação de privilégio | Agência excessiva ou uso indevido de ferramentas; um ficheiro de modelo que executa código ao carregar | `LLM03:2026`, `ASI02`; `AML.T0011.000` |

4. **Classifique e decida.** Classifique cada ameaça nas escalas de probabilidade e severidade da
   organização e decida: mitigar, evitar, transferir ou aceitar. Uma ameaça aceite torna-se uma
   entrada de registo de risco com um aceitador nomeado; uma mitigada nomeia os seus controlos.
5. **Feche o ciclo com um teste.** Cada ameaça mitigada carrega o id do teste que prova a mitigação:
   um caso de teste de segurança, uma avaliação, uma verificação de pipeline (uma assinatura ou
   verificação de hash), um teste de guardrail. A revisão de conceção é uma porta: falha enquanto
   qualquer ameaça acima da tolerância não tem mitigação ou teste.
6. **Reabra em gatilhos.** Uma nova ferramenta, fonte de dados, modelo ou exposição, um incidente ou
   quase falha, ou uma técnica relevante nova nos catálogos reabre o modelo. Como o ficheiro é
   versionado, a reabertura é um diff com um revisor.

Para sistemas de alto risco sob o Regulamento da IA da UE, o resultado é também evidência de
`Art. 15(5)`: resiliência contra tentativas de terceiros não autorizados de explorar
vulnerabilidades, com soluções técnicas que incluem, quando apropriado, medidas contra envenenamento
de dados, envenenamento de modelo através de "componentes pré-treinados utilizados no treino",
exemplos adversariais, ataques de confidencialidade e falhas de modelo [8]. Os prestadores de
modelos de finalidade geral com risco sistémico devem garantir "um nível adequado de proteção de
cibersegurança" para o modelo e a sua infraestrutura física (`Art. 55(1)(d)`) [8]. O AI RMF exige
que a segurança e resiliência sejam "avaliadas e documentadas" (MEASURE 2.7) [9].

Entrada de ameaça ilustrativa, uma linha do ficheiro de dados do modelo:

```json
{
  "threat_id": "TM-support-rag-07",
  "system": "support-rag@2026-09-20",
  "element": "retrieval corpus ingestion",
  "stride": "tampering",
  "ai_class": "indirect prompt injection through retrieved documents",
  "catalogue": ["AML.T0051.001", "LLM01:2026"],
  "likelihood": "likely",
  "severity": "major",
  "decision": "mitigate",
  "mitigations": ["source allow-list at ingestion", "input guardrail on retrieved chunks",
                  "read-only tool scope for the answering step"],
  "tests": ["redteam.planted-instructions.v3", "canary-docs.never-retrieved.v1"],
  "owner": "team-support-platform",
  "reviewed": "2026-09-22"
}
```

> **Exemplo (ilustrativo)** A primeira revisão de conceção de um assistente de suporte listou
> injeção de prompts e parou aí. Percorrer o diagrama de fluxo de dados elemento por elemento
> adicionou três linhas: documentos de um wiki de parceiro entraram no corpus sem revisão, os pesos
> do modelo foram puxados de um hub público por tag em vez de por digest, e a ferramenta de ticket
> podia fechar qualquer ticket, não apenas do solicitante. Cada linha obteve um controlo e um teste:
> uma lista de permissões de ingestão com casos de instrução plantada, fixação de digest com uma
> verificação de pipeline, e uma ferramenta com âmbito com um teste de negação. A porta de revisão
> de conceção agora falha em qualquer linha de ameaça cuja lista `tests` está vazia.

## Consequências
A suite de testes de segurança, os guardrails e as verificações da cadeia de fornecimento rastreiam
até ameaças nomeadas, e o caso de segurança para um lançamento é uma consulta sobre o ficheiro. Os
custos: a modelagem de ameaças leva tempo qualificado; os catálogos mudam mensalmente, portanto
alguém é proprietário da revisão delta; e um modelo de ameaça é apenas tão bom quanto o diagrama de
fluxo de dados, que se desvia a menos que o registo de conceção seja mantido atual.

## Padrões relacionados
[Adversarial Red-Team Suite](/patterns/adversarial-red-team-suite);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Model Artefact Integrity](/patterns/model-artefact-integrity);
[Dataset Admission Gate](/patterns/dataset-admission-gate);
[Agent Identity & Scoped Credentials](/patterns/agent-identity-scoped-credentials);
[Use-Case Intake & Risk Tiering](/patterns/use-case-intake-risk-tiering).

**Correspondências:** Regulamento da IA Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.2, A.6.2.4 ·
NIST AI RMF (Map 5.1; Measure 2.7) · OWASP LLM01:2026, LLM05:2026 · OWASP Agentic ASI02/ASI03/ASI04
· MITRE ATLAS · Camada 01 Govern-as-Code / Camada 03 Evals & Red Teaming as Evidence.

Os IDs de ameaça seguem o OWASP Top 10 for LLM Applications 2026 [6] e for Agentic Applications 2026
[7] e MITRE ATLAS [3]; os rótulos de função e subcategoria seguem o NIST AI RMF [9]; os IDs ISO/IEC
42001 Annex A seguem um crosswalk publicado, não o texto do padrão [10]. Os mapeamentos são
ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Threats: Microsoft Threat Modeling Tool (STRIDE model: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege; a core element of the Security Development Lifecycle). Microsoft Learn. 2017-08-17. https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats (verified: primary)
[2] Threat Modeling AI/ML Systems and Dependencies (A. Marshall, J. Parikh, E. Kiciman, R. Shankar Siva Kumar; supplements SDL threat modelling; "Training Data stores and the systems that host them are part of your Threat Modeling scope"). Microsoft Learn. 2019-11 (page dated 2025-03-12). https://learn.microsoft.com/en-us/security/engineering/threat-modeling-aiml (verified: primary)
[3] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; AML.T0018 Manipulate AI Model; AML.T0020 Training Data Poisoning; AML.T0024.000 Infer Training Data Membership, .001 Invert AI Model, .002 Extract AI Model; AML.T0051.001 LLM Prompt Injection: Indirect). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[4] Threat Modeling Manifesto (definition: "analyzing representations of a system to highlight concerns about security and privacy characteristics"; four key questions). Threat Modeling Manifesto working group. n.d. (accessed 2026-09-24). https://www.threatmodelingmanifesto.org/ (verified: primary)
[5] NIST AI 100-2 E2025, Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations (attack classes incl. evasion, poisoning, privacy compromises and misuse enablement). NIST. 2025-03. https://csrc.nist.gov/pubs/ai/100/2/e2025/final (verified: primary)
[6] OWASP Top 10 for LLM Applications 2026 (LLM01:2026 Prompt Injection, LLM03 Excessive Agency, LLM04 Supply Chain, LLM05 Data and Model Poisoning, LLM06 Unbounded Consumption). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[7] Top 10 for Agentic Applications 2026 (ASI01 to ASI10; ASI02 Tool Misuse and Exploitation, ASI03 Identity and Privilege Abuse, ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[8] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities (data poisoning, model poisoning through pre-trained components, adversarial examples or model evasion, confidentiality attacks, model flaws); Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 5.1 likelihood and magnitude of each identified impact; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.2 AI system requirements and specification, B.6.2.4 AI system verification and validation; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
