// ============================================
// ARSITEK STUDIO — Smart Chatbot (Claude AI)
// ============================================

const WA_NUMBER = '6283151144948';
const WA_BASE = `https://wa.me/${WA_NUMBER}`;

// ============================================
// KNOWLEDGE BASE — fallback offline answers
// ============================================
const KB = {
  greet: {
    triggers: ['halo','hai','hi','hello','selamat','pagi','siang','malam','assalam','hei','hey'],
    reply: `Halo! 👋 Selamat datang di **Arsitek Studio** — biro arsitektur & interior premium.\n\nSaya asisten virtual kami. Ada yang bisa saya bantu terkait desain rumah impian Anda?`,
    chips: ['Lihat layanan','Info harga','Konsultasi gratis','Lihat portfolio']
  },
  layanan: {
    triggers: ['layanan','service','jasa','apa saja','bisa apa','produk'],
    reply: `Kami menyediakan layanan lengkap:\n\n🏠 **Desain Arsitektur** — konsep hingga gambar kerja\n🛋️ **Desain Interior** — modern, tropis, klasik\n🔨 **Renovasi Premium** — parsial & total\n🏗️ **Bangun Rumah** — turnkey\n📐 **Masterplan** — kawasan & perumahan\n💬 **Konsultasi Gratis** — via WA`,
    chips: ['Info harga','Konsultasi WA','Portfolio']
  },
  harga: {
    triggers: ['harga','biaya','tarif','berapa','cost','budget','bayar','paket'],
    reply: `Estimasi biaya desain kami:\n\n📋 **Konsultasi Awal** — Gratis\n🏠 **Desain Rumah** — mulai Rp 15 jt\n🛋️ **Interior Design** — mulai Rp 10 jt\n🔨 **Renovasi** — mulai Rp 20 jt\n🏗️ **Bangun Rumah** — mulai Rp 3,5 jt/m²\n\nHarga bisa disesuaikan dengan kebutuhan & budget Anda. Konsultasi lebih lanjut via WA yuk!`,
    chips: ['Konsultasi WA','Lihat portfolio','Tim kami'],
    wa: true
  },
  portfolio: {
    triggers: ['portfolio','proyek','project','karya','contoh','hasil','galeri'],
    reply: `Portfolio kami mencakup berbagai gaya:\n\n🏡 **Modern & Kontemporer**\n🌿 **Tropis & Natural**\n⬜ **Minimalis**\n🏛️ **Klasik Mewah**\n🚀 **Futuristik**\n\nScroll ke section Portfolio di halaman ini untuk melihat 6+ proyek pilihan kami!`,
    chips: ['Lihat portfolio','Konsultasi WA']
  },
  lokasi: {
    triggers: ['lokasi','alamat','dimana','kantor','kota','wilayah','jangkauan','daerah','bogor','semarang','jakarta'],
    reply: `Arsitek Studio beroperasi di:\n\n📍 **HQ Bogor** — Jl. Raya Pajajaran No. 88, Bogor\n📍 **Cabang Semarang** — Jl. Pandanaran No. 45\n\n🌍 Kami melayani **seluruh Indonesia** — survei & konsultasi bisa dilakukan online maupun tatap muka.`,
    chips: ['Konsultasi WA','Tim kami']
  },
  konsultasi: {
    triggers: ['konsultasi','contact','hubungi','wa','whatsapp','pesan','order','booking','mau','ingin','tertarik'],
    reply: `Siap untuk memulai? 🎉\n\nTim kami siap merespons dalam **< 1 jam** di jam kerja.\n\nKlik tombol di bawah untuk langsung terhubung via WhatsApp:`,
    chips: [],
    wa: true,
    waText: 'Halo Arsitek Studio, saya tertarik untuk konsultasi desain rumah'
  },
  tim: {
    triggers: ['tim','team','arsitek','siapa','anggota','staff'],
    reply: `Tim Arsitek Studio terdiri dari:\n\n👨‍💼 **Arya Prasetyo** — Principal Architect\n👩‍🎨 **Nadira Salsabila** — Lead Interior Designer\n👨‍🔧 **Reza Firmansyah** — Senior Architect\n👩‍💻 **Citra Maharani** — 3D Visualization\n\nDan 46+ profesional lainnya dengan pengalaman rata-rata 8 tahun.`,
    chips: ['Konsultasi WA','Lihat portfolio']
  },
  waktu: {
    triggers: ['lama','berapa lama','durasi','waktu','kapan','selesai','proses'],
    reply: `Estimasi waktu pengerjaan:\n\n📐 **Desain Arsitektur** — 2–4 minggu\n🛋️ **Interior Design** — 1–3 minggu\n🏗️ **Renovasi Ringan** — 1–2 bulan\n🏠 **Bangun Rumah** — 6–18 bulan\n\nTergantung kompleksitas & luas bangunan. Kami komitmen tepat waktu!`,
    chips: ['Konsultasi WA','Info harga']
  },
  proses: {
    triggers: ['cara','alur','proses','langkah','tahapan','prosedur','bagaimana'],
    reply: `Alur kerja kami (8 tahap):\n\n1️⃣ Konsultasi awal & kenal\n2️⃣ Proposal desain arsitektur\n3️⃣ Pengerjaan detail\n4️⃣ Proposal desain interior\n5️⃣ Pengerjaan menyeluruh\n6️⃣ Pengiriman dokumen\n7️⃣ Perencanaan akhir\n8️⃣ Konsultasi pembangunan\n\nSimple, transparan, dan profesional!`,
    chips: ['Mulai sekarang','Info harga']
  }
};

