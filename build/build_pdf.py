#!/usr/bin/env python3
"""Assemble the AI Governance Engineering Thesis & Body of Knowledge into PDFs and a site preview.

Pipeline: Markdown -> one HTML (python-markdown: tables, fenced_code, toc, attr_list) -> PDF via
Playwright/Chromium page.pdf (A4, print_background, ~18mm margins, page numbers in the footer).

Outputs (written to aige/dist/), where <v> is `bokVersion` read from site/src/data/site.ts:
  - AI-Governance-Engineering-BoK-v<v>.pdf         cover + TOC + thesis + every chapter (00-NN) + contributors + changelog
  - AI-Governance-Engineering-Thesis-v<v>.pdf      cover + thesis only
  - site-preview.html                              light theme, sticky left TOC, max-width 780px (website preview)

Chapter 05 is assembled: the catalogue (bok/05-patterns.md) keeps its introduction and template,
then every pattern page (bok/patterns/<slug>.md, in `order`) follows in full, one heading level
down, in place of the catalogue's per-pattern summaries; the catalogue's own sources close the
chapter. The PDF therefore reads as the single chapter 05 did before the patterns got their pages.

Run:  python build/build_pdf.py            (from the aige/ directory, or any cwd; paths are resolved from this file)
      python build/build_pdf.py --html-only   (site-preview.html only, no browser needed)
The release copies dist/AI-Governance-Engineering-BoK-v<v>.pdf to site/public/downloads/aige-bok-v<v>.pdf.
"""

from __future__ import annotations

import html
import re
import shutil
from pathlib import Path

import markdown
from markdown.extensions.toc import slugify as md_slugify

AIGE = Path(__file__).resolve().parent.parent          # .../aige
DIST = AIGE / "dist"
BOK = AIGE / "bok"


def _read_bok_version(default: str = "0.3.1") -> str:
    """Read `bokVersion` from site/src/data/site.ts so the PDF filenames track the
    single source of truth. Falls back to `default` if the file or field is missing."""
    site_ts = AIGE / "site" / "src" / "data" / "site.ts"
    try:
        match = re.search(r"bokVersion:\s*'([^']+)'", site_ts.read_text(encoding="utf-8"))
        return match.group(1) if match else default
    except OSError:
        return default


BOK_VERSION = _read_bok_version()
BOK_PDF = f"AI-Governance-Engineering-BoK-v{BOK_VERSION}.pdf"
THESIS_PDF = f"AI-Governance-Engineering-Thesis-v{BOK_VERSION}.pdf"

TITLE = "AI Governance Engineering"
SUBTITLE_BOK = f"The Thesis &amp; Body of Knowledge · v{BOK_VERSION} · September 2026"
SUBTITLE_MAN = f"The Thesis · v{BOK_VERSION} · September 2026"
BOK_CREDITS = (
    "Body of Knowledge · Jorge García Aibar",
    "Thesis · Jorge García Aibar & Aurélie Pols",
)
THESIS_CREDITS = ("Jorge García Aibar & Aurélie Pols",)
HOME = "aigovernanceengineer.com"
LICENCE = "CC BY 4.0"

# Short TOC labels for the chapters whose H1 is longer than the table of contents wants. Any other
# chapter is labelled from its own H1 ("11. AI, defined for governance" -> "11 · AI, defined for
# governance"), so a new chapter file joins the PDF without editing this script.
CHAPTER_LABELS: dict[str, str] = {
    "00-preface": "00 · Preface",
    "01-definition": "01 · The definition",
    "02-why-now": "02 · Why now",
    "03-values-principles": "03 · Values and principles",
    "04-the-stack": "04 · The stack (five layers)",
    "05-patterns": "05 · Patterns",
    "06-the-role": "06 · The role",
    "07-maturity-model": "07 · Maturity model",
    "08-regulatory-map": "08 · Regulatory map",
    "09-glossary": "09 · Glossary",
    "10-reading-list": "10 · Reading list",
}

