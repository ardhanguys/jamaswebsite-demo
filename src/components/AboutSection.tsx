import { Target, Eye, BookOpen, Users, Heart, Calendar } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Our Vision",
    description: "To become a leading school mosque congregation that nurtures young Muslims with strong faith, noble character, and academic excellence."
  },
  {
    icon: Eye,
    title: "Our Mission",
    description: "Facilitate Islamic education, strengthen brotherhood among students, and contribute to the school community through beneficial programs."
  },
  {
    icon: BookOpen,
    title: "Islamic Education",
    description: "Weekly study circles covering Quran recitation, Hadith studies, Islamic history, and contemporary Muslim issues."
  },
  {
    icon: Users,
    title: "Brotherhood",
    description: "Building lasting friendships based on faith, mutual support during academic and personal challenges."
  },
  {
    icon: Heart,
    title: "Community Service",
    description: "Regular charity programs, mosque maintenance, and outreach activities to serve both school and local communities."
  },
  {
    icon: Calendar,
    title: "Annual Events",
    description: "Islamic Day celebrations, Ramadan programs, Eid gatherings, and inter-school Islamic competitions."
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-muted-foreground">
            JAMAS (Jamaah Masjid Sekolah) is a student organization dedicated to 
            fostering Islamic values and brotherhood within our school community.
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
