---
lang: pt
source: bok/patterns/model-artefact-integrity.md
sourceHash: "5b9a3545c2d0b0a830570ab4994d1f61d4c0b82233b606881ffb4158b7cdeb49"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-artefact-integrity
title: Model Artefact Integrity
layer: 2
secondaryLayer: 4
order: 24
summary: "Assine cada artefato de modelo na compilação, anexe a proveniência da compilação, recuse formatos que executem código e verifique a assinatura e os resumos antes de um runtime carregá-lo."
---

# Patrón: Model Artefact Integrity

**Resumo:** Trate os pesos do modelo e seus ficheiros acompanhantes como artefatos da cadeia de
fornecimento. Assine um manifesto de cada ficheiro e seu resumo quando a compilação os produz, anexe
a proveniência da compilação que diz o que os construiu a partir de quais entradas, prefira formatos
de serialização que não possam executar código e digitalize os que conseguem, e faça cada runtime
verificar a assinatura, os resumos e a proveniência contra a entrada do registo antes de carregar um
modelo. A verificação escreve um registo de evidência, portanto "que bytes executaram e quem os
produziu?" tem uma resposta.

## Objetivos
Garanta que o modelo que um serviço carrega é o modelo que o pipeline construiu, avaliou e registou,
de um produtor conhecido, e que carregá-lo não pode executar o código de um atacante.

## Utilizadores-alvo
Equipa de plataforma ML, engenheiro de segurança, engenheiro de governação da IA, engenheiro de
MLOps.

## Partes interessadas afetadas
Utilizadores e pessoas afetadas pelos resultados do sistema, proprietários de modelos, responsáveis
pela implantação a jusante, auditores e autoridades de fiscalização do mercado.

## Princípios relevantes
Registe e delimite cada ator antes de agir; construa o controlo no ponto mais inicial em que
consegue bloquear; instrumente a compilação para produzir sua própria prova.

## Contexto
Os modelos movem-se de trabalhos de treino para registos para clusters de serviço, são ajustados a
partir de bases obtidas de hubs públicos e são copiados entre ambientes e regiões. Os ficheiros são
binários grandes que ninguém lê. Os formatos comuns não são inertes: a documentação do Python avisa
que "O módulo pickle não é seguro. Apenas desserialize dados em que confia." [1], e a Hugging Face
descreve "ataques perigosos de execução arbitrária de código" que podem ser executados quando um
ficheiro pickle é carregado [2].

## Problema
O pipeline avalia um modelo e a produção pode carregar outro.

- **Forças.** As equipas obtêm pesos por nome ou etiqueta, e uma etiqueta pode ser movida. A
  digitalização ajuda, mas, como a Hugging Face diz sobre seu próprio scanner de importação pickle,
  não é "100% à prova de falhas" [2]. O Regulamento da IA da UE espera que sistemas de risco elevado
  resistam a ataques em "componentes pré-treinados utilizados no treino (envenenamento de modelo)"
  (`Art. 15(5)`) [3]. O MITRE ATLAS cataloga compromisso da cadeia de fornecimento do próprio modelo
  (`AML.T0010.003`) e execução de utilizadores de artefatos de IA inseguros (`AML.T0011.000`) [4], e
  o OWASP lista cadeia de fornecimento como `LLM04:2026` [5] e vulnerabilidades de cadeia de
  fornecimento de agentes como `ASI04` [6].
- **Modo de falha.** Um ficheiro de modelo adulterado ou malicioso carrega com os privilégios do
  processo de serviço. Ou um modelo que ignorou o eval gate chega à produção através de uma cópia
  manual. Após um incidente, ninguém consegue provar quais pesos produziram os resultados em
  questão.

## Solução
Assine na compilação, prove como foi construído, carregue apenas formatos seguros e verifique antes
de carregar.

1. **Assine na compilação.** Produza um manifesto listando cada ficheiro de modelo e seu resumo
   criptográfico e assine o manifesto. A especificação OpenSSF Model Signing (OMS), introduzida pelo
   OpenSSF em junho de 2025, faz exatamente isto: uma assinatura destacada sobre um manifesto de
   hashes de ficheiros, no formato de pacote Sigstore, e agnóstica de PKI (PKI empresarial,
   certificados auto-assinados, chaves nuas ou Sigstore sem chaves) [7]; sua implementação de
   referência é a biblioteca `model-signing`} e CLI no repositório model-transparency do sigstore,
   cuja verificação recomputa os hashes [8].
