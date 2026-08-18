import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const payload = {
    FirstName: data.firstName,
    LastName: data.lastName,
    Email: data.email,
    Phone: data.mobile?.replace(/\D/g, ""),
    Message: data.message || "",
    utm_channel: "Digital",
    utm_source: data.utm_source || "",
    utm_medium: data.utm_medium || "",
    utm_campaign: data.utm_campaign || "",
    utm_term: data.utm_term || "",
    utm_content: data.utm_content || "",
    utm_adgroupid: data.utm_adgroupid || "",
    utm_adgroupname: data.utm_adgroupname || "",
    utm_adid: data.utm_adid || "",
    utm_device: data.utm_device || "",
    utm_network: data.utm_network || "",
    utm_placement: data.utm_placement || "",
    ip_city: data.ip_city || "",
    ip_country: data.ip_country || "",
    ip_state: data.ip_state || "",
    // ip_countrycode: data.ip_countrycode || "",
    // ip_timezone: data.ip_timezone || "",
    // landingPageName: data.landingPageName || "onboarding",
    // website_url: data.website_url || "",
  };


  console.log(payload);

  // const muleRes = await fetch(
  //   "https://iz-lead-integration-api-45b3q6.9u15kv.deu-c1.eu1.cloudhub.io/api/form-integration",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       client_id: process.env.MULE_CLIENT_ID!,
  //       client_secret: process.env.MULE_CLIENT_SECRET!,
  //     },
  //     body: JSON.stringify(payload),
  //   }
  // );


  // const muleData = await muleRes.json().catch(() => ({}));

  // console.log("send message")

  // if (!muleRes.ok) {
  //   console.error("Mule error:", muleRes.status, muleData);
  // }

  // return NextResponse.json(
  //   { success: muleRes.ok, mule_response: muleData },
  //   { status: muleRes.status }
  // );

    const response = await fetch(
    "https://backenduat.imtiaz.ae/api/forms/enquiry.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );


  const resData = await response.json().catch(() => ({}));

  console.log("send message")

  if (!response.ok) {
    console.error("Response error:", response.status, resData);
  }

  return NextResponse.json(
    { success: response.ok, response: resData },
    { status: response.status }
  );

}