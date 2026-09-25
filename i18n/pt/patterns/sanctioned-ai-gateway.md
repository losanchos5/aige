---
lang: pt
source: bok/patterns/sanctioned-ai-gateway.md
sourceHash: "88e9d0d9330fb56a063e5432a1a541f0b365831e5eb900ce73567c56aa2083c9"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: sanctioned-ai-gateway
title: Sanctioned AI Gateway
layer: 4
secondaryLayer: 2
order: 28
summary: "Ferramentas de IA aprovadas atrás de um único início de sessão e um gateway que aplica regras de classe de dados, regista a utilização e verifica um atestado de utilização aceitável atual."
---

# Patrón: Sanctioned AI Gateway

**Resumo:** Coloque as ferramentas de IA aprovadas da organização e as APIs de modelos atrás de um
único início de sessão e um gateway que aplica a política de utilização aceitável como código:
regras de classe de dados sobre o que pode ser enviado, redação ou bloqueio onde a classe o exige,
um evento de decisão por chamada e acesso condicionado a um atestado de utilização aceitável atual.
O gateway é o caminho sancionado e é construído para ser o mais fácil; a descoberta encontra o que o
contorna.

## Objetivos
Permita que o pessoal utilize ferramentas de IA de forma produtiva, mantendo dados regulados,
confidenciais e secretos fora de ferramentas que não são aprovadas para tal, e transforme a política
de utilização aceitável de uma página de manual num controlo que decide e deixa evidência.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de segurança, equipa de plataforma, aprovisionamento.

## Partes interessadas afetadas
Colaboradores e prestadores de serviços, clientes cujos dados o pessoal trata, comissões de trabalho
ou representantes de colaboradores, o EPD, fornecedores de ferramentas de IA.

## Princípios relevantes
Torne o caminho governado o caminho mais fácil; construa o controlo no ponto mais cedo em que pode
bloquear; registe e delimite cada ator antes de agir.

