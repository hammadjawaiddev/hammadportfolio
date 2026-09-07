/* ============================================================
   Main — percentage loader, Lenis smooth scroll, nav, scroll progress
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Lenis smooth scroll ---------- */
  let lenis;
  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.3
    });

    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.update();
      updateProgress();
      updateNav();
      updateDotNav();
      updateFloatTop();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: 0, duration: 1.3 });
            closeMobileNav();
          }
        }
      });
    });
  } else {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  /* ---------- Scroll progress + nav compact state ---------- */
  const progressFill = document.getElementById('scrollProgressFill');
  const nav = document.getElementById('siteNav');

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
  }

  function updateNav() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (!nav) return;
    if (scrollTop > 40) nav.classList.add('nav--compact');
    else nav.classList.remove('nav--compact');

    const hero = document.getElementById('hero');
    if (hero) {
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      if (scrollTop + nav.offsetHeight / 2 < heroBottom) {
        nav.classList.add('nav--on-light');
      } else {
        nav.classList.remove('nav--on-light');
      }
    }
  }

  window.addEventListener('scroll', () => { updateProgress(); updateNav(); }, { passive: true });
  updateProgress();
  updateNav();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMobileNav));
  }

  /* ---------- Percentage loader with circular ring ---------- */
  const loader = document.getElementById('loader');
  const loaderPct = document.getElementById('loaderPct');
  const loaderRing = document.getElementById('loaderRing');
  const loaderLabel = document.getElementById('loaderLabel');
  const loaderGreetingWrap = document.getElementById('loaderGreetingWrap');
  const CIRC = 339.29;

  function setLoaderProgress(pct) {
    if (loaderPct) loaderPct.textContent = Math.round(pct) + '%';
    if (loaderRing) loaderRing.style.strokeDashoffset = CIRC - (CIRC * pct) / 100;
  }

  let loadFinished = false;
  function finishLoad() {
    if (loadFinished) return; // only ever run the load sequence once
    loadFinished = true;
    let current = 0;
    const target = 100;
    const step = () => {
      current += (target - current) * 0.18 + 0.6;
      if (current >= 99.5) current = 100;
      setLoaderProgress(current);
      if (current < 100) {
        requestAnimationFrame(step);
      } else {
        /* 1) Loading hits 100% — the ring, % and label clear away first */
        const loaderMain = document.getElementById('loaderMain');
        if (loaderMain) loaderMain.classList.add('is-hiding');

        /* 2) Empty screen beat, THEN the big "hey" arrives */
        setTimeout(() => {
          if (loaderGreetingWrap) loaderGreetingWrap.classList.add('is-visible');
        }, 1300);

        /* 3) Hold the greeting, then the whole loader lifts away */
        setTimeout(() => {
          if (loader) loader.classList.add('is-done');
          if (typeof window.playHeroIntro === 'function') window.playHeroIntro();
          if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }, 3100);
      }
    };
    requestAnimationFrame(step);
  }

  setLoaderProgress(0);
  if (document.readyState === 'complete') {
    finishLoad();
  } else {
    window.addEventListener('load', finishLoad);
    setTimeout(finishLoad, 1400);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 200);
  });

  /* ---------- About photo: show it, fall back gracefully if missing ---------- */
  const aboutPhoto = document.getElementById('aboutPhoto');
  const aboutFallback = document.getElementById('aboutCardFallback');
  if (aboutPhoto) {
    const showAboutPhoto = () => {
      if (aboutPhoto.naturalWidth > 1) {
        aboutPhoto.classList.add('is-loaded');
        if (aboutFallback) aboutFallback.style.display = 'none';
      }
    };
    /* Handle the race: a small local image may have ALREADY fired 'load'
       before this script ran — then no event will ever come. */
    if (aboutPhoto.complete) {
      if (aboutPhoto.naturalWidth > 1) showAboutPhoto();
      else aboutPhoto.style.display = 'none';
    } else {
      aboutPhoto.addEventListener('load', showAboutPhoto);
      aboutPhoto.addEventListener('error', () => {
        aboutPhoto.style.display = 'none';
      });
    }
  }

  /* ---------- Side dot-nav: active section tracking ---------- */
  const dotItems = document.querySelectorAll('.dot-nav-item');
  const dotSections = Array.from(dotItems).map((item) => document.querySelector(item.getAttribute('href')));

  function updateDotNav() {
    if (!dotItems.length) return;
    const scrollPos = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight / 2;
    let activeIndex = 0;
    dotSections.forEach((sec, i) => {
      if (sec && sec.offsetTop <= scrollPos) activeIndex = i;
    });
    dotItems.forEach((item, i) => item.classList.toggle('is-active', i === activeIndex));
  }

  /* ---------- Floating back-to-top visibility ---------- */
  const floatTop = document.getElementById('floatTop');
  function updateFloatTop() {
    if (!floatTop) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    floatTop.classList.toggle('is-visible', scrollTop > window.innerHeight * 0.6);
  }

  window.addEventListener('scroll', () => { updateDotNav(); updateFloatTop(); }, { passive: true });
  updateDotNav();
  updateFloatTop();

  /* ---------- Stats band animated counters ---------- */
  function formatStat(n) { return String(n).padStart(2, '0'); }
  document.querySelectorAll('.stat-count').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (!target) return;
    if (prefersReduced) { el.textContent = formatStat(target); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const dur = 1100;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = formatStat(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* ---------- Interactive hero spotlight ---------- */
  const hero = document.querySelector('.hero');
  if (hero && !prefersReduced) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      hero.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--pointer-x', '50%');
      hero.style.setProperty('--pointer-y', '50%');
    }, { passive: true });
  }

  /* ---------- Pinned horizontal build journey ---------- */
  const journey = document.getElementById('journey');
  const journeyStage = journey ? journey.querySelector('.journey-stage') : null;
  const journeyTrack = journey ? journey.querySelector('.journey-track') : null;
  let journeyTween;
  let journeyTrigger;

  function setupJourneyScroll() {
    if (!journeyTrack || !journeyStage || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (journeyTween) journeyTween.kill();
    if (journeyTrigger) journeyTrigger.kill();
    gsap.set(journeyTrack, { clearProps: 'transform' });

    // Swipeable cards are the best experience on small touch screens.
    if (window.innerWidth <= 700 || prefersReduced) return;
    const distance = () => Math.max(0, journeyTrack.scrollWidth - journeyStage.clientWidth);
    journeyTween = gsap.to(journeyTrack, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: journey,
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight * 0.55}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });
    journeyTrigger = journeyTween.scrollTrigger;
  }
  setupJourneyScroll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setupJourneyScroll).catch(() => {});

  let journeyResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(journeyResizeTimer);
    journeyResizeTimer = setTimeout(() => {
      setupJourneyScroll();
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }, 240);
  });

  /* ---------- Small live theme + type playground ---------- */
  const playgroundShell = document.getElementById('playgroundShell');
  const sizeInput = document.getElementById('playgroundSize');
  const sizeOutput = document.getElementById('playgroundSizeValue');
  const sizeCode = document.getElementById('playgroundSizeCode');
  const colorCode = document.getElementById('playgroundColorCode');
  if (playgroundShell) {
    const swatches = playgroundShell.querySelectorAll('.theme-swatch');
    swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const color = swatch.dataset.themeColor;
        if (!color) return;
        playgroundShell.style.setProperty('--demo-color', color);
        if (colorCode) colorCode.textContent = color;
        swatches.forEach((item) => {
          const selected = item === swatch;
          item.classList.toggle('is-selected', selected);
          item.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
      });
    });

    const updatePlaygroundSize = () => {
      const value = `${sizeInput ? sizeInput.value : 16}px`;
      playgroundShell.style.setProperty('--demo-text-size', value);
      if (sizeOutput) sizeOutput.value = value;
      if (sizeOutput) sizeOutput.textContent = value;
      if (sizeCode) sizeCode.textContent = value;
    };
    if (sizeInput) sizeInput.addEventListener('input', updatePlaygroundSize);
    updatePlaygroundSize();
  }

  /* ---------- Copy-to-clipboard contact action ---------- */
  const copyEmail = document.getElementById('copyEmail');
  const copyEmailAction = document.getElementById('copyEmailAction');
  if (copyEmail && copyEmailAction) {
    copyEmail.addEventListener('click', async () => {
      const email = copyEmail.dataset.email || '';
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
          copied = true;
        } else {
          const helper = document.createElement('textarea');
          helper.value = email;
          helper.setAttribute('readonly', '');
          helper.style.position = 'fixed';
          helper.style.opacity = '0';
          document.body.appendChild(helper);
          helper.select();
          copied = document.execCommand('copy');
          helper.remove();
        }
      } catch (error) { copied = false; }
      copyEmailAction.innerHTML = copied ? 'Copied to clipboard <b>✓</b>' : 'Select email above <b>↗</b>';
      window.setTimeout(() => {
        copyEmailAction.innerHTML = 'Copy email <b>↗</b>';
      }, 2200);
    });
  }
})();
