// oscal.ts: the open control profiles as OSCAL 1.2.3 documents, built from the
// same registry as /controls (src/data/controls). Three pure builders back the
// static endpoints under /oscal/ (src/pages/oscal):
//
//   oscalCatalog()          /oscal/catalog.json            one group per profile
//   oscalProfile(slug)      /oscal/profiles/<slug>.json    imports the catalog
//   oscalControlMappings()  /oscal/mappings/controls.json  controls vs frameworks
//
// Deterministic (design D5): every uuid is a UUID v5 of a fixed namespace and a
// stable key, and `last-modified` is the newest `updated` date of the profiles
// a document covers, at 00:00:00Z. Nothing reads the clock or a random source,
// so two builds of one commit give the same bytes. scripts/oscal-check.mjs
// validates the built files against the NIST schemas in scripts/oscal/.
//
// OSCAL is strict about strings: ids and names are tokens, single-line values
// carry no leading, trailing or inner line breaks, and an array is never empty.
// `line` and `drop` below enforce that; custom parts and props carry `ns`.
//
// Illustrative, not a claim of conformity: a mapping is this project's reading
// of a framework's public text.
import { createHash } from 'node:crypto';
import {
  profiles,
  controlsIn,
  controlPath,
  profilePath,
  profileBySlug,
  controlsUpdated,
  type Control,
  type ClassifiedControl,
  type ControlProfile,
} from '../data/controls';
import { personById } from '../data/people';
import { clauseId } from '../data/crosswalk';
import { site } from '../data/site';
import { sourceText } from './sources';
import { buildControlsCrosswalk, CONTROLS_CROSSWALK_PATH, CROSSWALK_DISCLAIMER } from './controls-crosswalk';

export const OSCAL_VERSION = '1.2.3';

/** Namespace of this site's own part and prop names (the explorer export uses the same). */
export const OSCAL_NS = 'https://aigovernanceengineer.com/ns/oscal';

export const OSCAL_CATALOG_PATH = '/oscal/catalog.json';
export const OSCAL_MAPPINGS_PATH = '/oscal/mappings/controls.json';
export const oscalProfilePath = (slug: string): string => `/oscal/profiles/${slug}.json`;

const DOI_SCHEME = 'http://www.doi.org/';
// RFC 4122 URL namespace; the document namespace below is derived from it and OSCAL_NS.
const URL_NAMESPACE = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

const NOTICE =
  'Draft control specifications, open for technical review: illustrative, not a claim of conformity, not legal advice, and binding on no one.';
const MAPPING_NOTICE =
  `${CROSSWALK_DISCLAIMER} Each pair links a control to a clause it cites (OSCAL relationship "intersects-with"): ` +
  'the control and the clause deal with the same topic, not that meeting one meets the other.';

type Json = Record<string, unknown>;

const abs = (path: string): string => new URL(path, site.url).href;

/** UUID v5 (RFC 4122 section 4.3): SHA-1 over the namespace bytes and the name. */
function uuidV5(name: string, namespace: string): string {
  const bytes = createHash('sha1')
    .update(Buffer.from(namespace.replace(/-/g, ''), 'hex'))
    .update(name, 'utf8')
    .digest()
    .subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = bytes.toString('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const NAMESPACE = uuidV5(OSCAL_NS, URL_NAMESPACE);
const uuid = (...key: string[]): string => uuidV5(key.join('|'), NAMESPACE);

/** A single-line OSCAL string: whitespace folded, trimmed; '' when nothing is left. */
const line = (text: string | null | undefined): string => (text ?? '').replace(/\s+/g, ' ').trim();

/** Prose: trimmed, inner paragraphs kept. */
const prose = (...paragraphs: (string | null | undefined)[]): string =>
  paragraphs.map((p) => (p ?? '').trim()).filter(Boolean).join('\n\n');

/** Drop keys whose value is '', undefined or an empty array (OSCAL arrays have minItems 1). */
function drop(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && v.length === 0)),
  );
}

/** A prop; null when its value is empty, so callers can filter it out. */
const prop = (name: string, value: string, ns: string | null = OSCAL_NS): Json | null => {
  const v = line(value);
  return v ? drop({ name, ns: ns ?? undefined, value: v }) : null;
};
const props = (...list: (Json | null)[]): Json[] => list.filter((p): p is Json => p !== null);

const dateTime = (day: string): string => `${day}T00:00:00Z`;

