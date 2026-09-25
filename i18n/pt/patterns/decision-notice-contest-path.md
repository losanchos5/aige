---
lang: pt
source: bok/patterns/decision-notice-contest-path.md
sourceHash: "0c90b68790ca1efb894ab8be4670c23c1957277b6e7b9e71472e60313bff602b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: decision-notice-contest-path
title: "Decision Notice & Contest Path"
layer: 4
secondaryLayer: 5
order: 26
summary: "Um aviso no ponto de uma decisão automatizada, ligado ao seu registo de decisão, e um caminho de contestação para um revisor com o poder de alterar o resultado."
---

# Patrón: Decision Notice & Contest Path

**Resumo:** Quando um sistema de IA toma ou molda uma decisão sobre uma pessoa, envie um aviso no
ponto de decisão, gerado a partir do registo de decisão, que diz que um sistema foi envolvido, dá as
razões principais e diz como contestar; e execute um caminho de contestação para um revisor com a
autoridade e a informação para alterar o resultado. O aviso, a contestação e o resultado da revisão
são todos registos, para que o direito de contestação seja evidenciado decisão por decisão em vez de
ser afirmado numa política.

## Objetivos
Torne cada decisão automatizada consequente explicável para, e contestável por, a pessoa que afeta,
e deixe um registo mostrando que o aviso foi enviado, que a contestação foi ouvida e que o resultado
se manteve ou mudou por uma razão indicada.

## Utilizadores-alvo
Engenheiro de governação da IA, engenheiro de produto, EPD, o proprietário das operações da decisão
(crédito, sinistros, contratação).

## Partes interessadas afetadas
Candidatos, clientes, colaboradores e outras pessoas afetadas; revisores humanos; autoridades de
supervisão e fiscalização do mercado; auditores.

## Princípios relevantes
Comece a partir de um modo de falha ou dano nomeado; instrumente a construção para produzir a sua
própria prova; dê a cada controlo dentes.

## Contexto
Um sistema implantado decide, ou molda uma decisão, sobre uma pessoa: crédito, seguro, um emprego,
acesso a um serviço. Vários regimes anexam deveres a esse mesmo momento. Sob o Artigo 22 do RGPD uma
decisão unicamente automatizada com efeitos legais ou similarmente significativos é permitida apenas
numa base estreita, e então com pelo menos o direito de obter intervenção humana, de expressar um
ponto de vista e de contestar a decisão; os Artigos 13(2)(f) e 15(1)(h) adicionam informações
significativas sobre a lógica envolvida [1]. O Tribunal de Justiça manteve que uma pontuação de
crédito é em si mesma tal decisão quando os credores lhe dão um papel determinante [2]. No Reino
Unido, os Artigos 22A a 22D, em vigor desde 5 de fevereiro de 2026, exigem informações sobre a
decisão, a oportunidade de fazer representações, intervenção humana e uma forma de contestar [3].

Sob o Regulamento da IA, os responsáveis pela implantação de sistemas de alto risco do Anexo III que
tomam ou assistem decisões sobre pessoas devem dizer-lhes que o sistema é utilizado (`Art. 26(11)`),
e uma pessoa afetada pode obter uma explicação clara e significativa do papel do sistema e dos
elementos principais da decisão (`Art. 86`), um direito que se aplica apenas quando o direito da
União não o fornece já [4]. A partir de 2026-09-24 os requisitos do Anexo III aplicam-se a partir de
2 de dezembro de 2027 [5]. `Art. 86` aplicou-se desde 2 de agosto de 2026 (`Art. 113`) [4], mas
anexa-se a decisões baseadas em sistemas de alto risco do Anexo III, portanto na leitura deste site
tem trabalho a fazer apenas a partir de 2 de dezembro de 2027. Um credor dos EUA que toma ação
adversa deve notificar o candidato dentro de 30 dias de uma aplicação concluída, com as razões
principais específicas [6]. A CFPB disse em 2022 que um algoritmo complexo não desculpa razões vagas
[7], mas retirou essa circular em 12 de maio de 2025; o dever de Regulamento B em si é inalterado
[6][12]. Colorado adiciona, a partir de 1 de janeiro de 2027, um aviso de utilização, uma explicação
em linguagem clara de um resultado adverso e revisão humana para decisões automatizadas em áreas
consequentes [8].

