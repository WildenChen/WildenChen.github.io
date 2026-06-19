# Wilden Hub 架構分析報告

> 來源專案：`/Users/wilden/Projects/wildenchen-github-io`
> 分析日期：2026-06-19
> 目的：拆解現有「Wilden Hub」網站架構、功能、變更歷史、架站方式，作為改寫個人 HomeLab 入口的參考。

---

## 1. 專案總覽

這是一個 **GitHub Pages 上的靜態個人入口站（Wilden Hub）**，對外公開，卻刻意標記 `noindex,nofollow`。它的本質不是作品集，而是一份**「公開層」＋「對應私有 HomeLab」**的索引地圖：

- 公開層（這個 repo）：展示作品、AI 研究、HomeLab 服務目錄與狀態標籤。
- 私有層（部署在 `home.wilden.myds.me`）：真正的服務控制台（Cockpit、Dockge、Scrutiny、SillyTavern、Immich、ComfyUI 等）。

設計核心是「**公開標示狀態，不公開控制能力**」：連結給你看，但實際登入、憑證、內網存取都還在私有反代理之後。

### 1.1 主要特性

| 特性 | 說明 |
| --- | --- |
| 網站類型 | 靜態入口站（PWA + Jekyll layout） |
| 部署目標 | GitHub Pages（`https://wildenchen.github.io`） |
| 視覺風格 | 16-bit RPG 像素風、像素書架、像素網格裝飾 |
| 內容語系 | `zh-Hant` 繁體中文 |
| 資料驅動 | `data/services.json` + `data/tools.json` 由前端 JS 渲染 |
| 離線能力 | Service Worker v8，cache-first 策略 |
| 隱私策略 | 全站 `noindex,nofollow` + `robots.txt: Disallow: /` |

---

## 2. 技術棧

### 2.1 核心

- **靜態生成器**：Jekyll（透過 `github-pages` gem，鎖定 GitHub Pages 相容版本）
- **Markdown 引擎**：kramdown（GFM 模式）
- **外掛**：`jekyll-relative-links`
- **語系 / 時區**：`lang: zh-Hant`、`timezone: Asia/Taipei`

### 2.2 前端（純手刻、無 framework）

- **CSS**：單檔 `assets/css/portal.css`（2024 行）—— 完整設計系統、響應式 grid、像素裝飾、3D 書架動畫
- **JS**：
  - `pwa.js`（16 行）—— Service Worker 註冊
  - `reader.js`（310 行）—— 閱讀模式、進度條、章節導覽、鍵盤快捷鍵（GitBook-style reader）
  - `dashboard.js`（201 行）—— 載入 `services.json` / `tools.json`、渲染卡片、狀態統計、分類篩選
- **資料層**：`data/services.json`（97 行）、`data/tools.json`（63 行）

### 2.3 PWA 套件

- `manifest.webmanifest`：name=`Wilden Hub`、display=`fullscreen`、提供 192/512 icon + maskable icon
- `service-worker.js`：cache 名稱 `wilden-ai-portal-v8`、precache 核心資產、stale-while-revalidate 行為
- 行動安裝：iOS（`apple-mobile-web-app-capable`）、Android（manifest）

### 2.4 設計系統

- 主色：`#163b3a`（深綠）
- 強調色：`#fbf6ea`（米色）
- 字體：系統字體 + pixel-art 裝飾元素
- 主元件：portal-shell、map-grid、bookshelf-container、directory-grid、matrix-table、quest-list

---

## 3. 資訊架構（IA）

```
/                          ← Wilden Hub landing
├── /works/                ← 作品與著作（含 swift-road、swift-design-patterns）
├── /ai-lab/               ← AI 工具研究所（含 AI Tools Matrix、雷達）
├── /tools/                ← 私人工具入口（HomeLab / Agent / 訂閱 / 知識 / 憑證）
├── /now/                  ← 最近在做什麼（時間戳日誌）
├── /dashboard/            ← 服務地圖（由 services.json 渲染）
├── /openclaw/             ← AI Agent 公開研究入口
├── /knowledge-base/       ← 長期知識庫索引
├── /ai-tools/             ← 外部 AI 工具總覽
├── /swift-road/           ← 舊 Swift 殿堂之路（保留原路徑）
└── /swift-design-patterns/← 舊 Swift 設計模式（保留原路徑）
```

