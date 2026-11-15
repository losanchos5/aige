# author-byline Specification

## Purpose
Mostrar al autor como en un artículo publicado (foto, nombre, título y acceso a LinkedIn) allí donde aterriza el lector, y medir cuántos lectores pasan a LinkedIn o al email desde cada sitio.

## Requirements

### Requirement: Author byline on reference pages and chapters

Every page that today shows the author byline (reference pages with a dated byline, and Body of Knowledge chapters plus `/ai-governance` through the chapter header) SHALL show, below the H1, a byline with: a round photo of the author, the author's name linked to `/about` with `rel="author"`, a LinkedIn button, and the visible title "AI Governance Engineer". The dates the page already showed SHALL stay visible next to the title. The Thesis pages SHALL keep showing no author byline.

#### Scenario: Glossary term shows the author byline

- **WHEN** a reader opens any `/glossary/<slug>` page
- **THEN** below the H1 they see the author photo, "Jorge García Aibar" linking to `/about`, a LinkedIn button and "AI Governance Engineer", followed by the page's "Updated" date in a `<time datetime>` element

#### Scenario: Chapter shows the author byline

- **WHEN** a reader opens a Body of Knowledge chapter
- **THEN** the chapter header shows the same author byline above the meta line, and the meta line no longer repeats the author's name

#### Scenario: Thesis stays without byline

- **WHEN** a reader opens `/thesis`
- **THEN** no author byline is shown

### Requirement: LinkedIn button

The LinkedIn button SHALL be a link showing only the LinkedIn logo, pointing to the author's personal LinkedIn profile (`site.linkedin`), opening in a new tab with `rel="noopener noreferrer"`, with an accessible name that names the author and LinkedIn, a visible focus indicator, and a hit area of at least 24 by 24 CSS pixels.

#### Scenario: Keyboard and screen reader access

- **WHEN** a keyboard user tabs to the LinkedIn button
- **THEN** a focus ring is visible and the accessible name reads "Jorge García Aibar on LinkedIn" (translated on non-English pages)

### Requirement: Author block on the About page

`/about` SHALL open, before any other section, with a large author block: photo, name, title "AI Governance Engineer" and the LinkedIn button. The block SHALL NOT carry a value proposition sentence.

#### Scenario: About opens with the author

- **WHEN** a reader opens `/about`
- **THEN** the first content after the page header is the author block with the photo, name, title and LinkedIn button

### Requirement: Contact click measurement

Each LinkedIn button SHALL carry the analytics event `linkedin-click` with a `placement` property whose value is `byline`, `chapter` or `about` according to where it is. Each `mailto:` link on `/about` SHALL carry the analytics event `contact-email`.

#### Scenario: Click from a glossary page is attributed

- **WHEN** a reader clicks the LinkedIn button on a glossary page
- **THEN** analytics records `linkedin-click` with `placement=byline`

### Requirement: Author image in structured data

The JSON-LD `Person` node for the author SHALL include `image` with the absolute URL of the author photo. The `jobTitle` SHALL stay as it is today.

#### Scenario: Person carries image

- **WHEN** the built HTML of any page with the author `Person` node is parsed
- **THEN** that node has an `image` equal to `https://aigovernanceengineer.com/images/author/jorge-garcia-aibar.jpg`

### Requirement: Photo weight and layout stability

The byline photo SHALL be served from the site's own origin as an image no larger than 96 by 96 pixels, with explicit `width` and `height`, a non-empty `alt` or an empty `alt` when the name is adjacent text, and SHALL NOT cause layout shift.

#### Scenario: No layout shift from the photo

- **WHEN** a page with the byline loads
- **THEN** the photo's box is reserved before the image arrives (explicit dimensions) and the image request is to the same origin