const FALLBACK_REPLIES = [
  `Pertanyaan yang bagus! 😊 Untuk informasi lebih detail, tim kami siap membantu via WhatsApp.`,
  `Saya belum memiliki jawaban spesifik untuk itu, tapi tim arsitek kami pasti bisa membantu lebih lanjut!`,
  `Agar lebih akurat, yuk konsultasikan langsung dengan tim kami via WA — gratis & tanpa komitmen!`
];

// ============================================
// CHATBOT STATE
// ============================================
let chatOpen = false;
let msgHistory = [];
let hasShownWelcome = false;
let badgeCount = 1;

// ============================================
// INIT CHATBOT
// ============================================
function initChatbot() {
  renderChatbotHTML();
  bindChatbotEvents();

  // Show welcome badge after delay
  setTimeout(() => {
    updateBadge(1);
  }, 3000);

  // Auto-open hint after 8s if not opened yet
  setTimeout(() => {
    if (!chatOpen && !hasShownWelcome) {
      showChatNotification();
    }
  }, 8000);
}

function renderChatbotHTML() {
  const html = `
  <!-- Floating Action Buttons -->
  <div class="fab-group" id="fab-group">
    <div class="chatbot-window" id="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-avatar">
          🏛️
          <div class="chatbot-avatar-dot"></div>
        </div>
        <div class="chatbot-header-info">
          <div class="chatbot-name">Asisten Arsitek Studio</div>
          <div class="chatbot-status">Online sekarang</div>
        </div>
        <div class="chatbot-header-actions">
          <button class="chatbot-header-btn" onclick="openWhatsApp('Halo Arsitek Studio!')" title="Hubungi via WA">
            <i class="fab fa-whatsapp"></i>
          </button>
          <button class="chatbot-header-btn" onclick="closeChatbot()" title="Tutup">✕</button>
        </div>
      </div>

      <div class="chatbot-messages" id="chatbot-messages"></div>

      <div class="chatbot-input-area">
        <input
          type="text"
          class="chatbot-input"
          id="chatbot-input"
          placeholder="Ketik pesan Anda..."
          autocomplete="off"
          maxlength="300"
        >
        <button class="chatbot-send" id="chatbot-send" onclick="sendUserMessage()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="chatbot-powered">Powered by <span>Claude AI</span> × Arsitek Studio</div>
    </div>

    <button class="fab-chat" id="fab-chat-btn" onclick="toggleChatbot()">
      <i class="fas fa-comment-dots" id="fab-chat-icon"></i>
      <div class="fab-chat-tooltip">Tanya Asisten Kami</div>
      <div class="chat-badge" id="chat-badge" style="display:none">1</div>
    </button>

    <a href="${WA_BASE}?text=Halo%20Arsitek%20Studio%2C%20saya%20ingin%20konsultasi%20desain%20rumah"
       target="_blank" class="fab-wa" title="WhatsApp Kami">
      <div class="fab-wa-pulse"></div>
      <i class="fab fa-whatsapp"></i>
      <div class="fab-wa-tooltip">Chat di WhatsApp</div>
    </a>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
}

function bindChatbotEvents() {
  const input = document.getElementById('chatbot-input');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
      }
    });
  }
}

// ============================================
// OPEN / CLOSE
// ============================================
function toggleChatbot() {
  chatOpen ? closeChatbot() : openChatbot();
}

function openChatbot() {
  chatOpen = true;
  document.getElementById('chatbot-window').classList.add('open');
  document.getElementById('fab-chat-icon').className = 'fas fa-times';
  updateBadge(0);

  if (!hasShownWelcome) {
    hasShownWelcome = true;
    setTimeout(() => {
      addBotMessage(
        `Halo! 👋 Selamat datang di **Arsitek Studio**.\n\nSaya siap membantu Anda mewujudkan rumah impian. Tanyakan apa saja!`,
        ['Lihat layanan', 'Info harga', 'Konsultasi WA', 'Portfolio']
      );
    }, 400);
  }

  setTimeout(() => {
    const msgs = document.getElementById('chatbot-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
    document.getElementById('chatbot-input')?.focus();
  }, 500);
}

function closeChatbot() {
  chatOpen = false;
  document.getElementById('chatbot-window').classList.remove('open');
  document.getElementById('fab-chat-icon').className = 'fas fa-comment-dots';
}

function updateBadge(count) {
  const badge = document.getElementById('chat-badge');
  if (!badge) return;
  badgeCount = count;
  if (count > 0) {
    badge.style.display = 'flex';
    badge.textContent = count;
  } else {
    badge.style.display = 'none';
  }
}

function showChatNotification() {
  updateBadge(1);
}

// ============================================
// SEND MESSAGE
// ============================================
function sendUserMessage() {
  const input = document.getElementById('chatbot-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  addUserMessage(text);
  input.value = '';
  msgHistory.push({ role: 'user', content: text });

  showTyping();
  processMessage(text);
}

function sendQuickReply(text) {
  if (!chatOpen) openChatbot();
  setTimeout(() => {
    const input = document.getElementById('chatbot-input');
    if (input) {
      input.value = text;
      sendUserMessage();
    }
  }, 200);
}

// ============================================
// PROCESS MESSAGE — Claude AI + fallback
// ============================================
async function processMessage(userText) {
  try {
    const response = await callClaudeAPI(userText);
    hideTyping();
    handleBotResponse(response, userText);
  } catch (err) {
    hideTyping();
    const local = getLocalResponse(userText);
    if (local) {
      addBotMessage(local.reply, local.chips, local.wa, local.waText);
    } else {
      const fallback = FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
      addBotMessage(fallback, ['Konsultasi WA', 'Info harga'], true);
    }
  }
}

async function callClaudeAPI(userText) {
  const systemPrompt = `Kamu adalah asisten virtual Arsitek Studio, biro arsitektur dan interior premium di Indonesia (Bogor & Semarang). 
  
  Peranmu:
  - Menjawab pertanyaan tentang jasa desain rumah, interior, renovasi, dan bangun rumah
  - Memberikan estimasi harga: desain mulai Rp 15 jt, interior Rp 10 jt, bangun rumah Rp 3.5 jt/m²
  - Mendorong calon klien untuk konsultasi via WhatsApp: +62 831-5114-4948
  - Berbicara dalam Bahasa Indonesia yang ramah, profesional, dan hangat
  - Jawaban singkat, max 4-5 kalimat, gunakan emoji yang relevan
  - Selalu akhiri dengan mengajak konsultasi WA jika ada minat
  
  Info penting:
  - Layanan: Desain Arsitektur, Interior Design, Renovasi, Bangun Rumah, Masterplan, Konsultasi
  - Pengalaman: 15+ tahun, 1000+ proyek, 500+ rumah terbangun, 50+ tim profesional
  - WA: +62 831-5114-4948
  
  Jangan pernah keluar dari topik arsitektur dan desain rumah.`;

  const messages = [
    ...msgHistory.slice(-6),
    { role: 'user', content: userText }
  ];

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: systemPrompt,
      messages
    })
  });

  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.content?.[0]?.text || '';
}

function handleBotResponse(text, userText) {
  const lower = userText.toLowerCase();
  const wantWA = ['harga','biaya','pesan','konsultasi','order','beli','wa','whatsapp','hubungi','tertarik','mau'].some(k => lower.includes(k));

  const chips = [];
  if (wantWA || text.toLowerCase().includes('whatsapp') || text.toLowerCase().includes('konsultasi')) {
    chips.push('Konsultasi WA');
  }
  if (text.toLowerCase().includes('portfolio') || lower.includes('contoh')) chips.push('Lihat portfolio');
  if (!chips.length) chips.push('Info harga', 'Konsultasi WA');

  addBotMessage(text, chips, wantWA);
  msgHistory.push({ role: 'assistant', content: text });
}

// ============================================
// LOCAL KB MATCHER
// ============================================
function getLocalResponse(text) {
  const lower = text.toLowerCase();
  for (const key in KB) {
    const entry = KB[key];
    if (entry.triggers.some(t => lower.includes(t))) {
      return entry;
    }
  }
  return null;
}

// ============================================
// DOM HELPERS
// ============================================
function addBotMessage(text, chips = [], showWA = false, waText = null) {
  const msgs = document.getElementById('chatbot-messages');
  if (!msgs) return;

  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const formatted = formatMarkdown(text);

  const div = document.createElement('div');
  div.className = 'msg msg-bot';

  let inner = `<div class="msg-bubble">${formatted}</div>`;

  if (showWA) {
    const msgText = waText || 'Halo Arsitek Studio, saya ingin konsultasi desain rumah';
    inner += `
      <div class="wa-handoff">
        <div class="wa-handoff-icon"><i class="fab fa-whatsapp"></i></div>
        <div class="wa-handoff-text">
          Hubungi tim kami langsung via WhatsApp untuk respons lebih cepat!
          <br>
          <a href="${WA_BASE}?text=${encodeURIComponent(msgText)}" target="_blank" class="wa-handoff-btn">
            <i class="fab fa-whatsapp"></i> Chat Sekarang
          </a>
        </div>
      </div>`;
  }

  if (chips.length) {
    inner += `<div class="quick-replies">`;
    chips.forEach(chip => {
      if (chip === 'Konsultasi WA' || chip === 'Konsultasi WA') {
        inner += `<a href="${WA_BASE}?text=${encodeURIComponent('Halo Arsitek Studio, saya ingin konsultasi')}" target="_blank" class="qr-chip">💬 ${chip}</a>`;
      } else {
        inner += `<button class="qr-chip" onclick="sendQuickReply('${chip}')">${chip}</button>`;
      }
    });
    inner += `</div>`;
  }

  inner += `<div class="msg-time">${time}</div>`;
  div.innerHTML = inner;
  msgs.appendChild(div);
  scrollMsgs();
}

function addUserMessage(text) {
  const msgs = document.getElementById('chatbot-messages');
  if (!msgs) return;
  const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = 'msg msg-user';
  div.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div><div class="msg-time">${time}</div>`;
  msgs.appendChild(div);
  scrollMsgs();
}

function showTyping() {
  const msgs = document.getElementById('chatbot-messages');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = 'msg msg-bot';
  div.id = 'typing-msg';
  div.innerHTML = `<div class="typing-indicator">
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  </div>`;
  msgs.appendChild(div);
  scrollMsgs();
}

function hideTyping() {
  document.getElementById('typing-msg')?.remove();
}

function scrollMsgs() {
  const msgs = document.getElementById('chatbot-messages');
  if (msgs) setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 50);
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function openWhatsApp(text) {
  window.open(`${WA_BASE}?text=${encodeURIComponent(text)}`, '_blank');
}

// ============================================
// INIT on load
// ============================================
document.addEventListener('DOMContentLoaded', initChatbot);
