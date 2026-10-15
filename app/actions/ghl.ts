"use server";

export async function submitToGHL(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const businessName = formData.get("businessName") as string;
  const website = (formData.get("websiteUrl") as string) || (formData.get("website") as string);
  const service = formData.get("service") as string;
  const budget = formData.get("budget") as string;
  const goal = formData.get("goal") as string;
  const decisionMaker = formData.get("decisionMaker") as string;

  if (!name || !email) {
    return { success: false, error: "Name and email are required." };
  }

  const [firstName, ...lastNames] = name.trim().split(" ");
  const lastName = lastNames.join(" ");

  const apiKey = process.env.GHL_API_KEY || process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error("GHL API Key or Location ID is missing");
    return { success: false, error: "Configuration error." };
  }

  // Map the extra form fields to tags so they show up in GHL
  const tags = ["digital marketing", "PANDAeCe - Website Form"];
  if (service) {
    tags.push(`Service - ${service}`);
  }

  try {
    const payload: Record<string, unknown> = {
      locationId,
      firstName,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      source: "Landing Page Form",
      tags,
    };

    if (lastName) payload.lastName = lastName;
    if (phone) payload.phone = phone.trim();
    if (businessName) payload.companyName = businessName.trim();
    if (website && website.trim()) payload.website = website.trim();

    const customFields: Array<{ key: string; field_value: string; value?: string }> = [];

    // Services Interested
    if (service) {
      customFields.push({ key: "service_needed", field_value: service, value: service });
      customFields.push({ key: "which_services_interested", field_value: service, value: service });
      customFields.push({ key: "contact.which_services_interested", field_value: service, value: service });
    }

    // Monthly Marketing Budget
    if (budget) {
      customFields.push({ key: "monthly_marketing_budget", field_value: budget, value: budget });
      customFields.push({ key: "contact.monthly_marketing_budget", field_value: budget, value: budget });
    }

    // Decision Maker
    if (decisionMaker) {
      customFields.push({
        key: "the_decision_maker_for_marketing_services",
        field_value: decisionMaker,
        value: decisionMaker,
      });
    }

    // Primary Business Goal
    if (goal) {
      customFields.push({
        key: "what_is_your_primary_goal_for_the_next_36_months",
        field_value: goal,
        value: goal,
      });
      customFields.push({
        key: "contact.what_is_your_primary_goal_for_the_next_36_months",
        field_value: goal,
        value: goal,
      });
      customFields.push({ key: "message", field_value: goal, value: goal });
    }

    if (customFields.length > 0) {
      payload.customFields = customFields;
    }

    let res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Fallback: If GHL returns 400 due to duplicate keys, retry with primary keys
    if (!res.ok && (res.status === 400 || res.status === 422)) {
      const primaryCustomFields: Array<{ key: string; field_value: string }> = [];
      if (service) primaryCustomFields.push({ key: "service_needed", field_value: service });
      if (budget) primaryCustomFields.push({ key: "monthly_marketing_budget", field_value: budget });
      if (decisionMaker) primaryCustomFields.push({ key: "the_decision_maker_for_marketing_services", field_value: decisionMaker });
      if (goal) primaryCustomFields.push({ key: "message", field_value: goal });

      const fallbackPayload = {
        ...payload,
        customFields: primaryCustomFields,
      };

      res = await fetch("https://services.leadconnectorhq.com/contacts/upsert", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fallbackPayload),
      });
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error("GHL API Error:", errorText);
      return { success: false, error: `CRM Error: ${errorText}` };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("GHL Submission Exception:", err);
    return { success: false, error: `Exception: ${errorMsg}` };
  }
}
