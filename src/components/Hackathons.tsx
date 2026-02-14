import { motion } from "framer-motion";
import { Trophy, Award, Calendar, ExternalLink, Code2, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface HackathonItem {
  id: string;
  year: string;
  title: string;
  description: string;
  display_order: number;
}

const fallbackHackathons: HackathonItem[] = [
  {
    id: "2025-aptos",
    year: "2025",
    title: "Aptos Hackathon Winner",
    description: "Won Aptos blockchain hackathon building decentralized applications on Move.",
    display_order: 1,
  },
  {
    id: "2025-algorand",
    year: "2025",
    title: "Algorand Hackathon Winner",
    description: "First place at Algorand hackathon developing smart contract solutions.",
    display_order: 2,
  },
  {
    id: "2025-avalanche",
    year: "2025",
    title: "Avalanche Hackathon Winner",
    description: "Won Avalanche hackathon creating DeFi protocols and dApps.",
    display_order: 3,
  },
  {
    id: "2025-sidetripe",
    year: "2025",
    title: "Sidetripe Hackathon Winner",
    description: "Champion at Sidetripe hackathon building innovative web3 solutions.",
    display_order: 4,
  },
];

const Hackathons = () => {
  const [hackathons, setHackathons] = useState<HackathonItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_timeline')
          .select('*')
          .eq('event_type', 'achievement')
          .order('display_order');

        if (error) {
          console.error("Error fetching hackathons:", error);
          setHackathons(fallbackHackathons);
        } else if (data && data.length > 0) {
          setHackathons(data);
        } else {
          setHackathons(fallbackHackathons);
        }
      } catch (err) {
        console.error("Error:", err);
        setHackathons(fallbackHackathons);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  return (
    <section
      className="py-24 md:py-32 px-6 relative overflow-hidden"
      id="hackathons"
      aria-label="Hackathon achievements section"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
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
            className="inline-block px-5 py-2 rounded-full bg-yellow-500/5 border border-yellow-500/20 text-yellow-400 text-[11px] font-semibold mb-6 tracking-[0.15em] uppercase"
          >
            🏆 Achievements
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-[-0.03em]">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Hackathon Victories
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed font-light tracking-wide">
            Winning projects across blockchain ecosystems and innovative challenges
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-white/[0.02] border border-white/[0.05] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/[0.08] hover:border-yellow-500/30 transition-all duration-500 overflow-hidden backdrop-blur-sm">
                  {/* Hover gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-orange-500/0 to-red-500/0 group-hover:from-yellow-500/5 group-hover:via-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 rounded-2xl" />
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-shimmer" />
                  </div>

                  <div className="relative z-10">
                    {/* Trophy Icon */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="w-7 h-7 text-yellow-400" />
                      </div>
                      <div className="flex items-center gap-2 text-yellow-400/70 text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        {hackathon.year}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-yellow-400 transition-colors duration-300">
                      {hackathon.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {hackathon.description}
                    </p>

                    {/* Badge */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                        <Award className="w-3.5 h-3.5 text-yellow-400" />
                        <span className="text-xs font-semibold text-yellow-400">Winner</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                        <Zap className="w-3.5 h-3.5 text-orange-400" />
                        <span className="text-xs font-medium text-muted-foreground">Blockchain</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-yellow-500/0 to-orange-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 blur-2xl rounded-2xl transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 border border-yellow-500/20 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">{hackathons.length}</div>
              <div className="text-muted-foreground text-sm font-medium tracking-wide">Hackathons Won</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">100%</div>
              <div className="text-muted-foreground text-sm font-medium tracking-wide">Win Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-400 mb-2">2025</div>
              <div className="text-muted-foreground text-sm font-medium tracking-wide">Active Year</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hackathons;