## Contexto
O pessoal adota ferramentas de IA mais rapidamente do que o aprovisionamento as consegue aprovar.
Num inquérito de 2024 de um fornecedor a 31 000 trabalhadores do conhecimento em 31 países, 78% dos
utilizadores de IA disseram que levam as suas próprias ferramentas de IA para o trabalho [1]. A
organização já tem uma política de utilização aceitável que lista ferramentas aprovadas e entradas
proibidas por classe de dados (ver
[utilização aceitável de IA pelo pessoal](/bok/governance-program#acceptable-use-of-ai-by-staff)), e
o Regulamento da IA da UE, conforme alterado pelo Omnibus Digital, pede aos prestadores e
responsáveis pela implantação que tomem medidas para apoiar a literacia no domínio da IA do pessoal
que utiliza IA em seu nome [2]. O modo de falha é conhecido: o caso de
[código-fonte colado num chatbot público](/cases/chatbot-code-leak-reported) (reportado) é a versão
quotidiana, e a divulgação de informações sensíveis é uma classe de risco nomeada para aplicações
LLM [3].

## Problema
Uma política que vive num manual não tem força: é lida uma vez, atestada uma vez e nunca avaliada no
momento em que alguém cola um ficheiro de cliente numa ferramenta pública. Bloquear todas as
ferramentas públicas empurra a utilização para dispositivos pessoais, onde nada é visto. A
descoberta sozinha encontra a fuga depois de ter acontecido.

### Forças
- **Conveniência contra controlo.** Cada passo extra no caminho aprovado envia as pessoas de volta
  ao não aprovado.
- **Inspeção contra privacidade.** Registar prompts de pessoal é em si processamento de dados
  pessoais de colaboradores, pelo que o gateway mantém o que o controlo necessita, pelo tempo que
  necessita [4].
- **Latência contra redação.** A classificação de conteúdo e a redação adicionam tempo a cada
  chamada.
- **Termos do fornecedor contra desvio.** Uma ferramenta aprovada é apenas segura nos termos em que
  foi aprovada, como nenhum treino em entradas de clientes, e esses termos mudam.

## Solução
Torne um gateway a rota sancionada para IA e torne-a a rota mais rápida.

1. **Um catálogo de ferramentas aprovadas como uma [Policy Card](/patterns/policy-card).** Cada
   entrada nomeia a ferramenta, os termos do contrato em que foi aprovada, as classes de dados e
   casos de utilização para os quais é permitida, e a sua data de revisão. O
   [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) alimenta-o.
2. **Uma rota de entrada.** As APIs de modelos são acedidas através de um gateway de IA ou proxy
   LLM, e ferramentas baseadas em navegador através de um único início de sessão e um gateway web
   seguro ou política de navegador (categorias ilustrativas, não uma lista de produtos). As contas
   pessoais em ferramentas aprovadas são substituídas por inquilinos empresariais.
3. **Regras de classe de dados no gateway.** Um classificador de conteúdo marca cada pedido por
   classe de dados e a ficha decide: permitir, permitir com redação ou bloquear com um motivo e uma
   rota para a ferramenta correta. A matriz de classe de dados contra ferramenta vem da política de
   utilização aceitável.
4. **Acesso por atestado.** O fornecedor de identidade concede a função de gateway apenas enquanto
   um atestado de utilização aceitável atual e o seu módulo de treino estão registados (o
   [esquema de registo de treino](/resources/templates#schema-training-record)).
5. **Um evento de decisão por chamada.** O gateway escreve um registo de evidência assinado
   (decisão, classe de dados, ferramenta, redações, um hash da entrada em vez da entrada) para o
   armazém de garantia, na forma do
   [esquema de registo de evidência](/resources/templates#schema-evidence-record).
6. **Descoberta como ciclo de retroalimentação.**
   [Shadow-AI Discovery](/patterns/shadow-ai-discovery) lê dados de identidade, rede e despesa para
   ferramentas fora do gateway; cada descoberta torna-se um pedido de entrada (registar, nivelar,
   aprovar ou substituir) antes de se tornar uma sanção.

Evento de decisão de gateway ilustrativo, como um registo de evidência:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/evidence-record.v1.json",
  "control_id": "gateway.data-class.confidential.v4",
  "subject": "genai-gateway@2026.09.2",
  "decision": "allow",
  "obligation": "ISO/IEC 42001 A.9.2",
  "failure_mode": "customer data sent to a tool not approved for it",
  "input_hash": "sha256:4be1c07e9d52",
  "actor": "user:pseudo-8841",
  "timestamp": "2026-09-18T09:12:44Z",
  "signature": "ed25519:MEUCIQDx3k",
  "extensions": {
    "tool": "drafting-assistant@enterprise",
    "data_class": "confidential",
    "action": "allowed_with_redaction",
    "redactions": 2,
    "attestation": "tr-2026-0877"
  }
}
```

> **Exemplo (ilustrativo)** Uma equipa jurídica começa a utilizar um assistente de redação público
> para resumos de contratos. A descoberta marca o tráfego; em vez de bloquear o domínio, o programa
> de governação assina um acordo empresarial sem treino em dados de clientes, adiciona a ferramenta
> ao catálogo para dados confidenciais com redação de identificadores pessoais e encaminha-a através
> do gateway. A utilização passa para a rota sancionada em poucas semanas porque agora é a mais
> fácil.

## Consequências
A utilização aceitável torna-se aplicável e mensurável: a organização pode mostrar o que foi enviado
para onde, sob qual regra e quanto uso acontece fora do gateway. O custo é o próprio gateway, ajuste
do classificador (bloqueios falsos corroem a confiança rapidamente), manutenção do catálogo conforme
os termos do fornecedor mudam e o trabalho de privacidade para registar proporcionalmente. O gateway
cobre as ferramentas que fronts; modelos locais e dispositivos pessoais continuam a ser um problema
de descoberta.

## Padrões relacionados
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Policy Card](/patterns/policy-card);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondências:** Regulamento da IA da UE Art. 4 · RGPD Art. 5(1)(c) · ISO/IEC 42001 A.2, A.9.2,
A.10.3 · NIST AI RMF GOVERN 2.2, GOVERN 6.1, MANAGE 3.1 · OWASP LLM02:2026 · Camada 04 Runtime
Controls & Observability / Camada 02 Inventory & Transparency.

Os IDs de ameaça seguem o OWASP Top 10 for LLM Applications 2026 [3], os IDs de controlo ISO/IEC
42001 Annex A [5] e os IDs de subcategoria o NIST AI RMF [6]. Os mapeamentos são ilustrativos, não
uma afirmação de conformidade.

## Sources

[1] "AI at Work Is Here. Now Comes the Hard Part" (2024 Work Trend Index; 31,000 people in 31 countries; 78% of AI users bring their own AI tools to work). Microsoft and LinkedIn. 2024-05-08. https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 4 replaced: providers and deployers take measures to support the development of AI literacy); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure; ids used in the Maps to line). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[4] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 5(1)(c) data minimisation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.2 policies related to AI; A.9.2 processes for responsible use of AI systems; A.10.3 suppliers). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[6] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 2.2 personnel and partners receive AI risk management training; GOVERN 6.1 policies for third-party AI risks; MANAGE 3.1 third-party risks regularly monitored). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
