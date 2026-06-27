// 弘儒個人控制台 — 集中管理所有資料
// 修改這個檔案即可更新網站內容

const CONSOLE_DATA = {

  // ─── 區塊 2：快速決策 — 我現在該找誰？ ───
  decisionCards: [
    {
      id: 'chatgpt',
      situation: '腦袋亂、想清楚、整理架構',
      tool: 'ChatGPT',
      color: '#10a37f'
    },
    {
      id: 'gemini',
      situation: '查資料、Google 生態、長資料',
      tool: 'Gemini',
      color: '#4285f4'
    },
    {
      id: 'notebooklm',
      situation: '整理固定文件、說明書、FAQ',
      tool: 'NotebookLM',
      color: '#f59e0b'
    },
    {
      id: 'yujie',
      situation: '生活提醒、帳務、訂閱、陪伴',
      tool: '語婕',
      color: '#ec4899'
    },
    {
      id: 'xiaomi',
      situation: 'HomeLab、Docker、PM2、服務檢查',
      tool: '筱蜜',
      color: '#8b5cf6'
    },
    {
      id: 'codex',
      situation: '正式 coding、公司專案、穩定改碼',
      tool: 'Codex',
      color: '#2dd4bf'
    },
    {
      id: 'antigravity2',
      situation: 'OpenCode 壞掉、工具鏈救火、複雜工程',
      tool: 'Antigravity2',
      color: '#f43f5e'
    },
    {
      id: 'opencode',
      situation: '日常 HomeLab 開發、小工具、腳本',
      tool: 'OpenCode',
      color: '#6366f1'
    }
  ],

  // ─── 區塊 3：我會親自使用的入口 ───
  toolEntries: [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      category: '主力入口',
      description: '想清楚、整理混亂、做決策',
      status: 'ChatGPT Plus',
      note: '主要判斷腦'
    },
    {
      id: 'gemini',
      name: 'Gemini',
      category: '主力入口',
      description: '查資料、Google 生態、長資料',
      status: 'Google One AI Pro / Gemini AI Pro',
      note: '主要查資料工具'
    },
    {
      id: 'notebooklm',
      name: 'NotebookLM',
      category: '探索中入口',
      description: '整理固定文件、說明書、FAQ、知識包',
      status: '包含於 Google AI Pro',
      note: '我會自己操作，但還在找最佳用法'
    },
    {
      id: 'yujie',
      name: '語婕',
      category: 'Agent / 生活秘書',
      description: '生活、提醒、帳務、訂閱、陪伴、語婕自拍/影片',
      status: 'Agnes 免費 key',
      note: 'Agnes 語婕 key 是免費獨立 key'
    },
    {
      id: 'xiaomi',
      name: '筱蜜',
      category: 'Agent / 維運秘書',
      description: 'HomeLab、服務檢查、log、SOP、筱蜜自拍/影片',
      status: 'Agnes 免費 key',
      note: '筱蜜要有秘書感，不要像機器人'
    },
    {
      id: 'codex',
      name: 'Codex',
      category: '工程入口',
      description: '正式 coding、公司專案、正式 repo',
      status: 'ChatGPT Plus',
      note: '正式改碼主力'
    },
    {
      id: 'antigravity2',
      name: 'Antigravity2',
      category: '工程救火入口',
      description: 'OpenCode 壞掉、跨服務、跨檔案、工具鏈救援',
      status: 'Google AI Pro',
      note: '複雜工程救火第一順位'
    },
    {
      id: 'opencode',
      name: 'OpenCode',
      category: '日常開發入口',
      description: 'HomeLab、小工具、腳本、自架服務調整',
      status: 'OpenCode GO / 其他模型來源',
      note: '日常開發工作台，不用來修自己'
    },
    {
      id: 'claude',
      name: 'Claude + CC Switch',
      category: '探索中 coding 入口',
      description: '想測 Claude 介面 coding 時使用',
      status: 'OpenCode GO 端點',
      note: '目前不確定是否比 Claude Code 原生 API 好用'
    }
  ],

  // ─── 區塊 4：Agent — 語婕與筱蜜 ───
  agents: {
    yujie: {
      name: '語婕',
      role: '生活秘書',
      manages: '生活、提醒、帳務、訂閱、陪伴',
      selfie: '使用 Agnes 語婕免費獨立 key',
      usage: '直接從 Telegram 找語婕',
      color: '#ec4899'
    },
    xiaomi: {
      name: '筱蜜',
      role: 'HomeLab 維運秘書',
      manages: '機器、服務、Docker、PM2、log、SOP',
      selfie: '使用 Agnes 筱蜜免費獨立 key',
      usage: '直接從 Telegram 找筱蜜',
      note: '有秘書感，不要像機器人',
      color: '#8b5cf6'
    }
  },

  // ─── 區塊 5：訂閱與免費額度 ───
  subscriptions: {
    paid: [
      { name: 'ChatGPT Plus', description: '年繳方案' },
      { name: 'Google One AI Pro / Gemini AI Pro', description: '' },
      { name: 'OpenCode GO', description: '' }
    ],
    free: [
      { name: 'GitHub Copilot Student', description: '' },
      { name: 'Ollama-cloud-Proxy', description: '自架服務，管理 15 個 Ollama 免費帳號' },
      { name: 'Nvidia NIM', description: '4 個免費帳號，由 NewAPI 管理' },
      { name: 'OpenCode Zen', description: '4 個免費帳號，由 NewAPI 管理' },
      { name: 'Agnes 語婕 key', description: '免費獨立 key' },
      { name: 'Agnes 筱蜜 key', description: '免費獨立 key' }
    ],
    removed: [
      { name: 'LiteLLM', description: '已完全移除，不列入現行架構' }
    ]
  },

  // ─── 區塊 6：自架服務位置 ───
  selfHosted: {
    m2: {
      title: 'M2 Pro Mac mini',
      subtitle: 'AI 主機',
      services: [
        { name: 'Ollama-cloud-Proxy', description: '管理 15 個 Ollama 免費帳號' },
        { name: 'ComfyUI', description: '本機生圖試驗，非日常主力' },
        { name: 'MCP 知識庫 x4', description: '活資料查詢' },
        { name: 'OpenCode server', description: '日常 HomeLab 開發' },
        { name: 'Hermes 筱蜜', description: 'Agent 平台' },
        { name: 'PM2 / Docker', description: '常駐與容器管理' }
      ]
    },
    mint: {
      title: 'Mint',
      subtitle: 'HomeLab 基礎服務主機',
      services: [
        { name: 'NewAPI', description: '管理 Nvidia NIM x4、OpenCode Zen x4' },
        { name: 'Gitea', description: '' },
        { name: 'Home Assistant', description: '' },
        { name: 'Vaultwarden', description: '' },
        { name: 'OpenWebUI', description: '' },
        { name: 'Dockge', description: '' },
        { name: '其他 HomeLab 基礎服務', description: '' }
      ]
    },
    cloud: {
      title: '雲端',
      subtitle: '',
      services: [
        { name: 'ChatGPT Plus / Codex', description: '' },
        { name: 'Google AI Pro / Gemini / Antigravity2 / NotebookLM', description: '' },
        { name: 'OpenCode GO', description: '' },
        { name: 'GitHub Copilot Student', description: '' },
        { name: 'Nvidia NIM', description: '' },
        { name: 'OpenCode Zen', description: '' },
        { name: 'Agnes API', description: '' }
      ]
    }
  },

  // ─── 區塊 8：書籍管理入口 ───
  books: [
    {
      title: '實作 Swift 設計模式',
      description: '系統化講解 MVC、Factory、Facade、Decorator、Observer、MVP 等 iOS 常見架構與設計模式',
      readUrl: 'https://wilden-chen.gitbook.io/swift-design-patterns',
      manageUrl: null, // TODO: 管理連結（如 GitBook admin）
      status: '已出版'
    },
    {
      title: 'Swift 殿堂之路',
      description: '從 Xcode 開發環境、基本元素、流程控制到物件導向核心的 Swift 實用教程',
      readUrl: 'https://wilden-chen.gitbook.io/swift-bethel-of-the-road',
      manageUrl: null, // TODO: 管理連結（如 GitBook admin）
      status: '已出版'
    }
  ],

  // ─── 區塊 9：GitHub 專案書籤 ───
  projects: [
    {
      name: 'LionEvents',
      purpose: '仿 ActionScript 3.0 事件流設計的 iOS/Swift 事件監聽與發送框架',
      type: 'App / Framework',
      status: '歸檔',
      links: {
        GitHub: 'https://github.com/WildenChen/LionEvents'
      }
    },
    {
      name: 'ollama-cloud-proxy',
      purpose: 'Ollama Cloud 輔助代理程式，管理 key pool、fallback、streaming 相容性',
      type: 'AI 工具 / HomeLab',
      status: '使用中',
      links: {
        GitHub: 'https://github.com/WildenChen/ollama-cloud-proxy'
      }
    },
    {
      name: 'OpenClaw',
      purpose: '個人 AI Agent 研究：記憶系統、工具呼叫、Telegram 入口、主動巡檢',
      type: 'Agent / 實驗',
      status: '實驗中',
      links: {
        Docs: '../openclaw/'
        // GitHub: TODO — 私人專案
      }
    }
  ]
};
