import { Target, Eye, BookOpen, Users, Heart, Calendar } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Visi Kami",
    description: "Membentuk generasi muda yang kreatif, bersolidaritas tinggi, berakhlak mulia, bertaqwa, memiliki rasa cinta dan memakmurkan Masjid."
  },
  {
    icon: Eye,
    title: "Misi Kami",
    description: "",
    isList: true,
    listItems: [
      "Mencetak Remaja yang berkualitas, beriman dan bertaqwa kepada Allah SWT",
      "Menumbuhkan sikap disiplin siswa MTsN agar sholat tepat waktu",
      "Meningkatkan kemampuan bekerja dan latihan keorganisasian Remaja Masjid",
      "Melatih kerjasama Pengurus JAMAS dibawah bimbingan para Guru pembina",
      "Kaderisasi terencana guna melanjutkan Organisasi",
      "Pengadaan kegiatan yang terorientasi pada pembinaan remaja islam dan memiliki nilai positif",
      "Mengusahakan pengurus setiap divisi bekerja dengan baik dan professional",
      "Membina hubungan silaturahim yang baik antar anggota, pembina, guru, maupun siswa MTsN 1 Kota Malang"
    ]
  },
  {
    icon: BookOpen,
    title: "Pendidikan Islam",
    description: "Kajian mingguan meliputi tadarus Al-Quran, kajian hadits, sejarah Islam, dan isu-isu kontemporer umat Muslim."
  },
  {
    icon: Users,
    title: "Ukhuwah",
    description: "Membangun persahabatan yang langgeng berdasarkan iman, saling mendukung dalam tantangan akademik dan pribadi."
  },
  {
    icon: Heart,
    title: "Bakti Sosial",
    description: "Program amal rutin, perawatan masjid, dan kegiatan sosial untuk melayani komunitas sekolah dan masyarakat sekitar."
  },
  {
    icon: Calendar,
    title: "Acara Tahunan",
    description: "Perayaan Hari Besar Islam, program Ramadhan, perayaan Idul Fitri, dan lomba keislaman antar sekolah."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Siapa Kami
          </h2>
          <p className="text-lg text-muted-foreground">
            JAMAS (Jamaah Masjid Sekolah) adalah organisasi siswa yang didedikasikan untuk 
            menumbuhkan nilai-nilai Islam dan ukhuwah di lingkungan sekolah kami.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 bg-cream rounded-2xl hover:bg-primary transition-all duration-500 hover:shadow-elegant-lg ${feature.isList ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-accent flex items-center justify-center mb-6 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-accent-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary group-hover:text-primary-foreground mb-3 transition-colors duration-500">
                {feature.title}
              </h3>
              {feature.isList && feature.listItems ? (
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                  {feature.listItems.map((item, idx) => (
                    <li key={idx} className="text-sm leading-relaxed">{item}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
