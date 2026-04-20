import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div 
        className={cn(
          "inline-flex items-center rounded-full border border-white/10 bg-surface/80 backdrop-blur-md px-2 py-2 shadow-2xl shadow-black/50 transition-all duration-300",
          scrolled && "shadow-black/70"
        )}
      >
        <div className="group relative flex items-center justify-center w-8 h-8 rounded-full overflow-hidden cursor-pointer mr-1">
          <div className="absolute inset-0 accent-gradient animate-gradient-shift duration-1000 group-hover:rotate-180 transition-transform" />
          <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary group-hover:scale-110 transition-transform">MS</span>
          </div>
        </div>

        <div className="hidden md:block w-px h-5 bg-stroke mx-1" />

        <div className="flex items-center">
          {["Home", "Work", "Journal"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={cn(
                "text-xs font-medium rounded-full px-4 py-2 transition-colors",
                item === "Home" ? "text-text-primary bg-white/10" : "text-muted hover:text-text-primary"
              )}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="w-px h-5 bg-stroke mx-1" />

        <button className="relative group overflow-hidden rounded-full">
          <span className="absolute -inset-[1px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative block bg-surface rounded-full px-4 py-2 text-xs font-medium text-text-primary transition-all flex items-center gap-2">
            Say hi <span className="text-[10px] opacity-60">↗</span>
          </span>
        </button>
      </div>
    </nav>
  );
}