PATTERNS_CHAPTER = BOK / "05-patterns.md"
PATTERN_PAGES = BOK / "patterns"
FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.S)


def _frontmatter(text: str) -> tuple[dict[str, str], str]:
    """Split a chapter or pattern file into its flat `key: value` frontmatter and its body."""
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}, text
    fields: dict[str, str] = {}
    for line in match.group(1).splitlines():
        key, _, value = line.partition(":")
        fields[key.strip()] = value.strip().strip('"')
    return fields, text[match.end():]


def _chapter_label(path: Path) -> str:
    label = CHAPTER_LABELS.get(path.stem)
    if label:
        return label
    first = _frontmatter(path.read_text(encoding="utf-8"))[1].lstrip().splitlines()[0]
    match = re.match(r"#\s+(\d{2})\.\s+(.*)$", first)
    return f"{match.group(1)} · {match.group(2).strip()}" if match else path.stem


def _chapter_docs() -> list[tuple[str, Path, str]]:
    """Every bok/NN-*.md chapter, in file-name order (the reading order)."""
    return [
        (f"ch{path.name[:2]}", path, _chapter_label(path))
        for path in sorted(BOK.glob("[0-9][0-9]-*.md"))
    ]


# Order of documents in the full Body-of-Knowledge PDF. (key, path, short TOC label)
DOCS: list[tuple[str, Path, str]] = [
    ("thesis", AIGE / "THESIS.md", "The Thesis"),
    *_chapter_docs(),
    ("contributors", BOK / "CONTRIBUTORS.md", "Contributors & signatories"),
    ("changelog", BOK / "CHANGELOG.md", "Changelog"),
]


def render_markdown(text: str) -> str:
    md = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "attr_list"])
    return md.convert(text)


def _demote(markdown_text: str) -> str:
    """Push every ATX heading one level down (outside fenced code)."""
    out, fenced = [], False
    for line in markdown_text.splitlines():
        if line.lstrip().startswith("```"):
            fenced = not fenced
        elif not fenced and re.match(r"#{1,5}\s", line):
            line = "#" + line
        out.append(line)
    return "\n".join(out)


def patterns_chapter_markdown() -> str:
    """Chapter 05 for print: the catalogue's intro and template, then each pattern page in full
    (one level down) where the catalogue has its summary, then the catalogue's own sources.
    Links to /patterns/<slug> become in-document links to the pattern's heading."""
    catalogue = PATTERNS_CHAPTER.read_text(encoding="utf-8")
    head, _, rest = catalogue.partition("\n## Pattern: ")
    _, _, sources = rest.partition("\n## Sources\n")

    pages = []
    for path in sorted(PATTERN_PAGES.glob("*.md")):
        fields, body = _frontmatter(path.read_text(encoding="utf-8"))
        pages.append((int(fields.get("order", "0")), fields.get("id", path.stem), fields.get("title", path.stem), body))
    pages.sort()

    anchors = {slug: f"#ch05-{md_slugify(f'Pattern: {title}', '-')}" for _, slug, title, _ in pages}

    def local_links(text: str) -> str:
        return re.sub(
            r"\]\(/patterns/([a-z0-9-]+)\)",
            lambda m: f"]({anchors[m.group(1)]})" if m.group(1) in anchors else m.group(0),
            text,
        )

    parts = [local_links(head.rstrip())]
    parts += [local_links(_demote(body.strip())) for _, _, _, body in pages]
    parts.append(f"## Sources\n{sources.rstrip()}")
    return "\n\n".join(parts) + "\n"


def document_markdown(path: Path) -> str:
    """The Markdown the PDF renders for one document (chapter 05 is assembled)."""
    if path == PATTERNS_CHAPTER and PATTERN_PAGES.is_dir():
        return patterns_chapter_markdown()
    return _frontmatter(path.read_text(encoding="utf-8"))[1]


def prefix_ids(chunk: str, key: str) -> str:
    """Namespace heading ids so identical section titles (e.g. "Sources") don't collide across chapters."""
    return re.sub(r'id="([^"]+)"', lambda m: f'id="{key}-{m.group(1)}"', chunk)


