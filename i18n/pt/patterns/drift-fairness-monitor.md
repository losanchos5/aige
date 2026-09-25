---
lang: pt
source: bok/patterns/drift-fairness-monitor.md
sourceHash: "b9828bdd1d92a29e23961aa63df5e010aeeec6aaebd0c9f3196fee218e82cbf5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: drift-fairness-monitor
title: "Drift & Fairness Monitor"
layer: 4
secondaryLayer: 5
order: 30
summary: "Sinais de produção para desvio, qualidade e equidade por grupo, cada um com um limiar, um proprietário e uma consequência pré-acordada, escritos como evidência."
---

# Patrón: Drift & Fairness Monitor

**Resumo:** Observe um sistema implantado para as formas como se afasta do estado em que foi
aprovado: desvio de entrada, rótulo, conceito, pipeline, modelo de fornecedor e uso, e qualidade e
equidade por grupo. Cada sinal tem um limiar, um proprietário e uma consequência pré-acordada (uma
questão, um retreino, um modo degradado, um incidente, um disjuntor acionado), e cada avaliação
escreve um registo de evidência, portanto "o modelo ainda é adequado e justo" é uma consulta sobre
telemetria em vez de uma crença do dia do lançamento.

## Objetivos
Detete perda de desempenho ou equidade em produção antes das pessoas afetadas a detectarem,
encaminhe cada violação para alguém que possa agir, e mantenha um registo contínuo de que o sistema
foi observado contra os pisos que a sua decisão de implantação estabeleceu.

## Utilizadores-alvo
Engenheiro de governação da IA, ML platform on-call, cientista de dados, proprietário do sistema.

## Partes interessadas afetadas
Pessoas afetadas, especialmente grupos que o sistema pode desfavorecer; operadores e revisores; a
função de risco; prestadores e responsáveis pela implantação que partilham o dever de monitorização.

## Princípios relevantes
Comece por um modo de falha ou dano nomeado; dê dentes a cada controlo; instrumente a construção
para produzir a sua própria prova.

## Contexto
Um sistema que passou as suas avaliações no lançamento pode desviar-se para erro ou injustiça sem
qualquer mudança de código. O desvio de conceito, uma mudança ao longo do tempo na relação que um
modelo aprendeu, é um problema estudado cujo trabalho se divide em deteção, compreensão e adaptação
[1]. O Regulamento da IA pede aos prestadores de sistemas de risco elevado que executem
acompanhamento pós-comercialização e aos responsáveis pela implantação que monitorizem a operação
com base nas instruções de utilização, suspendendo a utilização e informando o prestador quando o
sistema apresenta um risco (`Art. 72`, `Art. 26(5)`), e pede aos sistemas que continuam a aprender
que abordem ciclos de retroalimentação enviesados (`Art. 15(4)`) [2]. Quando a monitorização de
enviesamento precisa de categorias especiais de dados pessoais, o Omnibus Digital estabelece as
condições num novo `Art. 4a` [3]. Alguma legislação exige auditorias periódicas diretamente: a Lei
Local 144 de Nova Iorque exige uma auditoria de enviesamento no prazo de um ano antes de uma
ferramenta de decisão de emprego automatizada ser utilizada [4]. O NIST AI RMF pede que a
funcionalidade e comportamento sejam monitorizados em produção e que a equidade e enviesamento sejam
avaliados e documentados [5].

## Problema
Painéis sem limiares são observados por ninguém. Os rótulos chegam tarde ou nunca, portanto a
precisão não pode ser medida quando importa. O atributo de grupo necessário para medir equidade é
geralmente ausente em tempo de execução. Um sistema generativo pode degradar-se (mais respostas sem
fundamento, mais recusas numa língua) enquanto cada métrica de infraestrutura permanece verde. E uma
violação que não alerta ninguém é apenas um gráfico.

### Forças
- **Atraso de rótulo contra oportunidade.** Proxies livres de resultado (desvio de entrada, taxas de
  seleção, sobreposições, reclamações) chegam agora; desempenho em rótulos frescos chega depois e é
  o que importa.
