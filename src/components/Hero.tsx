import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const roles = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource("https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8");
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    }

    // Role cycle
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.to(".name-reveal", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.1,
        ease: "power3.out",
      });
      gsap.to(".blur-in", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: "power3.out",
      });
    });

    return () => {
      clearInterval(roleTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Atmosphere & Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#4E85BF]/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#89AACC]/5 blur-[100px] pointer-events-none"></div>
        
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 halftone-overlay opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="blur-in mb-8 flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-stroke"></div>
          <span className="text-[10px] text-muted uppercase tracking-[0.4em] font-medium">COLLECTION '26</span>
          <div className="w-8 h-px bg-stroke"></div>
        </div>
        
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display leading-[0.85] tracking-tighter text-text-primary mb-8 italic">
          Michael Smith
        </h1>

        <div className="blur-in text-lg md:text-2xl font-light mb-4">
          A{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-display italic text-text-primary inline-block min-w-[3em]"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>{" "}
          lives in Chicago.
        </div>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="blur-in flex flex-wrap items-center justify-center gap-4">
          <button className="group relative rounded-full text-sm px-8 py-4 transition-transform hover:scale-105 active:scale-95 bg-text-primary text-bg font-semibold overflow-hidden">
            <span className="relative z-10 transition-colors">See Works</span>
          </button>
          
          <button className="group relative rounded-full text-sm px-8 py-4 transition-all hover:scale-105 active:scale-95 border border-stroke bg-transparent text-text-primary overflow-hidden hover:border-white/40">
            <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[1px] bg-bg rounded-full transition-opacity group-hover:opacity-100" />
            <span className="relative z-10 transition-colors">Reach out...</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.3em]">SCROLL</span>
        <div className="w-px h-12 bg-stroke relative overflow-hidden">
          <div className="absolute inset-0 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
