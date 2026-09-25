---
lang: pt
source: bok/patterns/training-data-rights-ledger.md
sourceHash: "9b631239e9232bef3b67a7cf72410a930581d03bdd7d48f616d6851aea3fd522"
translatedBy: "machine: claude-haiku-4-5-20251001"
translatedAt: "2026-09-25"
id: training-data-rights-ledger
title: Training-Data Rights Ledger
layer: 2
order: 20
summary: "Um registo por fonte do direito de treino: canal de aquisição, licença, verificação de exclusão e utilizações permitidas, ligado a linhagem para que cada modelo conheça as suas fontes."
---

# Padrão: Training-Data Rights Ledger

**Resumo:** Mantenha uma linha de registo por fonte de treino (não por dataset fundido) que registe
como os dados foram adquiridos, em que licença ou base legal, se as reservas de direitos foram
verificadas e como, e que utilizações são permitidas; depois ligue o registo à linhagem para que
cada versão de modelo liste as linhas em que foi treinada. O registo responde "tínhamos o direito de
usar isto?" por fonte, e "que modelos são afetados?" quando uma licença, uma exclusão ou uma ordem
muda a resposta.

## Objetivos
Faça do direito de treino um facto registado e consultável antes do treino, e mantenha-o verdadeiro
depois, para que uma retirada, um pedido de apagamento ou uma ordem judicial possam ser cumpridos
apenas para os modelos afetados, e provados.

## Utilizadores-alvo
Engenheiro de governação da IA, responsáveis pela aquisição e licenciamento de dados, curadores de
dados, conselho jurídico e de privacidade, equipa de plataforma ML.

## Partes interessadas afetadas
Titulares de direitos e editores, titulares de dados, prestadores de modelos e responsáveis pela
implantação a jusante, o Serviço para a IA e outras autoridades, tribunais e reguladores.

## Princípios relevantes
Instrumente a construção para produzir a sua própria prova; construa o controlo no ponto mais cedo
em que pode bloquear; comece a partir de um modo de falha ou dano nomeado.

## Contexto
Um prestador que treina ou ajusta modelos num misto de dados internos, corpora licenciados, datasets
abertos, conteúdo web rastreado e dados de utilizador, montados por diferentes equipas em diferentes
tempos. Os direitos ligam-se por fonte e por vezes por registo, mas o treino consome corpora
fundidos.

## Problema
As questões legais são decididas por fonte; a evidência é geralmente mantida, se é que é, por
projeto.

- **Forças.** Para conteúdo disponibilizado publicamente online, a exceção de mineração de texto e
  dados da UE aplica-se apenas quando o titular do direito não reservou os seus direitos "de forma
  apropriada, tal como por meios legíveis por máquina" (Diretiva DSM `Art. 4(3)`) [1], e um tribunal
  de Hamburgo decidiu em dezembro de 2025 que uma reserva escrita em termos de utilização em
  linguagem natural não cumpriu esse critério, com um recurso adicional permitido [2]. Um prestador
  de modelo de finalidade geral deve manter uma política de direitos de autor que identifique e
  cumpra tais reservas e deve publicar um resumo suficientemente detalhado do conteúdo de treino
  (`Art. 53(1)(c)` e `(d)`) [3]. Como os dados foram adquiridos importa tanto quanto a sua licença:
  em *Bartz v. Anthropic* o tribunal separou livros legalmente comprados e digitalizados de
  descarregamentos pirateados [4]. Os dados pessoais trazem limitação de finalidade e o teste de
  compatibilidade para processamento adicional (RGPD `Art. 5(1)(b)`, `Art. 6(4)`) [5].
- **Modo de falha.** Ninguém pode dizer que fontes treinaram que versão de modelo, ou em que termos.
  Uma única fonte não licenciada ou obtida ilicitamente contamina cada modelo treinado nela, e os
  remédios podem atingir o modelo em si: a ordem da FTC para Everalbum exigiu a eliminação de
  "quaisquer modelos ou algoritmos desenvolvidos no todo ou em parte usando" os dados utilizados
  ilicitamente [6]. Sem linhagem por fonte, a única resposta segura é eliminar tudo.

## Solução
Faça do registo o bilhete de admissão para cada fonte de treino, e faça a linhagem apontar de volta
para ele.

