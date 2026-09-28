// dpia-lists.ts: the national DPIA lists behind /resources/dpia-lists (and the
// dpia-lists dataset of the open API). Under Art. 35(4) GDPR each supervisory
// authority publishes the kinds of processing that always need a data
// protection impact assessment; this module holds one row per list in the EDPB
// register, the items of each list that touch what AI systems typically do, and
// where an item clearly overlaps an EU AI Act Annex III high-risk area.
//
// Provenance rules for this file:
// - `lists` follows the EDPB register of Art. 35(4) lists (source [4]), checked
//   on DPIA_AS_OF: 18 lists. Each was read in full, the English file in the
//   register (`url`) and, for 16 of them, the national original too
//   (`nationalUrl`); UK and Ireland are English originals. Slovenia is the
//   exception, noted on its row.
// - `items` are the items that involve AI or algorithms, automated decisions,
//   profiling or scoring, biometrics, employee monitoring, systematic or
//   large-scale monitoring, or new technology. Items about a data category or a
//   vulnerable group alone are left out. `n` is the item number as the source
//   prints it, `original` the item's own wording in the list's language,
//   `summary` ours in English.
// - `annexIII` is set only where the item text or its official examples name a
//   use inside an Annex III area, and assumes an AI system is used (the lists
//   are technology-neutral except where they name AI); `overlapNote` names the
//   Annex III point and any exclusion (biometric verification, fraud detection).
// - `aiNamed` means the list names artificial intelligence expressly in its
//   current version; `aiNamedInRegister` is the same test on the version the
//   EDPB register holds (they differ for Liechtenstein only).
// - Counts on the page and in the findings are derived from these rows, never
//   typed by hand, except the two EDPB opinion counts (sources [5] and [7]).
import type { Source } from '../lib/sources';

/** Date the register and the list documents were last checked. */
export const DPIA_AS_OF = '2026-09-28';

/** Schema version of the dpia-lists dataset. */
export const DPIA_SCHEMA_VERSION = 1;

/** Item tags, as the research record assigns them from the item text. */
export type DpiaTag =
  | 'ai-explicit'
  | 'automated-decision'
  | 'profiling-scoring'
  | 'biometrics'
  | 'employee-monitoring'
  | 'large-scale-monitoring'
  | 'innovative-technology'
  | 'vulnerable-subjects'
  | 'children'
  | 'health';

export const tagLabel: Readonly<Record<DpiaTag, string>> = {
  'ai-explicit': 'AI named',
  'automated-decision': 'Automated decisions',
  'profiling-scoring': 'Profiling or scoring',
  biometrics: 'Biometrics',
  'employee-monitoring': 'Employee monitoring',
  'large-scale-monitoring': 'Large-scale monitoring',
  'innovative-technology': 'New technology',
  'vulnerable-subjects': 'Vulnerable people',
  children: 'Children',
  health: 'Health data',
};

export const tagOrder = Object.keys(tagLabel) as DpiaTag[];

/** The six flags the table shows for each list. */
export type DpiaTopic =
  | 'ai'
  | 'automated-decision'
  | 'profiling-scoring'
  | 'biometrics'
  | 'employee-monitoring'
  | 'large-scale-monitoring';

export const topicOrder: readonly DpiaTopic[] = [
  'ai',
  'automated-decision',
  'profiling-scoring',
  'biometrics',
  'employee-monitoring',
  'large-scale-monitoring',
];

export const topicLabel: Readonly<Record<DpiaTopic, string>> = {
  ai: 'AI named',
  'automated-decision': 'Automated decisions',
  'profiling-scoring': 'Profiling or scoring',
  biometrics: 'Biometrics',
  'employee-monitoring': 'Employee monitoring',
  'large-scale-monitoring': 'Large-scale monitoring',
};

/** What each flag means, for the table legend and the schema. */
export const topicMeaning: Readonly<Record<DpiaTopic, string>> = {
  ai: 'The current version of the list names artificial intelligence expressly.',
  'automated-decision': 'An item covers automated decisions with legal or similarly significant effects.',
  'profiling-scoring': 'An item covers profiling, scoring, evaluation of personal aspects or prediction.',
  biometrics: 'An item covers biometric data or biometric identification.',
  'employee-monitoring': 'An item covers monitoring or profiling of employees.',
  'large-scale-monitoring': 'An item covers systematic or large-scale monitoring or tracking.',
};

/** EU AI Act Annex III areas, named as the site names them (data/triage.ts). */
export type AnnexIIIArea =
  | 'biometrics'
  | 'critical-infrastructure'
  | 'education'
  | 'employment'
  | 'essential-services'
  | 'law-enforcement'
  | 'migration'
  | 'justice-democracy';

export const annexIII: Readonly<Record<AnnexIIIArea, { point: number; label: string }>> = {
  biometrics: { point: 1, label: 'Biometrics' },
  'critical-infrastructure': { point: 2, label: 'Critical infrastructure' },
  education: { point: 3, label: 'Education and vocational training' },
  employment: { point: 4, label: 'Employment and workers’ management' },
  'essential-services': { point: 5, label: 'Essential private and public services' },
  'law-enforcement': { point: 6, label: 'Law enforcement' },
  migration: { point: 7, label: 'Migration, asylum and border control' },
  'justice-democracy': { point: 8, label: 'Administration of justice and democratic processes' },
};

export const annexIIIOrder = Object.keys(annexIII) as AnnexIIIArea[];

/** "5. Essential private and public services". */
export const annexIIILabel = (area: AnnexIIIArea): string =>
  `${annexIII[area].point}. ${annexIII[area].label}`;

export type DpiaMethod = 'enumerated' | 'scored' | 'mixed';

export const methodLabel: Readonly<Record<DpiaMethod, string>> = {
  enumerated: 'Enumerated list',
  scored: 'Scored criteria',
  mixed: 'Mixed',
};

export interface DpiaItem {
  /** Item number as the source prints it ('11', '3.1', '8.1'). */
  n: string;
  /** The item's wording in the list's own language. */
  original: string;
  /** What the item covers, in our own words. */
  summary: string;
  tags: readonly DpiaTag[];
  /** Annex III areas the item clearly overlaps; empty when none does. */
  annexIII: readonly AnnexIIIArea[];
  /** Which Annex III point, and any exclusion, when `annexIII` is set. */
  overlapNote?: string;
}

export interface DpiaList {
  /** Stable id: lower-case ISO 3166-1 alpha-2 code ('gb' for the United Kingdom). */
  id: string;
  country: string;
  /** Authority name in English. */
  authority: string;
  authorityShort: string;
  /** Authority name as the research record gives it, original and English. */
  authorityOriginal: string;
  titleOriginal: string;
  titleEn: string;
  /** Date the list was adopted or published (the national act where it has one), YYYY-MM-DD. */
  adopted: string;
  /** The EDPB opinion on the draft list. */
  edpbOpinion: { n: string; date: string | null; url: string };
  /** The list document in the EDPB register (English). */
  url: string;
  /** The national original, where one was found. */
  nationalUrl: string | null;
  /** ISO 639-1 code of the national original. */
  language: string;
  method: DpiaMethod;
  /** Items or criteria in the list, relevant or not. */
  itemCount: number;
  aiNamed: boolean;
  aiNamedInRegister: boolean;
  /** Latest dated change found (YYYY, YYYY-MM or YYYY-MM-DD); null when none. */
  lastUpdate: string | null;
  updateEvidenceUrl: string | null;
  /** A caveat about the list or its sources. */
  note?: string;
  items: readonly DpiaItem[];
}