### 3.1 四大主入口（最新架構，2026-06-10 改版）

首頁用 8-bit 像素風把動線收斂成四個地圖節點：

| 編號 | 入口 | 說明 |
| --- | --- | --- |
| 01 | **Works** | Swift 電子書、開源專案、技術名片 |
| 02 | **AI Lab** | OpenClaw、ollama-cloud-proxy、AI 工作流研究 |
| 03 | **Tools** | HomeLab 服務、Agent 閘道、訂閱管理、開發工具 |
| 04 | **Now** | 目前專注、進行中專案、踩坑紀錄、近期目標 |

上方有 RPG 風格「Current Quest」對話框，把個人方向講清楚；下方接 3D 數位書架（兩層 shelf：技術著作 / 開源專案）做視覺亮點。

### 3.2 Legacy 保留策略

`chapter1/ ~ chapter11/` 與 `ios-design-patterns/` 全部保留原路徑不搬動，用 `_config.yml` 的 `defaults` 統一套用 `legacy_article` layout，並標 `robots: noindex,nofollow`，避免與新內容競爭搜尋排名。

---

## 4. 功能模組與 UX

### 4.1 核心互動模式

1. **首頁定位為「控制台」**：不是「關於我」，而是「我的入口」。文案「公開看起來像作品集，自己用起來像每天會打開的控制台」是設計意圖的核心聲明。
2. **狀態標籤系統**：`Reachable / JS required / Loading / Login page / Sign in / Empty response / Needs check / Needs URL / Widget only / Widget missing` —— 把「能不能用」跟「能不能公開」分開標示。
3. **資料 → 卡片分離**：`data/services.json` 純資料、`dashboard.js` 純渲染。改狀態不用改 HTML，只改 JSON。
4. **公開/私有邊界（Save Point）**：每頁都強調「敏感服務只保留說明與狀態，不公開實際控制能力」。

### 4.2 各模組摘要

| 模組 | URL | 主要內容 | 資料來源 |
| --- | --- | --- | --- |
| Dashboard | `/dashboard/` | HomeLab 服務地圖 + 狀態篩選 | `data/services.json` |
| AI Lab | `/ai-lab/` | AI Tools Matrix、雷達、決策紀錄 | 內嵌 HTML |
| Tools | `/tools/` | AI Agent / HomeLab / Dev / 訂閱 / 知識 / 憑證 6 大類 | `data/tools.json` |
| OpenClaw | `/openclaw/` | AI Agent 公開能力矩陣 | 內嵌 HTML |
| Now | `/now/` | Main Quest / Side Quest / Save Point | 內嵌 HTML |
| Works | `/works/` | 3D 書架：書 + 開源專案 | 內嵌 HTML |
| Reader（swift-*） | `/swift-road/`, `/swift-design-patterns/` | GitBook-style 閱讀器 | Markdown + `reader.js` |

### 4.3 UX 亮點

- **像素 RPG 對話框**：「Current Quest」面板，極具辨識度。
- **3D 數位書架**：用 CSS `transform: perspective()` 做書脊 + 封面，hover 翻書效果。
- **像素掃描線**（`pixel-scanlines`）：CRT 螢幕感裝飾。
- **地圖節點（map-grid）**：首頁 4 大入口用座標式卡片編號 `01 / 02 / 03 / 04`。
- **Quest List**：任務板式條列，敘事感強。
- **Matrix Table**：AI Lab 用的 `Tool × Role × Why × Use` 比較表。

---

## 5. 部署與維運方式

### 5.1 架站方式

