---
lang: pt
source: bok/patterns/use-case-intake-risk-tiering.md
sourceHash: "350f07d369530791c00bd8f00f0e4131487f6317a6073ddfc68d8c3c121dac53"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: use-case-intake-risk-tiering
title: "Use-Case Intake & Risk Tiering"
layer: 1
secondaryLayer: 2
order: 18
summary: "Um caminho de entrada para cada caso de uso de IA: um registo de caso de uso estruturado, um nível calculado a partir do seu perfil de risco, e os portões que esse nível ativa."
---

# Padrão: Use-Case Intake & Risk Tiering

**Resumo:** Encaminhe cada caso de uso de IA proposto, construído ou adquirido, através de uma
entrada única que escreve um registo de caso de uso estruturado, o avalia contra práticas proibidas
e a escala de risco do Regulamento da IA, e calcula um nível de risco interno a partir de campos de
perfil declarados. O nível, não uma reunião, decide quais avaliações, evals e aprovações o sistema
deve passar antes de ser lançado, e o registo torna-se a entrada de registo que cada portão
posterior lê.

## Objetivos
Faça a primeira decisão sobre um sistema de IA uma decisão registada e reproduzível: para que serve,
para que não deve ser utilizado, como é arriscado e, a partir disso, quanta governação recebe. Gaste
esforço de revisão onde o risco está e deixe casos de uso de baixo risco passar rapidamente por um
caminho pavimentado.

## Utilizadores-alvo
Engenheiro de governação da IA, proprietário do produto, equipa de plataforma, revisores jurídicos e
de privacidade.

## Partes interessadas afetadas
Pessoas afetadas pelos resultados do sistema, responsáveis pela implantação e operadores, comité de
governação da IA, auditores, autoridades de fiscalização do mercado.

## Princípios relevantes
Construa o controlo no ponto mais antigo em que pode bloquear; torne o caminho governado o caminho
mais fácil; registe e delimite cada ator antes de agir.

## Contexto
Uma organização onde muitas equipas propõem funcionalidades de IA, e a maioria delas compra ou chama
modelos em vez de os treinar. Os pedidos chegam por correio eletrónico, em apresentações e em
bilhetes de compras, e cada um é revisto com as questões que o revisor se lembra. O Regulamento da
IA mede a maioria dos deveres contra a **finalidade prevista**, que define como incluindo o contexto
e as condições de utilização indicados nas instruções de utilização, "materiais e declarações
promocionais ou de vendas" e a documentação técnica (`Art. 3(12)`) [1]. O NIST AI RMF pede que as
finalidades previstas e as configurações sejam "compreendidas e documentadas" (MAP 1.1) e que as
tolerâncias de risco sejam "determinadas e documentadas" (MAP 1.5) [2].

## Problema
Sem uma entrada única, a governação começa demasiado tarde e escala mal.

- **Forças.** Os revisores querem cada caso de uso avaliado em profundidade; as equipas querem uma
  resposta em dias. A classificação depende de factos que apenas a equipa conhece: a finalidade, as
  pessoas afetadas, se o sistema define perfis de pessoas. Um nível negociado numa reunião varia
  consoante quem comparece. Um nível que não é legível por máquina não pode ativar um portão.
- **Modo de falha.** Um caso de uso de alto risco passa despercebido como "apenas um piloto"
  enquanto pedidos de baixo risco ficam em fila atrás dele. Ninguém consegue mostrar quais sistemas
  foram classificados, por quem, em que factos, ou por que um sistema do Anexo III foi tratado como
  não de alto risco.

## Solução
Construa a entrada como um caminho de formulário-mais-código que termina num registo e num nível,
não em minutos.

