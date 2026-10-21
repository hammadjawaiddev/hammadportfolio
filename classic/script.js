
    const $ = s => document.querySelector(s), H = (el, h) => el.innerHTML = h;
    const stack = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Node.js', 'MySQL', 'MongoDB'];
    const mq = ['Full-Stack Developer', 'End-to-End Product Development', 'Available for Work', ...stack].map(t => `<span>${t}</span>`).join('');
    H($('#mq'), mq); H($('#mq2'), mq);
    const skills = [['Frontend', [['HTML', 'Comfortable', 'Semantic, accessible markup as the foundation of every page.'], ['CSS', 'Comfortable', 'Layout systems, responsive breakpoints, and the visual language of a page.'], ['JavaScript', 'Building With', 'DOM interactions, client-side logic, and connecting the UI to real data.'], ['Responsive Design', 'Comfortable', 'Interfaces that hold up cleanly from a phone screen to a desktop monitor.'], ['UI / UX', 'Building With', 'Turning designs and rough ideas into interfaces that feel intentional.']]],
    ['Backend', [['PHP', 'Building With', 'Server-side logic, form handling, and page rendering for dynamic sites.'], ['Node.js', 'Working Knowledge', 'Building lightweight servers and APIs on top of JavaScript.'], ['REST APIs', 'Working Knowledge', 'Designing endpoints that move data cleanly between frontend and server.'], ['Server-side Logic', 'Building With', 'Auth flows, validation, and the logic that sits behind the interface.']]],
    ['Database', [['MySQL', 'Building With', 'Relational schemas, joins, and queries for structured application data.'], ['MongoDB', 'Working Knowledge', 'Document-based storage for flexible, JSON-shaped data.'], ['CRUD', 'Building With', 'Create, read, update, delete — the core of any data-driven app.'], ['Data Modeling', 'Working Knowledge', 'Shaping schemas around how an application actually uses its data.']]],
    ['Tools', [['Git', 'Comfortable', 'Version control for every project, from first commit to deploy.'], ['GitHub', 'Comfortable', 'Hosting repos, tracking issues, and shipping projects in public.'], ['VS Code', 'Comfortable', 'My daily editor for everything from markup to backend scripts.']]]];
    H($('#sk'), skills.map(([g, l], i) => `<h3><b>${g}</b><span>${l.length}</span></h3>` + l.map(s => `<div class="r"><b>${s[0]}</b><i>${s[1]}</i><p>${s[2]}</p></div>`).join('')).join(''));
    const caps = [['Dynamic Websites', 'Sites driven by server-side logic instead of static pages, so content can change without editing code.'], ['Database-Driven Applications', 'Applications backed by MySQL or MongoDB, where data is stored, queried, and kept in sync with the UI.'], ['REST APIs', 'Endpoints built with PHP or Node.js that let a frontend, or another service, talk to your data.'], ['Authentication Systems', 'Login, sessions, and access control so the right people can reach the right parts of an app.'], ['CRUD Applications', 'Create, read, update, and delete flows — the working core behind most real-world apps.'], ['Admin Dashboards', 'Internal panels for managing content, orders, or users without touching the database directly.'], ['Responsive Frontends', 'Interfaces that hold together across phones, tablets, and desktops without compromise.'], ['Full-Stack Web Applications', 'Complete products where the frontend, backend, and database are built to work as one system.']];
    H($('#cap'), caps.map((c, i) => `<div><em>${String(i + 1).padStart(3, '0')}</em><b>${c[0]}</b><p>${c[1]}</p></div>`).join(''));
    const steps = [['Idea', 'Define what the app needs to do and who it\'s for.'], ['Frontend', 'Build the interface — structure, styling, interaction.'], ['Backend / API', 'Write the server logic and the endpoints that connect to it.'], ['Database', 'Model the data and wire up storage and queries.'], ['Test', 'Check the flows, edge cases, and how it behaves on real devices.'], ['Deploy', 'Ship it, and keep an eye on it once it\'s live.']];
    H($('#pc'), steps.map((s, i) => `<li><em>0${i + 1}</em><h4>${s[0]}</h4><p>${s[1]}</p></li>`).join(''));
    const P = [
      { n: 'PhysioSync', r: 'Frontend', k: 'Physiotherapy clinic', s: [['images/screenshots/image-1.png', 'Anatomy hero — “Cervical Spine”'], ['images/screenshots/image-2.png', 'Exercises grid — 01 · Neck filter']], f: [['Role', 'Frontend'], ['Type', 'Landing page'], ['Focus', 'Trust & conversion'], ['Status', 'Live']], pr: 'A physiotherapy clinic needed a professional web presence that patients could trust at a glance — but the existing site was cluttered, hard to read on phones, and gave visitors no clear next step.', ap: 'Built from scratch as a clean, mobile-first landing page. Semantics came first: a logical document structure, descriptive headings, and accessible controls. Visual hierarchy and a soft clinic palette carried the trust signals, while a lightweight, dependency-free <strong>SEO + performance pass</strong> got the page ranking and loading fast.', re: 'A calm, conversion-oriented site that reads clearly on any device and loads quickly. The clinic now has a credible online anchor with a single, obvious call to action for booking.', t: ['HTML', 'CSS', 'JavaScript', 'SEO'], u: 'https://physiosync-pk.vercel.app/' },
      { n: 'Cosmos', r: 'Frontend', k: 'Immersive space experience', s: [['images/screenshots/image-3.png', 'Immersion hero — “Beyond Time. Beyond Gravity.”'], ['images/screenshots/image-4.png', 'Cosmology cards — Big Bang · Dark Matter']], f: [['Role', 'Frontend'], ['Type', 'Immersive single page'], ['Focus', 'Motion & storytelling'], ['Status', 'Live']], pr: 'Go beyond the standard landing page. The brief was spatial and cinematic: a space-themed page that felt like a journey rather than a wall of text, with depth and motion carrying the story.', ap: 'Built the visuals with pure <strong>CSS and the Canvas API</strong> — an animated star field, a soft planet, and layered section transitions driven by parallax scroll. Everything is responsive and respects prefers-reduced-motion, so the experience degrades gracefully.', re: 'A fluid, memorable scroll-through that keeps a visitor\'s attention from the first frame to the final call to action, without a single heavyweight library in the critical path.', t: ['HTML', 'CSS', 'JavaScript', 'Canvas'], u: 'https://cosmos-pk.netlify.app/' },
      { n: 'CTRL ZONE', r: 'Full-Stack', k: 'Gaming peripherals store', s: [['images/screenshots/image-5.png', 'Storefront hero — “Take CTRL Zone”'], ['images/screenshots/image-6.png', 'Product catalog — Keyboards (14 products)']], f: [['Role', 'Full-Stack'], ['Type', 'E-commerce platform'], ['Focus', 'Commerce & admin'], ['Status', 'Live']], pr: 'Build a real, database-driven e-commerce experience for gaming peripherals — not a demo. The brief needed actual cart, checkout, users, and the ability to manage products and orders from the back office.', ap: 'A bold <strong>neo-brutalist design system</strong> wrapped around a genuine backend. <strong>PHP + MySQL</strong> power authentication, sessions, CRUD for products and orders, and cart/checkout flows, all driven by a protected <strong>admin dashboard</strong>. Input validation and parameterized queries keep user data safe.', re: 'A complete, working storefront: customers can browse, register, fill a cart, and check out, while the owner manages catalog and orders from one place — a real product, end to end.', t: ['PHP', 'MySQL', 'Vanilla JS', 'CSS'], u: 'http://ctrlzone.infinityfreeapp.com/', g: 'https://github.com/hammadjawaiddev' },
      { n: 'PathSeeker', r: 'Full-Stack', k: 'AI-assisted career discovery', s: [['images/screenshots/image-7.png', 'Onboarding hero — “Your career, stamped and routed.”'], ['images/screenshots/image-8.png', 'Dashboard — Welcome back · Game Developer']], f: [['Role', 'Full-Stack'], ['Type', 'Career-discovery app'], ['Focus', 'Guided personalization'], ['Status', 'Live']], pr: 'People know they want a better career but don\'t know which direction fits them — or what steps to take to get there. The goal: a guided, personalized self-exploration tool rather than a static list of “top careers.”', ap: 'A <strong>React</strong> frontend driving a guided, step-by-step quiz-style experience, talking to a <strong>Node.js</strong> API that persists profiles and results in <strong>MongoDB</strong>. The UI is scaffolded as a “passport” — a journey with milestones. Deployed to <strong>Vercel</strong> with clean separation between client and API layers.', re: 'An interactive career-discovery app that turns a broad question into a tailored path — a first hands-on lesson in wiring a modern React frontend to a Node/NoSQL backend as one system.', t: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Vercel'], u: 'https://careerpassporttw.vercel.app/' }];
    const fr = (p, j) => `<figure><div class="fr"><div class="bar"><i></i><i></i><i></i><span>${new URL(p.u).host}</span></div><div class="vp">${p.n}<img src="${p.s[j][0]}" alt="${p.n} — ${p.s[j][1]}" loading="lazy" onerror="this.remove()"></div></div><figcaption class="cp">${p.s[j][1]}</figcaption></figure>`;
    H($('#pj'), P.map((p, i) => `<article class="pr"><div class="ph"><h3>${p.n}</h3><div class="meta"><b>0${i + 1}</b><span>${p.r}</span><span>${p.k}</span></div></div>${fr(p, 0)}
<div class="pd"><div class="side"><div class="facts">${p.f.map(f => `<div><small>${f[0]}</small>${f[1]}</div>`).join('')}</div>
<div class="tags">${p.t.map(t => `<span>${t}</span>`).join('')}</div>
<div class="btns"><a class="btn" href="${p.u}" target="_blank" rel="noopener">Live site ↗</a>${p.g ? `<a class="btn line" href="${p.g}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}</div></div>
<div class="txt"><h5>The problem</h5><p>${p.pr}</p><h5>The approach</h5><p>${p.ap}</p><h5>The result</h5><p>${p.re}</p></div></div></article>`).join(''));
    const pim = [...document.querySelectorAll('.fr img')];
    const par = () => { const vh = innerHeight; pim.forEach(i => { const r = i.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; i.style.setProperty('--py', (((r.top + r.height / 2 - vh / 2) / vh) * -5).toFixed(2) + '%') }) }; addEventListener('scroll', par, { passive: true }); addEventListener('resize', par);
    /* headings: split into blur-in words, two-tone */
    document.querySelectorAll('h2.rv').forEach(h => { const w = h.textContent.trim().split(/\s+/), half = Math.ceil(w.length / 2); h.setAttribute('aria-label', h.textContent.trim()); H(h, w.map((x, i) => `<span class="w${i >= half ? ' mut' : ''}" style="--i:${i}" aria-hidden="true">${x}</span>`).join('')) });
    const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; e.target.classList.add('on'); io.unobserve(e.target) }), { threshold: .35 });
    document.querySelectorAll('h2.rv').forEach(h => io.observe(h));
    /* counters */
    const co = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target, n = +el.dataset.n, s = el.dataset.s || ''; let t0; const f = t => { t0 ??= t; const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))) + s; p < 1 && requestAnimationFrame(f) }; requestAnimationFrame(f); co.unobserve(el) }), { threshold: .6 });
    document.querySelectorAll('[data-n]').forEach(e => co.observe(e));
    /* menu */
    const ov = $('#ov'), mb = $('#mb'); H($('#ovl'), [['Home', 'hero'], ['About', 'about'], ['Stack', 'skills'], ['Experience', 'experience'], ['Projects', 'projects'], ['Milestones', 'achievements'], ['Capabilities', 'capabilities'], ['Contact', 'contact']].map(l => `<li><a href="#${l[1]}">${l[0]}</a></li>`).join(''));
    const tog = o => { ov.classList.toggle('open', o); ov.setAttribute('aria-hidden', !o); mb.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; lenis && (o ? lenis.stop() : lenis.start()) };
    mb.onclick = () => tog(true); $('#mx').onclick = () => tog(false); ov.querySelectorAll('a').forEach(a => a.addEventListener('click', () => tog(false)));
    addEventListener('keydown', e => e.key === 'Escape' && tog(false));
    /* header colour over hero + intro */
    const hd = $('#hd'), hero = $('#hero'), dk = [...document.querySelectorAll('.dark')]; const hdr = () => { const y = 34, at = e => { const r = e.getBoundingClientRect(); return r.top <= y && r.bottom >= y }, h = at(hero); hd.classList.toggle('lt', h || dk.some(at)); hd.classList.toggle('sc', !h && scrollY > 10) }; addEventListener('scroll', hdr, { passive: true }); hdr();
    par();
    const rm = matchMedia('(prefers-reduced-motion:reduce)').matches; let lenis;
    if (window.Lenis && !rm) { lenis = new Lenis({ lerp: .1 }); const raf = t => { lenis.raf(t); requestAnimationFrame(raf) }; requestAnimationFrame(raf) }
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t && lenis) { e.preventDefault(); lenis.scrollTo(t) } }));
    const intro = $('#intro'); let done = 0;
    const begin = () => { if (done) return; done = 1; intro.classList.add('out'); document.body.style.overflow = ''; lenis && lenis.start(); setTimeout(() => hero.classList.add('go'), 380); setTimeout(() => intro.remove(), 1150); try { sessionStorage.i = 1 } catch (e) { } };
    if (document.documentElement.classList.contains('seen') || rm) { intro.remove(); requestAnimationFrame(() => setTimeout(() => hero.classList.add('go'), 80)) }
    else { $('#lg').innerHTML = [...'Hammad.dev'].map((c, i) => `<b style="--i:${i}">${c}</b>`).join(''); document.body.style.overflow = 'hidden'; lenis && lenis.stop(); setTimeout(begin, 2000); intro.onclick = begin; addEventListener('keydown', e => e.key !== 'Tab' && begin(), { once: true }) }

    /* hero: subtle mouse parallax on code card */
    if (matchMedia('(hover:hover) and (pointer:fine)').matches && !rm) { const cc = $('.hc'); hero.addEventListener('mousemove', e => { const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5; cc && (cc.style.transform = `translate(${(x * -14).toFixed(1)}px,${(y * -9).toFixed(1)}px)`) }, { passive: true }) }
    /* cursor: liquid ring + comet trail + hover labels + magnetic buttons + click burst */
    if (matchMedia('(hover:hover) and (pointer:fine)').matches && !rm) {
      const mk = (t, id) => { const e = document.createElement(t); e.id = id; return e };
      const d = mk('div', 'cd'), r = mk('div', 'cr'), l = mk('div', 'cl'), cv = mk('canvas', 'ct');
      document.body.append(cv, r, l, d);
      const ctx = cv.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2); let W, Hh;
      const rs = () => { W = innerWidth; Hh = innerHeight; cv.width = W * dpr; cv.height = Hh * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0) }; rs(); addEventListener('resize', rs);
      const ORG = '#E8431A';
      let x = 0, y = 0, rx = 0, ry = 0, on = 0, moved = 0, tc = ORG, inv = 0, hov = 0, text = '', down = 0; const pts = [];
      const labelOf = t => {
        const a = t.closest('a,button'); if (!a) return '';
        if (a.id === 'mb') return 'Menu'; if (a.id === 'mx') return 'Close';
        if (a.hasAttribute('download')) return 'Save ↓';
        if (a.protocol === 'mailto:') return 'Email ✉';
        if (a.target === '_blank') return 'Open ↗';
        return ''
      };
      const apply = () => { d.className = r.className = (inv ? 'inv' : '') + (hov ? ' hov' : '') + (down ? ' dn' : ''); l.className = (inv ? 'inv ' : '') + (text ? 'show' : ''); if (text) l.textContent = text };
      addEventListener('mousemove', e => {
        x = e.clientX; y = e.clientY; moved = 1;
        if (!on) { on = 1; rx = x; ry = y; document.documentElement.classList.add('cur'); d.style.opacity = r.style.opacity = 1 }
        const t = e.target; if (!t.closest) return;
        inv = t.closest('.dark,#hero,#ov,#intro,.fr,.cbox') ? 1 : 0; hov = t.closest('a,button') ? 1 : 0; text = labelOf(t);
        tc = t.closest('#hero,.cbox') ? '#fff' : ORG; apply()
      }, { passive: true });
      addEventListener('mousedown', () => { down = 1; apply() }); addEventListener('mouseup', () => { down = 0; apply() });
      document.addEventListener('mouseleave', () => { d.style.opacity = r.style.opacity = 0; text = ''; apply() });
      document.addEventListener('mouseenter', () => { if (on) d.style.opacity = r.style.opacity = 1 });
      /* click burst */
      addEventListener('click', e => {
        const c = e.target.closest && e.target.closest('#hero,.cbox') ? '#fff' : ORG, N = 10;
        for (let i = 0; i < N; i++) {
          const p = document.createElement('i'); p.className = 'bp'; p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${c}`; document.body.appendChild(p);
          const a = Math.PI * 2 * i / N + Math.random() * .5, dist = 34 + Math.random() * 36;
          p.animate([{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * dist}px),calc(-50% + ${Math.sin(a) * dist}px)) scale(0)`, opacity: 0 }], { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => p.remove()
        }
        const rp = document.createElement('i'); rp.className = 'rp'; rp.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;color:${c}`; document.body.appendChild(rp);
        rp.animate([{ transform: 'translate(-50%,-50%) scale(.4)', opacity: .9 }, { transform: 'translate(-50%,-50%) scale(4.5)', opacity: 0 }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => rp.remove()
      });
      /* magnetic buttons */
      document.querySelectorAll('.hb,.btn,.menu-btn,.logo').forEach(el => {
        el.addEventListener('mousemove', e => { const b = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - b.left - b.width / 2) * .28).toFixed(1)}px,${((e.clientY - b.top - b.height / 2) * .38).toFixed(1)}px)` });
        el.addEventListener('mouseleave', () => { el.style.transform = '' })
      });
      const tick = () => {
        const dx = x - rx, dy = y - ry; rx += dx * .18; ry += dy * .18;
        const sp = hov ? 0 : Math.min(Math.hypot(dx, dy) / 70, 1), ang = Math.atan2(dy, dx) * 180 / Math.PI;
        d.style.transform = `translate(${x}px,${y}px)`;
        r.style.transform = `translate(${rx}px,${ry}px) rotate(${ang.toFixed(1)}deg) scale(${(1 + sp * .6).toFixed(3)},${(1 - sp * .3).toFixed(3)})`;
        l.style.transform = `translate(${rx + 20}px,${ry + 24}px)`;
        if (moved) { pts.push({ x, y }); moved = 0; if (pts.length > 26) pts.shift() } else if (pts.length) pts.shift();
        ctx.clearRect(0, 0, W, Hh);
        const n = pts.length;
        if (n > 1) { ctx.lineCap = 'round'; ctx.strokeStyle = tc; for (let i = 1; i < n; i++) { const k = i / n; ctx.globalAlpha = k * .55; ctx.lineWidth = k * 7; ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke() } ctx.globalAlpha = 1 }
        requestAnimationFrame(tick)
      }; tick()
    }