---
lang: pt
source: bok/patterns/disclosure-notification-pipeline.md
sourceHash: "75d5ce887866ae0d4a4feb2e51693f55cd836ceeb2c2162e40ccf2c1d8501291"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: disclosure-notification-pipeline
title: "Disclosure & Notification Pipeline"
layer: 5
secondaryLayer: 2
order: 32
summary: "Divulgações e notificações geradas a partir do registo, a partir de modelos versionados por audiência e relógio, com cada notificação enviada registada como evidência."
---

# Patrón: Disclosure & Notification Pipeline

**Resumo:** Gere cada declaração voltada para o exterior sobre um sistema de IA a partir de uma
única fonte de verdade, o registo: as divulgações proativas (um aviso de interação com IA, etiquetas
de conteúdo, a página de transparência e ficha de sistema em linguagem clara, avisos para
trabalhadores e para pessoas sujeitas a decisões) e as notificações reativas (ao prestador,
autoridades, pessoas afetadas, clientes e público) que um gatilho inicia num relógio. Os modelos são
versionados como código, as aprovações são registadas, e cada notificação enviada é um registo de
evidência com a sua audiência, versão de modelo e marca de tempo.

## Objetivos
Certifique-se de que as pessoas e organismos que devem ser informados sobre um sistema de IA recebem
a informação correta, a tempo, de uma única voz, e possam provar o que foi dito a quem e quando.

## Utilizadores-alvo
Engenheiro de governação da IA, responsável de comunicações, legal e conformidade, EPD, engenheiro
de produto.

## Partes interessadas afetadas
Utilizadores, trabalhadores e seus representantes, pessoas afetadas, clientes empresariais e
parceiros, prestadores e responsáveis pela implantação acima e abaixo da cadeia, autoridades de
supervisão e fiscalização do mercado, público e media.

## Princípios relevantes
Instrumente a construção para produzir a sua própria prova; torne o caminho governado o caminho mais
fácil; dê dentes a cada controlo.

## Contexto
Os deveres de transparência agora ligam-se a superfícies e relógios específicos. Sob o Regulamento
da IA da UE, os prestadores devem conceber sistemas que interagem com pessoas para que saibam que é
um sistema de IA, e devem marcar saídas sintéticas; os responsáveis pela implantação devem informar
pessoas expostas a reconhecimento de emoções ou categorização biométrica e divulgar falsificações
profundas; e a informação deve chegar às pessoas o mais tardar na primeira interação ou exposição
(`Art. 50(1)`–`(5)`) [1]. O Artigo 50 aplica-se desde 2 de agosto de 2026, e os sistemas generativos
já no mercado antes dessa data têm até 2 de dezembro de 2026 para marcar saídas [2]. Os responsáveis
pela implantação de alto risco devem também informar trabalhadores antes da utilização no local de
trabalho, informar pessoas sujeitas a decisões do Anexo III, e informar o prestador e autoridades
quando um sistema apresenta um risco (`Art. 26(5)`, `(7)`, `(11)`) [1]. O RGPD acrescenta
notificação de violação à autoridade no prazo de 72 horas quando viável e às pessoas afetadas sem
demora indevida quando o risco para elas é elevado [3]. Fora da UE, a Lei Básica de IA da Coreia
exigiu aviso prévio de IA generativa e de elevado impacto e etiquetas em saídas geradas desde 22 de
janeiro de 2026 [4]; a Lei de Transparência de IA da Califórnia, em vigor desde 2 de agosto de 2026,
pede aos grandes prestadores de IA generativa divulgações manifestas latentes e opcionais [5]; e
Utah exige uma resposta clara quando um consumidor pergunta se está a falar com IA [6]. Estabelecer
planos de comunicação externa faz parte da governação da implantação e utilização no Body of
Knowledge AIGP da IAPP (competência IV.C) [7].

## Problema
As divulgações são escritas uma vez, manualmente, por superfície, e afastam-se do que está em
execução: a página de transparência descreve o modelo do ano passado, o aviso do widget de chat
desapareceu numa reformulação, e ninguém consegue dizer quais trabalhadores foram informados antes
do sistema entrar em funcionamento. As notificações reativas são redigidas sob pressão quando o
relógio já está em funcionamento, por quem estiver disponível, sem um registo do que foi enviado. O
dever de cada jurisdição é tratado por uma equipa diferente com um modelo diferente.

### Forças
- **Uma voz contra muitas audiências.** Um regulador, um cliente e a imprensa precisam de conteúdo
  diferente dos mesmos factos.
- **Velocidade contra precisão.** Os relógios funcionam a partir da consciência, enquanto os factos
  chegam tarde; uma declaração de espera deve dizer apenas o que é conhecido.
- **Consistência contra localização.** Os deveres e línguas diferem por jurisdição, mas os factos
  não devem.
- **Proativo contra reativo.** Os deveres de divulgação são contínuos; os deveres de notificação
  disparam em eventos.

## Solução
Trate a divulgação como um pipeline do registo para cada audiência, com evidência no final.

1. **Uma única fonte de verdade.** A entrada do registo contém os factos em que as divulgações se
   baseiam: finalidade, prestador, versão do modelo, jurisdições, se o sistema interage com pessoas,
   gera conteúdo, toma decisões sobre pessoas ou é utilizado no trabalho. A página de transparência
   e a ficha de sistema em linguagem clara são geradas a partir dela em cada lançamento, portanto
   não podem afastar-se do que está em execução.
