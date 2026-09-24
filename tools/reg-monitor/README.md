# Regulatory change monitor

> A scheduled job that watches the official pages the site cites and opens a GitHub issue when one
> changes; it never edits or publishes the site.

The site makes dated claims about laws, guidance, standards and frameworks ("as of 2026-09-24").
Those claims go stale when the source changes: a new consolidated version of the EU AI Act, a
harmonised standard cited in the Official Journal, a draft NIST publication made final, a bill
signed. This monitor turns that drift into a reviewable signal. Every day it reads each page in
[`sources.json`](sources.json), reduces it to stable text, compares a SHA-256 of that text with the
last run and, on a change, opens (or comments on) an issue labelled `regulatory-change` with the
source, the URL, a diff excerpt and the files in this repository that cite the URL. A person reads
the change and decides what to edit. Nothing is published automatically.

## How it runs

- **Workflow**: [`.github/workflows/reg-monitor.yml`](../../.github/workflows/reg-monitor.yml),
  daily at 06:17 UTC (`cron: '17 6 * * *'`, off the top of the hour, when scheduled runs are most
  often delayed [1]) and on demand from the Actions tab (`workflow_dispatch`).
- **Manual runs default to a dry run**: the `dry_run` input is ticked by default, so a manual run
  prints what it would do, writes no state and opens no issue. Untick it for a real run. The
  `only` input limits a run to some source ids (comma-separated).
- **Order of work in a run**: the unit tests and `monitor.mjs --check` run first; then the state
  branch is checked out; then the monitor runs; then the state is committed and pushed, even when
  the monitor step failed part-way, so sources already handled are not reported twice.
- **Permissions**: the job alone gets `contents: write` (to push the state branch) and
  `issues: write`; the workflow default is no permissions. The job runs only in
  `losanchos5/aige`, not in forks. A concurrency group stops two runs overlapping.
- **Cost**: standard GitHub-hosted runners are free for public repositories [3]. A run makes one
  request per source (plus retries), one per second, and takes a few minutes.

## What a run does, per source

1. **Fetch politely.** One request start per second across the run, a 30-second timeout per
   attempt, two retries with exponential backoff on network errors, timeouts and HTTP 408, 425,
   429, 500, 502, 503 and 504 (a `Retry-After` header is honoured up to 60 seconds), a 25 MB size cap and a User-Agent that
   names the site and this directory. PDFs that were seen before are requested with `If-None-Match`
   and `If-Modified-Since`; a `304 Not Modified` counts as unchanged.
2. **Normalise.** HTML is reduced to the text of the elements the source's `select` hint names.
   Scripts, styles, `noscript`, SVG, iframes and cookie or consent banners are always removed; when
   no `select` hint matches, the whole body is read minus navigation, headers, footers, forms,
   buttons, breadcrumbs and share widgets. Entities are decoded, whitespace is collapsed, and
   volatile fragments are replaced by placeholders: ISO date-times, clock times, "3 hours ago" and
   nonce-like tokens of 32 or more letters and digits. Plain calendar dates stay, because "Last
   update 3 August 2026" is a real signal. PDFs are not parsed: their bytes are hashed and their
   `ETag`, `Last-Modified` and size go into the issue.
3. **Compare.** The SHA-256 of the normalised text (or of the PDF bytes) is compared with the stored
   one. The first observation of a source only records a baseline, so the first run of the workflow
   opens no issue. A source whose URL or hints changed, or a new normaliser version, is re-baselined
   silently too, so tuning a hint never produces a false change.
4. **Report a change.** The issue carries a unified diff of the normalised text (three lines of
   context; long paragraph lines clipped around the first differing character; the excerpt capped
   at 150 lines and 12,000 characters), the list of tracked files that cite the exact URL (found
   with `git grep`, with links to the lines at the commit the run used) and a short checklist. If an
   open `regulatory-change` issue for the same source exists (matched by a hidden
   `<!-- reg-monitor:source=<id> -->` marker), the monitor adds a comment instead of a new issue.
   The label is created on first use.
