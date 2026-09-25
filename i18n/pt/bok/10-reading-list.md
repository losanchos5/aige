---
lang: pt
source: bok/10-reading-list.md
sourceHash: "4a49b156ff700e2877fb34618240a82581dbb1f121375b5415dff77b871b93f5"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
---
# 10. Lista de leitura

> As fontes que formaram a disciplina, curadas e anotadas, cada uma com um URL verificado e uma nota
> de uma linha sobre por que importa.

Esta é uma bibliografia de trabalho, não um cânone. As entradas são agrupadas por tema e anotadas
numa linha. Os URLs são fornecidos em linha com uma etiqueta de verificação (`primary`, `secondary`,
`reported`) para que o capítulo seja autodocumentado; cada URL é extraído do resumo de investigação
do livro ou verificado para esta edição. As ferramentas são nomeadas como exemplos de categoria,
ilustrativos e não recomendações.

Cada entrada também tem duas etiquetas: o **público** que serve melhor (`engineering`, `governance`,
`legal`, `leadership`, `research`) e a **jurisdição** a que se refere (`global` quando não está
vinculada a uma ordem legal). As etiquetas são um auxílio de leitura, não uma classificação. A mesma
lista, filtrável por ambas as etiquetas, está na página de recursos do site. Nenhum guia de estudo
comercial para qualquer certificação é listado.

## Textos fundamentais (a forma e o método)

- **GRC Engineering Manifesto**: a declaração fundadora da disciplina-mãe; o modelo estrutural e
  filosófico para este livro. `https://grc.engineering/` (verificado: primário) (público:
  governação, engenharia; jurisdição: global)
- **"What is GRC Engineering" (Ayoub Fandi)**: a definição mais clara do método-mãe e a fonte do
  teste "painel verde sobre um controlo quebrado é teatro".
  `https://grcengineer.com/what-is-grc-engineering/` (verificado: primário) (público: governação,
  engenharia; jurisdição: global)
- **The Agile Manifesto**: a forma de valores e princípios numerados e o modelo de signatários que
  este livro toma emprestado. `https://agilemanifesto.org/` (verificado: primário) (público:
  engenharia, liderança; jurisdição: global)
- **The Twelve-Factor App**: o modelo para um corpo de prática numerado e orientado para
  profissionais com um enquadramento "quem deve ler isto". `https://12factor.net/` (verificado:
  primário) (público: engenharia; jurisdição: global)
- **CSIRO Responsible AI Pattern Catalogue**: o modelo de padrão (capítulo 05) e prova de que a
  prática de IA responsável pode ser escrita como padrões reutilizáveis.
  `https://research.csiro.au/ss/science/projects/responsible-ai-pattern-catalogue/` (verificado:
  primário) (público: engenharia, investigação; jurisdição: global)
- **privacypatterns.org**: o precedente para traduzir um princípio legal (privacidade desde a
  conceção) em padrões de engenharia sob CC BY. `https://privacypatterns.org/` (verificado:
  primário) (público: engenharia, legal; jurisdição: global)

## Regulação e normas

- **EU AI Act, texto consolidado (EUR-Lex)**: Regulamento (UE) 2024/1689 conforme alterado pelo
  Omnibus Digital (Regulamento (UE) 2026/1744), consolidado em 27 de julho de 2026; a fonte de
  obrigação primária para o capítulo 08.
  `https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng` (verificado: primário) (público:
  legal, governação, engenharia; jurisdição: UE)
- **Digital Omnibus on AI, Regulation (EU) 2026/1744 (EUR-Lex)**: o ato de alteração conforme
  publicado no Jornal Oficial em 24 de julho de 2026, com as novas datas e os novos Artigos 4a e
  75a-75d. `https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng` (verificado: primário) (público:
  legal, governação; jurisdição: UE)
- **AI Act Explorer (Future of Life Institute)**: uma leitura navegável, artigo por artigo, do Ato e
  das alterações do Omnibus; comentário e navegação, não o texto legal.
  `https://artificialintelligenceact.eu/ai-act-explorer/digital-omnibus/` (verificado: secundário)
  (público: legal, governação, engenharia; jurisdição: UE)
- **GPAI Code of Practice**: o código voluntário da Comissão para IA de finalidade geral, incluindo
  o capítulo de segurança cujos signatários se comprometem com avaliações de modelo.
  `https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai` (verificado: primário)
  (público: legal, engenharia; jurisdição: UE)
- **Standardisation of the AI Act (European Commission)**: a página de estado da Comissão para as
  normas harmonizadas que concederiam uma presunção de conformidade; a partir de 2026-09-24, nenhuma
  é citada no JO. `https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation`
  (verificado: primário) (público: governação, legal; jurisdição: UE)
- **"ISO/IEC 42001 and the AI Act: why certification is not yet a presumption of conformity"**: a
  relação-chave entre a norma AIMS (e 42005/42006) e o Regulamento.
  `https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/`
  (verificado: secundário) (público: governação, legal; jurisdição: UE)
- **JTC 21 harmonised-standards tracker**: um rastreador mantido por fornecedor do estágio que cada
  entrega do JTC 21 atingiu; útil para datas, lido em relação à página da Comissão acima.
  `https://kla.digital/blog/jtc-21-standards-tracker` (verificado: secundário) (público: governação;
  jurisdição: UE)
- **NIST AI Risk Management Framework 1.0**: as funções Govern/Map/Measure/Manage utilizadas como
  alvo de mapeamento em todo o documento. `https://www.nist.gov/itl/ai-risk-management-framework`
  (verificado: primário) (público: governação, engenharia; jurisdição: US)
- **NIST NCCoE, "Software and AI Agent Identity and Authorization" (concept paper)**: a referência
  emergente para identidade não humana, a precondição da governação de agentes.
  `https://www.nccoe.nist.gov/news-insights/new-concept-paper-identity-and-authority-software-agents`
  (verificado: primário) (público: engenharia; jurisdição: US)
- **NIST CAISI AI Agent Standards Initiative**: o esforço para tornar a interoperabilidade e
  segurança de agentes padrão, não por fornecedor.
  `https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure`
  (verificado: primário) (público: engenharia, governação; jurisdição: US)
- **OWASP GenAI Security Project**: a casa do Top 10 para Aplicações LLM, o Top 10 para Aplicações
  Agentic, o projeto AIBOM e a Avaliação de Maturidade de IA. `https://genai.owasp.org/`
  (verificado: primário) (público: engenharia; jurisdição: global)
- **CSA AI Controls Matrix and STAR for AI**: o marco de controlo e programa de garantia mapeados
  para ISO 42001 e NIST AI RMF (capítulos 07-08). `https://cloudsecurityalliance.org/star/ai`
  (verificado: primário) (público: governação, engenharia; jurisdição: global)
- **MITRE ATLAS**: a base de conhecimento de táticas e técnicas adversárias para IA, incluindo
  técnicas de agentes, em que os modelos de ameaça se baseiam. `https://atlas.mitre.org/`
  (verificado: primário) (público: engenharia; jurisdição: global)
- **NSA CSI, "MCP: Security Design Considerations"**: orientação governamental sobre segurança do
  Model Context Protocol que conecta agentes a ferramentas.
  `https://www.nsa.gov/Press-Room/Press-Releases-Statements/Press-Release-View/Article/4496698/`
  (verificado: primário) (público: engenharia; jurisdição: US)
