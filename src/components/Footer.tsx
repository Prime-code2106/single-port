import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { gsap } from "gsap";
import { Github, Twitter, Linkedin, Dribbble } from "lucide-react";

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

    // GSAP Marquee
    const ctx = gsap.context(() => {
      gsap.to(".marquee-inner", {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative bg-bg pt-32 pb-12 overflow-hidden">
      {/* Background Video (Flipped) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <video
          ref={videoRef}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10">
        {/* Marquee */}
        <div className="w-full border-y border-white/5 py-8 mb-24 overflow-hidden select-none">
          <div className="marquee-inner flex whitespace-nowrap">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="text-4xl md:text-6xl lg:text-8xl font-display italic text-text-primary/20 hover:text-text-primary/100 transition-colors cursor-default px-8">
                  BUILDING THE FUTURE
                </span>
                <span className="text-6xl text-text-primary/20">•</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-5xl font-light mb-12">
            Let's create something <span className="font-display italic">extraordinary</span> together.
          </h3>
          
          <a 
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex items-center justify-center p-0.5 rounded-full overflow-hidden transition-transform hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 accent-gradient animate-gradient-shift" />
            <div className="relative bg-bg px-10 py-5 rounded-full">
              <span className="text-xl md:text-2xl font-medium group-hover:text-gradient transition-all">hello@michaelsmith.com</span>
            </div>
          </a>

          <div className="mt-32 flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-stroke">
            <div className="flex items-center gap-6">
              {[Twitter, Linkedin, Dribbble, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-2 text-muted hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-75" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-muted">Available for new projects</span>
            </div>

            <div className="text-xs text-muted">
              © 2024 Michael Smith — Portfolio
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
