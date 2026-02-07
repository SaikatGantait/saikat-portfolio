import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorSpotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] opacity-0 transition-opacity duration-300 lg:opacity-100"
      animate={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        className="absolute h-[500px] w-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 25%, transparent 60%)`,
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />
    </motion.div>
  );
};

export default CursorSpotlight;
