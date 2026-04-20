import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/src/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const explorationItems = [
  { id: 1, img: "https://picsum.photos/seed/exp1/400/400", rotation: -5, col: 1 },
  { id: 2, img: "https://picsum.photos/seed/exp2/400/400", rotation: 8, col: 2 },
  { id: 3, img: "https://picsum.photos/seed/exp3/400/400", rotation: -12, col: 1 },
  { id: 4, img: "https://picsum.photos/seed/exp4/400/400", rotation: 4, col: 2 },
  { id: 5, img: "https://picsum.photos/seed/exp5/400/400", rotation: -3, col: 1 },
  { id: 6, img: "https://picsum.photos/seed/exp6/400/400", rotation: 10, col: 2 },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the header title
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      // Parallax for columns
      gsap.to(".parallax-col-1", {
        y: -300,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-col-2", {
        y: 300,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg overflow-hidden pt-32">
      <div 
        ref={contentRef}
        className="h-screen w-full flex flex-col items-center justify-center pointer-events-none z-10"
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Explorations</span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-center">
          Visual <span className="font-display italic">playground</span>
        </h2>
        <div className="mt-12 pointer-events-auto">
          <button className="px-8 py-3 rounded-full border border-stroke hover:bg-white hover:text-black transition-all">
            See more on Dribbble
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-0">
        <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px] mx-auto pt-24 pb-48">
          <div className="parallax-col-1 space-y-32">
            {explorationItems.filter(i => i.col === 1).map((item) => (
              <div 
                key={item.id}
                className="group relative aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img 
                  src={item.img} 
                  alt={`Exp ${item.id}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>

          <div className="parallax-col-2 space-y-32 pt-80">
            {explorationItems.filter(i => i.col === 2).map((item) => (
              <div 
                key={item.id}
                className="group relative aspect-square max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 cursor-pointer"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img 
                  src={item.img} 
                  alt={`Exp ${item.id}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
