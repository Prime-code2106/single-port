import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const entries = [
  {
    title: "The nuance of digital typography",
    category: "Design",
    date: "Mar 12, 2024",
    time: "4 min read",
    image: "https://picsum.photos/seed/type/200/200",
  },
  {
    title: "Building scalable animation systems",
    category: "Development",
    date: "Feb 28, 2024",
    time: "6 min read",
    image: "https://picsum.photos/seed/anim/200/200",
  },
  {
    title: "The future of interactive branding",
    category: "Strategy",
    date: "Feb 15, 2024",
    time: "5 min read",
    image: "https://picsum.photos/seed/brand2/200/200",
  },
  {
    title: "Minimalism in the age of AI",
    category: "Thought",
    date: "Jan 10, 2024",
    time: "3 min read",
    image: "https://picsum.photos/seed/ai/200/200",
  },
];

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-24 md:py-32">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
              Recent <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-muted max-w-sm">
              Sharing my experiments, workflows and discoveries.
            </p>
          </div>
          
          <button className="text-sm font-medium border-b border-stroke pb-1 hover:text-white transition-colors">
            View all entries
          </button>
        </motion.div>

        <div className="flex flex-col gap-4">
          {entries.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col sm:flex-row items-center gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-white/10">
                <img 
                  src={entry.image} 
                  alt={entry.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-muted">{entry.category}</span>
                  <div className="w-1 h-1 rounded-full bg-stroke" />
                  <span className="text-[10px] uppercase tracking-widest text-muted">{entry.time}</span>
                </div>
                <h3 className="text-lg md:text-xl font-medium text-text-primary group-hover:text-gradient transition-all">
                  {entry.title}
                </h3>
              </div>

              <div className="hidden md:flex items-center gap-4 pr-6">
                <span className="text-[10px] uppercase tracking-widest text-muted">{entry.date}</span>
                <div className="relative p-2 rounded-full border border-stroke overflow-hidden">
                  <div className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                  <ArrowUpRight className="w-4 h-4 relative z-10 transition-colors group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
