
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Consultation | PANDAeCe",
  description: "Book a digital marketing consultation with PANDAeCe.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />

      <main className="booking-page">
        <div className="shell booking-layout">
          <div className="booking-intro">
            <Link href="/" className="back-link">
              <ArrowLeft size={15} /> Back to PANDAeCe
            </Link>

            <div className="eyebrow eyebrow-light">
              <span className="live-dot" /> <CalendarClock size={16} aria-hidden="true" /> LET'S TALK GROWTH
            </div>

            <h1>
              Book Your Free <span className="accent-text">Consultation</span>
            </h1>

            <p>
              Choose an available time in the calendar. We&apos;ll review your ads,
              website and lead follow-up, then share clear next steps.
            </p>

            <div className="booking-benefits">
              <div>
                <span><CheckCircle2 size={17} /></span>
                <div>
                  <strong>A focused conversation</strong>
                  <small>Talk through your current setup and goals.</small>
                </div>
              </div>

              <div>
                <span><CheckCircle2 size={17} /></span>
                <div>
                  <strong>Clear next steps</strong>
                  <small>Identify practical growth opportunities.</small>
                </div>
              </div>

              <div>
                <span><CheckCircle2 size={17} /></span>
                <div>
                  <strong>20% off your first engagement</strong>
                  <small>Discuss eligibility during your consultation.</small>
                </div>
              </div>
            </div>

            <div className="booking-trust">
              <ShieldCheck size={17} />
              Your scheduling details are handled by the booking provider.
            </div>
          </div>

          <div className="booking-form-wrap">
            <BookingForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
