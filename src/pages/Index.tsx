import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>JAMAS MATSANEWA</title>
        <meta name="description" content="JAMAS (Jamaah Masjid Sekolah) is a student organization dedicated to fostering Islamic values and brotherhood within our school community." />
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <BlogPreview />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
