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
    <span ref={ref} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
      <section className="py-20 px-4" aria-label="Statistics loading">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex flex-col items-center p-6 rounded-2xl bg-card backdrop-blur-sm border border-border animate-pulse"
                role="status"
                aria-label="Loading statistic"
              >
                <div className="w-8 h-8 bg-muted rounded-full mb-4" />
                <div className="w-16 h-10 bg-muted rounded mb-2" />
                <div className="w-20 h-4 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4" aria-label="Statistics">
      <div className="max-w-6xl mx-auto">
        {error && (
          <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground text-sm">
            <AlertTriangle className="w-4 h-4" aria-hidden="true" />
            <span>Showing cached data</span>
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          role="list"
          aria-label="Portfolio statistics"
        >
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon_name] || Code;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-6 rounded-2xl bg-card backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
                role="listitem"
              >
                <IconComponent className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                <Counter value={stat.value} suffix={stat.suffix} />
                <span className="text-muted-foreground text-sm mt-2 text-center">{stat.label}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
