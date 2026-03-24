import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/Memories.css';

gsap.registerPlugin(ScrollTrigger);

const leftImages = [
  '/images/Images/IMG-20260315-WA0010.jpg',
  '/images/Images/IMG-20260315-WA0014.jpg',
  '/images/Images/IMG-20260315-WA0017.jpg',
  '/images/Images/IMG-20260315-WA0019.jpg',
  '/images/Images/IMG-20260315-WA0021.jpg',
];

const centerImages = [
  '/images/Images/IMG-20260315-WA0023.jpg',
  '/images/Images/IMG-20260315-WA0025.jpg',
  '/images/Images/new.jpeg',
];

const rightImages = [
  '/images/Images/IMG-20260315-WA0027.jpg',
  '/images/Images/IMG-20260315-WA0030.jpg',
  '/images/Images/IMG-20260315-WA0034.jpg',
  '/images/Images/IMG-20260315-WA0035.jpg',
  '/images/Images/IMG-20260315-WA0041.jpg',
];

const Memories = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const centerColRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !centerColRef.current || !gridRef.current) return;

    if (window.innerWidth > 768) {
      const pinTrigger = ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: centerColRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      return () => {
        pinTrigger.kill();
      };
    }
  }, []);

  return (
    <section className="memories-section" ref={sectionRef}>
      {/* Header */}
      <div className="memories-header">
        <p className="memories-label">scroll to explore</p>
        <h2 className="memories-title">Memories</h2>
        <p className="memories-subtitle">
          A collection of moments that shaped the journey.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="memories-grid" ref={gridRef}>
        {/* Left Column — scrolls */}
        <div className="memories-col memories-col-side" data-speed="1.1">
          {leftImages.map((src, i) => (
            <figure key={i} className="memories-figure">
              <img
                src={src}
                alt={`Memory ${i + 1}`}
                className="memories-img"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* Center Column — sticky (pinned via GSAP) */}
        <div className="memories-col memories-col-center" ref={centerColRef}>
          {centerImages.map((src, i) => (
            <figure key={i} className="memories-figure memories-figure-center">
              <img
                src={src}
                alt={`Memory center ${i + 1}`}
                className="memories-img"
                loading="lazy"
              />
            </figure>
          ))}
        </div>

        {/* Right Column — scrolls */}
        <div className="memories-col memories-col-side" data-speed="0.9">
          {rightImages.map((src, i) => (
            <figure key={i} className="memories-figure">
              <img
                src={src}
                alt={`Memory ${i + 1}`}
                className="memories-img"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Memories;
