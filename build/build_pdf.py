#!/usr/bin/env python3
"""Assemble the AI Governance Engineering Manifesto & Body of Knowledge into PDFs and a site preview.

Pipeline: Markdown -> one HTML (python-markdown: tables, fenced_code, toc, attr_list) -> PDF via
Playwright/Chromium page.pdf (A4, print_background, ~18mm margins, page numbers in the footer).

Outputs (written to aige/dist/):
  - AI-Governance-Engineering-BoK-v0.1.pdf        cover + TOC + manifesto + chapters 00-10 + contributors + changelog
  - AI-Governance-Engineering-Manifesto-v0.1.pdf  cover + manifesto only
  - site-preview.html                             light theme, sticky left TOC, max-width 780px (website preview)

Run:  python build/build_pdf.py            (from the aige/ directory, or any cwd; paths are resolved from this file)
"""

from __future__ import annotations

import html
import re
from pathlib import Path

import markdown

AIGE = Path(__file__).resolve().parent.parent          # .../aige
DIST = AIGE / "dist"
BOK = AIGE / "bok"

TITLE = "AI Governance Engineering"
SUBTITLE_BOK = "Manifesto &amp; Body of Knowledge · v0.2 · September 2026"
SUBTITLE_MAN = "The Manifesto · v0.2 · September 2026"
AUTHOR = "Jorge García Aibar"
HOME = "aigovernanceengineer.com"
LICENCE = "CC BY 4.0"

# Order of documents in the full Body-of-Knowledge PDF. (key, path, short TOC label)
DOCS: list[tuple[str, Path, str]] = [
    ("manifesto", AIGE / "MANIFESTO.md", "The Manifesto"),
    ("ch00", BOK / "00-preface.md", "00 · Preface"),
    ("ch01", BOK / "01-definition.md", "01 · The definition"),
    ("ch02", BOK / "02-why-now.md", "02 · Why now"),
    ("ch03", BOK / "03-values-principles.md", "03 · Values and principles"),
    ("ch04", BOK / "04-the-stack.md", "04 · The stack (five layers)"),
    ("ch05", BOK / "05-patterns.md", "05 · Patterns"),
    ("ch06", BOK / "06-the-role.md", "06 · The role"),
    ("ch07", BOK / "07-maturity-model.md", "07 · Maturity model"),
    ("ch08", BOK / "08-regulatory-map.md", "08 · Regulatory map"),
    ("ch09", BOK / "09-glossary.md", "09 · Glossary"),
    ("ch10", BOK / "10-reading-list.md", "10 · Reading list"),
    ("contributors", BOK / "CONTRIBUTORS.md", "Contributors & signatories"),
    ("changelog", BOK / "CHANGELOG.md", "Changelog"),
]


def render_markdown(text: str) -> str:
    md = markdown.Markdown(extensions=["tables", "fenced_code", "toc", "attr_list"])
    return md.convert(text)


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
        text = path.read_text(encoding="utf-8")
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


def cover(subtitle: str) -> str:
    return (
        '<section class="cover" id="cover">\n'
        f'  <div class="cover-rule"></div>\n'
        f"  <h1 class=\"cover-title\">{TITLE}</h1>\n"
        f'  <p class="cover-subtitle">{subtitle}</p>\n'
        f'  <div class="cover-rule"></div>\n'
        f'  <p class="cover-author">{html.escape(AUTHOR)}</p>\n'
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
        f"<title>{TITLE} — Manifesto &amp; Body of Knowledge</title>\n"
        f"<style>{CSS}\n{extra_css}</style>\n</head>\n<body>\n{body}\n</body></html>\n"
    )


def build_preview(content: str) -> str:
    nav_rows = "".join(f'<li><a href="#{k}">{html.escape(l)}</a></li>' for k, _p, l in DOCS)
    sidebar = (
        '<nav class="sidebar">'
        f'<div class="brand">{TITLE}</div>'
        '<div class="brandsub">Manifesto &amp; Body of Knowledge · v0.2</div>'
        f"<ol>{nav_rows}</ol></nav>"
    )
    body = (
        '<div class="layout">'
        f"{sidebar}"
        f'<main class="reading"><div class="doc">{cover(SUBTITLE_BOK)}{content}</div></main>'
        "</div>"
    )
    return html_doc(body, PREVIEW_CSS)


FOOTER = (
    '<div style="width:100%;font-size:7pt;color:#8a95a3;padding:0 14mm;'
    'font-family:Inter,Segoe UI,sans-serif;display:flex;justify-content:space-between;">'
    '<span>AI Governance Engineering · v0.2</span>'
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
    bok_html = html_doc(cover(SUBTITLE_BOK) + build_toc() + content)
    # Manifesto only: cover + the manifesto section.
    man_text = (AIGE / "MANIFESTO.md").read_text(encoding="utf-8")
    man_chunk = decorate(prefix_ids(render_markdown(man_text), "manifesto"))
    man_section = f'<section class="chapter" id="manifesto">\n{man_chunk}\n</section>'
    man_html = html_doc(cover(SUBTITLE_MAN) + man_section)

    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        to_pdf(page, bok_html, DIST / "AI-Governance-Engineering-BoK-v0.1.pdf")
        to_pdf(page, man_html, DIST / "AI-Governance-Engineering-Manifesto-v0.1.pdf")
        browser.close()

    print("Wrote:")
    for f in ("AI-Governance-Engineering-BoK-v0.1.pdf",
              "AI-Governance-Engineering-Manifesto-v0.1.pdf"):
        print("  ", DIST / f)


if __name__ == "__main__":
    import sys
    main(html_only="--html-only" in sys.argv)
