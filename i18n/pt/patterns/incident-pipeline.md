---
lang: pt
source: bok/patterns/incident-pipeline.md
sourceHash: "73905c623ed3c25ee83609d31bb598c906bf81f6ad4ee22eecc3578ec1aff46d"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: incident-pipeline
title: Incident Pipeline
layer: 5
order: 10
summary: "A tubagem que deteta, triagem e reporta incidentes graves de IA dentro da janela legal, com cronogramas e modelos codificados, não memorizados."
---

# Padrão: Incident Pipeline

**Resumo:** Construa a tubagem para detetar, fazer triagem e reportar incidentes graves de IA no
relógio, com cronogramas de reporte e modelos codificados em vez de memorizados. Para sistemas de
risco elevado isto inclui o reporte de incidentes graves do Artigo 73 do Regulamento da IA da UE;
para modelos GPAI inclui o reporte de incidentes sistémicos que o Código de Prática espera [1]. O
mesmo pipeline serve o responsável pela implantação de um sistema que outra pessoa construiu: diz ao
prestador, suspende o uso quando o sistema apresenta um risco, e mantém o relógio de reporte quando
o prestador não pode ser contactado.

## Objetivos
Transforme um sinal de tempo de execução numa obrigação reportada dentro da janela legal, e produza
o registo de incidente como evidência estruturada. Mantenha problemas e incidentes separados,
classifique a gravidade numa escala escrita, encontre a causa sem culpa, e alimente cada incidente
fechado de volta aos controlos.

## Utilizadores-alvo
Engenheiro de governação da IA, resposta de segurança/incidente, legal/conformidade, encarregado da
proteção de dados, o contacto de prestador de um responsável pela implantação.

## Partes interessadas afetadas
Reguladores, pessoas afetadas, responsáveis pela implantação, prestadores, proprietários de modelos.

## Princípios relevantes
Instrumente a construção para produzir a sua própria evidência; comece por um modo de falha ou dano
nomeado.

## Contexto
Um sistema de risco elevado ou GPAI em produção, sujeito a obrigações de reporte de incidentes
graves, onde a deteção vive em engenharia e o reporte vive em legal, sem ligação entre eles. A
maioria das organizações encontra incidentes de IA como responsáveis pela implantação de um sistema
procurado, para que o pipeline tenha de funcionar para um modelo que não possuem bem como para um
que construíram.

## Problema
Quando um incidente é detetado, o relógio começa. Se a deteção, triagem e reporte são passos manuais
desconectados, o prazo é perdido e a evidência do que aconteceu é reconstruída após o facto. Um
único campo "prioridade" lido de uma forma por engenharia e de outra por legal esconde a decisão de
reportabilidade, e uma análise pós-mortem que procura alguém para culpar ensina as pessoas a
reportar menos.

## Solução
Ligue a deteção de tempo de execução (de observabilidade e guardrails) a um fluxo de trabalho de
triagem que classifique a gravidade e, num evento reportável, rascunhe o relatório contra o modelo
exigido e inicie o cronómetro estatutário. Codifique os cronogramas do Artigo 73 do Regulamento da
IA da UE e a alimentação de monitorização pós-comercialização do Artigo 72 [2]; mantenha o registo
de incidente como evidência legível por máquina. Os cinco passos abaixo são as partes que falham
mais frequentemente na prática; o [capítulo 17](/bok/incidents) trata cada um em profundidade.

> **Exemplo (ilustrativo)** Um guardrail assinala uma tentativa de exfiltração de dados através de
> uma ferramenta de agente; o pipeline classifica-a, abre um incidente com o cronómetro do Artigo 73
> em funcionamento, e pré-preenche o relatório a partir do rastreio e entrada de registo.

### Problema ou incidente: duas filas, um tipo de registo

