# Contributing

This is a living Thesis and Body of Knowledge for **AI governance engineering**. Corrections,
sources and chapter proposals are all welcome. Start small. Contributions are credited, while
authorship of the Body of Knowledge and the rest of the project remains with Jorge García Aibar;
the Thesis is co-authored by Jorge García Aibar and Aurélie Pols.

## Ways to contribute

Every path below has a GitHub issue form; https://aigovernanceengineer.com/contribute lists them in
one place and says what a good review contains.

- **Review a control profile.** Test one control in an open control profile (`/controls`) against an
  environment you know and say whether it holds as written, what evidence you could or could not
  produce, and what you would change (form: *Review a control*).
- **Review a research note.** Check a draft research note (`/research`), a section or a single claim
  against the sources (form: *Review a research note*).
- **Propose a failure mode.** A way an AI system or agent breaks that a control should catch, backed
  by a public record (form: *Propose a failure mode*).
- **Add an implementation example.** A configuration, pipeline step, test, runtime policy or evidence
  export that implements a control or pattern, with the record it leaves. No secrets; tools by
  category (form: *Share an implementation example*).
- **Map a control to a clause.** Link a control to a clause of a law, standard or framework, with the
  official URL and the strength of the mapping (form: *Propose a framework mapping*). Challenge a
  requirement, mapping, threat id or date with *Propose a technical correction*.
- **Sign the Thesis.** If you endorse the definition, values and principles, add one line to the
  signatories list in `bok/CONTRIBUTORS.md` (format shown there). Signing does not require writing
  anything else.
- **Suggest a source.** Found a stronger primary source, or a claim that needs one? Add a row to
  `sources/SOURCES.md` under the relevant chapter section and reference it from the copy.
- **Contribute to a chapter or pattern.** Extend or sharpen a chapter, add a pattern as its own file
  under `bok/patterns/` (with its summary in the `bok/05-patterns.md` catalogue; STYLEGUIDE §4 has the
  frontmatter and the checklist), or propose a new chapter from `OUTLINE.md`. Follow `STYLEGUIDE.md`;
  accepted substantive contributions are credited in `bok/CONTRIBUTORS.md` but do not confer
  co-authorship.

## Control profiles and research notes

The open control profiles and the research notes are drafts, open for technical review. They are
versioned on their own, apart from the book.

- **Where they live.** Research notes are Markdown files at `research/<slug>.md` (served at
  `/research/<slug>`). Control profiles are typed data modules in `site/src/data/controls/*.ts`, one
  per profile, each control with an id of the form `AIGE-CTL-<PROFILE>-<NNN>`.
- **Frontmatter of a research note.** The file name is the id. `title`; `summary` (50 to 160
  characters); `status` (`draft`, `review` or `published`); `version` (semver, for example `0.1.0`);
  `date` (and `updated` when it changes); `authors` and `reviewers` as person ids from
  `site/src/data/people.ts`; `relatedControls` as `AIGE-CTL-...` ids; `relatedPatterns` as pattern
  slugs. The build fails on an unknown id.
- **Versions.** Bump `version` on any substantive change (a requirement, an evidence statement, a
  mapping, a claim) and add a changelog line: the `changelog` entry of the profile for a control
  profile, `bok/CHANGELOG.md` for a research note. Wording fixes that do not change meaning need no
  bump.
- **Published means reviewed.** `status: published` requires at least one reviewer who is credited in
  `bok/CONTRIBUTORS.md`. Until then a profile or note stays `draft` and says "Open for technical
  review".
- **Sources.** Cite as in the book: `[n]` markers with matching rows in `sources/SOURCES.md`, under a
  section headed `## research/<slug>.md` for a note.

### Cutting a profile release (maintainers)

Each version of a control profile can get its own DOI on Zenodo. Until it has one, the profile is
cited with the project concept DOI. `site/scripts/profile-release.mjs` packages one version from the
built site and, with a token, deposits it. It has no dependencies and reads the token from the
`ZENODO_TOKEN` environment variable at run time; never write the token into a file, a commit or a
log.

1. **Build.** `cd site && npm run build`. The script reads `dist/` and stops if it is missing.
2. **Dry run.** `node scripts/profile-release.mjs <slug> --dry-run`. It writes
   `dist/releases/<slug>-v<version>/` (the profile JSON with its controls, the Markdown twin, the
   observation schema, the example observations, `README.md`, `CITATION.cff` and `SHA256SUMS`) and
   prints the Zenodo metadata as JSON. No network request is made (the same happens with no token).
3. **Sandbox.** Create a token on `sandbox.zenodo.org` (scopes `deposit:write` and
   `deposit:actions`) and run the script with `ZENODO_TOKEN` set and no flags. It creates a draft
   deposition on the sandbox, uploads the files and sets the metadata; check the draft there.
4. **Production.** Only after the maintainer has approved the release: with a `zenodo.org` token,
   run `node scripts/profile-release.mjs <slug> --production`, review the draft on Zenodo and
   publish it there, or run once with `--production --publish`. Every run creates a new deposition,
   so publish the draft you reviewed rather than running again.
5. **Record the DOI.** Write the minted version DOI into the profile's `doi` field in
   `site/src/data/controls/<slug>.ts` and, for the first deposited version, its concept DOI into
   `conceptDoi`. Add a changelog line to the profile, rebuild and open a PR. Never write a DOI before
   the deposit exists. The script refuses to deposit a profile that already has a `conceptDoi`: a
   later version is created from the existing record with Zenodo's "New version", so that it shares
   the concept DOI.

The GitHub and Zenodo integration is not used for profiles: it mints a DOI for a snapshot of the whole
repository on each GitHub release, not for one version of one profile.

## Rules every PR must follow

- **Cite every factual claim.** Each factual statement carries a `[n]` marker with a matching row in
  `sources/SOURCES.md`, tagged `primary`, `secondary` or `reported`. No row, no claim.
- **Keep the voice.** Practitioner-direct, per `STYLEGUIDE.md`. Its templates and section shapes are
  the house style. Read it before writing.
- **Do not rename the discipline.** The canonical term is **"AI governance engineering"**. Do not
  coin synonyms or retitle it.
- **Name categories, not vendors.** Describe the class of tool or control, not a specific product.
- **Never invent a statistic.** If you cannot source a number, do not use one. Respect the BRIEF
  blocklist in `STYLEGUIDE.md` §7.

## Run the checks locally

```
cd site && npm ci && npm run build && npm test
```

`npm run build` runs the Astro type check, the content lint, the internal link check and the search
index. `npm test` runs the Playwright default project. Green locally means green in CI.

## First pull request

If this is your first PR from a fork, a maintainer has to approve the workflow run before CI starts,
so the checks will show **"action required"** until someone clicks approve. That is expected; it is
not a failure on your side. After the first approval, later pushes run automatically.

## Licence

This work is licensed under **CC BY 4.0**. By contributing you agree that your contribution is
licensed the same way, that it may be incorporated under the project's stated authorship and
attribution policy, and that you are adding your own work with nothing confidential in it. You retain
credit for accepted substantive contributions; contribution does not by itself confer co-authorship.
