import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Award } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "Full-Stack Developer",
    description: "Building modern web applications with React, TypeScript, and cloud technologies.",
    icon: Code,
    type: "work",
  },
  {
    year: "2023",
    title: "Started Open Source Journey",
    description: "Contributing to various open-source projects and building personal projects.",
    icon: Award,
    type: "achievement",
  },
  {
    year: "2022",
    title: "Computer Science Degree",
    description: "Graduated with a focus on software engineering and data structures.",
    icon: GraduationCap,
    type: "education",
  },
  {
    year: "2021",
    title: "First Developer Role",
    description: "Started my journey as a junior developer, learning the fundamentals of web development.",
    icon: Briefcase,
    type: "work",
  },
];

const About = () => {
  return (
    <section className="py-20 px-6" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I'm a passionate full-stack developer from Kolkata, India. I love building things that live on the internet 
            and turning complex problems into simple, beautiful solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Who I Am</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                I'm a developer who believes in writing clean, maintainable code and creating 
                seamless user experiences. My journey in tech started with curiosity and has 
                evolved into a passion for building innovative solutions.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "20+", label: "Projects" },
                { number: "3+", label: "Years Exp" },
                { number: "10+", label: "Technologies" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 text-center"
                >
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative pl-20"
                >
                  {/* Icon */}
                  <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                    item.type === "work" 
                      ? "bg-cyan-500/20 border border-cyan-500/50" 
                      : item.type === "education"
                      ? "bg-purple-500/20 border border-purple-500/50"
                      : "bg-pink-500/20 border border-pink-500/50"
                  }`}>
                    <item.icon className={`w-4 h-4 ${
                      item.type === "work" 
                        ? "text-cyan-400" 
                        : item.type === "education"
                        ? "text-purple-400"
                        : "text-pink-400"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                    <span className="text-xs text-gray-500 font-mono">{item.year}</span>
                    <h4 className="text-white font-semibold mt-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
