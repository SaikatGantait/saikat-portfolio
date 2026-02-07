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

const getTechBentoClass = (index: number) => {
  const patterns = [
    "lg:col-span-4 lg:row-span-2",
    "lg:col-span-2 lg:row-span-1",
    "lg:col-span-2 lg:row-span-1",
    "lg:col-span-6 lg:row-span-1",
  ];

  return patterns[index % patterns.length];
};

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
      <section className="py-24 md:py-32 px-6" id="skills" aria-label="Skills loading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-64 bg-white/[0.03] rounded-lg mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-96 bg-white/[0.03] rounded mx-auto animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="skills" aria-label="Skills and technologies">
      {/* Premium background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-primary/[0.05] via-purple-500/[0.03] to-secondary/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-5 py-2 rounded-full bg-secondary/5 border border-secondary/20 text-secondary text-[11px] font-semibold mb-6 tracking-[0.15em] uppercase"
          >
            Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-[-0.03em]">
            <span className="gradient-text-animated">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed font-light tracking-wide">
            My technical arsenal for building modern, scalable applications.
          </p>
        </motion.div>

        {error && (
          <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground text-sm">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span>Showing cached data</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill Bars */}
          <div className="space-y-8">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-primary to-transparent" />
              Core Competencies
            </h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div className="flex justify-between mb-3">
                  <span className="text-foreground/90 font-medium tracking-wide">{skill.name}</span>
                  <span className="text-muted-foreground text-[13px] font-medium tabular-nums">{skill.level}%</span>
                </div>
                <div 
                  className="h-2 bg-white/[0.05] rounded-full overflow-hidden backdrop-blur-sm"
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
                    transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color_from}, ${skill.color_to})`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Grid */}
          <div className="space-y-8">
            <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-gradient-to-r from-secondary to-transparent" />
              Tech Stack
            </h3>
            <div className="bento-grid bento-grid-compact">
              {techStack.map((stack, index) => (
                <motion.div
                  key={stack.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                  className={`group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 bento-card ${getTechBentoClass(index)}`}
                >
                  <div className="bento-sheen" />
                  <h4 className="text-primary font-semibold mb-4 text-[13px] tracking-[0.1em] uppercase">{stack.category}</h4>
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${stack.category} technologies`}>
                    {stack.technologies.map((item) => (
                      <span
                        key={item}
                        role="listitem"
                        className="px-3 py-1.5 text-[11px] font-medium tracking-wide rounded-lg bg-white/[0.03] text-muted-foreground border border-white/[0.05] hover:border-primary/30 hover:text-primary transition-all duration-300"
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
