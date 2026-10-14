
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, phone, company, service } =
      await request.json();

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email or phone are required.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.GHL_API_TOKEN;
    const locationId = process.env.GHL_LOCATION_ID;

    if (!apiKey || !locationId) {
      return NextResponse.json(
        {
          success: false,
          message: "GHL environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const nameParts = String(name).trim().split(/\s+/);

    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/upsert",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          locationId,
          firstName: nameParts[0],
          lastName: nameParts.slice(1).join(" "),
          ...(email ? { email } : {}),
          ...(phone ? { phone } : {}),
          ...(company ? { companyName: company } : {}),
        }),
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("GHL contact error:", response.status, data);

      return NextResponse.json(
        { success: false, message: "Unable to save contact to GHL." },
        { status: 502 }
      );
    }

    const contactId = data?.contact?.id;

    if (!contactId) {
      console.error("GHL response did not contain a contact ID.");

      return NextResponse.json(
        {
          success: false,
          message: "Contact saved, but its tags could not be added.",
        },
        { status: 502 }
      );
    }

    const tags = [
      "PANDAeCe Website Lead",
      ...(typeof service === "string" && service.trim()
        ? [service.trim()]
        : []),
    ];

    const tagResponse = await fetch(
      `https://services.leadconnectorhq.com/contacts/${contactId}/tags`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ tags }),
      }
    );

    if (!tagResponse.ok) {
      const tagError = await tagResponse.text();

      console.error(
        "GHL tag error:",
        tagResponse.status,
        tagError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Contact saved, but adding tags failed.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GHL submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid request or server error.",
      },
      { status: 500 }
    );
  }
}
