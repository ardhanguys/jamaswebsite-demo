import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c263?w=1920&q=80",
    title: "Kajian Rutin",
    subtitle: "Mendalami ilmu agama bersama ustadz dan mentor terpercaya",
  },
  {
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1920&q=80",
    title: "Kegiatan Sosial",
    subtitle: "Berbagi kebaikan dan membantu sesama melalui aksi nyata",
  },
  {
    image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=1920&q=80",
    title: "Kebersamaan",
    subtitle: "Mempererat ukhuwah islamiyah di lingkungan sekolah",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-4">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-accent/90 text-accent-foreground text-sm font-medium rounded-full mb-4 animate-fade-in">
              JAMAS MATSANEWA
            </span>
            <h1
              key={`title-${current}`}
              className="text-4xl md:text-6xl font-bold text-white mb-3 animate-slide-up"
            >
              {heroSlides[current].title}
            </h1>
            <p
              key={`sub-${current}`}
              className="text-lg md:text-xl text-white/80 mb-8 animate-slide-up stagger-1"
            >
              {heroSlides[current].subtitle}
            </p>
            <div className="flex gap-4 animate-slide-up stagger-2">
              <Link to="/blog" className="btn-primary inline-flex items-center gap-2 group">
                Lihat Dakwah
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-white/60 text-white hover:bg-white/10 transition-all duration-300 px-6 py-3 rounded-lg font-medium"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Dots & Arrows */}
          <div className="flex items-center gap-4 mt-10">
            <button onClick={prev} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-accent" : "w-4 bg-white/40"
                  }`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
