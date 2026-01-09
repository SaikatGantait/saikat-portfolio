import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ChevronDown, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ResumeModal from "./ResumeModal";

const useTypingEffect = (text: string, speed: number = 100) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
};

const Hero = () => {
  const { displayedText, isComplete } = useTypingEffect("SAIKAT GANTAIT", 120);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/SaikatGantait", label: "Visit my GitHub profile" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/saikat-gantait/", label: "Connect on LinkedIn" },
    { icon: Twitter, href: "https://x.com/skgantait", label: "Follow on Twitter" },
  ];

  return (
    <>
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      
      <section 
        className="min-h-screen flex flex-col items-center justify-center relative px-6"
        aria-label="Hero section"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 relative"
          >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary via-secondary to-pink-500 p-1">
            <img
              src="https://avatars.githubusercontent.com/u/88987186?v=4"
              alt="Saikat Gantait - Full Stack Developer"
              className="w-full h-full rounded-full object-cover"
              loading="eager"
            />
          </div>
          
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-emerald-400">Open to work</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary font-mono text-sm mb-2 tracking-wider"
        >
          👋 Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-4 min-h-[1.2em]"
        >
          <span className="bg-gradient-to-r from-foreground via-primary/80 to-secondary bg-clip-text text-transparent">
            {displayedText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="text-primary"
                aria-hidden="true"
              >
                |
              </motion.span>
            )}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6 flex-wrap"
          role="list"
          aria-label="Skills"
        >
          {["Full-Stack Developer", "React", "TypeScript", "Node.js", "AWS"].map((tag, i) => (
            <span
              key={tag}
              role="listitem"
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                i === 0
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-primary"
                  : "bg-white/5 border border-border text-muted-foreground"
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground max-w-md mx-auto mb-8 text-lg"
        >
          Builder of snappy UIs & solid APIs. Clean code, sleek design, smooth deploys.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Resume Preview Button */}
          <Button 
            onClick={() => setIsResumeOpen(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 group"
            aria-label="View my resume"
          >
            <FileText className="w-4 h-4 mr-2 group-hover:animate-bounce" aria-hidden="true" />
            View Resume
          </Button>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-border hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon 
                    className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" 
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </nav>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </motion.div>
      </motion.div>
      </section>
    </>
  );
};

export default Hero;
