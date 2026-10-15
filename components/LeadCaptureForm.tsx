
"use client";

import { FormEvent, useState } from "react";
import styles from "./LeadCaptureForm.module.css";

const services = [
  "Meta Ads",
  "Google Ads",
  "Lead Generation",
  "Website/Landing Page",
  "CRM & WhatsApp Automation",
  "Complete Marketing Solution",
];

const budgets = [
  "₹5 lakh+",
  "₹3 lakh – ₹5 lakh",
  "₹1 lakh – ₹3 lakh",
  "Below ₹1 lakh",
];

const goals = [
  "Generate more leads",
  "Reduce cost per lead",
  "Improve conversions",
  "Automate follow-ups",
];

type FormData = {
  name: string;
  phone: string;
  email: string;
  websiteUrl: string;
  service: string;
  budget: string;
  goal: string;
  website: string;
};
const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  websiteUrl: "",
  service: "",
  budget: "",
  goal: "",
  website: "",
};

export default function LeadCaptureForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setStatus("");
    setStatusType("");

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (
      !name ||
      !phone ||
      !email ||
      !form.service ||
      !form.budget ||
      !form.goal
    ) {
      setStatus("Please complete all required fields.");
      setStatusType("error");
      return;
    }

    if (
      name.length > 120 ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
    ) {
      setStatus("Please check your name and email address.");
      setStatusType("error");
      return;
    }

    const digits = phone.replace(/\D/g, "");

    if (
      !/^\+?[\d\s().-]+$/.test(phone) ||
      digits.length < 10 ||
      digits.length > 15
    ) {
      setStatus("Please enter a valid phone number.");
      setStatusType("error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  name,
  phone,
  email,
  websiteUrl: form.websiteUrl.trim(),
  service: form.service,
  budget: form.budget,
  goal: form.goal,
  website: form.website,
}),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error(
          typeof result.message === "string"
            ? result.message
            : "Unable to submit your details. Please try again."
        );
      }

      window.location.href = "/thank-you";
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.section} id="lead-form">
      <div className={styles.formCard}>
        <div className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            YOUR GROWTH STARTS HERE
          </div>

          <h2 className={styles.title}>
            Tell us what you want to grow
          </h2>

          <p className={styles.description}>
            Share a few details and we&apos;ll help you find the right next step.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">
              <span className={styles.fieldIcon} aria-hidden="true">♙</span>
              Full name <span className={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              maxLength={120}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">
              <span className={styles.fieldIcon} aria-hidden="true">♧</span>
              Phone number <span className={styles.required}>*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">
              <span className={styles.fieldIcon} aria-hidden="true">✉</span>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your business email"
              value={form.email}
              onChange={handleChange}
              maxLength={254}
              required
              disabled={loading}
            />
          </div>
          <div className={styles.field}>
  <label htmlFor="website">
    <span className={styles.fieldIcon} aria-hidden="true">↗</span>
    Website <span className={styles.optional}>(Optional)</span>
  </label>

  <input
    id="website"
    name="websiteUrl"
    type="url"
    placeholder="https://yourwebsite.com"
    value={form.websiteUrl}
    onChange={handleChange}
    disabled={loading}
  />
</div>

          <div className={styles.field}>
            <label htmlFor="service">
              <span className={styles.fieldIcon} aria-hidden="true">▤</span>
              Service required <span className={styles.required}>*</span>
            </label>
            <select
              id="service"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="" disabled>Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="budget">
              <span className={styles.fieldIcon} aria-hidden="true">▱</span>
              Monthly budget <span className={styles.required}>*</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="" disabled>Select a budget</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="goal">
              <span className={styles.fieldIcon} aria-hidden="true">◎</span>
              Primary goal <span className={styles.required}>*</span>
            </label>
            <select
              id="goal"
              name="goal"
              value={form.goal}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="" disabled>Select your goal</option>
              {goals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          {status && (
            <div
              className={`${styles.status} ${
                statusType === "success" ? styles.success : styles.error
              }`}
              role="status"
              aria-live="polite"
            >
              {status}
            </div>
          )}

          <div className={styles.footer}>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={loading}
            >
              <span>
                {loading ? "Submitting..." : "Get my growth plan"}
              </span>
              {!loading && (
                <span className={styles.buttonArrow} aria-hidden="true">
                  ↗
                </span>
              )}
            </button>

            <p className={styles.privacy}>
              Your details are only used to follow up about your enquiry.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
