import { useEffect, useMemo, useRef, useState } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setSequenceTimeline } from "../utils/GsapScroll";

type Props = {
  /** Total frames available on disk. */
  frameCount?: number;
  /** Frames per second. */
  fps?: number;
  /** Public folder path (no trailing slash). */
  basePath?: string;
  /** Filename suffix after frame number. */
  suffix?: string;
  /** Start frame index (0-based). */
  startFrame?: number;
  /** If true, loops back to 0 at end. */
  loop?: boolean;
};

const defaultProps: Required<Props> = {
  frameCount: 120,
  fps: 15,
  basePath: "/sequence",
  suffix: "_delay-0.066s.png",
  startFrame: 0,
  loop: true,
};

const pad3 = (n: number) => String(n).padStart(3, "0");

const SequencePlayer = (props: Props) => {
  const { setLoading } = useLoading();
  const {
    frameCount,
    fps,
    basePath,
    suffix,
    startFrame,
    loop,
  } = { ...defaultProps, ...props };

  const [frame, setFrame] = useState(() => Math.max(0, Math.min(startFrame, frameCount - 1)));
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);
  const accRef = useRef<number>(0);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  const src = useMemo(() => {
    return `${basePath}/frame_${pad3(frame)}${suffix}`;
  }, [basePath, frame, suffix]);

  useEffect(() => {
    // Preload all frames (120 small PNGs is typically fine; if not, we can cap later).
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `${basePath}/frame_${pad3(i)}${suffix}`;
      images.push(img);
    }
    
    // Set up GSAP scrolling interactions globally
    setSequenceTimeline();

    return () => {
      images.length = 0;
    };
  }, [basePath, frameCount, suffix]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const stepMs = 1000 / Math.max(1, fps);
    const tick = (t: number) => {
      if (!lastRef.current) lastRef.current = t;
      const dt = t - lastRef.current;
      lastRef.current = t;
      accRef.current += dt;

      if (accRef.current >= stepMs) {
        const steps = Math.floor(accRef.current / stepMs);
        accRef.current = accRef.current % stepMs;
        setFrame((prev) => {
          const next = prev + steps;
          if (loop) return next % frameCount;
          return Math.min(frameCount - 1, next);
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = 0;
      accRef.current = 0;
    };
  }, [fps, frameCount, loop, prefersReducedMotion]);

  return (
    <div className="character-container" aria-hidden="true">
      <div className="character-model sequence-model">
        <div className="character-rim"></div>
        <img
          src={src}
          alt=""
          draggable={false}
          loading="eager"
          decoding="async"
          onLoad={() => setLoading(100)}
        />
      </div>
    </div>
  );
};

export default SequencePlayer;

