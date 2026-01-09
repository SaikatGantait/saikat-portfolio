import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  name: string;
  level: number;
  color_from: string;
  color_to: string;
  display_order: number;
}

interface TechStack {
  id: string;
  category: string;
  technologies: string[];
  display_order: number;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [skillsRes, techRes] = await Promise.all([
        supabase.from('portfolio_skills').select('*').order('display_order'),
        supabase.from('portfolio_tech_stack').select('*').order('display_order')
      ]);
      
      if (skillsRes.data) setSkills(skillsRes.data);
      if (techRes.data) setTechStack(techRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6" id="skills">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-white/10 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-white/10 rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

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
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            My technical arsenal for building modern, scalable applications.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Core Competencies</h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-foreground/80 font-medium">{skill.name}</span>
                  <span className="text-muted-foreground text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(to right, ${skill.color_from}, ${skill.color_to})`
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-6">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((stack, index) => (
                <motion.div
                  key={stack.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <h4 className="text-primary font-semibold mb-3 text-sm">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 text-xs rounded-md bg-white/5 text-muted-foreground"
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
