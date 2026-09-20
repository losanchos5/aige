# Help wanted: add China's binding AI rules to the regulatory map

Labels: help wanted, chapter-08, regulatory-map

## The gap

Chapter 08 (`bok/08-regulatory-map.md`) maps obligations to artefacts across the EU, the US
(federal and state), South Korea, Singapore and the UK. China is absent — there is no row in the
"Other jurisdictions" table, and `site/src/data/frameworks.ts` has no China framework group. For a
governance function operating across borders, that is a real hole in the map, and the chapter's
"What is NOT harmonised yet" section already sets the precedent of naming holes plainly.

## What to add

Add China's binding AI instruments as rows in the "Other jurisdictions" table of
`bok/08-regulatory-map.md`, and (if a per-obligation crosswalk is warranted) a corresponding group
in `site/src/data/frameworks.ts`. Candidate primary sources to locate and verify (do not copy these
descriptions without opening the official text — assign the verification tag yourself):

- Interim Measures for the Management of Generative AI Services (生成式人工智能服务管理暂行办法).
- Provisions on the Administration of Deep Synthesis of Internet Information Services (深度合成规定).
- Provisions on the Management of Algorithmic Recommendations for Internet Information Services.
- Measures for Labelling AI-Generated and Synthetic Content, and the companion mandatory standard.

For each: the duty holder it binds, what it asks for, the engineering artefact that evidences it,
and the layer(s) 1–5 it touches — the same columns the table already uses.

## Acceptance criteria

- Rows follow the existing table shape and the chapter template in `STYLEGUIDE.md` §3.
- Every factual claim carries a `[n]` citation with a matching row in `sources/SOURCES.md` under the
  chapter's section, tagged `primary`, `secondary` or `reported` per `STYLEGUIDE.md` §6.
- Status is stamped with a date, as the other jurisdiction rows are.
- Mappings keep the "illustrative, not a claim of conformity" framing.
