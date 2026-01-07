import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

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
  
  const socialLinks = [
    { icon: Github, href: "https://github.com/SaikatGantait", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/saikat-gantait/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/skgantait", label: "Twitter" },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
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
          className="mb-6"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-1">
            <img
              src="https://avatars.githubusercontent.com/u/88987186?v=4"
              alt="Saikat Gantait"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-cyan-400 font-mono text-sm mb-2 tracking-wider"
        >
          👋 Hello, I'm
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-7xl font-bold mb-4 min-h-[1.2em]"
        >
          <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
            {displayedText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="text-cyan-400"
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
        >
          {["Full-Stack Developer", "React", "TypeScript", "Node.js", "AWS"].map((tag, i) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                i === 0
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300"
                  : "bg-white/5 border border-white/10 text-gray-400"
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
          className="text-gray-400 max-w-md mx-auto mb-8 text-lg"
        >
          Builder of snappy UIs & solid APIs. Clean code, sleek design, smooth deploys.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <social.icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-400/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
