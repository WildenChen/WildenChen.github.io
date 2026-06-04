/**
 * reader.js — GitBook-style reader experience for Wilden Hub
 * Features: sidebar highlight, hamburger menu, reading progress bar, prev/next navigation
 */

(function () {
  "use strict";

  /* =========================================================
     Chapter order maps — used for prev / next navigation
     and sidebar active-link highlighting
     ========================================================= */

  const SWIFT_ROAD_CHAPTERS = [
    { path: "/swift-road/swift.html",                     title: "關於 Swift 程式語言開發" },
    { path: "/swift-road/chapter1/README.html",           title: "第一章 Swift 語言介紹與開發環境" },
    { path: "/swift-road/chapter1/chapter1-1.html",       title: "程式開發工具 Xcode" },
    { path: "/swift-road/chapter1/chapter1-2.html",       title: "第一個 Hello World!" },
    { path: "/swift-road/chapter1/chapter1-3.html",       title: "本章小節" },
    { path: "/swift-road/chapter2/README.html",           title: "第二章 Swift 語言基本元素" },
    { path: "/swift-road/chapter2/chpater2-1.html",       title: "資料的本質與重要性質" },
    { path: "/swift-road/chapter2/chapter2-2.html",       title: "變數的宣告和可選值" },
    { path: "/swift-road/chapter2/chapter2-3.html",       title: "常數與變數" },
    { path: "/swift-road/chapter2/chapter2-4.html",       title: "基本資料型別" },
    { path: "/swift-road/chapter2/chapter2-5.html",       title: "運算子、運算式及應用" },
    { path: "/swift-road/chapter2/chapter2-6.html",       title: "Swift 的保留字" },
    { path: "/swift-road/chapter2/chapter2-7.html",       title: "變數的命名" },
    { path: "/swift-road/chapter2/chapter2-8.html",       title: "本章小節" },
    { path: "/swift-road/chapter3/README.html",           title: "第三章 Swift 流程控制" },
    { path: "/swift-road/chapter3/chapter3-1.html",       title: "什麼是過程導向" },
    { path: "/swift-road/chapter3/chapter3-2.html",       title: "true 與 false：條件運算式的結果" },
    { path: "/swift-road/chapter3/chapter3-3.html",       title: "if-else" },
    { path: "/swift-road/chapter3/chapter3-4.html",       title: "陣列與迴圈" },
    { path: "/swift-road/chapter3/chapter3-5.html",       title: "本章小節" },
    { path: "/swift-road/chapter4/README.html",           title: "第四章 Swift 函數與進階使用技巧" },
    { path: "/swift-road/chapter4/chapter4-1.html",       title: "定義函數的四種方法" },
    { path: "/swift-road/chapter4/chapter4-2.html",       title: "參數" },
    { path: "/swift-road/chapter4/chapter4-3.html",       title: "函數的本質" },
    { path: "/swift-road/chapter4/chapter4-4.html",       title: "函數進階使用技巧" },
    { path: "/swift-road/chapter4/ben-zhang-xiao-jie-dai-bu.html", title: "本章小節" },
    { path: "/swift-road/chapter5/README.html",           title: "第五章 類別與物件 - 從定義到原理" },
    { path: "/swift-road/chapter5/chapter5-1.html",       title: "一個簡單的 Class" },
    { path: "/swift-road/chapter5/chapter5-2.html",       title: "類別與物件" },
    { path: "/swift-road/chapter5/chapter5-3.html",       title: "Class 的成員" },
    { path: "/swift-road/chapter5/chapter5-4.html",       title: "Class 和 Object 的建立與使用" },
    { path: "/swift-road/chapter5/chapter5-5.html",       title: "Class 與 Struct 格式規範" },
    { path: "/swift-road/chapter5/chapter5-6.html",       title: "實體屬性和實體方法" },
    { path: "/swift-road/chapter5/chapter5-6-2.html",     title: "下標（進階）" },
    { path: "/swift-road/chapter5/chapter5-7.html",       title: "靜態屬性和靜態方法" },
    { path: "/swift-road/chapter5/chapter5-8.html",       title: "構造函數" },
    { path: "/swift-road/chapter5/chapter5-9.html",       title: "實體引用和值複製" },
    { path: "/swift-road/chapter5/chapter5-10.html",      title: "self 關鍵字" },
    { path: "/swift-road/chapter5/chapter5-11.html",      title: "方法重載" },
    { path: "/swift-road/chapter5/chapter5-12.html",      title: "含有多個類別的 Swift 類別文件的標準實例" },
    { path: "/swift-road/chapter5/chapter5-13.html",      title: "本章小結" },
    { path: "/swift-road/chapter6/README.html",           title: "第六章 封裝類別的成員、類別、結構" },
    { path: "/swift-road/chapter6/chapter6-1.html",       title: "什麼是封裝" },
    { path: "/swift-road/chapter6/chapter6-2.html",       title: "為什麼需要封裝" },
    { path: "/swift-road/chapter6/chapter6-3.html",       title: "套件與命名空間" },
    { path: "/swift-road/chapter6/chapter6-4.html",       title: "類別成員的存取控制" },
    { path: "/swift-road/chapter6/chapter6-5.html",       title: "get 與 set" },
    { path: "/swift-road/chapter6/chapter6-6.html",       title: "類別的存取控制" },
    { path: "/swift-road/chapter6/chapter6-7.html",       title: "本章小結" },
    { path: "/swift-road/chapter7/README.html",           title: "第七章 複合與繼承" },
    { path: "/swift-road/chapter7/chapter7-1.html",       title: "如何實現複合" },
    { path: "/swift-road/chapter7/chapter7-2.html",       title: "如何實現繼承" },
    { path: "/swift-road/chapter7/chapter7-3.html",       title: "本章小節" },
    { path: "/swift-road/chapter8/README.html",           title: "第八章 多型與轉型" },
    { path: "/swift-road/chapter8/chapter8-1.html",       title: "類型檢查和轉換" },
    { path: "/swift-road/chapter8/chapter8-2.html",       title: "上下轉換" },
    { path: "/swift-road/chapter8/chapter8-3.html",       title: "本章小結" },
    { path: "/swift-road/chapter9/README.html",           title: "第九章 協定與委派" },
    { path: "/swift-road/chapter9/chapter9-1.html",       title: "什麼是協定" },
    { path: "/swift-road/chapter9/chapter9-2.html",       title: "什麼是委派" },
    { path: "/swift-road/chapter9/ben-zhang-xiao-jie.html", title: "本章小節" },
    { path: "/swift-road/chapter11/README.html",          title: "第十一章 附錄" },
    { path: "/swift-road/chapter11/chapter11-1.html",     title: "Swift 命名規則" },
    { path: "/swift-road/chapter11/chapter11-4.html",     title: "Swift 內建函數" },
    { path: "/swift-road/chapter11/chapter11-5.html",     title: "Swift CocoaPods" },
    { path: "/swift-road/chapter11/swift-xin-ren-kao-ti.html", title: "Swift 新人考題" },
    { path: "/swift-road/chapter11/wei-zi-chuan-ying-yong.html", title: "字串應用" },
    { path: "/swift-road/chapter11/wei-zhen-lie-ying-yong.html", title: "陣列應用" },
    { path: "/swift-road/chapter11/wei-zheng-ze-yun-suan-shi.html", title: "正則運算式" },
  ];

  const DESIGN_PATTERNS_CHAPTERS = [
    { path: "/swift-design-patterns/index.html",               title: "關於本書 & 簡介" },
    { path: "/swift-design-patterns/gettingstarted.html",      title: "入門 - 開始" },
    { path: "/swift-design-patterns/mvc.html",                 title: "設計模式之王 - MVC" },
    { path: "/swift-design-patterns/use-mvc.html",             title: "如何使用 MVC 模式" },
    { path: "/swift-design-patterns/simplefactory.html",       title: "簡易工廠 - Simple Factory" },
    { path: "/swift-design-patterns/use-simplefactory.html",   title: "如何使用簡易工廠模式" },
    { path: "/swift-design-patterns/facade.html",              title: "外觀模式 - Facade" },
    { path: "/swift-design-patterns/use-facade.html",          title: "如何使用外觀模式" },
    { path: "/swift-design-patterns/decorator.html",           title: "裝飾者模式 - Decorator" },
    { path: "/swift-design-patterns/decorator-extension.html", title: "裝飾者 - 擴展" },
    { path: "/swift-design-patterns/use-decorator-extension.html", title: "如何使用擴展" },
    { path: "/swift-design-patterns/decorator-delegation.html", title: "裝飾者 - 委派" },
    { path: "/swift-design-patterns/use-decorator-delegation.html", title: "如何使用委派模式" },
    { path: "/swift-design-patterns/singleton.html",           title: "單例模式 - Singleton" },
    { path: "/swift-design-patterns/use-singleton.html",       title: "如何使用單例模式" },
    { path: "/swift-design-patterns/adapter.html",             title: "適配器模式 - Adapter" },
    { path: "/swift-design-patterns/use-adapter.html",         title: "如何使用適配器模式" },
    { path: "/swift-design-patterns/observer.html",            title: "觀察者模式 - Observer" },
    { path: "/swift-design-patterns/notification.html",        title: "通知 - Notification" },
    { path: "/swift-design-patterns/kvo.html",                 title: "鍵值觀察 - KVO" },
    { path: "/swift-design-patterns/eventflow.html",           title: "事件流 - Event Flow" },
    { path: "/swift-design-patterns/mvp.html",                 title: "設計模式之神話 - MVP" },
    { path: "/swift-design-patterns/use-mvp.html",             title: "如何使用 MVP 模式" },
    { path: "/swift-design-patterns/finaltouches.html",        title: "最後的潤色" },
    { path: "/swift-design-patterns/final.html",               title: "本章小結" },
  ];

  /* =========================================================
     Utilities
     ========================================================= */

  /** Normalise a URL pathname for comparison (strip trailing slash, lowercase) */
  function normPath(p) {
    return p.replace(/\/+$/, "").toLowerCase();
  }

  /** Get current pathname relative to origin */
  function currentPath() {
    return normPath(window.location.pathname);
  }

  /** Determine which chapter list applies to the current page */
  function detectBook() {
    const p = currentPath();
    if (p.includes("/swift-design-patterns")) return DESIGN_PATTERNS_CHAPTERS;
    if (p.includes("/swift-road"))            return SWIFT_ROAD_CHAPTERS;
    return null;
  }

  /** Find index of current page in a chapter list */
  function currentIndex(chapters) {
    const p = currentPath();
    return chapters.findIndex(ch => normPath(ch.path) === p);
  }

  /* =========================================================
     1. Reading Progress Bar
     ========================================================= */
  function initProgressBar() {
    const bar = document.getElementById("reader-progress");
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      bar.style.width = pct + "%";
      bar.setAttribute("aria-valuenow", Math.round(pct));
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* =========================================================
     2. Sidebar Active-Link Highlighting
     ========================================================= */
  function initSidebarHighlight() {
    const toc = document.querySelector(".article-toc");
    if (!toc) return;

    const p = currentPath();
    const links = toc.querySelectorAll("a[href]");

    links.forEach(link => {
      const href = normPath(new URL(link.href, location.href).pathname);
      if (href === p) {
        link.classList.add("toc-active");
        link.setAttribute("aria-current", "page");
        // Scroll the sidebar so active link is visible
        requestAnimationFrame(() => {
          link.scrollIntoView({ block: "nearest", behavior: "smooth" });
        });
      }
    });
  }

  /* =========================================================
     3. Hamburger Sidebar Toggle (mobile)
     ========================================================= */
  function initHamburger() {
    const btn    = document.getElementById("sidebar-toggle");
    const toc    = document.querySelector(".article-toc");
    const overlay = document.getElementById("sidebar-overlay");
    if (!btn || !toc) return;

    function open() {
      toc.classList.add("sidebar-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "關閉導覽選單");
      if (overlay) overlay.classList.add("overlay-visible");
      document.body.classList.add("sidebar-is-open");
    }

    function close() {
      toc.classList.remove("sidebar-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "開啟導覽選單");
      if (overlay) overlay.classList.remove("overlay-visible");
      document.body.classList.remove("sidebar-is-open");
    }

    btn.addEventListener("click", () => {
      toc.classList.contains("sidebar-open") ? close() : open();
    });

    if (overlay) {
      overlay.addEventListener("click", close);
    }

    // Close on Escape
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
    });

    // Close when a TOC link is tapped on mobile
    toc.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (window.innerWidth < 940) close();
      });
    });
  }

  /* =========================================================
     4. Prev / Next Navigation
     ========================================================= */
  function initPrevNext() {
    const prevBtn = document.getElementById("btn-prev");
    const nextBtn = document.getElementById("btn-next");
    if (!prevBtn && !nextBtn) return;

    const chapters = detectBook();
    if (!chapters) return;

    const idx = currentIndex(chapters);
    if (idx === -1) return;

    const prev = idx > 0 ? chapters[idx - 1] : null;
    const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

    if (prevBtn) {
      if (prev) {
        prevBtn.href = prev.path;
        prevBtn.querySelector(".nav-label").textContent = prev.title;
        prevBtn.removeAttribute("aria-disabled");
        prevBtn.removeAttribute("tabindex");
      } else {
        prevBtn.setAttribute("aria-disabled", "true");
        prevBtn.setAttribute("tabindex", "-1");
      }
    }

    if (nextBtn) {
      if (next) {
        nextBtn.href = next.path;
        nextBtn.querySelector(".nav-label").textContent = next.title;
        nextBtn.removeAttribute("aria-disabled");
        nextBtn.removeAttribute("tabindex");
      } else {
        nextBtn.setAttribute("aria-disabled", "true");
        nextBtn.setAttribute("tabindex", "-1");
      }
    }
  }

  /* =========================================================
     5. Keyboard arrow-key navigation (optional UX bonus)
     ========================================================= */
  function initKeyboardNav() {
    const chapters = detectBook();
    if (!chapters) return;
    const idx = currentIndex(chapters);
    if (idx === -1) return;

    document.addEventListener("keydown", e => {
      // Only fire when not focused inside an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
      if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;

      if (e.key === "ArrowLeft" && idx > 0) {
        window.location.href = chapters[idx - 1].path;
      } else if (e.key === "ArrowRight" && idx < chapters.length - 1) {
        window.location.href = chapters[idx + 1].path;
      }
    });
  }

  /* =========================================================
     Init
     ========================================================= */
  function init() {
    initProgressBar();
    initSidebarHighlight();
    initHamburger();
    initPrevNext();
    initKeyboardNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
