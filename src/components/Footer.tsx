import { Link } from "react-router-dom";
import { Instagram, Youtube, MapPin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Ikuti Kami
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Tetap terhubung dengan JAMAS melalui media sosial kami.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/jamas_matsanewa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@JAMASMatsanewa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Sumber Daya
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Artikel Dakwah
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Tentang JAMAS
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Kegiatan Kami
                </button>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Portal Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Lokasi
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/8diYYJscoifqPd9g9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Masjid Al Fajr<br />
                  MTsN 1 Kota Malang
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:remajamasjid.matsanewa@gmail.com"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  remajamasjid.matsanewa@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} JAMAS Matsanewa. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
