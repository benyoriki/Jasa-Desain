// ============================================
// ARSITEK STUDIO — Advanced Animations 2026
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initTiltCards();
  initMagneticButtons();
  initHorizontalScroll();
  initSplitReveal();
  initTextReveal();
  initLineDraws();
  initAwardStrip();
  initPageTransition();
  initScrollProgress();
  initParallaxSections();
  initGlowHovers();
  initHeroGrain();
  updateAllWALinks();
});

const WA_NUM = '6283151144948';
const WA_MSG_DEFAULT = 'Halo Arsitek Studio, saya ingin konsultasi desain rumah';

// ============================================
// UPDATE ALL WA LINKS to new number
// ============================================
function updateAllWALinks() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
    const url = new URL(a.href);
    const text = url.searchParams.get('text') || WA_MSG_DEFAULT;
    a.href = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(text)}`;
  });
}

// ============================================
// FLOATING PARTICLES IN HERO
// ============================================
function initParticles() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  const container = document.createElement('div');
  container.className = 'hero-particles';
  hero.appendChild(container);

  const COUNT = window.innerWidth < 768 ? 18 : 35;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const x = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const drift = (Math.random() - 0.5) * 200;

    p.style.cssText = `
      left: ${x}%;
      bottom: -10px;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      --drift: ${drift}px;
    `;
    container.appendChild(p);
  }
}

// ============================================
// HERO GRAIN OVERLAY
// ============================================
function initHeroGrain() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const grain = document.createElement('div');
  grain.className = 'grain-overlay';
  hero.appendChild(grain);
}

// ============================================
// 3D TILT CARDS
// ============================================
function initTiltCards() {
  if (window.innerWidth < 768) return;

  const cards = document.querySelectorAll('.service-card, .blog-card, .project-card');
  cards.forEach(card => {
    card.classList.add('tilt-card');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => card.style.transition = '', 500);
    });
  });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.btn-gold, .btn-outline, .nav-cta').forEach(btn => {
    btn.classList.add('magnetic');

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// ============================================
// HORIZONTAL SCROLL (drag)
// ============================================
function initHorizontalScroll() {
  document.querySelectorAll('.hscroll-track-outer').forEach(el => {
    let isDown = false, startX, scrollLeft;

    el.addEventListener('mousedown', e => {
      isDown = true;
      el.style.cursor = 'grabbing';
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
      el.style.cursor = 'grab';
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
      el.style.cursor = 'grab';
    });

    el.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    });

    // Touch
    let touchStart;
    el.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; });
    el.addEventListener('touchmove', e => {
      const diff = touchStart - e.touches[0].clientX;
      el.scrollLeft += diff * 0.8;
      touchStart = e.touches[0].clientX;
    });
  });
}

// ============================================
// SPLIT IMAGE REVEAL
// ============================================
function initSplitReveal() {
  const els = document.querySelectorAll('.split-reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  els.forEach(el => obs.observe(el));
}

// ============================================
// TEXT REVEAL ANIMATION
// ============================================
function initTextReveal() {
  const els = document.querySelectorAll('.text-reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => obs.observe(el));
}

// ============================================
// LINE DRAW ANIMATIONS
// ============================================
function initLineDraws() {
  const lines = document.querySelectorAll('.line-draw');
  if (!lines.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  lines.forEach(l => obs.observe(l));
}

// ============================================
// AWARD STRIP
// ============================================
function initAwardStrip() {
  const strip = document.getElementById('award-strip');
  if (!strip) return;

  const awards = [
    { icon: 'fas fa-trophy', text: 'Best Architecture Studio 2024' },
    { icon: 'fas fa-medal', text: 'Top Rated Indonesia 2023' },
    { icon: 'fas fa-star', text: '4.9 Rating dari 500+ Klien' },
    { icon: 'fas fa-certificate', text: 'IAI Certified Architects' },
    { icon: 'fas fa-shield-alt', text: 'Garansi 5 Tahun' },
  ];

  strip.innerHTML = `
    <div class="award-inner">
      ${awards.map(a => `
        <div class="award-item reveal">
          <div class="award-icon"><i class="${a.icon}"></i></div>
          <div class="award-text">${a.text}</div>
        </div>
      `).join('')}
    </div>`;
}

// ============================================
// PAGE TRANSITION (smooth page loads)
// ============================================
function initPageTransition() {
  const overlay = document.createElement('div');
  overlay.id = 'page-transition';
  overlay.style.cssText = `
    position: fixed; inset: 0;
    background: var(--bg-primary);
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
  `;
  document.body.appendChild(overlay);

  // Fade in on internal link clicks (optional subtle effect)
  document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      overlay.style.opacity = '1';
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });
}

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(to right, var(--gold), var(--gold-light));
    z-index: 1001;
    width: 0%;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(200,169,106,0.6);
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ============================================
// PARALLAX SECTIONS
// ============================================
function initParallaxSections() {
  const sections = document.querySelectorAll('[data-parallax]');
  if (!sections.length || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    sections.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + scrollY) - scrollY;
      el.style.transform = `translateY(${offset * speed * -0.1}px)`;
    });
  }, { passive: true });
}

// ============================================
// GLOW HOVERS
// ============================================
function initGlowHovers() {
  document.querySelectorAll('.project-card, .team-card, .blog-card').forEach(el => {
    el.classList.add('glow-hover');
  });
}

// ============================================
// CURSOR SPOTLIGHT (desktop only)
// ============================================
(function initCursorSpotlight() {
  if (window.innerWidth < 1024) return;

  document.querySelectorAll('.project-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, var(--bg-card-hover) 0%, var(--bg-card) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

// ============================================
// SMOOTH NUMBER COUNTER with easing
// ============================================
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ============================================
// SECTION ENTRY EFFECTS
// ============================================
(function initSectionWipes() {
  document.querySelectorAll('section').forEach(s => s.classList.add('section-wipe'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05 });
  document.querySelectorAll('section').forEach(s => obs.observe(s));
})();

// ============================================
// HERO HEADLINE TYPEWRITER (optional shimmer)
// ============================================
(function initHeroShimmer() {
  const em = document.querySelector('.hero-headline em');
  if (em) em.classList.add('shimmer-gold');
})();

// ============================================
// LAZY IMAGE FADE-IN
// ============================================
(function initImageFadeIn() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });
})();

// ============================================
// SECTION TITLE CHAR ANIMATION
// ============================================
function animateTitle(el) {
  if (!el || el.dataset.animated) return;
  el.dataset.animated = '1';
  const text = el.innerHTML;
  // Only animate if no child elements (simple text)
  if (el.children.length === 0) {
    el.innerHTML = text.split('').map((c, i) =>
      `<span style="display:inline-block;opacity:0;transform:translateY(20px);transition:opacity 0.4s ease ${i * 0.03}s, transform 0.4s ease ${i * 0.03}s">${c === ' ' ? '&nbsp;' : c}</span>`
    ).join('');
    setTimeout(() => {
      el.querySelectorAll('span').forEach(s => {
        s.style.opacity = '1';
        s.style.transform = 'none';
      });
    }, 100);
  }
}

(function initTitleAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateTitle(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-eyebrow').forEach(el => obs.observe(el));
})();
