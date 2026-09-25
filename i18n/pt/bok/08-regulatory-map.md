---
lang: pt
source: bok/08-regulatory-map.md
sourceHash: "2d5c814e952facf7e41ebe981ae7a6527a4503f20516c8d52387badff54b53e5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 08. Mapa regulatório (obrigação → artefato → camada)

> Este capítulo é o índice inverso de cada linha "Maps to" no livro: para cada obrigação nomeia o
> artefato de engenharia que a satisfaz ou apoia e a camada de stack onde o artefato vive.

Cada outro capítulo mapeia *para a frente*: uma capacidade, depois as obrigações que toca. Este
capítulo mapeia *para trás*: uma obrigação, depois o artefato e a camada que a respondem. A unidade
do mapa é uma linha: uma obrigação, o artefato de engenharia que produz a evidência para ela, e uma
das cinco camadas de stack (capítulo 04):
**1 Govern-as-Code · 2 Inventory & Transparency · 3 Evals & Red Teaming as Evidence · 4 Runtime Controls & Observability · 5 Assurance & Continuous Compliance**.
O mapa é um crosswalk para encontrar o artefato que responde a uma pergunta, não um certificado que
o artefato o torna conforme. Indexa primeiro os instrumentos específicos de IA e depois a proteção
de dados, cibersegurança, responsabilidade, consumidor e lei setorial que um sistema de IA encontra
no primeiro dia, para que cada linha do [registo de obrigações](/obligations) se resolva numa tabela
neste capítulo. O capítulo 19 ensina as linhas de proteção de dados no seu
[mapa de obrigação para artefato](/bok/privacy-and-ai#obligation-to-artefact-map), e o capítulo 20 a
[outra lei que já se aplica a IA](/bok/existing-law) (direitos de autor, anti-discriminação,
proteção do consumidor e responsabilidade do produto).

## Como ler este mapa

Leia cada linha como uma frase: *esta obrigação é respondida por este artefato, que vive nesta
camada*. Três advertências aplicam-se em toda a parte.

- **Os mapeamentos são ilustrativos, não uma alegação de conformidade.** Nenhum artefato neste livro
  garante conformidade, e nenhuma norma citada aqui confere uma presunção de conformidade (veja
  "What is NOT harmonised yet"). Um artefato *apoia* e *evidencia* uma obrigação; o julgamento legal
  de conformidade fica com advogados, organismos notificados e autoridades.
- **As datas são as datas pós-Omnibus.** Cada data do Regulamento da IA da UE abaixo reflete o
  Regulamento (UE) 2026/1744, o Omnibus Digital sobre IA, de 8 de julho de 2026 (JO L, 24 de julho
  de 2026), em vigor 27 de julho de 2026 [1][2][22]. Onde o Omnibus moveu uma data, a data movida é
  mostrada; onde não, a linha diz assim.
- **A autoridade competente difere por regime.** Para IA de uso geral (GPAI) o supervisor é o
  **AI Office**, e as multas GPAI são decisões formais da Comissão sob o Artigo 101 [3][4]. Para
  sistemas de risco elevado os supervisores são
  **autoridades nacionais de fiscalização do mercado**, cujas penalidades correm sob o Artigo 99
  [4]. Os Estados-Membros escolhem a sua própria; Espanha, por exemplo, criou uma agência dedicada,
  **AESIA** (Agencia Española de Supervisión de Inteligencia Artificial), cujo estatuto foi aprovado
  pelo Real Decreto 729/2023 [52]. O mapa indica a autoridade por linha para que o leitor saiba quem
  pergunta.

## Regulamento da IA da UE, pós-Omnibus Digital

Para um percurso de ensino do Regulamento antes de este índice invertido o mapear (âmbito, a escada
de risco, funções na cadeia de valor, deveres do responsável pela implantação, aplicação e
cronograma completo pós-Omnibus Digital), consulte [capítulo 18](/bok/eu-ai-act), que percorre o
Regulamento de ponta a ponta.

As obrigações de risco elevado (artigos 9.º–15.º, 17.º, 25.º, 26.º, 27.º, 49.º, 71.º, 72.º, 73.º)
aplicam-se aos sistemas do Anexo III a partir de **2 de dezembro de 2027** e aos sistemas
incorporados do Anexo I a partir de **2 de agosto de 2028**, ambos adiados pelo Omnibus Digital de 2
de agosto de 2026 e 2 de agosto de 2027, respetivamente [1][2]. O `Art. 113(c)` alterado adia o
Capítulo III, Secções 1 a 3: classificação, os requisitos dos artigos 8.º a 15.º e os deveres dos
prestadores, responsáveis pela implantação e outros operadores nos artigos 16.º a 27.º [22]. Os
deveres de risco elevado que se encontram noutros locais (avaliação da conformidade, a declaração,
marcação CE e registo nos artigos 43.º a 49.º e 71.º, acompanhamento pós-comercialização e
comunicação de incidentes nos artigos 72.º, 73.º e 75.º(1a), e o direito à explicação no artigo
86.º) pertencem a capítulos que formalmente se aplicam a partir de 2 de agosto de 2026, mas têm
trabalho a fazer apenas uma vez que um sistema é classificado como de risco elevado, pelo que o mapa
os data pela data de classificação. Esta é a leitura deste mapa; confirme com aconselhamento
jurídico (verificar) [22][63]. Os artigos 26.º(11), 27.º, 49.º, 71.º e 86.º dizem respeito apenas
aos sistemas do Anexo III, pelo que a data de 2 de agosto de 2028 não os atinge. As obrigações de IA
de finalidade geral (artigos 53.º, 55.º) aplicam-se desde 2 de agosto de 2025, com poderes de
aplicação da Comissão em vigor desde 2 de agosto de 2026 [3]; os prestadores de modelos colocados no
mercado antes de 2 de agosto de 2025 cumprem até 2 de agosto de 2027 (`Art. 111(3)`) [63]. A
transparência (artigo 50.º) entrou em vigor em 2 de agosto de 2026 e não foi alterada [5]. Os
sistemas de risco elevado das autoridades públicas legados mantêm a sua data original de 2 de agosto
de 2030 [2].

A coluna **Responsável pelo dever** nomeia quem a obrigação vincula, que é um eixo diferente de quem
a aplica. Os deveres de conceção e construção de risco elevado (artigos 9.º a 15.º e 17.º) recaem
sobre o **prestador**; os artigos 26.º e 27.º recaem sobre o **responsável pela implantação**; os
artigos 4.º, 5.º e 50.º vinculam **ambos**; e os artigos 53.º e 55.º vinculam o
**prestador de IA de finalidade geral**. O artigo 25.º estende-se pela cadeia de valor: estabelece
as condições sob as quais um distribuidor, importador ou responsável pela implantação se torna ele
próprio um **prestador** e herda os deveres do prestador. Os artigos 22.º a 24.º vinculam o
**mandatário** de um prestador não-UE, o **importador** e o **distribuidor**, e o artigo 54.º o
mandatário de um prestador não-UE de IA de finalidade geral. Isto importa para o engenheiro porque
os artefatos que pode produzir dependem de qual é o papel da sua organização: um responsável pela
implantação não pode elaborar a documentação técnica do prestador, mas deve executar o
acompanhamento do artigo 26.º e a avaliação de impacto sobre os direitos fundamentais do artigo
27.º; e quando o modelo é adquirido, a maioria da evidência do lado do prestador torna-se algo que
recolhe em vez de produzir (consulte a Porta de Diligência Devida do Fornecedor/Modelo no capítulo
05).

O **artigo 16.º** é o guarda-chuva para os deveres de risco elevado do prestador. Para além do ponto
(l), acessibilidade, que tem a sua própria linha, não acrescenta nenhum artefato próprio; reúne as
obrigações que as linhas abaixo decompõem artigo por artigo: os requisitos dos artigos 9.º a 15.º e
17.º, conservação de documentação e registos (artigos 18.º e 19.º), ação corretiva (artigo 20.º), a
avaliação da conformidade (artigo 43.º), a declaração de conformidade da UE e marcação CE (artigos
47.º e 48.º), registo (artigos 49.º e 71.º), acompanhamento pós-comercialização (artigo 72.º) e
comunicação de incidentes graves (artigo 73.º). Portanto, lê-se aqui como uma referência cruzada,
não como uma linha [22][63].

| Artigo | Obrigação | Artefato de engenharia | Camada | Responsável pelo dever | Aplica-se (pós-Omnibus Digital) | Autoridade |
|---|---|---|---|---|---|---|
| `Art. 3(1)` | Âmbito: decidir, sistema por sistema, se é um sistema de IA sob a definição do artigo 3.º(1) antes de qualquer outro dever ser avaliado | Registo de decisão definitória no registo: definição aplicada, elementos encontrados, família excluída se houver, razão, decisor, data | 2 | Prestador + responsável pela implantação (âmbito) | 2025-02-02 (Capítulo I) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 4` | Literacia no domínio da IA: tomar medidas para apoiar o desenvolvimento de literacia no domínio da IA entre o pessoal e operadores | Programa de literacia como código; registos de formação baseados em funções; portas de integração | 1 | Prestador + responsável pela implantação | 2025-02-02; reformulado 2026-07-27 (em vigor) [6][22][63] | Dever do prestador/responsável pela implantação; autoridade nacional de fiscalização do mercado |
| `Art. 4a` | Base legal para processar dados de categorias especiais para deteção de enviesamento em sistemas de risco elevado, com pseudonimização e eliminação uma vez corrigido o enviesamento | Controlos de governação de dados; pseudonimização e retenção como código; ficha de dados anotando base e eliminação | 2 | Prestador | 2026-07-27 (novo, em vigor) [2] | Autoridade nacional de fiscalização do mercado / Autoridades de proteção de dados |
| `Art. 5` | Práticas proibidas; novas proibições sobre ultrasuplantação gerada por IA e material de abuso sexual de menores | Blocklist de política como código; guardrails de entrada/saída; recusa e deteção de abuso | 1 · 4 | Prestador + responsável pela implantação | 2026-12-02 (novas proibições); proibições anteriores de 2025-02-02 [2] | Autoridade nacional de fiscalização do mercado |
| `Art. 6` | Regras de classificação para sistemas de IA de risco elevado, incluindo a rota do Anexo III (autónomo) e rota do Anexo I (componente de segurança) | Estratificação de risco como código; registo de decisão de classificação de risco elevado; entrada de registo sinalizando estado do Anexo III | 1 · 2 | Prestador | 2027-12-02 (Anexo III) [1][22] | Autoridade nacional de fiscalização do mercado |
| `Art. 6(3)–(4)` | Um prestador que encontra um sistema do Anexo III não de risco elevado sob o filtro do artigo 6.º(3) documenta a avaliação antes de colocar no mercado e regista-o sob o artigo 49.º(2); um sistema que define perfis de pessoas singulares é sempre de risco elevado | Registo de decisão de classificação (ponto do Anexo III, condição do artigo 6.º(3), sinalizador de definição de perfis explícita); entrada de registo do artigo 49.º(2) enviada do registo | 1 · 2 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 9` | Sistema de gestão de riscos ao longo do ciclo de vida de risco elevado | Registo de riscos como código; modelos de ameaça; ligação aos resultados de avaliação de impacto sobre os direitos fundamentais e avaliação | 1 · 3 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 10` | Dados e governação de dados; conjuntos de dados representativos, relevantes e verificados quanto a erros | Fichas de dados; linhagem; testes de enviesamento e qualidade em CI | 2 · 3 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 11` | Documentação técnica (Anexo IV) elaborada e mantida atualizada | AIBOM (`CycloneDX ML-BOM`, `SPDX 3.0 AI`); documentação técnica gerada automaticamente; fichas de modelo | 2 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 12` | Manutenção de registos: registo automático de eventos ao longo da vida útil do sistema | Registos estruturados e assinados; rastreios `OpenTelemetry`; arquivo de eventos à prova de adulteração | 4 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 13` | Transparência e fornecimento de informações aos responsáveis pela implantação | Instruções de utilização como código; fichas de modelo e dados; notas de capacidade e limitação | 2 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 14` | Supervisão humana concebida no sistema | Pontos de verificação de supervisão humana; kill switch; caminhos de substituição e escalada | 4 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 15` | Precisão, robustez e cibersegurança | Porta de avaliação; suite de red team adversarial; controlos de robustez e segurança; avaliações de regressão | 3 · 4 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 15(4)` | Sistemas que continuam a aprender após colocação no mercado são construídos para eliminar ou reduzir o risco de saídas enviesadas alimentarem entradas futuras (ciclos de retroalimentação), com medidas de mitigação | Monitor de equidade de ciclo de retroalimentação; verificação de enviesamento de dados de retreino; porta de escrita de memória de agente com proveniência e reversão para um snapshot conhecido como bom | 3 · 4 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 16(l)` | Os prestadores garantem que o sistema de risco elevado cumpre os requisitos de acessibilidade das Diretivas (UE) 2016/2102 e (UE) 2019/882 | Resultados de teste de acessibilidade para cada aviso, instrução e explicação mostrados às pessoas, executados no pipeline; modelos de explicação acessíveis | 2 · 3 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 17` | Sistema de gestão da qualidade | QMS como código; políticas versionadas; controlos de pipeline e gestão de mudanças | 1 · 5 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 17(1)(m)` | O QMS inclui um quadro de responsabilidade estabelecendo as responsabilidades da gestão e outro pessoal para cada aspeto do QMS | RACI como código compilado em campos de proprietário de registo e regras de proprietário de código; registos de decisão de comité | 1 · 2 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 18` | Manter a documentação técnica, a documentação do QMS, as alterações e decisões do organismo notificado e a declaração de conformidade da UE à disposição das autoridades nacionais durante 10 anos após colocação no mercado | Retenção como código para o ficheiro técnico, registos do QMS, decisões do organismo notificado e a declaração de conformidade da UE (10 anos); arquivo de evidência de escrita única | 2 · 5 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 19` | Manter os registos gerados automaticamente sob o controlo do prestador durante um período apropriado à finalidade prevista, pelo menos seis meses a menos que outra lei disponha de forma diferente | Política de retenção de registos como código (pelo menos seis meses, definida pela finalidade prevista); arquivo de registos à prova de adulteração | 4 · 5 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 20` | Um prestador com razão para considerar um sistema de risco elevado não conforme coloca-o imediatamente em conformidade, retira-o, desativa-o ou revoga-o e informa distribuidores e responsáveis pela implantação; quando o sistema apresenta um risco, investiga e informa a autoridade de fiscalização do mercado | Registo de CAPA; retirada, desativação ou revogação de runbook; notificação de distribuidores e responsáveis pela implantação | 1 · 5 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 22` | Um prestador estabelecido fora da União designa, por mandato escrito, um mandatário na União antes de disponibilizar o sistema; o mandatário mantém a declaração, documentação e certificado durante 10 anos | Mandato escrito; cópias de 10 anos da declaração, documentação técnica e certificado; rota de contacto da autoridade | 5 | Prestador não-UE + mandatário | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 23` | Antes de colocar um sistema de risco elevado no mercado, o importador verifica a avaliação da conformidade, a documentação do Anexo IV, a marcação CE, a declaração e instruções e o mandatário, e mantém cópias durante 10 anos | Registo de verificação de importação contra cada verificação; cópias de documentos de 10 anos | 2 · 5 | Importador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 24` | Antes de disponibilizar um sistema de risco elevado, o distribuidor verifica a marcação CE, a declaração e as instruções, e retém, retira ou revoga um sistema que considera não conforme | Registo de verificação de distribuição; fluxo de trabalho de retenção, retirada ou revogação | 2 · 5 | Distribuidor | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 25` | Responsabilidades ao longo da cadeia de valor da IA: quando um distribuidor, importador ou responsável pela implantação se torna um prestador, e as informações que um prestador deve passar aos atores a jusante | Porta de diligência devida da cadeia de valor; alocação de responsabilidade do prestador/responsável pela implantação; AIBOM e fichas de modelo/dados recolhidas de prestadores a montante | 2 · 5 | Prestador + atores da cadeia de valor | 2027-12-02 (Anexo III) [23] | Autoridade nacional de fiscalização do mercado |
| `Art. 26` | Obrigações do responsável pela implantação para sistemas de risco elevado: utilização de acordo com as instruções de utilização (artigo 26.º(1)); as linhas de parágrafo abaixo decompõem supervisão, dados de entrada, acompanhamento, registos e avisos | Registo de implantação; ganchos de acompanhamento; supervisão atribuída e retenção de registos | 2 · 4 | Responsável pela implantação | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 26(2)` | Os responsáveis pela implantação atribuem supervisão humana a pessoas singulares com a competência, formação e autoridade necessárias, e o apoio necessário | Atribuição de supervisão no registo; registos de formação baseados em funções com expiração; lista de aprovadores por classe de ponto de verificação com autoridade para pausar ou recusar | 1 · 4 | Responsável pela implantação | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 26(4)` | Na medida em que o responsável pela implantação controla os dados de entrada, garante que os dados são relevantes e suficientemente representativos para a finalidade prevista | Verificações de dados de entrada em relação à população no registo de implantação; monitores de desvio nas entradas | 2 · 3 | Responsável pela implantação | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 26(5)` | Os responsáveis pela implantação acompanham o funcionamento de acordo com as instruções; se tiverem razão para considerar um risco, informam o prestador ou distribuidor e a autoridade e suspendem a utilização; um incidente grave vai primeiro para o prestador, e o Art. 73 aplica-se ao responsável pela implantação se o prestador não puder ser contactado | Plano de acompanhamento com proprietários de sinais; caminho de suspensão testado (feature flag, comutador de tráfego); contacto de incidente do prestador no registo; avisos de risco e incidente grave pré-preenchidos | 2 · 4 · 5 | Responsável pela implantação | 2027-12-02 (Anexo III) [63][57] | Autoridade nacional de fiscalização do mercado |
| `Art. 26(6)` | Os responsáveis pela implantação mantêm os registos sob seu controlo durante um período apropriado à finalidade prevista, pelo menos seis meses, a menos que outra lei disponha de forma diferente | Agenda de retenção como código; armazenamento de registos à prova de adulteração; bloqueio legal enquanto um incidente está aberto | 4 · 5 | Responsável pela implantação | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 26(7)` | Antes de colocar um sistema de IA de risco elevado em serviço no local de trabalho, os responsáveis pela implantação que são empregadores informam os representantes dos trabalhadores e os trabalhadores afetados | Registo de informação ao trabalhador datado antes da primeira utilização e ligado à entrada do registo; acionador de intake de RH para sistemas do ponto 4 do Anexo III | 2 | Responsável pela implantação (empregador) | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 26(11)` | Os responsáveis pela implantação de sistemas do Anexo III que tomam ou ajudam a tomar decisões sobre pessoas singulares informam essas pessoas de que estão sujeitas ao sistema | Aviso de utilização de IA no ponto de decisão; modelos de aviso versionados como código; registo de entrega de aviso | 2 · 4 | Responsável pela implantação | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 27` | Avaliação de Impacto sobre os Direitos Fundamentais (FRIA) para responsáveis pela implantação de sistemas do Anexo III | FRIA-as-Code a partir de um modelo; referência cruzada para uma GDPR `Art. 35` AIPD | 1 · 2 | Responsável pela implantação | 2027-12-02 (Anexo III) [7] | Autoridade nacional de fiscalização do mercado |
| `Art. 43` | Avaliação da conformidade antes de colocar no mercado (controlo interno, ou um organismo notificado para biometria do ponto 1 do Anexo III) | Fluxo de trabalho de avaliação da conformidade; pacote de evidência de controlo interno ou organismo notificado; rastreabilidade para documentação do Anexo IV | 1 · 5 | Prestador | 2027-12-02 (Anexo III) [1][22] | Autoridade nacional de fiscalização do mercado |
| `Art. 43(4)` | Um sistema já avaliado sofre uma nova avaliação da conformidade em caso de modificação substancial; alterações pré-determinadas na documentação técnica de um sistema que continua a aprender não são modificações substanciais | Política de classificação de alterações na fusão; envelope de alteração pré-determinado como código; acionador de reavaliação no registo | 1 · 5 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 47` | Declaração UE de conformidade elaborada após conclusão da avaliação | Declaração UE de conformidade gerada automaticamente a partir da evidência; registo de marcação CE | 2 · 5 | Prestador | 2027-12-02 (Anexo III) [1][22] | Autoridade nacional de fiscalização do mercado |
| `Art. 48` | Afixar a marcação CE de forma visível, legível e indelével (uma marcação digital para sistemas fornecidos digitalmente), seguida do número do organismo notificado quando aplicável | Registo de marcação CE (física ou digital) gerado com a declaração UE de conformidade; número do organismo notificado quando aplicável | 2 · 5 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 49` / `Art. 71` | Registo de sistemas de IA de risco elevado na base de dados da UE | Registo de agentes/modelos com uma API que alimenta o registo; proprietário e estado por entrada | 2 | Prestador; responsável pela implantação de autoridade pública | 2027-12-02 (Anexo III) [1] | MSA nacional; Comissão (base de dados) |
| `Art. 50` | Transparência para certos sistemas de IA: divulgação de chatbot; marcação e rotulagem de conteúdo sintético | Rotulagem de conteúdo e marcação legível por máquina (p. ex. estilo C2PA); banner de divulgação de chatbot | 4 · 2 | Prestador + responsável pela implantação | 2026-08-02; período de graça de marcação para sistemas existentes até 2026-12-02 [2][5] | Autoridade nacional de fiscalização do mercado |
| `Art. 52` | Notificar a Comissão sem demora, e no prazo de duas semanas, uma vez que um modelo de IA de finalidade geral cumpra a condição do Art. 51(1)(a) ou se souber que o fará | Livro de cálculo por linhagem de modelo com alerta de limiar de cálculo planeado; registo de notificação apresentado no prazo de duas semanas | 2 · 5 | Prestador de IA de finalidade geral | Obrigações a partir de 2025-08-02; aplicação a partir de 2026-08-02 [63][3] | Serviço para a IA |
| `Art. 53` | Obrigações do prestador de IA de finalidade geral, incluindo um resumo público do conteúdo de treino num modelo do Serviço para a IA | Fichas de modelo; resumo de conteúdo de treino; AIBOM e proveniência de conjunto de dados | 2 | Prestador de IA de finalidade geral | Obrigações a partir de 2025-08-02; aplicação a partir de 2026-08-02 [3] | Serviço para a IA |
| `Art. 53(1)(c)` | Os prestadores de IA de finalidade geral estabelecem uma política para cumprir a lei de direitos de autor da União, incluindo a identificação e cumprimento de reservas de direitos sob o Art. 4(3) da Diretiva (UE) 2019/790 | Política de direitos de autor versionada; registos de decisão de crawler; livro de direitos de dados de treino com resultado da verificação de reserva | 1 · 2 · 5 | Prestador de IA de finalidade geral | Obrigações a partir de 2025-08-02; aplicação a partir de 2026-08-02 [63][73] | Serviço para a IA |
| `Art. 54` | Um prestador de IA de finalidade geral estabelecido fora da União designa, por mandato escrito, um mandatário antes de colocar o modelo no mercado da União; o mandatário mantém a documentação do Anexo XI durante 10 anos | Mandato escrito; cópia de documentação do Anexo XI mantida 10 anos; rota de contacto do Serviço para a IA | 5 | Prestador de IA de finalidade geral fora da UE + mandatário | Obrigações a partir de 2025-08-02; aplicação a partir de 2026-08-02 [63] | Serviço para a IA |
| `Art. 55` | Modelos de IA de finalidade geral com risco sistémico: avaliação de modelo incluindo testes adversariais; avaliação de risco ao nível da União; comunicação de incidente grave; cibersegurança do modelo | Suite de avaliação e red team; pipeline de incidente no modelo de comunicação de incidente grave da Comissão; controlos de segurança de peso; modelo de ameaça | 3 · 4 · 5 | Prestador de IA de finalidade geral (risco sistémico) | Obrigações a partir de 2025-08-02; aplicação a partir de 2026-08-02 [3][26] | Serviço para a IA |
| `Art. 60` | Testagem de sistemas de IA de risco elevado (Anexo III) em condições reais fora de ambientes de testagem da regulamentação da IA | Plano de testagem em condições reais; `Art. 61` registos de consentimento informado; acompanhamento de teste, registo e hooks de incidente | 3 · 4 | Prestador / prestador prospetivo | 2026-08-02 [22] | Autoridade nacional de fiscalização do mercado |
| `Art. 72` | Acompanhamento pós-comercialização para sistemas de risco elevado | Telemetria de garantia contínua; plano de acompanhamento; sinais de desvio e desempenho | 5 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 73` | Comunicação de incidente grave para sistemas de risco elevado (prazos na tabela de relógio de comunicação abaixo) | Pipeline de detecção e triagem de incidente; automatização do relógio de comunicação; captura de evidência | 5 · 4 | Prestador | 2027-12-02 (Anexo III) [1] | Autoridade nacional de fiscalização do mercado |
| `Art. 73(6)` | Após comunicar um incidente grave, o prestador investiga sem demora (avaliação de risco, ação corretiva) e não altera o sistema de forma que possa afetar a avaliação das causas antes de informar as autoridades | Passo de preservação de evidência: snapshots de modelo, prompt, política e índice de recuperação; traços selados; correção enviada numa nova versão | 4 · 5 | Prestador | 2027-12-02 (Anexo III) [63] | Autoridade nacional de fiscalização do mercado |
| `Art. 75(1a)` | Os prestadores de sistemas de risco elevado sob competência exclusiva do Serviço para a IA (sistemas construídos no seu próprio modelo de IA de finalidade geral, e sistemas em plataformas online muito grandes designadas ou motores de busca) comunicam incidentes graves ao Serviço para a IA, com o Art. 73(2) a (9) a aplicar-se mutatis mutandis | Encaminhamento de pipeline de incidente por uma bandeira de competência de registo (MSA nacional ou Serviço para a IA) | 2 · 5 | Prestador (sistemas sob competência do Serviço para a IA) | 2027-12-02 (Anexo III); novo pelo Omnibus Digital (leitura, verificação) [22] | Serviço para a IA |
| `Art. 86` | Uma pessoa sujeita a uma decisão de um responsável pela implantação baseada num sistema do Anexo III (exceto ponto 2) com efeitos adversos legais ou igualmente significativos pode obter explicações claras e significativas do papel do sistema e dos elementos principais da decisão, quando a lei da União não já dá o direito | Registo de explicação por decisão (versão de sistema e modelo, códigos de razão, papel determinativo ou consultivo, decisor humano); fluxo de trabalho de tratamento de pedido e registo de resposta | 2 · 4 · 5 | Responsável pela implantação | 2027-12-02 (Anexo III); Capítulo IX aplica-se a partir de 2026-08-02 (leitura, verificação) [63][22] | Autoridade nacional de fiscalização do mercado |
| `Art. 87` | A Diretiva (UE) 2019/1937 aplica-se a comunicações de infrações da Lei da IA e à proteção das pessoas que as fazem | Canal de comunicação interna executado como um sistema de casos com os relógios da diretiva codificados; identidade do comunicante selada; acompanhamento de retaliação; encaminhamento para o pipeline de incidente | 1 · 5 | Pessoas coletivas com canais de comunicação interna sob a Diretiva (UE) 2019/1937 | 2026-08-02 [63][64] | Autoridades designadas sob a Diretiva (UE) 2019/1937 |

Várias linhas são desenvolvidas completamente em outras partes do livro:

- `Art. 4`: o programa de literacia como código é
  [literacia em IA como código](/bok/governance-program#ai-literacy-as-code) no capítulo 12, e os
  registos de treino baseados em funções têm um
  [modelo de currículo de literacia](/resources/templates#kit-literacy-curriculum).
- `Art. 4a` e `Art. 10`: a base legal para
  [dados de categoria especial para detecção de enviesamento](/bok/privacy-and-ai#special-categories-inferred-data-and-biometrics)
  está no capítulo 19; os dados necessários para testar enviesamento, e
  [onde o enviesamento entra no ciclo de vida](/bok/fairness-and-explainability#where-bias-enters-the-lifecycle),
  estão no capítulo 16
  ([características protegidas, proxies e os dados que precisa de testar](/bok/fairness-and-explainability#protected-characteristics-proxies-and-the-data-you-need-to-test)).
- `Art. 6`:
  [o filtro do Artigo 6(3) e a sobreposição de definição de perfis](/bok/eu-ai-act#the-annex-iii-filter-and-the-profiling-override)
  são explicados no capítulo 18.
- `Art. 9`: o registo de risco como código é
  [o registo de risco como registo de evidência](/bok/risk-management#the-risk-register-as-an-evidence-record)
  no capítulo 13; o mesmo artefato responde à linha ISO/IEC 23894 abaixo.
- `Art. 11`, `Art. 43` e `Art. 47`:
  [Anexo IV, elemento por elemento](/bok/governing-development#annex-iv-element-by-element) e
  [conformidade, por ordem](/bok/governing-development#eu-ai-act-conformity-in-order) estão no
  capítulo 14.
- `Art. 13`: as instruções de utilização como código têm um
  [JSON Schema e exemplo preenchido](/resources/templates#schema-instructions-for-use); o que devem
  dizer aos responsáveis pela implantação e pessoas afetadas está em
  [a Lei da IA da UE, Artigos 13 e 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (capítulo 16).
- `Art. 25`:
  [quando um ator da cadeia de valor se torna um prestador](/bok/eu-ai-act#article-25-when-someone-else-becomes-the-provider)
  é estabelecido no capítulo 18.
- `Art. 26`: os
  [deveres do responsável pela implantação em operação](/bok/governing-deployment#operating-the-system)
  estão no capítulo 15.
- `Art. 27`: a referência cruzada da FRIA para uma GDPR `Art. 35` AIPD é desenvolvida em
  [a AIPD para sistemas de IA](/bok/privacy-and-ai#the-dpia-for-ai-systems) (capítulo 19).
- `Art. 72`: o plano de acompanhamento tem um
  [esquema de plano de acompanhamento pós-comercialização](/resources/templates#schema-post-market-monitoring-plan).
- `Art. 3(1)`: o registo de decisão definitória é construído campo a campo em
  [do elemento de definição ao campo de registo](/bok/ai-defined#from-definition-element-to-registry-field)
  (capítulo 11).
- `Art. 15(4)`: os ciclos de retroalimentação são acompanhados em
  [acompanhamento de equidade em produção](/bok/fairness-and-explainability#monitoring-fairness-in-production)
  (capítulo 16), e para agentes em
  [governação de memória e contexto](/bok/governing-agents#memory-and-context-governance) (capítulo
  23); `Art. 16(l)` tem
  [explicações acessíveis](/bok/fairness-and-explainability#accessible-explanations).
- `Art. 17(1)(m)`: a estrutura de responsabilização é
  [um RACI de ciclo de vida](/bok/governance-program#a-lifecycle-raci) (capítulo 12); `Art. 43(4)` é
  [modificação substancial](/bok/governing-development#substantial-modification) no capítulo 14;
  `Arts. 22` a `24` são [os papéis de operador da UE](/bok/eu-ai-act#the-eu-operator-roles) no
  capítulo 18.
- `Art. 26(2)` a `26(11)`: os parágrafos do responsável pela implantação percorrem o capítulo 15,
  desde
  [verificação dos dados e das pessoas](/bok/governing-deployment#check-the-data-and-the-people) até
  [retenção de registos](/bok/governing-deployment#records-retention) e
  [comunicações externas](/bok/governing-deployment#external-communications); o capítulo 17 cobre
  [informação do prestador e suspensão de utilização](/bok/incidents#deployer-duties-inform-the-provider-suspend-use)
  (`Art. 26(5)`) e [congelamento antes de corrigir](/bok/incidents#freeze-before-you-fix)
  (`Art. 73(6)`), e o capítulo 23
  [design de aprovação para pontos de verificação de agentes](/bok/governing-agents#human-checkpoints-and-approval-design).
- `Art. 52`: o livro de cálculo e a notificação de duas semanas estão em
  [risco sistémico: limiar, notificação, designação](/bok/eu-ai-act#systemic-risk-threshold-notification-designation)
  (capítulo 18); `Art. 53(1)(c)` é
  [direitos de autor e dados de treino](/bok/existing-law#copyright-and-training-data) (capítulo
  20).
- `Art. 86`: o registo de explicação é especificado em
  [a Lei da IA da UE, Artigos 13 e 86](/bok/fairness-and-explainability#the-eu-ai-act-articles-13-and-86)
  (capítulo 16) e
  [explicação e aviso para pessoas afetadas](/bok/eu-ai-act#explanation-and-notice-to-affected-people)
  (capítulo 18); `Art. 87` é cumprido por
  [um canal para levantar preocupações](/bok/governance-program#a-channel-for-raising-concerns)
  (capítulo 12).

O Omnibus também alterou as linhas que a tabela comprime numa única linha [22]. Para `Art. 6`, um
**componente de segurança** deve agora ter a finalidade de prevenir ou mitigar riscos para a saúde e
segurança, ou ser um cuja falha as coloca em perigo (`Art. 3(14)`, `Art. 6(1a)` a `6(1c)`); este
estreitamento aplica-se à rota do Anexo I a partir de 2 de agosto de 2028, e maquinaria transferida
da Secção A para a Secção B do Anexo I. O registo de conformidade do Anexo VIII, Secção B para
sistemas que dependem do filtro `Art. 6(3)` perdeu o resumo dos fundamentos e a lista de
Estados-Membros. Para `Art. 25`, o dever de cooperação do prestador inicial agora nomeia
documentação suficiente para avaliar a conformidade, limitações conhecidas e modos de falha, e
acesso técnico direcionado para testes (`Art. 25(2)`); a informação e o acesso devem ser fixados num
acordo escrito (`Art. 25(4)`), e as violações de ambos os parágrafos são multadas sob
`Art. 99(4)(da)`.

O relógio do Artigo 73 funciona por classe de incidente. O prestador notifica a autoridade de
fiscalização do mercado do Estado-Membro onde o incidente ocorreu imediatamente após estabelecer uma
ligação causal entre o sistema e o incidente, ou a probabilidade razoável de uma, e em qualquer caso
dentro de um prazo máximo que decorre do momento em que o prestador ou, quando aplicável, o
responsável pela implantação **fica ciente** do incidente, não a partir da constatação causal [57].
Um responsável pela implantação que identifique um incidente grave informa primeiro o prestador,
depois o importador ou distribuidor e a autoridade de fiscalização do mercado; se não conseguir
contactar o prestador, o Artigo 73 aplica-se ao responsável pela implantação mutatis mutandis
(`Art. 26(5)`) [57]:

| Classe de incidente | Prazo de comunicação | Quem comunica | Artefato |
|---|---|---|---|
| Incidente grave (geral) | Imediatamente após uma ligação causal ou sua probabilidade razoável; no máximo 15 dias após a tomada de conhecimento | Prestador → autoridade de fiscalização do mercado nacional; o responsável pela implantação se não conseguir contactar o prestador (`Art. 26(5)`) | Pipeline de triagem de incidentes; automatização do relógio de comunicação |
| Violação generalizada, ou perturbação grave e irreversível de infraestrutura crítica | Imediatamente; no máximo 2 dias após a tomada de conhecimento | Prestador → autoridade de fiscalização do mercado nacional; o responsável pela implantação se não conseguir contactar o prestador (`Art. 26(5)`) | Mesmo pipeline, rota de gravidade escalada |
| Morte de uma pessoa | Imediatamente após estabelecer ou suspeitar de uma ligação causal; no máximo 10 dias após a tomada de conhecimento | Prestador → autoridade de fiscalização do mercado nacional; o responsável pela implantação se não conseguir contactar o prestador (`Art. 26(5)`) | Mesmo pipeline, rota prioritária |

O Omnibus deixou estes prazos inalterados. Para sistemas de risco elevado sob a competência
exclusiva do Serviço para a IA, o seu novo `Art. 75(1a)` envia o relatório para o Serviço para a IA
em vez disso, com `Art. 73(2)` a `(9)` aplicando-se mutatis mutandis, e o Serviço para a IA
transmite-o à autoridade de fiscalização do mercado do Estado-Membro onde o prestador está
estabelecido [22]. Um incidente raramente inicia apenas um relógio: o capítulo 17 coloca o relógio
do Artigo 73 ao lado dos relógios RGPD, SRI 2, DORA, CRA e GPAI em
[os relógios sobrepostos](/bok/incidents#the-overlapping-clocks), e o
[esquema de registo de incidentes](/resources/templates#schema-incident-record) contém os registos
de data e hora que cada um necessita.

Duas disposições transversais enquadram as sanções. Sob **`Art. 101`**, a Comissão Europeia pode
multar prestadores de GPAI até 3% do volume de negócios anual mundial ou EUR 15 milhões, consoante o
que for superior [3][4]. Sob o novo **`Art. 75a`–`75d`** do Omnibus, o Serviço para a IA ganha
poderes de investigação, compromissos vinculativos e decisões de não conformidade sobre os sistemas
de IA para os quais o `Art. 75(1)` alterado o torna exclusivamente competente (sistemas construídos
sobre um modelo GPAI pelo mesmo prestador ou empresa, e sistemas em plataformas online muito grandes
designadas ou motores de busca), não sobre modelos GPAI em geral. Os pagamentos de penalidades
periódicas atingem até 5% do rendimento médio diário ou volume de negócios anual mundial por dia por
violação contínua (`Art. 75c(5)`). O Omnibus entrou em vigor em 27 de julho de 2026, e o Capítulo
IX, onde estes artigos se encontram, aplica-se a partir de 2 de agosto de 2026 sob `Art. 113`
[8][22]. As multas administrativas de risco elevado funcionam sob `Art. 99` (limites de 7%, 3% e 1%
do volume de negócios consoante a violação), impostas pelas autoridades nacionais [4]. O Capítulo 18
estabelece [quem supervisiona o quê](/bok/eu-ai-act#who-supervises-what) e
[os poderes diretos do Serviço para a IA](/bok/eu-ai-act#the-ai-offices-direct-powers-articles-75-and-75a-to-75d).

## Código de Prática GPAI

O Código de Prática GPAI, publicado em 10 de julho de 2025, é o instrumento voluntário que os
prestadores utilizam para demonstrar conformidade com as obrigações GPAI até existirem normas
harmonizadas. Tem três capítulos [9][10].

| Capítulo | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|
| Segurança (apenas modelos de risco sistémico) | Um Quadro de Segurança; avaliações de modelos incl. testes adversariais; avaliação e mitigação de risco sistémico; comunicação de incidentes graves; segurança de modelos e infraestrutura | Suite de avaliação e red team; arnês de testes adversariais; pipeline de incidentes; controlos de segurança de pesos | 3 · 4 · 5 |
| Transparência | Documentação de modelos atualizada para o Serviço para a IA e responsáveis pela implantação a jusante | Fichas de modelo; documentação de modelo estruturada; AIBOM | 2 |
| Direitos de autor | Uma política para cumprir a lei de direitos de autor da União, incl. respeitar reservas de direitos | Registos de proveniência e licença de dados de treino; política como código para filtragem de fontes | 1 · 2 |
| Segurança, Compromisso 9 (comunicação de incidentes graves) | Comunicar incidentes graves ao Serviço para a IA dentro de 2, 5, 10 ou 15 dias por classe de incidente, com relatórios intermédios pelo menos a cada quatro semanas enquanto não resolvido e um relatório final dentro de 60 dias da resolução; manter os registos pelo menos cinco anos [65] | Pipeline de incidentes nos campos do modelo da Comissão; relógios por classe; política de retenção de cinco anos; canal de comunicação a jusante | 4 · 5 |
| Segurança, Apêndice 1.3 e 1.4 (autonomia, utilização de ferramentas, perda de controlo) | As fontes de risco sistémico a considerar incluem a capacidade de operar autonomamente, propensões como colusão com outros sistemas de IA, e affordances como acesso a ferramentas e sistemas físicos e o nível de supervisão humana; a perda de controlo é um risco sistémico especificado [65] | Avaliações do prestador de autonomia e utilização de ferramentas, solicitadas no gate de due-diligence do fornecedor e arquivadas com a entrada do registo de agentes | 3 · 5 |

O Código é voluntário; assiná-lo é uma rota para demonstrar conformidade, não uma presunção legal de
conformidade [9]. O estado de signatário é dinâmico e contado de acordo com a lista oficial da
Comissão [10].

Para comunicação de incidentes graves especificamente, a Comissão publicou um modelo de comunicação
em 4 de novembro de 2025 para incidentes graves envolvendo modelos GPAI com risco sistémico.
Alinha-se ao dever de comunicação do Artigo 55 e ao Compromisso 9 do capítulo Segurança do Código, e
é o artefato concreto que o pipeline de incidentes emite, o mesmo modelo nomeado na linha do Artigo
55 acima [26]. Um [registo de incidente](/resources/templates#schema-incident-record) interno pode
alimentar este modelo e o relatório de todos os outros regimes. O Compromisso 9 do capítulo
Segurança estabelece os relógios (2, 5, 10 ou 15 dias por classe de incidente, relatórios
intermédios pelo menos a cada quatro semanas, um relatório final dentro de 60 dias da resolução) e
uma retenção de pelo menos cinco anos, e o seu Apêndice 1 lista a capacidade de operar autonomamente
e acesso a ferramentas entre as fontes de risco sistémico e perda de controlo entre os riscos
especificados, razão pela qual as duas linhas acima importam a qualquer pessoa que implante agentes
num modelo GPAI [65]. O Capítulo 17 coloca o Compromisso 9 ao lado dos outros regimes em
[os relógios sobrepostos](/bok/incidents#the-overlapping-clocks), e o capítulo 23 lê o Apêndice 1
para agentes em
[Ganchos do Regulamento da IA da UE para agentes](/bok/governing-agents#eu-ai-act-hooks-for-agents).

## Proteção de dados e outra legislação da UE

Um sistema de IA colocado no mercado da UE cumpre mais legislação do que o Regulamento da IA no
primeiro dia. As linhas abaixo indexam as obrigações que os capítulos v0.5.0 ensinam: o RGPD, os
regimes de cibersegurança e comunicação de incidentes, e a responsabilidade, direitos de autor,
consumidor e legislação sectorial que já alcançam a IA. Respondem aos seus próprios supervisores
(autoridades de proteção de dados, CSIRTs e supervisores financeiros, tribunais e autoridades de
consumo), não às autoridades de fiscalização do mercado do Regulamento da IA, e vários aplicam-se
através de transposição nacional, portanto a coluna "Aplica-se" diz assim. Os mapeamentos são
ilustrativos, não uma afirmação de conformidade.

### O RGPD

O RGPD aplica-se desde 25 de maio de 2018 [66]. O Capítulo 19 percorre cada linha abaixo, com o
teste de anonimato do EDPB para modelos treinados [67], em
[lei de privacidade e proteção de dados aplicada à IA](/bok/privacy-and-ai#obligation-to-artefact-map);
o capítulo 16 constrói os registos de explicação e contestação de `Arts. 15(1)(h)` e `22` em
[proteção de dados: o RGPD e o regime do Reino Unido](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).

| Artigo | O que pede | Artefato de engenharia | Camada | Quem está vinculado | Aplica-se |
|---|---|---|---|---|---|
| `Art. 5(1)(b) and 6(4)` | Os dados pessoais são recolhidos para fins especificados, explícitos e legítimos e não são posteriormente tratados de forma incompatível; o Art. 6(4) estabelece o teste de compatibilidade para reutilização, como treino em dados recolhidos para outro fim [66] | Etiquetas de fim em conjuntos de dados; política de correspondência de fim em pipelines de treino e indexação; registo de avaliação de compatibilidade | 1 · 2 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 6` | Uma base legal para cada operação de tratamento, avaliada separadamente para treino, ajuste fino, recuperação e inferência [66][67] | Registo de base por conjunto de dados e fase; avaliação de interesse legítimo versionada | 2 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 7` | Quando o consentimento é a base, o responsável pelo tratamento pode demonstrá-lo, e retirar o consentimento é tão fácil quanto dá-lo [66] | Registo de consentimento-fim associado a conjuntos de dados e versões de modelos; retirada propagada aos pipelines | 2 · 5 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 9` | O tratamento de dados de categorias especiais, incl. dados biométricos para identificação única, é proibido a menos que uma condição do Art. 9(2) se aplique, que alcança dados sensíveis que um modelo infere [66] | Teste de proxy em CI; política de inferência com um classificador de saída em tempo de execução; registo de condição do Art. 9(2) | 1 · 3 · 4 | Responsável pelo tratamento | 2018-05-25 |
| `Arts. 13–14` | Informar os titulares dos dados sobre fins, bases, destinatários e retenção e, para tomada de decisão automatizada, dar informações significativas sobre a lógica envolvida (Arts. 13(2)(f), 14(2)(g)) [66] | Aviso gerado a partir da entrada do registo; ficha de modelo; aviso de decisão automatizada por sistema | 2 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 15(1)(h)` | Sob pedido, confirmar tomada de decisão automatizada e dar informações significativas sobre a lógica envolvida e a sua significância e consequências previstas [66] | Explicação por pedido gerada a partir do registo de decisão; aviso de decisão automatizada ao nível do sistema | 4 · 5 | Responsável pelo tratamento | 2018-05-25 |
| `Arts. 15–17 and 21` | Os pedidos de acesso, retificação, apagamento e oposição alcançam todos os locais onde os dados vivem: corpus, snapshots, índice de recuperação, registos e, quando contém dados pessoais, o modelo [66] | Fluxo de trabalho de pedido através de corpus, snapshots, índice de recuperação, registos e pesos; registo de cumprimento | 4 · 5 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 22` | Um direito de não estar sujeito a uma decisão baseada unicamente em tratamento automatizado com efeitos legais ou igualmente significativos, exceto em contrato, lei ou consentimento explícito; depois intervenção humana, o direito de expressar uma opinião e de contestar (Art. 22(3)) [66] | Registo de decisão com códigos de razão; canal de contestação e registo de revisão humana; resultados de recurso por grupo | 4 · 5 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 5(1)(c) and 25` | Dados adequados, relevantes e limitados, com medidas técnicas e organizacionais integradas na conceção e definidas por defeito [66] | Registo de justificação de características; filtros de dados pessoais e categorias especiais; retenção como código | 1 · 3 | Responsável pelo tratamento | 2018-05-25 |
| `Art. 5(2)` | Um responsável pelo tratamento que afirme que um modelo treinado não contém dados pessoais deve ser capaz de o demonstrar; o EDPB estabelece um teste de anonimato e a evidência que espera [66][67] | Pacote de evidência de anonimato; avaliações de inferência de pertença e extração no portão de avaliação | 3 · 5 | Responsável pelo tratamento (programador do modelo) | 2018-05-25 |
| `Art. 28` | Utilizar apenas subcontratantes com garantias suficientes, sob contrato que fixe instruções, sub-subcontratantes, segurança, assistência e eliminação [66] | Lista de verificação de cláusula de fornecedor de IA no portão de diligência devida (sem treino, retenção, região, sub-subcontratantes, aviso de alteração) | 2 · 5 | Responsável pelo tratamento; subcontratante | 2018-05-25 |
| `Art. 30` | Os responsáveis pelo tratamento e os subcontratantes mantêm um registo das atividades de tratamento sob a sua responsabilidade [66] | Registos gerados por momento de tratamento a partir do registo e fichas de dados | 2 · 5 | Responsável pelo tratamento; subcontratante | 2018-05-25 |
| `Arts. 33–34` | Notificar a autoridade de supervisão sem demora injustificada e, se viável, no prazo de 72 horas após tomar conhecimento; informar os titulares dos dados sem demora injustificada quando a violação é suscetível de resultar em risco elevado [66] | Ramo de violação de dados pessoais do pipeline de incidentes com temporizador próprio de 72 horas; modelo de notificação de titular dos dados | 4 · 5 | Responsável pelo tratamento (o subcontratante notifica o responsável pelo tratamento) | 2018-05-25 |
| `Arts. 35–36` | Avaliar o impacto antes do tratamento suscetível de resultar em risco elevado e consultar a autoridade de supervisão quando o risco residual se mantém elevado [66] | Modelo de AIPD com campos específicos de IA, referenciado cruzadamente pela FRIA; decisão registada quando não é necessária AIPD | 1 · 2 | Responsável pelo tratamento | 2018-05-25 |
| `Arts. 44–49` | Transferências fora do EEE apenas com base numa decisão de adequação, salvaguardas apropriadas (como cláusulas contratuais-tipo ou regras vinculativas corporativas) ou derrogação restrita; enviar dados pessoais para um modelo alojado fora do EEE pode constituir uma transferência [66] | Registo de transferências; política de residência e encaminhamento como código; avaliação de impacto de transferência | 1 · 4 · 5 | Responsável pelo tratamento; subcontratante | 2018-05-25 |

### Lei de cibersegurança e comunicação de incidentes

A NIS2 vincula entidades essenciais e importantes através da legislação nacional, que os
Estados-Membros aplicam a partir de 18 de outubro de 2024 [68]; a DORA aplica-se a entidades
financeiras desde 17 de janeiro de 2025 [69], com os prazos de incidente fixados no Regulamento
Delegado (UE) 2025/301 [70]; e o dever de comunicação da Lei de Ciber-Resiliência aplica-se a partir
de 11 de setembro de 2026, antes do resto desse Regulamento em 11 de dezembro de 2027 [71]. Um
incidente de IA pode iniciar vários destes prazos em simultâneo: o capítulo 17 coloca-os lado a lado
em [os prazos sobrepostos](/bok/incidents#the-overlapping-clocks), e o capítulo 15 aborda
[continuidade quando o prestador falha](/bok/governing-deployment#when-the-provider-fails-continuity).

| Artigo | O que pede | Artefato de engenharia | Camada | Quem está vinculado | Aplica-se |
|---|---|---|---|---|---|
| NIS2 `Art. 21(2)(c)–(d)` | As medidas de gestão de riscos incluem continuidade de negócio (cópia de segurança, recuperação de desastres, gestão de crises) e segurança da cadeia de fornecimento com fornecedores diretos e prestadores de serviços, que abrange serviços de IA e modelos [68] | Plano de continuidade para dependências de IA com alternativas testadas; avaliações de fornecedores para prestadores de modelos e plataformas | 4 · 5 | Entidades essenciais e importantes | 2024-10-18, através da legislação nacional |
| NIS2 `Art. 23` | Um aviso prévio no prazo de 24 horas após tomar conhecimento de um incidente significativo, uma notificação de incidente no prazo de 72 horas e um relatório final no prazo de um mês após a notificação, incl. a causa raiz [68] | Relógio por regime no registo de incidente; determinação de significância com um proprietário; codificação de causa reutilizada no relatório final | 5 | Entidades essenciais e importantes | 2024-10-18, através da legislação nacional |
| DORA `Art. 19` | Comunicar incidentes graves relacionados com TIC: notificação inicial no prazo de 4 horas após classificação como grave e no máximo 24 horas após tomar conhecimento (no prazo de 4 horas de uma classificação feita após essas 24 horas), relatório intermédio no prazo de 72 horas após a notificação inicial, relatório final no prazo de um mês após o último relatório intermédio [69][70] | Registo de classificação com marca de tempo; relógio por regime; codificação de causa consistente para agregação de incidentes recorrentes | 5 | Entidades financeiras | 2025-01-17 |
| DORA `Art. 28(3)`, `28(8)` | Manter um registo de informações sobre todos os acordos contratuais para serviços de TIC de prestadores terceiros e estratégias de saída para serviços de TIC que suportam funções críticas ou importantes [69] | Entradas de registo para serviços de IA e modelos; plano de saída e registo de exercício de saída | 2 · 5 | Entidades financeiras | 2025-01-17 |
| CRA `Art. 14` | Notificar vulnerabilidades ativamente exploradas e incidentes graves através da plataforma única de comunicação: aviso prévio no prazo de 24 horas, notificação no prazo de 72 horas, relatório final 14 dias após uma correção estar disponível (vulnerabilidade) ou um mês após a notificação (incidente) [71] | Relógios de vulnerabilidade e incidente no registo de incidente; submissão através da plataforma única de comunicação | 4 · 5 | Fabricantes de produtos com elementos digitais | 2026-09-11; o resto a partir de 2027-12-11 |

### Responsabilidade civil, direitos de autor, direito do consumidor e direito setorial

A Diretiva revista sobre responsabilidade decorrente dos produtos defeituosos trata o software,
incluindo sistemas de IA, como um produto e aplica-se a produtos colocados no mercado após 9 de
dezembro de 2026 [72]. A exceção de mineração de texto e dados da Diretiva DSM cede a uma reserva do
titular de direitos [73], que é a regra `Art. 53(1)(c)` a que o Regulamento da IA aponta. A Lei de
Serviços Digitais, a Diretiva sobre Práticas Comerciais Desleais, a Diretiva sobre Trabalho em
Plataformas e a Diretiva revista sobre Crédito ao Consumidor acrescentam deveres para plataformas,
comerciantes, plataformas de trabalho digital e credores [74][75][76][77]. O capítulo 20 ensina-os:
[direitos de autor e dados de treino](/bok/existing-law#copyright-and-training-data),
[a Diretiva da UE sobre responsabilidade decorrente dos produtos defeituosos](/bok/existing-law#the-eu-product-liability-directive),
[dever de avisar após atualizações](/bok/existing-law#duty-to-warn-after-updates),
[a UE: UCPD, DSA e Regulamento da IA](/bok/existing-law#the-eu-ucpd-dsa-and-the-ai-act),
[emprego](/bok/existing-law#employment) e
[crédito e empréstimo](/bok/existing-law#credit-and-lending).

| Artigo | O que pede | Artefato de engenharia | Camada | Quem está vinculado | Aplica-se |
|---|---|---|---|---|---|
| PLD `Art. 4(1)` | O software é um produto, pelo que o fabricante de um sistema de IA é estritamente responsável pelos danos causados por um defeito num produto colocado no mercado ou colocado em serviço após 2026-12-09 [72] | Revisão de responsabilidade por defeito na conceção; recurso contratual; risco residual no registo | 1 · 5 | Fabricantes e outros operadores económicos | Produtos colocados no mercado após 2026-12-09 |
| PLD `Arts. 9–10` | Um tribunal pode ordenar ao arguido que divulgue provas relevantes ao seu dispor; a falha em divulgá-las é uma das condições sob as quais o produto é presumido defeituoso [72] | Ficheiro de defesa por lançamento: AIBOM com hashes, histórico de avaliação, análise de modo de falha, registos assinados, instruções de utilização, mantidos durante o período de responsabilidade | 2 · 3 · 5 | Fabricantes, incl. prestadores de sistemas de IA e modificadores substanciais | Produtos colocados no mercado após 2026-12-09 |
| PLD `Art. 11(2)` | O fabricante não pode invocar o defeito que surge após a colocação no mercado quando é devido a software, incl. as suas atualizações ou melhorias, ou a atualizações de segurança em falta, que permanecem sob o seu controlo [72] | Registo de alterações; avaliações de regressão por lançamento; registos de decisão de correção; avisos versionados | 3 · 4 · 5 | Fabricantes | Produtos colocados no mercado após 2026-12-09 |
| Diretiva DSM `Art. 4(3)` | A exceção geral de mineração de texto e dados aplica-se apenas quando os titulares de direitos não reservaram expressamente a utilização de forma apropriada, como por meios legíveis por máquina para conteúdo disponibilizado publicamente online [73] | Política de rastreador como código honrando reservas; registo de direitos de dados de treino com resultado, método e data da verificação de reserva | 1 · 2 | Qualquer pessoa que minere obras, incl. programadores de modelos | Prazo de transposição 2021-06-07 |
| DSA `Art. 25` | As plataformas online não concebem, organizam ou operam as suas interfaces de forma a enganar ou manipular utilizadores ou prejudicar as suas decisões livres e informadas [74] | Registo de revisão de interface; avaliação de red-team para resultados manipulativos | 3 · 5 | Prestadores de plataformas online | 2024-02-17 |
| DSA `Art. 27` | As plataformas online estabelecem nos seus termos os parâmetros principais dos seus sistemas de recomendação e quaisquer opções que os utilizadores têm para os modificar [74] | Ficha de parâmetro de recomendação gerada a partir da configuração de classificação; registo das opções oferecidas aos utilizadores | 2 · 4 | Prestadores de plataformas online | 2024-02-17 |
| UCPD `Arts. 5–7`, Anexo I | Nenhuma prática comercial contrária à diligência profissional, ou enganosa, que distorça as decisões do consumidor médio, incl. afirmações geradas por IA e respostas de chatbot; afirmar que as avaliações são genuínas sem verificações razoáveis, e avaliações falsas, estão na lista negra (Anexo I pontos 23b e 23c) [75] | Registo de afirmações ligado aos resultados de avaliação; verificações de proveniência de avaliação; avaliações de resposta de chatbot sobre afirmações de produto | 1 · 3 · 4 | Comerciantes que lidam com consumidores | 2007-12-12; pontos de avaliação desde a Diretiva (UE) 2019/2161 |
| Diretiva sobre Trabalho em Plataformas `Arts. 7`, `9–11` | Limites aos dados pessoais que as plataformas podem processar através de sistemas automatizados, transparência sobre esses sistemas, supervisão humana com avaliação de impacto pelo menos a cada dois anos, e explicação e revisão humana de decisões [76] | Registo de sistemas automatizados com os seus parâmetros principais; lista de negação de categoria de dados; avaliação de impacto bienal; explicação e registo de revisão humana | 1 · 2 · 3 · 5 | Plataformas de trabalho digital | Transposição até 2026-12-02 |
| CCD2 `Art. 18(8)` | Quando a avaliação da capacidade de crédito envolve processamento automatizado, o consumidor pode solicitar intervenção humana, uma explicação clara da avaliação e da sua lógica, e uma revisão da decisão [77] | Artefato de explicação por versão de modelo; caminho de revisão e registo | 3 · 4 · 5 | Credores | 2026-11-20 |

## ISO/IEC 42001, 42005 e 42006

A ISO/IEC 42001:2023 é a norma de sistema de gestão de IA (AIMS); o seu Anexo A agrupa objetivos de
controlo em nove áreas (`A.2`–`A.10`). É uma norma de sistema de gestão, não o QMS do Artigo 17, e a
sua adoção europeia (EN ISO/IEC 42001:2026) não confere presunção de conformidade [11][12].

| Área do Anexo A | Foco | Artefato de engenharia | Camada |
|---|---|---|---|
| `A.2` Políticas relacionadas com IA | Conjunto de política de IA e sua governação | Biblioteca de política como código; repositório de política versionado | 1 |
| `A.3` Organização interna | Funções, responsabilidades, comunicação | Modelo operacional; RACI; propriedade no registo | 1 · 2 |
| `A.4` Recursos para sistemas de IA | Dados, ferramentas, computação, recursos humanos documentados | Inventário de recursos; AIBOM; manifestos de ambiente | 2 |
| `A.5` Avaliação de impactos de sistemas de IA | Processo de avaliação de impacto | Avaliação de impacto como código; ligação FRIA/AIPD (ISO/IEC 42005) | 1 · 3 |
| `A.6` Ciclo de vida do sistema de IA | Conceção, desenvolvimento e implantação responsáveis | Controlos de pipeline; portões de avaliação; gestão de alterações | 1 · 3 · 4 |
| `A.7` Dados para sistemas de IA | Qualidade de dados, proveniência, preparação | Fichas de dados; linhagem; testes de qualidade de dados | 2 · 3 |
| `A.8` Informação para partes interessadas | Transparência e comunicação às partes interessadas | Fichas de modelo/dados; divulgações legíveis por máquina | 2 |
| `A.9` Utilização de sistemas de IA | Controlos de utilização responsável e monitorização | Guardrails de runtime; telemetria de utilização | 4 |
| `A.10` Relações com terceiros e clientes | Gestão de responsabilidades de fornecedor e cliente | AIBOM de fornecedor; mapeamento de controlo contratual e técnico | 2 · 5 |

ISO/IEC 42005:2025 fornece orientação para avaliação de impacto de sistemas de IA e é o acompanhante
natural do Artigo 27 (FRIA) e do Anexo A.5 [13]. O modelo operacional e a RACI da linha `A.3` são
construídos numa [RACI de ciclo de vida](/bok/governance-program#a-lifecycle-raci) (capítulo 12), e
o capítulo 22 coloca estas normas na
[família ISO/IEC](/bok/principles-and-standards#the-isoiec-family) como um todo.

Duas normas ISO/IEC adicionais situam-se ao lado das AIMS. **ISO/IEC 42006:2025** estabelece os
requisitos para os organismos que auditam e certificam sistemas de gestão de IA: baseando-se na
ISO/IEC 17021-1, é a resposta a "quem pode certificar-vos credibilidade para 42001", uma vez que
fixa a competência e a consistência que um organismo de certificação deve demonstrar.
**ISO/IEC 23894:2023** fornece orientação sobre gestão de riscos de IA, adaptando a ISO 31000 à IA;
é o acompanhante do processo de risco do Artigo 9 e do NIST AI RMF [27][28]. A tabela também inclui
ISO/IEC 42005:2025, a orientação de avaliação de impacto [13], e **ISO/IEC 22989:2022**, a norma de
conceitos e terminologia cujos papéis de intervenientes em IA e vocabulário de ciclo de vida um
registo pode reutilizar campo a campo [78].

| Norma | O que é | Artefato de engenharia | Camada |
|---|---|---|---|
| `ISO/IEC 42006:2025` | Requisitos para organismos que auditam e certificam sistemas de gestão de IA (quem pode certificar-vos credibilidade para 42001) | Âmbito de certificação acreditado; evidência de competência do auditor; registo de certificados | 5 |
| `ISO/IEC 23894:2023` | Orientação sobre gestão de riscos de IA (acompanhante da ISO 31000) | Registo de riscos como código; taxonomia de riscos de IA; ligação ao Regulamento da IA da UE `Art. 9` e ao NIST AI RMF | 1 · 3 |
| `ISO/IEC 42005:2025` | Orientação para avaliar os impactos de um sistema de IA sobre indivíduos, grupos e sociedade ao longo do seu ciclo de vida (acompanhante do Art. 27 e Anexo A.5) [13] | Avaliação de impacto como código a partir de um modelo; referências cruzadas FRIA e AIPD; gatilhos de reavaliação | 1 · 3 |
| `ISO/IEC 22989:2022` | Um vocabulário partilhado para conceitos de IA, o ciclo de vida do sistema de IA e papéis de intervenientes em IA [78] | Nomes de campos de registo e vocabulário de papéis alinhados aos termos da norma; referências cruzadas de glossário | 2 |

**Correspondências:** estes controlos são realizados através das camadas 1, 2, 3 e 5 do stack; o
controlo de avaliação de impacto (A.5 / ISO 42005) suporta o Regulamento da IA da UE `Art. 27`. Os
mapeamentos são ilustrativos, não uma afirmação de conformidade.

## NIST AI RMF

O NIST AI Risk Management Framework 1.0 (janeiro de 2023; não existe 2.0) organiza o trabalho de
risco em quatro funções. É voluntário e de origem norte-americana, e mapeia-se claramente para o
stack de cinco camadas [14]. A partir de 2026-09-24, a página do framework do NIST afirma que o AI
RMF 1.0 "está a ser revisto como parte do Plano de Ação de IA da Casa Branca"; nenhum texto revisto
tinha sido publicado, portanto 1.0 permanece a versão a citar e a fixar em metadados de controlo
[59]. O capítulo 22 cobre
[o NIST AI RMF em profundidade](/bok/principles-and-standards#nist-ai-rmf-10-in-depth): as sete
características confiáveis, as 19 categorias do Core, o Playbook e os perfis.

| Função | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|
| GOVERN | Uma cultura e estrutura para gerir riscos de IA | Política como código; modelo operacional; propriedade do registo | 1 · 2 |
| MAP | Contexto e enquadramento de risco para cada sistema de IA | Modelos de ameaça; mapeamento de caso de uso e impacto; fichas de dados/modelo | 2 · 3 |
| MEASURE | Analisar, comparar e monitorizar risco | Portais de avaliação; suite de red-team adversarial; métricas por modo de falha | 3 |
| MANAGE | Priorizar, responder e recuperar | Guardrails de runtime; pipeline de incidentes; garantia contínua | 4 · 5 |

### Trabalho NIST de IA mais recente

Para além do RMF, três esforços NIST mais recentes têm impacto no stack. Dois ainda estão em
rascunho, e o texto o diz. A **AI Agent Standards Initiative**, lançada pelo Center for AI Standards
and Innovation (CAISI) do NIST em 17 de fevereiro de 2026, visa normas interoperáveis e seguras para
agentes de IA: identidade, autenticação, autorização e segurança de agentes [29]. O
**IR 8596 Cyber AI Profile** em rascunho (rascunho preliminar inicial, 16 de dezembro de 2025;
comentários fechados em 30 de janeiro de 2026, e ainda a versão atual a partir de 2026-09-24) é um
perfil do Cybersecurity Framework (CSF 2.0) para IA, organizado em torno de Secure, Defend e Thwart
[30]. O **AI 800-1** em rascunho (Managing Misuse Risk for Dual-Use Foundation Models; segundo
rascunho público, janeiro de 2025; nenhuma versão final publicada a partir de 2026-09-24) é
orientação voluntária para identificar, medir e mitigar riscos de utilização indevida ao longo do
ciclo de vida da IA [31]. O **Generative AI Profile** mais antigo, NIST AI 600-1 (26 de julho de
2024), é o acompanhante do RMF para IA generativa: 12 riscos e ações sugeridas codificadas para as
quatro funções, e a tabela também o inclui [79].

| Item NIST | O que é | Artefato de engenharia | Camada |
|---|---|---|---|
| AI Agent Standards Initiative (2026) | Iniciativa CAISI sobre agentes de IA interoperáveis e seguros: identidade, autenticação, segurança de agentes | Registo de agentes; controlos de identidade não humana; autenticação e autorização de agentes; avaliações adversariais de agentes | 3 · 4 |
| IR 8596 Cyber AI Profile (rascunho) | Perfil CSF 2.0 para IA (Secure / Defend / Thwart) | Controlos de segurança de sistemas de IA; observabilidade de runtime; detecção de ameaças mapeada para CSF 2.0 | 3 · 4 |
| AI 800-1 (rascunho) | Managing Misuse Risk for Dual-Use Foundation Models (orientação voluntária) | Suite de red-team de utilização indevida; avaliações de capacidade e capacidade perigosa; framework de segurança | 3 |
| AI 600-1 Generative AI Profile (2024) | Ações sugeridas para 12 riscos que a IA generativa cria ou agrava, codificadas para as funções Govern, Map, Measure e Manage [79] | Suites de avaliação de IA generativa nomeadas após os ids de ação do perfil (p. ex. confabulação, integridade da informação); uma entrada de registo de riscos por risco de perfil | 1 · 3 |

## CSA AICM e STAR para IA

A AI Controls Matrix (AICM) v1.1 da Cloud Security Alliance, publicada em 22 de junho de 2026,
define 247 objetivos de controlo em 18 domínios, e o programa STAR para IA fornece o esquema de
garantia em torno dela, em três níveis: uma auto-avaliação de Nível 1, uma validação automatizada
"Valid-AI-ted" de Nível 1, e um Nível 2 que adiciona certificação ISO/IEC 42001 [15][83].

| Artefato CSA | O que é | Artefato de engenharia | Camada |
|---|---|---|---|
| AICM v1.1 | 247 objetivos de controlo em 18 domínios, abrangendo governação, dados, modelo e runtime | Catálogo de controlos mapeado para política como código e avaliações; crosswalk para ISO 42001 / NIST AI RMF | 1 · 3 · 5 |
| STAR para IA | Programa de garantia e certificação na AICM: auto-avaliação de Nível 1, Valid-AI-ted de Nível 1 (validação automatizada) e Nível 2 (certificação ISO/IEC 42001 mais a avaliação validada) [83] | Submissão de evidência legível por máquina; telemetria de garantia contínua | 5 |
| Controlos de agentes (AICM v1.1, ATF, AARM) | Controlos AICM específicos de agentes (p. ex. IAM-18 Agent Access Restriction, AIS-11 Agents Security Boundaries), com o Agentic Trust Framework v1 (níveis de autonomia conquistada) e a especificação de interceção de runtime AARM [80][81][82] | Definições de controlo específicas de agentes; política como código para âmbito e ferramentas de agentes; guardrails de runtime | 1 · 4 |
| Catastrophic Risk Annex | Controlos AICM aprimorados para sistemas de elevada autonomia com potencial de risco catastrófico | Controlos aprimorados para sistemas de elevada autonomia; controlos de kill switch e supervisão; evidência de auditoria piloto | 4 · 5 |

Duas linhas de trabalho empurram a AICM em direção a agentes e risco de fronteira. Para agentes, os
controlos situam-se dentro da própria matriz (por exemplo IAM-18 Agent Access Restriction e AIS-11
Agents Security Boundaries) [80], e o programa de plano de controlo de agentes da CSA adiciona duas
especificações publicadas, o **Agentic Trust Framework** (zero trust para agentes com níveis de
autonomia conquistada) e **AARM** (interceção de ações de agentes antes de serem executadas)
[32][81][82]. Edições anteriores deste mapa listavam um "Agentic Control Supplement" proposto para a
AICM; não pôde ser correspondido a um documento primário da CSA a partir de 2026-09-24, portanto a
linha agora nomeia o que é publicado (verificar). Para risco de fronteira, o
**Catastrophic Risk Annex** adiciona um conjunto de controlos aprimorados para sistemas de elevada
autonomia, destinados a serem provados através de auditorias piloto em vez de afirmados [33].

## Projeto OWASP GenAI Security

O Projeto OWASP GenAI Security fornece o vocabulário de ameaça contra o qual os controlos são
construídos, mais dois formatos (o Agent Control Standard e um AIBOM) que o stack consome
diretamente [16][17][54]. O capítulo 23 mapeia cada entrada de agente para seus controlos em
[ameaças mapeadas para controlos](/bok/governing-agents#threats-mapped-to-controls).

| Artefato OWASP | O que é | Artefato de engenharia | Camada |
|---|---|---|---|
| Top 10 para Agentic Applications 2026 | Catálogo de ameaças de agentes (ASI01 Agent Goal Hijack … ASI10 Rogue Agents) | Modelo de ameaça de agentes; avaliações adversariais; guardrails de runtime; kill switch | 3 · 4 |
| Top 10 para LLM Applications 2026 | Catálogo de ameaças de LLM (incl. Excessive Agency em #3) | Controlos de injeção de prompts e tratamento de saída; portal de avaliação | 3 · 4 |
| Agent Control Standard (ACS) | Uma norma para expressar controlos de agentes | Definições de controlo legíveis por máquina para agentes | 1 · 4 |
| AIBOM | Formato e gerador de lista de materiais de IA | AIBOM na construção (`CycloneDX ML-BOM`, `SPDX 3.0 AI`) | 2 |

## Leis federais e estaduais dos EUA

Os Estados Unidos não têm um estatuto federal horizontal de IA; as regras vinculativas específicas
de IA são leis estaduais, e diferem em âmbito. Duas vinculam apenas desenvolvedores de fronteira,
com os deveres mais pesados sobre os grandes; o resto alcança desenvolvedores, responsáveis pela
implantação e operadores ordinários, e a lei federal que antecede a IA (empréstimos justos,
relatórios de crédito, discriminação no emprego, a Lei FTC) já alcança decisões de IA. As tabelas
abaixo as carregam todas como linhas. O capítulo 21 as ensina:
[a camada federal](/bok/ai-laws-worldwide#united-states-the-federal-layer) (ordens executivas, os
memorandos OMB que vinculam agências e seus fornecedores, e o impulso federal contra leis estaduais
de IA) e as
[leis estaduais que vinculam organizações privadas](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
cada uma com seu âmbito, datas, deveres e aplicação.

### Leis de desenvolvedores de fronteira

Duas leis estaduais dos EUA vinculam apenas desenvolvedores de fronteira, com os deveres mais
pesados sobre os grandes, não responsáveis pela implantação geral: um âmbito mais estreito do que a
classificação de risco do Regulamento da IA da UE. Pedem aos grandes desenvolvedores de fronteira
que publiquem frameworks de segurança e a cada desenvolvedor de fronteira que relate incidentes
críticos de segurança ao estado [18][19][25]. A proteção de denunciantes da Califórnia é atendida na
prática por
[um canal para levantar preocupações](/bok/governance-program#a-channel-for-raising-concerns)
(capítulo 12).

| Lei | Âmbito | Obrigação | Artefato de engenharia | Camada |
|---|---|---|---|---|
| California SB 53 (TFAIA), em vigor 2026-01-01 | Desenvolvedores de fronteira (modelos treinados acima de ~10^26 FLOP); o dever de framework vincula grandes desenvolvedores de fronteira (receita do desenvolvedor acima de USD 500M) | Publicar um framework de IA de fronteira; relatar incidentes críticos de segurança ao Office of Emergency Services dentro de 15 dias; proteção de denunciantes; até USD 1M por violação, aplicada pelo AG [56] | Framework de segurança publicado; relatório de pipeline de incidentes ao estado; artefatos de transparência | 5 · 4 |
| Proteções de denunciantes da California SB 53 (Labor Code 1107–1107.2), em vigor 2026-01-01 | Desenvolvedores de fronteira; o processo anónimo vincula grandes desenvolvedores de fronteira | Sem regra, política ou contrato que impeça os colaboradores abrangidos de divulgarem preocupações sobre riscos catastróficos, e sem retaliação; notificação de direitos; os grandes programadores de fronteira executam um processo interno anónimo com atualizações mensais para o relator, partilhadas com dirigentes e conselheiros pelo menos trimestralmente [56] | Canal de denúncia interno anónimo com atualizações de estado; registos de confirmação de notificação; resumo trimestral para dirigentes e conselheiros | 1 · 5 |
| New York RAISE Act (S6953B), assinada em 2025-12-19 | Os programadores de fronteira (modelos treinados acima de 10^26 operações) comunicam incidentes no prazo de 72 horas; o dever do framework vincula os grandes programadores de fronteira (receita anual superior a USD 500M); os limiares da alteração do capítulo assinada em 2026-03-27 | Publicar um framework de segurança e proteção da IA de fronteira; divulgar incidentes de segurança no prazo de 72 horas. Uma alteração do capítulo assinada em 2026-03-27 estabelece a data de entrada em vigor em 2027-01-01 e cria um escritório de supervisão no Departamento de Serviços Financeiros de Nova Iorque (DFS) [19][24][25] | Framework de segurança e proteção da IA de fronteira publicado; pipeline de comunicação de incidentes e divulgação de 72 horas para o escritório de supervisão do DFS | 5 · 4 |

### Outras leis estaduais sobre IA

Estas leis estaduais estendem-se para além dos programadores de fronteira a programadores,
responsáveis pela implantação e operadores ordinários: Texas e Colorado; as leis de dados de treino,
proveniência e chatbot complementar da Califórnia; as regras complementares de Nova Iorque;
Illinois; Lei Local 144 de Nova Iorque; e Utah [55][84][85][86][88][89][90][91]. O capítulo 21 expõe
cada uma com a sua aplicação na
[tabela de leis estaduais](/bok/ai-laws-worldwide#united-states-state-laws-that-bind-private-organisations),
e compara as regras de contratação em
[uma ferramenta de contratação, quatro regimes](/bok/ai-laws-worldwide#consequential-decisions-one-hiring-tool-four-regimes).

| Lei | Âmbito | Obrigação | Artefato de engenharia | Camada |
|---|---|---|---|---|
| Texas TRAIGA (HB 149), em vigor desde 2026-01-01 | Programadores e responsáveis pela implantação que operam no Texas | Proibições baseadas em intenção de desenvolver ou implantar IA (manipulação comportamental, discriminação ilegal); classificação social proibida para entidades governamentais; divulgação de utilização de IA por agências governamentais e prestadores de cuidados de saúde; um ambiente de testagem regulatória; aplicação pelo Procurador-Geral; regras de IA locais preemptadas [35] | Política de utilização proibida como código; controlos de divulgação de utilização de IA; tratamento de reclamações e incidentes | 1 · 4 |
| Colorado SB 26-189 (tecnologia de decisão automatizada), em vigor desde 2027-01-01, substituindo SB 24-205 | Programadores e responsáveis pela implantação de ADMT em decisões consequentes | Documentação do programador para responsáveis pela implantação e notificação de atualizações materiais; notificação do responsável pela implantação sobre a utilização de ADMT; uma explicação em linguagem clara no prazo de 30 dias após um resultado adverso; correção, revisão humana e reconsideração; registos mantidos durante pelo menos três anos. SB 26-189 (assinada em 2026-05-14) revogou e reenactou SB 24-205, cujo dever de cuidado contra discriminação algorítmica tinha sido adiado para 2026-06-30 e cuja aplicação um tribunal federal tinha bloqueado [36][55] | Inventário de ADMT; pacote de documentação do programador; modelos de notificação e explicação de resultado adverso; fila de revisão humana; armazenamento de registos de três anos | 2 · 4 · 5 |
| California AB 2013 (transparência de dados de treino), devido em 2026-01-01 | Programadores de sistemas de IA generativa lançados desde 2022-01-01 | Os programadores publicam um resumo dos conjuntos de dados utilizados para treinar um sistema de IA generativa disponibilizado aos californianos (fontes, tamanho, tipos de dados, propriedade intelectual e informações pessoais, dados sintéticos) em ou antes de 2026-01-01 e em cada modificação substancial [84] | Ficha de dados por conjunto de dados, publicada no lançamento; registo de direitos de dados de treino | 2 |
| California AI Transparency Act (SB 942 conforme alterada por AB 853), operacional desde 2026-08-02 | Prestadores abrangidos de sistemas públicos de IA generativa; grandes plataformas online; fabricantes de dispositivos de captura | Os prestadores abrangidos oferecem uma ferramenta de detecção de IA gratuita e incorporam divulgações latentes, com uma divulgação manifesta opcional, em imagem, vídeo e áudio gerados; as grandes plataformas online e dispositivos de captura seguem posteriormente [85] | Pipeline de proveniência escrevendo metadados latentes; ponto final de detecção público; apresentação de proveniência no lado da plataforma | 3 · 4 |
| California SB 243 (chatbots complementares), chaptered em 2025-10-13 | Operadores de chatbots complementares | Divulgar IA quando uma pessoa razoável poderia ser enganada; para menores conhecidos, lembrar pelo menos a cada três horas e impedir conteúdo sexualmente explícito; executar um protocolo de suicídio e automutilação com encaminhamento para crise; relatórios anuais a partir de 2027-07-01 [86] | Política de modo complementar; temporizador de lembrete; classificador de encaminhamento para crise e registo; relatório anual | 1 · 4 · 5 |
| New York GBL Article 47 (modelos de companhia de IA), em vigor desde 2025-11-05 (verificar) | Operadores de companhias de IA | Detetar ideação suicida e automutilação e encaminhar utilizadores para serviços de crise; informar os utilizadores de que não estão a falar com um humano no início e pelo menos a cada três horas [88] | Classificador de encaminhamento para crise e registo; temporizador de notificação | 4 · 5 |
| Illinois HB 3773 (alteração da Lei de Direitos Humanos), em vigor desde 2026-01-01 | Empregadores | Os empregadores não podem utilizar IA com efeito discriminatório em classes protegidas no recrutamento, contratação, promoção, disciplina ou outros termos de emprego, nem códigos postais como proxy, e devem notificar colaboradores e candidatos [89][118] | Inventário de IA em RH; avaliação de impacto adverso por classe protegida; registo de notificação | 2 · 3 · 4 |
| NYC Local Law 144 (ferramentas de decisão de emprego automatizadas), aplicada desde 2023-07-05 | Empregadores e agências de emprego que utilizam AEDTs para funções em Nova Iorque | Uma auditoria de viés independente no prazo de um ano antes da utilização, um resumo publicado dos resultados, e notificação aos candidatos e colaboradores 10 dias úteis antes da utilização [90] | Avaliação de razão de impacto por sexo, raça/etnia e categoria interseccional; resumo de auditoria publicado; registo de notificação | 3 · 5 |
| Lei de divulgação de IA de Utah (SB 226), em vigor desde 2025-05-07 | Fornecedores que utilizam IA generativa em transações de consumidor; ocupações reguladas | Divulgar IA generativa quando uma pessoa claramente e inequivocamente pede; ocupações reguladas divulgam-na de forma proeminente numa interação de IA de risco elevado; divulgação clara no início é um porto seguro [91] | Componente de divulgação com uma bandeira de risco de interação; registo de conversação mostrando a divulgação | 4 |

### Leis de privacidade estadual e de setor

Os estatutos de privacidade estadual alcançam a IA através de exclusões de definição de perfis,
avaliações, consentimento e direitos de revisão, e uma lei de setor alcança os modelos de
seguradoras. O capítulo 19 compara-os em [os Estados Unidos](/bok/privacy-and-ai#united-states) e o
capítulo 20 cobre
[habitação, seguros e serviços públicos](/bok/existing-law#housing-insurance-and-public-services).

| Lei | Âmbito | Obrigação | Artefato de engenharia | Camada |
|---|---|---|---|---|
| Regulamentos CPPA da Califórnia (ADMT), deveres a partir de 2027-01-01 | Empresas sujeitas à CCPA | As empresas que utilizam ADMT para decisões significativas fornecem uma notificação pré-utilização, uma exclusão ou um recurso humano, e acesso a informações sobre a ADMT [87] | Registo de ADMT; notificação pré-utilização; fluxo de trabalho de exclusão ou recurso; resposta de acesso a ADMT | 2 · 4 · 5 |
| Regulamentos CPPA da Califórnia (avaliações de risco), em vigor desde 2026-01-01 | Empresas sujeitas à CCPA | Uma avaliação de risco antes do processamento que apresenta risco significativo, incluindo a utilização de ADMT para decisões significativas; atestações e resumos submetidos à Agência [87] | Avaliação de risco por atividade desencadeadora; registo de submissão | 5 |
| Virginia CDPA (§ 59.1-580), a partir de 2023-01-01 | Responsáveis pelo tratamento | Os responsáveis pelo tratamento documentam avaliações de proteção de dados para publicidade direcionada, venda, definição de perfis que apresenta risco razoavelmente previsível, e dados sensíveis, para processamento criado após 2023-01-01, e entregam-nas ao Procurador-Geral mediante pedido [93] | Modelo de avaliação por atividade de processamento; registo de definição de perfis | 1 · 5 |
| Colorado Privacy Act (SB21-190), em vigor desde 2023-07-01 | Responsáveis pelo tratamento | Os consumidores podem excluir-se da definição de perfis em prosseguimento de decisões com efeitos legais ou similarmente significativos, incluindo através de um mecanismo de exclusão universal; os responsáveis pelo tratamento executam avaliações de proteção de dados para processamento que apresenta risco elevado [94] | Bandeira de exclusão honrada na inferência; modelo de avaliação; bandeiras de classe de dados de entrada | 1 · 2 · 4 · 5 |
| Minnesota CDPA (§ 325M.14), em vigor desde 2025-07-31 | Responsáveis pelo tratamento | Um consumidor pode questionar o resultado da definição de perfis, ser informado da razão, rever os dados pessoais utilizados, corrigi-los e ter a decisão reavaliada [95] | Fluxo de trabalho de razão e revisão com reavaliação em dados corrigidos | 4 · 5 |
| Illinois BIPA (740 ILCS 14), em vigor desde 2008-10-03 | Entidades privadas | Consentimento escrito informado antes de recolher identificadores biométricos, um calendário de retenção e destruição, e armazenamento seguro; um direito de ação privada com indenizações estatutárias [96][119] | Captura de consentimento escrito; calendário de retenção como código; registo de destruição | 1 · 2 |
| Washington My Health My Data Act (RCW 19.373), a partir de 2024-03-31 | Entidades reguladas | Consentimento para recolher e consentimento separado para partilhar dados de saúde do consumidor, incluindo dados derivados ou extrapolados por algoritmos ou aprendizagem automática, e uma autorização assinada para qualquer venda [97] | Registos de consentimento separados para recolha e partilha; autorização de venda assinada; bandeiras de entrada para dados de saúde derivados | 1 · 2 |
| Colorado SB21-169 (seguradoras), em vigor desde 2021-09-07 | Seguradoras | As seguradoras não podem discriminar injustamente através de dados de consumidor externos, algoritmos ou modelos preditivos; mantêm um framework de gestão de riscos, testam discriminação injusta e apresentam um atestado do diretor de risco sob regras adotadas por linha de seguro [92] | Inventário de fontes de dados e modelos externos; testes de disparidade; registo de atestado do diretor de risco | 2 · 3 · 5 |

### Lei federal que já alcança a IA

As agências federais estão vinculadas por memorandos OMB [98][99]. Para organizações privadas, as
regras federais que alcançam a IA são lei mais antiga, neutra em relação à tecnologia: notificações
de ação adversa em empréstimos e relatórios de crédito, impacto desproporcionado no emprego, a
proibição de práticas enganosas da Lei FTC, e o dever de remoção da Lei TAKE IT DOWN
[100][101][102][103][104][105][106]. O capítulo 21 cobre
[a camada federal](/bok/ai-laws-worldwide#united-states-the-federal-layer); o capítulo 16 constrói
os códigos de razão de
[notificações de ação adversa de crédito](/bok/fairness-and-explainability#credit-adverse-action-notices-and-reason-codes)
e a
[regra dos quatro quintos](/bok/fairness-and-explainability#the-four-fifths-rule-and-the-adverse-impact-ratio);
o capítulo 20 cobre
[comprovação de alegações](/bok/existing-law#claims-substantiation-and-algorithmic-disgorgement) e
[falsificações profundas e media sintético](/bok/existing-law#deepfakes-and-synthetic-media).

| Lei | Âmbito | Obrigação | Artefato de engenharia | Camada |
|---|---|---|---|---|
| OMB M-25-21 (utilização federal de IA), emitida em 2025-04-03 | Agências federais dos EUA (seus fornecedores de IA por contrato) | As agências federais aplicam práticas mínimas à IA de elevado impacto: testes pré-implantação, uma avaliação de impacto de IA, monitorização contínua, formação do operador, supervisão humana com falha segura quando praticável, recursos ou recursos, e consulta de utilizadores finais, documentados no prazo de 365 dias [98] | Entrada de inventário de caso de utilização; relatório de teste pré-implantação; avaliação de impacto de IA; plano de monitorização; caminho de recurso | 2 · 3 · 4 · 5 |
| OMB M-26-04 (aquisição de LLM), emitida em 2025-12-11 | Agências federais dos EUA e fornecedores de LLM | As solicitações de modelos de linguagem grande solicitam, como mínimo, a política de utilização aceitável do fornecedor, fichas de modelo, sistema ou dados, recursos de utilizador final e um mecanismo de feedback [99] | Política de utilização aceitável; fichas de modelo, sistema ou dados; recursos de utilizador final; canal de feedback | 2 · 5 |
| ECOA Regulation B (`12 CFR 1002.9`) | Credores | Um credor que toma uma ação adversa fornece uma declaração de razões principais específicas, ou o direito a uma dentro de 30 dias; citar normas internas ou uma pontuação falhada é insuficiente, qualquer que seja o modelo que tenha tomado a decisão [100] | Serviço de código de razão versionado com o modelo; avaliação de fidelidade do código de razão; modelo de notificação | 3 · 4 · 5 |
| FCRA (`15 U.S.C. 1681m(a)`) | Utilizadores de relatórios de consumidor | Um utilizador de um relatório de consumidor que toma uma ação adversa fornece notificação, divulga a pontuação de crédito numérica utilizada e os seus fatores-chave, identifica a agência de comunicação e declara o direito a um relatório gratuito e a contestar [101] | Registo de pontuação e fatores-chave por decisão adversa; modelo de notificação | 4 |
| Título VII s. 703(k) e UGESP (`29 CFR 1607.4(D)`) | Empregadores | Um procedimento de seleção com impacto desigual é ilegal a menos que seja relacionado com o trabalho e consistente com a necessidade comercial, e uma alternativa menos discriminatória pode ainda ser exigida; uma taxa de seleção inferior a quatro quintos da taxa do grupo mais elevado é geralmente considerada como evidência de impacto adverso [102][103] | Avaliação de razão de impacto adverso por grupo com contagens e intervalos de confiança; validação de relacionamento com o trabalho; registo de pesquisa de alternativas | 3 · 5 |
| Lei FTC s. 5 (`15 U.S.C. 45`) | Empresas que fazem afirmações sobre IA | Atos ou práticas enganosos são ilegais: afirmações sobre a precisão, desempenho ou equidade de um sistema de IA precisam de evidência competente e fiável antes de serem feitas [104][105] | Registo de afirmações ligado a execuções de avaliação atuais; porta de substantiação na cópia de lançamento | 1 · 3 · 5 |
| Lei TAKE IT DOWN (Lei Pública 119-12), processo devido 2026-05-19 | Plataformas abrangidas | As plataformas abrangidas executam um processo de notificação e remoção e removem imagens íntimas não consentidas comunicadas, incluindo falsificações geradas por IA, e cópias idênticas conhecidas dentro de 48 horas de um pedido válido [106] | Pipeline de retirada com um relógio de 48 horas, proprietário e registo; correspondência de cópias idênticas | 4 · 5 |

## Outras jurisdições

A espinha dorsal do mapa é o Regulamento da IA da UE, mas uma função de governação que funciona
através de fronteiras responde a mais de um regime. Estas linhas têm data de 2026-09-24; quando uma
regra ainda está em movimento, a cópia diz isso.

| Jurisdição / instrumento | Estado (a partir de 2026-09-24) | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|---|
| Coreia do Sul: Lei Básica de IA | Em vigor desde 2026-01-22 [34], com o seu Decreto de Execução [62]; o ministério (MSIT) anunciou um período de orientação de pelo menos um ano durante o qual a investigação de factos e multas são retidas exceto em casos excecionais, enquanto os deveres se aplicam [58]; detalhe no [capítulo 21](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act) | Deveres de base para operadores de IA, deveres reforçados para IA "de elevado impacto" em setores sensíveis, e rotulagem de conteúdo de IA | Registo de riscos para IA de elevado impacto; notificação de utilização de IA; rotulagem de conteúdo de IA | 1 · 2 · 4 |
| Singapura: Estrutura de Governação de IA do IMDA para IA Generativa | Voluntária; publicada em maio de 2024 [39] | Dimensões de governação incluindo testes, transparência, comunicação de incidentes, segurança e proveniência de conteúdo | Suite de avaliação; fichas de modelo; proveniência de conteúdo e marca de água | 2 · 3 · 4 |
| ETSI EN 304 223 (Securing AI) | Publicada (V2.1.1, dez 2025) [40] | Requisitos de cibersegurança de base em todo o ciclo de vida da IA (13 princípios em cinco fases) | Controlos de segurança do sistema de IA em todo o ciclo de vida; verificações de cadeia de fornecimento e AIBOM; endurecimento em tempo de execução | 4 |
| Singapura: Estrutura de Governação de IA do IMDA para IA Agente (identidade e autorizações) | Voluntária; versão 1.5 publicada 2026-05-20 [107] | Cada agente tem uma identidade única e contabilizada, catalogada e gerida centralmente; as autorizações são limitadas, vinculadas ao tempo ou à sessão, não transferíveis e limitadas pelo humano que autoriza | Registo de agentes com uma identidade de carga de trabalho por agente; credenciais delegadas de curta duração nunca mais amplas do que o utilizador | 2 · 4 |
| Singapura: Estrutura de Governação de IA do IMDA para IA Agente (pontos de verificação humanos) | Voluntária; versão 1.5 publicada 2026-05-20 [107] | Pontos de verificação significativos para ações de elevado risco, irreversíveis, atípicas e definidas pelo utilizador, com aprovações que são contextuais e digeríveis e aplicadas através de controlos ao nível do sistema | Classes de ponto de verificação no gateway de ferramentas; registo de aprovação; métricas de supervisão | 4 · 5 |
| Canadá: Diretiva sobre Tomada de Decisão Automatizada (instituições federais) | Em vigor desde 2019-04-01; modificada 2025-06-24 [108] | Completar, aprovar e publicar uma avaliação de impacto algorítmico antes da produção; aplicar os requisitos do Apêndice C para o nível de impacto (notificação, explicação, revisão por pares, intervenção humana); oferecer recurso e comunicar sobre a eficácia | AIA publicada renderizada a partir de uma base de factos de impacto partilhada; modelos de notificação e explicação; registo de revisão por pares; caminho de recurso; gatilhos de reavaliação como código | 1 · 2 · 5 |
| Brasil: LGPD `Art. 20` (revisão de decisões automatizadas) | Em vigor desde 2020-09-18 (verificar); sanções a partir de 2021-08-01 [109] | Um titular de dados pode solicitar revisão de decisões tomadas unicamente com base no processamento automatizado que afetem os seus interesses, incluindo definição de perfis, e o responsável pelo tratamento fornece informações claras sobre os critérios e procedimentos utilizados | Fluxo de trabalho de revisão; declaração de critérios e procedimentos por sistema | 4 · 5 |

### Coreia do Sul, artigo por artigo

Os deveres do operador da Lei Básica de IA situam-se nos Artigos 31 a 36, com a mecânica no Decreto
de Execução [34][62]. Todos eles se aplicam desde 22 de janeiro de 2026; o que o MSIT retém durante
o seu período de orientação de pelo menos um ano é investigação de factos e multas, não os deveres
[58]. O capítulo 21 percorre cada artigo em
[Coreia do Sul: a Lei Básica de IA](/bok/ai-laws-worldwide#south-korea-the-ai-basic-act).

| Artigo | Quem está vinculado | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|---|
| `Art. 31(1)` | Operadores de negócios de IA | Informar os utilizadores com antecedência de que um produto ou serviço funciona com IA de elevado impacto ou generativa, no produto, nos termos, no ecrã ou no local de fornecimento (Decreto Art. 23(1)); uma notificação em falta é passível de multa (Art. 43) [34][62] | Componente de notificação em UI, termos e contratos; inventário de notificação por superfície de utilizador | 2 · 4 |
| `Art. 31(2)–(3)` | Operadores que fornecem IA generativa | Indicar que os resultados são gerados por IA, e notificar ou rotular som, imagens ou vídeo sintético realista para que os utilizadores possam reconhecê-los; uma marca apenas legível por máquina precisa de pelo menos uma notificação de texto ou voz (Decreto Art. 23(2)–(3)) [34][62] | Pipeline de proveniência: rótulo visível ou marca legível por máquina mais pelo menos uma notificação de texto ou voz | 3 · 4 |
| `Art. 32` | Operadores de sistemas de computação qualificados | Sistemas com pelo menos 10^26 FLOP de computação de treino cumulativa, construídos com a tecnologia mais avançada e apresentando risco amplo e grave (Decreto Art. 24), identificar, avaliar e mitigar riscos em todo o ciclo de vida e comunicar os resultados ao MSIT [34][62] | Registo de riscos do ciclo de vida; monitorização de incidentes de segurança; relatório de resultados ao MSIT | 3 · 4 · 5 |
| `Art. 33` | Operadores de negócios de IA | Rever com antecedência se um sistema é IA de elevado impacto e opcionalmente pedir ao MSIT para confirmar; o MSIT responde dentro de 30 dias, prorrogável uma vez (Decreto Art. 25) [34][62] | Registo de decisão de classificação por sistema: área Art. 2(4), razão de risco, visão geral dos dados de treino, resposta do MSIT | 1 · 2 |
| `Art. 34` | Operadores de IA de elevado impacto | Um plano de gestão de riscos, um plano de explicação, um plano de proteção do utilizador, gestão e supervisão humanas, e documentos mostrando as medidas; publicar o conteúdo principal e manter a evidência durante cinco anos (Decreto Art. 27) [34][62] | Planos de gestão de riscos, explicação e proteção do utilizador; supervisor humano nomeado; resumo publicado; armazenamento de evidência de cinco anos | 1 · 2 · 4 · 5 |
| `Art. 35` | Operadores de IA de elevado impacto | Esforçar-se para avaliar o efeito sobre os direitos fundamentais antes de fornecer IA de elevado impacto, cobrindo os sete elementos do Decreto Art. 28 [34][62] | Avaliação de impacto com os sete elementos do decreto | 1 · 5 |
| `Art. 36` | Operadores estrangeiros de negócios de IA acima de um limiar | Um operador sem endereço ou estabelecimento na Coreia que cumpra um limiar do decreto (receita, receita de serviço de IA, utilizadores diários ou uma multa anterior; Decreto Art. 29) designa um representante doméstico por escrito e comunica-o ao MSIT [34][62] | Designação arquivada no MSIT; manual de acesso a evidência para o representante | 5 |

### Reino Unido

O Reino Unido não tem uma lei de IA horizontal. Governa a IA através de reguladores setoriais
existentes (o ICO, a FCA, a MHRA e outros), coordenados centralmente, mais o
**AI Security Institute** (renomeado do AI Safety Institute em fevereiro de 2025) para avaliação de
modelos de fronteira [38]. Para tomada de decisão automatizada, a Lei de Dados (Utilização e Acesso)
de 2025 substituiu o Artigo 22 do RGPD do Reino Unido por novos **Artigos 22A–22D** (em vigor 5 de
fevereiro de 2026): um modelo de permissão-mais-salvaguardas para decisões significativas e
unicamente automatizadas, com condições mais apertadas quando dados de categorias especiais são
utilizados. As salvaguardas (um caminho de revisão humana significativa, um canal para fazer
representações e para contestar, e uma notificação de decisão) são o artefato que o engenheiro
constrói [37]. O capítulo 19 coloca os Artigos 22A–22D ao lado do RGPD e dos regimes dos EUA em
[os regimes lado a lado](/bok/privacy-and-ai#the-regimes-side-by-side), e o capítulo 16 transforma
as salvaguardas em registos de explicação e contestação em
[proteção de dados: o RGPD e o regime do Reino Unido](/bok/fairness-and-explainability#data-protection-gdpr-and-the-uk-regime).
A lei de consumidor do Reino Unido atinge avaliações geradas por IA: a Lei de Mercados Digitais,
Concorrência e Consumidores de 2024 proíbe avaliações falsas e de incentivo oculto a partir de 6 de
abril de 2025 [111], ensinada no capítulo 20 sob
[o Reino Unido: Lei DMCC](/bok/existing-law#the-united-kingdom-dmcc-act).

| Jurisdição / instrumento | Estado (a partir de 2026-09-24) | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|---|
| Reino Unido: Lei de Dados (Utilização e Acesso) de 2025, Artigos 22A–22D do RGPD do Reino Unido | Em vigor 2026-02-05 [37] | Um modelo de permissão-mais-salvaguardas para decisões significativas e unicamente automatizadas, com condições mais apertadas quando dados de categorias especiais são utilizados | Salvaguardas de ADM: caminho de revisão humana significativa, canal de contestação e representação, notificação de decisão | 4 · 2 |
| Reino Unido: Lei de Mercados Digitais, Concorrência e Consumidores de 2024, s. 225 e Sch. 20 para. 13 | Em vigor 2025-04-06 [111] | Práticas comerciais injustas são proibidas, e o Anexo 20 proíbe submeter ou encomendar avaliações de consumidor falsas e avaliações de incentivo oculto, o que atinge avaliações geradas por IA | Política bloqueando geração de avaliação; registo de proveniência de avaliação | 1 · 4 |

### China

A China governa a IA em dois níveis, e este mapa mantém-nos separados. O nível vinculativo é um
conjunto de regras departamentais emitidas pela Administração do Ciberespaço da China (CAC) com
co-emissores, sobre recomendação algorítmica (2022), síntese profunda (2023), serviços de IA
generativa (2023) e a marcação de conteúdo sintético gerado por IA (2025); várias são territoriais,
e as Medidas Provisórias para Serviços de IA Generativa aplicam-se apenas a serviços oferecidos "ao
público dentro da RPC" [43][44][45]. O dever de marcação é apoiado por uma norma nacional
obrigatória, GB 45438-2025, que contém os campos de metadados que a medida exige [46][47]. O nível
voluntário é a norma recomendada GB/T 45654-2025 [48] e o TC260 AI Safety Governance Framework
[41][42]. A Lei de Cibersegurança, alterada pelo Comité Permanente da APN em 2025-10-28 e em vigor a
partir de 2026-01-01, acrescenta um Artigo 20 programático sobre IA que não cria por si só deveres
do operador [49]; a regra vinculativa mais recente, as Medidas Provisórias para Serviços de
Interação Antropomórfica (em vigor a partir de 2026-07-15), é limitada no âmbito (serviços que
oferecem interação emocional sustentada); tem uma linha abaixo e o capítulo 21 apresenta-a sob
[China: o que o capítulo 08 já não cobre](/bok/ai-laws-worldwide#china-what-chapter-08-does-not-already-cover)
[50]. A informação pessoal é regida pela Lei de Proteção de Informação Pessoal, cujo Artigo 24 sobre
decisões automatizadas também tem uma linha [110]. O framework 3.0 (14 de setembro de 2026) é um
documento técnico TC260 publicado sob orientação da CAC e descrito como "uma referência para
programadores, prestadores e utilizadores": estabelece uma taxonomia de risco de três blocos
(inerente, aplicação e secundário), classifica o risco qualitativamente por cenário, nível de
inteligência e escala sem limiar de computação ou parâmetros, trata modelos de código aberto como um
perfil de risco distinto e nomeia a segurança da potência de computação como uma categoria de risco,
e o seu Apêndice 2 percorre o ciclo de vida do agente desde a conceção até à desativação [42].
Comentários de profissionais relataram agentes e sistemas fisicamente interativos como a mudança de
destaque na nova versão [51].

Os instrumentos acima resolvem-se em linhas de obrigação-para-artefato na mesma forma que as outras
jurisdições:

| Jurisdição / instrumento | Estado (a partir de 2026-09-20) | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|---|
| China: Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (CAC, MIIT, MPS and SAMR Order No. 9) | Vinculativo; em vigor a partir de 2022-03-01 [43] | Arquivo de algoritmo para serviços com atributos de opinião pública ou capacidade de mobilização social, avaliação de segurança, apresentação do número de arquivo, e uma opção do utilizador para desativar a recomendação personalizada | Inventário de algoritmos com registo de arquivo e número; pacote de evidência de avaliação de segurança; controlo de opt-out em tempo de execução | 1 · 2 · 4 |
| China: Provisions on the Administration of Deep Synthesis in Internet Information Services (CAC, MIIT and MPS Order No. 12) | Vinculativo; em vigor a partir de 2023-01-10 [44] | Rótulos conspícuos onde o conteúdo sintético poderia enganar o público e marcas técnicas não removíveis; gestão de dados de treino; consentimento separado para edição de rosto e voz; arquivo e avaliação de segurança para funções de formação de opinião | Pipeline de proveniência de conteúdo (rótulo visível mais marca de metadados); registo de governação de dados de treino; porta de consentimento; avaliação de segurança pré-lançamento | 2 · 3 · 4 |
| China: Interim Measures for the Administration of Generative AI Services (CAC and six other bodies, Order No. 15) | Vinculativo; em vigor a partir de 2023-08-15; aplica-se a serviços oferecidos ao público dentro da RPC [45] | Dados de treino de fonte lícita e modelos fundacionais; marcação de conteúdo sob as regras de síntese profunda; avaliação de segurança e arquivo de algoritmo para serviços de formação de opinião; parar, remover, retreinar e relatar conteúdo ilegal | Registo de linhagem de dados e licenciamento; porta de avaliação em conteúdo gerado; pipeline de incidentes com um ciclo de retreinamento; registo de arquivo | 2 · 3 · 4 · 5 |
| China: Measures for Labelling AI-Generated Synthetic Content, with mandatory standard GB 45438-2025 | Vinculativo; em vigor a partir de 2025-09-01, a norma implementada no mesmo dia [46][47] | Rótulos explícitos (texto, áudio ou gráfico) e rótulos de metadados implícitos que transportam o nome ou código do prestador e um número de conteúdo; plataformas de distribuição verificam metadados e sinalizam conteúdo suspeito de IA | Pipeline de proveniência e marca de água emitindo os campos de metadados GB 45438; deteção e sinalização do lado da plataforma | 3 · 4 |
| China: GB/T 45654-2025 Basic security requirements for generative AI services | Norma nacional recomendada (voluntária); implementada a partir de 2025-11-01 [48] | Fonte do corpus de treino e triagem de conteúdo, requisitos de segurança do modelo e os métodos de avaliação que fundamentam a avaliação de segurança | Registo de triagem de corpus; bancos de questões de avaliação; relatório de avaliação de segurança | 3 · 5 |
| China: TC260 AI Safety Governance Framework 3.0 | Voluntário; publicado em 2026-09-14, construindo sobre 1.0 (2024) e 2.0 (2025) [41][42] | Uma taxonomia de risco de três blocos (inerente, aplicação, secundário), contramedidas tecnológicas e de governação e diretrizes baseadas em papéis; os operadores mantêm registos durante pelo menos seis meses e auditam-nos, monitorizam o risco em tempo real, mantêm uma cadeia de responsabilidade rastreável e avaliam a resiliência (§5.3) | Registo de risco codificado pela taxonomia do framework; política de retenção de registos (seis meses) com auditoria; monitorização de risco em tempo real; avaliação de resiliência | 1 · 4 · 5 |
| China: Personal Information Protection Law, Arts. 24 and 55–56 | Vinculativo; em vigor a partir de 2021-11-01 [110] | As decisões automatizadas mantêm-se transparentes e justas, sem tratamento diferencial irrazoável em preços ou termos; as pressões direcionadas oferecem uma opção não personalizada ou uma recusa fácil; os indivíduos podem solicitar uma explicação e recusar decisões unicamente automatizadas com um impacto significativo; uma avaliação de impacto antecipadamente, mantida durante pelo menos três anos | Serviço de explicação e rota de decisão manual; opção não personalizada em tempo de execução; registo de avaliação de impacto mantido durante três anos | 2 · 4 · 5 |
| China: Interim Measures for the Administration of Anthropomorphic Interaction Services (CAC, NDRC, MIIT, MPS and SAMR) | Vinculativo; em vigor a partir de 2026-07-15 [50] | Um modo para menores; sinais de IA e um lembrete após duas horas de utilização contínua; uma saída fácil; uma avaliação de segurança em 1 milhão de utilizadores registados ou 100 000 utilizadores ativos mensais; arquivo | Configuração de modo para menores; temporizador de lembrete; monitor de limiar de contagem de utilizadores; relatório de avaliação de segurança; registo de arquivo | 1 · 2 · 4 · 5 |
| China: TC260 Framework 3.0, Appendix 2 (agentic AI risk management) | Voluntário; publicado em 2026-09-14 [42] | Identidade única e permissões de privilégio mínimo por agente por modo de decisão; pontos de controlo humano com registos de aprovação à prova de adulteração e negação por defeito; verificação de ferramenta e habilidade; guardrails em tempo de execução (alerta, restrição, interceção, suspensão, encerramento); isolamento de memória sem credenciais na memória; autenticação mútua; validação de sandbox, red teaming e re-validação em mudança importante; desativação controlada | Registo de agentes com identidade e âmbito; armazenamento de registo de aprovação; lista de permissões de ferramenta com verificações de integridade; guardrails em tempo de execução e kill switch; política de âmbito de memória; runbook de desativação | 2 · 3 · 4 · 5 |

Os controlos de agente do Apêndice 2 alinham-se com as duas referências agentic que este capítulo já
contém, o OWASP Top 10 for Agentic Applications [16] e o NIST AI Agent Standards Initiative [29]:

| Controlo de agente | TC260 Framework 3.0, Appendix 2 [42] | OWASP Top 10 for Agentic Applications 2026 [16] | NIST AI Agent Standards Initiative [29] | Camada |
|---|---|---|---|---|
| Identidade e privilégio mínimo | II.2: identidade única por agente, permissões por modo de decisão, credenciais revogadas no final da tarefa | ASI03 Identity and Privilege Abuse | Identidade do agente, autenticação, autorização | 2 · 4 |
| Pontos de controlo humano e registos de aprovação | II.3: controlos em camadas, pontos de controlo de controlo humano, registos de aprovação à prova de adulteração, negação por defeito | ASI09 Human-Agent Trust Exploitation; ASI01 Agent Goal Hijack | Nenhum | 4 · 5 |
| Ferramentas, habilidades e cadeia de fornecimento | II.4: verificação de ferramenta, seleção justa de ferramenta, deteção de anomalias, gestão de habilidades | ASI02 Tool Misuse and Exploitation; ASI04 Agentic Supply Chain Vulnerabilities | Segurança do agente | 2 · 4 |
| Guardrails em tempo de execução e limites de execução | II.5(1)(2)(5)(6): controlo de entrada, guardrails, limites de passo/frequência/duração, isolamento de sandbox | ASI01 Agent Goal Hijack; ASI05 Unexpected Code Execution (RCE); ASI08 Cascading Failures; ASI10 Rogue Agents | Nenhum | 4 |
| Memória | II.5(3): janelas de retenção, isolamento entre utilizadores e tarefas, sem credenciais na memória | ASI06 Memory & Context Poisoning | Nenhum | 3 · 4 |
| Comunicação agente–modelo–ferramenta | II.5(4): autenticação mútua, integridade, resistência a repetição | ASI07 Insecure Inter-Agent Communication | Autenticação | 4 |
| Monitorização, auditoria, sandbox, red teaming, resposta a incidentes | II.6: bloqueio de anomalias, gestão de registos, auditoria de segurança, validação de sandbox, red teaming, planos de emergência, re-validação em mudança importante | Transversal | Avaliações de agente adversário | 3 · 5 |
| Desativação | II.7: encerramento completo, cópia de segurança de dados, limpeza de ambiente | ASI10 Rogue Agents (agentes residuais) | Nenhum | 2 · 4 |

O capítulo 23 compara estas fontes de controlo de agente com as da CSA e de Singapura em
[frameworks written for agents](/bok/governing-agents#frameworks-written-for-agents).

### Tratado e direito internacional suave

Três instrumentos internacionais contêm deveres que um engenheiro pode evidenciar. A
Convenção-Quadro do Conselho da Europa (CETS n.º 225) vincula as Partes, não as empresas, e ainda
não está em vigor; dentro da UE é implementada através do Regulamento da IA [112][113]. Os
Princípios de IA da OCDE, revisto em 3 de maio de 2024, e o Código de Conduta Hiroshima do G7 de 30
de outubro de 2023 são voluntários [114][115]. O capítulo 22 ensina-os em
[what the Convention asks for](/bok/principles-and-standards#what-the-convention-asks-for-and-what-it-changes-in-the-stack),
[the five principles and five recommendations](/bok/principles-and-standards#the-five-principles-and-five-recommendations)
e [the G7 Hiroshima Process](/bok/principles-and-standards#g7-hiroshima-process).

| Instrumento e cláusula | Estado (a partir de 2026-09-24) | O que pede | Artefato de engenharia | Camada |
|---|---|---|---|---|
| Council of Europe Convention `Art. 14(2)(a)–(b)` | Não em vigor (a partir de 2026-09-24) [112][113] | Documentar informação relevante sobre sistemas que podem afetar significativamente os direitos humanos, suficiente para que as pessoas afetadas possam contestar as decisões | Registo de decisão por resultado consequente; caminho de contestação com o registo anexado | 2 · 5 |
| Council of Europe Convention `Art. 15(2)` | Não em vigor (a partir de 2026-09-24) [112][113] | Notificar as pessoas de que estão a interagir com um sistema de IA, conforme apropriado | Divulgação de interação aplicada em tempo de execução | 4 |
| Council of Europe Convention `Art. 16(1)–(2)(a)–(f)` | Não em vigor (a partir de 2026-09-24) [112][113] | Gestão de risco e impacto iterativa e graduada: contexto, severidade e probabilidade, perspetivas das partes interessadas, monitorização e documentação | Registo de risco como código; avaliação de impacto ligada ao registo; monitorização em relação a uma linha de base | 1 · 2 · 4 |
| Council of Europe Convention `Art. 16(2)(g)` | Não em vigor (a partir de 2026-09-24) [112][113] | Testar sistemas antes da primeira utilização e quando são significativamente modificados, conforme apropriado | Avaliação na libertação e em alteração material | 3 |
| OCDE Princípios de IA, princípio 1.4(b) | Não vinculativo; revisto 2024-05-03 [114] | Mecanismos permitem que sistemas de IA que arriscam causar dano indevido sejam substituídos, reparados e/ou desativados com segurança | Kill switch testado; registo de desativação no registo | 2 · 4 |
| OCDE Princípios de IA, princípio 1.5(b)–(c) | Não vinculativo; revisto 2024-05-03 [114] | Rastreabilidade de conjuntos de dados, processos e decisões, e gestão sistemática de riscos em cada fase do ciclo de vida | Armazém de evidência indexado por ids do registo; registo de riscos como código; registos de fornecedores | 1 · 5 |
| G7 Código de Conduta de Hiroshima, ação 1 | Voluntário; acordado 2023-10-30 [115] | Identificar, avaliar e mitigar riscos ao longo do ciclo de vida, incluindo testes antes da implantação | Suite de red-team adversarial; avaliação gate | 3 |
| G7 Código de Conduta de Hiroshima, ações 2 e 4 | Voluntário; acordado 2023-10-30 [115] | Identificar e mitigar vulnerabilidades, incidentes e utilização indevida após implantação, e partilhar informações e comunicar incidentes responsavelmente | Monitorização em tempo de execução; pipeline de incidentes com um ramo de partilha externa | 4 · 5 |
| G7 Código de Conduta de Hiroshima, ação 3 | Voluntário; acordado 2023-10-30 [115][116] | Comunicar publicamente capacidades, limitações e utilizações apropriadas e inapropriadas; a estrutura de comunicação da OCDE recolheu tais comunicações desde 2025 | Ficha de modelo publicada a partir do registo | 2 |
| G7 Código de Conduta de Hiroshima, ação 7 | Voluntário; acordado 2023-10-30 [115] | Implementar mecanismos de autenticação de conteúdo e proveniência quando viável | Marcação de proveniência na saída; teste de verificação | 4 |

Os mapeamentos são ilustrativos, não uma afirmação de conformidade.

## O que ainda NÃO está harmonizado

O mapa tem uma lacuna, e é importante declará-la claramente em vez de a disfarçar.

- **Nenhuma norma harmonizada é citada no Jornal Oficial.** A partir de 2026-09-24, a presunção de
  conformidade do Artigo 40 não está disponível para ninguém, porque nenhuma norma harmonizada foi
  citada no JO [20].
- **EN 18286 é publicada mas não citada.** A norma QMS do Artigo 17 EN 18286:2026 foi publicada em
  julho de 2026 (a primeira norma JTC 21 AI Act a atingir publicação), mas ainda não é citada no
  Jornal Oficial, pelo que não tem presunção de conformidade [20][21].
- **Os outros projetos JTC 21 estão em ou antes da Consulta.** A partir de 2026-09-24, conforme
  comunicado por um ponto de informação sobre normas pan-europeu, as votações de Consulta sobre prEN
  18228 (`Art. 9`, gestão de riscos) e prEN 18282 (`Art. 15`, cibersegurança) fecharam em 30 jul
  2026 e sobre prEN 18229-1 (`Art. 12`, registo) em 20 ago 2026; prEN 18229-3 (`Art. 14`, supervisão
  humana) entrou em Consulta em 30 jul 2026; e prEN 18229-4 e -5 (`Art. 15`, precisão e robustez)
  foram aprovados como novos projetos em 24 jun 2026 [60], consistente com o rastreador público que
  os tinha em Consulta em meados de 2026 [53]. CEN e CENELEC podem publicar um entregável
  prioritário diretamente após uma votação de Consulta positiva e direcioná-los para Q4 2026 [61]; a
  publicação ainda não seria uma citação no JO. O capítulo 22 rastreia cada entregável e o
  [estado das normas harmonizadas JTC 21](/bok/principles-and-standards#harmonised-standards-under-the-ai-act),
  e explica
  [como funciona a presunção de conformidade](/bok/principles-and-standards#how-presumption-of-conformity-works).
- **ISO/IEC 42001 não é o QMS do Artigo 17.** Certificar-se em EN ISO/IEC 42001:2026 evidencia um
  sistema de gestão de IA; não confere uma presunção de conformidade com a AI Act, porque não é uma
  norma harmonizada e o seu âmbito difere do QMS do Artigo 17 [11][12].
- **O Código de Prática é voluntário.** Assinar o Código GPAI é uma forma de demonstrar conformidade
  com as obrigações GPAI; não é uma presunção legal de conformidade [9].
- **A estrutura da China não faz referência cruzada aos instrumentos ocidentais.** O TC260 AI Safety
  Governance Framework 3.0 não cita ISO/IEC 42001, ISO/IEC 23894, NIST AI RMF ou EU AI Act (os seus
  pontos de referência nomeados são a Global AI Governance Initiative e canais centrados na ONU), e
  também não nomeia as suas próprias regras vinculativas [42]. Um mapeamento cruzado entre os dois
  stacks é algo que o engenheiro constrói; nenhum dos documentos de ambos os lados o fornece.

O registo contém os três entregáveis JTC 21 em que o livro se baseia, com o seu estado a partir de
2026-09-24 [20][21][60]:

| Entregável | O que é | Estado (a partir de 2026-09-24) | Artefato de engenharia | Camada |
|---|---|---|---|---|
| EN 18286:2026 | Requisitos de sistema de gestão de qualidade que suportam o Art. 17; publicado mas não citado no Jornal Oficial, pelo que não tem presunção de conformidade | Publicado julho 2026; não citado no JO [21][20] | Processos QMS executados como etapas de pipeline; evidência de design e controlo de alterações | 1 · 5 |
| prEN 18228 | Projeto de norma harmonizada para o sistema de gestão de riscos do Art. 9 | Projeto; votação de Consulta fechada 2026-07-30, conforme comunicado [60] | Ficheiro de risco do prestador por sistema; critérios de aceitabilidade como código; monitorização de controlo | 1 · 3 · 5 |
| prEN 18229-1 | Projeto de norma harmonizada para a manutenção de registos do Art. 12 | Projeto; votação de Consulta fechada 2026-08-20, conforme comunicado [60] | Especificação de registo por sistema; registos de eventos estruturados e assinados mapeados para o projeto | 4 |

A leitura prática: para o período que esta edição cobre, não pode comprar uma presunção de
conformidade pronta. As linhas obrigação-para-artefato acima são como uma função de governação
evidencia a obrigação pelos seus próprios méritos enquanto as normas harmonizadas ainda estão a ser
escritas.

> **Na prática (ilustrativo)**
> Uma equipa de governação manteve este mapa não como um slide mas como um mapeamento cruzado
> legível por máquina: um ficheiro versionado ligando cada ID de obrigação ao artefato que produziu
> a sua evidência e à camada em que vivia, emitido como definições de componentes `OSCAL`. Quando o
> Omnibus moveu as datas de risco elevado, a alteração foi um diff para um campo por linha afetada,
> e cada linha "Mapeia para" a jusante re-resolveu a partir do mesmo ficheiro. A pergunta de
> auditoria "mostre-me o que responde ao Artigo 15" tornou-se uma consulta contra o mapeamento
> cruzado, não uma busca através de um wiki.

**Correspondências:** este capítulo é o índice inverso para todo o livro; cada artigo da EU AI Act,
o Código de Prática GPAI, o RGPD, NIS2, DORA, o CRA, o Regulamento de Responsabilidade do Produto,
DSM, Práticas Comerciais Desleais, Trabalho em Plataforma e Diretivas de Crédito ao Consumidor, o
DSA, ISO/IEC 42001, 42005, 42006, 23894 e 22989, NIST AI RMF e o trabalho NIST AI mais recente, CSA
AICM, OWASP GenAI/Agentic, os entregáveis CEN-CENELEC JTC 21, as leis federais e estaduais dos EUA,
as outras jurisdições e os instrumentos de tratado e soft-law nomeados acima mapeiam para o stack de
cinco camadas (capítulo 04) e o catálogo de padrões (capítulo 05). Os mapeamentos são ilustrativos,
não uma afirmação de conformidade.

## O que pode fazer esta semana

1. **Encontre as suas linhas.** Para um sistema, liste as linhas deste mapa que se aplicam a ele,
   por função e classe de risco, com a data a partir da qual cada uma se aplica.
2. **Nomeie um artefato por linha.** Ao lado de cada linha, escreva o artefato que a evidencia hoje,
   ou marque a lacuna.
3. **Coloque as datas no pipeline.** Armazene cada data aplicável como dados que as suas
   verificações de política leem, para que uma obrigação que comece a aplicar-se apareça como uma
   verificação falhada, não uma surpresa.
4. **Evidencie uma obrigação pelos seus méritos.** Para a obrigação que mais esperava que uma norma
   harmonizada cobrisse, escreva como a evidencia hoje sem uma presunção de conformidade.
5. **Releia em alteração.** Quando uma data ou uma linha neste mapa muda, execute novamente o
   primeiro passo para os seus sistemas e registe a diferença.

## Sources

[1] "AI Omnibus enters into force" (Reg. (EU) 2026/1744, in force 2026-07-27; Annex III high-risk → 2 Dec 2027; Annex I → 2 Aug 2028; legacy public-authority → 2 Aug 2030). European Commission. 2026-07-27. https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force (verified: primary)
[2] Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1 amendments to Reg. (EU) 2024/1689: new Art. 4a (special-category data for bias detection, pseudonymisation, deletion once bias is corrected); new Art. 5(1)(ba)–(bb) NCII and CSAM bans from 2 Dec 2026; Art. 111(2) public-authority systems by 2 Aug 2030; new Art. 111(4) Art. 50(2) marking by 2 Dec 2026 for systems placed on the market before 2 Aug 2026; Art. 113 dates. Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[3] Commission enforcement powers over GPAI providers apply from 2 August 2026; obligations since 2 August 2025 (fines up to 3% of worldwide turnover or EUR 15M under Art. 101). European Commission, AI Act Service Desk. 2026-08-02. https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/commissions-enforcement-powers-related-ai-act-obligations-providers-most-advanced-models (verified: primary)
[4] Regulation (EU) 2024/1689 (AI Act), Art. 101 (Commission fines for GPAI providers: up to 3% or EUR 15M) and Art. 99 (penalties by national authorities: 7% / 3% / 1% ceilings). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[5] "Safer and more transparent AI" (Art. 50 transparency live 2 Aug 2026). European Commission. 2026-08-02. https://commission.europa.eu/news-and-media/news/safer-and-more-transparent-ai-2026-08-02_en (verified: primary)
[6] "AI literacy, the Digital Omnibus and Article 4 of the AI Act" (Art. 4 reworded to "support the development of" AI literacy; the reworded text applies from 27 Jul 2026). Law & Technology. 2026. https://lawandtechnology.eu/en/ai-literacy-digital-omnibus-article-4-ai-act/ (verified: secondary)
[7] Regulation (EU) 2024/1689 (AI Act), Art. 27 (FRIA for deployers of Annex III high-risk; Art. 27(4) cross-reference to a GDPR Art. 35 DPIA). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[8] Regulation (EU) 2026/1744 (Digital Omnibus on AI), new Arts. 75a–75d of the AI Act: AI Office investigation powers, binding commitments, non-compliance decisions and periodic penalty payments up to 5% of average daily income or worldwide annual turnover per day (Art. 75c(5)). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[9] The General-Purpose AI Code of Practice (published 10 Jul 2025; a voluntary tool; three chapters: Transparency, Copyright, Safety and Security). European Commission. 2025-07-10. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[10] GPAI Code of Practice: contents and signatories (Safety & Security applies to systemic-risk models; official signatory list). European Commission. 2026. https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (verified: primary)
[11] "ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity" (ISO 42001 AIMS ≠ Art. 17 QMS). Law & Technology. 2026. https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/ (verified: secondary)
[12] CSA research note on EU AI Act, prEN 18286 and ISO/IEC 42001 (scope difference; EN ISO/IEC 42001:2026 not a harmonised standard). Cloud Security Alliance. 2026-04-28. https://labs.cloudsecurityalliance.org/research/csa-research-note-eu-ai-act-pren-18286-iso-42001-20260428-cs/ (verified: secondary)
[13] ISO/IEC 42005:2025, AI system impact assessment (companion to Art. 27 and ISO 42001 Annex A.5). ISO/IEC. 2025-05. https://www.iso.org/standard/44545.html (verified: secondary)
[14] AI Risk Management Framework 1.0 (functions: Govern, Map, Measure, Manage). NIST. 2023-01-26. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[15] AI Controls Matrix (AICM) v1.1 (247 control objectives, 18 domains) and STAR for AI. Cloud Security Alliance. 2026-06-22. https://cloudsecurityalliance.org/artifacts/ai-controls-matrix-v1-1 (verified: primary)
[16] OWASP Top 10 for Agentic Applications for 2026 (ASI01 Agent Goal Hijack; ASI02 Tool Misuse and Exploitation; ASI03 Identity and Privilege Abuse; ASI04 Agentic Supply Chain Vulnerabilities; ASI05 Unexpected Code Execution (RCE); ASI06 Memory & Context Poisoning; ASI07 Insecure Inter-Agent Communication; ASI08 Cascading Failures; ASI09 Human-Agent Trust Exploitation; ASI10 Rogue Agents; names as in the document's contents, read 2026-09-24). OWASP GenAI Security Project. 2025-12-09. https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ (verified: primary)
[17] 2026 Top 10 for LLM Applications (released 3 Aug 2026; Excessive Agency is LLM03:2026) and the Agent Control Standard (ACS), donated to the project. OWASP GenAI Security Project. 2026-09-01. https://genai.owasp.org/2026/09/01/owasp-genai-security-project-unveils-2026-top-10-for-llm-applications-new-agent-control-standard-and-sponsors-as-community-tops-30000-members/ (verified: primary)
[18] "California's SB 53: the first frontier AI law explained" (frontier developers: trained a foundation model with more than 10^26 operations; large frontier developers: also more than USD 500M in annual gross revenue; up to USD 1M per violation; AG enforcement). Future of Privacy Forum (Justine Gluck). 2025-10-03. https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/ (verified: secondary)
[19] "Governor Hochul Signs Nation-Leading Legislation to Require AI Frameworks for AI Frontier Models" (RAISE Act, S6953B/A6453B, signed 19 Dec 2025; agreed chapter amendment; creates an oversight office within the Department of Financial Services; 72-hour incident reporting). Governor Kathy Hochul (New York State). 2025-12-19. https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models (verified: primary)
[20] Standardisation of the AI Act (no harmonised standard yet referenced in the Official Journal, so no Art. 40 presumption; page last updated 2026-08-03; no Commission implementing decision citing one found in the Publications Office index on 2026-09-24). European Commission. 2026-08-03. https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation (verified: primary)
[21] "EN 18286 in the Spotlight: Supporting Compliance with the AI Act" (EN 18286:2026, Art. 17 QMS, published; the first standard in support of the AI Act). CEN-CENELEC. 2026-07-31. https://www.cencenelec.eu/news-events/news/2026/en-in-the-spotlight/2026-07-30-ai-quality-management/ (verified: primary)
[22] Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026, amending Reg. (EU) 2024/1689 et al.; OJ L, 24 July 2026; in force 27 Jul 2026; amends Art. 3(14), 6(1a)–(1c), 25(2) and (4), 75(1), new 75(1a) (serious incidents of systems under the AI Office's competence reported to the AI Office), 99(4)(da), Annex I (machinery to Section B) and Annex VIII Section B (points 7 and 9 deleted); Art. 73 not amended; Art. 113(a) Chapters I and II apply from 2 Feb 2025; Art. 113(c) as replaced: Chapter III, Sections 1, 2 and 3, except Art. 6(5), apply from 2 Dec 2027 (Annex III) and 2 Aug 2028 (Annex I). Publications Office of the EU (EUR-Lex). 2026-07-24. https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng (verified: primary)
[23] Regulation (EU) 2024/1689 (AI Act), Art. 25 (responsibilities along the AI value chain; conditions under which a value-chain actor becomes a provider; information flow to downstream actors). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[24] NY State Senate Bill 2025-S6953B (RAISE Act; signed 19 Dec 2025 as Chapter 699; frontier model = trained with over 10^26 operations costing over USD 100M; safety protocols and 72-hour incident disclosure; Attorney General and Division of Homeland Security and Emergency Services; superseded in scope by the 2026 chapter amendment, which drops the cost test, adds a USD 500M revenue test and moves oversight to the DFS [25]). New York State Senate. 2025-12-19. https://www.nysenate.gov/legislation/bills/2025/S6953/amendment/B (verified: primary)
[25] "New York Finalizes RAISE Act for Frontier AI Models; Law Takes Effect January 1, 2027" (chapter amendment introduced 6 Jan 2026, passed 11 Mar 2026, signed 27 Mar 2026; effective 1 Jan 2027; SB 53's thresholds: frontier model above 10^26 operations, large frontier developer above USD 500M annual revenue; large frontier developers publish the framework, all frontier developers report critical safety incidents; DFS oversight office). Wiley. 2026-04-03. https://www.wiley.law/alert-New-York-Finalizes-RAISE-Act-for-Frontier-AI-Models-Law-Takes-Effect-January-1-2027 (verified: secondary)
[26] "AI Act: Commission publishes a reporting template for serious incidents involving general-purpose AI models with systemic risk" (template for serious-incident reporting under Art. 55; aligned to Commitment 9 of the GPAI Code). European Commission. 2025-11-04. https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai (verified: primary)
[27] ISO/IEC 42006:2025, Requirements for bodies providing audit and certification of AI management systems (builds on ISO/IEC 17021-1; who may credibly certify to 42001). ISO/IEC. 2025. https://www.iso.org/standard/42006 (verified: secondary)
[28] ISO/IEC 23894:2023, Guidance on AI risk management (adapts ISO 31000 to AI). ISO/IEC. 2023-02. https://www.iso.org/standard/77304.html (verified: secondary)
[29] "Announcing the AI Agent Standards Initiative for Interoperable and Secure Innovation" (CAISI initiative; agent identity, authentication and security). NIST. 2026-02-17. https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure (verified: primary)
[30] NIST IR 8596 (initial preliminary draft; comments closed 2026-01-30; no later version on CSRC on 2026-09-24): Cybersecurity Framework Profile for Artificial Intelligence (Cyber AI Profile); Secure / Defend / Thwart. NIST. 2025-12-16. https://csrc.nist.gov/pubs/ir/8596/iprd (verified: primary)
[31] NIST AI 800-1 (second public draft): Managing Misuse Risk for Dual-Use Foundation Models (voluntary; still in draft, no final version on NIST's publication server on 2026-09-24). NIST. 2025-01. https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models (verified: primary)
[32] "Securing the Agentic Control Plane: Key Progress at the CSAI Foundation" (names the Agentic Trust Framework, AARM, the Catastrophic Risk Annex and STAR for AI; no "Agentic Control Supplement" is named, checked 2026-09-24). Cloud Security Alliance. 2026-04-29. https://cloudsecurityalliance.org/blog/2026/04/29/securing-the-agentic-control-plane-key-progress-at-the-csai-foundation (verified: primary)
[33] AICM Catastrophic Risk Annex: enhanced AICM controls for high-autonomy systems with catastrophic-risk potential. Cloud Security Alliance. 2026-08-05. https://cloudsecurityalliance.org/csai-foundation/catastrophic-risk-annex (verified: primary)
[34] Basic Act on the Development of Artificial Intelligence and the Establishment of a Foundation for Trust (인공지능 발전과 신뢰 기반 조성 등에 관한 기본법; Act No. 20676, promulgated 2025-01-21, in force 2026-01-22; high-impact AI duties in Arts. 31 to 36; fact-finding in Art. 40; fines in Art. 43). Korean Law Information Center (MOLEG). 2026-01-22. https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543 (verified: primary)
[35] Texas Responsible Artificial Intelligence Governance Act (HB 149), enrolled text; effective 1 Jan 2026. Texas Legislature (89R). 2025. https://capitol.texas.gov/tlodocs/89R/billtext/pdf/HB00149F.pdf (verified: primary)
[36] "Colorado AI law in flux: comprehensive replacement bill signed after federal court blocks predecessor's enforcement" (SB 24-205 delayed to 30 Jun 2026, then replaced by SB 26-189, effective 1 Jan 2027). McDermott Will & Emery. 2026. https://www.mcdermottlaw.com/insights/colorado-ai-law-in-flux-comprehensive-replacement-bill-signed-after-federal-court-blocks-predecessors-enforcement/ (verified: secondary)
[37] Data (Use and Access) Act 2025, s. 80 (replaces UK GDPR Art. 22 with Arts. 22A–22D; in force 5 Feb 2026). legislation.gov.uk. 2025. https://www.legislation.gov.uk/ukpga/2025/18/section/80 (verified: primary)
[38] "AI Security Institute" (written statement announcing the rename of the AI Safety Institute). UK Parliament. 2025-02-24. https://questions-statements.parliament.uk/written-statements/detail/2025-02-24/hlws454 (verified: primary)
[39] Model AI Governance Framework for Generative AI (voluntary). IMDA / AI Verify Foundation. 2024-05. https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf (verified: primary)
[40] ETSI EN 304 223: Securing Artificial Intelligence (SAI); Baseline Cyber Security Requirements for AI Models and Systems (V2.1.1, Dec 2025; 13 principles across five lifecycle stages). ETSI. 2025-12. https://www.etsi.org/newsroom/press-releases/2627-etsi-releases-world-leading-standard-for-securing-ai/ (verified: primary)
[41] 《人工智能安全治理框架3.0》发布: announcement of the AI Safety Governance Framework 3.0 (TC260 under CAC guidance; released 2026-09-14 at the 2026 National Cybersecurity Publicity Week). Cyberspace Administration of China. 2026-09-14. https://www.cac.gov.cn/2026-09/14/c_1791137092283345.htm (verified: primary)
[42] AI Safety Governance Framework 3.0 (人工智能安全治理框架3.0), bilingual PDF; English text printed pp. 49–130; §2.1.1(b) open-source models p. 55; §2.1.4(a) computing power p. 59; §5.3 operators' guidelines pp. 101–104; Appendix 2 agentic AI risk management pp. 113–126; no reference to ISO/IEC 42001, NIST AI RMF or the EU AI Act. TC260 / CAC. 2026-09-14. https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf (verified: primary)
[43] Provisions on the Administration of Algorithmic Recommendation in Internet Information Services (互联网信息服务算法推荐管理规定; CAC, MIIT, MPS and SAMR Order No. 9; promulgated 2021-12-31; in force 2022-03-01; Art. 17 opt-out, Art. 24 algorithm filing, Art. 27 security assessment). Cyberspace Administration of China. 2022-01-04. https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm (verified: primary)
[44] Provisions on the Administration of Deep Synthesis in Internet Information Services (互联网信息服务深度合成管理规定; CAC, MIIT and MPS Order No. 12; promulgated 2022-11-25; in force 2023-01-10; Arts. 14 training data and separate consent, 16–17 marks and labels, 19 filing, 15/20 security assessment). Cyberspace Administration of China. 2022-12-11. https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm (verified: primary)
[45] Interim Measures for the Administration of Generative AI Services (生成式人工智能服务管理暂行办法; CAC and six other bodies, Order No. 15; published 2023-07-13; in force 2023-08-15; Art. 2 scope: services to the public within the PRC; Art. 7 lawful-source data; Art. 12 labelling; Art. 14 stop-remove-retrain-report; Art. 17 security assessment and filing). Cyberspace Administration of China. 2023-07-13. https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm (verified: primary)
[46] Measures for Labelling AI-Generated Synthetic Content (人工智能生成合成内容标识办法; CAC, MIIT, MPS and NRTA; published 2025-03-14; in force 2025-09-01; explicit and implicit labels; platform verification duty). Cyberspace Administration of China. 2025-03-14. https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm (verified: primary)
[47] GB 45438-2025 Cybersecurity technology: Labeling method for content generated by artificial intelligence (网络安全技术 人工智能生成合成内容标识方法; mandatory national standard; issued 2025-02-28; implemented 2025-09-01). SAMR / SAC (drafted by TC260). 2025-02-28. https://std.samr.gov.cn/gb/search/gbDetailed?id=301E0388CB75788DE06397BE0A0AE1B4 (verified: primary)
[48] GB/T 45654-2025 Cybersecurity technology: Basic security requirements for generative artificial intelligence service (网络安全技术 生成式人工智能服务安全基本要求; recommended national standard; issued 2025-04-25; implemented 2025-11-01). SAMR / SAC (drafted by TC260). 2025-04-25. https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=F67D3F376E0A0A0FF5317FB36B32A30A (verified: primary)
[49] Cybersecurity Law of the PRC as amended by the NPC Standing Committee decision of 2025-10-28 (in force 2026-01-01; new Article 20 on AI: state support for AI research, training-data and computing infrastructure, AI ethics norms, risk monitoring, assessment and safety supervision). Cyberspace Administration of China (consolidated text). 2025-12-29. https://www.cac.gov.cn/2025-12/29/c_1768735112911946.htm (verified: primary)
[50] Interim Measures for the Administration of Anthropomorphic Interaction Services (人工智能拟人化互动服务管理暂行办法; CAC, NDRC, MIIT, MPS and SAMR; published 2026-04-10; in force 2026-07-15). Cyberspace Administration of China. 2026-04-10. https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm (verified: primary)
[51] "China's TC260 released Version 3.0 of the AI Safety Governance Framework" (LinkedIn post; agents and physically interactive systems as the headline change). Barbara Li (Reed Smith). 2026-09. https://www.linkedin.com/posts/barbara-li-67532067_tc260-ai-governance-share-7505863215600308224-XIyo/ (verified: reported)
[52] Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la Agencia Española de Supervisión de Inteligencia Artificial (Royal Decree approving the AESIA statute; seat in A Coruña; BOE no. 210, 2 Sep 2023). Boletín Oficial del Estado. 2023-09-02. https://www.boe.es/eli/es/rd/2023/08/22/729 (verified: primary)
[53] JTC 21 standards tracker (risk, logging and cybersecurity standards at Enquiry, end-2026 target; a vendor-maintained tracker, not a CEN-CENELEC publication). kla.digital. 2026. https://kla.digital/blog/jtc-21-standards-tracker (verified: reported)
[54] "Evolving AI Transparency: the AIBOM generator's new home at OWASP" (CycloneDX output). OWASP GenAI Security Project. 2025-12-18. https://genai.owasp.org/2025/12/18/evolving-ai-transparency-the-journey-of-the-aibom-generator-and-its-new-home-at-owasp/ (verified: primary)
[55] SB26-189 Automated Decision-Making Technology (signed by the Governor 14 May 2026; Session Laws chapter 131). Colorado General Assembly. 2026-05-14. https://leg.colorado.gov/bills/sb26-189 (verified: primary)
[56] SB 53, Artificial intelligence models: large developers (Transparency in Frontier Artificial Intelligence Act; approved by the Governor 29 Sep 2025; frontier AI framework; critical safety incidents to the Office of Emergency Services within 15 days; civil penalty up to USD 1M per violation, Attorney General only). California Legislature. 2025-09-29. https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202520260SB53 (verified: primary)
[57] Regulation (EU) 2024/1689 (AI Act): Art. 26(5) (a deployer that identifies a serious incident informs the provider first, then the importer or distributor and the market-surveillance authority; Art. 73 applies mutatis mutandis if it cannot reach the provider) and Art. 73(1)–(4) (report immediately on a causal link or its reasonable likelihood, and no later than 15, 2 or 10 days after the provider or, where applicable, the deployer becomes aware). Publications Office of the EU (EUR-Lex). 2024-06-13. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[58] "AI Basic Act Update: Enforcement and Key Implications" (MSIT guidance period of at least one year for fact-finding and fines; exceptions for loss of life or human-rights violations). Shin & Kim. 2026-02-11. https://www.shinkim.com/eng/media/newsletter/3117 (verified: secondary)
[59] AI Risk Management Framework ("The AI RMF 1.0 is being revised as part of the White House AI Action Plan"; no revised version published as of 2026-09-24). NIST. 2026-09-24. https://www.nist.gov/itl/ai-risk-management-framework (verified: primary)
[60] Project stages for JTC 21 deliverables read on 2026-09-24 (prEN 18228 and prEN 18282 Enquiry votes closed 2026-07-30; prEN 18229-1 closed 2026-08-20; prEN 18229-3 at Enquiry from 2026-07-30; prEN 18229-4 and -5 new projects 2026-06-24). Genorma (pan-European standards information point with national standards bodies). 2026-09-24. https://genorma.com/en/standards/pren-18228 (verified: secondary)
[61] "Update on CEN and CENELEC's decision to accelerate the development of standards for artificial intelligence" (direct publication after a positive Enquiry vote; Q4 2026 target). CEN-CENELEC. 2025-10-23. https://www.cencenelec.eu/news-events/news/2025/brief-news/2025-10-23-ai-standardization/ (verified: primary)
[62] Enforcement Decree of the AI Basic Act (Presidential Decree No. 36053, promulgated 2026-01-21, in force 2026-01-22). Korean Law Information Center (MOLEG). 2026-01-21. https://www.law.go.kr/LSW/lsInfoP.do?efYd=20260122&lsiSeq=282879 (verified: primary)
[63] Regulation (EU) 2024/1689 (AI Act), consolidated text of 27 July 2026 incorporating Regulation (EU) 2026/1744 (Art. 3(1) AI system; Art. 6(3)–(4) documented non-high-risk assessment and Art. 49(2) registration; Art. 15(3)–(4) declared accuracy metrics and feedback loops; Art. 16(l) accessibility; Art. 17(1)(m) accountability framework; Art. 18 documentation kept 10 years; Art. 19 logs kept at least six months; Art. 20 corrective actions; Arts. 22–24 authorised representatives, importers and distributors; Art. 26(1)–(11) deployer duties; Art. 43(4) new assessment on substantial modification; Art. 48 CE marking; Art. 52 notification within two weeks; Art. 53(1)(c) copyright policy; Art. 54 authorised representative of GPAI providers; Art. 73(6) investigation without altering the system; Art. 86 right to explanation; Art. 87 Directive (EU) 2019/1937 applies; Art. 111(3) GPAI models placed on the market before 2 August 2025 comply by 2 August 2027; Art. 113). Publications Office of the EU (EUR-Lex). 2026-07-27. https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng (verified: primary)
[64] Directive (EU) 2019/1937 on the protection of persons who report breaches of Union law (internal reporting channels for private legal entities with 50 or more workers, Art. 8(3); acknowledgment within seven days and feedback within three months, Art. 9(1)). Publications Office of the EU (EUR-Lex). 2019-11-26. https://eur-lex.europa.eu/eli/dir/2019/1937/oj/eng (verified: primary)
[65] General-Purpose AI Code of Practice, Safety and Security chapter (Commitment 9, Measure 9.3: 2, 5, 10 and 15 days by incident class, intermediate reports at least every four weeks, final report within 60 days of resolution; Measure 9.4: records kept at least five years; Appendix 1.3 sources of systemic risk incl. the capability to operate autonomously, colluding with other AI systems, access to tools and the level of human oversight; Appendix 1.4 specified systemic risks incl. loss of control). European Commission. 2025-07-10. https://ec.europa.eu/newsroom/dae/redirection/document/118119 (verified: primary)
[66] Regulation (EU) 2016/679 (General Data Protection Regulation; Arts. 5(1)(b)–(c), 5(2), 6, 6(4), 7, 9, 13, 14, 15(1)(h), 16, 17, 21, 22, 25, 28, 30, 33–36, 44–49; applies from 25 May 2018, Art. 99(2)). Publications Office of the EU (EUR-Lex). 2016-05-04. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[67] Opinion 28/2024 on certain data protection aspects related to the processing of personal data in the context of AI models (legitimate-interest test; anonymity test and the evidence expected for a claim that a model is anonymous). European Data Protection Board. 2024-12-17. https://www.edpb.europa.eu/system/files/2024-12/edpb_opinion_202428_ai-models_en.pdf (verified: primary)
[68] Directive (EU) 2022/2555 (NIS2) (Art. 21(2)(c) business continuity and (d) supply-chain security; Art. 23(4) early warning within 24 hours, incident notification within 72 hours, final report within one month; Art. 41(1) measures applied from 18 October 2024). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/dir/2022/2555/oj/eng (verified: primary)
[69] Regulation (EU) 2022/2554 (DORA) (Art. 19 reporting of major ICT-related incidents; Art. 28(3) register of information; Art. 28(8) exit strategies; Art. 64 applies from 17 January 2025). Publications Office of the EU (EUR-Lex). 2022-12-27. https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng (verified: primary)
[70] Commission Delegated Regulation (EU) 2025/301, RTS on the content and time limits of major ICT-related incident reports (Art. 5(1): initial notification within four hours of classification and no later than 24 hours from awareness; Art. 5(2): within four hours of a classification made after those 24 hours; intermediate report within 72 hours of the initial notification; final report no later than one month after the latest intermediate report). Publications Office of the EU (EUR-Lex). 2025-02-20. https://eur-lex.europa.eu/eli/reg_del/2025/301/oj/eng (verified: primary)
[71] Regulation (EU) 2024/2847 (Cyber Resilience Act) (Art. 14 reporting of actively exploited vulnerabilities and severe incidents: early warning within 24 hours, notification within 72 hours, final reports; Art. 71(2) applies from 11 December 2027, Art. 14 from 11 September 2026). Publications Office of the EU (EUR-Lex). 2024-11-20. https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng (verified: primary)
[72] Directive (EU) 2024/2853 on liability for defective products (Art. 2(1) products placed on the market or put into service after 9 December 2026; Art. 4(1) software is a product; Art. 9 disclosure of evidence; Art. 10 presumption of defectiveness; Art. 11(2) no exemption for defects due to software, its updates or the lack of safety updates within the manufacturer's control; Art. 22 transposition by 9 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-18. https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng (verified: primary)
[73] Directive (EU) 2019/790 on copyright and related rights in the Digital Single Market (Art. 4(3) text-and-data-mining exception subject to an express reservation, by machine-readable means for content made publicly available online; Art. 29 transposition by 7 June 2021). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[74] Regulation (EU) 2022/2065 (Digital Services Act) (Art. 25 online interface design and organisation; Art. 27 recommender system transparency; applies from 17 February 2024). Publications Office of the EU (EUR-Lex). 2022-10-27. https://eur-lex.europa.eu/eli/reg/2022/2065/oj/eng (verified: primary)
[75] Directive 2005/29/EC (Unfair Commercial Practices Directive) (Art. 5 general prohibition; Arts. 6–7 misleading actions and omissions; Art. 19 measures applied by 12 December 2007), with Directive (EU) 2019/2161 adding Annex I points 23b and 23c on consumer reviews. Publications Office of the EU (EUR-Lex). 2005-06-11. https://eur-lex.europa.eu/eli/dir/2005/29/oj/eng (verified: primary)
[76] Directive (EU) 2024/2831 on improving working conditions in platform work (Art. 7 limits on processing by automated systems; Art. 9 transparency; Art. 10 human oversight and an impact evaluation at least every two years; Art. 11 explanation and human review; Art. 29 transposition by 2 December 2026). Publications Office of the EU (EUR-Lex). 2024-11-11. https://eur-lex.europa.eu/eli/dir/2024/2831/oj/eng (verified: primary)
[77] Directive (EU) 2023/2225 on credit agreements for consumers (Art. 18(8) human intervention, explanation and review where the creditworthiness assessment involves automated processing; Art. 48 measures applied from 20 November 2026). Publications Office of the EU (EUR-Lex). 2023-10-30. https://eur-lex.europa.eu/eli/dir/2023/2225/oj/eng (verified: primary)
[78] ISO/IEC 22989:2022, Information technology: Artificial intelligence: AI concepts and terminology (AI stakeholder roles; AI system life cycle). ISO/IEC. 2022-07. https://www.iso.org/standard/74296.html (verified: primary)
[79] NIST AI 600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile (12 risks; suggested actions coded GV, MP, MS and MG). NIST. 2024-07-26. https://doi.org/10.6028/NIST.AI.600-1 (verified: primary)
[80] AICM v1.1.1 and AI-CAIQ machine-readable bundle (JSON, YAML, OSCAL; control ids and titles incl. IAM-18 Agent Access Restriction and AIS-11 Agents Security Boundaries). Cloud Security Alliance. 2026-08-04. https://cloudsecurityalliance.org/artifacts/aicm-machine-readable-bundle-json-yaml-oscal (verified: primary)
[81] Agentic Trust Framework, v1 (zero-trust governance for AI agents; autonomy tiers and promotion criteria; CC BY 4.0). CSAI Foundation / Cloud Security Alliance. 2026-02. https://agentictrustframework.ai/ (verified: primary)
[82] Autonomous Action Runtime Management (AARM) specification (pre-execution interception with identity binding; policy evaluation before execution). Cloud Security Alliance. 2026. https://aarm.dev/ (verified: primary)
[83] STAR for AI (Level 1 self-assessment; Level 1 Valid-AI-ted automated validation; Level 2 with ISO/IEC 42001 certification plus the Valid-AI-ted assessment; read 2026-09-24). Cloud Security Alliance. 2026-09-24. https://cloudsecurityalliance.org/star/ai (verified: primary)
[84] AB-2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28, Chapter 817; documentation on or before 2026-01-01 for systems released since 2022-01-01). California Legislative Information. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[85] AB-853, California AI Transparency Act (amends SB 942; chaptered 2025-10-13, Chapter 674; operative 2026-08-02; platform duties 2027-01-01; capture devices 2028-01-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853 (verified: primary)
[86] SB-243, Companion chatbots (chaptered 2025-10-13, Chapter 677; AI disclosure; reminders at least every three hours for known minors; suicide and self-harm protocol; annual reports to the Office of Suicide Prevention beginning 2027-07-01). California Legislative Information. 2025-10-13. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243 (verified: primary)
[87] "California Finalizes Regulations to Strengthen Consumers' Privacy" (regulations on ADMT, risk assessments and cybersecurity audits approved 2025-09-23; effective 2026-01-01; ADMT requirements from 2027-01-01; risk-assessment attestations and summaries due 2028-04-01). California Privacy Protection Agency. 2025-09-23. https://cppa.ca.gov/announcements/2025/20250923.html (verified: primary)
[88] New York General Business Law Article 47, Artificial Intelligence Companion Models (§§ 1700–1704; self-harm protocol; notice at the start and at least every three hours; Attorney General, up to USD 15,000 per day; most recent revision shown 2025-11-07). New York State Senate. 2025-11-07. https://www.nysenate.gov/legislation/laws/GBS/A47 (verified: primary)
[89] "Illinois Adopts New AI-in-Employment Regulations: What Employers Need to Know for 2026" (HB 3773 effective 2026-01-01; notice duty; ZIP codes as a proxy; IDHR draft rules). Hinshaw & Culbertson. 2026. https://www.hinshawlaw.com/en/insights/blogs/employment-law-observer/illinois-adopts-new-ai-in-employment-regulations-what-employers-need-to-know-for-2026 (verified: secondary)
[90] Automated Employment Decision Tools (Local Law 144 of 2021; bias audit within one year; public summary; notices; enforcement from 2023-07-05). NYC Department of Consumer and Worker Protection. 2023. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page (verified: primary)
[91] S.B. 226, Artificial Intelligence Consumer Protection Amendments, enrolled copy (Utah Code 13-75, effective 2025-05-07: disclosure on a clear and unambiguous request; prominent disclosure in high-risk interactions by regulated occupations; safe harbour; Title 13, Chapter 72, Artificial Intelligence Policy Act, repealed 2027-07-01). Utah State Legislature. 2025. https://le.utah.gov/Session/2025/bills/enrolled/SB0226.pdf (verified: primary)
[92] SB21-169, Restrict Insurers' Use of External Consumer Data (signed 2021-07-06; effective 2021-09-07; risk-management framework, testing and chief-risk-officer attestation; rules per type of insurance, none effective before 2023-01-01). Colorado General Assembly. 2021-07-06. https://leg.colorado.gov/bills/sb21-169 (verified: primary)
[93] Code of Virginia § 59.1-580, Data protection assessments (targeted advertising, sale, profiling with a reasonably foreseeable risk, sensitive data; processing activities created after 2023-01-01; available to the Attorney General). Virginia General Assembly. 2023. https://law.lis.virginia.gov/vacode/title59.1/chapter53/section59.1-580/ (verified: primary)
[94] SB21-190, Protect Personal Data Privacy (Colorado Privacy Act; opt-outs incl. profiling; data protection assessments; universal opt-out mechanism; effective 1 July 2023). Colorado General Assembly. 2021-07-07. https://leg.colorado.gov/bills/sb21-190 (verified: primary)
[95] Minnesota Statutes § 325M.14, Consumer personal data rights, subd. 1(g) (question the result of profiling, be informed of the reason, review and correct the data, have the decision re-evaluated; effective 31 July 2025). Office of the Revisor of Statutes, Minnesota. 2025. https://www.revisor.mn.gov/statutes/cite/325M.14 (verified: primary)
[96] "Biometric Information Privacy Act" (signed 3 October 2008; consent, timely destruction and secure storage of biometric identifiers; USD 1,000 or 5,000 per violation). Wikipedia. 2026-09-24. https://en.wikipedia.org/wiki/Biometric_Information_Privacy_Act (verified: reported)
[97] Chapter 19.373 RCW, Washington My Health My Data Act (consumer health data incl. data derived or extrapolated by algorithms or machine learning; consent, separate sharing consent, signed authorisation for sale; 31 March 2024, small businesses 30 June 2024). Washington State Legislature. 2023. https://app.leg.wa.gov/RCW/default.aspx?cite=19.373&full=true (verified: primary)
[98] OMB Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust (high-impact AI; minimum practices; 365 days to document). Office of Management and Budget. 2025-04-03. https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf (verified: primary)
[99] OMB Memorandum M-26-04, Increasing Public Trust in Artificial Intelligence Through Unbiased AI Principles (policies updated by 2026-03-11; minimum LLM transparency in solicitations). Office of Management and Budget. 2025-12-11. https://www.whitehouse.gov/wp-content/uploads/2025/12/M-26-04-Increasing-Public-Trust-in-Artificial-Intelligence-Through-Unbiased-AI-Principles-1.pdf (verified: primary)
[100] 12 CFR § 1002.9, Notifications (statement of specific reasons, or the right to one within 30 days; internal standards or a failed score are insufficient; source 76 FR 79445, 21 December 2011, as amended 20 March 2023). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/12/1002.9 (verified: secondary)
[101] 15 U.S.C. § 1681m, Requirements on users of consumer reports (adverse-action notice; numerical credit score and key factors added by Pub. L. 111-203, s. 1100F, effective on the designated transfer date, 21 July 2011 per 12 U.S.C. § 5582 note). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/1681m (verified: secondary)
[102] 42 U.S.C. § 2000e-2(k), Burden of proof in disparate impact cases (business necessity; alternative employment practice; added by the Civil Rights Act of 1991, 21 November 1991). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/42/2000e-2 (verified: secondary)
[103] 29 CFR § 1607.4(D), Uniform Guidelines on Employee Selection Procedures: adverse impact and the four-fifths rule (43 FR 38295, 25 August 1978). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/cfr/text/29/1607.4 (verified: secondary)
[104] 15 U.S.C. § 45(a)(1), Unfair methods of competition and unfair or deceptive acts or practices unlawful (deceptive-practices prong added by the Wheeler-Lea Act of 21 March 1938). Legal Information Institute, Cornell Law School. 2026-09-24. https://www.law.cornell.edu/uscode/text/15/45 (verified: secondary)
[105] "FTC Order Requires Workado to Back Up Artificial Intelligence Detection Claims" (competent and reliable evidence required for AI accuracy claims). Federal Trade Commission. 2025-04-28. https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-order-requires-workado-back-artificial-intelligence-detection-claims (verified: primary)
[106] TAKE IT DOWN Act, Public Law 119-12 (enacted 19 May 2025; s. 3: covered platforms establish a notice-and-removal process within one year of enactment and remove reported images, and known identical copies, within 48 hours; enforced by the FTC). US Government Publishing Office, GovInfo. 2025-05-19. https://www.govinfo.gov/content/pkg/PLAW-119publ12/html/PLAW-119publ12.htm (verified: primary)
[107] Model AI Governance Framework for Agentic AI, version 1.5 (agent identity unique, accounted for and centrally managed; authorisations scoped, time- or session-bound, non-transferable and bounded by the authorising human; significant checkpoints for high-stakes, irreversible, outlier and user-defined actions; approvals enforced through system-level controls). IMDA. 2026-05-20. https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf (verified: primary)
[108] Directive on Automated Decision-Making (in effect 1 April 2019; systems procured before 24 June 2025 comply by 24 June 2026; 6.1 algorithmic impact assessment published before production; Appendix C requirements by impact level; notice, explanation, peer review, recourse, reporting). Treasury Board of Canada Secretariat. 2025-06-24. https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592 (verified: primary)
[109] Lei Geral de Proteção de Dados Pessoais, Lei n. 13.709/2018, compiled text (Art. 20 review of decisions taken solely on automated processing; Art. 65 entry into force, incl. Arts. 52 to 54 from 1 August 2021). Presidência da República (Brazil). 2026-09-24. https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm (verified: primary)
[110] Personal Information Protection Law of the People's Republic of China, English translation for reference (Art. 24 automated decision-making; Arts. 55–56 personal information protection impact assessment kept at least three years; in force 1 November 2021). National People's Congress. 2021-12-29. http://en.npc.gov.cn.cdurl.cn/2021-12/29/c_694559.htm (verified: primary)
[111] Digital Markets, Competition and Consumers Act 2024, s. 225 (unfair commercial practices prohibited; in force 6 April 2025) and Sch. 20, para. 13 (fake and concealed-incentive consumer reviews). legislation.gov.uk. 2024. https://www.legislation.gov.uk/ukpga/2024/13/section/225 (verified: primary)
[112] Council of Europe Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law (CETS No. 225), text (Arts. 14–15 remedies and safeguards; Art. 16 risk and impact management; Art. 30 entry into force). Council of Europe. 2024-09-05. https://rm.coe.int/1680afae3c (verified: primary)
[113] The Framework Convention on Artificial Intelligence (Parties: the European Union; not yet in force; read on 2026-09-24). Council of Europe. 2026-09-24. https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence (verified: primary)
[114] Recommendation of the Council on Artificial Intelligence, OECD/LEGAL/0449 (principles 1.4(b) override, repair or decommission safely and 1.5(b)–(c) traceability and systematic risk management; revised 3 May 2024). OECD. 2024-05-03. https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449 (verified: primary)
[115] Hiroshima Process International Code of Conduct for Organizations Developing Advanced AI Systems (11 actions; voluntary). G7 / European Commission. 2023-10-30. https://digital-strategy.ec.europa.eu/en/library/hiroshima-process-international-code-conduct-advanced-ai-systems (verified: primary)
[116] "OECD launches global framework to monitor application of G7 Hiroshima AI Code of Conduct" (reporting framework launched 7 February 2025; first reports by 15 April 2025). OECD. 2025-02-07. https://www.oecd.org/en/about/news/press-releases/2025/02/oecd-launches-global-framework-to-monitor-application-of-g7-hiroshima-ai-code-of-conduct.html (verified: primary)
[118] Public Act 103-0804, HB 3773 (amends the Illinois Human Rights Act, 775 ILCS 5/2-102(L): no AI with a discriminatory effect on protected classes, no ZIP codes as a proxy, notice of AI use; IDHR to adopt rules; approved 9 Aug 2024, effective 1 Jan 2026; text and bill status read from Web Archive captures of 2025-03-29 and 2025-06-17, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2024-08-09. https://www.ilga.gov/legislation/publicacts/fulltext.asp?Name=103-0804 (verified: primary)
[119] 740 ILCS 14, Biometric Information Privacy Act (Source: P.A. 95-994, eff. 10-3-08; s. 15 retention schedule, written release, secure storage; s. 20 right of action, USD 1,000 negligent or USD 5,000 intentional or reckless per violation; text read from the Web Archive capture of 2025-06-18, as ilga.gov refused connections on 2026-09-25). Illinois General Assembly. 2008-10-03. https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=3004&ChapterID=57 (verified: primary)