1. **Uma linha por fonte.** Registe o id e versão da fonte, o canal de aquisição (entrega
   licenciada, API, rastreio, carregamento de utilizador, sistema interno), o licenciador, a
   referência de licença e os seus termos para treino, utilização comercial e distribuição de
   modelos derivados, a base legal onde os dados são pessoais, e as utilizações permitidas. Para
   conteúdo rastreado, registe a identidade do rastreador, a janela e a verificação de reserva de
   direitos: o método (por exemplo `robots.txt` e metadados de página lidos no tempo de busca), o
   resultado e a data. Os deveres de governação de dados do Regulamento da IA da UE para sistemas de
   risco elevado nomeiam os mesmos factos: "processos de recolha de dados e a origem dos dados" e,
   para dados pessoais, "a finalidade original da recolha de dados" (`Art. 10(2)(b)`) [3].
2. **Porta na linha.** A construção de corpus e o
   [Dataset Admission Gate](/patterns/dataset-admission-gate) falham quando uma fonte não tem linha
   de registo, quando os seus termos não permitem a utilização declarada, ou quando a sua
   verificação de reserva está em falta ou desatualizada.
3. **Ligue o registo à linhagem.** Cada execução de treino regista as linhas de registo (id e
   versão) que leu, e o [AIBOM](/patterns/aibom) lista os datasets por versão. A linhagem para trás
   responde "o que treinou este modelo?"; a linhagem para a frente responde "que modelos usaram esta
   fonte?", que é a questão que uma retirada ou uma ordem faz.
4. **Gere as divulgações.** Construa o resumo de conteúdo de treino GPAI no modelo da Comissão
   (obrigatório sob `Art. 53(1)(d)`, aplicável a partir de 2 de agosto de 2025, com modelos já no
   mercado até 2 de agosto de 2027) [7] e a documentação AB 2013 da Califórnia (em vigor desde 1 de
   janeiro de 2026, incluindo fontes, informações pessoais e o uso de dados sintéticos) [8] como
   consultas sobre o registo, não como documentos escritos de memória.
5. **Trate a mudança como um evento.** Uma expiração ou retirada de licença, uma nova reserva, um
   pedido de apagamento ou uma ordem marca as linhas afetadas; a linhagem para a frente lista os
   modelos afetados; e a remediação (retreinar sem a fonte, reformar o modelo, ou uma decisão
   documentada de confiar noutra base) é registada contra as mesmas linhas com uma data e um
   aprovador.

O AI RMF pede políticas sobre riscos de terceiros, "incluindo riscos de violação de propriedade
intelectual de terceiros ou outros direitos" (GOVERN 6.1), e para mapear os riscos legais de
componentes, "incluindo o uso de dados ou software de terceiros" (MAP 4.1) [9].

Linha de registo ilustrativa para uma fonte rastreada:

```json
{
  "source_id": "src-crawl-techdocs-2026q2",
  "version": "2026-06-30",
  "acquisition_channel": "crawl",
  "crawl": { "user_agent": "corp-trainbot/2.1", "window": "2026-04-01/2026-06-30" },
  "legal_basis": { "copyright": "DSM Directive Art. 4 (commercial TDM exception)",
                   "personal_data": "GDPR Art. 6(1)(f); assessment LIA-2026-019" },
  "reservation_check": { "method": "robots.txt and page metadata at fetch time",
                         "result": "412 domains excluded", "checked_at": "2026-06-30" },
  "licence": { "ref": null, "training": "exception_relied_on", "derived_model_distribution": "permitted" },
  "permitted_uses": ["pre-training of the doc-lm model family"],
  "trained_models": ["doc-lm@1.4.0"],
  "owner": "data-acquisition-lead",
  "reviewed": "2026-09-15"
}
```

> **Exemplo (ilustrativo)** Um assistente de recuperação de um editor foi construído sobre um corpus
> que três equipas tinham montado. O registo foi adicionado posteriormente, uma linha por fonte:
> duas fontes não tinham licença registada e uma tinha sido recolhida de um sítio cujo `robots.txt`
> desautorizava o recolhedor. A construção do corpus falha agora numa fonte sem linha, as duas
> fontes sem licença foram removidas e o índice foi reconstruído, e a reconstrução é registada
> contra o mesmo id de registo. Quando um licenciador retirou posteriormente um arquivo, a linhagem
> direta nomeou os dois modelos ajustados que o tinham lido.

## Consequências
O direito de treino torna-se evidência que existe antes do treino, as divulgações são geradas em vez
de redigidas, e uma alteração de direitos afeta apenas os modelos que utilizaram a fonte. Os custos:
uma linha por fonte é trabalho real para recolhas grandes, portanto o pipeline de recolha deve
escrever linhas por si próprio; as verificações de reserva são apenas tão boas quanto o método
registado; e o registo regista a posição da organização, não resolve questões legais abertas.

## Padrões relacionados
[Dataset Admission Gate](/patterns/dataset-admission-gate); [AIBOM](/patterns/aibom);
[Model Card as Control Evidence](/patterns/model-card-as-control-evidence);
[Policy Card](/patterns/policy-card);
[Machine-Readable Evidence (OSCAL)](/patterns/machine-readable-evidence-oscal);
[Vendor / Model Due-Diligence Gate](/patterns/vendor-model-due-diligence-gate).

