#!/usr/bin/env python3
"""Validate the static 語婕 AI OS GitHub Pages site."""

from __future__ import annotations

import json
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
    return sorted(path for path in ROOT.glob("**/*.html") if ".git" not in path.parts)


def local_target_exists(page: Path, href: str) -> bool:
    parsed = urlparse(href)
    if href.startswith(("http://", "https://", "mailto:")) or href.startswith("#"):
        return True
    if not parsed.path:
        return True

    path = page.parent / unquote(parsed.path)
    if href.endswith("/") or parsed.path.endswith("/") or parsed.path in ("./", "../"):
        path = path / "index.html"
    return path.exists()


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

    dashboard_parser = PageParser()
    dashboard_parser.feed((ROOT / "dashboard" / "index.html").read_text(encoding="utf-8"))
    dashboard_headings = set(dashboard_parser.headings)

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
            if name not in dashboard_headings:
                errors.append(f"dashboard/index.html: missing service card for {name}")

    return errors


def validate_robots_txt() -> list[str]:
    expected = "User-agent: *\nDisallow: /\n"
    actual = (ROOT / "robots.txt").read_text(encoding="utf-8")
    return [] if actual == expected else ["robots.txt: content mismatch"]


def main() -> int:
    errors = validate_html() + validate_services() + validate_robots_txt()
    if errors:
        print("\n".join(errors))
        return 1
    print("Static site validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
