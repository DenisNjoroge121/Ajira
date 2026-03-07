import { Mail, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "TikTok",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      url: "https://tiktok.com/@ajiraclubku",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "https://instagram.com/ajiraclubku",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://linkedin.com/company/ajira-club-ku-kenyatta-university",
    },
    {
      name: "Gmail",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:ajiraclubku@gmail.com",
    },
  ];

  return (
    <footer className="bg-accent text-accent-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">KU</span>
              </div>
              <span className="font-heading font-bold text-lg">Ajira Club</span>
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed">
              Empowering Kenyatta University students with career opportunities, 
              professional development, and a supportive community for success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/leadership" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="/events" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="/register" className="text-accent-foreground/80 hover:text-primary transition-colors">
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="space-y-3 mb-4 text-sm">
              <p className="text-accent-foreground/80">
                <span className="font-medium">Email:</span> ajiraclub@ku.ac.ke
              </p>
              <p className="text-accent-foreground/80">
                <span className="font-medium">Phone:</span> +254 742489797
              </p>
              <p className="text-accent-foreground/80">
                <span className="font-medium">Location:</span> Kenyatta University, Nairobi
              </p>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                  aria-label={social.name}
                >
                  <span className="text-primary group-hover:text-primary-foreground transition-colors">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-accent-foreground/10 mt-8 pt-6 text-center">
          <p className="text-sm text-accent-foreground/60">
            © {new Date().getFullYear()} Kenyatta University Ajira Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
