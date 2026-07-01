export async function submitContactLead(payload: {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message?: string;
  contactMode?: string;
  utm: Record<string, string>;
  landingPageName: string;
}) {
  // Fetch geo
//   let geo: Record<string, string> = {};
//   try {
//     const geoRes = await fetch(
//       `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`
//     );
//     const geoData = await geoRes.json();
//     geo = {
//       ip_city:        geoData.city            || "",
//       ip_country:     geoData.country_name    || "",
//       ip_state:       geoData.state_prov      || "",
//       ip_countrycode: geoData.country_code2   || "",
//       ip_timezone:    geoData.time_zone?.name || "",
//     };
//   } catch {}

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      ...payload.utm,
    //   ...geo,
      landingPageName: payload.landingPageName || "contact-us",
      website_url: window.location.href,
      referrer: document.referrer || "",
    }),
  });

  return res.json();
}