- **平台**：GitHub Pages（`wildenchen.github.io`，user/organization page 模式）
- **建置**：Jekyll 由 GitHub Pages 內建引擎自動建置（不需要自跑 Actions 也能 build）
- **域名**：CNAME 曾經指向 `appgo.me`（已棄用，目前用 GitHub Pages 預設 `*.github.io`）
- **Gemfile**：`gem "github-pages"`，鎖定官方相容版本；本機可用 `bundle install` 後 `bundle exec jekyll serve`
- **CI/CD**：**目前沒有 `.github/workflows/`**。所有部署都是 commit → push → GitHub Pages 自動 build。

### 5.2 部署歷史關鍵節點

- `2025-07-04`（Initial commit）→ 7fe40a8 加 `appgo.me` CNAME → README 測試
- `2025-12-16` → `Update CNAME-bake with comments`（標示 CNAME 處理方式）
- `2026-05-14`（AI Portal 大重構）：
  - `f78143d` Create static AI portal landing page
  - `9363e8c` Add service data source and site validation
  - `538ccce` Restore Jekyll layouts and refresh Japanese style
  - `00fe642` Refine portal to operator-style PWA
  - `ca74f1b` Add PWA support for fullscreen mobile install
- `2026-05-15` → `Refine hub structure and dashboard rendering` / `Fix legacy article links`
- `2026-06-04` → 書架系統大改（`a7589ff` → `8ec5903` → `98ecb21` → `d5673d3` → `b0a4e8e`）：先有 3D 書架，再分離兩個 book 資料夾、隔離 sidebar、加 GitBook-style reader
- `2026-06-10` → 收斂四大入口（`60453a3`）＋全站 16-bit RPG 像素風（`64ca7cc`）

總計 **29 個 commit、453 檔變更**，全部在 `main` 分支，沒有 release tag。

### 5.3 維運工具

- `scripts/validate_site.py`（Python）：自製 HTML 解析器，掃所有頁面 `<a>` / `<link>` / `<script>`、meta、`<h3>`，檢查連結與標題一致性。本機可跑，**目前沒接到 Actions**。
- `data/services.json` 註記 `auditDate: 2026-05-14`，手動維護。
- `data/tools.json` 註記 `auditDate: 2026-06-10`，手動維護。

### 5.4 反向代理與私有層

雖然本 repo 沒看到 proxy config（因為那是私有層），但從 `data/services.json` 可推論：

- 對外入口：`*.wilden.myds.me`（AdGuard、Dockge、Scrutiny、SillyTavern、Immich、ComfyUI、Audiobookshelf、Navidrome、Calibre、SD、RomM、admin/Cockpit）
- 入口基礎設施：推測是 Caddy / Nginx 反向代理 + Let's Encrypt / Cloudflare Tunnel（myds.me 為 Synology DDNS，與 Cloudflare 整合度高）
- 服務管理工具：Dockge（Docker compose 視覺化）、Cockpit（系統管理）、Scrutiny（硬碟 SMART）、Watchtower（自動更新容器）

---

## 6. 改寫成 HomeLab 的關鍵設計借鑑

如果你想拿這個架構改寫成自己新版的 HomeLab 入口，可以直接搬走的設計原則：

### 6.1 架構面

1. **公開層 ↔ 私有層分離**：入口站只放說明與狀態，控制介面留在反代理之後。
2. **純靜態優先**：不引大型 framework，HTML + JSON + 一支前端 JS 就能撐起來。
3. **資料驅動**：服務清單放 JSON，前端渲染，避免改狀態就要改 HTML。
4. **Layout 解耦**：根 `_layouts/default.html` 提供共用 header/nav/PWA，子頁各自補內容。
5. **Defaults 把 legacy 與新內容分區**：`_config.yml` 的 `defaults` 是控制 SEO / 版型的低成本槓桿。

### 6.2 UX 面

