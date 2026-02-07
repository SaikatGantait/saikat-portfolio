import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ChevronDown, FileText, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ResumeModal from "./ResumeModal";
import MagneticButton from "./MagneticButton";

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
        {/* Premium background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-subtle-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] animate-subtle-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center z-10 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
            className="mb-8 mt-32 relative inline-block"
          >
            <div className="w-36 h-36 mx-auto rounded-full p-[3px] bg-gradient-to-br from-primary via-secondary to-pink-500 glow-lg">
              <div className="w-full h-full rounded-full p-[3px] bg-background">
                <img
                  src="https://avatars.githubusercontent.com/u/88987186?v=4"
                  alt="Saikat Gantait - Full Stack Developer"
                  className="w-full h-full rounded-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl shadow-lg shadow-emerald-500/10">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 tracking-[0.08em] uppercase">Available for work</span>
              </div>
            </motion.div>
          </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-primary/70 font-mono text-xs mb-4 tracking-[0.3em] uppercase font-medium"
        >
          Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 min-h-[1.2em] tracking-[-0.04em] px-4"
        >
          <span className="bg-gradient-to-r from-white via-primary/90 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient drop-shadow-sm">
            {displayedText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
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
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center justify-center gap-2.5 mb-8 flex-wrap"
          role="list"
          aria-label="Skills"
        >
          {["Full-Stack Developer", "React", "TypeScript", "Node.js", "AWS"].map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              role="listitem"
              className={`px-4 py-2 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                i === 0
                  ? "bg-gradient-to-r from-primary/15 to-secondary/15 border border-primary/30 text-primary hover:border-primary/50 shadow-lg shadow-primary/5"
                  : "bg-white/[0.02] border border-white/[0.08] text-muted-foreground/80 hover:border-white/20 hover:bg-white/[0.05] hover:text-muted-foreground"
              }`}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-muted-foreground/80 max-w-xl mx-auto mb-12 text-lg md:text-xl leading-relaxed font-light tracking-wide"
        >
          Crafting <span className="text-foreground font-normal">exceptional digital experiences</span> with clean code and thoughtful design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Resume Preview Button */}
          <MagneticButton strength={0.2}>
            <Button 
              onClick={() => setIsResumeOpen(true)}
              className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 py-6 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-500 group overflow-hidden"
              aria-label="View my resume"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center gap-2">
                <FileText className="w-5 h-5 group-hover:rotate-6 transition-transform duration-300" aria-hidden="true" />
                View Resume
                <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" aria-hidden="true" />
              </span>
            </Button>
          </MagneticButton>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <div className="flex items-center gap-2">
              {socialLinks.map((social, index) => (
                <MagneticButton key={social.label} strength={0.4}>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="p-3 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-primary/50 transition-all duration-300 group flex items-center justify-center"
                    aria-label={social.label}
                  >
                    <social.icon 
                      className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" 
                      aria-hidden="true"
                    />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </nav>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </motion.div>
      </motion.div>
      </section>
    </>
  );
};

export default Hero;
