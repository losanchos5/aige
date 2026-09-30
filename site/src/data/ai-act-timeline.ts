// ai-act-timeline.ts: the EU AI Act deadlines after the Digital Omnibus, in
// English and Spanish, for /resources/ai-act-deadlines and its hand-written
// Spanish twin /es/resources/ai-act-deadlines, and for their JSON and ICS
// exports. One bilingual dataset, so the two pages cannot drift apart.
//
// The milestones are the rows of chapter 18's "The post-Omnibus timeline"
// (bok/18-eu-ai-act.md), which is the canonical table; every date the
// obligation register (src/data/frameworks.ts) uses for an EU AI Act row is one
// of them (tests/ai-act-deadlines.spec.ts checks it). The Spanish entries
// follow chapter 21 § Spain: the national AI bill is a bill, never law.
//
// Updated by milestone: when a milestone's date passes, set its `status` to
// 'applied', move its `reviewed` to the day it was checked, move
// AI_ACT_TIMELINE_AS_OF and add an `updates` entry. The spec fails the build
// otherwise (the maintenance gate).
import type { Source } from '../lib/sources';
import { obligations, type SystemClass } from './frameworks';

/** A text in the two languages the page is published in. */
export interface Bilingual {
  en: string;
  es: string;
}

/** Which legal act sets the date. */
export type TimelineBasis = 'ai-act' | 'omnibus';

/** Where a milestone stands on AI_ACT_TIMELINE_AS_OF. */
export type TimelineStatus = 'applied' | 'upcoming';

/** A date the Digital Omnibus moved. */
export interface TimelineShift {
  /** The date in the original text of Regulation (EU) 2024/1689. */
  from: string;
  by: 'omnibus';
  note: Bilingual;
}

export interface TimelineMilestone {
  /** Stable id: the date plus a short slug. Used for anchors and ICS UIDs. */
  id: string;
  /** YYYY-MM-DD. */
  date: string;
  title: Bilingual;
  /** What applies from that date, one or two sentences. */
  applies: Bilingual;
  /** Who it concerns, where the rows say. */
  who?: Bilingual;
  /** Articles and annexes, as labels (`Art. 113(a)`, `Annex III`). */
  articles: readonly string[];
  systemClasses?: readonly SystemClass[];
  basis: TimelineBasis;
  status: TimelineStatus;
  /** YYYY-MM-DD the milestone was last checked against its sources. */
  reviewed: string;
  changed?: readonly TimelineShift[];
  /** 1-based indexes into `timelineSources`. */
  sources: readonly number[];
  /** Register rows the milestone switches on (/obligations/<id>). */
  obligationIds?: readonly string[];
}

export type SpainStatus = 'bill' | 'in-force' | 'call' | 'guidance';

export interface SpainEntry {
  id: string;
  /** YYYY-MM-DD of the state the entry describes, where one exists. */
  date?: string;
  title: Bilingual;
  body: Bilingual;
  status: SpainStatus;
  sources: readonly number[];
}

export interface TimelineUpdate {
  date: string;
  note: Bilingual;
}

/** The day the whole page was last checked. */
export const AI_ACT_TIMELINE_AS_OF = '2026-09-30';

