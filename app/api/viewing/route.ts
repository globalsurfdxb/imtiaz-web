import { NextRequest, NextResponse } from "next/server";

const SF_TOKEN_URL = "https://test.salesforce.com/services/oauth2/token";
const SF_LEAD_URL = "https://imtiaz--uat.sandbox.my.salesforce.com/services/data/v59.0/sobjects/Lead/";

async function getSalesforceToken(): Promise<string> {
    const params = new URLSearchParams({
        grant_type: "password",
        client_id: process.env.SF_CLIENT_ID!,
        client_secret: process.env.SF_CLIENT_SECRET!,
        username: process.env.SF_USERNAME!,
        password: process.env.SF_PASSWORD!,
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
        FirstName: data.firstName,
        LastName: data.lastName,
        Email: data.email,
        MobilePhone: data.mobile,
        Phone: data.mobile,
        Follow_up_Date_Time__c: data.appointmentDateTime ? new Date(data.appointmentDateTime).toISOString() : "",
        LeadSource: "Web",
        Medium__c:  "",
        Platform_Source__c: "",
        Ad_Name__c: data.utm_adid || "",
        Campaign_Name__c: data.utm_campaign || "",
        Form_Name__c: "Book a Viewing",
        Ad_Set__c: data.utm_adgroupname || "",
        IP_Country__c: data.ip_country || "",
        IP_City__c: data.ip_city || "",
        IP_State_Region__c: data.ip_state || "",
        IP_Time_zone__c: data.ip_timezone || "",
        First_Page_Seen__c: data.website_url || "",
        First_Referring_Site__c: data.utm_source || "",
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