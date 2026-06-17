// ============================================
// ARSITEK STUDIO - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  initTheme();
  initLoadingScreen();
  initCursorGlow();
  initNavbar();
  initMobileNav();
  initHero();
  initRevealAnimations();
  initCounters();
  initPortfolio();
  initVideos();
  initTestimonials();
  initBlog();
  initTeam();
  initModal();
  initBackToTop();
  initNewsletter();
});

// ============================================
// LOADING SCREEN
// ============================================
function initLoadingScreen() {
  const loader = document.getElementById('loading-screen');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 2400);
}

// ============================================
// THEME
// ============================================
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(STORAGE_KEYS.THEME, next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// ============================================
// CURSOR GLOW
// ============================================
function initCursorGlow() {
  const glow = document.querySelector('.cursor-glow');
  if (!glow || window.innerWidth < 768) return;
  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ============================================
// MOBILE NAV
// ============================================
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    mobileNav.style.display = 'flex';
    setTimeout(() => mobileNav.classList.add('open'), 10);
    document.body.style.overflow = 'hidden';
  });

  const close = () => {
    mobileNav.classList.remove('open');
    setTimeout(() => { mobileNav.style.display = 'none'; }, 400);
    document.body.style.overflow = '';
  };

  if (mobileClose) mobileClose.addEventListener('click', close);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// ============================================
// HERO PARALLAX
// ============================================
function initHero() {
  const heroBg = document.querySelector('.hero-bg-img');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
  }, { passive: true });
}

// ============================================
// REVEAL ON SCROLL
// ============================================
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    start = Math.round(eased * target);
    el.textContent = start + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ============================================
// PORTFOLIO
// ============================================
function initPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const projects = getStorage(STORAGE_KEYS.PORTFOLIO);
  let activeFilter = 'Semua';

  function render(filter) {
    grid.innerHTML = '';
    const filtered = filter === 'Semua' ? projects : projects.filter(p => p.category === filter);

    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.style.transitionDelay = `${i * 0.07}s`;
      card.innerHTML = `
        <div class="project-img-wrap">
          <img src="${p.image}" alt="${p.name}" class="project-img" loading="lazy">
          <div class="project-year">${p.year}</div>
          <div class="project-overlay">
            <button class="project-view-btn">Lihat Detail →</button>
          </div>
        </div>
        <div class="project-info">
          <div class="project-category">${p.category}</div>
          <div class="project-name">${p.name}</div>
          <p class="project-desc">${p.description.substring(0, 120)}...</p>
          <div class="project-specs">
            <div class="spec-item"><div class="spec-label">Luas Tanah</div><div class="spec-val">${p.land}</div></div>
            <div class="spec-item"><div class="spec-label">Luas Bangunan</div><div class="spec-val">${p.floor}</div></div>
            <div class="spec-item"><div class="spec-label">Kamar Tidur</div><div class="spec-val">${p.bedroom}</div></div>
            <div class="spec-item"><div class="spec-label">Kamar Mandi</div><div class="spec-val">${p.bathroom}</div></div>
            <div class="spec-item"><div class="spec-label">Carport</div><div class="spec-val">${p.carport ? 'Ya' : 'Tidak'}</div></div>
            <div class="spec-item"><div class="spec-label">Kolam Renang</div><div class="spec-val">${p.pool ? 'Ya' : 'Tidak'}</div></div>
          </div>
        </div>
      `;
      card.querySelector('.project-view-btn').addEventListener('click', () => openProjectModal(p));
      card.addEventListener('click', () => openProjectModal(p));
      grid.appendChild(card);
    });

    // Re-init reveal
    setTimeout(() => initRevealAnimations(), 50);
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      render(activeFilter);
    });
  });

  render(activeFilter);
}