1. **狀態標籤系統**：先定義完整的 statusLegend（10 種以上），再讓資料用這個 schema 描述。
2. **主色 + 強烈視覺主題**：這個站選 16-bit RPG 像素風，辨識度遠高於千篇一律的 Tailwind 灰。
3. **「地圖式」首頁**：用編號 + 座標感卡片，把入口變成可掃描的地圖。
4. **任務板 / Quest List**：把工作紀錄包裝成敘事，比死板的 list 有動力。
5. **3D 書架**：展示作品時比 grid 更有記憶點，純 CSS 就能做。

### 6.3 維運面

1. **PWA + Service Worker**：cache-first + 核心資產清單，讓入口在手機上可離線開。
2. **自製 validator 腳本**：用 Python `html.parser` 掃內部連結與標題，CI 友善。
3. **狀態/稽核日期放進 JSON**：用 `auditDate` 讓人一眼看出資料新舊。
4. **可以考慮加**：
   - GitHub Actions 排程跑 `validate_site.py`
   - 排程 ping 私有服務更新 `services.json` 狀態（用 GitHub Actions 連 HomeLab，或從 HomeLab 反向 commit）
   - 加 Uptime Kuma 公開 status page 嵌入到 `/dashboard/`

### 6.4 不要照搬的部分

- **CNAME `appgo.me` 處理**：這個站曾經換過 custom domain，後來退回 `*.github.io`。新站建議一開始就選定 domain 並配 Cloudflare / Caddy 自動續憑證。
- **`noindex,nofollow` + `Disallow: /` 雙保險**：如果你的 HomeLab 入口只是給自己用，可以拿掉這層偽裝，純內網或 VPN 後存取更乾淨。
- **Jekyll 對現代框架的限制**：若需要即時資料（狀態、登入、API），Jekyll 不夠，建議改 Astro / Next.js static export，或乾脆拆成「公開靜態入口（Astro）+ 私有動態控制台（FastAPI / Node）」。

---

## 7. 一頁速查表

| 項目 | 內容 |
| --- | --- |
| Repo | `/Users/wilden/Projects/wildenchen-github-io` |
| 公開網址 | `https://wildenchen.github.io` |
| 私有入口 | `https://home.wilden.myds.me/` |
| 靜態生成 | Jekyll（github-pages gem） |
| 部署 | GitHub Pages（main 分支直推） |
| CI/CD | 無（commit → push → 自動建置） |
| 資料檔 | `data/services.json`、`data/tools.json` |
| 主要 JS | `pwa.js`、`reader.js`、`dashboard.js` |
| 主要 CSS | `assets/css/portal.css`（2024 行） |
| 視覺風格 | 16-bit RPG 像素風 + 3D 書架 |
| 隱私 | `noindex,nofollow` + `robots.txt: Disallow: /` |
| Commits | 29（自 2025-07-04 至 2026-06-10） |
| 主要重構 | 2026-05-14（AI Portal 化）、2026-06-10（16-bit 像素化） |
| Legacy | `chapter1~11/`、`ios-design-patterns/` 保留原路徑 |

---

## 8. 建議的下一步

1. **先決定範圍**：新 HomeLab 是「公開入口」（像 Wilden Hub）+ 私有控制台，還是「純內網」？
2. **選技術棧**：
   - 想極簡 → 沿用 Jekyll + 這個站的 layout 結構
   - 想現代化 → Astro static export + React islands（dashboard 互動區）
   - 想即時資料 → Astro/Next + 後端 FastAPI
3. **抄設計系統**：把 portal.css 的色彩 token、字級、grid 系統直接拿來當 base，換掉主題即可。
4. **資料 schema 化**：把 `services.json` 升級成更結構化的 schema（含 `healthCheck`、`tags`、`visibility`），方便之後接 Uptime Kuma 或自己寫的 health checker。
5. **先做 IA 再寫程式**：這個站最值得學的是「四大入口 + legacy 保留 + 狀態分離」的 IA 邏輯，不是程式碼本身。
