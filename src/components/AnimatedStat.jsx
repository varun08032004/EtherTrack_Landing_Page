import { useState, useEffect, useRef } from "react";

export default function AnimatedStat({ value, color }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const playedRef = useRef(false);

  const prefersReduced = typeof window !== "undefined" && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    setDisplay(value);
  }

  useEffect(() => {
    if (prefersReduced) {
      return;
    }
    const el = ref.current;
    if (!el) return;
    const chars = "0123456789";
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          const totalFrames = 16;
          let frame = 0;
          const interval = setInterval(() => {
            frame++;
            if (frame >= totalFrames) {
              clearInterval(interval);
              setDisplay(value);
              return;
            }
            const lockRatio = frame / totalFrames;
            const scrambled = value.split("").map((ch) => {
              if (/[0-9]/.test(ch) && Math.random() > lockRatio) {
                return chars[Math.floor(Math.random() * chars.length)];
              }
              return ch;
            }).join("");
            setDisplay(scrambled);
          }, 45);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, prefersReduced]);

  return <div ref={ref} className="s-num" style={{ color }}>{display}</div>;
}