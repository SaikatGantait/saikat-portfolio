import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useState, useRef } from "react";

// Import local images for fallback
import projectMindweaver from "@/assets/project-mindweaver.png";
import projectSora from "@/assets/project-sora.png";
import projectUptime from "@/assets/project-uptime.png";
import projectPokemon from "@/assets/project-pokemon.png";
import projectSentimatic from "@/assets/project-sentimatic.png";
import projectAlgoverse from "@/assets/project-algoverse.png";

interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github: string | null;
  live_url: string | null;
  image_url: string | null;
  gradient: string;
  display_order: number;
  is_featured: boolean;
}

// Map for local images
const localImages: Record<string, string> = {
  'project-mindweaver': projectMindweaver,
  'project-sora': projectSora,
  'project-uptime': projectUptime,
  'project-pokemon': projectPokemon,
  'project-sentimatic': projectSentimatic,
  'project-algoverse': projectAlgoverse,
};

const getProjectImage = (imageUrl: string | null, projectName: string): string => {
  if (!imageUrl) return projectAlgoverse;
  
  // Check if it's a local asset reference
  for (const [key, value] of Object.entries(localImages)) {
    if (imageUrl.includes(key)) return value;
  }
  
  // Return the URL directly if it's an external URL
  if (imageUrl.startsWith('http')) return imageUrl;
  
  return projectAlgoverse;
};

const getBentoClass = (index: number) => {
  const patterns = [
    "lg:col-span-4 lg:row-span-2",
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-3 lg:row-span-2",
    "lg:col-span-3 lg:row-span-2",
    "lg:col-span-2 lg:row-span-2",
    "lg:col-span-4 lg:row-span-2",
  ];

  return patterns[index % patterns.length];
};

const fallbackProjects: Project[] = [
  {
    id: "project-mindweaver",
    name: "Mindweaver AI",
    description: "An AI-powered research assistant for summarizing papers and generating insights.",
    tech: ["React", "TypeScript", "Tailwind", "AI"],
    github: null,
    live_url: null,
    image_url: "project-mindweaver",
    gradient: "from-purple-500/20 to-cyan-500/20",
    display_order: 1,
    is_featured: true,
  },
  {
    id: "project-sora",
    name: "Sora Studio",
    description: "A creative studio landing site with bold visuals and smooth motion design.",
    tech: ["Vite", "React", "Framer Motion"],
    github: null,
    live_url: null,
    image_url: "project-sora",
    gradient: "from-blue-500/20 to-violet-500/20",
    display_order: 2,
    is_featured: true,
  },
  {
    id: "project-uptime",
    name: "Uptime Radar",
    description: "Monitoring dashboard with real-time status indicators and alerting UX.",
    tech: ["React", "Charts", "TypeScript"],
    github: null,
    live_url: null,
    image_url: "project-uptime",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    display_order: 3,
    is_featured: true,
  },
  {
    id: "project-pokemon",
    name: "Pokédex Explorer",
    description: "Interactive Pokédex with search, filters, and animated stats cards.",
    tech: ["React", "API", "Tailwind"],
    github: null,
    live_url: null,
    image_url: "project-pokemon",
    gradient: "from-yellow-500/20 to-orange-500/20",
    display_order: 4,
    is_featured: true,
  },
  {
    id: "project-sentimatic",
    name: "Sentimatic",
    description: "Sentiment analysis dashboard with clean data visualization and insights.",
    tech: ["ML", "Python", "Dashboard"],
    github: null,
    live_url: null,
    image_url: "project-sentimatic",
    gradient: "from-pink-500/20 to-purple-500/20",
    display_order: 5,
    is_featured: true,
  },
  {
    id: "project-algoverse",
    name: "Algoverse",
    description: "A learning platform for algorithms with visual explanations and practice.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    github: null,
    live_url: null,
    image_url: "project-algoverse",
    gradient: "from-cyan-500/20 to-blue-500/20",
    display_order: 6,
    is_featured: true,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Update CSS custom properties for spotlight effect
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const imageUrl = getProjectImage(project.image_url, project.name);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="group relative spotlight-card bento-card"
    >
      {/* Ambient glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-2xl rounded-3xl`} />
      
      <div className="relative rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.15] transition-all duration-700 overflow-hidden h-full">
        <div className="bento-sheen" />
        {/* Project Image */}
        <div className="relative h-52 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={project.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />
          
          {/* Overlay links on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 hover:bg-primary/40 hover:border-primary/50 hover:scale-110 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 hover:bg-secondary/40 hover:border-secondary/50 hover:scale-110 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-500">
            {project.name}
          </h3>
          
          <p className="text-muted-foreground text-[13px] font-light mb-5 line-clamp-2 leading-relaxed tracking-wide">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-[11px] font-medium tracking-wide rounded-full bg-white/[0.03] text-muted-foreground border border-white/[0.08] hover:border-primary/30 hover:text-primary transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects] = useState<Project[]>(fallbackProjects);
  const [loading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const allTechs = ["All", ...new Set(projects.flatMap((p) => p.tech))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tech.includes(activeFilter));

  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden" id="projects">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-secondary/[0.07] rounded-full blur-[120px]" />
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
            className="inline-block px-5 py-2 rounded-full bg-primary/5 border border-primary/20 text-primary text-[11px] font-semibold mb-6 tracking-[0.15em] uppercase"
          >
            Portfolio
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-[-0.03em]">
            <span className="gradient-text-animated">
              Featured Projects
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            A curated collection showcasing my expertise in full-stack development, AI, and modern web technologies.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-14"
          >
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveFilter(tech)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
                  activeFilter === tech
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-white/[0.02] text-muted-foreground border border-white/[0.08] hover:border-white/20 hover:text-foreground hover:bg-white/[0.05]"
                }`}
              >
                {tech}
              </button>
            ))}
          </motion.div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden animate-pulse">
                <div className="h-48 bg-white/10" />
                <div className="p-6 space-y-3">
                  <div className="h-6 w-3/4 bg-white/10 rounded" />
                  <div className="h-4 w-full bg-white/10 rounded" />
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-white/10 rounded-full" />
                    <div className="h-6 w-16 bg-white/10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="bento-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={getBentoClass(index)}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/SaikatGantait?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:scale-105"
          >
            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
