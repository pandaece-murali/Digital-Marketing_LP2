
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
                  <Link href="/booking" className="button button-primary">
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
            <span className="hero-bottom-note">
              SCROLL TO EXPLORE <ArrowDownRight size={14} />
            </span>
          </div>

        </section>

        <section className="trust-strip">
          <div className="shell trust-inner">
            <span className="trust-title">BUILT FOR AMBITION</span>
            <div className="industry-list">
              <span>EdTech</span><span>FinTech</span><span>Healthcare</span>
              <span>Real estate</span><span>Manufacturing</span>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="shell about-grid">
            <Reveal>
              <div className="eyebrow"><span className="eyebrow-line" /> ABOUT PANDAeCe</div>
              <h2 className="section-heading">
                <span className="green-italic">Digital Marketing Partner That Understands Startups</span>
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
                sizes="(max-width: 760px) 100vw, 45vw"
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
              <a className="button button-primary" href="#lead-form">
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
                <Link href="/booking" className="text-link">
                  Book a call &amp; save 20% <ArrowUpRight size={17} />
                </Link>
                <a className="button button-secondary" href="#services">
                  Find the Right Service <ArrowDownRight size={17} />
                </a>
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

        <section className="system-section">
          <div className="shell system-layout">
            <Reveal>
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> THE CONNECTED APPROACH</div>
              <h2 className="section-heading light-heading">Digital Marketing That Finally Looks as Good as Your Business Is.</h2>
              <Link href="/booking" className="button button-primary">
                Let&apos;s Grow Your Business <ArrowUpRight size={17} />
              </Link>
            </Reveal>

            <div className="flow-diagram">
              {[
                { title: "Audit", text: "We find exactly where you're leaking customers.", icon: MousePointerClick },
                { title: "Strategy", text: "One clear plan, built around your goals, not our convenience.", icon: Globe2 },
                { title: "Execution", text: "We go live fast, test everything, and put your money behind what wins.", icon: Users },
                { title: "Reporting", text: "Clear numbers on leads and revenue, so you always know what your ROAS (Return on Ad Spend) is.", icon: Bot },
              ].map((node, i) => {
                const Icon = node.icon;
                return (
                  <Reveal key={node.title} delay={0.08 + i * 0.08}>
                    <div className={`flow-node ${i === 3 ? "flow-node-last" : ""}`}>
                      <span><Icon size={19} /></span>
                      <div><small>STEP {String(i + 1).padStart(2, "0")}</small><strong>{node.title}</strong><p>{node.text}</p></div>
                      <span className="flow-node-check"><Check size={13} /></span>
                    </div>
                    {i < 3 && <div className="flow-connector"><span /></div>}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="testimonials" className="section testimonials-section">
          <div className="shell">
            <Reveal>
              <div className="section-top">
                <div>
                  <div className="eyebrow"><span className="eyebrow-line" /> WORD FROM THE FIELD</div>
                  <h2 className="section-heading">What Our Clients Say</h2>
                </div>
                <p className="section-aside">Clear communication, thoughtful strategy and a system built around business outcomes.</p>
              </div>
            </Reveal>

            <div className="testimonial-grid">
              {/* Replace these supplied placeholders with verified client testimonials before publication. */}
              {[
                "[Insert a real client quote about the team's understanding of their business and marketing goals.]",
                "[Insert a real client quote about campaign communication, lead quality or marketing improvements.]",
                "[Insert a real client quote about the experience of working with PANDAeCe.]",
              ].map((review, i) => (
                <Reveal key={review} delay={i * 0.08}>
                  <article className={`testimonial-card ${i === 1 ? "testimonial-highlight" : ""}`}>
                    <Quote className="quote-icon" size={24} />
                    
                    <blockquote>&ldquo;{review}&rdquo;</blockquote>
                    <div className="reviewer">
                      <div className="reviewer-avatar">0{i + 1}</div>
                      <div><strong>[CLIENT NAME]</strong><span>[Title], [Business]</span></div>
                      <span className="reviewer-arrow"><ArrowUpRight size={16} /></span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="testimonial-note">
              <CircleHelp size={14} /> Development note: These placeholders must be replaced with verified client testimonials before publication.
            </p>
            <div className="testimonial-cta">
              <a className="button button-secondary" href="#lead-form">
                Get Your Free Marketing Audit <ArrowUpRight size={17} />
              </a>
              <Link className="button button-primary" href="/booking">
                Start Growing Your Business <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="shell faq-layout">
            <Reveal>
              <div className="eyebrow"><span className="eyebrow-line" /> GOOD TO KNOW</div>
              <h2 className="section-heading">Common Questions Business Owners Ask Us About <span className="green-italic">Digital Marketing</span></h2>
              <p className="faq-intro">Still wondering if we&apos;re the right fit? Here are a few things people often ask before getting started.</p>
              <div className="faq-help">
                <span className="faq-help-icon"><CircleHelp size={19} /></span>
                <div>
                  <strong>Have another question?</strong>
                  <p>We&apos;re happy to talk it through.</p>
                  <Link href="/booking">Book a consultation <ArrowUpRight size={14} /></Link>
                  <a className="button button-outline faq-contact-cta" href="#lead-form">
                    Still Have Questions? Talk to Our Team <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}><FaqList /></Reveal>
          </div>
        </section>

        <section className="final-cta">
          <div className="cta-glow" />
          <div className="shell cta-inner">
            <div className="final-cta-copy">
            <Reveal>
              <span className="eyebrow eyebrow-light"><span className="live-dot" /> YOUR NEXT MOVE STARTS HERE</span>
              <h2>Your Startup Has a Goal. Let&apos;s Build the <span className="final-cta-highlight">Marketing System</span> to Support It.</h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Identify what&apos;s limiting your leads, conversions and marketing performance. Get a clear action plan to grow with confidence.
              </p>
              <Link href="/booking" className="button button-primary">
                Book Consultation, Get <span className="yellow-highlight">20% Off</span> <ArrowUpRight size={18} />
              </Link>
              <span className="cta-micro"><Check size={14} /> A practical conversation. Clear next steps.</span>
            </Reveal>
            </div>
            <div className="cta-decoration" aria-hidden="true">
              <div className="cta-ring ring-one" />
              <div className="cta-ring ring-two" />
              <div className="cta-ring ring-three" />
              <span>P</span><Sparkles className="cta-spark" size={24} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