def decorate(chunk: str) -> str:
    """Tag the lead-summary blockquote, the "In practice" callouts and the "Maps to" line for styling."""
    # First blockquote right after the chapter H1 is the one-line summary.
    chunk = re.sub(
        r"(</h1>\s*)<blockquote>",
        r'\1<blockquote class="summary">',
        chunk,
        count=1,
    )
    # "In practice" (and "Example (illustrative)") blockquotes become shaded callouts.
    chunk = re.sub(
        r"<blockquote>\s*<p><strong>(In practice|Example)",
        r'<blockquote class="callout"><p><strong>\1',
        chunk,
    )
    # "Maps to:" paragraph.
    chunk = chunk.replace("<p><strong>Maps to:</strong>", '<p class="mapsto"><strong>Maps to:</strong>')
    return chunk


def build_content() -> str:
    """Concatenated <section> blocks for every document, in order."""
    parts = []
    for key, path, _label in DOCS:
        text = document_markdown(path)
        chunk = render_markdown(text)
        chunk = prefix_ids(chunk, key)
        chunk = decorate(chunk)
        parts.append(f'<section class="chapter" id="{key}">\n{chunk}\n</section>')
    return "\n".join(parts)


def build_toc() -> str:
    rows = []
    for key, _path, label in DOCS:
        rows.append(f'<li><a href="#{key}">{html.escape(label)}</a></li>')
    return (
        '<section class="frontmatter toc-page" id="toc">\n'
        "<h1>Contents</h1>\n"
        f'<ol class="toc-list">\n{chr(10).join(rows)}\n</ol>\n'
        "</section>"
    )


def cover(subtitle: str, credits: tuple[str, ...]) -> str:
    credit_lines = "\n".join(
        f'  <p class="cover-author">{html.escape(credit)}</p>' for credit in credits
    )
    return (
        '<section class="cover" id="cover">\n'
        f'  <div class="cover-rule"></div>\n'
        f"  <h1 class=\"cover-title\">{TITLE}</h1>\n"
        f'  <p class="cover-subtitle">{subtitle}</p>\n'
        f'  <div class="cover-rule"></div>\n'
        f"{credit_lines}\n"
        f'  <p class="cover-meta">{HOME}</p>\n'
        f'  <p class="cover-meta">Licensed {LICENCE}</p>\n'
        "</section>"
    )