2. **Anexe a proveniência da compilação.** Registe o que construiu o artefato, por qual processo e a
   partir de quais entradas de nível superior, como proveniência SLSA
   (`https://slsa.dev/provenance/v1`). SLSA v1.2 define Build L1 (proveniência existe), L2 (uma
   plataforma de compilação alojada, portanto falsificar proveniência requer um ataque explícito) e
   L3 (compilações endurecidas, onde falsificá-la requer explorar uma vulnerabilidade "além das
   capacidades da maioria dos adversários") [9]. Inclua o resumo do modelo base e os registos de
   admissão de dataset entre as entradas, e liste os mesmos artefatos no [AIBOM](/patterns/aibom).
3. **Prefira formatos seguros; digitalize o resto.** Armazene pesos como safetensors, "um novo
   formato simples para armazenar tensores com segurança (em oposição a pickle)" [10]. Onde um
   framework ainda carrega pickle, mantenha suas restrições: o {`torch.load`} do PyTorch assume
   {`weights_only=True`} em sua documentação atual e avisa "Nunca carregue dados de uma fonte não
   confiável" [11]. Digitalize cada ficheiro serializado para importações que executem código antes
   de chegar a um registo e coloque em quarentena o que falhar.
4. **Fixe modelos de terceiros por resumo.** Obtenha por resumo de conteúdo, não por etiqueta;
   verifique a assinatura do editor onde uma existe; digitalize e re-aloje o artefato no registo
   interno; e registe a fonte e o resumo a montante na entrada do registo.
5. **Verifique antes de carregar.** O controlo de admissão da plataforma de serviço recusa um modelo
   cuja assinatura, identidade do signatário, resumos de ficheiro ou proveniência não correspondem à
   entrada do registo para a versão a ser implantada, e escreve um registo de evidência de qualquer
   forma. O ATLAS lista assinatura de código (`AML.M0013`), verificação de artefatos de IA
   (`AML.M0014`), digitalização de vulnerabilidades (`AML.M0016`) e uma lista de materiais de IA
   (`AML.M0023`}) entre suas mitigações [4].

O AI RMF pede que modelos pré-treinados utilizados para desenvolvimento sejam "monitorados como
parte da monitorização e manutenção regular do sistema de IA" (MANAGE 3.2) e que segurança e
resiliência sejam "avaliadas e documentadas" (MEASURE 2.7) [12]. Os prestadores de modelos de
finalidade geral com risco sistémico devem garantir "um nível adequado de proteção de
cibersegurança" para o modelo e sua infraestrutura física (`Art. 55(1)(d)`) [3].

