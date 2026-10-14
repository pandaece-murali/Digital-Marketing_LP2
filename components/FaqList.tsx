
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FAQ = {
  question: string;
  answer: string;
};


const faqs: FAQ[] = [
  {
    question: "What digital marketing services does PANDAeCe offer startups?",
    answer:
      "We manage your digital marketing end to end: paid ads, social media, content, websites and landing pages, and WhatsApp and email automation. We provide digital marketing services through one team and one plan, focused on bringing in customers rather than activity.",
  },
  {
    question: "How much do your digital marketing services cost?",
    answer:
      "Our services start from ₹10,000 per month, excluding your ad budget. After auditing your business, we share a clear plan with exact numbers",
  },
  {
    question: "How can digital marketing help my startup get more customers?",
    answer:
      "We help your startup reach relevant audiences through targeted advertising, create landing pages that encourage enquiries, and follow up with potential customers through CRM and automation",
  },
  {
    question: "How quickly can my startup see results?",
    answer:
      "Paid advertising campaigns can start generating enquiries within 1–2 weeks of launch. The first 30 days focus on collecting performance data and identifying opportunities. Over 60–90 days, we optimise targeting, cost per lead and conversion rates to improve campaign performance.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with Edtech, Fintech, clinics and hospitals, and real estate. We also support manufacturing, beauty and wellness, and more.",
  },
  {
    question: "Which ad platforms do you use?",
    answer:
      "We manage Google Ads, Meta Ads and LinkedIn Ads. As a digital marketing advertising agency, we pick the platform where your customers are most active.",
  },
  {
    question: "How does WhatsApp and email automation help my Startup?",
    answer:
      "It replies to new leads within minutes and follows up until they are ready to buy. This keeps every lead warm without extra effort from your team.",
  },
];


export default function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-heading">
          <p>
            Everything you need to know about working with PANDAeCe.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.article
                key={faq.question}
                className={`faq-item ${isOpen ? "active" : ""}`}
                onMouseEnter={() => setOpenIndex(index)}
                onMouseLeave={() => setOpenIndex(null)}
                initial={false}
                animate={{
                  borderColor: isOpen ? "#00C853" : "#26372D",
                }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                >
                  <span className="faq-question-text">
                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{faq.question}</span>
                  </span>

                  <span
                    className={`faq-icon ${isOpen ? "rotated" : ""}`}
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      className="faq-answer-wrapper"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
