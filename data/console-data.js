// 用戶個人控制台 — 所有資料集中管理
// 修改這個檔案即可更新網站內容

var CONSOLE_DATA = {

  // ─── AI 架構互動地圖：任務定義 ───
  tasks: [
    {
      id: 'thinking',
      label: '想清楚',
      firstChoice: 'ChatGPT',
      why: 'ChatGPT 擅長混亂中整理架構、拆解複雜任務',
      behind: ['ChatGPT Plus'],
      notRecommended: 'NotebookLM 不做最終判斷'
    },
    {
      id: 'research',
      label: '查資料',
      firstChoice: 'Gemini',
      why: 'Gemini 與 Google 生態整合最佳，適合長文件與跨服務查詢',
      behind: ['Google AI Pro'],
      notRecommended: 'ChatGPT 可輔助判斷，但不是主要搜尋入口'
    },
    {
      id: 'organize',
      label: '整理文件',
      firstChoice: 'NotebookLM',
      why: 'NotebookLM 適合固定文件、說明書、FAQ 的結構化整理',
      behind: ['Google AI Pro', 'Google 帳號能力'],
      notRecommended: '不適合最後決策'
    },
    {
      id: 'life',
      label: '生活 / 帳務 / 陪伴',
      firstChoice: '語婕',
      why: '語婕是專屬生活秘書，管理生活提醒、帳務、訂閱與陪伴',
      behind: ['OpenClaw', '語婕知識庫 MCP', 'Agnes 語婕 key']
    },
    {
      id: 'homelab',
      label: 'HomeLab / 機器',
      firstChoice: '筱蜜',
      why: '筱蜜是維運秘書，管理 Docker、PM2、服務檢查與 SOP',
      behind: ['Hermes', 'HomeLab 知識庫 MCP', 'PM2', 'Docker']
    },
    {
      id: 'coding',
      label: '正式 coding',
      firstChoice: 'Codex',
      why: 'Codex 是正式改碼主力，適合公司專案與穩定 repo',
      behind: ['ChatGPT Plus'],
      notRecommended: 'OpenCode 不作正式公司 repo 第一選擇'
    },
    {
      id: 'firefighting',
      label: '工程救火',
      firstChoice: 'Antigravity2',
      why: 'Antigravity2 擅長跨服務、跨檔案、工具鏈救援',
      behind: ['Google AI Pro'],
      note: 'OpenCode 壞掉、跨檔案、跨服務時使用'
    },
    {
      id: 'dev',
      label: '日常開發',
      firstChoice: 'OpenCode',
      why: 'OpenCode 是日常開發工作台，適合 HomeLab、小工具、腳本',
      behind: ['OpenCode server', 'OpenCode GO', 'NewAPI / Ollama-cloud-Proxy']
    },
    {
      id: 'yujie-selfie',
      label: '語婕自拍',
      firstChoice: '語婕',
      why: '語婕自拍使用 Agnes 語婕免費獨立 key',
      behind: ['Agnes 語婕免費獨立 key'],
      note: '我不是直接操作 Agnes'
    },
    {
      id: 'xiaomi-selfie',
      label: '筱蜜自拍',
      firstChoice: '筱蜜',
      why: '筱蜜自拍使用 Agnes 筱蜜免費獨立 key',
      behind: ['Agnes 筱蜜免費獨立 key'],
      note: '我不是直接操作 Agnes'
    }
  ],

  // ─── AI 架構互動地圖：入口工具 ───
  entryGroups: [
    {
      group: '主力',
      items: [
        {
          name: 'ChatGPT',
          category: '主力入口',
          purpose: '想清楚、整理混亂、做決策',
          payment: 'ChatGPT Plus',
          behind: 'ChatGPT Plus',
          note: '主要判斷腦'
        },
        {
          name: 'Gemini',
          category: '主力入口',
          purpose: '查資料、Google 生態、長資料',
          payment: 'Google One AI Pro / Gemini AI Pro',
          behind: 'Google AI Pro',
          note: '主要查資料工具'
        },
        {
          name: '語婕',
          category: 'Agent / 生活秘書',
          purpose: '生活、提醒、帳務、訂閱、陪伴、自拍/影片',
          payment: 'Agnes 免費 key',
          behind: 'OpenClaw + Agnes API',
          note: 'Agnes 語婕 key 是免費獨立 key'
        },
        {
          name: '筱蜜',
          category: 'Agent / 維運秘書',
          purpose: 'HomeLab、服務檢查、log、SOP、自拍/影片',
          payment: 'Agnes 免費 key',
          behind: 'Hermes + Agnes API',
          note: '筱蜜要有秘書感，不要像機器人'
        },
        {
          name: 'Codex',
          category: '工程入口',
          purpose: '正式 coding、公司專案、正式 repo',
          payment: 'ChatGPT Plus',
          behind: 'ChatGPT Plus',
          note: '正式改碼主力'
        },
        {
          name: 'Antigravity2',
          category: '工程救火入口',
          purpose: 'OpenCode 壞掉、跨服務、跨檔案、工具鏈救援',
          payment: 'Google AI Pro',
          behind: 'Google AI Pro',
          note: '複雜工程救火第一順位'
        },
        {
          name: 'OpenCode',
          category: '日常開發入口',
          purpose: 'HomeLab、小工具、腳本、自架服務調整',
          payment: 'OpenCode GO / 其他模型來源',
          behind: 'OpenCode server + OpenCode GO',
          note: '日常開發工作台，不用來修自己'
        }
      ]
    },
    {
      group: '探索中',
      items: [
        {
          name: 'NotebookLM',
          category: '探索中入口',
          purpose: '整理固定文件、說明書、FAQ、知識包',
          payment: '包含於 Google AI Pro',
          behind: 'Google AI Pro',
          note: '我會自己操作，但還在找最佳用法'
        },
        {
          name: 'Claude + CC Switch',
          category: '探索中 coding 入口',
          purpose: '想測 Claude 介面 coding 時使用',
          payment: 'OpenCode GO 端點',
          behind: 'OpenCode GO',
          note: '目前不確定是否比 Claude Code 原生 API 好用'
        }
      ]
    }
  ],

  // ─── AI 架構互動地圖：部署位置 ───
  locationGroups: [
    {
      location: '雲端',
      subtitle: '',
      services: [
        { name: 'ChatGPT Plus / Codex', description: '' },
        { name: 'Google AI Pro / Gemini / Antigravity2 / NotebookLM', description: '' },
        { name: 'OpenCode GO', description: '' },
        { name: 'GitHub Copilot Student', description: '' },
        { name: 'Nvidia NIM x4', description: '' },
        { name: 'OpenCode Zen x4', description: '' },
        { name: 'Agnes API', description: '' }
      ]
    },
    {
      location: 'M2 Pro Mac mini',
      subtitle: 'AI 主機',
      services: [
        { name: 'Ollama-cloud-Proxy', description: '管理 15 個 Ollama 免費帳號', badge: '雙重身份' },
        { name: 'ComfyUI', description: '本機生圖試驗，非日常主力' },
        { name: 'MCP 知識庫 x4', description: '活資料查詢' },
        { name: 'OpenCode server', description: '日常 HomeLab 開發' },
        { name: 'Hermes 筱蜜', description: 'Agent 平台' },
        { name: 'PM2 / Docker', description: '常駐與容器管理' }
      ]
    },
    {
      location: 'Mint',
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
    }
  ],

  // ─── AI 架構互動地圖：訂閱狀態 ───
  subscriptionGroups: [
    {
      group: '付費',
      items: [
        { name: 'ChatGPT Plus', description: '' },
        { name: 'Google One AI Pro / Gemini AI Pro', description: '' },
        { name: 'OpenCode GO', description: '' }
      ]
    },
    {
      group: '免費',
      items: [
        { name: 'GitHub Copilot Student', description: '' },
        { name: 'Ollama-cloud-Proxy', description: '15 個 Ollama 免費帳號管理入口', badge: '雙重身份' },
        { name: 'Nvidia NIM', description: '4 個免費帳號，由 NewAPI 管' },
        { name: 'OpenCode Zen', description: '4 個免費帳號，由 NewAPI 管' },
        { name: 'Agnes 語婕 key', description: '免費' },
        { name: 'Agnes 筱蜜 key', description: '免費' }
      ]
    },
    {
      group: '自架',
      items: [
        { name: 'NewAPI', description: '' },
        { name: 'Ollama-cloud-Proxy', description: '', badge: '雙重身份' },
        { name: 'ComfyUI', description: '' },
        { name: 'MCP x4', description: '' },
        { name: 'OpenCode server', description: '' },
        { name: 'Hermes / OpenClaw', description: '' }
      ]
    }
  ],

  // ─── AI 架構互動地圖：Agent 關係 ───
  agentRelations: {
    agents: [
      {
        name: '語婕',
        platform: 'OpenClaw',
        role: '生活秘書',
        manages: '生活、提醒、帳務、陪伴',
        selfie: 'Agnes 語婕 key',
        knowledge: '語婕相關 MCP / 知識庫',
        color: '#ec4899'
      },
      {
        name: '筱蜜',
        platform: 'Hermes',
        role: 'HomeLab 維運秘書',
        manages: '機器、服務、Docker、PM2、log、SOP',
        selfie: 'Agnes 筱蜜 key',
        knowledge: 'HomeLab MCP / 知識庫',
        note: '有秘書感，不要像機器人',
        color: '#8b5cf6'
      }
    ],
    connections: [
      { from: '語婕', to: 'Agnes 語婕 key', type: '自拍' },
      { from: '筱蜜', to: 'Agnes 筱蜜 key', type: '自拍' },
      { from: '語婕', to: 'MCP 知識庫', type: '查詢' },
      { from: '筱蜜', to: 'MCP 知識庫', type: '查詢' },
      { from: '筱蜜', to: 'PM2 / Docker', type: '管理' },
      { from: '筱蜜', to: 'HomeLab', type: '維運' },
      { from: 'OpenCode', to: 'ComfyUI', type: '腳本操作' },
      { from: 'NewAPI', to: 'Nvidia NIM x4', type: '管理' },
      { from: 'NewAPI', to: 'OpenCode Zen x4', type: '管理' },
      { from: 'Ollama-cloud-Proxy', to: 'Ollama x15', type: '管理' }
    ]
  },

  // ─── AI 架構互動地圖：幕後燃料 ───
  fuelItems: [
    {
      name: 'OpenCode GO',
      type: '付費模型燃料',
      description: '給 OpenCode、Claude + CC Switch 與可能的 Agent 使用',
      children: ['OpenCode', 'Claude + CC Switch']
    },
    {
      name: 'Ollama-cloud-Proxy',
      type: '自架於 M2 Pro',
      description: '管理 15 個 Ollama 免費帳號',
      children: ['Ollama 免費帳號 x15']
    },
    {
      name: 'NewAPI',
      type: '自架於 Mint',
      description: '管理 Nvidia NIM 與 OpenCode Zen 多組 key',
      children: ['Nvidia NIM x4', 'OpenCode Zen x4']
    },
    {
      name: 'Agnes API',
      type: '雲端 API 服務',
      description: '提供語婕與筱蜜的免費獨立 key',
      children: ['語婕免費 key', '筱蜜免費 key']
    },
    {
      name: 'MCP 知識庫 x4',
      type: '自架於 M2 Pro',
      description: '4 個知識庫，供 Agent 查詢活資料',
      children: ['語婕知識庫', '筱蜜知識庫', '技術文件', 'HomeLab']
    }
  ],

  // ─── 書籍管理入口 ───
  books: [
    {
      title: '實作 Swift 設計模式',
      description: '系統化講解 MVC、Factory、Facade、Decorator、Observer、MVP 等 iOS 常見架構與設計模式',
      readUrl: 'https://wilden-chen.gitbook.io/swift-design-patterns',
      manageUrl: null,
      status: '已出版'
    },
    {
      title: 'Swift 殿堂之路',
      description: '從 Xcode 開發環境、基本元素、流程控制到物件導向核心的 Swift 實用教程',
      readUrl: 'https://wilden-chen.gitbook.io/swift-bethel-of-the-road',
      manageUrl: null,
      status: '已出版'
    }
  ],

  // ─── GitHub 專案書籤 ───
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
      }
    }
  ]
};
