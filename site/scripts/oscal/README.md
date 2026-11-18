# OSCAL JSON schemas (NIST)

The three files here are unmodified copies of the JSON schemas NIST publishes with OSCAL v1.2.3
(released 2026-08-07). `../oscal-check.mjs` validates the files under `dist/oscal/` against them at
the end of the build, and the crosswalk explorer test validates its download against the mapping
schema.

| File | Source | SHA-256 |
| --- | --- | --- |
| `oscal_catalog_schema.json` | https://github.com/usnistgov/OSCAL/releases/download/v1.2.3/oscal_catalog_schema.json | `ab95836e9e8dfeb6fde80007f6cc76fa3192f595d427c751a3f3923c3f474fc2` |
| `oscal_profile_schema.json` | https://github.com/usnistgov/OSCAL/releases/download/v1.2.3/oscal_profile_schema.json | `7c5ff5a92683b6a80ce6a3474dea04e0ea8680a4ecb60702ffa08ebfc677e6cb` |
| `oscal_mapping_schema.json` | https://github.com/usnistgov/OSCAL/releases/download/v1.2.3/oscal_mapping_schema.json | `ed28b68c8e56cc7d39f0c6076a5d7da3e8100fbe25abf5bb731120bd34f8817e` |

Licence: OSCAL is in the public domain under CC0 1.0, with a request to acknowledge NIST as the
source (https://github.com/usnistgov/OSCAL/blob/main/LICENSE.md).

The schemas are JSON Schema draft-07 and use formats (`uri`, `uri-reference`, `date-time`, `email`)
that Ajv does not know without a plugin. Compile them with
`new Ajv({ strict: false, validateFormats: false })`: the OSCAL datatypes carry their own `pattern`,
which is still enforced. JSON Schema validation does not cover the Metaschema constraints.

To move to a newer OSCAL release, replace the three files, update the version and the hashes here,
and change `OSCAL_VERSION` in `site/src/lib/oscal.ts` and `site/public/crosswalk-explorer.js`.