- **"California's SB 53: the first frontier-AI law explained" (FPF)**: a leitura mais clara sobre SB
  53 da Califórnia (TFAIA), a primeira lei de transparência de IA de fronteira dos EUA.
  `https://fpf.org/blog/californias-sb-53-the-first-frontier-ai-law-explained/` (verificado:
  secundário) (público: legal, governação; jurisdição: US)
- **New York RAISE Act (Governor's signing announcement)**: a lei de segurança de IA de fronteira de
  Nova Iorque (S6953B), assinada em 19 de dezembro de 2025 e efetiva em 1 de janeiro de 2027 após
  uma alteração de capítulo em março de 2026, com um escritório de supervisão no Departamento de
  Serviços Financeiros.
  `https://www.governor.ny.gov/news/governor-hochul-signs-nation-leading-legislation-require-ai-frameworks-ai-frontier-models`
  (verificado: primário) (público: legal, governação; jurisdição: US)
- **NIST AI 800-1, "Managing Misuse Risk for Dual-Use Foundation Models" (second public draft)**:
  orientação voluntária do NIST/CAISI dos EUA sobre identificação, medição e mitigação de risco de
  uso indevido em todo o ciclo de vida do modelo; ainda um rascunho.
  `https://www.nist.gov/news-events/news/2025/01/updated-guidelines-managing-misuse-risk-dual-use-foundation-models`
  (verificado: primário) (público: engenharia, governação; jurisdição: US)
- **NIST ARIA (Assessing Risks and Impacts of AI)**: o ambiente de avaliação do NIST que testa
  riscos e impactos de modelo através de testes de modelo, red teaming e testes de campo; uma
  referência para a camada 03. `https://ai-challenges.nist.gov/aria` (verificado: primário)
  (público: engenharia, investigação; jurisdição: US)
- **UK AI Security Institute**: o instituto governamental do Reino Unido que avalia riscos de IA
  avançada e publica o marco de avaliação Inspect que este livro utiliza como referência da
  camada 03. `https://www.aisi.gov.uk/` (verificado: primário) (público: engenharia, investigação;
  jurisdição: UK)
- **US Center for AI Standards and Innovation (CAISI)**: o centro do NIST para normas, testes e
  segurança de IA, anteriormente o Instituto de Segurança de IA dos EUA; o ponto de contacto do
  governo dos EUA para a indústria. `https://www.nist.gov/caisi` (verificado: primário) (público:
  governação, investigação; jurisdição: US)
- **Marco de Gobernanza de Seguridad de IA 3.0 (TC260, bajo orientación de CAC)**: marco voluntario
  de China, PDF bilingüe; el Apéndice 2 es el marco de gestión de riesgos de IA agéntica (identidad,
  puntos de control humanos, guardrails, memoria, desmantelamiento).
  `https://www.cac.gov.cn/rootimages/uploadimg/1791137114683961/1791137114683961.pdf` (verificado:
  primario) (audiencia: gobernanza, ingeniería; jurisdicción: China)
- **Medidas Provisionales para la Administración de Servicios de IA Generativa**: norma vinculante
  de China para IA generativa ofrecida al público dentro de la RPC, en vigor desde 2023-08-15; texto
  oficial en chino. `https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm` (verificado:
  primario) (audiencia: legal; jurisdicción: China)
- **Disposiciones sobre la Administración de Síntesis Profunda en Servicios de Información de Internet**:
  deberes de etiquetado, datos de entrenamiento y consentimiento para síntesis profunda, en vigor
  desde 2023-01-10; texto oficial en chino.
  `https://www.cac.gov.cn/2022-12/11/c_1672221949354811.htm` (verificado: primario) (audiencia:
  legal; jurisdicción: China)
- **Disposiciones sobre la Administración de Recomendación Algorítmica en Servicios de Información de Internet**:
  registro de algoritmos, evaluación de seguridad y opción de exclusión del usuario, en vigor desde
  2022-03-01; texto oficial en chino. `https://www.cac.gov.cn/2022-01/04/c_1642894606364259.htm`
  (verificado: primario) (audiencia: legal; jurisdicción: China)
- **Medidas para el Etiquetado de Contenido Sintético Generado por IA**: etiquetas explícitas e
  implícitas, en vigor desde 2025-09-01 junto con la norma obligatoria GB 45438-2025; texto oficial
  en chino. `https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm` (verificado: primario)
  (audiencia: legal, ingeniería; jurisdicción: China)
- **Ley Básica de IA de Corea del Sur**: la Ley Marco en vigor desde 2026-01-22, con deberes
  reforzados para IA de alto impacto; el capítulo 08 de la fuente ya la cita.
  `https://www.trade.gov/market-intelligence/south-korea-ai-basic-act` (verificado: secundario)
  (audiencia: legal, gobernanza; jurisdicción: Corea del Sur)
- **Marco de Gobernanza de IA Modelo para IA Generativa (IMDA / AI Verify Foundation)**: marco
  voluntario de Singapur (mayo de 2024): testagem, transparencia, notificación de incidentes,
  segurança e proveniência de conteúdo.
  `https://aiverifyfoundation.sg/wp-content/uploads/2024/05/Model-AI-Governance-Framework-for-Generative-AI-May-2024-1-1.pdf`
  (verificado: primario) (audiencia: gobernanza, ingeniería; jurisdicción: Singapur)

## Princípios e marcos internacionais

- **Recomendação do Conselho da OCDE sobre Inteligência Artificial (OECD/LEGAL/0449)**: os
  Princípios de IA conforme revistos em 2024, e a fonte da definição de sistema de IA e ciclo de
  vida que o Regulamento da IA e a Convenção do Conselho da Europa seguem.
  `https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449` (verificado: primario)
  (audiência: gobernanza, liderança, legal; jurisdicción: global)
- **Memorando explicativo sobre a definição atualizada de sistema de IA da OCDE**: por que a
  definição de 2023 mudou e como a autonomia e adaptabilidade se destinam.
  `https://www.oecd.org/en/publications/explanatory-memorandum-on-the-updated-oecd-definition-of-an-ai-system_623da898-en.html`
  (verificado: primário) (audiência: gobernanza, legal; jurisdicción: global)
- **HUDERIA: avaliação de risco e impacto de sistemas de IA (Conselho da Europa)**: a metodologia de
  impacto sobre direitos humanos e seu modelo de contexto, para reconciliar com uma FRIA existente.
  `https://www.coe.int/en/web/artificial-intelligence/huderia-risk-and-impact-assessment-of-ai-systems`
  (verificado: primário) (audiência: gobernanza, legal; jurisdicción: global)
- **Rumo a um marco comum de notificação de incidentes de IA (OCDE, 2025)**: os 29 critérios com os
  quais um registo de incidente pode ser alinhado entre jurisdições; a base dos nomes de campos de
  registo de incidentes nas bibliotecas de modelos.
  `https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/towards-a-common-reporting-framework-for-ai-incidents_8c488fdb/f326d4ac-en.pdf`
  (verificado: primário) (audiência: gobernanza, ingeniería; jurisdicción: global)
- **"Definição de incidentes de IA e termos relacionados" (OECD.AI)**: o vocabulário partilhado de
  incidente de IA, perigo de IA e suas variantes graves.
  `https://oecd.ai/en/wonk/defining-ai-incidents-and-hazards` (verificado: primário) (audiência:
  gobernanza, legal; jurisdicción: global)

## Orientação, códigos e legislação adjacente da UE

- **Orientações da Comissão sobre a definição de um sistema de IA**: o teste operativo da UE para
  âmbito: os sete elementos, o limite baixo de autonomia e as famílias de software excluídas.
  `https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application`
  (verificado: primário) (audiência: legal, gobernanza, ingeniería; jurisdicción: UE)
- **Orientações da Comissão sobre o âmbito das obrigações dos prestadores de modelos de IA de finalidade geral**:
  os critérios de computação para modelos GPAI, quando o ajuste fino ou modificação de um modelo o
  torna seu prestador, e o teste de monetização de código aberto.
  `https://digital-strategy.ec.europa.eu/en/library/guidelines-scope-obligations-providers-general-purpose-ai-models-under-ai-act`
  (verificado: primário) (audiência: legal, ingeniería; jurisdicción: UE)
- **Projeto de orientações da Comissão sobre a classificação de sistemas de IA de risco elevado**:
  exemplos práticos para o Art. 6 e o filtro do Art. 6(3); ainda um projeto em 2026-09-24.
  `https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems`
  (verificado: primário) (audiência: legal, gobernanza; jurisdicción: UE)
- **Literacia em IA: Perguntas e Respostas (Comissão Europeia)**: a leitura própria da Comissão do
  Artigo 4 após o Omnibus: nenhum certificado obrigatório, registos internos, e quem conta como
  "outras pessoas". `https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers`
  (verificado: primário) (audiência: gobernanza, liderança; jurisdicción: UE)
- **Código de Prática sobre Transparência de Conteúdo Gerado por IA**: a rota voluntária para os
  deveres de marcação e etiquetagem do Art. 50.
  `https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content`
  (verificado: primário) (audiência: ingeniería, legal; jurisdicción: UE)
- **Modelo de notificação de incidente grave de GPAI (Comissão Europeia, 4 de novembro de 2025)**:
  os campos que um relatório de incidente grave de GPAI contém, incluindo análise de causa raiz e
  padrões de quase-acidentes.
  `https://digital-strategy.ec.europa.eu/en/library/ai-act-commission-publishes-reporting-template-serious-incidents-involving-general-purpose-ai`
  (verificado: primário) (audiência: gobernanza, ingeniería; jurisdicción: UE)
- **Cláusulas contratuais de modelo de IA da UE atualizadas (MCC-AI)**: o texto de contrato de
  referência para compra de IA, numa versão de risco elevado e numa versão leve, com comentário;
  utilizável além da contratação pública.
  `https://public-buyers-community.ec.europa.eu/communities/procurement-ai/resources/updated-eu-ai-model-contractual-clauses`
  (verificado: primário) (audiência: legal, gobernanza; jurisdicción: UE)
- **Parecer 28/2024 do EDPB sobre certos aspetos de proteção de dados relacionados com o tratamento de dados pessoais no contexto de modelos de IA**:
  a referência das autoridades de proteção de dados da UE sobre anonimato de modelos, interesse
  legítimo para IA e o que treino ilegal significa para responsáveis pela implantação.
  `https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-282024-on-certain-data-protection-aspects-related-to_en`
  (verificado: primário) (audiência: legal, gobernanza; jurisdicción: UE)
- **Orientações 05/2021 do EDPB sobre a interação entre o Artigo 3 e o Capítulo V do RGPD**: os três
  critérios que decidem se uma chamada de inferência remota ou um acesso de suporte é uma
  transferência internacional.
  `https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf`
  (verificado: primário) (audiência: legal; jurisdicción: UE)
- **CNIL, "Garantir e facilitar o exercício dos direitos dos titulares dos dados" (folha de instruções de IA)**:
  o texto regulador mais prático sobre direitos contra modelos treinados: retreinamento, filtros de
  saída e seus limites.
  `https://www.cnil.fr/en/ensuring-and-facilitating-exercise-data-subjects-rights` (verificado:
  primário) (audiência: legal, ingeniería; jurisdicción: UE, França)
- **CNIL, "Confiar na base legal de interesse legítimo para desenvolver um sistema de IA"**: um
  teste de ponderação passo a passo e as salvaguardas adicionais para treino de IA.
  `https://www.cnil.fr/en/relying-legal-basis-legitimate-interests-develop-ai-system` (verificado:
  primário) (audiência: legal; jurisdicción: UE, França)
- **Orientação da AEPD sobre IA agéntica de uma perspetiva de proteção de dados (comunicado de imprensa)**:
  uma análise de um regulador de agentes: autonomia, memória, ameaças e medidas do responsável; em
  espanhol.
  `https://www.aepd.es/prensa-y-comunicacion/notas-de-prensa/la-agencia-publica-unas-orientaciones-sobre-inteligencia`
  (verificado: primário) (audiência: legal, ingeniería; jurisdicción: UE, Espanha)
- **DPA de Hamburgo, "Documento de Discussão: Modelos de Linguagem Grande e Dados Pessoais"**: a
  visão de que LLMs não armazenam dados pessoais; leia-o ao lado do parecer do EDPB.
  `https://datenschutz-hamburg.de/fileadmin/user_upload/HmbBfDI/Datenschutz/Informationen/240715_Discussion_Paper_Hamburg_DPA_KI_Models.pdf`
  (verificado: primário) (audiência: legal; jurisdicción: UE, Alemanha)
- **Guias AESIA da caixa de testes regulatória espanhola**: dezasseis guias não vinculativos com
  listas de verificação para os requisitos de risco elevado da UE, produzidos numa caixa de testes
  regulatória; em espanhol. `https://aesia.digital.gob.es/es/guias` (verificado: primário)
  (audiência: gobernanza, ingeniería; jurisdicción: UE, Espanha)
- **Diretiva (UE) 2024/2853 sobre responsabilidade por produtos defeituosos**: o texto que torna o
  software um produto, estabelece deveres de divulgação e presunções, e vincula a responsabilidade a
  atualizações. `https://eur-lex.europa.eu/eli/dir/2024/2853/oj` (verificado: primário) (audiência:
  legal, liderança; jurisdicción: UE)

## Orientação governamental e reguladora além da UE

- **NIST AI 600-1, Perfil de Inteligência Artificial Generativa**: doze riscos que a IA generativa
  cria ou agrava, com ações sugeridas alinhadas com subcategorias do AI RMF, utilizáveis como nomes
  de suite de avaliação. `https://doi.org/10.6028/NIST.AI.600-1` (verificado: primário) (audiência:
  gobernanza, ingeniería; jurisdicción: US)
- **Livro de Jogadas do NIST AI RMF**: ações sugeridas e questões de documentação por subcategoria;
  as questões de documentação fazem bons critérios de aceitação para controlos.
  `https://airc.nist.gov/airmf-resources/playbook/govern/` (verificado: primário) (audiência:
  gobernanza, ingeniería; jurisdicción: US)
- **Livro de Jogadas do NIST AI RMF: MANAGE**: monitorização pós-implantação, risco de terceiros e
  desativação, subcategoria por subcategoria.
  `https://airc.nist.gov/airmf-resources/playbook/manage/` (verificado: primário) (audiência:
  gobernanza, ingeniería; jurisdicción: US)
- **Correspondência: AI RMF (1.0) e ISO/IEC FDIS 23894 (NIST, 2023)**: um mapa de duas páginas das
  quatro funções do AI RMF para cláusulas ISO/IEC 23894; a forma mais rápida de ver que descrevem um
  processo.
  `https://www.nist.gov/system/files/documents/2023/01/26/crosswalk_AI_RMF_1_0_ISO_IEC_23894.pdf`
  (verificado: primário) (audiência: gobernanza; jurisdicción: US)
- **NIST SP 1270, "Rumo a um Padrão para Identificar e Gerir Enviesamento em Inteligência Artificial"**:
  o mapa mais curto e autorizado de onde vem o enviesamento de IA (sistémico, estatístico, humano).
  `https://doi.org/10.6028/NIST.SP.1270` (verificado: primário) (audiência: ingeniería, gobernanza;
  jurisdicción: US)
- **NIST IR 8312, "Quatro Princípios de Inteligência Artificial Explicável"**: quatro princípios,
  incluindo precisão de explicação e limites de conhecimento, que se traduzem em critérios de
  avaliação para explicações. `https://doi.org/10.6028/NIST.IR.8312` (verificado: primário)
  (audiência: ingeniería, investigação; jurisdicción: US)
- **NIST AI 100-2 E2025, "Aprendizagem Automática Adversarial: Uma Taxonomia e Terminologia de Ataques e Mitigações"**:
  o vocabulário partilhado de ataques em IA preditiva e generativa que planos de equipa vermelha e
  modelos de ameaça podem citar. `https://doi.org/10.6028/NIST.AI.100-2e2025` (verificado: primário)
  (audiência: ingeniería, investigação; jurisdicción: US)
- **NIST SP 800-61 Rev. 3, "Recomendações de Resposta a Incidentes e Considerações para Gestão de Risco de Cibersegurança"**:
  resposta a incidentes reformulada em torno das funções CSF 2.0; a base que o ciclo de vida
  específico de IA adapta. `https://csrc.nist.gov/pubs/sp/800/61/r3/final` (verificado: primário)
  (audiência: ingeniería, gobernanza; jurisdicción: US)
- **NIST SP 800-226, "Orientações para Avaliar Garantias de Privacidade Diferencial"**: como avaliar
  uma alegação de privacidade diferencial e os perigos que a quebram na prática.
  `https://csrc.nist.gov/pubs/sp/800/226/final` (verificado: primário) (audiência: ingeniería,
  legal; jurisdicción: US)
- **Memorando OMB M-25-21**: a definição federal dos EUA de IA de alto impacto, suas práticas
  mínimas e um modelo público para os deveres de um Diretor de IA e um conselho de gobernanza de IA.
  `https://www.whitehouse.gov/wp-content/uploads/2025/02/M-25-21-Accelerating-Federal-Use-of-AI-through-Innovation-Governance-and-Public-Trust.pdf`
  (verificado: primário) (audiência: gobernanza, liderança; jurisdicción: US)
- **SR 26-2, Orientação Revista sobre Gestão de Risco de Modelo (Banco da Reserva Federal, OCC, FDIC)**:
  substitui SR 11-7; desafio efetivo e validação, adaptados ao perfil de risco, com IA generativa e
  agéntica explicitamente fora do âmbito.
  `https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm` (verificado: primário)
  (audiência: gobernanza, legal; jurisdicción: US)
- **Circular 2022-03 da CFPB: ação adversa e algoritmos complexos**: por que a complexidade do
  modelo não desculpa razões de ação adversa imprecisas; revogada pela CFPB em 12 de maio de 2025,
  enquanto o dever da Regulação B que interpretava permanece.
  `https://www.consumerfinance.gov/compliance/circulars/circular-2022-03-adverse-action-notification-requirements-in-connection-with-credit-decisions-based-on-complex-algorithms/`
  (verificado: primário) (audiência: legal, engenharia; jurisdição: EUA)
- **Boletim Modelo da NAIC: Utilização de Sistemas de IA por Seguradoras**: um modelo escrito por
  regulador para um programa de governação da IA numa indústria regulada, incluindo IA de terceiros.
  `https://content.naic.org/sites/default/files/inline-files/2023-12-4%20Model%20Bulletin_Adopted_0.pdf`
  (verificado: primário) (audiência: governação, legal; jurisdição: EUA)
- **Direitos de Autor e Inteligência Artificial (Escritório de Direitos de Autor dos EUA)**: a
  posição do Escritório sobre autoria de resultados de IA e sobre treino, com a orientação de
  registo. `https://copyright.gov/ai/` (verificado: primário) (audiência: legal; jurisdição: EUA)
- **ICO, Orientação sobre IA e proteção de dados**: a perspetiva do Reino Unido sobre legalidade,
  inferências, equidade e direitos individuais em IA; em revisão após a Lei de Dados (Utilização e
  Acesso) a partir de 2026-09-24.
  `https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/`
  (verificado: primário) (audiência: legal, governação; jurisdição: Reino Unido)
- **ICO e The Alan Turing Institute, "Explicar decisões tomadas com IA"**: seis tipos de explicação
  e um método tarefa-por-tarefa para explicar decisões de IA a pessoas afetadas; em revisão a partir
  de 2026-09-24.
  `https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/explaining-decisions-made-with-artificial-intelligence/`
  (verificado: primário) (audiência: engenharia, legal; jurisdição: Reino Unido)
- **Compreensão Geral sobre IA e Direitos de Autor no Japão (Escritório de Direitos de Autor do Japão)**:
  uma leitura oficial breve do Artigo 30-4 que mostra onde termina a exceção de treino japonesa.
  `https://www.bunka.go.jp/english/policy/copyright/pdf/94055801_01.pdf` (verificado: primário)
  (audiência: legal; jurisdição: Japão)
- **Diretiva sobre Tomada de Decisão Automatizada (Secretariado do Conselho do Tesouro do Canadá)**:
  um regime de avaliação de impacto maduro e publicado com requisitos dimensionados por nível de
  impacto. `https://www.tbs-sct.canada.ca/pol/doc-eng.aspx?id=32592` (verificado: primário)
  (audiência: governação, legal; jurisdição: Canadá)
- **Modelo de Estrutura de Governação da IA para IA Agente, v1.5 (IMDA)**: uma estrutura
  governamental para agentes organizada em quatro dimensões práticas, desde limitar risco até
  responsabilidade do utilizador final.
  `https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf`
  (verificado: primário) (audiência: governação, engenharia; jurisdição: Singapura)
- **Lei Básica de IA da Coreia e Decreto de Execução (Centro de Informação de Legislação Coreana)**:
  o texto primário da lei horizontal de IA não-UE com mais deveres de operador; o decreto contém os
  limiares; em coreano. `https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268543` (verificado: primário)
  (audiência: legal; jurisdição: Coreia do Sul)

## Estruturas de segurança de fronteira (compromissos próprios dos laboratórios)

- **Política de Dimensionamento Responsável da Anthropic**: a estrutura de segurança de fronteira
  própria da Anthropic de limiares de capacidade e salvaguardas obrigatórias; a página indica versão
  3.4, efetiva em 8 de julho de 2026. `https://www.anthropic.com/responsible-scaling-policy`
  (verificado: primário) (audiência: governação, investigação; jurisdição: global)
- **Estrutura de Preparação da OpenAI**: a estrutura própria da OpenAI para rastrear e preparar-se
  para capacidades de fronteira que poderiam causar dano grave; o documento indica Versão 2, última
  atualização em 15 de abril de 2025.
  `https://cdn.openai.com/pdf/18a02b5d-6b67-4cec-ab64-68cdfbddebcd/preparedness-framework-v2.pdf`
  (verificado: primário) (audiência: governação, investigação; jurisdição: global)
- **Estrutura de Segurança de Fronteira do Google DeepMind**: a estrutura própria do DeepMind de
  níveis de capacidade crítica e mitigações; a página indica versão 3.1, atualizada em 17 de abril
  de 2026. `https://deepmind.google/discover/blog/strengthening-our-frontier-safety-framework/`
  (verificado: primário) (audiência: governação, investigação; jurisdição: global)

## Artigos (evidência legível por máquina e governação de agentes)

- **"Tornar Evidência de Conformidade de IA Legível por Máquina" (arXiv 2604.13767)**: estende
  `OSCAL` para IA e argumenta que estruturas especificam *o quê* assegurar mas nenhum *como*
  executável. `https://arxiv.org/html/2604.13767v1` (verificado: primário) (audiência: engenharia,
  investigação; jurisdição: global)
- **"Auditoria como código" (Frontiers in AI)**: uma pontuação de prontidão assegurada com portas de
  proceder/remediar/bloquear; resultado de auditoria como artefato de construção.
  `https://pubmed.ncbi.nlm.nih.gov/41837238/` (verificado: primário) (audiência: engenharia,
  investigação; jurisdição: global)
- **Fichas de Política (arXiv 2510.24383)**: artefatos de governação em tempo de execução legíveis
  por máquina em esquema JSON para agentes. `https://arxiv.org/abs/2510.24383` (verificado:
  primário) (audiência: engenharia, investigação; jurisdição: global)
- **TAIP (arXiv 2603.03340)**: trata resultados de NIST TEVV como objetos de garantia de IA.
  `https://arxiv.org/abs/2603.03340` (verificado: primário) (audiência: engenharia, investigação;
  jurisdição: global)
- **AI Trust OS (arXiv 2604.04749)**: um enquadramento de sistema operativo para confiança e
  garantia contínua de IA. `https://arxiv.org/abs/2604.04749` (verificado: primário) (audiência:
  engenharia, investigação; jurisdição: global)
- **AAGATE (arXiv 2510.25863)**: um design de plataforma de governação de agentes alinhado com NIST
  AI RMF. `https://arxiv.org/abs/2510.25863` (verificado: primário) (audiência: engenharia,
  investigação; jurisdição: global)
- **"Rumo ao Desenvolvimento de IA Confiável: Mecanismos para Apoiar Afirmações Verificáveis" (Brundage et al., 2020)**:
  mecanismos institucionais, de software e de hardware que transformam a afirmação de um programador
  em algo que um terceiro pode verificar; o argumento por trás de evidência sobre afirmação.
  `https://arxiv.org/abs/2004.07213` (verificado: primário) (audiência: governação, investigação;
  jurisdição: global)
- **"Práticas para Governar Sistemas de IA Agente" (Shavit et al., OpenAI, 2023)**: uma definição de
  sistemas agentes, as partes no seu ciclo de vida e práticas de base como limitar o espaço de ação,
  legibilidade de atividade e capacidade de interrupção.
  `https://cdn.openai.com/papers/practices-for-governing-agentic-ai-systems.pdf` (verificado:
  primário) (audiência: engenharia, governação; jurisdição: global)
- **"Visibilidade em Agentes de IA" (Chan et al., 2024)**: identificadores de agentes, monitorização
  em tempo real e registo de atividade como as três medidas que tornam agentes implantados visíveis.
  `https://arxiv.org/abs/2401.13138` (verificado: primário) (audiência: engenharia, governação;
  jurisdição: global)

## Artigos canónicos: documentação, auditoria e responsabilidade

- **"Folhas de Dados para Conjuntos de Dados" (Gebru et al.)**: a origem da documentação estruturada
  de conjuntos de dados; a metade legível por humanos de um registo de admissão de conjunto de
  dados. `https://arxiv.org/abs/1803.09010` (verificado: primário) (audiência: engenharia,
  investigação; jurisdição: global)
- **"Fichas de Modelo para Relatório de Modelo" (Mitchell et al., 2018)**: uso previsto e avaliação
  entre grupos e condições, relatados ao lado do modelo; o modelo por trás de cada ficha de modelo
  desde então. `https://arxiv.org/abs/1810.03993` (verificado: primário) (audiência: engenharia,
  governação; jurisdição: global)
- **"Fechar a Lacuna de Responsabilidade de IA: Definir uma Estrutura de Ponta a Ponta para Auditoria Algorítmica Interna" (Raji et al., 2020)**:
  uma auditoria interna executada em paralelo com o desenvolvimento, etapa por etapa, com um
  artefato documentado em cada passo. `https://arxiv.org/abs/2001.00973` (verificado: primário)
  (audiência: governação, engenharia; jurisdição: global)
- **"Auditoria Acionável" (Raji e Buolamwini, 2019)**: o que aconteceu após nomear publicamente as
  lacunas de desempenho de sistemas comerciais; evidência de que auditorias externas movem
  fornecedores. `https://doi.org/10.1145/3306618.3314244` (verificado: primário) (audiência:
  governação, investigação; jurisdição: global)
- **"Auditar modelos de linguagem grande: uma abordagem de três camadas" (Mökander et al., 2023)**:
  auditorias de governação, modelo e aplicação como três camadas complementares.
  `https://arxiv.org/abs/2302.08500` (verificado: primário) (audiência: governação, investigação;
  jurisdição: global)
- **"O Gradiente de Lançamento de IA Generativa" (Irene Solaiman, 2023)**: um vocabulário para
  decisões de lançamento, de completamente fechado a completamente aberto.
  `https://arxiv.org/abs/2302.04844` (verificado: primário) (audiência: governação, liderança;
  jurisdição: global)
- **"Como a máquina 'pensa': Compreender opacidade em algoritmos de aprendizagem automática" (Burrell, 2016)**:
  três fontes de opacidade, cada uma necessitando de uma correção diferente.
  `https://doi.org/10.1177/2053951715622512` (verificado: primário) (audiência: governação,
  investigação; jurisdição: global)
- **"Equidade e Abstração em Sistemas Sociotécnicos" (Selbst et al., 2019)**: cinco armadilhas em
  que uma intervenção técnica de equidade cai quando abstrai o contexto social.
  `https://doi.org/10.1145/3287560.3287598` (verificado: primário) (audiência: engenharia,
  investigação; jurisdição: global)
- **"Sobre os Perigos dos Papagaios Estocásticos" (Bender, Gebru et al., 2021)**: os custos e riscos
  de modelos de linguagem cada vez maiores, desde dados de treino não documentados até custo
  ambiental. `https://doi.org/10.1145/3442188.3445922` (verificado: primário) (audiência:
  investigação, liderança; jurisdição: global)
- **"Riscos Éticos e Sociais de Dano de Modelos de Linguagem" (Weidinger et al., 2021)**: uma
  taxonomia estruturada de danos de modelo de linguagem, uma lista de partida pronta para um registo
  de risco. `https://arxiv.org/abs/2112.04359` (verificado: primário) (audiência: governação,
  investigação; jurisdição: global)
- **"Problemas Concretos em Segurança de IA" (Amodei et al., 2016)**: cinco modos de falha prática
  (efeitos colaterais, exploração de recompensa, supervisão, exploração segura, mudança
  distribucional) enunciados como problemas de engenharia. `https://arxiv.org/abs/1606.06565`
  (verificado: primário) (audiência: engenharia, investigação; jurisdição: global)

## Artigos canónicos: medição, equidade e avaliação

- **"Sombras de Género: Disparidades de Precisão Interseccional em Classificação de Género Comercial" (Buolamwini e Gebru, 2018)**:
  a auditoria que tornou a avaliação desagregada e interseccional a norma.
  `https://proceedings.mlr.press/v81/buolamwini18a.html` (verificado: primário) (audiência:
  engenharia, investigação; jurisdição: global)
- **"Dissecando viés racial num algoritmo usado para gerir a saúde de populações" (Obermeyer et al., Science, 2019)**:
  a falha canónica de rótulo substituto: um modelo preciso em custo e enviesado em necessidade; a
  razão pela qual uma ficha de modelo deve indicar o construto.
  `https://doi.org/10.1126/science.aax2342` (verificado: primário) (audiência: engenharia,
  governação; jurisdição: EUA)
- **"Disparidades raciais no reconhecimento de fala automatizado" (Koenecke et al., PNAS, 2020)**:
  por que uma média esconde um serviço pior de um grupo; o argumento para avaliações desagregadas.
  `https://doi.org/10.1073/pnas.1915768117` (verificado: primário) (audiência: engenharia,
  investigação; jurisdição: EUA)
- **"Compromissos Inerentes na Determinação Justa de Pontuações de Risco" (Kleinberg, Mullainathan e Raghavan)**:
  o resultado de impossibilidade que torna a escolha de métrica de equidade uma decisão de
  governação em vez de uma técnica. `https://arxiv.org/abs/1609.05807` (verificado: primário)
  (audiência: governação, investigação; jurisdição: global)
- **"Parar de Explicar Modelos de Aprendizagem Automática de Caixa Negra para Decisões de Alto Risco e Usar Modelos Interpretáveis em Vez Disso" (Rudin)**:
  o caso para modelos interpretáveis por design em decisões de alto risco.
  `https://arxiv.org/abs/1811.10154` (verificado: primário) (audiência: engenharia, governação;
  jurisdição: global)
- **"O Mito da Interpretabilidade de Modelo" (Lipton, 2016)**: por que "interpretável" nomeia várias
  propriedades diferentes, e qual delas um requisito deve pedir. `https://arxiv.org/abs/1606.03490`
  (verificado: primário) (audiência: engenharia, investigação; jurisdição: global)
- **«On Calibration of Modern Neural Networks» (Guo et al., 2017)**: por que uma pontuação de modelo
  não é uma probabilidade até que a calibração seja medida. `https://arxiv.org/abs/1706.04599`
  (verificado: primário) (público: engenharia, investigação; jurisdição: global)
- **«A Gentle Introduction to Conformal Prediction and Distribution-Free Uncertainty Quantification» (Angelopoulos and Bates)**:
  uma forma prática e livre de distribuição de converter pontuações em conjuntos com garantia de
  cobertura. `https://arxiv.org/abs/2107.07511` (verificado: primário) (público: engenharia,
  investigação; jurisdição: global)
- **«What's Wrong with Risk Matrices?» (L. A. Cox Jr., Risk Analysis, 2008)**: a crítica padrão das
  matrizes de probabilidade por severidade e por que é necessária uma faixa catastrófica.
  `https://doi.org/10.1111/j.1539-6924.2008.01030.x` (verificado: primário) (público: governação,
  investigação; jurisdição: global)
- **«Adding Error Bars to Evals» (Evan Miller, 2024)**: avaliações tratadas como experiências: erros
  padrão, comparação de modelos e planeamento do tamanho da amostra para gates de avaliação.
  `https://arxiv.org/abs/2411.00640` (verificado: primário) (público: engenharia, investigação;
  jurisdição: global)
- **«Holistic Evaluation of Language Models» (Liang et al., 2022)**: muitas métricas em muitos
  cenários, reportadas em conjunto, em vez de um único número de classificação.
  `https://arxiv.org/abs/2211.09110` (verificado: primário) (público: engenharia, investigação;
  jurisdição: global)
- **«Model evaluation for extreme risks» (Shevlane et al., 2023)**: avaliações de capacidades
  perigosas e alinhamento como entradas para decisões de treino, implantação e segurança.
  `https://arxiv.org/abs/2305.15324` (verificado: primário) (público: governação, investigação;
  jurisdição: global)
- **«Red Teaming Language Models with Language Models» (Perez et al., 2022)**: red teaming
  automatizado, um modelo gerando casos de teste para outro. `https://arxiv.org/abs/2202.03286`
  (verificado: primário) (público: engenharia, investigação; jurisdição: global)
- **«Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection» (Greshake et al., 2023)**:
  o artigo que nomeou injeção indireta de prompts, a ameaça central aos agentes que leem conteúdo
  não confiável. `https://arxiv.org/abs/2302.12173` (verificado: primário) (público: engenharia,
  investigação; jurisdição: global)
- **«Extracting Training Data from Large Language Models» (Carlini et al.)**: a demonstração
  canónica de que os modelos de linguagem regurgitam dados de treino, e por que as avaliações de
  extração pertencem ao gate. `https://arxiv.org/abs/2012.07805` (verificado: primário) (público:
  engenharia, legal; jurisdição: global)
- **«Power Hungry Processing: Watts Driving the Cost of AI Deployment?» (Luccioni, Jernite, Strubell)**:
  mede a lacuna de energia de inferência entre modelos generativos de uso geral e específicos de
  tarefas. `https://arxiv.org/abs/2311.16863` (verificado: primário) (público: engenharia,
  liderança; jurisdição: global)
- **«The Leaderboard Illusion» (Singh et al., 2025)**: por que uma classificação pública não pode
  decidir uma escolha de modelo. `https://arxiv.org/abs/2504.20879` (verificado: primário) (público:
  engenharia, liderança; jurisdição: global)
- **«Hidden Technical Debt in Machine Learning Systems» (Sculley et al., NeurIPS 2015)**: por que o
  modelo é a pequena caixa num sistema ML de produção, e onde a dívida se acumula à sua volta.
  `https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html`
  (verificado: primário) (público: engenharia; jurisdição: global)

## Relatórios (o mercado e a profissão)

- **IAPP AI Governance Profession Report 2025 (with Credo AI)**: onde a função se situa e como é
  constituída; o censo de base da profissão.
  `https://iapp.org/resources/article/ai-governance-profession-report/` (verificado: primário)
  (público: liderança, governação; jurisdição: global)
- **IAPP Salary & Jobs Report 2025-26**: as faixas salariais que ancoram o capítulo 06, incluindo o
  prémio técnico de governação de IA. `https://iapp.org/resources/article/salary-survey-summary/`
  (verificado: primário) (público: liderança, governação; jurisdição: global)
- **IAPP AI Governance Vendor Report 2026**: as quatro categorias de prestadores e a afirmação de
  que a governação de IA «não é uma única função, disciplina ou tecnologia».
  `https://iapp.org/resources/article/ai-governance-vendor-report` (verificado: primário) (público:
  governação, liderança; jurisdição: global)
- **State of GRC 2026**: o inquérito aos profissionais por trás da realidade de que «a folha de
  cálculo é ainda a ferramenta GRC número 1» contra a qual a disciplina reage.
  `https://grcengineer.com/report/` (verificado: primário) (público: governação; jurisdição: global)
- **«Global AI Regulations Fuel Billion-Dollar Market for AI Governance Platforms» (Gartner)**: o
  enquadramento próprio do analista da categoria de plataforma, incluindo aplicação de política em
  tempo de execução, e a sua previsão de despesa.
  `https://www.gartner.com/en/newsroom/press-releases/2026-02-17-gartner-global-ai-regulations-fuel-billion-dollar-market-for-ai-governance-platforms`
  (verificado: primário) (público: liderança; jurisdição: global)
- **Gartner Magic Quadrant for AI Governance Platforms, June 2026 (via IBM)**: o relato de um
  prestador nomeado do primeiro MQ para a categoria; o próprio relatório é licenciado, portanto leia
  isto como um resumo de um prestador.
  `https://www.ibm.com/new/announcements/ibm-recognized-as-a-leader-in-gartner-magic-quadrant-for-ai-governance-platforms`
  (verificado: secundário) (público: liderança; jurisdição: global)
- **HiddenLayer 2026 AI Threat Landscape Report**: o inquérito de um prestador de segurança e a
  fonte da descoberta «uma em cada oito violações foram agênticas»; leia-o como um inquérito de um
  prestador. `https://www.hiddenlayer.com/report-and-guide/threatreport2026` (verificado: primário)
  (público: engenharia, liderança; jurisdição: global)
- **International AI Safety Report 2026**: a segunda edição (3 de fevereiro de 2026) da avaliação
  científica de capacidades de IA de finalidade geral, riscos e gestão de riscos, presidida por
  Yoshua Bengio e apoiada por mais de 30 países e organizações internacionais.
  `https://internationalaisafetyreport.org/publication/international-ai-safety-report-2026`
  (verificado: primário) (público: liderança, investigação, governação; jurisdição: global)
- **The 2026 AI Index Report (Stanford HAI)**: o registo de dados anual de IA em investigação,
  desempenho técnico, IA responsável, economia, política e opinião pública; o lugar para verificar
  uma tendência antes de a citar. `https://hai.stanford.edu/ai-index/2026-ai-index-report`
  (verificado: primário) (público: liderança, investigação; jurisdição: global)

## Repositórios de incidentes e riscos (o registo empírico)

- **AI Incident Database**: o catálogo da Responsible AI Collaborative de danos e quase-danos reais
  de IA; um corpus de referência para modelação de ameaças e acompanhamento pós-comercialização.
  `https://incidentdatabase.ai/` (verificado: primário) (público: governação, engenharia,
  investigação; jurisdição: global)
- **AIAAIC Repository**: um registo independente e aberto de incidentes e controvérsias de IA,
  algoritmos e automação em todos os setores. `https://www.aiaaic.org/aiaaic-repository`
  (verificado: primário) (público: governação, investigação; jurisdição: global)
- **OECD.AI Incidents & Hazards Monitor (AIM)**: o monitor em direto da OCDE de incidentes e perigos
  de IA extraídos dos meios de comunicação global, construído para informar a política.
  `https://oecd.ai/en/incidents` (verificado: primário) (público: governação, liderança; jurisdição:
  global)
- **AI Vulnerability Database (AVID)**: a base de conhecimento aberta da AI Risk and Vulnerability
  Alliance de modos de falha para sistemas de IA de finalidade geral. `https://avidml.org/`
  (verificado: primário) (público: engenharia, investigação; jurisdição: global)
- **MIT AI Risk Repository**: a base de dados viva do MIT FutureTech de mais de 1700 riscos de IA
  classificados em 65 estruturas; uma taxonomia para admissão e escalões de risco.
  `https://airisk.mit.edu/` (verificado: primário) (público: governação, investigação; jurisdição:
  global)
- **NJCM et al. v. The State of the Netherlands (SyRI), The Hague District Court, 5 Feb 2020**: um
  tribunal anulando um sistema de pontuação de risco porque não era suficientemente transparente e
  verificável para ser ponderado.
  `https://uitspraken.rechtspraak.nl/details?id=ECLI:NL:RBDHA:2020:1878` (verificado: primário)
  (público: legal, governação; jurisdição: UE, Países Baixos)
- **«Xenophobic machines» (Amnesty International, 2021)**: o relato público mais completo de como um
  indicador de nacionalidade entrou no sistema de risco de prestações de cuidados infantis holandês.
  `https://www.amnesty.org/en/documents/eur35/4686/2021/en/` (verificado: primário) (público:
  governação, legal; jurisdição: UE, Países Baixos)

## Prática de engenharia e garantia

- **The IIA's Three Lines Model (2020)**: a divisão entre órgão de governação, primeira e segunda
  linhas da gestão e auditoria interna independente, que um programa de governação de IA tem de
  mapear, incluindo quem aceita o risco residual.
  `https://www.theiia.org/en/content/position-papers/2020/the-iias-three-lines-model-an-update-of-the-three-lines-of-defense/`
  (verificado: primário) (público: governação, liderança; jurisdição: global)
- **«Postmortem Culture: Learning from Failure» (Google SRE book)**: o texto de referência para
  post-mortems sem culpa e para definir gatilhos de post-mortem com antecedência, que as revisões de
  incidentes e quase-acidentes de IA devem adotar. `https://sre.google/sre-book/postmortem-culture/`
  (verificado: primário) (público: engenharia, governação; jurisdição: global)
- **«Canarying Releases» (The Site Reliability Workbook, Google)**: a base de engenharia para
  entrega progressiva como um controlo de governação.
  `https://sre.google/workbook/canarying-releases/` (verificado: primário) (público: engenharia;
  jurisdição: global)
- **Fairlearn user guide, «Fairness in machine learning»**: uma introdução prática aos danos de
  alocação e qualidade de serviço e às métricas de disparidade, com exemplos executáveis.
  `https://fairlearn.org/main/user_guide/fairness_in_machine_learning.html` (verificado: primário)
  (público: engenharia; jurisdição: global)
- **«Responsible Sourcing of Data Enrichment Services» (Partnership on AI)**: orientação prática
  sobre condições de anotadores (pilotos, instruções, remuneração, comunicação, garantia de
  qualidade), o lado laboral da governação de dados.
  `https://partnershiponai.org/paper/responsible-sourcing-considerations/` (verificado: primário)
  (público: governação, liderança; jurisdição: global)
- **JSON Schema Draft 2020-12**: a especificação em que a biblioteca de modelos é escrita; qualquer
  validador conforme verifica os registos. `https://json-schema.org/draft/2020-12` (verificado:
  primário) (público: engenharia; jurisdição: global)

## Ferramentas (categorias ilustrativas, não recomendações)

- **Inspect AI (UK AI Security Institute)**: um framework de avaliação aberto, o exemplo de
  referência para avaliações como evidência e gates de avaliação.
  `https://github.com/UKGovernmentBEIS/inspect_ai` (verificado: primário) (público: engenharia;
  jurisdição: global)
- **Awesome Responsible AI (AthenaCore)**: um índice amplo e mantido de recursos de IA responsável,
  confiável e centrada no ser humano abrangendo todas as camadas da stack.
  `https://github.com/AthenaCore/AwesomeResponsibleAI` (verificado: primário) (público: engenharia,
  governação; jurisdição: global)
- **Awesome Production Machine Learning (EthicalML)**: o índice de referência de bibliotecas de
  código aberto para implementar, monitorizar, versionar e escalar ML; o mapa de ferramentas para as
  camadas 02 e 04. `https://github.com/EthicalML/awesome-production-machine-learning` (verificado:
  primário) (público: engenharia; jurisdição: global)
- **awesome-opa (Open Policy Agent)**: o índice próprio do ecossistema OPA de ferramentas de
  política como código e integrações para a camada 01.
  `https://github.com/open-policy-agent/awesome-opa` (verificado: primário) (público: engenharia;
  jurisdição: global)
- **Awesome OSCAL (OSCAL Club)**: um índice curado de ferramentas e recursos OSCAL para a evidência
  legível por máquina da camada 05. `https://github.com/oscal-club/awesome-oscal` (verificado:
  primário) (público: engenharia, governação; jurisdição: global)
- **awesome-ml-security (Trail of Bits)**: um índice curado de recursos de segurança de aprendizagem
  automática alimentando o red teaming da camada 03 e os controlos em tempo de execução da
  camada 04. `https://github.com/trailofbits/awesome-ml-security` (verificado: primário) (público:
  engenharia; jurisdição: global)

## Livros

- **Fairness and Machine Learning: Limitations and Opportunities (Barocas, Hardt and Narayanan; MIT Press, 2023)**:
  o texto de referência sobre o que os critérios de equidade podem e não podem dizer; legível na
  íntegra online. `https://fairmlbook.org/` (verificado: primário) (público: engenharia,
  investigação; jurisdição: global)
- **Interpretable Machine Learning (Christoph Molnar)**: um guia prático para modelos interpretáveis
  e métodos de explicação post-hoc, com os seus limites; legível na íntegra online.
  `https://christophm.github.io/interpretable-ml-book/` (verificado: primário) (público: engenharia;
  jurisdição: global)
- **Patterns, Predictions, and Actions (Hardt and Recht; Princeton University Press)**: aprendizagem
  automática da previsão à ação, incluindo os conjuntos de dados e referências que o campo utiliza;
  uma pré-impressão completa está online. `https://mlstory.org/` (verificado: primário) (público:
  engenharia, investigação; jurisdição: global)
- **Introduction to AI Safety, Ethics and Society (Dan Hendrycks; Taylor & Francis, 2024)**: um
  manual abrangente sobre risco de IA, desde falhas de sistemas individuais até governação; legível
  online. `https://www.aisafetybook.com/` (verificado: primário) (público: governação, liderança,
  investigação; jurisdição: global)
- **The Algorithmic Foundations of Differential Privacy (Dwork and Roth, 2014)**: a referência
  formal por trás de cada afirmação sobre privacidade diferencial que um prestador faz.
  `https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf` (verificado: primário) (público:
  engenharia, investigação; jurisdição: global)
- **Site Reliability Engineering (Google)**: a disciplina operacional de que os controlos em tempo
  de execução, a resposta a incidentes e os orçamentos de erro se servem; legível na íntegra online.
  `https://sre.google/sre-book/table-of-contents/` (verificado: primário) (público: engenharia;
  jurisdição: global)
- **Designing Machine Learning Systems (Chip Huyen; O'Reilly, 2022)**: o ciclo de vida em produção
  dos sistemas de ML, desde os dados até à monitorização; ligado aqui através do repositório
  complementar do autor. `https://github.com/chiphuyen/dmls-book` (verificado: primário) (público:
  engenharia; jurisdição: global)
- **AI Engineering (Chip Huyen, 2025)**: construção de aplicações sobre modelos de fundação, com um
  tratamento extenso da avaliação; ligado aqui através do repositório complementar do autor.
  `https://github.com/chiphuyen/aie-book` (verificado: primário) (público: engenharia; jurisdição:
  global)
- **Responsible AI: Best Practices for Creating Trustworthy AI Systems (Lu, Zhu, Whittle and Xu; Addison-Wesley, 2023)**:
  o tratamento em extensão da equipa CSIRO de padrões de IA responsável e mecanismos de governação.
  `https://www.informit.com/store/responsible-ai-best-practices-for-creating-trustworthy-9780138073923`
  (verificado: primário) (público: engenharia, governação; jurisdição: global)

## Cursos

- **Elements of AI (University of Helsinki and MinnaLearn)**: cursos online gratuitos que introduzem
  IA a não especialistas; uma forma de iniciar o programa de literacia no domínio da IA que o Artigo
  4 solicita. `https://www.elementsofai.com/` (verificado: primário) (público: liderança,
  governação; jurisdição: global)
- **Practical Data Ethics (fast.ai)**: um curso ensinado pela primeira vez no Data Institute da
  University of San Francisco em 2020, sobre desinformação, enviesamento e equidade, privacidade e
  vigilância, e métricas. `https://ethics.fast.ai/` (verificado: primário) (público: engenharia,
  governação; jurisdição: global)
- **Made With ML (Goku Mohandas)**: um curso sobre conceção, desenvolvimento, implantação e iteração
  em ML em produção, o pipeline em que os controlos de governação se inserem.
  `https://madewithml.com/` (verificado: primário) (público: engenharia; jurisdição: global)
- **Frontier AI Governance (BlueDot Impact)**: um curso baseado em coortes sobre a política e
  governação da IA de fronteira. `https://bluedot.org/courses/ai-governance` (verificado: primário)
  (público: governação, liderança; jurisdição: global)
- **AI Safety, Ethics and Society virtual course (Center for AI Safety)**: o curso que segue o
  manual de Hendrycks acima. `https://www.aisafetybook.com/virtual-course` (verificado: primário)
  (público: governação, investigação; jurisdição: global)
- **Red Teaming LLM Applications (DeepLearning.AI, with Giskard)**: um curso breve e prático sobre
  como encontrar e programar falhas de aplicações LLM.
  `https://www.deeplearning.ai/courses/red-teaming-llm-applications` (verificado: primário)
  (público: engenharia; jurisdição: global)
- **Secure AI/ML-Driven Software Development, LFEL1012 (Linux Foundation)**: um curso breve e
  autónomo sobre a segurança do software construído com e em torno de IA.
  `https://training.linuxfoundation.org/express-learning/secure-ai-ml-driven-software-development-lfel1012/`
  (verificado: primário) (público: engenharia; jurisdição: global)
- **Machine Learning Crash Course: Fairness (Google for Developers)**: um módulo breve sobre tipos
  de enviesamento e sobre identificação, mitigação e avaliação do enviesamento.
  `https://developers.google.com/machine-learning/crash-course/fairness` (verificado: primário)
  (público: engenharia; jurisdição: global)

## Comunidades e boletins informativos

- **GRC Engineer (grcengineer.com)**: o centro da comunidade-mãe; a estrutura
  analista-versus-engenheiro e as definições de funções que este livro adapta.
  `https://grcengineer.com/` (verificado: primário) (público: governação, engenharia; jurisdição:
  global)
- **blog.grc.engineering, "GRC Engineering in 2026" (Justin Pagano)**: a perspetiva futura:
  guardrails de política como código em CI/CD, centros de operações de confiança, extensões agentes.
  `https://blog.grc.engineering/p/grc-engineering-in-2026` (verificado: primário) (público:
  governação, engenharia; jurisdição: global)
- **IAPP (iapp.org)**: o organismo profissional cujos relatórios, certificações e eventos mapeiam a
  profissão de governação de IA. `https://iapp.org/` (verificado: primário) (público: governação,
  legal, liderança; jurisdição: global)

**Correspondências:** este capítulo não faz nenhuma afirmação normativa; as normas e estruturas que
lista são tratadas na íntegra nos capítulos 04, 05, 07 e 08. Os mapeamentos noutras partes do livro
são ilustrativos, não uma afirmação de conformidade.

## Sources

The reading list is its own source set: each entry above carries its URL and a verification tag
inline, and every URL is recorded as a row in this chapter's section of `sources/SOURCES.md`. Items
whose URL could not be drawn from the research digest or verified for this edition were left out.
The v0.5.0 additions were checked on 2026-09-24: each URL answered, arXiv entries were matched
against the arXiv API and DOIs against Crossref.
