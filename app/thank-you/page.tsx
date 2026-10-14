
"use client";

import Link from "next/link";
import { ArrowLeft, Check, Mail } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ThankYouPage() {
  // Scheduling providers may redirect here after a completed booking. This
  // page stays neutral because no provider confirmation is verified by PANDAeCe.

  return (
    <>
      <Navbar />

      <main className="thankyou-page">
        <div className="thankyou-glow" />

        <div className="thankyou-card">
          <div className="success-icon">
            <Check size={27} />
            <span />
          </div>

          <div className="eyebrow">
            <span className="eyebrow-line" />
            THANK YOU
          </div>

          <h1>
            Thank You!
            <br />
            <span className="green-italic">Let's grow together.</span>
          </h1>

          <p className="thankyou-copy">
            If you completed the scheduling steps, your provider will send the
            booking confirmation and meeting details. If you have not chosen a
            time yet, you can return to the booking calendar below.
          </p>

          <div className="thankyou-notice">
            <Mail size={17} />
            This page does not verify your appointment. Check your booking provider’s confirmation for the final details.
          </div>

          <Link href="/" className="button button-dark">
            <ArrowLeft size={15} /> Back to home
          </Link>

          <Link href="/booking" className="thankyou-reschedule">
            Book a time
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
