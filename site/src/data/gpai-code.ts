// gpai-code.ts: the 40 measures of the EU General-Purpose AI Code of Practice, the only
// ids the controls and the crosswalk may cite as "GPAI Code" measures.
//
// PROVENANCE. Read on 2026-11-28 from the three chapter PDFs the European Commission
// publishes on https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai (page
// last updated 25 November 2026; the Code was published on 10 July 2025). The PDFs were
// downloaded and their text extracted; every commitment and measure heading below was
// matched against that text: Transparency 1 commitment with 3 measures, Copyright 1
// commitment with 5 measures, Safety and Security 10 commitments with 32 measures, 40 in
// all. Appendices 1 to 4 of the Safety and Security chapter are not measures and are not
// listed. Measure titles are short labels in this site's own words, not the Code's text.
// Ids are this site's: chapter letter (T, C, S) then the Code's own commitment.measure
// numbering, so "S3.2" is Safety and Security, Measure 3.2.
//
// The Code is voluntary; adhering to it is a way to show compliance with AI Act Articles
// 53 and 55, not a presumption of conformity by itself. This site has no affiliation with
// the Commission or the Code's signatories.
export type GpaiChapter = 'T' | 'C' | 'S';

export interface GpaiMeasure {
  /** "S3.2": chapter letter, commitment number, measure number. */
  id: string;
  chapter: GpaiChapter;
  chapterName: string;
  commitment: number;
  commitmentTitle: string;
  measure: string;
  /** Short title, this site's own words. */
  title: string;
  /** The chapter PDF the measure was read in. */
  url: string;
  /** YYYY-MM-DD the measure heading was read in that PDF. */
  verified: string;
}

/** When the rows were read. */
export const GPAI_CODE_AS_OF = '2026-11-28';

export const GPAI_CODE_PAGE = 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai';

export const GPAI_CHAPTERS = {
  T: { name: 'Transparency', url: 'https://ec.europa.eu/newsroom/dae/redirection/document/118120' },
  C: { name: 'Copyright', url: 'https://ec.europa.eu/newsroom/dae/redirection/document/118115' },
  S: { name: 'Safety and Security', url: 'https://ec.europa.eu/newsroom/dae/redirection/document/118119' },
} as const;

// [chapter, commitment, commitment title, [measure number, own short title][]]
const SOURCE: readonly (readonly [GpaiChapter, number, string, readonly (readonly [string, string])[]])[] = [
  ['T', 1, 'Documentation', [
    ['1.1', 'Draw up and keep model documentation current'],
    ['1.2', 'Provide the documentation to the AI Office and downstream providers'],
    ['1.3', 'Keep the documentation accurate, intact and secure'],
  ]],
  ['C', 1, 'Copyright policy', [
    ['1.1', 'Draw up, maintain and implement a copyright policy'],
    ['1.2', 'Reproduce and extract only lawfully accessible content'],
    ['1.3', 'Identify and honour rights reservations when crawling'],
    ['1.4', 'Mitigate the risk of copyright-infringing outputs'],
    ['1.5', 'Name a contact point and take complaints'],
  ]],
  ['S', 1, 'Safety and Security Framework', [
    ['1.1', 'Create the Framework'],
    ['1.2', 'Implement the Framework'],
    ['1.3', 'Update the Framework'],
    ['1.4', 'Notify the AI Office about the Framework'],
  ]],
  ['S', 2, 'Systemic risk identification', [
    ['2.1', 'Run a systemic risk identification process'],
    ['2.2', 'Build systemic risk scenarios'],
  ]],
  ['S', 3, 'Systemic risk analysis', [
    ['3.1', 'Gather model-independent information'],
    ['3.2', 'Run model evaluations'],
    ['3.3', 'Model the systemic risk'],
    ['3.4', 'Estimate the systemic risk'],
    ['3.5', 'Monitor the model after release'],
  ]],
  ['S', 4, 'Systemic risk acceptance determination', [
    ['4.1', 'Set acceptance criteria and decide whether the risk is acceptable'],
    ['4.2', 'Proceed or hold back according to that decision'],
  ]],
  ['S', 5, 'Safety mitigations', [
    ['5.1', 'Apply appropriate safety mitigations'],
  ]],
  ['S', 6, 'Security mitigations', [
    ['6.1', 'Define the security goal'],
    ['6.2', 'Apply appropriate security mitigations'],
  ]],
  ['S', 7, 'Safety and Security Model Reports', [
    ['7.1', 'Describe the model and its behaviour'],
    ['7.2', 'Explain why placing the model on the market is justified'],
    ['7.3', 'Document risk identification, analysis and mitigation'],
    ['7.4', 'Include external reports'],
    ['7.5', 'Handle material changes in the risk landscape'],
    ['7.6', 'Update the Model Report'],
    ['7.7', 'Notify the AI Office about the Model Report'],
  ]],
  ['S', 8, 'Systemic risk responsibility allocation', [
    ['8.1', 'Define clear responsibilities'],
    ['8.2', 'Allocate appropriate resources'],
    ['8.3', 'Promote a healthy risk culture'],
  ]],
  ['S', 9, 'Serious incident reporting', [
    ['9.1', 'Identify serious incidents'],
    ['9.2', 'Record the information a serious incident report needs'],
    ['9.3', 'Meet the reporting timelines'],
    ['9.4', 'Keep the incident records for the retention period'],
  ]],
  ['S', 10, 'Additional documentation and transparency', [
    ['10.1', 'Keep additional documentation for the AI Office'],
    ['10.2', 'Publish summaries of the Framework and Model Reports'],
  ]],
];

export const gpaiMeasures: readonly GpaiMeasure[] = SOURCE.flatMap(([chapter, commitment, commitmentTitle, measures]) =>
  measures.map(([measure, title]) => ({
    id: `${chapter}${measure}`,
    chapter,
    chapterName: GPAI_CHAPTERS[chapter].name,
    commitment,
    commitmentTitle,
    measure,
    title,
    url: GPAI_CHAPTERS[chapter].url,
    verified: GPAI_CODE_AS_OF,
  })),
);

export const gpaiMeasureById = (id: string): GpaiMeasure | undefined => gpaiMeasures.find((m) => m.id === id);
