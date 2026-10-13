import { useEffect, useState } from "react";

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

const LOCAL_API = 'http://localhost:5001';
const PROD_API = 'https://etpl-ops.onrender.com';
const CONFIGURED_API = (import.meta.env.VITE_ETPL_OPS_API || PROD_API).replace(/\/$/, '');

const API_ENDPOINTS = [LOCAL_API, PROD_API, CONFIGURED_API].filter((v, i, a) => a.indexOf(v) === i);

async function fetchWithFallback(path, options = {}) {
  let lastError;
  for (const baseUrl of API_ENDPOINTS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`${baseUrl}${path}`, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
      console.warn(`[api] ${baseUrl}${path} failed:`, err.message);
    }
  }
  throw lastError || new Error('All API endpoints failed');
}

// Base prices — always present, upgraded with live data when API responds
const BASE_PRICING = {
  starter: { monthly: 1499, annual: 14990 },
  growth: { monthly: 7999, annual: 79990 },
};

// Hook to fetch live pricing from etpl-ops (tries localhost → prod → configured)
// Starts with BASE_PRICING immediately, upgrades when live data arrives
export function usePricing() {
  const [pricing, setPricing] = useState(BASE_PRICING);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchPricing() {
      try {
        setLoading(true);
        const data = await fetchWithFallback('/api/public/pricing');
        if (mounted) {
          setPricing(data.pricing);
          setLive(true);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.warn('[usePricing] live fetch failed, keeping base prices:', err.message);
          setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchPricing();
    return () => { mounted = false; };
  }, []);

  return { pricing, loading, error, live };
}

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchJobs() {
      try {
        setLoading(true);
        const data = await fetchWithFallback('/api/public/jobs');
        if (mounted) {
          setJobs(data.jobs || []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error('[useJobs] all endpoints failed:', err);
          setError(err.message);
          setJobs([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchJobs();
    return () => { mounted = false; };
  }, []);

  return { jobs, loading, error };
}