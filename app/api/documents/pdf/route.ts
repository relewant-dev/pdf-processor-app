// app/api/documents/pdf/route.ts

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEFAULT_BACKEND_URL = "http://localhost:8000";

const BACKEND_URL = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  DEFAULT_BACKEND_URL
).replace(/\/$/, "");

export const POST = async (request: Request) => {
  let backendResponse: Response;

  try {
    backendResponse = await fetch(`${BACKEND_URL}/api/documents/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": request.headers.get("Content-Type") ?? "multipart/form-data",
      },
      body: request.body,
      // Required by Node fetch when streaming a request body
      duplex: "half",
    } as RequestInit);
  } catch (error) {
    console.error("PDF backend fetch failed:", error);

    const detail =
      error instanceof Error
        ? `Unable to reach the document backend at ${BACKEND_URL}: ${error.message}`
        : `Unable to reach the document backend at ${BACKEND_URL}.`;

    return NextResponse.json({ detail }, { status: 502 });
  }

  const responseText = await backendResponse.text();

  if (!backendResponse.ok) {
    return new NextResponse(
      responseText || `Request failed with status ${backendResponse.status}`,
      {
        status: backendResponse.status,
        headers: {
          "Content-Type":
            backendResponse.headers.get("Content-Type") ?? "text/plain",
        },
      },
    );
  }

  if (!responseText) {
    return new NextResponse(null, { status: backendResponse.status });
  }

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("Content-Type") ?? "application/json",
    },
  });
};