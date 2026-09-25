---
lang: pt
source: bok/patterns/deactivation-localisation-retirement-runbook.md
sourceHash: "b3bd2689b5ce44e9a23c2fb7e6824d011975d7e17d8518ec6dc57e8ddd53488c"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: deactivation-localisation-retirement-runbook
title: "Deactivation, Localisation & Retirement Runbook"
layer: 4
secondaryLayer: 2
order: 33
summary: "Um manual de procedimentos perfurado para degradar, desligar por jurisdição ou reformar um sistema de IA, com gatilhos nomeados, uma autoridade de decisão e evidência em cada passo."
---

# Patrón: Deactivation, Localisation & Retirement Runbook

**Resumo:** Escreva, antes de ser necessário, como um sistema de IA é degradado, desligado, restrito
às jurisdições onde pode funcionar, e finalmente reformado: o limiar e gatilhos legais, o papel que
decide, a evidência preservada primeiro, os modos graduados aquém do encerramento, os comutadores
por jurisdição, e os passos de reforma desde análise de dependência até uma entrada de registo
reformado. Construa os comutadores como alternâncias testadas, faça-as funcionar num calendário, e
registe cada decisão e passo como evidência.

## Objetivos
Faça da paragem, restrição e reforma de um sistema de IA um procedimento executável e testado com um
proprietário de decisão nomeado, para que um gatilho regulatório ou de desempenho leve a uma ação
limitada dentro de horas, e uma reforma não deixe nenhuma cópia em execução, nenhuma credencial
ativa e nenhuma evidência perdida.

## Utilizadores-alvo
Engenheiro de governação da IA, proprietário do sistema, SRE, engenheiro de segurança, legal.

## Partes interessadas afetadas
Utilizadores e pessoas afetadas, trabalhadores que dependem do sistema, consumidores a jusante,
prestadores e responsáveis pela implantação na cadeia, autoridades de fiscalização do mercado.

## Princípios relevantes
Dê a cada controlo poder de execução; registe e limite cada ator antes de agir; instrumente a
construção para produzir a sua própria prova.

## Contexto
Alguns gatilhos para parar um sistema são legais, não técnicos. Sob o Regulamento da IA da UE um
responsável pela implantação de risco elevado que tenha razão para considerar que o sistema
apresenta um risco deve informar o prestador e a autoridade e suspender o uso (`Art. 26(5)`); um
prestador deve tomar ações corretivas, incluindo retirada, desativação ou recolha de um sistema não
conforme (`Art. 20`); uma autoridade pode exigir o mesmo para um sistema que apresenta um risco
(`Art. 79`); e uma prática pode tornar-se proibida (`Art. 5`) [1]. O NIST AI RMF pede mecanismos,
com responsabilidades atribuídas, para substituir, desengajar ou desativar sistemas cujo desempenho
ou resultados são inconsistentes com o uso previsto, e processos para desativar sistemas com
segurança, de uma forma que não aumente o risco [2]. Os registos sobrevivem ao sistema: os
prestadores mantêm documentação durante dez anos e os responsáveis pela implantação mantêm registos
durante pelo menos seis meses [1]. Criar uma política e controlos para desativar ou localizar um
sistema quando a regulamentação ou desempenho o exigem faz parte da governação da implantação e uso
no Body of Knowledge AIGP da IAPP (competência IV.C) [3]. Para agentes, o
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) é a forma instantânea deste
manual de procedimentos.

## Problema
A maioria dos sistemas tem um interruptor e uma esperança. Quando um gatilho dispara, ninguém sabe
quem pode decidir, os registos são sobrescritos enquanto a reunião decorre, e a única ação
disponível é desligar tudo, em toda a parte, o que é frequentemente pior do que a falha. Um
classificador incorporado num produto de um fornecedor não tem interruptor nenhum. Na reforma, uma
entrada é eliminada do inventário enquanto uma cópia continua a servir, uma conta de serviço
permanece ativa e a evidência de que o sistema foi alguma vez governado perde-se com ela.