Verificação ilustrativa no carregamento, válida contra o
[esquema de registo de evidência](/resources/templates#schema-evidence-record) publicado
(`evidence-record.v1`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "model.integrity.verify-at-load.v2",
  "subject": "support-rag-llm@2026-09-20",
  "decision": "allow",
  "obligation": "EU AI Act Art. 15(5)",
  "failure_mode": "tampered or malicious model weights loaded into serving",
  "input_hash": "sha256:8c1f4e2d7a9b3c6e5f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e",
  "actor": "serving-admission-controller",
  "timestamp": "2026-09-20T07:31:05Z",
  "signature": "ed25519:Tq5w2Lr8Zk1Xv7Nc4Pb9Hs6Gd3Fa0Jm",
  "extensions": {
    "signature_bundle": "model.sig",
    "signer": "build-pipeline@models.example.org",
    "files_verified": 7,
    "formats": ["safetensors", "json"],
    "pickle_files": 0,
    "provenance": { "predicate_type": "https://slsa.dev/provenance/v1", "build_level": "L3",
                    "builder": "ci.example.org/model-builds" },
    "registry_entry": "support-rag-llm"
  }
}
```

> **Exemplo (ilustrativo)** Uma equipa de plataforma descobriu que três serviços carregavam o
> "mesmo" modelo ajustado de três baldes diferentes, um copiado manualmente meses antes. Eles
> moveram a assinatura para o pipeline de treino, fizeram o controlador de admissão de serviço
> verificar o manifesto e a proveniência contra a entrada do registo, e converteram os pontos de
> verificação pickle restantes para safetensors. Os registos de evidência da primeira semana
> mostraram uma implantação recusada numa incompatibilidade de resumo: o modelo copiado manualmente,
> que nunca tinha passado o eval gate atual.

## Consequências
O que executa é comprovadamente o que foi construído e avaliado, ataques da cadeia de fornecimento
no modelo têm de derrotar uma assinatura e uma verificação de proveniência em vez de uma cópia de
ficheiro, e cada carregamento deixa evidência. Os custos: gestão de chaves ou uma dependência de
Sigstore; trabalho de plataforma de compilação para atingir níveis SLSA mais elevados; conversão de
pontos de verificação legados; e latência de verificação no carregamento, que é pequena em
comparação com tempos de carregamento de modelo, mas deve ser orçamentada para escala rápida.

## Padrões relacionados
[AIBOM](/patterns/aibom); [Agent Registry](/patterns/agent-registry);
[AI Threat Model](/patterns/ai-threat-model);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondências:** Regulamento da IA da UE Art. 15(5), Art. 55(1)(d) · ISO/IEC 42001 A.6.2.5,
A.10.3 · NIST AI RMF (Govern 6.1; Manage 3.2; Measure 2.7) · OWASP LLM04:2026 · OWASP Agentic ASI04
· MITRE ATLAS · Camada 02 Inventory & Transparency / Camada 04 Runtime Controls & Observability.

Os IDs de ameaça seguem o OWASP Top 10 para Aplicações LLM 2026 [5] e para Aplicações Agentic 2026
[6] e MITRE ATLAS [4]; os rótulos de função e subcategoria seguem o NIST AI RMF [12]; os IDs do
Anexo A da ISO/IEC 42001 seguem um crosswalk publicado, não o texto do padrão [13]. Os mapeamentos
são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] pickle: Python object serialization ("The pickle module is not secure. Only unpickle data you trust."). Python Software Foundation. 2026. https://docs.python.org/3/library/pickle.html (verified: primary)
[2] Pickle Scanning (arbitrary code execution when loading pickle files; the Hub's pickle-import scan "is not 100% foolproof"; safetensors). Hugging Face Hub documentation. n.d. (accessed 2026-09-24). https://huggingface.co/docs/hub/security-pickle (verified: primary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 15(5) resilience against exploitation of vulnerabilities, incl. model poisoning through pre-trained components used in training; Art. 55(1)(d) cybersecurity protection for GPAI models with systemic risk and their physical infrastructure (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] MITRE ATLAS data, release 2026.09 (modified 2026-09-15; AML.T0010.003 AI Supply Chain Compromise: Model; AML.T0011.000 User Execution: Unsafe AI Artifacts; mitigations AML.M0013 Code Signing, AML.M0014 Verify AI Artifacts, AML.M0016 Vulnerability Scanning, AML.M0023 AI Bill of Materials). MITRE (atlas-data repository). 2026-09-15. https://github.com/mitre-atlas/atlas-data (verified: primary)
[5] OWASP Top 10 for LLM Applications 2026 (LLM04:2026 Supply Chain). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[6] Top 10 for Agentic Applications 2026 (ASI04 Agentic Supply Chain Vulnerabilities). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[7] "An Introduction to the OpenSSF Model Signing (OMS) Specification" (detached signature over a manifest of file hashes; Sigstore bundle format; PKI-agnostic: private or enterprise PKI, self-signed certificates, bare keys, keyless Sigstore; `pip install model-signing`). OpenSSF. 2025-06-25. https://openssf.org/blog/2025/06/25/an-introduction-to-the-openssf-model-signing-oms-specification/ (verified: primary)
[8] model-transparency: supply chain security for ML (OpenSSF-linked model signing; signs an in-toto statement of file paths and digests through Sigstore or conventional keys; verification recomputes the hashes). Sigstore (GitHub). 2026. https://github.com/sigstore/model-transparency (verified: primary)
[9] SLSA specification v1.2, Build track basics (Build L1 provenance exists; L2 hosted build platform; L3 hardened builds; provenance describes what built the artefact, by what process and from which top-level inputs; predicate type https://slsa.dev/provenance/v1). OpenSSF SLSA project. n.d. (accessed 2026-09-24). https://slsa.dev/spec/v1.2/build-track-basics (verified: primary)
[10] Safetensors ("a new simple format for storing tensors safely (as opposed to pickle)"). Hugging Face documentation. n.d. (accessed 2026-09-24). https://huggingface.co/docs/safetensors/index (verified: primary)
[11] torch.load (default `weights_only=True`; "Never load data from an untrusted source"). PyTorch documentation (2.14). n.d. (accessed 2026-09-24). https://docs.pytorch.org/docs/stable/generated/torch.load.html (verified: primary)
[12] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks; MANAGE 3.2 pre-trained models "monitored as part of AI system regular monitoring and maintenance"; MEASURE 2.7 security and resilience "evaluated and documented"). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[13] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.6.2.5 AI system deployment, B.10.3 suppliers; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
