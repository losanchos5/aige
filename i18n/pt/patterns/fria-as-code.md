---
lang: pt
source: bok/patterns/fria-as-code.md
sourceHash: "dd24efa21bad73918c74ee9e686aba9d023e209a786d176e3dcc383f4058f3b4"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: fria-as-code
title: FRIA-as-Code
layer: 1
secondaryLayer: 2
order: 11
summary: "Cada avaliação de impacto (ISO/IEC 42005 AIIA, AIPD, FRIA) mantida como uma base de factos versionada, ligada aos seus controlos e reabertas quando o sistema muda."
---

# Padrão: FRIA-as-Code

**Resumo:** Mantenha a avaliação de impacto sobre os direitos fundamentais como um artefato
versionado e revisto, referenciado de forma cruzada à avaliação de impacto sobre a proteção de
dados, para que uma avaliação de direitos seja uma entrada para o design que se atualiza com o
sistema, não um documento produzido uma vez e arquivado. Generalizado, isto é
**Impact-Assessment-as-Code**: cada avaliação de impacto que um sistema desencadeia (a avaliação de
impacto do sistema de IA, ou AIIA, que a ISO/IEC 42005 descreve, a AIPD do RGPD e a FRIA do
Regulamento da IA) é uma base de factos partilhada com várias vistas, cada uma com o seu próprio
acionador, revisor e regra de reavaliação. O padrão mantém o seu nome e endereço original para que
as ligações publicadas para ele ainda se resolvam.

## Objetivos
Mantenha a FRIA e a sua AIPD referência cruzada em direto e ligadas aos controlos que exigem, para
que uma mudança no sistema desencadeie uma revisão do seu impacto sobre os direitos. Estenda a mesma
disciplina à AIIA, para que um conjunto de factos sobre grupos afetados, danos e controlos alimente
cada avaliação e nenhuma das duas avaliações discorde sobre o mesmo sistema.

## Utilizadores-alvo
Engenheiro de governação da IA, EPD, jurídico/conformidade, a equipa de modelo que executa a AIIA.

## Partes interessadas afetadas
Titulares de dados, pessoas afetadas (incluindo pessoas que nunca usam o sistema), responsáveis pela
implantação, prestadores, reguladores.

## Princípios relevantes
Comece a partir de um modo de falha ou dano nomeado; instrumente a compilação para produzir a sua
própria prova.

## Contexto
Um responsável pela implantação de um sistema de IA de risco elevado sujeito ao Artigo 27 do
Regulamento da IA da UE, avaliação de impacto sobre os direitos fundamentais, onde uma AIPD sob o
Artigo 35 do RGPD pode já existir e sobrepor-se. Do lado do prestador, uma organização que executa
um sistema de gestão de IA avalia o impacto de cada sistema de IA sobre indivíduos, grupos e
sociedade ao longo do seu ciclo de vida, conforme solicitado no Anexo A.5 da ISO/IEC 42001 e
orientado pela ISO/IEC 42005. Um sistema pode estar sujeito aos três em simultâneo.

## Problema
Uma avaliação de impacto sobre os direitos fundamentais escrita uma única vez como um documento Word
descreve o impacto sobre os direitos num único momento e nunca é revisitada quando o sistema muda. O
esforço duplicado entre a avaliação de impacto sobre os direitos fundamentais e a AIPD desperdiça
trabalho e deixa as duas fora de sincronização. Adicione uma avaliação de impacto sobre a IA
separada escrita pela equipa de modelo e a organização tem três relatos do mesmo dano, pontuados em
escalas diferentes, revistos por pessoas diferentes, e desatualizados em datas diferentes.

## Solução
Modele a avaliação de impacto sobre os direitos fundamentais como dados estruturados cobrindo a
finalidade prevista, grupos afetados, riscos para os direitos, e os controlos mitigadores, com cada
mitigação ligada ao controlo que a implementa (uma Policy Card, um Eval Gate, um guardrail). Faça
referência cruzada com a AIPD para que elementos partilhados sejam escritos uma única vez.
Armazene-a com a entrada do registo e reabra-a em caso de mudança significativa. A avaliação de
impacto sobre os direitos fundamentais do Artigo 27 do Regulamento da IA da UE e a sua referência
cruzada com a AIPD definem o âmbito [1].

> **Exemplo (ilustrativo)** A avaliação de impacto sobre os direitos fundamentais de um sistema de
> elegibilidade de benefícios liga cada risco identificado aos direitos das pessoas a uma avaliação
> específica e guardrail; quando o modelo é retreinado, a avaliação de impacto sobre os direitos
> fundamentais assinala quais as mitigações que necessitam de re-verificação.

### Uma base de factos, três vistas

Mantenha um registo por sistema com os factos que cada avaliação necessita: a finalidade prevista e
os usos fora do âmbito, os grupos afetados, cada dano pontuado nas mesmas dimensões (gravidade,
escala, reversibilidade, duração, probabilidade), e cada mitigação com o id do controlo e avaliação
que a implementam. Processe as três avaliações como vistas desse registo. O esquema house
[`impact-assessment.v1.json`](/schemas/impact-assessment.v1.json) faz isto com um campo `type`
(`aiia`, `dpia_addendum`, `fria`), campos partilhados para riscos, mitigações e resultado, e campos
específicos do tipo para o que apenas uma avaliação solicita; um
[modelo Markdown](/templates/impact-assessment.md) preenchível fica ao lado.

