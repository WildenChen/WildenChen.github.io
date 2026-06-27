// AI OS Architecture Explorer — 架構資料集中管理
// 修改這個檔案即可更新架構圖

var ARCH_DATA = {

  // ─── 節點定義 ───
  nodes: [
    // ── 人 ──
    {
      id: 'hongru',
      name: '弘儒',
      type: 'person',
      layer: 'user',
      location: '-',
      payment: '-',
      directUse: '-',
      status: 'active',
      tags: ['人'],
      description: '我。所有 AI 服務的使用者與管理者。',
      notes: []
    },

    // ── 使用入口層 ──
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      type: 'entry',
      layer: 'entry',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '付費', '雲端'],
      description: '主要判斷腦。擅長混亂中整理架構、拆解複雜任務。',
      notes: ['ChatGPT Plus 訂閱']
    },
    {
      id: 'gemini',
      name: 'Gemini',
      type: 'entry',
      layer: 'entry',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '付費', '雲端'],
      description: '主要查資料工具。與 Google 生態整合最佳。',
      notes: ['Google One AI Pro']
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      type: 'entry',
      layer: 'entry',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['探索中', '付費', '雲端'],
      description: '整理固定文件、說明書、FAQ 的結構化整理。',
      notes: ['還在找最佳用法', '不吃即時資料']
    },
    {
      id: 'yujie',
      name: '語婕',
      type: 'entry',
      layer: 'entry',
      location: 'API',
      payment: '免費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '免費', 'Agent'],
      description: '專屬生活秘書。管理生活提醒、帳務、訂閱、陪伴。',
      notes: ['Agnes 免費 key', '透過 Telegram 對話']
    },
    {
      id: 'xiaomi',
      name: '筱蜜',
      type: 'entry',
      layer: 'entry',
      location: 'API',
      payment: '免費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '免費', 'Agent'],
      description: '維運秘書。管理 Docker、PM2、服務檢查與 SOP。',
      notes: ['Agnes 免費 key', '透過 Telegram 對話']
    },
    {
      id: 'codex-entry',
      name: 'Codex',
      type: 'entry',
      layer: 'entry',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '付費', '雲端'],
      description: '正式改碼主力。適合公司專案與穩定 repo。',
      notes: ['ChatGPT Plus 訂閱', '不作 HomeLab 第一選擇']
    },
    {
      id: 'antigravity2',
      name: 'Antigravity2',
      type: 'entry',
      layer: 'entry',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '付費', '雲端'],
      description: '工程救火工具。跨服務、跨檔案、工具鏈救援。',
      notes: ['Google AI Pro', 'OpenCode 壞掉時使用']
    },
    {
      id: 'opencode-entry',
      name: 'OpenCode',
      type: 'entry',
      layer: 'entry',
      location: 'M2 Pro',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['主力入口', '付費', '自架', 'M2 Pro'],
      description: '日常開發工作台。適合 HomeLab、小工具、腳本。',
      notes: ['OpenCode GO 訂閱', '不用來修自己']
    },
    {
      id: 'claude-cc',
      name: 'Claude + CC Switch',
      type: 'entry',
      layer: 'entry',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'exploring',
      tags: ['探索中', '付費', '雲端'],
      description: '探索中的 Claude 介面 coding 入口。',
      notes: ['OpenCode GO 端點', '不確定是否比原生 API 好用']
    },

    // ── Agent 平台層 ──
    {
      id: 'openclaw',
      name: 'OpenClaw',
      type: 'agent',
      layer: 'agent',
      location: 'M2 Pro',
      payment: '自架',
      directUse: '語婕',
      status: 'active',
      tags: ['自架', 'M2 Pro', 'Agent'],
      description: '語婕的 Agent 平台。處理生活提醒、帳務、陪伴。',
      notes: ['Telegram 入口', '個人 AI Agent 研究平台']
    },
    {
      id: 'hermes',
      name: 'Hermes',
      type: 'agent',
      layer: 'agent',
      location: 'M2 Pro',
      payment: '自架',
      directUse: '筱蜜',
      status: 'active',
      tags: ['自架', 'M2 Pro', 'Agent'],
      description: '筱蜜的 Agent 平台。管理 HomeLab 維運。',
      notes: ['Docker / PM2 管理', 'Telegram 入口']
    },

    // ── 工程執行層 ──
    {
      id: 'codex-engine',
      name: 'Codex',
      type: 'engine',
      layer: 'engine',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['付費', '雲端', '幕後'],
      description: '正式 coding 引擎。公司專案與穩定 repo。',
      notes: ['ChatGPT Plus 內']
    },
    {
      id: 'antigravity2-engine',
      name: 'Antigravity2',
      type: 'engine',
      layer: 'engine',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['付費', '雲端', '幕後'],
      description: '工程救火引擎。跨服務、跨檔案、工具鏈。',
      notes: ['Google AI Pro 內']
    },
    {
      id: 'opencode-engine',
      name: 'OpenCode',
      type: 'engine',
      layer: 'engine',
      location: 'M2 Pro',
      payment: '付費',
      directUse: '弘儒',
      status: 'active',
      tags: ['付費', '自架', 'M2 Pro', '幕後'],
      description: '日常開發引擎。HomeLab、小工具、腳本。',
      notes: ['本機 OpenCode server']
    },
    {
      id: 'claude-cc-engine',
      name: 'Claude + CC Switch',
      type: 'engine',
      layer: 'engine',
      location: '雲端',
      payment: '付費',
      directUse: '弘儒',
      status: 'exploring',
      tags: ['探索中', '付費', '雲端', '幕後'],
      description: 'Claude 介面 coding 測試。',
      notes: ['OpenCode GO 端點']
    },

    // ── 模型燃料層 ──
    {
      id: 'chatgpt-plus',
      name: 'ChatGPT Plus',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '付費',
      directUse: '系統',
      status: 'active',
      tags: ['付費', '雲端', '幕後'],
      description: 'OpenAI 訂閱。提供 ChatGPT / Codex 模型能力。',
      notes: ['每月 $20']
    },
    {
      id: 'google-ai-pro',
      name: 'Google AI Pro',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '付費',
      directUse: '系統',
      status: 'active',
      tags: ['付費', '雲端', '幕後'],
      description: 'Google One AI Pro 訂閱。Gemini / Antigravity2 / NotebookLM 共用。',
      notes: ['Google One AI Pro 方案']
    },
    {
      id: 'opencode-go',
      name: 'OpenCode GO',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '付費',
      directUse: '系統',
      status: 'active',
      tags: ['付費', '雲端', '幕後'],
      description: 'OpenCode 訂閱。提供 OpenCode / Claude + CC Switch 模型。',
      notes: ['月訂閱']
    },
    {
      id: 'ollama-cloud-proxy',
      name: 'Ollama-cloud-Proxy',
      type: 'fuel',
      layer: 'fuel',
      location: 'M2 Pro',
      payment: '自架',
      directUse: '系統',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '雙重身份'],
      description: '管理 15 個 Ollama 免費帳號的代理程式。',
      notes: ['自架於 M2 Pro', '管理 key pool、fallback']
    },
    {
      id: 'newapi',
      name: 'NewAPI',
      type: 'fuel',
      layer: 'fuel',
      location: 'Mint',
      payment: '自架',
      directUse: '系統',
      status: 'active',
      tags: ['自架', 'Mint', '幕後'],
      description: '管理 Nvidia NIM 與 OpenCode Zen 多組 API key。',
      notes: ['自架於 Mint']
    },
    {
      id: 'nvidia-nim',
      name: 'Nvidia NIM x4',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '免費',
      directUse: '系統',
      status: 'active',
      tags: ['免費', '雲端', '幕後'],
      description: '4 個 Nvidia NIM 免費帳號，由 NewAPI 管理。',
      notes: ['免費帳號']
    },
    {
      id: 'opencode-zen',
      name: 'OpenCode Zen x4',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '免費',
      directUse: '系統',
      status: 'active',
      tags: ['免費', '雲端', '幕後'],
      description: '4 個 OpenCode Zen 免費帳號，由 NewAPI 管理。',
      notes: ['免費帳號']
    },
    {
      id: 'ollama-accounts',
      name: 'Ollama 免費帳號 x15',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '免費',
      directUse: '系統',
      status: 'active',
      tags: ['免費', '雲端', '幕後'],
      description: '15 個 Ollama 免費帳號，由 Ollama-cloud-Proxy 管理。',
      notes: ['免費帳號池']
    },
    {
      id: 'copilot-student',
      name: 'Copilot Student',
      type: 'fuel',
      layer: 'fuel',
      location: '雲端',
      payment: '免費',
      directUse: '弘儒',
      status: 'active',
      tags: ['免費', '雲端', '幕後'],
      description: 'GitHub Copilot 學生版。IDE 內補完。',
      notes: ['學生免費']
    },

    // ── 知識庫層 ──
    {
      id: 'mcp-x4',
      name: 'MCP 知識庫 x4',
      type: 'knowledge',
      layer: 'knowledge',
      location: 'M2 Pro',
      payment: '自架',
      directUse: 'Agent',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '知識庫'],
      description: '4 個 MCP 知識庫，供 Agent 查詢活資料。',
      notes: []
    },
    {
      id: 'kb-yujie',
      name: '語婕知識庫',
      type: 'knowledge',
      layer: 'knowledge',
      location: 'M2 Pro',
      payment: '自架',
      directUse: '語婕',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '知識庫'],
      description: '語婕相關的 MCP 知識庫。',
      notes: ['活資料查詢']
    },
    {
      id: 'kb-xiaomi',
      name: '筱蜜知識庫',
      type: 'knowledge',
      layer: 'knowledge',
      location: 'M2 Pro',
      payment: '自架',
      directUse: '筱蜜',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '知識庫'],
      description: '筱蜜相關的 MCP 知識庫。',
      notes: ['HomeLab 維運資料']
    },
    {
      id: 'kb-tech',
      name: '技術文件知識庫',
      type: 'knowledge',
      layer: 'knowledge',
      location: 'M2 Pro',
      payment: '自架',
      directUse: 'Agent',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '知識庫'],
      description: '技術文件 MCP 知識庫。',
      notes: []
    },
    {
      id: 'kb-homelab',
      name: 'HomeLab 知識庫',
      type: 'knowledge',
      layer: 'knowledge',
      location: 'M2 Pro',
      payment: '自架',
      directUse: 'Agent',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '知識庫'],
      description: 'HomeLab 相關 MCP 知識庫。',
      notes: []
    },

    // ── Agnes 自拍引擎 ──
    {
      id: 'agnes-yujie',
      name: 'Agnes 語婕 key',
      type: 'media',
      layer: 'media',
      location: 'API',
      payment: '免費',
      directUse: '語婕',
      status: 'active',
      tags: ['免費', 'API', '幕後', '媒體'],
      description: '語婕的 Agnes 免費獨立 key。用於自拍/影片。',
      notes: ['我不是直接操作 Agnes']
    },
    {
      id: 'agnes-xiaomi',
      name: 'Agnes 筱蜜 key',
      type: 'media',
      layer: 'media',
      location: 'API',
      payment: '免費',
      directUse: '筱蜜',
      status: 'active',
      tags: ['免費', 'API', '幕後', '媒體'],
      description: '筱蜜的 Agnes 免費獨立 key。用於自拍/影片。',
      notes: ['我不是直接操作 Agnes']
    },
    {
      id: 'comfyui',
      name: 'ComfyUI',
      type: 'media',
      layer: 'media',
      location: 'M2 Pro',
      payment: '自架',
      directUse: 'OpenCode',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後', '媒體'],
      description: '本機生圖工具。由 OpenCode 腳本操作。',
      notes: ['目前主要是 NSFW 試驗', '效果不佳，非日常主力']
    },
    {
      id: 'media-yujie',
      name: '語婕自拍 / 影片',
      type: 'media',
      layer: 'media',
      location: '輸出',
      payment: '免費',
      directUse: '語婕',
      status: 'active',
      tags: ['免費', '媒體'],
      description: '語婕的自拍與影片輸出。',
      notes: ['Agnes 免費 key 產生']
    },
    {
      id: 'media-xiaomi',
      name: '筱蜜自拍 / 影片',
      type: 'media',
      layer: 'media',
      location: '輸出',
      payment: '免費',
      directUse: '筱蜜',
      status: 'active',
      tags: ['免費', '媒體'],
      description: '筱蜜的自拍與影片輸出。',
      notes: ['Agnes 免費 key 產生']
    },

    // ── 基礎設施層 ──
    {
      id: 'm2pro',
      name: 'M2 Pro Mac mini',
      type: 'infra',
      layer: 'infrastructure',
      location: 'M2 Pro',
      payment: '自架',
      directUse: '-',
      status: 'active',
      tags: ['自架', 'M2 Pro', '幕後'],
      description: 'AI 主機。跑 OpenCode server、Ollama-cloud-Proxy、MCP、ComfyUI 等。',
      notes: ['24/7 運行']
    },
    {
      id: 'mint',
      name: 'Mint',
      type: 'infra',
      layer: 'infrastructure',
      location: 'Mint',
      payment: '自架',
      directUse: '-',
      status: 'active',
      tags: ['自架', 'Mint', '幕後'],
      description: 'HomeLab 基礎服務主機。跑 NewAPI、Gitea、Home Assistant 等。',
      notes: ['24/7 運行']
    },
    {
      id: 'cloud',
      name: '雲端服務',
      type: 'infra',
      layer: 'infrastructure',
      location: '雲端',
      payment: '付費',
      directUse: '-',
      status: 'active',
      tags: ['付費', '雲端', '幕後'],
      description: '各大雲端 AI 服務。OpenAI / Google / Nvidia / OpenCode Zen / Agnes API 等。',
      notes: []
    }
  ],

  // ─── 邊定義 ───
  edges: [
    // 人 → 入口
    { from: 'hongru', to: 'chatgpt', label: '使用', type: 'use' },
    { from: 'hongru', to: 'gemini', label: '使用', type: 'use' },
    { from: 'hongru', to: 'notebooklm', label: '使用', type: 'use' },
    { from: 'hongru', to: 'yujie', label: 'Telegram', type: 'use' },
    { from: 'hongru', to: 'xiaomi', label: 'Telegram', type: 'use' },
    { from: 'hongru', to: 'codex-entry', label: '使用', type: 'use' },
    { from: 'hongru', to: 'antigravity2', label: '使用', type: 'use' },
    { from: 'hongru', to: 'opencode-entry', label: '使用', type: 'use' },
    { from: 'hongru', to: 'claude-cc', label: '測試', type: 'use' },

    // 入口 → Agent 平台
    { from: 'yujie', to: 'openclaw', label: '語婕平台', type: 'runs-on' },
    { from: 'xiaomi', to: 'hermes', label: '筱蜜平台', type: 'runs-on' },

    // 入口 → 燃料
    { from: 'chatgpt', to: 'chatgpt-plus', label: '訂閱', type: 'payment' },
    { from: 'gemini', to: 'google-ai-pro', label: '訂閱', type: 'payment' },
    { from: 'notebooklm', to: 'google-ai-pro', label: '共用', type: 'payment' },
    { from: 'codex-entry', to: 'chatgpt-plus', label: '訂閱', type: 'payment' },
    { from: 'antigravity2', to: 'google-ai-pro', label: '共用', type: 'payment' },
    { from: 'opencode-entry', to: 'opencode-go', label: '訂閱', type: 'payment' },
    { from: 'claude-cc', to: 'opencode-go', label: '端點', type: 'payment' },

    // Agent → 知識庫
    { from: 'openclaw', to: 'kb-yujie', label: '查詢', type: 'query' },
    { from: 'openclaw', to: 'mcp-x4', label: '查詢', type: 'query' },
    { from: 'hermes', to: 'kb-xiaomi', label: '查詢', type: 'query' },
    { from: 'hermes', to: 'mcp-x4', label: '查詢', type: 'query' },
    { from: 'hermes', to: 'mint', label: '管理 Docker/PM2', type: 'manage' },

    // Agent → 媒體
    { from: 'openclaw', to: 'agnes-yujie', label: '自拍', type: 'media' },
    { from: 'hermes', to: 'agnes-xiaomi', label: '自拍', type: 'media' },
    { from: 'agnes-yujie', to: 'media-yujie', label: '輸出', type: 'output' },
    { from: 'agnes-xiaomi', to: 'media-xiaomi', label: '輸出', type: 'output' },

    // 燃料管線
    { from: 'chatgpt-plus', to: 'codex-engine', label: '驅動', type: 'fuel-flow' },
    { from: 'google-ai-pro', to: 'antigravity2-engine', label: '驅動', type: 'fuel-flow' },
    { from: 'opencode-go', to: 'opencode-engine', label: '驅動', type: 'fuel-flow' },
    { from: 'opencode-go', to: 'claude-cc-engine', label: '驅動', type: 'fuel-flow' },
    { from: 'ollama-cloud-proxy', to: 'ollama-accounts', label: '管理', type: 'manage' },
    { from: 'newapi', to: 'nvidia-nim', label: '管理', type: 'manage' },
    { from: 'newapi', to: 'opencode-zen', label: '管理', type: 'manage' },

    // 部署位置
    { from: 'm2pro', to: 'opencode-engine', label: '運行', type: 'hosts' },
    { from: 'm2pro', to: 'ollama-cloud-proxy', label: '運行', type: 'hosts' },
    { from: 'm2pro', to: 'comfyui', label: '運行', type: 'hosts' },
    { from: 'm2pro', to: 'mcp-x4', label: '運行', type: 'hosts' },
    { from: 'm2pro', to: 'openclaw', label: '運行', type: 'hosts' },
    { from: 'm2pro', to: 'hermes', label: '運行', type: 'hosts' },
    { from: 'mint', to: 'newapi', label: '運行', type: 'hosts' },

    // OpenCode 操作 ComfyUI
    { from: 'opencode-engine', to: 'comfyui', label: '腳本操作', type: 'script' },

    // 知識流向
    { from: 'kb-yujie', to: 'mcp-x4', label: '提供', type: 'feeds' },
    { from: 'kb-xiaomi', to: 'mcp-x4', label: '提供', type: 'feeds' },
    { from: 'kb-tech', to: 'mcp-x4', label: '提供', type: 'feeds' },
    { from: 'kb-homelab', to: 'mcp-x4', label: '提供', type: 'feeds' },
    { from: 'mcp-x4', to: 'openclaw', label: '供查詢', type: 'feeds' },
    { from: 'mcp-x4', to: 'hermes', label: '供查詢', type: 'feeds' }
  ],

  // ─── 視角定義 ───
  views: [
    {
      id: 'overview',
      title: 'AI OS 總覽',
      description: '從上到下的分層架構。我不是有很多工具，而是有一個 AI OS。',
      layers: [
        { id: 'user', label: '我', color: 'var(--accent)' },
        { id: 'entry', label: '使用入口層', color: 'var(--sky)' },
        { id: 'agent', label: 'Agent 層', color: 'var(--purple)' },
        { id: 'engine', label: '工程執行層', color: 'var(--gold)' },
        { id: 'fuel', label: '模型燃料層', color: 'var(--rose)' },
        { id: 'knowledge', label: '知識庫層', color: 'var(--green)' },
        { id: 'media', label: '媒體層', color: 'var(--pink)' },
        { id: 'infrastructure', label: '基礎設施層', color: 'var(--indigo)' }
      ],
      nodeIds: [
        'hongru',
        'chatgpt', 'gemini', 'notebooklm', 'yujie', 'xiaomi', 'codex-entry', 'antigravity2', 'opencode-entry', 'claude-cc',
        'openclaw', 'hermes',
        'codex-engine', 'antigravity2-engine', 'opencode-engine', 'claude-cc-engine',
        'chatgpt-plus', 'google-ai-pro', 'opencode-go', 'ollama-cloud-proxy', 'newapi', 'nvidia-nim', 'opencode-zen', 'ollama-accounts',
        'mcp-x4', 'kb-yujie', 'kb-xiaomi', 'kb-tech', 'kb-homelab',
        'agnes-yujie', 'agnes-xiaomi', 'comfyui',
        'm2pro', 'mint', 'cloud'
      ],
      edgeIds: []
    },
    {
      id: 'entries',
      title: '使用入口',
      description: '我會親自操作的入口工具，及其背後的訂閱與平台。',
      nodeIds: [
        'hongru',
        'chatgpt', 'gemini', 'notebooklm', 'yujie', 'xiaomi', 'codex-entry', 'antigravity2', 'opencode-entry', 'claude-cc',
        'openclaw', 'hermes',
        'chatgpt-plus', 'google-ai-pro', 'opencode-go',
        'kb-yujie', 'kb-xiaomi',
        'agnes-yujie', 'agnes-xiaomi'
      ],
      edgeIds: [
        'hongru-to-chatgpt', 'hongru-to-gemini', 'hongru-to-notebooklm', 'hongru-to-yujie', 'hongru-to-xiaomi',
        'hongru-to-codex-entry', 'hongru-to-antigravity2', 'hongru-to-opencode-entry', 'hongru-to-claude-cc',
        'yujie-to-openclaw', 'xiaomi-to-hermes',
        'chatgpt-to-chatgpt-plus', 'gemini-to-google-ai-pro', 'notebooklm-to-google-ai-pro',
        'codex-entry-to-chatgpt-plus', 'antigravity2-to-google-ai-pro',
        'opencode-entry-to-opencode-go', 'claude-cc-to-opencode-go',
        'openclaw-to-kb-yujie', 'hermes-to-kb-xiaomi',
        'openclaw-to-agnes-yujie', 'hermes-to-agnes-xiaomi'
      ]
    },
    {
      id: 'agent-flow',
      title: 'Agent 流程',
      description: '語婕與筱蜜的左右對照流程圖。',
      nodeIds: [
        'hongru',
        'yujie', 'xiaomi',
        'openclaw', 'hermes',
        'kb-yujie', 'kb-xiaomi',
        'agnes-yujie', 'agnes-xiaomi',
        'media-yujie', 'media-xiaomi',
        'codex-engine', 'antigravity2-engine', 'opencode-engine'
      ],
      edgeIds: [
        'hongru-to-yujie', 'hongru-to-xiaomi',
        'yujie-to-openclaw', 'xiaomi-to-hermes',
        'openclaw-to-kb-yujie', 'hermes-to-kb-xiaomi',
        'openclaw-to-agnes-yujie', 'hermes-to-agnes-xiaomi',
        'agnes-yujie-to-media-yujie', 'agnes-xiaomi-to-media-xiaomi'
      ]
    },
    {
      id: 'fuel',
      title: '模型燃料',
      description: '模型燃料管線：從付費/免費來源到工具。',
      nodeIds: [
        'chatgpt-plus', 'google-ai-pro', 'opencode-go',
        'ollama-cloud-proxy', 'newapi',
        'nvidia-nim', 'opencode-zen', 'ollama-accounts',
        'copilot-student',
        'chatgpt', 'gemini', 'notebooklm', 'codex-entry', 'antigravity2', 'opencode-entry', 'claude-cc',
        'codex-engine', 'antigravity2-engine', 'opencode-engine', 'claude-cc-engine',
        'agnes-yujie', 'agnes-xiaomi',
        'media-yujie', 'media-xiaomi'
      ],
      edgeIds: [
        'chatgpt-to-chatgpt-plus', 'gemini-to-google-ai-pro', 'notebooklm-to-google-ai-pro',
        'codex-entry-to-chatgpt-plus', 'antigravity2-to-google-ai-pro',
        'opencode-entry-to-opencode-go', 'claude-cc-to-opencode-go',
        'chatgpt-plus-to-codex-engine', 'google-ai-pro-to-antigravity2-engine',
        'opencode-go-to-opencode-engine', 'opencode-go-to-claude-cc-engine',
        'ollama-cloud-proxy-to-ollama-accounts',
        'newapi-to-nvidia-nim', 'newapi-to-opencode-zen'
      ]
    },
    {
      id: 'deployment',
      title: 'HomeLab 部署',
      description: '所有服務跑在哪台主機上。',
      nodeIds: [
        'cloud', 'm2pro', 'mint',
        'chatgpt-plus', 'google-ai-pro', 'opencode-go', 'nvidia-nim', 'opencode-zen', 'copilot-student',
        'ollama-cloud-proxy', 'comfyui', 'mcp-x4', 'openclaw', 'hermes', 'opencode-engine',
        'newapi',
        'chatgpt', 'gemini', 'notebooklm', 'codex-entry', 'antigravity2', 'opencode-entry'
      ],
      edgeIds: [
        'm2pro-to-opencode-engine', 'm2pro-to-ollama-cloud-proxy', 'm2pro-to-comfyui',
        'm2pro-to-mcp-x4', 'm2pro-to-openclaw', 'm2pro-to-hermes',
        'mint-to-newapi'
      ]
    },
    {
      id: 'knowledge-media',
      title: '知識庫與媒體',
      description: '知識管線與媒體生成管線。',
      nodeIds: [
        'kb-yujie', 'kb-xiaomi', 'kb-tech', 'kb-homelab',
        'mcp-x4',
        'openclaw', 'hermes',
        'notebooklm', 'chatgpt',
        'agnes-yujie', 'agnes-xiaomi',
        'media-yujie', 'media-xiaomi',
        'comfyui', 'opencode-engine'
      ],
      edgeIds: [
        'kb-yujie-to-mcp-x4', 'kb-xiaomi-to-mcp-x4', 'kb-tech-to-mcp-x4', 'kb-homelab-to-mcp-x4',
        'mcp-x4-to-openclaw', 'mcp-x4-to-hermes',
        'openclaw-to-agnes-yujie', 'hermes-to-agnes-xiaomi',
        'agnes-yujie-to-media-yujie', 'agnes-xiaomi-to-media-xiaomi',
        'opencode-engine-to-comfyui'
      ]
    }
  ]
};
