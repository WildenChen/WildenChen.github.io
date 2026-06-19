/* =============================================================
   Wilden Hub · portal.js
   微互動：捲動進場、漢堡選單、視差、像素粒子、active nav
   ============================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------- Helpers -------------------------- */
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
      '.map-node, ' +
      '.directory-card, ' +
      '.service-card, ' +
      '.focus-card, ' +
      '.chapter-card, ' +
      '.book-wrapper, ' +
      '.quest-list li, ' +
      '.content-panel, ' +
      '.legacy-list a, ' +
      '.shelf-header, ' +
      '.timeline-log li'
    );
    if (!candidates.length) return;

    // Add a parent stagger context
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
          // Stagger siblings
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

    // Inject toggle button
    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="nav-toggle-bar"></span>' +
                    '<span class="nav-toggle-bar"></span>' +
                    '<span class="nav-toggle-bar"></span>';

    // Insert before nav
    navbar.appendChild(btn);

    // Build overlay
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
      // Normalize relative
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

  /* ----------------------------- 4. Hero parallax ----------------- */
  function initHeroParallax() {
    var hero = $('.pixel-hero');
    if (!hero || reduceMotion) return;
    var layers = $$('[data-parallax]', hero);
    if (!layers.length) return;

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var rect = hero.getBoundingClientRect();
        var offset = Math.max(-200, Math.min(200, rect.top * 0.15));
        layers.forEach(function (el) {
          var speed = parseFloat(el.dataset.parallax) || 0.2;
          el.style.transform = 'translate3d(0,' + (offset * speed) + 'px,0)';
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ----------------------------- 5. Pixel particles --------------- */
  function initParticles() {
    if (reduceMotion) return;
    var canvas = document.createElement('canvas');
    canvas.className = 'pixel-particles';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0;
    var particles = [];
    var COLORS = ['#2dd4bf', '#38bdf8', '#f8d66d', '#a78bfa', '#4ade80'];
    var MAX = 40;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    }

    function spawn() {
      if (particles.length >= MAX) return;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() < 0.5 ? 2 : 4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.05 - Math.random() * 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: 800 + Math.random() * 800
      });
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      if (Math.random() < 0.4) spawn();
      particles = particles.filter(function (p) { return p.life < p.maxLife; });
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 16;
        var alpha = 0.15 + 0.25 * (1 - p.life / p.maxLife);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }

    var onResize = (function () {
      var t;
      return function () {
        clearTimeout(t);
        t = setTimeout(resize, 150);
      };
    })();
    window.addEventListener('resize', onResize);
    resize();
    step();
  }

  /* ----------------------------- 6. Map node icon spin ----------- */
  function initMapNodeIcons() {
    if (reduceMotion) return;
    $$('.map-node').forEach(function (node) {
      node.addEventListener('mouseenter', function () {
        var icon = node.querySelector('.map-node-icon');
        if (icon) icon.classList.add('is-active');
      });
      node.addEventListener('mouseleave', function () {
        var icon = node.querySelector('.map-node-icon');
        if (icon) icon.classList.remove('is-active');
      });
    });
  }

  /* ----------------------------- 7. Smooth scroll ---------------- */
  function initSmoothScroll() {
    if (reduceMotion) return;
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  /* ----------------------------- 8. Card 3D tilt (subtle) --------- */
  function initCardTilt() {
    if (reduceMotion) return;
    // Only apply on pointer-fine devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    $$('.map-node, .directory-card, .service-card, .focus-card').forEach(function (card) {
      var rectCache = null;
      function onEnter() { rectCache = card.getBoundingClientRect(); }
      function onMove(e) {
        if (!rectCache) rectCache = card.getBoundingClientRect();
        var x = (e.clientX - rectCache.left) / rectCache.width - 0.5;
        var y = (e.clientY - rectCache.top) / rectCache.height - 0.5;
        card.style.setProperty('--tilt-x', (y * -4) + 'deg');
        card.style.setProperty('--tilt-y', (x * 4) + 'deg');
      }
      function onLeave() {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        rectCache = null;
      }
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  /* ----------------------------- 9. Status pulse ------------------ */
  function initStatusPulse() {
    $$('.badge-live, .pulse, .signal-dot').forEach(function (el) {
      if (el.classList.contains('signal-pulse')) return;
      el.classList.add('signal-pulse');
    });
  }

  /* ----------------------------- Boot ----------------------------- */
  onReady(function () {
    initReveal();
    initMobileMenu();
    initActiveNav();
    initHeroParallax();
    initMapNodeIcons();
    initSmoothScroll();
    initCardTilt();
    initStatusPulse();
    // Defer particles to not block first paint
    if (!reduceMotion && 'requestIdleCallback' in window) {
      requestIdleCallback(initParticles, { timeout: 1500 });
    } else if (!reduceMotion) {
      setTimeout(initParticles, 300);
    }
  });
})();
