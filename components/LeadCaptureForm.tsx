"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  LoaderCircle,
  Mail,
  Phone,
  Target,
  UserRound,
  Wallet,
} from "lucide-react";
import styles from "./LeadCaptureForm.module.css";

const services = [
  "Meta Ads",
  "Google Ads",
  "Lead Generation",
  "Website/Landing Page",
  "CRM & WhatsApp Automation",
  "Complete Marketing Solution",
];
const budgets = ["Below ₹10,000", "₹10,000–₹25,000", "₹25,000–₹50,000", "₹50,000+"];
const goals = ["Generate more leads", "Reduce cost per lead", "Improve conversions", "Automate follow-ups"];

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  goal: string;
  website: string;
};
type Field = Exclude<keyof LeadFormData, "website">;
type FieldErrors = Partial<Record<Field, string>>;

const initialData: LeadFormData = {
  name: "", phone: "", email: "", service: "", budget: "", goal: "", website: "",
};

function validate(data: LeadFormData): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = "Enter your full name.";
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(data.phone.trim()) || phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Enter a valid phone number with 10 to 15 digits.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim())) errors.email = "Enter a valid business email address.";
  if (!services.includes(data.service)) errors.service = "Choose a service.";
  if (!budgets.includes(data.budget)) errors.budget = "Choose an advertising budget.";
  if (!goals.includes(data.goal)) errors.goal = "Choose your primary goal.";
  return errors;
}

export default function LeadCaptureForm() {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const reducedMotion = useReducedMotion();

  function update<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setForm(current => ({ ...current, [key]: value }));
    if (key !== "website") setErrors(current => ({ ...current, [key]: undefined }));
    if (status === "error") { setStatus("idle"); setMessage(""); }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting" || status === "success") return;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => null) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message || "We couldn't submit your details. Please try again.");
      setStatus("success");
      setMessage("Thanks — your details were received. Our team will be in touch soon.");
      setForm(initialData);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We couldn't submit your details. Please try again.");
    }
  }

  const inputId = (field: Field) => `lead-${field}`;
  const describedBy = (field: Field) => errors[field] ? `${inputId(field)}-error` : undefined;

  return (
    <motion.section
      id="lead-form"
      className={styles.card}
      aria-labelledby="lead-form-title"
      style={{ transformPerspective: 1100 }}
      initial={reducedMotion ? false : { opacity: 0, y: 22, rotateY: -3 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      whileHover={reducedMotion ? undefined : { y: -3, rotateY: 0.5 }}
      transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.heading}>
        <span className={styles.eyebrow}><span /> YOUR GROWTH STARTS HERE</span>
        <h2 id="lead-form-title">Tell us what you want to grow</h2>
        <p>Share a few details and we&apos;ll help you find the right next step.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor={inputId("name")}><span className={styles.labelIcon} aria-hidden="true"><UserRound size={15} /></span>Full name <span aria-hidden="true">*</span></label>
            <input id={inputId("name")} name="name" autoComplete="name" required maxLength={100}
              value={form.name} onChange={event => update("name", event.target.value)}
              aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} />
            {errors.name && <span className={styles.fieldError} id={`${inputId("name")}-error`}>{errors.name}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor={inputId("phone")}><span className={styles.labelIcon} aria-hidden="true"><Phone size={15} /></span>Phone number <span aria-hidden="true">*</span></label>
            <input id={inputId("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel"
              required maxLength={24} value={form.phone} onChange={event => update("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} />
            {errors.phone && <span className={styles.fieldError} id={`${inputId("phone")}-error`}>{errors.phone}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor={inputId("email")}><span className={styles.labelIcon} aria-hidden="true"><Mail size={15} /></span>Business email <span aria-hidden="true">*</span></label>
            <input id={inputId("email")} name="email" type="email" autoComplete="email" required maxLength={254}
              value={form.email} onChange={event => update("email", event.target.value)}
              aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} />
            {errors.email && <span className={styles.fieldError} id={`${inputId("email")}-error`}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor={inputId("service")}><span className={styles.labelIcon} aria-hidden="true"><Briefcase size={15} /></span>Service required <span aria-hidden="true">*</span></label>
            <select id={inputId("service")} name="service" required value={form.service}
              onChange={event => update("service", event.target.value)} aria-invalid={Boolean(errors.service)}
              aria-describedby={describedBy("service")}>
              <option value="" disabled>Select a service</option>
              {services.map(service => <option key={service} value={service}>{service}</option>)}
            </select>
            {errors.service && <span className={styles.fieldError} id={`${inputId("service")}-error`}>{errors.service}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor={inputId("budget")}><span className={styles.labelIcon} aria-hidden="true"><Wallet size={15} /></span>Monthly advertising budget <span aria-hidden="true">*</span></label>
            <select id={inputId("budget")} name="budget" required value={form.budget}
              onChange={event => update("budget", event.target.value)} aria-invalid={Boolean(errors.budget)}
              aria-describedby={describedBy("budget")}>
              <option value="" disabled>Select a budget</option>
              {budgets.map(budget => <option key={budget} value={budget}>{budget}</option>)}
            </select>
            {errors.budget && <span className={styles.fieldError} id={`${inputId("budget")}-error`}>{errors.budget}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor={inputId("goal")}><span className={styles.labelIcon} aria-hidden="true"><Target size={15} /></span>Primary goal <span aria-hidden="true">*</span></label>
            <select id={inputId("goal")} name="goal" required value={form.goal}
              onChange={event => update("goal", event.target.value)} aria-invalid={Boolean(errors.goal)}
              aria-describedby={describedBy("goal")}>
              <option value="" disabled>Select your goal</option>
              {goals.map(goal => <option key={goal} value={goal}>{goal}</option>)}
            </select>
            {errors.goal && <span className={styles.fieldError} id={`${inputId("goal")}-error`}>{errors.goal}</span>}
          </div>
        </div>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="lead-website">Leave this field empty</label>
          <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" value={form.website}
            onChange={event => update("website", event.target.value)} />
        </div>

        {message && <p className={`${styles.message} ${status === "success" ? styles.success : styles.error}`}
          role={status === "success" ? "status" : "alert"} aria-live={status === "success" ? "polite" : "assertive"}>
          {status === "success" && <CheckCircle2 size={18} aria-hidden="true" />}{message}
        </p>}

        <button className={styles.submit} type="submit" disabled={status === "submitting" || status === "success"}>
          {status === "submitting" ? <><LoaderCircle className={styles.spinner} size={18} aria-hidden="true" /> Sending…</>
            : status === "success" ? <>Details received <CheckCircle2 size={18} aria-hidden="true" /></>
            : <>Get my growth plan <ArrowUpRight size={18} aria-hidden="true" /></>}
        </button>
        <p className={styles.privacy}>Your details are only used to follow up about your enquiry.</p>
      </form>
    </motion.section>
  );
}
