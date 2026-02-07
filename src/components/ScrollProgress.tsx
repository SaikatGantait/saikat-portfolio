import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Background track */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-50" />
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-50"
        style={{ 
          scaleX,
          background: "linear-gradient(90deg, hsl(200 100% 62%), hsl(280 70% 65%), hsl(340 85% 65%))",
          boxShadow: "0 0 20px hsl(200 100% 62% / 0.5), 0 0 40px hsl(280 70% 65% / 0.3)"
        }}
      />
    </>
  );
};

export default ScrollProgress;