interface MetadataInput {
  title: string;
  updated: string;
  published?: string;
  version: string;
  authors: readonly string[];
  dois: readonly (string | undefined)[];
  links: Json[];
  notice: string;
}

/** The shared metadata block (design D6). */
function metadata(m: MetadataInput): Json {
  const parties = m.authors.map((name) => ({ uuid: uuid('party', name), type: 'person', name }));
  const dois = [...new Set(m.dois.filter((d): d is string => Boolean(d)))];
  return drop({
    title: line(m.title),
    published: m.published ? dateTime(m.published) : undefined,
    'last-modified': dateTime(m.updated),
    version: m.version,
    'oscal-version': OSCAL_VERSION,
    'document-ids': dois.map((identifier) => ({ scheme: DOI_SCHEME, identifier })),
    props: props(prop('notice', m.notice)),
    links: [...m.links, { href: site.licenseUrl, rel: 'license', text: site.license }],
    roles: [{ id: 'creator', title: 'Creator' }],
    parties,
    'responsible-parties': [{ 'role-id': 'creator', 'party-uuids': parties.map((p) => p.uuid) }],
    remarks: `${m.notice} Licence: ${site.license} (${site.licenseUrl}).`,
  });
}

// ---- Catalog ----------------------------------------------------------------

function part(name: string, body: Json): Json | null {
  const out = drop({ name, ...body });
  return out.prose || out.parts ? out : null;
}

function controlParts(c: Control): Json[] {
  const custom = (name: string, body: Json) => part(name, { ns: OSCAL_NS, ...body });
  const list = [
    part('statement', { id: `${c.id}_smt`, prose: prose(c.objective) }),
    custom('scope', { prose: prose(c.scope) }),
    part('guidance', { id: `${c.id}_gdn`, prose: prose(...c.implementationNotes) }),
    custom('failure-modes', {
      parts: c.failureModes.map((text) => custom('failure-mode', { prose: prose(text) })).filter(Boolean),
    }),
    custom('verification', {
      parts: c.verification
        .map((v) => custom('verification-step', { props: props(prop('kind', v.kind)), prose: prose(v.text) }))
        .filter(Boolean),
    }),
    custom('evidence', {
      parts: c.evidence
        .map((e) =>
          custom('evidence-item', {
            props: props(prop('layer', String(e.layer)), e.schemaId ? prop('schema-id', e.schemaId) : null),
            links: e.schemaId ? [{ href: abs(`/schemas/${e.schemaId}.v1.json`), rel: 'reference', text: 'Record schema' }] : [],
            prose: prose(e.artefact),
          }),
        )
        .filter(Boolean),
    }),
    custom('failure-response', {
      props: props(prop('effect', c.failureResponse.effect)),
      prose: prose(c.failureResponse.text),
    }),
  ];
  return list.filter((p): p is Json => p !== null);
}

function oscalControl(c: ClassifiedControl): Json {
  return drop({
    id: c.id,
    class: 'aige',
    title: line(c.title),
    props: props(
      prop('label', c.id, null),
      prop('sort-id', c.id, null),
      prop('layer', String(c.layer)),
      prop('status', c.status),
      prop('reviewer-status', c.reviewerStatus),
      prop('depth', c.depth),
      prop('version', c.version),
      prop('family', c.family),
      ...(c.secondaryFamilies ?? []).map((f) => prop('secondary-family', f)),
      ...c.appliesTo.map((a) => prop('applies-to', a)),
    ),
    links: [
      { href: abs(controlPath(c)), rel: 'canonical' },
      ...c.references
        .filter((src) => line(src.url))
        .map((src) => drop({ href: line(src.url), rel: 'reference', text: line(sourceText(src)) })),
    ],
    parts: controlParts(c),
  });
}

/** The whole registry as one OSCAL catalog: one group per profile, controls in data order. */
export function oscalCatalog(): Json {
  return {
    catalog: {
      uuid: uuid('catalog', site.bokVersion, dateTime(controlsUpdated())),
      metadata: metadata({
        title: `${site.name} open control catalog (illustrative, not a claim of conformity)`,
        updated: controlsUpdated(),
        version: site.bokVersion,
        authors: [site.author],
        dois: [site.conceptDoi],
        links: [{ href: abs('/controls'), rel: 'alternate', text: 'Open control profiles' }],
        notice: NOTICE,
      }),
      groups: profiles.map((p) =>
        drop({
          id: p.slug,
          title: line(p.title),
          props: props(prop('version', p.version), prop('status', p.status)),
          links: [{ href: abs(profilePath(p)), rel: 'canonical' }],
          controls: controlsIn(p.slug).map(oscalControl),
        }),
      ),
    },
  };
}

