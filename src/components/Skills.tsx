import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle } from "lucide-react";

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

// Fallback data
const fallbackSkills: Skill[] = [
  { id: "1", name: "React / Next.js", level: 90, color_from: "#06b6d4", color_to: "#8b5cf6", display_order: 1 },
  { id: "2", name: "TypeScript", level: 85, color_from: "#3b82f6", color_to: "#06b6d4", display_order: 2 },
  { id: "3", name: "Node.js", level: 80, color_from: "#22c55e", color_to: "#06b6d4", display_order: 3 },
  { id: "4", name: "AWS / Cloud", level: 75, color_from: "#f97316", color_to: "#eab308", display_order: 4 },
];

const fallbackTechStack: TechStack[] = [
  { id: "1", category: "Frontend", technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"], display_order: 1 },
  { id: "2", category: "Backend", technologies: ["Node.js", "Express", "PostgreSQL"], display_order: 2 },
  { id: "3", category: "Cloud", technologies: ["AWS", "Vercel", "Docker"], display_order: 3 },
  { id: "4", category: "Tools", technologies: ["Git", "VS Code", "Figma"], display_order: 4 },
];

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, techRes] = await Promise.all([
          supabase.from('portfolio_skills').select('*').order('display_order'),
          supabase.from('portfolio_tech_stack').select('*').order('display_order')
        ]);
        
        if (skillsRes.error) {
          console.error("Error fetching skills:", skillsRes.error);
          setSkills(fallbackSkills);
          setError("Failed to load skills");
        } else if (skillsRes.data && skillsRes.data.length > 0) {
          setSkills(skillsRes.data);
        } else {
          setSkills(fallbackSkills);
        }

        if (techRes.error) {
          console.error("Error fetching tech stack:", techRes.error);
          setTechStack(fallbackTechStack);
          setError("Failed to load tech stack");
        } else if (techRes.data && techRes.data.length > 0) {
          setTechStack(techRes.data);
        } else {
          setTechStack(fallbackTechStack);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setSkills(fallbackSkills);
        setTechStack(fallbackTechStack);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6" id="skills" aria-label="Skills loading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-muted rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-muted rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6" id="skills" aria-label="Skills and technologies">
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

        {error && (
          <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground text-sm">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span>Showing cached data</span>
          </div>
        )}

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
                <div 
                  className="h-2 bg-muted rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.name}: ${skill.level}%`}
                >
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
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <h4 className="text-primary font-semibold mb-3 text-sm">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${stack.category} technologies`}>
                    {stack.technologies.map((item) => (
                      <span
                        key={item}
                        role="listitem"
                        className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
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
