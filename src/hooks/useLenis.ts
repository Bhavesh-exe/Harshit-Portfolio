import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

export default function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initializing Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integrating with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Provide lenis instance globally for Navbar scrollTo
    (window as any).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
      (window as any).lenis = null;
    };
  }, []);

  return lenisRef;
}
