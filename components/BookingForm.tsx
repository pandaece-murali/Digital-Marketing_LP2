"use client";

import { useState } from "react";
import { CalendarClock, CalendarDays, ExternalLink } from "lucide-react";

const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

export default function BookingForm() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!bookingUrl) {
    return (
      <div className="booking-card booking-unconfigured">
        <span className="booking-icon"><CalendarDays size={22} /></span>
        <h2>Online booking is being set up</h2>
        <p>
          Add your Calendly, Cal.com, or other scheduling link in
          <code> NEXT_PUBLIC_BOOKING_URL </code> to let visitors choose a time.
        </p>
        <a className="button button-primary" href="/#about">
          Back to PANDAeCe <ExternalLink size={16} />
        </a>
      </div>
    );
  }

  return (
    <div className="booking-card booking-embed-card">
      {!loaded && !failed && (
        <p className="booking-status" role="status"><CalendarClock size={17} aria-hidden="true" /> Loading the booking calendar…</p>
      )}
      {failed ? (
        <div className="booking-status booking-error" role="alert">
          The calendar could not be loaded. Open the scheduling page directly:
          <a href={bookingUrl} target="_blank" rel="noreferrer">Open booking page <ExternalLink size={14} /></a>
        </div>
      ) : (
        <iframe
          title="PANDAeCe consultation booking calendar"
          src={bookingUrl}
          className="booking-iframe"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          allow="payment"
        />
      )}
    </div>
  );
}
