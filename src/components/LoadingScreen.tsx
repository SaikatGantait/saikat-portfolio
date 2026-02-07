import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleSkip = useCallback(() => {
    setIsVisible(false);
    setTimeout(onLoadingComplete, 300);
  }, [onLoadingComplete]);

  useEffect(() => {
    // Shorter loading time (1.5s instead of 2.5s)
    const duration = 1500;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, interval);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadingComplete, 300);
    }, duration);

    // Allow keyboard skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onLoadingComplete, handleSkip]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          onClick={handleSkip}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio"
        >
          <div className="absolute inset-0 loading-grid" aria-hidden="true" />
          <div className="absolute inset-0 loading-glow" aria-hidden="true" />
          <div className="relative cursor-pointer" title="Click or press any key to skip">
            {/* Animated rings */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border-2 border-primary/30 shadow-[0_0_40px_-18px_rgba(59,130,246,0.8)]"
              />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full border-2 border-secondary/30 shadow-[0_0_50px_-24px_rgba(168,85,247,0.8)]"
              />
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15, type: "spring" }}
              className="relative z-10 flex items-center justify-center w-24 h-24"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-5xl font-extrabold tracking-[-0.05em] gradient-text-animated"
              >
                SG
              </motion.span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-36"
            >
              <div className="h-[2px] bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-primary via-purple-400 to-secondary rounded-full transition-all duration-100"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground/70 font-medium tracking-[0.2em]">
                <span>LOADING</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <p className="text-muted-foreground/70 text-[11px] text-center mt-3 font-medium tracking-wide">
                Loading<span className="animate-pulse">...</span>
              </p>
              <p className="text-muted-foreground/30 text-[10px] text-center mt-1 tracking-wider">
                Press any key to skip
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