1. **Capture o registo do caso de uso.** Um formulário estruturado curto (finalidade prevista,
   utilizações fora do âmbito, utilizadores e pessoas afetadas, autoridade de decisão, métricas de
   sucesso, apetite de erro, fontes de dados, jurisdições) escreve um stub de registo com chave para
   um id. Reutilize o
   [esquema de registo de caso de uso](/resources/templates#schema-use-case-record) publicado
   (`use-case-record.v1`) para que o formulário, o registo e os portões partilhem uma forma.
2. **Avalie antes de classificar.** Execute primeiro o ecrã de prática proibida (`Art. 5`): um
   resultado é bloqueado na entrada e nunca classificado. Depois coloque o sistema na escala do
   Regulamento: um uso do Anexo III, com o filtro `Art. 6(3)` e a sua sobreposição (um sistema do
   Anexo III que define perfis de pessoas singulares é sempre de alto risco), deveres de
   transparência, ou um modelo de finalidade geral. Um prestador que se baseia no filtro deve
   documentar a sua avaliação antes de colocar o sistema no mercado e registá-lo (`Art. 6(4)`,
   `Art. 49(2)`) [1]; o registo de entrada é essa documentação. O Omnibus Digital deslocou as
   obrigações de alto risco do Anexo III para 2 de dezembro de 2027 [3]: isso altera quando os
   deveres entram em vigor, não se a classificação é registada agora.
3. **Calcule o nível interno.** Declare campos de perfil (autonomia, impacto da decisão, exposição,
   reversibilidade do pior resultado, grupos vulneráveis, classe de dados, dependência de terceiros)
   e deixe uma política versionada calcular o nível. O NIST AI RMF define o nível de atividade de
   gestão de riscos pela tolerância de risco (GOVERN 1.3) e pede a probabilidade e magnitude de cada
   impacto identificado (MAP 5.1) [2]. A Diretiva do Canadá sobre Decisões Automatizadas aplica a
   mesma ideia na administração pública, com quatro níveis de impacto definidos em parte pela
   reversibilidade e duração [4]. Uma equipa que discorda do seu nível altera um fator, com
   evidência, numa alteração revista; o nível segue.
4. **Vincule o nível aos portões.** O nível seleciona as avaliações necessárias (AIPD, FRIA,
   diligência devida do fornecedor), as categorias e limiares de eval, os aprovadores e a cadência
   de revisão, para que o pipeline leia o que deve aplicar. A implantação recusa qualquer sistema
   sem um registo de entrada ("sem stub, sem implantação"), o que mantém o inventário completo por
   construção (GOVERN 1.6) [2].
5. **Reabra em caso de alteração.** Uma nova finalidade, população, jurisdição ou fonte de dados, ou
   um consumidor que declare uma utilização na lista de fora do âmbito, executa novamente a entrada
   e pode mover o nível.

Registo de caso de uso ilustrativo na entrada, válido contra `use-case-record.v1` (os campos de
perfil e a alegação de filtro viajam em `extensions`):

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/use-case-record.v1.json",
  "record_id": "uc-2026-042",
  "title": "Payslip field extraction for mortgage applications",
  "business_owner": "head-of-mortgage-operations",
  "intended_purpose": "Extract income fields from uploaded payslips into the application form for an underwriter to confirm; the affordability assessment is made elsewhere.",
  "out_of_scope_uses": ["affordability scoring", "automatic decline", "employment verification"],
  "users": ["mortgage underwriters"],
  "affected_persons": ["mortgage applicants"],
  "decision_authority": "human_decides",
  "ai_justification": {
    "alternatives_considered": ["manual keying", "template-based OCR"],
    "why_ai": "Payslip layouts vary too much for templates; every extracted field is confirmed by an underwriter."
  },
  "success_metrics": [
    { "metric": "field-level exact match on a frozen sample", "target": ">= 0.98", "direction": "higher_is_better" }
  ],
  "error_appetite": "A wrong income figure can distort an affordability decision; low-confidence fields are routed to manual keying.",
  "data_sources": [{ "name": "applicant payslips", "personal_data": true, "special_category": false }],
  "jurisdictions": ["ES", "PT"],
  "preliminary_classification": {
    "eu_ai_act_category": "minimal",
    "internal_tier": "medium",
    "rationale": "Preparatory task to an Annex III 5(b) assessment (Art. 6(3) filter claimed, no profiling); assessment documented and registered under Art. 6(4) and Art. 49(2)."
  },
  "assessments_required": ["dpia"],
  "decision": {
    "outcome": "approved_with_conditions",
    "conditions": ["Art. 49(2) registration before go-live", "monthly 2% sample checked against source payslips"],
    "decided_by": "ai-governance-review",
    "decided_at": "2026-09-22"
  },
  "register_entry": "mortgage-extract-01",
  "extensions": {
    "risk_profile": { "autonomy": "suggests", "decision_impact": "informs", "exposure": "customers",
                      "reversibility": "reversible", "vulnerable_groups": [], "data_class": "personal",
                      "third_party": ["ocr-vendor-02"] },
    "tier_rule": "tiering-policy.v3",
    "annex_iii_point": "5(b)",
    "art_6_3_condition": "preparatory_task",
    "profiling": false
  }
}
```

> **Exemplo (ilustrativo)** O formulário de entrada de um banco é suficientemente curto para ser
> concluído numa sessão. O ecrã de prática proibida e as questões do Anexo III executam primeiro; a
> regra de nível lê então o perfil. Uma ferramenta de extração de recibos de vencimento aterra no
> nível médio com a sua alegação de filtro `Art. 6(3)` registada, portanto recebe uma ligação AIPD,
> uma eval de precisão de extração e uma verificação de amostra mensal, não um lugar em comité. Um
> segundo pedido, para classificar candidatos por incumprimento previsto, ativa a sobreposição de
> definição de perfis na primeira questão e é encaminhado como de alto risco antes de alguém marcar
> uma reunião.

## Consequências
Cada sistema tem uma finalidade, uma classe e um nível registados antes de custar computação; o
esforço de revisão segue o risco; o inventário está completo porque a implantação depende dele; e
cada classificação é auditável até aos factos em que se baseou. Os custos: o formulário deve
manter-se curto ou as equipas contornam-no; a regra de nível precisa de calibração e um caminho de
apelação; e os factos auto-declarados podem estar errados, portanto a entrada precisa de
verificações pontuais contra descoberta e compras.

## Padrões relacionados
[Agent Registry](/patterns/agent-registry); [Policy Card](/patterns/policy-card);
[FRIA-as-Code](/patterns/fria-as-code);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery); [AI Threat Model](/patterns/ai-threat-model);
[Dataset Admission Gate](/patterns/dataset-admission-gate).

**Correspondências:** Regulamento da IA Art. 3(12), Art. 5, Art. 6(3)–(4), Art. 49(2), Anexo III ·
ISO/IEC 42001 A.5.2, A.9.4 · NIST AI RMF (Govern 1.3, 1.6; Map 1.1, 1.5, 5.1) · Layer 01
Govern-as-Code / Layer 02 Inventory & Transparency.

Os rótulos de função e subcategoria seguem o NIST AI RMF [2]; os ids ISO/IEC 42001 Anexo A seguem um
crosswalk publicado, não o texto do padrão [5]. Os mapeamentos são ilustrativos, não uma alegação de
conformidade.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act): Art. 3(12) intended purpose (incl. "promotional or sales materials and statements"); Art. 5 prohibited practices; Art. 6(3) filter and profiling override, Art. 6(4) documented assessment before placing on the market; Art. 49(2) registration of systems concluded not high-risk under Art. 6(3); Annex III (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.3 level of risk-management activity by risk tolerance; GOVERN 1.6 inventory of AI systems; MAP 1.1 intended purposes and settings "understood and documented"; MAP 1.5 risk tolerances "determined and documented"; MAP 5.1 likelihood and magnitude of each identified impact). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689; OJ L, 24 July 2026; in force 27 Jul 2026; Annex III high-risk obligations moved to 2 Dec 2027. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Directive on Automated Decision-Making (algorithmic impact assessment before production; Appendix B impact levels I to IV defined by reversibility and duration). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[5] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.5.2 AI system impact assessment process, B.9.4 intended use of the AI system; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
