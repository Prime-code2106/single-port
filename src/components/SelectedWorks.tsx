import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const projects = [
  {
    title: "Automotive Motion",
    category: "CGI — Web",
    image: "https://picsum.photos/seed/cars/800/600",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Urban Architecture",
    category: "Real Estate — Design",
    image: "https://picsum.photos/seed/arch/800/600",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Human Perspective",
    category: "Photography — Brand",
    image: "https://picsum.photos/seed/faces/800/600",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Brand Identity",
    category: "Creative Direction",
    image: "https://picsum.photos/seed/brand/800/600",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              Featured <span className="font-display italic">projects</span>
            </h2>
            <p className="text-muted max-w-sm">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          
          <button className="hidden md:inline-flex items-center gap-3 group">
            <div className="relative p-3 rounded-full border border-stroke overflow-hidden transition-all group-hover:scale-110">
              <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
              <ArrowRight className="w-5 h-5 relative z-10 transition-colors group-hover:text-white" />
            </div>
            <span className="text-sm font-medium">View all work</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative bg-surface border border-stroke rounded-[2rem] overflow-hidden cursor-pointer",
                project.span,
                project.aspect
              )}
            >
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />
              
              <div className="absolute inset-0 bg-bg/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="relative group/pill">
                  <div className="absolute -inset-[2px] accent-gradient rounded-full opacity-0 group-hover/pill:opacity-100 animate-pulse transition-opacity" />
                  <div className="relative bg-white px-6 py-3 rounded-full shadow-lg">
                    <span className="text-black text-sm font-medium">
                      View — <span className="font-display italic">{project.title}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10 pointer-events-none group-hover:opacity-0 transition-opacity">
                <span className="text-[10px] uppercase tracking-widest text-white/60 mb-2 block">{project.category}</span>
                <h3 className="text-2xl md:text-3xl font-display italic">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
