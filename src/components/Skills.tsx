import { motion } from "framer-motion";

const skills = [
  { name: "React", level: 95, color: "from-cyan-400 to-cyan-600" },
  { name: "TypeScript", level: 90, color: "from-blue-400 to-blue-600" },
  { name: "Node.js", level: 85, color: "from-green-400 to-green-600" },
  { name: "AWS", level: 80, color: "from-orange-400 to-orange-600" },
  { name: "Python", level: 75, color: "from-yellow-400 to-yellow-600" },
  { name: "Java", level: 70, color: "from-red-400 to-red-600" },
];

const techStack = [
  { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Java", "REST APIs"] },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD", "Git", "Linux"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
];

const Skills = () => {
  return (
    <section className="py-20 px-6" id="skills">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            My technical arsenal for building modern, scalable applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-6">Core Competencies</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-6">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((stack, index) => (
                <motion.div
                  key={stack.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <h4 className="text-cyan-400 font-semibold mb-3 text-sm">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
