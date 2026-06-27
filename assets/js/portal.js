/* =============================================================
   portal.js — 微互動：捲動進場、漢堡選單、active nav
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ----------------------------- 1. Scroll reveal ----------------- */
  function initReveal() {
    var candidates = $$(
      'main > section, ' +
      '.directory-card, ' +
      '.service-card, ' +
      '.focus-card, ' +
      '.chapter-card, ' +
      '.content-panel, ' +
      '.legacy-list a, ' +
      '.shelf-header, ' +
      '.timeline-log li'
    );
    if (!candidates.length) return;

    candidates.forEach(function (el) {
      el.classList.add('reveal');
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      candidates.forEach(function (el) { el.classList.add('reveal-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var parent = el.parentElement;
          if (parent) {
            var siblings = $$('.reveal', parent);
            var idx = siblings.indexOf(el);
            el.style.transitionDelay = (idx >= 0 ? Math.min(idx, 6) * 60 : 0) + 'ms';
          }
          el.classList.add('reveal-in');
          io.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    candidates.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------- 2. Mobile menu ------------------- */
  function initMobileMenu() {
    var nav = $('.nav-links');
    if (!nav) return;
    var navbar = nav.parentElement;
    if (!navbar) return;

    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="nav-toggle-bar"></span>' +
                    '<span class="nav-toggle-bar"></span>' +
                    '<span class="nav-toggle-bar"></span>';

    navbar.appendChild(btn);

    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    navbar.appendChild(overlay);

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      overlay.classList.toggle('is-visible', open);
      btn.classList.toggle('is-active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    btn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    overlay.addEventListener('click', function () { setOpen(false); });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
  }

  /* ----------------------------- 3. Active nav state -------------- */
  function initActiveNav() {
    var links = $$('.nav-links a[href]');
    if (!links.length) return;

    var path = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '/');
    links.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var resolved;
      try { resolved = new URL(href, window.location.href).pathname; }
      catch (e) { resolved = href; }
      resolved = resolved.replace(/\/index\.html$/, '/').replace(/\/+$/, '/');
      if (resolved === path) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ----------------------------- 4. Smooth scroll ---------------- */
  function initSmoothScroll() {
    if (reduceMotion) return;
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  /* ----------------------------- Boot ----------------------------- */
  onReady(function () {
    initReveal();
    initMobileMenu();
    initActiveNav();
    initSmoothScroll();
  });
})();
