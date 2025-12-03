import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Activities", path: "/#activities" },
  { name: "Da'wah", path: "/blog" },
  { name: "Contact", path: "/#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path: string) => {
    if (path.startsWith("/#")) {
      const elementId = path.substring(2);
      if (location.pathname === "/") {
        const element = document.getElementById(elementId);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant"
          : "bg-transparent"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">J</span>
            </div>
            <span className={cn(
              "font-bold text-xl transition-colors duration-300",
              isScrolled ? "text-primary" : "text-primary"
            )}>
              JAMAS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                {link.path.startsWith("/#") ? (
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={cn(
                      "font-medium transition-colors duration-300 hover:text-accent relative py-2",
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
                      isScrolled ? "text-foreground" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "font-medium transition-colors duration-300 hover:text-accent relative py-2",
                      "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full",
                      location.pathname === link.path && "text-accent after:w-full"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <ul className="flex flex-col gap-4 bg-background rounded-lg p-4 shadow-elegant">
            {navLinks.map((link) => (
              <li key={link.path}>
                {link.path.startsWith("/#") ? (
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className="block font-medium text-foreground hover:text-accent transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block font-medium text-foreground hover:text-accent transition-colors py-2",
                      location.pathname === link.path && "text-accent"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