**Correspondências:** Regulamento da IA Art. 10(2)(b), Art. 53(1)(c)–(d) · Diretiva (UE) 2019/790
Art. 4(3) · RGPD Art. 5(1)(b), Art. 6(4) · ISO/IEC 42001 A.7.3, A.7.5 · NIST AI RMF (Govern 6.1; Map
4.1) · Layer 02 Inventory & Transparency.

Os rótulos de função e subcategoria seguem o NIST AI RMF [9]; os ids do Anexo A da ISO/IEC 42001
seguem um crosswalk publicado, não o texto da norma [10]. Os mapeamentos são ilustrativos, não uma
alegação de conformidade.

## Sources

[1] Directive (EU) 2019/790 on copyright in the Digital Single Market, Art. 4 (text and data mining exception; 4(3) reservation of rights by machine-readable means for content made publicly available online). Publications Office of the EU (EUR-Lex). 2019-05-17. https://eur-lex.europa.eu/eli/dir/2019/790/oj/eng (verified: primary)
[2] "Machine-readable opt-outs and AI training: Hamburg Court clarifies copyright exceptions" (Kneschke v. LAION, OLG Hamburg 5 U 104/24, 10 Dec 2025; natural-language reservations in terms of use insufficient; further appeal to the BGH allowed). Norton Rose Fulbright, Inside Tech Law. 2025-12. https://www.insidetechlaw.com/blog/2025/12/machine-readable-opt-outs-and-ai-training-hamburg-court-clarifies-copyright-exceptions (verified: secondary)
[3] Regulation (EU) 2024/1689 (AI Act): Art. 10(2)(b) data collection processes, origin of data and original purpose of collection; Art. 53(1)(c) copyright policy identifying reservations under Art. 4(3) of Directive (EU) 2019/790; Art. 53(1)(d) public summary of training content on the AI Office template (text read on the Commission's AI Act Service Desk, 2026-09-24). Publications Office of the EU (EUR-Lex). 2024-07-12. https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng (verified: primary)
[4] Bartz v. Anthropic PBC, No. 4:24-cv-05417 (N.D. Cal.): Order on Fair Use (Alsup, J., 23 Jun 2025, ECF 231) and Order Granting Final Approval of Class Action Settlement (Martínez-Olguín, J., 20 Jul 2026, ECF 680). CourtListener (court docket). 2026-07-20. https://www.courtlistener.com/docket/69058235/bartz-v-anthropic-pbc/ (verified: primary)
[5] Regulation (EU) 2016/679 (GDPR): Art. 5(1)(b) purpose limitation; Art. 6(4) compatibility of further processing. Publications Office of the EU (EUR-Lex). 2016-04-27. https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng (verified: primary)
[6] In the Matter of Everalbum, Inc., Decision and Order ("Affected Work Product": models or algorithms developed using users' biometric information, to be deleted within 90 days with a sworn statement). Federal Trade Commission. 2021-05-07. https://www.ftc.gov/system/files/documents/cases/1923172_-_everalbum_decision_final.pdf (verified: primary)
[7] Template for general-purpose AI model providers to summarise their training content (template mandatory under Art. 53(1)(d); applicable from 2 Aug 2025, legacy models by 2 Aug 2027; sources incl. scraped, user and synthetic data). European Commission. 2025-07-24. https://digital-strategy.ec.europa.eu/en/faqs/template-general-purpose-ai-model-providers-summarise-their-training-content (verified: primary)
[8] AB 2013, Generative artificial intelligence: training data transparency (chaptered 2024-09-28; operative 2026-01-01; developers post training-data documentation incl. sources, personal information, copyright status and use of synthetic data). California Legislature. 2024-09-28. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202320240AB2013 (verified: primary)
[9] Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (GOVERN 6.1 third-party risks incl. infringement of intellectual property or other rights; MAP 4.1 legal risks of components incl. third-party data or software). NIST. 2023-01-26. https://doi.org/10.6028/NIST.AI.100-1 (verified: primary)
[10] NIST AI RMF to ISO/IEC FDIS 42001 crosswalk (provider: Microsoft; lists the Annex B implementation-guidance clauses, whose numbers mirror the Annex A control ids, e.g. B.7.3 acquisition of data, B.7.5 data provenance; the ISO text was not opened). NIST AI Resource Center. 2023. https://airc.nist.gov/docs/NIST_AI_RMF_to_ISO_IEC_42001_Crosswalk.pdf (verified: secondary)