// ============================================
// PROJECT MODAL
// ============================================
function openProjectModal(p) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  modal.querySelector('.modal-img').src = p.image;
  modal.querySelector('.modal-title').textContent = p.name;
  modal.querySelector('.modal-body-content').innerHTML = `
    <p style="color:var(--text-secondary);line-height:1.8;margin-bottom:1.5rem">${p.description}</p>
    <div class="project-specs" style="margin-top:1rem">
      <div class="spec-item"><div class="spec-label">Lokasi</div><div class="spec-val" style="font-size:0.85rem">${p.location}</div></div>
      <div class="spec-item"><div class="spec-label">Luas Tanah</div><div class="spec-val">${p.land}</div></div>
      <div class="spec-item"><div class="spec-label">Luas Bangunan</div><div class="spec-val">${p.floor}</div></div>
      <div class="spec-item"><div class="spec-label">Kamar Tidur</div><div class="spec-val">${p.bedroom}</div></div>
      <div class="spec-item"><div class="spec-label">Kamar Mandi</div><div class="spec-val">${p.bathroom}</div></div>
      <div class="spec-item"><div class="spec-label">Carport</div><div class="spec-val">${p.carport ? 'Ya' : 'Tidak'}</div></div>
    </div>
    <div style="margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap">
      <a href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan proyek ${encodeURIComponent(p.name)}" target="_blank" class="btn-gold" style="text-decoration:none">Konsultasi Proyek Ini</a>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ============================================
// VIDEOS
// ============================================
function initVideos() {
  const grid = document.getElementById('video-grid');
  if (!grid) return;

  const videos = getStorage(STORAGE_KEYS.VIDEOS);
  const featured = videos.find(v => v.featured);
  const others = videos.filter(v => !v.featured);

  let html = `<div class="video-card featured reveal" data-yt="${featured?.youtubeId}">
    <img src="${featured?.thumb}" alt="${featured?.title}" class="video-thumb" loading="lazy">
    <div class="video-overlay">
      <div class="play-btn">▶</div>
    </div>
    <div class="video-info">
      <div class="video-title">${featured?.title}</div>
      <div class="video-sub">${featured?.subtitle}</div>
    </div>
  </div>
  <div class="video-side">`;

  others.forEach(v => {
    html += `<div class="video-card reveal" data-yt="${v.youtubeId}">
      <img src="${v.thumb}" alt="${v.title}" class="video-thumb" loading="lazy">
      <div class="video-overlay">
        <div class="play-btn" style="width:46px;height:46px;font-size:1rem">▶</div>
      </div>
      <div class="video-info">
        <div class="video-title" style="font-size:0.95rem">${v.title}</div>
        <div class="video-sub">${v.subtitle}</div>
      </div>
    </div>`;
  });

  html += '</div>';
  grid.innerHTML = html;

  grid.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const ytId = card.getAttribute('data-yt');
      openVideoModal(ytId);
    });
  });
}

function openVideoModal(ytId) {
  const modal = document.getElementById('video-modal');
  if (!modal) return;
  const frame = modal.querySelector('.video-frame');
  frame.src = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
function initTestimonials() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;

  const testimonials = getStorage(STORAGE_KEYS.TESTIMONIALS);
  let current = 0;

  testimonials.forEach(t => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-quote">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="testimonial-author">
        <img src="${t.avatar}" alt="${t.name}" class="author-avatar" loading="lazy">
        <div>
          <div class="author-name">${t.name}</div>
          <div class="author-title">${t.title}</div>
          <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
  });

  // Dots
  const dotsContainer = document.getElementById('slider-dots');
  testimonials.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    current = idx;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.querySelectorAll('.slider-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  // Auto slide
  setInterval(() => {
    goTo((current + 1) % testimonials.length);
  }, 5000);
}

// ============================================
// BLOG
// ============================================
function initBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  const posts = getStorage(STORAGE_KEYS.BLOG);
  posts.forEach((post, i) => {
    const card = document.createElement('div');
    card.className = 'blog-card reveal';
    card.style.transitionDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="blog-img-wrap">
        <img src="${post.image}" alt="${post.title}" class="blog-img" loading="lazy">
      </div>
      <div class="blog-body">
        <div class="blog-cat">${post.category}</div>
        <h3 class="blog-title">${post.title}</h3>
        <p class="blog-excerpt">${post.excerpt}</p>
        <div class="blog-meta">
          <span>${post.date} · ${post.readTime} baca</span>
          <span class="blog-read-more">Baca →</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============================================
// TEAM
// ============================================
function initTeam() {
  const grid = document.getElementById('team-grid');
  if (!grid) return;

  const team = getStorage(STORAGE_KEYS.TEAM);
  team.forEach((member, i) => {
    const card = document.createElement('div');
    card.className = 'team-card reveal';
    card.style.transitionDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="team-img-wrap">
        <img src="${member.image}" alt="${member.name}" class="team-img" loading="lazy">
        <div class="team-social-overlay">
          <a href="${member.instagram}" class="team-social-icon" title="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="${member.linkedin}" class="team-social-icon" title="LinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </div>
      <div class="team-info">
        <div class="team-name">${member.name}</div>
        <div class="team-role">${member.role}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============================================
// MODAL
// ============================================
function initModal() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
  });
}

function closeModal(modal) {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Stop video if any
  const frame = modal.querySelector('.video-frame');
  if (frame) frame.src = '';
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
  const btn = document.getElementById('back-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
// NEWSLETTER
// ============================================
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input');
    const email = input.value.trim();
    if (!email) return;

    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWSLETTER) || '[]');
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
    }
    input.value = '';
    showToast('Terima kasih! Anda telah berlangganan.');
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);
    background:var(--gold);color:#0e0e0e;padding:0.8rem 1.5rem;
    font-family:var(--font-ui);font-size:0.82rem;font-weight:600;
    z-index:9000;opacity:0;transition:opacity 0.4s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.style.opacity = '1');
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ============================================
// SMOOTH ANCHOR SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
