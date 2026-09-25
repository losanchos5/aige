---
lang: pt
source: bok/patterns/aibom.md
sourceHash: "6e929d4beb125a7562e751991ab3082ab4a2d2a41c33715bf06e279fb4a112d5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: aibom
title: AIBOM
layer: 2
order: 5
summary: "Uma lista de materiais de IA emitida na construção, registando modelos, conjuntos de dados, pesos e a sua proveniência num formato padrão junto à entrada de registo."
---

# Padrão: AIBOM

**Resumo:** Gere uma lista de materiais de IA na construção para cada sistema de IA, registando
modelos, conjuntos de dados, pesos e a sua proveniência num formato padrão, e armazene-a com a
entrada de registo. O AIBOM é o que as camadas de transparência e avaliação leem para saber o que
documentar e o que testar.

## Objetivos
Torne a composição e proveniência de um sistema de IA legível por máquina, para que o risco da
cadeia de fornecimento e as obrigações de transparência possam ser respondidas a partir de um
artefato, não reconstruídas.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de ML, engenheiro de segurança.

## Partes interessadas afetadas
Proprietários de modelos, responsáveis pela implantação a jusante, auditores, aquisições.

## Princípios relevantes
Instrumente a construção para produzir a sua própria evidência; comece por um modo de falha ou dano
nomeado.

## Contexto
Sistemas de IA montados a partir de modelos fundacionais, ajustes finos, conjuntos de dados e
bibliotecas de terceiros, onde o SBOM clássico captura dependências de software mas não modelos ou
dados.

## Problema
Sem uma lista de materiais para modelos e dados, uma organização não consegue responder qual versão
do modelo, de qual proveniência, treinado em quais dados, está dentro de um determinado sistema,
pelo que não consegue avaliar o risco da cadeia de abastecimento ou produzir documentação de
transparência sob demanda.

## Solução
Emita um AIBOM na construção num formato padrão, CycloneDX ML-BOM ou o perfil SPDX 3.0 AI, por
exemplo com o gerador AIBOM OWASP [1] (ilustrativo), cobrindo modelos, conjuntos de dados, pesos e a
sua proveniência e licenças. Anexe-o à entrada do registo e regenere-o em cada construção para que
nunca se desvie do sistema implantado.

> **Exemplo (ilustrativo)** O AIBOM de um assistente aumentado por recuperação lista o modelo base,
> o modelo de incorporação, a captura do corpus e as suas licenças; quando uma licença do corpus
> muda, a diferença aparece no AIBOM da próxima construção.

## Consequências
As questões de cadeia de abastecimento e proveniência tornam-se consultas; os documentos de
transparência podem ser gerados a partir do AIBOM. O custo é a integração da cadeia de ferramentas e
manter os metadados de proveniência precisos.

## Padrões relacionados
[Agent Registry](/patterns/agent-registry);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal).

**Correspondências:** Regulamento da IA Art. 11, Art. 53 (documentação GPAI) · ISO/IEC 42001 · NIST
AI RMF (Map) · CSA AICM · Camada 02 Inventory & Transparency.

Os rótulos de função seguem o NIST AI RMF [2]. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[2] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
