"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

export function useUtm() {
  const searchParams = useSearchParams();
  const initialMedium = useRef("");

  useEffect(() => {
    const referrer = document.referrer || "";
    if (referrer.includes("google."))     initialMedium.current = "Google";
    else if (referrer.includes("bing."))  initialMedium.current = "Bing";
    else if (referrer.includes("yahoo.")) initialMedium.current = "Yahoo";

    if (!sessionStorage.getItem("landingUrl"))
      sessionStorage.setItem("landingUrl", window.location.href);
    if (!sessionStorage.getItem("landingRef"))
      sessionStorage.setItem("landingRef", referrer);

    // Store UTM params if present — overwrite if new UTMs found
    if (window.location.search.includes("utm_")) {
      sessionStorage.setItem("utmUrl", window.location.href);
    }
  }, []);

  const buildUtmPayload = () => {
    // If current page has no UTM params, check if we stored them earlier
    const utmUrl = sessionStorage.getItem("utmUrl");
    const params = searchParams.size > 0
      ? searchParams
      : utmUrl ? new URLSearchParams(new URL(utmUrl).search) : searchParams;

    const keys = Array.from(params.keys()).join(",");
    let platformSource = "";
    let medium = initialMedium.current;
    let campaign = "", adGroupId = "", adGroupName = "",
        adId = "", content = "", keyword = "",
        device = "", network = "", placement = "";

    if (params.size > 0) {
      platformSource = params.get("utm_source")      || "";
      campaign       = params.get("utm_campaign")    || "";
      medium         = params.get("utm_medium")      || medium;
      adGroupId      = params.get("utm_adgroupid")   || "";
      adGroupName    = params.get("utm_adgroupname") || "";
      adId           = params.get("utm_adid")        || "";
      content        = params.get("utm_content")     || "";
      keyword        = params.get("utm_term")        || "";
      device         = params.get("utm_device")      || "";
      network        = params.get("utm_network")     || "";
      placement      = params.get("utm_placement")   || "";

      if (!platformSource && !medium && keys.includes("clid")) {
        platformSource = "Paid_Search";
        medium = "Third_Party";
      }
    } else if (medium) {
      platformSource = "Organic_Search";
    } else {
      platformSource = "Landing Page";
      medium = "Direct";
    }

    // Referrer captured on first landing this session — used for First_Referring_Site__c
    const referrer = sessionStorage.getItem("landingRef") || "";
    const landingUrl = sessionStorage.getItem("landingUrl") || "";

    return {
      utm_source:      platformSource,
      utm_medium:      medium,
      utm_campaign:    campaign,
      utm_term:        keyword,
      utm_content:     content,
      utm_adgroupid:   adGroupId,
      utm_adgroupname: adGroupName,
      utm_adid:        adId,
      utm_device:      device,
      utm_network:     network,
      utm_placement:   placement,
      referrer,
      website_url:     landingUrl,
    };
  };

  return { buildUtmPayload };
}