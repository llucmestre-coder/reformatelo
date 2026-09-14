/* ============================================================
   main.js — Reformatelo (Alex Vela) · Sants, Barcelona
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Idiomes: el text que munta aquest fitxer passa per la funció t del
     motor, cridada literal com I18N.t amb la frase castellana entre
     cometes (és el que busquen el verificador i i18n-prepara; un embolcall
     propi els amagaria les frases). Les xifres es formaten amb l'idioma
     actiu. */
  const formatNum = (n, decimals) => Number(n).toLocaleString(
    (window.I18N && window.I18N.bcp) || 'es-ES',
    { minimumFractionDigits: decimals, maximumFractionDigits: decimals }
  );

  /* ── 1. Nav amb fons en fer scroll ── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 2. Menú mòbil ── */
  const burger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (burger && mobileMenu) {
    const toggleMenu = (open) => {
      burger.classList.toggle('active', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar el menú' : 'Abrir el menú');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    burger.addEventListener('click', () => {
      toggleMenu(!mobileMenu.classList.contains('open'));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu(false);
        burger.focus();
      }
    });
  }

  /* ── 3. L'edifici (element signatura) ── */
  const edificiInfo = {
    terrat: {
      titol: 'Cubiertas e impermeabilización',
      text: 'Terrados y terrazas que dejan de filtrar: tela asfáltica, butilo y pintura armada de poliuretano, según lo que pida cada cubierta.',
      enllac: 'comunidades.html#impermeabilizacion'
    },
    fachada: {
      titol: 'Rehabilitación y pintura de fachadas',
      text: 'Grietas, desprendimientos y pintura de fachadas y patios de luces. La cara de la finca, sana y presentable.',
      enllac: 'comunidades.html#fachadas'
    },
    piso: {
      titol: 'Reformas integrales de pisos',
      text: 'Baños, cocinas, distribución nueva, pladur e instalaciones de agua y luz. Tu piso, de arriba abajo.',
      enllac: 'reformas.html'
    },
    bajante: {
      titol: 'Bajantes y canalizaciones de PVC',
      text: 'Sustitución de tuberías en verticales y albañales, y reparación de fugas de agua y humedades.',
      enllac: 'comunidades.html#canalizaciones'
    },
    albanal: {
      titol: 'Desatascos y camión cuba',
      text: 'Albañales y colectores atascados: camión cuba para desatascar y limpiar la red de saneamiento de la finca.',
      enllac: 'comunidades.html#desatascos'
    }
  };

  const edificiBotons = document.querySelectorAll('.edifici-boto');
  const edificiParts = document.querySelectorAll('.edifici-part');
  const panellTitol = document.querySelector('[data-edifici="titol"]');
  const panellText = document.querySelector('[data-edifici="text"]');
  const panellEnllac = document.querySelector('[data-edifici="enllac"]');

  if (edificiBotons.length && panellTitol) {
    const activaPart = (part) => {
      const info = edificiInfo[part];
      if (!info) return;
      edificiBotons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.part === part)));
      edificiParts.forEach(g => g.classList.toggle('activa', g.dataset.part === part));
      panellTitol.textContent = info.titol;
      panellText.textContent = info.text;
      panellEnllac.setAttribute('href', info.enllac);
    };

    edificiBotons.forEach(b => b.addEventListener('click', () => activaPart(b.dataset.part)));
    /* Les zones del dibuix són una drecera de punter; el control accessible són els botons */
    edificiParts.forEach(g => g.addEventListener('click', () => activaPart(g.dataset.part)));

    activaPart('terrat');
  }

  /* ── 4. Comptadors (CountUp) ── */
  function countUp(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;

    if (reduceMotion || Number.isNaN(target)) return; // es queda el valor escrit a l'HTML

    const duration = 1600;
    const start = performance.now();
    const fmt = (n) => formatNum(n, decimals); // separadors de l'idioma actiu (§8.I)

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + fmt(target * ease) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const statEls = document.querySelectorAll('.stat-number');
  if (statEls.length) {
    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          statsObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => statsObs.observe(el));
  }

  /* ── 5. Scroll reveal (d'un sol tret) ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach(el => el.classList.add('visible'));
    } else {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
      revealEls.forEach(el => revealObs.observe(el));
    }
  }

  /* ── 6. Formulari de contacte ── */
  const form = document.querySelector('.contact-form');
  const successMsg = document.querySelector('.form-success');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const nom = form.querySelector('[name="name"]');
      const tel = form.querySelector('[name="phone"]');
      const privacitat = form.querySelector('[name="privacidad"]');

      if (!nom.value.trim()) { showFieldError(nom, I18N.t('El nombre es obligatorio')); return; }
      if (!tel.value.trim()) { showFieldError(tel, I18N.t('El teléfono es obligatorio')); return; }
      if (!privacitat.checked) { showFieldError(privacitat, I18N.t('Debes aceptar la política de privacidad')); return; }

      /* Simula l'enviament — NOMÉS MAQUETA.
         Quan es tingui l'ID de Formspree (vegeu el comentari a contacto.html),
         substituïu aquest setTimeout per:
           fetch(form.action, {
             method: 'POST',
             body: new FormData(form),
             headers: { Accept: 'application/json' }
           }).then(r => { if (r.ok) { form.style.display = 'none'; successMsg.classList.add('visible'); } });
      */
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.textContent = I18N.t('Enviando…');
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('visible');
      }, 700);
    });
  }

  function showFieldError(el, msg) {
    const camp = el.closest('.form-field') || el.closest('.form-privacitat') || el.parentNode;
    el.focus();
    if (!camp.querySelector('.field-error')) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.textContent = msg;
      camp.appendChild(err);
    }
    el.addEventListener('input', () => {
      const e2 = camp.querySelector('.field-error');
      if (e2) e2.remove();
    }, { once: true });
  }

  /* ── 7. Valoració de Google (data/reviews.json) ──
     L'actualitza el workflow .github/workflows/update-reviews.yml.
     Si el fetch falla — o la web s'obre amb file:// — queden els
     valors escrits a l'HTML (5,0 / 6).
     El número cru es desa a data-valor i es pinta amb els separadors
     de l'idioma actiu: «5,0» en castellà i català, «5.0» en anglès. */
  const targets = document.querySelectorAll('[data-reviews]');

  function pintaValoracio() {
    targets.forEach(el => {
      if (!el.dataset.valor) el.dataset.valor = el.textContent.trim().replace(',', '.');
      const valor = Number(el.dataset.valor);
      if (Number.isNaN(valor)) return;
      el.textContent = formatNum(valor, el.dataset.reviews === 'count' ? 0 : 1);
    });
  }

  if (targets.length) {
    pintaValoracio();
    document.addEventListener('idioma-canviat', pintaValoracio);
  }

  (function loadReviews() {
    if (!targets.length || window.location.protocol === 'file:') return;

    fetch('data/reviews.json', { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data || !data.rating || !data.count) return;
        const rating = Number(data.rating);

        targets.forEach(el => {
          const kind = el.dataset.reviews;
          el.dataset.valor = String(kind === 'count' ? data.count : rating);
          if (kind === 'rating-stat') {
            el.dataset.target = String(rating);
            el.dataset.decimals = '1';
          }
        });
        pintaValoracio();
      })
      .catch(() => { /* fallback silenciós: valors de l'HTML */ });
  })();

});
