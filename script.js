/* ============================================
   VISUAL ART STUDIO – script.js
   Vanilla JS ES2026 – No dependencies
   ============================================ */

'use strict';

/* ---- UTILITY ---- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const sanitize = (str) => String(str).replace(/[<>"'&]/g, c => ({'<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','&':'&amp;'}[c]));

/* ---- LOADING SCREEN ---- */
(function initLoader() {
  const loader = $('#loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => { loader.classList.add('hidden'); }, 1200);
  });
  // Fallback
  setTimeout(() => { loader.classList.add('hidden'); }, 3000);
})();

/* ---- THEME ---- */
(function initTheme() {
  const toggle = $('#themeToggle');
  const icon = toggle?.querySelector('.theme-icon');
  const saved = localStorage.getItem('vas-theme') || 'dark';

  const apply = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vas-theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  };

  apply(saved);
  toggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark');
  });
})();

/* ---- NAVBAR ---- */
(function initNavbar() {
  const navbar = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks = $('#navLinks');
  const links = $$('.nav-link');

  // Scroll effect
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const toggleMenu = (open) => {
    navLinks?.classList.toggle('open', open);
    hamburger?.classList.toggle('active', open);
    hamburger?.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks?.classList.contains('open');
    toggleMenu(!isOpen);
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Active link on scroll
  const sections = $$('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

/* ---- CURSOR GLOW ---- */
(function initCursor() {
  const glow = $('#cursor-glow');
  if (!glow || !window.matchMedia('(hover: hover)').matches) return;
  let raf;
  document.addEventListener('mousemove', (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }, { passive: true });
})();

/* ---- PARTICLES CANVAS ---- */
(function initParticles() {
  const canvas = $('#particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;
  const isLowEnd = navigator.hardwareConcurrency <= 4;
  const COUNT = isLowEnd ? 30 : 60;

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const colors = ['rgba(37,99,255,', 'rgba(124,58,237,', 'rgba(6,182,212,'];
  const rand = (a, b) => Math.random() * (b - a) + a;

  const createParticle = () => ({
    x: rand(0, W), y: rand(0, H),
    r: rand(1, 3),
    vx: rand(-0.3, 0.3), vy: rand(-0.5, -0.1),
    color: colors[Math.floor(rand(0, colors.length))],
    alpha: rand(0.2, 0.7),
  });

  const init = () => {
    particles = Array.from({ length: COUNT }, createParticle);
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.001;

      if (p.y < -5 || p.alpha <= 0) {
        Object.assign(p, createParticle(), { y: H + 5, alpha: rand(0.2, 0.7) });
      }
    });
    raf = requestAnimationFrame(draw);
  };

  const ro = new ResizeObserver(() => { resize(); init(); });
  ro.observe(canvas.parentElement);
  resize(); init(); draw();
})();

/* ---- RIPPLE EFFECT ---- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const el = document.createElement('span');
  el.className = 'ripple-effect';
  el.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
  btn.appendChild(el);
  setTimeout(() => el.remove(), 700);
});

/* ---- MAGNETIC BUTTONS ---- */
(function initMagnetic() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const STRENGTH = 0.3;
  $$('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * STRENGTH;
      const y = (e.clientY - r.top - r.height / 2) * STRENGTH;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

/* ---- SCROLL REVEAL ---- */
(function initReveal() {
  const els = $$('.reveal-fade, .reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
})();

/* ---- COUNTER ANIMATION ---- */
(function initCounters() {
  const els = $$('.stat-number[data-target]');
  const ease = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
  const DURATION = 2000;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / DURATION, 1);
        el.textContent = Math.round(ease(progress) * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
})();

/* ---- PORTFOLIO FILTER ---- */
(function initPortfolioFilter() {
  const btns = $$('.filter-btn');
  const items = $$('.portfolio-item');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      btns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      items.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hidden', !match);
        // Re-trigger reveal
        if (match) {
          setTimeout(() => item.classList.add('visible'), 50);
        }
      });
    });
  });
})();

