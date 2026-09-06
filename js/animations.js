/* ============================================================
   Scroll & interaction animations — GSAP + ScrollTrigger
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Split hero words into letter spans for wave effect ---------- */
  const waveWords = document.querySelectorAll('[data-wave]');
  waveWords.forEach((word) => {
    const text = word.textContent;
    word.setAttribute('aria-label', text);
    word.innerHTML = '';
    text.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'glyph';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.setAttribute('aria-hidden', 'true');
      word.appendChild(span);
    });
  });

  /* ---------- Auto-fit hero word sizing so long words never overflow ---------- */
  function fitHeroWords() {
    document.querySelectorAll('.hero-word').forEach((word) => {
      word.style.fontSize = '';
      const container = word.parentElement;
      if (!container) return;
      const maxWidth = container.clientWidth;
      let fontSize = parseFloat(getComputedStyle(word).fontSize);
      let guard = 0;
      while (word.scrollWidth > maxWidth && fontSize > 10 && guard < 60) {
        fontSize -= 2;
        word.style.fontSize = fontSize + 'px';
        guard++;
      }
    });
  }

  fitHeroWords();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitHeroWords).catch(() => {});
  }
  window.addEventListener('load', fitHeroWords);
  let heroFitTimer;
  window.addEventListener('resize', () => {
    clearTimeout(heroFitTimer);
    heroFitTimer = setTimeout(fitHeroWords, 150);
  });

  if (!prefersReduced) {
    let mouseX = -9999, mouseY = -9999;
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

    /* Cache glyph list ONCE — re-querying the whole document every frame is expensive */
    const waveGlyphs = Array.from(document.querySelectorAll('[data-wave] .glyph'));

    function waveTick() {
      if (!document.hidden) {
        for (let i = 0; i < waveGlyphs.length; i++) {
          const g = waveGlyphs[i];
          const rect = g.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = mouseX - cx;
          const dy = mouseY - cy;
          const dist = Math.hypot(dx, dy);
          const radius = 160;
          if (dist < radius) {
            const strength = 1 - dist / radius;
            const lift = strength * 18;
            const skew = (dx / radius) * -6 * strength;
            g.style.transform = `translateY(${-lift}px) skewX(${skew}deg)`;
          } else {
            g.style.transform = 'translateY(0px) skewX(0deg)';
          }
        }
      }
      requestAnimationFrame(waveTick);
    }
    requestAnimationFrame(waveTick);
  }

  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  if (prefersReduced) {
    gsap.set('[data-wave] .glyph, .reveal-line, [data-reveal]', { opacity: 1, y: 0, clearProps: 'transform' });
    return;
  }

  /* ---------- Hero load-in sequence ---------- */
  let heroIntroTl = null;
  window.playHeroIntro = function () {
    if (heroIntroTl) heroIntroTl.kill(); // never restart / double-play the intro
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroIntroTl = tl;
    tl.set('.hero-word .glyph', { yPercent: 120, opacity: 0 })
      .set('.hero-eyebrow, .hero-tags, .hero-signature, .hero-badge, .hero-based, .scroll-cue', { autoAlpha: 0, y: 16 })
      .to('.hero-eyebrow', { autoAlpha: 1, y: 0, duration: 0.6 })
      .to('.hero-word--main .glyph', { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.025 }, '-=0.2')
      .to('.hero-word--sub .glyph', { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.02 }, '-=0.6')
      .to('.hero-tags, .hero-signature, .hero-badge, .hero-based, .scroll-cue', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 }, '-=0.4');
  };

  /* ---------- About reveal ---------- */
  gsap.from('.about-eyebrow, .about-headline', {
    autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: '.about', start: 'top 75%' }
  });
  gsap.from('.about-card', {
    autoAlpha: 0, y: 30, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
  });
  gsap.from('.about-copy p, .about-facts .fact', {
    autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.06, ease: 'power2.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 70%' }
  });

  /* ---------- Expertise rows ---------- */
  gsap.utils.toArray('.expertise-row').forEach((el, i) => {
    gsap.from(el, {
      autoAlpha: 0, x: -16, duration: 0.6, ease: 'power2.out', delay: i * 0.04,
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });

  /* ---------- Timeline draw ---------- */
  const timelineFill = document.getElementById('timelineFill');
  if (timelineFill) {
    gsap.to(timelineFill, {
      height: '100%', ease: 'none',
      scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 80%', scrub: 0.6 }
    });
  }
  gsap.from('.timeline-entry', {
    autoAlpha: 0, y: 24, duration: 0.8, ease: 'power2.out',
    scrollTrigger: { trigger: '.timeline-entry', start: 'top 85%' }
  });

  /* ---------- Work marquee (continuous, seamless) ---------- */
  /* Half-width is measured AFTER the webfont loads and re-measured on resize,
     otherwise the loop seam jumps because the track is wider than expected.
     Speed is constant (px/s), so it stays smooth at any width. */
  function runMarquee(el, pxPerSec) {
    if (!el) return;
    if (el._tween) el._tween.kill();
    const w = el.scrollWidth / 2;
    if (!w) return;
    el._tween = gsap.fromTo(el, { x: 0 }, { x: -w, duration: w / pxPerSec, ease: 'none', repeat: -1 });
  }
  const marqueeEls = [
    [document.querySelector('.work-marquee-track'), 110],
    [document.querySelector('.work-tags-track'), 70]
  ];
  marqueeEls.forEach(([el, speed]) => runMarquee(el, speed));
  function refreshMarquees() {
    marqueeEls.forEach(([el, speed]) => runMarquee(el, speed));
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(refreshMarquees).catch(() => {});
  }
  let marqueeResizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(marqueeResizeTimer);
    marqueeResizeTimer = setTimeout(refreshMarquees, 200);
  });

  /* ---------- Project cards ---------- */
  gsap.utils.toArray('.project-card').forEach((el) => {
    const bits = el.querySelectorAll('.project-card-cap, .project-watermark, .project-card-tags, .project-card-badge, .project-card-meta');
    gsap.set(el, { clipPath: 'inset(6% 6% 6% 6%)' });
    gsap.set(bits, { autoAlpha: 0, y: 20 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 82%' } });
    tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out' })
      .to(bits, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, '-=0.5');
  });

  /* ---------- Milestones / capabilities / process / why ---------- */
  ['.milestone', '.capability', '.process-step', '.why-row'].forEach((sel) => {
    gsap.utils.toArray(sel).forEach((el, i) => {
      gsap.from(el, {
        autoAlpha: 0, y: 22, duration: 0.6, ease: 'power2.out', delay: (i % 4) * 0.05,
        scrollTrigger: { trigger: el, start: 'top 92%' }
      });
    });
  });

  /* ---------- Statement lines ---------- */
  gsap.utils.toArray('.statement-text span[data-reveal]').forEach((el) => {
    const inner = document.createElement('span');
    inner.style.display = 'block';
    while (el.firstChild) inner.appendChild(el.firstChild);
    el.appendChild(inner);
    gsap.set(inner, { yPercent: 100 });
    gsap.to(inner, {
      yPercent: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  /* ---------- Big CTA reveal ---------- */
  gsap.utils.toArray('[data-cta-reveal]').forEach((el) => {
    const inner = el.querySelector('.cta-inner');
    if (!inner) return;
    gsap.set(inner, { yPercent: 110 });
    gsap.to(inner, {
      yPercent: 0, duration: 1.1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* ---------- Stats band reveal ---------- */
  gsap.from('.stat', {
    autoAlpha: 0, y: 26, duration: 0.7, stagger: 0.09, ease: 'power2.out',
    scrollTrigger: { trigger: '.stats-band', start: 'top 88%' }
  });

  /* ---------- Contact links ---------- */
  gsap.utils.toArray('.contact-link').forEach((el, i) => {
    gsap.from(el, {
      autoAlpha: 0, y: 18, duration: 0.6, ease: 'power2.out', delay: i * 0.05,
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });

  /* ---------- Section eyebrow/title generic reveal ---------- */
  gsap.utils.toArray('.section-eyebrow').forEach((el) => {
    const title = el.nextElementSibling;
    gsap.from([el, title], {
      autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
})();
