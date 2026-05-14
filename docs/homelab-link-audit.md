# Homelab Link Audit

Audit date: 2026-05-14
Source reviewed: `https://home.wilden.myds.me/`

## 巡檢摘要

此階段已把原 homelab 首頁的內容整理進 Dashboard，並同步整理成 `data/services.json` 作為後續巡檢資料來源。因為許多服務需要登入、JavaScript 或私有網路狀態，這份 audit 不把「能開頁面」等同於「功能完整可用」，而是先標記目前可觀察到的狀態。

## 系統維運

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| Cockpit | `https://admin.wilden.myds.me/` | Reachable | 可看到 Web Console / login 相關內容。 |
| Dockge | `https://docker.wilden.myds.me/` | JS required | 回傳需要 JavaScript。 |
| Scrutiny | `https://scrutiny.wilden.myds.me/` | Reachable | 會轉到 `/web/`。 |
| File Browser | `https://file.wilden.myds.me/` | Empty response | 需人工確認是否仍有效。 |
| Watchtower | N/A | Widget only | 原首頁只有 widget，無可用公開 URL。 |

## 網路與家庭

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| AdGuard Home | N/A | Needs URL | 原首頁有 Queries / Blocked / Filtered / Latency widget，但未解析出公開 URL。 |

## 開發與 Apple

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| qBittorrent | N/A | Needs URL | 原首頁有下載狀態 widget，但未解析出公開 URL。 |
| Memos | N/A | Widget missing | 原首頁顯示 `Missing Widget Type: memos`。 |

## 閱讀與聽覺

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| Audiobookshelf | `https://audiobook.wilden.myds.me/` | Loading | 回傳 Loading，需瀏覽器確認。 |
| Navidrome | `https://music.wilden.myds.me/` | JS required | 轉到 `/app/` 並要求 JavaScript。 |
| Calibre Web | `https://calibre.wilden.myds.me/` | Needs check | 需人工確認。 |

## 互動娛樂

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| SillyTavern | `https://sillytavern.wilden.myds.me/` | Login page | 會轉到 `/login`。 |
| RomM | `https://rom.wilden.myds.me/` | Empty response | 需人工確認前端載入狀態。 |

## 個人資料書籤

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| Synology DS418play | `https://quickconnect.to/` | External login | QuickConnect 入口。 |
| Immich | `https://immich.wilden.myds.me/` | Needs check | 個人相片服務，需確認公開程度。 |
| Stable Diffusion | `https://sd.wilden.myds.me/` | Empty response | 需人工確認是否仍有效。 |
| ComfyUI M2 Pro | `https://comfyui.wilden.myds.me/` | Loading | 回傳 Loading ComfyUI。 |
| PLEX | `https://app.plex.tv/` | External | 通常需要帳號登入。 |
| AL 艾因的幻想 | `https://ainlee.myqnapcloud.com/` | Needs check | QNAP / 個人服務入口。 |
| Ani 的 NAS | `https://ainlee.myqnapcloud.com:1743/` | Needs check | QNAP TS469L，需人工確認。 |

## AI Services

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| Gemini | `https://gemini.google.com/` | Sign in | 可連線，需 Google 帳號。 |
| Grok | `https://grok.com/` | Reachable | 可連線，可能需要登入。 |
| NotebookLM | `https://notebooklm.google.com/` | Sign in | 轉到 Google Sign in。 |

## Other

| Service | URL | Observed status | Notes |
| --- | --- | --- | --- |
| Switch520 | `https://www.gamer520.com/` | Reachable | 內容屬性建議再確認。 |
| Self-Hosted Dashboard Icons | `https://selfh.st/` | Reachable | 可作圖示與 self-hosted 資源。 |
| Material Design Icons | `https://pictogrammers.com/` | Reachable | Pictogrammers 圖示資源。 |
| Simple Icons | `https://simpleicons.org/` | Reachable | 品牌圖示資源。 |

## 更新建議

- Dashboard 可保留全部 homelab 入口，但要持續標記 `Needs check`、`JS required`、`Login page` 等狀態。
- 對 GitHub Pages 而言，`noindex,nofollow` 與 `robots.txt` 只能降低被搜尋機率，不能當作存取控制。
- 若某些連結未來確定不想公開，建議從 Dashboard 改成純文字備忘或移入私有資料檔。
