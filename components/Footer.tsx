
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link
              href="/"
              className="brand footer-logo-link"
              aria-label="PANDAeCe Home"
            >
              <Image
                src="/images/pandaece-logo-new.png"
                alt="PANDAeCe Performance Marketing"
                width={220}
                height={70}
                className="footer-logo-image"
              />
            </Link>

            <p>
              One team. Connected marketing. A clearer path from first click
              to customer.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <Link href="/#about">About us</Link>
              <Link href="/#services">Services</Link>
              <Link href="/#results">Our experience</Link>
              <Link href="/#faq">FAQs</Link>
            </div>

            <div>
              <strong>Get started</strong>
              <Link href="#lead-form">
                <Phone size={15} aria-hidden="true" />
                Book a consultation
              </Link>

              <Link href="/#services">
                <span className="footer-social-icons" aria-hidden="true">
                  <Facebook size={15} />
                  <Instagram size={15} />
                  <Linkedin size={15} />
                </span>
                Marketing services
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} PANDAeCe. All rights reserved.
          </span>

          <div className="footer-legal">
            <Link
              href="https://pandaece.com/terms-conditions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms Of Services
            </Link>
            <span className="footer-legal-dot" aria-hidden="true">•</span>
            <Link
              href="https://pandaece.com/privacy-and-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </div>

          <span>
            <MapPin size={16} aria-hidden="true" />
            Built for ambitious businesses
          </span>
        </div>
      </div>
    </footer>
  );
}
