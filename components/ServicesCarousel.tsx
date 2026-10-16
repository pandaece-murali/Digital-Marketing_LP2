import Link from "next/link";
import { ArrowUpRight, ChevronDown, Globe2, Instagram, Search, Target, Workflow } from "lucide-react";

import Reveal from "@/components/Reveal";

const services = [
  { n: "01", title: "Google Ads", text: "Connect with people actively searching for solutions like yours. We build and optimise campaigns to attract relevant prospects and improve lead quality.", icon: Search, tags: ["Search intent", "Lead quality"] },
  { n: "02", title: "Meta Ads", text: "Introduce your product or service to relevant audiences on Facebook and Instagram. Test creatives, refine targeting and identify opportunities to generate enquiries.", icon: Target, tags: ["Facebook", "Instagram"] },
  { n: "03", title: "Social Media Marketing", text: "Build credibility for your startup through useful, consistent content that explains your offering, answers customer questions and supports your sales process.", icon: Instagram, tags: ["Content", "Community"] },
  { n: "04", title: "Website & Landing Page Development", text: "Give potential customers a clear reason to choose you. We create mobile-friendly websites and landing pages that communicate your value and make it easy to enquire or take the next step.", icon: Globe2, tags: ["Conversion-first", "Mobile-ready"] },
  { n: "05", title: "CRM & Marketing Automation", text: "Keep every lead organised and every follow-up on track. Connect your marketing with CRM, WhatsApp and email automation so potential customers don't get overlooked.", icon: Workflow, tags: ["WhatsApp", "Email"] },
];

export default function ServicesCarousel() {
  return (
    <div className="services-grid">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Reveal key={service.n} delay={index * 0.055} className={`services-grid-item service-item-${index + 1}`}>
            <details className={`service-card ${index === 0 ? "service-featured" : ""}`}>
              <summary className="service-card-summary">
                <div className="service-card-top">
                  <span className="service-icon"><Icon size={21} aria-hidden="true" /></span>
                  <span className="service-number">{service.n}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-card-summary-action">
                  <span>View Details</span>
                  <span className="service-expand" aria-hidden="true"><ChevronDown size={18} /></span>
                </span>
              </summary>
              <div className="service-card-details">
                <div className="service-tags">
                  {service.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <Link href="#lead-form" className="service-arrow" aria-label={`Talk to our team about ${service.title}`}>
                  Talk to Our Team <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </details>
          </Reveal>
        );
      })}
    </div>
  );
}