Uma **questão** é um defeito ou fraqueza de controlo sem evento subjacente: uma avaliação que
regrediu em fase de testes, um alerta de desvio, uma ficha de modelo que já não corresponde à versão
implantada. Vai para um registo de questões com um proprietário e uma data limite, e em termos de
ISO/IEC 42001 a maioria das questões são não-conformidades tratadas sob a cláusula 10.2 [3]. Um
**incidente** é um evento em que o sistema causou dano; um **perigo** (ou quase-acidente) é aquele
que poderia plausivamente ter causado dano e não causou [4]. Um **incidente grave** sob `Art. 3(49)`
é o topo dessa escala: morte ou dano grave à saúde, perturbação grave e irreversível de
infraestrutura crítica, uma violação de obrigações que protegem direitos fundamentais, ou dano grave
à propriedade ou ao ambiente [2]. Mantenha a gravidade (um julgamento interno sobre dano) e a
notificabilidade (um teste executado uma vez por regime) em campos separados, cada um definido por
uma pessoa nomeada com um carimbo de data/hora. As definições completas estão no
[capítulo 17](/bok/incidents#incident-hazard-issue-and-serious-incident).

### Uma escala de gravidade mapeada para as classes do Art. 73

Escreva a escala como política e avalie-a como código quando um incidente é aberto, para que a
primeira classificação e os relógios que inicia sejam reproduzíveis. Os níveis abaixo são
ilustrativos; o que importa é que cada um nomeie um teste de dano e a classe legal que pode
desencadear.

| Nível | Teste de dano | `Art. 73` classe que pode desencadear [2] | Resposta padrão |
|---|---|---|---|
| **SEV-1** | Morte; perturbação grave e irreversível de infraestrutura crítica; violação generalizada | `Art. 73(4)` morte: não mais tarde de 10 dias; `Art. 73(3)`: não mais tarde de 2 dias | Conter em primeiro lugar; equipa jurídica e EPD na chamada |
| **SEV-2** | Violação de obrigações de direitos fundamentais; dano grave à propriedade ou ao ambiente | `Art. 73(2)`: não mais tarde de 15 dias | Mesmo dia útil; notificabilidade avaliada por regime |
| **SEV-3** | Dano realizado abaixo dos limiares graves | Nenhum por si só; verifique RGPD e regimes setoriais | Conter no mesmo dia; rever no prazo de cinco dias úteis |
| **SEV-4** | Quase-acidente: um caminho para o dano foi interrompido | Nenhum | Revisão semanal; avaliação de regressão adicionada |
| **Questão** | Defeito ou fraqueza, sem evento | Nenhum | Registo de questões com proprietário e data de vencimento |

Classifique para cima e desclassifique com evidência: os prazos correm a partir da consciência, e
uma probabilidade razoável de uma ligação causal é suficiente para iniciá-los [2]. Um evento pode
iniciar vários relógios. Uma violação de dados pessoais dentro de um incidente de IA acrescenta a
notificação RGPD à autoridade supervisora, no prazo de 72 horas quando viável [5], para que o
registo tenha uma bandeira de notificabilidade por regime (ver
[os relógios sobrepostos](/bok/incidents#the-overlapping-clocks)).

### O registo: um esquema, muitos relatórios

Mantenha cada evento como um registo de incidente que valida contra
[`incident-record.v1.json`](/schemas/incident-record.v1.json) (um modelo
[Markdown](/templates/incident-record.md) preenchível fica ao lado). O campo `severity` do esquema
toma os valores OCDE (perigo, perigo grave, incidente, incidente grave, desastre) [4]; mantenha o
nível SEV interno ao lado. O bloco `reporting` regista quando a organização tomou conhecimento e uma
entrada por regime avaliado, para que cada relógio seja uma consulta, não uma memória; `containment`
regista se o kill switch foi utilizado; {`root_cause_analysis`} e {`actions_taken`} fecham o ciclo.
Os relatórios virados para o regulador são renderizados a partir do registo, nunca retipografados.

### Causa raiz, CAPA e revisão sem culpa

Execute a revisão num gatilho definido antecipadamente (cada SEV-1 e SEV-2, uma amostra do resto) e
escreva-a sem culpa: a questão é quais as condições que permitiram a uma pessoa razoável agir como
agiu, não quem errou [6]. Nomeie o método (cinco porquês, árvore de falhas, revisão de cronologia) e
uma categoria de causa no registo. O resultado é **CAPA** (ação corretiva e preventiva): a ação
corretiva corrige esta instância, a ação preventiva impede que a classe de falha se repita em
qualquer lugar da frota. Cada incidente encerrado deixa uma avaliação de regressão no
[Eval Gate](/patterns/eval-gate-in-ci), uma mudança no registo de riscos e um registo de evidência
de que a correção foi verificada, como o
[capítulo 17](/bok/incidents#capa-from-incident-to-risk-register-and-eval-suite) estabelece.

### Simulações de mesa

Um manual não testado é uma afirmação, não um controlo. Ensaie num calendário, rodando os modos de
falha (uma injeção indireta de prompts que exfiltra dados, desvio para resultados discriminatórios,
um fornecedor que silenciosamente troca o modelo atrás de uma API, um ciclo de agente que queima
orçamento), e cronometrize os passos que importam: classificar, conter, um rascunho de relatório
para cada relógio. A simulação produz os mesmos registos que um incidente real produziria, marcados
como simulação, para que "consegue relatar a tempo?" seja respondido por uma consulta sobre
resultados de simulação ([manuais, RACI e simulações](/bok/incidents#playbooks-raci-and-drills)).

### O lado do responsável pela implantação: informar o prestador, suspender a utilização

Um responsável pela implantação de um sistema de risco elevado tem três deveres sob `Art. 26(5)`
[2]. Monitora o sistema com base nas instruções de utilização e informa o prestador quando
relevante. Quando tem razão para considerar que a utilização conforme instruído pode apresentar um
risco, informa o prestador ou distribuidor e a autoridade de fiscalização do mercado sem demora
indevida e suspende a utilização. Quando identifica um incidente grave, informa imediatamente o
prestador em primeiro lugar, depois o importador ou distribuidor e a autoridade; se não conseguir
contactar o prestador, `Art. 73` aplica-se ao responsável pela implantação. Engenharia cada dever:

- **Um canal de prestador na entrada do registo**, com os termos de notificação contratual que o
  [Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate) negociou, testado
  em simulações.
- **Um caminho de suspensão para um sistema que não possui**: uma bandeira de funcionalidade ou
  comutador de tráfego para um caminho humano ou legado, ligado ao
  [Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker) e cronometrado em
  simulações.
- **Uma exportação virada para o prestador do registo** com o carimbo de data/hora de cada
  notificação, e um relógio de contingência que inicia os temporizadores `Art. 73` no registo
  próprio do responsável pela implantação quando o prestador está silencioso.
- **Retenção de registos** sob o controlo do responsável pela implantação durante pelo menos seis
  meses (`Art. 26(6)`), mais tempo enquanto um incidente está aberto [2].

## Consequências
A notificação acontece a tempo e o registo está pronto para auditoria. A gravidade e a
notificabilidade mantêm-se separadas, as revisões ensinam em vez de culpar, e cada incidente
encerrado endurece os controlos através de CAPA. O custo é integração multifuncional, simulações que
tiram pessoas de outro trabalho, termos de notificação contratual que devem ser conquistados aos
prestadores, e manter os critérios de gravidade e modelos atualizados com a lei.

## Padrões relacionados
[Continuous Assurance Telemetry](/patterns/continuous-assurance-telemetry);
[Runtime Guardrail](/patterns/runtime-guardrail);
[Kill Switch / Circuit Breaker](/patterns/kill-switch-circuit-breaker);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Eval Gate in CI](/patterns/eval-gate-in-ci);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondências:** Regulamento da IA Art. 72, Art. 73, Art. 55 (GPAI) · ISO/IEC 42001 · NIST AI
RMF (Manage) · Camada 05 Assurance & Continuous Compliance.

Os rótulos de função seguem o NIST AI RMF [7]. Os mapeamentos são ilustrativos, não uma afirmação de
conformidade.

## Sources

[1] General-Purpose AI Code of Practice, Safety and Security chapter, Commitment 9 (serious incident reporting for GPAI models with systemic risk). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[2] Regulation (EU) 2024/1689 (AI Act): Art. 3(49) serious incident; Art. 26(5)–(6) deployer monitoring, suspension, serious-incident information and log retention; Art. 72 post-market monitoring; Art. 73 reporting of serious incidents (73(2) no later than 15 days, 73(3) no later than 2 days, 73(4) no later than 10 days). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[3] ISO/IEC 42001:2023, AI management systems (clause 10.2 nonconformity and corrective action). ISO/IEC. 2023. https://www.iso.org/standard/81230.html (verified: secondary)
[4] Towards a common reporting framework for AI incidents (OECD Artificial Intelligence Papers No. 34; AI incident and AI hazard; severity values hazard, serious hazard, incident, serious incident, disaster). OECD. 2025-02. https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR), Art. 33 (notification of a personal data breach to the supervisory authority within 72 hours where feasible). Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] "Postmortem Culture: Learning from Failure" (Site Reliability Engineering, ch. 15; blameless postmortems; postmortem triggers set in advance). Google. 2016. https://sre.google/sre-book/postmortem-culture/ (verified: primary)
[7] AI Risk Management Framework (AI RMF 1.0; Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
