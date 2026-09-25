---
lang: pt
source: bok/patterns/framework-crosswalk.md
sourceHash: "4ac2ee65dbf30c778130711d8563719cfe4cbeeea2929df2e3e488f1269bad4e"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: framework-crosswalk
title: Framework Crosswalk
layer: 1
secondaryLayer: 5
order: 12
summary: "Um mapa de cada controlo para as cláusulas do enquadramento que serve, gerado a partir dos controlos: um índice para reutilização, nunca prova de que um controlo funciona."
---

# Padrão: Framework Crosswalk

**Resumo:** Mantenha um mapeamento de cada controlo para as cláusulas do enquadramento que serve,
gerado a partir dos próprios controlos, como um índice para navegação e reutilização, nunca como o
estado final. Um mapa de referência prova que leu o enquadramento; não prova que o controlo
funciona.

## Objetivos
Deixe um controlo satisfazer muitos enquadramentos e torne a cobertura navegável, enquanto recusa
confundir cobertura com garantia.

## Utilizadores-alvo
Engenheiro de governação da IA, responsável de conformidade, auditor.

## Partes interessadas afetadas
Auditores, reguladores, proprietários de modelos.

## Princípios relevantes
Torne o caminho governado o caminho mais fácil; instrumente a compilação para produzir a sua própria
prova.

## Contexto
Uma organização respondendo a vários enquadramentos sobrepostos (Regulamento da IA, ISO/IEC 42001,
NIST AI RMF, CSA AICM) que de outro modo implementaria o mesmo controlo várias vezes.

## Problema
O mapa de referência é onde o teatro de enquadramento começa. Uma matriz de mapeamento verde é
confundida com um controlo funcional; uma folha de cálculo de 300 linhas mapeando controlos para
cinco enquadramentos é apresentada como maturidade enquanto nada mede se algum controlo mapeado
reduz risco.
**O anti-padrão é tratar cobertura como controlo: uma célula de mapeamento não é evidência.**

## Solução
Gere o mapa de referência a partir dos controlos, não ao lado deles: cada Policy Card e Eval Gate
declara as cláusulas para as quais mapeia, e o mapa de referência é a agregação. Use-o para
encontrar lacunas e reutilizar controlos, não para relatar conformidade. Cada célula de mapeamento
deve resolver para um controlo em execução e a sua evidência emitida; uma célula sem evidência por
trás dela é sinalizada, não contada. Vocabulários de referência como o CSA AICM (247 objetivos de
controlo em 18 domínios) [1] e o OWASP Agent Control Standard [2] ancoram o mapeamento.

> **Exemplo (ilustrativo)** Clicar numa célula verde para «registo» abre o guardrail e a evidência
> OSCAL que emitiu esta semana; uma célula sem evidência renderiza âmbar, não verde.

## Consequências
Os controlos são reutilizados entre enquadramentos e as lacunas são visíveis, sem inflar uma matriz
em falsa garantia. O compromisso é a disciplina para manter as células honestas e resistir a relatar
cobertura como resultado.

## Padrões relacionados
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondências:** Regulamento da IA (transversal) · ISO/IEC 42001 · NIST AI RMF (Govern) · CSA
AICM · OWASP Agent Control Standard · Camada 01 Govern-as-Code / Camada 05 Assurance & Continuous
Compliance.

Os rótulos de função seguem o NIST AI RMF [3]. Os mapeamentos são ilustrativos, não uma alegação de
conformidade.

## Sources

[1] AI Controls Matrix (AICM) v1.1 (247 control objectives across 18 domains). Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[2] OWASP GenAI Security Project unveils the Agent Control Standard (ACS) and 2026 Top 10 for LLM Applications. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