// ---- Profiles ---------------------------------------------------------------

/** One profile of the site as an OSCAL profile that selects its controls from the catalog. */
export function oscalProfile(slug: string): Json {
  const p: ControlProfile | undefined = profileBySlug(slug);
  if (!p) throw new Error(`oscal: unknown profile ${slug}`);
  return {
    profile: {
      uuid: uuid('profile', p.slug, p.version, dateTime(p.updated)),
      metadata: metadata({
        title: `${p.title} (illustrative, not a claim of conformity)`,
        updated: p.updated,
        published: p.published,
        version: p.version,
        authors: p.authors.map((id) => personById(id)?.name ?? id),
        dois: [p.doi, p.conceptDoi, site.conceptDoi],
        links: [{ href: abs(profilePath(p)), rel: 'alternate', text: p.shortTitle }],
        notice: NOTICE,
      }),
      imports: [
        {
          href: abs(OSCAL_CATALOG_PATH),
          'include-controls': [{ 'with-ids': controlsIn(p.slug).map((c) => c.id) }],
        },
      ],
      merge: { 'as-is': true },
    },
  };
}

// ---- Mapping collection -----------------------------------------------------

/** The controls crosswalk as an OSCAL mapping collection: one mapping per framework. */
export function oscalControlMappings(): Json {
  const crosswalk = buildControlsCrosswalk();
  const catalogRef = {
    type: 'catalog',
    href: abs(OSCAL_CATALOG_PATH),
    props: [{ name: 'framework-id', ns: OSCAL_NS, value: 'aige-controls' }],
    remarks: `${site.name} open control catalog; id-refs are its control ids.`,
  };
  const mappings = crosswalk.frameworks.map((fw) =>
    drop({
      uuid: uuid('mapping', fw.id),
      'source-resource': catalogRef,
      'target-resource': drop({
        type: 'catalog',
        href: fw.url ? abs(fw.url) : abs(`${CONTROLS_CROSSWALK_PATH}#${fw.id}`),
        props: [{ name: 'framework-id', ns: OSCAL_NS, value: fw.id }],
        remarks: line(
          `${fw.name}. ${fw.note ?? ''} href points to the framework's canonical text, not to an OSCAL catalog. id-refs are this site's clause ids for the framework, normalised to tokens; they need not match the ids of an OSCAL catalog the issuer may publish.`,
        ),
      }),
      maps: fw.rows.flatMap((row) =>
        row.controls.map((control) => ({
          uuid: uuid('map', fw.id, row.ref, control),
          relationship: 'intersects-with',
          sources: [{ type: 'control', 'id-ref': control }],
          targets: [
            drop({
              type: 'control',
              // The crosswalk's own rule turns a clause reference into a token.
              'id-ref': clauseId({ framework: fw.id, ref: row.ref }),
              props: [
                { name: 'label', ns: OSCAL_NS, value: line(row.ref) },
                // The crosswalk rows carry no granularity field; SP 800-53 is the one framework whose rows are families.
                ...(fw.id === 'nist-sp-800-53' ? [{ name: 'granularity', ns: OSCAL_NS, value: 'family' }] : []),
              ],
              links: row.url ? [{ href: abs(row.url), rel: 'reference' }] : [],
              remarks: line(row.note ? `${row.name} (${row.note})` : row.name),
            }),
          ],
        })),
      ),
    }),
  );
  return {
    'mapping-collection': {
      uuid: uuid('mapping-collection', 'controls', site.bokVersion, dateTime(controlsUpdated())),
      metadata: metadata({
        title: `${site.name} open controls mapped to frameworks (illustrative, not a claim of conformity)`,
        updated: controlsUpdated(),
        version: site.bokVersion,
        authors: [site.author],
        dois: [site.conceptDoi],
        links: [{ href: abs(CONTROLS_CROSSWALK_PATH), rel: 'alternate', text: 'AI governance controls crosswalk' }],
        notice: MAPPING_NOTICE,
      }),
      provenance: {
        method: 'human',
        'matching-rationale': 'semantic',
        status: 'draft',
        'mapping-description': `${MAPPING_NOTICE} Pairs come from the mappings each control states in the control registry, read by hand from each framework's public text.`,
      },
      mappings,
    },
  };
}
