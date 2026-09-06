/* ============================================================
   Custom cursor — dot + trailing ring, magnetic + label on hover
   Disabled entirely on touch devices (see main.js + CSS media query)
   ============================================================ */
(function () {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const textEl = document.getElementById('cursorText');
  if (!dot || !ring) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;

  let hasMoved = false;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    if (!hasMoved) {
      hasMoved = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.classList.add('is-ready');
      ring.classList.add('is-ready');
    }
  }, { passive: true });

  function tick() {
    // eased follow for the ring
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(tick);
  }
  tick();

  document.addEventListener('mouseleave', () => {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });
  document.addEventListener('mouseenter', () => {
    dot.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });

  // Magnetic + label targets
  const targets = document.querySelectorAll('[data-cursor], a, button');

  targets.forEach((el) => {
    const label = el.getAttribute('data-cursor-text');

    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-active');
      if (label) textEl.textContent = label;
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-active');
      textEl.textContent = '';
      if (!prefersReduced) {
        el.style.transform = '';
      }
    });

    if (el.hasAttribute('data-cursor') && !prefersReduced) {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * 0.18}px, ${relY * 0.28}px)`;
      });
    }
  });

  // Project media gets an "EXPLORE" cursor label
  document.querySelectorAll('.project-media').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('is-active');
      textEl.textContent = 'Explore';
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('is-active');
      textEl.textContent = '';
    });
  });
})();
