import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/SaikatGantait", label: "Visit GitHub profile" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/saikat-gantait/", label: "Visit LinkedIn profile", hoverColor: "hover:text-blue-400" },
    { icon: Twitter, href: "https://x.com/skgantait", label: "Visit Twitter/X profile", hoverColor: "hover:text-primary" },
  ];

  return (
    <footer className="py-10 px-6 border-t border-white/[0.05] bg-background/50 backdrop-blur-xl" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-muted-foreground text-[13px] font-medium">
            <span className="tracking-wide">© {currentYear} Saikat Gantait.</span>
            <span className="flex items-center gap-1.5">
              Made with
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" aria-label="love" />
            </span>
          </div>

          <nav aria-label="Social media links">
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-pill text-muted-foreground ${social.hoverColor || "hover:text-foreground"}`}
                  aria-label={social.label}
                >
                  <span className="footer-pill-icon">
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="footer-pill-label">{social.label.replace("Visit ", "").replace(" profile", "")}</span>
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