5. **Report an unreachable source.** A fetch error, an HTTP error, a bot challenge or a normalised
   text shorter than the source's `minChars` counts as a failure, not a change. After three failed
   runs in a row the monitor opens (or comments on) an issue once; a later success resets the
   counter. A page that moved or was withdrawn is itself a regulatory signal.
6. **Record.** The new state of the source is written immediately, and only after its issue or
   comment was created: if GitHub refuses the call, the run fails and the next run tries again.

More than 10 changes in one run are not reported: the rest are deferred to the next run and the run
summary says so. A flood usually has one cause (a site redesign, a normaliser bug) that a person
should look at before dozens of issues open.

## Where the state lives, and why not on `main`

Every push to `main` deploys the site (`deploy.yml`), so a daily state commit there would redeploy
the site every day and mix machine output into the history of the book. The state lives on the
orphan branch `reg-monitor-state` instead, which shares no history with `main` and is never merged.

- `state.json`: per source, the SHA-256 of the normalised content, when that version was first seen,
  the previous hash, and the fetch-failure counter and last error. No daily timestamp is stored, so
  a quiet day makes no commit.
- `text/<id>.txt`: the last normalised text of each HTML source, used to diff the next version.

The workflow writes the branch with its `GITHUB_TOKEN`. Events caused by that token do not start new
workflow runs [2], and no workflow in this repository listens to the branch, so the push deploys
nothing. The Cloudflare Pages project is deployed by direct upload from `deploy.yml`; if it were ever
connected to Git, exclude `reg-monitor-state` from its branch deployments.

To reset the monitor, delete the `reg-monitor-state` branch: the next run initialises a new baseline
and opens no issue.

## Handling a `regulatory-change` issue

1. Open the official page; the excerpt is normalised text, not the source.
2. Decide whether a claim, date or status on the site depends on the change. Many changes are
   cosmetic (a reordered list, a new language version).
3. If one does, edit the files the issue lists, re-verify the citation in the house format
   (`STYLEGUIDE.md` §6) and update its "as of" date.
4. Close the issue. While it stays open, a further change on the same page adds a comment to it.

## Adding a source

1. The URL must be one the site cites: put the citation in a chapter or data file first. `--check`
   fails on a URL that no tracked file contains.
2. Add an entry to `sources.json`: `id` (lower case, hyphens), `name`, `url` (exactly as cited),
   `jurisdiction`, `category` (`law`, `guidance`, `standard`, `framework`, `report` or
   `certification`) and, usually, `hints`.
3. Look at what the monitor will read and tune the hints until the text holds the content and none of
   the page chrome:

   ```sh
   node tools/reg-monitor/monitor.mjs --preview --only <id>
   ```

   Run it twice: the hash must not change between two runs a minute apart.
4. Run `node tools/reg-monitor/monitor.mjs --check` and `node --test 'tools/reg-monitor/test/*.test.mjs'`.
5. Commit. The next scheduled run records the baseline without opening an issue.

### Hints

| Hint | Meaning |
|---|---|
| `select` | Selectors whose elements' text is kept, every match in document order. Supported: `tag`, `#id`, `.class`, `[attr]`, `[attr=v]`, `[attr*=v]`, `[attr^=v]`, `[attr$=v]` and compounds such as `header.c-content-item-header`; no descendant combinators. Prefer elements with explicit end tags (`div`, `main`, `section`, `article`). |
| `drop` | Selectors removed inside the selected elements (news feeds, related-content lists, forms). |
| `attributes` | `selector@attr` specs read as `selector@attr: value` lines, for pages whose text is loaded by script. |
| `linkPattern` | A regular expression; links whose `href` matches keep their URL in the text, so a new PDF version is a change. |
| `dropLines` | Regular expressions; whole lines that match are removed. |
| `strip` | Regular expressions; matching fragments are removed from every line. |
| `minChars` | Shortest acceptable normalised text (default 200); anything shorter is a failure, not a change. |

`transport` sits beside `hints`: `fetch` (default) or `curl`, for servers that refuse Node's HTTP
client but serve curl.

## Running it locally

