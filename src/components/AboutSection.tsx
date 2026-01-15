import { Target, Eye } from "lucide-react";
const features = [{
  icon: Target,
  title: "Visi Kami",
  description: "Membentuk generasi muda yang kreatif, bersolidaritas tinggi, berakhlak mulia, bertaqwa, memiliki rasa cinta dan memakmurkan Masjid."
}, {
  icon: Eye,
  title: "Misi Kami",
  description: "",
  isList: true,
  listItems: ["Mencetak Remaja yang berkualitas, beriman dan bertaqwa kepada Allah SWT", "Menumbuhkan sikap disiplin siswa MTsN agar sholat tepat waktu", "Meningkatkan kemampuan bekerja dan latihan keorganisasian Remaja Masjid", "Melatih kerjasama Pengurus JAMAS dibawah bimbingan para Guru pembina", "Kaderisasi terencana guna melanjutkan Organisasi", "Pengadaan kegiatan yang terorientasi pada pembinaan remaja islam dan memiliki nilai positif", "Mengusahakan pengurus setiap divisi bekerja dengan baik dan professional", "Membina hubungan silaturahim yang baik antar anggota, pembina, guru, maupun siswa MTsN 1 Kota Malang"]
}];
const AboutSection = () => {
  return <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Siapa Kami
          </h2>
          <p className="text-lg text-muted-foreground">JAMAS (Remaja Masjid) adalah organisasi siswa yang didedikasikan untuk menumbuhkan nilai-nilai Islam dan ukhuwah di lingkungan sekolah kami.</p>
        </div>

        {/* Visi Misi Grid - Side by Side on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => <div key={index} className="group p-8 bg-cream rounded-2xl hover:bg-primary transition-all duration-500 hover:shadow-elegant-lg h-full">
              <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-accent flex items-center justify-center mb-6 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-accent-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-primary group-hover:text-primary-foreground mb-3 transition-colors duration-500">
                {feature.title}
              </h3>
              {feature.isList && feature.listItems ? <ol className="list-decimal list-inside space-y-2 text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                  {feature.listItems.map((item, idx) => <li key={idx} className="text-sm leading-relaxed">{item}</li>)}
                </ol> : <p className="text-muted-foreground group-hover:text-primary-foreground/80 transition-colors duration-500">
                  {feature.description}
                </p>}
            </div>)}
        </div>

        {/* Struktur Organisasi */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            Struktur Organisasi
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Kepengurusan JAMAS
          </h2>
        </div>

        {/* Organization Chart */}
        <div className="bg-cream rounded-2xl p-8 lg:p-12">
          {/* Pembina */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-center shadow-elegant">
              Pembina JAMAS
            </div>
          </div>
          
          {/* Line down */}
          <div className="flex justify-center mb-6">
            <div className="w-0.5 h-8 bg-primary/30"></div>
          </div>

          {/* Ketua 1 */}
          <div className="flex justify-center mb-6">
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-center shadow-elegant">
              Ketua 1
            </div>
          </div>

          {/* Line down */}
          <div className="flex justify-center mb-6">
            <div className="w-0.5 h-8 bg-primary/30"></div>
          </div>

          {/* Row: Sekretaris 1, Sekretaris 2, Ketua 2, Bendahara 1, Bendahara 2 */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["Sekretaris 1", "Sekretaris 2", "Ketua 2", "Bendahara 1", "Bendahara 2"].map(title => <div key={title} className="bg-background border-2 border-primary/20 px-4 py-2 rounded-lg font-medium text-primary text-sm text-center shadow-sm">
                {title}
              </div>)}
          </div>

          {/* Line down */}
          <div className="flex justify-center mb-6">
            <div className="w-0.5 h-8 bg-primary/30"></div>
          </div>

          {/* Divisi Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Divisi Keagamaan */}
            <div className="bg-background rounded-xl p-6 border-2 border-primary/20 shadow-elegant">
              <div className="text-center mb-4">
                <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold inline-block mb-3">
                  CO Keagamaan
                </div>
                <div className="w-0.5 h-4 bg-primary/30 mx-auto mb-3"></div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium inline-block mb-3">
                  Sekretaris
                </div>
                <div className="w-0.5 h-4 bg-primary/30 mx-auto mb-3"></div>
                <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold">
                  Anggota Keagamaan
                  <div className="text-sm font-normal mt-1 opacity-90">14 Anggota</div>
                </div>
              </div>
            </div>

            {/* Divisi Humas */}
            <div className="bg-background rounded-xl p-6 border-2 border-primary/20 shadow-elegant">
              <div className="text-center mb-4">
                <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold inline-block mb-3">
                  CO Humas
                </div>
                <div className="w-0.5 h-4 bg-primary/30 mx-auto mb-3"></div>
                <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium inline-block mb-3">
                  Sekretaris
                </div>
                <div className="w-0.5 h-4 bg-primary/30 mx-auto mb-3"></div>
                <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold">
                  Anggota Humas
                  <div className="text-sm font-normal mt-1 opacity-90">12 Anggota</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;