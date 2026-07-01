export async function submitViewingLead(payload: {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message?: string;
  appointmentDateTime: string;
  utm: Record<string, string>;
  landingPageName: string;
}) {
  // Fetch geo
  let geo: Record<string, string> = {};
  try {
    const geoRes = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`
    );
    const geoData = await geoRes.json();
    geo = {
      ip_city:        geoData.city           || "",
      ip_country:     geoData.country_name   || "",
      ip_state:       geoData.state_prov     || "",
      ip_countrycode: geoData.country_code2  || "",
      ip_timezone:    geoData.time_zone?.name || "",
    };
  } catch {}

  const res = await fetch("/api/viewing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      ...payload.utm,
      ...geo,
      landingPageName: payload.landingPageName || "book-a-viewing",
      website_url: window.location.href,
    }),
  });

  return res.json();
}