import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

import projectMindweaver from "@/assets/project-mindweaver.png";
import projectSora from "@/assets/project-sora.png";
import projectUptime from "@/assets/project-uptime.png";
import projectPokemon from "@/assets/project-pokemon.png";
import projectSentimatic from "@/assets/project-sentimatic.png";
import projectAlgoverse from "@/assets/project-algoverse.png";

const projects = [
  {
    name: "Mind Weaver 2.0",
    description: "AI-powered mind mapping and brainstorming tool with intelligent suggestions and neural network visualization.",
    tech: ["TypeScript", "React", "AI"],
    github: "https://github.com/SaikatGantait/mind-weaver-2.0",
    image: projectMindweaver,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Sora",
    description: "Modern analytics dashboard with real-time data visualization and glass morphism UI.",
    tech: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/SaikatGantait/Sora",
    image: projectSora,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Uptime",
    description: "Website monitoring and uptime tracking solution with real-time alerts and network topology.",
    tech: ["TypeScript", "Monitoring", "APIs"],
    github: "https://github.com/SaikatGantait/Uptime",
    image: projectUptime,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Pokémon Marketplace",
    description: "Trading platform for Pokémon cards with marketplace features and collection management.",
    tech: ["TypeScript", "E-commerce", "Web3"],
    github: "https://github.com/SaikatGantait/Pok-mon-Marketplace",
    image: projectPokemon,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    name: "SentimaticAI",
    description: "Sentiment analysis tool powered by machine learning for social media insights.",
    tech: ["TypeScript", "AI/ML", "NLP"],
    github: "https://github.com/SaikatGantait/sentimaticAI",
    image: projectSentimatic,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "AlgoVerse",
    description: "Algorithm visualization and learning platform with interactive data structure animations.",
    tech: ["TypeScript", "DSA", "Education"],
    github: "https://github.com/SaikatGantait/AlgoVerse",
    image: projectAlgoverse,
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
      <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl rounded-2xl`} />
      
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden h-full">
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
          
          {/* Overlay links on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-purple-500/30 hover:border-purple-400 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
            {project.name}
          </h3>
          
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors duration-300"
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
  return (
    <section className="py-24 px-6 relative" id="projects">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />
      
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
            className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4"
          >
            Portfolio
          </motion.span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto text-lg">
            A collection of projects showcasing my skills in full-stack development, AI, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

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
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105"
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