- **Sensibilidade contra fadiga de alerta.** Limiares apertados apanham desvio cedo e alertam
  pessoas para ruído.
- **Medição de equidade contra privacidade.** Medir por grupo precisa do atributo de grupo, que é
  frequentemente dados de categoria especial com as suas próprias condições legais.
- **Dever partilhado.** Prestador e responsável pela implantação monitorizam cada parte do sistema e
  veem dados diferentes.

## Solução
Execute o monitor como um caminho de sinal da camada 04 que escreve evidência da camada 05,
impulsionado por um plano de monitorização que é dados.

1. **Nomeie o que pode mover.** Para cada sistema, liste as classes de desvio que se aplicam: dados
   (distribuição de entrada), rótulo (taxa base), conceito (relação entrada-para-resultado),
   pipeline (esquema a montante ou passo de recuperação), modelo de fornecedor (o modelo atrás da
   API) e uso (quem o usa, para quê). Escolha uma estatística por classe: um índice de estabilidade
   ou teste de duas amostras em características ou embeddings contra uma janela de referência;
   positivo previsto contra observado; desempenho em rótulos frescos com deteção de ponto de
   mudança; contratos de dados; verificações de fixação de versão; classificação de tópicos de
   tráfego contra o espaço negativo.
2. **Equidade por grupo, com e sem rótulos.** Monitore taxas de seleção ou aprovação por grupo sem
   rótulo necessário; taxas de erro e calibração por grupo uma vez que os resultados chegam, com o
   atraso de rótulo indicado; taxas de sobreposição, reclamação e contestação por grupo do
   [Decision Notice & Contest Path](/patterns/decision-notice-contest-path); e, para sistemas
   generativos, taxas de fundamentação e recusa por tópico e língua. Quando o atributo de grupo não
   é mantido em tempo de execução, use uma amostra consentida ou uma auditoria periódica num
   ambiente seguro.
3. **Limiar, proprietário, consequência.** Cada métrica no plano transporta um limiar, uma janela,
   um proprietário nomeado que pode ser alertado, e a ação que uma violação dispara: abrir uma
   questão, agendar um retreino, mudar um modo degradado, abrir um incidente através do
   [Incident Pipeline](/patterns/incident-pipeline), ou acionar o
   [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker).
4. **Evidência em cada avaliação.** Cada verificação escreve um registo de evidência para o
   armazenamento de garantia através de
   [Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry), sucesso ou falha,
   portanto a ausência de violações é ela própria evidenciada.
