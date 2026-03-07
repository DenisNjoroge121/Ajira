import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ajiraLogo from "@/assets/ajira-logo.jpeg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/leadership", label: "Leadership" },
    { path: "/achievements", label: "Achievements" },
    { path: "/events", label: "Events" },
    { path: "/blogs", label: "Blogs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div className="relative bg-white p-1 rounded-2xl shadow-xl ring-4 ring-primary/30 group-hover:ring-primary/60 transition-all duration-300">
                <img 
                  src={ajiraLogo} 
                  alt="KU Ajira Club Logo" 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl sm:text-2xl text-foreground">KU Ajira Club</span>
              <span className="text-xs sm:text-sm text-muted-foreground">Empowering Careers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-body font-medium text-sm transition-all ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="default" className="ml-4">
              <Link to="/register">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg font-body font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="default" className="mx-4 mt-2">
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Join Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
