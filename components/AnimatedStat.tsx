"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BarChart3, ShieldCheck, Users } from "lucide-react";

const icons = { Users, BarChart3, ShieldCheck };
type Props = { value: string; label: string; tag: string; featured?: boolean; icon: keyof typeof icons };

function useCountUp(value: string, active: boolean, reduced: boolean) {
  const [display, setDisplay] = useState(reduced ? value : "0");
  useEffect(() => {
    if (!active) return;
    if (reduced) { setDisplay(value); return; }
    const numeric = Number(value.replace(/[^\d]/g, ""));
    const suffix = value.replace(/[\d,]/g, "");
    if (!numeric) { setDisplay(value); return; }
    const duration = 1100;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setDisplay(`${current.toLocaleString("en-US")}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, value]);
  return display;
}

export default function AnimatedStat({ value, label, tag, featured = false, icon: Icon }: Props) {
  const StatIcon = icons[Icon];
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.35 });
  const reduced = useReducedMotion();
  const display = useCountUp(value, active, Boolean(reduced));
  return (
    <motion.div ref={ref} className={`stat-card ${featured ? "stat-featured" : ""}`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0 : 0.55 }}>
      <span className="stat-icon"><StatIcon size={19} /></span>
      <strong>{display}</strong><p>{label}</p><span className="stat-index">{tag}</span>
    </motion.div>
  );
}
