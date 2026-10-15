import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

const allowedServices = new Set([
  "Meta Ads",
  "Google Ads",
  "Lead Generation",
  "Website/Landing Page",
  "CRM & WhatsApp Automation",
  "Complete Marketing Solution",
]);

const allowedBudgets = new Set([
  "₹5 lakh+",
  "₹3 lakh – ₹5 lakh",
  "₹1 lakh – ₹3 lakh",
  "Below ₹1 lakh",
]);

const allowedGoals = new Set([
  "Generate more leads",
  "Reduce cost per lead",
  "Improve conversions",
  "Automate follow-ups",
]);

type LeadData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  services: string[];
  budget: string;
  goal: string;
  websiteUrl?: string;
  businessName?: string;
  decisionMaker?: string;
  website?: string;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return (
    /^\+?[\d\s().-]+$/.test(value) &&
    digits.length >= 10 &&
    digits.length <= 15
  );
}

function extractServices(payload: Record<string, unknown>): string[] {
  if (Array.isArray(payload.services)) {
    return payload.services.filter(
      (s): s is string => typeof s === "string" && s.trim().length > 0
    );
  }
  if (Array.isArray(payload.service)) {
    return payload.service.filter(
      (s): s is string => typeof s === "string" && s.trim().length > 0
    );
  }
  if (typeof payload.services === "string" && payload.services.trim().length > 0) {
    return [payload.services.trim()];
  }
  if (typeof payload.service === "string" && payload.service.trim().length > 0) {
    return [payload.service.trim()];
  }
  return [];
}

