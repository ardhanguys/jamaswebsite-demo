import { Target, Eye, BookOpen, Users, Heart, Calendar } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Visi Kami",
    description: "Menjadi organisasi jamaah masjid sekolah terdepan yang membina generasi muda Muslim dengan iman yang kuat, akhlak mulia, dan prestasi akademik yang unggul."
  },
  {
    icon: Eye,
    title: "Misi Kami",
    description: "Memfasilitasi pendidikan Islam, memperkuat ukhuwah antar siswa, dan berkontribusi kepada komunitas sekolah melalui program-program bermanfaat."
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
              className="group p-8 bg-cream rounded-2xl hover:bg-primary transition-all duration-500 hover:shadow-elegant-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-accent flex items-center justify-center mb-6 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-accent-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary group-hover:text-primary-foreground mb-3 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
