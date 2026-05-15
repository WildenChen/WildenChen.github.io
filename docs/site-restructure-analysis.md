# Site Restructure Analysis

## 現有 repository 結構

此 repository 目前是可直接部署到 GitHub Pages 的靜態網站，核心內容可分成三層：

1. **歷史文章層**：`chapter1/` 到 `chapter11/` 與 `ios-design-patterns/` 保存早期 Swift / iOS / design patterns Markdown 文章；`SUMMARY.md` 仍是原 GitBook 式目錄。
2. **新入口層**：根目錄 `index.html` 是 Wilden Hub landing page，`dashboard/`、`ai-tools/`、`openclaw/`、`knowledge-base/`、`legacy/` 是五個子入口。
3. **資料與文件層**：`data/services.json` 保存 HomeLab / AI services 服務清單，`assets/js/dashboard.js` 將資料渲染成 Dashboard 卡片，`docs/` 保存公開站規劃、連結巡檢與重構說明。

## 目前網站結構

- `/`：Wilden Hub landing page，只保留主要入口與使用動線。
- `/legacy/`：舊 Swift / iOS 文章導覽，連回原始 Markdown，不搬動歷史資料。
- `/openclaw/`：OpenClaw 與 AI Agent 研究入口。
- `/ai-tools/`：AI 工具與 workflow 入口。
- `/knowledge-base/`：長期知識庫入口。
- `/dashboard/`：HomeLab 與個人服務索引，從 `data/services.json` 產生卡片與狀態篩選，不把原始 JSON 當成使用者入口。
- `/robots.txt`：全站搜尋引擎阻擋設定。

## 重構策略

1. **保留舊路徑**：不刪除、不覆蓋、不大幅搬動 `chapter*/`、`ios-design-patterns/`、`SUMMARY.md`、`README.md` 等歷史內容。
2. **新舊分離**：首頁聚焦可用入口，舊 Swift 教學集中於 `legacy/`，避免與新內容混在同一資訊架構。
3. **純靜態優先**：第一階段只使用 HTML / CSS / JSON，不導入大型 framework，降低 GitHub Pages 部署與長期維護成本。
4. **工作台視覺系統**：共用 `assets/css/portal.css`，以中性底色、深綠主色、清楚卡片與低裝飾層級建立可掃描的個人工作台。
5. **手機版優先檢查**：用 CSS grid 與 media query 讓 navigation、portal cards、dashboard cards 在窄螢幕改為單欄。
6. **低調公開**：所有 HTML 頁面保留 `<meta name="robots" content="noindex,nofollow">`，並保留 `robots.txt` 的 `Disallow: /`。

## 下一步建議

- 為 Dashboard 補服務分組、搜尋、是否公開的欄位，讓公開入口和私有備註更清楚分離。
- 為 legacy Markdown 增加更完整的章節索引頁，但仍保留原始檔案與路徑。
- 補上 OpenClaw、AI Tools、Knowledge Base 的內容模板與更新紀錄。
- 若未來需要互動功能，再評估是否引入小型 build step；目前不建議一開始導入重 framework。
