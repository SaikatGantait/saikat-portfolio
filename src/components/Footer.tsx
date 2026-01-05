import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {currentYear} Saikat Gantait. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/SaikatGantait"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/saikat-gantait/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/skgantait"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-cyan-400 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