## Problema
Cada regime tende a ser respondido por si: um modelo de carta propriedade das operações, uma caixa
de entrada de apelação propriedade do serviço ao cliente, uma página de explicação propriedade do
departamento jurídico. Nenhum deles está ligado ao registo de decisão, portanto ninguém pode mostrar
qual aviso uma determinada pessoa recebeu, que razões deu, se essas razões eram os fatores que o
modelo realmente utilizou, ou o que o revisor fez com a contestação. Um caminho de contestação que
termina num revisor que confirma quase cada resultado em segundos não é envolvimento humano
significativo; é uma fila.

### Forças
- **Fidelidade contra legibilidade.** As razões devem ser os fatores que o modelo realmente
  utilizou, mas curtas e claras o suficiente para uma pessoa agir.
- **Relógios contra capacidade.** Os avisos funcionam em prazos (30 dias sob Regulamento B), e uma
  revisão real custa tempo de pessoal que escala com a taxa de contestação.
- **Divulgação contra proteção.** Informações significativas sobre a lógica têm de coexistir com
  segredos comerciais e com não ensinar às pessoas a contornar o modelo; o Tribunal de Justiça deixa
  esse equilíbrio à autoridade ou tribunal, não ao responsável pelo tratamento sozinho [9].
- **Uma decisão, muitos regimes.** A mesma recusa pode cair sob o RGPD, o Regulamento da IA, uma lei
  setorial e uma lei de um estado dos EUA ao mesmo tempo, cada uma com o seu próprio conteúdo,
  audiência e relógio.

## Solução
Construa o aviso e a contestação como dois serviços em torno de um registo de decisão.

1. **Registo de decisão primeiro.** Em tempo de execução, escreva um registo por decisão: sistema e
   versão de modelo, entradas por referência, resultado, códigos de razão, se a decisão foi
   unicamente automatizada, a base legal e os regimes que se aplicam. O lado da revisão segue o
   [Human-in-the-loop Gate](/patterns/human-in-the-loop-gate).
2. **Aviso de modelos versionados.** Um serviço de aviso lê o registo e renderiza o aviso a partir
   de um modelo por regime e idioma: que um sistema foi utilizado, as razões principais, o que a
   pessoa pode fazer e até quando. A versão do modelo e a hora de envio são escritas de volta ao
   registo. Uma avaliação de fidelidade de código de razão, executada como um
   [Eval Gate in CI](/patterns/eval-gate-in-ci), verifica que as razões que um aviso dá são os
   fatores que o modelo utilizou.
3. **Um caminho de contestação com autoridade.** Uma contestação abre um caso ligado ao id de
   decisão e encaminhado para um revisor que não tomou a decisão original, que vê as entradas, as
   razões e as representações da pessoa, e que pode alterar o resultado. O tempo para decidir e as
   taxas de reversão são monitorizadas por grupo: um revisor que confirma quase tudo é um sinal, não
   uma salvaguarda.
4. **Feche o ciclo.** O resultado da revisão, a sua razão e qualquer correção são escritos no
   registo. As taxas de contestação e reversão alimentam o
   [Drift & Fairness Monitor](/patterns/drift-fairness-monitor), e um aglomerado de decisões
   anuladas num código de razão abre um problema contra o modelo.

Registo de aviso de decisão ilustrativo, escrito pelo serviço de aviso e completado pelo caminho de
contestação:

```json
{
  "decision_id": "cc4-2026-09-18-0192",
  "subject": "credit-check-04@3.2",
  "solely_automated": true,
  "regimes": ["GDPR Art. 22", "Regulation B 1002.9"],
  "outcome": "declined",
  "reason_codes": ["R07 payment arrears", "R12 short credit history"],
  "notice": {
    "template": "adverse-action.en.v5",
    "sent_at": "2026-09-18T10:02:11Z",
    "due_by": "2026-10-18"
  },
  "contest": {
    "opened_at": "2026-09-20T08:14:00Z",
    "reviewer_role": "credit-review-l2",
    "outcome": "overturned",
    "reason": "Arrears cleared; the applicant supplied the settlement statement.",
    "closed_at": "2026-09-23T15:40:00Z"
  }
}
```

