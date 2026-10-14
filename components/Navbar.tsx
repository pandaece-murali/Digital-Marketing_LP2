"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "/#about", section: "about" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Results", href: "/#results", section: "results" },
  { label: "Testimonials", href: "/#testimonials", section: "testimonials" },
  { label: "FAQ", href: "/#faq", section: "faq" },
  { label: "Contact", href: "/#lead-form", section: "lead-form" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const targets = links
      .map(({ section }) => document.getElementById(section))
      .filter((target): target is HTMLElement => target !== null);

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`site-header ${
        scrolled ? "site-header-scrolled" : ""
      }`}
    >
      <div className="shell nav">
        {/* PANDAeCe Image Logo */}
        <Link
          href="/"
          className="brand"
          aria-label="PANDAeCe home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/pandaece-logo.png"
            alt="PANDAeCe — Empower, Converge, Excel"
            width={220}
            height={70}
            priority
            className="brand-logo-image"
          />
        </Link>

        {/* Desktop and Mobile Navigation */}
        <nav className={`nav-links ${open ? "nav-open" : ""}`}>
          {links.map((link) => (
            <Link
              key={link.section}
              href={link.href}
              className={
                activeSection === link.section
                  ? "nav-link-active"
                  : undefined
              }
              aria-current={
                activeSection === link.section
                  ? "location"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/booking"
            className="mobile-cta"
            onClick={() => setOpen(false)}
          >
            Book a consultation <ArrowUpRight size={16} />
          </Link>
        </nav>

        {/* Desktop Booking Button */}
        <Link href="/booking" className="nav-cta">
          Book a Call <ArrowUpRight size={16} />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}