---
lang: pt
source: bok/patterns/model-card-as-control-evidence.md
sourceHash: "cddf209c7453ca3f97f56c7e81e3b253cf62ca5f325d86017a9fe3072fc64607"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: model-card-as-control-evidence
title: Model Card as Control Evidence
layer: 2
order: 6
summary: "Fichas de modelo e dados regeneradas do pipeline como evidência estruturada, portanto documentos de transparência descrevem o sistema como executa hoje."
---

# Padrão: Model Card as Control Evidence

**Resumo:** Trate a ficha de modelo e a ficha de dados não como documentação de lançamento escrita
uma vez, mas como evidência estruturada regenerada do pipeline, para que documentos de transparência
descrevam o sistema como é agora e alimentem a camada de garantia.

## Objetivos
Converta documentação de transparência de um PDF estático para um artefato versionado que seja
legível por humanos e consumível por máquinas, e que conte como evidência de controlo.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de ML, EPD.

## Partes interessadas afetadas
Proprietários de modelos, utilizadores, auditores, titulares de dados.

## Princípios relevantes
Instrumente a compilação para produzir sua própria prova; torne o caminho governado o caminho mais
fácil.

## Contexto
Um sistema sujeito a obrigações de transparência, onde as fichas são tradicionalmente escritas no
lançamento e nunca mais tocadas.

## Problema
Uma ficha de modelo escrita uma vez decai em ficção conforme o modelo, prompts e datasets mudam. Uma
ficha que não é regenerada não pode ser confiável como evidência e engana o próprio auditor que se
destinava a satisfazer.

## Solução
Modele a ficha e preencha-a a partir do pipeline: uso previsto, resultados de avaliação (do Eval
Gate), datasets (do AIBOM), limitações conhecidas e proprietário. Regenere em cada mudança
significativa e versione-a com o modelo. Armazene a ficha como dados estruturados para que possa ser
lida por uma pessoa e consumida pela camada de garantia.

> **Exemplo (ilustrativo)** A ficha de um classificador é reconstruída em cada implantação, obtendo
> suas pontuações de avaliação de equidade mais recentes e proveniência de dataset automaticamente,
> portanto a ficha que um auditor lê é a ficha que a produção produziu.

## Consequências
A transparência permanece verdadeira e funciona como evidência. O custo é modelagem e fiação de
pipeline, e concordar o que "mudança significativa" desencadeia uma regeneração.

## Padrões relacionados
[AIBOM](/patterns/aibom); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[FRIA-as-Code](/patterns/fria-as-code).

**Correspondências:** Regulamento da IA da UE Art. 11, Art. 13 (transparência) · ISO/IEC 42001,
ISO/IEC 42005 · NIST AI RMF (Map, Measure) · Camada 02 Inventory & Transparency.

Os rótulos de função seguem o NIST AI RMF [1]. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