### Forças
- **Velocidade contra deliberação.** Um gatilho legal exige ação imediata; um encerramento com
  dependentes precisa de um plano de contingência pronto.
- **Precisão contra simplicidade.** Desligar uma região, idioma ou grupo limita o dano e adiciona
  interruptores para construir e testar.
- **Preservação contra eliminação.** A evidência deve ser congelada antes de qualquer coisa ser
  parada, enquanto a proteção de dados pressiona para eliminar o que já não é necessário.
- **Sistemas incorporados em fornecedores.** Quando o modelo está dentro do produto de um
  fornecedor, o interruptor depende do contrato.

## Solução
Mantenha um runbook por sistema, armazenado com a sua entrada de registo e executado no calendário
de manutenção.

1. **Gatilhos e autoridade.** Liste gatilhos de limiar (um piso ultrapassado e não recuperado numa
   janela, uma lacuna de equidade acima do seu limite, uma gravidade de incidente) e gatilhos legais
   (o dever `Art. 26(5)`, uma ação corretiva do prestador, uma medida de uma autoridade, uma prática
   recentemente proibida), cada um com o papel que decide e o tempo permitido. As violações chegam
   do [Drift & Fairness Monitor](/patterns/drift-fairness-monitor).
2. **Preservar primeiro.** O primeiro passo de cada caminho congela os registos, aplica uma retenção
   legal e tira uma fotografia das versões fixadas, para que a evidência sobreviva à paragem.
3. **Modos graduados.** Construa os modos intermédios como alternâncias operacionais e teste-os:
   apenas aviso, limiares de confiança elevados com abstenção para uma pessoa, respostas apenas
   fundamentadas, âmbito desligado para um grupo, idioma, região ou função, volta à coorte piloto, e
   desligado com o processo de contingência.
4. **Localização por jurisdição.** Mantenha a jurisdição como uma entrada de política: conjuntos de
   regras por jurisdição como código, instâncias regionais onde a residência as exige, e
   sinalizadores por região para que um mercado possa ser desligado sem tocar nos outros. Lance numa
   jurisdição apenas quando se demonstre que os seus deveres são cumpridos.
