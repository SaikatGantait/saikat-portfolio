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

const fallbackTimeline: TimelineItem[] = [
  {
    id: "2025-aptos",
    year: "2025",
    title: "Aptos Hackathon Winner",
    description: "Won Aptos blockchain hackathon building decentralized applications on Move.",
    icon_name: "Award",
    event_type: "achievement",
    display_order: 1,
  },
  {
    id: "2025-algorand",
    year: "2025",
    title: "Algorand Hackathon Winner",
    description: "First place at Algorand hackathon developing smart contract solutions.",
    icon_name: "Award",
    event_type: "achievement",
    display_order: 2,
  },
  {
    id: "2025-avalanche",
    year: "2025",
    title: "Avalanche Hackathon Winner",
    description: "Won Avalanche hackathon creating DeFi protocols and dApps.",
    icon_name: "Award",
    event_type: "achievement",
    display_order: 3,
  },
  {
    id: "2025-sidetripe",
    year: "2025",
    title: "Sidetripe Hackathon Winner",
    description: "Champion at Sidetripe hackathon building innovative web3 solutions.",
    icon_name: "Award",
    event_type: "achievement",
    display_order: 4,
  },
  {
    id: "2024-intern",
    year: "2024",
    title: "AI Research Intern",
    description: "Working on cutting-edge machine learning projects.",
    icon_name: "Briefcase",
    event_type: "work",
    display_order: 5,
  },
  {
    id: "2023-oss",
    year: "2023",
    title: "Open Source Contributor",
    description: "Major contributions to ML libraries.",
    icon_name: "Code",
    event_type: "achievement",
    display_order: 6,
  },
  {
    id: "2022-btech",
    year: "2022",
    title: "Started B.Tech",
    description: "Computer Science with AI specialization.",
    icon_name: "GraduationCap",
    event_type: "education",
    display_order: 7,
  },
  {
    id: "2022-ml",
    year: "2022",
    title: "First ML Project",
    description: "Built sentiment analysis system.",
    icon_name: "Rocket",
    event_type: "achievement",
    display_order: 8,
  },
];

const About = () => {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [timelineRes, statsRes] = await Promise.all([
        supabase.from('portfolio_timeline').select('*').order('display_order'),
        supabase.from('portfolio_stats').select('*').order('display_order').limit(3)
      ]);

      if (timelineRes.error) {
        console.warn('Failed to load timeline, using fallback data.', timelineRes.error);
      }

      const timelineData = timelineRes.data && timelineRes.data.length > 0
        ? timelineRes.data
        : fallbackTimeline;

      setTimeline(timelineData);

      if (statsRes.error) {
        console.warn('Failed to load stats.', statsRes.error);
      }

      if (statsRes.data && statsRes.data.length > 0) setStats(statsRes.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="about">
      {/* Premium background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/[0.05] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px]" />
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
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-[-0.03em]">
            <span className="gradient-text-animated">
              My Journey
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light tracking-wide">
            I'm a passionate full-stack developer from Kolkata, India. I love building things that live on the internet 
            and turning complex problems into simple, beautiful solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl glass-strong hover:border-white/[0.16] transition-all duration-500">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground mb-4">Who I Am</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 font-light tracking-wide">
                I'm a developer who believes in writing clean, maintainable code and creating 
                seamless user experiences. My journey in tech started with curiosity and has 
                evolved into a passion for building innovative solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light tracking-wide">
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
                      className="relative pl-20 timeline-item"
                    >
                      {/* Icon */}
                      <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center timeline-dot ${
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
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        onMouseEnter={() => setActiveTimeline(item.id)}
                        onMouseLeave={() => setActiveTimeline(null)}
                        onFocus={() => setActiveTimeline(item.id)}
                        onBlur={() => setActiveTimeline(null)}
                        tabIndex={0}
                        role="button"
                        aria-pressed={activeTimeline === item.id}
                        className={`p-5 rounded-2xl timeline-card ${activeTimeline === item.id ? "is-active" : ""}`}
                      >
                        <span className="text-[11px] text-muted-foreground font-mono tracking-[0.2em] uppercase">{item.year}</span>
                        <h4 className="text-foreground font-semibold mt-2">{item.title}</h4>
                        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
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
