import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Award, Rocket, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  icon_name: string;
  event_type: string;
  display_order: number;
}

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Rocket,
};

const About = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [timelineRes, statsRes] = await Promise.all([
        supabase.from('portfolio_timeline').select('*').order('display_order'),
        supabase.from('portfolio_stats').select('*').order('display_order').limit(3)
      ]);
      
      if (timelineRes.data) setTimeline(timelineRes.data);
      if (statsRes.data) setStats(statsRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

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
            className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
              <h3 className="text-xl font-bold text-foreground mb-4">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a developer who believes in writing clean, maintainable code and creating 
                seamless user experiences. My journey in tech started with curiosity and has 
                evolved into a passion for building innovative solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open-source projects, or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/10 text-center"
                >
                  <div className="text-2xl font-bold text-foreground">{stat.value}{stat.suffix}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
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
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

            <div className="space-y-8">
              {loading ? (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative pl-20 animate-pulse">
                    <div className="absolute left-4 w-8 h-8 rounded-full bg-white/10" />
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="h-3 w-20 bg-white/10 rounded mb-2" />
                      <div className="h-5 w-40 bg-white/10 rounded mb-2" />
                      <div className="h-4 w-full bg-white/10 rounded" />
                    </div>
                  </div>
                ))
              ) : (
                timeline.map((item, index) => {
                  const IconComponent = iconMap[item.icon_name] || Code;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="relative pl-20"
                    >
                      {/* Icon */}
                      <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center ${
                        item.event_type === "work" 
                          ? "bg-primary/20 border border-primary/50" 
                          : item.event_type === "education"
                          ? "bg-secondary/20 border border-secondary/50"
                          : "bg-accent/20 border border-accent/50"
                      }`}>
                        <IconComponent className={`w-4 h-4 ${
                          item.event_type === "work" 
                            ? "text-primary" 
                            : item.event_type === "education"
                            ? "text-secondary"
                            : "text-accent"
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                        <span className="text-xs text-muted-foreground font-mono">{item.year}</span>
                        <h4 className="text-foreground font-semibold mt-1">{item.title}</h4>
                        <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