export const timelineSources: readonly Source[] = [
  // [1]
  {
    title:
      'Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (Artificial Intelligence Act)',
    gloss: 'original text, OJ L 2024/1689 of 12.7.2024; Arts. 57, 70, 72, 111 and 113 set the dates',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2024-07-12',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
    verified: 'primary',
  },
  // [2]
  {
    title: 'Regulation (EU) 2026/1744 (Digital Omnibus on AI), of 8 July 2026',
    gloss:
      'amends Arts. 2(13), 5, 43(3), 50, 57(1), 72(3), 111 and 113 of Regulation (EU) 2024/1689; OJ L 2026/1744 of 24.7.2026; in force 2026-07-27',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-24',
    url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng',
    verified: 'primary',
  },
  // [3]
  {
    title: 'Regulation (EU) 2024/1689, consolidated text as amended by Regulation (EU) 2026/1744',
    gloss: 'CELEX 02024R1689-20260727; documentation only, no legal effect',
    publisher: 'Publications Office of the EU (EUR-Lex)',
    date: '2026-07-27',
    url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02024R1689-20260727',
    verified: 'primary',
  },
  // [4]
  {
    title: 'Timeline for the implementation of the EU AI Act',
    gloss: 'AI Act Service Desk; the post-Omnibus milestones',
    publisher: 'European Commission',
    date: '2026',
    url: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act',
    verified: 'primary',
  },
  // [5]
  {
    title: 'Market Surveillance Authorities under the AI Act',
    gloss: 'single points of contact by Member State; the Spanish designation is marked pending final adoption',
    publisher: 'European Commission',
    date: '2026-09-07',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/market-surveillance-authorities-under-ai-act',
    verified: 'primary',
  },
  // [6]
  {
    title: 'Real Decreto 729/2023, de 22 de agosto, por el que se aprueba el Estatuto de la AESIA',
    gloss: 'the agency statute; seat in A Coruña',
    publisher: 'Boletín Oficial del Estado',
    date: '2023-09-02',
    url: 'https://www.boe.es/eli/es/rd/2023/08/22/729',
    verified: 'primary',
  },
  // [7]
  {
    title: 'Real Decreto 817/2023, de 8 de noviembre',
    gloss: 'controlled testing environment (sandbox) for compliance with the AI regulation',
    publisher: 'Boletín Oficial del Estado',
    date: '2023-11-09',
    url: 'https://www.boe.es/eli/es/rd/2023/11/08/817',
    verified: 'primary',
  },
  // [8]
  {
    title: 'Sandbox IA: convocatoria',
    gloss: 'first call published 2024-12-20; up to 12 high-risk systems; about 12 months; resolution 2025-04-30',
    publisher: 'Ministerio para la Transformación Digital y de la Función Pública',
    date: '2026-06-09',
    url: 'https://digital.gob.es/digitalizacion/areas-interes/sandbox-ia/convocatoria',
    verified: 'primary',
  },
  // [9]
  {
    title: 'El Gobierno activa el primer entorno de pruebas de la UE',
    gloss: '44 applications, 12 high-risk systems selected',
    publisher: 'La Moncloa',
    date: '2025-04-03',
    url: 'https://www.lamoncloa.gob.es/serviciosdeprensa/notasprensa/transformacion-digital-y-funcion-publica/paginas/2025/030425-primer-entorno-pruebas-ia.aspx',
    verified: 'primary',
  },
  // [10]
  {
    title: 'Guías',
    gloss: '16 non-binding guides from the sandbox pilot; the page still says they will be updated once the Omnibus is approved',
    publisher: 'AESIA',
    date: '2026-09-30',
    url: 'https://aesia.digital.gob.es/es/guias',
    verified: 'primary',
  },
  // [11]
  {
    title: 'Referencia del Consejo de Ministros, 11 de marzo de 2025',
    gloss: 'Anteproyecto de Ley para el buen uso y la gobernanza de la Inteligencia Artificial, first reading, urgent processing',
    publisher: 'La Moncloa',
    date: '2025-03-11',
    url: 'https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2025/20250311-referencia-rueda-de-prensa-ministros.aspx',
    verified: 'primary',
  },
  // [12]
  {
    title: 'Referencia del Consejo de Ministros, 26 de mayo de 2026',
    gloss: 'approves the Proyecto de Ley Orgánica on the good use and governance of AI and sends it to the Congreso',
    publisher: 'La Moncloa',
    date: '2026-05-26',
    url: 'https://www.lamoncloa.gob.es/consejodeministros/referencias/paginas/2026/20260526-referencia-rueda-de-prensa-ministros.aspx',
    verified: 'primary',
  },
  // [13]
  {
    title: 'Proyecto de Ley Orgánica para el buen uso y la gobernanza de la inteligencia artificial',
    gloss: 'BOCG-15-A-97-1, the Government text: authorities (Arts. 5 and 6), sandbox (Art. 11), infringements and fines (Arts. 13 to 30)',
    publisher: 'Congreso de los Diputados',
    date: '2026-06-12',
    url: 'https://www.congreso.es/public_oficiales/L15/CONG/BOCG/A/BOCG-15-A-97-1.PDF',
    verified: 'primary',
  },
  // [14]
  {
    title: 'Iniciativa 121/000096',
    gloss: 'parliamentary stage: amendments in the Comisión de Economía, Comercio y Transformación Digital, deadline extended to 2026-10-07',
    publisher: 'Congreso de los Diputados',
    date: '2026-09-30',
    url: 'https://www.congreso.es/es/busqueda-de-iniciativas?p_p_id=iniciativas&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&_iniciativas_mode=mostrarDetalle&_iniciativas_legislatura=XV&_iniciativas_id=121%2F000096',
    verified: 'primary',
  },
];

