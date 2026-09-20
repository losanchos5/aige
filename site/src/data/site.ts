// Site-wide constants. Single source of truth for name, links and metadata.

export interface SiteConfig {
  name: string;
  url: string;
  description: string;
  linkedin: string;
  github: string;
  author: string;
  authors: readonly string[];
  license: string;
  bokVersion: string;
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
    'The Thesis and Body of Knowledge for AI governance engineering — turning AI governance obligations into policy-as-code, eval gates and machine-readable evidence.',
  linkedin: 'https://www.linkedin.com/in/jorgara',
  github: 'https://github.com/losanchos5/aige',
  author: 'Jorge García',
  authors: ['Jorge García Aibar', 'Aurélie Pols'],
  license: 'CC BY 4.0',
  bokVersion: '0.4.0',
  newsletter: { provider: 'buttondown', action: '' },
};
