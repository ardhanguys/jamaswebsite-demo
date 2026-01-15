export interface Post {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: "ilmu" | "kegiatan" | "pengumuman";
  date: string;
  excerpt: string;
}

const STORAGE_KEY = "jamas_posts";

const defaultPosts: Post[] = [
  {
    id: "1",
    title: "Pentingnya Sholat Lima Waktu",
    content: `<p>Sholat adalah tiang agama seorang Muslim. Ia merupakan hubungan langsung antara hamba dengan Allah SWT.</p>
    <p>Dalam kesibukan kita sebagai pelajar, mudah untuk melupakan pentingnya menjaga lima waktu sholat. Namun, sholat-sholat ini berfungsi sebagai jangkar sepanjang hari kita, mengingatkan kita akan tujuan hidup dan menjaga kita tetap berpijak pada tanah.</p>
    <h3>Manfaat Sholat yang Konsisten</h3>
    <ul>
      <li>Pembersihan spiritual dan ketenangan pikiran</li>
      <li>Manajemen waktu dan disiplin</li>
      <li>Ikatan persaudaraan saat sholat berjamaah</li>
      <li>Kesehatan fisik melalui gerakan-gerakan sholat</li>
    </ul>
    <p>JAMAS mengajak semua anggota untuk memprioritaskan sholat dan bergabung dalam sholat berjamaah di masjid sekolah.</p>`,
    thumbnail: "",
    category: "ilmu",
    date: "2024-01-15",
    excerpt: "Sholat adalah tiang agama seorang Muslim. Ia merupakan hubungan langsung antara hamba dengan Allah SWT."
  },
  {
    id: "2",
    title: "Kajian Islam Mingguan",
    content: `<p>Bergabunglah bersama kami setiap Jumat setelah sholat Jumat untuk kajian Islam mingguan di mana kita mempelajari ajaran-ajaran indah Islam.</p>
    <p>Topik minggu ini: Memahami 99 Nama Allah dan bagaimana penerapannya dalam kehidupan sehari-hari.</p>
    <h3>Apa yang Diharapkan</h3>
    <ul>
      <li>Diskusi interaktif dipimpin oleh anggota senior</li>
      <li>Sesi tanya jawab dengan guru agama sekolah</li>
      <li>Disediakan makanan ringan</li>
      <li>Sertifikat kehadiran untuk anggota aktif</li>
    </ul>`,
    thumbnail: "",
    category: "kegiatan",
    date: "2024-01-20",
    excerpt: "Bergabunglah bersama kami setiap Jumat setelah sholat Jumat untuk kajian Islam mingguan."
  },
  {
    id: "3",
    title: "Akan Datang: Hari Bersih-Bersih Masjid Sekolah",
    content: `<p>Sebagai bagian dari komitmen kami untuk menjaga tempat suci kita, JAMAS mengadakan hari bersih-bersih masjid Sabtu ini.</p>
    <p>Semua anggota diajak untuk berpartisipasi dalam kegiatan berkah ini. Rasulullah SAW bersabda: "Kebersihan adalah sebagian dari iman."</p>
    <h3>Jadwal</h3>
    <ul>
      <li>08:00 - Berkumpul dan pembagian tugas</li>
      <li>08:30 - Bersih-bersih dimulai</li>
      <li>11:00 - Istirahat dan makanan ringan</li>
      <li>12:00 - Sholat Dzuhur berjamaah</li>
    </ul>`,
    thumbnail: "",
    category: "pengumuman",
    date: "2024-01-25",
    excerpt: "Bergabunglah dalam hari bersih-bersih masjid sekolah dan raih pahala yang berlimpah."
  }
];

export const getPosts = (): Post[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with default posts
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
};

export const getPostById = (id: string): Post | undefined => {
  const posts = getPosts();
  return posts.find(post => post.id === id);
};

export const getRecentPosts = (count: number = 3): Post[] => {
  const posts = getPosts();
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const addPost = (post: Omit<Post, "id">): Post => {
  const posts = getPosts();
  const newPost: Post = {
    ...post,
    id: Date.now().toString()
  };
  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

export const updatePost = (id: string, updates: Partial<Post>): Post | null => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return posts[index];
};

export const deletePost = (id: string): boolean => {
  const posts = getPosts();
  const filtered = posts.filter(post => post.id !== id);
  if (filtered.length === posts.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

export const getCategoryLabel = (category: string): string => {
  const labels: Record<string, string> = {
    ilmu: "Ilmu & Kajian",
    kegiatan: "Kegiatan",
    pengumuman: "Pengumuman"
  };
  return labels[category] || category;
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    ilmu: "bg-emerald-600 text-white",
    kegiatan: "bg-amber-500 text-white",
    pengumuman: "bg-sky-500 text-white"
  };
  return colors[category] || "bg-muted text-muted-foreground";
};