// Short lists of register rows per milestone: the ones a reader clicks first,
// not every row that shares the date.
const HIGH_RISK_CORE = [
  'AIGE-OBL-EUAIA-ART6',
  'AIGE-OBL-EUAIA-ART9',
  'AIGE-OBL-EUAIA-ART10',
  'AIGE-OBL-EUAIA-ART14',
  'AIGE-OBL-EUAIA-ART26',
];

export const aiActMilestones: readonly TimelineMilestone[] = [
  {
    id: '2024-08-01-entry-into-force',
    date: '2024-08-01',
    title: { en: 'The AI Act enters into force', es: 'Entrada en vigor del Reglamento de IA' },
    applies: {
      en: 'Regulation (EU) 2024/1689 enters into force. Nothing applies yet: every obligation has a later application date.',
      es: 'Entra en vigor el Reglamento (UE) 2024/1689. Todavía no se aplica ninguna obligación: cada una tiene una fecha de aplicación posterior.',
    },
    articles: ['Art. 113'],
    basis: 'ai-act',
    status: 'applied',
    reviewed: '2026-09-30',
    sources: [1, 2],
  },
  {
    id: '2025-02-02-prohibitions-literacy',
    date: '2025-02-02',
    title: {
      en: 'Prohibited practices and AI literacy',
      es: 'Prácticas prohibidas y alfabetización en IA',
    },
    applies: {
      en: 'Chapters I and II apply: the definitions, the AI literacy duty and the original list of prohibited practices.',
      es: 'Se aplican los capítulos I y II: las definiciones, el deber de alfabetización en IA y la lista original de prácticas prohibidas.',
    },
    who: {
      en: 'Every provider and deployer; the bans bind anyone who places on the market, puts into service or uses the practice.',
      es: 'Todos los proveedores y responsables del despliegue; las prohibiciones vinculan a quien introduzca en el mercado, ponga en servicio o utilice la práctica.',
    },
    articles: ['Art. 113(a)', 'Art. 4', 'Art. 5'],
    systemClasses: ['prohibited', 'all-ai-systems'],
    basis: 'ai-act',
    status: 'applied',
    reviewed: '2026-09-30',
    sources: [1],
    obligationIds: ['AIGE-OBL-EUAIA-ART3-1', 'AIGE-OBL-EUAIA-ART4', 'AIGE-OBL-EUAIA-ART5'],
  },
  {
    id: '2025-08-02-gpai-governance',
    date: '2025-08-02',
    title: {
      en: 'General-purpose AI models, governance and penalties',
      es: 'Modelos de IA de uso general, gobernanza y sanciones',
    },
    applies: {
      en: 'The rules on notified bodies, the obligations of providers of general-purpose AI models, governance, penalties (except Art. 101) and confidentiality apply; Member States publish their national contact points.',
      es: 'Se aplican las normas sobre organismos notificados, las obligaciones de los proveedores de modelos de IA de uso general, la gobernanza, las sanciones (salvo el art. 101) y la confidencialidad; los Estados miembros publican sus puntos de contacto nacionales.',
    },
    who: {
      en: 'Providers of general-purpose AI models; Member States.',
      es: 'Proveedores de modelos de IA de uso general; Estados miembros.',
    },
    articles: ['Art. 113(b)', 'Art. 70(2)', 'Arts. 53 to 55'],
    systemClasses: ['gpai', 'gpai-systemic'],
    basis: 'ai-act',
    status: 'applied',
    reviewed: '2026-09-30',
    sources: [1],
    obligationIds: ['AIGE-OBL-EUAIA-ART53', 'AIGE-OBL-EUAIA-ART53-1C', 'AIGE-OBL-EUAIA-ART55'],
  },
  {
    id: '2026-07-27-omnibus-in-force',
    date: '2026-07-27',
    title: { en: 'The Digital Omnibus enters into force', es: 'Entrada en vigor del Digital Omnibus' },
    applies: {
      en: 'Regulation (EU) 2026/1744 enters into force: the reworded AI literacy article (Art. 4), the new Art. 4a on processing special categories of data to detect and correct bias, and the amendments to other acts in Arts. 102 to 110, brought forward from 2 Aug 2026, apply from this day.',
      es: 'Entra en vigor el Reglamento (UE) 2026/1744: desde este día se aplican el nuevo texto del artículo de alfabetización en IA (art. 4), el nuevo art. 4 bis sobre el tratamiento de categorías especiales de datos para detectar y corregir sesgos, y las modificaciones de otros actos de los arts. 102 a 110, adelantadas desde el 2 de agosto de 2026.',
    },
    articles: ['Omnibus Art. 4', 'Art. 4', 'Art. 4a', 'Art. 113(d)', 'Arts. 102 to 110'],
    systemClasses: ['all-ai-systems'],
    basis: 'omnibus',
    status: 'applied',
    reviewed: '2026-09-30',
    sources: [2, 3],
    obligationIds: ['AIGE-OBL-EUAIA-ART4', 'AIGE-OBL-EUAIA-ART4A'],
  },
  {
    id: '2026-08-02-general-application',
    date: '2026-08-02',
    title: { en: 'General application', es: 'Aplicación general' },
    applies: {
      en: 'The Act applies in general: Art. 50 transparency duties, Commission fines on providers of general-purpose AI models, the Chapter VI measures including testing in real-world conditions, and the enforcement chapter including Arts. 75a to 75d.',
      es: 'El Reglamento se aplica con carácter general: las obligaciones de transparencia del art. 50, las multas de la Comisión a los proveedores de modelos de IA de uso general, las medidas del capítulo VI, incluidas las pruebas en condiciones reales, y el capítulo de ejecución, incluidos los arts. 75 bis a 75 quinquies.',
    },
    who: {
      en: 'Providers and deployers of systems under Art. 50; providers of general-purpose AI models.',
      es: 'Proveedores y responsables del despliegue de sistemas del art. 50; proveedores de modelos de IA de uso general.',
    },
    articles: ['Art. 113', 'Art. 50', 'Art. 60', 'Arts. 75a to 75d'],
    systemClasses: ['transparency-art50', 'gpai', 'gpai-systemic'],
    basis: 'ai-act',
    status: 'applied',
    reviewed: '2026-09-30',
    sources: [1, 2, 4],
    obligationIds: ['AIGE-OBL-EUAIA-ART50', 'AIGE-OBL-EUAIA-ART60', 'AIGE-OBL-EUAIA-ART87'],
  },
  {
    id: '2026-12-02-new-prohibitions-marking',
    date: '2026-12-02',
    title: {
      en: 'New prohibitions and the end of the marking grace',
      es: 'Nuevas prohibiciones y fin de la gracia del marcado',
    },
    applies: {
      en: 'The new prohibited practices in Art. 5(1)(ba) and (bb) (AI-generated non-consensual intimate imagery and child sexual abuse material) apply, and generative systems placed on the market before 2 Aug 2026 must mark their outputs under Art. 50(2).',
      es: 'Se aplican las nuevas prácticas prohibidas del art. 5, apartado 1, letras b bis) y b ter) (imágenes íntimas no consentidas y material de abuso sexual infantil generados por IA), y los sistemas generativos introducidos en el mercado antes del 2 de agosto de 2026 deben marcar sus resultados conforme al art. 50, apartado 2.',
    },
    who: {
      en: 'Providers of generative AI systems; anyone using the new banned practices.',
      es: 'Proveedores de sistemas de IA generativa; cualquiera que utilice las nuevas prácticas prohibidas.',
    },
    articles: ['Art. 113(a)', 'Art. 5(1)(ba)', 'Art. 5(1)(bb)', 'Art. 5(1a)', 'Art. 5(1b)', 'Art. 111(4)', 'Art. 50(2)'],
    systemClasses: ['prohibited', 'transparency-art50'],
    basis: 'omnibus',
    status: 'upcoming',
    reviewed: '2026-09-30',
    sources: [2, 3, 4],
    obligationIds: ['AIGE-OBL-EUAIA-ART5', 'AIGE-OBL-EUAIA-ART50'],
  },
  {
    id: '2027-08-02-legacy-gpai-sandboxes',
    date: '2027-08-02',
    title: {
      en: 'Earlier general-purpose AI models and national sandboxes',
      es: 'Modelos de uso general anteriores y espacios controlados de pruebas nacionales',
    },
    applies: {
      en: 'General-purpose AI models placed on the market before 2 Aug 2025 must comply; each Member State must have at least one AI regulatory sandbox operational; the delegated acts limiting duties for Annex I, Section A products are due.',
      es: 'Los modelos de IA de uso general introducidos en el mercado antes del 2 de agosto de 2025 deben cumplir; cada Estado miembro debe tener operativo al menos un espacio controlado de pruebas para la IA; termina el plazo para los actos delegados que limitan obligaciones para los productos del anexo I, sección A.',
    },
    who: {
      en: 'Providers of earlier general-purpose AI models; Member States; the Commission.',
      es: 'Proveedores de modelos de uso general anteriores; Estados miembros; la Comisión.',
    },
    articles: ['Art. 111(3)', 'Art. 57(1)', 'Art. 2(13)'],
    systemClasses: ['gpai', 'gpai-systemic'],
    basis: 'omnibus',
    status: 'upcoming',
    reviewed: '2026-09-30',
    changed: [
      {
        from: '2026-08-02',
        by: 'omnibus',
        note: {
          en: 'The original text required the national sandboxes to be operational by 2 Aug 2026; the Omnibus moved the deadline to 2 Aug 2027.',
          es: 'El texto original exigía que los espacios controlados de pruebas nacionales estuvieran operativos el 2 de agosto de 2026; el Omnibus trasladó el plazo al 2 de agosto de 2027.',
        },
      },
    ],
    sources: [1, 2, 3],
    obligationIds: ['AIGE-OBL-EUAIA-ART53', 'AIGE-OBL-EUAIA-ART55'],
  },
  {
    id: '2027-09-02-pmm-template',
    date: '2027-09-02',
    title: {
      en: 'Post-market monitoring guidance and template',
      es: 'Guía y plantilla del plan de vigilancia poscomercialización',
    },
    applies: {
      en: 'The Commission guidance and template for the post-market monitoring plan are due.',
      es: 'Vence el plazo para que la Comisión publique la guía y la plantilla del plan de vigilancia poscomercialización.',
    },
    who: { en: 'The Commission.', es: 'La Comisión.' },
    articles: ['Art. 72(3)'],
    basis: 'omnibus',
    status: 'upcoming',
    reviewed: '2026-09-30',
    changed: [
      {
        from: '2026-02-02',
        by: 'omnibus',
        note: {
          en: 'The original text had the Commission adopt an implementing act with the template by 2 Feb 2026; the Omnibus replaced it with guidance and a template due by 2 Sep 2027.',
          es: 'El texto original obligaba a la Comisión a adoptar un acto de ejecución con la plantilla antes del 2 de febrero de 2026; el Omnibus lo sustituyó por una guía y una plantilla con plazo hasta el 2 de septiembre de 2027.',
        },
      },
    ],
    sources: [1, 2],
  },
  {
    id: '2027-12-02-high-risk-annex-iii',
    date: '2027-12-02',
    title: { en: 'High-risk systems in Annex III', es: 'Sistemas de alto riesgo del anexo III' },
    applies: {
      en: 'The high-risk rules apply to Annex III systems: classification, requirements, provider and deployer duties, and the fundamental rights impact assessment.',
      es: 'Las normas de alto riesgo se aplican a los sistemas del anexo III: clasificación, requisitos, obligaciones de proveedores y responsables del despliegue, y la evaluación de impacto relativa a los derechos fundamentales.',
    },
    who: {
      en: 'Providers, deployers, importers and distributors of Annex III systems.',
      es: 'Proveedores, responsables del despliegue, importadores y distribuidores de sistemas del anexo III.',
    },
    articles: ['Art. 113(c)(i)', 'Annex III', 'Arts. 6 to 27'],
    systemClasses: ['high-risk-annex-iii'],
    basis: 'omnibus',
    status: 'upcoming',
    reviewed: '2026-09-30',
    changed: [
      {
        from: '2026-08-02',
        by: 'omnibus',
        note: {
          en: 'The original text applied the Annex III rules from 2 Aug 2026; the Omnibus moved them to 2 Dec 2027.',
          es: 'El texto original aplicaba las normas del anexo III desde el 2 de agosto de 2026; el Omnibus las trasladó al 2 de diciembre de 2027.',
        },
      },
    ],
    sources: [1, 2, 3, 4],
    obligationIds: [...HIGH_RISK_CORE, 'AIGE-OBL-EUAIA-ART27'],
  },
  {
    id: '2028-01-28-notified-bodies-annex-i',
    date: '2028-01-28',
    title: {
      en: 'Notified bodies for Annex I, Section A',
      es: 'Organismos notificados del anexo I, sección A',
    },
    applies: {
      en: 'Notified bodies under the Annex I, Section A legislation apply for designation under the AI Act.',
      es: 'Los organismos notificados conforme a la legislación del anexo I, sección A, solicitan su designación con arreglo al Reglamento de IA.',
    },
    who: { en: 'Notified bodies.', es: 'Organismos notificados.' },
    articles: ['Art. 43(3)'],
    systemClasses: ['high-risk-annex-i'],
    basis: 'omnibus',
    status: 'upcoming',
    reviewed: '2026-09-30',
    sources: [2],
  },
  {
    id: '2028-08-02-high-risk-annex-i',
    date: '2028-08-02',
    title: { en: 'High-risk systems in Annex I', es: 'Sistemas de alto riesgo del anexo I' },
    applies: {
      en: 'The high-risk rules apply to systems that are safety components of, or are themselves, products under the Annex I legislation (Art. 6(1)).',
      es: 'Las normas de alto riesgo se aplican a los sistemas que son componentes de seguridad de productos regulados por la legislación del anexo I, o que son ellos mismos esos productos (art. 6, apartado 1).',
    },
    who: {
      en: 'Providers and deployers of AI in regulated products (machinery, medical devices, toys and others).',
      es: 'Proveedores y responsables del despliegue de IA en productos regulados (máquinas, productos sanitarios, juguetes y otros).',
    },
    articles: ['Art. 113(c)(ii)', 'Art. 6(1)', 'Annex I'],
    systemClasses: ['high-risk-annex-i'],
    basis: 'omnibus',
    status: 'upcoming',
    reviewed: '2026-09-30',
    changed: [
      {
        from: '2027-08-02',
        by: 'omnibus',
        note: {
          en: 'The original text applied the Annex I route from 2 Aug 2027; the Omnibus moved it to 2 Aug 2028.',
          es: 'El texto original aplicaba la vía del anexo I desde el 2 de agosto de 2027; el Omnibus la trasladó al 2 de agosto de 2028.',
        },
      },
    ],
    sources: [1, 2, 3, 4],
    obligationIds: [...HIGH_RISK_CORE, 'AIGE-OBL-EUAIA-ART43'],
  },
  {
    id: '2030-08-02-public-authority-legacy',
    date: '2030-08-02',
    title: {
      en: 'Earlier high-risk systems used by public authorities',
      es: 'Sistemas de alto riesgo ya en uso por autoridades públicas',
    },
    applies: {
      en: 'High-risk systems already on the market and intended for use by public authorities must comply.',
      es: 'Los sistemas de alto riesgo ya introducidos en el mercado y destinados a ser utilizados por autoridades públicas deben cumplir.',
    },
    who: {
      en: 'Providers and public-authority deployers of those systems.',
      es: 'Proveedores y autoridades públicas responsables del despliegue.',
    },
    articles: ['Art. 111(2)'],
    systemClasses: ['high-risk-annex-iii', 'high-risk-annex-i'],
    basis: 'ai-act',
    status: 'upcoming',
    reviewed: '2026-09-30',
    sources: [1, 2],
    obligationIds: ['AIGE-OBL-EUAIA-ART9', 'AIGE-OBL-EUAIA-ART26'],
  },
  {
    id: '2030-12-31-annex-x',
    date: '2030-12-31',
    title: { en: 'Large-scale EU IT systems (Annex X)', es: 'Grandes sistemas informáticos de la UE (anexo X)' },
    applies: {
      en: 'AI components of the large-scale IT systems listed in Annex X, placed on the market before 2 Aug 2027, must comply.',
      es: 'Los componentes de IA de los grandes sistemas informáticos del anexo X, introducidos en el mercado antes del 2 de agosto de 2027, deben cumplir.',
    },
    who: {
      en: 'The EU agencies and Member State authorities that run those systems.',
      es: 'Las agencias de la UE y las autoridades de los Estados miembros que gestionan esos sistemas.',
    },
    articles: ['Art. 111(1)', 'Annex X'],
    basis: 'ai-act',
    status: 'upcoming',
    reviewed: '2026-09-30',
    sources: [1],
  },
];

