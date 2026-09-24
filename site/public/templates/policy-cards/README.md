# Policy Card builder: samples

> Illustrative, review before use. Indicative, not legal advice and not a conformity claim.

One folder per rule template of the Policy Card builder
(https://aigovernanceengineer.com/toolkit/policy-card), generated with each template's default
values and an effective date of 2026-10-01 by `site/scripts/policy-card-samples.mjs`, the same
code the page runs. Each folder holds:

- `<card>.policy-card.md`: the Policy Card for people;
- `<card>.policy-card.yaml` and `.json`: the same card for machines, valid against
  https://aigovernanceengineer.com/schemas/policy-card.v1.json;
- `<card>.rego` and `<card>_test.rego`: the OPA/Rego module (Rego v1 syntax) and its unit tests;
- `<card>.cedar` and `<card>.cedartests.json`: the Cedar stub and its tests;
- `<card>.input.json`: a compliant example input;
- `policy-card-<card>.yml`: the CI hook, a GitHub Actions workflow.

The generated files name their own paths (`policies/...` and `.github/workflows/...`); move them
there in your repository. Verification: run `opa check --strict` and `opa test` on the Rego
files and `cedar run-tests` on the Cedar files. On 2026-09-24 every sample here passed them with
OPA 1.21.0 and cedar-policy-cli 4.13.0.

Templates: `registered-agents-only`, `eval-score-gate`, `no-personal-data-external`, `approval-for-tool`, `model-card-before-release`, `expired-exception-blocks-build`, `custom`.

Part of the AI Governance Engineer toolkit: https://aigovernanceengineer.com/toolkit

> This work is licensed under **CC BY 4.0**. You may share and adapt it provided you give
> appropriate credit, link to the licence and indicate changes. Attribution: Jorge García Aibar.