export const lists: readonly DpiaList[] = [
  {
    id: 'bg',
    country: 'Bulgaria',
    authority: 'Commission for Personal Data Protection',
    authorityShort: 'CPDP',
    authorityOriginal: 'Комисия за защита на личните данни (КЗЛД) / Commission for Personal Data Protection (CPDP)',
    titleOriginal: 'Списък на видовете операции по обработване на лични данни, за които се изисква извършване на оценка за въздействие върху защитата на данните съгласно чл. 35, пар. 4 от Регламент (ЕС) 2016/679',
    titleEn: 'List of processing operations requiring a data protection impact assessment pursuant to Art. 35(4) of Regulation (EU) 2016/679',
    adopted: '2018-10-10',
    edpbOpinion: { n: '3/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-32018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/bg_list_dpia_operations_bulgaria_final.pdf',
    nationalUrl: 'https://cpdp.bg/home-default/%D0%BD%D0%B0%D1%81%D0%BE%D0%BA%D0%B8/%D1%81%D0%BF%D0%B8%D1%81%D1%8A%D0%BA-%D0%BD%D0%B0-%D0%B2%D0%B8%D0%B4%D0%BE%D0%B2%D0%B5%D1%82%D0%B5-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%B8-%D0%BF%D0%BE-%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE/',
    language: 'bg',
    method: 'enumerated',
    itemCount: 8,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '1',
        original: 'Мащабно обработване на биометрични данни за целите на уникалната идентификация на физическо лице, което не е спорадично.',
        summary: 'Large-scale, non-sporadic processing of biometric data for unique identification.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used.',
      },
      {
        n: '2',
        original: 'Обработване на генетични данни с цел профилиране, което поражда правни последици за субекта на данни или по подобен начин го засяга в значителна степен.',
        summary: 'Genetic data processed for profiling with legal or similarly significant effects.',
        tags: ['profiling-scoring', 'automated-decision', 'health'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Обработване на данни за местоположение с цел профилиране, което поражда правни последици за субекта на данни или по подобен начин го засяга в значителна степен.',
        summary: 'Location data processed for profiling with legal or similarly significant effects.',
        tags: ['profiling-scoring', 'automated-decision', 'large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '7',
        original: 'Обработване на лични данни на деца при пряко предлагане на услуги на информационното общество.',
        summary: 'Children\'s data in information-society services offered directly to a child.',
        tags: ['children'],
        annexIII: [],
      },
      {
        n: '8',
        original: 'Осъществяване на миграция на данни от съществуващи към нови технологии, когато това е свързано с мащабно обработване на данни.',
        summary: 'Migration of data from existing to new technologies linked to large-scale processing.',
        tags: ['innovative-technology'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'cz',
    country: 'Czech Republic',
    authority: 'Office for Personal Data Protection',
    authorityShort: 'ÚOOÚ',
    authorityOriginal: 'Úřad pro ochranu osobních údajů (ÚOOÚ) / Office for Personal Data Protection',
    titleOriginal: 'Seznam druhů operací zpracování osobních údajů, která podléhají posouzení vlivu na ochranu osobních údajů',
    titleEn: 'List of processing operations subject to data protection impact assessment',
    adopted: '2019-02-08',
    edpbOpinion: { n: '4/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-42018-on-the-draft-list-of-the-competent-supervisory_en;' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/cz_dpia_list_354_cz_authority.pdf',
    nationalUrl: 'https://uoou.gov.cz/media/profesional/seznam-operaci-zpracovani-nepodlehajicich-pozadavku-na-dpia.pdf',
    language: 'cs',
    method: 'scored',
    itemCount: 10,
    aiNamed: true,
    aiNamedInRegister: true,
    lastUpdate: '2020-01',
    updateEvidenceUrl: 'https://www.smocr.cz/cs/cinnost/gdpr/a/uoou-zaktualizoval-dokument-k-povinnosti-spravcu-provadet-dpia',
    note: 'A scored methodology, not an enumerated list: a DPIA is required when two characteristics reach the critical level, or one does and five reach the significant level. Republished in January 2020 with the Art. 35(5) list; the characteristic headings are unchanged.',
    items: [
      {
        n: '8 (8.1)',
        original: 'Zpracování osobních údajů v technologicky složitých nebo pokročilých infrastrukturách nebo platformách; 8.1 Automatizované expertní systémy, včetně umělé inteligence',
        summary: 'Characteristic 8, processing in technically complex or advanced infrastructures or platforms. Its highest (critical, red) level is \'automated expert systems including artificial intelligence\' (systems for analysis and profiling).',
        tags: ['ai-explicit', 'profiling-scoring', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '6 (6.1)',
        original: 'Zpracování osobních údajů s omezeným ovlivněním subjekty údajů; 6.1 Subjektem údajů neovlivnitelné zpracování a předání',
        summary: 'Characteristic 6, processing the data subject cannot influence. The critical level covers processing the data subject cannot influence, typically processing on a legal basis or resulting from automated decision-making.',
        tags: ['automated-decision'],
        annexIII: [],
      },
      {
        n: '1 (1.1)',
        original: 'Zpracování zahrnující monitorování subjektů údajů; 1.1 Subjekty údajů jsou identifikovatelné/identifikované a lokalizovatelné',
        summary: 'Characteristic 1, processing that includes monitoring of data subjects. Critical level: identified/identifiable and localisable subjects (tracking of movement or location), including employee monitoring that determines movements or continuously monitors activity.',
        tags: ['large-scale-monitoring', 'employee-monitoring'],
        annexIII: [],
      },
      {
        n: '2 (2.1)',
        original: 'Zpracování kritických údajů, údajů umožňujících přímou identifikaci a/nebo údajů vysoce osobní povahy; 2.1 Kritické údaje',
        summary: 'Characteristic 2, critical data (red) include special category data such as biometric data processed for unique identification, \'including biometric cameras and similar devices\', and health data.',
        tags: ['biometrics', 'health'],
        annexIII: [],
      },
      {
        n: '10 (10.1)',
        original: 'Zpracování osobních údajů s využitím nových technologických nebo organizačních řešení; 10.1 Zcela nové řešení',
        summary: 'Characteristic 10, use of new technological or organisational solutions. Critical level: a completely new solution with no prior experience.',
        tags: ['innovative-technology'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'ee',
    country: 'Estonia',
    authority: 'Estonian Data Protection Inspectorate',
    authorityShort: 'AKI',
    authorityOriginal: 'Andmekaitse Inspektsioon (AKI) / Estonian Data Protection Inspectorate',
    titleOriginal: '5. peatükk. Andmekaitsealane mõjuhinnang (piiriülese andmetöötluse loetelu)',
    titleEn: 'List of cross-border processing operations which are subject to the requirement for a data protection impact assessment',
    adopted: '2019-03-19',
    edpbOpinion: { n: '6/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-62018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/ee_estonian_cross-border_dpia_list.pdf',
    nationalUrl: 'https://www.aki.ee/5-peatukk-andmekaitsealane-mojuhinnang',
    language: 'et',
    method: 'enumerated',
    itemCount: 13,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '1',
        original: 'Esimene näide on profileerimine - vastutav töötleja / volitatud töötleja hindab inimesi: automatiseeritud andmetöötlemist kasutades, ulatuslikult, süstemaatiliselt ning selline hindamine on inimesele õiguslike tagajärgedega või olulise mõjuga.',
        summary: 'Profiling (restating Art. 35(3)(a)): evaluation of persons by automated processing, extensively and systematically, with legal or similarly significant effects.',
        tags: ['profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Kolmas näide on avalike alade ulatuslik süstemaatiline jälgimine.',
        summary: 'Large-scale systematic monitoring of publicly accessible areas (restating Art. 35(3)(c)).',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '4',
        original: 'Biomeetriliste andmete ulatuslik töötlemine füüsilise isiku ainulaadse identifitseerimise eesmärgil.',
        summary: 'Large-scale processing of biometric data for unique identification.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) covers remote biometric identification; verification-only uses are excluded.',
      },
      {
        n: '6',
        original: 'Tööhõive kontekstis ulatuslik andmete töötlemine hõlmates töötajate tegevuste süstemaatilist jälgimist.',
        summary: 'Large-scale processing in an employment context involving systematic monitoring of employees\' activities.',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) (monitoring performance and behaviour in work relationships) where an AI system is used.',
      },
      {
        n: '10',
        original: 'Toob kaasa asukoha jälgimise reaalajas (eriti sideteenuste puhul).',
        summary: 'Large-scale processing involving real-time location tracking (particularly communication services).',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '12',
        original: 'Võib kujutada diskrimineerimise ohtu, millel on õiguslikud tagajärjed või millel on sarnane mõju (eriti tööjõu vahendamise ning palka ja karjääri mõjutavate hindamisteenuste puhul).',
        summary: 'Large-scale processing that may pose a risk of discrimination with legal or similar effects, particularly in labour brokering and in assessment services affecting pay and career.',
        tags: ['profiling-scoring'],
        annexIII: ['employment'],
        overlapNote: 'Labour brokering and assessment affecting pay and career correspond to Annex III point 4(a)/(b) where an AI system is used.',
      },
    ],
  },
  {
    id: 'fi',
    country: 'Finland',
    authority: 'Office of the Data Protection Ombudsman',
    authorityShort: 'Office of the Data Protection Ombudsman',
    authorityOriginal: 'Tietosuojavaltuutetun toimisto / Office of the Data Protection Ombudsman',
    titleOriginal: 'Tietosuojavaltuutetun päätös luetteloksi käsittelytoimista, joiden yhteydessä on tehtävä vaikutustenarviointi',
    titleEn: 'List of processing operations which require data protection impact assessment (DPIA)',
    adopted: '2018-10-15',
    edpbOpinion: { n: '8/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-82018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/fi_sa_dpia_list.pdf',
    nationalUrl: 'https://tietosuoja.fi/luettelo-vaikutustenarviointia-edellyttavista-kasittelytoimista',
    language: 'fi',
    method: 'enumerated',
    itemCount: 5,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: '2018-12-21',
    updateEvidenceUrl: 'http://web.archive.org/web/20260708134715/https://tietosuoja.fi/luettelo-vaikutustenarviointia-edellyttavista-kasittelytoimista',
    note: 'Five items only (biometric, genetic and location data, the Art. 14(5)(b) exemption, whistleblowing); automated decision-making appears only as an additional criterion that can combine with them. The national page was read through a web archive snapshot.',
    items: [
      {
        n: 'Biometriset tiedot',
        original: 'Biometriset tiedot',
        summary: 'Biometric data processed for unique identification, with at least one further WP248 criterion (scoring, automated decisions, systematic monitoring, large scale, matching, vulnerable subjects, innovative use, preventing rights).',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used.',
      },
      {
        n: 'Geneettiset tiedot',
        original: 'Geneettiset tiedot',
        summary: 'Genetic data with at least one further criterion (incl. evaluation or scoring, automated decisions).',
        tags: ['health', 'profiling-scoring'],
        annexIII: [],
      },
      {
        n: 'Sijaintitiedot',
        original: 'Sijaintitiedot',
        summary: 'Location data with at least one further criterion (incl. scoring, automated decisions, systematic monitoring).',
        tags: ['large-scale-monitoring', 'profiling-scoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'fr',
    country: 'France',
    authority: 'Commission nationale de l\'informatique et des libertés',
    authorityShort: 'CNIL',
    authorityOriginal: 'Commission nationale de l\'informatique et des libertés (CNIL)',
    titleOriginal: 'Liste des types d\'opérations de traitement pour lesquelles une analyse d\'impact relative à la protection des données est requise (Délibération n° 2018-327 du 11 octobre 2018)',
    titleEn: 'List of processing operations for which a data protection impact assessment (DPIA) is required (Deliberation No 2018-327 of 11 October 2018)',
    adopted: '2018-10-11',
    edpbOpinion: { n: '9/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-92018-on-the-draft-list-of-the-competent-supervisory_en;' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/list_of_processing_operations_for_which_dpia_is_required_fr.pdf',
    nationalUrl: 'https://www.cnil.fr/sites/default/files/atoms/files/liste-traitements-aipd-requise.pdf',
    language: 'fr',
    method: 'enumerated',
    itemCount: 14,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '1',
        original: 'Traitements de données de santé mis en œuvre par les établissements de santé ou les établissements médico-sociaux pour la prise en charge des personnes.',
        summary: 'Health data processing by healthcare or medico-social establishments for patient care. French examples include \'algorithmes de prise de décision médicale\' (medical decision-making algorithms) and telemedicine.',
        tags: ['health', 'vulnerable-subjects'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Traitements établissant des profils de personnes physiques à des fins de gestion des ressources humaines',
        summary: 'Profiling for human-resources purposes. French examples: detecting \'high potentials\'; facilitating recruitment \'notamment grâce à un algorithme de sélection\'; personalised training \'grâce à un algorithme\'; predicting employee departures from correlations.',
        tags: ['profiling-scoring', 'vulnerable-subjects'],
        annexIII: ['employment'],
        overlapNote: 'Recruitment via a selection algorithm and employee evaluation correspond to Annex III point 4(a)/(b).',
      },
      {
        n: '4',
        original: 'Traitements ayant pour finalité de surveiller de manière constante l\'activité des employés concernés',
        summary: 'Constant monitoring of employees\' activity. Examples: data loss prevention analysis of outgoing e-mail, video surveillance of staff handling cash or of warehouse workers, tachographs.',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '8',
        original: 'Traitements impliquant le profilage des personnes pouvant aboutir à leur exclusion du bénéfice d\'un contrat ou à la suspension voire à la rupture de celui-ci',
        summary: 'Profiling that may lead to exclusion from, suspension or termination of a contract. Examples laid out beside this row in the CNIL PDF: a score for granting credit; behavioural analysis to detect \'prohibited\' behaviour on a social network; payment-fraud prevention.',
        tags: ['profiling-scoring', 'automated-decision'],
        annexIII: ['essential-services'],
        overlapNote: 'Credit scoring example corresponds to Annex III point 5(b); fraud detection is excluded from 5(b). Row-to-example mapping read from the PDF layout.',
      },
      {
        n: '9',
        original: 'Traitements mutualisés de manquements contractuels constatés, susceptibles d\'aboutir à une décision d\'exclusion ou de suspension du bénéfice d\'un contrat',
        summary: 'Pooled processing of established contractual breaches that may lead to exclusion or suspension from a contract (criteria include automated decision-making with legal or similar effect). Examples: sector-shared registers of unpaid bills; car-insurance cancellation checks.',
        tags: ['automated-decision'],
        annexIII: [],
      },
      {
        n: '10',
        original: 'Traitements de profilage faisant appel à des données provenant de sources externes',
        summary: 'Profiling using data from external sources. Examples: data broker combinations; personalised online advertising.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Traitements de données biométriques aux fins d\'identifier une personne physique de manière unique parmi lesquelles figurent des personnes dites « vulnérables » (élèves, personnes âgées, patients, demandeurs d\'asile, etc.)',
        summary: 'Biometric processing for unique identification where data subjects include vulnerable persons (pupils, elderly, patients, asylum seekers). Examples: fingerprint check of patient identity; school canteen access by hand-contour recognition.',
        tags: ['biometrics', 'vulnerable-subjects', 'children'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1 where an AI biometric identification system is used; access-control verification is excluded from 1(a). Title as extracted from the CNIL PDF layout.',
      },
      {
        n: '12',
        original: 'Instruction des demandes et gestion des logements sociaux',
        summary: 'Evaluation of applications for social housing and its management (criteria: sensitive data, evaluation/scoring).',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '14',
        original: 'Traitements de données de localisation à large échelle',
        summary: 'Large-scale processing of location data (e.g. mobile apps collecting geolocation, urban mobility services, telecom customer databases, transport ticketing).',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'de',
    country: 'Germany',
    authority: 'Datenschutzkonferenz (DSK), Conference of the independent federal and state data protection supervisory authorities',
    authorityShort: 'DSK',
    authorityOriginal: 'Datenschutzkonferenz (DSK), Conference of the independent federal and state data protection supervisory authorities',
    titleOriginal: 'Liste der Verarbeitungstätigkeiten, für die eine DSFA durchzuführen ist (Version 1.1, 17.10.2018)',
    titleEn: 'List of processing activities for which a DPIA is to be carried out (version 1.1)',
    adopted: '2018-10-17',
    edpbOpinion: { n: '5/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-52018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/20181017_ah_dpia_list_1_1_germany_en.pdf',
    nationalUrl: 'https://www.datenschutzkonferenz-online.de/media/ah/20181017_ah_DSK_DSFA_Muss-Liste_Version_1.1_Deutsch.pdf',
    language: 'de',
    method: 'enumerated',
    itemCount: 17,
    aiNamed: true,
    aiNamedInRegister: true,
    lastUpdate: '2018-10-17',
    updateEvidenceUrl: 'https://www.datenschutzkonferenz-online.de/media/ah/20181017_ah_DSK_DSFA_Muss-Liste_Version_1.1_Deutsch.pdf',
    note: 'Version 1.1 of 17 October 2018, replacing the list of 18 July 2018 (stated in the list).',
    items: [
      {
        n: '1',
        original: 'Verarbeitung von biometrischen Daten zur eindeutigen Identifizierung natürlicher Personen, wenn mindestens ein weiteres folgendes Kriterium aus WP 248 Rev. 01 zutrifft',
        summary: 'Biometric data for unique identification where at least one further WP248 criterion applies (e.g. fingerprint access control, school canteen \'payment by fingerprint\').',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used; access-control verification excluded.',
      },
      {
        n: '4',
        original: 'Umfangreiche Verarbeitung von personenbezogenen Daten über den Aufenthalt von natürlichen Personen',
        summary: 'Large-scale processing of location data (car sharing, vehicle sensors, offline tracking of customers, mobile-network traffic analysis).',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '5',
        original: 'Zusammenführung von personenbezogenen Daten aus verschiedenen Quellen und Verarbeitung der so zusammengeführten Daten, sofern ... die Anwendung von Algorithmen einschließen, die für die betroffenen Personen nicht nachvollziehbar sind, und der Erzeugung von Datengrundlagen dienen, die dazu genutzt werden können, Entscheidungen zu treffen, die Rechtswirkung ... entfalten',
        summary: 'Large-scale merging of data from several sources using algorithms incomprehensible to data subjects, producing data bases for decisions with legal or similarly significant effects. Fields: fraud prevention, scoring by credit agencies, banks or insurers.',
        tags: ['profiling-scoring', 'automated-decision'],
        annexIII: ['essential-services'],
        overlapNote: 'Credit-agency and bank scoring correspond to Annex III point 5(b); insurance scoring overlaps 5(c) only for life and health insurance; fraud prevention excluded from 5(b).',
      },
      {
        n: '6',
        original: 'Mobile optisch-elektronische Erfassung personenbezogener Daten in öffentlichen Bereichen, sofern die Daten aus ein oder mehreren Erfassungssystemen in großem Umfang zentral zusammengeführt werden.',
        summary: 'Mobile optical-electronic recording in public areas where data are centrally consolidated on a large scale (e.g. vehicle environment sensors used to improve automated-driving algorithms).',
        tags: ['large-scale-monitoring', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '7',
        original: 'Umfangreiche Erhebung und Veröffentlichung oder Übermittlung von personenbezogenen Daten, die zur Bewertung des Verhaltens und anderer persönlicher Aspekte von Personen dienen...',
        summary: 'Large-scale collection and publication or transfer of data used to evaluate behaviour and personal aspects, usable by third parties for decisions with legal effect (rating portals, debt collection).',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '8',
        original: 'Umfangreiche Verarbeitung von personenbezogenen Daten über das Verhalten von Beschäftigten, die zur Bewertung ihrer Arbeitstätigkeit derart eingesetzt werden können, dass sich Rechtsfolgen für die Betroffenen ergeben...',
        summary: 'Large-scale processing of data on employee conduct that can be used to evaluate their work with legal or similarly significant effects (DLP systems profiling employees, geolocation of employees).',
        tags: ['employee-monitoring', 'profiling-scoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) (monitor and evaluate performance and behaviour) where an AI system is used.',
      },
      {
        n: '9',
        original: 'Erstellung umfassender Profile über die Interessen, das Netz persönlicher Beziehungen oder die Persönlichkeit der Betroffenen',
        summary: 'Comprehensive profiles of interests, personal networks or personality (dating portals, large social networks).',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '10',
        original: 'Zusammenführung von personenbezogenen Daten aus verschiedenen Quellen ... die Anwendung von Algorithmen einschließen, die für die betroffenen Personen nicht nachvollziehbar sind, und der Entdeckung vorher unbekannter Zusammenhänge zwischen den Daten für nicht im Einzelnen bestimmte Zwecke dienen',
        summary: 'Large-scale merging of data using algorithms incomprehensible to data subjects to discover previously unknown connections for undetermined purposes (big data analysis of customer data enriched by third parties).',
        tags: ['profiling-scoring', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Einsatz von künstlicher Intelligenz zur Verarbeitung personenbezogener Daten zur Steuerung der Interaktion mit den Betroffenen oder zur Bewertung persönlicher Aspekte der betroffenen Person',
        summary: 'Use of artificial intelligence to process personal data to steer interaction with data subjects or to evaluate their personal aspects (customer support via AI; call centre automatically evaluating callers\' mood; conversational system advising customers).',
        tags: ['ai-explicit', 'profiling-scoring', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '12',
        original: 'Nicht bestimmungsgemäße Nutzung von Sensoren eines Mobilfunkgeräts im Besitz der betroffenen Personen oder von Funksignalen ... zur Bestimmung des Aufenthaltsorts oder der Bewegung von Personen über einen substantiellen Zeitraum',
        summary: 'Non-intended use of mobile phone sensors or radio signals to determine location or movement over a substantial period (WLAN/Bluetooth tracking of passers-by).',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '13',
        original: 'Automatisierte Auswertung von Video- oder Audio-Aufnahmen zur Bewertung der Persönlichkeit der Betroffenen',
        summary: 'Automated evaluation of video or audio recordings to assess personality (telephone call evaluation using algorithms; call centre mood evaluation).',
        tags: ['profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
      {
        n: '14',
        original: 'Erstellung umfassender Profile über die Bewegung und das Kaufverhalten von Betroffenen',
        summary: 'Comprehensive profiles of movement and purchasing behaviour (customer cards, loyalty schemes).',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '17',
        original: 'Verarbeitung von Daten gemäß Art. 9 Abs. 1 und Art. 10 DS-GVO ... sofern die Daten durch die Anbieter neuer Technologien dazu verwendet werden, die Leistungsfähigkeit der Personen zu bestimmen.',
        summary: 'Special-category or criminal data (even not large scale) used by providers of new technologies to determine persons\' performance (fitness wristband data).',
        tags: ['innovative-technology', 'health', 'profiling-scoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'gr',
    country: 'Greece',
    authority: 'Hellenic Data Protection Authority',
    authorityShort: 'HDPA',
    authorityOriginal: 'Hellenic Data Protection Authority (HDPA)',
    titleOriginal: 'Κατάλογος με τα είδη των πράξεων επεξεργασίας που υπόκεινται στην απαίτηση για διενέργεια εκτίμησης αντίκτυπου σχετικά με την προστασία δεδομένων σύμφωνα με το άρθρο 35 παρ. 4 του ΓΚΠΔ',
    titleEn: 'List of the kind of processing operations which are subject to the requirement for a data protection impact assessment according to article 35 par. 4 of GDPR',
    adopted: '2018-10-16',
    edpbOpinion: { n: '7/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-72018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/el_sa_dpia_list.pdf',
    nationalUrl: 'https://www.dpa.gr/sites/default/files/2019-09/65_2018anonym.pdf',
    language: 'el',
    method: 'mixed',
    itemCount: 13,
    aiNamed: true,
    aiNamedInRegister: true,
    lastUpdate: null,
    updateEvidenceUrl: 'https://www.dpa.gr/el/enimerwtiko/deltia/dimosieysi-sto-fek-b-162210-5-2019-toy-katalogoy-me-ta-eidi-ton-praxeon',
    note: 'Three categories of criteria with combination rules.',
    items: [
      {
        n: '1.1',
        original: 'Συστηματική αξιολόγηση, βαθμολόγηση, πρόβλεψη, πρόγνωση και κατάρτιση προφίλ...',
        summary: 'Systematic evaluation, scoring, prediction and profiling, especially of economic situation, health, preferences, reliability, behaviour, location or credit rating. Examples: financial institution screening customers against credit reference, AML/CTF or fraud data; direct-to-consumer genetic tests.',
        tags: ['profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Credit rating named in the item corresponds to Annex III point 5(b); Annex III 5(b) excludes fraud detection.',
      },
      {
        n: '1.2',
        original: 'Συστηματική επεξεργασία δεδομένων που αποσκοπεί στη λήψη αυτοματοποιημένων αποφάσεων...',
        summary: 'Systematic processing aimed at automated decisions with legal or similarly significant effects that may lead to exclusion or discrimination. Examples: automatic refusal of an online credit application, e-recruiting without human intervention, automatic refusal of insurance.',
        tags: ['automated-decision'],
        annexIII: ['essential-services', 'employment'],
        overlapNote: 'Online credit refusal (Annex III 5(b)); e-recruiting without human intervention (Annex III 4(a)); insurance refusal only overlaps 5(c) for life and health insurance.',
      },
      {
        n: '1.3',
        original: 'Συστηματική επεξεργασία δεδομένων που ενδέχεται να εμποδίζει το υποκείμενο να ασκήσει τα δικαιώματα του ή να χρησιμοποιήσει μια υπηρεσία ή σύμβαση...',
        summary: 'Systematic processing that may prevent exercise of rights or use of a service or contract, especially with third-party data. Examples: bank screening against a credit reference database for a loan; blacklists; whistleblowing systems.',
        tags: ['profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Loan decision via credit reference database corresponds to Annex III point 5(b).',
      },
      {
        n: '1.4',
        original: 'Συστηματική επεξεργασία δεδομένων που αφορά την κατάρτιση προφίλ για το σκοπό της προώθησης προϊόντων και υπηρεσιών...',
        summary: 'Systematic profiling for marketing where data are combined with third-party data.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '1.5',
        original: 'Συστηματική και σε μεγάλη κλίμακα επεξεργασία για την παρακολούθηση, την παρατήρηση ή τον έλεγχο των φυσικών προσώπων...',
        summary: 'Large-scale systematic monitoring of persons via video surveillance, networks or other means in public or publicly accessible areas, incl. location tracking, wi-fi tracking and drones.',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '2.1',
        original: 'Μεγάλης κλίμακας επεξεργασία των ειδικών κατηγοριών δεδομένων (περιλαμβανομένων των γενετικών και των βιομετρικών με σκοπό την αδιαμφισβήτητη ταυτοποίηση προσώπου)...',
        summary: 'Large-scale processing of special categories (incl. genetic and biometric data for unique identification) and criminal data.',
        tags: ['biometrics', 'health'],
        annexIII: [],
      },
      {
        n: '2.3',
        original: 'Συστηματική παρακολούθηση - εφόσον είναι επιτρεπτή - της θέσης/τοποθεσίας καθώς και του περιεχομένου και των μεταδεδομένων των επικοινωνιών των εργαζομένων...',
        summary: 'Systematic monitoring (where lawful) of employees\' location and of the content and metadata of their communications (example: DLP systems); systematic processing of employees\' biometric data for unique identification and of genetic data.',
        tags: ['employee-monitoring', 'biometrics'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) (monitoring behaviour of workers) where an AI system is used.',
      },
      {
        n: '3.1',
        original: 'Καινοτόμος χρήση ή εφαρμογή νέων τεχνολογιών ή οργανωτικών λύσεων... ή εφαρμογές τεχνητής νοημοσύνης ή τεχνολογίες δημόσια προσπελάσιμων blockchain που περιλαμβάνουν προσωπικά δεδομένα.',
        summary: 'Innovative use of new technological or organisational solutions, e.g. combined fingerprint and face recognition for access control, mHealth or other \'smart\' apps that build user profiles, artificial intelligence applications, public blockchains containing personal data. Applies with a 1st- or 2nd-category criterion.',
        tags: ['ai-explicit', 'innovative-technology', 'biometrics'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'hu',
    country: 'Hungary',
    authority: 'Nemzeti Adatvédelmi és Információszabadság Hatóság',
    authorityShort: 'NAIH',
    authorityOriginal: 'Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)',
    titleOriginal: 'Hatásvizsgálati lista (a GDPR 35. cikkének (4) bekezdése szerinti adatkezelési műveletek típusainak jegyzéke)',
    titleEn: 'List of the kind of processing operations subject to a mandatory DPIA under Art. 35(4) GDPR',
    adopted: '2019-01-23',
    edpbOpinion: { n: '10/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-102018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/gdpr_35_4_list_en_mod.pdf',
    nationalUrl: 'https://naih.hu/files/GDPR_35_4_lista_HU_mod.pdf',
    language: 'hu',
    method: 'enumerated',
    itemCount: 24,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '1',
        original: 'Ha egy természetes személy egyedi azonosítását célzó biometrikus adatának kezelése módszeres megfigyelésre irányul.',
        summary: 'Biometric data for unique identification used for systematic monitoring.',
        tags: ['biometrics', 'large-scale-monitoring'],
        annexIII: ['biometrics'],
        overlapNote: 'Biometric identification for systematic monitoring corresponds to Annex III point 1(a) remote biometric identification where an AI system is used.',
      },
      {
        n: '2',
        original: 'Ha kiszolgáltatott helyzetben lévő érintettekkel ... kapcsolatos egyedi azonosítását célzó biometrikus adat kezelése történik.',
        summary: 'Biometric identification of vulnerable data subjects, in particular children, employees, the elderly and mentally ill people.',
        tags: ['biometrics', 'vulnerable-subjects', 'children'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1 where an AI biometric identification system is used; verification-only uses excluded.',
      },
      {
        n: '5',
        original: 'Pontozás.',
        summary: 'Scoring: assessing characteristics of the data subject where the result affects the creation or quality of a service provided to them.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '6',
        original: 'Hitelképesség értékelése.',
        summary: 'Creditworthiness assessment through large-scale or systematic evaluation of personal data.',
        tags: ['profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Annex III point 5(b) (creditworthiness / credit score).',
      },
      {
        n: '7',
        original: 'Fizetőképesség értékelése.',
        summary: 'Solvency assessment through large-scale or systematic evaluation of personal data.',
        tags: ['profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Annex III point 5(b) (creditworthiness).',
      },
      {
        n: '8',
        original: 'Harmadik személytől gyűjtött adatok további felhasználása.',
        summary: 'Use of data collected from third parties in decisions to refuse or terminate a service.',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: [],
      },
      {
        n: '9',
        original: 'Diákok, hallgatók személyes adatainak értékelésre való felhasználása.',
        summary: 'Use of pupils\' and students\' data for assessment: recording and examining preparedness, achievement, aptitude and mental state, where not required by law, at any level of education.',
        tags: ['profiling-scoring', 'children', 'vulnerable-subjects'],
        annexIII: ['education'],
        overlapNote: 'Annex III point 3(b) (evaluating learning outcomes) where an AI system is used.',
      },
      {
        n: '10',
        original: 'Profilozás.',
        summary: 'Profiling through large-scale and systematic evaluation, especially of work performance, financial status, health, preferences, trustworthiness, conduct, residence or movement.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Csalás elleni fellépés.',
        summary: 'Anti-fraud: screening clients against credit reference, AML/CTF and anti-fraud databases.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '13',
        original: 'Joghatással vagy hasonló jelentős hatással járó automatizált döntéshozatal.',
        summary: 'Automated decision-making with legal or similarly significant effects, which may result in exclusion or discrimination.',
        tags: ['automated-decision'],
        annexIII: [],
      },
      {
        n: '14',
        original: 'Módszeres megfigyelés.',
        summary: 'Systematic, large-scale surveillance in public areas by cameras, drones or other new technology (wifi tracking, Bluetooth tracking, body cameras).',
        tags: ['large-scale-monitoring', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '16',
        original: 'Munkavállaló munkájának megfigyelése.',
        summary: 'Monitoring of employees\' work: large-scale, systematic processing and assessment of employees\' data (e.g. GPS trackers in vehicles, camera surveillance against theft or fraud).',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '18',
        original: 'Nagyszámú személyes adatok kezelése bűnüldözési célból',
        summary: 'Processing large amounts of personal data for law enforcement purposes.',
        tags: [],
        annexIII: ['law-enforcement'],
        overlapNote: 'Same domain as Annex III point 6; Annex III lists only specific law-enforcement AI uses (risk assessment, polygraphs, evidence reliability, profiling).',
      },
      {
        n: '20',
        original: 'Gyermekek személyes adatainak kezelése profilozás, automatikus döntéshozatal, vagy marketing céljából...',
        summary: 'Children\'s data for profiling, automated decision-making, marketing or information-society services offered directly to them.',
        tags: ['children', 'profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
      {
        n: '21',
        original: 'Új technológiai megoldások használata az adatkezelés során.',
        summary: 'Use of new technologies: large amounts of data from sensor-equipped devices (smart TVs, smart appliances, smart toys) that feed profiling of financial status, health, interests, trustworthiness, conduct, residence.',
        tags: ['innovative-technology', 'profiling-scoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'is',
    country: 'Iceland',
    authority: 'Persónuvernd',
    authorityShort: 'Icelandic Data Protection Authority',
    authorityOriginal: 'Persónuvernd (Icelandic Data Protection Authority)',
    titleOriginal: 'Auglýsing um skrá yfir vinnsluaðgerðir sem krefjast ávallt mats á áhrifum á persónuvernd (nr. 828/2019)',
    titleEn: 'Notice on processing operations subject to the requirement of a data protection impact assessment (No. 828/2019)',
    adopted: '2019-08-29',
    edpbOpinion: { n: '7/2019', date: null, url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-72019-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/is_sa_-_dpia_list_final_-_formatted_20190829.pdf',
    nationalUrl: 'https://adverts.stjornartidindi.is/B_nr_828_2019.pdf',
    language: 'is',
    method: 'enumerated',
    itemCount: 14,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: '2019-08-29',
    updateEvidenceUrl: 'https://island.is/stjornartidindi/nr/7034a38d-0b61-4f7a-b3ef-a63252df0d6e',
    note: 'Notice 828/2019, which repealed Notice 337/2019. EEA state.',
    items: [
      {
        n: '1',
        original: 'Gagnaöflun frá þriðja aðila í samhengi við a.m.k. einn af framangreindum flokkum í 2. gr.',
        summary: 'Data collected from third parties combined with at least one other criterion, e.g. combining third-party data to decide whether to offer, continue or deny a product, service or offer; systematic combining of telecom location/traffic data.',
        tags: ['profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
      {
        n: '2',
        original: 'Umfangsmikið kerfisbundið eftirlit, að meðtalinni myndavélavöktun, á svæðum opnum almenningi.',
        summary: 'Large-scale systematic monitoring, incl. camera surveillance, in publicly accessible areas.',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Rafrænt eftirlit við skóla eða leikskóla á skóla-/vistunartíma.',
        summary: 'Electronic monitoring in schools or kindergartens during opening hours.',
        tags: ['large-scale-monitoring', 'children'],
        annexIII: [],
      },
      {
        n: '4',
        original: 'Vinnsla persónuupplýsinga í því skyni að leggja mat á árangur, líðan eða velferð nemenda í skóla eða leikskóla.',
        summary: 'Processing to evaluate pupils\' performance, well-being or welfare at all levels of education, from preschool to university.',
        tags: ['profiling-scoring', 'children', 'vulnerable-subjects'],
        annexIII: ['education'],
        overlapNote: 'Annex III point 3(b) (evaluating learning outcomes) where an AI system is used.',
      },
      {
        n: '5',
        original: 'Vinnsla lífkennaupplýsinga í því skyni að greina eða staðfesta deili á einstaklingi með ótvíræðum hætti...',
        summary: 'Biometric data to identify or verify a person uniquely, combined with at least one other criterion (e.g. large-scale biometric processing).',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) excludes verification-only uses; the Icelandic item covers both identification and verification.',
      },
      {
        n: '7',
        original: 'Vinnsla persónuupplýsinga sem felur í sér vöktun vinnuskila eða hegðunar starfsmanna.',
        summary: 'Monitoring employees\' work output or behaviour (e.g. internet use, electronic communications, camera surveillance).',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '8',
        original: 'Vinnsla persónuupplýsinga þar sem beitt er nýrri tækni eða eldri tækni er beitt á nýjan hátt...',
        summary: 'New technology, or old technology used in a new way, combined with at least one other criterion (e.g. health data from implantable medical devices).',
        tags: ['innovative-technology', 'health'],
        annexIII: [],
      },
      {
        n: '9',
        original: 'Vinnsla persónuupplýsinga í því skyni að leggja, með kerfisbundnum hætti, mat á færni, hæfni, útkomu úr prófunum, andlega heilsu eða þroska.',
        summary: 'Systematic evaluation of proficiency, skills, test results, mental health or development.',
        tags: ['profiling-scoring', 'health'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Vinnsla persónuupplýsinga í þeim tilgangi að veita þjónustu eða þróa vörur ætlaðar til notkunar í viðskiptatilgangi, þar sem spáð er fyrir um starfsgetu, efnahagslega stöðu, heilsu...',
        summary: 'Providing services or developing commercial products that predict working capacity, economic status, health, opinions or interests, reliability, behaviour, location or routes, combined with at least one other criterion.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '12',
        original: 'Umfangsmikil vinnsla með viðkvæmar persónuupplýsingar, eða aðrar persónuupplýsingar viðkvæms eðlis, í því skyni að þróa algrím.',
        summary: 'Large-scale processing of sensitive or highly personal data for the purpose of developing algorithms (English EDPB version: \'for training of algorithms\').',
        tags: ['innovative-technology', 'health'],
        annexIII: [],
      },
      {
        n: '13',
        original: 'Umfangsmikil söfnun persónuupplýsinga, sem fer fram í gegnum „Internet hlutanna“ eða lausnir sem fylgjast með ástandi og hreyfingu einstaklinga, svo sem snjallúr.',
        summary: 'Large-scale collection via the Internet of Things or solutions that monitor people\'s condition and movement, such as smartwatches.',
        tags: ['innovative-technology', 'large-scale-monitoring', 'health'],
        annexIII: [],
      },
      {
        n: '14',
        original: 'Vinnsla persónuupplýsinga sem kemur í veg fyrir að hinn skráði fái notið tiltekinna réttinda eða fái fyrirgreiðslu, þjónustu eða samning...',
        summary: 'Processing that prevents exercise of a right or access to credit, a service or a contract, combined with one other criterion (e.g. a financial institution checking creditworthiness to decide on a loan).',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Annex III point 5(b) (creditworthiness).',
      },
    ],
  },
  {
    id: 'ie',
    country: 'Ireland',
    authority: 'Data Protection Commission',
    authorityShort: 'DPC',
    authorityOriginal: 'Data Protection Commission (DPC)',
    titleOriginal: 'List of Types of Data Processing Operations which require a Data Protection Impact Assessment',
    titleEn: 'List of Types of Data Processing Operations which require a Data Protection Impact Assessment',
    adopted: '2018-11-15',
    edpbOpinion: { n: '11/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-112018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/ie_dpc_data-protection-impact-assessment.pdf',
    nationalUrl: 'https://www.dataprotection.ie/sites/default/files/uploads/2018-11/Data-Protection-Impact-Assessment.pdf',
    language: 'en',
    method: 'enumerated',
    itemCount: 10,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '2',
        original: 'Profiling vulnerable persons including children to target marketing or online services at such persons.',
        summary: 'Profiling vulnerable persons, including children, to target marketing or online services at them.',
        tags: ['children', 'vulnerable-subjects', 'profiling-scoring'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Use of profiling or algorithmic means or special category data as an element to determine access to services or that results in legal or similarly significant effects.',
        summary: 'Use of profiling, algorithmic means or special category data to determine access to services, or with legal or similarly significant effects.',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Item names \'access to services\'; Annex III point 5 is limited to essential private and public services and benefits (incl. creditworthiness and life/health insurance pricing), so the overlap is partial.',
      },
      {
        n: '4',
        original: 'Systematically monitoring, tracking or observing individuals\' location or behaviour.',
        summary: 'Systematic monitoring, tracking or observation of individuals\' location or behaviour.',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '5',
        original: 'Profiling individuals on a large-scale.',
        summary: 'Large-scale profiling of individuals.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '6',
        original: 'Processing biometric data to uniquely identify an individual or individuals or enable or allow the identification or authentication of an individual or individuals in combination with any of the other criteria set out in WP29 DPIA Guidelines.',
        summary: 'Biometric identification or authentication combined with any other WP248 criterion.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) excludes biometric verification whose sole purpose is to confirm identity; the Irish item also covers authentication.',
      },
      {
        n: '9',
        original: 'Combining, linking or cross-referencing separate datasets where such linking significantly contributes to or is used for profiling or behavioural analysis of individuals...',
        summary: 'Combining or cross-referencing separate datasets where this is used for profiling or behavioural analysis, especially across sources, purposes or controllers.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'it',
    country: 'Italy',
    authority: 'Garante per la protezione dei dati personali',
    authorityShort: 'Garante per la protezione dei dati personali',
    authorityOriginal: 'Garante per la protezione dei dati personali',
    titleOriginal: 'Elenco delle tipologie di trattamenti soggetti al requisito di una valutazione d\'impatto sulla protezione dei dati ai sensi dell\'art. 35, comma 4, del Regolamento (UE) n. 2016/679 (Provvedimento n. 467 dell\'11 ottobre 2018)',
    titleEn: 'List of the kinds of processing subject to the requirement of a data protection impact assessment under Art. 35(4) GDPR (Decision No. 467 of 11 October 2018)',
    adopted: '2018-10-11',
    edpbOpinion: { n: '12/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-122018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/it_dpia_blacklist.pdf',
    nationalUrl: 'https://www.garanteprivacy.it/web/guest/home/docweb/-/docweb-display/docweb/9058979',
    language: 'it',
    method: 'enumerated',
    itemCount: 12,
    aiNamed: true,
    aiNamedInRegister: true,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '1',
        original: 'Trattamenti valutativi o di scoring su larga scala, nonché trattamenti che comportano la profilazione degli interessati nonché lo svolgimento di attività predittive...',
        summary: 'Large-scale evaluation or scoring, profiling and predictive activities, also online or via apps, on work performance, economic situation, health, preferences, reliability, behaviour, location or movements.',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '2',
        original: 'Trattamenti automatizzati finalizzati ad assumere decisioni che producono "effetti giuridici" oppure che incidono "in modo analogo significativamente" sull\'interessato... (ad es. screening dei clienti di una banca attraverso l\'utilizzo di dati registrati in una centrale rischi).',
        summary: 'Automated processing to take decisions with legal or similarly significant effects, including decisions preventing use of a good or service or continuation of a contract (e.g. screening bank customers using credit bureau data).',
        tags: ['automated-decision'],
        annexIII: ['essential-services'],
        overlapNote: 'The credit-bureau screening example corresponds to Annex III point 5(b) (creditworthiness).',
      },
      {
        n: '3',
        original: 'Trattamenti che prevedono un utilizzo sistematico di dati per l\'osservazione, il monitoraggio o il controllo degli interessati...',
        summary: 'Systematic use of data to observe, monitor or control data subjects, incl. network/online collection, unique identifiers of information-society service users over long periods, and metadata processing.',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '5',
        original: 'Trattamenti effettuati nell\'ambito del rapporto di lavoro mediante sistemi tecnologici (anche con riguardo ai sistemi di videosorveglianza e di geolocalizzazione) dai quali derivi la possibilità di effettuare un controllo a distanza dell\'attività dei dipendenti...',
        summary: 'Processing in the employment relationship through technological systems (incl. video surveillance and geolocation) enabling remote monitoring of employees\' activity.',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) (monitoring behaviour of workers) where an AI system is used.',
      },
      {
        n: '7',
        original: 'Trattamenti effettuati attraverso l\'uso di tecnologie innovative, anche con particolari misure di carattere organizzativo (es. IoT; sistemi di intelligenza artificiale; utilizzo di assistenti vocali on-line attraverso lo scanning vocale e testuale; monitoraggi effettuati da dispositivi wearable; tracciamenti di prossimità come ad es. il wi-fi tracking) ogniqualvolta ricorra anche almeno un altro dei criteri individuati nel WP 248, rev. 01.',
        summary: 'Processing with innovative technologies (e.g. IoT, artificial intelligence systems, online voice assistants, wearable monitoring, proximity tracking such as wi-fi tracking) whenever at least one other WP248 criterion is met.',
        tags: ['ai-explicit', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Trattamenti sistematici di dati biometrici, tenendo conto, in particolare, del volume dei dati, della durata, ovvero della persistenza, dell\'attività di trattamento.',
        summary: 'Systematic processing of biometric data (clarified as biometric data for unique identification), considering volume, duration or persistence.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1 covers AI biometric identification, categorisation and emotion recognition; the item covers biometric processing generally.',
      },
    ],
  },
  {
    id: 'lv',
    country: 'Latvia',
    authority: 'Data State Inspectorate',
    authorityShort: 'DVI',
    authorityOriginal: 'Datu valsts inspekcija (DVI) / Data State Inspectorate',
    titleOriginal: 'Apstrādes darbību veidi, attiecībā uz kuriem ir jāveic datu aizsardzības ietekmes novērtējums saskaņā ar VDAR 35. panta 4. punktu',
    titleEn: 'List of processing operations requiring data protection impact assessment pursuant to Article 35(4) of the GDPR',
    adopted: '2018-12-18',
    edpbOpinion: { n: '14/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-142018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/lv_sa_dpia_final_list_20181212.pdf',
    nationalUrl: 'https://www.dvi.gov.lv/lv/media/92/download',
    language: 'lv',
    method: 'enumerated',
    itemCount: 13,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: 'https://www.dvi.gov.lv/lv/jaunums/izstradats-saraksts-ar-apstrades-darbibam-kuram-nida-nav-javeic',
    note: 'Approved by order of 18 December 2018; dated 14 March 2019 in the EDPB register. A separate Art. 35(5) list followed on 6 March 2025.',
    items: [
      {
        n: '5',
        original: 'Datu subjekta uzraudzība, kas tiek veikta šādos gadījumos: a. ja to veic plašā apjomā; b. ja to veic darbavietā; c. ja tā attiecināma uz īpaši aizsargājamiem datu subjektiem...',
        summary: 'Surveillance of data subjects when large-scale, at the workplace, or directed at vulnerable subjects (health care, social care, prisons, educational institutions, workplace).',
        tags: ['large-scale-monitoring', 'employee-monitoring', 'vulnerable-subjects'],
        annexIII: [],
      },
      {
        n: '6',
        original: 'Datu apstrāde, izmantojot inovatīvas tehnoloģijas, mehānismus vai metodes, kopā ar vismaz vienu no Kritērijiem.',
        summary: 'Processing using innovative technologies, mechanisms or methods, combined with at least one criterion.',
        tags: ['innovative-technology'],
        annexIII: [],
      },
      {
        n: '7',
        original: 'Darbinieku novērošana.',
        summary: 'Monitoring (observation) of employees; English EDPB version: \'measures for systematic monitoring of employee activities\'.',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '8',
        original: 'Plaša mēroga datu subjektu izsekošana, tostarp dzīvesveida lietotnes vai loģistikas uzņēmumi.',
        summary: 'Large-scale tracking of data subjects, incl. lifestyle apps or logistics companies.',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '10',
        original: 'Datu apstrāde attiecināma uz informācijas sabiedrības pakalpojumu piedāvājumu tieši bērnam.',
        summary: 'Information-society services offered directly to a child.',
        tags: ['children'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Automātiska personas datu apstrāde plašā mērogā un datu apstrāde, kā pamatā ir profilēšana.',
        summary: 'Large-scale automated processing and processing based on profiling.',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: [],
      },
      {
        n: '13',
        original: 'Biometrisko datu apstrāde ar mērķi identificēt fizisku personu, kopā ar vismaz vienu no Kritērijiem.',
        summary: 'Biometric data to identify a person, combined with at least one criterion.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used.',
      },
    ],
  },
  {
    id: 'li',
    country: 'Liechtenstein',
    authority: 'Datenschutzstelle Fürstentum Liechtenstein',
    authorityShort: 'DSS',
    authorityOriginal: 'Datenschutzstelle Fürstentum Liechtenstein (DSS)',
    titleOriginal: 'Liste der Verarbeitungstätigkeiten gemäss Art. 35 Abs. 4 DSGVO, für die die Datenschutzstelle als Datenschutzaufsichtsbehörde in Liechtenstein eine Datenschutz-Folgenabschätzung (DSFA) verlangt',
    titleEn: 'List of processing operations according to Art. 35(4) GDPR for which the Data Protection Authority (DSS) requires a data protection impact assessment (DPIA)',
    adopted: '2019-02-27',
    edpbOpinion: { n: '01/2019', date: null, url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-012019-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/dsfa_-_dpia.pdf',
    nationalUrl: 'https://www.datenschutzstelle.li/download_file/view/251',
    language: 'de',
    method: 'enumerated',
    itemCount: 11,
    aiNamed: true,
    aiNamedInRegister: false,
    lastUpdate: '2020-08-06',
    updateEvidenceUrl: 'https://www.datenschutzstelle.li/download_file/view/251',
    note: 'The register holds the version of 27 February 2019, which says "deep learning" but not "artificial intelligence"; the authority now publishes a version of 6 August 2020 that names "Künstliche Intelligenz und Deep-Learning-Technologien".',
    items: [
      {
        n: '2',
        original: 'Systematische Verarbeitung unter Einsatz von innovativen Technologien, wenn zusätzlich mindestens ein weiteres Kriterium der europäischen Leitlinien erfüllt ist.',
        summary: 'Systematic processing using innovative technologies plus one further criterion. 2020 German examples: building and home automation; autonomous driving; intelligent transport systems; medical telemetry; \'Künstliche Intelligenz und Deep-Learning-Technologien\'; image recognition. (2019 English EDPB version: \'Deep learning platforms; Image recognition\'.)',
        tags: ['ai-explicit', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Systematisches Tracking (einschliesslich, aber nicht beschränkt auf Online-Anwendungen), wenn zusätzlich mindestens ein weiteres Kriterium der europäischen Leitlinien erfüllt ist.',
        summary: 'Systematic tracking (incl. online) plus one further criterion (GPS/WiFi tracking of passers-by, mobile-phone traffic analysis, wearables).',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '4',
        original: 'Kombination oder Abgleich personenbezogener Daten, die aus unterschiedlichen Quellen generiert werden und deren Verarbeitung, wenn zusätzlich mindestens ein weiteres Kriterium der europäischen Leitlinien erfüllt ist.',
        summary: 'Combining or matching data from different sources plus one further criterion (fraud/AML detection, direct marketing, loyalty, CRM, background checks for recruitment).',
        tags: ['profiling-scoring'],
        annexIII: ['employment'],
        overlapNote: 'Recruitment background checks correspond to Annex III point 4(a) (evaluating candidates) where an AI system is used; fraud detection is excluded from 5(b).',
      },
      {
        n: '5',
        original: 'Verweigerung von Leistungen, die zwar einer menschlichen Entscheidung unterliegen, aber unter zusätzlicher Mithilfe von automatisierter Entscheidungsfindung (einschliesslich Profiling) erfolgen, wenn zusätzlich mindestens ein weiteres Kriterium der europäischen Leitlinien erfüllt ist.',
        summary: 'Denial of services that are subject to a human decision but made with the additional help of automated decision-making (incl. profiling), plus one further criterion. Examples: refusal of a credit application after creditworthiness check; negative decisions on job applications; deciding whether to accept a customer again or change their conditions.',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: ['essential-services', 'employment'],
        overlapNote: 'Credit refusal (Annex III 5(b)) and negative recruitment decisions (Annex III 4(a)).',
      },
      {
        n: '6',
        original: 'Systematische Überwachung am Arbeitsplatz',
        summary: 'Systematic workplace monitoring (e-mail and internet use, call recording, badge location tracking, GPS in company vehicles, movement profiles via RFID or phone tracking).',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '8',
        original: 'Verarbeitung von biometrischen Daten im Sinne von Art. 4 Ziff. 14 DSGVO zur eindeutigen Identifizierung natürlicher Personen, wenn zusätzlich mindestens ein Kriterium der europäischen Leitlinien erfüllt ist.',
        summary: 'Biometric data for unique identification plus one further criterion (facial recognition to monitor people in retail, face or fingerprint unlock, facial recognition in social media, fingerprint access control, school canteen fingerprint payment).',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Retail facial-recognition monitoring corresponds to Annex III point 1(a); unlock/access examples are verification uses excluded from 1(a).',
      },
      {
        n: '11',
        original: 'Verarbeitung personenbezogener Daten von Kindern oder anderen schutzbedürftigen Personen ... für Marketing, Profiling für automatische Entscheidungsfindung oder für Angebote von Online-Diensten.',
        summary: 'Data of children or other vulnerable persons (even if not large scale) for marketing, profiling for automated decisions or online services.',
        tags: ['children', 'vulnerable-subjects', 'profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'lt',
    country: 'Lithuania',
    authority: 'State Data Protection Inspectorate',
    authorityShort: 'VDAI',
    authorityOriginal: 'Valstybinė duomenų apsaugos inspekcija (VDAI) / State Data Protection Inspectorate',
    titleOriginal: 'Duomenų tvarkymo operacijų, kurioms taikomas reikalavimas atlikti poveikio duomenų apsaugai vertinimą, sąrašas',
    titleEn: 'List of data processing operations subject to the requirement to perform data protection impact assessment',
    adopted: '2019-03-14',
    edpbOpinion: { n: '13/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-132018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/lt-dpia_list_en_20190314.pdf',
    nationalUrl: 'https://e-seimas.lrs.lt/portal/legalAct/lt/TAD/bf815bd2469811e98bc2ba0c0453c004',
    language: 'lt',
    method: 'enumerated',
    itemCount: 10,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: 'https://e-seimas.lrs.lt/portal/legalAct/lt/TAD/bf815bd2469811e98bc2ba0c0453c004',
    items: [
      {
        n: '4',
        original: 'Biometrinių duomenų, kuriais siekiama konkrečiai nustatyti fizinio asmens tapatybę, tvarkymas duomenų subjektų stebėsenos ar kontrolės tikslais arba kai tvarkomi pažeidžiamų duomenų subjektų asmens duomenys.',
        summary: 'Biometric data for unique identification used for monitoring or control, or concerning vulnerable data subjects.',
        tags: ['biometrics', 'large-scale-monitoring', 'vulnerable-subjects'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used.',
      },
      {
        n: '5',
        original: 'Genetinių duomenų tvarkymas vykdant duomenų subjekto savybių vertinimą arba balų skyrimą, įskaitant profiliavimą ir prognozavimą.',
        summary: 'Genetic data used for evaluating or scoring characteristics, incl. profiling and forecasting.',
        tags: ['profiling-scoring', 'health'],
        annexIII: [],
      },
      {
        n: '6',
        original: 'Asmens vaizdo duomenų tvarkymas, kai vaizdo stebėjimas vykdomas bent vienu iš žemiau nurodytų atvejų...',
        summary: 'Video surveillance in premises not controlled by the controller, in health, social care, detention or other institutions serving vulnerable persons, or combined with sound recording.',
        tags: ['large-scale-monitoring', 'vulnerable-subjects'],
        annexIII: [],
      },
      {
        n: '8',
        original: 'Asmens duomenų tvarkymas naudojant inovatyvias technologijas arba egzistuojančias technologijas panaudojant nauju būdu, kai tvarkomi pažeidžiamų duomenų subjektų asmens duomenys.',
        summary: 'Innovative technologies, or existing technologies used in a new way, when data of vulnerable data subjects are processed.',
        tags: ['innovative-technology', 'vulnerable-subjects'],
        annexIII: [],
      },
      {
        n: '9',
        original: 'Vaikų asmens duomenų tvarkymas tiesioginės rinkodaros tikslais, vaikų asmeninių aspektų vertinimas, kuris yra grindžiamas automatizuotu tvarkymu, įskaitant profiliavimą, arba kai vaikams tiesiogiai yra siūlomos informacinės visuomenės paslaugos.',
        summary: 'Children\'s data for direct marketing, automated evaluation of children\'s personal aspects incl. profiling, or information-society services offered directly to children.',
        tags: ['children', 'profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
      {
        n: '10',
        original: 'Darbuotojų asmens duomenų tvarkymas stebėsenos ar kontrolės tikslais...',
        summary: 'Employees\' data for monitoring or control: video and/or audio at the workplace; monitoring of employees\' communication, behaviour, location or movement.',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
    ],
  },
  {
    id: 'lu',
    country: 'Luxembourg',
    authority: 'Commission nationale pour la protection des données',
    authorityShort: 'CNPD',
    authorityOriginal: 'Commission nationale pour la protection des données (CNPD)',
    titleOriginal: 'Délibération n° 34/2019 du 6 mars 2019 portant adoption de la liste des types d\'opérations de traitement pour lesquelles une analyse d\'impact relative à la protection des données est requise',
    titleEn: 'Decision No 34/2019 of 6 March 2019 adopting the list of types of processing operations subject to the requirement of a data protection impact assessment',
    adopted: '2019-03-06',
    edpbOpinion: { n: '26/2018', date: '2018-12-04', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-262018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/lux_en_delib_34_liste_dpia_en_0.pdf',
    nationalUrl: 'https://cnpd.public.lu/dam-assets/fr/actualites/national/2019/Delib-34-2019-du-6-mars-2019.pdf',
    language: 'fr',
    method: 'enumerated',
    itemCount: 8,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    items: [
      {
        n: '2',
        original: 'Les opérations de traitement qui incluent des données biométriques telles que définies à l\'article 4 (14) du RGPD aux fins d\'identification des personnes concernées en combinaison avec au moins un autre critère des lignes directrices du CEPD',
        summary: 'Processing of biometric data for identification of data subjects, combined with at least one other EDPB/WP248 criterion.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used.',
      },
      {
        n: '3',
        original: 'Les opérations de traitement impliquant la combinaison, la correspondance ou la comparaison de données à caractère personnel collectées à partir d\'opérations de traitement ayant des finalités différentes ... à condition qu\'elles produisent des effets juridiques...',
        summary: 'Combining, matching or comparing data collected for different purposes, provided this produces legal or similarly significant effects.',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: [],
      },
      {
        n: '4',
        original: 'Les opérations de traitement qui consistent en ou qui comprennent un contrôle régulier et systématique des activités des employés - à condition qu\'elles puissent produire des effets juridiques à l\'égard des employés ou les affecter de manière aussi significative',
        summary: 'Regular and systematic monitoring of employee activities where it may produce legal or similarly significant effects on employees.',
        tags: ['employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '7',
        original: 'Les opérations de traitement qui consistent en un suivi systématique de la localisation de personnes physiques',
        summary: 'Systematic tracking of natural persons\' location.',
        tags: ['large-scale-monitoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'pl',
    country: 'Poland',
    authority: 'Personal Data Protection Office',
    authorityShort: 'UODO',
    authorityOriginal: 'Urząd Ochrony Danych Osobowych (UODO) / Personal Data Protection Office',
    titleOriginal: 'Wykaz rodzajów operacji przetwarzania danych osobowych wymagających oceny skutków przetwarzania dla ich ochrony (Komunikat Prezesa UODO z dnia 17 czerwca 2019 r., M.P. 2019 poz. 666)',
    titleEn: 'List of types of personal data processing operations requiring a data protection impact assessment',
    adopted: '2019-06-17',
    edpbOpinion: { n: '17/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-172018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/pl-dpia-list_monitor_polski.pdf',
    nationalUrl: 'https://eli.gov.pl/eli/MP/2019/666/ogl',
    language: 'pl',
    method: 'scored',
    itemCount: 12,
    aiNamed: true,
    aiNamedInRegister: true,
    lastUpdate: '2019-06-17',
    updateEvidenceUrl: 'https://eli.gov.pl/api/acts/MP/2019/666/text.pdf',
    note: 'Communication of 17 June 2019 (Monitor Polski 2019 item 666), which repealed the list of 17 August 2018. At least two of its 12 criteria generally require a DPIA.',
    items: [
      {
        n: '1',
        original: 'Ewaluacja lub ocena, w tym profilowanie i przewidywanie (analiza behawioralna) w celach wywołujących negatywne skutki prawne, fizyczne, finansowe lub inne niedogodności dla osób fizycznych',
        summary: 'Evaluation or assessment, incl. profiling and prediction (behavioural analysis), with negative legal, physical, financial or other effects. Example: \'Ocena zdolności kredytowej, przy użyciu algorytmów sztucznej inteligencji\' (creditworthiness assessment using artificial intelligence algorithms covered by secrecy); insurers pricing premiums from lifestyle, diet or driving.',
        tags: ['ai-explicit', 'profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Creditworthiness assessment with AI algorithms corresponds to Annex III point 5(b); lifestyle-based insurance pricing overlaps 5(c) only for life and health insurance.',
      },
      {
        n: '2',
        original: 'Zautomatyzowane podejmowanie decyzji wywołujących skutki prawne, finansowe lub podobne istotne skutki',
        summary: 'Automated decision-making with legal, financial or similarly significant effects. Examples: traffic monitoring with automated vehicle identification, automated toll collection, automated promotional pricing from customer profiles.',
        tags: ['automated-decision'],
        annexIII: [],
      },
      {
        n: '3',
        original: 'Systematyczne monitorowanie na dużą skalę miejsc dostępnych publicznie wykorzystujące elementy rozpoznawania cech lub właściwości obiektów...',
        summary: 'Large-scale systematic monitoring of public places using recognition of features of objects (excluding CCTV recorded only for incident analysis). Areas include workplaces (monitoring e-mail, software use, access cards), IoT wearables, vehicle M2M, RFID.',
        tags: ['large-scale-monitoring', 'employee-monitoring', 'innovative-technology'],
        annexIII: ['employment'],
        overlapNote: 'Workplace monitoring examples correspond to Annex III point 4(b) where an AI system is used.',
      },
      {
        n: '5',
        original: 'Przetwarzanie danych biometrycznych wyłącznie w celu identyfikacji osoby fizycznej bądź w celu kontroli dostępu',
        summary: 'Biometric data solely for identifying a person or for access control. Areas: facial recognition systems, workplace identity verification, voice/fingerprint/face recognition in devices, banking.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) covers remote biometric identification; access-control verification is excluded.',
      },
      {
        n: '8',
        original: 'Przeprowadzanie porównań, ocena lub wnioskowanie na podstawie analizy danych pozyskanych z różnych źródeł',
        summary: 'Comparisons, evaluation or inference from analysis of data from various sources (e.g. marketing profiles, combining public registers).',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '9',
        original: 'Przetwarzanie danych dotyczących osób, których ocena i świadczone im usługi są uzależnione od podmiotów lub osób, które dysponują uprawnieniami nadzorczymi i/lub ocennymi',
        summary: 'Data of persons whose evaluation and services depend on entities with supervisory or evaluating powers. Examples: job services adapting offers to employers\' preferences, classifying persons by age or sex to present offers; whistleblowing systems.',
        tags: ['profiling-scoring', 'vulnerable-subjects'],
        annexIII: ['employment'],
        overlapNote: 'Job-offer targeting by classification corresponds to Annex III point 4(a) (placing targeted job advertisements) where an AI system is used.',
      },
      {
        n: '10',
        original: 'Innowacyjne wykorzystanie lub zastosowanie rozwiązań technologicznych lub organizacyjnych',
        summary: 'Innovative use of technological or organisational solutions. Examples: smart meters enabling profiling, IoT/wearables, devices with microphones and cameras, interactive toys for children, international telemedicine.',
        tags: ['innovative-technology', 'children', 'health'],
        annexIII: [],
      },
      {
        n: '11',
        original: 'Gdy przetwarzanie samo w sobie uniemożliwia osobom, których dane dotyczą, wykonywanie prawa lub korzystanie z usługi lub umowy',
        summary: 'Processing that itself prevents exercising a right or using a service or contract. Examples: credit decisions from debtor databases; making service availability depend on income and profiling results.',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Credit decisions correspond to Annex III point 5(b).',
      },
      {
        n: '12',
        original: 'Przetwarzanie danych lokalizacyjnych',
        summary: 'Processing of location data (IoT, home and remote working, employees\' location data).',
        tags: ['large-scale-monitoring', 'employee-monitoring'],
        annexIII: [],
      },
    ],
  },
  {
    id: 'si',
    country: 'Slovenia',
    authority: 'Information Commissioner',
    authorityShort: 'IP-RS',
    authorityOriginal: 'Informacijski pooblaščenec (IP-RS) / Information Commissioner',
    titleOriginal: 'Seznam dejanj obdelav osebnih podatkov, za katere velja zahteva po izvedbi ocene učinka v zvezi z varstvom osebnih podatkov po 4. odstavku člena 35 Uredbe (EU) 2016/679 [title of the 24 May 2018 draft; the Slovenian title of the final 21 Dec 2018 list was not retrieved]',
    titleEn: 'The list of the kind of processing operations which are subject to the requirement for a Data Protection Impact Assessment under the Article 35(4) of the General Data Protection Regulation (EU) 2016/679 (GDPR)',
    adopted: '2018-12-21',
    edpbOpinion: { n: '27/2018', date: '2018-12-04', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-272018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/si_dpia_list_35-4_35-6_slovenia_revised_21dec2018.pdf',
    nationalUrl: 'https://www.ip-rs.si/zakonodaja/reforma-evropskega-zakonodajnega-okvira-za-varstvo-osebnih-podatkov/kljucna-podrocja-uredbe/ocena-ucinka-v-zvezi-z-varstvom-podatkov/',
    language: 'sl',
    method: 'scored',
    itemCount: 11,
    aiNamed: false,
    aiNamedInRegister: false,
    lastUpdate: null,
    updateEvidenceUrl: null,
    note: 'The Slovenian text of the final list could not be retrieved (the authority\'s site refused automated access); items come from the English letter to the EDPB in the register.',
    items: [
      {
        n: '1',
        original: 'Extensive evaluation and profiling of individuals',
        summary: 'Large-scale scoring, evaluation, prediction and profiling (e.g. creditworthiness from the central credit register; profiling drivers from driving data for personalised insurance).',
        tags: ['profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Creditworthiness example corresponds to Annex III point 5(b); motor insurance is outside 5(c).',
      },
      {
        n: '2',
        original: 'Automated-decision making with legal or similar significant effect',
        summary: 'Automated decisions with legal or similar effects, e.g. on creditworthiness, social benefits entitlement, scholarship entitlement, job qualifications, health insurance entitlement.',
        tags: ['automated-decision'],
        annexIII: ['essential-services'],
        overlapNote: 'Creditworthiness (5(b)), social benefits (5(a)) and health insurance (5(c) covers risk assessment and pricing) examples; scholarship and job-qualification examples may touch points 3 and 4 but are not specific enough to assert.',
      },
      {
        n: '3',
        original: 'Systematic monitoring of individuals',
        summary: 'Systematic observation or surveillance people cannot avoid, e.g. automated number plate recognition, toll systems, e-government, passenger name record screening, offender blacklists, drone video surveillance, public-space CCTV, mass processing by law enforcement.',
        tags: ['large-scale-monitoring'],
        annexIII: ['law-enforcement'],
        overlapNote: 'The example \'mass or systematic processing by law enforcement in connection with criminal and minor offences\' is in the Annex III point 6 domain, which lists only specific AI uses.',
      },
      {
        n: '6',
        original: 'Matching or combining of different datasets (e.g. obtained through different activities of data controllers) and big data analytics',
        summary: 'Matching or combining datasets and big data analytics (insurance claims trends, matching employee absenteeism with gender/age/education, shopping and movement habits, nation-wide registries).',
        tags: ['profiling-scoring'],
        annexIII: [],
      },
      {
        n: '8',
        original: 'Innovative use or applying new technological or organisational solutions',
        summary: 'Innovative technologies with poorly understood consequences, e.g. intelligent video analytics systems, drones, some IoT such as smart metering.',
        tags: ['innovative-technology', 'large-scale-monitoring'],
        annexIII: [],
      },
      {
        n: '9',
        original: 'When the processing in itself prevents data subjects from exercising a right or using a service or a contract',
        summary: 'Processing that allows, modifies or refuses access to a service or contract (nation-wide electronic toll collection; pre-screening against a credit reference database).',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Credit pre-screening corresponds to Annex III point 5(b).',
      },
      {
        n: '10',
        original: 'Processing of biometric data which is processed for the purpose of uniquely identifying a natural person in conjunction with at least one other criterion',
        summary: 'Fingerprints, faces or other biometric traits for unique identification, with at least one other criterion.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) where an AI remote biometric identification system is used.',
      },
    ],
  },
  {
    id: 'gb',
    country: 'United Kingdom',
    authority: 'Information Commissioner\'s Office',
    authorityShort: 'ICO',
    authorityOriginal: 'Information Commissioner\'s Office (ICO)',
    titleOriginal: 'Examples of processing \'likely to result in high risk\'',
    titleEn: 'Examples of processing \'likely to result in high risk\'',
    adopted: '2018-12-18',
    edpbOpinion: { n: '22/2018', date: '2018-09-25', url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-222018-on-the-draft-list-of-the-competent-supervisory_en' },
    url: 'https://www.edpb.europa.eu/system/files/decisions/uk_ico_article_354_list_for_edpb.pdf',
    nationalUrl: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/examples-of-processing-likely-to-result-in-high-risk/',
    language: 'en',
    method: 'enumerated',
    itemCount: 10,
    aiNamed: true,
    aiNamedInRegister: true,
    lastUpdate: null,
    updateEvidenceUrl: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/accountability-and-governance/data-protection-impact-assessments-dpias/examples-of-processing-likely-to-result-in-high-risk/',
    note: 'The UK is no longer an EU or EEA state; the list stays in the EDPB register as submitted in 2018. The ICO says its DPIA guidance is under review after the Data (Use and Access) Act; no dated revision of the list was found.',
    items: [
      {
        n: 'Innovative technology',
        original: 'Innovative technologies: Processing involving the use of new technologies, or the novel application of existing technologies (including AI).',
        summary: 'DPIA required for innovative use of technology combined with any other WP248 criterion. Examples: artificial intelligence, machine learning and deep learning; connected and autonomous vehicles; intelligent transport systems; smart technologies incl. wearables; market research involving neuro-measurement (emotional response analysis and brain activity); some IoT applications.',
        tags: ['ai-explicit', 'innovative-technology'],
        annexIII: [],
      },
      {
        n: 'Denial of service',
        original: 'Denial of service: Decisions about an individual\'s access to a product, service, opportunity or benefit which are based to any extent on automated decision-making (including profiling) or involves the processing of special category data.',
        summary: 'Decisions on access to a product, service, opportunity or benefit based to any extent on automated decision-making or profiling. Examples: credit checks, mortgage or insurance applications, other contract pre-checks (e.g. smartphones).',
        tags: ['automated-decision', 'profiling-scoring'],
        annexIII: ['essential-services'],
        overlapNote: 'Credit checks and insurance applications fall within Annex III point 5 (5(b) creditworthiness/credit score; 5(c) only life and health insurance). The ICO item is wider (any product, service, opportunity or benefit).',
      },
      {
        n: 'Large-scale profiling',
        original: 'Large-scale profiling: Any profiling of individuals on a large scale.',
        summary: 'Any profiling of individuals on a large scale. Examples: smart meter or IoT data, fitness/lifestyle monitoring, social media networks, \'Application of AI to existing process\'.',
        tags: ['ai-explicit', 'profiling-scoring'],
        annexIII: [],
      },
      {
        n: 'Biometric data',
        original: 'Biometric data: Any processing of biometric data for the purpose of uniquely identifying an individual.',
        summary: 'Biometric processing for unique identification, combined with any other WP248 criterion. Examples: facial recognition systems, workplace access/identity verification, voice/fingerprint/facial recognition for access control.',
        tags: ['biometrics'],
        annexIII: ['biometrics'],
        overlapNote: 'Annex III point 1(a) covers remote biometric identification and excludes verification-only systems; several ICO examples (access control, identity verification) are verification uses outside Annex III 1(a).',
      },
      {
        n: 'Tracking',
        original: 'Tracking: Processing which involves tracking an individual\'s geolocation or behaviour, including but not limited to the online environment.',
        summary: 'Tracking of geolocation or behaviour, combined with any other WP248 criterion. Examples include online and cross-device tracking, eye tracking, data processing at the workplace, home and remote working, processing location data of employees.',
        tags: ['large-scale-monitoring', 'employee-monitoring'],
        annexIII: ['employment'],
        overlapNote: 'Workplace and employee-location examples correspond to Annex III point 4(b) (monitoring the performance and behaviour of persons in work relationships) only where an AI system is used.',
      },
      {
        n: 'Targeting of children/other vulnerable individuals',
        original: 'Targeting of children/other vulnerable individuals for marketing, profiling for auto decision making or the offer of online services',
        summary: 'Use of children\'s or other vulnerable individuals\' data for marketing, profiling or other automated decision-making, or offering online services directly to children. Examples: connected toys, social networks.',
        tags: ['children', 'vulnerable-subjects', 'profiling-scoring', 'automated-decision'],
        annexIII: [],
      },
    ],
  },
];

/** Language names for the ISO 639-1 codes the lists use. */
export const languageName: Readonly<Record<string, string>> = {
  bg: 'Bulgarian',
  cs: 'Czech',
  et: 'Estonian',
  fi: 'Finnish',
  fr: 'French',
  de: 'German',
  el: 'Greek',
  hu: 'Hungarian',
  is: 'Icelandic',
  en: 'English',
  it: 'Italian',
  lv: 'Latvian',
  lt: 'Lithuanian',
  pl: 'Polish',
  sl: 'Slovenian',
};

/** Lists in table order: by country name. */
export const listsByCountry = (): DpiaList[] =>
  [...lists].sort((a, b) => a.country.localeCompare(b.country, 'en'));

/** Whether a list covers a topic. */
export function listFlag(list: DpiaList, topic: DpiaTopic): boolean {
  if (topic === 'ai') return list.aiNamed;
  return list.items.some((item) => item.tags.includes(topic));
}

/** Annex III areas a list's items overlap, in Annex III order. */
export function listAnnexIII(list: DpiaList): AnnexIIIArea[] {
  const found = new Set(list.items.flatMap((item) => item.annexIII));
  return annexIIIOrder.filter((area) => found.has(area));
}

/** HTML anchor of a list row. */
export const listAnchor = (list: DpiaList): string => `dpia-${list.id}`;

/** HTML anchor of one item card. */
export const itemAnchor = (list: DpiaList, item: DpiaItem): string =>
  `dpia-${list.id}-${item.n.replace(/[^0-9a-z]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()}`;

// ---------------------------------------------------------------------------
// Counts the findings state (computed, never typed by hand).

export const listsWith = (topic: DpiaTopic): DpiaList[] => lists.filter((l) => listFlag(l, topic));

export const listsWithout = (topic: DpiaTopic): DpiaList[] => lists.filter((l) => !listFlag(l, topic));

export const allItems = (): { list: DpiaList; item: DpiaItem }[] =>
  lists.flatMap((list) => list.items.map((item) => ({ list, item })));

/** Earliest and latest adoption dates. */
export function adoptionRange(): { first: DpiaList; last: DpiaList } {
  const sorted = [...lists].sort((a, b) => a.adopted.localeCompare(b.adopted));
  return { first: sorted[0], last: sorted[sorted.length - 1] };
}

/** Lists with a dated change found after 2019. */
export const updatedAfter2019 = (): DpiaList[] =>
  lists.filter((l) => l.lastUpdate !== null && l.lastUpdate.slice(0, 4) > '2019');

/** Items and lists per Annex III area, most items first (then most lists); areas with none are dropped. */
export function annexIIICounts(): { area: AnnexIIIArea; items: number; lists: DpiaList[] }[] {
  return annexIIIOrder
    .map((area) => ({
      area,
      items: allItems().filter(({ item }) => item.annexIII.includes(area)).length,
      lists: listsByCountry().filter((l) => listAnnexIII(l).includes(area)),
    }))
    .filter((row) => row.lists.length > 0)
    .sort((a, b) => b.items - a.items || b.lists.length - a.lists.length);
}

export const methodCounts = (): Record<DpiaMethod, number> => ({
  enumerated: lists.filter((l) => l.method === 'enumerated').length,
  scored: lists.filter((l) => l.method === 'scored').length,
  mixed: lists.filter((l) => l.method === 'mixed').length,
});

/** EDPB opinions on draft Art. 35(4) lists adopted on 25 September 2018 (sources [5], [7]). */
export const OPINIONS_SEPT_2018 = 22;
/** Art. 35(4) opinions found on the EDPB site in total, 2018 to 2019 (source [7]). */
export const OPINIONS_TOTAL = 31;

// ---------------------------------------------------------------------------
// Credit. The page renders "Idea: ... · Research and data: ..."; the API
// publishes the same entries. `reviewers` stays empty until a named person has
// completed a review of this dataset for a released version (the same rule as
// bok/CONTRIBUTORS.md); a non-empty list renders a "Reviewed by" line.

export interface DpiaContributor {
  name: string;
  /** CRediT role(s). */
  roles: readonly ('conceptualization' | 'investigation' | 'data-curation')[];
  /** How the page labels the contribution. */
  label: string;
  url?: string;
}

export const contributors: readonly DpiaContributor[] = [
  {
    name: 'Aurélie Pols',
    roles: ['conceptualization'],
    label: 'Idea',
    url: 'https://www.linkedin.com/in/aureliepols',
  },
  {
    name: 'Jorge García Aibar',
    roles: ['investigation', 'data-curation'],
    label: 'Research and data',
    url: 'https://www.linkedin.com/in/jorgara',
  },
];

export interface DpiaReviewer {
  name: string;
  /** YYYY-MM-DD the review closed. */
  date: string;
  /** Dataset version reviewed. */
  version: string;
}

export const reviewers: readonly DpiaReviewer[] = [];

// ---------------------------------------------------------------------------
// Sources, in the house format (STYLEGUIDE.md §6). The list documents
// themselves are linked from their rows.

export const dpiaSources: readonly Source[] = [
  {
    title: 'Regulation (EU) 2016/679 (General Data Protection Regulation), Art. 35',
    gloss: 'DPIA where processing is likely to result in a high risk (35(1)); the three cases that always need one (35(3)); national lists of operations that need one (35(4)) and that do not (35(5))',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2016-04-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng#art_35',
    verified: 'primary',
  },
  {
    title: 'Guidelines on Data Protection Impact Assessment (DPIA) and determining whether processing is "likely to result in a high risk" for the purposes of Regulation 2016/679, WP248 rev.01',
    gloss: 'nine criteria; processing meeting two or more generally needs a DPIA; adopted 4 October 2017, endorsed by the EDPB on 25 May 2018',
    publisher: 'Article 29 Working Party',
    date: '2017-10-04',
    url: 'https://ec.europa.eu/newsroom/article29/items/611236/en',
    verified: 'primary',
  },
  {
    title: 'Regulation (EU) 2024/1689 (Artificial Intelligence Act), consolidated text of 2026-07-27, Art. 26(9), Art. 27(4) and Annex III',
    gloss: 'deployers use the Art. 13 information for their DPIA; the FRIA may cross-reference or include the relevant DPIA sections; the eight high-risk areas',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng',
    verified: 'primary',
  },
  {
    title: 'EDPB register of national DPIA lists (consistency mechanism, black list)',
    gloss: '18 Art. 35(4) lists in the register view, re-checked on 2026-09-28',
    publisher: 'European Data Protection Board',
    date: DPIA_AS_OF,
    url: 'https://www.edpb.europa.eu/search_en?key=high+risk+&type%5Bconsistency_mechanism%7Cblack_list%5D=consistency_mechanism%7Cblack_list&date=',
    verified: 'primary',
  },
  {
    title: "What's subject to a DPIA under the GDPR? EDPB on draft lists of 22 supervisory authorities",
    gloss: 'the 22 opinions on draft Art. 35(4) lists adopted on 25 September 2018',
    publisher: 'IAPP',
    date: '2018',
    url: 'https://iapp.org/news/a/whats-subject-to-a-dpia-under-the-gdpr-edpb-on-draft-lists-of-22-supervisory-authorities',
    verified: 'secondary',
  },
  {
    title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), Art. 1, point (13)(a)',
    gloss: 'replaces Art. 27(4) of the AI Act: the FRIA may cross-reference or include the relevant DPIA sections, instead of "complementing" the DPIA',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-24',
    url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
    verified: 'primary',
  },
  {
    title: 'Opinion 1/2018 on the draft list of the competent supervisory authority regarding the processing operations subject to the requirement of a data protection impact assessment (Article 35.4 GDPR)',
    gloss: 'first of the 22 Art. 35(4) opinions of 25 September 2018 (1/2018 to 22/2018) in the EDPB opinion series, which continues with Art. 35(4) opinions of December 2018 (24/2018 to 27/2018) and 2019 (01/2019 to 10/2019): 31 found in all',
    publisher: 'European Data Protection Board',
    date: '2018-09-25',
    url: 'https://www.edpb.europa.eu/documents/opinion-of-the-board-art-64/opinion-12018-on-the-draft-list-of-the-competent-supervisory_en',
    verified: 'primary',
  },
];
