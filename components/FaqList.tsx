"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const faqs = [
  { q: "What digital marketing services does PANDAeCe offer startups?", a: "We manage your digital marketing end to end: paid ads, social media, content, websites and landing pages, and WhatsApp and email automation. We provide digital marketing services through one team and one plan, focused on bringing in customers rather than activity." },
  { q: "How much do your digital marketing services cost?", a: "Our services start from \u20B910,000 per month, excluding your ad budget. After auditing your business, we share a clear plan with exact numbers." },
  { q: "How can digital marketing help my startup get more customers?", a: "We help your startup reach relevant audiences through targeted advertising, create landing pages that encourage enquiries, and follow up with potential customers through CRM and automation." },
  { q: "How quickly can my startup see results?", a: "Paid advertising campaigns can start generating enquiries within 1\u20132 weeks of launch. The first 30 days focus on collecting performance data and identifying opportunities. Over 60\u201390 days, we optimise targeting, cost per lead and conversion rates to improve campaign performance." },
  { q: "Which industries do you work with?", a: "We work with EdTech, FinTech, clinics and hospitals, and real estate. We also support manufacturing, beauty and wellness, and more." },
  { q: "Which ad platforms do you use?", a: "We manage Google Ads, Meta Ads and LinkedIn Ads. As a digital marketing advertising agency, we pick the platform where your customers are most active." },
  { q: "How does WhatsApp and email automation help my startup?", a: "It replies to new leads within minutes and follows up until they are ready to buy. This keeps every lead warm without extra effort from your team." },
];

export default function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  return (
    <div className="faq-list">
      {faqs.map((faq, i) => {
        const expanded = open === i;
        return (
          <div className={`faq-item ${expanded ? "faq-item-open" : ""}`} key={faq.q}>
            <button className="faq-question" type="button" aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : i)}>
              <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
              <span>{faq.q}</span>
              <motion.span className="faq-chevron" animate={{ scale: expanded ? 1 : 0.96 }} transition={{ duration: reduced ? 0 : 0.2 }} aria-hidden="true">
                {expanded ? <Minus size={19} /> : <Plus size={19} />}
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {expanded && <motion.div className="faq-answer-wrap" key="answer"
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.28, ease: "easeInOut" }}>
                <p>{faq.a}</p>
              </motion.div>}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
