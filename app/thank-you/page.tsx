
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setSeconds((previous) => Math.max(0, previous - 1));
    }, 1000);

    const redirect = window.setTimeout(() => {
      window.location.href = "/";
    }, 5000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        boxSizing: "border-box",
        background:
          "radial-gradient(ellipse at top right, rgba(0,200,83,0.12), transparent 45%), #04170c",
        color: "#f5faf5",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          padding: "48px 36px",
          boxSizing: "border-box",
          textAlign: "center",
          background: "#0b2817",
          border: "1px solid #1e5632",
          borderRadius: "20px",
          boxShadow: "0 24px 70px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            borderRadius: "50%",
            background: "#b7ff36",
            color: "#07170b",
            fontSize: "32px",
            fontWeight: 800,
          }}
        >
          ✓
        </div>

        <p
          style={{
            margin: "0 0 18px",
            color: "#b7ff36",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.5px",
          }}
        >
          PANDAeCe · EMPOWER · CONVERGE · EXCEL
        </p>

        <h1
          style={{
            margin: "0 0 18px",
            fontSize: "clamp(30px, 6vw, 42px)",
            fontWeight: 750,
            letterSpacing: "-1.2px",
            lineHeight: 1.15,
          }}
        >
          Thank you for{" "}
          <span style={{ color: "#b7ff36" }}>reaching out!</span>
        </h1>

        <p
          style={{
            maxWidth: "410px",
            margin: "0 auto 28px",
            color: "#bdcec2",
            fontSize: "15px",
            lineHeight: 1.8,
          }}
        >
          Your details have been submitted successfully. Our team will review
          your enquiry and get in touch with you.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            minHeight: "50px",
            padding: "0 24px",
            borderRadius: "9px",
            background: "#b7ff36",
            color: "#07170b",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 750,
          }}
        >
          Back to Homepage ↗
        </Link>

        <p
          aria-live="polite"
          style={{
            margin: "24px 0 0",
            color: "#91a99a",
            fontSize: "12px",
            lineHeight: 1.7,
          }}
        >
          Redirecting to homepage in {seconds} seconds...
        </p>
      </div>
    </main>
  );
}