CSS = r"""
:root{
  --navy:#0f2036; --navy2:#1c3a5e; --ink:#1a2330; --muted:#5a6675;
  --cyan:#0891B2; --cyan-soft:#e6f4f8; --line:#d9dee5; --zebra:#f4f7fa; --callout:#f0f7fa;
}
*{box-sizing:border-box;}
html{ -webkit-print-color-adjust:exact; print-color-adjust:exact; }
body{
  font-family:'Inter','Segoe UI',system-ui,-apple-system,Helvetica,Arial,sans-serif;
  color:var(--ink); line-height:1.37; font-size:9.4pt; margin:0;
}
h1,h2,h3{ color:var(--navy); font-weight:700; line-height:1.18; }
h1{ font-size:19pt; margin:0 0 .3em; letter-spacing:-.01em; }
h2{ font-size:12.5pt; margin:1.05em 0 .4em; padding-bottom:.12em; border-bottom:2px solid var(--cyan); }
h3{ font-size:10.5pt; color:var(--navy2); margin:.85em 0 .3em; }
p{ margin:.4em 0; }
a{ color:var(--cyan); text-decoration:none; }
strong{ color:var(--navy2); }
code,kbd{ font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;
  font-size:.86em; background:#eef1f5; padding:.08em .35em; border-radius:3px; color:#0b2a44; }
pre{ background:#0f2036; color:#e8eef6; padding:12px 14px; border-radius:6px; overflow-x:auto;
  font-size:.82em; line-height:1.45; }
pre code{ background:none; color:inherit; padding:0; }

/* Tables: zebra rows, repeat header, avoid breaking rows */
table{ border-collapse:collapse; width:100%; margin:.8em 0; font-size:8.4pt; }
thead{ display:table-header-group; }
tr{ break-inside:avoid; page-break-inside:avoid; }
th,td{ border:1px solid var(--line); padding:4px 6px; text-align:left; vertical-align:top; }
th{ background:var(--navy); color:#fff; font-weight:600; }
tbody tr:nth-child(even){ background:var(--zebra); }

/* Blockquotes */
blockquote{ margin:.7em 0; padding:.1em 1em; border-left:3px solid var(--line); color:var(--muted); }
blockquote.summary{ border-left:4px solid var(--cyan); color:var(--navy2); font-size:10.5pt;
  font-style:italic; background:none; margin:.15em 0 .9em; }
blockquote.callout{ border-left:4px solid var(--cyan); background:var(--callout); color:var(--ink);
  font-style:normal; padding:.5em .9em; border-radius:0 6px 6px 0; break-inside:avoid; page-break-inside:avoid; }
blockquote.callout p{ margin:.3em 0; }
p.mapsto{ background:var(--cyan-soft); border-radius:6px; padding:.45em .7em; font-size:8.8pt; }

hr{ border:none; border-top:1px solid var(--line); margin:1.1em 0; }
ul,ol{ margin:.4em 0; padding-left:1.35em; }
li{ margin:.18em 0; }

/* Chapters start on a new page; H1 stays with its content */
section.chapter{ page-break-before:always; break-before:page; }
section.chapter h1{ padding-top:.1em; }

/* Cover */
.cover{ height:96vh; display:flex; flex-direction:column; justify-content:center; text-align:center;
  page-break-after:always; break-after:page; }
.cover-rule{ width:64px; height:4px; background:var(--cyan); margin:0 auto; }
.cover-title{ font-size:40pt; color:var(--navy); margin:.5em 0 .2em; letter-spacing:-.02em; }
.cover-subtitle{ font-size:14pt; color:var(--navy2); margin:.2em 0 1.4em; }
.cover-author{ font-size:13pt; color:var(--ink); font-weight:600; margin:1.4em 0 .1em; }
.cover-meta{ font-size:10.5pt; color:var(--muted); margin:.15em 0; }

/* TOC */
.toc-page{ page-break-before:always; break-before:page; }
.toc-list{ list-style:none; padding-left:0; font-size:11.5pt; }
.toc-list li{ margin:.5em 0; padding-bottom:.35em; border-bottom:1px dotted var(--line); }
.toc-list a{ color:var(--navy2); }
"""

PREVIEW_CSS = r"""
/* Screen-only layout for the website preview */
body{ background:#fff; margin:0; }
.layout{ display:flex; align-items:flex-start; }
nav.sidebar{ position:sticky; top:0; align-self:flex-start; width:260px; min-width:260px; height:100vh;
  overflow-y:auto; padding:28px 20px; border-right:1px solid var(--line); background:#fbfcfe; }
nav.sidebar .brand{ font-weight:700; color:var(--navy); font-size:13pt; line-height:1.25; margin-bottom:2px; }
nav.sidebar .brandsub{ color:var(--muted); font-size:9pt; margin-bottom:16px; }
nav.sidebar ol{ list-style:none; padding:0; margin:0; }
nav.sidebar li{ margin:.15em 0; }
nav.sidebar a{ display:block; padding:5px 8px; border-radius:6px; color:var(--navy2); font-size:9.5pt; }
nav.sidebar a:hover{ background:var(--cyan-soft); }
main.reading{ flex:1; display:flex; justify-content:center; padding:36px 24px 120px; min-width:0; }
main.reading .doc{ width:100%; max-width:780px; }
main.reading section.chapter{ padding-top:8px; margin-top:28px; border-top:1px solid var(--line); }
main.reading .cover{ height:auto; text-align:left; padding:8px 0 24px; }
main.reading .cover-rule{ margin:0; }
main.reading .cover-title{ font-size:30pt; }
table{ display:block; overflow-x:auto; }
@media (max-width:820px){ nav.sidebar{ display:none; } }
"""


