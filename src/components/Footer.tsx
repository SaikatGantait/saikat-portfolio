import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/SaikatGantait", label: "Visit GitHub profile" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/saikat-gantait/", label: "Visit LinkedIn profile", hoverColor: "hover:text-blue-400" },
    { icon: Twitter, href: "https://x.com/skgantait", label: "Visit Twitter/X profile", hoverColor: "hover:text-primary" },
  ];

  return (
    <footer className="py-8 px-6 border-t border-border" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>© {currentYear} Saikat Gantait. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" aria-label="love" />
          </div>

          <nav aria-label="Social media links">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted-foreground ${social.hoverColor || "hover:text-foreground"} transition-colors p-2 rounded-full hover:bg-white/5`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