export const spain: readonly SpainEntry[] = [
  {
    id: 'aesia',
    date: '2023-09-02',
    title: { en: 'AESIA, the Spanish AI supervisor', es: 'AESIA, la autoridad española de supervisión de la IA' },
    body: {
      en: "The Spanish Agency for the Supervision of Artificial Intelligence, seated in A Coruña, has its statute in Royal Decree 729/2023. The Commission lists it as Spain's single point of contact under the AI Act, with the designation pending final adoption: the bill would make it the single point of contact and main market surveillance authority. Its 16 sandbox guides are not binding and predate the Omnibus.",
      es: 'La Agencia Española de Supervisión de la Inteligencia Artificial, con sede en A Coruña, tiene su estatuto en el Real Decreto 729/2023. La Comisión la recoge como punto de contacto único de España con arreglo al Reglamento de IA, con la designación pendiente de adopción definitiva: el proyecto de ley la convertiría en punto de contacto único y principal autoridad de vigilancia del mercado. Sus 16 guías del espacio controlado de pruebas no son vinculantes y son anteriores al Omnibus.',
    },
    status: 'in-force',
    sources: [6, 5, 13, 10],
  },
  {
    id: 'sandbox',
    date: '2023-11-09',
    title: { en: 'The sandbox, Royal Decree 817/2023', es: 'El espacio controlado de pruebas, Real Decreto 817/2023' },
    body: {
      en: 'Royal Decree 817/2023 set up a controlled testing environment for AI Act compliance. Its first call, published on 20 Dec 2024, sought up to 12 high-risk systems for about 12 months; 44 applied and 12 were selected. No second call had been published by 30 Sep 2026. The bill would have AESIA run the sandbox every Member State must have operational by 2 Aug 2027, and would repeal the decree.',
      es: 'El Real Decreto 817/2023 creó un espacio controlado de pruebas para el cumplimiento del Reglamento de IA. Su primera convocatoria, publicada el 20 de diciembre de 2024, buscaba hasta 12 sistemas de alto riesgo durante unos 12 meses; se presentaron 44 y se seleccionaron 12. A 30 de septiembre de 2026 no se había publicado una segunda convocatoria. El proyecto de ley encargaría a la AESIA el espacio controlado de pruebas que cada Estado miembro debe tener operativo antes del 2 de agosto de 2027, y derogaría el real decreto.',
    },
    status: 'in-force',
    sources: [7, 8, 9, 13, 2],
  },
  {
    id: 'bill',
    date: '2026-09-30',
    title: {
      en: 'The Spanish AI bill, in parliament',
      es: 'El proyecto de ley orgánica de IA, en tramitación',
    },
    body: {
      en: 'The Council of Ministers approved a first draft on 11 Mar 2025 and, on 26 May 2026, the bill for an organic law on the good use and governance of AI, published by the Congreso on 12 Jun 2026 (BOCG-15-A-97-1, file 121/000096). On 30 Sep 2026 it was at the amendments stage in committee, with the deadline extended to 7 Oct 2026. As proposed, it names the market surveillance authorities (AESIA, the data-protection agency AEPD, the judiciary council CGPJ, Banco de España, CNMV and the insurance directorate DGSFP), sets fines of up to EUR 35 million or 7% of turnover, and makes failing to disclose a deepfake a serious infringement. It is a bill, not law.',
      es: 'El Consejo de Ministros aprobó un anteproyecto el 11 de marzo de 2025 y, el 26 de mayo de 2026, el proyecto de Ley Orgánica para el buen uso y la gobernanza de la inteligencia artificial, publicado por el Congreso el 12 de junio de 2026 (BOCG-15-A-97-1, expediente 121/000096). A 30 de septiembre de 2026 estaba en fase de enmiendas en comisión, con el plazo ampliado hasta el 7 de octubre de 2026. Tal como está propuesto, designa las autoridades de vigilancia del mercado (AESIA, AEPD, CGPJ, Banco de España, CNMV y la DGSFP), fija multas de hasta 35 millones de euros o el 7 % del volumen de negocios y califica como infracción grave no advertir de una ultrasuplantación. Es un proyecto de ley, no una ley aprobada.',
    },
    status: 'bill',
    sources: [11, 12, 13, 14],
  },
];

