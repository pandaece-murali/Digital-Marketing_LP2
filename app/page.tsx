
import Link from "next/link";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  CircleHelp,
  Globe2,
  MousePointerClick,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import HeroHeading from "@/components/HeroHeading";
import AnimatedStat from "@/components/AnimatedStat";
import FaqList from "@/components/FaqList";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import ServicesCarousel from "@/components/ServicesCarousel";
import ParallaxVisual from "@/components/ParallaxVisual";
import FloatingActions from "@/components/FloatingActions";


export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero section-dark">
          <div className="shell hero-layout">
            <div className="hero-copy">
              <Reveal>
                <div className="eyebrow hero-eyebrow">Scale Your Startup with <span className="yellow-highlight">More Qualified Leads</span></div>
                <HeroHeading />
              </Reveal>
              <Reveal delay={0.25}>
                <p className="hero-description">
                  PANDAeCe helps startups attract qualified leads through targeted advertising, conversion-focused websites, social media and automated follow-ups. Build a digital marketing system designed around your business goals and growth stage.
                </p>

              </Reveal>
              <Reveal delay={0.4}>
                <div className="hero-actions">
                  <Link href="#lead-form" className="button button-primary">
                    Book Now &amp; Get <span className="yellow-highlight">20% Off</span>
                    <ArrowUpRight size={18} />
                  </Link>
                  <a className="button button-secondary" href="#services">
                    Explore Our Services
                    <ArrowDownRight size={17} />
                  </a>
                  <a className="text-link" href="#lead-form">
                    Share your goals <ArrowDownRight size={17} />
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="hero-media-stack">
              <LeadCaptureForm />
            </div>
          </div>

          <div className="shell hero-bottom">
            <span><Target size={14} aria-hidden="true" /> STRATEGY</span><i />
            <span><BarChart3 size={14} aria-hidden="true" /> PERFORMANCE ADS</span><i />
            <span><MousePointerClick size={14} aria-hidden="true" /> CONVERSION DESIGN</span><i />
            <span><Workflow size={14} aria-hidden="true" /> CRM + AUTOMATION</span>

          </div>

        </section>


        <section id="about" className="section about-section">
          <div className="shell about-grid">
            <Reveal>
              <div className="eyebrow"><span className="eyebrow-line" /> ABOUT PANDAeCe</div>
              <h2 className="section-heading digitalMarketingHeading">
                <span className="green-italic">
                  Digital Marketing Partner That Understands Startups
                </span>
              </h2>
              <p className="body-large">
                PANDAeCe brings together performance marketers, designers and developers to help startups build a connected marketing system. From Google and Meta Ads to landing pages, CRM and WhatsApp and email automation, we help your team focus on attracting and converting potential customers.
              </p>
              <p className="body-large">
                Whether you&apos;re launching a new product or expanding into new markets, our digital marketing services for startups are designed to support your next stage of growth.
              </p>
              <div className="worked-with">
                <span>WE&apos;VE WORKED WITH</span>
                <div>We work with Edtech, Fintech, Clinics and Hospitals, Real Estate and Manufacturing companies.</div>
              </div>
              <Link className="button button-secondary" href="#lead-form">
                Talk to Our Team <ArrowUpRight size={17} />
              </Link>
            </Reveal>

            <Reveal delay={0.1} className="about-art-wrap">
              <ParallaxVisual className="about-growth-parallax">
                <Image
                  className="about-growth-image"
                  src="/images/pandaece-digital-marketing-growth.png"
                  alt="Marketing growth dashboard showing Google Ads, Meta Ads, WhatsApp automation, lead generation, CRM integration, and performance analytics"
                  width={852}
                  height={660}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </ParallaxVisual>
              <div className="about-art-note"><span className="green-dot" /> Strategy to follow-up, under one roof.</div>
            </Reveal>
          </div>
        </section>

        <section id="results" className="stats-section">
          <div className="shell">
            <Reveal>
              <div className="stats-top">
                <span className="eyebrow"><span className="eyebrow-line" /> THE WORK BEHIND THE WORK</span>
                <p>Experience that brings the whole picture together.</p>
              </div>
            </Reveal>

            <div className="stats-grid">
              {[
                { number: "30 Years", label: "Combined Team Experience", tag: "01 / EXPERIENCE", icon: "Users" as const },
                { number: "1,300+", label: "Projects", tag: "02 / EXECUTION", icon: "BarChart3" as const },
                { number: "400+", label: "Clients", tag: "03 / PARTNERSHIPS", icon: "ShieldCheck" as const },
              ].map((stat, i) => {
                return (
                  <AnimatedStat key={stat.tag} value={stat.number} label={stat.label}
                    tag={stat.tag} icon={stat.icon} featured={i === 1} />
                );
              })}
            </div>

            <div className="stats-cta">
              <a
                className="button button-primary results-cta"
                href="#lead-form"
              >
                Let&apos;s Grow Your Business <ArrowUpRight size={17} />
              </a>
            </div>

          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="shell">
            <Reveal>
              <div className="section-top">
                <div>
                  <div className="eyebrow"><span className="eyebrow-line" /> WHAT WE DO</div>
                  <h2 className="section-heading">
                    5 Core Digital Marketing Services. <span className="green-italic">One Connected Growth System</span>
                  </h2>
                </div>
                <p className="section-aside">
                  Every service has a role. Every role connects to the same goal:
                  turning attention into customers.
                </p>
              </div>
            </Reveal>

            <ServicesCarousel />

            <Reveal>
              <div className="services-cta">
                <div><span className="green-dot" /> NOT SURE WHAT YOU NEED?</div>
                <p>Let&apos;s find the biggest opportunity in your current setup.</p>
                <Link href="#lead-form" className="text-link">
                  Book a call &amp; save 20% <ArrowUpRight size={17} />
                </Link>

              </div>
            </Reveal>
          </div>
        </section>

        <section className="section problem-section">
          <div className="shell">
            <Reveal>
              <div className="section-top">
                <h2 className="section-heading">Digital Marketing Startup Challenges: <span className="challenge-highlight">High CPL. Low Conversions.</span> Leads That Never Become Customers.</h2>
              </div>
            </Reveal>
            <div className="problem-grid">
              {[
                { title: "Low visibility:", text: "Your ideal customers don't know your startup exists.", icon: Users },
                { title: "Expensive leads:", text: "Your advertising budget is being spent without enough qualified enquiries.", icon: Target },
                { title: "Weak conversions:", text: "People visit your website but leave without taking action.", icon: BarChart3 },
                { title: "Missed follow-ups:", text: "Interested prospects go cold because nobody contacts them at the right time.", icon: Bot },
                { title: "Unclear performance:", text: "You struggle to understand which campaigns are contributing to business growth.", icon: ShieldCheck },
              ].map(({ title, text, icon: Icon }, index) => (
                <Reveal key={title} delay={index * 0.06}>
                  <article className="problem-card">
                    <span className="problem-icon"><Icon size={20} aria-hidden="true" /></span>
                    <p><strong>{title}</strong> {text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="problem-closing">When these problems continue, your startup loses valuable time, budget and opportunities to competitors.</p>
              <a className="button button-secondary problem-cta" href="#lead-form">
                Get Your Free Marketing Audit <ArrowUpRight size={17} />
              </a>
            </Reveal>
          </div>
        </section>




        <section id="testimonials" className="section testimonials-section">
          <div className="shell">
            <Reveal>
              <div className="section-top">
                <div>
                  <div className="eyebrow">
                    <span className="eyebrow-line" />
                    WORD FROM THE FIELD
                  </div>

                  <h2 className="section-heading">
                    What Our Clients Say
                  </h2>
                </div>

                <p className="section-aside">
                  Real experiences. Trusted partnerships. Meaningful results.
                </p>
              </div>
            </Reveal>

            <div className="testimonial-marquee">
              <div className="testimonial-track">
                {[
                  {
                    name: "Puneeth V",
                    rating: 5,
                    review:
                      "PANDAeCe helped strengthen our online presence through tailored content and marketing optimization. The team was professional, creative, and consistently responsive.",
                  },
                  {
                    name: "Sakshi Nagaraj",
                    rating: 5,
                    review:
                      "PANDAeCe delivered effective eCommerce enablement and software development solutions that helped streamline our operations. The team was professional and responsive.",
                  },
                  {
                    name: "Nikitha Harish",
                    rating: 5,
                    review:
                      "PANDAeCe provided thoughtful branding solutions that helped us build a distinctive and memorable brand identity.",
                  },
                  {
                    name: "Rakshitha K",
                    rating: 4,
                    review:
                      "PANDAeCe developed tailored ERP solutions that supported better operational efficiency and management. The team demonstrated professionalism and responsiveness.",
                  },
                  {
                    name: "Swarupa S",
                    rating: 5,
                    review:
                      "The team at PANDAeCe delivered creative and responsive support across our eCommerce and digital requirements.",
                  },
                  {
                    name: "Mamatha H K",
                    rating: 4,
                    review:
                      "PANDAeCe brought strategic thinking and practical expertise to our digital marketing efforts, helping improve online visibility and sales.",
                  },
                  {
                    name: "Kavipriya Paramasivam",
                    rating: 5,
                    review:
                      "PANDAeCe helped improve our business operations through solutions tailored to our requirements. The team was professional and collaborative.",
                  },
                ]
                  .concat([
                    {
                      name: "Puneeth V",
                      rating: 5,
                      review:
                        "PANDAeCe helped strengthen our online presence through tailored content and marketing optimization. The team was professional, creative, and consistently responsive.",
                    },
                    {
                      name: "Sakshi Nagaraj",
                      rating: 5,
                      review:
                        "PANDAeCe delivered effective eCommerce enablement and software development solutions that helped streamline our operations. The team was professional and responsive.",
                    },
                    {
                      name: "Nikitha Harish",
                      rating: 5,
                      review:
                        "PANDAeCe provided thoughtful branding solutions that helped us build a distinctive and memorable brand identity.",
                    },
                    {
                      name: "Rakshitha K",
                      rating: 4,
                      review:
                        "PANDAeCe developed tailored ERP solutions that supported better operational efficiency and management. The team demonstrated professionalism and responsiveness.",
                    },
                    {
                      name: "Swarupa S",
                      rating: 5,
                      review:
                        "The team at PANDAeCe delivered creative and responsive support across our eCommerce and digital requirements.",
                    },
                    {
                      name: "Mamatha H K",
                      rating: 4,
                      review:
                        "PANDAeCe brought strategic thinking and practical expertise to our digital marketing efforts, helping improve online visibility and sales.",
                    },
                    {
                      name: "Kavipriya Paramasivam",
                      rating: 5,
                      review:
                        "PANDAeCe helped improve our business operations through solutions tailored to our requirements. The team was professional and collaborative.",
                    },
                  ])
                  .map((testimonial, i) => (
                    <article
                      className="testimonial-card testimonial-marquee-card"
                      key={`${testimonial.name}-${i}`}
                    >
                      <div className="review-card-header">
                        <div className="reviewer-avatar">
                          {testimonial.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div className="reviewer-info">
                          <strong>{testimonial.name}</strong>
                          <span>Client review</span>
                        </div>

                        <span
                          className="google-review-mark"
                          aria-label="Review"
                        >
                          G
                        </span>
                      </div>

                      <div
                        className="review-stars"
                        aria-label={`${testimonial.rating} out of 5 stars`}
                      >
                        {"★".repeat(testimonial.rating)}
                        <span className="empty-stars">
                          {"★".repeat(5 - testimonial.rating)}
                        </span>
                      </div>

                      <blockquote>
                        &ldquo;{testimonial.review}&rdquo;
                      </blockquote>

                      <div className="review-card-footer">
                        <span className="review-source-dot" />
                        <span>Client feedback</span>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </div>
        </section>





        <section className="faq-section" id="faq">
          <div className="shell faq-container">
            <div className="faq-section-heading">
              <span className="faq-eyebrow">FAQs</span>
              <h2>
                Common Questions Business Owners Ask Us About{" "}
                <span>Digital Marketing</span>
              </h2>
            </div>

            <FaqList />
          </div>
        </section>




        <section className="final-cta">
          <div className="cta-glow" />

          <div className="shell cta-inner">
            {/* LEFT SIDE — CONTENT */}
            <div className="final-cta-copy">
              <Reveal>
                <span className="eyebrow eyebrow-light">
                  <span className="live-dot" />
                  YOUR NEXT MOVE STARTS HERE
                </span>

                <h2>
                  Your Startup Has a Goal. Let&apos;s Build the{" "}
                  <span className="final-cta-highlight">
                    Marketing System
                  </span>{" "}
                  to Support It.
                </h2>
              </Reveal>

              <Reveal delay={0.18}>
                <p>
                  Identify what&apos;s limiting your leads, conversions and marketing
                  performance. Get a clear action plan to grow with confidence.
                </p>

                <Link href="#lead-form" className="button button-primary">
                  Book Consultation, Get{" "}
                  <span className="yellow-highlight">20% Off</span>
                  <ArrowUpRight size={18} />
                </Link>

                <span className="cta-micro">
                  <Check size={14} />
                  A practical conversation. Clear next steps.
                </span>
              </Reveal>
            </div>

            {/* RIGHT SIDE — PANDA IMAGE */}
            <div className="cta-panda-column">
              <div className="cta-panda-decoration">
                <Image
                  src="/images/panda-hero.png"
                  alt="PANDAeCe digital marketing panda mascot"
                  width={1024}
                  height={1024}
                  className="hero-panda-image"
                  sizes="(max-width: 768px) 90vw, 45vw"
                />
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
