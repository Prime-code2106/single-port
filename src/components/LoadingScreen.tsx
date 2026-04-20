import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const duration = 2700;
    const interval = duration / 100;
    
    const counter = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(counter);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 1;
      });
    }, interval);

    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 900);

    return () => {
      clearInterval(counter);
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12 overflow-hidden">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em]">Portfolio</span>
      </motion.div>

      <div className="flex-1 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.h2
            key={words[wordIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 absolute"
          >
            {words[wordIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex justify-end">
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
        </div>
        
        <div className="w-full h-[3px] bg-stroke/50 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 accent-gradient"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{ 
              transformOrigin: "left",
              boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)"
            }}
          />
        </div>
      </div>
    </div>
  );
}