| Vista | Quem a realiza | O que a desencadeia | Quando | O que acrescenta aos factos partilhados |
|---|---|---|---|---|
| AIIA (ISO/IEC 42005) | A organização que desenvolve ou fornece o sistema | O seu sistema de gestão de IA (ISO/IEC 42001 A.5.2 a A.5.5) | Ao longo do ciclo de vida, desde a conceção [2][3] | Impactos sociais; documentação da avaliação em si |
| AIPD (RGPD Art. 35) | O responsável pelo tratamento | Tratamento suscetível de resultar num risco elevado | Antes do tratamento [4] | Necessidade e proporcionalidade; o parecer do encarregado da proteção de dados; consulta prévia se o risco elevado persistir |
| FRIA (Regulamento da IA Art. 27) | Responsáveis pela implantação de organismos públicos e serviços públicos, e responsáveis pela implantação de sistemas do Anexo III 5(b) e (c) | Primeira utilização de um sistema de risco elevado do Anexo III (não ponto 2) | Antes da primeira utilização [1] | Categorias afetadas, medidas de supervisão, mecanismos de reclamação; resultados notificados à autoridade de fiscalização do mercado |

Duas regras mantêm as vistas honestas. Uma avaliação de impacto sobre os direitos fundamentais pode
basear-se numa AIPD que já cobre o mesmo terreno (`Art. 27(4)`) [1], para que os campos partilhados
sejam escritos uma única vez e referenciados, nunca copiados. E uma vista nunca é editada por si só:
uma mudança nos factos regenera cada vista, para que a AIPD não possa dizer uma coisa sobre os
grupos afetados enquanto a avaliação de impacto sobre os direitos fundamentais diz outra.

### Desencadeadores de re-avaliação como código

Escreva os desencadeadores como condições que o registo avalia, não como lembretes de calendário:
uma finalidade prevista nova ou alargada; retreinamento numa nova fonte de dados; uma população
afetada nova, idioma ou jurisdição; um limiar alterado; um incidente ou quase-incidente do
[Pipeline de Incidentes](/patterns/incident-pipeline); um sinal de monitorização fora da sua banda;
lei ou orientação nova; e uma data de revisão agendada. O Regulamento da IA solicita ao responsável
pela implantação que atualize a avaliação de impacto sobre os direitos fundamentais quando qualquer
elemento avaliado muda [1], e o RGPD solicita uma revisão quando o risco do tratamento muda [4]; um
único desencadeador reabre cada vista que a mudança toca, e o revisor vê um diff em vez de três
documentos novos. O [Capítulo 14](/bok/governing-development#impact-assessments-compared) compara
estas avaliações com as avaliações de impacto algorítmico, auditorias de enviesamento e validações
de modelo que podem aderir à mesma base de factos.

### Realização versus revisão

O executor é proprietário dos factos; o revisor desafia-os. Antes da aprovação, o revisor verifica
que o âmbito corresponde ao registo de caso de uso atual, os grupos afetados incluem pessoas que
nunca utilizam o sistema, cada classificação de risco cita evidência (um id de avaliação, um
relatório de teste, um perfil de dados), cada mitigação liga a um controlo que funciona, o risco
residual é aceite por alguém com autoridade para o aceitar, e os desencadeadores são escritos como
condições que um pipeline pode avaliar. Mantenha o veredicto e o nome do revisor no registo, para
que um auditor possa ver quem desafiou o quê.

## Consequências
A avaliação de direitos mantém-se atual e rastreável aos controlos, e as sobreposições com a AIPD
não são duplicadas. A avaliação de impacto sobre a IA, AIPD e avaliação de impacto sobre os direitos
fundamentais concordam porque leem os mesmos factos, e uma mudança de sistema reabre todas elas em
simultâneo. O custo é a modelagem, concordar uma única escala de pontuação entre legal, privacidade
e engenharia, e a disciplina de tratar a avaliação como viva.

## Padrões relacionados
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card); [Runtime Guardrail](/patterns/runtime-guardrail);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Human-in-the-loop Gate](/patterns/human-in-the-loop-gate);
[Incident Pipeline](/patterns/incident-pipeline).

**Correspondências:** Regulamento da IA da UE Artigo 27 (avaliação de impacto sobre os direitos
fundamentais), Artigo 9 · RGPD Artigo 35 (AIPD) · ISO/IEC 42005 · NIST AI RMF (Mapa) · Camada 01
Governação como Código / Camada 02 Inventário e Transparência.

Os rótulos de função seguem o NIST AI RMF [5]. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] Regulation (EU) 2024/1689 (AI Act), Art. 27 (fundamental-rights impact assessment by deployers that are bodies governed by public law or private entities providing public services, and deployers of Annex III points 5(b) and (c) systems; before first use; update when an assessed element changes; results notified to the market-surveillance authority; 27(4) relationship with the DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] ISO/IEC 42005:2025, AI system impact assessment (guidance for assessing impacts on individuals, groups and society throughout the life cycle, updated as needed; complements ISO/IEC 42001 and ISO/IEC 23894). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: primary)
[3] ISO/IEC 42001:2023, Annex A.5 (A.5.2 AI system impact assessment process; A.5.3 documentation of AI system impact assessments; A.5.4 impact on individuals or groups of individuals; A.5.5 societal impacts). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Regulation (EU) 2016/679 (GDPR), Art. 35 (data protection impact assessment: 35(2) DPO advice, 35(3) mandatory cases, 35(7) contents, 35(11) review when the risk changes) and Art. 36 (prior consultation). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[5] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
