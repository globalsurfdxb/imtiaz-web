import { NextRequest, NextResponse } from "next/server";

const SF_TOKEN_URL = "https://test.salesforce.com/services/oauth2/token";
const SF_LEAD_URL = "https://imtiaz--uat.sandbox.my.salesforce.com/services/data/v59.0/sobjects/Lead/";

async function getSalesforceToken(): Promise<string> {
  const params = new URLSearchParams({
    grant_type: "password",
    client_id:     process.env.SF_CLIENT_ID!,
    client_secret: process.env.SF_CLIENT_SECRET!,
    username:      process.env.SF_USERNAME!,
    password:      process.env.SF_PASSWORD!,
  });

  const res = await fetch(`${SF_TOKEN_URL}?${params.toString()}`, {
    method: "POST",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("Salesforce token error:", err);
    throw new Error("Failed to get Salesforce access token");
  }

  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const payload = {
    FirstName:   data.firstName,
    LastName:    data.lastName,
    Email:       data.email,
    Phone:       data.mobile?.replace(/\D/g, ""),
    Company:     "Imtiaz Website",
    Description: `[Book a Viewing] Requested: ${data.appointmentDateTime} - ${data.message || ""}`,
    LeadSource:  "Web",
    // UTM fields — map to whatever Salesforce custom fields you have
    // utm_channel:      "Digital",
    // utm_source:       data.utm_source      || "",
    // utm_medium:       data.utm_medium      || "",
    // utm_campaign:     data.utm_campaign    || "",
    // utm_term:         data.utm_term        || "",
    // utm_content:      data.utm_content     || "",
    // utm_adgroupid:    data.utm_adgroupid   || "",
    // utm_adgroupname:  data.utm_adgroupname || "",
    // utm_adid:         data.utm_adid        || "",
    // utm_device:       data.utm_device      || "",
    // utm_network:      data.utm_network     || "",
    // utm_placement:    data.utm_placement   || "",
    // Geo fields
    // ip_city:        data.ip_city        || "",
    // ip_country:     data.ip_country     || "",
    // ip_state:       data.ip_state       || "",
    // ip_countrycode: data.ip_countrycode || "",
    // ip_timezone:    data.ip_timezone    || "",
    // Meta
    // landing_page: data.landingPageName || "book-a-viewing",
    // website_url:  data.website_url     || "",
  };

  console.log("Salesforce viewing payload:", payload);

  try {
    const token = await getSalesforceToken();

    const sfRes = await fetch(SF_LEAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const sfData = await sfRes.json().catch(() => ({}));

    if (!sfRes.ok) {
      console.error("Salesforce lead error:", sfRes.status, sfData);
    }

    return NextResponse.json(
      { success: sfRes.ok, sf_response: sfData },
      { status: sfRes.status }
    );
  } catch (err) {
    console.error("Viewing route error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}