"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 520);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      className="back-to-top"
      type="button"
      aria-label="Back to top"
      onClick={() => {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      }}
    >
      <ArrowUp size={19} aria-hidden="true" />
    </button>
  );
}
