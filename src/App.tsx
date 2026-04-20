import { useState, useEffect } from "react";
import Lenis from "lenis";
import LoadingScreen from "@/src/components/LoadingScreen";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import SelectedWorks from "@/src/components/SelectedWorks";
import Journal from "@/src/components/Journal";
import Explorations from "@/src/components/Explorations";
import Stats from "@/src/components/Stats";
import Footer from "@/src/components/Footer";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Stop scrolling while loading
    if (isLoading) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <main className="relative min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <SelectedWorks />
          <Journal />
          <Explorations />
          <Stats />
          <Footer />
        </>
      )}
    </main>
  );
}
