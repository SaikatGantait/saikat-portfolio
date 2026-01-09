import { motion } from "framer-motion";
import { Github, GitCommit, Star, GitFork } from "lucide-react";
import { useState, useEffect } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GitHubActivity = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const githubUsername = "saikat-gantait";

  // Generate mock contribution data (in production, you'd fetch from GitHub API)
  useEffect(() => {
    const generateContributions = () => {
      const days: ContributionDay[] = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate realistic-looking contribution pattern
        const dayOfWeek = date.getDay();
        const random = Math.random();
        let count = 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        
        // More likely to code on weekdays
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          if (random > 0.3) {
            count = Math.floor(Math.random() * 15) + 1;
            level = count <= 3 ? 1 : count <= 6 ? 2 : count <= 10 ? 3 : 4;
          }
        } else {
          if (random > 0.6) {
            count = Math.floor(Math.random() * 8) + 1;
            level = count <= 2 ? 1 : count <= 4 ? 2 : 3;
          }
        }
        
        days.push({
          date: date.toISOString().split('T')[0],
          count,
          level
        });
      }
      
      return days;
    };
    
    setContributions(generateContributions());
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-gray-800";
      case 1: return "bg-emerald-900";
      case 2: return "bg-emerald-700";
      case 3: return "bg-emerald-500";
      case 4: return "bg-emerald-400";
      default: return "bg-gray-800";
    }
  };

  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  const currentStreak = contributions.slice().reverse().findIndex(day => day.count === 0);
  const longestStreak = contributions.reduce((max, day, i, arr) => {
    let streak = 0;
    for (let j = i; j < arr.length && arr[j].count > 0; j++) streak++;
    return Math.max(max, streak);
  }, 0);

  // Group contributions by week for the grid
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Github className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              GitHub Activity
            </h2>
          </div>
          <p className="text-gray-400">
            My contribution graph from the past year
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 md:p-8"
        >
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GitCommit className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{totalContributions}</div>
              <div className="text-sm text-gray-400">Contributions</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{currentStreak}</div>
              <div className="text-sm text-gray-400">Current Streak</div>
            </div>
            <div className="text-center p-4 bg-gray-800/50 rounded-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GitFork className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white">{longestStreak}</div>
              <div className="text-sm text-gray-400">Longest Streak</div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px] min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.2, 
                        delay: (weekIndex * 7 + dayIndex) * 0.001 
                      }}
                      viewport={{ once: true }}
                      className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-sm ${getLevelColor(day.level)} hover:ring-2 hover:ring-cyan-400 transition-all cursor-pointer`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4 text-sm text-gray-400">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[10px] h-[10px] rounded-sm ${getLevelColor(level)}`}
              />
            ))}
            <span>More</span>
          </div>

          {/* GitHub Link */}
          <div className="mt-6 text-center">
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <Github className="w-5 h-5" />
              View Full Profile on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