def html_doc(body: str, extra_css: str = "") -> str:
    return (
        "<!doctype html>\n<html lang=\"en\"><head>\n<meta charset=\"utf-8\">\n"
        '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
        f"<title>{TITLE} · The Thesis &amp; Body of Knowledge</title>\n"
        f"<style>{CSS}\n{extra_css}</style>\n</head>\n<body>\n{body}\n</body></html>\n"
    )


def build_preview(content: str) -> str:
    nav_rows = "".join(f'<li><a href="#{k}">{html.escape(l)}</a></li>' for k, _p, l in DOCS)
    sidebar = (
        '<nav class="sidebar">'
        f'<div class="brand">{TITLE}</div>'
        f'<div class="brandsub">The Thesis &amp; Body of Knowledge · v{BOK_VERSION}</div>'
        f"<ol>{nav_rows}</ol></nav>"
    )
    body = (
        '<div class="layout">'
        f"{sidebar}"
        f'<main class="reading"><div class="doc">{cover(SUBTITLE_BOK, BOK_CREDITS)}{content}</div></main>'
        "</div>"
    )
    return html_doc(body, PREVIEW_CSS)


FOOTER = (
    '<div style="width:100%;font-size:7pt;color:#8a95a3;padding:0 14mm;'
    'font-family:Inter,Segoe UI,sans-serif;display:flex;justify-content:space-between;">'
    f'<span>AI Governance Engineering · v{BOK_VERSION}</span>'
    '<span class="pageNumber"></span></div>'
)
HEADER = '<div></div>'


def to_pdf(page, html_text: str, out_path: Path) -> None:
    page.set_content(html_text, wait_until="networkidle")
    page.pdf(
        path=str(out_path),
        format="A4",
        print_background=True,
        display_header_footer=True,
        header_template=HEADER,
        footer_template=FOOTER,
        margin={"top": "18mm", "bottom": "18mm", "left": "18mm", "right": "18mm"},
    )


def main(html_only: bool = False) -> None:
    DIST.mkdir(exist_ok=True)
    content = build_content()

    # Site preview (HTML) is always regenerated first, independent of the PDF step.
    (DIST / "site-preview.html").write_text(build_preview(content), encoding="utf-8")
    print("Wrote:", DIST / "site-preview.html")

    if html_only:
        return

    # Full Body of Knowledge: cover + TOC + everything.
    bok_html = html_doc(cover(SUBTITLE_BOK, BOK_CREDITS) + build_toc() + content)
    # Thesis only: cover + the thesis section.
    man_text = (AIGE / "THESIS.md").read_text(encoding="utf-8")
    man_chunk = decorate(prefix_ids(render_markdown(man_text), "thesis"))
    man_section = f'<section class="chapter" id="thesis">\n{man_chunk}\n</section>'
    man_html = html_doc(cover(SUBTITLE_MAN, THESIS_CREDITS) + man_section)

    from playwright.sync_api import Error as PlaywrightError, sync_playwright

    with sync_playwright() as p:
        try:
            browser = p.chromium.launch()
        except PlaywrightError:
            # Reuse a system Chromium browser when Playwright's managed browser
            # is not installed (common in clean Windows workspaces).
            candidates = [
                shutil.which("google-chrome"),
                shutil.which("chromium"),
                shutil.which("msedge"),
                r"C:\Program Files\Google\Chrome\Application\chrome.exe",
                r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
            ]
            executable = next((path for path in candidates if path and Path(path).is_file()), None)
            if not executable:
                raise
            browser = p.chromium.launch(executable_path=executable)
        page = browser.new_page()
        to_pdf(page, bok_html, DIST / BOK_PDF)
        to_pdf(page, man_html, DIST / THESIS_PDF)
        browser.close()

    print("Wrote:")
    for f in (BOK_PDF, THESIS_PDF):
        print("  ", DIST / f)


if __name__ == "__main__":
    import sys
    main(html_only="--html-only" in sys.argv)