2. **Uma matriz de dever por sistema.** Um conjunto de regras mapeia factos do registo para deveres:
   divulgação de interação, marcação e etiquetagem de conteúdo, informação de trabalhadores, avisos
   de decisão (ver [Decision Notice & Contest Path](/patterns/decision-notice-contest-path)), avisos
   locais por jurisdição. Cada dever nomeia uma superfície, um modelo e um teste que o aviso
   renderiza lá.
3. **Modelos como código.** Os modelos por audiência e língua vivem no controlo de versão com um
   proprietário e uma regra de aprovação; uma mudança de modelo é um diff revisto. As declarações de
   espera existem em esqueleto antes de qualquer incidente.
4. **Gatilhos com relógios.** Um incidente, uma violação, uma mudança material, uma depreciação ou
   uma reforma emite um gatilho; o pipeline seleciona as audiências da matriz e do
   [Downstream Use Register](/patterns/downstream-use-register), inicia cada relógio e redige cada
   notificação. Os incidentes chegam do [Incident Pipeline](/patterns/incident-pipeline).
5. **Evidência por notificação.** Cada notificação enviada escreve um registo: audiência, gatilho,
   versão de modelo, aprovador, canal, marca de tempo. O registo de decisão de implantação aponta
   para os proativos (seus deveres `workers_informed` e `affected_persons_informed`, no
   [esquema de registo de decisão de implantação](/resources/templates#schema-deployment-decision-record)),
   e o bloco de relatório do registo de incidente aponta para os reativos.

Manifesto de divulgação ilustrativo gerado a partir do registo, com uma notificação enviada:

```json
{
  "subject": "csa-01@2026-09-18",
  "generated_at": "2026-09-18T07:00:00Z",
  "proactive": [
    { "duty": "EU AI Act Art. 50(1)", "surface": "chat widget", "template": "ai-disclosure.es-en.v3", "test": "e2e:disclosure-renders" },
    { "duty": "Korea AI Basic Act Art. 31(1)", "surface": "terms of service (KR)", "template": "kr-prior-notice.ko.v1", "test": "e2e:kr-terms-notice" },
    { "duty": "transparency page", "surface": "/ai/csa-01", "template": "system-card.v2", "test": "build:card-matches-registry" }
  ],
  "reactive": [
    { "trigger": "serious_incident", "audience": "provider", "clock": "immediately", "template": "si-notice.v2" },
    { "trigger": "personal_data_breach", "audience": "supervisory_authority", "clock": "72h where feasible", "template": "breach-art33.v4" },
    { "trigger": "material_change", "audience": "business_customers", "clock": "30 days before, per contract", "template": "change-notice.v2" }
  ],
  "sent": [
    {
      "notice_id": "ntc-2026-0091",
      "trigger": "material_change",
      "audience": "business_customers",
      "template": "change-notice.v2",
      "approved_by": "communications-owner",
      "sent_at": "2026-09-01T10:00:00Z"
    }
  ]
}
```

> **Exemplo (ilustrativo)** Um assistente de suporte muda para um novo modelo de fornecedor. O
> lançamento regenera a ficha de sistema e a página de transparência a partir do registo, o pipeline
> envia o aviso de mudança contratual aos clientes empresariais 30 dias antes do modelo aprovado, e
> uma verificação em CI falha a construção quando um widget de chat reformulado já não renderiza o
> aviso de interação com IA.

## Consequências
O que a organização diz sobre a sua IA corresponde ao que está em execução, as notificações saem a
tempo a partir de modelos aprovados, e cada uma é comprovável. O custo é a matriz de dever a manter
conforme as leis mudam, propriedade de modelo entre legal, comunicações e produto, e testes de
renderização em cada superfície. O pipeline produz a notificação; se a notificação é compreendida
ainda precisa de teste com os seus leitores.

## Padrões relacionados
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Incident Pipeline](/patterns/incident-pipeline);
[Downstream Use Register](/patterns/downstream-use-register);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Deactivation, Localisation & Retirement Runbook](/patterns/deactivation-localisation-retirement-runbook).

**Correspondências:** Regulamento da IA Art. 26(5), Art. 26(7), Art. 26(11), Art. 50 · RGPD Art. 33,
Art. 34 · Lei Básica de IA da Coreia Art. 31 · ISO/IEC 42001 A.8.2, A.8.3, A.8.4, A.8.5 · NIST AI
RMF MANAGE 4.3, GOVERN 4.2, GOVERN 5.1 · Layer 05 Assurance & Continuous Compliance / Layer 02
Inventory & Transparency.

Os ids de controlo seguem ISO/IEC 42001 Annex A [8] e os ids de subcategoria o NIST AI RMF [9]. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(5), (7) and (11) deployer information duties; Art. 50(1)–(5) transparency obligations). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (Art. 111(4): Art. 50(2) marking for generative systems placed on the market before 2 Aug 2026 from 2 Dec 2026); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 33 notification to the supervisory authority within 72 hours where feasible; Art. 34 communication to the data subject). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[4] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (Act No. 20676, in force 2026-01-22; Art. 31 prior notice, output labelling and realistic synthetic content). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[5] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[6] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (disclosure on clear request; high-risk AI interaction; effective 2025-05-07). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[7] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: establish external communication plans; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[8] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.8.2 system documentation and information for users; A.8.3 external reporting; A.8.4 communication of incidents; A.8.5 information for interested parties). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 4.2 impacts documented and communicated more broadly; GOVERN 5.1 feedback from those external to the team; MANAGE 4.3 incidents and errors communicated to relevant AI actors, including affected communities). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
