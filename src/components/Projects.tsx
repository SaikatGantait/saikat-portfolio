import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";

const projects = [
  {
    name: "Mind Weaver 2.0",
    description: "AI-powered mind mapping and brainstorming tool with intelligent suggestions.",
    tech: ["TypeScript", "React", "AI"],
    github: "https://github.com/SaikatGantait/mind-weaver-2.0",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Sora",
    description: "Modern web application built with cutting-edge technologies.",
    tech: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/SaikatGantait/Sora",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Uptime",
    description: "Website monitoring and uptime tracking solution.",
    tech: ["TypeScript", "Monitoring", "APIs"],
    github: "https://github.com/SaikatGantait/Uptime",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Pokémon Marketplace",
    description: "Trading platform for Pokémon cards with marketplace features.",
    tech: ["TypeScript", "E-commerce", "Web3"],
    github: "https://github.com/SaikatGantait/Pok-mon-Marketplace",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    name: "SentimaticAI",
    description: "Sentiment analysis tool powered by machine learning.",
    tech: ["TypeScript", "AI/ML", "NLP"],
    github: "https://github.com/SaikatGantait/sentimaticAI",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "AlgoVerse",
    description: "Algorithm visualization and learning platform.",
    tech: ["TypeScript", "DSA", "Education"],
    github: "https://github.com/SaikatGantait/AlgoVerse",
    gradient: "from-indigo-500 to-violet-600",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" 
        style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      />
      <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4`}>
          <Star className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {project.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Github className="w-4 h-4" />
            Code
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section className="py-20 px-6" id="projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            A collection of projects I've built, showcasing my skills in full-stack development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/SaikatGantait?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
