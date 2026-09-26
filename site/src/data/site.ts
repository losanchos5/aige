// Site-wide constants. Single source of truth for name, links and metadata.

/**
 * A named author, with optional links used for structured data (JSON-LD
 * Person nodes). `url` is a homepage; `sameAs` lists canonical profile URLs
 * (LinkedIn, ORCID…). Both are omitted when unknown: we do not invent them.
 */
export interface Author {
  name: string;
  url?: string;
  sameAs?: readonly string[];
  /** The role the site states for the author (bok/00-preface.md). */
  jobTitle?: string;
  /** One or two sentences, restating only what the preface and /about say. */
  description?: string;
  /** Subjects the author's stated work covers (schema.org `knowsAbout`). */
  knowsAbout?: readonly string[];
}

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  linkedin: string;
  /** The project's own LinkedIn Page (the author's profile is `linkedin`). */
  linkedinPage: string;
  email: string;
  github: string;
  /** The author's full name, as the JSON-LD Person and every byline state it. */
  author: string;
  authors: readonly string[];
  /** Per-author metadata for structured data; keyed by the names in `authors`. */
  authorDetails: readonly Author[];
  /** Human-readable licence label, shown in the page chrome (e.g. `CC BY 4.0`). */
  license: string;
  /** Canonical licence URL. schema.org types `license` as URL|CreativeWork, so
      the structured data links this rather than repeating the label as text. */
  licenseUrl: string;
  bokVersion: string;
  /** Zenodo DOI of the current archived release (bokVersion). */
  doi: string;
  /** Zenodo concept DOI: always resolves to the latest archived version. */
  conceptDoi: string;
  /**
   * Newsletter sign-up, handled entirely by a third party (no backend here).
   * `action` is the form's POST target; an empty string disables the form, so
   * <NewsletterForm> renders nothing until a real endpoint is set.
   */
  newsletter: {
    provider: string;
    action: string;
  };
}

export const site: SiteConfig = {
  name: 'AI Governance Engineer',
  url: 'https://aigovernanceengineer.com',
  description:
    'The Thesis and Body of Knowledge for AI governance engineering: turning governance obligations into policy-as-code, eval gates and machine-readable evidence.',
  linkedin: 'https://www.linkedin.com/in/jorgara',
  linkedinPage: 'https://www.linkedin.com/company/aigovernance-engineer/',
  email: 'jorgegarciaaibar@gmail.com',
  github: 'https://github.com/losanchos5/aige',
  author: 'Jorge García Aibar',
  authors: ['Jorge García Aibar'],
  authorDetails: [
    {
      name: 'Jorge García Aibar',
      url: 'https://aigovernanceengineer.com/about',
      // Role, experience and subjects as bok/00-preface.md ("Who wrote it, and
      // from what") states them; nothing beyond that.
      jobTitle: 'AI Governance & Privacy Engineer',
      description:
        'AI Governance & Privacy Engineer. Two and a half years designing and operating an AI governance framework inside a large telco, between Legal, Security and Engineering. Author of the AI Governance Engineering Body of Knowledge and co-author of its Thesis.',
      knowsAbout: [
        'AI governance',
        'AI governance engineering',
        'GRC engineering',
        'AI risk management',
        'Privacy engineering',
        'EU AI Act',
        'ISO/IEC 42001',
        'NIST AI Risk Management Framework',
      ],
      // LinkedIn and the GitHub account that owns the project repository. TODO:
      // add the ORCID iD here once one exists (none has been registered yet).
      sameAs: ['https://www.linkedin.com/in/jorgara', 'https://github.com/losanchos5'],
    },
  ],
  license: 'CC BY 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  bokVersion: '0.5.0',
  // `doi` is the version DOI Zenodo minted for the v0.5.0 release; `conceptDoi`
  // always resolves to the latest version. Update `doi` with each new release.
  doi: '10.5281/zenodo.22956197',
  conceptDoi: '10.5281/zenodo.22857084',
  newsletter: {
    provider: 'buttondown',
    action: 'https://buttondown.com/api/emails/embed-subscribe/AI_Governance_Engineer',
  },
};
