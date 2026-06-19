import { useEffect } from "react";

export function useReveal(deps = []) {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting)
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Accept deps so bento glow re-attaches when feature tab changes
export function useBentoGlow(deps = []) {
  useEffect(() => {
    const cards = document.querySelectorAll(".b-card");
    const handlers = [];
    cards.forEach(card => {
      const fn = e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%");
      };
      card.addEventListener("mousemove", fn);
      handlers.push({ card, fn });
    });
    return () => handlers.forEach(({ card, fn }) => card.removeEventListener("mousemove", fn));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}