function isValidLead(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false;

  const { name, phone, email, budget, goal, website } = value;
  const services = extractServices(value);

  const isNameValid =
    typeof name === "string" &&
    name.trim().length >= 2 &&
    name.length <= 120;

  const isPhoneValid =
    typeof phone === "string" &&
    phone.length <= 24 &&
    isValidPhone(phone.trim());

  const isEmailValid =
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

  const areServicesValid =
    services.length > 0 &&
    services.every(
      (s) => allowedServices.has(s) || (s.length >= 2 && s.length <= 100)
    );

  const isBudgetValid =
    typeof budget === "string" &&
    (allowedBudgets.has(budget) || (budget.length >= 2 && budget.length <= 100));

  const isGoalValid =
    typeof goal === "string" &&
    (allowedGoals.has(goal) || (goal.length >= 2 && goal.length <= 200));

  const isWebsiteValid =
    website === undefined ||
    website === null ||
    (typeof website === "string" && website.length <= 500);

  return Boolean(
    isNameValid &&
      isPhoneValid &&
      isEmailValid &&
      areServicesValid &&
      isBudgetValid &&
      isGoalValid &&
      isWebsiteValid
  );
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const forwardedHost = request.headers
      .get("x-forwarded-host")
      ?.split(",")[0]
      ?.trim();

    const requestHost = forwardedHost || request.headers.get("host");

    return Boolean(
      requestHost &&
        originHost.toLowerCase() === requestHost.toLowerCase()
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return errorResponse(
      "This request could not be verified. Refresh the page and try again.",
      403
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) {
    return errorResponse("The submitted form is too large.", 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Please submit the completed form again.", 400);
  }

  if (!isRecord(payload)) {
    return errorResponse("Please submit the completed form again.", 400);
  }

  // Honeypot: reject bot submissions.
  if (
    typeof payload.website === "string" &&
    payload.website.trim().length > 0
  ) {
    return errorResponse(
      "We couldn't verify this submission. Please try again.",
      400
    );
  }

  if (!isValidLead(payload)) {
    return errorResponse(
      "Please check the form fields and try again.",
      400
    );
  }

  const rawServices = extractServices(payload);
  const primaryService = rawServices.join(", ") || (rawServices[0] ?? "");
  const websiteUrl =
    typeof payload.websiteUrl === "string" && payload.websiteUrl.trim().length > 0
      ? payload.websiteUrl.trim()
      : undefined;

  const businessName =
    typeof payload.businessName === "string" && payload.businessName.trim().length > 0
      ? payload.businessName.trim()
      : typeof payload.companyName === "string" && payload.companyName.trim().length > 0
      ? payload.companyName.trim()
      : undefined;

  const decisionMaker =
    typeof payload.decisionMaker === "string" && payload.decisionMaker.trim().length > 0
      ? payload.decisionMaker.trim()
      : undefined;

  const lead: LeadData = {
    name: String(payload.name).trim().replace(/\s+/g, " "),
    phone: String(payload.phone).trim(),
    email: String(payload.email).trim().toLowerCase(),
    service: primaryService,
    services: rawServices,
    budget: String(payload.budget).trim(),
    goal: String(payload.goal).trim(),
    websiteUrl,
    businessName,
    decisionMaker,
    website: "",
  };

  const apiKey = process.env.GHL_API_KEY || process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  try {
    if (apiKey && locationId) {
      const [firstName, ...lastNames] = lead.name.split(" ");
      const lastName = lastNames.join(" ");

      // Map tags matching senior pattern:
      const tags = [
        "digital marketing",
        "PANDAeCe - Website Form",
        ...(lead.service ? [`Service - ${lead.service}`] : []),
      ];

      // Build HighLevel contact payload matching senior structure:
      const ghlPayload: Record<string, unknown> = {
        locationId,
        firstName,
        name: lead.name,
        email: lead.email,
        source: "Landing Page Form",
        tags,
      };

      if (lastName) ghlPayload.lastName = lastName;
      if (lead.phone) ghlPayload.phone = lead.phone;
      if (lead.businessName) ghlPayload.companyName = lead.businessName;
      if (lead.websiteUrl) ghlPayload.website = lead.websiteUrl;

      // Map custom fields:
      const customFields: Array<{ key: string; field_value: string; value?: string }> = [];

      // 1. Services Interested:
      // Maps to senior's working key "service_needed" and requested key "which_services_interested"
      if (lead.service) {
        customFields.push({ key: "service_needed", field_value: lead.service, value: lead.service });
        customFields.push({ key: "which_services_interested", field_value: lead.service, value: lead.service });
        customFields.push({ key: "contact.which_services_interested", field_value: lead.service, value: lead.service });
      }

      // 2. Monthly Marketing Budget:
      // Maps to senior's working key "monthly_marketing_budget" and requested key "contact.monthly_marketing_budget"
      if (lead.budget) {
        customFields.push({ key: "monthly_marketing_budget", field_value: lead.budget, value: lead.budget });
        customFields.push({ key: "contact.monthly_marketing_budget", field_value: lead.budget, value: lead.budget });
      }

      // 3. Decision Maker:
      // Maps to senior's key "the_decision_maker_for_marketing_services"
      if (lead.decisionMaker) {
        customFields.push({
          key: "the_decision_maker_for_marketing_services",
          field_value: lead.decisionMaker,
          value: lead.decisionMaker,
        });
      }

      // 4. Primary Business Goal:
      // Maps to requested key "contact.what_is_your_primary_goal_for_the_next_36_months" and senior's "message"
      if (lead.goal) {
        customFields.push({
          key: "what_is_your_primary_goal_for_the_next_36_months",
          field_value: lead.goal,
          value: lead.goal,
        });
        customFields.push({
          key: "contact.what_is_your_primary_goal_for_the_next_36_months",
          field_value: lead.goal,
          value: lead.goal,
        });
        customFields.push({ key: "message", field_value: lead.goal, value: lead.goal });
      }

      if (customFields.length > 0) {
        ghlPayload.customFields = customFields;
      }

      // Send upsert to GoHighLevel with 2021-07-28 version:
      let res = await fetch(GHL_UPSERT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(ghlPayload),
        signal: AbortSignal.timeout(12000),
      });

      // Fallback: If GHL rejects due to duplicate custom field keys, retry with senior's core keys
      if (!res.ok && (res.status === 400 || res.status === 422)) {
        const errorDetail = await res.text();
        console.warn(
          "GHL upsert returned validation status, retrying with core custom field keys:",
          res.status,
          errorDetail
        );

        const coreCustomFields: Array<{ key: string; field_value: string }> = [];
        if (lead.service) coreCustomFields.push({ key: "service_needed", field_value: lead.service });
        if (lead.budget) coreCustomFields.push({ key: "monthly_marketing_budget", field_value: lead.budget });
        if (lead.decisionMaker) coreCustomFields.push({ key: "the_decision_maker_for_marketing_services", field_value: lead.decisionMaker });
        if (lead.goal) coreCustomFields.push({ key: "message", field_value: lead.goal });

        res = await fetch(GHL_UPSERT_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...ghlPayload,
            customFields: coreCustomFields.length > 0 ? coreCustomFields : undefined,
          }),
          signal: AbortSignal.timeout(12000),
        });
      }

      if (!res.ok) {
        const details = await res.text();
        console.error("GHL contact upsert failed:", res.status, details);
        return errorResponse(
          "We couldn't save your details right now. Please try again shortly.",
          502
        );
      }

      return NextResponse.json(
        {
          ok: true,
          success: true,
        },
        { status: 201 }
      );
    }

    // Optional webhook fallback.
    if (webhookUrl) {
      const endpoint = new URL(webhookUrl);

      if (
        endpoint.protocol !== "https:" &&
        process.env.NODE_ENV === "production"
      ) {
        return errorResponse(
          "Lead delivery isn't configured securely. Please contact the site administrator.",
          503
        );
      }

      const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      if (process.env.LEAD_WEBHOOK_BEARER_TOKEN) {
        headers.set(
          "Authorization",
          `Bearer ${process.env.LEAD_WEBHOOK_BEARER_TOKEN}`
        );
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          ...lead,
          source: "Landing Page Form",
          submittedAt: new Date().toISOString(),
          tags: ["digital marketing", "PANDAeCe - Website Form"],
          customFields: {
            service_needed: lead.service,
            which_services_interested: lead.service,
            monthly_marketing_budget: lead.budget,
            what_is_your_primary_goal_for_the_next_36_months: lead.goal,
            message: lead.goal,
          },
        }),
        signal: AbortSignal.timeout(12000),
      });

      if (!response.ok) {
        return errorResponse(
          "We couldn't save your details right now. Please try again shortly.",
          502
        );
      }

      return NextResponse.json({ ok: true, success: true }, { status: 201 });
    }

    return errorResponse(
      "The lead form is not connected yet. Please try again later or contact PANDAeCe directly.",
      503
    );
  } catch (error) {
    console.error("Lead delivery error:", error);

    return errorResponse(
      "We couldn't reach the lead service. Your details were not submitted; please try again shortly.",
      502
    );
  }
}
