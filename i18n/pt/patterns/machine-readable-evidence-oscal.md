---
lang: pt
source: bok/patterns/machine-readable-evidence-oscal.md
sourceHash: "be7a12b4bb256bc5061873011ed1ac00eb14de3c039d565f3ba60f94a06cb2da"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: machine-readable-evidence-oscal
title: "Machine-Readable Evidence (OSCAL)"
layer: 5
order: 13
summary: "Evidência de controlo emitida num formato padrão legível por máquina, OSCAL em primeiro lugar, para que uma auditoria se torne uma consulta e os mesmos registos alimentem a garantia contínua."
---

# Padrão: Machine-Readable Evidence (OSCAL)

**Resumo:** Emita evidência de controlo num formato padrão legível por máquina para que a auditoria
seja uma consulta e a mesma evidência alimente a garantia contínua. OSCAL, estendido com
propriedades para IA, é o formato organizador: os frameworks especificam o que garantir mas não
fornecem formato executável para como, e este padrão fornece-o [1].

## Objetivos
Torne a evidência consultável, comparável e agregável, e elimine a captura de ecrã como um artefato
de evidência.

## Utilizadores-alvo
Engenheiro de governação da IA, auditor, equipa de plataforma.

## Partes interessadas afetadas
Auditores, reguladores, proprietários de modelos.

## Princípios relevantes
Instrumente a construção para produzir a sua própria evidência; dê força a cada controlo.

## Contexto
Um stack cujos controlos já produzem registos estruturados, e uma função de garantia que deve
responder aos auditores repetidamente e com rapidez.

## Problema
Evidência que um humano deve formatar e arquivar manualmente não escala, não pode ser verificada
rapidamente, e está desatualizada no momento em que é guardada. Cada auditoria recolhe-a do zero.

## Solução
Emita resultados de controlo como artefatos de definição de componente OSCAL e resultados de
avaliação. O modelo nativo de OSCAL é o substrato estável: uma camada de controlo (`catalog`,
`profile`), uma camada de implementação (`component-definition`, `system-security-plan`) e uma
camada de avaliação (`assessment-plan`, `assessment-results`, `POA&M`), com rastreabilidade de um
resultado para o controlo que testou [2]. Construa sobre ele primeiro. As extensões específicas de
IA ainda estão a formar-se: uma abordagem proposta, um preprint único de 2026, adiciona dezasseis
extensões de propriedade para fase de ciclo de vida, semântica de aplicação e rastreabilidade de
risco numa arquitetura de política/evidência/aplicação de três camadas que gera resultados de
avaliação OSCAL automaticamente e os valida contra o esquema JSON NIST [1]. Adote as extensões se se
adequarem, mas os modelos de avaliação nativos carregam a maioria da carga hoje. Armazene a
evidência para que a pergunta de um auditor seja respondida por uma consulta.

> **Exemplo (ilustrativo)** Um eval gate escreve um resultado de avaliação OSCAL em cada execução; o
> pedido do auditor por "toda a evidência de robustez em Q3" é um filtro sobre o armazenamento,
> devolvido em minutos.

## Consequências
A auditoria torna-se uma consulta e a evidência compõe-se entre ferramentas e jurisdições. O custo é
adotar o esquema e instrumentar controlos para emiti-lo.

## Padrões relacionados
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Framework Crosswalk](/patterns/framework-crosswalk); [Eval Gate in CI](/patterns/eval-gate-in-ci);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondências:** Regulamento da IA da UE Art. 12, Art. 17, Art. 72 · ISO/IEC 42001 · NIST AI
RMF (Manage, Govern) · Camada 05 Assurance & Continuous Compliance.

Os rótulos de função seguem o NIST AI RMF [3]. Os mapeamentos são ilustrativos, não uma alegação de
conformidade.

## Sources

[1] "Making AI Compliance Evidence Machine-Readable" (OSCAL + 16 property extensions; three-layer policy/evidence/enforcement; "specify what to assure but provide no executable format for how") (arXiv 2604.13767). UC3M. 2026-04-15. https://arxiv.org/abs/2604.13767 (verified: primary)
[2] OSCAL native model (control layer: catalog, profile; implementation: component-definition, system-security-plan; assessment: assessment-plan, assessment-results, POA&M). NIST. 2026. https://pages.nist.gov/OSCAL/learn/concepts/layer/ (verified: primary)
[3] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