5. **Reforma como um runbook.** Analise as dependências (o
   [Downstream Use Register](/patterns/downstream-use-register) lista os consumidores), mude os
   utilizadores para o plano de contingência, envie avisos de encerramento através do
   [Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline), arquive a
   fotografia final de evidência, mantenha ou elimine pesos, corpora e registos conforme a licença,
   base legal e retenção decidem, revogue cada identidade e credencial, defina a entrada de registo
   para `retired`, e deixe que [Shadow-AI Discovery](/patterns/shadow-ai-discovery) confirme que
   nenhuma cópia ainda está em execução. O registo utiliza o
   [esquema de runbook de descomissionamento](/resources/templates#schema-decommissioning-runbook).
6. **Teste-o.** Execute um teste de desativação pelo menos anualmente por sistema: tempo para
   decidir, tempo para o modo degradado, tempo para desligar, e se a evidência foi preservada.

Registo de reforma ilustrativo, como um runbook de descomissionamento:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/decommissioning-runbook.v1.json",
  "runbook_id": "rb-retire-csa-01",
  "subject": "csa-01@2026-09-18",
  "reason": "replaced",
  "replaced_by": "csa-02",
  "decision_ref": "ddr-csa-02-v1",
  "dependencies": ["contact-centre routing", "weekly quality report"],
  "notifications": [
    { "party": "users", "method": "Release note to contact-centre agents", "sent_at": "2027-03-01" },
    { "party": "deployers", "method": "Change notice to the PT business unit", "sent_at": "2027-03-01" }
  ],
  "steps": [
    { "step_id": "S1", "action": "archive_evidence", "detail": "Freeze logs and snapshot pinned versions.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-29T08:00:00Z" },
    { "step_id": "S2", "action": "disable_traffic", "detail": "Flag csa01.serve off in every region.", "owner": "ml-platform", "status": "done", "completed_at": "2027-03-31T06:00:00Z" },
    { "step_id": "S3", "action": "revoke_identity", "detail": "Revoke the workload identity and API keys.", "owner": "platform-identity", "status": "done", "completed_at": "2027-03-31T07:00:00Z" },
    { "step_id": "S4", "action": "retire_register_entry", "detail": "Set status to retired; keep the entry.", "owner": "ai-governance", "status": "done", "completed_at": "2027-03-31T09:00:00Z" },
    { "step_id": "S5", "action": "other", "detail": "Discovery sweep confirms no copy still serves.", "owner": "security-operations", "status": "pending" }
  ],
  "data_disposition": [
    { "dataset": "chat logs", "action": "retain", "basis": "log retention rule and open complaints", "until": "2027-09-30" },
    { "dataset": "retrieval index csa-kb", "action": "delete" }
  ],
  "evidence_archive": { "location": "https://archive.example.org/ai/csa-01", "retain_until": "2033-03-31" },
  "status": "in_progress"
}
```

> **Exemplo (ilustrativo)** Uma regra nacional recentemente aplicável restringe respostas
> automatizadas sobre tópicos de saúde num mercado. O runbook nomeia o chefe da unidade de negócio
> como proprietário da decisão; dentro do dia a evidência é congelada, a bandeira regional muda o
> assistente para respostas apenas fundamentadas lá com tópicos de saúde no âmbito desligado, outros
> mercados não são afetados, e a decisão, as alternâncias e os avisos estão no armazém de garantia.

## Consequências
A paragem torna-se proporcional e rápida, a localização é um interruptor em vez de uma
reimplantação, e a reforma deixa um registo completo e retido em vez de uma lacuna. O custo é
construir e testar os modos e sinalizadores, conjuntos de regras por jurisdição para manter
atualizados, termos de contrato que dão um interruptor sobre IA incorporada em fornecedor, e tempo
de teste. Um modo não testado não é um controlo: o teste é o que o torna um.

## Padrões relacionados
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Drift & Fairness Monitor](/patterns/drift-fairness-monitor);
[Downstream Use Register](/patterns/downstream-use-register);
[Disclosure & Notification Pipeline](/patterns/disclosure-notification-pipeline);
[Shadow-AI Discovery](/patterns/shadow-ai-discovery);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria).

**Correspondências:** Regulamento da IA Art. 5, Art. 18, Art. 20, Art. 26(5), Art. 26(6), Art. 79 ·
ISO/IEC 42001 A.6.2.5, A.6.2.6 · NIST AI RMF GOVERN 1.7, MANAGE 2.4, MANAGE 4.1 · OWASP Agentic
ASI10 · Layer 04 Runtime Controls & Observability / Layer 02 Inventory & Transparency.

Os ids de ameaça seguem o OWASP Top 10 for Agentic Applications 2026 [4], os ids de controlo ISO/IEC
42001 Annex A [5] e os ids de subcategoria o NIST AI RMF [2]. Os mapeamentos são ilustrativos, não
uma alegação de conformidade.

## Sources

[1] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 5 prohibited practices; Art. 18(1) documentation kept ten years; Art. 20 corrective actions; Art. 26(5) suspend and inform; Art. 26(6) logs kept at least six months; Art. 79 systems presenting a risk). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[2] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.7 decommissioning and phasing out safely; MANAGE 2.4 supersede, disengage or deactivate; MANAGE 4.1 post-deployment monitoring plans, including decommissioning). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[3] AIGP Body of Knowledge and Exam Blueprint, version 2.1 (competency IV.C, governing AI deployment and use: a policy and controls to deactivate or localise an AI system as necessary; approved 9 Sep 2025, effective 2 Feb 2026; cited by competency code and paraphrased; this site is not affiliated with or endorsed by IAPP). IAPP. 2025-09-09. https://prod.iapp.org/media/pdf/certification/AIGP_Cert_BOK_2025_FINAL_v2.1.0.pdf (verified: primary)
[4] Top 10 for Agentic Applications 2026 (ASI10 Rogue Agents). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[5] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.6.2.5 AI system deployment; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
