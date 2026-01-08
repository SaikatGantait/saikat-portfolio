import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react";

const blogPosts = [
  {
    title: "Building Scalable Real-Time Systems with WebRTC and Redis",
    excerpt: "Learn how to architect high-performance real-time applications that can handle thousands of concurrent connections.",
    date: "Jan 5, 2025",
    readTime: "8 min read",
    tags: ["WebRTC", "Redis", "System Design"],
    link: "#",
  },
  {
    title: "Optimizing REST APIs in Spring Boot for Production",
    excerpt: "Practical techniques to reduce API latency by 25% and improve throughput in your Java applications.",
    date: "Dec 20, 2024",
    readTime: "6 min read",
    tags: ["Java", "Spring Boot", "Performance"],
    link: "#",
  },
  {
    title: "From Hackathon to Production: Lessons Learned",
    excerpt: "Key insights from building award-winning projects at Sidetripe and Avalanche hackathons.",
    date: "Nov 15, 2024",
    readTime: "5 min read",
    tags: ["Hackathon", "DeFi", "Cloud"],
    link: "#",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sharing my thoughts and experiences on software development, system design, and technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 flex-grow">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <a
                  href={post.link}
                  className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Read <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50 text-white hover:text-purple-400 transition-all duration-300"
          >
            View All Articles <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