/* ---- TESTIMONIAL SLIDER ---- */
(function initSlider() {
  const track = $('#testimonialTrack');
  const prevBtn = $('#sliderPrev');
  const nextBtn = $('#sliderNext');
  const dotsContainer = $('#sliderDots');
  if (!track) return;

  const cards = $$('.testimonial-card', track);
  let current = 0;
  let autoplay;
  let perView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;

  // Build dots
  const buildDots = () => {
    const total = Math.ceil(cards.length / perView);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot${i === 0 ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.setAttribute('role', 'tab');
      dot.addEventListener('click', () => go(i));
      dotsContainer.appendChild(dot);
    }
  };

  const go = (idx) => {
    const total = Math.ceil(cards.length / perView);
    current = (idx + total) % total;
    const pct = (100 / perView) * current;
    track.style.transform = `translateX(-${pct}%)`;
    $$('.slider-dot', dotsContainer).forEach((d, i) => d.classList.toggle('active', i === current));
  };

  const startAuto = () => { autoplay = setInterval(() => go(current + 1), 4500); };
  const stopAuto = () => clearInterval(autoplay);

  prevBtn?.addEventListener('click', () => { stopAuto(); go(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); go(current + 1); startAuto(); });

  // Swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { stopAuto(); go(current + (diff > 0 ? 1 : -1)); startAuto(); }
  }, { passive: true });

  const onResize = () => {
    perView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    buildDots(); go(0);
  };

  window.addEventListener('resize', onResize, { passive: true });
  buildDots(); startAuto();
})();

/* ---- FAQ ACCORDION ---- */
(function initFAQ() {
  $$('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      $$('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling?.classList.remove('open');
      });
      // Toggle clicked
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling?.classList.add('open');
      }
    });
  });
})();

