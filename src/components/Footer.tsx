import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Follow Us
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              Stay connected with JAMAS through our social media channels.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
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
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Da'wah Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  About JAMAS
                </Link>
              </li>
              <li>
                <Link
                  to="/#activities"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Our Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/login"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              Location
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  School Mosque, Building A<br />
                  Jl. Education No. 123<br />
                  Jakarta, Indonesia
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-accent flex-shrink-0" />
                <a
                  href="mailto:jamas@school.edu"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  jamas@school.edu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-accent flex-shrink-0" />
                <a
                  href="tel:+62123456789"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  +62 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60">
            © {new Date().getFullYear()} JAMAS - School Mosque Congregation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
