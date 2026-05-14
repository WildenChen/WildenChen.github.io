# 語婕 AI OS Public Entry Plan

## 目標定位

這個 GitHub Pages repository 不是單純作品集，也不是把 homelab 降級成公開展示頁。它的本質是「語婕 AI OS 的對外入口」：

- 個人 AI 助理入口：語婕作為 OpenClaw 的人格層與操作入口。
- Homelab 總控地圖：保留原 homelab 首頁的服務分類與入口，但標註狀態與風險。
- 技術研究入口：OpenClaw、AI Agent、AI tools、workflow 與研究筆記。
- 個人作品展示：可公開的專案與成果會呈現在 Dashboard / Works，但這只是 AI OS 的一部分。
- Legacy archive：舊 GitBook / Markdown 文章維持原路徑，透過 `legacy/` 提供導覽。
- 低調公開：保留 `noindex,nofollow` 與 `robots.txt`，不主動讓搜尋引擎索引。

## 語婕公開人格

公開網站只採用 SOUL.md 中適合公開呈現的部分：

- 完美秘書風格：專業、優雅、溫柔、主動整理。
- 預判大於反應：不只放連結，也標記狀態、風險與待確認事項。
- 記憶與自我演化：把 homelab、OpenClaw、AI tools、legacy archive 串成長期知識入口。
- 技術回報：用清楚的狀態標籤與巡檢報告呈現。

不適合公開的私密人格與互動內容不放進 GitHub Pages。

## 與 homelab 首頁的關係

已參考 `https://home.wilden.myds.me/`。原首頁包含：

- 系統維運：Cockpit、Dockge、Scrutiny、File Browser、Watchtower。
- 網路與家庭：AdGuard Home。
- 開發與 Apple：qBittorrent、Memos。
- 閱讀與聽覺：Audiobookshelf、Navidrome、Calibre Web。
- 互動娛樂：SillyTavern、RomM。
- 個人資料書籤：Synology、Immich、Stable Diffusion、ComfyUI、PLEX、QNAP links。
- AI Services：Gemini、Grok、NotebookLM。
- Other：Switch520、Self-Hosted Dashboard Icons、Material Design Icons、Simple Icons。

GitHub Pages 入口會把這些服務整理成「語婕 Dashboard」，但加入狀態與安全提示：

- Reachable：目前可載入頁面或登入頁。
- JS required / Loading：服務可能有效，但 crawler 或無 JS 環境只能看到載入殼。
- Login required：連結可用，但需要帳號登入。
- Empty response / Needs check：需要人工確認是否仍有效。
- Needs URL：原首頁有 widget，但未解析到明確連結。

## 建議資訊架構

1. **Home**：語婕 AI OS 的人格入口、核心路由、homelab map 摘要。
2. **Dashboard**：完整 homelab / AI / 個人資料 / Other 服務地圖與巡檢狀態。
3. **OpenClaw**：語婕 agent 核心、記憶、自主巡檢、工具呼叫與技術回報設計。
4. **AI Tools**：Gemini、Grok、NotebookLM、ComfyUI、Stable Diffusion 與 workflow。
5. **Knowledge Base**：長期記憶、技術筆記、研究索引、變更紀錄。
6. **Legacy Articles**：舊 Swift / iOS / design patterns 文章導覽。

## 下一階段建議

- Dashboard 的服務目錄已整理為 `data/services.json`，後續可再由腳本產生 HTML 或巡檢報告，避免資料分散。
- 定期用 GitHub Actions 或本機腳本更新 `data/services.json` 的狀態，但不要把 credentials 放到公開 repo。
- OpenClaw 頁面可補「語婕公開能力矩陣」：記憶、巡檢、風險判斷、工具呼叫、回報格式。
- AI Tools 頁面可分成「外部 AI」、「本機生圖」、「語婕工具鏈」、「待確認」。