/* ---- SMOOTH SCROLLING ---- */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ---- CHATBOT ---- */
(function initChatbot() {
  const toggle = $('#chatbotToggle');
  const window_ = $('#chatbotWindow');
  const closeBtn = $('#chatbotClose');
  const messages = $('#chatbotMessages');
  const input = $('#chatbotInput');
  const sendBtn = $('#chatbotSend');
  const quickBtns = $$('.quick-btn');
  const badge = $('#chatbotBadge');
  const chatbot = $('#chatbot');
  if (!toggle || !window_) return;

  let isOpen = false;
  let greeted = false;

  const openChat = () => {
    isOpen = true;
    window_.classList.add('open');
    chatbot.setAttribute('aria-hidden', 'false');
    toggle.querySelector('.toggle-icon-open').style.display = 'none';
    toggle.querySelector('.toggle-icon-close').style.display = '';
    badge?.classList.add('hidden');
    if (!greeted) {
      greeted = true;
      setTimeout(() => addMsg('bot', 'Silakan pilih pertanyaan di bawah atau ketik pesan Anda. Saya siap membantu! 😊'), 500);
    }
    setTimeout(() => input?.focus(), 300);
  };

  const closeChat = () => {
    isOpen = false;
    window_.classList.remove('open');
    chatbot.setAttribute('aria-hidden', 'true');
    toggle.querySelector('.toggle-icon-open').style.display = '';
    toggle.querySelector('.toggle-icon-close').style.display = 'none';
  };

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn?.addEventListener('click', closeChat);

  const addMsg = (role, html) => {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = `<div class="chat-bubble">${html}</div>`;
    messages?.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  };

  const waBtn = (text) =>
    `${text}<br/><br/><a href="https://wa.me/6283151144948" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:#25d366;color:#fff;border-radius:8px;font-size:0.8125rem;font-weight:600;text-decoration:none;margin-top:4px;">💬 Chat WhatsApp</a>`;

  const replies = {
    harga: waBtn('Harga kami sangat kompetitif! Mulai dari:<br/>• Logo: Rp 100.000+<br/>• Banner: Rp 50.000+<br/>• Denah Rumah: Rp 150.000+<br/>• Rendering 3D: Rp 250.000+<br/><br/>Hubungi kami untuk penawaran spesifik:'),
    layanan: 'Layanan kami meliputi:<br/>🏗 Desain Arsitektur (2D/3D)<br/>🛋 Interior & Eksterior<br/>✨ Logo & Branding<br/>📄 Banner, Brosur, Flyer<br/>📱 Konten Media Sosial<br/>📦 Kemasan Produk<br/>💌 Undangan Digital<br/>& banyak lagi!',
    waktu: '⏱ Estimasi waktu pengerjaan:<br/>• Logo: 1–3 hari kerja<br/>• Banner/Flyer: 1–2 hari<br/>• Denah Rumah: 3–7 hari<br/>• Rendering 3D: 5–10 hari<br/>• Konten Sosmed: 1–2 hari<br/><br/>Tersedia layanan <strong>express</strong> untuk kebutuhan mendesak!',
    pesan: waBtn('Cara pesan sangat mudah:<br/>1️⃣ Hubungi kami via WhatsApp<br/>2️⃣ Ceritakan kebutuhan Anda<br/>3️⃣ Terima penawaran & estimasi<br/>4️⃣ Bayar DP untuk mulai pengerjaan<br/>5️⃣ Terima file final & pelunasan<br/><br/>Mulai sekarang:'),
    portofolio: waBtn('Anda bisa melihat sebagian portofolio di website ini (bagian Portofolio).<br/><br/>Untuk portofolio lebih lengkap sesuai kebutuhan Anda, hubungi kami:'),
  };

  const handleQ = (key) => {
    const reply = replies[key];
    if (reply) {
      addMsg('user', { harga:'💰 Info Harga', layanan:'🎨 Layanan', waktu:'⏱ Lama Pengerjaan', pesan:'📋 Cara Pesan', portofolio:'🖼 Portofolio' }[key]);
      setTimeout(() => addMsg('bot', reply), 400);
    }
  };

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => handleQ(btn.dataset.q));
  });

  const handleInput = () => {
    const raw = input.value.trim();
    if (!raw) return;
    const text = sanitize(raw);
    input.value = '';

    addMsg('user', text);

    // Simple keyword matching
    const lower = text.toLowerCase();
    let key = null;
    if (/harga|biaya|tarif|murah|bayar|ongkos/.test(lower)) key = 'harga';
    else if (/layanan|jasa|bisa|apa saja|produk/.test(lower)) key = 'layanan';
    else if (/lama|waktu|cepat|berapa hari|durasi|proses/.test(lower)) key = 'waktu';
    else if (/pesan|order|cara|booking|gimana|bagaimana/.test(lower)) key = 'pesan';
    else if (/porto|contoh|hasil|karya|sampel/.test(lower)) key = 'portofolio';

    setTimeout(() => {
      if (key) {
        addMsg('bot', replies[key]);
      } else {
        addMsg('bot', waBtn('Terima kasih atas pertanyaan Anda! Untuk informasi lebih detail, silakan konsultasi langsung dengan tim kami:'));
      }
    }, 500);
  };

  sendBtn?.addEventListener('click', handleInput);
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleInput(); });
})();

/* ---- LAZY LOADING IMAGES ---- */
(function initLazy() {
  if ('loading' in HTMLImageElement.prototype) return;
  $$('img[loading="lazy"]').forEach(img => {
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src || img.src;
        io.disconnect();
      }
    });
    io.observe(img);
  });
})();

/* ---- FORM ANTI-SPAM (if any forms added later) ---- */
document.addEventListener('submit', (e) => {
  const form = e.target;
  if (!form.matches('form')) return;
  const honeypot = form.querySelector('[name="website"]');
  if (honeypot?.value) { e.preventDefault(); return; }
  // Rate limit
  const last = parseInt(sessionStorage.getItem('form-last') || '0', 10);
  if (Date.now() - last < 10000) {
    e.preventDefault();
    alert('Mohon tunggu sebentar sebelum mengirim lagi.');
    return;
  }
  sessionStorage.setItem('form-last', String(Date.now()));
});

/* ---- PERFORMANCE: Preload WA link ---- */
(function preloadWA() {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://wa.me';
  document.head.appendChild(link);
})();

/* ---- SERVICE WORKER REGISTRATION (for GitHub Pages) ---- */
// Uncomment if you add a sw.js
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
// }

console.log('%c✦ Visual Art Studio ✦', 'font-size:18px;font-weight:bold;color:#3b82f6;');
console.log('%cDesain Profesional | wa.me/6283151144948', 'color:#a855f7;');


