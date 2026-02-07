import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, Code, Rocket, Award, LucideIcon, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon_name: string;
  display_order: number;
}

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Code,
  Rocket,
  Award,
};

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] bg-gradient-to-br from-foreground via-primary to-secondary bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
};

// Fallback data in case database fetch fails
const fallbackStats: Stat[] = [
  { id: "1", label: "Years Experience", value: 2, suffix: "+", icon_name: "Briefcase", display_order: 1 },
  { id: "2", label: "Projects Completed", value: 15, suffix: "+", icon_name: "Code", display_order: 2 },
  { id: "3", label: "Technologies", value: 10, suffix: "+", icon_name: "Rocket", display_order: 3 },
  { id: "4", label: "Hackathons Won", value: 3, suffix: "", icon_name: "Award", display_order: 4 },
];

const Stats = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_stats')
          .select('*')
          .order('display_order');
        
        if (error) {
          console.error("Error fetching stats:", error);
          setError("Failed to load stats");
          setStats(fallbackStats);
        } else if (data && data.length > 0) {
          setStats(data);
        } else {
          setStats(fallbackStats);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load stats");
        setStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-32 px-6" aria-label="Statistics loading">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex flex-col items-center p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] animate-pulse"
                role="status"
                aria-label="Loading statistic"
              >
                <div className="w-12 h-12 bg-white/[0.05] rounded-xl mb-6" />
                <div className="w-20 h-12 bg-white/[0.05] rounded mb-3" />
                <div className="w-24 h-4 bg-white/[0.05] rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 px-6 relative" aria-label="Statistics">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {error && (
          <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground text-sm">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span>Showing cached data</span>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          role="list"
          aria-label="Portfolio statistics"
        >
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon_name] || Code;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] hover:border-primary/20 transition-all duration-500 hover:bg-white/[0.04]"
                role="listitem"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <IconComponent className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <Counter value={stat.value} suffix={stat.suffix} />
                <span className="text-muted-foreground text-[13px] mt-3 text-center font-medium tracking-wide uppercase">{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