```sh
node tools/reg-monitor/monitor.mjs --check                    # validate sources.json, no network
node tools/reg-monitor/monitor.mjs --list                     # print the sources
node tools/reg-monitor/monitor.mjs --preview --only <id>      # fetch and show the normalised text
node tools/reg-monitor/monitor.mjs --state-dir <dir> --dry-run  # full run, writes nothing
node --test 'tools/reg-monitor/test/*.test.mjs'               # unit tests
```

A dry run needs no token and never calls the GitHub API. A real run needs `GITHUB_TOKEN` and
`GITHUB_REPOSITORY` and an existing `--state-dir`; it is meant for the workflow only.

## Known limits (as of 2026-09-24)

- **EUR-Lex** answered a burst of requests from one address with an AWS WAF challenge (HTTP 202 and
  a script page) during testing. The monitor treats that as a failure, not a change; if the runner
  addresses are challenged every day, the three EUR-Lex sources will be reported unreachable and
  need another route (the Publications Office Cellar endpoints are the obvious candidate).
- **law.go.kr** loads the text of Korean laws by script. The monitor reads only what the server
  renders: the title and the hidden fields with the law name, version sequence, promulgation date
  and number, and an undocumented `nwYn` field that was `Y` on the Act's version in force and empty
  on its superseded 2025 version when checked. An amendment is therefore seen, if at all, as a
  change of those fields rather than as a text diff; the Korean sources need a periodic manual look.
- **nysenate.gov** refused Node's HTTP client (403) and served curl when checked, so the two New
  York sources use `"transport": "curl"`.
- **Fixed-version URLs** (an Official Journal act, a consolidation of a given date, an enrolled bill
  PDF) change rarely by design. Where possible the monitor reads the part of the page that announces
  newer versions (the EUR-Lex list of consolidated versions, the IAPP page's link to the current
  body-of-knowledge PDF, the CSRC document history).
- **Scheduled workflows** run only from the default branch, can be delayed at busy times, and are
  disabled automatically in a public repository after 60 days without repository activity;
  notifications about them go to the user who last changed the cron line [1]. Re-enable the
  workflow from the Actions tab if the repository goes quiet.

## Security

The fetched pages are untrusted input. They are only parsed as text: nothing from a page is
executed, and the diff appears in the issue inside a code fence longer than any backtick run it
contains, so page content cannot break out of the fence, and GitHub does not turn mentions or
references inside code into notifications or links. Issue lookups skip pull requests, which the
issues API also returns [4]. The token is the workflow's own `GITHUB_TOKEN`, scoped to the job; no
other secret is used.

## Files

- `monitor.mjs`: the command line and the per-source loop.
- `sources.json`: the watched pages and their hints.
- `lib/`: `fetcher.mjs` (polite HTTP), `normalise.mjs` (HTML to stable text), `diff.mjs` (Myers
  line diff and unified output), `cites.mjs` (which files cite a URL), `issue.mjs` (issue and
  comment bodies), `github.mjs` (the four REST calls), `state.mjs` (state files), `sources.mjs`
  (validation).
- `test/`: `node --test` suites for all of the above, with fixtures and fakes; they make no network
  calls.

## Sources

[1] Events that trigger workflows: `schedule` (runs only on the default branch; can be delayed during
periods of high load, including the start of every hour; in a public repository, scheduled workflows
are disabled when no repository activity has occurred in 60 days; notifications go to the user who
last modified the cron syntax). GitHub Docs. 2026. https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows (verified: primary)
[2] Triggering a workflow (events triggered by the repository's `GITHUB_TOKEN` do not create a new
workflow run, except `workflow_dispatch` and `repository_dispatch`). GitHub Docs. 2026. https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow (verified: primary)
[3] GitHub Actions billing (usage is free for self-hosted runners and for public repositories that
use standard GitHub-hosted runners). GitHub Docs. 2026. https://docs.github.com/en/billing/concepts/product-billing/github-actions (verified: primary)
[4] REST API endpoints for issues (every pull request is an issue to the REST API and is identified
by the `pull_request` key; `per_page` maximum 100). GitHub Docs. 2026. https://docs.github.com/en/rest/issues/issues (verified: primary)

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give appropriate
> credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
