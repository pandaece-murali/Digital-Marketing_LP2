import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedServices = new Set([
  "Meta Ads",
  "Google Ads",
  "Lead Generation",
  "Website/Landing Page",
  "CRM & WhatsApp Automation",
  "Complete Marketing Solution",
]);
const allowedBudgets = new Set(["Below ₹10,000", "₹10,000–₹25,000", "₹25,000–₹50,000", "₹50,000+"]);
const allowedGoals = new Set(["Generate more leads", "Reduce cost per lead", "Improve conversions", "Automate follow-ups"]);

type Lead = {
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  goal: string;
  website: string;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ ok: false, message }, { status });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 10 && digits.length <= 15;
}

function isValidLead(value: unknown): value is Lead {
  if (!isRecord(value)) return false;
  const { name, phone, email, service, budget, goal, website } = value;
  return typeof name === "string" && name.trim().length >= 2 && name.length <= 100
    && typeof phone === "string" && phone.length <= 24 && isValidPhone(phone.trim())
    && typeof email === "string" && email.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    && typeof service === "string" && allowedServices.has(service)
    && typeof budget === "string" && allowedBudgets.has(budget)
    && typeof goal === "string" && allowedGoals.has(goal)
    && typeof website === "string" && website.length <= 500;
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originHost = new URL(origin).host;
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host");
    return Boolean(requestHost && originHost.toLowerCase() === requestHost.toLowerCase());
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return errorResponse("This request could not be verified. Refresh the page and try again.", 403);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 16_384) return errorResponse("The submitted form is too large.", 413);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("Please submit the completed form again.", 400);
  }

  if (!isRecord(payload)) return errorResponse("Please submit the completed form again.", 400);
  if (typeof payload.website === "string" && payload.website.trim()) {
    return errorResponse("We couldn't verify this submission. Please try again.", 400);
  }
  if (!isValidLead(payload)) return errorResponse("Please check the form fields and try again.", 400);

  const lead = {
    name: payload.name.trim().replace(/\s+/g, " "),
    phone: payload.phone.trim(),
    email: payload.email.trim().toLowerCase(),
    service: payload.service,
    budget: payload.budget,
    goal: payload.goal,
  };

  const ghlToken = process.env.GHL_API_TOKEN;
  const ghlLocationId = process.env.GHL_LOCATION_ID;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  try {
    if (ghlToken && ghlLocationId) {
      const nameParts = lead.name.split(" ");
      const source = `PANDAeCe website lead | Service: ${lead.service} | Monthly budget: ${lead.budget} | Goal: ${lead.goal}`;
      const response = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ghlToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          Version: "v3",
        },
        body: JSON.stringify({
          locationId: ghlLocationId,
          name: lead.name,
          firstName: nameParts[0],
          ...(nameParts.length > 1 ? { lastName: nameParts.slice(1).join(" ") } : {}),
          email: lead.email,
          phone: lead.phone,
          source,
          createNewIfDuplicateAllowed: false,
        }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) return errorResponse("We couldn't save your details right now. Please try again shortly.", 502);
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    if (webhookUrl) {
      const endpoint = new URL(webhookUrl);
      if (endpoint.protocol !== "https:" && process.env.NODE_ENV === "production") {
        return errorResponse("Lead delivery isn't configured securely. Please contact the site administrator.", 503);
      }
      const headers = new Headers({ "Content-Type": "application/json", Accept: "application/json" });
      if (process.env.LEAD_WEBHOOK_BEARER_TOKEN) {
        headers.set("Authorization", `Bearer ${process.env.LEAD_WEBHOOK_BEARER_TOKEN}`);
      }
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ ...lead, source: "PANDAeCe website lead", submittedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!response.ok) return errorResponse("We couldn't save your details right now. Please try again shortly.", 502);
      return NextResponse.json({ ok: true }, { status: 201 });
    }

    return errorResponse("The lead form is not connected yet. Please try again later or contact PANDAeCe directly.", 503);
  } catch {
    return errorResponse("We couldn't reach the lead service. Your details were not submitted; please try again shortly.", 502);
  }
}
