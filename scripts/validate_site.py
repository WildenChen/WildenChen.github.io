#!/usr/bin/env python3
"""Validate the static Wilden AI Portal GitHub Pages site."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []
        self.meta: list[dict[str, str]] = []
        self.headings: list[str] = []
        self._in_h3 = False
        self._h3_chunks: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {key: value or "" for key, value in attrs}
        if tag == "a" and "href" in attr:
            self.links.append(attr["href"])
        if tag == "link" and "href" in attr:
            self.links.append(attr["href"])
        if tag == "script" and "src" in attr:
            self.links.append(attr["src"])
        if tag == "meta":
            self.meta.append(attr)
        if tag == "h3":
            self._in_h3 = True
            self._h3_chunks = []

    def handle_data(self, data: str) -> None:
        if self._in_h3:
            self._h3_chunks.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "h3" and self._in_h3:
            heading = "".join(self._h3_chunks).strip()
            if heading:
                self.headings.append(heading)
            self._in_h3 = False
            self._h3_chunks = []


def iter_html_pages() -> list[Path]:
    return sorted(
        path
        for path in ROOT.glob("**/*.html")
        if ".git" not in path.parts and not any(part.startswith("_") for part in path.parts)
    )


def local_target_exists(page: Path, href: str) -> bool:
    parsed = urlparse(href)
    if href.startswith(("http://", "https://", "mailto:")) or href.startswith("#"):
        return True
    if not parsed.path:
        return True

    path = page.parent / unquote(parsed.path)
    if href.endswith("/") or parsed.path.endswith("/") or parsed.path in ("./", "../"):
        path = path / "index.html"
    if path.exists():
        return True

    # Jekyll renders legacy Markdown files into HTML during GitHub Pages builds.
    # Keep source validation useful before `_site` exists by accepting generated
    # HTML targets when their Markdown source is present.
    if path.suffix == ".html":
        if path.name == "swift.html" and (ROOT / "index.md").exists():
            return True
        markdown_source = path.with_suffix(".md")
        if markdown_source.exists():
            return True
        readme_source = path.parent / "README.md"
        if path.name == "README.html" and readme_source.exists():
            return True
    return False


def validate_html() -> list[str]:
    errors: list[str] = []
    for page in iter_html_pages():
        parser = PageParser()
        parser.feed(page.read_text(encoding="utf-8"))
        has_robots = any(
            item.get("name") == "robots" and item.get("content") == "noindex,nofollow"
            for item in parser.meta
        )
        if not has_robots:
            errors.append(f"{page.relative_to(ROOT)}: missing robots noindex,nofollow meta")

        for href in parser.links:
            if not local_target_exists(page, href):
                errors.append(f"{page.relative_to(ROOT)}: broken local link {href}")
    return errors


def validate_services() -> list[str]:
    errors: list[str] = []
    data_path = ROOT / "data" / "services.json"
    services = json.loads(data_path.read_text(encoding="utf-8"))

    if services.get("privacy") != "noindex,nofollow":
        errors.append("data/services.json: privacy must remain noindex,nofollow")

    dashboard_html = (ROOT / "dashboard" / "index.html").read_text(encoding="utf-8")
    dashboard_js = ROOT / "assets" / "js" / "dashboard.js"
    if not dashboard_js.exists():
        errors.append("assets/js/dashboard.js: missing dashboard renderer")
    else:
        dashboard_script = dashboard_js.read_text(encoding="utf-8")
        if "../data/services.json" not in dashboard_script:
            errors.append("assets/js/dashboard.js: dashboard must load data/services.json")
    if 'href="../data/services.json"' in dashboard_html or 'href="/data/services.json"' in dashboard_html:
        errors.append("dashboard/index.html: raw services JSON must not be a visible navigation link")
    if 'id="service-catalog"' not in dashboard_html:
        errors.append("dashboard/index.html: missing service catalog mount")

    seen_names: set[str] = set()
    for category in services.get("categories", []):
        if not category.get("id") or not category.get("title"):
            errors.append("data/services.json: every category needs id and title")
        for service in category.get("services", []):
            name = service.get("name")
            status = service.get("status")
            if not name or not status or not service.get("description"):
                errors.append(f"data/services.json: incomplete service in {category.get('id')}")
                continue
            if status not in services.get("statusLegend", {}):
                errors.append(f"data/services.json: missing status legend for {status}")
            if name in seen_names:
                errors.append(f"data/services.json: duplicated service name {name}")
            seen_names.add(name)

    return errors


def validate_pwa() -> list[str]:
    errors: list[str] = []
    manifest_path = ROOT / "manifest.webmanifest"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

    if manifest.get("display") != "fullscreen":
        errors.append("manifest.webmanifest: display must remain fullscreen")
    if manifest.get("start_url") != "./" or manifest.get("scope") != "./":
        errors.append("manifest.webmanifest: start_url and scope must remain root-relative to the manifest")

    icon_paths = [
        ROOT / "assets" / "icons" / "apple-touch-icon.png",
        ROOT / "assets" / "icons" / "icon-32.png",
        ROOT / "assets" / "icons" / "icon-192.png",
        ROOT / "assets" / "icons" / "icon-512.png",
        ROOT / "assets" / "icons" / "maskable-192.png",
        ROOT / "assets" / "icons" / "maskable-512.png",
    ]
    for icon_path in icon_paths:
        if not icon_path.exists():
            errors.append(f"{icon_path.relative_to(ROOT)}: missing PWA icon")

    worker_path = ROOT / "service-worker.js"
    register_path = ROOT / "assets" / "js" / "pwa.js"
    if not worker_path.exists():
        errors.append("service-worker.js: missing service worker")
    if not register_path.exists():
        errors.append("assets/js/pwa.js: missing service worker registration")

    for page in iter_html_pages():
        text = page.read_text(encoding="utf-8")
        required = [
            'viewport-fit=cover',
            'name="apple-mobile-web-app-capable" content="yes"',
            'name="apple-mobile-web-app-status-bar-style" content="black-translucent"',
            'rel="manifest"',
            'assets/js/pwa.js',
        ]
        for snippet in required:
            if snippet not in text:
                errors.append(f"{page.relative_to(ROOT)}: missing PWA snippet {snippet}")

    return errors


def validate_jekyll() -> list[str]:
    errors: list[str] = []
    required = [
        ROOT / "_config.yml",
        ROOT / "_layouts" / "default.html",
        ROOT / "_layouts" / "legacy_article.html",
        ROOT / "_layouts" / "design_patterns_article.html",
    ]
    for path in required:
        if not path.exists():
            errors.append(f"{path.relative_to(ROOT)}: missing Jekyll layout support")

    markdown_paths = [ROOT / "swift-road" / "swift.md", ROOT / "swift-road" / "SUMMARY.md"]
    markdown_paths += sorted(ROOT.glob("swift-road/chapter*/*.md"))
    markdown_paths += sorted((ROOT / "swift-design-patterns").glob("*.md"))
    for path in markdown_paths:
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---\n"):
            errors.append(f"{path.relative_to(ROOT)}: missing Jekyll front matter")
        for link in re.findall(r"\]\((?!https?://|mailto:|#)([^)]+\.md(?:#[^)]+)?)\)", text):
            errors.append(
                f"{path.relative_to(ROOT)}: legacy article links must point at generated HTML pages, not {link}"
            )

    legacy_index = (ROOT / "swift-road" / "index.html").read_text(encoding="utf-8")
    if '.md"' in legacy_index or ".md'" in legacy_index:
        errors.append("swift-road/index.html: archive links must point at generated HTML pages")
    return errors


def validate_robots_txt() -> list[str]:
    expected = "User-agent: *\nDisallow: /\n"
    actual = (ROOT / "robots.txt").read_text(encoding="utf-8")
    return [] if actual == expected else ["robots.txt: content mismatch"]


def main() -> int:
    errors = validate_html() + validate_services() + validate_pwa() + validate_jekyll() + validate_robots_txt()
    if errors:
        print("\n".join(errors))
        return 1
    print("Static site validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
