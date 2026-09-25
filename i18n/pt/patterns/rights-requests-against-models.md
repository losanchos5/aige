---
lang: pt
source: bok/patterns/rights-requests-against-models.md
sourceHash: "c0fce81a2c4fab7c428580e9c3ace2207604d6cba85f6b01897785da414b2a7b"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: rights-requests-against-models
title: Rights Requests Against Models
layer: 2
secondaryLayer: 5
order: 27
summary: "Encaminhe cada pedido de titular de dados para cada local onde os dados da pessoa se encontram, desde sistemas de origem até pesos de modelo, e feche-o com um registo de cumprimento."
---

# Patrón: Rights Requests Against Models

**Resumo:** Encaminhe cada pedido de titular de dados (acesso, retificação, apagamento, oposição)
para cada local onde os dados da pessoa se encontram num sistema de IA: sistemas de origem,
snapshots de treino e ajuste fino, índices de recuperação, registos de prompt e saída, conjuntos de
avaliação e, quando o modelo não é anónimo, os pesos. Cada localização tem uma resposta pré-acordada
numa escala desde eliminação imediata até retreino agendado, e o pedido fecha com um registo de
cumprimento que diz o que foi feito onde e quando a lacuna restante se fecha.

## Objetivos
Cumpra os direitos dos titulares de dados dentro do prazo em toda a propriedade de dados de IA, não
apenas na base de dados, e seja capaz de mostrar por pedido quais as localizações alcançadas, o que
foi feito em cada uma e quais as versões de modelo que ainda contêm os dados da pessoa até ao
próximo retreino.

## Utilizadores-alvo
Encarregado da proteção de dados, engenheiro de governação da IA, equipa de plataforma de dados,
engenheiro de ML.

## Partes interessadas afetadas
Titulares de dados, responsáveis pelo tratamento e subcontratantes na cadeia de fornecimento de IA,
autoridades de supervisão, proprietários de modelos.

## Princípios relevantes
Registe e delimite cada ator antes de agir; instrumente a construção para produzir a sua própria
prova; construa o controlo no ponto mais antigo em que pode bloquear.

## Contexto
O RGPD dá às pessoas direitos de acesso, retificação, apagamento e oposição, e o responsável pelo
tratamento deve agir sobre um pedido dentro de um mês, prorrogável por mais dois meses para pedidos
complexos [1]. Num sistema de IA, os dados da pessoa já não se encontram numa única tabela. Se um
modelo treinado é anónimo é avaliado caso a caso: a opinião do EDPB sobre modelos de IA estabelece
quando um modelo treinado em dados pessoais pode ser considerado anónimo e que evidência o
responsável pelo tratamento necessita, e um modelo que falha o teste está no âmbito dos direitos
[2]. A orientação da CNIL acrescenta que um responsável pelo tratamento que não consegue identificar
uma pessoa num conjunto de treino pode dizê-lo, que a pessoa pode fornecer informações que tornem a
identificação possível, que o retreino responde a um pedido quando os dados ainda são mantidos, e
que filtros de saída são aceitáveis quando o retreino é desproporcionado, se demonstrado ser eficaz
[3]. A autoridade de proteção de dados de Hamburgo começa noutro lugar, considerando que armazenar
um modelo de linguagem grande não é tratamento e que os direitos se ligam aos inputs e outputs do
sistema [4]. Um responsável pela implantação tem de trabalhar sob qualquer uma das leituras.

## Problema
Ferramentas de pedidos construídas para bases de dados param no CRM. O registo da mesma pessoa
também se encontra num snapshot de ajuste fino, um índice de recuperação, três meses de registos de
prompt e um conjunto de avaliação, e um modelo ajustado nesse snapshot pode reproduzi-lo. Sem um
mapa da pessoa para essas localizações, um apagamento fecha no prazo e continua incompleto; sem um
registo por localização, ninguém pode dizer por que a supressão de saída foi escolhida em vez do
retreino, ou quando o retreino que fecha a lacuna será entregue.

### Forças
- **Completude contra custo.** Apagar uma linha é barato; retreinar um modelo grande para um pedido
  não é, portanto a resposta aos pesos é geralmente faseada.
- **Prazo contra lote.** O relógio de um mês favorece medidas parciais rápidas agora e completas num
  calendário.
- **Retenção contra apagamento.** Os responsáveis pela implantação de alto risco mantêm registos
  gerados automaticamente durante pelo menos seis meses a menos que outra lei disponha de outro modo
  [5], enquanto a limitação de armazenamento empurra na outra direção.
- **Verificabilidade.** Os métodos aproximados de desaprendizagem são difíceis de verificar,
  portanto uma alegação de que a influência de um registo desapareceu necessita de um teste, não de
  uma afirmação.

## Solução
Trate o pedido como um trabalho fan-out sobre um mapa de dados, e o modelo como mais uma
localização.

1. **Um mapa de dados indexado por titular.** Construa o mapa a partir da linhagem que já mantém:
   fichas de dados, registos de admissão de conjunto de dados e o [AIBOM](/patterns/aibom) dizem
   quais os snapshots que alimentaram qual versão de modelo, e o registo diz quais os índices e
   registos que cada sistema escreve. Mantenha uma chave de titular pseudónima para que um pedido
   possa ser correspondido sem copiar identidades para o mapa.
2. **Um pedido, muitos manipuladores.** O encaminhador abre um ticket e o distribui para um
   manipulador por localização, cada um com uma resposta pré-acordada: apagar de sistemas de origem
   e snapshots; apagar ou re-indexar chunks de recuperação de uma vez; apagar ou pseudonimizar
   registos dentro da regra de retenção; substituir registos de avaliação por sintéticos; sinalizar
   cada versão de modelo treinada num snapshot afetado.