> **Exemplo (ilustrativo)** Uma verificação de financiamento de equipamentos de uma operadora de
> telecomunicações rejeita um candidato. O serviço de notificação envia a rejeição com dois códigos
> de razão e uma ligação de contestação no prazo de uma hora. O candidato contesta com um extrato de
> liquidação, um revisor de segunda linha revoga a rejeição, e a taxa de revogação para o código de
> razão R07 entra na próxima revisão de limiar do modelo.

## Consequências
A notificação e contestação de cada pessoa podem ser produzidas a pedido, e o canal de contestação
torna-se um sensor para erro e injustiça do modelo. O custo é um serviço de notificação com modelos
por regime para manter atualizados, capacidade de revisores com autoridade real, e uma avaliação de
fidelidade de código de razão. Razões fiéis mas inúteis ainda prejudicam a pessoa, portanto teste as
notificações com as pessoas que as recebem.

## Padrões relacionados
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Rights Requests Against Models](/patterns/rights-requests-against-models).

**Correspondências:** Regulamento da IA Art. 26(11), Art. 86 · RGPD Art. 13(2)(f), Art. 15(1)(h),
Art. 22 · UK GDPR Arts. 22A–22D · ECOA / Regulation B 12 CFR 1002.9 · ISO/IEC 42001 A.8.2, A.9.2 ·
NIST AI RMF MEASURE 3.3, MANAGE 4.1, MAP 3.5 · Layer 04 Runtime Controls & Observability / Layer 05
Assurance & Continuous Compliance.

Os ids de controlo seguem ISO/IEC 42001 Annex A [10] e os ids de subcategoria o NIST AI RMF [11]. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 13(2)(f), 14(2)(g), 15(1)(h), 22). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Press release No 186/23: judgment in Case C-634/21, SCHUFA Holding (Scoring) (a credit score is an automated individual decision where lenders give it a determining role). Court of Justice of the EU. 2023-12-07. https://curia.europa.eu/jcms/upload/docs/application/pdf/2023-12/cp230186en.pdf (verified: primary)
[3] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; Art. 22C safeguards: information, representations, human intervention, contest; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[4] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(11) informing persons subject to Annex III decisions; Art. 86(1) and (3) right to explanation, subsidiary to other Union law; Art. 113, general application from 2 Aug 2026). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Annex III high-risk requirements from 2 Dec 2027); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[6] 12 CFR 1002.9 (Regulation B, notifications: 1002.9(a)(1) action taken notified within 30 days of a completed application; 1002.9(b)(2) specific principal reasons). eCFR (text as of 2026-09-01). 2026-09-01. https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9 (verified: primary)
[7] Consumer Financial Protection Circular 2022-03, Adverse action notification requirements in connection with credit decisions based on complex algorithms (ECOA and Regulation B; withdrawn by the CFPB on 2025-05-12, 90 FR 20084, FR Doc. 2025-08286, item 14, although the page shows no withdrawal banner as of 2026-09-24). Consumer Financial Protection Bureau. 2022-05-26. https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/ (verified: primary)
[8] SB26-189, Automated Decision-Making Technology (repeals and re-enacts SB 24-205; signed 2026-05-14; effective 2027-01-01; deployer notice, 30-day explanation, human review, three-year records). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[9] Press release No 22/25: judgment in Case C-203/22, Dun & Bradstreet Austria (explanation of the procedure and principles actually applied; an algorithm alone is not an explanation; trade secrets balanced by the authority or court). Court of Justice of the EU. 2025-02-27. https://curia.europa.eu/site/upload/docs/application/pdf/2025-02/cp250022en.pdf (verified: primary)
[10] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.9.2 processes for responsible use of AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[11] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MAP 3.5 human oversight processes; MEASURE 3.3 feedback and appeal processes for end users and impacted communities; MANAGE 4.1 post-deployment monitoring plans, including appeal and override). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[12] Withdrawn guidance (Circular 2022-03 on adverse-action notices for credit decisions based on complex algorithms, 87 FR 35864, withdrawn on 12 May 2025 by the notice at 90 FR 20084). Consumer Financial Protection Bureau. 2025-05-12. https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/ (verified: primary)
