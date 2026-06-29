import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No URL" }, { status: 400 });

  const response = await fetch(url);
  const blob = await response.blob();
  const contentType = response.headers.get("content-type") || "application/octet-stream";

  return new NextResponse(blob, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${request.nextUrl.searchParams.get("fileName") || "download"}"`,
    },
  });
}