3. **Uma escada para os pesos.** Supressão de saída primeiro, como um filtro construído em regras
   gerais em vez de uma lista de nomes, testado como qualquer controlo. Depois retreino sem os
   dados, num calendário que agrupa pedidos. Desaprendizagem automática apenas como uma alegação a
   testar: métodos exatos como treino fragmentado limitam o que deve ser retreinado [6], e um teste
   de inferência de adesão nos registos removidos verifica o resultado [7].
4. **Feche a próxima versão.** O portão de versão verifica que os apagamentos pendentes são
   aplicados ao conjunto de treino da versão candidata, para que um retreino não possa reintroduzir
   silenciosamente os dados.
5. **Um registo de cumprimento por pedido.** O fluxo de trabalho escreve-o, não o encarregado da
   proteção de dados: cada localização, a ação tomada, as versões de modelo afetadas, o retreino
   agendado e se o prazo foi cumprido.

Registo de cumprimento ilustrativo para um pedido de apagamento contra `csa-01`:

```json
{
  "request_id": "dsr-2026-0412",
  "right": "erasure",
  "subject_key": "hash:7c1e09b4",
  "received_at": "2026-09-02",
  "due_by": "2026-10-02",
  "locations": [
    { "store": "crm", "action": "deleted" },
    { "store": "rag_index:csa-kb@2026-09", "action": "deleted_and_reindexed" },
    { "store": "fine_tune_set:csa-ft-07", "action": "deleted" },
    { "store": "logs:csa-01", "action": "deleted" },
    { "store": "eval_set:csa-regression-v9", "action": "replaced_with_synthetic" },
    { "store": "weights:csa-01@2026-08-30", "action": "output_suppression", "rule": "dsr-0412" }
  ],
  "models_flagged": ["csa-01@2026-08-30"],
  "retrain_scheduled": "csa-01@2026-10-15",
  "closed_at": "2026-09-30",
  "within_deadline": true
}
```

> **Exemplo (ilustrativo)** Um cliente pede ao operador de um assistente de suporte que apague os
> seus dados. O encaminhador encontra a pessoa no CRM, um índice de recuperação, um snapshot de
> ajuste fino e 90 dias de registos. Quatro manipuladores apagam dentro de um dia; os pesos recebem
> um filtro de saída, testado contra os próprios registos do cliente, e o próximo retreino agendado
> descarta o snapshot. O registo de cumprimento vai para o ficheiro do cliente e para a loja de
> garantia.

## Consequências
Os pedidos fecham no prazo com evidência por localização, e a lacuna entre supressão e retreino é
visível e datada em vez de oculta. O custo é linhagem suficientemente boa para construir o mapa de
dados, manipuladores para cada loja, e capacidade de retreino. Os filtros de supressão vazam sob
prompting adversarial, portanto são uma medida interina com uma expiração, não a resposta.

## Padrões relacionados
[AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Decision Notice & Contest Path](/patterns/decision-notice-contest-path);
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry).

**Correspondências:** RGPD Art. 12(3), Arts. 15–17, Art. 21 · Regulamento da IA Art. 26(6) · ISO/IEC
42001 A.7 · NIST AI RMF MEASURE 2.10, GOVERN 1.1 · OWASP LLM02:2026 · Layer 02 Inventory &
Transparency / Layer 05 Assurance & Continuous Compliance.

Os ids de ameaça seguem o OWASP Top 10 for LLM Applications 2026 [8], os ids de controlo ISO/IEC
42001 Annex A [9] e os ids de subcategoria o NIST AI RMF [10]. Os mapeamentos são ilustrativos, não
uma alegação de conformidade.

## Sources

[1] Regulation (EU) 2016/679 (General Data Protection Regulation; Art. 12(3) one month, extendable by two further months; Arts. 15, 16, 17, 21). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[2] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (anonymity test at para 43; elements and documentation for the controller's evidence at paras 49–58). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[3] "Ensuring and facilitating the exercise of data subjects' rights" (AI how-to sheet; identification in training sets; retraining; output filters based on general rules; one month plus two). CNIL. 2026-01-05. https://www.cnil.fr/en/respect-and-facilitate-exercise-data-subjects-rights (verified: primary)
[4] Discussion Paper: Large Language Models and Personal Data (storing an LLM is not processing; rights attach to system inputs and outputs). Hamburg Commissioner for Data Protection and Freedom of Information. 2024-07-15. https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf (verified: primary)
[5] Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act), of 13 June 2024; OJ L, 2024/1689, 12.7.2024 (Art. 26(6) deployers keep automatically generated logs for at least six months, unless Union or national law provides otherwise). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[6] Bourtoule et al., "Machine Unlearning" (SISA training; arXiv 1912.03817). arXiv. 2019-12-09. https://arxiv.org/abs/1912.03817 (verified: primary)
[7] Shokri et al., "Membership Inference Attacks against Machine Learning Models" (arXiv 1610.05820). arXiv. 2016-10-18. https://arxiv.org/abs/1610.05820 (verified: primary)
[8] OWASP Top 10 for LLM Applications 2026 (LLM02 Sensitive Information Disclosure). OWASP GenAI Security Project. 2026-08-03. https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (verified: primary)
[9] ISO/IEC 42001:2023, AI management system, Annex A controls referenced by identifier and short title only (A.7 data for AI systems). ISO/IEC (titles checked via a secondary listing). 2023-12. https://www.iso.org/standard/42001 (verified: secondary)
[10] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 1.1 legal and regulatory requirements understood, managed and documented; MEASURE 2.10 privacy risk examined and documented). NIST. 2023-01-26. https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (verified: primary)
