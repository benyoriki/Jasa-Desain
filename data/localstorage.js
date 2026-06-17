// ============================================
// ARSITEK STUDIO - LocalStorage Data
// ============================================

const STORAGE_KEYS = {
  PORTFOLIO: 'arsitek_portfolio',
  BLOG: 'arsitek_blog',
  TESTIMONIALS: 'arsitek_testimonials',
  VIDEOS: 'arsitek_videos',
  TEAM: 'arsitek_team',
  SETTINGS: 'arsitek_settings',
  THEME: 'arsitek_theme',
  NEWSLETTER: 'arsitek_newsletter',
};

const DEFAULT_DATA = {
  portfolio: [
    {
      id: 1,
      name: "Serenata House",
      category: "Modern",
      year: "2025",
      location: "Pamulang, Tangerang Selatan",
      land: "550 m²",
      floor: "365 m²",
      bedroom: 5,
      bathroom: 3,
      carport: true,
      pool: false,
      floors: 1,
      description: "Hunian modern klasik satu lantai yang dirancang sebagai ruang tenang di tengah hiruk pikuk kawasan Pamulang. Berdiri di lahan hook dengan pendekatan desain yang menjaga privasi dan kenyamanan termal, rumah ini menghadirkan suasana hangat, dewasa, dan elegan.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
    },
    {
      id: 2,
      name: "The Tranquil House",
      category: "Minimalis",
      year: "2025",
      location: "Bogor, Jawa Barat",
      land: "235 m²",
      floor: "390 m²",
      bedroom: 5,
      bathroom: 4,
      carport: true,
      pool: false,
      floors: 3,
      description: "Hunian modern kontemporer tiga lantai yang dirancang sebagai ruang tenang untuk menikmati masa hidup yang lebih pelan dan bermakna. Setiap detail dirancang dengan presisi untuk menciptakan harmoni antara estetika dan fungsi.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    },
    {
      id: 3,
      name: "Casa Verde",
      category: "Tropis",
      year: "2024",
      location: "Semarang, Jawa Tengah",
      land: "420 m²",
      floor: "280 m²",
      bedroom: 4,
      bathroom: 3,
      carport: true,
      pool: true,
      floors: 2,
      description: "Rumah tropis kontemporer yang memanfaatkan angin alami dan cahaya matahari optimal. Taman internal yang menghubungkan setiap ruangan menciptakan sensasi hidup di alam, namun tetap terasa mewah dan modern.",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80"
    },
    {
      id: 4,
      name: "The Horizon Estate",
      category: "Modern",
      year: "2024",
      location: "Jakarta Selatan, DKI Jakarta",
      land: "800 m²",
      floor: "640 m²",
      bedroom: 6,
      bathroom: 5,
      carport: true,
      pool: true,
      floors: 2,
      description: "Hunian mewah dua lantai dengan konsep open plan yang dramatis. Kolam renang dengan view taman belakang menjadi focal point utama. Setiap sudut dirancang untuk menghadirkan kesan kemewahan yang halus namun berkesan.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80"
    },
    {
      id: 5,
      name: "Bali Retreat House",
      category: "Tropis",
      year: "2024",
      location: "Denpasar, Bali",
      land: "600 m²",
      floor: "350 m²",
      bedroom: 4,
      bathroom: 4,
      carport: true,
      pool: true,
      floors: 1,
      description: "Mengambil inspirasi dari arsitektur Bali tradisional yang dipadukan dengan sentuhan kontemporer. Atap joglo yang megah berpadu dengan material alami bambu dan batu paras menciptakan harmoni sempurna.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    },
    {
      id: 6,
      name: "Futura Residence",
      category: "Futuristik",
      year: "2025",
      location: "Surabaya, Jawa Timur",
      land: "310 m²",
      floor: "480 m²",
      bedroom: 5,
      bathroom: 4,
      carport: true,
      pool: false,
      floors: 3,
      description: "Desain futuristik yang berani dengan fasad geometris berteknologi tinggi. Smart home system terintegrasi penuh, panel surya tersembunyi, dan sistem manajemen energi menjadikan rumah ini hunian masa depan.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    }
  ],

  blog: [
    {
      id: 1,
      title: "10 Tren Arsitektur Rumah Modern di Indonesia 2025",
      category: "Inspirasi",
      excerpt: "Arsitektur rumah Indonesia semakin berkembang dengan memadukan kearifan lokal dan teknologi modern. Dari rumah bambu kontemporer hingga smart home dengan AI.",
      date: "15 Mei 2025",
      readTime: "5 menit",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
    },
    {
      id: 2,
      title: "Tips Memaksimalkan Ruang Kecil dengan Desain Minimalis",
      category: "Tips",
      excerpt: "Rumah dengan lahan terbatas bukan berarti harus mengorbankan estetika dan kenyamanan. Berikut strategi cerdas dari arsitek profesional kami.",
      date: "10 Mei 2025",
      readTime: "4 menit",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
    },
    {
      id: 3,
      title: "Konsep Rumah Tropis: Nyaman Tanpa AC di Iklim Tropis",
      category: "Arsitektur",
      excerpt: "Desain rumah tropis yang baik mampu menciptakan kenyamanan alami tanpa ketergantungan AC berlebihan. Simak bagaimana ventilasi silang dan material tepat bekerja.",
      date: "5 Mei 2025",
      readTime: "6 menit",
      image: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=600&q=80"
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Bapak Hendri Santoso",
      title: "Pengusaha, Jakarta",
      text: "Sibambo Studio benar-benar memahami apa yang kami inginkan. Mereka tidak hanya mendesain rumah, tapi menciptakan ruang hidup yang mencerminkan kepribadian keluarga kami. Setiap detail dipikirkan dengan matang, hasilnya melampaui ekspektasi kami.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
    },
    {
      id: 2,
      name: "Ibu Ratna Dewi",
      title: "Direktur, Bandung",
      text: "Proses desain yang sangat profesional dan komunikasi yang excellent. Tim Arsitek Studio selalu responsif dan memberikan solusi kreatif untuk setiap tantangan yang muncul. Rumah impian kami akhirnya terwujud tepat waktu dan sesuai budget.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
    },
    {
      id: 3,
      name: "Pak Dimas Prayogo",
      title: "Engineer, Surabaya",
      text: "Yang membuat saya terkesan adalah pendekatan mereka yang sangat personal. Mereka benar-benar mendengarkan dan mengintegrasikan kebutuhan spesifik keluarga kami ke dalam desain. Hasilnya adalah rumah yang indah sekaligus sangat fungsional.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80"
    }
  ],

  videos: [
    {
      id: 1,
      title: "Serenata House — Full Tour",
      subtitle: "House Tour 2025",
      youtubeId: "dQw4w9WgXcQ",
      thumb: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Futura Residence",
      subtitle: "Modern Architecture",
      youtubeId: "dQw4w9WgXcQ",
      thumb: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      featured: false
    },
    {
      id: 3,
      title: "Bali Retreat House",
      subtitle: "Tropical Design",
      youtubeId: "dQw4w9WgXcQ",
      thumb: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
      featured: false
    }
  ],

  team: [
    {
      id: 1,
      name: "Arya Prasetyo",
      role: "Principal Architect",
      instagram: "#",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
    },
    {
      id: 2,
      name: "Nadira Salsabila",
      role: "Lead Interior Designer",
      instagram: "#",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
    },
    {
      id: 3,
      name: "Reza Firmansyah",
      role: "Senior Architect",
      instagram: "#",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80"
    },
    {
      id: 4,
      name: "Citra Maharani",
      role: "3D Visualization",
      instagram: "#",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80"
    }
  ]
};

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PORTFOLIO)) {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(DEFAULT_DATA.portfolio));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BLOG)) {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(DEFAULT_DATA.blog));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_DATA.testimonials));
  }
  if (!localStorage.getItem(STORAGE_KEYS.VIDEOS)) {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(DEFAULT_DATA.videos));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TEAM)) {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(DEFAULT_DATA.team));
  }
}

function getStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch { return []; }
}

function setStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