export const updates: readonly TimelineUpdate[] = [
  {
    date: '2026-09-30',
    note: {
      en: 'First version: 13 milestones from chapter 18, checked against Regulations (EU) 2024/1689 and 2026/1744 and the consolidated text; the Spanish supervisor, sandbox and bill checked against the BOE, the Council of Ministers, the Congreso and AESIA.',
      es: 'Primera versión: 13 hitos del capítulo 18, contrastados con los Reglamentos (UE) 2024/1689 y 2026/1744 y el texto consolidado; la autoridad, el espacio controlado de pruebas y el proyecto de ley españoles, contrastados con el BOE, el Consejo de Ministros, el Congreso y la AESIA.',
    },
  },
];

/** The milestones after `asOf` (strictly), in date order. */
export function nextMilestones(asOf: string, count = Infinity): TimelineMilestone[] {
  return aiActMilestones.filter((m) => m.date > asOf).slice(0, count);
}

/** The next milestone after AI_ACT_TIMELINE_AS_OF: the date the page is due for review. */
export const AI_ACT_TIMELINE_REVIEW_BY: string = nextMilestones(AI_ACT_TIMELINE_AS_OF, 1)[0]?.date ?? AI_ACT_TIMELINE_AS_OF;

/** Every EU AI Act date the obligation register uses (`appliesFrom` and milestone dates). */
export function registerDates(): Set<string> {
  const dates = new Set<string>();
  for (const row of obligations) {
    if (row.frameworkId !== 'eu-ai-act') continue;
    if (row.appliesFrom) dates.add(row.appliesFrom);
    for (const step of row.milestones ?? []) dates.add(step.date);
  }
  return dates;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Internal inconsistencies of the dataset; empty when it is sound. */
export function timelineProblems(): string[] {
  const out: string[] = [];
  const ids = new Set(obligations.map((row) => row.id));
  const cite = (where: string, list: readonly number[]) => {
    if (list.length === 0) out.push(`${where}: no source`);
    for (const n of list) {
      if (!Number.isInteger(n) || n < 1 || n > timelineSources.length) out.push(`${where}: source [${n}] does not exist`);
    }
  };
  const text = (where: string, value: Bilingual | undefined) => {
    if (value && (!value.en.trim() || !value.es.trim())) out.push(`${where}: empty en or es text`);
  };
  const seen = new Set<string>();
  let previous = '';
  for (const m of aiActMilestones) {
    const where = m.id;
    if (seen.has(m.id)) out.push(`${where}: duplicate id`);
    seen.add(m.id);
    if (!ISO.test(m.date) || !ISO.test(m.reviewed)) out.push(`${where}: date or reviewed is not YYYY-MM-DD`);
    if (!m.id.startsWith(m.date)) out.push(`${where}: id does not start with its date`);
    if (m.date <= previous) out.push(`${where}: out of date order or duplicate date`);
    previous = m.date;
    if (m.articles.length === 0) out.push(`${where}: no article`);
    text(`${where} title`, m.title);
    text(`${where} applies`, m.applies);
    text(`${where} who`, m.who);
    for (const shift of m.changed ?? []) {
      if (!ISO.test(shift.from) || shift.from === m.date) out.push(`${where}: bad shift from ${shift.from}`);
      text(`${where} changed`, shift.note);
    }
    cite(where, m.sources);
    for (const id of m.obligationIds ?? []) if (!ids.has(id)) out.push(`${where}: unknown obligation ${id}`);
    const expected: TimelineStatus = m.date <= AI_ACT_TIMELINE_AS_OF ? 'applied' : 'upcoming';
    if (m.status !== expected) out.push(`${where}: status ${m.status}, expected ${expected} on ${AI_ACT_TIMELINE_AS_OF}`);
  }
  for (const entry of spain) {
    text(`spain ${entry.id} title`, entry.title);
    text(`spain ${entry.id} body`, entry.body);
    if (entry.date && !ISO.test(entry.date)) out.push(`spain ${entry.id}: date is not YYYY-MM-DD`);
    cite(`spain ${entry.id}`, entry.sources);
  }
  if (updates.length === 0) out.push('updates: no entry');
  for (const u of updates) {
    if (!ISO.test(u.date) || u.date > AI_ACT_TIMELINE_AS_OF) out.push(`update ${u.date}: bad date`);
    text(`update ${u.date}`, u.note);
  }
  return out;
}
