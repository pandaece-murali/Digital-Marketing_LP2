
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const GHL_BASE_URL = "https://services.leadconnectorhq.com";

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

function isValidLead(value: unknown): value is Lead {
  if (!isRecord(value)) return false;

  const { name, phone, email, service, budget, goal, website } = value;

  return (
    typeof name === "string" &&
    name.trim().length >= 2 &&
    name.length <= 100 &&
    typeof phone === "string" &&
    phone.length <= 24 &&
    isValidPhone(phone.trim()) &&
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) &&
    typeof service === "string" &&
    allowedServices.has(service) &&
    typeof budget === "string" &&
    allowedBudgets.has(budget) &&
    typeof goal === "string" &&
    allowedGoals.has(goal) &&
    typeof website === "string" &&
    website.length <= 500
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

    const requestHost =
      forwardedHost || request.headers.get("host");

    return Boolean(
      requestHost &&
        originHost.toLowerCase() === requestHost.toLowerCase()
    );
  } catch {
    return false;
  }
}

// Automatically create a tag in the GHL location.
// If the tag already exists, GHL may reject the duplicate;
// the contact-tag step below will still be attempted.
async function createGhlTag(
  tagName: string,
  token: string,
  locationId: string
) {
  const response = await fetch(
    `${GHL_BASE_URL}/locations/${locationId}/tags`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Version: "v3",
      },
      body: JSON.stringify({ name: tagName }),
      signal: AbortSignal.timeout(8000),
    }
  );

  if (response.ok) {
    return;
  }

  const details = await response.text();

  // Do not stop a lead submission just because a tag
  // could not be created. Log the actual API error.
  console.error(
    `GHL tag creation failed for "${tagName}":`,
    response.status,
    details
  );
}

// Apply tags to the created or updated contact.
async function applyGhlTags(
  contactId: string,
  tags: string[],
  token: string
) {
  const response = await fetch(
    `${GHL_BASE_URL}/contacts/${contactId}/tags`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        Version: "v3",
      },
      body: JSON.stringify({ tags }),
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!response.ok) {
    const details = await response.text();

    console.error(
      "GHL contact tag application failed:",
      response.status,
      details
    );

    return false;
  }

  return true;
}

function getTagsForService(service: string) {
  const serviceTagMap: Record<string, string> = {
    "Meta Ads": "Service - Meta Ads",
    "Google Ads": "Service - Google Ads",
    "Lead Generation": "Service - Lead Generation",
    "Website/Landing Page": "Service - Website",
    "CRM & WhatsApp Automation": "Service - CRM Automation",
    "Complete Marketing Solution": "Service - Complete Solution",
  };

  return [
    "PANDAeCe - Website Form",
    "Digital Marketing",
    ...(serviceTagMap[service]
      ? [serviceTagMap[service]]
      : []),
  ];
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return errorResponse(
      "This request could not be verified. Refresh the page and try again.",
      403
    );
  }

  const contentLength = Number(
    request.headers.get("content-length") || 0
  );

  if (contentLength > 16_384) {
    return errorResponse("The submitted form is too large.", 413);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return errorResponse(
      "Please submit the completed form again.",
      400
    );
  }

  if (!isRecord(payload)) {
    return errorResponse(
      "Please submit the completed form again.",
      400
    );
  }

  // Honeypot: reject bot submissions.
  if (
    typeof payload.website === "string" &&
    payload.website.trim()
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

      const source =
        `PANDAeCe website lead | Service: ${lead.service}` +
        ` | Monthly budget: ${lead.budget}` +
        ` | Goal: ${lead.goal}`;

      // 1. Create or update the GHL contact.
      const response = await fetch(
        `${GHL_BASE_URL}/contacts/upsert`,
        {
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
            ...(nameParts.length > 1
              ? { lastName: nameParts.slice(1).join(" ") }
              : {}),
            email: lead.email,
            phone: lead.phone,
            source,
            createNewIfDuplicateAllowed: false,
          }),
          signal: AbortSignal.timeout(12000),
        }
      );

      if (!response.ok) {
        const details = await response.text();

        console.error(
          "GHL contact upsert failed:",
          response.status,
          details
        );

        return errorResponse(
          "We couldn't save your details right now. Please try again shortly.",
          502
        );
      }

      const result: unknown = await response.json();

      // 2. Read the contact ID from GHL's response.
      let contactId: string | undefined;

      if (isRecord(result) && isRecord(result.contact)) {
        const id = result.contact.id;

        if (typeof id === "string") {
          contactId = id;
        }
      }

      if (!contactId) {
        console.error(
          "GHL upsert succeeded but returned no contact ID."
        );

        // The contact may already have been saved.
        // Do not tell the visitor that the submission failed.
        return NextResponse.json(
          {
            ok: true,
            warning: "Contact saved; tag application needs checking.",
          },
          { status: 201 }
        );
      }

      // 3. Generate the required tags from the selected service.
      const tags = getTagsForService(lead.service);

      // 4. Attempt to create all tags automatically.
      // Existing tags may return an error; that is logged.
      for (const tag of tags) {
        await createGhlTag(
          tag,
          ghlToken,
          ghlLocationId
        );
      }

      // 5. Apply the tags to this contact.
      const tagsApplied = await applyGhlTags(
        contactId,
        tags,
        ghlToken
      );

      return NextResponse.json(
        {
          ok: true,
          tagsApplied,
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
          source: "PANDAeCe website lead",
          submittedAt: new Date().toISOString(),
          tags: getTagsForService(lead.service),
        }),
        signal: AbortSignal.timeout(12000),
      });

      if (!response.ok) {
        return errorResponse(
          "We couldn't save your details right now. Please try again shortly.",
          502
        );
      }

      return NextResponse.json({ ok: true }, { status: 201 });
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