5. **O plano como dados.** O plano de monitorização do responsável pela implantação reutiliza o
   [esquema de plano de acompanhamento pós-comercialização](/resources/templates#schema-post-market-monitoring-plan),
   e uma mudança de limiar é um diff revisto, como qualquer mudança a um controlo.

Plano de monitorização ilustrativo para um assistente de suporte, como um registo de plano de
acompanhamento pós-comercialização:

```json
{
  "$schema": "https://aigovernanceengineer.com/schemas/post-market-monitoring-plan.v1.json",
  "plan_id": "mon-csa-01",
  "subject": "csa-01@2026-09-18",
  "scope": "All chats in ES and PT, including escalations to human agents and customer complaints.",
  "data_sources": [
    { "source": "chat telemetry with groundedness scores", "type": "telemetry", "owner": "ml-platform" },
    { "source": "agent overrides and escalations", "type": "deployer_feedback", "owner": "contact-centre-ops" },
    { "source": "complaints that mention the assistant", "type": "user_complaint", "owner": "customer-care" },
    { "source": "monthly re-run of the regression suite on sampled chats", "type": "eval_rerun", "owner": "model-validation" }
  ],
  "metrics": [
    {
      "metric": "groundedness of sampled answers",
      "threshold": "< 0.90 over 7 days",
      "cadence": "daily",
      "failure_mode": "ungrounded answers",
      "alert_route": "ml-platform"
    },
    {
      "metric": "resolution-rate ratio, lowest language to highest",
      "threshold": "< 0.90 over 14 days",
      "cadence": "weekly",
      "failure_mode": "worse service for one language group",
      "alert_route": "ai-governance"
    },
    {
      "metric": "share of chats classified outside the intended topics",
      "threshold": "> 5% over 7 days",
      "cadence": "daily",
      "failure_mode": "usage drift into unapproved use",
      "alert_route": "system-owner"
    }
  ],
  "drift_signals": ["embedding drift on user turns", "topic mix", "vendor model version pin"],
  "triggers": [
    { "condition": "groundedness breach for two consecutive windows", "action": "rollback", "owner": "system-owner" },
    { "condition": "language resolution ratio breach", "action": "investigate", "owner": "ai-governance" },
    { "condition": "unpinned vendor model version detected", "action": "suspend", "owner": "ml-platform" }
  ],
  "feedback_channels": ["in-chat feedback", "complaint form", "contest path for account decisions"],
  "retraining_policy": "A retrain, prompt change or corpus refresh is a release and goes through the staged rollout.",
  "review_cadence": "Thresholds reviewed quarterly with their owners",
  "owner": "system-owner",
  "effective_from": "2026-09-18"
}
```

> **Exemplo (ilustrativo)** Três semanas após uma atualização de modelo de fornecedor passar o seu
> canário, a métrica de desvio de uso sobe: o pessoal começou a fazer perguntas de RH ao assistente
> de cliente. A violação abre uma questão para o proprietário do sistema, que adiciona tópicos de RH
> à lista de uso proibido e os encaminha para o portal de RH; a métrica cai abaixo do limiar, e a
> questão, a mudança e a recuperação estão todas no armazenamento de garantia.

## Consequências
Desvio e injustiça são apanhados como sinais com proprietários em vez de descobertos como
incidentes, e auditorias periódicas tornam-se baratas porque a telemetria já existe. O custo é
capacidade de rotulagem e amostragem, cuidado estatístico em limiares (métricas por grupo em grupos
pequenos são ruidosas), o trabalho de privacidade para atributos de grupo, e cobertura on-call para
cada sinal que pode alertar.

## Padrões relacionados
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Staged Rollout with Rollback Criteria](/patterns/staged-rollout-rollback-criteria);
[Incident Pipeline](/patterns/incident-pipeline);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path).

**Correspondências:** Regulamento da IA Art. 4a, Art. 15(4), Art. 26(5), Art. 72 · NYC Local Law 144
· ISO/IEC 42001 A.5.4, A.6.2.6 · NIST AI RMF MEASURE 2.4, MEASURE 2.11, MEASURE 3.1, MANAGE 4.1 ·
Layer 04 Runtime Controls & Observability / Layer 05 Assurance & Continuous Compliance.

Os ids de controlo seguem ISO/IEC 42001 Annex A [6] e os ids de subcategoria o NIST AI RMF [5]. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## Sources

[1] "Learning under Concept Drift: A Review" (IEEE TKDE 31(12); detection, understanding and adaptation) (arXiv 2004.05785). Lu et al. 2018. https://arxiv.org/abs/2004.05785 (verified: primary)
[2] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 15(4) feedback loops in systems that continue to learn; Art. 26(5) deployer monitoring, suspension and information; Art. 72 post-market monitoring by providers). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 (new Art. 4a on special categories of personal data for bias detection and correction); OJ L, 2026/1744, 24.7.2026. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[4] Automated Employment Decision Tools (NYC Local Law 144 of 2021: bias audit within one year before use, public summary, candidate notices; enforced from 5 Jul 2023). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[5] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (MEASURE 2.4 functionality and behaviour monitored in production; MEASURE 2.11 fairness and bias evaluated and documented; MEASURE 3.1 existing, unanticipated and emergent risks tracked; MANAGE 4.1 post-deployment monitoring plans). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
[6] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.5.4 assessing AI system impact on individuals or groups of individuals; A.6.2.6 AI system operation and monitoring). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
