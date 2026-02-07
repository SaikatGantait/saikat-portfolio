import { motion } from "framer-motion";

const GradientOrbs = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {/* Primary orb */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsl(200 100% 62% / 0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["-20%", "10%", "-20%"],
          y: ["-10%", "20%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute right-0 w-[600px] h-[600px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, hsl(280 70% 65% / 0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          x: ["20%", "-10%", "20%"],
          y: ["10%", "-20%", "10%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent orb */}
      <motion.div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(340 85% 65% / 0.1) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          x: ["-10%", "15%", "-10%"],
          y: ["5%", "-15%", "5%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default GradientOrbs;
